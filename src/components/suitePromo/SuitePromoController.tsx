// Hor Katha Suite showcase — the small golden corner card + its polite scheduler.
// Lazy chunk, mounted on idle by App. The full popup (SuitePromoModal) is a further lazy chunk,
// fetched only when the user asks for it.
import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { isAIPanelOpen } from '../horKathaAI/shared';
import { OPEN_SUITE_PROMO_EVENT, promoUrlParam, setSuitePromoListening, takePendingSuitePromo } from './events';

const SuitePromoModal = lazy(() => import('./SuitePromoModal'));

const FIRST_DELAY = 2 * 60 * 1000;     // first card 2 min after load
const GAP = 30 * 60 * 1000;            // then every 30 min
const MAX_PER_DAY = 3;
const MAX_DISMISS = 2;                 // after 2 ✕ in a day → done for the day
const AUTO_HIDE = 10 * 1000;
const TYPING_QUIET = 20 * 1000;        // never within 20 s of typing
const BLOCK_RETRY = 60 * 1000;         // retry 60 s after a blocker clears
const TICK = 5 * 1000;
const STORE = 'hk_suite_promo_v1';

export const PROMO_MESSAGES = [
  '⌨️ जोहार! संताली में टाइप करना है? Hor Katha Suite पर ओल चिकी, देवनागरी और रोमन में आसान typing।',
  '🔤 हिन्दी फोनेटिक: रोमन में लिखें, अपने आप हिन्दी में बदलें!',
  '📄 चिट्ठी, आवेदन, पोस्टर संताली में बनाइए।',
  '⭐ सिर्फ़ ₹9 में 7 दिन का Pro trial।',
  '📱 मोबाइल पर भी, internet के बिना भी।',
];

type Day = { date: string; shown: number; dismissed: number; hideToday: boolean; lastShownAt: number; msg: number };
const today = () => { const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; };
function readDay(): Day {
  let d: Partial<Day> = {};
  try { d = JSON.parse(localStorage.getItem(STORE) || '{}'); } catch { /* ignore */ }
  const base = { lastShownAt: d.lastShownAt || 0, msg: d.msg || 0 };
  if (d.date !== today()) return { date: today(), shown: 0, dismissed: 0, hideToday: false, ...base };
  return { date: today(), shown: d.shown || 0, dismissed: d.dismissed || 0, hideToday: !!d.hideToday, ...base };
}
function writeDay(patch: Partial<Day>) {
  const next = { ...readDay(), ...patch };
  try { localStorage.setItem(STORE, JSON.stringify(next)); } catch { /* private mode */ }
  return next;
}

// ── Media tracking: catches <audio>/<video> in the DOM *and* detached `new Audio()` players ──
const playing = new Set<HTMLMediaElement>();
let mediaPatched = false;
function patchMedia() {
  if (mediaPatched || typeof HTMLMediaElement === 'undefined') return;
  mediaPatched = true;
  const orig = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function (this: HTMLMediaElement, ...args: []) {
    playing.add(this);
    return orig.apply(this, args);
  };
}
function mediaBusy() {
  try { if (window.speechSynthesis?.speaking) return true; } catch { /* ignore */ }
  for (const m of playing) { if (!m.paused && !m.ended) return true; playing.delete(m); }
  const els = document.querySelectorAll('audio,video');
  for (let i = 0; i < els.length; i++) { const m = els[i] as HTMLMediaElement; if (!m.paused && !m.ended) return true; }
  return false;
}

const isEditable = (el: Element | null) =>
  !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || (el as HTMLElement).isContentEditable);

function modalOpen() {
  const nodes = document.querySelectorAll('[aria-modal="true"], [role="dialog"], [role="alertdialog"]');
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i] as HTMLElement;
    if (n.closest('[data-suite-promo]')) continue;
    if (n.offsetParent !== null || getComputedStyle(n).position === 'fixed') return true;
  }
  return false;
}

interface Props {
  /** App-level blockers: an App modal is open, or a quiz/test tab is active */
  blocked: boolean;
}

const SuitePromoController: React.FC<Props> = ({ blocked }) => {
  const [cardVisible, setCardVisible] = useState(false);
  const [modalOpenState, setModalOpen] = useState(false);
  const [msg, setMsg] = useState(0);
  const lastTypeAt = useRef(0);
  const lastBlockedAt = useRef(0);
  const blockedRef = useRef(blocked);
  blockedRef.current = blocked;
  const loadAt = useRef(Date.now() - (typeof performance !== 'undefined' ? performance.now() : 0));
  const hovered = useRef(false);
  const shownAt = useRef(0);
  const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const isBlocked = useCallback(() => {
    const now = Date.now();
    return (
      blockedRef.current ||
      document.hidden ||
      isAIPanelOpen() ||
      isEditable(document.activeElement) ||
      now - lastTypeAt.current < TYPING_QUIET ||
      modalOpen() ||
      mediaBusy()
    );
  }, []);

  const openFull = useCallback(() => { setCardVisible(false); setModalOpen(true); }, []);

  // Open-event bridge (Dashboard card) + ?promo= test param
  useEffect(() => {
    patchMedia();
    setSuitePromoListening(true);
    const onOpen = () => openFull();
    window.addEventListener(OPEN_SUITE_PROMO_EVENT, onOpen);
    if (takePendingSuitePromo()) openFull();
    const p = promoUrlParam();
    if (p === '1' || p === 'full') openFull();
    else if (p === 'card') { setMsg(readDay().msg % PROMO_MESSAGES.length); shownAt.current = Date.now(); setCardVisible(true); }
    return () => { setSuitePromoListening(false); window.removeEventListener(OPEN_SUITE_PROMO_EVENT, onOpen); };
  }, [openFull]);

  // Typing detector (any input / textarea / contenteditable)
  useEffect(() => {
    const onKey = (e: Event) => { if (isEditable(e.target as Element)) lastTypeAt.current = Date.now(); };
    document.addEventListener('keydown', onKey, true);
    document.addEventListener('input', onKey, true);
    return () => { document.removeEventListener('keydown', onKey, true); document.removeEventListener('input', onKey, true); };
  }, []);

  // Scheduler
  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      if (cardVisible) {
        // a blocker appeared while showing (typing, modal, media) → step aside quietly (not a dismissal)
        if (isBlocked()) { setCardVisible(false); lastBlockedAt.current = now; return; }
        if (!hovered.current && now - shownAt.current >= AUTO_HIDE) setCardVisible(false);
        return;
      }
      if (modalOpenState) return;
      const d = readDay();
      if (d.hideToday || d.shown >= MAX_PER_DAY || d.dismissed >= MAX_DISMISS) return;
      const due = Math.max(loadAt.current + FIRST_DELAY, d.lastShownAt + GAP);
      if (now < due) return;
      if (isBlocked()) { lastBlockedAt.current = now; return; }
      if (now - lastBlockedAt.current < BLOCK_RETRY) return;
      const m = d.msg % PROMO_MESSAGES.length;
      writeDay({ shown: d.shown + 1, lastShownAt: now, msg: d.msg + 1 });
      setMsg(m);
      shownAt.current = now;
      setCardVisible(true);
    };
    const id = setInterval(tick, cardVisible ? 1000 : TICK);
    return () => clearInterval(id);
  }, [cardVisible, modalOpenState, isBlocked]);

  // Rotate the one-line message while the card is up
  useEffect(() => {
    if (!cardVisible) return;
    const id = setInterval(() => setMsg((i) => (i + 1) % PROMO_MESSAGES.length), 3500);
    return () => clearInterval(id);
  }, [cardVisible]);

  const dismiss = () => { const d = readDay(); writeDay({ dismissed: d.dismissed + 1 }); setCardVisible(false); };
  const hideToday = () => { writeDay({ hideToday: true }); setCardVisible(false); };

  return (
    <>
      <style>{CARD_CSS}</style>
      {cardVisible && (
        <div
          data-suite-promo
          role="complementary"
          aria-label="Hor Katha Suite"
          onMouseEnter={() => { hovered.current = true; }}
          onMouseLeave={() => { hovered.current = false; shownAt.current = Math.max(shownAt.current, Date.now() - AUTO_HIDE + 3000); }}
          className={`hksp-card fixed z-40 left-3 bottom-3 sm:left-5 sm:bottom-5 w-[calc(100vw-1.5rem)] max-w-[340px] rounded-2xl p-[2px] ${reduced ? '' : 'hksp-in'}`}
        >
          <div className="relative rounded-[14px] bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A] p-3 pr-9 overflow-hidden">
            <span aria-hidden className={`hksp-shine pointer-events-none absolute inset-0 ${reduced ? 'hidden' : ''}`} />
            <button onClick={dismiss} className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full text-[#7f1d1d] hover:bg-amber-200/80 flex items-center justify-center text-sm font-black cursor-pointer" aria-label="बंद करें" title="बंद करें">✕</button>
            <div className="flex gap-2.5 items-start">
              <img src="/assets/aistudio/bosc-main-logo_39d98de6.webp" alt="BOSC" width={44} height={44} className={`w-11 h-11 rounded-xl bg-white object-contain ring-2 ring-amber-400 shadow shrink-0 ${reduced ? '' : 'hksp-bob'}`} />
              <div className="min-w-0">
                <p className="text-[10px] font-black tracking-[0.16em] text-[#7f1d1d] uppercase">Hor Katha Suite</p>
                <p key={msg} className={`text-[12.5px] leading-snug font-bold text-[#451a03] mt-0.5 min-h-[2.6em] ${reduced ? '' : 'hksp-msg'}`} aria-live="polite">{PROMO_MESSAGES[msg]}</p>
              </div>
            </div>
            <div className="mt-2.5 flex items-center gap-2">
              <button onClick={openFull} className="flex-1 px-3 py-2 rounded-full bg-gradient-to-r from-[#7f1d1d] via-[#991b1b] to-[#b45309] text-amber-50 text-xs font-black shadow-md hover:brightness-110 cursor-pointer">✨ पूरी जानकारी देखें</button>
            </div>
            <button onClick={hideToday} className="mt-1.5 w-full text-[10.5px] font-bold text-[#92400e] hover:underline cursor-pointer">आज न दिखाएँ</button>
          </div>
        </div>
      )}
      {modalOpenState && (
        <Suspense fallback={null}>
          <SuitePromoModal onClose={() => setModalOpen(false)} />
        </Suspense>
      )}
    </>
  );
};

const CARD_CSS = `
.hksp-card{background:linear-gradient(135deg,#f59e0b,#fde68a,#b45309,#fbbf24);box-shadow:0 0 0 1px rgba(180,83,9,.25),0 12px 30px -10px rgba(127,29,29,.55),0 0 22px rgba(251,191,36,.55)}
.hksp-in{animation:hksp-in .5s cubic-bezier(.2,.9,.3,1.2) both;box-shadow:0 0 0 1px rgba(180,83,9,.25),0 12px 30px -10px rgba(127,29,29,.55),0 0 18px rgba(251,191,36,.45)}
@keyframes hksp-in{from{opacity:0;transform:translateY(24px) scale(.96)}to{opacity:1;transform:none}}
/* glow pulse: a pre-painted shadow layer fading in/out (compositor only) instead of animating box-shadow every frame */
.hksp-in::after{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;box-shadow:0 0 34px rgba(251,191,36,.85),0 0 0 1px rgba(180,83,9,.35);opacity:0;animation:hksp-glow 2.6s ease-in-out .5s infinite;will-change:opacity}
@keyframes hksp-glow{0%,100%{opacity:0}50%{opacity:1}}
.hksp-bob{animation:hksp-bob 3s ease-in-out infinite}
@keyframes hksp-bob{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-3px) rotate(-3deg)}}
.hksp-msg{animation:hksp-msg .45s ease both}
@keyframes hksp-msg{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
/* shine sweep moved by transform (same path as the old background-position sweep) so it does not repaint the card */
.hksp-shine{width:250%;right:auto!important;background:linear-gradient(110deg,transparent 35%,rgba(255,255,255,.55) 50%,transparent 65%);animation:hksp-shine 3.2s ease-in-out infinite;will-change:transform}
@keyframes hksp-shine{0%{transform:translateX(-90%)}60%,100%{transform:translateX(36%)}}
@media (prefers-reduced-motion: reduce){.hksp-in,.hksp-bob,.hksp-msg,.hksp-shine{animation:none!important}}
@media (prefers-reduced-motion: reduce){.hksp-in::after{animation:none!important}}
html.lite .hksp-in::after,html.lite .hksp-bob,html.lite .hksp-shine{animation:none!important}
html.hks-hidden .hksp-in::after{animation-play-state:paused}
`;

export default SuitePromoController;
