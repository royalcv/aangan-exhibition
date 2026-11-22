import { mapsLink } from './site';

/**
 * Every Aangan edition, in date order. This is the one place to edit event details: the home hero,
 * the edition cards, the footer, the stall availability page and the search-engine event data all
 * read from here.
 */
export type Edition = {
  id: string;
  /** Which edition this is, e.g. "Makar Sankranti Special Edition". */
  name: string;
  /** City shown next to the name, e.g. "Akola". Also used in the search-engine event address. */
  city: string;
  /** Short date for tight spaces, e.g. "2–3 Jan". */
  shortDate: string;
  /** Full date line, e.g. "2nd & 3rd January 2027". */
  dateLabel: string;
  startDate: string;
  endDate: string;
  /** Opening hours; leave out until they're confirmed. */
  hours?: string;
  venue: string;
  area: string;
  /** Visitor estimate; leave out until there's one to share. */
  expected?: string;
  description: string;
  /** What's on sale and what else is on; empty lists are simply not shown. */
  shop: string[];
  experience: string[];
  /** Google Maps link for "Get directions". Opens in a new tab. */
  directions: string;
  /** Link to the stall availability page for this edition. */
  stallsPage?: string;
  /** The live stall feed that page reads (netlify/functions/stalls.mts picks the sheet from it). */
  stallsFeed?: string;
  /**
   * Flip to true when this edition's stall availability is live. While false, the
   * "Check Stall Availability" button shows as a disabled "Coming Soon" button.
   */
  stallAvailabilityEnabled: boolean;
  schemaName: string;
  schemaDescription: string;
};

export const editions: Edition[] = [
  {
    id: 'makar-sankranti-2027-akola',
    name: 'Makar Sankranti Special Exhibition',
    city: 'Akola',
    shortDate: '2–3 Jan',
    dateLabel: '2nd & 3rd January 2027',
    startDate: '2027-01-02T10:00:00+05:30',
    // End of the second day in India time, so it only counts as "ended" once the 3rd is over.
    endDate: '2027-01-03T23:59:00+05:30',
    venue: 'Hotel Shagun',
    area: 'Jatharpeth Road, Akola',
    description: 'Our Makar Sankranti Special Exhibition comes to Akola.',
    shop: [],
    experience: [],
    directions: 'https://maps.app.goo.gl/1Bus6L6PzvQsgHBg7',
    stallsPage: '/stalls/akola',
    stallsFeed: '/api/stalls/akola',
    stallAvailabilityEnabled: true,
    schemaName: 'AANGAN Makar Sankranti Special – Akola',
    schemaDescription:
      'Makar Sankranti Special Exhibition of Aangan Exhibition at Hotel Shagun, Jatharpeth Road, Akola.',
  },
  {
    id: 'makar-sankranti-2027',
    name: 'Makar Sankranti Special Edition',
    city: 'Amravati',
    shortDate: '9–10 Jan',
    dateLabel: '9th & 10th January 2027',
    startDate: '2027-01-09',
    // End of the second day in Amravati time, so it only counts as "ended" once the 10th is over.
    endDate: '2027-01-10T23:59:00+05:30',
    venue: 'Abhiyanta Bhavan',
    area: 'Shegaon Naka, Amravati',
    description:
      'Our Makar Sankranti Special Edition: two festive days with Amravati’s women entrepreneurs, artisans and homegrown brands.',
    shop: [],
    experience: [],
    directions: mapsLink('Abhiyanta Bhavan, Shegaon Naka, Amravati'),
    stallsPage: '/stalls/amravati',
    stallsFeed: '/api/stalls',
    stallAvailabilityEnabled: true,
    schemaName: 'AANGAN Makar Sankranti Special – Amravati',
    schemaDescription:
      'Makar Sankranti Special Edition of Aangan Exhibition at Abhiyanta Bhavan, Shegaon Naka, Amravati, with stalls from women entrepreneurs, artisans and homegrown brands.',
  },
];

/**
 * The Amravati edition: /stalls/amravati (live sheet: GET /api/stalls) and the home hero are about
 * it. Akola is on /stalls/akola (GET /api/stalls/akola); /stalls lets visitors pick one.
 */
export const stallsEdition: Edition = editions.find((edition) => edition.id === 'makar-sankranti-2027')!;

/** The Akola edition, shown on /stalls/akola. */
export const akolaStallsEdition: Edition = editions.find((edition) => edition.id === 'makar-sankranti-2027-akola')!;

/** Editions whose stall availability page is live, in date order. */
export const liveStallEditions = (now: Date = new Date()): Edition[] =>
  getUpcomingEditions(now).filter((edition) => edition.stallAvailabilityEnabled && edition.stallsPage);

/** "Abhiyanta Bhavan, Shegaon Naka, Amravati" */
export const fullVenue = (edition: Edition) => `${edition.venue}, ${edition.area}`;

/** True once the edition's last day is over. */
export const hasEnded = (edition: Edition, now: Date = new Date()): boolean => new Date(edition.endDate) <= now;

/** Editions that haven't finished yet, in date order. */
export const getUpcomingEditions = (now: Date = new Date()): Edition[] =>
  editions.filter((edition) => !hasEnded(edition, now));

/** Editions that are over, most recent first. */
export const getPastEditions = (now: Date = new Date()): Edition[] =>
  editions.filter((edition) => hasEnded(edition, now)).reverse();

/** The first edition that hasn't finished yet, or null once all have passed. */
export const getNextEdition = (now: Date = new Date()): Edition | null => getUpcomingEditions(now)[0] ?? null;
