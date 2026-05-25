import { AnimatedStat } from './AnimatedStat';

/**
 * Banda premium de stats bajo el hero.
 *
 * Las cuatro métricas son de CAPACIDAD del producto, no resultados de
 * cliente. Adrede no anunciamos nada que JMVC no pueda demostrar.
 *
 * Detalles de los valores:
 * - "3+" plataformas → numérico: anima 0→3 y se concatena el "+".
 * - "<5 min" → numérico: anima 0→5; el "<" y " min" son fijos.
 * - "24/7" → SYMBOLIC: si lo animáramos como número, en frames
 *   intermedios saldría "8/7" o "12/7" que parece un bug.
 * - "1 panel" → SYMBOLIC: animar 0→1 dejaría el frame inicial en "0",
 *   que se lee como métrica vacía. Aparece directamente en 1.
 */
export function StatsCounter() {
  return (
    <section
      aria-label="Capacidades de JMVC"
      className="relative -mt-2 overflow-hidden"
    >
      {/* Línea luminosa superior */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/50 to-transparent"
      />
      {/* Línea luminosa inferior */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-400/40 to-transparent"
      />
      {/* Glow ambient */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-32 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/10 blur-3xl"
      />

      <div className="container py-12 md:py-14">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.015] backdrop-blur-xl">
          <ul className="grid grid-cols-2 lg:grid-cols-4">
            <li className="border-b border-white/[0.06] p-7 lg:border-b-0 lg:border-r">
              <AnimatedStat value={3} suffix="+" label="Plataformas preparadas" hint="Meta · Google · TikTok Ads" />
            </li>
            <li className="border-b border-white/[0.06] p-7 lg:border-b-0 lg:border-r">
              <AnimatedStat value={5} prefix="<" suffix=" min" label="Para generar una campaña" hint="Estructura, copies y audiencias" />
            </li>
            <li className="border-r border-white/[0.06] p-7 lg:border-r">
              <AnimatedStat value={24} display="24/7" mode="symbolic" label="IA trabajando para ti" hint="Sin esperar a la agencia" />
            </li>
            <li className="p-7">
              <AnimatedStat value={1} mode="symbolic" label="Panel para centralizar todo" hint="Briefs, copies y audiencias" />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
