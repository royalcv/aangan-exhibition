import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Users, Award, Play } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Gallery from '@/components/OptimizedGallery';
import Reviews from '@/components/Reviews';
import UpcomingEvents from '@/components/UpcomingEvents';
import heroImage from '@/assets/backGi3.jpg';
import { Link } from 'react-router-dom';

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-start">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Aangan Exhibition - Cultural Heritage Celebration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40">
          <div className="max-w-3xl">

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.2]">
              <span className="block text-white mb-4">
                Welcome to
              </span>

              {/* Safe wrapper prevents “g” clipping */}
              <span className="block pb-3">
                <span className="block bg-gradient-accent bg-clip-text text-transparent">
                  आंगण Exhibition
                </span>
              </span>
            </h1>

            {/* Typewriter text (fixed height to avoid movement) */}
            <div className="mb-8 min-h-[140px] md:min-h-[160px]">
              <p className="text-xl md:text-2xl text-white leading-relaxed font-light tracking-wide">
                <span className="border-r-2 border-white pr-1 animate-pulse drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]">
                  {typeText}
                </span>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-accent hover:opacity-90 text-black font-semibold" asChild>
                <Link to="/videos" className="text-xl font-extrabold">
                  <Play className="mr-2 h-5 w-5 fill-current" aria-hidden="true" />
                  Watch Exhibition Highlights
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black"
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

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-accent rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-black" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="pt-16 pb-3 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-accent bg-clip-text text-transparent">
                Empowering Women, Enriching Communities 🌸
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                For over 2+ years, Aangan Exhibition has been more than an event it’s a movement. We provide a stage where women entrepreneurs, artisans, and innovators transform their passion into recognition. From unique crafts and homegrown businesses to inspiring stories of resilience, every exhibition reflects the strength, creativity, and spirit of women who shape our society.
              </p>
              <Button variant="outline" asChild>
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="bg-gradient-card rounded-lg p-8 border border-border shadow-warm">
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
