import { confirmDelete } from '@/lib/confirm';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Presets } from 'react-native-pulsar';

import { isSaved, useFavoritesStore } from '@/features/favorites/store/favorites-store';
import type { Favorite, Suggestion } from '@/features/favorites/types/favorites';
import { SUGGESTIONS } from '@/features/favorites/utils/suggestions';
import { faresFor } from '@/features/fares/utils/trip-input';
import { useTripStore } from '@/features/route/store/trip-store';

export function useFavoritesScreen() {
  const router = useRouter();
  const favorites = useFavoritesStore((s) => s.favorites);
  const add = useFavoritesStore((s) => s.add);
  const remove = useFavoritesStore((s) => s.remove);
  const loadTrip = useTripStore((s) => s.loadTrip);
  const passengers = useTripStore((s) => s.passengers);
  const luggage = useTripStore((s) => s.luggage);
  const origin = useTripStore((s) => s.origin);
  const trip = { passengers, luggage, origin };
  const [adding, setAdding] = useState(false);

  const cheapestNow = (f: Favorite) =>
    faresFor({ ...f, when: 'now', passengers: trip.passengers, luggage: trip.luggage })[0]?.total ?? 0;

  const open = (f: Favorite) => {
    loadTrip({ origin: f.origin, destination: f.destination });
    router.navigate('/');
  };

  const addSuggestion = (s: Suggestion) => {
    add({ category: s.category, name: s.title, origin: s.origin, destination: s.destination, km: s.km, minutes: s.minutes });
    Presets.System.notificationSuccess();
  };

  return {
    favorites,
    suggestions: SUGGESTIONS.map((s) => ({ suggestion: s, saved: isSaved(favorites, s.origin.id, s.destination.id) })),
    cheapestNow,
    open,
    askDelete: (f: Favorite) =>
      confirmDelete({
        title: '¿Eliminar este favorito?',
        message: `«${f.name}» dejará de aparecer en tus rutas guardadas.`,
        confirmLabel: 'Eliminar',
        onConfirm: () => remove(f.id),
      }),
    add: (f: Omit<Favorite, 'id' | 'createdAt'>) => {
      add(f);
      Presets.System.notificationSuccess();
    },
    addSuggestion,
    adding,
    setAdding,
    defaultOrigin: trip.origin,
    openHome: () => router.navigate('/'),
  };
}
