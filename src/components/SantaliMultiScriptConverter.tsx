import React, { useState } from 'react';
import {
  Languages,
  Copy,
  Check,
  RotateCcw,
  Volume2,
  Sparkles,
  ArrowRightLeft,
  BookOpen,
  Info,
  Layers,
  Keyboard
} from 'lucide-react';
import { speakWithFemaleVoice } from '../utils/speech';

// Multi-Script Mapping Tables
// Ol Chiki to Devanagari & Roman
const OL_CHIKI_MAP: { [char: string]: { dev: string; roman: string } } = {
  // Basic Consonants & Vowels
  'ᱚ': { dev: 'अ', roman: 'o' },
  'ᱛ': { dev: 'त', roman: 't' },
  'ᱜ': { dev: 'ग', roman: 'g' },
  'ᱝ': { dev: 'ङ', roman: 'ng' },
  'ᱞ': { dev: 'ल', roman: 'l' },
  'ᱟ': { dev: 'आ', roman: 'a' },
  'ᱠ': { dev: 'क', roman: 'k' },
  'ᱡ': { dev: 'ज', roman: 'j' },
  'ᱢ': { dev: 'म', roman: 'm' },
  'ᱣ': { dev: 'व', roman: 'w' },
  'ᱤ': { dev: 'इ', roman: 'i' },
  'ᱥ': { dev: 'स', roman: 's' },
  'ᱦ': { dev: 'ह', roman: 'h' },
  'ᱧ': { dev: 'ञ', roman: 'ny' },
  'ᱨ': { dev: 'र', roman: 'r' },
  'ᱩ': { dev: 'उ', roman: 'u' },
  'ᱪ': { dev: 'च', roman: 'c' },
  'ᱫ': { dev: 'द', roman: 'd' },
  'ᱬ': { dev: 'ण', roman: 'n' },
  'ᱭ': { dev: 'य', roman: 'y' },
  'ᱮ': { dev: 'ए', roman: 'e' },
  'ᱯ': { dev: 'प', roman: 'p' },
  'ᱰ': { dev: 'ड', roman: 'd' },
  'ᱱ': { dev: 'न', roman: 'n' },
  'ᱲ': { dev: 'ड़', roman: 'r' },
  'ᱳ': { dev: 'ओ', roman: 'o' },
  'ᱴ': { dev: 'ट', roman: 't' },
  'ᱵ': { dev: 'ब', roman: 'b' },
  'ᱶ': { dev: 'ंव', roman: 'nh' },
  'ᱷ': { dev: '्ह', roman: 'h' },
  // Modifiers
  'ᱸ': { dev: 'ं', roman: 'm' },   // Mu-tudu (nasalization)
  'ᱹ': { dev: '़', roman: '\'' },  // Gahl-tudu (low vowel dot)
  'ᱺ': { dev: 'ं़', roman: 'm\'' }, // Mu-gahl-tudu
  'ᱻ': { dev: '्', roman: '\'' },  // Ahlad (glottal catch)
  'ᱼ': { dev: '-', roman: '-' },   // Pharka (hyphen)
  // Numerals
  '᱐': { dev: '०', roman: '0' },
  '᱑': { dev: '१', roman: '1' },
  '᱒': { dev: '२', roman: '2' },
  '᱓': { dev: '३', roman: '3' },
  '᱔': { dev: '४', roman: '4' },
  '᱕': { dev: '५', roman: '5' },
  '᱖': { dev: '६', roman: '6' },
  '᱗': { dev: '७', roman: '7' },
  '᱘': { dev: '८', roman: '8' },
  '᱙': { dev: '९', roman: '9' }
};

// Devanagari to Ol Chiki Map
const DEV_TO_OL: { [char: string]: string } = {
  'अ': 'ᱚ', 'आ': 'ᱟ', 'इ': 'ᱤ', 'ई': 'ᱤ', 'उ': 'ᱩ', 'ऊ': 'ᱩ', 'ए': 'ᱮ', 'ऐ': 'ᱮ', 'ओ': 'ᱳ', 'औ': 'ᱳ',
  'ा': 'ᱟ', 'ि': 'ᱤ', 'ी': 'ᱤ', 'ु': 'ᱩ', 'ू': 'ᱩ', 'े': 'ᱮ', 'ै': 'ᱮ', 'ो': 'ᱳ', 'ौ': 'ᱳ',
  'क': 'ᱠ', 'ख': 'ᱠᱷ', 'ग': 'ᱜ', 'घ': 'ᱜᱷ', 'ङ': 'ᱝ',
  'च': 'ᱪ', 'छ': 'ᱪᱷ', 'ज': 'ᱡ', 'झ': 'ᱡᱷ', 'ञ': 'ᱧ',
  'ट': 'ᱴ', 'ठ': 'ᱴᱷ', 'ड': 'ᱰ', 'ढ': 'ᱰᱷ', 'ण': 'ᱬ',
  'त': 'ᱛ', 'थ': 'ᱛᱷ', 'द': 'ᱫ', 'ध': 'ᱫᱷ', 'न': 'ᱱ',
  'प': 'ᱯ', 'फ': 'ᱯᱷ', 'ब': 'ᱵ', 'भ': 'ᱵᱷ', 'म': 'ᱢ',
  'य': 'ᱭ', 'र': 'ᱨ', 'ल': 'ᱞ', 'व': 'ᱣ', 'स': 'ᱥ', 'श': 'ᱥ', 'ष': 'ᱥ', 'ह': 'ᱦ',
  'ड़': 'ᱲ', 'ढ़': 'ᱲᱷ',
  'ं': 'ᱸ', 'ँ': 'ᱸ', '़': 'ᱹ', '्': '', '-': 'ᱼ',
  '०': '᱐', '१': '᱑', '२': '᱒', '३': '᱓', '४': '᱔', '५': '᱕', '६': '᱖', '७': '᱗', '८': '᱘', '९': '᱙'
};

export const SantaliMultiScriptConverter: React.FC = () => {
  const [olChikiText, setOlChikiText] = useState<string>('ᱥᱟᱜᱩᱱ ᱥᱚᱦᱨᱟᱭ ᱢᱟᱦᱟᱯᱟᱨᱟᱵᱽ!');
  const [devanagariText, setDevanagariText] = useState<string>('सागुन सोहराय महापर्व!');
  const [romanText, setRomanText] = useState<string>('Sagun Sohrai Mahaparv!');

  const [copiedScript, setCopiedScript] = useState<string | null>(null);

  // Conversion: Ol Chiki -> Devanagari & Roman
  const handleOlChikiChange = (text: string) => {
    setOlChikiText(text);

    let devOut = '';
    let romOut = '';

    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (OL_CHIKI_MAP[ch]) {
        devOut += OL_CHIKI_MAP[ch].dev;
        romOut += OL_CHIKI_MAP[ch].roman;
      } else {
        devOut += ch;
        romOut += ch;
      }
    }

    setDevanagariText(devOut);
    setRomanText(romOut);
  };

  // Conversion: Devanagari -> Ol Chiki & Roman
  const handleDevanagariChange = (text: string) => {
    setDevanagariText(text);

    let olOut = '';
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (DEV_TO_OL[ch]) {
        olOut += DEV_TO_OL[ch];
      } else {
        olOut += ch;
      }
    }
    setOlChikiText(olOut);

    // Approximate Roman
    let romOut = '';
    for (let i = 0; i < olOut.length; i++) {
      const ch = olOut[i];
      if (OL_CHIKI_MAP[ch]) {
        romOut += OL_CHIKI_MAP[ch].roman;
      } else {
        romOut += ch;
      }
    }
    setRomanText(romOut);
  };

  // Conversion: Roman -> Ol Chiki & Devanagari (Basic mapping)
  const handleRomanChange = (text: string) => {
    setRomanText(text);
    // Approximation for common Santali words
    const lower = text.toLowerCase();
    let devOut = '';
    let olOut = '';

    for (let i = 0; i < lower.length; i++) {
      const ch = lower[i];
      if (ch === 'a') { devOut += 'ा'; olOut += 'ᱟ'; }
      else if (ch === 'o') { devOut += 'ो'; olOut += 'ᱳ'; }
      else if (ch === 'i') { devOut += 'ि'; olOut += 'ᱤ'; }
      else if (ch === 'u') { devOut += 'ु'; olOut += 'ᱩ'; }
      else if (ch === 'e') { devOut += 'े'; olOut += 'ᱮ'; }
      else if (ch === 'k') { devOut += 'क'; olOut += 'ᱠ'; }
      else if (ch === 'g') { devOut += 'ग'; olOut += 'ᱜ'; }
      else if (ch === 'j') { devOut += 'ज'; olOut += 'ᱡ'; }
      else if (ch === 't') { devOut += 'त'; olOut += 'ᱛ'; }
      else if (ch === 'd') { devOut += 'द'; olOut += 'ᱫ'; }
      else if (ch === 'n') { devOut += 'न'; olOut += 'ᱱ'; }
      else if (ch === 'p') { devOut += 'प'; olOut += 'ᱯ'; }
      else if (ch === 'b') { devOut += 'ब'; olOut += 'ᱵ'; }
      else if (ch === 'm') { devOut += 'म'; olOut += 'ᱢ'; }
      else if (ch === 'y') { devOut += 'य'; olOut += 'ᱭ'; }
      else if (ch === 'r') { devOut += 'र'; olOut += 'ᱨ'; }
      else if (ch === 'l') { devOut += 'ल'; olOut += 'ᱞ'; }
      else if (ch === 's') { devOut += 'स'; olOut += 'ᱥ'; }
      else if (ch === 'h') { devOut += 'ह'; olOut += 'ᱦ'; }
      else { devOut += ch; olOut += ch; }
    }
    setDevanagariText(devOut);
    setOlChikiText(olOut);
  };

  const handleCopy = (text: string, scriptKey: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedScript(scriptKey);
    setTimeout(() => setCopiedScript(null), 2000);
  };

  const setSampleText = (ol: string, dev: string, rom: string) => {
    setOlChikiText(ol);
    setDevanagariText(dev);
    setRomanText(rom);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-amber-950 text-white p-6 sm:p-8 border border-indigo-800/40 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-lg text-xs font-bold border border-indigo-500/30">
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>त्रि-लिपि संताली सेतु — Multi-Script Transliteration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              ऑल चिकी ⇄ देवनागरी ⇄ रोमन त्रि-लिपि कनवर्टर
            </h1>
            <p className="text-indigo-200/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              संताली भाषा की सभी प्रमुख लिपियों में लाइव 3-तरफा कनवर्टर। किसी भी एक बॉक्स में टाइप करें, शेष दोनों लिपियों में तत्काल शुद्ध रूपांतरण और उच्चारण उपलब्ध होगा।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-stone-900/80 p-2 rounded-2xl border border-white/10 shrink-0">
            <span className="text-[11px] text-amber-300 font-bold px-2">त्वरित परीक्षण:</span>
            <button
              onClick={() =>
                setSampleText(
                  'ᱡᱚᱦᱟᱨ! ᱟᱵᱚᱣᱟᱜ ᱯᱟᱹᱨᱥᱤ ᱟᱵᱚᱣᱟᱜ ᱜᱚᱨᱚᱵᱽ!',
                  'जोहार! आबोवाक पारसी आबोवाक गोरोब!',
                  'Johar! Abowak parsi abowak gorob!'
                )
              }
              className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              जोहार
            </button>
            <button
              onClick={() =>
                setSampleText(
                  'ᱥᱟᱜᱩᱱ ᱥᱚᱦᱨᱟᱭ ᱢᱟᱦᱟᱯᱟᱨᱟᱵᱽ!',
                  'सागुन सोहराय महापर्व!',
                  'Sagun Sohrai Mahaparv!'
                )
              }
              className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              सोहराय
            </button>
            <button
              onClick={() =>
                setSampleText(
                  'ᱢᱟᱨᱟᱝ ᱵᱩᱨᱩ ᱟᱨ ᱡᱟᱦᱮᱨ ᱮᱨᱟ',
                  'मारांग बुरु आर जाहेर एरा',
                  'Marang Buru ar Jaher Era'
                )
              }
              className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              मारांग बुरु
            </button>
          </div>
        </div>
      </div>

      {/* 3 Interactive Editor Boxes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Box 1: Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ) */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🔤</span>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">ऑल चिकी (Ol Chiki)</h3>
                  <span className="text-[10px] text-indigo-700 font-bold">ᱚᱞ ᱪᱤᱠᱤ ᱞᱤᱯᱤ</span>
                </div>
              </div>
              <button
                onClick={() => handleCopy(olChikiText, 'ol')}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                title="कॉपी करें"
              >
                {copiedScript === 'ol' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <textarea
              rows={6}
              value={olChikiText}
              onChange={(e) => handleOlChikiChange(e.target.value)}
              placeholder="ᱚᱞ ᱪᱤᱠᱤ ᱛᱮ ᱚᱞ ᱢᱮ (ऑल चिकी में टाइप करें)..."
              className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 font-sans text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none leading-relaxed"
            />
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
            <span>{olChikiText.length} वर्ण</span>
            <button
              onClick={() => speakWithFemaleVoice(devanagariText)}
              className="flex items-center gap-1.5 text-indigo-700 font-bold hover:underline cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>ऑडियो सुनें</span>
            </button>
          </div>
        </div>

        {/* Box 2: Devanagari (देवनागरी संताली) */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">📖</span>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">देवनागरी संताली</h3>
                  <span className="text-[10px] text-amber-700 font-bold">प्रामाणिक संताली देवनागरी</span>
                </div>
              </div>
              <button
                onClick={() => handleCopy(devanagariText, 'dev')}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                title="कॉपी करें"
              >
                {copiedScript === 'dev' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <textarea
              rows={6}
              value={devanagariText}
              onChange={(e) => handleDevanagariChange(e.target.value)}
              placeholder="देवनागरी संताली में टाइप करें..."
              className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 font-sans text-base focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none leading-relaxed"
            />
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
            <span>{devanagariText.length} वर्ण</span>
            <button
              onClick={() => speakWithFemaleVoice(devanagariText)}
              className="flex items-center gap-1.5 text-amber-800 font-bold hover:underline cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>उच्चारण सुनें</span>
            </button>
          </div>
        </div>

        {/* Box 3: Roman / Latin Phonetic */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🌐</span>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">रोमन संताली (Roman)</h3>
                  <span className="text-[10px] text-emerald-700 font-bold">Phonetic Latin Script</span>
                </div>
              </div>
              <button
                onClick={() => handleCopy(romanText, 'rom')}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                title="कॉपी करें"
              >
                {copiedScript === 'rom' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <textarea
              rows={6}
              value={romanText}
              onChange={(e) => handleRomanChange(e.target.value)}
              placeholder="Type in Roman phonetic Santali..."
              className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none leading-relaxed"
            />
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
            <span>{romanText.length} वर्ण</span>
            <button
              onClick={() => speakWithFemaleVoice(devanagariText)}
              className="flex items-center gap-1.5 text-emerald-700 font-bold hover:underline cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Play Voice</span>
            </button>
          </div>
        </div>
      </div>

      {/* Character Quick-Pad Guide */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Keyboard className="w-4 h-4 text-indigo-600" />
          <span>ऑल चिकी त्वरित वर्णमाला चार्ट (Click to insert):</span>
        </h3>

        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {Object.entries(OL_CHIKI_MAP).slice(0, 30).map(([olChar, mapping]) => (
            <button
              key={olChar}
              onClick={() => handleOlChikiChange(olChikiText + olChar)}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 border border-slate-200 flex flex-col items-center justify-center transition-all cursor-pointer group"
            >
              <span className="text-lg font-bold text-slate-900 group-hover:text-indigo-700">
                {olChar}
              </span>
              <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                {mapping.dev} ({mapping.roman})
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
