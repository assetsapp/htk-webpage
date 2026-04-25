'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import IcosahedronSVG from '@/components/IcosahedronSVG';
import { icps, industries, solutions, caseApplications, caseSuccesses, clients } from '@/data/content';

// ── Icon helpers ──────────────────────────────────────────────────────────────

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function icpIcon(icon: string) {
  const props = { width: 22, height: 22, viewBox: '0 0 22 22', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const icons: Record<string, React.JSX.Element> = {
    scale: <svg {...props}><path d="M12 2L2 6l10 4 10-4-10-4zM2 16l10 4 10-4M2 11l10 4 10-4" /></svg>,
    shield: <svg {...props}><path d="M11 2L3 6v6c0 4.4 3.6 7 8 8 4.4-1 8-3.6 8-8V6L11 2z" /></svg>,
    'map-pin': <svg {...props}><path d="M11 2C8.2 2 6 4.2 6 7c0 4.5 5 11 5 11s5-6.5 5-11c0-2.8-2.2-5-5-5z" /><circle cx="11" cy="7" r="2" /></svg>,
    clock: <svg {...props}><circle cx="11" cy="11" r="9" /><path d="M11 6v5l3 3" /></svg>,
    cpu: <svg {...props}><rect x="5" y="5" width="12" height="12" rx="2" /><path d="M9 5V3M13 5V3M9 19v-2M13 19v-2M5 9H3M5 13H3M19 9h-2M19 13h-2" /><path d="M9 9h4v4H9z" /></svg>,
  };
  return icons[icon] || icons.cpu;
}

// ── Section wrapper ────────────────────────────────────────────────────────────

function Section({ children, className = '', alt = false }: { children: React.ReactNode; className?: string; alt?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`py-24 md:py-20 ${alt ? 'bg-surface-alt' : 'bg-surface-base'} ${className}`}
    >
      <div
        className={`max-w-8xl mx-auto px-6 md:px-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        {children}
      </div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-bold tracking-widest uppercase text-brand mb-4">{children}</p>;
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative bg-surface-base overflow-hidden pt-28 pb-24 md:pt-32 md:pb-28">
      <div
        className="absolute top-0 right-0 w-[600px] h-[500px] rounded-full opacity-40 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 70% 30%, #FFF4E8 0%, transparent 70%)' }}
      />

      <div className="max-w-8xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-6">
            Identificación Inteligente de Activos
          </p>

          <h1 className="mb-6">
            Cuando tus activos no coinciden con tus registros, tu operación y tus resultados están en riesgo.
          </h1>

          <p className="text-[17px] leading-relaxed text-ink-500 mb-10 max-w-xl">
            Ayudamos a empresas a conciliar, controlar y automatizar sus activos para eliminar pérdidas, riesgos y errores en la operación.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/diagnostico"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-surface-dark text-sm font-medium rounded-btn transition-all duration-200 hover:bg-brand-hover"
            >
              Solicitar diagnóstico
              <ArrowRight />
            </Link>
          </div>

        </div>

        <div className="hidden lg:flex justify-center items-center relative">
          <div className="animate-float">
            <IcosahedronSVG size={420} />
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Logo Carousel ─────────────────────────────────────────────────────────────

function LogoCarousel() {
  const repeated = [...clients, ...clients];

  return (
    <div className="bg-surface-raised border-y border-border-subtle py-8">
      <div className="max-w-8xl mx-auto px-6 md:px-10 mb-5">
        <p className="text-xs font-medium tracking-widest uppercase text-brand text-center mb-0">
          Más de 15 años trabajando con empresas como:
        </p>
      </div>
      <div className="overflow-hidden">
        <div className="flex gap-0 pause-on-hover animate-scroll-logos" style={{ width: 'max-content' }}>
          {repeated.map((name, i) => (
            <div
              key={i}
              className="flex items-center justify-center px-10 min-w-[160px] h-12"
            >
              <span className="text-sm font-medium text-ink-300 whitespace-nowrap tracking-wide">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Problems / ICPs ───────────────────────────────────────────────────────────

function Problems() {
  return (
    <Section>
      <div className="text-center mb-12">
        <Eyebrow>Problemas que resolvemos</Eyebrow>
        <h2 className="mb-4">¿Dónde está el problema en tu operación?</h2>
        <p className="text-[17px] text-ink-500 max-w-2xl mx-auto">
          Estos son los escenarios donde las empresas pierden control, visibilidad o confianza sobre sus activos.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {icps.map((icp) => (
          <Link
            key={icp.slug}
            href={`/problemas/${icp.slug}`}
            className="group flex flex-col p-6 bg-surface-raised border border-border-subtle rounded-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-sm"
          >
            <div className="w-10 h-10 rounded-lg bg-brand-tint50 flex items-center justify-center text-brand mb-4">
              {icpIcon(icp.icon)}
            </div>
            <span className="text-base font-bold tracking-wider uppercase text-brand mb-2">{icp.title}</span>
            <h3 className="text-base font-medium text-ink-700 leading-snug mb-3 flex-1">{icp.headline}</h3>
            <p className="text-sm text-ink-300 leading-relaxed mb-4">{icp.description}</p>
            <span className="text-sm font-medium text-brand flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
              Ver problema <ArrowRight />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

// ── Capabilities ──────────────────────────────────────────────────────────────

function Capabilities() {
  const [active, setActive] = useState(0);

  return (
    <Section alt>
      <div className="text-center mb-12">
        <Eyebrow>Nuestras capacidades</Eyebrow>
        <h2 className="mb-4">Cómo recuperas el control de tus activos.</h2>
        <p className="text-[17px] text-ink-500 max-w-2xl mx-auto">
          Estas son las capacidades con las que HTK conecta información, da trazabilidad y convierte procesos manuales en operación controlada.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="flex flex-col">
          {solutions.map((s, idx) => (
            <button
              key={s.slug}
              onClick={() => setActive(idx)}
              className={`group text-left flex gap-5 px-6 py-5 rounded-card transition-all duration-200 ${
                active === idx
                  ? 'bg-surface-raised border border-brand/20 shadow-sm'
                  : 'border border-transparent hover:bg-surface-raised/60'
              }`}
            >
              {/* Número indicador */}
              <span className={`text-xs font-medium mt-0.5 w-6 flex-shrink-0 transition-colors ${
                active === idx ? 'text-brand' : 'text-ink-300'
              }`}>
                0{idx + 1}
              </span>

              <div className="flex-1 min-w-0">
                <p className={`text-base font-semibold mb-1 transition-colors ${
                  active === idx ? 'text-ink' : 'text-ink-700'
                }`}>
                  {s.title}
                </p>
                <p className={`text-sm leading-relaxed transition-colors ${
                  active === idx ? 'text-ink-500' : 'text-ink-300'
                }`}>
                  {s.tagline}
                </p>

                {active === idx && (
                  <Link
                    href={`/soluciones/${s.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:gap-3 transition-all mt-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Ver solución <ArrowRight />
                  </Link>
                )}
              </div>

              {/* Línea activa */}
              <div className={`w-0.5 rounded-full flex-shrink-0 self-stretch transition-all duration-300 ${
                active === idx ? 'bg-brand' : 'bg-transparent'
              }`} />
            </button>
          ))}

        </div>

        <div className="sticky top-24">
          <div className="bg-surface-raised border border-border-subtle rounded-block p-6">
            <p className="text-xs font-medium tracking-widest uppercase text-ink-300 mb-4">Flujo de control HTK</p>

            <div className="flex flex-col gap-0">
              {[
                { step: '01', label: 'Activo Físico', sub: 'Cualquier equipo, herramienta o bien', color: 'bg-ink/10' },
                { step: '02', label: 'Identificación', sub: 'RFID, OCR, código de barras, QR', color: 'bg-brand-tint100' },
                { step: '03', label: 'Trazabilidad', sub: 'Ubicación, asignación, movimientos', color: 'bg-brand-tint100' },
                { step: '04', label: 'Integración', sub: 'ERP, SAP, sistemas contables', color: 'bg-brand-tint100' },
                { step: '05', label: 'Dashboard', sub: 'Tagventory — visibilidad en tiempo real', color: 'bg-brand/10' },
              ].map((item, i, arr) => (
                <div key={i} className="relative">
                  <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${item.color}`}>
                    <span className="text-xs font-medium text-ink-300 w-6 flex-shrink-0">{item.step}</span>
                    <div>
                      <p className="text-sm font-medium text-ink leading-tight">{item.label}</p>
                      <p className="text-xs text-ink-300">{item.sub}</p>
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="flex justify-center py-0.5">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#9A9CA2" strokeWidth="1.5">
                        <path d="M8 3v10M4 9l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border-subtle text-center">
              <Link
                href="/demo-tagventory"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
              >
                Realizar autodiagnóstico <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── Platform Micro Block ──────────────────────────────────────────────────────

function PlatformMicro() {
  const steps = [
    { id: '01', label: 'Identificas', desc: 'Cada activo reconocido de forma inequívoca' },
    { id: '02', label: 'Controlas', desc: 'Asignación, movimientos y responsables' },
    { id: '03', label: 'Visualizas', desc: 'Dashboard en tiempo real' },
    { id: '04', label: 'Integras', desc: 'ERP, SAP y sistemas contables' },
    { id: '05', label: 'Automatizas', desc: 'Flujos sin intervención manual' },
  ];

  return (
    <section id="plataforma" className="bg-surface-dark py-20">
      <div className="max-w-8xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Cómo funciona como sistema</p>
          <h2 className="text-white max-w-2xl mx-auto">
            Un sistema que conecta todo el ciclo de tus activos.
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-0 mb-12">
          {steps.map((step, i) => (
            <div key={step.id} className="flex flex-col md:flex-row items-center">
              <div className="flex flex-col items-center text-center px-6 py-4 min-w-[160px]">
                <span className="text-xs font-medium text-brand mb-2">{step.id}</span>
                <span className="text-lg font-semibold text-white mb-1">{step.label}</span>
                <span className="text-sm text-white/80 max-w-[120px] leading-relaxed">{step.desc}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="text-brand/40 mx-1 hidden md:block">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 10h10M11 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
              {i < steps.length - 1 && (
                <div className="text-brand/40 my-1 md:hidden">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M10 5v10M6 11l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/demo-tagventory"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
          >
            Ver cómo funciona la plataforma <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Industries ────────────────────────────────────────────────────────────────

function Industries() {
  return (
    <Section>
      <div className="text-center mb-12">
        <Eyebrow>Donde lo aplicamos</Eyebrow>
        <h2 className="mb-4">Aplicado a la realidad de tu industria.</h2>
        <p className="text-[17px] text-ink-500 max-w-2xl mx-auto">
          Cada sector vive estos problemas de forma distinta. Explora cómo se manifiestan en tu contexto operativo.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {industries.map((ind) => (
          <Link
            key={ind.slug}
            href={`/industrias/${ind.slug}`}
            className="group relative overflow-hidden rounded-card border border-border-subtle bg-surface-raised h-52 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm hover:border-brand/30"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ind.image}
              alt={ind.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/10" />
            <div className="absolute inset-0 bg-brand/5 mix-blend-multiply" />

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-base font-medium text-white mb-1">{ind.title}</h3>
              <p className="text-sm text-white/70 leading-snug line-clamp-2">{ind.description}</p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-brand mt-2.5">
                Ver industria <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        ))}

      </div>

      <div className="text-center mt-8">
        <Link
          href="/industrias/salud"
          className="inline-flex items-center gap-2 px-6 py-3 border border-ink-700 text-ink-700 text-sm font-medium rounded-btn hover:bg-surface-alt transition-colors"
        >
          Ver todas las industrias <ArrowRight />
        </Link>
      </div>
    </Section>
  );
}

// ── Case Applications (Tabs) ──────────────────────────────────────────────────

function CaseApplications() {
  const featured = icps.map((icp) => ({
    icp,
    case: caseApplications.find((c) => c.icpSlug === icp.slug),
  }));

  return (
    <Section alt>
      <div className="text-center mb-12">
        <Eyebrow>En la operación real</Eyebrow>
        <h2 className="mb-4">Cómo se ve esto en la operación real.</h2>
        <p className="text-[17px] text-ink-500 max-w-2xl mx-auto">
          Ejemplos concretos de cómo los problemas de activos, trazabilidad y control aparecen en el día a día de distintas operaciones.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {featured.map(({ icp, case: c }) => (
          <Link
            key={icp.slug}
            href={c ? `/casos-aplicacion/${c.slug}` : '#'}
            className="group flex flex-col p-6 bg-surface-raised border border-border-subtle rounded-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-sm"
          >
            <span className="text-base font-bold tracking-wider uppercase text-brand mb-2">{icp.title}</span>
            <h3 className="text-base font-medium text-ink-700 leading-snug mb-3">{c?.title}</h3>
            <p className="text-sm text-ink-300 leading-relaxed flex-1">{icp.scenarioDescription}</p>
            <span className="text-sm font-medium text-brand flex items-center gap-1.5 group-hover:gap-2.5 transition-all mt-4">
              Ver caso <ArrowRight />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

// ── Success Stats ─────────────────────────────────────────────────────────────

function SuccessStats() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? caseSuccesses : caseSuccesses.slice(0, 6);

  return (
    <Section>
      <div className="text-center mb-12">
        <Eyebrow>Casos de éxito</Eyebrow>
        <h2 className="mb-4">Resultados reales en operación.</h2>
        <p className="text-[17px] text-ink-500 max-w-2xl mx-auto">
          Casos reales donde empresas resolvieron problemas críticos de control, disponibilidad, trazabilidad y automatización.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {visible.map((cs) => (
          <Link
            key={cs.slug}
            href={`/casos-exito/${cs.slug}`}
            className="group flex flex-col p-6 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all duration-200"
          >
            {/* Logo + nombre */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: cs.color + '18' }}
              >
                <span
                  className="text-xs font-bold tracking-wide"
                  style={{ color: cs.color }}
                >
                  {cs.initials}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-ink leading-tight">{cs.client}</p>
                <p className="text-xs text-ink-300 mt-0.5">{cs.sector}</p>
              </div>
            </div>

            {/* Resultado */}
            <p className="text-sm text-ink-500 leading-relaxed flex-1">{cs.result}</p>

            {/* Métrica */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-border-subtle">
              <div>
                <span className="text-xl font-semibold text-brand">{cs.metric}</span>
                <span className="text-xs text-ink-300 ml-2">{cs.metricLabel}</span>
              </div>
              <span className="text-xs text-brand opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                Ver caso <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center">
        {!showAll ? (
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 px-6 py-3 border border-ink-700 text-ink-700 text-sm font-medium rounded-btn hover:bg-surface-alt transition-colors"
          >
            Ver todos los casos de éxito <ArrowRight />
          </button>
        ) : (
          <button
            onClick={() => setShowAll(false)}
            className="inline-flex items-center gap-2 px-6 py-3 border border-ink-700 text-ink-700 text-sm font-medium rounded-btn hover:bg-surface-alt transition-colors"
          >
            Ver menos
          </button>
        )}
      </div>
    </Section>
  );
}

// ── Resources ─────────────────────────────────────────────────────────────────

function Resources() {
  return (
    <Section alt>
      <div className="text-center mb-12">
        <Eyebrow>Herramientas gratuitas</Eyebrow>
        <h2 className="mb-4">Evalúa el nivel de control de tus activos.</h2>
        <p className="text-[17px] text-ink-500 max-w-2xl mx-auto">
          Herramientas y contenidos para identificar riesgos, pérdidas y oportunidades antes de tomar decisiones.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[
          {
            href: '/recursos/calculadora-perdidas-activos',
            label: 'Calculadora',
            title: 'Calculadora de pérdidas por activos',
            description: 'Estima cuánto dinero pierde tu empresa por activos no controlados, duplicados o sin trazabilidad.',
            cta: 'Calcular mis pérdidas',
            icon: (
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#F79A3F" strokeWidth="1.5" strokeLinecap="round">
                <rect x="5" y="3" width="18" height="22" rx="2" />
                <path d="M9 9h10M9 13h6M9 17h10M9 21h6" />
              </svg>
            ),
          },
          {
            href: '/diagnostico',
            label: 'Autodiagnóstico',
            title: '¿Tienes control real de tus activos?',
            description: 'Responde unas preguntas rápidas y descubre qué tan expuesta está tu operación a pérdidas, errores y falta de control.',
            cta: 'Realizar autodiagnóstico',
            icon: (
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#F79A3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="14" cy="14" r="10" />
                <path d="M14 10v4l3 3" />
                <path d="M10 6.5l1.5 1.5M18 6.5l-1.5 1.5" />
              </svg>
            ),
          },
          {
            href: '/recursos/checklist-cumplimiento-activos',
            label: 'Checklist',
            title: 'Checklist de cumplimiento de activos',
            description: 'Verifica si tu empresa cumple con los requisitos mínimos de control, registro y trazabilidad de activos fijos.',
            cta: 'Descargar checklist',
            icon: (
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#F79A3F" strokeWidth="1.5" strokeLinecap="round">
                <rect x="5" y="3" width="18" height="22" rx="2" />
                <path d="M9 10l2.5 2.5L17 8M9 15l2.5 2.5L17 13M9 20h6" />
              </svg>
            ),
          },
        ].map((res) => (
          <Link
            key={res.href}
            href={res.href}
            className="group flex gap-5 p-7 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all duration-200"
          >
            <div className="w-14 h-14 bg-brand-tint50 rounded-xl flex items-center justify-center flex-shrink-0">
              {res.icon}
            </div>
            <div className="flex-1">
              <span className="text-xs font-medium tracking-widest uppercase text-brand">{res.label}</span>
              <h3 className="text-base font-medium text-ink mt-1.5 mb-2">{res.title}</h3>
              <p className="text-sm text-ink-500 leading-relaxed mb-4">{res.description}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-3 transition-all">
                {res.cta} <ArrowRight />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

// ── Dark CTA ──────────────────────────────────────────────────────────────────

function DarkCTA() {
  return (
    <section className="relative bg-surface-dark overflow-hidden py-28">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none">
        <IcosahedronSVG size={800} />
      </div>

      <div className="relative max-w-8xl mx-auto px-6 md:px-10 text-center">
        <p className="text-sm font-bold tracking-widest uppercase text-brand mb-6">Control total</p>
        <h2 className="text-white mb-5 max-w-2xl mx-auto">
          Si no puedes confiar en tus datos, no puedes confiar en tu operación.
        </h2>
        <p className="text-[17px] text-white/60 max-w-xl mx-auto mb-10">
          Identifica dónde está el problema y cómo resolverlo.
        </p>

        <div className="flex justify-center">
          <Link
            href="/diagnostico"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
          >
            Solicitar diagnóstico <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Hero />
      <LogoCarousel />
      <Problems />
      <Capabilities />
      <PlatformMicro />
      <Industries />
      <CaseApplications />
      <SuccessStats />
      <Resources />
      <DarkCTA />
    </>
  );
}
