import Seo from '@/components/Seo';
import { organizationSchema, breadcrumbSchema } from '@/lib/structuredData';

const organizers = [
  {
    name: 'Engg. Chaitanya D. Vidhale',
    position: 'Founder & Director',
    experience: '1+ years in cultural preservation',
    description: 'Welcome to Aangan Exhibition, a celebration of art, culture and togetherness.',
  },
  {
    name: 'Prof. Nikita D. Ghate',
    position: 'Founder & Managing Director',
    experience: '4+ years in heritage management',
    description: 'Welcome to Aangan Exhibition, where tradition meets creativity.',
  },
  {
    name: 'Prof. Yogesh P. Umak',
    position: 'Operations Manager',
    experience: '4+ years in event management',
    description: 'Step into Aangan Exhibition, a showcase of elegance and culture.',
  },
];

const members = [
  'Aashis D. Ghate',
  'Dnyaneshwar Ghate',
  'Nirmala Ghate',
  'Shubhangi Vidhale',
  'Dipak Vidhale',
  'Niyush Umak',
];

// A real sequence, so this is the one place on the site where ordered markers belong.
const journey = [
  { year: '2024', milestone: 'Aangan Exhibition was born.' },
  { year: '5+', milestone: 'Successful editions, connecting thousands of visitors with local businesses.' },
  { year: '500+', milestone: 'Brands and exhibitors.' },
  { year: '2026', milestone: 'Celebrated 90,000+ annual visitors.' },
];

const About = () => (
  <>
    <Seo
      title="About Us | Aangan Exhibition - Amravati's Premier Cultural Exhibition"
      description="Aangan Exhibition empowers women entrepreneurs and celebrates Amravati & Vidarbha's culture. Meet the team behind the best exhibition in Amravati, with 5+ editions and 90,000+ visitors."
      path="/about"
      keywords="Aangan Exhibition Amravati, best exhibition in Amravati, exhibition organizers Amravati, women entrepreneurs Vidarbha, cultural exhibition history Amravati"
      structuredData={[
        organizationSchema,
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]),
      ]}
    />

    <section className="ink-band on-ink">
      <div className="page-wrap py-16 md:py-24">
        <h1 className="max-w-3xl text-4xl text-primary md:text-6xl">About Aangan Exhibition</h1>
        <p className="mt-5 max-w-2xl text-lg text-white/85 md:text-xl">
          A platform that empowers women entrepreneurs, celebrates creativity, and connects culture with opportunity.
        </p>
      </div>
      <div className="dot-rule" aria-hidden="true" />
    </section>

    <section className="page-wrap grid gap-12 py-16 md:grid-cols-2 md:gap-16 md:py-24" aria-label="Mission and vision">
      <div>
        <h2 className="text-3xl text-madder">Our mission</h2>
        <p className="mt-4 text-lg">
          To preserve, promote, and celebrate Amravati's rich cultural heritage through exhibitions that educate,
          inspire, and connect communities across generations. We create platforms where traditional artisans can
          showcase their skills and visitors can experience authentic culture.
        </p>
      </div>
      <div>
        <h2 className="text-3xl text-madder">Our vision</h2>
        <p className="mt-4 text-lg">
          To become the premier cultural exhibition platform in Amravati, fostering appreciation for traditional arts
          and crafts while supporting artisan communities. We envision a future where cultural heritage thrives through
          exhibition experiences that bridge tradition and modernity.
        </p>
      </div>
    </section>

    <section className="bg-muted" aria-labelledby="journey-heading">
      <div className="page-wrap py-16 md:py-24">
        <h2 id="journey-heading" className="text-3xl md:text-5xl">
          Our journey
        </h2>
        <ol className="relative mt-12 max-w-3xl border-l-2 border-foreground/80 pl-8 md:pl-12">
          {journey.map((step) => (
            <li key={step.year} className="relative pb-10 last:pb-0">
              <span
                className="absolute -left-[41px] top-2 h-4 w-4 rounded-full border-2 border-foreground/80 bg-primary md:-left-[57px]"
                aria-hidden="true"
              />
              <p className="font-display text-4xl text-madder">{step.year}</p>
              <p className="mt-1 text-lg">{step.milestone}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="page-wrap py-16 md:py-24" aria-labelledby="organizers-heading">
      <h2 id="organizers-heading" className="text-3xl md:text-5xl">
        The people behind Aangan
      </h2>
      <ul className="mt-10 grid gap-10 md:grid-cols-3">
        {organizers.map((person) => (
          <li key={person.name} className="border-t-2 border-foreground/80 pt-5">
            <h3 className="text-2xl">{person.name}</h3>
            <p className="mt-1 font-semibold text-madder">{person.position}</p>
            <p className="text-sm text-muted-foreground">{person.experience}</p>
            <p className="mt-4">{person.description}</p>
          </li>
        ))}
      </ul>

      <h3 className="mt-16 text-2xl">Team members</h3>
      <ul className="mt-4 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <li key={member} className="border-b border-border py-3 text-lg">
            {member}
          </li>
        ))}
      </ul>
    </section>
  </>
);

export default About;
