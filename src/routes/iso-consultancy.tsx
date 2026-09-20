import { createFileRoute } from "@tanstack/react-router";

import { GridTexture } from "@/components/artifacts";
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
import { cn } from "@/lib/utils";

const DESCRIPTION =
  "ISO certification consultancy for SMEs in India. Get IAF-accredited ISO 9001, 14001, 45001, 27001 certification with full audit support and 100% certification assurance.";

const STANDARDS = [
  {
    number: "ISO 9001",
    name: "Quality Management",
    description:
      "The world's most recognised quality standard — shows tenders and customers your processes are consistent and built to deliver.",
    position: "min-[1101px]:left-1/2 min-[1101px]:top-[10%]",
  },
  {
    number: "ISO 14001",
    name: "Environmental Management",
    description:
      "Proves your business manages environmental impact responsibly — increasingly required in tenders and by investors.",
    position: "min-[1101px]:left-[78.9%] min-[1101px]:top-[34%]",
  },
  {
    number: "ISO 45001",
    name: "Occupational Health & Safety",
    description:
      "Protects your workforce with a structured system for identifying and controlling workplace risk.",
    position: "min-[1101px]:left-[78.9%] min-[1101px]:top-[66%]",
  },
  {
    number: "ISO 27001",
    name: "Information Security",
    description:
      "Certifies customer data and internal systems are protected — essential for IT, fintech and service businesses.",
    position: "min-[1101px]:left-1/2 min-[1101px]:top-[90%]",
  },
  {
    number: "ISO 22000",
    name: "Food Safety Management",
    description:
      "For food manufacturers and exporters — proves hygiene and traceability are controlled at every stage.",
    position: "min-[1101px]:left-[21.1%] min-[1101px]:top-[66%]",
  },
  {
    number: "ISO 22301",
    name: "Business Continuity Management",
    description:
      "Proves your business can keep operating and recover quickly through disruptions like outages, disasters or supply chain failures — increasingly requested by enterprise clients and regulators.",
    position: "min-[1101px]:left-[21.1%] min-[1101px]:top-[34%]",
  },
] as const;

const SPOKES = [
  { path: "M450 390 L450 110", delay: "0s" },
  { path: "M450 390 L692 250", delay: "-0.5s" },
  { path: "M450 390 L692 530", delay: "-1s" },
  { path: "M450 390 L450 670", delay: "-1.5s" },
  { path: "M450 390 L208 530", delay: "-2s" },
  { path: "M450 390 L208 250", delay: "-2.5s" },
] as const;

const BENEFITS = [
  {
    title: "In plain terms",
    accent: true,
    points: [
      "Wins tenders and contracts that require certification",
      "Builds instant trust with new customers",
      "Opens doors to export and larger clients",
      "Reduces costly mistakes and rework",
    ],
  },
  {
    title: "In technical terms",
    accent: false,
    points: [
      "Documented, standardised processes (SOPs) across the business",
      "Risk-based thinking built into daily operations",
      "Structured internal audits and continuous improvement (PDCA)",
      "Clear traceability and audit trail for every process",
    ],
  },
] as const;

const TIERS = [
  {
    tag: "Start to Finish",
    title: "Full Consultation & Certification",
    body: "For businesses starting from zero — we build your system and take you through to certification.",
    points: [
      "Gap assessment against your standard",
      "Documentation & process setup",
      "Internal audit & staff readiness",
      "External audit by an IAF-accredited body",
      "Your IAF-accredited certificate",
    ],
    highlighted: false,
  },
  {
    tag: "Certification & Report",
    title: "Certification & Audit Report",
    body: "For businesses already compliant — a full audit report and your IAF-accredited certificate, without the extended consulting process.",
    points: [
      "External audit by an IAF-accredited body",
      "Detailed audit report with findings & evidence",
      "Your IAF-accredited certificate",
      "Internationally recognised & government-accepted",
    ],
    highlighted: true,
  },
  {
    tag: "Fastest Route",
    title: "Direct Certification",
    body: "For businesses fully compliant already — receive your IAF-accredited certificate directly, recognised internationally and accepted by government bodies and clients worldwide.",
    points: [
      "External audit by an IAF-accredited body",
      "Your IAF-accredited certificate",
      "Internationally recognised & government-accepted",
      "Quickest route — no extended report or consulting process, just your certificate",
    ],
    highlighted: false,
  },
] as const;

const FAQS = [
  {
    question: "Is ISO certification mandatory in India?",
    answer:
      "Not by law, in most industries. But it's increasingly a practical requirement — many government tenders, larger corporate clients, and export buyers will only work with ISO-certified vendors, which makes it effectively mandatory for businesses that want access to that work.",
  },
  {
    question: "How much does ISO 9001 certification cost for a small business?",
    answer:
      "Cost depends on your business size, current documentation maturity, and which standard you need. A business with no existing systems needs more consulting time than one already largely compliant — we quote after understanding your specific starting point, not off a fixed price list.",
  },
  {
    question: "How long does the ISO certification process take?",
    answer:
      "For a small business starting from scratch, typically a few months from gap assessment to certificate — largely dependent on how quickly your team implements the required documentation and processes. Businesses already close to compliant move through certification audit much faster.",
  },
  {
    question: "What is ISO 9001?",
    answer:
      "ISO 9001 is the world's most widely used management standard — it certifies that your business has a documented, consistently followed quality management system. It's the standard most tenders and corporate clients ask for first, and often the natural starting point for businesses pursuing certification.",
  },
  {
    question: "Do I need ISO 27001 or ISO 22301?",
    answer:
      "ISO 27001 certifies how you protect information and data — relevant if you handle customer data, run IT systems, or operate in fintech/services. ISO 22301 certifies your ability to keep operating through disruptions like outages or disasters. Many businesses that need one eventually need both, since they address different kinds of risk.",
  },
  {
    question: "Do you only work with the standards listed on this page?",
    answer:
      "No — ISO 9001, 14001, 45001, 27001, 22000 and 22301 are simply the standards we're asked for most often. Our consulting process applies across virtually any ISO management system standard; if yours isn't listed here, ask us directly.",
  },
] as const;

export const Route = createFileRoute("/iso-consultancy")({
  head: () => ({
    meta: [
      { title: "ISO Certification Consulting for Small & Growing Businesses | AB Digital" },
      { name: "description", content: DESCRIPTION },
      {
        property: "og:title",
        content: "ISO Certification Consulting for Small & Growing Businesses | AB Digital",
      },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://partner-crafted-digital.lovable.app/iso-consultancy",
      },
      { name: "twitter:card", content: "summary" },
      {
        name: "twitter:title",
        content: "ISO Certification Consulting for Small & Growing Businesses | AB Digital",
      },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [
      { rel: "canonical", href: "https://partner-crafted-digital.lovable.app/iso-consultancy" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }),
      },
    ],
  }),
  component: Iso,
});

function StandardsDiagram() {
  return (
    <>
      <div className="mt-16 grid gap-4 sm:grid-cols-2 min-[1101px]:relative min-[1101px]:mx-auto min-[1101px]:block min-[1101px]:h-[780px] min-[1101px]:w-[900px]">
        <svg
          viewBox="0 0 900 780"
          className="pointer-events-none absolute inset-0 hidden h-full w-full min-[1101px]:block"
          aria-hidden
        >
          {SPOKES.map((spoke) => (
            <g key={spoke.path}>
              <path d={spoke.path} fill="none" stroke="var(--border)" strokeWidth="1" />
              <circle
                r="4"
                fill="var(--accent)"
                className="iso-spoke-dot"
                style={{ offsetPath: `path('${spoke.path}')`, animationDelay: spoke.delay }}
              />
            </g>
          ))}
        </svg>

        <div className="relative mx-auto mb-8 grid h-44 w-44 place-items-center rounded-full border border-accent/40 min-[1101px]:absolute min-[1101px]:left-1/2 min-[1101px]:top-1/2 min-[1101px]:mb-0 min-[1101px]:h-[190px] min-[1101px]:w-[190px] min-[1101px]:-translate-x-1/2 min-[1101px]:-translate-y-1/2">
          <svg viewBox="0 0 190 190" className="iso-globe-spin h-full w-full text-accent" aria-hidden>
            <circle cx="95" cy="95" r="78" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <ellipse cx="95" cy="95" rx="36" ry="78" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.75" />
            <ellipse cx="95" cy="95" rx="62" ry="78" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <ellipse cx="95" cy="95" rx="78" ry="28" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.75" />
            <ellipse cx="95" cy="95" rx="78" ry="55" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <path d="M17 95h156" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <span className="absolute bg-background px-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
            ISO Standards
          </span>
        </div>

        {STANDARDS.map((standard, index) => (
          <Reveal
            key={standard.number}
            delay={index * 70}
            className={cn(
              "relative z-10 rounded-[6px] border border-border bg-card p-5 min-[1101px]:absolute min-[1101px]:w-[250px] min-[1101px]:-translate-x-1/2 min-[1101px]:-translate-y-1/2 min-[1101px]:p-4",
              standard.position,
            )}
          >
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              {standard.number}
            </p>
            <h3 className="mt-2 text-lg min-[1101px]:text-base">{standard.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft min-[1101px]:mt-2 min-[1101px]:text-[11px] min-[1101px]:leading-[1.45]">
              {standard.description}
            </p>
          </Reveal>
        ))}
      </div>
      <p className="mx-auto mt-10 max-w-2xl border-t border-border pt-7 text-center text-sm text-ink-soft min-[1101px]:mt-4">
        Looking for a different standard? Tell us which one — our process adapts to it, not the other way around.
      </p>
    </>
  );
}

function Iso() {
  return (
    <div className="iso-page">
      <SiteLayout>
      <PageHero
        compact
        artifactAccentLabel="#C8102E"
        badge="IAF-Accredited Certification, Every Time"
        title={
          <>
            ISO Certification Consulting for <span className="text-accent">Small & Growing Businesses</span>
          </>
        }
        subtitle="From gap assessment to your final certificate — we guide you through ISO 9001, 14001, 45001 and more, with your certificate issued through an IAF-accredited certification body."
        actions={
          <ButtonLink
            to="/contact"
            hash="enquiry-form"
            search={{ service: "iso" }}
            className="bg-accent text-accent-foreground hover:bg-accent"
          >
            Get Your Tailored ISO Plan
          </ButtonLink>
        }
      />

      <Section texture>
        <Reveal className="mx-auto max-w-4xl text-center">
          <Eyebrow>About ISO Certification</Eyebrow>
          <h2 className="mt-6 text-3xl md:text-5xl">
            What ISO certification actually means for a small business.
          </h2>
        </Reveal>
        <Reveal delay={100} className="mx-auto mt-12 max-w-3xl space-y-6 text-left text-ink-soft">
          <p>
            ISO certification is formal, independent proof that your business follows a recognised international standard — for quality, safety, environmental responsibility, information security, or a dozen other areas depending on which standard applies to you. It isn't a plaque you buy. It's issued only after an accredited certification body audits your actual processes and confirms they meet the standard's requirements.
          </p>
          <p>
            For most small and growing businesses in India, ISO certification becomes necessary the moment a bigger client, a government tender, or an export buyer asks for it — and by then, building the required documentation and processes from scratch under time pressure is exactly the wrong way to do it. Done properly, ahead of time, certification also tends to expose the operational gaps quietly costing you money: inconsistent processes, missing records, and repeated avoidable mistakes.
          </p>
          <p>
            We work across the full range of ISO management system standards — not just the handful most commonly requested. Whichever standard your industry or your client is asking for, the process starts the same way: understanding your business first, then building toward the standard.
          </p>
        </Reveal>
      </Section>

      <Section alt texture contentClassName="max-w-7xl">
        <Reveal className="text-center">
          <Eyebrow>Standards We're Asked For Most</Eyebrow>
          <h2 className="mx-auto mt-6 max-w-4xl text-3xl md:text-5xl">
            Six common standards. Not the only six we cover.
          </h2>
        </Reveal>
        <StandardsDiagram />
      </Section>

      <Section texture>
        <Reveal>
          <Eyebrow>Why Get Certified</Eyebrow>
          <h2 className="mt-6 max-w-4xl text-3xl md:text-5xl">
            What ISO certification actually changes for your business.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {BENEFITS.map((group, index) => (
            <Reveal
              key={group.title}
              delay={index * 100}
              className={cn(
                "rounded-[6px] border border-border border-t-4 p-7 md:p-9",
                group.accent ? "border-t-accent bg-card" : "border-t-primary bg-alt",
              )}
            >
              <h3 className="text-2xl">{group.title}</h3>
              <ul className="mt-7 space-y-4">
                {group.points.map((point) => (
                  <li key={point} className="flex gap-4 text-sm text-ink-soft">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section alt texture>
        <Reveal>
          <Eyebrow>Our ISO Services</Eyebrow>
          <h2 className="mt-6 max-w-4xl text-3xl md:text-5xl">
            Three ways to get certified — same real audit, every time.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TIERS.map((tier, index) => (
            <Reveal
              key={tier.title}
              delay={index * 90}
              className={cn(
                "flex flex-col rounded-[6px] border bg-card p-7 md:p-8",
                tier.highlighted ? "iso-highlight-card border-accent" : "border-border",
              )}
            >
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                {tier.tag}
              </p>
              <h3 className="mt-4 text-2xl">{tier.title}</h3>
              <p className="mt-4 text-sm text-ink-soft">{tier.body}</p>
              <ul className="mt-7 flex-1 space-y-3 border-t border-border pt-7">
                {tier.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm text-ink-soft">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ButtonLink
                  to="/contact"
                  hash="enquiry-form"
                  search={{ service: "iso" }}
                  variant="ghost"
                >
                  Ask about this route
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="relative overflow-hidden bg-cta text-cta-foreground">
        <GridTexture dark />
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              How Certification Works With Us
            </p>
            <h2 className="mt-6 max-w-4xl text-3xl md:text-5xl">
              Direct certification. Real audit. No shortcuts.
            </h2>
            <p className="mt-7 max-w-3xl text-cta-foreground/70">
              We don't just prepare your documents and leave you to find a certification body. We take you through gap assessment, implementation, internal audit, and the actual certification audit — with your final certificate issued through an IAF-accredited certification body. Every certificate carries full international recognition.
            </p>
          </Reveal>
          <div className="mt-14 grid border-y border-cta-foreground/20 sm:grid-cols-3">
            {[
              ["10+", "ISO Standards Covered"],
              ["100%", "Certification Assurance"],
              ["1", "Single Point of Contact"],
            ].map(([number, label], index) => (
              <Reveal
                key={label}
                delay={index * 90}
                className="border-b border-cta-foreground/20 py-8 last:border-b-0 sm:border-r sm:border-b-0 sm:px-8 sm:first:pl-0 sm:last:border-r-0"
              >
                <p className="font-serif text-4xl font-bold text-accent md:text-5xl">{number}</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-cta-foreground/65">
                  {label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Section texture>
        <Reveal>
          <Eyebrow>Common Questions</Eyebrow>
          <h2 className="mt-6 max-w-4xl text-3xl md:text-5xl">
            Questions we get asked before someone commits.
          </h2>
        </Reveal>
        <Accordion type="single" collapsible className="mt-12 border-t border-border">
          {FAQS.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`} className="border-b border-border">
              <AccordionTrigger className="py-6 text-left font-serif text-lg font-bold hover:no-underline md:text-xl">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="max-w-3xl pb-8 text-base text-ink-soft">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <DarkCta
        title="Not sure which standard your business needs?"
        actionLabel="Ask about ISO certification"
        actionHash="enquiry-form"
        actionSearch={{ service: "iso" }}
      />
      </SiteLayout>
    </div>
  );
}
