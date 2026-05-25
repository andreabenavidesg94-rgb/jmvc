import { Clock, Layers, GitBranch, Compass } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

/**
 * Sección de problema en formato editorial:
 *   - Columna izquierda: encuadre del dolor con cita destacada.
 *   - Columna derecha: 4 cards 2x2 con métricas-dolor de gran tamaño.
 *
 * Los números son DOLORES TÍPICOS percibidos por los equipos, no datos
 * universales verificados. Wording cuidadoso para no parecer claim falso.
 */
const PAINS = [
  {
    icon: Clock,
    big: '6h',
    title: 'preparando una campaña',
    body: 'Briefs, copies, audiencias, segmentación. La preparación suele comerse el día.',
    accent: 'from-brand-500/20 to-brand-400/0',
    iconColor: 'text-brand-300',
  },
  {
    icon: Layers,
    big: '3',
    title: 'plataformas distintas',
    body: 'Meta, Google y TikTok exigen formatos, copies y audiencias diferentes para cada una.',
    accent: 'from-accent-500/20 to-accent-400/0',
    iconColor: 'text-accent-400',
  },
  {
    icon: GitBranch,
    big: '20+',
    title: 'decisiones por campaña',
    body: 'Objetivo, audiencia, formato, hook, oferta, CTA, presupuesto, frecuencia, A/B…',
    accent: 'from-fuchsia-500/20 to-fuchsia-400/0',
    iconColor: 'text-fuchsia-300',
  },
  {
    icon: Compass,
    big: '0',
    title: 'claridad al empezar',
    body: 'La hoja en blanco frena más lanzamientos que la falta de presupuesto.',
    accent: 'from-amber-500/15 to-amber-400/0',
    iconColor: 'text-amber-300',
  },
];

export function Problem() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[5fr,7fr] lg:gap-16">
          {/* Columna izquierda — encuadre */}
          <RevealOnScroll variant="fade-up" className="lg:sticky lg:top-24 lg:self-start">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-brand-300">
              El problema
            </span>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Crear campañas manualmente es{' '}
              <span className="text-white/55">lento</span>,{' '}
              <span className="text-white/55">caro</span> y{' '}
              <span className="text-white/55">confuso</span>.
            </h2>
            <p className="mt-5 text-white/65">
              Briefs dispersos, copies improvisados, audiencias poco claras y
              demasiadas decisiones antes de lanzar.
            </p>

            <figure className="surface mt-8 p-5">
              <blockquote className="text-sm leading-relaxed text-white/85">
                “Sabíamos qué queríamos lanzar. El problema era que entre brief,
                copies y audiencias se nos iba la semana entera.”
              </blockquote>
              <figcaption className="mt-3 flex items-center gap-2 text-xs text-white/45">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-[11px] font-medium text-white">
                  AC
                </span>
                Equipo de marketing · ecommerce
              </figcaption>
            </figure>
          </RevealOnScroll>

          {/* Columna derecha — cards densas */}
          <RevealOnScroll variant="blur-up" delay={120}>
            <ul className="grid gap-3 sm:grid-cols-2">
            {PAINS.map((p, i) => {
              const Icon = p.icon;
              return (
                <li
                  key={p.title}
                  className={`surface relative overflow-hidden p-6 ${
                    i === 0 || i === 3 ? 'sm:translate-y-6' : ''
                  }`}
                >
                  <div
                    aria-hidden
                    className={`absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${p.accent} blur-2xl`}
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <span
                        className={`text-5xl font-semibold leading-none tracking-tight text-white md:text-6xl`}
                      >
                        {p.big}
                      </span>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                        <Icon size={14} className={p.iconColor} aria-hidden />
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-medium text-white/85">
                      {p.title}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-white/55">
                      {p.body}
                    </p>

                    {/* Mini barra decorativa */}
                    <div className="mt-4 h-0.5 overflow-hidden rounded-full bg-white/[0.04]">
                      <div
                        className={`h-full bg-gradient-to-r ${p.accent.replace('/0', '/60')}`}
                        style={{ width: `${30 + i * 18}%` }}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
            </ul>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
