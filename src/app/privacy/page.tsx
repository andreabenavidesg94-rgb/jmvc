import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { COMPANY, SITE, SUPPORT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: `Política de privacidad de ${SITE.name}.`,
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Política de privacidad"
      intro={`En ${COMPANY.legalName} (responsable del tratamiento) nos tomamos muy en serio la privacidad de quienes utilizan ${SITE.name}. Esta política describe qué datos recopilamos, con qué finalidad y qué derechos tienes sobre ellos.`}
    >
      <h2>1. Datos que recopilamos</h2>
      <ul>
        <li>
          <strong>Datos de cuenta:</strong> nombre, email, contraseña cifrada
          y, en su caso, datos de empresa que voluntariamente facilites.
        </li>
        <li>
          <strong>Datos de uso del servicio:</strong> contenido de tus
          campañas y entradas en la plataforma para poder prestar el servicio.
        </li>
        <li>
          <strong>Datos técnicos:</strong> dirección IP, tipo de dispositivo,
          navegador, idioma, registros de actividad y errores.
        </li>
        <li>
          <strong>Datos de facturación:</strong> los datos necesarios para
          gestionar tu suscripción son tratados por Paddle (ver más abajo).
        </li>
      </ul>

      <h2>2. Finalidades del tratamiento</h2>
      <ul>
        <li>Prestar y mantener el servicio contratado.</li>
        <li>Gestionar tu cuenta, suscripción y facturación.</li>
        <li>Mejorar el producto y la experiencia de usuario.</li>
        <li>Comunicarnos contigo sobre cambios relevantes del servicio.</li>
        <li>Cumplir obligaciones legales aplicables.</li>
      </ul>

      <h2>3. Pagos procesados por Paddle</h2>
      <p>
        Los pagos se procesan a través de <strong>Paddle.com Market Limited</strong>
        {' '}o entidades del grupo Paddle, que actúan como Merchant of Record.
        Paddle recibe y trata los datos necesarios para procesar tu pago
        (datos de tarjeta, dirección de facturación e información fiscal).
        {SITE.name} no almacena datos completos de tarjeta.
      </p>

      <h2>4. Analítica y cookies</h2>
      <p>
        Podemos utilizar herramientas de analítica para entender el uso del
        servicio y mejorarlo. Consulta más detalles en nuestra{' '}
        <a href="/cookies">Política de cookies</a>.
      </p>

      <h2>5. Conservación de datos</h2>
      <p>
        Conservamos los datos personales el tiempo necesario para prestar el
        servicio y cumplir con las obligaciones legales aplicables (por
        ejemplo, en materia fiscal y contable). Cuando ya no sean
        necesarios, se eliminarán o anonimizarán de forma segura.
      </p>

      <h2>6. Tus derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión,
        oposición, limitación del tratamiento y portabilidad escribiendo a{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Si consideras
        que el tratamiento no se ajusta a la normativa, puedes presentar una
        reclamación ante la autoridad de control competente en{' '}
        {COMPANY.jurisdiction}.
      </p>

      <h2>7. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas razonables para proteger
        tus datos: cifrado en tránsito (HTTPS), control de accesos,
        registros de auditoría y separación de entornos. Ningún sistema es
        infalible al 100%, por lo que no podemos garantizar una seguridad
        absoluta.
      </p>

      <h2>8. Transferencias internacionales</h2>
      <p>
        Algunos de nuestros proveedores (alojamiento, analítica, pagos)
        pueden tratar datos fuera de tu país. Cuando esto ocurra, nos
        aseguramos de que existan garantías adecuadas (por ejemplo,
        cláusulas contractuales tipo de la Comisión Europea cuando sea
        aplicable).
      </p>

      <h2>9. Contacto</h2>
      <p>
        Para cualquier cuestión relativa a tus datos personales puedes
        escribir a <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
