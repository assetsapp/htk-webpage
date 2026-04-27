import Link from 'next/link';
import { solutions, industries } from '@/data/content';

export default function Footer() {
  return (
    <footer className="bg-surface-alt border-t border-border-subtle">
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Navegación general */}
          <div>
            <div className="mb-6">
              <img src="/htk-logo-navbar.webp" alt="HTK" className="h-14 w-auto mb-4" />
              <p className="text-sm text-ink-500 leading-relaxed">
                Identificación inteligente de activos para empresas que necesitan control, trazabilidad y confianza en su operación.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {['Problemas', 'Industrias', 'Soluciones', 'Casos', 'Recursos', 'Nosotros', 'Contacto'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-sm text-ink-500 hover:text-brand transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 2: Soluciones */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-ink-300 mb-4">Soluciones</h4>
            <div className="flex flex-col gap-2">
              {solutions.map((s) => (
                <Link
                  key={s.slug}
                  href={`/soluciones/${s.slug}`}
                  className="text-sm text-ink-500 hover:text-brand transition-colors"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: Industrias */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-ink-300 mb-4">Industrias</h4>
            <div className="flex flex-col gap-2">
              {industries.map((i) => (
                <Link
                  key={i.slug}
                  href={`/industrias/${i.slug}`}
                  className="text-sm text-ink-500 hover:text-brand transition-colors"
                >
                  {i.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4: Contacto */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-ink-300 mb-4">Contacto</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:contacto@htk-id.com" className="text-sm text-ink-500 hover:text-brand transition-colors flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="12" height="10" rx="1.5" />
                  <path d="M2 5l6 4.5L14 5" strokeLinecap="round" />
                </svg>
                contacto@htk-id.com
              </a>
              <a href="tel:+525512345678" className="text-sm text-ink-500 hover:text-brand transition-colors flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 3c.5-.5 1.5-.5 2 0l1.5 2c.3.5.2 1-.2 1.4L5.5 7.2c.7 1.4 1.9 2.6 3.3 3.3l.8-.8c.4-.4.9-.5 1.4-.2L13 11c.5.5.5 1.5 0 2l-.8.8c-1 1-4.2.5-7.3-2.7C1.8 7.8 1.3 4.5 3 3z" />
                </svg>
                +52 (55) 1234-5678
              </a>
              <div className="text-sm text-ink-500 flex items-start gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 flex-shrink-0">
                  <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5s4.5-5 4.5-8.5C12.5 3.5 10.5 1.5 8 1.5z" />
                  <circle cx="8" cy="6" r="1.5" />
                </svg>
                Ciudad de México, México
              </div>
              <a
                href="https://www.linkedin.com/company/htk-id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ink-500 hover:text-brand transition-colors flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2.5 4.5a2 2 0 100-4 2 2 0 000 4zM.5 6h4v10h-4zM6 6h3.5v1.4h.05A3.8 3.8 0 0113 5.7c3.9 0 4.6 2.6 4.6 5.9V16h-4v-4c0-1-.02-2.2-1.4-2.2-1.4 0-1.6 1-1.6 2.1V16H6z" />
                </svg>
                LinkedIn
              </a>
            </div>

            <div className="mt-6 pt-4 border-t border-border-subtle">
              <Link
                href="/diagnostico"
                className="block text-center px-5 py-3 bg-brand text-surface-dark text-sm font-medium rounded-btn transition-colors hover:bg-brand-hover"
              >
                Solicitar diagnóstico
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-subtle">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
<p className="text-xs text-ink-300">© HTK 2026. Todos los derechos reservados.</p>
          <Link href="/aviso-de-privacidad" className="text-xs text-ink-300 hover:text-brand transition-colors">
            Aviso de privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
