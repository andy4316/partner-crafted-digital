import { useEffect, useRef, useState, type FormEvent } from "react";
import { z } from "zod";

import { supabase } from "@/integrations/supabase/client";
import { EMAIL, EMAIL_URL, PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/site";

const fieldClass =
  "mt-2 w-full rounded-[6px] border bg-card px-3 py-2.5 text-base text-ink outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const validFieldClass = "border-border focus:border-accent";
const invalidFieldClass = "border-iso bg-card ring-1 ring-iso focus:border-iso focus-visible:ring-iso";

const labelClass = "font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft";

const schema = z.object({
  name: z.string().trim().min(2, "Please tell us your name.").max(100, "Please keep your name under 100 characters."),
  business: z.string().trim().max(120, "Please keep the business name under 120 characters.").optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid email address.").max(255, "Please keep the email under 255 characters."),
  phone: z.string().trim().min(6, "Please add a phone or WhatsApp number.").max(30, "Please keep the phone number under 30 characters."),
  industry: z.string().trim().max(120, "Please keep this description under 120 characters.").optional().or(z.literal("")),
  website: z.string().trim().max(255, "Please keep the website address under 255 characters.").optional().or(z.literal("")),
  message: z.string().trim().min(10, "A line or two about your business helps.").max(2000, "Please keep your note under 2,000 characters."),
});

type FieldName = keyof z.infer<typeof schema>;
type FieldErrors = Partial<Record<FieldName, string>>;

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
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState<{ kind: Kind; service: ServiceChoice; name: string } | null>(null);
  const confirmationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (status === "sent") {
      confirmationRef.current?.focus();
    }
  }, [status]);

  function clearFieldError(field: FieldName) {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const parsed = schema.safeParse(raw);

    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && field in schema.shape && !nextErrors[field as FieldName]) {
          nextErrors[field as FieldName] = issue.message;
        }
      }
      setStatus("idle");
      setError(null);
      setFieldErrors(nextErrors);

      const firstField = Object.keys(nextErrors)[0];
      if (firstField) {
        requestAnimationFrame(() => {
          const target = form.elements.namedItem(firstField);
          if (target instanceof HTMLElement) target.focus();
        });
      }
      return;
    }

    setStatus("sending");
    setError(null);
    setFieldErrors({});

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
      service_type: kind === "sample_request" ? "website" : service,
    });

    if (insertError) {
      setStatus("error");
      setError("That didn't go through. Please message us on WhatsApp instead.");
      return;
    }

    form.reset();
    setSubmitted({
      kind,
      service: kind === "sample_request" ? "website" : service,
      name: values.name,
    });
    setStatus("sent");
  }

  const id = (field: string) => `enquiry-${field}`;
  const errorId = (field: FieldName) => `${id(field)}-error`;
  const fieldProps = (field: FieldName) => ({
    "aria-invalid": fieldErrors[field] ? true : undefined,
    "aria-describedby": fieldErrors[field] ? errorId(field) : undefined,
    onInput: () => clearFieldError(field),
    className: `${fieldClass} ${fieldErrors[field] ? invalidFieldClass : validFieldClass}`,
  });
  const fieldError = (field: FieldName) =>
    fieldErrors[field] ? (
      <p id={errorId(field)} className="mt-2 flex items-start gap-2 text-sm font-medium text-iso">
        <span aria-hidden>!</span>
        <span>{fieldErrors[field]}</span>
      </p>
    ) : null;
  const copy = KIND_COPY[kind];
  const errorCount = Object.keys(fieldErrors).length;
  const serviceLabel = (value: ServiceChoice) =>
    SERVICE_OPTIONS.find((option) => option.value === value)?.label ?? value;

  if (status === "sent" && submitted) {
    return (
      <div
        ref={confirmationRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="mt-8 max-w-xl rounded-[8px] border border-accent/40 bg-card p-8 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          {submitted.kind === "sample_request" ? "Sample request received" : "Enquiry received"}
        </p>
        <h3 className="mt-3 text-xl">Thanks, {submitted.name.split(" ")[0]}.</h3>
        <p className="mt-3 text-ink-soft">{KIND_COPY[submitted.kind].success}</p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
          About: <span className="text-ink">{serviceLabel(submitted.service)}</span>
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setSubmitted(null);
            }}
            className="inline-flex items-center gap-2 rounded-[6px] border border-border px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Send another note
          </button>
          <a href={WHATSAPP_URL} rel="noopener" className="text-sm text-accent">
            Or WhatsApp {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-6" noValidate>
      {defaultService === "iso" && (
        <p className="inline-flex items-center gap-2 rounded-full border border-iso/30 bg-iso/5 px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-iso">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-iso" />
          ISO Certification enquiry
        </p>
      )}
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
            {...fieldProps("name")}
          />
          {fieldError("name")}
        </div>
        {kind === "enquiry" && (
          <div>
            <label htmlFor={id("service")} className={labelClass}>
              What is this about?
            </label>
            <div className="relative mt-2">
              <select
                id={id("service")}
                name="service"
                value={service}
                onChange={(e) => setService(e.target.value as ServiceChoice)}
                className={`${fieldClass} ${validFieldClass} appearance-none pr-10 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink`}
              >
                {SERVICE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </div>
          </div>
        )}
        <div>
          <label htmlFor={id("business")} className={labelClass}>
            Business name
          </label>
          <input
            id={id("business")}
            name="business"
            autoComplete="organization"
            maxLength={120}
            {...fieldProps("business")}
          />
          {fieldError("business")}
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
            {...fieldProps("email")}
          />
          {fieldError("email")}
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
            {...fieldProps("phone")}
          />
          {fieldError("phone")}
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
            {...fieldProps("industry")}
          />
          {fieldError("industry")}
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
            {...fieldProps("website")}
          />
          {fieldError("website")}
        </div>

        <div className={kind === "sample_request" ? "sm:col-span-2" : undefined}>
          <label htmlFor={id("message")} className={labelClass}>
            What do you need?
          </label>
          <textarea
            id={id("message")}
            name="message"
            required
            rows={kind === "enquiry" ? 6 : 4}
            maxLength={2000}
            placeholder={copy.placeholder}
            {...fieldProps("message")}
          />
          {fieldError("message")}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-[6px] btn-sweep bg-primary px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-primary-foreground transition-all duration-300 hover:scale-[1.03] hover:bg-accent disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : copy.submit}
      </button>

      <p aria-live="assertive" className="text-sm">
        {errorCount > 0 && (
          <span className="font-medium text-iso">
            Please correct {errorCount} {errorCount === 1 ? "field" : "fields"} marked in the form.
          </span>
        )}
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
