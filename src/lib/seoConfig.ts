/** The live domain. Canonical URLs, social cards, structured data and the sitemap all use it. */
export const SITE_URL = 'https://aanganexhibition.com';

/**
 * Absolute URL for a route, with a trailing slash. Each page is pre-rendered to <route>/index.html,
 * and Netlify answers /about with a 301 to /about/, so the slash form is the one that serves a 200.
 */
export const pageUrl = (path: string) => `${SITE_URL}${path.endsWith('/') ? path : `${path}/`}`;
