export type ProviderID = 'uber' | 'cabify' | 'bolt' | 'taxi';

export type TaxiTariffID = 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T9';

export interface VtcFormula {
  id: Exclude<ProviderID, 'taxi'>;
  name: string;
  minimumFare: number;
  perKm: number;
  perMin: number;
  /** Multiplier applied to the km+min subtotal (Cabify's 1,05). 1 = none. */
  multiplier: number;
  url: string;
  formulaLabel: string;
}

export interface TaxiRate {
  id: 'T1' | 'T2' | 'T3';
  flagFall: number;
  perKm: number;
  minimumFare: number;
  waitingPerHour: number;
}

export interface TripInput {
  km: number;
  minutes: number;
  /** Local date/time the trip starts. */
  when: Date;
  passengers: number;
  luggage: number;
  originIsAirport: boolean;
  destinationIsAirport: boolean;
}

export type BreakdownIcon = 'distance' | 'time' | 'minimum' | 'supplement' | 'base' | 'multiplier';

export interface BreakdownLine {
  icon: BreakdownIcon;
  label: string;
  amount: number;
}

export interface FareEstimate {
  provider: ProviderID;
  name: string;
  total: number;
  minimumApplied: boolean;
  lines: BreakdownLine[];
  /** Taxi only: the tariff that applies, e.g. "Tarifa 2". */
  tariffLabel?: string;
  tariffReason?: string;
  notes: string[];
}

export interface TaxiTariffResolution {
  rate: TaxiRate;
  /** The tariff number shown to people (T4/T5/T9 when leaving the airport). */
  id: TaxiTariffID;
  label: string;
  reason: string;
  isNight: boolean;
}
