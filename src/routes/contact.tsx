import { createFileRoute } from "@tanstack/react-router";

import { ButtonAnchor, ButtonLink } from "@/components/buttons";
import { EnquiryForm } from "@/components/enquiry-form";
import { PageHero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { Eyebrow, Section, SiteLayout } from "@/components/site-layout";
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

function Contact() {
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
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-4">
              <ButtonAnchor href={WHATSAPP_URL}>WhatsApp {PHONE_DISPLAY}</ButtonAnchor>
              <ButtonLink to="/contact" hash="sample" variant="ghost">
                Request a free sample
              </ButtonLink>
            </div>
            <p className="max-w-md text-sm text-ink-soft">
              Tell us about your business and we'll put together a real sample of what your site
              could look like — before you decide anything.
            </p>
          </div>
        }
      />

      <Section id="sample">
        <div className="grid gap-16 md:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <Eyebrow>Send a note</Eyebrow>
            <h2 className="mt-4 text-2xl">Tell us about your business.</h2>
            <p className="mt-3 max-w-md text-ink-soft">
              One form for everything — a question, a project, or a free sample of your site. Pick
              what you need at the top.
            </p>
            <EnquiryForm />
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
