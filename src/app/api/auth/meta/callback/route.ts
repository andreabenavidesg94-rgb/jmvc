/**
 * GET /api/auth/meta/callback
 *
 * Callback OAuth de Meta Ads:
 *  1. Verifica el parámetro state (anti-CSRF).
 *  2. Intercambia code → short-lived token (servidor).
 *  3. Intercambia short-lived → long-lived token (servidor).
 *  4. Obtiene el perfil del usuario en Meta (/me).
 *  5. Upsert del User en DB por metaUserId.
 *  6. Cifra el token con AES-256-GCM y lo guarda.
 *  7. Establece cookie de sesión meta_session con el userId.
 *  8. Redirige a /dashboard.
 *
 * META_APP_SECRET nunca sale del servidor.
 * El access token nunca se loguea completo.
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { encrypt } from '@/lib/meta/encrypt';
import {
  exchangeCodeForToken,
  exchangeForLongLivedToken,
  getMetaMe,
  MetaApiError,
} from '@/lib/meta/client';
import {
  getOAuthStateCookie,
  clearOAuthStateCookie,
  setMetaSessionCookie,
} from '@/lib/meta/session';
import { prisma } from '@/lib/db/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function dashboardRedirect(error?: string): NextResponse {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://jmvcapp.com';
  const url = new URL('/dashboard', appUrl);
  if (error) url.searchParams.set('meta_error', error);
  return NextResponse.redirect(url.toString());
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const code = searchParams.get('code');
  const returnedState = searchParams.get('state');
  const oauthError = searchParams.get('error');

  // El usuario rechazó el permiso en Meta.
  if (oauthError) {
    const response = dashboardRedirect('access_denied');
    const store = await cookies();
    clearOAuthStateCookie(response as NextResponse);
    void store; // evitar warning de variable no usada
    return response;
  }

  if (!code || !returnedState) {
    return dashboardRedirect('missing_params');
  }

  // Verificar CSRF state.
  const cookieStore = await cookies();
  const storedState = getOAuthStateCookie(cookieStore);

  if (!storedState || storedState !== returnedState) {
    const response = dashboardRedirect('invalid_state');
    clearOAuthStateCookie(response as NextResponse);
    return response;
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://jmvcapp.com';
  const redirectUri = `${appUrl}/api/auth/meta/callback`;

  try {
    // 1. Intercambiar code por short-lived token.
    const shortTokenData = await exchangeCodeForToken(code, redirectUri);

    // 2. Intercambiar por long-lived token.
    const longTokenData = await exchangeForLongLivedToken(shortTokenData.access_token);

    // 3. Obtener perfil del usuario.
    const metaUser = await getMetaMe(longTokenData.access_token);

    // 4. Cifrar token — lanza si ENCRYPTION_KEY no está.
    const encryptedToken = encrypt(longTokenData.access_token);

    // 5. Calcular expiración.
    const expiresAt = new Date(Date.now() + longTokenData.expires_in * 1000);

    // 6. Upsert del User en DB por metaUserId.
    const user = await prisma.user.upsert({
      where: { metaUserId: metaUser.id },
      create: {
        email: metaUser.email ?? `meta_${metaUser.id}@noemail.local`,
        name: metaUser.name ?? null,
        metaUserId: metaUser.id,
        metaAccessToken: encryptedToken,
        metaConnectedAt: new Date(),
        metaTokenExpiresAt: expiresAt,
        metaTokenScopes: 'ads_read',
        metaTokenType: longTokenData.token_type,
      },
      update: {
        metaAccessToken: encryptedToken,
        metaConnectedAt: new Date(),
        metaTokenExpiresAt: expiresAt,
        metaTokenScopes: 'ads_read',
        metaTokenType: longTokenData.token_type,
        // No sobreescribir metaAdAccountId si ya tenía una seleccionada.
      },
    });

    // Log seguro: nunca el token completo.
    console.log(`[Meta/callback] Usuario conectado: userId=${user.id}, metaUserId=${metaUser.id}`);

    // 7. Establecer sesión y redirigir.
    const response = dashboardRedirect();
    clearOAuthStateCookie(response as NextResponse);
    setMetaSessionCookie(response as NextResponse, user.id);
    return response;
  } catch (err) {
    if (err instanceof MetaApiError) {
      console.error(`[Meta/callback] MetaApiError code=${err.code} type=${err.type}: ${err.message}`);
      const response = dashboardRedirect('meta_api_error');
      clearOAuthStateCookie(response as NextResponse);
      return response;
    }
    // Error de ENCRYPTION_KEY u otro interno.
    console.error('[Meta/callback] Error interno:', (err as Error).message);
    const response = dashboardRedirect('server_error');
    clearOAuthStateCookie(response as NextResponse);
    return response;
  }
}
