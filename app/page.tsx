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
  return <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">{children}</p>;
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
            <Link
              href="/soluciones/identificacion-inteligente"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-ink-700 text-ink-700 text-sm font-medium rounded-btn transition-all duration-200 hover:bg-surface-alt"
            >
              Ver cómo funciona
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 mt-8">
            {['Cinépolis', 'DHL', 'Palacio de Hierro', 'ZEISS', 'MetLife'].map((c) => (
              <span key={c} className="text-xs font-medium text-ink-300 border border-border-subtle px-3 py-1 rounded-full bg-surface-raised">
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex justify-center items-center relative">
          <div className="animate-float">
            <IcosahedronSVG size={420} />
          </div>
          <div className="absolute bottom-8 left-8 bg-surface-raised border border-border-subtle rounded-card px-5 py-4 shadow-sm">
            <p className="text-xs font-medium text-ink-300 uppercase tracking-wider mb-1">Plataforma</p>
            <p className="text-sm font-medium text-ink">Tagventory by HTK</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs text-ink-300">Activo en tiempo real</span>
            </div>
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
        <p className="text-xs font-medium text-ink-300 text-center tracking-wider">
          Empresas que ya controlan sus activos con HTK
        </p>
      </div>
      <div className="overflow-hidden">
        <div className="flex gap-0 pause-on-hover" style={{ width: 'max-content', animation: 'scrollLogos 40s linear infinite' }}>
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
            <span className="text-xs font-medium tracking-wider uppercase text-brand mb-2">{icp.title}</span>
            <h3 className="text-base font-medium text-ink-700 leading-snug mb-3 flex-1">{icp.headline}</h3>
            <p className="text-sm text-ink-300 leading-relaxed mb-4 line-clamp-3">{icp.description}</p>
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
  const [open, setOpen] = useState(0);

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
        <div className="flex flex-col gap-2">
          {solutions.map((s, idx) => (
            <div
              key={s.slug}
              className={`border rounded-card overflow-hidden transition-colors duration-200 ${
                open === idx ? 'border-brand/30 bg-surface-raised' : 'border-border-subtle bg-surface-base'
              }`}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left"
                onClick={() => setOpen(open === idx ? -1 : idx)}
              >
                <span className={`text-sm font-medium transition-colors ${open === idx ? 'text-ink' : 'text-ink-700'}`}>
                  {s.title}
                </span>
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
                  className={`flex-shrink-0 transition-transform duration-200 ${open === idx ? 'rotate-180 text-brand' : 'text-ink-300'}`}
                >
                  <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {open === idx && (
                <div className="px-6 pb-5">
                  <p className="text-sm font-medium text-brand mb-2">{s.tagline}</p>
                  <p className="text-sm text-ink-500 leading-relaxed">{s.description}</p>
                  <Link
                    href={`/soluciones/${s.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-brand transition-colors mt-4"
                  >
                    Ver solución <ArrowRight />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="sticky top-24">
          <div className="bg-surface-raised border border-border-subtle rounded-block p-8">
            <p className="text-xs font-medium tracking-widest uppercase text-ink-300 mb-8">Flujo de control HTK</p>

            <div className="flex flex-col gap-0">
              {[
                { step: '01', label: 'Activo Físico', sub: 'Cualquier equipo, herramienta o bien', color: 'bg-ink/10' },
                { step: '02', label: 'Identificación', sub: 'RFID, OCR, código de barras, QR', color: 'bg-brand-tint100' },
                { step: '03', label: 'Trazabilidad', sub: 'Ubicación, asignación, movimientos', color: 'bg-brand-tint100' },
                { step: '04', label: 'Integración', sub: 'ERP, SAP, sistemas contables', color: 'bg-brand-tint100' },
                { step: '05', label: 'Dashboard', sub: 'Tagventory — visibilidad en tiempo real', color: 'bg-brand/10' },
              ].map((item, i, arr) => (
                <div key={i} className="relative">
                  <div className={`flex items-center gap-4 p-4 rounded-xl ${item.color}`}>
                    <span className="text-xs font-medium text-ink-300 w-8">{item.step}</span>
                    <div>
                      <p className="text-sm font-medium text-ink">{item.label}</p>
                      <p className="text-xs text-ink-300 mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="flex justify-center py-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#9A9CA2" strokeWidth="1.5">
                        <path d="M8 3v10M4 9l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border-subtle text-center">
              <Link
                href="/demo-tagventory"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
              >
                Ver demo Tagventory <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
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

        <Link
          href="/industrias/salud"
          className="group flex flex-col items-center justify-center rounded-card border border-dashed border-brand/40 bg-brand-tint50 h-52 transition-all duration-200 hover:bg-brand-tint100 hover:border-brand/60"
        >
          <div className="w-10 h-10 rounded-full border-2 border-brand flex items-center justify-center mb-3">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#F79A3F" strokeWidth="1.5">
              <path d="M8 3v10M3 8h10" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-sm font-medium text-brand">Ver todas las industrias</span>
        </Link>
      </div>
    </Section>
  );
}

// ── Case Applications (Tabs) ──────────────────────────────────────────────────

function CaseApplications() {
  const [activeTab, setActiveTab] = useState(0);

  const tabsData = icps.map((icp) => ({
    icp,
    cases: caseApplications.filter((c) => c.icpSlug === icp.slug),
  }));

  return (
    <Section alt>
      <div className="text-center mb-12">
        <Eyebrow>En la operación real</Eyebrow>
        <h2 className="mb-4">Cómo se ve esto en la operación real.</h2>
        <p className="text-[17px] text-ink-500 max-w-2xl mx-auto">
          Ejemplos concretos de cómo los problemas de activos, trazabilidad y control aparecen en el día a día.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {tabsData.map((t, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2 text-sm font-medium rounded-btn transition-all duration-200 ${
              activeTab === idx
                ? 'bg-brand text-surface-dark'
                : 'bg-surface-raised border border-border-subtle text-ink-500 hover:text-ink hover:border-ink-300'
            }`}
          >
            {t.icp.title}
          </button>
        ))}
      </div>

      {tabsData[activeTab] && (
        <div className="grid lg:grid-cols-3 gap-5">
          {tabsData[activeTab].cases.slice(0, 1).map((c) => (
            <Link
              key={c.slug}
              href={`/casos-aplicacion/${c.slug}`}
              className="lg:col-span-2 group p-8 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all duration-200"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-tint50 border border-brand-tint100 rounded-full text-xs font-medium text-brand mb-4">
                {tabsData[activeTab].icp.title}
              </div>
              <h3 className="text-xl font-medium text-ink mb-3">{c.title}</h3>
              <p className="text-[15px] text-ink-500 leading-relaxed mb-6">{c.description}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-3 transition-all">
                Ver caso de aplicación <ArrowRight />
              </span>
            </Link>
          ))}

          <div className="flex flex-col gap-4">
            {tabsData[activeTab].cases.slice(1, 3).map((c) => (
              <Link
                key={c.slug}
                href={`/casos-aplicacion/${c.slug}`}
                className="group p-5 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all duration-200"
              >
                <h3 className="text-sm font-medium text-ink mb-2">{c.title}</h3>
                <p className="text-xs text-ink-300 leading-relaxed mb-3 line-clamp-2">{c.description}</p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-brand">
                  Ver más <ArrowRight size={12} />
                </span>
              </Link>
            ))}

            {tabsData[activeTab].cases.length === 0 && (
              <div className="p-5 bg-surface-base border border-border-subtle rounded-card">
                <p className="text-sm text-ink-300">Casos adicionales disponibles próximamente.</p>
              </div>
            )}

            <Link
              href="/diagnostico"
              className="p-5 bg-brand-tint50 border border-brand-tint100 rounded-card hover:bg-brand-tint100 transition-colors"
            >
              <p className="text-xs font-medium text-brand uppercase tracking-wider mb-2">¿Tu caso?</p>
              <p className="text-sm font-medium text-ink mb-3">Analiza si aplica a tu operación</p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-brand">
                Solicitar diagnóstico <ArrowRight size={12} />
              </span>
            </Link>
          </div>
        </div>
      )}
    </Section>
  );
}

// ── Success Stats ─────────────────────────────────────────────────────────────

function SuccessStats() {
  const stats = caseSuccesses.slice(0, 4);

  return (
    <Section>
      <div className="text-center mb-12">
        <Eyebrow>Resultados reales</Eyebrow>
        <h2 className="mb-4">Resultados reales en operación.</h2>
        <p className="text-[17px] text-ink-500 max-w-2xl mx-auto">
          Experiencias y resultados que muestran cómo este sistema se traduce en control, cumplimiento y visibilidad real.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map((cs) => (
          <Link
            key={cs.slug}
            href={`/casos-exito/${cs.slug}`}
            className="group p-6 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all duration-200"
          >
            <div className="text-3xl font-medium text-brand mb-1">{cs.metric}</div>
            <div className="text-xs font-medium text-ink-300 uppercase tracking-wider mb-3">{cs.metricLabel}</div>
            <p className="text-sm font-medium text-ink mb-2">{cs.client}</p>
            <p className="text-xs text-ink-300 leading-snug mb-4">{cs.result}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-ink-300 border border-border-subtle px-2 py-0.5 rounded-full">{cs.sector}</span>
              <span className="text-xs text-brand opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                Ver caso <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/casos-exito/cinepolis"
          className="inline-flex items-center gap-2 px-6 py-3 border border-ink-700 text-ink-700 text-sm font-medium rounded-btn hover:bg-surface-alt transition-colors"
        >
          Ver todos los casos de éxito <ArrowRight />
        </Link>
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

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
        <p className="text-xs font-medium tracking-widest uppercase text-brand mb-6">Control total</p>
        <h2 className="text-white mb-5 max-w-2xl mx-auto">
          Si no puedes confiar en tus activos, no puedes confiar en tu operación.
        </h2>
        <p className="text-[17px] text-white/60 max-w-xl mx-auto mb-10">
          Identifica dónde está el problema y cómo resolverlo.
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

        <div className="flex flex-wrap justify-center gap-8 mt-14 pt-10 border-t border-white/10">
          {[
            { metric: '+200', label: 'Proyectos completados' },
            { metric: '12+', label: 'Clientes enterprise' },
            { metric: '10 años', label: 'Experiencia en LATAM' },
            { metric: 'Tagventory', label: 'Plataforma propia' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-2xl font-medium text-white">{item.metric}</p>
              <p className="text-xs text-white/40 mt-1 tracking-wide">{item.label}</p>
            </div>
          ))}
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
      <Industries />
      <CaseApplications />
      <SuccessStats />
      <Resources />
      <DarkCTA />
    </>
  );
}
