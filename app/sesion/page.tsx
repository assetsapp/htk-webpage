import type { Metadata } from 'next';
import SesionClient from './SesionClient';
import { buildMeta, faqSchema } from '@/lib/seo';

export const metadata: Metadata = buildMeta(
  'Agendar sesión de análisis gratuita',
  'Agenda una sesión de 30 minutos con un especialista HTK. Identifica qué está fallando en tu control de activos y recibe una recomendación concreta. Sin costo, sin compromiso.',
  '/sesion'
);

const faqs = [
  {
    question: '¿Qué pasa en la sesión de análisis?',
    answer: 'En 30 minutos revisamos contigo la situación actual de tu control de activos: qué está fallando, cuáles son los riesgos más urgentes y qué solución tendría más impacto en tu operación. No es una demo, es un diagnóstico real.',
  },
  {
    question: '¿Tiene algún costo?',
    answer: 'No. La sesión es completamente gratuita y sin compromiso. El objetivo es darte claridad sobre tu situación, no venderte algo en la primera llamada.',
  },
  {
    question: '¿Quién debe asistir a la sesión?',
    answer: 'La persona responsable del control de activos, operaciones o finanzas. Idealmente alguien con contexto sobre los problemas actuales: auditorías, inventarios, pérdidas de activos o cumplimiento regulatorio.',
  },
  {
    question: '¿En cuánto tiempo puedo tener una propuesta?',
    answer: 'Después de la sesión, si identificamos que hay un caso claro de valor, enviamos una propuesta en menos de 5 días hábiles.',
  },
  {
    question: '¿Trabajan con empresas de cualquier tamaño?',
    answer: 'HTK trabaja con empresas medianas y grandes que ya tienen operaciones establecidas y un problema concreto de control de activos. El rango típico es de 500 a 50,000+ activos bajo gestión.',
  },
];

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <SesionClient faqs={faqs} />
    </>
  );
}
