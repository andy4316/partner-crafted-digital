import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense } from "react";

import { Reveal } from "@/components/reveal";
import { Eyebrow, Section, SiteLayout } from "@/components/site-layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqsQuery, pricingQuery, servicesQuery } from "@/lib/content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Pricing — AB Digital Consultancy" },
      {
        name: "description",
        content:
          "Web design, hosting, CMS updates, SEO, maintenance and print materials. Three clear plans from ₹12,000, with yearly care included.",
      },
      { property: "og:title", content: "Services & Pricing — AB Digital Consultancy" },
      {
        property: "og:description",
        content: "Everything we do, and exactly what it costs. Three plans, no hidden extras.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

function ServiceList() {
  const { data } = useSuspenseQuery(servicesQuery);
  return (
    <div className="mt-20 divide-y divide-border border-t border-border">
      {data.map((s, i) => (
        <Reveal key={s.id} className="grid gap-6 py-12 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 text-2xl">{s.title}</h3>
          </div>
          <div>
            <p className="text-muted-foreground">{s.summary}</p>
            <ul className="mt-6 space-y-2">
              {s.points.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function Pricing() {
  const { data } = useSuspenseQuery(pricingQuery);
  return (
    <div className="mt-16 grid gap-8 md:grid-cols-3">
      {data.map((tier, i) => (
        <Reveal
          key={tier.id}
          delay={i * 100}
          className={cn(
            "flex flex-col border p-8",
            tier.recommended
              ? "border-gold bg-card shadow-[0_20px_60px_-40px_rgba(27,42,68,0.6)]"
              : "border-border",
          )}
        >
          {tier.recommended && (
            <p className="mb-4 text-xs uppercase tracking-[0.22em] text-gold">Most chosen</p>
          )}
          <h3 className="font-serif text-2xl">{tier.name}</h3>
          <p className="mt-3 text-sm text-muted-foreground">{tier.blurb}</p>
          <p className="mt-8 font-serif text-3xl">{tier.setup_price}</p>
          <p className="mt-1 text-sm text-muted-foreground">then {tier.yearly_price}</p>
          <ul className="mt-8 space-y-2 border-t border-border pt-8">
            {tier.features.map((f) => (
              <li key={f} className="flex gap-3 text-sm text-muted-foreground">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-teal" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            className="mt-10 inline-block border-b border-foreground/40 pb-0.5 text-sm transition-colors hover:border-gold"
          >
            Talk about {tier.name}
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

function Faqs() {
  const { data } = useSuspenseQuery(faqsQuery);
  return (
    <Accordion type="single" collapsible className="mt-12 border-t border-border">
      {data.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id} className="border-b border-border">
          <AccordionTrigger className="py-6 text-left font-serif text-lg hover:no-underline md:text-xl">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="max-w-3xl pb-8 text-base text-muted-foreground">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function Loading() {
  return <p className="mt-16 text-sm text-muted-foreground">Loading…</p>;
}

function Services() {
  return (
    <SiteLayout>
      <Section>
        <Reveal>
          <Eyebrow>Services</Eyebrow>
          <h1 className="mt-8 max-w-3xl text-4xl md:text-6xl">
            Everything a small business needs online, and a few things it needs on paper.
          </h1>
        </Reveal>
        <Suspense fallback={<Loading />}>
          <ServiceList />
        </Suspense>
      </Section>

      <Section className="border-t border-border">
        <Reveal>
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="mt-8 max-w-3xl text-3xl md:text-5xl">
            One price to build it. One price to keep it alive.
          </h2>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            The yearly fee covers hosting, domain, updates and someone answering when you write. No
            surprise invoices.
          </p>
        </Reveal>
        <Suspense fallback={<Loading />}>
          <Pricing />
        </Suspense>
      </Section>

      <Section className="border-t border-border">
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-8 max-w-2xl text-3xl md:text-5xl">The things people ask first.</h2>
        </Reveal>
        <Suspense fallback={<Loading />}>
          <Faqs />
        </Suspense>
      </Section>
    </SiteLayout>
  );
}
