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

export default function Nosotros() {
  return (
    <>
      <section className="bg-surface-base pt-28 pb-20 border-b border-border-subtle overflow-hidden">
        <div className="max-w-8xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-5">Quiénes somos</p>
            <h1 className="mb-5">Identificación inteligente para empresas que no pueden permitirse perder el control.</h1>
            <p className="text-[17px] text-ink-500 leading-relaxed mb-8">
              HTK es una empresa mexicana con más de 10 años ayudando a organizaciones medianas y grandes a recuperar el control de sus activos mediante tecnología, procesos y la plataforma Tagventory.
            </p>
            <Link href="/diagnostico" className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors">
              Hablar con HTK <ArrowRight />
            </Link>
          </div>
          <div className="hidden lg:flex justify-center">
            <IcosahedronSVG size={360} />
          </div>
        </div>
      </section>

      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-3 gap-10">
            {[
              { label: 'Misión', title: 'Dar certeza operativa', desc: 'Que cada empresa sepa exactamente qué tiene, dónde está y en qué condición, en tiempo real y sin fricción.' },
              { label: 'Visión', title: 'Cero activos fuera de control', desc: 'Un mundo donde ninguna organización tome decisiones basadas en datos de activos incorrectos o incompletos.' },
              { label: 'Principio', title: 'Tecnología al servicio del control', desc: 'RFID, OCR, APIs y plataforma Tagventory como medios. El objetivo siempre es operación confiable y resultados medibles.' },
            ].map((item) => (
              <div key={item.label} className="p-7 bg-surface-raised border border-border-subtle rounded-card">
                <p className="text-xs font-medium tracking-widest uppercase text-brand mb-3">{item.label}</p>
                <h3 className="text-lg font-medium text-ink mb-3">{item.title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4 text-center">HTK en números</p>
          <h2 className="text-center mb-14">Más de una década generando control</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { metric: '+200', label: 'Proyectos completados', desc: 'Implementaciones exitosas en México y LATAM' },
              { metric: '12+', label: 'Clientes enterprise', desc: 'Empresas líderes en sus sectores' },
              { metric: '10 años', label: 'Experiencia', desc: 'En identificación inteligente de activos' },
              { metric: '1', label: 'Plataforma propia', desc: 'Tagventory, desarrollada y mantenida por HTK' },
            ].map((item) => (
              <div key={item.label} className="text-center p-7 bg-surface-raised border border-border-subtle rounded-card">
                <div className="text-4xl font-medium text-brand mb-2">{item.metric}</div>
                <div className="text-sm font-medium text-ink mb-2">{item.label}</div>
                <p className="text-xs text-ink-300 leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Plataforma propia</p>
            <h2 className="mb-4">Tagventory</h2>
            <p className="text-[17px] text-ink-500 leading-relaxed mb-6">
              Tagventory es la plataforma central de HTK. Diseñada específicamente para la gestión de activos empresariales, integra identificación física, trazabilidad digital y conectividad con sistemas de negocio.
            </p>
            <div className="flex flex-col gap-3 mb-8">
              {[
                'Inventario y conciliación en tiempo real',
                'Dashboard operativo configurable',
                'Integración con ERP, SAP y sistemas contables',
                'Reportes de cumplimiento y auditoría',
                'Alertas y automatización de procesos',
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-ink-500">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#F79A3F" strokeWidth="1.5">
                    <path d="M3 8l4 4 6-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {f}
                </div>
              ))}
            </div>
            <Link href="/demo-tagventory" className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors">
              Ver demo de Tagventory <ArrowRight />
            </Link>
          </div>

          <div className="bg-surface-raised border border-border-subtle rounded-block p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="1.5">
                  <rect x="3" y="3" width="14" height="14" rx="2" />
                  <path d="M7 7h6M7 10h4M7 13h6" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-ink">Tagventory</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  <span className="text-xs text-ink-300">En operación</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {['Dashboard activos', 'Conciliación contable', 'Control de movimientos', 'Reportes automáticos', 'Integración ERP'].map((feat, i) => (
                <div key={feat} className="flex items-center justify-between py-2 border-b border-border-subtle last:border-0">
                  <span className="text-sm text-ink-500">{feat}</span>
                  <span className="text-xs font-medium text-green-500 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">
                    {i === 2 ? 'Activo' : 'Incluido'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4 text-center">Clientes</p>
          <h2 className="text-center mb-12">Empresas que confían en HTK</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {clients.map((c) => (
              <div key={c} className="flex items-center justify-center h-16 bg-surface-raised border border-border-subtle rounded-card">
                <span className="text-sm font-medium text-ink-300">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Tecnologías</p>
          <h2 className="mb-4">Con qué trabajamos</h2>
          <p className="text-[17px] text-ink-500 mb-10 max-w-2xl">Seleccionamos las tecnologías en función del problema, no al revés.</p>
          <div className="flex flex-wrap gap-3">
            {['RFID UHF', 'RFID HF / NFC', 'OCR Visión Artificial', 'Códigos de barras', 'QR & DataMatrix', 'Lectores portátiles', 'Portales fijos', 'APIs REST', 'SAP Integration', 'Oracle ERP', 'Tagventory Platform', 'Middleware HTK'].map((t) => (
              <span key={t} className="px-4 py-2 bg-surface-raised border border-border-subtle rounded-full text-sm text-ink-700">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-dark py-24">
        <div className="max-w-8xl mx-auto px-6 md:px-10 text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Siguiente paso</p>
          <h2 className="text-white mb-4">¿Quieres conocer si podemos ayudarte?</h2>
          <p className="text-[17px] text-white/60 max-w-xl mx-auto mb-8">Empieza con un diagnóstico sin costo. En 45 minutos sabrás si HTK es la solución correcta para tu operación.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/diagnostico" className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors">
              Solicitar diagnóstico <ArrowRight />
            </Link>
            <Link href="/contacto" className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 text-white text-sm font-medium rounded-btn hover:bg-white/10 transition-colors">
              Contactar directamente
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
