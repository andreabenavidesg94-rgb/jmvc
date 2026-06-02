'use client';

import { useEffect, useRef } from 'react';

/**
 * Fondo interactivo de partículas conectadas en Canvas 2D.
 *
 * Decisiones de rendimiento:
 *  - 200 puntos en desktop, 100 en móvil (auto-detectado por viewport).
 *  - Solo se conectan vecinos a < 140px (búsqueda O(n²) pero con n=200 es trivial).
 *  - Pausa el rAF cuando el canvas sale del viewport (IntersectionObserver).
 *  - Pausa cuando la pestaña no es visible (visibilitychange).
 *  - Respeta prefers-reduced-motion: pinta una vez y para. Sin movimiento.
 *  - Mouse-reactive solo en desktop con pointer fine.
 *  - DPI consciente: scale por window.devicePixelRatio capado a 2.
 *  - Repintado con composite "lighter" para que las líneas se sumen.
 *  - Sin dependencias.
 */
interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseAlpha: number;
}

const COLORS = [
  'rgba(129, 140, 248, %a)', // brand indigo-400 — más brillante
  'rgba(34, 211, 238, %a)',  // accent cyan
  'rgba(217, 70, 239, %a)',  // fuchsia
  'rgba(167, 139, 250, %a)', // violet-400
];

export function InteractiveDotBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const visibleRef = useRef(true);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const isCoarse =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(pointer: coarse)').matches;

    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);
    let width = 0;
    let height = 0;
    let points: Point[] = [];

    const isMobile = () =>
      typeof window !== 'undefined' && window.innerWidth < 768;

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      width = w;
      height = h;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function seed() {
      const count = isMobile() ? 60 : 130;
      points = new Array(count).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        baseAlpha: 0.38 + Math.random() * 0.28,
      }));
    }

    function pickColor(i: number, alpha: number): string {
      const idx = i % COLORS.length;
      return COLORS[idx].replace('%a', alpha.toFixed(3));
    }

    function step() {
      if (!visibleRef.current) {
        rafRef.current = null;
        return;
      }

      ctx!.clearRect(0, 0, width, height);
      ctx!.globalCompositeOperation = 'lighter';

      const linkDist = isMobile() ? 88 : 125;
      const linkDist2 = linkDist * linkDist;
      const mouse = mouseRef.current;

      // Update + draw points
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bordes con rebote suave
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Atracción suave al mouse
        if (mouse) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 22500) {
            // 150px
            const f = 0.0009;
            p.vx += dx * f;
            p.vy += dy * f;
          }
        }

        // Damping para que no se desboque
        p.vx *= 0.985;
        p.vy *= 0.985;

        ctx!.fillStyle = pickColor(i, p.baseAlpha * 0.88);
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 2.1, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Líneas entre vecinos
      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDist2) {
            const t = 1 - d2 / linkDist2;
            ctx!.strokeStyle = pickColor(i, t * 0.22);
            ctx!.lineWidth = 0.6;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      ctx!.globalCompositeOperation = 'source-over';
      rafRef.current = requestAnimationFrame(step);
    }

    function paintStaticOnce() {
      ctx!.clearRect(0, 0, width, height);
      ctx!.globalCompositeOperation = 'lighter';
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        ctx!.fillStyle = pickColor(i, p.baseAlpha * 0.80);
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 2.1, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalCompositeOperation = 'source-over';
    }

    // Setup
    resize();
    window.addEventListener('resize', resize);

    if (reduceMotion) {
      paintStaticOnce();
    } else {
      rafRef.current = requestAnimationFrame(step);
    }

    // Mouse (solo desktop)
    let onMove: ((e: MouseEvent) => void) | null = null;
    let onLeave: (() => void) | null = null;
    if (!isCoarse && !reduceMotion) {
      onMove = (e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      };
      onLeave = () => {
        mouseRef.current = null;
      };
      window.addEventListener('mousemove', onMove, { passive: true });
      window.addEventListener('mouseleave', onLeave);
    }

    // Pausa cuando no es visible
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibleRef.current = entry.isIntersecting;
          if (visibleRef.current && !rafRef.current && !reduceMotion) {
            rafRef.current = requestAnimationFrame(step);
          }
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    // Pausa cuando la pestaña no es visible
    const onVisibility = () => {
      const wasVisible = visibleRef.current;
      visibleRef.current = !document.hidden && wasVisible;
      if (!document.hidden && wasVisible && !rafRef.current && !reduceMotion) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      if (onMove) window.removeEventListener('mousemove', onMove);
      if (onLeave) window.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    >
      {/* Glows de color radiales — más tenues que antes */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(217,70,239,0.10),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(34,211,238,0.09),transparent_50%)]" />
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* Vignette superior: fade del color de fondo sobre el borde del header */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg to-transparent" />
      {/*
        Overlay progresivo vertical:
        - 0-30 %   → transparente  (hero = canvas bien visible)
        - 30-55 %  → transición suave
        - 55-100 % → semi-oscuro   (secciones de contenido = canvas discreto)
        El canvas es fixed al viewport, así que cuando el usuario lee contenido
        en la mitad/inferior del viewport, el overlay lo amortigua naturalmente.
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[30%] via-[rgba(6,7,12,0.38)] via-[55%] to-[rgba(6,7,12,0.68)]" />
      {/* Vignette inferior */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
