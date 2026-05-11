import type { Metadata } from 'next';
import ChecklistClient from './ChecklistClient';
import { buildMeta } from '@/lib/seo';

export const metadata: Metadata = buildMeta(
  'Checklist de control de activos — 30 puntos clave para auditar tu operación',
  'Evalúa tu operación con 30 criterios en 6 áreas: conciliación, control, responsabilidad, disponibilidad, trazabilidad y automatización. Descarga tu resultado en PDF.',
  '/recursos/checklist-control-activos'
);

export default function Page() {
  return <ChecklistClient />;
}
