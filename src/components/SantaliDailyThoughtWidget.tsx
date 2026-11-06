import React, { useState } from 'react';
import {
  Sparkles,
  Volume2,
  RefreshCw,
  Copy,
  Check,
  Quote,
  Star,
  Bookmark
} from 'lucide-react';
import { speakWithFemaleVoice } from '../utils/speech';
import { toggleFavorite, isFavorite } from '../utils/favoritesStorage';

interface DailyThought {
  id: string;
  olChiki: string;
  santaliDevanagari: string;
  santaliRoman: string;
  hindiMeaning: string;
  englishMeaning: string;
  lifeLesson: string;
}

const DAILY_THOUGHTS: DailyThought[] = [
  {
    id: 'dt1',
    olChiki: 'ᱥᱟᱱᱟᱢ ᱦᱚᱲ ᱢᱤᱫ, ᱡᱤᱣᱤ ᱫᱚ ᱢᱤᱫ ᱜᱮᱭᱟ',
    santaliDevanagari: 'सानाम होड़ मित्, जीवी दो मित् गेया।',
    santaliRoman: 'Sanam hor mit, jiwi do mit geya.',
    hindiMeaning: 'सभी मनुष्य एक हैं, और सबकी आत्मा एक समान पवित्र है।',
    englishMeaning: 'All human beings are one, and the soul in all is sacred and equal.',
    lifeLesson: 'संताल दर्शन का मूल आधार — कोई छोटा या बड़ा नहीं, प्रकृति के समक्ष सभी प्राणी समान हैं।'
  },
  {
    id: 'dt2',
    olChiki: 'ᱠᱟᱹᱢᱤ ᱞᱮᱠᱷᱟᱱ ᱡᱚᱢ, ᱵᱟᱝ ᱠᱷᱟᱱ ᱛᱟᱦᱮᱸᱱ ᱨᱮᱸᱜᱮᱡ',
    santaliDevanagari: 'कामी लेखान जोम, बांग खान ताहेन रेंगेच्।',
    santaliRoman: 'Kami lekhan jom, bang khan tahen rengech.',
    hindiMeaning: 'परिश्रम करोगे तो भोजन मिलेगा, आलस्य करोगे तो भूखे रहना पड़ेगा।',
    englishMeaning: 'Honest labor brings food; idleness leads to hunger.',
    lifeLesson: 'श्रम की गरिमा — स्वावलंबी बनना और अपनी मेहनत की कमाई पर संतोष करना।'
  },
  {
    id: 'dt3',
    olChiki: 'ᱫᱟᱨᱮ ᱥᱟᱨᱡᱚᱢ ᱡᱤᱣᱤ ᱵᱟᱧᱪᱟᱣ, ᱵᱤᱨ ᱜᱮ ᱟᱵᱚᱣᱟᱜ ᱡᱤᱣᱤ',
    santaliDevanagari: 'दारे सरजोम जीवी बांचाव, बीर गे आबोवाग् जीवी।',
    santaliRoman: 'Dare sarjom jiwi banchaw, bir ge abowag jiwi.',
    hindiMeaning: 'साल का वृक्ष जीवन रक्षक है, और जंगल ही हमारा सच्चा प्राण है।',
    englishMeaning: 'The Sal tree saves life; the forest is our true existence.',
    lifeLesson: 'पर्यावरण संरक्षण — प्रकृति के साथ सह-अस्तित्व ही मानव जाति की रक्षा कर सकता है।'
  },
  {
    id: 'dt4',
    olChiki: 'ᱟᱹᱛᱩ ᱨᱮᱱᱟᱜ ᱥᱩᱞᱩᱠ ᱜᱮ ᱫᱤᱥᱚᱢ ᱨᱮᱱᱟᱜ ᱫᱟᱲᱮ',
    santaliDevanagari: 'आतु रेनाग् सुलुक गे दिसोम रेनाग् दाड़े।',
    santaliRoman: 'Atu renag suluk ge disom renag dare.',
    hindiMeaning: 'गांव का आपसी सद्भाव और शांति ही देश की असली शक्ति है।',
    englishMeaning: 'Harmony and peace in the village is the real strength of the country.',
    lifeLesson: 'सामूहिकता और एकजुटता — कुलही बैसी और सामूहिक निर्णय ही समाज को सुदृढ़ बनाते हैं।'
  },
  {
    id: 'dt5',
    olChiki: 'ᱨᱚᱲ ᱨᱮ ᱦᱮᱲᱮᱢ, ᱢᱚᱱᱮ ᱨᱮ ᱥᱟᱹᱨᱤ',
    santaliDevanagari: 'रोड़ रे हेड़ेम, मोने रे सा़री।',
    santaliRoman: 'Ror re herem, mone re sari.',
    hindiMeaning: 'वाणी में मिठास रखो, और मन में सदैव सत्य और निष्कपटता।',
    englishMeaning: 'Sweetness in speech, and pure truth in the heart.',
    lifeLesson: 'सत्यनिष्ठा — कटु वचनों से बचें और हमेशा दूसरों के प्रति निष्कपट व्यवहार रखें।'
  }
];

export const SantaliDailyThoughtWidget: React.FC = () => {
  // Use day of year or initial index
  const dayIndex = typeof window !== 'undefined' ? new Date().getDate() % DAILY_THOUGHTS.length : 0;
  const [currentIndex, setCurrentIndex] = useState(dayIndex);
  const [copied, setCopied] = useState(false);
  const [starred, setStarred] = useState(false);

  const thought = DAILY_THOUGHTS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DAILY_THOUGHTS.length);
    setStarred(false);
  };

  const handleCopy = () => {
    const text = `${thought.santaliDevanagari} (${thought.olChiki})\n${thought.santaliRoman}\nअर्थ: ${thought.hindiMeaning}\nसीख: ${thought.lifeLesson}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStar = () => {
    toggleFavorite({
      id: thought.id,
      category: 'vocab',
      categoryLabel: 'संताली सुविचार (Proverb)',
      titleDevanagari: thought.santaliDevanagari,
      titleRoman: thought.santaliRoman,
      subtitle: thought.olChiki,
      summary: `${thought.hindiMeaning} — ${thought.lifeLesson}`
    });
    setStarred(!starred);
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 via-stone-50 to-amber-50 text-slate-900 rounded-3xl p-6 sm:p-7 shadow-xl border border-amber-200/40 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <Quote size={120} />
      </div>

      <div className="relative z-10 space-y-4">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-3 border-b border-amber-200/50 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-700 border border-amber-500/30">
              <Sparkles size={16} />
            </span>
            <span className="text-xs sm:text-sm font-bold tracking-wide uppercase text-amber-800">
              दिन का संताली सुविचार • दिन रिनक् मेनकाथा
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleStar}
              className={`p-2 rounded-xl transition-all ${
                starred
                  ? 'bg-amber-400 text-stone-950 font-bold'
                  : 'bg-white/10 hover:bg-white/20 text-amber-800'
              }`}
              title="डायरी में सेव करें"
            >
              <Bookmark size={15} />
            </button>
            <button
              onClick={handleCopy}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-800 transition-colors"
              title="कॉपी करें"
            >
              {copied ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-800 transition-colors"
              title="अगला विचार देखें"
            >
              <RefreshCw size={15} />
            </button>
          </div>
        </div>

        {/* Proverb Content */}
        <div className="space-y-2">
          <div className="text-sm sm:text-base font-semibold text-amber-700 font-mono tracking-wide">
            {thought.olChiki}
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-3">
            <span>{thought.santaliDevanagari}</span>
            <button
              onClick={() => speakWithFemaleVoice(thought.santaliDevanagari)}
              className="p-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/40 text-amber-700 transition-colors shrink-0"
              title="उच्चारण सुनें"
            >
              <Volume2 size={20} />
            </button>
          </div>
          <div className="text-xs sm:text-sm text-amber-800/80 font-medium">
            {thought.santaliRoman}
          </div>
        </div>

        {/* Meaning and Life Lesson */}
        <div className="pt-2 border-t border-amber-200/40 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="bg-white/20 p-3 rounded-2xl border border-amber-500/10">
            <span className="text-amber-600 font-bold block mb-1">हिन्दी भावार्थ:</span>
            <p className="text-slate-800 leading-relaxed">{thought.hindiMeaning}</p>
          </div>
          <div className="bg-white/20 p-3 rounded-2xl border border-amber-500/10">
            <span className="text-amber-600 font-bold block mb-1">जीवन दर्शन व सीख:</span>
            <p className="text-slate-800 leading-relaxed">{thought.lifeLesson}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
