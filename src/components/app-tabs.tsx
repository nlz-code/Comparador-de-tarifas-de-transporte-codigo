import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useThemeColor } from 'heroui-native';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const accent = useThemeColor('accent');

  return (
    <NativeTabs backgroundColor={Colors.light.background} tintColor={accent}>
      <NativeTabs.Trigger name="index" disableAutomaticContentInsets>
        <NativeTabs.Trigger.Label>Inicio</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="point.3.connected.trianglepath.dotted" md="route" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="favoritos" disableAutomaticContentInsets>
        <NativeTabs.Trigger.Label>Favoritos</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="heart.fill" md="favorite" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="historial" disableAutomaticContentInsets>
        <NativeTabs.Trigger.Label>Historial</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="clock.arrow.circlepath" md="history" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="tarifas" disableAutomaticContentInsets>
        <NativeTabs.Trigger.Label>Tarifas</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="tag.fill" md="sell" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
