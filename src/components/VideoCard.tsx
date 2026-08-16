import React, { useRef, useState } from "react";
import galleryPoster from "@/assets/gallery1.jpg";

type VideoCardProps = {
  src: string;
  poster?: string;
};

const VideoCard: React.FC<VideoCardProps> = ({ src, poster }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true; // 🔒 always muted

    if (!hasLoaded) {
      video.src = src;
      video.load();
      void video.play();
      setHasLoaded(true);
      setIsPlaying(true);
      return;
    }

    if (video.paused) {
      void video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="video-card glass" onClick={togglePlay}>
      <video
        ref={videoRef}
        src={undefined}
        poster={poster ?? galleryPoster}
        muted
        playsInline
        preload="none"
        controls={false}
        disablePictureInPicture
      />

      <div className={`video-overlay ${isPlaying ? "playing" : ""}`}>
        <div className="glass-play-btn">
          {isPlaying ? (
            <span className="pause-icon"></span>
          ) : (
            <span className="play-icon"></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
