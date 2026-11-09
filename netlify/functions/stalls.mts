import { stallSourceSchema, toStallStatus, type Stall } from '../../src/lib/stalls';

/**
 * GET /api/stalls: the free stalls for the Makar Sankranti edition.
 *
 * Reads the Apps Script web app on the stall booking sheet, which publishes only free stalls
 * (stall number + "available"). This function applies the same rule again, so even an older script
 * that also sends booked, blocked or blank rows can't leak them: only stalls marked Available reach
 * a browser, and no totals are ever sent, so the size of the exhibition stays private.
 * The response is cached for a minute so a busy page doesn't hammer Google.
 * Set STALLS_ENDPOINT in the Netlify UI to point at a different script.
 */
const DEFAULT_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbx4GkkXgApqS1jCAiSxN9M-SmuuZCTQZh6Imp1GLm3B9X74MUNMF-Ot-xulT01r8NFv/exec';

const json = (status: number, body: Record<string, unknown>, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers },
  });

export default async (request: Request) => {
  if (request.method !== 'GET') return json(405, { ok: false, error: 'Method not allowed' }, { Allow: 'GET' });

  let raw: unknown;
  try {
    const response = await fetch(process.env.STALLS_ENDPOINT ?? DEFAULT_ENDPOINT, {
      redirect: 'follow',
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`Apps Script responded ${response.status}`);
    raw = await response.json();
  } catch (error) {
    console.error('Stall sheet request failed', error);
    return json(502, { ok: false, error: 'Could not load stall availability' });
  }

  const parsed = stallSourceSchema.safeParse(raw);
  if (!parsed.success) {
    // The script returns { error } when it can't find the headers; log it for whoever edits the sheet.
    console.error('Stall sheet returned unexpected data', (raw as { error?: unknown })?.error ?? parsed.error.issues);
    return json(502, { ok: false, error: 'Could not load stall availability' });
  }

  const { updatedAt } = parsed.data;
  const stalls = parsed.data.stalls.flatMap(({ stall, status }): Stall[] =>
    toStallStatus(status) === 'available' ? [{ stall, status: 'available' }] : [],
  );

  return json(
    200,
    { ok: true, updatedAt, available: stalls.length, stalls },
    {
      // Browsers re-ask after a minute; Netlify's CDN serves a cached copy meanwhile and refreshes in
      // the background, so a booking marked in the sheet shows on the site within about a minute.
      'Cache-Control': 'public, max-age=60',
      'Netlify-CDN-Cache-Control': 'public, durable, s-maxage=60, stale-while-revalidate=300',
    },
  );
};

export const config = {
  path: '/api/stalls',
  rateLimit: { windowLimit: 60, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};
