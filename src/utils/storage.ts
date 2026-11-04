/**
 * Safe localStorage utilities with fail-safe error handling and JSON validation.
 * Prevents runtime crashes from corrupted storage, quota limits, or private mode.
 */

export function safeLoadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (parsed === null || parsed === undefined) return fallback;
    // If fallback is an array, ensure parsed is also an array
    if (Array.isArray(fallback) && !Array.isArray(parsed)) {
      return fallback;
    }
    return parsed as T;
  } catch (err) {
    console.warn(`[Hor Katha Storage] Error parsing "${key}" from localStorage:`, err);
    return fallback;
  }
}

export function safeSaveToStorage<T>(key: string, data: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error(`[Hor Katha Storage] Error saving "${key}" to localStorage:`, err);
    return false;
  }
}
