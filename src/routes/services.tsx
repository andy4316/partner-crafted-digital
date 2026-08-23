import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { FileText, Layout, Megaphone, Printer, Search, Server, Wrench } from "lucide-react";
import { Suspense } from "react";

import { BrowserArtifact, CssArtifact } from "@/components/artifacts";
import { ButtonLink } from "@/components/buttons";
import { PageHero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { DarkCta, Eyebrow, Section, SiteLayout } from "@/components/site-layout";
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
      { title: "Affordable Business Website Packages & Pricing India | AB Digital" },
      {
        name: "description",
        content:
          "Web design, hosting, SEO, maintenance and print for Indian businesses. Three clear packages from ₹12,000, with yearly care included and no hidden extras.",
      },
      { property: "og:title", content: "Services & Pricing — AB Digital Consultancy" },
      {
        property: "og:description",
        content: "Everything we do, and exactly what it costs. Three plans, no hidden extras.",
      },
      { property: "og:url", content: "https://partner-crafted-digital.lovable.app/services" },
      { name: "twitter:title", content: "Services & Pricing — AB Digital Consultancy" },
      {
        name: "twitter:description",
        content: "Website packages from ₹12,000, with hosting, SEO and care included.",
      },
    ],
    links: [{ rel: "canonical", href: "https://partner-crafted-digital.lovable.app/services" }],
  }),
  component: Services,
});

const SERVICE_ICONS = [Layout, Server, FileText, Search, Wrench, Megaphone, Printer] as const;

function ServiceList() {
  const { data } = useSuspenseQuery(servicesQuery);
  return (
    <div className="mt-14 border-t border-border">
      {data.map((s, i) => {
        const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length] ?? Layout;
        return (
          <Reveal
            key={s.id}
            delay={(i % 3) * 70}
            className="group grid gap-6 border-b border-border py-10 md:grid-cols-[auto_1fr_1.2fr] md:items-start"
          >
            <Icon
              className="h-6 w-6 shrink-0 stroke-[1.25] text-accent transition-transform duration-300 group-hover:-translate-y-0.5"
              aria-hidden
            />
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-2xl">{s.title}</h3>
            </div>
            <div>
              <p className="font-mono text-sm leading-relaxed text-ink-soft">{s.summary}</p>
              <ul className="mt-4 space-y-1.5">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 font-mono text-xs text-ink-soft">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

function Pricing() {
  const { data } = useSuspenseQuery(pricingQuery);
  return (
    <div className="mt-14 grid gap-6 md:grid-cols-3">
      {data.map((tier, i) => (
        <Reveal
          key={tier.id}
          delay={i * 90}
          className={cn(
            "flex flex-col rounded-[6px] border bg-white p-8",
            tier.recommended ? "border-accent" : "border-border",
          )}
        >
          {tier.recommended && (
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Most chosen
            </p>
          )}
          <h3 className="text-2xl">{tier.name}</h3>
          <p className="mt-3 text-sm text-ink-soft">{tier.blurb}</p>
          <p className="mt-8 font-serif text-3xl font-bold">{tier.setup_price}</p>
          <p className="mt-1 font-mono text-xs text-ink-soft">then {tier.yearly_price}</p>
          <ul className="mt-8 space-y-2 border-t border-border pt-8">
            {tier.features.map((f) => (
              <li key={f} className="flex gap-3 text-sm text-ink-soft">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ButtonLink to="/contact" variant="ghost">
              Talk about {tier.name}
            </ButtonLink>
          </div>
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
          <AccordionTrigger className="py-6 text-left font-serif text-lg font-bold hover:no-underline md:text-xl">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="max-w-3xl pb-8 text-base text-ink-soft">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function Loading() {
  return <p className="mt-14 text-sm text-ink-soft">Loading…</p>;
}

function Services() {
  return (
    <SiteLayout>
      <PageHero
        compact
        badge="Design · Hosting · SEO · Print"
        title={
          <>
            Everything a business needs online, <span className="text-accent">handled</span>.
          </>
        }
        subtitle="One partner for the website, the hosting, the search visibility and the printed things — with clear pricing and nothing hidden."
        actions={
          <>
            <ButtonLink to="/contact">Get a quote</ButtonLink>
            <ButtonLink to="/work" variant="ghost">
              See the work
            </ButtonLink>
          </>
        }
      />

      <Section texture>
        <CssArtifact className="right-[3%] top-[12%]" delay={600} duration={8} />
        <Reveal>
          <Eyebrow>Services</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-3xl md:text-5xl">
            The full list, in plain language.
          </h2>
        </Reveal>
        <Suspense fallback={<Loading />}>
          <ServiceList />
        </Suspense>
      </Section>

      <Section alt>
        <Reveal>
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-3xl md:text-5xl">
            One price to build it. One price to keep it alive.
          </h2>
          <p className="mt-6 max-w-2xl text-ink-soft">
            The yearly fee covers hosting, domain, updates and someone answering when you write. No
            surprise invoices.
          </p>
        </Reveal>
        <Suspense fallback={<Loading />}>
          <Pricing />
        </Suspense>
      </Section>

      <Section texture>
        <BrowserArtifact className="left-[2%] top-[16%]" delay={300} duration={7.5} />
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-6 max-w-2xl text-3xl md:text-5xl">The things people ask first.</h2>
        </Reveal>
        <Suspense fallback={<Loading />}>
          <Faqs />
        </Suspense>
      </Section>

      <DarkCta title="Not sure which plan fits? Tell us the business and we'll say plainly." />
    </SiteLayout>
  );
}
