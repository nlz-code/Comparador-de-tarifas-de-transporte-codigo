import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { ScrollView, Text, View } from 'react-native';

import { Card } from '@/components/card';
import { Icon } from '@/components/icon';
import { ListRow } from '@/components/list-row';
import { Sheet } from '@/components/sheet';
import { TAXI_CENTRALS, TAXI_INFO_URL } from '@/features/fares/config/tariffs';
import type { FareEstimate } from '@/features/fares/types/fares';
import { formatEuro } from '@/features/fares/utils/format';

interface TaxiBookingSheetProps {
  visible: boolean;
  estimate: FareEstimate | null;
  onClose: () => void;
}

/** How to get a Málaga taxi: the official radio-taxi centrals. Nothing is booked from the app. */
export function TaxiBookingSheet({ visible, estimate, onClose }: TaxiBookingSheetProps) {
  return (
    <Sheet visible={visible} title="Pedir un taxi" onClose={onClose}>
      <ScrollView contentContainerClassName="px-5 pb-safe-offset-4 gap-5">
        {estimate ? (
          <View className="gap-1 rounded-2xl bg-sky px-4 py-3">
            <Text className="font-j4 text-row text-muted">Precio estimado con {estimate.tariffLabel}</Text>
            <Text className="font-j8 text-title text-foreground">{formatEuro(estimate.total)}</Text>
            <Text className="font-j4 text-mini text-muted">{estimate.tariffReason}</Text>
          </View>
        ) : null}

        <View className="gap-2">
          <Text className="font-j7 text-base text-foreground">Centrales de radio-taxi</Text>
          <Card list>
            {TAXI_CENTRALS.map((c) => (
              <ListRow
                key={c.phone}
                title={c.name}
                subtitle={`Llamar al ${c.display}`}
                left={
                  <View className="h-9 w-9 items-center justify-center rounded-full bg-sky">
                    <Icon name="call" size={16} tone="accent" />
                  </View>
                }
                onPress={() => Linking.openURL(`tel:${c.phone}`)}
              />
            ))}
          </Card>
        </View>

        <Card list>
          <ListRow
            title="Paradas y apps oficiales"
            subtitle="Información del Ayuntamiento (visita.malaga.eu)"
            left={<Icon name="information-circle-outline" size={20} tone="accent" />}
            onPress={() => WebBrowser.openBrowserAsync(TAXI_INFO_URL)}
          />
        </Card>

        <View className="flex-row gap-2">
          <Icon name="alert-circle-outline" size={15} tone="muted" />
          <Text className="flex-1 font-j4 text-mini text-muted">
            MálagaMove no hace reservas. También puedes parar un taxi libre (luz verde) en la calle o
            tomarlo en una parada. El taxímetro marca el precio final, que puede incluir tiempo de espera.
          </Text>
        </View>
      </ScrollView>
    </Sheet>
  );
}
