import { Text, View } from 'react-native';

import { Card } from '@/components/card';
import { Icon } from '@/components/icon';
import { RowChevron } from '@/components/list-row';
import { Pressable } from '@/components/pressable';
import type { Place } from '@/features/route/types/route';

interface RouteCardProps {
  origin: Place | null;
  destination: Place | null;
  whenLabel: string;
  passengersLabel: string;
  onOrigin: () => void;
  onDestination: () => void;
  onWhen: () => void;
  onPassengers: () => void;
  onSwap: () => void;
}

function PlaceRow({ label, place, onPress }: { label: string; place: Place | null; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`${label}: ${place?.name ?? 'elige un lugar'}`}>
      <View className="flex-row items-center gap-2 py-2.5">
        <View className="flex-1 gap-0.5">
          <Text className="font-j4 text-row text-muted">{label}</Text>
          <Text className={`font-j7 text-base ${place ? 'text-foreground' : 'text-muted'}`} numberOfLines={1}>
            {place ? place.name : 'Elige un lugar'}
          </Text>
        </View>
        <RowChevron />
      </View>
    </Pressable>
  );
}

function FooterButton({ icon, label, onPress }: { icon: 'time-outline' | 'person-outline'; label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <View className="flex-row items-center gap-2 py-1">
        <Icon name={icon} size={18} tone="muted" />
        <Text className="font-j5 text-row text-foreground" numberOfLines={1}>
          {label}
        </Text>
        <Icon name="chevron-down" size={13} tone="muted" />
      </View>
    </Pressable>
  );
}

/** Desde / Hasta with the blue dot, the dotted line and the teal pin, plus when and how many. */
export function RouteCard(props: RouteCardProps) {
  return (
    <Card>
      <View className="flex-row gap-3">
        <View className="w-6 items-center py-5">
          <View className="h-4 w-4 items-center justify-center rounded-full bg-sky">
            <View className="h-2.5 w-2.5 rounded-full bg-accent" />
          </View>
          <View className="w-px flex-1 bg-border" />
          <Icon name="location" size={20} tone="pin" />
        </View>
        <View className="flex-1">
          <PlaceRow label="Desde" place={props.origin} onPress={props.onOrigin} />
          <View className="h-px bg-border" />
          <PlaceRow label="Hasta" place={props.destination} onPress={props.onDestination} />
        </View>
      </View>
      <View className="h-px bg-border" />
      <View className="flex-row items-center gap-3">
        <View className="flex-1">
          <FooterButton icon="time-outline" label={props.whenLabel} onPress={props.onWhen} />
        </View>
        <View className="h-6 w-px bg-border" />
        <View className="flex-1">
          <FooterButton icon="person-outline" label={props.passengersLabel} onPress={props.onPassengers} />
        </View>
        <Pressable onPress={props.onSwap} accessibilityRole="button" accessibilityLabel="Intercambiar origen y destino" hitSlop={6}>
          <View className="h-8 w-8 items-center justify-center rounded-full bg-sky">
            <Icon name="swap-vertical" size={16} tone="accent" />
          </View>
        </Pressable>
      </View>
    </Card>
  );
}
