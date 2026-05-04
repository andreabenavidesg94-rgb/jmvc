/**
 * JMVC - Datos de la sección de preguntas frecuentes.
 *
 * Este módulo es código de datos puro (no es Client Component). Se importa
 * desde el componente cliente <Faq /> y desde Server Components que generan
 * el JSON-LD (`<JsonLd faq={...} />`).
 */

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQS: FaqItem[] = [
  {
    q: '¿Necesito saber de marketing para usar JMVC?',
    a: 'No es imprescindible. JMVC está diseñado para que cualquier persona pueda crear campañas con criterio. Te guía en cada paso y propone estructura, copies y audiencias. Si ya sabes de marketing, te ahorrará tiempo; si no sabes, te ayudará a empezar con buen pie.',
  },
  {
    q: '¿JMVC publica automáticamente mis campañas?',
    a: 'JMVC genera la estrategia, los copies, las ideas creativas y la estructura de campaña. La publicación final se hace desde tus propias cuentas publicitarias de Meta, Google o TikTok, para que tú mantengas siempre el control.',
  },
  {
    q: '¿Funciona con mi ecommerce?',
    a: 'Sí. JMVC funciona para ecommerce, negocios de servicios, infoproductos, negocios locales y agencias. Tú indicas tu producto, mercado y objetivo, y la plataforma se adapta.',
  },
  {
    q: '¿Puedo usarlo para clientes (agencia o freelance)?',
    a: 'Sí. El plan Agency está pensado para gestionar varios proyectos o clientes desde una sola cuenta, con reportes avanzados y mayor capacidad de campañas.',
  },
  {
    q: '¿Puedo cancelar cuando quiera?',
    a: 'Sí. Las suscripciones son flexibles: puedes cancelar en cualquier momento desde tu panel de cliente. Mantienes el acceso hasta el final del periodo ya pagado.',
  },
  {
    q: '¿Qué diferencia hay entre JMVC y ChatGPT?',
    a: 'ChatGPT es un asistente generalista. JMVC está especializado en publicidad digital: incorpora flujos guiados, plantillas, estructura de campaña, ideas creativas adaptadas y un panel pensado para operar campañas reales. Está diseñado para acelerar el trabajo, no para empezar de cero cada vez.',
  },
  {
    q: '¿JMVC garantiza resultados?',
    a: 'No. Los resultados publicitarios dependen de muchos factores (producto, oferta, mercado, presupuesto). JMVC te ayuda a trabajar de forma más rápida, ordenada y profesional, pero no promete resultados específicos ni garantizados.',
  },
  {
    q: '¿Qué plataformas publicitarias soporta?',
    a: 'JMVC está enfocado en Meta Ads (Facebook e Instagram), Google Ads y TikTok Ads, que son los tres canales más usados por la mayoría de negocios.',
  },
];
