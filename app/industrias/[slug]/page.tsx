import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { industries, icps, solutions, caseApplications, caseSuccesses } from '@/data/content';
import { buildMeta } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return {};
  return buildMeta(
    `Control de activos en ${industry.title}`,
    `${industry.description} HTK ofrece identificación, trazabilidad y control de activos para empresas del sector ${industry.title.toLowerCase()}.`,
    `/industrias/${slug}`
  );
}

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
  return industries.map((ind) => ({ slug: ind.slug }));
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) notFound();

  const hasRichContent = 'heroHeadline' in industry;

  // Cases: use caseSlugs if defined, else fall back to industrySlug filter
  const relatedCases = hasRichContent && 'caseSlugs' in industry && industry.caseSlugs
    ? (industry.caseSlugs as string[]).map((s) => caseApplications.find((c) => c.slug === s)).filter(Boolean)
    : caseApplications.filter((c) => c.industrySlug === industry.slug);

  const relatedSuccess = caseSuccesses.filter((c) => c.industrySlug === industry.slug);

  // ICPs: use icpItems if defined, else generic slice
  const icpItems = hasRichContent && 'icpItems' in industry && industry.icpItems
    ? (industry.icpItems as { slug: string; note: string }[]).map((item) => ({
        ...item,
        icp: icps.find((i) => i.slug === item.slug),
      })).filter((i) => i.icp)
    : icps.slice(0, 3).map((icp) => ({ slug: icp.slug, note: icp.description, icp }));

  // Solutions: use solutionSlugs if defined, else generic slice
  const relatedSolutions = hasRichContent && 'solutionSlugs' in industry && industry.solutionSlugs
    ? (industry.solutionSlugs as string[]).map((s) => solutions.find((sol) => sol.slug === s)).filter(Boolean)
    : solutions.slice(0, 3);

  const ind = industry as Record<string, unknown>;
  const heroHeadline = (ind.heroHeadline as string | undefined) ?? industry.title;
  const heroSubheadline = (ind.heroSubheadline as string | undefined) ?? industry.description;
  const ctaHeadline = (ind.ctaHeadline as string | undefined) ?? `¿Tu empresa está en ${industry.title}?`;
  const ctaSubtext = (ind.ctaSubtext as string | undefined) ?? 'Agenda un diagnóstico sin costo para entender cuál es tu nivel de control actual y qué puedes mejorar.';

  return (
    <>
      {/* Hero */}
      <section className="bg-surface-base pt-28 pb-20 border-b border-border-subtle">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="text-xs text-ink-300 hover:text-brand transition-colors">Inicio</Link>
              <span className="text-ink-300 text-xs">/</span>
              <span className="text-xs text-ink-300">Industrias</span>
              <span className="text-ink-300 text-xs">/</span>
              <span className="text-xs text-brand">{industry.title}</span>
            </div>

            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-5">Industria</p>
            <h1 className="mb-5">{heroHeadline}</h1>
            <p className="text-[17px] text-ink-500 leading-relaxed mb-8 max-w-2xl">{heroSubheadline}</p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/sesion"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
              >
                Solicitar diagnóstico <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contexto de la industria */}
      {'contextTitle' in industry && industry.contextTitle && (
        <section className="bg-surface-alt py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Contexto</p>
                <h2 className="mb-6">{industry.contextTitle as string}</h2>
                <p className="text-[17px] text-ink-500 leading-relaxed mb-2">{industry.contextText as string}</p>
              </div>
              <div className="p-6 bg-surface-raised border border-border-subtle rounded-card">
                <ul className="space-y-3 mb-6">
                  {(industry.contextItems as string[]).map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                        <CheckIcon />
                      </span>
                      <span className="text-sm text-ink-500 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                {'contextFooter' in industry && industry.contextFooter && (
                  <p className="text-sm text-ink-500 leading-relaxed border-l-2 border-brand/30 pl-4">
                    {industry.contextFooter as string}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Problemas en esta industria */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Problemática del sector</p>
          <h2 className="mb-4">
            {'problemsTitle' in industry && industry.problemsTitle
              ? industry.problemsTitle as string
              : `Problemas comunes en ${industry.title}`}
          </h2>
          <p className="text-[17px] text-ink-500 mb-10 max-w-2xl">
            {'problemsText' in industry && industry.problemsText
              ? industry.problemsText as string
              : 'El control de activos en este sector enfrenta retos únicos. Estos son los más frecuentes.'}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {icpItems.map(({ slug: icpSlug, note, icp }) => icp && (
              <Link
                key={icpSlug}
                href={`/problemas/${icpSlug}`}
                className="group p-5 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
              >
                <span className="text-xs font-medium tracking-wider uppercase text-brand block mb-2">{icp.title}</span>
                <p className="text-sm text-ink-700 font-medium leading-snug mb-3">{note}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand group-hover:gap-2.5 transition-all">
                  Ver problema <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Impacto */}
      {'impactGroups' in industry && industry.impactGroups && (
        <section className="bg-surface-alt py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Impacto</p>
            <h2 className="mb-4">{industry.impactTitle as string}</h2>
            {'impactText' in industry && industry.impactText && (
              <p className="text-[17px] text-ink-500 mb-10 max-w-2xl">{industry.impactText as string}</p>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-8">
              {(industry.impactGroups as { category: string; items: string[] }[]).map((group) => (
                <div key={group.category} className="p-5 bg-surface-raised border border-border-subtle rounded-card">
                  <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">{group.category}</p>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ink-500 leading-relaxed">
                        <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400" />
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

      {/* Cómo se vive por área */}
      {'profiles' in industry && industry.profiles && (
        <section className="bg-surface-base py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Por área</p>
            <h2 className="mb-10">Este problema impacta directamente la operación clínica</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {(industry.profiles as { role: string; quote: string }[]).map((profile) => (
                <div key={profile.role} className="p-5 bg-surface-raised border border-border-subtle rounded-card">
                  <p className="text-xs font-medium text-brand mb-3">{profile.role}</p>
                  <p className="text-sm text-ink-500 leading-relaxed italic">&ldquo;{profile.quote}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Casos de aplicación */}
      {relatedCases.length > 0 && (
        <section className="bg-surface-alt py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Casos de aplicación</p>
            <h2 className="mb-4">
              {'casesTitle' in industry && industry.casesTitle
                ? industry.casesTitle as string
                : `Implementaciones en ${industry.title}`}
            </h2>
            {'casesText' in industry && industry.casesText && (
              <p className="text-[17px] text-ink-500 mb-10 max-w-2xl">{industry.casesText as string}</p>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedCases.map((c) => c && (
                <Link
                  key={c.slug}
                  href={`/casos-aplicacion/${c.slug}`}
                  className="group p-6 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
                >
                  <h3 className="text-base font-medium text-ink mb-2">{c.title}</h3>
                  <p className="text-sm text-ink-500 leading-relaxed mb-4 line-clamp-3">{c.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-3 transition-all">
                    Ver caso <ArrowRight />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cómo lo resuelve HTK */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Cómo lo resolvemos</p>
          <h2 className="mb-4">
            {'solutionTitle' in industry && industry.solutionTitle
              ? industry.solutionTitle as string
              : `La solución HTK para ${industry.title}`}
          </h2>
          {'solutionText' in industry && industry.solutionText && (
            <p className="text-[17px] text-ink-500 mb-10 max-w-2xl">{industry.solutionText as string}</p>
          )}

          <div className="grid md:grid-cols-2 gap-10">
            {'capabilities' in industry && industry.capabilities && (
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-ink-300 mb-5">Capacidades clave en esta industria</p>
                <ul className="space-y-3">
                  {(industry.capabilities as string[]).map((cap) => (
                    <li key={cap} className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                        <CheckIcon />
                      </span>
                      <span className="text-sm text-ink-700">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-ink-300 mb-5">Soluciones relacionadas</p>
              <div className="space-y-4">
                {relatedSolutions.map((s) => s && (
                  <Link
                    key={s.slug}
                    href={`/soluciones/${s.slug}`}
                    className="group flex items-start gap-4 p-4 border border-border-subtle rounded-card bg-surface-raised hover:border-brand/30 hover:shadow-sm transition-all"
                  >
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-ink mb-1">{s.title}</h3>
                      <p className="text-sm text-ink-300 leading-relaxed">{s.tagline}</p>
                    </div>
                    <span className="mt-1 text-brand group-hover:translate-x-1 transition-transform">
                      <ArrowRight />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Casos de éxito */}
      {('industrySuccessCards' in industry && industry.industrySuccessCards
        ? true
        : relatedSuccess.length > 0) && (
        <section className="bg-surface-alt py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Evidencia</p>
            <h2 className="mb-10">Instituciones que pasaron de buscar equipos a tenerlos disponibles</h2>
            {'industrySuccessCards' in industry && industry.industrySuccessCards ? (
              <div className="grid md:grid-cols-3 gap-5">
                {(industry.industrySuccessCards as { client: string; metric: string; metricLabel: string }[]).map((card) => (
                  <div key={card.client} className="p-6 bg-surface-raised border border-border-subtle rounded-card">
                    <div className="text-3xl font-medium text-brand mb-1">{card.metric}</div>
                    <div className="text-xs font-medium text-ink-300 mb-3">{card.metricLabel}</div>
                    <p className="text-sm font-medium text-ink">{card.client}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedSuccess.map((cs) => (
                  <Link
                    key={cs.slug}
                    href={`/casos-exito/${cs.slug}`}
                    className="group p-6 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
                  >
                    <div className="text-2xl font-medium text-brand mb-1">{cs.metric}</div>
                    <div className="text-xs font-medium text-ink-300 mb-3">{cs.metricLabel}</div>
                    <p className="text-sm font-medium text-ink mb-1">{cs.client}</p>
                    <p className="text-sm text-ink-300 mb-4">{cs.result}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-3 transition-all">
                      Ver caso de éxito <ArrowRight />
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Otras industrias */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Otros sectores</p>
          <h2 className="mb-8">Aplicamos esto en más industrias</h2>
          <div className="flex flex-wrap gap-3">
            {industries.filter((i) => i.slug !== industry.slug).map((ind) => (
              <Link
                key={ind.slug}
                href={`/industrias/${ind.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 border border-border-subtle bg-surface-raised rounded-btn text-sm text-ink-700 hover:border-brand/40 hover:text-brand transition-colors"
              >
                {ind.title} <ArrowRight size={12} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-dark py-24">
        <div className="max-w-8xl mx-auto px-6 md:px-10 text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Siguiente paso</p>
          <h2 className="text-white mb-4">{ctaHeadline}</h2>
          <p className="text-[17px] text-white/60 max-w-xl mx-auto mb-8">{ctaSubtext}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/sesion"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
            >
              Solicitar diagnóstico <ArrowRight />
            </Link>
            <Link
              href="/nosotros"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 text-white text-sm font-medium rounded-btn hover:bg-white/10 transition-colors"
            >
              Conocer HTK
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
