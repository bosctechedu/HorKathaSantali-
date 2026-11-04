import React, { useState, useEffect } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { toggleFavorite, isFavorite } from '../utils/favoritesStorage';
import {
  MapPin,
  Volume2,
  Sparkles,
  Mountain,
  Compass,
  Calendar,
  ExternalLink,
  Shield,
  Layers,
  Info,
  Bookmark
} from 'lucide-react';

interface PilgrimageSite {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  locationState: string;
  geographicDistrict: string;
  significanceCategory: 'dharamgarh' | 'historical_hul' | 'ancient_garh' | 'sacred_hill';
  categoryLabel: string;
  description: string;
  mythologicalHistory: string;
  annualGatheringFestival: string;
  keySpots: string[];
  pilgrimEtiquette: string;
}

const SACRED_SITES: PilgrimageSite[] = [
  {
    id: 'p1',
    nameDevanagari: 'लुगु बुरु घांटाबाड़ी धोरोमगाढ़',
    nameRoman: 'Lugu Buru Ghantabari Dharamgarh',
    locationState: 'झारखंड (Jharkhand)',
    geographicDistrict: 'बोकारो (ललपनिया, गोमिया प्रखंड)',
    significanceCategory: 'dharamgarh',
    categoryLabel: 'संतालों का सर्वोच्च पावन महातीर्थ (Supreme Seat of Faith)',
    description: 'लुगु पहाड़ की सुरम्य पर्वत श्रृंखलाओं में स्थित संताली धर्म (सरना/धोरोम) का सर्वोच्च पीठ, जहां कार्तिक पूर्णिमा के दिन भारत, नेपाल, बांग्लादेश व विश्वभर से लाखों संताल तीर्थयात्री जुटते हैं।',
    mythologicalHistory: 'मान्यता अनुसार सतयुग में पितामह लुगु बाबा की अध्यक्षता में इसी पहाड़ी पर 12 वर्षों तक विशाल महासम्मेलन चला था, जहां संताली समाज की सामाजिक व्यवस्था, रीति-रिवाज, गोत्र नियम और आचार संहिता की स्थापना हुई थी।',
    annualGatheringFestival: 'कार्तिक पूर्णिमा (सोहराय के बाद) पर आयोजित होने वाला ऐतिहासिक महासम्मेलन व पूजा।',
    keySpots: ['लुगु बाबा की प्राकृतिक गुफा', 'घांटाबाड़ी पावन शिला', 'झरना व पावन सरोवर', 'विशाल दरबार अखड़ा'],
    pilgrimEtiquette: 'पहाड़ पर चढ़ते समय जूते-चप्पल उतारकर या सात्विक मन से जाना, साल के पत्तों में दाका-प्रसाद ग्रहण करना और प्राकृतिक वनों की स्वच्छता बनाए रखना अनिवार्य है।'
  },
  {
    id: 'p2',
    nameDevanagari: 'अयोध्या बुरु (अयोध्या पहाड़, पुरुलिया)',
    nameRoman: 'Ayodhya Buru',
    locationState: 'पश्चिम बंगाल (West Bengal)',
    geographicDistrict: 'पुरुलिया (Purulia)',
    significanceCategory: 'sacred_hill',
    categoryLabel: 'ऐतिहासिक वार्षिक सेंदरा महापरिषद (Disum Sendra & Lobir Baisi)',
    description: 'संतालों की ऐतिहासिक न्याय पीठ ‘लोबीर बैसी’ का मुख्य केंद्र, जहां प्रतिवर्ष वैशाख पूर्णिमा पर पारंपरिक सेंदरा (शिकार) और सबसे बड़ी जन-अदालत बैठती है जिसमें समाज के जटिल विवाद सुलझाए जाते हैं।',
    mythologicalHistory: 'अयोध्या पहाड़ पर सीता कुंड और बामणी झरना संताल मिथकों से जुड़े हैं। यहाँ संताल वीरों ने प्राचीन काल में सामूहिक रक्षा और प्रकृति के नियमों पर लोबीर संहिता का निर्माण किया था।',
    annualGatheringFestival: 'बैसाख पूर्णिमा पर आयोजित होने वाला "दिसोम सेंदरा" (Disum Sendra)।',
    keySpots: ['लोबीर बैसी चौपाल', 'सीता कुंड', 'मुरुगबुरु शिखर', 'तुड़गा जलप्रपात'],
    pilgrimEtiquette: 'लोबीर बैसी के नियमों का पालन करना, पारंपरिक तीर-धनुष के साथ मर्यादा बनाए रखना और महिलाओं व पर्यावरण का पूर्ण सम्मान।'
  },
  {
    id: 'p3',
    nameDevanagari: 'भोगनाडीह व पंचकठिया (1855 संताल हूल महातीर्थ)',
    nameRoman: 'Bhognadih & Panchkathiya',
    locationState: 'झारखंड (Jharkhand)',
    geographicDistrict: 'साहिबगंज (बरहेट प्रखंड)',
    significanceCategory: 'historical_hul',
    categoryLabel: 'स्वाधीनता संग्राम का अमर तीर्थ (Hul Revolution Battlefield)',
    description: '30 जून 1855 को अमर शहीद सिदो-कान्हू, चांद-भैरव और फूलो-झानो ने यहीं 10,000 संतालों को एकत्र कर ब्रिटिश हुकूमत और महाजनों के विरुद्ध ऐतिहासिक संताल हूल (विद्रोह) का बिगुल फूंका था।',
    mythologicalHistory: 'भोगनाडीह में सिदो-कान्हू का पैतृक आवास है तथा पंचकठिया में वह पावन बरगद का पेड़ स्थित है जहाँ ब्रिटिश अधिकारियों द्वारा 1855 में सिदो और कान्हू मुर्मू को फांसी दी गई थी।',
    annualGatheringFestival: '30 जून को प्रतिवर्ष मनाया जाने वाला "हूल महादिवस" (Hul Maha Divas)।',
    keySpots: ['सिदो-कान्हू जन्मस्थली स्मारक', 'पंचकठिया अमर शहीद बरगद वृक्ष', 'हूल संग्रहालय बरहेट'],
    pilgrimEtiquette: 'शहीदों की प्रतिमा पर नमन कर धरती को माथे से लगाना, स्वाभिमान और सत्य के मार्ग पर चलने का संकल्प लेना।'
  },
  {
    id: 'p4',
    nameDevanagari: 'चांपा गढ़ (प्राचीन स्वर्ण युग की राजधानी)',
    nameRoman: 'Champa Garh',
    locationState: 'झारखंड / बिहार सीमावर्ती',
    geographicDistrict: 'हजारीबाग / चतरा पठार',
    significanceCategory: 'ancient_garh',
    categoryLabel: 'संताल इतिहास का स्वर्णिम साम्राज्य (Golden Age Capital)',
    description: 'संताली लोक इतिहास और बिंथी (सृष्टि गाथा) के अनुसार चांपा गढ़ संतालों का वह वैभवशाली ऐतिहासिक गढ़ था जहां 12 कुलों ने स्वतंत्र, समृद्ध और स्वाभिमानी जीवन बिताया था।',
    mythologicalHistory: 'चांपा गढ़ में संताल राजाओं का शासन था। यहां की समृद्धि का गान आज भी करम और सोहराय गीतों में "चांपा गढ़ रे सोना नूगड़ी" (चांपा गढ़ के सुनहरे वस्त्र) के रूप में गूंजता है।',
    annualGatheringFestival: 'करम पर्व और बाहा के अवसर पर पूर्वजों की स्मृति में सामूहिक यात्राएं।',
    keySpots: ['प्राचीन चांपा किला अवशेष', 'राजा-रानी पोखर', 'मरांग बुरु थान'],
    pilgrimEtiquette: 'प्राचीन पत्थरों और स्मारकों को न खुरचना, पूर्वज हापड़ामों की शांति के लिए प्रार्थना करना।'
  },
  {
    id: 'p5',
    nameDevanagari: 'शिखरजी / पारसनाथ बुरु (मरांग बुरु का पावन शिखर)',
    nameRoman: 'Marang Buru / Shikharji Parasnath',
    locationState: 'झारखंड (Jharkhand)',
    geographicDistrict: 'गिरिडीह (Giridih)',
    significanceCategory: 'sacred_hill',
    categoryLabel: 'सर्वोच्च आराध्य "मरांग बुरु" का पावन निवास स्थल',
    description: 'झारखंड की सबसे ऊंची पर्वत चोटी (1365 मीटर) जिसे संताल समाज अनादि काल से अपने सर्वोच्च आराध्य देव ‘मरांग बुरु’ (महान पर्वत देव) का मूल स्थान मानकर पूजता है।',
    mythologicalHistory: 'संताल आदिवासियों के लिए यह पहाड़ सिर्फ एक भौगोलिक रचना नहीं, बल्कि उनके सर्वोच्च संरक्षक देवता ‘मरांग बुरु’ का साकार रूप है, जिन्होंने मानव जाति को जीवन जीना सिखाया।',
    annualGatheringFestival: 'बैसाख और माघ पूर्णिमा पर पारंपरिक पूजा एवं जुग जाहेर आराधना।',
    keySpots: ['मरांग बुरु पावन थान', 'जुग जाहेर थान', 'गंधर्व नाला झरना'],
    pilgrimEtiquette: 'पहाड़ की प्राकृतिक वनस्पति और वन्यजीवों को कोई हानि न पहुंचाना, पूर्ण स्वच्छता रखना।'
  },
  {
    id: 'p6',
    nameDevanagari: 'बादामपहाड़ व सिमिलिपाल बुरु',
    nameRoman: 'Badampahar & Similipal Buru',
    locationState: 'ओडिशा (Odisha)',
    geographicDistrict: 'मयूरभंज (Mayurbhanj)',
    significanceCategory: 'sacred_hill',
    categoryLabel: 'पंडित रघुनाथ मुर्मू की साधना स्थली व लौह पर्वत',
    description: 'मयूरभंज के घने साल वनों में स्थित पावन क्षेत्र, जहां ओल चिकी लिपि के आविष्कारक गुरु गोमके पंडित रघुनाथ मुर्मू की जन्मभूमि (दांडबुश) और ऐतिहासिक संताल विरासत रची-बसी है।',
    mythologicalHistory: 'पंडित रघुनाथ मुर्मू ने इसी सुरम्य धरा पर एकांत साधना कर 1925 में संताली भाषा को स्वतंत्र लिपि "ओल चिकी" प्रदान की और संताली समाज को एक सूत्र में पिरोया।',
    annualGatheringFestival: '5 मई (गुरु गोमके जयंती) और माघे पर्व पर विशाल संमेलन।',
    keySpots: ['पंडित रघुनाथ मुर्मू जन्मस्थली दांडबुश', 'कपिलबुरु साधना गुफा', 'जोरांदा जलप्रपात'],
    pilgrimEtiquette: 'सांस्कृतिक अनुशासन, ओल चिकी लिपि और साहित्य के प्रति आदरभाव।'
  }
];

export const SantaliSacredPilgrimages: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState<PilgrimageSite>(SACRED_SITES[0]);
  const [filterState, setFilterState] = useState<string>('all');
  const [starred, setStarred] = useState<boolean>(false);

  useEffect(() => {
    setStarred(isFavorite(selectedSite.id));
  }, [selectedSite.id]);

  const handleToggleFavorite = () => {
    const isNowFav = toggleFavorite({
      id: selectedSite.id,
      category: 'pilgrimage',
      categoryLabel: selectedSite.categoryLabel,
      titleDevanagari: selectedSite.nameDevanagari,
      titleRoman: selectedSite.nameRoman,
      subtitle: `${selectedSite.locationState} • ${selectedSite.geographicDistrict}`,
      summary: selectedSite.description
    });
    setStarred(isNowFav);
  };

  const filteredSites = SACRED_SITES.filter((site) => {
    if (filterState === 'all') return true;
    return site.locationState.includes(filterState);
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <Mountain size={280} />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-3">
            <Sparkles size={14} />
            <span>पुन्य थान आर ऐतिहासिक गढ़ - संताली पावन महातीर्थ दर्शन</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-emerald-100 flex items-center gap-3">
            <span>संताली पावन तीर्थ व ऐतिहासिक गढ़</span>
            <button
              onClick={() => speakWithFemaleVoice('सांतार कोवाक् पुन्य थान आर ऐतिहासिक बुरु-गढ़')}
              className="p-2 rounded-full bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 transition-colors"
              title="सुनें"
            >
              <Volume2 size={22} />
            </button>
          </h1>
          <p className="text-emerald-200/80 text-sm sm:text-base mt-2 leading-relaxed">
            लुगु बुरु घांटाबाड़ी धोरोमगाढ़, अयोध्या बुरु, भोगनाडीह हूल स्मारक, चांपा गढ़, मरांग बुरु पारसनाथ व बादामपहाड़ — संताल समाज की आस्था, शौर्य और धर्म के पावन तीर्थों का संपूर्ण प्रामाणिक परिचय।
          </p>
        </div>
      </div>

      {/* State Filter */}
      <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
        <span className="text-xs font-bold text-slate-500 uppercase px-2 shrink-0">
          राज्य अनुसार (State):
        </span>
        {[
          { id: 'all', label: 'सभी तीर्थ (All Sites)' },
          { id: 'झारखंड', label: 'झारखंड (Jharkhand)' },
          { id: 'पश्चिम बंगाल', label: 'पश्चिम बंगाल (West Bengal)' },
          { id: 'ओडिशा', label: 'ओडिशा (Odisha)' }
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterState(f.id)}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-xl shrink-0 transition-all ${
              filterState === f.id
                ? 'bg-emerald-800 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            पावन तीर्थ सूची ({filteredSites.length})
          </h2>
          {filteredSites.map((site) => {
            const isSelected = selectedSite.id === site.id;
            return (
              <div
                key={site.id}
                onClick={() => setSelectedSite(site)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-md scale-[1.01]'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                      {site.locationState} • {site.geographicDistrict}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1.5">
                      {site.nameDevanagari}
                    </h3>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                      {site.nameRoman}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakWithFemaleVoice(site.nameDevanagari);
                    }}
                    className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600"
                    title="सुनें"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
                  {site.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 sticky top-6">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  {selectedSite.categoryLabel}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">
                  {selectedSite.nameDevanagari}
                </h2>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
                  <MapPin size={15} />
                  <span>
                    {selectedSite.locationState} | जिला: {selectedSite.geographicDistrict}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleFavorite}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                    starred
                      ? 'bg-amber-500 text-stone-950 border-amber-500 shadow'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                  }`}
                  title="डायरी में सुरक्षित करें"
                >
                  <Bookmark size={16} />
                  <span>{starred ? 'सुरक्षित है' : 'सेव करें'}</span>
                </button>
                <button
                  onClick={() => speakWithFemaleVoice(selectedSite.nameDevanagari)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-800 text-white font-medium hover:bg-emerald-900 transition-colors shadow"
                >
                  <Volume2 size={18} />
                  <span>नाम सुनें</span>
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/30">
              <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wide flex items-center gap-1.5 mb-1">
                <Compass size={14} />
                <span>परिचय व भौगोलिक महत्व</span>
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedSite.description}
              </p>
            </div>

            {/* Mythological & Historical Context */}
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30">
              <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wide flex items-center gap-1.5 mb-1">
                <Mountain size={14} className="text-amber-600" />
                <span>पौराणिक व ऐतिहासिक गाथा (Sacred History)</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedSite.mythologicalHistory}
              </p>
            </div>

            {/* Annual Gathering */}
            <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/40">
              <h4 className="text-xs font-bold text-teal-900 dark:text-teal-300 uppercase tracking-wide flex items-center gap-1.5 mb-1">
                <Calendar size={14} className="text-teal-600" />
                <span>वार्षिक महाजुटान व मेला (Gathering & Festivals)</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedSite.annualGatheringFestival}
              </p>
            </div>

            {/* Key Spots */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                <Layers size={16} className="text-emerald-600" />
                <span>मुख्य दर्शनीय व पावन स्थल (Key Sacred Spots)</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedSite.keySpots.map((spot, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>{spot}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pilgrim Etiquette */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wide flex items-center gap-1.5 mb-1">
                <Shield size={14} className="text-emerald-600" />
                <span>तीर्थयात्री आचार-संहिता व नियम (Pilgrim Etiquette)</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {selectedSite.pilgrimEtiquette}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
