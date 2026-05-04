import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { NoSubmitForm } from '@/components/NoSubmitForm';
import { COMPANY, SITE, SUPPORT_EMAIL } from '@/lib/site';
import { Mail, MessageCircle, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contacto',
  description: `Contacta con el equipo de ${SITE.name}.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main" className="container max-w-4xl py-16">
        <div className="text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
            ¿Hablamos?
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/65">
            Estamos para ayudarte con cualquier duda sobre {SITE.name}: planes,
            facturación, integraciones o casos de uso para tu negocio.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="card">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/15 text-brand-200 ring-1 ring-brand-400/20">
              <Mail size={20} aria-hidden />
            </div>
            <h2 className="text-base font-semibold text-white">Soporte general</h2>
            <p className="mt-1 text-sm text-white/65">
              Para dudas sobre el producto, tu cuenta o tu suscripción.
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="mt-3 inline-block text-sm text-brand-300 hover:text-brand-200"
            >
              {SUPPORT_EMAIL}
            </a>
          </div>

          <div className="card">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-500/15 text-accent-400 ring-1 ring-accent-400/20">
              <MessageCircle size={20} aria-hidden />
            </div>
            <h2 className="text-base font-semibold text-white">Comercial / agencias</h2>
            <p className="mt-1 text-sm text-white/65">
              Si gestionas varios clientes o necesitas un plan a medida.
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="mt-3 inline-block text-sm text-brand-300 hover:text-brand-200"
            >
              {SUPPORT_EMAIL}
            </a>
          </div>

          <div className="card">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white/85 ring-1 ring-white/15">
              <Building2 size={20} aria-hidden />
            </div>
            <h2 className="text-base font-semibold text-white">Datos de la empresa</h2>
            <p className="mt-1 text-sm leading-relaxed text-white/65">
              {COMPANY.legalName}
              <br />
              {COMPANY.address}
              <br />
              {COMPANY.taxId !== '[Número fiscal si aplica]' && (
                <>
                  {COMPANY.taxId}
                  <br />
                </>
              )}
              {COMPANY.jurisdiction}
            </p>
          </div>
        </div>

        <NoSubmitForm
          className="mx-auto mt-14 max-w-xl space-y-4"
          ariaDescribedBy="contact-disabled-note"
        >
          <h2 className="text-xl font-semibold text-white">Escríbenos</h2>
          <p className="text-sm text-white/65">
            Rellena el formulario y te responderemos al email que indiques.
          </p>

          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-white/85">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              disabled
              placeholder="Tu nombre"
              className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder:text-white/30 disabled:opacity-60"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white/85">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              disabled
              placeholder="tu@empresa.com"
              className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder:text-white/30 disabled:opacity-60"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-white/85">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              disabled
              placeholder="Cuéntanos en qué podemos ayudarte"
              className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder:text-white/30 disabled:opacity-60"
            />
          </div>
          <button type="submit" disabled className="btn-primary disabled:opacity-60">
            Enviar mensaje
          </button>
          <p id="contact-disabled-note" className="text-xs text-white/45">
            El formulario está pendiente de conectar a un endpoint de envío
            (por ejemplo, una API route con Resend, Postmark o similar).
            Mientras tanto, puedes escribir directamente a{' '}
            <a className="text-brand-300 hover:text-brand-200" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </NoSubmitForm>
      </main>
      <Footer />
    </>
  );
}
