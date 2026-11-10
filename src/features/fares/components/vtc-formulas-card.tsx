import * as WebBrowser from 'expo-web-browser';
import { Text, View } from 'react-native';

import { Card } from '@/components/card';
import { Icon } from '@/components/icon';
import { ListRow } from '@/components/list-row';
import { ProviderLogo } from '@/features/fares/components/provider-logo';
import { VTC_FORMULAS } from '@/features/fares/config/tariffs';

export function VtcFormulasCard() {
  return (
    <Card>
      <View className="flex-row items-center gap-3">
        <View className="h-11 w-11 items-center justify-center rounded-xl bg-teal-soft">
          <Icon name="stats-chart" size={20} tone="pin" />
        </View>
        <View className="flex-1 gap-0.5">
          <Text className="font-j7 text-base text-foreground">Fórmulas de cálculo</Text>
          <Text className="font-j4 text-row text-muted">Así estima MálagaMove el precio de las apps</Text>
        </View>
      </View>
      <View>
        {VTC_FORMULAS.map((f, i) => (
          <View key={f.id}>
            {i > 0 ? <View className="h-px bg-border" /> : null}
            <ListRow
              title={f.name}
              subtitle={`Precio estimado = ${f.formulaLabel}`}
              left={<ProviderLogo provider={f.id} />}
              onPress={() => WebBrowser.openBrowserAsync(f.url)}
            />
          </View>
        ))}
      </View>
      <View className="flex-row gap-2">
        <Icon name="alert-circle-outline" size={15} tone="muted" />
        <Text className="flex-1 font-j4 text-mini text-muted">
          Uber, Cabify y Bolt no publican una tarifa fija para Málaga: fijan el precio en su app al pedir, con precios
          dinámicos. Estas fórmulas son aproximaciones para comparar, no tarifas oficiales.
        </Text>
      </View>
    </Card>
  );
}
