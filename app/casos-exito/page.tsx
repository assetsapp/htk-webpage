'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { caseSuccesses, clients } from '@/data/content';

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const industryLabels: Record<string, string> = {
  salud: 'Salud',
  'manufactura-immex': 'Manufactura',
  'logistica-transporte': 'Logística',
  'retail-corporativos': 'Retail / Corporativo',
  gobierno: 'Gobierno',
  'servicios-eventos': 'Servicios',
};

const problemLabels: Record<string, string> = {
  'conciliacion-activos': 'Conciliación',
  'disponibilidad-activos': 'Disponibilidad',
  'control-visibilidad-activos': 'Control y visibilidad',
  'automatizacion-operativa': 'Automatización',
};

const closingMetrics = [
  { label: 'Mayor control', icon: '◈' },
  { label: 'Mejor visibilidad', icon: '◉' },
  { label: 'Menos errores', icon: '◎' },
  { label: 'Decisiones más rápidas', icon: '◈' },
  { label: 'Operación más eficiente', icon: '◉' },
];

export default function CasosExitoPage() {
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);
  const [activeProblema, setActiveProblema] = useState<string | null>(null);

  const filtered = caseSuccesses.filter((c) => {
    if (activeIndustry && c.industrySlug !== activeIndustry) return false;
    if (activeProblema && c.icpSlug !== activeProblema) return false;
    return true;
  });

  const industries = [...new Set(caseSuccesses.map((c) => c.industrySlug))];
  const problemas = [...new Set(caseSuccesses.map((c) => c.icpSlug))];

  return (
    <>
      {/* Hero */}
      <section className="bg-surface-base pt-28 pb-20 border-b border-border-subtle">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-2 mb-5">
            <Link href="/" className="text-xs text-ink-300 hover:text-brand transition-colors">Inicio</Link>
            <span className="text-ink-300 text-xs">/</span>
            <span className="text-xs text-brand">Casos de éxito</span>
          </div>
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-5">Casos de éxito</p>
            <h1 className="mb-5">Cuando el control se vuelve real, los resultados también.</h1>
            <p className="text-[17px] text-ink-500 leading-relaxed mb-8 max-w-2xl">
              Empresas en distintas industrias han transformado su operación con HTK: conciliación, disponibilidad, automatización, trazabilidad y seguridad en entornos críticos.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/sesion"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
              >
                Solicitar diagnóstico <ArrowRight />
              </Link>
              <Link
                href="/soluciones/plataforma"
                className="inline-flex items-center gap-2 px-6 py-3 border border-ink-700 text-ink-700 text-sm font-medium rounded-btn hover:bg-surface-alt transition-colors"
              >
                Ver soluciones
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Carrusel de logos */}
      <section className="bg-surface-alt py-14 border-b border-border-subtle overflow-hidden">
        <div className="max-w-8xl mx-auto px-6 md:px-10 mb-8">
          <p className="text-xs font-medium tracking-widest uppercase text-ink-300 text-center">
            Empresas que ya operan con HTK
          </p>
        </div>
        <div className="relative flex overflow-hidden">
          <div className="flex items-center gap-12 animate-scroll-logos whitespace-nowrap">
            {[...clients, ...clients].map((c, i) => (
              <div key={i} className="flex-shrink-0 flex items-center justify-center w-32 h-14 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
                {c.logo ? (
                  <Image
                    src={c.logo}
                    alt={c.name}
                    width={120}
                    height={48}
                    className={`object-contain ${(c as { size?: string }).size ?? 'h-10'} w-auto max-w-[100px]`}
                  />
                ) : (
                  <span className="text-sm font-semibold text-ink-300">{c.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro + filtros */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="mb-10">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Los casos</p>
            <h2 className="mb-3">Un mismo sistema. Distintos retos.</h2>
            <p className="text-[17px] text-ink-500 leading-relaxed max-w-2xl">
              Cada caso refleja un problema distinto dentro de la operación: conciliación, disponibilidad, automatización, trazabilidad, control en campo o seguridad crítica.
            </p>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-3 mb-10">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveIndustry(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  activeIndustry === null
                    ? 'bg-brand text-surface-dark border-brand'
                    : 'bg-surface-raised border-border-subtle text-ink-500 hover:border-brand/40'
                }`}
              >
                Todas las industrias
              </button>
              {industries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setActiveIndustry(activeIndustry === ind ? null : ind)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    activeIndustry === ind
                      ? 'bg-brand text-surface-dark border-brand'
                      : 'bg-surface-raised border-border-subtle text-ink-500 hover:border-brand/40'
                  }`}
                >
                  {industryLabels[ind] ?? ind}
                </button>
              ))}
            </div>
            <div className="w-px bg-border-subtle mx-1" />
            <div className="flex flex-wrap gap-2">
              {problemas.map((p) => (
                <button
                  key={p}
                  onClick={() => setActiveProblema(activeProblema === p ? null : p)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    activeProblema === p
                      ? 'bg-ink-700 text-white border-ink-700'
                      : 'bg-surface-raised border-border-subtle text-ink-500 hover:border-ink-700/40'
                  }`}
                >
                  {problemLabels[p] ?? p}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de casos */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((c) => (
              <Link
                key={c.slug}
                href={`/casos-exito/${c.slug}`}
                className="group flex flex-col p-5 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  {c.logo ? (
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-surface-alt border border-border-subtle flex-shrink-0">
                      <Image src={c.logo} alt={c.client} width={32} height={32} className="object-contain w-8 h-8" />
                    </div>
                  ) : (
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                      style={{ backgroundColor: c.color }}
                    >
                      {c.initials}
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-medium text-ink">{c.client}</p>
                    <p className="text-xs text-ink-300">{c.sector}</p>
                  </div>
                </div>

                <div className="mb-4 pb-4 border-b border-border-subtle">
                  <p className="text-2xl font-semibold text-brand">{c.metric}</p>
                  <p className="text-xs text-ink-500">{c.metricLabel}</p>
                </div>

                <p className="text-sm text-ink-500 leading-snug mb-4 flex-1">{c.result}</p>

                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand group-hover:gap-3 transition-all mt-auto">
                  Ver caso <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-ink-300 text-sm">
              No hay casos con esos filtros. <button onClick={() => { setActiveIndustry(null); setActiveProblema(null); }} className="text-brand underline">Limpiar filtros</button>
            </div>
          )}
        </div>
      </section>

      {/* Mensaje de cierre */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Consistencia</p>
              <h2 className="mb-4">Resultados consistentes en distintos contextos</h2>
              <p className="text-[17px] text-ink-500 leading-relaxed">
                Desde auditorías financieras hasta seguridad hospitalaria, los resultados se repiten en cada implementación.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {closingMetrics.map((m, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-surface-raised border border-border-subtle rounded-card">
                  <span className="text-brand text-lg flex-shrink-0">{m.icon}</span>
                  <span className="text-sm font-medium text-ink">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conexión con el resto del sitio */}
      <section className="bg-surface-base py-16">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-ink-300 mb-6">Explorar más</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Problemas que resolvemos', href: '/problemas/conciliacion-activos', desc: 'Los patrones detrás de cada caso' },
              { label: 'Soluciones HTK', href: '/soluciones/plataforma', desc: 'Las capacidades que hacen posible los resultados' },
              { label: 'Industrias', href: '/industrias/salud', desc: 'Cómo aplica en tu sector' },
              { label: 'Casos de aplicación', href: '/casos-aplicacion/conciliacion-fisico-contable', desc: 'Escenarios concretos de operación' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group p-5 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
              >
                <h3 className="text-sm font-medium text-ink mb-1 group-hover:text-brand transition-colors">{link.label}</h3>
                <p className="text-xs text-ink-300 leading-snug">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-dark py-24">
        <div className="max-w-8xl mx-auto px-6 md:px-10 text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">¿Aplica a ti?</p>
          <h2 className="text-white mb-4">Tu operación también puede estar en control.</h2>
          <p className="text-[17px] text-white/60 max-w-xl mx-auto mb-8">
            Descubre cómo aplicar estos resultados en tu organización.
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
