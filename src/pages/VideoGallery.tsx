import VideoCard from "@/components/VideoCard";
import '../style/videoGallery.css';
import gallery11 from '@/assets/10.mp4';
import gallery12 from '@/assets/11.mp4';
import gallery13 from '@/assets/12.mp4';
import gallery14 from '@/assets/13.mp4';
import gallery15 from '@/assets/14.mp4';
import gallery16 from '@/assets/15.mp4';
import gallery17 from '@/assets/16.mp4';
import gallery18 from '@/assets/17.mp4';
import gallery19 from '@/assets/18.mp4';
import gallery20 from '@/assets/19.mp4';
import gallery21 from '@/assets/20.mp4';
import gallery22 from '@/assets/21.mp4';
import gallery23 from '@/assets/22.mp4';
import gallery24 from '@/assets/23.mp4';
import gallery25 from '@/assets/24.mp4';
import gallery26 from '@/assets/25.mp4';
import gallery27 from '@/assets/26.mp4';
import gallery28 from '@/assets/27.mp4';
import gallery29 from '@/assets/28.mp4';
import gallery30 from '@/assets/29.mp4';
import gallery31 from '@/assets/30.mp4';
import gallery32 from '@/assets/31.mp4';
import gallery33 from '@/assets/32.mp4';
import Navigation from '@/components/Navigation';


const videos = [
  {
    src: gallery11,
    poster: "/videos/poster1.jpg",
  },
  {
    src: gallery12,
    poster: "/videos/poster2.jpg",
  },
  {
    src: gallery13,
    poster: "/videos/poster3.jpg",
  },
  {
    src: gallery14,
    poster: "/videos/poster4.jpg",
  },
  {
    src: gallery15,
    poster: "/videos/poster5.jpg",
  },
  {
    src: gallery16,
    poster: "/videos/poster6.jpg",
  },
  {
    src: gallery17,
    poster: "/videos/poster7.jpg",
  },
  {
    src: gallery18,
    poster: "/videos/poster8.jpg",
  },
  {
    src: gallery19,
    poster: "/videos/poster9.jpg",
  },
  {
    src: gallery20,
    poster: "/videos/poster10.jpg",
  },
  {
    src: gallery21,
    poster: "/videos/poster11.jpg",
  },
  {
    src: gallery22,
    poster: "/videos/poster12.jpg",
  },
  {
    src: gallery23,
    poster: "/videos/poster13.jpg",
  },
  {
    src: gallery24,
    poster: "/videos/poster14.jpg",
  },
  {
    src: gallery25,
    poster: "/videos/poster15.jpg",
  },
  {
    src: gallery26,
    poster: "/videos/poster16.jpg",
  },
  {
    src: gallery27,
    poster: "/videos/poster17.jpg",
  },
  {
    src: gallery28,
    poster: "/videos/poster18.jpg",
  },
  {
    src: gallery29,
    poster: "/videos/poster19.jpg",
  },
  {
    src: gallery30,
    poster: "/videos/poster20.jpg",
  },
  {
    src: gallery31,
    poster: "/videos/poster21.jpg",
  },
  {
    src: gallery32,
    poster: "/videos/poster22.jpg",
  },
  {
    src: gallery33,
    poster: "/videos/poster23.jpg",
  }
];

const VideoGallery = () => {
  return (
        <div className="min-h-screen bg-background">
      <Navigation />
    <div className="video-gallery-container">
      <h1 className="video-title">Video Gallery</h1>

      <div className="video-grid">
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            src={video.src}
            poster={video.poster}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default VideoGallery;
