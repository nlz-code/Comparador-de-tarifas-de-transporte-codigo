import { Alert, Text, View } from 'react-native';

import { Card } from '@/components/card';
import { Icon } from '@/components/icon';
import { PillButton } from '@/components/pill-button';
import { Pressable } from '@/components/pressable';
import type { Favorite } from '@/features/favorites/types/favorites';
import { CATEGORIES } from '@/features/favorites/utils/categories';
import { formatEuro, formatKm, formatMin } from '@/features/fares/utils/format';

interface FavoriteRowProps {
  favorite: Favorite;
  /** Cheapest estimate right now, for this route. */
  price: number;
  onOpen: () => void;
  onEdit: () => void;
  /** Asks the user to confirm, then deletes. */
  onAskDelete: () => void;
}

export function FavoriteRow({ favorite, price, onOpen, onEdit, onAskDelete }: FavoriteRowProps) {
  const cat = CATEGORIES[favorite.category];

  const openMenu = () =>
    Alert.alert(favorite.name, undefined, [
      { text: 'Ver precios', onPress: onOpen },
      { text: 'Editar', onPress: onEdit },
      { text: 'Eliminar', style: 'destructive', onPress: onAskDelete },
      { text: 'Cancelar', style: 'cancel' },
    ]);

  return (
    <Card>
      <View className="flex-row gap-3">
        <View className={`h-12 w-12 items-center justify-center rounded-xl ${cat.bg}`}>
          <Icon name={cat.icon} size={22} tone={cat.tone} />
        </View>
        <View className="flex-1 gap-0.5">
          <Text className="font-j4 text-mini text-muted">{cat.label}</Text>
          <Text className="font-j7 text-sm text-foreground" numberOfLines={2}>
            {favorite.name}
          </Text>
          <Text className="font-j4 text-mini text-muted" numberOfLines={1}>
            {favorite.origin.name} → {favorite.destination.name}
          </Text>
          <View className="flex-row items-center gap-3 pt-1">
            <View className="flex-row items-center gap-1">
              <Icon name="time-outline" size={13} tone="muted" />
              <Text className="font-j5 text-mini text-muted">{formatMin(favorite.minutes)}</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Icon name="git-branch-outline" size={13} tone="muted" />
              <Text className="font-j5 text-mini text-muted">{formatKm(favorite.km)}</Text>
            </View>
          </View>
        </View>
        <Pressable onPress={openMenu} accessibilityLabel={`Opciones de ${favorite.name}`} hitSlop={8}>
          <Icon name="ellipsis-vertical" size={18} tone="foreground" />
        </Pressable>
      </View>
      <View className="flex-row items-center justify-between gap-3">
        <View>
          <Text className="font-j8 text-price text-foreground">desde {formatEuro(price)}</Text>
          <Text className="font-j4 text-mini text-muted">Estimación para ahora</Text>
        </View>
        <PillButton label="Ver precios" onPress={onOpen} />
      </View>
    </Card>
  );
}
