import type { Place, RouteResult } from '@/features/route/types/route';

/**
 * Driving distance and duration from OSRM (OpenStreetMap). The duration is free-flow:
 * it does not include live traffic.
 */
const ENDPOINT = 'https://router.project-osrm.org/route/v1/driving/';

export async function fetchRoute(from: Place, to: Place, signal?: AbortSignal): Promise<RouteResult> {
  const coords = `${from.lon},${from.lat};${to.lon},${to.lat}`;
  const res = await fetch(`${ENDPOINT}${coords}?overview=false`, { signal });
  if (!res.ok) throw new Error(`No se pudo calcular la ruta (${res.status}).`);
  const json = (await res.json()) as { code?: string; routes?: { distance: number; duration: number }[] };
  const route = json.routes?.[0];
  if (json.code !== 'Ok' || !route) throw new Error('No hay ruta en coche entre estos dos puntos.');
  return {
    km: Math.round(route.distance / 100) / 10,
    minutes: Math.max(1, Math.round(route.duration / 60)),
    source: 'osrm',
  };
}
