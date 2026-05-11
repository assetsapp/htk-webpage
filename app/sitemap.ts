import { MetadataRoute } from 'next';
import { icps, industries, solutions, caseApplications, caseSuccesses } from '@/data/content';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/nosotros`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/sesion`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/casos-exito`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/soluciones/plataforma`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/recursos/autodiagnostico-control-activos`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/recursos/calculadora-roi-activos`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/recursos/checklist-control-activos`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];

  const problemPages: MetadataRoute.Sitemap = icps.map((p) => ({
    url: `${SITE_URL}/problemas/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const industryPages: MetadataRoute.Sitemap = industries.map((i) => ({
    url: `${SITE_URL}/industrias/${i.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const solutionPages: MetadataRoute.Sitemap = solutions.map((s) => ({
    url: `${SITE_URL}/soluciones/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const caseAppPages: MetadataRoute.Sitemap = caseApplications.map((c) => ({
    url: `${SITE_URL}/casos-aplicacion/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const caseSuccessPages: MetadataRoute.Sitemap = caseSuccesses.map((c) => ({
    url: `${SITE_URL}/casos-exito/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...problemPages,
    ...industryPages,
    ...solutionPages,
    ...caseAppPages,
    ...caseSuccessPages,
  ];
}
