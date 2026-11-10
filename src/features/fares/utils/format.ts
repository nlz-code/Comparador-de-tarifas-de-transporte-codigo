export function roundCents(n: number): number {
  return Math.round(n * 100) / 100;
}

const euro = (n: number) => n.toFixed(2).replace('.', ',');

/** "18,60 €" */
export function formatEuro(n: number): string {
  return `${euro(n)} €`;
}

/** "12,6 km" */
export function formatKm(km: number): string {
  return `${km.toFixed(1).replace('.', ',')} km`;
}

export function formatMin(min: number): string {
  return `${Math.max(1, Math.round(min))} min`;
}

const MONTHS_SHORT = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sept', 'oct', 'nov', 'dic'];
const MONTHS_LONG = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];
const WEEKDAYS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];

/** "10 nov 2026" */
export function formatShortDate(d: Date): string {
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
}

/** "10 de noviembre de 2026" */
export function formatLongDate(d: Date): string {
  return `${d.getDate()} de ${MONTHS_LONG[d.getMonth()]} de ${d.getFullYear()}`;
}

export function formatTime(d: Date): string {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

/** "sáb 14 nov · 23:30" */
export function formatWhen(d: Date): string {
  return `${WEEKDAYS[d.getDay()]} ${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} · ${formatTime(d)}`;
}

export function formatPassengers(n: number): string {
  return `${n} ${n === 1 ? 'pasajero' : 'pasajeros'}`;
}
