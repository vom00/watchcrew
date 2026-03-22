'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useProgressStore } from '@/lib/stores';
import { animeDatabase, searchAnime } from '@/data/anime';
import AnimeCard from '@/components/ui/AnimeCard';
import SearchBar from '@/components/ui/SearchBar';
import Badge from '@/components/ui/Badge';
import type { AnimeSeries } from '@/types';
import { Compass, TrendingUp, Filter, Sparkles } from 'lucide-react';

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const ALL_GENRES = ['Action', 'Adventure', 'Fantasy', 'Shounen', 'Drama'] as const;

const POSTER_POSITION: Record<string, string> = {
  'one-piece': 'object-center',
  'naruto': 'object-center',
  'naruto-shippuden': 'object-center',
  'bleach': 'object-center',
  'black-clover': 'object-center',
  'attack-on-titan': 'object-center',
};

type SortOption = 'title' | 'episodes' | 'status';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'title', label: 'Title' },
  { value: 'episodes', label: 'Total Episodes' },
  { value: 'status', label: 'Status' },
];

// Top 4 anime by episode count for the featured/trending section
const TRENDING_IDS = animeDatabase
  .slice()
  .sort((a, b) => b.totalEpisodes - a.totalEpisodes)
  .slice(0, 4)
  .map((s) => s.id);

// =============================================================================
// Explore Page
// =============================================================================

export default function ExplorePage() {
  const router = useRouter();
  const progress = useProgressStore((s) => s.progress);
  const startSeries = useProgressStore((s) => s.startSeries);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeGenres, setActiveGenres] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<SortOption>('episodes');

  // ---------------------------------------------------------------------------
  // Genre toggle
  // ---------------------------------------------------------------------------

  const toggleGenre = (genre: string) => {
    setActiveGenres((prev) => {
      const next = new Set(prev);
      if (next.has(genre)) {
        next.delete(genre);
      } else {
        next.add(genre);
      }
      return next;
    });
  };

  // ---------------------------------------------------------------------------
  // Filtered + sorted anime list
  // ---------------------------------------------------------------------------

  const filteredAnime = useMemo(() => {
    let results: AnimeSeries[] =
      searchQuery.trim().length > 0
        ? searchAnime(searchQuery)
        : [...animeDatabase];

    // Genre filter
    if (activeGenres.size > 0) {
      results = results.filter((s) =>
        s.genre.some((g) => activeGenres.has(g))
      );
    }

    // Sort
    switch (sortBy) {
      case 'title':
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'episodes':
        results.sort((a, b) => b.totalEpisodes - a.totalEpisodes);
        break;
      case 'status':
        results.sort((a, b) => {
          if (a.status === b.status) return a.title.localeCompare(b.title);
          return a.status === 'airing' ? -1 : 1;
        });
        break;
    }

    return results;
  }, [searchQuery, activeGenres, sortBy]);

  // ---------------------------------------------------------------------------
  // Trending series (top 4)
  // ---------------------------------------------------------------------------

  const trendingSeries = useMemo(
    () => animeDatabase.filter((s) => TRENDING_IDS.includes(s.id)),
    []
  );

  // ---------------------------------------------------------------------------
  // Navigate to series page & auto-start tracking
  // ---------------------------------------------------------------------------

  const handleCardClick = (series: AnimeSeries) => {
    if (!progress[series.id]) {
      startSeries(series.id);
    }
    router.push(`/library/${series.slug}`);
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="min-h-screen pb-20">
      {/* ================================================================= */}
      {/* Hero / Header Section                                             */}
      {/* ================================================================= */}
      <section className="relative py-16 px-6 text-center overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--accent-blue)]/10 rounded-full blur-[120px]" />
          <div className="absolute top-10 left-1/3 w-[400px] h-[200px] bg-[var(--accent-purple)]/8 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Compass className="w-8 h-8 text-[var(--accent-blue)]" />
            <h1 className="text-4xl md:text-5xl font-bold text-[#ECEEF5] font-[family-name:'Rajdhani'] uppercase tracking-wide tracking-tight">
              Explore
            </h1>
          </div>
          <p className="text-[#9899A8] text-lg mb-8 max-w-xl mx-auto">
            Discover your next anime obsession
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <SearchBar
              placeholder="Search by title..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        {/* ================================================================= */}
        {/* Genre Filter Chips                                                */}
        {/* ================================================================= */}
        <section className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <div className="flex items-center gap-1.5 text-xs text-[#8687A0] font-medium uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5" />
              <span>Genres</span>
            </div>
            {ALL_GENRES.map((genre) => {
              const isActive = activeGenres.has(genre);
              return (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`
                    px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200
                    ${
                      isActive
                        ? 'bg-[var(--accent-blue)]/15 text-[var(--accent-blue)] font-semibold border border-[var(--accent-blue)]/40 shadow-[0_0_12px_rgba(0,240,255,0.15)]'
                        : 'bg-[var(--glass-light)] text-[#B0B1C0] border border-[rgba(255,255,255,0.1)] hover:bg-[var(--glass-medium)] hover:text-[#ECEEF5]'
                    }
                  `}
                >
                  {genre}
                </button>
              );
            })}
            {activeGenres.size > 0 && (
              <button
                onClick={() => setActiveGenres(new Set())}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-[var(--accent-red)] bg-[var(--accent-red)]/10 border border-[var(--accent-red)]/20 hover:bg-[var(--accent-red)]/20 transition-all duration-200"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Sort controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-[#8687A0] font-medium uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sort</span>
            </div>
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSortBy(opt.value)}
                className={`
                  px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200
                  ${
                    sortBy === opt.value
                      ? 'bg-[var(--glass-heavy)] text-[#ECEEF5] border border-[var(--glass-border-hover)]'
                      : 'border border-transparent text-[#9899A8] hover:text-[#B0B1C0] hover:bg-[var(--glass-light)]'
                  }
                `}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* Featured / Trending Section                                       */}
        {/* ================================================================= */}
        {searchQuery.trim().length === 0 && activeGenres.size === 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-[var(--accent-orange)]" />
              <h2 className="text-xl font-bold text-[#ECEEF5] font-[family-name:'Rajdhani'] uppercase tracking-wide">
                Featured & Trending
              </h2>
              <Sparkles className="w-4 h-4 text-[var(--accent-gold)]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingSeries.map((series) => (
                <div key={series.id} className="relative group">
                  <div
                    className="glass-card-hover glass-card-glow-cyan cursor-pointer overflow-hidden"
                    onClick={() => handleCardClick(series)}
                  >
                    {/* Large poster area */}
                    <div className="relative h-56 bg-[var(--base-800)] overflow-hidden">
                      {series.posterUrl && (
                        <img
                          src={series.posterUrl}
                          alt={series.title}
                          loading="lazy"
                          className={`absolute inset-0 w-full h-full object-cover ${POSTER_POSITION[series.id] || 'object-top'}`}
                        />
                      )}
                      {!series.posterUrl && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#00F0FF]/8 to-transparent">
                          <span className="text-7xl font-bold text-white/10 font-[family-name:'Rajdhani'] uppercase tracking-wide">
                            {series.title.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--base-900)] via-transparent to-transparent opacity-70" />
                      <div className="absolute top-3 left-3 z-10">
                        <Badge
                          text="Trending"
                          variant="orange"
                          size="sm"
                          icon={<TrendingUp className="w-3 h-3" />}
                        />
                      </div>
                      <div className="absolute bottom-3 left-3 z-10">
                        <Badge
                          text={series.status === 'airing' ? 'Airing' : 'Completed'}
                          variant={series.status === 'airing' ? 'green' : 'blue'}
                          size="sm"
                        />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="text-base font-semibold text-[#ECEEF5] mb-1 group-hover:text-[var(--accent-blue)] transition-colors">
                        {series.title}
                      </h3>
                      <p className="text-xs text-[#8687A0] mb-2">
                        {series.totalEpisodes} episodes &middot; {series.genre.slice(0, 3).join(', ')}
                      </p>
                      <p className="text-xs text-[#7D7E96] line-clamp-2 leading-relaxed">
                        {series.description.slice(0, 120)}...
                      </p>

                      {/* Progress if already tracking */}
                      {progress[series.id] && (
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex-1 h-1 rounded-full bg-[var(--glass-light)] overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[#00F0FF] transition-all duration-500"
                              style={{
                                width: `${Math.min(100, (progress[series.id].currentEpisode / series.totalEpisodes) * 100)}%`,
                              }}
                            />
                          </div>
                          <span className="text-xs text-[#9899A8]">
                            EP {progress[series.id].currentEpisode}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* Series Count Badge                                                */}
        {/* ================================================================= */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <p className="text-sm text-[#8687A0]">
              Showing{' '}
              <span className="text-[#B0B1C0] font-semibold">
                {filteredAnime.length}
              </span>{' '}
              series
            </p>
            <Badge
              text={`${animeDatabase.length} Total`}
              variant="blue"
              size="sm"
            />
          </div>
          {searchQuery && (
            <p className="text-sm text-[#8687A0]">
              Results for &ldquo;
              <span className="text-[var(--accent-blue)]">{searchQuery}</span>
              &rdquo;
            </p>
          )}
        </div>

        {/* ================================================================= */}
        {/* Full Anime Grid                                                   */}
        {/* ================================================================= */}
        {filteredAnime.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filteredAnime.map((series) => (
              <AnimeCard
                key={series.id}
                series={series}
                progress={progress[series.id] ?? undefined}
                onClick={() => handleCardClick(series)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-white/[0.04] flex items-center justify-center mx-auto mb-4">
              <Compass className="w-8 h-8 text-[rgba(200,202,216,0.3)]" />
            </div>
            <h3 className="text-lg font-semibold text-[#ECEEF5] mb-2 font-[family-name:'Rajdhani'] uppercase tracking-wide">
              No anime found
            </h3>
            <p className="text-sm text-[#8687A0]">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
