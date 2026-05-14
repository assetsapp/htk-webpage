/**
 * Capa de abstracción del blog — punto de entrada único.
 *
 * Las páginas importan SIEMPRE desde aquí (`@/lib/blog`), nunca desde
 * `./mdx` directamente. Para migrar a otra fuente (Notion, Keystatic, etc.)
 * basta con cambiar los imports de abajo — las páginas no se tocan.
 */
import { getMdxPosts, getMdxPostsMeta, getMdxPostBySlug } from './mdx';
import type { Post, PostMeta } from './types';

export type { Post, PostMeta, PostFrontmatter } from './types';

/** Todos los artículos publicados (con contenido), más recientes primero. */
export function getAllPosts(): Post[] {
  return getMdxPosts();
}

/** Metadatos de todos los artículos — para listados. */
export function getAllPostsMeta(): PostMeta[] {
  return getMdxPostsMeta();
}

/** Un artículo por slug, o null si no existe. */
export function getPostBySlug(slug: string): Post | null {
  return getMdxPostBySlug(slug);
}

/** Lista única de categorías existentes, ordenada alfabéticamente. */
export function getAllCategories(): string[] {
  const set = new Set(getMdxPostsMeta().map((p) => p.category));
  return [...set].sort((a, b) => a.localeCompare(b, 'es'));
}

/** Artículos relacionados: misma categoría, excluye el actual. */
export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const all = getMdxPostsMeta();
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];

  const sameCategory = all.filter(
    (p) => p.slug !== slug && p.category === current.category
  );
  const others = all.filter(
    (p) => p.slug !== slug && p.category !== current.category
  );

  return [...sameCategory, ...others].slice(0, limit);
}
