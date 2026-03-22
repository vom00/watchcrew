'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Lock, Award } from 'lucide-react';
import type { Achievement } from '@/types';
import { ACHIEVEMENT_ICONS } from './AchievementIcon';

type BadgeSize = 'sm' | 'md' | 'lg';

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked: boolean;
  size?: BadgeSize;
  showDetails?: boolean;
}

const sizeConfig: Record<BadgeSize, { container: string; iconSize: number; lockIcon: number; glow: string }> = {
  sm: { container: 'w-12 h-12', iconSize: 24, lockIcon: 12, glow: '0 0 8px' },
  md: { container: 'w-[4.5rem] h-[4.5rem]', iconSize: 36, lockIcon: 16, glow: '0 0 16px' },
  lg: { container: 'w-24 h-24', iconSize: 48, lockIcon: 20, glow: '0 0 24px' },
};

// Category-based accent colors for the badge ring
const categoryColors: Record<string, { ring: string; glow: string }> = {
  milestone: { ring: '#00F0FF', glow: 'rgba(0,240,255,0.25)' },
  series: { ring: '#8B5CF6', glow: 'rgba(139,92,246,0.25)' },
  social: { ring: '#39FF14', glow: 'rgba(57,255,20,0.25)' },
  streak: { ring: '#FF8C00', glow: 'rgba(255,140,0,0.25)' },
};

export default function AchievementBadge({
  achievement,
  unlocked,
  size = 'md',
  showDetails = false,
}: AchievementBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const config = sizeConfig[size];
  const colors = categoryColors[achievement.category] || categoryColors.milestone;
  const IconComponent = ACHIEVEMENT_ICONS[achievement.id];

  const badgeCircle = (
    <div
      className={cn(
        'relative rounded-full flex items-center justify-center transition-all duration-500',
        config.container,
        unlocked
          ? 'bg-[#13131F]'
          : 'bg-[#0C0C16]/80 border border-white/[0.06]'
      )}
    >
      {/* SVG Icon or generic fallback */}
      {IconComponent ? (
        <div className={cn('transition-all duration-500', !unlocked && 'opacity-20 saturate-0 brightness-50')}>
          <IconComponent size={config.iconSize} />
        </div>
      ) : (
        <Award
          className={cn('w-6 h-6 text-[#ECEEF5]', !unlocked && 'opacity-20 grayscale')}
        />
      )}

      {/* Lock overlay for locked badges */}
      {!unlocked && (
        <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/30">
          <Lock className="text-[rgba(230,237,243,0.3)]" size={config.lockIcon} />
        </div>
      )}
    </div>
  );

  return (
    <div
      className="relative inline-flex flex-col items-center gap-1.5"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {unlocked ? (
        /* Glowing gradient ring for unlocked badges */
        <div
          className="rounded-full p-[2px] transition-all duration-500"
          style={{
            background: colors.ring,
            boxShadow: `${config.glow} ${colors.glow}`,
          }}
        >
          {badgeCircle}
        </div>
      ) : (
        /* No ring for locked badges */
        badgeCircle
      )}

      {/* Details below badge */}
      {showDetails && (
        <div className="text-center max-w-[120px]">
          <p className="text-xs font-semibold text-[#ECEEF5] truncate">
            {achievement.name}
          </p>
          <p className="text-xs text-[rgba(200,202,216,0.4)] leading-tight">
            {unlocked ? `+${achievement.xpReward} XP` : achievement.description}
          </p>
        </div>
      )}

      {/* Hover tooltip */}
      {showTooltip && !showDetails && (
        <div className="absolute bottom-full mb-2 z-50 pointer-events-none">
          <div className="glass-card px-3 py-2 text-center whitespace-nowrap">
            <p className="text-xs font-semibold text-[#ECEEF5]">
              {achievement.name}
            </p>
            <p className="text-xs text-[#9899A8] mt-0.5">
              {unlocked ? `Unlocked! +${achievement.xpReward} XP` : achievement.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
