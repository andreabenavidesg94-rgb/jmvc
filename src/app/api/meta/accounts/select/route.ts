/**
 * POST /api/meta/accounts/select
 * Body: { adAccountId: "act_XXXXXXXXXX" }
 * Guarda la cuenta publicitaria seleccionada por el usuario en DB.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getMetaSessionUserId } from '@/lib/meta/session';
import { prisma } from '@/lib/db/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const userId = await getMetaSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: 'No autenticado con Meta.' }, { status: 401 });
  }

  let adAccountId: string | undefined;
  try {
    const body = (await req.json()) as { adAccountId?: string };
    adAccountId = body.adAccountId;
  } catch {
    return NextResponse.json({ error: 'Body JSON inválido.' }, { status: 400 });
  }

  if (!adAccountId || !adAccountId.startsWith('act_')) {
    return NextResponse.json(
      { error: 'adAccountId inválido. Debe tener formato act_XXXXXXXXXX.' },
      { status: 400 },
    );
  }

  await prisma.user.update({
    where: { id: userId },
    data: { metaAdAccountId: adAccountId },
  });

  return NextResponse.json({ ok: true, adAccountId });
}
