import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense } from "react";

import { Reveal } from "@/components/reveal";
import { Eyebrow, Section, SiteLayout } from "@/components/site-layout";
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
      { property: "og:url", content: "/work" },
      { name: "twitter:title", content: "Work — AB Digital Consultancy" },
      {
        name: "twitter:description",
        content: "Problem, build, outcome — websites we thought hard about.",
      },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
  component: Work,
});

function CaseStudies() {
  const { data } = useSuspenseQuery(caseStudiesQuery);

  return (
    <div className="mt-20 space-y-24">
      {data.map((study, i) => (
        <Reveal key={study.id} as="article" className="border-t border-border pt-12">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {String(i + 1).padStart(2, "0")} — {study.sector}
          </p>
          <h2 className="mt-5 text-2xl md:text-4xl">{study.client_name}</h2>
          <dl className="mt-10 grid gap-10 md:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-teal">The problem</dt>
              <dd className="mt-3 text-muted-foreground">{study.problem}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-teal">What we built</dt>
              <dd className="mt-3 text-muted-foreground">{study.built}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-teal">The outcome</dt>
              <dd className="mt-3 text-muted-foreground">{study.outcome}</dd>
            </div>
          </dl>
          {study.is_placeholder && (
            <p className="mt-8 text-sm text-muted-foreground">
              This slot is reserved. The study goes up the week the client launches.
            </p>
          )}
        </Reveal>
      ))}
    </div>
  );
}

function Work() {
  return (
    <SiteLayout>
      <Section>
        <Reveal>
          <Eyebrow>Work</Eyebrow>
          <h1 className="mt-8 max-w-3xl text-4xl md:text-6xl">
            We'd rather show you three sites we thought hard about than thirty we didn't.
          </h1>
          <p className="mt-8 max-w-2xl text-muted-foreground">
            Every project below started the same way: a conversation about what the business
            actually needed, before anything was designed.
          </p>
        </Reveal>

        <Suspense
          fallback={<p className="mt-20 text-sm text-muted-foreground">Loading case studies…</p>}
        >
          <CaseStudies />
        </Suspense>
      </Section>

      <section className="section-dark">
        <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
          <Reveal>
            <h2 className="max-w-2xl font-serif text-3xl md:text-4xl">
              Your business could be the next one on this page.
            </h2>
            <Link
              to="/contact"
              className="mt-10 inline-block border-b-2 border-gold pb-1 text-sm uppercase tracking-[0.18em]"
            >
              Start a conversation
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
