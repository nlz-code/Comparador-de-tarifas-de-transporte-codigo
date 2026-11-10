// @newly-subscriptions
import { create } from 'zustand';

import { PRO_ENTITLEMENT_ID } from '@/features/subscription/config/revenuecat';
import type { SubscriptionState } from '@/features/subscription/types/subscription';

/**
 * Not persisted on purpose: RevenueCat caches CustomerInfo on the device itself, so the
 * SDK stays the single source of truth for who is Pro.
 */
export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  status: 'loading',
  isPro: false,
  customerInfo: null,
  offering: null,
  error: null,
  applyCustomerInfo: (info) =>
    set({ customerInfo: info, isPro: info.entitlements.active[PRO_ENTITLEMENT_ID] !== undefined }),
  setOffering: (offering) => set({ offering }),
  setStatus: (status, error = null) => set({ status, error }),
}));
