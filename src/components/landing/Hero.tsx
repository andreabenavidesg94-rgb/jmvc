import Link from 'next/link';
import { ArrowRight, PlayCircle, Sparkles } from 'lucide-react';
import { DashboardMockup } from './DashboardMockup';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Fondo decorativo */}
      <div aria-hidden className="bg-noise absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent"
      />
      <div
        aria-hidden
        className="bg-grid-pattern absolute inset-0 -z-10 opacity-30 [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"
      />

      <div className="container pb-20 pt-14 md:pb-28 md:pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/80">
              <Sparkles size={14} className="text-brand-300" />
              Campañas con IA listas en minutos
            </span>

            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">
              Crea campañas de{' '}
              <span className="gradient-text">Meta, Google y TikTok Ads</span>{' '}
              con inteligencia artificial.
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/70 md:text-lg">
              JMVC analiza tu negocio y genera estrategia, copies, creatividades
              y audiencias listas para lanzar. Sin perder horas configurando
              campañas, sin depender de una agencia y sin necesidad de saber de
              marketing técnico.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/signup"
                className="btn-primary"
                aria-label="Crear mi primera campaña con JMVC"
              >
                Crear mi primera campaña
                <ArrowRight size={18} />
              </Link>
              <Link href="/#como-funciona" className="btn-ghost">
                <PlayCircle size={18} />
                Ver cómo funciona
              </Link>
            </div>

            <p className="mt-5 text-xs text-white/45">
              Sin compromiso · Cancela cuando quieras · Pagos seguros con Paddle
            </p>
          </div>

          <div className="relative">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
