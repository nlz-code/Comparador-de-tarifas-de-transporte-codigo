import type { FareEstimate, TripInput, VtcFormula } from '@/features/fares/types/fares';
import { formatKm, roundCents } from '@/features/fares/utils/format';

/** Generic VTC estimate: max(minimum; (km × perKm + min × perMin) × multiplier). */
export function estimateVtc(formula: VtcFormula, trip: TripInput): FareEstimate {
  const distance = roundCents(trip.km * formula.perKm);
  const time = roundCents(trip.minutes * formula.perMin);
  const subtotal = roundCents((distance + time) * formula.multiplier);
  const minimumApplied = subtotal < formula.minimumFare;
  const total = minimumApplied ? formula.minimumFare : subtotal;

  const lines = minimumApplied
    ? [{ icon: 'minimum' as const, label: 'Tarifa mínima', amount: formula.minimumFare }]
    : [
        { icon: 'distance' as const, label: formatKm(trip.km), amount: distance },
        { icon: 'time' as const, label: `${Math.round(trip.minutes)} min`, amount: time },
        ...(formula.multiplier !== 1
          ? [{ icon: 'multiplier' as const, label: `× ${String(formula.multiplier).replace('.', ',')}`, amount: roundCents(subtotal - distance - time) }]
          : []),
      ];

  return {
    provider: formula.id,
    name: formula.name,
    total,
    minimumApplied,
    lines,
    notes: ['Estimación con fórmula aproximada. La app fija el precio real al pedir.'],
  };
}
