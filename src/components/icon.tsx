import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { useCSSVariable } from 'uniwind';

export type IconTone =
  | 'foreground'
  | 'muted'
  | 'accent'
  | 'mint'
  | 'pin'
  | 'heart'
  | 'violet'
  | 'danger'
  | 'white';

type IconName = ComponentProps<typeof Ionicons>['name'];

interface IconProps {
  name: IconName;
  size?: number;
  tone?: IconTone;
}

/** An Ionicon coloured from a design token. */
export function Icon({ name, size = 16, tone = 'muted' }: IconProps) {
  const color = useCSSVariable(tone === 'white' ? '--color-accent-foreground' :`--color-${tone}`);
  return <Ionicons name={name} size={size} color={typeof color === 'string' ? color : undefined} />;
}
