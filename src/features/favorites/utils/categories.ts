import type { IconTone } from '@/components/icon';
import type { FavoriteCategory, Suggestion } from '@/features/favorites/types/favorites';

type TileIcon = 'home' | 'briefcase' | 'heart' | 'airplane' | 'star' | 'school' | 'bag-handle-outline' | 'train-outline' | 'umbrella-outline';

interface Tile {
  label: string;
  icon: TileIcon;
  tone: IconTone;
  bg: string;
}

export const CATEGORIES: Record<FavoriteCategory, Tile> = {
  casa: { label: 'Casa', icon: 'home', tone: 'accent', bg: 'bg-sky' },
  aeropuerto: { label: 'Aeropuerto', icon: 'airplane', tone: 'pin', bg: 'bg-teal-soft' },
  ocio: { label: 'Ocio', icon: 'heart', tone: 'heart', bg: 'bg-heart-soft' },
  trabajo: { label: 'Trabajo', icon: 'briefcase', tone: 'violet', bg: 'bg-violet-soft' },
  otro: { label: 'Otro', icon: 'star', tone: 'accent', bg: 'bg-sky' },
};

export const CATEGORY_ORDER: FavoriteCategory[] = ['casa', 'trabajo', 'aeropuerto', 'ocio', 'otro'];

export const SUGGESTION_TILES: Record<Suggestion['icon'], Omit<Tile, 'label'>> = {
  school: { icon: 'school', tone: 'mint', bg: 'bg-mint-soft' },
  bag: { icon: 'bag-handle-outline', tone: 'violet', bg: 'bg-violet-soft' },
  train: { icon: 'train-outline', tone: 'accent', bg: 'bg-sky' },
  beach: { icon: 'umbrella-outline', tone: 'pin', bg: 'bg-teal-soft' },
};
