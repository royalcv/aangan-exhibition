import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

type LazyVideoCardProps = {
  src: string;
  poster: string;
  aspectRatio?: 'square' | 'wide';
  label?: string;
};

const activeVideoEvent = 'aangan:active-video';

const LazyVideoCard = ({ src, poster, aspectRatio = 'square', label }: LazyVideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasSource, setHasSource] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const pauseForAnotherVideo = (event: Event) => {
      const activeVideo = (event as CustomEvent<HTMLVideoElement>).detail;
      if (activeVideo !== video) video.pause();
    };

    window.addEventListener(activeVideoEvent, pauseForAnotherVideo);
    return () => window.removeEventListener(activeVideoEvent, pauseForAnotherVideo);
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
      void video.play().then(() => {
        window.dispatchEvent(new CustomEvent(activeVideoEvent, { detail: video }));
      }).catch(() => setIsPlaying(false));
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
    <div className="video-card glass group relative" style={{ aspectRatio: aspectRatio === 'wide' ? '16 / 9' : '1 / 1' }}>
      {label ? (
        <span className="absolute bottom-3 left-3 z-10 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
          {label}
        </span>
      ) : null}

      <video
        ref={videoRef}
        src={hasSource ? src : undefined}
        poster={poster}
        muted
        playsInline
        preload="none"
        disablePictureInPicture
        className="h-full w-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
        className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity ${isPlaying ? 'opacity-0 group-hover:opacity-100 focus-within:opacity-100' : 'opacity-100'}`}
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/25 backdrop-blur-md transition-transform group-hover:scale-110">
          {isPlaying ? <Pause className="h-7 w-7 text-white" /> : <Play className="ml-1 h-7 w-7 text-white" />}
        </span>
      </button>
    </div>
  );
};

export default LazyVideoCard;
