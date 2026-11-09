import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send, TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import WhatsAppButton from '@/components/WhatsAppButton';
import { contactSchema, type ContactFormData } from '@/lib/contactSchema';
import { site } from '@/data/site';
import Seo from '@/components/Seo';
import GoogleReviewCta from '@/components/GoogleReviewCta';
import { organizationSchema, breadcrumbSchema } from '@/lib/structuredData';

const emptyForm: ContactFormData = { name: '', email: '', phone: '', subject: '', message: '', company: '' };

type Status = 'idle' | 'sent' | 'failed';

type FieldProps = {
  id: keyof ContactFormData;
  label: ReactNode;
  error?: string;
  children: (describedBy: string | undefined) => ReactNode;
};

/** Label, control and an error line wired together with aria-describedby. */
const Field = ({ id, label, error, children }: FieldProps) => {
  const errorId = `${id}-error`;
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children(error ? errorId : undefined)}
      {error ? (
        <p id={errorId} className="text-sm font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
};

const inputClass = (invalid: boolean) => (invalid ? 'h-12 border-destructive text-base' : 'h-12 text-base');

const Contact = () => {
  const [status, setStatus] = useState<Status>('idle');
  const statusRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: emptyForm,
    mode: 'onTouched',
  });

  // Move focus to the result so keyboard and screen-reader users hear it straight away.
  useEffect(() => {
    if (status !== 'idle') statusRef.current?.focus();
  }, [status]);

  const onSubmit = async (data: ContactFormData) => {
    setStatus('idle');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`Contact endpoint responded ${response.status}`);
      reset(emptyForm);
      setStatus('sent');
    } catch {
      setStatus('failed');
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
          <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
            {status === 'sent' ? (
              <div className="mt-8 flex gap-3 rounded-md border border-border bg-muted p-5">
                <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-madder" aria-hidden="true" />
                <div>
                  <p className="font-semibold">Message sent</p>
                  <p className="text-muted-foreground">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                </div>
              </div>
            ) : null}
            {status === 'failed' ? (
              <div className="mt-8 flex gap-3 rounded-md border border-destructive p-5">
                <TriangleAlert className="mt-0.5 h-6 w-6 shrink-0 text-destructive" aria-hidden="true" />
                <div>
                  <p className="font-semibold">Your message didn't go through</p>
                  <p className="text-muted-foreground">
                    Nothing you typed has been lost. Try again in a moment, or reach us directly on WhatsApp.
                  </p>
                  <WhatsAppButton size="sm" className="mt-4" />
                </div>
              </div>
            ) : null}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative mt-8 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="name" label="Full name" error={errors.name?.message}>
                {(describedBy) => (
                  <Input id="name" type="text" autoComplete="name" maxLength={100} aria-invalid={!!errors.name} aria-describedby={describedBy} className={inputClass(!!errors.name)} {...register('name')} />
                )}
              </Field>
              <Field id="email" label="Email address" error={errors.email?.message}>
                {(describedBy) => (
                  <Input id="email" type="email" autoComplete="email" maxLength={254} aria-invalid={!!errors.email} aria-describedby={describedBy} className={inputClass(!!errors.email)} {...register('email')} />
                )}
              </Field>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                id="phone"
                label={
                  <>
                    Phone number <span className="font-normal text-muted-foreground">(optional)</span>
                  </>
                }
                error={errors.phone?.message}
              >
                {(describedBy) => (
                  <Input id="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={20} aria-invalid={!!errors.phone} aria-describedby={describedBy} className={inputClass(!!errors.phone)} {...register('phone')} />
                )}
              </Field>
              <Field id="subject" label="Subject" error={errors.subject?.message}>
                {(describedBy) => (
                  <Input id="subject" type="text" maxLength={150} aria-invalid={!!errors.subject} aria-describedby={describedBy} className={inputClass(!!errors.subject)} {...register('subject')} />
                )}
              </Field>
            </div>

            <Field id="message" label="Message" error={errors.message?.message}>
              {(describedBy) => (
                <Textarea
                  id="message"
                  rows={6}
                  maxLength={3000}
                  aria-invalid={!!errors.message}
                  aria-describedby={describedBy}
                  className={errors.message ? 'resize-y border-destructive text-base' : 'resize-y text-base'}
                  {...register('message')}
                />
              )}
            </Field>

            {/* Honeypot: off-screen and hidden from keyboard and screen readers, so only bots fill it in. */}
            <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
              <label htmlFor="company">Company</label>
              <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register('company')} />
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

      <GoogleReviewCta />
    </>
  );
};

export default Contact;
