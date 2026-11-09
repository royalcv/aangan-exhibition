/// <reference types="vite/client" />

/** ISO timestamp of the build, injected by vite.config.ts. See src/lib/useNow.ts. */
declare const __BUILD_TIME__: string;

/** vite-imagetools: `?...&as=srcset` resolves to a ready-made srcset string. */
declare module '*&as=srcset' {
  const srcset: string;
  export default srcset;
}
