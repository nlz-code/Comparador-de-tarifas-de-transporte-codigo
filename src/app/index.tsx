import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Card } from '@/components/card';
import { Icon } from '@/components/icon';
import { RowChevron } from '@/components/list-row';
import { MintBanner } from '@/components/mint-banner';
import { PillButton } from '@/components/pill-button';
import { Pressable } from '@/components/pressable';
import { ScreenHeader } from '@/components/screen-header';
import { DisclaimerCard } from '@/features/fares/components/disclaimer-card';
import { ProviderCard } from '@/features/fares/components/provider-card';
import { TaxiBookingSheet } from '@/features/fares/components/taxi-booking-sheet';
import { useHomeScreen } from '@/features/fares/hooks/use-home-screen';
import { formatEuro } from '@/features/fares/utils/format';
import { PassengersSheet } from '@/features/route/components/passengers-sheet';
import { PlacePickerSheet } from '@/features/route/components/place-picker-sheet';
import { RouteCard } from '@/features/route/components/route-card';
import { WhenSheet } from '@/features/route/components/when-sheet';
import { isAirport } from '@/features/route/utils/places';
import { enterStaggered } from '@/lib/motion';

export default function HomeScreen() {
  const s = useHomeScreen();
  const { trip, route } = s;
  const close = () => s.setSheet(null);

  return (
    <>
      <ScrollView
        className="flex-1 bg-background"
        contentContainerClassName="px-5 pt-safe-offset-2 pb-safe-offset-22 gap-4">
        <ScreenHeader title="Mejor precio" subtitle="para tu ruta en Málaga" />

        <RouteCard
          origin={trip.origin}
          destination={trip.destination}
          whenLabel={s.whenLabel}
          passengersLabel={s.passengersLabel}
          onOrigin={() => s.setSheet('origin')}
          onDestination={() => s.setSheet('destination')}
          onWhen={() => s.setSheet('when')}
          onPassengers={() => s.setSheet('passengers')}
          onSwap={trip.swap}
        />

        {trip.manual ? (
          <View className="flex-row items-center gap-2 rounded-xl bg-sky px-3 py-2">
            <Icon name="create-outline" size={14} tone="accent" />
            <Text className="flex-1 font-j5 text-mini text-accent">
              Usando tus datos: {String(trip.manual.km).replace('.', ',')} km y {trip.manual.minutes} min
            </Text>
            <Pressable onPress={() => trip.setManual(null)} accessibilityRole="button" accessibilityLabel="Calcular la ruta">
              <Text className="font-j7 text-mini text-accent">Calcular ruta</Text>
            </Pressable>
          </View>
        ) : null}

        {trip.status === 'error' ? (
          <Card>
            <View className="flex-row items-start gap-3">
              <Icon name="cloud-offline-outline" size={22} tone="danger" />
              <View className="flex-1 gap-1">
                <Text className="font-j7 text-sm text-foreground">No hemos podido calcular la ruta</Text>
                <Text className="font-j4 text-row text-muted">{trip.error}</Text>
              </View>
            </View>
            <View className="flex-row gap-2">
              <PillButton label="Reintentar" onPress={() => void trip.refresh()} />
              <PillButton label="Introducir km y min" variant="soft" onPress={() => s.setSheet('destination')} />
            </View>
          </Card>
        ) : null}

        {trip.status === 'loading' && !route ? (
          <View className="items-center gap-2 py-8">
            <ActivityIndicator colorClassName="accent-accent" />
            <Text className="font-j5 text-row text-muted">Calculando la ruta…</Text>
          </View>
        ) : null}

        {trip.status === 'idle' && !route ? (
          <Card>
            <Text className="font-j7 text-sm text-foreground">Elige origen y destino</Text>
            <Text className="font-j4 text-row text-muted">
              Toca «Desde» y «Hasta» para comparar Uber, Cabify, Bolt y el taxi de Málaga.
            </Text>
          </Card>
        ) : null}

        {s.estimates.length > 0 && route ? (
          <>
            {s.maxSavings > 0.5 ? (
              <MintBanner
                title={`Ahorra hasta ${formatEuro(s.maxSavings)}`}
                subtitle="entre la opción más cara y la más barata"
                onPress={s.openTariffs}
              />
            ) : null}

            {trip.status === 'loading' ? (
              <View className="flex-row items-center justify-center gap-2">
                <ActivityIndicator size="small" colorClassName="accent-accent" />
                <Text className="font-j5 text-mini text-muted">Actualizando la ruta…</Text>
              </View>
            ) : null}

            <View className="gap-3">
              {s.estimates.map((e, i) => (
                <Animated.View key={`${trip.revision}-${e.provider}`} entering={enterStaggered(i)}>
                  <ProviderCard
                    estimate={e}
                    km={route.km}
                    minutes={route.minutes}
                    cheapest={i === 0}
                    onOrder={() => s.order(e)}
                  />
                </Animated.View>
              ))}
            </View>

            {s.canSave ? (
              <Pressable
                onPress={s.saved ? s.openFavorites : s.saveRoute}
                accessibilityRole="button"
                accessibilityLabel={s.saved ? 'Ver en favoritos' : 'Guardar ruta en favoritos'}>
                <Card>
                  <View className="flex-row items-center gap-3">
                    <Icon
                      name={s.saved ? 'heart' : isAirport(trip.destination) ? 'airplane' : 'heart-outline'}
                      size={24}
                      tone={s.saved ? 'heart' : 'accent'}
                    />
                    <View className="flex-1 gap-0.5">
                      <Text className="font-j7 text-sm text-foreground">
                        {s.saved ? 'Ruta guardada en favoritos' : isAirport(trip.destination) ? '¿Vuelves pronto?' : '¿Haces este trayecto a menudo?'}
                      </Text>
                      <Text className="font-j4 text-row text-muted">
                        {s.saved ? 'Ábrela desde Favoritos con un toque' : 'Guarda esta ruta en favoritos'}
                      </Text>
                    </View>
                    <RowChevron />
                  </View>
                </Card>
              </Pressable>
            ) : null}

            <DisclaimerCard
              footnote={
                route.source === 'manual'
                  ? 'Distancia y duración introducidas por ti.'
                  : 'Ruta: OpenStreetMap (OSRM), sin tráfico en tiempo real. Las VTC son estimaciones con fórmulas aproximadas; el taxi usa la tarifa oficial vigente.'
              }
            />
          </>
        ) : (
          <DisclaimerCard />
        )}
      </ScrollView>

      {s.sheet === 'origin' ? (
        <PlacePickerSheet visible title="¿Desde dónde?" onClose={close} onSelect={trip.setOrigin} />
      ) : null}
      {s.sheet === 'destination' ? (
        <PlacePickerSheet
          visible
          title="¿A dónde vas?"
          onClose={close}
          onSelect={trip.setDestination}
          onManual={trip.setManual}
        />
      ) : null}
      {s.sheet === 'when' ? (
        <WhenSheet
          visible
          value={trip.when}
          originIsAirport={isAirport(trip.origin)}
          onClose={close}
          onSave={trip.setWhen}
        />
      ) : null}
      {s.sheet === 'passengers' ? (
        <PassengersSheet
          visible
          passengers={trip.passengers}
          luggage={trip.luggage}
          onClose={close}
          onSave={(p, l) => {
            trip.setPassengers(p);
            trip.setLuggage(l);
          }}
        />
      ) : null}
      <TaxiBookingSheet visible={s.sheet === 'taxi'} estimate={s.taxiEstimate} onClose={close} />
    </>
  );
}
