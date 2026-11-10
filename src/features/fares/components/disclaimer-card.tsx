import { Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { DISCLAIMER } from '@/features/fares/config/tariffs';

export function DisclaimerCard({ footnote }: { footnote?: string }) {
  return (
    <View className="gap-2 rounded-2xl border border-border bg-background px-4 py-3">
      <View className="flex-row gap-2">
        <Icon name="information-circle-outline" size={16} tone="accent" />
        <Text className="flex-1 font-j4 text-mini text-muted">{DISCLAIMER}</Text>
      </View>
      {footnote ? <Text className="font-j5 text-tiny text-muted">{footnote}</Text> : null}
    </View>
  );
}
