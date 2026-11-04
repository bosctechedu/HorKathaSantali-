import React from 'react';
import { ActiveDesktopTab } from '../types';
import { CulturalTree } from './CulturalTree';
import { useAdmin } from '../context/AdminContext';
import {
  Home,
  Keyboard as KeyboardIcon,
  LayoutDashboard,
  GraduationCap,
  Languages,
  Bot,
  Settings,
  Info,
  HelpCircle,
  PanelLeftClose,
  ShieldCheck,
  Flame,
  MessageSquareHeart,
  MessageSquare,
  Layers,
  Palette,
  Calendar,
  Gamepad2,
  Headphones,
  Volume2,
  Music,
  Users,
  Smile,
  Clock,
  Shield,
  TreePine,
  Edit3,
  Mic,
  BookOpen,
  Landmark,
  Leaf,
  Sparkles,
  Globe,
  Heart,
  Swords,
  UtensilsCrossed,
  Target,
  Radio,
  Compass,
  Baby,
  Award,
  Quote,
  Sprout,
  Scale,
  Drama,
  Moon,
  Droplets,
  Scissors,
  Hammer,
  HeartHandshake,
  Trees,
  ShoppingBag,
  Activity,
  FileText,
  Bookmark
} from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveDesktopTab;
  onTabChange: (tab: ActiveDesktopTab) => void;
  onOpenAbout: () => void;
  onOpenHelp: () => void;
  onOpenFeedback?: () => void;
  onToggleSidebar?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  onOpenAbout,
  onOpenHelp,
  onOpenFeedback,
  onToggleSidebar
}) => {
  const { isAdmin } = useAdmin();

  // Clean menu items
  const mainNav = [
    { id: 'home' as ActiveDesktopTab, label: 'मुख्य पृष्ठ (Home)', icon: Home },
    { id: 'social_cards' as ActiveDesktopTab, label: 'सोशल मीडिया कार्ड व पोस्टर', icon: Sparkles, badge: 'HD' },
    { id: 'lunar_calendar' as ActiveDesktopTab, label: 'चंद्र पंचांग व पर्व टाइमर', icon: Moon, badge: 'लाइव' },
    { id: 'keyboard' as ActiveDesktopTab, label: 'संताली कीबोर्ड (Keyboard)', icon: KeyboardIcon },
    { id: 'dashboard' as ActiveDesktopTab, label: '10,000+ डिक्शनरी (शब्दकोश)', icon: LayoutDashboard },
    { id: 'learn' as ActiveDesktopTab, label: 'संताली देवनागरी सीखें', icon: GraduationCap },
    { id: 'favorites_notebook' as ActiveDesktopTab, label: 'इञाक् साकाम (मेरी डायरी)', icon: Bookmark, badge: '⭐' },
  ];

  const culturalNav = [
    { id: 'creation' as ActiveDesktopTab, label: 'धरती की सृष्टि (सिरजोन)', icon: Globe, badge: 'सृष्टि' },
    { id: 'dances' as ActiveDesktopTab, label: 'पारंपरिक शीर्ष १० नृत्य (एनेच)', icon: Music, badge: 'नृत्य' },
    { id: 'bonga_buru' as ActiveDesktopTab, label: 'पूजा-पाठ बोंगा-बुरु (१५)', icon: Flame, badge: 'पवित्र' },
    { id: 'hul_heroes' as ActiveDesktopTab, label: 'संथाल हुल १८५५ (महापुरुष)', icon: Swords, badge: 'हुल' },
    { id: 'marriage_bapla' as ActiveDesktopTab, label: 'विवाह संस्कार (बापला ८)', icon: Heart, badge: 'बापला' },
    { id: 'attire_ornaments' as ActiveDesktopTab, label: 'पारंपरिक वस्त्र व आभूषण', icon: Sparkles, badge: 'वस्त्र' },
    { id: 'cuisine' as ActiveDesktopTab, label: 'खान-पान व व्यंजन (जिल पीठा)', icon: UtensilsCrossed, badge: 'स्वाद' },
    { id: 'sports_sendra' as ActiveDesktopTab, label: 'पारंपरिक खेल व शिकार (सेंन्दरा)', icon: Target, badge: 'खेल' },
    { id: 'folk_songs' as ActiveDesktopTab, label: 'लोकगीत एवं सेरेञ आर्काइव', icon: Radio, badge: 'गीत' },
    { id: 'sohrai_art' as ActiveDesktopTab, label: 'सोहराय व खोवर भित्तिचित्र कला', icon: Palette, badge: 'कला' },
    { id: 'proverbs_bhenta' as ActiveDesktopTab, label: 'भेंता काथा एवं लोकोक्तियाँ', icon: Quote, badge: 'काथा' },
    { id: 'agri_seasons' as ActiveDesktopTab, label: 'पारंपरिक कृषि व ऋतु-चक्र', icon: Sprout, badge: 'कृषि' },
    { id: 'traditional_measures' as ActiveDesktopTab, label: 'पारंपरिक नाप-तौल व हाट', icon: Scale, badge: 'नाप' },
    { id: 'architecture' as ActiveDesktopTab, label: 'पारंपरिक वास्तु व ओड़ाक् विन्यास', icon: Home, badge: 'वास्तु' },
    { id: 'historical_garhs' as ActiveDesktopTab, label: 'ऐतिहासिक प्रवास व १२ गढ़', icon: Compass, badge: 'गढ़' },
    { id: 'puppetry_theater' as ActiveDesktopTab, label: 'चादर बदनी कठपुतली व नाटक', icon: Drama, badge: 'नाट्य' },
    { id: 'astronomy_lore' as ActiveDesktopTab, label: 'खगोल-विज्ञान व आकाश-ज्ञान', icon: Moon, badge: 'इपिल' },
    { id: 'sendra_lobir' as ActiveDesktopTab, label: 'बीर-सेंदरा व लोबीर बैसी विधान', icon: TreePine, badge: 'लोबीर' },
    { id: 'dhokra_art' as ActiveDesktopTab, label: 'धोकरा धातु-कला व कमार विरासत', icon: Hammer, badge: 'धोकरा' },
    { id: 'water_harvesting' as ActiveDesktopTab, label: 'डाड़ी-पुखुरी व ढलान जल-विज्ञान', icon: Droplets, badge: 'जल' },
    { id: 'handloom_weaving' as ActiveDesktopTab, label: 'पंछी-पारहाड़ व वनस्पति रंगाई', icon: Scissors, badge: 'वस्त्र' },
    { id: 'livestock_khuntau' as ActiveDesktopTab, label: 'खूंटाव परंपरा, गोड़ा व गौ-रान', icon: HeartHandshake, badge: 'खूंटाव' },
    { id: 'woodcraft_carpentry' as ActiveDesktopTab, label: 'ढेंकी, नाहेल व काठ-शिल्प', icon: Trees, badge: 'काष्ठ' },
    { id: 'bamboo_craft' as ActiveDesktopTab, label: 'हाताक\' (सूप), कुमुनी व बांस-शिल्प', icon: ShoppingBag, badge: 'बांस' },
    { id: 'baby_names' as ActiveDesktopTab, label: 'पारंपरिक नामकरण गाइड (200+)', icon: Baby, badge: 'नाम' },
    { id: 'ornaments_jewellery' as ActiveDesktopTab, label: 'पारंपरिक आभूषण व शृंगार (12)', icon: Sparkles, badge: 'आभूषण' },
    { id: 'blacksmithy_iron' as ActiveDesktopTab, label: 'कामार लोहार शिल्प व औजार', icon: Hammer, badge: 'लोहा' },
    { id: 'seasons_weather' as ActiveDesktopTab, label: '६ ऋतुएँ व मौसम पूर्वानुमान', icon: Sprout, badge: 'ऋतु' },
    { id: 'herbal_drinks' as ActiveDesktopTab, label: 'पारंपरिक पेय व रान दाक् (8)', icon: Leaf, badge: 'पेय' },
    { id: 'pilgrimage' as ActiveDesktopTab, label: 'तीर्थ स्थल (लुगुबुरु व भोगनाडीह)', icon: Compass, badge: 'तीर्थ' },
    { id: 'life_rites' as ActiveDesktopTab, label: 'जीवन-संस्कार (छठियार-भांडान)', icon: Baby, badge: 'संस्कार' },
    { id: 'calendar' as ActiveDesktopTab, label: 'सांस्कृतिक पर्व (पर्व पंचांग)', icon: Calendar, badge: 'पर्व' },
    { id: 'governance' as ActiveDesktopTab, label: 'मांझी परगना स्वशासन', icon: Landmark, badge: 'नया' },
    { id: 'herbal' as ActiveDesktopTab, label: 'पारंपरिक वन-औषधियां (रान)', icon: Leaf, badge: 'ज्ञान' },
    { id: 'kudum' as ActiveDesktopTab, label: 'कुदुम (पहेलियां) व मुहावरे', icon: HelpCircle },
    { id: 'traditional_cuisine' as ActiveDesktopTab, label: 'पारंपरिक व्यंजन (साकाम पीठा)', icon: UtensilsCrossed, badge: 'पाककला' },
    { id: 'marriage_rituals' as ActiveDesktopTab, label: '७ विवाह व ३ जीवन संस्कार', icon: HeartHandshake, badge: 'संस्कार' },
    { id: 'riddles_kudum' as ActiveDesktopTab, label: 'कुदुम पहेली खेल (Kudum)', icon: HelpCircle, badge: 'पहेली' },
    { id: 'sacred_pilgrimages' as ActiveDesktopTab, label: 'पावन तीर्थ व ऐतिहासिक गढ़', icon: Compass, badge: 'तीर्थ' },
    { id: 'spoken_dialogues' as ActiveDesktopTab, label: 'दैनिक बोलचाल संवाद (हाट-बाजार)', icon: MessageSquare, badge: 'संवाद' },
    { id: 'letter_templates' as ActiveDesktopTab, label: 'औपचारिक पत्र व नेवता साकाम', icon: FileText, badge: 'पत्र' },
    { id: 'illustrated_stories' as ActiveDesktopTab, label: 'सचित्र लोककथाएं (पिलचु हाड़ाम)', icon: BookOpen, badge: 'कथा' },
    { id: 'clans' as ActiveDesktopTab, label: '12 पवित्र पारिस व गोत्र', icon: Shield },
    { id: 'family_tree' as ActiveDesktopTab, label: 'नाते-रिश्तेदार (Kinship)', icon: Users },
    { id: 'flora_worksheets' as ActiveDesktopTab, label: 'पवित्र वनस्पति व कार्यपत्रक', icon: TreePine },
  ];

  const learningNav = [
    { id: 'certification' as ActiveDesktopTab, label: 'भाषा परीक्षा व प्रमाणपत्र', icon: Award, badge: 'प्रमाणपत्र' },
    { id: 'phonetics_lab' as ActiveDesktopTab, label: '४ रुद्ध कंठ ध्वनियां (Phonetics)', icon: Activity, badge: 'रुद्ध ध्वनि' },
    { id: 'grammar' as ActiveDesktopTab, label: 'संताली व्याकरण (रोनौड़)', icon: BookOpen, badge: 'नया' },
    { id: 'greetings' as ActiveDesktopTab, label: 'पावन पर्व ई-कार्ड (बधाई)', icon: Sparkles, badge: 'कार्ड' },
    { id: 'phrasebook' as ActiveDesktopTab, label: 'दैनिक बोलचाल (Phrasebook)', icon: MessageSquare },
    { id: 'speech_coach' as ActiveDesktopTab, label: 'उच्चारण प्रशिक्षक (Coach)', icon: Mic },
    { id: 'speaker' as ActiveDesktopTab, label: 'आवाज वाचक (Voice Reader)', icon: Volume2 },
    { id: 'kids_rhymes' as ActiveDesktopTab, label: 'बालगीत जुगलबंदी (Kids)', icon: Smile },
    { id: 'clock_numbers' as ActiveDesktopTab, label: 'बोलती घड़ी व 1-100 अंक', icon: Clock },
    { id: 'flashcards' as ActiveDesktopTab, label: 'शब्दावली फ़्लैशकार्ड्स', icon: Layers },
    { id: 'daily_quiz' as ActiveDesktopTab, label: 'दैनिक प्रश्नोत्तरी (Quiz)', icon: Flame },
    { id: 'instruments' as ActiveDesktopTab, label: 'पारंपरिक वाद्ययंत्र (धुन)', icon: Music },
    { id: 'calligraphy' as ActiveDesktopTab, label: 'देवनागरी सुलेखन व पोस्टर', icon: Palette },
    { id: 'wordle' as ActiveDesktopTab, label: 'वर्डले खेल (Wordle Game)', icon: Gamepad2 },
    { id: 'idioms_menkatha' as ActiveDesktopTab, label: 'संताली मुहावरे (मेनकाथा)', icon: Quote, badge: 'मुहावरा' },
    { id: 'archery_simulator' as ActiveDesktopTab, label: 'आक-सार धनुर्विद्या सिमुलेटर', icon: Target, badge: 'तीरंदाजी' },
    { id: 'translator' as ActiveDesktopTab, label: 'संताली अनुवादक (Translator)', icon: Languages },
    { id: 'ai_assistant' as ActiveDesktopTab, label: 'AI सर्च सहायक (AI Assistant)', icon: Bot, badge: 'AI' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/90 flex flex-col shrink-0 h-[calc(100vh-53px)] sticky top-[53px] select-none shadow-xs transition-all duration-200 z-20">
      {/* Top Header - Sticky Header Area */}
      <div className="p-3 border-b border-slate-100 shrink-0 space-y-2 bg-slate-50/70 z-10">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-300/60 flex items-center justify-center shrink-0 overflow-hidden">
              <img
                src="/assets/aistudio/bosc-main-logo_39d98de6.png"
                alt="BOSC"
                className="w-full h-full object-contain p-0.5 drop-shadow-xs"
              />
            </div>
            <div>
              <h2 className="text-xs font-black text-slate-900 leading-tight">Hor Katha Suite</h2>
              <p className="text-[10px] text-amber-800 font-bold">संताली देवनागरी मंच</p>
            </div>
          </div>

          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              title="मेनू छुपाएं (Hide Menu)"
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Admin Mode Pill */}
        {isAdmin && (
          <button
            onClick={() => onTabChange('admin_cms')}
            className="w-full px-2.5 py-1.5 bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-500/10 hover:from-amber-500/25 rounded-xl border border-amber-300 text-[11px] font-bold text-amber-950 flex items-center justify-between shadow-2xs transition-all cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Admin Master CMS</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>
        )}
      </div>

      {/* Nav Items Scroll Box - Perfect Fit Scrollable Area with Smooth Slim Scrollbar */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-2.5 py-3 space-y-4 overscroll-contain scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent hover:scrollbar-thumb-slate-400">
        
        {/* Section 1: मुख्य साधन (Core Tools) */}
        <div className="space-y-1">
          <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            मुख्य साधन
          </span>
          <nav className="space-y-0.5">
            {mainNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-sky-50 text-sky-900 shadow-2xs border border-sky-300 font-bold scale-[1.01]'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {isAdmin && (
                    <span title="एडमिन संपादन अधिकार सक्रिय" className="text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-900 font-bold shrink-0">
                      ✏️
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Section 2: संस्कृति, पर्व व समाज (Culture & Festivals) */}
        <div className="space-y-1 pt-1 border-t border-slate-100">
          <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
            संस्कृति, पर्व व समाज
          </span>
          <nav className="space-y-0.5">
            {culturalNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-50 text-amber-950 shadow-2xs border border-amber-300 font-bold scale-[1.01]'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-700' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {item.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-amber-200 text-amber-900 font-bold">
                        {item.badge}
                      </span>
                    )}
                    {isAdmin && (
                      <span title="एडमिन संपादन अधिकार सक्रिय" className="text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-900 font-bold">
                        ✏️
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Section 3: भाषा, ऑडियो व बालगीत (Language & Media) */}
        <div className="space-y-1 pt-1 border-t border-slate-100">
          <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            भाषा, संगीत व बालगीत
          </span>
          <nav className="space-y-0.5">
            {learningNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-sky-50 text-sky-900 shadow-2xs border border-sky-300 font-bold scale-[1.01]'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {item.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-sky-100 text-sky-800 font-bold">
                        {item.badge}
                      </span>
                    )}
                    {isAdmin && (
                      <span title="एडमिन संपादन अधिकार सक्रिय" className="text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-900 font-bold">
                        ✏️
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Section 4: सेटिंग्स व सहायता (Utilities) */}
        <div className="pt-2 border-t border-slate-100 space-y-0.5">
          <button
            onClick={() => onTabChange('settings')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-sky-50 text-sky-800 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Settings className="w-4 h-4 text-slate-400 shrink-0" />
            <span>पसंद एवं सेटिंग्स (Preferences)</span>
          </button>

          {onOpenFeedback && (
            <button
              onClick={onOpenFeedback}
              className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50/70 hover:bg-emerald-100 hover:text-emerald-900 border border-emerald-200/80 transition-all cursor-pointer"
            >
              <MessageSquareHeart className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>प्रतिक्रिया व सुझाव (Feedback)</span>
            </button>
          )}

          <button
            onClick={onOpenAbout}
            className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all cursor-pointer"
          >
            <Info className="w-4 h-4 text-slate-400 shrink-0" />
            <span>संस्थान परिचय (About BOSC)</span>
          </button>

          <button
            onClick={onOpenHelp}
            className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
            <span>सहायता एवं मार्गदर्शन (FAQ)</span>
          </button>
        </div>
      </div>

      {/* Bottom Credit Box - Clean & Fixed */}
      <div className="p-2.5 border-t border-slate-100 bg-slate-50/90 shrink-0">
        <CulturalTree variant="silhouette" className="w-full h-7 mb-1 opacity-70" />
        <div className="text-center">
          <p className="text-[10px] font-black text-slate-800">BOSC Tech &amp; Education</p>
          <p className="text-[9px] text-amber-800 font-bold">संताली देवनागरी डिजिटल प्रतिष्ठान</p>
        </div>
      </div>
    </aside>
  );
};
