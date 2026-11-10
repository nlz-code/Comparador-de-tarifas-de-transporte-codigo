// @newly-subscriptions
import { useEffect, type ReactNode } from 'react';
import Purchases, { LOG_LEVEL, type CustomerInfo } from 'react-native-purchases';

import { revenueCatApiKey } from '@/features/subscription/config/revenuecat';
import { useSubscriptionStore } from '@/features/subscription/store/subscription-store';

let configured = false;

async function loadOffering() {
  const offerings = await Purchases.getOfferings();
  useSubscriptionStore.getState().setOffering(offerings.current);
}

/** Configures RevenueCat once and keeps the store in step with the customer's entitlements. */
export function SubscriptionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const store = useSubscriptionStore.getState();
    const apiKey = revenueCatApiKey();
    if (!apiKey) {
      store.setStatus('unavailable');
      return;
    }

    const onUpdate = (info: CustomerInfo) => useSubscriptionStore.getState().applyCustomerInfo(info);

    const start = async () => {
      try {
        if (!configured) {
          if (__DEV__) void Purchases.setLogLevel(LOG_LEVEL.WARN);
          Purchases.configure({ apiKey });
          configured = true;
        }
        Purchases.addCustomerInfoUpdateListener(onUpdate);
        onUpdate(await Purchases.getCustomerInfo());
        await loadOffering();
        useSubscriptionStore.getState().setStatus('ready');
      } catch (error) {
        const message = error instanceof Error ? error.message : 'No se pudo conectar con la tienda.';
        useSubscriptionStore.getState().setStatus('error', message);
      }
    };
    void start();

    const stopListening = Purchases.removeCustomerInfoUpdateListener.bind(Purchases);
    return () => {
      stopListening(onUpdate);
    };
  }, []);

  return children;
}

export async function retryLoadOffering() {
  if (!configured) return;
  try {
    await loadOffering();
    useSubscriptionStore.getState().setStatus('ready');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'No se pudo conectar con la tienda.';
    useSubscriptionStore.getState().setStatus('error', message);
  }
}
