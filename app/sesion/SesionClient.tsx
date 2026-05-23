'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { pushEvent } from '@/lib/gtm';
import Link from 'next/link';
import Image from 'next/image';

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#F79A3F" strokeWidth="1.5">
      <path d="M2.5 7l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const clientes = [
  { name: 'Cinépolis',      logo: '/empresas/cinepolis-logo.webp' },
  { name: 'Grupo GIA',      logo: '/empresas/gia-logo.webp' },
  { name: 'ABC Querétaro',  logo: '/empresas/abc-technologies-logo.svg' },
  { name: 'Fresenius Kabi', logo: '/empresas/fresenius-kabi-logo.svg' },
  { name: 'XISOEM',         logo: '/empresas/xisoem-logo.webp' },
  { name: 'Vidrio Formas',  logo: '/empresas/vidrio-formas-logo.webp' },
];

const motivoOptions = [
  'Mis activos no coinciden con registros',
  'No sé dónde están mis activos',
  'No están disponibles cuando los necesito',
  'Problemas de auditoría o cumplimiento',
  'Quiero automatizar procesos',
  'Otro',
];

const activosOptions = [
  'Menos de 1,000',
  '1,000 – 10,000',
  '10,000 – 50,000',
  'Más de 50,000',
];

type FormState = 'idle' | 'loading' | 'sent' | 'error';

export default function SesionPage({ faqs = [] }: { faqs?: { question: string; answer: string }[] }) {
  const router = useRouter();
  const [form, setForm] = useState({ nombre: '', apellido: '', empresa: '', email: '', telefono: '', motivo: '', activos: '', comentarios: '' });
  const [formState, setFormState] = useState<FormState>('idle');

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState('loading');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        pushEvent({ event: 'lead_formulario_sesion' });
        router.push('/sesion/gracias');
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  }

  const isValid = form.nombre && form.apellido && form.empresa && form.email && form.motivo;

  return (
    <div className="min-h-screen bg-surface-base">
      <div className="pt-28" />

      {/* ── HERO + FORM ──────────────────────────────────────────────── */}
      <section id="formulario" className="bg-surface-base py-16 md:py-24">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left — propuesta de valor */}
            <div className="lg:pt-4">
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-5">Sesión de análisis · Sin costo</p>
              <h1 className="mb-5">
                Entiende qué está pasando en tu operación y cómo resolverlo.
              </h1>
              <p className="text-[17px] text-ink-500 leading-relaxed mb-10">
                Una conversación de 30 minutos con un especialista HTK para identificar riesgos, pérdidas y el siguiente paso concreto para tu operación.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  'Revisamos tu contexto operativo actual',
                  'Identificamos dónde estás perdiendo control',
                  'Te damos una recomendación clara de siguiente paso',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-ink-500">
                    <span className="mt-0.5 text-brand flex-shrink-0"><Check /></span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Prueba social */}
              <div>
                <p className="text-xs text-ink-300 uppercase tracking-wider mb-4">Ya confían en HTK</p>
                <div className="flex flex-wrap gap-3 items-center">
                  {clientes.map((c) => (
                    <div key={c.name} className="h-9 px-3 flex items-center justify-center bg-surface-raised border border-border-subtle rounded-card grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                      {c.logo ? (
                        <Image src={c.logo} alt={c.name} width={72} height={28} className="object-contain h-5 w-auto max-w-[72px]" />
                      ) : (
                        <span className="text-xs font-medium text-ink-300">{c.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — formulario */}
            <div className="bg-surface-raised border border-border-subtle rounded-block p-7 shadow-sm">
              {formState !== 'sent' ? (
                <>
                  <h2 className="text-lg font-medium text-ink mb-1">Agenda tu sesión</h2>
                  <p className="text-sm text-ink-300 mb-6">Te confirmamos disponibilidad en menos de 24 horas.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-ink-500 mb-1">Nombre *</label>
                        <input
                          required type="text" value={form.nombre}
                          onChange={(e) => set('nombre', e.target.value)}
                          placeholder="Tu nombre"
                          className="w-full px-3.5 py-2.5 bg-surface-alt border border-border-subtle rounded-card text-sm text-ink focus:outline-none focus:border-brand transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-ink-500 mb-1">Apellido *</label>
                        <input
                          required type="text" value={form.apellido}
                          onChange={(e) => set('apellido', e.target.value)}
                          placeholder="Tu apellido"
                          className="w-full px-3.5 py-2.5 bg-surface-alt border border-border-subtle rounded-card text-sm text-ink focus:outline-none focus:border-brand transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-ink-500 mb-1">Empresa *</label>
                      <input
                        required type="text" value={form.empresa}
                        onChange={(e) => set('empresa', e.target.value)}
                        placeholder="Tu empresa"
                        className="w-full px-3.5 py-2.5 bg-surface-alt border border-border-subtle rounded-card text-sm text-ink focus:outline-none focus:border-brand transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-ink-500 mb-1">Correo corporativo *</label>
                      <input
                        required type="email" value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                        placeholder="tu@empresa.com"
                        className="w-full px-3.5 py-2.5 bg-surface-alt border border-border-subtle rounded-card text-sm text-ink focus:outline-none focus:border-brand transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-ink-500 mb-1">Teléfono</label>
                      <input
                        type="tel" value={form.telefono}
                        onChange={(e) => set('telefono', e.target.value)}
                        placeholder="+52 55 0000 0000"
                        className="w-full px-3.5 py-2.5 bg-surface-alt border border-border-subtle rounded-card text-sm text-ink focus:outline-none focus:border-brand transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-ink-500 mb-1">¿Qué quieres resolver? *</label>
                      <select
                        required value={form.motivo}
                        onChange={(e) => set('motivo', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-surface-alt border border-border-subtle rounded-card text-sm text-ink focus:outline-none focus:border-brand transition-colors appearance-none"
                      >
                        <option value="" disabled>Selecciona una opción</option>
                        {motivoOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-ink-500 mb-1">N° de activos aproximado</label>
                      <select
                        value={form.activos}
                        onChange={(e) => set('activos', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-surface-alt border border-border-subtle rounded-card text-sm text-ink focus:outline-none focus:border-brand transition-colors appearance-none"
                      >
                        <option value="">Selecciona un rango (opcional)</option>
                        {activosOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-ink-500 mb-1">Comentarios adicionales</label>
                      <textarea
                        value={form.comentarios}
                        onChange={(e) => set('comentarios', e.target.value)}
                        placeholder="Cuéntanos más sobre tu operación o lo que necesitas..."
                        rows={3}
                        className="w-full px-3.5 py-2.5 bg-surface-alt border border-border-subtle rounded-card text-sm text-ink focus:outline-none focus:border-brand transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit" disabled={!isValid || formState === 'loading'}
                      className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium rounded-btn transition-all ${
                        isValid && formState !== 'loading' ? 'bg-brand text-surface-dark hover:bg-brand-hover' : 'bg-surface-alt text-ink-300 cursor-not-allowed'
                      }`}
                    >
                      {formState === 'loading' ? 'Enviando...' : <> Solicitar sesión <ArrowRight /> </>}
                    </button>

                    {formState === 'error' && (
                      <p className="text-xs text-red-500 text-center">
                        Hubo un problema al enviar. Intenta de nuevo o escríbenos a ventas@htk-id.com
                      </p>
                    )}

                    <p className="text-xs text-ink-300 text-center">
                      Sin compromiso · 30 minutos · 100% enfocado en tu operación
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-10">
                  <div className="w-14 h-14 bg-brand-tint50 border border-brand-tint100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#F79A3F" strokeWidth="2">
                      <path d="M4 13l6 6L22 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-ink mb-3">
                    Listo, {form.nombre.split(' ')[0]}
                  </h3>
                  <p className="text-sm text-ink-500 mb-1">
                    Un especialista HTK revisará tu solicitud.
                  </p>
                  <p className="text-sm text-ink-300 mb-8">
                    Te contactamos a <span className="font-medium text-ink">{form.email}</span> en menos de 24 horas.
                  </p>
                  <Link
                    href="/casos-exito"
                    className="inline-flex items-center gap-2 text-sm text-brand hover:gap-4 transition-all font-medium"
                  >
                    Ver casos de éxito mientras tanto <ArrowRight />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── REFUERZO ─────────────────────────────────────────────────── */}
      <section className="bg-surface-alt border-t border-border-subtle py-16">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
            {[
              { icon: '◷', label: '30 – 45 minutos', desc: 'Una conversación enfocada, no una presentación genérica' },
              { icon: '◎', label: 'Sin compromiso', desc: 'Saldrás con claridad, uses HTK o no' },
              { icon: '◈', label: 'Especialista real', desc: 'Hablas con alguien que conoce operaciones como la tuya' },
            ].map((item) => (
              <div key={item.label} className="p-6 bg-surface-raised border border-border-subtle rounded-card">
                <span className="text-2xl text-brand block mb-3">{item.icon}</span>
                <p className="text-sm font-medium text-ink mb-1">{item.label}</p>
                <p className="text-xs text-ink-300 leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARA QUIÉN ───────────────────────────────────────────────── */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-7 bg-surface-raised border border-border-subtle rounded-block">
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Esta sesión es para ti si</p>
              <h3 className="text-base font-medium text-ink mb-5">Tu empresa:</h3>
              <ul className="space-y-3">
                {[
                  'Tiene operaciones con activos distribuidos',
                  'Ha tenido diferencias en inventarios',
                  'Enfrenta auditorías o cumplimiento',
                  'Necesita mejorar control o disponibilidad',
                  'Busca automatizar procesos operativos',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-500">
                    <span className="mt-0.5 text-brand flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M2.5 7l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-7 bg-surface-raised border border-border-subtle rounded-block">
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Qué puedes esperar</p>
              <h3 className="text-base font-medium text-ink mb-5">En esta sesión:</h3>
              <ul className="space-y-3">
                {[
                  'Entendemos cómo gestionas tus activos hoy',
                  'Identificamos puntos de pérdida o riesgo',
                  'Analizamos tu nivel de control actual',
                  'Te damos una recomendación clara de siguiente paso',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-500">
                    <span className="mt-0.5 text-brand flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M2.5 7l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SESIÓN VS DIAGNÓSTICO ────────────────────────────────────── */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4 text-center">Diferencia</p>
          <h2 className="text-center mb-10">Sesión vs Diagnóstico</h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              {
                title: 'Sesión de análisis',
                tag: 'Este paso',
                highlight: true,
                rows: ['Conversación guiada', '30 – 45 minutos', 'Exploración inicial', 'Sin preparación extensa', 'Claridad y orientación'],
              },
              {
                title: 'Diagnóstico HTK',
                tag: 'Siguiente paso',
                highlight: false,
                rows: ['Evaluación estructurada', 'Proceso completo', 'Análisis profundo', 'Puede requerir información previa', 'Plan de acción concreto'],
              },
            ].map((col) => (
              <div
                key={col.title}
                className={`p-6 rounded-block border ${col.highlight ? 'bg-brand-tint50 border-brand' : 'bg-surface-raised border-border-subtle'}`}
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-base font-medium text-ink">{col.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${col.highlight ? 'bg-brand text-surface-dark' : 'bg-surface-alt text-ink-300 border border-border-subtle'}`}>
                    {col.tag}
                  </span>
                </div>
                <ul className="space-y-3">
                  {col.rows.map((row) => (
                    <li key={row} className="flex items-center gap-2 text-sm text-ink-500">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${col.highlight ? 'bg-brand' : 'bg-ink-300'}`} />
                      {row}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ─────────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <section className="bg-surface-alt py-20 border-t border-border-subtle">
          <div className="max-w-8xl mx-auto px-6 md:px-10 max-w-3xl mx-auto">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4 text-center">Preguntas frecuentes</p>
            <h2 className="text-center mb-10">Lo que suelen preguntar antes de agendar</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-surface-raised border border-border-subtle rounded-card p-6 cursor-pointer">
                  <summary className="flex items-center justify-between gap-4 text-sm font-medium text-ink list-none">
                    {faq.question}
                    <span className="flex-shrink-0 w-5 h-5 rounded-full border border-border-subtle flex items-center justify-center text-ink-300 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-sm text-ink-500 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RECURSOS PREVIOS ─────────────────────────────────────────── */}
      <section className="bg-surface-base py-16 border-t border-border-subtle">
        <div className="max-w-8xl mx-auto px-6 md:px-10 max-w-2xl mx-auto text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">¿Quieres ir preparado?</p>
          <h3 className="text-xl font-medium text-ink mb-2">Haz el diagnóstico antes de la sesión</h3>
          <p className="text-sm text-ink-300 mb-8">Tener contexto previo nos permite aprovechar mejor los 30 minutos juntos.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/recursos/autodiagnostico-control-activos" className="inline-flex items-center gap-2 px-5 py-2.5 border border-border-subtle text-ink-500 text-sm font-medium rounded-btn hover:border-brand hover:text-brand transition-colors">
              Autodiagnóstico <ArrowRight />
            </Link>
            <Link href="/recursos/calculadora-roi-activos" className="inline-flex items-center gap-2 px-5 py-2.5 border border-border-subtle text-ink-500 text-sm font-medium rounded-btn hover:border-brand hover:text-brand transition-colors">
              Calculadora ROI <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────── */}
      <section className="bg-surface-dark py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10 text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Siguiente paso</p>
          <h2 className="text-white mb-4">
            30 minutos pueden dar más claridad que semanas de análisis interno.
          </h2>
          <p className="text-[17px] text-white/60 max-w-xl mx-auto mb-8">
            Sin costo, sin compromiso. Solo claridad sobre qué está pasando en tu operación.
          </p>
          <a
            href="#formulario"
            onClick={(e) => { e.preventDefault(); document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
          >
            Agendar sesión gratuita <ArrowRight />
          </a>
        </div>
      </section>
    </div>
  );
}
