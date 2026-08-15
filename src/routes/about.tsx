import { createFileRoute, Link } from "@tanstack/react-router";

import founder from "@/assets/founder.jpg";
import logoMark from "@/assets/logo-mark.png";
import { Reveal } from "@/components/reveal";
import { Eyebrow, Section, SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — AB Digital Consultancy" },
      {
        name: "description",
        content:
          "Why AB Digital Consultancy exists: a founder-led web partner for Indian businesses, built around relationships rather than one-off projects.",
      },
      { property: "og:title", content: "About — AB Digital Consultancy" },
      {
        property: "og:description",
        content: "A founder-led web partner built around staying, not shipping and vanishing.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <Section>
        <Reveal>
          <Eyebrow>About</Eyebrow>
          <h1 className="mt-8 max-w-3xl text-4xl md:text-6xl">
            I started this because too many good businesses were being let down.
          </h1>
        </Reveal>

        <div className="mt-20 grid gap-16 md:grid-cols-[1fr_1.15fr] md:items-start">
          <Reveal>
            <img
              src={founder}
              alt="The founder of AB Digital Consultancy"
              width={1024}
              height={1280}
              className="w-full object-cover"
            />
          </Reveal>
          <Reveal delay={120} className="space-y-6 text-muted-foreground">
            <p>
              I kept meeting owners who had paid for a website once, years ago. It looked dated. The
              phone number on it was wrong. Nobody knew the password. The person who built it had
              stopped replying.
            </p>
            <p>
              That is not a technology problem. It is an abandonment problem. A website is not a
              thing you buy once — it is a part of your business that needs someone looking after
              it, the same way your shop needs sweeping.
            </p>
            <p>
              So the arrangement here is simple. We build it properly, then we stay. Prices change,
              you send a message. Google changes something, we deal with it. You never have to
              wonder who to call.
            </p>
            <p className="text-foreground">
              It was never about a single transaction. It is about building something that keeps
              standing on its own, with someone standing behind it.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="grid gap-12 md:grid-cols-[auto_1fr] md:items-center">
          <Reveal>
            <img src={logoMark} alt="" width={96} height={96} loading="lazy" className="h-24 w-24" />
          </Reveal>
          <Reveal delay={120}>
            <h2 className="text-2xl md:text-3xl">Two pillars, and an arrow you only see later.</h2>
            <p className="mt-5 max-w-2xl text-muted-foreground">
              The mark is two pillars — the work and the relationship. Between them, in the space
              nobody designed on purpose, there is an arrow pointing up. That is the part we like:
              growth is what happens in the gap between doing the work and sticking around.
            </p>
          </Reveal>
        </div>
      </Section>

      <section className="section-dark">
        <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
          <Reveal>
            <h2 className="max-w-2xl font-serif text-3xl md:text-4xl">
              If that sounds like the way you'd want to work, say hello.
            </h2>
            <Link
              to="/contact"
              className="mt-10 inline-block border-b-2 border-gold pb-1 text-sm uppercase tracking-[0.18em]"
            >
              Contact us
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
