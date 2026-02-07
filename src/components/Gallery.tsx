import { useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

/* ================= Images ================= */
import gallery1 from '@/assets/gallery1.jpg';
import gallery2 from '@/assets/bgi4.jpg';
import gallery3 from '@/assets/backgroungImage1.jpg';
import gallery4 from '@/assets/gallery5.jpg';
import gallery5 from '@/assets/gallery4.jpg';
import gallery6 from '@/assets/gallery6.jpg';

/* ================= Videos ================= */
import gallery7 from '@/assets/1.mp4';
import gallery8 from '@/assets/2.mp4';
import gallery9 from '@/assets/3.mp4';
import gallery10 from '@/assets/4.mp4';

const Gallery = () => {
  const images = [
    { src: gallery1, alt: 'Western Wear exhibition', title: 'Western Wear' },
    { src: gallery2, alt: 'Textile exhibition', title: 'Textile Heritage' },
    { src: gallery3, alt: 'Luxury collection', title: 'Luxury Collection' },
  ];

  const upcomingPoster = [
    { src: gallery4, alt: 'Mehfil Inn', title: 'Mehfil Inn' },
    { src: gallery5, alt: 'Mehfil Inn', title: 'Mehfil Inn' },
    { src: gallery6, alt: 'Mehfil Inn', title: 'Mehfil Inn' },
  ];

  const videos = [
    { src: gallery7 },
    { src: gallery8 },
    { src: gallery9 },
    { src: gallery10 },
  ];

  return (
    <>
      {/* ================= Exhibition Gallery ================= */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
              Exhibition Gallery
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Glimpses from our past exhibitions showcasing rich cultural heritage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <Card
                key={index}
                className="group overflow-hidden bg-gradient-card border-border shadow-warm hover:shadow-glow transition-all duration-300"
              >
                <CardContent className="p-0">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Upcoming Posters ================= */}
      {/* <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
              Upcoming Exhibition Posters
            </h2>
            <p className="text-lg text-muted-foreground">
              Stay tuned for upcoming events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingPoster.map((image, index) => (
              <Card
                key={index}
                className="group overflow-hidden bg-gradient-card border-border shadow-warm hover:shadow-glow transition-all duration-300"
              >
                <CardContent className="p-0">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* ================= Video Section ================= */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
              Upcoming Moments 🎥
            </h2>
            <p className="text-lg text-muted-foreground">
              Experience the vibe through motion
            </p>
          </div>

          {/* 2 Videos Per Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <VideoCard key={index} src={video.src} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

/* ================= Video Card ================= */
const VideoCard = ({ src }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <Card className="group overflow-hidden bg-gradient-card border-border shadow-warm hover:shadow-glow transition-all duration-300">
      <CardContent className="p-0">
        <div className="relative">

          {/* Upcoming Badge */}
          <div className="absolute bottom-4 left-4 z-10">
            <span className="px-4 py-1 text-sm font-semibold text-white rounded-full
              backdrop-blur-md bg-white/20 border border-white/30">
              Upcoming
            </span>
          </div>

          {/* Video */}
          <video
            ref={videoRef}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-80 object-cover"
          />

          {/* Glass Controls */}
          <div className="absolute inset-0 flex items-center justify-center gap-4
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">

            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full backdrop-blur-md bg-white/20
              flex items-center justify-center hover:scale-110 transition"
            >
              {isPlaying ? <Pause className="text-white" /> : <Play className="text-white" />}
            </button>

            <button
              onClick={toggleMute}
              className="w-14 h-14 rounded-full backdrop-blur-md bg-white/20
              flex items-center justify-center hover:scale-110 transition"
            >
              {isMuted ? <VolumeX className="text-white" /> : <Volume2 className="text-white" />}
            </button>

          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Gallery;
