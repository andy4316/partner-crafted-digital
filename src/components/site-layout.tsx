import { Link } from "@tanstack/react-router";
import { ArrowUp, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { GridTexture } from "@/components/artifacts";
import { ButtonLink } from "@/components/buttons";
import { Mark } from "@/components/mark";
import { Reveal } from "@/components/reveal";
import { ThemeToggle } from "@/components/theme-toggle";
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
      <div className="mx-auto flex max-w-6xl items-center px-4 py-3.5 sm:px-6 sm:py-5 lg:px-10">
        <Link to="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3.5" onClick={() => setOpen(false)}>
          <Mark className="h-7 w-auto shrink-0 text-ink sm:h-8" title="AB Digital Consultancy logo" />
          <span className="truncate font-serif text-lg font-bold tracking-tight sm:text-xl">AB Digital</span>
        </Link>

        <nav
          aria-label="Main"
          className="hidden min-[860px]:absolute min-[860px]:left-1/2 min-[860px]:top-1/2 min-[860px]:-translate-x-1/2 min-[860px]:-translate-y-1/2 min-[860px]:flex"
        >
          <ul className="flex items-center gap-8">
            {NAV.slice(1).map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="group relative flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-ink"
                  activeProps={{ className: "text-ink" }}
                >
                  {({ isActive }) =>
                    item.label === "ISO" ? (
                      <span
                        className={cn(
                          "rounded-full bg-iso px-3 py-1 text-white transition-opacity hover:opacity-90",
                          isActive && "ring-1 ring-iso ring-offset-1",
                        )}
                      >
                        {item.label}
                      </span>
                    ) : (
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
                    )
                  }
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-5 min-[860px]:flex">
          <span aria-hidden className="h-4 w-px bg-border" />
          <ThemeToggle />
          <Link
            to="/contact"
            className="border border-ink px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink transition-all hover:bg-primary hover:text-primary-foreground"
          >
            Start Project
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2 min-[860px]:hidden">
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
        <nav aria-label="Mobile" className="border-t border-border px-4 py-3 min-[860px]:hidden sm:px-6">
          <ul className="space-y-2">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block py-1 font-mono text-sm font-semibold uppercase tracking-[0.14em]",
                    item.label === "ISO" && "inline-block rounded-full bg-iso px-3 py-1 text-white",
                  )}
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
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-border bg-alt">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <Mark className="h-7 w-auto text-ink" title="AB Digital Consultancy logo" />
              <p className="font-serif text-xl font-bold">{SITE_NAME}</p>
            </div>
            <p className="mt-4 max-w-xs text-sm text-ink-soft">{TAGLINE}</p>
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
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 py-4 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] text-ink-soft">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={scrollTop}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-accent"
          >
            Back to top
            <ArrowUp className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      rel="noopener"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_24px_-8px_rgba(13,17,23,0.5)] transition-transform duration-300 hover:scale-110"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-9.091a5.865 5.865 0 0 1 5.86 5.868 5.838 5.838 0 0 1-1.178 3.522l.846 2.451-2.518-.661a5.86 5.86 0 1 1-3.01-11.18zm0-1.14A7.005 7.005 0 0 0 5.46 18.23l-3.235.847 1.087-3.151A7.005 7.005 0 1 0 12.05 4.151z" />
      </svg>
    </a>
  );
}

export function SiteLayout({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className={cn("flex-1", className)}>{children}</main>
      <Footer />
      <WhatsAppButton />
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
  actionTo = "/contact",
  actionLabel = "Start a conversation",
}: {
  title: string;
  body?: string;
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
