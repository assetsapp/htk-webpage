import type { Metadata } from 'next';
import { buildMeta, breadcrumbSchema } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = (await import('@/data/content')).solutions.find((s) => s.slug === slug);
  if (!solution) return {};
  return buildMeta(`${solution.title} — Capacidad HTK`, solution.description, `/soluciones/${slug}`);
}

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { solutions, caseApplications } from '@/data/content';

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2.5 7l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = solutions.find((s) => s.slug === slug);

  if (!solution) notFound();

  const sol = solution as Record<string, unknown>;
  const hasRichContent = 'heroHeadline' in solution;

  const otherSolutions = solutions.filter((s) => s.slug !== solution.slug);

  const relatedCases = hasRichContent && Array.isArray(sol.queHabilitaCasos)
    ? (sol.queHabilitaCasos as { label: string; slug: string }[])
        .map((c) => caseApplications.find((ca) => ca.slug === c.slug))
        .filter(Boolean)
    : caseApplications.slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: 'Inicio', href: '/' },
          { name: 'Soluciones', href: '/soluciones' },
          { name: solution.title, href: `/soluciones/${solution.slug}` },
        ])) }}
      />
      {/* Hero */}
      <section className="bg-surface-base pt-28 pb-20 border-b border-border-subtle">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-2 mb-5">
            <Link href="/" className="text-xs text-ink-300 hover:text-brand transition-colors">Inicio</Link>
            <span className="text-ink-300 text-xs">/</span>
            <span className="text-xs text-ink-300">Soluciones</span>
            <span className="text-ink-300 text-xs">/</span>
            <span className="text-xs text-brand">{solution.title}</span>
          </div>

          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-5">Capacidad HTK</p>
            <h1 className="mb-4">
              {hasRichContent && sol.heroHeadline ? sol.heroHeadline as string : solution.title}
            </h1>
            <p className="text-[17px] text-ink-500 leading-relaxed mb-8 max-w-2xl">
              {hasRichContent && sol.heroSubheadline ? sol.heroSubheadline as string : solution.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/sesion"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
              >
                Agendar sesión gratuita <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Qué es */}
      {hasRichContent && !!sol.queEsTitle && (
        <section className="bg-surface-alt py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Qué es</p>
                <h2 className="mb-6">{sol.queEsTitle as string}</h2>
              </div>
              <div className="space-y-4">
                {(sol.queEsText as string[]).map((p, i) => (
                  <p key={i} className="text-[17px] text-ink-500 leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* El problema que resuelve */}
      {hasRichContent && !!sol.problemaTitle && (
        <section className="bg-surface-base py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">El problema que resuelve</p>
                <h2 className="mb-6">{sol.problemaTitle as string}</h2>
                <div className="space-y-4">
                  {(sol.problemaText as string[]).map((p, i) => (
                    <p key={i} className="text-[17px] text-ink-500 leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-surface-raised border border-border-subtle rounded-card">
                <p className="text-xs font-medium tracking-widest uppercase text-ink-300 mb-4">Capacidades que habilita</p>
                <ul className="space-y-3">
                  {(sol.queHabilitaCapacidades as string[]).map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-ink-500">
                      <span className="mt-0.5 text-brand flex-shrink-0"><CheckIcon /></span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Cómo funciona */}
      {hasRichContent && !!sol.comoFuncionaTitle && (
        <section className="bg-surface-alt py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Cómo funciona</p>
            <h2 className="mb-4">{sol.comoFuncionaTitle as string}</h2>
            {!!sol.comoFuncionaText && (
              <p className="text-[17px] text-ink-500 leading-relaxed mb-10 max-w-2xl">{sol.comoFuncionaText as string}</p>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(sol.comoFuncionaGroups as { title: string; items: string[] }[]).map((group) => (
                <div key={group.title} className="p-5 bg-surface-raised border border-border-subtle rounded-card">
                  <p className="text-xs font-medium text-brand uppercase tracking-wider mb-3">{group.title}</p>
                  <ul className="space-y-2">
                    {group.items.map((item, i) => (
                      <li key={i} className="text-sm text-ink-500 leading-snug flex items-start gap-2">
                        <span className="mt-0.5 text-brand/40 flex-shrink-0">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Qué habilita - casos de aplicación */}
      {hasRichContent && Array.isArray(sol.queHabilitaCasos) && (sol.queHabilitaCasos as unknown[]).length > 0 && (
        <section className="bg-surface-base py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">En la práctica</p>
            <h2 className="mb-4">{hasRichContent && sol.queHabilitaTitle ? sol.queHabilitaTitle as string : 'Casos de aplicación con esta capacidad'}</h2>
            <p className="text-[17px] text-ink-500 leading-relaxed mb-10 max-w-2xl">Estas son las situaciones concretas donde esta capacidad genera valor directo.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedCases.map((c) => c && (
                <Link
                  key={c.slug}
                  href={`/casos-aplicacion/${c.slug}`}
                  className="group p-5 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
                >
                  <h3 className="text-sm font-medium text-ink mb-2">{c.title}</h3>
                  <p className="text-sm text-ink-500 leading-relaxed mb-4 line-clamp-2">{c.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand group-hover:gap-3 transition-all">
                    Ver caso <ArrowRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Resultado */}
      {hasRichContent && Array.isArray(sol.resultado) && (
        <section className="bg-surface-alt py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Resultado</p>
                <h2 className="mb-4">{sol.resultadoTitle as string}</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {(sol.resultado as string[]).map((r, i) => (
                  <div key={i} className="flex items-start gap-2 p-4 bg-surface-raised border border-border-subtle rounded-card">
                    <span className="mt-0.5 text-green-500 flex-shrink-0"><CheckIcon /></span>
                    <span className="text-sm text-ink-500">{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Diferenciador HTK */}
      {hasRichContent && Array.isArray(sol.diferenciador) && (
        <section className="bg-surface-base py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Diferenciador HTK</p>
                <h2 className="mb-6">{sol.diferenciadorTitle as string}</h2>
                <ul className="space-y-3">
                  {(sol.diferenciador as string[]).map((d, i) => (
                    <li key={i} className="flex items-start gap-3 text-[17px] text-ink-500">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 bg-brand-tint50 border border-brand-tint100 rounded-block">
                <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Plataforma central</p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="white" strokeWidth="1.5">
                      <rect x="3" y="3" width="16" height="16" rx="3" />
                      <path d="M7 8h8M7 11h5M7 14h8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-base font-medium text-ink">Tagventory</p>
                    <p className="text-sm text-ink-500">Plataforma propia HTK</p>
                  </div>
                </div>
                <p className="text-sm text-ink-500 leading-relaxed">
                  Tagventory es la plataforma donde convergen identificación, trazabilidad, integración, automatización y visibilidad en un solo sistema operativo.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Otras soluciones */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Capacidades relacionadas</p>
          <h2 className="mb-10">Otras capacidades HTK</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {otherSolutions.map((s) => (
              <Link
                key={s.slug}
                href={`/soluciones/${s.slug}`}
                className="group flex items-center justify-between p-5 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
              >
                <div>
                  <h3 className="text-sm font-medium text-ink mb-1">{s.title}</h3>
                  <p className="text-xs text-ink-300">{s.tagline}</p>
                </div>
                <span className="text-brand opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4">
                  <ArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-dark py-24">
        <div className="max-w-8xl mx-auto px-6 md:px-10 text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Siguiente paso</p>
          <h2 className="text-white mb-4">
            {hasRichContent && sol.ctaHeadline ? sol.ctaHeadline as string : `¿Necesitas ${solution.title.toLowerCase()} en tu operación?`}
          </h2>
          <p className="text-[17px] text-white/60 max-w-xl mx-auto mb-8">
            {hasRichContent && sol.ctaSubtext ? sol.ctaSubtext as string : 'Un diagnóstico nos permite entender tu situación actual y diseñar la solución correcta.'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/sesion"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
            >
              Agendar sesión gratuita <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
