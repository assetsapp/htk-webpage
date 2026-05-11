import type { Metadata } from 'next';
import AutodiagnosticoClient from './AutodiagnosticoClient';
import { buildMeta } from '@/lib/seo';

export const metadata: Metadata = buildMeta(
  'Autodiagnóstico de control de activos — ¿qué tan bien gestionas tus activos?',
  'Responde 8 preguntas y descubre tu nivel de control operativo. Identifica brechas, recibe recomendaciones y descarga tu resultado personalizado en PDF. Gratis.',
  '/recursos/autodiagnostico-control-activos'
);

export default function Page() {
  return <AutodiagnosticoClient />;
}
