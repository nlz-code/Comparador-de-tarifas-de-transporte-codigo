import { useEffect } from 'react';
import { Text } from 'react-native';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { durations, timing } from '@/lib/motion';

/** «MÁS BARATO»: stamps in (scale down from 1.35 + fade) once the cards have settled. */
export function CheapestTag({ delay }: { delay: number }) {
  const reduced = useReducedMotion();
  const progress = useSharedValue(reduced ? 1 : 0);

  useEffect(() => {
    if (reduced) return;
    progress.set(withDelay(delay, withTiming(1, timing.enter)));
  }, [delay, progress, reduced]);

  const style = useAnimatedStyle(() => ({
    opacity: progress.get(),
    transform: [{ scale: 1.35 - 0.35 * progress.get() }, { rotate: `${-6 + 6 * progress.get()}deg` }],
  }));

  return (
    <Animated.View style={style} className="self-start rounded-full bg-mint px-2 py-0.5">
      <Text className="font-j8 text-tiny tracking-wide text-accent-foreground">MÁS BARATO</Text>
    </Animated.View>
  );
}

export const CHEAPEST_TAG_DELAY = durations.gentle + 4 * 40;
