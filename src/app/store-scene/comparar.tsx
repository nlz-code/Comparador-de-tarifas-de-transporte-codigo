import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

import { useTripStore } from '@/features/route/store/trip-store';
import { PLACES } from '@/features/route/utils/places';

/** Dev-only store screenshot scene. Release builds drop this folder. */
export default function StoreScene() {
  const router = useRouter();
  useEffect(() => {
    if (!__DEV__) {
      router.replace('/');
      return;
    }
    useTripStore.setState({ when: 'now', passengers: 2, luggage: 2 });
    useTripStore.getState().loadTrip({ origin: PLACES.larios, destination: PLACES.airport, passengers: 2, luggage: 2 });
    router.replace('/');
  }, [router]);
  return <View className="flex-1 bg-background" />;
}
