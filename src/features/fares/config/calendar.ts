/**
 * Málaga holiday calendar used to pick the taxi tariff. Dates as 'YYYY-MM-DD'.
 * National + Andalucía + Málaga capital local holidays (BOJA / Ayuntamiento).
 * Semana Santa is computed from Easter; Feria de Agosto dates are announced each year
 * by the Ayuntamiento, so add them here when published.
 */
export const HOLIDAYS: Record<number, string[]> = {
  2026: [
    '2026-01-01', '2026-01-06', '2026-02-28', '2026-04-02', '2026-04-03', '2026-05-01',
    '2026-08-15', '2026-08-19', '2026-09-08', '2026-10-12', '2026-11-02', '2026-12-07',
    '2026-12-08', '2026-12-25',
  ],
  2027: [
    '2027-01-01', '2027-01-06', '2027-03-01', '2027-03-25', '2027-03-26', '2027-05-01',
    '2027-08-16', '2027-08-19', '2027-09-08', '2027-10-12', '2027-11-01', '2027-12-06',
    '2027-12-08', '2027-12-25',
  ],
};

/** Feria de Agosto periods, inclusive. Verify against the Ayuntamiento each year. */
export const FERIA_PERIODS: { from: string; to: string }[] = [];
