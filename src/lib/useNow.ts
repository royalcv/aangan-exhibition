import { useEffect, useState } from 'react';

/**
 * The current time, safe for pre-rendered pages. The first render uses the build time so it matches
 * the HTML generated at build; after hydration it switches to the visitor's clock, so date-based
 * content (like "next edition") stays right even when the site hasn't been rebuilt in a while.
 */
export const useNow = (): Date => {
  const [now, setNow] = useState(() => new Date(__BUILD_TIME__));

  useEffect(() => setNow(new Date()), []);

  return now;
};
