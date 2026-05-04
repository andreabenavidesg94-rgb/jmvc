import { NextResponse } from 'next/server';
import { getCurrentUser, isSubscriptionActive } from '@/lib/auth/session';
import { PLANS } from '@/lib/plans';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/me/subscription
 *
 * Devuelve el estado de suscripción del usuario autenticado, junto con
 * los límites efectivos del plan. Esta es la única fuente válida que
 * deberías usar en backend para autorizar acciones (no confíes en el
 * frontend).
 */
export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    // Sin auth conectada todavía: respondemos un objeto "guest" útil.
    return NextResponse.json({
      authenticated: false,
      plan: null,
      subscription_status: 'inactive',
      current_period_end: null,
      cancel_at_period_end: false,
      limits: null,
      permissions: { canCreateCampaign: false },
    });
  }

  const planKey = user.plan.toLowerCase();
  const planDef =
    planKey in PLANS ? PLANS[planKey as keyof typeof PLANS] : null;

  return NextResponse.json({
    authenticated: true,
    plan: user.plan,
    billing_cycle: user.billingCycle,
    subscription_status: user.subscriptionStatus,
    current_period_start: user.currentPeriodStart,
    current_period_end: user.currentPeriodEnd,
    cancel_at_period_end: user.cancelAtPeriodEnd,
    limits: planDef?.limits ?? null,
    permissions: {
      canCreateCampaign: isSubscriptionActive(user.subscriptionStatus),
      canManageMultipleClients: planDef?.limits.hasMultiClient ?? false,
      canAccessAdvancedReports: planDef?.limits.hasAdvancedReports ?? false,
    },
  });
}
