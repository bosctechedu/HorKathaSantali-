import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { SantaliWord } from '../types';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  Layers,
  RotateCw,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Bookmark
} from 'lucide-react';

export const SantaliFlashcards: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { words } = useAdmin();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learnedCount, setLearnedCount] = useState(0);

  const currentWord: SantaliWord | undefined = words[currentIndex] || words[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1 < words.length ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : words.length - 1));
  };

  const handleRandom = () => {
    setIsFlipped(false);
    const rand = Math.floor(Math.random() * words.length);
    setCurrentIndex(rand);
  };

  const handleListen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentWord) return;
    speakWithFemaleVoice(currentWord.wordDevanagari || currentWord.wordRoman, { lang: 'hi-IN' });
  };

  const handleMarkLearned = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLearnedCount((prev) => prev + 1);
    handleNext();
  };

  if (!currentWord) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
        <p className="font-bold text-slate-700">Loading flashcards...</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 max-w-2xl mx-auto ${compact ? 'p-1 text-xs' : ''}`}>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white p-5 rounded-3xl shadow-sm flex items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider">
            Memory Retention Tool
          </span>
          <h1 className="text-xl sm:text-2xl font-black mt-1 tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5" />
            <span>Santali Flashcards</span>
          </h1>
          <p className="text-xs text-purple-100 font-medium mt-0.5">
            Tap card to flip between Santali Devanagari/Roman and Hindi/English meaning.
          </p>
        </div>

        <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-3.5 py-2 text-right shrink-0">
          <span className="text-[10px] uppercase font-bold text-purple-100 block">Mastered</span>
          <span className="text-base font-black text-white">{learnedCount} Words</span>
        </div>
      </div>

      {/* 3D Flip Card */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full min-h-[320px] rounded-3xl bg-white border-2 border-slate-200 shadow-md hover:shadow-lg transition-all cursor-pointer p-6 sm:p-8 flex flex-col justify-between select-none relative group"
      >
        {/* Top Card Badge */}
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 font-mono text-xs font-bold uppercase tracking-wider">
            {currentWord.category || 'Vocabulary'} • Word {currentIndex + 1} of {words.length}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleListen}
              className="p-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-800 transition-colors shadow-2xs cursor-pointer"
              title="Listen Pronunciation"
            >
              <Volume2 className="w-4 h-4 text-purple-700" />
            </button>
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <RotateCw className="w-3.5 h-3.5" /> Tap to flip
            </span>
          </div>
        </div>

        {/* Card Content (Front vs Back) */}
        {!isFlipped ? (
          /* FRONT SIDE: Santali Devanagari & Roman */
          <div className="my-auto text-center py-6 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 block">
              SANTALI DEVANAGARI (संताली देवनागरी)
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {currentWord.wordDevanagari}
            </h2>
            <div className="flex items-center justify-center gap-3">
              <span className="text-xl sm:text-2xl font-bold font-mono text-slate-800 bg-slate-100 px-4 py-1 rounded-xl border border-slate-200">
                {currentWord.wordRoman}
              </span>
            </div>
            {currentWord.phonetic && (
              <p className="text-xs text-slate-400 font-mono mt-2">
                /{currentWord.phonetic}/
              </p>
            )}
          </div>
        ) : (
          /* BACK SIDE: Hindi & English Meaning + Example */
          <div className="my-auto text-center py-6 space-y-3 animate-in fade-in duration-150">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block">
              MEANINGS &amp; SENTENCE USAGE
            </span>
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-black text-slate-900">
                {currentWord.meaningHindi}
              </p>
              <p className="text-lg sm:text-xl font-bold text-slate-600">
                {currentWord.meaningEnglish}
              </p>
            </div>

            {currentWord.exampleSantali && (
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs text-left max-w-md mx-auto space-y-1">
                <p className="font-bold text-slate-800">
                  <span className="text-purple-600">Santali: </span>
                  {currentWord.exampleSantali}
                </p>
                <p className="text-slate-500">
                  <span className="text-slate-400">Hindi: </span>
                  {currentWord.exampleHindi || currentWord.meaningHindi}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Card Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-400">
            {isFlipped ? 'Showing Back (Meaning)' : 'Showing Front (Santali)'}
          </span>

          <button
            onClick={handleMarkLearned}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer hover:scale-105"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Mark as Mastered (+10 XP)</span>
          </button>
        </div>
      </div>

      {/* Carousel Navigation Toolbar */}
      <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={handleRandom}
          className="px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Random Card"
        >
          <Shuffle className="w-3.5 h-3.5 text-purple-600" />
          <span>Shuffle</span>
        </button>

        <button
          onClick={handleNext}
          className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer hover:scale-105"
        >
          <span>Next Word</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
