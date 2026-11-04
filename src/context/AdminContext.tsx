import React, { createContext, useContext, useState, useEffect } from 'react';
import { SantaliWord, QuizItem, SiteHeroConfig } from '../types';
import {
  SANTALI_DICTIONARY,
  QUIZ_QUESTIONS,
  DEFAULT_HERO_CONFIG
} from '../data/santaliData';
import { generate10kLexicon } from '../data/lexiconGenerator';
import {
  saveWordsToIndexedDB,
  getWordsFromIndexedDB,
  saveSingleWordToIndexedDB,
  deleteWordFromIndexedDB,
  getOfflineCacheStats
} from '../utils/indexedDB';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import { sha256Hex } from '../utils/sha256';

interface AdminContextType {
  isAdmin: boolean;
  adminId: string;
  hasAdminPassword: boolean;
  loginAdmin: (passcodeOrId: string, passcode?: string) => boolean;
  logoutAdmin: () => void;
  resetAdminPassword: (adminIdOrRecoveryKey: string, newPassword: string) => { success: boolean; message: string };
  updateAdminId: (newId: string) => void;
  heroConfig: SiteHeroConfig;
  updateHeroConfig: (cfg: Partial<SiteHeroConfig>) => void;
  resetHeroConfig: () => void;

  words: SantaliWord[];
  addWord: (word: Omit<SantaliWord, 'id'>) => void;
  updateWord: (id: string, word: Partial<SantaliWord>) => void;
  deleteWord: (id: string) => void;

  quizItems: QuizItem[];
  addQuizItem: (item: Omit<QuizItem, 'id'>) => void;
  deleteQuizItem: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('hor_katha_admin_active') === 'true';
  });

  const [heroConfig, setHeroConfig] = useState<SiteHeroConfig>(() => {
    return safeLoadFromStorage('hor_katha_hero_config', DEFAULT_HERO_CONFIG);
  });

  const [words, setWords] = useState<SantaliWord[]>(() => {
    const baseLexicon = generate10kLexicon();
    const customWords = safeLoadFromStorage<SantaliWord[]>('hor_katha_custom_words', []);
    return customWords.length > 0 ? [...customWords, ...baseLexicon] : baseLexicon;
  });

  const [quizItems, setQuizItems] = useState<QuizItem[]>(() => {
    return safeLoadFromStorage('hor_katha_quiz_db', QUIZ_QUESTIONS);
  });

  useEffect(() => {
    localStorage.setItem('hor_katha_admin_active', isAdmin ? 'true' : 'false');
  }, [isAdmin]);

  useEffect(() => {
    safeSaveToStorage('hor_katha_hero_config', heroConfig);
  }, [heroConfig]);

  useEffect(() => {
    safeSaveToStorage('hor_katha_quiz_db', quizItems);
  }, [quizItems]);

  const [adminId, setAdminId] = useState<string>(() => {
    return localStorage.getItem('hor_katha_admin_id') || 'BOSC-ADMIN-01';
  });

  // Admin password is kept only as a SHA-256 hash on this device (no default / backdoor passwords).
  const [adminPassHash, setAdminPassHash] = useState<string>(() => {
    const stored = localStorage.getItem('hor_katha_admin_pw_hash');
    if (stored) return stored;
    // Migrate an old plain-text password (but never the old public default)
    const legacy = localStorage.getItem('hor_katha_admin_password');
    localStorage.removeItem('hor_katha_admin_password');
    if (legacy && !['admin123', 'bosc2026', 'admin'].includes(legacy)) {
      const h = sha256Hex(legacy);
      localStorage.setItem('hor_katha_admin_pw_hash', h);
      return h;
    }
    return '';
  });

  const savePassword = (pw: string) => {
    const h = sha256Hex(pw);
    setAdminPassHash(h);
    localStorage.setItem('hor_katha_admin_pw_hash', h);
  };

  const MIN_PASS = 8;

  const loginAdmin = (passcodeOrId: string, passcode?: string): boolean => {
    const pass = (passcode === undefined ? passcodeOrId : passcode).trim();
    const id = passcode === undefined ? adminId : passcodeOrId.trim();

    // First run on this device: the first ID + strong password become the admin login
    if (!adminPassHash) {
      if (!id || pass.length < MIN_PASS) return false;
      updateAdminId(id);
      savePassword(pass);
      setIsAdmin(true);
      return true;
    }

    const idOk = passcode === undefined || id.toLowerCase() === adminId.toLowerCase();
    if (idOk && sha256Hex(pass) === adminPassHash) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const resetAdminPassword = (
    adminIdOrRecoveryKey: string,
    newPassword: string
  ): { success: boolean; message: string } => {
    const key = adminIdOrRecoveryKey.trim();
    // Allowed when signed in (change password), or when the user types RESET to reset this device's admin login
    if (!isAdmin && key.toUpperCase() !== 'RESET') {
      return {
        success: false,
        message: 'Type RESET to confirm resetting the admin login on this device.',
      };
    }
    if (!newPassword || newPassword.trim().length < MIN_PASS) {
      return {
        success: false,
        message: `New password must be at least ${MIN_PASS} characters long.`,
      };
    }
    savePassword(newPassword.trim());
    return {
      success: true,
      message: 'Admin password saved on this device. Sign in with your Admin ID and the new password.',
    };
  };

  const updateAdminId = (newId: string) => {
    if (newId && newId.trim()) {
      setAdminId(newId.trim());
      localStorage.setItem('hor_katha_admin_id', newId.trim());
    }
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
  };

  const updateHeroConfig = (cfg: Partial<SiteHeroConfig>) => {
    setHeroConfig((prev) => ({ ...prev, ...cfg }));
  };

  const resetHeroConfig = () => {
    setHeroConfig(DEFAULT_HERO_CONFIG);
  };

  // Synchronize words into IndexedDB on mount and check cached entries
  useEffect(() => {
    let isMounted = true;
    const syncIDB = async () => {
      try {
        const stats = await getOfflineCacheStats();
        if (stats.wordCount === 0 && words.length > 0) {
          await saveWordsToIndexedDB(words);
        } else if (stats.wordCount > 0 && (!navigator.onLine || words.length <= 100)) {
          // If offline or low word count, load from IndexedDB
          const cached = await getWordsFromIndexedDB();
          if (cached && cached.length > 0 && isMounted) {
            setWords(cached);
          }
        }
      } catch (e) {
        console.warn('IDB sync error in AdminContext:', e);
      }
    };
    syncIDB();
    return () => {
      isMounted = false;
    };
  }, []);

  const addWord = (newWordData: Omit<SantaliWord, 'id'>) => {
    const newWord: SantaliWord = {
      ...newWordData,
      id: 'word_' + Date.now()
    };
    setWords((prev) => [newWord, ...prev]);
    saveSingleWordToIndexedDB(newWord);
  };

  const updateWord = (id: string, updatedFields: Partial<SantaliWord>) => {
    setWords((prev) => {
      const updated = prev.map((w) => {
        if (w.id === id) {
          const mod = { ...w, ...updatedFields };
          saveSingleWordToIndexedDB(mod);
          return mod;
        }
        return w;
      });
      return updated;
    });
  };

  const deleteWord = (id: string) => {
    setWords((prev) => prev.filter((w) => w.id !== id));
    deleteWordFromIndexedDB(id);
  };

  const addQuizItem = (itemData: Omit<QuizItem, 'id'>) => {
    const newItem: QuizItem = {
      ...itemData,
      id: 'quiz_' + Date.now()
    };
    setQuizItems((prev) => [...prev, newItem]);
  };

  const deleteQuizItem = (id: string) => {
    setQuizItems((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        adminId,
        hasAdminPassword: !!adminPassHash,
        loginAdmin,
        logoutAdmin,
        resetAdminPassword,
        updateAdminId,
        heroConfig,
        updateHeroConfig,
        resetHeroConfig,
        words,
        addWord,
        updateWord,
        deleteWord,
        quizItems,
        addQuizItem,
        deleteQuizItem
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
