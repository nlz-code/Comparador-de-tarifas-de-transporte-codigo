import type { ReactNode } from 'react';
import { Modal, Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Pressable } from '@/components/pressable';

interface SheetProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

/** A page sheet in the app's own look: Jakarta title, round close button, white page. */
export function Sheet({ visible, title, onClose, children }: SheetProps) {
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View className="flex-1 bg-background pt-4 android:pt-safe-offset-4">
        <View className="flex-row items-center justify-between px-5 pb-3">
          <Text className="font-j8 text-xl text-foreground">{title}</Text>
          <Pressable onPress={onClose} accessibilityLabel="Cerrar" hitSlop={8}>
            <View className="h-8 w-8 items-center justify-center rounded-full bg-sky">
              <Icon name="close" size={18} tone="accent" />
            </View>
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
}
