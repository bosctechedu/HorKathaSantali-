import React, { useState } from 'react';
import { Fish, Volume2, Info, Compass, ShieldCheck, Droplets, Sparkles, HelpCircle } from 'lucide-react';

interface FishTrapItem {
  id: string;
  nameSantali: string;
  nameDevanagari: string;
  nameHindi: string;
  category: 'flowing_water' | 'still_pond' | 'carrier' | 'cast_net';
  bambooSpecies: string;
  season: string;
  targetSpecies: string;
  construction: string;
  mechanism: string;
  sacredPractice: string;
  visualIcon: string;
}

const FISHING_TRAPS: FishTrapItem[] = [
  {
    id: 'torodan',
    nameSantali: 'Torodan',
    nameDevanagari: 'तोरोदान',
    nameHindi: 'प्रवाह-कालीन शंक्वाकार बाँस जाल',
    category: 'flowing_water',
    bambooSpecies: 'माद (Mat) - नरकट व देशी कोमल बाँस',
    season: 'सावन-भादो (वर्षा काल में जल बहाव के समय)',
    targetSpecies: 'गद (Gad), पोथी (Pothi), गरई (Garai)',
    construction: 'अत्यंत बारीक छिली हुई बाँस की तीलियों (कामी) को सूत अथवा केवड़ा की रस्सी से बुना जाता है। इसका मुख चौड़ा और पिछला भाग संकरा होता है, जिसके भीतर उलटे काँटेदार बांस के छल्ले लगे होते हैं।',
    mechanism: 'जलधारा के विपरीत मेढ़ों अथवा नाले के निकास पर बांधा जाता है। पानी के तीव्र बहाव के साथ मछली अंदर तो प्रवेश कर जाती है, परंतु विपरीत दिशा में नुकीले बांस अवरोध के कारण बाहर नहीं निकल पाती।',
    sacredPractice: 'तोरोदान को जल में स्थापित करने से पहले गाड़ा बोंगा (नदी के देव) को ३ दाने सिंदूर व धान के अक्षत अर्पित किए जाते हैं।',
    visualIcon: '🔻'
  },
  {
    id: 'ghuni',
    nameSantali: 'Ghuni',
    nameDevanagari: 'घूनी',
    nameHindi: 'भूलभुलैया स्थिर जल मत्स्य पेटी',
    category: 'still_pond',
    bambooSpecies: 'रोपा माद (कठिन परिपक्व बाँस)',
    season: 'आश्विन-कार्तिक (धान के खेतों व पोखरों में)',
    targetSpecies: 'इचाः हाकू (झींगा), सउल (Saul), मागुर (Magur)',
    construction: 'चौकोर अथवा बेलनाकार बांस की टोकरी जिसमें दोनों छोरों पर भीतर की ओर झुकते हुए दोहरे वॉल्व (दुआर) बनाए जाते हैं। बाँस की तीलियाँ इतनी घनी होती हैं कि केवल जल छनता है।',
    mechanism: 'तालाब के शैवाल व धान के खेत के शांत पानी में इसे रख दिया जाता है। अंदर धान की भूसी (गुली) व महुआ की खली का चारा रखा जाता है। चारा सूंघकर मछली भीतर घुसती है और अंदर कैद हो जाती है।',
    sacredPractice: 'घूनी को संध्या काल में लगाया जाता है और प्रातः सूर्योदय से पूर्व उठाया जाता है। प्रथम पकड़ी गई मछली को जल में क्षमा मांगते हुए वापस छोड़ा जाता है।',
    visualIcon: '📦'
  },
  {
    id: 'pilhi',
    nameSantali: 'Pilhi',
    nameDevanagari: 'पिल्ही',
    nameHindi: 'कमर-पेटी बांस मत्स्य पात्र',
    category: 'carrier',
    bambooSpecies: 'बारीक हरी कमानीदार बाँस की तीली',
    season: 'वर्ष पर्यंत (विशेषतः सेंदरा व हाकू सांदरा के दिन)',
    targetSpecies: 'जीवित पकड़ी गई समस्त मछलियों का संरक्षण',
    construction: 'घड़े के आकार की संकरी गर्दन वाली अत्यंत सुंदर टोकरी। इसके मुख पर ढक्कन (दापनी) होता है जिसमें छोटा सा छिद्र होता है। इसमें कमर पर बांधने के लिए मूंज की मजबूत डोरी जुड़ी होती है।',
    mechanism: 'मछली पकड़ते समय इसे कमर से बांधकर पानी में डुबोए रखा जाता है ताकि पकड़ी गई मछलियां ताजे पानी में तैरती रहें और जीवित व ताजी बनी रहें। संकरी गर्दन के कारण मछलियां उछलकर भाग नहीं पातीं।',
    sacredPractice: 'पिल्ही का कभी अनादर नहीं किया जाता। इसे घर के पवित्र कोने में टांगा जाता है और इस पर पैर का स्पर्श वर्जित है।',
    visualIcon: '🏺'
  },
  {
    id: 'jhali',
    nameSantali: 'Jhali / Jhal',
    nameDevanagari: 'झाली / झाल',
    nameHindi: 'हस्त-निर्मित गोलाकार फेंकने वाला जाल',
    category: 'cast_net',
    bambooSpecies: 'सन (सूत) व महुली काता (लोहे के छर्रे/गोली)',
    season: 'फाल्गुन से ज्येष्ठ (गर्मी के सूखे तालाबों में)',
    targetSpecies: 'रोहू (Rohu), कतला (Katla), मिरगल (Mirgal)',
    construction: 'सूती या नायलॉन के धागों से हाथों द्वारा महीन गांठे बांधकर बनाया गया छतरीनुमा चक्राकार जाल। इसकी परिधि पर समान दूरी पर लोहे अथवा मिट्टी के गोल छर्रे (झाल-गुली) बंधे होते हैं।',
    mechanism: 'मछुआरा इसे कलात्मक ढंग से घुमाकर जल पर फेंकता है। छर्रों के भार से यह पानी में तेजी से छतरी की तरह फैलकर नीचे बैठ जाता है। रस्सी खींचने पर निचला सिरा थैले की तरह बंद हो जाता है।',
    sacredPractice: 'झाली की बुनाई के समय पुरुष एकाग्रचित्त रहते हैं। नया जाल पहली बार पानी में डालने से पहले तुलसी/साल के पत्तों से पवित्र जल छिड़का जाता है।',
    visualIcon: '🕸️'
  }
];

const BOTANICAL_HERBS = [
  {
    nameSantali: 'Haku Ran (हकु रान)',
    botanicalName: 'Cleistanthus collinus / Casearia graveolens',
    hindiName: 'प्राकृतिक मत्स्य-मूर्छा वनौषधि',
    description: 'संताली वनवासी तेज विषैले रसायनों का कभी प्रयोग नहीं करते। वे जंगल से कुछ विशिष्ट पेड़ों की पत्तियों व छाल को सिलबट्टे पर पीसकर शांत जलधारा में घोलते हैं, जिससे मछलियां कुछ समय के लिए अचेत होकर पानी की सतह पर तैरने लगती हैं।',
    ecologicalEthics: 'यह प्रभाव केवल १-२ घंटे रहता है। जो मछलियां नहीं पकड़ी जातीं वे पानी साफ होते ही पुनः स्वस्थ होकर तैरने लगती हैं। जल का पारिस्थितिकी संतुलन नष्ट नहीं होता।'
  },
  {
    nameSantali: 'Ranu Sakam (रानू साकाम)',
    botanicalName: ' विभिन्न वन-लताओं का सम्मिश्रण',
    hindiName: 'मत्स्य-आकर्षण वानस्पतिक चारा',
    description: 'घास और जलीय पौधों को पीसकर उसमें महुआ के फूलों का रस और दीमकों की मिट्टी मिलाकर बनाया गया सुगन्धित चारा।',
    ecologicalEthics: 'यह मछलियों के लिए पोषक आहार भी है और उन्हें किसी प्रकार का रासायनिक नुकसान नहीं पहुंचाता।'
  }
];

export const SantaliTraditionalFishingCraft: React.FC = () => {
  const [selectedTrap, setSelectedTrap] = useState<FishTrapItem>(FISHING_TRAPS[0]);
  const [activeTab, setActiveTab] = useState<'traps' | 'botanical' | 'ethics'>('traps');
  const [isWaterFlowing, setIsWaterFlowing] = useState<boolean>(true);

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
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-cyan-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-teal-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-teal-500/30">
              <Fish className="w-4 h-4" />
              हाकू सांदरा • Traditional Santali Fishing Traps
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-teal-50">
              संताली पारम्परिक मत्स्य आखेट व जाली-शिल्प
            </h1>
            <p className="mt-2 text-teal-200/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              तोरोदान, घूनी, पिल्ही व झाली की वास्तुकला, बाँस की कारीगरी, हकु रान (मत्स्य-मूर्छा वनौषधि) और नदी-देव (गाड़ा बोंगा) के प्रति पारिस्थितिकीय कृतज्ञता।
            </p>
          </div>

          <div className="flex items-center gap-2 bg-teal-950/70 p-1.5 rounded-2xl border border-teal-700/50">
            <button
              onClick={() => setActiveTab('traps')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'traps'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'text-teal-300 hover:text-white'
              }`}
            >
              उपकरण शिल्प (Traps)
            </button>
            <button
              onClick={() => setActiveTab('botanical')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'botanical'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'text-teal-300 hover:text-white'
              }`}
            >
              हकु रान वनौषधि
            </button>
            <button
              onClick={() => setActiveTab('ethics')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'ethics'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'text-teal-300 hover:text-white'
              }`}
            >
              जल-संरक्षण नीति
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'traps' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Trap Selector List */}
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-teal-900 dark:text-teal-300 px-1 flex items-center gap-2">
              <Compass className="w-4 h-4 text-teal-600" />
              पारंपरिक उपकरण चयन करें:
            </h2>
            <div className="space-y-3">
              {FISHING_TRAPS.map((trap) => {
                const isSelected = selectedTrap.id === trap.id;
                return (
                  <button
                    key={trap.id}
                    onClick={() => setSelectedTrap(trap)}
                    className={`w-full text-left p-4 rounded-2xl transition-all border text-slate-800 dark:text-slate-100 ${
                      isSelected
                        ? 'bg-teal-50 dark:bg-teal-950/50 border-teal-600 shadow-md ring-2 ring-teal-500/20'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-teal-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl p-2 bg-teal-100 dark:bg-teal-900/60 rounded-xl">
                          {trap.visualIcon}
                        </span>
                        <div>
                          <div className="font-bold text-base flex items-center gap-2">
                            <span>{trap.nameDevanagari}</span>
                            <span className="text-xs text-teal-700 dark:text-teal-400 font-mono">({trap.nameSantali})</span>
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {trap.nameHindi}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(`${trap.nameDevanagari}, ${trap.nameHindi}`);
                        }}
                        className="p-2 rounded-xl text-teal-600 hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors"
                        title="उच्चारण सुनें"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Mechanics Box */}
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold mb-1 text-amber-800 dark:text-amber-300">
                <Info className="w-4 h-4" />
                बाँस चयन का संताली सिद्धांत:
              </div>
              मछली के जाल के लिए केवल २-३ वर्ष पुराने सीधे 'माद' (बांस) को काटा जाता है। इसे काटने के बाद बहते पानी में ३ सप्ताह भिगोया जाता है ताकि उसमें घुन न लगे और वह रेशम की तरह लचीला हो सके।
            </div>
          </div>

          {/* Trap Detail Card with Blueprint Simulation */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-xs font-bold mb-2">
                    {selectedTrap.category === 'flowing_water' && '🌊 बहती धारा अनुकूल (Flowing Stream)'}
                    {selectedTrap.category === 'still_pond' && '🌿 शांत पोखर व धान के खेत (Still Marsh)'}
                    {selectedTrap.category === 'carrier' && '🎒 सुरक्षित संचयन व वहन (Live Storage)'}
                    {selectedTrap.category === 'cast_net' && '✨ हस्त-निर्मित वृत्ताकार जाल (Cast Net)'}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {selectedTrap.nameDevanagari} ({selectedTrap.nameSantali})
                  </h3>
                  <p className="text-sm text-teal-600 dark:text-teal-400 font-medium mt-0.5">
                    {selectedTrap.nameHindi}
                  </p>
                </div>
                <button
                  onClick={() => speakText(`${selectedTrap.nameDevanagari}. ${selectedTrap.construction}. ${selectedTrap.mechanism}`)}
                  className="px-3.5 py-2 rounded-xl bg-teal-50 dark:bg-teal-900/40 hover:bg-teal-100 dark:hover:bg-teal-900/70 text-teal-700 dark:text-teal-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  विवरण सुनें
                </button>
              </div>

              {/* Interactive Visual Blueprint Simulation */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-teal-950 text-white relative overflow-hidden border border-teal-800/50 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs font-mono text-teal-300 uppercase tracking-widest flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    संरचना व प्रवाह सिम्युलेटर (Trap Hydrodynamics)
                  </div>
                  <button
                    onClick={() => setIsWaterFlowing(!isWaterFlowing)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-teal-800/60 hover:bg-teal-700 text-teal-200 border border-teal-600/40"
                  >
                    जलधारा: {isWaterFlowing ? 'बहती हुई (Flow ON)' : 'स्थिर (Pond)'}
                  </button>
                </div>

                <div className="h-44 rounded-xl bg-teal-950/80 border border-teal-800/40 flex items-center justify-center relative overflow-hidden p-4">
                  {/* Water current effect */}
                  {isWaterFlowing && (
                    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px] animate-pulse" />
                  )}
                  <div className="text-center z-10 space-y-2">
                    <div className="text-5xl animate-bounce">{selectedTrap.visualIcon}</div>
                    <div className="font-bold text-teal-200 text-sm">
                      {selectedTrap.nameDevanagari} ({selectedTrap.nameSantali}) की बाँस बुनावट
                    </div>
                    <div className="text-xs text-teal-400 font-mono">
                      सामग्री: {selectedTrap.bambooSpecies}
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">ऋतु व जल स्थिति</div>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">{selectedTrap.season}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">लक्षित जलीय जीव</div>
                  <div className="text-sm font-bold text-teal-700 dark:text-teal-300 mt-1">{selectedTrap.targetSpecies}</div>
                </div>
              </div>

              {/* Construction Details */}
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    बाँस निर्माण व बुनाई तकनीक:
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    {selectedTrap.construction}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                    मत्स्य अवरोध कार्यप्रणाली (Mechanical Principle):
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    {selectedTrap.mechanism}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    बोंगा अर्चना व लोक-विश्वास:
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-amber-50/50 dark:bg-amber-950/20 p-3 rounded-xl border border-amber-200/50 dark:border-amber-900/30">
                    {selectedTrap.sacredPractice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Botanical Fishing Lore */}
      {activeTab === 'botanical' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Droplets className="w-5 h-5 text-teal-600" />
              हकु रान (Haku Ran): वानस्पतिक मत्स्य-मूर्छा विद्या
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              संताली पूर्वजों द्वारा विकसित प्राकृतिक जैव-वानस्पतिक तकनीक जो रासायनिक विषों के बिना केवल अल्पकालिक मूर्छा लाती है।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BOTANICAL_HERBS.map((herb, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-teal-50/40 dark:bg-teal-950/30 border border-teal-200/60 dark:border-teal-800/40 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-teal-900 dark:text-teal-200">
                    {herb.nameSantali}
                  </h3>
                  <span className="text-xs font-mono text-teal-700 dark:text-teal-400 italic">
                    {herb.botanicalName}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {herb.hindiName}
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {herb.description}
                </p>
                <div className="p-3 rounded-xl bg-teal-100/60 dark:bg-teal-900/40 text-xs text-teal-950 dark:text-teal-200 border border-teal-200 dark:border-teal-800">
                  <strong className="block text-teal-800 dark:text-teal-300 mb-0.5">पारिस्थितिकी नीति:</strong>
                  {herb.ecologicalEthics}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Environmental Ethics */}
      {activeTab === 'ethics' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              संताली समाज के जलीय पारिस्थितिकी नियम
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              प्रकृति पर केवल उपभोग का अधिकार नहीं, बल्कि उसके पुनरुत्पादन की जिम्मेदारी भी संताली जीवन-दर्शन का आधार है।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-2xl">🚫</div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                अंडे देने के समय शिकार वर्जित
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                आषाढ़ के शुरुआती दिनों में जब मछलियां नदी के किनारों पर अंडे देती हैं, उस समय संताली गांवों में सामूहिक मत्स्य आखेट सख्त प्रतिबंधित रहता है।
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-2xl">⚖️</div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                हाटू रे साजाव (सामूहिक समता)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                जब पूरे गांव के लोग 'हाकू सांदरा' में भाग लेते हैं, तो पकड़ी गई सभी मछलियाँ मांझी थान पर एक जगह एकत्र की जाती हैं और प्रत्येक घर में समान भाग बांटा जाता है।
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-2xl">🌊</div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                गाड़ा बोंगा का आभार
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                नदियों को कभी दूषित नहीं किया जाता। जलधारा को पूरी तरह अवरुद्ध करना पाप माना जाता है, ताकि आगे के गांवों और जलीय जीवों का प्रवाह न रुके।
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
