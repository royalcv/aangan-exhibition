import React, { useRef, useState } from "react";

type VideoCardProps = {
  src: string;
  poster?: string;
};

const VideoCard: React.FC<VideoCardProps> = ({ src, poster }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true; // 🔒 always muted

    if (video.paused) {
      video.play();
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
        src={src}
        poster={poster}
        muted
        playsInline
        preload="metadata"
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
