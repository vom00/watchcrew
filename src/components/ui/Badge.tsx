'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'orange' | 'green' | 'blue' | 'gold' | 'purple' | 'red' | 'default';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  orange: 'badge-orange',
  green: 'badge-green',
  blue: 'badge-blue',
  gold: 'badge-gold',
  purple: 'badge-purple',
  red: 'badge-red',
  default: '',
};

export default function Badge({
  text,
  variant = 'default',
  size = 'md',
  icon,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'badge',
        variantClasses[variant],
        size === 'sm' && 'text-[0.6875rem] px-2 py-0.5'
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {text}
    </span>
  );
}
