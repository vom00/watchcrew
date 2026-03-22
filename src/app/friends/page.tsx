'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore, useSocialStore } from '@/lib/stores';
import { getOtakuRank } from '@/types';
import {
  Users,
  UserPlus,
  UserCheck,
  UserX,
  Search,
  MessageCircle,
  Bell,
} from 'lucide-react';

// =============================================================================
// Demo profile data for rendering friend cards
// =============================================================================

const DEMO_USER_PROFILES: Record<
  string,
  {
    username: string;
    displayName: string;
    level: number;
    accentColor: string;
  }
> = {
  'demo-user-1': {
    username: 'SasukeFan99',
    displayName: 'Sasuke Fan',
    level: 24,
    accentColor: '#8B5CF6',
  },
  'demo-user-2': {
    username: 'PirateQueen',
    displayName: 'Pirate Queen',
    level: 42,
    accentColor: '#FF3366',
  },
  'demo-user-3': {
    username: 'TitanSlayer',
    displayName: 'Titan Slayer',
    level: 18,
    accentColor: '#39FF14',
  },
  'demo-user-4': {
    username: 'GonFreecs',
    displayName: 'Gon Freecs',
    level: 15,
    accentColor: '#00F0FF',
  },
  'demo-user-5': {
    username: 'SpikeSpiegel',
    displayName: 'Spike Spiegel',
    level: 31,
    accentColor: '#FFB800',
  },
  'demo-user-6': {
    username: 'SailorMoonX',
    displayName: 'Sailor Moon',
    level: 28,
    accentColor: '#E91E8A',
  },
};

// Suggested users for the "Find Friends" tab
const SUGGESTED_USERS = [
  { id: 'suggest-1', username: 'SakuraFan', displayName: 'Sakura Fan', level: 19, accentColor: '#FF3366' },
  { id: 'suggest-2', username: 'GokuRising', displayName: 'Goku Rising', level: 35, accentColor: '#FFB800' },
  { id: 'suggest-3', username: 'ZoroSensei', displayName: 'Zoro Sensei', level: 44, accentColor: '#39FF14' },
  { id: 'suggest-4', username: 'NarutoRunner', displayName: 'Naruto Runner', level: 27, accentColor: '#00F0FF' },
  { id: 'suggest-5', username: 'MikasaQueen', displayName: 'Mikasa Queen', level: 33, accentColor: '#8B5CF6' },
  { id: 'suggest-6', username: 'LeviFanatic', displayName: 'Levi Fanatic', level: 51, accentColor: '#FF3366' },
];

// =============================================================================
// Avatar helper - colored circle with initial
// =============================================================================

function AvatarCircle({
  name,
  color,
  size = 40,
}: {
  name: string;
  color: string;
  size?: number;
}) {
  const initial = name.charAt(0).toUpperCase();
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold text-white shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        fontSize: size * 0.4,
      }}
    >
      {initial}
    </div>
  );
}

// =============================================================================
// Friends Page
// =============================================================================

export default function FriendsPage() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const hydrated = useUserStore((s) => s.hydrated);
  const loadUser = useUserStore((s) => s.loadFromStorage);
  const friends = useSocialStore((s) => s.friends);
  const seedDemoData = useSocialStore((s) => s.seedDemoData);
  const sendFriendRequest = useSocialStore((s) => s.sendFriendRequest);
  const acceptFriendRequest = useSocialStore((s) => s.acceptFriendRequest);
  const removeFriend = useSocialStore((s) => s.removeFriend);

  const [activeTab, setActiveTab] = useState<'friends' | 'pending' | 'find'>('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [findSearchQuery, setFindSearchQuery] = useState('');
  const [sentRequests, setSentRequests] = useState<Set<string>>(new Set());

  // Hydrate user store
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Redirect if not logged in
  useEffect(() => {
    if (hydrated && !isLoggedIn) {
      router.push('/');
    }
  }, [hydrated, isLoggedIn, router]);

  // Seed demo data on mount if friends list is empty
  useEffect(() => {
    if (friends.length === 0) {
      seedDemoData();
    }
  }, []);

  // ---------------------------------------------------------------------------
  // Derived data
  // ---------------------------------------------------------------------------

  const acceptedFriends = friends.filter((f) => f.status === 'accepted');
  const pendingRequests = friends.filter((f) => f.status === 'pending');

  const filteredFriends = searchQuery.trim()
    ? acceptedFriends.filter((f) => {
        const profile = DEMO_USER_PROFILES[f.friendId];
        if (!profile) return false;
        const q = searchQuery.toLowerCase();
        return (
          profile.displayName.toLowerCase().includes(q) ||
          profile.username.toLowerCase().includes(q)
        );
      })
    : acceptedFriends;

  const filteredSuggested = findSearchQuery.trim()
    ? SUGGESTED_USERS.filter((u) => {
        const q = findSearchQuery.toLowerCase();
        return (
          u.displayName.toLowerCase().includes(q) ||
          u.username.toLowerCase().includes(q)
        );
      })
    : SUGGESTED_USERS;

  // ---------------------------------------------------------------------------
  // Guard
  // ---------------------------------------------------------------------------

  if (!hydrated || !isLoggedIn || !user) return null;

  // ---------------------------------------------------------------------------
  // Tab definitions
  // ---------------------------------------------------------------------------

  const tabs = [
    { id: 'friends' as const, label: 'All Friends', icon: Users },
    { id: 'pending' as const, label: 'Pending Requests', icon: Bell },
    { id: 'find' as const, label: 'Find Friends', icon: Search },
  ];

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">

        {/* Page Header */}
        <div className="flex items-center gap-3 mb-8">
          <Users className="w-7 h-7 text-[#00F0FF]" />
          <h1 className="text-2xl sm:text-3xl font-[family-name:'Rajdhani'] uppercase tracking-wide font-bold text-[#ECEEF5]">
            Friends
          </h1>
          <span className="badge badge-blue text-xs px-2 py-0.5 rounded-full bg-[#00F0FF]/15 text-[#00F0FF] font-medium">
            {acceptedFriends.length}
          </span>
        </div>

        {/* Tab Bar */}
        <div className="flex gap-1 p-1 glass-card rounded-xl mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearchQuery('');
                  setFindSearchQuery('');
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white/[0.08] text-[#ECEEF5] shadow-lg border-b-2 border-[#00F0FF]'
                    : 'text-[#9899A8] hover:text-[rgba(200,202,216,0.7)] hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.id === 'pending' && pendingRequests.length > 0 && (
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-[#FF3366]/20 text-[#FF3366]">
                    {pendingRequests.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ================================================================= */}
        {/* ALL FRIENDS TAB                                                    */}
        {/* ================================================================= */}
        {activeTab === 'friends' && (
          <div>
            {/* Search input */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(200,202,216,0.4)]" />
              <input
                type="text"
                placeholder="Search friends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search friends"
                className="glass-input w-full pl-10 pr-4 py-2.5 rounded-lg text-sm text-[#ECEEF5] placeholder:text-[rgba(200,202,216,0.4)] bg-white/[0.04] border border-white/[0.06] outline-none focus:border-[#00F0FF]/50 transition-colors"
              />
            </div>

            {filteredFriends.length === 0 ? (
              <div className="glass-card p-10 text-center rounded-xl">
                <Users className="w-12 h-12 text-[rgba(200,202,216,0.4)] mx-auto mb-3" />
                <p className="text-[#9899A8] text-sm">
                  {searchQuery
                    ? 'No friends match your search.'
                    : 'No friends yet. Head to "Find Friends" to add some!'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredFriends.map((friendship) => {
                  const profile = DEMO_USER_PROFILES[friendship.friendId];
                  if (!profile) return null;
                  const rank = getOtakuRank(profile.level);

                  return (
                    <div
                      key={friendship.friendId}
                      className="glass-card-hover p-4 rounded-xl flex items-center gap-4 group transition-all duration-200 cursor-pointer border border-transparent hover:border-[rgba(0,240,255,0.15)] hover:bg-[rgba(255,255,255,0.03)]"
                      onClick={() => router.push(`/profile/${profile.username}`)}
                    >
                      <AvatarCircle
                        name={profile.displayName}
                        color={profile.accentColor}
                        size={44}
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-[#ECEEF5] truncate group-hover:text-[#00F0FF] transition-colors">
                            {profile.displayName}
                          </p>
                          <span className="badge badge-gold text-xs px-1.5 py-0.5 rounded-full bg-[#FFB800]/15 text-[#FFB800] font-medium">
                            {rank.name} &middot; Lv.{profile.level}
                          </span>
                        </div>
                        <p className="text-xs text-[#9899A8] mt-0.5">
                          @{profile.username}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/profile/${profile.username}?message=true`);
                          }}
                          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-white/[0.08] text-[#9899A8] hover:text-[#00F0FF] transition-colors"
                          title="Message"
                          aria-label="Message"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFriend(friendship.friendId);
                          }}
                          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-white/[0.08] text-[#9899A8] hover:text-[#FF3366] transition-colors"
                          title="Remove friend"
                          aria-label="Remove friend"
                        >
                          <UserX className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* PENDING REQUESTS TAB                                               */}
        {/* ================================================================= */}
        {activeTab === 'pending' && (
          <div>
            {pendingRequests.length === 0 ? (
              <div className="glass-card p-10 text-center rounded-xl">
                <Bell className="w-12 h-12 text-[rgba(200,202,216,0.4)] mx-auto mb-3" />
                <p className="text-[#9899A8] text-sm">
                  No pending friend requests right now.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingRequests.map((friendship) => {
                  const profile = DEMO_USER_PROFILES[friendship.friendId];
                  if (!profile) return null;

                  return (
                    <div
                      key={friendship.friendId}
                      className="glass-card p-4 rounded-xl flex items-center gap-4 transition-all duration-200 border border-transparent hover:border-[rgba(0,240,255,0.15)] hover:bg-[rgba(255,255,255,0.03)]"
                    >
                      <AvatarCircle
                        name={profile.displayName}
                        color={profile.accentColor}
                        size={44}
                      />

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#ECEEF5] truncate">
                          {profile.displayName}
                        </p>
                        <p className="text-xs text-[#9899A8] mt-0.5">
                          @{profile.username}
                        </p>
                        <p className="text-xs text-[rgba(200,202,216,0.6)] mt-1">
                          Wants to join your crew
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => acceptFriendRequest(friendship.friendId)}
                          className="flex items-center gap-1.5 px-3 min-h-[44px] py-2.5 rounded-lg bg-[#39FF14]/15 text-[#39FF14] text-xs font-medium hover:bg-[#39FF14]/25 transition-colors"
                          aria-label="Accept friend request"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          Accept
                        </button>
                        <button
                          onClick={() => removeFriend(friendship.friendId)}
                          className="flex items-center gap-1.5 px-3 min-h-[44px] py-2.5 rounded-lg bg-white/[0.04] text-[#9899A8] text-xs font-medium hover:bg-white/[0.08] hover:text-[#FF3366] transition-colors"
                          aria-label="Decline friend request"
                        >
                          <UserX className="w-3.5 h-3.5" />
                          Decline
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* FIND FRIENDS TAB                                                   */}
        {/* ================================================================= */}
        {activeTab === 'find' && (
          <div>
            {/* Search input */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(200,202,216,0.4)]" />
              <input
                type="text"
                placeholder="Search for users..."
                value={findSearchQuery}
                onChange={(e) => setFindSearchQuery(e.target.value)}
                aria-label="Search for users"
                className="glass-input w-full pl-10 pr-4 py-2.5 rounded-lg text-sm text-[#ECEEF5] placeholder:text-[rgba(200,202,216,0.4)] bg-white/[0.04] border border-white/[0.06] outline-none focus:border-[#00F0FF]/50 transition-colors"
              />
            </div>

            {filteredSuggested.length === 0 ? (
              <div className="glass-card p-10 text-center rounded-xl">
                <Search className="w-12 h-12 text-[rgba(200,202,216,0.4)] mx-auto mb-3" />
                <p className="text-[#9899A8] text-sm">
                  No users found matching your search.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSuggested.map((suggestedUser) => {
                  const rank = getOtakuRank(suggestedUser.level);
                  const hasSent = sentRequests.has(suggestedUser.id);

                  return (
                    <div
                      key={suggestedUser.id}
                      className="glass-card-hover p-4 rounded-xl flex items-center gap-4 transition-all duration-200 cursor-pointer border border-transparent hover:border-[rgba(0,240,255,0.15)] hover:bg-[rgba(255,255,255,0.03)]"
                      onClick={() => router.push(`/profile/${suggestedUser.username}`)}
                    >
                      <AvatarCircle
                        name={suggestedUser.displayName}
                        color={suggestedUser.accentColor}
                        size={44}
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-[#ECEEF5] truncate">
                            {suggestedUser.displayName}
                          </p>
                          <span className="badge badge-blue text-xs px-1.5 py-0.5 rounded-full bg-[#00F0FF]/15 text-[#00F0FF] font-medium">
                            {rank.name} &middot; Lv.{suggestedUser.level}
                          </span>
                        </div>
                        <p className="text-xs text-[#9899A8] mt-0.5">
                          @{suggestedUser.username}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sendFriendRequest(suggestedUser.id);
                          setSentRequests((prev) => new Set(prev).add(suggestedUser.id));
                        }}
                        disabled={hasSent}
                        className={`flex items-center gap-1.5 px-3 min-h-[44px] py-2.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                          hasSent
                            ? 'bg-white/[0.06] text-[rgba(200,202,216,0.6)] cursor-default'
                            : 'btn-accent bg-[#FF3366]/15 text-[#FF3366] hover:bg-[#FF3366]/25'
                        }`}
                      >
                        {hasSent ? (
                          <>
                            <UserCheck className="w-3.5 h-3.5" />
                            Sent
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-3.5 h-3.5" />
                            Add Friend
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
