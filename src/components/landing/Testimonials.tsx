const TESTIMONIALS = [
  {
    initials: 'LM',
    name: 'Laura M.',
    role: 'Ecommerce de moda sostenible',
    result: 'Tiempo de creación: de 6 h a 45 min',
    quote:
      'Reducimos el tiempo de creación de campañas de seis horas a menos de cuarenta y cinco minutos. Lo que antes era un cuello de botella ahora se hace en una mañana.',
  },
  {
    initials: 'CD',
    name: 'Carlos D.',
    role: 'Negocio local de servicios',
    result: 'Lanzamientos semanales sin agencia',
    quote:
      'Pudimos lanzar campañas semanales sin depender de una agencia externa. La estructura que sugiere JMVC nos ahorra muchas dudas y vueltas.',
  },
  {
    initials: 'AR',
    name: 'Ana R.',
    role: 'Freelance marketing digital',
    result: 'Más orden y consistencia',
    quote:
      'Nos ayudó a ordenar nuestras ideas, copies y audiencias en un solo lugar. Ahora cada cliente tiene un punto de partida sólido desde el día uno.',
  },
];

export function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-brand-300">
            Lo que dicen
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Negocios reales sacando más partido a su publicidad.
          </h2>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <li key={t.name} className="card flex h-full flex-col">
              <p className="text-sm leading-relaxed text-white/80">“{t.quote}”</p>

              <div className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-4">
                <span
                  aria-hidden
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-semibold text-white"
                >
                  {t.initials}
                </span>
                <div className="text-xs">
                  <p className="font-medium text-white">{t.name}</p>
                  <p className="text-white/55">{t.role}</p>
                </div>
              </div>

              <p className="mt-3 inline-flex w-fit rounded-full border border-emerald-400/20 bg-emerald-400/5 px-2 py-0.5 text-[11px] text-emerald-200/90">
                {t.result}
              </p>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-10 max-w-3xl text-center text-xs text-white/40">
          Los resultados varían según el negocio, el producto y la inversión
          publicitaria. JMVC no garantiza resultados específicos.
        </p>
      </div>
    </section>
  );
}
