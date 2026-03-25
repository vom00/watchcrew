'use client';

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { formatNumber, formatHours, timeAgo } from '@/lib/utils';
import { useProgressStore } from '@/lib/stores/progressStore';
import { useUserStore } from '@/lib/stores/userStore';
import { useSocialStore } from '@/lib/stores/socialStore';
import { getSeriesBySlug, getSeriesProgress } from '@/data/anime';
import { calculateEpisodeXP, arcCompletionXP, seriesCompletionXP } from '@/lib/xp';
import { checkAchievements } from '@/lib/achievements';
import EpisodeLogger from '@/components/ui/EpisodeLogger';
import ProgressBar from '@/components/ui/ProgressBar';
import Badge from '@/components/ui/Badge';
import type { Arc, WatchStatus, EpisodeLog } from '@/types';
import {
  ArrowLeft,
  Play,
  CheckCircle,
  Pause,
  XCircle,
  BookOpen,
  ChevronRight,
  Filter,
  Clock,
  Star,
  Zap,
  Tv,
  Map,
  EyeOff,
  Eye,
  ChevronDown,
  Trophy,
  Calendar,
} from 'lucide-react';

// -----------------------------------------------------------------------------
// Status Configuration
// -----------------------------------------------------------------------------

const STATUS_OPTIONS: { value: WatchStatus; label: string; icon: React.ReactNode }[] = [
  { value: 'watching', label: 'Watching', icon: <Play className="w-3.5 h-3.5" /> },
  { value: 'completed', label: 'Completed', icon: <CheckCircle className="w-3.5 h-3.5" /> },
  { value: 'on_hold', label: 'On Hold', icon: <Pause className="w-3.5 h-3.5" /> },
  { value: 'dropped', label: 'Dropped', icon: <XCircle className="w-3.5 h-3.5" /> },
  { value: 'plan_to_watch', label: 'Plan to Watch', icon: <BookOpen className="w-3.5 h-3.5" /> },
];

const STATUS_BADGE_VARIANT: Record<WatchStatus, 'orange' | 'green' | 'gold' | 'red' | 'blue'> = {
  watching: 'orange',
  completed: 'green',
  on_hold: 'gold',
  dropped: 'red',
  plan_to_watch: 'blue',
};

// =============================================================================
// Series Detail Page
// =============================================================================

export default function SeriesDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const slug = params.slug;

  // Stores
  const {
    progress: allProgress,
    episodeLogs,
    setProgress,
    setWatchStatus,
    toggleFillerSkip,
    loadFromStorage: loadProgress,
  } = useProgressStore();

  const {
    user,
    isLoggedIn,
    hydrated,
    sessionReady,
    addXP,
    incrementEpisodesWatched,
    incrementSeriesCompleted,
    loadFromStorage: loadUser,
  } = useUserStore();

  const { addActivity, loadFromStorage: loadSocial } = useSocialStore();

  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [hideFiller, setHideFiller] = useState(false);
  const arcTimelineRef = useRef<HTMLDivElement>(null);

  // Hydrate stores
  useEffect(() => {
    loadUser();
    loadProgress();
    loadSocial();
  }, [loadUser, loadProgress, loadSocial]);

  // Redirect if not logged in
  useEffect(() => {
    if (hydrated && sessionReady && !isLoggedIn) {
      router.push('/');
    }
  }, [hydrated, sessionReady, isLoggedIn, router]);

  // ---------------------------------------------------------------------------
  // Resolve series & progress
  // ---------------------------------------------------------------------------

  const series = useMemo(() => getSeriesBySlug(slug), [slug]);
  const seriesProgress = allProgress[series?.id ?? ''] ?? null;
  const currentEpisode = seriesProgress?.currentEpisode ?? 0;
  const watchStatus = seriesProgress?.watchStatus ?? 'plan_to_watch';
  const skipFiller = seriesProgress?.skipFiller ?? false;

  // Derived progress data
  const progressInfo = useMemo(() => {
    if (!series) return null;
    return getSeriesProgress(currentEpisode, series);
  }, [series, currentEpisode]);

  const progressPercent = progressInfo?.percentage ?? 0;
  const currentArc = progressInfo?.currentArc ?? null;

  // ---------------------------------------------------------------------------
  // Hours spent calculation
  // ---------------------------------------------------------------------------

  const hoursSpent = useMemo(() => {
    const totalMinutes = currentEpisode * 24;
    return Math.round((totalMinutes / 60) * 10) / 10;
  }, [currentEpisode]);

  // ---------------------------------------------------------------------------
  // Series-specific episode logs (recent first)
  // ---------------------------------------------------------------------------

  const seriesLogs = useMemo(() => {
    if (!series) return [];
    return episodeLogs
      .filter((log) => log.seriesId === series.id)
      .sort(
        (a, b) =>
          new Date(b.loggedAt).getTime() - new Date(a.loggedAt).getTime()
      )
      .slice(0, 50);
  }, [episodeLogs, series]);

  // ---------------------------------------------------------------------------
  // Arc progress helpers
  // ---------------------------------------------------------------------------

  const getArcProgress = useCallback(
    (arc: Arc) => {
      if (currentEpisode < arc.startEp) return 0;
      if (currentEpisode >= arc.endEp) return 100;
      const total = arc.endEp - arc.startEp + 1;
      const watched = currentEpisode - arc.startEp + 1;
      return Math.round((watched / total) * 100);
    },
    [currentEpisode]
  );

  const isArcCompleted = useCallback(
    (arc: Arc) => currentEpisode >= arc.endEp,
    [currentEpisode]
  );

  const isCurrentArc = useCallback(
    (arc: Arc) =>
      currentEpisode >= arc.startEp && currentEpisode <= arc.endEp,
    [currentEpisode]
  );

  // ---------------------------------------------------------------------------
  // Arcs to display
  // ---------------------------------------------------------------------------

  const displayedArcs = useMemo(() => {
    if (!series) return [];
    if (hideFiller) return series.arcs.filter((arc) => !arc.isFiller);
    return series.arcs;
  }, [series, hideFiller]);

  // ---------------------------------------------------------------------------
  // Scroll current arc into view
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (!arcTimelineRef.current || !currentArc) return;
    const currentEl = arcTimelineRef.current.querySelector(
      '[data-current-arc="true"]'
    );
    if (currentEl) {
      currentEl.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [currentArc]);

  // ---------------------------------------------------------------------------
  // Episode log handler
  // ---------------------------------------------------------------------------

  const handleEpisodeLog = useCallback(
    (newEpisode: number) => {
      if (!series || !user) return;

      const prevEpisode = currentEpisode;
      const episodesWatched = Math.max(0, newEpisode - prevEpisode);

      // Update progress in store
      setProgress(series.id, newEpisode);

      // Add XP per episode
      if (episodesWatched > 0) {
        const streak = user.currentStreak;
        const xpPerEp = calculateEpisodeXP(streak);
        const totalXP = xpPerEp * episodesWatched;
        addXP(totalXP);
        incrementEpisodesWatched(episodesWatched);
      }

      // Check arc completions
      for (const arc of series.arcs) {
        const wasBefore = prevEpisode < arc.endEp;
        const isNowDone = newEpisode >= arc.endEp;

        if (wasBefore && isNowDone && !arc.isFiller) {
          // Arc completion XP
          const arcEps = arc.endEp - arc.startEp + 1;
          const arcXP = arcCompletionXP(arcEps);
          addXP(arcXP);

          // Activity feed
          addActivity({
            userId: user.id,
            username: user.username,
            userAvatar: user.avatarUrl,
            type: 'milestone_reached',
            payload: {
              seriesTitle: series.title,
              milestone: `Completed the ${arc.name} arc!`,
            },
          });
        }
      }

      // Milestone every 50 episodes
      const prevMilestone = Math.floor(prevEpisode / 50);
      const newMilestone = Math.floor(newEpisode / 50);
      if (newMilestone > prevMilestone) {
        addActivity({
          userId: user.id,
          username: user.username,
          userAvatar: user.avatarUrl,
          type: 'milestone_reached',
          payload: {
            seriesTitle: series.title,
            milestone: `Reached Episode ${newMilestone * 50}!`,
          },
        });
      }

      // Series completion
      if (
        newEpisode >= series.totalEpisodes &&
        prevEpisode < series.totalEpisodes
      ) {
        setWatchStatus(series.id, 'completed');
        incrementSeriesCompleted();

        const completionXP = seriesCompletionXP(series.totalEpisodes);
        addXP(completionXP);

        addActivity({
          userId: user.id,
          username: user.username,
          userAvatar: user.avatarUrl,
          type: 'series_completed',
          payload: { seriesTitle: series.title },
        });
      }
    },
    [
      series,
      user,
      currentEpisode,
      setProgress,
      addXP,
      incrementEpisodesWatched,
      incrementSeriesCompleted,
      setWatchStatus,
      addActivity,
    ]
  );

  // ---------------------------------------------------------------------------
  // Status change handler
  // ---------------------------------------------------------------------------

  const handleStatusChange = useCallback(
    (newStatus: WatchStatus) => {
      if (!series) return;
      setWatchStatus(series.id, newStatus);
      setStatusDropdownOpen(false);
    },
    [series, setWatchStatus]
  );

  // ---------------------------------------------------------------------------
  // Guard: not logged in or not yet mounted
  // ---------------------------------------------------------------------------

  if (!hydrated || !isLoggedIn) return null;

  // ---------------------------------------------------------------------------
  // Guard: series not found
  // ---------------------------------------------------------------------------

  if (!series) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h2 className="text-xl font-bold font-[family-name:'Rajdhani'] uppercase tracking-wide text-[#ECEEF5] mb-2">
          Series not found
        </h2>
        <p className="text-sm text-[rgba(200,202,216,0.5)] mb-6">
          We couldn&apos;t find a series with that slug.
        </p>
        <button
          onClick={() => router.push('/library')}
          className="btn-accent px-5 py-2.5 text-sm font-semibold"
        >
          Back to Library
        </button>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Date formatting helpers
  // ---------------------------------------------------------------------------

  const startedDate = seriesProgress?.startedAt
    ? new Date(seriesProgress.startedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Not started';

  const lastWatchedDate = seriesProgress?.lastWatchedAt
    ? timeAgo(seriesProgress.lastWatchedAt)
    : 'Never';

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="min-h-screen pb-16">
      {/* =================================================================== */}
      {/* Hero Banner                                                          */}
      {/* =================================================================== */}
      <div className="relative overflow-hidden">
        {/* Banner image background */}
        {series.bannerUrl && (
          <img
            src={series.bannerUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#06060B]/80 via-[#06060B]/60 to-[#06060B]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06060B] via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          {/* Back button */}
          <button
            onClick={() => router.push('/library')}
            className="glass-button flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[rgba(200,202,216,0.6)] mb-8 hover:text-[rgba(200,202,216,0.9)]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Library
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Poster thumbnail */}
            {series.posterUrl && (
              <div className="hidden md:block flex-shrink-0 w-28 h-40 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                <img
                  src={series.posterUrl}
                  alt={series.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Title & info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <Badge
                  text={
                    STATUS_OPTIONS.find((s) => s.value === watchStatus)
                      ?.label ?? 'Plan to Watch'
                  }
                  variant={STATUS_BADGE_VARIANT[watchStatus]}
                  size="sm"
                  icon={
                    STATUS_OPTIONS.find((s) => s.value === watchStatus)?.icon
                  }
                />
                <Badge
                  text={series.status === 'airing' ? 'Airing' : 'Finished'}
                  variant={series.status === 'airing' ? 'green' : 'blue'}
                  size="sm"
                />
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:'Rajdhani'] uppercase tracking-wide text-[#ECEEF5] mb-2">
                {series.title}
              </h1>

              <p className="text-sm text-[rgba(200,202,216,0.45)] mb-1">
                {series.genre.join(' / ')}
              </p>
              <p className="text-sm text-[rgba(200,202,216,0.55)] max-w-2xl line-clamp-2">
                {series.description}
              </p>
            </div>

            {/* Circular progress ring */}
            <div className="flex-shrink-0">
              <ProgressRing percentage={progressPercent} size={140} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================================================================= */}
        {/* Progress Section                                                   */}
        {/* ================================================================= */}
        <div className="glass-card p-6 -mt-6 mb-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-2xl font-bold font-[family-name:'Rajdhani'] uppercase tracking-wide text-[#ECEEF5]">
                EP {formatNumber(currentEpisode)}{' '}
                <span className="text-[rgba(200,202,216,0.55)] font-normal">
                  / {formatNumber(series.totalEpisodes)}
                </span>
              </p>
              <p className="text-sm text-[rgba(200,202,216,0.5)] mt-1">
                {progressPercent}% complete
              </p>
            </div>

            {/* Watch status selector buttons */}
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleStatusChange(opt.value)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] text-xs font-medium transition-all duration-200',
                    watchStatus === opt.value
                      ? 'bg-[#00F0FF]/15 text-[#00F0FF] font-semibold border border-[#00F0FF]/40 shadow-[0_0_12px_rgba(0,240,255,0.15)]'
                      : 'glass-button text-[rgba(200,202,216,0.5)] hover:text-[rgba(200,202,216,0.9)]'
                  )}
                >
                  {opt.icon}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <ProgressBar
            value={currentEpisode}
            max={series.totalEpisodes}
            variant={watchStatus === 'completed' ? 'gold' : 'fire'}
            size="lg"
            animated
          />
        </div>

        {/* ================================================================= */}
        {/* Stats Row                                                          */}
        {/* ================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <StatTile
            icon={<Calendar className="w-4 h-4 text-[#39FF14]" />}
            label="Started"
            value={startedDate}
          />
          <StatTile
            icon={<Clock className="w-4 h-4 text-[#00F0FF]" />}
            label="Last Watched"
            value={lastWatchedDate}
          />
          <StatTile
            icon={<Zap className="w-4 h-4 text-[#FFB800]" />}
            label="Time Spent"
            value={formatHours(currentEpisode)}
          />
          <StatTile
            icon={<Map className="w-4 h-4 text-[#8B5CF6]" />}
            label="Current Arc"
            value={currentArc?.name ?? 'N/A'}
          />
        </div>

        {/* ================================================================= */}
        {/* Arc Timeline                                                       */}
        {/* ================================================================= */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold font-[family-name:'Rajdhani'] uppercase tracking-wide text-[#ECEEF5] flex items-center gap-2">
              <Map className="w-5 h-5 text-[#8B5CF6]" />
              Arc Timeline
            </h2>
            <button
              onClick={() => setHideFiller((prev) => !prev)}
              className="glass-button flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[rgba(200,202,216,0.6)] hover:text-[rgba(200,202,216,0.9)]"
            >
              {hideFiller ? (
                <Eye className="w-3.5 h-3.5" />
              ) : (
                <EyeOff className="w-3.5 h-3.5" />
              )}
              {hideFiller ? 'Show Filler' : 'Hide Filler'}
            </button>
          </div>

          {/* Scrollable timeline */}
          <div
            ref={arcTimelineRef}
            className="overflow-x-auto pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[var(--glass-medium)]"
          >
            <div className="flex gap-3 min-w-max">
              {displayedArcs.map((arc) => {
                const completed = isArcCompleted(arc);
                const current = isCurrentArc(arc);
                const arcProg = getArcProgress(arc);
                const arcLength = arc.endEp - arc.startEp + 1;

                return (
                  <div
                    key={`${arc.name}-${arc.startEp}`}
                    data-current-arc={current ? 'true' : undefined}
                    className={cn(
                      'relative flex flex-col rounded-xl p-3 min-w-[160px] max-w-[200px] border transition-all duration-300',
                      arc.isFiller
                        ? 'bg-[#06060B]/60 border-[var(--glass-light)] opacity-60'
                        : 'glass-card border-transparent',
                      current &&
                        !arc.isFiller &&
                        'border-[#00F0FF] shadow-[0_0_20px_rgba(67,97,238,0.2),0_0_40px_rgba(67,97,238,0.1)]',
                      current &&
                        arc.isFiller &&
                        'border-[rgba(200,202,216,0.15)] shadow-[0_0_12px_rgba(200,202,216,0.05)] opacity-80',
                      completed &&
                        !current &&
                        !arc.isFiller &&
                        'opacity-80'
                    )}
                  >
                    {/* Current arc glow indicator */}
                    {current && !arc.isFiller && (
                      <div className="absolute -inset-px rounded-xl bg-[#00F0FF]/15 -z-10 blur-sm" />
                    )}

                    {/* Arc header */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0 pr-2">
                        <h4
                          className={cn(
                            'text-xs font-semibold truncate',
                            arc.isFiller
                              ? 'text-[rgba(200,202,216,0.55)]'
                              : 'text-[#ECEEF5]'
                          )}
                        >
                          {arc.name}
                        </h4>
                        <p
                          className={cn(
                            'text-[0.6875rem] mt-0.5',
                            arc.isFiller
                              ? 'text-[rgba(200,202,216,0.45)]'
                              : 'text-[rgba(200,202,216,0.55)]'
                          )}
                        >
                          EP {arc.startEp}&ndash;{arc.endEp} ({arcLength} eps)
                        </p>
                      </div>

                      {/* Status indicator */}
                      {completed && (
                        <CheckCircle
                          className={cn(
                            'w-4 h-4 flex-shrink-0',
                            arc.isFiller
                              ? 'text-[rgba(200,202,216,0.45)]'
                              : 'text-[#39FF14]'
                          )}
                        />
                      )}
                      {current && (
                        <div className="relative flex-shrink-0">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#00F0FF]" />
                          <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-ping opacity-50" />
                        </div>
                      )}
                    </div>

                    {/* Filler badge */}
                    {arc.isFiller && (
                      <span className="text-[0.6875rem] text-[rgba(200,202,216,0.5)] uppercase tracking-wider font-medium mb-2">
                        Filler
                      </span>
                    )}

                    {/* Mini progress bar */}
                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={cn(
                            'text-[0.6875rem]',
                            arc.isFiller
                              ? 'text-[rgba(200,202,216,0.5)]'
                              : 'text-[rgba(200,202,216,0.55)]'
                          )}
                        >
                          {arcProg}%
                        </span>
                      </div>
                      <div
                        className={cn(
                          'h-1 rounded-full overflow-hidden',
                          arc.isFiller
                            ? 'bg-[rgba(200,202,216,0.05)]'
                            : 'bg-[var(--glass-light)]'
                        )}
                      >
                        <div
                          className={cn(
                            'h-full rounded-full transition-all duration-700 ease-out',
                            arc.isFiller
                              ? 'bg-[rgba(200,202,216,0.15)]'
                              : completed
                                ? 'bg-[#39FF14]'
                                : current
                                  ? 'bg-[#00F0FF]'
                                  : 'bg-[#00F0FF]/50'
                          )}
                          style={{ width: `${arcProg}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* Episode Logger                                                     */}
        {/* ================================================================= */}
        <div className="mb-10">
          <h2 className="text-lg font-bold font-[family-name:'Rajdhani'] uppercase tracking-wide text-[#ECEEF5] mb-4 flex items-center gap-2">
            <Tv className="w-5 h-5 text-[#FF3366]" />
            Log Episodes
          </h2>
          <div className="max-w-md">
            <EpisodeLogger
              seriesId={series.id}
              seriesTitle={series.title}
              currentEpisode={currentEpisode}
              totalEpisodes={series.totalEpisodes}
              onLog={handleEpisodeLog}
            />
          </div>
        </div>

        {/* ================================================================= */}
        {/* Watch Settings (Filler Toggle)                                     */}
        {/* ================================================================= */}
        <div className="mb-10">
          <h2 className="text-lg font-bold font-[family-name:'Rajdhani'] uppercase tracking-wide text-[#ECEEF5] mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#FFB800]" />
            Watch Settings
          </h2>

          <div className="glass-card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Filler skip toggle */}
            <button
              onClick={() => {
                if (series) toggleFillerSkip(series.id);
              }}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-all duration-200',
                skipFiller
                  ? 'bg-[#FF3366]/20 text-[#FF3366] border border-[#FF3366]/30'
                  : 'glass-button text-[rgba(200,202,216,0.6)]'
              )}
            >
              {skipFiller ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
              {skipFiller ? 'Filler Skip: ON' : 'Filler Skip: OFF'}
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* Recent Activity / Episode Log History                              */}
        {/* ================================================================= */}
        <div className="mb-10">
          <h2 className="text-lg font-bold font-[family-name:'Rajdhani'] uppercase tracking-wide text-[#ECEEF5] mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#00F0FF]" />
            Recent Activity
          </h2>

          {seriesLogs.length > 0 ? (
            <div className="glass-card divide-y divide-[var(--glass-light)] max-h-80 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[var(--glass-medium)]">
              {seriesLogs.map((log, index) => (
                <div
                  key={`${log.episodeNumber}-${log.loggedAt}-${index}`}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--glass-light)] flex items-center justify-center">
                      <Tv className="w-3.5 h-3.5 text-[#FF3366]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#ECEEF5]">
                        Episode {log.episodeNumber}
                      </p>
                      <p className="text-xs text-[rgba(200,202,216,0.55)]">
                        {getArcForEpisode(series, log.episodeNumber)}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-[rgba(200,202,216,0.5)] whitespace-nowrap">
                    {timeAgo(log.loggedAt)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-8 text-center">
              <p className="text-sm text-[rgba(200,202,216,0.5)]">
                No episodes logged yet. Start watching to see your history here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Sub-components
// =============================================================================

// -----------------------------------------------------------------------------
// Circular Progress Ring
// -----------------------------------------------------------------------------

function ProgressRing({
  percentage,
  size = 120,
}: {
  percentage: number;
  size?: number;
}) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(200,202,216,0.08)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-1000 ease-out"
        />
        <defs>
          <linearGradient
            id="progressGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="50%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#00F0FF" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold font-[family-name:'Rajdhani'] uppercase tracking-wide text-[#ECEEF5]">
          {percentage}%
        </span>
        <span className="text-[0.6875rem] text-[rgba(200,202,216,0.5)] uppercase tracking-wider">
          Complete
        </span>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Stat Tile
// -----------------------------------------------------------------------------

function StatTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="glass-card p-4 flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs text-[rgba(200,202,216,0.5)] uppercase tracking-wider">
          {label}
        </span>
      </div>
      <span className="text-sm font-bold text-[#ECEEF5] truncate">{value}</span>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Helper: Find arc name for an episode number
// -----------------------------------------------------------------------------

function getArcForEpisode(
  series: { arcs: Arc[] },
  episodeNumber: number
): string {
  const arc = series.arcs.find(
    (a) => episodeNumber >= a.startEp && episodeNumber <= a.endEp
  );
  return arc ? `${arc.name}${arc.isFiller ? ' (Filler)' : ''}` : '';
}
