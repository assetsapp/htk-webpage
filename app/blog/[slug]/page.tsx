import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { buildMeta, articleSchema, breadcrumbSchema } from '@/lib/seo';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog';

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

/** Componentes custom para el MDX — links internos usan Next Link. */
const mdxComponents = {
  a: ({ href = '', children }: { href?: string; children?: React.ReactNode }) => {
    if (href.startsWith('/') || href.startsWith('#')) {
      return <Link href={href}>{children}</Link>;
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
};

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const meta = buildMeta(post.title, post.excerpt, `/blog/${slug}`);
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: 'article' },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);

  const breadcrumbs = [
    { name: 'Inicio', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: post.title, href: `/blog/${slug}` },
  ];

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              title: post.title,
              description: post.excerpt,
              slug: post.slug,
              date: post.date,
              author: post.author,
              cover: post.cover,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }}
      />

      <div className="min-h-screen bg-surface-base">
        <div className="pt-28" />

        {/* Header del artículo */}
        <section className="bg-surface-base py-12 md:py-16 border-b border-border-subtle">
          <div className="max-w-3xl mx-auto px-6 md:px-10">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 mb-6">
              <Link href="/" className="text-xs text-ink-300 hover:text-brand transition-colors">Inicio</Link>
              <span className="text-ink-300 text-xs">/</span>
              <Link href="/blog" className="text-xs text-ink-300 hover:text-brand transition-colors">Blog</Link>
              <span className="text-ink-300 text-xs">/</span>
              <span className="text-xs text-brand">{post.category}</span>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-medium tracking-wider uppercase text-brand">{post.category}</span>
              <span className="text-ink-300 text-xs">·</span>
              <span className="text-xs text-ink-300">{post.readingTime} min de lectura</span>
            </div>

            <h1 className="mb-6">{post.title}</h1>

            <p className="text-[17px] text-ink-500 leading-relaxed mb-6">{post.excerpt}</p>

            <div className="flex items-center gap-3 pt-6 border-t border-border-subtle">
              <div className="w-10 h-10 rounded-full bg-brand-tint50 border border-brand-tint100 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-brand">{post.author.charAt(0)}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-ink">{post.author}</p>
                <p className="text-xs text-ink-300">{formatDate(post.date)}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contenido MDX */}
        <article className="bg-surface-base py-12 md:py-16">
          <div
            className="max-w-3xl mx-auto px-6 md:px-10
              prose prose-neutral max-w-none
              prose-headings:text-ink prose-headings:font-semibold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-ink-500 prose-p:leading-relaxed prose-p:text-[17px]
              prose-li:text-ink-500 prose-li:text-[17px] prose-li:leading-relaxed
              prose-strong:text-ink prose-strong:font-semibold
              prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-a:font-medium
              prose-blockquote:border-l-brand prose-blockquote:bg-surface-alt prose-blockquote:rounded-r-card
              prose-blockquote:py-1 prose-blockquote:px-5 prose-blockquote:not-italic prose-blockquote:text-ink-700
              prose-table:text-sm prose-th:text-ink prose-th:font-semibold
              prose-td:text-ink-500 prose-td:border-border-subtle prose-th:border-border-subtle
              prose-code:text-ink prose-code:bg-surface-alt prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
              prose-hr:border-border-subtle"
          >
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </article>

        {/* Artículos relacionados */}
        {related.length > 0 && (
          <section className="bg-surface-alt border-t border-border-subtle py-16">
            <div className="max-w-8xl mx-auto px-6 md:px-10">
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Sigue leyendo</p>
              <h2 className="mb-10">Artículos relacionados</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group flex flex-col p-6 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium tracking-wider uppercase text-brand">{r.category}</span>
                      <span className="text-ink-300 text-xs">·</span>
                      <span className="text-xs text-ink-300">{r.readingTime} min</span>
                    </div>
                    <h3 className="text-base font-medium text-ink mb-2 leading-snug group-hover:text-brand transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-sm text-ink-500 leading-relaxed line-clamp-3 flex-1">{r.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-surface-dark py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10 text-center">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Siguiente paso</p>
            <h2 className="text-white mb-4 max-w-2xl mx-auto">
              ¿Esto te suena a tu operación? Hablemos de tu caso concreto.
            </h2>
            <p className="text-[17px] text-white/60 max-w-xl mx-auto mb-8">
              Una sesión de análisis sin costo: 30 minutos para identificar dónde estás perdiendo control.
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
    </>
  );
}
