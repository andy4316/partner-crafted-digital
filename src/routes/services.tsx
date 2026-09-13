import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { FileText, Layout, Megaphone, Printer, Search, Server, Tag, Wrench } from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";

import { BrowserArtifact, CssArtifact } from "@/components/artifacts";
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
import { Button } from "@/components/ui/button";
import { faqsQuery, pricingQuery, servicesQuery } from "@/lib/content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Affordable Business Website Packages & Pricing India | AB Digital" },
      {
        name: "description",
        content:
          "Web design, hosting, SEO, maintenance and print for Indian businesses. Three clear packages from ₹12,000, with yearly care included and no hidden extras.",
      },
      { property: "og:title", content: "Services & Pricing — AB Digital Consultancy" },
      {
        property: "og:description",
        content: "Everything we do, and exactly what it costs. Three plans, no hidden extras.",
      },
      { property: "og:url", content: "https://partner-crafted-digital.lovable.app/services" },
      { name: "twitter:title", content: "Services & Pricing — AB Digital Consultancy" },
      {
        name: "twitter:description",
        content: "Website packages from ₹12,000, with hosting, SEO and care included.",
      },
    ],
    links: [{ rel: "canonical", href: "https://partner-crafted-digital.lovable.app/services" }],
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(servicesQuery);
  },
  component: Services,
});

type Detail = {
  icon: typeof Layout;
  tag: string;
  how: string[];
  fit: string;
};

const DETAIL: { match: string; detail: Detail }[] = [
  {
    match: "web design",
    detail: {
      icon: Layout,
      tag: "Build",
      how: [
        "We sit with you for an hour and write down what the site has to do.",
        "You see a first draft of the real pages, not a stock template.",
        "Two rounds of changes, then we build and test it on real phones.",
      ],
      fit: "Best if you have no site yet, or one you are quietly embarrassed by.",
    },
  },
  {
    match: "hosting",
    detail: {
      icon: Server,
      tag: "Run",
      how: [
        "We buy or move the domain and keep it renewed in your name.",
        "The site sits on fast hosting with a security certificate included.",
        "Backups run automatically, and we watch for downtime so you don't have to.",
      ],
      fit: "Best if nobody in your team wants to think about renewals again.",
    },
  },
  {
    match: "cms",
    detail: {
      icon: FileText,
      tag: "Edit",
      how: [
        "The pages you change often get simple editing controls.",
        "We show you how in one short call and leave you a written note.",
        "Prefer to send us the text instead? Write on WhatsApp and we do it.",
      ],
      fit: "Best if prices, menus, offers or team members change through the year.",
    },
  },
  {
    match: "seo",
    detail: {
      icon: Search,
      tag: "Be found",
      how: [
        "Every page gets a clear title and description written for real searches.",
        "Your Google Business profile, map listing and reviews get set up properly.",
        "We check each month what people searched before they called you.",
      ],
      fit: "Best if customers in your city should find you before they find a competitor.",
    },
  },
  {
    match: "maintenance",
    detail: {
      icon: Wrench,
      tag: "Care",
      how: [
        "Updates and security patches are applied quietly in the background.",
        "Broken links, slow pages and form failures get fixed as we spot them.",
        "You write, a person answers — no ticket number, no queue.",
      ],
      fit: "Best if a website going down for a day would cost you real business.",
    },
  },
  {
    match: "marketing",
    detail: {
      icon: Megaphone,
      tag: "Reach",
      how: [
        "We plan a simple month of posts around what you actually sell.",
        "Ad budgets stay small and measured — we tell you what worked.",
        "Everything points back to the site, so enquiries land in one place.",
      ],
      fit: "Best if the site is live and you now want more people seeing it.",
    },
  },
  {
    match: "print",
    detail: {
      icon: Printer,
      tag: "Print",
      how: [
        "Flyers, cards, menus and banners drawn in the same brand as the site.",
        "Print-ready files sent to your printer, in the sizes they ask for.",
        "One look online and offline, so people recognise you both places.",
      ],
      fit: "Best if you hand out anything on paper — most local businesses do.",
    },
  },
];

const FALLBACK: Detail = {
  icon: Layout,
  tag: "Work",
  how: ["We scope it with you, agree a price, and build it."],
  fit: "Tell us the business and we'll say plainly if it fits.",
};

function detailFor(title: string): Detail {
  const t = title.toLowerCase();
  return DETAIL.find((d) => t.includes(d.match))?.detail ?? FALLBACK;
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function ServiceIndex() {
  const { data } = useSuspenseQuery(servicesQuery);
  return (
    <ul className="mt-12 grid gap-x-10 gap-y-3 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((s, i) => (
        <li key={s.id}>
          <a
            href={`#${slugify(s.title)}`}
            className="group flex items-baseline gap-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-accent"
          >
            <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
            <span className="border-b border-transparent group-hover:border-accent">{s.title}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function ServiceSections() {
  const { data } = useSuspenseQuery(servicesQuery);
  return (
    <div>
      {data.map((s, i) => {
        const d = detailFor(s.title);
        const Icon = d.icon;
        const alt = i % 2 === 1;
        return (
          <section
            key={s.id}
            id={slugify(s.title)}
            className={cn(
              "relative scroll-mt-24 border-t border-border",
              alt ? "bg-alt" : "bg-background",
            )}
          >
            <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
              <Reveal className="grid gap-10 md:grid-cols-[1fr_1.35fr] md:gap-16">
                <div className="md:sticky md:top-28 md:self-start">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden className="h-px w-8 bg-border" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                      {d.tag}
                    </span>
                  </div>
                  <Icon className="mt-8 h-8 w-8 stroke-[1.1] text-accent" aria-hidden />
                  <h2 className="mt-6 text-3xl md:text-4xl">{s.title}</h2>
                  <p className="mt-5 max-w-md text-ink-soft">{s.summary}</p>
                  <p className="mt-6 max-w-md border-l-2 border-accent pl-4 font-mono text-xs leading-relaxed text-ink-soft">
                    {d.fit}
                  </p>
                  <div className="mt-8">
                    <ButtonLink to="/contact" variant="ghost">
                      Ask about this
                    </ButtonLink>
                  </div>
                </div>

                <div className="grid gap-10">
                  <div>
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                      What's included
                    </h3>
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {s.points.map((p) => (
                        <li
                          key={p}
                          className="flex gap-3 rounded-[6px] border border-border bg-card p-4 text-sm text-ink-soft"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                      How it goes
                    </h3>
                    <ol className="mt-5 border-t border-border">
                      {d.how.map((step, n) => (
                        <li
                          key={step}
                          className="flex gap-5 border-b border-border py-4 text-sm text-ink-soft"
                        >
                          <span className="font-mono text-xs text-accent">
                            {String(n + 1).padStart(2, "0")}
                          </span>
                          <span className="max-w-xl">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}
    </div>
  );
}


function Pricing() {
  const { data } = useSuspenseQuery(pricingQuery);
  return (
    <div className="mt-14 grid gap-6 md:grid-cols-3">
      {data.map((tier, i) => (
        <Reveal
          key={tier.id}
          delay={i * 90}
          className={cn(
            "group flex flex-col rounded-[6px] border bg-card p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:border-accent hover:shadow-[0_24px_50px_-24px_color-mix(in_oklab,var(--accent)_45%,transparent)]",
            tier.recommended ? "border-accent" : "border-border",
          )}
        >
          {tier.recommended && (
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Most chosen
            </p>
          )}
          <h3 className="text-2xl">{tier.name}</h3>
          <p className="mt-3 text-sm text-ink-soft">{tier.blurb}</p>
          <p className="mt-8 font-serif text-3xl font-bold">{tier.setup_price}</p>
          <p className="mt-1 font-mono text-xs text-ink-soft">then {tier.yearly_price}</p>
          <ul className="mt-8 space-y-2 border-t border-border pt-8">
            {tier.features.map((f) => (
              <li key={f} className="flex gap-3 text-sm text-ink-soft">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ButtonLink to="/contact" variant="ghost">
              Talk about {tier.name}
            </ButtonLink>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function Faqs() {
  const { data } = useSuspenseQuery(faqsQuery);
  return (
    <Accordion type="single" collapsible className="mt-12 border-t border-border">
      {data.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id} className="border-b border-border">
          <AccordionTrigger className="py-6 text-left font-serif text-lg font-bold hover:no-underline md:text-xl">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="max-w-3xl pb-8 text-base text-ink-soft">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function Loading() {
  return <p className="mt-14 text-sm text-ink-soft">Loading…</p>;
}

function PricingQuickJump({ onJump }: { onJump: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("services-hero");
    if (!hero) return;

    let frame = 0;
    const updateVisibility = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setVisible(hero.getBoundingClientRect().bottom <= 80));
    };
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onJump}
      aria-label="Jump to pricing"
      className={cn(
        "fixed right-4 bottom-20 z-[60] h-auto rounded-full border border-border bg-card px-3.5 py-2 font-mono text-[11px] font-medium text-ink shadow-lg transition-all duration-300 hover:border-accent hover:bg-card hover:text-accent sm:right-6 sm:bottom-24",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <Tag className="h-3.5 w-3.5" aria-hidden />
      Pricing
    </Button>
  );
}

function Services() {
  const [pricingHighlighted, setPricingHighlighted] = useState(false);
  const highlightTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (highlightTimer.current) clearTimeout(highlightTimer.current);
    },
    [],
  );

  const jumpToPricing = () => {
    const pricing = document.getElementById("pricing");
    if (!pricing) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    pricing.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    setPricingHighlighted(false);
    if (highlightTimer.current) clearTimeout(highlightTimer.current);
    const showHighlight = () => {
      setPricingHighlighted(true);
      highlightTimer.current = setTimeout(() => setPricingHighlighted(false), 1100);
    };
    if (reduceMotion) {
      showHighlight();
    } else {
      highlightTimer.current = setTimeout(showHighlight, 700);
    }
  };

  return (
    <SiteLayout>
      <div id="services-hero">
        <PageHero
          compact
          badge="Design · Hosting · SEO · Marketing"
          title={
            <>
              Everything a business needs online, <span className="text-accent">handled</span>.
            </>
          }
          subtitle="One partner for the website, the hosting, the search visibility and the printed things — with clear pricing and nothing hidden."
          actions={
            <>
              <ButtonLink to="/contact">Get a quote</ButtonLink>
              <ButtonLink to="/work" variant="ghost">
                See the work
              </ButtonLink>
              <span className="basis-full" aria-hidden />
              <a
                href="#pricing"
                onClick={(event) => {
                  event.preventDefault();
                  jumpToPricing();
                }}
                className="-mt-1 text-sm text-ink-soft underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                ↓ Just here for pricing?
              </a>
            </>
          }
        />
      </div>

      <Section texture>
        <CssArtifact
          className="right-[3%] top-[8%] opacity-90 max-md:hidden"
          delay={600}
          float="slower"
        />
        <Reveal>
          <Eyebrow>Services</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-3xl md:text-5xl">
            The full list, in plain language.
          </h2>
          <p className="mt-6 max-w-2xl text-ink-soft">
            Seven things we do. Jump to whichever one you came here for — each has what's included
            and how the work actually goes.
          </p>
        </Reveal>
        <Suspense fallback={<Loading />}>
          <ServiceIndex />
        </Suspense>
      </Section>

      <Suspense fallback={null}>
        <ServiceSections />
      </Suspense>


      <Section id="pricing" alt className="scroll-mt-24">
        <Reveal>
          <Eyebrow>Pricing</Eyebrow>
          <h2
            className={cn(
              "mt-6 max-w-3xl rounded-[6px] text-3xl md:text-5xl",
              pricingHighlighted && "pricing-arrival-pulse",
            )}
          >
            One price to build it. One price to keep it alive.
          </h2>
          <p className="mt-6 max-w-2xl text-ink-soft">
            The yearly fee covers hosting, domain, updates and someone answering when you write. No
            surprise invoices.
          </p>
        </Reveal>
        <Suspense fallback={<Loading />}>
          <Pricing />
        </Suspense>
      </Section>

      <Section texture>
        <BrowserArtifact
          className="left-[2%] top-[10%] opacity-90 max-md:hidden"
          delay={300}
          float="slower"
        />
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-6 max-w-2xl text-3xl md:text-5xl">The things people ask first.</h2>
        </Reveal>
        <Suspense fallback={<Loading />}>
          <Faqs />
        </Suspense>
      </Section>

      <DarkCta title="Not sure which plan fits? Tell us the business and we'll say plainly." />
      <PricingQuickJump onJump={jumpToPricing} />
    </SiteLayout>
  );
}
