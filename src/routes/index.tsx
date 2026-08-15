import { createFileRoute, Link } from "@tanstack/react-router";

import { Reveal } from "@/components/reveal";
import { Eyebrow, Section, SiteLayout } from "@/components/site-layout";
import { TAGLINE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Website Design for Small Business in India | AB Digital Consultancy" },
      {
        name: "description",
        content:
          "Bengaluru web design studio building affordable business websites in India — design, hosting, SEO and maintenance from one partner who stays after launch.",
      },
      { property: "og:title", content: "AB Digital Consultancy — A website is only the beginning" },
      {
        property: "og:description",
        content:
          "Design, hosting, SEO, maintenance and print — handled by one team that stays after launch.",
      },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: "AB Digital Consultancy — A website is only the beginning" },
      {
        name: "twitter:description",
        content: "Websites, hosting, SEO and maintenance for small businesses in India.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <section className="section-dark flex min-h-[88vh] items-center">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <Reveal>
            <h1 className="max-w-4xl font-serif text-[2.6rem] leading-[1.1] sm:text-6xl md:text-7xl">
              {TAGLINE}
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-xl text-lg opacity-75">
              Most web developers hand you a website and disappear. We stay.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <Link
              to="/contact"
              className="mt-12 inline-block border-b-2 border-gold pb-1 text-sm uppercase tracking-[0.18em]"
            >
              Start a conversation
            </Link>
          </Reveal>
        </div>
      </section>

      <Section>
        <Reveal>
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-8 max-w-3xl text-3xl md:text-5xl">
            Everything your business needs to exist online, from one place.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-8 max-w-2xl text-muted-foreground">
            Design and development. Hosting and domains. Content updates when your prices change.
            Search visibility so people find you. Flyers and cards when you need something printed.
            One number to call for all of it.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <Link
            to="/services"
            className="mt-10 inline-block border-b border-foreground/30 pb-0.5 text-sm transition-colors hover:border-gold"
          >
            See the full list
          </Link>
        </Reveal>
      </Section>

      <Section className="border-t border-border">
        <Reveal>
          <Eyebrow>Why we're different</Eyebrow>
          <h2 className="mt-8 max-w-3xl text-3xl md:text-5xl">
            No lock-in. One partner, not five vendors.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <Reveal delay={100}>
            <h3 className="text-xl">You own everything</h3>
            <p className="mt-4 text-muted-foreground">
              Your domain is in your name. Your files are yours. If you ever want to leave, we hand
              it all over and help the next person settle in. Staying should be a choice, not a
              trap.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <h3 className="text-xl">One person answers</h3>
            <p className="mt-4 text-muted-foreground">
              No designer blaming the developer, no host blaming the SEO agency. You message us and
              the thing gets fixed. That is the whole arrangement.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className="border-t border-border">
        <Reveal>
          <Eyebrow>A glimpse of the work</Eyebrow>
          <h2 className="mt-8 max-w-3xl text-3xl md:text-5xl">
            Built for real businesses, one at a time.
          </h2>
          <p className="mt-8 max-w-2xl text-muted-foreground">
            We don't run a template gallery. Every site starts with a conversation about who your
            customers are and what they need to see before they call you.
          </p>
          <Link
            to="/work"
            className="mt-10 inline-block border-b border-foreground/30 pb-0.5 text-sm transition-colors hover:border-gold"
          >
            Look at the work
          </Link>
        </Reveal>
      </Section>

      <section className="section-dark">
        <div className="mx-auto max-w-6xl px-6 py-28 md:py-40">
          <Reveal>
            <h2 className="max-w-3xl font-serif text-3xl md:text-5xl">
              Tell us about your business. We'll tell you honestly what it needs.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <Link
              to="/contact"
              className="mt-12 inline-block border-b-2 border-gold pb-1 text-sm uppercase tracking-[0.18em]"
            >
              Get in touch
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
