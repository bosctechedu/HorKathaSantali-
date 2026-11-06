import React, { useMemo, useState } from 'react';
import { Award, Flame, Download } from 'lucide-react';
import { KHeader, KCard } from './ui';
import { OL_LETTERS, shuffle } from '../../lib/olchiki';
import { getStreak } from '../../lib/streak';

const BADGES: [number, string][] = [[3, '🌱 3 दिन'], [7, '🌿 7 दिन'], [30, '🌳 30 दिन'], [100, '🏆 100 दिन']];
const makeTest = () => shuffle(OL_LETTERS).slice(0, 10).map((l) => ({ l, opts: shuffle([l, ...shuffle(OL_LETTERS.filter((x) => x.char !== l.char)).slice(0, 3)]) }));

const drawCert = (name: string, score: number) => {
  const c = document.createElement('canvas'); c.width = 1600; c.height = 1130;
  const g = c.getContext('2d')!;
  g.fillStyle = '#fffbeb'; g.fillRect(0, 0, 1600, 1130);
  g.strokeStyle = '#b45309'; g.lineWidth = 14; g.strokeRect(40, 40, 1520, 1050);
  g.strokeStyle = '#f59e0b'; g.lineWidth = 3; g.strokeRect(70, 70, 1460, 990);
  g.textAlign = 'center'; g.fillStyle = '#7c2d12';
  g.font = 'bold 44px sans-serif'; g.fillText('Hor Katha Santali', 800, 170);
  g.font = 'bold 72px sans-serif'; g.fillText('प्रमाणपत्र', 800, 280);
  g.fillStyle = '#334155'; g.font = '36px sans-serif'; g.fillText('यह प्रमाणित किया जाता है कि', 800, 390);
  g.fillStyle = '#b45309'; g.font = 'bold 76px sans-serif'; g.fillText(name, 800, 500);
  g.fillStyle = '#334155'; g.font = '36px sans-serif';
  g.fillText('ने ओल चिकी लिपि के अक्षर पहचान परीक्षा', 800, 600);
  g.fillText(`10 में से ${score} अंक के साथ सफलतापूर्वक पास की है।`, 800, 655);
  g.font = '64px sans-serif'; g.fillText(OL_LETTERS.slice(0, 10).map((l) => l.char).join(' '), 800, 790);
  g.font = '30px sans-serif'; g.fillStyle = '#64748b';
  g.fillText(`तारीख़: ${new Date().toLocaleDateString('hi-IN')}`, 400, 950); g.fillText('BOSC Tech & Edu', 1200, 950);
  g.font = '22px sans-serif'; g.fillText('horkathasantali.pages.dev', 800, 1020);
  const a = document.createElement('a'); a.href = c.toDataURL('image/png'); a.download = `HorKatha-Certificate-${name.replace(/\s+/g, '-')}.png`; a.click();
};

export const MyProgress: React.FC = () => {
  const s = useMemo(getStreak, []);
  const [test, setTest] = useState(makeTest);
  const [i, setI] = useState(0); const [score, setScore] = useState(0); const [pick, setPick] = useState<string | null>(null);
  const [name, setName] = useState('');
  const done = i >= test.length;
  const answer = (ch: string) => { if (pick) return; setPick(ch); if (ch === test[i].l.char) setScore((x) => x + 1); setTimeout(() => { setPick(null); setI((x) => x + 1); }, 700); };
  const restart = () => { setTest(makeTest()); setI(0); setScore(0); setPick(null); };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <KHeader icon={<Award className="w-8 h-8 text-amber-300" />} title="मेरी प्रगति और प्रमाणपत्र" sub="रोज़ आने का हिसाब, इनाम (badge), और ओल चिकी परीक्षा पास करके अपने नाम का प्रमाणपत्र।" grad="from-amber-800 via-orange-900 to-stone-900" />
      <div className="grid grid-cols-3 gap-3">
        {[['लगातार दिन', s.count], ['सबसे लंबा', s.best], ['कुल दिन', s.total]].map(([l, v]) => (
          <div key={l as string} className="bg-white rounded-2xl border border-slate-200 p-4 text-center"><p className="text-3xl font-black text-orange-600 inline-flex items-center gap-1">{l === 'लगातार दिन' && <Flame className="w-6 h-6" />}{v}</p><p className="text-xs text-slate-500">{l}</p></div>
        ))}
      </div>
      <KCard title="इनाम">
        <div className="flex flex-wrap gap-2">{BADGES.map(([n, b]) => <span key={n} className={`px-3 py-1.5 rounded-full text-sm font-bold ${s.best >= n ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'}`}>{b}</span>)}</div>
        <p className="text-[11px] text-slate-400 mt-2">यह हिसाब इसी फ़ोन/ब्राउज़र में रहता है। रोज़ साइट खोलने पर गिनती बढ़ती है।</p>
      </KCard>
      <KCard title="ओल चिकी अक्षर परीक्षा (10 प्रश्न, पास: 8)">
        {!done ? (
          <div className="text-center">
            <p className="text-xs text-slate-500">प्रश्न {i + 1} / 10 · अंक {score}</p>
            <p className="text-7xl my-4">{test[i].l.char}</p>
            <p className="text-sm text-slate-600 mb-3">इस अक्षर का नाम क्या है?</p>
            <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
              {test[i].opts.map((o) => <button key={o.char} onClick={() => answer(o.char)} className={`py-3 rounded-xl border font-bold ${pick ? (o.char === test[i].l.char ? 'bg-emerald-100 border-emerald-400' : o.char === pick ? 'bg-rose-100 border-rose-400' : 'bg-white') : 'bg-white hover:bg-amber-50'}`}>{o.hindi} ({o.roman})</button>)}
            </div>
          </div>
        ) : score >= 8 ? (
          <div className="text-center space-y-3">
            <p className="text-lg font-black text-emerald-700">🎉 बधाई! आपके {score}/10 अंक आए।</p>
            <input value={name} onChange={(e) => setName(e.target.value.slice(0, 40))} placeholder="प्रमाणपत्र पर आपका नाम" className="border border-slate-300 rounded-lg px-3 py-2 w-full max-w-sm" />
            <div><button disabled={name.trim().length < 2} onClick={() => drawCert(name.trim(), score)} className="px-5 py-2 rounded-full bg-amber-600 text-white font-bold inline-flex items-center gap-2 disabled:opacity-50"><Download className="w-4 h-4" /> प्रमाणपत्र डाउनलोड करें</button></div>
          </div>
        ) : (
          <div className="text-center space-y-3"><p className="font-bold text-slate-700">आपके {score}/10 अंक आए। पास होने के लिए 8 चाहिए।</p><button onClick={restart} className="px-5 py-2 rounded-full bg-slate-800 text-white font-bold">फिर से कोशिश करें</button></div>
        )}
      </KCard>
    </div>
  );
};
export default MyProgress;
