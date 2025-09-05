import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const UpcomingEvents = () => {
  const events = [
    {
      title: 'Aangan The Grand Exhibition (Completed)',
      date: 'August 1-3, 2025',
      time: '10:00 AM - 10:00 PM',
      location: 'Abhiyanta Bhawan, Shegao naka, Amravati',
      attendees: '30000+ expected in 3 days',
      description: 'A magnificent celebration of traditional arts, crafts, and cultural heritage featuring artisans from across India.',
      highlights: ['Fashion','Home Made','Home Decor','Traditional Crafts', 'Cultural Performances', 'Food Festival', 'Art'],
    },
    {
      title: 'Aangan The Grand Exhibition (Upcoming)',
      date: 'October 10-11, 2025',
      time: '10:00 AM - 10:00 PM',
      location: 'Hote Mehfil Inn, Camp Road, Amravati',
      attendees: '50000+ expected in 2 days',
      description: 'Diwali Special Exhibition.',
      highlights: ['Fashion','Home Made','Home Decor','Traditional Crafts', 'Cultural Performances', 'Food Festival', 'Art','Heritage Exhibits', 'Live Demonstrations', 'Traditional Music', 'Handicraft Bazaar'],
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
            Upcoming Exhibitions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mark your calendars for these spectacular upcoming exhibitions celebrating our rich cultural heritage
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <Card key={index} className="bg-gradient-card border-border shadow-warm hover:shadow-glow transition-all duration-300 overflow-hidden">
              <CardHeader className="bg-gradient-hero text-primary-foreground">
                <CardTitle className="text-xl font-bold">{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {event.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{event.attendees}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Event Highlights:</h4>
                  <div className="flex flex-wrap gap-2">
                    {event.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="default" className="w-full">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;