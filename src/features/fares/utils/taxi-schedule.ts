import { TAXI_AIRPORT_ORIGIN, TAXI_RATES } from '@/features/fares/config/tariffs';
import type { TaxiRate, TaxiTariffResolution } from '@/features/fares/types/fares';
import {
  isFeria,
  isHolidayEve,
  isSemanaSanta,
  isSpecialEve,
  isWeekendOrHoliday,
} from '@/features/fares/utils/holidays';

interface BaseResolution {
  base: TaxiRate['id'];
  reason: string;
}

/** Which urban tariff (1, 2 or 3) applies at this moment, per the Ayuntamiento's schedule. */
export function resolveBaseTariff(when: Date): BaseResolution {
  const h = when.getHours();

  if (isSpecialEve(when)) {
    if (h >= 22) return { base: 'T3', reason: 'Noche del 24, 31 dic o 5 ene (22–24 h)' };
    return { base: 'T2', reason: '24, 31 dic o 5 ene (0–22 h)' };
  }

  if (isFeria(when) || isSemanaSanta(when)) {
    const label = isFeria(when) ? 'Feria de Agosto' : 'Semana Santa';
    if (h >= 6 && h < 20) return { base: 'T2', reason: `${label} (6–20 h)` };
    return { base: 'T3', reason: `${label} (20–6 h)` };
  }

  if (isWeekendOrHoliday(when)) {
    if (h >= 6 && h < 22) return { base: 'T2', reason: 'Sábado, domingo o festivo (6–22 h)' };
    return { base: 'T3', reason: 'Noche de sábado, domingo o festivo' };
  }

  if (h >= 6 && h < 22) return { base: 'T1', reason: 'Laborable de lunes a viernes (6–22 h)' };
  if (h < 6) return { base: 'T2', reason: 'Laborable de madrugada (0–6 h)' };

  const isFriday = when.getDay() === 5;
  if (isFriday || isHolidayEve(when)) {
    return { base: 'T3', reason: 'Viernes o víspera de festivo (22–24 h)' };
  }
  return { base: 'T2', reason: 'Laborable por la noche (22–24 h)' };
}

export function resolveTaxiTariff(when: Date, originIsAirport: boolean): TaxiTariffResolution {
  const { base, reason } = resolveBaseTariff(when);
  const rate = TAXI_RATES[base];
  const isNight = when.getHours() < 6;

  if (!originIsAirport) {
    return { rate, id: base, label: `Tarifa ${base.slice(1)}`, reason, isNight };
  }

  const airport = TAXI_AIRPORT_ORIGIN[base];
  return {
    rate: { ...rate, minimumFare: airport.minimumFare },
    id: airport.id,
    label: `Tarifa ${airport.id.slice(1)}`,
    reason: `Salida del aeropuerto · ${reason}`,
    isNight,
  };
}
