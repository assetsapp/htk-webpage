import { NextRequest, NextResponse } from 'next/server';

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
    const { nombre, apellido, empresa, email, telefono, motivo, comentarios } = await req.json();

    if (!nombre || !apellido || !empresa || !email || !motivo) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
    }

    const accessToken = await getAccessToken();

    const descripcion = [
      `Empresa: ${empresa}`,
      `Motivo: ${motivo}`,
      comentarios ? `Comentarios: ${comentarios}` : null,
    ].filter(Boolean).join('\n\n');

    const contact = {
      First_Name: nombre.trim(),
      Last_Name: apellido.trim(),
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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Error en /api/leads:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
