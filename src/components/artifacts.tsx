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
  kind,
  delay = 0,
  duration,
  float = "slow",
}: {
  children: React.ReactNode;
  className?: string;
  kind: "browser" | "code" | "terminal" | "css";
  delay?: number;
  duration?: number;
  float?: "slow" | "slower" | "gentle";
}) {
  const floatClass =
    float === "slower" ? "float-slower" : float === "gentle" ? "float-gentle" : "float-slow";
  return (
    <div
      aria-hidden
      data-floating-artifact={kind}
      style={duration ? { animationDelay: `${delay}ms`, animationDuration: `${duration}s` } : { animationDelay: `${delay}ms` }}
      className={cn(
        "pointer-events-none absolute z-0 hidden rounded-md border border-ink/20 bg-card/95 p-3 font-mono text-[11px] font-medium leading-relaxed text-ink shadow-lg backdrop-blur-md min-[1101px]:block",
        floatClass,
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BrowserArtifact(props: { className?: string; delay?: number; duration?: number; float?: "slow" | "slower" | "gentle" }) {
  return (
    <Card {...props} kind="browser">
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

export function CodeArtifact(props: { className?: string; delay?: number; duration?: number; float?: "slow" | "slower" | "gentle" }) {
  return (
    <Card {...props} kind="code">
      <pre className="whitespace-pre">
        <span className="text-accent">export function</span> Hero() {"{"}
        {"\n"} <span className="text-accent">return</span> &lt;section /&gt;
        {"\n"}
        {"}"}
      </pre>
    </Card>
  );
}

export function TerminalArtifact(props: { className?: string; delay?: number; duration?: number; float?: "slow" | "slower" | "gentle" }) {
  return (
    <Card {...props} kind="terminal">
      <span className="text-accent">$</span> git push origin main
      <span className="caret ml-1 inline-block h-3 w-[6px] translate-y-[2px] bg-ink" />
    </Card>
  );
}

export function CssArtifact(props: { className?: string; delay?: number; duration?: number; float?: "slow" | "slower" | "gentle" }) {
  return (
    <Card {...props} kind="css">
      <pre className="whitespace-pre">
        .cta {"{"}
        {"\n"} background: <span className="text-accent">#0969DA</span>;{"\n"}
        {"}"}
      </pre>
    </Card>
  );
}

/** Three hero artifacts, positioned around the corners. Only two appear on very narrow screens. */
export function HeroArtifacts() {
  return (
    <>
      <BrowserArtifact
        className="left-[2%] top-[15%] opacity-90 xl:left-[3%]"
        delay={0}
        duration={16}
      />
      <CodeArtifact
        className="right-[2%] top-[13%] opacity-90 xl:right-[3%]"
        delay={1200}
        duration={18}
      />
      <CssArtifact
        className="right-[3%] bottom-[10%] opacity-90 xl:right-[5%] xl:bottom-[16%]"
        delay={2400}
        duration={15}
      />
    </>
  );
}
