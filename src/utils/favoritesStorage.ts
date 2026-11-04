export interface FavoriteItem {
  id: string;
  category: 'recipe' | 'pilgrimage' | 'letter' | 'riddle' | 'story' | 'vocab' | 'dialogue';
  categoryLabel: string;
  titleDevanagari: string;
  titleRoman: string;
  subtitle?: string;
  summary: string;
  savedAt: string;
}

const STORAGE_KEY = 'santali_favorites_items_v1';

export const getFavorites = (): FavoriteItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const isFavorite = (id: string): boolean => {
  const items = getFavorites();
  return items.some((item) => item.id === id);
};

export const toggleFavorite = (item: Omit<FavoriteItem, 'savedAt'>): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const current = getFavorites();
    const exists = current.some((fav) => fav.id === item.id);
    let updated: FavoriteItem[];
    if (exists) {
      updated = current.filter((fav) => fav.id !== item.id);
    } else {
      updated = [{ ...item, savedAt: new Date().toLocaleDateString('hi-IN') }, ...current];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('santali-favorites-updated'));
    return !exists;
  } catch {
    return false;
  }
};

export const removeFavorite = (id: string): void => {
  if (typeof window === 'undefined') return;
  try {
    const current = getFavorites();
    const updated = current.filter((fav) => fav.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('santali-favorites-updated'));
  } catch {
    // ignore error
  }
};
