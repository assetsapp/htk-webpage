import { notFound } from 'next/navigation';
import Link from 'next/link';
import { industries, icps, solutions, caseApplications, caseSuccesses } from '@/data/content';

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function generateStaticParams() {
  return industries.map((ind) => ({ slug: ind.slug }));
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) notFound();

  const relatedCases = caseApplications.filter((c) => c.industrySlug === industry.slug);
  const relatedSuccess = caseSuccesses.filter((c) => c.industrySlug === industry.slug);
  const relatedICPs = icps.slice(0, 3);
  const relatedSolutions = solutions.slice(0, 3);

  return (
    <>
      {/* Hero with industry image */}
      <section className="relative bg-surface-dark pt-28 pb-24 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={industry.image}
          alt={industry.title}
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-dark/95 via-surface-dark/80 to-transparent" />

        <div className="relative max-w-8xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-2 mb-5">
            <Link href="/" className="text-xs text-white/40 hover:text-white/70 transition-colors">Inicio</Link>
            <span className="text-white/30 text-xs">/</span>
            <span className="text-xs text-white/40">Industrias</span>
            <span className="text-white/30 text-xs">/</span>
            <span className="text-xs text-brand">{industry.title}</span>
          </div>

          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Industria</p>
          <h1 className="text-white max-w-2xl mb-5">{industry.title}</h1>
          <p className="text-[17px] text-white/70 leading-relaxed mb-8 max-w-xl">
            {industry.description} Cada sector tiene sus propios desafíos de control, cumplimiento y trazabilidad de activos.
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
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white text-sm font-medium rounded-btn hover:bg-white/10 transition-colors"
            >
              Ver demo Tagventory
            </Link>
          </div>
        </div>
      </section>

      {/* Problems in this industry */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Problemática del sector</p>
          <h2 className="mb-4">Problemas comunes en {industry.title}</h2>
          <p className="text-[17px] text-ink-500 mb-10 max-w-2xl">
            El control de activos en este sector enfrenta retos únicos. Estos son los más frecuentes.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedICPs.map((icp) => (
              <Link
                key={icp.slug}
                href={`/problemas/${icp.slug}`}
                className="group p-6 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
              >
                <span className="text-xs font-medium tracking-wider uppercase text-brand block mb-3">{icp.title}</span>
                <h3 className="text-base font-medium text-ink mb-3 leading-snug">{icp.headline}</h3>
                <p className="text-sm text-ink-300 leading-relaxed mb-4 line-clamp-2">{icp.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-3 transition-all">
                  Ver problema <ArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Nuestras capacidades</p>
          <h2 className="mb-10">Soluciones para {industry.title}</h2>
          <div className="grid md:grid-cols-3 gap-5">
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

      {/* Application cases */}
      {relatedCases.length > 0 && (
        <section className="bg-surface-base py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Casos de aplicación</p>
            <h2 className="mb-10">Implementaciones en {industry.title}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {relatedCases.map((c) => (
                <Link
                  key={c.slug}
                  href={`/casos-aplicacion/${c.slug}`}
                  className="group p-7 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
                >
                  <h3 className="text-lg font-medium text-ink mb-3">{c.title}</h3>
                  <p className="text-sm text-ink-500 leading-relaxed mb-5">{c.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-3 transition-all">
                    Ver caso de aplicación <ArrowRight />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Success */}
      {relatedSuccess.length > 0 && (
        <section className="bg-surface-alt py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Evidencia</p>
            <h2 className="mb-10">Clientes en {industry.title}</h2>
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
          </div>
        </section>
      )}

      {/* Other industries */}
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
          <h2 className="text-white mb-4">¿Tu empresa está en {industry.title}?</h2>
          <p className="text-[17px] text-white/60 max-w-xl mx-auto mb-8">
            Agenda un diagnóstico sin costo para entender cuál es tu nivel de control actual y qué puedes mejorar.
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
