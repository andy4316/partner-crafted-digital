import { createFileRoute } from "@tanstack/react-router";

import { GridTexture } from "@/components/artifacts";
import { Mark } from "@/components/mark";
import { SITE_NAME, TAGLINE } from "@/lib/site";

export const Route = createFileRoute("/footer-samples")({
  component: FooterSamples,
  head: () => ({
    meta: [
      { title: "Footer accent samples — AB Digital Consultancy" },
      { name: "description", content: "Internal preview of four footer accent directions for AB Digital Consultancy." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function Brand() {
  return (
    <>
      <div className="flex items-center gap-3">
        <Mark className="h-7 w-auto text-ink" title="AB Digital Consultancy logo" />
        <p className="font-serif text-xl font-bold">{SITE_NAME}</p>
      </div>
      <p className="mt-4 max-w-xs text-sm text-ink-soft">{TAGLINE}</p>
    </>
  );
}

/* 1 — Mini command terminal */
function Terminal() {
  return (
    <div className="mt-6 w-full max-w-xs overflow-hidden rounded-lg border border-ink/80 bg-ink">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-accent" />
        <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">ab-digital — status</span>
      </div>
      <div className="space-y-1.5 p-3 font-mono text-[11px] leading-relaxed text-white/80">
        <p><span className="text-accent">$</span> build --status</p>
        <p className="text-white">static + edge · 100/100</p>
        <p><span className="text-accent">$</span> region</p>
        <p className="text-white">bengaluru, in</p>
        <p><span className="text-accent">$</span> ssl</p>
        <p className="text-white">
          active<span className="ml-1 inline-block h-3 w-1.5 translate-y-0.5 animate-pulse bg-accent" />
        </p>
      </div>
    </div>
  );
}

/* 2 — Exploded mark graphic */
function ExplodedMark() {
  return (
    <div className="relative mt-6 h-44 w-full max-w-xs overflow-hidden rounded-lg border border-border bg-card">
      <GridTexture className="opacity-70" />
      <Mark className="absolute -left-6 top-1/2 h-auto w-32 -translate-y-1/2 -rotate-6 text-ink/[0.07]" title="" />
      <Mark className="absolute left-1/3 top-1/2 h-auto w-32 -translate-y-1/2 text-accent/20" title="" />
      <Mark className="absolute -right-6 top-1/2 h-auto w-32 -translate-y-1/2 rotate-6 text-ink/[0.07]" title="" />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-border bg-background/80 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft backdrop-blur-sm">
        <span>Two pillars</span>
        <span className="text-accent">design · delivery</span>
      </div>
    </div>
  );
}

/* 3 — Brand signature block */
function Signature() {
  return (
    <div className="mt-6 w-full max-w-xs rounded-lg border border-border bg-card p-4">
      <p className="font-mono text-3xl font-semibold leading-none tracking-tight text-ink">AB—001</p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">Studio build v1.4</p>
      <div className="mt-4 h-px w-full bg-border" />
      <div className="mt-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Accepting work
        </span>
        <Mark className="h-5 w-auto text-ink/30" title="" />
      </div>
    </div>
  );
}

/* 4 — Tech constellation (current live version) */
function Constellation() {
  return (
    <div className="relative mt-6 h-44 w-full max-w-xs overflow-hidden rounded-lg border border-border bg-card">
      <GridTexture className="opacity-60" />
      <Mark className="absolute left-1/2 top-1/2 h-auto w-36 -translate-x-1/2 -translate-y-1/2 text-ink/[0.05]" title="" />
      <div className="relative z-10 flex h-full flex-col justify-between p-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">Project AB-001</span>
        </div>
        <div className="space-y-2">
          <div className="float-gentle w-fit -rotate-2 rounded border border-border bg-background/95 px-2.5 py-1.5 font-mono text-[10px] text-ink shadow-sm">
            <span className="text-accent">.brand</span> {"{ color: #E2A33B; }"}
          </div>
          <div className="float-gentle ml-4 w-fit rotate-1 rounded border border-border bg-background/95 px-2.5 py-1.5 font-mono text-[10px] text-ink shadow-sm" style={{ animationDelay: "1200ms" }}>
            &lt;MadeInBengaluru /&gt;
          </div>
        </div>
      </div>
    </div>
  );
}

const SAMPLES = [
  { id: 1, name: "Mini command terminal", node: <Terminal /> },
  { id: 2, name: "Exploded mark graphic", node: <ExplodedMark /> },
  { id: 3, name: "Brand signature block", node: <Signature /> },
  { id: 4, name: "Tech constellation", node: <Constellation /> },
];

function FooterSamples() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <h1 className="font-serif text-3xl font-bold">Footer accent samples</h1>
      <p className="mt-3 text-sm text-ink-soft">Four directions for the space below the footer logo.</p>

      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        {SAMPLES.map((s) => (
          <section key={s.id} className="border-t border-border bg-alt p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">Option {s.id}</p>
            <h2 className="mt-1 font-serif text-lg font-semibold">{s.name}</h2>
            <div className="mt-6">
              <Brand />
              {s.node}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
