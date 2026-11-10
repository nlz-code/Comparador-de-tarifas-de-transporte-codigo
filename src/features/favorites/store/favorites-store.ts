import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Favorite } from '@/features/favorites/types/favorites';
import { PLACES } from '@/features/route/utils/places';
import { zustandStorage } from '@/lib/storage';

/** The owner's example routes. km/min are real OSRM driving values. */
const SEED: Favorite[] = [
  { id: 'f-1', category: 'casa', name: 'Calle Larios, 2 → Oficina', origin: PLACES.larios, destination: PLACES.andalucia, km: 3.1, minutes: 6, createdAt: '2026-11-01T09:00:00.000Z' },
  { id: 'f-2', category: 'aeropuerto', name: 'Mi casa → Aeropuerto de Málaga (AGP)', origin: PLACES.larios, destination: PLACES.airport, km: 12.6, minutes: 19, createdAt: '2026-11-01T09:01:00.000Z' },
  { id: 'f-3', category: 'ocio', name: 'Casa → Muelle Uno', origin: PLACES.larios, destination: PLACES.muelleUno, km: 3.9, minutes: 11, createdAt: '2026-11-01T09:02:00.000Z' },
  { id: 'f-4', category: 'trabajo', name: 'Oficina → Aeropuerto de Málaga (AGP)', origin: PLACES.andalucia, destination: PLACES.airport, km: 10.9, minutes: 16, createdAt: '2026-11-01T09:03:00.000Z' },
];

interface FavoritesState {
  favorites: Favorite[];
  add: (f: Omit<Favorite, 'id' | 'createdAt'>) => void;
  remove: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: SEED,
      add: (f) =>
        set((s) => ({
          favorites: [...s.favorites, { ...f, id: `f-${Date.now()}`, createdAt: new Date().toISOString() }],
        })),
      remove: (id) => set((s) => ({ favorites: s.favorites.filter((f) => f.id !== id) })),
    }),
    { name: 'favorites', storage: createJSONStorage(() => zustandStorage) },
  ),
);

export function isSaved(favorites: Favorite[], originID: string, destinationID: string): boolean {
  return favorites.some((f) => f.origin.id === originID && f.destination.id === destinationID);
}
