import { Link } from "@tanstack/react-router";
import { ArrowUp, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { GridTexture } from "@/components/artifacts";
import { ButtonLink } from "@/components/buttons";
import { Mark } from "@/components/mark";
import { Reveal } from "@/components/reveal";
import { PHONE_DISPLAY, SITE_NAME, TAGLINE, WHATSAPP_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/iso-consultancy", label: "ISO" },
  { to: "/contact", label: "Contact" },
] as const;

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-border bg-white/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 sm:py-5 lg:px-10">
        <Link to="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3.5" onClick={() => setOpen(false)}>
          <Mark className="h-6 w-auto shrink-0 text-ink sm:h-7" title="AB Digital Consultancy logo" />
          <span className="truncate font-serif text-base font-bold tracking-tight sm:text-lg">AB Digital</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-10 min-[860px]:flex">
          <ul className="flex items-center gap-8">
            {NAV.slice(1, -1).map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="group relative flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-ink"
                  activeProps={{ className: "text-ink" }}
                >
                  {({ isActive }) => (
                    <>
                      <span
                        aria-hidden
                        className={cn(
                          "h-1 w-1 bg-accent transition-opacity duration-300",
                          isActive ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {item.label}
                    </>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <span aria-hidden className="h-4 w-px bg-border" />

          <Link
            to="/contact"
            className="border border-ink px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink transition-all hover:bg-ink hover:text-white"
          >
            Start Project
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 shrink-0 place-items-center min-[860px]:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav aria-label="Mobile" className="border-t border-border px-4 py-3 min-[860px]:hidden sm:px-6">
          <ul className="space-y-2">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block py-1 font-mono text-sm uppercase tracking-[0.14em]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-3 block border border-ink px-4 py-2.5 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink"
          >
            Start Project
          </Link>
        </nav>
      )}

    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-alt">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Mark className="h-5 w-auto text-ink" />
              <p className="font-serif text-lg font-bold">{SITE_NAME}</p>
            </div>
            <p className="mt-4 max-w-xs text-sm text-ink-soft">
              A complete web partner for small and medium businesses across India.
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">Pages</p>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-ink-soft transition-colors hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              Talk to us
            </p>
            <a
              href={WHATSAPP_URL}
              rel="noopener"
              className="mt-4 inline-block font-mono text-sm text-accent"
            >
              WhatsApp {PHONE_DISPLAY}
            </a>
            <p className="mt-4 text-sm text-ink-soft">Bengaluru, Karnataka — working India-wide.</p>
          </div>
        </div>
        <p className="mt-14 font-mono text-[11px] text-ink-soft">
          © {new Date().getFullYear()} {SITE_NAME}. Built, hosted and looked after in India.
        </p>
      </div>
    </footer>
  );
}

export function SiteLayout({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className={cn("flex-1", className)}>{children}</main>
      <Footer />
    </div>
  );
}

export function Section({
  children,
  className,
  alt = false,
  texture = false,
}: {
  children: ReactNode;
  className?: string;
  alt?: boolean;
  texture?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-t border-border",
        alt ? "bg-alt" : "bg-background",
        className,
      )}
    >
      {texture && <GridTexture />}
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{children}</p>
  );
}

/** Full-bleed dark closing section with the mark cropped at the bottom edge. */
export function DarkCta({
  title,
  body,
  actionTo = "/contact",
  actionLabel = "Start a conversation",
}: {
  title: string;
  body?: string;
  actionTo?: string;
  actionLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <GridTexture dark />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 w-[900px] max-w-[170vw] -translate-x-1/2"
      >
        <Mark className="w-full text-white opacity-[0.05]" />
      </div>
      <div className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
        <Reveal>
          <h2 className="max-w-3xl text-3xl md:text-5xl">{title}</h2>
          {body && <p className="mt-6 max-w-xl text-white/70">{body}</p>}
          <div className="mt-10">
            <ButtonLink
              to={actionTo}
              variant="ghost"
              className="border-white/30 bg-transparent text-white hover:border-white hover:text-white"
            >
              {actionLabel}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
