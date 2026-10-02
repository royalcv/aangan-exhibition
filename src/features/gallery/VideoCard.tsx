import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { m } from 'motion/react';
import { spring } from '@/design/motion';
import { cn } from '@/lib/utils';

type VideoCardProps = {
  src: string;
  poster: string;
  title: string;
  aspectRatio?: 'square' | 'wide';
  className?: string;
};

const ACTIVE_VIDEO_EVENT = 'aangan:active-video';

/**
 * A poster that loads its video only when played, plays one video at a time, and releases the
 * source again once it scrolls away — keeps a 23-video page light on phones.
 */
const VideoCard = ({ src, poster, title, aspectRatio = 'square', className }: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasSource, setHasSource] = useState(false);
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
          setHasSource(false);
        }
      },
      { rootMargin: '100px 0px' },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

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
      <video
        ref={videoRef}
        src={hasSource ? src : undefined}
        poster={poster}
        muted
        playsInline
        preload="none"
        disablePictureInPicture
        aria-label={title}
        className="h-full w-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
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
          className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
        >
          {isPlaying ? <Pause className="h-7 w-7" aria-hidden="true" /> : <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />}
        </m.span>
      </button>
    </div>
  );
};

export default VideoCard;
