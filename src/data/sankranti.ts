import { fullVenue, stallsEdition } from './editions';

/**
 * The Makar Sankranti Special Edition shown in the home hero. The values come from the Amravati
 * entry in src/data/editions.ts, so the dates and venue are still written in exactly one place.
 */
export const sankrantiEdition = {
  title: 'AANGAN EXHIBITION',
  edition: stallsEdition.name,
  dates: stallsEdition.dateLabel,
  /** Machine-readable first day, used by <time> for search engines and assistive tech. */
  startDate: stallsEdition.startDate,
  venue: fullVenue(stallsEdition),
  /** What Google Maps searches for when "Get Directions" is pressed. */
  mapsQuery: fullVenue(stallsEdition),
} as const;
