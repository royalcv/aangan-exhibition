import { Users, Target, History, Award } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Seo from '@/components/Seo';
import { organizationSchema, breadcrumbSchema } from '@/lib/structuredData';

const About = () => {
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
    { name: 'Aashis D. Ghate', role: 'Team Member', specialization: 'Event Management' },
    { name: 'Dnyaneshwar Ghate', role: 'Team Member', specialization: 'Event Management' },
    { name: 'Nirmala Ghate', role: 'Team Member', specialization: 'Event Management' },
    { name: 'Shubhangi Vidhale', role: 'Team Member', specialization: 'Event Management' },
    { name: 'Dipak Vidhale', role: 'Team Member', specialization: 'Event Management' },
    { name: 'Niyush Umak', role: 'Team Member', specialization: 'Event Management' },
  ];

  const achievements = [
    { year: '2024', milestone: 'Aangan Exhibition was born.' },
    { year: '5+', milestone: 'Successful Editions – Connecting thousands of visitors with local businesses.' },
    { year: '90,000+', milestone: 'Visitors – Families, shoppers, and culture enthusiasts.' },
    { year: '500+', milestone: 'Brands & Exhibitors' },
    { year: '2026', milestone: 'Celebrated 90,000+ annual visitors' },
  ];

  const missionRef = useScrollReveal<HTMLDivElement>({ selector: '.reveal-item' });
  const timelineRef = useScrollReveal<HTMLDivElement>({ selector: '.reveal-item', stagger: 0.12 });
  const organizersRef = useScrollReveal<HTMLDivElement>({ selector: '.reveal-item', stagger: 0.1 });
  const membersRef = useScrollReveal<HTMLDivElement>({ selector: '.reveal-item', stagger: 0.06 });

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="About Us | Aangan Exhibition - Amravati's Premier Cultural Exhibition"
        description="Aangan Exhibition empowers women entrepreneurs and celebrates Amravati & Vidarbha's culture. Meet the team behind the best exhibition in Amravati, with 5+ editions and 90,000+ visitors."
        path="/about"
        keywords="Aangan Exhibition Amravati, best exhibition in Amravati, exhibition organizers Amravati, women entrepreneurs Vidarbha, cultural exhibition history Amravati"
        structuredData={[organizationSchema, breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])]}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-4 bg-gradient-hero">
        <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-primary/20 blur-[100px] animate-float" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-secondary/20 blur-[100px] animate-float-reverse" />
        <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            About Aangan Exhibition
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            A platform that empowers women entrepreneurs, celebrates creativity, and connects culture with opportunity.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div ref={missionRef} className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="reveal-item glass glow-border-hover rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <Target className="h-6 w-6 text-primary" />
                  <span>Our Mission</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To preserve, promote, and celebrate Amravati's rich cultural heritage through world-class exhibitions that educate, inspire, and connect communities across generations. We strive to create platforms where traditional artisans can showcase their skills and visitors can immerse themselves in authentic cultural experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="reveal-item glass glow-border-cool-hover rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <Award className="h-6 w-6 text-secondary" />
                  <span>Our Vision</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To become the premier cultural exhibition platform in Amravati, fostering appreciation for traditional arts and crafts while supporting artisan communities. We envision a future where cultural heritage thrives through innovative exhibition experiences that bridge the gap between tradition and modernity.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[140px]" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
              Our Journey
            </h2>
            <p className="text-lg text-muted-foreground">
              Milestones in our cultural preservation journey
            </p>
          </div>

          <div ref={timelineRef} className="relative">
            {achievements.map((achievement, index) => (
              <div key={index} className="reveal-item flex items-center mb-8 last:mb-0">
                <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-accent rounded-full text-black font-bold flex-shrink-0">
                  <div className="absolute inset-0 rounded-full bg-primary/40 blur-xl animate-glow-pulse" />
                  <span className="relative">{achievement.year}</span>
                </div>
                <div className="ml-6 flex-grow">
                  <Card className="glass glow-border-hover rounded-2xl">
                    <CardContent className="p-4">
                      <p className="text-foreground font-medium">{achievement.milestone}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizers */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
              Exhibition Organizers
            </h2>
            <p className="text-lg text-muted-foreground">
              Meet the passionate team behind Aangan Exhibition
            </p>
          </div>

          <div ref={organizersRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {organizers.map((organizer, index) => (
              <Card key={index} className="reveal-item glass glow-border-hover rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-foreground">{organizer.name}</CardTitle>
                  <p className="text-primary font-semibold">{organizer.position}</p>
                  <p className="text-sm text-muted-foreground">{organizer.experience}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {organizer.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-cool bg-clip-text text-transparent">
              Team Members
            </h2>
            <p className="text-lg text-muted-foreground">
              Our dedicated team of cultural enthusiasts and professionals
            </p>
          </div>

          <div ref={membersRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member, index) => (
              <Card key={index} className="reveal-item glass glow-border-cool-hover rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-secondary text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.specialization}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
