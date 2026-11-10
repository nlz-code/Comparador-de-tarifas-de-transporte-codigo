import type { Place } from '@/features/route/types/route';

/**
 * Address search with Photon (OpenStreetMap data, komoot). Results are limited to a box
 * around the city of Málaga and its airport, and biased towards the centre.
 */
const MALAGA_BBOX = '-4.62,36.62,-4.25,36.84';
const ENDPOINT = 'https://photon.komoot.io/api/';

interface PhotonFeature {
  geometry: { coordinates: [number, number] };
  properties: {
    osm_id?: number;
    osm_type?: string;
    name?: string;
    street?: string;
    housenumber?: string;
    district?: string;
    locality?: string;
    city?: string;
    county?: string;
    state?: string;
  };
}

function toPlace(f: PhotonFeature): Place | null {
  const p = f.properties;
  const [lon, lat] = f.geometry.coordinates;
  const streetLine = p.street ? `${p.street}${p.housenumber ? `, ${p.housenumber}` : ''}` : '';
  const name = p.name ?? streetLine;
  if (!name) return null;
  const town = p.city ?? p.locality ?? p.county ?? 'Málaga';
  const locality = p.district && p.district !== town ? `${p.district}, ${town}` : town;
  return {
    id: `${p.osm_type ?? 'x'}${p.osm_id ?? `${lat},${lon}`}`,
    name,
    address: streetLine && streetLine !== name ? streetLine : locality,
    locality,
    lat,
    lon,
  };
}

export async function searchPlaces(query: string, signal?: AbortSignal): Promise<Place[]> {
  const q = query.trim();
  if (q.length < 3) return [];
  const url = `${ENDPOINT}?q=${encodeURIComponent(q)}&bbox=${MALAGA_BBOX}&lat=36.72&lon=-4.42&limit=8`;
  const res = await fetch(url, { signal, headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Photon ${res.status}`);
  const json = (await res.json()) as { features?: PhotonFeature[] };
  const seen = new Set<string>();
  const places: Place[] = [];
  for (const f of json.features ?? []) {
    const place = toPlace(f);
    if (!place) continue;
    const key = `${place.name}|${place.address}`;
    if (seen.has(key)) continue;
    seen.add(key);
    places.push(place);
  }
  return places;
}
