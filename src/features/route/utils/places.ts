import { MALAGA_AIRPORT } from '@/features/fares/config/tariffs';
import type { Place } from '@/features/route/types/route';

/** Real coordinates (OpenStreetMap) of places people often start from or go to. */
export const PLACES = {
  larios: { id: 'p-larios', name: 'Calle Larios, 2', address: 'Calle Marqués de Larios, 2', locality: 'Centro, Málaga', lat: 36.7206839, lon: -4.4217867 },
  andalucia: { id: 'p-andalucia', name: 'Av. de Andalucía, 27', address: 'Avenida de Andalucía, 27', locality: 'Carretera de Cádiz, Málaga', lat: 36.7163164, lon: -4.4396645 },
  airport: { id: 'p-agp', name: 'Aeropuerto de Málaga (AGP)', address: 'Av. del Comandante García Morato', locality: 'Churriana, Málaga', lat: 36.6785446, lon: -4.4999552 },
  muelleUno: { id: 'p-muelle', name: 'Muelle Uno', address: 'Puerto de Málaga', locality: 'Centro, Málaga', lat: 36.715993, lon: -4.4138038 },
  uma: { id: 'p-uma', name: 'Universidad de Málaga', address: 'Campus de Teatinos', locality: 'Teatinos, Málaga', lat: 36.7158, lon: -4.4726 },
  larioscentro: { id: 'p-larioscentro', name: 'Centro Comercial Larios Centro', address: 'Av. de la Aurora, 25', locality: 'Cruz de Humilladero, Málaga', lat: 36.7151481, lon: -4.432762 },
  mariaZambrano: { id: 'p-zambrano', name: 'Estación María Zambrano', address: 'Explanada de la Estación', locality: 'Cruz de Humilladero, Málaga', lat: 36.7116198, lon: -4.4323605 },
  merced: { id: 'p-merced', name: 'Plaza de la Merced', address: 'Plaza de la Merced', locality: 'Centro, Málaga', lat: 36.7233811, lon: -4.4175432 },
  malagueta: { id: 'p-malagueta', name: 'Playa de la Malagueta', address: 'Paseo Marítimo Pablo Ruiz Picasso', locality: 'La Malagueta, Málaga', lat: 36.7164439, lon: -4.4109392 },
} satisfies Record<string, Place>;

export const POPULAR_PLACES: Place[] = [
  PLACES.airport,
  PLACES.mariaZambrano,
  PLACES.larios,
  PLACES.muelleUno,
  PLACES.merced,
  PLACES.malagueta,
  PLACES.uma,
  PLACES.larioscentro,
];

function distanceKm(aLat: number, aLon: number, bLat: number, bLon: number): number {
  const r = 6371;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLon = ((bLon - aLon) * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((aLat * Math.PI) / 180) * Math.cos((bLat * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return 2 * r * Math.asin(Math.sqrt(x));
}

export function isAirport(place: Place | null): boolean {
  if (!place) return false;
  if (/aeropuerto|airport|\bAGP\b/i.test(`${place.name} ${place.address}`)) return true;
  return distanceKm(place.lat, place.lon, MALAGA_AIRPORT.lat, MALAGA_AIRPORT.lon) <= MALAGA_AIRPORT.radiusKm;
}

/** "Calle Larios, 2" → "Calle Larios". Used for short route names like "Casa → Centro". */
export function shortName(place: Place): string {
  if (isAirport(place)) return 'Aeropuerto';
  return place.name.split(',')[0];
}
