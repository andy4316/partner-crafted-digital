import { createFileRoute, Link } from "@tanstack/react-router";

import { Reveal } from "@/components/reveal";
import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/iso-consultancy")({
  head: () => ({
    meta: [
      { title: "ISO Consultancy — AB Digital Consultancy" },
      {
        name: "description",
        content:
          "A separate practice area: ISO certification guidance, documentation and audit preparation for Indian businesses.",
      },
      { property: "og:title", content: "ISO Consultancy — AB Digital Consultancy" },
      {
        property: "og:description",
        content: "ISO certification guidance, documentation and audit readiness.",
      },
      { property: "og:url", content: "/iso-consultancy" },
    ],
    links: [{ rel: "canonical", href: "/iso-consultancy" }],
  }),
  component: Iso,
});

function Iso() {
  return (
    <SiteLayout className="bg-teal text-primary-foreground">
      <section className="border-b border-primary-foreground/15">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] opacity-70">
              Practice area / 02
            </p>
            <h1 className="mt-8 max-w-3xl font-serif text-4xl md:text-6xl">ISO Consultancy</h1>
            <p className="mt-8 max-w-2xl opacity-80">
              A separate, more formal side of the practice. Certification is paperwork, process and
              evidence — not design. It deserves its own treatment, and its own conversation.
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="grid gap-14 md:grid-cols-3">
            {[
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
            ].map((item, i) => (
              <Reveal key={item.n} delay={i * 100}>
                <p className="font-mono text-xs tracking-[0.3em] opacity-60">{item.n}</p>
                <h2 className="mt-4 font-serif text-2xl">{item.t}</h2>
                <p className="mt-3 text-sm opacity-80">{item.d}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150}>
            <div className="mt-24 border-t border-primary-foreground/20 pt-12">
              <p className="max-w-2xl opacity-80">
                This section is still being built out. If certification is on your list this year,
                talk to us now and we'll tell you plainly whether we're the right fit.
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-block border-b-2 border-primary-foreground/60 pb-1 text-sm uppercase tracking-[0.18em]"
              >
                Learn more
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
