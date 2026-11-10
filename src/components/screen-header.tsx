import { Text, View } from 'react-native';

import { formatShortDate } from '@/features/fares/utils/format';
import { Icon } from '@/components/icon';
import { Image } from '@/components/image';

interface ScreenHeaderProps {
  title: string;
  subtitle: string;
}

/** Date chip + large title + subtitle, with the Málaga mascot on the right. */
export function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
  return (
    <View className="flex-row items-end">
      <View className="flex-1 gap-2 py-2">
        <View className="flex-row items-center gap-1.5 self-start rounded-full bg-sky px-3 py-1.5">
          <Icon name="git-merge-outline" size={13} tone="accent" />
          <Text className="font-j5 text-row text-muted">Hoy · {formatShortDate(new Date())}</Text>
        </View>
        <View className="gap-0.5">
          <Text className="font-j8 text-title text-foreground">{title}</Text>
          <Text className="font-j5 text-base text-muted">{subtitle}</Text>
        </View>
      </View>
      <Image
        source={require('@/assets/images/app/mascot-header.png')}
        className="h-24 w-36 -mr-3"
        contentFit="contain"
        accessibilityIgnoresInvertColors
      />
    </View>
  );
}
