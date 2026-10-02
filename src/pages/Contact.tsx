import { useState } from 'react';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { submitToGoogleForm } from '@/lib/googleForm';
import { site } from '@/data/site';
import Seo from '@/components/Seo';
import { organizationSchema, breadcrumbSchema } from '@/lib/structuredData';

const emptyForm = { name: '', email: '', phone: '', subject: '', message: '' };

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitToGoogleForm(formData);
      toast({
        title: 'Message sent',
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      setFormData(emptyForm);
    } catch {
      toast({
        title: "Couldn't send your message",
        description: 'Check your connection and try again, or reach us directly on WhatsApp.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Seo
        title="Contact Us | Aangan Exhibition Amravati"
        description="Get in touch with Aangan Exhibition for stall bookings, sponsorships, and inquiries. Visit us in Amravati or reach out by phone, email, or WhatsApp."
        path="/contact"
        keywords="contact Aangan Exhibition, exhibition stall booking Amravati, sponsorship exhibition Amravati, exhibition inquiries Vidarbha"
        structuredData={[
          organizationSchema,
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ]}
      />

      <section className="ink-band on-ink">
        <div className="page-wrap py-16 md:py-24">
          <h1 className="max-w-3xl text-4xl text-primary md:text-6xl">Contact us</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85 md:text-xl">
            Questions about exhibiting, sponsoring or visiting? Write to us and we'll reply within 24 hours.
          </p>
        </div>
        <div className="dot-rule" aria-hidden="true" />
      </section>

      <div className="page-wrap grid gap-14 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <section aria-labelledby="form-heading">
          <h2 id="form-heading" className="text-3xl">
            Send us a message
          </h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" name="name" type="text" required autoComplete="name" value={formData.name} onChange={handleInputChange} className="h-12 text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" name="email" type="email" required autoComplete="email" value={formData.email} onChange={handleInputChange} className="h-12 text-base" />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone number <span className="font-normal text-muted-foreground">(optional)</span>
                </Label>
                <Input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={formData.phone} onChange={handleInputChange} className="h-12 text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" type="text" required value={formData.subject} onChange={handleInputChange} className="h-12 text-base" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" required rows={6} value={formData.message} onChange={handleInputChange} className="resize-y text-base" />
            </div>

            <Button type="submit" size="lg" disabled={isSubmitting} aria-busy={isSubmitting}>
              {isSubmitting ? 'Sending…' : (
                <>
                  Send message
                  <Send aria-hidden="true" />
                </>
              )}
            </Button>
          </form>
        </section>

        <section aria-labelledby="reach-heading">
          <h2 id="reach-heading" className="text-3xl">
            Reach us directly
          </h2>
          <ul className="mt-8 space-y-6">
            <li className="flex gap-4">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-madder" aria-hidden="true" />
              <div>
                <p className="font-semibold">Phone</p>
                {site.phones.map((phone) => (
                  <p key={phone}>
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-madder">
                      {phone}
                    </a>
                  </p>
                ))}
                <p className="text-sm text-muted-foreground">Monday to Friday, 9 AM to 9 PM</p>
              </div>
            </li>
            <li className="flex gap-4">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-madder" aria-hidden="true" />
              <div>
                <p className="font-semibold">Email</p>
                <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center break-all underline underline-offset-4 hover:text-madder">
                  {site.email}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-madder" aria-hidden="true" />
              <div>
                <p className="font-semibold">Office</p>
                <p>{site.address}</p>
                <p className="text-sm text-muted-foreground">Visit us on exhibition days</p>
              </div>
            </li>
            <li className="flex gap-4">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-madder" aria-hidden="true" />
              <div>
                <p className="font-semibold">Office hours</p>
                <p>Monday to Friday, 9:00 AM to 9:00 PM</p>
                <p>Saturday, 10:00 AM to 6:00 PM</p>
                <p className="text-sm text-muted-foreground">Closed on Sundays and public holidays</p>
              </div>
            </li>
          </ul>

          <h3 className="mt-12 text-2xl">What we can help with</h3>
          <ul className="mt-4">
            {[
              'Exhibition participation',
              'Sponsorship opportunities',
              'Group booking requests',
              'Media and press inquiries',
              'General information about events',
              'Feedback and suggestions',
            ].map((topic) => (
              <li key={topic} className="border-b border-border py-3">
                {topic}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default Contact;
