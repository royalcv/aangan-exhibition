/**
 * The Makar Sankranti Special Edition. Shared by the home hero and the stall availability page,
 * so the dates and venue are written in exactly one place.
 */
export const sankrantiEdition = {
  title: 'AANGAN EXHIBITION',
  edition: 'Makar Sankranti Special Edition',
  dates: '9th & 10th January 2027',
  /** Machine-readable first day, used by <time> for search engines and assistive tech. */
  startDate: '2027-01-09',
  venue: 'Abhiyanta Bhavan, Shegaon Naka, Amravati',
  /** What Google Maps searches for when "Get Directions" is pressed. */
  mapsQuery: 'Abhiyanta Bhavan, Shegaon Naka, Amravati',
} as const;
