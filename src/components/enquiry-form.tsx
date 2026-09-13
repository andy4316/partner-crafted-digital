import { useState, type FormEvent } from "react";
import { z } from "zod";

import { supabase } from "@/integrations/supabase/client";
import { PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/site";

const fieldClass =
  "mt-2 w-full rounded-[6px] border border-border bg-card px-3 py-2.5 text-base outline-none transition-colors focus:border-accent";

const labelClass = "font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft";

const schema = z.object({
  name: z.string().trim().min(2, "Please tell us your name").max(100),
  business: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z.string().trim().min(6, "Please add a phone or WhatsApp number").max(30),
  industry: z.string().trim().max(120).optional().or(z.literal("")),
  website: z.string().trim().max(255).optional().or(z.literal("")),
  message: z.string().trim().min(10, "A line or two about your business helps").max(2000),
});

type Status = "idle" | "sending" | "sent" | "error";
type Kind = "enquiry" | "sample_request";
export type ServiceChoice = "website" | "iso" | "other";

const SERVICE_OPTIONS: { value: ServiceChoice; label: string }[] = [
  { value: "website", label: "Website Development" },
  { value: "iso", label: "ISO Certification" },
  { value: "other", label: "Not sure yet / Something else" },
];

const KIND_OPTIONS: { value: Kind; label: string }[] = [
  { value: "enquiry", label: "General enquiry" },
  { value: "sample_request", label: "Free sample request" },
];

const KIND_COPY: Record<Kind, { placeholder: string; submit: string; success: string }> = {
  enquiry: {
    placeholder: "A website, hosting, SEO, print work — and anything we should know.",
    submit: "Send it across",
    success: "Got it. We'll reply within a working day — usually sooner.",
  },
  sample_request: {
    placeholder: "What you sell, who your customers are, and any site you like the look of.",
    submit: "Request my free sample",
    success: "Request received. We'll be in touch about your sample within a working day.",
  },
};

export function EnquiryForm({
  defaultKind = "enquiry",
  defaultService = "website",
}: {
  defaultKind?: Kind;
  defaultService?: ServiceChoice;
}) {
  const [kind, setKind] = useState<Kind>(defaultKind);
  const [service, setService] = useState<ServiceChoice>(defaultService);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const parsed = schema.safeParse(raw);

    if (!parsed.success) {
      setStatus("error");
      setError(parsed.error.issues[0]?.message ?? "Please check the details and try again.");
      return;
    }

    setStatus("sending");
    setError(null);

    const values = parsed.data;
    const { error: insertError } = await supabase.from("contact_enquiries").insert({
      name: values.name,
      business: values.business ? values.business : null,
      email: values.email,
      phone: values.phone,
      industry: values.industry ? values.industry : null,
      website: values.website ? values.website : null,
      message: values.message,
      enquiry_type: kind,
      service_type: service,
    });

    if (insertError) {
      setStatus("error");
      setError("That didn't go through. Please message us on WhatsApp instead.");
      return;
    }

    form.reset();
    setStatus("sent");
  }

  const id = (field: string) => `enquiry-${field}`;
  const copy = KIND_COPY[kind];

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-6" noValidate>
      <fieldset>
        <legend className={labelClass}>What is this about?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {SERVICE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setService(option.value)}
              aria-pressed={service === option.value}
              className={`rounded-[6px] border px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] transition-colors ${
                service === option.value
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-card text-ink-soft hover:text-ink"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={labelClass}>I'm here to…</legend>
        <div className="mt-3 inline-flex rounded-full border border-border bg-card p-1">
          {KIND_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setKind(option.value)}
              aria-pressed={kind === option.value}
              className={`rounded-full px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] transition-colors ${
                kind === option.value
                  ? "bg-primary text-primary-foreground"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className={labelClass}>
            Your name
          </label>
          <input
            id={id("name")}
            name="name"
            required
            autoComplete="name"
            maxLength={100}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={id("business")} className={labelClass}>
            Business name
          </label>
          <input
            id={id("business")}
            name="business"
            autoComplete="organization"
            maxLength={120}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={id("email")} className={labelClass}>
            Email
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={255}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={id("phone")} className={labelClass}>
            Phone or WhatsApp
          </label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            maxLength={30}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={id("industry")} className={labelClass}>
            What your business does
          </label>
          <input
            id={id("industry")}
            name="industry"
            maxLength={120}
            placeholder="Dental clinic, boutique, exporter…"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={id("website")} className={labelClass}>
            Current website (if any)
          </label>
          <input
            id={id("website")}
            name="website"
            maxLength={255}
            placeholder="yourbusiness.in"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor={id("message")} className={labelClass}>
          What do you need?
        </label>
        <textarea
          id={id("message")}
          name="message"
          required
          rows={4}
          maxLength={2000}
          placeholder={copy.placeholder}
          className={fieldClass}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-[6px] btn-sweep bg-primary px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-primary-foreground transition-all duration-300 hover:scale-[1.03] hover:bg-accent disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : copy.submit}
      </button>

      <p aria-live="polite" className="text-sm">
        {status === "sent" && <span className="text-accent">{copy.success}</span>}
        {status === "error" && error && (
          <span className="text-ink-soft">
            {error}{" "}
            <a href={WHATSAPP_URL} rel="noopener" className="text-accent">
              WhatsApp {PHONE_DISPLAY}
            </a>
          </span>
        )}
      </p>
    </form>
  );
}
