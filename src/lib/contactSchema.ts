import { z } from 'zod';

/**
 * The contact form's rules, shared by the browser (inline errors) and the Netlify Function
 * (the real check, since anyone can post to the endpoint directly).
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100, 'Keep your name under 100 characters.'),
  email: z.string().trim().email('Please enter a valid email address.').max(254, 'That email address is too long.'),
  phone: z
    .string()
    .trim()
    .max(20, 'That phone number is too long.')
    .refine((value) => value === '' || /^(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/.test(value), {
      message: 'Enter a 10-digit Indian mobile number, or leave this blank.',
    }),
  subject: z.string().trim().min(3, 'Please add a short subject.').max(150, 'Keep the subject under 150 characters.'),
  message: z
    .string()
    .trim()
    .min(10, 'Please write a little more so we can help.')
    .max(3000, 'Keep your message under 3000 characters.'),
  /** Honeypot: hidden from people, so only bots fill it in. The server drops those submissions silently. */
  company: z.string().max(200).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
