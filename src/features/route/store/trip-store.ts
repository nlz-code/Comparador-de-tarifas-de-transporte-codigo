import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { useHistoryStore } from '@/features/history/store/history-store';
import type { ManualRoute, Place, RouteResult, RouteStatus, TripWhen } from '@/features/route/types/route';
import { fetchRoute } from '@/features/route/utils/osrm';
import { PLACES } from '@/features/route/utils/places';
import { zustandStorage } from '@/lib/storage';

interface TripState {
  origin: Place | null;
  destination: Place | null;
  when: TripWhen;
  passengers: number;
  luggage: number;
  /** When set, km/min typed by the person replace the routed values. */
  manual: ManualRoute | null;
  route: RouteResult | null;
  status: RouteStatus;
  error: string | null;
  /** Bumps every time a fresh route resolves: the results replay their entrance. */
  revision: number;
  setOrigin: (p: Place) => void;
  setDestination: (p: Place) => void;
  swap: () => void;
  setWhen: (w: TripWhen) => void;
  setPassengers: (n: number) => void;
  setLuggage: (n: number) => void;
  setManual: (m: ManualRoute | null) => void;
  loadTrip: (t: { origin: Place; destination: Place; passengers?: number; luggage?: number }) => void;
  /** Re-route origin → destination. `record` adds the search to the history (default true). */
  refresh: (opts?: { record?: boolean }) => Promise<void>;
}

let requestID = 0;

export const useTripStore = create<TripState>()(
  persist(
    (set, get) => ({
      origin: PLACES.larios,
      destination: PLACES.airport,
      when: 'now',
      passengers: 1,
      luggage: 0,
      manual: null,
      route: null,
      status: 'idle',
      error: null,
      revision: 0,
      setOrigin: (origin) => {
        set({ origin, manual: null });
        void get().refresh();
      },
      setDestination: (destination) => {
        set({ destination, manual: null });
        void get().refresh();
      },
      swap: () => {
        const { origin, destination } = get();
        set({ origin: destination, destination: origin });
        void get().refresh();
      },
      setWhen: (when) => set({ when }),
      setPassengers: (passengers) => set({ passengers }),
      setLuggage: (luggage) => set({ luggage }),
      setManual: (manual) => {
        requestID += 1;
        if (!manual) {
          set({ manual: null });
          void get().refresh();
          return;
        }
        set((s) => ({
          manual,
          route: { km: manual.km, minutes: manual.minutes, source: 'manual' },
          status: 'ready',
          error: null,
          revision: s.revision + 1,
        }));
      },
      loadTrip: ({ origin, destination, passengers, luggage }) => {
        set((s) => ({
          origin,
          destination,
          manual: null,
          passengers: passengers ?? s.passengers,
          luggage: luggage ?? s.luggage,
        }));
        void get().refresh();
      },
      refresh: async (opts) => {
        const { origin, destination, manual } = get();
        if (manual) return;
        if (!origin || !destination) {
          set({ status: 'idle', route: null, error: null });
          return;
        }
        if (origin.id === destination.id) {
          set({ status: 'error', route: null, error: 'El origen y el destino son el mismo lugar.' });
          return;
        }
        requestID += 1;
        const current = requestID;
        set({ status: 'loading', error: null });
        try {
          const route = await fetchRoute(origin, destination);
          if (current !== requestID) return;
          set((s) => ({ route, status: 'ready', revision: s.revision + 1 }));
          if (opts?.record === false) return;
          const s = get();
          useHistoryStore.getState().record({
            origin,
            destination,
            when: s.when,
            passengers: s.passengers,
            luggage: s.luggage,
            km: route.km,
            minutes: route.minutes,
          });
        } catch (e) {
          if (current !== requestID) return;
          const message = e instanceof Error && e.message.startsWith('No ') ? e.message : 'Sin conexión con el servicio de rutas. Comprueba tu conexión o introduce los km y minutos a mano.';
          set({ status: 'error', error: message });
        }
      },
    }),
    {
      name: 'trip',
      storage: createJSONStorage(() => zustandStorage),
      partialize: (s) => ({
        origin: s.origin,
        destination: s.destination,
        passengers: s.passengers,
        luggage: s.luggage,
        manual: s.manual,
        route: s.route,
      }),
    },
  ),
);
