import { Helmet } from 'react-helmet-async';
import { SITE_URL } from '@/lib/seoConfig';

const DEFAULT_IMAGE = `${SITE_URL}/preview.jpg`;

interface SeoProps {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  image?: string;
  /** Set true for pages that should never appear in search results (404s, thank-you pages, etc.). */
  noindex?: boolean;
  /** One or more JSON-LD structured data objects to embed as <script type="application/ld+json"> tags. */
  structuredData?: object | object[];
}

const Seo = ({ title, description, path, keywords, image = DEFAULT_IMAGE, noindex, structuredData }: SeoProps) => {
  const url = `${SITE_URL}${path}`;
  const schemas = structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
