import { mapsLink } from './site';

export type Edition = {
  id: string;
  /** Short date for tight spaces, e.g. "24–25 Oct". */
  shortDate: string;
  /** Full date line, e.g. "24–25 October 2026". */
  dateLabel: string;
  startDate: string;
  endDate: string;
  hours: string;
  venue: string;
  area: string;
  expected: string;
  description: string;
  shop: string[];
  experience: string[];
  directions: string;
  schemaName: string;
  schemaDescription: string;
};

export const editions: Edition[] = [
  {
    id: 'rajapeth',
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
];

/** The first edition that hasn't finished yet, or null once all have passed. */
export const getNextEdition = (now: Date = new Date()): Edition | null =>
  editions.find((edition) => new Date(edition.endDate) > now) ?? null;
