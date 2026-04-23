import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-screen bg-surface-base flex items-center justify-center pt-20">
      <div className="max-w-lg text-center px-6">
        <p className="text-xs font-medium tracking-widest uppercase text-brand mb-3">404</p>
        <h2 className="mb-4">Página no encontrada</h2>
        <p className="text-[17px] text-ink-500 mb-8">
          La página que buscas no existe o fue movida.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
