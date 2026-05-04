import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export function CtaFinal() {
  return (
    <section className="section">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-brand-600/20 via-bg-elevated to-accent-500/15 p-10 md:p-16">
          <div
            aria-hidden
            className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-brand-500/30 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl"
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Tu próxima campaña, lista hoy mismo.
            </h2>
            <p className="mt-5 text-pretty text-white/75 md:text-lg">
              Empieza a usar JMVC y crea campañas con IA para Meta, Google y
              TikTok Ads en minutos. Sin agencias, sin perder horas, sin
              promesas vacías.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/signup" className="btn-primary">
                Empezar ahora
                <ArrowRight size={18} />
              </Link>
              <Link href="/pricing" className="btn-ghost">
                Ver planes y precios
              </Link>
            </div>

            <p className="mt-5 inline-flex items-center gap-2 text-xs text-white/55">
              <ShieldCheck size={14} className="text-emerald-300" aria-hidden />
              Pagos seguros con Paddle · Cancela cuando quieras
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
