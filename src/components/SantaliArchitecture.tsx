import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  Home,
  Layers,
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
  TreePine,
  Sun,
  Shield,
  Info
} from 'lucide-react';

export interface ArchitectureSection {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  titleHindi: string;
  category: 'core_living' | 'sacred_inner' | 'outdoor_courtyard' | 'utility_livestock';
  categoryLabel: string;
  constructionMaterial: string;
  culturalSignificance: string;
  ecoFeature: string;
  sacredRules?: string;
  badge: string;
}

export const DEFAULT_ARCHITECTURE_SECTIONS: ArchitectureSection[] = [
  {
    id: 'arch_pinda',
    nameDevanagari: 'पिंडा (Pinda)',
    nameRoman: 'Pinda',
    titleHindi: 'बैठक का ऊंचा स्वच्छ चबूतरा व बरामदा',
    category: 'core_living',
    categoryLabel: 'मुख्य आवास अंग',
    constructionMaterial: 'कच्ची मिट्टी, गोबर-जल (गुरीच्) का लेप, चिकनी लाल-सफेद माटी',
    culturalSignificance: 'घर में आने वाले अतिथियों का प्रथम स्वागत पिंडा पर होता है। यहां बैठकर घर के बुजुर्ग हुक्का पीते हैं, बातचीत करते हैं और बच्चे कहानियां सुनते हैं।',
    ecoFeature: 'जमीन से 2-3 फीट ऊंचा होने के कारण वर्षा के जलभराव, सीलन और कीट-पतंगों से घर को पूर्ण सुरक्षा देता है।',
    sacredRules: 'पिंडा पर जूता-चप्पल पहनकर चढ़ना वर्जित है, प्रतिदिन सुबह महिलाएं इस पर ताजे गोबर का छिड़काव करती हैं।',
    badge: 'अतिथि सत्कार'
  },
  {
    id: 'arch_bhitar_orak',
    nameDevanagari: 'भीतर ओड़ाक् (Bhitar Orak)',
    nameRoman: "Bhitar Orak'",
    titleHindi: 'ओड़ाक् बोंगा व कुल-पूर्वजों का पावन आंतरिक कक्ष',
    category: 'sacred_inner',
    categoryLabel: 'पवित्र देवालय अंग',
    constructionMaterial: 'मोटी मिट्टी की दीवारें, साल की लकड़ी के खंभे, बिना खिड़की का शांत कक्ष',
    culturalSignificance: 'संताली घर का सबसे पवित्र स्थल जहां कुलदेवता (ओड़ाक् बोंगा) और पूर्वज (हापड़ाव को) का वास माना जाता है। नए अन्न का पहला भोग यहीं अर्पित होता है।',
    ecoFeature: 'प्राकृतिक रूप से अत्यंत शांत, अंधेरा और वर्षभर स्थिर तापमान बनाए रखने वाला कक्ष।',
    sacredRules: 'इस कक्ष में परिवार के सदस्यों के अतिरिक्त किसी भी बाहरी व्यक्ति या अन्य गोत्र की विवाहित बेटी का प्रवेश पूर्णतः निषेध होता है।',
    badge: 'परम पवित्र'
  },
  {
    id: 'arch_kulhi',
    nameDevanagari: 'कुलही (Kulhi)',
    nameRoman: 'Kulhi',
    titleHindi: 'गांव की चौड़ी, स्वच्छ मुख्य वीथी व सामाजिक गलियारा',
    category: 'outdoor_courtyard',
    categoryLabel: 'सामुदायिक विन्यास',
    constructionMaterial: 'प्राकृतिक समतल भूमि, दोनों ओर सुंदर मिट्टी की दीवारें व छायादार नीम-महुआ वृक्ष',
    culturalSignificance: 'संताली गांव की जीवन-रेखा। कुलही के दोनों ओर कतारबद्ध घर होते हैं। सोहराय, बाहा और विवाह के समय पूरा गांव कुलही में मिलकर नाचता-गाता है।',
    ecoFeature: 'पर्याप्त चौड़ाई के कारण सूर्य का प्रकाश और हवा हर घर तक निर्बाध पहुंचती है।',
    sacredRules: 'कुलही दुरुप (ग्राम सभा) का आयोजन यहीं मांझी हाड़ाम के नेतृत्व में होता है। यहां गंदगी फैलाना अपराध माना जाता है।',
    badge: 'सामुदायिक वीथी'
  },
  {
    id: 'arch_rachah',
    nameDevanagari: 'रचाह् (Rachah)',
    nameRoman: 'Rachah',
    titleHindi: 'स्वच्छ आंतरिक खुला आंगन',
    category: 'outdoor_courtyard',
    categoryLabel: 'आंगन व खुला क्षेत्र',
    constructionMaterial: 'कच्ची मिट्टी का समतल प्रांगण, गोबर की लिपाई',
    culturalSignificance: 'परिवार की महिलाओं का मुख्य कार्यस्थल। धान, मड़ुआ और दालों को सुखाने, बच्चों के खेलने और चांदनी रातों में सोने का खुला स्थान।',
    ecoFeature: 'घर के बीचों-बीच प्राकृतिक वेंटिलेशन और सौर ऊर्जा का सर्वोत्तम उपयोग।',
    sacredRules: 'प्रतिदिन सूर्योदय से पूर्व आंगन की सफाई कर पवित्र जल छिड़का जाता है।',
    badge: 'पारिवारिक आंगन'
  },
  {
    id: 'arch_duar',
    nameDevanagari: 'दुआर व खूंटी (Duar ar Khunti)',
    nameRoman: "Duar ar Khunti",
    titleHindi: 'मुख्य प्रवेश द्वार, चौखट व साल के मजबूत खंभे',
    category: 'core_living',
    categoryLabel: 'मुख्य आवास अंग',
    constructionMaterial: 'सारजोम (साल) या करंज की नक्काशीदार लकड़ी, लोहे के हस्तनिर्मित कब्जे',
    culturalSignificance: 'दुआर पर पावन सोहराय भित्तिचित्र और धान की बालियों के तोरण बांधे जाते हैं। यह घर की कुल मर्यादा की सीमा है।',
    ecoFeature: 'साल की लकड़ी दीमक-रोधी और सदियों तक बिना सड़े मजबूत बनी रहती है।',
    sacredRules: 'विवाह में वर-वधू का स्वागत और मृत्यु संस्कार में शव यात्रा का प्रस्थान दुआर पर ही संपन्न होता है।',
    badge: 'प्रवेश द्वार'
  },
  {
    id: 'arch_gohal',
    nameDevanagari: 'गौहाल / डांगरा ओड़ाक् (Gohal)',
    nameRoman: "Gohal / Dangra Orak'",
    titleHindi: 'पशुधन (बैल, गाय व भैंस) की सुरक्षित शाला',
    category: 'utility_livestock',
    categoryLabel: 'पशुधन व भंडार',
    constructionMaterial: 'बांस की जालीदार दीवारें, हवादार छप्पर, मिट्टी का फर्श',
    culturalSignificance: 'संताली समाज पशुधन को परिवार का सदस्य मानता है। सोहराय पर्व के दूसरे दिन (गोठ पूजा) गौहाल को फूलों व दीपक से सजाया जाता है।',
    ecoFeature: 'उत्तम वायु संचार जिससे पशु स्वस्थ रहते हैं और मवेशियों के गोबर-मूत्र से जैविक खाद एकत्र होती है।',
    sacredRules: 'गौहाल में पशुओं को कभी पैर से नहीं मारा जाता, यह महापाप माना जाता है।',
    badge: 'पशुधन शाला'
  },
  {
    id: 'arch_bandi_kothi',
    nameDevanagari: 'बांदी व हुरु कोठी (Bandi Grain Silo)',
    nameRoman: 'Bandi ar Kothi',
    titleHindi: 'पुआल की रस्सियों से बुना गोल धान्य भंडार',
    category: 'utility_livestock',
    categoryLabel: 'पशुधन व भंडार',
    constructionMaterial: 'धान के पुआल की मजबूत मोटी रस्सियां (पोड़ा), बांस की टोकरियां',
    culturalSignificance: 'संतालों का प्राचीनतम अनाज भंडारण तंत्र। धान को पुआल की परत में कसकर गोल गेंद की तरह बांधा जाता है।',
    ecoFeature: 'अनाज में न तो नमी आती है और न ही घुन या कीड़े लगते हैं। बिना किसी रसायन के वर्षों तक अनाज सुरक्षित रहता है।',
    sacredRules: 'बांदी से पहला धान निकालते समय अन्नपूर्णा जाहेर एरा का स्मरण किया जाता है।',
    badge: 'प्राकृतिक भंडार'
  },
  {
    id: 'arch_dhenki_gora',
    nameDevanagari: 'ढेंकी गोड़ा (Dhenki Gora)',
    nameRoman: 'Dhenki Gora',
    titleHindi: 'पारंपरिक काष्ठ ढेंकी से धान कुटाई कक्ष',
    category: 'utility_livestock',
    categoryLabel: 'पशुधन व भंडार',
    constructionMaterial: 'भारी महुआ या शीशम की लकड़ी का भारी मूसल, पाषाण ओखली',
    culturalSignificance: 'त्योहारों में जिल पीठा, अरवा चावल और चूड़ा कूटने का केंद्र। ढेंकी की लयबद्ध धमक के साथ महिलाएं गीत गाती हैं।',
    ecoFeature: 'शून्य बिजली खपत और अनाज के पौष्टिक पोषक तत्वों व छिलकों का संपूर्ण संरक्षण।',
    sacredRules: 'ढेंकी पर कभी भी पैर नहीं रखा जाता, इसे अन्नदात्री का आसन माना जाता है।',
    badge: 'काष्ठ यंत्र'
  }
];

export const SantaliArchitecture: React.FC = () => {
  const { isAdmin } = useAdmin();
  const STORAGE_KEY = 'hor_katha_architecture_db';

  const [sections, setSections] = useState<ArchitectureSection[]>(() => {
    return safeLoadFromStorage(STORAGE_KEY, DEFAULT_ARCHITECTURE_SECTIONS);
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSection, setSelectedSection] = useState<ArchitectureSection>(sections[0]);

  // Admin Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<ArchitectureSection | null>(null);
  const [formData, setFormData] = useState<Partial<ArchitectureSection>>({});

  const saveSections = (updated: ArchitectureSection[]) => {
    setSections(updated);
    safeSaveToStorage(STORAGE_KEY, updated);
  };

  // Admin Actions
  const handleAddNew = () => {
    setEditingSection(null);
    setFormData({
      id: `arch_${Date.now()}`,
      nameDevanagari: '',
      nameRoman: '',
      titleHindi: '',
      category: 'core_living',
      categoryLabel: 'मुख्य आवास अंग',
      constructionMaterial: '',
      culturalSignificance: '',
      ecoFeature: '',
      sacredRules: '',
      badge: 'वास्तु'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (section: ArchitectureSection) => {
    setEditingSection(section);
    setFormData(section);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('क्या आप सचमुच इस वास्तु प्रविष्टि को हटाना चाहते हैं?')) {
      const updated = sections.filter((s) => s.id !== id);
      saveSections(updated);
      if (selectedSection?.id === id) {
        setSelectedSection(updated[0] || null);
      }
    }
  };

  const handleResetToDefault = () => {
    if (confirm('डिफ़ॉल्ट पारंपरिक वास्तु डेटा रीसेट करें?')) {
      saveSections(DEFAULT_ARCHITECTURE_SECTIONS);
      setSelectedSection(DEFAULT_ARCHITECTURE_SECTIONS[0]);
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameDevanagari || !formData.titleHindi) return;

    const categoryLabels: Record<string, string> = {
      core_living: 'मुख्य आवास अंग',
      sacred_inner: 'पवित्र देवालय अंग',
      outdoor_courtyard: 'आंगन व सामुदायिक वीथी',
      utility_livestock: 'पशुधन व अन्न भंडार'
    };

    const readyItem: ArchitectureSection = {
      id: editingSection ? editingSection.id : `arch_${Date.now()}`,
      nameDevanagari: formData.nameDevanagari || '',
      nameRoman: formData.nameRoman || '',
      titleHindi: formData.titleHindi || '',
      category: (formData.category || 'core_living') as any,
      categoryLabel: categoryLabels[formData.category || 'core_living'] || 'वास्तु अंग',
      constructionMaterial: formData.constructionMaterial || '',
      culturalSignificance: formData.culturalSignificance || '',
      ecoFeature: formData.ecoFeature || '',
      sacredRules: formData.sacredRules || '',
      badge: formData.badge || 'वास्तु अंग'
    };

    if (editingSection) {
      const updated = sections.map((s) => (s.id === editingSection.id ? readyItem : s));
      saveSections(updated);
      setSelectedSection(readyItem);
    } else {
      saveSections([readyItem, ...sections]);
      setSelectedSection(readyItem);
    }
    setIsModalOpen(false);
  };

  const filteredSections = sections.filter((s) => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-md border border-stone-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold backdrop-blur-xs border border-amber-400/30">
              <Home className="w-3.5 h-3.5" />
              <span>पारंपरिक आदिवासी पर्यावरण-अनुकूल वास्तुकला (Indigenous Eco-Architecture)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-amber-50">
              संताली पारंपरिक वास्तु, आवास-शैली व ओड़ाक् विन्यास
            </h1>
            <p className="text-sm text-amber-200/90 max-w-2xl leading-relaxed">
              मिट्टी की मोटी दीवारों, सारजोम (साल) के खंभों, पुआल-खपड़ा और गोबर-जल लिपाई से निर्मित प्राकृतिक वातानुकूलित व भूकंप-रोधी आवास — कुलही से लेकर भीतर ओड़ाक् और बांदी तक।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => speakWithFemaleVoice('संताली पारंपरिक वास्तु, आवास-शैली व ओड़ाक् विन्यास')}
              className="px-3.5 py-2 bg-stone-800/80 hover:bg-stone-700 border border-stone-600/40 text-amber-100 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Volume2 className="w-4 h-4 text-amber-300" />
              <span>ऑडियो गाइड</span>
            </button>
            {isAdmin && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddNew}
                  className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>नया वास्तु अंग जोड़ें</span>
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

      {/* Blueprint Visualizer Layout: Left List Cards, Right Deep Knowledge Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Categories & Items Grid (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: 'सभी अंग' },
                { id: 'core_living', label: 'पिंडा व दुआर (मुख्य)' },
                { id: 'sacred_inner', label: 'भीतर ओड़ाक् (पवित्र)' },
                { id: 'outdoor_courtyard', label: 'कुलही व आंगन' },
                { id: 'utility_livestock', label: 'गौहाल व अन्न कोठी' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === c.id
                      ? 'bg-amber-900 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {isAdmin && (
              <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300">
                एडमिन मोड सक्रिय
              </span>
            )}
          </div>

          {/* Cards List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredSections.map((item) => {
              const isSelected = selectedSection?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedSection(item)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-amber-50/80 border-amber-600 shadow-sm ring-2 ring-amber-500/20'
                      : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                        {item.badge}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakWithFemaleVoice(item.nameDevanagari);
                        }}
                        className="p-1 rounded text-slate-400 hover:text-amber-800 hover:bg-amber-100 transition-colors"
                        title="उच्चारण"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <h4 className="text-base font-black text-slate-900 group-hover:text-amber-900 transition-colors">
                        {item.nameDevanagari}
                      </h4>
                      <p className="text-xs font-bold text-amber-800">{item.nameRoman}</p>
                      <p className="text-[11px] text-slate-500 font-semibold">{item.titleHindi}</p>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.culturalSignificance}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-stone-600 font-medium truncate max-w-[130px]">
                      {item.categoryLabel}
                    </span>

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
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Blueprint Showcase (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {selectedSection && (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-4 sticky top-24">
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                    {selectedSection.badge}
                  </span>
                  <h2 className="text-xl font-black text-slate-900 mt-1">
                    {selectedSection.nameDevanagari}
                  </h2>
                  <p className="text-xs font-bold text-amber-800">
                    {selectedSection.nameRoman} ({selectedSection.titleHindi})
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => speakWithFemaleVoice(`${selectedSection.nameDevanagari}. ${selectedSection.culturalSignificance}`)}
                    className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 transition-all cursor-pointer shadow-xs"
                    title="उच्चारण व विवरण सुनें"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => handleEdit(selectedSection)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
                      title="एडमिन संपादन"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Cultural Significance */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" /> सामाजिक व सांस्कृतिक महत्व
                </span>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  {selectedSection.culturalSignificance}
                </p>
              </div>

              {/* Construction Materials */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-stone-600 uppercase flex items-center gap-1">
                  <TreePine className="w-3.5 h-3.5 text-amber-800" /> पारंपरिक निर्माण सामग्री
                </span>
                <p className="text-xs text-stone-800 bg-amber-50/60 p-3 rounded-2xl border border-amber-200/80 font-semibold">
                  {selectedSection.constructionMaterial}
                </p>
              </div>

              {/* Eco Features */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-emerald-900 uppercase flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-emerald-700" /> पर्यावरण-अनुकूल विशेषता (Eco Science)
                </span>
                <p className="text-xs text-emerald-950 bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100">
                  {selectedSection.ecoFeature}
                </p>
              </div>

              {/* Sacred Taboos / Rules */}
              {selectedSection.sacredRules && (
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-rose-900 uppercase flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-rose-700" /> पारंपरिक नियम व मर्यादा
                  </span>
                  <p className="text-xs text-rose-950 bg-rose-50/50 p-3 rounded-2xl border border-rose-100">
                    {selectedSection.sacredRules}
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
                <ShieldCheck className="w-5 h-5 text-amber-700" />
                <h3 className="text-base font-black text-slate-900">
                  {editingSection ? 'वास्तु अंग संपादित करें' : 'नया वास्तु अंग जोड़ें'}
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
                    placeholder="उदा. पिंडा (Pinda)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">नाम (Roman Script)</label>
                  <input
                    type="text"
                    value={formData.nameRoman || ''}
                    onChange={(e) => setFormData({ ...formData, nameRoman: e.target.value })}
                    placeholder="e.g. Pinda"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
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
                    placeholder="उदा. बैठक का ऊंचा चबूतरा"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">श्रेणी (Category)</label>
                  <select
                    value={formData.category || 'core_living'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                  >
                    <option value="core_living">मुख्य आवास अंग (पिंडा/दुआर)</option>
                    <option value="sacred_inner">पवित्र देवालय (भीतर ओड़ाक्)</option>
                    <option value="outdoor_courtyard">आंगन व कुलही (खुला क्षेत्र)</option>
                    <option value="utility_livestock">पशुधन व भंडार (गौहाल/बांदी)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">निर्माण सामग्री (Materials Used)</label>
                <input
                  type="text"
                  value={formData.constructionMaterial || ''}
                  onChange={(e) => setFormData({ ...formData, constructionMaterial: e.target.value })}
                  placeholder="उदा. साल के खंभे, मिट्टी व गोबर की लिपाई..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">सांस्कृतिक व सामाजिक महत्व</label>
                <textarea
                  rows={2}
                  required
                  value={formData.culturalSignificance || ''}
                  onChange={(e) => setFormData({ ...formData, culturalSignificance: e.target.value })}
                  placeholder="परिवार और समाज में इसका क्या महत्व है..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">पर्यावरण-अनुकूल विशेषता (Eco Feature)</label>
                <input
                  type="text"
                  value={formData.ecoFeature || ''}
                  onChange={(e) => setFormData({ ...formData, ecoFeature: e.target.value })}
                  placeholder="उदा. प्राकृतिक ठंडक, वर्षा से सुरक्षा..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">धार्मिक नियम व मर्यादा (Sacred Rules)</label>
                <input
                  type="text"
                  value={formData.sacredRules || ''}
                  onChange={(e) => setFormData({ ...formData, sacredRules: e.target.value })}
                  placeholder="उदा. बाहरी लोगों का प्रवेश निषेध..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
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
                  className="px-5 py-2 bg-amber-800 hover:bg-amber-700 text-white rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
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
