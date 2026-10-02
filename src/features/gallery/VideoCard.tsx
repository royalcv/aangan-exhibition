import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { m } from 'motion/react';
import { spring } from '@/design/motion';
import { cn } from '@/lib/utils';

type VideoCardProps = {
  src: string;
  /**
   * Optional cover image. Leave it out and the card shows the video's own first frame, so the
   * cover can never go out of sync with the video.
   */
  poster?: string;
  title: string;
  aspectRatio?: 'square' | 'wide';
  /** Small frosted tag over the poster, e.g. "Upcoming". */
  label?: string;
  /** "glass" gives a frosted play button for use over the dark photo sections. */
  tone?: 'solid' | 'glass';
  className?: string;
};

const ACTIVE_VIDEO_EVENT = 'aangan:active-video';

/**
 * A video card that never autoplays and plays one video at a time.
 * - With a `poster`, it loads the video only when played and releases it again once it scrolls
 *   away, which keeps a 23-video page light on phones.
 * - Without one, it loads just the video's metadata and shows its first frame as the cover.
 */
const VideoCard = ({ src, poster, title, aspectRatio = 'square', label, tone = 'solid', className }: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasSource, setHasSource] = useState(!poster);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const pauseForAnotherVideo = (event: Event) => {
      const active = (event as CustomEvent<HTMLVideoElement>).detail;
      if (active !== video) video.pause();
    };

    window.addEventListener(ACTIVE_VIDEO_EVENT, pauseForAnotherVideo);
    return () => window.removeEventListener(ACTIVE_VIDEO_EVENT, pauseForAnotherVideo);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
          setIsPlaying(false);
          // Only release the file when a separate poster is covering for it.
          if (poster) setHasSource(false);
        }
      },
      { rootMargin: '100px 0px' },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [poster]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasSource) return;

    if (isPlaying) {
      void video
        .play()
        .then(() => window.dispatchEvent(new CustomEvent(ACTIVE_VIDEO_EVENT, { detail: video })))
        .catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  }, [hasSource, isPlaying]);

  const togglePlayback = () => {
    if (!hasSource) {
      setHasSource(true);
      setIsPlaying(true);
      return;
    }
    setIsPlaying((playing) => !playing);
  };

  return (
    <div
      className={cn('group relative overflow-hidden rounded-md bg-ink', className)}
      style={{ aspectRatio: aspectRatio === 'wide' ? '16 / 9' : '1 / 1' }}
    >
      {label ? (
        <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-sm font-semibold text-white backdrop-blur-md">
          {label}
        </span>
      ) : null}

      <video
        ref={videoRef}
        // "#t=0.1" makes browsers (including iOS Safari) paint a frame instead of a black box.
        src={hasSource ? (poster ? src : `${src}#t=0.1`) : undefined}
        poster={poster}
        muted
        playsInline
        preload={poster ? 'none' : 'metadata'}
        disablePictureInPicture
        aria-label={title}
        className="h-full w-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={(event) => {
          setIsPlaying(false);
          // Back to the cover frame once the video finishes.
          if (!poster) event.currentTarget.currentTime = 0.1;
        }}
      />

      <button
        type="button"
        onClick={togglePlayback}
        aria-label={`${isPlaying ? 'Pause' : 'Play'}: ${title}`}
        aria-pressed={isPlaying}
        className={cn(
          'absolute inset-0 flex cursor-pointer items-center justify-center bg-ink/20 transition-opacity duration-200',
          isPlaying ? 'opacity-0 focus-visible:opacity-100 group-hover:opacity-100' : 'opacity-100',
        )}
      >
        <m.span
          whileTap={{ scale: 0.92 }}
          transition={spring.press}
          className={cn(
            'flex h-16 w-16 items-center justify-center rounded-full shadow-lg',
            tone === 'glass'
              ? 'border border-white/40 bg-white/20 text-white backdrop-blur-md'
              : 'bg-primary text-primary-foreground',
          )}
        >
          {isPlaying ? <Pause className="h-7 w-7" aria-hidden="true" /> : <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />}
        </m.span>
      </button>
    </div>
  );
};

export default VideoCard;
