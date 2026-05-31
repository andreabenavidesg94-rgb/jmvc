import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { SITE, SUPPORT_EMAIL, COMPANY } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Eliminación de datos de usuario',
  description: `Cómo solicitar la eliminación de tus datos personales asociados a ${SITE.name}.`,
  alternates: { canonical: '/data-deletion' },
  // Esta página se indexa para que usuarios de integraciones de terceros
  // (Meta Login, etc.) puedan localizarla fácilmente si la necesitan.
  robots: { index: true, follow: true },
};

export default function DataDeletionPage() {
  return (
    <LegalPage
      title="Eliminación de datos de usuario"
      intro={`En ${SITE.name} respetamos tu derecho a controlar tus datos personales. Esta página explica cómo puedes solicitar la eliminación de la información asociada a tu cuenta o a cualquier integración publicitaria que hayas autorizado.`}
    >
      <h2>1. Qué datos podemos tener sobre ti</h2>
      <p>
        Dependiendo de cómo hayas usado el servicio, podemos conservar los
        siguientes tipos de datos:
      </p>
      <ul>
        <li>
          <strong>Datos de cuenta:</strong> nombre, dirección de email y
          contraseña cifrada (si te registraste directamente).
        </li>
        <li>
          <strong>Datos de uso:</strong> briefs, campañas y contenido que
          hayas generado dentro de la plataforma.
        </li>
        <li>
          <strong>Datos de facturación:</strong> estado de suscripción y
          referencias de pago gestionadas por Paddle (Merchant of Record).
          {' '}{SITE.name} no almacena datos completos de tarjeta.
        </li>
        <li>
          <strong>Datos de integración publicitaria:</strong> si conectaste
          tu cuenta de Meta Ads, Google Ads, TikTok Ads u otra plataforma,
          podemos conservar los permisos de acceso y los datos asociados a
          esa conexión.
        </li>
      </ul>

      <h2>2. Cómo solicitar la eliminación de tus datos</h2>
      <p>
        Puedes solicitar la eliminación completa de tus datos en cualquier
        momento. Para ello, sigue estos pasos:
      </p>
      <ol className="list-decimal space-y-2 pl-6">
        <li>
          Envía un email a{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </li>
        <li>
          Indica el <strong>email asociado a tu cuenta de {SITE.name}</strong>{' '}
          para que podamos identificar correctamente tus datos.
        </li>
        <li>
          Escribe en el asunto del mensaje:{' '}
          <strong>Eliminación de datos</strong>.
        </li>
        <li>
          Si lo deseas, puedes incluir en el cuerpo del email qué datos o
          integraciones concretas quieres eliminar (cuenta completa,
          integraciones publicitarias, historial de campañas, etc.). Si no
          lo especificas, procederemos con la eliminación completa.
        </li>
      </ol>
      <p>
        {SITE.name} confirmará la recepción de tu solicitud y gestionará la
        eliminación conforme a la normativa aplicable. El plazo orientativo
        de respuesta y ejecución es de <strong>hasta 30 días naturales</strong>{' '}
        desde la recepción de la solicitud.
      </p>

      <h2>3. Eliminación de datos de integraciones publicitarias</h2>
      <p>
        Si conectaste tu cuenta de Meta (Facebook / Instagram) u otras
        plataformas publicitarias a {SITE.name}, puedes solicitar la
        eliminación de los datos asociados a esa conexión a través del
        proceso descrito en el apartado anterior.
      </p>
      <p>
        Adicionalmente, puedes revocar los permisos de acceso directamente
        desde los ajustes de tu cuenta en cada plataforma:
      </p>
      <ul>
        <li>
          <strong>Meta / Facebook:</strong> accede a{' '}
          <strong>Configuración de Facebook → Seguridad y privacidad →
          Aplicaciones y sitios web</strong>{' '}
          y elimina el acceso concedido a {SITE.name}. También puedes
          hacerlo desde tu perfil de Instagram en{' '}
          <strong>Ajustes → Seguridad → Aplicaciones y sitios web</strong>.
        </li>
        <li>
          <strong>Google Ads:</strong> accede a{' '}
          <strong>Cuenta de Google → Seguridad → Aplicaciones de terceros</strong>{' '}
          y revoca el acceso.
        </li>
        <li>
          <strong>TikTok Ads:</strong> accede a la configuración de tu cuenta
          publicitaria y elimina las aplicaciones conectadas.
        </li>
      </ul>
      <p>
        La revocación de permisos desde la plataforma de terceros impide que
        {' '}{SITE.name} acceda a nuevos datos, pero no elimina automáticamente
        los datos que ya estuviesen en nuestros sistemas. Para la eliminación
        completa, envíanos el email indicado en el apartado 2.
      </p>

      <h2>4. Efectos de la eliminación</h2>
      <ul>
        <li>
          La eliminación de la cuenta implica la pérdida permanente de todos
          los briefs, campañas y contenido generado dentro de {SITE.name}.
          Esta acción no es reversible.
        </li>
        <li>
          Los datos de facturación que deban conservarse por obligaciones
          legales (por ejemplo, normativa fiscal aplicable en{' '}
          {COMPANY.jurisdiction}) podrán mantenerse durante el periodo
          legalmente exigido antes de su eliminación definitiva.
        </li>
        <li>
          Tras la eliminación, no podrás acceder al servicio con las
          credenciales de la cuenta eliminada.
        </li>
      </ul>

      <h2>5. Tus derechos bajo la normativa aplicable</h2>
      <p>
        Además del derecho de supresión, tienes derecho a acceder a tus
        datos, rectificarlos, oponerte a su tratamiento, solicitar la
        limitación del mismo y ejercer la portabilidad. Para cualquiera de
        estas solicitudes, escríbenos a{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
      <p>
        Si consideras que el tratamiento de tus datos no se ajusta a la
        normativa, puedes presentar una reclamación ante la Agencia Española
        de Protección de Datos (AEPD) en{' '}
        <a
          href="https://www.aepd.es"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.aepd.es
        </a>
        .
      </p>

      <h2>6. Contacto</h2>
      <p>
        Para cualquier duda sobre la eliminación de tus datos o el ejercicio
        de tus derechos, escríbenos a{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Respondemos
        en un plazo máximo de 30 días naturales.
      </p>
    </LegalPage>
  );
}
