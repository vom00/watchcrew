'use client';

import { cn } from '@/lib/utils';

type ProgressVariant = 'default' | 'fire' | 'gold' | 'streak' | 'xp';
type ProgressSize = 'sm' | 'md' | 'lg';

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

const variantClasses: Record<ProgressVariant, string> = {
  default: 'bg-[#00F0FF]',
  fire: 'bg-[#FF3366]',
  gold: 'bg-[#FFB800]',
  streak: 'bg-[#39FF14]',
  xp: 'bg-[#8B5CF6]',
};

const sizeHeights: Record<ProgressSize, string> = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

export default function ProgressBar({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  showLabel = false,
  label,
  animated = true,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="text-xs font-medium text-[rgba(230,237,243,0.5)] uppercase tracking-wider">
              {label}
            </span>
          )}
          {showLabel && (
            <span className="text-xs font-semibold text-[rgba(230,237,243,0.7)]">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          'relative w-full rounded overflow-hidden bg-white/[0.04]',
          sizeHeights[size]
        )}
      >
        <div
          className={cn(
            'h-full rounded relative',
            variantClasses[variant],
            animated && 'transition-all duration-1000 ease-out'
          )}
          style={{
            width: `${percentage}%`,
            ...(animated ? { '--progress-width': `${percentage}%` } as React.CSSProperties : {}),
          }}
        >
          {/* Shimmer overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              backgroundSize: '200% 100%',
              animation: animated ? 'shimmer 2s linear infinite' : 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
}
