'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore, useProgressStore } from '@/lib/stores';
import { useSocialStore } from '@/lib/stores/socialStore';
import { achievements as allAchievements, checkAchievements } from '@/lib/achievements';
import AchievementBadge from '@/components/ui/AchievementBadge';
import ProgressBar from '@/components/ui/ProgressBar';
import Badge from '@/components/ui/Badge';
import { cn, formatNumber } from '@/lib/utils';
import type { AchievementCategory, Achievement, UserAchievement } from '@/types';
import {
  Award,
  Trophy,
  Star,
  Lock,
  Unlock,
  Flame,
  Users,
  Target,
} from 'lucide-react';
import { ACHIEVEMENT_ICONS } from '@/components/ui/AchievementIcon';

// -----------------------------------------------------------------------------
// Category Filter Tabs
// -----------------------------------------------------------------------------

type FilterTab = 'all' | 'unlocked' | 'locked' | AchievementCategory;

interface TabConfig {
  key: FilterTab;
  label: string;
  icon: React.ReactNode;
}

const TABS: TabConfig[] = [
  { key: 'all', label: 'All', icon: <Trophy className="w-3.5 h-3.5" /> },
  { key: 'unlocked', label: 'Unlocked', icon: <Unlock className="w-3.5 h-3.5" /> },
  { key: 'locked', label: 'Locked', icon: <Lock className="w-3.5 h-3.5" /> },
  { key: 'milestone', label: 'Milestone', icon: <Target className="w-3.5 h-3.5" /> },
  { key: 'series', label: 'Series', icon: <Star className="w-3.5 h-3.5" /> },
  { key: 'social', label: 'Social', icon: <Users className="w-3.5 h-3.5" /> },
  { key: 'streak', label: 'Streak', icon: <Flame className="w-3.5 h-3.5" /> },
];

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function getAchievementProgress(
  achievement: Achievement,
  totalEpisodes: number,
  streakDays: number,
  watchingCount: number,
  completedCount: number,
  friendsCount: number,
): number {
  const c = achievement.condition;
  switch (c.type) {
    case 'episodes_total':
      return Math.min(1, totalEpisodes / c.count);
    case 'streak_days':
      return Math.min(1, streakDays / c.days);
    case 'simultaneous_watching':
      return Math.min(1, watchingCount / c.count);
    case 'series_completed_count':
      return Math.min(1, completedCount / c.count);
    case 'friends_count':
      return Math.min(1, friendsCount / c.count);
    default:
      return 0;
  }
}

function getCategoryColor(category: AchievementCategory): string {
  switch (category) {
    case 'milestone': return 'badge-blue';
    case 'series': return 'badge-purple';
    case 'social': return 'badge-green';
    case 'streak': return 'badge-orange';
    default: return '';
  }
}

// =============================================================================
// Achievement Wall Page
// =============================================================================

export default function AchievementsPage() {
  const router = useRouter();
  const { user, isLoggedIn, hydrated, loadFromStorage: loadUser } = useUserStore();
  const { getAllProgress, episodeLogs, loadFromStorage: loadProgress } = useProgressStore();
  const { friends, loadFromStorage: loadSocial } = useSocialStore();

  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  // Hydrate stores
  useEffect(() => {
    loadUser();
    loadProgress();
    loadSocial();
  }, [loadUser, loadProgress, loadSocial]);

  // No demo data seeding — start clean for new users

  // Redirect if not logged in
  useEffect(() => {
    if (hydrated && !isLoggedIn) {
      router.push('/');
    }
  }, [hydrated, isLoggedIn, router]);

  // ---------------------------------------------------------------------------
  // Compute unlocked achievements
  // ---------------------------------------------------------------------------

  const unlockedAchievements = useMemo<UserAchievement[]>(() => {
    const allProgress = getAllProgress();
    const acceptedFriends = friends.filter((f) => f.status === 'accepted');
    const nowUnlocked = checkAchievements(allProgress, episodeLogs, acceptedFriends, []);
    return nowUnlocked.map((a) => ({
      userId: user?.id ?? '',
      achievementId: a.id,
      unlockedAt: new Date().toISOString(),
    }));
  }, [getAllProgress, episodeLogs, friends, user]);

  const unlockedIds = useMemo(
    () => new Set(unlockedAchievements.map((a) => a.achievementId)),
    [unlockedAchievements],
  );

  const unlockedCount = unlockedIds.size;
  const totalCount = allAchievements.length;
  const completionPercent = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  // ---------------------------------------------------------------------------
  // Aggregate stats for progress computation
  // ---------------------------------------------------------------------------

  const totalEpisodes = useMemo(() => episodeLogs.length, [episodeLogs]);
  const streakDays = user?.currentStreak ?? 0;
  const watchingCount = useMemo(
    () => getAllProgress().filter((p) => p.watchStatus === 'watching').length,
    [getAllProgress],
  );
  const completedCount = useMemo(
    () => getAllProgress().filter((p) => p.watchStatus === 'completed').length,
    [getAllProgress],
  );
  const friendsCount = useMemo(
    () => friends.filter((f) => f.status === 'accepted').length,
    [friends],
  );

  // Total XP earned from achievements
  const totalAchievementXP = useMemo(() => {
    return allAchievements
      .filter((a) => unlockedIds.has(a.id))
      .reduce((sum, a) => sum + a.xpReward, 0);
  }, [unlockedIds]);

  // Rarest achievement (highest XP unlocked one)
  const rarestAchievement = useMemo(() => {
    const unlocked = allAchievements.filter((a) => unlockedIds.has(a.id));
    if (unlocked.length === 0) return null;
    return unlocked.reduce((rarest, a) => (a.xpReward > rarest.xpReward ? a : rarest));
  }, [unlockedIds]);

  // Next closest to unlock (locked, sorted by progress descending)
  const nextToUnlock = useMemo(() => {
    const locked = allAchievements.filter((a) => !unlockedIds.has(a.id));
    const withProgress = locked.map((a) => ({
      achievement: a,
      progress: getAchievementProgress(a, totalEpisodes, streakDays, watchingCount, completedCount, friendsCount),
    }));
    return withProgress
      .filter((item) => item.progress > 0)
      .sort((a, b) => b.progress - a.progress)
      .slice(0, 3);
  }, [unlockedIds, totalEpisodes, streakDays, watchingCount, completedCount, friendsCount]);

  // ---------------------------------------------------------------------------
  // Filter by tab
  // ---------------------------------------------------------------------------

  const filteredAchievements = useMemo(() => {
    switch (activeTab) {
      case 'all':
        return allAchievements;
      case 'unlocked':
        return allAchievements.filter((a) => unlockedIds.has(a.id));
      case 'locked':
        return allAchievements.filter((a) => !unlockedIds.has(a.id));
      default:
        return allAchievements.filter((a) => a.category === activeTab);
    }
  }, [activeTab, unlockedIds]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (!hydrated || !isLoggedIn || !user) return null;

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* ------------------------------------------------------------------- */}
      {/* Header                                                               */}
      {/* ------------------------------------------------------------------- */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Award className="w-7 h-7 text-[var(--accent-gold)]" />
          <h1 className="text-3xl font-bold font-[family-name:'Rajdhani'] uppercase tracking-wide text-[#ECEEF5]">
            Achievement Wall
          </h1>
          <Badge
            text={`${unlockedCount} / ${totalCount} Unlocked`}
            variant="gold"
            size="sm"
          />
        </div>
        <p className="text-sm text-[#9899A8]">
          Track your milestones, collect badges, and earn XP for your anime journey.
        </p>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* Overall Completion Progress Bar                                      */}
      {/* ------------------------------------------------------------------- */}
      <div className="glass-card p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium text-[#9899A8] uppercase tracking-wider">
            Overall Achievement Progress
          </p>
          <span className="text-sm font-bold text-[#ECEEF5]">{completionPercent}%</span>
        </div>
        <ProgressBar
          value={unlockedCount}
          max={totalCount}
          variant="gold"
          size="lg"
        />
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* Stats Section                                                        */}
      {/* ------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* Total XP from achievements */}
        <div className="glass-card p-5 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-gold)]/20 to-[var(--accent-orange)]/20 flex items-center justify-center">
            <Star className="w-6 h-6 text-[var(--accent-gold)]" />
          </div>
          <div>
            <p className="text-xs font-medium text-[#9899A8] uppercase tracking-wider">
              Achievement XP
            </p>
            <p className="text-2xl font-bold font-[family-name:'Rajdhani'] uppercase tracking-wide gradient-text-gold">
              {formatNumber(totalAchievementXP)} XP
            </p>
          </div>
        </div>

        {/* Rarest achievement */}
        <div className="glass-card p-5 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-purple)]/20 to-[var(--accent-blue)]/20 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-[var(--accent-purple)]" />
          </div>
          <div>
            <p className="text-xs font-medium text-[#9899A8] uppercase tracking-wider">
              Rarest Badge
            </p>
            <p className="text-sm font-semibold text-[#ECEEF5]">
              {rarestAchievement ? (
                <span className="flex items-center gap-1.5">
                  {(() => {
                    const RarestIcon = ACHIEVEMENT_ICONS[rarestAchievement.id];
                    return RarestIcon ? <RarestIcon size={18} /> : <span>{rarestAchievement.iconEmoji}</span>;
                  })()}
                  {rarestAchievement.name}
                </span>
              ) : (
                <span className="text-[rgba(200,202,216,0.5)]">None yet</span>
              )}
            </p>
          </div>
        </div>

        {/* Next closest to unlock */}
        <div className="glass-card p-5 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-blue)]/20 to-[var(--accent-green)]/20 flex items-center justify-center">
            <Target className="w-6 h-6 text-[var(--accent-blue)]" />
          </div>
          <div>
            <p className="text-xs font-medium text-[#9899A8] uppercase tracking-wider">
              Next Unlock
            </p>
            <p className="text-sm font-semibold text-[#ECEEF5]">
              {nextToUnlock.length > 0 ? (
                <span className="flex items-center gap-1.5">
                  {(() => {
                    const NextIcon = ACHIEVEMENT_ICONS[nextToUnlock[0].achievement.id];
                    return NextIcon ? <NextIcon size={18} /> : <span>{nextToUnlock[0].achievement.iconEmoji}</span>;
                  })()}
                  {nextToUnlock[0].achievement.name}
                  <span className="text-xs text-[var(--accent-blue)] ml-1">
                    ({Math.round(nextToUnlock[0].progress * 100)}%)
                  </span>
                </span>
              ) : (
                <span className="text-[rgba(200,202,216,0.5)]">Keep watching!</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* Filter Tabs                                                          */}
      {/* ------------------------------------------------------------------- */}
      <div className="flex flex-wrap gap-2 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] text-xs font-medium transition-all duration-200',
              activeTab === tab.key
                ? 'bg-[var(--accent-blue)]/15 text-[var(--accent-blue)] border border-[var(--accent-blue)]/40 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                : 'glass-button text-[rgba(200,202,216,0.6)] hover:text-[rgba(200,202,216,0.9)]',
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* Achievement Grid                                                     */}
      {/* ------------------------------------------------------------------- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredAchievements.map((achievement) => {
          const isUnlocked = unlockedIds.has(achievement.id);

          return (
            <div
              key={achievement.id}
              className={cn(
                'glass-card-hover p-4 flex flex-col items-center gap-3 text-center transition-all duration-500 relative overflow-hidden',
                isUnlocked && 'border-[var(--accent-gold)]/10',
              )}
            >
              {/* Subtle glow background for unlocked */}
              {isUnlocked && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-gold)]/[0.03] via-transparent to-[var(--accent-orange)]/[0.03]" />
                </div>
              )}

              <div className="relative z-10">
                <AchievementBadge
                  achievement={achievement}
                  unlocked={isUnlocked}
                  size="lg"
                />
              </div>

              <div className="w-full relative z-10">
                <p
                  className={cn(
                    'text-sm font-semibold truncate',
                    isUnlocked ? 'text-[#ECEEF5]' : 'text-[rgba(200,202,216,0.5)]',
                  )}
                >
                  {achievement.name}
                </p>

                <p className="text-xs text-[rgba(200,202,216,0.55)] mt-0.5 leading-tight px-1">
                  {achievement.description}
                </p>

                {isUnlocked ? (
                  <div className="mt-2">
                    <p className="text-xs text-[var(--accent-gold)] font-bold">
                      +{formatNumber(achievement.xpReward)} XP
                    </p>
                  </div>
                ) : (
                  <div className="mt-2 flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1 text-[rgba(200,202,216,0.5)]">
                      <Lock className="w-3 h-3" />
                      <span className="text-xs">Locked</span>
                    </div>
                    <p className="text-xs text-[rgba(200,202,216,0.45)]">
                      +{formatNumber(achievement.xpReward)} XP
                    </p>
                  </div>
                )}

                {/* Category badge */}
                <div className="mt-2">
                  <span className={cn('badge text-xs px-1.5 py-0.5', getCategoryColor(achievement.category))}>
                    {achievement.category}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {filteredAchievements.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--glass-light)] flex items-center justify-center mb-4">
            <Award className="w-8 h-8 text-[rgba(200,202,216,0.2)]" />
          </div>
          <h3 className="text-base font-semibold text-[#ECEEF5] mb-1 font-[family-name:'Rajdhani'] uppercase tracking-wide">
            No achievements in this category
          </h3>
          <p className="text-sm text-[rgba(200,202,216,0.5)]">
            Try selecting a different filter.
          </p>
        </div>
      )}
    </div>
  );
}
