export const SITE = {
  name: 'JMVC',
  shortDescription:
    'Plataforma de IA que crea, lanza y optimiza campañas de Meta Ads, Google Ads y TikTok Ads en minutos.',
  longDescription:
    'JMVC analiza tu negocio y genera estrategia, copies, ideas creativas, audiencias y estructura de campaña para Meta Ads, Google Ads y TikTok Ads. Ideal para emprendedores, ecommerce, negocios locales, agencias y freelancers.',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'https://jmvc.app',
  twitter: '@jmvc',
  locale: 'es_ES',
  themeColor: '#06070C',
};

export const SUPPORT_EMAIL =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? '[Correo de soporte]';

export const COMPANY = {
  legalName:
    process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME ?? '[Nombre legal de la empresa]',
  address: process.env.NEXT_PUBLIC_COMPANY_ADDRESS ?? '[Dirección legal]',
  taxId: process.env.NEXT_PUBLIC_COMPANY_TAX_ID ?? '[Número fiscal si aplica]',
  jurisdiction:
    process.env.NEXT_PUBLIC_COMPANY_JURISDICTION ?? '[País / jurisdicción]',
};

export const LAST_UPDATED = '[Fecha de última actualización]';
