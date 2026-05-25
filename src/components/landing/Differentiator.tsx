import { Check, X, Minus, Sparkles } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

/**
 * Comparativa premium de 3 columnas:
 *   - IA genérica (ChatGPT y similares)
 *   - Agencia tradicional
 *   - JMVC (columna destacada)
 *
 * Wording cuidadoso: no afirmamos automatización completa, no prometemos
 * resultados garantizados, no lanzamos publicaciones automáticas.
 */
type Cell = 'yes' | 'no' | 'partial';

interface Row {
  feature: string;
  generic: { state: Cell; note?: string };
  agency: { state: Cell; note?: string };
  jmvc: { state: Cell; note?: string };
}

const ROWS: Row[] = [
  {
    feature: 'Genera texto a partir de un prompt',
    generic: { state: 'yes' },
    agency: { state: 'partial', note: 'Manual' },
    jmvc: { state: 'yes' },
  },
  {
    feature: 'Flujo guiado específico para campañas',
    generic: { state: 'no' },
    agency: { state: 'yes', note: 'Humano' },
    jmvc: { state: 'yes' },
  },
  {
    feature: 'Estructura completa: copies + audiencias + creatividad',
    generic: { state: 'no' },
    agency: { state: 'yes' },
    jmvc: { state: 'yes' },
  },
  {
    feature: 'Adaptado a Meta, Google y TikTok Ads',
    generic: { state: 'no' },
    agency: { state: 'partial', note: 'Según equipo' },
    jmvc: { state: 'yes' },
  },
  {
    feature: 'Briefs y próximos pasos listos para tu plataforma',
    generic: { state: 'no' },
    agency: { state: 'yes' },
    jmvc: { state: 'yes' },
  },
  {
    feature: 'Disponibilidad 24/7',
    generic: { state: 'yes' },
    agency: { state: 'no', note: 'Horario laboral' },
    jmvc: { state: 'yes' },
  },
  {
    feature: 'Coste mensual asequible',
    generic: { state: 'partial', note: 'Bajo, sin contexto' },
    agency: { state: 'no', note: 'Mensualidades altas' },
    jmvc: { state: 'yes' },
  },
];

function StateCell({ state, note }: { state: Cell; note?: string }) {
  if (state === 'yes') {
    return (
      <div className="flex items-center justify-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/30">
          <Check size={13} aria-label="Sí" />
        </span>
        {note && <span className="text-[10.5px] text-emerald-200/70">{note}</span>}
      </div>
    );
  }
  if (state === 'no') {
    return (
      <div className="flex items-center justify-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-400/10 text-rose-300/80 ring-1 ring-rose-400/20">
          <X size={13} aria-label="No" />
        </span>
        {note && <span className="text-[10.5px] text-rose-200/55">{note}</span>}
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400/10 text-amber-300/85 ring-1 ring-amber-400/25">
        <Minus size={13} aria-label="Parcial" />
      </span>
      {note && <span className="text-[10.5px] text-amber-200/65">{note}</span>}
    </div>
  );
}

export function Differentiator() {
  return (
    <section className="section relative">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/30 to-transparent"
      />
      <div className="container">
        <RevealOnScroll variant="fade-up">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-brand-300">
              Diferenciador
            </span>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
              No es ChatGPT con una plantilla.
            </h2>
            <p className="mt-4 text-white/65">
              Es un flujo pensado para campañas. JMVC junta lo bueno de la IA
              generalista, lo bueno de una agencia y le quita la fricción a
              ambos.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mx-auto mt-14 max-w-5xl">
          {/* Header de columnas */}
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-12 md:col-span-5" aria-hidden />
            <div className="col-span-4 text-center md:col-span-2">
              <div className="surface px-3 py-3">
                <p className="text-[10px] font-medium uppercase tracking-wider text-white/55">
                  IA genérica
                </p>
                <p className="mt-0.5 text-[10px] text-white/35">ChatGPT y similares</p>
              </div>
            </div>
            <div className="col-span-4 text-center md:col-span-2">
              <div className="surface px-3 py-3">
                <p className="text-[10px] font-medium uppercase tracking-wider text-white/55">
                  Agencia
                </p>
                <p className="mt-0.5 text-[10px] text-white/35">Modelo tradicional</p>
              </div>
            </div>
            <div className="col-span-4 text-center md:col-span-3">
              <div className="relative overflow-hidden rounded-xl border border-brand-400/40 bg-gradient-to-b from-brand-500/[0.18] to-brand-500/[0.06] px-3 py-3 ring-1 ring-brand-400/20">
                <div
                  aria-hidden
                  className="absolute -top-12 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-brand-500/40 blur-2xl"
                />
                <p className="relative inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-brand-100">
                  <Sparkles size={11} className="text-brand-300" />
                  JMVC
                </p>
                <p className="relative mt-0.5 text-[10px] text-brand-100/70">
                  Recomendado
                </p>
              </div>
            </div>
          </div>

          {/* Filas */}
          <ul className="mt-3 overflow-hidden rounded-2xl border border-white/[0.08]">
            {ROWS.map((row, i) => (
              <li
                key={row.feature}
                className={`grid grid-cols-12 items-center gap-2 px-2 py-3 ${
                  i % 2 === 0 ? 'bg-white/[0.015]' : 'bg-transparent'
                }`}
              >
                <div className="col-span-12 px-3 text-sm text-white/85 md:col-span-5">
                  {row.feature}
                </div>
                <div className="col-span-4 md:col-span-2">
                  <StateCell {...row.generic} />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <StateCell {...row.agency} />
                </div>
                <div className="col-span-4 rounded-md bg-brand-500/[0.06] py-2 md:col-span-3">
                  <StateCell {...row.jmvc} />
                </div>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-white/40">
            JMVC genera y organiza materiales de campaña. La publicación final,
            la inversión y el rendimiento siguen dependiendo de tu equipo y de
            las plataformas de anuncios.
          </p>
        </div>
      </div>
    </section>
  );
}
