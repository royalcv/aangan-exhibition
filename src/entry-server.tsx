import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import { Writable } from 'node:stream';
import App from './App';

export type RenderResult = { html: string; head: string };

/**
 * Renders one route to HTML at build time. Waits for every lazy page to load (onAllReady) so the
 * output contains the full page, not the Suspense fallback. Used only by scripts/prerender.mjs.
 */
export function render(url: string): Promise<RenderResult> {
  const helmetContext: { helmet?: HelmetServerState } = {};

  return new Promise((resolve, reject) => {
    let html = '';
    const sink = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk.toString();
        callback();
      },
    });

    sink.on('finish', () => {
      const { helmet } = helmetContext;
      const head = helmet
        ? [helmet.title, helmet.meta, helmet.link, helmet.script].map((part) => part.toString()).join('')
        : '';
      resolve({ html, head });
    });

    const stream = renderToPipeableStream(
      <StrictMode>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </HelmetProvider>
      </StrictMode>,
      {
        onAllReady: () => stream.pipe(sink),
        onShellError: reject,
        onError: reject,
      },
    );
  });
}
