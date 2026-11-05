import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  Flame,
  Volume2,
  Hammer,
  Shield,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  Compass,
  ArrowRight,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';

export interface IronCraftTool {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  category: 'farming' | 'hunting' | 'woodcutting' | 'forge';
  categoryHindi: string;
  useDescription: string;
  forgingTechnique: string;
  culturalNote: string;
  dimensionsWeight: string;
  imageUrl: string;
}

export const DEFAULT_IRON_TOOLS: IronCraftTool[] = [
  {
    id: 'tool1',
    nameDevanagari: 'दातरम (हँसिया)',
    nameRoman: 'Datrom',
    category: 'farming',
    categoryHindi: 'कृषि व फसल कटाई (Agriculture)',
    useDescription: 'धान, बाजरा, मक्का और घासों की कटाई के लिए संताली किसानों का सबसे अभिन्न औजार। इसका वक्राकार दांतेदार फलक पौधों को जड़ के समीप से सुगमता से काटता है।',
    forgingTechnique: 'उच्च कार्बन लोहे को लाल गर्म कर पतली धार में पीटा जाता है और छेनी से बारीक दांते उकेरे जाते हैं।',
    culturalNote: 'सोहराय पर्व के दौरान हल और दातरम की तेल-सिंदूर लगाकर पूजा की जाती है और अन्नापूर्णा का सम्मान किया जाता है।',
    dimensionsWeight: 'लंबाई: 25-30 सेमी · भार: 250-400 ग्राम',
    imageUrl: 'https://images.unsplash.com/photo-1595878715977-2e8f8df18ea8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tool2',
    nameDevanagari: 'तांगा (पारंपरिक कुल्हाड़ी)',
    nameRoman: 'Tanga',
    category: 'woodcutting',
    categoryHindi: 'वन, काष्ठ व आत्मरक्षा (Woodcraft & Defence)',
    useDescription: 'लकड़ी काटने, ईंधन एकत्र करने, घर निर्माण और वनों में हिंसक वन्यजीवों से आत्मरक्षा के लिए संताली पुरुषों का पारंपरिक शस्त्र।',
    forgingTechnique: 'भारी लोहे के पिंड में आंख (आई-होल) बनाई जाती है जिसमें मजबूत सखुआ या बांस का बेंट लगाया जाता है। धार को पानी में बुझाकर कठोर किया जाता है।',
    culturalNote: 'सेंदरा (पारंपरिक शिकार उत्सव) में तांगा लेकर चलना स्वाभिमान और पुरुषार्थ का प्रतीक माना जाता है।',
    dimensionsWeight: 'लंबाई: 45-60 सेमी · भार: 800-1500 ग्राम',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tool3',
    nameDevanagari: 'सार-फासी (तीर के लौह फलक)',
    nameRoman: 'Sar-Phasi (Arrowheads)',
    category: 'hunting',
    categoryHindi: 'धनुर्विद्या व संताल हूल (Archery & Hul)',
    useDescription: 'बांस के तीरों के अग्रभाग पर जोड़े जाने वाले घातक लोहे के नुकीले फल। इनमें तीन प्रमुख रूप होते हैं: तुतुरी (पक्षी शिकार), फासी (मछली व छोटे जीव), और बर्च्छा-फलक (हूल युद्ध व बड़ा शिकार)।',
    forgingTechnique: 'लौह तार को पीटकर पत्ती के आकार में बदला जाता है और पीछे खोखला निकास बनाया जाता है ताकि तीर के तिनके में फंसाया जा सके।',
    culturalNote: '1855 के संताल हूल में अंग्रेजों की आधुनिक बंदूकों का मुकाबला सिदो-कान्हू के लड़ाकों ने इन्हीं तीरों से किया था।',
    dimensionsWeight: 'लंबाई: 8-15 सेमी · भार: 25-60 ग्राम प्रति फलक',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tool4',
    nameDevanagari: 'कुड़ी (कुदाल / फावड़ा)',
    nameRoman: 'Kudi',
    category: 'farming',
    categoryHindi: 'भूमि निर्माण व आहर-बांधी (Soil & Irrigation)',
    useDescription: 'खेतों की मेढ़ बांधने, मिट्टी खोदने, आहर और बांधी (जल संचयन संरचना) तैयार करने के लिए विशाल चौड़ा फलक।',
    forgingTechnique: 'सपाट मोटी लोहे की चादर को पीटकर अर्ध-वक्राकार आकार दिया जाता है ताकि एक ही झटके में गहरी मिट्टी उठ सके।',
    culturalNote: 'सामूहिक श्रम (गोदो-बैसी) में पूरे गांव के लोग अपनी कुड़ी लेकर बांध और तालाब की खुदाई करते हैं।',
    dimensionsWeight: 'लंबाई: 25 सेमी चौड़ाई: 20 सेमी · भार: 1.5-2.2 किग्रा',
    imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tool5',
    nameDevanagari: 'चापुआ / भाथी (दोहरी लोहार धौंकनी)',
    nameRoman: 'Chapua / Bhati',
    category: 'forge',
    categoryHindi: 'लोहारशाला उपकरण (Blacksmith Forge)',
    useDescription: 'चमड़े और मिट्टी की नलियों से बनी प्राचीन संताली धौंकनी। लोहार के दोनों पैरों के वजन से बारी-बारी हवा फूंककर भट्ठी में 1200°C तक तापमान उत्पन्न किया जाता है।',
    forgingTechnique: 'बकरी या गाय के चमड़े को गोल ड्रमों पर मढ़ा जाता है और बांस की नलियों से भूमिगत भट्ठी में जोड़ा जाता है।',
    culturalNote: 'संताली लोकगीतों में लोहार की भाथी की सिसकारी को कर्म और जीवन की अनवरत सांसों से उपमित किया गया है।',
    dimensionsWeight: 'ऊंचाई: 40 सेमी · दोहरे ड्रम प्रणाली',
    imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tool6',
    nameDevanagari: 'खुरपी',
    nameRoman: 'Khurpi',
    category: 'farming',
    categoryHindi: 'निराई-गुड़ाई व वन-औषधि (Weeding & Herbs)',
    useDescription: 'खेतों में खरपतवार निकालने और जंगलों से दुर्लभ औषधीय कंद-मूल (रान-मुरगान) की जड़ें खोदकर निकालने का छोटा नुकीला औजार।',
    forgingTechnique: 'लचीले पतले लोहे से त्रिकोणीय या चौकोर फलक तैयार कर छोटे काष्ठ बेंट में जड़ा जाता है।',
    culturalNote: 'संताली जड़ी-बूटी वैद्य (ओझा व रानिकिया) हमेशा अपने झोले में एक सिद्ध खुरपी रखते हैं।',
    dimensionsWeight: 'लंबाई: 20 सेमी · भार: 150-250 ग्राम',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tool7',
    nameDevanagari: 'बर्च्छा (भाला)',
    nameRoman: 'Barchha',
    category: 'hunting',
    categoryHindi: 'शिकार व सेंदरा (Hunting Lance)',
    useDescription: 'लंबा बांस का डंडा जिसके अग्रभाग पर 1 फीट लंबा तीक्ष्ण लोहे का फलक जड़ा रहता है। दूर से वार करने और जंगली सूअर या भालू से सुरक्षा के लिए प्रयुक्त।',
    forgingTechnique: 'दोधारी तलवार जैसा लंबा नोकदार फलक तैयार कर अग्नि-ताप पर तपाया जाता है।',
    culturalNote: 'अयोध्या पहाड़ और लुगुबुरु सेंदरा में ग्राम दल के रक्षक बर्च्छा धारण करते हैं।',
    dimensionsWeight: 'कुल लंबाई: 6-7 फीट · फलक भार: 600 ग्राम',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tool8',
    nameDevanagari: 'लोहा सँड़सी व निहाई (Sadasi & Nihaei)',
    nameRoman: 'Sadasi & Nihaei',
    category: 'forge',
    categoryHindi: 'लोहारशाला उपकरण (Forge Tools)',
    useDescription: 'तपते लोहे को थामने वाली मजबूत लोहे की संड़सी और जिस भारी पत्थर या लोहे के ब्लॉक पर प्रहार किया जाता है, उसे निहाई कहते हैं।',
    forgingTechnique: 'अत्यंत सुदृढ़ ठोस लौह अयस्क से निर्मित जो हज़ारों हथौड़ों की चोट सहन कर सके।',
    culturalNote: 'कामार टोला में निहाई को विश्वकर्मा रूप में वंदनीय माना जाता है।',
    dimensionsWeight: 'निहाई भार: 20-50 किग्रा · सँड़सी लंबाई: 40-50 सेमी',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df57046475a?auto=format&fit=crop&w=600&q=80'
  }
];

export const SantaliBlacksmithyIronCraft: React.FC = () => {
  const { isAdmin } = useAdmin();
  const STORAGE_KEY = 'hor_katha_blacksmithy_db';

  const [tools, setTools] = useState<IronCraftTool[]>(() =>
    safeLoadFromStorage<IronCraftTool[]>(STORAGE_KEY, DEFAULT_IRON_TOOLS)
  );
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedTool, setSelectedTool] = useState<IronCraftTool>(tools[0] || DEFAULT_IRON_TOOLS[0]);

  // Admin Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<IronCraftTool | null>(null);
  const [formData, setFormData] = useState<Partial<IronCraftTool>>({});
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const saveTools = (updated: IronCraftTool[]) => {
    setTools(updated);
    safeSaveToStorage(STORAGE_KEY, updated);
    if (!updated.some((t) => t.id === selectedTool.id) && updated.length > 0) {
      setSelectedTool(updated[0]);
    }
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setFormData({
      id: `tool_${Date.now()}`,
      nameDevanagari: '',
      nameRoman: '',
      category: 'farming',
      categoryHindi: 'कृषि व फसल कटाई',
      useDescription: '',
      forgingTechnique: '',
      culturalNote: '',
      dimensionsWeight: 'भार: 500 ग्राम',
      imageUrl: 'https://images.unsplash.com/photo-1595878715977-2e8f8df18ea8?auto=format&fit=crop&w=600&q=80'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: IronCraftTool) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`क्या आप सचमुच "${name}" औजार को हटाना चाहते हैं?`)) {
      const updated = tools.filter((t) => t.id !== id);
      saveTools(updated);
      showNotification(`"${name}" औजार हटा दिया गया!`);
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameDevanagari || !formData.useDescription) {
      alert('कृपया औजार का नाम और उपयोग विवरण अवश्य भरें।');
      return;
    }

    if (editingItem) {
      const updated = tools.map((t) =>
        t.id === editingItem.id ? ({ ...t, ...formData } as IronCraftTool) : t
      );
      saveTools(updated);
      if (selectedTool.id === editingItem.id) {
        setSelectedTool({ ...selectedTool, ...formData } as IronCraftTool);
      }
      showNotification('औजार सफलतापूर्वक अपडेट हो गया!');
    } else {
      const newItem: IronCraftTool = {
        id: formData.id || `tool_${Date.now()}`,
        nameDevanagari: formData.nameDevanagari || '',
        nameRoman: formData.nameRoman || '',
        category: formData.category || 'farming',
        categoryHindi: formData.categoryHindi || 'कृषि',
        useDescription: formData.useDescription || '',
        forgingTechnique: formData.forgingTechnique || '',
        culturalNote: formData.culturalNote || '',
        dimensionsWeight: formData.dimensionsWeight || '500 ग्राम',
        imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1595878715977-2e8f8df18ea8?auto=format&fit=crop&w=600&q=80'
      };
      saveTools([newItem, ...tools]);
      setSelectedTool(newItem);
      showNotification('नया पारंपरिक औजार जुड़ गया!');
    }
    setIsModalOpen(false);
  };

  const handleResetToDefault = () => {
    if (confirm('क्या आप सचमुच सभी औजार फ़ैक्टरी डिफ़ॉल्ट पर रीसेट करना चाहते हैं?')) {
      saveTools(DEFAULT_IRON_TOOLS);
      setSelectedTool(DEFAULT_IRON_TOOLS[0]);
      showNotification('सभी औजार मूल स्वरूप में रीसेट हो गए!');
    }
  };

  const handleSpeak = (text: string) => {
    speakWithFemaleVoice(text, { lang: 'hi-IN', rate: 0.88 });
  };

  const filteredTools = tools.filter((tool) => {
    if (activeCategory === 'all') return true;
    return tool.category === activeCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {feedbackMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-700 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in slide-in-from-bottom">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-stone-900 via-amber-950 to-neutral-900 text-white p-6 md:p-8 shadow-xl relative overflow-hidden border border-amber-600/30">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-400/40 text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>कामार शिल्प व प्राचीन धातुकर्म · Indigenous Iron Smelting</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-amber-100 tracking-tight">
            संताली पारंपरिक लोहार शिल्प व हथियार (Iron Craft & Blacksmithy)
          </h1>

          <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-sans">
            दातरम (हँसिया), तांगा (कुल्हाड़ी), सार-फासी (तीर के फल) और प्राचीन धौंकनी भाथी—संताली और असुर जनजातियों की सहस्त्राब्दियों पुरानी लौह-प्रगलन तकनीक, जिसने जंग-रोधी औजार और स्वाधीनता संग्राम के शस्त्र गढ़े।
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-amber-300">
            <span className="flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{tools.length} प्रमुख पारंपरिक लौह औजार</span>
            </span>
            <span>•</span>
            <span>देशी कुटी भट्ठी व धौंकनी तकनीक</span>

            {isAdmin && (
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={handleAddNew}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-transform hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  <span>नया औजार जोड़ें (Add Tool)</span>
                </button>
                <button
                  onClick={handleResetToDefault}
                  className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-amber-200 font-bold text-xs flex items-center gap-1.5 border border-white/20 cursor-pointer"
                  title="डिफ़ॉल्ट पर रीसेट करें"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>रीसेट</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        {[
          { id: 'all', label: 'समस्त औजार (All 8)' },
          { id: 'farming', label: '🌾 कृषि व फसल (Agriculture)' },
          { id: 'hunting', label: '🏹 तीर-धनुष व शिकार (Hunting & Hul)' },
          { id: 'woodcutting', label: '🪓 वन व काष्ठ (Woodcraft)' },
          { id: 'forge', label: '🔥 लोहारशाला उपकरण (Forge & Bellows)' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2 rounded-xl shrink-0 font-bold transition-all cursor-pointer ${
              activeCategory === tab.id
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Grid + Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: List of Tools */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredTools.map((tool) => {
            const isSelected = selectedTool.id === tool.id;
            return (
              <div
                key={tool.id}
                onClick={() => setSelectedTool(tool)}
                className={`rounded-2xl p-4 transition-all cursor-pointer border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-50/80 border-amber-500 shadow-md ring-2 ring-amber-400/40'
                    : 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-100 text-stone-800">
                      {tool.categoryHindi.split('(')[0]}
                    </span>
                    <span className="text-[10px] font-mono font-medium text-amber-700">
                      {tool.nameRoman}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900">
                    {tool.nameDevanagari}
                  </h3>

                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {tool.useDescription}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono">
                    {tool.dimensionsWeight.split('·')[0]}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeak(`${tool.nameDevanagari}. ${tool.useDescription}`);
                      }}
                      className="p-1 text-slate-500 hover:text-amber-700 rounded-md cursor-pointer"
                      title="सुनें"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    {isAdmin && (
                      <div className="flex items-center gap-0.5 ml-1 pl-1 border-l border-slate-200">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(tool);
                          }}
                          className="p-1 text-amber-700 hover:text-amber-900 rounded-md cursor-pointer"
                          title="संपादित करें (Admin Edit)"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(tool.id, tool.nameDevanagari);
                          }}
                          className="p-1 text-rose-600 hover:text-rose-800 rounded-md cursor-pointer"
                          title="हटाएं (Admin Delete)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Deep Tool Viewer */}
        <div className="lg:col-span-5 sticky top-4 bg-white rounded-3xl border border-amber-300/80 p-5 md:p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-amber-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                लौह शिल्प विवरण · Tool Spotlight
              </span>
              <h2 className="text-xl font-black text-slate-900">
                {selectedTool.nameDevanagari} ({selectedTool.nameRoman})
              </h2>
            </div>

            <button
              onClick={() => handleSpeak(`${selectedTool.nameDevanagari}. उपयोग: ${selectedTool.useDescription}. निर्माण विधि: ${selectedTool.forgingTechnique}. सांस्कृतिक महत्व: ${selectedTool.culturalNote}`)}
              className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>ऑडियो सुनें</span>
            </button>
          </div>

          {/* Image */}
          <div className="w-full h-48 rounded-2xl overflow-hidden bg-slate-950 relative border border-slate-200">
            <img decoding="async" loading="lazy"
              src={selectedTool.imageUrl}
              alt={selectedTool.nameDevanagari}
              className="w-full h-full object-cover filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-2.5 left-3 right-3 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wide bg-orange-600 text-white px-2 py-0.5 rounded">
                वर्ग: {selectedTool.categoryHindi}
              </span>
              <p className="text-xs font-semibold text-amber-200 mt-1">
                माप व भार: {selectedTool.dimensionsWeight}
              </p>
            </div>
          </div>

          {/* Use Description */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
              <Hammer className="w-3.5 h-3.5 text-amber-600" />
              <span>कार्य व उपयोग:</span>
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed bg-amber-50/60 p-3 rounded-xl border border-amber-200/60">
              {selectedTool.useDescription}
            </p>
          </div>

          {/* Forging Technique */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-600" />
              <span>लोहार भट्ठी निर्माण विधि (Forging Craft):</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedTool.forgingTechnique}
            </p>
          </div>

          {/* Cultural Significance */}
          <div className="space-y-1 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>सांस्कृतिक व ऐतिहासिक महत्व:</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              {selectedTool.culturalNote}
            </p>
          </div>
        </div>
      </div>
      {/* Admin CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-amber-300 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-black text-slate-900">
                  {editingItem ? 'लौह औजार संपादित करें (Edit Tool)' : 'नया पारंपरिक लौह औजार जोड़ें (Add Tool)'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    औजार नाम (देवनागरी) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nameDevanagari || ''}
                    onChange={(e) => setFormData({ ...formData, nameDevanagari: e.target.value })}
                    placeholder="उदा: दातरम (हँसिया)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    औजार नाम (Roman Script)
                  </label>
                  <input
                    type="text"
                    value={formData.nameRoman || ''}
                    onChange={(e) => setFormData({ ...formData, nameRoman: e.target.value })}
                    placeholder="उदा: Datrom / Tanga"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    श्रेणी (Category)
                  </label>
                  <select
                    value={formData.category || 'farming'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-800"
                  >
                    <option value="farming">🌾 कृषि व फसल (Farming)</option>
                    <option value="hunting">🏹 तीर-धनुष व शिकार (Hunting/Hul)</option>
                    <option value="woodcutting">🪓 वन व काष्ठ कटाई (Woodcutting)</option>
                    <option value="forge">⚒️ लोहार भट्ठी औजार (Forge Tools)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    आकार व भार (Dimensions/Weight)
                  </label>
                  <input
                    type="text"
                    value={formData.dimensionsWeight || ''}
                    onChange={(e) => setFormData({ ...formData, dimensionsWeight: e.target.value })}
                    placeholder="उदा: भार: 300-500 ग्राम"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  कार्य व उपयोग विवरण (Use Description) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.useDescription || ''}
                  onChange={(e) => setFormData({ ...formData, useDescription: e.target.value })}
                  placeholder="धान, बाजरा, मक्का और घासों की कटाई के लिए..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  लोहार भट्ठी निर्माण विधि (Forging Technique)
                </label>
                <textarea
                  rows={2}
                  value={formData.forgingTechnique || ''}
                  onChange={(e) => setFormData({ ...formData, forgingTechnique: e.target.value })}
                  placeholder="उच्च कार्बन लोहे को लाल गर्म कर पतली धार में पीटा जाता है..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  सांस्कृतिक व ऐतिहासिक महत्व (Cultural Significance)
                </label>
                <textarea
                  rows={2}
                  value={formData.culturalNote || ''}
                  onChange={(e) => setFormData({ ...formData, culturalNote: e.target.value })}
                  placeholder="सोहराय पर्व के दौरान हल और दातरम की पूजा की जाती है..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  तस्वीर URL (Image URL)
                </label>
                <input
                  type="url"
                  value={formData.imageUrl || ''}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
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
