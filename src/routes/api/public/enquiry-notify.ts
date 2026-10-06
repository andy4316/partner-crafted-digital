import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
const TO = "hello@abdigitalconsultancy.in";
const FROM = "AB Digital Website <hello@abdigitalconsultancy.in>";

const esc = (v: unknown) =>
  String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const show = (v: string | null | undefined) => (v && v.trim() ? esc(v) : "<em style=\"color:#888\">Not provided</em>");

export const Route = createFileRoute("/api/public/enquiry-notify")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = z.object({ id: z.string().uuid() }).safeParse(await request.json().catch(() => null));
        if (!parsed.success) return new Response("Bad request", { status: 400 });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: row, error } = await supabaseAdmin
          .from("contact_enquiries")
          .select("*")
          .eq("id", parsed.data.id)
          .maybeSingle();
        if (error || !row) return new Response("Not found", { status: 404 });

        // Only notify for fresh rows, so this public URL can't be used to resend old enquiries.
        if (Date.now() - new Date(row.created_at).getTime() > 10 * 60 * 1000) {
          return new Response("Too old", { status: 409 });
        }

        const lovableKey = process.env["LOVABLE_API_KEY"];
        const resendKey = process.env["RESEND_API_KEY"];
        if (!lovableKey || !resendKey) return new Response("Email not configured", { status: 500 });

        const kind = row.enquiry_type === "sample_request" ? "Free sample request" : "General enquiry";
        const when = new Date(row.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST";
        const fields: [string, string][] = [
          ["Name", show(row.name)],
          ["Business", show(row.business)],
          ["Email", show(row.email)],
          ["Phone", show(row.phone)],
          ["Industry", show(row.industry)],
          ["Website", show(row.website)],
          ["Enquiry type", esc(kind)],
          ["Service", show(row.service_type)],
          ["Submitted", esc(when)],
        ];
        const html = `<div style="font-family:Arial,sans-serif;color:#1B2A44;max-width:600px">
<h2 style="margin:0 0 16px">New ${esc(kind.toLowerCase())} from ${esc(row.name)}</h2>
<table style="border-collapse:collapse;width:100%">${fields
          .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;width:130px">${k}</td><td style="padding:6px 0">${v}</td></tr>`)
          .join("")}</table>
<h3 style="margin:24px 0 8px">Message</h3>
<p style="white-space:pre-wrap;margin:0">${show(row.message)}</p></div>`;

        const res = await fetch(`${GATEWAY_URL}/emails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${lovableKey}`,
            "X-Connection-Api-Key": resendKey,
          },
          body: JSON.stringify({
            from: FROM,
            to: [TO],
            ...(row.email ? { reply_to: row.email } : {}),
            subject: `${kind}: ${row.name}${row.business ? ` (${row.business})` : ""}`,
            html,
          }),
        });
        if (!res.ok) {
          const body = await res.text();
          console.error(`Resend failed [${res.status}]: ${body}`);
          return new Response(`Email failed [${res.status}]`, { status: 502 });
        }
        return new Response("ok");
      },
    },
  },
});
