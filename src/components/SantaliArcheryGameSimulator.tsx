import React, { useState, useEffect, useRef } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  Target,
  Volume2,
  Award,
  Sparkles,
  RotateCcw,
  Shield,
  Zap,
  CheckCircle2,
  Trophy,
  Flame,
  Info
} from 'lucide-react';

interface ArcheryQuestion {
  id: number;
  promptHindi: string;
  correctWordSantali: string;
  correctRoman: string;
  targets: { word: string; roman: string; isCorrect: boolean }[];
  hint: string;
}

const ARCHERY_CHALLENGES: ArcheryQuestion[] = [
  {
    id: 1,
    promptHindi: '"पवित्र साल (सखुआ) वृक्ष" को संताली में क्या कहते हैं?',
    correctWordSantali: 'सारजोम',
    correctRoman: 'Sarjom',
    targets: [
      { word: 'सारजोम', roman: 'Sarjom', isCorrect: true },
      { word: 'मातकोम', roman: 'Matkom', isCorrect: false },
      { word: 'उल', roman: 'Ul', isCorrect: false },
      { word: 'ताड़े', roman: 'Tare', isCorrect: false }
    ],
    hint: 'जाहेर थान का अधिष्ठाता पावन वृक्ष।'
  },
  {
    id: 2,
    promptHindi: '"जल / पानी" के लिए संताली शुद्ध शब्द क्या है?',
    correctWordSantali: 'दाक्',
    correctRoman: 'Dah',
    targets: [
      { word: 'सेंगेल', roman: 'Sengel', isCorrect: false },
      { word: 'दाक्', roman: 'Dah', isCorrect: true },
      { word: 'होय', roman: 'Hoy', isCorrect: false },
      { word: 'हासा', roman: 'Hasa', isCorrect: false }
    ],
    hint: 'चेपुद ध्वनि के साथ उच्चारित जल।'
  },
  {
    id: 3,
    promptHindi: '"धनुष और बाण" को संताली में क्या पुकारा जाता है?',
    correctWordSantali: 'आक-सार',
    correctRoman: 'Ak-Sar',
    targets: [
      { word: 'तुमदाक-तामाक', roman: 'Tumdah-Tamah', isCorrect: false },
      { word: 'तांगा-कुड़ी', roman: 'Tanga-Kudi', isCorrect: false },
      { word: 'आक-सार', roman: 'Ak-Sar', isCorrect: true },
      { word: 'दातरम-सार', roman: 'Datrom-Sar', isCorrect: false }
    ],
    hint: 'संताल हूल का प्रमुख हथियार।'
  },
  {
    id: 4,
    promptHindi: 'संताली में "अग्नि / आग" को क्या कहते हैं?',
    correctWordSantali: 'सेंगेल',
    correctRoman: 'Sengel',
    targets: [
      { word: 'सेंगेल', roman: 'Sengel', isCorrect: true },
      { word: 'रिमिल', roman: 'Rimil', isCorrect: false },
      { word: 'बेड़ा', roman: 'Bera', isCorrect: false },
      { word: 'इपिल', roman: 'Ipil', isCorrect: false }
    ],
    hint: 'प्रकाश और ऊर्जा का पावन प्रतीक।'
  },
  {
    id: 5,
    promptHindi: '"महुआ के फूल" को संताली में क्या कहा जाता है?',
    correctWordSantali: 'मातकोम',
    correctRoman: 'Matkom',
    targets: [
      { word: 'गुलाब', roman: 'Gulab', isCorrect: false },
      { word: 'मातकोम', roman: 'Matkom', isCorrect: true },
      { word: 'सारजोम', roman: 'Sarjom', isCorrect: false },
      { word: 'इचाक्', roman: 'Ichah', isCorrect: false }
    ],
    hint: 'संताली वनों का मीठा कल्पवृक्ष।'
  },
  {
    id: 6,
    promptHindi: 'संताली में "सूर्य (सूरज)" को क्या कहते हैं?',
    correctWordSantali: 'बेड़ा / चांदो',
    correctRoman: 'Bera / Chando',
    targets: [
      { word: 'बेड़ा / चांदो', roman: 'Bera / Chando', isCorrect: true },
      { word: 'हासा', roman: 'Hasa', isCorrect: false },
      { word: 'दाक्', roman: 'Dah', isCorrect: false },
      { word: 'गाड़ा', roman: 'Gada', isCorrect: false }
    ],
    hint: 'दिन में आकाश को प्रकाशित करने वाले सिंज चांदो।'
  },
  {
    id: 7,
    promptHindi: 'सकरात पर्व पर होने वाली प्रसिद्ध "केले के खंभे पर तीरंदाजी" को क्या कहते हैं?',
    correctWordSantali: 'बेझा तुञ',
    correctRoman: 'Bejha Tuny',
    targets: [
      { word: 'दासांय', roman: 'Dasangy', isCorrect: false },
      { word: 'सोहराय', roman: 'Sohrai', isCorrect: false },
      { word: 'बेझा तुञ', roman: 'Bejha Tuny', isCorrect: true },
      { word: 'लागड़े', roman: 'Lagre', isCorrect: false }
    ],
    hint: 'सकरात पर्व के दिन गांव के नवयुवकों की लक्ष्य-साधन प्रतियोगिता।'
  }
];

export const SantaliArcheryGameSimulator: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [arrowsLeft, setArrowsLeft] = useState(15);
  const [feedback, setFeedback] = useState<{ text: string; isSuccess: boolean } | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isShooting, setIsShooting] = useState(false);
  const [selectedTargetIndex, setSelectedTargetIndex] = useState<number | null>(null);

  const currentChallenge = ARCHERY_CHALLENGES[currentIdx];

  const playBowSound = (isHit: boolean) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = isHit ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(isHit ? 440 : 220, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(isHit ? 880 : 110, audioCtx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch {
      // Audio fallback
    }
  };

  const handleSpeak = (text: string) => {
    speakWithFemaleVoice(text, { lang: 'hi-IN', rate: 0.88 });
  };

  const shootArrow = (targetIdx: number) => {
    if (isShooting || arrowsLeft <= 0 || isGameOver) return;

    setIsShooting(true);
    setSelectedTargetIndex(targetIdx);
    setArrowsLeft((prev) => prev - 1);

    const target = currentChallenge.targets[targetIdx];

    setTimeout(() => {
      if (target.isCorrect) {
        playBowSound(true);
        const newScore = score + 100 + streak * 20;
        const newStreak = streak + 1;
        setScore(newScore);
        setStreak(newStreak);
        if (newStreak > bestStreak) setBestStreak(newStreak);

        setFeedback({
          text: `🎯 अचूक निशाना (Bullseye)! "${target.word}" सही उत्तर है!`,
          isSuccess: true
        });

        handleSpeak(`${target.word}. बिल्कुल सही निशाना!`);

        setTimeout(() => {
          setFeedback(null);
          setIsShooting(false);
          setSelectedTargetIndex(null);
          if (currentIdx + 1 < ARCHERY_CHALLENGES.length) {
            setCurrentIdx((prev) => prev + 1);
          } else {
            setIsGameOver(true);
          }
        }, 1200);
      } else {
        playBowSound(false);
        setStreak(0);
        setFeedback({
          text: `❌ चूक गए! सही शब्द था: "${currentChallenge.correctWordSantali}"`,
          isSuccess: false
        });

        setTimeout(() => {
          setFeedback(null);
          setIsShooting(false);
          setSelectedTargetIndex(null);
          if (arrowsLeft - 1 <= 0) {
            setIsGameOver(true);
          }
        }, 1200);
      }
    }, 400);
  };

  const resetGame = () => {
    setCurrentIdx(0);
    setScore(0);
    setStreak(0);
    setArrowsLeft(15);
    setIsGameOver(false);
    setFeedback(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-stone-50 via-amber-50 to-orange-50 text-slate-900 p-6 md:p-8 shadow-xl relative overflow-hidden border border-amber-500/30">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 border border-amber-400/40 text-xs font-bold uppercase tracking-wider">
            <Target className="w-3.5 h-3.5 text-amber-600" />
            <span>आक-सार धनुर्विद्या व बेझा तुञ · Traditional Archery & Word Target Game</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-amber-800 tracking-tight">
            संताली तीरंदाजी व शब्द निशाना सिमुलेटर (Ak-Sar Archery Master)
          </h1>

          <p className="text-xs md:text-sm text-amber-800/90 leading-relaxed font-sans">
            संताली धनुष (आक) और बाण (सार) का शास्त्रीय इतिहास और बेझा तुञ की प्राचीन परंपरा। सही संताली शब्द के निशाने पर तीर चलाएं और सर्वोच्च धनुर्धर की उपाधि हासिल करें!
          </p>

          <div className="flex items-center gap-4 pt-1 text-xs text-amber-700">
            <span className="font-bold flex items-center gap-1">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>अंक: {score}</span>
            </span>
            <span>•</span>
            <span className="font-bold flex items-center gap-1 text-orange-600">
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
              <span>लगातार सही: {streak}</span>
            </span>
            <span>•</span>
            <span className="text-slate-700">तीर शेष: {arrowsLeft}</span>
          </div>
        </div>
      </div>

      {/* Main Archery Range Canvas / Arena */}
      <div className="bg-slate-50 rounded-3xl border border-amber-400/40 p-6 md:p-8 text-slate-900 relative overflow-hidden shadow-2xl">
        {/* Ambient Target Rings Graphic */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-8 border-amber-500/10 pointer-events-none" />
        <div className="absolute right-10 top-1/2 -translate-y-1/2 w-60 h-60 rounded-full border-8 border-orange-500/10 pointer-events-none" />

        {!isGameOver ? (
          <div className="relative z-10 space-y-6">
            {/* Top Question Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/70 p-4 rounded-2xl border border-slate-200">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                  लक्ष्य प्रश्न #{currentIdx + 1} / {ARCHERY_CHALLENGES.length}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {currentChallenge.promptHindi}
                </h3>
                <p className="text-[11px] text-slate-600">
                  संकेत: {currentChallenge.hint}
                </p>
              </div>

              <button
                onClick={() => handleSpeak(`${currentChallenge.promptHindi}`)}
                className="p-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-700 border border-amber-400/30 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer shrink-0 self-start sm:self-auto"
              >
                <Volume2 className="w-4 h-4" />
                <span>प्रश्न सुनें</span>
              </button>
            </div>

            {/* Target Ring Cards */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-orange-600" />
                <span>सही संताली शब्द पर निशाना साधने के लिए क्लिक करें (Shoot Target):</span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentChallenge.targets.map((tgt, idx) => {
                  const isSelected = selectedTargetIndex === idx;
                  return (
                    <button
                      key={idx}
                      disabled={isShooting}
                      onClick={() => shootArrow(idx)}
                      className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
                        isSelected
                          ? tgt.isCorrect
                            ? 'bg-emerald-600/30 border-emerald-400 ring-2 ring-emerald-400'
                            : 'bg-rose-600/30 border-rose-400 ring-2 ring-rose-400'
                          : 'bg-white/80 hover:bg-slate-100/90 border-slate-200 hover:border-amber-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-600">
                            लक्ष्य #{idx + 1}
                          </span>
                          <h4 className="text-xl font-black text-amber-800 group-hover:text-amber-800">
                            {tgt.word}
                          </h4>
                          <p className="text-xs text-amber-600/90 font-mono">
                            "{tgt.roman}"
                          </p>
                        </div>

                        <div className="w-12 h-12 rounded-full border-2 border-dashed border-amber-400/40 flex items-center justify-center group-hover:scale-110 group-hover:border-amber-400 transition-all bg-amber-500/10">
                          <Target className="w-6 h-6 text-amber-600 group-hover:rotate-45 transition-transform" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Feedback Toast */}
            {feedback && (
              <div
                className={`p-3.5 rounded-2xl border text-center font-bold text-sm animate-in fade-in zoom-in-95 duration-200 ${
                  feedback.isSuccess
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-800'
                    : 'bg-rose-500/20 border-rose-400 text-rose-800'
                }`}
              >
                {feedback.text}
              </div>
            )}
          </div>
        ) : (
          /* Game Over / Victory Screen */
          <div className="py-8 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-600 shadow-lg">
              <Trophy className="w-8 h-8 animate-bounce" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                तीरंदाजी पूर्ण · Archery Completed
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                {score >= 500 ? '🏹 बीर सारजोम (महान धनुर्धर)' : '🎯 कुशल संताली तीरंदाज'}
              </h2>
              <p className="text-xs text-slate-700 mt-1">
                आपने कुल {score} अंक अर्जित किए! सर्वश्रेष्ठ स्ट्रीक: {bestStreak}
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={resetGame}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 font-black text-xs shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 stroke-[3]" />
                <span>पुनः खेलें (Play Again)</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cultural Anatomy of Ak-Sar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 space-y-4 shadow-sm">
        <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-600" />
          <span>संताली आक-सार (धनुष-बाण) की शास्त्रीय बनावट व बेझा तुञ परंपरा</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
            <h4 className="font-bold text-amber-950">1. आक (धनुष - The Bow)</h4>
            <p className="text-slate-600 leading-relaxed">
              पहाड़ी ठोस बांस या धामिन वृक्ष की लचीली लकड़ी से बनाया जाता है। डोरी (बान) मूंज घास या हिरण की अंतड़ियों से गूंथी जाती है जो कभी नहीं टूटती।
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-200 space-y-1">
            <h4 className="font-bold text-orange-950">2. सार (बाण - The Arrows)</h4>
            <p className="text-slate-600 leading-relaxed">
              सरकंडा घास की पतली डंडी के पिछले भाग पर गिद्ध या चील के पंख (इल) लगाए जाते हैं ताकि हवा में बाण सीधा घूमे। आगे लोहे का तीक्ष्ण फलक जड़ा होता है।
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
            <h4 className="font-bold text-emerald-950">3. बेझा तुञ (सकरात प्रतियोगिता)</h4>
            <p className="text-slate-600 leading-relaxed">
              मकर संक्रांति (सकरात) के दिन मैदान में केले का खंभा गाड़कर 100 गज की दूरी से तीर मारा जाता है। जो युवा निशाना साधता है, उसे पूरे गांव में कंधे पर उठाकर सम्मानित किया जाता है।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
