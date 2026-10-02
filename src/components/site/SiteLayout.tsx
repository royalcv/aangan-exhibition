import type { ReactNode } from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

/**
 * Persistent page chrome. Header and footer stay mounted across route changes; only <main>
 * (rendered by the caller with the page transition) swaps.
 */
const SiteLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen flex-col">
    <a
      href="#main"
      className="sr-only z-50 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      Skip to main content
    </a>
    <SiteHeader />
    {children}
    <SiteFooter />
  </div>
);

export default SiteLayout;
