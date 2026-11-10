import type { Suggestion } from '@/features/favorites/types/favorites';
import { PLACES } from '@/features/route/utils/places';

/** Real OSRM driving values from Calle Larios. */
export const SUGGESTIONS: Suggestion[] = [
  { id: 's-uma', title: 'Universidad', icon: 'school', category: 'otro', origin: PLACES.larios, destination: PLACES.uma, km: 5.8, minutes: 9 },
  { id: 's-cc', title: 'Centro Comercial', icon: 'bag', category: 'ocio', origin: PLACES.larios, destination: PLACES.larioscentro, km: 2.0, minutes: 4 },
  { id: 's-zambrano', title: 'Estación María Zambrano', icon: 'train', category: 'otro', origin: PLACES.larios, destination: PLACES.mariaZambrano, km: 2.4, minutes: 5 },
  { id: 's-malagueta', title: 'Playa de la Malagueta', icon: 'beach', category: 'ocio', origin: PLACES.larios, destination: PLACES.malagueta, km: 4.3, minutes: 9 },
];
