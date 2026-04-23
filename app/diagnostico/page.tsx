'use client';

import { useState } from 'react';
import Link from 'next/link';
import { icps, industries } from '@/data/content';

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 8l4 4 6-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Diagnostico() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nombre: '', empresa: '', cargo: '', email: '',
    telefono: '', industria: '', problema: '', activos: '', mensaje: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="min-h-screen bg-surface-base flex items-center justify-center pt-20">
        <div className="max-w-lg text-center px-6">
          <div className="w-16 h-16 bg-green-50 border border-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#22C55E" strokeWidth="1.5">
              <path d="M5 14l6 6 12-12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-3">Solicitud recibida</p>
          <h2 className="mb-4">Hemos recibido tu solicitud</h2>
          <p className="text-[17px] text-ink-500 mb-8">
            Un especialista HTK se pondrá en contacto contigo en un plazo de 24 horas hábiles para coordinar el diagnóstico.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors">
              Volver al inicio <ArrowRight />
            </Link>
            <Link href="/recursos/calculadora-perdidas-activos" className="inline-flex items-center gap-2 px-6 py-3 border border-ink-700 text-ink-700 text-sm font-medium rounded-btn hover:bg-surface-alt transition-colors">
              Ver calculadora de pérdidas
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-surface-base pt-28 pb-20 border-b border-border-subtle">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Diagnóstico gratuito</p>
            <h1 className="mb-4">Solicita tu diagnóstico de control de activos</h1>
            <p className="text-[17px] text-ink-500 leading-relaxed">
              En 45 minutos identificamos dónde están los riesgos, pérdidas e ineficiencias en el control de activos de tu empresa.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-5 gap-14 items-start">
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="bg-surface-raised border border-border-subtle rounded-block p-8 flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-ink-500 mb-2">Nombre completo *</label>
                    <input name="nombre" value={form.nombre} onChange={handleChange} required className="w-full px-4 py-2.5 bg-surface-base border border-border-subtle rounded-btn text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors" placeholder="Tu nombre" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-500 mb-2">Empresa *</label>
                    <input name="empresa" value={form.empresa} onChange={handleChange} required className="w-full px-4 py-2.5 bg-surface-base border border-border-subtle rounded-btn text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors" placeholder="Nombre de tu empresa" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-ink-500 mb-2">Cargo *</label>
                    <input name="cargo" value={form.cargo} onChange={handleChange} required className="w-full px-4 py-2.5 bg-surface-base border border-border-subtle rounded-btn text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors" placeholder="Director, Gerente..." />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-500 mb-2">Email corporativo *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2.5 bg-surface-base border border-border-subtle rounded-btn text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors" placeholder="tu@empresa.com" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-ink-500 mb-2">Teléfono</label>
                    <input name="telefono" value={form.telefono} onChange={handleChange} className="w-full px-4 py-2.5 bg-surface-base border border-border-subtle rounded-btn text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors" placeholder="+52 55 0000 0000" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-500 mb-2">Industria</label>
                    <select name="industria" value={form.industria} onChange={handleChange} className="w-full px-4 py-2.5 bg-surface-base border border-border-subtle rounded-btn text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors">
                      <option value="">Selecciona tu sector</option>
                      {industries.map((i) => (<option key={i.slug} value={i.slug}>{i.title}</option>))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-ink-500 mb-2">Problema principal</label>
                  <select name="problema" value={form.problema} onChange={handleChange} className="w-full px-4 py-2.5 bg-surface-base border border-border-subtle rounded-btn text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors">
                    <option value="">¿Cuál es tu mayor desafío?</option>
                    {icps.map((i) => (<option key={i.slug} value={i.slug}>{i.headline}</option>))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-ink-500 mb-2">Número aproximado de activos</label>
                  <select name="activos" value={form.activos} onChange={handleChange} className="w-full px-4 py-2.5 bg-surface-base border border-border-subtle rounded-btn text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors">
                    <option value="">Selecciona un rango</option>
                    <option>Menos de 500</option>
                    <option>500 – 2,000</option>
                    <option>2,000 – 10,000</option>
                    <option>10,000 – 50,000</option>
                    <option>Más de 50,000</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-ink-500 mb-2">Contexto adicional</label>
                  <textarea name="mensaje" value={form.mensaje} onChange={handleChange} rows={4} className="w-full px-4 py-2.5 bg-surface-base border border-border-subtle rounded-card text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors resize-none" placeholder="Cuéntanos más sobre tu situación actual..." />
                </div>

                <button type="submit" className="w-full py-3.5 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors inline-flex items-center justify-center gap-2">
                  Solicitar diagnóstico gratuito <ArrowRight />
                </button>

                <p className="text-xs text-ink-300 text-center">
                  Al enviar aceptas nuestra{' '}
                  <Link href="/aviso-de-privacidad" className="text-brand hover:underline">política de privacidad</Link>.
                  Sin spam ni compromisos.
                </p>
              </form>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-6">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Qué incluye el diagnóstico</p>
                <div className="flex flex-col gap-4">
                  {[
                    'Análisis de tu situación actual en 45 minutos',
                    'Identificación de riesgos y pérdidas por activos no controlados',
                    'Recomendación de capacidades y tecnologías aplicables',
                    'Estimación de ROI y tiempos de implementación',
                    'Sin costo y sin compromiso de contratación',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-brand-tint50 border border-brand-tint100 flex items-center justify-center flex-shrink-0 mt-0.5 text-brand">
                        <CheckIcon />
                      </span>
                      <span className="text-sm text-ink-500 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-surface-raised border border-border-subtle rounded-card">
                <p className="text-xs font-medium tracking-widest uppercase text-ink-300 mb-4">También disponible</p>
                <Link href="/demo-tagventory" className="flex items-center justify-between group hover:text-brand transition-colors">
                  <div>
                    <p className="text-sm font-medium text-ink mb-1">Demo Tagventory</p>
                    <p className="text-xs text-ink-300">Ve la plataforma en acción con datos reales</p>
                  </div>
                  <span className="text-brand opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4">
                    <ArrowRight />
                  </span>
                </Link>
              </div>

              <div className="p-6 bg-brand-tint50 border border-brand-tint100 rounded-card">
                <p className="text-xs font-medium text-brand uppercase tracking-wider mb-3">Empresas que confiaron en HTK</p>
                <div className="flex flex-wrap gap-2">
                  {['Cinépolis', 'Palacio de Hierro', 'DHL', 'MetLife', 'ZEISS', 'Marelli'].map((c) => (
                    <span key={c} className="text-xs font-medium text-ink-500 border border-border-subtle bg-surface-raised px-2 py-1 rounded-full">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
