import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  FileText,
  Monitor,
  PenTool,
  Printer,
  Search,
  Server,
  TrendingUp,
  Wrench,
} from "lucide-react";

import { BrowserArtifact, CssArtifact, TerminalArtifact } from "@/components/artifacts";
import { ButtonLink } from "@/components/buttons";
import { MarkDivider, PageHero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { DarkCta, Eyebrow, Section, SiteLayout } from "@/components/site-layout";
import { servicesQuery, type Service } from "@/lib/content";

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
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(servicesQuery);
  },
  component: Home,
});

function serviceIcon(title: Service["title"]) {
  const cls = "h-5 w-5 text-accent";
  if (title.toLowerCase().includes("hosting")) return <Server className={cls} />;
  if (title.toLowerCase().includes("cms")) return <PenTool className={cls} />;
  if (title.toLowerCase().includes("seo")) return <Search className={cls} />;
  if (title.toLowerCase().includes("maintenance")) return <Wrench className={cls} />;
  if (title.toLowerCase().includes("marketing")) return <TrendingUp className={cls} />;
  if (title.toLowerCase().includes("flyers") || title.toLowerCase().includes("print"))
    return <Printer className={cls} />;
  if (title.toLowerCase().includes("content")) return <FileText className={cls} />;
  return <Monitor className={cls} />;
}

function Home() {
  const { data: services } = useSuspenseQuery(servicesQuery);

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

      <Section alt texture>
        <BrowserArtifact
          className="right-[2%] top-[5%] opacity-90 max-md:right-3 max-md:top-3 max-md:opacity-80"
          delay={0}
          float="gentle"
        />
        <TerminalArtifact
          className="bottom-[3%] left-[2%] opacity-90 max-md:bottom-3 max-md:left-3 max-md:opacity-80"
          delay={1800}
          float="gentle"
        />

        <div className="relative z-10 grid gap-12 lg:grid-cols-[minmax(140px,180px)_1fr]">
          <Reveal>
            <Eyebrow>What we do</Eyebrow>
          </Reveal>

          <div>
            <Reveal delay={100}>
              <h2 className="max-w-5xl text-4xl leading-[1.02] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.8rem]">
                One partner. <span className="text-accent">Everything online.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
                Design and development. Hosting and domains. Content updates when your prices
                change. Search visibility so people find you. Flyers and cards when you need
                something printed. One number to call for all of it.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-10">
                <ButtonLink to="/services" variant="ghost">
                  See the full list
                </ButtonLink>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-4 md:grid-cols-2">
              {services.map((service, i) => (
                <Reveal key={service.id} delay={400 + i * 80}>
                  <article className="group h-full rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg md:p-7">
                    <div className="grid h-11 w-11 place-items-center rounded-md border border-accent/20 bg-accent/10 transition-colors group-hover:bg-accent/15">
                      {serviceIcon(service.title)}
                    </div>
                    <h3 className="mt-6 font-serif text-xl font-bold md:text-2xl">{service.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft md:text-base">
                      {service.summary}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section alt>
        <div className="relative z-10">
          <Reveal>
            <Eyebrow>Why we're different</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-3xl md:text-5xl">
              No lock-in. One partner, not five vendors.
            </h2>
          </Reveal>
          <div className="mt-16 grid items-center gap-10 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <Reveal delay={100}>
              <h3 className="text-2xl">You own everything</h3>
              <p className="mt-4 text-ink-soft">
                Your domain is in your name. Your files are yours. If you ever want to leave, we hand
                it all over and help the next person settle in. Staying should be a choice, not a
                trap.
              </p>
            </Reveal>

            <MarkDivider className="hidden md:flex md:h-40 md:flex-col" />

            <Reveal delay={200}>
              <h3 className="text-2xl">One person answers</h3>
              <p className="mt-4 text-ink-soft">
                No designer blaming the developer, no host blaming the SEO agency. You message us and
                the thing gets fixed. That's the whole arrangement.
              </p>
            </Reveal>

            <MarkDivider className="hidden md:flex md:h-40 md:flex-col" />

            <Reveal delay={300}>
              <h3 className="text-2xl">Built from scratch, not a template</h3>
              <p className="mt-4 text-ink-soft">
                Every site is built from zero around what your business actually stands for — never a
                theme with your logo dropped in.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section texture>
        <CssArtifact
          className="right-[5%] bottom-[6%] opacity-60 max-md:hidden"
          delay={1200}
          float="gentle"
        />
        <div className="relative z-10 grid items-start gap-12 lg:grid-cols-2">
          <div>
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
          </div>

          <Reveal delay={200}>
            <div className="border border-border bg-card p-8 md:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                At a glance
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6">
                <div>
                  <p className="font-serif text-4xl font-bold text-accent">7</p>
                  <p className="mt-1 text-sm text-ink-soft">Core services</p>
                </div>
                <div>
                  <p className="font-serif text-4xl font-bold text-accent">3</p>
                  <p className="mt-1 text-sm text-ink-soft">Pricing tiers</p>
                </div>
                <div>
                  <p className="font-serif text-4xl font-bold text-accent">1</p>
                  <p className="mt-1 text-sm text-ink-soft">Partner</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <DarkCta
        title="Tell us about your business. We'll tell you honestly what it needs."
        body="No sales call, no jargon. A short message is enough to start."
        note="Tell us about your business and we'll put together a real sample of what your site could look like — before you decide anything."
        actionLabel="Get in touch"
      />
    </SiteLayout>
  );
}
