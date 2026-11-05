// Hor Katha Suite — full showcase popup (lazy chunk; opened from the corner card, the Dashboard
// "⌨️ Hor Katha Suite" card, or ?promo=1). All slide visuals are CSS/SVG mocks — no external images.
import React, { useCallback, useEffect, useRef, useState } from 'react';

const SUITE_URL = 'https://horkathasuite.pages.dev/';
const APK_URL = 'https://horkathasuite.pages.dev/download/HorKathaSuite.apk';
const WA_URL = 'https://wa.me/919110977117';
const SLIDE_MS = 4000;

type Slide = { icon: string; title: string; line: string; Mock: React.FC<{ active: boolean }> };

// ── Slide mocks ──────────────────────────────────────────────────────────────
const Frame: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`relative w-full h-full rounded-2xl bg-[#1c0a0a]/60 border border-amber-300/30 overflow-hidden ${className}`}>{children}</div>
);

const LANGS = [
  { k: 'Santali Roman', t: 'Johar! Cet leka menaḱ-a?' },
  { k: 'Santali देवनागरी', t: 'जोहार! चेत् लेका मेनाक्-आ?' },
  { k: 'ᱚᱞ ᱪᱤᱠᱤ', t: 'ᱡᱚᱦᱟᱨ! ᱪᱮᱫ ᱞᱮᱠᱟ' },
  { k: 'हिन्दी', t: 'नमस्ते! आप कैसे हैं?' },
  { k: 'हिन्दी फोनेटिक', t: 'namaste → नमस्ते' },
  { k: 'English', t: 'Hello! How are you?' },
];
const MockLangs: React.FC<{ active: boolean }> = () => (
  <Frame className="p-3 sm:p-4 flex flex-col justify-center gap-1.5">
    {LANGS.map((l, i) => (
      <div key={l.k} className="hk-pop flex items-center gap-2" style={{ animationDelay: `${i * 0.35}s` }}>
        <span className="shrink-0 w-28 sm:w-32 text-[10px] sm:text-[11px] font-black text-amber-300 truncate">{l.k}</span>
        <span className="flex-1 min-w-0 px-2.5 py-1 rounded-lg bg-amber-50 text-[#451a03] text-xs sm:text-sm font-bold truncate">
          {l.t}<span className="hk-caret">|</span>
        </span>
      </div>
    ))}
  </Frame>
);

const PHON = [
  ['namaste', 'नमस्ते'],
  ['mera naam', 'मेरा नाम'],
  ['dhanyavaad', 'धन्यवाद'],
];
const MockPhonetic: React.FC<{ active: boolean }> = ({ active }) => {
  const [step, setStep] = useState(0); // character progress across all words
  useEffect(() => {
    if (!active) { setStep(0); return; }
    const id = setInterval(() => setStep((s) => s + 1), 110);
    return () => clearInterval(id);
  }, [active]);
  // each word: roman typing (len) + 6 ticks showing conversion
  let s = step, idx = 0;
  const cycle = (w: string) => w.length + 8;
  while (s >= cycle(PHON[idx % 3][0])) { s -= cycle(PHON[idx % 3][0]); idx++; }
  const [rom, hin] = PHON[idx % 3];
  const typed = rom.slice(0, Math.min(s, rom.length));
  const done = s >= rom.length;
  return (
    <Frame className="p-4 flex flex-col items-center justify-center gap-3">
      <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-amber-400 text-[#451a03] text-[10px] font-black">Trial / P3 में</span>
      <div className="w-full max-w-xs">
        <p className="text-[10px] font-black text-amber-300 mb-1">Roman में लिखें</p>
        <div className="px-3 py-2 rounded-xl bg-white/95 font-mono text-base text-slate-800 min-h-[2.4rem]">{typed}<span className="hk-caret">|</span></div>
      </div>
      <div className={`text-2xl text-amber-300 transition-transform ${done ? 'scale-110' : 'opacity-50'}`}>↓</div>
      <div className="w-full max-w-xs">
        <p className="text-[10px] font-black text-amber-300 mb-1">अपने आप हिन्दी</p>
        <div className={`px-3 py-2 rounded-xl bg-gradient-to-r from-amber-100 to-amber-300 text-xl font-black text-[#7f1d1d] min-h-[2.6rem] transition-all duration-300 ${done ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>{hin}</div>
      </div>
    </Frame>
  );
};

const KEYS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
const MockTutor: React.FC<{ active: boolean }> = () => (
  <Frame className="p-3 flex flex-col gap-2">
    <div className="flex flex-col items-center gap-1">
      {KEYS.map((row, r) => (
        <div key={r} className="flex gap-1" style={{ marginLeft: r * 10 }}>
          {row.split('').map((k, i) => (
            <span key={k} className={`w-5 h-5 sm:w-6 sm:h-6 rounded text-[9px] sm:text-[10px] font-bold flex items-center justify-center bg-amber-50/90 text-[#451a03] ${(r === 1 && (i === 3 || i === 6)) ? 'hk-key' : ''}`} style={{ animationDelay: `${i * 0.2}s` }}>{k}</span>
          ))}
        </div>
      ))}
      <div className="flex gap-6 mt-1">
        {[0, 1].map((h) => (
          <div key={h} className="flex gap-1 items-end">
            {[10, 14, 16, 13].map((ht, f) => <span key={f} className="w-2.5 rounded-t-full bg-rose-300/80 hk-finger" style={{ height: ht, animationDelay: `${(h * 4 + f) * 0.18}s` }} />)}
          </div>
        ))}
      </div>
    </div>
    <div className="grid grid-cols-3 gap-1.5 text-[10px]">
      <div className="rounded-lg bg-white/10 p-1.5 text-amber-100"><b className="block text-amber-300">🔊 Voice</b>"F दबाएँ"</div>
      <div className="rounded-lg bg-white/10 p-1.5 text-amber-100"><b className="block text-amber-300">Progress</b><span className="block h-1.5 mt-1 rounded bg-white/20 overflow-hidden"><span className="block h-full bg-emerald-400 hk-grow" /></span></div>
      <div className="rounded-lg bg-white/10 p-1.5 text-amber-100"><b className="block text-amber-300">🏆 Leaderboard</b>1. Sumi 42 WPM</div>
    </div>
  </Frame>
);

const MockExam: React.FC<{ active: boolean }> = ({ active }) => {
  const [t, setT] = useState(600);
  useEffect(() => { if (!active) { setT(600); return; } const id = setInterval(() => setT((x) => Math.max(0, x - 1)), 120); return () => clearInterval(id); }, [active]);
  return (
    <Frame className="p-3 grid grid-cols-5 gap-2">
      <div className="col-span-3 rounded-xl bg-white/95 p-2 text-[10px] text-slate-700 relative">
        <div className="flex justify-between font-black text-[#7f1d1d] mb-1"><span>🏛️ SSC / Court Typing</span><span className="font-mono">{String(Math.floor(t / 60)).padStart(2, '0')}:{String(t % 60).padStart(2, '0')}</span></div>
        <p className="leading-relaxed"><span className="bg-emerald-200 hk-hl">भारत एक विशाल देश है जहाँ</span> अनेक भाषाएँ बोली जाती हैं। संताली भाषा ओल चिकी लिपि में लिखी जाती है…</p>
        <div className="mt-1.5 flex gap-2 font-bold"><span>WPM 38</span><span>Accuracy 97%</span></div>
      </div>
      <div className="col-span-2 rounded-xl bg-gradient-to-br from-amber-50 to-amber-200 p-2 border-2 border-amber-500 flex flex-col items-center justify-center text-center hk-pop" style={{ animationDelay: '.6s' }}>
        <span className="text-[9px] font-black tracking-wider text-[#7f1d1d]">CERTIFICATE</span>
        <span className="text-[10px] font-bold text-[#451a03] mt-0.5">Typing Speed Test</span>
        <svg viewBox="0 0 40 40" className="w-9 h-9 mt-1 hk-spin-slow"><circle cx="20" cy="20" r="16" fill="#b45309" /><path d="M13 20l5 5 9-10" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" /></svg>
        <span className="text-[9px] font-black text-emerald-700 mt-0.5">✔ Verified</span>
      </div>
    </Frame>
  );
};

const MockDocs: React.FC<{ active: boolean }> = () => (
  <Frame className="p-3 flex flex-col gap-2 justify-center">
    <div className="flex items-center gap-2">
      <div className="flex-1 rounded-xl bg-white/95 p-2"><p className="text-[9px] font-black text-slate-500">Kruti Dev</p><p className="text-sm font-bold text-slate-800 font-mono">tksgkj] vki dSls gSa\</p></div>
      <span className="text-xl text-amber-300 hk-swap">⇄</span>
      <div className="flex-1 rounded-xl bg-amber-50 p-2"><p className="text-[9px] font-black text-[#7f1d1d]">Unicode</p><p className="text-sm font-bold text-[#451a03]">जोहार, आप कैसे हैं?</p></div>
    </div>
    <div className="rounded-xl bg-white/95 p-2 text-xs text-slate-700">
      <p className="text-[9px] font-black text-slate-500 mb-0.5">✓ Spell-check</p>
      मेरा <span className="hk-squiggle">आवेदण</span> → <b className="text-emerald-700">आवेदन</b> स्वीकार करें।
    </div>
    <div className="flex gap-2 justify-center">
      <span className="hk-pop px-3 py-1 rounded-lg bg-blue-600 text-white text-[11px] font-black" style={{ animationDelay: '.4s' }}>W  Word</span>
      <span className="hk-pop px-3 py-1 rounded-lg bg-rose-600 text-white text-[11px] font-black" style={{ animationDelay: '.7s' }}>PDF</span>
    </div>
  </Frame>
);

const CATS = ['सुविचार', 'त्योहार', 'आवेदन पत्र', 'जन्मदिन', 'सोहराय', 'शोक संदेश', 'विज्ञापन', 'स्कूल', 'शादी', 'नौकरी'];
const MockPoster: React.FC<{ active: boolean }> = () => (
  <Frame className="p-3 flex gap-3 items-center">
    <div className="w-28 sm:w-32 aspect-[3/4] shrink-0 rounded-xl bg-gradient-to-b from-[#7f1d1d] via-[#b45309] to-[#fbbf24] p-2 flex flex-col items-center justify-between text-center shadow-xl hk-float">
      <span className="text-[8px] font-black text-amber-100 tracking-widest">सुविचार</span>
      <svg viewBox="0 0 60 30" className="w-14"><circle cx="30" cy="30" r="16" fill="#fde68a" className="hk-sun" /><path d="M0 30 Q15 18 30 26 T60 22 V30Z" fill="#451a03" /></svg>
      <span className="text-[10px] font-black text-white leading-tight">"शिक्षा ही सबसे बड़ी शक्ति है"</span>
      <span className="text-[7px] text-amber-100">Hor Katha Suite</span>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-2xl font-black text-amber-300">155</p>
      <p className="text-[11px] font-bold text-amber-100 -mt-1 mb-2">categories</p>
      <div className="overflow-hidden"><div className="hk-marquee flex gap-1.5 w-max">
        {[...CATS, ...CATS].map((c, i) => <span key={i} className="px-2 py-0.5 rounded-full bg-amber-100 text-[#7f1d1d] text-[10px] font-bold whitespace-nowrap">{c}</span>)}
      </div></div>
    </div>
  </Frame>
);

// deterministic QR-like pattern
const QR = Array.from({ length: 81 }, (_, i) => ((i * 37 + (i % 7) * 11) % 5) < 2);
const QrSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 9 9" className={className} shapeRendering="crispEdges">
    <rect width="9" height="9" fill="#fff" />
    {QR.map((on, i) => on && <rect key={i} x={i % 9} y={Math.floor(i / 9)} width="1" height="1" fill="#1c0a0a" />)}
    {[[0, 0], [6, 0], [0, 6]].map(([x, y], k) => <g key={k}><rect x={x} y={y} width="3" height="3" fill="#1c0a0a" /><rect x={x + 0.7} y={y + 0.7} width="1.6" height="1.6" fill="#fff" /><rect x={x + 1.1} y={y + 1.1} width="0.8" height="0.8" fill="#1c0a0a" /></g>)}
  </svg>
);
const MockCard: React.FC<{ active: boolean }> = () => (
  <Frame className="p-3 flex items-center justify-center gap-3 [perspective:800px]">
    <div className="relative w-52 h-28 hk-flip [transform-style:preserve-3d]">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#7f1d1d] to-[#451a03] p-2.5 text-amber-50 [backface-visibility:hidden] shadow-xl">
        <p className="text-sm font-black">सुनील हांसदा</p><p className="text-[10px] text-amber-200">Teacher · Dumka</p>
        <p className="text-[10px] mt-3">📞 98XXXXXX10</p><p className="text-[10px]">✉ sunil@example.in</p>
        <span className="absolute right-2.5 top-2.5 w-7 h-7 rounded-full bg-amber-400" />
      </div>
      <div className="absolute inset-0 rounded-xl bg-amber-50 p-2 flex items-center justify-around [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-xl">
        <div className="text-center"><QrSvg className="w-14 h-14" /><p className="text-[8px] font-black text-[#7f1d1d] mt-0.5">UPI</p></div>
        <div className="text-center"><QrSvg className="w-14 h-14 rotate-90" /><p className="text-[8px] font-black text-emerald-700 mt-0.5">WhatsApp</p></div>
      </div>
    </div>
    <div className="text-center"><p className="text-2xl font-black text-amber-300">126</p><p className="text-[11px] font-bold text-amber-100 -mt-1">designs</p></div>
  </Frame>
);

const MockTeacher: React.FC<{ active: boolean }> = () => (
  <Frame className="p-3 grid grid-cols-2 gap-2">
    <div className="rounded-xl bg-white/95 p-2 flex items-end gap-1.5 h-full">
      {[55, 80, 40, 92, 68, 75].map((h, i) => <span key={i} className="flex-1 rounded-t bg-gradient-to-t from-[#7f1d1d] to-amber-500 hk-bar" style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }} />)}
    </div>
    <div className="rounded-xl bg-white/95 p-2 text-[10px] text-slate-700 space-y-1">
      <p className="font-black text-[#7f1d1d]">🏫 कक्षा 8 · 32 छात्र</p>
      {[['Sumi', 42], ['Raju', 37], ['Pinky', 33], ['Manoj', 29]].map(([n, w], i) => (
        <div key={n as string} className="hk-pop flex justify-between border-b border-slate-100 pb-0.5" style={{ animationDelay: `${0.2 + i * 0.2}s` }}><span>{n}</span><b>{w} WPM</b></div>
      ))}
    </div>
  </Frame>
);

const MockOffline: React.FC<{ active: boolean }> = () => (
  <Frame className="p-3 flex items-center justify-center gap-4">
    <div className="w-24 h-40 rounded-[1.2rem] bg-[#1c0a0a] border-[3px] border-amber-400/70 p-1.5 shadow-xl relative overflow-hidden">
      <div className="hk-theme absolute inset-1.5 rounded-xl" />
      <div className="relative flex flex-col gap-1 p-1">
        <span className="text-[8px] font-black text-white/90">Hor Katha Suite</span>
        {[0, 1, 2, 3].map((i) => <span key={i} className="h-2 rounded bg-white/60" style={{ width: `${90 - i * 15}%` }} />)}
        <span className="mt-1 grid grid-cols-5 gap-0.5">{Array.from({ length: 15 }, (_, i) => <span key={i} className="h-2.5 rounded-sm bg-white/70" />)}</span>
      </div>
    </div>
    <div className="space-y-1.5 text-amber-100 text-[11px] font-bold">
      <p className="flex items-center gap-1.5"><svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 8.8a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" /><path d="M3 3l18 18" className="hk-blink" /></svg> Offline चलता है</p>
      <p>🤖 Android App (APK)</p>
      <p className="flex items-center gap-1">🎨 3 Themes <span className="w-3 h-3 rounded-full bg-amber-400" /><span className="w-3 h-3 rounded-full bg-slate-800 border border-white/40" /><span className="w-3 h-3 rounded-full bg-emerald-600" /></p>
    </div>
  </Frame>
);

const SLIDES: Slide[] = [
  { icon: '⌨️', title: '6 भाषाओं में typing', line: 'Santali Roman/देवनागरी, ᱚᱞ ᱪᱤᱠᱤ, हिन्दी, हिन्दी फोनेटिक, English', Mock: MockLangs },
  { icon: '🔤', title: 'हिन्दी फोनेटिक', line: 'Roman में लिखें → अपने आप हिन्दी', Mock: MockPhonetic },
  { icon: '✋', title: 'Typing Tutor', line: 'Finger guide, voice, Progress, Leaderboard', Mock: MockTutor },
  { icon: '🏛️', title: 'Govt Exam Mode', line: 'असली परीक्षा जैसा टेस्ट + verified Certificate', Mock: MockExam },
  { icon: '📄', title: 'Docs Pro', line: 'Kruti Dev ↔ Unicode, Spell-check, Word/PDF', Mock: MockDocs },
  { icon: '🖼️', title: 'Poster Maker', line: '155 categories: सुविचार, त्योहार, आवेदन पत्र', Mock: MockPoster },
  { icon: '🪪', title: 'Visiting Card', line: '126 designs, UPI/WhatsApp QR', Mock: MockCard },
  { icon: '🏫', title: 'Teacher Dashboard', line: 'पूरी कक्षा की typing प्रगति एक जगह', Mock: MockTeacher },
  { icon: '📱', title: 'Offline + Android App', line: 'Internet के बिना भी, 3 Themes', Mock: MockOffline },
];

const PLANS = [
  { id: 'Trial', name: '⭐ Trial', price: '₹9', mrp: '', sub: '7 दिन', feats: ['सब कुछ खुला', '7 दिन पूरा Pro'], best: false },
  { id: 'P1', name: 'P1 Community', price: '₹199', mrp: '₹299', sub: '', feats: ['1 login', 'Word/TXT', 'Kruti Dev'], best: false },
  { id: 'P2', name: 'P2 DTP Cafe', price: '₹399', mrp: '₹499', sub: '', feats: ['3 login', 'IME Map + Script Converter', '1 साल updates'], best: false },
  { id: 'P3', name: 'P3 Ultimate Lifetime', price: '₹999', mrp: '₹1499', sub: '', feats: ['5 login', 'Cloud AI + Typing Test', 'सब कुछ', 'lifetime updates'], best: true },
];

const SuitePromoModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const auto = !reduced && !paused;

  const go = useCallback((d: number) => { setIdx((i) => (i + d + SLIDES.length) % SLIDES.length); setElapsed(0); }, []);

  // autoplay with progress bar (wall-clock based, no nested state updaters)
  const startRef = useRef(Date.now());
  useEffect(() => { startRef.current = Date.now() - elapsed; /* resume where we paused */ // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, auto]);
  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => {
      const e = Date.now() - startRef.current;
      if (e >= SLIDE_MS) { startRef.current = Date.now(); setElapsed(0); setIdx((i) => (i + 1) % SLIDES.length); }
      else setElapsed(e);
    }, 50);
    return () => clearInterval(id);
  }, [auto]);

  // Esc, focus trap, scroll lock, restore focus
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const root = dialogRef.current;
    root?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
      if (e.key === 'ArrowRight' && !(e.target as HTMLElement).closest('input,textarea')) go(1);
      if (e.key === 'ArrowLeft' && !(e.target as HTMLElement).closest('input,textarea')) go(-1);
      if (e.key !== 'Tab' || !root) return;
      const f = Array.from(root.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')).filter((el) => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!root.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = overflow; prev?.focus?.(); };
  }, [onClose, go]);

  const S = SLIDES[idx];
  const cta = 'inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full text-sm font-black shadow-md transition hover:brightness-110 active:scale-[0.98]';

  return (
    <div data-suite-promo className="fixed inset-0 z-[60] bg-[#1c0a0a]/70 backdrop-blur-sm sm:flex sm:items-center sm:justify-center sm:p-4" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <style>{MODAL_CSS}</style>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="hksp-title"
        className={`relative w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-3xl overflow-y-auto sm:rounded-3xl bg-gradient-to-b from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A] shadow-[0_30px_80px_-20px_rgba(127,29,29,0.7)] sm:border-2 sm:border-amber-400 ${reduced ? '' : 'hk-modal-in'}`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center gap-2.5 px-4 sm:px-6 py-3 bg-gradient-to-r from-[#7f1d1d] via-[#991b1b] to-[#b45309] text-amber-50">
          <img src="/assets/aistudio/bosc-main-logo_39d98de6.webp" alt="" width={36} height={36} className="w-9 h-9 rounded-lg bg-white object-contain ring-2 ring-amber-300" />
          <div className="min-w-0 flex-1">
            <h2 id="hksp-title" className="text-base sm:text-lg font-black leading-tight">⌨️ Hor Katha Suite</h2>
            <p className="text-[11px] text-amber-200 leading-tight truncate">संताली · हिन्दी · English typing का पूरा सूट — BOSC Tech &amp; Edu</p>
          </div>
          <button data-autofocus onClick={onClose} className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-lg font-black cursor-pointer" aria-label="बंद करें (Esc)" title="बंद करें (Esc)">✕</button>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* (1) Video-like slideshow */}
          <section aria-roledescription="carousel" aria-label="Features" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
            className="relative rounded-3xl bg-gradient-to-br from-[#451a03] via-[#7f1d1d] to-[#451a03] p-3 sm:p-4 shadow-xl ring-2 ring-amber-400/60">
            <div className="h-1 rounded-full bg-white/15 overflow-hidden mb-3" aria-hidden>
              <div className="h-full bg-gradient-to-r from-amber-300 to-amber-500" style={{ width: `${reduced ? 100 : (elapsed / SLIDE_MS) * 100}%` }} />
            </div>
            <div key={idx} className={`grid sm:grid-cols-5 gap-3 items-center ${reduced ? '' : 'hk-slide'}`} aria-live="polite">
              <div className="sm:col-span-2 text-amber-50">
                <p className="text-[10px] font-black tracking-[0.2em] text-amber-300">{idx + 1} / {SLIDES.length}</p>
                <h3 className="text-xl sm:text-2xl font-black mt-1"><span className="mr-1.5">{S.icon}</span>{S.title}</h3>
                <p className="text-xs sm:text-sm text-amber-100/90 mt-1 leading-snug">{S.line}</p>
              </div>
              <div className="sm:col-span-3 h-48 sm:h-52"><S.Mock active /></div>
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <button onClick={() => go(-1)} className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-amber-50 font-black cursor-pointer" aria-label="पिछला">‹</button>
              <div className="flex gap-1.5 flex-wrap justify-center">
                {SLIDES.map((s, i) => (
                  <button key={s.title} onClick={() => { setIdx(i); setElapsed(0); }} aria-label={s.title} aria-current={i === idx}
                    className={`h-2 rounded-full transition-all cursor-pointer ${i === idx ? 'w-6 bg-amber-400' : 'w-2 bg-white/35 hover:bg-white/60'}`} />
                ))}
              </div>
              <button onClick={() => go(1)} className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-amber-50 font-black cursor-pointer" aria-label="अगला">›</button>
            </div>
            {paused && !reduced && <span className="absolute top-3 right-4 text-[10px] font-black text-amber-200">❚❚ रुका</span>}
          </section>

          {/* (2) Feature grid */}
          <section>
            <h3 className="text-sm font-black text-[#7f1d1d] mb-2">✨ क्या-क्या मिलता है</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SLIDES.map((s, i) => (
                <button key={s.title} onClick={() => { setIdx(i); setElapsed(0); dialogRef.current?.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }); }}
                  className="text-left rounded-2xl bg-white/80 border border-amber-300 p-2.5 hover:shadow-md hover:border-amber-500 transition cursor-pointer">
                  <span className="text-xl">{s.icon}</span>
                  <p className="text-xs font-black text-[#451a03] mt-0.5">{s.title}</p>
                  <p className="text-[10.5px] text-[#78350f] leading-snug">{s.line}</p>
                </button>
              ))}
            </div>
          </section>

          {/* (3) Plans */}
          <section>
            <h3 className="text-sm font-black text-[#7f1d1d] mb-2">💎 प्लान चुनें</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
              {PLANS.map((p) => (
                <div key={p.id} className={`relative rounded-2xl p-3 flex flex-col ${p.best ? 'bg-gradient-to-b from-[#7f1d1d] to-[#451a03] text-amber-50 ring-2 ring-amber-400 shadow-xl lg:scale-[1.03]' : 'bg-white/85 border border-amber-300 text-[#451a03]'}`}>
                  {p.best && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-amber-400 text-[#451a03] text-[10px] font-black shadow">🏆 Best</span>}
                  <p className={`text-xs font-black ${p.best ? 'text-amber-300' : 'text-[#7f1d1d]'}`}>{p.name}</p>
                  <p className="mt-1 flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-2xl font-black">{p.price}</span>
                    {p.mrp && <s className={`text-xs ${p.best ? 'text-amber-200' : 'text-slate-500'}`}>MRP {p.mrp}</s>}
                    {p.sub && <span className="text-xs font-bold">/ {p.sub}</span>}
                  </p>
                  <ul className="mt-1.5 space-y-0.5 text-[11px] leading-snug">
                    {p.feats.map((f) => <li key={f}>✓ {f}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* (4) CTAs */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <a href={SUITE_URL} target="_blank" rel="noopener noreferrer" className={`${cta} bg-gradient-to-r from-[#7f1d1d] via-[#991b1b] to-[#b45309] text-amber-50 sm:col-span-2 text-base ${reduced ? '' : 'hk-pulse'}`}>🚀 ₹9 में Trial शुरू करें</a>
            <a href={SUITE_URL} target="_blank" rel="noopener noreferrer" className={`${cta} bg-amber-400 text-[#451a03]`}>🌐 Suite खोलें</a>
            <a href={APK_URL} target="_blank" rel="noopener noreferrer" className={`${cta} bg-[#451a03] text-amber-100`}>📱 App Download</a>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className={`${cta} bg-emerald-600 text-white sm:col-span-2`}>💬 WhatsApp</a>
          </section>

          {/* (5) Footer */}
          <p className="text-center text-xs font-bold text-[#7f1d1d] bg-white/70 border border-dashed border-amber-500 rounded-2xl py-2.5 px-3">🎁 दोस्त का Referral code हो तो 10% छूट</p>
        </div>
      </div>
    </div>
  );
};

const MODAL_CSS = `
.hk-modal-in{animation:hk-modal-in .35s cubic-bezier(.2,.9,.3,1.1) both}
@keyframes hk-modal-in{from{opacity:0;transform:translateY(20px) scale(.97)}to{opacity:1;transform:none}}
.hk-slide{animation:hk-slide .45s ease both}
@keyframes hk-slide{from{opacity:0;transform:translateX(18px)}to{opacity:1;transform:none}}
.hk-pop{animation:hk-pop .45s ease both}
@keyframes hk-pop{from{opacity:0;transform:translateY(8px) scale(.96)}to{opacity:1;transform:none}}
.hk-caret{animation:hk-blink 1s steps(1) infinite;color:#b45309;margin-left:1px}
.hk-blink{animation:hk-blink 1.2s steps(1) infinite}
@keyframes hk-blink{50%{opacity:0}}
.hk-key{animation:hk-key 1.2s ease-in-out infinite}
@keyframes hk-key{0%,100%{background:#fffbeb}50%{background:#fbbf24;transform:translateY(1px)}}
.hk-finger{animation:hk-finger 1.6s ease-in-out infinite;transform-origin:bottom}
@keyframes hk-finger{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.75)}}
.hk-grow{animation:hk-grow 3.5s ease-out both}
@keyframes hk-grow{from{width:5%}to{width:82%}}
.hk-hl{animation:hk-hl 3.5s linear both;background-size:200% 100%}
@keyframes hk-hl{from{background:transparent}to{background:#a7f3d0}}
.hk-spin-slow{animation:hk-spin 6s linear infinite}
@keyframes hk-spin{to{transform:rotate(360deg)}}
.hk-swap{animation:hk-swap 1.4s ease-in-out infinite}
@keyframes hk-swap{0%,100%{transform:translateX(-3px)}50%{transform:translateX(3px)}}
.hk-squiggle{text-decoration:underline wavy #e11d48;text-underline-offset:3px}
.hk-float{animation:hk-float 3s ease-in-out infinite}
@keyframes hk-float{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-5px) rotate(1deg)}}
.hk-sun{animation:hk-sun 3s ease-in-out infinite}
@keyframes hk-sun{0%,100%{transform:translateY(4px)}50%{transform:translateY(-2px)}}
.hk-marquee{animation:hk-marquee 9s linear infinite}
@keyframes hk-marquee{to{transform:translateX(-50%)}}
.hk-flip{animation:hk-flip 4s ease-in-out infinite}
@keyframes hk-flip{0%,35%{transform:rotateY(0)}50%,85%{transform:rotateY(180deg)}100%{transform:rotateY(360deg)}}
.hk-bar{animation:hk-bar .9s cubic-bezier(.2,.9,.3,1.2) both;transform-origin:bottom}
@keyframes hk-bar{from{transform:scaleY(0)}to{transform:scaleY(1)}}
.hk-theme{animation:hk-theme 4.5s steps(1) infinite}
@keyframes hk-theme{0%{background:linear-gradient(#b45309,#7f1d1d)}33%{background:linear-gradient(#1e293b,#0f172a)}66%{background:linear-gradient(#059669,#064e3b)}}
.hk-pulse{animation:hk-pulse 2s ease-in-out infinite}
@keyframes hk-pulse{0%,100%{box-shadow:0 0 0 0 rgba(251,191,36,.6)}50%{box-shadow:0 0 0 8px rgba(251,191,36,0)}}
@media (prefers-reduced-motion: reduce){[class*="hk-"]{animation:none!important;transition:none!important}}
`;

export default SuitePromoModal;
