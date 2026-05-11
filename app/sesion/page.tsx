import type { Metadata } from 'next';
import SesionClient from './SesionClient';
import { buildMeta } from '@/lib/seo';

export const metadata: Metadata = buildMeta(
  'Agendar sesión de análisis gratuita',
  'Agenda una sesión de 30 minutos con un especialista HTK. Identifica qué está fallando en tu control de activos y recibe una recomendación concreta. Sin costo, sin compromiso.',
  '/sesion'
);

export default function Page() {
  return <SesionClient />;
}
