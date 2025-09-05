import { Users, Target, History, Award } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    { year: '2024', milestone: 'Founded Aangan Exhibition' },
    { year: 'JAN-2025', milestone: 'Successfully Conduct First Exhibition' },
    { year: 'AUG-2025', milestone: 'Successfully Conduct Second Exhibition' },
    { year: 'OCT-2025', milestone: 'Successfully Conduct Third Exhibition' },
    { year: '2025', milestone: 'Celebrated 90,000+ annual visitors' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-24 px-4 bg-gradient-hero">
        <div className="max-w-7xl mx-auto text-center">
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
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-card border-border shadow-warm">
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

            <Card className="bg-gradient-card border-border shadow-warm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <Award className="h-6 w-6 text-primary" />
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
      <section className="py-16 px-4 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
              Our Journey
            </h2>
            <p className="text-lg text-muted-foreground">
              Milestones in our cultural preservation journey
            </p>
          </div>

          <div className="relative">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center mb-8 last:mb-0">
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-accent rounded-full text-black font-bold flex-shrink-0">
                  {achievement.year}
                </div>
                <div className="ml-6 flex-grow">
                  <Card className="bg-gradient-card border-border shadow-warm">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {organizers.map((organizer, index) => (
              <Card key={index} className="bg-gradient-card border-border shadow-warm hover:shadow-glow transition-all duration-300">
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
      <section className="py-16 px-4 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
              Team Members
            </h2>
            <p className="text-lg text-muted-foreground">
              Our dedicated team of cultural enthusiasts and professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member, index) => (
              <Card key={index} className="bg-gradient-card border-border shadow-warm hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
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
