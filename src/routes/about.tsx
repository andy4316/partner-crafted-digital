import { createFileRoute } from "@tanstack/react-router";

import founder from "@/assets/founder.jpg";
import { ButtonLink } from "@/components/buttons";
import { MarkDivider, PageHero } from "@/components/hero";
import lockup from "@/assets/ab-digital-lockup.png.asset.json";
import { Reveal } from "@/components/reveal";
import { DarkCta, Eyebrow, Section, SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Founder | Web Developer in Bengaluru, India" },
      {
        name: "description",
        content:
          "Why AB Digital Consultancy exists: a founder-led web developer in Bengaluru who builds websites for Indian businesses and stays on to look after them.",
      },
      { property: "og:title", content: "About — AB Digital Consultancy" },
      {
        property: "og:description",
        content: "A founder-led web partner built around staying, not shipping and vanishing.",
      },
      { property: "og:url", content: "https://partner-crafted-digital.lovable.app/about" },
      { name: "twitter:title", content: "About — AB Digital Consultancy" },
      {
        name: "twitter:description",
        content: "A founder-led web partner in Bengaluru, built around staying.",
      },
    ],
    links: [{ rel: "canonical", href: "https://partner-crafted-digital.lovable.app/about" }],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <PageHero
        compact
        badge="Founder-led, Bengaluru"
        title={
          <>
            Too many good businesses were being <span className="text-accent">let down</span>.
          </>
        }
        subtitle="So I started building websites the way I'd want mine looked after — properly, then permanently."
        actions={<ButtonLink to="/contact">Say hello</ButtonLink>}
      />

      <Section>
        <div className="grid gap-16 md:grid-cols-[1fr_1.15fr] md:items-start">
          <Reveal>
            <img
              src={founder}
              alt="Founder of AB Digital Consultancy, a web design and SEO studio in Bengaluru, at his desk"
              width={1024}
              height={1280}
              loading="lazy"
              className="w-full rounded-md border border-border object-cover"
            />
          </Reveal>
          <Reveal delay={120} className="space-y-6 text-ink-soft">
            <Eyebrow>The story</Eyebrow>
            <p>
              I kept meeting owners who had paid for a website once, years ago. It looked dated. The
              phone number on it was wrong. Nobody knew the password. The person who built it had
              stopped replying.
            </p>
            <p>
              That isn't a technology problem. It's an abandonment problem. A website isn't a thing
              you buy once — it's a part of your business that needs someone looking after it, the
              same way your shop needs sweeping.
            </p>
            <p>
              So the arrangement here is simple. We build it properly, then we stay. Prices change,
              you send a message. Google changes something, we deal with it. You never have to
              wonder who to call.
            </p>
            <p className="text-ink">
              It was never about a single transaction. It's about building something that keeps
              standing on its own, with someone standing behind it.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section alt>
        <div className="grid gap-12 md:grid-cols-[auto_1fr] md:items-center">
          <Reveal>
            <img
              src={lockup.url}
              alt="AB Digital Consultancy logo: two navy pillars forming a hidden upward arrow, beside the wordmark"
              width={420}
              height={204}
              className="w-full max-w-[320px]"
            />
          </Reveal>
          <Reveal delay={120}>
            <Eyebrow>The mark</Eyebrow>
            <h2 className="mt-4 text-2xl md:text-4xl">
              Two pillars, and an arrow you only see later.
            </h2>
            <p className="mt-5 max-w-2xl text-ink-soft">
              The mark is two pillars — the work and the relationship. Between them, in the space
              nobody designed on purpose, there's an arrow pointing up. That's the part we like:
              growth happens in the gap between doing the work and sticking around.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section texture>
        <Reveal>
          <Eyebrow>How we work</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-3xl md:text-5xl">Slow to start, quick to answer.</h2>
        </Reveal>
        <div className="mt-16 grid items-center gap-10 md:grid-cols-[1fr_auto_1fr]">
          <Reveal delay={100}>
            <h3 className="text-2xl">We ask first</h3>
            <p className="mt-4 text-ink-soft">
              Before anything is designed, we talk about who your customers are and what they need
              to see before they call you. Most of the value is decided in that conversation.
            </p>
          </Reveal>
          <MarkDivider className="md:h-40 md:w-16 md:flex-col" />
          <Reveal delay={200}>
            <h3 className="text-2xl">Then we stay</h3>
            <p className="mt-4 text-ink-soft">
              Launch day is the middle of the job, not the end. Updates, hosting, backups and search
              health continue quietly in the background while you run the business.
            </p>
          </Reveal>
        </div>
      </Section>

      <DarkCta title="If that sounds like the way you'd want to work, say hello." actionLabel="Contact us" />
    </SiteLayout>
  );
}
