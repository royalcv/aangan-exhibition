import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoCard from './VideoCard';
import { pastVideos } from './videos';

/** Home-page teaser for the gallery. The full gallery lives on /videos. */
const GalleryPreview = () => (
  <section className="page-wrap py-16 md:py-24" aria-labelledby="moments-heading">
    <h2 id="moments-heading" className="max-w-xl text-3xl md:text-4xl">
      Moments from past editions
    </h2>

    <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
      {pastVideos.slice(0, 6).map((video) => (
        <li key={video.src}>
          <VideoCard src={video.src} poster={video.poster} title={video.title} />
        </li>
      ))}
    </ul>

    <div className="mt-10 flex justify-center">
      <Button asChild size="lg" className="group px-10 transition-transform duration-200 hover:scale-105">
        <Link to="/videos">
          Watch more
          <span className="sr-only"> videos from past editions</span>
          {/* The arrow keeps nudging forward to invite a click (CSS; off under reduced motion). */}
          <span aria-hidden="true" className="inline-flex animate-nudge">
            <ArrowRight className="!size-5" />
          </span>
        </Link>
      </Button>
    </div>
  </section>
);

export default GalleryPreview;
