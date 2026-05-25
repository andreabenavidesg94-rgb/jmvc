'use client';

import { useState } from 'react';
import { Check, Sparkles, ShieldCheck } from 'lucide-react';
import { PLAN_LIST, type BillingCycle, type PlanId } from '@/lib/plans';
import { openPaddleCheckout } from '@/lib/paddle/client';

interface PricingProps {
  /** ID del usuario actual si existe (cuando haya auth real). */
  currentUserId?: string;
  /** Email del usuario actual si existe (para prellenar checkout). */
  currentUserEmail?: string;
  /** Plan actualmente activo (para marcar visualmente). */
  currentPlan?: PlanId | null;
}

export function Pricing({
  currentUserId,
  currentUserEmail,
  currentPlan,
}: PricingProps = {}) {
  const [cycle, setCycle] = useState<BillingCycle>('monthly');
  const [loadingPlan, setLoadingPlan] = useState<PlanId | null>(null);

  async function onSelect(plan: PlanId) {
    setLoadingPlan(plan);
    try {
      await openPaddleCheckout({
        plan,
        cycle,
        userId: currentUserId,
        customerEmail: currentUserEmail,
        source: 'pricing-section',
      });
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <section id="precios" className="section scroll-mt-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-brand-300">
            Precios
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Elige el plan que se adapta a tu negocio.
          </h2>
          <p className="mt-4 text-white/65">
            Sin compromiso, sin contratos largos. Cambia o cancela cuando quieras.
          </p>

          {/* Toggle mensual / anual */}
          <div
            role="group"
            aria-label="Frecuencia de facturación"
            className="mx-auto mt-8 inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1 text-sm"
          >
            <button
              type="button"
              aria-pressed={cycle === 'monthly'}
              onClick={() => setCycle('monthly')}
              className={`rounded-full px-4 py-1.5 transition ${
                cycle === 'monthly'
                  ? 'bg-white text-bg shadow'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Mensual
            </button>
            <button
              type="button"
              aria-pressed={cycle === 'yearly'}
              onClick={() => setCycle('yearly')}
              className={`rounded-full px-4 py-1.5 transition ${
                cycle === 'yearly'
                  ? 'bg-white text-bg shadow'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Anual
              <span className="ml-2 rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] text-emerald-300">
                ahorra 2 meses
              </span>
            </button>
          </div>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {PLAN_LIST.map((plan) => {
            const price = cycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
            const perLabel = cycle === 'monthly' ? '/mes' : '/año';
            const isCurrent = currentPlan === plan.id;

            return (
              <li
                key={plan.id}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border p-7 transition ${
                  plan.highlight
                    ? 'border-brand-400/40 bg-gradient-to-b from-brand-500/[0.12] via-brand-500/[0.04] to-transparent shadow-2xl shadow-brand-700/20 ring-1 ring-brand-400/20'
                    : 'surface'
                }`}
              >
                {/* Decoración de fondo solo en el plan destacado */}
                {plan.highlight && (
                  <>
                    <div
                      aria-hidden
                      className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-500/30 blur-3xl"
                    />
                    <div
                      aria-hidden
                      className="absolute -bottom-20 -left-12 h-40 w-40 rounded-full bg-accent-500/20 blur-3xl"
                    />
                  </>
                )}

                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full border border-brand-400/50 bg-gradient-to-r from-brand-500 to-accent-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-lg shadow-brand-700/30">
                    <Sparkles size={12} aria-hidden /> Más popular
                  </span>
                )}

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                    {plan.highlight && (
                      <span className="chip border-brand-400/30 text-brand-100">
                        Recomendado
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-white/55">{plan.tagline}</p>

                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span
                      className={`text-5xl font-semibold tracking-tight ${
                        plan.highlight ? 'gradient-text' : 'text-white'
                      }`}
                    >
                      {price}€
                    </span>
                    <span className="text-sm text-white/55">{perLabel}</span>
                  </div>
                  {cycle === 'yearly' && (
                    <p className="mt-1 text-xs text-white/45">
                      Equivale a {(price / 12).toFixed(0)}€/mes facturado anualmente
                    </p>
                  )}

                  {/* Línea separadora con luz */}
                  <div className="mt-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  <ul className="mt-6 space-y-2.5 text-sm text-white/80">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span
                          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                            plan.highlight
                              ? 'bg-brand-500/20 text-brand-200'
                              : 'bg-white/[0.06] text-white/70'
                          }`}
                        >
                          <Check size={11} aria-hidden />
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => onSelect(plan.id)}
                    disabled={loadingPlan === plan.id || isCurrent}
                    className={`mt-7 ${
                      plan.highlight ? 'btn-primary' : 'btn-ghost'
                    } w-full disabled:cursor-not-allowed disabled:opacity-60`}
                    aria-label={`Seleccionar plan ${plan.name}`}
                  >
                    {isCurrent
                      ? 'Plan actual'
                      : loadingPlan === plan.id
                        ? 'Abriendo checkout…'
                        : plan.ctaLabel}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-2 text-center text-xs text-white/55">
          <ShieldCheck size={14} className="text-emerald-300" aria-hidden />
          Pagos seguros con Paddle · Cancela cuando quieras · Sin permanencia
        </p>
      </div>
    </section>
  );
}
