// =============================================================================
// WatchCrew - LocalStorage Wrapper
// MVP "backend" for persisting app state in the browser.
// =============================================================================

// ---------------------------------------------------------------------------
// Storage Key Constants
// ---------------------------------------------------------------------------

export const STORAGE_KEYS = {
  CURRENT_USER: 'watchcrew_current_user',
  USER_PROGRESS: 'watchcrew_user_progress',
  EPISODE_LOGS: 'watchcrew_episode_logs',
  ACHIEVEMENTS: 'watchcrew_achievements',
  FRIENDS: 'watchcrew_friends',
  ACTIVITY_FEED: 'watchcrew_activity_feed',
  CLUBS: 'watchcrew_clubs',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

// ---------------------------------------------------------------------------
// Generic LocalStorage Helpers
// ---------------------------------------------------------------------------

/**
 * Retrieve a value from localStorage, parsed as JSON.
 * Returns null if the key does not exist or parsing fails.
 */
export function getItem<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch {
    console.warn(`[storage] Failed to parse key "${key}"`);
    return null;
  }
}

/**
 * Persist a value to localStorage as JSON.
 */
export function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`[storage] Failed to write key "${key}"`, error);
  }
}

/**
 * Remove a key from localStorage.
 */
export function removeItem(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
}
