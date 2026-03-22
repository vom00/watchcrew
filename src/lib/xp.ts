// =============================================================================
// WatchCrew - XP & Leveling System
// =============================================================================

export { calculateLevel, xpForLevel, xpForNextLevel } from '@/types';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Base XP earned per episode watched. */
export const XP_PER_EPISODE = 10;

/** Streak thresholds and their XP multipliers. */
export const STREAK_MULTIPLIERS: Record<number, number> = {
  3: 1.5,
  7: 2.0,
  30: 3.0,
};

// ---------------------------------------------------------------------------
// Episode XP
// ---------------------------------------------------------------------------

/**
 * Get the active streak multiplier and its label for a given streak length.
 */
export function getStreakMultiplier(streakDays: number): {
  multiplier: number;
  label: string;
} {
  if (streakDays >= 30) return { multiplier: 3.0, label: '30-day streak (3x)' };
  if (streakDays >= 7) return { multiplier: 2.0, label: '7-day streak (2x)' };
  if (streakDays >= 3) return { multiplier: 1.5, label: '3-day streak (1.5x)' };
  return { multiplier: 1.0, label: 'No streak bonus' };
}

/**
 * Calculate XP earned for a single episode, factoring in the current streak.
 */
export function calculateEpisodeXP(streakDays: number): number {
  const { multiplier } = getStreakMultiplier(streakDays);
  return Math.round(XP_PER_EPISODE * multiplier);
}

// ---------------------------------------------------------------------------
// Arc Completion XP
// ---------------------------------------------------------------------------

/**
 * Calculate bonus XP for completing an arc based on its length (number of episodes).
 * Range: 500 XP (short arcs) to 2000 XP (very long arcs).
 */
export function arcCompletionXP(arcEpisodes: number): number {
  if (arcEpisodes <= 10) return 500;
  if (arcEpisodes <= 30) return 750;
  if (arcEpisodes <= 60) return 1000;
  if (arcEpisodes <= 100) return 1500;
  return 2000;
}

// ---------------------------------------------------------------------------
// Series Completion XP
// ---------------------------------------------------------------------------

/**
 * Calculate bonus XP for completing an entire series based on total episode count.
 * Range: 5000 XP (short series) to 25000 XP (1000+ episode series).
 */
export function seriesCompletionXP(totalEpisodes: number): number {
  if (totalEpisodes <= 50) return 5000;
  if (totalEpisodes <= 100) return 7500;
  if (totalEpisodes <= 200) return 10000;
  if (totalEpisodes <= 500) return 15000;
  if (totalEpisodes <= 1000) return 20000;
  return 25000;
}
