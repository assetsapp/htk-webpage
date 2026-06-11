import crypto from 'crypto';

const PIXEL_ID = '1027328306497559';
const CAPI_URL = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events`;

type CapiEventName =
  | 'PageView'
  | 'Lead'
  | 'CompleteRegistration'
  | 'Contact'
  | 'Schedule'
  | 'SubmitApplication'
  | 'ViewContent';

interface CapiUserData {
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  client_ip_address?: string;
  client_user_agent?: string;
  fbp?: string;
  fbc?: string;
}

interface CapiEventData {
  event_name: CapiEventName;
  event_time: number;
  action_source: 'website';
  event_source_url?: string;
  user_data: CapiUserData;
  custom_data?: Record<string, string>;
}

function sha256(value: string): string {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

function hashUserData(data: CapiUserData) {
  return {
    ...(data.email && { em: sha256(data.email) }),
    ...(data.phone && { ph: sha256(data.phone.replace(/\D/g, '')) }),
    ...(data.first_name && { fn: sha256(data.first_name) }),
    ...(data.last_name && { ln: sha256(data.last_name) }),
    ...(data.client_ip_address && { client_ip_address: data.client_ip_address }),
    ...(data.client_user_agent && { client_user_agent: data.client_user_agent }),
    ...(data.fbp && { fbp: data.fbp }),
    ...(data.fbc && { fbc: data.fbc }),
  };
}

export async function sendCapiEvent(event: CapiEventData) {
  const token = process.env.META_CAPI_TOKEN;
  if (!token) return;

  const payload = {
    data: [{
      event_name: event.event_name,
      event_time: event.event_time,
      action_source: event.action_source,
      ...(event.event_source_url && { event_source_url: event.event_source_url }),
      user_data: hashUserData(event.user_data),
      ...(event.custom_data && { custom_data: event.custom_data }),
    }],
  };

  try {
    await fetch(`${CAPI_URL}?access_token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error('CAPI error:', err);
  }
}
