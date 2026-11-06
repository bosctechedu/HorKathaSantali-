import React, { useState, useEffect } from 'react';
import { ActiveDesktopTab } from '../types';
import { openSuitePromo } from './suitePromo/events';
import {
  Keyboard,
  BookOpen,
  Camera,
  GraduationCap,
  Briefcase,
  Presentation,
  Puzzle,
  Share2,
  Mail,
  Star,
  BarChart3,
  School,
  Library,
  PenLine,
  BookMarked,
  Newspaper,
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
  Scroll,
  Brain,
  Heart,
  Swords,
  Radio,
  Sprout,
  Scale,
  Home,
  Droplets,
  Shirt,
  Trees,
  Bookmark,
  Award,
  Activity,
  Quote,
  Drama,
  Moon,
  Filter,
  Landmark,
  Leaf,
  HeartPulse,
  Smartphone,
  ArrowRightLeft, Calculator, Feather, Fish, Scissors } from 'lucide-react';

// Module card grid (category pills + live search). Code-split from Dashboard so the large
// Hindi card list doesn't weigh on the first-load chunk.
interface DashboardModuleGridProps {
  onNavigate: (tab: ActiveDesktopTab) => void;
  isAdmin: boolean;
  wordsCount: number;
}

const DashboardModuleGrid: React.FC<DashboardModuleGridProps> = ({ onNavigate, isAdmin, wordsCount }) => {
  const [moduleCategory, setModuleCategory] = useState<string>('all');
  const [moduleFilterText, setModuleFilterText] = useState<string>('');
  // Build the first cards with the page, the remaining ~100 right after (idle), so the first paint
  // on a cheap phone doesn't wait for every card. All cards are there within a moment; search/filter see all.
  const FIRST_CARDS = 12;
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    if (showAll) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    const id = w.requestIdleCallback ? w.requestIdleCallback(() => setShowAll(true), { timeout: 1500 }) : window.setTimeout(() => setShowAll(true), 300);
    return () => { if (w.cancelIdleCallback) w.cancelIdleCallback(id); else window.clearTimeout(id); };
  }, [showAll]);

  const featureCards: {
    id: ActiveDesktopTab;
    targetTab?: ActiveDesktopTab;
    title: string;
    subtitle: string;
    icon: any;
    gradient: string;
    actionText: string;
    category: 'language' | 'culture' | 'crafts' | 'nature' | 'games';
    /** custom click (instead of navigating to a tab) */
    onOpen?: () => void;
  }[] = [
    {
      id: 'keyboard',
      title: '⌨️ Hor Katha Suite',
      subtitle: 'संताली, हिन्दी फोनेटिक व English typing, Docs, Poster, Visiting Card — ₹9 में 7 दिन Trial',
      icon: Sparkles,
      gradient: 'from-[#7f1d1d] via-[#b45309] to-amber-400',
      actionText: 'पूरी जानकारी देखें',
      category: 'language',
      onOpen: openSuitePromo,
    },
    // ─── 1. भाषा, लिपि व अध्ययन (15 Modules) ───
    {
      id: 'santali_exam_prep',
      title: 'संताली प्रतियोगी परीक्षा तैयारी',
      subtitle: 'JSSC CGL Paper-II, UGC-NET (कोड 95) की जानकारी और 20 अभ्यास प्रश्न',
      icon: GraduationCap,
      gradient: 'from-indigo-900 via-slate-900 to-amber-900',
      actionText: 'Start Practice',
      category: 'language'
    },
    {
      id: 'tribal_schemes',
      title: 'आदिवासी छात्रों के लिए सरकारी योजनाएँ',
      subtitle: 'प्री/पोस्ट-मैट्रिक छात्रवृत्ति, नेशनल फ़ेलोशिप, EMRS: सरल हिन्दी में',
      icon: Landmark,
      gradient: 'from-emerald-900 via-teal-900 to-slate-900',
      actionText: 'View Schemes',
      category: 'language'
    },
    {
      id: 'santali_literature',
      title: 'संताली साहित्य और साहित्यकार',
      subtitle: 'गुरु गोमके, बोडिंग और साहित्य अकादमी पुरस्कार 2005–2025',
      icon: BookMarked,
      gradient: 'from-rose-900 via-stone-900 to-amber-900',
      actionText: 'Explore Literature',
      category: 'culture'
    },
    {
      id: 'santali_news_events',
      title: 'संताली समाचार और कार्यक्रम',
      subtitle: 'ताज़ा ख़बरें, हूल दिवस, भाषा विजय दिवस व पर्वों की जानकारी',
      icon: Newspaper,
      gradient: 'from-sky-900 via-slate-900 to-violet-900',
      actionText: 'Read News',
      category: 'culture'
    },
    {
      id: 'santal_hul_history',
      title: 'संताल हूल 1855–56',
      subtitle: 'सिदो-कान्हू, चाँद-भैरव, फूलो-झानो: समय-रेखा और नायक',
      icon: Flame,
      gradient: 'from-orange-900 via-red-950 to-stone-900',
      actionText: 'Read History',
      category: 'culture'
    },
    {
      id: 'santali_personalities',
      title: 'प्रसिद्ध संताल व्यक्तित्व',
      subtitle: 'स्वतंत्रता सेनानी, साहित्यकार और सार्वजनिक जीवन के बड़े नाम',
      icon: Star,
      gradient: 'from-yellow-900 via-amber-950 to-stone-900',
      actionText: 'Meet Them',
      category: 'culture'
    },
    {
      id: 'santali_in_numbers',
      title: 'संताली आँकड़ों में',
      subtitle: 'जनगणना 2011: 73.68 लाख भाषी, राज्यवार हिस्सा और विदेश',
      icon: BarChart3,
      gradient: 'from-cyan-900 via-slate-900 to-indigo-900',
      actionText: 'See Numbers',
      category: 'language'
    },
    {
      id: 'tribal_rights_laws',
      title: 'आदिवासी अधिकार और क़ानून',
      subtitle: 'पाँचवीं अनुसूची, PESA, वन अधिकार, SPT/CNT और प्रमाणपत्र गाइड',
      icon: Scale,
      gradient: 'from-lime-900 via-emerald-950 to-stone-900',
      actionText: 'Know Rights',
      category: 'language'
    },
    {
      id: 'santali_study_career',
      title: 'संताली पढ़ाई, करियर और नौकरी',
      subtitle: 'कहाँ पढ़ें (8 विश्वविद्यालय), करियर के रास्ते और नौकरी सूचना',
      icon: School,
      gradient: 'from-teal-900 via-cyan-950 to-slate-900',
      actionText: 'Explore Careers',
      category: 'language'
    },
    {
      id: 'santali_books_media',
      title: 'संताली किताबें और मीडिया',
      subtitle: 'ज़रूर पढ़ें किताबें, संताली विकिपीडिया, रेडियो और पत्रिकाएँ',
      icon: Library,
      gradient: 'from-fuchsia-900 via-purple-950 to-slate-900',
      actionText: 'Open Library',
      category: 'culture'
    },
    {
      id: 'reader_submissions',
      title: 'आपकी रचना',
      subtitle: 'अपनी कविता, कहानी या लेख भेजें; Admin की मंज़ूरी के बाद सबको दिखेगी',
      icon: PenLine,
      gradient: 'from-pink-900 via-rose-950 to-slate-900',
      actionText: 'Send Yours',
      category: 'language'
    },
    {
      id: 'teacher_corner',
      title: 'शिक्षक कोना',
      subtitle: 'कक्षा 1–5 पाठ-योजना और print करने लायक ओल चिकी अभ्यास-पत्र',
      icon: Presentation,
      gradient: 'from-sky-900 via-blue-950 to-slate-900',
      actionText: 'Open',
      category: 'language'
    },
    {
      id: 'my_progress',
      title: 'मेरी प्रगति और प्रमाणपत्र',
      subtitle: 'रोज़ का streak, badge, ओल चिकी परीक्षा और नाम वाला प्रमाणपत्र',
      icon: Award,
      gradient: 'from-amber-800 via-orange-900 to-stone-900',
      actionText: 'Check Progress',
      category: 'language'
    },
    {
      id: 'word_game',
      title: 'शब्द पहेली',
      subtitle: 'शब्द जोड़ो और अर्थ पहचानो: शब्दकोश से खेल',
      icon: Puzzle,
      gradient: 'from-violet-900 via-purple-950 to-slate-900',
      actionText: 'Play',
      category: 'language'
    },
    {
      id: 'health_info',
      title: 'स्वास्थ्य जानकारी',
      subtitle: 'सिकल सेल, मलेरिया, टीकाकरण, माँ-बच्चा, आयुष्मान कार्ड',
      icon: HeartPulse,
      gradient: 'from-rose-900 via-red-950 to-slate-900',
      actionText: 'Read',
      category: 'culture'
    },
    {
      id: 'community_board',
      title: 'संगठन और कार्यक्रम',
      subtitle: 'संगठन सूची और आने वाले मेले-पर्व; आप भी जोड़ें',
      icon: Users,
      gradient: 'from-emerald-900 via-teal-950 to-slate-900',
      actionText: 'Explore',
      category: 'culture'
    },
    {
      id: 'share_cards',
      title: 'WhatsApp शेयर कार्ड',
      subtitle: 'आज का शब्द या शुभकामना की तस्वीर बनाकर शेयर करें',
      icon: Share2,
      gradient: 'from-green-900 via-emerald-950 to-slate-900',
      actionText: 'Create',
      category: 'culture'
    },
    {
      id: 'newsletter',
      title: 'हफ़्ते का समाचार-पत्र',
      subtitle: 'Email से जुड़ें: नए शब्द, कार्यक्रम और रचनाएँ',
      icon: Mail,
      gradient: 'from-blue-900 via-indigo-950 to-slate-900',
      actionText: 'Subscribe',
      category: 'language'
    },
    {
      id: 'qa_board',
      title: 'प्रश्न पूछें',
      subtitle: 'संताली भाषा व संस्कृति पर सवाल भेजें, Admin का उत्तर पढ़ें',
      icon: HelpCircle,
      gradient: 'from-cyan-900 via-sky-950 to-slate-900',
      actionText: 'Ask',
      category: 'culture'
    },
    {
      id: 'job_board',
      title: 'नौकरी सूचना बोर्ड',
      subtitle: 'संताली शिक्षक, अनुवादक की नई भर्तियाँ, अंतिम तारीख़ के साथ',
      icon: Briefcase,
      gradient: 'from-yellow-800 via-amber-900 to-stone-900',
      actionText: 'View',
      category: 'language'
    },
    {
      id: 'keyboard',
      title: 'संताली कीबोर्ड (Keyboard)',
      subtitle: 'देवनागरी व रोमन में सहज संताली टाइपिंग व फॉन्ट',
      icon: Keyboard,
      gradient: 'from-sky-500 to-blue-600',
      actionText: 'Open Keyboard',
      category: 'language'
    },
    {
      id: 'dashboard',
      targetTab: 'dashboard',
      title: '१०,०००+ संताली शब्दकोश (Dictionary)',
      subtitle: `${wordsCount}+ शब्द, ऑडियो उच्चारण व त्रैभाषिक अर्थ`,
      icon: BookOpen,
      gradient: 'from-amber-500 to-orange-600',
      actionText: 'Explore Words',
      category: 'language'
    },
    {
      id: 'learn',
      title: 'संताली देवनागरी सीखें (Learn)',
      subtitle: 'वर्णमाला, बारहखड़ी, प्राथमिक नियम व शब्दावली',
      icon: GraduationCap,
      gradient: 'from-emerald-500 to-teal-600',
      actionText: 'Start Learning',
      category: 'language'
    },
    {
      id: 'translator',
      title: 'बहुभाषी अनुवादक (Translator)',
      subtitle: 'संताली (देवनागरी/रोमन) ↔ हिन्दी व अंग्रेज़ी अनुवाद',
      icon: Languages,
      gradient: 'from-rose-500 to-pink-600',
      actionText: 'Translate',
      category: 'language'
    },
    {
      id: 'grammar',
      title: 'संताली व्याकरण (रोनौड़)',
      subtitle: 'काल, कारक, क्रियापद, वचन व वाक्य संरचना',
      icon: BookOpen,
      gradient: 'from-indigo-600 to-blue-700',
      actionText: 'Learn Grammar',
      category: 'language'
    },
    {
      id: 'phonetics_lab',
      title: '४ रुद्ध कंठ ध्वनियां (Phonetics Lab)',
      subtitle: 'अचेत वर्ण (क, च, त, प) का शुद्ध उच्चारण अभ्यास',
      icon: Activity,
      gradient: 'from-teal-600 to-cyan-700',
      actionText: 'Practice Sounds',
      category: 'language'
    },
    {
      id: 'phrasebook',
      title: 'दैनिक बोलचाल वाक्यांश (Phrasebook)',
      subtitle: 'अभिवादन, यात्रा, बाजार व घरेलू संवाद ऑडियो सहित',
      icon: MessageSquare,
      gradient: 'from-emerald-600 to-teal-700',
      actionText: 'Browse Phrases',
      category: 'language'
    },
    {
      id: 'spoken_dialogues',
      title: 'दैनिक संताली बोलचाल संवाद',
      subtitle: 'हाट-बाजार, सत्कार, कृषि व पारस्परिक वार्तालाप',
      icon: MessageSquare,
      gradient: 'from-blue-800 to-indigo-950',
      actionText: 'Learn Dialogues',
      category: 'language'
    },
    {
      id: 'speech_coach',
      title: 'उच्चारण प्रशिक्षक (Speech Coach)',
      subtitle: 'ध्वनि पहचान व माइक्रोफोन स्कोरिंग फीडबैक',
      icon: Mic,
      gradient: 'from-teal-600 to-cyan-700',
      actionText: 'Test Accent',
      category: 'language'
    },
    {
      id: 'speaker',
      title: 'आवाज वाचक (Voice Reader)',
      subtitle: 'किसी भी संताली देवनागरी टेक्स्ट का सजीव ऑडियो वाचन',
      icon: Volume2,
      gradient: 'from-amber-500 to-orange-600',
      actionText: 'Read Aloud',
      category: 'language'
    },
    {
      id: 'letter_templates',
      title: 'औपचारिक पत्र व नेवता साकाम',
      subtitle: 'विवाह निमंत्रण, मांझी हाड़ाम आवेदन व सभा सूचना',
      icon: FileText,
      gradient: 'from-stone-800 to-amber-950',
      actionText: 'Open Templates',
      category: 'language'
    },
    {
      id: 'clock_numbers',
      title: 'बोलती घड़ी व १-१०० अंक (Numbers)',
      subtitle: 'लाइव संताली समय वाचन व १ से १०० तक गिनती चार्ट',
      icon: Clock,
      gradient: 'from-indigo-600 to-purple-700',
      actionText: 'Check Time',
      category: 'language'
    },
    {
      id: 'flashcards',
      title: 'शब्दावली फ़्लैशकार्ड्स (Flashcards)',
      subtitle: 'कार्ड पलटकर संताली शब्द व अर्थ का त्वरित अभ्यास',
      icon: Layers,
      gradient: 'from-violet-600 to-purple-700',
      actionText: 'Flip Cards',
      category: 'language'
    },
    {
      id: 'certification',
      title: 'भाषा परीक्षा व प्रमाणपत्र (Certificate)',
      subtitle: 'वस्तुनिष्ठ परीक्षा दें और सम्मानजनक डिजिटल प्रमाणपत्र पाएं',
      icon: Award,
      gradient: 'from-amber-600 to-yellow-700',
      actionText: 'Take Exam',
      category: 'language'
    },
    {
      id: 'favorites_notebook',
      title: 'इञाक् साकाम (मेरी डायरी)',
      subtitle: 'पसंदीदा शब्द, सूक्तियां व संताली नोट्स सहेजें',
      icon: Bookmark,
      gradient: 'from-purple-700 to-pink-800',
      actionText: 'My Notebook',
      category: 'language'
    },
    {
      id: 'script_converter',
      title: 'ऑल चिकी ⇄ देवनागरी ⇄ रोमन कनवर्टर',
      subtitle: 'लाइव त्रि-लिपि संताली लिप्यंतरण व वर्णमाला चार्ट',
      icon: ArrowRightLeft,
      gradient: 'from-indigo-900 to-slate-950',
      actionText: 'Convert Script',
      category: 'language'
    },

    // ─── 2. संस्कृति, पूर्वज व परंपरा (24 Modules) ───
    {
      id: 'creation',
      title: 'धरती की सृष्टि गाथा (सिरजोन)',
      subtitle: 'हांच-हांसिली पक्षी, कछुआ, केकड़ा व पिलचु हाड़ाम दर्शन',
      icon: Globe,
      gradient: 'from-blue-700 to-indigo-900',
      actionText: 'Explore Myth',
      category: 'culture'
    },
    {
      id: 'bonga_buru',
      title: 'पूजा-पाठ बोंगा-बुरु (१५ देव शक्तियां)',
      subtitle: 'मरांग बुरु, जाहेर एरा, गोसाईं एरा व पवित्र बाखेर मंत्र',
      icon: Flame,
      gradient: 'from-amber-600 to-rose-700',
      actionText: 'View Deities',
      category: 'culture'
    },
    {
      id: 'hul_heroes',
      title: 'संथाल हुल १८५५ (अमर महापुरुष)',
      subtitle: 'सिदो-कान्हू, चांद-भैरव, तिलका मांझी व फूलो-झानो इतिहास',
      icon: Swords,
      gradient: 'from-rose-700 to-red-900',
      actionText: 'Read Heroes',
      category: 'culture'
    },
    {
      id: 'marriage_bapla',
      title: 'विवाह संस्कार (८ पारंपरिक बापla)',
      subtitle: 'गोलायती, सांगा, दुवार बापला व सामाजिक मर्यादा',
      icon: Heart,
      gradient: 'from-pink-600 to-rose-700',
      actionText: 'Explore Bapla',
      category: 'culture'
    },
    {
      id: 'marriage_rituals',
      title: '७ विवाह प्रकार व ३ जीवन संस्कार',
      subtitle: 'दुवार बापला, टुंकी दिपिल, निम दाहाक् व चाचो छातियार',
      icon: HeartHandshake,
      gradient: 'from-rose-800 to-red-950',
      actionText: 'View Rituals',
      category: 'culture'
    },
    {
      id: 'life_rites',
      title: 'जीवन-संस्कार दर्शन (Life Rites)',
      subtitle: 'जन्म छठियार, चाचो छातियार, बाहा बपला व भांडान संस्कार',
      icon: Baby,
      gradient: 'from-amber-700 to-stone-900',
      actionText: 'Explore Rites',
      category: 'culture'
    },
    {
      id: 'governance',
      title: 'मांझी परगना स्वशासन प्रणाली',
      subtitle: 'मांझी हाड़ाम, पारानिक, गोडेट, जोग मांझी व कुलही बैसी',
      icon: Landmark,
      gradient: 'from-amber-800 to-stone-900',
      actionText: 'Governance Law',
      category: 'culture'
    },
    {
      id: 'clans',
      title: '१२ पवित्र पारिस व गोत्र (Clans)',
      subtitle: 'मुर्मू, हांसदा, सोरेन, हेम्ब्रम, किस्कू गोत्र चिन्ह व नियम',
      icon: Shield,
      gradient: 'from-amber-700 to-stone-800',
      actionText: 'View Clans',
      category: 'culture'
    },
    {
      id: 'family_tree',
      title: 'नाते-रिश्तेदार व कुल संबंध (साग़य)',
      subtitle: 'चाचा, मामा, बुआ, ससुराल रिश्ते व आदर परंपरा',
      icon: Users,
      gradient: 'from-teal-600 to-cyan-700',
      actionText: 'View Family Tree',
      category: 'culture'
    },
    {
      id: 'baby_names',
      title: 'पारंपरिक नामकरण गाइड (२००+ नाम)',
      subtitle: 'दादा-दादी के नाम पर नामकरण के ५ शास्त्रीय नियम',
      icon: Baby,
      gradient: 'from-rose-500 to-amber-600',
      actionText: 'Explore Names',
      category: 'culture'
    },
    {
      id: 'historical_garhs',
      title: '१२ ऐतिहासिक गढ़ व महाप्रवासन',
      subtitle: 'चांपा गढ़, बादोली गढ़, चाय गढ़ व आदिम प्रवासन मार्ग',
      icon: Compass,
      gradient: 'from-purple-800 to-indigo-950',
      actionText: 'Explore Garhs',
      category: 'culture'
    },
    {
      id: 'pilgrimage',
      title: 'पवित्र तीर्थ स्थल (Pilgrimages)',
      subtitle: 'लुगु बुरु घंटाबाड़ी, पारसनाथ व भोगनाडीह हूल स्मारक',
      icon: Compass,
      gradient: 'from-emerald-700 to-teal-900',
      actionText: 'View Sites',
      category: 'culture'
    },
    {
      id: 'sacred_pilgrimages',
      title: 'पावन तीर्थ व ऐतिहासिक गढ़ दर्शन',
      subtitle: 'लुगु बुरु, अयोध्या बुरु, भोगनाडीह व चांपा गढ़ विवरण',
      icon: Compass,
      gradient: 'from-emerald-800 to-teal-950',
      actionText: 'Visit Pilgrimages',
      category: 'culture'
    },
    {
      id: 'attire_ornaments',
      title: 'पारंपरिक वस्त्र व आभूषण (Attire)',
      subtitle: 'पांची-पारहांड, गमछा, लुंगी व पारंपरिक सज्जा',
      icon: Sparkles,
      gradient: 'from-amber-600 to-rose-700',
      actionText: 'Explore Attire',
      category: 'culture'
    },
    {
      id: 'ornaments_jewellery',
      title: 'पारंपरिक आभूषण व शृंगार (Jewellery)',
      subtitle: 'हांसली, खागड़ा, साकम, रासा व तोड़ा कांसा कला',
      icon: Sparkles,
      gradient: 'from-amber-600 to-orange-700',
      actionText: 'View Ornaments',
      category: 'culture'
    },
    {
      id: 'calendar',
      title: 'सांस्कृतिक महापर्व पंचांग (Festivals)',
      subtitle: 'सोहराय, बाहा, करम, साकरात पर्वों का विस्तृत लेख',
      icon: Calendar,
      gradient: 'from-orange-600 to-red-700',
      actionText: 'View Seasons',
      category: 'culture'
    },
    {
      id: 'lunar_calendar',
      title: 'चंद्र पंचांग व महापर्व टाइमर (Chando Clock)',
      subtitle: 'लाइव चंद्र कला (कुनामी/मूळ) व आगामी महापर्व काउंटडाउन',
      icon: Moon,
      gradient: 'from-indigo-900 to-slate-950',
      actionText: 'View Chando Clock',
      category: 'culture'
    },
    {
      id: 'greetings',
      title: 'पावन पर्व ई-कार्ड व बधाई जनरेटर',
      subtitle: 'सोहराय, बाहा व करम की डिजिटल बधाई कार्ड बनाएं',
      icon: Sparkles,
      gradient: 'from-pink-600 to-rose-700',
      actionText: 'Create E-Card',
      category: 'culture'
    },
    {
      id: 'social_cards',
      title: 'सोशल मीडिया कार्ड व पोस्टर जनरेटर',
      subtitle: '१०५+ संताली विचार, सोहराय बॉर्डर्स व WhatsApp HD शेयर',
      icon: Sparkles,
      gradient: 'from-rose-800 to-amber-950',
      actionText: 'Create Poster',
      category: 'culture'
    },
    {
      id: 'village_tour',
      title: 'संताल गांव (हातु) का पवित्र मानचित्र',
      subtitle: 'जाहेर थान, मांझी थान, कुलही, अखड़ा व सासन 3D संरचना',
      icon: Compass,
      gradient: 'from-emerald-950 to-stone-900',
      actionText: 'Explore Village',
      category: 'culture'
    },
    {
      id: 'festival_cards',
      title: 'व्हाट्सऐप व पावन पर्व ग्रीटिंग्स जनरेटर',
      subtitle: 'सोहराय, बाहा, करम, माघ सिम की ई-कार्ड इमेज व WhatsApp शेयर',
      icon: Sparkles,
      gradient: 'from-rose-800 to-pink-950',
      actionText: 'Create Greeting',
      category: 'culture'
    },
    {
      id: 'calligraphy',
      title: 'देवनागरी सुलेखन व पोस्टर (Calligraphy)',
      subtitle: 'सुंदर संताली सुविचार पोस्टर तैयार करें व डाउनलोड करें',
      icon: Palette,
      gradient: 'from-amber-700 to-orange-800',
      actionText: 'Design Poster',
      category: 'culture'
    },
    {
      id: 'wallpaper_studio',
      title: 'मोबाइल लॉकस्क्रीन वॉलपेपर व 9:16 स्टेटस',
      subtitle: 'सुविचार वॉलपेपर, सोहराय बॉर्डर व WhatsApp स्टेटस',
      icon: Smartphone,
      gradient: 'from-amber-950 to-stone-900',
      actionText: 'Create Wallpaper',
      category: 'culture'
    },
    {
      id: 'clan_genealogy',
      title: 'पारिस, खूंट व वंशावली पारिवारिक डायरी',
      subtitle: '१२ गोत्र टोटेम, कुल-देवता व घारोज साकाम प्रमाण-पत्र',
      icon: Shield,
      gradient: 'from-amber-900 to-yellow-950',
      actionText: 'View Clan Book',
      category: 'culture'
    },
    {
      id: 'bapla_chants',
      title: 'संताली विवाह (बापला) गीत व संपूर्ण नेग-दस्तूर',
      subtitle: 'तोरण, दाक् बापेर, सिंदूर दान व अश्रुपूर्ण बिदाई सेरेञ',
      icon: Heart,
      gradient: 'from-rose-800 to-pink-950',
      actionText: 'Explore Wedding',
      category: 'culture'
    },
    {
      id: 'bird_lore',
      title: 'चेँड़े चिन्हा: संथाल पक्षी दर्शन, बोली व मौसम पूर्वानुमान',
      subtitle: 'चितिर, कोयल, डाहुक, मोर, फाख्ता की आवाज सिंथेसाइज़र व शकुन ज्ञान',
      icon: Feather,
      gradient: 'from-emerald-900 to-teal-950',
      actionText: 'Listen Bird Calls',
      category: 'nature'
    },
    {
      id: 'godna_body_art',
      title: 'सिका दागा व गोदना: अमर देह-कला व हाना पुरी दर्शन',
      subtitle: 'पुरुषों की कलाई का सिका (३, ५, ७ दागा), नारी गोदना व डिजिटल स्टूडियो',
      icon: Sparkles,
      gradient: 'from-amber-900 to-stone-900',
      actionText: 'Open Godna Studio',
      category: 'culture'
    },
    {
      id: 'heirloom_seeds',
      title: 'संथाल देशज धान, मिलेट्स व "बंधी" बीज संरक्षण वास्तुकला',
      subtitle: 'करहानी, तुपु, दानगोड़, झुमुका धान, ५-वर्षीय बंधी तकनीक व एरोक सिम',
      icon: Sprout,
      gradient: 'from-amber-800 to-emerald-950',
      actionText: 'Explore Heirloom Seeds',
      category: 'nature'
    },
    {
      id: 'kinship_etiquette',
      title: 'संथाल जोहार, नाता-गोता व पारंपरिक पारिवारिक शिष्टाचार',
      subtitle: 'डोबोक जोहार, बालाया जोहार, मामा-भांजा सम्मान व मर्यादा वर्जनाएं',
      icon: Users,
      gradient: 'from-teal-800 to-stone-900',
      actionText: 'Explore Etiquette',
      category: 'culture'
    },
    {
      id: 'instruments_orchestra',
      title: 'रुया-गाबुर: ५ पारंपरिक संताली वाद्ययंत्र ऑर्केस्ट्रा',
      subtitle: 'तुम्दाक्, तामाक्, बानाम, तिरिओ और घोंघोर का १६-स्टेप लूपर व मिक्सर',
      icon: Music,
      gradient: 'from-amber-950 via-rose-950 to-stone-900',
      actionText: 'Play Orchestra',
      category: 'games'
    },
    {
      id: 'bone_setting_healing',
      title: 'संथाल पारंपरिक हड्डी संधानशाला व वनौषधि लेप विद्या',
      subtitle: 'हातु कविराज (रूग-फाड़ो), बांस की पाती, हाड़जोड़ा लेप व अस्पताल रेफरल',
      icon: HeartPulse,
      gradient: 'from-emerald-950 to-teal-900',
      actionText: 'Explore Bone Healing',
      category: 'nature'
    },
    {
      id: 'lo_bir_court',
      title: 'लो बीर बैसी: सर्वोच्च आदिवासी जन-अदालत सिमुलेटर',
      subtitle: 'सेंदरा पशु बंटवारा, चराई विवाद व प्राचीन मौखिक विधि संहिता',
      icon: Scale,
      gradient: 'from-amber-950 to-stone-900',
      actionText: 'Explore Court Cases',
      category: 'culture'
    },
    {
      id: 'calligraphy_workbook',
      title: 'ओल चिकी व संताली सुलेखन अभ्यास पुस्तिका',
      subtitle: '३० मूल वर्णों का डिजिटल स्ट्रोक ट्रेसिंग व प्रिंटेबल वर्कशीट',
      icon: PenTool,
      gradient: 'from-teal-800 to-emerald-950',
      actionText: 'Practice Calligraphy',
      category: 'language'
    },
    {
      id: 'handi_fermentation_lore',
      title: 'संथाल पारंपरिक वनौषधि किण्वन, रानू व हांडिया विज्ञान',
      subtitle: '१५+ वनौषधियों की रानू, ५-चरणीय मटका किण्वन व देव-तर्पण विधान',
      icon: Droplets,
      gradient: 'from-amber-950 via-yellow-950 to-stone-900',
      actionText: 'Explore Fermentation',
      category: 'nature'
    },
    {
      id: 'ipil_astronomy',
      title: 'इपिल: संथाल पारंपरिक खगोल, नक्षत्र व रात्रि नेविगेशन',
      subtitle: 'हर-काटा (हलवाहा), बुधु-बुधु, हती डाहार व सूर्य-चंद्र प्रभामंडल',
      icon: Moon,
      gradient: 'from-indigo-950 via-slate-900 to-emerald-950',
      actionText: 'Explore Sky Lore',
      category: 'nature'
    },
    {
      id: 'nahel_dhenki_craft',
      title: 'नाहेल (हल), ढेंकी व जुआठ: काष्ठ-शिल्प वास्तुकला',
      subtitle: 'साल लकड़ी के प्राकृतिक वक्र, उत्तोलक भौतिकी सिद्धांत व अंग-ब्लूप्रिंट',
      icon: Trees,
      gradient: 'from-amber-950 via-stone-800 to-emerald-950',
      actionText: 'Explore Woodcraft',
      category: 'crafts'
    },
    {
      id: 'indigenous_sports_kati',
      title: 'काटी एनेच, बेझा तुन व संताली पारंपरिक लोक-खेल',
      subtitle: 'इंटरैक्टिव काटी गोटी सिमुलेटर, साकरात तीरंदाजी व खेल नियम',
      icon: Trophy,
      gradient: 'from-orange-950 via-amber-900 to-stone-900',
      actionText: 'Play Kati Game',
      category: 'games'
    },
    {
      id: 'traditional_fishing_craft',
      title: 'हाकू सांदरा व पारम्परिक मत्स्य जाल शिल्प',
      subtitle: 'तोरोदान, घूनी, पिल्ही, झाली व हकु रान वनौषधि विद्या',
      icon: Fish,
      gradient: 'from-teal-800 to-cyan-950',
      actionText: 'Explore Fishing Lore',
      category: 'crafts'
    },
    {
      id: 'natural_pigments_craft',
      title: 'प्राकृतिक भित्ति वर्ण द्रव्य व सोहराय माटी रसायन',
      subtitle: 'दुधी माटी, लाल हासबा, हेन्डे हासबा व डिजिटल वॉल कैनवास',
      icon: Palette,
      gradient: 'from-amber-900 to-red-950',
      actionText: 'Explore Pigments',
      category: 'crafts'
    },
    {
      id: 'banam_tamak_luthier',
      title: 'लोक-वाद्य निर्माण विद्या व बानाम ल्युथियर शिल्प',
      subtitle: 'धोदरो बानाम, टुमदाक, तामाक छिलाई व खिरन सुर-लेप',
      icon: Hammer,
      gradient: 'from-stone-900 via-amber-950 to-orange-950',
      actionText: 'Explore Luthier',
      category: 'crafts'
    },
    {
      id: 'jaher_sacred_grove_ecology',
      title: 'पवित्र जाहेर थान वन पारिस्थितिकी व वृक्ष विद्या',
      subtitle: 'सरजोम, मातकोम, हेसाः-बाड़े का जैव-विविधता तंत्र व संरक्षण संहिता',
      icon: TreePine,
      gradient: 'from-emerald-950 via-teal-950 to-stone-900',
      actionText: 'Explore Sacred Grove',
      category: 'nature'
    },
    {
      id: 'customary_oaths_justice',
      title: 'संताली पावन शपथ, साक्षी व जोम जाति शुद्धिकरण',
      subtitle: 'गुरी-घांस, बाहा दाः, सार-कापी किरिया व सामुदायिक पुनर्प्रवेश भोज',
      icon: Scale,
      gradient: 'from-amber-950 via-stone-900 to-slate-950',
      actionText: 'Explore Oaths',
      category: 'culture'
    },
    {
      id: 'sasandiri_megalithic_lore',
      title: 'सासानदीरी व महापाषाण स्मृति प्रस्तर विद्या',
      subtitle: 'दिरी बिद, चापाड़ दिरी, नाई गाड़ा जांग बाहा तीर्थ व पाषाण संतुलन भौतिकी',
      icon: Landmark,
      gradient: 'from-stone-900 via-neutral-900 to-amber-950',
      actionText: 'Explore Megaliths',
      category: 'culture'
    },
    {
      id: 'indigenous_math_geometry',
      title: 'संताली लोक-गणित, गांठी लेखा व वास्तु ज्यामिति',
      subtitle: 'गांठी लेखा डोरी, २०-आधारित (इसी) कनवर्टर व २-चाला/४-चाला छप्पर भौतिकी',
      icon: Calculator,
      gradient: 'from-sky-950 via-indigo-950 to-slate-900',
      actionText: 'Explore Math & Geometry',
      category: 'crafts'
    },
    {
      id: 'wild_honey_harvesting',
      title: 'संताली वन-शहद संचयन व वन्य-मधुमक्खी विद्या',
      subtitle: 'तेरोम, लुती व हुरुम प्रजातियां, आधा छत्ता काटने की सतत परंपरा व औषधीय शहद',
      icon: Droplets,
      gradient: 'from-amber-950 via-yellow-950 to-stone-900',
      actionText: 'Explore Honey Lore',
      category: 'nature'
    },
    {
      id: 'animal_behavior_omens',
      title: 'संताली पशु-ध्वनि, जैव-संकेत व लोक-शकुन विद्या',
      subtitle: 'चीतल की चेतावनी पुकार, वर्षा-मेंढक नाद व यात्रा के शुभ-अशुभ शकुन',
      icon: Radio,
      gradient: 'from-emerald-950 via-teal-950 to-stone-900',
      actionText: 'Explore Animal Omens',
      category: 'nature'
    },
    {
      id: 'indigenous_textile_dyes',
      title: 'पांची-पारहाड़ वनस्पति रंगाई व देशी ब्लॉक-प्रिंट',
      subtitle: 'गाबा (बबूल-लोहा), पलाश पीत-केसरिया व लकड़ी के ठप्पा छपाई स्टूडियो',
      icon: Scissors,
      gradient: 'from-red-950 via-stone-900 to-amber-950',
      actionText: 'Explore Block Print',
      category: 'crafts'
    },
    {
      id: 'indigenous_midwifery_care',
      title: 'दाया बुढ़ी व संताली प्रसूति-शिशु रक्षा विज्ञान',
      subtitle: 'नाड़ी-स्पर्श विद्या, महुआ तेल अभ्यंग, बांस चोई नाल-छेदन व जनम छठियार',
      icon: Baby,
      gradient: 'from-rose-950 via-pink-950 to-stone-900',
      actionText: 'Explore Midwifery Lore',
      category: 'culture'
    },

    // ─── 3. पारंपरिक शिल्प, कला व वास्तु (8 Modules) ───
    {
      id: 'sohrai_art',
      title: 'सोहराय व खोवर भित्तिचित्र कला (Mural Art)',
      subtitle: 'प्राकृतिक रंगों, कंघी व अंगुलियों से बनी भित्ति कला',
      icon: Palette,
      gradient: 'from-amber-600 to-orange-800',
      actionText: 'Explore Murals',
      category: 'crafts'
    },
    {
      id: 'dhokra_art',
      title: 'ढोकरा धातु ढलाई शिल्प (Dhokra Art)',
      subtitle: 'मोम ढलाई तकनीक, घंटी धातु व लोक मूर्तियां',
      icon: Hammer,
      gradient: 'from-amber-700 to-stone-900',
      actionText: 'View Dhokra',
      category: 'crafts'
    },
    {
      id: 'handloom_weaving',
      title: 'पारंपरिक हथकरघा व बुनाई (Handloom)',
      subtitle: 'पांची-पारहांड बुनाई व प्राकृतिक वनस्पति रंगाई',
      icon: Shirt,
      gradient: 'from-purple-600 to-indigo-800',
      actionText: 'Explore Weaving',
      category: 'crafts'
    },
    {
      id: 'woodcraft_carpentry',
      title: 'काष्ठ शिल्प व ढेंकी-नाहेल निर्माण',
      subtitle: 'नाहेल (हल), ढेंकी, पाल्हा व काष्ठ नक्काशी',
      icon: Trees,
      gradient: 'from-stone-700 to-amber-950',
      actionText: 'View Woodcraft',
      category: 'crafts'
    },
    {
      id: 'bamboo_craft',
      title: 'बांस शिल्प व मछली पकड़ने के औजार',
      subtitle: 'सूप, दौरा, पांची व कुमनी नदी जाल निर्माण',
      icon: TreePine,
      gradient: 'from-emerald-700 to-green-900',
      actionText: 'View Bamboo',
      category: 'crafts'
    },
    {
      id: 'blacksmithy_iron',
      title: 'कामार लोहार शिल्प व पारंपरिक औजार',
      subtitle: 'दातरम, तांगा, सार-फासी व देशी धौंकनी भट्टी',
      icon: Hammer,
      gradient: 'from-stone-700 to-neutral-900',
      actionText: 'Discover Craft',
      category: 'crafts'
    },
    {
      id: 'architecture',
      title: 'संताली वास्तुकला व ओड़ाग् लेआउट',
      subtitle: 'कुंभा शैली, मिट्टी की दीवारें, खपरैल व प्राकृतिक शीतलता',
      icon: Home,
      gradient: 'from-orange-700 to-stone-900',
      actionText: 'View Architecture',
      category: 'crafts'
    },
    {
      id: 'puppetry_theater',
      title: 'चादर बादनी काष्ठ कठपुतली नाट्य',
      subtitle: 'अखड़ा लोकनाट्य, काष्ठ कठपुतली व कथा गायन',
      icon: Drama,
      gradient: 'from-rose-600 to-purple-800',
      actionText: 'View Puppetry',
      category: 'crafts'
    },

    // ─── 4. प्रकृति, वन, कृषि व पर्यावरण (11 Modules) ───
    {
      id: 'herbal',
      title: 'पारंपरिक वन-औषधियां (रान - Ethnobotany)',
      subtitle: 'जड़ी-बूटी, छाल, कंद-मूल व आदिम प्राकृतिक चिकित्सा',
      icon: Leaf,
      gradient: 'from-emerald-600 to-green-800',
      actionText: 'Explore Remedies',
      category: 'nature'
    },
    {
      id: 'herbal_drinks',
      title: 'पारंपरिक पेय व प्राकृतिक शरबत (Herbal Drinks)',
      subtitle: 'महुआ रस, इचाक् चाय, मांडी दाक् व पोचोई मर्यादा',
      icon: Coffee,
      gradient: 'from-emerald-700 to-teal-900',
      actionText: 'View Drinks',
      category: 'nature'
    },
    {
      id: 'flora_worksheets',
      title: 'पवित्र वनस्पति व कार्यपत्रक (Worksheets)',
      subtitle: 'सरजोम, महुआ, करम व प्रिंटेबल A4 कार्यपत्रक',
      icon: TreePine,
      gradient: 'from-green-700 to-emerald-900',
      actionText: 'Print Worksheets',
      category: 'nature'
    },
    {
      id: 'agri_seasons',
      title: 'पारंपरिक कृषि एवं ऋतु-चक्र (Agriculture)',
      subtitle: 'बीज बोनी, रोपाई, कटाई व नक्षत्र आधारित खेती',
      icon: Sprout,
      gradient: 'from-emerald-600 to-teal-800',
      actionText: 'View Agri Lore',
      category: 'nature'
    },
    {
      id: 'seasons_weather',
      title: '६ ऋतुएँ व मौसम पूर्वानुमान (Weather Lore)',
      subtitle: 'सितांग, जापानी, दासांय व चींटियों-पक्षियों के संकेत',
      icon: Clock,
      gradient: 'from-teal-600 to-cyan-700',
      actionText: 'Check Seasons',
      category: 'nature'
    },
    {
      id: 'water_harvesting',
      title: 'पारंपरिक जल संचयन (Water Harvesting)',
      subtitle: 'दाड़ी कुआं, जोभिला, पुखरी व ढलानदार बांध खेती',
      icon: Droplets,
      gradient: 'from-blue-600 to-cyan-800',
      actionText: 'View Water Lore',
      category: 'nature'
    },
    {
      id: 'traditional_measures',
      title: 'पारंपरिक नाप-तौल इकाइयां (Measures)',
      subtitle: 'पाय-कथा, सेर, काठ, बीता, हाथ व प्राचीन वस्तु-विनिमय',
      icon: Scale,
      gradient: 'from-amber-700 to-yellow-800',
      actionText: 'View Measures',
      category: 'nature'
    },
    {
      id: 'livestock_khuntau',
      title: 'पशु-धन, खूंटाव परंपरा व पशु-चिकित्सा',
      subtitle: 'गौ-धन वंदना, सोहराय खूंटाव व पारंपरिक वनौषधि उपचार',
      icon: Sparkles,
      gradient: 'from-orange-600 to-amber-800',
      actionText: 'View Cattle Lore',
      category: 'nature'
    },
    {
      id: 'astronomy_lore',
      title: 'संताली खगोल व नक्षत्र ज्ञान (Sky Lore)',
      subtitle: 'इपिल (तारे), भूरका इपिल (शुक्र तारा) व चांदो डाहार',
      icon: Moon,
      gradient: 'from-indigo-800 to-slate-950',
      actionText: 'Explore Stars',
      category: 'nature'
    },
    {
      id: 'cuisine',
      title: 'खान-पान व प्रामाणिक व्यंजन (Cuisine)',
      subtitle: 'जिल पीठा, लेटे मंडी, रुगड़ा-ओत् व घोंघी रसा विधियां',
      icon: UtensilsCrossed,
      gradient: 'from-amber-700 to-orange-900',
      actionText: 'Explore Dishes',
      category: 'nature'
    },
    {
      id: 'traditional_cuisine',
      title: 'संताली पारंपरिक पाककला व व्यंजन',
      subtitle: 'साकाम पीठा, लेटे मंडी, रुगड़ा-ओत् व घोंघी रसा विधियां',
      icon: UtensilsCrossed,
      gradient: 'from-amber-800 to-orange-950',
      actionText: 'Explore Cuisine',
      category: 'nature'
    },

    {
      id: 'wild_foods',
      title: 'संताली वन-साग व पोषण संदर्शिका (वीर आड़ा़)',
      subtitle: 'गेंधारी, मुंगा, मातथा साग, जिल पीठा व पारंपरिक पौष्टिक विधियां',
      icon: Leaf,
      gradient: 'from-teal-900 to-emerald-950',
      actionText: 'Explore Wild Foods',
      category: 'nature'
    },
    {
      id: 'ethno_medicine',
      title: 'पारंपरिक वनौषधि व प्राथमिक उपचार (रान रेहेत)',
      subtitle: 'चोट-मोच, हड्डी संधान, ज्वर, पेचिश व घाव के देसी नुस्खे',
      icon: HeartPulse,
      gradient: 'from-emerald-800 to-teal-950',
      actionText: 'Explore Remedies',
      category: 'nature'
    },
    {
      id: 'haat_barter',
      title: 'संताली पारंपरिक हाट व वस्तु-विनिमय बाज़ार',
      subtitle: 'धान्य, बर्तन, औजार विनिमय, माप-तौल व बाजार संवाद',
      icon: Scale,
      gradient: 'from-amber-800 to-stone-900',
      actionText: 'Explore Haat',
      category: 'nature'
    },

    // ─── 5. खेल, संगीत, नृत्य व लोक-मनोरंजन (18 Modules) ───
    {
      id: 'dances',
      title: 'पारंपरिक शीर्ष १० नृत्य (एनेच)',
      subtitle: 'लागणे, डंता, बाहा, सोहराय, गोलावरी व अखड़ा कदमताल',
      icon: Music,
      gradient: 'from-pink-600 to-rose-700',
      actionText: 'Watch Dances',
      category: 'games'
    },
    {
      id: 'folk_songs',
      title: 'संताली लोकगीत एवं सेरेञ आर्काइव',
      subtitle: 'लागणे सेरेञ, बाहा सेरेञ, सोहराय व दासाय सेरेञ गीत',
      icon: Radio,
      gradient: 'from-amber-600 to-orange-700',
      actionText: 'Listen Seren',
      category: 'games'
    },
    {
      id: 'instruments',
      title: 'पारंपरिक वाद्ययंत्र पैड (Instruments)',
      subtitle: 'तुमाक, तामाक, बनम व तिरियो की ताल बजाएं',
      icon: Music,
      gradient: 'from-red-600 to-amber-700',
      actionText: 'Play Drums',
      category: 'games'
    },
    {
      id: 'sports_sendra',
      title: 'पारंपरिक खेल व शिकार (सेंन्दरा)',
      subtitle: 'आक-सार तीरंदाजी, कटी खेल, छूर खेल व जंगल खेल',
      icon: Target,
      gradient: 'from-emerald-700 to-teal-900',
      actionText: 'Explore Sports',
      category: 'games'
    },
    {
      id: 'sendra_lobir',
      title: 'सेंन्द्रा व लोबीर बैसी (वन नियम व संसद)',
      subtitle: 'पारंपरिक वन संसद, पर्यावरण नैतिकता व न्याय विधान',
      icon: Shield,
      gradient: 'from-teal-800 to-slate-900',
      actionText: 'View Lobir Law',
      category: 'games'
    },
    {
      id: 'archery_simulator',
      title: 'आक-सार धनुर्विद्या सिमुलेटर (Archery Game)',
      subtitle: 'पारंपरिक भेंडा बेझा तुञ व संताली शब्द निशाना खेल',
      icon: Target,
      gradient: 'from-orange-600 to-amber-700',
      actionText: 'Play Archery',
      category: 'games'
    },
    {
      id: 'kudum',
      title: 'कुदुम (पहेलियां) व मुहावरे (Riddles)',
      subtitle: 'पारंपरिक संताली लोक पहेलियां, ज्ञान व व्याख्या',
      icon: HelpCircle,
      gradient: 'from-teal-600 to-emerald-700',
      actionText: 'Solve Riddles',
      category: 'games'
    },
    {
      id: 'riddles_kudum',
      title: 'कुदुम पहेली प्रतियोगिता खेल',
      subtitle: 'लोक पहेलियां, स्कोर बोर्ड, संकेत व ऑडियो उच्चारण',
      icon: HelpCircle,
      gradient: 'from-violet-800 to-purple-950',
      actionText: 'Play Kudum',
      category: 'games'
    },
    {
      id: 'idioms_menkatha',
      title: 'संताली मुहावरे (मेनकाथा)',
      subtitle: 'दार्शनिक जीवन-दर्शन, लाक्षणिक अर्थ व बोलचाल सीख',
      icon: MessageSquare,
      gradient: 'from-amber-700 to-orange-800',
      actionText: 'Learn Idioms',
      category: 'games'
    },
    {
      id: 'proverbs_bhenta',
      title: 'संताली लोकोक्तियां (भेंता काथा)',
      subtitle: 'गूढ़ अर्थ वाली लोक नीति, आचरण व अनुभव वचन',
      icon: MessageSquare,
      gradient: 'from-orange-700 to-amber-900',
      actionText: 'Learn Bhenta',
      category: 'games'
    },
    {
      id: 'wordle',
      title: 'संताली वर्डले (Wordle Game)',
      subtitle: '५ अक्षरी संताली शब्द पहेली खेल व दैनिक अभ्यास',
      icon: Gamepad2,
      gradient: 'from-purple-600 to-indigo-700',
      actionText: 'Play Wordle',
      category: 'games'
    },
    {
      id: 'daily_quiz',
      title: 'दैनिक प्रश्नोत्तरी (Daily Vocab Quiz)',
      subtitle: 'प्रतिदिन ५ नए संताली शब्द, स्ट्रीक व बैज जीतें',
      icon: Flame,
      gradient: 'from-amber-500 via-orange-500 to-rose-600',
      actionText: "Take Today's Quiz",
      category: 'games'
    },
    {
      id: 'stories',
      title: 'लोककथा ऑडियो वाचक (Folk Stories)',
      subtitle: 'पं. रघुनाथ मुर्मू, हूल १८५५ व लोक इतिहास ऑडियो',
      icon: Headphones,
      gradient: 'from-stone-700 to-amber-900',
      actionText: 'Listen Stories',
      category: 'games'
    },
    {
      id: 'illustrated_stories',
      title: 'सचित्र संताली लोककथाएं (Tales)',
      subtitle: 'पिलचु हाड़ाम-बूढ़ी, चालाक तूंईऊ व करम-धरम सचित्र कथाएं',
      icon: BookOpen,
      gradient: 'from-teal-800 to-emerald-950',
      actionText: 'Read Stories',
      category: 'games'
    },
    {
      id: 'kids_rhymes',
      title: 'बालगीत जुगलबंदी (Kids Rhymes Jukebox)',
      subtitle: 'रंग-बिरंगी सचित्र संताली बाल कविताएं व गायन',
      icon: Smile,
      gradient: 'from-pink-600 to-rose-600',
      actionText: 'Sing Rhymes',
      category: 'games'
    },
    {
      id: 'sereng_karaoke',
      title: 'संताली सेरेंग कराओके व ताल अखाड़ा',
      subtitle: 'तुमाक-तामाक थाप लूप, लांगड़े-दोंगेड़ ताल व कराओके गायन',
      icon: Music,
      gradient: 'from-amber-900 to-rose-950',
      actionText: 'Play & Sing',
      category: 'games'
    },
    {
      id: 'folk_radio',
      title: 'संताली लोककथा रेडियो व एम्बिएंट साउंड',
      subtitle: 'जंगल की रात, बहती नदी व बांसुरी के साथ लोककथाएं',
      icon: Radio,
      gradient: 'from-emerald-950 to-stone-900',
      actionText: 'Listen Radio',
      category: 'games'
    },
    {
      id: 'kids_soundboard',
      title: 'संताली सचित्र बाल-साउंडबोर्ड (Kids)',
      subtitle: '१००+ रंग-बिरंगे सचित्र कार्ड्स, आवाज व पहचानो क्विज़',
      icon: Smile,
      gradient: 'from-rose-500 to-amber-500',
      actionText: 'Play Soundboard',
      category: 'games'
    },
    {
      id: 'educational' as ActiveDesktopTab,
      title: 'LDP — लाइव अभ्यास केंद्र (कक्षा 1-12)',
      subtitle: 'कक्षा, विषय व अध्यायवार 15+ MCQ अभ्यास, अध्ययन सामग्री व प्रतियोगी परीक्षाएं',
      icon: GraduationCap,
      gradient: 'from-emerald-800 to-teal-950',
      actionText: 'Start Practice',
      category: 'language'
    },
    {
      id: 'quiz' as ActiveDesktopTab,
      title: 'क्विज़ / IQ टेस्ट (लाइव परीक्षा केंद्र)',
      subtitle: 'UPSC, JPSC, JSSC, SSC, रेलवे, बैंक — वास्तविक पैटर्न पर मॉक टेस्ट',
      icon: Brain,
      gradient: 'from-slate-900 to-emerald-950',
      actionText: 'Start Test',
      category: 'language'
    },
    ...(isAdmin
      ? [
          {
            id: 'admin_cms' as ActiveDesktopTab,
            title: 'Admin Master CMS',
            subtitle: 'Direct Add/Edit/Update access across all sections',
            icon: Edit3,
            gradient: 'from-slate-900 via-amber-900 to-slate-900',
            actionText: 'Open Master CMS',
            category: 'language' as const
          }
        ]
      : [])
  ];

  const filteredFeatureCards = featureCards.filter((card) => {
    const matchesCat = moduleCategory === 'all' || card.category === moduleCategory;
    const q = moduleFilterText.toLowerCase().trim();
    const matchesQuery =
      !q ||
      card.title.toLowerCase().includes(q) ||
      card.subtitle.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  // 60+ core feature cards grid with categories & live search
  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Interactive Cultural &amp; Learning Modules</span>
          </h2>
          <p className="text-[11px] text-slate-500">
            संताली भाषा, संस्कृति, शिल्प, प्रकृति और लोक-मनोरंजन के सभी मॉड्यूल्स
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-amber-900 font-black bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300 shadow-2xs">
            {filteredFeatureCards.length} / {featureCards.length} मॉड्यूल्स
          </span>
        </div>
      </div>

      {/* Filter Pills & Live Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar text-xs">
          {[
            { id: 'all', label: `🌟 सभी (${featureCards.length})` },
            { id: 'language', label: `📖 भाषा व व्याकरण (${featureCards.filter((c) => c.category === 'language').length})` },
            { id: 'culture', label: `🪔 संस्कृति व पूर्वज (${featureCards.filter((c) => c.category === 'culture').length})` },
            { id: 'crafts', label: `🎨 शिल्प व कला (${featureCards.filter((c) => c.category === 'crafts').length})` },
            { id: 'nature', label: `🌿 प्रकृति व कृषि (${featureCards.filter((c) => c.category === 'nature').length})` },
            { id: 'games', label: `🏹 खेल व संगीत (${featureCards.filter((c) => c.category === 'games').length})` }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setModuleCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer text-xs ${
                moduleCategory === cat.id
                  ? 'bg-amber-600 text-white font-black shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Module Search Input */}
        <div className="relative shrink-0 sm:w-56">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={moduleFilterText}
            onChange={(e) => setModuleFilterText(e.target.value)}
            placeholder="मॉड्यूल खोजें..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
          {moduleFilterText && (
            <button
              onClick={() => setModuleFilterText('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Grid of Interactive Module Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {(showAll || moduleFilterText || moduleCategory !== 'all' ? filteredFeatureCards : filteredFeatureCards.slice(0, FIRST_CARDS)).map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={`${card.id}_${card.title}`}
              onClick={() => (card.onOpen ? card.onOpen() : onNavigate(card.targetTab || card.id))}
              className="hks-cv-card group cursor-pointer rounded-2xl p-3.5 bg-white border border-slate-200/80 hover:border-amber-400 hover:shadow-md transition-[border-color,box-shadow] flex flex-col justify-between h-40 relative overflow-hidden"
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-2xs group-hover:scale-105 transition-transform`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div className="my-1.5">
                <h3 className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                  {card.title}
                </h3>
                <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                  {card.subtitle}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold text-slate-600 group-hover:text-amber-800">
                <span>{card.actionText}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {filteredFeatureCards.length === 0 && (
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
          <p className="font-bold text-slate-700">कोई मॉड्यूल नहीं मिला।</p>
          <p className="mt-1">कृपया दूसरा शब्द खोजें या श्रेणी बदलें।</p>
        </div>
      )}
    </div>
  );
};

export default DashboardModuleGrid;
