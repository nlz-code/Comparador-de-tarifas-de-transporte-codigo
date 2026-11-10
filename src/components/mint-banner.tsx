import { Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { RowChevron } from '@/components/list-row';
import { Pressable } from '@/components/pressable';

interface MintBannerProps {
  title: string;
  subtitle: string;
  onPress: () => void;
}

/** The mint savings banner with the leaf, from the picked design. */
export function MintBanner({ title, subtitle, onPress }: MintBannerProps) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={title}>
      <View className="flex-row items-center gap-3 rounded-2xl bg-mint-soft px-4 py-3.5">
        <Icon name="leaf" size={26} tone="mint" />
        <View className="flex-1 gap-0.5">
          <Text className="font-j7 text-sm text-mint">{title}</Text>
          <Text className="font-j4 text-row text-muted">{subtitle}</Text>
        </View>
        <RowChevron tone="accent" />
      </View>
    </Pressable>
  );
}
