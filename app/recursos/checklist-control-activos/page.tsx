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

const blocks = [
  {
    id: 'conciliacion',
    label: 'Conciliación',
    title: '¿Tus activos coinciden con tus registros?',
    color: 'text-red-500',
    dot: 'bg-red-400',
    items: [
      'Existe un inventario actualizado de todos los activos',
      'Los activos coinciden con los registros financieros',
      'Las diferencias se investigan y resuelven',
      'Existe un proceso formal de conciliación',
      'Se validan altas y bajas correctamente',
    ],
  },
  {
    id: 'control',
    label: 'Control y visibilidad',
    title: '¿Sabes qué tienes y dónde está?',
    color: 'text-orange-500',
    dot: 'bg-orange-400',
    items: [
      'Todos los activos están identificados de forma única',
      'Se conoce la ubicación exacta de cada activo',
      'Hay visibilidad centralizada en una sola plataforma',
      'La información se puede consultar fácilmente',
      'Se actualiza cuando hay movimientos o cambios',
    ],
  },
  {
    id: 'responsabilidad',
    label: 'Responsabilidad',
    title: '¿Alguien es responsable de cada activo?',
    color: 'text-amber-500',
    dot: 'bg-amber-400',
    items: [
      'Cada activo tiene un responsable claramente asignado',
      'Existe registro formal de asignación',
      'Se valida en cambios de usuario o área',
      'Se controla la entrega y recepción de activos',
      'Se pueden auditar los responsables históricamente',
    ],
  },
  {
    id: 'disponibilidad',
    label: 'Disponibilidad',
    title: '¿Tus activos están cuando los necesitas?',
    color: 'text-green-600',
    dot: 'bg-green-500',
    items: [
      'Los activos están disponibles cuando se requieren',
      'No se pierde tiempo buscando equipos o herramientas',
      'No se hacen compras por falta de visibilidad',
      'Se conoce el estado operativo de cada activo',
      'Los activos se pueden redistribuir eficientemente',
    ],
  },
  {
    id: 'trazabilidad',
    label: 'Trazabilidad',
    title: '¿Puedes reconstruir qué ha pasado con un activo?',
    color: 'text-blue-600',
    dot: 'bg-blue-500',
    items: [
      'Existe historial de movimientos por activo',
      'Se registran cambios de ubicación y responsable',
      'Se pueden identificar anomalías o inconsistencias',
      'Hay trazabilidad completa del ciclo de vida',
      'Se pueden realizar auditorías con evidencia',
    ],
  },
  {
    id: 'automatizacion',
    label: 'Automatización',
    title: '¿Tu operación es manual o automatizada?',
    color: 'text-purple-600',
    dot: 'bg-purple-500',
    items: [
      'Los procesos no dependen de Excel o papel',
      'Hay automatización en inventarios y validaciones',
      'La información se actualiza en tiempo real',
      'No depende de captura manual constante',
      'Existe integración entre sistemas operativos',
    ],
  },
];

const totalItems = blocks.reduce((acc, b) => acc + b.items.length, 0);

type FormState = 'idle' | 'sent';

export default function ChecklistPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [formState, setFormState] = useState<FormState>('idle');
  const [form, setForm] = useState({ nombre: '', empresa: '', email: '' });

  const score = checked.size;
  const pct = Math.round((score / totalItems) * 100);

  const level = pct >= 80 ? 'alto' : pct >= 50 ? 'medio' : 'bajo';
  const levelData = {
    alto:  { label: 'Alto control',  dot: 'bg-green-500', color: 'text-green-600', text: 'Operación estructurada con oportunidades de optimización.', perdida: 'bajo' },
    medio: { label: 'Control medio', dot: 'bg-amber-400', color: 'text-amber-500', text: 'Existen inconsistencias que pueden generar pérdidas operativas y económicas.', perdida: 'medio' },
    bajo:  { label: 'Bajo control',  dot: 'bg-red-500',   color: 'text-red-500',   text: 'Alta probabilidad de pérdidas, ineficiencia y riesgo operativo.', perdida: 'bajo' },
  }[level];

  function toggle(key: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState('sent');
  }

  return (
    <div className="min-h-screen bg-surface-base">
      <div className="pt-28" />

      {/* Hero */}
      <section className="bg-surface-base border-b border-border-subtle py-16">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-2 mb-5">
            <Link href="/" className="text-xs text-ink-300 hover:text-brand transition-colors">Inicio</Link>
            <span className="text-ink-300 text-xs">/</span>
            <span className="text-xs text-ink-300">Recursos</span>
            <span className="text-ink-300 text-xs">/</span>
            <span className="text-xs text-brand">Checklist</span>
          </div>
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Checklist de control</p>
            <h1 className="mb-4">¿Tienes control real sobre tus activos?</h1>
            <p className="text-[17px] text-ink-500 leading-relaxed">
              Valida en minutos si tu operación está bajo control o si estás perdiendo visibilidad, dinero o eficiencia.
            </p>
          </div>
        </div>
      </section>

      {/* Checklist + Results */}
      <section className="max-w-8xl mx-auto px-6 md:px-10 py-16">
        <div className="grid lg:grid-cols-3 gap-10 items-start">

          {/* Checklist */}
          <div className="lg:col-span-2 space-y-8">
            {blocks.map((block) => (
              <div key={block.id} className="p-6 bg-surface-raised border border-border-subtle rounded-block">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${block.dot}`} />
                  <span className={`text-xs font-medium uppercase tracking-wider ${block.color}`}>{block.label}</span>
                </div>
                <h3 className="text-base font-medium text-ink mb-5">{block.title}</h3>
                <div className="space-y-3">
                  {block.items.map((item, idx) => {
                    const key = `${block.id}-${idx}`;
                    const isChecked = checked.has(key);
                    return (
                      <label
                        key={key}
                        className="flex items-start gap-3 cursor-pointer group"
                      >
                        <div
                          onClick={() => toggle(key)}
                          className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                            isChecked ? 'bg-brand border-brand' : 'border-ink-300 group-hover:border-brand/60'
                          }`}
                        >
                          {isChecked && (
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="white" strokeWidth="2">
                              <path d="M2 5.5l2.5 2.5 4.5-4.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <span
                          onClick={() => toggle(key)}
                          className={`text-sm leading-relaxed transition-colors ${isChecked ? 'text-ink line-through decoration-ink-300' : 'text-ink-500 group-hover:text-ink'}`}
                        >
                          {item}
                        </span>
                      </label>
                    );
                  })}
                </div>
                {/* Block mini-progress */}
                <div className="mt-5 pt-4 border-t border-border-subtle">
                  <div className="flex justify-between text-xs text-ink-300 mb-1.5">
                    <span>{block.items.filter((_, i) => checked.has(`${block.id}-${i}`)).length} / {block.items.length} completados</span>
                    <span>{Math.round((block.items.filter((_, i) => checked.has(`${block.id}-${i}`)).length / block.items.length) * 100)}%</span>
                  </div>
                  <div className="h-1 bg-surface-alt rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand rounded-full transition-all duration-300"
                      style={{ width: `${(block.items.filter((_, i) => checked.has(`${block.id}-${i}`)).length / block.items.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Results sidebar — sticky */}
          <div className="sticky top-28 space-y-4">

            {/* Progress global */}
            <div className="p-6 bg-surface-raised border border-border-subtle rounded-block">
              <p className="text-xs font-medium text-ink-300 uppercase tracking-wider mb-4">Tu progreso</p>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-4xl font-semibold text-ink">{pct}%</span>
                <span className="text-sm text-ink-300 mb-1">{score} / {totalItems} puntos</span>
              </div>
              <div className="h-2 bg-surface-alt rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-brand rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>

              {score > 0 && (
                <div className="pt-4 border-t border-border-subtle">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${levelData.dot}`} />
                    <span className="text-sm font-medium text-ink">{levelData.label}</span>
                  </div>
                  <p className="text-sm text-ink-500 leading-snug">{levelData.text}</p>
                </div>
              )}
            </div>

            {/* Bloques individuales */}
            <div className="p-5 bg-surface-raised border border-border-subtle rounded-card">
              <p className="text-xs font-medium text-ink-300 uppercase tracking-wider mb-4">Por área</p>
              <div className="space-y-2.5">
                {blocks.map((block) => {
                  const blockScore = block.items.filter((_, i) => checked.has(`${block.id}-${i}`)).length;
                  const blockPct = Math.round((blockScore / block.items.length) * 100);
                  return (
                    <div key={block.id}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-ink-500">{block.label}</span>
                        <span className="text-ink-300">{blockScore}/{block.items.length}</span>
                      </div>
                      <div className="h-1 bg-surface-alt rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-300 ${block.dot}`} style={{ width: `${blockPct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTAs */}
            {score > 0 && (
              <div className="space-y-2">
                <Link
                  href={`/recursos/calculadora-roi-activos?nivel=${level}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
                >
                  Calcular impacto económico <ArrowRight />
                </Link>
                <Link
                  href="/sesion"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 border border-ink-700 text-ink-700 text-sm font-medium rounded-btn hover:bg-surface-alt transition-colors"
                >
                  Solicitar diagnóstico
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interpretación */}
      <section className="bg-surface-alt py-16">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Interpretación</p>
              <h2 className="mb-4">¿Qué significa este resultado?</h2>
              <p className="text-[17px] text-ink-500 leading-relaxed">
                La falta de control en activos no solo implica desorden operativo. También se traduce en pérdidas económicas concretas y medibles.
              </p>
            </div>
            <div className="space-y-3">
              {['Pérdidas económicas directas', 'Compras innecesarias por falta de visibilidad', 'Tiempo perdido buscando activos', 'Errores operativos recurrentes', 'Riesgos en auditorías y cumplimiento', 'Menor eficiencia del equipo'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-surface-raised border border-border-subtle rounded-card">
                  <span className="text-brand">·</span>
                  <span className="text-sm text-ink-500">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Descargable */}
      <section className="bg-surface-base py-16">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Versión descargable</p>
              <h2 className="mb-4">Descarga el checklist completo</h2>
              <p className="text-[17px] text-ink-500 leading-relaxed mb-6">
                Lleva el checklist a tu equipo en formato PDF. Incluye todos los bloques, explicación de resultados y recomendaciones.
              </p>
              <ul className="space-y-2">
                {['Checklist completo imprimible', 'Explicación de cada bloque', 'Interpretación de resultados', 'Recomendaciones por nivel de control'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-ink-500">
                    <span className="text-brand">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 bg-surface-raised border border-border-subtle rounded-block">
              {formState === 'idle' ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-base font-medium text-ink mb-2">Recibe el PDF en tu correo</h3>
                  <div>
                    <label className="block text-xs font-medium text-ink-500 mb-1">Nombre</label>
                    <input
                      required
                      type="text"
                      value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      placeholder="Tu nombre"
                      className="w-full px-4 py-2.5 bg-surface-alt border border-border-subtle rounded-card text-sm text-ink focus:outline-none focus:border-brand transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-500 mb-1">Empresa</label>
                    <input
                      required
                      type="text"
                      value={form.empresa}
                      onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                      placeholder="Nombre de tu empresa"
                      className="w-full px-4 py-2.5 bg-surface-alt border border-border-subtle rounded-card text-sm text-ink focus:outline-none focus:border-brand transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-500 mb-1">Correo electrónico</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="tu@empresa.com"
                      className="w-full px-4 py-2.5 bg-surface-alt border border-border-subtle rounded-card text-sm text-ink focus:outline-none focus:border-brand transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
                  >
                    Descargar checklist PDF <ArrowRight />
                  </button>
                  <p className="text-xs text-ink-300 text-center">Sin spam. Solo el recurso que pediste.</p>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-brand-tint50 border border-brand-tint100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F79A3F" strokeWidth="2">
                      <path d="M5 12l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-base font-medium text-ink mb-2">¡Listo, {form.nombre.split(' ')[0]}!</h3>
                  <p className="text-sm text-ink-500 mb-6">Te enviamos el checklist a <span className="font-medium text-ink">{form.email}</span></p>
                  <Link
                    href="/sesion"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
                  >
                    Solicitar diagnóstico <ArrowRight />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Otros recursos */}
      <section className="bg-surface-base border-t border-border-subtle py-12">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-6 text-center">Otros recursos</p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            <Link
              href="/recursos/autodiagnostico-control-activos"
              className="group flex items-center justify-between p-4 bg-surface-alt border border-border-subtle rounded-card hover:border-brand/40 hover:shadow-sm transition-all"
            >
              <div>
                <p className="text-sm font-medium text-ink mb-0.5">Autodiagnóstico</p>
                <p className="text-xs text-ink-300">Descubre tu nivel de control</p>
              </div>
              <ArrowRight />
            </Link>
            <Link
              href="/recursos/calculadora-roi-activos"
              className="group flex items-center justify-between p-4 bg-surface-alt border border-border-subtle rounded-card hover:border-brand/40 hover:shadow-sm transition-all"
            >
              <div>
                <p className="text-sm font-medium text-ink mb-0.5">Calculadora ROI</p>
                <p className="text-xs text-ink-300">Estima el impacto económico</p>
              </div>
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-surface-dark py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10 text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">¿Quieres saber cuánto te está costando?</p>
          <h2 className="text-white mb-8">Calcula el impacto económico de tu nivel de control.</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/recursos/calculadora-roi-activos"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
            >
              Calcular impacto económico <ArrowRight />
            </Link>
            <Link
              href="/sesion"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 text-white text-sm font-medium rounded-btn hover:bg-white/10 transition-colors"
            >
              Solicitar diagnóstico
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
