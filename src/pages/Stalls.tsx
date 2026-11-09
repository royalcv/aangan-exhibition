import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, CheckCircle2, Lock, MapPin, RefreshCw, TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Seo from '@/components/Seo';
import WhatsAppButton, { WhatsAppIcon } from '@/components/WhatsAppButton';
import { sankrantiEdition as EVENT } from '@/data/sankranti';
import { site } from '@/data/site';
import { groupStalls, type Stall, type StallFeed } from '@/lib/stalls';
import { breadcrumbSchema, organizationSchema } from '@/lib/structuredData';
import { cn } from '@/lib/utils';

type Filter = 'available' | 'booked';
type State = { kind: 'loading' } | { kind: 'error' } | { kind: 'ready'; feed: StallFeed; checkedAt: Date };

/** Re-check when the visitor comes back to the tab after this long. */
const STALE_AFTER_MS = 60_000;

const bookingLink = (stall: string) =>
  `${site.whatsapp}?text=${encodeURIComponent(
    `Hi Aangan! I'd like to book stall ${stall} at the ${EVENT.edition} (${EVENT.dates}). Is it still available?`,
  )}`;

const timeFormat = new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit' });

/**
 * Only the Available count is real. Booked shows a blurred stand-in: the real totals
 * are never sent to the browser (see netlify/functions/stalls.mts), so the size of the exhibition
 * stays private.
 */
const filters: { value: Filter; label: string; count: (feed: StallFeed) => number | null; placeholder?: string }[] = [
  { value: 'available', label: 'Available', count: (feed) => feed.available },
  { value: 'booked', label: 'Booked', count: () => null, placeholder: '88' },
];

/** How many stand-in tiles the blurred "booked" block shows. Fixed, so it says nothing about the real number. */
const HIDDEN_TILE_COUNT = 16;

const gridClass = 'grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8';

const StallTile = ({ stall }: { stall: Stall }) => (
    <li>
      <a
        href={bookingLink(stall.stall)}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full min-h-24 flex-col justify-between rounded-xl border-2 border-primary bg-primary/15 p-3 transition-colors duration-200 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <span className="font-display text-2xl leading-none">{stall.stall}</span>
        <span className="mt-3 inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold">
          <WhatsAppIcon className="h-4 w-4 shrink-0" />
          Book Now
          <span className="sr-only">
            {' '}
            stall {stall.stall}, available, on WhatsApp (opens in a new tab)
          </span>
        </span>
      </a>
    </li>
);

/** Blurred stand-in for the booked stalls: plain tiles with no numbers, and a note on top. */
const HiddenBooked = () => (
  <div className="relative mt-10">
    <ul className={cn(gridClass, 'pointer-events-none select-none blur-[3px]')} aria-hidden="true">
      {Array.from({ length: HIDDEN_TILE_COUNT }, (_, index) => (
        <li key={index} className="flex min-h-24 flex-col justify-between rounded-xl border border-border bg-muted/60 p-3">
          <span className="h-6 w-12 rounded bg-muted-foreground/25" />
          <span className="h-3 w-16 rounded bg-muted-foreground/20" />
        </li>
      ))}
    </ul>
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <p className="flex max-w-sm items-start gap-3 rounded-2xl border border-border bg-background/95 p-5 shadow-sm">
        <Lock className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
        <span>
          <span className="block font-semibold">Booked stalls are private</span>
          <span className="mt-1 block text-muted-foreground">
            Looking for a particular spot? Message us on WhatsApp and we’ll help.
          </span>
        </span>
      </p>
    </div>
  </div>
);

const SkeletonGrid = () => (
  <ul className={cn(gridClass, 'mt-6')} aria-hidden="true">
    {Array.from({ length: 16 }, (_, index) => (
      <li key={index} className="min-h-24 animate-pulse rounded-xl bg-muted motion-reduce:animate-none" />
    ))}
  </ul>
);

const Stalls = () => {
  const [state, setState] = useState<State>({ kind: 'loading' });
  const [filter, setFilter] = useState<Filter | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const checkedAt = useRef(0);

  const load = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await fetch('/api/stalls', { headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const feed = (await response.json()) as StallFeed;
      checkedAt.current = Date.now();
      setState({ kind: 'ready', feed, checkedAt: new Date() });
    } catch {
      // Keep showing the last good list if a refresh fails; only show the error when there's nothing.
      setState((previous) => (previous.kind === 'ready' ? previous : { kind: 'error' }));
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void load();
    const onVisible = () => {
      if (document.visibilityState === 'visible' && Date.now() - checkedAt.current > STALE_AFTER_MS) void load();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [load]);

  const feed = state.kind === 'ready' ? state.feed : null;
  const activeFilter: Filter = filter ?? 'available';
  const groups = useMemo(() => (feed ? groupStalls(feed.stalls) : []), [feed]);
  const showAvailable = activeFilter === 'available';
  const showBooked = activeFilter === 'booked';

  return (
    <>
      <Seo
        title={`Stall Availability | Aangan ${EVENT.edition}, Amravati`}
        description={`See which exhibitor stalls are still free at Aangan Exhibition's ${EVENT.edition}, ${EVENT.dates} at ${EVENT.venue}, and book one on WhatsApp.`}
        path="/stalls"
        keywords="Aangan stall booking, exhibition stall Amravati, book stall Amravati exhibition, Makar Sankranti exhibition Amravati, exhibitor stall Vidarbha"
        structuredData={[
          organizationSchema,
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Stall availability', path: '/stalls' },
          ]),
        ]}
      />

      {/* Header band */}
      <section className="ink-band on-ink" aria-labelledby="stalls-title">
        <div className="page-wrap grid gap-10 py-14 md:grid-cols-[3fr_2fr] md:items-end md:py-20">
          <div>
            <p className="font-display text-xl text-primary">{EVENT.edition}</p>
            <h1 id="stalls-title" className="mt-2 text-4xl text-white md:text-6xl">
              Stall availability
            </h1>
            <ul className="mt-6 space-y-2 text-lg text-white/90">
              <li className="flex items-start gap-3">
                <CalendarDays className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="sr-only">Dates: </span>
                <time dateTime={EVENT.startDate}>{EVENT.dates}</time>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="sr-only">Venue: </span>
                <span>{EVENT.venue}</span>
              </li>
            </ul>
          </div>

          {/* Live summary: announced to screen readers when it changes. */}
          <div aria-live="polite" aria-busy={state.kind === 'loading'} className="text-center">
            {feed ? (
              <>
                <p className="font-display text-6xl leading-none text-primary md:text-7xl">{feed.available}</p>
                <p className="mt-3 text-lg text-white">
                  {feed.available === 0
                    ? 'All stalls are booked.'
                    : `${feed.available === 1 ? 'stall' : 'stalls'} still available`}
                </p>
              </>
            ) : state.kind === 'loading' ? (
              <p className="text-lg text-white/80">Checking the booking sheet…</p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="page-wrap py-12 md:py-16" aria-label="Stalls">
        {state.kind === 'error' ? (
          <div role="alert" className="max-w-xl rounded-2xl border-2 border-destructive/40 p-6">
            <p className="flex items-center gap-2 text-xl font-semibold">
              <TriangleAlert className="h-6 w-6 text-destructive" aria-hidden="true" />
              We couldn’t load the stall list
            </p>
            <p className="mt-2 text-muted-foreground">
              Please try again, or message us and we’ll tell you which stalls are free.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button variant="outline" onClick={() => void load()} disabled={refreshing}>
                <RefreshCw className={cn(refreshing && 'animate-spin motion-reduce:animate-none')} aria-hidden="true" />
                Try again
              </Button>
              <WhatsAppButton label="Ask on WhatsApp" />
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div role="group" aria-label="Show stalls" className="flex flex-wrap gap-2">
                {filters.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={activeFilter === option.value}
                    disabled={!feed}
                    onClick={() => setFilter(option.value)}
                    className={cn(
                      'inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border-2 px-4 font-semibold transition-colors duration-200 disabled:cursor-default disabled:opacity-50',
                      activeFilter === option.value
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border hover:border-foreground',
                    )}
                  >
                    {option.label}
                    {feed ? (
                      option.placeholder ? (
                        // A fixed stand-in, blurred: the real number is never sent to the browser.
                        <span className="select-none tabular-nums opacity-75 blur-[4px]" aria-hidden="true">
                          {option.placeholder}
                        </span>
                      ) : (
                        <span className="tabular-nums opacity-75">{option.count(feed)}</span>
                      )
                    ) : null}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                {state.kind === 'ready' ? <span>Checked at {timeFormat.format(state.checkedAt)}</span> : null}
                <Button variant="ghost" size="sm" onClick={() => void load()} disabled={refreshing}>
                  <RefreshCw className={cn(refreshing && 'animate-spin motion-reduce:animate-none')} aria-hidden="true" />
                  Refresh
                </Button>
              </div>
            </div>

            {feed ? (
              <>
                {showAvailable ? (
                  <p className="mt-6 flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    Tap an available stall to book it on WhatsApp. We’ll confirm it with you.
                  </p>
                ) : null}

                {showAvailable ? (
                  groups.length === 0 ? (
                    <p className="mt-10 text-lg">
                      Every stall is booked for this edition. Message us to join the waiting list.
                    </p>
                  ) : (
                    groups.map((group) => {
                      const headingId = `stalls-${group.prefix}`;
                      return (
                        <div key={group.prefix} className="mt-10" role="region" aria-labelledby={headingId}>
                          <h2 id={headingId} className="flex flex-wrap items-baseline gap-x-3 text-2xl">
                            {group.prefix} stalls
                            <span className="text-base font-normal text-muted-foreground">
                              {group.stalls.length} available
                            </span>
                          </h2>
                          <ul className={cn(gridClass, 'mt-4')}>
                            {group.stalls.map((stall, index) => (
                              // Index too: the sheet can list the same stall number twice by mistake.
                              <StallTile key={`${stall.stall}-${index}`} stall={stall} />
                            ))}
                          </ul>
                        </div>
                      );
                    })
                  )
                ) : null}
                {showBooked ? <HiddenBooked /> : null}
              </>
            ) : (
              <SkeletonGrid />
            )}
          </>
        )}
      </section>

      {/* Help band */}
      <section className="bg-primary text-primary-foreground">
        <div className="page-wrap flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl">Questions about a stall?</h2>
            <p className="mt-3 text-lg">Ask us about sizes, pricing and what you can sell.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="ink">
              <Link to="/contact">Contact us</Link>
            </Button>
            <WhatsAppButton />
          </div>
        </div>
      </section>
    </>
  );
};

export default Stalls;
