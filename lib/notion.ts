const NOTION_API = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';

function headers() {
  return {
    Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
    'Content-Type': 'application/json',
    'Notion-Version': NOTION_VERSION,
  };
}

export async function addWebinarRegistrant(data: {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  campana: string;
}) {
  // Un reintento de correo reutiliza el registro del mismo asistente y webinar.
  const existingRes = await fetch(`${NOTION_API}/databases/${process.env.NOTION_WEBINAR_DB_ID}/query`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      filter: {
        and: [
          { property: 'Correo', email: { equals: data.email } },
          { property: 'Campaña preeliminar ', rich_text: { equals: data.campana } },
        ],
      },
      page_size: 1,
    }),
  });
  if (!existingRes.ok) throw new Error(`Error consultando registro de webinar: ${existingRes.status}`);
  const existing = await existingRes.json();
  if (existing.results?.length) return existing.results[0];

  const res = await fetch(`${NOTION_API}/pages`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      parent: { database_id: process.env.NOTION_WEBINAR_DB_ID },
      properties: {
        Nombre: { title: [{ text: { content: data.nombre } }] },
        Correo: { email: data.email },
        Teléfono: { phone_number: data.telefono },
        'Organizacion preeliminar': { rich_text: [{ text: { content: data.empresa } }] },
        'Campaña preeliminar ': { rich_text: [{ text: { content: data.campana } }] },
        Estado: { select: { name: 'Por Contactar' } },
      },
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Notion error: ${JSON.stringify(err)}`);
  }

  return res.json();
}
