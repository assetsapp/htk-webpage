import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMeta } from '@/lib/seo';
import { getAllPostsMeta } from '@/lib/blog';

export const metadata: Metadata = buildMeta(
  'Blog HTK | Control, trazabilidad y cumplimiento de activos',
  'Guías prácticas, comparativas y análisis sobre control de activos, cumplimiento normativo y trazabilidad operativa para empresas que no pueden perder el control.',
  '/blog'
);

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogPage() {
  const posts = getAllPostsMeta();
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-surface-base">
      <div className="pt-28" />

      {/* Hero */}
      <section className="bg-surface-base py-16 md:py-20 border-b border-border-subtle">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Blog HTK</p>
          <h1 className="mb-5 max-w-3xl">
            Control de activos, sin el ruido.
          </h1>
          <p className="text-[17px] text-ink-500 leading-relaxed max-w-2xl">
            Guías prácticas, comparativas y análisis sobre trazabilidad, cumplimiento y control operativo.
            Para equipos que necesitan decisiones, no teoría.
          </p>
        </div>
      </section>

      {/* Lista de artículos */}
      <section className="bg-surface-base py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          {posts.length === 0 ? (
            <p className="text-ink-300 text-sm">Aún no hay artículos publicados. Pronto.</p>
          ) : (
            <>
              {/* Destacado */}
              {featured && (
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group block mb-12 p-8 md:p-10 bg-surface-raised border border-border-subtle rounded-block hover:border-brand/30 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-medium tracking-wider uppercase text-brand">{featured.category}</span>
                    <span className="text-ink-300 text-xs">·</span>
                    <span className="text-xs text-ink-300">{featured.readingTime} min de lectura</span>
                  </div>
                  <h2 className="mb-3 max-w-3xl group-hover:text-brand transition-colors">{featured.title}</h2>
                  <p className="text-[17px] text-ink-500 leading-relaxed max-w-2xl mb-6">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-ink-300">
                      {featured.author} · {formatDate(featured.date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-3 transition-all">
                      Leer artículo <ArrowRight />
                    </span>
                  </div>
                </Link>
              )}

              {/* Resto en grid */}
              {rest.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col p-6 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-medium tracking-wider uppercase text-brand">{post.category}</span>
                        <span className="text-ink-300 text-xs">·</span>
                        <span className="text-xs text-ink-300">{post.readingTime} min</span>
                      </div>
                      <h3 className="text-base font-medium text-ink mb-2 leading-snug group-hover:text-brand transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-ink-500 leading-relaxed mb-5 line-clamp-3 flex-1">{post.excerpt}</p>
                      <span className="text-xs text-ink-300">
                        {post.author} · {formatDate(post.date)}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-dark py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10 text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Del contenido a la acción</p>
          <h2 className="text-white mb-4 max-w-2xl mx-auto">
            Leer sobre control de activos es útil. Tenerlo es lo que cambia tu operación.
          </h2>
          <p className="text-[17px] text-white/60 max-w-xl mx-auto mb-8">
            Agenda una sesión de análisis sin costo y revisamos tu caso concreto en 30 minutos.
          </p>
          <Link
            href="/sesion"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
          >
            Agendar sesión <ArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
