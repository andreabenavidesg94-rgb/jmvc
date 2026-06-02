/**
 * Cliente para Meta Graph API.
 *
 * Todas las llamadas van autenticadas con el access token del usuario.
 * El token se descifra en servidor y nunca llega al cliente.
 *
 * Referencia: https://developers.facebook.com/docs/graph-api
 */

import { decrypt } from '@/lib/meta/encrypt';

function getApiVersion(): string {
  return process.env.META_API_VERSION ?? 'v21.0';
}

const BASE = 'https://graph.facebook.com';

export class MetaApiError extends Error {
  constructor(
    public readonly code: number,
    public readonly type: string,
    message: string,
  ) {
    super(message);
    this.name = 'MetaApiError';
  }
}

/**
 * Descifra el token almacenado y ejecuta un fetch a Graph API.
 * Lanza MetaApiError si la API devuelve un error.
 */
export async function metaFetch<T>(
  encryptedToken: string,
  path: string,
  params: Record<string, string> = {},
): Promise<T> {
  let token: string;
  try {
    token = decrypt(encryptedToken);
  } catch {
    throw new MetaApiError(190, 'OAuthException', 'Token de Meta inválido o no descifrable.');
  }

  const version = getApiVersion();
  const url = new URL(`${BASE}/${version}/${path.replace(/^\//, '')}`);
  url.searchParams.set('access_token', token);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }

  const res = await fetch(url.toString(), {
    headers: { 'Accept': 'application/json' },
    cache: 'no-store',
  });

  const json = (await res.json()) as T & { error?: { code: number; type: string; message: string } };

  if (!res.ok || (json as { error?: unknown }).error) {
    const err = (json as { error?: { code: number; type: string; message: string } }).error;
    throw new MetaApiError(
      err?.code ?? res.status,
      err?.type ?? 'unknown',
      err?.message ?? `Graph API error ${res.status}`,
    );
  }

  return json;
}

/**
 * Intercambia un code OAuth por un short-lived token (server-side).
 * META_APP_SECRET nunca sale del servidor.
 */
export async function exchangeCodeForToken(code: string, redirectUri: string): Promise<{
  access_token: string;
  token_type: string;
  expires_in?: number;
}> {
  const appId = process.env.NEXT_PUBLIC_META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;

  if (!appId || !appSecret) {
    throw new Error('[Meta/client] NEXT_PUBLIC_META_APP_ID o META_APP_SECRET no configurados.');
  }

  const version = getApiVersion();
  const url = new URL(`${BASE}/${version}/oauth/access_token`);
  url.searchParams.set('client_id', appId);
  url.searchParams.set('client_secret', appSecret);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('code', code);

  const res = await fetch(url.toString(), { cache: 'no-store' });
  const data = (await res.json()) as {
    access_token?: string;
    token_type?: string;
    expires_in?: number;
    error?: { message: string; type: string; code: number };
  };

  if (!res.ok || data.error || !data.access_token) {
    throw new MetaApiError(
      data.error?.code ?? res.status,
      data.error?.type ?? 'OAuthException',
      data.error?.message ?? 'Fallo al intercambiar code por token.',
    );
  }

  return {
    access_token: data.access_token,
    token_type: data.token_type ?? 'bearer',
    expires_in: data.expires_in,
  };
}

/**
 * Intercambia un short-lived token por un long-lived token.
 * Los long-lived tokens duran ~60 días.
 */
export async function exchangeForLongLivedToken(shortToken: string): Promise<{
  access_token: string;
  token_type: string;
  expires_in: number;
}> {
  const appId = process.env.NEXT_PUBLIC_META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;

  if (!appId || !appSecret) {
    throw new Error('[Meta/client] NEXT_PUBLIC_META_APP_ID o META_APP_SECRET no configurados.');
  }

  const version = getApiVersion();
  const url = new URL(`${BASE}/${version}/oauth/access_token`);
  url.searchParams.set('grant_type', 'fb_exchange_token');
  url.searchParams.set('client_id', appId);
  url.searchParams.set('client_secret', appSecret);
  url.searchParams.set('fb_exchange_token', shortToken);

  const res = await fetch(url.toString(), { cache: 'no-store' });
  const data = (await res.json()) as {
    access_token?: string;
    token_type?: string;
    expires_in?: number;
    error?: { message: string; type: string; code: number };
  };

  if (!res.ok || data.error || !data.access_token) {
    throw new MetaApiError(
      data.error?.code ?? res.status,
      data.error?.type ?? 'OAuthException',
      data.error?.message ?? 'Fallo al obtener long-lived token.',
    );
  }

  return {
    access_token: data.access_token,
    token_type: data.token_type ?? 'bearer',
    expires_in: data.expires_in ?? 60 * 24 * 60 * 60, // 60d fallback
  };
}

/**
 * Obtiene el perfil básico del usuario autenticado (id + email si disponible).
 * Usado en el callback para upsert del User en DB.
 */
export async function getMetaMe(
  token: string,
): Promise<{ id: string; name?: string; email?: string }> {
  const version = getApiVersion();
  const url = new URL(`${BASE}/${version}/me`);
  url.searchParams.set('fields', 'id,name,email');
  url.searchParams.set('access_token', token);

  const res = await fetch(url.toString(), { cache: 'no-store' });
  const data = (await res.json()) as {
    id?: string;
    name?: string;
    email?: string;
    error?: { message: string };
  };

  if (!res.ok || !data.id) {
    throw new MetaApiError(400, 'GraphError', data.error?.message ?? 'No se pudo obtener el perfil de Meta.');
  }

  return { id: data.id, name: data.name, email: data.email };
}
