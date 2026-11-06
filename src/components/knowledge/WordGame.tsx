import React, { useMemo, useState } from 'react';
import { Puzzle } from 'lucide-react';
import { KHeader, KCard } from './ui';
import { useAdmin } from '../../context/AdminContext';
import { shuffle } from '../../lib/olchiki';

const seg = (w: string) => { try { return Array.from(new (Intl as any).Segmenter('hi', { granularity: 'grapheme' }).segment(w), (x: any) => x.segment as string); } catch { return Array.from(w); } };

export const WordGame: React.FC = () => {
  const { words } = useAdmin();
  const pool = useMemo(() => words.filter((w) => w.wordDevanagari && w.meaningHindi && !/\s/.test(w.wordDevanagari) && !/\d/.test(w.meaningHindi + w.wordRoman) && seg(w.wordDevanagari).length >= 3 && seg(w.wordDevanagari).length <= 7), [words]);
  const [mode, setMode] = useState<'jod' | 'arth'>('jod');
  const [seed, setSeed] = useState(0);
  const [score, setScore] = useState(0); const [round, setRound] = useState(1);
  const cur = useMemo(() => pool.length ? pool[Math.floor(Math.random() * pool.length)] : null, [pool, seed]); // eslint-disable-line
  const tiles = useMemo(() => cur ? shuffle(seg(cur.wordDevanagari).map((t, i) => ({ t, i }))) : [], [cur]);
  const opts = useMemo(() => cur ? shuffle([cur, ...shuffle(pool.filter((p) => p.meaningHindi !== cur.meaningHindi)).slice(0, 3)]) : [], [cur, pool]);
  const [built, setBuilt] = useState<{ t: string; i: number }[]>([]);
  const [msg, setMsg] = useState('');
  const next = (ok: boolean) => { if (ok) setScore((s) => s + 1); setTimeout(() => { setBuilt([]); setMsg(''); setRound((r) => r + 1); setSeed((x) => x + 1); }, 1100); };
  const tap = (x: { t: string; i: number }) => {
    if (msg) return;
    const b = [...built, x]; setBuilt(b);
    if (b.length === tiles.length) { const ok = b.map((y) => y.t).join('') === cur!.wordDevanagari; setMsg(ok ? '✅ सही!' : `❌ सही शब्द: ${cur!.wordDevanagari}`); next(ok); }
  };
  const pickMeaning = (m: string) => { if (msg) return; const ok = m === cur!.meaningHindi; setMsg(ok ? '✅ सही!' : `❌ सही अर्थ: ${cur!.meaningHindi}`); next(ok); };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <KHeader icon={<Puzzle className="w-8 h-8 text-violet-300" />} title="शब्द पहेली" sub="संताली शब्द जोड़ो या अर्थ पहचानो। शब्द साइट के शब्दकोश से आते हैं।" grad="from-violet-900 via-purple-950 to-slate-900" />
      <div className="flex gap-2 justify-center">
        {([['jod', '🧩 शब्द जोड़ो'], ['arth', '🎯 अर्थ पहचानो']] as const).map(([m, l]) => <button key={m} onClick={() => { setMode(m); setBuilt([]); setMsg(''); setSeed((x) => x + 1); }} className={`px-4 py-2 rounded-full text-sm font-bold ${mode === m ? 'bg-violet-600 text-white' : 'bg-white border border-slate-200'}`}>{l}</button>)}
      </div>
      {!cur ? <KCard><p className="text-sm text-slate-500 text-center">शब्दकोश लोड हो रहा है…</p></KCard> : (
        <KCard>
          <p className="text-xs text-slate-500 text-center">दौर {round} · अंक {score}</p>
          {mode === 'jod' ? (
            <div className="text-center space-y-4 mt-3">
              <p className="text-sm text-slate-600">अर्थ: <b>{cur.meaningHindi}</b>{cur.wordRoman && <span className="text-slate-400"> · संकेत: {cur.wordRoman}</span>}</p>
              <div className="min-h-[56px] flex justify-center gap-2 flex-wrap">{built.map((b, k) => <span key={k} className="px-3 py-2 rounded-lg bg-violet-100 text-2xl font-bold">{b.t}</span>)}</div>
              <div className="flex justify-center gap-2 flex-wrap">{tiles.map((x) => { const used = built.some((b) => b.i === x.i); return <button key={x.i} disabled={used} onClick={() => tap(x)} className={`px-4 py-3 rounded-xl text-2xl font-bold border ${used ? 'opacity-20' : 'bg-white hover:bg-violet-50'}`}>{x.t}</button>; })}</div>
              {!msg && built.length > 0 && <button onClick={() => setBuilt([])} className="text-xs text-slate-500 underline">फिर से जोड़ें</button>}
            </div>
          ) : (
            <div className="text-center space-y-4 mt-3">
              <p className="text-4xl font-black text-violet-800">{cur.wordDevanagari}</p>
              <div className="grid sm:grid-cols-2 gap-2">{opts.map((o) => <button key={o.id} onClick={() => pickMeaning(o.meaningHindi)} className="py-3 px-2 rounded-xl border bg-white hover:bg-violet-50 font-semibold text-sm">{o.meaningHindi}</button>)}</div>
            </div>
          )}
          {msg && <p className="text-center font-bold mt-4">{msg}</p>}
        </KCard>
      )}
    </div>
  );
};
export default WordGame;
