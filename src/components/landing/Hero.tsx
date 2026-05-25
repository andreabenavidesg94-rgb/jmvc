import Link from 'next/link';
import { ArrowRight, PlayCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { DashboardMockup } from './DashboardMockup';
import { RevealOnScroll } from './RevealOnScroll';
import { RobotAssistant } from './RobotAssistant';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Capa de grid sutil sobre el fondo global de partículas */}
      <div
        aria-hidden
        className="bg-grid-pattern absolute inset-0 -z-10 opacity-25 [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"
      />
      {/* Glows extra puntuales */}
      <div aria-hidden className="glow-orb-brand absolute -left-32 top-32 -z-10 h-80 w-80" />
      <div aria-hidden className="glow-orb-cyan absolute -right-32 top-10 -z-10 h-80 w-80" />
      <div aria-hidden className="glow-orb-fuchsia absolute left-1/2 top-2/3 -z-10 h-32 w-2/3 -translate-x-1/2" />

      <div className="container pb-20 pt-14 md:pb-28 md:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr,1fr] lg:gap-16">
          <div>
            <RevealOnScroll variant="fade-up">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/40 bg-brand-500/[0.10] px-3 py-1 text-xs text-brand-100">
                  <Sparkles size={14} className="text-brand-300" aria-hidden />
                  Copiloto de IA para campañas
                </span>
                <span className="chip">
                  <span className="live-dot" /> Disponible
                </span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll variant="blur-up" delay={120}>
              <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.04] tracking-tight text-white md:text-6xl lg:text-[64px]">
                Convierte una idea en una{' '}
                <span className="gradient-text">campaña lista para probar</span>{' '}
                <span className="text-white/85">en minutos.</span>
              </h1>
            </RevealOnScroll>

            <RevealOnScroll variant="fade-up" delay={220}>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/75 md:text-lg">
                JMVC prepara estrategia, copies, audiencias e ideas creativas
                para campañas en Meta Ads, Google Ads y TikTok Ads, desde un
                solo flujo de trabajo.
              </p>
            </RevealOnScroll>

            <RevealOnScroll variant="fade-up" delay={320}>
              <ul className="mt-6 flex flex-wrap gap-2 text-xs text-white/70">
                {[
                  'Brief inteligente',
                  'Motor creativo',
                  'Audiencias sugeridas',
                  'Export a tu plataforma',
                ].map((f) => (
                  <li key={f} className="chip">
                    {f}
                  </li>
                ))}
              </ul>
            </RevealOnScroll>

            <RevealOnScroll variant="fade-up" delay={420}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/signup"
                  className="btn-primary"
                  aria-label="Crear mi primera campaña con JMVC"
                >
                  Crear mi primera campaña
                  <ArrowRight size={18} aria-hidden />
                </Link>
                <Link href="/#como-funciona" className="btn-ghost">
                  <PlayCircle size={18} aria-hidden />
                  Ver cómo funciona
                </Link>
              </div>
              <p className="mt-5 inline-flex items-center gap-2 text-xs text-white/55">
                <ShieldCheck size={14} className="text-emerald-300" aria-hidden />
                Setup rápido · Cancela cuando quieras · Pagos seguros
              </p>
            </RevealOnScroll>
          </div>

          {/* Mockup + robot lateral */}
          <RevealOnScroll variant="blur-up" delay={200} className="relative">
            <DashboardMockup />

            {/* Robot pegado al mockup, oculto en móvil para no ensuciar */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-10 hidden lg:block"
            >
              <RobotAssistant size="md" />
            </div>
          </RevealOnScroll>
        </div>
      </div>

      {/* Línea luminosa al pie del hero */}
      <div className="container">
        <div className="glow-line" />
      </div>
    </section>
  );
}
