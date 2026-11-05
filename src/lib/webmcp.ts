import { EMAIL, PHONE_DISPLAY, SITE_NAME, SITE_URL } from "@/lib/site";

const PAGES = ["index", "services", "work", "about", "iso-consultancy", "contact", "terms"];

type WebMcpTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations: { readOnlyHint: boolean };
  execute: (input: Record<string, unknown>) => Promise<{ content: { type: "text"; text: string }[] }>;
};

type ModelContext = {
  registerTool?: (tool: WebMcpTool, options?: { signal?: AbortSignal }) => void;
};

const text = (value: string) => ({ content: [{ type: "text" as const, text: value }] });

const TOOLS: WebMcpTool[] = [
  {
    name: "get_business_info",
    description: `Get contact details, location, opening hours and enquiry options for ${SITE_NAME}.`,
    inputSchema: { type: "object", properties: {} },
    annotations: { readOnlyHint: true },
    execute: async () =>
      text(
        JSON.stringify({
          name: SITE_NAME,
          url: SITE_URL,
          phone_and_whatsapp: PHONE_DISPLAY,
          email: EMAIL,
          location: "Bengaluru, Karnataka, working with businesses anywhere in India",
          hours: "Monday to Saturday, 10am to 7pm",
          enquiry_form: `${SITE_URL}/contact`,
        }),
      ),
  },
  {
    name: "read_site_page",
    description: `Read a page of the ${SITE_NAME} website as Markdown, including services, pricing, ISO consulting and terms.`,
    inputSchema: {
      type: "object",
      properties: { page: { type: "string", enum: PAGES, description: "The page to read." } },
      required: ["page"],
    },
    annotations: { readOnlyHint: true },
    execute: async ({ page }) => {
      if (typeof page !== "string" || !PAGES.includes(page)) {
        return text(`Unknown page. Choose one of: ${PAGES.join(", ")}.`);
      }
      const response = await fetch(`/${page}.md`);
      return text(response.ok ? await response.text() : "That page could not be loaded.");
    },
  },
];

/** Registers read-only tools for in-browser agents, where the browser supports WebMCP. */
export function registerWebMcpTools() {
  const modelContext = (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
  if (!modelContext?.registerTool) return undefined;

  const controller = new AbortController();
  for (const tool of TOOLS) {
    try {
      modelContext.registerTool(tool, { signal: controller.signal });
    } catch (error) {
      console.warn(`WebMCP tool "${tool.name}" was not registered.`, error);
    }
  }
  return () => controller.abort();
}
