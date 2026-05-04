import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { COMPANY, SUPPORT_EMAIL } from '@/lib/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.08] bg-bg-subtle/60">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-white/60">
              JMVC convierte tu negocio en campañas listas para Meta Ads,
              Google Ads y TikTok Ads, con la ayuda de la inteligencia
              artificial.
            </p>
            <p className="mt-4 text-xs text-white/40">
              {COMPANY.legalName} · {COMPANY.address}
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold text-white">Producto</h2>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="/#como-funciona" className="hover:text-white">
                  Cómo funciona
                </Link>
              </li>
              <li>
                <Link href="/#beneficios" className="hover:text-white">
                  Beneficios
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold text-white">Legal</h2>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="/terms" className="hover:text-white">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white">
                  Política de cookies
                </Link>
              </li>
              <li>
                <Link href="/refunds" className="hover:text-white">
                  Reembolsos y cancelaciones
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/[0.08] pt-6 text-xs text-white/40 md:flex-row md:items-center">
          <p>
            © {year} {COMPANY.legalName}. Todos los derechos reservados.
          </p>
          <p>
            Soporte: <a className="hover:text-white" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
