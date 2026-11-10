import { Ionicons } from '@expo/vector-icons';
import { PressableFeedback, useThemeColor } from 'heroui-native';
import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { Presets } from 'react-native-pulsar';

type ListRowProps = {
  title: string;
  subtitle?: string;
  /** Small label above the title, e.g. "Desde". */
  overline?: string;
  /** Leading accessory — an icon or avatar. */
  left?: ReactNode;
  /** Trailing accessory — a value or badge, shown BEFORE the chevron. */
  right?: ReactNode;
  /** Title colour class; defaults to the ink foreground. */
  titleClassName?: string;
  /** If set, the row is pressable AND shows a chevron. If omitted, there is NO chevron and
   *  the row is not pressable — so a chevron can never be a dead "fake button". */
  onPress?: () => void;
};

/** The trailing chevron, for a pressable card that is laid out by hand (the whole card is
 *  the press target). Only ever render it inside a <Pressable>. */
export function RowChevron({ tone = 'muted' }: { tone?: 'muted' | 'accent' }) {
  const color = useThemeColor(tone);
  return <Ionicons name="chevron-forward" size={16} color={color} />;
}

/**
 * A list / settings / "see details" row. The chevron is COUPLED to onPress: pass onPress
 * and the row is pressable with a trailing chevron; omit it and there's no chevron at all.
 */
export function ListRow({ title, subtitle, overline, left, right, titleClassName, onPress }: ListRowProps) {
  const muted = useThemeColor('muted');
  const body = (
    <View className="flex-row items-center gap-3 py-3" style={{ minHeight: 44 }}>
      {left}
      <View className="flex-1 gap-0.5">
        {overline ? <Text className="font-j4 text-mini text-muted">{overline}</Text> : null}
        <Text className={`font-j7 text-sm ${titleClassName ?? 'text-foreground'}`} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text className="font-j4 text-mini text-muted" numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right}
      {onPress ? <Ionicons name="chevron-forward" size={16} color={muted} /> : null}
    </View>
  );
  if (!onPress) return body;
  return (
    <PressableFeedback
      onPress={() => {
        Presets.System.selection();
        onPress();
      }}>
      {body}
    </PressableFeedback>
  );
}
