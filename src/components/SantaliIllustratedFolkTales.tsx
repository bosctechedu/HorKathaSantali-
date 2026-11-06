import React, { useState, useEffect } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { toggleFavorite, isFavorite } from '../utils/favoritesStorage';
import {
  BookOpen,
  Volume2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Award,
  Layers,
  Heart
} from 'lucide-react';

interface StoryScene {
  sceneNumber: number;
  santaliDev: string;
  santaliRoman: string;
  hindiTranslation: string;
  illustrationNote: string;
}

interface FolkStory {
  id: string;
  titleDevanagari: string;
  titleRoman: string;
  categoryLabel: string;
  summary: string;
  moralWisdom: string;
  scenes: StoryScene[];
}

const FOLK_STORIES: FolkStory[] = [
  {
    id: 's1',
    titleDevanagari: 'पिलचु हाड़ाम आर पिलचु बूढ़ी (मानव उत्पत्ति व 12 कुलों का जन्म)',
    titleRoman: 'Pilchu Haram & Pilchu Budhi',
    categoryLabel: 'सृष्टि उत्पत्ति गाथा (Origin Myth)',
    summary: 'हंस-हंसिनी (हाँस-हाँसिल) के अंडों से उत्पन्न मानव के आदि पुरखे पिलचु हाड़ाम और पिलचु बूढ़ी की अमर गाथा, जिनसे संताल समाज के 12 गोत्रों (पारिस) की उत्पत्ति हुई।',
    moralWisdom: 'प्रकृति और सभी जीवों के साथ संतुलन, सह-अस्तित्व और अपने पूर्वजों के संस्कारों का सदैव स्मरण रखना।',
    scenes: [
      {
        sceneNumber: 1,
        santaliDev: 'सेदाय-सेदाय रे, ओका रे हों ओते-धर्ती बां ताहेकाना। सानाम सेन् खाली दाहाक् आर दाहाक् गे ताहेकाना।',
        santaliRoman: 'Seday-seday re, oka re hon ote-dharti ban tahekana. Sanam sen khali dahah ar dahah ge tahekana.',
        hindiTranslation: 'बहुत प्राचीन काल में, कहीं भी भूमि अथवा धरती नहीं थी। चारों ओर केवल और केवल अथाह जल ही जल था।',
        illustrationNote: 'चारों ओर नीले जल की अनंत लहरें और ऊपर खुला आकाश।'
      },
      {
        sceneNumber: 2,
        santaliDev: 'ठाकुर जियू दो मित् जोड़ा हांस-हाँसिल चेँड़े तेयार केत् किना। उकिन दो करम दारे रे तुका बेनाव काते बारया बिल्ली (बिलि) किन एरात्-आ।',
        santaliRoman: 'Thakur Jiyu do mit jora Hans-Hansil chenre teyar ket kina. Ukin do Karam dare re tuka benaw kate barya billi kin erat-a.',
        hindiTranslation: 'सृष्टिकर्ता ठाकुर जियू ने हंस और हंसिनी (हाँस-हाँसिल) का एक जोड़ा बनाया। उन्होंने करम वृक्ष पर घोंसला बनाकर दो अंडे दिए।',
        illustrationNote: 'करम वृक्ष की हरी शाखा पर दिव्य हंस-हंसिनी और उनके दो सुनहरे अंडे।'
      },
      {
        sceneNumber: 3,
        santaliDev: 'उना बिलि खोन गे मानव कोवाक् आदि पुरखा ‘पिलचु हाड़ाम’ आर ‘पिलचु बूढ़ी’ किन जनम एना। उकिन दो हिहिड़ी-पिपिड़ी रे हारा-बुरु एनाकिन।',
        santaliRoman: 'Una bili khon ge manaw kowah adi purkha Pilchu Haram ar Pilchu Budhi kin janam ena. Ukin do Hihiri-Pipiri re hara-buru enakin.',
        hindiTranslation: 'उन अंडों से मानव जाति के आदि जनक "पिलचु हाड़ाम" और आदि जननी "पिलचु बूढ़ी" का जन्म हुआ। वे पावन हिहिड़ी-पिपिड़ी देश में बड़े हुए।',
        illustrationNote: 'फूलों और वन्य लताओं से घिरे हिहिड़ी-पिपिड़ी के वन में प्रथम मानव युगल।'
      },
      {
        sceneNumber: 4,
        santaliDev: 'उकिन रेन एयात कोड़ा आर एयात कुड़ी गिद्रा को जनम एना। उकु-चुकु खेल तायोम उकुन कोवाक् मिलान एना आर संताल कोवाक् बारो पारिस (12 कुलों) रेयाक् सिरजोन एना।',
        santaliRoman: 'Ukin ren eyat kora ar eyat kuri gidra ko janam ena. Uku-chuku khel tayom ukun kowah milan ena ar Santal kowah baro paris reyah sirjon ena.',
        hindiTranslation: 'उनके सात पुत्र और सात पुत्रियां हुईं। लुका-छिपी के खेल के बाद उनका विवाह संस्कार हुआ और संतालों के 12 पावन कुलों (मुर्मू, हेम्ब्रम, सोरेन, किस्कू आदि) की स्थापना हुई।',
        illustrationNote: 'खुशहाल 12 कुलों के पूर्वज जो अखंड प्रकृति की गोद में नृत्य और संगीत कर रहे हैं।'
      }
    ]
  },
  {
    id: 's2',
    titleDevanagari: 'तुरूई कोड़ा आर चालाक तूंईऊ (छह भाई और चतुर सियार की लोककथा)',
    titleRoman: 'Turui Koda ar Chalak Tuiu',
    categoryLabel: 'नैतिक नीति कथा (Fable & Wisdom)',
    summary: 'वनों में शिकार करने गए छह सीधे-सादे संताल भाइयों और एक धूर्त सियार (तूंईऊ) के बीच घटी हास्यप्रद व शिक्षाप्रद लोककथा।',
    moralWisdom: 'दूसरों की मीठी बातों और चापलूसी में बिना सोचे-समझे विश्वास नहीं करना चाहिए; बुद्धि बल से बड़ी होती है।',
    scenes: [
      {
        sceneNumber: 1,
        santaliDev: 'मित् टान् आतु रे तुरूई बोयहा कोड़ा को ताहेकाना। उकुन दो सांव ते सेंदरा (शिकार) चालाव को कुशी-आक् ताहेना।',
        santaliRoman: 'Mit tan atu re turui boyha kora ko tahekana. Ukun do sanw te sendra chalaw ko kushi-ah tahena.',
        hindiTranslation: 'एक गांव में छह सगे भाई रहते थे। वे सभी एक साथ वनों में शिकार (सेंदरा) करने जाना बहुत पसंद करते थे।',
        illustrationNote: 'तीर-धनुष लिए छह उत्साही नौजवान भाई घने साल वन की ओर बढ़ते हुए।'
      },
      {
        sceneNumber: 2,
        santaliDev: 'बिर ताला रे मित् टान् आडी चालाक तूंईऊ (सियार) उकुन ठीन् सेतेर एना आर रोड़ केत्-आ— "ए दा को! आपे सांव इञ हों सेंदरा चालाव इञ मेन्-एदा। बालक"',
        santaliRoman: 'Bir tala re mit tan adi chalak tuiu ukun thin seter ena ar ror ket-a— "E da ko! Ape sanw iny hon sendra chalaw iny men-eda."',
        hindiTranslation: 'जंगल के बीच एक बहुत चतुर सियार उनके पास आया और बोला— "अरे बड़े भाइयों! मैं भी आप सबके साथ शिकार पर चलना चाहता हूँ।"',
        illustrationNote: 'पेड़ों की ओट से झांकता हुआ चालाक सियार जो मुस्कुराकर भाइयों को रिझा रहा है।'
      },
      {
        sceneNumber: 3,
        santaliDev: 'तूंईऊ दो सानाम दाका आर शिकार को खुद गे जोम चाबा केत्-आ आर भाइ को धोका-ए एम-आत् कोवा।',
        santaliRoman: 'Tuiu do sanam daka ar shikar ko khud ge jom chaba ket-a ar bhai ko dhoka-e em-at kowa.',
        hindiTranslation: 'सियार ने चालाकी से सारा भोजन और शिकार स्वयं चट कर लिया और भाइयों को धोखा दे दिया।',
        illustrationNote: 'मिट्टी की हांडी से चुपके-चुपके भोजन चुराता हुआ धूर्त सियार।'
      },
      {
        sceneNumber: 4,
        santaliDev: 'तायोम ते हुडिंग बोयहा वाक् अकिल ते तूंईऊ-वाक् चालाकी साबो एना आर उनी बिर खोन ताड़ाव ओड़ोक केदेयाको।',
        santaliRoman: 'Tayom te huding boyha wah akil te tuiu-wah chalaki sabo ena ar uni bir khon taraw odok kedeyako.',
        hindiTranslation: 'अंत में सबसे छोटे भाई की बुद्धिमत्ता से सियार की पोल खुल गई और भाइयों ने उसे जंगल से दूर खदेड़ दिया।',
        illustrationNote: 'छोटा भाई उंगली दिखाकर सच उजागर करता हुआ और सियार दुम दबाकर भागता हुआ।'
      }
    ]
  },
  {
    id: 's3',
    titleDevanagari: 'करम आर धरम (दो भाइयों और करम वृक्ष का पावन विधान)',
    titleRoman: 'Karam & Dharam',
    categoryLabel: 'पर्व कथा (Festival Myth)',
    summary: 'करम और धरम नामक दो भाइयों की कथा, जिन्होंने करम वृक्ष की डाल की पूजा कर दरिद्रता पर विजय पाई और समृद्धि प्राप्त की।',
    moralWisdom: 'कर्म और धर्म दोनों जीवन के दो पहिए हैं; प्रकृति के वृक्षों का सम्मान करने से ही जीवन में सुख और वैभव आता है।',
    scenes: [
      {
        sceneNumber: 1,
        santaliDev: 'करम आर धरम दो बारया बोयहा किन ताहेकाना। करम दो आडी कामिया आर धरम दो धरमीक मोने-आनिच् ताहेकाना।',
        santaliRoman: 'Karam ar Dharam do barya boyha kin tahekana. Karam do adi kamiya ar Dharam do dharmik mone-anich tahekana.',
        hindiTranslation: 'करम और धरम दो भाई थे। करम बहुत परिश्रमी था और धरम धर्म व संतों की सेवा करने वाला परोपकारी था।',
        illustrationNote: 'खेतों में परिश्रम करता करम और आंगन में अतिथि सेवा करता धरम।'
      },
      {
        sceneNumber: 2,
        santaliDev: 'मित् धाव अकाल एना आर घरौंदा रे आडी रेंगेच्-जाला हेच् एना। उना बेला रे उकिन करम दारेवाक् साखा आगु काते अखड़ा रे किन रोवा केत्-आ।',
        santaliRoman: 'Mit dhaw akal ena ar gharaunda re adi rengech-jala hech ena. Una bela re ukin Karam darewah sakha agu kate Akhra re kin rowa ket-a.',
        hindiTranslation: 'एक बार भीषण सूखा पड़ा और परिवार में घोर दरिद्रता आ गई। तब दोनों भाइयों ने वन से करम वृक्ष की दो हरी डालियां लाकर अखड़ा में रोपीं।',
        illustrationNote: 'अखड़ा के बीच में रोपी गई पवित्र करम डाल और उसके चारों ओर जलते दीप।'
      },
      {
        sceneNumber: 3,
        santaliDev: 'सानाम आतु होड़ सांव ते रासका ते करम गाथा को सेरेञ केत्-आ आर पूजा केत्-आको। रात-भर मांदर साड़े एना।',
        santaliRoman: 'Sanam atu hor sanw te raska te Karam gatha ko serenj ket-a ar puja ket-ako. Rat-bhar tumdak sare ena.',
        hindiTranslation: 'पूरे गांव वालों के साथ मिलकर उन्होंने करम गीतों का गायन किया और विधिवत आराधना की। रात भर मांदर की गूंजती थाप पर नृत्य हुआ।',
        illustrationNote: 'पारंपरिक परिधानों में सजे ग्रामीण जो करम डाल के चारों ओर घेरा बनाकर झूमर नाच रहे हैं।'
      },
      {
        sceneNumber: 4,
        santaliDev: 'करम बोंगावाक् दया ते मुसलाधार दाहाक् जड़ी एना, खेत रे सोना लेका चावले ओदोक् एना आर रेंगेच् दूर एना।',
        santaliRoman: 'Karam Bongawah daya te musladhar dahah jari ena, khet re sona leka chawle odok ena ar rengech dur ena.',
        hindiTranslation: 'करम देवता की कृपा से मूसलाधार अमृत वर्षा हुई, खेतों में सोने जैसी सुनहरी फसल लहलहा उठी और भुखमरी सदा के लिए दूर हो गई।',
        illustrationNote: 'हरे-भरे लहलहाते धान के खेत और आसमान में बरसते बादल।'
      }
    ]
  }
];

export const SantaliIllustratedFolkTales: React.FC = () => {
  const [activeStory, setActiveStory] = useState<FolkStory>(FOLK_STORIES[0]);
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [starred, setStarred] = useState<boolean>(false);

  useEffect(() => {
    setStarred(isFavorite(activeStory.id));
  }, [activeStory.id]);

  const handleToggleFavorite = () => {
    const isNowFav = toggleFavorite({
      id: activeStory.id,
      category: 'story',
      categoryLabel: activeStory.categoryLabel,
      titleDevanagari: activeStory.titleDevanagari,
      titleRoman: activeStory.titleRoman,
      subtitle: activeStory.moralWisdom,
      summary: activeStory.summary
    });
    setStarred(isNowFav);
  };

  const currentScene = activeStory.scenes[currentSceneIndex];

  const handleStoryChange = (story: FolkStory) => {
    setActiveStory(story);
    setCurrentSceneIndex(0);
  };

  const handleNextScene = () => {
    if (currentSceneIndex < activeStory.scenes.length - 1) {
      setCurrentSceneIndex((prev) => prev + 1);
    }
  };

  const handlePrevScene = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-50 via-emerald-50 to-stone-50 text-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-teal-200/40 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <BookOpen size={280} />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-700 border border-teal-500/30 text-xs font-semibold mb-3">
            <Sparkles size={14} />
            <span>हापड़ाम कोवाक् काहिनी - सचित्र संताली लोककथाएं व नीति बोध</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-teal-800 flex items-center gap-3">
            <span>सचित्र संताली लोककथाएं (Folk Tales)</span>
            <button
              onClick={() => speakWithFemaleVoice('सांतार हापड़ाम कोवाक् काहिनी आर लोककथा')}
              className="p-2 rounded-full bg-teal-500/20 hover:bg-teal-500/40 text-teal-700 transition-colors"
              title="सुनें"
            >
              <Volume2 size={22} />
            </button>
          </h1>
          <p className="text-teal-800/80 text-sm sm:text-base mt-2 leading-relaxed">
            पिलचु हाड़ाम-पिलचु बूढ़ी (सृष्टि उत्पत्ति व 12 कुल), तुरूई कोड़ा आर चालाक तूंईऊ, तथा करम-धरम पावन कथा — सचित्र दृश्य-दर-दृश्य संताली वाचन, देवनागरी लिपि और नैतिक संदेश के साथ।
          </p>
        </div>
      </div>

      {/* Story Selectors */}
      <div className="flex items-center gap-3 bg-white dark:bg-slate-50 p-3 rounded-2xl border border-slate-200 dark:border-slate-200 shadow-sm overflow-x-auto">
        {FOLK_STORIES.map((st) => (
          <button
            key={st.id}
            onClick={() => handleStoryChange(st)}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl shrink-0 transition-all ${
              activeStory.id === st.id
                ? 'bg-teal-100 text-slate-900 shadow-md'
                : 'text-slate-600 dark:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-100'
            }`}
          >
            {st.titleDevanagari}
          </button>
        ))}
      </div>

      {/* Interactive Story Reader Frame */}
      <div className="bg-white dark:bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-200 shadow-xl space-y-6">
        {/* Story Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-200 pb-5">
          <div>
            <span className="px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-50/50 text-teal-800 dark:text-teal-700 text-xs font-bold uppercase tracking-wider">
              {activeStory.categoryLabel}
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-800 mt-2">
              {activeStory.titleDevanagari}
            </h2>
            <p className="text-sm font-semibold text-teal-700 dark:text-teal-600">
              {activeStory.titleRoman}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-600 mt-2">
              {activeStory.summary}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleFavorite}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                starred
                  ? 'bg-amber-500 text-stone-950 border-amber-500 shadow'
                  : 'bg-slate-100 dark:bg-slate-100 text-slate-700 dark:text-slate-700 border-slate-200 dark:border-slate-200 hover:bg-slate-200'
              }`}
              title="डायरी में सुरक्षित करें"
            >
              <Bookmark size={14} />
              <span>{starred ? 'सुरक्षित है' : 'सेव करें'}</span>
            </button>
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-100 text-slate-700 dark:text-slate-700">
              दृश्य {currentSceneIndex + 1} / {activeStory.scenes.length}
            </span>
          </div>
        </div>

        {/* Visual Scene Canvas / Box */}
        <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-teal-50/60 via-emerald-50/40 to-slate-50 dark:from-slate-50 dark:via-teal-50/20 dark:to-slate-50 border border-teal-200/60 dark:border-teal-200/40 relative shadow-inner space-y-4">
          {/* Illustration Framing Note */}
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 dark:text-teal-700 bg-teal-100/70 dark:bg-teal-50/40 px-3 py-1.5 rounded-xl w-fit">
            <Bookmark size={14} />
            <span>दृश्य परिकल्पना: {currentScene.illustrationNote}</span>
          </div>

          {/* Santali Text */}
          <div className="space-y-3 pt-2">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-800 leading-relaxed">
                {currentScene.santaliDev}
              </h3>
              <button
                onClick={() => speakWithFemaleVoice(currentScene.santaliDev)}
                className="p-3 rounded-2xl bg-teal-700 text-white hover:bg-teal-100 transition-colors shadow-md shrink-0"
                title="कथा वाचन सुनें"
              >
                <Volume2 size={20} />
              </button>
            </div>
            <p className="text-sm font-semibold text-teal-700 dark:text-teal-600">
              {currentScene.santaliRoman}
            </p>
          </div>

          {/* Hindi Translation */}
          <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-100/80 border border-teal-200/40 dark:border-teal-200/30">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">
              हिन्दी अनुवाद:
            </span>
            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-800 leading-relaxed">
              {currentScene.hindiTranslation}
            </p>
          </div>
        </div>

        {/* Moral Wisdom Box */}
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-50/30 border border-amber-200 dark:border-amber-200/40">
          <h4 className="text-xs font-bold text-amber-900 dark:text-amber-700 uppercase tracking-wide flex items-center gap-1.5 mb-1">
            <Heart size={14} className="text-amber-600" />
            <span>नैतिक शिक्षा व जीवन दर्शन (Moral Wisdom)</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-700 leading-relaxed">
            {activeStory.moralWisdom}
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-200">
          <button
            disabled={currentSceneIndex === 0}
            onClick={handlePrevScene}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-100 text-slate-700 dark:text-slate-700 hover:bg-slate-200 dark:hover:bg-slate-200 text-xs sm:text-sm font-semibold disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft size={16} />
            <span>पिछला दृश्य</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {activeStory.scenes.map((_, idx) => (
              <span
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentSceneIndex
                    ? 'w-6 bg-teal-700'
                    : 'bg-slate-300 dark:bg-slate-200'
                }`}
              />
            ))}
          </div>

          <button
            disabled={currentSceneIndex === activeStory.scenes.length - 1}
            onClick={handleNextScene}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-teal-700 text-white hover:bg-teal-100 text-xs sm:text-sm font-semibold disabled:opacity-40 disabled:pointer-events-none transition-colors shadow"
          >
            <span>अगला दृश्य</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
