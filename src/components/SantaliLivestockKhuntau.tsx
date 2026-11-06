import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  Sparkles,
  Volume2,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  RotateCcw,
  CheckCircle2,
  Layers,
  HelpCircle,
  HeartHandshake,
  Activity,
  Shield,
  CircleDot
} from 'lucide-react';

export interface LivestockItem {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  titleHindi: string;
  category: 'khuntau_ritual' | 'ethno_veterinary' | 'cattle_care_decor' | 'dangra_bakher';
  categoryLabel: string;
  ritualSeason: string;
  santaliChantOrLore: string;
  traditionalPreparation: string;
  culturalEcologyLore: string;
  badge: string;
}

export const DEFAULT_LIVESTOCK_ITEMS: LivestockItem[] = [
  {
    id: 'khuntau_sohrai',
    nameDevanagari: 'खूंटाव पर्व व गाय जगावे (Khuntau ar Gai Jagawe)',
    nameRoman: 'Khuntau Parab ar Gai Jagawe',
    titleHindi: 'सोहराय का ऐतिहासिक बैल-नृत्य व पशु वंदन अनुष्ठान',
    category: 'khuntau_ritual',
    categoryLabel: 'खूंटाव अनुष्ठान',
    ritualSeason: 'सोहराय महापर्व (कार्तिक/पौष अमावस्या के दूसरे व तीसरे दिन)',
    santaliChantOrLore: '"जागे जागे गोड़ा गाई, जागे जागे गोड़ा डांगरा, बोंगा लेका सुलुम रे ताहेन पे" - गौशाला के पशुओं को जागृत कर उनका वंदन करना।',
    traditionalPreparation: 'गांव की कुल्ही (सड़क) के बीचों-बीच साल/महुआ का मजबूत खूंटा गाड़कर उसे धान की हरी बालियों और पलाश फूलों से सजाया जाता है।',
    culturalEcologyLore: 'संताल समाज में कृषि का मुख्य आधार पशुधन है। खूंटाव में बैलों के सामने सूखी चमड़े की ढोलक (धमसा) हिलाकर उनकी फुर्ती, बल और बहादुरी की प्रशंसा की जाती है।',
    badge: 'पवित्र खूंटाव'
  },
  {
    id: 'dangra_bakher_prayer',
    nameDevanagari: 'दांगरा बाखेड़ (Dangra Bakher - पशुधन कल्याण प्रार्थना)',
    nameRoman: 'Dangra Bakher',
    titleHindi: 'गोड़ा बोंगा के समक्ष गाय-बैलों की रक्षा हेतु पारंपरिक मंत्र',
    category: 'dangra_bakher',
    categoryLabel: 'पवित्र प्रार्थना',
    ritualSeason: 'गोड़ा पूजा की सुबह व नए बछड़े के जन्म पर',
    santaliChantOrLore: '"ए गोड़ा बोंगा, रोगा-आजाब आलो बाजावः मा, हाति लेका डांगरा, हाना गोड़ा रे सुलुम-निरोप ताहेन मा।" - हे गोड़ा बोंगा, हमारे पशुओं को रोगों से बचाएं।',
    traditionalPreparation: 'गौशाला के मुख्य द्वार पर अरवा चावल का चूर्ण (होलों) और सिंदूर से तीन पवित्र बिंदु बनाए जाते हैं और दूब घास अर्पित की जाती है।',
    culturalEcologyLore: 'संताल विश्वास के अनुसार पशु केवल संपत्ति नहीं, बल्कि परिवार के सदस्य हैं। वर्ष में एक बार उन्हें हल से विश्राम देकर उनका चरण स्पर्श किया जाता है।',
    badge: 'पशु-कल्याण मंत्र'
  },
  {
    id: 'ethno_vet_khurpaka',
    nameDevanagari: 'खुरपका व मुंहपका पारंपरिक उपचार (Ethno-Vet Medicine)',
    nameRoman: 'Khur ar Moca Rog Ran',
    titleHindi: 'खुर व मुंह के छालों का प्राकृतिक वन-औषधि उपचार',
    category: 'ethno_veterinary',
    categoryLabel: 'पारंपरिक गौ-रान (चिकित्सा)',
    ritualSeason: 'बरसात और आश्विन मास (रोग संक्रमण काल)',
    santaliChantOrLore: 'साल की छाल का काढ़ा और नीम तेल का जीवाणुरोधी लेप।',
    traditionalPreparation: 'साल (Sarjom) की भीतरी छाल और भेलवा के फल को कूटकर करंज के तेल में पकाया जाता है। खुर के घाव पर लगाने से कीड़े मर जाते हैं और घाव तुरंत भरता है।',
    culturalEcologyLore: 'संताल ओझा व बुजुर्ग चरवाहे जंगल की दुर्लभ जड़ी-बूटियों से पशुओं की जटिल बीमारियों को बिना किसी रासायनिक दवा के ठीक करने का ज्ञान रखते हैं।',
    badge: 'देशी गौ-रान'
  },
  {
    id: 'cattle_horn_painting',
    nameDevanagari: 'सींग रंगाई व चुमावड़ा (Horn Painting ar Chumawda)',
    nameRoman: 'Dengra Dereng Rang ar Chumawda',
    titleHindi: 'सोहराय में बैलों के सींगों पर प्राकृतिक तेल-सिंदूर श्रृंगार',
    category: 'cattle_care_decor',
    categoryLabel: 'पशु श्रृंगार व पोषण',
    ritualSeason: 'सोहराय की गोड़ा पूजा (Got Tandi)',
    santaliChantOrLore: 'सींगों को चिकना कर सरसों/महुआ तेल लगाना और सिर पर धान की बालियों का मुकुट (मोर) बांधना।',
    traditionalPreparation: 'महुआ तेल में सिंदूर व काजल मिलाकर सींगों पर लाल-काली पट्टियां बनाई जाती हैं। गले में लकड़ी की घंटी (तोका) बांधी जाती है।',
    culturalEcologyLore: 'तेल लगाने से सींगों में दरारें नहीं पड़तीं और मक्खी-मच्छर दूर रहते हैं। यह पशुओं के प्रति कृतज्ञता प्रकट करने का संताली संस्कार है।',
    badge: 'सींग श्रृंगार'
  },
  {
    id: 'ethno_vet_stomach',
    nameDevanagari: 'पेट फूलना व अपच निवारक काढ़ा (Pet Phulna Ran)',
    nameRoman: "Lac' Haso ar Phulau Ran",
    titleHindi: 'पशुओं में गीली घास खाने से होने वाले अफारे का इलाज',
    category: 'ethno_veterinary',
    categoryLabel: 'पारंपरिक गौ-रान (चिकित्सा)',
    ritualSeason: 'वर्षा ऋतु में नई घास चरने के समय',
    santaliChantOrLore: 'अदरक, हींग, काला नमक और महुआ मद्य का संतुलित अर्क।',
    traditionalPreparation: 'जंगली अदरक (अदा), अजवाइन और चिरायता को पीसकर गर्म पानी में महुआ के अर्क के साथ मिलाकर बांस के पोंगे (चुंगा) से बैल के हलक में उतारा जाता है।',
    culturalEcologyLore: 'यह उपचार 30 मिनट में पशु के पेट की गैस और दर्द को शांत कर देता है। संताल किसान इसे सदियों से सुरक्षित रखे हुए हैं।',
    badge: 'अपच निवारण'
  }
];

export const KHUNTAU_STEPS = [
  {
    step: '1. खूंटा रोपण',
    santaliTerm: 'खूंटा बिद (Khunta Bid)',
    desc: 'गांव की कुलही में साल का मजबूत खूंटा गाड़कर अरवा चावल व सिंदूर से बोंगा अर्पण।'
  },
  {
    step: '2. सींग श्रृंगार',
    santaliTerm: 'देरेंग तेल (Horn Oiling)',
    desc: 'महुआ तेल, सिंदूर से सींगों की पॉलिश और सिर पर धान की बालियों का सुशोभित मुकुट।'
  },
  {
    step: '3. गाई जगावे',
    santaliTerm: 'गाई जगावे सेरेञ (Chant)',
    desc: 'रातभर मांदर-धमसा बजाकर गौशाला में पशुओं को गीत गाकर जगाना और आशीष देना।'
  },
  {
    step: '4. खूंटाव नर्तन',
    santaliTerm: 'खूंटाव एनेच (Dance)',
    desc: 'खूंटे से बंधे बलशाली बैलों के सामने पारंपरिक चमड़े की ढाल हिलाकर वीरता व उमंग का प्रदर्शन।'
  }
];

export const SantaliLivestockKhuntau: React.FC = () => {
  const { isAdmin } = useAdmin();
  const STORAGE_KEY = 'hor_katha_livestock_db';

  const [items, setItems] = useState<LivestockItem[]>(() =>
    safeLoadFromStorage<LivestockItem[]>(STORAGE_KEY, DEFAULT_LIVESTOCK_ITEMS)
  );

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeStep, setActiveStep] = useState<number>(0);

  // Admin CRUD state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LivestockItem | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const saveItems = (updated: LivestockItem[]) => {
    setItems(updated);
    safeSaveToStorage(STORAGE_KEY, updated);
  };

  const handleResetToDefault = () => {
    if (window.confirm('क्या आप गोड़ा-पशुधन डेटा को मूल डिफॉल्ट पर रीसेट करना चाहते हैं?')) {
      saveItems(DEFAULT_LIVESTOCK_ITEMS);
      showNotification('डेटा डिफॉल्ट पर रीसेट कर दिया गया!');
    }
  };

  const handleDeleteItem = (id: string, name: string) => {
    if (window.confirm(`क्या आप "${name}" को हटाना चाहते हैं?`)) {
      const updated = items.filter((it) => it.id !== id);
      saveItems(updated);
      showNotification(`"${name}" सफलतापूर्वक हटाया गया!`);
    }
  };

  const handleOpenAdd = () => {
    setEditingItem({
      id: `livestock_${Date.now()}`,
      nameDevanagari: '',
      nameRoman: '',
      titleHindi: '',
      category: 'khuntau_ritual',
      categoryLabel: 'खूंटाव अनुष्ठान',
      ritualSeason: 'सोहराय पर्व',
      santaliChantOrLore: '',
      traditionalPreparation: '',
      culturalEcologyLore: '',
      badge: 'नया पशु ज्ञान'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: LivestockItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.nameDevanagari.trim() || !editingItem.titleHindi.trim()) {
      alert('कृपया नाम और हिंदी शीर्षक भरें!');
      return;
    }

    const index = items.findIndex((it) => it.id === editingItem.id);
    let updated: LivestockItem[];
    if (index >= 0) {
      updated = [...items];
      updated[index] = editingItem;
      showNotification(`"${editingItem.titleHindi}" अपडेट कर दिया गया!`);
    } else {
      updated = [editingItem, ...items];
      showNotification(`"${editingItem.titleHindi}" नया आइटम जोड़ा गया!`);
    }

    saveItems(updated);
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const filteredItems = items.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.nameDevanagari.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nameRoman.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.titleHindi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.traditionalPreparation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.santaliChantOrLore.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 p-4 md:p-8">
      {/* Top Banner & Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-orange-50/80 via-stone-50 to-amber-50/70 border border-orange-200/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-700 text-xs font-semibold mb-3">
                <HeartHandshake className="w-3.5 h-3.5 text-orange-600" />
                <span>संताली गोड़ा-पशुधन ज्ञान, 'खूंटाव' परंपरा व गौ-रान (Cattle Lore & Ethno-Veterinary)</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-orange-800 tracking-tight flex items-center gap-3">
                खूंटाव परंपरा, दांगरा बाखेड़ व देशी गौ-रान
                <button
                  onClick={() =>
                speakWithFemaleVoice(
                  'संताली गोड़ा पशुधन ज्ञान, खूंटाव परंपरा, दांगरा बाखेड़ एवं पारंपरिक गौ-रान चिकित्सा'
                )
              }
                  className="p-2 rounded-lg bg-orange-100/40 hover:bg-orange-200/60 text-orange-700 transition-colors"
                  title="उच्चारण सुनें"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </h1>
              <p className="text-stone-700 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
                सोहराय महापर्व में पशुधन का सजीव वंदन, कुल्ही में खूंटाव नृत्य, सींगों पर महुआ तेल-सिंदूर की रंगाई, 'दांगरा बाखेड़' प्रार्थना और जंगल की जड़ी-बूटियों से निर्मित सदियों पुरानी देशी पशु-चिकित्सा (गौ-रान)।
              </p>
            </div>

            {isAdmin && (
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={handleOpenAdd}
                  className="flex items-center gap-2 px-4 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-orange-900/30 transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  नया पशु ज्ञान जोड़ें
                </button>
                <button
                  onClick={handleResetToDefault}
                  className="p-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-slate-900 rounded-xl border border-stone-200 transition-colors"
                  title="डिफ़ॉल्ट पर रीसेट करें"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {feedbackMsg && (
            <div className="mt-4 p-3 bg-orange-500/20 border border-orange-500/40 rounded-xl text-orange-800 text-sm flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-orange-600" />
              <span>{feedbackMsg}</span>
            </div>
          )}
        </div>
      </div>

      {/* Interactive 4-Stage Khuntau Ritual Simulator */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="bg-stone-50/90 border border-orange-200/40 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <Activity className="w-5 h-5 text-orange-600" />
              <h2 className="text-xl font-bold text-orange-800">
                खूंटाव अनुष्ठान के ४ मुख्य चरण (Khuntau 4-Stage Ritual)
              </h2>
            </div>
            <span className="text-xs text-stone-600 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
              प्रत्येक चरण पर क्लिक करके संताली परंपरा जानें
            </span>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {KHUNTAU_STEPS.map((st, idx) => (
              <button
                key={st.step}
                onClick={() => setActiveStep(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                  activeStep === idx
                    ? 'bg-orange-50/70 border-orange-500 text-orange-800 shadow-md ring-1 ring-orange-500/50'
                    : 'bg-stone-100/60 border-stone-200/60 text-stone-600 hover:bg-stone-100 hover:text-stone-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-orange-600">{st.step}</span>
                  {activeStep === idx && (
                    <CircleDot className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
                  )}
                </div>
                <div className="text-xs font-bold text-stone-800">{st.santaliTerm}</div>
                <div className="text-[11px] text-stone-600 truncate mt-1">{st.desc}</div>
              </button>
            ))}
          </div>

          {/* Selected Step Detail Showcase */}
          <div className="bg-gradient-to-r from-orange-50/40 to-stone-50 border border-orange-200/30 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wide">
                <span>{KHUNTAU_STEPS[activeStep].step}</span>
                <span>•</span>
                <span>{KHUNTAU_STEPS[activeStep].santaliTerm}</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-orange-800">
                {KHUNTAU_STEPS[activeStep].santaliTerm}
              </h3>
              <p className="text-stone-700 text-sm leading-relaxed">
                {KHUNTAU_STEPS[activeStep].desc}
              </p>
            </div>
            <button
              onClick={() =>
                speakWithFemaleVoice(
                  `${KHUNTAU_STEPS[activeStep].step}। ${KHUNTAU_STEPS[activeStep].santaliTerm}। ${KHUNTAU_STEPS[activeStep].desc}`
                )
              }
              className="flex items-center gap-2 px-4 py-2 bg-orange-100/40 hover:bg-orange-200/50 text-orange-800 rounded-lg border border-orange-200/50 text-xs font-semibold transition-colors flex-shrink-0"
            >
              <Volume2 className="w-4 h-4" />
              अनुष्ठान सुनें
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {[
            { id: 'all', label: 'समस्त ज्ञान' },
            { id: 'khuntau_ritual', label: 'खूंटाव अनुष्ठान' },
            { id: 'dangra_bakher', label: 'दांगरा बाखेड़' },
            { id: 'cattle_care_decor', label: 'पशु श्रृंगार' },
            { id: 'ethno_veterinary', label: 'गौ-रान (चिकित्सा)' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-orange-600 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="खोजें (जैसे खूंटाव, बाखेड़, रान)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3.5 py-2 bg-stone-100/90 border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-500 focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Main Grid of Livestock Items */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-stone-50 border border-stone-200 hover:border-orange-200/60 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all group hover:-translate-y-1"
          >
            <div>
              {/* Header Badge & Category */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-700 text-[11px] font-bold">
                  {item.badge}
                </span>
                <span className="text-stone-600 text-[11px] font-medium">{item.categoryLabel}</span>
              </div>

              {/* Title & Phonetic */}
              <div className="mb-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-orange-800 group-hover:text-orange-800 transition-colors">
                    {item.nameDevanagari}
                  </h3>
                  <button
                    onClick={() =>
                      speakWithFemaleVoice(
                        `${item.nameDevanagari}। ${item.titleHindi}। मौसम: ${item.ritualSeason}।`
                      )
                    }
                    className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-orange-600 transition-colors flex-shrink-0"
                    title="उच्चारण सुनें"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs font-mono text-orange-600/80 mt-0.5">{item.nameRoman}</div>
                <div className="text-xs font-semibold text-stone-700 mt-1">{item.titleHindi}</div>
              </div>

              {/* Season */}
              <div className="mb-3 p-2.5 rounded-xl bg-white/60 border border-stone-200 text-xs">
                <div className="text-stone-600 font-semibold mb-0.5">पर्व / ऋतु काल:</div>
                <div className="text-orange-700 font-medium">{item.ritualSeason}</div>
              </div>

              {/* Chants & Lore */}
              <div className="space-y-2 text-xs text-stone-700 leading-relaxed mb-4">
                <div className="bg-orange-50/20 p-2 rounded-lg border-l-2 border-orange-500 text-orange-800/90 italic">
                  <span className="font-bold text-orange-700 not-italic">मंत्र / गीत / सार: </span>
                  {item.santaliChantOrLore}
                </div>
                <div>
                  <span className="font-bold text-stone-800">तैयारी व विधि: </span>
                  {item.traditionalPreparation}
                </div>
                <div>
                  <span className="font-bold text-stone-800">पारंपरिक पारिस्थितिकी ज्ञान: </span>
                  {item.culturalEcologyLore}
                </div>
              </div>
            </div>

            {/* Admin Controls */}
            {isAdmin && (
              <div className="pt-3 border-t border-stone-200/80 flex items-center justify-end gap-2 mt-2">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-orange-200/30 text-orange-700 text-xs font-semibold border border-stone-200 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  संपादित करें
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id, item.titleHindi)}
                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-rose-50/40 text-stone-600 hover:text-rose-700 border border-stone-200 transition-colors"
                  title="हटाएं"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="max-w-md mx-auto text-center py-16 text-stone-600">
          <HelpCircle className="w-12 h-12 mx-auto mb-3 text-stone-600" />
          <p className="text-sm font-semibold">कोई पशुधन ज्ञान प्रविष्टि नहीं मिली।</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchTerm('');
            }}
            className="mt-3 px-3.5 py-1.5 bg-orange-600 text-white rounded-lg text-xs font-semibold"
          >
            फ़िल्टर साफ़ करें
          </button>
        </div>
      )}

      {/* Admin Add/Edit Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-stone-50 border border-stone-200 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
              <h3 className="text-xl font-bold text-orange-800 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-600" />
                {items.some((it) => it.id === editingItem.id)
                  ? 'पशुधन ज्ञान संपादित करें'
                  : 'नया पशुधन ज्ञान जोड़ें'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-stone-600 hover:text-slate-900 rounded-lg hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    देवनागरी नाम *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.nameDevanagari}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, nameDevanagari: e.target.value })
                    }
                    placeholder="उदा. खूंटाव पर्व व गाय जगावे"
                    className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    रोमन नाम (Roman Name)
                  </label>
                  <input
                    type="text"
                    value={editingItem.nameRoman}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, nameRoman: e.target.value })
                    }
                    placeholder="उदा. Khuntau Parab"
                    className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    हिंदी शीर्षक *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.titleHindi}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, titleHindi: e.target.value })
                    }
                    placeholder="उदा. सोहराय का ऐतिहासिक बैल-नृत्य अनुष्ठान"
                    className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    श्रेणी (Category)
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => {
                      const val = e.target.value as LivestockItem['category'];
                      const labels: Record<LivestockItem['category'], string> = {
                        khuntau_ritual: 'खूंटाव अनुष्ठान',
                        dangra_bakher: 'पवित्र प्रार्थना',
                        ethno_veterinary: 'पारंपरिक गौ-रान (चिकित्सा)',
                        cattle_care_decor: 'पशु श्रृंगार व पोषण'
                      };
                      setEditingItem({
                        ...editingItem,
                        category: val,
                        categoryLabel: labels[val]
                      });
                    }}
                    className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-orange-500"
                  >
                    <option value="khuntau_ritual">खूंटाव अनुष्ठान</option>
                    <option value="dangra_bakher">पवित्र प्रार्थना (बाखेड़)</option>
                    <option value="ethno_veterinary">पारंपरिक गौ-रान (चिकित्सा)</option>
                    <option value="cattle_care_decor">पशु श्रृंगार व पोषण</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    ऋतु / अवसर (Season)
                  </label>
                  <input
                    type="text"
                    value={editingItem.ritualSeason}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, ritualSeason: e.target.value })
                    }
                    placeholder="उदा. सोहराय महापर्व"
                    className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    बैज / उपनाम (Badge)
                  </label>
                  <input
                    type="text"
                    value={editingItem.badge}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, badge: e.target.value })
                    }
                    placeholder="उदा. पवित्र खूंटाव"
                    className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  मंत्र / गीत / नुस्खा सूत्र
                </label>
                <textarea
                  rows={2}
                  value={editingItem.santaliChantOrLore}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, santaliChantOrLore: e.target.value })
                  }
                  placeholder="बाखेड़ मंत्र या पारंपरिक सेरेञ बोल..."
                  className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  तैयारी व विधि विवरण
                </label>
                <textarea
                  rows={2}
                  value={editingItem.traditionalPreparation}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, traditionalPreparation: e.target.value })
                  }
                  placeholder="खूंटा सजाने या औषधि काढ़ा तैयार करने की विधि..."
                  className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  पारंपरिक पारिस्थितिकी व सामाजिक ज्ञान
                </label>
                <textarea
                  rows={2}
                  value={editingItem.culturalEcologyLore}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, culturalEcologyLore: e.target.value })
                  }
                  placeholder="संताल पुरखों की मान्यता व सामाजिक महत्व..."
                  className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-semibold rounded-xl"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-orange-900/40"
                >
                  <Save className="w-4 h-4" />
                  सुरक्षित करें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SantaliLivestockKhuntau;
