// Local (no AI, works offline) site search used inside the floating assistant.
// Reuses the same module + culture index as the Ctrl+K Global Search, plus the dictionary words.
import type { ActiveDesktopTab, SantaliWord } from '../../types';
import { APP_MODULES, CULTURAL_TOPICS } from '../GlobalSearchModal';

export type SiteHit = {
  id: string;
  kind: 'module' | 'culture' | 'word';
  title: string;
  subtitle: string;
  devanagari?: string;
  targetTab?: ActiveDesktopTab;
};

const STOP = new Set([
  'what', 'is', 'the', 'a', 'an', 'of', 'in', 'to', 'for', 'and', 'or', 'how', 'who', 'why', 'me', 'about', 'tell', 'please',
  'santali', 'santhali', 'word', 'meaning', 'say', 'open', 'show', 'kya', 'hai', 'ka', 'ki', 'ke', 'ko', 'me', 'se',
  'क्या', 'है', 'हैं', 'का', 'की', 'के', 'को', 'में', 'से', 'और', 'या', 'कौन', 'क्यों', 'कैसे', 'बताइए', 'बताओ', 'बताएं',
  'मुझे', 'एक', 'कहते', 'कहें', 'अर्थ', 'मतलब', 'संताली', 'संथाली', 'शब्द', 'खोलो', 'खोलें', 'दिखाओ', 'जाता', 'जाती',
  'था', 'थे', 'थी', 'पर', 'लिए', 'इतिहास', 'बारे', 'संक्षेप', 'समझाइए', 'सीखें', 'उपयोग',
]);

const WORD_SKIP = new Set(['santhal', 'santal', 'santals', 'santhals', 'hool', 'hul', 'tribe', 'tribal', 'संताल', 'सान्ताल', 'संथाल', 'आदिवासी']);

export function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/["'“”‘’?!.,:;()\[\]{}/\\|।॥]+/g, ' ')
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2 && !STOP.has(t));
}

const score = (hay: (string | undefined)[], tokens: string[], whole: string) => {
  const text = hay.filter(Boolean).join(' ').toLowerCase();
  if (!text) return 0;
  let s = whole.length >= 3 && text.includes(whole) ? 5 : 0;
  for (const t of tokens) if (text.includes(t)) s += t.length >= 4 ? 2 : 1;
  return s;
};

/** Best matching modules / culture topics / dictionary words for a free-text question. */
export function searchSite(query: string, words: SantaliWord[], limit = 5): { pages: SiteHit[]; words: (SiteHit & { word: SantaliWord })[] } {
  const whole = query.trim().toLowerCase();
  const tokens = tokenize(query);
  if (!whole) return { pages: [], words: [] };

  const pages = [...APP_MODULES, ...CULTURAL_TOPICS]
    // Matches in the title / Devanagari name count extra, so "सोहराय …" puts the Sohrai page first
    .map((m) => ({ m, s: score([m.title, m.subtitle, m.description, m.category, m.scriptDevanagari], tokens, whole) + 2 * score([m.title, m.scriptDevanagari], tokens, whole) }))
    .filter((x) => x.s >= 2 && x.m.id !== 'mod-ai' && x.m.id !== 'mod-admin')
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(({ m }) => ({
      id: m.id,
      kind: m.type === 'module' ? ('module' as const) : ('culture' as const),
      title: m.title,
      subtitle: m.subtitle,
      devanagari: m.scriptDevanagari,
      targetTab: m.targetTab,
    }));

  // Generic words ("Santhal", "tribe") match half the dictionary; ignore them for word hits
  const wordTokens = tokens.filter((t) => !WORD_SKIP.has(t));
  const wordHits = wordTokens.length
    ? words
        .map((w) => {
          const fields = [w.wordRoman, w.wordDevanagari, w.meaningEnglish, w.meaningHindi].map((f) => (f || '').toLowerCase());
          let s = 0;
          for (const t of wordTokens) {
            if (fields.some((f) => f === t)) s += 4;
            else if (t.length >= 3 && fields.some((f) => f.split(/[\s,/;]+/).includes(t))) s += 3;
            else if (t.length >= 4 && fields.some((f) => f.startsWith(t))) s += 1;
          }
          return { w, s };
        })
        .filter((x) => x.s >= 3)
        .sort((a, b) => b.s - a.s)
        .slice(0, 3)
        .map(({ w }) => ({
          id: `word-${w.id}`,
          kind: 'word' as const,
          title: w.wordRoman,
          subtitle: `${w.meaningHindi} · ${w.meaningEnglish}`,
          devanagari: w.wordDevanagari,
          targetTab: 'dashboard' as ActiveDesktopTab,
          word: w,
        }))
    : [];

  return { pages, words: wordHits };
}
