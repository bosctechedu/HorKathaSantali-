import React, { useState, useEffect } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import {
  BookOpen,
  Volume2,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Bookmark,
  ChevronRight,
  Headphones,
  CheckCircle2,
  Clock,
  Edit2,
  Trash2,
  Plus,
  X,
  Save
} from 'lucide-react';

export interface StoryParagraph {
  devanagari: string;
  roman: string;
  hindi: string;
}

export interface StoryEpisode {
  id: string;
  titleDevanagari: string;
  titleRoman: string;
  titleHindi: string;
  era: string;
  readTime: string;
  category: 'heritage' | 'folklore' | 'history';
  paragraphs: StoryParagraph[];
}

const DEFAULT_FOLK_STORIES: StoryEpisode[] = [
  {
    id: 's1',
    titleDevanagari: 'पंडित रघुनाथ मुर्मु आर संताली भाषा (१९२५)',
    titleRoman: 'Pandit Raghunath Murmu ar Santali Bhasa (1925)',
    titleHindi: 'गुरु गोमके पंडित रघुनाथ मुर्मु और संताली भाषा उन्नयन (1925)',
    era: 'Modern Era (1925)',
    readTime: '3 min listen',
    category: 'heritage',
    paragraphs: [
      {
        devanagari: 'पंडित रघुनाथ मुर्मु दो १९०५ साल रे ओड़िशा रेनाक मयूरभंज जिला रे जनम लेनाय।',
        roman: 'Pandit Raghunath Murmu do 1905 sal re Odisha renag Mayurbhanj jila re janam lenay.',
        hindi: 'पंडित रघुनाथ मुर्मु जी का जन्म 1905 में ओडिशा के मयूरभंज जिले में हुआ था।'
      },
      {
        devanagari: 'उनी दो ञेल केदाय जे संताली पारसी रेनाक आपनारक साहित्य दोहोय जरूड़ा, ओनाते १९२५ साल रे भाषा उन्नयन केदाय।',
        roman: 'Uni do nyel keday je Santali parsi renag apnarag sahityo dohoy jarura, onate 1925 sal re parsi unnayan keday.',
        hindi: 'उन्होंने अनुभव किया कि संताली भाषा की पहचान और साहित्य को सुरक्षित रखना अत्यंत आवश्यक है।'
      },
      {
        devanagari: 'संताली भाषा दो संताली सावता रेनाक जीवी कान आर आबोवाक गोरोब कान।',
        roman: 'Santali bhasa do Santali sawta renag jiwi kana ar abowag gorob kana.',
        hindi: 'संताली भाषा हमारे संताली समाज का जीवन-प्राण और हमारी पहचान का सर्वोच्च स्वाभिमान है।'
      }
    ]
  },
  {
    id: 's2',
    titleDevanagari: 'संताल हूल १८५५ (सिदो-कान्हू बोयहा)',
    titleRoman: 'Santhal Hul 1855 (Sido & Kanhu Murmu)',
    titleHindi: '1855 का ऐतिहासिक संताल हूल: सिदो-कान्हू का अमर बलिदान',
    era: 'British Colonial Era (1855)',
    readTime: '4 min listen',
    category: 'history',
    paragraphs: [
      {
        devanagari: '३० जून १८५५ साल रे भोगनाडीह आतो रे गेल सासाय होड़ को जावरा लेना।',
        roman: '30 June 1855 sal re Bhognadih atu re gel sasay hor ko jawra lena.',
        hindi: '30 जून 1855 को भोगनाडीह गांव में दस हजार से अधिक संताली वीरों की ऐतिहासिक सभा जुटी।'
      },
      {
        devanagari: 'सिदो, कान्हू, चांद आर भायरो बोयहा को दिसोम राखी लागिद हूल को एतोहोब केदा।',
        roman: 'Sido, Kanhu, Chand ar Bhayro boyha ko disom rakkhi lagid Hul ko etohob keda.',
        hindi: 'सिदो, कान्हू, चांद और भैरव भाइयों ने अपनी जल-जंगल-ज़मीन और स्वाधीनता की रक्षा हेतु अंग्रेजी हुकूमत के खिलाफ क्रांति का शंखनाद किया।'
      },
      {
        devanagari: 'नोवा हूल दो भारत रेनाक पुयलु फुरग़ाल लाड़हाय कान।',
        roman: 'Nowa Hul do Bharat renag puylu phurgal larhay kana.',
        hindi: 'यह महान संताल हूल भारत का प्रथम वास्तविक जन-मुक्ति संग्राम माना जाता है।'
      }
    ]
  },
  {
    id: 's3',
    titleDevanagari: 'पिलचु हाड़ाम आर पिलचु बुढ़ी (सिरजोन काहनी)',
    titleRoman: 'Pilchu Haram & Pilchu Budhi (Creation Lore)',
    titleHindi: 'पिलचु हाड़ाम और पिलचु बुढ़ी: संताली सृष्टि उत्पत्ति कथा',
    era: 'Ancestral Mythological Era',
    readTime: '3 min listen',
    category: 'folklore',
    paragraphs: [
      {
        devanagari: 'मारांग बुरु वाक दया ते हांस-हासिली चेँड़े बारया बिली किन एम केदा।',
        roman: 'Marang Buru wag daya te Has-Hasil chene barya bili kin em keda.',
        hindi: 'मरांग बुरु की अनुकंपा से हंस-हंसिली पक्षी युगल ने विशाल जलराशि के ऊपर दो पवित्र अंडे दिए।'
      },
      {
        devanagari: 'ओना बिली खोन पिलचु हाड़ाम आर पिलचु बुढ़ी किन जनम लेना।',
        roman: 'Ona bili khon Pilchu Haram ar Pilchu Budhi kin janam lena.',
        hindi: 'उन अंडों से प्रथम मानव युगल पिलचु हाड़ाम और पिलचु बुढ़ी का जन्म हुआ।'
      },
      {
        devanagari: 'उनकिन खोन गे गेलबार गोटांग पारिस (Totem Clans) बेनाव एना।',
        roman: 'Unkin khon ge gelbar gotang paris benaw ena.',
        hindi: 'उन्हीं से आगे चलकर संताली समाज के बारह गोत्र (मुरमु, किस्कू, हांसदा, हेम्ब्रम, सोरेन आदि) विकसित हुए।'
      }
    ]
  }
];

export const FolkStoriesPlayer: React.FC = () => {
  const { isAdmin } = useAdmin();

  // Persistent Stories State
  const [storiesList, setStoriesList] = useState<StoryEpisode[]>(() => {
    return safeLoadFromStorage('hor_katha_stories_db', DEFAULT_FOLK_STORIES);
  });

  useEffect(() => {
    safeSaveToStorage('hor_katha_stories_db', storiesList);
  }, [storiesList]);

  const [selectedStory, setSelectedStory] = useState<StoryEpisode>(() => storiesList[0] || DEFAULT_FOLK_STORIES[0]);
  const [playingParagraphIdx, setPlayingParagraphIdx] = useState<number | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formTitleRoman, setFormTitleRoman] = useState('');
  const [formTitleDevanagari, setFormTitleDevanagari] = useState('');
  const [formTitleHindi, setFormTitleHindi] = useState('');
  const [formEra, setFormEra] = useState('Traditional Folktale');
  const [formReadTime, setFormReadTime] = useState('3 min listen');
  const [formCategory, setFormCategory] = useState<'heritage' | 'folklore' | 'history'>('folklore');
  const [formParagraphsText, setFormParagraphsText] = useState('');

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormTitleRoman('');
    setFormTitleDevanagari('');
    setFormTitleHindi('');
    setFormEra('Tribal Folk Lore');
    setFormReadTime('3 min listen');
    setFormCategory('folklore');
    setFormParagraphsText('पंडित रघुनाथ मुर्मु = Pandit Raghunath Murmu = पंडित रघुनाथ मुर्मु जी की जीवन गाथा');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (story: StoryEpisode) => {
    setEditingId(story.id);
    setFormTitleRoman(story.titleRoman);
    setFormTitleDevanagari(story.titleDevanagari);
    setFormTitleHindi(story.titleHindi);
    setFormEra(story.era);
    setFormReadTime(story.readTime);
    setFormCategory(story.category);
    const pText = story.paragraphs
      .map((p) => `${p.devanagari} = ${p.roman} = ${p.hindi}`)
      .join('\n');
    setFormParagraphsText(pText);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (window.confirm('Are you sure you want to delete this folk story?')) {
      const updated = storiesList.filter((s) => s.id !== id);
      setStoriesList(updated);
      if (selectedStory.id === id && updated.length > 0) {
        setSelectedStory(updated[0]);
      }
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitleRoman || !formTitleHindi) {
      alert('Please fill at least the Story Title in Roman and Hindi.');
      return;
    }

    const paragraphs: StoryParagraph[] = formParagraphsText
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

    if (paragraphs.length === 0) {
      paragraphs.push({
        devanagari: formTitleDevanagari,
        roman: formTitleRoman,
        hindi: formTitleHindi
      });
    }

    if (editingId) {
      const updated = storiesList.map((s) => {
        if (s.id === editingId) {
          const mod: StoryEpisode = {
            ...s,
            titleRoman: formTitleRoman,
            titleDevanagari: formTitleDevanagari || formTitleRoman,
            titleHindi: formTitleHindi,
            era: formEra,
            readTime: formReadTime,
            category: formCategory,
            paragraphs
          };
          if (selectedStory.id === editingId) {
            setSelectedStory(mod);
          }
          return mod;
        }
        return s;
      });
      setStoriesList(updated);
    } else {
      const newStory: StoryEpisode = {
        id: `story_${Date.now()}`,
        titleRoman: formTitleRoman,
        titleDevanagari: formTitleDevanagari || formTitleRoman,
        titleHindi: formTitleHindi,
        era: formEra,
        readTime: formReadTime,
        category: formCategory,
        paragraphs
      };
      setStoriesList((prev) => [newStory, ...prev]);
      setSelectedStory(newStory);
    }
    setIsModalOpen(false);
  };

  const handlePlayParagraph = (idx: number) => {
    setPlayingParagraphIdx(idx);
    const p = selectedStory.paragraphs[idx];
    speakWithFemaleVoice(`${p.hindi}`, {
      lang: 'hi-IN',
      onEnd: () => {
        if (idx + 1 < selectedStory.paragraphs.length) {
          handlePlayParagraph(idx + 1);
        } else {
          setPlayingParagraphIdx(null);
        }
      }
    });
  };

  const handleStop = () => {
    window.speechSynthesis?.cancel();
    setPlayingParagraphIdx(null);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-800 via-stone-800 to-emerald-900 text-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider">
              Oral History &amp; Literature
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
              Audio Storyteller
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mt-1.5 tracking-tight flex items-center gap-2.5">
            <Headphones className="w-7 h-7 text-amber-300" />
            <span>Santali Folk Stories &amp; History Player</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 font-medium mt-1">
            Listen to narrated historical biographies, creation legends, and freedom fighter chronicles.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isAdmin && (
            <button
              onClick={handleOpenAdd}
              className="px-3.5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Add Story (कहानी जोड़ें)</span>
            </button>
          )}

          {/* Global Play All Button */}
          {playingParagraphIdx !== null ? (
            <button
              onClick={handleStop}
              className="px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Pause className="w-4 h-4" />
              <span>Pause Audio</span>
            </button>
          ) : (
            <button
              onClick={() => handlePlayParagraph(0)}
              className="px-5 py-2.5 rounded-2xl bg-white hover:bg-amber-50 text-slate-950 font-black text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md hover:scale-105"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Listen Story</span>
            </button>
          )}
        </div>
      </div>

      {/* Story Selector Carousel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {storiesList.map((story) => {
          const isSelected = story.id === selectedStory.id;
          return (
            <div
              key={story.id}
              onClick={() => {
                handleStop();
                setSelectedStory(story);
              }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between relative group ${
                isSelected
                  ? 'border-amber-600 bg-amber-50/70 shadow-xs ring-2 ring-amber-500/20'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded">
                    {story.era}
                  </span>

                  {/* Admin Pen and Trash */}
                  {isAdmin && (
                    <div className="flex items-center gap-0.5 bg-white/90 p-1 rounded-lg border border-amber-200">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEdit(story);
                        }}
                        className="p-1 text-slate-500 hover:text-amber-700 rounded transition-colors cursor-pointer"
                        title="Edit Story"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(story.id, e)}
                        className="p-1 text-slate-500 hover:text-rose-600 rounded transition-colors cursor-pointer"
                        title="Delete Story"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-slate-900 text-sm mt-2 line-clamp-1">
                  {story.titleHindi}
                </h3>
                <p className="font-serif font-black text-amber-950 text-xs mt-1 truncate">
                  {story.titleDevanagari}
                </p>
              </div>

              <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{story.readTime}</span>
                </span>
                <span className="font-bold text-amber-700">Open Story →</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Story Narrative Reader */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] uppercase">
            {selectedStory.category} · {selectedStory.readTime}
          </span>
          <h2 className="text-2xl font-black font-serif text-slate-900 mt-2">
            {selectedStory.titleDevanagari}
          </h2>
          <p className="text-base font-bold text-amber-800 mt-0.5">
            {selectedStory.titleHindi}
          </p>
          <p className="text-xs font-semibold text-slate-400 mt-0.5">
            {selectedStory.titleRoman}
          </p>
        </div>

        {/* Paragraphs with Synchronized Karaoke Audio */}
        <div className="space-y-4">
          {selectedStory.paragraphs.map((p, idx) => {
            const isPlayingThis = playingParagraphIdx === idx;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  isPlayingThis
                    ? 'border-amber-500 bg-amber-50/70 shadow-sm scale-[1.01]'
                    : 'border-slate-100 bg-slate-50/60 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <p className="text-lg sm:text-xl font-black font-serif text-slate-900 leading-relaxed">
                      {p.devanagari}
                    </p>
                    <p className="text-xs font-bold text-amber-800">{p.roman}</p>
                    <p className="text-xs sm:text-sm text-slate-700 pt-1 leading-relaxed border-t border-slate-200/50">
                      {p.hindi}
                    </p>
                  </div>

                  <button
                    onClick={() => handlePlayParagraph(idx)}
                    className={`p-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                      isPlayingThis
                        ? 'bg-amber-600 text-white animate-pulse'
                        : 'bg-white text-slate-500 hover:text-amber-700 border border-slate-200'
                    }`}
                    title="Play this sentence"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STORY ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 overflow-y-auto max-h-[92vh] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-600" />
                <span>{editingId ? 'Edit Folk Story' : 'Add New Folk Story (नई लोककथा जोड़ें)'}</span>
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
                <label className="font-bold text-slate-700 block mb-1">Story Title in Roman Script *</label>
                <input
                  type="text"
                  required
                  value={formTitleRoman}
                  onChange={(e) => setFormTitleRoman(e.target.value)}
                  placeholder="e.g. Santhal Hul 1855 / Pandit Raghunath Murmu..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Story Title in Santali Devanagari (संताली देवनागरी)</label>
                <input
                  type="text"
                  value={formTitleDevanagari}
                  onChange={(e) => setFormTitleDevanagari(e.target.value)}
                  placeholder="e.g. संताल हूल १८५५..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none font-serif text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Story Title in Hindi *</label>
                <input
                  type="text"
                  required
                  value={formTitleHindi}
                  onChange={(e) => setFormTitleHindi(e.target.value)}
                  placeholder="e.g. संताल हूल: सिदो-कान्हू का अमर बलिदान..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Era / Period</label>
                  <input
                    type="text"
                    value={formEra}
                    onChange={(e) => setFormEra(e.target.value)}
                    placeholder="e.g. 1855 Colonial Era / Modern Era"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="heritage">Heritage &amp; Biographies</option>
                    <option value="history">Historical Events</option>
                    <option value="folklore">Folklore &amp; Creation Lore</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Story Paragraphs — Format: SantaliDevanagari = Roman = Hindi (1 paragraph per line)
                </label>
                <textarea
                  rows={4}
                  required
                  value={formParagraphsText}
                  onChange={(e) => setFormParagraphsText(e.target.value)}
                  placeholder="संताली भाषा सावता रेनाक जीवी कान = Santali bhasa sawta renag jiwi kana = संताली भाषा समाज का गौरव है।"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono text-[11px]"
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
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingId ? 'Update Story' : 'Add to Stories'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
