import { useHead } from '@unhead/react';

interface FAQ {
  question: string;
  answer: string;
}

export const useJsonLd = (type: 'WebApplication' | 'FAQPage', data: any) => {
  let schema: any = {};

  if (type === 'WebApplication') {
    schema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": data.name || "Media Compressor",
      "description": data.description || "In-browser media processing tool.",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "100% Offline Processing",
        "No Cloud Storage",
        "Bank-Grade Privacy",
        "Local CPU/RAM Execution"
      ]
    };
  } else if (type === 'FAQPage') {
    schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data.faqs.map((faq: FAQ) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schema)
      }
    ]
  });
};
