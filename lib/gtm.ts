export const GTM_ID = 'GTM-P8NBBQW3';
export const META_PIXEL_ID = '1027328306497559';

// Tipos de eventos
type GtmEvent =
  | { event: 'lead_formulario_sesion' }
  | { event: 'lead_descarga_recurso'; recurso: string }
  | { event: 'click_telefono' }
  | { event: 'click_whatsapp' };

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function pushEvent(data: GtmEvent) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}
