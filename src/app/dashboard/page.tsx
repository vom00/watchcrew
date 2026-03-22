'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Tv,
  Clock,
  Flame,
  CheckCircle,
  Trophy,
  Users,
  Play,
  Plus,
  Minus,
  Check,
  Compass,
  ChevronRight,
  Zap,
  Target,
  TrendingUp,
  BarChart3,
  Eye,
} from 'lucide-react';
import { useUserStore, useProgressStore, useSocialStore } from '@/lib/stores';
import { animeDatabase } from '@/data/anime';
import {
  achievements as allAchievements,
  getAchievementById,
} from '@/lib/achievements';
import { getItem, STORAGE_KEYS } from '@/lib/storage';
import type { UserAchievement, AnimeSeries, UserProgress } from '@/types';
import { xpForNextLevel, getOtakuRank } from '@/types';
import { formatNumber, formatHours, timeAgo } from '@/lib/utils';

import ActivityItem from '@/components/ui/ActivityItem';
import AchievementBadge from '@/components/ui/AchievementBadge';
import ProgressBar from '@/components/ui/ProgressBar';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';

// =============================================================================
// Mini Episode Logger (inline, for the dashboard)
// =============================================================================

function MiniLogger({
  seriesId,
  series,
  progress,
  onLog,
}: {
  seriesId: string;
  series: AnimeSeries;
  progress: UserProgress;
  onLog: (seriesId: string, episode: number) => void;
}) {
  const [justLogged, setJustLogged] = useState(false);
  const pct =
    series.totalEpisodes > 0
      ? (progress.currentEpisode / series.totalEpisodes) * 100
      : 0;

  const handleQuickLog = () => {
    if (progress.currentEpisode >= series.totalEpisodes) return;
    const next = progress.currentEpisode + 1;
    onLog(seriesId, next);
    setJustLogged(true);
    setTimeout(() => setJustLogged(false), 1200);
  };

  return (
    <div className="group relative flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-[#00F0FF]/20 hover:bg-white/[0.04] transition-all duration-300">
      {/* Poster thumbnail */}
      <div className="w-11 h-14 rounded overflow-hidden flex-shrink-0 bg-[#10101C] border border-white/[0.06]">
        {series.posterUrl ? (
          <img
            src={series.posterUrl}
            alt={series.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/10 text-lg font-bold font-[family-name:'Rajdhani']">
            {series.title.charAt(0)}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/library/${series.slug}`}
          className="text-sm font-semibold text-[#ECEEF5] truncate block hover:text-[#00F0FF] transition-colors no-underline"
        >
          {series.title}
        </Link>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-[#8687A0]">
            EP {progress.currentEpisode} / {series.totalEpisodes}
          </span>
          <span className="text-xs text-[#8687A0]">·</span>
          <span className="text-xs font-medium text-[#B0B1C0]">
            {Math.round(pct)}%
          </span>
        </div>
        <div className="mt-1.5">
          <ProgressBar
            value={progress.currentEpisode}
            max={series.totalEpisodes}
            variant="fire"
            size="sm"
            animated={false}
          />
        </div>
      </div>

      {/* Quick log +1 button */}
      <button
        onClick={handleQuickLog}
        disabled={
          progress.currentEpisode >= series.totalEpisodes || justLogged
        }
        className={`
          flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300
          ${
            justLogged
              ? 'bg-[#39FF14]/15 border border-[#39FF14]/30 text-[#39FF14]'
              : 'bg-[#00F0FF]/10 border border-[#00F0FF]/25 text-[#00F0FF] hover:bg-[#00F0FF]/20 hover:border-[#00F0FF]/40 hover:shadow-[0_0_12px_rgba(0,240,255,0.15)]'
          }
          disabled:opacity-40 disabled:cursor-not-allowed
        `}
        title={justLogged ? 'Logged!' : `Log episode ${progress.currentEpisode + 1}`}
      >
        {justLogged ? (
          <Check className="w-4 h-4" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}

// =============================================================================
// Circular Progress Ring
// =============================================================================

function ProgressRing({
  percentage,
  size = 80,
  strokeWidth = 5,
  color = '#00F0FF',
  children,
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  children?: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{ filter: `drop-shadow(0 0 6px ${color}40)` }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

// =============================================================================
// Dashboard Page
// =============================================================================

export default function DashboardPage() {
  const router = useRouter();
  const {
    user,
    isLoggedIn,
    hydrated,
    loadFromStorage: loadUser,
    incrementEpisodesWatched,
    addXP,
  } = useUserStore();
  const {
    progress,
    loadFromStorage: loadProgress,
    setProgress,
    startSeries,
    getAllProgress,
    getTotalEpisodesWatched,
    getCompletedCount,
  } = useProgressStore();
  const {
    activityFeed,
    friends,
    loadFromStorage: loadSocial,
    seedDemoData,
    addReaction,
    addComment,
  } = useSocialStore();

  // ---------------------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------------------

  useEffect(() => {
    loadUser();
    loadProgress();
    loadSocial();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (activityFeed.length === 0 && friends.length === 0) {
      seedDemoData();
    }
    const allProg = getAllProgress();
    if (allProg.length === 0) {
      const demoSeries = ['one-piece', 'naruto-shippuden', 'bleach'];
      demoSeries.forEach((id) => startSeries(id));
      setTimeout(() => {
        setProgress('one-piece', 125);
        setProgress('naruto-shippuden', 80);
        setProgress('bleach', 45);
      }, 100);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (hydrated && !isLoggedIn) {
      router.push('/');
    }
  }, [hydrated, isLoggedIn, router]);

  if (!hydrated || !isLoggedIn || !user) return null;

  // ---------------------------------------------------------------------------
  // Computed Data
  // ---------------------------------------------------------------------------

  const allProgressArr = getAllProgress();
  const watchingList = allProgressArr.filter((p) => p.watchStatus === 'watching');
  const totalEps = getTotalEpisodesWatched();
  const completedCount = getCompletedCount();
  const hoursWatched = Math.round((totalEps * 24) / 60 * 10) / 10;

  const seriesMap = new Map<string, AnimeSeries>();
  animeDatabase.forEach((s) => seriesMap.set(s.id, s));

  const unlockedAchievements: UserAchievement[] =
    typeof window !== 'undefined'
      ? getItem<UserAchievement[]>(STORAGE_KEYS.ACHIEVEMENTS) ?? []
      : [];

  const recentAchievements = [...unlockedAchievements]
    .sort(
      (a, b) =>
        new Date(b.unlockedAt).getTime() - new Date(a.unlockedAt).getTime()
    )
    .slice(0, 6)
    .map((ua) => ({
      userAchievement: ua,
      achievement: getAchievementById(ua.achievementId),
    }));

  const levelProgress = xpForNextLevel(user.totalXP);
  const rank = getOtakuRank(user.level);

  // Overall completion across all series
  const totalProgressEps = allProgressArr.reduce((sum, p) => sum + p.currentEpisode, 0);
  const totalSeriesEps = allProgressArr.reduce((sum, p) => {
    const s = seriesMap.get(p.seriesId);
    return sum + (s?.totalEpisodes ?? 0);
  }, 0);
  const overallPct = totalSeriesEps > 0 ? Math.round((totalProgressEps / totalSeriesEps) * 100) : 0;

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleEpisodeLog = (seriesId: string, episode: number) => {
    const prev = progress[seriesId]?.currentEpisode ?? 0;
    const diff = episode - prev;
    setProgress(seriesId, episode);
    if (diff > 0) {
      incrementEpisodesWatched(diff);
      addXP(diff * 10);
    }
  };

  // ---------------------------------------------------------------------------
  // Stagger helper
  // ---------------------------------------------------------------------------

  const stagger = (i: number) => ({
    animationDelay: `${i * 80}ms`,
  });

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="min-h-screen px-4 py-6 md:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* ================================================================= */}
        {/* Header                                                            */}
        {/* ================================================================= */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0"
          style={stagger(0)}
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#ECEEF5] font-[family-name:'Rajdhani'] uppercase tracking-wide">
              Welcome back,{' '}
              <span className="gradient-text">{user.displayName}</span>
            </h1>
            <p className="text-sm text-[rgba(200,202,216,0.5)] mt-1 flex items-center gap-2">
              <span className="text-[#FFB800] font-medium">{rank.name}</span>
              <span>·</span>
              <span>Level {user.level}</span>
              <span>·</span>
              <span>{formatNumber(user.totalXP)} XP</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/explore"
              className="btn-accent flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded no-underline"
            >
              <Compass className="w-4 h-4" />
              Explore
            </Link>
          </div>
        </div>

        {/* ================================================================= */}
        {/* Bento Grid Layout                                                 */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* ROW 1: Stat Tiles (4 across on desktop, 2x2 on mobile)          */}
          {/* ───────────────────────────────────────────────────────────────── */}

          {/* Episodes Watched */}
          <div
            className="lg:col-span-3 glass-card p-5 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0 group hover:border-[#FF3366]/20 transition-colors"
            style={stagger(1)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-lg bg-[#FF3366]/10 flex items-center justify-center">
                <Tv className="w-4.5 h-4.5 text-[#FF3366]" />
              </div>
              <TrendingUp className="w-4 h-4 text-[#39FF14]/60" />
            </div>
            <p className="text-2xl font-bold text-[#ECEEF5] font-[family-name:'Rajdhani']">
              {formatNumber(totalEps)}
            </p>
            <p className="text-xs text-[#8687A0] mt-0.5 uppercase tracking-wider">Episodes Watched</p>
          </div>

          {/* Hours Watched */}
          <div
            className="lg:col-span-3 glass-card p-5 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0 group hover:border-[#00F0FF]/20 transition-colors"
            style={stagger(2)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-lg bg-[#00F0FF]/10 flex items-center justify-center">
                <Clock className="w-4.5 h-4.5 text-[#00F0FF]" />
              </div>
              <BarChart3 className="w-4 h-4 text-[#00F0FF]/40" />
            </div>
            <p className="text-2xl font-bold text-[#ECEEF5] font-[family-name:'Rajdhani']">
              {hoursWatched.toFixed(1)}
            </p>
            <p className="text-xs text-[#8687A0] mt-0.5 uppercase tracking-wider">Hours Watched</p>
          </div>

          {/* Current Streak */}
          <div
            className="lg:col-span-3 glass-card p-5 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0 group hover:border-[#FFB800]/20 transition-colors"
            style={stagger(3)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-lg bg-[#FFB800]/10 flex items-center justify-center">
                <Flame className="w-4.5 h-4.5 text-[#FFB800]" />
              </div>
              {user.currentStreak > 0 && (
                <span className="text-xs font-semibold text-[#39FF14]/70 bg-[#39FF14]/8 px-2 py-0.5 rounded">
                  ACTIVE
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-[#ECEEF5] font-[family-name:'Rajdhani']">
              {user.currentStreak}
              <span className="text-base font-medium text-[#8687A0] ml-1">days</span>
            </p>
            <p className="text-xs text-[#8687A0] mt-0.5 uppercase tracking-wider">Current Streak</p>
          </div>

          {/* Series Completed */}
          <div
            className="lg:col-span-3 glass-card p-5 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0 group hover:border-[#8B5CF6]/20 transition-colors"
            style={stagger(4)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center">
                <CheckCircle className="w-4.5 h-4.5 text-[#8B5CF6]" />
              </div>
              <span className="text-xs text-[#8687A0]">
                {allProgressArr.length} total
              </span>
            </div>
            <p className="text-2xl font-bold text-[#ECEEF5] font-[family-name:'Rajdhani']">
              {completedCount}
            </p>
            <p className="text-xs text-[#8687A0] mt-0.5 uppercase tracking-wider">Series Completed</p>
          </div>

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* ROW 2: Level Progress + Quick Continue                          */}
          {/* ───────────────────────────────────────────────────────────────── */}

          {/* XP / Level Progress — spans 4 cols */}
          <div
            className="lg:col-span-4 glass-card p-5 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0 flex flex-col justify-between"
            style={stagger(5)}
          >
            <div className="flex items-center gap-3 mb-4">
              <ProgressRing percentage={levelProgress.progress * 100} size={72} color="#00F0FF">
                <div className="text-center">
                  <p className="text-lg font-bold text-[#ECEEF5] font-[family-name:'Rajdhani'] leading-none">
                    {user.level}
                  </p>
                  <p className="text-[0.6875rem] text-[#8687A0] uppercase tracking-widest">LVL</p>
                </div>
              </ProgressRing>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#ECEEF5] font-[family-name:'Rajdhani'] uppercase tracking-wide">
                  {rank.name}
                </p>
                <p className="text-xs text-[#8687A0] mt-0.5">
                  {formatNumber(levelProgress.xpIntoLevel)} / {formatNumber(levelProgress.xpNeeded)} XP
                </p>
                <div className="mt-2">
                  <ProgressBar
                    value={levelProgress.xpIntoLevel}
                    max={levelProgress.xpNeeded}
                    variant="xp"
                    size="sm"
                  />
                </div>
              </div>
            </div>

            {/* Overall library progress */}
            <div className="border-t border-white/[0.04] pt-3 mt-auto">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-[#8687A0] uppercase tracking-wider">Overall Progress</span>
                <span className="text-xs font-semibold text-[#B0B1C0]">{overallPct}%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <ProgressBar
                    value={totalProgressEps}
                    max={totalSeriesEps || 1}
                    variant="streak"
                    size="sm"
                    animated={false}
                  />
                </div>
                <span className="text-[0.6875rem] text-[#8687A0] whitespace-nowrap">
                  {formatNumber(totalProgressEps)} eps
                </span>
              </div>
            </div>
          </div>

          {/* Quick Continue — spans 8 cols */}
          <div
            className="lg:col-span-8 glass-card p-5 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0"
            style={stagger(6)}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-[#ECEEF5] flex items-center gap-2 font-[family-name:'Rajdhani'] uppercase tracking-wide">
                <Play className="w-4 h-4 text-[#FF3366]" />
                Quick Continue
              </h2>
              <Link
                href="/library"
                className="text-xs text-[#00F0FF] hover:text-[#00F0FF]/80 transition-colors flex items-center gap-1 no-underline uppercase tracking-wider font-medium"
              >
                View Library
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            {watchingList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-14 h-14 rounded-full bg-white/[0.03] flex items-center justify-center mb-3">
                  <Tv className="w-7 h-7 text-[rgba(200,202,216,0.15)]" />
                </div>
                <p className="text-sm text-[rgba(200,202,216,0.5)] mb-4">
                  No series in progress yet
                </p>
                <Link
                  href="/explore"
                  className="btn-accent flex items-center gap-2 px-4 py-2 text-xs font-semibold no-underline"
                >
                  <Compass className="w-3.5 h-3.5" />
                  Browse Anime
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {watchingList
                  .sort(
                    (a, b) =>
                      new Date(b.lastWatchedAt).getTime() -
                      new Date(a.lastWatchedAt).getTime()
                  )
                  .slice(0, 6)
                  .map((prog) => {
                    const series = seriesMap.get(prog.seriesId);
                    if (!series) return null;
                    return (
                      <MiniLogger
                        key={prog.seriesId}
                        seriesId={prog.seriesId}
                        series={series}
                        progress={prog}
                        onLog={handleEpisodeLog}
                      />
                    );
                  })}
              </div>
            )}
          </div>

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* ROW 3: Currently Watching Cards + Achievements + Activity        */}
          {/* ───────────────────────────────────────────────────────────────── */}

          {/* Currently Watching — large poster cards */}
          <div
            className="lg:col-span-8 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0"
            style={stagger(7)}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-[#ECEEF5] flex items-center gap-2 font-[family-name:'Rajdhani'] uppercase tracking-wide">
                <Eye className="w-4 h-4 text-[#00F0FF]" />
                Currently Watching
              </h2>
              <span className="text-xs text-[#8687A0]">
                {watchingList.length} series
              </span>
            </div>

            {watchingList.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {watchingList.map((prog) => {
                  const series = seriesMap.get(prog.seriesId);
                  if (!series) return null;
                  const pct =
                    series.totalEpisodes > 0
                      ? (prog.currentEpisode / series.totalEpisodes) * 100
                      : 0;

                  return (
                    <Link
                      key={prog.seriesId}
                      href={`/library/${series.slug}`}
                      className="glass-card-hover group overflow-hidden no-underline"
                    >
                      {/* Poster */}
                      <div className="relative h-40 bg-[#10101C] overflow-hidden">
                        {series.posterUrl ? (
                          <img
                            src={series.posterUrl}
                            alt={series.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#00F0FF]/8 to-[#10101C]">
                            <span className="text-4xl font-bold text-white/10 font-[family-name:'Rajdhani']">
                              {series.title.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#06060B] via-[#06060B]/20 to-transparent" />
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-xs font-semibold text-[#ECEEF5] truncate">
                            {series.title}
                          </p>
                          <div className="flex items-center justify-between mt-0.5">
                            <span className="text-[0.6875rem] text-[#9899A8]">
                              EP {prog.currentEpisode}/{series.totalEpisodes}
                            </span>
                            <span className="text-[0.6875rem] font-medium text-[#B0B1C0]">
                              {Math.round(pct)}%
                            </span>
                          </div>
                          <div className="mt-1">
                            <ProgressBar
                              value={prog.currentEpisode}
                              max={series.totalEpisodes}
                              variant="fire"
                              size="sm"
                              animated={false}
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="glass-card p-8 text-center">
                <p className="text-sm text-[rgba(200,202,216,0.5)]">
                  Start watching anime to see your progress here!
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Achievements + Activity */}
          <div className="lg:col-span-4 space-y-4">
            {/* Achievements */}
            <div
              className="glass-card p-5 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0"
              style={stagger(8)}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-[#ECEEF5] flex items-center gap-2 font-[family-name:'Rajdhani'] uppercase tracking-wide">
                  <Trophy className="w-4 h-4 text-[#FFB800]" />
                  Achievements
                </h2>
                <Link
                  href="/achievements"
                  className="text-xs text-[#00F0FF] hover:text-[#00F0FF]/80 transition-colors flex items-center gap-1 no-underline uppercase tracking-wider font-medium"
                >
                  All
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              {recentAchievements.length > 0 ? (
                <div className="flex flex-wrap gap-4 justify-center">
                  {recentAchievements.map(
                    ({ userAchievement, achievement }) =>
                      achievement ? (
                        <AchievementBadge
                          key={userAchievement.achievementId}
                          achievement={achievement}
                          unlocked={true}
                          size="sm"
                          showDetails
                        />
                      ) : null
                  )}
                </div>
              ) : (
                <div className="text-center py-2">
                  <p className="text-xs text-[rgba(200,202,216,0.5)] mb-3">
                    Watch episodes to unlock!
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    {allAchievements.slice(0, 3).map((ach) => (
                      <AchievementBadge
                        key={ach.id}
                        achievement={ach}
                        unlocked={false}
                        size="sm"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Unlocked count */}
              <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between">
                <span className="text-xs text-[#8687A0] uppercase tracking-wider">Unlocked</span>
                <span className="text-xs font-semibold text-[#FFB800]">
                  {unlockedAchievements.length} / {allAchievements.length}
                </span>
              </div>
            </div>

            {/* Activity Feed */}
            <div
              className="glass-card p-5 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0"
              style={stagger(9)}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-[#ECEEF5] flex items-center gap-2 font-[family-name:'Rajdhani'] uppercase tracking-wide">
                  <Users className="w-4 h-4 text-[#8B5CF6]" />
                  Activity
                </h2>
                <Link
                  href="/friends"
                  className="text-xs text-[#00F0FF] hover:text-[#00F0FF]/80 transition-colors flex items-center gap-1 no-underline uppercase tracking-wider font-medium"
                >
                  Friends
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-2">
                {activityFeed.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-2.5 p-2 rounded-lg hover:bg-white/[0.02] transition-colors"
                  >
                    <Avatar
                      src={item.userAvatar}
                      username={item.username}
                      size="sm"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#ECEEF5] leading-relaxed">
                        <span className="font-semibold">{item.username}</span>{' '}
                        <span className="text-[rgba(200,202,216,0.5)]">
                          {item.type === 'episode_logged'
                            ? `watched ep ${item.payload.episodeNumber ?? ''} of ${item.payload.seriesTitle ?? 'a series'}`
                            : item.type === 'series_completed'
                            ? `completed ${item.payload.seriesTitle ?? 'a series'}`
                            : item.type === 'badge_earned'
                            ? `earned "${item.payload.achievementName ?? 'Achievement'}"`
                            : item.type === 'series_started'
                            ? `started ${item.payload.seriesTitle ?? 'a series'}`
                            : 'did something awesome'}
                        </span>
                      </p>
                      <p className="text-[0.6875rem] text-[rgba(200,202,216,0.55)] mt-0.5">
                        {timeAgo(item.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}

                {activityFeed.length === 0 && (
                  <p className="text-xs text-[rgba(200,202,216,0.55)] text-center py-4">
                    No activity yet
                  </p>
                )}
              </div>

              {activityFeed.length > 4 && (
                <Link
                  href="/friends"
                  className="block text-center text-xs text-[#00F0FF] hover:text-[#00F0FF]/80 mt-3 pt-3 border-t border-white/[0.04] no-underline uppercase tracking-wider font-medium"
                >
                  View all activity
                </Link>
              )}
            </div>
          </div>

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* ROW 4: Quick Actions bar                                        */}
          {/* ───────────────────────────────────────────────────────────────── */}
          <div
            className="lg:col-span-12 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0"
            style={stagger(10)}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link
                href="/explore"
                className="glass-card p-4 flex items-center gap-3 hover:border-[#00F0FF]/20 transition-colors group no-underline"
              >
                <div className="w-10 h-10 rounded-lg bg-[#00F0FF]/10 flex items-center justify-center group-hover:bg-[#00F0FF]/15 transition-colors">
                  <Compass className="w-5 h-5 text-[#00F0FF]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#ECEEF5]">Explore</p>
                  <p className="text-xs text-[#8687A0]">Browse anime</p>
                </div>
              </Link>

              <Link
                href="/leaderboard"
                className="glass-card p-4 flex items-center gap-3 hover:border-[#FFB800]/20 transition-colors group no-underline"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FFB800]/10 flex items-center justify-center group-hover:bg-[#FFB800]/15 transition-colors">
                  <Target className="w-5 h-5 text-[#FFB800]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#ECEEF5]">Leaderboard</p>
                  <p className="text-xs text-[#8687A0]">See rankings</p>
                </div>
              </Link>

              <Link
                href="/friends"
                className="glass-card p-4 flex items-center gap-3 hover:border-[#8B5CF6]/20 transition-colors group no-underline"
              >
                <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center group-hover:bg-[#8B5CF6]/15 transition-colors">
                  <Users className="w-5 h-5 text-[#8B5CF6]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#ECEEF5]">Friends</p>
                  <p className="text-xs text-[#8687A0]">{friends.length} friends</p>
                </div>
              </Link>

              <Link
                href={`/profile/${user.username}`}
                className="glass-card p-4 flex items-center gap-3 hover:border-[#FF3366]/20 transition-colors group no-underline"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FF3366]/10 flex items-center justify-center group-hover:bg-[#FF3366]/15 transition-colors">
                  <Eye className="w-5 h-5 text-[#FF3366]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#ECEEF5]">Profile</p>
                  <p className="text-xs text-[#8687A0]">View profile</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
