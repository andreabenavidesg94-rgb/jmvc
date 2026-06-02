/**
 * POST /api/auth/meta/disconnect
 *
 * Desconecta Meta Ads del usuario actual:
 *  - Borra todos los campos Meta del User en DB.
 *  - Elimina la cookie de sesión meta_session.
 */

import { NextResponse } from 'next/server';
import { getMetaSessionUserId, clearMetaSessionCookie } from '@/lib/meta/session';
import { prisma } from '@/lib/db/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST() {
  const userId = await getMetaSessionUserId();

  if (!userId) {
    return NextResponse.json({ error: 'No hay sesión de Meta activa.' }, { status: 401 });
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        metaUserId: null,
        metaAccessToken: null,
        metaAdAccountId: null,
        metaConnectedAt: null,
        metaTokenExpiresAt: null,
        metaTokenScopes: null,
        metaTokenType: null,
      },
    });

    console.log(`[Meta/disconnect] Usuario desconectado: userId=${userId}`);

    const response = NextResponse.json({ ok: true });
    clearMetaSessionCookie(response);
    return response;
  } catch (err) {
    console.error('[Meta/disconnect] Error:', (err as Error).message);
    return NextResponse.json({ error: 'Error interno al desconectar.' }, { status: 500 });
  }
}
