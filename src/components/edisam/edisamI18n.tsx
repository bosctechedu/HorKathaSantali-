// Language support for the pages ported from EDISAM (LDP and Quiz / IQ).
// EDISAM switches between Hindi, English and Santali (Devanagari); Hor Katha Santali has no
// global language switch, so these pages keep their own small switch (saved on this device).
import React, { useCallback, useEffect, useState } from 'react';

export type EdisamLang = 'hi' | 'en' | 'sat_deva';

export const EDISAM_LANGUAGES: { code: EdisamLang; label: string; flag: string }[] = [
  { code: 'hi', label: 'हिंदी', flag: 'हिं' },
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'sat_deva', label: 'संताली (देवनागरी)', flag: 'सं' },
];

// Same strings as EDISAM's translation table (only the keys these pages use).
export const EDISAM_TRANSLATIONS: Record<EdisamLang, Record<string, string>> = {
  hi: {
    nav_educational: 'LDP',
    nav_quiz: 'क्विज / IQ',
    books_title: 'ज्ञान संकलन',
    success_principles: 'सफलता के सिद्धांत',
    time_management: 'समय प्रबंधन',
    digital_education: 'डिजिटल शिक्षा',
    personality_development: 'व्यक्तित्व विकास',
    positive_thinking: 'सकारात्मक सोच',
  },
  en: {
    nav_educational: 'LDP',
    nav_quiz: 'Quiz / IQ',
    books_title: 'Knowledge Shelf',
    success_principles: 'Principles of Success',
    time_management: 'Time Management',
    digital_education: 'Digital Education',
    personality_development: 'Personality Development',
    positive_thinking: 'Positive Thinking',
  },
  sat_deva: {
    nav_educational: 'LDP',
    nav_quiz: 'क्विज / IQ',
    books_title: 'गियान आलमारी',
    success_principles: 'जीतकार रेयाः नियम',
    time_management: 'वक्तो साजाव',
    digital_education: 'डिजिटल चेमेद',
    personality_development: 'होरमो गोन',
    positive_thinking: 'भागे गोन चिंता',
  },
};

const STORAGE_KEY = 'hks_edisam_lang';
const EVENT = 'hks_edisam_lang_change';

const readLang = (): EdisamLang => {
  try {
    const l = localStorage.getItem(STORAGE_KEY);
    return l === 'hi' || l === 'en' || l === 'sat_deva' ? l : 'hi';
  } catch {
    return 'hi';
  }
};

export function useLanguage() {
  const [language, setLang] = useState<EdisamLang>(readLang);
  useEffect(() => {
    const sync = () => setLang(readLang());
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);
  const setLanguage = useCallback((l: EdisamLang) => {
    try { localStorage.setItem(STORAGE_KEY, l); } catch { /* ignore */ }
    setLang(l);
    window.dispatchEvent(new Event(EVENT));
  }, []);
  const t = useCallback(
    (key: string): string => {
      const v = (EDISAM_TRANSLATIONS[language] || EDISAM_TRANSLATIONS.hi)[key];
      return v !== undefined ? v : EDISAM_TRANSLATIONS.hi[key] || String(key);
    },
    [language],
  );
  return { language, setLanguage, t };
}

export const EdisamLanguageSwitch: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="inline-flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-2xs select-none">
      {EDISAM_LANGUAGES.map((l) => (
        <button
          key={l.code}
          onClick={() => setLanguage(l.code)}
          title={l.label}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition cursor-pointer ${
            language === l.code ? 'bg-emerald-700 text-white' : 'text-gray-600 hover:bg-slate-100'
          }`}
        >
          {l.flag}
        </button>
      ))}
    </div>
  );
};
