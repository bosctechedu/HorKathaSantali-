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
  HelpCircle,
  Fish,
  ShoppingBag,
  CircleDot
} from 'lucide-react';

export interface BambooCraftItem {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  titleHindi: string;
  category: 'fishing_trap' | 'winnowing_ritual' | 'storage_basket' | 'foraging_utility';
  categoryLabel: string;
  bambooType: string;
  weavingStructure: string;
  culturalSignificance: string;
  durabilityLore: string;
  badge: string;
}

export const DEFAULT_BAMBOO_ITEMS: BambooCraftItem[] = [
  {
    id: 'bamboo_hatak_soup',
    nameDevanagari: 'हाताक\' (Hatak\' - बांस का पवित्र सूप)',
    nameRoman: 'Hatak\' (Bamboo Winnowing Fan)',
    titleHindi: 'अन्न फटकने व विवाह संस्कार का अनिवार्य बांस सूप',
    category: 'winnowing_ritual',
    categoryLabel: 'कृषि व मांगलिक सूप',
    bambooType: 'हरी देशी बांस की बारीक लचीली कमचियां (Chhilka Mat\')',
    weavingStructure: 'दोहरी तिरछी बुनाई जिसके किनारे पर बांस की मोटी खपच्ची को बेंत (Cane) अथवा सूत से कसकर मजबूत मुंडेर बांधी जाती है।',
    culturalSignificance: 'संताल विवाह में सिंदूर दान के समय वधू इसी सूप में बैठकर सिंदूर स्वीकार करती है। धान ओसाने और कुल देवता को पहला अन्न चढ़ाने में यह सर्वोपरि है।',
    durabilityLore: 'सूप को कीड़ों से बचाने के लिए उस पर अरवा चावल के माड़ और गोबर का पतला लेप लगाया जाता है, जिससे यह हल्का और टिकाऊ बनता है।',
    badge: 'मांगलिक सूप'
  },
  {
    id: 'bamboo_jhimri_kumuni',
    nameDevanagari: 'झिमरी व कुमुनी (Jhimri ar Kumuni - मत्स्य आखेट फंदा)',
    nameRoman: 'Jhimri ar Kumuni (Fish Traps)',
    titleHindi: 'नदी व खेत के बहाव में स्वतः मछली पकड़ने वाला बांस यंत्र',
    category: 'fishing_trap',
    categoryLabel: 'मत्स्य आखेट उपकरण',
    bambooType: 'परिपक्व ठोस बांस की पतली नुकीली तीलियां',
    weavingStructure: 'शंक्वाकार (Cone) रचना जिसके मुख पर भीतर की ओर मुड़े हुए कांटेदार बांस के रेशे होते हैं। मछली धारा के साथ भीतर प्रवेश तो कर सकती है, परंतु बाहर नहीं निकल सकती।',
    culturalSignificance: 'वर्षा ऋतु में सीढ़ीदार धान खेतों की मेड़ों (कनाली) और पहाड़ी नदियों में संताल युवा रात में कुमुनी लगाकर सुबह प्रचुर ताजा हाकु (मछली) एकत्र करते हैं।',
    durabilityLore: 'पानी में गलने से बचाने के लिए उपयोग के बाद इसे धूप में सुखाया जाता है और रसोई के चूल्हे के ऊपर धुएं में टांगकर धुआं-उपचार (Smoke seasoning) दिया जाता है।',
    badge: 'जल-आखेट यंत्र'
  },
  {
    id: 'bamboo_daura_petari',
    nameDevanagari: 'दउरा व पेटारी (Daura ar Petari - अन्न संचयन टोकरी)',
    nameRoman: 'Daura ar Petari (Grain Basket)',
    titleHindi: 'विवाह उपहार व धान संचयन की विशाल मजबूत टोकरी',
    category: 'storage_basket',
    categoryLabel: 'अन्न संचयन टोकरी',
    bambooType: 'मोटे बांस की चौड़ी व सख्त पट्टियां (Chaud Mat\')',
    weavingStructure: 'चौकोर पेंदे के साथ गोल उभरा हुआ विशाल घेरा, जिसके ऊपर ढक्कन (पेटारी) लगाया जा सकता है।',
    culturalSignificance: 'संताल बारात में वधू पक्ष को भेंट स्वरूप दी जाने वाली साड़ियां, आभूषण और गुड़-पीठा इसी दउरा में सजाकर सिर पर ले जाया जाता है।',
    durabilityLore: 'भीतरी व बाहरी सतह पर चिकनी मिट्टी और गाय के गोबर की मोटी लिपाई की जाती है, जिससे यह पूरी तरह वायुरोधी (Airtight) और चूहा-रोधी बन जाता है।',
    badge: 'विवाह दउरा'
  },
  {
    id: 'bamboo_tunkhi_khanchli',
    nameDevanagari: 'तुनखी व खंचली (Tunkhi ar Khanchli - कंद-मूल डलिया)',
    nameRoman: 'Tunkhi ar Khanchli',
    titleHindi: 'जंगल से महुआ, मशरूम व कंद-मूल एकत्र करने की टोकरी',
    category: 'foraging_utility',
    categoryLabel: 'वन संचयन डलिया',
    bambooType: 'हल्की व लचीली बांस की छिल्लियां',
    weavingStructure: 'गहरी गोल टोकरी जिसमें सिर पर सहारा देने वाला विशेष कपड़े या घास का फंदा (नमदाह) बांधा जाता है।',
    culturalSignificance: 'संताल महिलाएं प्रातःकाल वनोपज एकत्र करने जाते समय इसे पीठ पर बांधती हैं। यह हाथ खाली रखने में मदद करता है ताकि पहाड़ी ढलानों पर चलना सुरक्षित रहे।',
    durabilityLore: 'पेंदे पर अतिरिक्त क्रॉस-स्ट्रिप्स जोड़ी जाती हैं ताकि नुकीले पत्थरों पर रखने से भी टोकरी का निचला हिस्सा न फटे।',
    badge: 'वनोपज डलिया'
  },
  {
    id: 'bamboo_chalauni',
    nameDevanagari: 'चलौनी व चनान (Chalauni ar Chhanan - बांस छलनी)',
    nameRoman: 'Chalauni ar Chhanan',
    titleHindi: 'पारंपरिक खाद्य व पेय छानने की सूक्ष्म छिद्रयुक्त छलनी',
    category: 'foraging_utility',
    categoryLabel: 'घरेलू उपयोग छलनी',
    bambooType: 'धागे के समान महीन बांस की तारें',
    weavingStructure: 'जालीदार सममित वर्गाकार बुनाई, जिसमें 1-2 मिमी के सूक्ष्म छिद्र होते हैं।',
    culturalSignificance: 'सामूहिक त्योहारों में हंडिया (पोथा) छानने और सोहराय पीठा बनाने के लिए चावल का महीन चूर्ण अलग करने में इसका उपयोग होता है।',
    durabilityLore: 'बांस की प्राकृतिक एंटी-बैक्टीरियल विशेषता के कारण इसमें छाने गए खाद्य पदार्थ में कोई दुर्गंध नहीं आती।',
    badge: 'सूक्ष्म छलनी'
  }
];

export const BAMBOO_CRAFT_GUIDE = [
  {
    technique: '1. अंधेरी रात कटाई (Andhariya Harvest)',
    season: 'कार्तिक-अगहन (सर्दियों की शुरुआत)',
    wisdom: 'बांस को हमेशा कृष्ण पक्ष में काटा जाता है क्योंकि उस समय बांस में स्टार्च कम होता है और घुन (Wood borers) कभी नहीं लगते।'
  },
  {
    technique: '2. कमची छिलाई (Sliver Preparation)',
    season: 'ताजे बांस की छिलाई',
    wisdom: 'बांस की बाहरी हरी छाल (सिलिका परत) को चाकू से हटाकर अंदर के लचीले रेशों से महीन कमचियां बनाई जाती हैं।'
  },
  {
    technique: '3. कीचड़ जल उपचार (Mud Bath Seasoning)',
    season: '7 दिनों तक जलमग्न',
    wisdom: 'कमचियों को तालाब की काली मिट्टी में दबाकर रखने से उनका बचा हुआ शुगर निकल जाता है और बांस दशकों तक नहीं सड़ता।'
  },
  {
    technique: '4. धुआं उपचार (Smoke Seasoning)',
    season: 'रसोई छत पर स्थापन',
    wisdom: 'तैयार टोकरियों को चूल्हे के ऊपर धुएं में सुखाने से वे गहरे महोगनी रंग की और कीट-रोधी हो जाती हैं।'
  }
];

export const SantaliBambooCraft: React.FC = () => {
  const { isAdmin } = useAdmin();
  const STORAGE_KEY = 'hor_katha_bamboo_db';

  const [items, setItems] = useState<BambooCraftItem[]>(() =>
    safeLoadFromStorage<BambooCraftItem[]>(STORAGE_KEY, DEFAULT_BAMBOO_ITEMS)
  );

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedGuide, setSelectedGuide] = useState<number>(0);

  // Admin CRUD state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BambooCraftItem | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const saveItems = (updated: BambooCraftItem[]) => {
    setItems(updated);
    safeSaveToStorage(STORAGE_KEY, updated);
  };

  const handleResetToDefault = () => {
    if (window.confirm('क्या आप बांस-शिल्प डेटा को मूल डिफॉल्ट पर रीसेट करना चाहते हैं?')) {
      saveItems(DEFAULT_BAMBOO_ITEMS);
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
      id: `bamboo_${Date.now()}`,
      nameDevanagari: '',
      nameRoman: '',
      titleHindi: '',
      category: 'winnowing_ritual',
      categoryLabel: 'कृषि व मांगलिक सूप',
      bambooType: 'देशी हरी बांस',
      weavingStructure: '',
      culturalSignificance: '',
      durabilityLore: '',
      badge: 'नया बांस शिल्प'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: BambooCraftItem) => {
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
    let updated: BambooCraftItem[];
    if (index >= 0) {
      updated = [...items];
      updated[index] = editingItem;
      showNotification(`"${editingItem.titleHindi}" अपडेट कर दिया गया!`);
    } else {
      updated = [editingItem, ...items];
      showNotification(`"${editingItem.titleHindi}" नया शिल्प जोड़ा गया!`);
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
      item.bambooType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.weavingStructure.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 p-4 md:p-8">
      {/* Top Banner & Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-emerald-950/80 via-stone-900 to-teal-950/60 border border-emerald-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                <span>संताली बांस-शिल्प, मत्स्य आखेट उपकरण व टोकरी निर्माण (Indigenous Bamboo Craft & River Traps)</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-emerald-100 tracking-tight flex items-center gap-3">
                हाताक' (सूप), कुमुनी, दउरा व संताली मात-शिल्प
                <button
                  onClick={() =>
                speakWithFemaleVoice(
                  'संताली पारंपरिक बांस-शिल्प, हाताक सूप, झिमरी कुमुनी मत्स्य उपकरण एवं दउरा पेटारी निर्माण कला'
                )
              }
                  className="p-2 rounded-lg bg-emerald-800/40 hover:bg-emerald-700/60 text-emerald-300 transition-colors"
                  title="उच्चारण सुनें"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </h1>
              <p className="text-stone-300 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
                जंगल के बांस से रचित संताली आदिम शिल्प: विवाह व अन्न का मांगलिक हाताक' (सूप), पहाड़ी नदियों में स्वतः मछली पकड़ने वाला वैज्ञानिक कुमुनी व झिमरी, अनाज संचयन का मजबूत दउरा और कृष्ण पक्ष में बांस कटाई का कीट-रोधी ज्ञानकोश।
              </p>
            </div>

            {isAdmin && (
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={handleOpenAdd}
                  className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-emerald-900/30 transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  नया बांस शिल्प जोड़ें
                </button>
                <button
                  onClick={handleResetToDefault}
                  className="p-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-xl border border-stone-700 transition-colors"
                  title="डिफ़ॉल्ट पर रीसेट करें"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {feedbackMsg && (
            <div className="mt-4 p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-200 text-sm flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
              <span>{feedbackMsg}</span>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Bamboo Science & Seasoning Guide */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="bg-stone-900/90 border border-emerald-900/40 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <Fish className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold text-emerald-100">
                संताली बांस विज्ञान व स्थायित्व सूत्र (Bamboo Seasoning & Splitting Lore)
              </h2>
            </div>
            <span className="text-xs text-stone-400 bg-stone-800 px-3 py-1 rounded-full border border-stone-700">
              प्रत्येक चरण पर क्लिक करके संताली शिल्प परंपरा जानें
            </span>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {BAMBOO_CRAFT_GUIDE.map((gd, idx) => (
              <button
                key={gd.technique}
                onClick={() => setSelectedGuide(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                  selectedGuide === idx
                    ? 'bg-emerald-950/70 border-emerald-500 text-emerald-100 shadow-md ring-1 ring-emerald-500/50'
                    : 'bg-stone-800/60 border-stone-700/60 text-stone-400 hover:bg-stone-800 hover:text-stone-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-emerald-400">विधि #{idx + 1}</span>
                  {selectedGuide === idx && (
                    <CircleDot className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  )}
                </div>
                <div className="text-xs font-bold text-stone-200 truncate">{gd.technique.split('(')[0]}</div>
                <div className="text-[11px] text-stone-400 truncate mt-1">{gd.season}</div>
              </button>
            ))}
          </div>

          {/* Selected Step Detail Showcase */}
          <div className="bg-gradient-to-r from-emerald-950/40 to-stone-900 border border-emerald-800/30 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wide">
                <span>काल: {BAMBOO_CRAFT_GUIDE[selectedGuide].season}</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-emerald-100">
                {BAMBOO_CRAFT_GUIDE[selectedGuide].technique}
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                {BAMBOO_CRAFT_GUIDE[selectedGuide].wisdom}
              </p>
            </div>
            <button
              onClick={() =>
                speakWithFemaleVoice(
                  `${BAMBOO_CRAFT_GUIDE[selectedGuide].technique}। मौसम: ${BAMBOO_CRAFT_GUIDE[selectedGuide].season}। ज्ञान: ${BAMBOO_CRAFT_GUIDE[selectedGuide].wisdom}`
                )
              }
              className="flex items-center gap-2 px-4 py-2 bg-emerald-800/40 hover:bg-emerald-700/50 text-emerald-200 rounded-lg border border-emerald-700/50 text-xs font-semibold transition-colors flex-shrink-0"
            >
              <Volume2 className="w-4 h-4" />
              विवरण सुनें
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {[
            { id: 'all', label: 'समस्त बांस शिल्प' },
            { id: 'winnowing_ritual', label: 'हाताक\' (सूप)' },
            { id: 'fishing_trap', label: 'कुमुनी (मत्स्य फंदा)' },
            { id: 'storage_basket', label: 'दउरा व पेटारी' },
            { id: 'foraging_utility', label: 'तुनखी व चलौनी' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="खोजें (जैसे हाताक, कुमुनी, दउरा, तुनखी)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3.5 py-2 bg-stone-800/90 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Main Grid of Bamboo Items */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-stone-900 border border-stone-800 hover:border-emerald-700/60 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all group hover:-translate-y-1"
          >
            <div>
              {/* Header Badge & Category */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold">
                  {item.badge}
                </span>
                <span className="text-stone-400 text-[11px] font-medium">{item.categoryLabel}</span>
              </div>

              {/* Title & Phonetic */}
              <div className="mb-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-emerald-100 group-hover:text-emerald-200 transition-colors">
                    {item.nameDevanagari}
                  </h3>
                  <button
                    onClick={() =>
                      speakWithFemaleVoice(
                        `${item.nameDevanagari}। ${item.titleHindi}। बांस प्रकार: ${item.bambooType}।`
                      )
                    }
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-emerald-400 transition-colors flex-shrink-0"
                    title="उच्चारण सुनें"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs font-mono text-emerald-400/80 mt-0.5">{item.nameRoman}</div>
                <div className="text-xs font-semibold text-stone-300 mt-1">{item.titleHindi}</div>
              </div>

              {/* Bamboo Type */}
              <div className="mb-3 p-2.5 rounded-xl bg-stone-950/60 border border-stone-800 text-xs">
                <div className="text-stone-400 font-semibold mb-0.5">बांस किस्म व कमची प्रकार:</div>
                <div className="text-emerald-300 font-medium">{item.bambooType}</div>
              </div>

              {/* Weaving & Lore */}
              <div className="space-y-2 text-xs text-stone-300 leading-relaxed mb-4">
                <div>
                  <span className="font-bold text-stone-200">बुनाई संरचना व तकनीक: </span>
                  {item.weavingStructure}
                </div>
                <div>
                  <span className="font-bold text-stone-200">पारंपरिक व मांगलिक महत्व: </span>
                  {item.culturalSignificance}
                </div>
                <div className="bg-emerald-950/20 p-2 rounded-lg border-l-2 border-emerald-500 text-emerald-200/90">
                  <span className="font-bold text-emerald-300">कीट-रोधी व स्थायित्व ज्ञान: </span>
                  {item.durabilityLore}
                </div>
              </div>
            </div>

            {/* Admin Controls */}
            {isAdmin && (
              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-end gap-2 mt-2">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-emerald-600/30 text-emerald-300 text-xs font-semibold border border-stone-700 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  संपादित करें
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id, item.titleHindi)}
                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-rose-900/40 text-stone-400 hover:text-rose-300 border border-stone-700 transition-colors"
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
        <div className="max-w-md mx-auto text-center py-16 text-stone-400">
          <HelpCircle className="w-12 h-12 mx-auto mb-3 text-stone-600" />
          <p className="text-sm font-semibold">कोई बांस शिल्प प्रविष्टि नहीं मिली।</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchTerm('');
            }}
            className="mt-3 px-3.5 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold"
          >
            फ़िल्टर साफ़ करें
          </button>
        </div>
      )}

      {/* Admin Add/Edit Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-4">
              <h3 className="text-xl font-bold text-emerald-200 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                {items.some((it) => it.id === editingItem.id)
                  ? 'बांस शिल्प संपादित करें'
                  : 'नया बांस शिल्प जोड़ें'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    देवनागरी नाम *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.nameDevanagari}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, nameDevanagari: e.target.value })
                    }
                    placeholder="उदा. हाताक' (Hatak' - सूप)"
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    रोमन नाम (Roman Name)
                  </label>
                  <input
                    type="text"
                    value={editingItem.nameRoman}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, nameRoman: e.target.value })
                    }
                    placeholder="उदा. Hatak' (Winnowing Fan)"
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    हिंदी शीर्षक *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.titleHindi}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, titleHindi: e.target.value })
                    }
                    placeholder="उदा. अन्न फटकने व विवाह संस्कार का अनिवार्य बांस सूप"
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    श्रेणी (Category)
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => {
                      const val = e.target.value as BambooCraftItem['category'];
                      const labels: Record<BambooCraftItem['category'], string> = {
                        winnowing_ritual: 'कृषि व मांगलिक सूप',
                        fishing_trap: 'मत्स्य आखेट उपकरण',
                        storage_basket: 'अन्न संचयन टोकरी',
                        foraging_utility: 'वन संचयन डलिया'
                      };
                      setEditingItem({
                        ...editingItem,
                        category: val,
                        categoryLabel: labels[val]
                      });
                    }}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="winnowing_ritual">कृषि व मांगलिक सूप (हाताक')</option>
                    <option value="fishing_trap">मत्स्य आखेट उपकरण (कुमुनी)</option>
                    <option value="storage_basket">अन्न संचयन टोकरी (दउरा)</option>
                    <option value="foraging_utility">वन संचयन डलिया (तुनखी)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    बांस किस्म (Bamboo Type)
                  </label>
                  <input
                    type="text"
                    value={editingItem.bambooType}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, bambooType: e.target.value })
                    }
                    placeholder="उदा. हरी लचीली कमचियां, ठोस बांस"
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    बैज / उपनाम (Badge)
                  </label>
                  <input
                    type="text"
                    value={editingItem.badge}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, badge: e.target.value })
                    }
                    placeholder="उदा. मांगलिक सूप"
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  बुनाई संरचना व तकनीक
                </label>
                <textarea
                  rows={2}
                  value={editingItem.weavingStructure}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, weavingStructure: e.target.value })
                  }
                  placeholder="कमचियों की दिशा, मुंडेर बांधने की विधि..."
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  पारंपरिक व मांगलिक महत्व
                </label>
                <textarea
                  rows={2}
                  value={editingItem.culturalSignificance}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, culturalSignificance: e.target.value })
                  }
                  placeholder="विवाह, पर्व या कृषि कार्य में उपयोग..."
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  कीट-रोधी व स्थायित्व ज्ञान
                </label>
                <textarea
                  rows={2}
                  value={editingItem.durabilityLore}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, durabilityLore: e.target.value })
                  }
                  placeholder="गोबर लिपाई, धुआं उपचार या मिट्टी में रखने का ज्ञान..."
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 text-sm font-semibold rounded-xl"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-emerald-900/40"
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

export default SantaliBambooCraft;
