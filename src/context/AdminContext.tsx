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

export type StaffRole = 'admin' | 'operator';
export type AuthResult = { success: boolean; error?: string; message?: string; needSetup?: boolean; sentTo?: string };
export type AuthStatus = { ready: boolean; adminSet: boolean; emailReady: boolean; adminUsername?: string; resetEmail?: string };
export const ADMIN_USERNAME = 'BOSC@TECH&EDU';

interface AdminContextType {
  /** true for Admin and Assigned Operator (content editing, slider upload) */
  isAdmin: boolean;
  /** true only for the main Admin (operator management) */
  isSuperAdmin: boolean;
  role: StaffRole | null;
  staffUsername: string;
  authStatus: AuthStatus | null;
  refreshAuthStatus: () => Promise<void>;
  login: (username: string, password: string) => Promise<AuthResult>;
  logoutAdmin: () => void;
  sendAdminOtp: () => Promise<AuthResult>;
  setupAdmin: (otp: string, password: string) => Promise<AuthResult>;
  resetAdminPassword: (otp: string, password: string) => Promise<AuthResult>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<AuthResult>;
  /** fetch with the staff session token */
  staffFetch: (url: string, init?: RequestInit) => Promise<Response>;
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
  // Staff session (Admin / Operator) is verified by the server (/api/auth); token kept on this device only.
  const [token, setToken] = useState<string>(() => localStorage.getItem('hk_staff_token') || '');
  const [role, setRole] = useState<StaffRole | null>(() => (localStorage.getItem('hk_staff_token') ? (localStorage.getItem('hk_staff_role') as StaffRole) : null));
  const [staffUsername, setStaffUsername] = useState<string>(() => localStorage.getItem('hk_staff_user') || '');
  const [authStatus, setAuthStatus] = useState<AuthStatus | null>(null);
  const isAdmin = !!token && !!role;
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
    safeSaveToStorage('hor_katha_hero_config', heroConfig);
  }, [heroConfig]);

  useEffect(() => {
    safeSaveToStorage('hor_katha_quiz_db', quizItems);
  }, [quizItems]);

  // Remove old device-only admin data from earlier versions
  useEffect(() => {
    ['hor_katha_admin_active', 'hor_katha_admin_pw_hash', 'hor_katha_admin_password', 'hor_katha_admin_id'].forEach((k) => localStorage.removeItem(k));
  }, []);

  const saveSession = (t: string, r: StaffRole | null, u: string) => {
    setToken(t); setRole(r); setStaffUsername(u);
    if (t && r) {
      localStorage.setItem('hk_staff_token', t); localStorage.setItem('hk_staff_role', r); localStorage.setItem('hk_staff_user', u);
    } else {
      ['hk_staff_token', 'hk_staff_role', 'hk_staff_user'].forEach((k) => localStorage.removeItem(k));
    }
  };

  const call = async (body: Record<string, unknown>, withToken = false, t = token): Promise<any> => {
    try {
      const r = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...(withToken && t ? { authorization: `Bearer ${t}` } : {}) },
        body: JSON.stringify(body),
      });
      const data = await r.json().catch(() => ({}));
      return { status: r.status, ...data };
    } catch {
      return { status: 0, error: 'सर्वर से जुड़ नहीं पाए। इंटरनेट जाँचें।' };
    }
  };

  const refreshAuthStatus = async () => {
    try {
      const r = await fetch('/api/auth', { cache: 'no-store' });
      setAuthStatus(await r.json());
    } catch {
      setAuthStatus({ ready: false, adminSet: false, emailReady: false });
    }
  };

  // Verify a saved session once on load (offline: keep it until we can check)
  useEffect(() => {
    if (!token || !navigator.onLine) return;
    call({ action: 'me' }, true).then((d) => {
      if (d.status === 401 || d.status === 503) saveSession('', null, '');
      else if (d.success) saveSession(token, d.role, d.username);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (username: string, password: string): Promise<AuthResult> => {
    const d = await call({ action: 'login', username: username.trim(), password });
    if (d.success && d.token) { saveSession(d.token, d.role, d.username); return { success: true }; }
    return { success: false, error: d.error || 'Login नहीं हो पाया।', needSetup: !!d.needSetup };
  };

  const sendAdminOtp = async (): Promise<AuthResult> => {
    const d = await call({ action: 'send-otp' });
    return d.success ? { success: true, sentTo: d.sentTo } : { success: false, error: d.error || 'OTP नहीं भेज पाए।' };
  };

  const setupAdmin = async (otp: string, password: string): Promise<AuthResult> => {
    const d = await call({ action: 'setup', otp: otp.trim(), password });
    if (d.success && d.token) { saveSession(d.token, 'admin', d.username); refreshAuthStatus(); return { success: true }; }
    return { success: false, error: d.error || 'Setup नहीं हो पाया।' };
  };

  const resetAdminPassword = async (otp: string, password: string): Promise<AuthResult> => {
    const d = await call({ action: 'reset', otp: otp.trim(), password });
    return d.success ? { success: true, message: d.message } : { success: false, error: d.error || 'Reset नहीं हो पाया।' };
  };

  const changePassword = async (oldPassword: string, newPassword: string): Promise<AuthResult> => {
    const d = await call({ action: 'change-password', oldPassword, password: newPassword }, true);
    if (d.success && d.token) { saveSession(d.token, role, staffUsername); return { success: true, message: d.message }; }
    if (d.status === 401) saveSession('', null, '');
    return { success: false, error: d.error || 'पासवर्ड नहीं बदला।' };
  };

  const logoutAdmin = () => {
    if (token) call({ action: 'logout' }, true);
    saveSession('', null, '');
  };

  const staffFetch = async (url: string, init: RequestInit = {}) => {
    const r = await fetch(url, { ...init, headers: { ...(init.headers || {}), authorization: `Bearer ${token}` } });
    if (r.status === 401) saveSession('', null, '');
    return r;
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
        isSuperAdmin: isAdmin && role === 'admin',
        role: isAdmin ? role : null,
        staffUsername,
        authStatus,
        refreshAuthStatus,
        login,
        logoutAdmin,
        sendAdminOtp,
        setupAdmin,
        resetAdminPassword,
        changePassword,
        staffFetch,
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
