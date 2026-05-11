import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMeta } from '@/lib/seo';

export const metadata: Metadata = {
  ...buildMeta(
    'Sesión agendada — Te contactamos en menos de 24 horas',
    'Tu solicitud fue recibida. Un especialista HTK te contactará en menos de 24 horas para confirmar tu sesión de análisis.',
    '/sesion/gracias'
  ),
  robots: { index: false, follow: false },
};

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const nextSteps = [
  { num: '01', title: 'Revisamos tu solicitud', desc: 'Un especialista HTK analiza tu contexto antes de la sesión.' },
  { num: '02', title: 'Te contactamos en menos de 24 h', desc: 'Por correo o teléfono para confirmar disponibilidad y agendar.' },
  { num: '03', title: 'Sesión de 30 – 45 minutos', desc: 'Conversación enfocada en tu operación, sin presentaciones genéricas.' },
  { num: '04', title: 'Recibes una recomendación concreta', desc: 'Claridad sobre el siguiente paso, uses HTK o no.' },
];

export default function GraciasPage() {
  return (
    <div className="min-h-screen bg-surface-base flex flex-col">
      <div className="pt-28" />

      {/* Hero confirmación */}
      <section className="flex-1 py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">

          {/* Ícono de éxito */}
          <div className="w-20 h-20 bg-brand-tint50 border-2 border-brand rounded-full flex items-center justify-center mx-auto mb-8">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#F79A3F" strokeWidth="2.5">
              <path d="M6 18l8 8L30 10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Solicitud recibida</p>
          <h1 className="mb-4">Tu sesión está en proceso de confirmación</h1>
          <p className="text-[17px] text-ink-500 leading-relaxed mb-12">
            Un especialista HTK revisará tu solicitud y te contactará en <strong className="text-ink">menos de 24 horas</strong> para confirmar fecha y hora.
          </p>

          {/* Próximos pasos */}
          <div className="text-left bg-surface-raised border border-border-subtle rounded-block p-8 mb-10">
            <p className="text-xs font-medium tracking-widest uppercase text-ink-300 mb-6">Qué sigue</p>
            <div className="space-y-6">
              {nextSteps.map((step) => (
                <div key={step.num} className="flex items-start gap-4">
                  <span className="text-2xl font-semibold text-brand/30 leading-none flex-shrink-0 w-8">{step.num}</span>
                  <div>
                    <p className="text-sm font-medium text-ink mb-0.5">{step.title}</p>
                    <p className="text-sm text-ink-500 leading-snug">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA de vuelta al sitio */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
            >
              Volver al inicio <ArrowRight />
            </Link>
            <Link
              href="/casos-exito"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border-subtle text-ink-500 text-sm font-medium rounded-btn hover:border-brand hover:text-brand transition-colors"
            >
              Ver casos de éxito
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
