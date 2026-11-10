import { VTC_FORMULAS } from '@/features/fares/config/tariffs';
import type { FareEstimate, TripInput } from '@/features/fares/types/fares';
import { estimateTaxi } from '@/features/fares/utils/taxi';
import { estimateVtc } from '@/features/fares/utils/vtc';

/** All four estimates, cheapest first. */
export function compareFares(trip: TripInput): FareEstimate[] {
  const estimates = [...VTC_FORMULAS.map((f) => estimateVtc(f, trip)), estimateTaxi(trip)];
  return estimates.sort((a, b) => a.total - b.total);
}

export function savings(estimates: FareEstimate[]): number {
  if (estimates.length < 2) return 0;
  return Math.round((estimates[estimates.length - 1].total - estimates[0].total) * 100) / 100;
}
