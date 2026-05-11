import type { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';

export const metadata: Metadata = buildMeta(
  'Quiénes somos — El equipo detrás de HTK',
  'HTK es una empresa especializada en identificación, trazabilidad y control de activos físicos. Conoce nuestra metodología, equipo y casos de impacto real.',
  '/nosotros'
);

import Link from 'next/link';
import IcosahedronSVG from '@/components/IcosahedronSVG';
import { clients } from '@/data/content';

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#F79A3F" strokeWidth="1.5">
      <path d="M3 8l4 4 6-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Nosotros() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="bg-surface-base pt-28 pb-20 border-b border-border-subtle overflow-hidden">
        <div className="max-w-8xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-5">Quiénes somos</p>
            <h1 className="mb-5">
              No es solo software. No es solo tecnología.<br />
              Es el sistema que conecta tu operación con decisiones confiables.
            </h1>
            <p className="text-[17px] text-ink-500 leading-relaxed mb-8">
              HTK ayuda a empresas a convertir la información de sus activos en una base confiable para operar, cumplir y tomar decisiones sin riesgo.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/sesion" className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors">
                Entender cómo aplicaría en mi operación <ArrowRight />
              </Link>
              <Link href="/soluciones/plataforma" className="inline-flex items-center gap-2 px-6 py-3 border border-ink-700 text-ink-700 text-sm font-medium rounded-btn hover:bg-surface-alt transition-colors">
                Ver soluciones
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex justify-center">
            <IcosahedronSVG size={360} />
          </div>
        </div>
      </section>

      {/* ── EL PROBLEMA QUE RESOLVEMOS ───────────────────────────────── */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">El problema que resolvemos</p>
            <h2 className="mb-6">El problema no es la falta de tecnología. Es la falta de confiabilidad en la información.</h2>
            <p className="text-[17px] text-ink-500 leading-relaxed mb-6">
              En la mayoría de las organizaciones, la información de activos no es confiable.
            </p>
            <div className="flex flex-col gap-3 mb-8">
              {[
                'No coincide entre sistemas',
                'No refleja lo que ocurre en la operación',
                'No tiene trazabilidad',
                'No está conectada entre áreas',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-ink-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <p className="text-sm text-ink-500 leading-relaxed">
              El resultado: incertidumbre, errores, pérdidas, riesgos y decisiones mal fundamentadas.
            </p>
          </div>
          <div className="lg:pt-16">
            <div className="p-8 bg-surface-raised border border-border-subtle rounded-block">
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">El punto de partida</p>
              <p className="text-[17px] text-ink leading-relaxed font-medium mb-4">
                El problema no es inventariar activos.
              </p>
              <p className="text-[17px] text-ink-500 leading-relaxed">
                Es no poder confiar en la información que los representa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CÓMO PENSAMOS ────────────────────────────────────────────── */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Cómo pensamos</p>
            <h2 className="mb-6">No resolvemos síntomas. Resolvemos la estructura.</h2>
            <p className="text-[17px] text-ink-500 leading-relaxed">
              La mayoría de las soluciones atacan partes del problema. Nosotros no.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { neg: 'No hacemos inventarios aislados', pos: 'Conectamos lo físico con lo digital' },
              { neg: 'No implementamos tecnología sin contexto', pos: 'Convertimos datos en información confiable' },
              { neg: 'No conectamos sistemas sin lógica operativa', pos: 'Alineamos operación, sistemas y decisiones' },
            ].map((item) => (
              <div key={item.neg} className="p-6 bg-surface-raised border border-border-subtle rounded-card">
                <p className="text-sm text-ink-300 line-through mb-3">{item.neg}</p>
                <div className="flex items-start gap-2">
                  <Check />
                  <p className="text-sm font-medium text-ink leading-snug">{item.pos}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="max-w-2xl mx-auto text-center p-6 bg-surface-alt border border-border-subtle rounded-block">
            <p className="text-[17px] text-ink-500 leading-relaxed">
              Porque el problema no es lo que ves.{' '}
              <span className="text-ink font-medium">Es lo que no puedes validar.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── EL MODELO HTK ────────────────────────────────────────────── */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4 text-center">El modelo HTK</p>
          <h2 className="text-center mb-4">De la incertidumbre… al control y la automatización</h2>
          <p className="text-[17px] text-ink-500 text-center max-w-2xl mx-auto mb-14">
            HTK sigue una lógica estructurada que permite transformar la operación paso a paso.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Identificación', desc: 'Cada activo se convierte en un elemento único, reconocible y conectable.' },
              { step: '02', title: 'Control y trazabilidad', desc: 'Cada movimiento, cambio y evento se registra y se vuelve auditable.' },
              { step: '03', title: 'Visibilidad operativa', desc: 'La información se consolida y permite entender lo que ocurre en tiempo real.' },
              { step: '04', title: 'Integración de información', desc: 'Los sistemas y la operación se alinean bajo una misma lógica.' },
              { step: '05', title: 'Automatización de procesos', desc: 'La operación ejecuta decisiones automáticamente con base en eventos reales.' },
            ].map((item) => (
              <div key={item.step} className="p-6 bg-surface-raised border border-border-subtle rounded-card flex flex-col">
                <span className="text-xs font-medium text-brand mb-3">{item.step}</span>
                <h3 className="text-sm font-medium text-ink mb-3">{item.title}</h3>
                <p className="text-xs text-ink-300 leading-relaxed flex-1">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-ink-500 mt-8">
            Esto no son módulos aislados —{' '}
            <span className="text-ink font-medium">es un sistema que evoluciona contigo.</span>
          </p>
        </div>
      </section>

      {/* ── DÓNDE GENERAMOS VALOR ────────────────────────────────────── */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Dónde generamos valor</p>
            <h2 className="mb-6">Operaciones donde el error cuesta dinero, tiempo o riesgo</h2>
            <p className="text-[17px] text-ink-500 leading-relaxed mb-8">
              HTK trabaja con organizaciones donde la gestión de activos impacta directamente la operación.
            </p>
            <div className="flex flex-col gap-3">
              {[
                'Operaciones multi-sede',
                'Activos móviles o distribuidos',
                'Entornos regulados',
                'Operaciones con alto volumen',
                'Servicios donde la disponibilidad es crítica',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-ink-500">
                  <Check />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="lg:pt-10">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Cuando la información falla</p>
            <div className="flex flex-col gap-3">
              {[
                { icon: '⏸', label: 'La operación se detiene' },
                { icon: '⚠️', label: 'El cumplimiento se debilita' },
                { icon: '📉', label: 'Las decisiones pierden sustento' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 p-5 bg-surface-raised border border-border-subtle rounded-card">
                  <span className="text-2xl">{item.icon}</span>
                  <p className="text-sm font-medium text-ink">{item.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-ink-500 leading-relaxed">
              Ahí es donde <span className="text-ink font-medium">HTK genera valor real.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── QUIÉNES CONFÍAN EN HTK ───────────────────────────────────── */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4 text-center">Clientes</p>
          <h2 className="text-center mb-12">Empresas que ya operan con información confiable</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {clients.map((c) => (
              <div key={c.name} className="flex items-center justify-center h-16 bg-surface-raised border border-border-subtle rounded-card grayscale hover:grayscale-0 transition-all duration-300">
                {c.logo ? (
                  <img src={c.logo} alt={c.name} className={`object-contain max-h-10 max-w-[120px] ${c.size ?? ''}`} />
                ) : (
                  <span className="text-sm font-medium text-ink-300">{c.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTADOS REALES ────────────────────────────────────────── */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4 text-center">Resultados reales</p>
          <h2 className="text-center mb-4">Cuando el control se vuelve real, los resultados también</h2>
          <p className="text-[17px] text-ink-500 text-center max-w-2xl mx-auto mb-12">
            No son mejoras marginales. Son cambios estructurales en la forma de operar.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Reducción superior al 90% en tiempos de revisión de activos',
              'Eliminación de recompra innecesaria de activos',
              'Control total en operaciones logísticas complejas',
              'Visibilidad en tiempo real en entornos críticos',
              'Trazabilidad completa de procesos productivos',
              'Control de activos incluso fuera de la operación directa',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 p-5 bg-surface-raised border border-border-subtle rounded-card">
                <Check />
                <p className="text-sm text-ink-500 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CÓMO TRABAJAMOS ──────────────────────────────────────────── */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Cómo trabajamos</p>
            <h2 className="mb-6">No hacemos proyectos. Construimos capacidades.</h2>
            <p className="text-[17px] text-ink-500 leading-relaxed mb-8">
              Nuestra forma de trabajar está definida por principios claros.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { neg: 'No implementamos tecnología sin un problema real' },
                { neg: 'No desarrollamos soluciones que no puedan escalar' },
                { neg: 'No construimos proyectos aislados sin continuidad' },
              ].map((item) => (
                <div key={item.neg} className="flex items-center gap-3 p-4 bg-surface-raised border border-border-subtle rounded-card">
                  <span className="text-ink-300 text-lg">—</span>
                  <p className="text-sm text-ink-500">{item.neg}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:pt-16">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Cada implementación debe</p>
            <div className="flex flex-col gap-3">
              {[
                'Resolver un problema claro',
                'Generar valor tangible',
                'Convertirse en una base para evolucionar',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 p-5 bg-surface-raised border border-border-subtle rounded-card">
                  <Check />
                  <p className="text-sm font-medium text-ink">{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-ink-300 leading-relaxed">
              Buscamos impacto operativo real, resultados medibles y estructuras que se sostienen en el tiempo.
            </p>
          </div>
        </div>
      </section>

      {/* ── EL EQUIPO ────────────────────────────────────────────────── */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">El equipo</p>
            <h2 className="mb-6">Experiencia donde importa: operación, tecnología y control</h2>
            <p className="text-[17px] text-ink-500 leading-relaxed">
              Más que perfiles técnicos o comerciales, somos un equipo enfocado en entender cómo funciona la operación y cómo hacerla funcionar mejor.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              'Operaciones complejas',
              'Tecnología aplicada',
              'Integración de sistemas',
              'Control y trazabilidad',
              'Implementaciones en campo',
              'Proyectos multi-industria',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 bg-surface-raised border border-border-subtle rounded-card">
                <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                <p className="text-sm text-ink-500">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CIERRE ───────────────────────────────────────────────────── */}
      <section className="bg-surface-dark py-24">
        <div className="max-w-8xl mx-auto px-6 md:px-10 text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Siguiente paso</p>
          <h2 className="text-white mb-4 max-w-3xl mx-auto">
            Tu operación puede seguir operando con incertidumbre… o convertirse en un sistema confiable.
          </h2>
          <p className="text-[17px] text-white/60 max-w-xl mx-auto mb-8">
            HTK te ayuda a conectar lo físico, lo digital y lo operativo para eliminar errores, reducir pérdidas y tomar decisiones con certeza.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/sesion" className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors">
              Entender cómo aplicaría en mi operación <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
