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
  Mic,
  Activity,
  Layers,
  CircleDot
} from 'lucide-react';

export interface PhoneticItem {
  id: string;
  consonantChar: string;
  olChikiChar: string;
  romanDiacritic: string;
  articulatoryPlace: string;
  linguisticTerm: string;
  santaliWordPair: string;
  meaningContrast: string;
  phoneticRule: string;
  pronunciationTip: string;
  badge: string;
}

export const DEFAULT_PHONETIC_ITEMS: PhoneticItem[] = [
  {
    id: 'phonetic_checked_k',
    consonantChar: 'क\' (अचेत क - ᱜ)',
    olChikiChar: 'ᱜ (Ag)',
    romanDiacritic: 'k\' / ḵ',
    articulatoryPlace: 'कंठ व कोमल तालु (Velar Glottal Stop)',
    linguisticTerm: 'कंठ्य रुद्ध ध्वनि (Checked Velar Stop)',
    santaliWordPair: 'दाक\' (Daq\' = पानी/जल) बनाम दाका (Daka = पकाया भात)',
    meaningContrast: 'दाक\' (कंठ में हवा रोककर रुकना) = पानी; दाका (कंठ खोलकर बोलना) = पका हुआ भोजन/भात।',
    phoneticRule: 'जब यह ध्वनि शब्द के अंत में आती है, तो फेफड़ों से आती हवा कंठ में क्षणभर के लिए पूरी तरह रोक (Glottal closure) दी जाती है। स्वर जोड़ने पर यह \'ग\' में बदल जाती है।',
    pronunciationTip: 'अंग्रेजी के "uh-oh" के बीच में जो झटका लगता है, उसी प्रकार कंठ को बंद करके \'क\' बोलें बिना फूंक निकाले।',
    badge: 'कंठ्य रुद्ध'
  },
  {
    id: 'phonetic_checked_c',
    consonantChar: 'च\' (अचेत च - ᱪ)',
    olChikiChar: 'ᱪ (Uch)',
    romanDiacritic: 'c\' / ç',
    articulatoryPlace: 'कठोर तालु (Palatal Glottal Stop)',
    linguisticTerm: 'तालव्य रुद्ध ध्वनि (Checked Palatal Stop)',
    santaliWordPair: 'राच\' (Rac\' = आंगन/पिंडा) बनाम राजा (Raja = शासक)',
    meaningContrast: 'राच\' (जीभ तालु से सटाकर सांस रोकना) = घर का स्वच्छ आंगन; राजा = राजा/शासक।',
    phoneticRule: 'जीभ का मध्य भाग तालु से सटता है और हवा को बाहर निकलने से रोक दिया जाता है। बाद में स्वर आने पर यह \'ज\' बन जाता है।',
    pronunciationTip: 'जीभ को तालु पर चिपकाएं और बिना हवा छोड़े ध्वनि को भीतर ही रोक लें।',
    badge: 'तालव्य रुद्ध'
  },
  {
    id: 'phonetic_checked_t',
    consonantChar: 'त\' (अचेत त - ᱛ)',
    olChikiChar: 'ᱛ (At)',
    romanDiacritic: 't\' / ṯ',
    articulatoryPlace: 'दंत व मसूड़ा (Dental Glottal Stop)',
    linguisticTerm: 'दंत्य रुद्ध ध्वनि (Checked Dental Stop)',
    santaliWordPair: 'ओत (Ot\' = धरती/भूमि) बनाम ओता (Ota = दबाना/हाथ रखना)',
    meaningContrast: 'ओत (दांतों के पीछे जीभ रोककर) = पवित्र धरती; ओता = किसी वस्तु को दबाना।',
    phoneticRule: 'जीभ की नोक ऊपरी दांतों के पीछे छूती है परंतु हवा का विस्फोट (Aspiration) नहीं होता।',
    pronunciationTip: 'हिन्दी शब्द "मत" के \'त\' को बोलने से ठीक पहले जब सांस अटकती है, ठीक वही स्थिति है।',
    badge: 'दंत्य रुद्ध'
  },
  {
    id: 'phonetic_checked_p',
    consonantChar: 'प\' (अचेत प - ᱯ)',
    olChikiChar: 'ᱯ (Ep)',
    romanDiacritic: 'p\' / p̄',
    articulatoryPlace: 'दोनों होंठ (Bilabial Glottal Stop)',
    linguisticTerm: 'ओष्ठ्य रुद्ध ध्वनि (Checked Bilabial Stop)',
    santaliWordPair: 'साप\' (Sap\' = पकड़ना/थामना) बनाम सापा (Sapa = साफ/शुद्ध)',
    meaningContrast: 'साप\' (होंठ बंद करके सांस रोकना) = हाथ से पकड़ना; सापा = निर्मल/शुद्ध।',
    phoneticRule: 'दोनों होंठ पूरी तरह बंद होकर हवा को रोकते हैं। होंठों को झटके से खोले बिना ध्वनि समाप्त होती है।',
    pronunciationTip: 'होंठों को जोर से दबाएं और हवा को मुंह में ही रोक लें, बाहर न बहने दें।',
    badge: 'ओष्ठ्य रुद्ध'
  }
];

export const PHONETIC_LAB_MODES = [
  {
    mode: '1. कंठ द्वार (Glottis)',
    icon: '🗣️',
    explanation: 'फेफड़ों से आने वाले वायुमार्ग को स्वर-तंतुओं द्वारा 0.1 सेकंड के लिए पूरी तरह सील किया जाता है।'
  },
  {
    mode: '2. अप्रस्फुटित उच्चारण (Unreleased)',
    icon: '🛑',
    explanation: 'साधारण भाषाओं की तरह हवा का फुककार (Explosion) बाहर नहीं आता; ध्वनि मुंह के भीतर ही समा जाती है।'
  },
  {
    mode: '3. सचेत रूपांतरण (Softening)',
    icon: '🔄',
    explanation: 'जब अचेत वर्ण के आगे स्वर (आ, इ, उ) जुड़ता है, तो क\' -> ग, च\' -> ज, त\' -> द, प\' -> ब बन जाता है।'
  },
  {
    mode: '4. अर्थ-परिवर्तन (Minimal Pairs)',
    icon: '⚖️',
    explanation: 'इन चार ध्वनियों में लेशमात्र त्रुटि होने से शब्द का संपूर्ण अर्थ विपरीत या भिन्न हो जाता है।'
  }
];

export const SantaliPhoneticsLab: React.FC = () => {
  const { isAdmin } = useAdmin();
  const STORAGE_KEY = 'hor_katha_phonetics_db';

  const [items, setItems] = useState<PhoneticItem[]>(() =>
    safeLoadFromStorage<PhoneticItem[]>(STORAGE_KEY, DEFAULT_PHONETIC_ITEMS)
  );

  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<number>(0);

  // Admin CRUD state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PhoneticItem | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const saveItems = (updated: PhoneticItem[]) => {
    setItems(updated);
    safeSaveToStorage(STORAGE_KEY, updated);
  };

  const handleResetToDefault = () => {
    if (window.confirm('क्या आप ध्वनि-शास्त्र प्रयोगशाला डेटा को मूल डिफॉल्ट पर रीसेट करना चाहते हैं?')) {
      saveItems(DEFAULT_PHONETIC_ITEMS);
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
      id: `phonetic_${Date.now()}`,
      consonantChar: '',
      olChikiChar: '',
      romanDiacritic: '',
      articulatoryPlace: 'कंठ',
      linguisticTerm: 'कंठ्य रुद्ध ध्वनि',
      santaliWordPair: '',
      meaningContrast: '',
      phoneticRule: '',
      pronunciationTip: '',
      badge: 'नई रुद्ध ध्वनि'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: PhoneticItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.consonantChar.trim() || !editingItem.linguisticTerm.trim()) {
      alert('कृपया ध्वनि वर्ण और भाषावैज्ञानिक नाम भरें!');
      return;
    }

    const index = items.findIndex((it) => it.id === editingItem.id);
    let updated: PhoneticItem[];
    if (index >= 0) {
      updated = [...items];
      updated[index] = editingItem;
      showNotification(`"${editingItem.consonantChar}" अपडेट कर दिया गया!`);
    } else {
      updated = [editingItem, ...items];
      showNotification(`"${editingItem.consonantChar}" नई ध्वनि जोड़ी गई!`);
    }

    saveItems(updated);
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.consonantChar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.olChikiChar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.linguisticTerm.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.santaliWordPair.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.pronunciationTip.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 p-4 md:p-8">
      {/* Top Banner & Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-violet-50/80 via-stone-50 to-indigo-50/60 border border-violet-200/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-700 text-xs font-semibold mb-3">
                <Mic className="w-3.5 h-3.5 text-violet-600" />
                <span>संताली भाषाविज्ञान व ४ अद्वितीय रुद्ध कंठ ध्वनियां (Checked Glottal Consonants Studio)</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-violet-800 tracking-tight flex items-center gap-3">
                संताली ४ रुद्ध ध्वनियां व उच्चारण प्रयोगशाला
                <button
                  onClick={() =>
                speakWithFemaleVoice(
                  'संताली भाषाविज्ञान, चार अद्वितीय रुद्ध कंठ ध्वनियां एवं उच्चारण प्रयोगशाला'
                )
              }
                  className="p-2 rounded-lg bg-violet-100/40 hover:bg-violet-200/60 text-violet-700 transition-colors"
                  title="उच्चारण सुनें"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </h1>
              <p className="text-stone-700 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
                संताली भाषा की विश्व-प्रसिद्ध ध्वन्यात्मक विशेषता: चार अचेत/रुद्ध व्यंजन (क', च', त', प') जहां फेफड़ों की सांस कंठ में क्षणभर के लिए रोक ली जाती है। न्यूनतम युग्म (Minimal Pairs), सचेत रूपांतरण और सटीक उच्चारण अभ्यास।
              </p>
            </div>

            {isAdmin && (
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={handleOpenAdd}
                  className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-violet-900/30 transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  नई ध्वनि जोड़ें
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
            <div className="mt-4 p-3 bg-violet-500/20 border border-violet-500/40 rounded-xl text-violet-800 text-sm flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-violet-600" />
              <span>{feedbackMsg}</span>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Phonetic Mechanics Guide */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="bg-stone-50/90 border border-violet-200/40 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <Activity className="w-5 h-5 text-violet-600" />
              <h2 className="text-xl font-bold text-violet-800">
                रुद्ध ध्वनि कार्यप्रणाली (Acoustic Mechanics of Checked Consonants)
              </h2>
            </div>
            <span className="text-xs text-stone-600 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
              प्रत्येक सिद्धांत पर क्लिक करके भाषावैज्ञानिक नियम समझें
            </span>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {PHONETIC_LAB_MODES.map((md, idx) => (
              <button
                key={md.mode}
                onClick={() => setSelectedMode(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                  selectedMode === idx
                    ? 'bg-violet-50/70 border-violet-500 text-violet-800 shadow-md ring-1 ring-violet-500/50'
                    : 'bg-stone-100/60 border-stone-200/60 text-stone-600 hover:bg-stone-100 hover:text-stone-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-base">{md.icon}</span>
                  {selectedMode === idx && (
                    <CircleDot className="w-3.5 h-3.5 text-violet-600 animate-pulse" />
                  )}
                </div>
                <div className="text-xs font-bold text-stone-800 truncate">{md.mode}</div>
              </button>
            ))}
          </div>

          {/* Selected Step Detail Showcase */}
          <div className="bg-gradient-to-r from-violet-50/40 to-stone-50 border border-violet-200/30 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 text-xs font-bold text-violet-600 uppercase tracking-wide">
                <span>{PHONETIC_LAB_MODES[selectedMode].icon} {PHONETIC_LAB_MODES[selectedMode].mode}</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-violet-800">
                {PHONETIC_LAB_MODES[selectedMode].mode}
              </h3>
              <p className="text-stone-700 text-sm leading-relaxed">
                {PHONETIC_LAB_MODES[selectedMode].explanation}
              </p>
            </div>
            <button
              onClick={() =>
                speakWithFemaleVoice(
                  `${PHONETIC_LAB_MODES[selectedMode].mode}। ${PHONETIC_LAB_MODES[selectedMode].explanation}`
                )
              }
              className="flex items-center gap-2 px-4 py-2 bg-violet-100/40 hover:bg-violet-200/50 text-violet-800 rounded-lg border border-violet-200/50 text-xs font-semibold transition-colors flex-shrink-0"
            >
              <Volume2 className="w-4 h-4" />
              सिद्धांत सुनें
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-stone-600 font-semibold">
          संताली ४ मौलिक अचेत व्यंजन (4 Glottalized Plosives)
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="खोजें (जैसे क', च', ओत, दाक')..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3.5 py-2 bg-stone-100/90 border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-500 focus:outline-none focus:border-violet-500"
          />
        </div>
      </div>

      {/* Main Grid of Phonetic Items */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-stone-50 border border-stone-200 hover:border-violet-200/60 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all group hover:-translate-y-1"
          >
            <div>
              {/* Header Badge & Ol Chiki representation */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-700 text-[11px] font-bold">
                  {item.badge}
                </span>
                <span className="text-amber-600 text-xs font-mono font-bold bg-amber-50/40 px-2 py-0.5 rounded-md border border-amber-200/40">
                  {item.olChikiChar} | {item.romanDiacritic}
                </span>
              </div>

              {/* Title & Phonetic */}
              <div className="mb-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xl font-bold text-violet-800 group-hover:text-violet-800 transition-colors">
                    {item.consonantChar}
                  </h3>
                  <button
                    onClick={() =>
                      speakWithFemaleVoice(
                        `${item.consonantChar}। उच्चारण स्थान: ${item.articulatoryPlace}। उदाहरण: ${item.santaliWordPair}।`
                      )
                    }
                    className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-violet-600 transition-colors flex-shrink-0"
                    title="उच्चारण सुनें"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs font-semibold text-violet-700 mt-1">{item.linguisticTerm}</div>
              </div>

              {/* Articulatory Place */}
              <div className="mb-3 p-2.5 rounded-xl bg-white/60 border border-stone-200 text-xs">
                <div className="text-stone-600 font-semibold mb-0.5">उच्चारण स्थान (Articulatory Place):</div>
                <div className="text-violet-700 font-medium">{item.articulatoryPlace}</div>
              </div>

              {/* Minimal Pair Contrast */}
              <div className="mb-3 p-3 rounded-xl bg-violet-50/25 border border-violet-200/40 text-xs">
                <div className="text-amber-700 font-bold mb-1">न्यूनतम युग्म तुलना (Minimal Pair Contrast):</div>
                <div className="text-stone-800 font-semibold mb-1">{item.santaliWordPair}</div>
                <div className="text-stone-700 text-[11px] leading-relaxed">{item.meaningContrast}</div>
              </div>

              {/* Phonetic Rules & Tips */}
              <div className="space-y-2 text-xs text-stone-700 leading-relaxed mb-4">
                <div>
                  <span className="font-bold text-stone-800">भाषावैज्ञानिक नियम: </span>
                  {item.phoneticRule}
                </div>
                <div className="bg-white/40 p-2 rounded-lg border-l-2 border-violet-500 text-stone-700">
                  <span className="font-bold text-violet-700">सटीक बोलने की युक्ति (Tip): </span>
                  {item.pronunciationTip}
                </div>
              </div>
            </div>

            {/* Admin Controls */}
            {isAdmin && (
              <div className="pt-3 border-t border-stone-200/80 flex items-center justify-end gap-2 mt-2">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-violet-200/30 text-violet-700 text-xs font-semibold border border-stone-200 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  संपादित करें
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id, item.consonantChar)}
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
          <p className="text-sm font-semibold">कोई ध्वनि प्रविष्टि नहीं मिली।</p>
          <button
            onClick={() => setSearchTerm('')}
            className="mt-3 px-3.5 py-1.5 bg-violet-600 text-white rounded-lg text-xs font-semibold"
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
              <h3 className="text-xl font-bold text-violet-800 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-violet-600" />
                {items.some((it) => it.id === editingItem.id)
                  ? 'ध्वनि प्रविष्टि संपादित करें'
                  : 'नई ध्वनि प्रविष्टि जोड़ें'}
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
                    देवनागरी वर्ण *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.consonantChar}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, consonantChar: e.target.value })
                    }
                    placeholder="उदा. क' (अचेत क)"
                    className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    ओल चिकी वर्ण (Ol Chiki)
                  </label>
                  <input
                    type="text"
                    value={editingItem.olChikiChar}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, olChikiChar: e.target.value })
                    }
                    placeholder="उदा. ᱜ (Ag)"
                    className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    रोमन डायक्रिटिक (Roman)
                  </label>
                  <input
                    type="text"
                    value={editingItem.romanDiacritic}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, romanDiacritic: e.target.value })
                    }
                    placeholder="उदा. k' / ḵ"
                    className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    भाषावैज्ञानिक नाम *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.linguisticTerm}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, linguisticTerm: e.target.value })
                    }
                    placeholder="उदा. कंठ्य रुद्ध ध्वनि (Checked Velar Stop)"
                    className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    उच्चारण स्थान (Articulatory Place)
                  </label>
                  <input
                    type="text"
                    value={editingItem.articulatoryPlace}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, articulatoryPlace: e.target.value })
                    }
                    placeholder="उदा. कंठ व कोमल तालु"
                    className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-violet-500"
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
                    placeholder="उदा. कंठ्य रुद्ध"
                    className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  न्यूनतम युग्म शब्द तुलना (Word Pair)
                </label>
                <input
                  type="text"
                  value={editingItem.santaliWordPair}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, santaliWordPair: e.target.value })
                  }
                  placeholder="उदा. दाक' (पानी) बनाम दाका (भात)"
                  className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  अर्थ-भेद विवरण (Meaning Contrast)
                </label>
                <textarea
                  rows={2}
                  value={editingItem.meaningContrast}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, meaningContrast: e.target.value })
                  }
                  placeholder="अर्थ में आने वाले अंतर का स्पष्ट विवरण..."
                  className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  भाषावैज्ञानिक नियम
                </label>
                <textarea
                  rows={2}
                  value={editingItem.phoneticRule}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, phoneticRule: e.target.value })
                  }
                  placeholder="अचेत से सचेत रूपांतरण या वायु प्रवाह का नियम..."
                  className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  सटीक बोलने की युक्ति (Pronunciation Tip)
                </label>
                <textarea
                  rows={2}
                  value={editingItem.pronunciationTip}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, pronunciationTip: e.target.value })
                  }
                  placeholder="जीभ और मुंह की स्थिति का सरल सुझाव..."
                  className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:border-violet-500"
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
                  className="flex items-center gap-2 px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-violet-900/40"
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

export default SantaliPhoneticsLab;
