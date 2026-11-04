import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  Flame,
  Hammer,
  Sparkles,
  Volume2,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Layers,
  HelpCircle,
  Award,
  CircleDot
} from 'lucide-react';

export interface DhokraItem {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  titleHindi: string;
  category: 'sacred_sculpture' | 'utilitarian_measure' | 'ornament' | 'musical_ritual';
  categoryLabel: string;
  metalComposition: string;
  culturalSignificance: string;
  craftingTechnique: string;
  santaliUsageLore: string;
  badge: string;
}

export const DEFAULT_DHOKRA_ITEMS: DhokraItem[] = [
  {
    id: 'dhokra_pai_ser',
    nameDevanagari: 'पाई व सेर (Pai ar Ser - पवित्र धान माप पात्र)',
    nameRoman: 'Pai ar Ser (Dhokra Measure)',
    titleHindi: 'पारंपरिक ढोकरा धातु का बना अन्न माप पात्र',
    category: 'utilitarian_measure',
    categoryLabel: 'पारंपरिक माप पात्र',
    metalComposition: 'कांसा, पीतल व रांगा (Bell metal & Brass alloy)',
    culturalSignificance: 'संताल समाज में सोहराय, माघ सिमी और विवाह के समय धान मापने का पवित्र पात्र। इसके बिना शादी में लेन-देन व करम पूजा अधूरी मानी जाती है।',
    craftingTechnique: 'मोम की महीन तारदार लच्छियों को घुमावदार चक्रव्यूह में लपेटकर बाहरी सतह पर ज्यामितीय मछली व पक्षी रूपांकन उकेरे जाते हैं।',
    santaliUsageLore: 'इसे घर की लक्ष्मी और अन्नदाता का प्रतीक माना जाता है। धान की पहली फसल इसी पाई से मापकर बोंगा को अर्पित की जाती है।',
    badge: 'अन्न-लक्ष्मी माप'
  },
  {
    id: 'dhokra_bonga_sadom',
    nameDevanagari: 'बोंगा सादोम व हाति (Bonga Sadom ar Hati - अश्व व गज)',
    nameRoman: 'Bonga Sadom ar Hati',
    titleHindi: 'देवता को समर्पित पवित्र धोकरा अश्व व हाथी',
    category: 'sacred_sculpture',
    categoryLabel: 'धार्मिक मूर्तिशिल्प',
    metalComposition: 'पारंपरिक घंटी धातु (Bell-metal alloy)',
    culturalSignificance: 'जाहिर थान, माँझी थान तथा ग्राम्य बोंगा के थान पर मन्नत पूरी होने पर कांसा-पीतल का अश्व अथवा हाथी अर्पित किया जाता है।',
    craftingTechnique: 'अंदर लाल मिट्टी की कोर रखकर ऊपर मधुमक्खी मोम की महीन जालियों से गर्दन के बाल, लगाम और सजावटी घंटी बनाई जाती है।',
    santaliUsageLore: 'संताल विश्वास के अनुसार बोंगा (देवी-देवता) इन अश्वों पर सवार होकर रात में गाँव की विपत्तियों से रक्षा करते हैं।',
    badge: 'पवित्र अर्पण'
  },
  {
    id: 'dhokra_hasli',
    nameDevanagari: 'धोकरा हांसली व कंठहार (Hansli - Metal Torque)',
    nameRoman: 'Dhokra Hansli ar Hotok Mala',
    titleHindi: 'कंठ में धारण करने वाला पारंपरिक ठोस धातु आभूषण',
    category: 'ornament',
    categoryLabel: 'पारंपरिक आभूषण',
    metalComposition: 'शुद्ध पीतल व रांगा (Brass with Tin coating)',
    culturalSignificance: 'संताल युवतियों एवं महिलाओं द्वारा सोहराय, बाहा नृत्य और विवाह उत्सवों में पारंपरिक पंछी-पारहाड़ वस्त्र के साथ गले में पहना जाता है।',
    craftingTechnique: 'अर्ध-चंद्राकार धातु को खोया-मोम विधि से ढालकर किनारों पर ज्यामितीय त्रिभुज, सूर्य किरणें और वनस्पति आकृतियां उकेरी जाती हैं।',
    santaliUsageLore: 'हांसली केवल आभूषण नहीं, बल्कि संताल नारी के गौरव, स्वाभिमान और स्वास्थ्य (गले की नसों को सुरक्षा) का संवाहक है।',
    badge: 'नारी सौंदर्य'
  },
  {
    id: 'dhokra_dhibri',
    nameDevanagari: 'धोकरा दिया व पंचमुखी धीबरी (Dhokra Dhibri / Chiraag)',
    nameRoman: 'Dhokra Dhibri ar Chiraag',
    titleHindi: 'पारंपरिक अखंड धातु दीप व बत्ती पात्र',
    category: 'utilitarian_measure',
    categoryLabel: 'पवित्र दीप पात्र',
    metalComposition: 'पीतल व कांसा (Cast Brass)',
    culturalSignificance: 'सोहराय पर्व की रात गौशाला (गोड़ा) में तेल भरकर गाय-बैलों के स्वागत और बोंगा सम्मान हेतु इस कलात्मक दिए को प्रज्ज्वलित किया जाता है।',
    craftingTechnique: 'मयूर अथवा मुर्गे की आकृति वाले हत्थे के साथ मोम तार विधि से निर्मित अखंड कटोरी, जिसमें महुआ या सरसों तेल भरा जाता है।',
    santaliUsageLore: 'प्रकाश को अंधेरे और दुष्ट शक्तियों पर विजय का प्रतीक माना जाता है। इस दिए की लौ से सोहराय में बैलों की आरती की जाती है।',
    badge: 'सोहराय दीप'
  },
  {
    id: 'dhokra_ghanti_rujung',
    nameDevanagari: 'रुजुंग व घंटी (Rujung, Ghanti ar Junjhuna)',
    nameRoman: 'Rujung ar Ghanti (Dance Bells)',
    titleHindi: 'मांदर-धमसा नृत्य के लिए ढोकरा कांसा घुंघरू व घंटी',
    category: 'musical_ritual',
    categoryLabel: 'संगीत व ताल उपकरण',
    metalComposition: 'उच्च प्रतिध्वनि कांसा (High-Resonance Bronze)',
    culturalSignificance: 'संताली सामूहिक नृत्य में नर्तक अपने पैरों में रुजुंग (कांसा घुंघरू) बांधते हैं और मांदर की थाप पर खनकती ताल उत्पन्न करते हैं।',
    craftingTechnique: 'खोखली धातु की गोलियां जिनके भीतर छोटी लोहे/पीतल की कंकड़ी सील की जाती है, जिससे तीक्ष्ण व सुरीली ध्वनि निकलती है।',
    santaliUsageLore: 'इनकी ध्वनि से जंगल के विषैले जीव दूर रहते हैं और सामूहिक नृत्य में एकरूप लयबद्धता बनी रहती है।',
    badge: 'नृत्य ताल'
  },
  {
    id: 'dhokra_sakom_bala',
    nameDevanagari: 'धोकरा साकोम व खागू बाड़ा (Sakom ar Khagu Bala)',
    nameRoman: 'Dhokra Sakom ar Bala',
    titleHindi: 'कलाई में पहने जाने वाले कलात्मक धातु कंगन',
    category: 'ornament',
    categoryLabel: 'पारंपरिक आभूषण',
    metalComposition: 'सॉलिड ब्रास व ब्रॉन्ज (Solid Brass & Bronze)',
    culturalSignificance: 'विवाह के समय संताल वधू को सास और माँ द्वारा उपहार स्वरूप प्रदान किए जाने वाले पवित्र सुरक्षा कंगन।',
    craftingTechnique: 'मोम की सर्पिलाकार और धारीदार तारों को लपेटकर बाहरी उभार (स्पाइक्स) और बारीक जालीदार काम किया जाता है।',
    santaliUsageLore: 'हाथों को मजबूती प्रदान करने और कृषि कार्यों के दौरान कलाई की सुरक्षा के लिए पारंपरिक रूप से पहना जाता है।',
    badge: 'कलाई कंगन'
  }
];

export const DHOKRA_PROCESS_STEPS = [
  {
    stepNumber: '01',
    titleHindi: 'मिट्टी की कोर संरचना (Mitti Core)',
    santaliTerm: 'हसा कोर (Hasa Core Banav)',
    description: 'काली चिकनी मिट्टी में धान की भूसी और बालू मिलाकर वस्तु की मूल आकृति का आंतरिक ढांचा तैयार कर धूप में सुखाया जाता है।'
  },
  {
    stepNumber: '02',
    titleHindi: 'मधुमक्खी मोम के तारों की नक्काशी',
    santaliTerm: 'नेले मोम तार (Nele Mom ar Torkha)',
    description: 'शुद्ध मोम और राल (धुना) को गर्म कर लकड़ी की छलनी (पिचकारी) से पतले-पतले तार बनाकर कोर पर लपेटे जाते हैं और बारीक नक्काशी की जाती है।'
  },
  {
    stepNumber: '03',
    titleHindi: 'मिट्टी का द्वितीय व तृतीय लेप (Moulding)',
    santaliTerm: 'हसा लेप (Khol Banav)',
    description: 'मोम के ढांचे पर पहले बारीक चिकनी मिट्टी का घोल चढ़ाया जाता है, फिर मोटी मिट्टी और गोबर का खोल बनाकर धातु डालने का कीप (Crucible) जोड़ा जाता है।'
  },
  {
    stepNumber: '04',
    titleHindi: 'भट्टी में तपाना व मोम निकास (Lost Wax)',
    santaliTerm: 'भाथी रे लोल (Moam Pighlav)',
    description: 'कोयले की भट्टी में सांचे को तपाया जाता है। गर्मी से मोम पिघलकर बाहर बह जाता है और धातु के लिए खाली स्थान (Cavity) बन जाता है।'
  },
  {
    stepNumber: '05',
    titleHindi: 'पिघली धातु की ढलाई (Molten Metal Casting)',
    santaliTerm: 'दुल (Dhat Dhangav ar Dul)',
    description: 'कांसा या पीतल के टुकड़ों को उच्च तापमान (1100°C) पर पिघलाकर सांचे में उड़ेला जाता है, जो मोम द्वारा छोड़े गए स्थान में भर जाता है।'
  },
  {
    stepNumber: '06',
    titleHindi: 'खोल तोड़ना व हस्त-पॉलिशिंग (Finishing)',
    santaliTerm: 'हसा रापुद ar सपारो (Chamakao)',
    description: 'ठंडा होने पर बाहरी मिट्टी का खोल तोड़ दिया जाता है। हथौड़ी, रेती और तार के ब्रश से घिसकर सुनहरी ढोकरा कलाकृति तैयार होती है।'
  }
];

export const SantaliDhokraArt: React.FC = () => {
  const { isAdmin } = useAdmin();
  const STORAGE_KEY = 'hor_katha_dhokra_db';

  const [items, setItems] = useState<DhokraItem[]>(() =>
    safeLoadFromStorage<DhokraItem[]>(STORAGE_KEY, DEFAULT_DHOKRA_ITEMS)
  );

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProcessStep, setSelectedProcessStep] = useState<number>(0);

  // Admin CRUD state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DhokraItem | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const saveItems = (updated: DhokraItem[]) => {
    setItems(updated);
    safeSaveToStorage(STORAGE_KEY, updated);
  };

  const handleResetToDefault = () => {
    if (window.confirm('क्या आप धोकरा कला संग्रह को मूल डिफॉल्ट डेटा पर रीसेट करना चाहते हैं?')) {
      saveItems(DEFAULT_DHOKRA_ITEMS);
      showNotification('धोकरा कला डेटा डिफॉल्ट पर रीसेट कर दिया गया!');
    }
  };

  const handleDeleteItem = (id: string, name: string) => {
    if (window.confirm(`क्या आप "${name}" को सचमुच हटाना चाहते हैं?`)) {
      const updated = items.filter((it) => it.id !== id);
      saveItems(updated);
      showNotification(`"${name}" सफलतापूर्वक हटाया गया!`);
    }
  };

  const handleOpenAdd = () => {
    setEditingItem({
      id: `dhokra_${Date.now()}`,
      nameDevanagari: '',
      nameRoman: '',
      titleHindi: '',
      category: 'utilitarian_measure',
      categoryLabel: 'पारंपरिक माप पात्र',
      metalComposition: 'कांसा व पीतल',
      culturalSignificance: '',
      craftingTechnique: '',
      santaliUsageLore: '',
      badge: 'नई कलाकृति'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: DhokraItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.nameDevanagari.trim() || !editingItem.titleHindi.trim()) {
      alert('कृपया कलाकृति का नाम और हिंदी शीर्षक भरें!');
      return;
    }

    const index = items.findIndex((it) => it.id === editingItem.id);
    let updated: DhokraItem[];
    if (index >= 0) {
      updated = [...items];
      updated[index] = editingItem;
      showNotification(`"${editingItem.titleHindi}" अपडेट कर दिया गया!`);
    } else {
      updated = [editingItem, ...items];
      showNotification(`"${editingItem.titleHindi}" नई कलाकृति जोड़ी गई!`);
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
      item.culturalSignificance.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.metalComposition.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 p-4 md:p-8">
      {/* Top Banner & Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-amber-950/80 via-stone-900 to-amber-900/60 border border-amber-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>4000 वर्ष प्राचीन खोया-मोम धातु शिल्प (Lost-Wax Bell Metal)</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-amber-200 tracking-tight flex items-center gap-3">
                संताली धोकरा धातु-कला व कमार विरासत
                <button
                  onClick={() => speakWithFemaleVoice('संताली धोकरा धातु-कला एवं खोया-मोम ढलाई शिल्प')}
                  className="p-2 rounded-lg bg-amber-800/40 hover:bg-amber-700/60 text-amber-300 transition-colors"
                  title="उच्चारण सुनें"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </h1>
              <p className="text-stone-300 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
                संताल परगना, मानभूम व मयूरभंज की प्राचीन ढोकरा (कांसा-पीतल ढलाई) परंपरा। मधुमक्खी के मोम (नेले मोम) के महीन तारों से बनी पाई-सेर, बोंगा थान के घोड़े-हाथी और नारी आभूषणों का सजीव शिल्प विधान।
              </p>
            </div>

            {isAdmin && (
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={handleOpenAdd}
                  className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-amber-900/30 transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  नई कलाकृति जोड़ें
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
            <div className="mt-4 p-3 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-200 text-sm flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-amber-400" />
              <span>{feedbackMsg}</span>
            </div>
          )}
        </div>
      </div>

      {/* Interactive 6-Step Lost-Wax Process Visualizer */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="bg-stone-900/90 border border-amber-900/40 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-bold text-amber-100">
                खोया-मोम ढलाई प्रक्रिया (6-Step Cire-Perdue Method)
              </h2>
            </div>
            <span className="text-xs text-stone-400 bg-stone-800 px-3 py-1 rounded-full border border-stone-700">
              प्रत्येक चरण पर क्लिक करके संताली शिल्प विधि समझें
            </span>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
            {DHOKRA_PROCESS_STEPS.map((step, idx) => (
              <button
                key={step.stepNumber}
                onClick={() => setSelectedProcessStep(idx)}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                  selectedProcessStep === idx
                    ? 'bg-amber-950/70 border-amber-500 text-amber-200 shadow-md ring-1 ring-amber-500/50'
                    : 'bg-stone-800/60 border-stone-700/60 text-stone-400 hover:bg-stone-800 hover:text-stone-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-amber-500">{step.stepNumber}</span>
                  {selectedProcessStep === idx && (
                    <CircleDot className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  )}
                </div>
                <div className="text-xs font-bold truncate">{step.titleHindi.split('(')[0]}</div>
                <div className="text-[10px] text-stone-400 truncate mt-0.5">{step.santaliTerm}</div>
              </button>
            ))}
          </div>

          {/* Selected Step Detail Showcase */}
          <div className="bg-gradient-to-r from-amber-950/30 to-stone-900 border border-amber-800/30 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wide">
                <span>चरण {DHOKRA_PROCESS_STEPS[selectedProcessStep].stepNumber}</span>
                <span>•</span>
                <span>{DHOKRA_PROCESS_STEPS[selectedProcessStep].santaliTerm}</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-amber-100">
                {DHOKRA_PROCESS_STEPS[selectedProcessStep].titleHindi}
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                {DHOKRA_PROCESS_STEPS[selectedProcessStep].description}
              </p>
            </div>
            <button
              onClick={() =>
                speakWithFemaleVoice(
                  `${DHOKRA_PROCESS_STEPS[selectedProcessStep].titleHindi}। ${DHOKRA_PROCESS_STEPS[selectedProcessStep].description}`
                )
              }
              className="flex items-center gap-2 px-3.5 py-2 bg-amber-800/40 hover:bg-amber-700/50 text-amber-200 rounded-lg border border-amber-700/50 text-xs font-semibold transition-colors flex-shrink-0"
            >
              <Volume2 className="w-4 h-4" />
              चरण ऑडियो सुनें
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {[
            { id: 'all', label: 'समस्त कलाकृतियां' },
            { id: 'utilitarian_measure', label: 'माप व दीप पात्र' },
            { id: 'sacred_sculpture', label: 'बोंगा मूर्तियां' },
            { id: 'ornament', label: 'पारंपरिक आभूषण' },
            { id: 'musical_ritual', label: 'नृत्य घुंघरू' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-amber-600 text-white'
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
            placeholder="खोजें (जैसे पाई, हांसली, कांसा)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3.5 py-2 bg-stone-800/90 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Main Grid of Dhokra Artifacts */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-stone-900 border border-stone-800 hover:border-amber-700/60 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all group hover:-translate-y-1"
          >
            <div>
              {/* Header Badge & Category */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold">
                  {item.badge}
                </span>
                <span className="text-stone-400 text-[11px] font-medium">{item.categoryLabel}</span>
              </div>

              {/* Title & Phonetic */}
              <div className="mb-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-amber-100 group-hover:text-amber-200 transition-colors">
                    {item.nameDevanagari}
                  </h3>
                  <button
                    onClick={() =>
                      speakWithFemaleVoice(
                        `${item.nameDevanagari}। ${item.titleHindi}। धातु संरचना: ${item.metalComposition}।`
                      )
                    }
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 transition-colors flex-shrink-0"
                    title="उच्चारण सुनें"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs font-mono text-amber-400/80 mt-0.5">{item.nameRoman}</div>
                <div className="text-xs font-semibold text-stone-300 mt-1">{item.titleHindi}</div>
              </div>

              {/* Composition */}
              <div className="mb-3 p-2.5 rounded-xl bg-stone-950/60 border border-stone-800 text-xs">
                <div className="text-stone-400 font-semibold mb-0.5">धातु मिश्रण व संघटन:</div>
                <div className="text-amber-300 font-medium">{item.metalComposition}</div>
              </div>

              {/* Cultural Significance & Technique */}
              <div className="space-y-2 text-xs text-stone-300 leading-relaxed mb-4">
                <div>
                  <span className="font-bold text-stone-200">सामाजिक व सांस्कृतिक महत्व: </span>
                  {item.culturalSignificance}
                </div>
                <div>
                  <span className="font-bold text-stone-200">निर्माण तकनीक: </span>
                  {item.craftingTechnique}
                </div>
                <div className="bg-amber-950/20 p-2 rounded-lg border-l-2 border-amber-500 text-amber-200/90">
                  <span className="font-bold text-amber-300">संताली लोक-विश्वास: </span>
                  {item.santaliUsageLore}
                </div>
              </div>
            </div>

            {/* Admin Controls */}
            {isAdmin && (
              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-end gap-2 mt-2">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-amber-600/30 text-amber-300 text-xs font-semibold border border-stone-700 transition-colors"
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
          <p className="text-sm font-semibold">कोई धोकरा कलाकृति नहीं मिली।</p>
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
          <div className="bg-stone-900 border border-stone-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-4">
              <h3 className="text-xl font-bold text-amber-200 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                {items.some((it) => it.id === editingItem.id)
                  ? 'धोकरा कलाकृति संपादित करें'
                  : 'नई धोकरा कलाकृति जोड़ें'}
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
                    placeholder="उदा. पाई व सेर (Pai ar Ser)"
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-amber-500"
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
                    placeholder="उदा. Pai ar Ser"
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-amber-500"
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
                    placeholder="उदा. पारंपरिक ढोकरा धातु का बना अन्न माप पात्र"
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    श्रेणी (Category)
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => {
                      const val = e.target.value as DhokraItem['category'];
                      const labels: Record<DhokraItem['category'], string> = {
                        utilitarian_measure: 'पारंपरिक माप पात्र',
                        sacred_sculpture: 'धार्मिक मूर्तिशिल्प',
                        ornament: 'पारंपरिक आभूषण',
                        musical_ritual: 'संगीत व ताल उपकरण'
                      };
                      setEditingItem({
                        ...editingItem,
                        category: val,
                        categoryLabel: labels[val]
                      });
                    }}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="utilitarian_measure">पारंपरिक माप पात्र</option>
                    <option value="sacred_sculpture">धार्मिक मूर्तिशिल्प</option>
                    <option value="ornament">पारंपरिक आभूषण</option>
                    <option value="musical_ritual">संगीत व ताल उपकरण</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    धातु मिश्रण (Metal Composition)
                  </label>
                  <input
                    type="text"
                    value={editingItem.metalComposition}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, metalComposition: e.target.value })
                    }
                    placeholder="उदा. कांसा, पीतल व रांगा"
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-amber-500"
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
                    placeholder="उदा. अन्न-लक्ष्मी माप"
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  सांस्कृतिक महत्व (Cultural Significance)
                </label>
                <textarea
                  rows={2}
                  value={editingItem.culturalSignificance}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, culturalSignificance: e.target.value })
                  }
                  placeholder="विवाह, पूजा या सामाजिक उत्सवों में इस वस्तु का उपयोग..."
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  शिल्प तकनीक (Crafting Technique)
                </label>
                <textarea
                  rows={2}
                  value={editingItem.craftingTechnique}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, craftingTechnique: e.target.value })
                  }
                  placeholder="मोम तार विधि, नक्काशी व सांचा निर्माण का विवरण..."
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  संताली लोक-विश्वास व उपयोग कथा (Santali Lore)
                </label>
                <textarea
                  rows={2}
                  value={editingItem.santaliUsageLore}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, santaliUsageLore: e.target.value })
                  }
                  placeholder="पूर्वजों की मान्यता, लोकगीत या बोंगा पूजा से जुड़ी कथा..."
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-amber-500"
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

export default SantaliDhokraArt;
