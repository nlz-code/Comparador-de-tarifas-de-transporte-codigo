import { ScrollView, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Card } from '@/components/card';
import { Icon } from '@/components/icon';
import { PillButton } from '@/components/pill-button';
import { Pressable } from '@/components/pressable';
import { ScreenHeader } from '@/components/screen-header';
import { HistoryCard } from '@/features/history/components/history-card';
import { useHistoryScreen } from '@/features/history/hooks/use-history-screen';
import { fadeIn, fadeOut, reflow } from '@/lib/motion';

export default function HistoryScreen() {
  const s = useHistoryScreen();

  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="px-5 pt-safe-offset-2 pb-safe-offset-22 gap-5">
      <ScreenHeader title="Historial" subtitle="Tus búsquedas recientes" />

      {s.showTip ? (
        <Animated.View exiting={fadeOut}>
          <View className="flex-row items-center gap-3 rounded-2xl bg-sky px-4 py-3.5">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-accent">
              <Icon name="time" size={20} tone="white" />
            </View>
            <View className="flex-1 gap-0.5">
              <Text className="font-j7 text-sm text-foreground">Vuelve a tu ruta en un toque</Text>
              <Text className="font-j4 text-row text-muted">Tus búsquedas se guardan automáticamente en este teléfono</Text>
            </View>
            <Pressable onPress={s.dismissTip} accessibilityLabel="Cerrar aviso" hitSlop={8}>
              <Icon name="close" size={20} tone="muted" />
            </Pressable>
          </View>
        </Animated.View>
      ) : null}

      {s.isEmpty ? (
        <Card>
          <View className="items-center gap-2 py-2">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-sky">
              <Icon name="search" size={22} tone="accent" />
            </View>
            <Text className="font-j7 text-sm text-foreground">Todavía no hay búsquedas</Text>
            <Text className="text-center font-j4 text-row text-muted">
              Cada ruta que compares en Inicio aparecerá aquí para repetirla cuando quieras.
            </Text>
          </View>
          <PillButton label="Comparar una ruta" onPress={s.goHome} />
        </Card>
      ) : null}

      {s.groups.map((g) => (
        <Animated.View key={g.key} entering={fadeIn} layout={reflow} className="gap-3">
          <Text className="font-j6 text-base text-muted">{g.title}</Text>
          {g.entries.map((e) => (
            <Animated.View key={e.id} exiting={fadeOut} layout={reflow}>
              <HistoryCard entry={e} cheapest={s.cheapest(e)} onOpen={() => s.open(e)} onLongPress={() => s.askRemove(e)} />
            </Animated.View>
          ))}
        </Animated.View>
      ))}

      {s.isEmpty ? null : (
        <View className="items-center gap-3">
          <Text className="font-j4 text-mini text-muted">Mantén pulsada una búsqueda para borrarla.</Text>
          <Pressable onPress={s.askClear} accessibilityRole="button" accessibilityLabel="Borrar historial">
            <View className="flex-row items-center gap-1.5 px-3 py-2">
              <Icon name="trash-outline" size={15} tone="danger" />
              <Text className="font-j6 text-row text-danger">Borrar historial</Text>
            </View>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
