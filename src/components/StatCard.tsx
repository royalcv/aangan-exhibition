import type { LucideIcon } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

const StatCard = ({ icon: Icon, value, label }: StatCardProps) => {
  const { ref, display } = useCountUp(value);

  return (
    <div
      ref={ref}
      className="glass glow-border-hover reveal-item flex items-center gap-4 rounded-2xl p-6"
    >
      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-accent">
        <div className="absolute inset-0 rounded-full bg-primary/50 blur-lg animate-glow-pulse" />
        <Icon className="relative h-7 w-7 text-black" />
      </div>
      <div>
        <div className="text-3xl font-bold text-foreground">{display}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  );
};

export default StatCard;
