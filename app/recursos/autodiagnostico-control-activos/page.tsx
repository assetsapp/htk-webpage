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

const questions = [
  {
    id: 1,
    category: 'Conciliación',
    question: '¿Tus activos coinciden con tus registros financieros?',
    options: [
      { label: 'Siempre', score: 0 },
      { label: 'En la mayoría de los casos', score: 1 },
      { label: 'A veces', score: 2 },
      { label: 'Frecuentemente no coinciden', score: 3 },
    ],
  },
  {
    id: 2,
    category: 'Ubicación',
    question: '¿Sabes exactamente dónde están tus activos en todo momento?',
    options: [
      { label: 'Sí, siempre', score: 0 },
      { label: 'Generalmente', score: 1 },
      { label: 'A veces', score: 2 },
      { label: 'No', score: 3 },
    ],
  },
  {
    id: 3,
    category: 'Responsabilidad',
    question: '¿Cada activo tiene un responsable claramente asignado?',
    options: [
      { label: 'Sí, todos', score: 0 },
      { label: 'La mayoría', score: 1 },
      { label: 'Algunos', score: 2 },
      { label: 'Ninguno', score: 3 },
    ],
  },
  {
    id: 4,
    category: 'Disponibilidad',
    question: '¿Los activos están disponibles cuando los necesitas?',
    options: [
      { label: 'Siempre', score: 0 },
      { label: 'Generalmente', score: 1 },
      { label: 'A veces', score: 2 },
      { label: 'Frecuentemente no', score: 3 },
    ],
  },
  {
    id: 5,
    category: 'Trazabilidad',
    question: '¿Puedes saber qué ha pasado con un activo a lo largo del tiempo?',
    options: [
      { label: 'Sí, completamente', score: 0 },
      { label: 'Parcialmente', score: 1 },
      { label: 'Muy limitado', score: 2 },
      { label: 'No', score: 3 },
    ],
  },
  {
    id: 6,
    category: 'Cumplimiento',
    question: '¿Tu información de activos está lista para auditorías?',
    options: [
      { label: 'Sí, sin problema', score: 0 },
      { label: 'Con ajustes menores', score: 1 },
      { label: 'Con dificultad', score: 2 },
      { label: 'No', score: 3 },
    ],
  },
  {
    id: 7,
    category: 'Automatización',
    question: '¿Qué tan manual es tu operación de control de activos?',
    options: [
      { label: 'Totalmente automatizada', score: 0 },
      { label: 'Mayormente automatizada', score: 1 },
      { label: 'Mayormente manual', score: 2 },
      { label: 'Totalmente manual', score: 3 },
    ],
  },
  {
    id: 8,
    category: 'Eficiencia',
    question: '¿Cuánto tiempo pierdes buscando activos o resolviendo inconsistencias?',
    options: [
      { label: 'Casi nada', score: 0 },
      { label: 'Poco', score: 1 },
      { label: 'Regular', score: 2 },
      { label: 'Mucho', score: 3 },
    ],
  },
];

type Level = 'alto' | 'medio' | 'bajo';

const levels: Record<Level, {
  label: string;
  color: string;
  dot: string;
  range: string;
  perdida: string;
  headline: string;
  subtext: string;
}> = {
  alto: {
    label: 'Alto control',
    color: 'text-green-600',
    dot: 'bg-green-500',
    range: '0 – 6 puntos',
    perdida: '4% – 6%',
    headline: 'Tu operación tiene un nivel de control sólido.',
    subtext: 'Tienes una base estructurada. Aun así, hay oportunidades para automatizar y elevar el control al siguiente nivel.',
  },
  medio: {
    label: 'Control medio',
    color: 'text-amber-500',
    dot: 'bg-amber-400',
    range: '7 – 14 puntos',
    perdida: '7% – 9%',
    headline: 'Tu operación tiene un nivel de control medio.',
    subtext: 'Existen inconsistencias en la forma en que gestionas tus activos que pueden generar pérdidas económicas y afectar la operación.',
  },
  bajo: {
    label: 'Bajo control',
    color: 'text-red-500',
    dot: 'bg-red-500',
    range: '15 – 24 puntos',
    perdida: '10% – 12%',
    headline: 'Tu operación tiene un nivel de control bajo.',
    subtext: 'Alta exposición a pérdidas y riesgo operativo. Cada día sin control estructurado tiene un costo real para tu empresa.',
  },
};

const perdidaFactors = [
  'Extravío o robo de activos',
  'Recompras innecesarias',
  'Falta de mantenimiento oportuno',
  'Pérdida de vida útil',
  'Falta de disponibilidad operativa',
  'Problemas en auditorías',
  'Errores operativos',
];

function getLevel(score: number): Level {
  if (score <= 6) return 'alto';
  if (score <= 14) return 'medio';
  return 'bajo';
}

type Screen = 'intro' | 'question' | 'result';

export default function AutodiagnosticoPage() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const level = getLevel(totalScore);
  const result = levels[level];
  const progress = ((current) / questions.length) * 100;

  function handleSelect(score: number) {
    setSelected(score);
  }

  function handleNext() {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);

    if (current + 1 >= questions.length) {
      setScreen('result');
    } else {
      setCurrent(current + 1);
    }
  }

  function handleRestart() {
    setScreen('intro');
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
  }

  const q = questions[current];

  return (
    <div className="min-h-screen bg-surface-base">
      {/* Header nav space */}
      <div className="pt-28" />

      {/* Intro */}
      {screen === 'intro' && (
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-6">Autodiagnóstico</p>
          <h1 className="mb-5">¿Qué tan controlados están realmente tus activos?</h1>
          <p className="text-[17px] text-ink-500 leading-relaxed mb-4 max-w-lg mx-auto">
            Responde 8 preguntas simples y descubre tu nivel de control, visibilidad y riesgo en tu operación.
          </p>
          <p className="text-sm text-ink-300 mb-10">⏱ 60 – 90 segundos</p>

          <div className="grid grid-cols-4 gap-3 mb-12">
            {['Conciliación', 'Ubicación', 'Trazabilidad', 'Disponibilidad', 'Responsabilidad', 'Cumplimiento', 'Automatización', 'Eficiencia'].map((tag) => (
              <span key={tag} className="px-3 py-1.5 bg-surface-alt border border-border-subtle rounded-full text-xs font-medium text-ink-500 text-center">
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={() => setScreen('question')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
          >
            Iniciar autodiagnóstico <ArrowRight />
          </button>
        </div>
      )}

      {/* Question */}
      {screen === 'question' && (
        <div className="max-w-2xl mx-auto px-6 py-12">
          {/* Progress */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-ink-300 font-medium">{current + 1} / {questions.length}</span>
              <span className="text-xs text-ink-300 font-medium uppercase tracking-wider">{q.category}</span>
            </div>
            <div className="h-1.5 bg-surface-alt rounded-full overflow-hidden">
              <div
                className="h-full bg-brand rounded-full transition-all duration-500"
                style={{ width: `${progress + (100 / questions.length)}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <h2 className="mb-8 text-2xl">{q.question}</h2>

          {/* Options */}
          <div className="flex flex-col gap-3 mb-10">
            {q.options.map((opt) => (
              <button
                key={opt.score}
                onClick={() => handleSelect(opt.score)}
                className={`w-full text-left px-5 py-4 rounded-card border transition-all text-[15px] font-medium ${
                  selected === opt.score
                    ? 'border-brand bg-brand-tint50 text-ink'
                    : 'border-border-subtle bg-surface-raised text-ink-500 hover:border-brand/40 hover:bg-surface-alt'
                }`}
              >
                <span className={`inline-block w-5 h-5 rounded-full border-2 mr-3 align-middle transition-all ${
                  selected === opt.score ? 'border-brand bg-brand' : 'border-ink-300'
                }`} />
                {opt.label}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center">
            {current > 0 ? (
              <button
                onClick={() => { setCurrent(current - 1); setAnswers(answers.slice(0, -1)); setSelected(null); }}
                className="text-sm text-ink-300 hover:text-ink transition-colors"
              >
                ← Anterior
              </button>
            ) : <div />}

            <button
              onClick={handleNext}
              disabled={selected === null}
              className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-btn transition-all ${
                selected !== null
                  ? 'bg-brand text-surface-dark hover:bg-brand-hover'
                  : 'bg-surface-alt text-ink-300 cursor-not-allowed'
              }`}
            >
              {current + 1 === questions.length ? 'Ver resultado' : 'Siguiente'} <ArrowRight />
            </button>
          </div>
        </div>
      )}

      {/* Result */}
      {screen === 'result' && (
        <div className="max-w-2xl mx-auto px-6 py-12">
          {/* Score badge */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-raised border border-border-subtle rounded-full mb-6">
              <span className={`w-2 h-2 rounded-full ${result.dot}`} />
              <span className="text-xs font-medium text-ink-500">{result.label}</span>
              <span className="text-xs text-ink-300">· {result.range}</span>
            </div>
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Tu resultado</p>
            <h1 className="mb-4">{result.headline}</h1>
            <p className="text-[17px] text-ink-500 leading-relaxed max-w-lg mx-auto">{result.subtext}</p>
          </div>

          {/* Pérdida estimada */}
          <div className="p-8 bg-surface-raised border border-border-subtle rounded-block mb-6">
            <p className="text-xs font-medium tracking-widest uppercase text-ink-300 mb-2">Pérdida estimada potencial</p>
            <div className={`text-4xl font-semibold mb-1 ${result.color}`}>{result.perdida}</div>
            <p className="text-sm text-ink-500">del valor de tus activos al año</p>

            <div className="mt-6 pt-6 border-t border-border-subtle">
              <p className="text-xs font-medium text-ink-300 mb-3">Este porcentaje considera:</p>
              <div className="grid grid-cols-2 gap-2">
                {perdidaFactors.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-ink-500">
                    <span className="mt-0.5 text-brand flex-shrink-0">·</span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Score detail */}
          <div className="p-4 bg-surface-alt border border-border-subtle rounded-card mb-8 flex items-center justify-between">
            <span className="text-sm text-ink-500">Puntuación total</span>
            <span className="text-sm font-semibold text-ink">{totalScore} / 24 puntos</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Link
              href={`/recursos/calculadora-roi-activos?nivel=${level}`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
            >
              Calcular impacto económico <ArrowRight />
            </Link>
            <Link
              href="/diagnostico"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-ink-700 text-ink-700 text-sm font-medium rounded-btn hover:bg-surface-alt transition-colors"
            >
              Solicitar diagnóstico
            </Link>
          </div>

          <button
            onClick={handleRestart}
            className="w-full text-center text-sm text-ink-300 hover:text-ink transition-colors py-2"
          >
            ↺ Repetir diagnóstico
          </button>
        </div>
      )}
    </div>
  );
}
