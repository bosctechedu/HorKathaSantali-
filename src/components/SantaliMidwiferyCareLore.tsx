import React, { useState } from 'react';
import { Baby, Volume2, Info, Compass, ShieldCheck, HeartPulse, Sparkles, CheckCircle2 } from 'lucide-react';

interface MidwiferyStage {
  id: string;
  stageSantali: string;
  stageHindi: string;
  carePractice: string;
  herbalRemedy: string;
  sacredRitual: string;
  visualEmoji: string;
}

const MIDWIFERY_STAGES: MidwiferyStage[] = [
  {
    id: 'prenatal',
    stageSantali: 'Gidra Menaye Re (गर्भ-धारण परिचर्या)',
    stageHindi: 'गर्भावस्था व दाया बुढ़ी की प्राकृतिक निगरानी',
    carePractice: 'दाया बुढ़ी (पारंपरिक दाई) केवल नाड़ी स्पर्श और हथेलियों से उदर का हल्का स्पर्श करके गर्भस्थ शिशु की स्थिति (सीधा/उल्टा) और प्रसव की सटीक तिथि का अनुमान लगाती हैं।',
    herbalRemedy: 'महुआ के ताजे रस का काढ़ा, मुंगा (सहजन) की पत्तियों का सूप और लोह-तत्व युक्त करहानी धान का मांड़।',
    sacredRitual: 'गर्भवती महिला को नदी पार करने या अंधेरे में सघन वन में जाने से रोका जाता है ताकि नकारात्मक बोंगा प्रभाव से रक्षा हो सके।',
    visualEmoji: '🤰'
  },
  {
    id: 'labor',
    stageSantali: 'Gidra Janam Somoy (सुगम प्रसव विद्या)',
    stageHindi: 'प्राकृतिक प्रसव व पारंपरिक सहयोग',
    carePractice: 'प्रसव पीड़ा के समय महिला को पीठ पर गुनगुने महुआ तेल की मालिश दी जाती है और कमरे को गर्म व शांत रखा जाता है। गुरुत्वाकर्षण का लाभ लेने के लिए पारंपरिक उकड़ू (Squatting) मुद्रा कराई जाती है।',
    herbalRemedy: 'सौंठ (अदरक), पिपली और गुड़ का गुनगुना काढ़ा जो गर्भाशय के संकुचन को प्राकृतिक रूप से बढ़ाता है।',
    sacredRitual: 'गर्भ-नाल (बूकली) को कभी भी लोहे के औजार से नहीं काटा जाता; केवल नए ताजे बांस की तेज धारदार खपच्ची (कामी) से काटा जाता है और हल्दी-राख का लेप लगाया जाता है।',
    visualEmoji: '👶'
  },
  {
    id: 'postnatal',
    stageSantali: 'Narka Ar Um (प्रसूता शुद्धि व शिशु अभ्यंग)',
    stageHindi: 'प्रसूति-उपरांत मातृत्व स्वास्थ्य व शिशु मालिश',
    carePractice: 'शिशु को जन्म के तुरंत बाद हल्के गुनगुने पानी से स्नान कराकर धूप में सूखे साल के पत्तों की सिकाई दी जाती है। महुआ और नीम के तेल से नित्य शिशु के अंगों की सुडौल मालिश होती है।',
    herbalRemedy: `प्रसूता को ५ दिनों तक अजवाइन, सोंठ, मेथी और देशी घी में भुना हुआ गर्म हलवा और दूध बढ़ाने हेतु 'दुधी लता' का काढ़ा दिया जाता है।`,
    sacredRitual: 'घर के आंगन में नीम की पत्तियों का धुआं किया जाता है ताकि किसी भी प्रकार के सूक्ष्म कीटाणु प्रवेश न कर सकें।',
    visualEmoji: '🍼'
  },
  {
    id: 'chhatiyar',
    stageSantali: 'Janam Chhatiyar (जनम छठियार संस्कार)',
    stageHindi: 'कुल-शुद्धि, मुंडन व वंशानुगत नामकरण',
    carePractice: `जन्म के ५वें दिन (बालक) या ३रे दिन (बालिका) पूरा परिवार 'छठियार' पर्व मनाता है। दाया बुढ़ी का पाद-प्रक्षालन कर उसे नए वस्त्र और उपहार देकर सम्मानित किया जाता है।`,
    herbalRemedy: 'हल्दी, दूर्वा घास और महुआ तेल का पवित्र जल पूरे घर और परिवार पर छिड़ककर सूतक समाप्त किया जाता है।',
    sacredRitual: 'हपड़ाम नामकरण नियम: प्रथम पुत्र का नाम दादा पर, प्रथम पुत्री का नाम दादी पर, द्वितीय पुत्र का नाम नाना पर और द्वितीय पुत्री का नाम नानी पर रखा जाता है।',
    visualEmoji: '✨'
  }
];

export const SantaliMidwiferyCareLore: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<MidwiferyStage>(MIDWIFERY_STAGES[0]);
  const [activeTab, setActiveTab] = useState<'stages' | 'herbs' | 'naming_rules'>('stages');

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
      <div className="bg-gradient-to-r from-rose-950 via-pink-950 to-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-rose-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-rose-500/30">
              <Baby className="w-4 h-4" />
              दाया बुढ़ी आर जनम छठियार • Indigenous Midwifery & Neonatal Lore
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-rose-50">
              दाया बुढ़ी व संताली प्रसूति-शिशु रक्षा विज्ञान
            </h1>
            <p className="mt-2 text-rose-200/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              पारंपरिक वनवासी दाई (दाया बुढ़ी) की नाड़ी-स्पर्श विद्या, महुआ तेल अभ्यंग, बांस की चोई से सुरक्षित नाल-छेदन और जनम छठियार का पवित्र नामकरण विधान।
            </p>
          </div>

          <div className="flex items-center gap-2 bg-stone-950/80 p-1.5 rounded-2xl border border-rose-700/50">
            <button
              onClick={() => setActiveTab('stages')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'stages'
                  ? 'bg-rose-700 text-white shadow-md'
                  : 'text-rose-300 hover:text-white'
              }`}
            >
              ४ प्रसूति चरण
            </button>
            <button
              onClick={() => setActiveTab('herbs')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'herbs'
                  ? 'bg-rose-700 text-white shadow-md'
                  : 'text-rose-300 hover:text-white'
              }`}
            >
              मातृ पोषण वनौषधि
            </button>
            <button
              onClick={() => setActiveTab('naming_rules')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'naming_rules'
                  ? 'bg-rose-700 text-white shadow-md'
                  : 'text-rose-300 hover:text-white'
              }`}
            >
              हपड़ाम नामकरण नियम
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab: Stages */}
      {activeTab === 'stages' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-rose-950 dark:text-rose-300 px-1 flex items-center gap-2">
              <Compass className="w-4 h-4 text-rose-600" />
              मातृत्व व शिशु परिचर्या के चरण:
            </h2>

            <div className="space-y-3">
              {MIDWIFERY_STAGES.map((stage) => {
                const isSelected = selectedStage.id === stage.id;
                return (
                  <div
                    key={stage.id}
                    onClick={() => setSelectedStage(stage)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-600 shadow-md ring-2 ring-rose-500/20'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-rose-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl p-2 bg-rose-100 dark:bg-rose-900/60 rounded-xl">
                          {stage.visualEmoji}
                        </span>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white text-base">
                            {stage.stageSantali}
                          </div>
                          <div className="text-xs text-rose-700 dark:text-rose-400 font-semibold">
                            {stage.stageHindi}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(`${stage.stageSantali}. ${stage.stageHindi}. ${stage.carePractice}`);
                        }}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/50"
                        title="विवरण सुनें"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Respect to Midwife Box */}
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-xs text-rose-950 dark:text-rose-200 leading-relaxed">
              <div className="font-bold text-rose-900 dark:text-rose-300 flex items-center gap-1.5 mb-1">
                <Info className="w-4 h-4" />
                दाया बुढ़ी का सामाजिक सम्मान:
              </div>
              संताली समाज में 'दाया बुढ़ी' को साक्षात जीवन-दात्री देवी तुल्य माना जाता है। छठियार के दिन सबसे पहला पैर धोकर प्रणाम दाया बुढ़ी का ही किया जाता है और उसे विशेष उपहार समर्पित होते हैं।
            </div>
          </div>

          {/* Stage Detail */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {selectedStage.visualEmoji} {selectedStage.stageSantali}
                  </h3>
                  <p className="text-sm text-rose-700 dark:text-rose-400 font-medium">
                    {selectedStage.stageHindi}
                  </p>
                </div>
                <button
                  onClick={() => speakText(`${selectedStage.stageSantali}. परिचर्या: ${selectedStage.carePractice}. वनौषधि: ${selectedStage.herbalRemedy}`)}
                  className="px-3.5 py-2 rounded-xl bg-rose-50 dark:bg-rose-900/40 hover:bg-rose-100 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  ऑडियो सुनें
                </button>
              </div>

              {/* Data Specifications */}
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                    पारंपरिक अनुभव-परिचर्या (Traditional Nursing Method):
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/30 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                    {selectedStage.carePractice}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    वनौषधीय आहार व काढ़ा (Herbal Nutrition):
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/30 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                    {selectedStage.herbalRemedy}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    सांस्कृतिक संस्कार व वर्जनाएं:
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-amber-50/50 dark:bg-amber-950/20 p-3.5 rounded-2xl border border-amber-200/50 dark:border-amber-900/30">
                    {selectedStage.sacredRitual}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab: Herbs */}
      {activeTab === 'herbs' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-rose-600" />
              मातृत्व व नवजात शिशु के लिए प्राकृतिक वनौषधियां
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              संताली वनों से प्राप्त निरापद जड़ी-बूटियां जो माता और शिशु को प्राकृतिक प्रतिरोधक क्षमता देती हैं।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40 space-y-2">
              <h3 className="font-bold text-rose-950 dark:text-rose-200 text-sm">
                मातकोम सुनुम (महुआ तेल मालिश)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                महुआ के बीज (कोचड़ा) से घर में निकाला गया शुद्ध तेल। यह शिशु की नाजुक त्वचा को रूखेपन और संक्रमण से बचाता है और हड्डियों को इस्पात जैसा सुदृढ़ बनाता है।
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40 space-y-2">
              <h3 className="font-bold text-rose-950 dark:text-rose-200 text-sm">
                दुधी लता व सतवार का काढ़ा
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                जंगल की 'दुधी लता' और सतावर की जड़ों को उबालकर प्रसूता माता को दिया जाता है, जिससे प्राकृतिक दुग्ध-वृद्धि होती है और कमजोरी दूर होती है।
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40 space-y-2">
              <h3 className="font-bold text-rose-950 dark:text-rose-200 text-sm">
                सरजोम लहा (साल का शुद्ध गोंद)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                साल के पेड़ का प्राकृतिक सफेद गोंद जिसे भूनकर गर्म दूध या मांड़ में मिलाकर प्रसूता को दिया जाता है ताकि आंतरिक घाव और सूजन शीघ्र ठीक हो सके।
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab: Naming Rules */}
      {activeTab === 'naming_rules' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-rose-600" />
              हपड़ाम नामकरण नियम: पूर्वजों की अमर परंपरा
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              संताली समाज में नाम किसी कल्पना से नहीं, बल्कि पूर्वजों के सम्मान में एक व्यवस्थित गणितीय क्रम से दिया जाता है।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-600" />
                पुत्रों का नामकरण क्रम:
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pl-4 list-disc">
                <li><strong>पहला बेटा (First Son):</strong> अपने दादा (Paternal Grandfather) के नाम पर।</li>
                <li><strong>दूसरा बेटा (Second Son):</strong> अपने नाना (Maternal Grandfather) के नाम पर।</li>
                <li><strong>तीसरा बेटा (Third Son):</strong> पिता के बड़े भाई (बड़ा बाबू) के नाम पर।</li>
                <li><strong>चौथा बेटा (Fourth Son):</strong> पिता के छोटे भाई (काका) के नाम पर।</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-600" />
                पुत्रियों का नामकरण क्रम:
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pl-4 list-disc">
                <li><strong>पहली बेटी (First Daughter):</strong> अपनी दादी (Paternal Grandmother) के नाम पर।</li>
                <li><strong>दूसरी बेटी (Second Daughter):</strong> अपनी नानी (Maternal Grandmother) के नाम पर।</li>
                <li><strong>तीसरी बेटी (Third Daughter):</strong> पिता की बड़ी बहन (बड़ी बुआ) के नाम पर।</li>
                <li><strong>चौथी बेटी (Fourth Daughter):</strong> मौसी (Maternal Aunt) के नाम पर।</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
