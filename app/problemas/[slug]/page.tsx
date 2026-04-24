import { notFound } from 'next/navigation';
import Link from 'next/link';
import { icps, industries, solutions, caseApplications, caseSuccesses } from '@/data/content';

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function generateStaticParams() {
  return icps.map((icp) => ({ slug: icp.slug }));
}

export default async function ICPPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const icp = icps.find((i) => i.slug === slug);

  if (!icp) notFound();

  const relatedCases = caseApplications.filter((c) => c.icpSlug === icp.slug).slice(0, 3);
  const relatedSuccess = caseSuccesses.filter((c) => c.icpSlug === icp.slug).slice(0, 2);
  const relatedIndustries = industries.slice(0, 3);
  const relatedSolutions = solutions.slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="bg-surface-base pt-28 pb-20 border-b border-border-subtle">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="text-xs text-ink-300 hover:text-brand transition-colors">Inicio</Link>
              <span className="text-ink-300 text-xs">/</span>
              <span className="text-xs text-ink-300">Problemas</span>
              <span className="text-ink-300 text-xs">/</span>
              <span className="text-xs text-brand">{icp.title}</span>
            </div>

            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-5">Problema</p>
            <h1 className="mb-5">{icp.headline}</h1>
            <p className="text-[17px] text-ink-500 leading-relaxed mb-8 max-w-2xl">
              {icp.description} Sin un sistema de control centralizado, las empresas toman decisiones con información incompleta, exponiéndose a pérdidas económicas, riesgos operativos y sanciones regulatorias.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/diagnostico"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
              >
                Solicitar diagnóstico <ArrowRight />
              </Link>
              <Link
                href="/demo-tagventory"
                className="inline-flex items-center gap-2 px-6 py-3 border border-ink-700 text-ink-700 text-sm font-medium rounded-btn hover:bg-surface-alt transition-colors"
              >
                Ver demo Tagventory
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Consecuencias</p>
          <h2 className="mb-4">El costo de no resolver este problema</h2>
          <p className="text-[17px] text-ink-500 mb-10 max-w-2xl">
            Operar sin visibilidad sobre tus activos no es solo ineficiencia, es riesgo estratégico.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: 'Pérdidas económicas', desc: 'Activos extraviados, duplicados o dados de alta sin existencia física.' },
              { label: 'Riesgo regulatorio', desc: 'Auditorías fallidas, sanciones y exposición por falta de documentación.' },
              { label: 'Decisiones incorrectas', desc: 'Planeación basada en datos que no reflejan la realidad operativa.' },
              { label: 'Ineficiencia operativa', desc: 'Tiempo y recursos dedicados a buscar, conciliar y corregir.' },
            ].map((item) => (
              <div key={item.label} className="p-6 bg-surface-raised border border-border-subtle rounded-card">
                <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center mb-4">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#EF4444" strokeWidth="1.5">
                    <path d="M8 2v8M8 13v.5" strokeLinecap="round" />
                    <circle cx="8" cy="8" r="6.5" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-ink mb-2">{item.label}</h3>
                <p className="text-sm text-ink-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Cómo lo resolvemos</p>
          <h2 className="mb-4">La solución HTK para este problema</h2>
          <p className="text-[17px] text-ink-500 mb-10 max-w-2xl">
            Nuestro enfoque combina tecnología de identificación, plataforma Tagventory e integración con tus sistemas actuales.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            {relatedSolutions.map((s) => (
              <Link
                key={s.slug}
                href={`/soluciones/${s.slug}`}
                className="group p-6 border border-border-subtle rounded-card bg-surface-raised hover:border-brand/30 hover:shadow-sm transition-all"
              >
                <h3 className="text-base font-medium text-ink mb-2">{s.title}</h3>
                <p className="text-sm font-medium text-brand mb-2">{s.tagline}</p>
                <p className="text-sm text-ink-500 leading-relaxed mb-4">{s.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-3 transition-all">
                  Ver solución <ArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      {relatedCases.length > 0 && (
        <section className="bg-surface-alt py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Casos de aplicación</p>
            <h2 className="mb-10">Cómo se ve esto en la operación real</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {relatedCases.map((c) => (
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

      {/* Industrias */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Industrias</p>
          <h2 className="mb-4">Sectores donde resolvemos este problema</h2>
          <div className="flex flex-wrap gap-3 mb-8">
            {relatedIndustries.map((ind) => (
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

      {/* Success cases */}
      {relatedSuccess.length > 0 && (
        <section className="bg-surface-alt py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Evidencia</p>
            <h2 className="mb-10">Clientes que resolvieron este problema</h2>
            <div className="grid md:grid-cols-2 gap-5 max-w-3xl">
              {relatedSuccess.map((cs) => (
                <Link
                  key={cs.slug}
                  href={`/casos-exito/${cs.slug}`}
                  className="group p-6 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
                >
                  <div className="text-3xl font-medium text-brand mb-1">{cs.metric}</div>
                  <div className="text-xs font-medium text-ink-300 mb-3">{cs.metricLabel}</div>
                  <p className="text-sm font-medium text-ink mb-1">{cs.client}</p>
                  <p className="text-sm text-ink-300 mb-4">{cs.result}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-3 transition-all">
                    Ver caso de éxito <ArrowRight />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-surface-dark py-24 relative overflow-hidden">
        <div className="max-w-8xl mx-auto px-6 md:px-10 text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Siguiente paso</p>
          <h2 className="text-white mb-4">¿Tienes este problema en tu operación?</h2>
          <p className="text-[17px] text-white/60 max-w-xl mx-auto mb-8">
            Un diagnóstico gratuito identifica en qué parte del proceso está el riesgo y qué tan grave es.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/diagnostico"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
            >
              Solicitar diagnóstico gratuito <ArrowRight />
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
