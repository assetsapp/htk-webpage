import type { Metadata } from 'next';
import CasosExitoClient from './CasosExitoClient';
import { buildMeta } from '@/lib/seo';

export const metadata: Metadata = buildMeta(
  'Casos de éxito — empresas que tomaron control de sus activos',
  'Conoce cómo empresas de manufactura, salud, logística y retail lograron control, trazabilidad y automatización de activos con HTK.',
  '/casos-exito'
);

export default function Page() {
  return <CasosExitoClient />;
}
