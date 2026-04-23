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

export default function Contacto() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ nombre: '', empresa: '', email: '', telefono: '', asunto: '', mensaje: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="bg-surface-base pt-28 pb-20 border-b border-border-subtle">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="max-w-xl">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Contacto</p>
            <h1 className="mb-4">Hablemos de tu operación</h1>
            <p className="text-[17px] text-ink-500">Escríbenos directamente o agenda una llamada. Respondemos en 24 horas hábiles.</p>
          </div>
        </div>
      </section>

      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10 grid lg:grid-cols-5 gap-14">
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-surface-raised border border-border-subtle rounded-block p-12 text-center">
                <div className="w-14 h-14 bg-green-50 border border-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="1.5">
                    <path d="M4 12l5 5 11-11" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="mb-3">Mensaje recibido</h3>
                <p className="text-sm text-ink-500 mb-6">Te contactaremos en 24 horas hábiles.</p>
                <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors">
                  Volver al inicio <ArrowRight />
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-surface-raised border border-border-subtle rounded-block p-8 flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-ink-500 mb-2">Nombre *</label>
                    <input name="nombre" value={form.nombre} onChange={handleChange} required className="w-full px-4 py-2.5 bg-surface-base border border-border-subtle rounded-btn text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand transition-colors" placeholder="Tu nombre" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-500 mb-2">Empresa</label>
                    <input name="empresa" value={form.empresa} onChange={handleChange} className="w-full px-4 py-2.5 bg-surface-base border border-border-subtle rounded-btn text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand transition-colors" placeholder="Tu empresa" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-ink-500 mb-2">Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2.5 bg-surface-base border border-border-subtle rounded-btn text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand transition-colors" placeholder="tu@empresa.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-500 mb-2">Teléfono</label>
                    <input name="telefono" value={form.telefono} onChange={handleChange} className="w-full px-4 py-2.5 bg-surface-base border border-border-subtle rounded-btn text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand transition-colors" placeholder="+52 55 0000 0000" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-500 mb-2">Asunto</label>
                  <select name="asunto" value={form.asunto} onChange={handleChange} className="w-full px-4 py-2.5 bg-surface-base border border-border-subtle rounded-btn text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand transition-colors">
                    <option value="">Selecciona el motivo</option>
                    <option>Solicitar diagnóstico</option>
                    <option>Agendar demo Tagventory</option>
                    <option>Información sobre soluciones</option>
                    <option>Pregunta técnica</option>
                    <option>Alianzas o partnerships</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-500 mb-2">Mensaje *</label>
                  <textarea name="mensaje" value={form.mensaje} onChange={handleChange} required rows={5} className="w-full px-4 py-2.5 bg-surface-base border border-border-subtle rounded-card text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand transition-colors resize-none" placeholder="Cuéntanos cómo podemos ayudarte..." />
                </div>
                <button type="submit" className="w-full py-3.5 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors inline-flex items-center justify-center gap-2">
                  Enviar mensaje <ArrowRight />
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-surface-raised border border-border-subtle rounded-card p-6">
              <p className="text-xs font-medium tracking-widest uppercase text-ink-300 mb-5">Información de contacto</p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: 'M2 5l6 4.5L14 5M2 4h12v8H2z', label: 'Email', value: 'contacto@htk-id.com', href: 'mailto:contacto@htk-id.com' },
                  { icon: 'M3 3c.5-.5 1.5-.5 2 0l1.5 2c.3.5.2 1-.2 1.4L5.5 7.2c.7 1.4 1.9 2.6 3.3 3.3l.8-.8c.4-.4.9-.5 1.4-.2L13 11c.5.5.5 1.5 0 2l-.8.8c-1 1-4.2.5-7.3-2.7C1.8 7.8 1.3 4.5 3 3z', label: 'Teléfono', value: '+52 (55) 1234-5678', href: 'tel:+525512345678' },
                ].map((item) => (
                  <a key={item.label} href={item.href} className="flex items-center gap-3 text-sm text-ink-500 hover:text-brand transition-colors">
                    <div className="w-8 h-8 bg-surface-alt border border-border-subtle rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d={item.icon} strokeLinecap="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-ink-300">{item.label}</p>
                      <p className="text-sm font-medium">{item.value}</p>
                    </div>
                  </a>
                ))}
                <div className="flex items-start gap-3 text-sm text-ink-500">
                  <div className="w-8 h-8 bg-surface-alt border border-border-subtle rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M7 1.5C4.5 1.5 2.5 3.5 2.5 6c0 3.5 4.5 8 4.5 8s4.5-4.5 4.5-8c0-2.5-2-4.5-4.5-4.5z" strokeLinecap="round" /><circle cx="7" cy="6" r="1.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-ink-300">Oficinas</p>
                    <p className="text-sm font-medium">Ciudad de México, México</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-tint50 border border-brand-tint100 rounded-card p-6">
              <p className="text-xs font-medium text-brand uppercase tracking-wider mb-3">Respuesta rápida</p>
              <p className="text-sm font-medium text-ink mb-2">¿Necesitas diagnóstico?</p>
              <p className="text-sm text-ink-300 mb-4">Llena el formulario específico y te contactamos en 24h.</p>
              <Link href="/diagnostico" className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline">
                Ir a diagnóstico <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
