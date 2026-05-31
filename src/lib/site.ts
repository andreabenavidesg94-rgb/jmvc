export const SITE = {
  name: 'JMVC Ads AI',
  shortDescription:
    'Plataforma de IA que prepara estrategia, copies, audiencias e ideas creativas para campañas en Meta Ads, Google Ads y TikTok Ads.',
  longDescription:
    'JMVC Ads AI analiza tu negocio y genera estrategia, copies, ideas creativas, audiencias y estructura de campaña para Meta Ads, Google Ads y TikTok Ads. Ideal para emprendedores, ecommerce, negocios locales, agencias y freelancers.',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'https://jmvcapp.com',
  twitter: '@jmvcapp',
  locale: 'es_ES',
  themeColor: '#06070C',
};

export const SUPPORT_EMAIL =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'support@jmvcapp.com';

export const COMPANY = {
  legalName:
    process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME ?? 'JMVC Ads AI',
  address:
    process.env.NEXT_PUBLIC_COMPANY_ADDRESS ?? 'España',
  taxId:
    process.env.NEXT_PUBLIC_COMPANY_TAX_ID ?? '',
  jurisdiction:
    process.env.NEXT_PUBLIC_COMPANY_JURISDICTION ?? 'España',
};

/**
 * Devuelve true si el campo tiene un valor real (no está vacío ni es
 * un placeholder). Usar en lugar de comparaciones hardcoded con strings
 * tipo "[Número fiscal si aplica]".
 */
export function hasRealValue(s: string | undefined | null): boolean {
  if (!s) return false;
  const trimmed = s.trim();
  return trimmed.length > 0 && !trimmed.startsWith('[');
}

/**
 * Fecha de última actualización de los textos legales.
 * Se puede sobreescribir con NEXT_PUBLIC_LEGAL_LAST_UPDATED en .env.
 */
export const LAST_UPDATED =
  process.env.NEXT_PUBLIC_LEGAL_LAST_UPDATED ?? 'Mayo 2025';
