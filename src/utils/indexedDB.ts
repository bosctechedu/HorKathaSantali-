/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Hor Katha Suite — Offline IndexedDB Storage Layer
 * Persists 10,000+ dictionary words, custom lexicon, and virtual keyboard drafts for offline use.
 */

import { SantaliWord } from '../types';

const DB_NAME = 'HorKathaOfflineDB';
const DB_VERSION = 1;

export const STORE_WORDS = 'dictionary_words';
export const STORE_KEYBOARD = 'keyboard_storage';
export const STORE_META = 'app_meta';

let dbInstance: IDBDatabase | null = null;
let dbInitPromise: Promise<IDBDatabase | null> | null = null;

/**
 * Initializes and opens the IndexedDB database.
 */
export const getOfflineDB = (): Promise<IDBDatabase | null> => {
  if (typeof window === 'undefined' || !window.indexedDB) {
    return Promise.resolve(null);
  }

  if (dbInstance) {
    return Promise.resolve(dbInstance);
  }

  if (dbInitPromise) {
    return dbInitPromise;
  }

  dbInitPromise = new Promise((resolve) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Dictionary store
        if (!db.objectStoreNames.contains(STORE_WORDS)) {
          const wordStore = db.createObjectStore(STORE_WORDS, { keyPath: 'id' });
          wordStore.createIndex('by_category', 'category', { unique: false });
          wordStore.createIndex('by_roman', 'wordRoman', { unique: false });
          wordStore.createIndex('by_devanagari', 'wordDevanagari', { unique: false });
        }

        // Keyboard drafts store
        if (!db.objectStoreNames.contains(STORE_KEYBOARD)) {
          db.createObjectStore(STORE_KEYBOARD, { keyPath: 'key' });
        }

        // Metadata store
        if (!db.objectStoreNames.contains(STORE_META)) {
          db.createObjectStore(STORE_META, { keyPath: 'key' });
        }
      };

      request.onsuccess = (event) => {
        dbInstance = (event.target as IDBOpenDBRequest).result;
        resolve(dbInstance);
      };

      request.onerror = (event) => {
        console.warn('IndexedDB failed to open:', event);
        resolve(null);
      };
    } catch (err) {
      console.warn('IndexedDB initialization error:', err);
      resolve(null);
    }
  });

  return dbInitPromise;
};

/**
 * Bulk saves words to IndexedDB in small batches, one transaction each, yielding to the main thread
 * between batches. A single 10k-row transaction blocked a cheap phone's UI for several seconds on the
 * first visit. The meta row (count + time) is written last, so an interrupted save is redone next time.
 */
const WORD_BATCH = 60;
const yieldToMain = () =>
  new Promise<void>((resolve) => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(() => resolve(), { timeout: 400 });
    else setTimeout(resolve, 16);
  });

export const saveWordsToIndexedDB = async (words: SantaliWord[]): Promise<boolean> => {
  try {
    const db = await getOfflineDB();
    if (!db || words.length === 0) return false;

    for (let start = 0; start < words.length; start += WORD_BATCH) {
      const last = start + WORD_BATCH >= words.length;
      const ok = await new Promise<boolean>((resolve) => {
        const tx = db.transaction(last ? [STORE_WORDS, STORE_META] : [STORE_WORDS], 'readwrite');
        const store = tx.objectStore(STORE_WORDS);
        const end = Math.min(start + WORD_BATCH, words.length);
        for (let i = start; i < end; i++) store.put(words[i]);
        if (last) {
          tx.objectStore(STORE_META).put({ key: 'words_meta', count: words.length, lastUpdated: Date.now() });
        }
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
        tx.onabort = () => resolve(false);
      });
      if (!ok) return false;
      if (!last) await yieldToMain();
    }
    return true;
  } catch (e) {
    console.warn('Failed saving words to IndexedDB:', e);
    return false;
  }
};

/**
 * Retrieves all stored words from IndexedDB.
 */
export const getWordsFromIndexedDB = async (): Promise<SantaliWord[]> => {
  try {
    const db = await getOfflineDB();
    if (!db) return [];

    return new Promise((resolve) => {
      const tx = db.transaction(STORE_WORDS, 'readonly');
      const store = tx.objectStore(STORE_WORDS);
      const req = store.getAll();

      req.onsuccess = () => {
        resolve((req.result as SantaliWord[]) || []);
      };

      req.onerror = () => {
        resolve([]);
      };
    });
  } catch (e) {
    console.warn('Error reading from IndexedDB:', e);
    return [];
  }
};

/**
 * Saves or updates a single word in IndexedDB.
 */
export const saveSingleWordToIndexedDB = async (word: SantaliWord): Promise<boolean> => {
  try {
    const db = await getOfflineDB();
    if (!db) return false;

    return new Promise((resolve) => {
      const tx = db.transaction(STORE_WORDS, 'readwrite');
      const store = tx.objectStore(STORE_WORDS);
      store.put(word);

      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  } catch (e) {
    console.warn('Error saving single word to IndexedDB:', e);
    return false;
  }
};

/**
 * Deletes a word from IndexedDB.
 */
export const deleteWordFromIndexedDB = async (id: string): Promise<boolean> => {
  try {
    const db = await getOfflineDB();
    if (!db) return false;

    return new Promise((resolve) => {
      const tx = db.transaction(STORE_WORDS, 'readwrite');
      const store = tx.objectStore(STORE_WORDS);
      store.delete(id);

      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  } catch (e) {
    console.warn('Error deleting word from IndexedDB:', e);
    return false;
  }
};

/**
 * Saves keyboard draft and history to IndexedDB.
 */
export const saveKeyboardDraftToIndexedDB = async (
  draftText: string,
  lang: string = 'santali_dev',
  extraMeta?: Record<string, any>
): Promise<boolean> => {
  try {
    const db = await getOfflineDB();
    if (!db) return false;

    return new Promise((resolve) => {
      const tx = db.transaction(STORE_KEYBOARD, 'readwrite');
      const store = tx.objectStore(STORE_KEYBOARD);

      store.put({
        key: 'active_draft',
        text: draftText,
        lang,
        extraMeta: extraMeta || {},
        updatedAt: Date.now()
      });

      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  } catch (e) {
    console.warn('Error saving keyboard draft to IndexedDB:', e);
    return false;
  }
};

/**
 * Retrieves the keyboard draft from IndexedDB.
 */
export const getKeyboardDraftFromIndexedDB = async (): Promise<{
  text: string;
  lang: string;
  updatedAt: number;
} | null> => {
  try {
    const db = await getOfflineDB();
    if (!db) return null;

    return new Promise((resolve) => {
      const tx = db.transaction(STORE_KEYBOARD, 'readonly');
      const store = tx.objectStore(STORE_KEYBOARD);
      const req = store.get('active_draft');

      req.onsuccess = () => {
        resolve(req.result || null);
      };

      req.onerror = () => {
        resolve(null);
      };
    });
  } catch (e) {
    console.warn('Error reading keyboard draft from IndexedDB:', e);
    return null;
  }
};

/**
 * Gets offline caching statistics for UI feedback.
 */
export const getOfflineCacheStats = async (): Promise<{
  wordCount: number;
  lastSyncTime: number | null;
  isReady: boolean;
}> => {
  try {
    const db = await getOfflineDB();
    if (!db) return { wordCount: 0, lastSyncTime: null, isReady: false };

    return new Promise((resolve) => {
      const tx = db.transaction([STORE_WORDS, STORE_META], 'readonly');
      const wordStore = tx.objectStore(STORE_WORDS);
      const metaStore = tx.objectStore(STORE_META);

      const countReq = wordStore.count();
      const metaReq = metaStore.get('words_meta');

      tx.oncomplete = () => {
        resolve({
          wordCount: countReq.result || 0,
          lastSyncTime: metaReq.result?.lastUpdated || null,
          isReady: (countReq.result || 0) > 0
        });
      };

      tx.onerror = () => {
        resolve({ wordCount: 0, lastSyncTime: null, isReady: false });
      };
    });
  } catch (e) {
    return { wordCount: 0, lastSyncTime: null, isReady: false };
  }
};
