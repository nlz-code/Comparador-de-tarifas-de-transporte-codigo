import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';


/** Dev-only store screenshot scene. Release builds drop this folder. */
export default function StoreScene() {
  const router = useRouter();
  useEffect(() => {
    if (!__DEV__) {
      router.replace('/');
      return;
    }

    router.replace('/tarifas');
  }, [router]);
  return <View className="flex-1 bg-background" />;
}
