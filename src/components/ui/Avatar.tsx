'use client';

import { cn } from '@/lib/utils';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src?: string;
  username: string;
  size?: AvatarSize;
  showLevel?: boolean;
  level?: number;
  accentColor?: string;
}

const sizeConfig: Record<AvatarSize, { container: string; text: string; levelBadge: string; levelText: string }> = {
  sm: { container: 'w-8 h-8', text: 'text-xs', levelBadge: 'w-4 h-4 -bottom-0.5 -right-0.5', levelText: 'text-xs' },
  md: { container: 'w-10 h-10', text: 'text-sm', levelBadge: 'w-5 h-5 -bottom-0.5 -right-0.5', levelText: 'text-xs' },
  lg: { container: 'w-14 h-14', text: 'text-lg', levelBadge: 'w-6 h-6 -bottom-1 -right-1', levelText: 'text-xs' },
  xl: { container: 'w-20 h-20', text: 'text-2xl', levelBadge: 'w-7 h-7 -bottom-1 -right-1', levelText: 'text-xs' },
};

function getInitials(username: string): string {
  return username
    .split(/[\s_-]+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export default function Avatar({
  src,
  username,
  size = 'md',
  showLevel = false,
  level,
  accentColor = '#00F0FF',
}: AvatarProps) {
  const config = sizeConfig[size];

  return (
    <div className="relative inline-flex flex-shrink-0">
      {/* Outer ring container — accent border + glow */}
      <div
        className={cn(
          'rounded-full p-[2px]',
          config.container
        )}
        style={accentColor !== 'none' ? {
          background: `linear-gradient(135deg, ${accentColor}, ${accentColor}88)`,
          boxShadow: `0 0 12px ${accentColor}33`,
        } : undefined}
      >
        {/* Inner circle — clips the image inside the ring */}
        <div className="w-full h-full rounded-full overflow-hidden bg-[#06060B]">
          {src ? (
            <img
              src={src}
              alt={username}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div
              className={cn(
                'w-full h-full rounded-full flex items-center justify-center text-white font-bold',
                config.text
              )}
              style={{
                background: `linear-gradient(135deg, ${accentColor}, ${accentColor}88)`,
              }}
            >
              {getInitials(username)}
            </div>
          )}
        </div>
      </div>

      {/* Level badge */}
      {showLevel && level !== undefined && (
        <div
          className={cn(
            'absolute rounded-full flex items-center justify-center font-bold border border-[var(--base-900)]',
            'bg-[#FFB800]',
            config.levelBadge,
            config.levelText
          )}
        >
          <span className="text-[var(--base-900)]">{level}</span>
        </div>
      )}
    </div>
  );
}
