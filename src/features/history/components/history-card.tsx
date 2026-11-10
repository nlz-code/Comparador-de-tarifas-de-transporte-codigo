import { Text, View } from 'react-native';

import { Card } from '@/components/card';
import { Icon } from '@/components/icon';
import { PillButton } from '@/components/pill-button';
import { Pressable } from '@/components/pressable';
import { ProviderLogo } from '@/features/fares/components/provider-logo';
import type { FareEstimate } from '@/features/fares/types/fares';
import { formatEuro, formatMin, formatPassengers, formatTime } from '@/features/fares/utils/format';
import type { HistoryEntry } from '@/features/history/types/history';

interface HistoryCardProps {
  entry: HistoryEntry;
  cheapest: FareEstimate | undefined;
  onOpen: () => void;
  onLongPress: () => void;
}

function Stop({ name, locality, pin }: { name: string; locality: string; pin?: boolean }) {
  return (
    <View className="flex-row gap-2.5">
      <View className="w-5 items-center pt-0.5">
        {pin ? (
          <Icon name="location" size={17} tone="pin" />
        ) : (
          <View className="h-4 w-4 items-center justify-center rounded-full bg-sky">
            <View className="h-2.5 w-2.5 rounded-full bg-accent" />
          </View>
        )}
      </View>
      <View className="flex-1">
        <Text className="font-j6 text-row text-foreground" numberOfLines={1}>
          {name}
        </Text>
        <Text className="font-j4 text-mini text-muted" numberOfLines={1}>
          {locality}
        </Text>
      </View>
    </View>
  );
}

export function HistoryCard({ entry, cheapest, onOpen, onLongPress }: HistoryCardProps) {
  const time = entry.when === 'now' ? `Buscado a las ${formatTime(new Date(entry.searchedAt))}` : `Salida ${formatTime(new Date(entry.when))}`;
  return (
    <Pressable onPress={onOpen} onLongPress={onLongPress} accessibilityRole="button" accessibilityLabel={`${entry.origin.name} a ${entry.destination.name}`}>
      <Card>
        <View className="flex-row gap-3">
          <View className="flex-1 gap-2">
            <Stop name={entry.origin.name} locality={entry.origin.locality} />
            <Stop name={entry.destination.name} locality={entry.destination.locality} pin />
            <View className="flex-row items-center gap-2.5">
              <View className="w-5 items-center">
                <Icon name="time-outline" size={15} tone="muted" />
              </View>
              <Text className="flex-1 font-j4 text-mini text-muted" numberOfLines={1}>
                {time} · {formatPassengers(entry.passengers)}
              </Text>
            </View>
          </View>
          <View className="w-px bg-border" />
          <View className="w-32 justify-between gap-3">
            {cheapest ? (
              <View className="flex-row items-center gap-2">
                <ProviderLogo provider={cheapest.provider} size="sm" />
                <View className="flex-1">
                  <Text className="font-j8 text-sm text-foreground">{formatEuro(cheapest.total)}</Text>
                  <Text className="font-j4 text-tiny text-muted">Est. {formatMin(entry.minutes)}</Text>
                </View>
              </View>
            ) : null}
            <PillButton label="Ver detalles" variant="soft" wide onPress={onOpen} />
          </View>
        </View>
      </Card>
    </Pressable>
  );
}
