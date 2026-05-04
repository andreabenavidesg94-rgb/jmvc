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
                className={`relative flex flex-col rounded-2xl border p-7 transition ${
                  plan.highlight
                    ? 'border-brand-400/40 bg-gradient-to-b from-brand-500/[0.08] to-transparent shadow-2xl shadow-brand-700/10'
                    : 'border-white/[0.08] bg-white/[0.02]'
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full border border-brand-400/40 bg-bg px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-brand-200">
                    <Sparkles size={12} /> Más popular
                  </span>
                )}

                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <p className="mt-1 text-sm text-white/55">{plan.tagline}</p>

                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold tracking-tight text-white">
                    {price}€
                  </span>
                  <span className="text-sm text-white/55">{perLabel}</span>
                </div>
                {cycle === 'yearly' && (
                  <p className="mt-1 text-xs text-white/45">
                    Equivale a {(price / 12).toFixed(0)}€/mes facturado anualmente
                  </p>
                )}

                <ul className="mt-6 space-y-2.5 text-sm text-white/80">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 shrink-0 text-brand-300" aria-hidden />
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
