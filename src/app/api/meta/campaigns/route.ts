/**
 * GET /api/meta/campaigns
 * Devuelve campañas de la cuenta publicitaria seleccionada.
 * Endpoint Meta: /act_{id}/campaigns
 */

import { NextResponse } from 'next/server';
import { getMetaSessionUserId } from '@/lib/meta/session';
import { metaFetch, MetaApiError } from '@/lib/meta/client';
import { prisma } from '@/lib/db/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface CampaignsResponse {
  data: Array<{
    id: string;
    name: string;
    status: string;
    objective: string;
    created_time: string;
  }>;
}

export async function GET() {
  const userId = await getMetaSessionUserId();
  if (!userId) return NextResponse.json({ error: 'No autenticado.' }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { metaAccessToken: true, metaAdAccountId: true, metaTokenExpiresAt: true },
  });

  if (!user?.metaAccessToken) return NextResponse.json({ error: 'Token no encontrado.' }, { status: 401 });
  if (!user.metaAdAccountId) return NextResponse.json({ error: 'Ninguna cuenta publicitaria seleccionada.' }, { status: 400 });
  if (user.metaTokenExpiresAt && user.metaTokenExpiresAt < new Date()) {
    return NextResponse.json({ error: 'token_expired' }, { status: 401 });
  }

  try {
    const data = await metaFetch<CampaignsResponse>(
      user.metaAccessToken,
      `${user.metaAdAccountId}/campaigns`,
      { fields: 'id,name,status,objective,created_time' },
    );
    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof MetaApiError) {
      return NextResponse.json({ error: err.message, code: err.code }, { status: err.code === 190 ? 401 : 502 });
    }
    return NextResponse.json({ error: 'Error interno.' }, { status: 500 });
  }
}
