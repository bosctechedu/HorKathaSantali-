import React, { useState } from 'react';
import { Trees, Volume2, Info, Sparkles, ShieldCheck, Leaf, Compass } from 'lucide-react';

interface SacredTree {
  id: string;
  nameSantali: string;
  botanicalName: string;
  nameHindi: string;
  bongaDeity: string;
  ecologicalRole: string;
  culturalTaboo: string;
  festivalLink: string;
  visualEmoji: string;
}

const SACRED_TREES: SacredTree[] = [
  {
    id: 'sarjom',
    nameSantali: 'Sarjom Dare (सरजोम दारे)',
    botanicalName: 'Shorea robusta (Sal)',
    nameHindi: 'साल / सखुआ वृक्ष',
    bongaDeity: 'जाहेर एरा (Jaher Era) व मरांग बुरु (Marang Buru)',
    ecologicalRole: 'गहरे भूजल का संचयन, उच्च वायु शुद्धता और वन वितान (Canopy) का प्रमुख संरक्षक। इसकी पत्तियां उत्तम प्राकृतिक खाद बनाती हैं।',
    culturalTaboo: 'जाहेर थान के साल के किसी भी पेड़ को काटना या उसकी टहनी तोड़ना महापाप है। केवल बाहा पर्व पर नाएके (पुजारी) द्वारा फूल चुने जाते हैं।',
    festivalLink: 'बाहा पर्व (Baha Parab) - जब साल के सफेद सुगन्धित फूल खिलते हैं तब नववर्ष का स्वागत होता है।',
    visualEmoji: '🌳'
  },
  {
    id: 'matkom',
    nameSantali: 'Matkom Dare (मातकोम दारे)',
    botanicalName: 'Madhuca longifolia (Mahua)',
    nameHindi: 'महुआ वृक्ष',
    bongaDeity: 'मोड़ेको-तुरुईको (Moreko-Turuiko)',
    ecologicalRole: 'सूखे के समय भी प्रचुर रसदार फूल व पोषक फल (कोचड़ा) देकर वन्य जीवों व पक्षियों का पोषण करना।',
    culturalTaboo: 'महुआ के फूल कभी पेड़ पर चढ़कर नहीं तोड़े जाते; केवल प्रातःकाल धरती पर स्वतः गिरे हुए फूलों को संकोच व आदर से बीना जाता है।',
    festivalLink: 'मातकोम सांदरा व ग्रीष्मकालीन पेय एवं औषधि निर्माण।',
    visualEmoji: '🌼'
  },
  {
    id: 'hesah_bare',
    nameSantali: 'Hesah & Bare (हेसाः आर बाड़े)',
    botanicalName: 'Ficus religiosa & Ficus benghalensis',
    nameHindi: 'पीपल व बरगद की पवित्र युगल जोड़ी',
    bongaDeity: 'हापड़ाम को (पूर्वज आत्माएं / Pitri Bonga)',
    ecologicalRole: '२४ घंटे ऑक्सीजन प्रवाह, सैकड़ों प्रजातियों के पक्षियों और चमगादड़ों का प्राकृतिक आश्रय स्थल।',
    culturalTaboo: 'इन्हें कभी भी काष्ठ ईंधन या फर्नीचर के लिए नहीं काटा जाता। यह ग्राम-सीमा के स्थायी रक्षक माने जाते हैं।',
    festivalLink: 'करम व सोहराय के दौरान ग्राम परिक्रमा और गोधन विश्राम।',
    visualEmoji: '🌲'
  },
  {
    id: 'karam',
    nameSantali: 'Karam Dare (करम दारे)',
    botanicalName: 'Haldina cordifolia (Adina)',
    nameHindi: 'करम / कद्दू वृक्ष',
    bongaDeity: 'करम बोंगा (Karam Gosane)',
    ecologicalRole: 'नदी तटों और नालों की मिट्टी के कटाव को अपनी मजबूत जड़ों से बांधकर रोकना।',
    culturalTaboo: 'गांव के अखड़ा में गाड़ने के लिए केवल कुंवारे युवकों द्वारा विधिवत स्तुति के बाद ही दो डालियां लाई जाती हैं।',
    festivalLink: 'करम पर्व (Karam Parab) - कर्म, बंधुत्व और धान की हरी फसलों की रक्षा का उत्सव।',
    visualEmoji: '🌿'
  },
  {
    id: 'murup',
    nameSantali: 'Murup Dare (मुरुप दारे)',
    botanicalName: 'Butea monosperma (Palash)',
    nameHindi: 'पलाश / ढाक',
    bongaDeity: 'बुरु बोंगा (पहाड़ के देव)',
    ecologicalRole: 'बंजर मिट्टी में भी नाइट्रोजन स्थिरीकरण कर भूमि को उपजाऊ बनाना।',
    culturalTaboo: 'पलाश के फूलों से प्राकृतिक रंग और गोंद प्राप्त किया जाता है।',
    festivalLink: 'फागुन बोंगा (होली/वसंत उत्सव) के पावन रंग।',
    visualEmoji: '🌺'
  }
];

const GROVE_SANCTUMS = [
  {
    title: 'जाहेर एरा थान (Jaher Era Than)',
    location: 'जाहेर थान के केंद्र में स्थित प्रमुख साल वृक्षों का समूह',
    significance: 'समस्त संताली समाज की मातृ-शक्ति और अन्न-दात्री देवी का आसन।'
  },
  {
    title: 'मरांग बुरु थान (Marang Buru Than)',
    location: 'पश्चिमी दिशा में स्थित विशाल साल वृक्ष की जड़',
    significance: 'सर्वोच्च सर्वोच्च सृष्टिकर्ता और संताली अस्मिता के आदि-पिता का पावन स्थल।'
  },
  {
    title: 'मोड़ेको-तुरुईको थान (Moreko-Turuiko Than)',
    location: 'पूर्वी छोर पर स्थित पांच-छह वृक्षों की छत्रछाया',
    significance: 'न्याय, प्राकृतिक आपदाओं से रक्षा और ग्राम्य समृद्धि के रक्षक देव।'
  },
  {
    title: 'गोसाएं एरा थान (Gosae Era Than)',
    location: 'पवित्र उपवन के शांत उत्तरी कोने में',
    significance: 'रोग-मुक्ति, महामारियों से ग्राम की रक्षा और औषधीय शक्ति की देवी।'
  }
];

export const SantaliJaherGroveEcology: React.FC = () => {
  const [selectedTree, setSelectedTree] = useState<SacredTree>(SACRED_TREES[0]);
  const [activeTab, setActiveTab] = useState<'trees' | 'grove_map' | 'conservation'>('trees');

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
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-stone-50 rounded-3xl p-6 sm:p-8 text-slate-900 shadow-xl border border-emerald-200/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-500/30">
              <Trees className="w-4 h-4" />
              जाहेर थान • Sacred Grove Indigenous Ecology
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-emerald-900">
              पवित्र जाहेर थान वन पारिस्थितिकी व वृक्ष विद्या
            </h1>
            <p className="mt-2 text-emerald-800/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              सरजोम (साल), मातकोम (महुआ), हेसाः-बाड़े (पीपल-बरगद) का जैव-विविधता तंत्र, संताली पारम्परिक वन-संरक्षण संहिता और पवित्र थान का आध्यात्मिक भूगोल।
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50/70 p-1.5 rounded-2xl border border-emerald-200/50">
            <button
              onClick={() => setActiveTab('trees')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'trees'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-emerald-700 hover:text-slate-900'
              }`}
            >
              पवित्र वृक्ष विद्या
            </button>
            <button
              onClick={() => setActiveTab('grove_map')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'grove_map'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-emerald-700 hover:text-slate-900'
              }`}
            >
              उपवन मानचित्रावली
            </button>
            <button
              onClick={() => setActiveTab('conservation')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'conservation'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-emerald-700 hover:text-slate-900'
              }`}
            >
              संरक्षण आचार-संहिता
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {activeTab === 'trees' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Tree selector */}
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-700 px-1 flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-600" />
              जाहेर थान के पवित्र वृक्ष:
            </h2>

            <div className="space-y-3">
              {SACRED_TREES.map((tree) => {
                const isSelected = selectedTree.id === tree.id;
                return (
                  <div
                    key={tree.id}
                    onClick={() => setSelectedTree(tree)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-emerald-50/80 dark:bg-emerald-50/40 border-emerald-300 shadow-md ring-2 ring-emerald-500/20'
                        : 'bg-white dark:bg-slate-50 border-slate-200 dark:border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl p-2 bg-emerald-100 dark:bg-emerald-50/60 rounded-xl">
                          {tree.visualEmoji}
                        </span>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-slate-900 text-base">
                            {tree.nameSantali}
                          </div>
                          <div className="text-xs text-emerald-700 dark:text-emerald-600 font-semibold font-mono">
                            {tree.nameHindi}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-600 italic">
                            {tree.botanicalName}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(`${tree.nameSantali}. ${tree.nameHindi}. ${tree.ecologicalRole}`);
                        }}
                        className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-50/50"
                        title="विवरण सुनें"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sacred Soil Note */}
            <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-50/30 border border-teal-200 dark:border-teal-200/40 text-xs text-teal-900 dark:text-teal-800 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold mb-1 text-teal-800 dark:text-teal-700">
                <Info className="w-4 h-4" />
                सदाबहार मृदा व जलभृत (Groundwater Recharge):
              </div>
              जाहेर थान के भीतर सदियों से गिरी हुई पत्तियों को कभी जलाया या हटाया नहीं जाता। यह पत्तियां सड़कर ३-४ फीट मोटी स्पंज जैसी ह्यूमस बनाती हैं, जो वर्षा जल को सोखकर पूरे गांव के कुओं और झरनों को साल भर लबालब रखती हैं।
            </div>
          </div>

          {/* Tree Detail */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white dark:bg-slate-50 rounded-3xl p-6 border border-slate-200 dark:border-slate-200 shadow-sm space-y-5">
              <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-200 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-50 text-emerald-800 dark:text-emerald-700 text-xs font-bold mb-2">
                    वनस्पति कुल: {selectedTree.botanicalName}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-900 flex items-center gap-2">
                    {selectedTree.visualEmoji} {selectedTree.nameSantali}
                  </h3>
                  <p className="text-sm text-emerald-700 dark:text-emerald-600 font-medium">
                    {selectedTree.nameHindi}
                  </p>
                </div>
                <button
                  onClick={() => speakText(`${selectedTree.nameSantali}. ${selectedTree.nameHindi}. निवास बोंगा: ${selectedTree.bongaDeity}. ${selectedTree.ecologicalRole}`)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-50/40 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  ऑडियो सुनें
                </button>
              </div>

              {/* Deity & Festival Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-50/30 border border-emerald-200/60 dark:border-emerald-200/40">
                  <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-700 uppercase tracking-wider block">
                    आसनस्थ बोंगा (Deity Presence)
                  </span>
                  <span className="font-bold text-slate-900 dark:text-slate-900 text-base mt-1 block">
                    {selectedTree.bongaDeity}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-50/30 border border-emerald-200/60 dark:border-emerald-200/40">
                  <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-700 uppercase tracking-wider block">
                    संबद्ध लोक-पर्व (Festival Lore)
                  </span>
                  <span className="font-bold text-slate-900 dark:text-slate-900 text-base mt-1 block">
                    {selectedTree.festivalLink}
                  </span>
                </div>
              </div>

              {/* Ecological Role & Taboo */}
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-800 flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    पारिस्थितिकीय भूमिका (Ecological Function):
                  </h4>
                  <p className="text-slate-600 dark:text-slate-700 leading-relaxed bg-slate-50 dark:bg-slate-100/30 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-200">
                    {selectedTree.ecologicalRole}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-800 flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    पारंपरिक सांस्कृतिक निषेध व आचार (Conservation Taboo):
                  </h4>
                  <p className="text-slate-600 dark:text-slate-700 leading-relaxed bg-amber-50/50 dark:bg-amber-50/20 p-3.5 rounded-2xl border border-amber-200/60 dark:border-amber-200/30">
                    {selectedTree.culturalTaboo}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Grove Map & Spatial Sanctums */}
      {activeTab === 'grove_map' && (
        <div className="bg-white dark:bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-200 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-600" />
              जाहेर थान का पावन विन्यास (Sacred Grove Spatial Layout)
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-600 mt-1">
              प्रत्येक पारंपरिक संताली गांव की उत्तर-पश्चिम सीमा पर स्थित पवित्र उपवन का त्रि-आयामी आध्यात्मिक विभाजन।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {GROVE_SANCTUMS.map((sanctum, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-emerald-50/40 dark:bg-emerald-50/20 border border-emerald-200/60 dark:border-emerald-200/40 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <h3 className="font-bold text-emerald-950 dark:text-emerald-800 text-base">
                    {sanctum.title}
                  </h3>
                </div>
                <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-600">
                  स्थान: {sanctum.location}
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-700 leading-relaxed">
                  {sanctum.significance}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Conservation Code */}
      {activeTab === 'conservation' && (
        <div className="bg-white dark:bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-200 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              संताली आदिम जैव-संरक्षण विधि (Indigenous Conservation Biology)
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-600 mt-1">
              आधुनिक राष्ट्रीय उद्यानों और बायोस्फीयर रिजर्व की अवधारणा से सदियों पूर्व संताली समाज ने स्व-नियंत्रित प्रकृति संरक्षण स्थापित किया था।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-100/50 border border-slate-200 dark:border-slate-200 space-y-2">
              <div className="text-2xl">🪵</div>
              <h3 className="font-bold text-slate-900 dark:text-slate-900 text-sm">
                शून्य-दोहन नियम (Absolute Sanctuary)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-600 leading-relaxed">
                जाहेर थान से कोई भी व्यक्ति सूखी लकड़ी, पत्ते, फल या कंद-मूल घर नहीं ला सकता। जो प्रकृति का है, वह प्रकृति में ही विघटित होकर नई वनस्पति का बीज बनता है।
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-100/50 border border-slate-200 dark:border-slate-200 space-y-2">
              <div className="text-2xl">🦊</div>
              <h3 className="font-bold text-slate-900 dark:text-slate-900 text-sm">
                कुदाम नाएके व वन्य जीव सुरक्षा
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-600 leading-relaxed">
                ग्राम-पुजारी का सहयोगी (कुदाम नाएके) जाहेर थान की बाहरी सीमा पर वन-पशुओं और कीट-पतंगों के लिए विशेष अर्पण करता है ताकि मानव व वन्यजीवों के बीच संघर्ष न हो।
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-100/50 border border-slate-200 dark:border-slate-200 space-y-2">
              <div className="text-2xl">🌱</div>
              <h3 className="font-bold text-slate-900 dark:text-slate-900 text-sm">
                जीन बैंक व बीज आश्रय
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-600 leading-relaxed">
                जब आस-पास के वनों में वृक्ष कटते हैं, तब जाहेर थान एक प्राकृतिक बीज बैंक (Gene Bank) का कार्य करता है, जहां से चिड़ियां बीज फैलाकर वनों को पुनर्जीवित करती हैं।
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
