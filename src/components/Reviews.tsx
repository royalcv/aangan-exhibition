import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import image from '@/assets/name.png'

const Reviews = () => {
  const customerReviews = [
    {
      name: 'Priya Thakre',
      location: 'Amravati',
      rating: 5,
      review: 'Loved the Angan Exhibition 💓! Such a wide range of products under one roof. The handmade stuff was absolutely worth buying. Definitely coming again!',
      image:image
    },
    {
      name: 'Manjiri',
      location: 'Amravati',
      rating: 5,
      review: 'Friends सोबत आलो होते, आणि ambience खूपच lively होतं. Shopping + food stalls = perfect weekend plan 😍.',
      image:image
    },
    {
      name: 'Sangeeta T',
      location: 'Amravati',
      rating: 5,
      review: 'Exhibition खूपच छान वाटलं, specially ज्वेलरी section 🙈! Modern designs पण पारंपरिक touch सुद्धा होता. Totally loved it.',
      image:image
    },
    {
      name: 'Sakshi Deshmukh',
      location: 'Amravati',
      rating: 5,
      review: 'The exhibition was well organized and the collection was unique. Prices could have been a little better, but overall a very good experience.',
      image:image
    },
    {
      name: 'Neha Tosar',
      location: 'Paratwada',
      rating: 4,
      review: 'इथे घेतलेली साडी इतकी सुंदर आहे की सगळ्यांनी कौतुक केलं. प्रत्येक वस्तू मनापासून तयार केलेली जाणवली. खरंच अप्रतिम अनुभव.',
      image:image
    },
     {
      name: 'Anita Patil',
      location: 'Warud',
      rating: 5,
      review: 'इथे शॉपिंग करताना इतक्या सुंदर वस्तू दिसतात की निवड करणेच कठीण होतं. प्रत्येक वस्तू अनोखी आणि मनाला भावणारी आहे',
      image:image
    },
  ];

  const stallholderReviews = [
    {
      name: 'Ritu Wankhade',
      business: 'Cosmatic',
      rating: 5,
      review: 'I am Ritu Wankhade. I have participated in many exhibitions, but when I joined Aangan for the first time, I launched some of my products there. The overwhelming response I received at the Aangan Grand Exhibition was something I had never experienced in any other exhibition before.Aangan is truly the best exhibition platform in Amravati. Visitors don’t just come as customers – they turn into long-term buyers and supporters. This has been my real and valuable experience with Aangan.',
    },
    {
      name: 'Mansi kale',
      business: 'Textile Merchant (Saree)',
      rating: 5,
      review: 'I have joined many exhibitions, but the experience at Aangan was completely different. Customers here don’t just shop once – they connect, trust, and become long-term buyers. Aangan gave a new identity to my sarees. People here valued the quality of my products and the effort behind them. It not only increased my sales but also gave me confidence and satisfaction. The foundation of my brand’s recognition was truly built at Aangan.',
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-primary text-primary' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Customer Reviews */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
              Visitor Experiences
            </h2>
            <p className="text-lg text-muted-foreground">
              What our visitors say about the Aangan Exhibition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {customerReviews.map((review, index) => (
              <Card key={index} className="bg-gradient-card border-border shadow-warm hover:shadow-glow transition-all duration-300">
                      {/* Round image in top-right */}
                      {/* <img
                        src={review.image} // add image URL in your customerReviews data
                        alt={review.name}
                        className="absolute top-4 right-4 w-12 h-12 rounded-full border-2 border-white shadow-md"
                      /> */}
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary mb-4" />
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    "{review.review}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">{review.name}</h4>
                      <p className="text-xs text-muted-foreground">{review.location}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stallholder Reviews */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
              Stall Holder's Testimonials
            </h2>
            <p className="text-lg text-muted-foreground">
              Feedback from our valued exhibition partners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {stallholderReviews.map((review, index) => (
              <Card key={index} className="bg-gradient-card border-border shadow-warm hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary mb-4" />
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    "{review.review}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">{review.name}</h4>
                      <p className="text-xs text-muted-foreground">{review.business}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;