'use client';

import { useEffect, useState } from 'react';
import { cn, formatNumber } from '@/lib/utils';
import { getOtakuRank, xpForNextLevel } from '@/types';
import { Zap } from 'lucide-react';
import ProgressBar from './ProgressBar';

interface XPCounterProps {
  currentXP: number;
  targetXP: number;
  level: number;
  animated?: boolean;
}

export default function XPCounter({
  currentXP,
  targetXP,
  level,
  animated = true,
}: XPCounterProps) {
  const [displayXP, setDisplayXP] = useState(animated ? 0 : currentXP);
  const rank = getOtakuRank(level);
  const levelProgress = xpForNextLevel(currentXP);

  // Animated roll-up effect
  useEffect(() => {
    if (!animated) {
      setDisplayXP(currentXP);
      return;
    }

    const duration = 1500;
    const startTime = Date.now();
    const startXP = displayXP;
    const diff = currentXP - startXP;

    if (diff === 0) return;

    const frame = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayXP(Math.round(startXP + diff * eased));

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };

    requestAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentXP, animated]);

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded flex items-center justify-center bg-[#00F0FF]/15">
            <Zap className="w-4 h-4 text-[#00F0FF]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#ECEEF5] font-[family-name:'Rajdhani'] uppercase tracking-wide">
              Level {level}
            </p>
            <p className="text-xs font-medium text-[#FFB800] uppercase tracking-wider">
              {rank.name}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold gradient-text-xp font-[family-name:'Rajdhani']">
            {formatNumber(displayXP)} XP
          </p>
          <p className="text-xs text-[rgba(200,202,216,0.6)]">
            {formatNumber(levelProgress.xpIntoLevel)} / {formatNumber(levelProgress.xpNeeded)} to next
          </p>
        </div>
      </div>

      <ProgressBar
        value={levelProgress.xpIntoLevel}
        max={levelProgress.xpNeeded}
        variant="xp"
        size="sm"
        animated={animated}
      />
    </div>
  );
}
