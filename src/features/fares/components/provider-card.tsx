import { Text, View } from 'react-native';

import { Card } from '@/components/card';
import { Icon } from '@/components/icon';
import { PillButton } from '@/components/pill-button';
import { CHEAPEST_TAG_DELAY, CheapestTag } from '@/features/fares/components/cheapest-tag';
import { ProviderLogo } from '@/features/fares/components/provider-logo';
import type { BreakdownIcon, FareEstimate } from '@/features/fares/types/fares';
import { formatEuro, formatKm, formatMin } from '@/features/fares/utils/format';

const LINE_ICONS: Record<BreakdownIcon, 'car-outline' | 'time-outline' | 'flag-outline' | 'add-circle-outline' | 'speedometer-outline' | 'trending-up-outline'> = {
  distance: 'car-outline',
  time: 'time-outline',
  base: 'flag-outline',
  minimum: 'speedometer-outline',
  supplement: 'add-circle-outline',
  multiplier: 'trending-up-outline',
};

interface ProviderCardProps {
  estimate: FareEstimate;
  km: number;
  minutes: number;
  cheapest: boolean;
  onOrder: () => void;
}

export function ProviderCard({ estimate, km, minutes, cheapest, onOrder }: ProviderCardProps) {
  const isTaxi = estimate.provider === 'taxi';
  return (
    <Card>
      <View className="flex-row items-start gap-3">
        <ProviderLogo provider={estimate.provider} />
        <View className="flex-1 gap-1">
          <View className="flex-row flex-wrap items-center gap-2">
            <Text className="font-j7 text-base text-foreground">{estimate.name}</Text>
            {cheapest ? <CheapestTag delay={CHEAPEST_TAG_DELAY} /> : null}
          </View>
          <Text className="font-j4 text-row text-muted">
            {formatMin(minutes)} · {formatKm(km)}
          </Text>
        </View>
        <View className="items-end">
          <Text className="font-j8 text-price text-foreground">{formatEuro(estimate.total)}</Text>
          <Text className="font-j4 text-mini text-muted">{isTaxi ? 'Tarifa oficial' : 'Estimación'}</Text>
        </View>
      </View>

      {isTaxi ? (
        <View className="flex-row items-center gap-1.5 self-start rounded-full bg-sky px-2.5 py-1">
          <Icon name="receipt-outline" size={12} tone="accent" />
          <Text className="font-j6 text-mini text-accent">
            {estimate.tariffLabel} · {estimate.tariffReason}
          </Text>
        </View>
      ) : null}

      <View className="flex-row items-end gap-3">
        <View className="flex-1 gap-1">
          {estimate.lines.map((line) => (
            <View key={line.label} className="flex-row items-center gap-2">
              <Icon name={LINE_ICONS[line.icon]} size={14} tone="muted" />
              <Text className="w-16 font-j6 text-row text-foreground">{formatEuro(line.amount)}</Text>
              <Text className="flex-1 font-j4 text-row text-muted" numberOfLines={1}>
                {line.label}
              </Text>
            </View>
          ))}
        </View>
        <PillButton label="Pedir" onPress={onOrder} />
      </View>
    </Card>
  );
}
