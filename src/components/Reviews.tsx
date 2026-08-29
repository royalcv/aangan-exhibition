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
      name: 'Meghved Sarees ❤️',
      business: 'Saree',
      rating: 5,
      review: 'A heartfelt thank you to the entire Aangan Exhibition Team for giving us the opportunity to be a part of this wonderful exhibition. ❤️ We’re truly grateful for the platform and for helping our brand connect with so many new customers. Your consistent efforts in marketing, promotion, and management are truly commendable. We’ve seen Aangan grow and reach a new level with every edition, and it’s amazing to witness the dedication behind it. Thank you for all your support and efforts. Looking forward to many more successful exhibitions together! Thankyou you Aangan Team🙂',
    },
    {
      name: 'SaajRang Studio',
      business: 'Ready Rangoli',
      rating: 5,
      review: 'मनापासून धन्यवाद Aangan Exhibition! ❤️✨ Aangan Exhibition सोबतचा हा अनुभव खरंच खूप सुंदर आणि अविस्मरणीय होता! 🥰 इतकं सुंदर आयोजन, उत्तम व्यवस्थापन आणि प्रत्येक स्टॉलधारकासाठी घेतलेली काळजी मनापासून जाणवली. 🌸 आम्हाला आमच्या SaajRang Studio ला तुमच्या या सुंदर उपक्रमाचा भाग बनण्याची संधी दिल्याबद्दल खूप खूप धन्यवाद! ❤️ Exhibition खूप छान पार पडलं आणि त्यामागे तुमची मेहनत स्पष्ट दिसत होती. ✨ अशाच सुंदर उपक्रमांसाठी आणि पुन्हा एकदा Aangan सोबत जोडले जाण्यासाठी आम्ही नक्कीच उत्सुक आहोत! 🫶🏻 Thank you Aangan Team… for making it so special! ❤️🌸',
    },
    {
      name: 'Priti Tushar Bhetalu',
      business: 'Dress',
      rating: 5,
      review: 'A heartfelt Thank you to Nikita mam and entire organizer team for putting together such a wonderful exhibition! ✨ Your dedication, hard work, and seamless efforts made this event truly special for us. It was a pleasure being a part of AANGAN EXHIBITION and connecting with so many amazing people. We truly appreciate all the support and effort that went behind making this event a success. 🤍✨Looking forward to being a part of many more beautiful events with you all! 🫶🏻 — pretty women’s creation ❣️',
    },
      {
      name: 'Shubhangi Deshmukh',
      business: 'Jewel and Saree',
      rating: 5,
      review: 'मनापासून धन्यवाद ❤️प्रत्येक वेळी आंगन एक्झिबिशन माझ्यासाठी खास असतं, पण त्यामागे तुमचा सपोर्ट असेल तर माझा आत्मविश्वास आणखी वाढतो.  ❤️ निकिता, चैतन्य आणि आशिष दादा — मनापासून धन्यवाद! 🙏 मी रील्सपासून लांब होते, पण तुम्ही मला रील्स करायला प्रवृत्त केलं, माझं मनोबल वाढवलं आणि प्रत्येक वेळी माझ्यावर विश्वास ठेवला. आज मी जे काही आत्मविश्वासाने करतेय, त्यात तुमच्या प्रोत्साहनाचा मोठा वाटा आहे. प्रत्येक वेळी माझ्या पाठीशी खंबीरपणे उभे राहिल्याबद्दल मनःपूर्वक आभार! ❤️ तुमचा हा सपोर्ट असाच कायम राहू द्या… कारण तुमच्यासारखी माणसं सोबत असणं, हीच माझी खरी ताकद आहे. ✨ Thank you so much aangan team🙏🏻❤️🙌🏻',
    },
    {
      name: 'Divya Mohata',
      business: 'Dress',
      rating: 5,
      review: 'Your choice of location is really amazing! The place is neat, clean, and has such great vibes. Customers also really appreciate seeing such a well-organized and beautiful exhibition. Thank you, Nikita and Chaitanya Sir, for providing such a wonderful platform. And a special thanks to Ashish Dada, who is always ready to help and arrange everything whenever we have any problem. Truly appreciate all your efforts! ❤️',
    },
     {
      name: 'Riddhi Sangani😊',
      business: 'Korean Dress',
      rating: 5,
      review: 'Thank you So much Nikita Maam Chaitanya Sir and the Entire Aangan Team! ❤️The Exhibition was absolutely Superb, and everything was so Beautifully Organized. Nikita Mam honestly, there is no exhibition like yours. You have your own Class and a way of making every Exhibition so Special! 😍Its always such a pleasure to be part of Aangan. Truly appreciate all the efforts, warmth ,and energy you put into making every Event So Amazing ✨ looking forward to many More Wonderful Exhibition With You! ❤️',
    },
    {
      name: 'Rajashri Walke',
      business: 'Kids wear Paithani Dress',
      rating: 5,
      review: 'Thank you so much Nikita Tai, Chaitanya Dada आणि Ashish Dada! ❤️ तुम्ही खरंच खूप great आहात. तुमची मेहनत, discipline आणि प्रत्येक गोष्टीचं सुंदर arrangement खूपच कौतुकास्पद आहे. तुमच्या या hard work मुळे पुढे “Aangan” यापेक्षाही खूप मोठ्या platform वर पोहोचेल, याची खात्री आहे. ✨ पूर्ण Aangan Team ला मनापासून Thank You आणि पुढच्या exhibition साठी खूप खूप शुभेच्छा! 💫 Keep growing and keep creating such amazing platforms! ❤️',
    },
     {
      name: 'S2arts',
      business: 'Handmade Art',
      rating: 5,
      review: 'Thank You, Team Aangan! 🌸 A heartfelt thank you to the entire Aangan Exhibition team for organizing such a wonderful and successful event. ❤️ Our stall received an amazing response and lots of love from customers, making the experience truly special and memorable. ✨ Grateful for this wonderful opportunity and your constant support. Looking forward to being a part of many more Aangan exhibitions in the future! 💐✨ Thank you, Team Aangan! 🙏❤️',
    },
    {
      name: 'Aasavari Tayade',
      business: 'Jewel',
      rating: 5,
      review: 'Aangan Exhibition la मनापासून धन्यवाद ❤️ आंगण प्रदर्शन म्हणजे आमच्यासाठी फक्त एक Exhibition नाही, तर आमचं एक Family आहे! ❤️ आमच्या निकेत ताई आणि सरांनी आम्हाला दिलेला भरभरून प्रतिसाद, तसेच Reel कशी बनवायची, त्यात काय आणि कसं बोलायचं यापासून आम्हाला दिलेलं मार्गदर्शन—यासाठी मनापासून धन्यवाद! 🙏 या दोन दिवसांत आमच्या Exhibition ला मिळालेला फुटफॉल अप्रतिम होता आणि ग्राहकांचा प्रतिसादही खूपच सुंदर मिळाला. आनंदाची गोष्ट म्हणजे आमचा सगळा स्टॉक Stock Out झाला! 🥰✨ Thank you so much, Aangan Exhibition! ❤️ असंच आम्हाला नेहमी प्रोत्साहन देत राहा आणि आंगण Exhibition असंच पुन्हा पुन्हा भरत राहो! 🌸 Founder of Adaa jewellery shop Aasavari 🙏🙏',
    },
    {
      name: 'Priva Collection',
      business: 'Saree',
      rating: 5,
      review: 'Grateful for a beautiful experience! ✨ A special thank you to Nikita Ma’am and the entire Aangan Team for organising such a beautifully curated exhibition at Oak Banquet. ❤️ The love and response we received were truly overwhelming! From wonderful conversations to happy customers, every moment made the event special for us at PRIVA. 🥰 Your hard work and dedication created the perfect platform for us to showcase our collection and connect with so many beautiful people. Thank you so much! ❤️✨',
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4x4 mx-auto">
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