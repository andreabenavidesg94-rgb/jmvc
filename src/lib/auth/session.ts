/**
 * JMVC - Capa de autenticación (PLACEHOLDER).
 *
 * Estas funciones son la API que el resto de la aplicación usa para
 * obtener al usuario actual. Hoy devuelven `null` porque todavía no
 * hay autenticación real conectada.
 *
 * Para conectar Auth.js / NextAuth:
 *   1) Añade `next-auth` y configura un provider (Email, Google, etc.).
 *   2) Sustituye la implementación de `getCurrentUser()` por una que
 *      llame a `auth()` (App Router) y devuelva el usuario de la BBDD.
 *   3) Mantén la misma firma para no romper el resto del código.
 *
 * NO uses estas funciones para autorizar acciones críticas hasta que
 * la auth real esté implementada.
 */

import type { User } from '@prisma/client';

/**
 * Devuelve el usuario actual o `null` si no hay sesión.
 *
 * TODO(auth): conectar con Auth.js / NextAuth y devolver el usuario real.
 * Ejemplo futuro:
 *   const session = await auth();
 *   if (!session?.user?.email) return null;
 *   return prisma.user.findUnique({ where: { email: session.user.email } });
 */
export async function getCurrentUser(): Promise<User | null> {
  // Placeholder: sin auth no hay usuario.
  return null;
}

/**
 * Igual que `getCurrentUser` pero lanza si no hay usuario.
 * Útil en route handlers protegidos.
 */
export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    const err = new Error('UNAUTHORIZED');
    (err as Error & { status?: number }).status = 401;
    throw err;
  }
  return user;
}

/**
 * Comprueba si la suscripción del usuario está en un estado activo
 * que permite el uso del producto.
 */
export function isSubscriptionActive(
  status: string | null | undefined,
): boolean {
  return status === 'active' || status === 'trialing';
}
