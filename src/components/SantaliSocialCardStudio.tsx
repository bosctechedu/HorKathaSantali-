import React, { useState, useRef, useEffect } from 'react';
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
  SlidersHorizontal
} from 'lucide-react';
import { speakWithFemaleVoice } from '../utils/speech';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import { SANTALI_100_QUOTES, SocialCardQuote } from '../data/santaliSocialQuotesData';

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

export const SantaliSocialCardStudio: React.FC = () => {
  const { isAdmin } = useAdmin();
  const [quotes, setQuotes] = useState<SocialCardQuote[]>(() =>
    safeLoadFromStorage('hor_katha_social_quotes_db', SANTALI_100_QUOTES)
  );

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
  const [theme, setTheme] = useState<CardThemeId>('terracotta');
  const [borderStyle, setBorderStyle] = useState<CardBorderId>('sohrai_geometric');
  const [emblem, setEmblem] = useState<string>('🪔');
  const [aspectRatio, setAspectRatio] = useState<'square' | 'story' | 'landscape'>('square');
  const [fontStyle, setFontStyle] = useState<CardFontId>('serif_classical');

  // Toggles
  const [showRoman, setShowRoman] = useState<boolean>(true);
  const [showHindi, setShowHindi] = useState<boolean>(true);
  const [showBranding, setShowBranding] = useState<boolean>(true);
  const [showEmblem, setShowEmblem] = useState<boolean>(true);

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
    showEmblem
  ]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dimensions
    let width = 1080;
    let height = 1080;
    if (aspectRatio === 'story') {
      width = 1080;
      height = 1920;
    } else if (aspectRatio === 'landscape') {
      width = 1200;
      height = 675;
    }

    canvas.width = width;
    canvas.height = height;

    // Background themes
    const themeObj = CARD_THEMES.find((t) => t.id === theme) || CARD_THEMES[0];
    const isLightBg = theme === 'sohrai_white';

    // Complex textured background gradients
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    if (theme === 'terracotta') {
      bgGrad.addColorStop(0, '#4A150D');
      bgGrad.addColorStop(0.5, '#682014');
      bgGrad.addColorStop(1, '#340C06');
    } else if (theme === 'forest') {
      bgGrad.addColorStop(0, '#062817');
      bgGrad.addColorStop(0.5, '#0E3B24');
      bgGrad.addColorStop(1, '#04170D');
    } else if (theme === 'ochre') {
      bgGrad.addColorStop(0, '#5A3407');
      bgGrad.addColorStop(0.5, '#78430A');
      bgGrad.addColorStop(1, '#361D02');
    } else if (theme === 'night_sky') {
      bgGrad.addColorStop(0, '#060E1E');
      bgGrad.addColorStop(0.5, '#0B1E40');
      bgGrad.addColorStop(1, '#02060E');
    } else if (theme === 'palas_crimson') {
      bgGrad.addColorStop(0, '#5C0F0F');
      bgGrad.addColorStop(0.5, '#7F1D1D');
      bgGrad.addColorStop(1, '#3D0707');
    } else if (theme === 'royal_indigo') {
      bgGrad.addColorStop(0, '#131135');
      bgGrad.addColorStop(0.5, '#1E1B4B');
      bgGrad.addColorStop(1, '#09081E');
    } else if (theme === 'iron_forge') {
      bgGrad.addColorStop(0, '#121214');
      bgGrad.addColorStop(0.5, '#202024');
      bgGrad.addColorStop(1, '#09090B');
    } else if (theme === 'golden_harvest') {
      bgGrad.addColorStop(0, '#451D04');
      bgGrad.addColorStop(0.5, '#713F12');
      bgGrad.addColorStop(1, '#2E1201');
    } else if (theme === 'river_turquoise') {
      bgGrad.addColorStop(0, '#0B2F2C');
      bgGrad.addColorStop(0.5, '#134E4A');
      bgGrad.addColorStop(1, '#051917');
    } else if (theme === 'sandal_wood') {
      bgGrad.addColorStop(0, '#311202');
      bgGrad.addColorStop(0.5, '#4E2106');
      bgGrad.addColorStop(1, '#200A01');
    } else if (theme === 'vintage_parchment') {
      bgGrad.addColorStop(0, '#2D1604');
      bgGrad.addColorStop(0.5, '#452206');
      bgGrad.addColorStop(1, '#1A0C01');
    } else {
      // sohrai_white
      bgGrad.addColorStop(0, '#FAF7F2');
      bgGrad.addColorStop(1, '#F3EFEA');
    }

    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Decorative Margins
    const margin = Math.round(width * 0.045);
    const primaryColor = isLightBg ? '#782618' : themeObj.accent;
    const secondaryColor = isLightBg ? 'rgba(120, 38, 24, 0.4)' : 'rgba(252, 211, 77, 0.35)';

    // BORDER STYLES
    if (borderStyle === 'sohrai_geometric') {
      // Outer border
      ctx.lineWidth = 4;
      ctx.strokeStyle = primaryColor;
      ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);

      // Inner double border
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = secondaryColor;
      ctx.strokeRect(margin + 12, margin + 12, width - margin * 2 - 24, height - margin * 2 - 24);

      // Sohrai corner chevrons / triangles
      const cSize = 36;
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

      // Dancing chain dots along top & bottom
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
      // Minimal gold or clean frame
      ctx.lineWidth = 3;
      ctx.strokeStyle = primaryColor;
      ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);
      ctx.lineWidth = 1;
      ctx.strokeStyle = secondaryColor;
      ctx.strokeRect(margin + 10, margin + 10, width - margin * 2 - 20, height - margin * 2 - 20);
    }

    // Top Emblem Badge
    const centerX = width / 2;
    let currentY = margin + (aspectRatio === 'story' ? 260 : 120);

    if (showEmblem) {
      // Emblem Halo
      ctx.fillStyle = isLightBg ? 'rgba(120,38,24,0.08)' : 'rgba(252,211,77,0.14)';
      ctx.beginPath();
      ctx.arc(centerX, currentY, 46, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.font = '38px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(emblem, centerX, currentY);

      currentY += 80;
    }

    // Top Subheading
    ctx.font = 'bold 22px sans-serif';
    ctx.fillStyle = primaryColor;
    ctx.letterSpacing = '3px';
    ctx.textAlign = 'center';
    ctx.fillText('HOR KATHA · आदिम संताली दर्शन', centerX, currentY);
    currentY += 55;

    // Opening Quote Symbol
    ctx.font = 'bold 70px serif';
    ctx.fillStyle = isLightBg ? 'rgba(120,38,24,0.3)' : 'rgba(252,211,77,0.38)';
    ctx.fillText('“', centerX, currentY);
    currentY += 40;

    // Typography setup
    let devFontFamily = 'serif';
    if (fontStyle === 'modern_bold') {
      devFontFamily = '"Noto Sans Devanagari", sans-serif';
    } else if (fontStyle === 'folk_traditional') {
      devFontFamily = '"Tiro Devanagari Hindi", serif';
    } else {
      devFontFamily = '"Noto Serif Devanagari", Georgia, serif';
    }

    // Main Santali Devanagari Text
    const devFontSize = aspectRatio === 'landscape' ? 44 : 52;
    ctx.font = `900 ${devFontSize}px ${devFontFamily}`;
    ctx.fillStyle = isLightBg ? '#1C1917' : '#FFFBEB';
    const devLineHeight = devFontSize * 1.35;
    const maxContentWidth = width - margin * 4;

    const devLines = wrapText(ctx, activeDev, maxContentWidth);
    devLines.forEach((line) => {
      ctx.fillText(line, centerX, currentY);
      currentY += devLineHeight;
    });

    currentY += 20;

    // Roman Santali Phonetic (Optional)
    if (showRoman && activeRoman) {
      const romFontSize = aspectRatio === 'landscape' ? 24 : 28;
      ctx.font = `italic 600 ${romFontSize}px sans-serif`;
      ctx.fillStyle = isLightBg ? '#78350F' : themeObj.accent;
      const romLineHeight = romFontSize * 1.35;
      const romLines = wrapText(ctx, `(${activeRoman})`, maxContentWidth);
      romLines.forEach((line) => {
        ctx.fillText(line, centerX, currentY);
        currentY += romLineHeight;
      });
      currentY += 25;
    }

    // Divider Line
    ctx.strokeStyle = secondaryColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX - 130, currentY);
    ctx.lineTo(centerX + 130, currentY);
    ctx.stroke();
    currentY += 40;

    // Hindi Meaning (Optional)
    if (showHindi && activeHindi) {
      const hinFontSize = aspectRatio === 'landscape' ? 24 : 29;
      ctx.font = `500 ${hinFontSize}px sans-serif`;
      ctx.fillStyle = isLightBg ? '#44403C' : '#FEF3C7';
      const hinLineHeight = hinFontSize * 1.4;
      const hinLines = wrapText(ctx, activeHindi, maxContentWidth - 80);
      hinLines.forEach((line) => {
        ctx.fillText(line, centerX, currentY);
        currentY += hinLineHeight;
      });
      currentY += 35;
    }

    // Author / Source Tag
    if (activeAuthor) {
      ctx.font = 'bold 22px sans-serif';
      ctx.fillStyle = primaryColor;
      ctx.fillText(`— ${activeAuthor}`, centerX, currentY);
    }

    // Bottom Branding Footer
    if (showBranding) {
      const footerY = height - margin - 35;
      ctx.font = '600 20px sans-serif';
      ctx.fillStyle = isLightBg ? '#78716C' : 'rgba(254, 243, 199, 0.7)';
      ctx.fillText('होड़ काथा · www.horkatha.org · हमारी भाषा, हमारा स्वाभिमान', centerX, footerY);
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

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-rose-950 to-stone-950 text-white p-6 sm:p-8 rounded-3xl shadow-sm border border-amber-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              100+ Quotes &amp; Designs Studio
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-[11px] font-bold text-emerald-300">
              {quotes.length} संताली सुविचार · 12 रंग शैलियां
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-amber-100">
            संताली सोशल मीडिया कार्ड व पोस्टर जनरेटर
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed font-medium">
            १०५+ प्रामाणिक संताली सूक्तियां, स्वाभिमान उद्घोष, सोहराय भित्तिचित्र और १२ पारंपरिक रंग शैलियों से १-क्लिक में HD पोस्टर बनाएं और WhatsApp पर शेयर करें।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleRandomizeDesign}
            className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-amber-200 border border-amber-400/30 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
            title="यादृच्छिक सुविचार व डिज़ाइन संयोजन तैयार करें"
          >
            <Dices className="w-4 h-4 text-amber-400" />
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
        <div className="lg:col-span-5 space-y-6">
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

            {/* Aspect Ratio Picker */}
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">
                सोशल मीडिया प्रारूप (Aspect Ratio):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'square', label: '1:1 वर्गाकार', sub: 'WhatsApp Post' },
                  { id: 'story', label: '9:16 लंबवत', sub: 'WhatsApp Status' },
                  { id: 'landscape', label: '16:9 क्षैतिज', sub: 'Banner / FB' }
                ].map((ar) => (
                  <button
                    key={ar.id}
                    onClick={() => setAspectRatio(ar.id as any)}
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
                <span>होर काथा वाटरमार्क फुटर दिखाएं (Watermark)</span>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Interactive HD Preview */}
        <div className="lg:col-span-7 space-y-4 sticky top-6">
          <div className="bg-slate-900/90 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-slate-300">
                  लाइव एचडी पूर्वावलोकन ({aspectRatio.toUpperCase()})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRandomizeDesign}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-amber-400/30"
                  title="यादृच्छिक कॉम्बो"
                >
                  <Dices className="w-3.5 h-3.5" />
                  <span>रैंडम</span>
                </button>
                <button
                  onClick={handleSpeak}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="बोलकर सुनें"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>सुनें</span>
                </button>
                <button
                  onClick={handleCopyText}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="टेक्स्ट कॉपी करें"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copied ? 'कॉपी हो गया!' : 'कॉपी'}</span>
                </button>
              </div>
            </div>

            {/* Canvas Container with responsive wrapper */}
            <div className="flex items-center justify-center p-2 rounded-2xl bg-black/40 overflow-hidden">
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-[580px] object-contain rounded-xl shadow-2xl border border-white/10"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
