import { TAXI_SUPPLEMENTS } from '@/features/fares/config/tariffs';
import type { BreakdownLine, FareEstimate, TripInput } from '@/features/fares/types/fares';
import { formatKm, roundCents } from '@/features/fares/utils/format';
import { resolveTaxiTariff } from '@/features/fares/utils/taxi-schedule';

/**
 * Taxi de Málaga: bajada de bandera + km × tarifa, at least the tariff's minimum,
 * plus supplements. Waiting time in traffic is charged by the meter and cannot be
 * known in advance, so it is left out and noted.
 */
export function estimateTaxi(trip: TripInput): FareEstimate {
  const tariff = resolveTaxiTariff(trip.when, trip.originIsAirport);
  const { rate } = tariff;

  const distance = roundCents(trip.km * rate.perKm);
  const metered = roundCents(rate.flagFall + distance);
  const minimumApplied = metered < rate.minimumFare;
  const base = minimumApplied ? rate.minimumFare : metered;

  const lines: BreakdownLine[] = minimumApplied
    ? [{ icon: 'minimum', label: `Mínimo ${tariff.label}`, amount: rate.minimumFare }]
    : [
        { icon: 'base', label: 'Bajada de bandera', amount: rate.flagFall },
        { icon: 'distance', label: `${formatKm(trip.km)} × ${rate.perKm.toFixed(2).replace('.', ',')} €`, amount: distance },
      ];

  const supplements: BreakdownLine[] = [];
  if (trip.destinationIsAirport && !trip.originIsAirport) {
    supplements.push({ icon: 'supplement', label: 'Supl. aeropuerto', amount: TAXI_SUPPLEMENTS.airportDestination });
  }
  if (tariff.isNight && tariff.rate.id !== 'T1') {
    supplements.push({ icon: 'supplement', label: 'Supl. nocturno', amount: TAXI_SUPPLEMENTS.night });
  }
  if (trip.luggage > 0) {
    supplements.push({
      icon: 'supplement',
      label: `${trip.luggage} ${trip.luggage === 1 ? 'maleta' : 'maletas'}`,
      amount: roundCents(trip.luggage * TAXI_SUPPLEMENTS.perSuitcase),
    });
  }
  if (trip.passengers >= TAXI_SUPPLEMENTS.largeVehicleFromPassengers) {
    supplements.push({ icon: 'supplement', label: 'Vehículo grande (5+)', amount: TAXI_SUPPLEMENTS.largeVehicle });
  }

  const total = roundCents(base + supplements.reduce((s, l) => s + l.amount, 0));

  return {
    provider: 'taxi',
    name: 'Taxi Málaga',
    total,
    minimumApplied,
    lines: [...lines, ...supplements],
    tariffLabel: tariff.label,
    tariffReason: tariff.reason,
    notes: ['Tarifa oficial con IVA. No incluye el tiempo de espera en atascos (taxímetro).'],
  };
}
