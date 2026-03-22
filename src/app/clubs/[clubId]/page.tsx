'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/stores';
import { Users, Crown, Trophy, MessageCircle, ArrowLeft } from 'lucide-react';

// =============================================================================
// Club Data (matches clubs/page.tsx)
// =============================================================================

interface Club {
  id: string;
  name: string;
  description: string;
  memberCount: number;
}

const CLUBS_LIST: Club[] = [
  {
    id: 'one-piece-catch-up-crew',
    name: 'One Piece Catch-Up Crew',
    description: 'Binge-watching the Grand Line together. No spoilers past your current arc!',
    memberCount: 128,
  },
  {
    id: 'naruto-veterans',
    name: 'Naruto Veterans',
    description: 'For those who survived every filler arc and lived to tell the tale.',
    memberCount: 95,
  },
  {
    id: 'shonen-jump-elite',
    name: 'Shonen Jump Elite',
    description: 'The best of Weekly Shonen Jump -- past, present, and future titles.',
    memberCount: 256,
  },
  {
    id: 'bleach-revival',
    name: 'Bleach Revival',
    description: 'TYBW brought us back. Discuss the Thousand-Year Blood War and classic arcs.',
    memberCount: 67,
  },
  {
    id: 'dragon-ball-legends',
    name: 'Dragon Ball Legends',
    description: 'Power levels are meaningless but we love it anyway. All DB series welcome.',
    memberCount: 189,
  },
  {
    id: 'new-gen-anime',
    name: 'New Gen Anime',
    description: 'Jujutsu Kaisen, Chainsaw Man, Dandadan -- tracking the new wave.',
    memberCount: 143,
  },
];

// =============================================================================
// Mock Members
// =============================================================================

interface MockMember {
  id: string;
  name: string;
  level: number;
  xp: number;
  color: string;
}

const MOCK_MEMBERS: MockMember[] = [
  { id: 'm1', name: 'PirateQueen', level: 42, xp: 176400, color: '#FF3366' },
  { id: 'm2', name: 'SasukeFan99', level: 24, xp: 57600, color: '#8B5CF6' },
  { id: 'm3', name: 'TitanSlayer', level: 18, xp: 32400, color: '#39FF14' },
  { id: 'm4', name: 'GonFreecs', level: 15, xp: 22500, color: '#00F0FF' },
  { id: 'm5', name: 'SpikeSpiegel', level: 31, xp: 96100, color: '#FFB800' },
  { id: 'm6', name: 'SailorMoonX', level: 28, xp: 78400, color: '#FF3366' },
];

// =============================================================================
// Club Detail Page
// =============================================================================

export default function ClubDetailPage() {
  const params = useParams();
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const hydrated = useUserStore((s) => s.hydrated);

  const [activeTab, setActiveTab] = useState<'members' | 'leaderboard' | 'chat'>('members');
  const [isJoined, setIsJoined] = useState(false);

  const clubId = params.clubId as string;
  const club = CLUBS_LIST.find((c) => c.id === clubId);

  // ---------------------------------------------------------------------------
  // Mount guard & login check
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (hydrated && !user) {
      router.replace('/');
    }
  }, [hydrated, user, router]);

  if (!hydrated || !user) return null;

  // ---------------------------------------------------------------------------
  // Club not found
  // ---------------------------------------------------------------------------

  if (!club) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-8 text-center rounded-xl max-w-md">
          <Users className="w-12 h-12 text-[#9899A8] mx-auto mb-4" />
          <h2 className="text-xl font-[family-name:'Rajdhani'] uppercase tracking-wide font-bold text-[#ECEEF5] mb-2">
            Club Not Found
          </h2>
          <p className="text-[#9899A8] mb-6">
            This club doesn&apos;t exist or has been removed.
          </p>
          <button onClick={() => router.push('/clubs')} className="btn-accent">
            Browse Clubs
          </button>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Leaderboard (sorted by XP descending)
  // ---------------------------------------------------------------------------

  const leaderboard = [...MOCK_MEMBERS].sort((a, b) => b.xp - a.xp);

  // ---------------------------------------------------------------------------
  // Tab definitions
  // ---------------------------------------------------------------------------

  const tabs: { id: 'members' | 'leaderboard' | 'chat'; label: string }[] = [
    { id: 'members', label: 'Members' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'chat', label: 'Chat' },
  ];

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">

        {/* Back Button */}
        <button
          onClick={() => router.push('/clubs')}
          className="flex items-center gap-2 text-[#9899A8] hover:text-[#ECEEF5] text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Clubs
        </button>

        {/* ================================================================= */}
        {/* Club Banner */}
        {/* ================================================================= */}
        <div className="glass-card rounded-xl overflow-hidden mb-6 border border-white/[0.06]">
          {/* Gradient banner */}
          <div
            className="h-24 sm:h-32"
            style={{
              background: '#161B2E',
            }}
          />

          <div className="p-6 -mt-8">
            <div className="flex items-end justify-between mb-4">
              <h1 className="text-xl sm:text-2xl font-[family-name:'Rajdhani'] uppercase tracking-wide font-bold text-[#ECEEF5]">
                {club.name}
              </h1>
              <button
                onClick={() => setIsJoined(!isJoined)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isJoined
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
                    : 'btn-accent'
                }`}
              >
                {isJoined ? 'Leave Club' : 'Join Club'}
              </button>
            </div>

            <p className="text-sm text-[#9899A8] leading-relaxed mb-4">
              {club.description}
            </p>

            <div className="flex items-center gap-1.5 text-xs text-[rgba(200,202,216,0.5)]">
              <Users className="w-3.5 h-3.5" />
              {club.memberCount} members
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* Tab Navigation */}
        {/* ================================================================= */}
        <div className="flex gap-1 p-1 glass-card rounded-xl mb-6 border border-white/[0.06]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-[#161B2E] text-[#ECEEF5] shadow-lg'
                  : 'text-[#9899A8] hover:text-[rgba(200,202,216,0.7)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================================================================= */}
        {/* Members Tab */}
        {/* ================================================================= */}
        {activeTab === 'members' && (
          <div className="space-y-2">
            {MOCK_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="glass-card-hover p-4 rounded-xl flex items-center gap-4 border border-white/[0.06] transition-all duration-200"
              >
                {/* Avatar circle */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-[#ECEEF5] flex-shrink-0"
                  style={{ background: `${member.color}33`, border: `2px solid ${member.color}66` }}
                >
                  {member.name.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#ECEEF5] truncate">
                    {member.name}
                  </p>
                  <p className="text-xs text-[rgba(200,202,216,0.5)]">
                    Level {member.level}
                  </p>
                </div>

                <span className="badge badge-purple text-xs">
                  Lv. {member.level}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* ================================================================= */}
        {/* Leaderboard Tab */}
        {/* ================================================================= */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-2">
            {leaderboard.map((member, index) => {
              const rank = index + 1;
              const isTop3 = rank <= 3;

              return (
                <div
                  key={member.id}
                  className={`glass-card p-4 rounded-xl flex items-center gap-4 border border-white/[0.06] transition-all duration-200 ${
                    rank === 1 ? 'ring-1 ring-[#FFB800]/20' : ''
                  }`}
                >
                  {/* Rank */}
                  <div className="w-8 text-center flex-shrink-0">
                    {rank === 1 ? (
                      <Crown className="w-5 h-5 text-[#FFB800] mx-auto" />
                    ) : (
                      <span
                        className={`text-sm font-bold ${
                          isTop3 ? 'text-[#FFB800]' : 'text-[rgba(200,202,216,0.5)]'
                        }`}
                      >
                        #{rank}
                      </span>
                    )}
                  </div>

                  {/* Avatar circle */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-[#ECEEF5] flex-shrink-0"
                    style={{ background: `${member.color}33`, border: `2px solid ${member.color}66` }}
                  >
                    {member.name.charAt(0)}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#ECEEF5] truncate">
                      {member.name}
                    </p>
                    <p className="text-xs text-[rgba(200,202,216,0.5)]">
                      Level {member.level}
                    </p>
                  </div>

                  {/* XP */}
                  <div className="text-right flex-shrink-0">
                    <p className={`text-sm font-bold ${isTop3 ? 'text-[#FFB800]' : 'text-[#9899A8]'}`}>
                      {member.xp.toLocaleString()} XP
                    </p>
                  </div>

                  {/* Trophy for top 3 */}
                  {isTop3 && (
                    <Trophy className="w-4 h-4 text-[#FFB800] flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ================================================================= */}
        {/* Chat Tab -- Coming Soon */}
        {/* ================================================================= */}
        {activeTab === 'chat' && (
          <div className="glass-card p-12 rounded-xl text-center border border-white/[0.06]">
            <MessageCircle className="w-12 h-12 text-[rgba(200,202,216,0.5)] mx-auto mb-4" />
            <h3 className="text-lg font-[family-name:'Rajdhani'] uppercase tracking-wide font-bold text-[#ECEEF5] mb-2">
              Coming Soon
            </h3>
            <p className="text-sm text-[#9899A8] max-w-sm mx-auto">
              Club chat is under construction. Check back soon to chat with other members!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
