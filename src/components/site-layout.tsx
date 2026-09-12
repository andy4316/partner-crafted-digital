import { Link } from "@tanstack/react-router";
import { ArrowUp, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { GridTexture } from "@/components/artifacts";
import { ButtonLink } from "@/components/buttons";
import { Mark } from "@/components/mark";
import { Reveal } from "@/components/reveal";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
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
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 py-3.5 sm:px-6 sm:py-5 min-[980px]:grid-cols-[minmax(210px,1fr)_auto_minmax(210px,1fr)] min-[980px]:gap-6 lg:px-10">
        <Link to="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3.5" onClick={() => setOpen(false)}>
          <Mark className="h-7 w-auto shrink-0 text-ink sm:h-8" title="AB Digital Consultancy logo" />
          <span className="truncate font-serif text-lg font-semibold sm:text-xl">AB Digital</span>
        </Link>

        <nav
          aria-label="Main"
          className="hidden min-[980px]:flex"
        >
          <ul className="flex items-center gap-6 lg:gap-8 xl:gap-10">
            {NAV.slice(1).map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "text-[13px] font-medium text-ink-soft transition-colors hover:text-ink",
                    item.label === "ISO" &&
                      "rounded-full bg-iso px-3 py-1 font-medium text-white hover:text-white hover:opacity-90",
                  )}
                  activeProps={{
                    className:
                      item.label === "ISO" ? "text-white" : "text-ink font-medium",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center justify-self-end gap-4 min-[980px]:flex lg:gap-5">
          <span aria-hidden className="h-4 w-px bg-border" />
          <ThemeToggle />
          <Link
            to="/contact"
            className="border border-ink px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink transition-all hover:bg-primary hover:text-primary-foreground"
          >
            Start Project
          </Link>
        </div>

        <div className="flex items-center justify-self-end gap-2 min-[980px]:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 shrink-0 place-items-center"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {open && (
        <nav aria-label="Mobile" className="border-t border-border px-4 py-3 min-[980px]:hidden sm:px-6">
          <ul className="space-y-2">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block py-1.5 text-[15px] font-medium text-ink-soft transition-colors hover:text-ink",
                    item.label === "ISO" && "inline-block rounded-full bg-iso px-3 py-1 font-medium text-white",
                  )}
                  activeProps={{ className: "text-ink font-medium" }}
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
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.75fr_1.15fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Mark className="h-7 w-auto text-ink" title="AB Digital Consultancy logo" />
              <p className="font-serif text-xl font-bold">{SITE_NAME}</p>
            </div>
            <p className="mt-4 max-w-xs text-sm text-ink-soft">{TAGLINE}</p>

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
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">Sitemap</p>
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
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">Services</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-soft">
              <li>Web Design & Development</li>
              <li>Hosting & Domain Management</li>
              <li>CMS & Content Updates</li>
              <li>SEO & Local Visibility</li>
              <li>Ongoing Maintenance</li>
              <li>Digital Marketing Support</li>
              <li>Flyers & Print Materials</li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">Talk to us</p>
            <a
              href={WHATSAPP_URL}
              rel="noopener"
              className="mt-4 inline-block font-mono text-sm text-accent"
            >
              WhatsApp {PHONE_DISPLAY}
            </a>
            <p className="mt-4 text-sm text-ink-soft">Bengaluru, Karnataka — working India-wide.</p>
            <p className="mt-4 max-w-xs text-sm font-medium text-ink">
              Ask for a free sample before you decide anything.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-10">
          <p className="font-mono text-[11px] font-medium text-ink">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FloatingControls() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
      });
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-4 z-50 flex items-center gap-3 sm:bottom-6 sm:right-6">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="relative h-11 w-11 rounded-full border-0 bg-card text-ink shadow-lg hover:bg-card hover:text-accent"
      >
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 44 44" aria-hidden>
          <circle cx="22" cy="22" r="20" fill="none" stroke="var(--border)" strokeWidth="1.5" />
          <circle
            cx="22"
            cy="22"
            r="20"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset={100 - progress}
            strokeLinecap="round"
          />
        </svg>
        <ArrowUp className="relative h-4 w-4" aria-hidden />
      </Button>

      <a
        href={WHATSAPP_URL}
        rel="noopener"
        aria-label="Chat on WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-300 hover:scale-110"
      >
        <svg viewBox="0 0 32 32" fill="currentColor" className="h-6 w-6" aria-hidden>
          <path d="M16.04 3A12.8 12.8 0 0 0 5.02 22.29L3.2 28.94l6.8-1.78A12.8 12.8 0 1 0 16.04 3Zm0 23.44c-1.88 0-3.72-.5-5.33-1.45l-.38-.22-4.04 1.06 1.08-3.94-.25-.4a10.64 10.64 0 1 1 8.92 4.95Zm5.84-7.96c-.32-.16-1.9-.94-2.2-1.05-.29-.1-.5-.16-.71.16-.21.32-.82 1.05-1 1.26-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59a9.62 9.62 0 0 1-1.78-2.22c-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.22.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.36-.25-.62-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65 0 1.57 1.14 3.08 1.3 3.3.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.46.21 2 .13.61-.09 1.9-.77 2.16-1.51.27-.75.27-1.38.19-1.51-.08-.14-.29-.22-.61-.38Z" />
        </svg>
      </a>
    </div>
  );
}

export function SiteLayout({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className={cn("flex-1", className)}>{children}</main>
      <Footer />
      <FloatingControls />
    </div>
  );
}

export function Section({
  children,
  className,
  alt = false,
  texture = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  alt?: boolean;
  texture?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden border-t border-border",
        alt ? "bg-alt" : "bg-background",
        className,
      )}
    >
      {texture && <GridTexture />}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32">{children}</div>
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
  note,
  actionTo = "/contact",
  actionLabel = "Start a conversation",
}: {
  title: string;
  body?: string;
  note?: string;
  actionTo?: string;
  actionLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-cta text-cta-foreground">
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
          {note && (
            <p className="mt-6 max-w-xl border-l-2 border-accent pl-4 font-serif text-lg text-white">
              {note}
            </p>
          )}
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
