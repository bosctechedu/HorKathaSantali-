import React, { useState } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { safeLoadFromStorage } from '../utils/storage';
import {
  Globe,
  Sparkles,
  Volume2,
  TreePine,
  Waves,
  Feather,
  Shield,
  Heart,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  HelpCircle,
  Compass,
  Users
} from 'lucide-react';

export interface CreationStage {
  id: number;
  stageNameDevanagari: string;
  stageNameRoman: string;
  stageNameHindi: string;
  subtitle: string;
  symbol: string;
  narrativeSantali: string;
  narrativeHindi: string;
  narrativeEnglish: string;
  keyFigures: string[];
  philosophicalMeaning: string;
  themeColor: string;
  bgGradient: string;
}

export const CREATION_STAGES: CreationStage[] = [
  {
    id: 1,
    stageNameDevanagari: '१. जलमग्न आदि-काल व ठाकुर जिउ',
    stageNameRoman: '1. Jalmagna Adi-Kal & Thakur Jiu',
    stageNameHindi: 'अथाह जल व सृष्टिकर्ता ठाकुर जिउ',
    subtitle: 'सृष्टि से पूर्व केवल अनंत जल और अंधकार का साम्राज्य था',
    symbol: '🌊',
    narrativeSantali: 'पाहिल रे दो धात्री बां ताहे काना, जोतो सेनोक् रे खाली दाक् आर दाक् गे ताहे काना। ठाकुर जिउ दाक् चेतान रे ताहे कानाय आर उनी गे सिरजोन बेनावाक उईहार केदाय।',
    narrativeHindi: 'सृष्टि के आरंभ में कोई ठोस भूमि या पृथ्वी नहीं थी। चारों ओर केवल अथाह जल, तरंगें और सन्नाटा था। सर्वोच्च सृष्टिकर्ता "ठाकुर जिउ" (Thakur Jiu) ने इस महाजल के ऊपर विचरण करते हुए एक सुंदर, जीवंत सृष्टि की रचना का संकल्प लिया।',
    narrativeEnglish: 'In the primordial dawn, there was no solid earth or dry land. Boundless water, deep currents, and silence stretched across cosmic eternity. Thakur Jiu, the supreme creator spirit, hovered above the waters and willed life and beauty to emerge.',
    keyFigures: ['ठाकुर जिउ (सर्वोच्च सृष्टिकर्ता)', 'महाजल (Primordial Cosmic Ocean)'],
    philosophicalMeaning: 'संताल दर्शन में जल ही समस्त जीवन का आदि स्रोत और पवित्र चेतना का प्रतीक है।',
    themeColor: 'border-sky-500',
    bgGradient: 'from-sky-900 via-blue-950 to-slate-950'
  },
  {
    id: 2,
    stageNameDevanagari: '२. हांस और हांसिल — पवित्र हंस युगल',
    stageNameRoman: '2. Has ar Hasil — The Sacred Swans',
    stageNameHindi: 'हाँस और हांसिल पक्षी का सृजन',
    subtitle: 'ठाकुर जिउ ने अपने स्नेह से प्रथम दो पक्षियों को जन्म दिया',
    symbol: '🪶',
    narrativeSantali: 'ठाकुर जिउ आपनार कोड़ेयाक मैला ते बारया हांस आर हांसिल चेँड़ेय बेनाव केदकिना। उंकिन दो दाक् चेतान रे उडौ काते ताहें कानाकिन, मेनखान उंकिन थाम्होक् लागीद ठांव बां ताहे काना।',
    narrativeHindi: 'ठाकुर जिउ ने अपने छाती के पसीने व स्नेहिल मैल से दो सुंदर पवित्र पक्षियों—"हाँस" (हंस) और "हांसिल" (हंसिनी) का सृजन किया और उनमें प्राण फूंक दिए। दोनों पक्षी जल के ऊपर आनंद से उड़ते रहे, किंतु थक जाने पर बैठने या घोंसला बनाने के लिए कहीं भी कोई सूखी जगह नहीं थी।',
    narrativeEnglish: 'From his divine essence and loving warmth, Thakur Jiu created a pair of sacred wild swans: Hans (male) and Hasil (female). The celestial birds soared gracefully above the waves, but soon grew weary as there was nowhere in the infinite waters to alight or rest.',
    keyFigures: ['हाँस (पवित्र नर हंस)', 'हांसिल (पवित्र मादा हंसिनी)', 'ठाकुर जिउ'],
    philosophicalMeaning: 'पक्षी आकाश और आत्मा के मुक्त प्रवाह तथा जीवन की खोज का प्रतीक हैं।',
    themeColor: 'border-amber-400',
    bgGradient: 'from-amber-900 via-orange-950 to-slate-950'
  },
  {
    id: 3,
    stageNameDevanagari: '३. कछुआ और केंचुआ — धरती की स्थापना',
    stageNameRoman: '3. Horo & Lended — Raising the Earth',
    stageNameHindi: 'कछुआ (हरो) और केंचुआ (लेंदेद) द्वारा भूमि का निर्माण',
    subtitle: 'जल जीवों के त्याग और सहयोग से ठोस पृथ्वी का जन्म हुआ',
    symbol: '🐢',
    narrativeSantali: 'ठाकुर जिउ दाक् रेन जीव कोवे हुकुम आदकोवा। राघो बोआर आर काटकॉम बांकिन दाड़ेयादा। सेशे रे लेंदेद दाक् लातार खोन हासा जोम काते हरो (कछुआ) आक देया चेतान रे इत़ीद केदाय। हरो दो सिकड़ी ते तोल एनाय।',
    narrativeHindi: 'हाँस-हांसिल के बैठने के लिए ठाकुर जिउ ने जल जीवों से समुद्र के तल से मिट्टी लाने का आह्वान किया। विशाल मछली (राघो बोआर) और केकड़ा (काटकॉम) असफल रहे क्योंकि पानी मिट्टी को बहा देता था। अंत में छोटे से केंचुए (लेंदेद / Lended) ने समुद्र तल से मिट्टी खाई और विशाल कछुए (हरो / Horo) की पीठ पर उगल दी। कछुए को चारों कोनों में जंजीरों से स्थिर किया गया ताकि वह हिले नहीं। इस प्रकार हमारी धरती (धातरी) का निर्माण हुआ!',
    narrativeEnglish: 'To raise solid ground, aquatic creatures were summoned. The giant fish and crab failed as sand washed away. Then humble earthworm Lended swallowed silt from the deep and deposited it onto the shell of colossal turtle Horo. Anchored with cosmic chains, the turtle stabilized, forming the blessed earth (Dhatri).',
    keyFigures: ['हरो (विशाल कछुआ)', 'लेंदेद (परिश्रमी केंचुआ)', 'राघो बोआर (मत्स्य)', 'काटकॉम (केकड़ा)'],
    philosophicalMeaning: 'छोटा से छोटा जीव भी सृष्टि के निर्माण में महान योगदान दे सकता है; प्रकृति में सब परस्पर जुड़े हैं।',
    themeColor: 'border-emerald-500',
    bgGradient: 'from-emerald-900 via-teal-950 to-stone-950'
  },
  {
    id: 4,
    stageNameDevanagari: '४. सारजोम और करम वृक्ष व प्रथम मानव युगल',
    stageNameRoman: '4. Pilchu Haram & Pilchu Budhi',
    stageNameHindi: 'पिलचु हाड़ाम व पिलचु बुढ़ी — मानव का प्राकट्य',
    subtitle: 'करम की डाल पर दो अंडों से प्रथम संताल मानवों का जन्म',
    symbol: '🌱',
    narrativeSantali: 'धात्री रे सिरिजोन काते सरजोम आर करम दारे जोनोम एना। हांस-हांसिल करम दारे रे बेनाव काते बारया बिली किन ईर केदा। ओना बिली खोन पिलचु हाड़ाम आर पिलचु बुढ़ी किन ओडोक एना।',
    narrativeHindi: 'नई पृथ्वी पर दूब घास, सारजोम (साल) और करम के पावन वृक्ष लहलहा उठे। हांस-हांसिल ने करम वृक्ष की सुरम्य डाल पर घोंसला बनाकर दो चमत्कारी अंडे दिए। समय आने पर उन अंडों से एक बालक और एक बालिका का जन्म हुआ—यही संताल समाज के आदि पूर्वज "पिलचु हाड़ाम" (Pilchu Haram) और "पिलचु बुढ़ी" (Pilchu Budhi) कहलाए!',
    narrativeEnglish: 'Upon the fertile earth bloomed lush grasses, sacred Sal (Sarjom), and Karam trees. In the sheltering branches of the Karam tree, Hans and Hasil laid two radiant eggs. From these eggs hatched the original ancestors of humanity: Pilchu Haram (first father) and Pilchu Budhi (first mother).',
    keyFigures: ['पिलचु हाड़ाम (आदि पुरुष)', 'पिलचु बुढ़ी (आदि स्त्री)', 'करम दारे (जीवन वृक्ष)', 'सारजोम (साल)'],
    philosophicalMeaning: 'मनुष्य वृक्षों और प्रकृति की संतान है, इसलिए पेड़ों और जंगलों का सम्मान हमारी रगों में है।',
    themeColor: 'border-yellow-500',
    bgGradient: 'from-yellow-900 via-amber-950 to-stone-950'
  },
  {
    id: 5,
    stageNameDevanagari: '५. सात पुत्र, सात पुत्रियां व १२ पवित्र पारिस',
    stageNameRoman: '5. Seven Sons, Seven Daughters & 12 Clans',
    stageNameHindi: 'संताली समाज, १२ पारिस व गोत्रों का विस्तार',
    subtitle: 'हिहिड़ी पिपिड़ी से सासाराम और चंपा गढ़ तक गौरवशाली यात्रा',
    symbol: '🏛️',
    narrativeSantali: 'पिलचु हाड़ाम आर पिलचु बुढ़ी रेन एयाय कोड़ा आर एयाय कुड़ी गिदरा को जोनोम एना। उनकु खोन गे गेलबार गोतां पारिस (हंसदा, मुर्मू, किस्कू, हेम्ब्रम, मरांडी...) बेनाव एना।',
    narrativeHindi: 'पिलचु हाड़ाम और पिलचु बुढ़ी के सात तेजस्वी पुत्र और सात गुणवती पुत्रियां हुईं। बड़े होने पर उनका विवाह कराया गया और आपसी भाईचारे तथा विवाह मर्यादा को सुरक्षित रखने के लिए संताल समाज को १२ पवित्र पारिस (कुलों/गोत्रों)—हाँसदा, मुर्मू, किस्कू, हेम्ब्रम, मरांडी, सोरेन, टुडू, बास्के, बेसरा, पौरिया, चोंड़े और बेदिया में विभाजित किया गया।',
    narrativeEnglish: 'From Pilchu Haram and Pilchu Budhi came seven noble sons and seven daughters. To preserve harmony and sacred lineage, the 12 exogamous Santal clans (Paris)—Hansda, Murmu, Kisku, Hembrom, Marandi, Soren, Tudu, Baskey, Besra, Pauria, Chonre, and Bedia—were established.',
    keyFigures: ['७ पुत्र व ७ पुत्रियां', '१२ पवित्र पारिस (गोत्र)', 'हिहिड़ी-पिपिड़ी (आदि जन्मभूमि)'],
    philosophicalMeaning: 'पारिवारिक पवित्रता, सामाजिक गोत्र व्यवस्था और एक-दूसरे के प्रति अगाध आदर ही संताली संस्कृति की नींव है।',
    themeColor: 'border-rose-500',
    bgGradient: 'from-rose-900 via-pink-950 to-stone-950'
  }
];

export const SantaliCreationMyth: React.FC = () => {
  const [stagesList] = useState<CreationStage[]>(() => safeLoadFromStorage('hor_katha_cms_creation', CREATION_STAGES));
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const stage = stagesList[currentStageIdx] || stagesList[0];

  const handleSpeak = () => {
    const speech = `${stage.stageNameDevanagari}. ${stage.subtitle}. ${stage.narrativeHindi} दार्शनिक भाव: ${stage.philosophicalMeaning}`;
    speakWithFemaleVoice(speech, { lang: 'hi-IN' });
  };

  const handleNext = () => {
    if (currentStageIdx < stagesList.length - 1) {
      setCurrentStageIdx(currentStageIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentStageIdx > 0) {
      setCurrentStageIdx(currentStageIdx - 1);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-stone-950 text-white p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-300" />
              सिरजोन काहनी (Sirjon Kahni) · सृष्टि रहस्य
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-400/30 text-[11px] font-bold text-blue-200">
              Santali Creation Epic
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-blue-100">
            धरती की सृष्टि व मानव उत्पत्ति (सिरजोन काहनी)
          </h1>
          <p className="text-xs sm:text-sm text-blue-200/90 leading-relaxed font-medium">
            ठाकुर जिउ के संकल्प, हांस-हांसिल के पवित्र उड़ानों, कछुए-केंचुए के त्याग और पिलचु हाड़ाम-पिलचु बुढ़ी से १२ गोत्रों के उद्भव की अमर गाथा।
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleSpeak}
            className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Volume2 className="w-4 h-4 text-slate-950" />
            <span>गाथा वाचन सुनें (Listen)</span>
          </button>
        </div>
      </div>

      {/* Timeline Steps Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2 overflow-x-auto no-scrollbar">
        {stagesList.map((s, idx) => {
          const isCurrent = idx === currentStageIdx;
          const isPassed = idx < currentStageIdx;
          return (
            <button
              key={s.id}
              onClick={() => setCurrentStageIdx(idx)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isCurrent
                  ? 'bg-blue-700 text-white shadow-xs font-black'
                  : isPassed
                  ? 'bg-blue-50 text-blue-900 border border-blue-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span className="text-base">{s.symbol}</span>
              <span>अध्याय {s.id}</span>
            </button>
          );
        })}
      </div>

      {/* Main Stage Display Card */}
      <div
        className={`rounded-3xl p-6 sm:p-10 text-white bg-gradient-to-br ${stage.bgGradient} border-2 ${stage.themeColor} shadow-xl space-y-6 relative overflow-hidden`}
      >
        {/* Stage Watermark Symbol */}
        <div className="absolute top-2 right-4 text-9xl opacity-10 select-none pointer-events-none">
          {stage.symbol}
        </div>

        {/* Stage Title Header */}
        <div className="relative z-10 border-b border-white/20 pb-4 space-y-1">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase text-amber-200">
              चरण {stage.id} / ५
            </span>
            <span className="text-3xl">{stage.symbol}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black font-serif text-amber-100 mt-2">
            {stage.stageNameDevanagari}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-blue-200 font-mono">
            {stage.stageNameRoman} · {stage.subtitle}
          </p>
        </div>

        {/* Main Narrative Blocks */}
        <div className="relative z-10 space-y-4">
          {/* Santali Devanagari Sacred Text */}
          <div className="p-4 rounded-2xl bg-black/25 border border-white/15 space-y-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>संताली देवनागरी मूल गाथा (Santali Scripture):</span>
            </span>
            <p className="text-base sm:text-lg font-serif font-black text-white leading-relaxed">
              “{stage.narrativeSantali}”
            </p>
          </div>

          {/* Hindi Detailed Explanation */}
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-blue-200">
              विस्तृत हिन्दी विवेचन:
            </span>
            <p className="text-xs sm:text-sm font-medium text-slate-100 leading-relaxed">
              {stage.narrativeHindi}
            </p>
          </div>

          {/* English Narrative */}
          <div className="p-3.5 rounded-2xl bg-black/20 border border-white/10 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
              English Synopsis:
            </span>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              {stage.narrativeEnglish}
            </p>
          </div>
        </div>

        {/* Key Figures & Philosophical Meaning Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>प्रमुख पात्र व दिव्य प्रतीक (Key Figures):</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {stage.keyFigures.map((fig, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-xl bg-white/15 text-[11px] font-bold text-amber-100 border border-white/10"
                >
                  {fig}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
              <TreePine className="w-3.5 h-3.5 text-emerald-400" />
              <span>सांस्कृतिक व दार्शनिक संदेश (Core Philosophy):</span>
            </span>
            <p className="text-xs text-slate-200 font-medium leading-relaxed">
              {stage.philosophicalMeaning}
            </p>
          </div>
        </div>

        {/* Navigation Buttons: Previous / Next */}
        <div className="relative z-10 pt-4 border-t border-white/20 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStageIdx === 0}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
              currentStageIdx === 0
                ? 'opacity-40 cursor-not-allowed border-white/10 text-white/50'
                : 'bg-white/15 hover:bg-white/25 border-white/30 text-white'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>पिछला अध्याय</span>
          </button>

          <div className="text-xs font-bold text-white/80">
            {currentStageIdx + 1} of {stagesList.length}
          </div>

          <button
            onClick={handleNext}
            disabled={currentStageIdx === stagesList.length - 1}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
              currentStageIdx === stagesList.length - 1
                ? 'opacity-40 cursor-not-allowed border-white/10 text-white/50'
                : 'bg-amber-500 hover:bg-amber-600 border-amber-400 text-slate-950 font-black shadow-md'
            }`}
          >
            <span>अगला अध्याय</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
