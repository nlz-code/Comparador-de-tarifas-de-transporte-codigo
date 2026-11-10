import { Text, View } from 'react-native';

import { Icon, type IconTone } from '@/components/icon';
import { Pressable } from '@/components/pressable';

interface PillButtonProps {
  label: string;
  onPress: () => void;
  /** solid = blue "Pedir"; soft = light-blue "Ver detalles". */
  variant?: 'solid' | 'soft';
  icon?: 'add' | 'call-outline' | 'open-outline' | 'bookmark-outline' | 'checkmark';
  wide?: boolean;
  disabled?: boolean;
}

export function PillButton({ label, onPress, variant = 'solid', icon, wide, disabled }: PillButtonProps) {
  const solid = variant === 'solid';
  const tone: IconTone = solid ? 'white' : 'accent';
  return (
    <Pressable onPress={onPress} isDisabled={disabled} accessibilityRole="button" accessibilityLabel={label}>
      <View
        className={`flex-row items-center justify-center gap-1.5 rounded-full py-2.5 ${wide ? 'px-4' : 'px-6'} ${solid ? 'bg-accent' : 'bg-sky'} ${disabled ? 'opacity-50' : ''}`}>
        {icon ? <Icon name={icon} size={15} tone={tone} /> : null}
        <Text className={`font-j7 text-row ${solid ? 'text-accent-foreground' : 'text-accent'}`}>{label}</Text>
      </View>
    </Pressable>
  );
}
