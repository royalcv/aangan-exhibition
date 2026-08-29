import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import LazyVideoCard from '@/components/LazyVideoCard';
import upcomingOne from '@/assets/1.mp4';
import upcomingTwo from '@/assets/2.mp4';
import upcomingThree from '@/assets/3.mp4';
import upcomingFour from '@/assets/4.mp4';
import exhibitionOne from '@/assets/10.mp4';
import exhibitionTwo from '@/assets/11.mp4';
import exhibitionThree from '@/assets/12.mp4';
import exhibitionFour from '@/assets/13.mp4';
import exhibitionFive from '@/assets/14.mp4';
import exhibitionSix from '@/assets/15.mp4';

const exhibitionVideos = [
  { src: exhibitionOne, poster: '/videos/poster1.jpg' },
  { src: exhibitionTwo, poster: '/videos/poster2.jpg' },
  { src: exhibitionThree, poster: '/videos/poster3.jpg' },
  { src: exhibitionFour, poster: '/videos/poster4.jpg' },
  { src: exhibitionFive, poster: '/videos/poster5.jpg' },
  { src: exhibitionSix, poster: '/videos/poster6.jpg' },
];

const upcomingVideos = [
  { src: upcomingOne, poster: '/videos/upcoming-1.jpg' },
  { src: upcomingTwo, poster: '/videos/upcoming-2.jpg' },
  { src: upcomingThree, poster: '/videos/upcoming-3.jpg' },
  { src: upcomingFour, poster: '/videos/upcoming-4.jpg' },
];

const OptimizedGallery = () => (
  <>
    <section className="pt-16 pb-8 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h2 className="mb-4 bg-gradient-accent bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            Exhibition Gallery
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Glimpses from our exhibitions — moments in motion and stills
          </p>
        </div>

        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
          {exhibitionVideos.map((video, index) => (
            <Card key={video.src} className="min-w-[240px] snap-start overflow-hidden border-border bg-gradient-card shadow-warm sm:min-w-[280px] md:min-w-[320px]">
              <CardContent className="p-0">
                <LazyVideoCard src={video.src} poster={video.poster} />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-4 text-center">
          <Link to="/videos" className="inline-flex rounded-md border border-primary px-5 py-2 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
            View all exhibition videos
          </Link>
        </div>
      </div>
    </section>

    <section className="pt-8 pb-16 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 bg-gradient-accent bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            Upcoming Moments
          </h2>
          <p className="text-lg text-muted-foreground">Experience the vibe through motion</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {upcomingVideos.map((video) => (
            <Card key={video.src} className="overflow-hidden border-border bg-gradient-card shadow-warm">
              <CardContent className="p-0">
                <LazyVideoCard src={video.src} poster={video.poster} aspectRatio="wide" label="Upcoming" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default OptimizedGallery;
