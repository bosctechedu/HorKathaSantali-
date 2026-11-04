import React, { useState, useEffect } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import {
  MessageSquare,
  Volume2,
  Search,
  BookOpen,
  Copy,
  Check,
  Languages,
  Sparkles,
  Users,
  ShoppingBag,
  Sun,
  Heart,
  Home,
  Edit2,
  Trash2,
  Plus,
  X,
  Save
} from 'lucide-react';

export interface PhraseItem {
  id: string;
  category: string;
  santaliRoman: string;
  santaliDevanagari: string;
  hindi: string;
  english: string;
  context?: string;
}

export const DEFAULT_PHRASES_DATA: PhraseItem[] = [
  // Greetings & Respect
  {
    id: 'ph-1',
    category: 'Greetings',
    santaliRoman: 'Johar! Cheleka menak-pea?',
    santaliDevanagari: 'जोहार! चेलेका मेनाक-पेया?',
    hindi: 'नमस्ते! आप सब कैसे हैं?',
    english: 'Greetings! How are you all?',
    context: 'Standard respectful tribal greeting'
  },
  {
    id: 'ph-2',
    category: 'Greetings',
    santaliRoman: 'Iņ do bhagē ge menaņa.',
    santaliDevanagari: 'इञ दो भागे गे मेनाञा।',
    hindi: 'मैं ठीक / सकुशल हूँ।',
    english: 'I am doing well / fine.',
    context: 'Polite reply to greeting'
  },
  {
    id: 'ph-3',
    category: 'Greetings',
    santaliRoman: 'Aam do okoe kanaam?',
    santaliDevanagari: 'आम दो ओकोय कानाम?',
    hindi: 'आप कौन हैं?',
    english: 'Who are you?',
    context: 'Asking identity politely'
  },
  {
    id: 'ph-4',
    category: 'Greetings',
    santaliRoman: 'Adi sarhao!',
    santaliDevanagari: 'अ़डि सारहाव!',
    hindi: 'बहुत-बहुत धन्यवाद!',
    english: 'Thank you very much!',
    context: 'Expression of gratitude'
  },

  // Family & Home
  {
    id: 'ph-5',
    category: 'Family & Home',
    santaliRoman: 'Aboaḱ orak do nawa gea.',
    santaliDevanagari: 'आबोवाक् ओड़ाक् दो नावा गेया।',
    hindi: 'हमारा घर नया है।',
    english: 'Our house is new.',
    context: 'Talking about home'
  },
  {
    id: 'ph-6',
    category: 'Family & Home',
    santaliRoman: 'Daka jom me, daka ready gea.',
    santaliDevanagari: 'दाका जोम मे, दाका रेडी गेया।',
    hindi: 'खाना खा लो, भोजन तैयार है।',
    english: 'Have your meal, the food is ready.',
    context: 'Calling family to eat'
  },
  {
    id: 'ph-7',
    category: 'Family & Home',
    santaliRoman: 'Iņren hopon do school teye sen akana.',
    santaliDevanagari: 'इञरेन होपोन दो स्कूल तेये सेन आकाना।',
    hindi: 'मेरा बच्चा स्कूल गया हुआ है।',
    english: 'My child has gone to school.',
    context: 'Parental conversation'
  },

  // Market & Shopping
  {
    id: 'ph-8',
    category: 'Market & Trade',
    santaliRoman: 'Noa do tinaḱ dam kana?',
    santaliDevanagari: 'नोवा दो तिना़क् दाम काना?',
    hindi: 'इसकी क्या कीमत है / यह कितने का है?',
    english: 'How much does this cost?',
    context: 'Bargaining at weekly bazaar'
  },
  {
    id: 'ph-9',
    category: 'Market & Trade',
    santaliRoman: 'Mit kilo aalu emān me.',
    santaliDevanagari: 'मिद किलो आलु एमा़ञ मे।',
    hindi: 'मुझे एक किलो आलू दीजिए।',
    english: 'Please give me one kilogram of potatoes.',
    context: 'Buying grocery items'
  },
  {
    id: 'ph-10',
    category: 'Market & Trade',
    santaliRoman: 'Teheñ hāt khon kiriņ aguime.',
    santaliDevanagari: 'तेहेञ हाट खोन किरिञ आगुइमे।',
    hindi: 'आज साप्ताहिक हाट से खरीद कर ले आओ।',
    english: 'Buy and bring it from today’s village market.',
    context: 'Village market day shopping'
  },

  // Nature, Agriculture & Seasons
  {
    id: 'ph-11',
    category: 'Farming & Nature',
    santaliRoman: 'Dak jorok kana, khet te chalak hoyo-a.',
    santaliDevanagari: 'दाग जोरोक काना, खेत ते चालाक होयो-आ।',
    hindi: 'बारिश हो रही है, खेत जाना होगा।',
    english: 'It is raining, we must go to the field.',
    context: 'Paddy sowing season'
  },
  {
    id: 'ph-12',
    category: 'Farming & Nature',
    santaliRoman: 'Sal baha do adi bēsh so-a.',
    santaliDevanagari: 'साल बाहा दो अ़डि बेश सो-आ।',
    hindi: 'साल का फूल बहुत सुगंधित होता है।',
    english: 'The Sal flower has a very pleasant fragrance.',
    context: 'Baha festival nature conversation'
  },

  // Culture & Festivals
  {
    id: 'ph-13',
    category: 'Festivals',
    santaliRoman: 'Sohrai parab re dāngra ko bhāgē te arso-koya.',
    santaliDevanagari: 'सोहराय परोब रे दांग्रा को भागे ते आ़र्सो-कोया।',
    hindi: 'सोहराय पर्व में बैलों और मवेशियों की पूजा की जाती है।',
    english: 'During the Sohrai festival, cattle and oxen are blessed and honored.',
    context: 'Winter harvest festival'
  },
  {
    id: 'ph-14',
    category: 'Festivals',
    santaliRoman: 'Tiryo ar Tamak ru-kan kana.',
    santaliDevanagari: 'तिर्यो आर टामाक रु-कान काना।',
    hindi: 'बांसुरी और नगाड़ा बज रहा है।',
    english: 'The bamboo flute and traditional kettle drum are playing.',
    context: 'Traditional music gathering'
  }
];

const CATEGORIES = ['All', 'Greetings', 'Family & Home', 'Market & Trade', 'Farming & Nature', 'Festivals'];

export const SantaliPhrasebook: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isAdmin } = useAdmin();
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Persistent Phrases state
  const [phrasesList, setPhrasesList] = useState<PhraseItem[]>(() => {
    return safeLoadFromStorage('hor_katha_phrasebook_db', DEFAULT_PHRASES_DATA);
  });

  useEffect(() => {
    safeSaveToStorage('hor_katha_phrasebook_db', phrasesList);
  }, [phrasesList]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPhraseId, setEditingPhraseId] = useState<string | null>(null);
  const [phraseForm, setPhraseForm] = useState<Omit<PhraseItem, 'id'>>({
    category: 'Greetings',
    santaliRoman: '',
    santaliDevanagari: '',
    hindi: '',
    english: '',
    context: ''
  });

  const handleOpenAdd = () => {
    setEditingPhraseId(null);
    setPhraseForm({
      category: 'Greetings',
      santaliRoman: '',
      santaliDevanagari: '',
      hindi: '',
      english: '',
      context: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (phrase: PhraseItem) => {
    setEditingPhraseId(phrase.id);
    setPhraseForm({
      category: phrase.category,
      santaliRoman: phrase.santaliRoman,
      santaliDevanagari: phrase.santaliDevanagari,
      hindi: phrase.hindi,
      english: phrase.english,
      context: phrase.context || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this phrase?')) {
      setPhrasesList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phraseForm.santaliRoman || !phraseForm.hindi) {
      alert('Please fill at least the Santali Roman phrase and Hindi meaning.');
      return;
    }

    if (editingPhraseId) {
      setPhrasesList((prev) =>
        prev.map((p) => (p.id === editingPhraseId ? { ...phraseForm, id: editingPhraseId } : p))
      );
    } else {
      const newPhrase: PhraseItem = {
        ...phraseForm,
        id: `ph_${Date.now()}`
      };
      setPhrasesList((prev) => [newPhrase, ...prev]);
    }
    setIsModalOpen(false);
  };

  const filteredPhrases = phrasesList.filter((p) => {
    const matchesCat = selectedCat === 'All' || p.category === selectedCat;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      p.santaliRoman.toLowerCase().includes(q) ||
      p.hindi.toLowerCase().includes(q) ||
      p.english.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const handleSpeak = (text: string) => {
    speakWithFemaleVoice(text, { lang: 'hi-IN', rate: 0.88 });
  };

  const handleCopy = (phrase: PhraseItem) => {
    const text = `${phrase.santaliRoman} (${phrase.santaliDevanagari})\nHindi: ${phrase.hindi}\nEnglish: ${phrase.english}`;
    navigator.clipboard.writeText(text);
    setCopiedId(phrase.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={`space-y-4 max-w-5xl mx-auto ${compact ? 'p-1 text-xs' : ''}`}>
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 text-white p-5 rounded-3xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider">
            Daily Indigenous Conversations
          </span>
          <h1 className="text-xl sm:text-2xl font-black mt-1 tracking-tight flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            <span>Everyday Santali Phrasebook</span>
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 font-medium mt-0.5">
            Essential spoken Santali sentences with female voice audio in Roman, Santali Devanagari, Hindi &amp; English.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isAdmin && (
            <button
              onClick={handleOpenAdd}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Phrase (वाक्य जोड़ें)</span>
            </button>
          )}

          <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-4 py-2 text-right">
            <span className="text-[10px] uppercase font-bold text-emerald-100 block">Total Phrases</span>
            <span className="text-lg font-black text-white">{phrasesList.length} Spoken Dialogues</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search phrases by Santali words, Hindi or English meaning..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-bold">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-xl transition-all shrink-0 cursor-pointer ${
                selectedCat === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Phrases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredPhrases.map((phrase) => (
          <div
            key={phrase.id}
            className="bg-white rounded-2xl border border-slate-200 p-4.5 shadow-2xs hover:shadow-xs hover:border-emerald-300 transition-all space-y-2.5 relative group"
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                {phrase.category}
              </span>

              <div className="flex items-center gap-1">
                {/* Admin Pen (Edit) and Delete Icons */}
                {isAdmin && (
                  <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded-lg border border-amber-200">
                    <button
                      onClick={() => handleOpenEdit(phrase)}
                      className="p-1 text-slate-500 hover:text-amber-700 rounded-md transition-colors cursor-pointer"
                      title="Edit Phrase"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(phrase.id)}
                      className="p-1 text-slate-500 hover:text-rose-600 rounded-md transition-colors cursor-pointer"
                      title="Delete Phrase"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <button
                  onClick={() => handleCopy(phrase)}
                  className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  title="Copy Phrase"
                >
                  {copiedId === phrase.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>

                <button
                  onClick={() => handleSpeak(phrase.santaliDevanagari || phrase.santaliRoman)}
                  className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-all hover:scale-105 cursor-pointer shadow-2xs"
                  title="Listen Pronunciation"
                >
                  <Volume2 className="w-4 h-4 text-emerald-700" />
                </button>
              </div>
            </div>

            {/* Santali Text */}
            <div className="space-y-0.5">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {phrase.santaliRoman}
              </h3>
              <p className="text-sm font-serif font-bold text-amber-900 bg-amber-50/60 px-2.5 py-0.5 rounded-lg inline-block border border-amber-200/40">
                {phrase.santaliDevanagari}
              </p>
            </div>

            {/* Meanings */}
            <div className="pt-1 border-t border-slate-100 text-xs space-y-1">
              <p className="text-slate-700">
                <strong className="text-emerald-700 font-semibold">Hindi: </strong>
                {phrase.hindi}
              </p>
              <p className="text-slate-500">
                <strong className="text-slate-400 font-semibold">English: </strong>
                {phrase.english}
              </p>
            </div>

            {phrase.context && (
              <p className="text-[10px] text-slate-400 italic">
                Context: {phrase.context}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* PHRASE ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 overflow-y-auto max-h-[92vh] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <span>{editingPhraseId ? 'Edit Phrase' : 'Add New Phrase (नया वाक्य जोड़ें)'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Santali in Roman Script *</label>
                <input
                  type="text"
                  required
                  value={phraseForm.santaliRoman}
                  onChange={(e) => setPhraseForm({ ...phraseForm, santaliRoman: e.target.value })}
                  placeholder="e.g. Johar! Cheleka menak-pea?"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Santali in Devanagari (संताली देवनागरी)</label>
                <input
                  type="text"
                  value={phraseForm.santaliDevanagari}
                  onChange={(e) => setPhraseForm({ ...phraseForm, santaliDevanagari: e.target.value })}
                  placeholder="e.g. जोहार! चेलेका मेनाक-पेया?"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Hindi Translation (हिंदी अर्थ) *</label>
                <input
                  type="text"
                  required
                  value={phraseForm.hindi}
                  onChange={(e) => setPhraseForm({ ...phraseForm, hindi: e.target.value })}
                  placeholder="e.g. नमस्ते! आप सब कैसे हैं?"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">English Translation</label>
                <input
                  type="text"
                  value={phraseForm.english}
                  onChange={(e) => setPhraseForm({ ...phraseForm, english: e.target.value })}
                  placeholder="e.g. Greetings! How are you all?"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={phraseForm.category}
                    onChange={(e) => setPhraseForm({ ...phraseForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Greetings">Greetings</option>
                    <option value="Family & Home">Family & Home</option>
                    <option value="Market & Trade">Market & Trade</option>
                    <option value="Farming & Nature">Farming & Nature</option>
                    <option value="Festivals">Festivals</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Context / Usage Note</label>
                  <input
                    type="text"
                    value={phraseForm.context}
                    onChange={(e) => setPhraseForm({ ...phraseForm, context: e.target.value })}
                    placeholder="e.g. Standard respectful tribal greeting"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingPhraseId ? 'Update Phrase' : 'Add to Phrasebook'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
