/**
 * Mini-sesión server-side para Meta Ads.
 *
 * La cookie meta_session contiene el userId firmado con HMAC-SHA256:
 *   base64url(userId) + "." + base64url(HMAC-SHA256(payload, ENCRYPTION_KEY))
 *
 * Si la cookie fue manipulada (payload o firma alterados), getMetaSessionUserId
 * devuelve null y la sesión se rechaza. Se usa timingSafeEqual para evitar
 * ataques de timing.
 *
 * ENCRYPTION_KEY debe ser la misma clave de 64 chars hex que usa encrypt.ts.
 * Si no está configurada, lanza un error claro — nunca se guarda userId sin firma.
 *
 * Cuando se implemente Auth.js: reemplazar getMetaSessionUserId() por
 * getCurrentUser() y eliminar la cookie meta_session.
 */

import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const META_SESSION_COOKIE = 'meta_session';
export const META_OAUTH_STATE_COOKIE = 'meta_oauth_state';

const COOKIE_MAX_AGE = 60 * 60 * 24 * 60; // 60 días en segundos

// ── Tipado mínimo compatible con cookies() de Next.js App Router ─────────────
// Evita depender de rutas internas de Next como next/dist/...
interface CookieStore {
  get(name: string): { value: string } | undefined;
}

// ── HMAC helpers ─────────────────────────────────────────────────────────────

function getHmacKey(): string {
  const key = process.env.ENCRYPTION_KEY;
  if (!key || key.length !== 64) {
    throw new Error(
      '[Meta/session] ENCRYPTION_KEY no está configurada o no tiene 64 caracteres hex. ' +
        'Requerida para firmar cookies de sesión.',
    );
  }
  return key;
}

/**
 * Produce un valor de cookie firmado:
 *   base64url(userId) + "." + base64url(HMAC-SHA256)
 */
function signUserId(userId: string): string {
  const key = getHmacKey();
  const payload = Buffer.from(userId, 'utf8').toString('base64url');
  const sig = createHmac('sha256', key).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

/**
 * Verifica la firma y extrae el userId.
 * Devuelve null si la cookie fue manipulada o tiene formato incorrecto.
 * Usa timingSafeEqual para prevenir ataques de timing.
 */
function verifyAndExtractUserId(signed: string): string | null {
  try {
    const key = getHmacKey();
    const dotIdx = signed.lastIndexOf('.');
    if (dotIdx === -1) return null;

    const payload = signed.slice(0, dotIdx);
    const sig = signed.slice(dotIdx + 1);

    const expected = createHmac('sha256', key).update(payload).digest('base64url');

    const sigBuf = Buffer.from(sig, 'base64url');
    const expectedBuf = Buffer.from(expected, 'base64url');

    // Las longitudes deben coincidir antes de comparar bit a bit.
    if (sigBuf.length === 0 || sigBuf.length !== expectedBuf.length) return null;

    if (!timingSafeEqual(sigBuf, expectedBuf)) return null;

    return Buffer.from(payload, 'base64url').toString('utf8');
  } catch {
    return null;
  }
}

// ── API pública ───────────────────────────────────────────────────────────────

/**
 * Lee y verifica la cookie de sesión Meta.
 * Devuelve el userId si la firma es válida, null en cualquier otro caso.
 */
export async function getMetaSessionUserId(): Promise<string | null> {
  const store = await cookies();
  const raw = store.get(META_SESSION_COOKIE)?.value;
  if (!raw) return null;
  return verifyAndExtractUserId(raw);
}

/**
 * Establece la cookie de sesión Meta en una NextResponse.
 * El userId se firma con HMAC-SHA256 antes de guardarse.
 */
export function setMetaSessionCookie(response: NextResponse, userId: string): void {
  const signed = signUserId(userId);
  response.cookies.set(META_SESSION_COOKIE, signed, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
}

/**
 * Elimina la cookie de sesión Meta.
 */
export function clearMetaSessionCookie(response: NextResponse): void {
  response.cookies.set(META_SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
}

/**
 * Lee el state OAuth almacenado durante la redirección inicial.
 * Acepta cualquier objeto con get(), compatible con cookies() de Next.js.
 */
export function getOAuthStateCookie(store: CookieStore): string | null {
  return store.get(META_OAUTH_STATE_COOKIE)?.value ?? null;
}

/**
 * Establece la cookie de state OAuth (expira en 10 minutos).
 */
export function setOAuthStateCookie(response: NextResponse, state: string): void {
  response.cookies.set(META_OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 10,
    path: '/',
  });
}

/**
 * Elimina la cookie de state OAuth.
 */
export function clearOAuthStateCookie(response: NextResponse): void {
  response.cookies.set(META_OAUTH_STATE_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
}
