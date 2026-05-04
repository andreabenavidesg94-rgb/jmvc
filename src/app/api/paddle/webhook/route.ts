import { NextRequest, NextResponse } from 'next/server';
import {
  verifyAndParseEvent,
  isEventAlreadyProcessed,
  markEventProcessed,
  handlePaddleEvent,
} from '@/lib/paddle/webhook';

// Necesitamos el body bruto para verificar la firma.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get('paddle-signature');

  // 1) Verificación de firma.
  let event;
  try {
    event = await verifyAndParseEvent(rawBody, signature);
  } catch (err) {
    console.error('[paddle/webhook] Firma inválida:', err);
    // 401 -> Paddle no reintentará indefinidamente por firma inválida.
    return new NextResponse('Invalid signature', { status: 401 });
  }

  // 2) Sacar eventId.
  const eventId =
    (event as unknown as { eventId?: string; notificationId?: string }).eventId ??
    (event as unknown as { eventId?: string; notificationId?: string }).notificationId ??
    '';

  if (!eventId) {
    console.error('[paddle/webhook] Evento sin eventId');
    return NextResponse.json({ ok: true });
  }

  // 3) Idempotencia: comprobar (sin escribir) si ya se procesó antes.
  //    Si ya está, devolvemos 200 y Paddle deja de reintentar.
  if (await isEventAlreadyProcessed(eventId)) {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  // 4) Procesar el evento. Si falla, devolvemos 500 para que Paddle
  //    reintente, y NO marcamos el evento como procesado.
  try {
    await handlePaddleEvent(event);
  } catch (err) {
    console.error('[paddle/webhook] Error procesando evento:', err);
    return new NextResponse('Internal error', { status: 500 });
  }

  // 5) Marcar como procesado SOLO si el handler ha terminado bien.
  //    Si falla aquí (carrera con otro reintento simultáneo), tratamos el
  //    P2002 como benigno: significa que otra entrega lo grabó primero,
  //    y los upsert del handler son idempotentes en su efecto.
  try {
    await markEventProcessed(eventId, event.eventType, event);
  } catch (err) {
    console.warn(
      '[paddle/webhook] No se pudo marcar como procesado (probable carrera):',
      err,
    );
  }

  return NextResponse.json({ ok: true });
}
