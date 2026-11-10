import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Card } from '@/components/card';
import { Icon } from '@/components/icon';
import { ListRow } from '@/components/list-row';
import { PillButton } from '@/components/pill-button';
import { Sheet } from '@/components/sheet';
import type { ManualRoute, Place } from '@/features/route/types/route';
import { searchPlaces } from '@/features/route/utils/photon';
import { isAirport, POPULAR_PLACES } from '@/features/route/utils/places';

interface PlacePickerSheetProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  onSelect: (place: Place) => void;
  /** When given, the sheet offers typing km + minutes by hand. */
  onManual?: (m: ManualRoute) => void;
}

type SearchState = { status: 'idle' | 'loading' | 'done' | 'error'; results: Place[] };

function parseNumber(s: string): number {
  return Number(s.replace(',', '.').trim());
}

export function PlacePickerSheet({ visible, title, onClose, onSelect, onManual }: PlacePickerSheetProps) {
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState<SearchState>({ status: 'idle', results: [] });
  const [km, setKm] = useState('');
  const [minutes, setMinutes] = useState('');
  const [manualError, setManualError] = useState<string | null>(null);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 3) {
      setSearch({ status: 'idle', results: [] });
      return;
    }
    const controller = new AbortController();
    setSearch((s) => ({ ...s, status: 'loading' }));
    const timer = setTimeout(() => {
      searchPlaces(q, controller.signal)
        .then((results) => setSearch({ status: 'done', results }))
        .catch(() => {
          if (controller.signal.aborted) return;
          setSearch({ status: 'error', results: [] });
        });
    }, 350);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const close = () => {
    setQuery('');
    setManualError(null);
    onClose();
  };

  const pick = (p: Place) => {
    onSelect(p);
    close();
  };

  const submitManual = () => {
    if (!onManual) return;
    const k = parseNumber(km);
    const m = parseNumber(minutes);
    if (!Number.isFinite(k) || k < 0.1 || k > 200) {
      setManualError('Introduce una distancia entre 0,1 y 200 km.');
      return;
    }
    if (!Number.isFinite(m) || m < 1 || m > 300) {
      setManualError('Introduce una duración entre 1 y 300 minutos.');
      return;
    }
    onManual({ km: Math.round(k * 10) / 10, minutes: Math.round(m) });
    close();
  };

  const showPopular = query.trim().length < 3;
  const list = showPopular ? POPULAR_PLACES : search.results;

  return (
    <Sheet visible={visible} title={title} onClose={close}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="px-5 pb-safe-offset-4 gap-5"
        bottomOffset={24}>
        <View className="flex-row items-center gap-2 rounded-xl bg-field-background px-3">
          <Icon name="search" size={16} tone="muted" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Busca una calle o un lugar en Málaga"
            placeholderTextColorClassName="accent-muted"
            className="flex-1 py-3 font-j5 text-sm leading-none text-foreground"
            autoFocus
            autoCorrect={false}
            returnKeyType="search"
            accessibilityLabel="Buscar dirección"
          />
          {search.status === 'loading' ? <ActivityIndicator size="small" colorClassName="accent-accent" /> : null}
        </View>

        <View className="gap-2">
          <Text className="font-j7 text-base text-foreground">{showPopular ? 'Lugares populares' : 'Resultados en Málaga'}</Text>
          {search.status === 'error' && !showPopular ? (
            <Text className="font-j4 text-row text-danger">
              No se pudo buscar. Comprueba tu conexión y vuelve a intentarlo.
            </Text>
          ) : null}
          {search.status === 'done' && list.length === 0 && !showPopular ? (
            <Text className="font-j4 text-row text-muted">
              Sin resultados en Málaga para «{query.trim()}». Prueba con el nombre de la calle.
            </Text>
          ) : null}
          {list.length > 0 ? (
            <Card list>
              {list.map((p) => (
                <ListRow
                  key={p.id}
                  title={p.name}
                  subtitle={p.address === p.locality ? p.locality : `${p.address} · ${p.locality}`}
                  left={
                    <View className="h-9 w-9 items-center justify-center rounded-full bg-sky">
                      <Icon name={isAirport(p) ? 'airplane' : 'location'} size={16} tone="accent" />
                    </View>
                  }
                  onPress={() => pick(p)}
                />
              ))}
            </Card>
          ) : null}
          <Text className="font-j4 text-tiny text-muted">Direcciones: © OpenStreetMap (Photon)</Text>
        </View>

        {onManual ? (
          <View className="gap-2">
            <Text className="font-j7 text-base text-foreground">Introducir km y minutos</Text>
            <Text className="font-j4 text-row text-muted">
              Si ya conoces la distancia y la duración del trayecto, escríbelas y calcularemos los precios con ellas.
            </Text>
            <View className="flex-row gap-3">
              <View className="flex-1 gap-1">
                <Text className="font-j5 text-mini text-muted">Distancia (km)</Text>
                <TextInput
                  value={km}
                  onChangeText={setKm}
                  keyboardType="decimal-pad"
                  placeholder="12,5"
                  placeholderTextColorClassName="accent-muted"
                  className="rounded-xl bg-field-background px-3 py-3 font-j6 text-sm leading-none text-foreground"
                  accessibilityLabel="Distancia en kilómetros"
                />
              </View>
              <View className="flex-1 gap-1">
                <Text className="font-j5 text-mini text-muted">Duración (min)</Text>
                <TextInput
                  value={minutes}
                  onChangeText={setMinutes}
                  keyboardType="number-pad"
                  placeholder="18"
                  placeholderTextColorClassName="accent-muted"
                  className="rounded-xl bg-field-background px-3 py-3 font-j6 text-sm leading-none text-foreground"
                  accessibilityLabel="Duración en minutos"
                />
              </View>
            </View>
            {manualError ? <Text className="font-j5 text-row text-danger">{manualError}</Text> : null}
            <PillButton label="Usar estos datos" onPress={submitManual} />
          </View>
        ) : null}
      </KeyboardAwareScrollView>
    </Sheet>
  );
}
