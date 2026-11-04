import React, { useState } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { safeLoadFromStorage } from '../utils/storage';
import {
  Flame,
  Shield,
  Volume2,
  Calendar,
  Sparkles,
  ChevronRight,
  Info,
  Award,
  Swords,
  BookOpen
} from 'lucide-react';

export interface HulHero {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  titleHindi: string;
  periodOrYear: string;
  role: string;
  sacredPlace: string;
  biographyHindi: string;
  warCrySantali: string;
  warCryHindi: string;
  historicalImpact: string;
  badgeColor: string;
}

export const DEFAULT_HUL_HEROES: HulHero[] = [
  {
    id: 'tilka_majhi',
    nameDevanagari: 'बाबा तिलका मांझी (जबरा पहाड़िया)',
    nameRoman: 'Baba Tilka Majhi (Jabra Paharia)',
    titleHindi: 'भारत के प्रथम स्वतंत्रता सेनानी व आदि विद्रोही',
    periodOrYear: '१७५० – १७८५ ईस्वी',
    role: 'आदि विद्रोही, धनुर्धर सेनानायक',
    sacredPlace: 'तिलकपुर, सुल्तानगंज एवं भागलपुर (बिहार)',
    biographyHindi: 'बाबा तिलका मांझी ने 1784 में ही ब्रिटिश ईस्ट इंडिया कंपनी की लूट और जमींदारी शोषण के विरुद्ध धनुष-बाण उठाकर प्रथम सशस्त्र संग्राम छेड़ दिया था। उन्होंने भागलपुर के अत्याचारी कलेक्टर ऑगस्टस क्लीवलैंड को ताड़ के पेड़ पर चढ़कर विषैले तीर से मार गिराया था। उन्हें बरगद के पेड़ पर फांसी दी गई थी।',
    warCrySantali: 'धनुष सांव दिशोम लांग बांचावा, कंपनी राज लांग हुल-उतारआ!',
    warCryHindi: 'तीर-धनुष के बल पर देश को बचाएंगे, कंपनी के विदेशी राज को उखाड़ फेंकेंगे!',
    historicalImpact: '1857 के सिपाही विद्रोह से 73 वर्ष पूर्व ही भारत की स्वाधीनता का पहला सशस्त्र बिगुल फूंकने वाले अमर सेनानी।',
    badgeColor: 'bg-red-100 text-red-900 border-red-300'
  },
  {
    id: 'sido_kanhu_murmu',
    nameDevanagari: 'सिदो मुर्मू आर कान्हू मुर्मू',
    nameRoman: 'Sido Murmu & Kanhu Murmu',
    titleHindi: 'संथाल हुल १८५५ के महानायक व क्रांतिदूत',
    periodOrYear: '१८१५/१८२० – १८५५ ईस्वी',
    role: 'संथाल हुल के सर्वोच्च सेनानायक एवं आध्यात्मिक मार्गदर्शक',
    sacredPlace: 'भोगनाडीह, साहिबगंज (संथाल परगना, झारखंड)',
    biographyHindi: '30 जून 1855 को भोगनाडीह में 10,000 से अधिक संतालों की ऐतिहासिक महापंचायत बुलाकर इन्होंने ब्रिटिश हुकूमत और महाजनों के विरुद्ध खुला युद्ध घोषित किया। ठाकुर जिउ के आदेश का हवाला देकर इन्होंने "अबोवाः दिशोम, अबोवाः राज" का अमर नारा दिया और पूरे छोटानागपुर क्षेत्र में अंग्रेजों की सत्ता हिला दी।',
    warCrySantali: 'अबोवाः दिशोम, अबोवाः राज! हूल जोहार, मारंग बुरु सांव लांग लढ़ैया!',
    warCryHindi: 'हमारा देश, हमारा राज! हूल जोहार, कुलदेवताओं के आशीष से स्वाभिमान के लिए लड़ेंगे!',
    historicalImpact: 'अंग्रेजों को घुटने टेकने पर मजबूर किया और इसके फलस्वरूप "संथाल परगना (SPT Act)" व विशेष सुरक्षा कानून अस्तित्व में आए। प्रतिवर्ष 30 जून को "हूल दिवस" के रूप में मनाया जाता है।',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
  },
  {
    id: 'chand_bhairav_murmu',
    nameDevanagari: 'चांद मुर्मू आर भैरव मुर्मू',
    nameRoman: 'Chand Murmu & Bhairav Murmu',
    titleHindi: 'संथाल हुल के वीर सेनानी व रणनीति विशेषज्ञ',
    periodOrYear: '१८२५ – १८५५ ईस्वी',
    role: 'सैन्य व्यूहरचना व छापामार युद्ध संचालक',
    sacredPlace: 'भोगनाडीह एवं बड़हरवा (झारखंड)',
    biographyHindi: 'सिदो और कान्हू के छोटे भाई, जिन्होंने संथाल सेना की अग्रिम पंक्तियों का नेतृत्व किया। बड़हरवा और महेशपुर के भीषण युद्ध में इन्होंने अंग्रेजी सेना की तोपों के सामने परंपरागत तीरों और भालों से मोर्चा लिया और वीरगति प्राप्त की।',
    warCrySantali: 'सांवता लागीत जीवी लांग एमा, हूल दाड़े ते दिशोम लांग रोड़का!',
    warCryHindi: 'समाज के लिए प्राणों की आहुति देंगे, हुल की शक्ति से अपनी धरती को मुक्त कराएंगे!',
    historicalImpact: 'संथाली समाज में भ्रातृत्व और मातृभूमि के प्रति सर्वोच्च बलिदान का अनुपम आदर्श।',
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-300'
  },
  {
    id: 'phulo_jhano_murmu',
    nameDevanagari: 'फूलो मुर्मू आर झानो मुर्मू',
    nameRoman: 'Phulo Murmu & Jhano Murmu',
    titleHindi: 'संथाल हुल की अमर वीरांगना बहनें',
    periodOrYear: '१८३० – १८५६ ईस्वी',
    role: 'महिला क्रांतिकारी वाहिनी की प्रमुख',
    sacredPlace: 'पाकुड़ एवं भोगनाडीह (झारखंड)',
    biographyHindi: 'सिदो-कान्हू की वीरांगना बहनें। जब अंग्रेजी सेना ने पाकुड़ के पास छावनी बनाई, तब फूलो और झानो ने रात के अंधेरे में ब्रिटिश कैंप में घुसकर कुल्हाड़ी (टांगा) से 21 अंग्रेज सैनिकों को ढेर कर दिया था। उनका यह अदम्य शौर्य भारतीय इतिहास की सबसे साहसिक घटनाओं में से एक है।',
    warCrySantali: 'कुड़ी कोवाः दाड़े नेलपे, अबोवाः माटी लागीत लांग लढ़ैया!',
    warCryHindi: 'नारी शक्ति का शौर्य देखो, अपनी माटी की रक्षा के लिए अंत तक लड़ेंगे!',
    historicalImpact: 'आदिवासी महिला सशक्तिकरण और सैन्य वीरता की अमर प्रतीक, जिन्होंने साबित किया कि संथाली महिलाएं युद्ध में पुरुषों से पीछे नहीं हैं।',
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
  },
  {
    id: 'bhagirath_majhi',
    nameDevanagari: 'बाबाजी भागीरथ मांझी',
    nameRoman: 'Babaji Bhagirath Majhi',
    titleHindi: 'खेरवार आंदोलन १८७४ के प्रणेता व संत नेता',
    periodOrYear: '१८३५ – १८७९ ईस्वी',
    role: 'खेरवार आंदोलन के आध्यात्मिक एवं राजनीतिक नेता',
    sacredPlace: 'गोड्डा (संथाल परगना, झारखंड)',
    biographyHindi: '1874 के खेरवार आंदोलन के जनक। उन्होंने संतालों को अहिंसक सत्याग्रह, स्वदेशी जीवन, मदिरा-त्याग, और ब्रिटिश शासन को लगान न देने का आह्वान किया। उन्होंने स्वयं को "संथाली राजा" घोषित कर संथाली अस्मिता को नया आध्यात्मिक बल प्रदान किया।',
    warCrySantali: 'खेरवार सांवता लाहाय मे, सत ते ताहेन मे, लगान आलोम एमा!',
    warCryHindi: 'खेरवार समाज को आगे बढ़ाओ, सत्य पर अडिग रहो, अंग्रेजों को लगान मत दो!',
    historicalImpact: 'महात्मा गांधी के असहयोग आंदोलन से कई दशक पहले अहिंसक कर-बंदी और आत्म-सुधार आंदोलन की नींव रखी।',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
  },
  {
    id: 'pandit_raghunath_murmu',
    nameDevanagari: 'पंडीत रघुनाथ मुर्मू (गुरु गोमके)',
    nameRoman: 'Pandit Raghunath Murmu (Guru Gomke)',
    titleHindi: 'संथाली साहित्य, दर्शन व संस्कृति के महान मनीषी',
    periodOrYear: '१९०५ – १९८२ ईस्वी',
    role: 'भाषाविद्, दार्शनिक, नाटककार व महान शिक्षक',
    sacredPlace: 'मयूरभंज (ओडिशा) व झाड़ग्राम (पश्चिम बंगाल)',
    biographyHindi: 'संथाली भाषा और साहित्य को वैश्विक पहचान दिलाने वाले युगपुरुष। उन्होंने "बिदु चांदन", "खेरवार बीर" और "दारेगे धन" जैसे अमर संथाली महानाटकों की रचना की और संथाली संस्कृति, नैतिक शिक्षा और अस्मिता को संजोने के लिए अपना पूरा जीवन समर्पित कर दिया।',
    warCrySantali: 'ओल चिकाते लांग हाड़ावा, रोड़ चिकाते लांग दोहोया, सांवता लागीत लांग कामिया!',
    warCryHindi: 'अपनी भाषा और ज्ञान से हम आगे बढ़ेंगे, अपनी वाणी को सुरक्षित रखेंगे और समाज के लिए कार्य करेंगे!',
    historicalImpact: 'संथाली भाषा को आधुनिक युग में साहित्य अकादमी और संविधान की ८वीं अनुसूची तक पहुंचाने की वैचारिक नींव रखने वाले महापुरुष।',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
  }
];

export const SanthalHulHeroes: React.FC = () => {
  const [heroes] = useState<HulHero[]>(() =>
    safeLoadFromStorage('hor_katha_cms_hul_heroes', DEFAULT_HUL_HEROES)
  );
  const [selectedHero, setSelectedHero] = useState<HulHero>(heroes[0]);
  const [activeTab, setActiveTab] = useState<'heroes' | 'timeline'>('heroes');

  const hulTimeline = [
    {
      year: '१७८४ ईस्वी',
      title: 'बाबा तिलका मांझी का प्रथम स्वतंत्रता संग्राम',
      desc: 'भागलपुर में क्लीवलैंड पर तीर चलाकर आदिवासी संप्रभुता का पहला राष्ट्रीय शंखनाद किया।'
    },
    {
      year: '३० जून १८५५',
      title: 'भोगनाडीह में १०,००० संतालों की महापंचायत',
      desc: 'सिदो-कान्हू के नेतृत्व में अंग्रेजों व महाजनों के विरुद्ध संथाल हुल की औपचारिक घोषणा।'
    },
    {
      year: 'जुलाई - अगस्त १८५५',
      title: 'पाकुड़, महेशपुर व राजमहल पहाड़ियों में भीषण युद्ध',
      desc: 'फूलो-झानो का पाकुड़ कैंप पर साहसिक हमला, चांद-भैरव का अदम्य शौर्य।'
    },
    {
      year: 'दिसंबर १८५५',
      title: 'संथाल परगना जिले का गठन',
      desc: 'ब्रिटिश हुकूमत विवश होकर अलग प्रशासनिक इकाई व सुरक्षा नीतियां बनाने पर बाध्य हुई।'
    },
    {
      year: '१८७४ ईस्वी',
      title: 'बाबाजी भागीरथ मांझी का खेरवार आंदोलन',
      desc: 'अहिंसक असहयोग, स्वदेशी जीवन और सत्य-अहिंसा पर आधारित जन-जागरण।'
    },
    {
      year: 'वर्तमान',
      title: 'प्रतिवर्ष ३० जून: अमर हुल दिवस (Hul Maha)',
      desc: 'पूरे देश व दुनिया भर में संथाली स्वाभिमान व वीर शहीदों की स्मृति में हुल दिवस मनाया जाता है।'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-red-900 via-rose-950 to-amber-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-red-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-red-200 border border-red-400/30">
              <Flame className="w-4 h-4 text-red-300" />
              <span>हुल सेंगेल • संथाल हुल १८५५ एवं अमर महापुरुष गैलरी</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              संथाल हुल एवं गौरव गाथा (Santhal Hul Freedom Heroes)
            </h1>
            <p className="text-red-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              "अबोवाः दिशोम, अबोवाः राज!" — बाबा तिलका मांझी से लेकर सिदो-कान्हू, चांद-भैरव, फूलो-झानो एवं गुरु गोमके तक संथाली स्वाभिमान, त्याग और वीरता का अमर इतिहास।
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 self-start md:self-auto">
            <Swords className="w-6 h-6 text-amber-300" />
            <div>
              <p className="text-xs text-red-200">अमर महानायक</p>
              <p className="text-lg font-black text-white">{heroes.length} हुल सेनानी</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex items-center gap-2 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs">
        <button
          onClick={() => setActiveTab('heroes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'heroes'
              ? 'bg-red-800 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>अमर महापुरुष (Heroes Profiles)</span>
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'timeline'
              ? 'bg-red-800 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>ऐतिहासिक हुल कालक्रम (Historical Timeline)</span>
        </button>
      </div>

      {/* TAB 1: Heroes Spotlight */}
      {activeTab === 'heroes' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {heroes.map((hero) => {
              const isSelected = selectedHero.id === hero.id;
              return (
                <div
                  key={hero.id}
                  onClick={() => setSelectedHero(hero)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer bg-white text-left flex flex-col justify-between shadow-xs ${
                    isSelected
                      ? 'border-red-600 ring-2 ring-red-500/20 shadow-md scale-[1.01]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${hero.badgeColor}`}>
                        {hero.periodOrYear}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakWithFemaleVoice(hero.nameDevanagari);
                        }}
                        className="p-1 rounded-full bg-red-50 hover:bg-red-100 text-red-800 cursor-pointer"
                        title="नाम सुनें"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 tracking-tight">
                      {hero.nameDevanagari}
                    </h3>
                    <p className="text-xs font-semibold text-red-700 mb-1">
                      {hero.titleHindi}
                    </p>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {hero.biographyHindi}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 truncate max-w-[140px]">{hero.sacredPlace}</span>
                    <span className="text-red-800 font-bold hover:underline">
                      जीवनी देखें →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Detailed Card */}
          <div className="lg:col-span-5 sticky top-20 bg-white rounded-3xl border border-slate-200 shadow-lg p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${selectedHero.badgeColor}`}>
                  {selectedHero.periodOrYear}
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  {selectedHero.nameDevanagari}
                </h2>
                <p className="text-sm font-bold text-red-700">
                  {selectedHero.titleHindi}
                </p>
              </div>
              <button
                onClick={() => speakWithFemaleVoice(selectedHero.nameDevanagari)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-900 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                <Volume2 className="w-4 h-4" />
                <span>उच्चारण</span>
              </button>
            </div>

            {/* Quick Metadata */}
            <div className="grid grid-cols-2 gap-3 bg-red-50/50 p-3.5 rounded-2xl border border-red-100 text-xs">
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase">मुख्य भूमिका</p>
                <p className="font-bold text-slate-800 mt-0.5">{selectedHero.role}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase">पवित्र कार्यक्षेत्र</p>
                <p className="font-bold text-slate-800 mt-0.5">{selectedHero.sacredPlace}</p>
              </div>
            </div>

            {/* Biography */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-red-700" /> गौरवशाली इतिहास व बलिदान
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                {selectedHero.biographyHindi}
              </p>
            </div>

            {/* War Cry Banner */}
            <div className="bg-gradient-to-r from-red-50 to-amber-50 p-4 rounded-2xl border border-red-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-red-900 uppercase flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-red-600" /> अमर हुल उद्घोष (War Cry)
                </span>
                <button
                  onClick={() => speakWithFemaleVoice(selectedHero.warCrySantali)}
                  className="p-1 rounded-full bg-red-100 hover:bg-red-200 text-red-900 cursor-pointer"
                  title="उद्घोष सुनें"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs font-black text-slate-900 italic">
                "{selectedHero.warCrySantali}"
              </p>
              <p className="text-[11px] text-slate-600 font-medium">
                भावार्थ: {selectedHero.warCryHindi}
              </p>
            </div>

            {/* Impact */}
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                ऐतिहासिक प्रभाव व राष्ट्रीय धरोहर
              </h4>
              <p className="text-xs text-slate-700">
                {selectedHero.historicalImpact}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Timeline */}
      {activeTab === 'timeline' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <h3 className="text-xl font-black text-slate-900">
              संथाल हुल संग्राम: ऐतिहासिक कालक्रम (Chronology of Resistance)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              १७८४ के बाबा तिलका मांझी से लेकर १८५५ के महाविद्रोह एवं वर्तमान तक संथाली क्रांति की गौरव गाथा।
            </p>
          </div>

          <div className="relative border-l-2 border-red-300 ml-4 pl-6 space-y-6">
            {hulTimeline.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-red-600 ring-4 ring-red-100" />
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 hover:bg-red-50/30 transition-all">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-100 text-red-800">
                    {item.year}
                  </span>
                  <h4 className="text-base font-black text-slate-900 mt-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
