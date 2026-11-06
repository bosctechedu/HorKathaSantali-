import React, { useState } from 'react';
import { Sprout, ShieldCheck, Layers, Sun, Droplets, Calendar, Volume2, Award, Info, Sparkles, CheckCircle } from 'lucide-react';

interface SeedVariety {
  id: string;
  nameDev: string;
  nameRom: string;
  category: 'medicinal_rice' | 'drought_rice' | 'wetland_rice' | 'aromatic_rice' | 'millet';
  color: string;
  durationDays: number;
  waterNeed: 'अल्प (Low)' | 'मध्यम (Medium)' | 'प्रचुर (High)';
  characteristics: string;
  culturalRitual: string;
  nutritionalValue: string;
}

const INDIGENOUS_SEEDS: SeedVariety[] = [
  {
    id: 'karhani',
    nameDev: 'करहानी धान (काला औषधीय धान)',
    nameRom: 'Karhani Horoc',
    category: 'medicinal_rice',
    color: '#2d2522',
    durationDays: 135,
    waterNeed: 'मध्यम (Medium)',
    characteristics: 'काले छिलके और बैंगनी-भूरे दाने वाला दुर्लभ धान। रोग प्रतिरोधक क्षमता अत्यंत तीव्र।',
    culturalRitual: 'संथाल समाज में प्रसूता महिलाओं और चोटग्रस्त शिकारियों को शक्ति व अस्थि जोड़ने के लिए इसका मांड पिलाया जाता है।',
    nutritionalValue: 'आयरन, जिंक और एंथोसायनिन एंटीऑक्सीडेंट से भरपूर; रक्त की कमी दूर करता है।'
  },
  {
    id: 'tupu',
    nameDev: 'तुपु धान (बाढ़रोधी जल धान)',
    nameRom: 'Tupu Horoc',
    category: 'wetland_rice',
    color: '#8b4513',
    durationDays: 150,
    waterNeed: 'प्रचुर (High)',
    characteristics: 'गहरे पानी में तने को तेजी से लंबा करने वाला धान। १५-२० दिन तक पानी में डूबे रहने पर भी नहीं सड़ता।',
    culturalRitual: 'नदियों के कछार व निचले जोभड़ा खेतों में रोपा जाता है। अकाल व बाढ़ के समय जीवनदाता।',
    nutritionalValue: 'मजबूत रेशेदार स्टार्च, जिससे दिनभर भारी श्रम करने पर भी भूख नहीं लगती।'
  },
  {
    id: 'dangor',
    nameDev: 'दानगोड़ धान (सूखा-रोधी टांड़ धान)',
    nameRom: 'Dangor Horoc',
    category: 'drought_rice',
    color: '#cd853f',
    durationDays: 95,
    waterNeed: 'अल्प (Low)',
    characteristics: 'पथरीली लाल मिट्टी और बिना सिंचाई के केवल प्राकृतिक ओस व हलकी फुहार में पकने वाला धान।',
    culturalRitual: 'पहाड़ी ढलानों (गोड़ा खेत) पर बोया जाता है। कम वर्षा के वर्षों में संथाल किसानों का सुरक्षा कवच।',
    nutritionalValue: 'खनिज लवणों और प्राकृतिक फॉस्फोरस से युक्त सुपाच्य अन्न।'
  },
  {
    id: 'jhumuka',
    nameDev: 'झुमुका धान (सुगंधित पाबोर धान)',
    nameRom: 'Jhumuka Horoc',
    category: 'aromatic_rice',
    color: '#daa520',
    durationDays: 140,
    waterNeed: 'मध्यम (Medium)',
    characteristics: 'पकने पर खेतों में दूर तक कस्तूरी जैसी सुगंध फैलाने वाली महीन देसी प्रजाति।',
    culturalRitual: 'सोहराय और बाहा पाबोर में जाहेर एरा को चढ़ाए जाने वाले विशेष पीठा व खीर (दाका) के लिए अनिवार्य।',
    nutritionalValue: 'प्राकृतिक सुगंधित तेल और ग्लाइसेमिक इंडेक्स का संतुलन; पाचन के लिए उत्तम।'
  },
  {
    id: 'satiya',
    nameDev: 'सतिया धान (६० दिनी भुखमरी नाशक)',
    nameRom: 'Satiya Horoc',
    category: 'drought_rice',
    color: '#b8860b',
    durationDays: 60,
    waterNeed: 'अल्प (Low)',
    characteristics: 'मात्र ६० दिनों में पककर तैयार होने वाला सबसे तीव्र धान। भादो माह में भुखमरी से बचाता है।',
    culturalRitual: 'जब पिछले वर्ष का अन्न समाप्त होने लगता है, तो सतिया काटकर गांव में "नवा खाई" उत्सव मनाया जाता है।',
    nutritionalValue: 'तुरंत ऊर्जा देने वाला हल्का और सुपाच्य धान।'
  },
  {
    id: 'siyarpunch',
    nameDev: 'सियारपूंछ धान (कांटेदार रक्षा धान)',
    nameRom: 'Siyarpunch Horoc',
    category: 'wetland_rice',
    color: '#a0522d',
    durationDays: 125,
    waterNeed: 'मध्यम (Medium)',
    characteristics: 'बालियों पर लंबी मूंछें (Awns) होती हैं, जिससे जंगली सूअर और पक्षी इसे खेत में नहीं खा पाते।',
    culturalRitual: 'जंगल से सटे खेतों की बाहरी बाउंड्री पर सुरक्षा चक्र की तरह बोया जाता है।',
    nutritionalValue: 'सख्त छिलका जो भंडारण में कीड़ों से सुरक्षित रहता है और पौष्टिकता बनाए रखता है।'
  },
  {
    id: 'gundli',
    nameDev: 'गुंदली (लघु मिलेट / कुटकी)',
    nameRom: 'Gundli Millet',
    category: 'millet',
    color: '#d2b48c',
    durationDays: 65,
    waterNeed: 'अल्प (Low)',
    characteristics: 'संथाल आदिम संस्कृति का सबसे प्राचीन कंद-मूल समकक्ष अन्न। सबसे बंजर टांड़ में भी उपजता है।',
    culturalRitual: 'करम पूजा के उपवास में गुंदली की खिचड़ी खाने का पारंपरिक नियम है।',
    nutritionalValue: 'कैल्शियम, प्रोटीन और ग्लूटेन-मुक्त फाइबर का उत्कृष्ट भंडार।'
  },
  {
    id: 'marua',
    nameDev: 'मरुआ / कोदो (रागी मिलेट)',
    nameRom: 'Marua / Kodo',
    category: 'millet',
    color: '#5c4033',
    durationDays: 100,
    waterNeed: 'अल्प (Low)',
    characteristics: 'काले-भूरे महीन दानों वाला पोषण का सम्राट मिलेट। शरीर को ठंडक व असीम बल प्रदान करता है।',
    culturalRitual: 'हूल आंदोलन में संथाल लड़ाके मरुआ की रोटी और भुने हुए दाने पोटली में बांधकर मीलों पैदल चलते थे।',
    nutritionalValue: 'दूध से तीन गुना अधिक कैल्शियम; हड्डियों को पत्थर जैसा मजबूत बनाता है।'
  }
];

export const SantaliIndigenousSeedsHeirloom: React.FC = () => {
  const [selectedSeed, setSelectedSeed] = useState<SeedVariety>(INDIGENOUS_SEEDS[0]);
  const [activeTab, setActiveTab] = useState<'varieties' | 'bandhi_storage' | 'erok_sim_rituals'>('varieties');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredSeeds = filterCategory === 'all'
    ? INDIGENOUS_SEEDS
    : INDIGENOUS_SEEDS.filter(s => s.category === filterCategory);

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
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-emerald-950 border border-amber-800/40 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-800/60 border border-amber-600/40 rounded-full text-xs font-semibold text-amber-200 mb-3">
            <Sprout className="w-3.5 h-3.5" />
            <span>हसली हेर साकाम: संथाल देशज बीज धरोहर</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-amber-100">
            संथाल देशज धान, मिलेट्स व "बंधी" बीज संरक्षण वास्तुकला
          </h1>
          <p className="text-stone-300 text-sm mt-2 leading-relaxed">
            संथाल समाज की प्राचीन कृषि बुद्धिमत्ता ने सहस्राब्दियों से ऐसे चमत्कारी धान व मिलेट्स सहेज कर रखे हैं जो सूखा, बाढ़ और कीटों से बिना किसी रासायनिक खाद के लड़ते हैं। जानिए देसी बीजों और ५ वर्ष तक सुरक्षित रखने वाली "बंधी" तकनीक का रहस्य।
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            <button
              onClick={() => setActiveTab('varieties')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'varieties'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-stone-900/60 hover:bg-stone-800/60 text-stone-200 border border-stone-700/50'
              }`}
            >
              देसी धान व मिलेट ज्ञानकोश
            </button>
            <button
              onClick={() => setActiveTab('bandhi_storage')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'bandhi_storage'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-stone-900/60 hover:bg-stone-800/60 text-stone-200 border border-stone-700/50'
              }`}
            >
              "बंधी" (Bandhi) बीज बैंक वास्तुकला
            </button>
            <button
              onClick={() => setActiveTab('erok_sim_rituals')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'erok_sim_rituals'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-stone-900/60 hover:bg-stone-800/60 text-stone-200 border border-stone-700/50'
              }`}
            >
              एरोक सिम (बुआई पूर्व पावन अनुष्ठान)
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Varieties */}
      {activeTab === 'varieties' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Seeds List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="bg-stone-900 border border-stone-800 rounded-xl p-3 flex flex-wrap gap-1 text-xs">
              {[
                { id: 'all', label: 'सभी बीज' },
                { id: 'medicinal_rice', label: 'औषधीय धान' },
                { id: 'drought_rice', label: 'सूखारोधी' },
                { id: 'wetland_rice', label: 'जल/बाढ़रोधी' },
                { id: 'aromatic_rice', label: 'सुगंधित' },
                { id: 'millet', label: 'मिलेट्स' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFilterCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    filterCategory === cat.id ? 'bg-amber-600 text-white font-bold' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
              {filteredSeeds.map(seed => {
                const isSelected = selectedSeed.id === seed.id;
                return (
                  <div
                    key={seed.id}
                    onClick={() => setSelectedSeed(seed)}
                    className={`p-3.5 rounded-xl cursor-pointer border transition-all ${
                      isSelected
                        ? 'bg-amber-950/70 border-amber-500 shadow-md'
                        : 'bg-stone-900/70 hover:bg-stone-800/60 border-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-amber-200">{seed.nameDev}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-stone-800 text-stone-300">{seed.durationDays} दिन</span>
                    </div>
                    <p className="text-xs text-stone-400 mt-1 line-clamp-1">{seed.characteristics}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Seed Details Card */}
          <div className="lg:col-span-7">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex items-start justify-between pb-4 border-b border-stone-800">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-amber-300">{selectedSeed.nameDev}</h2>
                    <button
                      onClick={() => speakText(selectedSeed.nameDev)}
                      className="p-1.5 bg-amber-900/40 hover:bg-amber-800 text-amber-200 rounded-lg"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-stone-400 text-sm font-mono mt-0.5">{selectedSeed.nameRom}</p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-stone-400 block">परिपक्वता अवधि</span>
                  <span className="text-lg font-bold text-emerald-400">{selectedSeed.durationDays} दिन</span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                  <span className="text-xs text-stone-400 block flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-blue-400" />
                    <span>जल आवश्यकता</span>
                  </span>
                  <span className="text-sm font-semibold text-stone-200 mt-1 block">{selectedSeed.waterNeed}</span>
                </div>

                <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                  <span className="text-xs text-stone-400 block flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>रोग प्रतिरोध</span>
                  </span>
                  <span className="text-sm font-semibold text-stone-200 mt-1 block">अत्यंत उच्च (देसी)</span>
                </div>

                <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                  <span className="text-xs text-stone-400 block flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span>उपयुक्त भूमि</span>
                  </span>
                  <span className="text-sm font-semibold text-stone-200 mt-1 block">टांड़ व जोभड़ा</span>
                </div>
              </div>

              {/* Biological Traits */}
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide block mb-1">
                  वानस्पतिक विशेषताएं व क्षमता
                </span>
                <p className="text-stone-300 text-sm leading-relaxed">{selectedSeed.characteristics}</p>
              </div>

              {/* Cultural & Ritual Role */}
              <div className="bg-amber-950/30 border border-amber-800/40 p-4 rounded-xl">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wide block mb-1">
                  संथाल सांस्कृतिक अनुष्ठान व सामाजिक उपयोग
                </span>
                <p className="text-amber-100/90 text-sm leading-relaxed">{selectedSeed.culturalRitual}</p>
              </div>

              {/* Nutritional Lore */}
              <div className="bg-emerald-950/30 border border-emerald-800/40 p-4 rounded-xl">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide block mb-1">
                  पारंपरिक औषधीय व पोषण मूल्य
                </span>
                <p className="text-emerald-100/90 text-sm leading-relaxed">{selectedSeed.nutritionalValue}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Bandhi Seed Storage */}
      {activeTab === 'bandhi_storage' && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-6 max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-amber-300">"बंधी" (Bandhi) - ५ वर्ष तक जीवित रहने वाली देसी बीज बैंक तकनीक</h3>
            <p className="text-stone-300 text-sm mt-1 max-w-2xl mx-auto">
              संथाल पूर्वजों ने बिना किसी रासायनिक कीटनाशक के धान के बीजों को ५ से ७ वर्षों तक १००% अंकुरण क्षमता के साथ सुरक्षित रखने की यह अनूठी तकनीक खोजी थी।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-stone-950 p-5 rounded-xl border border-stone-800 space-y-2">
              <span className="text-amber-400 font-bold text-base block">१. पुआल की मोटी रस्सी (बोड़)</span>
              <p className="text-stone-300 text-xs leading-relaxed">
                धान के सूखे पुआल को हाथ से ऐंठकर २०-३० मीटर लंबी मजबूत रस्सी 'बोड़' बनाई जाती है। यह पुआल बाहरी नमी और फंगस को बीजों तक पहुंचने से रोकता है।
              </p>
            </div>

            <div className="bg-stone-950 p-5 rounded-xl border border-stone-800 space-y-2">
              <span className="text-amber-400 font-bold text-base block">२. नीम, करंज व करहानी परत</span>
              <p className="text-stone-300 text-xs leading-relaxed">
                अंदर बीजों के बीच सूखी नीम की पत्तियां, करंज की खली और करहानी धान की भूसी का लेप मिलाया जाता है, जिससे घुन और दीमक पास नहीं फटकते।
              </p>
            </div>

            <div className="bg-stone-950 p-5 rounded-xl border border-stone-800 space-y-2">
              <span className="text-amber-400 font-bold text-base block">३. वायुरोधी संपीड़न (Air-Tight)</span>
              <p className="text-stone-300 text-xs leading-relaxed">
                बोड़ रस्सी को गोल-गोल लपेटकर अंदर बीजों को दबाकर भरा जाता है। अंदर ऑक्सीजन की मात्रा नगण्य होने के कारण बीज सुषुप्तावस्था (dormancy) में चले जाते हैं।
              </p>
            </div>
          </div>

          <div className="bg-stone-950 p-5 rounded-xl border border-stone-800">
            <h4 className="text-base font-bold text-emerald-400 mb-2">बंधी का महत्व: अकाल के समय गांव का सहारा</h4>
            <p className="text-stone-300 text-xs leading-relaxed">
              संथाल गांव में जब किसी किसान का घर जल जाता था या अकाल पड़ता था, तो मांझी बाबा गांव की आरक्षित 'मांझी बंधी' खोलकर पूरे गांव में प्रति परिवार १ पाई बीज वितरित करते थे। इसे 'हापड़ाम कोवाः हसली' (पुरखों का बीज-धन) कहा जाता है।
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Erok Sim Ritual */}
      {activeTab === 'erok_sim_rituals' && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-6 max-w-3xl mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-amber-200">एरोक सिम (Erok Sim) - प्रथम बुआई पूजा</h3>
            <p className="text-stone-400 text-xs mt-1">आषाढ़ माह में खेतों में हल चलाने और बीज डालने से पहले जाहेर थान में होने वाली सामूहिक प्रार्थना</p>
          </div>

          <div className="bg-stone-950 p-5 rounded-xl border border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-emerald-400">नायके बाबा की पावन प्रार्थना (संथाली उच्चारण)</span>
              <button
                onClick={() => speakText("जाहेर एरा, मारंग बुरु, मोड़ेको-तुरूइको, अबोवाः खेत रे दाक्-जपाय दहो-काक-पे, बिद दाना हेर-अकाद-आले")}
                className="p-1.5 bg-emerald-900/50 text-emerald-200 rounded-lg hover:bg-emerald-800"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-amber-100 font-serif text-sm leading-relaxed italic">
              "जोहार गो जाहेर एरा! जोहार मारंग बुरु!<br />
              अबोवाः दिशोम रे, अबोवाः आतु रे<br />
              दाक्-जपाय खाराप आलो हुयुक्-मा...<br />
              मित्-टांग दाना हेर-लेरे, गेल-टांग गोछा ओड़ोक-मा!"
            </p>
            <div className="text-xs text-stone-300 pt-3 border-t border-stone-800">
              <strong>हिंदी अनुवाद:</strong> हे ग्रामदेवी जाहेर एरा! हे मारंग बुरु! हमारे देश और गांव में सूखा या अकाल न पड़े। जब हम खेत में एक मुट्ठी बीज डालें, तो वह दस गुनी सुनहरी बालियों में लहराए। हमारे बैलों और किसानों की रक्षा करना।
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
