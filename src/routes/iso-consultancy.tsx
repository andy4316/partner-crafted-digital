import { createFileRoute } from "@tanstack/react-router";

import { ButtonLink } from "@/components/buttons";
import { PageHero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { DarkCta, Eyebrow, Section, SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/iso-consultancy")({
  head: () => ({
    meta: [
      { title: "ISO Certification Consultancy in Bengaluru | AB Digital" },
      {
        name: "description",
        content:
          "ISO certification support for Indian businesses: gap assessment, documentation written around how you actually work, and audit readiness.",
      },
      { property: "og:title", content: "ISO Consultancy — AB Digital Consultancy" },
      {
        property: "og:description",
        content: "ISO certification guidance, documentation and audit readiness.",
      },
      {
        property: "og:url",
        content: "https://partner-crafted-digital.lovable.app/iso-consultancy",
      },
      { name: "twitter:title", content: "ISO Consultancy — AB Digital Consultancy" },
      {
        name: "twitter:description",
        content: "Gap assessment, documentation and audit readiness.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://partner-crafted-digital.lovable.app/iso-consultancy" },
    ],
  }),
  component: Iso,
});

const STEPS = [
  {
    n: "01",
    t: "Gap assessment",
    d: "We look at how you work today and where the standard expects something different.",
  },
  {
    n: "02",
    t: "Documentation",
    d: "Manuals, procedures and records written to match how your business really runs.",
  },
  {
    n: "03",
    t: "Audit readiness",
    d: "Internal audit, corrective actions, and being there when the auditor arrives.",
  },
];

function Iso() {
  return (
    <SiteLayout className="[--accent:#2E6E62]">
      <PageHero
        compact
        badge="Practice area / 02"
        title={
          <>
            ISO <span className="text-accent">consultancy</span>, kept practical.
          </>
        }
        subtitle="A related but separate side of the practice. Certification is paperwork, process and evidence — not design — so it gets its own conversation."
        actions={
          <ButtonLink to="/contact" hash="enquiry-form" search={{ service: "iso" }}>
            Ask about certification
          </ButtonLink>
        }
      />

      <Section>
        <Reveal>
          <Eyebrow>How it runs</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-3xl md:text-5xl">Three steps, no theatre.</h2>
        </Reveal>
        <div className="mt-14 border-t border-border">
          {STEPS.map((step, i) => (
            <Reveal
              key={step.n}
              delay={i * 90}
              className="grid gap-4 border-b border-border py-10 md:grid-cols-[auto_1fr_1.4fr] md:items-baseline"
            >
              <p className="font-mono text-[11px] tracking-[0.28em] text-accent">{step.n}</p>
              <h3 className="text-2xl">{step.t}</h3>
              <p className="font-mono text-sm text-ink-soft">{step.d}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={150}>
          <p className="mt-12 max-w-2xl text-ink-soft">
            This practice area is still being built out. If certification is on your list this year,
            talk to us now and we'll tell you plainly whether we're the right fit.
          </p>
        </Reveal>
      </Section>

      <DarkCta
        title="Certification on the list this year? Let's see if we fit."
        actionLabel="Ask about certification"
        actionHash="enquiry-form"
        actionSearch={{ service: "iso" }}
      />
    </SiteLayout>
  );
}
