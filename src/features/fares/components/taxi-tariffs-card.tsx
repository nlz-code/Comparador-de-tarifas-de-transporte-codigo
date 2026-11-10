import * as WebBrowser from 'expo-web-browser';
import { Text, View } from 'react-native';

import { Card } from '@/components/card';
import { Icon } from '@/components/icon';
import { Pressable } from '@/components/pressable';
import { ProviderLogo } from '@/features/fares/components/provider-logo';
import { TAXI_AIRPORT_ORIGIN, TAXI_RATES, TAXI_SOURCE_URL, TAXI_SUPPLEMENTS } from '@/features/fares/config/tariffs';
import { formatEuro } from '@/features/fares/utils/format';
import { resolveTaxiTariff } from '@/features/fares/utils/taxi-schedule';

type RowIcon = 'flag' | 'navigate' | 'speedometer-outline' | 'hourglass-outline' | 'airplane' | 'briefcase' | 'moon' | 'people';

function Row({ icon, label, value }: { icon: RowIcon; label: string; value: string }) {
  return (
    <View className="flex-row items-center gap-3 py-2">
      <Icon name={icon} size={15} tone="foreground" />
      <Text className="flex-1 font-j4 text-row text-foreground">{label}</Text>
      <Text className="font-j7 text-row text-foreground">{value}</Text>
    </View>
  );
}

function Divider() {
  return <View className="h-px bg-border" />;
}

const SCHEDULE = [
  { id: 'T1', when: 'Laborables de lunes a viernes, de 6 a 22 h' },
  { id: 'T2', when: 'Sábados, domingos y festivos de 6 a 22 h; laborables de 22 a 6 h' },
  { id: 'T3', when: 'Noches de viernes, sábados, vísperas y festivos (22–6 h), Semana Santa y Feria (20–6 h), 24 y 31 dic desde 22 h' },
] as const;

export function TaxiTariffsCard() {
  const now = resolveTaxiTariff(new Date(), false);
  const t1 = TAXI_RATES.T1;
  return (
    <>
      <Card>
        <View className="flex-row items-center gap-3">
          <ProviderLogo provider="taxi" />
          <View className="flex-1 gap-0.5">
            <Text className="font-j7 text-base text-foreground">Taxi de Málaga</Text>
            <Text className="font-j4 text-row text-muted">Tarifas urbanas oficiales vigentes</Text>
          </View>
          <Pressable onPress={() => WebBrowser.openBrowserAsync(TAXI_SOURCE_URL)} accessibilityRole="link" accessibilityLabel="Abrir fuente oficial">
            <View className="flex-row items-center gap-1 rounded-full bg-sky px-3 py-1.5">
              <Icon name="information-circle" size={14} tone="accent" />
              <Text className="font-j6 text-mini text-accent">Fuente oficial</Text>
            </View>
          </Pressable>
        </View>

        <View className="flex-row items-center gap-2 rounded-xl bg-mint-soft px-3 py-2.5">
          <Icon name="time" size={16} tone="mint" />
          <Text className="flex-1 font-j5 text-row text-foreground">
            Ahora se aplica <Text className="font-j8 text-mint">{now.label}</Text> · {now.reason}
          </Text>
        </View>

        <View>
          <Row icon="flag" label="Bajada de bandera (tarifa 1)" value={formatEuro(t1.flagFall)} />
          <Divider />
          <Row icon="navigate" label="Precio por kilómetro (tarifa 1)" value={`${formatEuro(t1.perKm)} / km`} />
          <Divider />
          <Row icon="speedometer-outline" label="Carrera mínima (tarifa 1)" value={formatEuro(t1.minimumFare)} />
          <Divider />
          <Row icon="hourglass-outline" label="Espera (tarifa 1)" value={`${formatEuro(t1.waitingPerHour)} / h`} />
          <Divider />
          <Row icon="airplane" label="Suplemento con destino aeropuerto" value={formatEuro(TAXI_SUPPLEMENTS.airportDestination)} />
          <Divider />
          <Row icon="moon" label="Suplemento nocturno (0–6 h, tarifas 2 y 3)" value={formatEuro(TAXI_SUPPLEMENTS.night)} />
          <Divider />
          <Row icon="briefcase" label="Por cada maleta" value={formatEuro(TAXI_SUPPLEMENTS.perSuitcase)} />
          <Divider />
          <Row icon="people" label="Vehículo grande (desde 5 pasajeros)" value={formatEuro(TAXI_SUPPLEMENTS.largeVehicle)} />
        </View>

        <View className="flex-row items-center gap-3 rounded-xl bg-sky px-3 py-3">
          <View className="h-9 w-9 items-center justify-center rounded-full bg-accent">
            <Text className="font-j8 text-sm text-accent-foreground">%</Text>
          </View>
          <View className="flex-1 gap-0.5">
            <Text className="font-j7 text-row text-foreground">Los precios incluyen IVA</Text>
            <Text className="font-j4 text-mini text-muted">Ayuntamiento de Málaga, Área de Movilidad. Revisado el 10 nov 2026.</Text>
          </View>
        </View>
      </Card>

      <Card>
        <Text className="font-j8 text-xl text-foreground">Las tres tarifas</Text>
        {SCHEDULE.map((s) => {
          const r = TAXI_RATES[s.id];
          const active = now.id === s.id;
          return (
            <View key={s.id} className={`gap-1 rounded-xl px-3 py-2.5 ${active ? 'bg-mint-soft' : 'bg-surface-secondary'}`}>
              <View className="flex-row items-center justify-between">
                <Text className={`font-j7 text-sm ${active ? 'text-mint' : 'text-foreground'}`}>
                  Tarifa {s.id.slice(1)}
                  {active ? ' · ahora' : ''}
                </Text>
                <Text className="font-j6 text-row text-foreground">
                  {formatEuro(r.flagFall)} + {formatEuro(r.perKm)}/km
                </Text>
              </View>
              <Text className="font-j4 text-mini text-muted">{s.when}</Text>
              <Text className="font-j4 text-mini text-muted">
                Mínimo {formatEuro(r.minimumFare)} · Espera {formatEuro(r.waitingPerHour)}/h
              </Text>
            </View>
          );
        })}
        <View className="gap-1">
          <Text className="font-j7 text-sm text-foreground">Salidas desde el aeropuerto</Text>
          <Text className="font-j4 text-row text-muted">
            Se aplican las tarifas 4, 5 y 9 (iguales a la 1, 2 y 3) con una carrera mínima de{' '}
            {formatEuro(TAXI_AIRPORT_ORIGIN.T1.minimumFare)}, {formatEuro(TAXI_AIRPORT_ORIGIN.T2.minimumFare)} y{' '}
            {formatEuro(TAXI_AIRPORT_ORIGIN.T3.minimumFare)}. En ese caso no se cobra el suplemento de aeropuerto.
          </Text>
        </View>
      </Card>
    </>
  );
}
