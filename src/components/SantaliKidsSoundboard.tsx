import React, { useState } from 'react';
import {
  Sparkles,
  Volume2,
  Gamepad2,
  Award,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  Smile,
  Heart
} from 'lucide-react';
import { speakWithFemaleVoice } from '../utils/speech';
import { MORE_SOUNDBOARD_CARDS } from '../data/soundboardMore';
import { MORE_SOUNDBOARD_CARDS_2 } from '../data/soundboardMore2';

export interface SoundboardCard {
  id: string;
  nameDev: string;
  nameRoman: string;
  hindiMeaning: string;
  category: 'animals' | 'birds' | 'nature' | 'home' | 'family' | 'body' | 'food' | 'fruitveg' | 'colors' | 'numbers' | 'time' | 'places' | 'actions' | 'describe' | 'talk';
  olChiki?: string;
  categoryLabelHindi: string;
  icon: string;
  bgColor: string;
}

const BASE_SOUNDBOARD_CARDS: SoundboardCard[] = [
  // 1. Animals
  {
    id: 'tiger',
    nameDev: 'कुल (Kul)',
    nameRoman: 'Kul',
    hindiMeaning: 'बाघ (Tiger)',
    category: 'animals',
    categoryLabelHindi: 'पशु',
    icon: '🐅',
    bgColor: 'from-amber-400 to-orange-500'
  },
  {
    id: 'elephant',
    nameDev: 'हाती (Hati)',
    nameRoman: 'Hati',
    hindiMeaning: 'हाथी (Elephant)',
    category: 'animals',
    categoryLabelHindi: 'पशु',
    icon: '🐘',
    bgColor: 'from-slate-400 to-stone-600'
  },
  {
    id: 'ox',
    nameDev: 'डांगरा (Dangra)',
    nameRoman: 'Dangra',
    hindiMeaning: 'बैल (Ox / Bull)',
    category: 'animals',
    categoryLabelHindi: 'पशु',
    icon: '🐂',
    bgColor: 'from-amber-600 to-yellow-700'
  },
  {
    id: 'goat',
    nameDev: 'मेरोम (Merom)',
    nameRoman: 'Merom',
    hindiMeaning: 'बकरी (Goat)',
    category: 'animals',
    categoryLabelHindi: 'पशु',
    icon: '🐐',
    bgColor: 'from-stone-400 to-stone-600'
  },
  {
    id: 'dog',
    nameDev: 'सेता (Seta)',
    nameRoman: 'Seta',
    hindiMeaning: 'कुत्ता (Dog)',
    category: 'animals',
    categoryLabelHindi: 'पशु',
    icon: '🐕',
    bgColor: 'from-yellow-500 to-amber-600'
  },
  {
    id: 'cat',
    nameDev: 'बिलाय (Bilay)',
    nameRoman: 'Bilay',
    hindiMeaning: 'बिल्ली (Cat)',
    category: 'animals',
    categoryLabelHindi: 'पशु',
    icon: '🐈',
    bgColor: 'from-orange-400 to-rose-500'
  },
  {
    id: 'sheep',
    nameDev: 'भेंडा (Bhenda)',
    nameRoman: 'Bhenda',
    hindiMeaning: 'भेड़ (Sheep)',
    category: 'animals',
    categoryLabelHindi: 'पशु',
    icon: '🐑',
    bgColor: 'from-emerald-400 to-teal-600'
  },

  // 2. Birds & Aquatic
  {
    id: 'peacock',
    nameDev: 'माराक (Marak)',
    nameRoman: 'Marak',
    hindiMeaning: 'मोर (Peacock)',
    category: 'birds',
    categoryLabelHindi: 'पक्षी',
    icon: '🦚',
    bgColor: 'from-teal-500 to-cyan-700'
  },
  {
    id: 'pigeon',
    nameDev: 'पोटाम (Potam)',
    nameRoman: 'Potam',
    hindiMeaning: 'कबूतर / फाख्ता',
    category: 'birds',
    categoryLabelHindi: 'पक्षी',
    icon: '🕊️',
    bgColor: 'from-blue-400 to-indigo-600'
  },
  {
    id: 'duck',
    nameDev: 'गेड़े (Gere)',
    nameRoman: 'Gere',
    hindiMeaning: 'बतख (Duck)',
    category: 'birds',
    categoryLabelHindi: 'पक्षी',
    icon: '🦆',
    bgColor: 'from-emerald-500 to-green-700'
  },
  {
    id: 'fish',
    nameDev: 'हाकू (Haku)',
    nameRoman: 'Haku',
    hindiMeaning: 'मछली (Fish)',
    category: 'birds',
    categoryLabelHindi: 'जलचर',
    icon: '🐟',
    bgColor: 'from-sky-400 to-blue-600'
  },
  {
    id: 'turtle',
    nameDev: 'होड़ो (Horo)',
    nameRoman: 'Horo',
    hindiMeaning: 'कछुआ (Tortoise)',
    category: 'birds',
    categoryLabelHindi: 'जलचर',
    icon: '🐢',
    bgColor: 'from-green-500 to-emerald-700'
  },

  // 3. Nature & Fruits
  {
    id: 'sal_flower',
    nameDev: 'सारजोम बाहा (Sarjom Baha)',
    nameRoman: 'Sarjom Baha',
    hindiMeaning: 'साल (सखुआ) का फूल',
    category: 'nature',
    categoryLabelHindi: 'प्रकृति',
    icon: '🌸',
    bgColor: 'from-pink-400 to-rose-600'
  },
  {
    id: 'mahua',
    nameDev: 'मातकोम (Matkom)',
    nameRoman: 'Matkom',
    hindiMeaning: 'महुआ का फूल व फल',
    category: 'nature',
    categoryLabelHindi: 'प्रकृति',
    icon: '🌼',
    bgColor: 'from-amber-400 to-yellow-600'
  },
  {
    id: 'mango',
    nameDev: 'उल (Ul)',
    nameRoman: 'Ul',
    olChiki: 'ᱩᱞ',
    hindiMeaning: 'आम (Mango)',
    category: 'nature',
    categoryLabelHindi: 'फल',
    icon: '🥭',
    bgColor: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'lotus',
    nameDev: 'उपल बाहा (Upal Baha)',
    nameRoman: 'Upal Baha',
    hindiMeaning: 'कमल का फूल (Lotus)',
    category: 'nature',
    categoryLabelHindi: 'पुष्प',
    icon: '🪷',
    bgColor: 'from-rose-400 to-pink-600'
  },
  {
    id: 'sun',
    nameDev: 'बेड़ा (Beda)',
    nameRoman: 'Beda',
    hindiMeaning: 'सूर्य / धूप (Sun)',
    category: 'nature',
    categoryLabelHindi: 'खगोल',
    icon: '☀️',
    bgColor: 'from-amber-500 to-orange-600'
  },
  {
    id: 'moon',
    nameDev: 'चान्दो (Chando)',
    nameRoman: 'Chando',
    hindiMeaning: 'चांद / चंद्रमा (Moon)',
    category: 'nature',
    categoryLabelHindi: 'खगोल',
    icon: '🌙',
    bgColor: 'from-indigo-400 to-purple-600'
  },

  // 4. Home & Music
  {
    id: 'tumdak',
    nameDev: 'तुमाक (Tumdak\')',
    nameRoman: 'Tumdak',
    hindiMeaning: 'मांदर (मिट्टी का ढोल)',
    category: 'home',
    categoryLabelHindi: 'वाद्य',
    icon: '🥁',
    bgColor: 'from-amber-600 to-stone-800'
  },
  {
    id: 'tiryo',
    nameDev: 'तिरयो (Tiryo)',
    nameRoman: 'Tiryo',
    hindiMeaning: 'बांसुरी (Bamboo Flute)',
    category: 'home',
    categoryLabelHindi: 'वाद्य',
    icon: '🪈',
    bgColor: 'from-emerald-500 to-teal-700'
  },
  {
    id: 'bow_arrow',
    nameDev: 'आ-सार (Aa-Sar)',
    nameRoman: 'Aa-Sar',
    hindiMeaning: 'तीर-धनुष (Bow & Arrow)',
    category: 'home',
    categoryLabelHindi: 'शस्त्र',
    icon: '🏹',
    bgColor: 'from-stone-500 to-stone-700'
  },
  {
    id: 'house',
    nameDev: 'ओड़ाक (Orak\')',
    nameRoman: 'Orak',
    hindiMeaning: 'घर (Home / House)',
    category: 'home',
    categoryLabelHindi: 'ग्राम',
    icon: '🏡',
    bgColor: 'from-amber-500 to-orange-600'
  },

  // 5. Family
  {
    id: 'mother',
    nameDev: 'आयो (Ayo)',
    nameRoman: 'Ayo',
    hindiMeaning: 'माता / मां (Mother)',
    category: 'family',
    categoryLabelHindi: 'परिवार',
    icon: '👩',
    bgColor: 'from-rose-400 to-red-500'
  },
  {
    id: 'father',
    nameDev: 'आपा / बाबा (Apa)',
    nameRoman: 'Apa',
    hindiMeaning: 'पिता / बाबूजी (Father)',
    category: 'family',
    categoryLabelHindi: 'परिवार',
    icon: '👨',
    bgColor: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'brother',
    nameDev: 'दादा (Dada)',
    nameRoman: 'Dada',
    hindiMeaning: 'बड़ा भाई (Brother)',
    category: 'family',
    categoryLabelHindi: 'परिवार',
    icon: '👦',
    bgColor: 'from-teal-400 to-emerald-600'
  },
  {
    id: 'sister',
    nameDev: 'दाई (Dai)',
    nameRoman: 'Dai',
    hindiMeaning: 'बड़ी बहन (Sister)',
    category: 'family',
    categoryLabelHindi: 'परिवार',
    icon: '👧',
    bgColor: 'from-pink-400 to-purple-500'
  }
];

export const SOUNDBOARD_CARDS: SoundboardCard[] = [...BASE_SOUNDBOARD_CARDS, ...MORE_SOUNDBOARD_CARDS, ...MORE_SOUNDBOARD_CARDS_2];

export const SantaliKidsSoundboard: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  // Mini Quiz Mode
  const [isQuizMode, setIsQuizMode] = useState<boolean>(false);
  const [quizTargetCard, setQuizTargetCard] = useState<SoundboardCard>(SOUNDBOARD_CARDS[0]);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const [searchQ, setSearchQ] = useState<string>('');
  const filteredCards = (selectedCat === 'all' ? SOUNDBOARD_CARDS : SOUNDBOARD_CARDS.filter((c) => c.category === selectedCat))
    .filter((c) => { const q = searchQ.trim().toLowerCase(); return !q || `${c.nameDev} ${c.hindiMeaning} ${c.olChiki || ''}`.toLowerCase().includes(q); });

  const handleCardClick = (card: SoundboardCard) => {
    setActiveCardId(card.id);
    speakWithFemaleVoice(card.nameDev.split('(')[0].trim());

    if (isQuizMode) {
      if (card.id === quizTargetCard.id) {
        setQuizScore((prev) => prev + 1);
        setFeedback('correct');
        setTimeout(() => {
          setFeedback(null);
          pickNewQuizTarget();
        }, 1200);
      } else {
        setFeedback('wrong');
        setTimeout(() => setFeedback(null), 1200);
      }
    }
  };

  const startQuiz = () => {
    setIsQuizMode(true);
    setQuizScore(0);
    pickNewQuizTarget();
  };

  const pickNewQuizTarget = () => {
    const randomCard = SOUNDBOARD_CARDS[Math.floor(Math.random() * SOUNDBOARD_CARDS.length)];
    setQuizTargetCard(randomCard);
    setTimeout(() => {
      speakWithFemaleVoice(randomCard.nameDev.split('(')[0].trim());
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Fun Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-white rounded-lg text-xs font-black backdrop-blur-xs">
              <Smile className="w-4 h-4" />
              <span>गिद्रा कोवाक चित्रावली — सचित्र संताली बाल-साउंडबोर्ड</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              संताली सचित्र बाल-शब्दकोश व साउंडबोर्ड
            </h1>
            <p className="text-white/90 text-xs sm:text-base max-w-2xl leading-relaxed font-medium">
              किसी भी चित्र पर क्लिक करें और संताली भाषा में उसका मधुर उच्चारण सुनें। बच्चों के लिए खेल-खेल में पशु, पक्षी, फल, वाद्ययंत्र और रिश्ते सीखने का मजेदार साधन।
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                if (isQuizMode) setIsQuizMode(false);
                else startQuiz();
              }}
              className={`px-5 py-3 rounded-2xl font-black text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
                isQuizMode
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-rose-950 hover:scale-105 active:scale-95'
              }`}
            >
              <Gamepad2 className="w-4 h-4 text-rose-500" />
              <span>{isQuizMode ? 'खेल बंद करें' : '🎮 "पहचानो कौन?" खेल खेलें'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quiz Active Notification Card */}
      {isQuizMode && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white border border-indigo-400 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center text-xl font-bold shrink-0">
              🎯
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                क्विज़ प्रश्न (नीचे सही चित्र पर क्लिक करें):
              </span>
              <div className="text-lg font-black text-white flex items-center gap-2 mt-0.5">
                <span>"{quizTargetCard.nameDev}" को पहचानें!</span>
                <button
                  onClick={() =>
                    speakWithFemaleVoice(quizTargetCard.nameDev.split('(')[0].trim())
                  }
                  className="p-1 rounded-lg bg-white/20 hover:bg-white/30 text-amber-300"
                  title="पुनः सुनें"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {feedback === 'correct' && (
              <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-400 flex items-center gap-1.5 animate-bounce">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>अद्भुत! सही उत्तर! (+१)</span>
              </span>
            )}
            {feedback === 'wrong' && (
              <span className="text-xs font-bold text-rose-300 bg-rose-950/80 px-3 py-1.5 rounded-xl border border-rose-400 animate-pulse">
                पुनः प्रयास करें!
              </span>
            )}
            <div className="text-right">
              <span className="text-[10px] text-stone-300 block">स्कोर</span>
              <span className="text-xl font-black text-amber-400">{quizScore} अंक</span>
            </div>
          </div>
        </div>
      )}

      {/* Category Pills Filter */}
      {!isQuizMode && (
        <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
          {[
            { id: 'all', label: `🌟 सभी चित्र (${SOUNDBOARD_CARDS.length})` },
            { id: 'animals', label: '🐅 पशु (Animals)' },
            { id: 'birds', label: '🦚 पक्षी व जलचर' },
            { id: 'nature', label: '🌸 वन, फल व फूल' },
            { id: 'home', label: '🥁 वाद्य व गांव' },
            { id: 'family', label: '👨‍👩‍👦 परिवार (Family)' },
            { id: 'body', label: '✋ शरीर' },
            { id: 'food', label: '🍚 खाना-पीना' },
            { id: 'fruitveg', label: '🍌 फल-सब्ज़ी' },
            { id: 'colors', label: '🎨 रंग' },
            { id: 'numbers', label: '🔢 गिनती' },
            { id: 'time', label: '🕒 समय व दिशा' },
            { id: 'places', label: '🏘️ जगह' },
            { id: 'actions', label: '🏃 क्रिया' },
            { id: 'describe', label: '😄 गुण व भाव' },
            { id: 'talk', label: '🙏 बोलचाल व पढ़ाई' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCat === cat.id
                  ? 'bg-rose-600 text-white shadow-xs font-black'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <input value={searchQ} onChange={(e) => setSearchQ(e.target.value)} placeholder="🔍 खोजें (जैसे: आम, पानी)" className="ml-auto px-3 py-2 rounded-xl text-xs border border-slate-200 outline-none focus:border-rose-400 w-full sm:w-48" />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
        <span>ℹ️ कुछ शब्दों की वर्तनी क्षेत्र के हिसाब से अलग हो सकती है। इसके लिए आप हमें सुझाव (Feedback) दे सकते हैं।</span>
        <button type="button" onClick={() => window.dispatchEvent(new Event('hk:open-feedback'))} className="ml-auto px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold cursor-pointer">✍️ सुझाव दें</button>
      </div>

      {/* Interactive Soundboard Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredCards.map((card) => {
          const isActive = activeCardId === card.id;
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`relative rounded-3xl p-4 flex flex-col items-center justify-between text-center transition-all cursor-pointer select-none border group overflow-hidden ${
                isActive
                  ? 'scale-105 shadow-xl ring-4 ring-rose-400/50 bg-rose-50 border-rose-400'
                  : 'bg-white hover:bg-slate-50 border-slate-200 hover:shadow-md hover:scale-102'
              }`}
            >
              {/* Category mini tag */}
              <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full mb-1">
                {card.categoryLabelHindi}
              </span>

              {/* Big Emoji Icon with bounce on hover */}
              <div className="text-4xl sm:text-5xl my-2 transition-transform duration-200 group-hover:scale-115 group-active:scale-95">
                {card.icon}
              </div>

              {/* Text Names */}
              <div className="space-y-0.5 mt-1">
                <div className="font-black text-sm text-slate-900 group-hover:text-rose-700">
                  {card.nameDev}
                </div>
                {card.olChiki && <div className="text-base text-indigo-800 leading-tight">{card.olChiki}</div>}
                <div className="text-[11px] font-bold text-amber-800 font-mono">
                  {card.nameRoman}
                </div>
                <div className="text-[10px] text-slate-500 italic mt-0.5">
                  {card.hindiMeaning}
                </div>
              </div>

              {/* Audio Play Icon Tooltip */}
              <div className="mt-2.5 p-1 rounded-full bg-slate-100 group-hover:bg-rose-100 text-slate-400 group-hover:text-rose-600 transition-colors">
                <Volume2 className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
