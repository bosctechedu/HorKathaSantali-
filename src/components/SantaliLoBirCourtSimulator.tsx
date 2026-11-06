import React, { useState } from 'react';
import { Scale, Users, Shield, CheckCircle, HelpCircle, BookOpen, Volume2, Award, Info, AlertCircle } from 'lucide-react';

interface CourtCase {
  id: string;
  titleDev: string;
  titleRom: string;
  category: string;
  background: string;
  complainantStatement: string;
  defendantStatement: string;
  customaryLawQuote: string;
  customaryLawExplanation: string;
  options: {
    text: string;
    isTraditionalConsensus: boolean;
    explanation: string;
  }[];
}

const COURT_CASES: CourtCase[] = [
  {
    id: 'case_sendra_hunting',
    titleDev: 'सेंदरा रे जिल हातिंग (शिकार के मृग का बंटवारा)',
    titleRom: 'Sendra Re Jil Hating',
    category: 'पारंपरिक शिकार विधि (Hunting Law)',
    background: 'अयोध्या पहाड़ के वार्षिक दिसोम सेंदरा में एक जंगली हिरण का शिकार हुआ। दो शिकारी दलों के बीच विवाद है कि पहला घातक तीर किसका था।',
    complainantStatement: 'रामू हांसदा: "मेरा तीर हिरण के कंधे पर पहले लगा (सार बाहा), जिससे वह घायल होकर गिरा। अतः पहला हक मेरा है।"',
    defendantStatement: 'सोम मरांडी: "तीर भले लगा हो, पर हिरण भाग रहा था। मेरी कुल्हाड़ी ने उसे अंत में रोककर प्राण लिए।"',
    customaryLawQuote: 'सेंदरा रे सार बाहा जेताए चापात् अकादे, उनी गे जोजोम ती आर बोहोक ञाम-आ।',
    customaryLawExplanation: 'संथाल सेंदरा विधि का शाश्वत नियम: जो शिकारी पहला तीक्ष्ण तीर (सार बाहा) मारता है, शिकार का सिर (बोहोक) और दाहिना अगला पैर (जोजोम ती) उसका होता है। शेष मांस सभी सेंदरा भाइयों में बराबर बंटता है।',
    options: [
      {
        text: 'रामू हांसदा को सिर व दाहिना पैर मिले, सोम मरांडी को विशेष शिकारी हिस्सा मिले और शेष गांव में बराबर बंटे।',
        isTraditionalConsensus: true,
        explanation: 'बिल्कुल सही! यह लो बीर का सदियों पुराना सर्वमान्य न्याय है जो किसी को निराश नहीं करता और सामूहिक भाईचारा बनाए रखता है।'
      },
      {
        text: 'पूरा हिरण अकेले सोम मरांडी को सौंप दिया जाए क्योंकि उसने अंतिम वार किया।',
        isTraditionalConsensus: false,
        explanation: 'यह संथाल सेंदरा संहिता के विरुद्ध है। पहले तीर (सार बाहा) का सम्मान सर्वोच्च होता है।'
      },
      {
        text: 'शिकार को बाजार में बेचकर पैसे आधे-आधे बांट लिए जाएं।',
        isTraditionalConsensus: false,
        explanation: 'सेंदरा का मांस कभी बेचा नहीं जाता; यह पूर्वजों और सह-शिकारियों में प्रसाद स्वरूप बांटा जाता है।'
      }
    ]
  },
  {
    id: 'case_pasture_boundary',
    titleDev: 'गोड़ा धूरा व चराई विवाद (खेत की मेड़ पर पशु चरना)',
    titleRom: 'Goda Dhura & Charai',
    category: 'कृषि व भूमि मर्यादा (Agrarian Law)',
    background: 'एक गांव के बैलों ने दूसरे गांव के किसान के धान की नर्सरी (बिचड़ा) को चर लिया, जिससे भारी नुकसान हुआ।',
    complainantStatement: 'चान्दो मुर्मू: "मेरी आधी नर्सरी समाप्त हो गई, मुझे पूरे धान के नुकसान का नकद हर्जाना चाहिए।"',
    defendantStatement: 'बाबूलाल हेम्ब्रम: "चरवाहा बालक था, जानबूझकर पशु नहीं घुसाए गए। हम क्षतिपूर्ति के लिए श्रम देने को तैयार हैं।"',
    customaryLawQuote: 'गाड़ाय-गाड़ाय लेकान दांडी काताओ-मे, घारोज रे बयरी आलो बेनाव-मा।',
    customaryLawExplanation: 'संथाल न्याय का मूल ध्येय: दंड ऐसा न हो जो किसी परिवार को कंगाल कर दे, बल्कि सामंजस्य और श्रम से भरपाई कराई जाए।',
    options: [
      {
        text: 'बाबूलाल अपने परिवार के साथ मिलकर चान्दो के खेत की दोबारा रोपाई में निःशुल्क ५ दिन श्रम करे और प्रतीकात्मक हंडिया/भोज दे।',
        isTraditionalConsensus: true,
        explanation: 'उत्तम फैसला! संथाल जन-अदालत जेल या नकद मुकदमों के बदले सामाजिक श्रम और पुनः मेल-मिलाप को प्राथमिकता देती है।'
      },
      {
        text: 'बाबूलाल के बैलों को गांव द्वारा जब्त कर नीलाम कर दिया जाए।',
        isTraditionalConsensus: false,
        explanation: 'यह अत्यधिक कठोर और अमानवीय है; इससे दोनों परिवारों में पीढ़ीगत शत्रुता पैदा हो जाएगी।'
      }
    ]
  }
];

export const SantaliLoBirCourtSimulator: React.FC = () => {
  const [activeCaseIdx, setActiveCaseIdx] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'simulator' | 'constitution'>('simulator');

  const currentCase = COURT_CASES[activeCaseIdx];

  const handleSelectOption = (idx: number) => {
    setSelectedOptionIdx(idx);
  };

  const nextCase = () => {
    setActiveCaseIdx(prev => (prev + 1) % COURT_CASES.length);
    setSelectedOptionIdx(null);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-stone-50 via-amber-50 to-stone-50 border border-amber-200/40 rounded-2xl p-6 text-slate-900 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100/60 border border-amber-300/40 rounded-full text-xs font-semibold text-amber-800 mb-3">
            <Scale className="w-3.5 h-3.5" />
            <span>लो बीर बैसी (Santali Supreme Customary Court)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-amber-800">
            लो बीर बैसी: सर्वोच्च आदिवासी जन-अदालत सिमुलेटर
          </h1>
          <p className="text-stone-700 text-sm mt-2 leading-relaxed">
            संथाल समाज की सर्वोच्च न्यायिक सभा 'लो बीर बैसी' में न कोई वकील होता है, न कोर्ट फीस। जंगल में साल के वृक्षों की छांव में हर व्यक्ति को अपनी बात रखने का अधिकार होता है। जानिए कैसे पूर्वजों की मौखिक विधि-संहिता से आम सहमति का न्याय होता है।
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'simulator'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-stone-50/60 hover:bg-stone-100/60 text-stone-800 border border-stone-200/50'
              }`}
            >
              जन-अदालत मुकदमा सिमुलेटर
            </button>
            <button
              onClick={() => setActiveTab('constitution')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'constitution'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-stone-50/60 hover:bg-stone-100/60 text-stone-800 border border-stone-200/50'
              }`}
            >
              संथाल त्रि-स्तरीय शासन व न्याय दर्शन
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab 1: Court Simulator */}
      {activeTab === 'simulator' && (
        <div className="max-w-3xl mx-auto bg-stone-50 border border-stone-200 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              {currentCase.category}
            </span>
            <span className="text-xs text-stone-600">
              मुकदमा {activeCaseIdx + 1} / {COURT_CASES.length}
            </span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-amber-800">{currentCase.titleDev}</h2>
            <p className="text-xs text-stone-600 font-mono mt-0.5">{currentCase.titleRom}</p>
            <p className="text-sm text-stone-700 mt-2 bg-white p-3.5 rounded-xl border border-stone-200">
              {currentCase.background}
            </p>
          </div>

          {/* Statements */}
          <div className="space-y-3">
            <div className="p-3.5 bg-blue-50/30 border border-blue-200/40 rounded-xl text-xs text-blue-800">
              <strong className="text-blue-700 block mb-1">वादी का पक्ष:</strong>
              {currentCase.complainantStatement}
            </div>
            <div className="p-3.5 bg-amber-50/30 border border-amber-200/40 rounded-xl text-xs text-amber-800">
              <strong className="text-amber-700 block mb-1">प्रतिवादी का पक्ष:</strong>
              {currentCase.defendantStatement}
            </div>
          </div>

          {/* Customary Law Quote */}
          <div className="p-4 bg-white rounded-xl border border-amber-200/40 text-center">
            <span className="text-xs uppercase text-amber-600 font-semibold block mb-1">
              पूर्वजों की प्राचीन विधि-संहिता (हापड़ाम काथा)
            </span>
            <p className="text-base font-bold text-amber-800 font-serif">"{currentCase.customaryLawQuote}"</p>
            <p className="text-xs text-stone-600 mt-1 italic">{currentCase.customaryLawExplanation}</p>
          </div>

          {/* Judicial Options */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-stone-700 block">
              लो बीर बैसी के सदस्य के रूप में आपका न्यायसंगत फैसला क्या होगा?
            </span>
            {currentCase.options.map((opt, idx) => {
              const isSelected = selectedOptionIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-xl text-left text-xs transition-all border ${
                    isSelected
                      ? opt.isTraditionalConsensus
                        ? 'bg-emerald-50/80 border-emerald-500 text-emerald-800 font-semibold'
                        : 'bg-red-50/80 border-red-500 text-red-800'
                      : 'bg-white hover:bg-stone-100/80 border-stone-200 text-stone-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span>{opt.text}</span>
                    {isSelected && opt.isTraditionalConsensus && (
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                  </div>
                  {isSelected && (
                    <div className="mt-2 pt-2 border-t border-stone-200/60 text-xs text-stone-700">
                      {opt.explanation}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {selectedOptionIdx !== null && (
            <div className="text-center pt-2">
              <button
                onClick={nextCase}
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow-md"
              >
                अगला ऐतिहासिक मुकदमा विचारें →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main Tab 2: Constitution & Hierarchy */}
      {activeTab === 'constitution' && (
        <div className="max-w-3xl mx-auto bg-stone-50 border border-stone-200 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-xl font-bold text-amber-700">संथाल समाज की त्रि-स्तरीय स्वशासन व्यवस्था</h3>
          <div className="space-y-3 text-xs text-stone-700">
            <div className="p-4 bg-white rounded-xl border border-stone-200">
              <strong className="text-amber-600 block mb-1">१. हातु बैसी (Village Court)</strong>
              ग्राम स्तर की सभा जिसकी अध्यक्षता मांझी बाबा करते हैं। गोड़ेत, प्राणिक व जोग मांझी की उपस्थिति में गांव के दैनिक विवाद सुलझाए जाते हैं।
            </div>
            <div className="p-4 bg-white rounded-xl border border-stone-200">
              <strong className="text-amber-600 block mb-1">२. परगना बैसी (Inter-Village Council)</strong>
              १२ से २० गांवों का संघ जिसकी अध्यक्षता परगना बाबा करते हैं। दो गांवों के आपसी विवादों का निपटारा यहां होता है।
            </div>
            <div className="p-4 bg-white rounded-xl border border-stone-200">
              <strong className="text-amber-600 block mb-1">३. लो बीर बैसी (Supreme Assembly of the Forest)</strong>
              संथाल समाज की सर्वोच्च अपीलीय अदालत। यहां मांझी और परगना भी आम नागरिक के समान जमीन पर बैठते हैं। दिहरी (Dihri) के नेतृत्व में लिया गया फैसला अंतिम और बाध्यकारी होता है।
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
