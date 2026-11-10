import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useRef, useState } from 'react';
import { Presets } from 'react-native-pulsar';

import { isSaved, useFavoritesStore } from '@/features/favorites/store/favorites-store';
import type { FareEstimate } from '@/features/fares/types/fares';
import { VTC_FORMULAS } from '@/features/fares/config/tariffs';
import { savings } from '@/features/fares/utils/compare';
import { formatPassengers, formatWhen } from '@/features/fares/utils/format';
import { faresFor, resolveWhen } from '@/features/fares/utils/trip-input';
import { useTripStore } from '@/features/route/store/trip-store';
import { isAirport, shortName } from '@/features/route/utils/places';

export type HomeSheet = 'origin' | 'destination' | 'when' | 'passengers' | 'taxi' | null;

export function useHomeScreen() {
  const router = useRouter();
  const trip = useTripStore();
  const favorites = useFavoritesStore((s) => s.favorites);
  const addFavorite = useFavoritesStore((s) => s.add);
  const [sheet, setSheet] = useState<HomeSheet>(null);
  const [taxiEstimate, setTaxiEstimate] = useState<FareEstimate | null>(null);

  useEffect(() => {
    if (useTripStore.getState().manual) return;
    void useTripStore.getState().refresh({ record: false });
  }, []);

  const firstRevision = useRef(true);
  useEffect(() => {
    if (trip.revision === 0) return;
    if (firstRevision.current) {
      firstRevision.current = false;
      return;
    }
    Presets.System.notificationSuccess();
  }, [trip.revision]);

  const route = trip.status === 'ready' || trip.status === 'loading' ? trip.route : null;
  const estimates = route
    ? faresFor({
        origin: trip.origin,
        destination: trip.destination,
        km: route.km,
        minutes: route.minutes,
        when: trip.when,
        passengers: trip.passengers,
        luggage: trip.luggage,
      })
    : [];

  const when = resolveWhen(trip.when);
  const whenLabel = trip.when === 'now' ? 'Ahora' : formatWhen(when);

  const order = (e: FareEstimate) => {
    if (e.provider === 'taxi') {
      setTaxiEstimate(e);
      setSheet('taxi');
      return;
    }
    const formula = VTC_FORMULAS.find((f) => f.id === e.provider);
    if (formula) void WebBrowser.openBrowserAsync(formula.url);
  };

  const canSave = Boolean(trip.origin && trip.destination && route && trip.origin.id !== trip.destination.id);
  const saved = trip.origin && trip.destination ? isSaved(favorites, trip.origin.id, trip.destination.id) : false;

  const saveRoute = () => {
    if (!trip.origin || !trip.destination || !route) return;
    addFavorite({
      category: isAirport(trip.destination) ? 'aeropuerto' : 'otro',
      name: `${shortName(trip.origin)} → ${shortName(trip.destination)}`,
      origin: trip.origin,
      destination: trip.destination,
      km: route.km,
      minutes: route.minutes,
    });
    Presets.System.notificationSuccess();
  };

  return {
    trip,
    route,
    estimates,
    maxSavings: savings(estimates),
    whenLabel,
    passengersLabel: formatPassengers(trip.passengers) + (trip.luggage > 0 ? ` · ${trip.luggage} mal.` : ''),
    sheet,
    setSheet,
    taxiEstimate,
    order,
    canSave,
    saved,
    saveRoute,
    openTariffs: () => router.navigate('/tarifas'),
    openFavorites: () => router.navigate('/favoritos'),
  };
}
