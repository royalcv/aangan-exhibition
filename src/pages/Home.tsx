import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Users, Award, Play, Sparkles } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Gallery from '@/components/OptimizedGallery';
import Reviews from '@/components/Reviews';
import UpcomingEvents from '@/components/UpcomingEvents';
import StatCard from '@/components/StatCard';
import heroImage from '@/assets/backGi3.webp';
import { Link } from 'react-router-dom';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Seo from '@/components/Seo';
import { organizationSchema, eventSchema, breadcrumbSchema } from '@/lib/structuredData';

const Home = () => {
  const stats = [
    { icon: Calendar, label: 'Years of Excellence', value: '2+' },
    { icon: Users, label: 'Visitors Annually', value: '100K+' },
    { icon: Award, label: 'Cultural Awards', value: '1' },
  ];

  const typeText = useTypewriter(
    "Aangan - Where Dreams Take Flight Empowering entrepreneurs with confidence, connections, and opportunities. From handcrafted creations to growing businesses, Aangan Exhibition is more than a showcase it's a launchpad for success, self-reliance, and recognition. ✨",
    200,
    5000
  );

  const heroRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useScrollReveal<HTMLDivElement>({ selector: '.reveal-item' });

  useEffect(() => {
    if (!heroRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
        delay: 0.1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Aangan Exhibition | Best Exhibition in Amravati & Vidarbha"
        description="Aangan Exhibition is Amravati's most-loved exhibition, showcasing handicrafts, fashion, jewellery, and women entrepreneurs from across Vidarbha. Visit our next edition in Amravati."
        path="/"
        keywords="best exhibition in Amravati, exhibition in Vidarbha, Amravati exhibition, best shopping platform in Amravati, women entrepreneurs Amravati, handicraft exhibition Amravati, cultural exhibition Vidarbha"
        structuredData={[
          organizationSchema,
          breadcrumbSchema([{ name: 'Home', path: '/' }]),
          eventSchema({
            name: 'Aangan The Grand Exhibition - Diwali Special (Rajapeth, Amravati)',
            startDate: '2026-10-24T10:00:00+05:30',
            endDate: '2026-10-25T22:00:00+05:30',
            location: 'The Hotel Aurtus, Rajapeth, Amravati',
            description: 'Diwali Special Exhibition featuring fashion, home decor, traditional crafts, cultural performances, and food stalls in Amravati.',
          }),
          eventSchema({
            name: 'Aangan The Grand Exhibition - Diwali Special (Camp Road, Amravati)',
            startDate: '2026-10-31T10:00:00+05:30',
            endDate: '2026-11-01T22:00:00+05:30',
            location: 'Hotel Mefhil Inn, Camp Road, Amravati',
            description: 'Diwali Special Exhibition featuring fashion, home decor, traditional crafts, heritage exhibits, live demonstrations, and a handicraft bazaar in Amravati.',
          }),
        ]}
      />
      <Navigation />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-start overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Aangan Exhibition - Cultural Heritage Celebration"
            className="w-full h-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/40" />
        </div>

        {/* Decorative glow orbs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/25 blur-[120px] animate-float" />
        <div className="pointer-events-none absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-secondary/25 blur-[140px] animate-float-reverse" />
        <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-32">
          <div className="max-w-3xl">

            {/* Eyebrow badge */}
            <div className="hero-reveal glass glow-border mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              5+ Editions &middot; 90,000+ Visitors
            </div>

            {/* Heading */}
            <h1 className="hero-reveal text-5xl md:text-7xl font-bold mb-6 leading-[1.2]">
              <span className="block text-white mb-4">
                Welcome to
              </span>

              {/* Safe wrapper prevents “g” clipping */}
              <span className="block pb-3">
                <span className="block bg-gradient-accent bg-clip-text text-transparent text-glow">
                  आंगण Exhibition
                </span>
              </span>
            </h1>

            {/* Typewriter text (fixed height to avoid movement) */}
            <div className="hero-reveal mb-8 min-h-[140px] md:min-h-[160px]">
              <p className="text-xl md:text-2xl text-white leading-relaxed font-light tracking-wide">
                <span className="border-r-2 border-secondary pr-1 animate-pulse drop-shadow-[0_0_6px_hsl(var(--secondary)/0.8)]">
                  {typeText}
                </span>
              </p>
            </div>

            {/* Buttons */}
            <div className="hero-reveal flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="hero" asChild>
                <Link to="/videos" className="text-xl font-extrabold">
                  <Play className="mr-2 h-5 w-5 fill-current" aria-hidden="true" />
                  Watch Exhibition Highlights
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="glass glow-border-cool-hover border-white/30 text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <a
                  href="https://wa.me/919270135692"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Us on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats — floating glass cards overlapping the hero edge, counting up into view */}
      <section className="relative z-10 -mt-16 md:-mt-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <StatCard key={index} icon={stat.icon} value={stat.value} label={stat.label} />
          ))}
        </div>
      </section>

      {/* About Preview */}
      <section ref={aboutRef} className="relative pt-24 pb-3 px-4 overflow-hidden">
        <div className="pointer-events-none absolute top-0 right-0 h-80 w-80 rounded-full bg-primary/10 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-secondary/10 blur-[100px]" />
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-item">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-accent bg-clip-text text-transparent">
                Empowering Women, Enriching Communities 🌸
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                For over 2+ years, Aangan Exhibition has been more than an event it’s a movement. We provide a stage where women entrepreneurs, artisans, and innovators transform their passion into recognition. From unique crafts and homegrown businesses to inspiring stories of resilience, every exhibition reflects the strength, creativity, and spirit of women who shape our society.
              </p>
              <Button variant="outline" className="glass glow-border-hover" asChild>
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="reveal-item relative">
              <div className="glass glow-border-cool relative overflow-hidden rounded-2xl p-8">
                <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />
                <div className="mb-4 h-px w-16 bg-gradient-cool" />
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  Our Mission
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  To empower women entrepreneurs by giving them the platform,
                  confidence, and market opportunities they deserve — transforming
                  their skills into identity, independence, and lasting success. 🤗
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Gallery />
      <UpcomingEvents />
      <Reviews />
      <Footer />
    </div>
  );
};

export default Home;

/* ================= Typewriter Hook ================= */
const useTypewriter = (text, speed = 120, pause = 1500) => {
  const words = text.split(' ');
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < words.length) {
      const timeout = setTimeout(() => {
        setDisplayed(prev => prev + (prev ? ' ' : '') + words[index]);
        setIndex(index + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      const resetTimeout = setTimeout(() => {
        setDisplayed('');
        setIndex(0);
      }, pause);

      return () => clearTimeout(resetTimeout);
    }
  }, [index, words, speed, pause]);

  return displayed;
};
