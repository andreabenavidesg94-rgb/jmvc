import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { NoSubmitForm } from '@/components/NoSubmitForm';

export const metadata: Metadata = {
  title: 'Iniciar sesión',
  description: 'Accede a tu cuenta de JMVC.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/login' },
};

/**
 * Placeholder profesional para login.
 *
 * TODO(auth): conectar con Auth.js / NextAuth.
 * - Sustituir el `<form>` por un Server Action o API route que llame
 *   a `signIn('credentials', ...)` o al provider que decidas.
 * - Mantener exactamente esta estructura visual para no rehacer la UI.
 */
export default function LoginPage() {
  return (
    <>
      <Header />
      <main id="main" className="container flex min-h-[70vh] items-center py-16">
        <div className="mx-auto w-full max-w-md">
          <div className="card">
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Iniciar sesión
            </h1>
            <p className="mt-1 text-sm text-white/60">
              Accede a tu cuenta de JMVC para gestionar tus campañas.
            </p>

            <NoSubmitForm className="mt-6 space-y-4" ariaDescribedBy="login-disabled-note">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-white/85"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  disabled
                  placeholder="tu@empresa.com"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder:text-white/30 disabled:opacity-60"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-medium text-white/85"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  disabled
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder:text-white/30 disabled:opacity-60"
                />
              </div>

              <button type="submit" disabled className="btn-primary w-full disabled:opacity-60">
                Entrar
              </button>

              <p id="login-disabled-note" className="text-center text-xs text-white/45">
                La autenticación aún no está activa. Conecta Auth.js / NextAuth para habilitarla.
              </p>
            </NoSubmitForm>
          </div>

          <p className="mt-6 text-center text-sm text-white/60">
            ¿No tienes cuenta?{' '}
            <Link href="/signup" className="text-brand-300 hover:text-brand-200">
              Crear cuenta
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
