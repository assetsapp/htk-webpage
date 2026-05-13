export const SITE_URL = 'https://www.htk-id.com';
export const SITE_NAME = 'HTK Identificación Inteligente';
export const DEFAULT_DESCRIPTION =
  'HTK conecta el mundo físico con decisiones confiables. Control, trazabilidad y automatización de activos para empresas que no pueden permitirse perder el control.';

export function buildTitle(pageTitle: string) {
  return `${pageTitle} | HTK`;
}

export function buildMeta(title: string, description: string, path = '') {
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      locale: 'es_MX',
      type: 'website' as const,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
    },
  };
}

// JSON-LD helpers
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/htk-logo-navbar.webp`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+52-55-1761-0313',
      contactType: 'sales',
      email: 'ventas@htk-id.com',
      availableLanguage: 'Spanish',
    },
    sameAs: ['https://www.linkedin.com/company/htk-id'],
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
