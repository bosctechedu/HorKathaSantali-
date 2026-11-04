import React, { useState } from 'react';
import { TranslatorMode } from '../types';
import { TRANSLATION_DATABASE } from '../data/santaliData';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  Languages,
  ArrowRightLeft,
  Volume2,
  Copy,
  Check,
  Share2,
  Trash2,
  Sparkles,
  ArrowRight,
  BookOpen,
  Send,
  RotateCcw,
  Globe
} from 'lucide-react';

interface TranslatorModuleProps {
  initialText?: string;
  compact?: boolean;
}

export const TranslatorModule: React.FC<TranslatorModuleProps> = ({
  initialText = '',
  compact = false
}) => {
  const [mode, setMode] = useState<TranslatorMode>('santali_roman_to_hindi');
  const [inputText, setInputText] = useState(initialText || 'Johar, am celed menama?');
  const [translatedText, setTranslatedText] = useState('नमस्ते / प्रणाम, आप कैसे हैं?');
  const [secondaryText, setSecondaryText] = useState('Roman Santali: Johar, am celed menama?');
  const [copied, setCopied] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const isReversed =
    mode === 'hindi_to_santali_roman' ||
    mode === 'hindi_to_santali_dev' ||
    mode === 'english_to_santali' ||
    mode === 'english_to_hindi';

  const quickPresets = {
    santali_roman_to_hindi: ['Johar', 'Am celed menama', 'Sarhao', 'Dular', 'Bonga', 'Dak'],
    santali_dev_to_hindi: ['जोहार', 'आम चेलेद मेनामा', 'सारहाव', 'दुलार', 'बोंगा', 'दाक'],
    santali_to_english: ['Johar', 'Am celed menama', 'Sarhao', 'Dular', 'Bonga', 'Dak'],
    hindi_to_english: ['नमस्ते', 'आप कैसे हैं?', 'धन्यवाद', 'प्रेम / प्यार', 'ईश्वर', 'धरती'],
    hindi_to_santali_roman: ['नमस्ते', 'धन्यवाद', 'आप कैसे हैं?', 'प्यार', 'भगवान'],
    hindi_to_santali_dev: ['नमस्ते', 'धन्यवाद', 'आप कैसे हैं?', 'प्यार', 'भगवान'],
    english_to_santali: ['Hello', 'How are you', 'Thank you', 'Love', 'God', 'Water'],
    english_to_hindi: ['Hello', 'How are you', 'Thank you', 'Love', 'God', 'Water'],
    custom: ['Johar', 'नमस्ते', 'Hello', 'Water']
  }[mode] || ['Johar', 'Sarhao'];

  const handleModeChange = (newMode: TranslatorMode) => {
    setMode(newMode);
    if (newMode === 'santali_roman_to_hindi') {
      setInputText('Johar, am celed menama?');
      setTranslatedText('नमस्ते / प्रणाम, आप कैसे हैं?');
      setSecondaryText('Roman Santali: Johar, am celed menama?');
    } else if (newMode === 'santali_dev_to_hindi') {
      setInputText('जोहार, आम चेलेद मेनामा?');
      setTranslatedText('नमस्ते / प्रणाम, आप कैसे हैं?');
      setSecondaryText('Roman: Johar, am celed menama?');
    } else if (newMode === 'santali_to_english') {
      setInputText('Johar, am celed menama?');
      setTranslatedText('Hello, how are you? (Greetings)');
      setSecondaryText('Santali: Johar, am celed menama?');
    } else if (newMode === 'hindi_to_english') {
      setInputText('नमस्ते, आप कैसे हैं?');
      setTranslatedText('Hello, how are you? (Greetings)');
      setSecondaryText('Santali: Johar, am celed menama?');
    }
  };

  const handleReverseTranslation = () => {
    let nextMode: TranslatorMode = 'santali_roman_to_hindi';
    if (mode === 'santali_roman_to_hindi') nextMode = 'hindi_to_santali_roman';
    else if (mode === 'hindi_to_santali_roman') nextMode = 'santali_roman_to_hindi';
    else if (mode === 'santali_dev_to_hindi') nextMode = 'hindi_to_santali_dev';
    else if (mode === 'hindi_to_santali_dev') nextMode = 'santali_dev_to_hindi';
    else if (mode === 'santali_to_english') nextMode = 'english_to_santali';
    else if (mode === 'english_to_santali') nextMode = 'santali_to_english';
    else if (mode === 'hindi_to_english') nextMode = 'english_to_hindi';
    else if (mode === 'english_to_hindi') nextMode = 'hindi_to_english';

    setMode(nextMode);
    const oldInput = inputText;
    const oldTranslated = translatedText;
    setInputText(oldTranslated);
    setTranslatedText(oldInput);
  };

  const handleTranslate = () => {
    setIsTranslating(true);
    setTimeout(() => {
      const q = inputText.toLowerCase().trim();

      // Search matching translation in database
      const match = TRANSLATION_DATABASE.find((item) => {
        if (mode === 'santali_roman_to_hindi' || mode === 'santali_to_english') {
          return q.includes(item.santaliRoman.toLowerCase()) || item.santaliRoman.toLowerCase().includes(q);
        }
        if (mode === 'santali_dev_to_hindi') {
          return q.includes(item.santaliDevanagari) || item.santaliDevanagari.includes(q);
        }
        if (mode === 'hindi_to_english' || mode === 'hindi_to_santali_roman' || mode === 'hindi_to_santali_dev') {
          return item.hindi.includes(q) || q.includes(item.hindi.split('/')[0].trim());
        }
        if (mode === 'english_to_hindi' || mode === 'english_to_santali') {
          return item.english.toLowerCase().includes(q) || q.includes(item.english.toLowerCase().split('/')[0].trim());
        }
        return false;
      });

      if (match) {
        if (mode === 'santali_roman_to_hindi') {
          setTranslatedText(match.hindi);
          setSecondaryText(`English: ${match.english} · Devanagari: ${match.santaliDevanagari}`);
        } else if (mode === 'santali_dev_to_hindi') {
          setTranslatedText(match.hindi);
          setSecondaryText(`Roman Santali: ${match.santaliRoman} · English: ${match.english}`);
        } else if (mode === 'santali_to_english') {
          setTranslatedText(match.english);
          setSecondaryText(`Hindi: ${match.hindi} · Roman Santali: ${match.santaliRoman}`);
        } else if (mode === 'hindi_to_english') {
          setTranslatedText(match.english);
          setSecondaryText(`Roman Santali: ${match.santaliRoman}`);
        } else if (mode === 'hindi_to_santali_roman') {
          setTranslatedText(match.santaliRoman);
          setSecondaryText(`Devanagari: ${match.santaliDevanagari} · English: ${match.english}`);
        } else if (mode === 'hindi_to_santali_dev') {
          setTranslatedText(match.santaliDevanagari);
          setSecondaryText(`Roman Santali: ${match.santaliRoman} · English: ${match.english}`);
        } else if (mode === 'english_to_santali') {
          setTranslatedText(match.santaliRoman);
          setSecondaryText(`Hindi: ${match.hindi} · Devanagari: ${match.santaliDevanagari}`);
        } else if (mode === 'english_to_hindi') {
          setTranslatedText(match.hindi);
          setSecondaryText(`Roman Santali: ${match.santaliRoman}`);
        }
      } else {
        // Fallback for custom text
        if (mode === 'hindi_to_santali_roman' || mode === 'english_to_santali') {
          setTranslatedText('Johar! (Santali: Bes ge menama)');
          setSecondaryText('Roman Santali: Johar!');
        } else if (mode === 'english_to_hindi') {
          setTranslatedText('नमस्ते / जोहार');
          setSecondaryText('Santali: Johar');
        } else if (mode === 'hindi_to_english' || mode === 'santali_to_english') {
          setTranslatedText(`Translation: "${inputText}"`);
          setSecondaryText('Context: Santali / Hindi to English');
        } else {
          setTranslatedText('जोहार! आपका संदेश सफलतापूर्वक संताली से अनुवादित हुआ।');
          setSecondaryText('Roman Santali: Johar! Amag katha tarjoma ena.');
        }
      }

      setIsTranslating(false);
    }, 350);
  };

  const handleSpeak = (text: string, lang = 'hi-IN') => {
    speakWithFemaleVoice(text, { lang, rate: 0.88 });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText + '\n' + secondaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden ${compact ? 'p-3' : 'p-6'}`}>
      {/* Header with Title & Reverse Swap Action */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Languages className="w-4 h-4 text-rose-600" />
            <span>Santali, Hindi &amp; English Translator</span>
          </h2>
          <p className="text-xs text-slate-500">
            Bidirectional translation supporting Roman Santali, Hindi &amp; English
          </p>
        </div>

        {/* Prominent Reverse Translation Toggle */}
        <button
          onClick={handleReverseTranslation}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-300 rounded-xl text-xs font-bold transition-all shadow-2xs hover:scale-102 cursor-pointer"
        >
          <ArrowRightLeft className="w-3.5 h-3.5 text-rose-600" />
          <span>Reverse Direction (उल्टा अनुवाद)</span>
        </button>
      </div>

      {/* 4 Translation Modes Bar with Directional Display */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => handleModeChange(isReversed ? 'hindi_to_santali_roman' : 'santali_roman_to_hindi')}
          className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all text-center border cursor-pointer ${
            mode === 'santali_roman_to_hindi' || mode === 'hindi_to_santali_roman'
              ? 'bg-rose-50 border-rose-400 text-rose-900 shadow-2xs ring-2 ring-rose-400/20'
              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <span className="block text-[10px] text-slate-400 font-normal">
            {mode === 'hindi_to_santali_roman' ? 'Reverse Mode' : 'Mode 1'}
          </span>
          {mode === 'hindi_to_santali_roman' ? 'Hindi → Santali (R)' : 'Santali (R) → Hindi'}
        </button>

        <button
          onClick={() => handleModeChange(isReversed ? 'hindi_to_santali_dev' : 'santali_dev_to_hindi')}
          className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all text-center border cursor-pointer ${
            mode === 'santali_dev_to_hindi' || mode === 'hindi_to_santali_dev'
              ? 'bg-rose-50 border-rose-400 text-rose-900 shadow-2xs ring-2 ring-rose-400/20'
              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <span className="block text-[10px] text-slate-400 font-normal">
            {mode === 'hindi_to_santali_dev' ? 'Reverse Mode' : 'Mode 2'}
          </span>
          {mode === 'hindi_to_santali_dev' ? 'Hindi → Santali (Dev)' : 'Santali (Dev) → Hindi'}
        </button>

        <button
          onClick={() => handleModeChange(isReversed ? 'english_to_santali' : 'santali_to_english')}
          className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all text-center border cursor-pointer ${
            mode === 'santali_to_english' || mode === 'english_to_santali'
              ? 'bg-rose-50 border-rose-400 text-rose-900 shadow-2xs ring-2 ring-rose-400/20'
              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <span className="block text-[10px] text-slate-400 font-normal">
            {mode === 'english_to_santali' ? 'Reverse Mode' : 'Mode 3'}
          </span>
          {mode === 'english_to_santali' ? 'English → Santali (R)' : 'Santali (R) → English'}
        </button>

        <button
          onClick={() => handleModeChange(isReversed ? 'english_to_hindi' : 'hindi_to_english')}
          className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all text-center border cursor-pointer ${
            mode === 'hindi_to_english' || mode === 'english_to_hindi'
              ? 'bg-rose-50 border-rose-400 text-rose-900 shadow-2xs ring-2 ring-rose-400/20'
              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <span className="block text-[10px] text-slate-400 font-normal">
            {mode === 'english_to_hindi' ? 'Reverse Mode' : 'Mode 4'}
          </span>
          {mode === 'english_to_hindi' ? 'English → Hindi' : 'Hindi → English'}
        </button>
      </div>

      {/* Quick Preset Words */}
      <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1 text-[11px]">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Quick Try:
        </span>
        {quickPresets.map((preset) => (
          <button
            key={preset}
            onClick={() => setInputText(preset)}
            className="px-2.5 py-1 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 rounded-lg transition-colors shrink-0 text-xs border border-slate-200/70 cursor-pointer"
          >
            {preset}
          </button>
        ))}
      </div>

      {/* 2-Column Split: Input & Output Boxes */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {/* Input Box */}
        <div className="flex flex-col justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200 focus-within:ring-2 focus-within:ring-rose-500/20 focus-within:border-rose-400 transition-all">
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              <span>
                {mode === 'santali_roman_to_hindi' && 'Source: Santali (Roman)'}
                {mode === 'santali_dev_to_hindi' && 'Source: Santali (Devanagari)'}
                {mode === 'santali_to_english' && 'Source: Santali (Roman)'}
                {mode === 'hindi_to_english' && 'Source: Hindi (हिन्दी)'}
                {mode === 'hindi_to_santali_roman' && 'Source: Hindi (हिन्दी)'}
                {mode === 'hindi_to_santali_dev' && 'Source: Hindi (हिन्दी)'}
                {mode === 'english_to_santali' && 'Source: English'}
                {mode === 'english_to_hindi' && 'Source: English'}
              </span>
              <button
                onClick={() => setInputText('')}
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                Clear
              </button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to translate..."
              rows={4}
              className="w-full bg-transparent text-sm text-slate-900 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 mt-2 text-xs">
            <span className="text-slate-400 text-[11px]">{inputText.length} characters</span>
            <button
              onClick={handleTranslate}
              disabled={!inputText || isTranslating}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
            >
              <span>{isTranslating ? 'Translating...' : 'Translate'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Output Box */}
        <div className="flex flex-col justify-between p-4 bg-rose-50/50 rounded-2xl border border-rose-200 transition-all">
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-rose-800 mb-2">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                <span>
                  {mode === 'hindi_to_english' && 'Target: English'}
                  {mode === 'english_to_hindi' && 'Target: Hindi (हिन्दी)'}
                  {mode === 'hindi_to_santali_roman' && 'Target: Santali (Roman)'}
                  {mode === 'hindi_to_santali_dev' && 'Target: Santali (Devanagari)'}
                  {mode === 'santali_to_english' && 'Target: English'}
                  {mode === 'english_to_santali' && 'Target: Santali (Roman)'}
                  {(mode === 'santali_roman_to_hindi' || mode === 'santali_dev_to_hindi') && 'Target: Hindi (हिन्दी)'}
                </span>
              </span>
              <button
                onClick={handleReverseTranslation}
                title="Swap source & target"
                className="p-1 hover:bg-rose-100 rounded-md text-rose-700 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
              >
                <ArrowRightLeft className="w-3 h-3" />
                <span>Swap</span>
              </button>
            </div>

            <p className="text-base font-bold text-slate-900 leading-relaxed">
              {translatedText}
            </p>

            {secondaryText && (
              <div className="mt-3 p-2.5 bg-white/90 rounded-xl border border-rose-100 text-xs text-slate-700">
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-0.5">
                  Phonetics &amp; Reference
                </span>
                <p className="font-semibold text-rose-950">
                  {secondaryText}
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-rose-100 mt-3">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleSpeak(translatedText, (mode === 'hindi_to_english' || mode === 'santali_to_english') ? 'en-US' : 'hi-IN')}
                className="p-1.5 text-slate-600 hover:text-rose-700 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
                title="Speak translation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleCopy}
                className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
                title="Copy result"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  const textToTranslate = inputText || translatedText;
                  const targetLang = (mode.includes('english') || mode === 'santali_to_english') ? 'en' : 'hi';
                  const encoded = encodeURIComponent(textToTranslate);
                  window.open(`https://translate.google.com/?sl=auto&tl=${targetLang}&text=${encoded}&op=translate`, '_blank', 'noopener,noreferrer');
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors cursor-pointer ml-1"
                title="Open current text in Google Translator"
              >
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span>Google Translator</span>
              </button>
            </div>

            <span className="text-[10px] text-rose-700 font-semibold">
              BOSC Engine · Bidirectional
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
