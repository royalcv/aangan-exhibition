import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Seo from '@/components/Seo';
import { organizationSchema, breadcrumbSchema } from '@/lib/structuredData';
import VideoCard from './VideoCard';
import { pastVideos } from './videos';

const PAGE_SIZE = 12;

const GalleryPage = () => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visible = pastVideos.slice(0, visibleCount);
  const remaining = pastVideos.length - visibleCount;

  return (
    <>
      <Seo
        title="Exhibition Highlights & Video Gallery | Aangan Exhibition Amravati"
        description="Watch highlights from Aangan Exhibition, Amravati's best exhibition for shopping, fashion, handicrafts, and cultural celebrations across Vidarbha."
        path="/videos"
        keywords="Aangan Exhibition videos, Amravati exhibition highlights, exhibition gallery Amravati, exhibition in Vidarbha video"
        structuredData={[
          organizationSchema,
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Video Gallery', path: '/videos' },
          ]),
        ]}
      />

      <section className="ink-band on-ink">
        <div className="page-wrap py-16 md:py-24">
          <h1 className="max-w-3xl text-4xl text-primary md:text-6xl">Video gallery</h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">
            Walk through past editions: the stalls, the crowds and the festival at its busiest.
          </p>
        </div>
        <div className="dot-rule" aria-hidden="true" />
      </section>

      <section className="page-wrap py-12 md:py-16" aria-labelledby="gallery-count">
        <h2 id="gallery-count" className="sr-only">
          Videos from past editions
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {visible.map((video) => (
            <li key={video.src}>
              <VideoCard src={video.src} poster={video.poster} title={video.title} />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-muted-foreground" role="status">
            Showing {visible.length} of {pastVideos.length} videos
          </p>
          {remaining > 0 && (
            <Button variant="outline" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
              Show {Math.min(PAGE_SIZE, remaining)} more videos
            </Button>
          )}
        </div>
      </section>
    </>
  );
};

export default GalleryPage;
