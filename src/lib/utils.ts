// =============================================================================
// WatchCrew - Utility Functions
// =============================================================================

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names using clsx + tailwind-merge.
 * Handles conditional classes and resolves Tailwind conflicts.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a number with commas (e.g. 1000 -> "1,000").
 */
export function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

/**
 * Convert an episode count to a human-readable duration string.
 * Assumes 24 minutes per episode.
 */
export function formatHours(episodes: number): string {
  const totalMinutes = episodes * 24;
  const totalHours = totalMinutes / 60;

  if (totalHours < 24) {
    const rounded = Math.round(totalHours * 10) / 10;
    return `${rounded} hours`;
  }

  const days = Math.floor(totalHours / 24);
  const remainingHours = Math.round(totalHours % 24);

  if (remainingHours === 0) {
    return `${days} days`;
  }

  return `${days} days, ${remainingHours} hours`;
}

/**
 * Return a relative time string (e.g. "2 hours ago", "3 days ago").
 */
export function timeAgo(date: Date | string): string {
  const now = Date.now();
  const then = typeof date === 'string' ? new Date(date).getTime() : date.getTime();
  const seconds = Math.floor((now - then) / 1000);

  if (seconds < 60) return 'just now';

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;

  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? '' : 's'} ago`;
}

/**
 * Convert text to a URL-friendly slug.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncate text to a given length with an ellipsis.
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + '...';
}

/**
 * Generate a random ID string.
 */
export function getRandomId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Basic XSS sanitization: strip HTML tags from input text.
 */
export function sanitizeInput(text: string): string {
  return text.replace(/<[^>]*>/g, '');
}
