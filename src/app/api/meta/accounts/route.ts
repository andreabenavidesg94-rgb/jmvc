/**
 * GET /api/meta/accounts
 * Devuelve las cuentas publicitarias del usuario conectado.
 * Endpoint Meta: /me/adaccounts
 */

import { NextResponse } from 'next/server';
import { getMetaSessionUserId } from '@/lib/meta/session';
import { metaFetch, MetaApiError } from '@/lib/meta/client';
import { prisma } from '@/lib/db/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface AdAccountsResponse {
  data: Array<{
    id: string;
    name: string;
    account_status: number;
    currency: string;
    timezone_name: string;
  }>;
}

export async function GET() {
  const userId = await getMetaSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: 'No autenticado con Meta.' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { metaAccessToken: true, metaTokenExpiresAt: true },
  });

  if (!user?.metaAccessToken) {
    return NextResponse.json({ error: 'Token de Meta no encontrado.' }, { status: 401 });
  }

  if (user.metaTokenExpiresAt && user.metaTokenExpiresAt < new Date()) {
    return NextResponse.json({ error: 'token_expired' }, { status: 401 });
  }

  try {
    const data = await metaFetch<AdAccountsResponse>(
      user.metaAccessToken,
      'me/adaccounts',
      { fields: 'id,name,account_status,currency,timezone_name' },
    );
    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof MetaApiError) {
      const status = err.code === 190 ? 401 : 502;
      return NextResponse.json({ error: err.message, code: err.code }, { status });
    }
    return NextResponse.json({ error: 'Error interno.' }, { status: 500 });
  }
}
