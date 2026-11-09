import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Seo from '@/components/Seo';
import WhatsAppButton from '@/components/WhatsAppButton';
import Reviews from '@/components/Reviews';
import GoogleReviewCta from '@/components/GoogleReviewCta';
import { GalleryPreview, UpcomingPreview } from '@/features/gallery';
import SankrantiHero from '@/features/sankranti/SankrantiHero';
import Rangoli from '@/design/Rangoli';
import { editions, getPastEditions, getUpcomingEditions, type Edition } from '@/data/editions';
import { site, stats } from '@/data/site';
import { useNow } from '@/lib/useNow';
import { cn } from '@/lib/utils';
import { organizationSchema, eventSchema, breadcrumbSchema } from '@/lib/structuredData';

const unique = (lists: string[][]) => Array.from(new Set(lists.flat()));
const shopItems = unique(editions.map((edition) => edition.shop));
const experienceItems = unique(editions.map((edition) => edition.experience));

/** One edition: dates on the left, venue and details on the right. */
const EditionCard = ({ edition, ended }: { edition: Edition; ended: boolean }) => (
  <article className="grid gap-6 border-t-2 border-foreground/80 py-10 last:border-b-2 md:grid-cols-[2fr_3fr] md:gap-12">
    <div>
      <p className="text-lg font-semibold text-muted-foreground">{edition.name}</p>
      <h3 className="mt-1 font-display text-5xl leading-tight text-madder md:text-6xl">{edition.shortDate}</h3>
      <p className="mt-1 text-lg text-muted-foreground">
        {new Date(edition.startDate).getFullYear()}
        {edition.hours ? `, ${edition.hours}` : ''}
      </p>
    </div>
    <div>
      <p className="text-2xl font-semibold">{edition.venue}</p>
      <p className="text-lg text-muted-foreground">{edition.area}</p>
      <p className="mt-4 max-w-prose">{edition.description}</p>
      {edition.shop.length > 0 ? (
        <p className="mt-4 max-w-prose">
          <span className="font-semibold">Shop: </span>
          {edition.shop.join(', ')}.
        </p>
      ) : null}
      {edition.experience.length > 0 ? (
        <p className="mt-2 max-w-prose">
          <span className="font-semibold">Also: </span>
          {edition.experience.join(', ')}.
        </p>
      ) : null}
      {ended ? (
        <p className="mt-4 text-muted-foreground">This edition has ended.</p>
      ) : (
        <>
          {edition.expected ? <p className="mt-4 text-muted-foreground">{edition.expected}</p> : null}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline">
              <a href={edition.directions} target="_blank" rel="noopener noreferrer">
                Get directions
                <span className="sr-only"> to {edition.venue}</span>
              </a>
            </Button>
            {edition.stallsPage ? (
              <Button asChild variant="outline">
                <Link to={edition.stallsPage}>Check stall availability</Link>
              </Button>
            ) : null}
          </div>
        </>
      )}
    </div>
  </article>
);

const Home = () => {
  const now = useNow();
  const upcoming = getUpcomingEditions(now);
  const past = getPastEditions(now);

  return (
    <>
      <Seo
        title="Aangan Exhibition | Best Exhibition in Amravati & Vidarbha"
        description="Aangan Exhibition is Amravati's most-loved exhibition, showcasing handicrafts, fashion, jewellery, and women entrepreneurs from across Vidarbha. Visit our next edition in Amravati."
        path="/"
        keywords="best exhibition in Amravati, exhibition in Vidarbha, Amravati exhibition, best shopping platform in Amravati, women entrepreneurs Amravati, handicraft exhibition Amravati, cultural exhibition Vidarbha"
        structuredData={[
          organizationSchema,
          breadcrumbSchema([{ name: 'Home', path: '/' }]),
          ...editions.map((edition) =>
            eventSchema({
              name: edition.schemaName,
              startDate: edition.startDate,
              endDate: edition.endDate,
              location: `${edition.venue}, ${edition.area}`,
              description: edition.schemaDescription,
            }),
          ),
        ]}
      />

      <SankrantiHero />

      {/* Numbers: equal, centred cells split by thin rules, so figures of very different widths
          still sit symmetrically. One column on phones, 2 × 2 on tablets, four across on wide screens.
          A faint rangoli at each edge fills the margins without competing with the figures. */}
      <section className="ink-band on-ink relative isolate overflow-hidden" aria-label="Aangan in numbers">
        <Rangoli className="pointer-events-none absolute -left-24 top-1/2 -z-10 hidden h-72 w-72 -translate-y-1/2 text-primary opacity-[0.14] md:block xl:-left-16 xl:h-80 xl:w-80" />
        <Rangoli className="pointer-events-none absolute -right-24 top-1/2 -z-10 hidden h-72 w-72 -translate-y-1/2 text-primary opacity-[0.14] md:block xl:-right-16 xl:h-80 xl:w-80" />
        <dl className="page-wrap grid grid-cols-1 py-6 text-center sm:grid-cols-2 sm:py-10 xl:grid-cols-4 xl:py-14">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                'flex flex-col-reverse items-center gap-2 border-white/15 px-4 py-6 xl:py-2',
                index > 0 && 'border-t', // phones: a rule above every figure but the first
                index === 1 && 'sm:border-t-0', // tablets: top row has no rule above
                index >= 2 && 'xl:border-t-0', // wide: one row, no rules above
                index % 2 === 1 && 'sm:border-l', // tablets: rule between the two columns
                index === 2 && 'xl:border-l', // wide: rules between all four
              )}
            >
              <dt className="text-lg text-white/80">{stat.label}</dt>
              <dd className="whitespace-nowrap font-display text-5xl leading-none text-primary md:text-6xl xl:text-[2.75rem]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* What you'll find */}
      <section className="page-wrap py-16 md:py-24" aria-labelledby="inside-heading">
        <h2 id="inside-heading" className="max-w-2xl text-3xl md:text-5xl">
          Shop, taste and watch, all under one roof
        </h2>
        <div className="mt-12 grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="text-2xl text-madder">Shop</h3>
            <ul className="mt-4">
              {shopItems.map((item) => (
                <li key={item} className="border-b border-border py-3 text-xl">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl text-madder">Experience</h3>
            <ul className="mt-4">
              {experienceItems.map((item) => (
                <li key={item} className="border-b border-border py-3 text-xl">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="ink-band on-ink">
        <div className="page-wrap grid gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24">
          <h2 className="text-3xl text-primary md:text-5xl">Empowering women, enriching communities</h2>
          <div className="space-y-5 text-lg text-white/90">
            <p>
              Aangan is more than an event; it’s a movement. We give women entrepreneurs, artisans and innovators a
              stage where passion becomes recognition: unique crafts, homegrown businesses and stories of resilience.
            </p>
            <p>
              Our mission is to give women entrepreneurs the platform, confidence and market they deserve, turning
              their skills into identity, independence and lasting success.
            </p>
            <Button asChild variant="light">
              <Link to="/about">About Aangan</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Editions: what's coming up first, then the ones that just happened. */}
      <section id="editions" className="page-wrap scroll-mt-24 pb-16 pt-10 md:pb-24 md:pt-14" aria-labelledby="editions-heading">
        <h2 id="editions-heading" className="max-w-2xl text-3xl md:text-5xl">
          {upcoming.length > 1 ? 'Our next editions' : upcoming.length === 1 ? 'Our next edition' : 'Thank you, Amravati'}
        </h2>
        {upcoming.length > 0 ? (
          <div className="mt-10">
            {upcoming.map((edition) => (
              <EditionCard key={edition.id} edition={edition} ended={false} />
            ))}
          </div>
        ) : null}
        {past.length > 0 ? (
          <>
            {upcoming.length > 0 ? <h3 className="mt-16 text-2xl md:text-3xl">Recent editions</h3> : null}
            <div className="mt-10">
              {past.map((edition) => (
                <EditionCard key={edition.id} edition={edition} ended />
              ))}
            </div>
          </>
        ) : null}
      </section>

      <UpcomingPreview />
      <GalleryPreview />
      <Reviews />
      <GoogleReviewCta />

      {/* Stall CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="page-wrap flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl">Want a stall at the next Aangan?</h2>
            <p className="mt-3 text-lg">See which stalls are still free, then message us to book one.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="ink">
              <Link to="/stalls">Check stall availability</Link>
            </Button>
            <WhatsAppButton />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
