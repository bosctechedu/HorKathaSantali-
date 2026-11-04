import React, { useState, useEffect } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import {
  HelpCircle,
  Lightbulb,
  Volume2,
  Copy,
  Check,
  Search,
  BookOpen,
  Eye,
  EyeOff,
  Edit2,
  Trash2,
  Plus,
  X,
  Save,
  RotateCcw
} from 'lucide-react';

export interface KudumItem {
  id: string;
  riddleDevanagari: string;
  riddleRoman: string;
  riddleHindi: string;
  answerDevanagari: string;
  answerRoman: string;
  answerHindi: string;
  explanation: string;
  category: 'nature' | 'household' | 'animal' | 'food';
}

export const DEFAULT_KUDUM_LIST: KudumItem[] = [
  {
    id: 'k1',
    riddleDevanagari: 'सेताक रे पुन जांगा, तिकिन रे बार जांगा, आयुप रे पे जांगा?',
    riddleRoman: 'Setag re pun janga, tikin re bar janga, ayup re pe janga?',
    riddleHindi: 'सुबह चार पैर पर, दोपहर दो पैर पर, शाम को तीन पैर पर चलता है?',
    answerDevanagari: 'मानमी (होड़)',
    answerRoman: 'Manmi (Hor) — Man',
    answerHindi: 'मनुष्य (इंसान का जीवनकाल - बचपन, जवानी, बुढ़ापा)',
    explanation: 'बचपन में घुटनों के बल (4), जवानी में सीधे (2), और बुढ़ापे में लाठी लेकर (3 पैर)।',
    category: 'nature'
  },
  {
    id: 'k2',
    riddleDevanagari: 'जिल बानुग ताय, हासा बानुग ताय, एनहोँ ओड़ाक बेनावाय?',
    riddleRoman: 'Jil banug tay, hasa banug tay, enho orag benaway?',
    riddleHindi: 'न मांस है, न मिट्टी है, फिर भी अपना सुंदर घर बनाता है?',
    answerDevanagari: 'बिंदी (Spider / मकड़ी)',
    answerRoman: 'Bindi (Spider / Makdi)',
    answerHindi: 'मकड़ी (जाल बुनती है)',
    explanation: 'मकड़ी बिना किसी सामग्री के केवल अपने लार से सुंदर जाल का घर बनाती है।',
    category: 'animal'
  },
  {
    id: 'k3',
    riddleDevanagari: 'मिदटांग गाय आड़ि आयमा बाछुर ए तोवा कोवा?',
    riddleRoman: 'Midtang gay adi ayma bachur e towa kowa?',
    riddleHindi: 'एक गाय बहुत सारे बछड़ों को दूध पिलाती है?',
    answerDevanagari: 'हुड़ु दाड़ी (धान की बाली / ढेंकी)',
    answerRoman: 'Huru Dari / Okhli & Dhenki',
    answerHindi: 'धान की बाली / ढेंकी',
    explanation: 'धान का एक पौधा सैकड़ों दानों को जीवन देता है।',
    category: 'food'
  },
  {
    id: 'k4',
    riddleDevanagari: 'बार बोयहा मिद साव तेकिन दाड़ा, मेनखान तिस होँ बाकिन ञापामा?',
    riddleRoman: 'Bar boyha mid saw tekin dara, menkhan tis ho bakin nyapama?',
    riddleHindi: 'दो भाई साथ-साथ दौड़ते हैं, लेकिन कभी आपस में मिल नहीं पाते?',
    answerDevanagari: 'सागाड़ चाका (बैलगाड़ी के पहिए)',
    answerRoman: 'Sagar Chaka (Wheels of Bullock Cart)',
    answerHindi: 'बैलगाड़ी के दोनों पहिये',
    explanation: 'पहिए हमेशा बराबर दूरी पर साथ चलते हैं मगर आपस में टकराते नहीं।',
    category: 'household'
  },
  {
    id: 'k5',
    riddleDevanagari: 'हारियाड़ ओड़ाक रे आराक ओड़ाक, आराक ओड़ाक रे हेँदे गिदरा?',
    riddleRoman: 'Hariyar orag re arag orag, arag orag re hende gidra?',
    riddleHindi: 'हरे घर में लाल घर, लाल घर में काले बच्चे?',
    answerDevanagari: 'तरबुज (Watermelon)',
    answerRoman: 'Torbuj (Watermelon)',
    answerHindi: 'तरबूज (हरा छिलका, लाल गूदा, काले बीज)',
    explanation: 'तरबूज की प्राकृतिक बनावट का अद्भुत संताली रूपक।',
    category: 'food'
  },
  {
    id: 'k6',
    riddleDevanagari: 'दाक रे उनुम लेखान बाय लोहोदोक-आ?',
    riddleRoman: 'Dag re unum lekhan bay lohodog-a?',
    riddleHindi: 'पानी में डूबने पर भी गीला नहीं होता?',
    answerDevanagari: 'उमुल (परछाई / छाया)',
    answerRoman: 'Umul (Shadow / Chhaya)',
    answerHindi: 'परछाई (छाया)',
    explanation: 'परछाई पानी की गहराई में भी बिना भीगे दिखाई देती है।',
    category: 'nature'
  }
];

export interface ProverbItem {
  id: string;
  devanagari: string;
  roman: string;
  hindi: string;
  meaning: string;
  category: 'wisdom' | 'unity' | 'work' | 'nature';
}

const DEFAULT_PROVERB_LIST: ProverbItem[] = [
  {
    id: 'p1',
    devanagari: 'जाँहाय ए सिया, उनी गे एरा',
    roman: 'Jahay e siya, uni ge era',
    hindi: 'जो हल चलाएगा, वही फसल बोएगा।',
    meaning: 'कर्म और परिश्रम करने वाले को ही सफलता का फल प्राप्त होता है।',
    category: 'work'
  },
  {
    id: 'p2',
    devanagari: 'मिद टांग काटुब ते सुनुम बांग हालांगोक-आ',
    roman: 'Mid tang katub te sunum bang halangog-a',
    hindi: 'एक अंगुली से तेल नहीं उठाया जा सकता।',
    meaning: 'एकता में ही बल है; बड़े कार्य समाज के सामूहिक सहयोग से ही संभव होते हैं।',
    category: 'unity'
  },
  {
    id: 'p3',
    devanagari: 'पड़हाव बांग बाड़ाय होड़ दो काँणा साव समान',
    roman: 'Ol bang baday hor do kana saw soman',
    hindi: 'जो पढ़ना-लिखना नहीं जानता, वह अंधे के समान है।',
    meaning: 'शिक्षा और संथाली देवनागरी लिपि का ज्ञान जीवन में प्रकाश और स्वाभिमान लाता है।',
    category: 'wisdom'
  },
  {
    id: 'p4',
    devanagari: 'दारे ताहेन खान उमुल, होड़ ताहेन खान गोड़ो',
    roman: 'Dare tahen khan umul, hor tahen khan goro',
    hindi: 'पेड़ होगा तो छाया मिलेगी, स्वजन होंगे तो सहारा मिलेगा।',
    meaning: 'प्रकृति और समाज दोनों ही मनुष्य के जीवन की वास्तविक ढाल हैं।',
    category: 'nature'
  },
  {
    id: 'p5',
    devanagari: 'आलोम कुड़ियाक-आ, जीवी दो सारि गे चालाक-आ',
    roman: 'Alom kuriyag-a, jiwi do sari ge chalag-a',
    hindi: 'आलस मत करो, समय और जीवन निरंतर बहता जा रहा है।',
    meaning: 'समय अनमोल है; युवाओं को समय नष्ट न कर अपने हुनर को निखारना चाहिए।',
    category: 'work'
  }
];

export const KudumProverbs: React.FC = () => {
  const { isAdmin } = useAdmin();
  const [activeTab, setActiveTab] = useState<'kudum' | 'proverbs'>('kudum');
  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Persistent lists
  const [kudumList, setKudumList] = useState<KudumItem[]>(() => {
    return safeLoadFromStorage('hor_katha_kudum_db', DEFAULT_KUDUM_LIST);
  });

  const [proverbList, setProverbList] = useState<ProverbItem[]>(() => {
    return safeLoadFromStorage('hor_katha_proverbs_db', DEFAULT_PROVERB_LIST);
  });

  useEffect(() => {
    safeSaveToStorage('hor_katha_kudum_db', kudumList);
  }, [kudumList]);

  useEffect(() => {
    safeSaveToStorage('hor_katha_proverbs_db', proverbList);
  }, [proverbList]);

  // Modal State for Kudum
  const [isKudumModalOpen, setIsKudumModalOpen] = useState(false);
  const [editingKudumId, setEditingKudumId] = useState<string | null>(null);
  const [kudumForm, setKudumForm] = useState<Omit<KudumItem, 'id'>>({
    riddleDevanagari: '',
    riddleRoman: '',
    riddleHindi: '',
    answerDevanagari: '',
    answerRoman: '',
    answerHindi: '',
    explanation: '',
    category: 'nature'
  });

  // Modal State for Proverb
  const [isProverbModalOpen, setIsProverbModalOpen] = useState(false);
  const [editingProverbId, setEditingProverbId] = useState<string | null>(null);
  const [proverbForm, setProverbForm] = useState<Omit<ProverbItem, 'id'>>({
    devanagari: '',
    roman: '',
    hindi: '',
    meaning: '',
    category: 'wisdom'
  });

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Kudum CRUD
  const handleOpenAddKudum = () => {
    setEditingKudumId(null);
    setKudumForm({
      riddleDevanagari: '',
      riddleRoman: '',
      riddleHindi: '',
      answerDevanagari: '',
      answerRoman: '',
      answerHindi: '',
      explanation: '',
      category: 'nature'
    });
    setIsKudumModalOpen(true);
  };

  const handleOpenEditKudum = (item: KudumItem) => {
    setEditingKudumId(item.id);
    setKudumForm({
      riddleDevanagari: item.riddleDevanagari,
      riddleRoman: item.riddleRoman,
      riddleHindi: item.riddleHindi,
      answerDevanagari: item.answerDevanagari,
      answerRoman: item.answerRoman,
      answerHindi: item.answerHindi,
      explanation: item.explanation,
      category: item.category
    });
    setIsKudumModalOpen(true);
  };

  const handleDeleteKudum = (id: string) => {
    if (window.confirm('Are you sure you want to delete this Kudum riddle?')) {
      setKudumList((prev) => prev.filter((k) => k.id !== id));
    }
  };

  const handleSaveKudum = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kudumForm.riddleHindi || !kudumForm.answerHindi) {
      alert('Please fill at least the Riddle and Answer in Hindi/Santali.');
      return;
    }
    if (editingKudumId) {
      setKudumList((prev) =>
        prev.map((k) => (k.id === editingKudumId ? { ...kudumForm, id: editingKudumId } : k))
      );
    } else {
      const newItem: KudumItem = {
        ...kudumForm,
        id: `k_${Date.now()}`
      };
      setKudumList((prev) => [newItem, ...prev]);
    }
    setIsKudumModalOpen(false);
  };

  // Proverb CRUD
  const handleOpenAddProverb = () => {
    setEditingProverbId(null);
    setProverbForm({
      devanagari: '',
      roman: '',
      hindi: '',
      meaning: '',
      category: 'wisdom'
    });
    setIsProverbModalOpen(true);
  };

  const handleOpenEditProverb = (item: ProverbItem) => {
    setEditingProverbId(item.id);
    setProverbForm({
      devanagari: item.devanagari,
      roman: item.roman,
      hindi: item.hindi,
      meaning: item.meaning,
      category: item.category
    });
    setIsProverbModalOpen(true);
  };

  const handleDeleteProverb = (id: string) => {
    if (window.confirm('Are you sure you want to delete this Proverb?')) {
      setProverbList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSaveProverb = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proverbForm.hindi || !proverbForm.meaning) {
      alert('Please fill at least Proverb in Hindi and its Meaning.');
      return;
    }
    if (editingProverbId) {
      setProverbList((prev) =>
        prev.map((p) => (p.id === editingProverbId ? { ...proverbForm, id: editingProverbId } : p))
      );
    } else {
      const newItem: ProverbItem = {
        ...proverbForm,
        id: `p_${Date.now()}`
      };
      setProverbList((prev) => [newItem, ...prev]);
    }
    setIsProverbModalOpen(false);
  };

  const filteredKudum = kudumList.filter(
    (k) =>
      k.riddleHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.riddleRoman.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.riddleDevanagari.includes(searchQuery)
  );

  const filteredProverbs = proverbList.filter(
    (p) =>
      p.hindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.roman.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.devanagari.includes(searchQuery)
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-sky-800 text-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider">
              Oral Folklore &amp; Wisdom
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
              Kudum &amp; Bhent-Katha
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mt-1.5 tracking-tight flex items-center gap-2.5">
            <HelpCircle className="w-7 h-7 text-amber-300" />
            <span>Kudum (साओताली पहेलियाँ) &amp; Proverbs</span>
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 font-medium mt-1">
            Explore centuries of Santali wit, clever folklore riddles, and timeless community proverbs.
          </p>
        </div>

        {/* View Switcher & Admin Add Button */}
        <div className="flex flex-wrap items-center gap-2">
          {isAdmin && (
            <button
              onClick={activeTab === 'kudum' ? handleOpenAddKudum : handleOpenAddProverb}
              className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all hover:scale-105"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{activeTab === 'kudum' ? 'Add Kudum (पहेली)' : 'Add Proverb (कहावत)'}</span>
            </button>
          )}

          <div className="flex items-center bg-black/25 p-1 rounded-2xl border border-white/20 shrink-0">
            <button
              onClick={() => setActiveTab('kudum')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'kudum'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Kudum Riddles ({kudumList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('proverbs')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'proverbs'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Wise Proverbs ({proverbList.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search riddles, questions, answers, or keywords in Santali Devanagari, Roman or Hindi..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none shadow-2xs"
        />
      </div>

      {/* Content Rendering: Riddles (Kudum) */}
      {activeTab === 'kudum' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredKudum.map((kudum) => {
            const isRevealed = revealedIds.includes(kudum.id);
            return (
              <div
                key={kudum.id}
                className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:border-teal-500/50 transition-all flex flex-col justify-between space-y-4 relative group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                      Category: {kudum.category}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {/* Admin Edit / Delete Icons */}
                      {isAdmin && (
                        <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded-lg border border-amber-200">
                          <button
                            onClick={() => handleOpenEditKudum(kudum)}
                            className="p-1 text-slate-500 hover:text-amber-700 rounded-md transition-colors cursor-pointer"
                            title="Edit Kudum"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteKudum(kudum.id)}
                            className="p-1 text-slate-500 hover:text-rose-600 rounded-md transition-colors cursor-pointer"
                            title="Delete Kudum"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      <button
                        onClick={() => speakWithFemaleVoice(kudum.riddleHindi, { lang: 'hi-IN' })}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-teal-700 hover:bg-teal-50 transition-colors cursor-pointer"
                        title="Listen Riddle"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Riddle Text */}
                  <h3 className="text-base sm:text-lg font-black font-serif text-slate-900 leading-snug">
                    {kudum.riddleDevanagari}
                  </h3>
                  <p className="text-xs font-semibold text-teal-700">{kudum.riddleRoman}</p>
                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    "{kudum.riddleHindi}"
                  </p>
                </div>

                {/* Answer Reveal Area */}
                <div className="pt-2 border-t border-slate-100">
                  {isRevealed ? (
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-3.5 space-y-1.5 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider">
                          Answer / उत्तर:
                        </span>
                        <button
                          onClick={() => toggleReveal(kudum.id)}
                          className="text-[11px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                        >
                          <EyeOff className="w-3 h-3" />
                          <span>Hide</span>
                        </button>
                      </div>
                      <p className="font-serif font-black text-amber-950 text-base">
                        {kudum.answerDevanagari}
                      </p>
                      <p className="text-xs font-bold text-amber-900">{kudum.answerRoman}</p>
                      <p className="text-xs text-slate-700 leading-relaxed pt-1">
                        {kudum.answerHindi} — <span className="text-slate-500">{kudum.explanation}</span>
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={() => toggleReveal(kudum.id)}
                      className="w-full py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer group hover:scale-[1.01]"
                    >
                      <Eye className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                      <span>Tap to Reveal Answer (उत्तर देखें)</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Content Rendering: Wise Proverbs (Bhent-Katha) */}
      {activeTab === 'proverbs' && (
        <div className="space-y-3">
          {filteredProverbs.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-amber-400/50 transition-all space-y-3 relative group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                    Theme: {item.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-black font-serif text-slate-900 pt-1">
                    {item.devanagari}
                  </h3>
                  <p className="text-xs font-bold text-amber-800">{item.roman}</p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Admin Edit / Delete Icons */}
                  {isAdmin && (
                    <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded-lg border border-amber-200">
                      <button
                        onClick={() => handleOpenEditProverb(item)}
                        className="p-1 text-slate-500 hover:text-amber-700 rounded-md transition-colors cursor-pointer"
                        title="Edit Proverb"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProverb(item.id)}
                        className="p-1 text-slate-500 hover:text-rose-600 rounded-md transition-colors cursor-pointer"
                        title="Delete Proverb"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => speakWithFemaleVoice(`${item.hindi}. ${item.meaning}`, { lang: 'hi-IN' })}
                    className="p-2 rounded-xl text-slate-400 hover:text-amber-800 hover:bg-amber-50 transition-colors cursor-pointer"
                    title="Pronounce proverb"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleCopy(item.id, `${item.devanagari}\n${item.roman}\n"${item.hindi}"`)}
                    className="p-2 rounded-xl text-slate-400 hover:text-amber-800 hover:bg-amber-50 transition-colors cursor-pointer"
                    title="Copy proverb"
                  >
                    {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
                <p className="font-bold text-slate-800">"{item.hindi}"</p>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  <strong>भावार्थ:</strong> {item.meaning}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* KUDUM ADD / EDIT MODAL */}
      {isKudumModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 overflow-y-auto max-h-[92vh] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-teal-600" />
                <span>{editingKudumId ? 'Edit Kudum Riddle' : 'Add New Kudum Riddle (नई पहेली)'}</span>
              </h3>
              <button
                onClick={() => setIsKudumModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveKudum} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Riddle in Santali Devanagari (संताली देवनागरी कुदुम)</label>
                <input
                  type="text"
                  value={kudumForm.riddleDevanagari}
                  onChange={(e) => setKudumForm({ ...kudumForm, riddleDevanagari: e.target.value })}
                  placeholder="e.g. सेताक रे पुन जांगा..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Riddle in Roman Santali</label>
                <input
                  type="text"
                  value={kudumForm.riddleRoman}
                  onChange={(e) => setKudumForm({ ...kudumForm, riddleRoman: e.target.value })}
                  placeholder="e.g. Setag re pun janga..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Riddle in Hindi (पहेली - हिंदी में) *</label>
                <input
                  type="text"
                  required
                  value={kudumForm.riddleHindi}
                  onChange={(e) => setKudumForm({ ...kudumForm, riddleHindi: e.target.value })}
                  placeholder="e.g. सुबह चार पैर पर..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Answer Santali Devanagari</label>
                  <input
                    type="text"
                    value={kudumForm.answerDevanagari}
                    onChange={(e) => setKudumForm({ ...kudumForm, answerDevanagari: e.target.value })}
                    placeholder="e.g. मानमी (होड़)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Answer Roman</label>
                  <input
                    type="text"
                    value={kudumForm.answerRoman}
                    onChange={(e) => setKudumForm({ ...kudumForm, answerRoman: e.target.value })}
                    placeholder="e.g. Manmi (Human)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Answer in Hindi (उत्तर) *</label>
                <input
                  type="text"
                  required
                  value={kudumForm.answerHindi}
                  onChange={(e) => setKudumForm({ ...kudumForm, answerHindi: e.target.value })}
                  placeholder="e.g. मनुष्य (इंसान)"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Cultural Explanation / भावार्थ</label>
                <textarea
                  rows={2}
                  value={kudumForm.explanation}
                  onChange={(e) => setKudumForm({ ...kudumForm, explanation: e.target.value })}
                  placeholder="e.g. बचपन में घुटनों के बल, जवानी में..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={kudumForm.category}
                  onChange={(e) => setKudumForm({ ...kudumForm, category: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  <option value="nature">Nature / प्रकृति</option>
                  <option value="animal">Animal / जीव-जंतु</option>
                  <option value="food">Food &amp; Agriculture / खान-पान</option>
                  <option value="household">Household / घरेलू वस्तुएं</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsKudumModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingKudumId ? 'Update Kudum' : 'Add to Kudum List'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROVERB ADD / EDIT MODAL */}
      {isProverbModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 overflow-y-auto max-h-[92vh] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-600" />
                <span>{editingProverbId ? 'Edit Proverb' : 'Add New Proverb (नई कहावत)'}</span>
              </h3>
              <button
                onClick={() => setIsProverbModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProverb} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Proverb in Santali Devanagari (संताली देवनागरी कहावत)</label>
                <input
                  type="text"
                  value={proverbForm.devanagari}
                  onChange={(e) => setProverbForm({ ...proverbForm, devanagari: e.target.value })}
                  placeholder="e.g. जाँहाय ए सिया, उनी गे एरा..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Proverb in Roman Santali</label>
                <input
                  type="text"
                  value={proverbForm.roman}
                  onChange={(e) => setProverbForm({ ...proverbForm, roman: e.target.value })}
                  placeholder="e.g. Jahay e siya, uni ge era..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Proverb in Hindi (कहावत) *</label>
                <input
                  type="text"
                  required
                  value={proverbForm.hindi}
                  onChange={(e) => setProverbForm({ ...proverbForm, hindi: e.target.value })}
                  placeholder="e.g. जो हल चलाएगा, वही फसल बोएगा..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Meaning &amp; Wisdom (भावार्थ) *</label>
                <textarea
                  rows={2}
                  required
                  value={proverbForm.meaning}
                  onChange={(e) => setProverbForm({ ...proverbForm, meaning: e.target.value })}
                  placeholder="e.g. कर्म और परिश्रम करने वाले को ही..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Category / Theme</label>
                <select
                  value={proverbForm.category}
                  onChange={(e) => setProverbForm({ ...proverbForm, category: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="wisdom">Wisdom / ज्ञान</option>
                  <option value="work">Work &amp; Labor / कर्म</option>
                  <option value="unity">Unity / एकता</option>
                  <option value="nature">Nature / प्रकृति</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsProverbModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingProverbId ? 'Update Proverb' : 'Add to Proverb List'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
