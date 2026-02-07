import { useRef, useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import gallery1 from '@/assets/gallery1.jpg';
import gallery2 from '@/assets/bgi4.jpg';
import gallery3 from '@/assets/backgroungImage1.jpg';
import gallery7 from '@/assets/1.mp4';
import gallery8 from '@/assets/2.mp4';
import gallery9 from '@/assets/3.mp4';
import gallery10 from '@/assets/4.mp4';
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



const GAP = 24;

const Gallery = () => {
  const exhibitionMedia = [
{ type: 'video', src: gallery11 },
{ type: 'video', src: gallery12 },
{ type: 'video', src: gallery13 },
{ type: 'video', src: gallery14 },
{ type: 'video', src: gallery15 },
{ type: 'video', src: gallery16 },
{ type: 'video', src: gallery17 },
{ type: 'video', src: gallery18 },
{ type: 'video', src: gallery19 },
{ type: 'video', src: gallery20 },
{ type: 'video', src: gallery21 },
{ type: 'video', src: gallery22 },
{ type: 'video', src: gallery23 },
{ type: 'video', src: gallery24 },
{ type: 'video', src: gallery25 },
{ type: 'video', src: gallery26 },
{ type: 'video', src: gallery27 },
{ type: 'video', src: gallery28 },
{ type: 'video', src: gallery29 },
{ type: 'video', src: gallery30 },
{ type: 'video', src: gallery31 },
{ type: 'video', src: gallery32 },
{ type: 'video', src: gallery33 }
  ];

  const infiniteMedia = [...exhibitionMedia, ...exhibitionMedia];
  const trackRef = useRef(null);

  useEffect(() => {
    let offset = 0;
    let animationId;

    const animate = () => {
      const isMobile = window.innerWidth < 640;
      const cardWidth = isMobile ? 280 : window.innerWidth < 1024 ? 320 : 380;
      const step = cardWidth + GAP;

      offset += 2;

      if (offset >= exhibitionMedia.length * step) {
        offset = 0;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${offset}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const videos = [
    { src: gallery7 },
    { src: gallery8 },
    { src: gallery9 },
    { src: gallery10 },
  ];

  return (
    <>
      <section className="pt-16 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
              Exhibition Gallery
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Glimpses from our exhibitions — moments in motion & stills
            </p>
          </div>

          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-6 will-change-transform"
            >
              {infiniteMedia.map((item, index) => (
                <Card
                  key={index}
                  className="min-w-[240px] sm:min-w-[280px] md:min-w-[320px]
                    group overflow-hidden bg-gradient-card border-border
                    shadow-warm hover:shadow-glow transition-all duration-300"
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden">
                      {item.type === 'image' ? (
                        <img
                          src={item.src}
                          //alt={item.alt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <video
                          src={item.src}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-8 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
              Upcoming Moments 🎥
            </h2>
            <p className="text-lg text-muted-foreground">
              Experience the vibe through motion
            </p>
          </div>

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
          <div className="absolute bottom-3 left-3 z-10">
            <span className="px-3 py-1 text-xs md:text-sm font-semibold text-white rounded-full backdrop-blur-md bg-white/20 border border-white/30">
              Upcoming
            </span>
          </div>

          <video
            ref={videoRef}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            className="w-full aspect-video object-cover"
          />

          <div className="absolute inset-0 flex items-center justify-center gap-3
            opacity-100 md:opacity-0 md:group-hover:opacity-100
            transition-opacity duration-300 bg-black/20">
            <button
              onClick={togglePlay}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full backdrop-blur-md bg-white/20 flex items-center justify-center hover:scale-110 transition"
            >
              {isPlaying ? <Pause className="text-white" /> : <Play className="text-white" />}
            </button>

            <button
              onClick={toggleMute}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full backdrop-blur-md bg-white/20 flex items-center justify-center hover:scale-110 transition"
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
