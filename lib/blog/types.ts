/**
 * Interfaz común del blog — capa de abstracción.
 *
 * Las páginas (`/blog`, `/blog/[slug]`) solo conocen estos tipos, NO de dónde
 * sale el contenido. Hoy la fuente es MDX (`lib/blog/mdx.ts`). Si mañana se
 * migra a Notion o Keystatic, solo se crea otra fuente que devuelva estos
 * mismos tipos — las páginas no cambian.
 */

/** Metadatos de un artículo (sin el contenido — para listados). */
export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;            // ISO: '2026-05-13'
  category: string;
  author: string;
  /** Minutos de lectura estimados. Calculado, no del frontmatter. */
  readingTime: number;
  /** Imagen de portada opcional (ruta en /public o URL). */
  cover?: string;
  /** Fuente del contenido — útil si algún día se corren varias a la vez. */
  source: 'mdx';
}

/** Artículo completo — metadatos + contenido crudo MDX. */
export interface Post extends PostMeta {
  /** Contenido MDX sin compilar. La página lo renderiza con next-mdx-remote. */
  content: string;
}

/** Frontmatter esperado en cada archivo .mdx. */
export interface PostFrontmatter {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  cover?: string;
  /** Si es true, el artículo no se publica ni aparece en listados/sitemap. */
  draft?: boolean;
}
