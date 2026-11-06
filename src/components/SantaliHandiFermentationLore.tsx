import React, { useState } from 'react';
import { Droplet, Sparkles, AlertTriangle, ShieldCheck, Info, Volume2, CheckCircle2, Flame, Clock } from 'lucide-react';

interface FermentationStage {
  step: number;
  santaliName: string;
  hindiTitle: string;
  duration: string;
  description: string;
  sacredRules: string;
  visualIcon: string;
}

const FERMENTATION_STAGES: FermentationStage[] = [
  {
    step: 1,
    santaliName: 'दाका इसिन (Daka Isin)',
    hindiTitle: 'धान्य पकाना व ठंडा करना',
    duration: '२-३ घंटे',
    description: 'देसी करहानी या उसना चावल को मिट्टी की हांडी में मध्यम आंच पर पकाया जाता है ताकि दाने अलग-अलग रहें और चिपचिपे न हों। पके भात को बांस की चटाई पर फैलाकर सामान्य तापमान पर ठंडा किया जाता है।',
    sacredRules: 'चावल में नमक या तेल का स्पर्श नहीं होना चाहिए। पकाने वाला व्यक्ति पवित्र स्नान करके ही पात्र छूता है।',
    visualIcon: '🍚'
  },
  {
    step: 2,
    santaliName: 'रानू रान मिलाव (Ranu Ran Milaw)',
    hindiTitle: 'वनौषधि यीस्ट (रानू) का संमिश्रण',
    duration: '३० मिनट',
    description: '१५ प्रकार की वन-जड़ी-बूटियों (रूहें, हरड़, चिचिड़ी, पाताल कोहड़ा) से बनी "रानू" की टिकिया को सिलबट्टे पर महीन पीसकर ठंडे भात में एकसमान मिलाया जाता है।',
    sacredRules: 'रानू की मात्रा संतुलित होनी चाहिए (५ किलो चावल में १ मध्यम टिकिया)। अधिक रानू से स्वाद कड़वा हो जाता है।',
    visualIcon: '🌿'
  },
  {
    step: 3,
    santaliName: 'घट रे सांबाव (Ghat Re Sambaw)',
    hindiTitle: 'माटी के घट व साल पत्ते में संचयन',
    duration: '१ घंटा',
    description: 'नई मिट्टी की हांडी के भीतरी तल को ताजे साल (सरजोम) के पत्तों से आच्छादित किया जाता है। फिर रानू-युक्त भात को हल्के हाथों से दबाकर भरा जाता है और मुंह को साल पत्तों व कपड़े से बांधा जाता है।',
    sacredRules: 'हांडी को जमीन पर सीधे न रखकर पुआल के बीड़ा (बिंधा) पर अंधेरे, शांत व पवित्र कोने में स्थापित किया जाता है।',
    visualIcon: '🏺'
  },
  {
    step: 4,
    santaliName: 'बिलिन व किण्वन (Bilin / Fermentation)',
    hindiTitle: 'अवायवीय प्राकृतिक किण्वन (खमीर उठना)',
    duration: '३ से ४ दिन (गर्मी) / ५-६ दिन (सर्दी)',
    description: 'अवायवीय (Anaerobic) अवस्था में प्राकृतिक खमीर चावल के स्टार्च को प्राकृतिक ग्लूकोज और सुगंधित अल्कोहल में परिवर्तित करता है। तीसरे दिन हांडी से भीनी मदिरा सुगंध उठने लगती है।',
    sacredRules: 'इस दौरान घर में किसी बाहरी अशुद्ध व्यक्ति का प्रवेश और हांडी को बार-बार खोलना सख्त वर्जित है।',
    visualIcon: '⏳'
  },
  {
    step: 5,
    santaliName: 'रासी ओड़ोक व बोंगा अर्पण (Rasi Odok)',
    hindiTitle: 'प्रथम अमृत रस (रासी) व देव तर्पण',
    duration: 'अंतिम अवस्था',
    description: 'बिना पानी मिलाए जो गाढ़ा, मीठा और सुनहरी बूंदों वाला रस रिसता है, उसे "रासी" कहा जाता है। यह देवताओं और अतिथियों का परम आदर है। बाद में ठंडा झरना जल मिलाकर सामान्य हांडिया तैयार की जाती है।',
    sacredRules: 'सर्वप्रथम ३ बूंदें पृथ्वी पर गिराकर मारंग बुरु व जाहेर एरा को अर्पित की जाती हैं। बिना अर्पण के पीना पाप है।',
    visualIcon: '✨'
  }
];

export const SantaliHandiFermentationLore: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<FermentationStage>(FERMENTATION_STAGES[0]);
  const [activeTab, setActiveTab] = useState<'stages' | 'ranu_herbs' | 'social_code'>('stages');

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
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-yellow-950 border border-amber-800/40 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-800/60 border border-amber-600/40 rounded-full text-xs font-semibold text-amber-200 mb-3">
            <Droplet className="w-3.5 h-3.5" />
            <span>रानू राब व पावन किण्वन विज्ञान (Indigenous Fermentation Science)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-amber-100">
            संथाल पारंपरिक वनौषधि किण्वन, रानू व हांडिया विज्ञान
          </h1>
          <p className="text-stone-300 text-sm mt-2 leading-relaxed">
            संथाल संस्कृति में हांडिया मदिरा नहीं, बल्कि १५+ वनौषधियों के प्राकृतिक खमीर (रानू) से तैयार पावन प्रसाद व जैविक इलेक्ट्रोलाइट है। जानिए चावल के चयन से लेकर ५ दिवसीय किण्वन, रासी अमृत रस व देव-तर्पण की पवित्र विधियां।
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            <button
              onClick={() => setActiveTab('stages')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'stages'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-stone-900/60 hover:bg-stone-800/60 text-stone-200 border border-stone-700/50'
              }`}
            >
              ५-चरणीय किण्वन प्रक्रिया (Timeline)
            </button>
            <button
              onClick={() => setActiveTab('ranu_herbs')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'ranu_herbs'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-stone-900/60 hover:bg-stone-800/60 text-stone-200 border border-stone-700/50'
              }`}
            >
              रानू की १५ वनौषधियां (Herbal Yeast)
            </button>
            <button
              onClick={() => setActiveTab('social_code')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'social_code'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-stone-900/60 hover:bg-stone-800/60 text-stone-200 border border-stone-700/50'
              }`}
            >
              पवित्रता, बोंगा अर्पण व सामाजिक मर्यादा
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab 1: Stages */}
      {activeTab === 'stages' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Stepper Sidebar */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-xs font-bold text-stone-400 uppercase tracking-wider px-1 mb-2">
              किण्वन चरण चुनें (Select Stage):
            </div>
            {FERMENTATION_STAGES.map(st => {
              const isSelected = selectedStage.step === st.step;
              return (
                <div
                  key={st.step}
                  onClick={() => setSelectedStage(st)}
                  className={`p-3.5 rounded-xl cursor-pointer border transition-all ${
                    isSelected
                      ? 'bg-amber-950/70 border-amber-500 shadow-md'
                      : 'bg-stone-900/70 hover:bg-stone-800/60 border-stone-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{st.visualIcon}</span>
                      <span className="text-sm font-bold text-amber-200">{st.santaliName}</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded bg-stone-800 text-stone-300 font-mono">
                      {st.duration}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-1 pl-7">{st.hindiTitle}</p>
                </div>
              );
            })}
          </div>

          {/* Details Card */}
          <div className="lg:col-span-7">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="pb-4 border-b border-stone-800 flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                    चरण #{selectedStage.step} • {selectedStage.duration}
                  </span>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-amber-100">{selectedStage.santaliName}</h2>
                    <button
                      onClick={() => speakText(selectedStage.santaliName)}
                      className="p-1.5 bg-amber-900/40 text-amber-200 rounded-lg hover:bg-amber-800"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-stone-300 mt-0.5 font-semibold">{selectedStage.hindiTitle}</p>
                </div>
                <span className="text-4xl">{selectedStage.visualIcon}</span>
              </div>

              {/* Biological/Cooking Method */}
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wide block mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>पारंपरिक जैव-रासायनिक व निर्माण विधि</span>
                </span>
                <p className="text-stone-300 text-sm leading-relaxed">{selectedStage.description}</p>
              </div>

              {/* Sacred Taboo & Rules */}
              <div className="bg-amber-950/25 border border-amber-800/40 p-4 rounded-xl">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide block mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>पवित्र नियम व वर्जनाएं (Sacred Taboos)</span>
                </span>
                <p className="text-amber-100/90 text-xs leading-relaxed">{selectedStage.sacredRules}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab 2: Ranu Herbs */}
      {activeTab === 'ranu_herbs' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              name: 'रूहें रेहेत (Ruhen Root)',
              botanical: 'Alstonia scholaris root',
              role: 'प्राकृतिक किण्वन की गति बढ़ाता है और पेट की गैस व पाचन विकारों को शांत करता है।'
            },
            {
              name: 'चिलबिली छाल (Chilbili Bark)',
              botanical: 'Holoptelea integrifolia',
              role: 'हांडिया को खट्टा होने से बचाता है और प्राकृतिक जीवाणुरोधी (Antibacterial) सुरक्षा देता है।'
            },
            {
              name: 'पाताल कोहड़ा (Patal Kohda)',
              botanical: 'Pueraria tuberosa',
              role: 'ऊर्जा और शारीरिक बल संवर्धन; खेतों में ८ घंटे कड़ा श्रम करने वाले किसानों को शीतलता प्रदान करता है।'
            },
            {
              name: 'हरड़ व बहेड़ा (Haro-Bahera)',
              botanical: 'Terminalia chebula',
              role: 'त्रिदोष नाशक; यकृत (Liver) को सुरक्षित रखता है और अल्कोहल के विषैले प्रभाव को निष्प्रभावी करता है।'
            },
            {
              name: 'चिचिड़ी जड़ (Chichidi Rehet)',
              botanical: 'Achyranthes aspera',
              role: 'गठिया, जोड़ों के दर्द और थकान को मिटाने वाली पावन वन-जड़।'
            },
            {
              name: 'सरजोम बाहा (साल पुष्प पराग)',
              botanical: 'Shorea robusta blossom',
              role: 'भीनी प्राकृतिक सुगंध और सुनहरी रंगत प्रदान करने वाला पवित्र घटक।'
            }
          ].map((herb, idx) => (
            <div key={idx} className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-2">
              <span className="text-base font-bold text-amber-300 block">{herb.name}</span>
              <span className="text-xs text-stone-400 font-mono italic block">{herb.botanical}</span>
              <p className="text-stone-300 text-xs leading-relaxed pt-1">{herb.role}</p>
            </div>
          ))}
        </div>
      )}

      {/* Main Tab 3: Social Code */}
      {activeTab === 'social_code' && (
        <div className="max-w-3xl mx-auto bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="text-center">
            <h3 className="text-xl font-bold text-amber-200">संथाल समाज में हांडिया की मर्यादा व देव-आस्था</h3>
            <p className="text-xs text-stone-400 mt-1">नशे के लिए नहीं, अपितु पितृ-तर्पण, सामाजिक मेल-मिलाप और जैविक ऊर्जा का साधन</p>
          </div>

          <div className="space-y-3 text-xs text-stone-300">
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
              <strong className="text-amber-400 block mb-1">१. बोंगा अर्पण के बिना ग्रहण निषेध</strong>
              जब भी हांडी खोली जाती है, सबसे पहले नायके बाबा या घर का मुखिया ३ पत्ते लेकर उन पर रासी रस टपकाकर मारंग बुरु व जाहेर एरा को अर्पण करता है।
            </div>
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
              <strong className="text-amber-400 block mb-1">२. विवाह (बाapla) व बैठकों में सुलह का प्रतीक</strong>
              दो परिवारों के बीच रिश्ते तय होते समय 'दाक् दुबुल' (जल मिलाप) में हांडिया का आदान-प्रदान अटूट वचन का परिचायक होता है।
            </div>
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
              <strong className="text-amber-400 block mb-1">३. व्यापारिक मदिरा से भिन्न</strong>
              पारंपरिक संथाल हांडिया में किसी रासायनिक स्पिरिट या यूरिया का प्रयोग पाप माना जाता है; यह शुद्ध औषधीय किण्वन है।
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
