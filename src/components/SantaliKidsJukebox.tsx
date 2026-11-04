import React, { useState, useEffect } from 'react';
import { speakWithFemaleVoice, playAcousticChime } from '../utils/speech';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import {
  Sparkles,
  Volume2,
  Play,
  RotateCcw,
  Smile,
  Heart,
  Sun,
  CloudRain,
  Bird,
  Music,
  Edit2,
  Trash2,
  Plus,
  X,
  Save
} from 'lucide-react';

export interface RhymeVerse {
  devanagari: string;
  roman: string;
  hindi: string;
}

export interface RhymeItem {
  id: string;
  titleDevanagari: string;
  titleRoman: string;
  titleHindi: string;
  badge: string;
  themeGradient: string;
  icon: string;
  verses: RhymeVerse[];
}

const DEFAULT_KIDS_RHYMES: RhymeItem[] = [
  {
    id: 'r_hapa',
    titleDevanagari: 'हापा हापा चेँड़े',
    titleRoman: 'Hapa Hapa Chene',
    titleHindi: 'ठहरो ठहरो नन्ही चिड़िया',
    badge: 'Bird Rhyme',
    themeGradient: 'from-amber-400 via-orange-400 to-rose-400',
    icon: '🐦',
    verses: [
      {
        devanagari: 'हापा हापा चेँड़े, दारे चेतान रे।',
        roman: 'Hapa hapa chene, dare chetan re.',
        hindi: 'ठहरो ठहरो नन्ही चिड़िया, पेड़ की डालियों पर।'
      },
      {
        devanagari: 'आमाक रासका सेरेञ, आंजोम मे आले।',
        roman: 'Amag raska serenj, anjom me ale.',
        hindi: 'अपना मीठा गीत, हम बच्चों को सुनाओ।'
      },
      {
        devanagari: 'फार-फार उड़ावक आम, सेरमा चेतान रे।',
        roman: 'Phar-phar udawg am, serma chetan re.',
        hindi: 'फर-फर उड़ती जाती हो, नीले गगन की ओर।'
      }
    ]
  },
  {
    id: 'r_dag',
    titleDevanagari: 'दाक हिजुक मे',
    titleRoman: 'Dag Hijug Me',
    titleHindi: 'बरसो बरसो मेघ पानी',
    badge: 'Rain Rhyme',
    themeGradient: 'from-sky-400 via-blue-500 to-cyan-500',
    icon: '🌧️',
    verses: [
      {
        devanagari: 'दाक हिजुक मे दाक जाड़ी, हाकु को रासकाक आड़ि।',
        roman: 'Dag hijug me dag jari, haku ko raskag adi.',
        hindi: 'बरसो बरसो झमझम पानी, खुश हो रही हैं मछलियां रानी।'
      },
      {
        devanagari: 'हुड़ु चावले हारियारोक, धर्ती पेरेजोक।',
        roman: 'Huru chawle hariyarog, dharti perejog.',
        hindi: 'खेतों में धान लहलहाएगा, धरती पर खुशहाली छाएगा।'
      },
      {
        devanagari: 'गिदरा को को एनेज दाड़ा, दाक रे दाड़ा दाड़ा।',
        roman: 'Gidra ko ko enej dara, dag re dara dara.',
        hindi: 'बच्चे सारे भीगते जाएं, खुशी से ताली बजाएं।'
      }
    ]
  },
  {
    id: 'r_chando',
    titleDevanagari: 'चांदो माला चेतान रे',
    titleRoman: 'Chando Mala Chetan Re',
    titleHindi: 'चंदा मामा दूर गगन में',
    badge: 'Lullaby Moon',
    themeGradient: 'from-purple-400 via-indigo-500 to-sky-500',
    icon: '🌙',
    verses: [
      {
        devanagari: 'चांदो माला चेतान रे, चांदो जुलुक कान।',
        roman: 'Chando mala chetan re, chando julug kan.',
        hindi: 'चांद चमके दूर गगन में, चांदी का प्रकाश बिखेरे।'
      },
      {
        devanagari: 'आयॊ ल़य-आ काहनी, गिदरा जापिद कान।',
        roman: 'Aayo lay-a kahni, gidra japid kan.',
        hindi: 'मां सुनाती मीठी कहानी, सो गए नन्हें राजकुमार।'
      }
    ]
  }
];

export const SantaliKidsJukebox: React.FC = () => {
  const { isAdmin } = useAdmin();

  // Persistent Rhymes list
  const [rhymesList, setRhymesList] = useState<RhymeItem[]>(() => {
    return safeLoadFromStorage('hor_katha_rhymes_db', DEFAULT_KIDS_RHYMES);
  });

  useEffect(() => {
    safeSaveToStorage('hor_katha_rhymes_db', rhymesList);
  }, [rhymesList]);

  const [selectedRhyme, setSelectedRhyme] = useState<RhymeItem>(() => rhymesList[0] || DEFAULT_KIDS_RHYMES[0]);
  const [singingIdx, setSingingIdx] = useState<number | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formDevanagari, setFormDevanagari] = useState('');
  const [formRoman, setFormRoman] = useState('');
  const [formHindi, setFormHindi] = useState('');
  const [formBadge, setFormBadge] = useState('Kids Poem');
  const [formIcon, setFormIcon] = useState('🎶');
  const [formVersesText, setFormVersesText] = useState('');

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormDevanagari('');
    setFormRoman('');
    setFormHindi('');
    setFormBadge('Kids Rhyme');
    setFormIcon('🌸');
    setFormVersesText('हापा हापा चेँड़े = Hapa hapa chene = ठहरो ठहरो नन्ही चिड़िया\nदारे चेतान रे = Dare chetan re = पेड़ की डालियों पर');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (rhyme: RhymeItem) => {
    setEditingId(rhyme.id);
    setFormDevanagari(rhyme.titleDevanagari);
    setFormRoman(rhyme.titleRoman);
    setFormHindi(rhyme.titleHindi);
    setFormBadge(rhyme.badge);
    setFormIcon(rhyme.icon);
    const versesStr = rhyme.verses
      .map((v) => `${v.devanagari} = ${v.roman} = ${v.hindi}`)
      .join('\n');
    setFormVersesText(versesStr);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (window.confirm('Are you sure you want to delete this rhyme?')) {
      const updated = rhymesList.filter((r) => r.id !== id);
      setRhymesList(updated);
      if (selectedRhyme.id === id && updated.length > 0) {
        setSelectedRhyme(updated[0]);
      }
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRoman || !formHindi) {
      alert('Please fill at least Rhyme Title in Roman and Hindi.');
      return;
    }

    const parsedVerses: RhymeVerse[] = formVersesText
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line) => {
        const parts = line.split('=').map((p) => p.trim());
        return {
          devanagari: parts[0] || '',
          roman: parts[1] || parts[0] || '',
          hindi: parts[2] || parts[1] || parts[0] || ''
        };
      });

    if (parsedVerses.length === 0) {
      parsedVerses.push({
        devanagari: formDevanagari,
        roman: formRoman,
        hindi: formHindi
      });
    }

    if (editingId) {
      const updated = rhymesList.map((r) => {
        if (r.id === editingId) {
          const mod: RhymeItem = {
            ...r,
            titleDevanagari: formDevanagari || formRoman,
            titleRoman: formRoman,
            titleHindi: formHindi,
            badge: formBadge,
            icon: formIcon,
            verses: parsedVerses
          };
          if (selectedRhyme.id === editingId) {
            setSelectedRhyme(mod);
          }
          return mod;
        }
        return r;
      });
      setRhymesList(updated);
    } else {
      const newRhyme: RhymeItem = {
        id: `r_${Date.now()}`,
        titleDevanagari: formDevanagari || formRoman,
        titleRoman: formRoman,
        titleHindi: formHindi,
        badge: formBadge,
        themeGradient: 'from-pink-500 via-rose-500 to-amber-500',
        icon: formIcon,
        verses: parsedVerses
      };
      setRhymesList((prev) => [newRhyme, ...prev]);
      setSelectedRhyme(newRhyme);
    }
    setIsModalOpen(false);
  };

  const handleSingVerse = (idx: number) => {
    setSingingIdx(idx);
    const verse = selectedRhyme.verses[idx];
    playAcousticChime(659.25, 0.2);
    setTimeout(() => {
      speakWithFemaleVoice(`${verse.hindi}. ${verse.roman}`, {
        lang: 'hi-IN',
        pitch: 1.25,
        rate: 0.85,
        onEnd: () => {
          if (idx + 1 < selectedRhyme.verses.length) {
            handleSingVerse(idx + 1);
          } else {
            setSingingIdx(null);
          }
        }
      });
    }, 150);
  };

  const handleStop = () => {
    window.speechSynthesis?.cancel();
    setSingingIdx(null);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans">
      {/* Banner */}
      <div className="bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/25 text-[11px] font-bold uppercase tracking-wider">
              Children &amp; Primary Learners
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-300 text-slate-950 text-[10px] font-black uppercase">
              गिदरा सेरेञ
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mt-1.5 tracking-tight flex items-center gap-2.5">
            <Smile className="w-7 h-7 text-amber-200" />
            <span>Santali Kids Rhymes &amp; Nursery Jukebox</span>
          </h1>
          <p className="text-xs sm:text-sm text-pink-100 font-medium mt-1">
            Sing along to cheerful Santali nursery poems with female voice melodies and playful karaoke lines.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isAdmin && (
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Add Rhyme (कविता जोड़ें)</span>
            </button>
          )}

          {/* Global Play Rhyme Button */}
          <button
            onClick={() => (singingIdx !== null ? handleStop() : handleSingVerse(0))}
            className="px-5 py-2.5 rounded-2xl bg-white hover:bg-pink-50 text-pink-700 font-black text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-105"
          >
            {singingIdx !== null ? <RotateCcw className="w-4 h-4" /> : <Play className="w-4 h-4 fill-pink-600" />}
            <span>{singingIdx !== null ? 'Stop Song' : 'Sing Full Rhyme'}</span>
          </button>
        </div>
      </div>

      {/* Rhyme Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {rhymesList.map((rhyme) => {
          const isSelected = rhyme.id === selectedRhyme.id;
          return (
            <div
              key={rhyme.id}
              onClick={() => {
                handleStop();
                setSelectedRhyme(rhyme);
              }}
              className={`p-4 rounded-3xl border text-left transition-all cursor-pointer flex flex-col justify-between relative group ${
                isSelected
                  ? 'border-pink-500 bg-pink-50/70 shadow-sm scale-102 ring-2 ring-pink-500/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{rhyme.icon}</span>

                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-pink-700 bg-pink-100 px-2 py-0.5 rounded-full">
                    {rhyme.badge}
                  </span>

                  {/* Admin Pen and Trash */}
                  {isAdmin && (
                    <div className="flex items-center gap-0.5 ml-1 bg-white/90 p-1 rounded-lg border border-pink-200">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEdit(rhyme);
                        }}
                        className="p-1 text-slate-500 hover:text-pink-600 rounded transition-colors cursor-pointer"
                        title="Edit Rhyme"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(rhyme.id, e)}
                        className="p-1 text-slate-500 hover:text-rose-600 rounded transition-colors cursor-pointer"
                        title="Delete Rhyme"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-3">
                <h3 className="font-serif font-black text-slate-900 text-base">{rhyme.titleDevanagari}</h3>
                <p className="text-xs font-bold text-pink-700">{rhyme.titleRoman}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{rhyme.titleHindi}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Karaoke / Recitation Player Board */}
      <div className="bg-white rounded-3xl border border-pink-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-pink-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-pink-600">
              Interactive Karaoke Recitation
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 mt-1">
              {selectedRhyme.titleDevanagari}
            </h2>
            <p className="text-sm font-bold text-pink-700">{selectedRhyme.titleRoman} · {selectedRhyme.titleHindi}</p>
          </div>

          <button
            onClick={() => handleSingVerse(0)}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-black text-xs flex items-center gap-2 shadow-md hover:scale-105 cursor-pointer transition-all"
          >
            <Volume2 className="w-4 h-4" />
            <span>Play Verse 1</span>
          </button>
        </div>

        {/* Verses List */}
        <div className="space-y-4">
          {selectedRhyme.verses.map((verse, idx) => {
            const isSingingThis = singingIdx === idx;
            return (
              <div
                key={idx}
                onClick={() => handleSingVerse(idx)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  isSingingThis
                    ? 'border-pink-500 bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-transparent shadow-md scale-102'
                    : 'border-slate-100 bg-slate-50/50 hover:bg-pink-50/40 hover:border-pink-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-xs shrink-0 ${
                      isSingingThis
                        ? 'bg-pink-600 text-white animate-bounce'
                        : 'bg-white border border-slate-200 text-slate-700'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-serif font-black text-lg sm:text-xl text-slate-900 leading-snug">
                      {verse.devanagari}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-pink-800 mt-0.5">{verse.roman}</p>
                    <p className="text-xs text-slate-600 mt-1 italic font-medium">"{verse.hindi}"</p>
                  </div>
                </div>

                <div className="shrink-0">
                  <div
                    className={`p-2.5 rounded-2xl transition-all ${
                      isSingingThis ? 'bg-pink-600 text-white shadow-md' : 'bg-white text-slate-400 hover:text-pink-600 border border-slate-200'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RHYME ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 overflow-y-auto max-h-[92vh] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <Smile className="w-5 h-5 text-pink-600" />
                <span>{editingId ? 'Edit Kids Rhyme' : 'Add New Rhyme (बाल कविता जोड़ें)'}</span>
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
                <label className="font-bold text-slate-700 block mb-1">Title in Santali Devanagari (संताली देवनागरी)</label>
                <input
                  type="text"
                  value={formDevanagari}
                  onChange={(e) => setFormDevanagari(e.target.value)}
                  placeholder="e.g. हापा हापा चेँड़े"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none font-serif text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Title in Roman Script *</label>
                <input
                  type="text"
                  required
                  value={formRoman}
                  onChange={(e) => setFormRoman(e.target.value)}
                  placeholder="e.g. Hapa Hapa Chene"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Title in Hindi *</label>
                <input
                  type="text"
                  required
                  value={formHindi}
                  onChange={(e) => setFormHindi(e.target.value)}
                  placeholder="e.g. ठहरो ठहरो नन्ही चिड़िया"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Badge / Category</label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    placeholder="e.g. Bird Rhyme / Rain Rhyme"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Icon / Emoji</label>
                  <input
                    type="text"
                    value={formIcon}
                    onChange={(e) => setFormIcon(e.target.value)}
                    placeholder="e.g. 🐦 / 🌧️ / 🌸"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Verses (पंक्तियाँ) — Format: SantaliDevanagari = Roman = Hindi (1 verse per line)
                </label>
                <textarea
                  rows={4}
                  required
                  value={formVersesText}
                  onChange={(e) => setFormVersesText(e.target.value)}
                  placeholder="हापा हापा चेँड़े = Hapa hapa chene = ठहरो ठहरो नन्ही चिड़िया&#10;दारे चेतान रे = Dare chetan re = पेड़ की डालियों पर"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none font-mono text-[11px]"
                />
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
                  className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-black flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingId ? 'Update Rhyme' : 'Add to Jukebox'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
