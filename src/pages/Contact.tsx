import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Number',
      details: ['+91 9270135692', '+91 8624090385'],
      description: 'Available Monday to Friday, 9 AM - 9 PM',
    },
    {
      icon: Mail,
      title: 'Email Address',
      details: ['aanganexhibition@gmail.com'],
      description: 'We respond within 24 hours',
    },
    {
      icon: MapPin,
      title: 'Physical Address',
      details: ['Lig 64,8/2, Near SSC Board office, Tope nagar, Amravati-444602'],
      description: 'Visit us during exhibition days',
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Friday: 9:00 AM - 9:00 PM', 'Saturday: 10:00 AM - 6:00 PM'],
      description: 'Closed on Sundays and public holidays',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-24 px-4 bg-gradient-hero">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Contact Us
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Get in touch with us for inquiries, partnerships, or to learn more about our upcoming exhibitions.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-lg text-muted-foreground">
              We'd love to hear from you. Here's how you can reach us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="bg-gradient-card border-border shadow-warm hover:shadow-glow transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-accent rounded-full mb-4 mx-auto">
                    <info.icon className="h-6 w-6 text-black" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {info.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm font-medium text-foreground mb-1">
                      {detail}
                    </p>
                  ))}
                  <p className="text-xs text-muted-foreground mt-2">
                    {info.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 bg-gradient-accent bg-clip-text text-transparent">
                Send us a Message
              </h3>
              <Card className="bg-gradient-card border-border shadow-warm">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="mt-1 bg-input border-border"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-1 bg-input border-border"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="mt-1 bg-input border-border"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject" className="text-foreground">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="mt-1 bg-input border-border"
                          placeholder="Enter message subject"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-foreground">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="mt-1 bg-input border-border resize-none"
                        placeholder="Enter your message here..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-gradient-accent hover:opacity-90 text-black font-semibold"
                    >
                      {isSubmitting ? (
                        'Sending Message...'
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 bg-gradient-accent bg-clip-text text-transparent">
                Visit Our Location
              </h3>
              <Card className="bg-gradient-card border-border shadow-warm mb-6">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-4">Exhibition Grounds</h4>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Our main exhibition venue is located in the heart of Amravati's Cultural District. The venue features state-of-the-art facilities and can accommodate large-scale cultural exhibitions with ease.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium text-foreground">Address:</p>
                    <p className="text-muted-foreground">Lig 64,8/2, Near SSC Board office </p>
                    <p className="text-muted-foreground">Tope nagar Amravati-444602</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border shadow-warm">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-4">Why Contact Us?</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Exhibition participation inquiries</li>
                    <li>• Sponsorship opportunities</li>
                    <li>• Group booking requests</li>
                    <li>• Media and press inquiries</li>
                    <li>• General information about events</li>
                    <li>• Feedback and suggestions</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;