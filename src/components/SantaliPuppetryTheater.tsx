import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  Drama,
  Music,
  Play,
  RotateCcw,
  Volume2,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Info,
  Pause
} from 'lucide-react';

export interface PuppetryItem {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  titleHindi: string;
  category: 'chadar_badani' | 'akhra_play' | 'traditional_characters' | 'musical_dialogue';
  categoryLabel: string;
  craftingMaterials: string;
  performanceDescription: string;
  culturalMessage: string;
  rhythmStyle?: string;
  badge: string;
}

export const DEFAULT_PUPPETRY_ITEMS: PuppetryItem[] = [
  {
    id: 'puppet_chadar_badani',
    nameDevanagari: 'चादर बदनी कठपुतली (Chadar Badani)',
    nameRoman: 'Chadar Badani',
    titleHindi: 'संतालों की दुर्लभतम काष्ठ कठपुतली कला',
    category: 'chadar_badani',
    categoryLabel: 'काष्ठ कठपुतली',
    craftingMaterials: 'हल्की सेमर या कदम की लकड़ी, बांस के पतले लीवर, रंग-बिरंगे वस्त्र, घुंघरू',
    performanceDescription: 'एक छोटे लकड़ी के बक्से में कई काष्ठ नर्तक-नर्तकियां और एक मांदार वादक सुसज्जित होते हैं। नीचे से चादर (कपड़े) के भीतर गुप्त बांस के डंडे को घुमाने पर सभी पुतलियां एक साथ गोल घेरे में लागड़े की ताल पर थिरकने लगती हैं।',
    culturalMessage: 'सामूहिकता और उत्सव का सजीव रूप। इसे गांव के हाट, सोहराय और करम पर्व पर प्रदर्शित किया जाता है।',
    rhythmStyle: 'लागड़े व सोहराय धुन',
    badge: 'दुर्लभ कला'
  },
  {
    id: 'puppet_tumdak_player',
    nameDevanagari: 'रुसिया तुमदाक् वादक (The Drummer Puppet)',
    nameRoman: 'Rusiya Tumdak Rusika',
    titleHindi: 'मांदार बजाता काष्ठ का नन्हा वादक',
    category: 'traditional_characters',
    categoryLabel: 'पारंपरिक पात्र',
    craftingMaterials: 'तराशी हुई काष्ठ प्रतिमा, नन्हा मिट्टी का तुमदाक्, सूती पगड़ी',
    performanceDescription: 'कठपुतली के दोनों हाथ लचीले धागों से जुड़े होते हैं। जैसे ही संचालक लीवर हिलाता है, यह पुतली अपने नन्हे हाथों से तुमदाक् पर थाप देती प्रतीत होती है।',
    culturalMessage: 'संताली संस्कृति में मांदार वादक (रुसिका) को संगीत का प्राण माना जाता है।',
    rhythmStyle: 'तुमदाक् ताल',
    badge: 'संगीत पात्र'
  },
  {
    id: 'puppet_enej_kuri',
    nameDevanagari: 'एनेच कुड़ी (Dancing Maiden Puppet)',
    nameRoman: 'Enej Kuri',
    titleHindi: 'पारंपरिक पंछी-पाड़हांड पहने नृत्यांगना',
    category: 'traditional_characters',
    categoryLabel: 'पारंपरिक पात्र',
    craftingMaterials: 'काष्ठ धड़, हाथ में बांस की कमानी, लाल-सफेद पंछी वस्त्र, जूड़े में महुआ फूल',
    performanceDescription: 'कतारबद्ध होकर एक-दूसरे की कमर में हाथ डालकर संताली युवतियों के पारंपरिक नृत्य का सजीव प्रदर्शन करती हैं।',
    culturalMessage: 'संताली नारी के श्रम, उल्लास और गरिमा का कलात्मक रूपक।',
    rhythmStyle: 'बाहा व दांता धुन',
    badge: 'नृत्य पात्र'
  },
  {
    id: 'play_akhra_jatra',
    nameDevanagari: 'अखड़ा जात्रा व लोक-नाट्य (Akhra Jatra)',
    nameRoman: 'Akhra Jatra',
    titleHindi: 'अखड़ा में खुले मंच पर सामाजिक व पौराणिक नाटक',
    category: 'akhra_play',
    categoryLabel: 'अखड़ा रंगमंच',
    craftingMaterials: 'प्राकृतिक अखाड़ा, मशालें, मांदार, बानम, बांसुरी व पारंपरिक वेशभूषा',
    performanceDescription: 'संथाल परगना के गांवों में रात्रि के समय अखाड़े में पूरा समाज एकत्र होकर पौराणिक कथाओं (जैसे सिरजोन काहनी, हुल क्रांति और सामाजिक एकता) का नाट्य मंचन करता है।',
    culturalMessage: 'मौखिक इतिहास को नई पीढ़ी तक सजीव रूप से संप्रेषित करने का सबसे शक्तिशाली माध्यम।',
    rhythmStyle: 'संवाद व सामूहिक गान',
    badge: 'लोक रंगमंच'
  },
  {
    id: 'play_hul_natak',
    nameDevanagari: 'सिदो-कान्हू हुल गाथा नाटक',
    nameRoman: 'Sidho-Kanhu Hul Natak',
    titleHindi: '१८५५ के स्वतंत्रता संग्राम का शौर्यपूर्ण अभिनय',
    category: 'akhra_play',
    categoryLabel: 'अखड़ा रंगमंच',
    craftingMaterials: 'तीर-धनुष, कुल्हाड़ी, नगाड़ा, लाल झंडा, पारंपरिक वीर वेश',
    performanceDescription: '३० जून हुल दिवस के अवसर पर युवा कलाकार सिदो-कान्हू और फूलो-झानो का रूप धरकर अंग्रेजों और महाजनों के अत्याचार के विरुद्ध गर्जना करते हैं।',
    culturalMessage: 'मातृभूमि की रक्षा, स्वाभिमान और बलिदान की अमर प्रेरणा।',
    rhythmStyle: 'वीर रस व हुल गीत',
    badge: 'शौर्य नाटक'
  }
];

export const SantaliPuppetryTheater: React.FC = () => {
  const { isAdmin } = useAdmin();
  const STORAGE_KEY = 'hor_katha_puppetry_db';

  const [items, setItems] = useState<PuppetryItem[]>(() => {
    return safeLoadFromStorage(STORAGE_KEY, DEFAULT_PUPPETRY_ITEMS);
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PuppetryItem>(items[0]);
  const [isPlayingRhythm, setIsPlayingRhythm] = useState(false);
  const [activeRhythm, setActiveRhythm] = useState<string>('लागड़े धुन');

  // Admin Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PuppetryItem | null>(null);
  const [formData, setFormData] = useState<Partial<PuppetryItem>>({});

  const saveItems = (updated: PuppetryItem[]) => {
    setItems(updated);
    safeSaveToStorage(STORAGE_KEY, updated);
  };

  const handleToggleRhythm = (rhythmName: string) => {
    if (isPlayingRhythm && activeRhythm === rhythmName) {
      setIsPlayingRhythm(false);
    } else {
      setActiveRhythm(rhythmName);
      setIsPlayingRhythm(true);
      speakWithFemaleVoice(`चादर बदनी कठपुतली नृत्य: ${rhythmName}। धिरिंग-धिरिंग ताक-ताक मांदार की थाप पर काष्ठ पुतलियां थिरक रही हैं।`, { lang: 'hi-IN' });
    }
  };

  // Admin Actions
  const handleAddNew = () => {
    setEditingItem(null);
    setFormData({
      id: `puppet_${Date.now()}`,
      nameDevanagari: '',
      nameRoman: '',
      titleHindi: '',
      category: 'chadar_badani',
      categoryLabel: 'काष्ठ कठपुतली',
      craftingMaterials: '',
      performanceDescription: '',
      culturalMessage: '',
      rhythmStyle: 'लागड़े धुन',
      badge: 'कठपुतली'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: PuppetryItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('क्या आप सचमुच इस कठपुतली/नाट्य प्रविष्टि को हटाना चाहते हैं?')) {
      const updated = items.filter((i) => i.id !== id);
      saveItems(updated);
      if (selectedItem?.id === id) {
        setSelectedItem(updated[0] || null);
      }
    }
  };

  const handleResetToDefault = () => {
    if (confirm('डिफ़ॉल्ट चादर बदनी कठपुतली व लोकनाट्य डेटा रीसेट करें?')) {
      saveItems(DEFAULT_PUPPETRY_ITEMS);
      setSelectedItem(DEFAULT_PUPPETRY_ITEMS[0]);
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameDevanagari || !formData.titleHindi) return;

    const categoryLabels: Record<string, string> = {
      chadar_badani: 'काष्ठ कठपुतली (चादर बदनी)',
      akhra_play: 'अखड़ा लोक-नाट्य व जात्रा',
      traditional_characters: 'पारंपरिक काष्ठ पात्र',
      musical_dialogue: 'गीत-संवाद'
    };

    const readyItem: PuppetryItem = {
      id: editingItem ? editingItem.id : `puppet_${Date.now()}`,
      nameDevanagari: formData.nameDevanagari || '',
      nameRoman: formData.nameRoman || '',
      titleHindi: formData.titleHindi || '',
      category: (formData.category || 'chadar_badani') as any,
      categoryLabel: categoryLabels[formData.category || 'chadar_badani'] || 'कठपुतली कला',
      craftingMaterials: formData.craftingMaterials || '',
      performanceDescription: formData.performanceDescription || '',
      culturalMessage: formData.culturalMessage || '',
      rhythmStyle: formData.rhythmStyle || 'लागड़े धुन',
      badge: formData.badge || 'लोक कला'
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
      <div className="bg-gradient-to-r from-purple-950 via-rose-950 to-amber-950 text-white p-6 sm:p-8 rounded-3xl shadow-md border border-purple-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold backdrop-blur-xs border border-rose-400/30">
              <Drama className="w-3.5 h-3.5" />
              <span>संताली दुर्लभ कठपुतली कला एवं अखड़ा रंगमंच (Indigenous Puppetry & Theater)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-rose-50">
              चादर बदनी कठपुतली कला व अखड़ा लोक-नाट्य
            </h1>
            <p className="text-sm text-rose-200/90 max-w-2xl leading-relaxed">
              काष्ठ की नन्हीं पुतलियों को कपड़े की चादर के नीचे छिपे बांस के लीवर से मांदार की थाप पर नचाने की संतालों की विश्व-प्रसिद्ध दुर्लभ कला "चादर बदनी" एवं अखाड़ा जात्रा परंपरा।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => speakWithFemaleVoice('चादर बदनी कठपुतली कला व अखड़ा लोक-नाट्य')}
              className="px-3.5 py-2 bg-purple-900/80 hover:bg-purple-800 border border-purple-600/40 text-rose-100 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Volume2 className="w-4 h-4 text-rose-300" />
              <span>ऑडियो गाइड</span>
            </button>
            {isAdmin && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddNew}
                  className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>नयी प्रविष्टि जोड़ें</span>
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

      {/* Interactive Chadar Badani Puppet Stage Simulator */}
      <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10 border-2 border-rose-300/80 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-rose-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-rose-700 text-white rounded-xl shadow-xs">
              <Drama className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-black text-slate-900">
                चादर बदनी डिजिटल रंगमंच (Interactive Puppet Stage)
              </h3>
              <p className="text-xs text-rose-900 font-semibold">
                ताल चुनें और देखें कैसे काष्ठ पुतलियां मांदार की लय पर झूमती हैं
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {['लागड़े धुन', 'सोहराय धुन', 'दांता धुन'].map((r) => (
              <button
                key={r}
                onClick={() => handleToggleRhythm(r)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isPlayingRhythm && activeRhythm === r
                    ? 'bg-rose-700 text-white shadow-xs animate-pulse'
                    : 'bg-white text-slate-700 border border-rose-200 hover:bg-rose-50'
                }`}
              >
                {isPlayingRhythm && activeRhythm === r ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{r}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Animated Puppets Stage Representation */}
        <div className="bg-gradient-to-b from-stone-900 via-amber-950 to-stone-950 p-6 rounded-2xl border-4 border-amber-900 text-white relative overflow-hidden flex flex-col items-center justify-center min-h-[160px]">
          <div className="flex items-end justify-center gap-6 sm:gap-10 py-4">
            {/* Puppet 1: Dancing Maiden */}
            <div className={`flex flex-col items-center transition-transform ${isPlayingRhythm ? 'animate-bounce' : ''}`}>
              <div className="w-6 h-6 rounded-full bg-amber-200 border-2 border-black" />
              <div className="w-8 h-12 bg-rose-600 rounded-t-lg border border-white flex items-center justify-center text-[8px] font-bold">
                कुड़ी
              </div>
              <div className="w-2 h-4 bg-stone-700" />
            </div>

            {/* Puppet 2: Center Tumdak Drummer */}
            <div className={`flex flex-col items-center transition-transform ${isPlayingRhythm ? 'scale-110' : ''}`}>
              <div className="w-7 h-7 rounded-full bg-amber-300 border-2 border-black" />
              <div className="w-10 h-10 bg-amber-700 rounded-full border-2 border-amber-400 flex items-center justify-center text-[9px] font-black text-amber-100 shadow-md">
                तुमदाक्
              </div>
              <div className="w-2 h-5 bg-stone-700" />
            </div>

            {/* Puppet 3: Dancing Maiden 2 */}
            <div className={`flex flex-col items-center transition-transform ${isPlayingRhythm ? 'animate-bounce delay-150' : ''}`}>
              <div className="w-6 h-6 rounded-full bg-amber-200 border-2 border-black" />
              <div className="w-8 h-12 bg-emerald-600 rounded-t-lg border border-white flex items-center justify-center text-[8px] font-bold">
                कुड़ी
              </div>
              <div className="w-2 h-4 bg-stone-700" />
            </div>
          </div>

          <p className="text-[11px] text-amber-200/80 font-mono tracking-wider mt-2">
            {isPlayingRhythm
              ? `🎶 ${activeRhythm} सक्रिय: काष्ठ पुतलियों की लयबद्ध जुगलबंदी चल रही है...`
              : 'ऊपर किसी भी धुन पर क्लिक कर कठपुतली नृत्य शुरू करें'}
          </p>
        </div>
      </div>

      {/* Grid of Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const isSelected = selectedItem?.id === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 group ${
                isSelected
                  ? 'bg-rose-50/80 border-rose-500 shadow-md ring-2 ring-rose-500/20'
                  : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-rose-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-100 text-rose-900 border border-rose-200">
                    {item.badge}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakWithFemaleVoice(`${item.nameDevanagari}. ${item.performanceDescription}`);
                      }}
                      className="p-1 rounded text-slate-400 hover:text-rose-800 hover:bg-rose-100 transition-colors"
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
                  <h4 className="text-base font-black text-slate-900 group-hover:text-rose-900 transition-colors">
                    {item.nameDevanagari}
                  </h4>
                  <p className="text-xs font-bold text-rose-800">{item.nameRoman}</p>
                  <p className="text-[11px] text-slate-500 font-semibold">{item.titleHindi}</p>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {item.performanceDescription}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                <p><strong>निर्माण:</strong> {item.craftingMaterials}</p>
                <p className="text-rose-800 font-medium"><strong>संदेश:</strong> {item.culturalMessage}</p>
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
                <ShieldCheck className="w-5 h-5 text-rose-700" />
                <h3 className="text-base font-black text-slate-900">
                  {editingItem ? 'कठपुतली / नाट्य प्रविष्टि संपादित करें' : 'नयी प्रविष्टि जोड़ें'}
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
                    placeholder="उदा. चादर बदनी कठपुतली"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">नाम (Roman Script)</label>
                  <input
                    type="text"
                    value={formData.nameRoman || ''}
                    onChange={(e) => setFormData({ ...formData, nameRoman: e.target.value })}
                    placeholder="e.g. Chadar Badani"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none"
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
                    placeholder="उदा. संतालों की दुर्लभ काष्ठ कठपुतली"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">श्रेणी</label>
                  <select
                    value={formData.category || 'chadar_badani'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white"
                  >
                    <option value="chadar_badani">काष्ठ कठपुतली (चादर बदनी)</option>
                    <option value="traditional_characters">पारंपरिक पात्र</option>
                    <option value="akhra_play">अखड़ा लोक-नाट्य व जात्रा</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">शिल्प व निर्माण सामग्री</label>
                <input
                  type="text"
                  value={formData.craftingMaterials || ''}
                  onChange={(e) => setFormData({ ...formData, craftingMaterials: e.target.value })}
                  placeholder="उदा. सेमर की लकड़ी, बांस के पतले लीवर..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">प्रदर्शन व मंचन विवरण</label>
                <textarea
                  rows={3}
                  required
                  value={formData.performanceDescription || ''}
                  onChange={(e) => setFormData({ ...formData, performanceDescription: e.target.value })}
                  placeholder="मंचन की प्रक्रिया, पुतलियों की गति..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">सांस्कृतिक व सामाजिक संदेश</label>
                  <input
                    type="text"
                    value={formData.culturalMessage || ''}
                    onChange={(e) => setFormData({ ...formData, culturalMessage: e.target.value })}
                    placeholder="उदा. सामूहिकता और एकता..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ताल / संगीत शैली</label>
                  <input
                    type="text"
                    value={formData.rhythmStyle || ''}
                    onChange={(e) => setFormData({ ...formData, rhythmStyle: e.target.value })}
                    placeholder="उदा. लागड़े व सोहराय धुन"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none"
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
                  className="px-5 py-2 bg-rose-700 hover:bg-rose-600 text-white rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
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
