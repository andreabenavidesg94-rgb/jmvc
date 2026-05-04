/**
 * JMVC - Helpers para procesar webhooks de Paddle Billing.
 *
 * - Verificación de firma con `Paddle-Signature` y `PADDLE_WEBHOOK_SECRET`.
 * - Idempotencia con la tabla `paddle_events`.
 * - Mapeo de eventos a actualizaciones en `users` y `subscriptions`.
 *
 * NOTA: La verificación de firma se delega al SDK oficial
 * (`@paddle/paddle-node-sdk`), que implementa el algoritmo HMAC-SHA256
 * documentado por Paddle. Si en el futuro Paddle cambia el formato,
 * actualizar SDK y revisar este archivo.
 */

import { getServerPaddle } from '@/lib/paddle/server';
import { prisma } from '@/lib/db/prisma';
import { planFromPriceId } from '@/lib/plans';
import { Plan, SubscriptionStatus } from '@prisma/client';
import type { EventEntity } from '@paddle/paddle-node-sdk';

/**
 * Verifica la firma del webhook usando el SDK oficial.
 * Devuelve el evento ya parseado o lanza si la firma no es válida.
 */
export async function verifyAndParseEvent(
  rawBody: string,
  signatureHeader: string | null,
): Promise<EventEntity> {
  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!secret) throw new Error('PADDLE_WEBHOOK_SECRET no configurado.');
  if (!signatureHeader) throw new Error('Falta header Paddle-Signature.');

  const paddle = getServerPaddle();
  // `unmarshal` valida la firma y devuelve el evento tipado.
  const event = await paddle.webhooks.unmarshal(rawBody, secret, signatureHeader);
  if (!event) throw new Error('Firma de webhook inválida.');
  return event;
}

/**
 * Comprueba si un evento ya fue procesado (sin escribir).
 * Se usa antes de aplicar la lógica para evitar reprocesar duplicados.
 */
export async function isEventAlreadyProcessed(eventId: string): Promise<boolean> {
  const existing = await prisma.paddleEvent.findUnique({
    where: { eventId },
    select: { id: true },
  });
  return existing !== null;
}

/**
 * Idempotencia: intenta registrar el evento. Devuelve `true` si era nuevo,
 * `false` si ya estaba procesado (entonces hay que ignorar el reintento).
 */
export async function markEventProcessed(
  eventId: string,
  eventType: string,
  rawEvent: unknown,
): Promise<boolean> {
  try {
    await prisma.paddleEvent.create({
      data: {
        eventId,
        eventType,
        rawEvent: rawEvent as object,
      },
    });
    return true;
  } catch (err: unknown) {
    // Violación de unique en eventId => ya procesado.
    if (typeof err === 'object' && err !== null && 'code' in err && (err as { code?: string }).code === 'P2002') {
      return false;
    }
    throw err;
  }
}

// ---------- Mapeo de planes ----------

function mapPlanToPrismaEnum(plan: 'starter' | 'growth' | 'agency'): Plan {
  switch (plan) {
    case 'starter':
      return Plan.STARTER;
    case 'growth':
      return Plan.GROWTH;
    case 'agency':
      return Plan.AGENCY;
  }
}

function mapStatus(status: string): SubscriptionStatus {
  // Estados oficiales Paddle Billing: active, trialing, past_due, paused, canceled.
  switch (status) {
    case 'active':
      return SubscriptionStatus.active;
    case 'trialing':
      return SubscriptionStatus.trialing;
    case 'past_due':
      return SubscriptionStatus.past_due;
    case 'paused':
      return SubscriptionStatus.paused;
    case 'canceled':
      return SubscriptionStatus.canceled;
    default:
      return SubscriptionStatus.inactive;
  }
}

// ---------- Handler principal ----------

/**
 * Procesa un evento ya verificado y aplica los cambios en BBDD.
 *
 * Maneja los eventos típicos de ciclo de vida de suscripción:
 *   - subscription.created
 *   - subscription.updated
 *   - subscription.canceled
 *   - subscription.paused
 *   - subscription.resumed
 *   - subscription.past_due
 *   - transaction.completed (útil para confirmar primer pago)
 *
 * IMPORTANTE: el conjunto exacto de eventos disponibles depende de tu
 * configuración en Paddle Dashboard > Notifications. Asegúrate de
 * suscribir todos los que procesa esta función.
 */
export async function handlePaddleEvent(event: EventEntity): Promise<void> {
  const eventType = event.eventType;

  // Algunos eventos vienen sobre Subscription; otros sobre Transaction.
  // Tratamos primero los de suscripción.
  // NOTA: el shape exacto del SDK puede variar entre versiones.
  // Adaptar si actualizas la dependencia.

  const data: any = (event as unknown as { data: unknown }).data;

  if (eventType.startsWith('subscription.')) {
    const subscriptionId: string = data.id;
    const customerId: string = data.customerId ?? data.customer_id;
    const status: string = data.status;
    const cancelAtPeriodEnd: boolean =
      data.scheduledChange?.action === 'cancel' || false;

    // El primer item suele ser el plan principal.
    const item = data.items?.[0];
    const priceId: string | undefined = item?.price?.id ?? item?.priceId;
    const currentPeriodStart: string | undefined =
      data.currentBillingPeriod?.startsAt ?? data.current_billing_period?.starts_at;
    const currentPeriodEnd: string | undefined =
      data.currentBillingPeriod?.endsAt ?? data.current_billing_period?.ends_at;

    const planResolved = priceId ? planFromPriceId(priceId) : null;

    // custom_data viaja desde el checkout y nos da el user_id interno.
    const customData = data.customData ?? data.custom_data ?? {};
    const internalUserId: string | undefined = customData.user_id;

    // 1) Localizar al usuario.
    //    - Por user_id de custom_data (caso ideal).
    //    - O por paddleCustomerId si el cliente ya existe.
    let user = null;
    if (internalUserId) {
      user = await prisma.user.findUnique({ where: { id: internalUserId } });
    }
    if (!user && customerId) {
      user = await prisma.user.findUnique({ where: { paddleCustomerId: customerId } });
    }

    // TODO(auth): cuando exista auth real, si no hay user a estas alturas
    // deberías crearlo a partir del email del customer en Paddle, o emitir
    // un evento de "huérfano" para reconciliar manualmente.
    if (!user) {
      console.warn(
        `[Paddle webhook] Suscripción ${subscriptionId} sin usuario asociado. ` +
          'Verificar custom_data.user_id en el checkout.',
      );
      return;
    }

    const plan = planResolved ? mapPlanToPrismaEnum(planResolved.plan) : Plan.FREE;
    const cycle = planResolved?.cycle ?? null;
    const mappedStatus = mapStatus(status);

    // 2) Upsert en `subscriptions`.
    await prisma.subscription.upsert({
      where: { paddleSubscriptionId: subscriptionId },
      create: {
        userId: user.id,
        paddleSubscriptionId: subscriptionId,
        paddleCustomerId: customerId,
        priceId: priceId ?? '',
        plan,
        billingCycle: cycle ?? 'monthly',
        status: mappedStatus,
        currentPeriodStart: currentPeriodStart ? new Date(currentPeriodStart) : null,
        currentPeriodEnd: currentPeriodEnd ? new Date(currentPeriodEnd) : null,
        cancelAtPeriodEnd,
        canceledAt: status === 'canceled' ? new Date() : null,
        rawEvent: data,
      },
      update: {
        priceId: priceId ?? undefined,
        plan,
        billingCycle: cycle ?? undefined,
        status: mappedStatus,
        currentPeriodStart: currentPeriodStart ? new Date(currentPeriodStart) : undefined,
        currentPeriodEnd: currentPeriodEnd ? new Date(currentPeriodEnd) : undefined,
        cancelAtPeriodEnd,
        canceledAt: status === 'canceled' ? new Date() : null,
        rawEvent: data,
      },
    });

    // 3) Denormalizar en `users` para lecturas rápidas.
    await prisma.user.update({
      where: { id: user.id },
      data: {
        paddleCustomerId: customerId,
        paddleSubscriptionId: subscriptionId,
        subscriptionStatus: mappedStatus,
        plan,
        billingCycle: cycle ?? undefined,
        currentPeriodStart: currentPeriodStart ? new Date(currentPeriodStart) : undefined,
        currentPeriodEnd: currentPeriodEnd ? new Date(currentPeriodEnd) : undefined,
        cancelAtPeriodEnd,
      },
    });
    return;
  }

  if (eventType === 'transaction.completed') {
    // En la mayoría de flujos no necesitas hacer nada extra aquí porque
    // `subscription.created` ya lo cubre. Lo dejamos como gancho útil para:
    //   - Enviar email de bienvenida.
    //   - Disparar onboarding.
    //   - Registrar facturas en tu propia BBDD si lo necesitas.
    console.log('[Paddle webhook] transaction.completed', data?.id);
    return;
  }

  // Otros eventos: log y continuar.
  console.log(`[Paddle webhook] evento no manejado: ${eventType}`);
}
