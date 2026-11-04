import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  Scissors,
  Sparkles,
  Volume2,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  RotateCcw,
  CheckCircle2,
  Palette,
  Layers,
  HelpCircle,
  Shirt,
  Flower2,
  Eye
} from 'lucide-react';

export interface HandloomItem {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  titleHindi: string;
  category: 'traditional_attire' | 'tussar_silk' | 'natural_dye' | 'loom_tool' | 'sacred_motif';
  categoryLabel: string;
  materialSource: string;
  dyeAndPatternDetails: string;
  culturalSignificance: string;
  weaverTechniqueLore: string;
  badge: string;
}

export const DEFAULT_HANDLOOM_ITEMS: HandloomItem[] = [
  {
    id: 'handloom_panchi_parhand',
    nameDevanagari: 'पंछी व पारहाड़ (Panchi ar Parhand - द्विखंडीय वस्त्र)',
    nameRoman: 'Panchi ar Parhand',
    titleHindi: 'संताल नारियों का पारंपरिक हस्तनिर्मित दो-खंड परिधान',
    category: 'traditional_attire',
    categoryLabel: 'पारंपरिक परिधान',
    materialSource: 'देशी मोटा कपास व तसर रेशम धागा (Handspun Khadi & Tussar)',
    dyeAndPatternDetails: 'श्वेत पृष्ठभूमि पर गहरे लाल, हरे और काले सूत से बुने गए त्रिकोणीय पहाड़ और नदी-तरंग के बॉर्डर।',
    culturalSignificance: 'संताल नारी की अस्मिता, मर्यादा और श्रमशीलता का प्रतीक। सोहराय, बाहा तथा विवाह में यह अनिवार्य सांस्कृतिक परिधान है।',
    weaverTechniqueLore: 'करघे पर दो पृथक वस्त्र बुने जाते हैं: पारहाड़ (कमर के नीचे का घाघरा-सदृश वस्त्र) और पंछी (ऊपरी शरीर व कंधे को लपेटने वाली चादर)।',
    badge: 'संताली नारी गौरव'
  },
  {
    id: 'handloom_tussar_kosa',
    nameDevanagari: 'तसर रेशम ककून व बुनाई (Tussar Silk / Kuku Resam)',
    nameRoman: 'Tussar Kuku ar Sut',
    titleHindi: 'आसन व अर्जुन के जंगलों से उत्पन्न प्राकृतिक वन्य सिल्क',
    category: 'tussar_silk',
    categoryLabel: 'वन्य रेशम शिल्प',
    materialSource: 'आसन (Hat) व कहुआ (Kahwa/Arjun) वृक्षों पर पलने वाले कीट (Antheraea paphia)',
    dyeAndPatternDetails: 'प्राकृतिक स्वर्णिम-भूरा (Golden Amber) रंग, जिसे बिना किसी रासायनिक ब्लीच के शुद्ध वनस्पति रंगों से रंगा जाता है।',
    culturalSignificance: 'संताल परगना और मयूरभंज के संताल आदिवासी पीढ़ियों से तसर ककून का संरक्षण करते आ रहे हैं। यह उनकी प्रमुख आजीविका और वन-संरक्षण का माध्यम है।',
    weaverTechniqueLore: 'ककून को उबालकर हाथ से तकली या चरखी द्वारा धागा निकाला जाता है। इसकी चमक और मजबूती समय के साथ और निखरती है।',
    badge: 'स्वर्णिम सिल्क'
  },
  {
    id: 'dye_palash_murup',
    nameDevanagari: 'मुरुप बाहा प्राकृतिक रंग (Palash Flower Saffron-Orange Dye)',
    nameRoman: 'Murup Baha Rang (Palash Dye)',
    titleHindi: 'पलाश के फूलों से निष्कर्षित केसरी व पीला वनस्पति रंग',
    category: 'natural_dye',
    categoryLabel: 'प्राकृतिक वनस्पति रंग',
    materialSource: 'फागुन-चैत में खिले सूखे पलाश (मुरुप) के फूल, फिटकरी व चूना',
    dyeAndPatternDetails: 'फूलों को रातभर जल में भिगोकर उबालने पर चटख नारंगी-केसरिया रंग प्राप्त होता है। चूना मिलाने पर गहरा लाल रंग बनता है।',
    culturalSignificance: 'बाहा पर्व और होली के समय संताल बुनकर सूत को इसी सुगंधित प्राकृतिक रंग से रंगते हैं, जो त्वचा के लिए अत्यंत गुणकारी है।',
    weaverTechniqueLore: 'रंग को पक्का करने के लिए हर्रे के पानी और बबूल के गोंद का उपयोग किया जाता है। यह रंग धूप में भी फीका नहीं पड़ता।',
    badge: 'केसरिया पलाश'
  },
  {
    id: 'dye_harad_iron_black',
    nameDevanagari: 'हर्रे व लोह-जल गहरा काला रंग (Harad ar Loha Dah)',
    nameRoman: 'Harad ar Loha Rang',
    titleHindi: 'हरड़ फल और जंग लगे लोहे के पानी से बना प्राकृतिक स्याह काला रंग',
    category: 'natural_dye',
    categoryLabel: 'प्राकृतिक वनस्पति रंग',
    materialSource: 'जंगली हरड़ फल (Haritaki), गुड़ और पुराने लोहे का किण्वित जल',
    dyeAndPatternDetails: 'हरड़ के टैनिन और आयरन एसीटेट की रासायनिक प्रतिक्रिया से चमकदार स्थायी काला-ग्रे रंग तैयार होता है।',
    culturalSignificance: 'पंछी-पारहाड़ के किनारों पर काले बॉर्डर और ज्यामितीय चिड़ियों की आंखें उकेरने के लिए इसका प्रयोग होता है।',
    weaverTechniqueLore: 'कपास के धागों को तीन दिनों तक इस घोल में डुबोकर धूप में सुखाया जाता है। यह धागों को दीमक और फफूंद से भी सुरक्षित रखता है।',
    badge: 'अमर काला रंग'
  },
  {
    id: 'motif_buru_chura',
    nameDevanagari: 'बुरु चूड़ा व गाडा ढेउ रूपांकन (Mountain & River Motifs)',
    nameRoman: 'Buru Chura ar Gada Dheu Motifs',
    titleHindi: 'पहाड़ की चोटियों और नदी की लहरों का ज्यामितीय ताना-बाना',
    category: 'sacred_motif',
    categoryLabel: 'पारंपरिक ज्यामितीय आकृतियां',
    materialSource: 'रंगीन सूत का अतिरिक्त बाना (Extra Weft Technique)',
    dyeAndPatternDetails: 'त्रिकोणीय जिग-जैग सीढ़ियां जो मरांग बुरु के पवित्र शिखरों और दामोदर नदी की कलकल लहरों को दर्शाती हैं।',
    culturalSignificance: 'संताल वस्त्र केवल तन ढकने का साधन नहीं, बल्कि प्रकृति के साथ उनके आध्यात्मिक रिश्ते का खुला मानचित्र है।',
    weaverTechniqueLore: 'बुनकर लकड़ी की पतली तीलियों (कांडी) से ताने के धागों को गिनकर बिना किसी ग्राफ पेपर के स्मृति-आधारित सटीकता से बुनते हैं।',
    badge: 'पवित्र रूपांकन'
  },
  {
    id: 'tool_tont_loom',
    nameDevanagari: 'संताली गढ़ा तंत व मकु (Tont Pit Loom ar Maku)',
    nameRoman: 'Santali Tont ar Maku',
    titleHindi: 'भूमिगत गड्ढा करघा, शटल व काष्ट उपकरण',
    category: 'loom_tool',
    categoryLabel: 'पारंपरिक करघा उपकरण',
    materialSource: 'साखू और शीशम की मजबूत लकड़ी, बांस की कंघी (Reed)',
    dyeAndPatternDetails: 'जमीन में 2 फीट गहरा गड्ढा खोदकर पैर से चलने वाले पैडल (Treadles) लगाए जाते हैं।',
    culturalSignificance: 'संताल गांवों में बुनकर समुदाय और संताल कृषकों का अटूट सामाजिक संबंध रहा है। अनाज के बदले वस्त्रों का आदान-प्रदान होता था।',
    weaverTechniqueLore: 'पैडल के दबाव से ताने के दो हिस्से ऊपर-नीचे होते हैं और मकु (शटल) तेजी से बाना धागा पार कराती है।',
    badge: 'काष्ट करघा'
  }
];

export const NATURAL_DYE_RECIPES = [
  {
    colorName: 'केसरिया / नारंगी (Saffron Orange)',
    sourceTree: 'पलाश फूल (Murup Baha)',
    method: 'सूखे फूलों को पानी में 45 मिनट उबालें, 2% फिटकरी (Alum) मोर्डेंट के रूप में मिलाएं। सूत को 24 घंटे भिगोएं।',
    fastness: 'अत्यंत स्थायी (Good lightfastness)'
  },
  {
    colorName: 'गहरा काला / स्लेटी (Deep Jet Black)',
    sourceTree: 'हर्रे फल + जंग लोह-जल (Harad + Iron Rust)',
    method: 'हरड़ चूर्ण में गुड़ व जंग लगे कील का 15 दिन पुराना पानी मिलाएं। धागे को डुबोकर धूप में सुखाएं।',
    fastness: 'धोने पर कभी नहीं छूटता'
  },
  {
    colorName: 'मिट्टी-कत्थई / भूरा (Terracotta Brown)',
    sourceTree: 'बबूल व जामुन की छाल (Babla ar Kuda Chhal)',
    method: 'पेड़ की बाहरी छाल को कूटकर 2 घंटे उबालें। तांबे के बर्तन में पकाने से गहरा लाल-कत्थई रंग बनता है।',
    fastness: 'उत्कृष्ट प्राकृतिक चमक'
  },
  {
    colorName: 'पीला / सुनहरी (Golden Yellow)',
    sourceTree: 'कच्ची हल्दी + दारूहल्दी (Sasang ar Daruharidra)',
    method: 'ताजी पिसी हल्दी में नींबू का रस मिलाकर सूत को रंगा जाता है। धूप में सुखाने पर स्वर्ण आभा आती है।',
    fastness: 'सुगंधित व रोगाणुरोधी'
  }
];

export const SantaliHandloomWeaving: React.FC = () => {
  const { isAdmin } = useAdmin();
  const STORAGE_KEY = 'hor_katha_handloom_db';

  const [items, setItems] = useState<HandloomItem[]>(() =>
    safeLoadFromStorage<HandloomItem[]>(STORAGE_KEY, DEFAULT_HANDLOOM_ITEMS)
  );

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDyeIndex, setSelectedDyeIndex] = useState<number>(0);

  // Admin CRUD state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<HandloomItem | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const saveItems = (updated: HandloomItem[]) => {
    setItems(updated);
    safeSaveToStorage(STORAGE_KEY, updated);
  };

  const handleResetToDefault = () => {
    if (window.confirm('क्या आप हथकरघा व रंगाई संग्रह को मूल डिफॉल्ट डेटा पर रीसेट करना चाहते हैं?')) {
      saveItems(DEFAULT_HANDLOOM_ITEMS);
      showNotification('हथकरघा डेटा डिफॉल्ट पर रीसेट कर दिया गया!');
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
      id: `handloom_${Date.now()}`,
      nameDevanagari: '',
      nameRoman: '',
      titleHindi: '',
      category: 'traditional_attire',
      categoryLabel: 'पारंपरिक परिधान',
      materialSource: 'देशी कपास व तसर सिल्क',
      dyeAndPatternDetails: '',
      culturalSignificance: '',
      weaverTechniqueLore: '',
      badge: 'नया वस्त्र शिल्प'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: HandloomItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.nameDevanagari.trim() || !editingItem.titleHindi.trim()) {
      alert('कृपया वस्त्र/रंगाई का नाम और हिंदी शीर्षक भरें!');
      return;
    }

    const index = items.findIndex((it) => it.id === editingItem.id);
    let updated: HandloomItem[];
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
      item.materialSource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dyeAndPatternDetails.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 p-4 md:p-8">
      {/* Top Banner & Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-rose-950/80 via-stone-900 to-amber-950/60 border border-rose-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-3">
                <Scissors className="w-3.5 h-3.5 text-rose-400" />
                <span>पारंपरिक वस्त्र बुनाई, तसर रेशम व प्राकृतिक वनस्पति रंगाई (Indigenous Handloom & Natural Dyeing)</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-rose-100 tracking-tight flex items-center gap-3">
                पंछी-पारहाड़, तसर रेशम व वनस्पति रंगाई
                <button
                  onClick={() =>
                speakWithFemaleVoice(
                  'संताली पारंपरिक वस्त्र बुनाई, पंछी पारहाड़, तसर रेशम एवं प्राकृतिक वनस्पति रंगाई शिल्प'
                )
              }
                  className="p-2 rounded-lg bg-rose-800/40 hover:bg-rose-700/60 text-rose-300 transition-colors"
                  title="उच्चारण सुनें"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </h1>
              <p className="text-stone-300 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
                संताल नारियों का स्वाभिमान पंछी-पारहाड़, आसन व अर्जुन वनों से उपजा प्राकृतिक तसर ककून (Kosa), पलाश व हर्रे से तैयार रासायनिक-मुक्त वनस्पति रंग और गड्ढा करघे (Tont) की लोक-कला का संपूर्ण दस्तावेजीकरण।
              </p>
            </div>

            {isAdmin && (
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={handleOpenAdd}
                  className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-rose-900/30 transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  नया वस्त्र शिल्प जोड़ें
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
            <div className="mt-4 p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-200 text-sm flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{feedbackMsg}</span>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Natural Botanical Dye Laboratory Showcase */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="bg-stone-900/90 border border-rose-900/40 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <Palette className="w-5 h-5 text-rose-400" />
              <h2 className="text-xl font-bold text-rose-100">
                प्राकृतिक वनस्पति रंग निष्कर्षण सूत्र (Botanical Dye Recipes)
              </h2>
            </div>
            <span className="text-xs text-stone-400 bg-stone-800 px-3 py-1 rounded-full border border-stone-700">
              रंग चुनें और जंगल की जड़ी-बूटियों से रंगाई विधि जानें
            </span>
          </div>

          {/* Dye Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {NATURAL_DYE_RECIPES.map((recipe, idx) => (
              <button
                key={recipe.colorName}
                onClick={() => setSelectedDyeIndex(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                  selectedDyeIndex === idx
                    ? 'bg-rose-950/70 border-rose-500 text-rose-100 shadow-md ring-1 ring-rose-500/50'
                    : 'bg-stone-800/60 border-stone-700/60 text-stone-400 hover:bg-stone-800 hover:text-stone-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-rose-400">रंग #{idx + 1}</span>
                  {selectedDyeIndex === idx && (
                    <Flower2 className="w-4 h-4 text-rose-400 animate-spin" />
                  )}
                </div>
                <div className="text-xs font-bold truncate">{recipe.colorName.split('(')[0]}</div>
                <div className="text-[10px] text-stone-400 truncate mt-0.5">{recipe.sourceTree}</div>
              </button>
            ))}
          </div>

          {/* Selected Dye Detail Showcase */}
          <div className="bg-gradient-to-r from-rose-950/40 to-stone-900 border border-rose-800/30 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wide">
                <span>स्रोत वृक्ष: {NATURAL_DYE_RECIPES[selectedDyeIndex].sourceTree}</span>
                <span>•</span>
                <span>{NATURAL_DYE_RECIPES[selectedDyeIndex].fastness}</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-rose-100">
                {NATURAL_DYE_RECIPES[selectedDyeIndex].colorName}
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                <strong className="text-rose-200">पारंपरिक निष्कर्षण विधि: </strong>
                {NATURAL_DYE_RECIPES[selectedDyeIndex].method}
              </p>
            </div>
            <button
              onClick={() =>
                speakWithFemaleVoice(
                  `${NATURAL_DYE_RECIPES[selectedDyeIndex].colorName}। स्रोत: ${NATURAL_DYE_RECIPES[selectedDyeIndex].sourceTree}। विधि: ${NATURAL_DYE_RECIPES[selectedDyeIndex].method}।`
                )
              }
              className="flex items-center gap-2 px-4 py-2.5 bg-rose-800/40 hover:bg-rose-700/50 text-rose-200 rounded-lg border border-rose-700/50 text-xs font-semibold transition-colors flex-shrink-0"
            >
              <Volume2 className="w-4 h-4" />
              रंगाई विधि सुनें
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {[
            { id: 'all', label: 'समस्त वस्त्र व रंग' },
            { id: 'traditional_attire', label: 'पंछी-पारहाड़' },
            { id: 'tussar_silk', label: 'तसर रेशम' },
            { id: 'natural_dye', label: 'वनस्पति रंग' },
            { id: 'sacred_motif', label: 'ज्यामितीय बॉर्डर' },
            { id: 'loom_tool', label: 'करघा उपकरण' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-rose-600 text-white'
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
            placeholder="खोजें (जैसे पंछी, तसर, पलाश, मकु)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3.5 py-2 bg-stone-800/90 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-rose-500"
          />
        </div>
      </div>

      {/* Main Grid of Handloom Artifacts */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-stone-900 border border-stone-800 hover:border-rose-700/60 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all group hover:-translate-y-1"
          >
            <div>
              {/* Header Badge & Category */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[11px] font-bold">
                  {item.badge}
                </span>
                <span className="text-stone-400 text-[11px] font-medium">{item.categoryLabel}</span>
              </div>

              {/* Title & Phonetic */}
              <div className="mb-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-rose-100 group-hover:text-rose-200 transition-colors">
                    {item.nameDevanagari}
                  </h3>
                  <button
                    onClick={() =>
                      speakWithFemaleVoice(
                        `${item.nameDevanagari}। ${item.titleHindi}। सामग्री: ${item.materialSource}।`
                      )
                    }
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-rose-400 transition-colors flex-shrink-0"
                    title="उच्चारण सुनें"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs font-mono text-rose-400/80 mt-0.5">{item.nameRoman}</div>
                <div className="text-xs font-semibold text-stone-300 mt-1">{item.titleHindi}</div>
              </div>

              {/* Material Source */}
              <div className="mb-3 p-2.5 rounded-xl bg-stone-950/60 border border-stone-800 text-xs">
                <div className="text-stone-400 font-semibold mb-0.5">सामग्री व तंतु स्रोत (Material):</div>
                <div className="text-rose-300 font-medium">{item.materialSource}</div>
              </div>

              {/* Pattern Details & Cultural Lore */}
              <div className="space-y-2 text-xs text-stone-300 leading-relaxed mb-4">
                <div>
                  <span className="font-bold text-stone-200">रंग व ज्यामितीय डिजाइन: </span>
                  {item.dyeAndPatternDetails}
                </div>
                <div>
                  <span className="font-bold text-stone-200">सांस्कृतिक व सामाजिक महत्व: </span>
                  {item.culturalSignificance}
                </div>
                <div className="bg-rose-950/20 p-2 rounded-lg border-l-2 border-rose-500 text-rose-200/90">
                  <span className="font-bold text-rose-300">बुनकर तकनीक व लोक-ज्ञान: </span>
                  {item.weaverTechniqueLore}
                </div>
              </div>
            </div>

            {/* Admin Controls */}
            {isAdmin && (
              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-end gap-2 mt-2">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-rose-600/30 text-rose-300 text-xs font-semibold border border-stone-700 transition-colors"
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
          <p className="text-sm font-semibold">कोई वस्त्र या रंगाई शिल्प नहीं मिला।</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchTerm('');
            }}
            className="mt-3 px-3.5 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-semibold"
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
              <h3 className="text-xl font-bold text-rose-200 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-rose-400" />
                {items.some((it) => it.id === editingItem.id)
                  ? 'वस्त्र शिल्प संपादित करें'
                  : 'नया वस्त्र शिल्प जोड़ें'}
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
                    placeholder="उदा. पंछी व पारहाड़ (Panchi ar Parhand)"
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-rose-500"
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
                    placeholder="उदा. Panchi ar Parhand"
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-rose-500"
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
                    placeholder="उदा. संताल नारियों का पारंपरिक हस्तनिर्मित दो-खंड परिधान"
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    श्रेणी (Category)
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => {
                      const val = e.target.value as HandloomItem['category'];
                      const labels: Record<HandloomItem['category'], string> = {
                        traditional_attire: 'पारंपरिक परिधान',
                        tussar_silk: 'वन्य रेशम शिल्प',
                        natural_dye: 'प्राकृतिक वनस्पति रंग',
                        sacred_motif: 'पारंपरिक ज्यामितीय आकृतियां',
                        loom_tool: 'पारंपरिक करघा उपकरण'
                      };
                      setEditingItem({
                        ...editingItem,
                        category: val,
                        categoryLabel: labels[val]
                      });
                    }}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-rose-500"
                  >
                    <option value="traditional_attire">पारंपरिक परिधान</option>
                    <option value="tussar_silk">वन्य रेशम शिल्प</option>
                    <option value="natural_dye">प्राकृतिक वनस्पति रंग</option>
                    <option value="sacred_motif">पारंपरिक ज्यामितीय आकृतियां</option>
                    <option value="loom_tool">पारंपरिक करघा उपकरण</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    तंतु / सामग्री स्रोत (Material Source)
                  </label>
                  <input
                    type="text"
                    value={editingItem.materialSource}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, materialSource: e.target.value })
                    }
                    placeholder="उदा. देशी खादी कपास व तसर रेशम धागा"
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-rose-500"
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
                    placeholder="उदा. संताली नारी गौरव"
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  रंग व डिजाइन विवरण (Dye & Pattern Details)
                </label>
                <textarea
                  rows={2}
                  value={editingItem.dyeAndPatternDetails}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, dyeAndPatternDetails: e.target.value })
                  }
                  placeholder="बॉर्डर रूपांकन, रंगाई व ताने-बाने का विवरण..."
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-rose-500"
                />
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
                  placeholder="उत्सव, बाहा, सोहराय या दैनिक जीवन में महत्व..."
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  बुनकर तकनीक व लोक-ज्ञान (Weaver Lore)
                </label>
                <textarea
                  rows={2}
                  value={editingItem.weaverTechniqueLore}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, weaverTechniqueLore: e.target.value })
                  }
                  placeholder="करघे पर बुनाई, तकली या ककून धागा निकालने की विधि..."
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-rose-500"
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
                  className="flex items-center gap-2 px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-rose-900/40"
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

export default SantaliHandloomWeaving;
