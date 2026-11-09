import { contactSchema } from '../../src/lib/contactSchema';

/**
 * POST /api/contact: validates a Contact page submission and forwards it to the Apps Script web
 * app that appends rows to the "Aangan Contact Submissions" Google Sheet.
 *
 * Running this on the server (instead of posting from the browser in no-cors mode) means the
 * visitor learns when a message didn't go through, bad or oversized input is rejected, bots are
 * filtered by the honeypot and the rate limit below, and the Apps Script URL never ships to browsers.
 * Set CONTACT_ENDPOINT in the Netlify UI to point at a different script.
 */
const DEFAULT_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbxU3cGFO4WXd_iGQsHnshROMqxp0RmigNlAtRARR5x1jG2aujo7qDkIOhtXBLYisYPJ/exec';

/**
 * Google Sheets treats cells starting with = + - @ (or tab/CR) as formulas, which lets a visitor
 * plant a live =HYPERLINK or =IMPORTXML in the sheet. A leading apostrophe keeps them plain text.
 */
const neutraliseFormula = (value: string) => (/^[=+\-@\t\r]/.test(value) ? `'${value}` : value);

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

export default async (request: Request) => {
  if (request.method !== 'POST') return json(405, { ok: false, error: 'Method not allowed' });

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return json(400, { ok: false, error: 'Invalid request' });
  }

  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return json(422, { ok: false, error: 'Please check the highlighted fields', fields: parsed.error.flatten().fieldErrors });
  }

  const { company, ...fields } = parsed.data;
  // A filled honeypot means a bot: pretend it worked so it doesn't retry, but store nothing.
  if (company) return json(200, { ok: true });

  const payload = new URLSearchParams(
    Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, neutraliseFormula(value)])),
  );

  try {
    const response = await fetch(process.env.CONTACT_ENDPOINT ?? DEFAULT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload,
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error(`Apps Script responded ${response.status}`);
      return json(502, { ok: false, error: 'Could not save your message' });
    }
  } catch (error) {
    console.error('Apps Script request failed', error);
    return json(502, { ok: false, error: 'Could not save your message' });
  }

  return json(200, { ok: true });
};

export const config = {
  path: '/api/contact',
  // At most 5 submissions per minute from one IP, which no real visitor will hit.
  rateLimit: { windowLimit: 5, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};
