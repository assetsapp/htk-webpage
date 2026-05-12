import type { NextConfig } from 'next';

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
      // Páginas antiguas indexadas en Google → redirección 301 permanente
      {
        source: '/inventario-inteligente-de-activos',
        destination: '/soluciones/control-visibilidad-activos',
        permanent: true,
      },
      {
        source: '/inventario-inteligente-activo-electronico',
        destination: '/soluciones/control-visibilidad-activos',
        permanent: true,
      },
      {
        source: '/inventario-inteligente-de-mobiliario-y-equipo-de-oficina',
        destination: '/soluciones/control-visibilidad-activos',
        permanent: true,
      },
      {
        source: '/programa-de-canales-htk',
        destination: '/nosotros',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
