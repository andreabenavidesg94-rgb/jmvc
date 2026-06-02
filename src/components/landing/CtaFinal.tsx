import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';
import { RobotAssistant } from './RobotAssistant';

export function CtaFinal() {
  return (
    <section className="section">
      <div className="container">
        <RevealOnScroll variant="blur-up">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.12] p-8 md:p-16">
            {/* Fondo con gradiente intenso */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-600/[0.22] via-bg to-accent-600/[0.18]"
            />
            {/* Glows decorativos — más intensos */}
            <div
              aria-hidden
              className="glow-orb-brand absolute -right-24 -top-24 h-[480px] w-[480px] opacity-80"
            />
            <div
              aria-hidden
              className="glow-orb-cyan absolute -bottom-32 -left-32 h-[440px] w-[440px] opacity-70"
            />
            <div
              aria-hidden
              className="glow-orb-fuchsia absolute right-1/3 top-1/4 h-52 w-52 opacity-60"
            />
            {/* Grid sutil */}
            <div
              aria-hidden
              className="bg-grid-pattern absolute inset-0 opacity-20 [background-size:36px_36px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
            />
            {/* Highlight cenital */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
            />

            <div className="relative grid items-center gap-12 lg:grid-cols-[1.2fr,1fr]">
              {/* Texto + CTA */}
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/[0.12] px-3 py-1.5 text-xs text-brand-100">
                  <Zap size={12} className="text-brand-300" aria-hidden />
                  Lanza más, decide menos
                </span>

                <h2 className="mt-6 text-balance text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-[52px] lg:leading-[1.04]">
                  Convierte tu próxima idea en una{' '}
                  <span className="gradient-text text-glow-brand">
                    campaña lista para probar
                  </span>
                  .
                </h2>
                <p className="mt-5 max-w-xl text-pretty text-white/70 md:text-lg">
                  Prepara estrategia, copies, audiencias e ideas creativas en un
                  solo flujo de trabajo.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link href="/signup" className="btn-primary px-6 py-3.5 text-base">
                    Crear mi primera campaña
                    <ArrowRight size={18} aria-hidden />
                  </Link>
                  <Link href="/pricing" className="btn-ghost px-6 py-3.5 text-base">
                    Ver planes y precios
                  </Link>
                </div>

                <div className="mt-6 flex flex-wrap gap-4 text-xs text-white/45">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-emerald-400" aria-hidden />
                    Setup rápido
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-emerald-400" aria-hidden />
                    Cancela cuando quieras
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-emerald-400" aria-hidden />
                    Pagos seguros con Paddle
                  </span>
                </div>
              </div>

              {/* Robot + badge */}
              <div
                aria-hidden="true"
                className="relative mx-auto hidden lg:block"
              >
                {/* Anillo de glow detrás del robot */}
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.3),transparent_65%)] blur-2xl" />
                <RobotAssistant size="lg" />
                <div className="mt-4 flex flex-col items-center gap-2">
                  <span className="chip border-brand-400/30 bg-brand-500/10 text-brand-100">
                    <span className="live-dot" /> Listo para asistirte
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-white/35">
                    <Sparkles size={9} className="text-brand-400" />
                    IA disponible 24/7
                  </span>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
