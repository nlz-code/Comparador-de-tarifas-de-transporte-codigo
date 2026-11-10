import type { TaxiRate, VtcFormula } from '@/features/fares/types/fares';

/**
 * Every fare number in the app lives in this file, so it can be updated in one place.
 *
 * VTC (Uber, Cabify, Bolt): these are NOT published tariffs. They are the owner's
 * approximation formulas from the prototype, used only to show an estimate. The apps
 * set their real price (with dynamic pricing) at the moment of booking.
 *
 * Taxi de Málaga: official urban tariffs (IVA included) published by the Ayuntamiento
 * de Málaga, Área de Movilidad, in force since 2025. Checked on 10 Nov 2026 against:
 *  - https://movilidad.malaga.eu (Tarifa urbana Taxi vigente, PDF)
 *  - https://www.aena.es/es/malaga-costa-del-sol/ (taxi at the airport)
 * Re-check every January: the city usually updates them once a year.
 */

export const TARIFFS_UPDATED_AT = '2026-11-10';

export const VTC_FORMULAS: VtcFormula[] = [
  {
    id: 'uber',
    name: 'Uber',
    minimumFare: 4.5,
    perKm: 1.05,
    perMin: 0.22,
    multiplier: 1,
    url: 'https://www.uber.com/es/',
    formulaLabel: 'máx(4,50 €; km × 1,05 + min × 0,22)',
  },
  {
    id: 'cabify',
    name: 'Cabify',
    minimumFare: 4.33,
    perKm: 0.75,
    perMin: 0.3,
    multiplier: 1.05,
    url: 'https://cabify.com/es',
    formulaLabel: 'máx(4,33 €; (km × 0,75 + min × 0,30) × 1,05)',
  },
  {
    id: 'bolt',
    name: 'Bolt',
    minimumFare: 4,
    perKm: 0.95,
    perMin: 0.18,
    multiplier: 1,
    url: 'https://bolt.eu/es-es/',
    formulaLabel: 'máx(4,00 €; km × 0,95 + min × 0,18)',
  },
];

export const TAXI_RATES: Record<TaxiRate['id'], TaxiRate> = {
  T1: { id: 'T1', flagFall: 1.79, perKm: 1.0, minimumFare: 4.39, waitingPerHour: 23 },
  T2: { id: 'T2', flagFall: 2.19, perKm: 1.21, minimumFare: 5.42, waitingPerHour: 28 },
  T3: { id: 'T3', flagFall: 2.5, perKm: 1.38, minimumFare: 6.18, waitingPerHour: 30 },
};

/** Trips that START at the airport use Tarifa 4 / 5 / 9: same rates as 1 / 2 / 3, higher minimum. */
export const TAXI_AIRPORT_ORIGIN = {
  T1: { id: 'T4', minimumFare: 17.37 },
  T2: { id: 'T5', minimumFare: 21.72 },
  T3: { id: 'T9', minimumFare: 24.93 },
} as const;

export const TAXI_SUPPLEMENTS = {
  /** Destination Aeropuerto de Málaga (not charged when leaving it). */
  airportDestination: 6.27,
  /** Night 00:00–06:00, only on Tarifa 2/3 (and 5/9). */
  night: 2.15,
  perSuitcase: 0.56,
  /** Adapted / larger vehicle, from the 5th passenger. */
  largeVehicle: 2.7,
  largeVehicleFromPassengers: 5,
};

export const TAXI_SOURCE_URL =
  'https://movilidad.malaga.eu/opencms/export/sites/movilidad/.content/galerias/taxi/Tarifa-urbana-Taxi-vigente.pdf';

export const TAXI_CENTRALS = [
  { name: 'Unitaxi · PideTaxi', phone: '+34952333333', display: '952 33 33 33', url: 'https://www.unitaxi.es' },
  { name: 'Taxi Unión', phone: '+34952040404', display: '952 04 04 04', url: 'https://www.taxi-union.es' },
  { name: 'Radiotaxi Málaga', phone: '+34952040804', display: '952 04 08 04', url: null },
] as const;

export const TAXI_INFO_URL = 'https://visita.malaga.eu/es/planifica/como-desplazase/taxi';

export const MALAGA_AIRPORT = { lat: 36.6785446, lon: -4.4999552, radiusKm: 2 };

export const DISCLAIMER =
  'Los precios mostrados son orientativos y pueden variar según la demanda, el tráfico, la disponibilidad de vehículos, la ruta seleccionada, los suplementos y las condiciones de cada proveedor. El precio definitivo debe comprobarse en la plataforma correspondiente antes de realizar la reserva.';
