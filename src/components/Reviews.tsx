import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Reviews = () => {
  const customerReviews = [
    {
      name: 'Priya Thakre',
      location: 'Amravati',
      rating: 5,
      review: 'आंगण Exhibition म्हणजे परंपरा आणि कलात्मकतेचं अप्रतिम मिश्रण. प्रत्येक वस्तूत सौंदर्य, संस्कृती आणि नाजूकपणा दिसतो. खरेदी करताना मन आनंदाने भरून येतं.',
    },
    {
      name: 'Manjiri',
      location: 'Amravati',
      rating: 5,
      review: 'आंगण Exhibition मधील वैविध्य आणि दर्जा पाहून मी भारावून गेले. नक्षीदार डिझाईन्स आणि उत्कृष्ट कापडं खूपच आकर्षक आहेत. इथे खरेदी करणं म्हणजे खूप खास अनुभव आहे.',
    },
    {
      name: 'Sangeeta T',
      location: 'Amravati',
      rating: 5,
      review: 'आंगण Exhibition म्हणजे परंपरा आणि आधुनिकतेचं सुंदर संगम. प्रत्येक वस्तू वेगळी आणि देखणी आहे. मी घेतलेल्या वस्तूंवर सर्वांनी कौतुकाचा वर्षाव केला.',
    },
    {
      name: 'Sakshi Deshmukh',
      location: 'Amravati',
      rating: 5,
      review: 'या प्रदर्शनात आले की वेळ कसा जातो कळतच नाही. सुंदर हस्तकला, आकर्षक डिझाईन्स आणि आपुलकीचा माहोल मनात घर करतो.',
    },
    {
      name: 'Neha Tosar',
      location: 'Paratwada',
      rating: 4,
      review: 'इथली सगळी सजावट, वातावरण आणि विविधतेने भरलेला संग्रह पाहून डोळे तृप्त झाले. प्रदर्शनात प्रत्येक गोष्ट मनापासून तयार केलेली जाणवली.',
    },
     {
      name: 'Anita Patil',
      location: 'Warud',
      rating: 5,
      review: 'इथे शॉपिंग करताना इतक्या सुंदर वस्तू दिसतात की निवड करणेच कठीण होतं. प्रत्येक वस्तू अनोखी आणि मनाला भावणारी आहे',
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