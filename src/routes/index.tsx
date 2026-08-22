import { createFileRoute } from "@tanstack/react-router";

import { CodeArtifact, TerminalArtifact } from "@/components/artifacts";
import { ButtonLink } from "@/components/buttons";
import { MarkDivider, PageHero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { DarkCta, Eyebrow, Section, SiteLayout } from "@/components/site-layout";

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
      { property: "og:url", content: "https://partner-crafted-digital.lovable.app/" },
      { name: "twitter:title", content: "AB Digital Consultancy — A website is only the beginning" },
      {
        name: "twitter:description",
        content: "Websites, hosting, SEO and maintenance for small businesses in India.",
      },
    ],
    links: [{ rel: "canonical", href: "https://partner-crafted-digital.lovable.app/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <PageHero
        badge="Available for new projects"
        title={
          <>
            A website is <span className="text-accent">only the beginning</span>.
          </>
        }
        subtitle="Most web developers hand you a website and disappear. We stay — hosting it, updating it, and picking up the phone when something breaks."
        actions={
          <>
            <ButtonLink to="/contact">Start a conversation</ButtonLink>
            <ButtonLink to="/services" variant="ghost">
              See what we do
            </ButtonLink>
          </>
        }
      />

      <Section texture>
        <CodeArtifact className="right-[3%] top-[18%]" delay={400} duration={8.5} />
        <Reveal>
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-3xl md:text-5xl">
            Everything your business needs to exist online, from one place.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-8 max-w-2xl text-ink-soft">
            Design and development. Hosting and domains. Content updates when your prices change.
            Search visibility so people find you. Flyers and cards when you need something printed.
            One number to call for all of it.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-10">
            <ButtonLink to="/services" variant="ghost">
              See the full list
            </ButtonLink>
          </div>
        </Reveal>
      </Section>

      <Section alt>
        <Reveal>
          <Eyebrow>Why we're different</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-3xl md:text-5xl">
            No lock-in. One partner, not five vendors.
          </h2>
        </Reveal>
        <div className="mt-16 grid items-center gap-10 md:grid-cols-[1fr_auto_1fr]">
          <Reveal delay={100}>
            <h3 className="text-2xl">You own everything</h3>
            <p className="mt-4 text-ink-soft">
              Your domain is in your name. Your files are yours. If you ever want to leave, we hand
              it all over and help the next person settle in. Staying should be a choice, not a
              trap.
            </p>
          </Reveal>
          <MarkDivider className="md:h-40 md:w-16 md:flex-col" />
          <Reveal delay={200}>
            <h3 className="text-2xl">One person answers</h3>
            <p className="mt-4 text-ink-soft">
              No designer blaming the developer, no host blaming the SEO agency. You message us and
              the thing gets fixed. That's the whole arrangement.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section texture>
        <TerminalArtifact className="left-[2%] bottom-[20%]" delay={1200} duration={7.5} />
        <Reveal>
          <Eyebrow>A glimpse of the work</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-3xl md:text-5xl">
            Built for real businesses, one at a time.
          </h2>
          <p className="mt-8 max-w-2xl text-ink-soft">
            We don't run a template gallery. Every site starts with a conversation about who your
            customers are and what they need to see before they call you.
          </p>
          <div className="mt-10">
            <ButtonLink to="/work" variant="ghost">
              Look at the work
            </ButtonLink>
          </div>
        </Reveal>
      </Section>

      <DarkCta
        title="Tell us about your business. We'll tell you honestly what it needs."
        body="No sales call, no jargon. A short message is enough to start."
        actionLabel="Get in touch"
      />
    </SiteLayout>
  );
}
