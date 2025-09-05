import { Card, CardContent } from '@/components/ui/card';
import gallery1 from '@/assets/gallery1.jpg';
import gallery2 from '@/assets/bgi4.jpg';
import gallery3 from '@/assets/backgroungImage1.jpg';
import gallery4 from '@/assets/gallery5.jpg';
import gallery5 from '@/assets/gallery4.jpg';
import gallery6 from '@/assets/gallery6.jpg';

const Gallery = () => {
  const images = [
    {
      src: gallery1,
      alt: 'Western Wear exhibition',
      title: 'Western Wear',
    },
    {
      src: gallery2,
      alt: 'Textile and fabric exhibition with traditional weavings',
      title: 'Textile Heritage',
    },
    {
      src: gallery3,
      alt: 'luxury collection',
      title: 'Luxury Collection',
    },
  ];
    const upcomingPoster = [
    {
      src: gallery4,
      alt: 'Mehfil Inn',
      title: 'Mehfil Inn',
    },
    {
      src: gallery5,
      alt: 'Mehfil Inn',
      title: 'Mehfil Inn',
    },
    {
      src: gallery6,
      alt: 'Mehfil Inn',
      title: 'Mehfil Inn',
    },
  ];

  return (
    <>
      {/* First Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
              Exhibition Gallery
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Glimpses from our past exhibitions showcasing the rich cultural heritage and traditional arts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <Card
                key={index}
                className="group overflow-hidden bg-gradient-card border-border shadow-warm hover:shadow-glow transition-all duration-300"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-semibold text-lg">
                          {image.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Second Section (duplicate of above) */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
              Upcoming Exhibition Poster's
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay tune for upcoming event.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingPoster.map((image, index) => (
              <Card
                key={index}
                className="group overflow-hidden bg-gradient-card border-border shadow-warm hover:shadow-glow transition-all duration-300"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-100 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-semibold text-lg">
                          {image.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;
