'use client';

/**
 * JMVC - Cliente Paddle.js (frontend).
 *
 * Carga e inicializa Paddle.js con el client token público.
 * Soporta sandbox y production según la variable de entorno
 * NEXT_PUBLIC_PADDLE_ENVIRONMENT.
 */

import { initializePaddle, type Paddle } from '@paddle/paddle-js';
import { getPaddlePriceId, type PlanId, type BillingCycle } from '@/lib/plans';

let paddleInstance: Paddle | null = null;

/**
 * Inicializa Paddle.js (idempotente).
 */
export async function getPaddle(): Promise<Paddle | null> {
  if (paddleInstance) return paddleInstance;

  const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
  const environment =
    (process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT as 'sandbox' | 'production') ||
    'sandbox';

  if (!token) {
    console.warn(
      '[Paddle] NEXT_PUBLIC_PADDLE_CLIENT_TOKEN no está configurado. ' +
        'El checkout no funcionará hasta que añadas el token en .env.local.',
    );
    return null;
  }

  paddleInstance =
    (await initializePaddle({
      environment,
      token,
    })) ?? null;

  return paddleInstance;
}

export interface OpenCheckoutOptions {
  plan: PlanId;
  cycle: BillingCycle;
  /**
   * Email para prellenar el checkout. Si el cliente ya existe en Paddle con
   * este email, Paddle lo reutilizará automáticamente (no hace falta pasar
   * un id explícito, y la API actual de Paddle.js no soporta `customer.id`
   * en `Checkout.open`).
   */
  customerEmail?: string;
  /** ID interno del usuario, viaja en custom_data y vuelve en el webhook. */
  userId?: string;
  /** De dónde sale el clic. Útil para analítica. */
  source?: string;
}

/**
 * Abre el Checkout overlay de Paddle para el plan + ciclo elegido.
 *
 * - Si no hay user (no auth implementada), redirige a /signup?plan=...
 *   y deja constancia del ciclo en la URL.
 * - Si hay user, abre el overlay con custom_data para que el webhook
 *   pueda asociar el pago al usuario correcto.
 *
 * Para clientes existentes con Paddle customerId, NO usamos `customer.id`
 * en el overlay (no soportado). Paddle reconcilia por email; si necesitas
 * forzar la asociación, deberías generar un Transaction server-side y
 * pasar `transactionId` aquí (flujo avanzado, no implementado todavía).
 */
export async function openPaddleCheckout(opts: OpenCheckoutOptions): Promise<void> {
  const { plan, cycle, customerEmail, userId, source } = opts;

  const priceId = getPaddlePriceId(plan, cycle);
  if (!priceId) {
    console.error(`[Paddle] No hay price ID configurado para ${plan} (${cycle}).`);
    alert(
      'Este plan aún no está configurado. Contacta con soporte o vuelve más tarde.',
    );
    return;
  }

  // Si el usuario aún no está autenticado, lo enviamos al signup.
  // El flujo continúa: tras registrarse, se vuelve a llamar a esta función.
  if (!userId) {
    const url = `/signup?plan=${plan}&cycle=${cycle}`;
    window.location.href = url;
    return;
  }

  const paddle = await getPaddle();
  if (!paddle) {
    alert('No se pudo cargar el checkout. Revisa tu conexión e inténtalo de nuevo.');
    return;
  }

  paddle.Checkout.open({
    items: [{ priceId, quantity: 1 }],
    customer: customerEmail ? { email: customerEmail } : undefined,
    customData: {
      plan,
      billing_cycle: cycle,
      source: source ?? 'pricing',
      user_id: userId,
    },
    settings: {
      displayMode: 'overlay',
      theme: 'dark',
      locale: 'es',
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL ?? ''}/dashboard?checkout=success`,
    },
  });
}
