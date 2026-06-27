import { NextRequest, NextResponse } from 'next/server';
import { sendCapiEvent } from '@/lib/capi';
import { sendMail } from '@/lib/mail';

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
    const { nombre, apellido, empresa, email, telefono, motivo, activos, comentarios, fuente } = await req.json();

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

    if (zohoData.data?.[0]?.status === 'error') {
      console.error('Zoho error:', zohoData.data[0]);
      return NextResponse.json({ error: 'Error al crear lead en Zoho' }, { status: 500 });
    }

    // Enviar notificación por correo — falla silenciosamente para no bloquear la respuesta
    sendMail({
      to: 'proyectos@htk-id.com',
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
