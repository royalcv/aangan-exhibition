import { SITE_URL } from '@/lib/seoConfig';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Aangan Exhibition',
  alternateName: 'आंगण Exhibition',
  url: SITE_URL,
  logo: `${SITE_URL}/aangan-logo.png`,
  description:
    'Aangan Exhibition is one of the best exhibitions in Amravati and the Vidarbha region, celebrating Indian culture, handicrafts, fashion, and women entrepreneurs.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Lig 64, 8/2, Near SSC Board Office, Tope Nagar',
    addressLocality: 'Amravati',
    addressRegion: 'Maharashtra',
    postalCode: '444602',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-9270135692',
    contactType: 'customer service',
    email: 'aanganexhibition@gmail.com',
    areaServed: 'IN',
  },
  sameAs: [
    'https://www.facebook.com/share/1CN89HaZ7V/?mibextid=wwXIfr',
    'https://www.instagram.com/aangan_exhibition?igsh=YnQzN2w4cTE4MHZu&utm_source=qr',
  ],
};

interface EventInput {
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

export function eventSchema(event: EventInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    startDate: event.startDate,
    endDate: event.endDate,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Amravati',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
      },
    },
    description: event.description,
    organizer: {
      '@type': 'Organization',
      name: 'Aangan Exhibition',
      url: SITE_URL,
    },
    image: `${SITE_URL}/preview.jpg`,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
