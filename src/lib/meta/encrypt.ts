/**
 * Cifrado AES-256-GCM para access tokens de Meta Ads.
 *
 * ENCRYPTION_KEY debe ser una cadena hexadecimal de 64 caracteres (32 bytes).
 * Generarla con: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
 *
 * Si ENCRYPTION_KEY no está presente, las funciones lanzan un error
 * explícito — nunca se guarda un token sin cifrar.
 */

import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;   // 96 bits — recomendado para GCM
const TAG_LENGTH = 16;  // 128 bits — por defecto en Node

function getKey(): Buffer {
  const raw = process.env.ENCRYPTION_KEY;
  if (!raw || raw.length !== 64) {
    throw new Error(
      '[Meta/encrypt] ENCRYPTION_KEY no está configurada o no tiene 64 caracteres hex. ' +
        'Genera una con: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"',
    );
  }
  return Buffer.from(raw, 'hex');
}

/**
 * Cifra un texto plano.
 * Devuelve: IV (hex) + ":" + authTag (hex) + ":" + ciphertext (hex)
 */
export function encrypt(plaintext: string): string {
  const key = getKey();
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted.toString('hex')}`;
}

/**
 * Descifra un valor producido por `encrypt`.
 * Lanza si el formato es incorrecto o la autenticación falla.
 */
export function decrypt(ciphertext: string): string {
  const key = getKey();
  const parts = ciphertext.split(':');
  if (parts.length !== 3) {
    throw new Error('[Meta/encrypt] Formato de token cifrado inválido.');
  }
  const [ivHex, tagHex, dataHex] = parts;
  const iv = Buffer.from(ivHex, 'hex');
  const tag = Buffer.from(tagHex, 'hex');
  const data = Buffer.from(dataHex, 'hex');

  if (iv.length !== IV_LENGTH) {
    throw new Error('[Meta/encrypt] IV inválido.');
  }
  if (tag.length !== TAG_LENGTH) {
    throw new Error('[Meta/encrypt] Auth tag inválido.');
  }

  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8');
}
