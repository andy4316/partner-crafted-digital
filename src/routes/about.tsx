import { createFileRoute } from "@tanstack/react-router";

import { ButtonLink } from "@/components/buttons";
import { ExplodedMark } from "@/components/exploded-mark";
import { MarkDivider, PageHero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { DarkCta, Eyebrow, Section, SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Idea Behind the Mark | AB Digital Consultancy, Bengaluru" },
      {
        name: "description",
        content:
          "Two pillars, one arrow in the space between them. The thinking behind AB Digital Consultancy: a web partner in Bengaluru built on the relationship, not the transaction.",
      },
      { property: "og:title", content: "The idea behind the mark — AB Digital Consultancy" },
      {
        property: "og:description",
        content: "It's the relationship, not the transaction, that gets a business online and growing.",
      },
      { property: "og:url", content: "https://partner-crafted-digital.lovable.app/about" },
      { name: "twitter:title", content: "The idea behind the mark — AB Digital Consultancy" },
      {
        name: "twitter:description",
        content: "A web partner built on the relationship, not the transaction.",
      },
    ],
    links: [{ rel: "canonical", href: "https://partner-crafted-digital.lovable.app/about" }],
  }),
  component: About,
});

const SPECS = [
  {
    id: "01",
    label: "Component A — You",
    body: "The business, already running. Customers, prices, a way of doing things. Nothing we build should ask you to change any of it.",
  },
  {
    id: "02",
    label: "Component B — Us",
    body: "The side that stays. Hosting, updates, search health, the person who replies. Built once, then looked after indefinitely.",
  },
  {
    id: "03",
    label: "Assembly — the gap",
    body: "Neither pillar carries the growth on its own. The arrow only exists because both stand there, holding the space between them.",
  },
] as const;

function About() {
  return (
    <SiteLayout>
      <PageHero
        compact
        badge="Fig. 01 — the mark, disassembled"
        title={
          <>
            Two pillars, and the <span className="text-accent">arrow</span> between them.
          </>
        }
        subtitle="Our whole way of working is drawn into the logo. Here it is, taken apart."
        actions={<ButtonLink to="/contact">Say hello</ButtonLink>}
      />

      <Section texture>
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <Reveal>
            <div className="relative rounded-[6px] border border-border bg-card p-6 md:p-10">
              <span
                aria-hidden
                className="blueprint-line absolute inset-x-6 top-3 h-px opacity-70"
              />
              <span
                aria-hidden
                className="blueprint-line-y absolute inset-y-6 left-3 w-px opacity-70"
              />
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-soft">
                AB-DC / mark / exploded view / rev. 3
              </p>
              <ExplodedMark className="mt-4" />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Eyebrow>Specification</Eyebrow>
            <h2 className="mt-6 text-3xl md:text-5xl">
              It's the relationship, not the transaction.
            </h2>
            <p className="mt-6 text-ink-soft">
              A website isn't a product you take delivery of once. It's a working part of the
              business, and it needs someone standing behind it the day after launch and the year
              after that.
            </p>
            <dl className="mt-10 border-t border-border">
              {SPECS.map((spec) => (
                <div key={spec.id} className="grid gap-2 border-b border-border py-6 sm:grid-cols-[auto_1fr] sm:gap-8">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                    {spec.id}
                  </dt>
                  <dd>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
                      {spec.label}
                    </p>
                    <p className="mt-2 text-sm text-ink-soft">{spec.body}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      <Section alt>
        <Reveal>
          <Eyebrow>Operating notes</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-3xl md:text-5xl">Slow to start, quick to answer.</h2>
        </Reveal>
        <div className="mt-16 grid items-center gap-10 md:grid-cols-[1fr_auto_1fr]">
          <Reveal delay={100}>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
              Before the build
            </p>
            <h3 className="mt-3 text-2xl">We ask first</h3>
            <p className="mt-4 text-ink-soft">
              Nothing gets designed until we know who your customers are and what they need to see
              before they call you. Most of the value is decided in that conversation.
            </p>
          </Reveal>
          <MarkDivider className="hidden md:flex md:h-40 md:w-16 md:flex-col" />
          <Reveal delay={200}>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
              After the build
            </p>
            <h3 className="mt-3 text-2xl">Then we stay</h3>
            <p className="mt-4 text-ink-soft">
              Launch day is the middle of the job, not the end. Updates, hosting, backups and search
              health continue quietly while you run the business.
            </p>
          </Reveal>
        </div>
      </Section>

      <DarkCta
        title="If that's the way you'd want to work, say hello."
        body="Tell us about the business. We'll tell you plainly what it needs and what it costs."
        actionLabel="Contact us"
      />
    </SiteLayout>
  );
}
