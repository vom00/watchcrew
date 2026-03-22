// =============================================================================
// WatchCrew - Progress Store (Zustand)
// Manages anime watch progress and episode logging.
// =============================================================================

import { create } from 'zustand';
import type { UserProgress, EpisodeLog, WatchStatus } from '@/types';
import { getItem, setItem, STORAGE_KEYS } from '@/lib/storage';
import { getRandomId } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Store Interface
// -----------------------------------------------------------------------------

interface ProgressStore {
  progress: Record<string, UserProgress>; // keyed by seriesId
  episodeLogs: EpisodeLog[];

  // Actions
  setProgress(seriesId: string, episode: number): void;
  incrementEpisode(seriesId: string): void;
  bulkAddEpisodes(seriesId: string, count: number): void;
  setWatchStatus(seriesId: string, status: WatchStatus): void;
  startSeries(seriesId: string): void;
  toggleFillerSkip(seriesId: string): void;

  // Queries
  getProgress(seriesId: string): UserProgress | null;
  getWatchingCount(): number;
  getCompletedCount(): number;
  getAllProgress(): UserProgress[];
  getTotalEpisodesWatched(): number;

  // Init
  loadFromStorage(): void;
}

// -----------------------------------------------------------------------------
// Persist Helpers
// -----------------------------------------------------------------------------

function persistProgress(progress: Record<string, UserProgress>): void {
  setItem(STORAGE_KEYS.USER_PROGRESS, progress);
}

function persistLogs(logs: EpisodeLog[]): void {
  setItem(STORAGE_KEYS.EPISODE_LOGS, logs);
}

// -----------------------------------------------------------------------------
// Store
// -----------------------------------------------------------------------------

export const useProgressStore = create<ProgressStore>((set, get) => ({
  progress: {},
  episodeLogs: [],

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------

  setProgress(seriesId: string, episode: number) {
    const { progress, episodeLogs } = get();
    const existing = progress[seriesId];
    const now = new Date().toISOString();

    if (!existing) return;

    const previousEpisode = existing.currentEpisode;
    const updatedProgress: UserProgress = {
      ...existing,
      currentEpisode: episode,
      lastWatchedAt: now,
    };

    // Auto-detect completion (simple heuristic: episode is set to a high number
    // and status hasn't been manually overridden to something else)
    // We don't have total episode count here, so completion is handled by
    // external callers or when they explicitly set the status.

    const newProgress = { ...progress, [seriesId]: updatedProgress };

    // Log episode changes
    const newLogs = [...episodeLogs];
    if (episode > previousEpisode) {
      for (let ep = previousEpisode + 1; ep <= episode; ep++) {
        newLogs.push({
          userId: existing.userId,
          seriesId,
          episodeNumber: ep,
          loggedAt: now,
        });
      }
    } else if (episode !== previousEpisode) {
      // Single log for backward adjustment
      newLogs.push({
        userId: existing.userId,
        seriesId,
        episodeNumber: episode,
        loggedAt: now,
      });
    }

    persistProgress(newProgress);
    persistLogs(newLogs);
    set({ progress: newProgress, episodeLogs: newLogs });
  },

  incrementEpisode(seriesId: string) {
    const { progress } = get();
    const existing = progress[seriesId];
    if (!existing) return;

    get().setProgress(seriesId, existing.currentEpisode + 1);
  },

  bulkAddEpisodes(seriesId: string, count: number) {
    const { progress } = get();
    const existing = progress[seriesId];
    if (!existing) return;

    get().setProgress(seriesId, existing.currentEpisode + count);
  },

  setWatchStatus(seriesId: string, status: WatchStatus) {
    const { progress } = get();
    const existing = progress[seriesId];
    if (!existing) return;

    const now = new Date().toISOString();
    const updatedProgress: UserProgress = {
      ...existing,
      watchStatus: status,
      completedAt: status === 'completed' ? now : existing.completedAt,
    };

    const newProgress = { ...progress, [seriesId]: updatedProgress };
    persistProgress(newProgress);
    set({ progress: newProgress });
  },

  startSeries(seriesId: string) {
    const { progress, episodeLogs } = get();
    const now = new Date().toISOString();

    // If already tracking, just set to watching
    if (progress[seriesId]) {
      get().setWatchStatus(seriesId, 'watching');
      return;
    }

    const newEntry: UserProgress = {
      userId: '', // filled by caller or from userStore
      seriesId,
      currentEpisode: 0,
      watchStatus: 'watching',
      startedAt: now,
      completedAt: null,
      lastWatchedAt: now,
      skipFiller: false,
    };

    const newProgress = { ...progress, [seriesId]: newEntry };
    persistProgress(newProgress);
    set({ progress: newProgress });
  },

  toggleFillerSkip(seriesId: string) {
    const { progress } = get();
    const existing = progress[seriesId];
    if (!existing) return;

    const updatedProgress: UserProgress = {
      ...existing,
      skipFiller: !existing.skipFiller,
    };

    const newProgress = { ...progress, [seriesId]: updatedProgress };
    persistProgress(newProgress);
    set({ progress: newProgress });
  },

  // ---------------------------------------------------------------------------
  // Queries
  // ---------------------------------------------------------------------------

  getProgress(seriesId: string): UserProgress | null {
    return get().progress[seriesId] ?? null;
  },

  getWatchingCount(): number {
    return Object.values(get().progress).filter(
      (p) => p.watchStatus === 'watching'
    ).length;
  },

  getCompletedCount(): number {
    return Object.values(get().progress).filter(
      (p) => p.watchStatus === 'completed'
    ).length;
  },

  getAllProgress(): UserProgress[] {
    return Object.values(get().progress);
  },

  getTotalEpisodesWatched(): number {
    return Object.values(get().progress).reduce(
      (sum, p) => sum + p.currentEpisode,
      0
    );
  },

  // ---------------------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------------------

  loadFromStorage() {
    if (typeof window === 'undefined') return;

    const storedProgress = getItem<Record<string, UserProgress>>(
      STORAGE_KEYS.USER_PROGRESS
    );
    const storedLogs = getItem<EpisodeLog[]>(STORAGE_KEYS.EPISODE_LOGS);

    set({
      progress: storedProgress ?? {},
      episodeLogs: storedLogs ?? [],
    });
  },
}));
