import {
  Rocket,
  PenTool,
  ImagePlus,
  Crosshair,
  ListChecks,
  LayoutDashboard,
  Megaphone,
  GraduationCap,
} from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

const FEATURED = [
  {
    icon: Rocket,
    title: 'Campañas listas en minutos',
    body: 'De idea a campaña estructurada sin pasar horas configurando. El flujo guiado de JMVC elimina la hoja en blanco y te lleva directo al resultado.',
    stat: '<5 min',
    statLabel: 'por campaña completa',
    gradient: 'from-brand-500/20 via-brand-600/5 to-transparent',
    iconBg: 'from-brand-500 to-brand-600',
    glow: 'bg-brand-500/20',
    accentBorder: 'border-brand-400/20',
    statColor: 'text-brand-200',
  },
  {
    icon: PenTool,
    title: 'Copies persuasivos por IA',
    body: 'Variantes de copy adaptadas al tono, plataforma y formato de cada anuncio. Hooks, CTAs y texto de soporte listos para probar.',
    stat: '3+',
    statLabel: 'variantes por anuncio',
    gradient: 'from-accent-500/20 via-accent-600/5 to-transparent',
    iconBg: 'from-accent-500 to-accent-600',
    glow: 'bg-accent-500/20',
    accentBorder: 'border-accent-400/20',
    statColor: 'text-accent-300',
  },
];

const REGULAR = [
  {
    icon: ImagePlus,
    title: 'Ideas de creatividades',
    body: 'Conceptos visuales y hooks para anuncios estáticos y vídeo corto.',
    iconColor: 'text-fuchsia-300',
    iconBg: 'bg-fuchsia-500/10 ring-fuchsia-400/20',
    hoverGlow: 'hover:shadow-[0_0_24px_rgba(217,70,239,0.12)]',
  },
  {
    icon: Crosshair,
    title: 'Segmentación inteligente',
    body: 'Audiencias sugeridas en función de tu producto y objetivo de campaña.',
    iconColor: 'text-violet-300',
    iconBg: 'bg-violet-500/10 ring-violet-400/20',
    hoverGlow: 'hover:shadow-[0_0_24px_rgba(167,139,250,0.12)]',
  },
  {
    icon: ListChecks,
    title: 'Estructura clara de campaña',
    body: 'Brief listo para llevar al gestor de Meta, Google o TikTok Ads.',
    iconColor: 'text-emerald-300',
    iconBg: 'bg-emerald-500/10 ring-emerald-400/20',
    hoverGlow: 'hover:shadow-[0_0_24px_rgba(52,211,153,0.12)]',
  },
  {
    icon: LayoutDashboard,
    title: 'Todo en un solo panel',
    body: 'Briefs, copies, audiencias e ideas creativas centralizados.',
    iconColor: 'text-brand-300',
    iconBg: 'bg-brand-500/10 ring-brand-400/20',
    hoverGlow: 'hover:shadow-[0_0_24px_rgba(99,102,241,0.12)]',
  },
  {
    icon: Megaphone,
    title: 'Meta, Google y TikTok Ads',
    body: 'Pensado para los tres canales con más gasto publicitario.',
    iconColor: 'text-amber-300',
    iconBg: 'bg-amber-500/10 ring-amber-400/20',
    hoverGlow: 'hover:shadow-[0_0_24px_rgba(251,191,36,0.10)]',
  },
  {
    icon: GraduationCap,
    title: 'Sin experiencia técnica',
    body: 'Pensado para que cualquier persona del negocio pueda usarlo.',
    iconColor: 'text-cyan-300',
    iconBg: 'bg-cyan-500/10 ring-cyan-400/20',
    hoverGlow: 'hover:shadow-[0_0_24px_rgba(34,211,238,0.12)]',
  },
];

export function Benefits() {
  return (
    <section id="beneficios" className="section scroll-mt-24">
      <div className="container">
        {/* Header */}
        <RevealOnScroll variant="fade-up">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-brand-300">
              Beneficios
            </span>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Todo lo que necesitas para hacer publicidad{' '}
              <span className="gradient-text">de forma constante.</span>
            </h2>
          </div>
        </RevealOnScroll>

        {/* Fila de tarjetas featured — anchas */}
        <RevealOnScroll variant="blur-up" delay={100}>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {FEATURED.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`benefit-card relative overflow-hidden bg-gradient-to-br ${item.gradient} ${item.accentBorder}`}
                >
                  {/* Glow detrás */}
                  <div
                    aria-hidden
                    className={`absolute -right-16 -top-16 h-48 w-48 rounded-full ${item.glow} blur-3xl`}
                  />

                  <div className="relative flex h-full flex-col">
                    {/* Cabecera: icono + stat */}
                    <div className="flex items-start justify-between">
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.iconBg} shadow-lg shadow-black/20 ring-1 ring-white/15`}
                      >
                        <Icon size={22} className="text-white" aria-hidden />
                      </span>
                      <div className="text-right">
                        <p className={`text-4xl font-bold tracking-tight ${item.statColor}`}>
                          {item.stat}
                        </p>
                        <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/40">
                          {item.statLabel}
                        </p>
                      </div>
                    </div>

                    {/* Texto */}
                    <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{item.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </RevealOnScroll>

        {/* Grid regular — 6 tarjetas 3×2 */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REGULAR.map((item, i) => {
            const Icon = item.icon;
            return (
              <RevealOnScroll
                key={item.title}
                variant="fade-up"
                delay={80 + i * 60}
              >
                <div className={`benefit-card h-full transition-shadow duration-300 ${item.hoverGlow}`}>
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${item.iconBg} ring-1`}
                  >
                    <Icon size={18} className={item.iconColor} aria-hidden />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{item.body}</p>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
