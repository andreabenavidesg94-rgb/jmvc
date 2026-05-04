import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { SITE, SUPPORT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Reembolsos y cancelaciones',
  description: `Política de reembolsos y cancelaciones de ${SITE.name}.`,
  alternates: { canonical: '/refunds' },
};

export default function RefundsPage() {
  return (
    <LegalPage
      title="Reembolsos y cancelaciones"
      intro={`En ${SITE.name} queremos que la relación contigo sea sencilla. A continuación te explicamos cómo funcionan las suscripciones, las cancelaciones y los reembolsos.`}
    >
      <h2>1. Suscripciones recurrentes</h2>
      <p>
        Los planes de {SITE.name} se contratan como suscripciones de
        renovación automática (mensual o anual). El cobro lo procesa Paddle
        al inicio de cada ciclo de facturación, salvo que canceles antes.
      </p>

      <h2>2. Cancelación flexible</h2>
      <p>
        Puedes cancelar tu suscripción en cualquier momento, sin
        permanencia y sin coste adicional, desde tu panel o desde el
        Customer Portal de Paddle. La cancelación detiene futuras
        renovaciones, pero no genera reembolsos automáticos del periodo en
        curso.
      </p>

      <h2>3. Acceso tras la cancelación</h2>
      <p>
        Tras cancelar, mantienes acceso a las funcionalidades de tu plan
        hasta el final del periodo ya pagado. Una vez vencido, la cuenta
        pasa al estado inactivo y deja de poder generar nuevas campañas.
      </p>

      <h2>4. Política de reembolsos</h2>
      <p>
        Por la naturaleza digital del servicio, no se ofrecen reembolsos
        automáticos por periodos ya consumidos. No obstante, evaluaremos
        casos excepcionales como:
      </p>
      <ul>
        <li>Cobros duplicados o errores técnicos imputables a {SITE.name}.</li>
        <li>Caída prolongada del servicio que impida un uso razonable del plan contratado.</li>
        <li>Cualquier otro supuesto en el que la legislación aplicable así lo requiera.</li>
      </ul>

      <h2>5. Cómo solicitar un reembolso</h2>
      <p>
        Escribe a <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>{' '}
        indicando el email asociado a tu cuenta, el motivo de la solicitud
        y, si es posible, el número de transacción de Paddle. Te
        responderemos en un plazo razonable.
      </p>

      <h2>6. Cambios de plan</h2>
      <p>
        Puedes cambiar de plan en cualquier momento desde tu panel. Los
        ajustes de importe se reflejan en la siguiente factura, según la
        política de prorrateo de Paddle aplicable a tu caso.
      </p>

      <h2>7. Contacto</h2>
      <p>
        Cualquier duda sobre cobros, cancelaciones o reembolsos:{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
