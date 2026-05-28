import type { NextConfig } from 'next';
import { blogRedirects } from './lib/blog-redirects';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  async redirects() {
    return [
      // Canonical: non-www → www (301 permanente)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'htk-id.com' }],
        destination: 'https://www.htk-id.com/:path*',
        permanent: true,
      },
      // /soluciones/plataforma → reemplazada por /plataforma/tagventory
      {
        source: '/soluciones/plataforma',
        destination: '/plataforma/tagventory',
        permanent: true,
      },
      // Páginas antiguas indexadas en Google → redirección 301 permanente
      {
        source: '/inventario-inteligente-de-activos',
        destination: '/soluciones/identificacion-inteligente',
        permanent: true,
      },
      {
        source: '/inventario-inteligente-activo-electronico',
        destination: '/soluciones/identificacion-inteligente',
        permanent: true,
      },
      {
        source: '/inventario-inteligente-de-mobiliario-y-equipo-de-oficina',
        destination: '/soluciones/identificacion-inteligente',
        permanent: true,
      },
      {
        source: '/programa-de-canales-htk',
        destination: '/nosotros',
        permanent: true,
      },
      // Blog WordPress anterior → blog nuevo (301)
      ...blogRedirects,
    ];
  },
};

export default nextConfig;
