import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useAdmin } from '../context/AdminContext';
import { ActiveDesktopTab, SantaliWord } from '../types';
import { speakWithFemaleVoice } from '../utils/speech';
import { useVoiceSearch } from '../utils/voiceSearch';
import {
  Search,
  X,
  Keyboard,
  BookOpen,
  Leaf,
  GraduationCap,
  Languages,
  Bot,
  Flame,
  Settings,
  ShieldCheck,
  Volume2,
  ArrowRight,
  Sparkles,
  ExternalLink,
  History,
  Landmark,
  Compass,
  CornerDownLeft,
  PenTool,
  MessageSquare,
  Layers,
  Palette,
  HelpCircle,
  Calendar,
  Gamepad2,
  Headphones,
  Mic,
  MicOff,
  Music,
  Users,
  Smile,
  Clock,
  Shield,
  TreePine,
  Edit3,
  Globe,
  Quote,
  Scale,
  Sprout,
  Drama,
  Moon,
  Home,
  Droplets,
  Scissors,
  Hammer,
  HeartHandshake,
  Trees,
  ShoppingBag,
  Activity,
  Baby,
  Coffee,
  Target,
  FileText,
  Bookmark
} from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: ActiveDesktopTab) => void;
  onSendToTranslator?: (text: string) => void;
  onOpenAdmin?: () => void;
}

interface SearchItem {
  id: string;
  type: 'word' | 'module' | 'culture' | 'action';
  title: string;
  subtitle: string;
  scriptDevanagari?: string;
  category?: string;
  targetTab?: ActiveDesktopTab;
  wordData?: SantaliWord;
  description?: string;
  icon?: any;
}

// Built-in cultural & historical knowledge base entries
const CULTURAL_TOPICS: SearchItem[] = [
  {
    id: 'cult-raghunath',
    type: 'culture',
    title: 'Pandit Raghunath Murmu (Guru Gomke)',
    subtitle: 'Linguistic pioneer & philosopher · Visionary cultural guardian',
    scriptDevanagari: 'गुरु गोमके पण्डित रघुनाथ मुर्मू',
    category: 'History & Pioneers',
    targetTab: 'learn',
    description: 'Born in Mayurbhanj, Odisha (1905–1982). Cultural pioneer who unified and revitalized Santali education.'
  },
  {
    id: 'cult-hool',
    type: 'culture',
    title: 'Santhal Hool 1855 (Santali Revolution)',
    subtitle: 'Sidhu & Kanhu Murmu · The historic 1855 tribal revolution for self-rule and freedom',
    scriptDevanagari: 'सान्ताल हुल',
    category: 'Freedom & Heritage',
    targetTab: 'learn',
    description: 'On 30 June 1855, over 10,000 Santals led by Sidhu, Kanhu, Chand, and Bhairav declared independence against British colonial exploitation.'
  },
  {
    id: 'cult-sohrai',
    type: 'culture',
    title: 'Sohrai Mahaparv (सोहराय महापर्व)',
    subtitle: 'The five-day harvest and cattle thanksgiving festival with folk music and mural art',
    scriptDevanagari: 'सोहराय',
    category: 'Festivals',
    targetTab: 'calendar',
    description: 'Celebrated after the winter paddy harvest (November–January). Marked by cattle blessings, Sohrai songs, and earth murals.'
  },
  {
    id: 'cult-baha',
    type: 'culture',
    title: 'Baha Parab (बाहा परब)',
    subtitle: 'Spring Flower Festival · Welcoming Sal blossoms and nature renewal',
    scriptDevanagari: 'बाहा परब',
    category: 'Festivals',
    targetTab: 'calendar',
    description: 'The Spring festival celebrated when Sal trees bloom. Offerings made at Jaher Than by Naike (priest).'
  },
  {
    id: 'cult-birsa',
    type: 'culture',
    title: 'Dharti Aaba Birsa Munda (1875–1900)',
    subtitle: 'Ulgulan leader, tribal rights guardian, and legendary Indian freedom fighter',
    scriptDevanagari: 'बिरसा मुंडा',
    category: 'Pioneers',
    targetTab: 'learn',
    description: 'Led the Ulgulan movement against the British and oppressive land laws in Chotanagpur.'
  },
  {
    id: 'cult-santali-devnagari',
    type: 'culture',
    title: 'Santali Devanagari (संताली देवनागरी)',
    subtitle: 'Standardized Devanagari orthography for Santali literature and daily communication',
    scriptDevanagari: 'संताली देवनागरी',
    category: 'Linguistics',
    targetTab: 'learn',
    description: 'Enables millions of Santali speakers across Jharkhand, Bihar, and Bengal to read, write, and publish accurately.'
  }
];

// App Modules list
const APP_MODULES: SearchItem[] = [
  {
    id: 'mod-keyboard',
    type: 'module',
    title: 'Santali Virtual Keyboard',
    subtitle: 'Type in Santali Devanagari and Roman with live diacritics',
    targetTab: 'keyboard',
    icon: Keyboard,
    category: 'Input Tools',
    description: 'Multilingual keyboard with real-time Indian phonetic suggestions and themes.'
  },
  {
    id: 'mod-dict',
    type: 'module',
    title: 'Santali Dictionary (10,000+ Words)',
    subtitle: 'Multilingual vocabulary with female voice pronunciation and sentence examples',
    targetTab: 'dashboard',
    icon: BookOpen,
    category: 'Dictionary',
    description: 'Search English, Hindi, and Santali Devanagari with instant phonetics and audio playback.'
  },
  {
    id: 'mod-learn',
    type: 'module',
    title: 'Learn Santali Devanagari',
    subtitle: 'Master letters, vowels, numbers, and interactive daily vocabulary quizzes',
    targetTab: 'learn',
    icon: GraduationCap,
    category: 'Education',
    description: 'Interactive letter chart, audio phonetics, shape mnemonics, and knowledge quizzes.'
  },
  {
    id: 'mod-trans',
    type: 'module',
    title: 'Multilingual Translator',
    subtitle: 'Instant translation between Santali (Devanagari/Roman), Hindi, and English',
    targetTab: 'translator',
    icon: Languages,
    category: 'Translation',
    description: 'Bidirectional sentence translator with offline fallback and Google Translate bridge.'
  },
  {
    id: 'mod-ai',
    type: 'module',
    title: 'AI Search Assistant',
    subtitle: 'Ask anything about Santali language, culture and translation · Google Search grounded',
    targetTab: 'ai_assistant',
    icon: Bot,
    category: 'Translation',
    description: 'AI chat assistant (needs internet) for Santali words, festivals, history and general questions.'
  },
  {
    id: 'mod-quiz',
    type: 'module',
    title: 'Daily Santali Vocabulary Quiz',
    subtitle: '5 daily words from the dictionary · Daily streak counter and XP rewards',
    targetTab: 'daily_quiz',
    icon: Flame,
    category: 'Gamification',
    description: 'Track your daily streak, learn 5 indigenous words, and share your score.'
  },
  {
    id: 'mod-phrasebook',
    type: 'module',
    title: 'Everyday Santali Phrasebook',
    subtitle: 'Spoken daily dialogues with female voice audio in Roman, Santali Devanagari, Hindi & English',
    targetTab: 'phrasebook',
    icon: MessageSquare,
    category: 'Spoken Language',
    description: 'Categorized daily phrases for greetings, market, home, farming, and festivals with audio playback.'
  },
  {
    id: 'mod-flashcards',
    type: 'module',
    title: 'Santali Vocabulary Flashcards',
    subtitle: '3D interactive flip cards for memory retention & vocabulary mastery',
    targetTab: 'flashcards',
    icon: Layers,
    category: 'Memory & Retention',
    description: 'Flip card memory tool with audio pronunciation and XP rewards.'
  },
  {
    id: 'mod-calligraphy',
    type: 'module',
    title: 'Santali Devanagari Calligraphy & Festival Posters',
    subtitle: 'Craft high-definition festival greeting posters, Sohrai banners, and status cards',
    targetTab: 'calligraphy',
    icon: Palette,
    category: 'Cultural Art',
    description: 'Design custom Santali typography with tribal borders, symbol stamps, and PNG export.'
  },
  {
    id: 'mod-kudum',
    type: 'module',
    title: 'Kudum (साओताली पहेलियाँ) & Wise Proverbs',
    subtitle: 'Centuries-old Santali folklore riddles with tap-to-reveal answers and Bhent-Katha',
    targetTab: 'kudum',
    icon: HelpCircle,
    category: 'Folklore & Wisdom',
    description: 'Interactive Santali riddles and cultural wisdom proverbs with female voice audio.'
  },
  {
    id: 'mod-calendar',
    type: 'module',
    title: 'Santali Cultural Calendar & Festivals',
    subtitle: 'Sohrai, Baha Parab, Karam, Maghe and traditional agricultural seasonal almanac',
    targetTab: 'calendar',
    icon: Calendar,
    category: 'Heritage Almanac',
    description: 'Discover sacred Adivasi lunar months, deity veneration rituals, and traditional festive folk songs.'
  },
  {
    id: 'mod-wordle',
    type: 'module',
    title: 'Santali Wordle 5-Letter Game',
    subtitle: 'Guess daily 5-letter Santali words in 6 tries with virtual keyboard and hints',
    targetTab: 'wordle',
    icon: Gamepad2,
    category: 'Gamification',
    description: 'Daily Wordle puzzle in Santali Devanagari and Roman with streak rewards and hints.'
  },
  {
    id: 'mod-stories',
    type: 'module',
    title: 'Santali Folk Stories & History Player',
    subtitle: 'Listen to narrated audio stories of Pandit Raghunath Murmu, Santhal Hul 1855, and Pilchu Haram',
    targetTab: 'stories',
    icon: Headphones,
    category: 'Audio Storyteller',
    description: 'Synchronized karaoke-style multilingual audio reader for Santali folk tales and history.'
  },
  {
    id: 'mod-speech-coach',
    type: 'module',
    title: 'Pronunciation Coach & Accent Scoring',
    subtitle: 'Microphone speech recognition with phonetic feedback and pronunciation accuracy scores',
    targetTab: 'speech_coach',
    icon: Mic,
    category: 'Voice AI & Speech',
    description: 'Test your spoken Santali accent with instant 0-100% accuracy ratings and glottal check tips.'
  },
  {
    id: 'mod-speaker',
    type: 'module',
    title: 'Universal Voice Speaker & Reader',
    subtitle: 'High-clarity female speech synthesizer for Santali Devanagari, Hindi, and English',
    targetTab: 'speaker',
    icon: Volume2,
    category: 'Speech & Audio',
    description: 'Universal read-aloud tool with speed and pitch controls, preset dialogues, and speaker hardware test.'
  },
  {
    id: 'mod-instruments',
    type: 'module',
    title: 'Traditional Instruments & Rhythm Pad',
    subtitle: 'Playable Tumdak, Tamak, Tiriyo, and Banam with authentic festive rhythm loops',
    targetTab: 'instruments',
    icon: Music,
    category: 'Acoustic Studio',
    description: 'Interactive drumheads and bamboo flute with Sohrai and Lagre rhythm loops.'
  },
  {
    id: 'mod-family-tree',
    type: 'module',
    title: 'Santali Kinship & Family Tree Relations',
    subtitle: 'Comprehensive guide to maternal, paternal, in-law, and sibling kinship relations with audio',
    targetTab: 'family_tree',
    icon: Users,
    category: 'Kinship & Social',
    description: 'Master respectful Santali relations like Honyhar, Hanhar, Kaka, Hatom, and Tejang.'
  },
  {
    id: 'mod-kids-rhymes',
    type: 'module',
    title: 'Santali Kids Rhymes & Nursery Jukebox',
    subtitle: 'Cheerful animated children poems and songs with synchronized female voice singing',
    targetTab: 'kids_rhymes',
    icon: Smile,
    category: 'Children & Education',
    description: 'Popular poems like Hapa Hapa Chene, Dag Hijug Me, and Chando Mala.'
  },
  {
    id: 'mod-clock-numbers',
    type: 'module',
    title: 'Santali Talking Clock & 1-100 Numbers Master',
    subtitle: 'Real-time spoken time in Santali Devanagari and complete 1 to 100 counting chart with audio',
    targetTab: 'clock_numbers',
    icon: Clock,
    category: 'Numeracy & Time',
    description: 'Listen to current time announced in Santali and practice counting from Mit to Say.'
  },
  {
    id: 'mod-clans',
    type: 'module',
    title: 'The 12 Sacred Santali Clans (Paris) & Totems',
    subtitle: 'Murmu, Kisku, Hembram, Soren, Marndi, Tudu and all 12 clans with totem animals and history',
    targetTab: 'clans',
    icon: Shield,
    category: 'Ancestral Lineages',
    description: 'Discover your clan totem symbol, traditional duties, and ancestral marriage laws.'
  },
  {
    id: 'mod-flora-worksheets',
    type: 'module',
    title: 'Sacred Flora & Printable A4 Worksheets',
    subtitle: 'Ecological lore of Sal, Mahua, Karam plus 1-click printable PDF handwriting worksheets',
    targetTab: 'flora_worksheets',
    icon: TreePine,
    category: 'Environment & Worksheets',
    description: 'Printable Santali Devanagari practice sheets and Sohrai coloring sheets for schools.'
  },
  {
    id: 'mod-creation',
    type: 'module',
    title: 'धरती की सृष्टि व मानव उत्पत्ति (सिरजोन काहनी)',
    subtitle: 'ठाकुर जिउ, हांस-हांसिल, कछुआ, केंचुआ और पिलचु हाड़ाम-पिलचु बुढ़ी से १२ गोत्रों का उद्भव',
    targetTab: 'creation',
    icon: Globe,
    category: 'Mythology & Cosmology',
    description: 'संताली पवित्र सृष्टि गाथा: कैसे जलमग्न संसार से धरती का निर्माण हुआ और मानव जाति की शुरुआत हुई।'
  },
  {
    id: 'mod-dances',
    type: 'module',
    title: 'संताली पारंपरिक शीर्ष १० नृत्य (एनेच)',
    subtitle: 'लागड़े, सोहराय, बाहा, दांता, दोंग, करम, दहर, पांता, सेंदरा और गोलवारी नृत्य',
    targetTab: 'dances',
    icon: Music,
    category: 'Folk Dance & Music',
    description: 'पारंपरिक संताली लोकनृत्यों की पदताल, वेशभूषा, वाद्य यंत्र और प्रामाणिक लोकगीत।'
  },
  {
    id: 'mod-bonga-buru',
    type: 'module',
    title: 'शीर्ष १५ पूजा-पाठ एवं बोंगा-बुरु परंपरा',
    subtitle: 'मारांग बुरु, जाहेर एरा, मोड़ेको-तुरुईको, ओड़ाक् बोंगा, आबगे बोंगा व पवित्र बाखेर वंदना',
    targetTab: 'bonga_buru',
    icon: Flame,
    category: 'Spiritual & Sacred Lore',
    description: 'संताल धर्म की शीर्ष १५ पवित्र देव शक्तियां, थान, पुजारी, पारंपरिक भोग और पवित्र बाखेर मंत्र।'
  },
  {
    id: 'mod-governance',
    type: 'module',
    title: 'मांझी परगना स्वशासन व्यवस्था (Majhi Pargana System)',
    subtitle: 'मांझी हाड़ाम, परानिक, जोग मांझी, नायके, गोड़ेत व लोबीर बैसी की लोकतांत्रिक परंपरा',
    targetTab: 'governance',
    icon: Landmark,
    category: 'Governance & Heritage',
    description: 'पारंपरिक संताली ग्राम स्वशासन और कुलही दुरुप न्याय प्रणाली का सचित्र ज्ञानकोश।'
  },
  {
    id: 'mod-grammar',
    type: 'module',
    title: 'संताली व्याकरण व वाक्य निर्माता (Grammar & Sentence Lab)',
    subtitle: 'रोनौड़ (Ronoṛ): 3 वचन (द्विवचन सहित), समावेशी-अपवर्जक सर्वनाम और ड्रैग-एंड-टैप वाक्य निर्माण',
    targetTab: 'grammar',
    icon: BookOpen,
    category: 'Education & Linguistics',
    description: 'संताली व्याकरण के नियम सीखें और स्वयं नए शुद्ध संताली वाक्य बनाएं।'
  },
  {
    id: 'mod-greetings',
    type: 'module',
    title: 'पावन पर्व ई-कार्ड जेनरेटर (Festive E-Cards)',
    subtitle: 'सोहराय, बाहा, करम, सरहुल और नववर्ष पर सुंदर संताली देवनागरी ई-कार्ड बनाएं व शेयर करें',
    targetTab: 'greetings',
    icon: Sparkles,
    category: 'Creativity & Social',
    description: 'पारंपरिक संताली शुभकामना पत्र बनाकर WhatsApp पर 1-क्लिक शेयर करें।'
  },
  {
    id: 'mod-herbal',
    type: 'module',
    title: 'पारंपरिक वन-औषधियां व रान-रानाब (Ethnobotany)',
    subtitle: 'साल, महुआ, करंज, पलाश, चिरौंजी के पारंपरिक आदिवासी औषधीय उपयोग व तैयारी विधि',
    targetTab: 'herbal',
    icon: Leaf,
    category: 'Environment & Health',
    description: 'सदियों पुराना संताली पारंपरिक वन-औषधि ज्ञान व प्राकृतिक उपचार।'
  },
  {
    id: 'mod-sohrai-art',
    type: 'module',
    title: 'सोहराय व खोवर भित्तिचित्र कला स्टूडियो (Sohrai Mural Art)',
    subtitle: 'पारंपरिक मिट्टी की दीवारों पर प्राकृतिक रंगों व कांगई तकनीक से उकेरी जाने वाली आकृतियां',
    targetTab: 'sohrai_art',
    icon: Palette,
    category: 'Art & Heritage',
    description: 'इंटरैक्टिव सोहराय कला कैनवास, मारोक (मोर), डांगरा, हाकु आकृतियां और पूर्ण एडमिन संपादन।'
  },
  {
    id: 'mod-proverbs-bhenta',
    type: 'module',
    title: 'संताली भेंता काथा एवं लोकोक्तियाँ कोश (Proverbs & Wisdom)',
    subtitle: 'पीढ़ियों से संताली अखड़ा में गूंजती अनमोल भेंता काथा, रूपक व मेनकाथा का अर्थ व संदर्भ',
    targetTab: 'proverbs_bhenta',
    icon: Quote,
    category: 'Literature & Philosophy',
    description: 'दार्शनिक जीवन-दर्शन, आज की भेंता काथा, ऑडियो उच्चारण, व्हाट्सएप शेयर व एडमिन संपादन।'
  },
  {
    id: 'mod-agri-seasons',
    type: 'module',
    title: 'संताली पारम्परिक कृषि, ऋतु-चक्र व नक्षत्र ज्ञान (Agro-Ecology)',
    subtitle: 'रोहिणी नक्षत्र, देशी धान किस्में (करहनी, कनकचूर), प्राकृतिक मौसम सूचक व पारंपरिक काष्ठ औजार',
    targetTab: 'agri_seasons',
    icon: Sprout,
    category: 'Agriculture & Ecology',
    description: 'आदिवासी कृषि पंचांग, धुरिया एरा, मौसम संकेत, देशी हल नाहेल, दात्रोम व संपूर्ण प्रबंधन।'
  },
  {
    id: 'mod-traditional-measures',
    type: 'module',
    title: 'संताली पारंपरिक नाप-तौल व हाट-बाजार प्रणाली (Traditional Measures)',
    subtitle: 'पाय, कथा, गौनी, खांडी, एक हल जमीन (हाल) व 20 आधारित बीसा संख्या गणना प्रणाली',
    targetTab: 'traditional_measures',
    icon: Scale,
    category: 'Traditional Economy',
    description: 'इंटरैक्टिव नाप-तौल परिवर्तक गणक (Pai to Kg Calculator), हाट-हटिया विनिमय व एडमिन संपादन।'
  },
  {
    id: 'mod-architecture',
    type: 'module',
    title: 'संताली पारंपरिक वास्तु व ओड़ाक् विन्यास (Eco-Architecture)',
    subtitle: 'पिंडा, भीतर ओड़ाक्, कुलही, दुआर, गौहाल व पुआल बांदी की प्राकृतिक वास्तुकला',
    targetTab: 'architecture',
    icon: Home,
    category: 'Traditional Architecture',
    description: 'मिट्टी, साल खंभों व गोबर लिपाई से निर्मित भूकंप-रोधी व प्राकृतिक वातानुकूलित घर और एडमिन संपादन।'
  },
  {
    id: 'mod-historical-garhs',
    type: 'module',
    title: 'संताली ऐतिहासिक प्रवास व १२ प्राचीन गढ़ (Historical Migrations & 12 Garhs)',
    subtitle: 'हियारी-पिपरी, चाय-चंपा, कोयंडा, बादाम से संताल परगना दामिन-इ-कोह तक की ऐतिहासिक यात्रा',
    targetTab: 'historical_garhs',
    icon: Compass,
    category: 'History & Migrations',
    description: '१२ पारिस (गोत्रों) के १२ अजेय राजधानी गढ़, समय-रेखा, हुल तीर्थ व संपूर्ण एडमिन संपादन।'
  },
  {
    id: 'mod-puppetry-theater',
    type: 'module',
    title: 'चादर बदनी कठपुतली कला व अखड़ा लोक-नाट्य (Puppetry & Theater)',
    subtitle: 'संतालों की दुर्लभ काष्ठ कठपुतली कला चादर बदनी, मांदार वादक, नर्तक पुतलियां व जात्रा नाटक',
    targetTab: 'puppetry_theater',
    icon: Drama,
    category: 'Folk Theater & Puppetry',
    description: 'इंटरैक्टिव कठपुतली रंगमंच सिमुलेटर, लागड़े-सोहराय धुन, अखड़ा जात्रा और एडमिन संपादन।'
  },
  {
    id: 'mod-astronomy-lore',
    type: 'module',
    title: 'संताली खगोल-विज्ञान व आकाश-ज्ञान (Astronomy & Sky Lore)',
    subtitle: 'भुरका इपिल (भोर का तारा), बोंगा डाहार (आकाशगंगा), मोड़ेको-तुरुईको (सप्तर्षि) व कातरा इपिल (ध्रुव)',
    targetTab: 'astronomy_lore',
    icon: Moon,
    category: 'Astronomy & Sky Lore',
    description: 'संताली पुरखों का रात्रि तारा ज्ञान, दिशा-निर्धारण, ग्रहण लोककथा व संपूर्ण एडमिन संपादन।'
  },
  {
    id: 'mod-sendra-lobir',
    type: 'module',
    title: 'बीर-सेंदरा, लोबीर बैसी व अरण्य संरक्षण विधान (Sendra & Lobir Baisi)',
    subtitle: 'अयोध्या बुरु सर्वोच्च अरण्य न्यायालय, दिहरी न्याय विधान, गाभिन पशु संरक्षण व आखेट नीति',
    targetTab: 'sendra_lobir',
    icon: TreePine,
    category: 'Governance & Forest Law',
    description: 'संतालों का सर्वोच्च अरण्य लोकतंत्र लोबीर बैसी, समतावादी न्याय, पशु संरक्षण आचार संहिता व पूर्ण एडमिन संपादन।'
  },
  {
    id: 'mod-dhokra-art',
    type: 'module',
    title: 'संताली धोकरा धातु-कला व कमार विरासत (Dhokra Bell-Metal Casting)',
    subtitle: 'खोया-मोम पद्धति (Cire-Perdue), पवित्र धान माप पाई-सेर, बोंगा सादोम (अश्व) व हांसली आभूषण',
    targetTab: 'dhokra_art',
    icon: Hammer,
    category: 'Art & Metallurgy',
    description: '४००० वर्ष प्राचीन मोम तार ढलाई तकनीक, ६-चरणीय प्रक्रिया सिमुलेटर व संपूर्ण एडमिन संपादन।'
  },
  {
    id: 'mod-water-harvesting',
    type: 'module',
    title: 'संताली पारंपरिक जल-संरक्षण, डाड़ी-पुखुरी व ढलान खेती (Water Harvesting)',
    subtitle: 'अमृत डाड़ी सोते, आहार-बांध, पवित्र दाः बाखेड़ वर्षा प्रार्थना व टांड़-बायद-कनाली-बहल ढलान मैट्रिक्स',
    targetTab: 'water_harvesting',
    icon: Droplets,
    category: 'Ecology & Water Wisdom',
    description: 'संताली सूक्ष्म-वाटरशेड प्रबंधन, गुरुत्वाकर्षण सिंचाई, सामूहिक श्रमदान व पूर्ण एडमिन संपादन।'
  },
  {
    id: 'mod-handloom-weaving',
    type: 'module',
    title: 'संताली पारंपरिक वस्त्र बुनाई, करघा व प्राकृतिक वनस्पति रंगाई (Handloom & Dyes)',
    subtitle: 'पंछी-पारहाड़, तसर रेशम ककून (Kosa), पलाश व हर्रे प्राकृतिक रंगाई सूत्र व गढ़ा तंत करघा',
    targetTab: 'handloom_weaving',
    icon: Scissors,
    category: 'Handloom & Textiles',
    description: 'देशी कपास व रेशम बुनाई, बुरु चूड़ा ज्यामितीय बॉर्डर, वनस्पति रंग प्रयोगशाला व पूर्ण एडमिन संपादन।'
  },
  {
    id: 'mod-livestock-khuntau',
    type: 'module',
    title: 'संताली गोड़ा-पशुधन ज्ञान, खूंटाव परंपरा व गौ-रान (Livestock & Khuntau)',
    subtitle: 'सोहराय खूंटाव नर्तन, सींग रंगाई, दांगरा बाखेड़ पशु प्रार्थना व पारंपरिक वन-औषधि चिकित्सा (गौ-रान)',
    targetTab: 'livestock_khuntau',
    icon: HeartHandshake,
    category: 'Pastoral & Ethno-Veterinary',
    description: 'पशुधन सम्मान, गाई जगावे गीत, ४-चरणीय खूंटाव अनुष्ठान, खुरपका-मुंहपका देशी इलाज व पूर्ण एडमिन संपादन।'
  },
  {
    id: 'mod-woodcraft-carpentry',
    type: 'module',
    title: 'संताली पारंपरिक काष्ठ-कला, ढेंकी, नाहेल व काठ-शिल्प (Woodcraft & Carpentry)',
    subtitle: 'वैज्ञानिक पैर-चालित ढेंकी, कठोर पठार का साल नाहेल (हल), पारकोम-माची व तोका पशु घंटी',
    targetTab: 'woodcraft_carpentry',
    icon: Trees,
    category: 'Indigenous Carpentry',
    description: 'साल व शीशम की लकड़ी से बने आदिम कृषि व घरेलू यंत्र, काष्ठ भौतिकी सिमुलेटर व पूर्ण एडमिन संपादन।'
  },
  {
    id: 'mod-bamboo-craft',
    type: 'module',
    title: 'संताली बांस-शिल्प, मत्स्य आखेट उपकरण व टोकरी निर्माण (Bamboo Craft & Traps)',
    subtitle: 'हाताक\' (पवित्र सूप), कुमुनी व झिमरी (मछली फंदा), दउरा पेटारी व कृष्ण पक्ष बांस कटाई विज्ञान',
    targetTab: 'bamboo_craft',
    icon: ShoppingBag,
    category: 'Bamboo Craft & Basketry',
    description: 'देशी बांस की कमचियों से बनी आजीविका व मांगलिक वस्तुएं, धुआं उपचार ज्ञान व पूर्ण एडमिन संपादन।'
  },
  {
    id: 'mod-phonetics-lab',
    type: 'module',
    title: 'संताली ४ विशिष्ट कंठ ध्वनियां व उच्चारण प्रयोगशाला (Checked Consonants Lab)',
    subtitle: 'क\' (Ag), च\' (Uch), त\' (At), प\' (Ep) की रुद्ध कंठ्य ध्वनियां, न्यूनतम युग्म (Minimal Pairs) व अभ्यास',
    targetTab: 'phonetics_lab',
    icon: Activity,
    category: 'Linguistics & Phonetics',
    description: 'संताली भाषाविज्ञान की अद्वितीय रुद्ध ध्वनियों का ध्वन्यात्मक विश्लेषण, अर्थ-भेद तुलना व पूर्ण एडमिन संपादन।'
  },
  {
    id: 'mod-baby-names',
    type: 'module',
    title: 'संताली पारंपरिक नामकरण गाइड (Traditional Baby Names & Naming System)',
    subtitle: 'हपड़ाम कोवाक् ञुतुम दोहो नियम, दादा-दादी के नाम पर नामकरण, २००+ लड़कों व लड़कियों के अर्थपूर्ण नाम',
    targetTab: 'baby_names',
    icon: Baby,
    category: 'Culture & Naming',
    description: 'संताली समाज की पवित्र नामकरण पद्धति, हपड़ाम नियम, २००+ नाम, अर्थ, पारिस संबंध व महिला स्वर उच्चारण।'
  },
  {
    id: 'mod-ornaments-jewellery',
    type: 'module',
    title: 'संताली पारंपरिक आभूषण व शृंगार (Authentic Jewellery & Ornaments)',
    subtitle: 'हांसली, खागड़ा, साकम (कड़ा), रासा (झुमका), तरपत, बांक, तोड़ा, सिकरी व सीथी रजत कला',
    targetTab: 'ornaments_jewellery',
    icon: Sparkles,
    category: 'Art & Ornaments',
    description: 'चांदी व कांसे के १२ पारंपरिक संताली आभूषण, अंग-वार फ़िल्टर, धातु ढलाई विधि, सांस्कृतिक मर्यादा व ऑडियो।'
  },
  {
    id: 'mod-blacksmithy-iron',
    type: 'module',
    title: 'संताली पारंपरिक लोहार शिल्प व हथियार (Iron Smelting & Blacksmithy)',
    subtitle: 'दातरम (हँसिया), तांगा (कुल्हाड़ी), सार-फासी (तीर के फल), कुड़ी, खुरपी व चापुआ (दोहरी धौंकनी)',
    targetTab: 'blacksmithy_iron',
    icon: Hammer,
    category: 'Craft & Metallurgy',
    description: 'कामार और असुर-संताली प्राचीन धातुकर्म, कुटी भट्ठी, औजार निर्माण विधि, माप-भार व ऑडियो उच्चारण।'
  },
  {
    id: 'mod-seasons-weather',
    type: 'module',
    title: 'संताली ६ ऋतुएँ व प्राकृतिक मौसम पूर्वानुमान (6 Seasons & Weather Lore)',
    subtitle: 'सितांग, जेठ-दाक्, जापानी (वर्षा), दासांय, राभांग (शीत) व बाहा (वसंत) ऋतु एवं चींटियों-पक्षियों के संकेत',
    targetTab: 'seasons_weather',
    icon: Clock,
    category: 'Seasons & Weather Lore',
    description: 'संताली ६ ऋतुएं, कृषि-चक्र, पर्व और प्राकृतिक संकेतों द्वारा वर्षा का पारंपरिक अचूक पूर्वानुमान।'
  },
  {
    id: 'mod-idioms-menkatha',
    type: 'module',
    title: 'संताली मुहावरे, लोकोक्तियां व भेंता काथा (Santali Idioms & Menkatha)',
    subtitle: 'लाक्षणिक मुहावरे, शाब्दिक अर्थ, गहरा भावार्थ, दैनिक बोलचाल में सटीक उदाहरण वाक्य व ऑडियो',
    targetTab: 'idioms_menkatha',
    icon: MessageSquare,
    category: 'Linguistics & Proverbs',
    description: 'संताली भाषा के गहन मुहावरे (मेनकाथा / भेंता काथा), शाब्दिक व लाक्षणिक अर्थ और महिला स्वर उच्चारण।'
  },
  {
    id: 'mod-herbal-drinks',
    type: 'module',
    title: 'संताली पारंपरिक पेय व प्राकृतिक शरबत (Native Teas & Herbal Drinks)',
    subtitle: 'मातकोम रसा (महुआ शरबत), इचाक् बाहा लाल चाय, मांडी दाक्, बेल शरबत व पावन पोचोई मर्यादा',
    targetTab: 'herbal_drinks',
    icon: Coffee,
    category: 'Ethnobotany & Health',
    description: '८ पारंपरिक देशी पेय, रानू-रान २१ जड़ी-बूटियों का रहस्य, स्वास्थ्य लाभ, निर्माण विधि व सांस्कृतिक मर्यादा।'
  },
  {
    id: 'mod-archery-simulator',
    type: 'module',
    title: 'संताली आक-सार धनुर्विद्या व शब्द निशाना सिमुलेटर (Archery Master & Target Game)',
    subtitle: 'पारंपरिक आक (धनुष), सार (बाण), बेझा तुञ परंपरा और इंटरएक्टिव संताली शब्द निशाना खेल',
    targetTab: 'archery_simulator',
    icon: Target,
    category: 'Traditional Games & Sports',
    description: 'धनुष-बाण की शास्त्रीय बनावट, बेझा तुञ सकरात उत्सव और शब्दों पर सटीक तीरंदाजी खेल सिमुलेटर।'
  },
  {
    id: 'mod-traditional-cuisine',
    type: 'module',
    title: 'संताली पारंपरिक व्यंजन व पाककला (Traditional Cuisine & Recipes)',
    subtitle: 'साकाम पीठा, लेटे मंडी, रुगड़ा-ओत् व घोंघी-सुतली रसा की पौष्टिक विधियां व स्वास्थ्य रहस्य',
    targetTab: 'traditional_cuisine',
    icon: BookOpen,
    category: 'Traditional Cuisine',
    description: 'साल के पत्तों में भाप से पके व्यंजन, शून्य वसा, प्राकृतिक मशरूम और औषधीय सूप का संपूर्ण कोश।'
  },
  {
    id: 'mod-marriage-rituals',
    type: 'module',
    title: 'संताली ७ विवाह प्रकार व ३ जीवन संस्कार (Marriage & Life-cycle Rites)',
    subtitle: 'दुवार बापला, टुंकी दिपिल, गोलात, घरदी जांवाए, निम दाहाक्, चाचो छातियार व भांडान विधान',
    targetTab: 'marriage_rituals',
    icon: Users,
    category: 'Culture & Samskaras',
    description: 'संताली समाज के ७ पारंपरिक विवाह रूप, जन्म शुद्धि, सामाजिक वयस्कता और पूर्वज मिलन संस्कार।'
  },
  {
    id: 'mod-riddles-kudum',
    type: 'module',
    title: 'कुदुम पहेली प्रतियोगिता खेल (Kudum Folk Riddles Game)',
    subtitle: 'संताली लोक पहेलियां, विकल्प, उत्तर, स्कोर बोर्ड, संकेत और महिला स्वर उच्चारण',
    targetTab: 'riddles_kudum',
    icon: HelpCircle,
    category: 'Games & Riddles',
    description: 'हापड़ाम बुजुर्गों द्वारा संध्या चौपाल पर पूछे जाने वाले कुदुम का इंटरैक्टिव बौद्धिक खेल।'
  },
  {
    id: 'mod-sacred-pilgrimages',
    type: 'module',
    title: 'संताली पावन तीर्थ व ऐतिहासिक गढ़ (Sacred Pilgrimages & Garhs)',
    subtitle: 'लुगु बुरु घांटाबाड़ी धोरोमगाढ़, अयोध्या बुरु, भोगनाडीह हूल स्थल, चांपा गढ़ व मरांग बुरु',
    targetTab: 'sacred_pilgrimages',
    icon: Compass,
    category: 'Pilgrimage & History',
    description: 'संताल समाज के सर्वोच्च पावन पीठ, ऐतिहासिक युद्धस्थल, धार्मिक मेले और आचार संहिता।'
  },
  {
    id: 'mod-spoken-dialogues',
    type: 'module',
    title: 'दैनिक संताली बोलचाल संवाद (Everyday Spoken Dialogues)',
    subtitle: 'हाट-बाजार मोलभाव, अतिथि सत्कार, खेत-खामार रोपाई, रास्ता पूछना व वैद्य परामर्श',
    targetTab: 'spoken_dialogues',
    icon: MessageSquare,
    category: 'Spoken Language',
    description: 'वास्तविक जीवन परिस्थितियों में शुद्ध संताली देवनागरी और रोमन में धाराप्रवाह बोलचाल संवाद।'
  },
  {
    id: 'mod-letter-templates',
    type: 'module',
    title: 'संताली औपचारिक पत्र व नेवता साकाम (Formal Letter & Invitation Templates)',
    subtitle: 'विवाह निमंत्रण (बापला नेवता साकाम), मांझी हाड़ाम आवेदन, कुलही बैसी नोटिस व शोक पत्र',
    targetTab: 'letter_templates',
    icon: FileText,
    category: 'Formal Documents',
    description: 'संताली देवनागरी में तैयार पत्र प्रारूप, कॉपी, संपादन और 1-क्लिक प्रिंट सुविधा के साथ।'
  },
  {
    id: 'mod-illustrated-stories',
    type: 'module',
    title: 'सचित्र संताली लोककथाएं व नीति बोध (Illustrated Folk Tales & Wisdom)',
    subtitle: 'पिलचु हाड़ाम-बूढ़ी, तुरूई कोड़ा आर चालाक तूंईऊ, व करम-धरम सचित्र कथा वाचन',
    targetTab: 'illustrated_stories',
    icon: BookOpen,
    category: 'Folklore & Literature',
    description: 'दृश्य-दर-दृश्य सचित्र संताली लोककथाएं, देवनागरी लिपि, ऑडियो वाचन और नैतिक संदेश।'
  },
  {
    id: 'mod-favorites-notebook',
    type: 'module',
    title: 'इञाक् साकाम (मेरी पसंदीदा डायरी व ऑफ़लाइन नोटबुक)',
    subtitle: 'स्टार (⭐) किए गए व्यंजन, औपचारिक पत्र, तीर्थ स्थल, कुदुम पहेलियां और शब्दावली',
    targetTab: 'favorites_notebook',
    icon: Bookmark,
    category: 'Notebook & Saved Items',
    description: 'ऑफ़लाइन सुरक्षित व्यक्तिगत संताली डायरी, खोज, 1-क्लिक कॉपी और प्रबंधन।'
  },
  {
    id: 'mod-admin-cms',
    type: 'module',
    title: 'Admin Master Content Studio (CMS)',
    subtitle: 'Complete Add / Edit / Update access across all sections, hero text, and lexicon',
    targetTab: 'admin_cms',
    icon: Edit3,
    category: 'Administration & CMS',
    description: 'Full live editor with ready formats to add, edit, or delete words, phrases, and folklore.'
  },
  {
    id: 'mod-admin',
    type: 'action',
    title: 'Admin Authentication Portal',
    subtitle: 'Super Admin Login, Editorial Control & ID/Password Reset Recovery',
    icon: ShieldCheck,
    category: 'Administration',
    description: 'Manage dictionary words, edit Hero banner text, and manage security settings.'
  },
  {
    id: 'mod-settings',
    type: 'module',
    title: 'Settings & Preferences',
    subtitle: 'Default script configuration, voice speech options, and app data',
    targetTab: 'settings',
    icon: Settings,
    category: 'System',
    description: 'Customize suite preferences, script selection, and offline caching.'
  }
];

// Helper to highlight matching text query with a warm amber mark
export function highlightMatch(text: string, query: string) {
  if (!query || !text) return text;
  const trimmed = query.trim();
  if (!trimmed) return text;

  try {
    const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === trimmed.toLowerCase() ? (
            <mark
              key={index}
              className="bg-amber-200 text-amber-950 font-bold px-1 rounded-sm shadow-2xs"
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  } catch {
    return text;
  }
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onSendToTranslator,
  onOpenAdmin
}) => {
  const { words } = useAdmin();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'words' | 'modules' | 'culture'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Voice Search Integration
  const {
    isListening,
    interimTranscript,
    isSupported: isVoiceSupported,
    lang: voiceLang,
    setLang: setVoiceLang,
    errorMessage: voiceError,
    clearError: clearVoiceError,
    toggleListening,
    stopListening
  } = useVoiceSearch({
    defaultLang: 'hi-IN',
    onResult: (transcriptText) => {
      setQuery(transcriptText);
      inputRef.current?.focus();
    }
  });

  // Focus input on open & stop listening when closed
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
      if (isListening) {
        stopListening();
      }
    }
  }, [isOpen, isListening, stopListening]);

  // Combined search dataset
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();

    // 1. Filter Modules
    const matchedModules = APP_MODULES.filter((m) => {
      if (!q) return true;
      return (
        m.title.toLowerCase().includes(q) ||
        m.subtitle.toLowerCase().includes(q) ||
        m.description?.toLowerCase().includes(q) ||
        m.category?.toLowerCase().includes(q)
      );
    });

    // 2. Filter Culture
    const matchedCulture = CULTURAL_TOPICS.filter((c) => {
      if (!q) return true;
      return (
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q) ||
        c.scriptDevanagari?.includes(q) ||
        c.category?.toLowerCase().includes(q)
      );
    });

    // 3. Filter Dictionary Words
    let matchedWords: SearchItem[] = [];
    if (q) {
      const filtered = words.filter((w) => {
        return (
          w.wordRoman.toLowerCase().includes(q) ||
          w.wordDevanagari.toLowerCase().includes(q) ||
          w.meaningEnglish.toLowerCase().includes(q) ||
          w.meaningHindi.toLowerCase().includes(q) ||
          w.category.toLowerCase().includes(q) ||
          (w.exampleSantali && w.exampleSantali.toLowerCase().includes(q))
        );
      });

      matchedWords = filtered.slice(0, 50).map((w) => ({
        id: `word-${w.id}`,
        type: 'word' as const,
        title: w.wordRoman,
        subtitle: `${w.meaningEnglish} · ${w.meaningHindi}`,
        scriptDevanagari: w.wordDevanagari,
        category: w.category,
        targetTab: 'dashboard' as ActiveDesktopTab,
        wordData: w,
        description: w.exampleSantali || w.exampleEnglish || undefined
      }));
    } else {
      // Default: top 15 words
      matchedWords = words.slice(0, 15).map((w) => ({
        id: `word-${w.id}`,
        type: 'word' as const,
        title: w.wordRoman,
        subtitle: `${w.meaningEnglish} · ${w.meaningHindi}`,
        scriptDevanagari: w.wordDevanagari,
        category: w.category,
        targetTab: 'dashboard' as ActiveDesktopTab,
        wordData: w,
        description: w.exampleSantali || undefined
      }));
    }

    // Apply active filter
    let combined: SearchItem[] = [];
    if (activeFilter === 'all') {
      combined = [...matchedModules, ...matchedCulture, ...matchedWords];
    } else if (activeFilter === 'modules') {
      combined = matchedModules;
    } else if (activeFilter === 'culture') {
      combined = matchedCulture;
    } else if (activeFilter === 'words') {
      combined = matchedWords;
    }

    return combined;
  }, [query, words, activeFilter]);

  // Keep selected index in range
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchResults.length, activeFilter]);

  // Handle Keyboard Navigation (ArrowUp, ArrowDown, Enter, Escape)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1 < searchResults.length ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : searchResults.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = searchResults[selectedIndex];
        if (item) {
          handleSelectItem(item);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, searchResults, selectedIndex]);

  // Select Item handler
  const handleSelectItem = (item: SearchItem) => {
    if (item.id === 'mod-admin') {
      if (onOpenAdmin) onOpenAdmin();
      onClose();
      return;
    }

    if (item.targetTab) {
      onNavigateTab(item.targetTab);
    }
    onClose();
  };

  const handleSpeak = (text: string) => {
    speakWithFemaleVoice(text, { lang: 'hi-IN' });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-16 p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input Bar */}
        <div className={`p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3 transition-colors ${
          isListening
            ? 'bg-gradient-to-r from-rose-50 via-white to-amber-50/30'
            : 'bg-gradient-to-r from-amber-50/40 via-white to-white'
        }`}>
          <Search className={`w-5 h-5 shrink-0 transition-colors ${isListening ? 'text-rose-600' : 'text-amber-600'}`} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isListening
                ? 'सुन रहे हैं... बोलिए (बोलें: "जोहार", "सारना", "मातकोम", "बापला")...'
                : 'Search 10,000+ Santali words, Devanagari, culture... (Ctrl+K)'
            }
            className="flex-1 bg-transparent text-slate-900 placeholder:text-slate-400 font-semibold text-base sm:text-lg focus:outline-none"
          />

          {/* Voice Search Button */}
          <button
            type="button"
            onClick={toggleListening}
            title={
              isListening
                ? 'वॉइस सर्च बंद करें (Stop Voice Search)'
                : 'बोलकर खोजें (Voice Search - हिंदी / संताली देवनागरी / English)'
            }
            className={`p-2 sm:px-3 sm:py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse shadow-md ring-4 ring-rose-200'
                : 'text-amber-800 bg-amber-100/80 hover:bg-amber-200 hover:text-amber-900 border border-amber-300/50'
            }`}
          >
            <Mic className={`w-4 h-4 ${isListening ? 'animate-bounce text-white' : 'text-amber-700'}`} />
            <span className="hidden sm:inline text-xs font-bold">
              {isListening ? 'सुन रहे हैं...' : 'वॉइस सर्च'}
            </span>
          </button>

          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              title="Clear Search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
              <span>ESC</span>
            </div>
          )}
        </div>

        {/* Live Voice Search Bar (Listening / Interim transcript feedback) */}
        {isListening && (
          <div className="px-4 py-2 bg-gradient-to-r from-rose-50 via-rose-100/60 to-amber-50 border-b border-rose-200 flex flex-wrap items-center justify-between gap-2 text-xs text-rose-900 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
              </span>
              <span className="font-semibold text-rose-800">
                {interimTranscript ? (
                  <span className="italic font-bold text-rose-950">"{interimTranscript}"</span>
                ) : (
                  'माइक्रोफ़ोन चालू है... संताली या हिन्दी में बोलिए'
                )}
              </span>
            </div>

            {/* Language Switcher for Voice Search */}
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="text-slate-500 font-medium">भाषा:</span>
              <button
                type="button"
                onClick={() => setVoiceLang('hi-IN')}
                className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                  voiceLang === 'hi-IN'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white/80 text-slate-700 hover:bg-white border border-rose-200'
                }`}
              >
                🇮🇳 हिन्दी / संताली
              </button>
              <button
                type="button"
                onClick={() => setVoiceLang('en-IN')}
                className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                  voiceLang === 'en-IN'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white/80 text-slate-700 hover:bg-white border border-rose-200'
                }`}
              >
                🔤 English / Roman
              </button>
              <button
                type="button"
                onClick={stopListening}
                className="ml-1 text-rose-700 hover:text-rose-900 font-bold px-1.5 py-0.5 rounded hover:bg-rose-200/60"
                title="Stop Listening"
              >
                बंद करें ✕
              </button>
            </div>
          </div>
        )}

        {/* Voice Error Banner */}
        {voiceError && (
          <div className="px-4 py-2 bg-amber-50 border-b border-amber-200 flex items-center justify-between text-xs text-amber-900 animate-in fade-in duration-150">
            <span className="flex items-center gap-1.5">
              <span>⚠️</span>
              <span>{voiceError}</span>
            </span>
            <button
              type="button"
              onClick={clearVoiceError}
              className="text-amber-800 hover:text-amber-950 font-bold px-1.5 py-0.5 rounded hover:bg-amber-100"
            >
              ✕
            </button>
          </div>
        )}

        {/* Filter Pills */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs font-bold text-slate-600">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'hover:bg-slate-200 text-slate-700'
            }`}
          >
            All Results ({searchResults.length})
          </button>
          <button
            onClick={() => setActiveFilter('words')}
            className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
              activeFilter === 'words'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'hover:bg-slate-200 text-slate-700'
            }`}
          >
            📖 Words &amp; Dictionary
          </button>
          <button
            onClick={() => setActiveFilter('modules')}
            className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
              activeFilter === 'modules'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'hover:bg-slate-200 text-slate-700'
            }`}
          >
            ⚡ Features &amp; Tools
          </button>
          <button
            onClick={() => setActiveFilter('culture')}
            className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
              activeFilter === 'culture'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'hover:bg-slate-200 text-slate-700'
            }`}
          >
            🌿 Culture &amp; History
          </button>
        </div>

        {/* Results List */}
        <div ref={listRef} className="overflow-y-auto p-3 space-y-1.5 flex-1 min-h-[280px]">
          {searchResults.length === 0 ? (
            <div className="p-10 text-center space-y-2">
              <Search className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-800 text-sm">No matches found for "{query}"</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching by Roman spelling (e.g., <em>Johar</em>, <em>Dare</em>, <em>Sohrai</em>), English/Hindi meaning, or feature name.
              </p>
            </div>
          ) : (
            searchResults.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = item.icon || (item.type === 'word' ? BookOpen : Landmark);

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-amber-50/80 border-amber-300 shadow-xs ring-1 ring-amber-400/30'
                      : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        item.type === 'word'
                          ? 'bg-amber-100 text-amber-800'
                          : item.type === 'culture'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-sky-100 text-sky-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm sm:text-base">
                          {highlightMatch(item.title, query)}
                        </span>
                        {item.scriptDevanagari && (
                          <span className="text-xs sm:text-sm font-bold text-amber-950 bg-amber-100/90 px-2.5 py-0.5 rounded-lg border border-amber-300 shadow-2xs">
                            {highlightMatch(item.scriptDevanagari, query)}
                          </span>
                        )}
                        {item.category && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            • {highlightMatch(item.category, query)}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 font-medium">
                        {highlightMatch(item.subtitle, query)}
                      </p>

                      {item.description && (
                        <p className="text-[11px] text-slate-500 line-clamp-1 italic">
                          {highlightMatch(item.description, query)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Action Shortcuts */}
                  <div className="flex items-center gap-1.5 shrink-0 pt-1">
                    {item.wordData && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSpeak(item.wordData?.wordDevanagari || item.title);
                        }}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-800 transition-colors cursor-pointer"
                        title="Listen Audio Pronunciation"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}

                    <div className="hidden sm:flex items-center text-xs font-bold text-slate-400">
                      {isSelected ? (
                        <span className="flex items-center gap-1 text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded-md font-mono text-[10px]">
                          <span>ENTER</span>
                          <CornerDownLeft className="w-3 h-3" />
                        </span>
                      ) : (
                        <ArrowRight className="w-4 h-4 opacity-30" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 px-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono font-bold text-[10px]">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono font-bold text-[10px]">
                ↓
              </kbd>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono font-bold text-[10px]">
                Enter
              </kbd>
              <span>to open</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono font-bold text-[10px]">
                ESC
              </kbd>
              <span>to close</span>
            </span>
          </div>

          <span className="hidden sm:inline font-semibold text-amber-800">
            Hor Katha Suite · Global Spotlight
          </span>
        </div>
      </div>
    </div>
  );
};
