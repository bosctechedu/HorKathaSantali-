import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  SunMedium,
  CloudRain,
  Sprout,
  Wheat,
  RotateCcw,
  Volume2,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Info,
  Calendar,
  Compass,
  Sparkles,
  Search
} from 'lucide-react';

export interface AgriItem {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  titleHindi: string;
  section: 'seasons' | 'seeds' | 'weather' | 'tools';
  periodOrSeason?: string;
  description: string;
  significance: string;
  traditionalPractice?: string;
  badge: string;
}

export const DEFAULT_AGRI_ITEMS: AgriItem[] = [
  // 1. Seasons & Nakshatra
  {
    id: 'season_rohini',
    nameDevanagari: 'रोहिणी एरा (धुरिया एरा)',
    nameRoman: 'Rohini Era (Dhuriya Era)',
    titleHindi: 'रोहिणी नक्षत्र में सूखी मिट्टी में बीज बोवनी',
    section: 'seasons',
    periodOrSeason: 'जेठ माह (मई-जून)',
    description: 'संताली कृषि पंचांग का सबसे पवित्र दिन रोहिणी नक्षत्र का पहला दिन माना जाता है। इस दिन बिना हल चलाए खेतों में हाथ से बीज (धुरिया बीहन) छींटकर कृषि वर्ष का शुभारंभ होता है।',
    significance: 'रोहिणी में बोया गया धान अत्यधिक मजबूत और कीट-प्रतिरोधी माना जाता है। गांव के नायके जाहेर थान में पूजा करते हैं।',
    traditionalPractice: 'रोहिणी के दिन गांव में किसी को भी खेत जोतने या धरती को आघात पहुंचाने की मनाही होती है, केवल हाथ से बीज बोए जाते हैं।',
    badge: 'कृषि नववर्ष'
  },
  {
    id: 'season_ashadh_ropa',
    nameDevanagari: 'आषाढ़ रोपा व हेरोः सेरेञ',
    nameRoman: 'Ashadh Ropa ar Heroh Serenj',
    titleHindi: 'धान की रोपाई व महिलाओं का सामूहिक श्रम गीत',
    section: 'seasons',
    periodOrSeason: 'आषाढ़ - सावन (जुलाई-अगस्त)',
    description: 'खेतों में घुटने तक पानी भर जाने पर संताली महिलाएं कतारबद्ध होकर धान के बिचड़ों की रोपाई करती हैं और सुरीली हेरोः सेरेञ गाती हैं, जिससे रोपाई की थकान का पता नहीं चलता।',
    significance: 'सामूहिक समरसता और प्रकृति से समन्वय का अद्भुत दृश्य।',
    traditionalPractice: 'रोपाई पूर्ण होने पर हेरोः पर्व मनाया जाता है और जाहेर थान में बलि चढ़ाकर हरियाली की रक्षा की प्रार्थना होती है।',
    badge: 'रोपाई पर्व'
  },
  {
    id: 'season_ir_am_harvest',
    nameDevanagari: 'इर-अम व सोहराय',
    nameRoman: 'Ir-Am ar Sohrai',
    titleHindi: 'धान कटाई, खलिहान (खराय) व सोहराय उत्सव',
    section: 'seasons',
    periodOrSeason: 'कार्तिक - अगहन (नवंबर-दिसंबर)',
    description: 'स्वर्ण धान की बालियों को दात्रोम (हँसुआ) से काटा जाता है। खलिहान (खराय) में बैलों की मदद से मड़ाई (दांवरी) कर अन्न कोठी में भरा जाता है।',
    significance: 'वर्षभर के श्रम की परिणति और पशुधन के प्रति कृतज्ञता प्रकट करने वाला सोहराय महापर्व।',
    traditionalPractice: 'नई फसल का पहला भात और हंडिया पूर्वजों (हापड़ाव को) और जाहेर एरा को चढ़ाया जाता है।',
    badge: 'फसल कटाई'
  },
  // 2. Indigenous Seeds
  {
    id: 'seed_karhani',
    nameDevanagari: 'करहनी धान (काला औषधीय धान)',
    nameRoman: 'Karhani Horo',
    titleHindi: 'प्राकृतिक लौह तत्व व एंटीऑक्सीडेंट से भरपूर देशी काला चावल',
    section: 'seeds',
    periodOrSeason: '120-130 दिन की अवधि',
    description: 'काले छिलके और बैंगनी-काले दाने वाला यह अत्यंत प्राचीन संताली धान है। इसमें प्रचुर मात्रा में आयरन, जिंक और प्रतिरोधक क्षमता बढ़ाने वाले तत्व पाए जाते हैं।',
    significance: 'प्रसव के बाद माताओं को शक्ति देने तथा रक्त की कमी दूर करने हेतु संताली बैद्य इस चावल का मांड पिलाते हैं।',
    traditionalPractice: 'रासायनिक खाद और कीटनाशकों के बिना केवल जैविक देशी गोबर खाद पर लहलहाता है।',
    badge: 'औषधीय धान'
  },
  {
    id: 'seed_kanakchur',
    nameDevanagari: 'कनकचूर व बादशाहभोग',
    nameRoman: 'Kanakchur ar Badshahbhog',
    titleHindi: 'अत्यंत सुगंधित, महीन व पावन अरवा चावल',
    section: 'seeds',
    periodOrSeason: '140-150 दिन की देर से पकने वाली किस्म',
    description: 'छोटे-छोटे मोतियों जैसे सुगंधित दानों वाला यह धान जाहेर थान की पूजा, बापला (विवाह) और विशेष पर्वों में खीर व पीठा बनाने के काम आता है।',
    significance: 'संताली समाज में देवताओं और पूर्वजों को भोग लगाने के लिए कनकचूर का ही अरवा चावल चुना जाता है।',
    traditionalPractice: 'पवित्र तालाबों के निचले ढलानों (बायद खेत) में सुरक्षित रूप से उगाया जाता है।',
    badge: 'सुगंधित पूजा धान'
  },
  {
    id: 'seed_bhutmuri',
    nameDevanagari: 'भूतमुड़ी व साठी धान',
    nameRoman: 'Bhutmuri ar Sathi Horo',
    titleHindi: 'सूखा-प्रतिरोधी व 60 दिन में पकने वाला मोटा लाल चावल',
    section: 'seeds',
    periodOrSeason: '60 से 75 दिन (द्रुत गति)',
    description: 'ऊंचे डांड़ खेतों (टांड़ जमीन) में कम वर्षा में भी लहलहाने वाला सूखा-प्रतिरोधी देशी धान। इसके लाल दाने अत्यंत सुपाच्य और रेशेदार होते हैं।',
    significance: 'अकाल और सूखे के वर्षों में संताली परिवारों को भुखमरी से बचाने वाला जीवन-रक्षक धान।',
    traditionalPractice: 'रोहिणी नक्षत्र में सीधी बुआई कर केवल मानसूनी फुहारों से पककर तैयार हो जाता है।',
    badge: 'सूखा-रोधी'
  },
  {
    id: 'seed_gundli_janhe',
    nameDevanagari: 'गुंदली व जनहे (लघु धान्य)',
    nameRoman: 'Gundli ar Janhe',
    titleHindi: 'पौष्टिक देशी मिलेट्स (मोटा अनाज)',
    section: 'seeds',
    periodOrSeason: 'भादो माह में पहली फसल',
    description: 'छोटे-छोटे दानों वाले देशी संताली मिलेट्स। यह भादो के महीने में जब पिछले वर्ष का धान खत्म होने लगता है, तब सबसे पहले कटकर भोजन का सहारा बनते हैं।',
    significance: 'उच्च फाइबर, कैल्शियम और शून्य ग्लाइसेमिक इंडेक्स से भरपूर आदिवासी सुपरफूड।',
    traditionalPractice: 'गुंदली की खिचड़ी और पीठा बनाकर वर्षा ऋतु में शक्ति संवर्धन हेतु खाया जाता है।',
    badge: 'देशी मिलेट्स'
  },
  // 3. Weather Prediction Signs
  {
    id: 'weather_ants',
    nameDevanagari: 'मुज कोवाः तुका (चींटियों का अंडा वहन)',
    nameRoman: 'Muj kowa tuka',
    titleHindi: 'चींटियों द्वारा कतारबद्ध होकर अंडों को ऊंचे स्थानों पर ले जाना',
    section: 'weather',
    periodOrSeason: 'प्री-मानसून (मई-जून)',
    description: 'जब लाल व काली चींटियां जमीन के बिलों से अपने सफेद अंडों को मुंह में दबाकर ऊंचे पेड़ों या घरों की दीवारों पर ले जाने लगें, तो 24-48 घंटों के भीतर मूसलाधार बारिश निश्चित है।',
    significance: 'हवा में नमी और वायुमंडलीय दबाव में सूक्ष्म परिवर्तन को चींटियां मनुष्यों से बहुत पहले भांप लेती हैं।',
    traditionalPractice: 'चींटियों की यह गति देखकर किसान खेतों की मेड़ें बांधना और बीज तैयार करना तुरंत तेज कर देते हैं।',
    badge: 'भारी वर्षा सूचक'
  },
  {
    id: 'weather_titihari',
    nameDevanagari: 'चेड़े तुका (टिटहरी पक्षी का अंडा संकेत)',
    nameRoman: 'Chende Tuka',
    titleHindi: 'टिटहरी का खेतों की मेड़ों पर ऊपर या नीचे अंडा देना',
    section: 'weather',
    periodOrSeason: 'ग्रीष्म - प्रारंभिक वर्षा',
    description: 'यदि टिटहरी खेत की सबसे ऊंची मेड़ पर अंडा देती है तो उस वर्ष अत्यधिक वर्षा और बाढ़ का संकेत होता है। यदि निचले स्थान पर अंडा दे, तो औसत या कम वर्षा का अनुमान लगाया जाता है।',
    significance: 'आदिवासी पुरखों का सदियों पुराना प्राकृतिक मौसम पूर्वानुमान विज्ञान।',
    traditionalPractice: 'इसके आधार पर किसान तय करते हैं कि निचले बायद खेत में धान लगाना है या ऊंचे टांड़ में।',
    badge: 'मानसून स्तर सूचक'
  },
  {
    id: 'weather_jamun_mahua',
    nameDevanagari: 'कुदुम दारे व मात्कोम बाहा (जामुन व महुआ संकेत)',
    nameRoman: 'Kudum ar Matkom Baha',
    titleHindi: 'जामुन और महुआ के पेड़ों में अत्यधिक फल-फूल लगना',
    section: 'weather',
    periodOrSeason: 'चैत - बैसाख',
    description: 'यदि जामुन के पेड़ों पर अत्यधिक काले फल लद जाएं और महुआ का फूल प्रचुर मात्रा में गिरे, तो संताली मान्यता अनुसार उस वर्ष धान की बंपर पैदावार होगी।',
    significance: 'पेड़ों की जैविक चक्रीयता और भूमिगत जल स्तर का सीधा संबंध मानसूनी बादलों से जुड़ता है।',
    traditionalPractice: 'वृक्षों के इस संकेत पर किसान अतिरिक्त बीज संचय की तैयारी करते हैं।',
    badge: 'फसल समृद्धि'
  },
  // 4. Traditional Tools
  {
    id: 'tool_nahel',
    nameDevanagari: 'नाहेल (साल की लकड़ी का देशी हल)',
    nameRoman: 'Nahel',
    titleHindi: 'हल्का, टिकाऊ व मिट्टी के सूक्ष्मजीवों की रक्षा करने वाला हल',
    section: 'tools',
    periodOrSeason: 'संपूर्ण कृषि चक्र',
    description: 'पवित्र साल (सारजोम) या शीशम की मजबूत लकड़ी से तराशा गया संताली हल। इसमें आगे नुकीला लोहे का फाल (कुसी) लगा होता है।',
    significance: 'यह ट्रैक्टर की तरह मिट्टी को अधिक गहराई से उलट-पुलट नहीं करता, जिससे देशी केंचुए और मित्र कीट सुरक्षित रहते हैं।',
    traditionalPractice: 'रोहिणी और माघे पर्व के दिन हल की पूजा कर उसे पवित्र सिंदूर लगाया जाता है।',
    badge: 'मूल कृषि यंत्र'
  },
  {
    id: 'tool_ararank',
    nameDevanagari: 'अराड़ांग (जुआठ / Yoke)',
    nameRoman: 'Ararank',
    titleHindi: 'दो बैलों को एक साथ साधने वाला लकड़ी का ढांचा',
    section: 'tools',
    periodOrSeason: 'जुताई व मड़ाई',
    description: 'बैलों के कंधों पर संतुलित रूप से टिकने वाला चिकना काष्ठ उपकरण। इसमें दोनों ओर चमड़े या रस्सी के पट्टे (जोत) बंधे होते हैं।',
    significance: 'पशुओं को बिना कष्ट पहुंचाए जुताई की शक्ति को हल में स्थानांतरित करता है।',
    traditionalPractice: 'कृषि कार्य समाप्त होने पर इसे साफ कर छप्पर के नीचे सम्मानपूर्वक रखा जाता है।',
    badge: 'संतुलन यंत्र'
  },
  {
    id: 'tool_datrom',
    nameDevanagari: 'दात्रोम (दंतुर हँसुआ)',
    nameRoman: 'Datrom',
    titleHindi: 'धान की फसल काटने का विशिष्ट धारदार औजार',
    section: 'tools',
    periodOrSeason: 'इर-अम (कटाई काल)',
    description: 'कमर झुकाकर धान के डंठलों को एक झटके में बिना दाना गिराए काटने के लिए संताली लोहारों (कामार) द्वारा विशेष रूप से तैयार हँसुआ।',
    significance: 'सोहराय के गीतों में दात्रोम की धार और कटाई के उल्लास का बार-बार वर्णन मिलता है।',
    traditionalPractice: 'कटाई से पूर्व नायके द्वारा पहले पांच पूलों की कटाई कर जाहेर एरा को अर्पण किया जाता है।',
    badge: 'कटाई यंत्र'
  }
];

export const SantaliAgriSeasons: React.FC = () => {
  const { isAdmin } = useAdmin();
  const STORAGE_KEY = 'hor_katha_agri_seasons_db';

  const [items, setItems] = useState<AgriItem[]>(() => {
    return safeLoadFromStorage(STORAGE_KEY, DEFAULT_AGRI_ITEMS);
  });

  const [activeSection, setActiveSection] = useState<'seasons' | 'seeds' | 'weather' | 'tools'>('seasons');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<AgriItem>(items[0]);

  // Admin Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AgriItem | null>(null);
  const [formData, setFormData] = useState<Partial<AgriItem>>({});

  const saveItems = (updated: AgriItem[]) => {
    setItems(updated);
    safeSaveToStorage(STORAGE_KEY, updated);
  };

  const filteredItems = items.filter((item) => {
    const matchesSection = item.section === activeSection;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.nameDevanagari.toLowerCase().includes(q) ||
      item.nameRoman.toLowerCase().includes(q) ||
      item.titleHindi.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q);
    return matchesSection && matchesSearch;
  });

  // Admin Actions
  const handleAddNew = () => {
    setEditingItem(null);
    setFormData({
      id: `agri_${Date.now()}`,
      nameDevanagari: '',
      nameRoman: '',
      titleHindi: '',
      section: activeSection,
      periodOrSeason: '',
      description: '',
      significance: '',
      traditionalPractice: '',
      badge: 'ज्ञान'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: AgriItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('क्या आप सचमुच इस कृषि जानकारी को हटाना चाहते हैं?')) {
      const updated = items.filter((i) => i.id !== id);
      saveItems(updated);
      if (selectedItem?.id === id) {
        setSelectedItem(updated[0] || null);
      }
    }
  };

  const handleResetToDefault = () => {
    if (confirm('डिफ़ॉल्ट पारम्परिक कृषि डेटा रीसेट करें?')) {
      saveItems(DEFAULT_AGRI_ITEMS);
      setSelectedItem(DEFAULT_AGRI_ITEMS[0]);
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameDevanagari || !formData.titleHindi || !formData.description) return;

    const readyItem: AgriItem = {
      id: editingItem ? editingItem.id : `agri_${Date.now()}`,
      nameDevanagari: formData.nameDevanagari || '',
      nameRoman: formData.nameRoman || '',
      titleHindi: formData.titleHindi || '',
      section: (formData.section || activeSection) as any,
      periodOrSeason: formData.periodOrSeason || '',
      description: formData.description || '',
      significance: formData.significance || '',
      traditionalPractice: formData.traditionalPractice || '',
      badge: formData.badge || 'ज्ञान'
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

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-green-900 to-amber-950 text-white p-6 sm:p-8 rounded-3xl shadow-md border border-emerald-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold backdrop-blur-xs border border-emerald-400/30">
              <Sprout className="w-3.5 h-3.5" />
              <span>पारंपरिक आदिवासी कृषि विज्ञान एवं नक्षत्र ज्ञान (Indigenous Agro-Ecology)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-50">
              संताली पारम्परिक कृषि, ऋतु-चक्र व नक्षत्र ज्ञान
            </h1>
            <p className="text-sm text-emerald-200/90 max-w-2xl leading-relaxed">
              रोहिणी नक्षत्र की धुरिया एरा से लेकर सोहराय की स्वर्ण धान कटाई तक - संताली समाज का प्रकृति-सम्मत कृषि पंचांग, देशी धान किस्में, प्राकृतिक मौसम सूचक व पारंपरिक काष्ठ औजार।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => speakWithFemaleVoice('संताली पारम्परिक कृषि, ऋतु-चक्र व नक्षत्र ज्ञान')}
              className="px-3.5 py-2 bg-emerald-800/60 hover:bg-emerald-700/70 border border-emerald-600/40 text-emerald-100 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Volume2 className="w-4 h-4 text-emerald-300" />
              <span>ऑडियो गाइड</span>
            </button>
            {isAdmin && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddNew}
                  className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>नयी जानकारी जोड़ें</span>
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

      {/* Navigation Tabs Bar */}
      <div className="bg-white p-2.5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'seasons' as const, label: 'ऋतु-चक्र व नक्षत्र', icon: Calendar },
            { id: 'seeds' as const, label: 'देशी धान व बीज किस्में', icon: Wheat },
            { id: 'weather' as const, label: 'प्राकृतिक मौसम सूचक', icon: CloudRain },
            { id: 'tools' as const, label: 'कृषि यंत्र व औजार', icon: SunMedium }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-2xs scale-[1.02]'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="खोजें (Search)..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Detail Showcase & Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: List Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
            <span>प्रविष्टियां: {filteredItems.length}</span>
            {isAdmin && (
              <span className="text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300">
                एडमिन संपादन सक्रिय
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredItems.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-emerald-50/80 border-emerald-500 shadow-sm ring-2 ring-emerald-500/20'
                      : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                        {item.badge}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakWithFemaleVoice(item.nameDevanagari);
                        }}
                        className="p-1 rounded text-slate-400 hover:text-emerald-800 hover:bg-emerald-100 transition-colors"
                        title="उच्चारण"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-slate-900 group-hover:text-emerald-900 transition-colors">
                        {item.nameDevanagari}
                      </h4>
                      <p className="text-[11px] font-bold text-emerald-800">
                        {item.nameRoman}
                      </p>
                      {item.periodOrSeason && (
                        <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
                          काल: {item.periodOrSeason}
                        </p>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-700 font-bold truncate max-w-[130px]">
                      {item.titleHindi}
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

        {/* Right Column: Active Spotlight Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {selectedItem && (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-4 sticky top-24">
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                    {selectedItem.badge}
                  </span>
                  <h2 className="text-xl font-black text-slate-900 mt-1">
                    {selectedItem.nameDevanagari}
                  </h2>
                  <p className="text-xs font-bold text-emerald-800">
                    {selectedItem.nameRoman} ({selectedItem.titleHindi})
                  </p>
                  {selectedItem.periodOrSeason && (
                    <p className="text-xs text-amber-900 font-semibold mt-1">
                      अवधि / ऋतु: {selectedItem.periodOrSeason}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => speakWithFemaleVoice(`${selectedItem.nameDevanagari}. ${selectedItem.description}`)}
                    className="p-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 transition-all cursor-pointer shadow-xs"
                    title="उच्चारण व विवरण सुनें"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => handleEdit(selectedItem)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
                      title="एडमिन संपादन"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-emerald-700" /> पारम्परिक विवरण व प्रक्रिया
                </span>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  {selectedItem.description}
                </p>
              </div>

              {/* Significance */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-emerald-900 uppercase flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" /> कृषि व पारिस्थितिकी महत्व
                </span>
                <p className="text-xs text-emerald-950 leading-relaxed bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100 font-medium">
                  {selectedItem.significance}
                </p>
              </div>

              {/* Traditional Custom */}
              {selectedItem.traditionalPractice && (
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-amber-900 uppercase">
                    रूढ़िगत परम्परा व अनुष्ठान
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed bg-amber-50/50 p-3 rounded-2xl border border-amber-200/60">
                    {selectedItem.traditionalPractice}
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
                  {editingItem ? 'कृषि जानकारी संपादित करें' : 'नयी कृषि जानकारी जोड़ें'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">नाम (संताली देवनागरी)</label>
                  <input
                    type="text"
                    required
                    value={formData.nameDevanagari || ''}
                    onChange={(e) => setFormData({ ...formData, nameDevanagari: e.target.value })}
                    placeholder="उदा. रोहिणी एरा"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">नाम (Roman Script)</label>
                  <input
                    type="text"
                    value={formData.nameRoman || ''}
                    onChange={(e) => setFormData({ ...formData, nameRoman: e.target.value })}
                    placeholder="e.g. Rohini Era"
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
                    placeholder="उदा. रोहिणी नक्षत्र में सूखी बुआई"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">अनुभाग (Section)</label>
                  <select
                    value={formData.section || activeSection}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="seasons">ऋतु-चक्र व नक्षत्र (seasons)</option>
                    <option value="seeds">देशी धान व बीज (seeds)</option>
                    <option value="weather">प्राकृतिक मौसम सूचक (weather)</option>
                    <option value="tools">कृषि यंत्र व औजार (tools)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">अवधि / ऋतु (Period)</label>
                  <input
                    type="text"
                    value={formData.periodOrSeason || ''}
                    onChange={(e) => setFormData({ ...formData, periodOrSeason: e.target.value })}
                    placeholder="उदा. जेठ माह (मई-जून)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">बैज लेबल (Badge)</label>
                  <input
                    type="text"
                    value={formData.badge || ''}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="उदा. कृषि नववर्ष"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">विस्तृत विवरण (Description)</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="पारंपरिक प्रक्रिया व कार्यप्रणाली..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">कृषि व पारिस्थितिकी महत्व</label>
                <textarea
                  rows={2}
                  value={formData.significance || ''}
                  onChange={(e) => setFormData({ ...formData, significance: e.target.value })}
                  placeholder="पर्यावरण व फसल संरक्षण में इसका क्या महत्व है..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">रूढ़िगत परम्परा / विधि (Traditional Practice)</label>
                <input
                  type="text"
                  value={formData.traditionalPractice || ''}
                  onChange={(e) => setFormData({ ...formData, traditionalPractice: e.target.value })}
                  placeholder="अनुष्ठान या सामाजिक नियम..."
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
