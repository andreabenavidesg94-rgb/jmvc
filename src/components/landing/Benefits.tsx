import {
  Rocket,
  PenTool,
  ImagePlus,
  Crosshair,
  TrendingUp,
  GaugeCircle,
  Megaphone,
  GraduationCap,
} from 'lucide-react';

const BENEFITS = [
  { icon: Rocket, title: 'Campañas listas en minutos', body: 'De idea a campaña estructurada sin pasar horas configurando.' },
  { icon: PenTool, title: 'Copies persuasivos por IA', body: 'Variantes adaptadas a cada plataforma y formato de anuncio.' },
  { icon: ImagePlus, title: 'Ideas de creatividades', body: 'Conceptos visuales y hooks para anuncios estáticos y vídeo.' },
  { icon: Crosshair, title: 'Segmentación inteligente', body: 'Audiencias sugeridas en función de tu producto y objetivo.' },
  { icon: TrendingUp, title: 'Optimización basada en datos', body: 'Recomendaciones para ajustar lo que está funcionando peor.' },
  { icon: GaugeCircle, title: 'Panel simple de métricas', body: 'Datos importantes en un solo lugar, sin ruido innecesario.' },
  { icon: Megaphone, title: 'Meta, Google y TikTok Ads', body: 'Compatibilidad pensada para los tres canales más usados hoy.' },
  { icon: GraduationCap, title: 'Sin experiencia técnica', body: 'Pensado para que cualquier persona del negocio pueda usarlo.' },
];

export function Benefits() {
  return (
    <section id="beneficios" className="section scroll-mt-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-brand-300">
            Beneficios
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Todo lo que necesitas para hacer publicidad de forma constante.
          </h2>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="card transition hover:-translate-y-0.5 hover:border-white/15"
            >
              <Icon size={22} className="text-brand-300" aria-hidden />
              <h3 className="mt-4 text-base font-medium text-white">{title}</h3>
              <p className="mt-2 text-sm text-white/60">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
