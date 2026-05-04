import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/landing/Hero';
import { Problem } from '@/components/landing/Problem';
import { Solution } from '@/components/landing/Solution';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Benefits } from '@/components/landing/Benefits';
import { Testimonials } from '@/components/landing/Testimonials';
import { Comparison } from '@/components/landing/Comparison';
import { Pricing } from '@/components/landing/Pricing';
import { Faq } from '@/components/landing/Faq';
import { CtaFinal } from '@/components/landing/CtaFinal';
import { JsonLd } from '@/components/JsonLd';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Benefits />
        <Testimonials />
        <Comparison />
        <Pricing />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      {/*
        FAQPage JSON-LD vive solo en /pricing para evitar duplicación de
        contenido estructurado entre rutas. Aquí inyectamos solo
        Organization + SoftwareApplication.
      */}
      <JsonLd />
    </>
  );
}
