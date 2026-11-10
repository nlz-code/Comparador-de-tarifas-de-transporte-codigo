import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { HistoryEntry } from '@/features/history/types/history';
import { zustandStorage } from '@/lib/storage';

const MAX_ENTRIES = 50;

interface HistoryState {
  entries: HistoryEntry[];
  record: (e: Omit<HistoryEntry, 'id' | 'searchedAt'>) => void;
  remove: (id: string) => void;
  clear: () => void;
}

/** Only real searches made in the app; starts empty. Newest first. */
export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      entries: [],
      record: (e) =>
        set((s) => {
          const now = new Date();
          const sameRouteToday = (h: HistoryEntry) =>
            h.origin.id === e.origin.id &&
            h.destination.id === e.destination.id &&
            new Date(h.searchedAt).toDateString() === now.toDateString();
          const rest = s.entries.filter((h) => !sameRouteToday(h));
          const entry: HistoryEntry = { ...e, id: `h-${now.getTime()}`, searchedAt: now.toISOString() };
          return { entries: [entry, ...rest].slice(0, MAX_ENTRIES) };
        }),
      remove: (id) => set((s) => ({ entries: s.entries.filter((h) => h.id !== id) })),
      clear: () => set({ entries: [] }),
    }),
    { name: 'history', storage: createJSONStorage(() => zustandStorage) },
  ),
);
