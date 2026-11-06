import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Share2, Download } from 'lucide-react';
import { KHeader, KCard } from './ui';
import { useAdmin } from '../../context/AdminContext';

const THEMES = [['#7c2d12', '#f59e0b'], ['#14532d', '#84cc16'], ['#1e3a8a', '#06b6d4'], ['#581c87', '#ec4899']];
const GREETINGS: [string, string][] = [['सोहराय', 'सोहराय पर्व की हार्दिक शुभकामनाएँ'], ['बाहा', 'बाहा पर्व की हार्दिक शुभकामनाएँ'], ['करम', 'करम पर्व की हार्दिक शुभकामनाएँ'], ['हूल दिवस', 'हूल दिवस पर सिदो-कान्हू को नमन'], ['भाषा दिवस', 'संताली भाषा विजय दिवस की शुभकामनाएँ']];
const SITE = 'horkathasantali.pages.dev';

const wrap = (g: CanvasRenderingContext2D, t: string, x: number, y: number, max: number, lh: number) => {
  const w = t.split(' '); let line = ''; let yy = y;
  for (const word of w) { const test = line ? line + ' ' + word : word; if (g.measureText(test).width > max && line) { g.fillText(line, x, yy); line = word; yy += lh; } else line = test; }
  if (line) g.fillText(line, x, yy); return yy;
};

export const ShareCards: React.FC = () => {
  const { words } = useAdmin();
  const [kind, setKind] = useState<'word' | 'greet' | 'own'>('word');
  const [theme, setTheme] = useState(0);
  const [g, setG] = useState(0);
  const [own, setOwn] = useState('Johar! ');
  const [from, setFrom] = useState('');
  const dayIdx = Math.floor(Date.now() / 86400000);
  const pool = useMemo(() => words.filter((w) => w.wordDevanagari && w.meaningHindi && !/\d/.test(w.meaningHindi + w.wordRoman + w.wordDevanagari)), [words]);
  const [wi, setWi] = useState(0);
  const word = pool.length ? pool[(dayIdx + wi) % pool.length] : null;
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current; if (!c) return; const x = c.getContext('2d')!;
    const [a, b] = THEMES[theme]; const gr = x.createLinearGradient(0, 0, 1080, 1080); gr.addColorStop(0, a); gr.addColorStop(1, b);
    x.fillStyle = gr; x.fillRect(0, 0, 1080, 1080);
    x.strokeStyle = 'rgba(255,255,255,.5)'; x.lineWidth = 6; x.strokeRect(40, 40, 1000, 1000);
    x.textAlign = 'center'; x.fillStyle = '#fff';
    x.font = 'bold 40px sans-serif'; x.fillText('Hor Katha Santali', 540, 130);
    if (kind === 'word' && word) {
      x.font = '34px sans-serif'; x.fillText('आज का संताली शब्द', 540, 260);
      x.font = 'bold 130px sans-serif'; x.fillText(word.wordDevanagari, 540, 450);
      if (word.wordRoman) { x.font = 'italic 44px sans-serif'; x.fillText(word.wordRoman, 540, 530); }
      x.font = 'bold 54px sans-serif'; wrap(x, `अर्थ: ${word.meaningHindi}`, 540, 660, 880, 66);
      if (word.meaningEnglish) { x.font = '38px sans-serif'; wrap(x, word.meaningEnglish, 540, 780, 880, 48); }
    } else if (kind === 'greet') {
      x.font = 'bold 120px sans-serif'; x.fillText('Johar!', 540, 380);
      x.font = 'bold 64px sans-serif'; wrap(x, GREETINGS[g][1], 540, 560, 880, 80);
    } else {
      x.font = 'bold 66px sans-serif'; wrap(x, own || ' ', 540, 400, 880, 84);
    }
    if (from) { x.font = '40px sans-serif'; x.fillText(`— ${from}`, 540, 920); }
    x.font = '30px sans-serif'; x.fillStyle = 'rgba(255,255,255,.85)'; x.fillText(SITE, 540, 995);
  }, [kind, theme, g, own, from, word]);

  const blob = () => new Promise<Blob>((res) => ref.current!.toBlob((b) => res(b!), 'image/png'));
  const download = () => { const a = document.createElement('a'); a.href = ref.current!.toDataURL('image/png'); a.download = 'HorKatha-card.png'; a.click(); };
  const share = async () => {
    const file = new File([await blob()], 'HorKatha-card.png', { type: 'image/png' });
    const text = `Hor Katha Santali पर संताली सीखें: https://${SITE}`;
    if ((navigator as any).canShare?.({ files: [file] })) { try { await navigator.share({ files: [file], text }); return; } catch { return; } }
    download(); window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <KHeader icon={<Share2 className="w-8 h-8 text-green-300" />} title="WhatsApp शेयर कार्ड" sub="आज का शब्द, त्योहार की शुभकामना या अपना संदेश: सुंदर तस्वीर बनाकर एक क्लिक में शेयर करें।" grad="from-green-900 via-emerald-950 to-slate-900" />
      <div className="grid md:grid-cols-2 gap-5">
        <KCard>
          <div className="flex flex-wrap gap-2 mb-3">
            {([['word', 'आज का शब्द'], ['greet', 'शुभकामना'], ['own', 'अपना संदेश']] as const).map(([k, l]) => <button key={k} onClick={() => setKind(k)} className={`px-3 py-1.5 rounded-full text-sm font-bold ${kind === k ? 'bg-green-600 text-white' : 'bg-slate-100'}`}>{l}</button>)}
          </div>
          {kind === 'word' && <button onClick={() => setWi((x) => x + 1)} className="text-sm font-bold text-green-700 underline mb-3">दूसरा शब्द ↻</button>}
          {kind === 'greet' && <select value={g} onChange={(e) => setG(+e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm mb-3">{GREETINGS.map(([n], i) => <option key={n} value={i}>{n}</option>)}</select>}
          {kind === 'own' && <textarea value={own} maxLength={140} onChange={(e) => setOwn(e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm mb-3" />}
          <input value={from} maxLength={30} onChange={(e) => setFrom(e.target.value)} placeholder="आपका नाम (वैकल्पिक)" className="w-full border rounded-lg px-3 py-2 text-sm mb-3" />
          <div className="flex gap-2 mb-4">{THEMES.map(([a, b], i) => <button key={i} onClick={() => setTheme(i)} aria-label={`रंग ${i + 1}`} className={`w-9 h-9 rounded-full border-4 ${theme === i ? 'border-slate-800' : 'border-white'}`} style={{ background: `linear-gradient(135deg,${a},${b})` }} />)}</div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={share} className="px-5 py-2 rounded-full bg-green-600 text-white font-bold inline-flex items-center gap-2"><Share2 className="w-4 h-4" /> शेयर करें</button>
            <button onClick={download} className="px-5 py-2 rounded-full bg-slate-800 text-white font-bold inline-flex items-center gap-2"><Download className="w-4 h-4" /> डाउनलोड</button>
          </div>
        </KCard>
        <canvas ref={ref} width={1080} height={1080} className="w-full rounded-2xl shadow-lg" />
      </div>
    </div>
  );
};
export default ShareCards;
