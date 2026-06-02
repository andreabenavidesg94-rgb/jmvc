/**
 * GET /api/auth/meta
 *
 * Inicia el flujo OAuth de Meta Ads:
 *  1. Genera un state aleatorio (anti-CSRF).
 *  2. Lo guarda en cookie httpOnly meta_oauth_state.
 *  3. Redirige al diálogo OAuth de Facebook.
 */

import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { setOAuthStateCookie } from '@/lib/meta/session';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const appId = process.env.NEXT_PUBLIC_META_APP_ID;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://jmvcapp.com';

  if (!appId) {
    return NextResponse.json(
      { error: 'NEXT_PUBLIC_META_APP_ID no está configurado.' },
      { status: 500 },
    );
  }

  const state = randomBytes(32).toString('hex');
  const redirectUri = `${appUrl}/api/auth/meta/callback`;

  const oauthUrl = new URL('https://www.facebook.com/dialog/oauth');
  oauthUrl.searchParams.set('client_id', appId);
  oauthUrl.searchParams.set('redirect_uri', redirectUri);
  oauthUrl.searchParams.set('state', state);
  oauthUrl.searchParams.set('scope', 'ads_read');
  oauthUrl.searchParams.set('response_type', 'code');

  const response = NextResponse.redirect(oauthUrl.toString());
  setOAuthStateCookie(response, state);
  return response;
}
