import type { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';

export const metadata: Metadata = buildMeta(
  'Plataforma HTK — Sistema integral de control de activos',
  'La plataforma HTK integra identificación, trazabilidad, visibilidad, integración y automatización para convertir tu operación física en un sistema controlado y confiable.',
  '/soluciones/plataforma'
);

import Link from 'next/link';
import { solutions, caseApplications } from '@/data/content';

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

const steps = [
  {
    num: '01',
    title: 'Identificación',
    text: 'Cada activo se convierte en un elemento único y reconocible.',
    slug: 'identificacion-inteligente',
  },
  {
    num: '02',
    title: 'Control y trazabilidad',
    text: 'Cada movimiento y evento se registra y se vuelve auditable.',
    slug: 'control-trazabilidad',
  },
  {
    num: '03',
    title: 'Visibilidad operativa',
    text: 'La información se consolida y se vuelve accionable en tiempo real.',
    slug: 'visibilidad-operativa',
  },
  {
    num: '04',
    title: 'Integración de información',
    text: 'Los sistemas y la operación se conectan bajo una misma lógica.',
    slug: 'integracion-informacion',
  },
  {
    num: '05',
    title: 'Automatización de procesos',
    text: 'La operación ejecuta decisiones automáticamente en función de eventos.',
    slug: 'automatizacion-procesos',
  },
];

const resultados = [
  'Control estructurado',
  'Información confiable',
  'Decisiones en tiempo real',
  'Reducción de errores',
  'Automatización operativa',
  'Escalabilidad',
];

const diferenciadores = [
  'No abordamos problemas aislados',
  'Integramos toda la operación',
  'Conectamos el mundo físico con sistemas',
  'Habilitamos automatización real',
  'Evolucionamos contigo desde control hasta autonomía',
];

const aplicaciones = [
  { label: 'Control de activos por ubicación', slug: 'control-activos-ubicacion' },
  { label: 'Control por responsable', slug: 'control-activos-responsable' },
  { label: 'Disponibilidad de activos', slug: 'disponibilidad-activos' },
  { label: 'Control de retornables', slug: 'control-retornables' },
  { label: 'Control de activos móviles', slug: 'control-activos-moviles' },
  { label: 'Integración ERP-operación', slug: 'integracion-erp-operacion' },
];

const queHabilita = [
  'Tener una sola fuente de verdad',
  'Alinear sistemas con la operación',
  'Eliminar procesos manuales',
  'Detectar errores en tiempo real',
  'Automatizar decisiones',
  'Escalar la operación sin perder control',
];

export default function PlataformaPage() {
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
            <span className="text-xs text-brand">Plataforma HTK</span>
          </div>

          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-5">Plataforma</p>
            <h1 className="mb-5">No es software. Es un sistema que conecta tu operación con decisiones en tiempo real.</h1>
            <p className="text-[17px] text-ink-500 leading-relaxed mb-8 max-w-2xl">
              HTK integra identificación, trazabilidad, visibilidad, integración y automatización para convertir tu operación física en un sistema controlado, conectado y accionable.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/sesion"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
              >
                Solicitar diagnóstico <ArrowRight />
              </Link>
              <Link
                href="/soluciones/identificacion-inteligente"
                className="inline-flex items-center gap-2 px-6 py-3 border border-ink-700 text-ink-700 text-sm font-medium rounded-btn hover:bg-surface-alt transition-colors"
              >
                Ver soluciones
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Qué es */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Qué es</p>
              <h2 className="mb-6">Un sistema que conecta el mundo físico con la toma de decisiones</h2>
            </div>
            <div className="space-y-4">
              <p className="text-[17px] text-ink-500 leading-relaxed">
                HTK no es una herramienta aislada. Es una plataforma que integra múltiples capacidades para transformar la forma en la que las organizaciones entienden, controlan y operan sus activos y procesos físicos.
              </p>
              <p className="text-[17px] text-ink-500 leading-relaxed">
                Su objetivo es claro: convertir la operación en un sistema estructurado, visible y automatizable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* El problema */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">El problema que resuelve</p>
              <h2 className="mb-6">La operación está fragmentada</h2>
              <p className="text-[17px] text-ink-500 leading-relaxed mb-6">
                En la mayoría de las organizaciones, los activos no están identificados correctamente, los eventos no se registran, la información está dispersa, los sistemas no están conectados y los procesos dependen de personas.
              </p>
              <p className="text-[17px] text-brand font-medium">El resultado: una operación sin control real.</p>
            </div>
            <div className="p-6 bg-surface-raised border border-border-subtle rounded-card">
              <p className="text-xs font-medium tracking-widest uppercase text-ink-300 mb-4">Lo que la plataforma habilita</p>
              <ul className="space-y-3">
                {queHabilita.map((item, i) => (
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

      {/* Cómo funciona */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Cómo funciona</p>
          <h2 className="mb-4">De la identificación a la automatización</h2>
          <p className="text-[17px] text-ink-500 leading-relaxed mb-12 max-w-2xl">
            La plataforma HTK sigue una lógica estructurada que permite evolucionar desde el control básico hasta la automatización operativa.
          </p>
          <div className="relative">
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {steps.map((step, i) => (
                <Link
                  key={step.slug}
                  href={`/soluciones/${step.slug}`}
                  className="group relative p-5 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/40 hover:shadow-sm transition-all"
                >
                  <span className="text-3xl font-medium text-brand/20 block mb-3">{step.num}</span>
                  <h3 className="text-sm font-medium text-ink mb-2 group-hover:text-brand transition-colors">{step.title}</h3>
                  <p className="text-sm text-ink-500 leading-snug mb-4">{step.text}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-brand opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver capacidad <ArrowRight size={11} />
                  </span>
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 z-10 -translate-y-1/2 text-ink-300">
                      <ArrowRight size={16} />
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Casos de aplicación */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">En la operación</p>
          <h2 className="mb-4">Un mismo sistema, múltiples aplicaciones</h2>
          <p className="text-[17px] text-ink-500 leading-relaxed mb-10 max-w-2xl">
            La plataforma HTK se adapta a distintos contextos operativos.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {aplicaciones.map((ca) => {
              const caseApp = caseApplications.find((c) => c.slug === ca.slug);
              return (
                <Link
                  key={ca.slug}
                  href={`/casos-aplicacion/${ca.slug}`}
                  className="group p-5 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
                >
                  <h3 className="text-sm font-medium text-ink mb-2">{caseApp?.title ?? ca.label}</h3>
                  {caseApp?.description && (
                    <p className="text-sm text-ink-500 leading-relaxed mb-4 line-clamp-2">{caseApp.description}</p>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand group-hover:gap-3 transition-all">
                    Ver caso <ArrowRight size={12} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resultado */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Resultado</p>
              <h2 className="mb-4">Lo que cambia cuando operas como un sistema</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {resultados.map((r, i) => (
                <div key={i} className="flex items-start gap-2 p-4 bg-surface-raised border border-border-subtle rounded-card">
                  <span className="mt-0.5 text-green-500 flex-shrink-0"><CheckIcon /></span>
                  <span className="text-sm text-ink-500">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciador */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Diferenciador HTK</p>
              <h2 className="mb-6">No vendemos herramientas. Construimos sistemas operativos.</h2>
              <ul className="space-y-3">
                {diferenciadores.map((d, i) => (
                  <li key={i} className="flex items-start gap-3 text-[17px] text-ink-500">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 bg-brand-tint50 border border-brand-tint100 rounded-block">
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-6">Las 5 capacidades</p>
              <div className="space-y-3">
                {solutions.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/soluciones/${s.slug}`}
                    className="group flex items-center justify-between p-3 bg-white/60 border border-brand-tint100 rounded-card hover:border-brand/30 hover:bg-white transition-all"
                  >
                    <span className="text-sm font-medium text-ink group-hover:text-brand transition-colors">{s.title}</span>
                    <span className="text-brand opacity-0 group-hover:opacity-100 transition-opacity"><ArrowRight size={12} /></span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-dark py-24">
        <div className="max-w-8xl mx-auto px-6 md:px-10 text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Siguiente paso</p>
          <h2 className="text-white mb-4">Tu operación puede ser controlada. También puede ser inteligente.</h2>
          <p className="text-[17px] text-white/60 max-w-xl mx-auto mb-8">
            Descubre cómo transformar tu operación en un sistema conectado y automatizado.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/sesion"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
            >
              Solicitar diagnóstico <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
