import type { Place } from '@/features/route/types/route';

export type FavoriteCategory = 'casa' | 'aeropuerto' | 'ocio' | 'trabajo' | 'otro';

export interface Favorite {
  id: string;
  category: FavoriteCategory;
  name: string;
  origin: Place;
  destination: Place;
  km: number;
  minutes: number;
  createdAt: string;
}

export interface Suggestion {
  id: string;
  title: string;
  icon: 'school' | 'bag' | 'train' | 'beach';
  category: FavoriteCategory;
  origin: Place;
  destination: Place;
  km: number;
  minutes: number;
}
