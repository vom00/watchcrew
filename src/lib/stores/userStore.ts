// =============================================================================
// WatchCrew - User Store (Zustand)
// Manages current user state, authentication, profile, and XP/leveling.
// =============================================================================

import { create } from 'zustand';
import type { User, ProfileVisibility } from '@/types';
import { calculateLevel } from '@/types';
import { getItem, setItem, removeItem, STORAGE_KEYS } from '@/lib/storage';
import { getRandomId } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Store Interface
// -----------------------------------------------------------------------------

interface UserStore {
  user: User | null;
  isLoggedIn: boolean;
  hydrated: boolean;
  sessionReady: boolean;

  // Auth actions
  login(username: string, displayName: string, email?: string): void;
  logout(): void;

  // Session
  setSessionReady(ready: boolean): void;

  // Profile actions
  updateProfile(updates: Partial<User>): void;
  addXP(amount: number): void;
  incrementStreak(): void;
  resetStreak(): void;
  incrementEpisodesWatched(count?: number): void;
  incrementSeriesCompleted(): void;

  // Init
  loadFromStorage(): void;
}

// -----------------------------------------------------------------------------
// Avatar Placeholders
// -----------------------------------------------------------------------------

const AVATAR_PLACEHOLDERS = [
  'https://api.dicebear.com/7.x/adventurer/svg?seed=luffy',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=naruto',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=goku',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=zoro',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=vegeta',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=sakura',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=hinata',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=ichigo',
];

function getRandomAvatar(): string {
  return AVATAR_PLACEHOLDERS[Math.floor(Math.random() * AVATAR_PLACEHOLDERS.length)];
}

// -----------------------------------------------------------------------------
// Persist Helper
// -----------------------------------------------------------------------------

function persistUser(user: User | null): void {
  if (user) {
    setItem(STORAGE_KEYS.CURRENT_USER, user);
  } else {
    removeItem(STORAGE_KEYS.CURRENT_USER);
  }
}

// -----------------------------------------------------------------------------
// Store
// -----------------------------------------------------------------------------

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  isLoggedIn: false,
  hydrated: false,
  sessionReady: false,

  // ---------------------------------------------------------------------------
  // Auth
  // ---------------------------------------------------------------------------

  login(username: string, displayName: string, email?: string) {
    const now = new Date().toISOString();
    const newUser: User = {
      id: getRandomId(),
      username,
      displayName,
      email: email || '',
      avatarUrl: getRandomAvatar(),
      bannerUrl: '',
      bio: '',
      accentColor: '#4361EE',
      profileTheme: 'default',
      customStatus: '',
      totalXP: 0,
      level: 1,
      currentStreak: 0,
      longestStreak: 0,
      totalEpisodesWatched: 0,
      totalHoursWatched: 0,
      seriesCompletedCount: 0,
      profileVisibility: 'public' as ProfileVisibility,
      lastUsernameChange: null,
      createdAt: now,
    };

    persistUser(newUser);
    set({ user: newUser, isLoggedIn: true });
  },

  logout() {
    persistUser(null);
    set({ user: null, isLoggedIn: false });
  },

  setSessionReady(ready: boolean) {
    set({ sessionReady: ready });
  },

  // ---------------------------------------------------------------------------
  // Profile
  // ---------------------------------------------------------------------------

  updateProfile(updates: Partial<User>) {
    const { user } = get();
    if (!user) return;

    const updatedUser: User = { ...user, ...updates };
    persistUser(updatedUser);
    set({ user: updatedUser });
  },

  addXP(amount: number) {
    const { user } = get();
    if (!user) return;

    const newXP = user.totalXP + amount;
    const newLevel = calculateLevel(newXP);
    const updatedUser: User = { ...user, totalXP: newXP, level: newLevel };

    persistUser(updatedUser);
    set({ user: updatedUser });
  },

  incrementStreak() {
    const { user } = get();
    if (!user) return;

    const newStreak = user.currentStreak + 1;
    const newLongest = Math.max(newStreak, user.longestStreak);
    const updatedUser: User = {
      ...user,
      currentStreak: newStreak,
      longestStreak: newLongest,
    };

    persistUser(updatedUser);
    set({ user: updatedUser });
  },

  resetStreak() {
    const { user } = get();
    if (!user) return;

    const updatedUser: User = { ...user, currentStreak: 0 };
    persistUser(updatedUser);
    set({ user: updatedUser });
  },

  incrementEpisodesWatched(count = 1) {
    const { user } = get();
    if (!user) return;

    const newTotal = user.totalEpisodesWatched + count;
    const newHours = Math.round((newTotal * 24) / 60 * 10) / 10;
    const updatedUser: User = {
      ...user,
      totalEpisodesWatched: newTotal,
      totalHoursWatched: newHours,
    };

    persistUser(updatedUser);
    set({ user: updatedUser });
  },

  incrementSeriesCompleted() {
    const { user } = get();
    if (!user) return;

    const updatedUser: User = {
      ...user,
      seriesCompletedCount: user.seriesCompletedCount + 1,
    };

    persistUser(updatedUser);
    set({ user: updatedUser });
  },

  // ---------------------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------------------

  loadFromStorage() {
    if (typeof window === 'undefined') return;

    const stored = getItem<User>(STORAGE_KEYS.CURRENT_USER);
    if (stored) {
      set({ user: stored, isLoggedIn: true, hydrated: true });
    } else {
      set({ hydrated: true });
    }
  },
}));
