import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { SITE, SUPPORT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Política de cookies',
  description: `Política de cookies de ${SITE.name}.`,
  alternates: { canonical: '/cookies' },
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Política de cookies"
      intro={`Esta política explica qué son las cookies, qué tipos utiliza ${SITE.name} y cómo puedes gestionarlas.`}
    >
      <h2>1. ¿Qué son las cookies?</h2>
      <p>
        Las cookies son pequeños archivos de texto que un sitio web instala
        en tu dispositivo cuando lo visitas. Sirven para recordar
        preferencias, mantener tu sesión iniciada y obtener información
        estadística sobre el uso del servicio.
      </p>

      <h2>2. Tipos de cookies que utilizamos</h2>

      <h3>Cookies estrictamente necesarias</h3>
      <p>
        Imprescindibles para que el servicio funcione (sesión, seguridad,
        balanceo de carga, preferencia de idioma). No pueden desactivarse
        sin afectar al funcionamiento básico de {SITE.name}.
      </p>

      <h3>Cookies analíticas</h3>
      <p>
        Nos ayudan a entender cómo se usa el servicio de forma agregada y
        anónima para mejorar la experiencia. Solo se activan si has dado tu
        consentimiento (cuando esto sea aplicable según tu jurisdicción).
      </p>

      <h3>Cookies de terceros</h3>
      <p>
        Algunas funcionalidades —como el procesador de pagos Paddle— pueden
        instalar sus propias cookies en su dominio para gestionar el
        checkout, prevenir fraude y cumplir con obligaciones legales.
      </p>

      <h2>3. Cómo gestionar las cookies</h2>
      <ul>
        <li>
          Puedes aceptar, rechazar o configurar las cookies desde el banner
          que se muestra al entrar al sitio (cuando esté activo).
        </li>
        <li>
          También puedes borrarlas o bloquearlas desde la configuración de
          tu navegador (Chrome, Firefox, Safari, Edge, etc.). Cada
          navegador ofrece su propio panel.
        </li>
        <li>
          Bloquear ciertas cookies puede afectar a funcionalidades del
          servicio (por ejemplo, mantener tu sesión iniciada).
        </li>
      </ul>

      <h2>4. Cambios en esta política</h2>
      <p>
        Podemos actualizar esta política para reflejar cambios técnicos o
        legales. La fecha de última actualización aparece al principio de
        este documento.
      </p>

      <h2>5. Contacto</h2>
      <p>
        Para cualquier consulta sobre cookies puedes escribirnos a{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
