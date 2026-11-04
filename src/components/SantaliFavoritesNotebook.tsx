import React, { useState, useEffect } from 'react';
import {
  Bookmark,
  Trash2,
  Share2,
  Volume2,
  Sparkles,
  BookOpen,
  Search,
  Check,
  Copy,
  Utensils,
  MapPin,
  FileText,
  HelpCircle,
  MessageSquare,
  BookMarked,
  Mic
} from 'lucide-react';
import { speakWithFemaleVoice } from '../utils/speech';
import { useVoiceSearch } from '../utils/voiceSearch';
import { getFavorites, removeFavorite, toggleFavorite, FavoriteItem } from '../utils/favoritesStorage';

export const SantaliFavoritesNotebook: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Voice Search Integration
  const {
    isListening,
    interimTranscript,
    errorMessage: voiceError,
    clearError: clearVoiceError,
    toggleListening
  } = useVoiceSearch({
    defaultLang: 'hi-IN',
    onResult: (transcriptText) => {
      setSearchQuery(transcriptText);
    }
  });

  const loadFavorites = () => {
    let items = getFavorites();
    // If empty on first load, seed with a few popular cultural bookmarks for delightful discovery
    if (items.length === 0) {
      const initialSeeds: Omit<FavoriteItem, 'savedAt'>[] = [
        {
          id: 'cuisine_c1',
          category: 'recipe',
          categoryLabel: 'पारंपरिक व्यंजन (Cuisine)',
          titleDevanagari: 'साकाम पीठा (सरजोम साकाम रे तीयार पीठा)',
          titleRoman: 'Sakam Pitha',
          subtitle: 'साल के पत्तों में भाप से पकाया गया चावल-गुड़ पीठा',
          summary: 'संताल समाज का सबसे पावन पारंपरिक व्यंजन, सोहराय और बाहा पर्व में सरजोम (साल) के पत्तों में लपेटकर पकाया जाता है।'
        },
        {
          id: 'letter_l1',
          category: 'letter',
          categoryLabel: 'औपचारिक पत्र (Letter Template)',
          titleDevanagari: 'बापला नेवता साकाम (विवाह निमंत्रण पत्र)',
          titleRoman: 'Bapla Newta Sakam',
          subtitle: 'सगुन बापला नेवता साकाम (पारंपरिक विवाह निमंत्रण)',
          summary: 'पारंपरिक संताली विवाह में कुटुंब व ग्रामीणों को सादर निमंत्रण देने हेतु साल के पत्ते और हल्दी-सिंदूर टीके के साथ भेजा जाने वाला प्रारूप।'
        },
        {
          id: 'pilgrim_p1',
          category: 'pilgrimage',
          categoryLabel: 'पवित्र तीर्थ (Pilgrimage)',
          titleDevanagari: 'लुगुबुरु घण्टाबाड़ी धोरोम गाढ़',
          titleRoman: 'Luguburu Ghantabari Dhorom Garh',
          subtitle: 'गोमिया, बोकारो (झारखंड)',
          summary: 'संतालों का सर्वोच्च पावन तीर्थ स्थल जहां कार्तिक पूर्णिमा को महाधर्म सम्मेलन आयोजित होता है।'
        },
        {
          id: 'riddle_q1',
          category: 'riddle',
          categoryLabel: 'कुदुम पहेली (Riddle)',
          titleDevanagari: 'उकु-चुकु सिता नाड़गो, लुपंग-लुपंग चेटान राकाप',
          titleRoman: 'Uku-chuku sita nargo, lupang-lupang chetan rakap',
          subtitle: 'उत्तर: बाल्ती आर दाक् (कुएं की बाल्टी)',
          summary: 'छुपते हुए नीचे जाती है और भारी होकर ऊपर आती है - कुएं की बाल्टी।'
        }
      ];
      initialSeeds.forEach((seed) => toggleFavorite(seed));
      items = getFavorites();
    }
    setFavorites(items);
  };

  useEffect(() => {
    loadFavorites();
    const handleUpdate = () => loadFavorites();
    window.addEventListener('santali-favorites-updated', handleUpdate);
    return () => window.removeEventListener('santali-favorites-updated', handleUpdate);
  }, []);

  const handleDelete = (id: string) => {
    removeFavorite(id);
    loadFavorites();
  };

  const handleCopy = (item: FavoriteItem) => {
    const text = `${item.titleDevanagari} (${item.titleRoman})\n${item.subtitle ? item.subtitle + '\n' : ''}${item.summary}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = favorites.filter((fav) => {
    const matchesSearch =
      fav.titleDevanagari.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fav.titleRoman.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fav.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || fav.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'recipe':
        return <Utensils size={16} className="text-amber-600" />;
      case 'pilgrimage':
        return <MapPin size={16} className="text-emerald-600" />;
      case 'letter':
        return <FileText size={16} className="text-blue-600" />;
      case 'riddle':
        return <HelpCircle size={16} className="text-purple-600" />;
      case 'dialogue':
        return <MessageSquare size={16} className="text-rose-600" />;
      default:
        return <BookOpen size={16} className="text-amber-600" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-stone-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-800/40 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <BookMarked size={280} />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-3">
            <Sparkles size={14} />
            <span>इञाक् साकाम - ऑफ़लाइन नोटबुक व पसंदीदा संग्रह</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-amber-100 flex items-center gap-3">
            <span>इञाक् साकाम (मेरी पसंदीदा डायरी)</span>
            <button
              onClick={() => speakWithFemaleVoice('इञाक् साकाम आर कुशीयाक् संग्रह')}
              className="p-2 rounded-full bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 transition-colors"
              title="सुनें"
            >
              <Volume2 size={22} />
            </button>
          </h1>
          <p className="text-amber-200/80 text-sm sm:text-base mt-2 leading-relaxed">
            आपके द्वारा स्टार (⭐) किए गए सभी संताली पारंपरिक व्यंजन, तीर्थ स्थल, औपचारिक पत्र, पहेलियां और महत्वपूर्ण शब्दावली यहां आपके डिवाइस में हमेशा ऑफ़लाइन सुरक्षित रहते हैं।
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-88">
          <Search size={18} className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
            isListening ? 'text-rose-600' : 'text-slate-400'
          }`} />
          <input
            type="text"
            placeholder={isListening ? 'सुन रहे हैं... बोलिए...' : 'डायरी में खोजें (बोलकर या लिखकर)...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-20 py-2 rounded-xl border text-sm transition-all ${
              isListening
                ? 'border-rose-400 ring-2 ring-rose-300/60 bg-rose-50/40 text-rose-950 font-medium'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500'
            }`}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[11px] text-slate-400 hover:text-slate-600 px-1 py-0.5"
              >
                ✕
              </button>
            )}
            <button
              type="button"
              onClick={toggleListening}
              title={isListening ? 'वॉइस सर्च बंद करें' : 'बोलकर खोजें'}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse shadow-xs ring-2 ring-rose-300'
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300/50'
              }`}
            >
              <Mic size={14} className={isListening ? 'animate-bounce text-white' : ''} />
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {[
            { id: 'all', label: `सभी (${favorites.length})` },
            { id: 'recipe', label: 'व्यंजन' },
            { id: 'letter', label: 'पत्र' },
            { id: 'pilgrimage', label: 'तीर्थ' },
            { id: 'riddle', label: 'पहेली' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Favorites List */}
      {filtered.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
          <Bookmark size={48} className="mx-auto text-amber-400 opacity-60" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            कोई पसंदीदा आइटम नहीं मिला
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            व्यंजन, पत्र, तीर्थ या पहेली मॉड्यूल में स्टार (⭐) बटन दबाकर अपनी पसंद की सामग्री को यहां सेव करें।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-200/50 dark:border-amber-900/40">
                    {getCategoryIcon(item.category)}
                    <span>{item.categoryLabel}</span>
                  </span>
                  <span className="text-[11px] text-slate-400">{item.savedAt}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-start justify-between gap-2">
                    <span>{item.titleDevanagari}</span>
                    <button
                      onClick={() => speakWithFemaleVoice(item.titleDevanagari)}
                      className="text-amber-600 hover:text-amber-700 dark:text-amber-400 p-1 rounded-lg hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors shrink-0"
                      title="उच्चारण सुनें"
                    >
                      <Volume2 size={16} />
                    </button>
                  </h3>
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold mt-0.5">
                    {item.titleRoman}
                  </p>
                  {item.subtitle && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">
                      {item.subtitle}
                    </p>
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  {item.summary}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 mt-4">
                <button
                  onClick={() => handleCopy(item)}
                  className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-amber-600 transition-colors"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check size={14} className="text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">कॉपी हो गया!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>कॉपी करें</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center gap-1 text-xs font-semibold text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  title="हटाएं"
                >
                  <Trash2 size={14} />
                  <span>हटाएं</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
