import type { Metadata } from 'next';
import CalculadoraClient from './CalculadoraClient';
import { buildMeta } from '@/lib/seo';

export const metadata: Metadata = buildMeta(
  'Calculadora ROI de control de activos — ¿cuánto estás perdiendo?',
  'Calcula el impacto económico de no tener control sobre tus activos. Ingresa tus datos y descubre cuánto podrías recuperar con una solución estructurada.',
  '/recursos/calculadora-roi-activos'
);

export default function Page() {
  return <CalculadoraClient />;
}
