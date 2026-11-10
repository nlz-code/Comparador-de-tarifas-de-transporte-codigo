import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Card } from '@/components/card';
import { Icon } from '@/components/icon';
import { PillButton } from '@/components/pill-button';
import { Pressable } from '@/components/pressable';
import { Sheet } from '@/components/sheet';
import { TAXI_SUPPLEMENTS } from '@/features/fares/config/tariffs';
import { formatEuro } from '@/features/fares/utils/format';

interface PassengersSheetProps {
  visible: boolean;
  passengers: number;
  luggage: number;
  onClose: () => void;
  onSave: (passengers: number, luggage: number) => void;
}

interface StepperProps {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}

function Stepper({ label, hint, value, min, max, onChange }: StepperProps) {
  return (
    <View className="flex-row items-center gap-3">
      <View className="flex-1 gap-0.5">
        <Text className="font-j7 text-sm text-foreground">{label}</Text>
        <Text className="font-j4 text-mini text-muted">{hint}</Text>
      </View>
      <Pressable onPress={() => onChange(value - 1)} isDisabled={value <= min} accessibilityLabel={`Menos ${label.toLowerCase()}`}>
        <View className={`h-9 w-9 items-center justify-center rounded-full bg-sky ${value <= min ? 'opacity-40' : ''}`}>
          <Icon name="remove" size={18} tone="accent" />
        </View>
      </Pressable>
      <Text className="w-8 text-center font-j8 text-price text-foreground">{value}</Text>
      <Pressable onPress={() => onChange(value + 1)} isDisabled={value >= max} accessibilityLabel={`Más ${label.toLowerCase()}`}>
        <View className={`h-9 w-9 items-center justify-center rounded-full bg-sky ${value >= max ? 'opacity-40' : ''}`}>
          <Icon name="add" size={18} tone="accent" />
        </View>
      </Pressable>
    </View>
  );
}

export function PassengersSheet({ visible, passengers, luggage, onClose, onSave }: PassengersSheetProps) {
  const [p, setP] = useState(passengers);
  const [l, setL] = useState(luggage);

  return (
    <Sheet visible={visible} title="Pasajeros y equipaje" onClose={onClose}>
      <ScrollView contentContainerClassName="px-5 pb-safe-offset-4 gap-5">
        <Card>
          <Stepper label="Pasajeros" hint="De 1 a 8 personas" value={p} min={1} max={8} onChange={setP} />
          <View className="h-px bg-border" />
          <Stepper label="Maletas" hint="Equipaje que va en el maletero" value={l} min={0} max={6} onChange={setL} />
        </Card>
        <View className="flex-row gap-2">
          <Icon name="information-circle-outline" size={15} tone="accent" />
          <Text className="flex-1 font-j4 text-mini text-muted">
            En el taxi cada maleta suma {formatEuro(TAXI_SUPPLEMENTS.perSuitcase)} y desde 5 pasajeros se aplica el
            suplemento de vehículo grande ({formatEuro(TAXI_SUPPLEMENTS.largeVehicle)}). En Uber, Cabify y Bolt los grupos
            grandes necesitan un vehículo XL, que cuesta más que la estimación mostrada.
          </Text>
        </View>
        <PillButton
          label="Guardar"
          onPress={() => {
            onSave(p, l);
            onClose();
          }}
        />
      </ScrollView>
    </Sheet>
  );
}
