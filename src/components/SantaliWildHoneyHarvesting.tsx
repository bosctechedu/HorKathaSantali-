import React, { useState } from 'react';
import { Sparkles, Volume2, Info, Compass, ShieldCheck, Flame, Droplets } from 'lucide-react';

interface HoneyBeeSpecies {
  id: string;
  nameSantali: string;
  nameDevanagari: string;
  nameHindi: string;
  scientificName: string;
  nestLocation: string;
  honeyFlavor: string;
  harvestSeason: string;
  medicinalBenefit: string;
  visualEmoji: string;
}

const HONEYBEE_SPECIES: HoneyBeeSpecies[] = [
  {
    id: 'terom',
    nameSantali: 'Terom (तेरोम)',
    nameDevanagari: 'तेरोम रस / डाहार तेरोम',
    nameHindi: 'विशाल पहाड़ी मधुमक्खी (Giant Rock Bee)',
    scientificName: 'Apis dorsata',
    nestLocation: 'गगनचुंबी साल (सरजोम) के वृक्षों की सबसे ऊंची शाखाओं या ऊंचे पहाड़ों की लटकी चट्टानों पर।',
    honeyFlavor: 'गाढ़ा, गहरा सुनहरी-भूरा, तीव्र सुगन्धित और थोड़ा कसेला जो वनौषधियों के रस से भरा होता है।',
    harvestSeason: 'बैसाख-ज्येष्ठ (गर्मी के चरम पर जब जंगल के सभी फूल खिले हों)।',
    medicinalBenefit: 'श्वास रोग, पुरानी खांसी, घाव भरने व दुर्बलता दूर करने के लिए रामबाण औषधि।',
    visualEmoji: '🐝'
  },
  {
    id: 'luti',
    nameSantali: 'Luti (लुती)',
    nameDevanagari: 'लुती रस / नासा रस',
    nameHindi: 'डंक-रहित लघु मधुमक्खी (Stingless Dammar Bee)',
    scientificName: 'Tetragonula iridipennis',
    nestLocation: 'पुराने पेड़ों के खोखलों, दीमक की बांबियों या पुरानी मिट्टी की दीवारों की संकरी दरारों में।',
    honeyFlavor: 'तरल, खट्टा-मीठा, अत्यंत स्वादिष्ट व औषधीय राल (Propolis) युक्त।',
    harvestSeason: 'वर्ष पर्यंत (विशेषकर आश्विन-कार्तिक में)।',
    medicinalBenefit: 'नेत्र ज्योति बढ़ाने (आंखों में अंजन की तरह), बच्चों के पेट दर्द और मुंह के छालों में विशेष लाभकारी।',
    visualEmoji: '🍯'
  },
  {
    id: 'hurum',
    nameSantali: 'Hurum (हुरुम)',
    nameDevanagari: 'हुरुम रस / काठ रस',
    nameHindi: 'वृक्ष-प्रकोष्ठ मधुमक्खी (Asian Cavity Bee)',
    scientificName: 'Apis cerana indica',
    nestLocation: 'जंगल के जीवित या सूखे महुआ, गूलर और करम के तने के भीतरी खोखल (ढोढरो) में।',
    honeyFlavor: 'हल्का सुनहरी, मीठा और फूलों की भीनी-भीनी सौंधी महक लिए हुए।',
    harvestSeason: 'फाल्गुन से चैत्र (वसंत ऋतु में बाहा पर्व के समय)।',
    medicinalBenefit: 'पाचन तंत्र को दुरुस्त रखने और प्रसूता माताओं को तुरंत शक्ति देने के लिए।',
    visualEmoji: '🌼'
  }
];

const SUSTAINABLE_HARVEST_STEPS = [
  {
    step: 1,
    title: 'बीर बोंगा से अनुज्ञा व क्षमा (Bir Bonga Nem)',
    description: 'पेड़ पर चढ़ने से पूर्व शिकारी ३ बार कुल्हाड़ी के पिछले भाग से तने को छूकर वन-देव (बीर बोंगा) को नमन करता है और केवल अपनी भूख मिटाने भर शहद लेने की अनुमति मांगता है।'
  },
  {
    step: 2,
    title: 'धुआं मशाल का प्रयोग (Torch of Green Leaves)',
    description: 'हरी पत्तियों और साल की छाल से हल्की धुंआदार मशाल (धूकुड़) बनाई जाती है। धुआं देखकर मक्खियां शांत होकर दूर हट जाती हैं, किसी भी मधुमक्खी को जलाया या मारा नहीं जाता।'
  },
  {
    step: 3,
    title: 'आधा छत्ता छोड़ने का स्वर्णिम नियम (Partial Cut)',
    description: 'संताली शिकारी पूरे छत्ते को कभी नहीं काटता। केवल ऊपरी शहद भरे भाग को बांस के धारदार चाकू से काटा जाता है, जिसमें अंडे-बच्चे (Brood comb) होते हैं उस हिस्से को पेड़ पर सुरक्षित छोड़ दिया जाता है ताकि वंश चलता रहे।'
  },
  {
    step: 4,
    title: 'पिल्ही व साल पत्तों में संचयन (Leaf Packet Storage)',
    description: 'ताजे शहद को निचोड़कर साल (सरजोम) के पत्तों के दोने (खोलखा) में रखा जाता है। कोई भी अशुद्ध पात्र छूने की अनुमति नहीं होती।'
  }
];

export const SantaliWildHoneyHarvesting: React.FC = () => {
  const [selectedBee, setSelectedBee] = useState<HoneyBeeSpecies>(HONEYBEE_SPECIES[0]);
  const [activeTab, setActiveTab] = useState<'species' | 'sustainable_steps' | 'medicinal'>('species');

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'hi-IN';
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-yellow-950 to-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-amber-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-amber-500/30">
              <Droplets className="w-4 h-4" />
              तेरोम आर लुती रस • Wild Honey Harvesting Lore
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-amber-50">
              संताली वन-शहद संचयन व वन्य-मधुमक्खी विद्या
            </h1>
            <p className="mt-2 text-amber-200/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              तेरोम, लुती व हुरुम मधुमक्खी प्रजातियों का ज्ञान, आधा छत्ता छोड़ने की सतत संचयन परंपरा, बीर बोंगा की प्रार्थना और वनौषधीय शहद चिकित्सा।
            </p>
          </div>

          <div className="flex items-center gap-2 bg-stone-950/80 p-1.5 rounded-2xl border border-amber-700/50">
            <button
              onClick={() => setActiveTab('species')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'species'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-amber-300 hover:text-white'
              }`}
            >
              मधुमक्खी जातियां
            </button>
            <button
              onClick={() => setActiveTab('sustainable_steps')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'sustainable_steps'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-amber-300 hover:text-white'
              }`}
            >
              सतत संचयन विधि
            </button>
            <button
              onClick={() => setActiveTab('medicinal')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'medicinal'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-amber-300 hover:text-white'
              }`}
            >
              औषधीय गुण
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab: Species */}
      {activeTab === 'species' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 px-1 flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-600" />
              ३ पारंपरिक वन-मधुमक्खियां:
            </h2>

            <div className="space-y-3">
              {HONEYBEE_SPECIES.map((bee) => {
                const isSelected = selectedBee.id === bee.id;
                return (
                  <div
                    key={bee.id}
                    onClick={() => setSelectedBee(bee)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-600 shadow-md ring-2 ring-amber-500/20'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl p-2 bg-amber-100 dark:bg-amber-900/60 rounded-xl">
                          {bee.visualEmoji}
                        </span>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white text-base">
                            {bee.nameSantali}
                          </div>
                          <div className="text-xs text-amber-700 dark:text-amber-400 font-semibold font-mono">
                            {bee.nameHindi}
                          </div>
                          <div className="text-[11px] text-slate-500 italic">
                            {bee.scientificName}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(`${bee.nameSantali}. ${bee.nameHindi}. ${bee.medicinalBenefit}`);
                        }}
                        className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-100 dark:hover:bg-amber-900/50"
                        title="विवरण सुनें"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Indigenous Ecology Callout */}
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
              <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 mb-1">
                <Info className="w-4 h-4" />
                जैव-विविधता परागण (Pollination Guardians):
              </div>
              संताली वनवासी मधुमक्खियों को 'बीर रेन दूता' (जंगल के देवदूत) मानते हैं। वे जानते हैं कि यदि जंगल से मधुमक्खियां लुप्त हो गईं तो साल, महुआ और करम के पेड़ फल नहीं देंगे।
            </div>
          </div>

          {/* Bee Detail */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {selectedBee.visualEmoji} {selectedBee.nameSantali}
                  </h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
                    {selectedBee.nameHindi} ({selectedBee.scientificName})
                  </p>
                </div>
                <button
                  onClick={() => speakText(`${selectedBee.nameSantali}. घोंसला: ${selectedBee.nestLocation}. शहद स्वाद: ${selectedBee.honeyFlavor}`)}
                  className="px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-900/40 hover:bg-amber-100 text-amber-700 dark:text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  ऑडियो सुनें
                </button>
              </div>

              {/* Data Specifications */}
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                    छत्ता निर्माण स्थान व प्रकृति (Nest Habitat):
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/30 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                    {selectedBee.nestLocation}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    शहद का स्वाद व रंग (Flavor & Consistency):
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/30 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                    {selectedBee.honeyFlavor}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    औषधीय उपयोग व स्वास्थ्य लाभ:
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-emerald-50/40 dark:bg-emerald-950/20 p-3.5 rounded-2xl border border-emerald-200/50 dark:border-emerald-900/30">
                    {selectedBee.medicinalBenefit}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab: Sustainable Steps */}
      {activeTab === 'sustainable_steps' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              आदिवासी सतत संचयन आचार-संहिता (Non-Destructive Harvesting)
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              संताली समाज कभी भी पूरी कॉलोनी या छत्ते को नष्ट नहीं करता। प्रकृति के साथ सह-अस्तित्व की ४-चरणीय विधि।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SUSTAINABLE_HARVEST_STEPS.map((s) => (
              <div
                key={s.step}
                className="p-5 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center">
                    {s.step}
                  </span>
                  <h3 className="font-bold text-amber-950 dark:text-amber-200 text-base">
                    {s.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Tab: Medicinal */}
      {activeTab === 'medicinal' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              जंगली शहद व मोम (मेढ़) के पारंपरिक लोक-नुस्खे
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              हातु कविराज (ग्राम्य वैद्य) द्वारा प्रयुक्त शुद्ध प्राकृतिक वनौषधीय प्रयोग।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-2xl">🍯</div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                लुती रस व नेत्र ज्योति
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                छोटी डंक-रहित मधुमक्खी (लुती) के रस की १ बूंद रात को सोने से पहले आंखों में डालने से धुंधलापन और जलन दूर होती है।
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-2xl">🌿</div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                अदरक व तेरोम रस का काढ़ा
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                शीत ऋतु में तीव्र खांसी और सीने की जकड़न में जंगली पहाड़ी शहद को कुचले हुए अदरक के रस के साथ गुनगुना सेवन कराया जाता है।
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-2xl">🕯️</div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                मधुमक्खी मोम (मेढ़) व फटी एड़ियां
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                छत्ते के प्राकृतिक मोम को गर्म सरसों या महुआ के तेल में पिघलाकर पैरों की गहरी फटी बिवाइयों पर लगाने से घाव २ दिन में भर जाते हैं।
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
