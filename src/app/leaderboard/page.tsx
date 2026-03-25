'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/stores';
import { useSocialStore } from '@/lib/stores/socialStore';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import { getOtakuRank } from '@/types';
import type { LeaderboardEntry } from '@/types';
import { cn, formatNumber } from '@/lib/utils';
import {
  Trophy,
  Crown,
  Medal,
  Users,
  Zap,
  TrendingUp,
  ChevronDown,
  Calendar,
  Tv,
  Award,
} from 'lucide-react';

// -----------------------------------------------------------------------------
// Fake leaderboard data (10-15 entries)
// -----------------------------------------------------------------------------

const FAKE_ENTRIES: LeaderboardEntry[] = [
  { rank: 1, userId: 'lb-1', username: 'AnimeGodZoro', avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=zoro2', level: 88, totalXP: 774400, accentColor: '#FFD700' },
  { rank: 2, userId: 'lb-2', username: 'PirateQueen', avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=nami', level: 72, totalXP: 518400, accentColor: '#FF6B35' },
  { rank: 3, userId: 'lb-3', username: 'SasukeFan99', avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=sasuke', level: 65, totalXP: 422500, accentColor: '#8B5CF6' },
  { rank: 4, userId: 'lb-4', username: 'WeebLord420', avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=weeb', level: 58, totalXP: 336400, accentColor: '#E63946' },
  { rank: 5, userId: 'lb-5', username: 'NarutoRunGirl', avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=hinata2', level: 52, totalXP: 270400, accentColor: '#FF006E' },
  { rank: 6, userId: 'lb-6', username: 'TitanSlayer', avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=eren', level: 48, totalXP: 230400, accentColor: '#E63946' },
  { rank: 7, userId: 'lb-7', username: 'GonFreecs', avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=gon', level: 44, totalXP: 193600, accentColor: '#06D6A0' },
  { rank: 8, userId: 'lb-8', username: 'SailorMoonX', avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=usagi', level: 40, totalXP: 160000, accentColor: '#FF006E' },
  { rank: 9, userId: 'lb-9', username: 'SpikeSpiegel', avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=spike', level: 36, totalXP: 129600, accentColor: '#00F0FF' },
  { rank: 10, userId: 'lb-10', username: 'MegumiBestGirl', avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=megumi', level: 33, totalXP: 108900, accentColor: '#00B4D8' },
  { rank: 11, userId: 'lb-11', username: 'DeathNote_L', avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=lawliet', level: 30, totalXP: 90000, accentColor: '#00F0FF' },
  { rank: 12, userId: 'lb-12', username: 'ZoroLostAgain', avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=zoro', level: 28, totalXP: 78400, accentColor: '#06D6A0' },
  { rank: 13, userId: 'lb-13', username: 'JujutsuSimp', avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=jjk', level: 25, totalXP: 62500, accentColor: '#8B5CF6' },
  { rank: 14, userId: 'lb-14', username: 'LuffyGear5', avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=luffy2', level: 22, totalXP: 48400, accentColor: '#FF6B35' },
  { rank: 15, userId: 'lb-15', username: 'VegetaPride', avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=vegeta', level: 20, totalXP: 40000, accentColor: '#00F0FF' },
];

// Series for Per-Series tab
const SERIES_OPTIONS = [
  { id: 'one-piece', title: 'One Piece' },
  { id: 'naruto-shippuden', title: 'Naruto Shippuden' },
  { id: 'bleach', title: 'Bleach' },
  { id: 'dragon-ball-super', title: 'Dragon Ball Super' },
  { id: 'attack-on-titan', title: 'Attack on Titan' },
  { id: 'jujutsu-kaisen', title: 'Jujutsu Kaisen' },
];

// Generate fake per-series leaderboard
function generateSeriesLeaderboard(seriesId: string): (LeaderboardEntry & { episode: number })[] {
  const seed = seriesId.length;
  return FAKE_ENTRIES.slice(0, 10).map((entry, i) => ({
    ...entry,
    rank: i + 1,
    episode: Math.max(1, Math.floor(800 / (i + 1) + seed * 10)),
  }));
}

// Podium rank icons
function getRankIcon(rank: number) {
  if (rank === 1) return <Crown className="w-7 h-7 text-[var(--accent-gold)]" />;
  if (rank === 2) return <Medal className="w-6 h-6 text-[#C0C0C0]" />;
  if (rank === 3) return <Award className="w-6 h-6 text-[#CD7F32]" />;
  return null;
}

function getRankColor(rank: number) {
  if (rank === 1) return 'var(--accent-gold)';
  if (rank === 2) return '#C0C0C0';
  if (rank === 3) return '#CD7F32';
  return 'var(--glass-border)';
}

// -----------------------------------------------------------------------------
// Tabs
// -----------------------------------------------------------------------------

type LeaderboardTab = 'global' | 'friends' | 'weekly' | 'per-series';

interface TabConfig {
  key: LeaderboardTab;
  label: string;
  icon: React.ReactNode;
}

const TABS: TabConfig[] = [
  { key: 'global', label: 'Global', icon: <Trophy className="w-3.5 h-3.5" /> },
  { key: 'friends', label: 'Friends', icon: <Users className="w-3.5 h-3.5" /> },
  { key: 'weekly', label: 'Weekly', icon: <Zap className="w-3.5 h-3.5" /> },
  { key: 'per-series', label: 'Per-Series', icon: <TrendingUp className="w-3.5 h-3.5" /> },
];

// =============================================================================
// Leaderboard Page
// =============================================================================

export default function LeaderboardPage() {
  const router = useRouter();
  const { user, isLoggedIn, hydrated, sessionReady, loadFromStorage: loadUser } = useUserStore();

  const [activeTab, setActiveTab] = useState<LeaderboardTab>('global');
  const [selectedSeries, setSelectedSeries] = useState(SERIES_OPTIONS[0].id);
  const [seriesDropdownOpen, setSeriesDropdownOpen] = useState(false);

  // Hydrate user store
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Redirect if not logged in
  useEffect(() => {
    if (hydrated && sessionReady && !isLoggedIn) {
      router.push('/');
    }
  }, [hydrated, sessionReady, isLoggedIn, router]);

  // ---------------------------------------------------------------------------
  // Build leaderboard with current user injected
  // ---------------------------------------------------------------------------

  const leaderboard = useMemo(() => {
    const entries = [...FAKE_ENTRIES];
    if (user) {
      const userEntry: LeaderboardEntry = {
        rank: 0,
        userId: user.id,
        username: user.username,
        avatarUrl: user.avatarUrl,
        level: user.level,
        totalXP: user.totalXP,
        accentColor: user.accentColor,
      };
      entries.push(userEntry);
    }
    entries.sort((a, b) => b.totalXP - a.totalXP);
    entries.forEach((e, i) => (e.rank = i + 1));
    return entries;
  }, [user]);

  // Friends leaderboard
  const friendsLeaderboard = useMemo(() => {
    const friendIds = new Set(['lb-2', 'lb-3', 'lb-6', 'lb-7', 'lb-9', 'lb-12']);
    const entries = leaderboard
      .filter((e) => friendIds.has(e.userId) || e.userId === user?.id)
      .map((e, i) => ({ ...e, rank: i + 1 }));
    return entries;
  }, [leaderboard, user]);

  // Weekly leaderboard (shuffled XP for variety)
  const weeklyLeaderboard = useMemo(() => {
    const entries = leaderboard.map((e, i) => ({
      ...e,
      totalXP: Math.floor(e.totalXP * (0.1 + Math.sin(i * 1.7) * 0.05)),
    }));
    entries.sort((a, b) => b.totalXP - a.totalXP);
    entries.forEach((e, i) => (e.rank = i + 1));
    return entries;
  }, [leaderboard]);

  const seriesLeaderboard = useMemo(
    () => generateSeriesLeaderboard(selectedSeries),
    [selectedSeries],
  );

  // Active list
  const activeList = useMemo(() => {
    switch (activeTab) {
      case 'global': return leaderboard;
      case 'friends': return friendsLeaderboard;
      case 'weekly': return weeklyLeaderboard;
      default: return leaderboard;
    }
  }, [activeTab, leaderboard, friendsLeaderboard, weeklyLeaderboard]);

  const top3 = activeList.slice(0, 3);
  const restList = activeList.slice(3);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (!hydrated || !isLoggedIn || !user) return null;

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-7 h-7 text-[var(--accent-gold)]" />
          <h1 className="text-3xl font-bold font-[family-name:'Rajdhani'] uppercase tracking-wide text-[#ECEEF5]">
            Leaderboard
          </h1>
        </div>
        <p className="text-sm text-[#9899A8]">
          See how you rank against other anime fans worldwide.
        </p>
      </div>

      {/* Tab selector */}
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
      {/* Per-Series Tab                                                       */}
      {/* ------------------------------------------------------------------- */}
      {activeTab === 'per-series' ? (
        <div>
          {/* Series selector dropdown */}
          <div className="relative mb-8 w-64">
            <button
              onClick={() => setSeriesDropdownOpen((prev) => !prev)}
              aria-label="Select anime series"
              className="glass-button w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-[rgba(200,202,216,0.8)]"
            >
              {SERIES_OPTIONS.find((s) => s.id === selectedSeries)?.title}
              <ChevronDown className={cn('w-4 h-4 transition-transform', seriesDropdownOpen && 'rotate-180')} />
            </button>

            {seriesDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setSeriesDropdownOpen(false)}
                />
                <div className="absolute left-0 top-full mt-1 z-50 w-full glass-card p-1.5 shadow-xl">
                  {SERIES_OPTIONS.map((series) => (
                    <button
                      key={series.id}
                      onClick={() => {
                        setSelectedSeries(series.id);
                        setSeriesDropdownOpen(false);
                      }}
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-[var(--radius-sm)] text-xs transition-colors duration-150',
                        selectedSeries === series.id
                          ? 'bg-[var(--accent-blue)]/20 text-[var(--accent-blue)]'
                          : 'text-[rgba(200,202,216,0.6)] hover:bg-[var(--glass-light)] hover:text-[rgba(200,202,216,0.9)]',
                      )}
                    >
                      {series.title}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Series leaderboard list */}
          <div className="glass-card overflow-hidden">
            <div className="grid grid-cols-[3rem_1fr_6rem_5rem] sm:grid-cols-[3rem_1fr_8rem_6rem] px-4 py-3 border-b border-[var(--glass-border)] text-xs font-medium text-[rgba(200,202,216,0.5)] uppercase tracking-wider">
              <span>#</span>
              <span>User</span>
              <span className="text-right">Episode</span>
              <span className="text-right">Level</span>
            </div>
            {seriesLeaderboard.map((entry) => (
              <div
                key={entry.userId}
                className={cn(
                  'grid grid-cols-[3rem_1fr_6rem_5rem] sm:grid-cols-[3rem_1fr_8rem_6rem] px-4 py-3 items-center border-b border-[var(--glass-border)] last:border-0 transition-colors duration-150 hover:bg-[var(--glass-light)]',
                  entry.userId === user?.id && 'bg-[var(--accent-blue)]/5 border-l-2 border-l-[var(--accent-blue)]',
                )}
              >
                <span className={cn(
                  'text-sm font-bold',
                  entry.rank <= 3 ? 'text-[var(--accent-gold)]' : 'text-[rgba(200,202,216,0.5)]',
                )}>
                  {entry.rank}
                </span>
                <div className="flex items-center gap-2 min-w-0">
                  <Avatar
                    src={entry.avatarUrl}
                    username={entry.username}
                    size="sm"
                    accentColor={entry.accentColor}
                  />
                  <span className="text-sm font-medium text-[#ECEEF5] truncate">
                    {entry.username}
                    {entry.userId === user?.id && (
                      <span className="text-xs text-[var(--accent-blue)] ml-1">(You)</span>
                    )}
                  </span>
                </div>
                <span className="text-sm font-semibold text-[var(--accent-orange)] text-right">
                  Ep. {entry.episode}
                </span>
                <span className="text-sm text-[#9899A8] text-right">
                  {entry.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* ----------------------------------------------------------------- */}
          {/* PODIUM SECTION (Top 3) - Dramatic display                         */}
          {/* ----------------------------------------------------------------- */}
          {top3.length >= 3 && (
            <div className="relative mb-12 mt-10">
              {/* Background glow for podium */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[var(--accent-gold)]/5 rounded-full blur-[100px]" />
              </div>

              <div className="relative flex items-end justify-center gap-2 sm:gap-4 px-0 sm:px-4">
                {/* 2nd place (left) */}
                <div className="flex flex-col items-center flex-1 sm:flex-none">
                  <div
                    className="glass-card-hover p-3 sm:p-4 flex flex-col items-center gap-1.5 sm:gap-2 w-full sm:w-36 relative overflow-hidden"
                    style={{ borderColor: getRankColor(2) + '33' }}
                  >
                    <div className="absolute inset-0 bg-[#C0C0C0]/5 pointer-events-none" />
                    {getRankIcon(2)}
                    <Avatar
                      src={top3[1].avatarUrl}
                      username={top3[1].username}
                      size="lg"
                      showLevel
                      level={top3[1].level}
                      accentColor={top3[1].accentColor}
                    />
                    <p className="text-xs sm:text-sm font-semibold text-[#ECEEF5] truncate w-full text-center">
                      {top3[1].username}
                    </p>
                    <Badge text={getOtakuRank(top3[1].level).name} variant="purple" size="sm" />
                    <p className="text-xs font-bold gradient-text-xp">
                      {formatNumber(top3[1].totalXP)} XP
                    </p>
                  </div>
                  <div className="w-full h-12 sm:h-16 bg-[#C0C0C0]/8 rounded-b-lg" />
                </div>

                {/* 1st place (center, tallest with crown and gold glow) */}
                <div className="flex flex-col items-center -mt-8 flex-1 sm:flex-none">
                  <div
                    className="group glass-card-hover p-3 sm:p-5 flex flex-col items-center gap-1.5 sm:gap-2 w-full sm:w-44 relative overflow-hidden hover:border-[var(--accent-gold)]/25 hover:shadow-[0_0_30px_rgba(255,215,0,0.08)] transition-all duration-300"
                  >
                    {/* Gold glow background — only on hover */}
                    <div className="absolute inset-0 bg-[var(--accent-gold)]/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    {getRankIcon(1)}
                    <Avatar
                      src={top3[0].avatarUrl}
                      username={top3[0].username}
                      size="xl"
                      showLevel
                      level={top3[0].level}
                      accentColor={top3[0].accentColor}
                    />
                    <p className="text-sm sm:text-base font-bold text-[#ECEEF5] truncate w-full text-center">
                      {top3[0].username}
                    </p>
                    <Badge text={getOtakuRank(top3[0].level).name} variant="gold" size="sm" />
                    <p className="text-xs sm:text-sm font-bold gradient-text-gold">
                      {formatNumber(top3[0].totalXP)} XP
                    </p>
                  </div>
                  <div className="w-full h-16 sm:h-24 bg-[var(--accent-gold)]/8 rounded-b-lg" />
                </div>

                {/* 3rd place (right) */}
                <div className="flex flex-col items-center flex-1 sm:flex-none">
                  <div
                    className="glass-card-hover p-3 sm:p-4 flex flex-col items-center gap-1.5 sm:gap-2 w-full sm:w-36 relative overflow-hidden"
                    style={{ borderColor: getRankColor(3) + '33' }}
                  >
                    <div className="absolute inset-0 bg-[#CD7F32]/5 pointer-events-none" />
                    {getRankIcon(3)}
                    <Avatar
                      src={top3[2].avatarUrl}
                      username={top3[2].username}
                      size="lg"
                      showLevel
                      level={top3[2].level}
                      accentColor={top3[2].accentColor}
                    />
                    <p className="text-xs sm:text-sm font-semibold text-[#ECEEF5] truncate w-full text-center">
                      {top3[2].username}
                    </p>
                    <Badge text={getOtakuRank(top3[2].level).name} variant="orange" size="sm" />
                    <p className="text-xs font-bold gradient-text">
                      {formatNumber(top3[2].totalXP)} XP
                    </p>
                  </div>
                  <div className="w-full h-8 sm:h-10 bg-[#CD7F32]/8 rounded-b-lg" />
                </div>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------------- */}
          {/* RANKED LIST (4th onward)                                           */}
          {/* ----------------------------------------------------------------- */}
          <div className="glass-card overflow-hidden">
            <div className="grid grid-cols-[3rem_1fr_5rem_6rem] sm:grid-cols-[3rem_1fr_6rem_5rem_7rem] px-4 py-3 border-b border-[var(--glass-border)] text-xs font-medium text-[rgba(200,202,216,0.5)] uppercase tracking-wider">
              <span>#</span>
              <span>User</span>
              <span className="hidden sm:block text-right">Rank</span>
              <span className="text-right">Level</span>
              <span className="text-right">Total XP</span>
            </div>

            {restList.map((entry) => (
              <div
                key={entry.userId}
                className={cn(
                  'grid grid-cols-[3rem_1fr_5rem_6rem] sm:grid-cols-[3rem_1fr_6rem_5rem_7rem] px-4 py-3 items-center border-b border-[var(--glass-border)] last:border-0 transition-colors duration-150 hover:bg-[var(--glass-light)]',
                  entry.userId === user?.id && 'bg-[var(--accent-blue)]/5 border-l-2 border-l-[var(--accent-blue)]',
                )}
              >
                <span className="text-sm font-bold text-[rgba(200,202,216,0.5)]">
                  {entry.rank}
                </span>
                <div className="flex items-center gap-2 min-w-0">
                  <Avatar
                    src={entry.avatarUrl}
                    username={entry.username}
                    size="sm"
                    accentColor={entry.accentColor}
                  />
                  <span className="text-sm font-medium text-[#ECEEF5] truncate">
                    {entry.username}
                    {entry.userId === user?.id && (
                      <span className="text-xs text-[var(--accent-blue)] ml-1">(You)</span>
                    )}
                  </span>
                </div>
                <span className="hidden sm:block text-xs text-right">
                  <Badge
                    text={getOtakuRank(entry.level).name}
                    variant="purple"
                    size="sm"
                  />
                </span>
                <span className="text-sm text-[#9899A8] text-right">
                  {entry.level}
                </span>
                <span className="text-sm font-semibold gradient-text-xp text-right">
                  {formatNumber(entry.totalXP)}
                </span>
              </div>
            ))}
          </div>

          {/* Current user's position callout */}
          {user && (
            <div className="mt-6 glass-card p-4 flex items-center justify-between border-[var(--accent-blue)]/20">
              <div className="flex items-center gap-3">
                <Avatar
                  src={user.avatarUrl}
                  username={user.username}
                  size="md"
                  showLevel
                  level={user.level}
                  accentColor={user.accentColor}
                />
                <div>
                  <p className="text-sm font-semibold text-[#ECEEF5]">Your Position</p>
                  <p className="text-xs text-[rgba(200,202,216,0.5)]">
                    {getOtakuRank(user.level).name}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold gradient-text-gold font-[family-name:'Rajdhani'] uppercase tracking-wide">
                  #{leaderboard.find((e) => e.userId === user.id)?.rank ?? '--'}
                </p>
                <p className="text-xs text-[rgba(200,202,216,0.5)]">
                  {formatNumber(user.totalXP)} XP
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
