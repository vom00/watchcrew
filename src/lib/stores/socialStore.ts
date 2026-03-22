// =============================================================================
// WatchCrew - Social Store (Zustand)
// Manages friends, activity feed, reactions, and comments.
// =============================================================================

import { create } from 'zustand';
import type {
  Friendship,
  ActivityFeedItem,
  Reaction,
  Comment,
  ActivityType,
} from '@/types';
import { getItem, setItem, STORAGE_KEYS } from '@/lib/storage';
import { getRandomId } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Store Interface
// -----------------------------------------------------------------------------

interface SocialStore {
  friends: Friendship[];
  activityFeed: ActivityFeedItem[];
  reactions: Record<string, Reaction[]>; // keyed by feedItemId
  comments: Record<string, Comment[]>; // keyed by feedItemId

  // Friend actions
  sendFriendRequest(friendId: string): void;
  acceptFriendRequest(friendId: string): void;
  removeFriend(friendId: string): void;
  getFriends(): Friendship[];
  getPendingRequests(): Friendship[];

  // Feed actions
  addActivity(item: Omit<ActivityFeedItem, 'id' | 'createdAt'>): void;
  addReaction(feedItemId: string, userId: string, emoji: string): void;
  removeReaction(feedItemId: string, userId: string): void;
  addComment(
    feedItemId: string,
    userId: string,
    username: string,
    text: string
  ): void;

  // Init
  loadFromStorage(): void;
  seedDemoData(): void;
}

// -----------------------------------------------------------------------------
// Storage Keys for social-specific data
// -----------------------------------------------------------------------------

const REACTIONS_KEY = 'watchcrew_reactions';
const COMMENTS_KEY = 'watchcrew_comments';

// -----------------------------------------------------------------------------
// Persist Helpers
// -----------------------------------------------------------------------------

function persistFriends(friends: Friendship[]): void {
  setItem(STORAGE_KEYS.FRIENDS, friends);
}

function persistFeed(feed: ActivityFeedItem[]): void {
  setItem(STORAGE_KEYS.ACTIVITY_FEED, feed);
}

function persistReactions(reactions: Record<string, Reaction[]>): void {
  setItem(REACTIONS_KEY, reactions);
}

function persistComments(comments: Record<string, Comment[]>): void {
  setItem(COMMENTS_KEY, comments);
}

// -----------------------------------------------------------------------------
// Demo Data
// -----------------------------------------------------------------------------

interface DemoFriend {
  id: string;
  username: string;
  avatar: string;
}

const DEMO_FRIENDS: DemoFriend[] = [
  {
    id: 'demo-user-1',
    username: 'SasukeFan99',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=sasuke',
  },
  {
    id: 'demo-user-2',
    username: 'PirateQueen',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=nami',
  },
  {
    id: 'demo-user-3',
    username: 'TitanSlayer',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=eren',
  },
  {
    id: 'demo-user-4',
    username: 'GonFreecs',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=gon',
  },
  {
    id: 'demo-user-5',
    username: 'SpikeSpiegel',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=spike',
  },
  {
    id: 'demo-user-6',
    username: 'SailorMoonX',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=usagi',
  },
];

function generateDemoFeed(): ActivityFeedItem[] {
  const now = Date.now();
  const hour = 3_600_000;

  const items: ActivityFeedItem[] = [
    {
      id: getRandomId(),
      userId: 'demo-user-1',
      username: 'SasukeFan99',
      userAvatar: DEMO_FRIENDS[0].avatar,
      type: 'episode_logged',
      payload: { seriesTitle: 'Naruto Shippuden', episode: 345 },
      createdAt: new Date(now - hour * 1).toISOString(),
    },
    {
      id: getRandomId(),
      userId: 'demo-user-2',
      username: 'PirateQueen',
      userAvatar: DEMO_FRIENDS[1].avatar,
      type: 'milestone_reached',
      payload: {
        seriesTitle: 'One Piece',
        milestone: 'Reached Episode 500!',
      },
      createdAt: new Date(now - hour * 3).toISOString(),
    },
    {
      id: getRandomId(),
      userId: 'demo-user-3',
      username: 'TitanSlayer',
      userAvatar: DEMO_FRIENDS[2].avatar,
      type: 'series_completed',
      payload: { seriesTitle: 'Attack on Titan' },
      createdAt: new Date(now - hour * 5).toISOString(),
    },
    {
      id: getRandomId(),
      userId: 'demo-user-4',
      username: 'GonFreecs',
      userAvatar: DEMO_FRIENDS[3].avatar,
      type: 'badge_earned',
      payload: {
        badgeName: 'Hunter Initiate',
        badgeEmoji: '\uD83C\uDFC5',
      },
      createdAt: new Date(now - hour * 8).toISOString(),
    },
    {
      id: getRandomId(),
      userId: 'demo-user-5',
      username: 'SpikeSpiegel',
      userAvatar: DEMO_FRIENDS[4].avatar,
      type: 'series_started',
      payload: { seriesTitle: 'Cowboy Bebop' },
      createdAt: new Date(now - hour * 12).toISOString(),
    },
    {
      id: getRandomId(),
      userId: 'demo-user-6',
      username: 'SailorMoonX',
      userAvatar: DEMO_FRIENDS[5].avatar,
      type: 'episode_logged',
      payload: { seriesTitle: 'Sailor Moon', episode: 89 },
      createdAt: new Date(now - hour * 14).toISOString(),
    },
    {
      id: getRandomId(),
      userId: 'demo-user-2',
      username: 'PirateQueen',
      userAvatar: DEMO_FRIENDS[1].avatar,
      type: 'badge_earned',
      payload: {
        badgeName: 'Grand Line Navigator',
        badgeEmoji: '\uD83E\uDDED',
      },
      createdAt: new Date(now - hour * 18).toISOString(),
    },
    {
      id: getRandomId(),
      userId: 'demo-user-1',
      username: 'SasukeFan99',
      userAvatar: DEMO_FRIENDS[0].avatar,
      type: 'milestone_reached',
      payload: {
        seriesTitle: 'Naruto Shippuden',
        milestone: '1,000 total episodes watched!',
      },
      createdAt: new Date(now - hour * 24).toISOString(),
    },
    {
      id: getRandomId(),
      userId: 'demo-user-4',
      username: 'GonFreecs',
      userAvatar: DEMO_FRIENDS[3].avatar,
      type: 'series_completed',
      payload: { seriesTitle: 'Hunter x Hunter' },
      createdAt: new Date(now - hour * 30).toISOString(),
    },
    {
      id: getRandomId(),
      userId: 'demo-user-3',
      username: 'TitanSlayer',
      userAvatar: DEMO_FRIENDS[2].avatar,
      type: 'series_started',
      payload: { seriesTitle: 'Jujutsu Kaisen' },
      createdAt: new Date(now - hour * 36).toISOString(),
    },
  ];

  return items;
}

function generateDemoFriendships(): Friendship[] {
  const now = new Date().toISOString();
  return DEMO_FRIENDS.map((f) => ({
    userId: 'current-user',
    friendId: f.id,
    status: 'accepted' as const,
    createdAt: now,
  }));
}

// -----------------------------------------------------------------------------
// Store
// -----------------------------------------------------------------------------

export const useSocialStore = create<SocialStore>((set, get) => ({
  friends: [],
  activityFeed: [],
  reactions: {},
  comments: {},

  // ---------------------------------------------------------------------------
  // Friend Actions
  // ---------------------------------------------------------------------------

  sendFriendRequest(friendId: string) {
    const { friends } = get();
    const now = new Date().toISOString();

    // Don't duplicate
    const exists = friends.some(
      (f) =>
        (f.friendId === friendId || f.userId === friendId)
    );
    if (exists) return;

    // In demo mode, adding a friend accepts immediately since there's
    // no real user on the other end to approve. Pending requests are
    // reserved for incoming requests (seeded demo data).
    const newFriendship: Friendship = {
      userId: 'current-user',
      friendId,
      status: 'accepted',
      createdAt: now,
    };

    const updated = [...friends, newFriendship];
    persistFriends(updated);
    set({ friends: updated });
  },

  acceptFriendRequest(friendId: string) {
    const { friends } = get();
    const updated = friends.map((f) =>
      f.friendId === friendId || f.userId === friendId
        ? { ...f, status: 'accepted' as const }
        : f
    );

    persistFriends(updated);
    set({ friends: updated });
  },

  removeFriend(friendId: string) {
    const { friends } = get();
    const updated = friends.filter(
      (f) => f.friendId !== friendId && f.userId !== friendId
    );

    persistFriends(updated);
    set({ friends: updated });
  },

  getFriends(): Friendship[] {
    return get().friends.filter((f) => f.status === 'accepted');
  },

  getPendingRequests(): Friendship[] {
    return get().friends.filter((f) => f.status === 'pending');
  },

  // ---------------------------------------------------------------------------
  // Feed Actions
  // ---------------------------------------------------------------------------

  addActivity(item: Omit<ActivityFeedItem, 'id' | 'createdAt'>) {
    const { activityFeed } = get();
    const newItem: ActivityFeedItem = {
      ...item,
      id: getRandomId(),
      createdAt: new Date().toISOString(),
    };

    const updated = [newItem, ...activityFeed];
    persistFeed(updated);
    set({ activityFeed: updated });
  },

  addReaction(feedItemId: string, userId: string, emoji: string) {
    const { reactions } = get();
    const existing = reactions[feedItemId] ?? [];

    // Remove previous reaction from same user before adding new one
    const filtered = existing.filter((r) => r.userId !== userId);
    const newReaction: Reaction = { feedItemId, userId, emoji };
    const updatedList = [...filtered, newReaction];
    const updatedReactions = { ...reactions, [feedItemId]: updatedList };

    persistReactions(updatedReactions);
    set({ reactions: updatedReactions });
  },

  removeReaction(feedItemId: string, userId: string) {
    const { reactions } = get();
    const existing = reactions[feedItemId] ?? [];
    const updatedList = existing.filter((r) => r.userId !== userId);
    const updatedReactions = { ...reactions, [feedItemId]: updatedList };

    persistReactions(updatedReactions);
    set({ reactions: updatedReactions });
  },

  addComment(
    feedItemId: string,
    userId: string,
    username: string,
    text: string
  ) {
    const { comments } = get();
    const existing = comments[feedItemId] ?? [];
    const newComment: Comment = {
      feedItemId,
      userId,
      username,
      text,
      createdAt: new Date().toISOString(),
    };

    const updatedList = [...existing, newComment];
    const updatedComments = { ...comments, [feedItemId]: updatedList };

    persistComments(updatedComments);
    set({ comments: updatedComments });
  },

  // ---------------------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------------------

  loadFromStorage() {
    if (typeof window === 'undefined') return;

    const storedFriends = getItem<Friendship[]>(STORAGE_KEYS.FRIENDS);
    const storedFeed = getItem<ActivityFeedItem[]>(STORAGE_KEYS.ACTIVITY_FEED);
    const storedReactions = getItem<Record<string, Reaction[]>>(REACTIONS_KEY);
    const storedComments = getItem<Record<string, Comment[]>>(COMMENTS_KEY);

    set({
      friends: storedFriends ?? [],
      activityFeed: storedFeed ?? [],
      reactions: storedReactions ?? {},
      comments: storedComments ?? {},
    });
  },

  seedDemoData() {
    const friendships = generateDemoFriendships();
    const feed = generateDemoFeed();

    persistFriends(friendships);
    persistFeed(feed);
    set({
      friends: friendships,
      activityFeed: feed,
      reactions: {},
      comments: {},
    });
  },
}));
