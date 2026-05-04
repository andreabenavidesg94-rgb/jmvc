import { SITE, SUPPORT_EMAIL, COMPANY } from '@/lib/site';
import { PLAN_LIST } from '@/lib/plans';

interface JsonLdProps {
  faq?: { q: string; a: string }[];
}

export function JsonLd({ faq }: JsonLdProps) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    // logo se referencia en public/README.md (tamaño recomendado 512x512 PNG).
    // Si todavía no has subido logo.png, este campo apuntará a un 404; en ese
    // caso considera quitarlo temporalmente o sustituirlo por /favicon.svg.
    logo: `${SITE.url}/logo.png`,
    legalName: COMPANY.legalName,
    address: COMPANY.address,
    email: SUPPORT_EMAIL,
  };

  const softwareApp = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE.name,
    description: SITE.longDescription,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: SITE.url,
    offers: PLAN_LIST.map((p) => ({
      '@type': 'Offer',
      name: p.name,
      price: p.monthlyPrice.toString(),
      priceCurrency: 'EUR',
      url: `${SITE.url}/pricing`,
      category: 'Subscription',
    })),
  };

  const faqPage = faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }}
      />
      {faqPage && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
        />
      )}
    </>
  );
}
