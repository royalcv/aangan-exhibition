import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { site } from '@/data/site';

/** Invites visitors to leave a Google review. Shared by Home, About and Contact. */
const GoogleReviewCta = () => (
  <section className="border-y border-border bg-background" aria-labelledby="google-review-heading">
    <div className="page-wrap flex flex-col items-center py-14 text-center md:py-20">
      <div className="flex gap-1" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className="h-7 w-7 fill-primary text-primary" />
        ))}
      </div>
      <h2 id="google-review-heading" className="mt-5 max-w-2xl text-3xl md:text-4xl">
        Been to Aangan? Tell others about it
      </h2>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        A Google review helps more shoppers and families in Amravati find us, and helps us make every edition better.
      </p>
      <Button asChild size="lg" className="mt-8">
        <a href={site.googleReview} target="_blank" rel="noopener noreferrer">
          <Star className="fill-current" aria-hidden="true" />
          Review us on Google
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </Button>
    </div>
  </section>
);

export default GoogleReviewCta;
