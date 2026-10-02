// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Use TanStack Start's OWN prerender system (independent of the Nitro
    // preset) to generate real static HTML for every route into
    // .output/public. We keep the default Cloudflare server build as-is
    // (it's the proven, working path) and simply ignore/discard
    // .output/server + .wrangler when deploying to Hostinger — only
    // .output/public's contents get uploaded.
    prerender: {
      enabled: true,
      crawlLinks: true,
    },
  },
});