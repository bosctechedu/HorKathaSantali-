import React, { useState, useMemo } from 'react';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  Quote,
  Sparkles,
  Volume2,
  Copy,
  Check,
  Search,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  RotateCcw,
  ShieldCheck,
  Share2,
  BookOpen,
  Compass,
  Lightbulb,
  HeartHandshake
} from 'lucide-react';

export interface BhentaKathaItem {
  id: string;
  santaliDevanagari: string;
  santaliRoman: string;
  literalHindi: string;
  deepMeaningHindi: string;
  practicalContext: string;
  category: 'nature_agri' | 'social_unity' | 'moral_conduct' | 'wisdom_wit' | 'family_elders';
  categoryLabel: string;
  historicalNote?: string;
}

export const DEFAULT_BHENTA_KATHA: BhentaKathaItem[] = [
  {
    id: 'bhenta_1',
    santaliDevanagari: 'दाक् रे दो हाकु बाको तोला।',
    santaliRoman: "Dak' re do haku bako tola.",
    literalHindi: 'बहते पानी में मछली को कभी रस्सी से नहीं बांधा जा सकता।',
    deepMeaningHindi: 'जो व्यक्ति या समाज स्वतंत्र और प्राकृतिक स्वभाव का है, उसे छल या अनुचित बंधनों में कैद नहीं रखा जा सकता। स्वतंत्रता ही सच्चा जीवन है।',
    practicalContext: 'जब कोई किसी स्वतंत्र संताली व्यक्ति या अदम्य साहस को जबरन दबाने का प्रयास करता है, तब बड़े-बुजुर्ग यह कहावत कहते हैं।',
    category: 'nature_agri',
    categoryLabel: 'प्रकृति व स्वतंत्रता'
  },
  {
    id: 'bhenta_2',
    santaliDevanagari: 'मित् टेंज कटुप ते दो रोड़ बांय साबोः-आ।',
    santaliRoman: "Mid tenj katup' te do ror bay saboh-a.",
    literalHindi: 'एक उंगली से कभी मक्खी या ढेला नहीं पकड़ा जा सकता।',
    deepMeaningHindi: 'अकेला चना भाड़ नहीं फोड़ सकता। जब तक समाज की पांचों उंगलियां मुट्ठी की भांति संगठित न हों, कोई भी बड़ा काम या संघर्ष सफल नहीं हो सकता।',
    practicalContext: 'अखड़ा में ग्राम-सभा या मांझी परगना सभा में एकजुटता पर बल देते समय बोली जाती है।',
    category: 'social_unity',
    categoryLabel: 'सामूहिकता व एकता'
  },
  {
    id: 'bhenta_3',
    santaliDevanagari: 'रोड़ बाड़ाए खान दो काथा, चास बाड़ाए खान दो गाथा।',
    santaliRoman: "Ror barae khan do katha, chas barae khan do gatha.",
    literalHindi: 'बोलना जानो तो बात संवरती है, खेती जानो तो कोठी (धान) भरती है।',
    deepMeaningHindi: 'मधुर, सत्य और संयमित वाणी समाज में सम्मान दिलाती है, और लगन से की गई वैज्ञानिक पारम्परिक खेती कभी भूखा नहीं रहने देती।',
    practicalContext: 'युवाओं को वाणी का संयम और कृषि कर्म की महत्ता समझाने हेतु दी जाने वाली सीख।',
    category: 'wisdom_wit',
    categoryLabel: 'बुद्धिमत्ता व कर्म'
  },
  {
    id: 'bhenta_4',
    santaliDevanagari: 'सेता दो जांग गेय तोगोजा, तोबो रेहोय दुलाड़ गेया।',
    santaliRoman: "Seta do jang gey togoja, tobo rehoy dular geya.",
    literalHindi: 'कुत्ता केवल सूखी हड्डी चबाता है, फिर भी वह अपने मालिक से अगाध निष्ठा रखता है।',
    deepMeaningHindi: 'सच्ची निष्ठा और वफादारी भौतिक सुख-सुविधाओं की मोहताज नहीं होती। सादगी में भी कृतज्ञता सबसे बड़ा सद्गुण है।',
    practicalContext: 'मित्रता और समाज के प्रति निष्ठा की परीक्षा के समय बुजुर्गों द्वारा प्रयुक्त।',
    category: 'moral_conduct',
    categoryLabel: 'सत्य व आचरण'
  },
  {
    id: 'bhenta_5',
    santaliDevanagari: 'हापड़ाव कोवाः डाहार, सेंगेल लेका चेरगेत।',
    santaliRoman: "Hapraw kowa dahar, sengel leka cherget.",
    literalHindi: 'पूर्वजों का दिखाया मार्ग, प्रज्वलित मशाल की तरह अंधेरे को चीरता है।',
    deepMeaningHindi: 'हमारी संस्कृति, रीति-रिवाज और पुरखों के अनुभव जीवन के सबसे कठिन अंधकार में भी सही दिशा दिखाते हैं; परंपरा से भटके तो दिशा भ्रम निश्चित है।',
    practicalContext: 'सामाजिक संस्कारों, बोंगा-बुरु और मांझी परंपरा के पालन पर बल देते समय।',
    category: 'family_elders',
    categoryLabel: 'पुरखे व विरासत'
  },
  {
    id: 'bhenta_6',
    santaliDevanagari: 'हुरु बाहा लेका कुड़ी, सेरेञ लेका कोड़ा।',
    santaliRoman: "Huru baha leka kuri, serenj leka kora.",
    literalHindi: 'धान के खिले फूल जैसी युवती, और मधुर मांदार की धुन जैसा परिश्रमी युवक।',
    deepMeaningHindi: 'संताली समाज में सौंदर्य का पैमाना कृत्रिम शृंगार नहीं, बल्कि धान जैसी सादगी, कोमलता और गीत की लय जैसा हंसमुख, कर्मठ पुरुषार्थ है।',
    practicalContext: 'बापला (विवाह) के समय वर-वधू के गुणों की सराहना में गाया जाने वाला रूपक।',
    category: 'family_elders',
    categoryLabel: 'परिवार व विवाह'
  },
  {
    id: 'bhenta_7',
    santaliDevanagari: 'चास रे दो धुरा, आख़ड़ा रे दो धूमा।',
    santaliRoman: "Chas re do dhura, akhra re do dhuma.",
    literalHindi: 'खेत में पसीने व धूल से नहाओ, और संध्या को अखड़ा में मांदार के साथ झूमो।',
    deepMeaningHindi: 'कड़ा परिश्रम और भरपूर उल्लास - यही संताली जीवन दर्शन की आत्मा है। दिनभर खेत में मेहनत करो और शाम को संस्कृति के रंग में तरोताजा हो जाओ।',
    practicalContext: 'जीवन में संतुलन, कर्म और मनोरंजन के प्राकृतिक समन्वय को प्रकट करता है।',
    category: 'nature_agri',
    categoryLabel: 'कृषि व जीवन दर्शन'
  },
  {
    id: 'bhenta_8',
    santaliDevanagari: 'मांझी हाड़ाम आः काथा बांय रपुदा, जाहेर थान रे सेंगेल बांय उजूआ।',
    santaliRoman: "Majhi haram ah katha bay rapuda, Jaher Than re sengel bay ujua.",
    literalHindi: 'मांझी हाड़ाम का निर्णय कभी व्यर्थ नहीं खंडित होता, और जाहेर थान में कभी आग नहीं बुझती।',
    deepMeaningHindi: 'लोकतांत्रिक पंचायती व्यवस्था और आस्था के केंद्र जाहेर थान की गरिमा सर्वोपरि है; सामूहिक न्याय ही संथाली समाज का स्तंभ है।',
    practicalContext: 'मांझी परगना स्वशासन में सर्वसम्मति के निर्णय की महत्ता।',
    category: 'social_unity',
    categoryLabel: 'सामूहिकता व न्याय'
  }
];

export const SantaliProverbsBhenta: React.FC = () => {
  const { isAdmin } = useAdmin();
  const STORAGE_KEY = 'hor_katha_bhenta_katha_db';

  const [proverbs, setProverbs] = useState<BhentaKathaItem[]>(() => {
    return safeLoadFromStorage(STORAGE_KEY, DEFAULT_BHENTA_KATHA);
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Admin Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BhentaKathaItem | null>(null);
  const [formData, setFormData] = useState<Partial<BhentaKathaItem>>({});

  const saveProverbs = (updated: BhentaKathaItem[]) => {
    setProverbs(updated);
    safeSaveToStorage(STORAGE_KEY, updated);
  };

  // Filtered List
  const filteredList = useMemo(() => {
    return proverbs.filter((item) => {
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.santaliDevanagari.toLowerCase().includes(q) ||
        item.santaliRoman.toLowerCase().includes(q) ||
        item.literalHindi.toLowerCase().includes(q) ||
        item.deepMeaningHindi.toLowerCase().includes(q) ||
        item.practicalContext.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [proverbs, selectedCategory, searchQuery]);

  // Proverb of the Day (seeded by day of month)
  const todayProverb = useMemo(() => {
    if (proverbs.length === 0) return null;
    const day = new Date().getDate();
    return proverbs[day % proverbs.length];
  }, [proverbs]);

  const handleCopy = (item: BhentaKathaItem) => {
    const text = `🌸 संताली भेंता काथा (Santali Proverb):\n"${item.santaliDevanagari}"\n(${item.santaliRoman})\n\n📖 शाब्दिक अर्थ: ${item.literalHindi}\n💡 गूढ़ दार्शनिक भावार्थ: ${item.deepMeaningHindi}\n\n- Hor Katha Suite`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShareWhatsApp = (item: BhentaKathaItem) => {
    const text = encodeURIComponent(
      `🌿 संताली भेंता काथा (Proverb):\n"${item.santaliDevanagari}"\n\n💡 भावार्थ: ${item.deepMeaningHindi}\n\n- Hor Katha Suite`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Admin CRUD
  const handleAddNew = () => {
    setEditingItem(null);
    setFormData({
      id: `bhenta_${Date.now()}`,
      santaliDevanagari: '',
      santaliRoman: '',
      literalHindi: '',
      deepMeaningHindi: '',
      practicalContext: '',
      category: 'wisdom_wit',
      categoryLabel: 'बुद्धिमत्ता व कर्म'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: BhentaKathaItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('क्या आप सचमुच इस भेंता काथा को हटाना चाहते हैं?')) {
      const updated = proverbs.filter((p) => p.id !== id);
      saveProverbs(updated);
    }
  };

  const handleResetToDefault = () => {
    if (confirm('डिफ़ॉल्ट भेंता काथा सूची पुनर्स्थापित करें?')) {
      saveProverbs(DEFAULT_BHENTA_KATHA);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.santaliDevanagari || !formData.literalHindi || !formData.deepMeaningHindi) return;

    const categoryLabels: Record<string, string> = {
      nature_agri: 'प्रकृति व कृषि',
      social_unity: 'सामूहिकता व एकता',
      moral_conduct: 'सत्य व आचरण',
      wisdom_wit: 'बुद्धिमत्ता व कर्म',
      family_elders: 'पुरखे व विरासत'
    };

    const readyItem: BhentaKathaItem = {
      id: editingItem ? editingItem.id : `bhenta_${Date.now()}`,
      santaliDevanagari: formData.santaliDevanagari || '',
      santaliRoman: formData.santaliRoman || '',
      literalHindi: formData.literalHindi || '',
      deepMeaningHindi: formData.deepMeaningHindi || '',
      practicalContext: formData.practicalContext || '',
      category: (formData.category || 'wisdom_wit') as any,
      categoryLabel: categoryLabels[formData.category || 'wisdom_wit'] || 'ज्ञान'
    };

    if (editingItem) {
      const updated = proverbs.map((p) => (p.id === editingItem.id ? readyItem : p));
      saveProverbs(updated);
    } else {
      saveProverbs([readyItem, ...proverbs]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-md border border-teal-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold backdrop-blur-xs border border-emerald-400/30">
              <Quote className="w-3.5 h-3.5" />
              <span>संताली मौखिक साहित्य एवं जीवन-दर्शन (Oral Wisdom)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-50">
              संताली भेंता काथा एवं लोकोक्तियाँ कोश
            </h1>
            <p className="text-sm text-emerald-200/90 max-w-2xl leading-relaxed">
              पीढ़ियों से संताली अखड़ा, खेत-खलिहान और चौपालों में गूंजती अनमोल भेंता काथा (रूपक) व मेनकाथा (कहावतें) - सादगी में छिपे जीवन के गहरे सत्य व प्रेरणा।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => speakWithFemaleVoice('संताली भेंता काथा एवं लोकोक्तियाँ कोश')}
              className="px-3.5 py-2 bg-emerald-800/60 hover:bg-emerald-700/70 border border-emerald-600/40 text-emerald-100 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
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
                  <span>नयी कहावत जोड़ें</span>
                </button>
                <button
                  onClick={handleResetToDefault}
                  title="डिफ़ॉल्ट सूची रीसेट करें"
                  className="p-2 bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 rounded-xl transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Proverb of the Day (Spotlight Banner) */}
      {todayProverb && (
        <div className="bg-gradient-to-r from-amber-500/15 via-emerald-500/10 to-teal-500/15 border-2 border-amber-300/80 rounded-3xl p-5 sm:p-6 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-600 text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5" /> आज की भेंता काथा (Proverb of the Day)
                </span>
                <span className="text-xs font-bold text-amber-900">
                  {todayProverb.categoryLabel}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                "{todayProverb.santaliDevanagari}"
              </h2>
              <p className="text-xs font-bold text-teal-800">
                {todayProverb.santaliRoman}
              </p>

              <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-white/80 p-3 rounded-xl border border-amber-200">
                  <span className="font-bold text-slate-600 block text-[11px] uppercase">शाब्दिक अर्थ:</span>
                  <p className="text-slate-800 font-semibold">{todayProverb.literalHindi}</p>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-emerald-200">
                  <span className="font-bold text-emerald-900 block text-[11px] uppercase">गूढ़ दार्शनिक भावार्थ:</span>
                  <p className="text-emerald-950 font-semibold">{todayProverb.deepMeaningHindi}</p>
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col gap-2 shrink-0">
              <button
                onClick={() => speakWithFemaleVoice(`${todayProverb.santaliDevanagari}. ${todayProverb.deepMeaningHindi}`)}
                className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs transition-all cursor-pointer flex items-center justify-center"
                title="उच्चारण व भावार्थ सुनें"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleCopy(todayProverb)}
                className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs transition-all cursor-pointer flex items-center justify-center"
                title="कॉपी करें"
              >
                {copiedId === todayProverb.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={() => handleShareWhatsApp(todayProverb)}
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xs transition-all cursor-pointer flex items-center justify-center"
                title="व्हाट्सएप पर साझा करें"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search & Categories Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="संताली शब्द, कहावत या हिंदी भावार्थ से खोजें..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {[
              { id: 'all', label: 'सभी' },
              { id: 'nature_agri', label: 'प्रकृति व कृषि' },
              { id: 'social_unity', label: 'एकता व समाज' },
              { id: 'moral_conduct', label: 'आचरण व सद्गुण' },
              { id: 'wisdom_wit', label: 'बुद्धिमत्ता व कर्म' },
              { id: 'family_elders', label: 'पुरखे व परिवार' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-800 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Proverbs Cards List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-semibold">
          <span>कुल लोकोक्तियाँ: {filteredList.length}</span>
          {isAdmin && (
            <span className="text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300">
              एडमिन संपादन अधिकार सक्रिय (Add/Edit/Delete)
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-5 border border-slate-200/90 hover:border-emerald-300 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Header Badge & Action Icons */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-200">
                    {item.categoryLabel}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => speakWithFemaleVoice(item.santaliDevanagari)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-800 hover:bg-emerald-50 transition-colors cursor-pointer"
                      title="उच्चारण सुनें"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleCopy(item)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-800 hover:bg-emerald-50 transition-colors cursor-pointer"
                      title="कॉपी करें"
                    >
                      {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleShareWhatsApp(item)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                      title="व्हाट्सएप साझा करें"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>

                    {isAdmin && (
                      <>
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-800 hover:bg-amber-100 transition-colors cursor-pointer"
                          title="एडमिन संपादन"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                          title="हटाएं"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Santali Text & Roman */}
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-900 transition-colors leading-snug">
                    "{item.santaliDevanagari}"
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 italic">
                    {item.santaliRoman}
                  </p>
                </div>

                {/* Literal Meaning */}
                <div className="text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-0.5">
                  <span className="font-bold text-slate-500 text-[11px] uppercase">शाब्दिक अर्थ:</span>
                  <p className="text-slate-800 font-medium">{item.literalHindi}</p>
                </div>

                {/* Deep Philosophical Meaning */}
                <div className="text-xs bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100 space-y-0.5">
                  <span className="font-bold text-emerald-900 text-[11px] uppercase flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-emerald-700" /> गूढ़ दार्शनिक भावार्थ:
                  </span>
                  <p className="text-emerald-950 font-semibold leading-relaxed">
                    {item.deepMeaningHindi}
                  </p>
                </div>

                {/* Practical Context */}
                {item.practicalContext && (
                  <div className="text-[11px] text-slate-600 px-1 flex items-start gap-1.5">
                    <HeartHandshake className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span><strong>प्रयोग संदर्भ:</strong> {item.practicalContext}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
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
                  {editingItem ? 'भेंता काथा संपादित करें' : 'नयी भेंता काथा जोड़ें'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">कहावत (संताली देवनागरी)</label>
                <input
                  type="text"
                  required
                  value={formData.santaliDevanagari || ''}
                  onChange={(e) => setFormData({ ...formData, santaliDevanagari: e.target.value })}
                  placeholder="उदा. दाक् रे दो हाकु बाको तोला।"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">रोमन लिपि (Roman Script)</label>
                  <input
                    type="text"
                    value={formData.santaliRoman || ''}
                    onChange={(e) => setFormData({ ...formData, santaliRoman: e.target.value })}
                    placeholder="e.g. Dak' re do haku bako tola."
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">श्रेणी (Category)</label>
                  <select
                    value={formData.category || 'wisdom_wit'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="nature_agri">प्रकृति व कृषि (nature_agri)</option>
                    <option value="social_unity">सामूहिकता व एकता (social_unity)</option>
                    <option value="moral_conduct">सत्य व आचरण (moral_conduct)</option>
                    <option value="wisdom_wit">बुद्धिमत्ता व कर्म (wisdom_wit)</option>
                    <option value="family_elders">पुरखे व परिवार (family_elders)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">शाब्दिक अर्थ (Literal Hindi)</label>
                <input
                  type="text"
                  required
                  value={formData.literalHindi || ''}
                  onChange={(e) => setFormData({ ...formData, literalHindi: e.target.value })}
                  placeholder="अक्षरशः अर्थ क्या है..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">गूढ़ दार्शनिक भावार्थ (Deep Meaning)</label>
                <textarea
                  rows={2}
                  required
                  value={formData.deepMeaningHindi || ''}
                  onChange={(e) => setFormData({ ...formData, deepMeaningHindi: e.target.value })}
                  placeholder="जीवन, समाज और प्रकृति से जुड़ी सीख..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">व्यवहारिक प्रयोग संदर्भ (Practical Context)</label>
                <input
                  type="text"
                  value={formData.practicalContext || ''}
                  onChange={(e) => setFormData({ ...formData, practicalContext: e.target.value })}
                  placeholder="दैनिक जीवन या सभा में कब प्रयुक्त होता है..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
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
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
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
