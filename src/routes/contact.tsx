import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { ButtonAnchor } from "@/components/buttons";
import { PageHero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { Eyebrow, Section, SiteLayout } from "@/components/site-layout";
import { supabase } from "@/integrations/supabase/client";
import { PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact a Web Designer in Bengaluru | AB Digital Consultancy" },
      {
        name: "description",
        content:
          "Tell us about your business and the website you need. WhatsApp +91 90521 42231 or send a short note — you'll hear back from the person doing the work.",
      },
      { property: "og:title", content: "Contact — AB Digital Consultancy" },
      {
        property: "og:description",
        content: "A short note or a WhatsApp message is enough to start.",
      },
      { property: "og:url", content: "https://partner-crafted-digital.lovable.app/contact" },
      { name: "twitter:title", content: "Contact — AB Digital Consultancy" },
      {
        name: "twitter:description",
        content: "WhatsApp +91 90521 42231, or send a short note.",
      },
    ],
    links: [{ rel: "canonical", href: "https://partner-crafted-digital.lovable.app/contact" }],
  }),
  component: Contact,
});

const fieldClass =
  "mt-2 w-full rounded-[6px] border border-border bg-card px-3 py-2.5 text-base outline-none transition-colors focus:border-accent";

const labelClass = "font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft";

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    const { error } = await supabase.from("contact_enquiries").insert({
      name: String(data.get("name") ?? "").trim(),
      business: String(data.get("business") ?? "").trim() || null,
      phone: String(data.get("phone") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    });

    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }
    form.reset();
    setStatus("sent");
  }

  return (
    <SiteLayout>
      <PageHero
        compact
        badge="Replies within a working day"
        title={
          <>
            Tell us what you're trying to do. We'll be <span className="text-accent">straight</span>{" "}
            with you.
          </>
        }
        subtitle="A short note is enough. No sales call, no pressure — just an honest answer about what your business needs."
        actions={
          <ButtonAnchor href={WHATSAPP_URL}>WhatsApp {PHONE_DISPLAY}</ButtonAnchor>
        }
      />

      <Section>
        <div className="grid gap-16 md:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <Eyebrow>Send a note</Eyebrow>
            <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-6">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Your name
                </label>
                <input id="name" name="name" required autoComplete="name" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="business" className={labelClass}>
                  Business name
                </label>
                <input
                  id="business"
                  name="business"
                  autoComplete="organization"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone or WhatsApp
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="message" className={labelClass}>
                  What do you need?
                </label>
                <textarea id="message" name="message" required rows={4} className={fieldClass} />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-[6px] btn-sweep bg-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-primary-foreground transition-all duration-300 hover:scale-[1.03] hover:bg-accent disabled:opacity-50"
              >
                {status === "sending" ? "Sending…" : "Send it across"}
              </button>

              <p aria-live="polite" className="text-sm">
                {status === "sent" && (
                  <span className="text-accent">
                    Got it. We'll reply within a working day — usually sooner.
                  </span>
                )}
                {status === "error" && (
                  <span className="text-ink-soft">
                    That didn't go through. Please message us on WhatsApp instead.
                  </span>
                )}
              </p>
            </form>
          </Reveal>

          <Reveal delay={120}>
            <Eyebrow>Rather just talk?</Eyebrow>
            <h2 className="mt-4 text-2xl">WhatsApp is usually faster.</h2>
            <p className="mt-4 text-ink-soft">
              Most conversations start there. Send a line about your business — no form, no sales
              call.
            </p>
            <div className="mt-8">
              <ButtonAnchor href={WHATSAPP_URL} variant="ghost">
                WhatsApp {PHONE_DISPLAY}
              </ButtonAnchor>
            </div>
            <p className="mt-10 font-mono text-xs text-ink-soft">
              Bengaluru, Karnataka. Working with businesses anywhere in India.
              <br />
              Monday to Saturday, 10am to 7pm.
            </p>
          </Reveal>
        </div>
      </Section>
    </SiteLayout>
  );
}
