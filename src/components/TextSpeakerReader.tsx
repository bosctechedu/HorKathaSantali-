import React, { useState } from 'react';
import {
  speakWithFemaleVoice,
  stopSpeaking,
  playAcousticChime
} from '../utils/speech';
import {
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Sparkles,
  Sliders,
  Check,
  Languages,
  Headphones,
  Radio
} from 'lucide-react';

export const TextSpeakerReader: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [inputText, setInputText] = useState('जोहार! होड़ कथा सुइट रे आपे जोतो को सागुनदाराम!');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.88);
  const [speechPitch, setSpeechPitch] = useState(1.15);
  const [testStatus, setTestStatus] = useState<string | null>(null);

  const presets = [
    { label: 'जोहार (Johar)', text: 'जोहार! आबो संताली भाषा आर साहित्य जियाड़ ताहेन मा।' },
    { label: 'सागुन सेताक (Good Morning)', text: 'सागुन सेताक! तेहेञाक दिन दो आड़ि नापाय आर रासका ते पेरेज कोक मा।' },
    { label: 'सोहराय पोरोब (Sohrai)', text: 'सोहराय पोरोब रेनाक आयमा आयमा सागुन जोहार आर रासका।' },
    { label: 'आबो उपरुम (Motto)', text: 'आबो रोड़, आबो उपरुम, आबो गोरोब।' },
    { label: 'हिन्दी संवाद', text: 'नमस्कार! होर कथा सुइट में आपका हार्दिक स्वागत है। संताली भाषा और देवनागरी लिपि सीखें।' },
    { label: 'English Johar', text: 'Johar! Welcome to the Hor Katha Suite digital linguistic platform.' }
  ];

  const handleSpeak = (textToSpeak = inputText) => {
    if (!textToSpeak.trim()) return;

    setIsSpeaking(true);
    setTestStatus('Speaking aloud with Female Voice...');

    speakWithFemaleVoice(textToSpeak, {
      lang: 'hi-IN',
      rate: speechRate,
      pitch: speechPitch,
      volume: 1.0,
      onEnd: () => {
        setIsSpeaking(false);
        setTestStatus('Speech completed successfully.');
        setTimeout(() => setTestStatus(null), 3000);
      }
    });
  };

  const handleStop = () => {
    stopSpeaking();
    setIsSpeaking(false);
    setTestStatus('Speech stopped.');
  };

  const handleHardwareTest = () => {
    playAcousticChime(659.25, 0.4);
    setTimeout(() => {
      speakWithFemaleVoice('ध्वनि परीक्षण सफल। स्पीकर ठीक से काम कर रहा है। Sound test passed.', {
        lang: 'hi-IN',
        onEnd: () => {
          setTestStatus('Speaker test 100% verified! Sound working.');
        }
      });
    }, 200);
  };

  return (
    <div className={`bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden font-sans ${compact ? 'p-3' : 'p-6 sm:p-7'} space-y-5`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-xs shrink-0">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>Universal Voice Speaker &amp; Reader</span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                Female Voice Active
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Type or paste any text in Santali Devanagari, Roman, Hindi or English for crystal-clear spoken recitation.
            </p>
          </div>
        </div>

        {/* Hardware Sound Test Button */}
        <button
          onClick={handleHardwareTest}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs transition-all shadow-2xs cursor-pointer hover:scale-105 active:scale-95"
          title="Play Acoustic Test Chime and Voice Check"
        >
          <Radio className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
          <span>Test Speaker Sound</span>
        </button>
      </div>

      {/* Preset Phrases Strip */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-600" />
          <span>Quick Pronunciation Presets (क्विक संताली संवाद):</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputText(p.text);
                handleSpeak(p.text);
              }}
              className="px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-900 border border-slate-200 hover:border-amber-400 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Textarea Input */}
      <div className="relative">
        <textarea
          rows={compact ? 3 : 4}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter or paste Santali Devanagari (संताली देवनागरी), Roman, Hindi or English text here..."
          className="w-full p-4 border border-slate-200 rounded-2xl text-sm sm:text-base font-serif font-medium text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-inner bg-[#FAFCFF]"
        />

        {/* Live Speaking Waves indicator */}
        {isSpeaking && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md animate-pulse">
            <Volume2 className="w-3.5 h-3.5" />
            <span>Speaking Now...</span>
          </div>
        )}
      </div>

      {/* Speed & Pitch Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs">
        <div>
          <div className="flex justify-between font-bold text-slate-700 mb-1">
            <span>Speech Rate / गति</span>
            <span className="font-mono text-amber-700">{speechRate.toFixed(2)}x</span>
          </div>
          <input
            type="range"
            min={0.6}
            max={1.3}
            step={0.05}
            value={speechRate}
            onChange={(e) => setSpeechRate(Number(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>Slow (क्लियर)</span>
            <span>Normal</span>
            <span>Fast</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between font-bold text-slate-700 mb-1">
            <span>Voice Pitch / स्वर पिच</span>
            <span className="font-mono text-amber-700">{speechPitch.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={0.9}
            max={1.4}
            step={0.05}
            value={speechPitch}
            onChange={(e) => setSpeechPitch(Number(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>Deep Tone</span>
            <span>Sweet Female Voice</span>
            <span>High</span>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          {isSpeaking ? (
            <button
              onClick={handleStop}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <VolumeX className="w-4 h-4" />
              <span>Stop Speaking</span>
            </button>
          ) : (
            <button
              onClick={() => handleSpeak()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-black text-xs flex items-center gap-2 transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Speak Aloud (पढ़कर सुनाएं)</span>
            </button>
          )}

          <button
            onClick={() => setInputText('')}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer text-xs font-semibold"
            title="Clear text"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {testStatus && (
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 animate-fadeIn">
            ✓ {testStatus}
          </span>
        )}
      </div>
    </div>
  );
};
