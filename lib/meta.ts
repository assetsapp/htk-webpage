import { META_PIXEL_ID } from './gtm';

type MetaEventName =
  | 'PageView'
  | 'ViewContent'
  | 'Lead'
  | 'CompleteRegistration'
  | 'Contact'
  | 'Schedule'
  | 'SubmitApplication';

type MetaEventParams = {
  content_category?: 'hospital' | 'immex' | 'retail' | 'tagventory';
  content_name?: string;
  method?: 'whatsapp' | 'phone';
};

declare global {
  interface Window {
    fbq: (action: string, event: string, params?: MetaEventParams) => void;
    _fbq: unknown;
  }
}

export function trackMetaEvent(event: MetaEventName, params?: MetaEventParams) {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', event, params);
}

export { META_PIXEL_ID };
