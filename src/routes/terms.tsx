import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/hero";
import { Section, SiteLayout } from "@/components/site-layout";
import { EMAIL, EMAIL_URL, PHONE_DISPLAY, SITE_NAME } from "@/lib/site";

const TERMS = [
  {
    title: "Who these terms are between",
    body: [
      `These terms cover your use of this website and any work you hire ${SITE_NAME} to do. ${SITE_NAME} is based in Bengaluru, Karnataka, India. "We" means ${SITE_NAME}, and "you" means the person or business using the site or hiring us.`,
    ],
  },
  {
    title: "Quotes and scope",
    body: [
      "Prices on this site are in Indian rupees and describe our standard plans. Before work starts, we confirm in writing what we will do, what it costs, and when payment is due. If that written agreement differs from these terms, the written agreement applies.",
      "A free sample comes with no obligation to hire us.",
    ],
  },
  {
    title: "Annual plans",
    body: [
      "The yearly fee covers what your plan lists, such as hosting, domain management and updates. Minor edits mean things like changing prices, swapping a photo, updating hours, adding a paragraph or fixing a typo. New pages, new sections or a redesign are separate work, and we will quote it before we start.",
    ],
  },
  {
    title: "What we need from you",
    body: [
      "Timelines depend on getting your content, photos and feedback. Anything you send us must be accurate, and you must have the right to use it. You are responsible for what your business publishes on its site and for the legal requirements of your industry.",
    ],
  },
  {
    title: "Ownership and leaving",
    body: [
      "Your domain is registered in your name, and your content and code are yours. If you decide to leave, we hand over your files, domain and hosting access and help the next person get set up. There is no exit fee.",
    ],
  },
  {
    title: "ISO certification",
    body: [
      "Certificates are issued by an independent, IAF-accredited certification body after its own audit of your business. The audit depends on your actual processes and on the information you provide.",
    ],
  },
  {
    title: "Using this website",
    body: [
      "Please don't misuse this site, interfere with how it works, or copy its design and content for your own commercial use without asking us. We work to keep the information here accurate and may update it at any time.",
    ],
  },
  {
    title: "Enquiries you send us",
    body: [
      "When you send an enquiry, we keep the details you provide, along with your IP address and browser type, to reply to you and to protect the form from abuse. We don't sell those details.",
    ],
  },
  {
    title: "Liability",
    body: [
      "We do our work with care, but we can't promise that a website will never go down, or that it will produce a particular search ranking or number of enquiries. To the extent the law allows, we aren't liable for indirect losses such as lost profits. Our total liability for a piece of work is limited to the amount you paid us for it in the previous 12 months. Nothing here limits rights you have under law that can't be excluded.",
    ],
  },
  {
    title: "Changes and governing law",
    body: [
      "We may update these terms and will post the new version on this page. They are governed by the laws of India, and the courts of Bengaluru, Karnataka have jurisdiction over any dispute.",
    ],
  },
];

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | AB Digital Consultancy" },
      {
        name: "description",
        content:
          "The terms for using the AB Digital Consultancy website and hiring us: quotes, annual plans, ownership, leaving, and liability.",
      },
      { property: "og:title", content: "Terms of Service — AB Digital Consultancy" },
      {
        property: "og:description",
        content: "Quotes, annual plans, ownership, leaving, and liability, in plain language.",
      },
      { property: "og:url", content: "https://abdigitalconsultancy.in/terms" },
      { name: "twitter:title", content: "Terms of Service — AB Digital Consultancy" },
      {
        name: "twitter:description",
        content: "Quotes, annual plans, ownership, leaving, and liability, in plain language.",
      },
    ],
    links: [{ rel: "canonical", href: "https://abdigitalconsultancy.in/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <SiteLayout>
      <PageHero
        compact
        badge="Last updated 5 November 2026"
        title="Terms of Service"
        subtitle="The terms for using this site and working with us, in plain language."
      />
      <Section>
        <div className="max-w-3xl space-y-10">
          {TERMS.map((section) => (
            <div key={section.title}>
              <h2 className="font-serif text-2xl font-semibold text-ink">{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink">Questions</h2>
            <p className="mt-3 text-ink-soft">
              Write to{" "}
              <a href={EMAIL_URL} className="text-accent">
                {EMAIL}
              </a>{" "}
              or call {PHONE_DISPLAY}.
            </p>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
