'use client';

import React from 'react';
import { cn, formatNumber } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

type GradientVariant = 'fire' | 'xp' | 'gold' | 'streak';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  gradient?: GradientVariant;
  trend?: 'up' | 'down';
}

const gradientTextClass: Record<GradientVariant, string> = {
  fire: 'gradient-text',
  xp: 'gradient-text-xp',
  gold: 'gradient-text-gold',
  streak: 'gradient-text-streak',
};

export default function StatCard({
  label,
  value,
  icon,
  gradient,
  trend,
}: StatCardProps) {
  const displayValue = typeof value === 'number' ? formatNumber(value) : value;

  return (
    <div className="stat-card">
      <div className="flex items-center justify-between">
        <span className="stat-card-label">{label}</span>
        {icon && (
          <span className="text-[rgba(230,237,243,0.4)]">{icon}</span>
        )}
      </div>
      <div className="flex items-end gap-2">
        <span
          className={cn(
            'stat-card-value',
            gradient ? gradientTextClass[gradient] : 'text-[#F0F6FC]'
          )}
        >
          {displayValue}
        </span>
        {trend && (
          <span
            className={cn(
              'flex items-center gap-0.5 text-xs font-medium mb-1',
              trend === 'up' ? 'text-[var(--accent-green)]' : 'text-[var(--accent-red)]'
            )}
          >
            {trend === 'up' ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
          </span>
        )}
      </div>
    </div>
  );
}
