import type { ReactNode } from 'react';
import { Modal, Platform, Pressable as RNPressable, Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Pressable } from '@/components/pressable';

interface SheetProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

function SheetBody({ title, onClose, children }: Omit<SheetProps, 'visible'>) {
  return (
    <>
      <View className="flex-row items-center justify-between px-5 pb-3">
        <Text className="font-j8 text-xl text-foreground">{title}</Text>
        <Pressable onPress={onClose} accessibilityLabel="Cerrar" hitSlop={8}>
          <View className="h-8 w-8 items-center justify-center rounded-full bg-sky">
            <Icon name="close" size={18} tone="accent" />
          </View>
        </Pressable>
      </View>
      {children}
    </>
  );
}

/**
 * A page sheet in the app's own look: Jakarta title, round close button, white page.
 * iOS uses the native page sheet; Android has none, so it draws the same rounded
 * sheet over a dimmed backdrop instead of a full-screen page.
 */
export function Sheet({ visible, title, onClose, children }: SheetProps) {
  if (Platform.OS === 'ios') {
    return (
      <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
        <View className="flex-1 bg-background pt-4">
          <SheetBody title={title} onClose={onClose}>
            {children}
          </SheetBody>
        </View>
      </Modal>
    );
  }
  return (
    <Modal visible={visible} animationType="slide" transparent statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <View className="flex-1 bg-black/40 pt-safe-offset-12">
        <RNPressable className="absolute inset-0" onPress={onClose} accessibilityLabel="Cerrar" />
        <View className="flex-1 rounded-t-3xl bg-background pb-safe">
          <View className="items-center py-2.5">
            <View className="h-1 w-10 rounded-full bg-border" />
          </View>
          <SheetBody title={title} onClose={onClose}>
            {children}
          </SheetBody>
        </View>
      </View>
    </Modal>
  );
}
