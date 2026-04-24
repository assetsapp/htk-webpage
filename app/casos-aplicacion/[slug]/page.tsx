import { notFound } from 'next/navigation';
import Link from 'next/link';
import { caseApplications, icps, industries, solutions, caseSuccesses } from '@/data/content';

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
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

  const icp = icps.find((i) => i.slug === caseApp.icpSlug);
  const industry = industries.find((i) => i.slug === caseApp.industrySlug);
  const relatedSolutions = solutions.slice(0, 2);
  const relatedSuccess = caseSuccesses.find((c) => c.industrySlug === caseApp.industrySlug);
  const otherCases = caseApplications.filter((c) => c.slug !== caseApp.slug && c.icpSlug === caseApp.icpSlug).slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="bg-surface-base pt-28 pb-20 border-b border-border-subtle">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-2 mb-5">
            <Link href="/" className="text-xs text-ink-300 hover:text-brand transition-colors">Inicio</Link>
            <span className="text-ink-300 text-xs">/</span>
            <span className="text-xs text-ink-300">Casos de aplicación</span>
            <span className="text-ink-300 text-xs">/</span>
            <span className="text-xs text-brand">{caseApp.title}</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2">
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Caso de aplicación</p>
              <h1 className="mb-4">{caseApp.title}</h1>
              <p className="text-xl font-medium text-ink-500 mb-5">{caseApp.headline}</p>
              <p className="text-[17px] text-ink-500 leading-relaxed mb-8">{caseApp.description}</p>

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
                  Ver demo
                </Link>
              </div>
            </div>

            <div className="bg-surface-raised border border-border-subtle rounded-block p-6 flex flex-col gap-5">
              {icp && (
                <div>
                  <p className="text-xs font-medium text-ink-300 uppercase tracking-wider mb-2">Problema central</p>
                  <Link
                    href={`/problemas/${icp.slug}`}
                    className="flex items-center justify-between group hover:text-brand transition-colors"
                  >
                    <span className="text-sm font-medium text-ink group-hover:text-brand">{icp.headline}</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              )}
              {industry && (
                <div className="pt-5 border-t border-border-subtle">
                  <p className="text-xs font-medium text-ink-300 uppercase tracking-wider mb-2">Industria</p>
                  <Link
                    href={`/industrias/${industry.slug}`}
                    className="flex items-center justify-between group hover:text-brand transition-colors"
                  >
                    <span className="text-sm font-medium text-ink group-hover:text-brand">{industry.title}</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              )}
              <div className="pt-5 border-t border-border-subtle">
                <p className="text-xs font-medium text-ink-300 uppercase tracking-wider mb-2">Tecnología</p>
                <div className="flex flex-wrap gap-1.5">
                  {['RFID', 'Tagventory', 'API Integration'].map((t) => (
                    <span key={t} className="text-xs px-2 py-1 bg-surface-alt border border-border-subtle rounded-full text-ink-500">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scenario */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">El escenario</p>
          <h2 className="mb-4">Antes vs. después</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-7 bg-surface-raised border border-red-100 rounded-card">
              <p className="text-xs font-medium text-red-400 uppercase tracking-wider mb-4">Sin HTK</p>
              <ul className="flex flex-col gap-3">
                {[
                  'Registros desactualizados o inexactos',
                  'Tiempo excesivo en conciliación manual',
                  'Riesgo en auditorías y revisiones',
                  'Decisiones basadas en datos incorrectos',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-500">
                    <svg className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 5l6 6M11 5l-6 6" strokeLinecap="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-7 bg-surface-raised border border-green-100 rounded-card">
              <p className="text-xs font-medium text-green-500 uppercase tracking-wider mb-4">Con HTK</p>
              <ul className="flex flex-col gap-3">
                {[
                  'Activos identificados y trazados con precisión',
                  'Conciliación automática en tiempo real',
                  'Documentación lista para cualquier auditoría',
                  'Decisiones con datos confiables y actualizados',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-500">
                    <svg className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 8l4 4 6-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Capacidades aplicadas</p>
          <h2 className="mb-10">Soluciones HTK en este caso</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {relatedSolutions.map((s) => (
              <Link
                key={s.slug}
                href={`/soluciones/${s.slug}`}
                className="group p-6 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
              >
                <h3 className="text-base font-medium text-ink mb-2">{s.title}</h3>
                <p className="text-sm font-medium text-brand mb-3">{s.tagline}</p>
                <p className="text-sm text-ink-500 leading-relaxed mb-4">{s.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-3 transition-all">
                  Ver solución <ArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Success reference */}
      {relatedSuccess && (
        <section className="bg-surface-alt py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Evidencia</p>
            <h2 className="mb-10">Caso de éxito relacionado</h2>
            <Link
              href={`/casos-exito/${relatedSuccess.slug}`}
              className="group inline-flex items-start gap-6 p-7 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all max-w-2xl"
            >
              <div>
                <div className="text-3xl font-medium text-brand mb-1">{relatedSuccess.metric}</div>
                <div className="text-xs font-medium text-ink-300 mb-3">{relatedSuccess.metricLabel}</div>
                <p className="text-base font-medium text-ink mb-2">{relatedSuccess.client}</p>
                <p className="text-sm text-ink-500 mb-4">{relatedSuccess.result}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-3 transition-all">
                  Ver caso de éxito <ArrowRight />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Other cases */}
      {otherCases.length > 0 && (
        <section className="bg-surface-base py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Más casos</p>
            <h2 className="mb-10">Casos relacionados</h2>
            <div className="grid md:grid-cols-2 gap-5 max-w-3xl">
              {otherCases.map((c) => (
                <Link
                  key={c.slug}
                  href={`/casos-aplicacion/${c.slug}`}
                  className="group p-6 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
                >
                  <h3 className="text-base font-medium text-ink mb-2">{c.title}</h3>
                  <p className="text-sm text-ink-500 leading-relaxed mb-4 line-clamp-2">{c.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-3 transition-all">
                    Ver caso <ArrowRight />
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
          <h2 className="text-white mb-4">¿Tienes un escenario similar?</h2>
          <p className="text-[17px] text-white/60 max-w-xl mx-auto mb-8">
            Un diagnóstico nos permite confirmar si este caso aplica a tu operación y qué tan compleja sería la implementación.
          </p>
          <Link
            href="/diagnostico"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
          >
            Solicitar diagnóstico <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
