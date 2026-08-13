import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { sendCapiEvent } from '@/lib/capi';
import { sendMail } from '@/lib/mail';

function isValidToken(token: unknown): boolean {
  try {
    const secret = process.env.FORM_SECRET;
    if (!secret) { console.error('FORM_SECRET no configurado'); return false; }
    if (typeof token !== 'string') return false;
    const dotIndex = token.lastIndexOf('.');
    if (dotIndex === -1) return false;
    const ts = token.slice(0, dotIndex);
    const sig = token.slice(dotIndex + 1);
    if (!ts || !sig) return false;
    const age = Date.now() - Number(ts);
    if (age < 0 || age > 30 * 60 * 1000) return false;
    const expected = createHmac('sha256', secret).update(ts).digest('hex');
    return sig === expected;
  } catch {
    return false;
  }
}

// Rate limiting en memoria: máx 3 envíos por IP cada 10 minutos
const ipLog = new Map<string, { count: number; resetAt: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipLog.get(ip);
  if (!entry || now > entry.resetAt) {
    ipLog.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return false;
  }
  if (entry.count >= 3) return true;
  entry.count++;
  return false;
}

const ZOHO_TOKEN_URL = `https://accounts.zoho.${process.env.ZOHO_REGION}/oauth/v2/token`;
const ZOHO_CONTACTS_URL = `https://www.zohoapis.${process.env.ZOHO_REGION}/crm/v2/Contacts`;

async function getAccessToken(): Promise<string> {
  const res = await fetch(ZOHO_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.ZOHO_CLIENT_ID!,
      client_secret: process.env.ZOHO_CLIENT_SECRET!,
      refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
    }),
  });

  const data = await res.json();
  if (!data.access_token) throw new Error('No se pudo obtener el access token de Zoho');
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const { nombre, apellido, empresa, email, telefono, motivo, activos, comentarios, fuente, _hp, _t, _token } = await req.json();

    // Anti-bot: token firmado, honeypot, time-trap y rate limiting por IP
    if (!isValidToken(_token)) return NextResponse.json({ ok: true });
    if (_hp) return NextResponse.json({ ok: true });
    if (typeof _t === 'number' && _t < 3000) return NextResponse.json({ ok: true });
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
    if (isRateLimited(ip)) return NextResponse.json({ ok: true });

    // Formularios de recursos solo requieren nombre, empresa y email
    const isRecurso = !!fuente && !motivo;
    if (!nombre || !empresa || !email || (!isRecurso && !motivo)) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
    }

    const accessToken = await getAccessToken();

    const descripcion = [
      fuente ? `Fuente: ${fuente}` : null,
      empresa ? `Empresa: ${empresa}` : null,
      motivo ? `Motivo: ${motivo}` : null,
      activos ? `N° de activos: ${activos}` : null,
      comentarios ? `Comentarios: ${comentarios}` : null,
    ].filter(Boolean).join('\n\n');

    const [firstName, ...rest] = nombre.trim().split(' ');
    const lastName = apellido ? apellido.trim() : (rest.join(' ') || '-');

    const contact = {
      First_Name: firstName,
      Last_Name: lastName,
      Email: email,
      Phone: telefono || '',
      Description: descripcion,
      pagina_web: true,
    };

    const zohoRes = await fetch(ZOHO_CONTACTS_URL, {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: [contact] }),
    });

    const zohoData = await zohoRes.json();
    const zohoFailed = zohoData.data?.[0]?.status === 'error';
    if (zohoFailed) console.error('Zoho error:', zohoData.data[0]);

    // Enviar correo siempre, independiente del resultado de Zoho
    await sendMail({
      to: 'proyectos@htk-id.com, gabriel.h@htk-id.com, ventas@htk-id.com',
      subject: `Nuevo lead: ${nombre} ${lastName} — ${empresa}`,
      html: `
        <h2>Nuevo registro desde el sitio web</h2>
        <table cellpadding="6" cellspacing="0" border="1" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
          <tr><th align="left">Campo</th><th align="left">Valor</th></tr>
          <tr><td>Nombre</td><td>${nombre} ${lastName}</td></tr>
          <tr><td>Empresa</td><td>${empresa}</td></tr>
          <tr><td>Email</td><td>${email}</td></tr>
          ${telefono ? `<tr><td>Teléfono</td><td>${telefono}</td></tr>` : ''}
          ${fuente ? `<tr><td>Fuente</td><td>${fuente}</td></tr>` : ''}
          ${motivo ? `<tr><td>Motivo</td><td>${motivo}</td></tr>` : ''}
          ${activos ? `<tr><td>N° de activos</td><td>${activos}</td></tr>` : ''}
          ${comentarios ? `<tr><td>Comentarios</td><td>${comentarios}</td></tr>` : ''}
        </table>
      `,
    }).catch((err) => console.error('Error enviando correo de lead:', err));

    if (zohoFailed) {
      return NextResponse.json({ error: 'Error al crear lead en Zoho' }, { status: 500 });
    }

    sendCapiEvent({
      event_name: 'CompleteRegistration',
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      user_data: {
        email,
        phone: telefono,
        first_name: firstName,
        last_name: lastName,
        client_ip_address: req.headers.get('x-forwarded-for')?.split(',')[0] ?? undefined,
        client_user_agent: req.headers.get('user-agent') ?? undefined,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Error en /api/leads:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
