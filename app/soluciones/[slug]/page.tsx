import { notFound } from 'next/navigation';
import Link from 'next/link';
import { solutions, icps, industries, caseApplications } from '@/data/content';

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const techStack: Record<string, string[]> = {
  'identificacion-inteligente': ['RFID UHF / HF', 'OCR / Visión Artificial', 'Códigos de barras', 'QR & DataMatrix', 'NFC', 'Dispositivos móviles'],
  'control-trazabilidad': ['Tagventory Platform', 'Registro de eventos', 'Cadena de custodia', 'Geolocalización', 'Historial de movimientos'],
  'integracion-informacion': ['APIs REST', 'Middleware HTK', 'SAP / Oracle ERP', 'Bases de datos legacy', 'Webhooks en tiempo real'],
  'automatizacion-procesos': ['Portales automáticos RFID', 'Flujos configurables', 'Alertas y disparadores', 'Dashboards Tagventory', 'Reportes automáticos'],
  'visibilidad-operativa': ['Dashboard Tagventory', 'KPIs en tiempo real', 'Alertas configurables', 'Reportes exportables', 'Acceso multi-usuario'],
};

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = solutions.find((s) => s.slug === slug);

  if (!solution) notFound();

  const tech = techStack[solution.slug] || [];
  const relatedCases = caseApplications.slice(0, 3);
  const otherSolutions = solutions.filter((s) => s.slug !== solution.slug);

  return (
    <>
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

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-5">Capacidad</p>
              <h1 className="mb-4">{solution.title}</h1>
              <p className="text-xl font-medium text-brand mb-5">{solution.tagline}</p>
              <p className="text-[17px] text-ink-500 leading-relaxed mb-8">{solution.description}</p>
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

            <div className="bg-surface-raised border border-border-subtle rounded-block p-8">
              <p className="text-xs font-medium tracking-widest uppercase text-ink-300 mb-6">Tecnologías y componentes</p>
              <div className="flex flex-wrap gap-2">
                {tech.map((t) => (
                  <span key={t} className="px-3 py-1.5 bg-surface-alt border border-border-subtle rounded-full text-xs font-medium text-ink-700">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border-subtle">
                <p className="text-xs font-medium text-ink-300 mb-3">Plataforma central</p>
                <div className="flex items-center gap-3 p-4 bg-brand-tint50 border border-brand-tint100 rounded-card">
                  <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="1.5">
                      <rect x="3" y="3" width="14" height="14" rx="2" />
                      <path d="M7 7h6M7 10h4M7 13h6" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink">Tagventory</p>
                    <p className="text-xs text-ink-500">Plataforma propia HTK</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">El proceso</p>
          <h2 className="mb-10">Cómo implementamos esta capacidad</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {['Diagnóstico', 'Diseño de solución', 'Implementación', 'Operación continua'].map((step, i) => (
              <div key={step} className="relative">
                <div className="p-6 bg-surface-raised border border-border-subtle rounded-card h-full">
                  <span className="text-3xl font-medium text-brand/20 block mb-3">0{i + 1}</span>
                  <h3 className="text-base font-medium text-ink mb-2">{step}</h3>
                  <p className="text-sm text-ink-300 leading-relaxed">
                    {[
                      'Analizamos tu operación actual y definimos el alcance del proyecto.',
                      'Diseñamos la arquitectura técnica y el flujo de trabajo adaptado.',
                      'Instalación, configuración e integración con tus sistemas.',
                      'Soporte, actualización y mejora continua de la solución.',
                    ][i]}
                  </p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 z-10 -translate-y-1/2">
                    <ArrowRight size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related problems */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Problemas que resuelve</p>
          <h2 className="mb-10">¿Cuándo necesitas esta capacidad?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {icps.slice(0, 3).map((icp) => (
              <Link
                key={icp.slug}
                href={`/problemas/${icp.slug}`}
                className="group p-6 border border-border-subtle bg-surface-raised rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
              >
                <span className="text-xs font-medium tracking-wider uppercase text-brand block mb-3">{icp.title}</span>
                <h3 className="text-base font-medium text-ink mb-3 leading-snug">{icp.headline}</h3>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-3 transition-all">
                  Ver problema <ArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Application cases */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">En la práctica</p>
          <h2 className="mb-10">Casos de aplicación con esta capacidad</h2>
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

      {/* Industries */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Sectores</p>
          <h2 className="mb-8">Industrias donde aplicamos esta capacidad</h2>
          <div className="flex flex-wrap gap-3">
            {industries.map((ind) => (
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

      {/* Other solutions */}
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
          <h2 className="text-white mb-4">¿Necesitas {solution.title.toLowerCase()} en tu operación?</h2>
          <p className="text-[17px] text-white/60 max-w-xl mx-auto mb-8">
            Un diagnóstico nos permite entender tu situación actual y diseñar la solución correcta.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/diagnostico"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
            >
              Solicitar diagnóstico <ArrowRight />
            </Link>
            <Link
              href="/demo-tagventory"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 text-white text-sm font-medium rounded-btn hover:bg-white/10 transition-colors"
            >
              Agendar demo Tagventory
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
