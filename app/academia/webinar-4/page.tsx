import type { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import { SITE_URL } from '@/lib/seo';
import WebinarClient from './WebinarClient';

const pageMetadata = buildMeta(
  'Webinar #4: ¿Dónde está? ¿Quién lo tiene? ¿Qué pasó con él?',
  'Aprende a construir control real de activos en tu empresa. Webinar gratuito en línea con Manrique Porras — jueves 19 de noviembre, 10:00 a.m. (CDMX).',
  '/academia/webinar-4'
);

export const metadata: Metadata = {
  ...pageMetadata,
  openGraph: {
    ...pageMetadata.openGraph,
    images: [{
      url: '/academia/webinar-4-banner.jpg',
      width: 1600,
      height: 900,
      alt: 'Academia HTK · Webinar 04 · Construyendo control real de activos',
    }],
  },
  twitter: {
    ...pageMetadata.twitter,
    images: ['/academia/webinar-4-banner.jpg'],
  },
};

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: '¿Dónde está? ¿Quién lo tiene? ¿Qué pasó con él? Construyendo control real de activos',
  description: 'Webinar gratuito de la Academia HTK sobre control real de activos: trazabilidad, responsables y auditoría.',
  startDate: '2026-11-19T10:00:00-06:00',
  endDate: '2026-11-19T11:00:00-06:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
  location: {
    '@type': 'VirtualLocation',
    url: 'https://zoom.us',
  },
  organizer: {
    '@type': 'Organization',
    name: 'HTK Identificación Inteligente',
    url: SITE_URL,
  },
  performer: {
    '@type': 'Person',
    name: 'Manrique Porras',
    jobTitle: 'Especialista en Finanzas y Activos Fijos',
  },
  isAccessibleForFree: true,
  url: `${SITE_URL}/academia/webinar-4`,
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <WebinarClient />
    </>
  );
}
