import { compareStalls, maskStall, stallSourceSchema, toStallStatus, type Stall } from '../../src/lib/stalls';

/**
 * GET /api/stalls: the stalls for the Makar Sankranti edition, with how many are free and booked.
 *
 * Reads the Apps Script web app on the stall booking sheet (stall number + status per row). Only
 * rows marked Available or Booked are kept; blocked, held or blank rows are dropped. A booked
 * stall's number is masked here before it is sent, so the page can show a blurred tile for it
 * without the real number reaching a browser.
 * The script must send the booked rows too, or the Booked and All counts only show free stalls.
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
  // Sort on the real numbers first, then mask the booked ones, so the tiles stay in stall order.
  const stalls = parsed.data.stalls
    .flatMap(({ stall, status }): Stall[] => {
      const known = toStallStatus(status);
      return known ? [{ stall, status: known }] : [];
    })
    .sort(compareStalls)
    .map((stall): Stall => (stall.status === 'booked' ? { ...stall, stall: maskStall(stall.stall) } : stall));
  const available = stalls.filter((stall) => stall.status === 'available').length;

  return json(
    200,
    { ok: true, updatedAt, total: stalls.length, available, booked: stalls.length - available, stalls },
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
