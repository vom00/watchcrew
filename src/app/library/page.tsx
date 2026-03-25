'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useProgressStore } from '@/lib/stores/progressStore';
import { useUserStore } from '@/lib/stores/userStore';
import { animeDatabase, getSeriesById } from '@/data/anime';
import AnimeCard from '@/components/ui/AnimeCard';
import SearchBar from '@/components/ui/SearchBar';
import Badge from '@/components/ui/Badge';
import type { WatchStatus, AnimeSeries, UserProgress } from '@/types';
import {
  Library,
  Play,
  CheckCircle,
  Pause,
  XCircle,
  BookOpen,
  ArrowUpDown,
  Compass,
  Tv,
} from 'lucide-react';

// -----------------------------------------------------------------------------
// Filter Tabs
// -----------------------------------------------------------------------------

type FilterTab = 'all' | WatchStatus;

interface TabConfig {
  key: FilterTab;
  label: string;
  icon: React.ReactNode;
}

const TABS: TabConfig[] = [
  { key: 'all', label: 'All', icon: <Library className="w-3.5 h-3.5" /> },
  { key: 'watching', label: 'Watching', icon: <Play className="w-3.5 h-3.5" /> },
  { key: 'completed', label: 'Completed', icon: <CheckCircle className="w-3.5 h-3.5" /> },
  { key: 'on_hold', label: 'On Hold', icon: <Pause className="w-3.5 h-3.5" /> },
  { key: 'dropped', label: 'Dropped', icon: <XCircle className="w-3.5 h-3.5" /> },
  { key: 'plan_to_watch', label: 'Plan to Watch', icon: <BookOpen className="w-3.5 h-3.5" /> },
];

// -----------------------------------------------------------------------------
// Sort Options
// -----------------------------------------------------------------------------

type SortKey = 'title' | 'progress' | 'recentlyUpdated';

interface SortOption {
  key: SortKey;
  label: string;
}

const SORT_OPTIONS: SortOption[] = [
  { key: 'title', label: 'Title A-Z' },
  { key: 'progress', label: 'Progress' },
  { key: 'recentlyUpdated', label: 'Recently Updated' },
];

// =============================================================================
// Library Page Component
// =============================================================================

export default function LibraryPage() {
  const router = useRouter();
  const { progress, getAllProgress, getTotalEpisodesWatched, loadFromStorage } =
    useProgressStore();
  const { isLoggedIn, hydrated, sessionReady, loadFromStorage: loadUser } = useUserStore();

  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('recentlyUpdated');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  // Hydrate stores on mount
  useEffect(() => {
    loadUser();
    loadFromStorage();
  }, [loadUser, loadFromStorage]);

  // Redirect if not logged in
  useEffect(() => {
    if (hydrated && sessionReady && !isLoggedIn) {
      router.push('/');
    }
  }, [hydrated, sessionReady, isLoggedIn, router]);

  // ---------------------------------------------------------------------------
  // Derive the list of tracked series paired with their progress
  // ---------------------------------------------------------------------------

  const trackedSeries = useMemo(() => {
    const allProgress = getAllProgress();
    const paired: { series: AnimeSeries; progress: UserProgress }[] = [];

    for (const prog of allProgress) {
      const series = getSeriesById(prog.seriesId);
      if (series) {
        paired.push({ series, progress: prog });
      }
    }

    return paired;
  }, [progress, getAllProgress]);

  // ---------------------------------------------------------------------------
  // Episode count stats
  // ---------------------------------------------------------------------------

  const totalEpisodes = useMemo(() => getTotalEpisodesWatched(), [progress, getTotalEpisodesWatched]);

  // ---------------------------------------------------------------------------
  // Filter by tab + search
  // ---------------------------------------------------------------------------

  const filtered = useMemo(() => {
    let result = trackedSeries;

    // Status filter
    if (activeTab !== 'all') {
      result = result.filter((item) => item.progress.watchStatus === activeTab);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((item) =>
        item.series.title.toLowerCase().includes(q)
      );
    }

    return result;
  }, [trackedSeries, activeTab, searchQuery]);

  // ---------------------------------------------------------------------------
  // Sort
  // ---------------------------------------------------------------------------

  const sorted = useMemo(() => {
    const items = [...filtered];

    items.sort((a, b) => {
      switch (sortKey) {
        case 'title':
          return a.series.title.localeCompare(b.series.title);

        case 'progress': {
          const pA =
            a.series.totalEpisodes > 0
              ? a.progress.currentEpisode / a.series.totalEpisodes
              : 0;
          const pB =
            b.series.totalEpisodes > 0
              ? b.progress.currentEpisode / b.series.totalEpisodes
              : 0;
          return pB - pA; // Descending
        }

        case 'recentlyUpdated':
          return (
            new Date(b.progress.lastWatchedAt).getTime() -
            new Date(a.progress.lastWatchedAt).getTime()
          );

        default:
          return 0;
      }
    });

    return items;
  }, [filtered, sortKey]);

  // ---------------------------------------------------------------------------
  // Tab counts
  // ---------------------------------------------------------------------------

  const tabCounts = useMemo(() => {
    const counts: Record<FilterTab, number> = {
      all: trackedSeries.length,
      watching: 0,
      completed: 0,
      on_hold: 0,
      dropped: 0,
      plan_to_watch: 0,
    };

    for (const item of trackedSeries) {
      const status = item.progress.watchStatus;
      if (status in counts) {
        counts[status as WatchStatus]++;
      }
    }

    return counts;
  }, [trackedSeries]);

  // Don't render until mounted and logged in (redirect will happen via useEffect)
  if (!hydrated || !isLoggedIn) return null;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="min-h-screen px-4 py-6 sm:py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* ------------------------------------------------------------------- */}
      {/* Header                                                               */}
      {/* ------------------------------------------------------------------- */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Library className="w-7 h-7 text-[#FF3366]" />
          <h1 className="text-3xl font-bold font-[family-name:'Rajdhani'] uppercase tracking-wide text-[#ECEEF5]">
            My Library
          </h1>
          <Badge
            text={`${trackedSeries.length} series`}
            variant="blue"
            size="sm"
          />
        </div>
        <div className="flex items-center gap-4 text-sm text-[#9899A8] mt-1">
          <span className="flex items-center gap-1.5">
            <Tv className="w-4 h-4 text-[#FF3366]" />
            {totalEpisodes.toLocaleString()} episodes watched
          </span>
          <span className="text-[#5D5E76]">|</span>
          <span>
            {tabCounts.watching} watching
          </span>
          <span className="text-[#5D5E76]">|</span>
          <span>
            {tabCounts.completed} completed
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* Controls: Filter Tabs + Search + Sort                                */}
      {/* ------------------------------------------------------------------- */}
      <div className="flex flex-col gap-5 sm:gap-4 mb-8">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] text-xs font-medium transition-all duration-200',
                activeTab === tab.key
                  ? 'bg-[#00F0FF]/15 text-[#00F0FF] font-semibold border border-[#00F0FF]/40 shadow-[0_0_12px_rgba(0,240,255,0.15)]'
                  : 'glass-button text-[#B0B1C0] hover:text-[#ECEEF5]'
              )}
            >
              {tab.icon}
              {tab.label}
              {tabCounts[tab.key] > 0 && (
                <span
                  className={cn(
                    'ml-1 text-[0.6875rem] px-1.5 py-0.5 rounded-full',
                    activeTab === tab.key
                      ? 'bg-[#00F0FF]/20 text-[#00F0FF]'
                      : 'bg-[var(--glass-light)]'
                  )}
                >
                  {tabCounts[tab.key]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search + Sort row */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <SearchBar
              placeholder="Search your library..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortDropdownOpen((prev) => !prev)}
              className="glass-button flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium text-[#B0B1C0] whitespace-nowrap"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              {SORT_OPTIONS.find((o) => o.key === sortKey)?.label}
            </button>

            {sortDropdownOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setSortDropdownOpen(false)}
                />
                {/* Menu */}
                <div className="absolute right-0 top-full mt-1 z-50 w-44 glass-card p-1.5 shadow-xl">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => {
                        setSortKey(opt.key);
                        setSortDropdownOpen(false);
                      }}
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-[var(--radius-sm)] text-xs transition-colors duration-150',
                        sortKey === opt.key
                          ? 'bg-[#00F0FF]/20 text-[#00F0FF]'
                          : 'text-[rgba(200,202,216,0.6)] hover:bg-[var(--glass-light)] hover:text-[rgba(200,202,216,0.9)]'
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* Grid / Empty State                                                   */}
      {/* ------------------------------------------------------------------- */}
      {sorted.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {sorted.map((item) => (
            <AnimeCard
              key={item.series.id}
              series={item.series}
              progress={item.progress}
              onClick={() => router.push(`/library/${item.series.slug}`)}
            />
          ))}
        </div>
      ) : trackedSeries.length === 0 ? (
        // Completely empty library
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-full bg-[var(--glass-light)] flex items-center justify-center mb-6">
            <Library className="w-10 h-10 text-[rgba(200,202,216,0.25)]" />
          </div>
          <h3 className="text-lg font-semibold font-[family-name:'Rajdhani'] uppercase tracking-wide text-[#ECEEF5] mb-2">
            Your library is empty!
          </h3>
          <p className="text-sm text-[#8687A0] mb-6 max-w-sm">
            Start by exploring anime and adding series to your watchlist.
          </p>
          <button
            onClick={() => router.push('/explore')}
            className="btn-accent flex items-center gap-2 px-5 py-2.5 text-sm font-semibold"
          >
            <Compass className="w-4 h-4" />
            Explore Anime
          </button>
        </div>
      ) : (
        // Filtered results are empty
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--glass-light)] flex items-center justify-center mb-4">
            <Library className="w-8 h-8 text-[#5D5E76]" />
          </div>
          <h3 className="text-base font-semibold font-[family-name:'Rajdhani'] uppercase tracking-wide text-[#ECEEF5] mb-1">
            No matches found
          </h3>
          <p className="text-sm text-[#8687A0]">
            Try a different filter or search term.
          </p>
        </div>
      )}
    </div>
  );
}
