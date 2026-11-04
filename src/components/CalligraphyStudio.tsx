import React, { useState, useRef, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import {
  Palette,
  Download,
  Share2,
  Sparkles,
  Type,
  Layout,
  Stamp,
  RotateCcw,
  Check,
  Copy,
  Edit2,
  Trash2,
  Plus,
  Save,
  X
} from 'lucide-react';

export interface PresetQuote {
  id?: string;
  santaliDevanagari: string;
  roman: string;
  hindi: string;
  occasion: string;
}

export const PRESET_QUOTES: PresetQuote[] = [
  {
    santaliDevanagari: 'जोहार',
    roman: 'Johar',
    hindi: 'अभिवादन / नमस्कार',
    occasion: 'Universal Greeting'
  },
  {
    santaliDevanagari: 'सोहराय पोरोब रासका',
    roman: 'Sohrai Parab Raska',
    hindi: 'सोहराय पर्व की हार्दिक शुभकामनाएं',
    occasion: 'Sohrai Harvest Festival'
  },
  {
    santaliDevanagari: 'बाहा पोरोब जोहार',
    roman: 'Baha Parab Johar',
    hindi: 'बाहा पर्व की शुभकामनाएं',
    occasion: 'Flower Spring Festival'
  },
  {
    santaliDevanagari: 'आबो रोड़, आबो उपरुम, आबो गोरोब',
    roman: 'Abo Ror, Abo Uprum, Abo Gorob',
    hindi: 'हमारी भाषा, हमारी पहचान, हमारा गर्व',
    occasion: 'Heritage Motto'
  },
  {
    santaliDevanagari: 'संताली भाषा आबोवाक जीवा कान',
    roman: 'Santali Bhasa Abowag Jiwi Kana',
    hindi: 'संताली भाषा हमारा जीवन व प्राण है',
    occasion: 'Language Pride'
  },
  {
    santaliDevanagari: 'मासांजोड़ आतो सागुन दाराम',
    roman: 'Masanjor Ato Sagun Daram',
    hindi: 'गाँव में आपका हार्दिक स्वागत है',
    occasion: 'Village Welcome'
  }
];

interface ThemeStyle {
  id: string;
  name: string;
  bgGradient: string;
  textColor: string;
  accentColor: string;
  borderColor: string;
}

const THEMES: ThemeStyle[] = [
  {
    id: 'sohrai_clay',
    name: 'Sohrai Clay (Traditional)',
    bgGradient: 'from-[#422006] via-[#2D1606] to-[#1C0D02]',
    textColor: '#FEF08A',
    accentColor: '#F59E0B',
    borderColor: '#B45309'
  },
  {
    id: 'forest_sal',
    name: 'Sal Sacred Grove',
    bgGradient: 'from-[#064E3B] via-[#022C22] to-[#041F18]',
    textColor: '#A7F3D0',
    accentColor: '#10B981',
    borderColor: '#059669'
  },
  {
    id: 'deep_dusk',
    name: 'Midnight Tribal Indigo',
    bgGradient: 'from-[#1E1B4B] via-[#0F172A] to-[#030712]',
    textColor: '#BAE6FD',
    accentColor: '#38BDF8',
    borderColor: '#0284C7'
  },
  {
    id: 'crimson_festival',
    name: 'Festive Palash Crimson',
    bgGradient: 'from-[#881337] via-[#4C0519] to-[#25030C]',
    textColor: '#FECDD3',
    accentColor: '#F43F5E',
    borderColor: '#BE123C'
  },
  {
    id: 'golden_dawn',
    name: 'Sun Gold Ochre',
    bgGradient: 'from-[#78350F] via-[#451A03] to-[#240C02]',
    textColor: '#FDE68A',
    accentColor: '#FBBF24',
    borderColor: '#D97706'
  }
];

const TRIBAL_SYMBOLS = [
  { label: '🪘 Tamak Drum', char: '🪘' },
  { label: '🏹 Bow & Arrow', char: '🏹' },
  { label: '🌸 Baha Flower', char: '🌸' },
  { label: '☀️ Singbonga Sun', char: '☀️' },
  { label: '🌿 Sal Leaf', char: '🌿' },
  { label: '🦚 Mara Peacock', char: '🦚' }
];

export const CalligraphyStudio: React.FC = () => {
  const { isAdmin } = useAdmin();
  const [quotesList, setQuotesList] = useState<PresetQuote[]>(() =>
    safeLoadFromStorage('hor_katha_calligraphy_quotes_db', PRESET_QUOTES)
  );

  const [selectedTheme, setSelectedTheme] = useState<ThemeStyle>(THEMES[0]);
  const [mainText, setMainText] = useState('जोहार');
  const [subText, setSubText] = useState('Johar · Greetings of Respect');
  const [authorText, setAuthorText] = useState('Hor Katha Suite · Santali Devanagari Heritage');
  const [fontSize, setFontSize] = useState<number>(56);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('🪘');
  const [borderStyle, setBorderStyle] = useState<'sohrai' | 'geometric' | 'minimal'>('sohrai');
  const [copied, setCopied] = useState(false);

  // Admin Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<PresetQuote>({
    santaliDevanagari: '',
    roman: '',
    hindi: '',
    occasion: 'General Quote'
  });

  useEffect(() => {
    safeSaveToStorage('hor_katha_calligraphy_quotes_db', quotesList);
  }, [quotesList]);

  const handleOpenAdd = () => {
    setEditingIndex(null);
    setFormData({
      santaliDevanagari: '',
      roman: '',
      hindi: '',
      occasion: 'Cultural Quote'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (idx: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingIndex(idx);
    setFormData({ ...quotesList[idx] });
    setIsModalOpen(true);
  };

  const handleDelete = (idx: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (quotesList.length <= 1) {
      alert('कम से कम १ सुलेखन विचार अवश्य होना चाहिए।');
      return;
    }
    if (window.confirm('क्या आप इस सुलेखन विचार को हटाना चाहते हैं?')) {
      const updated = quotesList.filter((_, i) => i !== idx);
      setQuotesList(updated);
    }
  };

  const handleReset = () => {
    if (window.confirm('क्या आप सभी सुलेखन विचारों को मूल डिफ़ॉल्ट पर रीसेट करना चाहते हैं?')) {
      setQuotesList(PRESET_QUOTES);
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.santaliDevanagari.trim() || !formData.hindi.trim()) {
      alert('कृपया संताली देवनागरी और हिंदी अर्थ अवश्य भरें।');
      return;
    }

    if (editingIndex !== null) {
      const updated = quotesList.map((q, i) => i === editingIndex ? formData : q);
      setQuotesList(updated);
    } else {
      const newQuote = { id: `quote_${Date.now()}`, ...formData };
      setQuotesList([...quotesList, newQuote]);
    }
    setMainText(formData.santaliDevanagari);
    setSubText(`${formData.roman} — ${formData.hindi}`);
    setIsModalOpen(false);
  };

  const posterRef = useRef<HTMLDivElement | null>(null);

  const applyPreset = (quote: PresetQuote) => {
    setMainText(quote.santaliDevanagari);
    setSubText(`${quote.roman} — ${quote.hindi}`);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(`${mainText}\n${subText}\n— ${authorText}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintOrSave = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans">
      {/* Studio Header Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-orange-700 to-rose-700 text-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider">
              Cultural Art &amp; Typography
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
              HD Festival Poster Studio
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mt-1.5 tracking-tight flex items-center gap-2.5">
            <Palette className="w-7 h-7 text-amber-200" />
            <span>Santali Devanagari Calligraphy &amp; Poster Studio</span>
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 font-medium mt-1">
            Create authentic Santali festival posters, tribal typography banners, and Johar status cards in Santali Devanagari.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyText}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs backdrop-blur-md transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handlePrintOrSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer hover:scale-105"
          >
            <Download className="w-4 h-4" />
            <span>Export / Print</span>
          </button>
        </div>
      </div>

      {/* Admin Action Bar */}
      {isAdmin && (
        <div className="bg-amber-500/10 border border-amber-300/80 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black text-amber-950">
              प्रशासक नियंत्रण (Admin Control): कुल {quotesList.length} सुलेखन विचार उपलब्ध
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenAdd}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ नया विचार जोड़ें</span>
            </button>
            <button
              onClick={handleReset}
              className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all"
            >
              <RotateCcw className="w-3 h-3 text-slate-500" />
              <span>रीसेट</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls Sidebar (5 Cols) */}
        <div className="lg:col-span-5 space-y-5 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          {/* Quick Preset Quotes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Santali Celebrations &amp; Motto Presets</span>
              </label>
              {isAdmin && (
                <button
                  onClick={handleOpenAdd}
                  className="text-[11px] text-amber-800 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>नया जोड़ें</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto pr-1">
              {quotesList.map((quote, idx) => (
                <div
                  key={idx}
                  onClick={() => applyPreset(quote)}
                  className="text-left px-3 py-2 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/60 transition-all text-xs group cursor-pointer relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-black text-slate-900 group-hover:text-amber-800 text-sm">
                      {quote.santaliDevanagari}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                        {quote.occasion}
                      </span>
                      {isAdmin && (
                        <>
                          <button
                            onClick={(e) => handleOpenEdit(idx, e)}
                            title="सुधारें (Edit)"
                            className="p-1 rounded-md text-slate-400 hover:text-amber-700 hover:bg-amber-100 transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(idx, e)}
                            title="हटाएं (Delete)"
                            className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">{quote.roman} · {quote.hindi}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Text Inputs */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div>
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between mb-1">
                <span>Santali Devanagari Headline (मुख्य शीर्षक)</span>
                <span className="text-[10px] text-amber-700 font-bold">संताली देवनागरी</span>
              </label>
              <input
                type="text"
                value={mainText}
                onChange={(e) => setMainText(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-lg font-serif font-bold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                placeholder="संताली देवनागरी में लिखें (उदा. जोहार, सोहराय...)..."
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Subtitle / Translation (Roman or Hindi)
              </label>
              <input
                type="text"
                value={subText}
                onChange={(e) => setSubText(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                placeholder="e.g. Johar · Greetings of Respect"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Footer Tag / Cultural Credit
              </label>
              <input
                type="text"
                value={authorText}
                onChange={(e) => setAuthorText(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Theme Palette Chooser */}
          <div className="pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 block mb-2">
              Color Heritage Palette
            </label>
            <div className="grid grid-cols-2 gap-2">
              {THEMES.map((theme) => {
                const isActive = theme.id === selectedTheme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme)}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-lg bg-gradient-to-br ${theme.bgGradient} border border-white/40 shadow-xs shrink-0`}
                    />
                    <span className="truncate">{theme.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Symbols & Stamp Picker */}
          <div className="pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 block mb-2">
              Tribal Emblem Stamp
            </label>
            <div className="flex flex-wrap gap-2">
              {TRIBAL_SYMBOLS.map((sym) => (
                <button
                  key={sym.char}
                  onClick={() => setSelectedSymbol(sym.char)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedSymbol === sym.char
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-sm">{sym.char}</span>
                  <span className="text-[11px]">{sym.label.split(' ')[1]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Font Size & Borders */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Font Scale ({fontSize}px)
              </label>
              <input
                type="range"
                min={32}
                max={84}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Border Ornament
              </label>
              <select
                value={borderStyle}
                onChange={(e) => setBorderStyle(e.target.value as any)}
                className="w-full px-2.5 py-1.5 border border-slate-200 rounded-xl text-xs font-medium bg-white focus:outline-none"
              >
                <option value="sohrai">Sohrai Mural Pattern</option>
                <option value="geometric">Tribal Diamonds</option>
                <option value="minimal">Minimal Gold Accent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Live Poster Canvas Preview (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div
            ref={posterRef}
            className={`w-full max-w-lg aspect-[4/5] rounded-3xl bg-gradient-to-b ${selectedTheme.bgGradient} p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all border-4 select-none`}
            style={{ borderColor: selectedTheme.borderColor }}
          >
            {/* Sohrai Mural Geometric Corner Accents */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 opacity-60" style={{ borderColor: selectedTheme.textColor }} />
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 opacity-60" style={{ borderColor: selectedTheme.textColor }} />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 opacity-60" style={{ borderColor: selectedTheme.textColor }} />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 opacity-60" style={{ borderColor: selectedTheme.textColor }} />

            {/* Top Ornamental Header */}
            <div className="text-center pt-2 relative z-10">
              <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-bold tracking-widest uppercase" style={{ color: selectedTheme.textColor }}>
                <span>{selectedSymbol}</span>
                <span>HOR KATHA SUITE · SANTALI HERITAGE</span>
                <span>{selectedSymbol}</span>
              </div>
            </div>

            {/* Central Typography Showcase */}
            <div className="text-center py-6 px-4 my-auto relative z-10 space-y-4">
              <div className="text-4xl mb-2 animate-bounce">{selectedSymbol}</div>

              {/* Main Santali Devanagari Script */}
              <h2
                className="font-black font-serif leading-tight drop-shadow-lg tracking-wide transition-all"
                style={{
                  fontSize: `${fontSize}px`,
                  color: selectedTheme.textColor
                }}
              >
                {mainText}
              </h2>

              {/* Decorative tribal separator */}
              <div className="flex items-center justify-center gap-2 my-3 opacity-75">
                <div className="w-12 h-0.5" style={{ backgroundColor: selectedTheme.accentColor }} />
                <span className="text-xs" style={{ color: selectedTheme.accentColor }}>◆ ❖ ◆</span>
                <div className="w-12 h-0.5" style={{ backgroundColor: selectedTheme.accentColor }} />
              </div>

              {/* Subtitle / Meaning */}
              <p
                className="text-base sm:text-lg font-bold leading-relaxed max-w-sm mx-auto drop-shadow-md"
                style={{ color: selectedTheme.textColor }}
              >
                {subText}
              </p>
            </div>

            {/* Bottom Credit Footer */}
            <div className="text-center pb-2 pt-4 border-t border-white/15 relative z-10 space-y-1">
              <p className="text-[11px] font-semibold tracking-wider uppercase opacity-85" style={{ color: selectedTheme.textColor }}>
                {authorText}
              </p>
              <p className="text-[10px] font-mono opacity-50" style={{ color: selectedTheme.textColor }}>
                Digitally Authored with Santali Devanagari · Free &amp; Open Indigenous Heritage
              </p>
            </div>
          </div>

          {/* Quick Share Action Row */}
          <div className="flex items-center justify-center gap-3 mt-4 text-xs">
            <span className="text-slate-500 font-medium">Ready to share:</span>
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors cursor-pointer"
            >
              Copy Text
            </button>
            <button
              onClick={handlePrintOrSave}
              className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Print / Save PDF
            </button>
          </div>
        </div>
      </div>

      {/* Admin Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Palette className="w-5 h-5 text-amber-600" />
                <span>{editingIndex !== null ? 'सुलेखन विचार सुधारें' : '+ नया सुलेखन विचार जोड़ें'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">संताली देवनागरी सुलेखन पंक्ति *</label>
                <input
                  type="text"
                  required
                  placeholder="उदा. जोहार, सोहराय पोरोब रासका..."
                  value={formData.santaliDevanagari}
                  onChange={(e) => setFormData({ ...formData, santaliDevanagari: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold font-serif text-slate-900 focus:outline-amber-500 text-base"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">रोमन लिपि (Roman)</label>
                  <input
                    type="text"
                    placeholder="उदा. Johar"
                    value={formData.roman}
                    onChange={(e) => setFormData({ ...formData, roman: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:outline-amber-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">प्रसंग / टैग (Occasion)</label>
                  <input
                    type="text"
                    placeholder="उदा. Universal Greeting"
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:outline-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">हिंदी अर्थ / व्याख्या *</label>
                <input
                  type="text"
                  required
                  placeholder="उदा. अभिवादन / सादर नमस्कार"
                  value={formData.hindi}
                  onChange={(e) => setFormData({ ...formData, hindi: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:outline-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>सहेजें (Save)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
