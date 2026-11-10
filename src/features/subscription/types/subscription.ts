// @newly-subscriptions
import type { CustomerInfo, PurchasesOffering } from 'react-native-purchases';

export type SubscriptionStatus = 'loading' | 'ready' | 'unavailable' | 'error';

export interface SubscriptionState {
  status: SubscriptionStatus;
  isPro: boolean;
  customerInfo: CustomerInfo | null;
  offering: PurchasesOffering | null;
  error: string | null;
  applyCustomerInfo: (info: CustomerInfo) => void;
  setOffering: (offering: PurchasesOffering | null) => void;
  setStatus: (status: SubscriptionStatus, error?: string | null) => void;
}
