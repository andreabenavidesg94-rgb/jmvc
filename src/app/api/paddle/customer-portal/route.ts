import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type PaddlePortalResponse = {
  data?: {
    urls?: {
      general?: {
        overview?: string;
      };
    };
  };
  error?: {
    type?: string;
    code?: string;
    detail?: string;
  };
};

function getPaddleApiBaseUrl() {
  return process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === 'production'
    ? 'https://api.paddle.com'
    : 'https://sandbox-api.paddle.com';
}

/**
 * Devuelve un enlace al Customer Portal de Paddle para el usuario actual.
 *
 * Requisitos:
 * - Usuario autenticado.
 * - El usuario debe tener paddleCustomerId.
 * - PADDLE_API_KEY debe existir solo en backend.
 */
export async function POST() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { error: 'No autenticado. Conecta auth real para usar este endpoint.' },
      { status: 401 },
    );
  }

  if (!user.paddleCustomerId) {
    return NextResponse.json(
      { error: 'Este usuario aún no tiene un cliente en Paddle.' },
      { status: 400 },
    );
  }

  const apiKey = process.env.PADDLE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'PADDLE_API_KEY no está configurada.' },
      { status: 500 },
    );
  }

  const response = await fetch(
    `${getPaddleApiBaseUrl()}/customers/${user.paddleCustomerId}/portal-sessions`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscription_ids: user.paddleSubscriptionId
          ? [user.paddleSubscriptionId]
          : [],
      }),
      cache: 'no-store',
    },
  );

  const portal = (await response.json()) as PaddlePortalResponse;

  if (!response.ok) {
    console.error('Failed to create Paddle customer portal session', portal);

    return NextResponse.json(
      {
        error: 'No se pudo crear la sesión del portal de cliente.',
        detail: portal.error?.detail ?? null,
      },
      { status: response.status },
    );
  }

  const url = portal.data?.urls?.general?.overview;

  if (!url) {
    return NextResponse.json(
      { error: 'Paddle no devolvió una URL válida para el portal.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ url });
}