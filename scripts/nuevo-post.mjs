#!/usr/bin/env node
/**
 * Scaffolding de artículos del blog.
 *
 * Uso:  npm run nuevo-post
 *
 * Pregunta título, categoría, autor y extracto, genera el slug y crea el
 * archivo .mdx en content/blog/ con el frontmatter ya armado y una estructura
 * base. El artículo se crea con `draft: true` — no se publica hasta que lo
 * cambies a `false` manualmente.
 */
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// Cola de respuestas — robusto para uso interactivo y para stdin piped.
const queued = [];
let pending = null;
rl.on('line', (line) => {
  if (pending) {
    pending(line);
    pending = null;
  } else {
    queued.push(line);
  }
});
rl.on('close', () => {
  // Si el input termina (EOF), resuelve cualquier pregunta pendiente con ''.
  if (pending) {
    pending('');
    pending = null;
  }
});

const ask = (q) =>
  new Promise((resolve) => {
    process.stdout.write(q);
    if (queued.length) resolve(queued.shift());
    else pending = resolve;
  });

/** Convierte un título a slug: minúsculas, sin acentos, guiones. */
function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // quita acentos
    .replace(/[^a-z0-9\s-]/g, '') // quita símbolos
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function today() {
  return new Date().toISOString().split('T')[0];
}

async function main() {
  console.log('\n  Nuevo artículo del blog HTK\n  ───────────────────────────\n');

  const title = (await ask('  Título: ')).trim();
  if (!title) {
    console.log('\n  ✗ El título es obligatorio.\n');
    rl.close();
    process.exit(1);
  }

  const category = (await ask('  Categoría (ej. Cumplimiento, Tecnología, Operaciones): ')).trim() || 'General';
  const author = (await ask('  Autor [Equipo HTK]: ')).trim() || 'Equipo HTK';
  const excerpt = (await ask('  Extracto (1-2 frases para listados y SEO): ')).trim() || 'Pendiente de redactar.';

  rl.close();

  const slug = slugify(title);
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (fs.existsSync(filePath)) {
    console.log(`\n  ✗ Ya existe un artículo con el slug "${slug}".\n`);
    process.exit(1);
  }

  if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });

  // Escapa comillas dobles en valores del frontmatter
  const esc = (s) => s.replace(/"/g, '\\"');

  const content = `---
title: "${esc(title)}"
excerpt: "${esc(excerpt)}"
date: "${today()}"
category: "${esc(category)}"
author: "${esc(author)}"
draft: true
---

Párrafo de entrada — engancha al lector con el problema concreto que el
artículo resuelve. Sin rodeos.

## Primer subtema

Desarrolla la idea. Usa subtítulos H2 para las secciones principales y H3
para subsecciones.

## Segundo subtema

Las tablas, listas y citas funcionan bien para hacer el contenido escaneable.

> Una cita o idea clave destacada.

## El siguiente paso

Cierra conectando con la acción. Enlaza a una página relevante del sitio:

[Agenda una sesión de análisis](/sesion) y revisamos tu caso concreto.
`;

  fs.writeFileSync(filePath, content, 'utf-8');

  console.log(`
  ✓ Artículo creado:

    content/blog/${slug}.mdx

  Próximos pasos:
    1. Edita el contenido del archivo
    2. Cuando esté listo, cambia  draft: true  →  draft: false
    3. Verás el artículo en  /blog
`);
}

main();
