import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

import { useFavoritesStore } from '@/features/favorites/store/favorites-store';
import { PLACES } from '@/features/route/utils/places';

/** Dev-only store screenshot scene. Release builds drop this folder. */
export default function StoreScene() {
  const router = useRouter();
  useEffect(() => {
    if (!__DEV__) {
      router.replace('/');
      return;
    }
    useFavoritesStore.setState({
      favorites: [
        { id: 's-1', category: 'casa', name: 'Casa → Oficina', origin: PLACES.larios, destination: PLACES.andalucia, km: 3.1, minutes: 6, createdAt: '2026-11-01T09:00:00.000Z' },
        { id: 's-2', category: 'aeropuerto', name: 'Casa → Aeropuerto', origin: PLACES.larios, destination: PLACES.airport, km: 12.6, minutes: 19, createdAt: '2026-11-01T09:01:00.000Z' },
        { id: 's-3', category: 'ocio', name: 'Casa → Muelle Uno', origin: PLACES.larios, destination: PLACES.muelleUno, km: 3.9, minutes: 11, createdAt: '2026-11-01T09:02:00.000Z' },
      ],
    });
    router.replace('/favoritos');
  }, [router]);
  return <View className="flex-1 bg-background" />;
}
