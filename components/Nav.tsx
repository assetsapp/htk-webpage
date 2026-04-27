'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/data/content';

function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" strokeWidth="1.5" stroke="currentColor">
      <path d="M3 5l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 6h16M3 11h16M3 16h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 5l12 12M17 5L5 17" strokeLinecap="round" />
    </svg>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-surface-raised/95 backdrop-blur-sm border-b border-border-subtle shadow-[0_1px_0_0_#E7E5DE]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-8xl mx-auto px-6 md:px-10 flex items-center justify-between h-20" ref={dropdownRef}>
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <img src="/htk-logo-navbar.webp" alt="HTK Identificación Inteligente" className="h-16 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item, idx) => (
            <div key={idx} className="relative">
              {item.dropdown ? (
                <button
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                    activeDropdown === idx
                      ? 'text-ink bg-surface-alt'
                      : 'text-ink-500 hover:text-ink hover:bg-surface-alt'
                  }`}
                  onClick={() => setActiveDropdown(activeDropdown === idx ? null : idx)}
                  onMouseEnter={() => setActiveDropdown(idx)}
                >
                  {item.label}
                  <span className={`transition-transform duration-150 ${activeDropdown === idx ? 'rotate-180' : ''}`}>
                    <ChevronDown />
                  </span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-ink-500 hover:text-ink hover:bg-surface-alt rounded-md transition-colors duration-150"
                >
                  {item.label}
                </Link>
              )}

              {item.dropdown && activeDropdown === idx && (
                <div
                  className="absolute top-full left-0 mt-1 bg-surface-raised rounded-card border border-border-subtle shadow-lg min-w-[260px] max-w-[340px] py-2 z-50"
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.label === 'Casos' ? (
                    <CasosDropdown items={item.dropdown} />
                  ) : (
                    item.dropdown.map((sub, si) => (
                      <Link
                        key={si}
                        href={sub.href}
                        className="block px-4 py-2.5 hover:bg-surface-alt transition-colors group"
                      >
                        <div className="text-sm font-medium text-ink group-hover:text-brand transition-colors">{sub.label}</div>
                        {sub.description && (
                          <div className="text-xs text-ink-300 mt-0.5 leading-snug line-clamp-1">{sub.description}</div>
                        )}
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link
            href="/diagnostico"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-surface-dark text-sm font-medium rounded-btn transition-all duration-200 hover:bg-brand-hover"
          >
            Solicitar diagnóstico
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-ink-500 hover:text-ink transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Abrir menú"
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-surface-raised border-t border-border-subtle">
          <div className="max-w-8xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navItems.map((item, idx) => (
              <div key={idx}>
                {item.dropdown ? (
                  <>
                    <button
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-surface-alt rounded-md transition-colors"
                      onClick={() => setActiveDropdown(activeDropdown === idx ? null : idx)}
                    >
                      {item.label}
                      <span className={`transition-transform ${activeDropdown === idx ? 'rotate-180' : ''}`}>
                        <ChevronDown />
                      </span>
                    </button>
                    {activeDropdown === idx && (
                      <div className="ml-3 mt-1 border-l-2 border-border-subtle pl-3 flex flex-col gap-0.5">
                        {item.dropdown.map((sub, si) => (
                          <Link
                            key={si}
                            href={sub.href}
                            className="block py-2 text-sm text-ink-500 hover:text-brand transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-surface-alt rounded-md transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="mt-3 pt-3 border-t border-border-subtle">
              <Link
                href="/diagnostico"
                className="block text-center px-5 py-3 bg-brand text-surface-dark text-sm font-medium rounded-btn transition-colors hover:bg-brand-hover"
              >
                Solicitar diagnóstico
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function CasosDropdown({ items }: { items: { label: string; href: string; description: string; group?: string }[] }) {
  return (
    <div className="py-1">
      {items.map((item, i) => (
        <Link
          key={i}
          href={item.href}
          className="block px-4 py-2.5 hover:bg-surface-alt transition-colors group"
        >
          <div className="text-sm font-medium text-ink group-hover:text-brand transition-colors">{item.label}</div>
          {item.description && (
            <div className="text-xs text-ink-300 mt-0.5 leading-snug">{item.description}</div>
          )}
        </Link>
      ))}
    </div>
  );
}
