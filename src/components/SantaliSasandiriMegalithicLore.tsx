import React, { useState } from 'react';
import { Landmark, Volume2, Info, Compass, ShieldCheck, Sparkles, Layers } from 'lucide-react';

interface MegalithType {
  id: string;
  nameSantali: string;
  nameHindi: string;
  architecturalForm: string;
  ritualPurpose: string;
  engineeringMethod: string;
  clanSignificance: string;
  visualEmoji: string;
}

const MEGALITHS: MegalithType[] = [
  {
    id: 'diri_bid',
    nameSantali: 'Diri Bid (दिरी बिद / खोंटा दिरी)',
    nameHindi: 'ऊर्ध्वाधर महापाषाण प्रस्तर (Standing Menhir)',
    architecturalForm: '५ से १० फीट लंबा, एक ही विशाल प्राकृतिक ग्रेनाइट या बलुआ पत्थर का ऊर्ध्वाधर खंभा।',
    ritualPurpose: 'कुल के प्रमुख पूर्वज (हापड़ाम को) के अमर अस्तित्व, पौरुष व आत्मा के पृथ्वी और आकाश के बीच संबंध का प्रतीक।',
    engineeringMethod: 'बिना किसी सीमेंट या गारे के, लकड़ी के लट्ठों (रोलर्स) और पुआल की रस्सियों से खींचकर मिट्टी के ढलान वाले गड्ढे में गुरुत्वाकर्षण केंद्र (Center of Gravity) के संतुलन पर खड़ा किया जाता है।',
    clanSignificance: 'प्रत्येक पारिस (कुल) का सासान (श्मशान भूमि) अलग होता है। दिरी बिद उस भूमि पर कुल के अनादि अधिकार का सबसे बड़ा प्राकृतिक प्रमाण है।',
    visualEmoji: '🗿'
  },
  {
    id: 'chapad_diri',
    nameSantali: 'Chapad Diri (चापाड़ दिरी)',
    nameHindi: 'चपटा पाषाण शिलापट्ट (Dolmen Capstone)',
    architecturalForm: 'चौड़ा, चपटा विशाल पाषाण जो नीचे ३-४ छोटे खुरदरे पत्थरों (थपिया दिरी) पर संतुलन में टिका होता है।',
    ritualPurpose: 'विश्राम शिला: ऐसी मान्यता है कि पूर्वजों की पवित्र आत्माएं (हापड़ाम बोंगा) जब गांव में आती हैं, तो वे इस शीतल शिला पर बैठकर परिवार को आशीष देती हैं।',
    engineeringMethod: 'भारी पाषाण को बांस के बल्लों से उत्तोलक (Lever principle) लगाकर उठाया जाता है और उसके नीचे आधार शिलाएं स्थापित की जाती हैं।',
    clanSignificance: 'सोहराय और बाहा पर्व पर कुल की माताएं इस शिला को गाय के गोबर और चावल के मांड़ से लीपकर सिंदूर अर्पित करती हैं।',
    visualEmoji: '🪨'
  },
  {
    id: 'bonga_diri',
    nameSantali: 'Bonga Diri (बोंगा दिरी)',
    nameHindi: 'देव-आसन पाषाण (Sacred Spirit Altar)',
    architecturalForm: 'प्राकृतिक रूप से चिकना अथवा नदी के बहाव से घिसा हुआ पाषाण जो जाहेर थान व मांझी थान में स्थापित होता है।',
    ritualPurpose: 'मरांग बुरु और जाहेर एरा का प्रत्यक्ष आसन। इस पर बोंगा की पूजा और तर्पण संपन्न किया जाता है।',
    engineeringMethod: 'पवित्र नदी या पहाड़ से नाएके (ग्राम पुजारी) द्वारा विशेष स्तुति पाठ के बाद लाया और स्थापित किया जाता है।',
    clanSignificance: 'यह पूरे ग्राम के आध्यात्मिक अनुशासन और सामाजिक एकता का केंद्र बिंदु है।',
    visualEmoji: '✨'
  }
];

const JANG_BAHA_PILGRIMAGE = [
  {
    stage: '१. जांग बाहा संचयन (Bone Relic Preservation)',
    description: 'दाह-संस्कार के बाद मृतक के माथे व कंधे की तीन छोटी पवित्र अस्थियों (जांग बाहा) को धोकर मिट्टी के नए कुल्हड़ में साल के पत्तों के साथ सुरक्षित रखा जाता है।'
  },
  {
    stage: '२. नाई गाड़ा (दामोदर नदी) की पावन यात्रा',
    description: 'संताली समाज में दामोदर नदी को "नाई गाड़ा" (मातृ-नदी) माना जाता है। परिवार का मुखिया पैदल चलकर अस्थियों को दामोदर के पवित्र जल में विसर्जित करता है।'
  },
  {
    stage: '३. सासान में दिरी बिद प्रतिष्ठा (Erection of Memorial)',
    description: 'नदी से लौटने के बाद पूरे कुल के लोग एकत्र होकर पैतृक सासान में नया स्मृति पाषाण खड़ा करते हैं और हंडिया का तर्पण करते हैं।'
  }
];

export const SantaliSasandiriMegalithicLore: React.FC = () => {
  const [selectedMegalith, setSelectedMegalith] = useState<MegalithType>(MEGALITHS[0]);
  const [activeTab, setActiveTab] = useState<'types' | 'jang_baha' | 'engineering'>('types');

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
      <div className="bg-gradient-to-r from-stone-900 via-neutral-900 to-amber-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-stone-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-stone-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-500/20 text-stone-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-stone-500/30">
              <Landmark className="w-4 h-4" />
              सासानदीरी • Santali Megalithic Memorials
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-50">
              सासानदीरी व महापाषाण स्मृति प्रस्तर विद्या
            </h1>
            <p className="mt-2 text-stone-200/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              दिरी बिद (खड़ा प्रस्तर), चापाड़ दिरी (विश्राम शिला), नाई गाड़ा (दामोदर) जांग बाहा अस्थि विसर्जन तीर्थ और बिना गारे की प्राचीन पाषाण संतुलन इंजीनियरिंग।
            </p>
          </div>

          <div className="flex items-center gap-2 bg-stone-950/80 p-1.5 rounded-2xl border border-stone-700/50">
            <button
              onClick={() => setActiveTab('types')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'types'
                  ? 'bg-amber-700 text-white shadow-md'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              महापाषाण रूप
            </button>
            <button
              onClick={() => setActiveTab('jang_baha')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'jang_baha'
                  ? 'bg-amber-700 text-white shadow-md'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              जांग बाहा तीर्थ
            </button>
            <button
              onClick={() => setActiveTab('engineering')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'engineering'
                  ? 'bg-amber-700 text-white shadow-md'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              पाषाण संतुलन विद्या
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab: Megalith Types */}
      {activeTab === 'types' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Megalith List */}
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-stone-300 px-1 flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-600" />
              सासान के पवित्र पाषाण:
            </h2>

            <div className="space-y-3">
              {MEGALITHS.map((m) => {
                const isSelected = selectedMegalith.id === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMegalith(m)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-amber-50/80 dark:bg-stone-800 border-amber-600 shadow-md ring-2 ring-amber-500/20'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl p-2 bg-stone-100 dark:bg-stone-800 rounded-xl">
                          {m.visualEmoji}
                        </span>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white text-base">
                            {m.nameSantali}
                          </div>
                          <div className="text-xs text-amber-700 dark:text-amber-400 font-semibold">
                            {m.nameHindi}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(`${m.nameSantali}. ${m.nameHindi}. ${m.ritualPurpose}`);
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

            {/* Megalithic Fact Box */}
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-stone-800/60 border border-amber-200 dark:border-stone-700 text-xs text-amber-950 dark:text-stone-200 leading-relaxed">
              <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 mb-1">
                <Info className="w-4 h-4" />
                हजारों वर्षों की जीवित निरंतरता:
              </div>
              दुनिया के अधिकांश महापाषाण (जैसे स्टोनहेंज) आज मृत अवशेष हैं, परंतु संताली समाज में आज भी पूर्वज स्मृति में 'सासानदीरी' स्थापित करने की यह महापाषाणिक परंपरा पूर्णतः जीवित और सक्रिय है।
            </div>
          </div>

          {/* Megalith Detail */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {selectedMegalith.visualEmoji} {selectedMegalith.nameSantali}
                  </h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
                    {selectedMegalith.nameHindi}
                  </p>
                </div>
                <button
                  onClick={() => speakText(`${selectedMegalith.nameSantali}. रूप: ${selectedMegalith.architecturalForm}. उद्देश्य: ${selectedMegalith.ritualPurpose}`)}
                  className="px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-stone-800 hover:bg-amber-100 text-amber-700 dark:text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
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
                    स्थापत्य संरचना (Architectural Form):
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/30 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                    {selectedMegalith.architecturalForm}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-stone-500"></span>
                    आध्यात्मिक व पितृ-तर्पण उद्देश्य (Ritual Purpose):
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/30 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                    {selectedMegalith.ritualPurpose}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    कुल व भूमि अधिकार (Clan Land Title):
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-emerald-50/40 dark:bg-emerald-950/20 p-3.5 rounded-2xl border border-emerald-200/50 dark:border-emerald-900/30">
                    {selectedMegalith.clanSignificance}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab: Jang Baha Pilgrimage */}
      {activeTab === 'jang_baha' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              जांग बाहा: नाई गाड़ा (दामोदर) अस्थि विसर्जन तीर्थ
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              पूर्वजों की आत्मा की शांति और पुनर्मिलन के लिए दामोदर नदी के पावन तट तक की पवित्र यात्रा।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {JANG_BAHA_PILGRIMAGE.map((stage, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 space-y-3"
              >
                <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                  {stage.stage}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Tab: Engineering Physics */}
      {activeTab === 'engineering' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-600" />
              आदिम पाषाण संतुलन एवं काष्ठ उत्तोलक भौतिकी
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              बिना किसी आधुनिक क्रेन या लोहे की मशीनों के ५-१० टन वजनी शिलाओं को स्थापित करने की संताली इंजीनियरिंग।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-2xl">🪵</div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                साल के गोल लट्ठे (Rollers)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                पहाड़ से शिला लाने के लिए साल (सरजोम) के मोटे बेलनाकार लट्ठों को रास्ते पर बिछाकर घर्षण को न्यूनतम किया जाता था।
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-2xl">📐</div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                मिट्टी का ढलानदार टीला (Earthen Ramp)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                शिला को खड़ा करने के लिए पहले गड्ढे के पीछे ढलानदार मिट्टी का टीला बनाया जाता था, जिससे पत्थर स्वतः फिसलकर गड्ढे में सीधा हो जाता था।
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-2xl">⚖️</div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                त्रिकोणीय गुरुत्वाकर्षण संतुलन
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                चापाड़ दिरी के नीचे केवल ३ पत्थरों का आधार दिया जाता है, क्योंकि ३ बिंदु कभी डगमगाते नहीं (Triangulation principle)।
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
