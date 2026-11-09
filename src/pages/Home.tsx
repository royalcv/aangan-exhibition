import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Seo from '@/components/Seo';
import WhatsAppButton from '@/components/WhatsAppButton';
import Reviews from '@/components/Reviews';
import GoogleReviewCta from '@/components/GoogleReviewCta';
import { GalleryPreview, UpcomingPreview } from '@/features/gallery';
import SankrantiHero from '@/features/sankranti/SankrantiHero';
import { editions, getNextEdition, hasEnded } from '@/data/editions';
import { site, stats } from '@/data/site';
import { useNow } from '@/lib/useNow';
import { organizationSchema, eventSchema, breadcrumbSchema } from '@/lib/structuredData';

const unique = (lists: string[][]) => Array.from(new Set(lists.flat()));
const shopItems = unique(editions.map((edition) => edition.shop));
const experienceItems = unique(editions.map((edition) => edition.experience));

const Home = () => {
  const now = useNow();
  const next = getNextEdition(now);

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

      {/* Numbers */}
      <section className="ink-band on-ink" aria-label="Aangan in numbers">
        <dl className="page-wrap grid grid-cols-1 gap-8 py-12 text-center sm:grid-cols-3 sm:text-left">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="text-white/80">{stat.label}</dt>
              <dd className="font-display text-5xl text-primary md:text-6xl">{stat.value}</dd>
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

      {/* Editions */}
      <section id="editions" className="page-wrap scroll-mt-24 pb-16 pt-10 md:pb-24 md:pt-14" aria-labelledby="editions-heading">
        <h2 id="editions-heading" className="max-w-2xl text-3xl md:text-5xl">
          {next ? 'The 2026 Diwali editions' : 'Diwali 2026: thank you, Amravati'}
        </h2>
        <div className="mt-10">
          {editions.map((edition) => (
            <article
              key={edition.id}
              className="grid gap-6 border-t-2 border-foreground/80 py-10 last:border-b-2 md:grid-cols-[2fr_3fr] md:gap-12"
            >
              <div>
                <h3 className="font-display text-5xl leading-tight text-madder md:text-6xl">{edition.shortDate}</h3>
                <p className="mt-1 text-lg text-muted-foreground">2026, {edition.hours}</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">{edition.venue}</p>
                <p className="text-lg text-muted-foreground">{edition.area}</p>
                <p className="mt-4 max-w-prose">{edition.description}</p>
                <p className="mt-4 max-w-prose">
                  <span className="font-semibold">Shop: </span>
                  {edition.shop.join(', ')}.
                </p>
                <p className="mt-2 max-w-prose">
                  <span className="font-semibold">Also: </span>
                  {edition.experience.join(', ')}.
                </p>
                {hasEnded(edition, now) ? (
                  <p className="mt-4 text-muted-foreground">This edition has ended.</p>
                ) : (
                  <>
                    <p className="mt-4 text-muted-foreground">{edition.expected}</p>
                    <Button asChild variant="outline" className="mt-6">
                      <a href={edition.directions} target="_blank" rel="noopener noreferrer">
                        Get directions
                        <span className="sr-only"> to {edition.venue}</span>
                      </a>
                    </Button>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
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
            <p className="mt-3 text-lg">Tell us what you make and message us about taking part as an exhibitor.</p>
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

export default Home;
