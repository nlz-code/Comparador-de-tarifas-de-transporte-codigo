import { useRouter } from 'expo-router';

import { faresFor } from '@/features/fares/utils/trip-input';
import { formatLongDate } from '@/features/fares/utils/format';
import { useHistoryStore } from '@/features/history/store/history-store';
import type { HistoryEntry } from '@/features/history/types/history';
import { useTripStore } from '@/features/route/store/trip-store';
import { useUiStore } from '@/features/settings/store/ui-store';
import { confirmDelete } from '@/lib/confirm';

interface DayGroup {
  key: string;
  title: string;
  entries: HistoryEntry[];
}

function dayTitle(d: Date): string {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return `Hoy · ${formatLongDate(d)}`;
  if (d.toDateString() === yesterday.toDateString()) return `Ayer · ${formatLongDate(d)}`;
  return formatLongDate(d);
}

function groupByDay(entries: HistoryEntry[]): DayGroup[] {
  const groups: DayGroup[] = [];
  for (const e of entries) {
    const d = new Date(e.searchedAt);
    const key = d.toDateString();
    const last = groups[groups.length - 1];
    if (last && last.key === key) {
      last.entries.push(e);
      continue;
    }
    groups.push({ key, title: dayTitle(d), entries: [e] });
  }
  return groups;
}

export function useHistoryScreen() {
  const router = useRouter();
  const entries = useHistoryStore((s) => s.entries);
  const remove = useHistoryStore((s) => s.remove);
  const clear = useHistoryStore((s) => s.clear);
  const loadTrip = useTripStore((s) => s.loadTrip);
  const setWhen = useTripStore((s) => s.setWhen);
  const tipDismissed = useUiStore((s) => s.historyTipDismissed);
  const dismissTip = useUiStore((s) => s.dismissHistoryTip);

  const cheapest = (e: HistoryEntry) =>
    faresFor({ ...e, when: e.when === 'now' ? e.searchedAt : e.when })[0];

  const open = (e: HistoryEntry) => {
    const future = e.when !== 'now' && new Date(e.when).getTime() > Date.now();
    setWhen(future ? e.when : 'now');
    loadTrip({ origin: e.origin, destination: e.destination, passengers: e.passengers, luggage: e.luggage });
    router.navigate('/');
  };

  const askRemove = (e: HistoryEntry) =>
    confirmDelete({
      title: '¿Borrar esta búsqueda?',
      message: `${e.origin.name} → ${e.destination.name}`,
      confirmLabel: 'Borrar',
      onConfirm: () => remove(e.id),
    });

  const askClear = () =>
    confirmDelete({
      title: '¿Borrar todo el historial?',
      message: 'Se eliminarán todas tus búsquedas recientes de este teléfono.',
      confirmLabel: 'Borrar todo',
      onConfirm: clear,
    });

  return {
    groups: groupByDay(entries),
    isEmpty: entries.length === 0,
    cheapest,
    open,
    askRemove,
    askClear,
    showTip: !tipDismissed,
    dismissTip,
    goHome: () => router.navigate('/'),
  };
}
