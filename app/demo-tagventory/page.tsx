'use client';

import { useState } from 'react';
import Link from 'next/link';

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function DemoTagventory() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ nombre: '', empresa: '', email: '', telefono: '', cargo: '', activos: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const features = [
    { title: 'Dashboard de activos', desc: 'Vista en tiempo real del inventario completo con filtros por ubicación, estado y responsable.' },
    { title: 'Conciliación automática', desc: 'Comparación instantánea entre inventario físico y registros contables o ERP.' },
    { title: 'Control de movimientos', desc: 'Registro de entradas, salidas, traslados y asignaciones con trazabilidad completa.' },
    { title: 'Reportes configurables', desc: 'Exportación de reportes para auditoría, depreciación, y control de cumplimiento.' },
    { title: 'Integración con sistemas', desc: 'Conexión con SAP, Oracle, sistemas contables legacy via API y middleware HTK.' },
    { title: 'Alertas operativas', desc: 'Notificaciones de activos fuera de ubicación, vencimientos y mantenimientos pendientes.' },
  ];

  return (
    <>
      <section className="bg-surface-base pt-28 pb-20 border-b border-border-subtle">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-5">Plataforma</p>
              <h1 className="mb-5">Demo Tagventory</h1>
              <p className="text-[17px] text-ink-500 leading-relaxed mb-8">
                Agenda una demostración personalizada de Tagventory y ve cómo funciona con datos reales de tu industria. Sin compromisos.
              </p>
              <Link href="/diagnostico" className="inline-flex items-center gap-2 px-6 py-3 border border-ink-700 text-ink-700 text-sm font-medium rounded-btn hover:bg-surface-alt transition-colors">
                Solicitar diagnóstico
              </Link>
            </div>

            <div className="bg-surface-raised border border-border-subtle rounded-block overflow-hidden">
              <div className="bg-ink px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-white/10"></div>
                  <div className="w-3 h-3 rounded-full bg-white/10"></div>
                  <div className="w-3 h-3 rounded-full bg-white/10"></div>
                </div>
                <span className="text-xs text-white/40 ml-2">Tagventory — Dashboard</span>
              </div>
              <div className="p-5 bg-surface-alt">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: 'Total activos', value: '24,850', change: '+2.1%' },
                    { label: 'Conciliados', value: '24,120', change: '96.9%' },
                    { label: 'Sin ubicar', value: '730', change: '-5.2%' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-surface-raised border border-border-subtle rounded-card p-3">
                      <p className="text-xs text-ink-300 mb-1">{stat.label}</p>
                      <p className="text-lg font-medium text-ink">{stat.value}</p>
                      <p className="text-xs text-green-500">{stat.change}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-surface-raised border border-border-subtle rounded-card p-3">
                  <p className="text-xs font-medium text-ink-300 uppercase tracking-wider mb-3">Últimos movimientos</p>
                  {[
                    { activo: 'LAP-4821', evento: 'Asignado', usuario: 'A. García', hora: '10:32' },
                    { activo: 'SRV-0190', evento: 'Inventariado', usuario: 'Sistema', hora: '09:15' },
                    { activo: 'PRN-2204', evento: 'Traslado', usuario: 'M. López', hora: '08:47' },
                  ].map((m) => (
                    <div key={m.activo} className="flex items-center justify-between py-2 border-b border-border-subtle last:border-0 text-xs">
                      <span className="font-medium text-ink">{m.activo}</span>
                      <span className="text-brand">{m.evento}</span>
                      <span className="text-ink-300">{m.usuario}</span>
                      <span className="text-ink-300">{m.hora}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Lo que verás en la demo</p>
          <h2 className="mb-10">Funcionalidades de Tagventory</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="p-6 bg-surface-raised border border-border-subtle rounded-card">
                <h3 className="text-base font-medium text-ink mb-2">{f.title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-14 max-w-4xl">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Agenda tu demo</p>
              <h2 className="mb-4">Ve Tagventory en acción</h2>
              <p className="text-[17px] text-ink-500 mb-8">
                Una sesión de 30 minutos con datos de tu industria. Sin presentaciones genéricas.
              </p>

              {submitted ? (
                <div className="p-8 bg-surface-raised border border-border-subtle rounded-block text-center">
                  <div className="w-12 h-12 bg-green-50 border border-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#22C55E" strokeWidth="1.5">
                      <path d="M4 11l5 5 9-9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="mb-2">Solicitud recibida</h3>
                  <p className="text-sm text-ink-300">Te contactamos en 24 horas para agendar la sesión.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-ink-500 mb-2">Nombre *</label>
                      <input name="nombre" value={form.nombre} onChange={handleChange} required className="w-full px-4 py-2.5 bg-surface-base border border-border-subtle rounded-btn text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand transition-colors" placeholder="Tu nombre" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-ink-500 mb-2">Empresa *</label>
                      <input name="empresa" value={form.empresa} onChange={handleChange} required className="w-full px-4 py-2.5 bg-surface-base border border-border-subtle rounded-btn text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand transition-colors" placeholder="Tu empresa" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-500 mb-2">Email corporativo *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2.5 bg-surface-base border border-border-subtle rounded-btn text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand transition-colors" placeholder="tu@empresa.com" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-ink-500 mb-2">Cargo</label>
                      <input name="cargo" value={form.cargo} onChange={handleChange} className="w-full px-4 py-2.5 bg-surface-base border border-border-subtle rounded-btn text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand transition-colors" placeholder="Tu cargo" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-ink-500 mb-2">Número de activos</label>
                      <select name="activos" value={form.activos} onChange={handleChange} className="w-full px-4 py-2.5 bg-surface-base border border-border-subtle rounded-btn text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand transition-colors">
                        <option value="">Selecciona</option>
                        <option>Menos de 500</option>
                        <option>500 – 5,000</option>
                        <option>Más de 5,000</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="py-3.5 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors inline-flex items-center justify-center gap-2">
                    Agendar demo <ArrowRight />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
