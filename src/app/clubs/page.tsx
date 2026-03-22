'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/stores';
import { Users, Plus, Search, Crown, TrendingUp } from 'lucide-react';

// =============================================================================
// Sample Clubs Data
// =============================================================================

interface Club {
  id: string;
  name: string;
  description: string;
  memberCount: number;
}

const SAMPLE_CLUBS: Club[] = [
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
// Clubs Page
// =============================================================================

export default function ClubsPage() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const hydrated = useUserStore((s) => s.hydrated);

  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newClubName, setNewClubName] = useState('');
  const [newClubDesc, setNewClubDesc] = useState('');
  const [joinedClubs, setJoinedClubs] = useState<Set<string>>(new Set());

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
  // Filtering
  // ---------------------------------------------------------------------------

  const q = searchQuery.toLowerCase().trim();
  const filteredClubs = q
    ? SAMPLE_CLUBS.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      )
    : SAMPLE_CLUBS;

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleCreateClub = () => {
    if (!newClubName.trim()) return;
    setNewClubName('');
    setNewClubDesc('');
    setShowCreateForm(false);
  };

  const handleJoin = (clubId: string) => {
    setJoinedClubs((prev) => {
      const next = new Set(prev);
      if (next.has(clubId)) {
        next.delete(clubId);
      } else {
        next.add(clubId);
      }
      return next;
    });
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-[family-name:'Rajdhani'] uppercase tracking-wide font-bold text-[#ECEEF5] flex items-center gap-3">
              <Users className="w-7 h-7 text-[#8B5CF6]" />
              Clubs
            </h1>
            <p className="text-[#9899A8] text-sm mt-1">
              Discover and join anime communities
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="btn-accent flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Create Club
          </button>
        </div>

        {/* ================================================================= */}
        {/* Create Club Form */}
        {/* ================================================================= */}
        {showCreateForm && (
          <div className="glass-card p-6 mb-6 rounded-xl border border-white/[0.06]">
            <h2 className="text-sm font-[family-name:'Rajdhani'] uppercase tracking-wide font-semibold text-[#ECEEF5] uppercase tracking-wider mb-4">
              Create a New Club
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                value={newClubName}
                onChange={(e) => setNewClubName(e.target.value)}
                placeholder="Club name..."
                className="glass-input w-full"
                maxLength={50}
              />
              <textarea
                value={newClubDesc}
                onChange={(e) => setNewClubDesc(e.target.value)}
                placeholder="Describe your club..."
                rows={3}
                className="glass-input w-full resize-none"
                maxLength={200}
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 rounded-lg text-sm text-[#9899A8] hover:text-[#ECEEF5] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateClub}
                  disabled={!newClubName.trim()}
                  className="btn-accent flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(200,202,216,0.4)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clubs..."
            className="glass-input w-full pl-10"
          />
        </div>

        {/* ================================================================= */}
        {/* Club Grid */}
        {/* ================================================================= */}
        {filteredClubs.length === 0 ? (
          <div className="glass-card p-8 text-center rounded-xl">
            <Users className="w-10 h-10 text-[#9899A8] mx-auto mb-3" />
            <p className="text-[#9899A8]">No clubs match your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClubs.map((club) => {
              const isJoined = joinedClubs.has(club.id);

              return (
                <div
                  key={club.id}
                  className="glass-card-hover p-5 rounded-xl border border-white/[0.06] transition-all duration-300"
                >
                  {/* Club Name */}
                  <div className="flex items-start justify-between mb-2">
                    <h3
                      className="text-base font-[family-name:'Rajdhani'] uppercase tracking-wide font-bold text-[#ECEEF5] cursor-pointer hover:text-[#00F0FF] transition-colors"
                      onClick={() => router.push(`/clubs/${club.id}`)}
                    >
                      {club.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#9899A8] leading-relaxed line-clamp-2 mb-4">
                    {club.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                    <span className="badge badge-blue text-xs flex items-center gap-1.5">
                      <Users className="w-3 h-3" />
                      {club.memberCount} members
                    </span>
                    <button
                      onClick={() => handleJoin(club.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                        isJoined
                          ? 'bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/20'
                          : 'btn-accent'
                      }`}
                    >
                      {isJoined ? 'Joined' : 'Join'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
