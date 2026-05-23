import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMeta, breadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = buildMeta(
  'Tagventory — Plataforma de control de activos HTK',
  'Tagventory es la plataforma que conecta identificación, trazabilidad, integración y automatización de activos en una sola fuente confiable. Diseñada para operaciones medianas y grandes en México.',
  '/plataforma/tagventory'
);

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M2.5 7l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const capabilities = [
  {
    id: 'identificacion',
    label: 'Identificación',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="14" height="14" rx="2" />
        <path d="M7 7h2M7 10h6M7 13h4" strokeLinecap="round" />
      </svg>
    ),
    headline: 'Cada activo, único e identificable',
    description: 'Asignación de ID estructurado, generación de etiquetas y vinculación con tecnologías físicas de captura: RFID, QR, código de barras. La identidad del activo como base de todo lo demás.',
    tags: ['RFID', 'QR / Código de barras', 'EPC', 'Etiquetas duraderas'],
    href: '/soluciones/identificacion',
  },
  {
    id: 'trazabilidad',
    label: 'Control y Trazabilidad',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 10h12M10 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="6" cy="10" r="1.5" fill="currentColor" />
      </svg>
    ),
    headline: 'Historial completo de cada activo',
    description: 'Registro de movimientos, responsables, ubicaciones y eventos. Trazabilidad end-to-end para reconstruir qué pasó, dónde y cuándo con cualquier activo.',
    tags: ['Resguardos', 'Custodias', 'Historial de eventos', 'Auditoría digital'],
    href: '/soluciones/control-trazabilidad',
  },
  {
    id: 'integracion',
    label: 'Integración',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="7" width="5" height="6" rx="1" />
        <rect x="13" y="7" width="5" height="6" rx="1" />
        <path d="M7 10h6" strokeLinecap="round" />
      </svg>
    ),
    headline: 'Conectado con tus sistemas actuales',
    description: 'Integración nativa con ERP, sistemas administrativos, dispositivos físicos y fuentes externas. Tagventory no sustituye tus sistemas — los conecta con la realidad operativa.',
    tags: ['ERP', 'API REST', 'XML / EDI', 'Middleware'],
    href: '/soluciones/integracion',
  },
  {
    id: 'automatizacion',
    label: 'Automatización',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="10" cy="10" r="7" />
        <path d="M10 6v4l3 2" strokeLinecap="round" />
      </svg>
    ),
    headline: 'Procesos que se ejecutan solos',
    description: 'Definición de reglas y flujos que se activan automáticamente. Alertas, validaciones, aprobaciones y registros sin intervención manual — basados en eventos reales del activo.',
    tags: ['Reglas de negocio', 'Alertas automáticas', 'Flujos de aprobación', 'Integración con RFID'],
    href: '/soluciones/automatizacion',
  },
  {
    id: 'visibilidad',
    label: 'Visibilidad Operativa',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 10c0 0 3-6 8-6s8 6 8 6-3 6-8 6-8-6-8-6z" />
        <circle cx="10" cy="10" r="2.5" />
      </svg>
    ),
    headline: 'Claridad en tiempo real',
    description: 'Dashboards, reportes y vistas operativas que consolidan información de múltiples fuentes. Del activo individual a la operación completa, sin puntos ciegos.',
    tags: ['Dashboards', 'Reportes operativos', 'Alertas en tiempo real', 'KPIs de activos'],
    href: '/soluciones/visibilidad',
  },
  {
    id: 'conciliacion',
    label: 'Conciliación',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 5h10M5 10h7M5 15h10" strokeLinecap="round" />
        <path d="M15 8l2 2-2 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    headline: 'Físico y digital siempre alineados',
    description: 'Motor de conciliación que identifica faltantes, sobrantes, omisiones y coincidencias entre el inventario físico y los registros del sistema. Una sola versión de la verdad.',
    tags: ['Conciliación ERP', 'Inventarios físicos', 'Diferencias y excepciones', 'Cierre contable'],
    href: '/soluciones/conciliacion',
  },
];

const industries = [
  { label: 'Salud', description: 'Equipos médicos críticos siempre disponibles', href: '/industrias/salud' },
  { label: 'Manufactura / IMMEX', description: 'Control de activos bajo Anexo 24 y operación productiva', href: '/industrias/manufactura-immex' },
  { label: 'Logística y Transporte', description: 'Trazabilidad de activos móviles en toda la cadena', href: '/industrias/logistica-transporte' },
  { label: 'Retail y Corporativos', description: 'Visibilidad de activos distribuidos en múltiples sedes', href: '/industrias/retail-corporativos' },
  { label: 'Gobierno', description: 'Control y evidencia para auditorías y cumplimiento regulatorio', href: '/industrias/gobierno' },
  { label: 'Servicios y Eventos', description: 'Activos en el lugar correcto en el momento exacto', href: '/industrias/servicios-eventos' },
];

const results = [
  { metric: '90%', label: 'reducción en tiempo de auditoría', client: 'Cinépolis, +400 sedes' },
  { metric: '100%', label: 'disponibilidad de activos médicos críticos', client: 'Grupo GIA' },
  { metric: '0', label: 'recompras no planeadas de contenedores', client: 'ABC Querétaro' },
  { metric: '< 5 días', label: 'para propuesta tras diagnóstico inicial', client: 'Proceso HTK estándar' },
];

const differentiators = [
  {
    title: 'Plataforma propia, no un conector',
    description: 'Tagventory no es un middleware ni un integrador genérico. Es la plataforma operativa central donde vive la inteligencia de tus activos.',
  },
  {
    title: 'Diseñada para México',
    description: 'Cumplimiento IMMEX / Anexo 24, carta porte, SAT. Integraciones y flujos diseñados para la realidad regulatoria y operativa de empresas en México.',
  },
  {
    title: 'Implementación con especialistas HTK',
    description: 'No te dejamos con un manual de usuario. El equipo HTK diseña e implementa la solución de inicio a fin, con acompañamiento continuo.',
  },
  {
    title: 'Modular y escalable',
    description: 'Empiezas donde el dolor es mayor. Escalas cuando la operación lo requiere. Sin pagar por lo que no necesitas desde el día uno.',
  },
];

const integrations = [
  'SAP', 'Oracle', 'Microsoft Dynamics', 'CONTPAQ', 'Aspel', 'RFID (Zebra, Impinj)', 'Handheld / móvil', 'XML (Carta Porte / SAT)',
];

export default function TagventoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: 'Inicio', href: '/' },
            { name: 'Plataforma', href: '/plataforma/tagventory' },
            { name: 'Tagventory', href: '/plataforma/tagventory' },
          ])),
        }}
      />

      {/* ── HERO ── */}
      <section className="bg-surface-base pt-28 pb-20 border-b border-border-subtle">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-2 mb-5">
            <Link href="/" className="text-xs text-ink-300 hover:text-brand transition-colors">Inicio</Link>
            <span className="text-ink-300 text-xs">/</span>
            <span className="text-xs text-brand">Tagventory</span>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-5">Plataforma HTK</p>
              <h1 className="mb-5">
                La plataforma que conecta tus activos, tu operación y tu información en una sola fuente confiable
              </h1>
              <p className="text-[17px] text-ink-500 leading-relaxed mb-8">
                Tagventory permite identificar, controlar, localizar, integrar y automatizar información de activos para operar, cumplir y tomar decisiones sin incertidumbre.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/sesion"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
                >
                  Agendar sesión gratuita <ArrowRight />
                </Link>
                <Link
                  href="#capacidades"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border-subtle text-sm font-medium text-ink-500 rounded-btn hover:text-ink hover:border-ink-300 transition-colors"
                >
                  Ver capacidades
                </Link>
              </div>
            </div>

            {/* Platform visual */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-80 h-80">
                {/* Center node */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-28 h-28 bg-brand rounded-2xl flex flex-col items-center justify-center shadow-lg z-10">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="1.5">
                      <rect x="4" y="4" width="24" height="24" rx="4" />
                      <path d="M10 12h12M10 16h8M10 20h12" strokeLinecap="round" />
                    </svg>
                    <span className="text-xs font-medium text-white mt-1.5">Tagventory</span>
                  </div>
                </div>
                {/* Orbit ring */}
                <div className="absolute inset-4 rounded-full border border-border-subtle opacity-60" />
                <div className="absolute inset-0 rounded-full border border-border-subtle opacity-30" />
                {/* Satellite nodes */}
                {[
                  { label: 'RFID', angle: 0, icon: '📡' },
                  { label: 'ERP', angle: 60, icon: '🔗' },
                  { label: 'Móvil', angle: 120, icon: '📱' },
                  { label: 'Auditoría', angle: 180, icon: '✓' },
                  { label: 'Alertas', angle: 240, icon: '🔔' },
                  { label: 'Dashboard', angle: 300, icon: '📊' },
                ].map((node) => {
                  const rad = (node.angle - 90) * (Math.PI / 180);
                  const r = 120;
                  const x = 160 + r * Math.cos(rad);
                  const y = 160 + r * Math.sin(rad);
                  return (
                    <div
                      key={node.label}
                      className="absolute w-14 h-14 bg-surface-raised border border-border-subtle rounded-xl flex flex-col items-center justify-center shadow-sm"
                      style={{ left: x - 28, top: y - 28 }}
                    >
                      <span className="text-base leading-none">{node.icon}</span>
                      <span className="text-[9px] text-ink-300 mt-0.5">{node.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Trust bar */}
          <div className="mt-14 pt-10 border-t border-border-subtle flex flex-wrap gap-6 md:gap-10">
            {[
              { value: '500+', label: 'empresas implementadas' },
              { value: '10M+', label: 'activos bajo gestión' },
              { value: '6', label: 'industrias críticas' },
              { value: 'México', label: 'operación y cumplimiento local' },
            ].map((stat) => (
              <div key={stat.value} className="flex flex-col">
                <span className="text-2xl font-semibold text-ink">{stat.value}</span>
                <span className="text-xs text-ink-300 mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EL PROBLEMA QUE RESUELVE ── */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">El problema que resuelve</p>
              <h2 className="mb-6">Operar sin visibilidad confiable de activos tiene un costo real</h2>
              <div className="space-y-4">
                <p className="text-[17px] text-ink-500 leading-relaxed">
                  La mayoría de las empresas tienen sus activos registrados en varios sistemas que no hablan entre sí: ERP, hojas de cálculo, sistemas locales, registros en papel. El resultado es que nadie sabe, con certeza, qué tienen, dónde está y en qué condición.
                </p>
                <p className="text-[17px] text-ink-500 leading-relaxed">
                  Eso genera recompras innecesarias, auditorías que fallan, incumplimientos regulatorios, activos perdidos y decisiones financieras basadas en datos que no reflejan la realidad.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { area: 'Finanzas', problem: 'Activos registrados que no existen físicamente. Depreciaciones incorrectas. Auditorías que no cierran.' },
                { area: 'Operaciones', problem: 'No saber si un activo está disponible o dónde está. Tiempo perdido buscando en lugar de produciendo.' },
                { area: 'Cumplimiento', problem: 'Sin trazabilidad, no hay evidencia. IMMEX, SAT, auditorías regulatorias quedan expuestos.' },
                { area: 'TI', problem: 'Múltiples sistemas sin integración. Datos duplicados. Ninguna fuente es la definitiva.' },
              ].map((item) => (
                <div key={item.area} className="p-5 bg-surface-raised border border-border-subtle rounded-card">
                  <p className="text-xs font-medium tracking-wider uppercase text-brand mb-1.5">{item.area}</p>
                  <p className="text-sm text-ink-500 leading-relaxed">{item.problem}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUÉ ES TAGVENTORY ── */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Qué es Tagventory</p>
            <h2 className="mb-6">No es un software de inventarios. Es el sistema operativo de tus activos.</h2>
            <p className="text-[17px] text-ink-500 leading-relaxed mb-4">
              Tagventory es la plataforma donde convergen identificación, trazabilidad, integración, automatización y visibilidad en un solo sistema. No requiere reemplazar lo que ya tienes — se conecta con tus sistemas actuales y los convierte en una fuente de verdad operativa.
            </p>
            <p className="text-[17px] text-ink-500 leading-relaxed">
              Está diseñada para empresas que ya tienen operaciones establecidas y necesitan control real: con evidencia, sin fricciones y con capacidad de escalar.
            </p>
          </div>

          <div className="mt-14 grid sm:grid-cols-3 gap-4">
            {[
              { label: 'No es', items: ['Software de inventarios genérico', 'Una hoja de Excel mejorada', 'Un sistema de tickets de soporte', 'Un ERP de activos fijos'] },
              { label: 'Es', items: ['Sistema operativo de activos', 'Fuente única de verdad', 'Motor de integración y automatización', 'Plataforma de visibilidad y cumplimiento'] },
              { label: 'Para quién', items: ['Empresas con 500–50,000+ activos', 'Operaciones medianas y grandes', 'Múltiples sedes o ubicaciones', 'Industrias con cumplimiento regulatorio'] },
            ].map((col, i) => (
              <div
                key={col.label}
                className={`p-6 rounded-card border ${i === 1 ? 'bg-brand-tint50 border-brand-tint100' : 'bg-surface-raised border-border-subtle'}`}
              >
                <p className={`text-xs font-medium tracking-widest uppercase mb-4 ${i === 1 ? 'text-brand' : 'text-ink-300'}`}>{col.label}</p>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-ink-500">
                      <span className={`mt-0.5 flex-shrink-0 ${i === 1 ? 'text-brand' : 'text-ink-300'}`}>
                        <CheckIcon />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPACIDADES ── */}
      <section id="capacidades" className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Capacidades</p>
          <div className="grid md:grid-cols-2 gap-10 items-end mb-12">
            <h2>Seis capacidades que operan como un solo sistema</h2>
            <p className="text-[17px] text-ink-500 leading-relaxed">
              Cada capacidad funciona de forma independiente. Juntas, eliminan los puntos ciegos entre identificación, operación, sistemas y cumplimiento.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap) => (
              <Link
                key={cap.id}
                href={cap.href}
                className="group p-6 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all flex flex-col"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-tint50 flex items-center justify-center text-brand mb-4 group-hover:bg-brand group-hover:text-white transition-colors flex-shrink-0">
                  {cap.icon}
                </div>
                <p className="text-xs font-medium tracking-wider uppercase text-brand mb-1">{cap.label}</p>
                <h3 className="text-base font-semibold text-ink mb-2">{cap.headline}</h3>
                <p className="text-sm text-ink-500 leading-relaxed flex-1">{cap.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cap.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-[10px] font-medium bg-surface-alt text-ink-300 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand mt-4 group-hover:gap-3 transition-all">
                  Ver capacidad <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA / ARQUITECTURA ── */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Cómo funciona</p>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="mb-6">Tres capas que hacen que el control sea posible</h2>
              <p className="text-[17px] text-ink-500 leading-relaxed mb-8">
                Tagventory opera en tres capas integradas: captura de la realidad física, procesamiento y gestión de datos, y visibilidad para decisiones. Ninguna capa funciona aislada — las tres juntas cierran el ciclo.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  layer: '01',
                  title: 'Capa física — Captura',
                  description: 'RFID, QR, códigos de barras, sensores e inputs visuales capturan eventos reales del activo en campo.',
                  items: ['Lectores RFID fijos y portátiles', 'Apps móviles para captura en campo', 'Integración con dispositivos especializados'],
                },
                {
                  layer: '02',
                  title: 'Capa central — Tagventory',
                  description: 'El motor que procesa, valida, integra y ejecuta lógica operativa. Aquí vive la inteligencia de los activos.',
                  items: ['Motor de reglas y automatización', 'Conciliación y validación de datos', 'Integración con ERP y sistemas externos'],
                },
                {
                  layer: '03',
                  title: 'Capa de visibilidad — Decisión',
                  description: 'Dashboards, reportes y alertas que convierten datos operativos en claridad para quien toma decisiones.',
                  items: ['Dashboards en tiempo real', 'Alertas configurables', 'Reportes para auditoría y cumplimiento'],
                },
              ].map((l) => (
                <div key={l.layer} className="p-5 bg-surface-raised border border-border-subtle rounded-card">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-light text-brand/40 flex-shrink-0 leading-none mt-0.5">{l.layer}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-ink mb-1">{l.title}</p>
                      <p className="text-sm text-ink-500 mb-3">{l.description}</p>
                      <ul className="space-y-1">
                        {l.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-ink-300">
                            <span className="mt-0.5 text-brand/50 flex-shrink-0">—</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DÓNDE SE USA ── */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Dónde se usa</p>
          <div className="grid md:grid-cols-2 gap-10 items-end mb-12">
            <h2>Tagventory opera en industrias donde el error no es una opción</h2>
            <p className="text-[17px] text-ink-500 leading-relaxed">
              Cada industria tiene sus propios riesgos, regulaciones y dinámicas. Tagventory se adapta — sin perder el principio: control total sobre cada activo.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((ind) => (
              <Link
                key={ind.label}
                href={ind.href}
                className="group p-5 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
              >
                <h3 className="text-sm font-semibold text-ink mb-1.5 group-hover:text-brand transition-colors">{ind.label}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{ind.description}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand mt-4 group-hover:gap-3 transition-all">
                  Ver industria <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTADOS ── */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Resultados</p>
          <div className="grid md:grid-cols-2 gap-10 items-end mb-12">
            <h2>Impacto real en operaciones reales</h2>
            <p className="text-[17px] text-ink-500 leading-relaxed">
              No hablamos de potencial. Estos son resultados documentados en clientes que implementaron Tagventory.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.map((r) => (
              <div key={r.metric} className="p-6 bg-brand-tint50 border border-brand-tint100 rounded-card">
                <p className="text-4xl font-semibold text-brand mb-2">{r.metric}</p>
                <p className="text-sm font-medium text-ink mb-1">{r.label}</p>
                <p className="text-xs text-ink-300">{r.client}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { outcome: 'Reducción de pérdida de activos', detail: 'Control por responsable y ubicación. Cada activo tiene dueño.' },
              { outcome: 'Inventarios en horas, no en semanas', detail: 'Captura masiva con RFID o móvil. Conciliación automática con ERP.' },
              { outcome: 'Cumplimiento regulatorio sostenible', detail: 'Evidencia digital permanente. Lista para IMMEX, SAT o auditoría interna.' },
              { outcome: 'Decisiones con datos confiables', detail: 'Una sola versión de la realidad, accesible para finanzas, operaciones y TI.' },
              { outcome: 'Eliminación de recompras no planeadas', detail: 'Visibilidad de disponibilidad real. Sabes qué tienes antes de comprar más.' },
              { outcome: 'Operación continua sin fricciones', detail: 'Procesos automáticos que no dependen de intervención manual para funcionar.' },
            ].map((item) => (
              <div key={item.outcome} className="flex items-start gap-3 p-4 bg-surface-raised border border-border-subtle rounded-card">
                <span className="mt-0.5 text-brand flex-shrink-0"><CheckIcon /></span>
                <div>
                  <p className="text-sm font-medium text-ink mb-0.5">{item.outcome}</p>
                  <p className="text-xs text-ink-300 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIFERENCIADORES ── */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Por qué Tagventory</p>
              <h2 className="mb-6">No es otro sistema. Es el que cierra el ciclo.</h2>
              <div className="space-y-6">
                {differentiators.map((d) => (
                  <div key={d.title} className="flex items-start gap-4">
                    <span className="mt-1 w-2 h-2 rounded-full bg-brand flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold text-ink mb-1">{d.title}</p>
                      <p className="text-sm text-ink-500 leading-relaxed">{d.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 bg-surface-raised border border-border-subtle rounded-block">
              <p className="text-xs font-medium tracking-widest uppercase text-ink-300 mb-6">Integraciones y tecnologías compatibles</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {integrations.map((int) => (
                  <span
                    key={int}
                    className="px-3 py-1.5 text-xs font-medium bg-surface-alt border border-border-subtle text-ink-500 rounded-btn"
                  >
                    {int}
                  </span>
                ))}
              </div>
              <div className="pt-6 border-t border-border-subtle">
                <p className="text-xs font-medium tracking-widest uppercase text-ink-300 mb-3">También integra con</p>
                <p className="text-sm text-ink-500">
                  Cualquier sistema con API REST, bases de datos SQL, fuentes XML o inputs desde dispositivos físicos (sensores, básculas, PLCs).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESO DE IMPLEMENTACIÓN ── */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Cómo empezar</p>
          <div className="grid md:grid-cols-2 gap-10 items-end mb-12">
            <h2>Del diagnóstico a la operación en semanas, no en meses</h2>
            <p className="text-[17px] text-ink-500 leading-relaxed">
              No arrancamos con meses de consultoría. Empezamos con un diagnóstico de 30 minutos, identificamos el caso de mayor impacto y construimos desde ahí.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Sesión de análisis', description: '30 minutos con un especialista HTK. Diagnóstico de tu situación real: qué está fallando y qué solución tiene más impacto.' },
              { step: '02', title: 'Propuesta de valor', description: 'Diseño específico para tu operación. Alcance, tecnología, cronograma y retorno esperado. En menos de 5 días hábiles.' },
              { step: '03', title: 'Implementación', description: 'El equipo HTK diseña, configura e implementa. Tú operas — nosotros resolvemos la complejidad técnica.' },
              { step: '04', title: 'Operación continua', description: 'Acompañamiento post-implementación. Ajustes, nuevas capacidades y escalamiento cuando lo necesitas.' },
            ].map((s) => (
              <div key={s.step} className="p-6 bg-surface-raised border border-border-subtle rounded-card">
                <p className="text-3xl font-light text-brand/30 mb-3">{s.step}</p>
                <h3 className="text-base font-semibold text-ink mb-2">{s.title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="bg-surface-dark py-24">
        <div className="max-w-8xl mx-auto px-6 md:px-10 text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Siguiente paso</p>
          <h2 className="text-white mb-4">
            ¿Tu operación necesita control real sobre sus activos?
          </h2>
          <p className="text-[17px] text-white/60 max-w-xl mx-auto mb-8">
            En 30 minutos identificamos qué está fallando en tu control de activos y qué solución tiene más impacto en tu operación. Sin costo, sin compromiso.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/sesion"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
            >
              Agendar sesión gratuita <ArrowRight />
            </Link>
            <Link
              href="/recursos/autodiagnostico-control-activos"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white text-sm font-medium rounded-btn hover:border-white/40 transition-colors"
            >
              Hacer autodiagnóstico
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
