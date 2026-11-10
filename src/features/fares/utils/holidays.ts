import { FERIA_PERIODS, HOLIDAYS } from '@/features/fares/config/calendar';

export function dateKey(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

/** Easter Sunday (Gregorian, anonymous algorithm). */
export function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

export function isHoliday(d: Date): boolean {
  const list = HOLIDAYS[d.getFullYear()] ?? [];
  return list.includes(dateKey(d));
}

export function hasHolidayCalendar(year: number): boolean {
  return HOLIDAYS[year] !== undefined;
}

export function isWeekendOrHoliday(d: Date): boolean {
  const wd = d.getDay();
  if (wd === 0 || wd === 6) return true;
  return isHoliday(d);
}

export function isHolidayEve(d: Date): boolean {
  const next = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
  return isHoliday(next);
}

/** Palm Sunday through Easter Sunday. */
export function isSemanaSanta(d: Date): boolean {
  const easter = easterSunday(d.getFullYear());
  const start = new Date(easter.getFullYear(), easter.getMonth(), easter.getDate() - 7);
  const day = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return day >= start && day <= easter;
}

export function isFeria(d: Date): boolean {
  const key = dateKey(d);
  return FERIA_PERIODS.some((p) => key >= p.from && key <= p.to);
}

/** 24 Dec, 31 Dec and 5 Jan have their own taxi schedule. */
export function isSpecialEve(d: Date): boolean {
  const m = d.getMonth() + 1;
  const day = d.getDate();
  if (m === 12 && (day === 24 || day === 31)) return true;
  return m === 1 && day === 5;
}
