import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Icon } from '@/components/icon';
import { Image } from '@/components/image';
import { RowChevron } from '@/components/list-row';
import { PillButton } from '@/components/pill-button';
import { Pressable } from '@/components/pressable';
import { ScreenHeader } from '@/components/screen-header';
import { DisclaimerCard } from '@/features/fares/components/disclaimer-card';
import { TaxiTariffsCard } from '@/features/fares/components/taxi-tariffs-card';
import { VtcFormulasCard } from '@/features/fares/components/vtc-formulas-card';
import { fadeIn } from '@/lib/motion';

type Tab = 'taxi' | 'vtc';

const TABS: { id: Tab; label: string; icon: 'car' | 'phone-portrait-outline' }[] = [
  { id: 'taxi', label: 'Taxi', icon: 'car' },
  { id: 'vtc', label: 'VTC / Apps', icon: 'phone-portrait-outline' },
];

export default function TariffsScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('taxi');
  const [showVariance, setShowVariance] = useState(false);

  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="px-5 pt-safe-offset-2 pb-safe-offset-22 gap-4">
      <ScreenHeader title="Tarifas" subtitle="Precios oficiales y estimaciones" />

      <View className="flex-row gap-1 rounded-full bg-surface-secondary p-1" accessibilityRole="tablist">
        {TABS.map((t) => {
          const active = t.id === tab;
          return (
            <View key={t.id} className="flex-1">
              <Pressable onPress={() => setTab(t.id)} accessibilityRole="tab" accessibilityState={{ selected: active }} accessibilityLabel={t.label}>
                <View className={`flex-row items-center justify-center gap-2 rounded-full py-2.5 ${active ? 'bg-accent' : ''}`}>
                  <Icon name={t.icon} size={17} tone={active ? 'white' : 'foreground'} />
                  <Text className={`font-j7 text-row ${active ? 'text-accent-foreground' : 'text-foreground'}`}>{t.label}</Text>
                </View>
              </Pressable>
            </View>
          );
        })}
      </View>

      <Animated.View key={tab} entering={fadeIn} className="gap-4">
        {tab === 'taxi' ? <TaxiTariffsCard /> : <VtcFormulasCard />}
      </Animated.View>

      <Pressable onPress={() => setShowVariance((v) => !v)} accessibilityRole="button" accessibilityState={{ expanded: showVariance }} accessibilityLabel="El precio puede variar">
        <View className="gap-2 rounded-2xl bg-mint-soft px-4 py-3.5">
          <View className="flex-row items-center gap-3">
            <Icon name="leaf" size={24} tone="mint" />
            <View className="flex-1 gap-0.5">
              <Text className="font-j7 text-sm text-mint">El precio puede variar</Text>
              <Text className="font-j4 text-row text-muted">Según la demanda, el tráfico y la disponibilidad.</Text>
            </View>
            {showVariance ? <Icon name="chevron-up" size={16} tone="accent" /> : <RowChevron tone="accent" />}
          </View>
          {showVariance ? (
            <Animated.View entering={fadeIn}>
              <Text className="font-j4 text-row text-foreground">
                El taxi cobra lo que marca el taxímetro: la ruta real, los atascos (tiempo de espera) y los suplementos
                pueden cambiar el total. En Uber, Cabify y Bolt el precio lo fija cada app al pedir y sube con la demanda.
              </Text>
            </Animated.View>
          ) : null}
        </View>
      </Pressable>

      <DisclaimerCard />

      <View className="flex-row items-center gap-2 overflow-hidden rounded-2xl bg-sky pr-4">
        <Image source={require('@/assets/images/app/mascot-phone.png')} className="h-28 w-28" contentFit="contain" contentPosition="left bottom" />
        <View className="flex-1 gap-2 py-4">
          <Text className="font-j8 text-base text-foreground">Compara y ahorra</Text>
          <Text className="font-j4 text-mini text-muted">Taxi, Uber, Cabify y Bolt para tu ruta, en una sola pantalla.</Text>
          <View className="self-start">
            <PillButton label="Calcular ruta" wide onPress={() => router.navigate('/')} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
