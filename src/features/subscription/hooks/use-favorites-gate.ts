// @newly-subscriptions
import { FREE_FAVORITES_LIMIT } from '@/features/subscription/config/revenuecat';
import { useSubscription } from '@/features/subscription/hooks/use-subscription';
import { useFavoritesStore } from '@/features/favorites/store/favorites-store';

/**
 * Free users keep up to FREE_FAVORITES_LIMIT favourites; one more opens the paywall, and the
 * action runs if they buy. When the store can't be reached, nobody is locked out.
 */
export function useFavoritesGate() {
  const sub = useSubscription();
  const count = useFavoritesStore((s) => s.favorites.length);
  const locked = sub.ready && !sub.isPro && count >= FREE_FAVORITES_LIMIT;

  const guard = async (action: () => void) => {
    if (!locked) {
      action();
      return;
    }
    if (await sub.showPaywall()) action();
  };

  const remaining = sub.isPro ? null : Math.max(0, FREE_FAVORITES_LIMIT - count);

  return { locked, guard, limit: FREE_FAVORITES_LIMIT, remaining };
}
