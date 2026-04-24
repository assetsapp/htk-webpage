import { notFound } from 'next/navigation';
import Link from 'next/link';
import { caseSuccesses, icps, industries, solutions, caseApplications } from '@/data/content';

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const clientDetails: Record<string, { intro: string; challenge: string; approach: string }> = {
  cinepolis: {
    intro: 'Cinépolis, la cadena de cines más grande de América Latina, necesitaba conciliar más de 25,000 activos fijos distribuidos en múltiples complejos.',
    challenge: 'Con registros contables desactualizados y activos físicos sin etiquetado consistente, los ejercicios de conciliación tomaban semanas y generaban discrepancias significativas.',
    approach: 'HTK implementó un proceso de inventario masivo con RFID y OCR, conectado directamente con el ERP de Cinépolis para conciliación automática y cierre contable.',
  },
  'palacio-de-hierro': {
    intro: 'Palacio de Hierro requería trazabilidad total de sus activos fijos para cumplimiento fiscal y operativo en sus tiendas de lujo.',
    challenge: 'La dispersión de activos entre múltiples tiendas y la falta de un registro centralizado confiable representaban riesgos en auditorías y declaraciones fiscales.',
    approach: 'HTK instaló Tagventory como sistema central con identificación RFID por activo, permitiendo control en tiempo real y reportes automáticos para auditoría.',
  },
  'hospital-ixtapaluca': {
    intro: 'El Hospital Regional de Alta Especialidad de Ixtapaluca necesitaba saber en tiempo real dónde estaba cada equipo médico crítico.',
    challenge: 'Equipos de alto costo frecuentemente se perdían entre áreas, generando retrasos en procedimientos y compras innecesarias por falta de visibilidad.',
    approach: 'HTK desplegó sistema de localización RFID en tiempo real con dashboard Tagventory, permitiendo al personal encontrar cualquier equipo en segundos.',
  },
  dhl: {
    intro: 'DHL México necesitaba reducir las pérdidas de activos logísticos en sus operaciones de warehousing y distribución.',
    challenge: 'Los activos retornables — racks, contenedores y equipos de carga — representaban pérdidas constantes por falta de trazabilidad en sus movimientos.',
    approach: 'HTK implementó control de activos retornables con portales RFID automáticos y rastreo por responsable, reduciendo pérdidas en un 30%.',
  },
  metlife: {
    intro: 'MetLife México debía demostrar control riguroso de activos fijos ante auditorías internas y externas.',
    challenge: 'Los procesos manuales de inventario y la falta de documentación continua exponían a la empresa a hallazgos y observaciones en cada revisión.',
    approach: 'HTK implementó Tagventory con flujos automatizados de auditoría, generando evidencia continua y reportes listos para presentar ante auditores.',
  },
};

export function generateStaticParams() {
  return caseSuccesses.map((c) => ({ slug: c.slug }));
}

export default async function CaseSuccessPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = caseSuccesses.find((c) => c.slug === slug);

  if (!cs) notFound();

  const detail = clientDetails[cs.slug] || {
    intro: 'Un caso real de implementación HTK.',
    challenge: 'El cliente enfrentaba problemas de control y trazabilidad de activos.',
    approach: 'HTK implementó su plataforma Tagventory con identificación inteligente.',
  };

  const icp = icps.find((i) => i.slug === cs.icpSlug);
  const industry = industries.find((i) => i.slug === cs.industrySlug);
  const relatedSolutions = solutions.slice(0, 2);
  const relatedCase = caseApplications.find((c) => c.industrySlug === cs.industrySlug);

  return (
    <>
      {/* Hero */}
      <section className="bg-surface-base pt-28 pb-20 border-b border-border-subtle">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-2 mb-5">
            <Link href="/" className="text-xs text-ink-300 hover:text-brand transition-colors">Inicio</Link>
            <span className="text-ink-300 text-xs">/</span>
            <span className="text-xs text-ink-300">Casos de éxito</span>
            <span className="text-ink-300 text-xs">/</span>
            <span className="text-xs text-brand">{cs.client}</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2">
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Caso de éxito</p>
              <h1 className="mb-4">{cs.client}</h1>
              <p className="text-xl font-medium text-ink-500 mb-6">{detail.intro}</p>

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

            <div className="bg-surface-raised border border-border-subtle rounded-block p-8 text-center">
              <div className="text-5xl font-medium text-brand mb-2">{cs.metric}</div>
              <div className="text-sm font-medium text-ink-500 mb-5">{cs.metricLabel}</div>
              <p className="text-sm text-ink-300 leading-relaxed">{cs.result}</p>
              {industry && (
                <div className="mt-6 pt-4 border-t border-border-subtle">
                  <span className="text-xs font-medium text-ink-300 border border-border-subtle px-3 py-1 rounded-full">
                    {cs.sector}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-3 gap-10">
            {[
              { label: 'El desafío', content: detail.challenge },
              { label: 'El enfoque', content: detail.approach },
              { label: 'El resultado', content: cs.result + '. Operación continua sobre plataforma Tagventory con visibilidad en tiempo real.' },
            ].map((block) => (
              <div key={block.label}>
                <p className="text-xs font-medium tracking-widest uppercase text-brand mb-3">{block.label}</p>
                <p className="text-[15px] text-ink-500 leading-relaxed">{block.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-3 gap-10">
            {icp && (
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Problema abordado</p>
                <Link
                  href={`/problemas/${icp.slug}`}
                  className="group block p-5 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
                >
                  <span className="text-xs font-medium tracking-wider uppercase text-brand block mb-2">{icp.title}</span>
                  <p className="text-sm font-medium text-ink mb-3">{icp.headline}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-3 transition-all">
                    Ver problema <ArrowRight />
                  </span>
                </Link>
              </div>
            )}
            {industry && (
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Industria</p>
                <Link
                  href={`/industrias/${industry.slug}`}
                  className="group block p-5 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
                >
                  <p className="text-sm font-medium text-ink mb-2">{industry.title}</p>
                  <p className="text-xs text-ink-300 leading-snug mb-3">{industry.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-3 transition-all">
                    Ver industria <ArrowRight />
                  </span>
                </Link>
              </div>
            )}
            {relatedCase && (
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Caso de aplicación</p>
                <Link
                  href={`/casos-aplicacion/${relatedCase.slug}`}
                  className="group block p-5 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
                >
                  <p className="text-sm font-medium text-ink mb-2">{relatedCase.title}</p>
                  <p className="text-xs text-ink-300 leading-snug mb-3 line-clamp-2">{relatedCase.headline}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-3 transition-all">
                    Ver caso <ArrowRight />
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Solutions used */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Capacidades aplicadas</p>
          <h2 className="mb-10">Soluciones HTK en este proyecto</h2>
          <div className="grid md:grid-cols-2 gap-5 max-w-3xl">
            {relatedSolutions.map((s) => (
              <Link
                key={s.slug}
                href={`/soluciones/${s.slug}`}
                className="group p-6 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
              >
                <h3 className="text-base font-medium text-ink mb-2">{s.title}</h3>
                <p className="text-sm text-ink-300 mb-4">{s.tagline}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-3 transition-all">
                  Ver solución <ArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* More cases */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Más resultados</p>
          <h2 className="mb-10">Otros casos de éxito</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {caseSuccesses.filter((c) => c.slug !== cs.slug).map((other) => (
              <Link
                key={other.slug}
                href={`/casos-exito/${other.slug}`}
                className="group p-5 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
              >
                <div className="text-2xl font-medium text-brand mb-1">{other.metric}</div>
                <div className="text-xs font-medium text-ink-300 mb-2">{other.metricLabel}</div>
                <p className="text-sm font-medium text-ink mb-3">{other.client}</p>
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
          <h2 className="text-white mb-4">¿Quieres resultados similares?</h2>
          <p className="text-[17px] text-white/60 max-w-xl mx-auto mb-8">
            Empieza con un diagnóstico. Identifica el problema, dimensiona la solución y conoce el impacto esperado.
          </p>
          <Link
            href="/diagnostico"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
          >
            Solicitar diagnóstico gratuito <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
