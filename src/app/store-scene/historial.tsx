import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

import { useHistoryStore } from '@/features/history/store/history-store';
import { PLACES } from '@/features/route/utils/places';

/** Dev-only store screenshot scene. Release builds drop this folder. */
export default function StoreScene() {
  const router = useRouter();
  useEffect(() => {
    if (!__DEV__) {
      router.replace('/');
      return;
    }
    const ago = (h: number) => new Date(Date.now() - h * 3_600_000).toISOString();
    useHistoryStore.setState({
      entries: [
        { id: 's-h1', origin: PLACES.larios, destination: PLACES.airport, when: 'now', searchedAt: ago(1), passengers: 2, luggage: 2, km: 12.6, minutes: 19 },
        { id: 's-h2', origin: PLACES.mariaZambrano, destination: PLACES.malagueta, when: 'now', searchedAt: ago(5), passengers: 1, luggage: 1, km: 3.4, minutes: 10 },
        { id: 's-h3', origin: PLACES.merced, destination: PLACES.uma, when: 'now', searchedAt: ago(26), passengers: 1, luggage: 0, km: 7.8, minutes: 15 },
        { id: 's-h4', origin: PLACES.airport, destination: PLACES.muelleUno, when: 'now', searchedAt: ago(50), passengers: 3, luggage: 3, km: 10.4, minutes: 16 },
      ],
    });
    router.replace('/historial');
  }, [router]);
  return <View className="flex-1 bg-background" />;
}
