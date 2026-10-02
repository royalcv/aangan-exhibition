import { useState } from 'react';
import { Star } from 'lucide-react';
import { m } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { duration, ease } from '@/design/motion';
import backdrop from '@/assets/backGi3.webp';
import { cn } from '@/lib/utils';

type Testimonial = { name: string; context: string; rating: number; text: string };

const visitorReviews: Testimonial[] = [
  {
    name: 'Priya Thakre',
    context: 'Amravati',
    rating: 5,
    text: 'Loved the Angan Exhibition 💓! Such a wide range of products under one roof. The handmade stuff was absolutely worth buying. Definitely coming again!',
  },
  {
    name: 'Manjiri',
    context: 'Amravati',
    rating: 5,
    text: 'Friends सोबत आलो होते, आणि ambience खूपच lively होतं. Shopping + food stalls = perfect weekend plan 😍.',
  },
  {
    name: 'Sangeeta T',
    context: 'Amravati',
    rating: 5,
    text: 'Exhibition खूपच छान वाटलं, specially ज्वेलरी section 🙈! Modern designs पण पारंपरिक touch सुद्धा होता. Totally loved it.',
  },
  {
    name: 'Sakshi Deshmukh',
    context: 'Amravati',
    rating: 5,
    text: 'The exhibition was well organized and the collection was unique. Prices could have been a little better, but overall a very good experience.',
  },
  {
    name: 'Neha Tosar',
    context: 'Paratwada',
    rating: 4,
    text: 'इथे घेतलेली साडी इतकी सुंदर आहे की सगळ्यांनी कौतुक केलं. प्रत्येक वस्तू मनापासून तयार केलेली जाणवली. खरंच अप्रतिम अनुभव.',
  },
  {
    name: 'Anita Patil',
    context: 'Warud',
    rating: 5,
    text: 'इथे शॉपिंग करताना इतक्या सुंदर वस्तू दिसतात की निवड करणेच कठीण होतं. प्रत्येक वस्तू अनोखी आणि मनाला भावणारी आहे',
  },
];

const stallholderReviews: Testimonial[] = [
  {
    name: 'Meghved Sarees ❤️',
    context: 'Saree',
    rating: 5,
    text: 'A heartfelt thank you to the entire Aangan Exhibition Team for giving us the opportunity to be a part of this wonderful exhibition. ❤️ We’re truly grateful for the platform and for helping our brand connect with so many new customers. Your consistent efforts in marketing, promotion, and management are truly commendable. We’ve seen Aangan grow and reach a new level with every edition, and it’s amazing to witness the dedication behind it. Thank you for all your support and efforts. Looking forward to many more successful exhibitions together! Thankyou you Aangan Team🙂',
  },
  {
    name: 'SaajRang Studio',
    context: 'Ready Rangoli',
    rating: 5,
    text: 'मनापासून धन्यवाद Aangan Exhibition! ❤️✨ Aangan Exhibition सोबतचा हा अनुभव खरंच खूप सुंदर आणि अविस्मरणीय होता! 🥰 इतकं सुंदर आयोजन, उत्तम व्यवस्थापन आणि प्रत्येक स्टॉलधारकासाठी घेतलेली काळजी मनापासून जाणवली. 🌸 आम्हाला आमच्या SaajRang Studio ला तुमच्या या सुंदर उपक्रमाचा भाग बनण्याची संधी दिल्याबद्दल खूप खूप धन्यवाद! ❤️ Exhibition खूप छान पार पडलं आणि त्यामागे तुमची मेहनत स्पष्ट दिसत होती. ✨ अशाच सुंदर उपक्रमांसाठी आणि पुन्हा एकदा Aangan सोबत जोडले जाण्यासाठी आम्ही नक्कीच उत्सुक आहोत! 🫶🏻 Thank you Aangan Team… for making it so special! ❤️🌸',
  },
  {
    name: 'Priti Tushar Bhetalu',
    context: 'Dress',
    rating: 5,
    text: 'A heartfelt Thank you to Nikita mam and entire organizer team for putting together such a wonderful exhibition! ✨ Your dedication, hard work, and seamless efforts made this event truly special for us. It was a pleasure being a part of AANGAN EXHIBITION and connecting with so many amazing people. We truly appreciate all the support and effort that went behind making this event a success. 🤍✨Looking forward to being a part of many more beautiful events with you all! 🫶🏻 — pretty women’s creation ❣️',
  },
  {
    name: 'Shubhangi Deshmukh',
    context: 'Jewel and Saree',
    rating: 5,
    text: 'मनापासून धन्यवाद ❤️प्रत्येक वेळी आंगन एक्झिबिशन माझ्यासाठी खास असतं, पण त्यामागे तुमचा सपोर्ट असेल तर माझा आत्मविश्वास आणखी वाढतो.  ❤️ निकिता, चैतन्य आणि आशिष दादा — मनापासून धन्यवाद! 🙏 मी रील्सपासून लांब होते, पण तुम्ही मला रील्स करायला प्रवृत्त केलं, माझं मनोबल वाढवलं आणि प्रत्येक वेळी माझ्यावर विश्वास ठेवला. आज मी जे काही आत्मविश्वासाने करतेय, त्यात तुमच्या प्रोत्साहनाचा मोठा वाटा आहे. प्रत्येक वेळी माझ्या पाठीशी खंबीरपणे उभे राहिल्याबद्दल मनःपूर्वक आभार! ❤️ तुमचा हा सपोर्ट असाच कायम राहू द्या… कारण तुमच्यासारखी माणसं सोबत असणं, हीच माझी खरी ताकद आहे. ✨ Thank you so much aangan team🙏🏻❤️🙌🏻',
  },
  {
    name: 'Divya Mohata',
    context: 'Dress',
    rating: 5,
    text: 'Your choice of location is really amazing! The place is neat, clean, and has such great vibes. Customers also really appreciate seeing such a well-organized and beautiful exhibition. Thank you, Nikita and Chaitanya Sir, for providing such a wonderful platform. And a special thanks to Ashish Dada, who is always ready to help and arrange everything whenever we have any problem. Truly appreciate all your efforts! ❤️',
  },
  {
    name: 'Riddhi Sangani😊',
    context: 'Korean Dress',
    rating: 5,
    text: 'Thank you So much Nikita Maam Chaitanya Sir and the Entire Aangan Team! ❤️The Exhibition was absolutely Superb, and everything was so Beautifully Organized. Nikita Mam honestly, there is no exhibition like yours. You have your own Class and a way of making every Exhibition so Special! 😍Its always such a pleasure to be part of Aangan. Truly appreciate all the efforts, warmth ,and energy you put into making every Event So Amazing ✨ looking forward to many More Wonderful Exhibition With You! ❤️',
  },
  {
    name: 'Rajashri Walke',
    context: 'Kids wear Paithani Dress',
    rating: 5,
    text: 'Thank you so much Nikita Tai, Chaitanya Dada आणि Ashish Dada! ❤️ तुम्ही खरंच खूप great आहात. तुमची मेहनत, discipline आणि प्रत्येक गोष्टीचं सुंदर arrangement खूपच कौतुकास्पद आहे. तुमच्या या hard work मुळे पुढे “Aangan” यापेक्षाही खूप मोठ्या platform वर पोहोचेल, याची खात्री आहे. ✨ पूर्ण Aangan Team ला मनापासून Thank You आणि पुढच्या exhibition साठी खूप खूप शुभेच्छा! 💫 Keep growing and keep creating such amazing platforms! ❤️',
  },
  {
    name: 'S2arts',
    context: 'Handmade Art',
    rating: 5,
    text: 'Thank You, Team Aangan! 🌸 A heartfelt thank you to the entire Aangan Exhibition team for organizing such a wonderful and successful event. ❤️ Our stall received an amazing response and lots of love from customers, making the experience truly special and memorable. ✨ Grateful for this wonderful opportunity and your constant support. Looking forward to being a part of many more Aangan exhibitions in the future! 💐✨ Thank you, Team Aangan! 🙏❤️',
  },
  {
    name: 'Aasavari Tayade',
    context: 'Jewel',
    rating: 5,
    text: 'Aangan Exhibition la मनापासून धन्यवाद ❤️ आंगण प्रदर्शन म्हणजे आमच्यासाठी फक्त एक Exhibition नाही, तर आमचं एक Family आहे! ❤️ आमच्या निकेत ताई आणि सरांनी आम्हाला दिलेला भरभरून प्रतिसाद, तसेच Reel कशी बनवायची, त्यात काय आणि कसं बोलायचं यापासून आम्हाला दिलेलं मार्गदर्शन—यासाठी मनापासून धन्यवाद! 🙏 या दोन दिवसांत आमच्या Exhibition ला मिळालेला फुटफॉल अप्रतिम होता आणि ग्राहकांचा प्रतिसादही खूपच सुंदर मिळाला. आनंदाची गोष्ट म्हणजे आमचा सगळा स्टॉक Stock Out झाला! 🥰✨ Thank you so much, Aangan Exhibition! ❤️ असंच आम्हाला नेहमी प्रोत्साहन देत राहा आणि आंगण Exhibition असंच पुन्हा पुन्हा भरत राहो! 🌸 Founder of Adaa jewellery shop Aasavari 🙏🙏',
  },
  {
    name: 'Priva Collection',
    context: 'Saree',
    rating: 5,
    text: 'Grateful for a beautiful experience! ✨ A special thank you to Nikita Ma’am and the entire Aangan Team for organising such a beautifully curated exhibition at Oak Banquet. ❤️ The love and response we received were truly overwhelming! From wonderful conversations to happy customers, every moment made the event special for us at PRIVA. 🥰 Your hard work and dedication created the perfect platform for us to showcase our collection and connect with so many beautiful people. Thank you so much! ❤️✨',
  },
];

const Stars = ({ rating }: { rating: number }) => (
  <span className="inline-flex shrink-0 items-center gap-0.5">
    <span className="sr-only">Rated {rating} out of 5</span>
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        aria-hidden="true"
        className={cn('h-4 w-4', i < rating ? 'fill-primary text-primary' : 'text-white/30')}
      />
    ))}
  </span>
);

// Quotes longer than this are clamped, with a "Read more" toggle on the card.
const CLAMP_AT = 260;
const PAGE_SIZE = 6;

const ReviewCard = ({ item }: { item: Testimonial }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = item.text.length > CLAMP_AT;

  return (
    <figure className="flex h-full flex-col rounded-xl border border-white/20 border-t-white/40 bg-ink/60 p-6 text-white shadow-[0_8px_32px_rgba(0,0,0,0.35)] supports-[backdrop-filter]:bg-white/10 supports-[backdrop-filter]:backdrop-blur-xl">
      <span aria-hidden="true" className="block h-7 font-display text-6xl leading-[0.8] text-primary">
        “
      </span>
      <blockquote className="mt-3 text-pretty leading-relaxed">
        <p className={cn(isLong && !expanded && 'line-clamp-6')}>{item.text}</p>
      </blockquote>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          aria-expanded={expanded}
          className="mt-1 inline-flex min-h-11 cursor-pointer items-center self-start font-semibold text-primary underline underline-offset-4 hover:text-white"
        >
          {expanded ? 'Show less' : 'Read more'}
          <span className="sr-only"> from {item.name}</span>
        </button>
      )}
      <figcaption className="mt-auto flex items-center justify-between gap-3 border-t border-white/20 pt-4">
        <span className="min-w-0">
          <span className="block truncate font-semibold">{item.name}</span>
          <span className="block truncate text-sm text-white/70">{item.context}</span>
        </span>
        <Stars rating={item.rating} />
      </figcaption>
    </figure>
  );
};

/** Equal-height grid. Remounts on tab change, so the fade-in answers the click. */
const ReviewGrid = ({ items }: { items: Testimonial[] }) => (
  <m.ul
    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: duration.base, ease: ease.out }}
  >
    {items.map((item) => (
      <li key={item.name}>
        <ReviewCard item={item} />
      </li>
    ))}
  </m.ul>
);

const triggerClass =
  'min-h-11 rounded-full px-5 text-base font-semibold text-white transition-colors duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none sm:px-7';

const Reviews = () => {
  const [stallholdersShown, setStallholdersShown] = useState(PAGE_SIZE);
  const remaining = stallholderReviews.length - stallholdersShown;

  return (
    <section className="ink-band on-ink relative isolate overflow-hidden" aria-labelledby="reviews-heading">
      <img
        src={backdrop}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[75%_70%]"
      />
      <div className="absolute inset-0 -z-10 bg-ink/70" aria-hidden="true" />
      <div className="page-wrap py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="reviews-heading" className="text-3xl text-white md:text-5xl">
            What visitors and stallholders say
          </h2>
          <p className="mt-4 text-lg text-white/80">
            In their own words, from the people who shop and sell at Aangan.
          </p>
        </div>

        <Tabs defaultValue="visitors" className="mt-10">
          <TabsList
            aria-label="Choose whose reviews to read"
            className="mx-auto flex h-auto w-fit gap-1 rounded-full border border-white/25 bg-white/10 p-1 text-white backdrop-blur-md"
          >
            <TabsTrigger value="visitors" className={triggerClass}>
              Visitors ({visitorReviews.length})
            </TabsTrigger>
            <TabsTrigger value="stallholders" className={triggerClass}>
              Stallholders ({stallholderReviews.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visitors" className="mt-10">
            <ReviewGrid items={visitorReviews} />
          </TabsContent>

          <TabsContent value="stallholders" className="mt-10">
            <ReviewGrid items={stallholderReviews.slice(0, stallholdersShown)} />
            <div className="mt-10 flex flex-col items-center gap-3 text-center">
              <p className="text-sm text-white/75" role="status">
                Showing {Math.min(stallholdersShown, stallholderReviews.length)} of {stallholderReviews.length} reviews
              </p>
              {remaining > 0 && (
                <Button variant="light" onClick={() => setStallholdersShown((count) => count + PAGE_SIZE)}>
                  Show {Math.min(PAGE_SIZE, remaining)} more reviews
                </Button>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Reviews;
