import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  Sparkles,
  Volume2,
  Filter,
  CheckCircle2,
  Info,
  Layers,
  Heart,
  ChevronRight,
  Shield,
  Palette,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';

export interface OrnamentItem {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  bodyPartHindi: string;
  bodyPartCategory: 'head' | 'ears' | 'neck' | 'arms' | 'waist' | 'feet';
  metal: string;
  significanceHindi: string;
  wearingRitual: string;
  festivalsAssociated: string[];
  imageUrl: string;
}

export const DEFAULT_ORNAMENTS: OrnamentItem[] = [
  {
    id: 'orn1',
    nameDevanagari: 'हांसली (हँसुली)',
    nameRoman: 'Hasli',
    bodyPartHindi: 'गला (Neck)',
    bodyPartCategory: 'neck',
    metal: 'शुद्ध चांदी / कांसा (Silver / Bell Metal)',
    significanceHindi: 'गले का सबसे प्रमुख ठोस और अर्धचंद्राकार आभूषण। यह संताली नारी के गौरव, आत्मसम्मान और सौम्यता का सर्वोच्च प्रतीक है।',
    wearingRitual: 'विवाह (बापला), सोहराय और बाहा पर्व में पांची-साड़ी के साथ अनिवार्य रूप से पहना जाता है।',
    festivalsAssociated: ['सोहराय (Sohrai)', 'बाहा (Baha)', 'बापला (Marriage)'],
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'orn2',
    nameDevanagari: 'खागड़ा',
    nameRoman: 'Khagda',
    bodyPartHindi: 'गला (Neck Collar)',
    bodyPartCategory: 'neck',
    metal: 'ठोस चांदी (Solid Cast Silver)',
    significanceHindi: 'हांसली से भी चौड़ा और दोनों सिरों पर कलात्मक नक्काशी वाला भारी कॉलर हार। इसके दोनों सिरे मुड़े हुए व सर्पाकार होते हैं।',
    wearingRitual: 'कुलवधू के गृह-प्रवेश एवं बड़े सामाजिक अनुष्ठानों में पहना जाता है।',
    festivalsAssociated: ['बापला (विवाह)', 'करम पर्व', 'दिशोम सोहराय'],
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'orn3',
    nameDevanagari: 'साकम (कड़ा)',
    nameRoman: 'Sakam',
    bodyPartHindi: 'कलाई व हाथ (Wrist / Forearm)',
    bodyPartCategory: 'arms',
    metal: 'चांदी अथवा पीतल/कांसा (Silver or Brass)',
    significanceHindi: 'कलाई का चौड़ा अलंकृत कड़ा। संताली भाषा में साकम का अर्थ "पत्ता" भी होता है, अतः इस पर प्रकृति और पत्तियों की नक्काशी होती है।',
    wearingRitual: 'दोनों हाथों की कलाइयों में 2 से 4 की संख्या में पहना जाता है। नृत्य के समय इसकी खनक ताल मिलाती है।',
    festivalsAssociated: ['लागड़े नृत्य', 'सोहराय', 'करम'],
    imageUrl: 'https://images.unsplash.com/photo-1611591475152-47795d0742f3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'orn4',
    nameDevanagari: 'रासा (झुमका)',
    nameRoman: 'Rasa',
    bodyPartHindi: 'कान (Ears)',
    bodyPartCategory: 'ears',
    metal: 'चांदी (Chandi / Silver)',
    significanceHindi: 'कानों में लटकने वाला अत्यंत सुंदर घंटीनुमा झुमका। संताली युवतियों के शृंगार का सर्वप्रिय आभूषण।',
    wearingRitual: 'कान के निचले हिस्से में पहना जाता है। लागड़े नृत्य के कदमों के साथ यह मदमस्त झूलता है।',
    festivalsAssociated: ['लागड़े (Lagre)', 'बाहा (Baha)', 'दासांय'],
    imageUrl: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'orn5',
    nameDevanagari: 'तरपत',
    nameRoman: 'Tarpat',
    bodyPartHindi: 'कान का ऊपरी भाग (Upper Ear Cartilage)',
    bodyPartCategory: 'ears',
    metal: 'चांदी (Silver Filigree)',
    significanceHindi: 'कान के ऊपरी हिस्से पर पहना जाने वाला गोल चक्का अथवा तारदार आभूषण। यह संताली वेशभूषा की मौलिक विशिष्टता है।',
    wearingRitual: 'कान छिदवाने की रस्म के बाद जीवनपर्यंत पहना जाता है।',
    festivalsAssociated: ['दैनिक जीवन', 'पर्व-त्यौहार', 'चाचो छातियार'],
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'orn6',
    nameDevanagari: 'बांक',
    nameRoman: 'Bank',
    bodyPartHindi: 'पैर व टखने (Ankle / Foot Arch)',
    bodyPartCategory: 'feet',
    metal: 'कांसा / गिल्ट चांदी (Bell Metal / Silver)',
    significanceHindi: 'पैर की घूमावदार और भारी तोड़ा पायल। इसका आकार धनुषाकार वक्राकार होता है और यह संताली नृत्य की पहचान है।',
    wearingRitual: 'पैर के टखने के ऊपर कसा जाता है। जब मांदर की थाप पर कदम थिरकते हैं तो इसकी खनक से अखड़ा गूंज उठता है।',
    festivalsAssociated: ['सोहराय अखड़ा', 'लागड़े नृत्य', 'सकरात'],
    imageUrl: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'orn7',
    nameDevanagari: 'तोड़ा (पैर का कड़ा)',
    nameRoman: 'Toda',
    bodyPartHindi: 'टखना (Anklet Ring)',
    bodyPartCategory: 'feet',
    metal: 'ठोस कांसा व चांदी (Cast Bronze)',
    significanceHindi: 'पैर में पहना जाने वाला ठोस भारी कड़ा। यह पैरों को स्थिरता और खेतों व नृत्यों में सुरक्षा प्रदान करता है।',
    wearingRitual: 'महिलाएं विशेष रूप से विवाह के बाद व धार्मिक पर्वों पर धारण करती हैं।',
    festivalsAssociated: ['बापला', 'सोहराय', 'माघ सिम'],
    imageUrl: 'https://images.unsplash.com/photo-1543290900-502a3a5f2575?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'orn8',
    nameDevanagari: 'सिकरी (रजत करधनी/हार)',
    nameRoman: 'Sikri',
    bodyPartHindi: 'कमर व वक्ष (Waist / Torso Chain)',
    bodyPartCategory: 'waist',
    metal: 'चांदी की बारीक लड़ियां (Interlinked Silver Chain)',
    significanceHindi: 'कमर पर पांची साड़ी के ऊपर बांधी जाने वाली बहु-स्तरीय चांदी की जंजीर। यह कमर के अनुपात को सुडौल व सुशोभित करती है।',
    wearingRitual: 'पांची-दहाड़ा वस्त्र के बीच में कमर पर कसा जाता है।',
    festivalsAssociated: ['सोहराय', 'करम', 'विवाह'],
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'orn9',
    nameDevanagari: 'सीथी (माथा पट्टी)',
    nameRoman: 'Sithi',
    bodyPartHindi: 'माथा व केश (Forehead & Hair Partition)',
    bodyPartCategory: 'head',
    metal: 'चांदी (Silver Filigree)',
    significanceHindi: 'मांग के बीचोबीच पहना जाने वाला रजत आभूषण, जो दोनों कानों की ओर लड़ी के रूप में जुड़ा रहता है।',
    wearingRitual: 'नववधू विवाह की सिंदूरदान रस्म के समय धारण करती है।',
    festivalsAssociated: ['बापला (Marriage)', 'पारिवारिक मांगलिक कार्य'],
    imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'orn10',
    nameDevanagari: 'पागरा',
    nameRoman: 'Pagra',
    bodyPartHindi: 'कान (Ear Plug / Ring)',
    bodyPartCategory: 'ears',
    metal: 'चांदी / पीतल (Cast Silver/Brass)',
    significanceHindi: 'कान की लौ में पहना जाने वाला गोल चपटा बटननुमा आभूषण।',
    wearingRitual: 'दैनिक कार्यों एवं खेतों में काम करते समय भी आसानी से पहना जाता है।',
    festivalsAssociated: ['दैनिक वेशभूषा', 'हाट-बाजार', 'पर्व'],
    imageUrl: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'orn11',
    nameDevanagari: 'पोलहा (अंगूठी)',
    nameRoman: 'Polha',
    bodyPartHindi: 'हाथ की अंगुलियां (Fingers)',
    bodyPartCategory: 'arms',
    metal: 'चांदी (Silver / Bell Metal)',
    significanceHindi: 'हाथ की अनामिका और मध्यमा अंगुली में पहनी जाने वाली चौड़े फलक वाली रजत मुद्रिका।',
    wearingRitual: 'वर-वधू पक्ष द्वारा शगुन और उपहार स्वरूप आदान-प्रदान किया जाता है।',
    festivalsAssociated: ['बापला', 'गोमके मिलन'],
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'orn12',
    nameDevanagari: 'मलूचा (केश पिन)',
    nameRoman: 'Malucha',
    bodyPartHindi: 'केश जूड़ा (Hair Bun / Chignon)',
    bodyPartCategory: 'head',
    metal: 'चांदी अथवा पीतल (Silver Hairpin)',
    significanceHindi: 'संताली जूड़े में खोसा जाने वाला नुकीला और फूलों की नक्काशी वाला हेयरपिन, जिसके साथ लाल व सफेद जंगली फूल भी खोंसे जाते हैं।',
    wearingRitual: 'नृत्य से पूर्व केश संवारते समय जूड़े में दाहिनी ओर खोंसा जाता है।',
    festivalsAssociated: ['लागड़े अखड़ा', 'बाहा पर्व'],
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'
  }
];

export const SantaliOrnamentsJewellery: React.FC = () => {
  const { isAdmin } = useAdmin();
  const STORAGE_KEY = 'hor_katha_jewellery_db';

  const [ornaments, setOrnaments] = useState<OrnamentItem[]>(() =>
    safeLoadFromStorage<OrnamentItem[]>(STORAGE_KEY, DEFAULT_ORNAMENTS)
  );
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('all');
  const [selectedOrnament, setSelectedOrnament] = useState<OrnamentItem>(ornaments[0] || DEFAULT_ORNAMENTS[0]);

  // Admin Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<OrnamentItem | null>(null);
  const [formData, setFormData] = useState<Partial<OrnamentItem>>({});
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const saveOrnaments = (updated: OrnamentItem[]) => {
    setOrnaments(updated);
    safeSaveToStorage(STORAGE_KEY, updated);
    if (!updated.some((o) => o.id === selectedOrnament.id) && updated.length > 0) {
      setSelectedOrnament(updated[0]);
    }
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setFormData({
      id: `orn_${Date.now()}`,
      nameDevanagari: '',
      nameRoman: '',
      bodyPartHindi: 'गला (Neck)',
      bodyPartCategory: 'neck',
      metal: 'शुद्ध चांदी / कांसा',
      significanceHindi: '',
      wearingRitual: '',
      festivalsAssociated: ['सोहराय', 'बाहा'],
      imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: OrnamentItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`क्या आप सचमुच "${name}" आभूषण को हटाना चाहते हैं?`)) {
      const updated = ornaments.filter((o) => o.id !== id);
      saveOrnaments(updated);
      showNotification(`"${name}" आभूषण हटा दिया गया!`);
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameDevanagari || !formData.significanceHindi) {
      alert('कृपया आभूषण का नाम और महत्व अवश्य भरें।');
      return;
    }

    if (editingItem) {
      const updated = ornaments.map((o) =>
        o.id === editingItem.id ? ({ ...o, ...formData } as OrnamentItem) : o
      );
      saveOrnaments(updated);
      if (selectedOrnament.id === editingItem.id) {
        setSelectedOrnament({ ...selectedOrnament, ...formData } as OrnamentItem);
      }
      showNotification('आभूषण सफलतापूर्वक अपडेट हो गया!');
    } else {
      const newItem: OrnamentItem = {
        id: formData.id || `orn_${Date.now()}`,
        nameDevanagari: formData.nameDevanagari || '',
        nameRoman: formData.nameRoman || '',
        bodyPartHindi: formData.bodyPartHindi || 'गला',
        bodyPartCategory: formData.bodyPartCategory || 'neck',
        metal: formData.metal || 'चांदी',
        significanceHindi: formData.significanceHindi || '',
        wearingRitual: formData.wearingRitual || '',
        festivalsAssociated: formData.festivalsAssociated || ['सोहराय'],
        imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80'
      };
      saveOrnaments([newItem, ...ornaments]);
      setSelectedOrnament(newItem);
      showNotification('नया पारंपरिक आभूषण जुड़ गया!');
    }
    setIsModalOpen(false);
  };

  const handleResetToDefault = () => {
    if (confirm('क्या आप सचमुच सभी आभूषण फ़ैक्टरी डिफ़ॉल्ट पर रीसेट करना चाहते हैं?')) {
      saveOrnaments(DEFAULT_ORNAMENTS);
      setSelectedOrnament(DEFAULT_ORNAMENTS[0]);
      showNotification('सभी आभूषण मूल स्वरूप में रीसेट हो गए!');
    }
  };

  const handleSpeak = (text: string) => {
    speakWithFemaleVoice(text, { lang: 'hi-IN', rate: 0.88 });
  };

  const filteredOrnaments = ornaments.filter((item) => {
    if (selectedBodyPart === 'all') return true;
    return item.bodyPartCategory === selectedBodyPart;
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

      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white p-6 md:p-8 shadow-xl relative overflow-hidden border border-amber-500/30">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>हपड़ाम कोवाक् रूप-सजाव · Traditional Silver & Bell Metal Art</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-amber-100 tracking-tight">
            संताली पारंपरिक आभूषण व शृंगार (Authentic Jewellery & Ornaments)
          </h1>

          <p className="text-xs md:text-sm text-amber-200/90 leading-relaxed font-sans">
            हांसली, खागड़ा, साकम, रासा, तरपत, बांक व तोड़ा—संताली पारंपरिक आभूषण केवल सौंदर्य नहीं, बल्कि आत्मरक्षा, स्वास्थ्य, सामूहिकता और प्राकृतिक आस्था के पवित्र प्रतीक हैं।
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-amber-300">
            <span className="flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{ornaments.length} प्रमुख पारंपरिक आभूषण</span>
            </span>
            <span>•</span>
            <span>चांदी व कांसा धातु शिल्प</span>

            {isAdmin && (
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={handleAddNew}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-transform hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  <span>नया आभूषण जोड़ें (Add Ornament)</span>
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

      {/* Body Part Filter Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        {[
          { id: 'all', label: 'समस्त आभूषण (All 12)' },
          { id: 'neck', label: 'गला / हंसली (Neck)' },
          { id: 'ears', label: 'कान / रासा व तरपत (Ears)' },
          { id: 'arms', label: 'हाथ / साकम व कड़ा (Arms/Wrists)' },
          { id: 'feet', label: 'पैर / बांक व तोड़ा (Feet/Ankles)' },
          { id: 'waist', label: 'कमर / सिकरी (Waist)' },
          { id: 'head', label: 'माथा व केश (Head/Hair)' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedBodyPart(tab.id)}
            className={`px-4 py-2 rounded-xl shrink-0 font-bold transition-all cursor-pointer ${
              selectedBodyPart === tab.id
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Layout: Grid of items + Deep Feature Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: List of Ornaments */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredOrnaments.map((ornament) => {
            const isSelected = selectedOrnament.id === ornament.id;
            return (
              <div
                key={ornament.id}
                onClick={() => setSelectedOrnament(ornament)}
                className={`rounded-2xl p-4 transition-all cursor-pointer border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-50/80 border-amber-500 shadow-md ring-2 ring-amber-400/40'
                    : 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {ornament.bodyPartHindi}
                    </span>
                    <span className="text-[10px] font-mono font-medium text-amber-700">
                      {ornament.nameRoman}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900">
                    {ornament.nameDevanagari}
                  </h3>

                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {ornament.significanceHindi}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                    {ornament.metal.split('/')[0]}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeak(`${ornament.nameDevanagari}. ${ornament.significanceHindi}`);
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
                            handleEdit(ornament);
                          }}
                          className="p-1 text-amber-700 hover:text-amber-900 rounded-md cursor-pointer"
                          title="संपादित करें (Admin Edit)"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(ornament.id, ornament.nameDevanagari);
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

        {/* Right Column: Detailed Spotlight Viewer */}
        <div className="lg:col-span-5 sticky top-4 bg-white rounded-3xl border border-amber-300/80 p-5 md:p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-amber-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                गहन आभूषण विवरण · Ornament Spotlight
              </span>
              <h2 className="text-xl font-black text-slate-900">
                {selectedOrnament.nameDevanagari} ({selectedOrnament.nameRoman})
              </h2>
            </div>

            <button
              onClick={() => handleSpeak(`${selectedOrnament.nameDevanagari}. धातु: ${selectedOrnament.metal}. महत्व: ${selectedOrnament.significanceHindi}. पहनने की विधि: ${selectedOrnament.wearingRitual}`)}
              className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>ऑडियो सुनें</span>
            </button>
          </div>

          {/* Image */}
          <div className="w-full h-48 rounded-2xl overflow-hidden bg-slate-950 relative border border-slate-200">
            <img
              src={selectedOrnament.imageUrl}
              alt={selectedOrnament.nameDevanagari}
              className="w-full h-full object-cover filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-2.5 left-3 right-3 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wide bg-amber-500 text-slate-950 px-2 py-0.5 rounded">
                अंग: {selectedOrnament.bodyPartHindi}
              </span>
              <p className="text-xs font-semibold text-amber-200 mt-1">
                पारंपरिक धातु: {selectedOrnament.metal}
              </p>
            </div>
          </div>

          {/* Significance */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-amber-600" />
              <span>सांस्कृतिक व दार्शनिक महत्व:</span>
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed bg-amber-50/60 p-3 rounded-xl border border-amber-200/60">
              {selectedOrnament.significanceHindi}
            </p>
          </div>

          {/* Wearing Ritual */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-900">
              पहनने की विधि व अवसर (Wearing Etiquette):
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedOrnament.wearingRitual}
            </p>
          </div>

          {/* Associated Festivals */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900">
              संबद्ध प्रमुख पर्व व अनुष्ठान:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {selectedOrnament.festivalsAssociated.map((fest, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-medium border border-slate-200"
                >
                  🌾 {fest}
                </span>
              ))}
            </div>
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
                  {editingItem ? 'पारंपरिक आभूषण संपादित करें (Edit Ornament)' : 'नया पारंपरिक आभूषण जोड़ें (Add Ornament)'}
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
                    आभूषण नाम (देवनागरी) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nameDevanagari || ''}
                    onChange={(e) => setFormData({ ...formData, nameDevanagari: e.target.value })}
                    placeholder="उदा: हांसली / साकम"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    आभूषण नाम (Roman Script)
                  </label>
                  <input
                    type="text"
                    value={formData.nameRoman || ''}
                    onChange={(e) => setFormData({ ...formData, nameRoman: e.target.value })}
                    placeholder="उदा: Hasli / Sakam"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    शरीर का अंग (Category)
                  </label>
                  <select
                    value={formData.bodyPartCategory || 'neck'}
                    onChange={(e) => setFormData({ ...formData, bodyPartCategory: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-800"
                  >
                    <option value="head">सिर व केश (Head)</option>
                    <option value="ears">कान (Ears)</option>
                    <option value="neck">गला (Neck)</option>
                    <option value="arms">हाथ व कलाई (Arms)</option>
                    <option value="waist">कमर (Waist)</option>
                    <option value="feet">पैर (Feet)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    अंग विवरण (हिन्दी)
                  </label>
                  <input
                    type="text"
                    value={formData.bodyPartHindi || ''}
                    onChange={(e) => setFormData({ ...formData, bodyPartHindi: e.target.value })}
                    placeholder="उदा: गला (Neck)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    पारंपरिक धातु
                  </label>
                  <input
                    type="text"
                    value={formData.metal || ''}
                    onChange={(e) => setFormData({ ...formData, metal: e.target.value })}
                    placeholder="उदा: शुद्ध चांदी / कांसा"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  सांस्कृतिक व दार्शनिक महत्व (Cultural Significance) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.significanceHindi || ''}
                  onChange={(e) => setFormData({ ...formData, significanceHindi: e.target.value })}
                  placeholder="गले का सबसे प्रमुख ठोस और अर्धचंद्राकार आभूषण..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  पहनने की विधि व अवसर (Wearing Ritual)
                </label>
                <input
                  type="text"
                  value={formData.wearingRitual || ''}
                  onChange={(e) => setFormData({ ...formData, wearingRitual: e.target.value })}
                  placeholder="उदा: विवाह और सोहराय में अनिवार्य रूप से पहना जाता है।"
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
