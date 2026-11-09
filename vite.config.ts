import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { imagetools } from "vite-imagetools";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

/**
 * `npm run dev` doesn't run Netlify Functions, so serve GET /api/stalls from the same function file
 * in development. Production uses the real function (netlify/functions/stalls.mts).
 */
const devStallsApi = (): Plugin => ({
  name: "aangan-dev-stalls-api",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use("/api/stalls", async (req, res) => {
      const { default: handler } = await server.ssrLoadModule("/netlify/functions/stalls.mts");
      const response: Response = await handler(new Request("http://localhost/api/stalls", { method: req.method }));
      res.statusCode = response.status;
      response.headers.forEach((value, key) => res.setHeader(key, value));
      res.end(await response.text());
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  define: {
    // Lets the first render of pre-rendered pages match the build (see src/lib/useNow.ts).
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  plugins: [
    react(),
    devStallsApi(),
    // Responsive image sets from a single source, e.g. `hero.webp?w=640;1280&format=webp&as=srcset`.
    imagetools(),
    // Recompresses images imported from src/assets at build time. Skipped for the server build,
    // which only renders HTML and never ships its images. includePublic stays off: on Windows the
    // plugin writes public/ results back over the source files instead of into dist/.
    !isSsrBuild &&
      ViteImageOptimizer({
        includePublic: false,
        jpg: { quality: 78, mozjpeg: true },
        jpeg: { quality: 78, mozjpeg: true },
        png: { quality: 80, compressionLevel: 9 },
        webp: { quality: 78 },
      }),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    // Bundle dependencies into the pre-render build so Node never has to resolve their CSS or ESM quirks.
    noExternal: true,
  },
  build: {
    rollupOptions: {
      output: isSsrBuild
        ? undefined
        : {
            // Framework code changes rarely, so give it its own long-cached chunks.
            manualChunks: {
              react: ["react", "react-dom", "react-router-dom", "react-helmet-async"],
              motion: ["motion/react"],
            },
          },
    },
  },
}));
