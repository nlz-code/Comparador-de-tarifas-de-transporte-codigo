import type { Place, TripWhen } from '@/features/route/types/route';

export interface HistoryEntry {
  id: string;
  origin: Place;
  destination: Place;
  /** When the trip was planned for ('now' = at search time). */
  when: TripWhen;
  searchedAt: string;
  passengers: number;
  luggage: number;
  km: number;
  minutes: number;
}
