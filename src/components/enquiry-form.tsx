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

export type EnquiryKind = "enquiry" | "sample_request";

export function EnquiryForm({
  kind,
  idPrefix,
  messageLabel,
  messagePlaceholder,
  submitLabel,
  successLine,
}: {
  kind: EnquiryKind;
  idPrefix: string;
  messageLabel: string;
  messagePlaceholder?: string;
  submitLabel: string;
  successLine: string;
}) {
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
    });

    if (insertError) {
      setStatus("error");
      setError("That didn't go through. Please message us on WhatsApp instead.");
      return;
    }

    form.reset();
    setStatus("sent");
  }

  const id = (field: string) => `${idPrefix}-${field}`;

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-6" noValidate>
      <input type="hidden" name="enquiry_type" value={kind} />

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
          {messageLabel}
        </label>
        <textarea
          id={id("message")}
          name="message"
          required
          rows={4}
          maxLength={2000}
          placeholder={messagePlaceholder}
          className={fieldClass}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-[6px] btn-sweep bg-primary px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-primary-foreground transition-all duration-300 hover:scale-[1.03] hover:bg-accent disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : submitLabel}
      </button>

      <p aria-live="polite" className="text-sm">
        {status === "sent" && <span className="text-accent">{successLine}</span>}
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
