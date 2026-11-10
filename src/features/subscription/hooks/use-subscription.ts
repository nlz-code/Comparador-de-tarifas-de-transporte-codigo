// @newly-subscriptions
import { Alert } from 'react-native';
import Purchases, { type PurchasesPackage } from 'react-native-purchases';
import RevenueCatUI, { PAYWALL_RESULT } from 'react-native-purchases-ui';
import { Presets } from 'react-native-pulsar';

import { retryLoadOffering } from '@/features/subscription/components/subscription-provider';
import { useSubscriptionStore } from '@/features/subscription/store/subscription-store';

const UNAVAILABLE = 'Las compras no están disponibles en esta versión de la app.';

function isCancel(error: unknown) {
  return typeof error === 'object' && error !== null && 'userCancelled' in error && error.userCancelled === true;
}

function showError(error: unknown) {
  if (isCancel(error)) return;
  const message = error instanceof Error ? error.message : 'Inténtalo de nuevo en unos minutos.';
  Alert.alert('No se ha podido completar', message);
}

export function useSubscription() {
  const status = useSubscriptionStore((s) => s.status);
  const isPro = useSubscriptionStore((s) => s.isPro);
  const customerInfo = useSubscriptionStore((s) => s.customerInfo);
  const offering = useSubscriptionStore((s) => s.offering);
  const error = useSubscriptionStore((s) => s.error);
  const ready = status === 'ready';

  const purchase = async (pkg: PurchasesPackage) => {
    try {
      const result = await Purchases.purchasePackage(pkg);
      useSubscriptionStore.getState().applyCustomerInfo(result.customerInfo);
      Presets.System.notificationSuccess();
      return true;
    } catch (e) {
      showError(e);
      return false;
    }
  };

  const restore = async () => {
    if (!ready) {
      Alert.alert('Restaurar compras', UNAVAILABLE);
      return false;
    }
    try {
      const info = await Purchases.restorePurchases();
      useSubscriptionStore.getState().applyCustomerInfo(info);
      const restored = useSubscriptionStore.getState().isPro;
      if (restored) Presets.System.notificationSuccess();
      Alert.alert(
        restored ? 'Compras restauradas' : 'Nada que restaurar',
        restored ? 'MálagaMove Pro vuelve a estar activo.' : 'No hemos encontrado compras de MálagaMove Pro en esta cuenta.',
      );
      return restored;
    } catch (e) {
      showError(e);
      return false;
    }
  };

  /** Opens the RevenueCat paywall for the current offering. Resolves true when the user ends up Pro. */
  const showPaywall = async () => {
    if (!ready) {
      await retryLoadOffering();
      if (useSubscriptionStore.getState().status !== 'ready') {
        Alert.alert('MálagaMove Pro', useSubscriptionStore.getState().error ?? UNAVAILABLE);
        return false;
      }
    }
    try {
      const current = useSubscriptionStore.getState().offering;
      const result = await RevenueCatUI.presentPaywall({
        ...(current ? { offering: current } : {}),
        displayCloseButton: true,
      });
      if (result === PAYWALL_RESULT.PURCHASED || result === PAYWALL_RESULT.RESTORED) {
        useSubscriptionStore.getState().applyCustomerInfo(await Purchases.getCustomerInfo());
        Presets.System.notificationSuccess();
        return true;
      }
      if (result === PAYWALL_RESULT.ERROR) Alert.alert('No se ha podido abrir', 'Inténtalo de nuevo en unos minutos.');
      return false;
    } catch (e) {
      showError(e);
      return false;
    }
  };

  const openCustomerCenter = async () => {
    if (!ready) {
      Alert.alert('Gestionar suscripción', UNAVAILABLE);
      return;
    }
    try {
      await RevenueCatUI.presentCustomerCenter();
      useSubscriptionStore.getState().applyCustomerInfo(await Purchases.getCustomerInfo());
    } catch (e) {
      showError(e);
    }
  };

  return { status, ready, isPro, customerInfo, offering, error, purchase, restore, showPaywall, openCustomerCenter };
}
