import React, { useState, useRef, useEffect } from 'react';
import {
  Smartphone,
  Download,
  Share2,
  Sparkles,
  Palette,
  Layers,
  Check,
  Send,
  Eye,
  RotateCcw,
  Volume2
} from 'lucide-react';
import { speakWithFemaleVoice } from '../utils/speech';

export interface WallpaperTheme {
  id: string;
  name: string;
  gradStart: string;
  gradMid: string;
  gradEnd: string;
  textColor: string;
  accentColor: string;
  subColor: string;
}

export const WALLPAPER_THEMES: WallpaperTheme[] = [
  {
    id: 'night_forest',
    name: 'गहन साल वन (Night Forest)',
    gradStart: '#064e3b',
    gradMid: '#022c22',
    gradEnd: '#090d16',
    textColor: '#ffffff',
    accentColor: '#34d399',
    subColor: '#a7f3d0'
  },
  {
    id: 'terracotta_sohrai',
    name: 'गेरुआ माटी (Terracotta Mud)',
    gradStart: '#7c2d12',
    gradMid: '#451a03',
    gradEnd: '#1c1917',
    textColor: '#ffffff',
    accentColor: '#fbbf24',
    subColor: '#fde68a'
  },
  {
    id: 'royal_indigo',
    name: 'नील गगन व चांद (Royal Indigo)',
    gradStart: '#312e81',
    gradMid: '#1e1b4b',
    gradEnd: '#0f172a',
    textColor: '#ffffff',
    accentColor: '#a5b4fc',
    subColor: '#c7d2fe'
  },
  {
    id: 'crimson_flame',
    name: 'पलाश अग्नि (Crimson Flame)',
    gradStart: '#881337',
    gradMid: '#4c0519',
    gradEnd: '#18181b',
    textColor: '#ffffff',
    accentColor: '#f43f5e',
    subColor: '#fecdd3'
  },
  {
    id: 'golden_harvest',
    name: 'सोने की बाली (Golden Harvest)',
    gradStart: '#78350f',
    gradMid: '#451a03',
    gradEnd: '#0c0a09',
    textColor: '#ffffff',
    accentColor: '#f59e0b',
    subColor: '#fef08a'
  },
  {
    id: 'mystic_black',
    name: 'कोहबर शिला (Mystic Onyx)',
    gradStart: '#262626',
    gradMid: '#171717',
    gradEnd: '#0a0a0a',
    textColor: '#ffffff',
    accentColor: '#e5e5e5',
    subColor: '#a3a3a3'
  }
];

export const WALLPAPER_QUOTES = [
  {
    devanagari: 'आबोवाक पारसी, आबोवाक लाकचार, आबोवाक गोरोब!',
    roman: 'Abowak parsi, abowak lakchar, abowak gorob!',
    hindi: 'हमारी भाषा, हमारी संस्कृति, हमारा गौरव!'
  },
  {
    devanagari: 'सारजोम बाहा फुटावेना, आतो-दिशोम रासका ते पेरेजेना!',
    roman: 'Sarjom baha phutawena, ato-disom raska te perejena!',
    hindi: 'साल के फूल खिल उठे, गांव-देश खुशियों से भर गया!'
  },
  {
    devanagari: 'हासा आर भाषा बांचाव रेगे अबोवाक जियान!',
    roman: 'Hasa ar bhasha banchaw rege abowak jiyan!',
    hindi: 'माटी और भाषा के संरक्षण में ही हमारा जीवन है!'
  },
  {
    devanagari: 'मारांग बुरु आर जाहेर एरा वाक थुम अबो सांवते ताहेन् मा!',
    roman: 'Marang Buru ar Jaher Era wak thum abo sanwte tahen ma!',
    hindi: 'मारांग बुरु और जाहेर एरा का पावन आशीष सदा हमारे साथ रहे!'
  },
  {
    devanagari: 'सिदो-कान्हू वाक हुल रेयाक सेंगाल मोने रे जोलोन् मा!',
    roman: 'Sido-Kanhu wak hul reyak sengal mone re jolon ma!',
    hindi: 'सिदो-कान्हू की क्रांति की अमर ज्योति हृदय में प्रज्वलित रहे!'
  }
];

export const SantaliWallpaperStudio: React.FC = () => {
  const [selectedThemeId, setSelectedThemeId] = useState<string>('terracotta_sohrai');
  const [selectedQuoteIndex, setSelectedQuoteIndex] = useState<number>(0);
  const [customQuote, setCustomQuote] = useState<string>('');
  const [userName, setUserName] = useState<string>('संताली स्वाभिमान');
  const [emblem, setEmblem] = useState<string>('🏹');
  const [copied, setCopied] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const currentTheme =
    WALLPAPER_THEMES.find((t) => t.id === selectedThemeId) || WALLPAPER_THEMES[0];
  const activeQuote = customQuote.trim()
    ? {
        devanagari: customQuote,
        roman: '',
        hindi: 'व्यक्तिगत सुविचार'
      }
    : WALLPAPER_QUOTES[selectedQuoteIndex];

  // Draw 1080x1920 High-Res Wallpaper on Canvas
  const drawWallpaper = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1080;
    const height = 1920;
    canvas.width = width;
    canvas.height = height;

    // 1. Background Gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, currentTheme.gradStart);
    grad.addColorStop(0.5, currentTheme.gradMid);
    grad.addColorStop(1, currentTheme.gradEnd);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Decorative Traditional Border
    ctx.strokeStyle = currentTheme.accentColor;
    ctx.lineWidth = 14;
    ctx.strokeRect(40, 40, width - 80, height - 80);

    ctx.strokeStyle = currentTheme.subColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(60, 60, width - 120, height - 120);

    // Corner Motifs
    const corners = [
      [80, 80],
      [width - 80, 80],
      [80, height - 80],
      [width - 80, height - 80]
    ];
    ctx.fillStyle = currentTheme.accentColor;
    corners.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fill();
    });

    // 3. Header Top Brand / Sacred Tag
    ctx.font = 'bold 32px system-ui, sans-serif';
    ctx.fillStyle = currentTheme.subColor;
    ctx.textAlign = 'center';
    ctx.fillText('• ᱥᱟᱱᱛᱟᱲᱤ ᱜᱚᱨᱚᱵᱽ • SANTHAL HERITAGE •', width / 2, 220);

    // 4. Center Emblem
    ctx.font = '140px system-ui, sans-serif';
    ctx.fillText(emblem, width / 2, 420);

    // 5. Lunar Calendar Date Stamp
    const today = new Date();
    const dateStr = today.toLocaleDateString('hi-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    ctx.font = '500 28px system-ui, sans-serif';
    ctx.fillStyle = currentTheme.subColor;
    ctx.fillText(`पावन संताली तिथि • ${dateStr}`, width / 2, 540);

    // 6. Main Quote in Large Devanagari (wrapped)
    ctx.font = 'bold 64px system-ui, sans-serif';
    ctx.fillStyle = currentTheme.textColor;

    const words = activeQuote.devanagari.split(' ');
    let line = '';
    let y = 840;
    const maxWidth = 900;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line, width / 2, y);
        line = words[i] + ' ';
        y += 85;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, width / 2, y);

    // 7. Roman Phonetics
    if (activeQuote.roman) {
      ctx.font = 'italic 34px system-ui, monospace';
      ctx.fillStyle = currentTheme.accentColor;
      ctx.fillText(activeQuote.roman, width / 2, y + 90);
    }

    // 8. Hindi Meaning
    ctx.font = 'italic 36px system-ui, sans-serif';
    ctx.fillStyle = currentTheme.subColor;
    ctx.fillText(`"${activeQuote.hindi}"`, width / 2, y + 175);

    // 9. Traditional Divider Graphic
    ctx.strokeStyle = currentTheme.accentColor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(340, y + 260);
    ctx.lineTo(740, y + 260);
    ctx.stroke();

    // 10. User Personalization Tag
    ctx.font = 'bold 42px system-ui, sans-serif';
    ctx.fillStyle = currentTheme.accentColor;
    ctx.fillText(userName, width / 2, height - 280);

    // 11. Footer App Credit
    ctx.font = '24px system-ui, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('होड़ काथा डिजिटल सुइट (Hor Katha Suite) • www.horkatha.org', width / 2, height - 160);
  };

  useEffect(() => {
    drawWallpaper();
  }, [selectedThemeId, selectedQuoteIndex, customQuote, userName, emblem]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `santali-wallpaper-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleWhatsAppShare = () => {
    const text = `📱 *संताली मोबाइल वॉलपेपर*\n"${activeQuote.devanagari}"\n_${activeQuote.hindi}_\n\nनिर्माता: *${userName}*\n(Hor Katha Suite)`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950 via-rose-950 to-stone-900 text-white p-6 sm:p-8 border border-amber-800/40 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-lg text-xs font-bold border border-amber-500/30">
              <Smartphone className="w-3.5 h-3.5" />
              <span>9:16 HD Mobile Lockscreen &amp; Status Creator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              मोबाइल लॉकस्क्रीन वॉलपेपर व स्टेटस जनरेटर
            </h1>
            <p className="text-amber-200/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              अपने स्मार्टफोन के लिए सुंदर 9:16 अनुपात में संताली सुविचार, पारंपरिक सोहराय बॉर्डर व सांस्कृतिक प्रतीकों के साथ फुल-एचडी वॉलपेपर बनाएं और 1-क्लिक में डाउनलोड करें।
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleDownload}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4 text-stone-950" />
              <span>HD वॉलपेपर डाउनलोड (PNG)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio 2-Column: Left Controls + Right Live Phone Frame */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Theme Color Selector */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Palette className="w-4 h-4 text-rose-600" />
              <span>१. वॉलपेपर रंग थीम चुनें:</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {WALLPAPER_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedThemeId(theme.id)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                    selectedThemeId === theme.id
                      ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-400/30 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div
                    className="w-5 h-5 rounded-full shrink-0 border border-white shadow-2xs"
                    style={{ background: theme.gradStart }}
                  />
                  <span className="text-xs font-bold text-slate-800 line-clamp-1">
                    {theme.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Emblem Selector */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>२. सांस्कृतिक प्रतीक चिन्ह (Emblem):</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {['🏹', '🌸', '🥁', '🦚', '🐂', '🌙', '🌳', '✨'].map((emb) => (
                <button
                  key={emb}
                  onClick={() => setEmblem(emb)}
                  className={`w-12 h-12 rounded-2xl text-2xl flex items-center justify-center border transition-all cursor-pointer ${
                    emblem === emb
                      ? 'bg-amber-100 border-amber-400 scale-105 shadow-sm'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {emb}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Quote Selector */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>३. संताली सुविचार चुनें:</span>
            </label>
            <div className="space-y-2">
              {WALLPAPER_QUOTES.map((q, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedQuoteIndex(idx);
                    setCustomQuote('');
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedQuoteIndex === idx && !customQuote
                      ? 'bg-indigo-50/70 border-indigo-400 ring-2 ring-indigo-400/30 shadow-xs'
                      : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold text-xs text-slate-900">{q.devanagari}</div>
                  <div className="text-[11px] text-slate-500 italic mt-0.5">{q.hindi}</div>
                </div>
              ))}
            </div>

            {/* Custom Quote Input */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-600 block mb-1">
                या अपना व्यक्तिगत सुविचार लिखें:
              </span>
              <input
                type="text"
                value={customQuote}
                onChange={(e) => setCustomQuote(e.target.value)}
                placeholder="उदा. अबोवाक दिसोम अबोवाक राज..."
                className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* 4. Personal Name */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700">
              ४. आपका नाम / उपनाम (वॉलपेपर क्रेडिट):
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="उदा. पठान हेम्ब्रम / संताली स्वाभिमान"
              className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Live Phone Mockup Preview (Right 5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center space-y-4">
          <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-emerald-600" />
            <span>लाइव स्मार्टफोन 9:16 पूर्वावलोकन:</span>
          </div>

          {/* Phone Frame */}
          <div className="relative w-64 sm:w-72 aspect-[9/16] rounded-[42px] p-3 bg-stone-900 border-4 border-stone-800 shadow-2xl overflow-hidden ring-1 ring-white/10">
            {/* Phone Speaker Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-stone-950 rounded-full z-30" />

            {/* Canvas Display Screen */}
            <div className="w-full h-full rounded-[32px] overflow-hidden">
              <canvas ref={canvasRef} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownload}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black flex items-center gap-1.5 shadow-md transition-all cursor-pointer hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>PNG डाउनलोड</span>
            </button>
            <button
              onClick={handleWhatsAppShare}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer hover:scale-105"
            >
              <Send className="w-4 h-4" />
              <span>WhatsApp स्टेटस</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
