import React, { useState } from 'react';
import { Users, Heart, Shield, CheckCircle, Volume2, Info, Sparkles, AlertTriangle } from 'lucide-react';

interface KinshipRelation {
  id: string;
  relationDev: string;
  relationRom: string;
  hindiRelation: string;
  greetingType: string;
  gestureDescription: string;
  whoBowsFirst: string;
  spokenSantaliPhrase: string;
  reciprocalPhrase: string;
  tabooWarning?: string;
  culturalWisdom: string;
}

const KINSHIP_DATA: KinshipRelation[] = [
  {
    id: 'mama',
    relationDev: 'मामा (मातुलो)',
    relationRom: 'Mama',
    hindiRelation: 'मामा (Maternal Uncle)',
    greetingType: 'डोबोक जोहार (Dobok Johar)',
    gestureDescription: 'भांजा दोनों हाथ जोड़कर दाहिने घुटने को मोड़ते हुए भूमि छूकर शीश झुकाता है। मामा भांजे के सिर पर हाथ रखकर आशीर्वाद देता है।',
    whoBowsFirst: 'भांजा (भागना) सबसे पहले झुककर डोबोक करेगा।',
    spokenSantaliPhrase: 'जोहार गो मामा! नापाय गे मेना-मा?',
    reciprocalPhrase: 'हे भागे, नापाय गे मेना-लेया। जोहार बाबु, चांदो बोंगा बुरुक-मा!',
    culturalWisdom: 'संथाल समाज में मामा का दर्जा अत्यंत पावन है। जन्म से लेकर विवाह (बापला) और सिका दागने तक मामा की उपस्थिति व सहमति अनिवार्य है।'
  },
  {
    id: 'balaya',
    relationDev: 'बालाया (समधी-समधिन)',
    relationRom: 'Balaya',
    hindiRelation: 'समधी व समधिन (Co-in-laws)',
    greetingType: 'बालाया जोहार (Balaya Johar)',
    gestureDescription: 'दोनों समधी खड़े होकर हाथ जोड़ते हैं, फिर एक-दूसरे के सीने के पास दोनों हथेलियों को मिलाकर ३ बार ऊपर-नीचे झुकाते हैं।',
    whoBowsFirst: 'दोनों समधी एक साथ, समान स्तर पर झुकते हैं; कोई छोटा या बड़ा नहीं होता।',
    spokenSantaliPhrase: 'जोहार बालाया! सेतेर अकाना-पे?',
    reciprocalPhrase: 'हे बालाया, जोहार! आपेवाः दया-ते नापाय गे आले सेतेर-एना।',
    culturalWisdom: 'संथाल विवाह में दो परिवारों की बराबरी का प्रतीक है। बालाया जोहार में कोई पैर नहीं छूता, बल्कि दोनों कुल सम्मानपूर्वक मिलते हैं।'
  },
  {
    id: 'manjhi_baba',
    relationDev: 'मांझी बाबा (ग्राम प्रधान)',
    relationRom: 'Manjhi Baba',
    hindiRelation: 'गांव के मांझी बाबा (Village Headman)',
    greetingType: 'आतु डोबोक जोहार (Atu Dobok Johar)',
    gestureDescription: 'ग्रामीण दोनों हाथ जोड़कर सम्मानपूर्वक झुकते हैं। मांझी बाबा हाथ उठाकर गांव के कल्याण का आशीष देते हैं।',
    whoBowsFirst: 'ग्रामीण जन पहले मांझी बाबा को जोहार करते हैं।',
    spokenSantaliPhrase: 'जोहार मांझी बाबा! आतु रे सानाम नापाय गे?',
    reciprocalPhrase: 'जोहार! मारंग बुरुवाः दया-ते आतु नापाय गे मेनाक्-आ।',
    culturalWisdom: 'मांझी बाबा को गांव का प्रथम नागरिक व पूर्वजों का प्रतिनिधि माना जाता है। उनके बिना गांव का कोई सामाजिक कार्य नहीं होता।'
  },
  {
    id: 'aji_budhi',
    relationDev: 'अजी / बुढ़ी आयो (दादी/नानी)',
    relationRom: 'Aji / Budhi Aayo',
    hindiRelation: 'दादी या नानी (Paternal/Maternal Grandmother)',
    greetingType: 'गोड़ जोहार व स्नेह-आशीष (God Johar)',
    gestureDescription: 'पोता-पोती दोनों हाथों से नानी-दादी के घुटने को स्पर्श कर अपने माथे से लगाते हैं। दादी स्नेह से सिर सूंघती है।',
    whoBowsFirst: 'पोता या नाती पहले प्रणाम करता है।',
    spokenSantaliPhrase: 'जोहार बुढ़ी आयो! कुदुम ला़ई-आले-मे!',
    reciprocalPhrase: 'जोहार धन! ताहेन-पे सुख-ते, मारंग बुरु आसीरबाद-मा!',
    culturalWisdom: 'दादी-नानी संथाल बच्चों को कुदुम (पहेलियां), लोककथाएं और कबीलाई गीत सिखाने की प्रथम पाठशाला हैं।'
  },
  {
    id: 'bhaojay_devar',
    relationDev: 'भाभी व देवर (बाऊ-बोहो व देवर)',
    relationRom: 'Bau-Boho & Eril Koda',
    hindiRelation: 'भाभी व देवर (Elder Brother’s Wife & Younger Brother)',
    greetingType: 'हिलि-देवर जोहार (Hili-Eril Johar)',
    gestureDescription: 'हल्का सा हाथ जोड़कर मधुर मुस्कान के साथ जोहार। परिहास व आत्मीयता का संबंध।',
    whoBowsFirst: 'देवर पहले भाभी को सम्मानपूर्वक जोहार कहता है।',
    spokenSantaliPhrase: 'जोहार हिलि! चेत् उसूल उतु बेनाव अकादा-म?',
    reciprocalPhrase: 'जोहार देवर! हिजुक्-मे, मांडी इसिन अकाना।',
    culturalWisdom: 'संथाल परंपरा में भाभी मां के समान आदरणीय भी है और घर की सबसे प्रिय मार्गदर्शिका भी।'
  },
  {
    id: 'jeth_bahu',
    relationDev: 'जेठ व बहू (अजगुड़ नाता)',
    relationRom: 'Bhojhar & Teang',
    hindiRelation: 'ससुर/जेठ व छोटी बहू (Elder Brother-in-law & Younger Brother’s Wife)',
    greetingType: 'मर्यादा जोहार (आंख बचाकर शिष्टाचार)',
    gestureDescription: 'प्रत्यक्ष स्पर्श या आंख मिलाकर बात करना पूर्णतः वर्जित (Taboo) है। बहू सिर पर पल्लू ढककर दूर से हाथ जोड़ती है।',
    whoBowsFirst: 'बहू दूर से आंचल संभालकर हल्का सा झुकती है।',
    spokenSantaliPhrase: 'जोहार... (धीमे स्वर में बिना दृष्टि मिलाए)',
    reciprocalPhrase: 'जोहार माई, नापाय-ते ताहेन-मे।',
    tabooWarning: 'सख्त सामाजिक वर्जना (Taboo): संथाल समाज में जेठ और छोटे भाई की पत्नी का स्पर्श या एकांत में आमने-सामने बैठना भारी सामाजिक अपराध माना जाता है।',
    culturalWisdom: 'यह मर्यादा परिवार में पवित्रता, अनुशासन और अनपेक्षित पारिवारिक विवादों को रोकने के लिए बनाई गई है।'
  }
];

export const SantaliGreetingsEtiquetteSimulator: React.FC = () => {
  const [selectedRelation, setSelectedRelation] = useState<KinshipRelation>(KINSHIP_DATA[0]);
  const [activeTab, setActiveTab] = useState<'matrix' | 'taboos_guide' | 'quiz'>('matrix');
  const [quizScore, setQuizScore] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<boolean | null>(null);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'hi-IN';
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };

  const QUIZ_QUESTIONS = [
    {
      q: 'संथाल समाज में दो समधी (बालाया) एक-दूसरे से किस प्रकार जोहार करते हैं?',
      options: [
        'एक समधी दूसरे के पैर छूता है',
        'दोनों समान खड़े होकर हथेलियां मिलाकर ३ बार ऊपर-नीचे जोहार करते हैं',
        'केवल दूर से सिर हिलाते हैं'
      ],
      correctIdx: 1,
      explanation: 'बालाया जोहार में दोनों परिवार बराबरी के सम्मान के साथ छाती के पास हाथ मिलाकर ३ बार जोहार करते हैं।'
    },
    {
      q: 'संथाल संस्कृति में किस रिश्ते में प्रत्यक्ष स्पर्श या एक साथ बैठना सख्त वर्जित (Taboo) है?',
      options: [
        'मामा और भांजा',
        'देवर और भाभी',
        'जेठ और छोटे भाई की पत्नी (बहू)'
      ],
      correctIdx: 2,
      explanation: 'जेठ और छोटी बहू के बीच मर्यादा का कठोर नियम है; उनका आपस में स्पर्श या अकेला बैठना सामाजिक अपराध माना जाता है।'
    },
    {
      q: 'युवक द्वारा मामा को प्रणाम करते समय कौन सा जोहार किया जाता है?',
      options: [
        'डोबोक जोहार (दाहिना घुटना मोड़कर भूमि छूते हुए)',
        'केवल हाथ मिलाना (गाते जोहार)',
        'आसमान की ओर हाथ उठाना'
      ],
      correctIdx: 0,
      explanation: 'भांजा हमेशा दाहिना घुटना मोड़कर झुकते हुए मामा को डोबोक जोहार करता है।'
    }
  ];

  const currentQ = QUIZ_QUESTIONS[quizIdx % QUIZ_QUESTIONS.length];

  const handleQuizAnswer = (idx: number) => {
    if (quizAnswered !== null) return;
    const isCorrect = idx === currentQ.correctIdx;
    setQuizAnswered(isCorrect);
    if (isCorrect) setQuizScore(prev => prev + 10);
  };

  const nextQuiz = () => {
    setQuizIdx(prev => prev + 1);
    setQuizAnswered(null);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-50 via-stone-50 to-amber-50 border border-teal-200/40 rounded-2xl p-6 text-slate-900 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100/60 border border-teal-300/40 rounded-full text-xs font-semibold text-teal-800 mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>डोबोक जोहार व सामाजिक शिष्टाचार (Santali Kinship Etiquette)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-teal-800">
            संथाल जोहार, नाता-गोता व पारंपरिक पारिवारिक शिष्टाचार
          </h1>
          <p className="text-stone-700 text-sm mt-2 leading-relaxed">
            संथाल समाज में हर रिश्ते के अभिवादन की एक विशिष्ट मर्यादा, मुद्रा और संथाली संवाद निर्धारित है। जानिए डोबोक जोहार, बालाया जोहार, मामा-भांजा संबंध और जेठ-बहू की सामाजिक मर्यादाओं का दर्शन।
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'matrix'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'bg-stone-50/60 hover:bg-stone-100/60 text-stone-800 border border-stone-200/50'
              }`}
            >
              रिश्तेदार अभिवादन सिमुलेटर
            </button>
            <button
              onClick={() => setActiveTab('taboos_guide')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'taboos_guide'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'bg-stone-50/60 hover:bg-stone-100/60 text-stone-800 border border-stone-200/50'
              }`}
            >
              सामाजिक वर्जनाएं (Taboos & Avoidances)
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'quiz'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'bg-stone-50/60 hover:bg-stone-100/60 text-stone-800 border border-stone-200/50'
              }`}
            >
              शिष्टाचार कसौटी (Interactive Quiz)
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Interactive Matrix */}
      {activeTab === 'matrix' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Relatives List */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-xs font-bold text-stone-600 uppercase tracking-wider px-1">
              रिश्ता चुनें (Select Kinship Relationship):
            </div>
            {KINSHIP_DATA.map(rel => {
              const isSelected = selectedRelation.id === rel.id;
              return (
                <div
                  key={rel.id}
                  onClick={() => setSelectedRelation(rel)}
                  className={`p-3.5 rounded-xl cursor-pointer border transition-all ${
                    isSelected
                      ? 'bg-teal-50/70 border-teal-500 shadow-md'
                      : 'bg-stone-50/70 hover:bg-stone-100/60 border-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-teal-800">{rel.relationDev}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-mono">{rel.relationRom}</span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1">{rel.hindiRelation} • {rel.greetingType}</p>
                </div>
              );
            })}
          </div>

          {/* Details Card */}
          <div className="lg:col-span-7">
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="pb-4 border-b border-stone-200">
                <span className="text-xs uppercase tracking-wider text-teal-600 font-bold block mb-1">
                  अभिवादन विधि: {selectedRelation.greetingType}
                </span>
                <h2 className="text-2xl font-bold text-amber-800">{selectedRelation.relationDev}</h2>
                <p className="text-sm text-stone-700 mt-0.5">{selectedRelation.hindiRelation}</p>
              </div>

              {/* Physical Gesture */}
              <div className="bg-white p-4 rounded-xl border border-stone-200">
                <span className="text-xs font-bold text-teal-700 block mb-1">
                  शारीरिक मुद्रा व प्रणाम विधि (Physical Gesture)
                </span>
                <p className="text-stone-700 text-sm leading-relaxed">{selectedRelation.gestureDescription}</p>
                <div className="text-xs text-amber-600 mt-2 font-medium">
                  • पहल कौन करता है: {selectedRelation.whoBowsFirst}
                </div>
              </div>

              {/* Spoken Dialogues */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-teal-50/30 border border-teal-200/50 p-3.5 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-teal-700">पहला संथाली संबोधन:</span>
                    <button
                      onClick={() => speakText(selectedRelation.spokenSantaliPhrase)}
                      className="p-1 bg-teal-50 text-teal-800 rounded hover:bg-teal-100"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-amber-800 font-medium text-xs font-serif">"{selectedRelation.spokenSantaliPhrase}"</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-stone-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-stone-600">प्रति-उत्तर (आशीर्वाद):</span>
                    <button
                      onClick={() => speakText(selectedRelation.reciprocalPhrase)}
                      className="p-1 bg-stone-100 text-stone-700 rounded hover:bg-stone-200"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-stone-700 font-medium text-xs font-serif">"{selectedRelation.reciprocalPhrase}"</p>
                </div>
              </div>

              {/* Taboo Warning if exists */}
              {selectedRelation.tabooWarning && (
                <div className="p-4 bg-red-50/40 border border-red-200/60 rounded-xl flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-800 leading-relaxed font-medium">
                    {selectedRelation.tabooWarning}
                  </p>
                </div>
              )}

              {/* Cultural Wisdom */}
              <div className="bg-gradient-to-r from-amber-50/40 to-stone-50 p-4 rounded-xl border border-amber-200/40">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-1">
                  पारंपरिक सामाजिक दर्शन
                </span>
                <p className="text-xs text-stone-700 leading-relaxed">{selectedRelation.culturalWisdom}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Taboos Guide */}
      {activeTab === 'taboos_guide' && (
        <div className="max-w-3xl mx-auto bg-stone-50 border border-stone-200 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="text-center">
            <h3 className="text-xl font-bold text-amber-800">संथाल समाज की पवित्र मर्यादाएं व वर्जनाएं (Avoidance Taboos)</h3>
            <p className="text-xs text-stone-600 mt-1">पारिवारिक शांति व कबीलाई अनुशासन बनाए रखने वाले पारंपरिक सामाजिक नियम</p>
          </div>

          <div className="space-y-3">
            <div className="bg-white p-4 rounded-xl border border-stone-200">
              <span className="text-sm font-bold text-amber-600 block mb-1">१. जेठ-बहू (Bhojhar-Teang) मर्यादा</span>
              <p className="text-xs text-stone-700 leading-relaxed">
                संथाल परिवार में बड़े भाई (जेठ) और छोटे भाई की पत्नी के बीच प्रत्यक्ष स्पर्श, एक चटाई पर बैठना, या नाम लेना पूर्णतः निषिद्ध है। यह मर्यादा घर की स्त्रियों की गरिमा की रक्षा के लिए सदियों से अक्षुण्ण है।
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-stone-200">
              <span className="text-sm font-bold text-amber-600 block mb-1">२. सगोत्र (Same Clan) विवाह का निषेध</span>
              <p className="text-xs text-stone-700 leading-relaxed">
                एक ही पारिस (गोत्र) जैसे मुर्मू-मुर्मू, हांसदा-हांसदा के बीच विवाह को महापाप माना जाता है। इसे भाई-बहन के समान पवित्र संबंध मानकर कड़ाई से वर्जित रखा गया है।
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-stone-200">
              <span className="text-sm font-bold text-amber-600 block mb-1">३. जाहेर थान व कुलदेवता (ओड़ाक् बोंगा) का आदर</span>
              <p className="text-xs text-stone-700 leading-relaxed">
                घर के कुलदेवता के कमरे में परिवार की विवाहित पुत्रियों को विवाह के बाद प्रवेश की अनुमति नहीं होती, क्योंकि वे अब दूसरे कुल (ससुराल के बोंगा) की हो चुकी होती हैं।
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Interactive Quiz */}
      {activeTab === 'quiz' && (
        <div className="max-w-2xl mx-auto bg-stone-50 border border-stone-200 rounded-2xl p-6 shadow-xl text-center">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-5">
            <span className="text-xs font-bold text-teal-600">प्रश्न #{quizIdx + 1}</span>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              अंक: {quizScore}
            </span>
          </div>

          <h3 className="text-lg font-bold text-stone-800 mb-6">{currentQ.q}</h3>

          <div className="space-y-3">
            {currentQ.options.map((opt, i) => {
              const isSelected = quizAnswered !== null;
              const isCorrect = i === currentQ.correctIdx;

              let btnStyle = 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-200';
              if (isSelected) {
                if (isCorrect) btnStyle = 'bg-teal-50 text-teal-800 border-teal-500 font-bold';
                else btnStyle = 'bg-white text-stone-500 opacity-60 border-stone-200';
              }

              return (
                <button
                  key={i}
                  disabled={quizAnswered !== null}
                  onClick={() => handleQuizAnswer(i)}
                  className={`w-full p-3.5 rounded-xl border text-sm text-left transition-all ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {quizAnswered !== null && (
            <div className="mt-5 pt-4 border-t border-stone-200">
              <p className={`text-sm font-bold mb-2 ${quizAnswered ? 'text-teal-600' : 'text-amber-600'}`}>
                {quizAnswered ? 'शाबाश! बिल्कुल सही उत्तर! (+10 अंक)' : 'गलत उत्तर!'}
              </p>
              <p className="text-xs text-stone-700 mb-4">{currentQ.explanation}</p>
              <button
                onClick={nextQuiz}
                className="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-sm font-semibold shadow"
              >
                अगला प्रश्न →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
