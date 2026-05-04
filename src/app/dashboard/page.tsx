import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ManageSubscriptionButton } from '@/components/ManageSubscriptionButton';
import { getCurrentUser } from '@/lib/auth/session';
import { PLANS } from '@/lib/plans';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Panel',
  description: 'Tu panel de JMVC.',
  robots: { index: false, follow: false },
};

/**
 * Placeholder profesional para /dashboard.
 *
 * Hoy:
 *   - Si NO hay usuario autenticado (siempre, ahora mismo) muestra una
 *     pantalla "Conecta tu cuenta" con CTAs claros.
 *   - Si hubiera usuario, mostraría plan, estado, periodo y un botón para
 *     gestionar la suscripción a través del Customer Portal de Paddle.
 *
 * Mañana (cuando conectes Auth.js):
 *   - `getCurrentUser()` empezará a devolver datos reales.
 *   - Esta misma vista funcionará sin tocar nada más.
 *   - Puedes proteger esta ruta con un `redirect('/login')` si lo prefieres.
 */
export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <>
        <Header />
        <main id="main" className="container py-16">
          <div className="card mx-auto max-w-xl text-center">
            <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/15 text-brand-200 ring-1 ring-brand-400/20">
              <Sparkles size={20} aria-hidden />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Aún no has iniciado sesión
            </h1>
            <p className="mt-2 text-sm text-white/65">
              Para ver el estado de tu suscripción y empezar a crear campañas
              con JMVC, accede o crea una cuenta.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/login" className="btn-ghost">
                Iniciar sesión
              </Link>
              <Link href="/signup" className="btn-primary">
                Crear cuenta
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const planKey = user.plan.toLowerCase();
  const planDef =
    planKey in PLANS ? PLANS[planKey as keyof typeof PLANS] : null;

  return (
    <>
      <Header />
      <main id="main" className="container py-12">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Hola{user.name ? `, ${user.name}` : ''}.
        </h1>
        <p className="mt-1 text-sm text-white/60">
          Este es tu panel personal de JMVC.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="card">
            <p className="text-xs uppercase tracking-wider text-white/50">Plan actual</p>
            <p className="mt-2 text-2xl font-semibold text-white">{planDef?.name ?? user.plan}</p>
            <p className="mt-1 text-sm text-white/55">{planDef?.tagline}</p>
          </div>
          <div className="card">
            <p className="text-xs uppercase tracking-wider text-white/50">Estado</p>
            <p className="mt-2 text-2xl font-semibold capitalize text-white">
              {user.subscriptionStatus}
            </p>
            {user.cancelAtPeriodEnd && (
              <p className="mt-1 text-xs text-amber-300/85">
                Se cancelará al final del periodo actual.
              </p>
            )}
          </div>
          <div className="card">
            <p className="text-xs uppercase tracking-wider text-white/50">
              Próxima renovación
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {user.currentPeriodEnd
                ? new Date(user.currentPeriodEnd).toLocaleDateString('es-ES')
                : '—'}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ManageSubscriptionButton />
          <Link href="/pricing" className="btn-ghost">
            Cambiar de plan
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
