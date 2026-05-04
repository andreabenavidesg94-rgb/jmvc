/**
 * JMVC - Cliente Paddle (servidor).
 * Usa la API key privada y el SDK oficial de Node.
 * NUNCA importar este archivo desde el frontend.
 */

import { Environment, Paddle } from '@paddle/paddle-node-sdk';

let _paddle: Paddle | null = null;

export function getServerPaddle(): Paddle {
  if (_paddle) return _paddle;

  const apiKey = process.env.PADDLE_API_KEY;
  if (!apiKey) {
    throw new Error('PADDLE_API_KEY no está configurada en variables de entorno.');
  }

  const env =
    process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === 'production'
      ? Environment.production
      : Environment.sandbox;

  _paddle = new Paddle(apiKey, { environment: env });
  return _paddle;
}
