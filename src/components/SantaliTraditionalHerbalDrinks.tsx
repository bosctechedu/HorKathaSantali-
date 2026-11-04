import React, { useState } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  Coffee,
  Volume2,
  Sparkles,
  Heart,
  ShieldCheck,
  Leaf,
  Info,
  CheckCircle2,
  Layers,
  Flame,
  AlertTriangle
} from 'lucide-react';

interface HerbalDrinkItem {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  category: 'daily_health' | 'sacred_ritual' | 'cooling' | 'medicinal';
  categoryHindi: string;
  mainIngredients: string[];
  healthBenefits: string;
  preparationMethod: string;
  culturalEtiquetteNote: string;
  imageUrl: string;
}

const TRADITIONAL_DRINKS: HerbalDrinkItem[] = [
  {
    id: 'dr1',
    nameDevanagari: 'मातकोम रसा (महुआ फूल का शरबत व रस)',
    nameRoman: 'Matkom Rasa',
    category: 'cooling',
    categoryHindi: 'शीतल पाचक शरबत (Cooling Drink)',
    mainIngredients: ['ताज़े महुआ के फूल (Matkom Baha)', 'जल (Dah)', 'हल्की सोंठ व काली मिर्च'],
    healthBenefits: 'प्राकृतिक ग्लूकोज, कैल्शियम और आयरन से भरपूर। गर्मी में लू (लोलो होय) से बचाता है और शारीरिक दुर्बलता को दूर कर तुरंत ऊर्जा देता है।',
    preparationMethod: 'सुबह-सुबह वनों से ताज़े गिरे महुआ के फूलों को चुनकर धोया जाता है। उन्हें मिट्टी के बर्तन में धीमी आंच पर उबालकर गाढ़ा काढ़ा या रस छानकर पिया जाता है।',
    culturalEtiquetteNote: 'चैत्र और बैसाख के महीनों में परिवार के सभी सदस्य खेतों में जाने से पहले मातकोम रसा का सेवन करते हैं।',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dr2',
    nameDevanagari: 'हांडिया / पोचोई (रानू-रान युक्त पावन पेय)',
    nameRoman: 'Handia / Pochoi',
    category: 'sacred_ritual',
    categoryHindi: 'धार्मिक व सांस्कृतिक पेय (Sacred Fermented Brew)',
    mainIngredients: ['उसना चावल (Chaole)', 'रानू रान (21 जंगली औषधीय जड़ें)', 'कुदुरुम व सतावर'],
    healthBenefits: 'रानू-रान की प्राकृतिक जड़ी-बूटियों के कारण यह पेय पेट को अत्यधिक ठंडक पहुंचाता है, कड़ी धूप में डिहाइड्रेशन रोकता है और पाचन तंत्र को बल देता है।',
    preparationMethod: 'पके हुए चावल में सूखी रानू-जड़ी बूटियों की टिकिया को मिलाकर मिट्टी की हांडी में 3-4 दिन छायादार स्थान पर किण्वित (ferment) किया जाता है।',
    culturalEtiquetteNote: 'सांस्कृतिक मर्यादा: इसे कभी भी नशे के लिए नहीं, बल्कि दवा और प्रसाद के रूप में पिया जाता है। किसी भी पर्व में सबसे पहले मरांग बुरु और जाहेर एरा को धरती पर तीन बूंदें अर्पित (तपां) की जाती हैं।',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dr3',
    nameDevanagari: 'इचाक् बाहा देशी हर्बल चाय (धवई फूल चाय)',
    nameRoman: 'Ichah Baha Tea',
    category: 'daily_health',
    categoryHindi: 'वन्य हर्बल चाय (Native Herbal Tea)',
    mainIngredients: ['इचाक् के लाल फूल (Woodfordia fruticosa)', 'तुलसी के पत्ते', 'गुड़ या शहद'],
    healthBenefits: 'लाल रंग की यह चाय हीमोग्लोबिन बढ़ाती है, रक्त शुद्धि करती है और महिलाओं के मासिक चक्र व शारीरिक कमजोरी में अत्यंत लाभकारी मानी जाती है।',
    preparationMethod: 'सूखे इचाक के फूलों को खौलते पानी में 5 मिनट उबाला जाता है, जिससे सुंदर लाल काढ़ा तैयार होता है। स्वाद अनुसार देशी गुड़ मिलाया जाता है।',
    culturalEtiquetteNote: 'संताली गृहणियां शाम के समय थकान मिटाने के लिए अतिथियों को यह सुगंधित वन-चाय भेंट करती हैं।',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dr4',
    nameDevanagari: 'मांडी दाक् / तोड़ा दाक् (चावल मांड ऊर्जा पेय)',
    nameRoman: 'Mandi Dah / Toda Dah',
    category: 'daily_health',
    categoryHindi: 'दैनिक शक्ति पेय (Farmer Energy Broth)',
    mainIngredients: ['उबले देशी लाल चावल का मांड (Mandi Dah)', 'हल्का सेंधा नमक', 'भुना जीरा'],
    healthBenefits: 'विटामिन बी-कॉम्प्लेक्स, इलेक्ट्रोलाइट्स और कार्बोहाइड्रेट का असीम भंडार। यह संताली कृषकों को भरी दोपहरी में खेत जोतने की ताकत देता है।',
    preparationMethod: 'देशी मिट्टी के बर्तन में भात पकाने के बाद निकलने वाले गाढ़े मांड में चुटकी भर नमक डालकर मथ लिया जाता है।',
    culturalEtiquetteNote: 'संताली घरों में सुबह का यह अनिवार्य पेय है, जो शरीर के तापमान को संतुलित रखता है।',
    imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dr5',
    nameDevanagari: 'बेल दाक् शरबत (पके बेल का अर्क)',
    nameRoman: 'Bel Dah Sharbat',
    category: 'cooling',
    categoryHindi: 'उदर शांति व पाचक (Stomach Cleanser)',
    mainIngredients: ['पका जंगली बेल (Bel Jo)', 'ठंडा कुएं का जल', 'देशी गुड़'],
    healthBenefits: 'आंतों की समस्त विषैली गंदगी को बाहर निकालता है, कब्ज व पेचिश (पेचिस) को जड़ से मिटाता है और ग्रीष्म ऋतु में अमृत समान है।',
    preparationMethod: 'बेल के कठोर आवरण को तोड़कर गूदा निकाला जाता है और ठंडे पानी में हाथों से मसलकर बीजों को छान लिया जाता है।',
    culturalEtiquetteNote: 'ज्येष्ठ और आषाढ़ के महीनों में जब खेतों में काम शुरू होता है, तब यह पेय दोपहर में पिया जाता है।',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dr6',
    nameDevanagari: 'कुड़ा दाक् (देशी जामुन सिरका व रस)',
    nameRoman: 'Kuda Dah Vinegar',
    category: 'medicinal',
    categoryHindi: 'औषधीय अर्क (Medicinal Vinegar)',
    mainIngredients: ['जंगली काले जामुन (Kuda Jo)', 'मिट्टी का घड़ा', 'प्राकृतिक धूप'],
    healthBenefits: 'मधुमेह (डायबिटीज), तिल्ली (प्लीहा) के रोग, गैस और भूख न लगने की समस्या में रामबाण औषधि।',
    preparationMethod: 'पके जामुनों के रस को मिट्टी के घड़े में बंद कर 40 दिनों तक धूप में किण्वित किया जाता है।',
    culturalEtiquetteNote: 'संताली वैद्य (रानिकिया) इसे साल भर सुरक्षित रखकर औषधियां बनाने में अनुपान के रूप में प्रयोग करते हैं।',
    imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dr7',
    nameDevanagari: 'नीम व करंज छाल काढ़ा (रान काढ़ा)',
    nameRoman: 'Neem & Karanj Decoction',
    category: 'medicinal',
    categoryHindi: 'ज्वर व रक्त शोधक (Fever & Blood Purifier)',
    mainIngredients: ['नीम की छाल', 'करंज की छाल', 'गिलोय लता', 'हल्दी'],
    healthBenefits: 'बरसात के मौसम में होने वाले मलेरिया, वायरल बुखार और चर्म रोगों को रोकने वाला शक्तिशाली एंटी-बायोटिक पेय।',
    preparationMethod: 'छालों को कूटकर पानी में तब तक खौलाया जाता है जब तक पानी आधा न रह जाए।',
    culturalEtiquetteNote: 'सावन मास में सप्ताह में एक बार बच्चों और बड़ों को 2-2 चम्मच पिलाने की स्वस्थ परंपरा है।',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dr8',
    nameDevanagari: 'बीर सोंसोर रसा (वन-शहद व तुलसी अमृत)',
    nameRoman: 'Bir Sonsor Rasa',
    category: 'daily_health',
    categoryHindi: 'प्रतिरोधक अमृत (Forest Honey Elixir)',
    mainIngredients: ['जंगली सखुआ वन का शहद (Bir Nindur Rasa)', 'वन-तुलसी रस', 'अदरक'],
    healthBenefits: 'रोग प्रतिरोधक क्षमता (Immunity) को कई गुना बढ़ाता है, फेफड़ों को शुद्ध रखता है और कफ-खांसी को शांत करता है।',
    preparationMethod: 'जंगल से तोड़े गए ताजे छत्तों के शुद्ध शहद में तुलसी रस मिलाकर सुबह खाली पेट सेवन किया जाता है।',
    culturalEtiquetteNote: 'सेंदरा में जाने वाले शिकारियों को यह काढ़ा दिया जाता है ताकि वनों में ठंड और संक्रमण से बचाव रहे।',
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80'
  }
];

export const SantaliTraditionalHerbalDrinks: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedDrink, setSelectedDrink] = useState<HerbalDrinkItem>(TRADITIONAL_DRINKS[0]);

  const handleSpeak = (text: string) => {
    speakWithFemaleVoice(text, { lang: 'hi-IN', rate: 0.88 });
  };

  const filteredDrinks = TRADITIONAL_DRINKS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 text-white p-6 md:p-8 shadow-xl relative overflow-hidden border border-emerald-500/30">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-bold uppercase tracking-wider">
            <Coffee className="w-3.5 h-3.5 text-emerald-400" />
            <span>हपड़ाम कोवाक् रान दाक् व पोचोई · Native Teas, Tonics & Herbal Brews</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-emerald-100 tracking-tight">
            संताली पारंपरिक पेय व प्राकृतिक शरबत (Traditional Native Drinks)
          </h1>

          <p className="text-xs md:text-sm text-emerald-200/90 leading-relaxed font-sans">
            मातकोम रसा (महुआ शरबत), इचाक् बाहा लाल चाय, मांडी दाक् (ऊर्जा पेय), बेल शरबत और रानू-युक्त पावन पोचोई—संताली पूर्वजों के प्राकृतिक स्वास्थ्य पेय, उनकी निर्माण विधि और सांस्कृतिक मर्यादा।
          </p>

          <div className="flex items-center gap-3 pt-1 text-xs text-emerald-300">
            <span className="flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>8 पारंपरिक देशी पेय व विधियां</span>
            </span>
            <span>•</span>
            <span>रानू-रान 21 जड़ी-बूटियों का औषधीय विज्ञान</span>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        {[
          { id: 'all', label: 'समस्त पेय (All 8)' },
          { id: 'cooling', label: '❄️ शीतल पाचक शरबत (Cooling)' },
          { id: 'daily_health', label: '🌿 दैनिक शक्ति व चाय (Daily Tonics)' },
          { id: 'medicinal', label: '🧪 औषधीय काढ़ा व अर्क (Medicinal)' },
          { id: 'sacred_ritual', label: '🌾 पावन सांस्कृतिक पेय (Sacred Brew)' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2 rounded-xl shrink-0 font-bold transition-all cursor-pointer ${
              activeCategory === tab.id
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Left Items + Right Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Drinks Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredDrinks.map((item) => {
            const isSelected = selectedDrink.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedDrink(item)}
                className={`rounded-2xl p-4 transition-all cursor-pointer border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-50/80 border-emerald-500 shadow-md ring-2 ring-emerald-400/40'
                    : 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                      {item.categoryHindi.split('(')[0]}
                    </span>
                    <span className="text-[10px] font-mono font-medium text-amber-700">
                      {item.nameRoman}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900">
                    {item.nameDevanagari}
                  </h3>

                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {item.healthBenefits}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-500 truncate max-w-[150px]">
                    {item.mainIngredients[0]}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeak(`${item.nameDevanagari}. लाभ: ${item.healthBenefits}`);
                    }}
                    className="p-1 text-slate-500 hover:text-emerald-700 rounded-md"
                    title="सुनें"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Deep Recipe & Cultural Viewer */}
        <div className="lg:col-span-5 sticky top-4 bg-white rounded-3xl border border-emerald-200 p-5 md:p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                पेय विधि व औषधीय गुण · Drink Spotlight
              </span>
              <h2 className="text-xl font-black text-slate-900">
                {selectedDrink.nameDevanagari}
              </h2>
            </div>

            <button
              onClick={() => handleSpeak(`${selectedDrink.nameDevanagari}. स्वास्थ्य लाभ: ${selectedDrink.healthBenefits}. विधि: ${selectedDrink.preparationMethod}. सांस्कृतिक मर्यादा: ${selectedDrink.culturalEtiquetteNote}`)}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>ऑडियो सुनें</span>
            </button>
          </div>

          {/* Image */}
          <div className="w-full h-44 rounded-2xl overflow-hidden bg-slate-950 relative border border-slate-200">
            <img
              src={selectedDrink.imageUrl}
              alt={selectedDrink.nameDevanagari}
              className="w-full h-full object-cover filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-2.5 left-3 right-3 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wide bg-emerald-600 text-white px-2 py-0.5 rounded">
                वर्ग: {selectedDrink.categoryHindi}
              </span>
              <p className="text-xs font-semibold text-emerald-200 mt-1">
                घटक: {selectedDrink.mainIngredients.join(', ')}
              </p>
            </div>
          </div>

          {/* Health Benefits */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-600" />
              <span>स्वास्थ्य लाभ व गुण:</span>
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed bg-emerald-50/60 p-3 rounded-xl border border-emerald-200/60 font-medium">
              {selectedDrink.healthBenefits}
            </p>
          </div>

          {/* Preparation Method */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>पारंपरिक निर्माण विधि (Preparation):</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              {selectedDrink.preparationMethod}
            </p>
          </div>

          {/* Cultural Etiquette / Sacred Decorum */}
          <div className="space-y-1 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>सांस्कृतिक मर्यादा व नियम:</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed bg-amber-50/50 p-2.5 rounded-xl border border-amber-200/50">
              {selectedDrink.culturalEtiquetteNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
