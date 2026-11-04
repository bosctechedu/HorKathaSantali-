import React, { useState } from 'react';
import { SantaliWord } from '../types';
import { useAdmin } from '../context/AdminContext';
import { speakWithFemaleVoice } from '../utils/speech';
import { useVoiceSearch } from '../utils/voiceSearch';
import {
  Search,
  Volume2,
  Star,
  Copy,
  Check,
  BookOpen,
  Sparkles,
  ArrowRight,
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  ShieldCheck,
  ChevronDown,
  Mic,
  MicOff
} from 'lucide-react';

export const DICTIONARY_CATEGORY_TABS = [
  { id: 'all', labelSantali: 'सानाम', labelHindi: 'सभी', labelEnglish: 'All', icon: '🌟' },
  { id: 'relation', labelSantali: 'साग़य', labelHindi: 'नाते-रिश्ते', labelEnglish: 'Relations', icon: '👨‍👩‍👧‍👦' },
  { id: 'fruit', labelSantali: 'जो', labelHindi: 'फल', labelEnglish: 'Fruits', icon: '🥭' },
  { id: 'animal', labelSantali: 'जिब-जिय़ाली', labelHindi: 'पशु-पक्षी', labelEnglish: 'Animals & Birds', icon: '🐅' },
  { id: 'food', labelSantali: 'दाका-उतु', labelHindi: 'खान-पान व अनाज', labelEnglish: 'Food & Grains', icon: '🍚' },
  { id: 'body', labelSantali: 'होड़मो', labelHindi: 'शरीर के अंग', labelEnglish: 'Body Parts', icon: '🫀' },
  { id: 'nature', labelSantali: 'सिरजोन', labelHindi: 'प्रकृति व तत्व', labelEnglish: 'Nature', icon: '🌳' },
  { id: 'household', labelSantali: 'ओड़ाक् सापाब', labelHindi: 'घरेलू सामान', labelEnglish: 'Household & Tools', icon: '🏡' },
  { id: 'culture', labelSantali: 'लाकचार', labelHindi: 'संस्कृति व पर्व', labelEnglish: 'Culture & Festivals', icon: '🪘' },
  { id: 'action', labelSantali: 'कामी', labelHindi: 'क्रिया व काम', labelEnglish: 'Actions & Verbs', icon: '⚡' },
  { id: 'number_time', labelSantali: 'लेखा आर ओकतो', labelHindi: 'संख्या व समय', labelEnglish: 'Numbers & Time', icon: '🔢' },
  { id: 'others', labelSantali: 'एटागाग्', labelHindi: 'अन्य शब्द', labelEnglish: 'Others', icon: '📖' },
  { id: 'favorites', labelSantali: 'बाछाव', labelHindi: 'पसंदीदा', labelEnglish: 'Saved', icon: '⭐' },
];

interface DictionaryModuleProps {
  onSelectWordForKeyboard?: (word: string) => void;
  compact?: boolean;
}

export const DictionaryModule: React.FC<DictionaryModuleProps> = ({
  onSelectWordForKeyboard,
  compact = false
}) => {
  const { isAdmin, words, addWord, updateWord, deleteWord } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedWord, setSelectedWord] = useState<SantaliWord>(words[0] || {} as SantaliWord);
  const [favorites, setFavorites] = useState<string[]>(['rel_1', 'frt_1', 'nat_2']);
  const [copied, setCopied] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Voice Search Integration
  const {
    isListening,
    interimTranscript,
    isSupported: isVoiceSupported,
    lang: voiceLang,
    setLang: setVoiceLang,
    errorMessage: voiceError,
    clearError: clearVoiceError,
    toggleListening
  } = useVoiceSearch({
    defaultLang: 'hi-IN',
    onResult: (transcriptText) => {
      setSearchQuery(transcriptText);
    }
  });

  // Admin Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editId, setEditId] = useState<string | null>(null);

  // Form Fields
  const [formRoman, setFormRoman] = useState('');
  const [formDevanagari, setFormDevanagari] = useState('');
  const [formPhonetic, setFormPhonetic] = useState('');
  const [formCategory, setFormCategory] = useState<string>('relation');
  const [formMeaningHindi, setFormMeaningHindi] = useState('');
  const [formMeaningEnglish, setFormMeaningEnglish] = useState('');
  const [formExampleSantali, setFormExampleSantali] = useState('');
  const [formExampleHindi, setFormExampleHindi] = useState('');
  const [formExampleEnglish, setFormExampleEnglish] = useState('');

  const [displayLimit, setDisplayLimit] = useState(60);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSpeak = (text: string, id?: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (id) setSpeakingId(id);
    speakWithFemaleVoice(text, {
      lang: 'hi-IN',
      pitch: 1.18,
      rate: 0.88,
      onEnd: () => setSpeakingId(null),
    });
  };

  const handleCopyWord = (word: SantaliWord) => {
    const textToCopy = `${word.wordDevanagari} (${word.wordRoman})\nEnglish: ${word.meaningEnglish}\nHindi: ${word.meaningHindi}\nExample: ${word.exampleSantali}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Admin Actions
  const handleOpenAddModal = () => {
    setModalMode('add');
    setEditId(null);
    setFormRoman('');
    setFormDevanagari('');
    setFormPhonetic('/.../');
    setFormCategory('relation');
    setFormMeaningHindi('');
    setFormMeaningEnglish('');
    setFormExampleSantali('');
    setFormExampleHindi('');
    setFormExampleEnglish('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (word: SantaliWord, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setModalMode('edit');
    setEditId(word.id);
    setFormRoman(word.wordRoman);
    setFormDevanagari(word.wordDevanagari);
    setFormPhonetic(word.phonetic);
    setFormCategory(word.category);
    setFormMeaningHindi(word.meaningHindi);
    setFormMeaningEnglish(word.meaningEnglish);
    setFormExampleSantali(word.exampleSantali);
    setFormExampleHindi(word.exampleHindi);
    setFormExampleEnglish(word.exampleEnglish);
    setIsModalOpen(true);
  };

  const handleDeleteWord = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this word from the dictionary?')) {
      deleteWord(id);
      if (selectedWord?.id === id && words.length > 1) {
        setSelectedWord(words[0]);
      }
    }
  };

  const handleSaveWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRoman.trim() || !formDevanagari.trim()) {
      alert('कृपया संताली देवनागरी और रोमन दोनों रूप अवश्य दर्ज करें।');
      return;
    }

    const payload = {
      wordRoman: formRoman.trim(),
      wordDevanagari: formDevanagari.trim(),
      phonetic: formPhonetic.trim() || `/${formRoman.toLowerCase()}/`,
      partOfSpeech: 'Vocabulary Entry',
      meaningHindi: formMeaningHindi.trim(),
      meaningEnglish: formMeaningEnglish.trim(),
      exampleSantali: formExampleSantali.trim() || `${formRoman} do adi bhage.`,
      exampleEnglish: formExampleEnglish.trim() || 'Usage example in sentence.',
      exampleHindi: formExampleHindi.trim() || 'वाक्य में प्रयोग।',
      category: formCategory
    };

    if (modalMode === 'add') {
      addWord(payload);
    } else if (editId) {
      updateWord(editId, payload);
    }

    setIsModalOpen(false);
  };

  const filteredWords = words.filter((w) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      w.wordRoman.toLowerCase().includes(query) ||
      (w.wordDevanagari && w.wordDevanagari.includes(query)) ||
      w.meaningEnglish.toLowerCase().includes(query) ||
      w.meaningHindi.toLowerCase().includes(query);

    if (activeCategory === 'favorites') {
      return matchesQuery && favorites.includes(w.id);
    }
    if (activeCategory !== 'all') {
      // Map backwards compatibility
      if (activeCategory === 'relation') {
        return matchesQuery && (w.category === 'relation' || w.category === 'family');
      }
      if (activeCategory === 'culture') {
        return matchesQuery && (w.category === 'culture' || w.category === 'spiritual');
      }
      if (activeCategory === 'others') {
        return matchesQuery && (w.category === 'others' || w.category === 'common' || w.category === 'phrases');
      }
      return matchesQuery && w.category === activeCategory;
    }
    return matchesQuery;
  });

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden ${compact ? 'p-3' : 'p-6'}`}>
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600" />
              <span>Santali Comprehensive Lexicon</span>
            </h2>
            <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
              {words.length.toLocaleString()}+ Real Words
            </span>
            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1" title="All words stored in browser IndexedDB for 100% offline access">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              IndexedDB Offline Ready
            </span>
            <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 flex items-center gap-1">
              <Volume2 className="w-3 h-3" /> Female Voice Enabled
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            100% Genuine Santali words across Relations, Fruits, Animals, Food, Body, Nature, Culture &amp; Actions.
          </p>
        </div>

        {/* Action Controls: Admin Add Button */}
        {isAdmin && (
          <button
            onClick={handleOpenAddModal}
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Word</span>
          </button>
        )}
      </div>

      {/* TOP 10 CATEGORIES FILTER BAR (WITH OTHERS & ALL) */}
      <div className="mt-4 pt-1 pb-2">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center justify-between">
          <span>Categories &amp; Filter Tabs</span>
          <span className="text-slate-400 font-normal">
            Showing {filteredWords.length} of {words.length} entries
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {DICTIONARY_CATEGORY_TABS.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setDisplayLimit(60);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-xs font-bold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span className="font-semibold">{cat.labelEnglish}</span>
                <span className={`text-[10px] opacity-80 ${isActive ? 'text-amber-100' : 'text-slate-500'}`}>
                  ({cat.labelHindi})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Input Bar with Voice Search */}
      <div className="mt-2 space-y-2">
        <div className="relative flex items-center">
          <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
            isListening ? 'text-rose-600' : 'text-slate-400'
          }`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isListening
                ? 'सुन रहे हैं... बोलिए (बोलें: "आबा", "उल", "कुल", "दाका")...'
                : 'Search real Santali words in Santali Devanagari, Roman (Aba, Ul, Kul), Hindi, or English...'
            }
            className={`w-full pl-10 pr-32 py-2.5 text-xs md:text-sm rounded-xl border transition-all ${
              isListening
                ? 'border-rose-400 ring-2 ring-rose-300/60 bg-rose-50/30'
                : 'border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-slate-50/50'
            }`}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs"
                title="Clear Search"
              >
                Clear
              </button>
            )}

            {/* Voice Search Mic Button */}
            <button
              type="button"
              onClick={toggleListening}
              title={
                isListening
                  ? 'वॉइस सर्च बंद करें (Stop Voice Search)'
                  : 'बोलकर खोजें (Voice Search - हिंदी / संताली / English)'
              }
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse shadow-xs ring-2 ring-rose-300'
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300/70'
              }`}
            >
              <Mic className={`w-3.5 h-3.5 ${isListening ? 'animate-bounce text-white' : 'text-amber-800'}`} />
              <span className="text-[11px]">
                {isListening ? 'सुन रहे...' : 'वॉइस'}
              </span>
            </button>
          </div>
        </div>

        {/* Voice Search Feedback Banner */}
        {isListening && (
          <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
              </span>
              <span className="font-semibold text-rose-800">
                {interimTranscript ? (
                  <span className="italic font-bold text-rose-950">"{interimTranscript}"</span>
                ) : (
                  'माइक्रोफ़ोन सक्रिय है... संताली शब्द या हिन्दी में बोलिए'
                )}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px]">
              <span className="text-slate-500 font-medium">भाषा:</span>
              <button
                type="button"
                onClick={() => setVoiceLang('hi-IN')}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                  voiceLang === 'hi-IN'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                🇮🇳 हिन्दी / संताली
              </button>
              <button
                type="button"
                onClick={() => setVoiceLang('en-IN')}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                  voiceLang === 'en-IN'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                🔤 English / Roman
              </button>
            </div>
          </div>
        )}

        {/* Voice Error Notice */}
        {voiceError && (
          <div className="flex items-center justify-between px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 animate-in fade-in duration-150">
            <span>⚠️ {voiceError}</span>
            <button
              type="button"
              onClick={clearVoiceError}
              className="text-amber-800 hover:text-amber-950 font-bold ml-2 px-1.5 py-0.5 rounded"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Main 2-Column Split: Words List & Detailed Card View */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Words List */}
        <div className="md:col-span-5 space-y-2 max-h-[480px] overflow-y-auto pr-1">
          {filteredWords.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs bg-slate-50 rounded-xl border border-dashed border-slate-200">
              No words found matching "{searchQuery}" in this category.
            </div>
          ) : (
            <>
              {filteredWords.slice(0, displayLimit).map((word) => {
                const isSelected = selectedWord?.id === word.id;
                const isFav = favorites.includes(word.id);
                return (
                  <div
                    key={word.id}
                    onClick={() => setSelectedWord(word)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/60 shadow-xs ring-1 ring-amber-500/30'
                        : 'border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/70'
                    }`}
                  >
                    <div className="space-y-0.5 min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 group-hover:text-amber-800">
                          {word.wordRoman}
                        </span>
                        <span className="text-xs text-slate-500">
                          ({word.wordDevanagari})
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {word.phonetic}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 truncate">
                        {word.meaningEnglish} • <span className="text-slate-500">{word.meaningHindi}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => handleSpeak(word.wordRoman, word.id, e)}
                        className={`p-1.5 rounded-lg text-slate-400 hover:text-amber-700 hover:bg-amber-100/50 transition-colors ${
                          speakingId === word.id ? 'text-amber-700 bg-amber-100 animate-pulse' : ''
                        }`}
                        title="Female voice pronunciation"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={(e) => toggleFavorite(word.id, e)}
                        className="p-1.5 rounded-lg text-slate-300 hover:text-amber-500 transition-colors"
                        title="Save word"
                      >
                        <Star
                          className={`w-3.5 h-3.5 ${
                            isFav ? 'fill-amber-400 text-amber-500' : ''
                          }`}
                        />
                      </button>

                      {isAdmin && (
                        <>
                          <button
                            onClick={(e) => handleOpenEditModal(word, e)}
                            className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Edit Word"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteWord(word.id, e)}
                            className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Word"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}

              {filteredWords.length > displayLimit && (
                <button
                  onClick={() => setDisplayLimit((prev) => prev + 60)}
                  className="w-full py-2.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ChevronDown className="w-4 h-4" />
                  <span>Load More Words ({filteredWords.length - displayLimit} remaining)</span>
                </button>
              )}
            </>
          )}
        </div>

        {/* Detailed Word View */}
        <div className="md:col-span-7 bg-gradient-to-br from-amber-50/30 via-white to-amber-50/10 rounded-2xl border border-amber-200/80 p-5 flex flex-col justify-between">
          {selectedWord ? (
            <div className="space-y-4">
              {/* Word Header */}
              <div className="flex items-start justify-between pb-3 border-b border-amber-100 gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                      {selectedWord.category || 'General'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {selectedWord.partOfSpeech || 'Noun'}
                    </span>
                    <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                      🗣️ Indian Female Voice
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-950 mt-2">
                    {selectedWord.wordRoman}
                  </h3>

                  <div className="flex items-center gap-3 mt-1 text-sm text-slate-700 font-semibold">
                    <span>{selectedWord.wordDevanagari}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-xs font-mono font-normal text-slate-500">
                      {selectedWord.phonetic}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleSpeak(selectedWord.wordRoman)}
                    className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white shadow-xs transition-colors flex items-center gap-1.5 text-xs font-semibold"
                    title="Pronounce with Female Voice"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Speak</span>
                  </button>
                  <button
                    onClick={() => handleCopyWord(selectedWord)}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title="Copy details"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Meanings */}
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                    English Meaning
                  </span>
                  <p className="text-sm font-semibold text-slate-800">
                    {selectedWord.meaningEnglish}
                  </p>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                    Hindi Meaning (हिन्दी अर्थ)
                  </span>
                  <p className="text-sm font-semibold text-slate-800">
                    {selectedWord.meaningHindi}
                  </p>
                </div>
              </div>

              {/* Example Sentences */}
              <div className="bg-amber-100/40 p-4 rounded-xl border border-amber-200/60 space-y-2">
                <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block">
                  Example Usage in Santali (संताली देवनागरी वाक्य)
                </span>
                <p className="text-base font-bold text-slate-900">
                  {selectedWord.wordDevanagari} — {selectedWord.exampleSantali}
                </p>
                <p className="text-xs text-slate-600 pt-1 border-t border-amber-200/40">
                  Hindi: {selectedWord.exampleHindi}
                </p>
                <p className="text-xs text-slate-500">
                  English: {selectedWord.exampleEnglish}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 text-xs">
              शब्द सूची से कोई भी शब्द चुनें।
            </div>
          )}

          {/* Bottom Send to Keyboard shortcut */}
          {onSelectWordForKeyboard && selectedWord && (
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                इस शब्द को कीबोर्ड में टाइप करना चाहते हैं?
              </span>
              <button
                onClick={() => onSelectWordForKeyboard(selectedWord.wordDevanagari || selectedWord.wordRoman)}
                className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-100/60 hover:bg-amber-100 transition-colors cursor-pointer"
              >
                <span>कीबोर्ड में लोड करें</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Admin Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>{modalMode === 'add' ? 'Add Word to Lexicon' : 'Edit Word'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveWord} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    संताली देवनागरी (Santali Devanagari) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formDevanagari}
                    onChange={(e) => setFormDevanagari(e.target.value)}
                    placeholder="e.g. जोहार / दाका"
                    className="w-full p-2 border border-slate-300 rounded-lg text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Roman Orthography *
                  </label>
                  <input
                    type="text"
                    required
                    value={formRoman}
                    onChange={(e) => setFormRoman(e.target.value)}
                    placeholder="e.g. Johar"
                    className="w-full p-2 border border-slate-300 rounded-lg font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Phonetic Pronunciation
                  </label>
                  <input
                    type="text"
                    value={formPhonetic}
                    onChange={(e) => setFormPhonetic(e.target.value)}
                    placeholder="e.g. /dʒoːhaːr/"
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Category (वर्ग)
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  >
                    <option value="relation">Relations (नाते-रिश्ते / साग़य)</option>
                    <option value="fruit">Fruits (फल / जो)</option>
                    <option value="animal">Animals &amp; Birds (पशु-पक्षी / जिब-जिय़ाली)</option>
                    <option value="food">Food &amp; Grains (खान-पान / दाका-उतु)</option>
                    <option value="body">Body Parts (शरीर के अंग / होड़मो)</option>
                    <option value="nature">Nature &amp; Elements (प्रकृति / सिरजोन)</option>
                    <option value="household">Household &amp; Tools (घरेलू वस्तुएं / ओड़ाक् सापाब)</option>
                    <option value="culture">Culture &amp; Festivals (संस्कृति / लाकचार)</option>
                    <option value="action">Actions &amp; Verbs (क्रिया / कामी)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  English Meaning *
                </label>
                <input
                  type="text"
                  required
                  value={formMeaningEnglish}
                  onChange={(e) => setFormMeaningEnglish(e.target.value)}
                  placeholder="Greeting, Hello"
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Hindi Meaning (हिन्दी अर्थ) *
                </label>
                <input
                  type="text"
                  required
                  value={formMeaningHindi}
                  onChange={(e) => setFormMeaningHindi(e.target.value)}
                  placeholder="नमस्ते, प्रणाम"
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Example Sentence (Santali)
                </label>
                <input
                  type="text"
                  value={formExampleSantali}
                  onChange={(e) => setFormExampleSantali(e.target.value)}
                  placeholder="Johar, am celed menama?"
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{modalMode === 'add' ? 'Save Word' : 'Update Word'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
