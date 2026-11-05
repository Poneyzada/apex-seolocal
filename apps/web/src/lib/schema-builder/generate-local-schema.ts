// apps/web/src/lib/schema-builder/generate-local-schema.ts

export interface PostalAddressInput {
  streetAddress: string;
  neighborhood: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry?: string;
}

export interface FAQItemInput {
  question: string;
  answer: string;
}

export interface ReviewItemInput {
  authorName: string;
  ratingValue: number;
  reviewBody: string;
  datePublished: string; // YYYY-MM-DD
}

export interface ApexSchemaGeneratorInput {
  businessType?: 'LocalBusiness' | 'ProfessionalService' | 'MedicalBusiness' | 'LegalService' | 'HomeAndConstructionBusiness';
  companyName: string;
  legalName: string;
  taxIdCnpj: string;
  websiteUrl: string;
  landingPageUrl: string;
  telephone: string;
  email: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  imageUrls: string[];
  logoUrl: string;
  address: PostalAddressInput;
  geo: {
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification: Array<{
    dayOfWeek: Array<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'>;
    opens: string; // "08:00"
    closes: string; // "18:00"
  }>;
  primaryService: {
    name: string;
    serviceType: string;
    description: string;
    areaServedCities: string[];
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
  reviews?: ReviewItemInput[];
  faqs?: FAQItemInput[];
  sameAsSocialUrls?: string[];
}

export function generateDeterministicJsonLd(input: ApexSchemaGeneratorInput): {
  rawObject: Record<string, unknown>;
  scriptTagHtml: string;
} {
  const cleanSiteUrl = input.websiteUrl.replace(/\/$/, '');
  const businessEntityId = `${cleanSiteUrl}/#organization`;
  const serviceEntityId = `${input.landingPageUrl}#service`;
  const faqEntityId = `${input.landingPageUrl}#faq`;

  const localBusinessNode: Record<string, unknown> = {
    '@type': input.businessType ?? 'ProfessionalService',
    '@id': businessEntityId,
    name: input.companyName,
    legalName: input.legalName,
    taxID: input.taxIdCnpj,
    url: cleanSiteUrl,
    telephone: input.telephone,
    email: input.email,
    priceRange: input.priceRange,
    logo: {
      '@type': 'ImageObject',
      url: input.logoUrl,
    },
    image: input.imageUrls,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${input.address.streetAddress} - ${input.address.neighborhood}`,
      addressLocality: input.address.addressLocality,
      addressRegion: input.address.addressRegion,
      postalCode: input.address.postalCode,
      addressCountry: input.address.addressCountry ?? 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: Number(input.geo.latitude.toFixed(6)),
      longitude: Number(input.geo.longitude.toFixed(6)),
    },
    openingHoursSpecification: input.openingHoursSpecification.map((spec) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: spec.dayOfWeek,
      opens: spec.opens,
      closes: spec.closes,
    })),
    sameAs: input.sameAsSocialUrls ?? [],
  };

  if (input.aggregateRating && input.aggregateRating.reviewCount > 0) {
    localBusinessNode.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: Number(input.aggregateRating.ratingValue.toFixed(2)),
      reviewCount: input.aggregateRating.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  if (input.reviews && input.reviews.length > 0) {
    localBusinessNode.review = input.reviews.map((rev) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: rev.authorName,
      },
      datePublished: rev.datePublished,
      reviewBody: rev.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: rev.ratingValue,
        bestRating: 5,
        worstRating: 1,
      },
    }));
  }

  const serviceNode: Record<string, unknown> = {
    '@type': 'Service',
    '@id': serviceEntityId,
    name: input.primaryService.name,
    serviceType: input.primaryService.serviceType,
    description: input.primaryService.description,
    provider: {
      '@id': businessEntityId,
    },
    areaServed: input.primaryService.areaServedCities.map((city) => ({
      '@type': 'City',
      name: city,
    })),
  };

  const graphNodes: Array<Record<string, unknown>> = [localBusinessNode, serviceNode];

  if (input.faqs && input.faqs.length > 0) {
    graphNodes.push({
      '@type': 'FAQPage',
      '@id': faqEntityId,
      mainEntity: input.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  const rawObject = {
    '@context': 'https://schema.org',
    '@graph': graphNodes,
  };

  const jsonString = JSON.stringify(rawObject, null, 2);
  const scriptTagHtml = `<script type="application/ld+json">\n${jsonString}\n</script>`;

  return { rawObject, scriptTagHtml };
}
