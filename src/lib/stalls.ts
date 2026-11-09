import { z } from 'zod';

export type StallStatus = 'available' | 'booked';

/**
 * Only these two words count. Anything else in the sheet's Booked/Avaliable column ("Blocked",
 * "Hold", a name, a blank cell) returns null, and that stall is left off the website entirely.
 * The Apps Script applies the same rule; repeating it here means the site stays right even if the
 * script is changed or an older version is still deployed.
 */
export const toStallStatus = (value: string): StallStatus | null => {
  const word = value.toLowerCase().replace(/[^a-z]/g, '');
  if (word === 'booked' || word === 'book') return 'booked';
  if (['available', 'avaliable', 'availabe', 'avail', 'avl'].includes(word)) return 'available';
  return null;
};

/**
 * The Apps Script's response, as read by GET /api/stalls (netlify/functions/stalls.mts). This is
 * the second gate after the script: only a stall number and a status are kept, so nothing else from
 * the sheet can reach a visitor.
 */
export const stallSourceSchema = z.object({
  updatedAt: z.string().datetime(),
  stalls: z
    .array(
      z.object({
        // Upper-cased so a typo like "w28" in the sheet still reads W28 on the site.
        stall: z.string().trim().min(1).max(20).transform((value) => value.toUpperCase()),
        status: z.string().max(60),
      }),
    )
    .max(2000),
});

export type Stall = { stall: string; status: StallStatus };
/**
 * What the website receives. Only the free stalls: the total, the booked count and booked stall
 * numbers stay on the server, so the size of the exhibition can't be read from the page or the API.
 */
export type StallFeed = { updatedAt: string; available: number; stalls: Stall[] };

/** Sorts W2 before W10. */
export const compareStalls = (a: Stall, b: Stall) =>
  a.stall.localeCompare(b.stall, 'en', { numeric: true, sensitivity: 'base' });

export type StallGroup = { prefix: string; stalls: Stall[] };

/** Groups stalls by their letter prefix (W1, W2… → "W"), keeping the sheet's order of groups. */
export const groupStalls = (stalls: Stall[]): StallGroup[] => {
  const groups = new Map<string, Stall[]>();
  for (const stall of stalls) {
    const prefix = stall.stall.match(/^[A-Za-z]+/)?.[0].toUpperCase() ?? '#';
    groups.set(prefix, [...(groups.get(prefix) ?? []), stall]);
  }
  return Array.from(groups, ([prefix, list]) => ({ prefix, stalls: list.sort(compareStalls) }));
};
