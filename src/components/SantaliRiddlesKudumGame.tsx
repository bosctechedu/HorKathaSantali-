import React, { useState } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  HelpCircle,
  Volume2,
  Sparkles,
  Award,
  RefreshCw,
  Eye,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Trophy,
  BrainCircuit
} from 'lucide-react';

interface KudumRiddle {
  id: string;
  riddleSantaliDev: string;
  riddleRoman: string;
  riddleHindiMeaning: string;
  optionsDev: string[];
  correctAnswerDev: string;
  explanationHindi: string;
  culturalNote: string;
  hint: string;
}

const KUDUM_RIDDLES: KudumRiddle[] = [
  {
    id: 'k1',
    riddleSantaliDev: 'मित् टान् गदहा, लाहाय सेन् खान गे सेंगेल जुलुक्-आ ?',
    riddleRoman: 'Mit tan gadha, lahay sen khan ge sengel juluh-a?',
    riddleHindiMeaning: 'एक ऐसा गधा, जो आगे बढ़ता है तो आग जलती है?',
    optionsDev: ['हुक्का / पिपिड़ी (Hukka)', 'माचिस काड़ी (Diyaslai)', 'तीर-धनुष (Aa-Sar)', 'हुदड़ुंग / गाड़ी'],
    correctAnswerDev: 'माचिस काड़ी (Diyaslai)',
    explanationHindi: 'माचिस की तीली को जब आगे रगड़ा जाता है तो तुरंत आग भभक उठती है।',
    culturalNote: 'अंगीठी और बीड़ी सुलगाने के संदर्भ में शाम को चौपाल पर यह पहेली बच्चों से पूछी जाती है।',
    hint: 'यह एक छोटी लकड़ी की तीली होती है जिसके सिर पर बारूद लगा होता है।'
  },
  {
    id: 'k2',
    riddleSantaliDev: 'सेताक् रे चार पायर, तिकिन रे बार पायर, तारासिंग रे पे पायर ?',
    riddleRoman: 'Setah re char payar, tikin re bar payar, tarasing re pe payar?',
    riddleHindiMeaning: 'सुबह चार पैर, दोपहर दो पैर, और शाम को तीन पैर?',
    optionsDev: ['हाथी (Hati)', 'मानव / होड़ (Human/Hor)', 'गाय (Gai)', 'पंछी (Chere)'],
    correctAnswerDev: 'मानव / होड़ (Human/Hor)',
    explanationHindi: 'शैशवावस्था (सुबह) में घुटनों के बल चलना (4 पैर), युवावस्था (दोपहर) में दो पैरों पर चलना (2 पैर), और वृद्धावस्था (शाम) में लाठी का सहारा लेना (3 पैर)।',
    culturalNote: 'यह संताल जीवन दर्शन की प्रसिद्ध पहेली है जो मानव जीवन के तीनों पड़ावों की नश्वरता को दर्शाती है।',
    hint: 'यह कोई जानवर नहीं, हम स्वयं हैं।'
  },
  {
    id: 'k3',
    riddleSantaliDev: 'उम-उम काते गे आड़गो एनान, मेंखान ओदोक् जोखाक् मोचा रे जोम ?',
    riddleRoman: 'Um-um kate ge argo enan, menkhan odoh johah mocha re jom?',
    riddleHindiMeaning: 'नहा-धोकर नीचे उतरा, लेकिन बाहर निकलते समय मुंह में दाना खाया?',
    optionsDev: ['घड़ा / पानी कुंभा (Tukuc)', 'बंसी / कांटा (Bansi)', 'हल / नाहेल (Nahel)', 'तीर (Sar)'],
    correctAnswerDev: 'बंसी / कांटा (Bansi)',
    explanationHindi: 'मछली पकड़ने वाली बंसी पानी में डुबोई जाती है और बाहर निकलते समय उसके कांटे में मछली फंसी होती है।',
    culturalNote: 'बरसात में जोहाड़ा और नदियों में मछली पकड़ने (हाकू गोच्) के शौकीन संताल बच्चों का प्रिय कुदुम।',
    hint: 'पानी में मछली फंसाने वाला उपकरण।'
  },
  {
    id: 'k4',
    riddleSantaliDev: 'जांहातिन गे दाल-ए-मे, उनी दो बांगे रागा ?',
    riddleRoman: 'Jahatin ge dal-e-me, uni do bange raga?',
    riddleHindiMeaning: 'उसे जितना भी पीटो, वह कभी रोता नहीं बल्कि बजता है?',
    optionsDev: ['तुमदाक् / मांदर (Tumdak)', 'लोहा (Merhed)', 'ढोल / ढोलक (Dhol)', 'पेड़ का तना'],
    correctAnswerDev: 'तुमदाक् / मांदर (Tumdak)',
    explanationHindi: 'संताली मांदर (तुमदाक्) को दोनों हाथों से खूब थाप दी जाती है, वह रोने के बजाय मधुर ताल देता है।',
    culturalNote: 'मांदर संताली संस्कृति का हृदय है, जिसके बिना अखड़ा में कोई नृत्य-गान संभव नहीं।',
    hint: 'माटी का बना पारंपरिक संताली ताल वाद्य।'
  },
  {
    id: 'k5',
    riddleSantaliDev: 'मित् टान् गछ, ताला रे कांटा, चेटान रे बाहा ?',
    riddleRoman: 'Mit tan gach, tala re kanta, chetan re baha?',
    riddleHindiMeaning: 'एक ऐसा पौधा, बीच में कांटे और सिर पर फूल?',
    optionsDev: ['सरजोम (साल वृक्ष)', 'कदम बाहा (Kadam Baha)', 'कटहल (Kanthar)', 'अनन्नास / भुईं कटहल'],
    correctAnswerDev: 'अनन्नास / भुईं कटहल',
    explanationHindi: 'अनन्नास के शरीर पर कांटेदार छिलके होते हैं और उसके शीर्ष पर पत्तों का सुंदर मुकुट रूपी फूल जैसा गुच्छा होता है।',
    culturalNote: 'हाट-बाजार में फलों की बिक्री के समय बुजुर्ग बच्चों की परख लेते हैं।',
    hint: 'एक खट्टा-मीठा फल जिसके सिर पर पत्तों का मुकुट होता है।'
  },
  {
    id: 'k6',
    riddleSantaliDev: 'सेरमा खोन ञुर एनान, तस-पस ओते रे साड़े एनान ?',
    riddleRoman: 'Serma khon nyur enan, tas-pas ote re sare enan?',
    riddleHindiMeaning: 'आसमान से गिरा और धरती पर पड़ते ही छन-छन बिखर गया?',
    optionsDev: ['ओला / बादोली (Hailstone)', 'बरसात की बूंदें (Dah-jhari)', 'उल्का पिंड', 'पत्ता'],
    correctAnswerDev: 'बरसात की बूंदें (Dah-jhari)',
    explanationHindi: 'वर्षा की बूंदें आकाश से गिरकर धरती पर पड़ते ही छप-छप ध्वनि के साथ समा जाती हैं।',
    culturalNote: 'असार और सावन में खेतों की जुताई के समय किसान यह कुदुम गुनगुनाते हैं।',
    hint: 'आसमान से बरसने वाला जीवनदायी जल।'
  }
];

export const SantaliRiddlesKudumGame: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [answeredMap, setAnsweredMap] = useState<Record<number, boolean>>({});

  const currentRiddle = KUDUM_RIDDLES[currentIndex];

  const handleOptionSelect = (opt: string) => {
    if (selectedOption !== null) return; // already answered
    setSelectedOption(opt);
    setShowAnswer(true);

    const isCorrect = opt === currentRiddle.correctAnswerDev;
    if (isCorrect && !answeredMap[currentIndex]) {
      setScore((prev) => prev + 10);
      setAnsweredMap((prev) => ({ ...prev, [currentIndex]: true }));
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowAnswer(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev + 1) % KUDUM_RIDDLES.length);
  };

  const handlePrev = () => {
    setSelectedOption(null);
    setShowAnswer(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev - 1 + KUDUM_RIDDLES.length) % KUDUM_RIDDLES.length);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setShowHint(false);
    setScore(0);
    setAnsweredMap({});
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-violet-50 via-purple-50 to-indigo-50 text-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-violet-200/40 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <HelpCircle size={260} />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-700 border border-violet-500/30 text-xs font-semibold mb-3">
            <Sparkles size={14} />
            <span>कुदुम खेल - संताली लोक पहेलियां व बौद्धिक मनोरंजन</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-violet-800 flex items-center gap-3">
              <span>कुदुम (Kudum) पहेली प्रतियोगिता</span>
              <button
                onClick={() => speakWithFemaleVoice('सांतार कुदुम खेल आर हापड़ाम कोवाक् अकिल')}
                className="p-2 rounded-full bg-violet-500/20 hover:bg-violet-500/40 text-violet-700 transition-colors"
                title="सुनें"
              >
                <Volume2 size={22} />
              </button>
            </h1>
            <div className="flex items-center gap-3 bg-violet-50/50 px-4 py-2 rounded-2xl border border-violet-200/50">
              <Trophy className="text-amber-600" size={20} />
              <div>
                <span className="text-xs text-violet-700 block">कुल स्कोर</span>
                <span className="text-lg font-black text-amber-700">{score} अंक</span>
              </div>
            </div>
          </div>
          <p className="text-violet-800/80 text-sm sm:text-base mt-2 leading-relaxed">
            संताली समाज में संध्या चौपाल पर हापड़ाम (बुजुर्ग) बच्चों की बुद्धि और प्रकृति-ज्ञान की परीक्षा लेने के लिए रोचक पहेलियां (कुदुम) पूछते हैं। सही विकल्प चुनें और अपनी मेधा परखें!
          </p>
        </div>
      </div>

      {/* Main Riddle Card */}
      <div className="bg-white dark:bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-200 shadow-xl space-y-6">
        {/* Navigation & Progress */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <BrainCircuit className="text-violet-600" size={20} />
            <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-700">
              पहेली संख्या {currentIndex + 1} / {KUDUM_RIDDLES.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-50/40 text-amber-700 dark:text-amber-700 border border-amber-300 dark:border-amber-200 text-xs font-semibold hover:bg-amber-100 transition-colors"
            >
              <Lightbulb size={14} />
              <span>{showHint ? 'इशारा छिपाएं' : 'संकेत (Hint)'}</span>
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 text-slate-600 hover:text-slate-600 dark:hover:text-slate-800 transition-colors"
              title="पुनः आरंभ करें"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        {/* Hint Box */}
        {showHint && (
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-50/30 border border-amber-200 dark:border-amber-200/40 text-amber-900 dark:text-amber-800 text-xs sm:text-sm flex items-center gap-2">
            <Lightbulb size={16} className="text-amber-600 shrink-0" />
            <span>
              <strong>संकेत:</strong> {currentRiddle.hint}
            </span>
          </div>
        )}

        {/* Riddle Text */}
        <div className="bg-violet-50/60 dark:bg-violet-50/20 p-6 rounded-2xl border border-violet-200/60 dark:border-violet-200/30 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-50/50 text-violet-800 dark:text-violet-700 uppercase">
                संताली देवनागरी कुदुम
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-800 mt-2">
                &ldquo;{currentRiddle.riddleSantaliDev}&rdquo;
              </h2>
              <p className="text-sm font-semibold text-violet-700 dark:text-violet-600 mt-1">
                {currentRiddle.riddleRoman}
              </p>
            </div>
            <button
              onClick={() => speakWithFemaleVoice(currentRiddle.riddleSantaliDev)}
              className="p-3 rounded-2xl bg-violet-700 text-white hover:bg-violet-100 shadow-md transition-colors shrink-0"
              title="कुदुम सुनें"
            >
              <Volume2 size={20} />
            </button>
          </div>
          <div className="pt-2 border-t border-violet-200/40 dark:border-violet-200/30">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-600">
              <strong>हिन्दी अर्थ:</strong> {currentRiddle.riddleHindiMeaning}
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            सही उत्तर का चुनाव करें (Choose Correct Answer):
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentRiddle.optionsDev.map((opt, idx) => {
              const isChosen = selectedOption === opt;
              const isCorrect = opt === currentRiddle.correctAnswerDev;

              let btnStyle =
                'bg-slate-50 dark:bg-slate-100/60 border-slate-200 dark:border-slate-200 text-slate-800 dark:text-slate-800 hover:border-violet-400 hover:bg-violet-50/50 dark:hover:bg-slate-100';

              if (showAnswer) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-100 dark:bg-emerald-50/60 border-emerald-500 text-emerald-900 dark:text-emerald-800 font-bold';
                } else if (isChosen && !isCorrect) {
                  btnStyle = 'bg-red-100 dark:bg-red-50/60 border-red-500 text-red-900 dark:text-red-800 font-bold';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={selectedOption !== null}
                  onClick={() => handleOptionSelect(opt)}
                  className={`p-4 rounded-2xl border text-left flex items-center justify-between gap-2 transition-all ${btnStyle}`}
                >
                  <span className="text-sm font-semibold">{opt}</span>
                  {showAnswer && isCorrect && <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />}
                  {showAnswer && isChosen && !isCorrect && <XCircle size={18} className="text-red-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Answer Breakdown & Cultural Note */}
        {showAnswer && (
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-200 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-50/30 border border-emerald-200 dark:border-emerald-200/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900 dark:text-emerald-700 uppercase tracking-wide flex items-center gap-1.5">
                  <CheckCircle2 size={15} />
                  <span>सही उत्तर व रहस्य</span>
                </span>
                <button
                  onClick={() => speakWithFemaleVoice(currentRiddle.correctAnswerDev)}
                  className="text-xs font-bold text-emerald-700 dark:text-emerald-700 flex items-center gap-1 hover:underline"
                >
                  <Volume2 size={14} />
                  <span>उत्तर सुनें</span>
                </button>
              </div>
              <p className="text-base font-bold text-emerald-900 dark:text-emerald-800 mt-1">
                {currentRiddle.correctAnswerDev}
              </p>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-700 mt-1 leading-relaxed">
                {currentRiddle.explanationHindi}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-violet-50/70 dark:bg-violet-50/20 border border-violet-200/60 dark:border-violet-200/30">
              <span className="text-xs font-bold text-violet-900 dark:text-violet-700 uppercase tracking-wide block mb-1">
                सांस्कृतिक संदर्भ (Cultural Heritage)
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-700 leading-relaxed">
                {currentRiddle.culturalNote}
              </p>
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-200">
          <button
            onClick={handlePrev}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-100 text-slate-700 dark:text-slate-700 hover:bg-slate-200 dark:hover:bg-slate-200 text-xs sm:text-sm font-semibold transition-colors"
          >
            ← पिछली पहेली
          </button>
          <span className="text-xs text-slate-500">
            {currentIndex + 1} of {KUDUM_RIDDLES.length}
          </span>
          <button
            onClick={handleNext}
            className="px-5 py-2 rounded-xl bg-violet-700 text-white hover:bg-violet-100 text-xs sm:text-sm font-semibold transition-colors shadow"
          >
            अगली पहेली →
          </button>
        </div>
      </div>
    </div>
  );
};
