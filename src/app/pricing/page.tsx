import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Pricing } from '@/components/landing/Pricing';
import { Faq } from '@/components/landing/Faq';
import { CtaFinal } from '@/components/landing/CtaFinal';
import { JsonLd } from '@/components/JsonLd';
import { FAQS } from '@/lib/faqs';

export const metadata: Metadata = {
  title: 'Precios y planes',
  description:
    'Elige el plan de JMVC que mejor se adapta a tu negocio. Starter, Growth o Agency. Sin permanencia, cancela cuando quieras.',
  alternates: { canonical: '/pricing' },
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main id="main" className="pt-10">
        <div className="container max-w-3xl pb-6 text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Precios simples para empezar a lanzar campañas con IA.
          </h1>
          <p className="mt-4 text-white/65">
            Tres planes pensados para distintos momentos de tu negocio.
            Cambia o cancela en cualquier momento.
          </p>
        </div>
        <Pricing />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <JsonLd faq={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
    </>
  );
}
