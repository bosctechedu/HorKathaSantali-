import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  Shield,
  TreePine,
  Scale,
  Volume2,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Compass,
  AlertTriangle,
  Info
} from 'lucide-react';

export interface SendraLawItem {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  titleHindi: string;
  category: 'court_baisi' | 'conservation_rule' | 'rituals_signals' | 'fair_share';
  categoryLabel: string;
  presidingAuthority: string;
  detailedCode: string;
  ecologicalWisdom: string;
  punishmentOrCustom?: string;
  badge: string;
}

export const DEFAULT_SENDRA_LAWS: SendraLawItem[] = [
  {
    id: 'law_lobir_baisi',
    nameDevanagari: 'लोबीर बैसी (Lobir Baisi - सर्वोच्च अरण्य न्यायालय)',
    nameRoman: 'Lobir Baisi',
    titleHindi: 'संतालों का सर्वोच्च लोकतांत्रिक न्यायालय (अयोध्या व दालमा बुरु)',
    category: 'court_baisi',
    categoryLabel: 'सर्वोच्च न्यायालय',
    presidingAuthority: 'दिहरी (Dehri - अरण्य न्यायाधीश) एवं समस्त आम संताल जन',
    detailedCode: 'सेंदरा की रात पहाड़ की चोटी पर लोबीर बैसी का आयोजन होता है। यहां कोई पद या सामाजिक भेद नहीं होता; परगना, मांझी हाड़ाम और साधारण ग्रामीण सभी नंगे पैर धरती की घास पर बैठते हैं। कोई भी व्यक्ति किसी भी बड़े नेता या अधिकारी के विरुद्ध शिकायत दर्ज कर सकता है।',
    ecologicalWisdom: 'यह पूर्णतः समतावादी और न्यायपूर्ण लोकतंत्र का प्रतीक है, जहां प्रकृति की साक्षी में निष्पक्ष न्याय दिया जाता है। इसका फैसला अंतिम और सर्वमान्य होता है।',
    punishmentOrCustom: 'दोषी पाए जाने पर मांझी या परगना को भी सार्वजनिक रूप से जुर्माना भरना या पद छोड़ना पड़ता है।',
    badge: 'सर्वोच्च अदालत'
  },
  {
    id: 'law_pregnant_forbidden',
    nameDevanagari: 'गाभिन व मादा पशु शिकार प्रतिबंध (Eco-Protection)',
    nameRoman: 'Gabhin ar Enga Janwar Niyom',
    titleHindi: 'गर्भवती, दुधमुंहे शावक व मादा पशु का शिकार पूर्ण वर्जित',
    category: 'conservation_rule',
    categoryLabel: 'अरण्य संरक्षण नियम',
    presidingAuthority: 'दिहरी एवं सेंदरा दल के नायक',
    detailedCode: 'संताली सेंदरा में गर्भवती हिरण, सुअर या किसी भी वन्यजीव की मादा और उसके नन्हे शावकों पर तीर चलाना महापाप और घोर सामाजिक अपराध माना जाता है। यदि भूल से ऐसा हो जाए तो शिकारी को दिहरी के समक्ष पश्चाताप करना होता है।',
    ecologicalWisdom: 'यह नियम सुनिश्चित करता है कि जंगल में वन्यजीवों की प्रजनन क्षमता और अगली पीढ़ी कभी समाप्त न हो। यह आधुनिक वन्यजीव संरक्षण का प्राचीन रूप है।',
    punishmentOrCustom: 'शिकार किए गए तीर को तोड़ दिया जाता है और ग्राम पंच द्वारा भारी प्रायश्चित दंड लगाया जाता है।',
    badge: 'संरक्षण विधान'
  },
  {
    id: 'law_sakur_signals',
    nameDevanagari: 'साकर, कांसी व सींग संकेत (Forest Acoustic Signals)',
    nameRoman: 'Sakur ar Kansi Sandesh',
    titleHindi: 'भैंसे के सींग व कांस्य वाद्य से वन में आपातकालीन ध्वनि संकेत',
    category: 'rituals_signals',
    categoryLabel: 'संकेत व संचार',
    presidingAuthority: 'सेंदरा के अग्रिम हरकारे (दूत)',
    detailedCode: 'घने अरण्य में दिशा भ्रम से बचने और संकट की सूचना देने के लिए भैंसे के सींग का बिगुल (साकर) और कांसी बजाई जाती है। तीन लंबी ध्वनियों का अर्थ "सभी सुरक्षित एकत्र हों", और रुक-रुक कर बजने वाली ध्वनि का अर्थ "संकट या हिंसक पशु का सामना" होता है।',
    ecologicalWisdom: 'बिना शोर मचाए जंगल के नियमों का सम्मान करते हुए दल को अनुशासित और संगठित रखना।',
    punishmentOrCustom: 'झूठा संकेत बजाने पर सेंदरा से निष्कासन कर दिया जाता है।',
    badge: 'ध्वनि संचार'
  },
  {
    id: 'law_fair_share',
    nameDevanagari: 'सेंदरा जिल बान्टा (Equitable Meat Sharing)',
    nameRoman: 'Sendra Jil Banta',
    titleHindi: 'गांव के हर परिवार, विधवा व असहाय को शिकार का समान हिस्सा',
    category: 'fair_share',
    categoryLabel: 'समतामूलक बंटवारा',
    presidingAuthority: 'जोग मांझी व गोडेत',
    detailedCode: 'सेंदरा से लौटने पर शिकार का मांस केवल शिकारियों में नहीं बंटता, बल्कि गांव के प्रत्येक घर में बराबर बांटा जाता है। विशेषकर वृद्ध, बीमार और विधवाओं के घरों में पहला हिस्सा पहुंचाया जाता है, भले ही वे शिकार पर न गए हों।',
    ecologicalWisdom: 'संताली समाज में व्यक्तिगत लालच या संचय का कोई स्थान नहीं है; प्रकृति का उपहार पूरे समुदाय का साझा अधिकार है।',
    punishmentOrCustom: 'मांस छिपाने या असमान वितरण करने पर सामाजिक बहिष्कार की चेतावनी दी जाती है।',
    badge: 'समान अधिकार'
  },
  {
    id: 'law_dehri_cleansing',
    nameDevanagari: 'दिहरी बोंगा-बुरु व अरण्य शुद्धि (Spiritual Forest Cleanse)',
    nameRoman: 'Dehri Bonga-Buru',
    titleHindi: 'अरण्य में प्रवेश से पूर्व वन-देवी व मारांग बुरु की आराधना',
    category: 'rituals_signals',
    categoryLabel: 'पवित्र अनुष्ठान',
    presidingAuthority: 'दिहरी (अरण्य पुरोहित)',
    detailedCode: 'सेंदरा आरंभ होने से पूर्व दिहरी जंगल की सीमा पर साकुआ वृक्ष के नीचे सिंदूर, अरवा चावल और जल चढ़ाकर प्रार्थना करता है कि हे वन-देवी! हम प्रकृति का सम्मान करने आए हैं, हमारे दल की रक्षा करें और कोई अनुचित रक्त न बहे।',
    ecologicalWisdom: 'मनुष्य और वन के बीच आध्यात्मिक विनम्रता का संबंध स्थापित करना, जिससे वन दोहन की भावना न पनपे।',
    punishmentOrCustom: 'पूजा संपन्न होने से पूर्व किसी भी शिकारी को अरण्य में शस्त्र निकालने की अनुमति नहीं होती।',
    badge: 'पावन अनुष्ठान'
  }
];

export const SantaliSendraLobir: React.FC = () => {
  const { isAdmin } = useAdmin();
  const STORAGE_KEY = 'hor_katha_sendra_db';

  const [laws, setLaws] = useState<SendraLawItem[]>(() => {
    return safeLoadFromStorage(STORAGE_KEY, DEFAULT_SENDRA_LAWS);
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedLaw, setSelectedLaw] = useState<SendraLawItem>(laws[0]);

  // Admin Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLaw, setEditingLaw] = useState<SendraLawItem | null>(null);
  const [formData, setFormData] = useState<Partial<SendraLawItem>>({});

  const saveLaws = (updated: SendraLawItem[]) => {
    setLaws(updated);
    safeSaveToStorage(STORAGE_KEY, updated);
  };

  // Admin Actions
  const handleAddNew = () => {
    setEditingLaw(null);
    setFormData({
      id: `sendra_${Date.now()}`,
      nameDevanagari: '',
      nameRoman: '',
      titleHindi: '',
      category: 'conservation_rule',
      categoryLabel: 'अरण्य संरक्षण नियम',
      presidingAuthority: 'दिहरी व पंच',
      detailedCode: '',
      ecologicalWisdom: '',
      punishmentOrCustom: '',
      badge: 'सेंदरा विधान'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (law: SendraLawItem) => {
    setEditingLaw(law);
    setFormData(law);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('क्या आप सचमुच इस सेंदरा/लोबीर नियम को हटाना चाहते हैं?')) {
      const updated = laws.filter((l) => l.id !== id);
      saveLaws(updated);
      if (selectedLaw?.id === id) {
        setSelectedLaw(updated[0] || null);
      }
    }
  };

  const handleResetToDefault = () => {
    if (confirm('डिफ़ॉल्ट सेंदरा व लोबीर बैसी डेटा रीसेट करें?')) {
      saveLaws(DEFAULT_SENDRA_LAWS);
      setSelectedLaw(DEFAULT_SENDRA_LAWS[0]);
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameDevanagari || !formData.titleHindi) return;

    const categoryLabels: Record<string, string> = {
      court_baisi: 'सर्वोच्च अरण्य न्यायालय (लोबीर बैसी)',
      conservation_rule: 'अरण्य संरक्षण व जीव रक्षा नियम',
      rituals_signals: 'संकेत, सींग ध्वनि व अनुष्ठान',
      fair_share: 'समतामूलक बंटवारा व सामाजिक अधिकार'
    };

    const readyItem: SendraLawItem = {
      id: editingLaw ? editingLaw.id : `sendra_${Date.now()}`,
      nameDevanagari: formData.nameDevanagari || '',
      nameRoman: formData.nameRoman || '',
      titleHindi: formData.titleHindi || '',
      category: (formData.category || 'conservation_rule') as any,
      categoryLabel: categoryLabels[formData.category || 'conservation_rule'] || 'अरण्य नियम',
      presidingAuthority: formData.presidingAuthority || 'दिहरी व पंच',
      detailedCode: formData.detailedCode || '',
      ecologicalWisdom: formData.ecologicalWisdom || '',
      punishmentOrCustom: formData.punishmentOrCustom || '',
      badge: formData.badge || 'सेंदरा नियम'
    };

    if (editingLaw) {
      const updated = laws.map((l) => (l.id === editingLaw.id ? readyItem : l));
      saveLaws(updated);
      setSelectedLaw(readyItem);
    } else {
      saveLaws([readyItem, ...laws]);
      setSelectedLaw(readyItem);
    }
    setIsModalOpen(false);
  };

  const filteredLaws = laws.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-green-950 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-md border border-emerald-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold backdrop-blur-xs border border-emerald-400/30">
              <Scale className="w-3.5 h-3.5" />
              <span>संताली लोकतांत्रिक अरण्य न्यायालय एवं पर्यावरण विधान (Sendra &amp; Lobir Baisi)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-50">
              बीर-सेंदरा, लोबीर बैसी व अरण्य संरक्षण विधान
            </h1>
            <p className="text-sm text-emerald-200/90 max-w-2xl leading-relaxed">
              सेंदरा केवल शिकार नहीं, बल्कि संतालों का सर्वोच्च लोकतांत्रिक उच्च न्यायालय "लोबीर बैसी" है — जहां पहाड़ की चोटी पर राजा-रंक सब एक समान हैं और वन्यजीवों व वनों की रक्षा के कठोर प्राचीन नियम लागू होते हैं।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => speakWithFemaleVoice('बीर-सेंदरा, लोबीर बैसी व अरण्य संरक्षण विधान')}
              className="px-3.5 py-2 bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-600/40 text-emerald-100 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Volume2 className="w-4 h-4 text-emerald-300" />
              <span>ऑडियो गाइड</span>
            </button>
            {isAdmin && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddNew}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>नया नियम जोड़ें</span>
                </button>
                <button
                  onClick={handleResetToDefault}
                  title="डिफ़ॉल्ट डेटा रीसेट करें"
                  className="p-2 bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 rounded-xl transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-3 rounded-2xl border border-slate-200">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'सभी विधान' },
            { id: 'court_baisi', label: 'लोबीर बैसी (अदालत)' },
            { id: 'conservation_rule', label: 'जीव संरक्षण नियम (मादा/शावक)' },
            { id: 'rituals_signals', label: 'साकर सींग संकेत व शुद्धि' },
            { id: 'fair_share', label: 'समान मांस बंटवारा (विधवा/वृद्ध)' }
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === c.id
                  ? 'bg-emerald-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {isAdmin && (
          <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300">
            एडमिन संपादन सक्रिय
          </span>
        )}
      </div>

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Rules Grid (7 cols) */}
        <div className="lg:col-span-7 space-y-3.5">
          {filteredLaws.map((law) => {
            const isSelected = selectedLaw?.id === law.id;
            return (
              <div
                key={law.id}
                onClick={() => setSelectedLaw(law)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-emerald-50/80 border-emerald-600 shadow-sm ring-2 ring-emerald-500/20'
                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-emerald-300'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200">
                      {law.badge}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakWithFemaleVoice(`${law.nameDevanagari}. ${law.detailedCode}`);
                      }}
                      className="p-1 rounded text-slate-400 hover:text-emerald-800 hover:bg-emerald-100 transition-colors"
                      title="उच्चारण व विवरण"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <h4 className="text-base font-black text-slate-900 group-hover:text-emerald-900 transition-colors">
                      {law.nameDevanagari}
                    </h4>
                    <p className="text-xs font-bold text-emerald-800">{law.nameRoman}</p>
                    <p className="text-[11px] text-slate-500 font-semibold">{law.titleHindi}</p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {law.detailedCode}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-900 font-semibold truncate max-w-[170px]">
                    संचालक: {law.presidingAuthority}
                  </span>

                  {isAdmin && (
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleEdit(law)}
                        className="p-1 rounded text-slate-400 hover:text-amber-800 hover:bg-amber-100"
                        title="एडमिन संपादन"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(law.id)}
                        className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-100"
                        title="हटाएं"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Showcase (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {selectedLaw && (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-4 sticky top-24">
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                    {selectedLaw.badge}
                  </span>
                  <h2 className="text-xl font-black text-slate-900 mt-1">
                    {selectedLaw.nameDevanagari}
                  </h2>
                  <p className="text-xs font-bold text-emerald-800">
                    {selectedLaw.nameRoman} ({selectedLaw.titleHindi})
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => speakWithFemaleVoice(`${selectedLaw.nameDevanagari}. ${selectedLaw.detailedCode}`)}
                    className="p-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 transition-all cursor-pointer shadow-xs"
                    title="उच्चारण व विवरण सुनें"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => handleEdit(selectedLaw)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
                      title="एडमिन संपादन"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Authority */}
              <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100 text-xs">
                <span className="font-bold text-emerald-900 uppercase text-[10px] block">न्यायिक / अरण्य संचालक:</span>
                <p className="font-bold text-slate-900">{selectedLaw.presidingAuthority}</p>
              </div>

              {/* Detailed Code */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5 text-emerald-700" /> नियम व पारंपरिक विधान
                </span>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  {selectedLaw.detailedCode}
                </p>
              </div>

              {/* Ecological Wisdom */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-emerald-900 uppercase flex items-center gap-1">
                  <TreePine className="w-3.5 h-3.5 text-emerald-700" /> पारिस्थितिकीय ज्ञान (Ecological Conservation)
                </span>
                <p className="text-xs text-emerald-950 bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100">
                  {selectedLaw.ecologicalWisdom}
                </p>
              </div>

              {/* Punishment / Custom */}
              {selectedLaw.punishmentOrCustom && (
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-rose-900 uppercase flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-700" /> उल्लंघन पर दंड / सामाजिक व्यवस्था
                  </span>
                  <p className="text-xs text-rose-950 bg-rose-50/50 p-3 rounded-2xl border border-rose-100">
                    {selectedLaw.punishmentOrCustom}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Admin Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <h3 className="text-base font-black text-slate-900">
                  {editingLaw ? 'सेंदरा नियम संपादित करें' : 'नया सेंदरा विधान जोड़ें'}
                </h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">नाम (संताली देवनागरी)</label>
                  <input
                    type="text"
                    required
                    value={formData.nameDevanagari || ''}
                    onChange={(e) => setFormData({ ...formData, nameDevanagari: e.target.value })}
                    placeholder="उदा. लोबीर बैसी"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">नाम (Roman Script)</label>
                  <input
                    type="text"
                    value={formData.nameRoman || ''}
                    onChange={(e) => setFormData({ ...formData, nameRoman: e.target.value })}
                    placeholder="e.g. Lobir Baisi"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">हिंदी शीर्षक</label>
                  <input
                    type="text"
                    required
                    value={formData.titleHindi || ''}
                    onChange={(e) => setFormData({ ...formData, titleHindi: e.target.value })}
                    placeholder="उदा. सर्वोच्च लोकतांत्रिक न्यायालय"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">श्रेणी</label>
                  <select
                    value={formData.category || 'conservation_rule'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="court_baisi">सर्वोच्च अरण्य न्यायालय (लोबीर बैसी)</option>
                    <option value="conservation_rule">अरण्य संरक्षण व जीव रक्षा नियम</option>
                    <option value="rituals_signals">संकेत, सींग ध्वनि व अनुष्ठान</option>
                    <option value="fair_share">समतामूलक बंटवारा व अधिकार</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">संचालक / न्यायपीठ (Authority)</label>
                <input
                  type="text"
                  value={formData.presidingAuthority || ''}
                  onChange={(e) => setFormData({ ...formData, presidingAuthority: e.target.value })}
                  placeholder="उदा. दिहरी एवं समस्त आम संताल जन"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">नियम व विधि विवरण (Detailed Code)</label>
                <textarea
                  rows={3}
                  required
                  value={formData.detailedCode || ''}
                  onChange={(e) => setFormData({ ...formData, detailedCode: e.target.value })}
                  placeholder="अरण्य में इसका क्या नियम है और कैसे पालन होता है..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">पारिस्थितिकी ज्ञान व सीख (Ecological Wisdom)</label>
                <textarea
                  rows={2}
                  value={formData.ecologicalWisdom || ''}
                  onChange={(e) => setFormData({ ...formData, ecologicalWisdom: e.target.value })}
                  placeholder="पर्यावरण और समाज के लिए इसका क्या महत्व है..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">दंड अथवा प्रथा (Punishment/Custom)</label>
                  <input
                    type="text"
                    value={formData.punishmentOrCustom || ''}
                    onChange={(e) => setFormData({ ...formData, punishmentOrCustom: e.target.value })}
                    placeholder="उदा. तीर तोड़ना या प्रायश्चित..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">बैज लेबल</label>
                  <input
                    type="text"
                    value={formData.badge || ''}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="उदा. सर्वोच्च अदालत"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
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
