import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { COMPANY, SITE, SUPPORT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Términos y condiciones',
  description: `Términos y condiciones de uso de ${SITE.name}.`,
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Términos y condiciones"
      intro={`Estos Términos regulan el acceso y uso de los servicios ofrecidos por ${COMPANY.legalName} (en adelante, “${SITE.name}”) a través del sitio ${SITE.url} y sus aplicaciones asociadas.`}
    >
      <h2>1. Aceptación de los Términos</h2>
      <p>
        Al registrarte, contratar un plan o utilizar el servicio, declaras
        haber leído, comprendido y aceptado en su totalidad los presentes
        Términos. Si no estás de acuerdo, no debes utilizar el servicio.
      </p>

      <h2>2. Descripción del servicio</h2>
      <p>
        {SITE.name} es una plataforma SaaS que ayuda a sus clientes a crear,
        organizar y optimizar campañas publicitarias en plataformas de
        terceros (Meta Ads, Google Ads y TikTok Ads), generando estrategia,
        copies, ideas creativas y audiencias mediante inteligencia artificial.
        El servicio no garantiza resultados publicitarios concretos.
      </p>

      <h2>3. Cuentas de usuario</h2>
      <ul>
        <li>El usuario debe proporcionar información veraz y actualizada al registrarse.</li>
        <li>El usuario es responsable de mantener la confidencialidad de sus credenciales.</li>
        <li>Está prohibido compartir cuentas, suplantar identidades o registrarse en nombre de terceros sin autorización.</li>
        <li>{SITE.name} podrá suspender o eliminar cuentas que infrinjan estos Términos.</li>
      </ul>

      <h2>4. Suscripciones y pagos</h2>
      <p>
        Los planes de {SITE.name} se ofrecen mediante suscripción periódica
        (mensual o anual). Los pagos son procesados por <strong>Paddle</strong>,
        que actúa como Merchant of Record en aquellas jurisdicciones donde
        proceda. Los precios mostrados pueden incluir o excluir impuestos
        aplicables según tu localización.
      </p>
      <ul>
        <li>La suscripción se renueva automáticamente al final de cada periodo, salvo cancelación previa.</li>
        <li>Los datos de pago no son almacenados por {SITE.name}.</li>
        <li>El usuario autoriza el cobro automático mediante el método de pago facilitado a Paddle.</li>
      </ul>

      <h2>5. Cancelaciones</h2>
      <p>
        El usuario puede cancelar su suscripción en cualquier momento desde
        su panel o a través del Customer Portal de Paddle. La cancelación
        es efectiva al finalizar el periodo de facturación ya pagado, sin
        prorrateos automáticos.
      </p>

      <h2>6. Uso aceptable</h2>
      <ul>
        <li>No utilizar el servicio para actividades ilícitas, fraudulentas o engañosas.</li>
        <li>No promover contenido que infrinja derechos de terceros, propiedad intelectual, derechos de imagen o normativa publicitaria aplicable.</li>
        <li>No realizar ingeniería inversa, scraping abusivo, ni intentar comprometer la seguridad del servicio.</li>
        <li>No utilizar el servicio para campañas que infrinjan las políticas publicitarias de Meta, Google o TikTok.</li>
      </ul>

      <h2>7. Propiedad intelectual</h2>
      <p>
        El código, marca, diseño y materiales del servicio son propiedad de
        {' '}{COMPANY.legalName}. El usuario conserva la titularidad de los
        contenidos que introduce en la plataforma (descripción de su negocio,
        ofertas, etc.) y otorga a {SITE.name} una licencia no exclusiva
        únicamente para prestar el servicio contratado.
      </p>

      <h2>8. Limitación de responsabilidad</h2>
      <p>
        En la medida máxima permitida por la ley, {COMPANY.legalName} no se
        hace responsable de daños indirectos, lucro cesante, pérdida de
        oportunidades o pérdida de datos derivados del uso del servicio.
        El servicio se ofrece “tal cual” y los resultados publicitarios
        dependen de múltiples factores ajenos a {SITE.name}.
      </p>

      <h2>9. Disponibilidad del servicio</h2>
      <p>
        {SITE.name} hará esfuerzos razonables por mantener el servicio
        disponible, pero no garantiza una disponibilidad ininterrumpida ni
        libre de errores. Podrán realizarse tareas de mantenimiento o
        actualización que afecten temporalmente al servicio.
      </p>

      <h2>10. Cambios en el servicio y en los Términos</h2>
      <p>
        {SITE.name} podrá modificar el alcance de las funcionalidades,
        precios y/o estos Términos. Cualquier cambio relevante será
        comunicado con antelación razonable a través del servicio o por
        email. El uso continuado del servicio implica aceptación de las
        nuevas condiciones.
      </p>

      <h2>11. Legislación aplicable</h2>
      <p>
        Estos Términos se rigen por la legislación vigente en{' '}
        {COMPANY.jurisdiction}. Para cualquier controversia, las partes
        someten la cuestión a los tribunales que correspondan según la ley
        aplicable.
      </p>

      <h2>12. Contacto</h2>
      <p>
        Para cualquier consulta relacionada con estos Términos, puedes
        escribir a{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
