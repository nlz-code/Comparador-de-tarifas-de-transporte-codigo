import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandStorage } from '@/lib/storage';

interface UiState {
  historyTipDismissed: boolean;
  dismissHistoryTip: () => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      historyTipDismissed: false,
      dismissHistoryTip: () => set({ historyTipDismissed: true }),
    }),
    { name: 'ui', storage: createJSONStorage(() => zustandStorage) },
  ),
);
