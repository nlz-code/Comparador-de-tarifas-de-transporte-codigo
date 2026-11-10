import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Card } from '@/components/card';
import { Icon } from '@/components/icon';
import { Image } from '@/components/image';
import { RowChevron } from '@/components/list-row';
import { MintBanner } from '@/components/mint-banner';
import { PillButton } from '@/components/pill-button';
import { Pressable } from '@/components/pressable';
import { ScreenHeader } from '@/components/screen-header';
import { AddFavoriteSheet } from '@/features/favorites/components/add-favorite-sheet';
import { FavoriteRow } from '@/features/favorites/components/favorite-row';
import { SuggestionCard } from '@/features/favorites/components/suggestion-card';
import { useFavoritesScreen } from '@/features/favorites/hooks/use-favorites-screen';
import { enterStaggered, reflow } from '@/lib/motion';

export default function FavoritesScreen() {
  const s = useFavoritesScreen();
  const [revealed, setRevealed] = useState(false);
  useFocusEffect(
    useCallback(() => {
      setRevealed(true);
    }, []),
  );

  return (
    <>
      <ScrollView className="flex-1 bg-background" contentContainerClassName="px-5 pt-safe-offset-2 pb-safe-offset-22 gap-5">
        <ScreenHeader title="Mis favoritos" subtitle="Tus rutas, siempre a mano" />

        <MintBanner
          title="Ahorra en tus trayectos favoritos"
          subtitle="Consulta precios en segundos y compara todas las opciones de transporte"
          onPress={s.openHome}
        />

        <View className="gap-3">
          <Text className="font-j8 text-xl text-foreground">Tus rutas guardadas</Text>

          {s.favorites.length === 0 ? (
            <Card>
              <View className="items-center gap-2 py-2">
                <View className="h-12 w-12 items-center justify-center rounded-full bg-heart-soft">
                  <Icon name="heart-outline" size={22} tone="heart" />
                </View>
                <Text className="font-j7 text-sm text-foreground">Aún no tienes rutas guardadas</Text>
                <Text className="text-center font-j4 text-row text-muted">
                  Guarda tus trayectos habituales para ver sus precios con un toque.
                </Text>
              </View>
              <PillButton label="Añadir ruta" icon="add" onPress={() => s.setAdding(true)} />
            </Card>
          ) : null}

          {revealed
            ? s.favorites.map((f, i) => (
                <Animated.View key={f.id} entering={enterStaggered(i)} layout={reflow}>
                  <FavoriteRow favorite={f} price={s.cheapestNow(f)} onOpen={() => s.open(f)} onAskDelete={() => s.askDelete(f)} />
                </Animated.View>
              ))
            : null}

          <Pressable onPress={() => s.setAdding(true)} accessibilityRole="button" accessibilityLabel="Añadir nueva ruta">
            <View className="flex-row items-center gap-3 rounded-2xl border border-dashed border-border px-4 py-3.5">
              <View className="h-11 w-11 items-center justify-center rounded-xl bg-sky">
                <Icon name="add" size={24} tone="accent" />
              </View>
              <View className="flex-1 gap-0.5">
                <Text className="font-j7 text-sm text-foreground">Añadir nueva ruta</Text>
                <Text className="font-j4 text-row text-muted">Guarda tus trayectos más frecuentes</Text>
              </View>
              <RowChevron />
            </View>
          </Pressable>
        </View>

        <View className="flex-row items-center overflow-hidden rounded-2xl bg-sky pl-4">
          <View className="flex-1 gap-1 py-4">
            <Text className="font-j8 text-base text-foreground">Llega siempre a tiempo</Text>
            <Text className="font-j4 text-row text-muted">Guarda tus rutas y consulta precios en un solo toque, estés donde estés.</Text>
          </View>
          <Image source={require('@/assets/images/app/mascot-thumbs.png')} className="h-28 w-40" contentFit="contain" contentPosition="right bottom" />
        </View>

        <View className="gap-3">
          <Text className="font-j8 text-xl text-foreground">Sugerencias para ti</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-3 pr-5" className="-mx-5 px-5">
            {s.suggestions.map(({ suggestion, saved }) => (
              <SuggestionCard key={suggestion.id} suggestion={suggestion} saved={saved} onAdd={() => s.addSuggestion(suggestion)} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {s.adding ? (
        <AddFavoriteSheet visible initialOrigin={s.defaultOrigin} onClose={() => s.setAdding(false)} onSave={s.add} />
      ) : null}
    </>
  );
}
