import { useState } from 'react';
import { ActivityIndicator, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Card } from '@/components/card';
import { Icon } from '@/components/icon';
import { ListRow } from '@/components/list-row';
import { PillButton } from '@/components/pill-button';
import { Pressable } from '@/components/pressable';
import { Sheet } from '@/components/sheet';
import type { Favorite, FavoriteCategory } from '@/features/favorites/types/favorites';
import { CATEGORIES, CATEGORY_ORDER } from '@/features/favorites/utils/categories';
import { PlacePickerSheet } from '@/features/route/components/place-picker-sheet';
import type { Place } from '@/features/route/types/route';
import { fetchRoute } from '@/features/route/utils/osrm';
import { shortName } from '@/features/route/utils/places';

interface AddFavoriteSheetProps {
  visible: boolean;
  initialOrigin: Place | null;
  onClose: () => void;
  onSave: (f: Omit<Favorite, 'id' | 'createdAt'>) => void;
}

export function AddFavoriteSheet({ visible, initialOrigin, onClose, onSave }: AddFavoriteSheetProps) {
  const [category, setCategory] = useState<FavoriteCategory>('casa');
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState<Place | null>(initialOrigin);
  const [destination, setDestination] = useState<Place | null>(null);
  const [picking, setPicking] = useState<'origin' | 'destination' | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async () => {
    if (!origin || !destination) {
      setError('Elige el origen y el destino.');
      return;
    }
    if (origin.id === destination.id) {
      setError('El origen y el destino no pueden ser el mismo lugar.');
      return;
    }
    setError(null);
    setSaving(true);
    try {
      const route = await fetchRoute(origin, destination);
      onSave({
        category,
        name: name.trim() || `${shortName(origin)} → ${shortName(destination)}`,
        origin,
        destination,
        km: route.km,
        minutes: route.minutes,
      });
      onClose();
    } catch (e) {
      setError(e instanceof Error && e.message.startsWith('No ') ? e.message : 'No se pudo calcular la ruta. Comprueba tu conexión.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet visible={visible} title="Nueva ruta favorita" onClose={onClose}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" contentContainerClassName="px-5 pb-safe-offset-4 gap-5" bottomOffset={24}>
        <View className="gap-2">
          <Text className="font-j7 text-base text-foreground">Tipo</Text>
          <View className="flex-row flex-wrap gap-2">
            {CATEGORY_ORDER.map((c) => {
              const meta = CATEGORIES[c];
              const active = c === category;
              return (
                <Pressable key={c} onPress={() => setCategory(c)} accessibilityRole="button" accessibilityState={{ selected: active }} accessibilityLabel={meta.label}>
                  <View className={`flex-row items-center gap-1.5 rounded-full px-3 py-2 ${active ? 'bg-accent' : meta.bg}`}>
                    <Icon name={meta.icon} size={14} tone={active ? 'white' : meta.tone} />
                    <Text className={`font-j6 text-row ${active ? 'text-accent-foreground' : 'text-foreground'}`}>{meta.label}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View className="gap-2">
          <Text className="font-j7 text-base text-foreground">Trayecto</Text>
          <Card list>
            <ListRow
              overline="Desde"
              title={origin ? origin.name : 'Elige el origen'}
              left={<Icon name="radio-button-on" size={18} tone="accent" />}
              onPress={() => setPicking('origin')}
            />
            <ListRow
              overline="Hasta"
              title={destination ? destination.name : 'Elige el destino'}
              left={<Icon name="location" size={18} tone="pin" />}
              onPress={() => setPicking('destination')}
            />
          </Card>
        </View>

        <View className="gap-2">
          <Text className="font-j7 text-base text-foreground">Nombre (opcional)</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            maxLength={60}
            placeholder={origin && destination ? `${shortName(origin)} → ${shortName(destination)}` : 'Casa → Trabajo'}
            placeholderTextColorClassName="accent-muted"
            className="rounded-xl bg-field-background px-3 py-3 font-j5 text-sm leading-none text-foreground"
            accessibilityLabel="Nombre de la ruta"
          />
        </View>

        {error ? <Text className="font-j5 text-row text-danger">{error}</Text> : null}
        {saving ? (
          <View className="flex-row items-center justify-center gap-2">
            <ActivityIndicator size="small" colorClassName="accent-accent" />
            <Text className="font-j5 text-row text-muted">Calculando la ruta…</Text>
          </View>
        ) : (
          <PillButton label="Guardar ruta" icon="checkmark" onPress={() => void save()} />
        )}
      </KeyboardAwareScrollView>

      {picking ? (
        <PlacePickerSheet
          visible
          title={picking === 'origin' ? '¿Desde dónde?' : '¿A dónde?'}
          onClose={() => setPicking(null)}
          onSelect={(p) => {
            setError(null);
            if (picking === 'origin') {
              setOrigin(p);
              return;
            }
            setDestination(p);
          }}
        />
      ) : null}
    </Sheet>
  );
}
