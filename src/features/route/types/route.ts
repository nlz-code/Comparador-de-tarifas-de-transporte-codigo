export interface Place {
  id: string;
  name: string;
  /** Street-level line, e.g. "Calle Marqués de Larios, 2". */
  address: string;
  /** District or town, e.g. "Centro, Málaga". */
  locality: string;
  lat: number;
  lon: number;
}

export type RouteSource = 'osrm' | 'manual';

export interface RouteResult {
  km: number;
  minutes: number;
  source: RouteSource;
}

export type RouteStatus = 'idle' | 'loading' | 'ready' | 'error';

/** 'now' or an ISO date string. */
export type TripWhen = 'now' | string;

export interface ManualRoute {
  km: number;
  minutes: number;
}
