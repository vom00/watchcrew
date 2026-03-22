'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUserStore, useProgressStore } from '@/lib/stores';
import Avatar from '@/components/ui/Avatar';
import ProgressBar from '@/components/ui/ProgressBar';
import Badge from '@/components/ui/Badge';
import AchievementBadge from '@/components/ui/AchievementBadge';
import { animeDatabase } from '@/data/anime';
import { achievements as allAchievements } from '@/lib/achievements';
import { xpForNextLevel, getOtakuRank } from '@/types';
import type { UserAchievement } from '@/types';
import { formatNumber, formatHours } from '@/lib/utils';
import { getItem, STORAGE_KEYS } from '@/lib/storage';
import {
  User,
  Shield,
  Edit3,
  Trophy,
  Flame,
  Clock,
  BookOpen,
  Award,
  Star,
  Calendar,
  MessageCircle,
  X,
} from 'lucide-react';

// =============================================================================
// Demo user profiles for viewing other users
// =============================================================================

const DEMO_PROFILES: Record<string, {
  username: string;
  displayName: string;
  level: number;
  totalXP: number;
  accentColor: string;
  bio: string;
  customStatus: string;
  currentStreak: number;
  totalEpisodesWatched: number;
  seriesCompletedCount: number;
  createdAt: string;
  avatarUrl: string;
  bannerUrl: string;
}> = {
  SasukeFan99: { username: 'SasukeFan99', displayName: 'Sasuke Fan', level: 24, totalXP: 57600, accentColor: '#8B5CF6', bio: 'Uchiha clan forever. Currently rewatching Shippuden for the 5th time.', customStatus: 'Watching Naruto Shippuden', currentStreak: 12, totalEpisodesWatched: 890, seriesCompletedCount: 4, createdAt: '2024-06-15T00:00:00.000Z', avatarUrl: '', bannerUrl: '' },
  PirateQueen: { username: 'PirateQueen', displayName: 'Pirate Queen', level: 42, totalXP: 176400, accentColor: '#FF3366', bio: 'Navigator of the Grand Line. One Piece is life.', customStatus: 'Caught up with One Piece', currentStreak: 45, totalEpisodesWatched: 2100, seriesCompletedCount: 8, createdAt: '2024-02-10T00:00:00.000Z', avatarUrl: '', bannerUrl: '' },
  TitanSlayer: { username: 'TitanSlayer', displayName: 'Titan Slayer', level: 18, totalXP: 32400, accentColor: '#39FF14', bio: 'Shinzou wo sasageyo! AoT changed my life.', customStatus: 'Watching Attack on Titan S4', currentStreak: 7, totalEpisodesWatched: 420, seriesCompletedCount: 2, createdAt: '2024-09-01T00:00:00.000Z', avatarUrl: '', bannerUrl: '' },
  GonFreecs: { username: 'GonFreecs', displayName: 'Gon Freecs', level: 15, totalXP: 22500, accentColor: '#00F0FF', bio: 'Hunter x Hunter enthusiast. Still waiting for new chapters...', customStatus: 'Rewatching HxH', currentStreak: 3, totalEpisodesWatched: 310, seriesCompletedCount: 1, createdAt: '2024-11-20T00:00:00.000Z', avatarUrl: '', bannerUrl: '' },
  SpikeSpiegel: { username: 'SpikeSpiegel', displayName: 'Spike Spiegel', level: 31, totalXP: 96100, accentColor: '#FFB800', bio: 'See you, space cowboy. Classic anime connoisseur.', customStatus: 'Watching Cowboy Bebop', currentStreak: 20, totalEpisodesWatched: 1500, seriesCompletedCount: 6, createdAt: '2024-04-01T00:00:00.000Z', avatarUrl: '', bannerUrl: '' },
  SailorMoonX: { username: 'SailorMoonX', displayName: 'Sailor Moon', level: 28, totalXP: 78400, accentColor: '#E91E8A', bio: 'In the name of the moon, I will binge-watch you!', customStatus: 'Watching Sailor Moon Crystal', currentStreak: 15, totalEpisodesWatched: 1200, seriesCompletedCount: 5, createdAt: '2024-05-15T00:00:00.000Z', avatarUrl: '', bannerUrl: '' },
  SakuraFan: { username: 'SakuraFan', displayName: 'Sakura Fan', level: 19, totalXP: 36100, accentColor: '#FF3366', bio: 'Sakura deserved better!', customStatus: 'Watching Naruto', currentStreak: 5, totalEpisodesWatched: 500, seriesCompletedCount: 2, createdAt: '2024-08-10T00:00:00.000Z', avatarUrl: '', bannerUrl: '' },
  GokuRising: { username: 'GokuRising', displayName: 'Goku Rising', level: 35, totalXP: 122500, accentColor: '#FFB800', bio: 'Kamehameha! Dragon Ball fan since day one.', customStatus: 'Watching Dragon Ball Super', currentStreak: 30, totalEpisodesWatched: 1800, seriesCompletedCount: 7, createdAt: '2024-01-01T00:00:00.000Z', avatarUrl: '', bannerUrl: '' },
  ZoroSensei: { username: 'ZoroSensei', displayName: 'Zoro Sensei', level: 44, totalXP: 193600, accentColor: '#39FF14', bio: 'Three sword style master. Always getting lost.', customStatus: 'Watching One Piece', currentStreak: 60, totalEpisodesWatched: 2400, seriesCompletedCount: 9, createdAt: '2023-12-01T00:00:00.000Z', avatarUrl: '', bannerUrl: '' },
  NarutoRunner: { username: 'NarutoRunner', displayName: 'Naruto Runner', level: 27, totalXP: 72900, accentColor: '#00F0FF', bio: 'Believe it! Running through anime at top speed.', customStatus: 'Watching Boruto', currentStreak: 14, totalEpisodesWatched: 1100, seriesCompletedCount: 4, createdAt: '2024-03-20T00:00:00.000Z', avatarUrl: '', bannerUrl: '' },
  MikasaQueen: { username: 'MikasaQueen', displayName: 'Mikasa Queen', level: 33, totalXP: 108900, accentColor: '#8B5CF6', bio: 'Ereh! AoT is the greatest anime ever made.', customStatus: 'Rewatching AoT Final Season', currentStreak: 22, totalEpisodesWatched: 1600, seriesCompletedCount: 5, createdAt: '2024-04-15T00:00:00.000Z', avatarUrl: '', bannerUrl: '' },
  LeviFanatic: { username: 'LeviFanatic', displayName: 'Levi Fanatic', level: 51, totalXP: 260100, accentColor: '#FF3366', bio: 'Humanity\'s strongest soldier fan. Clean freak.', customStatus: 'AoT Complete!', currentStreak: 80, totalEpisodesWatched: 3000, seriesCompletedCount: 12, createdAt: '2023-09-01T00:00:00.000Z', avatarUrl: '', bannerUrl: '' },
};

// =============================================================================
// Profile Page — Midnight Forge Gaming Profile
// =============================================================================

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const hydrated = useUserStore((s) => s.hydrated);
  const progress = useProgressStore((s) => s.progress);
  const [showMessageModal, setShowMessageModal] = useState(false);

  // ---------------------------------------------------------------------------
  // Login check — redirect to home if not logged in
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (hydrated && !user) {
      router.push('/');
    }
  }, [hydrated, user, router]);

  // ---------------------------------------------------------------------------
  // Derived data
  // ---------------------------------------------------------------------------

  const isOwn = user?.username === params.username;
  const demoP = !isOwn && params.username ? DEMO_PROFILES[params.username as string] : null;
  const displayLevel = isOwn ? user?.level : demoP?.level;
  const displayXP = isOwn ? user?.totalXP : demoP?.totalXP;

  const rank = useMemo(() => {
    if (!displayLevel) return null;
    return getOtakuRank(displayLevel);
  }, [displayLevel]);

  const levelProgress = useMemo(() => {
    if (!displayXP) return null;
    return xpForNextLevel(displayXP);
  }, [displayXP]);

  const unlockedAchievements = useMemo(() => {
    if (typeof window === 'undefined') return [];
    const stored = getItem<UserAchievement[]>(STORAGE_KEYS.ACHIEVEMENTS);
    return stored ?? [];
  }, []);

  const featuredBadges = useMemo(() => {
    const unlockedIds = new Set(unlockedAchievements.map((a) => a.achievementId));
    return allAchievements
      .filter((a) => unlockedIds.has(a.id))
      .slice(0, 6);
  }, [unlockedAchievements]);

  const watchingSeries = useMemo(() => {
    const allProgress = Object.values(progress);
    return allProgress
      .filter((p) => p.watchStatus === 'watching' || p.watchStatus === 'completed')
      .sort((a, b) => b.currentEpisode - a.currentEpisode)
      .slice(0, 6)
      .map((p) => {
        const anime = animeDatabase.find((a) => a.id === p.seriesId);
        return { progress: p, anime };
      })
      .filter((item) => item.anime);
  }, [progress]);

  const totalEpisodes = useMemo(() => {
    return Object.values(progress).reduce((sum, p) => sum + p.currentEpisode, 0);
  }, [progress]);

  const seriesCompleted = useMemo(() => {
    return Object.values(progress).filter((p) => p.watchStatus === 'completed').length;
  }, [progress]);

  // ---------------------------------------------------------------------------
  // Guard: not hydrated yet (SSR hydration)
  // ---------------------------------------------------------------------------
  if (!hydrated) {
    return null;
  }

  // ---------------------------------------------------------------------------
  // Guard: not logged in
  // ---------------------------------------------------------------------------
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-8 text-center max-w-md">
          <Shield className="w-12 h-12 text-[#00F0FF] mx-auto mb-4" />
          <h2 className="text-xl font-[family-name:'Rajdhani'] uppercase tracking-wide font-bold text-[#ECEEF5] mb-2">
            Profile Not Found
          </h2>
          <p className="text-[#9899A8] mb-6">
            Log in to view your profile or search for other users.
          </p>
          <button onClick={() => router.push('/')} className="btn-accent">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Computed values for render
  // ---------------------------------------------------------------------------
  const isOwnProfile = user.username === params.username;
  const demoProfile = !isOwnProfile ? DEMO_PROFILES[params.username as string] : null;

  // The profile data to display — own user or demo profile
  const profileData = isOwnProfile ? {
    username: user.username,
    displayName: user.displayName || user.username,
    level: user.level,
    totalXP: user.totalXP,
    accentColor: user.accentColor,
    bio: user.bio,
    customStatus: user.customStatus,
    currentStreak: user.currentStreak,
    totalEpisodesWatched: user.totalEpisodesWatched,
    seriesCompletedCount: user.seriesCompletedCount,
    createdAt: user.createdAt,
    avatarUrl: user.avatarUrl,
    bannerUrl: user.bannerUrl,
  } : demoProfile;

  // If viewing someone else's profile and no demo data, show not found
  if (!isOwnProfile && !demoProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-8 text-center max-w-md">
          <User className="w-12 h-12 text-[#00F0FF] mx-auto mb-4" />
          <h2 className="text-xl font-[family-name:'Rajdhani'] uppercase tracking-wide font-bold text-[#ECEEF5] mb-2">
            User Not Found
          </h2>
          <p className="text-[#9899A8] mb-6">
            This user doesn&apos;t exist or their profile is private.
          </p>
          <button onClick={() => router.push('/friends')} className="btn-accent">
            Back to Friends
          </button>
        </div>
      </div>
    );
  }

  if (!profileData) return null;

  const joinDate = new Date(profileData.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen pb-12">
      {/* ===================================================================== */}
      {/* BANNER AREA — gradient from blue to purple */}
      {/* ===================================================================== */}
      <div className="relative">
        <div className="h-48 md:h-64 w-full relative overflow-hidden">
          {profileData.bannerUrl ? (
            <>
              <img
                src={profileData.bannerUrl}
                alt={profileData.displayName + "'s profile banner"}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06060B] via-[#06060B]/20 to-transparent" />
            </>
          ) : (
            <>
              {/* Primary accent background */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, ${profileData.accentColor}40 0%, ${profileData.accentColor}10 60%, transparent 100%)`,
                }}
              />
              {/* Grid lines */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
                  backgroundSize: '48px 48px',
                }}
              />
            </>
          )}
          {/* Bottom fade to base */}
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#06060B] to-transparent" />
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Avatar overlapping banner + identity info */}
        {/* ----------------------------------------------------------------- */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative -mt-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
            {/* Avatar with accent ring */}
            <div className="relative flex-shrink-0">
              <div
                className="w-24 h-24 rounded-full p-[3px]"
                style={{
                  background: `linear-gradient(135deg, ${profileData.accentColor}, ${profileData.accentColor}88)`,
                  boxShadow: `0 0 32px ${profileData.accentColor}44`,
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-[#06060B] p-[2px]">
                  {profileData.avatarUrl ? (
                    <img
                      src={profileData.avatarUrl}
                      alt={profileData.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full rounded-full flex items-center justify-center text-white text-2xl font-bold"
                      style={{
                        background: `linear-gradient(135deg, ${profileData.accentColor}, ${profileData.accentColor}88)`,
                      }}
                    >
                      {profileData.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
              {/* Level badge */}
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border border-[#06060B] bg-gradient-to-br from-[#FFB800] to-[#FF8C00]">
                <span className="text-[#06060B]">{profileData.level}</span>
              </div>
            </div>

            {/* Name, username, status */}
            <div className="flex-1 pb-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-[family-name:'Rajdhani'] uppercase tracking-wide font-bold text-[#ECEEF5]">
                  {profileData.displayName || profileData.username}
                </h1>
                {rank && (
                  <Badge
                    text={rank.name}
                    variant="gold"
                    icon={<Award className="w-3 h-3" />}
                  />
                )}
              </div>
              <p className="text-[#9899A8] text-sm mt-0.5">
                @{profileData.username}
              </p>
              {profileData.customStatus && (
                <p className="text-[rgba(200,202,216,0.5)] text-sm mt-1 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-[#FFB800]" />
                  {profileData.customStatus}
                </p>
              )}
              <p className="text-[rgba(200,202,216,0.5)] text-xs mt-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Joined {joinDate}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              {!isOwnProfile && (
                <button
                  onClick={() => setShowMessageModal(true)}
                  className="glass-card-hover px-4 py-2 text-sm font-medium text-[rgba(200,202,216,0.8)] hover:text-[#00F0FF] flex items-center gap-2 rounded-lg transition-all duration-200 border border-white/[0.06] hover:border-[#00F0FF]/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  Message
                </button>
              )}
              {isOwnProfile && (
                <button
                  onClick={() => router.push(`/profile/${user.username}/edit`)}
                  className="glass-card-hover px-4 py-2 text-sm font-medium text-[rgba(200,202,216,0.8)] hover:text-[#ECEEF5] flex items-center gap-2 rounded-lg transition-all duration-200 border border-white/[0.06] hover:border-white/[0.12]"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* CONTENT AREA */}
      {/* ===================================================================== */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8 space-y-8">
        {/* ----------------------------------------------------------------- */}
        {/* STATS ROW */}
        {/* ----------------------------------------------------------------- */}
        <div className="glass-card p-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Total Episodes */}
            <div className="text-center p-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <BookOpen className="w-4 h-4 text-[#00F0FF]" />
                <span className="text-xs text-[#9899A8] uppercase tracking-wider font-medium">
                  Episodes
                </span>
              </div>
              <span className="text-xl font-[family-name:'Rajdhani'] uppercase tracking-wide font-bold gradient-text">
                {formatNumber(isOwnProfile ? (totalEpisodes || profileData.totalEpisodesWatched) : profileData.totalEpisodesWatched)}
              </span>
            </div>

            {/* Hours Watched */}
            <div className="text-center p-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <Clock className="w-4 h-4 text-[#8B5CF6]" />
                <span className="text-xs text-[#9899A8] uppercase tracking-wider font-medium">
                  Watch Time
                </span>
              </div>
              <span className="text-xl font-[family-name:'Rajdhani'] uppercase tracking-wide font-bold gradient-text-xp">
                {formatHours(totalEpisodes || user.totalEpisodesWatched)}
              </span>
            </div>

            {/* Current Streak */}
            <div className="text-center p-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <Flame className="w-4 h-4 text-[#FF3366]" />
                <span className="text-xs text-[#9899A8] uppercase tracking-wider font-medium">
                  Streak
                </span>
              </div>
              <span className="text-xl font-[family-name:'Rajdhani'] uppercase tracking-wide font-bold gradient-text-streak">
                {profileData.currentStreak} days
              </span>
            </div>

            {/* Series Completed */}
            <div className="text-center p-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <Trophy className="w-4 h-4 text-[#39FF14]" />
                <span className="text-xs text-[#9899A8] uppercase tracking-wider font-medium">
                  Completed
                </span>
              </div>
              <span className="text-xl font-[family-name:'Rajdhani'] uppercase tracking-wide font-bold" style={{ color: '#39FF14' }}>
                {isOwnProfile ? (seriesCompleted || profileData.seriesCompletedCount) : profileData.seriesCompletedCount}
              </span>
            </div>

            {/* Otaku Level + Rank */}
            <div className="text-center p-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.06] transition-colors col-span-2 sm:col-span-1">
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <Shield className="w-4 h-4 text-[#FFB800]" />
                <span className="text-xs text-[#9899A8] uppercase tracking-wider font-medium">
                  Level
                </span>
              </div>
              <span className="text-xl font-[family-name:'Rajdhani'] uppercase tracking-wide font-bold gradient-text-gold">
                Lv. {profileData.level}
              </span>
              {rank && (
                <p className="text-xs text-[rgba(200,202,216,0.5)] mt-0.5">
                  {rank.name}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* XP PROGRESS BAR */}
        {/* ----------------------------------------------------------------- */}
        {levelProgress && (
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#FFB800]" />
                <span className="text-sm font-[family-name:'Rajdhani'] uppercase tracking-wide font-semibold text-[#ECEEF5]">
                  Experience Progress
                </span>
              </div>
              <span className="text-xs text-[#9899A8]">
                {formatNumber(profileData.totalXP)} XP total
              </span>
            </div>
            <ProgressBar
              value={levelProgress.xpIntoLevel}
              max={levelProgress.xpNeeded}
              variant="xp"
              size="lg"
              showLabel
              label={`Level ${levelProgress.currentLevel} to ${levelProgress.currentLevel + 1}`}
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-[#9899A8]">
                {formatNumber(levelProgress.xpIntoLevel)} / {formatNumber(levelProgress.xpNeeded)} XP
              </span>
              {rank && (
                <span className="text-xs font-semibold gradient-text-gold">
                  {rank.name}
                </span>
              )}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* BADGE SHOWCASE */}
        {/* ----------------------------------------------------------------- */}
        {featuredBadges.length > 0 && (
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#FFB800]" />
                <h2 className="text-sm font-[family-name:'Rajdhani'] uppercase tracking-wide font-semibold text-[#ECEEF5]">
                  Achievement Showcase
                </h2>
              </div>
              <button
                onClick={() => router.push('/achievements')}
                className="text-xs text-[#9899A8] hover:text-[#00F0FF] transition-colors"
              >
                View All
              </button>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 justify-items-center">
              {featuredBadges.map((achievement) => (
                <AchievementBadge
                  key={achievement.id}
                  achievement={achievement}
                  unlocked
                  size="md"
                  showDetails
                />
              ))}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* CURRENTLY WATCHING / FAVORITE SERIES */}
        {/* ----------------------------------------------------------------- */}
        {watchingSeries.length > 0 && (
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-[#FF3366]" />
              <h2 className="text-sm font-[family-name:'Rajdhani'] uppercase tracking-wide font-semibold text-[#ECEEF5]">
                Currently Watching
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {watchingSeries.map(({ progress: p, anime }) => {
                if (!anime) return null;
                const pct = Math.round(
                  (p.currentEpisode / anime.totalEpisodes) * 100
                );
                return (
                  <button
                    key={anime.id}
                    onClick={() => router.push(`/library/${anime.slug}`)}
                    className="glass-card-hover p-4 rounded-lg flex items-center gap-4 text-left transition-all duration-200 group border border-white/[0.06] hover:border-white/[0.12]"
                  >
                    <div
                      className="w-12 h-16 rounded-md bg-cover bg-center flex-shrink-0 border border-white/[0.06]"
                      style={{
                        backgroundImage: `url(${anime.posterUrl})`,
                        backgroundColor: '#13131F',
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#ECEEF5] truncate group-hover:text-[#00F0FF] transition-colors">
                        {anime.title}
                      </p>
                      <p className="text-xs text-[#9899A8] mt-0.5">
                        Ep {p.currentEpisode} / {anime.totalEpisodes}
                      </p>
                      <div className="mt-2">
                        <ProgressBar
                          value={p.currentEpisode}
                          max={anime.totalEpisodes}
                          variant={p.watchStatus === 'completed' ? 'gold' : 'fire'}
                          size="sm"
                        />
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[rgba(200,202,216,0.5)]">
                      {pct}%
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* BIO SECTION */}
        {/* ----------------------------------------------------------------- */}
        {profileData.bio && (
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-5 h-5 text-[#00F0FF]" />
              <h2 className="text-sm font-[family-name:'Rajdhani'] uppercase tracking-wide font-semibold text-[#ECEEF5]">
                About
              </h2>
            </div>
            <p className="text-sm text-[rgba(200,202,216,0.7)] leading-relaxed max-w-2xl">
              {profileData.bio}
            </p>
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* MESSAGE COMING SOON MODAL                                             */}
      {/* ===================================================================== */}
      {showMessageModal && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={() => setShowMessageModal(false)}
          />
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="glass-card p-6 sm:p-8 max-w-sm w-full relative text-center border border-white/[0.08]">
              <button
                onClick={() => setShowMessageModal(false)}
                className="absolute top-3 right-3 p-1.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-[#9899A8] hover:text-[#ECEEF5] hover:bg-white/[0.06] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-16 h-16 rounded-full bg-[#00F0FF]/10 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-[#00F0FF]" />
              </div>

              <h3 className="text-lg font-[family-name:'Rajdhani'] uppercase tracking-wide font-bold text-[#ECEEF5] mb-2">
                Messaging Coming Soon
              </h3>
              <p className="text-sm text-[#9899A8] mb-6 leading-relaxed">
                Direct messaging is currently in development. Soon you&apos;ll be able to chat with{' '}
                <span className="text-[#00F0FF] font-medium">{profileData.displayName}</span>{' '}
                and all your crew members!
              </p>

              <button
                onClick={() => setShowMessageModal(false)}
                className="btn-accent w-full py-2.5 text-sm font-medium"
              >
                Got It
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
