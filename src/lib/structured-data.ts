import { BUSINESS_ID, SITE_URL } from "@/lib/site";

/** Head script entry for one schema.org JSON-LD block. */
export function jsonLd(data: Record<string, unknown>) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({ "@context": "https://schema.org", ...data }),
  };
}

export function servicesSchema(services: { title: string; summary: string }[]) {
  return jsonLd({
    "@type": "ItemList",
    name: "Services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.summary,
        provider: { "@id": BUSINESS_ID },
        areaServed: { "@type": "Country", name: "India" },
        url: `${SITE_URL}/services`,
      },
    })),
  });
}

export function pricingSchema(
  tiers: { name: string; setup_price: string; yearly_price: string; blurb: string }[],
) {
  return jsonLd({
    "@type": "OfferCatalog",
    name: "Website packages",
    itemListElement: tiers.map((tier) => ({
      "@type": "Offer",
      name: tier.name,
      description: `${tier.blurb} Then ${tier.yearly_price}.`,
      price: tier.setup_price.replace(/[^0-9]/g, ""),
      priceCurrency: "INR",
      url: `${SITE_URL}/services`,
      seller: { "@id": BUSINESS_ID },
    })),
  });
}

export function faqSchema(faqs: readonly { question: string; answer: string }[]) {
  return jsonLd({
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  });
}
