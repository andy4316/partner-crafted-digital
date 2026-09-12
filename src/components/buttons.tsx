import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const base =
  "group inline-flex items-center gap-2 rounded-[6px] px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.14em] transition-all duration-300 hover:scale-[1.03]";

const styles = {
  primary: "btn-sweep bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground",
  ghost: "border border-border bg-card text-ink hover:border-accent hover:text-accent",
} as const;

type Variant = keyof typeof styles;

function Inner({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="relative z-[2] inline-flex items-center gap-2">{children}</span>
      <ArrowRight
        className="relative z-[2] h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden
      />
    </>
  );
}

export function ButtonLink({
  to,
  children,
  variant = "primary",
  className,
}: {
  to: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link to={to} className={cn(base, styles[variant], className)}>
      <Inner>{children}</Inner>
    </Link>
  );
}

export function ButtonAnchor({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <a href={href} rel="noopener" className={cn(base, styles[variant], className)}>
      <Inner>{children}</Inner>
    </a>
  );
}
