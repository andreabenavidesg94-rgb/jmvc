'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

const NAV = [
  { label: 'Cómo funciona', href: '/#como-funciona' },
  { label: 'Beneficios', href: '/#beneficios' },
  { label: 'Precios', href: '/#precios' },
  { label: 'FAQ', href: '/#faq' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cerrar menú al cambiar de tamaño a desktop.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-bg/70 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Navegación principal"
        className="container flex h-16 items-center justify-between"
      >
        <Logo />

        <ul className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-white/70 transition hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="text-sm text-white/70 transition hover:text-white"
          >
            Iniciar sesión
          </Link>
          <Link href="/signup" className="btn-primary text-sm">
            Empezar ahora
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2 text-white md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-white/10 bg-bg/95 backdrop-blur md:hidden"
        >
          <ul className="container flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-base text-white/85 transition hover:bg-white/5"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-3 flex flex-col gap-2 px-1">
              <Link href="/login" className="btn-ghost w-full">
                Iniciar sesión
              </Link>
              <Link href="/signup" className="btn-primary w-full">
                Empezar ahora
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
