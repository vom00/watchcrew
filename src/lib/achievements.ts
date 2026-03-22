// =============================================================================
// WatchCrew - Achievement Definitions & Checking Engine
// =============================================================================

import type {
  Achievement,
  UserProgress,
  EpisodeLog,
  Friendship,
  UserAchievement,
} from '@/types';

// ---------------------------------------------------------------------------
// Achievement Definitions
// ---------------------------------------------------------------------------

export const achievements: Achievement[] = [
  // -------------------------------------------------------------------------
  // Milestone: Episode Count
  // -------------------------------------------------------------------------
  {
    id: 'first_episode',
    name: 'And So It Begins',
    description: 'Watch your very first episode',
    iconEmoji: '🌟',
    xpReward: 50,
    condition: { type: 'episodes_total', count: 1 },
    category: 'milestone',
  },
  {
    id: 'episodes_20',
    name: 'Getting Hooked',
    description: 'Watch 20 episodes of any series',
    iconEmoji: '🎣',
    xpReward: 200,
    condition: { type: 'episodes_total', count: 20 },
    category: 'milestone',
  },
  {
    id: 'episodes_50',
    name: 'No Turning Back',
    description: 'Watch 50 episodes of any series',
    iconEmoji: '🔥',
    xpReward: 500,
    condition: { type: 'episodes_total', count: 50 },
    category: 'milestone',
  },
  {
    id: 'episodes_100',
    name: 'Century Club',
    description: 'Watch 100 episodes',
    iconEmoji: '💯',
    xpReward: 1000,
    condition: { type: 'episodes_total', count: 100 },
    category: 'milestone',
  },
  {
    id: 'episodes_200',
    name: 'Dedicated Viewer',
    description: 'Watch 200 episodes',
    iconEmoji: '📺',
    xpReward: 2000,
    condition: { type: 'episodes_total', count: 200 },
    category: 'milestone',
  },
  {
    id: 'episodes_500',
    name: 'Marathon Runner',
    description: 'Watch 500 episodes',
    iconEmoji: '🏃',
    xpReward: 5000,
    condition: { type: 'episodes_total', count: 500 },
    category: 'milestone',
  },
  {
    id: 'episodes_1000',
    name: 'Thousand Episode Legend',
    description: 'Watch 1,000 episodes across all series',
    iconEmoji: '👑',
    xpReward: 10000,
    condition: { type: 'episodes_total', count: 1000 },
    category: 'milestone',
  },

  // -------------------------------------------------------------------------
  // Milestone: Streaks
  // -------------------------------------------------------------------------
  {
    id: 'streak_7',
    name: 'Consistent Viewer',
    description: 'Maintain a 7-day watching streak',
    iconEmoji: '🔗',
    xpReward: 500,
    condition: { type: 'streak_days', days: 7 },
    category: 'streak',
  },
  {
    id: 'streak_30',
    name: 'Unstoppable',
    description: 'Maintain a 30-day watching streak',
    iconEmoji: '⚡',
    xpReward: 3000,
    condition: { type: 'streak_days', days: 30 },
    category: 'streak',
  },
  {
    id: 'streak_365',
    name: 'Year of Anime',
    description: 'Maintain a 365-day watching streak',
    iconEmoji: '🗓️',
    xpReward: 25000,
    condition: { type: 'streak_days', days: 365 },
    category: 'streak',
  },

  // -------------------------------------------------------------------------
  // Milestone: Simultaneous Watching & Completion
  // -------------------------------------------------------------------------
  {
    id: 'multi_tracker',
    name: 'Multi-Tracker',
    description: 'Watch 5 series simultaneously',
    iconEmoji: '🎯',
    xpReward: 1000,
    condition: { type: 'simultaneous_watching', count: 5 },
    category: 'milestone',
  },
  {
    id: 'first_completed',
    name: 'Finisher',
    description: 'Complete your first series',
    iconEmoji: '🏁',
    xpReward: 2000,
    condition: { type: 'series_completed_count', count: 1 },
    category: 'milestone',
  },
  {
    id: 'completed_5',
    name: 'Completionist',
    description: 'Complete 5 series',
    iconEmoji: '🏆',
    xpReward: 5000,
    condition: { type: 'series_completed_count', count: 5 },
    category: 'milestone',
  },
  {
    id: 'completed_10',
    name: 'Anime Veteran',
    description: 'Complete 10 series',
    iconEmoji: '🎖️',
    xpReward: 10000,
    condition: { type: 'series_completed_count', count: 10 },
    category: 'milestone',
  },

  // -------------------------------------------------------------------------
  // Social
  // -------------------------------------------------------------------------
  {
    id: 'nakama_collector',
    name: 'Nakama Collector',
    description: 'Add 10 friends to your crew',
    iconEmoji: '🤝',
    xpReward: 500,
    condition: { type: 'friends_count', count: 10 },
    category: 'social',
  },

  // -------------------------------------------------------------------------
  // Series-Specific: Completion
  // -------------------------------------------------------------------------
  {
    id: 'king_of_pirates',
    name: 'King of the Pirates',
    description: 'Complete One Piece',
    iconEmoji: '🏴‍☠️',
    xpReward: 25000,
    condition: { type: 'series_completed', seriesId: 'one-piece' },
    category: 'series',
  },
  {
    id: 'hokage',
    name: 'Hokage',
    description: 'Complete Naruto and Naruto Shippuden',
    iconEmoji: '🍥',
    xpReward: 20000,
    condition: { type: 'series_completed', seriesId: 'naruto-shippuden' },
    category: 'series',
  },
  {
    id: 'soul_reaper_captain',
    name: 'Soul Reaper Captain',
    description: 'Complete Bleach',
    iconEmoji: '⚔️',
    xpReward: 15000,
    condition: { type: 'series_completed', seriesId: 'bleach' },
    category: 'series',
  },

  // -------------------------------------------------------------------------
  // Series-Specific: Arc Milestones
  // -------------------------------------------------------------------------
  {
    id: 'paramount_war_survivor',
    name: 'Paramount War Survivor',
    description: 'Reach the Marineford arc in One Piece',
    iconEmoji: '🌊',
    xpReward: 5000,
    condition: { type: 'arc_reached', seriesId: 'one-piece', arcName: 'Marineford' },
    category: 'series',
  },
  {
    id: 'sage_mode_unlocked',
    name: 'Sage Mode Unlocked',
    description: 'Reach the Pain arc in Naruto Shippuden',
    iconEmoji: '🐸',
    xpReward: 5000,
    condition: { type: 'arc_reached', seriesId: 'naruto-shippuden', arcName: 'Pain' },
    category: 'series',
  },
  {
    id: 'bankai_awakened',
    name: 'Bankai Awakened',
    description: 'Reach the Soul Society arc in Bleach',
    iconEmoji: '🗡️',
    xpReward: 3000,
    condition: { type: 'arc_reached', seriesId: 'bleach', arcName: 'Soul Society' },
    category: 'series',
  },
  {
    id: 'ultra_instinct',
    name: 'Ultra Instinct',
    description: 'Reach the Tournament of Power in Dragon Ball Super',
    iconEmoji: '✨',
    xpReward: 5000,
    condition: { type: 'arc_reached', seriesId: 'dragon-ball-super', arcName: 'Tournament of Power' },
    category: 'series',
  },
];

// ---------------------------------------------------------------------------
// Lookup Helper
// ---------------------------------------------------------------------------

/**
 * Find an achievement by its ID.
 */
export function getAchievementById(id: string): Achievement | undefined {
  return achievements.find((a) => a.id === id);
}

// ---------------------------------------------------------------------------
// Achievement Checking Engine
// ---------------------------------------------------------------------------

/**
 * Check all achievement conditions against current user state.
 * Returns an array of newly unlocked achievements (those not already in
 * `existingAchievements`).
 */
export function checkAchievements(
  userProgress: UserProgress[],
  episodeLogs: EpisodeLog[],
  friends: Friendship[],
  existingAchievements: UserAchievement[]
): Achievement[] {
  const unlockedIds = new Set(existingAchievements.map((a) => a.achievementId));
  const newlyUnlocked: Achievement[] = [];

  // Pre-compute aggregate stats
  const totalEpisodes = episodeLogs.length;
  const watchingCount = userProgress.filter((p) => p.watchStatus === 'watching').length;
  const completedCount = userProgress.filter((p) => p.watchStatus === 'completed').length;
  const acceptedFriends = friends.filter((f) => f.status === 'accepted').length;

  // Compute current streak from episode logs
  const currentStreak = computeStreak(episodeLogs);

  // Build a map of seriesId -> max episode watched
  const seriesMaxEpisode = new Map<string, number>();
  for (const log of episodeLogs) {
    const current = seriesMaxEpisode.get(log.seriesId) ?? 0;
    if (log.episodeNumber > current) {
      seriesMaxEpisode.set(log.seriesId, log.episodeNumber);
    }
  }

  for (const achievement of achievements) {
    if (unlockedIds.has(achievement.id)) continue;

    const met = isConditionMet(achievement, {
      totalEpisodes,
      watchingCount,
      completedCount,
      acceptedFriends,
      currentStreak,
      seriesMaxEpisode,
      userProgress,
    });

    if (met) {
      newlyUnlocked.push(achievement);
    }
  }

  return newlyUnlocked;
}

// ---------------------------------------------------------------------------
// Internal Helpers
// ---------------------------------------------------------------------------

interface AggregateStats {
  totalEpisodes: number;
  watchingCount: number;
  completedCount: number;
  acceptedFriends: number;
  currentStreak: number;
  seriesMaxEpisode: Map<string, number>;
  userProgress: UserProgress[];
}

function isConditionMet(achievement: Achievement, stats: AggregateStats): boolean {
  const c = achievement.condition;

  switch (c.type) {
    case 'episodes_total':
      return stats.totalEpisodes >= c.count;

    case 'episodes_series': {
      const max = stats.seriesMaxEpisode.get(c.seriesId) ?? 0;
      return max >= c.count;
    }

    case 'series_completed': {
      const progress = stats.userProgress.find((p) => p.seriesId === c.seriesId);
      return progress?.watchStatus === 'completed';
    }

    case 'arc_reached': {
      // We import anime data dynamically to avoid circular deps at module level.
      // For the check, we look up the arc's startEp and compare with the user's
      // current episode for that series.
      const max = stats.seriesMaxEpisode.get(c.seriesId) ?? 0;
      // Arc-reached is satisfied when the user has watched at least the arc's
      // starting episode. The actual arc start is resolved by the caller or
      // looked up from series data. As a fallback we just check if they have
      // any episodes for that series (the real check uses anime data below).
      return checkArcReached(c.seriesId, c.arcName, max);
    }

    case 'streak_days':
      return stats.currentStreak >= c.days;

    case 'friends_count':
      return stats.acceptedFriends >= c.count;

    case 'simultaneous_watching':
      return stats.watchingCount >= c.count;

    case 'series_completed_count':
      return stats.completedCount >= c.count;

    default:
      return false;
  }
}

/**
 * Check whether the user has reached a named arc in a series.
 * Tries to dynamically resolve the arc start episode from @/data/anime.
 * Falls back to known hard-coded values for the key arcs.
 */
function checkArcReached(seriesId: string, arcName: string, maxEpisode: number): boolean {
  // Hard-coded arc start episodes for well-known achievements.
  // These match the canonical episode numbers for each arc.
  const knownArcStarts: Record<string, Record<string, number>> = {
    'one-piece': {
      Marineford: 459,
    },
    'naruto-shippuden': {
      Pain: 152,
    },
    bleach: {
      'Soul Society': 21,
    },
    'dragon-ball-super': {
      'Tournament of Power': 97,
    },
  };

  const arcStart = knownArcStarts[seriesId]?.[arcName];
  if (arcStart !== undefined) {
    return maxEpisode >= arcStart;
  }

  // If we don't have a hard-coded value, we can't verify the arc.
  return false;
}

/**
 * Compute the current daily watching streak from episode logs.
 * A streak counts consecutive days (going backwards from today) on which
 * at least one episode was logged.
 */
function computeStreak(episodeLogs: EpisodeLog[]): number {
  if (episodeLogs.length === 0) return 0;

  // Collect unique watch dates (YYYY-MM-DD)
  const watchDates = new Set<string>();
  for (const log of episodeLogs) {
    const date = new Date(log.loggedAt);
    watchDates.add(date.toISOString().slice(0, 10));
  }

  // Walk backwards from today
  const today = new Date();
  let streak = 0;
  const current = new Date(today);

  // Allow today to not yet have a log (streak still valid from yesterday)
  const todayKey = current.toISOString().slice(0, 10);
  if (!watchDates.has(todayKey)) {
    current.setDate(current.getDate() - 1);
  }

  while (true) {
    const key = current.toISOString().slice(0, 10);
    if (!watchDates.has(key)) break;
    streak++;
    current.setDate(current.getDate() - 1);
  }

  return streak;
}
