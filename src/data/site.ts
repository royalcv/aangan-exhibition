/** Single source of truth for contact details and links used across pages, footer and SEO. */
export const site = {
  name: 'Aangan Exhibition',
  registration: 'Reg. No. 513/2025',
  phones: ['+91 9270135692', '+91 8624090385'],
  email: 'aanganexhibition@gmail.com',
  address: 'Lig 64, 8/2, Near SSC Board Office, Tope Nagar, Amravati 444602',
  whatsapp: 'https://wa.me/919270135692',
  facebook: 'https://www.facebook.com/share/1CN89HaZ7V/?mibextid=wwXIfr',
  instagram: 'https://www.instagram.com/aangan_exhibition?igsh=YnQzN2w4cTE4MHZu&utm_source=qr',
} as const;

export const stats = [
  { value: '5+', label: 'editions' },
  { value: '90,000+', label: 'visitors' },
  { value: '500+', label: 'brands and exhibitors' },
] as const;

export const mapsLink = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
