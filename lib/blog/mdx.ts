/**
 * Fuente de contenido: archivos MDX en `content/blog/`.
 *
 * Esta es la ÚNICA capa que sabe que el contenido vive en archivos. Si se
 * migra a Notion/Keystatic, se crea `lib/blog/notion.ts` con las mismas
 * funciones y se cambia el import en `lib/blog/index.ts`. Nada más.
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post, PostMeta, PostFrontmatter } from './types';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

/** Palabras por minuto promedio de lectura en español. */
const WPM = 200;

function calcReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / WPM));
}

/** Lee y parsea un archivo .mdx. Devuelve null si está marcado como draft. */
function parseFile(filename: string): Post | null {
  const slug = filename.replace(/\.mdx$/, '');
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8');
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;

  if (fm.draft) return null;

  return {
    slug,
    title: fm.title,
    excerpt: fm.excerpt,
    date: fm.date,
    category: fm.category,
    author: fm.author,
    cover: fm.cover,
    readingTime: calcReadingTime(content),
    source: 'mdx',
    content,
  };
}

/** Todos los artículos publicados, ordenados por fecha descendente. */
export function getMdxPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map(parseFile)
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Solo metadatos (para listados — evita cargar el contenido completo). */
export function getMdxPostsMeta(): PostMeta[] {
  return getMdxPosts().map(({ content: _content, ...meta }) => meta);
}

/** Un artículo por slug. null si no existe o es draft. */
export function getMdxPostBySlug(slug: string): Post | null {
  const file = `${slug}.mdx`;
  if (!fs.existsSync(path.join(BLOG_DIR, file))) return null;
  return parseFile(file);
}
