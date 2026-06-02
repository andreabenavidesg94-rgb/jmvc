import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ManageSubscriptionButton } from '@/components/ManageSubscriptionButton';
import { MetaConnect } from '@/components/dashboard/MetaConnect';
import { MetaAdsDashboard } from '@/components/dashboard/MetaAdsDashboard';
import { getCurrentUser } from '@/lib/auth/session';
import { getMetaSessionUserId } from '@/lib/meta/session';
import { prisma } from '@/lib/db/prisma';
import { PLANS } from '@/lib/plans';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Panel',
  description: 'Tu panel de JMVC.',
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  // Auth general (todavía placeholder — devuelve null).
  const user = await getCurrentUser();

  // Sesión Meta (funcional — basada en cookie meta_session).
  const metaUserId = await getMetaSessionUserId();
  const metaUser = metaUserId
    ? await prisma.user.findUnique({
        where: { id: metaUserId },
        select: {
          metaUserId: true,
          metaConnectedAt: true,
          metaTokenExpiresAt: true,
          metaAdAccountId: true,
          metaTokenScopes: true,
        },
      })
    : null;

  // Determinar estado de conexión Meta.
  type MetaStatus = 'not_connected' | 'connected' | 'token_expired' | 'error';
  let metaStatus: MetaStatus = 'not_connected';
  if (metaUser?.metaUserId) {
    const expired =
      metaUser.metaTokenExpiresAt && metaUser.metaTokenExpiresAt < new Date();
    metaStatus = expired ? 'token_expired' : 'connected';
  }

  // Sin sesión de auth Y sin sesión Meta → pantalla de bienvenida.
  if (!user && !metaUser) {
    return (
      <>
        <Header />
        <main id="main" className="container py-16">
          <div className="card mx-auto max-w-xl text-center">
            <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/15 text-brand-200 ring-1 ring-brand-400/20">
              <Sparkles size={20} aria-hidden />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Bienvenido a JMVC
            </h1>
            <p className="mt-2 text-sm text-white/65">
              Conecta tu cuenta de Meta Ads para empezar a ver tus campañas,
              o accede con tu cuenta JMVC.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href="/api/auth/meta" className="btn-primary text-sm">
                Conectar Meta Ads
              </a>
              <Link href="/login" className="btn-ghost text-sm">
                Iniciar sesión JMVC
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Con sesión de auth (futuro).
  if (user) {
    const planKey = user.plan.toLowerCase();
    const planDef = planKey in PLANS ? PLANS[planKey as keyof typeof PLANS] : null;

    return (
      <>
        <Header />
        <main id="main" className="container py-12">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Hola{user.name ? `, ${user.name}` : ''}.
          </h1>
          <p className="mt-1 text-sm text-white/60">Este es tu panel personal de JMVC.</p>

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
              <p className="text-xs uppercase tracking-wider text-white/50">Próxima renovación</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {user.currentPeriodEnd
                  ? new Date(user.currentPeriodEnd).toLocaleDateString('es-ES')
                  : '—'}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <ManageSubscriptionButton />
            <Link href="/pricing" className="btn-ghost">
              Cambiar de plan
            </Link>
          </div>

          {/* Bloque Meta Ads */}
          <div className="mt-10">
            <MetaConnect
              status={metaStatus}
              connectedAt={metaUser?.metaConnectedAt?.toISOString() ?? null}
              expiresAt={metaUser?.metaTokenExpiresAt?.toISOString() ?? null}
              adAccountId={metaUser?.metaAdAccountId ?? null}
              scopes={metaUser?.metaTokenScopes ?? null}
            />
            {metaStatus === 'connected' && (
              <MetaAdsDashboard initialAdAccountId={metaUser?.metaAdAccountId ?? null} />
            )}
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Solo sesión Meta (sin auth JMVC todavía).
  return (
    <>
      <Header />
      <main id="main" className="container py-12">
        <h1 className="text-3xl font-semibold tracking-tight text-white">Panel de Meta Ads</h1>
        <p className="mt-1 text-sm text-white/60">
          Datos de tu cuenta publicitaria en tiempo real.
        </p>

        <div className="mt-8">
          <MetaConnect
            status={metaStatus}
            connectedAt={metaUser?.metaConnectedAt?.toISOString() ?? null}
            expiresAt={metaUser?.metaTokenExpiresAt?.toISOString() ?? null}
            adAccountId={metaUser?.metaAdAccountId ?? null}
            scopes={metaUser?.metaTokenScopes ?? null}
          />
        </div>

        {metaStatus === 'connected' && (
          <MetaAdsDashboard initialAdAccountId={metaUser?.metaAdAccountId ?? null} />
        )}
      </main>
      <Footer />
    </>
  );
}
