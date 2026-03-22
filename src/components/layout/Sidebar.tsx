'use client';

import Link from 'next/link';
import { Zap, Flame, Target, TrendingUp, Play, Plus, Eye } from 'lucide-react';
import { useUserStore, useProgressStore } from '@/lib/stores';
import { xpForNextLevel, getOtakuRank } from '@/types';
import { animeDatabase } from '@/data/anime';
import ProgressBar from '@/components/ui/ProgressBar';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getSeriesTitle(seriesId: string): string {
  const series = animeDatabase.find((s) => s.id === seriesId);
  return series?.title ?? seriesId;
}

function getSeriesTotalEpisodes(seriesId: string): number {
  const series = animeDatabase.find((s) => s.id === seriesId);
  return series?.totalEpisodes ?? 0;
}

// ---------------------------------------------------------------------------
// Sidebar Component
// ---------------------------------------------------------------------------

export default function Sidebar() {
  const user = useUserStore((s) => s.user);
  const allProgress = useProgressStore((s) => Object.values(s.progress));

  if (!user) return null;

  const rank = getOtakuRank(user.level);
  const { xpIntoLevel, xpNeeded, progress: levelProgress } = xpForNextLevel(user.totalXP);
  const watchingList = allProgress
    .filter((p) => p.watchStatus === 'watching')
    .sort((a, b) => new Date(b.lastWatchedAt).getTime() - new Date(a.lastWatchedAt).getTime())
    .slice(0, 5);

  return (
    <aside className="hidden w-72 shrink-0 flex-col gap-4 lg:flex">
      {/* ================================================================
          Quick Stats
          ================================================================ */}
      <div className="glass-card p-5">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#9899A8] font-[family-name:'Rajdhani'] uppercase tracking-wide">
          <TrendingUp size={14} />
          Quick Stats
        </h3>

        {/* Level + Rank */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold gradient-text-xp font-[family-name:'Rajdhani'] uppercase tracking-wide">
              Lv.{user.level}
            </span>
            <p className="mt-0.5 text-xs font-medium text-[var(--accent-gold)] uppercase tracking-wider">
              {rank.name}
            </p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-[var(--glass-light)] px-3 py-1.5">
            <Zap size={12} className="text-[var(--accent-blue)]" />
            <span className="text-[0.6875rem] font-semibold text-[rgba(200,202,216,0.7)]">
              {rank.name}
            </span>
          </div>
        </div>

        {/* XP Progress */}
        <div className="mb-1 flex items-center justify-between text-[0.6875rem] text-[rgba(200,202,216,0.45)]">
          <span>XP to Next Level</span>
          <span>
            {xpIntoLevel.toLocaleString()} / {xpNeeded.toLocaleString()}
          </span>
        </div>
        <div className="mb-4">
          <ProgressBar
            value={xpIntoLevel}
            max={xpNeeded}
            variant="xp"
            size="sm"
          />
        </div>

        {/* Current Streak */}
        <div className="flex items-center gap-3 rounded-lg bg-[var(--glass-light)] px-3 py-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF3366]/15">
            <Flame size={16} className="text-[#FF3366]" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold gradient-text-streak">
              {user.currentStreak} day{user.currentStreak !== 1 ? 's' : ''}
            </span>
            <span className="text-[0.6875rem] text-[rgba(200,202,216,0.5)]">
              Current Streak
            </span>
          </div>
        </div>
      </div>

      {/* ================================================================
          Currently Watching
          ================================================================ */}
      {watchingList.length > 0 && (
        <div className="glass-card p-5">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#9899A8] font-[family-name:'Rajdhani'] uppercase tracking-wide">
            <Eye size={14} />
            Currently Watching
          </h3>

          <ul className="flex flex-col gap-3">
            {watchingList.map((entry) => {
              const total = getSeriesTotalEpisodes(entry.seriesId);
              const pct = total > 0 ? (entry.currentEpisode / total) * 100 : 0;

              return (
                <li key={entry.seriesId}>
                  <Link
                    href={`/library/${entry.seriesId}`}
                    className="group block rounded-lg px-2 py-1.5 transition-colors hover:bg-[var(--glass-light)] no-underline"
                  >
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="truncate text-sm font-medium text-[#ECEEF5] group-hover:text-[#FF3366] transition-colors">
                        {getSeriesTitle(entry.seriesId)}
                      </span>
                      <span className="ml-2 shrink-0 text-[0.6875rem] text-[rgba(200,202,216,0.5)]">
                        {entry.currentEpisode}/{total}
                      </span>
                    </div>
                    <ProgressBar
                      value={entry.currentEpisode}
                      max={total}
                      variant="fire"
                      size="sm"
                      animated={false}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {allProgress.filter((p) => p.watchStatus === 'watching').length > 5 && (
            <Link
              href="/library"
              className="mt-3 block text-center text-xs font-medium text-[#00F0FF] hover:text-[#39FF14] transition-colors no-underline"
            >
              View all ({allProgress.filter((p) => p.watchStatus === 'watching').length})
            </Link>
          )}
        </div>
      )}

      {/* ================================================================
          Quick Actions
          ================================================================ */}
      <div className="glass-card p-5">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#9899A8] font-[family-name:'Rajdhani'] uppercase tracking-wide">
          <Target size={14} />
          Quick Actions
        </h3>

        <div className="flex flex-col gap-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-[#ECEEF5] bg-[var(--glass-light)] hover:bg-[var(--glass-medium)] transition-all duration-200 no-underline group"
          >
            <Play size={16} className="text-[#39FF14] group-hover:scale-110 transition-transform" />
            Log Episode
          </Link>

          <Link
            href="/explore"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-[#ECEEF5] bg-[var(--glass-light)] hover:bg-[var(--glass-medium)] transition-all duration-200 no-underline group"
          >
            <Plus size={16} className="text-[#00F0FF] group-hover:scale-110 transition-transform" />
            Browse Anime
          </Link>

          <Link
            href={`/profile/${user.username}`}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-[#ECEEF5] bg-[var(--glass-light)] hover:bg-[var(--glass-medium)] transition-all duration-200 no-underline group"
          >
            <Eye size={16} className="text-[#FFB800] group-hover:scale-110 transition-transform" />
            View Profile
          </Link>
        </div>
      </div>
    </aside>
  );
}
