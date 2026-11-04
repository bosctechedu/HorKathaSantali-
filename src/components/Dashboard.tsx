import React, { useState } from 'react';
import { ActiveDesktopTab, ScriptType } from '../types';
import { CulturalTree } from './CulturalTree';
import { SantaliHeritageSlideshow } from './SantaliHeritageSlideshow';
import { useAdmin } from '../context/AdminContext';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  Keyboard,
  BookOpen,
  Camera,
  GraduationCap,
  Languages,
  Search,
  ArrowRight,
  Mic,
  Volume2,
  FileText,
  Printer,
  Flame,
  Trophy,
  ShieldCheck,
  Edit3,
  Check,
  X,
  RotateCcw,
  Globe,
  PenTool,
  MessageSquare,
  Layers,
  Sparkles,
  Palette,
  HelpCircle,
  Calendar,
  Gamepad2,
  Headphones,
  Music,
  Users,
  Smile,
  Clock,
  Shield,
  TreePine,
  Baby,
  Hammer,
  Coffee,
  Target,
  UtensilsCrossed,
  HeartHandshake,
  Compass,
  Scroll
} from 'lucide-react';
import { TextSpeakerReader } from './TextSpeakerReader';

interface DashboardProps {
  onNavigate: (tab: ActiveDesktopTab) => void;
  activeScript: ScriptType;
  onScriptChange: (script: ScriptType) => void;
  onOpenSearch?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onNavigate,
  activeScript,
  onScriptChange,
  onOpenSearch
}) => {
  const { isAdmin, heroConfig, updateHeroConfig, resetHeroConfig, words } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditingHero, setIsEditingHero] = useState(false);
  const [editedTitle, setEditedTitle] = useState(heroConfig.welcomeTitle);
  const [editedSub, setEditedSub] = useState(heroConfig.subTitle);
  const [editedMotto, setEditedMotto] = useState(heroConfig.motto);
  const [editedQuote, setEditedQuote] = useState(heroConfig.quoteEnglish);
  const [editedQuoteSantali, setEditedQuoteSantali] = useState(heroConfig.quoteSantali);

  const recentWords = words.slice(0, 5);

  const handleSaveHero = () => {
    updateHeroConfig({
      welcomeTitle: editedTitle,
      subTitle: editedSub,
      motto: editedMotto,
      quoteEnglish: editedQuote,
      quoteSantali: editedQuoteSantali
    });
    setIsEditingHero(false);
  };

  const handleSpeak = (text: string) => {
    speakWithFemaleVoice(text, { lang: 'hi-IN', rate: 0.88 });
  };

  const featureCards = [
    {
      id: 'keyboard' as ActiveDesktopTab,
      title: 'Santali Keyboard',
      subtitle: 'Multilingual input in Santali Devanagari & Roman',
      icon: Keyboard,
      gradient: 'from-sky-500 to-blue-600',
      actionText: 'Open Keyboard'
    },
    {
      id: 'dashboard' as ActiveDesktopTab,
      targetTab: 'dashboard' as ActiveDesktopTab,
      title: 'Dictionary',
      subtitle: `${words.length}+ words with audio pronunciation`,
      icon: BookOpen,
      gradient: 'from-amber-500 to-orange-600',
      actionText: 'Explore Words'
    },
    {
      id: 'calendar' as ActiveDesktopTab,
      title: 'Cultural Festivals (पर्व)',
      subtitle: 'सोहराय, बाहा, करम पर्वों का विस्तृत लेख व लोकगीत',
      icon: Calendar,
      gradient: 'from-amber-600 to-orange-700',
      actionText: 'Explore Festivals'
    },
    {
      id: 'learn' as ActiveDesktopTab,
      title: 'Learn Santali Devanagari',
      subtitle: 'Master letters, grammar & daily vocabulary',
      icon: GraduationCap,
      gradient: 'from-emerald-500 to-teal-600',
      actionText: 'Start Learning'
    },
    {
      id: 'translator' as ActiveDesktopTab,
      title: 'Translator',
      subtitle: 'Santali (Devanagari/Roman) ↔ Hindi & English',
      icon: Languages,
      gradient: 'from-rose-500 to-pink-600',
      actionText: 'Translate'
    },
    {
      id: 'daily_quiz' as ActiveDesktopTab,
      title: 'Daily Vocab Quiz',
      subtitle: '5 words every day, streak & rewards',
      icon: Flame,
      gradient: 'from-amber-500 via-orange-500 to-rose-600',
      actionText: "Take Today's Quiz"
    },
    {
      id: 'family_tree' as ActiveDesktopTab,
      title: 'Kinship & Relations (साग़य)',
      subtitle: 'चाचा, मामा, बुआ, ससुराल रिश्ते व परंपरा',
      icon: Users,
      gradient: 'from-teal-600 to-cyan-700',
      actionText: 'View Family Tree'
    },
    {
      id: 'phrasebook' as ActiveDesktopTab,
      title: 'Everyday Phrasebook',
      subtitle: 'Spoken daily dialogues with audio playback',
      icon: MessageSquare,
      gradient: 'from-emerald-600 to-teal-700',
      actionText: 'Browse Phrases'
    },
    {
      id: 'flashcards' as ActiveDesktopTab,
      title: 'Vocabulary Flashcards',
      subtitle: 'Flip card memory practice & quick review',
      icon: Layers,
      gradient: 'from-violet-600 to-purple-700',
      actionText: 'Flip Cards'
    },
    {
      id: 'calligraphy' as ActiveDesktopTab,
      title: 'Calligraphy & Posters',
      subtitle: 'Create Santali Devanagari festival posters & art',
      icon: Palette,
      gradient: 'from-amber-700 to-orange-800',
      actionText: 'Design Poster'
    },
    {
      id: 'kudum' as ActiveDesktopTab,
      title: 'Kudum & Proverbs',
      subtitle: 'Traditional Santali folklore riddles & wisdom',
      icon: HelpCircle,
      gradient: 'from-teal-600 to-emerald-700',
      actionText: 'Solve Riddles'
    },
    {
      id: 'calendar' as ActiveDesktopTab,
      title: 'Cultural Calendar',
      subtitle: 'Sohrai, Baha & indigenous festival seasons',
      icon: Calendar,
      gradient: 'from-orange-600 to-red-700',
      actionText: 'View Seasons'
    },
    {
      id: 'wordle' as ActiveDesktopTab,
      title: 'Santali Wordle',
      subtitle: '5-letter daily vocabulary puzzle game',
      icon: Gamepad2,
      gradient: 'from-purple-600 to-indigo-700',
      actionText: 'Play Wordle'
    },
    {
      id: 'stories' as ActiveDesktopTab,
      title: 'Folk Stories Audio',
      subtitle: 'Pandit Raghunath Murmu & Hul 1855 history',
      icon: Headphones,
      gradient: 'from-stone-700 to-amber-900',
      actionText: 'Listen Stories'
    },
    {
      id: 'speech_coach' as ActiveDesktopTab,
      title: 'Pronunciation Coach',
      subtitle: 'Speech recognition & accent scoring feedback',
      icon: Mic,
      gradient: 'from-teal-600 to-cyan-700',
      actionText: 'Test Accent'
    },
    {
      id: 'speaker' as ActiveDesktopTab,
      title: 'Voice Speaker & Reader',
      subtitle: 'Universal speech synthesizer for any text',
      icon: Volume2,
      gradient: 'from-amber-500 to-orange-600',
      actionText: 'Read Aloud'
    },
    {
      id: 'instruments' as ActiveDesktopTab,
      title: 'Instruments & Rhythm',
      subtitle: 'Playable Tamak, Tumdak, Tiriyo & Banam',
      icon: Music,
      gradient: 'from-red-600 to-amber-700',
      actionText: 'Play Drums'
    },
    {
      id: 'family_tree' as ActiveDesktopTab,
      title: 'Kinship & Family Relations',
      subtitle: 'Santali family tree terms & customs with audio',
      icon: Users,
      gradient: 'from-emerald-700 to-teal-800',
      actionText: 'Explore Tree'
    },
    {
      id: 'kids_rhymes' as ActiveDesktopTab,
      title: 'Kids Rhymes Jukebox',
      subtitle: 'Sing along to colorful poems & nursery songs',
      icon: Smile,
      gradient: 'from-pink-600 to-rose-600',
      actionText: 'Sing Rhymes'
    },
    {
      id: 'clock_numbers' as ActiveDesktopTab,
      title: 'Speaking Clock & Numbers',
      subtitle: 'Live spoken time & 1 to 100 counting chart',
      icon: Clock,
      gradient: 'from-indigo-600 to-purple-700',
      actionText: 'Check Time'
    },
    {
      id: 'clans' as ActiveDesktopTab,
      title: '12 Sacred Clans (Paris)',
      subtitle: 'Totem symbols, ancestral history & clan laws',
      icon: Shield,
      gradient: 'from-amber-700 to-stone-800',
      actionText: 'View Clans'
    },
    {
      id: 'flora_worksheets' as ActiveDesktopTab,
      title: 'Sacred Flora & Worksheets',
      subtitle: 'Medicinal forest trees & printable A4 PDFs',
      icon: TreePine,
      gradient: 'from-green-700 to-emerald-900',
      actionText: 'Print Worksheets'
    },
    {
      id: 'baby_names' as ActiveDesktopTab,
      title: 'पारंपरिक नामकरण गाइड (200+)',
      subtitle: 'दादा-दादी के नाम पर नामकरण नियम व अर्थ',
      icon: Baby,
      gradient: 'from-rose-500 to-amber-600',
      actionText: 'Explore Names'
    },
    {
      id: 'ornaments_jewellery' as ActiveDesktopTab,
      title: 'पारंपरिक आभूषण व शृंगार (12)',
      subtitle: 'हांसली, खागड़ा, साकम, रासा व तोड़ा कला',
      icon: Sparkles,
      gradient: 'from-amber-600 to-orange-700',
      actionText: 'View Ornaments'
    },
    {
      id: 'blacksmithy_iron' as ActiveDesktopTab,
      title: 'कामार लोहार शिल्प व हथियार',
      subtitle: 'दातरम, तांगा, सार-फासी व देशी धौंकनी',
      icon: Hammer,
      gradient: 'from-stone-700 to-neutral-900',
      actionText: 'Discover Craft'
    },
    {
      id: 'seasons_weather' as ActiveDesktopTab,
      title: '६ ऋतुएँ व मौसम पूर्वानुमान',
      subtitle: 'सितांग, जापानी, दासांय व चींटियों-पक्षियों के संकेत',
      icon: Clock,
      gradient: 'from-teal-600 to-cyan-700',
      actionText: 'Check Seasons'
    },
    {
      id: 'idioms_menkatha' as ActiveDesktopTab,
      title: 'संताली मुहावरे (मेनकाथा)',
      subtitle: 'दार्शनिक जीवन-दर्शन, लाक्षणिक अर्थ व बोलचाल',
      icon: MessageSquare,
      gradient: 'from-amber-700 to-orange-800',
      actionText: 'Learn Idioms'
    },
    {
      id: 'herbal_drinks' as ActiveDesktopTab,
      title: 'पारंपरिक पेय व प्राकृतिक शरबत',
      subtitle: 'महुआ रस, इचाक् चाय, मांडी दाक् व पोचोई मर्यादा',
      icon: Coffee,
      gradient: 'from-emerald-700 to-teal-900',
      actionText: 'View Drinks'
    },
    {
      id: 'archery_simulator' as ActiveDesktopTab,
      title: 'आक-सार धनुर्विद्या सिमुलेटर',
      subtitle: 'पारंपरिक बेझा तुञ व संताली शब्द निशाना खेल',
      icon: Target,
      gradient: 'from-orange-600 to-amber-700',
      actionText: 'Play Archery'
    },
    {
      id: 'traditional_cuisine' as ActiveDesktopTab,
      title: 'संताली पारंपरिक पाककला व व्यंजन',
      subtitle: 'साकाम पीठा, लेटे मंडी, रुगड़ा-ओत् व घोंघी रसा विधियां',
      icon: UtensilsCrossed,
      gradient: 'from-amber-800 to-orange-950',
      actionText: 'Explore Cuisine'
    },
    {
      id: 'marriage_rituals' as ActiveDesktopTab,
      title: '७ विवाह प्रकार व ३ जीवन संस्कार',
      subtitle: 'दुवार बापला, टुंकी दिपिल, निम दाहाक् व चाचो छातियार',
      icon: HeartHandshake,
      gradient: 'from-rose-800 to-red-950',
      actionText: 'View Rituals'
    },
    {
      id: 'riddles_kudum' as ActiveDesktopTab,
      title: 'कुदुम पहेली प्रतियोगिता खेल',
      subtitle: 'लोक पहेलियां, स्कोर बोर्ड, संकेत व ऑडियो उच्चारण',
      icon: HelpCircle,
      gradient: 'from-violet-800 to-purple-950',
      actionText: 'Play Kudum'
    },
    {
      id: 'sacred_pilgrimages' as ActiveDesktopTab,
      title: 'पावन तीर्थ व ऐतिहासिक गढ़',
      subtitle: 'लुगु बुरु, अयोध्या बुरु, भोगनाडीह हूल स्मारक व चांपा गढ़',
      icon: Compass,
      gradient: 'from-emerald-800 to-teal-950',
      actionText: 'Visit Pilgrimages'
    },
    {
      id: 'spoken_dialogues' as ActiveDesktopTab,
      title: 'दैनिक संताली बोलचाल संवाद',
      subtitle: 'हाट-बाजार, सत्कार, कृषि व वैद्य परामर्श वार्तालाप',
      icon: MessageSquare,
      gradient: 'from-blue-800 to-indigo-950',
      actionText: 'Learn Dialogues'
    },
    {
      id: 'letter_templates' as ActiveDesktopTab,
      title: 'औपचारिक पत्र व नेवता साकाम',
      subtitle: 'विवाह निमंत्रण, मांझी हाड़ाम आवेदन व सभा सूचना',
      icon: FileText,
      gradient: 'from-stone-800 to-amber-950',
      actionText: 'Open Templates'
    },
    {
      id: 'illustrated_stories' as ActiveDesktopTab,
      title: 'सचित्र संताली लोककथाएं',
      subtitle: 'पिलचु हाड़ाम-बूढ़ी, चालाक तूंईऊ व करम-धरम कथाएं',
      icon: BookOpen,
      gradient: 'from-teal-800 to-emerald-950',
      actionText: 'Read Stories'
    },
    {
      id: 'social_cards' as ActiveDesktopTab,
      title: 'सोशल मीडिया कार्ड व पोस्टर जनरेटर',
      subtitle: 'सोहराय कला बॉर्डर्स, संताली विचार व WhatsApp HD शेयर',
      icon: Sparkles,
      gradient: 'from-rose-800 to-amber-950',
      actionText: 'Create Poster'
    },
    {
      id: 'lunar_calendar' as ActiveDesktopTab,
      title: 'पारंपरिक संताली चंद्र पंचांग व पर्व टाइमर',
      subtitle: 'लाइव चंद्र कला (कुनामी/मूळ) व आगामी महापर्व काउंटडाउन',
      icon: Clock,
      gradient: 'from-indigo-900 to-slate-950',
      actionText: 'View Chando Clock'
    },
    ...(isAdmin
      ? [
          {
            id: 'admin_cms' as ActiveDesktopTab,
            title: 'Admin Master CMS',
            subtitle: 'Direct Add/Edit/Update access across all sections',
            icon: Edit3,
            gradient: 'from-slate-900 via-amber-900 to-slate-900',
            actionText: 'Open Master CMS'
          }
        ]
      : [])
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Search Bar & Script Selector (No Bengali) */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div
          onClick={onOpenSearch}
          className="relative flex-1 w-full cursor-pointer group"
        >
          <Search className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            readOnly
            onClick={onOpenSearch}
            placeholder="Search 10,000+ words, Santali Devanagari, grammar, tools... (Ctrl+K)"
            className="w-full pl-10 pr-20 py-2.5 text-xs md:text-sm text-slate-800 placeholder-slate-400 bg-slate-50/80 hover:bg-slate-100 border border-slate-200/90 rounded-xl focus:outline-none transition-all cursor-pointer"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <span className="hidden sm:inline-block font-mono text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-2xs">
              Ctrl K
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <select
            value={activeScript === 'english' ? 'english' : activeScript === 'hindi' || activeScript === 'devanagari' ? 'hindi' : 'santali'}
            onChange={(e) => onScriptChange(e.target.value as ScriptType)}
            className="text-xs bg-slate-100 hover:bg-slate-200 border-none rounded-xl px-3 py-2 font-medium text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="santali">Santali</option>
            <option value="hindi">Hindi (हिन्दी)</option>
            <option value="english">English</option>
          </select>

          <button
            onClick={() => onNavigate('learn')}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            title="Speech search"
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ═══ FULL-PAGE HERO BANNER WITH SLIDESHOW ═══ */}
      <div className="w-full relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A] border border-amber-200/80 shadow-xs p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 mb-6">
        {/* Admin Live-Edit Trigger */}
        {isAdmin && !isEditingHero && (
          <button
            onClick={() => {
              setEditedTitle(heroConfig.welcomeTitle);
              setEditedSub(heroConfig.subTitle);
              setEditedMotto(heroConfig.motto);
              setEditedQuote(heroConfig.quoteEnglish);
              setEditedQuoteSantali(heroConfig.quoteSantali);
              setIsEditingHero(true);
            }}
            className="absolute top-3 right-3 z-30 px-3 py-1.5 bg-white/90 hover:bg-white text-amber-900 border border-amber-300 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-600" />
            <span>Edit Hero Content</span>
          </button>
        )}

        {isEditingHero ? (
          /* Hero Inline Admin Editor */
          <div className="w-full z-20 bg-white/95 p-5 rounded-2xl border border-amber-300 shadow-md space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-amber-100">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Edit3 className="w-4 h-4 text-amber-600" />
                <span>Live Edit Hero Banner</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetHeroConfig}
                  className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset Default
                </button>
                <button
                  onClick={() => setIsEditingHero(false)}
                  className="p-1 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Welcome Headline</label>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Subtitle / Platform</label>
                <input
                  type="text"
                  value={editedSub}
                  onChange={(e) => setEditedSub(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Motto</label>
                <input
                  type="text"
                  value={editedMotto}
                  onChange={(e) => setEditedMotto(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">English Quote ("Our Language...")</label>
                <input
                  type="text"
                  value={editedQuote}
                  onChange={(e) => setEditedQuote(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="font-bold text-slate-700 block mb-1">Santali Slogan ("Abo Ror, Abo Uprum, Abo Gorob")</label>
                <input
                  type="text"
                  value={editedQuoteSantali}
                  onChange={(e) => setEditedQuoteSantali(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg font-serif"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsEditingHero(false)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveHero}
                className="px-4 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        ) : (
          /* Regular Hero Display */
          <>
            <div className="space-y-4 z-10 max-w-lg shrink-0 flex flex-col justify-between">
              {/* Brand Emblem & Organization Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 border border-amber-300 shadow-2xs w-fit">
                <img
                  src="/assets/aistudio/bosc-main-logo_39d98de6.png"
                  alt="BOSC"
                  className="w-5 h-5 object-contain"
                />
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-950">
                  BOSC Tech &amp; Edu
                </span>
                <span className="text-[10px] text-amber-800 font-semibold border-l border-amber-200 pl-2">
                  Official Platform
                </span>
              </div>

              {/* Main Welcome Heading */}
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-950 tracking-tight leading-tight">
                  Johar! Welcome to Hor Katha Suite
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-amber-900/90 mt-1.5 leading-relaxed">
                  Santali Language &amp; Learning Platform · BOSC Tech &amp; Edu
                </p>
              </div>

              {/* Mission Pillars (Type · Learn · Preserve · Promote) */}
              <div className="flex flex-wrap items-center gap-2 py-0.5">
                {['Type', 'Learn', 'Preserve', 'Promote'].map((pill) => (
                  <span
                    key={pill}
                    className="px-2.5 py-1 text-[11px] font-bold text-amber-950 bg-amber-200/90 border border-amber-300 rounded-lg shadow-2xs"
                  >
                    {pill}
                  </span>
                ))}
              </div>

              {/* Professional Action Area: Explore Suite Features & Direct Jumps */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <button
                  onClick={() => onNavigate('keyboard')}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-900 to-amber-950 hover:from-amber-800 hover:to-amber-900 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer ring-2 ring-amber-900/20"
                >
                  <span>Explore Suite Features</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="px-2.5 py-1.5 text-[11px] font-bold bg-white/80 hover:bg-white text-amber-950 border border-amber-300/80 rounded-lg shadow-2xs transition-colors cursor-pointer"
                  >
                    📖 Lexicon
                  </button>
                  <button
                    onClick={() => onNavigate('calendar')}
                    className="px-2.5 py-1.5 text-[11px] font-bold bg-white/80 hover:bg-white text-amber-950 border border-amber-300/80 rounded-lg shadow-2xs transition-colors cursor-pointer"
                  >
                    📅 पर्व (Festivals)
                  </button>
                  <button
                    onClick={() => onNavigate('learn')}
                    className="px-2.5 py-1.5 text-[11px] font-bold bg-white/80 hover:bg-white text-amber-950 border border-amber-300/80 rounded-lg shadow-2xs transition-colors cursor-pointer"
                  >
                    🎓 Learn
                  </button>
                  <button
                    onClick={() => onNavigate('daily_quiz')}
                    className="px-2.5 py-1.5 text-[11px] font-bold bg-white/80 hover:bg-white text-amber-950 border border-amber-300/80 rounded-lg shadow-2xs transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Flame className="w-3 h-3 text-orange-600 animate-pulse" />
                    <span>Daily Quiz</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Live 30-Picture Rotating Heritage Slideshow (Changes every 6s) & Cultural Motto */}
            <div className="relative z-10 flex flex-col items-center justify-center shrink-0 w-full lg:flex-1 lg:max-w-xl xl:max-w-2xl space-y-2">
              <SantaliHeritageSlideshow className="w-full" />
              <div className="text-center w-full px-2">
                <p className="font-serif italic text-amber-950 text-xs md:text-sm font-bold tracking-wide">
                  "{heroConfig.quoteEnglish || 'Our Language, Our Identity, Our Pride'}"
                </p>
                <p className="text-xs text-amber-900 font-medium italic mt-0.5">
                  "{heroConfig.quoteSantali || 'Abo Ror, Abo Uprum, Abo Gorob'}"
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Main Grid: Left Column & Right Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-5">

          {/* New Additions Spotlight Banners */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div
              onClick={() => onNavigate('social_cards')}
              className="p-4 rounded-2xl bg-gradient-to-r from-amber-900 via-rose-950 to-stone-900 text-white cursor-pointer shadow-xs hover:shadow-md transition-all hover:scale-[1.01] flex items-center justify-between border border-amber-600/30 group"
            >
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] uppercase tracking-wider">
                  ✨ नया स्टूडियो (HD Card)
                </span>
                <h3 className="font-black text-sm text-amber-100 group-hover:text-amber-200">
                  सोशल मीडिया कार्ड व पोस्टर
                </h3>
                <p className="text-[11px] text-amber-200/80 leading-snug">
                  सोहराय भित्तिचित्र, संताली विचार व WhatsApp स्टेटस HD शेयर
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0 text-amber-300 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            <div
              onClick={() => onNavigate('lunar_calendar')}
              className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-indigo-950 to-stone-900 text-white cursor-pointer shadow-xs hover:shadow-md transition-all hover:scale-[1.01] flex items-center justify-between border border-indigo-600/30 group"
            >
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-[10px] uppercase tracking-wider">
                  🌕 लाइव पंचांग (Live Clock)
                </span>
                <h3 className="font-black text-sm text-indigo-100 group-hover:text-indigo-200">
                  चंद्र पंचांग व महापर्व टाइमर
                </h3>
                <p className="text-[11px] text-indigo-200/80 leading-snug">
                  लाइव चंद्र कला (कुनामी/मूळ) व आगामी महापर्व काउंटडाउन
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0 text-indigo-300 group-hover:scale-110 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* 6 Core Feature Cards Grid */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Core Applications
              </h2>
              <span className="text-[11px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                {featureCards.length} Interactive Modules
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
              {featureCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    onClick={() => onNavigate(card.targetTab || card.id)}
                    className="group cursor-pointer rounded-2xl p-3.5 bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between h-40 relative overflow-hidden"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-2xs group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="my-1.5">
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                        {card.subtitle}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold text-slate-600 group-hover:text-slate-900">
                      <span>{card.actionText}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Tools Row with Professional Icons */}
          <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Quick Tools:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => onNavigate('keyboard')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200/70 transition-colors font-medium text-xs"
              >
                <Keyboard className="w-3.5 h-3.5 text-sky-600" />
                <span>Virtual Keyboard</span>
              </button>
              <button
                onClick={() => handleSpeak('जोहार! Johar! Welcome to Santali Devanagari Suite.')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200/70 transition-colors font-medium text-xs cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                <span>Listen Audio</span>
              </button>
              <button
                onClick={() => handleSpeak('ध्वनि परीक्षण सफल। स्पीकर ठीक से काम कर रहा है। Sound test passed. Speaker active.')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-lg border border-amber-300 transition-colors font-bold text-xs cursor-pointer shadow-2xs"
                title="Verify Speaker Hardware and Female Voice"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                <span>Test Speaker</span>
              </button>
              <button
                onClick={() => onNavigate('calendar')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200/70 transition-colors font-medium text-xs cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>पर्व (Festivals)</span>
              </button>
              <button
                onClick={() => onNavigate('learn')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200/70 transition-colors font-medium text-xs cursor-pointer"
              >
                <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                <span>Letter Quiz</span>
              </button>
              <button
                onClick={() => window.open('https://translate.google.com/?sl=auto&tl=hi&op=translate', '_blank', 'noopener,noreferrer')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200 transition-colors font-bold text-xs cursor-pointer"
                title="Open Google Translator (Online Instant)"
              >
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span>Google Translator</span>
              </button>
              <button
                onClick={() => onNavigate('daily_quiz')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-amber-900 rounded-lg border border-amber-300 transition-colors font-bold text-xs cursor-pointer shadow-2xs"
                title="Daily Santali Vocabulary Quiz & Streak"
              >
                <Flame className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
                <span>Daily Quiz</span>
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200/70 transition-colors font-medium text-xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span>Print PDF</span>
              </button>
            </div>
          </div>

          {/* Universal Live Voice Speaker & Reader */}
          <TextSpeakerReader />
        </div>

        {/* Right Column (4 cols on lg): Script Selector + Recent Words + Tree Quote */}
        <div className="lg:col-span-4 space-y-5">
          {/* Script Modes (Only Santali, Hindi, English) */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Language &amp; Script
              </h3>
              <span className="text-[10px] text-slate-400">3 Languages</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-xs">
              <button
                onClick={() => onScriptChange('santali_dev')}
                className={`p-2 rounded-xl border text-center transition-all ${
                  activeScript === 'santali_dev'
                    ? 'bg-amber-500 text-white font-bold shadow-2xs border-amber-600'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                संताली देवनागरी
              </button>
              <button
                onClick={() => onScriptChange('hindi')}
                className={`p-2 rounded-xl border text-center transition-all ${
                  activeScript === 'hindi' || activeScript === 'devanagari'
                    ? 'bg-amber-500 text-white font-bold shadow-2xs border-amber-600'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Hindi (हिंदी)
              </button>
              <button
                onClick={() => onScriptChange('english')}
                className={`p-2 rounded-xl border text-center transition-all ${
                  activeScript === 'english' || activeScript === 'santali_roman'
                    ? 'bg-amber-500 text-white font-bold shadow-2xs border-amber-600'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Recent Words List */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Featured Words
              </h3>
              <button
                onClick={() => onNavigate('dashboard')}
                className="text-[11px] text-sky-600 hover:underline font-semibold"
              >
                View all ({words.length}) →
              </button>
            </div>

            <div className="space-y-1.5">
              {recentWords.map((word) => (
                <div
                  key={word.id}
                  onClick={() => onNavigate('dashboard')}
                  className="p-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer border border-transparent hover:border-slate-100"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-100/70 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0">
                      {word.wordRoman.slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-amber-800">
                          {word.wordRoman}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          ({word.wordDevanagari})
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        {word.phonetic} · {word.meaningEnglish} · {word.meaningHindi.split(',')[0]}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeak(word.wordRoman);
                    }}
                    className="p-1.5 text-slate-400 hover:text-amber-700 rounded-md transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cultural Quote Card & Sacred Tree */}
          <div className="p-4 bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30 rounded-2xl border border-amber-200/70 shadow-xs text-center space-y-2">
            <div className="p-2.5 bg-amber-100/40 rounded-xl">
              <p className="text-xs italic text-amber-950 font-serif leading-relaxed">
                "Santali bhasha, amag gorob, jioom m or katna."
              </p>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                — Hor Katha Suite · BOSC Tech &amp; Edu
              </p>
            </div>
            <div className="w-full flex items-center justify-center">
              <CulturalTree variant="banner" className="w-44 h-28" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
