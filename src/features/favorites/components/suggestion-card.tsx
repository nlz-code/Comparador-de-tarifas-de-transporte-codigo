import { Text, View } from 'react-native';

import { Card } from '@/components/card';
import { Icon } from '@/components/icon';
import { Pressable } from '@/components/pressable';
import type { Suggestion } from '@/features/favorites/types/favorites';
import { SUGGESTION_TILES } from '@/features/favorites/utils/categories';
import { formatKm, formatMin } from '@/features/fares/utils/format';
import { shortName } from '@/features/route/utils/places';

interface SuggestionCardProps {
  suggestion: Suggestion;
  saved: boolean;
  onAdd: () => void;
}

export function SuggestionCard({ suggestion, saved, onAdd }: SuggestionCardProps) {
  const tile = SUGGESTION_TILES[suggestion.icon];
  return (
    <View className="w-72">
      <Card>
        <View className="flex-row items-center gap-3">
          <View className={`h-11 w-11 items-center justify-center rounded-xl ${tile.bg}`}>
            <Icon name={tile.icon} size={20} tone={tile.tone} />
          </View>
          <View className="flex-1 gap-0.5">
            <Text className="font-j7 text-row text-foreground">{suggestion.title}</Text>
            <Text className="font-j4 text-mini text-muted" numberOfLines={1}>
              {shortName(suggestion.origin)} → {shortName(suggestion.destination)}
            </Text>
            <Text className="font-j4 text-mini text-muted">
              {formatMin(suggestion.minutes)} · {formatKm(suggestion.km)}
            </Text>
          </View>
          <Pressable
            onPress={onAdd}
            isDisabled={saved}
            accessibilityRole="button"
            accessibilityLabel={saved ? `${suggestion.title} ya está en favoritos` : `Añadir ${suggestion.title} a favoritos`}>
            <View className="h-9 w-9 items-center justify-center rounded-full bg-sky">
              <Icon name={saved ? 'checkmark' : 'add'} size={18} tone="accent" />
            </View>
          </Pressable>
        </View>
      </Card>
    </View>
  );
}
