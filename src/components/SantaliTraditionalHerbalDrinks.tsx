import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
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
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  RotateCcw
} from 'lucide-react';

export interface HerbalDrinkItem {
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

export const DEFAULT_HERBAL_DRINKS: HerbalDrinkItem[] = [
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
  const { isAdmin } = useAdmin();
  const STORAGE_KEY = 'hor_katha_herbal_drinks_db';

  const [drinks, setDrinks] = useState<HerbalDrinkItem[]>(() =>
    safeLoadFromStorage<HerbalDrinkItem[]>(STORAGE_KEY, DEFAULT_HERBAL_DRINKS)
  );
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedDrink, setSelectedDrink] = useState<HerbalDrinkItem>(drinks[0] || DEFAULT_HERBAL_DRINKS[0]);

  // Admin Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<HerbalDrinkItem | null>(null);
  const [formData, setFormData] = useState<Partial<HerbalDrinkItem>>({});
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const saveDrinks = (updated: HerbalDrinkItem[]) => {
    setDrinks(updated);
    safeSaveToStorage(STORAGE_KEY, updated);
    if (!updated.some((d) => d.id === selectedDrink.id) && updated.length > 0) {
      setSelectedDrink(updated[0]);
    }
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setFormData({
      id: `drink_${Date.now()}`,
      nameDevanagari: '',
      nameRoman: '',
      category: 'daily_health',
      categoryHindi: 'दैनिक स्वास्थ्य पेय',
      mainIngredients: ['वनौषधि / फूल', 'शुद्ध जल'],
      healthBenefits: '',
      preparationMethod: '',
      culturalEtiquetteNote: '',
      imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: HerbalDrinkItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`क्या आप सचमुच "${name}" पेय को हटाना चाहते हैं?`)) {
      const updated = drinks.filter((d) => d.id !== id);
      saveDrinks(updated);
      showNotification(`"${name}" पेय हटा दिया गया!`);
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameDevanagari || !formData.healthBenefits) {
      alert('कृपया पेय का नाम और स्वास्थ्य लाभ अवश्य भरें।');
      return;
    }

    if (editingItem) {
      const updated = drinks.map((d) =>
        d.id === editingItem.id ? ({ ...d, ...formData } as HerbalDrinkItem) : d
      );
      saveDrinks(updated);
      if (selectedDrink.id === editingItem.id) {
        setSelectedDrink({ ...selectedDrink, ...formData } as HerbalDrinkItem);
      }
      showNotification('पेय विवरण सफलतापूर्वक अपडेट हो गया!');
    } else {
      const newItem: HerbalDrinkItem = {
        id: formData.id || `drink_${Date.now()}`,
        nameDevanagari: formData.nameDevanagari || '',
        nameRoman: formData.nameRoman || '',
        category: formData.category || 'daily_health',
        categoryHindi: formData.categoryHindi || 'स्वास्थ्य पेय',
        mainIngredients: formData.mainIngredients || ['वन-सामग्री'],
        healthBenefits: formData.healthBenefits || '',
        preparationMethod: formData.preparationMethod || '',
        culturalEtiquetteNote: formData.culturalEtiquetteNote || '',
        imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80'
      };
      saveDrinks([...drinks, newItem]);
      setSelectedDrink(newItem);
      showNotification('नया पारंपरिक पेय जुड़ गया!');
    }
    setIsModalOpen(false);
  };

  const handleResetToDefault = () => {
    if (confirm('क्या आप सचमुच सभी पेय फ़ैक्टरी डिफ़ॉल्ट पर रीसेट करना चाहते हैं?')) {
      saveDrinks(DEFAULT_HERBAL_DRINKS);
      setSelectedDrink(DEFAULT_HERBAL_DRINKS[0]);
      showNotification('सभी पेय मूल स्वरूप में रीसेट हो गए!');
    }
  };

  const handleSpeak = (text: string) => {
    speakWithFemaleVoice(text, { lang: 'hi-IN', rate: 0.88 });
  };

  const filteredDrinks = drinks.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {feedbackMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-700 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in slide-in-from-bottom">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>{feedbackMsg}</span>
        </div>
      )}

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

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-emerald-300">
            <span className="flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{drinks.length} पारंपरिक देशी पेय व विधियां</span>
            </span>
            <span>•</span>
            <span>रानू-रान 21 जड़ी-बूटियों का औषधीय विज्ञान</span>

            {isAdmin && (
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={handleAddNew}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-transform hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  <span>नया पेय जोड़ें (Add Drink)</span>
                </button>
                <button
                  onClick={handleResetToDefault}
                  className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-emerald-200 font-bold text-xs flex items-center gap-1.5 border border-white/20 cursor-pointer"
                  title="डिफ़ॉल्ट पर रीसेट करें"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>रीसेट</span>
                </button>
              </div>
            )}
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

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeak(`${item.nameDevanagari}. लाभ: ${item.healthBenefits}`);
                      }}
                      className="p-1 text-slate-500 hover:text-emerald-700 rounded-md cursor-pointer"
                      title="सुनें"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    {isAdmin && (
                      <div className="flex items-center gap-0.5 ml-1 pl-1 border-l border-slate-200">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(item);
                          }}
                          className="p-1 text-emerald-700 hover:text-emerald-900 rounded-md cursor-pointer"
                          title="संपादित करें (Admin Edit)"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item.id, item.nameDevanagari);
                          }}
                          className="p-1 text-rose-600 hover:text-rose-800 rounded-md cursor-pointer"
                          title="हटाएं (Admin Delete)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
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
      {/* Admin CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-emerald-300 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-black text-slate-900">
                  {editingItem ? 'पारंपरिक पेय विवरण संपादित करें (Edit Drink)' : 'नया पारंपरिक पेय जोड़ें (Add Drink)'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    पेय का नाम (देवनागरी) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nameDevanagari || ''}
                    onChange={(e) => setFormData({ ...formData, nameDevanagari: e.target.value })}
                    placeholder="उदा: मातकोम रसा (महुआ शरबत)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    पेय का नाम (Roman Script)
                  </label>
                  <input
                    type="text"
                    value={formData.nameRoman || ''}
                    onChange={(e) => setFormData({ ...formData, nameRoman: e.target.value })}
                    placeholder="उदा: Matkom Rasa"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    श्रेणी (Category)
                  </label>
                  <select
                    value={formData.category || 'daily_health'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-800"
                  >
                    <option value="daily_health">🍵 दैनिक स्वास्थ्य पेय (Daily Health)</option>
                    <option value="cooling">❄️ शीतल पाचक शरबत (Cooling)</option>
                    <option value="sacred_ritual">🪔 धार्मिक व सांस्कृतिक पेय (Sacred Brew)</option>
                    <option value="medicinal">🌿 वनौषधीय काढ़ा (Medicinal Tonic)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    श्रेणी लेबल (हिन्दी)
                  </label>
                  <input
                    type="text"
                    value={formData.categoryHindi || ''}
                    onChange={(e) => setFormData({ ...formData, categoryHindi: e.target.value })}
                    placeholder="उदा: शीतल पाचक शरबत"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  स्वास्थ्य लाभ व गुण (Health Benefits) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.healthBenefits || ''}
                  onChange={(e) => setFormData({ ...formData, healthBenefits: e.target.value })}
                  placeholder="प्राकृतिक ग्लूकोज, कैल्शियम और आयरन से भरपूर..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  पारंपरिक निर्माण विधि (Preparation Method)
                </label>
                <textarea
                  rows={2}
                  value={formData.preparationMethod || ''}
                  onChange={(e) => setFormData({ ...formData, preparationMethod: e.target.value })}
                  placeholder="सुबह वनों से ताजे गिरे महुआ के फूलों को चुनकर..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  सांस्कृतिक मर्यादा व नियम (Cultural Etiquette)
                </label>
                <textarea
                  rows={2}
                  value={formData.culturalEtiquetteNote || ''}
                  onChange={(e) => setFormData({ ...formData, culturalEtiquetteNote: e.target.value })}
                  placeholder="सांस्कृतिक मर्यादा: इसे दवा और प्रसाद के रूप में..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  तस्वीर URL (Image URL)
                </label>
                <input
                  type="url"
                  value={formData.imageUrl || ''}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>सहेजें (Save)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
