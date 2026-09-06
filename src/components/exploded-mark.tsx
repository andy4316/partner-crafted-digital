import { cn } from "@/lib/utils";

/**
 * Exploded-view diagram of the AB Digital mark: the two pillars pulled apart,
 * annotated like a spec-sheet drawing, with the negative-space arrow between
 * them called out.
 */
export function ExplodedMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 460 300"
      role="img"
      aria-label="Exploded diagram of the AB Digital mark: the left pillar labelled You, the right pillar labelled Us, and the upward arrow in the space between them labelled Where the work happens"
      className={cn("w-full", className)}
    >
      <title>Exploded view of the AB Digital mark</title>

      {/* measurement rail across the top */}
      <g stroke="var(--border)" strokeWidth="1">
        <line x1="60" y1="42" x2="400" y2="42" strokeDasharray="5 5" />
        <line x1="60" y1="36" x2="60" y2="48" />
        <line x1="230" y1="36" x2="230" y2="48" />
        <line x1="400" y1="36" x2="400" y2="48" />
      </g>
      <text
        x="230"
        y="30"
        textAnchor="middle"
        className="fill-[var(--ink-soft)] font-mono text-[9px] uppercase"
        style={{ letterSpacing: "0.22em" }}
      >
        Fig. 01 — the mark, disassembled
      </text>

      {/* left pillar — "You" */}
      <g transform="translate(96,96) scale(1.05)" fill="var(--foreground)">
        <path d="M16 29.4 87.2 18.2 43.4 84.2H16V29.4Z" />
      </g>

      {/* right pillar — "Us" */}
      <g transform="translate(160,96) scale(1.05)" fill="var(--foreground)">
        <path d="M95.4 18.2 176 7.8v76.4h-37.6L95.4 18.2Z" />
      </g>

      {/* negative-space arrow, drawn as a dashed construction line */}
      <g stroke="var(--accent)" strokeWidth="1.25" fill="none" strokeDasharray="4 4">
        <path d="M230 214V132" />
        <path d="M212 152 230 130 248 152" />
      </g>

      {/* leader lines and labels */}
      <g stroke="var(--border)" strokeWidth="1">
        <line x1="118" y1="176" x2="52" y2="222" />
        <line x1="52" y1="222" x2="150" y2="222" />
        <line x1="352" y1="132" x2="404" y2="96" />
        <line x1="404" y1="96" x2="446" y2="96" />
        <line x1="230" y1="222" x2="230" y2="256" strokeDasharray="4 4" />
      </g>
      <g stroke="var(--accent)" strokeWidth="1">
        <circle cx="118" cy="176" r="2.5" fill="var(--accent)" />
        <circle cx="352" cy="132" r="2.5" fill="var(--accent)" />
        <circle cx="230" cy="170" r="2.5" fill="var(--accent)" />
      </g>

      <text
        x="52"
        y="238"
        className="fill-[var(--foreground)] font-mono text-[12px] uppercase"
        style={{ letterSpacing: "0.2em" }}
      >
        You
      </text>
      <text
        x="52"
        y="252"
        className="fill-[var(--ink-soft)] font-mono text-[9px]"
        style={{ letterSpacing: "0.12em" }}
      >
        01 — the business, already running
      </text>

      <text
        x="446"
        y="82"
        textAnchor="end"
        className="fill-[var(--foreground)] font-mono text-[12px] uppercase"
        style={{ letterSpacing: "0.2em" }}
      >
        Us
      </text>
      <text
        x="446"
        y="68"
        textAnchor="end"
        className="fill-[var(--ink-soft)] font-mono text-[9px]"
        style={{ letterSpacing: "0.12em" }}
      >
        02 — the part that stays
      </text>

      <text
        x="230"
        y="272"
        textAnchor="middle"
        className="fill-[var(--accent)] font-mono text-[11px] uppercase"
        style={{ letterSpacing: "0.18em" }}
      >
        Where the work happens
      </text>
      <text
        x="230"
        y="288"
        textAnchor="middle"
        className="fill-[var(--ink-soft)] font-mono text-[9px]"
        style={{ letterSpacing: "0.12em" }}
      >
        03 — negative space, load-bearing
      </text>
    </svg>
  );
}
