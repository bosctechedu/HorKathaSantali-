import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  Droplets,
  Waves,
  Mountain,
  Sparkles,
  Volume2,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  RotateCcw,
  CheckCircle2,
  Compass,
  Layers,
  HelpCircle,
  CloudRain,
  ShieldAlert,
  ArrowDownCircle
} from 'lucide-react';

export interface WaterHarvestingItem {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  titleHindi: string;
  category: 'natural_spring' | 'contour_bund' | 'sacred_pond' | 'land_slope' | 'sacred_prayer';
  categoryLabel: string;
  landscapeZone: string;
  technicalMechanism: string;
  culturalEcologyLore: string;
  conservationRules: string;
  badge: string;
}

export const DEFAULT_WATER_ITEMS: WaterHarvestingItem[] = [
  {
    id: 'water_dadi',
    nameDevanagari: 'डाड़ी (Dadi - प्राकृतिक भूगर्भित झिरिया/स्रोत)',
    nameRoman: 'Dadi (Perennial Spring)',
    titleHindi: 'साखू-जंगलों से छनकर रिसने वाला पवित्र पेयजल स्रोत',
    category: 'natural_spring',
    categoryLabel: 'प्राकृतिक पेयजल स्रोत',
    landscapeZone: 'पहाड़ी तलहटी (Foothill Spring Zone)',
    technicalMechanism: 'पहाड़ी पर साल (Sarjom) व महुआ के पेड़ों की गहरी जड़ों से छनकर आने वाला वर्षा जल चट्टानी दरारों से धीरे-धीरे मीठे व मिनरल युक्त पानी के रूप में रिसता है। इसके चारों ओर पत्थर चिनाई की जाती है।',
    culturalEcologyLore: 'संताल गांवों में डाड़ी को अति पवित्र माना जाता है। महिलाएं प्रातःकाल मिट्टी के घड़े (टुकी) में जल भरती हैं। डाड़ी का पानी भीषण गर्मी में भी ठंडा और अमृततुल्य मीठा रहता है।',
    conservationRules: 'डाड़ी परिसर में जूते-चप्पल पहनना, कपड़े धोना या साबुन लगाना घोर वर्जित है। यदि कोई जल को दूषित करे तो माँझी बैसी द्वारा कड़ा दंड दिया जाता है।',
    badge: 'अमृत पेय स्रोत'
  },
  {
    id: 'water_ahar_bandh',
    nameDevanagari: 'आहार व बांध (Ahar ar Bandh - कंटूर जल संचयन)',
    nameRoman: 'Ahar ar Bandh',
    titleHindi: 'ढलानों पर निर्मित पारंपरिक मिट्टी का चेकडैम व जलाशय',
    category: 'contour_bund',
    categoryLabel: 'कंटूर जल संचयन',
    landscapeZone: 'मध्य ढलान व घाटी मुहाना (Mid-slope Gully catchment)',
    technicalMechanism: 'पहाड़ों से बहकर आने वाले तेज बरसाती पानी (बुरु दाः) को रोकने के लिए अर्ध-चंद्राकार मिट्टी की मजबूत पाल (Embankment) बनाई जाती है। अतिरिक्त जल निकासी के लिए पत्थर का प्राकृतिक अपवाह (Weir/Khalo) रहता है।',
    culturalEcologyLore: 'यह गुरुत्वाकर्षण (Gravity Irrigation) से नीचे के सीढ़ीदार धान खेतों (बायद व कनाली) को लगातार नम रखता है। इससे संताल परगना में सूखे के वर्षों में भी फसल बची रहती है।',
    conservationRules: 'रोहिणी और आषाढ़ से पूर्व समस्त ग्रामीण श्रमदान (Gao-Shram) करके बांध की मरम्मत और तलछट (सिल्ट) की सफाई करते हैं। जल का बंटवारा बारी-बारी (पारी) से होता है।',
    badge: 'सामूहिक सिंचाई'
  },
  {
    id: 'water_pukhuri',
    nameDevanagari: 'पुखुरी व बोंगा गाड़ पोखरा (Pukhuri ar Bonga Pukhri)',
    nameRoman: 'Pukhuri (Sacred Pond)',
    titleHindi: 'ग्राम्य जीवन, पशुधन व बोंगा अनुष्ठान का पवित्र तालाब',
    category: 'sacred_pond',
    categoryLabel: 'पवित्र ग्राम्य तालाब',
    landscapeZone: 'ग्राम्य केंद्र व निचली घाटी (Village Center)',
    technicalMechanism: 'कम से कम 10 से 15 फीट गहरा तालाब जिसके किनारों पर बरगद, पीपल और कदम के छायादार वृक्ष लगाए जाते हैं ताकि वाष्पीकरण (Evaporation) कम हो।',
    culturalEcologyLore: 'सोहराय पर्व के दौरान गौधन (गाय-बैलों) को इसी पुखुरी में हल्दी और सरसों तेल लगाकर नहलाया जाता है। बाहा पर्व के लिए कमल और जल-पुष्प यहीं से एकत्र किए जाते हैं।',
    conservationRules: 'पुखुरी में मछली पकड़ने के लिए माँझी हाड़ाम की अनुमति आवश्यक होती है। शिकार-सेंदरा के बाद सामूहिक रूप से आखेटक यहां स्नान करते हैं।',
    badge: 'गौधन व अनुष्ठान'
  },
  {
    id: 'water_dak_bakher',
    nameDevanagari: 'दाः बाखेड़ (Dak\' Bakher - वर्षा व मेघ प्रार्थना)',
    nameRoman: 'Dak\' Bakher (Rain Invocation)',
    titleHindi: 'इंद्र/मेघ बोंगा से समय पर वर्षा कराने हेतु पारंपरिक प्रार्थना',
    category: 'sacred_prayer',
    categoryLabel: 'पवित्र वर्षा मंत्र',
    landscapeZone: 'जाहिर थान (Sacred Grove)',
    technicalMechanism: 'रोहिण (Rohin) व एरोक पर्व पर नायके (Naike) द्वारा जाहिर थान में सफेद मुर्गे की बलि देकर सखुआ के पत्तों पर जल छिड़क कर प्रकृति से अनुनय की जाती है।',
    culturalEcologyLore: '"ए मरांग बुरु, ए जाहिर एरा, सागे-सागे दाः जरिमे, खेत-खारि रे सोनोत धान बाहावः मा" - अर्थात हे मरांग बुरु, अमृतमयी वर्षा बरसाओ ताकि धरती की गोद हरी-भरी हो जाए।',
    conservationRules: 'यदि अनावृष्टि (अकाल) पड़े तो कुड़ाम नायके द्वारा गांव के बाहर बोंगा की विशेष विनती की जाती है और कोई भी व्यर्थ जल नहीं बहाता।',
    badge: 'पवित्र जल-मंत्र'
  },
  {
    id: 'land_classification_terraces',
    nameDevanagari: 'संताली 4-स्तरीय ढलान वर्गीकरण (टांड़, बायद, कनाली, बहल)',
    nameRoman: 'Tand, Bayad, Kanali, Bahal Slope Matrix',
    titleHindi: 'वर्षा जल प्रवाह अनुसार भूमि व फसल का वैज्ञानिक विभाजन',
    category: 'land_slope',
    categoryLabel: 'पारंपरिक ढलान विज्ञान',
    landscapeZone: 'समस्त वाटरशेड (Upland to Valley floor)',
    technicalMechanism: 'ऊपरी टांड़ (Tand) वर्षा जल को सोखता है। मध्य बायद (Bayad) मध्यम पानी वाले धान को सींचता है। निचला कनाली (Kanali) और बहल (Bahal/Jobda) वर्ष भर नमी बनाए रखता है।',
    culturalEcologyLore: 'यह बिना किसी बाहरी मोटर या बिजली के प्रकृति के ढलान और जल गुरुत्व का सर्वोच्च उपयोग है, जिसे संताल पुरखों ने सदियों के अनुभव से गढ़ा है।',
    conservationRules: 'प्रत्येक खेत के आहर-मेड़ (Ail) पर दूब घास व खस लगाई जाती है ताकि मिट्टी का कटाव (Soil erosion) रुके।',
    badge: 'ढलान जल-प्रबंधन'
  }
];

export const SLOPE_LEVELS = [
  {
    nameHindi: '1. टांड़ (Tand / Tanr)',
    santaliName: 'चोट टांड़ (Upland Slope)',
    elevation: 'सर्वोच्च शिखर (Ridge)',
    waterBehavior: 'तीव्र जल रिसाव (Infiltration Zone) - वर्षा जल को सोखकर भूजल रिचार्ज करता है।',
    crops: 'मडुआ (Marwa), गुंदली (Gundli), उड़द, कुर्थी व तिल'
  },
  {
    nameHindi: '2. बायद (Bayad / Baid)',
    santaliName: 'ताल माला (Mid-slope Terraces)',
    elevation: 'मध्य ढलान सीढ़ीदार खेत',
    waterBehavior: 'मध्यम जल ठहराव - टांड़ से आने वाले पानी को छोटी मेड़ों से रोककर रखा जाता है।',
    crops: 'गोरधान, मध्यम अवधि संताली सुगंधित धान'
  },
  {
    nameHindi: '3. कनाली (Kanali)',
    santaliName: 'कनाली हसा (Depression Terraces)',
    elevation: 'निचली ढलान की संकरी घाटी',
    waterBehavior: 'स्थायी नमी - चारों ओर से रिसकर आने वाला जल यहां महीनों तक संचित रहता है।',
    crops: 'लंबे दाने का खुशबूदार धान व रबी फसल'
  },
  {
    nameHindi: '4. बहल / जोबड़ा (Bahal / Jobda)',
    santaliName: 'गहिरा बहल (Valley Floor Basin)',
    elevation: 'तलहटी का गहरा बेसिन',
    waterBehavior: 'उच्च जल स्तर - जलभराव वाला क्षेत्र जहां डाड़ी और झरने फूटते हैं।',
    crops: 'गहरे पानी का देशी धान (झिगासाल, करहनी) व मत्स्य पालन'
  }
];

export const SantaliWaterHarvesting: React.FC = () => {
  const { isAdmin } = useAdmin();
  const STORAGE_KEY = 'hor_katha_water_harvesting_db';

  const [items, setItems] = useState<WaterHarvestingItem[]>(() =>
    safeLoadFromStorage<WaterHarvestingItem[]>(STORAGE_KEY, DEFAULT_WATER_ITEMS)
  );

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSlope, setSelectedSlope] = useState<number>(0);

  // Admin CRUD state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<WaterHarvestingItem | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const saveItems = (updated: WaterHarvestingItem[]) => {
    setItems(updated);
    safeSaveToStorage(STORAGE_KEY, updated);
  };

  const handleResetToDefault = () => {
    if (window.confirm('क्या आप जल-संरक्षण संग्रह को मूल डिफॉल्ट डेटा पर रीसेट करना चाहते हैं?')) {
      saveItems(DEFAULT_WATER_ITEMS);
      showNotification('जल-संरक्षण डेटा डिफॉल्ट पर रीसेट कर दिया गया!');
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
      id: `water_${Date.now()}`,
      nameDevanagari: '',
      nameRoman: '',
      titleHindi: '',
      category: 'natural_spring',
      categoryLabel: 'प्राकृतिक पेयजल स्रोत',
      landscapeZone: 'पहाड़ी तलहटी',
      technicalMechanism: '',
      culturalEcologyLore: '',
      conservationRules: '',
      badge: 'नया जल विधान'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: WaterHarvestingItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.nameDevanagari.trim() || !editingItem.titleHindi.trim()) {
      alert('कृपया जल संरचना का नाम और हिंदी शीर्षक भरें!');
      return;
    }

    const index = items.findIndex((it) => it.id === editingItem.id);
    let updated: WaterHarvestingItem[];
    if (index >= 0) {
      updated = [...items];
      updated[index] = editingItem;
      showNotification(`"${editingItem.titleHindi}" अपडेट कर दिया गया!`);
    } else {
      updated = [editingItem, ...items];
      showNotification(`"${editingItem.titleHindi}" नई संरचना जोड़ी गई!`);
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
      item.landscapeZone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.technicalMechanism.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 p-4 md:p-8">
      {/* Top Banner & Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-teal-950/80 via-stone-900 to-cyan-950/60 border border-teal-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
                <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                <span>संताली पारंपरिक जल-संरक्षण व ढलान कृषि विज्ञान (Indigenous Watershed Management)</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-cyan-100 tracking-tight flex items-center gap-3">
                डाड़ी, पुखुरी, आहार व ढलान जल-विज्ञान
                <button
                  onClick={() =>
                speakWithFemaleVoice(
                  'संताली पारंपरिक जल-संरक्षण, डाड़ी पुखुरी आहार एवं ढलान कृषि विज्ञान'
                )
              }
                  className="p-2 rounded-lg bg-teal-800/40 hover:bg-teal-700/60 text-cyan-300 transition-colors"
                  title="उच्चारण सुनें"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </h1>
              <p className="text-stone-300 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
                संताल आदिवासियों द्वारा विकसित सदियों पुरानी सूक्ष्म-वाटरशेड प्रणाली: साखू के जंगलों से छनकर आने वाली अमृत डाड़ी, पहाड़ी ढलानों पर आहार-बांध, टांड़-बायद-कनाली का चतुर्मुखी जल संतुलन और पवित्र 'दाः बाखेड़' वर्षा प्रार्थना।
              </p>
            </div>

            {isAdmin && (
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={handleOpenAdd}
                  className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-teal-900/30 transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  नई जल संरचना जोड़ें
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
            <div className="mt-4 p-3 bg-teal-500/20 border border-teal-500/40 rounded-xl text-teal-200 text-sm flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-teal-400" />
              <span>{feedbackMsg}</span>
            </div>
          )}
        </div>
      </div>

      {/* Interactive 4-Tier Slope Matrix Visualizer */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="bg-stone-900/90 border border-teal-900/40 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <Mountain className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-cyan-100">
                संताली 4-स्तरीय ढलान भूमि एवं जल प्रवाह तंत्र (Slope Gradient Matrix)
              </h2>
            </div>
            <span className="text-xs text-stone-400 bg-stone-800 px-3 py-1 rounded-full border border-stone-700">
              ढलान स्तर चुनकर जल व्यवहार व फसल चक्र देखें
            </span>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {SLOPE_LEVELS.map((slope, idx) => (
              <button
                key={slope.nameHindi}
                onClick={() => setSelectedSlope(idx)}
                className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
                  selectedSlope === idx
                    ? 'bg-teal-950/70 border-teal-500 text-teal-100 shadow-md ring-1 ring-teal-500/50'
                    : 'bg-stone-800/60 border-stone-700/60 text-stone-400 hover:bg-stone-800 hover:text-stone-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-cyan-400">{slope.elevation}</span>
                  {selectedSlope === idx && (
                    <ArrowDownCircle className="w-4 h-4 text-cyan-400 animate-bounce" />
                  )}
                </div>
                <div className="text-sm font-bold">{slope.nameHindi}</div>
                <div className="text-xs text-stone-400 mt-1">{slope.santaliName}</div>
              </button>
            ))}
          </div>

          {/* Selected Slope Detail Showcase */}
          <div className="bg-gradient-to-r from-teal-950/40 to-stone-900 border border-teal-800/30 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wide">
                <span>{SLOPE_LEVELS[selectedSlope].elevation}</span>
                <span>•</span>
                <span>{SLOPE_LEVELS[selectedSlope].santaliName}</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-cyan-100">
                {SLOPE_LEVELS[selectedSlope].nameHindi}
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                <strong className="text-cyan-200">जल व्यवहार: </strong>
                {SLOPE_LEVELS[selectedSlope].waterBehavior}
              </p>
              <div className="text-xs text-stone-300">
                <strong className="text-teal-300">उपयुक्त फसलें: </strong>
                {SLOPE_LEVELS[selectedSlope].crops}
              </div>
            </div>
            <button
              onClick={() =>
                speakWithFemaleVoice(
                  `${SLOPE_LEVELS[selectedSlope].nameHindi}। ${SLOPE_LEVELS[selectedSlope].waterBehavior}। फसलें: ${SLOPE_LEVELS[selectedSlope].crops}।`
                )
              }
              className="flex items-center gap-2 px-4 py-2.5 bg-teal-800/40 hover:bg-teal-700/50 text-cyan-200 rounded-lg border border-teal-700/50 text-xs font-semibold transition-colors flex-shrink-0"
            >
              <Volume2 className="w-4 h-4" />
              ढलान विवरण सुनें
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {[
            { id: 'all', label: 'समस्त जल संरचनाएं' },
            { id: 'natural_spring', label: 'डाड़ी व सोते' },
            { id: 'contour_bund', label: 'आहार व बांध' },
            { id: 'sacred_pond', label: 'पुखुरी (तालाब)' },
            { id: 'land_slope', label: 'ढलान विज्ञान' },
            { id: 'sacred_prayer', label: 'दाः बाखेड़ (प्रार्थना)' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-teal-600 text-white'
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
            placeholder="खोजें (जैसे डाड़ी, आहार, टांड़)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3.5 py-2 bg-stone-800/90 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-teal-500"
          />
        </div>
      </div>

      {/* Main Grid of Water Harvesting Items */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-stone-900 border border-stone-800 hover:border-teal-700/60 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all group hover:-translate-y-1"
          >
            <div>
              {/* Header Badge & Category */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-[11px] font-bold">
                  {item.badge}
                </span>
                <span className="text-stone-400 text-[11px] font-medium">{item.categoryLabel}</span>
              </div>

              {/* Title & Phonetic */}
              <div className="mb-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-cyan-100 group-hover:text-cyan-200 transition-colors">
                    {item.nameDevanagari}
                  </h3>
                  <button
                    onClick={() =>
                      speakWithFemaleVoice(
                        `${item.nameDevanagari}। ${item.titleHindi}। क्षेत्र: ${item.landscapeZone}।`
                      )
                    }
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-teal-400 transition-colors flex-shrink-0"
                    title="उच्चारण सुनें"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs font-mono text-cyan-400/80 mt-0.5">{item.nameRoman}</div>
                <div className="text-xs font-semibold text-stone-300 mt-1">{item.titleHindi}</div>
              </div>

              {/* Landscape Zone */}
              <div className="mb-3 p-2.5 rounded-xl bg-stone-950/60 border border-stone-800 text-xs">
                <div className="text-stone-400 font-semibold mb-0.5">भौगोलिक स्थिति (Landscape Zone):</div>
                <div className="text-teal-300 font-medium">{item.landscapeZone}</div>
              </div>

              {/* Technical Mechanism & Cultural Lore */}
              <div className="space-y-2 text-xs text-stone-300 leading-relaxed mb-4">
                <div>
                  <span className="font-bold text-stone-200">वैज्ञानिक व तकनीकी विधि: </span>
                  {item.technicalMechanism}
                </div>
                <div>
                  <span className="font-bold text-stone-200">पारंपरिक लोक-संस्कृति: </span>
                  {item.culturalEcologyLore}
                </div>
                <div className="bg-teal-950/20 p-2 rounded-lg border-l-2 border-teal-500 text-teal-200/90">
                  <span className="font-bold text-teal-300">सामूहिक संरक्षण नियम: </span>
                  {item.conservationRules}
                </div>
              </div>
            </div>

            {/* Admin Controls */}
            {isAdmin && (
              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-end gap-2 mt-2">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-teal-600/30 text-teal-300 text-xs font-semibold border border-stone-700 transition-colors"
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
          <p className="text-sm font-semibold">कोई जल संरचना नहीं मिली।</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchTerm('');
            }}
            className="mt-3 px-3.5 py-1.5 bg-teal-600 text-white rounded-lg text-xs font-semibold"
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
              <h3 className="text-xl font-bold text-teal-200 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-400" />
                {items.some((it) => it.id === editingItem.id)
                  ? 'जल संरचना संपादित करें'
                  : 'नई जल संरचना जोड़ें'}
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
                    placeholder="उदा. डाड़ी (Dadi - प्राकृतिक जल स्रोत)"
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-teal-500"
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
                    placeholder="उदा. Dadi (Perennial Spring)"
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-teal-500"
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
                    placeholder="उदा. साखू-जंगलों से छनकर रिसने वाला पवित्र पेयजल स्रोत"
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    श्रेणी (Category)
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => {
                      const val = e.target.value as WaterHarvestingItem['category'];
                      const labels: Record<WaterHarvestingItem['category'], string> = {
                        natural_spring: 'प्राकृतिक पेयजल स्रोत',
                        contour_bund: 'कंटूर जल संचयन',
                        sacred_pond: 'पवित्र ग्राम्य तालाब',
                        land_slope: 'पारंपरिक ढलान विज्ञान',
                        sacred_prayer: 'पवित्र वर्षा मंत्र'
                      };
                      setEditingItem({
                        ...editingItem,
                        category: val,
                        categoryLabel: labels[val]
                      });
                    }}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-teal-500"
                  >
                    <option value="natural_spring">प्राकृतिक पेयजल स्रोत</option>
                    <option value="contour_bund">कंटूर जल संचयन</option>
                    <option value="sacred_pond">पवित्र ग्राम्य तालाब</option>
                    <option value="land_slope">पारंपरिक ढलान विज्ञान</option>
                    <option value="sacred_prayer">पवित्र वर्षा मंत्र</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    भौगोलिक स्थिति (Landscape Zone)
                  </label>
                  <input
                    type="text"
                    value={editingItem.landscapeZone}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, landscapeZone: e.target.value })
                    }
                    placeholder="उदा. पहाड़ी तलहटी, मध्य ढलान"
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-teal-500"
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
                    placeholder="उदा. अमृत पेय स्रोत"
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  वैज्ञानिक व तकनीकी विधि (Technical Mechanism)
                </label>
                <textarea
                  rows={2}
                  value={editingItem.technicalMechanism}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, technicalMechanism: e.target.value })
                  }
                  placeholder="जल प्रवाह, रिसाव व चेकडैम संरचना का विवरण..."
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  पारंपरिक लोक-संस्कृति (Cultural Ecology Lore)
                </label>
                <textarea
                  rows={2}
                  value={editingItem.culturalEcologyLore}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, culturalEcologyLore: e.target.value })
                  }
                  placeholder="पर्व, अनुष्ठान या लोकगीतों में महत्व..."
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  सामूहिक संरक्षण नियम (Conservation Rules)
                </label>
                <textarea
                  rows={2}
                  value={editingItem.conservationRules}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, conservationRules: e.target.value })
                  }
                  placeholder="स्वच्छता नियम, पानी का बंटवारा या ग्राम्य बैसी का निर्णय..."
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-teal-500"
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
                  className="flex items-center gap-2 px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-teal-900/40"
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

export default SantaliWaterHarvesting;
