import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/landing/Hero';
import { StatsCounter } from '@/components/landing/StatsCounter';
import { Problem } from '@/components/landing/Problem';
import { Solution } from '@/components/landing/Solution';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Platforms } from '@/components/landing/Platforms';
import { Benefits } from '@/components/landing/Benefits';
import { Differentiator } from '@/components/landing/Differentiator';
import { Testimonials } from '@/components/landing/Testimonials';
import { Pricing } from '@/components/landing/Pricing';
import { Faq } from '@/components/landing/Faq';
import { CtaFinal } from '@/components/landing/CtaFinal';
import { InteractiveDotBackground } from '@/components/landing/InteractiveDotBackground';
import { JsonLd } from '@/components/JsonLd';

export default function HomePage() {
  return (
    <>
      {/* Fondo interactivo global de partículas conectadas.
          Es 'use client' y se monta solo en la home (no en /login, /dashboard…). */}
      <InteractiveDotBackground />

      <Header />
      <main id="main">
        <Hero />
        <StatsCounter />
        <Problem />
        <Solution />
        <HowItWorks />
        <Platforms />
        <Differentiator />
        <Benefits />
        <Testimonials />
        <Pricing />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <JsonLd />
    </>
  );
}
