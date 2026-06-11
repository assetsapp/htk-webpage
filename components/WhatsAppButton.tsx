'use client';
import { pushEvent } from '@/lib/gtm';
import { trackMetaEvent } from '@/lib/meta';

export default function WhatsAppButton() {
  const phone = '525517610313';
  const message = encodeURIComponent('Hola, me interesa conocer más sobre HTK y cómo puede ayudar a mi operación.');
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      onClick={() => { pushEvent({ event: 'click_whatsapp' }); trackMetaEvent('Contact', { method: 'whatsapp' }); }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform duration-200 hover:scale-110"
      style={{ backgroundColor: '#25D366' }}
    >
      <svg width="28" height="28" viewBox="0 0 32 32" fill="white">
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.648 4.83 1.78 6.86L2 30l7.34-1.74A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.56 11.56 0 01-5.9-1.62l-.42-.25-4.36 1.03 1.07-4.25-.28-.44A11.56 11.56 0 014.4 16C4.4 9.6 9.6 4.4 16 4.4S27.6 9.6 27.6 16 22.4 27.6 16 27.6zm6.34-8.67c-.35-.17-2.06-1.02-2.38-1.13-.32-.12-.55-.17-.78.17-.23.35-.9 1.13-1.1 1.37-.2.23-.4.26-.75.09-.35-.17-1.47-.54-2.8-1.73-1.03-.92-1.73-2.06-1.93-2.41-.2-.35-.02-.54.15-.71.16-.16.35-.4.52-.6.17-.2.23-.35.35-.58.12-.23.06-.43-.03-.6-.09-.17-.78-1.88-1.07-2.57-.28-.67-.57-.58-.78-.59h-.67c-.23 0-.6.09-.91.43-.32.35-1.2 1.17-1.2 2.85s1.23 3.3 1.4 3.53c.17.23 2.42 3.7 5.87 5.19.82.35 1.46.56 1.96.72.82.26 1.57.22 2.16.13.66-.1 2.06-.84 2.35-1.66.29-.81.29-1.51.2-1.66-.08-.14-.3-.23-.65-.4z" />
      </svg>
    </a>
  );
}
