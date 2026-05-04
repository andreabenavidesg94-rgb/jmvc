import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { NoSubmitForm } from '@/components/NoSubmitForm';
import { PLANS, type PlanId, type BillingCycle } from '@/lib/plans';

export const metadata: Metadata = {
  title: 'Crear cuenta',
  description: 'Crea tu cuenta de JMVC y empieza a generar campañas con IA.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/signup' },
};

interface PageProps {
  searchParams: { plan?: string; cycle?: string };
}

const VALID_PLANS = new Set<PlanId>(['starter', 'growth', 'agency']);
const VALID_CYCLES = new Set<BillingCycle>(['monthly', 'yearly']);

function parsePlan(value: string | undefined): PlanId | undefined {
  return value && VALID_PLANS.has(value as PlanId) ? (value as PlanId) : undefined;
}

function parseCycle(value: string | undefined): BillingCycle {
  return value && VALID_CYCLES.has(value as BillingCycle)
    ? (value as BillingCycle)
    : 'monthly';
}

/**
 * Placeholder profesional para signup.
 *
 * Acepta query params:
 *   /signup?plan=starter
 *   /signup?plan=growth&cycle=yearly
 *   /signup?plan=agency&cycle=monthly
 *
 * Tras conectar auth real:
 *   1) Validar email + password (server action / API route).
 *   2) Crear usuario en BBDD.
 *   3) Iniciar sesión.
 *   4) Si trae `plan` en query → llamar a `openPaddleCheckout` con el userId
 *      recién creado y redirigir a Paddle.
 *   5) Si no trae `plan` → redirigir a /dashboard.
 */
export default function SignupPage({ searchParams }: PageProps) {
  const planQ = parsePlan(searchParams.plan);
  const cycleQ = parseCycle(searchParams.cycle);
  const selectedPlan = planQ ? PLANS[planQ] : null;

  return (
    <>
      <Header />
      <main id="main" className="container flex min-h-[70vh] items-center py-16">
        <div className="mx-auto w-full max-w-md">
          <div className="card">
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Crear cuenta
            </h1>
            <p className="mt-1 text-sm text-white/60">
              Empieza a usar JMVC en menos de un minuto.
            </p>

            {selectedPlan && (
              <div
                role="status"
                className="mt-5 flex items-start justify-between rounded-lg border border-brand-400/20 bg-brand-500/[0.06] p-3 text-sm"
              >
                <div>
                  <p className="font-medium text-white">
                    Plan {selectedPlan.name} ({cycleQ === 'yearly' ? 'anual' : 'mensual'})
                  </p>
                  <p className="text-xs text-white/60">
                    Continuarás al pago seguro con Paddle tras crear tu cuenta.
                  </p>
                </div>
              </div>
            )}

            <NoSubmitForm className="mt-6 space-y-4" ariaDescribedBy="signup-disabled-note">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-white/85">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  disabled
                  placeholder="Tu nombre"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder:text-white/30 disabled:opacity-60"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white/85">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled
                  placeholder="tu@empresa.com"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder:text-white/30 disabled:opacity-60"
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-white/85">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  disabled
                  placeholder="Crea una contraseña segura"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder:text-white/30 disabled:opacity-60"
                />
              </div>

              {/* Conservamos los query params en hidden por si luego se necesitan en el server action. */}
              {planQ && <input type="hidden" name="plan" value={planQ} />}
              {cycleQ && <input type="hidden" name="cycle" value={cycleQ} />}

              <button type="submit" disabled className="btn-primary w-full disabled:opacity-60">
                Crear cuenta
              </button>

              <p id="signup-disabled-note" className="text-center text-xs text-white/45">
                El registro aún no está activo. Conecta Auth.js / NextAuth para habilitarlo.
              </p>
            </NoSubmitForm>

            <p className="mt-6 text-center text-xs text-white/45">
              Al crear una cuenta aceptas nuestros{' '}
              <Link href="/terms" className="text-white/70 hover:text-white">
                Términos
              </Link>{' '}
              y la{' '}
              <Link href="/privacy" className="text-white/70 hover:text-white">
                Política de Privacidad
              </Link>
              .
            </p>
          </div>

          <p className="mt-6 text-center text-sm text-white/60">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-brand-300 hover:text-brand-200">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
