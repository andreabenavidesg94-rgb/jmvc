'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * AnimatedStat soporta dos modos:
 *
 * - mode="numeric" (por defecto): cuenta de 0 a `value` con easing.
 *   Usa cuando tienes un número real (ej: 128 campañas, 5 minutos).
 *
 * - mode="symbolic": NO anima el número, solo hace fade-in del display.
 *   Usa cuando el "número" es un símbolo no contable (ej: "24/7", "1").
 *   Esto evita que durante la animación se vea "0/7" o "<0 min" en
 *   los primeros frames, que se leía como un bug visual.
 *
 * También respeta `prefers-reduced-motion` desactivando la animación.
 */

interface AnimatedStatProps {
  /**
   * Valor numérico a animar.
   * Para mode="symbolic" se ignora y se muestra `display` literal.
   */
  value: number;
  /** Texto fijo antes del número (ej: "<", "$"). */
  prefix?: string;
  /** Texto fijo después del número (ej: "+", "%", " min"). */
  suffix?: string;
  /**
   * Display literal usado en modo symbolic (ej: "24/7").
   * Si está presente y mode="symbolic", se renderiza tal cual.
   */
  display?: string;
  /** Modo de render. */
  mode?: 'numeric' | 'symbolic';
  /** Duración de la animación numérica en ms. */
  duration?: number;
  /** Etiqueta principal debajo del número. */
  label: string;
  /** Texto pequeño adicional. */
  hint?: string;
  /** Separador de miles (formato europeo por defecto). */
  thousandsSeparator?: string;
}

export function AnimatedStat({
  value,
  prefix = '',
  suffix = '',
  display,
  mode = 'numeric',
  duration = 1800,
  label,
  hint,
  thousandsSeparator = '.',
}: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  // En modo symbolic mostramos el valor final desde el primer render.
  // En modo numeric arrancamos en 0 y vamos subiendo.
  const [displayed, setDisplayed] = useState(mode === 'symbolic' ? value : 0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            setVisible(true);

            if (mode === 'symbolic' || prefersReducedMotion) {
              setDisplayed(value);
              observer.disconnect();
              return;
            }

            const start = performance.now();
            const tick = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
              setDisplayed(Math.round(value * eased));
              if (progress < 1) {
                requestAnimationFrame(tick);
              } else {
                setDisplayed(value);
              }
            };
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration, mode]);

  // Construye el contenido a mostrar.
  // - symbolic: usa `display` si existe, si no usa value+sufijos.
  // - numeric: prefix + número formateado + suffix.
  const numberText =
    mode === 'symbolic'
      ? display ?? `${prefix}${value}${suffix}`
      : `${prefix}${formatNumber(displayed, thousandsSeparator)}${suffix}`;

  // Etiqueta accesible: siempre el valor final, no el animado.
  const ariaLabel = `${display ?? `${prefix}${value}${suffix}`} ${label}`;

  return (
    <div
      ref={ref}
      className={`flex flex-col transition-opacity duration-700 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-label={ariaLabel}
    >
      <span
        className="text-4xl font-semibold leading-none tracking-tight text-white md:text-5xl"
        aria-hidden="true"
      >
        {numberText}
      </span>
      <span className="mt-3 text-sm font-medium text-white/85">{label}</span>
      {hint && <span className="mt-0.5 text-xs text-white/45">{hint}</span>}
    </div>
  );
}

function formatNumber(n: number, separator: string): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}
