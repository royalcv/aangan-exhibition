import VideoCard from './VideoCard';
import { upcomingVideos } from './videos';
import backdrop from '@/assets/backGi3.webp';

/**
 * Teasers for the upcoming editions, on frosted glass over the lamp-lit photo.
 * Nothing autoplays: each video loads and plays only when the visitor presses play.
 */
const UpcomingPreview = () => (
  <section className="ink-band on-ink relative isolate overflow-hidden" aria-labelledby="upcoming-heading">
    <img
      src={backdrop}
      alt=""
      loading="lazy"
      decoding="async"
      className="absolute inset-0 -z-20 h-full w-full object-cover object-[20%_45%]"
    />
    <div className="absolute inset-0 -z-10 bg-ink/75" aria-hidden="true" />

    <div className="mx-auto w-full max-w-[88rem] px-5 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="upcoming-heading" className="text-3xl text-white md:text-5xl">
          Upcoming moments
        </h2>
        <p className="mt-4 text-lg text-white/80">Get a feel for the next editions before you visit. Press play to watch.</p>
      </div>

      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {upcomingVideos.map((video) => (
          <li key={video.src}>
            <div className="rounded-2xl border border-white/20 border-t-white/40 bg-ink/60 p-3 shadow-[0_8px_32px_rgba(0,0,0,0.35)] supports-[backdrop-filter]:bg-white/10 supports-[backdrop-filter]:backdrop-blur-xl">
              <VideoCard
                src={video.src}
                poster={video.poster}
                title={video.title}
                aspectRatio="wide"
                label="Upcoming"
                tone="glass"
                className="rounded-xl"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default UpcomingPreview;
