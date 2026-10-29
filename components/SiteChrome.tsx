'use client';

import { usePathname } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

function useWebinarLayout() {
  return usePathname()?.replace(/\/$/, '') === '/academia/webinar-4';
}

export function SiteHeader() {
  const webinarLayout = useWebinarLayout();
  return webinarLayout ? null : <Nav />;
}

export function SiteFooter() {
  const webinarLayout = useWebinarLayout();
  return webinarLayout ? null : <><Footer /><WhatsAppButton /></>;
}
