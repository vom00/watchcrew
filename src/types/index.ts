// =============================================================================
// WatchCrew - Social Anime Progress Tracking Platform
// Type Definitions
// =============================================================================

// -----------------------------------------------------------------------------
// Core Enums & Literal Types
// -----------------------------------------------------------------------------

export type ProfileVisibility = 'public' | 'friends' | 'private';

export type SeriesStatus = 'airing' | 'completed';

export type WatchStatus = 'watching' | 'completed' | 'on_hold' | 'dropped' | 'plan_to_watch';

export type FriendshipStatus = 'pending' | 'accepted';

export type ActivityType =
  | 'episode_logged'
  | 'milestone_reached'
  | 'series_completed'
  | 'badge_earned'
  | 'series_started';

export type AchievementCategory = 'milestone' | 'series' | 'social' | 'streak';

// -----------------------------------------------------------------------------
// User
// -----------------------------------------------------------------------------

export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatarUrl: string;
  bannerUrl: string;
  bio: string;
  accentColor: string;
  profileTheme: string;
  customStatus: string;
  totalXP: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  totalEpisodesWatched: number;
  totalHoursWatched: number;
  seriesCompletedCount: number;
  profileVisibility: ProfileVisibility;
  lastUsernameChange: string | null;
  createdAt: string;
}

// -----------------------------------------------------------------------------
// Anime Series & Arcs
// -----------------------------------------------------------------------------

export interface Arc {
  name: string;
  startEp: number;
  endEp: number;
  isFiller: boolean;
}

export interface AnimeSeries {
  id: string;
  title: string;
  slug: string;
  posterUrl: string;
  bannerUrl: string;
  totalEpisodes: number;
  totalCanonEpisodes: number;
  status: SeriesStatus;
  genre: string[];
  description: string;
  arcs: Arc[];
}

// -----------------------------------------------------------------------------
// User Progress & Episode Logging
// -----------------------------------------------------------------------------

export interface UserProgress {
  userId: string;
  seriesId: string;
  currentEpisode: number;
  watchStatus: WatchStatus;
  startedAt: string;
  completedAt: string | null;
  lastWatchedAt: string;
  skipFiller: boolean;
  rating?: number;
}

export interface EpisodeLog {
  userId: string;
  seriesId: string;
  episodeNumber: number;
  loggedAt: string;
}

// -----------------------------------------------------------------------------
// Achievements
// -----------------------------------------------------------------------------

export interface EpisodesTotalCondition {
  type: 'episodes_total';
  count: number;
}

export interface EpisodesSeriesCondition {
  type: 'episodes_series';
  seriesId: string;
  count: number;
}

export interface SeriesCompletedCondition {
  type: 'series_completed';
  seriesId: string;
}

export interface ArcReachedCondition {
  type: 'arc_reached';
  seriesId: string;
  arcName: string;
}

export interface StreakDaysCondition {
  type: 'streak_days';
  days: number;
}

export interface FriendsCountCondition {
  type: 'friends_count';
  count: number;
}

export interface SimultaneousWatchingCondition {
  type: 'simultaneous_watching';
  count: number;
}

export interface SeriesCompletedCountCondition {
  type: 'series_completed_count';
  count: number;
}

export type AchievementCondition =
  | EpisodesTotalCondition
  | EpisodesSeriesCondition
  | SeriesCompletedCondition
  | ArcReachedCondition
  | StreakDaysCondition
  | FriendsCountCondition
  | SimultaneousWatchingCondition
  | SeriesCompletedCountCondition;

export interface Achievement {
  id: string;
  name: string;
  description: string;
  iconEmoji: string;
  xpReward: number;
  condition: AchievementCondition;
  category: AchievementCategory;
}

export interface UserAchievement {
  userId: string;
  achievementId: string;
  unlockedAt: string;
}

// -----------------------------------------------------------------------------
// Social: Friendships, Activity Feed, Reactions, Comments
// -----------------------------------------------------------------------------

export interface Friendship {
  userId: string;
  friendId: string;
  status: FriendshipStatus;
  createdAt: string;
}

export interface ActivityFeedItem {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  type: ActivityType;
  payload: Record<string, unknown>;
  createdAt: string;
}

export interface Reaction {
  feedItemId: string;
  userId: string;
  emoji: string;
}

export interface Comment {
  feedItemId: string;
  userId: string;
  username: string;
  text: string;
  createdAt: string;
}

// -----------------------------------------------------------------------------
// Leaderboard
// -----------------------------------------------------------------------------

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatarUrl: string;
  level: number;
  totalXP: number;
  accentColor: string;
}

// -----------------------------------------------------------------------------
// Clubs
// -----------------------------------------------------------------------------

export interface Club {
  id: string;
  name: string;
  description: string;
  creatorId: string;
  memberCount: number;
  bannerUrl?: string;
  createdAt: string;
}

// -----------------------------------------------------------------------------
// Otaku Rank System
// -----------------------------------------------------------------------------

export interface OtakuRank {
  name: string;
  minLevel: number;
  maxLevel: number;
}

const OTAKU_RANKS: OtakuRank[] = [
  { name: 'Genin', minLevel: 1, maxLevel: 10 },
  { name: 'Chunin', minLevel: 11, maxLevel: 25 },
  { name: 'Jonin', minLevel: 26, maxLevel: 50 },
  { name: 'Kage', minLevel: 51, maxLevel: 75 },
  { name: 'Pirate Emperor', minLevel: 76, maxLevel: 99 },
  { name: 'Anime God', minLevel: 100, maxLevel: Infinity },
];

export { OTAKU_RANKS };

// -----------------------------------------------------------------------------
// Helper Functions
// -----------------------------------------------------------------------------

/**
 * Returns the OtakuRank corresponding to a given level.
 */
export function getOtakuRank(level: number): OtakuRank {
  const rank = OTAKU_RANKS.find(
    (r) => level >= r.minLevel && level <= r.maxLevel
  );
  return rank ?? OTAKU_RANKS[0];
}

/**
 * Calculates the level for a given total XP using a sqrt-based formula.
 * Level = floor(sqrt(xp / 100))
 * Minimum level is 1.
 */
export function calculateLevel(xp: number): number {
  if (xp <= 0) return 1;
  return Math.max(1, Math.floor(Math.sqrt(xp / 100)));
}

/**
 * Returns the total XP required to reach a given level.
 * Inverse of calculateLevel: xp = level^2 * 100
 */
export function xpForLevel(level: number): number {
  return level * level * 100;
}

/**
 * Given a user's current total XP, returns leveling progress details.
 */
export function xpForNextLevel(currentXP: number): {
  currentLevel: number;
  xpIntoLevel: number;
  xpNeeded: number;
  progress: number;
} {
  const currentLevel = calculateLevel(currentXP);
  const xpAtCurrentLevel = currentLevel <= 1 ? 0 : xpForLevel(currentLevel);
  const xpAtNextLevel = xpForLevel(currentLevel + 1);
  const xpIntoLevel = currentXP - xpAtCurrentLevel;
  const xpNeeded = xpAtNextLevel - xpAtCurrentLevel;
  const progress = xpNeeded > 0 ? xpIntoLevel / xpNeeded : 0;

  return {
    currentLevel,
    xpIntoLevel,
    xpNeeded,
    progress,
  };
}
