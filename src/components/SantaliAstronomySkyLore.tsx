import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  Sparkles,
  Moon,
  Sun,
  Compass,
  Volume2,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Eye,
  Info
} from 'lucide-react';

export interface CelestialItem {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  titleHindi: string;
  category: 'star' | 'planet' | 'constellation' | 'phenomenon';
  categoryLabel: string;
  modernEquivalent: string;
  nightObservationRole: string;
  ancestralMythology: string;
  badge: string;
}

export const DEFAULT_CELESTIAL_ITEMS: CelestialItem[] = [
  {
    id: 'ipil_bhurka',
    nameDevanagari: 'भुरका इपिल (Bhurka Ipil)',
    nameRoman: 'Bhurka Ipil',
    titleHindi: 'भोर का तारा (शुक्र ग्रह / Morning Star)',
    category: 'planet',
    categoryLabel: 'ग्रह (Planet)',
    modernEquivalent: 'शुक्र ग्रह (Venus)',
    nightObservationRole: 'पूर्व दिशा में सबसे चमकीला तारा। इसे देखकर संताली किसान, चरवाहे और महिलाएं समझ जाते हैं कि भोर (आंगा) होने में मात्र एक घंटा शेष है।',
    ancestralMythology: 'भुरका इपिल को नया जीवन, जागरण और सवेरे की पहली किरण का दूत माना जाता है। इसके उदय होने पर बासी काम समाप्त किए जाते हैं।',
    badge: 'भोर का दूत'
  },
  {
    id: 'ipil_bonga_dahar',
    nameDevanagari: 'बोंगा डाहार (Bonga Dahar)',
    nameRoman: 'Bonga Dahar',
    titleHindi: 'आकाशगंगा - देवताओं का पावन मार्ग (Milky Way)',
    category: 'constellation',
    categoryLabel: 'नक्षत्र मंडल (Galaxy)',
    modernEquivalent: 'मिल्की वे आकाशगंगा (Milky Way Galaxy)',
    nightObservationRole: 'शरद व शीत ऋतु में उत्तर से दक्षिण आकाश में फैली श्वेत तारों की चमकदार नदी। रात के पहरों और दिशाओं का निर्धारण।',
    ancestralMythology: 'संताली मान्यता है कि यह परम पिता ठाकुर जिउ, मारांग बुरु और पूर्वजों की आत्माओं का स्वर्गिक मार्ग है, जिस पर दिव्य शक्तियां विचरण करती हैं।',
    badge: 'देव मार्ग'
  },
  {
    id: 'ipil_moneko_turuiko',
    nameDevanagari: 'मोड़ेको-तुरुईको इपिल (Saptarshi)',
    nameRoman: 'Moneko-Turuiko Ipil',
    titleHindi: 'सप्तर्षि मंडल (The Great Bear / Ursa Major)',
    category: 'constellation',
    categoryLabel: 'नक्षत्र मंडल',
    modernEquivalent: 'सप्तर्षि (Ursa Major / Big Dipper)',
    nightObservationRole: 'सात तारों का खाट (चारपाई) जैसा समूह। इसकी पूंछ के दो तारों की सीध से ध्रुव तारा और उत्तर दिशा पहचानी जाती है।',
    ancestralMythology: 'संताल धर्म के प्रधान देव मोड़ेको (पांच भाई) और तुरुईको (छह बहिनें) की दिव्य ज्योति स्वरूप माना जाता है।',
    badge: 'दिशा निर्देशक'
  },
  {
    id: 'ipil_katra_dhurv',
    nameDevanagari: 'कातरा इपिल (Katra Ipil)',
    nameRoman: 'Katra Ipil',
    titleHindi: 'अचल ध्रुव तारा (North Star / Polaris)',
    category: 'star',
    categoryLabel: 'नक्षत्र तारा (Star)',
    modernEquivalent: 'ध्रुव तारा (Polaris)',
    nightObservationRole: 'उत्तरी गोलार्ध में सदा स्थिर रहने वाला तारा। घने जंगलों में शिकार (सेंदरा) के समय संताली धनुर्धर इसी से दिशा तय करते हैं।',
    ancestralMythology: 'सत्य, निष्ठा और अविचल संकल्प का दिव्य प्रतीक। कभी भी अपनी जगह नहीं बदलने वाला तारा।',
    badge: 'अविचल दिशा'
  },
  {
    id: 'ipil_hati_gada',
    nameDevanagari: 'हाती-गाड़ा इपिल (Hati Gada)',
    nameRoman: 'Hati Gada Ipil',
    titleHindi: 'मृगशिरा व व्याध नक्षत्र (Orion & Sirius)',
    category: 'constellation',
    categoryLabel: 'नक्षत्र मंडल',
    modernEquivalent: 'ओरियन नक्षत्र (The Hunter / Orion)',
    nightObservationRole: 'तीन कतारबद्ध तारों वाला विशाल समूह, जो जल पीते हाथी जैसा प्रतीत होता है।',
    ancestralMythology: 'यह संकेत देता है कि वर्षा ऋतु निकट है और धरती को जल तृप्ति मिलने वाली है।',
    badge: 'वर्षा सूचक'
  },
  {
    id: 'ipil_angarak',
    nameDevanagari: 'अंगाराक इपिल (Angarak Ipil)',
    nameRoman: 'Angarak Ipil',
    titleHindi: 'मंगल ग्रह (Red Planet Mars)',
    category: 'planet',
    categoryLabel: 'ग्रह (Planet)',
    modernEquivalent: 'मंगल ग्रह (Mars)',
    nightObservationRole: 'लाल अंगारे की भांति चमकने वाला तारा।',
    ancestralMythology: 'अग्नि तत्व और शौर्य का प्रतीक माना जाता है।',
    badge: 'अंगार ग्रह'
  },
  {
    id: 'phenom_chando_gahan',
    nameDevanagari: 'चांदो ग्रहण (Lunar Eclipse Lore)',
    nameRoman: 'Cando Gahan',
    titleHindi: 'चंद्रमा को राहु के घेरे से मुक्त कराने की लोक-परंपरा',
    category: 'phenomenon',
    categoryLabel: 'खगोलीय घटना',
    modernEquivalent: 'चंद्र ग्रहण (Lunar Eclipse)',
    nightObservationRole: 'चंद्रमा पर पृथ्वी की छाया का पड़ना।',
    ancestralMythology: 'ग्रहण के समय संताली गांव में लोग तुमदाक्-टमाक बजाकर शोर करते हैं ताकि चंद्रमा को पीड़ा न पहुंचे और वह शीघ्र मुक्त हो। ग्रहण के बाद नदी में स्नान अनिवार्य होता है।',
    badge: 'खगोलीय संस्कार'
  }
];

export const SantaliAstronomySkyLore: React.FC = () => {
  const { isAdmin } = useAdmin();
  const STORAGE_KEY = 'hor_katha_astronomy_db';

  const [items, setItems] = useState<CelestialItem[]>(() => {
    return safeLoadFromStorage(STORAGE_KEY, DEFAULT_CELESTIAL_ITEMS);
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<CelestialItem>(items[0]);

  // Admin Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CelestialItem | null>(null);
  const [formData, setFormData] = useState<Partial<CelestialItem>>({});

  const saveItems = (updated: CelestialItem[]) => {
    setItems(updated);
    safeSaveToStorage(STORAGE_KEY, updated);
  };

  // Admin Actions
  const handleAddNew = () => {
    setEditingItem(null);
    setFormData({
      id: `celestial_${Date.now()}`,
      nameDevanagari: '',
      nameRoman: '',
      titleHindi: '',
      category: 'star',
      categoryLabel: 'नक्षत्र तारा',
      modernEquivalent: '',
      nightObservationRole: '',
      ancestralMythology: '',
      badge: 'खगोलीय'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: CelestialItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('क्या आप सचमुच इस खगोलीय जानकारी को हटाना चाहते हैं?')) {
      const updated = items.filter((i) => i.id !== id);
      saveItems(updated);
      if (selectedItem?.id === id) {
        setSelectedItem(updated[0] || null);
      }
    }
  };

  const handleResetToDefault = () => {
    if (confirm('डिफ़ॉल्ट खगोल-विज्ञान व आकाश-ज्ञान डेटा रीसेट करें?')) {
      saveItems(DEFAULT_CELESTIAL_ITEMS);
      setSelectedItem(DEFAULT_CELESTIAL_ITEMS[0]);
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameDevanagari || !formData.titleHindi) return;

    const categoryLabels: Record<string, string> = {
      star: 'नक्षत्र तारा',
      planet: 'ग्रह',
      constellation: 'नक्षत्र मंडल',
      phenomenon: 'खगोलीय घटना'
    };

    const readyItem: CelestialItem = {
      id: editingItem ? editingItem.id : `celestial_${Date.now()}`,
      nameDevanagari: formData.nameDevanagari || '',
      nameRoman: formData.nameRoman || '',
      titleHindi: formData.titleHindi || '',
      category: (formData.category || 'star') as any,
      categoryLabel: categoryLabels[formData.category || 'star'] || 'खगोलीय',
      modernEquivalent: formData.modernEquivalent || '',
      nightObservationRole: formData.nightObservationRole || '',
      ancestralMythology: formData.ancestralMythology || '',
      badge: formData.badge || 'आकाश तारा'
    };

    if (editingItem) {
      const updated = items.map((i) => (i.id === editingItem.id ? readyItem : i));
      saveItems(updated);
      setSelectedItem(readyItem);
    } else {
      saveItems([readyItem, ...items]);
      setSelectedItem(readyItem);
    }
    setIsModalOpen(false);
  };

  const filteredItems = items.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-md border border-indigo-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold backdrop-blur-xs border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>संताली पारंपरिक खगोल-विज्ञान व आकाश-ज्ञान (Indigenous Astronomy &amp; Sky Lore)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-indigo-50">
              संताली खगोल-विज्ञान, नक्षत्र व आकाश-ज्ञान (इपिल व बोंगा डाहार)
            </h1>
            <p className="text-sm text-indigo-200/90 max-w-2xl leading-relaxed">
              भुरका इपिल (भोर का तारा), बोंगा डाहार (आकाशगंगा), मोड़ेको-तुरुईको इपिल (सप्तर्षि) से लेकर कातरा इपिल (ध्रुव तारा) तक — संताली पुरखों का रात्रि दिशा-ज्ञान व खगोलीय दर्शन।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => speakWithFemaleVoice('संताली खगोल-विज्ञान, नक्षत्र व आकाश-ज्ञान')}
              className="px-3.5 py-2 bg-indigo-900/80 hover:bg-indigo-800 border border-indigo-600/40 text-indigo-100 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Volume2 className="w-4 h-4 text-indigo-300" />
              <span>ऑडियो गाइड</span>
            </button>
            {isAdmin && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddNew}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>नया तारा/नक्षत्र जोड़ें</span>
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

      {/* Simulated Night Sky Viewer Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border-2 border-indigo-900 p-5 rounded-3xl text-white shadow-inner flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1 justify-center sm:justify-start">
            <Moon className="w-3.5 h-3.5" /> संताली रात्रि आकाश दर्शन (Night Sky Observation)
          </span>
          <h4 className="text-sm font-black text-slate-100">
            तारों की स्थिति देखकर रात के पहर और दिशा का निर्धारण
          </h4>
          <p className="text-xs text-slate-400">
            घने वनों में संताली पुरखे बिना किसी कम्पास के केवल कातरा इपिल (ध्रुव तारा) और बोंगा डाहार (आकाशगंगा) देखकर गंतव्य तक पहुंचते थे।
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
          <span className="text-xs font-bold text-amber-300">आकाशगंगा व नक्षत्र सक्रिय</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-3 rounded-2xl border border-slate-200">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'सभी खगोलीय पिंड' },
            { id: 'planet', label: 'ग्रह (भुरका इपिल आदि)' },
            { id: 'constellation', label: 'नक्षत्र मंडल (बोंगा डाहार)' },
            { id: 'star', label: 'तारे (कातरा इपिल)' },
            { id: 'phenomenon', label: 'खगोलीय संस्कार (ग्रहण)' }
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === c.id
                  ? 'bg-indigo-950 text-white shadow-2xs'
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

      {/* Grid of Celestial Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const isSelected = selectedItem?.id === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 group ${
                isSelected
                  ? 'bg-indigo-50/80 border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
                  : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-indigo-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-900 border border-indigo-200">
                    {item.badge}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakWithFemaleVoice(`${item.nameDevanagari}. ${item.nightObservationRole}`);
                      }}
                      className="p-1 rounded text-slate-400 hover:text-indigo-800 hover:bg-indigo-100 transition-colors"
                      title="उच्चारण व विवरण"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    {isAdmin && (
                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-1 rounded text-slate-400 hover:text-amber-800 hover:bg-amber-100"
                          title="एडमिन संपादन"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-100"
                          title="हटाएं"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-black text-slate-900 group-hover:text-indigo-900 transition-colors">
                    {item.nameDevanagari}
                  </h4>
                  <p className="text-xs font-bold text-indigo-800">{item.nameRoman}</p>
                  <p className="text-[11px] text-slate-500 font-semibold">{item.titleHindi}</p>
                </div>

                <div className="bg-indigo-50/60 p-2.5 rounded-xl border border-indigo-100 text-xs space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">आधुनिक खगोलीय नाम:</span>
                  <p className="font-bold text-indigo-950">{item.modernEquivalent}</p>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {item.nightObservationRole}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <p className="text-slate-600 italic">"{item.ancestralMythology}"</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Admin Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-700" />
                <h3 className="text-base font-black text-slate-900">
                  {editingItem ? 'खगोलीय पिंड संपादित करें' : 'नया तारा/नक्षत्र जोड़ें'}
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
                    placeholder="उदा. भुरका इपिल"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">नाम (Roman Script)</label>
                  <input
                    type="text"
                    value={formData.nameRoman || ''}
                    onChange={(e) => setFormData({ ...formData, nameRoman: e.target.value })}
                    placeholder="e.g. Bhurka Ipil"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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
                    placeholder="उदा. भोर का तारा (शुक्र ग्रह)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">श्रेणी</label>
                  <select
                    value={formData.category || 'star'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
                  >
                    <option value="star">नक्षत्र तारा (star)</option>
                    <option value="planet">ग्रह (planet)</option>
                    <option value="constellation">नक्षत्र मंडल (constellation)</option>
                    <option value="phenomenon">खगोलीय घटना (phenomenon)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">आधुनिक खगोलीय नाम (Modern Equivalent)</label>
                <input
                  type="text"
                  value={formData.modernEquivalent || ''}
                  onChange={(e) => setFormData({ ...formData, modernEquivalent: e.target.value })}
                  placeholder="उदा. Venus / Milky Way / Ursa Major..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">रात्रि अवलोकन व समय/दिशा भूमिका</label>
                <textarea
                  rows={2}
                  required
                  value={formData.nightObservationRole || ''}
                  onChange={(e) => setFormData({ ...formData, nightObservationRole: e.target.value })}
                  placeholder="रात में समय, मौसम या दिशा जानने में इसका क्या उपयोग है..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">पूर्वज मान्यता व पौराणिक कथा</label>
                <textarea
                  rows={2}
                  value={formData.ancestralMythology || ''}
                  onChange={(e) => setFormData({ ...formData, ancestralMythology: e.target.value })}
                  placeholder="संताली संस्कृति में इससे जुड़ी लोककथा..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">बैज लेबल</label>
                <input
                  type="text"
                  value={formData.badge || ''}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="उदा. भोर का दूत"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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
                  className="px-5 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
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
