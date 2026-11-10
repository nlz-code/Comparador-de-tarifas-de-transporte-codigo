// @newly-subscriptions
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const extra = (Constants.expoConfig?.extra ?? {}) as Record<string, unknown>;
const read = (value: unknown) => (typeof value === 'string' ? value : '');

/** The entitlement that unlocks MálagaMove Pro, as named in RevenueCat. */
export const PRO_ENTITLEMENT_ID = read(extra.revenueCatEntitlementId) || 'málagamove_pro';

/** Favourites a free user can keep; Pro removes the limit. */
export const FREE_FAVORITES_LIMIT = 3;

/**
 * Development builds (the preview) buy in RevenueCat's Test Store; a release build must use
 * its own store's key, because RevenueCat closes a release build configured with a test key.
 * An empty string means there is no key for this build, and subscriptions stay off.
 */
export function revenueCatApiKey(): string {
  if (Platform.OS === 'web') return '';
  const testKey = read(extra.revenueCatTestApiKey);
  if (__DEV__ && testKey) return testKey;
  return Platform.OS === 'ios' ? read(extra.revenueCatApiKeyIos) : read(extra.revenueCatApiKeyAndroid);
}
