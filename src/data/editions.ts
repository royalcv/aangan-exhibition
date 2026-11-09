import { mapsLink } from './site';
import { sankrantiEdition } from './sankranti';

export type Edition = {
  id: string;
  /** Which edition this is, e.g. "Diwali Special". */
  name: string;
  /** Short date for tight spaces, e.g. "24–25 Oct". */
  shortDate: string;
  /** Full date line, e.g. "24–25 October 2026". */
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
  directions: string;
  /** Link to the stall availability page, for editions still taking exhibitors. */
  stallsPage?: string;
  schemaName: string;
  schemaDescription: string;
};

export const editions: Edition[] = [
  {
    id: 'rajapeth',
    name: 'Diwali Special',
    shortDate: '24–25 Oct',
    dateLabel: '24–25 October 2026',
    startDate: '2026-10-24T10:00:00+05:30',
    endDate: '2026-10-25T22:00:00+05:30',
    hours: '10 AM to 10 PM',
    venue: 'The Hotel Aurtus',
    area: 'Rajapeth, Amravati',
    expected: '60,000+ visitors expected over two days',
    description:
      'The Diwali Special edition: traditional arts, crafts and cultural heritage, with artisans from across India.',
    shop: ['Fashion', 'Home made', 'Home decor', 'Traditional crafts', 'Art'],
    experience: ['Cultural performances', 'Food festival'],
    directions: mapsLink('The Hotel Aurtus, Rajapeth, Amravati'),
    schemaName: 'Aangan The Grand Exhibition - Diwali Special (Rajapeth, Amravati)',
    schemaDescription:
      'Diwali Special Exhibition featuring fashion, home decor, traditional crafts, cultural performances, and food stalls in Amravati.',
  },
  {
    id: 'camp-road',
    name: 'Diwali Special',
    shortDate: '31 Oct – 1 Nov',
    dateLabel: '31 October – 1 November 2026',
    startDate: '2026-10-31T10:00:00+05:30',
    endDate: '2026-11-01T22:00:00+05:30',
    hours: '10 AM to 10 PM',
    venue: 'Hotel Mefhil Inn',
    area: 'Camp Road, Amravati',
    expected: '50,000+ visitors expected over two days',
    description: 'The second Diwali Special edition, with a full handicraft bazaar and live demonstrations.',
    shop: ['Fashion', 'Home made', 'Home decor', 'Traditional crafts', 'Art', 'Handicraft bazaar'],
    experience: ['Cultural performances', 'Food festival', 'Heritage exhibits', 'Live demonstrations', 'Traditional music'],
    directions: mapsLink('Hotel Mefhil Inn, Camp Road, Amravati'),
    schemaName: 'Aangan The Grand Exhibition - Diwali Special (Camp Road, Amravati)',
    schemaDescription:
      'Diwali Special Exhibition featuring fashion, home decor, traditional crafts, heritage exhibits, live demonstrations, and a handicraft bazaar in Amravati.',
  },
  {
    id: 'makar-sankranti-2027',
    name: sankrantiEdition.edition,
    shortDate: '9–10 Jan',
    dateLabel: sankrantiEdition.dates,
    startDate: sankrantiEdition.startDate,
    // End of the second day in Amravati time, so it only counts as "ended" once the 10th is over.
    endDate: '2027-01-10T23:59:00+05:30',
    venue: 'Abhiyanta Bhavan',
    area: 'Shegaon Naka, Amravati',
    description:
      'Our Makar Sankranti Special Edition: two festive days with Amravati’s women entrepreneurs, artisans and homegrown brands.',
    shop: [],
    experience: [],
    directions: mapsLink(sankrantiEdition.mapsQuery),
    stallsPage: '/stalls',
    schemaName: 'Aangan Exhibition - Makar Sankranti Special Edition (Shegaon Naka, Amravati)',
    schemaDescription:
      'Makar Sankranti Special Edition of Aangan Exhibition at Abhiyanta Bhavan, Shegaon Naka, Amravati, with stalls from women entrepreneurs, artisans and homegrown brands.',
  },
];

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
