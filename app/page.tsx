import type { Metadata } from 'next';
import HomeClient from './HomeClient';
import { buildMeta } from '@/lib/seo';

export const metadata: Metadata = buildMeta(
  'Control de activos para empresas | HTK Identificación Inteligente',
  'HTK ayuda a empresas a identificar, rastrear y controlar sus activos físicos con tecnología RFID, códigos y automatización. Sin pérdidas, sin incertidumbre.',
  '/'
);

export default function Page() {
  return <HomeClient />;
}
