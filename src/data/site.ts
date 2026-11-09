/** Single source of truth for contact details and links used across pages, footer and SEO. */
export const site = {
  name: 'Aangan Exhibition',
  registration: 'Reg. No. 513/2025',
  phones: ['+91 9270135692', '+91 8624090385'],
  email: 'aanganexhibition@gmail.com',
  address: 'Lig 64, 8/2, Near SSC Board Office, Tope Nagar, Amravati 444602',
  whatsapp: 'https://wa.me/919270135692',
  googleReview: 'https://g.page/r/CdZGBoAuITU7EAE/review',
  facebook: 'https://www.facebook.com/share/1CN89HaZ7V/?mibextid=wwXIfr',
  instagram: 'https://www.instagram.com/aangan_exhibition?igsh=YnQzN2w4cTE4MHZu&utm_source=qr',
} as const;

/** Aangan in numbers, shown in the band under the home hero. Update the figures here. */
export const stats = [
  { value: 'Since 2024', label: 'in Amravati' },
  { value: '8+', label: 'editions' },
  { value: '1,50,000+', label: 'visitors' },
  { value: '800+', label: 'brands and exhibitors' },
] as const;

export const mapsLink = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
