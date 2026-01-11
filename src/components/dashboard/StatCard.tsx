import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  iconColor?: string;
  iconBgColor?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  change,
  changeType = 'neutral',
  iconColor = 'text-primary',
  iconBgColor = 'bg-primary/10',
}: StatCardProps) {
  return (
    <div className="medical-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-heading font-bold">{value}</p>
          {change && (
            <p className={cn(
              'text-sm mt-2 font-medium',
              changeType === 'positive' && 'text-success',
              changeType === 'negative' && 'text-destructive',
              changeType === 'neutral' && 'text-muted-foreground'
            )}>
              {change}
            </p>
          )}
        </div>
        <div className={cn('stat-icon', iconBgColor)}>
          <Icon className={cn('w-6 h-6', iconColor)} />
        </div>
      </div>
    </div>
  );
}
