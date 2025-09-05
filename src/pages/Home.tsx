import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Users, Award } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Aangan Exhibition - Cultural Heritage Celebration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="block text-white mb-4">Welcome to</span>
              <span className="block bg-gradient-accent bg-clip-text text-transparent pt-2">
                आंगण Exhibition
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Aangan - Where Dreams Take Flight
                Empowering entrepreneurs with confidence, connections, and opportunities.
                From handcrafted creations to growing businesses, Aangan Exhibition is more than a showcase it's a launchpad for success, self-reliance, and recognition.✨
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-accent hover:opacity-90 text-black font-semibold">
                Explore Exhibitions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black"
                asChild
              >
                <Link to="/contact">Contact Us</Link>
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
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
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
                For over 2+ years, Aangan Exhibition has been more than an event—it’s a movement. We provide a stage where women entrepreneurs, artisans, and innovators transform their passion into recognition. From unique crafts and homegrown businesses to inspiring stories of resilience, every exhibition reflects the strength, creativity, and spirit of women who shape our society.
                At Aangan, we don’t just showcase products we celebrate journeys, create opportunities, and build a community where women thrive and traditions flourish.
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
                <h3 className="text-xl font-semibold mb-4 text-foreground">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To empower women entrepreneurs by giving them the platform, confidence, and market opportunities they deserve transforming their skills into identity, independence, and lasting success.🤗
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