/**
 * JMVC - Configuración central de planes.
 *
 * Esta es la fuente única de la verdad para:
 *   - Mostrar planes en /pricing.
 *   - Resolver price IDs de Paddle.
 *   - Validar límites en backend.
 *
 * IMPORTANTE: Los precios mostrados aquí son referenciales para la UI.
 * El precio real cobrado al usuario es el que tengas configurado en Paddle.
 */

export type PlanId = 'starter' | 'growth' | 'agency';
export type BillingCycle = 'monthly' | 'yearly';

export interface PlanLimits {
  campaignsPerMonth: number;
  projects: number;
  teamMembers: number;
  hasAdvancedOptimization: boolean;
  hasMultiClient: boolean;
  hasAdvancedReports: boolean;
  hasCampaignHistory: boolean;
}

export interface PlanDefinition {
  id: PlanId;
  name: string;
  tagline: string;
  description: string;
  monthlyPrice: number; // EUR
  yearlyPrice: number; // EUR (precio total anual)
  highlight?: boolean;
  ctaLabel: string;
  features: string[];
  limits: PlanLimits;
}

export const PLANS: Record<PlanId, PlanDefinition> = {
  starter: {
    id: 'starter',
    name: 'Starter',
    tagline: 'Para emprendedores y pequeños proyectos',
    description: 'Empieza a crear campañas con IA sin complicaciones técnicas.',
    monthlyPrice: 29,
    yearlyPrice: 290,
    ctaLabel: 'Empezar con Starter',
    features: [
      'Hasta 5 campañas al mes',
      '1 proyecto',
      'Copies generados por IA',
      'Ideas de audiencias',
      'Soporte por email',
    ],
    limits: {
      campaignsPerMonth: 5,
      projects: 1,
      teamMembers: 1,
      hasAdvancedOptimization: false,
      hasMultiClient: false,
      hasAdvancedReports: false,
      hasCampaignHistory: false,
    },
  },
  growth: {
    id: 'growth',
    name: 'Growth',
    tagline: 'Para negocios en crecimiento',
    description: 'Más campañas, más optimización y un panel completo de métricas.',
    monthlyPrice: 79,
    yearlyPrice: 790,
    highlight: true,
    ctaLabel: 'Empezar con Growth',
    features: [
      'Hasta 30 campañas al mes',
      '5 proyectos',
      'Optimización avanzada con IA',
      'Historial de campañas',
      'Panel de métricas',
      'Soporte prioritario',
    ],
    limits: {
      campaignsPerMonth: 30,
      projects: 5,
      teamMembers: 3,
      hasAdvancedOptimization: true,
      hasMultiClient: false,
      hasAdvancedReports: false,
      hasCampaignHistory: true,
    },
  },
  agency: {
    id: 'agency',
    name: 'Agency',
    tagline: 'Para agencias y freelancers',
    description: 'Gestiona múltiples clientes, campañas y reportes desde un único lugar.',
    monthlyPrice: 199,
    yearlyPrice: 1990,
    ctaLabel: 'Empezar con Agency',
    features: [
      'Campañas ilimitadas',
      'Hasta 25 clientes / proyectos',
      'Reportes avanzados',
      'Gestión multi-cliente',
      'Historial completo',
      'Soporte dedicado',
    ],
    limits: {
      campaignsPerMonth: 9999,
      projects: 25,
      teamMembers: 10,
      hasAdvancedOptimization: true,
      hasMultiClient: true,
      hasAdvancedReports: true,
      hasCampaignHistory: true,
    },
  },
};

/**
 * Devuelve el price ID de Paddle para un plan + ciclo concreto.
 * Lee desde variables públicas (se renderizan en cliente).
 */
export function getPaddlePriceId(plan: PlanId, cycle: BillingCycle): string | undefined {
  const map: Record<string, string | undefined> = {
    starter_monthly: process.env.NEXT_PUBLIC_PADDLE_PRICE_STARTER_MONTHLY,
    growth_monthly: process.env.NEXT_PUBLIC_PADDLE_PRICE_GROWTH_MONTHLY,
    agency_monthly: process.env.NEXT_PUBLIC_PADDLE_PRICE_AGENCY_MONTHLY,
    starter_yearly: process.env.NEXT_PUBLIC_PADDLE_PRICE_STARTER_YEARLY,
    growth_yearly: process.env.NEXT_PUBLIC_PADDLE_PRICE_GROWTH_YEARLY,
    agency_yearly: process.env.NEXT_PUBLIC_PADDLE_PRICE_AGENCY_YEARLY,
  };
  return map[`${plan}_${cycle}`];
}

/**
 * Mapeo inverso: dado un price ID, devuelve el plan y ciclo.
 * Útil en el webhook para saber qué plan compró el usuario.
 *
 * Esta función se llama desde código de servidor. Lee primero las
 * variables sin prefijo `NEXT_PUBLIC_*` (versión server) y, si no existen,
 * cae a las públicas como fallback para no romper el desarrollo local
 * cuando solo se han configurado las del frontend.
 */
export function planFromPriceId(
  priceId: string,
): { plan: PlanId; cycle: BillingCycle } | null {
  const env = process.env;

  // Server-only vars (preferidas) con fallback a las públicas.
  const STARTER_M =
    env.PADDLE_PRICE_STARTER_MONTHLY ?? env.NEXT_PUBLIC_PADDLE_PRICE_STARTER_MONTHLY;
  const GROWTH_M =
    env.PADDLE_PRICE_GROWTH_MONTHLY ?? env.NEXT_PUBLIC_PADDLE_PRICE_GROWTH_MONTHLY;
  const AGENCY_M =
    env.PADDLE_PRICE_AGENCY_MONTHLY ?? env.NEXT_PUBLIC_PADDLE_PRICE_AGENCY_MONTHLY;
  const STARTER_Y =
    env.PADDLE_PRICE_STARTER_YEARLY ?? env.NEXT_PUBLIC_PADDLE_PRICE_STARTER_YEARLY;
  const GROWTH_Y =
    env.PADDLE_PRICE_GROWTH_YEARLY ?? env.NEXT_PUBLIC_PADDLE_PRICE_GROWTH_YEARLY;
  const AGENCY_Y =
    env.PADDLE_PRICE_AGENCY_YEARLY ?? env.NEXT_PUBLIC_PADDLE_PRICE_AGENCY_YEARLY;

  const map: Record<string, { plan: PlanId; cycle: BillingCycle }> = {};
  if (STARTER_M) map[STARTER_M] = { plan: 'starter', cycle: 'monthly' };
  if (GROWTH_M) map[GROWTH_M] = { plan: 'growth', cycle: 'monthly' };
  if (AGENCY_M) map[AGENCY_M] = { plan: 'agency', cycle: 'monthly' };
  if (STARTER_Y) map[STARTER_Y] = { plan: 'starter', cycle: 'yearly' };
  if (GROWTH_Y) map[GROWTH_Y] = { plan: 'growth', cycle: 'yearly' };
  if (AGENCY_Y) map[AGENCY_Y] = { plan: 'agency', cycle: 'yearly' };
  return map[priceId] ?? null;
}

export const PLAN_LIST: PlanDefinition[] = [PLANS.starter, PLANS.growth, PLANS.agency];
