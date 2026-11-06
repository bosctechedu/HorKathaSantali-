import React, { useState } from 'react';
import { Scale, Volume2, Info, Sparkles, ShieldCheck, HeartHandshake, CheckCircle2, AlertTriangle } from 'lucide-react';

interface OathType {
  id: string;
  nameSantali: string;
  nameHindi: string;
  sacredElement: string;
  significance: string;
  procedure: string;
  consequencesOfFalsehood: string;
  visualSymbol: string;
}

const OATH_TYPES: OathType[] = [
  {
    id: 'guri_ghas',
    nameSantali: 'Guri Ar Ghas Kria (गुरी आर घांस किरिया)',
    nameHindi: 'गोबर व दूर्वा घास स्पर्श शपथ',
    sacredElement: 'गोधन का गोबर व हरी दूर्वा घास (पृथ्वी व वंश का प्रतीक)',
    significance: 'संताली समाज में गाय और हरी घास जीवन और कुल-उर्वरता का आधार हैं। इस शपथ को लेने का अर्थ है अपनी पूरी भावी पीढ़ी और कुल-देवता को साक्षी रखना।',
    procedure: 'मांझी सभा के मध्य पीतल की थाली या साल के पत्ते पर ताजा गोबर और दूर्वा घास रखी जाती है। साक्षी दोनों हाथों से उसे स्पर्श करके सत्य का वचन देता है।',
    consequencesOfFalsehood: 'झूठी शपथ लेने पर विश्वास है कि व्यक्ति का वंश और पशुधन नष्ट हो जाता है और धरती माता उसकी खेती को बंजर कर देती हैं।',
    visualSymbol: '🌱'
  },
  {
    id: 'baha_dah',
    nameSantali: 'Baha Dah Kria (बाहा दाः किरिया)',
    nameHindi: 'साल पुष्प एवं पवित्र तीर्थ जल शपथ',
    sacredElement: 'साल (सरजोम) का ताजा फूल और जाहेर थान का पवित्र जल',
    significance: 'जाहेर एरा (मातृ-शक्ति) और मरांग बुरु के साक्षात दिव्य स्वरूप को साक्षी मानना।',
    procedure: 'नाएके (पुजारी) द्वारा जाहेर थान से लाया गया जल और बाहा (साल फूल) साक्षी की हथेली पर रखा जाता है। साक्षी उसे अपने सिर और कंठ से लगाकर सत्य बोलता है।',
    consequencesOfFalsehood: 'झूठ बोलने पर व्यक्ति का कंठ रुद्ध हो जाता है और बाहा पर्व में उसके परिवार का तर्पण स्वीकार नहीं होता।',
    visualSymbol: '💧'
  },
  {
    id: 'sar_kapi',
    nameSantali: 'Sar-Kapi Kria (सार-कापी किरिया)',
    nameHindi: 'तीर-धनुष व लोहे के फरसे की शपथ',
    sacredElement: 'शिकार का अभिमंत्रित तीर (सार) व युद्ध-फरसा (कापी)',
    significance: 'यह संताली समाज की सबसे कठोर और अंतिम शपथ है। लौह-धातु और अस्त्र बुरु बोंगा (पहाड़ के देव) के न्याय का प्रतीक हैं।',
    procedure: 'मांझी थान के पाषाण पर नंगा तीर और फरसा रखा जाता है। साक्षी नंगे पैर उस पर पैर रखकर या अंगूठा छुआकर प्रतिज्ञा करता है।',
    consequencesOfFalsehood: 'यदि उसने असत्य कहा तो जंगल में सेंदरा (शिकार) के दौरान या यात्रा में अस्त्र या हिंसक पशु द्वारा उसकी अकाल मृत्यु निश्चित मानी जाती है।',
    visualSymbol: '🏹'
  },
  {
    id: 'sim_bonga',
    nameSantali: 'Sim Bonga Sakhi (सिम बोंगा साक्षी)',
    nameHindi: 'सफेद कुक्कुट (मुर्गे) की बलि साक्षी',
    sacredElement: 'सफेद मुर्गा व सिंदूर अक्षत',
    significance: 'जब जटिल भूमि विवाद या चोरी का कोई प्रत्यक्ष गवाह न हो, तब बोंगा को सीधा न्यायाधीश बनाया जाता है।',
    procedure: 'सफेद मुर्गे को अरवा चावल चुगाया जाता है। यदि मुर्गा निर्भीक होकर साक्षी के हाथ से दाना खा ले तो वह सच्चा माना जाता है।',
    consequencesOfFalsehood: 'यदि मुर्गा दाना खाने से मना कर दे या छटपटाए, तो साक्षी का झूठ उसी क्षण ग्राम-सभा के समक्ष उजागर हो जाता है।',
    visualSymbol: '🐓'
  }
];

const JOM_JATI_STEPS = [
  {
    step: 1,
    title: 'अपराध स्वीकार व पश्चाताप (Dosh Manaw)',
    description: 'दोषी व्यक्ति मांझी बाबा और ग्राम-सभा के समक्ष साष्टांग प्रणाम (डोबोक) कर अपनी भूल स्वीकार करता है और क्षमा याचना करता है।'
  },
  {
    step: 2,
    title: 'मांझी सभा का दंड निर्धारण (Danda)',
    description: 'ग्राम-सभा उसकी आर्थिक स्थिति देखकर सांकेतिक जुर्माना (पंचेन) निर्धारित करती है, जिसका उपयोग गांव के सामूहिक कल्याण व भोज में होता है।'
  },
  {
    step: 3,
    title: 'पवित्र स्नान व शुद्धि (Um Narka)',
    description: 'व्यक्ति नदी या डाड़ी कुआं में स्नान कर नए कोरे वस्त्र पहनता है। नाएके बाबा उस पर साल पत्तों से पवित्र जल छिड़ककर उसे निर्मल करते हैं।'
  },
  {
    step: 4,
    title: 'जोम जाति महा-भोज (Community Feast)',
    description: 'सबसे महत्वपूर्ण मानवीय चरण: पूरे गांव के लोग दोषी के साथ एक ही पंगत में बैठकर साल के पत्तों (साकाम) पर भोजन करते हैं। इसके बाद किसी को भी उस पुराने अपराध का उलाहना देने की अनुमति नहीं होती।'
  }
];

export const SantaliCustomaryOathsJustice: React.FC = () => {
  const [selectedOath, setSelectedOath] = useState<OathType>(OATH_TYPES[0]);
  const [activeTab, setActiveTab] = useState<'oaths' | 'jom_jati' | 'jurisprudence'>('oaths');

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
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-neutral-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-amber-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-amber-500/30">
              <Scale className="w-4 h-4" />
              किरिया आर जोम जाति • Customary Oaths & Restorative Justice
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-amber-50">
              संताली पावन शपथ, साक्षी व शुद्धिकरण विधान
            </h1>
            <p className="mt-2 text-amber-200/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              गुरी-घांस, बाहा दाः, सार-कापी की अकाट्य किरिया (शपथ), मांझी थान की न्याय-प्रक्रिया और जोम जाति (सामुदायिक पुनर्प्रवेश भोज) का मानवीय संस्कार।
            </p>
          </div>

          <div className="flex items-center gap-2 bg-stone-950/70 p-1.5 rounded-2xl border border-amber-700/50">
            <button
              onClick={() => setActiveTab('oaths')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'oaths'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-amber-300 hover:text-white'
              }`}
            >
              पवित्र शपथ (किरिया)
            </button>
            <button
              onClick={() => setActiveTab('jom_jati')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'jom_jati'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-amber-300 hover:text-white'
              }`}
            >
              जोम जाति (पुनर्प्रवेश)
            </button>
            <button
              onClick={() => setActiveTab('jurisprudence')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'jurisprudence'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-amber-300 hover:text-white'
              }`}
            >
              न्याय दर्शन
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab: Oaths */}
      {activeTab === 'oaths' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Oath Selection List */}
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 px-1 flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-600" />
              ४ प्रमुख पारंपरिक किरिया (शपथ):
            </h2>

            <div className="space-y-3">
              {OATH_TYPES.map((oath) => {
                const isSelected = selectedOath.id === oath.id;
                return (
                  <div
                    key={oath.id}
                    onClick={() => setSelectedOath(oath)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-600 shadow-md ring-2 ring-amber-500/20'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl p-2 bg-amber-100 dark:bg-amber-900/60 rounded-xl">
                          {oath.visualSymbol}
                        </span>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white text-base">
                            {oath.nameSantali}
                          </div>
                          <div className="text-xs text-amber-700 dark:text-amber-400 font-semibold font-mono">
                            {oath.nameHindi}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(`${oath.nameSantali}. ${oath.nameHindi}. ${oath.significance}`);
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

            {/* Sacred truth warning */}
            <div className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                मौखिक सत्य की सर्वोच्च महत्ता:
              </div>
              संताली समाज में कागजी शपथ-पत्र (Affidavit) की आवश्यकता नहीं होती। मांझी सभा में इन पवित्र प्रतीकों को छूकर बोला गया शब्द न्यायालय के किसी भी लिखित बयान से अधिक पवित्र और अटल माना जाता है।
            </div>
          </div>

          {/* Oath Deep-dive */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold mb-2">
                    पवित्र द्रव्य: {selectedOath.sacredElement}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {selectedOath.visualSymbol} {selectedOath.nameSantali}
                  </h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
                    {selectedOath.nameHindi}
                  </p>
                </div>
                <button
                  onClick={() => speakText(`${selectedOath.nameSantali}. प्रक्रिया: ${selectedOath.procedure}. परिणाम: ${selectedOath.consequencesOfFalsehood}`)}
                  className="px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-900/40 hover:bg-amber-100 text-amber-700 dark:text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  ऑडियो सुनें
                </button>
              </div>

              {/* Data Fields */}
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                    धार्मिक व सांस्कृतिक पृष्ठभूमि (Spiritual Significance):
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/30 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                    {selectedOath.significance}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    सभा में शपथ लेने की पूर्ण विधि (Ceremonial Procedure):
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/30 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                    {selectedOath.procedure}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    असत्य वाचन पर लोक-विश्वास व बोंगा दंड:
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-rose-50/50 dark:bg-rose-950/20 p-3.5 rounded-2xl border border-rose-200/60 dark:border-rose-900/30">
                    {selectedOath.consequencesOfFalsehood}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab: Jom Jati (Restorative Justice) */}
      {activeTab === 'jom_jati' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-amber-600" />
              जोम जाति (Jom Jati): आदिम पुनर्स्थापन न्याय का स्वर्णिम नियम
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              संताली न्याय दंड देने के लिए नहीं, बल्कि व्यक्ति का सुधार करके उसे पुनः समाज की मुख्यधारा में सम्मानपूर्वक जोड़ने (Restorative Reintegration) के लिए बना है।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {JOM_JATI_STEPS.map((stepItem) => (
              <div
                key={stepItem.step}
                className="p-5 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center">
                    {stepItem.step}
                  </span>
                  <h3 className="font-bold text-amber-950 dark:text-amber-200 text-base">
                    {stepItem.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {stepItem.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Tab: Jurisprudence */}
      {activeTab === 'jurisprudence' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              संताली रूढ़िवादी विधि-संहिता के ३ बुनियादी स्तंभ
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              बिना किसी जेल, हथकड़ी या पुलिस के हजारों वर्षों तक शांतिपूर्ण सामाजिक संतुलन बनाए रखने वाले संताली सिद्धांत।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-2xl">🤝</div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                सर्वसम्मति (Abo Ren Katha)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                फैसला बहुमत से नहीं, बल्कि तब तक विचार-विमर्श करके लिया जाता है जब तक कि दोनों पक्ष और गांव के बुजुर्ग संतुष्ट न हो जाएं।
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-2xl">🌳</div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                मांझी थान: खुली अदालत
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                कोई भी सुनवाई बंद कमरों में नहीं होती। गांव के मध्य स्थित खुले मांझी थान पर हर ग्रामीण को उपस्थित रहने और बोलने का हक होता है।
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-2xl">🕊️</div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                स्थायी बैर का अंत
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                फैसले के बाद दोनों पक्ष एक-दूसरे को 'डोबोक जोहार' करते हैं और हंडिया का साझा तर्पण करते हैं ताकि पीढ़ियों तक चलने वाला द्वेष समाप्त हो।
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
