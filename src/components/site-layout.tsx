import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

import logoMark from "@/assets/logo-mark.png";
import { PHONE_DISPLAY, SITE_NAME, WHATSAPP_URL } from "@/lib/site";
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

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logoMark} alt="" width={28} height={28} className="h-7 w-7" />
          <span className="font-serif text-base tracking-tight">AB Digital</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV.slice(1).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-sm text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav aria-label="Mobile" className="border-t border-border/60 px-6 py-4 md:hidden">
          <ul className="space-y-3">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block text-base text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="section-dark">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-serif text-xl">{SITE_NAME}</p>
            <p className="mt-3 max-w-xs text-sm opacity-70">
              A complete web partner for small and medium businesses across India.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] opacity-60">Pages</p>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="opacity-80 transition-opacity hover:opacity-100">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] opacity-60">Talk to us</p>
            <a
              href={WHATSAPP_URL}
              className="mt-4 inline-block border-b border-gold pb-0.5 text-sm"
              rel="noopener"
            >
              WhatsApp {PHONE_DISPLAY}
            </a>
          </div>
        </div>
        <p className="mt-14 text-xs opacity-50">
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
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section className={cn(dark && "section-dark", className)}>
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div>
      <span className="rule-gold" aria-hidden="true" />
      <p className="mt-4 text-xs uppercase tracking-[0.22em] opacity-60">{children}</p>
    </div>
  );
}
