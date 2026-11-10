import type { ProviderID } from '@/features/fares/types/fares';
import { Image } from '@/components/image';

const LOGOS = {
  uber: require('@/assets/images/app/logo-uber.png'),
  cabify: require('@/assets/images/app/logo-cabify.png'),
  bolt: require('@/assets/images/app/logo-bolt.png'),
  taxi: require('@/assets/images/app/logo-taxi.png'),
} as const;

const SIZES = { sm: 'h-8 w-8 rounded-lg', md: 'h-11 w-11 rounded-xl' } as const;

export function ProviderLogo({ provider, size = 'md' }: { provider: ProviderID; size?: keyof typeof SIZES }) {
  return (
    <Image
      source={LOGOS[provider]}
      className={SIZES[size]}
      contentFit="cover"
      accessibilityLabel={provider}
    />
  );
}
