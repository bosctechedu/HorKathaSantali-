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
  Hammer,
  Trees,
  Compass,
  CircleDot
} from 'lucide-react';

export interface WoodcraftItem {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  titleHindi: string;
  category: 'farming_tool' | 'domestic_furniture' | 'acoustic_pastoral' | 'sacred_carving';
  categoryLabel: string;
  timberSpecies: string;
  ergonomicDesign: string;
  traditionalSignificance: string;
  maintenanceLore: string;
  badge: string;
}

export const DEFAULT_WOODCRAFT_ITEMS: WoodcraftItem[] = [
  {
    id: 'wood_dhenki',
    nameDevanagari: 'ढेंकी व समठ (Dhenki ar Samot\' - काष्ठ कूटक)',
    nameRoman: 'Dhenki ar Samot\'',
    titleHindi: 'पारंपरिक पैर से चलने वाला काष्ठ धान कूटक व चूर्ण यंत्र',
    category: 'domestic_furniture',
    categoryLabel: 'घरेलू काष्ठ यंत्र',
    timberSpecies: 'साल (Sarjom), महुआ (Mahua) या जामुन (Kuda) की भारी लकड़ी',
    ergonomicDesign: '10-12 फीट लंबा भारी काठ का बीम जो धुरी पर संतुलित रहता है। पैर के हल्के दबाव से उठता है और गुरुत्वाकर्षण से मुसल (समठ) पत्थर की खरल (कांडी) में गिरता है।',
    traditionalSignificance: 'संताल घरों में सोहराay, करम और विवाह के समय अरवा चावल का आटा (होलों) और चूड़ा बनाने की पवित्र मशीन। इसके बिना कोई मांगलिक पकवान नहीं बनता।',
    maintenanceLore: 'मूसल के सिरे पर लोहे का छल्ला (साम) लगाया जाता है ताकि लकड़ी न फटे। इसे गृह-लक्ष्मी की तरह स्वच्छ रखा जाता है।',
    badge: 'गृह-शिल्प'
  },
  {
    id: 'wood_nahel_juar',
    nameDevanagari: 'नाहेल व जुआर (Nahel ar Juar - संताली काष्ठ हल)',
    nameRoman: 'Nahel ar Juar (Plough & Yoke)',
    titleHindi: 'कठोर पठारी भूमि के लिए साल की लकड़ी से बना हल व जुआठ',
    category: 'farming_tool',
    categoryLabel: 'कृषि काष्ठ उपकरण',
    timberSpecies: 'कुदरती मुड़ी हुई साल (Sal) व शीशम की जड़दार लकड़ी',
    ergonomicDesign: 'नाहेल का झुकाव 65 डिग्री रखा जाता है ताकि टांड़ की पथरीली मिट्टी में हल गहराई तक चीरा लगा सके बिना बैलों के कंधे पर अत्यधिक भार डाले।',
    traditionalSignificance: 'संताल पुरखों की आदिम कृषि पहचान। रोहिणी नक्षत्र में पहली बार हल चलाने (मुठ चाड़) से पूर्व नाहेल की पूजा की जाती है।',
    maintenanceLore: 'हल के निचले हिस्से में नुकीला लोहे का फाल (फार) कमार द्वारा कसा जाता है। जुआर पर चिकनाई हेतु करंज का तेल लगाया जाता है।',
    badge: 'कृषि आधार'
  },
  {
    id: 'wood_toka_bell',
    nameDevanagari: 'तोका (Toka - काष्ठ पशु घंटी)',
    nameRoman: 'Toka (Wooden Cattle Bell)',
    titleHindi: 'वन में चरने वाले पशुओं के लिए खोखली काष्ठ घंटी',
    category: 'acoustic_pastoral',
    categoryLabel: 'पशु-ध्वनि उपकरण',
    timberSpecies: 'गम्हार (Khamari) या शीशम की प्रतिध्वनि वाली हल्की लकड़ी',
    ergonomicDesign: 'आयताकार खोखला काष्ठ गुटका जिसके भीतर दो स्वतंत्र काठ की डंडियां (जिभिया) लटकती हैं। पशु के चलने पर मधुर ठक-ठक की प्रतिध्वनि गूंजती है।',
    traditionalSignificance: 'घने जंगलों में जब मवेशी चरने जाते हैं, तो तोका की विशिष्ट लयबद्ध ध्वनि से संताल चरवाहे बिना देखे समझ जाते हैं कि उनका बैल किस दिशा में है।',
    maintenanceLore: 'बारिश के मौसम में लकड़ी को फूलने से बचाने के लिए उस पर धुआं और सरसों का तेल लगाया जाता है।',
    badge: 'वन प्रतिध्वनि'
  },
  {
    id: 'wood_parkom_machi',
    nameDevanagari: 'पारकोम व माची (Parkom ar Machi - चारपाई व माची)',
    nameRoman: 'Parkom ar Machi',
    titleHindi: 'सबई घास की रस्सियों से बुनी प्राकृतिक काष्ठ खटिया व पीढ़ा',
    category: 'domestic_furniture',
    categoryLabel: 'घरेलू काष्ठ यंत्र',
    timberSpecies: 'साल के पाये (Goda) और शीशम की पाटी',
    ergonomicDesign: 'बिना किसी लोहे की कील के लकड़ी की चूल (Mortise & Tenon) से जुड़ा मजबूत ढांचा। सबई घास की 3-प्लाई रस्सियों की लचीली बुनाई रीढ़ की हड्डी के लिए सर्वोत्तम है।',
    traditionalSignificance: 'संताल घर के आंगन (रचा) और पिंडा पर आगंतुकों के स्वागत का प्रतीक। गांव के मांझी या दामाद के आने पर सर्वप्रथम माची बैठाई जाती है।',
    maintenanceLore: 'रस्सियों को ढीला होने पर पीछे के दावान (खींच रस्सी) से पुनः कस लिया जाता है। यह दशकों तक चलती है।',
    badge: 'आतिथ्य सत्कार'
  },
  {
    id: 'wood_majhi_than_pillar',
    nameDevanagari: 'मांझी थान काष्ठ स्तंभ (Majhi Than Dare Khunti)',
    nameRoman: 'Majhi Than Dare Khunti',
    titleHindi: 'ग्राम संस्थापक मांझी हाड़ाम का पवित्र नक्काशीदार काष्ठ स्तंभ',
    category: 'sacred_carving',
    categoryLabel: 'पवित्र धार्मिक स्तंभ',
    timberSpecies: 'शुद्ध परिपक्व साल (Shorea robusta)',
    ergonomicDesign: 'स्तंभ के शीर्ष पर पारंपरिक संताली पक्षियों (मिरू, मारोक) और ज्यामितीय चक्रव्यूह की गहरी छेनी नक्काशी।',
    traditionalSignificance: 'ग्राम के आदि-पुरुष मांझी हाड़ाम की आत्मिक उपस्थिति का प्रतीक। गांव की हर शादी, जन्म और मृत्यु पर यहां सर्वप्रथम सिंदूर व जल अर्पित होता है।',
    maintenanceLore: 'हर वर्ष बाहा और सोहराय पर्व पर स्तंभ को धोकर महुआ तेल और सिंदूर का लेप चढ़ाया जाता है।',
    badge: 'पवित्र स्तंभ'
  }
];

export const WOODCRAFT_PARTS = [
  {
    partName: '1. ढेंकी मुसल (Samot\')',
    timber: 'भारी साल की लकड़ी',
    function: 'धान की भूसी अलग करने और चावल को महीन पीसने वाला 20 किलो भारी काष्ठ मुसल।'
  },
  {
    partName: '2. नाहेल फार व कुल्हा (Nahel Body)',
    timber: 'कुदरती वक्र साल काठ',
    function: 'हल की रीढ़ जो मिट्टी को 8-10 इंच चीरती हुई आगे बढ़ती है।'
  },
  {
    partName: '3. जुआर चूल (Juar Yoke Pin)',
    timber: 'शीशम की लचीली लकड़ी',
    function: 'दोनों बैलों की गर्दन पर संतुलन साधने वाला चिकना जुआठ।'
  },
  {
    partName: '4. तोका खोखल (Toka Resonator)',
    timber: 'गम्हार की खोखली काष्ठ',
    function: 'ध्वनि तरंगों को दूर तक प्रसारित करने वाला ध्वनि-कक्ष (Acoustic Chamber)।'
  }
];

export const SantaliWoodcraftCarpentry: React.FC = () => {
  const { isAdmin } = useAdmin();
  const STORAGE_KEY = 'hor_katha_woodcraft_db';

  const [items, setItems] = useState<WoodcraftItem[]>(() =>
    safeLoadFromStorage<WoodcraftItem[]>(STORAGE_KEY, DEFAULT_WOODCRAFT_ITEMS)
  );

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPart, setSelectedPart] = useState<number>(0);

  // Admin CRUD state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<WoodcraftItem | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const saveItems = (updated: WoodcraftItem[]) => {
    setItems(updated);
    safeSaveToStorage(STORAGE_KEY, updated);
  };

  const handleResetToDefault = () => {
    if (window.confirm('क्या आप काष्ठ-शिल्प डेटा को मूल डिफॉल्ट पर रीसेट करना चाहते हैं?')) {
      saveItems(DEFAULT_WOODCRAFT_ITEMS);
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
      id: `woodcraft_${Date.now()}`,
      nameDevanagari: '',
      nameRoman: '',
      titleHindi: '',
      category: 'farming_tool',
      categoryLabel: 'कृषि काष्ठ उपकरण',
      timberSpecies: 'साल व शीशम',
      ergonomicDesign: '',
      traditionalSignificance: '',
      maintenanceLore: '',
      badge: 'नया काष्ठ शिल्प'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: WoodcraftItem) => {
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
    let updated: WoodcraftItem[];
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
      item.timberSpecies.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ergonomicDesign.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 p-4 md:p-8">
      {/* Top Banner & Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-amber-50/80 via-stone-50 to-yellow-50/60 border border-amber-200/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 text-xs font-semibold mb-3">
                <Trees className="w-3.5 h-3.5 text-amber-600" />
                <span>पारंपरिक काष्ठ-कला, बढ़ईगीरी व नक्काशी विरासत (Santali Woodcraft & Indigenous Carpentry)</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-amber-800 tracking-tight flex items-center gap-3">
                ढेंकी, नाहेल, पारकोम व संताली काठ-शिल्प
                <button
                  onClick={() =>
                speakWithFemaleVoice(
                  'संताली पारंपरिक काष्ठ-कला, ढेंकी नाहेल पारकोम तोका एवं काठ-शिल्प विज्ञान'
                )
              }
                  className="p-2 rounded-lg bg-amber-100/40 hover:bg-amber-200/60 text-amber-700 transition-colors"
                  title="उच्चारण सुनें"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </h1>
              <p className="text-stone-700 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
                साल और शीशम के वनों से उपजा संताली बढ़ईगीरी ज्ञान: पैर से चलने वाली वैज्ञानिक ढेंकी, कठोर पथरीली मिट्टी चीरने वाला नाहेल (हल), सबई घास से बुनी पारकोम-माची, वन में प्रतिध्वनित होने वाली काष्ठ तोका और मांझी थान के पवित्र नक्काशीदार स्तंभ।
              </p>
            </div>

            {isAdmin && (
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={handleOpenAdd}
                  className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-amber-900/30 transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  नया काष्ठ शिल्प जोड़ें
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
            <div className="mt-4 p-3 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-800 text-sm flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-amber-600" />
              <span>{feedbackMsg}</span>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Woodcraft Anatomy Showcase */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="bg-stone-50/90 border border-amber-200/40 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <Hammer className="w-5 h-5 text-amber-600" />
              <h2 className="text-xl font-bold text-amber-800">
                काष्ठ उपकरण संरचना व भौतिकी (Woodcraft Mechanics)
              </h2>
            </div>
            <span className="text-xs text-stone-600 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
              घटक चुनकर लकड़ी की विशेषता और संतुलन विधि देखें
            </span>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {WOODCRAFT_PARTS.map((pt, idx) => (
              <button
                key={pt.partName}
                onClick={() => setSelectedPart(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                  selectedPart === idx
                    ? 'bg-amber-50/70 border-amber-500 text-amber-800 shadow-md ring-1 ring-amber-500/50'
                    : 'bg-stone-100/60 border-stone-200/60 text-stone-600 hover:bg-stone-100 hover:text-stone-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-600">घटक #{idx + 1}</span>
                  {selectedPart === idx && (
                    <CircleDot className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                  )}
                </div>
                <div className="text-xs font-bold text-stone-800 truncate">{pt.partName}</div>
                <div className="text-[11px] text-stone-600 truncate mt-1">{pt.timber}</div>
              </button>
            ))}
          </div>

          {/* Selected Step Detail Showcase */}
          <div className="bg-gradient-to-r from-amber-50/40 to-stone-50 border border-amber-200/30 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wide">
                <span>काठ प्रजाति: {WOODCRAFT_PARTS[selectedPart].timber}</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-amber-800">
                {WOODCRAFT_PARTS[selectedPart].partName}
              </h3>
              <p className="text-stone-700 text-sm leading-relaxed">
                {WOODCRAFT_PARTS[selectedPart].function}
              </p>
            </div>
            <button
              onClick={() =>
                speakWithFemaleVoice(
                  `${WOODCRAFT_PARTS[selectedPart].partName}। लकड़ी: ${WOODCRAFT_PARTS[selectedPart].timber}। कार्य: ${WOODCRAFT_PARTS[selectedPart].function}`
                )
              }
              className="flex items-center gap-2 px-4 py-2 bg-amber-100/40 hover:bg-amber-200/50 text-amber-800 rounded-lg border border-amber-200/50 text-xs font-semibold transition-colors flex-shrink-0"
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
            { id: 'all', label: 'समस्त काष्ठ शिल्प' },
            { id: 'farming_tool', label: 'कृषि उपकरण (हल)' },
            { id: 'domestic_furniture', label: 'ढेंकी व पारकोम' },
            { id: 'acoustic_pastoral', label: 'तोका (काष्ठ घंटी)' },
            { id: 'sacred_carving', label: 'पवित्र स्तंभ नक्काशी' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-amber-600 text-white'
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
            placeholder="खोजें (जैसे ढेंकी, नाहेल, पारकोम, तोका)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3.5 py-2 bg-stone-100/90 border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Main Grid of Woodcraft Items */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-stone-50 border border-stone-200 hover:border-amber-200/60 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all group hover:-translate-y-1"
          >
            <div>
              {/* Header Badge & Category */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 text-[11px] font-bold">
                  {item.badge}
                </span>
                <span className="text-stone-600 text-[11px] font-medium">{item.categoryLabel}</span>
              </div>

              {/* Title & Phonetic */}
              <div className="mb-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-amber-800 group-hover:text-amber-800 transition-colors">
                    {item.nameDevanagari}
                  </h3>
                  <button
                    onClick={() =>
                      speakWithFemaleVoice(
                        `${item.nameDevanagari}। ${item.titleHindi}। लकड़ी: ${item.timberSpecies}।`
                      )
                    }
                    className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-amber-600 transition-colors flex-shrink-0"
                    title="उच्चारण सुनें"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs font-mono text-amber-600/80 mt-0.5">{item.nameRoman}</div>
                <div className="text-xs font-semibold text-stone-700 mt-1">{item.titleHindi}</div>
              </div>

              {/* Timber Species */}
              <div className="mb-3 p-2.5 rounded-xl bg-white/60 border border-stone-200 text-xs">
                <div className="text-stone-600 font-semibold mb-0.5">उपयुक्त काठ प्रजाति (Timber):</div>
                <div className="text-amber-700 font-medium">{item.timberSpecies}</div>
              </div>

              {/* Design & Lore */}
              <div className="space-y-2 text-xs text-stone-700 leading-relaxed mb-4">
                <div>
                  <span className="font-bold text-stone-800">यंत्र रचना व संतुलन: </span>
                  {item.ergonomicDesign}
                </div>
                <div>
                  <span className="font-bold text-stone-800">पारंपरिक व सामाजिक महत्व: </span>
                  {item.traditionalSignificance}
                </div>
                <div className="bg-amber-50/20 p-2 rounded-lg border-l-2 border-amber-500 text-amber-800/90">
                  <span className="font-bold text-amber-700">देखभाल व स्थायित्व ज्ञान: </span>
                  {item.maintenanceLore}
                </div>
              </div>
            </div>

            {/* Admin Controls */}
            {isAdmin && (
              <div className="pt-3 border-t border-stone-200/80 flex items-center justify-end gap-2 mt-2">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-amber-200/30 text-amber-700 text-xs font-semibold border border-stone-200 transition-colors"
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
          <p className="text-sm font-semibold">कोई काष्ठ शिल्प प्रविष्टि नहीं मिली।</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchTerm('');
            }}
            className="mt-3 px-3.5 py-1.5 bg-amber-600 text-white rounded-lg text-xs font-semibold"
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
              <h3 className="text-xl font-bold text-amber-800 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                {items.some((it) => it.id === editingItem.id)
                  ? 'काष्ठ शिल्प संपादित करें'
                  : 'नया काष्ठ शिल्प जोड़ें'}
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
                    placeholder="उदा. ढेंकी व समठ (Dhenki ar Samot')"
                    className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-amber-500"
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
                    placeholder="उदा. Dhenki ar Samot'"
                    className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-amber-500"
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
                    placeholder="उदा. पारंपरिक पैर से चलने वाला काष्ठ धान कूटक यंत्र"
                    className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    श्रेणी (Category)
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => {
                      const val = e.target.value as WoodcraftItem['category'];
                      const labels: Record<WoodcraftItem['category'], string> = {
                        farming_tool: 'कृषि काष्ठ उपकरण',
                        domestic_furniture: 'घरेलू काष्ठ यंत्र',
                        acoustic_pastoral: 'पशु-ध्वनि उपकरण',
                        sacred_carving: 'पवित्र धार्मिक स्तंभ'
                      };
                      setEditingItem({
                        ...editingItem,
                        category: val,
                        categoryLabel: labels[val]
                      });
                    }}
                    className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-amber-500"
                  >
                    <option value="farming_tool">कृषि काष्ठ उपकरण</option>
                    <option value="domestic_furniture">घरेलू काष्ठ यंत्र</option>
                    <option value="acoustic_pastoral">पशु-ध्वनि उपकरण</option>
                    <option value="sacred_carving">पवित्र धार्मिक स्तंभ</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    काठ प्रजाति (Timber Species)
                  </label>
                  <input
                    type="text"
                    value={editingItem.timberSpecies}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, timberSpecies: e.target.value })
                    }
                    placeholder="उदा. साल, महुआ, शीशम"
                    className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-amber-500"
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
                    placeholder="उदा. गृह-शिल्प"
                    className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  यंत्र रचना व संतुलन विवरण
                </label>
                <textarea
                  rows={2}
                  value={editingItem.ergonomicDesign}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, ergonomicDesign: e.target.value })
                  }
                  placeholder="लीवर सिद्धांत, झुकाव या संयोजन का विवरण..."
                  className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  पारंपरिक व सामाजिक महत्व
                </label>
                <textarea
                  rows={2}
                  value={editingItem.traditionalSignificance}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, traditionalSignificance: e.target.value })
                  }
                  placeholder="पर्व, विवाह या आतिथ्य में इसका उपयोग..."
                  className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  देखभाल व स्थायित्व ज्ञान
                </label>
                <textarea
                  rows={2}
                  value={editingItem.maintenanceLore}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, maintenanceLore: e.target.value })
                  }
                  placeholder="तेल लगाना, दीमक से बचाव या मरम्मत की विधि..."
                  className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-amber-500"
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
                  className="flex items-center gap-2 px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-amber-900/40"
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

export default SantaliWoodcraftCarpentry;
