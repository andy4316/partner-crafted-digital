import { useEffect, useState, type ReactNode } from "react";

import { GridTexture, HeroArtifacts } from "@/components/artifacts";
import { Mark } from "@/components/mark";
import { cn } from "@/lib/utils";

/** Enormous mark behind the hero, drifting slower than the page. */
function Watermark({ tone = "ink" }: { tone?: "ink" | "white" }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setOffset(window.scrollY * 0.18));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{ transform: `translate3d(-50%, calc(-50% + ${offset}px), 0)` }}
      className="pointer-events-none absolute left-1/2 top-1/2 w-[1200px] max-w-[190vw]"
    >
      <Mark
        className={cn("w-full", tone === "ink" ? "text-ink opacity-[0.022] dark:opacity-[0.05]" : "text-white opacity-[0.05]")}
      />
    </div>
  );
}

export function StatusBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
      <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
      {children}
    </span>
  );
}

/**
 * The opening moment shared by every page: grid texture, parallax mark
 * watermark, floating artifacts and a staggered fade-up cascade.
 */
export function PageHero({
  badge,
  title,
  subtitle,
  actions,
  compact = false,
  artifactAccentLabel,
}: {
  badge: string;
  title: ReactNode;
  subtitle: ReactNode;
  actions?: ReactNode;
  compact?: boolean;
  artifactAccentLabel?: string;
}) {
  return (
    <section
      className={cn(
        "relative flex items-center overflow-hidden bg-background",
        compact ? "min-h-[56vh] pt-28 pb-16" : "min-h-[92vh] pt-24",
      )}
    >
      <GridTexture />
      <Watermark />
      <HeroArtifacts {...(artifactAccentLabel ? { accentLabel: artifactAccentLabel } : {})} />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-20 text-center">
        <div className="cascade" style={{ animationDelay: "80ms" }}>
          <StatusBadge>{badge}</StatusBadge>
        </div>

        <h1
          className={cn(
            "cascade mx-auto mt-8 max-w-4xl",
            compact
              ? "text-[2.4rem] sm:text-5xl md:text-6xl"
              : "text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.4rem]",
          )}
          style={{ animationDelay: "200ms" }}
        >
          {title}
        </h1>

        <p
          className="cascade mx-auto mt-8 max-w-2xl text-lg text-ink-soft"
          style={{ animationDelay: "320ms" }}
        >
          {subtitle}
        </p>

        {actions && (
          <div
            className="cascade mt-10 flex flex-wrap items-center justify-center gap-4"
            style={{ animationDelay: "440ms" }}
          >
            {actions}
          </div>
        )}

        <div
          className="cascade mt-16 flex justify-center"
          style={{ animationDelay: "600ms" }}
          aria-hidden
        >
          <div className="relative h-12 w-px bg-border">
            <span className="scroll-dot absolute -left-[2px] top-0 h-1.5 w-1.5 rounded-full bg-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Small mark used as a literal divider between two contrasting ideas. */
export function MarkDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-6", className)} aria-hidden>
      <span className="h-px flex-1 bg-border" />
      <Mark className="h-6 w-auto text-accent" />
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
