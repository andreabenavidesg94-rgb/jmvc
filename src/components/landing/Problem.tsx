import { Clock, MessageSquareWarning, Wallet, LineChart } from 'lucide-react';

const ITEMS = [
  {
    icon: Clock,
    title: 'Pierdes horas configurando campañas',
    body: 'Cada nueva campaña implica abrir varias plataformas, definir audiencias, escribir copies y duplicar trabajo manualmente.',
  },
  {
    icon: MessageSquareWarning,
    title: 'No sabes qué copy, oferta o creatividad usar',
    body: 'Probar a ciegas cuesta tiempo y dinero. La hoja en blanco frena los lanzamientos.',
  },
  {
    icon: Wallet,
    title: 'Las agencias son caras y lentas',
    body: 'Mensualidades altas, plazos largos y procesos rígidos para algo que tu negocio necesita ya.',
  },
  {
    icon: LineChart,
    title: 'Es difícil saber qué optimizar',
    body: 'Métricas dispersas en distintos dashboards y poca claridad sobre qué cambiar para mejorar resultados.',
  },
];

export function Problem() {
  return (
    <section className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Crear campañas manualmente es lento, caro y confuso.
          </h2>
          <p className="mt-4 text-white/65">
            La mayoría de negocios saben que necesitan publicidad digital, pero
            tropiezan siempre con los mismos obstáculos.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ icon: Icon, title, body }) => (
            <li key={title} className="card transition hover:border-white/15">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/15 text-brand-200 ring-1 ring-brand-400/20">
                <Icon size={20} />
              </div>
              <h3 className="text-base font-medium text-white">{title}</h3>
              <p className="mt-2 text-sm text-white/60">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
