import React, { useState, useEffect, useMemo } from 'react';
import { useAdmin } from '../context/AdminContext';
import { SantaliWord } from '../types';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  Flame,
  Trophy,
  Volume2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Share2,
  Calendar,
  Check,
  Award,
  BookOpen,
  Zap,
  HelpCircle
} from 'lucide-react';

interface QuizQuestion {
  word: SantaliWord;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
}

interface StreakData {
  currentStreak: number;
  bestStreak: number;
  totalCompleted: number;
  totalScore: number;
  lastCompletedDate: string; // 'YYYY-MM-DD'
  history: Record<string, { date: string; score: number; total: number }>;
}

const STORAGE_KEY = 'hk_daily_vocab_quiz_streak_v1';

function getTodayDateStr(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getYesterdayDateStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Deterministic seed based on date string
function getDaySeed(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Simple seeded pseudo-random generator
function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function () {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Shuffle array with seeded PRNG or standard Math.random
function shuffleArray<T>(array: T[], randFn?: () => number): T[] {
  const arr = [...array];
  const rand = randFn || Math.random;
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const DailyVocabQuiz: React.FC<{
  compact?: boolean;
  onNavigateHome?: () => void;
  onExploreInDictionary?: () => void;
}> = ({ compact = false, onNavigateHome, onExploreInDictionary }) => {
  const { words } = useAdmin();

  // Streak state from localStorage
  const [streakData, setStreakData] = useState<StreakData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return {
      currentStreak: 0,
      bestStreak: 0,
      totalCompleted: 0,
      totalScore: 0,
      lastCompletedDate: '',
      history: {},
    };
  });

  const todayStr = getTodayDateStr();
  const yesterdayStr = getYesterdayDateStr();
  const isAlreadyCompletedToday = streakData.lastCompletedDate === todayStr;

  // Mode: 'daily' (today's 5 words) or 'practice' (unlimited random words)
  const [quizMode, setQuizMode] = useState<'daily' | 'practice'>('daily');
  const [practiceSeed, setPracticeSeed] = useState(0);

  // Active quiz session state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<boolean[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Pick 5 words deterministically or randomly for practice
  const questions: QuizQuestion[] = useMemo(() => {
    if (!words || words.length === 0) return [];

    let selectedWords: SantaliWord[] = [];

    if (quizMode === 'daily') {
      const seed = getDaySeed(todayStr);
      const prng = seededRandom(seed);
      const shuffled = shuffleArray(words, prng);
      selectedWords = shuffled.slice(0, 5);
    } else {
      const prng = seededRandom(Date.now() + practiceSeed);
      const shuffled = shuffleArray(words, prng);
      selectedWords = shuffled.slice(0, 5);
    }

    return selectedWords.map((word, qIdx) => {
      // Correct option text
      const correctText = `${word.meaningEnglish} · ${word.meaningHindi}`;

      // 3 Distractors from other words
      const otherWords = words.filter((w) => w.id !== word.id && w.meaningEnglish !== word.meaningEnglish);
      const randFn = quizMode === 'daily' ? seededRandom(getDaySeed(todayStr) + qIdx * 13) : Math.random;
      const shuffledOthers = shuffleArray(otherWords, randFn).slice(0, 3);

      const options = [
        { id: `opt-correct-${word.id}`, text: correctText, isCorrect: true },
        ...shuffledOthers.map((o, idx) => ({
          id: `opt-wrong-${o.id}-${idx}`,
          text: `${o.meaningEnglish} · ${o.meaningHindi}`,
          isCorrect: false,
        })),
      ];

      return {
        word,
        options: shuffleArray(options, randFn),
      };
    });
  }, [words, quizMode, todayStr, practiceSeed]);

  // Audio speech handler
  const handleSpeakWord = (word: SantaliWord) => {
    const textToSpeak = word.wordDevanagari || word.wordRoman;
    speakWithFemaleVoice(textToSpeak, { lang: 'hi-IN', rate: 0.85 });
  };

  // Handle option select
  const handleSelectOption = (optionId: string, isCorrect: boolean) => {
    if (selectedOptionId !== null) return; // Prevent double clicking

    setSelectedOptionId(optionId);
    setUserAnswers((prev) => [...prev, isCorrect]);
  };

  // Move to next question or finish
  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
    } else {
      // Quiz Finished!
      finishQuiz();
    }
  };

  // Finalize quiz & update streak if in daily mode
  const finishQuiz = () => {
    setIsFinished(true);

    if (quizMode === 'daily') {
      const currentScore = userAnswers.filter(Boolean).length;
      setStreakData((prev) => {
        let newStreak = prev.currentStreak;

        if (prev.lastCompletedDate === todayStr) {
          // Already completed today previously, retain streak
          newStreak = prev.currentStreak;
        } else if (prev.lastCompletedDate === yesterdayStr) {
          // Maintained consecutive streak!
          newStreak = prev.currentStreak + 1;
        } else {
          // Streak started or reset
          newStreak = 1;
        }

        const newBestStreak = Math.max(prev.bestStreak, newStreak);
        const updatedHistory = {
          ...prev.history,
          [todayStr]: {
            date: todayStr,
            score: currentScore,
            total: 5,
          },
        };

        const updated: StreakData = {
          currentStreak: newStreak,
          bestStreak: newBestStreak,
          totalCompleted: prev.totalCompleted + 1,
          totalScore: prev.totalScore + currentScore,
          lastCompletedDate: todayStr,
          history: updatedHistory,
        };

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // Ignore write error
        }

        return updated;
      });
    }
  };

  // Start fresh practice quiz
  const handleStartPractice = () => {
    setQuizMode('practice');
    setPracticeSeed((prev) => prev + 1);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setUserAnswers([]);
    setIsFinished(false);
  };

  // Restart daily quiz (for replay / review)
  const handleRestartDaily = () => {
    setQuizMode('daily');
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setUserAnswers([]);
    setIsFinished(false);
  };

  // Copy share result
  const handleCopyShare = () => {
    const score = userAnswers.filter(Boolean).length;
    const squares = userAnswers.map((a) => (a ? '🟩' : '🟥')).join('');
    const shareText = `🔥 Hor Katha Daily Santali Quiz #${todayStr}
Streak: ${streakData.currentStreak} Days | Score: ${score}/5
${squares}
Test your Santali vocabulary at Hor Katha Suite (BOSC Tech & Edu)`;

    navigator.clipboard?.writeText(shareText);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center max-w-md mx-auto my-8">
        <BookOpen className="w-8 h-8 text-amber-600 mx-auto mb-2 animate-bounce" />
        <h3 className="font-bold text-slate-800">Loading Daily Quiz...</h3>
        <p className="text-xs text-slate-500 mt-1">Preparing today's 5 vocabulary words.</p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const score = userAnswers.filter(Boolean).length;

  return (
    <div className={`space-y-4 max-w-4xl mx-auto ${compact ? 'p-2 text-xs' : ''}`}>
      {/* Top Banner & Streak Header */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white p-4 sm:p-5 rounded-2xl shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-4">
          <Flame className="w-48 h-48 text-white -rotate-12" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                <span>{todayStr}</span>
              </span>
              {quizMode === 'practice' && (
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[10px] font-extrabold uppercase tracking-wider">
                  Practice Round
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-black mt-1 tracking-tight flex items-center gap-2">
              <span>Daily Santali Vocabulary Quiz</span>
            </h1>
            <p className="text-xs sm:text-sm text-amber-100 font-medium mt-0.5">
              Master 5 indigenous words every day · Build your consecutive streak!
            </p>
          </div>

          {/* Gamified Streak & Best Score Pill Cards */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Active Streak */}
            <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-3.5 py-2 flex items-center gap-2.5 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-xs">
                <Flame className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-100 block tracking-wider leading-none">
                  Streak
                </span>
                <span className="text-base sm:text-lg font-black leading-tight text-white">
                  {streakData.currentStreak} <span className="text-xs font-semibold">Days</span>
                </span>
              </div>
            </div>

            {/* Best Record */}
            <div className="hidden sm:flex bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-3.5 py-2 items-center gap-2.5 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-yellow-400 to-amber-500 flex items-center justify-center text-white shadow-xs">
                <Trophy className="w-5 h-5 text-amber-950" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-100 block tracking-wider leading-none">
                  Best
                </span>
                <span className="text-base sm:text-lg font-black leading-tight text-white">
                  {streakData.bestStreak} <span className="text-xs font-semibold">Days</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Screen 1: Already Completed Today Banner (if user returns on the same day and quiz is not active) */}
      {isAlreadyCompletedToday && quizMode === 'daily' && isFinished === false && currentIndex === 0 && (
        <div className="bg-white rounded-2xl p-5 border border-emerald-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Today's Challenge Already Conquered!
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Completed
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Your streak is locked in for today (🔥 {streakData.currentStreak} Days). You can replay today's words or challenge yourself in Unlimited Practice Mode!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <button
              onClick={handleStartPractice}
              className="flex-1 sm:flex-initial px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Practice Mode</span>
            </button>
            <button
              onClick={handleRestartDaily}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Review Words
            </button>
          </div>
        </div>
      )}

      {/* Screen 2: Active Quiz Card */}
      {!isFinished ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
          {/* Progress Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Word {currentIndex + 1} of {questions.length}
              </span>
              <div className="flex items-center gap-1">
                {questions.map((_, idx) => {
                  const isAnswered = idx < userAnswers.length;
                  const isCorrect = userAnswers[idx];
                  return (
                    <div
                      key={idx}
                      className={`w-5 h-2 rounded-full transition-all ${
                        isAnswered
                          ? isCorrect
                            ? 'bg-emerald-500'
                            : 'bg-rose-500'
                          : idx === currentIndex
                          ? 'bg-amber-500 scale-105'
                          : 'bg-slate-200'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
              <span className="flex items-center gap-1 text-emerald-600">
                <Check className="w-4 h-4" /> {score} Correct
              </span>
            </div>
          </div>

          {/* Word Presentation Hero Section */}
          <div className="p-6 sm:p-8 bg-gradient-to-b from-amber-50/50 via-white to-white text-center border-b border-slate-100">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-800 text-[11px] font-bold uppercase tracking-wider mb-3">
              <span>{currentQ.word.category || 'Vocabulary'}</span>
              <span>•</span>
              <span>{currentQ.word.partOfSpeech || 'Word'}</span>
            </div>

            {/* Big Roman Santali & Santali Devanagari Headings */}
            <div className="space-y-1 my-2">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-3">
                <span>{currentQ.word.wordRoman}</span>
                <button
                  onClick={() => handleSpeakWord(currentQ.word)}
                  title="Pronounce with female voice"
                  className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 transition-all hover:scale-105 cursor-pointer shadow-2xs"
                >
                  <Volume2 className="w-5 h-5 text-amber-700" />
                </button>
              </h2>

              <div className="flex flex-wrap items-center justify-center gap-3 text-slate-600 pt-1">
                <span className="text-xl sm:text-2xl font-bold font-serif text-amber-900 bg-amber-50/80 px-3 py-0.5 rounded-lg border border-amber-200/50">
                  {currentQ.word.wordDevanagari}
                </span>
                <span className="text-sm font-medium text-slate-700 bg-slate-100 px-3 py-0.5 rounded-lg border border-slate-200">
                  संताली देवनागरी
                </span>
              </div>
            </div>

            {currentQ.word.phonetic && (
              <p className="text-xs text-slate-400 font-mono mt-2">
                Pronunciation: /{currentQ.word.phonetic}/
              </p>
            )}

            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-4">
              Select the correct meaning in English &amp; Hindi:
            </p>
          </div>

          {/* Options Grid */}
          <div className="p-4 sm:p-6 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = selectedOptionId === option.id;
                const isAnswered = selectedOptionId !== null;

                let btnStyles =
                  'bg-slate-50/80 hover:bg-amber-50/50 hover:border-amber-300 border-slate-200 text-slate-800';

                if (isAnswered) {
                  if (option.isCorrect) {
                    btnStyles =
                      'bg-emerald-50 border-emerald-400 text-emerald-900 ring-2 ring-emerald-500/20 font-bold';
                  } else if (isSelected && !option.isCorrect) {
                    btnStyles =
                      'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-500/20';
                  } else {
                    btnStyles = 'bg-slate-50/40 border-slate-200 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={option.id}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(option.id, option.isCorrect)}
                    className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all duration-150 cursor-pointer ${btnStyles}`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${
                        isAnswered && option.isCorrect
                          ? 'bg-emerald-500 text-white'
                          : isAnswered && isSelected && !option.isCorrect
                          ? 'bg-rose-500 text-white'
                          : 'bg-white border border-slate-300 text-slate-600'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold flex-1 leading-snug">
                      {option.text}
                    </span>
                    {isAnswered && option.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswered && isSelected && !option.isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation & Example sentence (Appears right after answering) */}
            {selectedOptionId !== null && (
              <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200/80 space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Example Usage in Sentence:</span>
                  </span>
                  <button
                    onClick={() =>
                      speakWithFemaleVoice(
                        currentQ.word.exampleHindi || currentQ.word.exampleSantali,
                        { lang: 'hi-IN' }
                      )
                    }
                    className="text-[11px] font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Listen Sentence
                  </button>
                </div>

                <div className="text-xs space-y-1">
                  <p className="font-semibold text-slate-800">
                    <span className="text-amber-700 font-bold">Santali: </span>
                    {currentQ.word.exampleSantali || `${currentQ.word.wordRoman} adi bhageya.`}
                  </p>
                  <p className="text-slate-600">
                    <span className="text-slate-500 font-medium">Hindi: </span>
                    {currentQ.word.exampleHindi || currentQ.word.meaningHindi}
                  </p>
                  <p className="text-slate-500 text-[11px]">
                    <span className="text-slate-400 font-medium">English: </span>
                    {currentQ.word.exampleEnglish || currentQ.word.meaningEnglish}
                  </p>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 hover:scale-102 transition-all cursor-pointer"
                  >
                    <span>{currentIndex + 1 === questions.length ? 'Finish & See Results' : 'Next Question'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Screen 3: Results & Celebration Screen */
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-8 space-y-6 text-center">
          {/* Trophy & Celebration Badge */}
          <div className="relative inline-block mx-auto">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white shadow-lg mx-auto">
              <Trophy className="w-10 h-10 sm:w-12 sm:h-12 animate-bounce" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white font-black text-xs shadow-md">
              <Check className="w-5 h-5 stroke-[3]" />
            </div>
          </div>

          <div>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
              {quizMode === 'daily' ? "Today's Daily Challenge Conquered!" : 'Practice Session Completed!'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Johar! {score === 5 ? 'Perfect 5/5 Score!' : `You Scored ${score} / 5!`}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
              {score === 5
                ? 'Outstanding mastery of Santali vocabulary! Your dedication keeps our heritage language alive.'
                : 'Great effort! Review the words below to strengthen your memory.'}
            </p>
          </div>

          {/* Gamified Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
            <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200/60">
              <div className="flex items-center justify-center gap-1 text-amber-700 mb-1">
                <Flame className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Streak</span>
              </div>
              <span className="text-lg sm:text-xl font-black text-amber-950">
                {streakData.currentStreak} <span className="text-xs font-semibold">Days</span>
              </span>
            </div>

            <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200/60">
              <div className="flex items-center justify-center gap-1 text-emerald-700 mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Accuracy</span>
              </div>
              <span className="text-lg sm:text-xl font-black text-emerald-950">
                {Math.round((score / 5) * 100)}%
              </span>
            </div>

            <div className="p-3 bg-sky-50/80 rounded-2xl border border-sky-200/60">
              <div className="flex items-center justify-center gap-1 text-sky-700 mb-1">
                <Zap className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">XP Earned</span>
              </div>
              <span className="text-lg sm:text-xl font-black text-sky-950">
                +{score * 20} XP
              </span>
            </div>

            <div className="p-3 bg-purple-50/80 rounded-2xl border border-purple-200/60">
              <div className="flex items-center justify-center gap-1 text-purple-700 mb-1">
                <Award className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Total Quizzes</span>
              </div>
              <span className="text-lg sm:text-xl font-black text-purple-950">
                {streakData.totalCompleted}
              </span>
            </div>
          </div>

          {/* Share & Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleCopyShare}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer hover:scale-102"
            >
              <Share2 className="w-4 h-4" />
              <span>{copiedShare ? 'Copied to Clipboard!' : 'Share Scorecard'}</span>
            </button>

            <button
              onClick={handleStartPractice}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer hover:scale-102"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Unlimited Practice Round</span>
            </button>

            {onNavigateHome && (
              <button
                onClick={onNavigateHome}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Back to Home Dashboard
              </button>
            )}
          </div>

          {/* Review of Today's 5 Words */}
          <div className="pt-6 border-t border-slate-100 text-left">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Today's 5 Vocabulary Words Review:</span>
              </h3>
              {onExploreInDictionary && (
                <button
                  onClick={onExploreInDictionary}
                  className="text-xs font-bold text-sky-600 hover:underline"
                >
                  View in Dictionary →
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {questions.map((q, idx) => {
                const wasCorrect = userAnswers[idx];
                return (
                  <div
                    key={q.word.id}
                    className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/60 flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                            wasCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {wasCorrect ? '✓' : '✗'}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm">
                          {q.word.wordRoman}
                        </h4>
                        <span className="text-xs font-serif text-amber-800">
                          ({q.word.wordDevanagari})
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        <strong>English: </strong>
                        {q.word.meaningEnglish}
                      </p>
                      <p className="text-xs text-slate-500">
                        <strong>Hindi: </strong>
                        {q.word.meaningHindi}
                      </p>
                      {q.word.exampleSantali && (
                        <p className="text-[11px] text-slate-400 mt-1 italic line-clamp-1">
                          "{q.word.exampleSantali}"
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleSpeakWord(q.word)}
                      title="Listen pronunciation"
                      className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-amber-50 text-amber-700 shrink-0 cursor-pointer shadow-2xs"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
