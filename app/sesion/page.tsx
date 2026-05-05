'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 3l8 8M11 3l-8 8" strokeLinecap="round" />
    </svg>
  );
}

const queEsperar = [
  'Entendemos cómo gestionas tus activos hoy',
  'Identificamos puntos de pérdida o riesgo',
  'Analizamos tu nivel de control actual',
  'Te damos una recomendación clara de siguiente paso',
];

const paraQuien = [
  'Tienen operaciones con activos distribuidos',
  'Han tenido diferencias en inventarios',
  'Enfrentan auditorías o cumplimiento',
  'Necesitan mejorar control o disponibilidad',
  'Buscan automatizar procesos operativos',
];

const noIdeal = [
  'Empresas muy pequeñas sin complejidad operativa',
  'Quienes buscan solo una cotización rápida',
  'Operaciones sin activos distribuidos',
];

const cuandoAgendar = [
  'Ya identificas inconsistencias en tu operación',
  'Ya hiciste el autodiagnóstico',
  'Ya calculaste el impacto económico',
  'Necesitas claridad para tomar una decisión',
];

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

const tamanoOptions = [
  'Menos de 1,000 activos',
  '1,000 – 10,000 activos',
  'Más de 10,000 activos',
];

type FormState = 'idle' | 'sent';

export default function SesionPage() {
  const [form, setForm] = useState({
    nombre: '', empresa: '', cargo: '', email: '', telefono: '',
    motivo: '', tamano: '',
  });
  const [formState, setFormState] = useState<FormState>('idle');

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState('sent');
  }

  const isValid = form.nombre && form.empresa && form.email && form.motivo && form.tamano;

  return (
    <div className="min-h-screen bg-surface-base">
      <div className="pt-28" />

      {/* Hero */}
      <section className="bg-surface-base border-b border-border-subtle py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-5">Sesión de análisis</p>
              <h1 className="mb-5">Habla con un especialista y entiende qué está pasando en tu operación.</h1>
              <p className="text-[17px] text-ink-500 leading-relaxed mb-8 max-w-xl">
                Agenda una sesión donde revisamos tu contexto, identificamos riesgos y te damos claridad sobre cómo resolverlos.
              </p>
              <div className="flex items-center gap-6 text-sm text-ink-500">
                <div className="flex items-center gap-2">
                  <span className="text-brand">◷</span>
                  <span>30 – 45 minutos</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand">◎</span>
                  <span>Sin compromiso</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand">◈</span>
                  <span>100% enfocado en tu operación</span>
                </div>
              </div>
            </div>

            {/* Posicionamiento */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '❌', label: 'Demo de producto' },
                { icon: '❌', label: 'Llamada comercial' },
                { icon: '❌', label: 'Presentación genérica' },
                { icon: '✓', label: 'Sesión de análisis', highlight: true },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`p-4 rounded-card border text-sm font-medium flex items-center gap-3 ${
                    item.highlight
                      ? 'bg-brand-tint50 border-brand text-ink'
                      : 'bg-surface-raised border-border-subtle text-ink-300 line-through decoration-ink-300'
                  }`}
                >
                  <span className={item.highlight ? 'text-brand' : ''}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Qué esperar + Para quién */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-3 gap-8">

            <div className="p-6 bg-surface-raised border border-border-subtle rounded-block">
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Qué puedes esperar</p>
              <h3 className="text-base font-medium text-ink mb-5">En esta sesión</h3>
              <ul className="space-y-3">
                {queEsperar.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink-500">
                    <span className="mt-0.5 text-brand flex-shrink-0"><CheckIcon /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 bg-surface-raised border border-border-subtle rounded-block">
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Esta sesión es para ti si</p>
              <h3 className="text-base font-medium text-ink mb-5">Tu empresa:</h3>
              <ul className="space-y-3 mb-6">
                {paraQuien.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink-500">
                    <span className="mt-0.5 text-brand flex-shrink-0"><CheckIcon /></span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-border-subtle">
                <p className="text-xs font-medium text-ink-300 mb-3">No es ideal si:</p>
                <ul className="space-y-2">
                  {noIdeal.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-ink-300">
                      <span className="mt-0.5 flex-shrink-0"><XIcon /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-6 bg-surface-raised border border-border-subtle rounded-block">
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Cuándo agendar</p>
              <h3 className="text-base font-medium text-ink mb-5">Tiene sentido si ya:</h3>
              <ul className="space-y-3 mb-6">
                {cuandoAgendar.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink-500">
                    <span className="mt-0.5 text-brand flex-shrink-0"><CheckIcon /></span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-border-subtle space-y-2">
                <Link href="/recursos/autodiagnostico-control-activos" className="flex items-center justify-between p-3 bg-surface-alt rounded-card text-sm text-ink-500 hover:text-brand transition-colors group">
                  <span>Hacer el autodiagnóstico</span>
                  <ArrowRight size={12} />
                </Link>
                <Link href="/recursos/calculadora-roi-activos" className="flex items-center justify-between p-3 bg-surface-alt rounded-card text-sm text-ink-500 hover:text-brand transition-colors group">
                  <span>Calcular impacto económico</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sesión vs Diagnóstico */}
      <section className="bg-surface-base py-16">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Diferencia</p>
          <h2 className="mb-10">Sesión vs Diagnóstico</h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
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
                  {col.rows.map((row, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-ink-500">
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

      {/* Formulario de agendamiento */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Agenda tu sesión</p>
              <h2 className="mb-4">Cuéntanos un poco sobre tu operación</h2>
              <p className="text-[17px] text-ink-500 leading-relaxed mb-8">
                Nos permite preparar la sesión y enfocarnos en lo que más te ayuda desde el primer minuto.
              </p>

              {/* Clientes */}
              <div>
                <p className="text-xs font-medium text-ink-300 uppercase tracking-wider mb-4">Empresas que ya trabajaron con HTK</p>
                <div className="grid grid-cols-3 gap-3">
                  {clientes.map((c) => (
                    <div key={c.name} className="h-12 flex items-center justify-center bg-surface-raised border border-border-subtle rounded-card px-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                      {c.logo ? (
                        <Image src={c.logo} alt={c.name} width={80} height={32} className="object-contain h-6 w-auto max-w-full" />
                      ) : (
                        <span className="text-xs font-medium text-ink-300">{c.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-surface-raised border border-border-subtle rounded-block p-8">
              {formState === 'idle' ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-ink-500 mb-1">Nombre *</label>
                      <input required type="text" value={form.nombre} onChange={(e) => set('nombre', e.target.value)}
                        placeholder="Tu nombre"
                        className="w-full px-4 py-2.5 bg-surface-alt border border-border-subtle rounded-card text-sm text-ink focus:outline-none focus:border-brand transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-ink-500 mb-1">Empresa *</label>
                      <input required type="text" value={form.empresa} onChange={(e) => set('empresa', e.target.value)}
                        placeholder="Nombre de tu empresa"
                        className="w-full px-4 py-2.5 bg-surface-alt border border-border-subtle rounded-card text-sm text-ink focus:outline-none focus:border-brand transition-colors" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-ink-500 mb-1">Cargo</label>
                      <input type="text" value={form.cargo} onChange={(e) => set('cargo', e.target.value)}
                        placeholder="Tu cargo"
                        className="w-full px-4 py-2.5 bg-surface-alt border border-border-subtle rounded-card text-sm text-ink focus:outline-none focus:border-brand transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-ink-500 mb-1">Teléfono</label>
                      <input type="tel" value={form.telefono} onChange={(e) => set('telefono', e.target.value)}
                        placeholder="+52 55 0000 0000"
                        className="w-full px-4 py-2.5 bg-surface-alt border border-border-subtle rounded-card text-sm text-ink focus:outline-none focus:border-brand transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-ink-500 mb-1">Correo corporativo *</label>
                    <input required type="email" value={form.email} onChange={(e) => set('email', e.target.value)}
                      placeholder="tu@empresa.com"
                      className="w-full px-4 py-2.5 bg-surface-alt border border-border-subtle rounded-card text-sm text-ink focus:outline-none focus:border-brand transition-colors" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-ink-500 mb-2">¿Qué te gustaría resolver? *</label>
                    <div className="grid grid-cols-2 gap-2">
                      {motivoOptions.map((opt) => (
                        <button key={opt} type="button" onClick={() => set('motivo', opt)}
                          className={`text-left px-3 py-2.5 rounded-card border text-xs transition-all ${
                            form.motivo === opt
                              ? 'border-brand bg-brand-tint50 text-ink font-medium'
                              : 'border-border-subtle bg-surface-alt text-ink-500 hover:border-brand/40'
                          }`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-ink-500 mb-2">Tamaño de operación *</label>
                    <div className="flex flex-col gap-2">
                      {tamanoOptions.map((opt) => (
                        <button key={opt} type="button" onClick={() => set('tamano', opt)}
                          className={`text-left px-4 py-2.5 rounded-card border text-sm transition-all flex items-center gap-2 ${
                            form.tamano === opt
                              ? 'border-brand bg-brand-tint50 text-ink font-medium'
                              : 'border-border-subtle bg-surface-alt text-ink-500 hover:border-brand/40'
                          }`}>
                          <span className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 transition-all ${form.tamano === opt ? 'border-brand bg-brand' : 'border-ink-300'}`} />
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button type="submit" disabled={!isValid}
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium rounded-btn transition-all ${
                      isValid ? 'bg-brand text-surface-dark hover:bg-brand-hover' : 'bg-surface-alt text-ink-300 cursor-not-allowed'
                    }`}>
                    Agendar sesión de análisis <ArrowRight />
                  </button>
                  <p className="text-xs text-ink-300 text-center">Te confirmamos disponibilidad en menos de 24 horas.</p>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-brand-tint50 border border-brand-tint100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#F79A3F" strokeWidth="2">
                      <path d="M5 14l6 6L23 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-ink mb-3">Solicitud recibida, {form.nombre.split(' ')[0]}</h3>
                  <p className="text-[15px] text-ink-500 mb-2">
                    Un especialista de HTK revisará tu solicitud y te confirmará disponibilidad.
                  </p>
                  <p className="text-sm text-ink-300 mb-8">Te contactamos a <span className="font-medium text-ink">{form.email}</span> en menos de 24 horas.</p>
                  <div className="flex flex-col gap-3">
                    <Link href="/sesion"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors">
                      Ver qué es el diagnóstico <ArrowRight />
                    </Link>
                    <Link href="/casos-exito"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border-subtle text-ink-500 text-sm font-medium rounded-btn hover:bg-surface-alt transition-colors">
                      Ver casos de éxito
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-surface-dark py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10 text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Siguiente paso</p>
          <h2 className="text-white mb-4">Si ya identificaste el problema, el siguiente paso es entender cómo resolverlo.</h2>
          <p className="text-[17px] text-white/60 max-w-xl mx-auto mb-8">
            30 minutos con un especialista pueden dar más claridad que semanas de análisis interno.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#"
              onClick={(e) => { e.preventDefault(); document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors">
              Agendar sesión <ArrowRight />
            </a>
            <Link href="/sesion"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 text-white text-sm font-medium rounded-btn hover:bg-white/10 transition-colors">
              Ver diagnóstico
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
