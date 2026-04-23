import Link from 'next/link';

export default function AvisoPrivacidad() {
  return (
    <>
      <section className="bg-surface-base pt-28 pb-20 border-b border-border-subtle">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-2 mb-5">
            <Link href="/" className="text-xs text-ink-300 hover:text-brand transition-colors">Inicio</Link>
            <span className="text-ink-300 text-xs">/</span>
            <span className="text-xs text-brand">Aviso de privacidad</span>
          </div>
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Legal</p>
          <h1 className="mb-4">Aviso de privacidad</h1>
          <p className="text-sm text-ink-300">Última actualización: enero 2026</p>
        </div>
      </section>

      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl">
            {[
              {
                title: '1. Responsable del tratamiento',
                content: 'HTK Identificación Inteligente, S.A. de C.V. (en adelante "HTK"), con domicilio en Ciudad de México, México, es responsable del tratamiento de tus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).',
              },
              {
                title: '2. Datos personales que recabamos',
                content: 'HTK puede recabar los siguientes datos personales: nombre completo, correo electrónico corporativo, número telefónico, cargo y empresa. Estos datos se obtienen directamente cuando completas formularios de contacto, diagnóstico o solicitud de demo en nuestro sitio web.',
              },
              {
                title: '3. Finalidad del tratamiento',
                content: 'Los datos personales recabados son utilizados para: contactarte para agendar diagnósticos o demostraciones; enviarte información relevante sobre soluciones HTK; dar seguimiento a solicitudes de información; y mejorar nuestros servicios. No utilizamos tus datos para fines de marketing masivo sin tu consentimiento.',
              },
              {
                title: '4. Transferencia de datos',
                content: 'HTK no transfiere datos personales a terceros sin consentimiento previo, salvo que sea requerido por ley o autoridad competente. Los datos pueden ser accedidos por colaboradores internos de HTK estrictamente para cumplir las finalidades descritas.',
              },
              {
                title: '5. Derechos ARCO',
                content: 'Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte (derechos ARCO) al tratamiento de tus datos personales. Para ejercer estos derechos, envía una solicitud a: privacidad@htk-id.com. HTK responderá en un plazo máximo de 20 días hábiles.',
              },
              {
                title: '6. Cookies y tecnologías de seguimiento',
                content: 'Este sitio web puede utilizar cookies propias y de terceros para analizar el uso del sitio y mejorar la experiencia del usuario. Puedes deshabilitar las cookies en la configuración de tu navegador. El uso de cookies analíticas no vincula información con datos personales identificables.',
              },
              {
                title: '7. Cambios al aviso de privacidad',
                content: 'HTK puede modificar este aviso de privacidad en cualquier momento. Cualquier cambio será publicado en esta misma página con indicación de la fecha de última actualización. Te recomendamos revisar periódicamente este aviso.',
              },
              {
                title: '8. Contacto',
                content: 'Para cualquier duda sobre este aviso de privacidad o el tratamiento de tus datos, puedes contactarnos en: privacidad@htk-id.com o en nuestras oficinas en Ciudad de México, México.',
              },
            ].map((section) => (
              <div key={section.title} className="mb-8 pb-8 border-b border-border-subtle last:border-0">
                <h3 className="text-lg font-medium text-ink mb-3">{section.title}</h3>
                <p className="text-[15px] text-ink-500 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
