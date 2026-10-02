import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import VideoCard from './VideoCard';
import { pastVideos } from './videos';

/** Home-page teaser for the gallery. The full gallery lives on /videos. */
const GalleryPreview = () => (
  <section className="page-wrap py-16 md:py-24" aria-labelledby="moments-heading">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <h2 id="moments-heading" className="max-w-xl text-3xl md:text-4xl">
        Moments from past editions
      </h2>
      <Link
        to="/videos"
        className="inline-flex min-h-11 items-center gap-2 font-semibold text-madder underline underline-offset-4 hover:text-foreground"
      >
        Watch all {pastVideos.length} videos
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>

    <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
      {pastVideos.slice(0, 6).map((video) => (
        <li key={video.src}>
          <VideoCard src={video.src} poster={video.poster} title={video.title} />
        </li>
      ))}
    </ul>

  </section>
);

export default GalleryPreview;
