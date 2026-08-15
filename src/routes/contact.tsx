import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { Reveal } from "@/components/reveal";
import { Eyebrow, Section, SiteLayout } from "@/components/site-layout";
import { supabase } from "@/integrations/supabase/client";
import { PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — AB Digital Consultancy" },
      {
        name: "description",
        content:
          "Tell us about your business and what you need. Message us on WhatsApp at +91 90521 42231 or send a short note.",
      },
      { property: "og:title", content: "Contact — AB Digital Consultancy" },
      {
        property: "og:description",
        content: "A short note or a WhatsApp message is enough to start.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const fieldClass =
  "mt-2 w-full border-b border-input bg-transparent py-3 text-base outline-none transition-colors focus:border-gold";

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
      <Section>
        <Reveal>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-8 max-w-3xl text-4xl md:text-6xl">
            Tell us what you're trying to do. We'll be straight with you.
          </h1>
        </Reveal>

        <div className="mt-20 grid gap-16 md:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <form onSubmit={handleSubmit} className="max-w-xl space-y-8">
              <div>
                <label htmlFor="name" className="text-sm text-muted-foreground">
                  Your name
                </label>
                <input id="name" name="name" required autoComplete="name" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="business" className="text-sm text-muted-foreground">
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
                <label htmlFor="phone" className="text-sm text-muted-foreground">
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
                <label htmlFor="message" className="text-sm text-muted-foreground">
                  What do you need?
                </label>
                <textarea id="message" name="message" required rows={4} className={fieldClass} />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="border-b-2 border-gold pb-1 text-sm uppercase tracking-[0.18em] disabled:opacity-50"
              >
                {status === "sending" ? "Sending…" : "Send it across"}
              </button>

              <p aria-live="polite" className="text-sm">
                {status === "sent" && (
                  <span className="text-teal">
                    Got it. We'll reply within a working day — usually sooner.
                  </span>
                )}
                {status === "error" && (
                  <span className="text-muted-foreground">
                    That didn't go through. Please message us on WhatsApp instead.
                  </span>
                )}
              </p>
            </form>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="text-xl">Rather just talk?</h2>
            <p className="mt-4 text-muted-foreground">
              Most conversations start on WhatsApp. Send a line about your business — no form, no
              sales call.
            </p>
            <a
              href={WHATSAPP_URL}
              rel="noopener"
              className="mt-8 inline-block border-b-2 border-gold pb-1 text-sm uppercase tracking-[0.18em]"
            >
              WhatsApp {PHONE_DISPLAY}
            </a>
            <p className="mt-10 text-sm text-muted-foreground">
              We work with businesses anywhere in India. Monday to Saturday, 10am to 7pm.
            </p>
          </Reveal>
        </div>
      </Section>
    </SiteLayout>
  );
}
