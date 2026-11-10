// @newly-subscriptions
import { Text, View } from 'react-native';

import { Card } from '@/components/card';
import { Icon } from '@/components/icon';
import { RowChevron } from '@/components/list-row';
import { Pressable } from '@/components/pressable';
import { useSubscription } from '@/features/subscription/hooks/use-subscription';

export function ProCard() {
  const sub = useSubscription();
  const title = sub.isPro ? 'MálagaMove Pro activo' : 'MálagaMove Pro';
  const subtitle = sub.isPro ? 'Gestionar suscripción' : 'Favoritos ilimitados · mensual, anual o de por vida';

  return (
    <Card>
      <Pressable
        onPress={() => void (sub.isPro ? sub.openCustomerCenter() : sub.showPaywall())}
        accessibilityRole="button"
        accessibilityLabel={sub.isPro ? 'Gestionar suscripción' : 'Ver MálagaMove Pro'}>
        <View className="flex-row items-center gap-3">
          <Icon name={sub.isPro ? 'star' : 'star-outline'} size={24} tone="accent" />
          <View className="flex-1 gap-0.5">
            <Text className="font-j7 text-sm text-foreground">{title}</Text>
            <Text className="font-j4 text-row text-muted">{subtitle}</Text>
          </View>
          <RowChevron />
        </View>
      </Pressable>
      {sub.isPro ? null : (
        <Pressable onPress={() => void sub.restore()} accessibilityRole="button" accessibilityLabel="Restaurar compras">
          <Text className="font-j7 text-mini text-accent">Restaurar compras</Text>
        </Pressable>
      )}
    </Card>
  );
}
