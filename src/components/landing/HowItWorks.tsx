const STEPS = [
  {
    n: '01',
    title: 'Describe tu negocio y tu objetivo',
    body: 'Cuéntale a JMVC qué vendes, a quién y qué quieres conseguir. Ventas, leads, instalaciones, llamadas, lo que sea.',
  },
  {
    n: '02',
    title: 'JMVC genera tu campaña',
    body: 'Estructura, copies, ideas creativas y audiencias para Meta, Google o TikTok Ads, listos para revisar y publicar.',
  },
  {
    n: '03',
    title: 'Publica, mide y optimiza',
    body: 'Lanza desde tus cuentas publicitarias y usa el panel de JMVC para entender qué funciona y qué iterar.',
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="section relative scroll-mt-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-brand-300">
            Cómo funciona
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
            De idea a campaña lista en tres pasos.
          </h2>
        </div>

        <ol className="relative mt-14 grid gap-6 md:grid-cols-3">
          {/* Línea decorativa */}
          <div
            aria-hidden
            className="absolute left-8 right-8 top-10 hidden h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent md:block"
          />
          {STEPS.map((step) => (
            <li key={step.n} className="card relative">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-bg-elevated font-mono text-sm text-brand-200 ring-1 ring-brand-400/30">
                {step.n}
              </div>
              <h3 className="text-lg font-medium text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-white/65">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
