import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense } from "react";

import { ButtonLink } from "@/components/buttons";
import { PageHero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { DarkCta, Eyebrow, Section, SiteLayout } from "@/components/site-layout";
import { caseStudiesQuery } from "@/lib/content";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Business Website Case Studies, India | AB Digital Consultancy" },
      {
        name: "description",
        content:
          "Real projects from a Bengaluru web developer: the problem each business came with, what we built for them, and what changed after launch.",
      },
      { property: "og:title", content: "Work — AB Digital Consultancy" },
      {
        property: "og:description",
        content: "Considered, bespoke work for Indian businesses. Problem, build, outcome.",
      },
      { property: "og:url", content: "https://partner-crafted-digital.lovable.app/work" },
      { name: "twitter:title", content: "Work — AB Digital Consultancy" },
      {
        name: "twitter:description",
        content: "Problem, build, outcome — websites we thought hard about.",
      },
    ],
    links: [{ rel: "canonical", href: "https://partner-crafted-digital.lovable.app/work" }],
  }),
  component: Work,
});

function CaseStudies() {
  const { data } = useSuspenseQuery(caseStudiesQuery);
  const studies = data.filter((study) => !study.is_placeholder);

  if (studies.length === 0) {
    return (
      <Reveal className="mt-14">
        <p className="max-w-2xl text-lg text-ink-soft">
          We&apos;re building our first client projects — check back soon, or read how we work on
          the{" "}
          <Link to="/about" className="text-accent underline underline-offset-4">
            About page
          </Link>
          .
        </p>
      </Reveal>
    );
  }

  return (
    <div className="mt-14 border-t border-border">
      {studies.map((study, i) => (
        <Reveal key={study.id} delay={i * 80} className="border-b border-border py-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
            {study.sector}
          </p>
          <h2 className="mt-3 text-2xl md:text-4xl">{study.client_name}</h2>
          <dl className="mt-8 grid gap-8 md:grid-cols-3">
            {[
              ["Problem", study.problem],
              ["Built", study.built],
              ["Outcome", study.outcome],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  {label}
                </dt>
                <dd className="mt-3 text-ink-soft">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      ))}
    </div>
  );
}

function Work() {
  return (
    <SiteLayout>
      <PageHero
        compact
        badge="Selected projects"
        title={
          <>
            Three sites we <span className="text-accent">thought hard about</span>, not thirty we
            didn&apos;t.
          </>
        }
        subtitle="Every project starts the same way: a conversation about what the business actually needs, before anything is designed."
        actions={<ButtonLink to="/contact">Talk about your project</ButtonLink>}
      />

      <Section>
        <Reveal>
          <Eyebrow>Case studies</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-3xl md:text-5xl">Problem, build, outcome.</h2>
        </Reveal>
        <Suspense fallback={<p className="mt-14 text-sm text-ink-soft">Loading…</p>}>
          <CaseStudies />
        </Suspense>
      </Section>

      <DarkCta title="Your business could be the next one on this page." />
    </SiteLayout>
  );
}
