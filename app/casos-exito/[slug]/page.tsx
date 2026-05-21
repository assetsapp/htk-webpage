import type { Metadata } from 'next';
import { buildMeta, breadcrumbSchema } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = (await import('@/data/content')).caseSuccesses.find((c) => c.slug === slug);
  if (!cs) return {};
  const desc = ('metaDescription' in cs && cs.metaDescription) ? cs.metaDescription as string : cs.result;
  return buildMeta(`Caso de éxito: ${cs.client}`, desc, `/casos-exito/${slug}`);
}

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { caseSuccesses, icps, industries, solutions, caseApplications } from '@/data/content';

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
  return caseSuccesses.map((c) => ({ slug: c.slug }));
}

export default async function CaseSuccessPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = caseSuccesses.find((c) => c.slug === slug);

  if (!cs) notFound();

  const c = cs as Record<string, unknown>;
  const hasRichContent = 'heroHeadline' in cs;

  const icp = icps.find((i) => i.slug === cs.icpSlug);
  const industry = industries.find((i) => i.slug === cs.industrySlug);

  const relatedSolution = hasRichContent && c.solucionRelacionada
    ? solutions.find((s) => s.slug === (c.solucionRelacionada as string))
    : solutions.slice(0, 1)[0];

  const capacidades = hasRichContent && Array.isArray(c.capacidades)
    ? (c.capacidades as { label: string; slug: string; type: 'caso' | 'solucion' }[])
    : [];

  const otherCases = caseSuccesses.filter((x) => x.slug !== cs.slug).slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: 'Inicio', href: '/' },
          { name: 'Casos de éxito', href: '/casos-exito' },
          { name: cs.client, href: `/casos-exito/${cs.slug}` },
        ])) }}
      />
      {/* Hero */}
      <section className="bg-surface-base pt-28 pb-20 border-b border-border-subtle">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-2 mb-5">
            <Link href="/" className="text-xs text-ink-300 hover:text-brand transition-colors">Inicio</Link>
            <span className="text-ink-300 text-xs">/</span>
            <Link href="/casos-exito" className="text-xs text-ink-300 hover:text-brand transition-colors">Casos de éxito</Link>
            <span className="text-ink-300 text-xs">/</span>
            <span className="text-xs text-brand">{cs.client}</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                {cs.logo ? (
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center bg-surface-alt border border-border-subtle flex-shrink-0">
                    <Image src={cs.logo} alt={cs.client} width={48} height={48} className="object-contain w-10 h-10" />
                  </div>
                ) : (
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-sm font-bold"
                    style={{ backgroundColor: cs.color }}
                  >
                    {cs.initials}
                  </div>
                )}
                <div>
                  <p className="text-xs font-medium tracking-widest uppercase text-brand">Caso de éxito</p>
                  <p className="text-base font-medium text-ink">{cs.client}</p>
                  <p className="text-xs text-ink-300">{cs.sector}</p>
                </div>
              </div>

              <h1 className="mb-5">
                {hasRichContent && c.heroHeadline ? c.heroHeadline as string : cs.client}
              </h1>
              <p className="text-[17px] text-ink-500 leading-relaxed mb-8 max-w-2xl">
                {hasRichContent && c.heroSubheadline ? c.heroSubheadline as string : cs.result}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/sesion"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
                >
                  Agendar sesión gratuita <ArrowRight />
                </Link>
                {relatedSolution && (
                  <Link
                    href={`/soluciones/${relatedSolution.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-ink-700 text-ink-700 text-sm font-medium rounded-btn hover:bg-surface-alt transition-colors"
                  >
                    Ver solución relacionada
                  </Link>
                )}
              </div>
            </div>

            <div className="bg-surface-raised border border-border-subtle rounded-block p-8 text-center">
              <div className="text-5xl font-semibold text-brand mb-2">{cs.metric}</div>
              <div className="text-sm font-medium text-ink-500 mb-5">{cs.metricLabel}</div>
              <p className="text-sm text-ink-300 leading-relaxed">{cs.result}</p>
              <div className="mt-6 pt-4 border-t border-border-subtle">
                <span className="text-xs font-medium text-ink-300 border border-border-subtle px-3 py-1 rounded-full">
                  {cs.sector}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* El reto */}
      {hasRichContent && !!c.retoTitle && (
        <section className="bg-surface-alt py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">El reto</p>
                <h2 className="mb-6">{c.retoTitle as string}</h2>
              </div>
              <div className="space-y-4">
                {(c.retoText as string[]).map((p, i) => (
                  <p key={i} className="text-[17px] text-ink-500 leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Complejidad del proyecto */}
      {hasRichContent && !!c.complejidadTitle && (
        <section className="bg-surface-base py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">La complejidad</p>
            <h2 className="mb-10 max-w-3xl">{c.complejidadTitle as string}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {(c.complejidadText as string[]).map((p, i) => (
                <p key={i} className="text-[17px] text-ink-500 leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* La solución */}
      {hasRichContent && !!c.solucionTitle && (
        <section className="bg-surface-alt py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">La solución</p>
                <h2 className="mb-6">{c.solucionTitle as string}</h2>
              </div>
              <div className="p-6 bg-surface-raised border border-border-subtle rounded-card">
                <ul className="space-y-3">
                  {(c.solucionItems as string[]).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-ink-500">
                      <span className="mt-0.5 text-brand flex-shrink-0"><CheckIcon /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* El impacto */}
      {hasRichContent && !!c.impactoTitle && (
        <section className="bg-surface-base py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">El impacto</p>
                <h2 className="mb-6">{c.impactoTitle as string}</h2>
              </div>
              <div className="space-y-4">
                {(c.impactoText as string[]).map((p, i) => (
                  <p key={i} className="text-[17px] text-ink-500 leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Resultado ampliado */}
      {hasRichContent && !!c.resultadoAmpliado && (
        <section className="bg-surface-alt py-16">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Resultado ampliado</p>
                <h2 className="mb-4">Un proyecto nacional que abrió la puerta a expansión internacional</h2>
              </div>
              <p className="text-[17px] text-ink-500 leading-relaxed">{c.resultadoAmpliado as string}</p>
            </div>
          </div>
        </section>
      )}

      {/* Capacidades + Resultado de negocio */}
      {hasRichContent && (capacidades.length > 0 || Array.isArray(c.resultadoItems)) && (
        <section className="bg-surface-base py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-12">
              {capacidades.length > 0 && (
                <div>
                  <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Capacidades activadas</p>
                  <h2 className="mb-6">Qué resolvió HTK en este caso</h2>
                  <div className="flex flex-col gap-3">
                    {capacidades.map((cap) => (
                      <Link
                        key={cap.slug}
                        href={`/${cap.type === 'caso' ? 'casos-aplicacion' : 'soluciones'}/${cap.slug}`}
                        className="group flex items-center justify-between p-4 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
                      >
                        <div>
                          <span className="text-xs font-medium text-ink-300 uppercase tracking-wider">
                            {cap.type === 'caso' ? 'Caso de aplicación' : 'Solución'}
                          </span>
                          <p className="text-sm font-medium text-ink group-hover:text-brand transition-colors">{cap.label}</p>
                        </div>
                        <ArrowRight />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {Array.isArray(c.resultadoItems) && (
                <div>
                  <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Resultado de negocio</p>
                  <h2 className="mb-6">Lo que cambió para el cliente</h2>
                  <div className="flex flex-col gap-3">
                    {(c.resultadoItems as string[]).map((r, i) => (
                      <div key={i} className="flex items-start gap-2 p-4 bg-surface-raised border border-border-subtle rounded-card">
                        <span className="mt-0.5 text-green-500 flex-shrink-0"><CheckIcon /></span>
                        <span className="text-sm text-ink-500">{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Industria / ICP */}
      {(icp || industry) && (
        <section className="bg-surface-alt py-16">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-6">Contexto</p>
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
              {icp && (
                <Link
                  href={`/problemas/${icp.slug}`}
                  className="group p-5 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
                >
                  <span className="text-xs font-medium tracking-wider uppercase text-brand block mb-2">Problema abordado</span>
                  <p className="text-sm font-medium text-ink mb-3 leading-snug">{icp.headline}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand group-hover:gap-3 transition-all">
                    Ver problema <ArrowRight size={12} />
                  </span>
                </Link>
              )}
              {industry && (
                <Link
                  href={`/industrias/${industry.slug}`}
                  className="group p-5 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
                >
                  <span className="text-xs font-medium tracking-wider uppercase text-brand block mb-2">Industria</span>
                  <p className="text-sm font-medium text-ink mb-1">{industry.title}</p>
                  <p className="text-xs text-ink-300 mb-3 line-clamp-2">{industry.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand group-hover:gap-3 transition-all">
                    Ver industria <ArrowRight size={12} />
                  </span>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Otros casos */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Más resultados</p>
          <h2 className="mb-10">Otros casos de éxito</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherCases.map((other) => (
              <Link
                key={other.slug}
                href={`/casos-exito/${other.slug}`}
                className="group p-5 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
              >
                <div className="text-2xl font-semibold text-brand mb-1">{other.metric}</div>
                <div className="text-xs text-ink-300 mb-3">{other.metricLabel}</div>
                <p className="text-sm font-medium text-ink mb-1">{other.client}</p>
                <p className="text-xs text-ink-300 mb-4 line-clamp-2">{other.result}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand group-hover:gap-3 transition-all">
                  Ver caso <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-dark py-24">
        <div className="max-w-8xl mx-auto px-6 md:px-10 text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Tu turno</p>
          <h2 className="text-white mb-4">
            {hasRichContent && c.ctaHeadline ? c.ctaHeadline as string : '¿Quieres resultados similares?'}
          </h2>
          <p className="text-[17px] text-white/60 max-w-xl mx-auto mb-8">
            {hasRichContent && c.ctaSubtext ? c.ctaSubtext as string : 'Empieza con un diagnóstico. Identifica el problema, dimensiona la solución y conoce el impacto esperado.'}
          </p>
          <Link
            href="/sesion"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
          >
            Agendar sesión gratuita <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
