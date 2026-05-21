'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type ControlLevel = 'bajo' | 'medio' | 'alto';
type AssetType = 'oficina' | 'electronico' | 'herramienta' | 'maquinaria' | 'medico' | 'logistico';

const assetTypes: { id: AssetType; label: string; valueMultiplier: number }[] = [
  { id: 'oficina',      label: 'Mobiliario y equipo de oficina', valueMultiplier: 8000 },
  { id: 'electronico',  label: 'Equipos electrónicos',           valueMultiplier: 25000 },
  { id: 'herramienta',  label: 'Herramientas',                   valueMultiplier: 15000 },
  { id: 'maquinaria',   label: 'Maquinaria',                     valueMultiplier: 120000 },
  { id: 'medico',       label: 'Equipo médico',                  valueMultiplier: 80000 },
  { id: 'logistico',    label: 'Activos logísticos / retornables', valueMultiplier: 12000 },
];

const controlLevels: { id: ControlLevel; label: string; desc: string; lossMin: number; lossMax: number; dot: string }[] = [
  { id: 'bajo',  label: 'Bajo control',  dot: 'bg-red-500',   desc: 'Procesos manuales, poca visibilidad, inconsistencias frecuentes', lossMin: 0.10, lossMax: 0.12 },
  { id: 'medio', label: 'Control medio', dot: 'bg-amber-400', desc: 'Procesos definidos parcialmente, algunas inconsistencias',        lossMin: 0.07, lossMax: 0.09 },
  { id: 'alto',  label: 'Alto control',  dot: 'bg-green-500', desc: 'Operación estructurada, buena visibilidad',                       lossMin: 0.04, lossMax: 0.06 },
];

const relatedCases = [
  { client: 'Cinépolis',    concept: 'Conciliación de activos',  slug: 'cinepolis',      metric: '+90%', metricLabel: 'reducción en auditoría' },
  { client: 'Grupo GIA',   concept: 'Disponibilidad de activos', slug: 'grupo-gia',      metric: '100%', metricLabel: 'disponibilidad' },
  { client: 'ABC Querétaro', concept: 'Automatización logística', slug: 'abc-queretaro', metric: '0',    metricLabel: 'recompras no planeadas' },
];

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString('es-MX');
}

function CalculadoraInner() {
  const searchParams = useSearchParams();
  const preLevel = searchParams.get('nivel') as ControlLevel | null;

  const [numAssets, setNumAssets] = useState<string>('500');
  const [selectedTypes, setSelectedTypes] = useState<AssetType[]>(['electronico']);
  const [controlLevel, setControlLevel] = useState<ControlLevel>(preLevel ?? 'medio');
  const [showResults, setShowResults] = useState(false);

  // Derived calculations
  const avgValue = useCallback(() => {
    if (selectedTypes.length === 0) return 15000;
    const total = selectedTypes.reduce((acc, id) => {
      const t = assetTypes.find((a) => a.id === id);
      return acc + (t?.valueMultiplier ?? 15000);
    }, 0);
    return total / selectedTypes.length;
  }, [selectedTypes]);

  const totalAssets = Math.max(1, parseInt(numAssets.replace(/\D/g, '') || '0', 10));
  const totalValue = totalAssets * avgValue();

  const lvl = controlLevels.find((l) => l.id === controlLevel)!;
  const lossMin = totalValue * lvl.lossMin;
  const lossMax = totalValue * lvl.lossMax;
  const lossMid = (lossMin + lossMax) / 2;

  const recoveryMin = lossMid * 0.40;
  const recoveryMax = lossMid * 0.70;

  const optimizationCurrent = controlLevel === 'alto' ? 70 : controlLevel === 'medio' ? 45 : 20;
  const optimizationPotential = Math.min(optimizationCurrent + 40, 95);

  function toggleType(id: AssetType) {
    setSelectedTypes((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((t) => t !== id) : prev) : [...prev, id]
    );
  }

  useEffect(() => {
    if (numAssets && selectedTypes.length > 0) setShowResults(true);
  }, [numAssets, selectedTypes, controlLevel]);

  return (
    <div className="min-h-screen bg-surface-base">
      <div className="pt-28" />

      {/* Hero */}
      <section className="max-w-8xl mx-auto px-6 md:px-10 py-12 border-b border-border-subtle">
        <div className="flex items-center gap-2 mb-5">
          <Link href="/" className="text-xs text-ink-300 hover:text-brand transition-colors">Inicio</Link>
          <span className="text-ink-300 text-xs">/</span>
          <span className="text-xs text-ink-300">Recursos</span>
          <span className="text-ink-300 text-xs">/</span>
          <span className="text-xs text-brand">Calculadora ROI</span>
        </div>
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Calculadora de impacto</p>
          <h1 className="mb-4">¿Cuánto estás perdiendo hoy… y cuánto podrías recuperar?</h1>
          <p className="text-[17px] text-ink-500 leading-relaxed">
            Calcula el impacto económico de la falta de control en tus activos y el retorno potencial de resolverlo.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="max-w-8xl mx-auto px-6 md:px-10 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* LEFT — Inputs */}
          <div className="space-y-8">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-1">Configura tu operación</p>
              <h2 className="text-xl font-medium text-ink">Cuéntanos sobre tus activos</h2>
            </div>

            {/* Input 1 — Número de activos */}
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Número total de activos</label>
              <p className="text-xs text-ink-300 mb-3">Incluye equipos, herramientas, maquinaria, mobiliario, etc.</p>
              <input
                type="number"
                min="1"
                value={numAssets}
                onChange={(e) => setNumAssets(e.target.value)}
                className="w-full px-4 py-3 bg-surface-raised border border-border-subtle rounded-card text-ink text-lg font-medium focus:outline-none focus:border-brand transition-colors"
                placeholder="500"
              />
            </div>

            {/* Input 2 — Tipo de activos */}
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Tipo de activos</label>
              <p className="text-xs text-ink-300 mb-3">Selecciona uno o más tipos (puedes elegir varios)</p>
              <div className="grid grid-cols-2 gap-2">
                {assetTypes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => toggleType(t.id)}
                    className={`text-left px-4 py-3 rounded-card border text-sm transition-all ${
                      selectedTypes.includes(t.id)
                        ? 'border-brand bg-brand-tint50 text-ink font-medium'
                        : 'border-border-subtle bg-surface-raised text-ink-500 hover:border-brand/40'
                    }`}
                  >
                    <span className={`inline-block w-3 h-3 rounded-sm border mr-2 align-middle transition-all ${
                      selectedTypes.includes(t.id) ? 'bg-brand border-brand' : 'border-ink-300'
                    }`} />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 3 — Nivel de control */}
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Nivel de control actual</label>
              {preLevel && (
                <p className="text-xs text-brand mb-3">✓ Nivel precargado desde tu autodiagnóstico</p>
              )}
              <div className="flex flex-col gap-2">
                {controlLevels.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setControlLevel(l.id)}
                    className={`text-left px-4 py-3.5 rounded-card border transition-all ${
                      controlLevel === l.id
                        ? 'border-brand bg-brand-tint50'
                        : 'border-border-subtle bg-surface-raised hover:border-brand/40'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`w-2 h-2 rounded-full ${l.dot}`} />
                      <span className="text-sm font-medium text-ink">{l.label}</span>
                    </div>
                    <p className="text-xs text-ink-300 ml-4">{l.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Results */}
          <div className={`transition-all duration-500 ${showResults ? 'opacity-100' : 'opacity-0'}`}>
            <div className="sticky top-28 space-y-4">

              {/* Valor estimado */}
              <div className="p-5 bg-surface-raised border border-border-subtle rounded-card">
                <p className="text-xs font-medium text-ink-300 uppercase tracking-wider mb-1">Valor estimado de tus activos</p>
                <p className="text-2xl font-semibold text-ink">{fmt(totalValue)}</p>
              </div>

              {/* Pérdida — principal */}
              <div className="p-6 bg-surface-dark rounded-block">
                <p className="text-xs font-medium text-brand uppercase tracking-wider mb-2">Podrías estar perdiendo</p>
                <p className="text-4xl font-bold text-white mb-1">
                  {fmt(lossMin)} – {fmt(lossMax)}
                </p>
                <p className="text-sm text-white/50">al año por falta de control</p>
              </div>

              {/* Recuperación */}
              <div className="p-5 bg-surface-raised border border-border-subtle rounded-card">
                <p className="text-xs font-medium text-ink-300 uppercase tracking-wider mb-1">Recuperación potencial con HTK</p>
                <p className="text-2xl font-semibold text-green-600">{fmt(recoveryMin)} – {fmt(recoveryMax)}</p>
                <p className="text-xs text-ink-300 mt-1">40% – 70% de recuperación estimada</p>
              </div>

              {/* ROI timeline */}
              <div className="p-5 bg-surface-raised border border-border-subtle rounded-card">
                <p className="text-xs font-medium text-ink-300 uppercase tracking-wider mb-1">Retorno estimado</p>
                <p className="text-2xl font-semibold text-brand">8 – 12 meses</p>
                <p className="text-xs text-ink-300 mt-1">tiempo estimado de retorno sobre inversión</p>
              </div>

              {/* Gauge */}
              <div className="p-5 bg-surface-raised border border-border-subtle rounded-card">
                <p className="text-xs font-medium text-ink-300 uppercase tracking-wider mb-4">Nivel de optimización</p>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-ink-300 mb-1">
                      <span>Actual</span>
                      <span>{optimizationCurrent}%</span>
                    </div>
                    <div className="h-2 bg-surface-alt rounded-full overflow-hidden">
                      <div className="h-full bg-ink-300 rounded-full transition-all duration-700" style={{ width: `${optimizationCurrent}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-brand mb-1">
                      <span>Potencial con HTK</span>
                      <span>{optimizationPotential}%</span>
                    </div>
                    <div className="h-2 bg-brand-tint100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand rounded-full transition-all duration-700" style={{ width: `${optimizationPotential}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/sesion"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
              >
                Agendar sesión gratuita <ArrowRight />
              </Link>
              <p className="text-xs text-center text-ink-300">El diagnóstico confirma si estos números aplican a tu operación.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ¿De dónde sale el número? */}
      <section className="bg-surface-alt py-16">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Metodología</p>
              <h2 className="mb-4">¿De dónde sale este número?</h2>
              <p className="text-[17px] text-ink-500 leading-relaxed">
                Este cálculo considera las pérdidas más comunes en operaciones con bajo control de activos, validadas en proyectos reales de HTK.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['Extravío o robo', 'Compras innecesarias', 'Falta de mantenimiento', 'Reducción de vida útil', 'Tiempos muertos por falta de disponibilidad', 'Errores operativos', 'Problemas de auditoría o cumplimiento', 'Seguros mal asignados'].map((f, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-surface-raised border border-border-subtle rounded-card">
                  <span className="text-brand text-sm flex-shrink-0">·</span>
                  <span className="text-sm text-ink-500">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Casos relacionados */}
      <section className="bg-surface-base py-16">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Validado en campo</p>
          <h2 className="mb-8">Empresas que ya recuperaron el control</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {relatedCases.map((c) => (
              <Link
                key={c.slug}
                href={`/casos-exito/${c.slug}`}
                className="group p-5 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
              >
                <p className="text-2xl font-semibold text-brand mb-1">{c.metric}</p>
                <p className="text-xs text-ink-300 mb-3">{c.metricLabel}</p>
                <p className="text-sm font-medium text-ink mb-1">{c.client}</p>
                <p className="text-xs text-ink-300 mb-4">{c.concept}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand group-hover:gap-3 transition-all">
                  Ver caso <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
          <Link href="/casos-exito" className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:gap-4 transition-all">
            Ver todos los casos de éxito <ArrowRight />
          </Link>
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
              href="/recursos/checklist-control-activos"
              className="group flex items-center justify-between p-4 bg-surface-alt border border-border-subtle rounded-card hover:border-brand/40 hover:shadow-sm transition-all"
            >
              <div>
                <p className="text-sm font-medium text-ink mb-0.5">Checklist</p>
                <p className="text-xs text-ink-300">30 puntos de control a revisar</p>
              </div>
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-surface-dark py-24">
        <div className="max-w-8xl mx-auto px-6 md:px-10 text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Siguiente paso</p>
          <h2 className="text-white mb-4">Ahora que sabes el impacto, el siguiente paso es entender por qué ocurre.</h2>
          <p className="text-[17px] text-white/60 max-w-xl mx-auto mb-8">
            Un diagnóstico confirma si estas estimaciones aplican a tu operación y define el plan concreto para recuperarlas.
          </p>
          <Link
            href="/sesion"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
          >
            Agendar sesión gratuita <ArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function CalculadoraPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-base pt-28 flex items-center justify-center"><p className="text-ink-300">Cargando calculadora…</p></div>}>
      <CalculadoraInner />
    </Suspense>
  );
}
