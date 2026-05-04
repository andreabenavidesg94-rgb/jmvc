import { Brain, Compass, Wand2, Users, Lightbulb, Activity } from 'lucide-react';

const PILLARS = [
  {
    icon: Brain,
    title: 'Analiza tu negocio',
    body: 'Entiende producto, propuesta de valor, público objetivo y objetivos para construir una base sólida.',
  },
  {
    icon: Compass,
    title: 'Recomienda estrategia',
    body: 'Sugiere estructura de embudo, canales prioritarios y enfoque general para tu caso concreto.',
  },
  {
    icon: Wand2,
    title: 'Genera textos publicitarios',
    body: 'Copies adaptados a Meta, Google y TikTok Ads, listos para usar y probar varias variantes.',
  },
  {
    icon: Users,
    title: 'Propone audiencias',
    body: 'Ideas de segmentación inteligente para llegar a las personas más relevantes en cada plataforma.',
  },
  {
    icon: Lightbulb,
    title: 'Sugiere ideas creativas',
    body: 'Ángulos, hooks y conceptos visuales para anuncios estáticos y vídeo.',
  },
  {
    icon: Activity,
    title: 'Mide y optimiza',
    body: 'Panel claro para detectar qué está funcionando y qué iterar para mejorar resultados.',
  },
];

export function Solution() {
  return (
    <section className="section relative">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-brand-300">
            La solución
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Una plataforma de IA pensada para lanzar campañas reales.
          </h2>
          <p className="mt-4 text-white/65">
            JMVC reúne en un solo lugar todo lo que necesitas para crear, lanzar
            y mejorar campañas en Meta Ads, Google Ads y TikTok Ads.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, body }) => (
            <li key={title} className="card group">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500/20 to-accent-500/20 text-white ring-1 ring-white/10">
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
