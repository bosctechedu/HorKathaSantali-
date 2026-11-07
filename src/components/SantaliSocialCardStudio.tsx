import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Share2,
  Download,
  Copy,
  Check,
  Sparkles,
  Volume2,
  RefreshCw,
  Palette,
  Layout,
  Type,
  MessageCircle,
  Image as ImageIcon,
  Heart,
  Sliders,
  ShieldCheck,
  Plus,
  Trash2,
  RotateCcw,
  Search,
  Dice5,
  Dices,
  SlidersHorizontal,
  Printer
} from 'lucide-react';
import { speakWithFemaleVoice } from '../utils/speech';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import { SANTALI_100_QUOTES, SocialCardQuote } from '../data/santaliSocialQuotesData';
import { encodeQr, buildUpiUri } from '../utils/qrcode';
import {
  CARD_SIZES,
  CardAspectId,
  CardAlign,
  CardCorner,
  CardCustomization,
  DEFAULT_CUSTOMIZATION,
  DEFAULT_TOP_LINE,
  DEFAULT_BOTTOM_LINE,
  IMAGES_STORAGE_KEY,
  MAX_PERSIST_IMAGE_CHARS,
  PhotoShape,
  QrMode,
  SETTINGS_STORAGE_KEY,
  cornerXY,
  drawContain,
  drawCover,
  fileToDataUrl,
  hexA,
  loadImage,
  luminance,
  roundRectPath,
  sanitizeCustomization,
  shapePath,
  FESTIVAL_POSTERS,
  FestivalPoster,
  festivalDaysAway
} from './socialCard/cardCustomization';

export type CardThemeId =
  | 'terracotta'
  | 'forest'
  | 'ochre'
  | 'night_sky'
  | 'sohrai_white'
  | 'palas_crimson'
  | 'royal_indigo'
  | 'iron_forge'
  | 'golden_harvest'
  | 'river_turquoise'
  | 'sandal_wood'
  | 'vintage_parchment';

export type CardBorderId =
  | 'sohrai_geometric'
  | 'dancing_chain'
  | 'sal_leaves'
  | 'bow_arrow'
  | 'tumdak_tamak'
  | 'peacock_birds'
  | 'minimal_gold'
  | 'clean_frame';

export type CardFontId = 'serif_classical' | 'modern_bold' | 'folk_traditional';

export const CARD_THEMES: {
  id: CardThemeId;
  label: string;
  subLabel: string;
  previewBg: string;
  textColor: string;
  accent: string;
}[] = [
  { id: 'terracotta', label: 'मिट्टी-गेरू', subLabel: 'Terracotta Clay', previewBg: 'bg-[#5C1D11]', textColor: '#FFFBEB', accent: '#FCD34D' },
  { id: 'forest', label: 'साल वन', subLabel: 'Sal Forest Emerald', previewBg: 'bg-[#0E3B24]', textColor: '#ECFDF5', accent: '#34D399' },
  { id: 'ochre', label: 'हल्दी पीला', subLabel: 'Turmeric Ochre', previewBg: 'bg-[#854D0E]', textColor: '#FEFCE8', accent: '#FEF08A' },
  { id: 'night_sky', label: 'नक्षत्र आकाश', subLabel: 'Midnight Celestial', previewBg: 'bg-[#09152C]', textColor: '#EFF6FF', accent: '#93C5FD' },
  { id: 'sohrai_white', label: 'सोहराय खड़िया', subLabel: 'Chalk White', previewBg: 'bg-[#FAF7F2] border border-stone-300', textColor: '#1C1917', accent: '#782618' },
  { id: 'palas_crimson', label: 'पलाश दहक', subLabel: 'Palash Crimson', previewBg: 'bg-[#7F1D1D]', textColor: '#FEF2F2', accent: '#FCA5A5' },
  { id: 'royal_indigo', label: 'नील गहरा', subLabel: 'Royal Indigo', previewBg: 'bg-[#1E1B4B]', textColor: '#EEF2FF', accent: '#A5B4FC' },
  { id: 'iron_forge', label: 'कामार लौह', subLabel: 'Charcoal Iron', previewBg: 'bg-[#18181B]', textColor: '#FAFAFA', accent: '#F59E0B' },
  { id: 'golden_harvest', label: 'सुनहरी धान', subLabel: 'Golden Harvest', previewBg: 'bg-[#78350F]', textColor: '#FFFBEB', accent: '#FDE047' },
  { id: 'river_turquoise', label: 'निर्मल नदी', subLabel: 'River Turquoise', previewBg: 'bg-[#134E4A]', textColor: '#F0FDFA', accent: '#5EEAD4' },
  { id: 'sandal_wood', label: 'चंदन भूरा', subLabel: 'Warm Sandal', previewBg: 'bg-[#451A03]', textColor: '#FEF3C7', accent: '#FBBF24' },
  { id: 'vintage_parchment', label: 'प्राचीन साकाम', subLabel: 'Vintage Parchment', previewBg: 'bg-[#422006]', textColor: '#FEF9C3', accent: '#EAB308' },
];

export const CARD_BORDERS: { id: CardBorderId; label: string; desc: string }[] = [
  { id: 'sohrai_geometric', label: 'सोहराय त्रिकोण', desc: 'Sohrai zigzag & chevron' },
  { id: 'dancing_chain', label: 'एनेच शृंखला', desc: 'Dancing chain line' },
  { id: 'sal_leaves', label: 'सरजोम लताएं', desc: 'Sal leaf vine borders' },
  { id: 'bow_arrow', label: 'तीर-धनुष', desc: 'Bow & arrow warrior motif' },
  { id: 'tumdak_tamak', label: 'मांदर-नगाड़ा', desc: 'Rhythm pad boundary' },
  { id: 'peacock_birds', label: 'मयूर व वन-पक्षी', desc: 'Peacock Sohrai art' },
  { id: 'minimal_gold', label: 'स्वर्ण रेखा', desc: 'Royal golden double line' },
  { id: 'clean_frame', label: 'सरल स्वच्छ', desc: 'Clean modern frame' },
];

export const CARD_EMBLEMS = [
  { symbol: '🪔', label: 'दिया (Diya)' },
  { symbol: '🌿', label: 'साल पत्ता (Sal Leaf)' },
  { symbol: '🏹', label: 'धनुष-बाण (Bow)' },
  { symbol: '🌸', label: 'बाहा फूल (Flower)' },
  { symbol: '☀️', label: 'सिं बोंगा (Sun)' },
  { symbol: '🌕', label: 'कुनामी चांद (Moon)' },
  { symbol: '🎵', label: 'तुमाक संगीत (Music)' },
  { symbol: '🛡️', label: 'पारिस ढाल (Shield)' },
  { symbol: '✨', label: 'दिव्य ज्योति (Sparkle)' },
  { symbol: '🐂', label: 'गोधन (Cattle)' },
  { symbol: '🌾', label: 'धान बाली (Grain)' },
  { symbol: '🏛️', label: 'मांझी थान (Shrine)' }
];

const THEME_GRADIENT_STOPS: Record<CardThemeId, [number, string][]> = {
  terracotta: [[0, '#4A150D'], [0.5, '#682014'], [1, '#340C06']],
  forest: [[0, '#062817'], [0.5, '#0E3B24'], [1, '#04170D']],
  ochre: [[0, '#5A3407'], [0.5, '#78430A'], [1, '#361D02']],
  night_sky: [[0, '#060E1E'], [0.5, '#0B1E40'], [1, '#02060E']],
  sohrai_white: [[0, '#FAF7F2'], [1, '#F3EFEA']],
  palas_crimson: [[0, '#5C0F0F'], [0.5, '#7F1D1D'], [1, '#3D0707']],
  royal_indigo: [[0, '#131135'], [0.5, '#1E1B4B'], [1, '#09081E']],
  iron_forge: [[0, '#121214'], [0.5, '#202024'], [1, '#09090B']],
  golden_harvest: [[0, '#451D04'], [0.5, '#713F12'], [1, '#2E1201']],
  river_turquoise: [[0, '#0B2F2C'], [0.5, '#134E4A'], [1, '#051917']],
  sandal_wood: [[0, '#311202'], [0.5, '#4E2106'], [1, '#200A01']],
  vintage_parchment: [[0, '#2D1604'], [0.5, '#452206'], [1, '#1A0C01']]
};

interface SavedDesign {
  theme: CardThemeId;
  borderStyle: CardBorderId;
  emblem: string;
  aspectRatio: CardAspectId;
  fontStyle: CardFontId;
  showRoman: boolean;
  showHindi: boolean;
  showBranding: boolean;
  showEmblem: boolean;
}

const DEFAULT_DESIGN: SavedDesign = {
  theme: 'terracotta',
  borderStyle: 'sohrai_geometric',
  emblem: '🪔',
  aspectRatio: 'square',
  fontStyle: 'serif_classical',
  showRoman: true,
  showHindi: true,
  showBranding: true,
  showEmblem: true
};

function loadSavedSettings(): { design: SavedDesign; custom: CardCustomization } {
  const raw = safeLoadFromStorage<{ design?: Partial<SavedDesign>; custom?: unknown } | null>(
    SETTINGS_STORAGE_KEY,
    null
  );
  const d = (raw && raw.design) || {};
  const design: SavedDesign = {
    theme: CARD_THEMES.some((t) => t.id === d.theme) ? (d.theme as CardThemeId) : DEFAULT_DESIGN.theme,
    borderStyle: CARD_BORDERS.some((b) => b.id === d.borderStyle)
      ? (d.borderStyle as CardBorderId)
      : DEFAULT_DESIGN.borderStyle,
    emblem: CARD_EMBLEMS.some((e) => e.symbol === d.emblem) ? (d.emblem as string) : DEFAULT_DESIGN.emblem,
    aspectRatio: CARD_SIZES.some((s) => s.id === d.aspectRatio)
      ? (d.aspectRatio as CardAspectId)
      : DEFAULT_DESIGN.aspectRatio,
    fontStyle: ['serif_classical', 'modern_bold', 'folk_traditional'].includes(d.fontStyle as string)
      ? (d.fontStyle as CardFontId)
      : DEFAULT_DESIGN.fontStyle,
    showRoman: typeof d.showRoman === 'boolean' ? d.showRoman : true,
    showHindi: typeof d.showHindi === 'boolean' ? d.showHindi : true,
    showBranding: typeof d.showBranding === 'boolean' ? d.showBranding : true,
    showEmblem: typeof d.showEmblem === 'boolean' ? d.showEmblem : true
  };
  return { design, custom: sanitizeCustomization(raw && raw.custom) };
}

type ImageSlot = 'bg' | 'photo' | 'logo';

// ---------- small light-themed form controls (defined outside the component so sliders keep focus while dragging) ----------
const SubHead: React.FC<{ children: React.ReactNode; right?: React.ReactNode }> = ({ children, right }) => (
  <div className="flex items-center justify-between gap-2 pt-3 border-t border-stone-100 first:border-t-0 first:pt-0">
    <h4 className="font-black text-slate-800 text-[12px]">{children}</h4>
    {right}
  </div>
);

const RangeField: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (v: number) => void;
  testId?: string;
}> = ({ label, value, min, max, step = 1, suffix = '%', onChange, testId }) => (
  <label className="block">
    <span className="flex items-center justify-between font-semibold text-slate-700 text-[11px] mb-0.5">
      <span>{label}</span>
      <span className="text-amber-800 font-black tabular-nums">
        {value}
        {suffix}
      </span>
    </span>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      data-testid={testId}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-6 accent-amber-600 cursor-pointer"
    />
  </label>
);

const ColorField: React.FC<{
  label: string;
  value: string;
  fallback: string;
  onChange: (v: string) => void;
  testId?: string;
}> = ({ label, value, fallback, onChange, testId }) => (
  <label className="block">
    <span className="block font-semibold text-slate-700 text-[11px] mb-0.5">
      {label} {!value && <span className="text-slate-400 font-normal">(थीम)</span>}
    </span>
    <input
      type="color"
      value={value || fallback}
      data-testid={testId}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-9 rounded-xl border border-slate-200 bg-slate-50 p-1 cursor-pointer"
    />
  </label>
);

function ChoiceRow<T extends string>({
  options,
  value,
  onChange,
  cols = 3
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  cols?: number;
}) {
  const gridCols: Record<number, string> = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-3 sm:grid-cols-5'
  };
  return (
    <div className={`grid ${gridCols[cols] || 'grid-cols-3'} gap-1.5`}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          className={`px-2 py-1.5 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
            value === o.id
              ? 'bg-amber-100 border-amber-400 text-amber-950 ring-1 ring-amber-500'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const CheckRow: React.FC<{ checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode; testId?: string }> = ({
  checked,
  onChange,
  children,
  testId
}) => (
  <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700 text-[11px]">
    <input
      type="checkbox"
      checked={checked}
      data-testid={testId}
      onChange={(e) => onChange(e.target.checked)}
      className="rounded text-amber-600 focus:ring-amber-500"
    />
    <span>{children}</span>
  </label>
);

const inputCls =
  'w-full p-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none';

const fileBtnCls =
  'block w-full text-[11px] text-slate-600 file:mr-2 file:px-3 file:py-1.5 file:rounded-xl file:border-0 file:bg-amber-100 file:text-amber-900 file:font-bold hover:file:bg-amber-200 file:cursor-pointer cursor-pointer';

const CORNER_OPTIONS: { id: CardCorner; label: string }[] = [
  { id: 'tl', label: '↖ ऊपर-बाएं' },
  { id: 'tr', label: '↗ ऊपर-दाएं' },
  { id: 'bl', label: '↙ नीचे-बाएं' },
  { id: 'br', label: '↘ नीचे-दाएं' }
];

export const SantaliSocialCardStudio: React.FC = () => {
  const { isAdmin } = useAdmin();
  const [quotes, setQuotes] = useState<SocialCardQuote[]>(() =>
    safeLoadFromStorage('hor_katha_social_quotes_db', SANTALI_100_QUOTES)
  );

  const [saved] = useState(loadSavedSettings);

  const [selectedQuoteId, setSelectedQuoteId] = useState<string>(quotes[0]?.id || 'sq_1');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customMode, setCustomMode] = useState<boolean>(false);

  // Custom text states
  const [customDevanagari, setCustomDevanagari] = useState('आबो रोड़, आबो उपरुम, आबो गोरोब।');
  const [customRoman, setCustomRoman] = useState('Abo Ror, Abo Uprum, Abo Gorob.');
  const [customHindi, setCustomHindi] = useState('हमारी भाषा, हमारी पहचान, हमारा स्वाभिमान।');
  const [customAuthor, setCustomAuthor] = useState('होड़ काथा संताली');

  // Styling options (Over 100+ design presets)
  const [theme, setTheme] = useState<CardThemeId>(saved.design.theme);
  const [borderStyle, setBorderStyle] = useState<CardBorderId>(saved.design.borderStyle);
  const [emblem, setEmblem] = useState<string>(saved.design.emblem);
  const [aspectRatio, setAspectRatio] = useState<CardAspectId>(saved.design.aspectRatio);
  const [fontStyle, setFontStyle] = useState<CardFontId>(saved.design.fontStyle);

  // Toggles
  const [showRoman, setShowRoman] = useState<boolean>(saved.design.showRoman);
  const [showHindi, setShowHindi] = useState<boolean>(saved.design.showHindi);
  const [showBranding, setShowBranding] = useState<boolean>(saved.design.showBranding);
  const [showEmblem, setShowEmblem] = useState<boolean>(saved.design.showEmblem);

  // 🎛️ Full customization
  const [custom, setCustom] = useState<CardCustomization>(saved.custom);
  const [customOpen, setCustomOpen] = useState<boolean>(false);
  const upd = <K extends keyof CardCustomization>(key: K, val: CardCustomization[K]) =>
    setCustom((c) => ({ ...c, [key]: val }));

  // Uploaded images (kept in memory; persisted to localStorage only when small enough)
  const [imgUrls, setImgUrls] = useState<Partial<Record<ImageSlot, string>>>({});
  const [bgImg, setBgImg] = useState<HTMLImageElement | null>(null);
  const [photoImg, setPhotoImg] = useState<HTMLImageElement | null>(null);
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);
  const [imgNote, setImgNote] = useState<string>('');
  const [fontsTick, setFontsTick] = useState(0);

  // Canvas ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Current active quote
  const currentQuote =
    quotes.find((q) => q.id === selectedQuoteId) || quotes[0] || SANTALI_100_QUOTES[0];

  const activeDev = customMode ? customDevanagari : currentQuote.santaliDevanagari;
  const activeRoman = customMode ? customRoman : currentQuote.santaliRoman;
  const activeHindi = customMode ? customHindi : currentQuote.hindiMeaning;
  const activeAuthor = customMode ? customAuthor : currentQuote.authorOrSource;

  const sizeObj = CARD_SIZES.find((s) => s.id === aspectRatio) || CARD_SIZES[0];

  // QR payload + matrix
  const qrPayload = useMemo(() => {
    if (custom.qrMode === 'link') return custom.qrText.trim();
    if (custom.qrMode === 'upi') {
      if (!/^[\w.\-]{2,}@[a-zA-Z][\w]{1,}$/.test(custom.upiId.trim())) return '';
      return buildUpiUri(custom.upiId, custom.upiName, custom.upiAmount);
    }
    return '';
  }, [custom.qrMode, custom.qrText, custom.upiId, custom.upiName, custom.upiAmount]);

  const qrMatrix = useMemo(() => {
    if (!qrPayload) return null;
    try {
      return encodeQr(qrPayload, 'M');
    } catch {
      return null;
    }
  }, [qrPayload]);

  // Restore saved (small) images once
  useEffect(() => {
    const stored = safeLoadFromStorage<Partial<Record<ImageSlot, string>>>(IMAGES_STORAGE_KEY, {});
    if (!stored || typeof stored !== 'object') return;
    const urls: Partial<Record<ImageSlot, string>> = {};
    (['bg', 'photo', 'logo'] as ImageSlot[]).forEach((slot) => {
      const u = stored[slot];
      if (typeof u === 'string' && u.startsWith('data:image/')) urls[slot] = u;
    });
    setImgUrls(urls);
    loadImage(urls.bg).then((i) => i && setBgImg(i));
    loadImage(urls.photo).then((i) => i && setPhotoImg(i));
    loadImage(urls.logo).then((i) => i && setLogoImg(i));
  }, []);

  // Redraw once web fonts finish loading (Devanagari / Ol Chiki glyphs)
  useEffect(() => {
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (fonts && fonts.ready) {
      fonts.ready.then(() => setFontsTick((t) => t + 1)).catch(() => undefined);
    }
  }, []);

  // Persist design + customization settings
  useEffect(() => {
    safeSaveToStorage(SETTINGS_STORAGE_KEY, {
      design: {
        theme,
        borderStyle,
        emblem,
        aspectRatio,
        fontStyle,
        showRoman,
        showHindi,
        showBranding,
        showEmblem
      },
      custom
    });
  }, [theme, borderStyle, emblem, aspectRatio, fontStyle, showRoman, showHindi, showBranding, showEmblem, custom]);

  const persistImages = (urls: Partial<Record<ImageSlot, string>>) => {
    const toSave: Partial<Record<ImageSlot, string>> = {};
    let skipped = false;
    (Object.keys(urls) as ImageSlot[]).forEach((slot) => {
      const u = urls[slot];
      if (!u) return;
      if (u.length <= MAX_PERSIST_IMAGE_CHARS) toSave[slot] = u;
      else skipped = true;
    });
    let ok = safeSaveToStorage(IMAGES_STORAGE_KEY, toSave);
    if (!ok && toSave.bg) {
      // Quota exceeded: drop the (largest) background and retry
      delete toSave.bg;
      skipped = true;
      ok = safeSaveToStorage(IMAGES_STORAGE_KEY, toSave);
    }
    setImgNote(
      skipped || !ok
        ? 'ℹ️ बड़ी इमेज केवल इस सत्र में रहेगी (ब्राउज़र में सेव नहीं हुई)।'
        : ''
    );
  };

  const handleImageUpload = async (slot: ImageSlot, file: File | undefined) => {
    if (!file || !file.type.startsWith('image/')) return;
    try {
      const url =
        slot === 'bg'
          ? await fileToDataUrl(file, 1800, 'image/jpeg', 0.85)
          : slot === 'photo'
          ? await fileToDataUrl(file, 900, 'image/jpeg', 0.88)
          : await fileToDataUrl(file, 600, 'image/png');
      const img = await loadImage(url);
      if (!img) return;
      if (slot === 'bg') setBgImg(img);
      else if (slot === 'photo') setPhotoImg(img);
      else setLogoImg(img);
      setImgUrls((prev) => {
        const next = { ...prev, [slot]: url };
        persistImages(next);
        return next;
      });
    } catch (err) {
      console.warn('[Social Card] image upload failed', err);
    }
  };

  const removeImage = (slot: ImageSlot) => {
    if (slot === 'bg') setBgImg(null);
    else if (slot === 'photo') setPhotoImg(null);
    else setLogoImg(null);
    setImgUrls((prev) => {
      const next = { ...prev };
      delete next[slot];
      persistImages(next);
      return next;
    });
  };

  // Photo corner presets → X/Y percentages for the current canvas size
  const setPhotoCorner = (corner: CardCorner) => {
    const W = sizeObj.w;
    const H = sizeObj.h;
    const U = Math.min(W, H);
    const margin = Math.round(Math.min(W * 0.045, U * 0.07));
    const s = (U * custom.photoSize) / 100;
    const inset = margin + 28;
    const cx = corner === 'tl' || corner === 'bl' ? inset + s / 2 : W - inset - s / 2;
    const cy = corner === 'tl' || corner === 'tr' ? inset + s / 2 : H - inset - s / 2;
    setCustom((c) => ({
      ...c,
      photoCorner: corner,
      photoX: Math.round((cx / W) * 100),
      photoY: Math.round((cy / H) * 100)
    }));
  };

  const resetColors = () =>
    setCustom((c) => ({ ...c, colorText: '', colorAccent: '', colorSecondary: '' }));

  const resetBackground = () => {
    setCustom((c) => ({
      ...c,
      gradOn: false,
      grad1: DEFAULT_CUSTOMIZATION.grad1,
      grad2: DEFAULT_CUSTOMIZATION.grad2,
      bgOverlay: DEFAULT_CUSTOMIZATION.bgOverlay
    }));
    removeImage('bg');
  };

  const resetAllCustomization = () => {
    setCustom({ ...DEFAULT_CUSTOMIZATION });
    setBgImg(null);
    setPhotoImg(null);
    setLogoImg(null);
    setImgUrls({});
    safeSaveToStorage(IMAGES_STORAGE_KEY, {});
    setImgNote('');
  };

  // Filtered quotes based on category and search query
  const filteredQuotes = quotes.filter((q) => {
    const matchesCat = categoryFilter === 'all' || q.category === categoryFilter;
    const qText = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !qText ||
      q.santaliDevanagari.toLowerCase().includes(qText) ||
      q.santaliRoman.toLowerCase().includes(qText) ||
      q.hindiMeaning.toLowerCase().includes(qText) ||
      q.authorOrSource.toLowerCase().includes(qText);
    return matchesCat && matchesSearch;
  });

  // 🎉 त्योहार poster: one tap fills theme, border, emblem, top line and the greeting text
  const [activeFestival, setActiveFestival] = useState<string | null>(null);
  const applyFestivalPoster = (p: FestivalPoster) => {
    const q = SANTALI_100_QUOTES.find((x) => x.id === p.quoteId);
    if (CARD_THEMES.some((t) => t.id === p.theme)) setTheme(p.theme as CardThemeId);
    if (CARD_BORDERS.some((b) => b.id === p.border)) setBorderStyle(p.border as CardBorderId);
    if (CARD_EMBLEMS.some((e) => e.symbol === p.emblem)) setEmblem(p.emblem);
    setShowEmblem(true);
    setShowRoman(true);
    setShowHindi(true);
    setCustomDevanagari(q ? q.santaliDevanagari : 'जोहार!');
    setCustomRoman(q ? q.santaliRoman : 'Johar!');
    setCustomHindi(q ? q.hindiMeaning : p.headline);
    setCustomMode(true);
    setCustom((c) => ({
      ...c,
      topLineOn: true,
      topLine: `${p.emoji} ${p.headline}`,
      gradOn: false,
      colorText: '',
      colorAccent: p.accent || '',
      colorSecondary: ''
    }));
    setActiveFestival(p.id);
  };

  // Random design generator (Surprise Me!)
  const handleRandomizeDesign = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const randomTheme = CARD_THEMES[Math.floor(Math.random() * CARD_THEMES.length)].id;
    const randomBorder = CARD_BORDERS[Math.floor(Math.random() * CARD_BORDERS.length)].id;
    const randomEmblem = CARD_EMBLEMS[Math.floor(Math.random() * CARD_EMBLEMS.length)].symbol;

    setSelectedQuoteId(randomQuote.id);
    setTheme(randomTheme);
    setBorderStyle(randomBorder);
    setEmblem(randomEmblem);
    setCustomMode(false);
  };

  // Redraw canvas whenever any state changes
  useEffect(() => {
    drawCanvas();
  }, [
    activeDev,
    activeRoman,
    activeHindi,
    activeAuthor,
    theme,
    borderStyle,
    emblem,
    aspectRatio,
    fontStyle,
    showRoman,
    showHindi,
    showBranding,
    showEmblem,
    custom,
    bgImg,
    photoImg,
    logoImg,
    qrMatrix,
    fontsTick
  ]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dimensions
    const width = sizeObj.w;
    const height = sizeObj.h;
    const U = Math.min(width, height);
    const sb = sizeObj.scale;

    canvas.width = width;
    canvas.height = height;

    // Background themes
    const themeObj = CARD_THEMES.find((t) => t.id === theme) || CARD_THEMES[0];

    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    if (custom.gradOn) {
      bgGrad.addColorStop(0, custom.grad1);
      bgGrad.addColorStop(1, custom.grad2);
    } else {
      (THEME_GRADIENT_STOPS[theme] || THEME_GRADIENT_STOPS.terracotta).forEach(([o, c]) =>
        bgGrad.addColorStop(o, c)
      );
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Own background image (cover-fit) with theme/gradient overlay on top
    if (bgImg) {
      drawCover(ctx, bgImg, 0, 0, width, height);
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(0.9, custom.bgOverlay / 100));
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }

    const isLightBg = custom.gradOn
      ? (luminance(custom.grad1) + luminance(custom.grad2)) / 2 > 0.45
      : theme === 'sohrai_white';

    // Colours (custom overrides → theme defaults)
    const defaultAccent = isLightBg ? '#782618' : theme === 'sohrai_white' ? '#FCD34D' : themeObj.accent;
    const primaryColor = custom.colorAccent || defaultAccent;
    const secondaryColor = custom.colorAccent
      ? hexA(custom.colorAccent, 0.4)
      : isLightBg
      ? 'rgba(120, 38, 24, 0.4)'
      : 'rgba(252, 211, 77, 0.35)';
    const mainTextColor = custom.colorText || (isLightBg ? '#1C1917' : '#FFFBEB');
    const romanColor = custom.colorAccent || (isLightBg ? '#78350F' : defaultAccent);
    const hindiColor = custom.colorSecondary || (isLightBg ? '#44403C' : '#FEF3C7');
    const footerColor = custom.colorSecondary
      ? hexA(custom.colorSecondary, 0.85)
      : isLightBg
      ? '#78716C'
      : 'rgba(254, 243, 199, 0.7)';
    const haloFill = custom.colorAccent
      ? hexA(custom.colorAccent, 0.12)
      : isLightBg
      ? 'rgba(120,38,24,0.08)'
      : 'rgba(252,211,77,0.14)';
    const quoteMarkColor = custom.colorAccent
      ? hexA(custom.colorAccent, 0.38)
      : isLightBg
      ? 'rgba(120,38,24,0.3)'
      : 'rgba(252,211,77,0.38)';

    // Decorative Margins
    const margin = Math.round(Math.min(width * 0.045, U * 0.07));

    // BORDER STYLES
    if (borderStyle === 'sohrai_geometric') {
      ctx.lineWidth = 4;
      ctx.strokeStyle = primaryColor;
      ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = secondaryColor;
      ctx.strokeRect(margin + 12, margin + 12, width - margin * 2 - 24, height - margin * 2 - 24);

      const cornerPts = [
        [margin + 12, margin + 12],
        [width - margin - 12, margin + 12],
        [margin + 12, height - margin - 12],
        [width - margin - 12, height - margin - 12]
      ];
      cornerPts.forEach(([cx, cy]) => {
        ctx.fillStyle = primaryColor;
        ctx.beginPath();
        ctx.arc(cx, cy, 7, 0, Math.PI * 2);
        ctx.fill();
      });
    } else if (borderStyle === 'dancing_chain') {
      ctx.lineWidth = 3;
      ctx.strokeStyle = primaryColor;
      ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);

      ctx.fillStyle = primaryColor;
      for (let x = margin + 25; x < width - margin - 25; x += 35) {
        ctx.beginPath();
        ctx.arc(x, margin + 12, 3.5, 0, Math.PI * 2);
        ctx.arc(x, height - margin - 12, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (borderStyle === 'sal_leaves') {
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = primaryColor;
      ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);
      ctx.strokeStyle = secondaryColor;
      ctx.lineWidth = 1;
      ctx.strokeRect(margin + 16, margin + 16, width - margin * 2 - 32, height - margin * 2 - 32);
    } else if (borderStyle === 'bow_arrow') {
      ctx.lineWidth = 4;
      ctx.strokeStyle = primaryColor;
      ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);
    } else {
      ctx.lineWidth = 3;
      ctx.strokeStyle = primaryColor;
      ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);
      ctx.lineWidth = 1;
      ctx.strokeStyle = secondaryColor;
      ctx.strokeRect(margin + 10, margin + 10, width - margin * 2 - 20, height - margin * 2 - 20);
    }

    // ---------- corner items (sizes needed to keep footer clear) ----------
    const inset = margin + 28;
    const qrBox = qrMatrix ? Math.round((U * custom.qrSize) / 100) : 0;
    const qrCaption =
      custom.qrCaption.trim() ||
      (custom.qrMode === 'upi' ? 'UPI से भुगतान करें' : custom.qrMode === 'link' ? 'स्कैन करें' : '');
    const qrLabH = qrMatrix && qrCaption ? Math.round(qrBox * 0.2) : 0;
    const logoBox = logoImg ? Math.round((U * custom.logoSize) / 100) : 0;
    let bottomReserveSide = 0;
    if (qrMatrix && (custom.qrCorner === 'bl' || custom.qrCorner === 'br'))
      bottomReserveSide = Math.max(bottomReserveSide, qrBox + 16);
    if (logoImg && (custom.logoCorner === 'bl' || custom.logoCorner === 'br'))
      bottomReserveSide = Math.max(bottomReserveSide, logoBox + 16);

    // Typography setup
    let devFontFamily = 'serif';
    if (fontStyle === 'modern_bold') {
      devFontFamily = '"Noto Sans Devanagari", sans-serif';
    } else if (fontStyle === 'folk_traditional') {
      devFontFamily = '"Tiro Devanagari Hindi", serif';
    } else {
      devFontFamily = '"Noto Serif Devanagari", Georgia, serif';
    }

    const align = custom.align;
    const canvasAlign: CanvasTextAlign = align === 'left' ? 'left' : align === 'right' ? 'right' : 'center';
    const anchorX = align === 'left' ? margin * 2 : align === 'right' ? width - margin * 2 : width / 2;
    // On wide formats (FB cover / 16:9) keep the text column clear of corner QR / logo
    const sideItem = Math.max(qrMatrix ? qrBox : 0, logoImg ? logoBox : 0);
    const sideReserve = width / height > 1.4 && sideItem ? sideItem + 24 : 0;
    const maxContentWidth = Math.max(240, width - margin * 4 - sideReserve * 2);

    const setLetterSpacing = (v: string) => {
      const c = ctx as CanvasRenderingContext2D & { letterSpacing?: string };
      if ('letterSpacing' in c) c.letterSpacing = v;
    };

    // Footer / name line positions
    const footerY = height - margin - 35 * sb;
    const nameText = custom.nameOn ? custom.nameLine.trim() : '';
    const bottomText = showBranding ? custom.bottomLine.trim() : '';
    const nameY = bottomText ? footerY - 38 * sb : footerY;
    const contentTop = margin + 40 * sb;
    const contentBottom =
      nameText ? nameY - 40 * sb : bottomText ? footerY - 40 * sb : height - margin - 40 * sb;
    const available = Math.max(60, contentBottom - contentTop);

    const fillLine = (text: string, x: number, y: number, draw: boolean) => {
      if (draw) ctx.fillText(text, x, y);
    };

    /** Lays out (and optionally draws) the central text stack; returns bottom y. */
    const renderStack = (k: number, top: number, draw: boolean): number => {
      const s = sb * k;
      let y = top;
      ctx.textBaseline = 'middle';
      ctx.textAlign = canvasAlign;

      if (showEmblem) {
        const r = 46 * s;
        y += r;
        if (draw) {
          const ex = align === 'left' ? anchorX + r : align === 'right' ? anchorX - r : anchorX;
          ctx.save();
          ctx.shadowColor = 'transparent';
          ctx.fillStyle = haloFill;
          ctx.beginPath();
          ctx.arc(ex, y, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = primaryColor;
          ctx.lineWidth = 2.5 * Math.max(0.6, s);
          ctx.stroke();
          ctx.font = `${Math.round(38 * s)}px serif`;
          ctx.textAlign = 'center';
          ctx.fillStyle = mainTextColor;
          ctx.fillText(emblem, ex, y);
          ctx.restore();
          ctx.textAlign = canvasAlign;
          ctx.textBaseline = 'middle';
        }
        y += 80 * s;
      } else {
        y += 15 * s;
      }

      // Top line (editable)
      if (custom.topLineOn && custom.topLine.trim()) {
        let px = Math.round(22 * s);
        ctx.font = `bold ${px}px sans-serif`;
        setLetterSpacing(`${Math.max(1, Math.round(3 * s))}px`);
        while (ctx.measureText(custom.topLine).width > maxContentWidth && px > 10) {
          px--;
          ctx.font = `bold ${px}px sans-serif`;
        }
        ctx.fillStyle = primaryColor;
        fillLine(custom.topLine.trim(), anchorX, y, draw);
        setLetterSpacing('0px');
        y += 55 * s;
      }

      // Opening quote symbol
      ctx.font = `bold ${Math.round(70 * s)}px serif`;
      ctx.fillStyle = quoteMarkColor;
      fillLine('“', anchorX, y, draw);
      y += 40 * s;

      // Main Santali text
      const devFontSize = Math.max(10, Math.round(52 * s * (custom.sizeMain / 100)));
      ctx.font = `900 ${devFontSize}px ${devFontFamily}`;
      ctx.fillStyle = mainTextColor;
      const devLineHeight = devFontSize * 1.35;
      wrapText(ctx, activeDev, maxContentWidth).forEach((line) => {
        fillLine(line, anchorX, y, draw);
        y += devLineHeight;
      });
      y += 20 * s;

      // Roman phonetic
      if (showRoman && activeRoman) {
        const romFontSize = Math.max(8, Math.round(28 * s * (custom.sizeRoman / 100)));
        ctx.font = `italic 600 ${romFontSize}px sans-serif`;
        ctx.fillStyle = romanColor;
        const romLineHeight = romFontSize * 1.35;
        wrapText(ctx, `(${activeRoman})`, maxContentWidth).forEach((line) => {
          fillLine(line, anchorX, y, draw);
          y += romLineHeight;
        });
        y += 25 * s;
      }

      // Divider line
      if (draw) {
        const dw = 260 * s;
        const x0 = align === 'left' ? anchorX : align === 'right' ? anchorX - dw : anchorX - dw / 2;
        ctx.save();
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = secondaryColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x0, y);
        ctx.lineTo(x0 + dw, y);
        ctx.stroke();
        ctx.restore();
      }
      y += 40 * s;

      // Hindi meaning
      if (showHindi && activeHindi) {
        const hinFontSize = Math.max(8, Math.round(29 * s * (custom.sizeHindi / 100)));
        ctx.font = `500 ${hinFontSize}px sans-serif`;
        ctx.fillStyle = hindiColor;
        const hinLineHeight = hinFontSize * 1.4;
        wrapText(ctx, activeHindi, align === 'center' ? maxContentWidth - 80 : maxContentWidth).forEach(
          (line) => {
            fillLine(line, anchorX, y, draw);
            y += hinLineHeight;
          }
        );
        y += 35 * s;
      }

      // Author / source
      if (activeAuthor) {
        const auFontSize = Math.max(8, Math.round(22 * s * (custom.sizeAuthor / 100)));
        ctx.font = `bold ${auFontSize}px sans-serif`;
        ctx.fillStyle = primaryColor;
        wrapText(ctx, `— ${activeAuthor}`, maxContentWidth).forEach((line, i, arr) => {
          fillLine(line, anchorX, y, draw);
          if (i < arr.length - 1) y += auFontSize * 1.3;
        });
        y += auFontSize / 2 + 4;
      }
      return y;
    };

    // Fit: shrink everything until the stack fits the available height (no overflow on any size)
    let k = 1;
    let stackH = renderStack(k, 0, false);
    for (let i = 0; i < 40 && stackH > available && k > 0.3; i++) {
      k *= 0.94;
      stackH = renderStack(k, 0, false);
    }
    const free = Math.max(0, available - stackH);
    const startY = contentTop + free / 2 + (custom.vPos / 50) * (free / 2);

    ctx.save();
    if (bgImg) {
      ctx.shadowColor = isLightBg ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)';
      ctx.shadowBlur = Math.round(U * 0.008);
    }
    renderStack(k, startY, true);
    ctx.restore();

    // Fit a single line of text into maxW by reducing the font size
    const fitLine = (text: string, weight: string, px: number, maxW: number) => {
      ctx.font = `${weight} ${px}px sans-serif`;
      while (ctx.measureText(text).width > maxW && px > 11) {
        px--;
        ctx.font = `${weight} ${px}px sans-serif`;
      }
    };
    const footerMaxW = Math.max(200, width - margin * 4 - bottomReserveSide * 2);

    // Optional name / contact line
    if (nameText) {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      fitLine(nameText, 'bold', Math.round(24 * sb), footerMaxW);
      ctx.fillStyle = custom.colorSecondary || mainTextColor;
      ctx.fillText(nameText, width / 2, nameY);
    }

    // Bottom line (editable branding footer)
    if (bottomText) {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      fitLine(bottomText, '600', Math.round(20 * sb), footerMaxW);
      ctx.fillStyle = footerColor;
      ctx.fillText(bottomText, width / 2, footerY);
    }

    // ---------- Logo ----------
    if (logoImg && logoBox > 0) {
      const p = cornerXY(custom.logoCorner, width, height, logoBox, logoBox, inset);
      drawContain(ctx, logoImg, p.x, p.y, logoBox, logoBox);
    }

    // ---------- Photo ----------
    if (photoImg) {
      const ps = (U * custom.photoSize) / 100;
      let px = (width * custom.photoX) / 100 - ps / 2;
      let py = (height * custom.photoY) / 100 - ps / 2;
      px = Math.max(0, Math.min(width - ps, px));
      py = Math.max(0, Math.min(height - ps, py));
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.35)';
      ctx.shadowBlur = ps * 0.06;
      ctx.shadowOffsetY = ps * 0.02;
      shapePath(ctx, custom.photoShape, px, py, ps);
      ctx.fillStyle = '#e7e5e4';
      ctx.fill();
      ctx.restore();
      ctx.save();
      shapePath(ctx, custom.photoShape, px, py, ps);
      ctx.clip();
      drawCover(ctx, photoImg, px, py, ps, ps);
      ctx.restore();
      if (custom.photoRing) {
        const lw = Math.max(3, ps * 0.04);
        ctx.save();
        ctx.lineWidth = lw;
        ctx.strokeStyle = '#ffffff';
        shapePath(ctx, custom.photoShape, px + lw / 2, py + lw / 2, ps - lw);
        ctx.stroke();
        ctx.restore();
      }
    }

    // ---------- QR code ----------
    if (qrMatrix && qrBox > 0) {
      const n = qrMatrix.size;
      const bw = qrBox;
      const bh = qrBox + qrLabH;
      const p = cornerXY(custom.qrCorner, width, height, bw, bh, inset);
      const pad = Math.max(Math.round(qrBox * 0.07), Math.ceil(((qrBox * 0.86) / n) * 2));
      const cell = (qrBox - pad * 2) / n;
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.28)';
      ctx.shadowBlur = U * 0.012;
      ctx.fillStyle = '#ffffff';
      roundRectPath(ctx, p.x, p.y, bw, bh, qrBox * 0.06);
      ctx.fill();
      ctx.shadowColor = 'transparent';
      ctx.fillStyle = '#111111';
      for (let r = 0; r < n; r++)
        for (let c = 0; c < n; c++)
          if (qrMatrix.modules[r][c])
            ctx.fillRect(
              Math.floor(p.x + pad + c * cell),
              Math.floor(p.y + pad + r * cell),
              Math.ceil(cell),
              Math.ceil(cell)
            );
      if (qrLabH) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        let fs = Math.round(qrLabH * 0.6);
        ctx.font = `700 ${fs}px "Noto Sans Devanagari", sans-serif`;
        while (ctx.measureText(qrCaption).width > bw - 12 && fs > 8) {
          fs--;
          ctx.font = `700 ${fs}px "Noto Sans Devanagari", sans-serif`;
        }
        ctx.fillStyle = '#1f2937';
        ctx.fillText(qrCaption, p.x + bw / 2, p.y + qrBox + qrLabH * 0.35);
      }
      ctx.restore();
    }
  };

  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        lines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
    return lines;
  };

  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `HorKatha_Santali_Poster_${Date.now()}.png`;
    a.click();
  };

  const handlePrint = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const w = window.open('', '_blank');
    if (!w) {
      handleDownloadImage();
      return;
    }
    const landscape = sizeObj.w > sizeObj.h;
    w.document.write(
      `<!doctype html><html><head><meta charset="utf-8"><title>होड़ काथा पोस्टर प्रिंट</title>` +
        `<style>@page{size:${landscape ? 'landscape' : 'portrait'};margin:8mm}html,body{margin:0;background:#fff}` +
        `img{display:block;max-width:100%;max-height:96vh;margin:0 auto;object-fit:contain}</style></head>` +
        `<body><img id="p" alt="poster" src="${url}"></body></html>`
    );
    w.document.close();
    const img = w.document.getElementById('p') as HTMLImageElement | null;
    const go = () => {
      try {
        w.focus();
        w.print();
      } catch {
        /* ignore */
      }
    };
    if (img && !img.complete) img.onload = () => setTimeout(go, 200);
    else setTimeout(go, 300);
  };

  const handleShareImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], `HorKatha_Santali_Poster_${Date.now()}.png`, { type: 'image/png' });
      const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
      if (nav.share && nav.canShare && nav.canShare({ files: [file] })) {
        try {
          await nav.share({ files: [file], title: 'होड़ काथा संताली पोस्टर', text: activeDev });
          return;
        } catch {
          return; // user cancelled
        }
      }
      handleDownloadImage();
    }, 'image/png');
  };

  const handleCopyText = () => {
    const shareText = `🌿 *${activeDev}*\n_${activeRoman}_\n\n📖 भावार्थ: ${activeHindi}\n\n— *${activeAuthor}*\n✨ साझा करें: होड़ काथा (संताली महामंच)`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const shareText = encodeURIComponent(
      `🌿 *${activeDev}*\n_${activeRoman}_\n\n📖 भावार्थ: ${activeHindi}\n\n— *${activeAuthor}*\n\n✨ होड़ काथा · संताली महामंच से साभार (www.horkatha.org)`
    );
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 3000);
  };

  const handleSpeak = () => {
    speakWithFemaleVoice(`${activeDev}। ${activeHindi}`, { lang: 'hi-IN', rate: 0.85 });
  };

  const renderSizePicker = () => (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
      {CARD_SIZES.map((ar) => (
        <button
          key={ar.id}
          type="button"
          onClick={() => setAspectRatio(ar.id)}
          className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
            aspectRatio === ar.id
              ? 'bg-amber-100 border-amber-400 text-amber-900 font-black'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <p className="font-bold text-[11px]">{ar.label}</p>
          <p className="text-[10px] text-slate-400">{ar.sub}</p>
        </button>
      ))}
    </div>
  );

  const themeObjUi = CARD_THEMES.find((t) => t.id === theme) || CARD_THEMES[0];
  const uiIsLight = theme === 'sohrai_white';
  const fallbackText = uiIsLight ? '#1C1917' : '#FFFBEB';
  const fallbackAccent = uiIsLight ? '#782618' : themeObjUi.accent;
  const fallbackSecondary = uiIsLight ? '#44403C' : '#FEF3C7';
  const upiInvalid = custom.qrMode === 'upi' && custom.upiId.trim() !== '' && !qrPayload;


  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-stone-50 text-slate-900 p-6 sm:p-8 rounded-3xl shadow-sm border border-amber-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border border-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              100+ Quotes &amp; Designs Studio
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-800">
              {quotes.length} संताली सुविचार · 12 रंग शैलियां
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-amber-950">
            संताली सोशल मीडिया कार्ड व पोस्टर जनरेटर
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            १०५+ प्रामाणिक संताली सूक्तियां, स्वाभिमान उद्घोष, सोहराय भित्तिचित्र और १२ पारंपरिक रंग शैलियों से १-क्लिक में HD पोस्टर बनाएं और WhatsApp पर शेयर करें।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleRandomizeDesign}
            className="px-4 py-2.5 rounded-2xl bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
            title="यादृच्छिक सुविचार व डिज़ाइन संयोजन तैयार करें"
          >
            <Dices className="w-4 h-4 text-amber-600" />
            <span>🎲 सरप्राइज डिज़ाइन</span>
          </button>
          <button
            onClick={handleDownloadImage}
            className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>HD इमेज डाउनलोड</span>
          </button>
          <button
            onClick={handleShareWhatsApp}
            className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>WhatsApp पर शेयर</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid: Left Controls / Right Live Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Controls & 100+ Quotes Browser */}
        <div
          data-testid="social-card-controls"
          className="lg:col-span-5 space-y-6 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-1 lg:pb-2 lg:overscroll-contain"
        >
          {/* 🎉 त्योहार poster — ready one-tap festival designs */}
          <div data-testid="festival-posters" className="bg-white p-4 rounded-3xl border border-amber-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-black text-slate-900 text-sm">🎉 त्योहार poster</h3>
              <span className="text-[10px] text-amber-800 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">एक टैप में तैयार</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {FESTIVAL_POSTERS.map((p) => {
                const days = festivalDaysAway(p);
                const soon = days !== null && days <= 30;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => applyFestivalPoster(p)}
                    data-festival={p.id}
                    className={`relative p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      activeFestival === p.id
                        ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-400/60'
                        : 'border-slate-200 bg-white hover:bg-amber-50/60 hover:border-amber-300'
                    }`}
                  >
                    <span className="text-xl leading-none">{p.emoji}</span>
                    <span className="block text-xs font-black text-slate-900 mt-1">{p.label}</span>
                    <span className="block text-[10px] text-slate-500 leading-snug">{p.when}</span>
                    {soon && (
                      <span className="absolute top-1.5 right-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                        {days === 0 ? 'आज' : days === 1 ? 'कल' : `${days} दिन`}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-slate-500">
              चुनने पर थीम, रंग, चिह्न, ऊपर की पंक्ति और संताली + हिंदी शुभकामना भर जाती है — नीचे "खुद का विचार" में बदल भी सकते हैं।
            </p>
          </div>

          {/* Custom vs Preset Toggle Bar */}
          <div className="bg-white p-2.5 rounded-2xl border border-slate-200 flex items-center gap-2 shadow-2xs">
            <button
              onClick={() => setCustomMode(false)}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                !customMode
                  ? 'bg-amber-700 text-white font-black shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>📚 १०५+ संताली सूक्तियां (Presets)</span>
            </button>
            <button
              onClick={() => setCustomMode(true)}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                customMode
                  ? 'bg-amber-700 text-white font-black shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>✍️ खुद का विचार लिखें (Custom)</span>
            </button>
          </div>

          {!customMode ? (
            /* 100+ PRESET PICKER WITH SEARCH & CATEGORY PILLS */
            <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-amber-700" />
                  सूक्ति या विचार चुनें ({filteredQuotes.length}/{quotes.length})
                </h3>
                <span className="text-[10px] text-amber-800 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  १०५+ संकलित
                </span>
              </div>

              {/* Live Search Input */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="खोजें: सोहराय, हुल, सरजोम, शिक्षा, मेहनत, मित्र..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* 8 Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
                {[
                  { id: 'all', label: 'सभी' },
                  { id: 'pride', label: '🛡️ स्वाभिमान' },
                  { id: 'philosophy', label: '✨ आदिम दर्शन' },
                  { id: 'nature', label: '🌿 प्रकृति-सरजोम' },
                  { id: 'labor', label: '🌾 श्रम व कृषि' },
                  { id: 'friendship', label: '🤝 प्रेम व रिश्ते' },
                  { id: 'greetings', label: '🌸 पर्व व जोहार' },
                  { id: 'proverbs', label: '🧩 लोकोक्तियां' },
                  { id: 'education', label: '📖 ज्ञान व शिक्षा' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
                      categoryFilter === cat.id
                        ? 'bg-amber-100 text-amber-900 border border-amber-300 font-black'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* 100+ Quotes Scrollable List */}
              <div className="max-h-80 overflow-y-auto space-y-2 border border-slate-100 rounded-2xl p-2 divide-y divide-slate-100">
                {filteredQuotes.map((q) => {
                  const isSel = q.id === selectedQuoteId;
                  return (
                    <div
                      key={q.id}
                      onClick={() => setSelectedQuoteId(q.id)}
                      className={`p-3 rounded-xl transition-all cursor-pointer text-xs ${
                        isSel
                          ? 'bg-amber-50/90 border border-amber-300 font-bold shadow-2xs'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {q.categoryLabel}
                        </span>
                        <span className="text-[10px] text-amber-800 font-semibold">
                          {q.authorOrSource}
                        </span>
                      </div>
                      <p className="font-serif font-black text-slate-900 text-sm leading-snug">
                        {q.santaliDevanagari}
                      </p>
                      <p className="text-amber-800 font-mono text-[11px] mt-0.5">
                        {q.santaliRoman}
                      </p>
                      <p className="text-slate-500 text-[11px] mt-1 line-clamp-1">
                        {q.hindiMeaning}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* CUSTOM WRITE FORM */
            <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Type className="w-4 h-4 text-amber-700" />
                अपना संताली संदेश / स्टेटस लिखें
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    संताली देवनागरी वाक्य:
                  </label>
                  <textarea
                    rows={2}
                    value={customDevanagari}
                    onChange={(e) => setCustomDevanagari(e.target.value)}
                    placeholder="उदा. आबो रोड़, आबो उपरुम..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-serif text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    रोमन संताली (वैकल्पिक):
                  </label>
                  <input
                    type="text"
                    value={customRoman}
                    onChange={(e) => setCustomRoman(e.target.value)}
                    placeholder="e.g. Abo Ror, Abo Uprum..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    हिन्दी अनुवाद / भावार्थ:
                  </label>
                  <input
                    type="text"
                    value={customHindi}
                    onChange={(e) => setCustomHindi(e.target.value)}
                    placeholder="उदा. हमारी भाषा, हमारा स्वाभिमान..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    रचयिता / स्रोत / आपका नाम:
                  </label>
                  <input
                    type="text"
                    value={customAuthor}
                    onChange={(e) => setCustomAuthor(e.target.value)}
                    placeholder="उदा. होड़ काथा संताली"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 100+ DESIGN COMBINATIONS PANEL */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-4 shadow-sm text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Palette className="w-4 h-4 text-amber-700" />
                डिज़ाइन व विज़ुअल कस्टमाइज़ेशन
              </h3>
              <span className="text-[10px] text-slate-400 font-bold">12 थीम्स · 8 बॉर्डर्स</span>
            </div>

            {/* 12 Color Themes */}
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">
                १२ पारंपरिक रंग थीम्स (Color Themes):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CARD_THEMES.map((th) => (
                  <button
                    key={th.id}
                    onClick={() => setTheme(th.id)}
                    className={`p-2 rounded-xl font-bold text-[11px] transition-all cursor-pointer flex flex-col items-center justify-center text-center ${th.previewBg} ${
                      theme === th.id
                        ? 'ring-3 ring-amber-500 scale-102 shadow-xs'
                        : 'opacity-85 hover:opacity-100'
                    }`}
                  >
                    <span className="font-bold" style={{ color: th.textColor }}>
                      {th.label}
                    </span>
                    <span className="text-[9px] opacity-75" style={{ color: th.textColor }}>
                      {th.subLabel}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 8 Border Styles */}
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">
                ८ सोहराय बॉर्डर शैलियां (Border Styles):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CARD_BORDERS.map((br) => (
                  <button
                    key={br.id}
                    onClick={() => setBorderStyle(br.id)}
                    className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
                      borderStyle === br.id
                        ? 'bg-amber-100 border-amber-400 text-amber-950 font-black ring-1 ring-amber-500'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <p className="font-bold text-[11px] leading-tight">{br.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Emblem / Badge Selector */}
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">
                १२ पारंपरिक प्रतीक चिन्ह (Sacred Emblem):
              </label>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {CARD_EMBLEMS.map((em) => (
                  <button
                    key={em.symbol}
                    onClick={() => setEmblem(em.symbol)}
                    className={`w-9 h-9 rounded-xl text-base flex items-center justify-center shrink-0 border transition-all cursor-pointer ${
                      emblem === em.symbol
                        ? 'bg-amber-100 border-amber-400 shadow-xs scale-110'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                    title={em.label}
                  >
                    <span>{em.symbol}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size / Aspect Ratio Picker */}
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">
                सोशल मीडिया / प्रिंट प्रारूप (Size):
              </label>
              {renderSizePicker()}
            </div>

            {/* Typography Font Style */}
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">फॉन्ट शैली (Typography):</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'serif_classical', label: 'शास्त्रीय देवनागरी', sub: 'Classical Serif' },
                  { id: 'modern_bold', label: 'आधुनिक बोल्ड', sub: 'Modern Sans' },
                  { id: 'folk_traditional', label: 'लोक परम्परा', sub: 'Folk Heritage' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFontStyle(f.id as any)}
                    className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
                      fontStyle === f.id
                        ? 'bg-amber-100 border-amber-400 text-amber-900 font-black'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <p className="font-bold text-[11px]">{f.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Detail Toggles */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={showEmblem}
                  onChange={(e) => setShowEmblem(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span>शीर्ष प्रतीक चिन्ह (Emblem Icon) दिखाएं</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={showRoman}
                  onChange={(e) => setShowRoman(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span>रोमन संताली उच्चारण दिखाएं (Roman Phonetic)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={showHindi}
                  onChange={(e) => setShowHindi(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span>हिन्दी भावार्थ दिखाएं (Hindi Meaning)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={showBranding}
                  onChange={(e) => setShowBranding(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span>होर काथा वाटरमार्क फुटर / नीचे की पंक्ति दिखाएं (Watermark)</span>
              </label>
            </div>
          </div>

          {/* 🎛️ FULL CUSTOMIZATION (collapsible) */}
          <div className="bg-white rounded-3xl border border-amber-200 shadow-sm text-xs overflow-hidden">
            <button
              type="button"
              data-testid="social-card-custom-toggle"
              onClick={() => setCustomOpen((o) => !o)}
              aria-expanded={customOpen}
              className="w-full px-5 py-4 flex items-center justify-between gap-3 bg-amber-50/70 hover:bg-amber-50 cursor-pointer transition-colors"
            >
              <span className="font-black text-slate-900 text-sm flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-amber-700" />
                🎛️ पूरा Customization
              </span>
              <span className="flex items-center gap-2">
                <span className="hidden sm:inline text-[10px] text-slate-500 font-bold">
                  आकार · बैकग्राउंड · रंग · टेक्स्ट · फोटो · लोगो · QR
                </span>
                <span
                  className={`w-7 h-7 rounded-full bg-white border border-amber-300 text-amber-800 flex items-center justify-center font-black transition-transform ${
                    customOpen ? 'rotate-180' : ''
                  }`}
                >
                  ▾
                </span>
              </span>
            </button>

            {customOpen && (
              <div className="p-5 space-y-4">
                {/* Sizes */}
                <SubHead>📐 आकार (Size)</SubHead>
                {renderSizePicker()}

                {/* Background */}
                <SubHead
                  right={
                    <button
                      type="button"
                      onClick={resetBackground}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-slate-700 font-bold text-[10px] cursor-pointer"
                    >
                      ♻️ बैकग्राउंड reset
                    </button>
                  }
                >
                  🖼️ बैकग्राउंड (Background)
                </SubHead>
                <div className="space-y-2.5">
                  <label className="block">
                    <span className="block font-semibold text-slate-700 text-[11px] mb-1">
                      अपनी बैकग्राउंड इमेज अपलोड करें:
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      data-testid="social-card-bg-upload"
                      className={fileBtnCls}
                      onChange={(e) => {
                        handleImageUpload('bg', e.target.files?.[0]);
                        e.target.value = '';
                      }}
                    />
                  </label>
                  {bgImg && (
                    <div className="flex items-center gap-2">
                      <img
                        src={imgUrls.bg}
                        alt="background"
                        className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage('bg')}
                        className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 font-bold text-[10px] cursor-pointer"
                      >
                        ✕ इमेज हटाएं
                      </button>
                    </div>
                  )}
                  <RangeField
                    label="ओवरले गहराई (रंग की परत)"
                    value={custom.bgOverlay}
                    min={0}
                    max={90}
                    testId="social-card-overlay"
                    onChange={(v) => upd('bgOverlay', v)}
                  />
                  <CheckRow
                    checked={custom.gradOn}
                    onChange={(v) => upd('gradOn', v)}
                    testId="social-card-grad-on"
                  >
                    अपना २-रंग ग्रेडिएंट (थीम की जगह)
                  </CheckRow>
                  {custom.gradOn && (
                    <div className="grid grid-cols-2 gap-2">
                      <ColorField
                        label="रंग १"
                        value={custom.grad1}
                        fallback={DEFAULT_CUSTOMIZATION.grad1}
                        testId="social-card-grad1"
                        onChange={(v) => upd('grad1', v)}
                      />
                      <ColorField
                        label="रंग २"
                        value={custom.grad2}
                        fallback={DEFAULT_CUSTOMIZATION.grad2}
                        testId="social-card-grad2"
                        onChange={(v) => upd('grad2', v)}
                      />
                    </div>
                  )}
                </div>

                {/* Colours */}
                <SubHead
                  right={
                    <button
                      type="button"
                      onClick={resetColors}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-slate-700 font-bold text-[10px] cursor-pointer"
                    >
                      ♻️ रंग reset
                    </button>
                  }
                >
                  🎨 रंग (Colours)
                </SubHead>
                <div className="grid grid-cols-3 gap-2">
                  <ColorField
                    label="मुख्य टेक्स्ट"
                    value={custom.colorText}
                    fallback={fallbackText}
                    testId="social-card-color-text"
                    onChange={(v) => upd('colorText', v)}
                  />
                  <ColorField
                    label="एक्सेंट / बॉर्डर"
                    value={custom.colorAccent}
                    fallback={fallbackAccent}
                    testId="social-card-color-accent"
                    onChange={(v) => upd('colorAccent', v)}
                  />
                  <ColorField
                    label="सहायक टेक्स्ट"
                    value={custom.colorSecondary}
                    fallback={fallbackSecondary}
                    testId="social-card-color-secondary"
                    onChange={(v) => upd('colorSecondary', v)}
                  />
                </div>

                {/* Text */}
                <SubHead>🔤 टेक्स्ट (Text)</SubHead>
                <div className="space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                    <RangeField
                      label="संताली मुख्य वाक्य"
                      value={custom.sizeMain}
                      min={50}
                      max={180}
                      step={5}
                      testId="social-card-size-main"
                      onChange={(v) => upd('sizeMain', v)}
                    />
                    <RangeField
                      label="रोमन उच्चारण"
                      value={custom.sizeRoman}
                      min={50}
                      max={180}
                      step={5}
                      onChange={(v) => upd('sizeRoman', v)}
                    />
                    <RangeField
                      label="हिन्दी भावार्थ"
                      value={custom.sizeHindi}
                      min={50}
                      max={180}
                      step={5}
                      onChange={(v) => upd('sizeHindi', v)}
                    />
                    <RangeField
                      label="रचयिता / स्रोत"
                      value={custom.sizeAuthor}
                      min={50}
                      max={180}
                      step={5}
                      onChange={(v) => upd('sizeAuthor', v)}
                    />
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-700 text-[11px] mb-1">संरेखण (Alignment):</span>
                    <ChoiceRow<CardAlign>
                      value={custom.align}
                      onChange={(v) => upd('align', v)}
                      options={[
                        { id: 'left', label: '⬅ बाएं' },
                        { id: 'center', label: '↔ बीच' },
                        { id: 'right', label: 'दाएं ➡' }
                      ]}
                    />
                  </div>
                  <RangeField
                    label="ऊपर ↔ नीचे स्थिति (0 = बीच)"
                    value={custom.vPos}
                    min={-50}
                    max={50}
                    suffix=""
                    testId="social-card-vpos"
                    onChange={(v) => upd('vPos', v)}
                  />
                  <div className="space-y-1.5">
                    <CheckRow checked={custom.topLineOn} onChange={(v) => upd('topLineOn', v)}>
                      ऊपर की पंक्ति दिखाएं
                    </CheckRow>
                    <input
                      type="text"
                      value={custom.topLine}
                      disabled={!custom.topLineOn}
                      data-testid="social-card-top-line"
                      onChange={(e) => upd('topLine', e.target.value)}
                      placeholder={DEFAULT_TOP_LINE}
                      className={`${inputCls} disabled:opacity-50`}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <CheckRow checked={showBranding} onChange={setShowBranding}>
                      नीचे की पंक्ति (फुटर) दिखाएं
                    </CheckRow>
                    <input
                      type="text"
                      value={custom.bottomLine}
                      disabled={!showBranding}
                      data-testid="social-card-bottom-line"
                      onChange={(e) => upd('bottomLine', e.target.value)}
                      placeholder={DEFAULT_BOTTOM_LINE}
                      className={`${inputCls} disabled:opacity-50`}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <CheckRow checked={custom.nameOn} onChange={(v) => upd('nameOn', v)} testId="social-card-name-on">
                      नाम / संपर्क पंक्ति जोड़ें
                    </CheckRow>
                    {custom.nameOn && (
                      <input
                        type="text"
                        value={custom.nameLine}
                        data-testid="social-card-name-line"
                        onChange={(e) => upd('nameLine', e.target.value)}
                        placeholder="उदा. सुनीता हेम्ब्रम · 98xxxxxx10 · दुमका"
                        className={inputCls}
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setCustom((c) => ({
                        ...c,
                        sizeMain: 100,
                        sizeRoman: 100,
                        sizeHindi: 100,
                        sizeAuthor: 100,
                        align: 'center',
                        vPos: 0,
                        topLineOn: true,
                        topLine: DEFAULT_TOP_LINE,
                        bottomLine: DEFAULT_BOTTOM_LINE
                      }))
                    }
                    className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-slate-700 font-bold text-[10px] cursor-pointer"
                  >
                    ♻️ टेक्स्ट reset
                  </button>
                </div>

                {/* Photo */}
                <SubHead>📷 फोटो (Photo)</SubHead>
                <div className="space-y-2.5">
                  <input
                    type="file"
                    accept="image/*"
                    data-testid="social-card-photo-upload"
                    className={fileBtnCls}
                    onChange={(e) => {
                      handleImageUpload('photo', e.target.files?.[0]);
                      e.target.value = '';
                    }}
                  />
                  {photoImg && (
                    <>
                      <div className="flex items-center gap-2">
                        <img
                          src={imgUrls.photo}
                          alt="photo"
                          className="w-12 h-12 rounded-full object-cover border border-slate-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage('photo')}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 font-bold text-[10px] cursor-pointer"
                        >
                          ✕ फोटो हटाएं
                        </button>
                      </div>
                      <div>
                        <span className="block font-semibold text-slate-700 text-[11px] mb-1">आकृति (Shape):</span>
                        <ChoiceRow<PhotoShape>
                          value={custom.photoShape}
                          onChange={(v) => upd('photoShape', v)}
                          options={[
                            { id: 'circle', label: '⚪ गोल' },
                            { id: 'rounded', label: '▢ गोल-कोना' },
                            { id: 'square', label: '⬛ चौकोर' }
                          ]}
                        />
                      </div>
                      <RangeField
                        label="फोटो का आकार"
                        value={custom.photoSize}
                        min={10}
                        max={45}
                        onChange={(v) => upd('photoSize', v)}
                      />
                      <div>
                        <span className="block font-semibold text-slate-700 text-[11px] mb-1">स्थान (Position):</span>
                        <ChoiceRow<CardCorner | 'custom'>
                          cols={4}
                          value={custom.photoCorner}
                          onChange={(v) => v !== 'custom' && setPhotoCorner(v)}
                          options={CORNER_OPTIONS}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-x-4">
                        <RangeField
                          label="← X →"
                          value={custom.photoX}
                          min={0}
                          max={100}
                          onChange={(v) => setCustom((c) => ({ ...c, photoX: v, photoCorner: 'custom' }))}
                        />
                        <RangeField
                          label="↑ Y ↓"
                          value={custom.photoY}
                          min={0}
                          max={100}
                          onChange={(v) => setCustom((c) => ({ ...c, photoY: v, photoCorner: 'custom' }))}
                        />
                      </div>
                      <CheckRow checked={custom.photoRing} onChange={(v) => upd('photoRing', v)}>
                        सफेद घेरा (White ring)
                      </CheckRow>
                    </>
                  )}
                </div>

                {/* Logo */}
                <SubHead>🏷️ लोगो (Logo)</SubHead>
                <div className="space-y-2.5">
                  <input
                    type="file"
                    accept="image/*"
                    data-testid="social-card-logo-upload"
                    className={fileBtnCls}
                    onChange={(e) => {
                      handleImageUpload('logo', e.target.files?.[0]);
                      e.target.value = '';
                    }}
                  />
                  {logoImg && (
                    <>
                      <div className="flex items-center gap-2">
                        <img
                          src={imgUrls.logo}
                          alt="logo"
                          className="w-12 h-12 rounded-lg object-contain bg-stone-50 border border-slate-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage('logo')}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 font-bold text-[10px] cursor-pointer"
                        >
                          ✕ लोगो हटाएं
                        </button>
                      </div>
                      <ChoiceRow<CardCorner>
                        cols={4}
                        value={custom.logoCorner}
                        onChange={(v) => upd('logoCorner', v)}
                        options={CORNER_OPTIONS}
                      />
                      <RangeField
                        label="लोगो का आकार"
                        value={custom.logoSize}
                        min={6}
                        max={30}
                        onChange={(v) => upd('logoSize', v)}
                      />
                    </>
                  )}
                </div>
                {imgNote && <p className="text-[10px] text-slate-500">{imgNote}</p>}

                {/* QR code */}
                <SubHead>▦ QR कोड</SubHead>
                <div className="space-y-2.5">
                  <ChoiceRow<QrMode>
                    value={custom.qrMode}
                    onChange={(v) => upd('qrMode', v)}
                    options={[
                      { id: 'off', label: 'बंद' },
                      { id: 'link', label: '🔗 लिंक / टेक्स्ट' },
                      { id: 'upi', label: '₹ UPI' }
                    ]}
                  />
                  {custom.qrMode === 'link' && (
                    <input
                      type="text"
                      value={custom.qrText}
                      data-testid="social-card-qr-text"
                      onChange={(e) => upd('qrText', e.target.value)}
                      placeholder="https://... या कोई भी टेक्स्ट"
                      className={inputCls}
                    />
                  )}
                  {custom.qrMode === 'upi' && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={custom.upiId}
                        data-testid="social-card-upi-id"
                        onChange={(e) => upd('upiId', e.target.value)}
                        placeholder="UPI ID, उदा. naam@ybl"
                        className={inputCls}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={custom.upiName}
                          onChange={(e) => upd('upiName', e.target.value)}
                          placeholder="प्राप्तकर्ता नाम (वैकल्पिक)"
                          className={inputCls}
                        />
                        <input
                          type="number"
                          inputMode="decimal"
                          min={0}
                          value={custom.upiAmount}
                          onChange={(e) => upd('upiAmount', e.target.value)}
                          placeholder="राशि ₹ (वैकल्पिक)"
                          className={inputCls}
                        />
                      </div>
                      {upiInvalid && (
                        <p className="text-[10px] text-rose-700 font-bold">
                          UPI ID सही नहीं लग रही (उदा. naam@okaxis)।
                        </p>
                      )}
                    </div>
                  )}
                  {custom.qrMode !== 'off' && (
                    <>
                      <input
                        type="text"
                        value={custom.qrCaption}
                        data-testid="social-card-qr-caption"
                        onChange={(e) => upd('qrCaption', e.target.value)}
                        placeholder={
                          custom.qrMode === 'upi' ? 'नीचे लिखा टेक्स्ट: UPI से भुगतान करें' : 'नीचे लिखा टेक्स्ट: स्कैन करें'
                        }
                        className={inputCls}
                      />
                      <ChoiceRow<CardCorner>
                        cols={4}
                        value={custom.qrCorner}
                        onChange={(v) => upd('qrCorner', v)}
                        options={CORNER_OPTIONS}
                      />
                      <RangeField
                        label="QR का आकार"
                        value={custom.qrSize}
                        min={12}
                        max={34}
                        onChange={(v) => upd('qrSize', v)}
                      />
                      {qrMatrix ? (
                        <p className="text-[10px] text-emerald-700 font-bold">
                          ✓ QR तैयार (version {qrMatrix.version})
                        </p>
                      ) : (
                        <p className="text-[10px] text-slate-500">QR के लिए ऊपर लिंक / UPI ID भरें।</p>
                      )}
                    </>
                  )}
                </div>

                <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-500">
                    सेटिंग्स इसी ब्राउज़र में अपने-आप सेव होती हैं।
                  </span>
                  <button
                    type="button"
                    onClick={resetAllCustomization}
                    className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 font-bold text-[11px] cursor-pointer"
                  >
                    ♻️ पूरा Customization reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Live Interactive HD Preview */}
        <div className="lg:col-span-7 space-y-4 order-first lg:order-none lg:sticky lg:top-6">
          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-slate-700">
                  लाइव एचडी पूर्वावलोकन ({sizeObj.label} · {sizeObj.w}×{sizeObj.h})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRandomizeDesign}
                  className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-amber-300"
                  title="यादृच्छिक कॉम्बो"
                >
                  <Dices className="w-3.5 h-3.5" />
                  <span>रैंडम</span>
                </button>
                <button
                  onClick={handleSpeak}
                  className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-800 font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-stone-200"
                  title="बोलकर सुनें"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                  <span>सुनें</span>
                </button>
                <button
                  onClick={handleCopyText}
                  className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-800 font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-stone-200"
                  title="टेक्स्ट कॉपी करें"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copied ? 'कॉपी हो गया!' : 'कॉपी'}</span>
                </button>
              </div>
            </div>

            {/* Canvas Container with responsive wrapper */}
            <div className="flex items-center justify-center p-2 sm:p-3 rounded-2xl bg-stone-100 border border-stone-200 overflow-hidden">
              <canvas
                ref={canvasRef}
                data-testid="social-card-canvas"
                className="max-w-full max-h-[580px] object-contain rounded-xl shadow-lg border border-stone-200"
              />
            </div>

            {/* Direct Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleDownloadImage}
                className="py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all hover:scale-102 active:scale-98"
              >
                <Download className="w-4 h-4" />
                <span>HD पोस्टर डाउनलोड (PNG)</span>
              </button>
              <button
                onClick={handleShareWhatsApp}
                className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all hover:scale-102 active:scale-98"
              >
                <Share2 className="w-4 h-4" />
                <span>{shareSuccess ? 'WhatsApp खुल रहा है...' : 'WhatsApp पर भेजें'}</span>
              </button>
              <button
                onClick={handleShareImage}
                className="py-2.5 px-4 rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-900 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                title="इमेज को सीधे ऐप्स में शेयर करें (मोबाइल)"
              >
                <ImageIcon className="w-4 h-4" />
                <span>📤 इमेज शेयर करें</span>
              </button>
              <button
                onClick={handlePrint}
                data-testid="social-card-print"
                className="py-2.5 px-4 rounded-2xl bg-stone-100 hover:bg-stone-200 border border-stone-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                title="पोस्टर प्रिंट करें (A4 के लिए 'A4 प्रिंट' आकार चुनें)"
              >
                <Printer className="w-4 h-4" />
                <span>🖨️ प्रिंट करें</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
