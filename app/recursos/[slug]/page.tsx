'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Calculadora() {
  const [values, setValues] = useState({ activos: 1000, perdida: 3, valorPromedio: 5000 });
  const perdidaAnual = Math.round(values.activos * (values.perdida / 100) * values.valorPromedio);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="bg-surface-raised border border-border-subtle rounded-block p-8 flex flex-col gap-6">
          <div>
            <label className="block text-xs font-medium text-ink-500 mb-3">
              Número total de activos
              <span className="ml-2 text-brand font-medium">{values.activos.toLocaleString()}</span>
            </label>
            <input
              type="range" min={100} max={100000} step={100}
              value={values.activos}
              onChange={(e) => setValues({ ...values, activos: +e.target.value })}
              className="w-full accent-brand"
            />
            <div className="flex justify-between text-xs text-ink-300 mt-1">
              <span>100</span><span>100,000</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-ink-500 mb-3">
              Porcentaje de activos sin control
              <span className="ml-2 text-brand font-medium">{values.perdida}%</span>
            </label>
            <input
              type="range" min={1} max={30}
              value={values.perdida}
              onChange={(e) => setValues({ ...values, perdida: +e.target.value })}
              className="w-full accent-brand"
            />
            <div className="flex justify-between text-xs text-ink-300 mt-1">
              <span>1%</span><span>30%</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-ink-500 mb-3">
              Valor promedio por activo (MXN)
              <span className="ml-2 text-brand font-medium">${values.valorPromedio.toLocaleString()}</span>
            </label>
            <input
              type="range" min={500} max={200000} step={500}
              value={values.valorPromedio}
              onChange={(e) => setValues({ ...values, valorPromedio: +e.target.value })}
              className="w-full accent-brand"
            />
            <div className="flex justify-between text-xs text-ink-300 mt-1">
              <span>$500</span><span>$200,000</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-dark rounded-block p-8 text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Pérdida estimada anual</p>
          <div className="text-4xl font-medium text-white mb-2">
            ${perdidaAnual.toLocaleString()}
          </div>
          <p className="text-sm text-white/40 mb-8">MXN en activos sin control</p>

          <div className="border-t border-white/10 pt-6 flex flex-col gap-2 text-left">
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Activos sin control</span>
              <span className="text-white">{Math.round(values.activos * values.perdida / 100).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Valor en riesgo</span>
              <span className="text-brand">${perdidaAnual.toLocaleString()}</span>
            </div>
          </div>

          <Link
            href="/diagnostico"
            className="mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
          >
            Solicitar diagnóstico <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Checklist() {
  const items = [
    { category: 'Identificación', checks: ['Todos los activos tienen etiqueta única', 'Las etiquetas son legibles y están actualizadas', 'Existe un catálogo maestro de activos'] },
    { category: 'Control', checks: ['Hay responsable asignado por activo', 'Se registran movimientos de activos', 'El inventario físico coincide con el sistema'] },
    { category: 'Trazabilidad', checks: ['Se documenta el historial de cada activo', 'Existen alertas por activos sin ubicación', 'Los procesos de baja están documentados'] },
    { category: 'Cumplimiento', checks: ['La información está disponible para auditorías', 'Los registros contables coinciden con físicos', 'Se generan reportes automáticos periódicos'] },
  ];

  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    const next = new Set(checked);
    if (next.has(id)) next.delete(id); else next.add(id);
    setChecked(next);
  };

  const total = items.reduce((s, cat) => s + cat.checks.length, 0);
  const score = Math.round((checked.size / total) * 100);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2 space-y-5">
          {items.map((cat) => (
            <div key={cat.category} className="bg-surface-raised border border-border-subtle rounded-card p-5">
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">{cat.category}</p>
              <div className="flex flex-col gap-3">
                {cat.checks.map((item) => {
                  const id = `${cat.category}-${item}`;
                  return (
                    <label key={item} className="flex items-center gap-3 cursor-pointer group">
                      <div
                        onClick={() => toggle(id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          checked.has(id) ? 'bg-brand border-brand' : 'border-border-subtle bg-surface-base group-hover:border-brand/50'
                        }`}
                      >
                        {checked.has(id) && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2">
                            <path d="M1.5 5l2.5 2.5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-ink-500">{item}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-surface-dark rounded-block p-6 text-center h-fit sticky top-24">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Nivel de control</p>
          <div className="text-5xl font-medium text-white mb-2">{score}%</div>
          <p className="text-sm text-white/40 mb-4">
            {score < 40 ? 'Riesgo alto' : score < 70 ? 'Control parcial' : 'Buen control'}
          </p>
          <div className="w-full bg-white/10 rounded-full h-2 mb-6">
            <div
              className="h-2 rounded-full bg-brand transition-all duration-500"
              style={{ width: `${score}%` }}
            />
          </div>
          <p className="text-xs text-white/40 mb-6">{checked.size} de {total} cumplidos</p>
          <Link
            href="/diagnostico"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
          >
            Mejorar resultado <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Recursos() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const isCalc = slug === 'calculadora-perdidas-activos';

  return (
    <>
      <section className="bg-surface-base pt-28 pb-20 border-b border-border-subtle">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-2 mb-5">
            <Link href="/" className="text-xs text-ink-300 hover:text-brand transition-colors">Inicio</Link>
            <span className="text-xs text-ink-300">/</span>
            <span className="text-xs text-brand">Recursos</span>
          </div>

          <div className="flex gap-3 mb-8">
            <Link
              href="/recursos/calculadora-perdidas-activos"
              className={`px-4 py-2 text-sm font-medium rounded-btn transition-colors ${isCalc ? 'bg-brand text-surface-dark' : 'bg-surface-raised border border-border-subtle text-ink-500 hover:text-ink'}`}
            >
              Calculadora de pérdidas
            </Link>
            <Link
              href="/recursos/checklist-cumplimiento-activos"
              className={`px-4 py-2 text-sm font-medium rounded-btn transition-colors ${!isCalc ? 'bg-brand text-surface-dark' : 'bg-surface-raised border border-border-subtle text-ink-500 hover:text-ink'}`}
            >
              Checklist de cumplimiento
            </Link>
          </div>

          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">
            {isCalc ? 'Calculadora' : 'Checklist'}
          </p>
          <h1 className="mb-4">
            {isCalc ? 'Calculadora de pérdidas por activos' : 'Checklist de cumplimiento de activos'}
          </h1>
          <p className="text-[17px] text-ink-500 max-w-2xl">
            {isCalc
              ? 'Estima cuánto dinero pierde tu empresa por activos no controlados, duplicados o sin trazabilidad.'
              : 'Verifica si tu empresa cumple con los requisitos mínimos de control, registro y trazabilidad de activos fijos.'}
          </p>
        </div>
      </section>

      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          {isCalc ? <Calculadora /> : <Checklist />}
        </div>
      </section>
    </>
  );
}
