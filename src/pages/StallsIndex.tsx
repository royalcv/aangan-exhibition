import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import Seo from '@/components/Seo';
import WhatsAppButton from '@/components/WhatsAppButton';
import { fullVenue, getUpcomingEditions, type Edition } from '@/data/editions';
import { breadcrumbSchema, organizationSchema } from '@/lib/structuredData';
import { useNow } from '@/lib/useNow';
import { cn } from '@/lib/utils';

const cardClass = 'flex h-full flex-col rounded-2xl border-2 p-6 md:p-8';

/** What's on one card: city, edition, dates, venue. */
const CardBody = ({ edition }: { edition: Edition }) => (
  <>
    <p className="font-display text-4xl leading-tight text-madder md:text-5xl">{edition.city}</p>
    <p className="mt-1 text-lg font-semibold">{edition.name}</p>
    <ul className="mt-5 space-y-2 text-muted-foreground">
      <li className="flex items-start gap-3">
        <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <span className="sr-only">Dates: </span>
        <time dateTime={edition.startDate}>{edition.dateLabel}</time>
      </li>
      <li className="flex items-start gap-3">
        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <span className="sr-only">Venue: </span>
        <span>{fullVenue(edition)}</span>
      </li>
    </ul>
  </>
);

/** One exhibition: the whole card links to its stall page, or says "Coming soon" until it's live. */
const EventCard = ({ edition }: { edition: Edition }) =>
  edition.stallAvailabilityEnabled && edition.stallsPage ? (
    <li>
      <Link
        to={edition.stallsPage}
        className={cn(
          cardClass,
          'group border-foreground/80 transition-colors duration-200 hover:border-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        )}
      >
        <CardBody edition={edition} />
        <span className={cn(buttonVariants({ variant: 'default' }), 'mt-8 self-start')}>
          See available stalls
          <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </Link>
    </li>
  ) : (
    <li className={cn(cardClass, 'border-dashed border-border')}>
      <CardBody edition={edition} />
      <span className="mt-8 self-start font-semibold text-muted-foreground">Stall availability: Coming soon</span>
    </li>
  );

/** /stalls: pick an exhibition, then see its stalls on /stalls/akola or /stalls/amravati. */
const StallsIndex = () => {
  const now = useNow();
  const upcoming = getUpcomingEditions(now).filter((edition) => edition.stallsPage);

  return (
    <>
      <Seo
        title="Stall Availability | Aangan Exhibition, Akola & Amravati"
        description="Book an exhibitor stall at Aangan Exhibition’s Makar Sankranti Special in Akola (2–3 Jan 2027) or Amravati (9–10 Jan 2027). See which stalls are free."
        path="/stalls"
        keywords="Aangan stall booking, exhibition stall Akola, exhibition stall Amravati, Makar Sankranti exhibition, exhibitor stall Vidarbha"
        structuredData={[
          organizationSchema,
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Stall availability', path: '/stalls' },
          ]),
        ]}
      />

      <section className="ink-band on-ink">
        <div className="page-wrap py-16 md:py-24">
          <h1 className="max-w-3xl text-4xl text-primary md:text-6xl">Stall availability</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85 md:text-xl">
            Choose an exhibition to see which stalls are still free, then book yours on WhatsApp.
          </p>
        </div>
        <div className="dot-rule" aria-hidden="true" />
      </section>

      <section className="page-wrap py-12 md:py-16" aria-labelledby="choose-heading">
        <h2 id="choose-heading" className="text-3xl md:text-4xl">
          Which exhibition?
        </h2>
        {upcoming.length > 0 ? (
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {upcoming.map((edition) => (
              <EventCard key={edition.id} edition={edition} />
            ))}
          </ul>
        ) : (
          <p className="mt-6 max-w-xl text-lg">
            There’s no upcoming exhibition with stalls open right now. Message us to hear first about the next one.
          </p>
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

export default StallsIndex;
