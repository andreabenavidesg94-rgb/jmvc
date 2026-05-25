import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';
import { RobotAssistant } from './RobotAssistant';

export function CtaFinal() {
  return (
    <section className="section">
      <div className="container">
        <RevealOnScroll variant="blur-up">
          <div className="surface relative overflow-hidden p-8 md:p-14">
            {/* Glows decorativos */}
            <div aria-hidden className="glow-orb-brand absolute -right-24 -top-32 h-80 w-80" />
            <div aria-hidden className="glow-orb-cyan absolute -bottom-24 -left-24 h-80 w-80" />
            <div aria-hidden className="glow-orb-fuchsia absolute right-1/3 top-1/2 h-40 w-40" />
            {/* Grid sutil */}
            <div
              aria-hidden
              className="bg-grid-pattern absolute inset-0 opacity-20 [background-size:36px_36px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
            />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr,1fr]">
              {/* Texto + CTA */}
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs text-white/85">
                  <Sparkles size={12} className="text-brand-300" aria-hidden />
                  Lanza más, decide menos
                </span>

                <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
                  Convierte tu próxima idea en una{' '}
                  <span className="gradient-text">campaña lista para probar</span>.
                </h2>
                <p className="mt-5 max-w-xl text-pretty text-white/75 md:text-lg">
                  Prepara estrategia, copies, audiencias e ideas creativas en un
                  solo flujo de trabajo.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link href="/signup" className="btn-primary">
                    Crear mi primera campaña
                    <ArrowRight size={18} aria-hidden />
                  </Link>
                  <Link href="/pricing" className="btn-ghost">
                    Ver planes y precios
                  </Link>
                </div>

                <p className="mt-5 inline-flex items-center gap-2 text-xs text-white/55">
                  <ShieldCheck size={14} className="text-emerald-300" aria-hidden />
                  Setup rápido · Cancela cuando quieras · Pagos seguros
                </p>
              </div>

              {/* Robot mini centrado */}
              <div
                aria-hidden="true"
                className="relative mx-auto hidden lg:block"
              >
                <RobotAssistant size="lg" />
                <div className="mt-3 text-center">
                  <span className="chip">
                    <span className="live-dot" /> Listo para asistirte
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
