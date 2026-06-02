import { RevealOnScroll } from './RevealOnScroll';
import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    initials: 'LM',
    name: 'Laura M.',
    role: 'Ecommerce de moda sostenible',
    result: 'De 6 h a 45 min',
    resultLabel: 'tiempo de creación',
    quote:
      'Reducimos el tiempo de creación de campañas de seis horas a menos de cuarenta y cinco minutos. Lo que antes era un cuello de botella ahora se hace en una mañana.',
    featured: true,
    avatarGradient: 'from-brand-500 to-accent-500',
    accentColor: 'text-brand-300',
    accentBg: 'bg-brand-500/10 border-brand-400/20',
  },
  {
    initials: 'CD',
    name: 'Carlos D.',
    role: 'Negocio local de servicios',
    result: 'Lanzamientos semanales',
    resultLabel: 'sin agencia externa',
    quote:
      'Pudimos lanzar campañas semanales sin depender de una agencia externa. La estructura que sugiere JMVC nos ahorra muchas dudas y vueltas.',
    featured: false,
    avatarGradient: 'from-fuchsia-500 to-violet-500',
    accentColor: 'text-fuchsia-300',
    accentBg: 'bg-fuchsia-500/10 border-fuchsia-400/20',
  },
  {
    initials: 'AR',
    name: 'Ana R.',
    role: 'Freelance marketing digital',
    result: 'Más orden y consistencia',
    resultLabel: 'desde el primer día',
    quote:
      'Nos ayudó a ordenar nuestras ideas, copies y audiencias en un solo lugar. Ahora cada cliente tiene un punto de partida sólido desde el día uno.',
    featured: false,
    avatarGradient: 'from-accent-500 to-cyan-500',
    accentColor: 'text-accent-400',
    accentBg: 'bg-accent-500/10 border-accent-400/20',
  },
];

export function Testimonials() {
  const [main, ...rest] = TESTIMONIALS;

  return (
    <section className="section">
      <div className="container">
        {/* Header */}
        <RevealOnScroll variant="fade-up">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-brand-300">
              Lo que dicen
            </span>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Negocios reales sacando{' '}
              <span className="gradient-text">más partido a su publicidad.</span>
            </h2>
          </div>
        </RevealOnScroll>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.4fr,1fr,1fr]">
          {/* Testimonial featured — columna ancha */}
          <RevealOnScroll variant="blur-up" delay={80}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.10] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-7 shadow-xl shadow-black/20">
              {/* Glow de fondo */}
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-500/15 blur-3xl"
              />
              <div
                aria-hidden
                className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-accent-500/10 blur-3xl"
              />

              {/* Icono quote */}
              <Quote
                size={32}
                className="relative text-brand-400/50"
                aria-hidden
              />

              <blockquote className="relative mt-4 flex-1 text-base leading-relaxed text-white/85">
                &ldquo;{main.quote}&rdquo;
              </blockquote>

              {/* Resultado destacado */}
              <div className={`relative mt-6 inline-flex w-fit items-baseline gap-2 rounded-xl border p-3 ${main.accentBg}`}>
                <p className={`text-3xl font-bold tracking-tight ${main.accentColor}`}>
                  {main.result}
                </p>
                <p className="text-xs text-white/45">{main.resultLabel}</p>
              </div>

              {/* Autor */}
              <div className="relative mt-5 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                <span
                  aria-hidden
                  className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${main.avatarGradient} text-sm font-semibold text-white shadow-lg ring-2 ring-white/10`}
                >
                  {main.initials}
                </span>
                <div>
                  <p className="text-sm font-medium text-white">{main.name}</p>
                  <p className="text-xs text-white/50">{main.role}</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Columna derecha: 2 testimonials apilados */}
          <div className="contents lg:col-span-1 lg:flex lg:flex-col lg:gap-5">
            {rest.map((t, i) => (
              <RevealOnScroll
                key={t.name}
                variant="fade-up"
                delay={160 + i * 100}
                className="flex"
              >
                <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                  <Quote size={22} className="text-white/20" aria-hidden />
                  <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-white/75">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <p
                    className={`mt-4 inline-flex w-fit rounded-full border px-2.5 py-1 text-[11px] font-medium ${t.accentBg} ${t.accentColor}`}
                  >
                    {t.result}
                  </p>

                  <div className="mt-4 flex items-center gap-2.5 border-t border-white/[0.06] pt-4">
                    <span
                      aria-hidden
                      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.avatarGradient} text-xs font-semibold text-white ring-1 ring-white/10`}
                    >
                      {t.initials}
                    </span>
                    <div className="text-xs">
                      <p className="font-medium text-white">{t.name}</p>
                      <p className="text-white/50">{t.role}</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-xs text-white/35">
          Los resultados varían según el negocio, el producto y la inversión
          publicitaria. JMVC no garantiza resultados específicos.
        </p>
      </div>
    </section>
  );
}
