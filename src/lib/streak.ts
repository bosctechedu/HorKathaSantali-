// रोज़ के अभ्यास का हिसाब (केवल इसी फ़ोन/ब्राउज़र में, localStorage)
const KEY = 'hk_streak_v1';
export type Streak = { last: string; count: number; best: number; total: number };
const day = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const getStreak = (): Streak => { try { return { last: '', count: 0, best: 0, total: 0, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return { last: '', count: 0, best: 0, total: 0 }; } };
export const recordVisit = () => {
  try {
    const s = getStreak(), today = day();
    if (s.last === today) return s;
    const y = new Date(); y.setDate(y.getDate() - 1);
    const count = s.last === day(y) ? s.count + 1 : 1;
    const n = { last: today, count, best: Math.max(s.best, count), total: s.total + 1 };
    localStorage.setItem(KEY, JSON.stringify(n));
    return n;
  } catch { return getStreak(); }
};
