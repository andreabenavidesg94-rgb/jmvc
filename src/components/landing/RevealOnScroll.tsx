'use client';

import { useEffect, useRef, useState } from 'react';

type RevealVariant = 'fade-up' | 'blur-up' | 'scale-in';

type RevealOnScrollProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
};

export function RevealOnScroll({
  children,
  className = '',
  delay = 0,
  variant = 'fade-up',
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => {
            setRevealed(true);
          }, delay);

          observer.disconnect();
        }
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay]);

  const initial: Record<RevealVariant, string> = {
    'fade-up': 'opacity-0 translate-y-8',
    'blur-up': 'opacity-0 translate-y-8 blur-md',
    'scale-in': 'opacity-0 scale-[0.96]',
  };

  const final: Record<RevealVariant, string> = {
    'fade-up': 'opacity-100 translate-y-0',
    'blur-up': 'opacity-100 translate-y-0 blur-0',
    'scale-in': 'opacity-100 scale-100',
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-[850ms] ease-out will-change-transform ${
        revealed ? final[variant] : initial[variant]
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default RevealOnScroll;