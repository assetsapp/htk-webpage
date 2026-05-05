import { notFound } from 'next/navigation';
import Link from 'next/link';
import { caseApplications, icps, industries, solutions } from '@/data/content';

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
  return caseApplications.map((c) => ({ slug: c.slug }));
}

export default async function CaseApplicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseApp = caseApplications.find((c) => c.slug === slug);

  if (!caseApp) notFound();

  const ca = caseApp as Record<string, unknown>;
  const hasRichContent = 'problemTitle' in caseApp;

  const icp = icps.find((i) => i.slug === caseApp.icpSlug);

  const relatedSolutions = hasRichContent && Array.isArray(ca.capabilities)
    ? (ca.capabilities as { label: string; slug: string }[])
        .map((c) => solutions.find((s) => s.slug === c.slug))
        .filter(Boolean)
        .filter((s, i, arr) => arr.findIndex((x) => x?.slug === s?.slug) === i)
    : solutions.slice(0, 3);

  const relatedCases = hasRichContent && Array.isArray(ca.relatedCaseSlugs)
    ? (ca.relatedCaseSlugs as string[]).map((s) => caseApplications.find((c) => c.slug === s)).filter(Boolean)
    : caseApplications.filter((c) => c.slug !== caseApp.slug && c.icpSlug === caseApp.icpSlug).slice(0, 3);

  const industryLinks = hasRichContent && Array.isArray(ca.industryLinks)
    ? ca.industryLinks as { slug: string; label: string }[]
    : industries.filter((i) => i.slug === caseApp.industrySlug).map((i) => ({ slug: i.slug, label: i.title }));

  return (
    <>
      {/* Hero */}
      <section className="bg-surface-base pt-28 pb-20 border-b border-border-subtle">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="text-xs text-ink-300 hover:text-brand transition-colors">Inicio</Link>
              <span className="text-ink-300 text-xs">/</span>
              <Link href="/casos-aplicacion/conciliacion-fisico-contable" className="text-xs text-ink-300 hover:text-brand transition-colors">Casos de aplicación</Link>
              <span className="text-ink-300 text-xs">/</span>
              <span className="text-xs text-brand">{caseApp.title}</span>
            </div>

            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-5">Caso de aplicación</p>
            <h1 className="mb-5">{caseApp.headline}</h1>
            <p className="text-[17px] text-ink-500 leading-relaxed mb-8 max-w-2xl">{caseApp.description}</p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/sesion"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
              >
                Solicitar diagnóstico <ArrowRight />
              </Link>
              <Link
                href="/sesion"
                className="inline-flex items-center gap-2 px-6 py-3 border border-ink-700 text-ink-700 text-sm font-medium rounded-btn hover:bg-surface-alt transition-colors"
              >
                Ver demo Tagventory
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* El problema */}
      {hasRichContent && ca.problemTitle && (
        <section className="bg-surface-alt py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">El problema</p>
                <h2 className="mb-6">{ca.problemTitle as string}</h2>
                <div className="space-y-4">
                  {(ca.problemText as string[]).map((p, i) => (
                    <p key={i} className="text-[17px] text-ink-500 leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>

              {!!ca.causas && (
                <div className="p-6 bg-surface-raised border border-border-subtle rounded-card">
                  <p className="text-xs font-medium tracking-widest uppercase text-ink-300 mb-2">{ca.causasTitle as string}</p>
                  <p className="text-sm text-ink-500 mb-5">{ca.causasText as string}</p>
                  <ul className="space-y-3">
                    {(ca.causas as string[]).map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ink-500">
                        <span className="mt-1 text-brand flex-shrink-0"><CheckIcon /></span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Impacto en el negocio */}
      {hasRichContent && ca.impactGroups && (
        <section className="bg-surface-base py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Impacto</p>
            <h2 className="mb-2">{ca.impactTitle as string}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
              {(ca.impactGroups as { category: string; items: string[] }[]).map((group) => (
                <div key={group.category} className="p-5 bg-surface-raised border border-border-subtle rounded-card">
                  <p className="text-xs font-medium text-brand uppercase tracking-wider mb-3">{group.category}</p>
                  <ul className="space-y-2">
                    {group.items.map((item, i) => (
                      <li key={i} className="text-sm text-ink-500 leading-snug">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dónde se presenta + Cómo se vive */}
      {hasRichContent && (ca.industryLinks || ca.profiles) && (
        <section className="bg-surface-alt py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-12">
              {!!ca.industryLinks && (
                <div>
                  <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Dónde se presenta</p>
                  <h2 className="mb-6">Este problema aparece en múltiples industrias</h2>
                  <div className="flex flex-col gap-3">
                    {industryLinks.map((ind) => (
                      <Link
                        key={ind.slug}
                        href={`/industrias/${ind.slug}`}
                        className="group flex items-center justify-between p-4 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
                      >
                        <span className="text-sm font-medium text-ink group-hover:text-brand transition-colors">{ind.label}</span>
                        <ArrowRight />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {!!ca.profiles && (
                <div>
                  <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Cómo se vive</p>
                  <h2 className="mb-6">Cada área lo vive de forma distinta</h2>
                  <div className="flex flex-col gap-3">
                    {(ca.profiles as { role: string; quote: string }[]).map((p) => (
                      <div key={p.role} className="p-4 bg-surface-raised border border-border-subtle rounded-card">
                        <p className="text-xs font-medium text-brand uppercase tracking-wider mb-1">{p.role}</p>
                        <p className="text-sm text-ink-500 italic">"{p.quote}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Manifestaciones en la operación */}
      {hasRichContent && !!ca.manifestaciones && (
        <section className="bg-surface-base py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">En el día a día</p>
                <h2 className="mb-6">Así se ve este problema en la operación</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {(ca.manifestaciones as string[]).map((m, i) => (
                  <div key={i} className="flex items-start gap-2 p-4 bg-surface-raised border border-border-subtle rounded-card">
                    <span className="mt-0.5 text-red-400 flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4 4l6 6M10 4l-6 6" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span className="text-sm text-ink-500">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Cómo lo resuelve HTK */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">La solución</p>
          <h2 className="mb-4">{hasRichContent && ca.solutionTitle ? ca.solutionTitle as string : 'Cómo lo resuelve HTK'}</h2>
          {hasRichContent && !!ca.solutionText && (
            <p className="text-[17px] text-ink-500 leading-relaxed mb-10 max-w-2xl">{ca.solutionText as string}</p>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedSolutions.filter(Boolean).map((s) => s && (
              <Link
                key={s.slug}
                href={`/soluciones/${s.slug}`}
                className="group p-5 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
              >
                <h3 className="text-sm font-medium text-ink mb-1">{s.title}</h3>
                <p className="text-sm text-brand mb-3">{s.tagline}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand group-hover:gap-3 transition-all">
                  Ver solución <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Resultados */}
      {hasRichContent && ca.resultados && (
        <section className="bg-surface-base py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Resultado</p>
                <h2 className="mb-4">Lo que cambia cuando lo resuelves</h2>
                {icp && (
                  <Link
                    href={`/problemas/${icp.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand hover:gap-4 transition-all"
                  >
                    Ver el problema completo: {icp.title} <ArrowRight />
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {(ca.resultados as string[]).map((r, i) => (
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

      {/* Casos relacionados */}
      {relatedCases.length > 0 && (
        <section className="bg-surface-alt py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Más casos</p>
            <h2 className="mb-10">Otros escenarios relacionados</h2>
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

      {/* CTA */}
      <section className="bg-surface-dark py-24">
        <div className="max-w-8xl mx-auto px-6 md:px-10 text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">¿Aplica a tu empresa?</p>
          <h2 className="text-white mb-4">
            {hasRichContent && ca.ctaHeadline ? ca.ctaHeadline as string : '¿Tienes un escenario similar?'}
          </h2>
          <p className="text-[17px] text-white/60 max-w-xl mx-auto mb-8">
            {hasRichContent && ca.ctaSubtext ? ca.ctaSubtext as string : 'Un diagnóstico nos permite confirmar si este caso aplica a tu operación y qué tan compleja sería la implementación.'}
          </p>
          <Link
            href="/sesion"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
          >
            Solicitar diagnóstico <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
