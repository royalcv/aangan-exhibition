import { Link } from 'react-router-dom';
import { LayoutGrid } from 'lucide-react';
import { Button, buttonVariants, type ButtonProps } from '@/components/ui/button';
import type { Edition } from '@/data/editions';
import { cn } from '@/lib/utils';

type Props = {
  edition: Edition;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  /** Show the grid icon before the label. */
  icon?: boolean;
  className?: string;
};

/**
 * "Check Stall Availability" for one edition. Live when the edition's `stallAvailabilityEnabled`
 * flag (src/data/editions.ts) is true; otherwise a visibly disabled "Coming Soon" button that
 * can't be clicked.
 */
const StallAvailabilityButton = ({ edition, variant = 'outline', size, icon = false, className }: Props) => {
  const where = `${edition.venue}, ${edition.city}`;

  if (edition.stallAvailabilityEnabled && edition.stallsPage) {
    return (
      <Button asChild variant={variant} size={size} className={className}>
        <Link to={edition.stallsPage}>
          {icon ? <LayoutGrid aria-hidden="true" /> : null}
          Check Stall Availability
          <span className="sr-only"> for {where}</span>
        </Link>
      </Button>
    );
  }

  return (
    <span
      role="button"
      aria-disabled="true"
      className={cn(
        buttonVariants({ variant, size }),
        'pointer-events-none cursor-not-allowed select-none border-dashed opacity-60 active:scale-100',
        className,
      )}
    >
      {icon ? <LayoutGrid aria-hidden="true" /> : null}
      Stall Availability: Coming Soon
      <span className="sr-only"> for {where}</span>
    </span>
  );
};

export default StallAvailabilityButton;
