import { COMPANY, LAST_UPDATED } from '@/lib/site';
import { AlertTriangle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface LegalPageProps {
  title: string;
  intro?: string;
  children: React.ReactNode;
}

export function LegalPage({ title, intro, children }: LegalPageProps) {
  return (
    <>
      <Header />
      <main id="main" className="container max-w-3xl py-16">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-white/55">
          Última actualización: {LAST_UPDATED}
        </p>

        <div
          role="note"
          className="mt-6 flex items-start gap-3 rounded-xl border border-amber-400/20 bg-amber-400/[0.05] p-4 text-sm text-amber-100/85"
        >
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-300" aria-hidden />
          <p>
            Este texto es una <strong>plantilla base</strong> orientativa para
            un servicio SaaS. Debe ser revisado y adaptado por un profesional
            legal en {COMPANY.jurisdiction} antes de su publicación definitiva.
          </p>
        </div>

        {intro && <p className="mt-6 text-white/80">{intro}</p>}

        <div className="legal-content mt-8 space-y-5 text-white/75 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-white [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6 [&_li]:text-white/75 [&_a]:text-brand-300 [&_a:hover]:text-brand-200 [&_strong]:text-white">
          {children}
        </div>

        <p className="mt-12 border-t border-white/[0.06] pt-6 text-xs text-white/45">
          {COMPANY.legalName} · {COMPANY.address}
          {COMPANY.taxId !== '[Número fiscal si aplica]' && ` · ${COMPANY.taxId}`} ·{' '}
          {COMPANY.jurisdiction}
        </p>
      </main>
      <Footer />
    </>
  );
}
