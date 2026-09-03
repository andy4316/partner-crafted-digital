import { cn } from "@/lib/utils";

/** Faint technical grid used behind heroes and airy sections. */
export function GridTexture({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0",
        dark ? "grid-texture-dark" : "grid-texture",
        className,
      )}
    />
  );
}

function Card({
  children,
  className,
  delay = 0,
  duration,
  float = "slow",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  float?: "slow" | "slower" | "gentle";
}) {
  const floatClass =
    float === "slower" ? "float-slower" : float === "gentle" ? "float-gentle" : "float-slow";
  return (
    <div
      aria-hidden
      style={duration ? { animationDelay: `${delay}ms`, animationDuration: `${duration}s` } : { animationDelay: `${delay}ms` }}
      className={cn(
        "pointer-events-none absolute hidden rounded-md border border-border bg-white/85 p-3 font-mono text-[11px] leading-relaxed text-ink-soft shadow-[0_18px_40px_-28px_rgba(13,17,23,0.45)] backdrop-blur-sm xl:block",
        floatClass,
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BrowserArtifact(props: { className?: string; delay?: number; duration?: number }) {
  return (
    <Card {...props}>
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
      </div>
      <div className="mt-2 flex items-center gap-1.5 rounded border border-border bg-alt px-2 py-1">
        <span className="text-[10px]">🔒</span>
        <span className="text-[10px] text-ink">abdigitalconsultancy.in</span>
      </div>
    </Card>
  );
}

export function CodeArtifact(props: { className?: string; delay?: number; duration?: number }) {
  return (
    <Card {...props}>
      <pre className="whitespace-pre">
        <span className="text-accent">export function</span> Hero() {"{"}
        {"\n"} <span className="text-accent">return</span> &lt;section /&gt;
        {"\n"}
        {"}"}
      </pre>
    </Card>
  );
}

export function TerminalArtifact(props: { className?: string; delay?: number; duration?: number }) {
  return (
    <Card {...props}>
      <span className="text-accent">$</span> git push origin main
      <span className="caret ml-1 inline-block h-3 w-[6px] translate-y-[2px] bg-ink" />
    </Card>
  );
}

export function CssArtifact(props: { className?: string; delay?: number; duration?: number }) {
  return (
    <Card {...props}>
      <pre className="whitespace-pre">
        .cta {"{"}
        {"\n"} background: <span className="text-accent">#0969DA</span>;{"\n"}
        {"}"}
      </pre>
    </Card>
  );
}

/** The four hero artifacts, positioned around the corners. */
export function HeroArtifacts() {
  return (
    <>
      <BrowserArtifact className="left-[4%] top-[18%]" delay={0} duration={7} />
      <CodeArtifact className="right-[5%] top-[14%]" delay={900} duration={9} />
      <TerminalArtifact className="left-[7%] bottom-[16%]" delay={1800} duration={8} />
      <CssArtifact className="right-[7%] bottom-[18%]" delay={2600} duration={7.5} />
    </>
  );
}
