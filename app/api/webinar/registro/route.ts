import { NextRequest, NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';
import { addWebinarRegistrant } from '@/lib/notion';
import { sendMail } from '@/lib/mail';
import { isValidPhone } from '@/lib/phone';
import { WEBINAR_4 } from '@/lib/webinar';

function isValidToken(token: unknown): boolean {
  try {
    const secret = process.env.FORM_SECRET;
    if (!secret) return false;
    if (typeof token !== 'string') return false;
    const dotIndex = token.lastIndexOf('.');
    if (dotIndex === -1) return false;
    const ts = token.slice(0, dotIndex);
    const sig = token.slice(dotIndex + 1);
    if (!/^\d+$/.test(ts) || !/^[a-f0-9]{64}$/.test(sig)) return false;
    const age = Date.now() - Number(ts);
    if (age < 0 || age > 30 * 60 * 1000) return false;
    const expected = createHmac('sha256', secret).update(ts).digest('hex');
    return timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'));
  } catch {
    return false;
  }
}

const ipLog = new Map<string, { count: number; resetAt: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipLog.get(ip);
  if (!entry || now > entry.resetAt) {
    ipLog.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return false;
  }
  if (entry.count >= 5) return true;
  entry.count++;
  return false;
}

function getJoinLink(): string | null {
  try {
    const url = new URL(WEBINAR_4.zoomJoinUrl);
    const zoomHost = /(^|\.)zoom\.(us|com)$/.test(url.hostname);
    if (url.protocol !== 'https:' || !zoomHost || url.username || url.password || url.port ||
        !/^\/(j|w)\/\d+\/?$/.test(url.pathname) || url.searchParams.has('tk')) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]!);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ ok: false, error: 'Solicitud inválida.' }, { status: 400 });
    }
    const { _hp, _t, _token } = body;

    if (!process.env.FORM_SECRET) {
      return NextResponse.json({ ok: false, error: 'El registro no está disponible por el momento. Intenta más tarde.' }, { status: 503 });
    }
    if (!isValidToken(_token)) {
      return NextResponse.json({ ok: false, error: 'No pudimos validar la sesión. Vuelve a intentar el registro.' }, { status: 403 });
    }
    if (_hp) return NextResponse.json({ ok: false, error: 'No pudimos validar el formulario.' }, { status: 400 });
    if (typeof _t !== 'number' || !Number.isFinite(_t) || _t < 3000) {
      return NextResponse.json({ ok: false, error: 'Espera unos segundos y vuelve a intentar el registro.' }, { status: 429 });
    }
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ ok: false, error: 'Hiciste varios intentos. Espera 10 minutos o escríbenos a marketing@htk-id.com.' }, { status: 429 });
    }

    if (typeof body.nombre !== 'string' || typeof body.email !== 'string' ||
        typeof body.telefono !== 'string' || (body.empresa != null && typeof body.empresa !== 'string')) {
      return NextResponse.json({ ok: false, error: 'Revisa los datos del formulario.' }, { status: 400 });
    }
    const nombre = body.nombre.trim();
    const email = body.email.trim().toLowerCase();
    const telefono = body.telefono.trim();
    const empresa = (body.empresa ?? '').trim();
    if (!nombre || nombre.length > 200 || email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) ||
        telefono.length > 50 || !isValidPhone(telefono) || empresa.length > 200 || /[\r\n]/.test(nombre + email + empresa)) {
      return NextResponse.json({ ok: false, error: 'Revisa tu nombre, correo electrónico y teléfono.' }, { status: 400 });
    }

    const zoomLink = getJoinLink();
    if (!zoomLink) {
      return NextResponse.json({ ok: false, error: 'El registro no está disponible por el momento. Escríbenos a marketing@htk-id.com.' }, { status: 503 });
    }
    const webinar = WEBINAR_4.campana;

    function buildIcs(attendeeEmail: string, attendeeName: string): string {
      const uid = `webinar-4-${attendeeEmail.replace(/[^a-z0-9]/gi, '')}@htk-id.com`;
      const desc = `${WEBINAR_4.subtitulo}\\n\\nPonente: ${WEBINAR_4.ponente}\\n\\nAcceso: ${zoomLink}`;
      return [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//HTK Identificación Inteligente//Webinar//ES',
        'CALSCALE:GREGORIAN',
        'METHOD:REQUEST',
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${new Date().toISOString().replace(/\D/g, '').slice(0, 15)}Z`,
        'DTSTART;TZID=America/Mexico_City:20261119T100000',
        'DTEND;TZID=America/Mexico_City:20261119T110000',
        `SUMMARY:Academia HTK Webinar #4 – ${WEBINAR_4.titulo}`,
        `DESCRIPTION:${desc}`,
        `LOCATION:${zoomLink}`,
        `URL:${zoomLink}`,
        'ORGANIZER;CN=Academia HTK:mailto:ventas@htk-id.com',
        `ATTENDEE;ROLE=REQ-PARTICIPANT;RSVP=TRUE;CN=${attendeeName}:mailto:${attendeeEmail}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR',
      ].join('\r\n');
    }

    // Guardar en Notion
    await addWebinarRegistrant({
      nombre, email, telefono, empresa, campana: webinar,
    });

    // Correo de confirmación al registrante
    try {
      const confirmation = await sendMail({
        to: email,
        subject: `Confirmación de registro: ${webinar}`,
        attachments: [{
          filename: 'webinar-htk-4.ics',
          content: buildIcs(email, nombre),
          contentType: 'text/calendar; charset=utf-8; method=REQUEST',
        }],
        html: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#F7F9FA;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;max-width:600px;width:100%;">

        <!-- Header naranja -->
        <tr>
          <td style="background:#0B1120;padding:32px 40px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <span style="font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">HTK</span>
                  <span style="font-size:11px;color:#F79A3F;display:block;letter-spacing:1px;margin-top:2px;">IDENTIFICACIÓN INTELIGENTE</span>
                </td>
                <td align="right">
                  <span style="background:#F79A3F;color:#ffffff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px;letter-spacing:0.5px;">ACADEMIA HTK</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Contenido -->
        <tr>
          <td style="padding:36px 40px 0;">
            <p style="margin:0 0 8px;font-size:14px;color:#686f79;">Hola, ${escapeHtml(nombre.split(/\s+/)[0])}:</p>
            <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#0B0B0C;line-height:1.3;">
              ¡Tu registro está confirmado!
            </h1>
            <p style="margin:0 0 24px;font-size:15px;color:#444;line-height:1.6;">
              Te esperamos en el próximo webinar de la Academia HTK:
            </p>

            <!-- Card del webinar -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F9FA;border:1px solid #E5E8EB;border-radius:12px;margin-bottom:28px;">
              <tr>
                <td style="padding:24px;">
                  <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#F79A3F;letter-spacing:1px;">4.º WEBINAR · ACADEMIA HTK</p>
                  <h2 style="margin:0 0 16px;font-size:18px;font-weight:700;color:#0B0B0C;line-height:1.35;">
                    ¿Dónde está? ¿Quién lo tiene? ¿Qué pasó con él?<br>
                    <span style="font-weight:400;color:#444;">Construyendo control real de activos</span>
                  </h2>
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding-right:20px;padding-bottom:8px;">
                        <span style="font-size:13px;color:#686f79;">📅</span>
                        <span style="font-size:13px;color:#0B0B0C;margin-left:6px;font-weight:600;">Jueves 19 de noviembre de 2026</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom:8px;">
                        <span style="font-size:13px;color:#686f79;">🕙</span>
                        <span style="font-size:13px;color:#0B0B0C;margin-left:6px;font-weight:600;">10:00 a.m. (CDMX)</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span style="font-size:13px;color:#686f79;">🎙</span>
                        <span style="font-size:13px;color:#0B0B0C;margin-left:6px;font-weight:600;">Manrique Porras</span>
                        <span style="font-size:13px;color:#686f79;"> · Finanzas y activos fijos</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Botón Zoom -->
            <table cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
              <tr>
                <td style="background:#0B1120;border-radius:8px;">
                  <a href="${escapeHtml(zoomLink)}" style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">
                    Unirme al webinar por Zoom →
                  </a>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 24px;font-size:13px;color:#686f79;line-height:1.6;">
              Si el botón no funciona, copia este enlace:<br>
              <a href="${escapeHtml(zoomLink)}" style="color:#0D6BDE;word-break:break-all;">${escapeHtml(zoomLink)}</a>
            </p>

            <!-- Agregar al calendario -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F9FA;border:1px solid #E5E8EB;border-radius:10px;margin-bottom:32px;">
              <tr>
                <td style="padding:18px 24px;">
                  <p style="margin:0 0 10px;font-size:12px;font-weight:700;color:#444;letter-spacing:0.5px;">AGREGAR AL CALENDARIO</p>
                  <p style="margin:0;font-size:13px;color:#686f79;">
                    <a href="cid:webinar-htk-4.ics" style="color:#0D6BDE;text-decoration:none;margin-right:16px;">📅 Archivo .ics</a>
                    <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Academia+HTK+Webinar+%234&dates=20261119T160000Z%2F20261119T170000Z&details=Construyendo+control+real+de+activos.+Acceso%3A+${encodeURIComponent(zoomLink)}&location=${encodeURIComponent(zoomLink)}" style="color:#0D6BDE;text-decoration:none;margin-right:16px;">Google Calendar</a>
                    <a href="https://calendar.yahoo.com/?v=60&title=Academia+HTK+Webinar+%234&st=20261119T160000Z&dur=0100&desc=Construyendo+control+real+de+activos.+Acceso%3A+${encodeURIComponent(zoomLink)}&in_loc=${encodeURIComponent(zoomLink)}" style="color:#0D6BDE;text-decoration:none;">Yahoo Calendar</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Divider + footer -->
        <tr>
          <td style="padding:32px 40px 28px;">
            <hr style="border:none;border-top:1px solid #E5E8EB;margin:0 0 24px;">
            <p style="margin:0 0 4px;font-size:13px;color:#444;">¿Tienes preguntas?</p>
            <p style="margin:0;font-size:13px;color:#686f79;">
              Escríbenos a <a href="mailto:ventas@htk-id.com" style="color:#0D6BDE;">ventas@htk-id.com</a>
            </p>
            <p style="margin:16px 0 0;font-size:12px;color:#9ca3af;">© 2026 HTK Identificación Inteligente</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
        `,
      });
      const accepted = confirmation.accepted.some(recipient =>
        (typeof recipient === 'string' ? recipient : recipient.address).toLowerCase() === email);
      if (!accepted) throw new Error('El servidor de correo rechazó al destinatario');
    } catch (err) {
      console.error('Error enviando correo al registrante:', err);
      return NextResponse.json({
        ok: false,
        registered: true,
        emailSent: false,
        error: 'Tu registro quedó guardado, pero no pudimos enviar el correo con el acceso. Reintenta el envío o escríbenos a marketing@htk-id.com.',
      }, { status: 502 });
    }

    // Notificación interna a HTK
    await sendMail({
      to: 'marketing@htk-id.com, sistemas@htk-id.com',
      subject: `Nuevo registro webinar: ${nombre.trim()} — ${empresa?.trim() || 'Sin empresa'}`,
      html: `
        <h2 style="font-family:sans-serif;">Nuevo registro de webinar</h2>
        <table cellpadding="6" cellspacing="0" border="1" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
          <tr><th align="left">Campo</th><th align="left">Valor</th></tr>
          <tr><td>Nombre</td><td>${escapeHtml(nombre)}</td></tr>
          <tr><td>Email</td><td>${escapeHtml(email)}</td></tr>
          <tr><td>Teléfono</td><td>${escapeHtml(telefono)}</td></tr>
          ${empresa ? `<tr><td>Empresa</td><td>${escapeHtml(empresa)}</td></tr>` : ''}
          <tr><td>Webinar</td><td>${webinar}</td></tr>
        </table>
      `,
    }).catch((err) => console.error('Error enviando notificación interna:', err));

    return NextResponse.json({ ok: true, registered: true, emailSent: true });
  } catch (err) {
    console.error('Error en /api/webinar/registro:', err);
    return NextResponse.json({ ok: false, error: 'No pudimos completar tu registro. Intenta de nuevo o escríbenos a marketing@htk-id.com.' }, { status: 500 });
  }
}
