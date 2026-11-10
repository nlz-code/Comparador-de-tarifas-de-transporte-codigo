import type { FareEstimate, TripInput } from '@/features/fares/types/fares';
import { compareFares } from '@/features/fares/utils/compare';
import type { Place, TripWhen } from '@/features/route/types/route';
import { isAirport } from '@/features/route/utils/places';

export function resolveWhen(when: TripWhen): Date {
  return when === 'now' ? new Date() : new Date(when);
}

interface FareQuery {
  origin: Place | null;
  destination: Place | null;
  km: number;
  minutes: number;
  when: TripWhen;
  passengers: number;
  luggage: number;
}

export function buildTripInput(q: FareQuery): TripInput {
  return {
    km: q.km,
    minutes: q.minutes,
    when: resolveWhen(q.when),
    passengers: q.passengers,
    luggage: q.luggage,
    originIsAirport: isAirport(q.origin),
    destinationIsAirport: isAirport(q.destination),
  };
}

/** The four estimates for a route, cheapest first. */
export function faresFor(q: FareQuery): FareEstimate[] {
  return compareFares(buildTripInput(q));
}
