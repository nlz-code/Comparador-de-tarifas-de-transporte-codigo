import DateTimePicker, { DateTimePickerAndroid, type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, ScrollView, Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { PillButton } from '@/components/pill-button';
import { Pressable } from '@/components/pressable';
import { Segmented } from '@/components/segmented';
import { Sheet } from '@/components/sheet';
import { formatLongDate, formatTime } from '@/features/fares/utils/format';
import { resolveTaxiTariff } from '@/features/fares/utils/taxi-schedule';
import type { TripWhen } from '@/features/route/types/route';

interface WhenSheetProps {
  visible: boolean;
  value: TripWhen;
  originIsAirport: boolean;
  onClose: () => void;
  onSave: (w: TripWhen) => void;
}

function nextQuarter(): Date {
  const d = new Date();
  d.setMinutes(Math.ceil(d.getMinutes() / 15) * 15 + 15, 0, 0);
  return d;
}

export function WhenSheet({ visible, value, originIsAirport, onClose, onSave }: WhenSheetProps) {
  const [mode, setMode] = useState<'now' | 'later'>(value === 'now' ? 'now' : 'later');
  const [date, setDate] = useState<Date>(value === 'now' ? nextQuarter() : new Date(value));
  const [error, setError] = useState<string | null>(null);

  const shown = mode === 'now' ? new Date() : date;
  const tariff = resolveTaxiTariff(shown, originIsAirport);

  const onChange = (_e: DateTimePickerEvent, d?: Date) => {
    if (!d) return;
    setDate(d);
    setError(null);
  };

  const openAndroid = (pickerMode: 'date' | 'time') => {
    DateTimePickerAndroid.open({ value: date, mode: pickerMode, is24Hour: true, onChange });
  };

  const save = () => {
    if (mode === 'now') {
      onSave('now');
      onClose();
      return;
    }
    if (date.getTime() < Date.now() - 5 * 60 * 1000) {
      setError('Elige una fecha y hora a partir de ahora.');
      return;
    }
    onSave(date.toISOString());
    onClose();
  };

  return (
    <Sheet visible={visible} title="¿Cuándo sales?" onClose={onClose}>
      <ScrollView contentContainerClassName="px-5 pb-safe-offset-4 gap-5">
        <Segmented values={['now', 'later'] as const} labels={['Ahora', 'Programar']} value={mode} onChange={setMode} />

        {mode === 'later' ? (
          Platform.OS === 'ios' ? (
            <View className="items-center">
              <DateTimePicker
                value={date}
                mode="datetime"
                display="inline"
                locale="es-ES"
                minimumDate={new Date()}
                onChange={onChange}
              />
            </View>
          ) : (
            <View className="flex-row gap-3">
              <Pressable onPress={() => openAndroid('date')} accessibilityRole="button" accessibilityLabel="Elegir fecha">
                <View className="flex-row items-center gap-2 rounded-xl bg-sky px-4 py-3">
                  <Icon name="calendar-outline" size={16} tone="accent" />
                  <Text className="font-j6 text-row text-accent">{formatLongDate(date)}</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => openAndroid('time')} accessibilityRole="button" accessibilityLabel="Elegir hora">
                <View className="flex-row items-center gap-2 rounded-xl bg-sky px-4 py-3">
                  <Icon name="time-outline" size={16} tone="accent" />
                  <Text className="font-j6 text-row text-accent">{formatTime(date)}</Text>
                </View>
              </Pressable>
            </View>
          )
        ) : null}

        <View className="gap-1 rounded-2xl bg-mint-soft px-4 py-3">
          <Text className="font-j4 text-mini text-muted">Taxi a esta hora</Text>
          <Text className="font-j7 text-sm text-mint">{tariff.label}</Text>
          <Text className="font-j4 text-row text-muted">{tariff.reason}</Text>
        </View>

        {error ? <Text className="font-j5 text-row text-danger">{error}</Text> : null}
        <PillButton label="Guardar" onPress={save} />
      </ScrollView>
    </Sheet>
  );
}
