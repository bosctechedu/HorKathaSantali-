import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { SantaliWord, SiteHeroConfig } from '../types';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import { CREATION_STAGES, CreationStage } from './SantaliCreationMyth';
import { TOP_10_DANCES, SantaliDance } from './SantaliDancesTop10';
import { TOP_15_BONGA_BURU, BongaBuruDeity } from './SantaliBongaBuruTop15';
import { MAJHI_ROLES, MajhiRole } from './MajhiParganaSystem';
import { HERBAL_PLANTS, HerbalPlant } from './SantaliHerbalRemedies';
import { DEFAULT_SANTALI_FESTIVALS, FestivalData } from './CulturalCalendar';
import { DEFAULT_CLANS_DATA, ClanData } from './SantaliClansDirectory';
import { DEFAULT_ATTIRE_ITEMS, AttireItem } from './SantaliAttireOrnaments';
import { DEFAULT_BAPLA_TYPES, BaplaType } from './SantaliMarriageBapla';
import { DEFAULT_HUL_HEROES, HulHero } from './SanthalHulHeroes';
import { DEFAULT_CUISINE_RECIPES, CuisineRecipe } from './SantaliCuisineRecipes';
import { DEFAULT_SPORTS_ITEMS, SportItem } from './SantaliTraditionalSports';
import { DEFAULT_FOLK_SONGS, FolkSong } from './SantaliFolkSongsArchive';
import { DEFAULT_PILGRIMAGE_SITES, PilgrimageSite } from './SantaliPilgrimageSites';
import { DEFAULT_LIFE_RITES, LifeRite } from './SantaliLifeRites';
import { DEFAULT_PHRASES_DATA, PhraseItem } from './SantaliPhrasebook';
import { DEFAULT_KUDUM_LIST, KudumItem } from './KudumProverbs';
import { CustomHeroSlide } from './SantaliHeritageSlideshow';
import { HERITAGE_30_SLIDES } from '../data/heritageGalleryData';
import {
  ShieldCheck,
  Edit3,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  BookOpen,
  Layout,
  MessageSquare,
  HelpCircle,
  Calendar,
  Download,
  Upload,
  Globe,
  Music,
  Flame,
  Landmark,
  Leaf,
  Shield,
  Search,
  CheckCircle2,
  Heart,
  Swords,
  ShoppingBag,
  UtensilsCrossed,
  Target,
  Radio,
  Compass,
  Baby,
  X
} from 'lucide-react';

export type AdminTab =
  | 'hero'
  | 'dictionary'
  | 'creation'
  | 'dances'
  | 'bonga_buru'
  | 'hul_heroes'
  | 'bapla'
  | 'attire'
  | 'cuisine'
  | 'sports'
  | 'songs'
  | 'pilgrimage'
  | 'rites'
  | 'governance'
  | 'herbal'
  | 'calendar'
  | 'clans'
  | 'phrases'
  | 'riddles'
  | 'backup';

export const AdminMasterStudio: React.FC<{ onClose?: () => void; initialTab?: AdminTab }> = ({
  onClose,
  initialTab = 'hero'
}) => {
  const {
    isAdmin,
    heroConfig,
    updateHeroConfig,
    resetHeroConfig,
    words,
    addWord,
    updateWord,
    deleteWord
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<AdminTab>(initialTab);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // 1. Hero State
  const [heroForm, setHeroForm] = useState<SiteHeroConfig>({ ...heroConfig });
  const [heroSlides, setHeroSlides] = useState<CustomHeroSlide[]>(() =>
    safeLoadFromStorage<CustomHeroSlide[]>('hor_katha_custom_hero_slides', [])
  );

  const handleDeleteHeroSlide = (id: string) => {
    const updated = heroSlides.filter((s) => s.id !== id);
    setHeroSlides(updated);
    safeSaveToStorage('hor_katha_custom_hero_slides', updated);
    showNotification('स्लाइडर तस्वीर हटा दी गई!');
  };

  const handleClearHeroSlides = () => {
    if (confirm('क्या आप सचमुच स्लाइडर की सभी तस्वीरें खाली करना चाहते हैं?')) {
      setHeroSlides([]);
      safeSaveToStorage('hor_katha_custom_hero_slides', []);
      showNotification('स्लाइडर पूरी तरह खाली कर दिया गया!');
    }
  };

  const handleLoadSampleHeroSlides = () => {
    const sampleSlides: CustomHeroSlide[] = HERITAGE_30_SLIDES.slice(0, 5).map((s) => ({
      id: `sample_${s.id}`,
      imageUrl: s.imageUrl,
      heading: s.titleDevanagari || s.titleEnglish,
      subheading: s.titleEnglish,
      category: s.category,
      badge: s.badge,
      description: s.description,
      locationOrDate: 'झारखंड / पश्चिम बंगाल / ओडिशा',
      accentColor: s.accentColor,
      createdAt: Date.now()
    }));
    setHeroSlides(sampleSlides);
    safeSaveToStorage('hor_katha_custom_hero_slides', sampleSlides);
    showNotification('सैंपल हेरिटेज स्लाइड लोड हो गईं!');
  };

  // 2. Dictionary State
  const [dictSearch, setDictSearch] = useState('');
  const [editingWordId, setEditingWordId] = useState<string | null>(null);
  const [wordForm, setWordForm] = useState<Partial<SantaliWord>>({
    wordDevanagari: '',
    wordRoman: '',
    phonetic: '',
    partOfSpeech: 'noun',
    category: 'relation',
    meaningEnglish: '',
    meaningHindi: '',
    exampleSantali: '',
    exampleHindi: '',
    exampleEnglish: ''
  });

  // 3. Creation Stages State
  const [creationStages, setCreationStages] = useState<CreationStage[]>(() =>
    safeLoadFromStorage('hor_katha_cms_creation', CREATION_STAGES)
  );
  const [selectedCreationIdx, setSelectedCreationIdx] = useState(0);

  // 4. Dances State
  const [dances, setDances] = useState<SantaliDance[]>(() =>
    safeLoadFromStorage('hor_katha_cms_dances', TOP_10_DANCES)
  );
  const [selectedDanceIdx, setSelectedDanceIdx] = useState(0);

  // 5. Bonga Buru State
  const [deities, setDeities] = useState<BongaBuruDeity[]>(() =>
    safeLoadFromStorage('hor_katha_cms_bonga_buru', TOP_15_BONGA_BURU)
  );
  const [selectedDeityIdx, setSelectedDeityIdx] = useState(0);

  // 6. Majhi Roles State
  const [roles, setRoles] = useState<MajhiRole[]>(() =>
    safeLoadFromStorage('hor_katha_cms_majhi_roles', MAJHI_ROLES)
  );
  const [selectedRoleIdx, setSelectedRoleIdx] = useState(0);

  // 7. Herbal Plants State
  const [herbal, setHerbal] = useState<HerbalPlant[]>(() =>
    safeLoadFromStorage('hor_katha_cms_herbal', HERBAL_PLANTS)
  );
  const [selectedHerbIdx, setSelectedHerbIdx] = useState(0);

  // 8. Cultural Festivals State
  const [festivals, setFestivals] = useState<FestivalData[]>(() =>
    safeLoadFromStorage('hor_katha_custom_festivals_v2', DEFAULT_SANTALI_FESTIVALS)
  );
  const [selectedFestIdx, setSelectedFestIdx] = useState(0);

  // 9. Clans State
  const [clans, setClans] = useState<ClanData[]>(() =>
    safeLoadFromStorage('hor_katha_custom_clans_v1', DEFAULT_CLANS_DATA)
  );
  const [selectedClanIdx, setSelectedClanIdx] = useState(0);

  // 10. Phrases State
  const [phrases, setPhrases] = useState<PhraseItem[]>(() =>
    safeLoadFromStorage('hor_katha_phrasebook_db', DEFAULT_PHRASES_DATA)
  );
  const [editingPhraseId, setEditingPhraseId] = useState<string | null>(null);
  const [phraseForm, setPhraseForm] = useState<Omit<PhraseItem, 'id'>>({
    category: 'Greetings',
    santaliRoman: '',
    santaliDevanagari: '',
    hindi: '',
    english: '',
    context: ''
  });

  // 11. Kudum & Proverbs State
  const [kudums, setKudums] = useState<KudumItem[]>(() =>
    safeLoadFromStorage('hor_katha_kudum_db', DEFAULT_KUDUM_LIST)
  );
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

  // 12. Attire & Ornaments State
  const [attireItems, setAttireItems] = useState<AttireItem[]>(() =>
    safeLoadFromStorage('hor_katha_cms_attire', DEFAULT_ATTIRE_ITEMS)
  );
  const [selectedAttireIdx, setSelectedAttireIdx] = useState(0);

  // 13. Marriage Bapla State
  const [baplaList, setBaplaList] = useState<BaplaType[]>(() =>
    safeLoadFromStorage('hor_katha_cms_bapla', DEFAULT_BAPLA_TYPES)
  );
  const [selectedBaplaIdx, setSelectedBaplaIdx] = useState(0);

  // 14. Hul Heroes State
  const [hulHeroes, setHulHeroes] = useState<HulHero[]>(() =>
    safeLoadFromStorage('hor_katha_cms_hul_heroes', DEFAULT_HUL_HEROES)
  );
  const [selectedHulHeroIdx, setSelectedHulHeroIdx] = useState(0);

  // 15. Cuisine State
  const [cuisineRecipes, setCuisineRecipes] = useState<CuisineRecipe[]>(() =>
    safeLoadFromStorage('hor_katha_cms_cuisine', DEFAULT_CUISINE_RECIPES)
  );
  const [selectedCuisineIdx, setSelectedCuisineIdx] = useState(0);

  // 16. Sports State
  const [sportsItems, setSportsItems] = useState<SportItem[]>(() =>
    safeLoadFromStorage('hor_katha_cms_sports', DEFAULT_SPORTS_ITEMS)
  );
  const [selectedSportIdx, setSelectedSportIdx] = useState(0);

  // 17. Folk Songs State
  const [folkSongs, setFolkSongs] = useState<FolkSong[]>(() =>
    safeLoadFromStorage('hor_katha_cms_folk_songs', DEFAULT_FOLK_SONGS)
  );
  const [selectedSongIdx, setSelectedSongIdx] = useState(0);

  // 18. Pilgrimage Sites State
  const [pilgrimageSites, setPilgrimageSites] = useState<PilgrimageSite[]>(() =>
    safeLoadFromStorage('hor_katha_cms_pilgrimage', DEFAULT_PILGRIMAGE_SITES)
  );
  const [selectedSiteIdx, setSelectedSiteIdx] = useState(0);

  // 19. Life Rites State
  const [lifeRites, setLifeRites] = useState<LifeRite[]>(() =>
    safeLoadFromStorage('hor_katha_cms_life_rites', DEFAULT_LIFE_RITES)
  );
  const [selectedRiteIdx, setSelectedRiteIdx] = useState(0);

  // ==============================================================
  // SAVE HANDLERS (UPDATE LIVE)
  // ==============================================================
  const handleSaveHero = () => {
    updateHeroConfig(heroForm);
    showNotification('मुख्य बैनर (Hero Banner) सफलतापूर्वक सहेजा गया!');
  };

  const handleSaveCreation = () => {
    safeSaveToStorage('hor_katha_cms_creation', creationStages);
    showNotification('धरती की सृष्टि (सिरजोन काहनी) का डेटा सहेजा गया!');
  };

  const handleSaveDances = () => {
    safeSaveToStorage('hor_katha_cms_dances', dances);
    showNotification('पारंपरिक शीर्ष १० नृत्य (एनेच) का डेटा सहेजा गया!');
  };

  const handleSaveBongaBuru = () => {
    safeSaveToStorage('hor_katha_cms_bonga_buru', deities);
    showNotification('पूजा-पाठ व १५ बोंगा-बुरु का डेटा सहेजा गया!');
  };

  const handleSaveRoles = () => {
    safeSaveToStorage('hor_katha_cms_majhi_roles', roles);
    showNotification('मांझी परगना स्वशासन व्यवस्था का डेटा सहेजा गया!');
  };

  const handleSaveHerbal = () => {
    safeSaveToStorage('hor_katha_cms_herbal', herbal);
    showNotification('पारंपरिक वन-औषधियां (रान-रानाब) का डेटा सहेजा गया!');
  };

  const handleSaveFestivals = () => {
    safeSaveToStorage('hor_katha_custom_festivals_v2', festivals);
    showNotification('सांस्कृतिक महापर्व पंचांग का डेटा सहेजा गया!');
  };

  const handleSaveClans = () => {
    safeSaveToStorage('hor_katha_custom_clans_v1', clans);
    showNotification('१२ पवित्र पारिस व गोत्र का डेटा सहेजा गया!');
  };

  const handleSaveAttire = () => {
    safeSaveToStorage('hor_katha_cms_attire', attireItems);
    showNotification('पारंपरिक वस्त्र व आभूषण का डेटा सहेजा गया!');
  };

  const handleSaveBapla = () => {
    safeSaveToStorage('hor_katha_cms_bapla', baplaList);
    showNotification('संथाली बापला संस्कार का डेटा सहेजा गया!');
  };

  const handleSaveHulHeroes = () => {
    safeSaveToStorage('hor_katha_cms_hul_heroes', hulHeroes);
    showNotification('संथाल हुल महापुरुषों का डेटा सहेजा गया!');
  };

  const handleSaveCuisine = () => {
    safeSaveToStorage('hor_katha_cms_cuisine', cuisineRecipes);
    showNotification('खान-पान व व्यंजन डेटा सहेजा गया!');
  };

  const handleSaveSports = () => {
    safeSaveToStorage('hor_katha_cms_sports', sportsItems);
    showNotification('पारंपरिक खेल व शिकार डेटा सहेजा गया!');
  };

  const handleSaveSongs = () => {
    safeSaveToStorage('hor_katha_cms_folk_songs', folkSongs);
    showNotification('लोकगीत एवं सेरेञ डेटा सहेजा गया!');
  };

  const handleSavePilgrimage = () => {
    safeSaveToStorage('hor_katha_cms_pilgrimage', pilgrimageSites);
    showNotification('तीर्थ स्थल डेटा सहेजा गया!');
  };

  const handleSaveLifeRites = () => {
    safeSaveToStorage('hor_katha_cms_life_rites', lifeRites);
    showNotification('जीवन-संस्कार दर्शन डेटा सहेजा गया!');
  };

  // ==============================================================
  // ADD & DELETE HANDLERS (FULL CRUD FOR EVERY SECTION)
  // ==============================================================
  // 1. Creation
  const handleAddCreation = () => {
    const nextId = creationStages.length > 0 ? Math.max(...creationStages.map((s) => s.id)) + 1 : 1;
    const newStage: CreationStage = {
      id: nextId,
      stageNameDevanagari: `${nextId}. नया सृष्टि अध्याय`,
      stageNameRoman: `${nextId}. Nawa Srijon Tahni`,
      stageNameHindi: `नया सृष्टि चरण ${nextId}`,
      subtitle: 'नए अध्याय का संक्षिप्त परिचय यहां लिखें',
      symbol: '✨',
      narrativeSantali: 'संताली देवनागरी में नया विवरण यहां लिखें...',
      narrativeHindi: 'हिन्दी में विस्तृत विवेचन यहां लिखें...',
      narrativeEnglish: 'English narrative...',
      keyFigures: ['ठाकुर जिउ', 'सृष्टि के पात्र'],
      philosophicalMeaning: 'इस चरण का मुख्य दार्शनिक संदेश...',
      themeColor: 'border-blue-500',
      bgGradient: 'from-blue-900 via-indigo-950 to-slate-950'
    };
    const updated = [...creationStages, newStage];
    setCreationStages(updated);
    setSelectedCreationIdx(updated.length - 1);
    safeSaveToStorage('hor_katha_cms_creation', updated);
    showNotification('नया सृष्टि अध्याय जुड़ गया! नीचे इसका विवरण संपादित करें।');
  };

  const handleDeleteCreation = (idx: number) => {
    if (confirm('क्या आप सचमुच इस अध्याय को हटाना चाहते हैं?')) {
      const updated = creationStages.filter((_, i) => i !== idx);
      setCreationStages(updated);
      setSelectedCreationIdx(Math.max(0, idx - 1));
      safeSaveToStorage('hor_katha_cms_creation', updated);
      showNotification('अध्याय सफलतापूर्वक हटा दिया गया!');
    }
  };

  // 2. Dances
  const handleAddDance = () => {
    const nextId = dances.length > 0 ? Math.max(...dances.map((d) => d.id)) + 1 : 1;
    const newDance: SantaliDance = {
      id: nextId,
      nameDevanagari: 'नया संताली नृत्य (एनेच)',
      nameRoman: 'Nawa Enec Dance',
      nameHindi: 'नया पारंपरिक नृत्य',
      category: 'social',
      occasionSeason: 'पर्व व ऋतु का नाम',
      formationStyle: 'शृंखला व घेरा शैली',
      instrumentsUsed: ['तुमाक', 'तामाक'],
      attireMaleFemale: 'पारंपरिक पांची पारहांड व धोती',
      choreographyHighlights: ['कदमताल व झुकना'],
      authenticSongDev: 'संताली लोकगीत के बोल...',
      authenticSongHindi: 'गीत का हिन्दी अर्थ...',
      culturalEssence: 'नृत्य का सांस्कृतिक महत्व...',
      gradient: 'from-amber-600 to-rose-700',
      accentBg: 'bg-amber-100 text-amber-800'
    };
    const updated = [...dances, newDance];
    setDances(updated);
    setSelectedDanceIdx(updated.length - 1);
    safeSaveToStorage('hor_katha_cms_dances', updated);
    showNotification('नया नृत्य जुड़ गया!');
  };

  const handleDeleteDance = (idx: number) => {
    if (confirm('क्या आप सचमुच इस नृत्य को हटाना चाहते हैं?')) {
      const updated = dances.filter((_, i) => i !== idx);
      setDances(updated);
      setSelectedDanceIdx(Math.max(0, idx - 1));
      safeSaveToStorage('hor_katha_cms_dances', updated);
      showNotification('नृत्य हटा दिया गया!');
    }
  };

  // 3. Bonga Buru
  const handleAddBongaBuru = () => {
    const nextId = deities.length > 0 ? Math.max(...deities.map((d) => d.id)) + 1 : 1;
    const newDeity: BongaBuruDeity = {
      id: nextId,
      nameDevanagari: 'नया बोंगा / देव शक्ति',
      nameRoman: 'Nawa Bonga Deity',
      titleHindi: 'देव शक्ति उपाधि',
      category: 'jaher_than',
      categoryLabel: 'पवित्र देव शक्ति',
      sacredShrine: 'पवित्र थान (स्थान)',
      primaryPriest: 'नायके हाड़ाम / कुदाम नायके',
      mainFestivals: ['बाहा परोब', 'सोहराय परोब'],
      sacredOfferings: ['सफेद मुर्गा', 'तपान हांडी', 'धूप'],
      bakherPrayerDev: 'जोहार तोबे ठाकुर जिउ... पवित्र बाखेर मंत्र...',
      bakherPrayerHindi: 'मंत्र का हिन्दी भावार्थ...',
      spiritualSignificance: 'आध्यात्मिक भूमिका व संरक्षण...',
      iconBg: 'bg-amber-100 text-amber-800',
      gradient: 'from-amber-700 to-stone-900'
    };
    const updated = [...deities, newDeity];
    setDeities(updated);
    setSelectedDeityIdx(updated.length - 1);
    safeSaveToStorage('hor_katha_cms_bonga_buru', updated);
    showNotification('नया बोंगा-बुरु जुड़ गया!');
  };

  const handleDeleteBongaBuru = (idx: number) => {
    if (confirm('क्या आप सचमुच इस बोंगा-बुरु को हटाना चाहते हैं?')) {
      const updated = deities.filter((_, i) => i !== idx);
      setDeities(updated);
      setSelectedDeityIdx(Math.max(0, idx - 1));
      safeSaveToStorage('hor_katha_cms_bonga_buru', updated);
      showNotification('बोंगा-बुरु हटा दिया गया!');
    }
  };

  // 4. Majhi Roles
  const handleAddRole = () => {
    const nextId = `role_${Date.now()}`;
    const newRole: MajhiRole = {
      id: nextId,
      titleDevanagari: 'नया स्वशासन पद',
      titleRoman: 'Nawa Majhi Role',
      titleHindi: 'नया प्रशासनिक दायित्व',
      rankLevel: 'village_core',
      traditionalResponsibilities: ['मुख्य जिम्मेदारियों का सारांश...'],
      selectionProcess: 'पारंपरिक चयन प्रक्रिया...',
      disputeRole: 'विवाद समाधान में भूमिका...',
      culturalSaying: 'मांझी परगना से संबंधित लोकोक्ति...',
      culturalSayingHindi: 'लोकोक्ति का हिन्दी अर्थ...',
      iconBg: 'bg-amber-100 text-amber-800'
    };
    const updated = [...roles, newRole];
    setRoles(updated);
    setSelectedRoleIdx(updated.length - 1);
    safeSaveToStorage('hor_katha_cms_majhi_roles', updated);
    showNotification('नया स्वशासन पद जुड़ गया!');
  };

  const handleDeleteRole = (idx: number) => {
    if (confirm('क्या आप सचमुच इस पद को हटाना चाहते हैं?')) {
      const updated = roles.filter((_, i) => i !== idx);
      setRoles(updated);
      setSelectedRoleIdx(Math.max(0, idx - 1));
      safeSaveToStorage('hor_katha_cms_majhi_roles', updated);
      showNotification('पद हटा दिया गया!');
    }
  };

  // 5. Herbal
  const handleAddHerbal = () => {
    const nextId = `herb_${Date.now()}`;
    const newHerb: HerbalPlant = {
      id: nextId,
      nameDevanagari: 'नई वन-औषधि',
      nameRoman: 'Nawa Herbal Plant',
      nameHindi: 'हिन्दी नाम',
      botanicalName: 'Botanical scientific name',
      category: 'sacred',
      categoryLabel: 'पारंपरिक वन-औषधि',
      traditionalUses: ['उपचार किए जाने वाले रोग...'],
      preparationMethod: 'काढ़ा या लेप की तैयारी विधि...',
      culturalSignificance: 'सांस्कृतिक व टोटेमिक महत्व...',
      plantPartsUsed: 'छाल, पत्तियां, जड़',
      gradient: 'from-emerald-700 to-teal-900',
      iconBg: 'bg-emerald-100 text-emerald-800'
    };
    const updated = [...herbal, newHerb];
    setHerbal(updated);
    setSelectedHerbIdx(updated.length - 1);
    safeSaveToStorage('hor_katha_cms_herbal', updated);
    showNotification('नई वन-औषधि जुड़ गई!');
  };

  const handleDeleteHerbal = (idx: number) => {
    if (confirm('क्या आप सचमुच इस वन-औषधि को हटाना चाहते हैं?')) {
      const updated = herbal.filter((_, i) => i !== idx);
      setHerbal(updated);
      setSelectedHerbIdx(Math.max(0, idx - 1));
      safeSaveToStorage('hor_katha_cms_herbal', updated);
      showNotification('वन-औषधि हटा दी गई!');
    }
  };

  // 6. Festivals
  const handleAddFestival = () => {
    const nextId = `fest_${Date.now()}`;
    const newFest: FestivalData = {
      id: nextId,
      nameDevanagari: 'नया संताली पर्व',
      nameRoman: 'Nawa Santali Parab',
      nameHindi: 'नया सांस्कृतिक महापर्व',
      santaliMonth: 'संताली मास (उदा. सोहराय / माघ)',
      gregorianPeriod: 'ग्रेगोरियन अवधि',
      duration: 'दिवसीय अवधि',
      deityHonored: 'आराध्य देव / पूर्वज',
      themeColor: 'from-amber-600 to-rose-700',
      subheading: 'पर्व का उप-शीर्षक',
      significanceParagraph: 'पर्व का विस्तृत महत्व व दर्शन...',
      historicalBackgroundParagraph: 'ऐतिहासिक पृष्ठभूमि...',
      detailedRitualsParagraph: 'अनुष्ठान व विधियां...',
      festiveFoodsParagraph: 'पारंपरिक व्यंजन...',
      traditionalSongSnippet: {
        santaliDev: 'संताली लोकगीत के बोल...',
        roman: 'Roman song lyrics...',
        hindi: 'गीत का हिन्दी भावार्थ...'
      }
    };
    const updated = [...festivals, newFest];
    setFestivals(updated);
    setSelectedFestIdx(updated.length - 1);
    safeSaveToStorage('hor_katha_custom_festivals_v2', updated);
    showNotification('नया संताली पर्व जुड़ गया!');
  };

  const handleDeleteFestival = (idx: number) => {
    if (confirm('क्या आप सचमुच इस पर्व को हटाना चाहते हैं?')) {
      const updated = festivals.filter((_, i) => i !== idx);
      setFestivals(updated);
      setSelectedFestIdx(Math.max(0, idx - 1));
      safeSaveToStorage('hor_katha_custom_festivals_v2', updated);
      showNotification('पर्व हटा दिया गया!');
    }
  };

  // 7. Clans
  const handleAddClan = () => {
    const nextId = `clan_${Date.now()}`;
    const newClan: ClanData = {
      id: nextId,
      nameDevanagari: 'नया पारिस / गोत्र',
      nameRoman: 'Nawa Paris',
      nameHindi: 'नया कुल व गोत्र',
      totemSymbol: 'टोटेम प्रतीक (चिह्न)',
      traditionalRole: 'पारंपरिक सामाजिक दायित्व',
      totemMeaning: 'टोटेमिक अर्थ व गौरव',
      sacredTaboo: 'पवित्र मर्यादाएं व निषेध (Taboo)',
      gradient: 'from-amber-600 to-slate-800'
    };
    const updated = [...clans, newClan];
    setClans(updated);
    setSelectedClanIdx(updated.length - 1);
    safeSaveToStorage('hor_katha_custom_clans_v1', updated);
    showNotification('नया गोत्र (पारिस) जुड़ गया!');
  };

  const handleDeleteClan = (idx: number) => {
    if (confirm('क्या आप सचमुच इस गोत्र को हटाना चाहते हैं?')) {
      const updated = clans.filter((_, i) => i !== idx);
      setClans(updated);
      setSelectedClanIdx(Math.max(0, idx - 1));
      safeSaveToStorage('hor_katha_custom_clans_v1', updated);
      showNotification('गोत्र हटा दिया गया!');
    }
  };

  // 8. Hul Heroes
  const handleAddHulHero = () => {
    const nextId = `hero_${Date.now()}`;
    const newHero: HulHero = {
      id: nextId,
      nameDevanagari: 'नया अमर महापुरुष / सेनानी',
      nameRoman: 'Nawa Hul Hero',
      titleHindi: 'उपाधि / पदवी',
      periodOrYear: 'कालखंड / वर्ष',
      sacredPlace: 'कार्यक्षेत्र / पवित्र स्थल',
      role: 'प्रमुख भूमिका',
      biographyHindi: 'गौरवशाली इतिहास व जीवनी...',
      warCrySantali: 'अमर हुल उद्घोष (संथाली)...',
      warCryHindi: 'उद्घोष भावार्थ (हिन्दी)...',
      historicalImpact: 'ऐतिहासिक प्रभाव व राष्ट्रीय धरोहर...',
      badgeColor: 'bg-red-100 text-red-900 border-red-300'
    };
    const updated = [...hulHeroes, newHero];
    setHulHeroes(updated);
    setSelectedHulHeroIdx(updated.length - 1);
    safeSaveToStorage('hor_katha_cms_hul_heroes', updated);
    showNotification('नया हुल सेनानी जुड़ गया!');
  };

  const handleDeleteHulHero = (idx: number) => {
    if (confirm('क्या आप सचमुच इस सेनानी को हटाना चाहते हैं?')) {
      const updated = hulHeroes.filter((_, i) => i !== idx);
      setHulHeroes(updated);
      setSelectedHulHeroIdx(Math.max(0, idx - 1));
      safeSaveToStorage('hor_katha_cms_hul_heroes', updated);
      showNotification('सेनानी हटा दिया गया!');
    }
  };

  // 9. Bapla
  const handleAddBapla = () => {
    const nextId = `bapla_${Date.now()}`;
    const newBapla: BaplaType = {
      id: nextId,
      nameDevanagari: 'नया विवाह संस्कार (बापला)',
      nameRoman: 'Nawa Bapla',
      nameHindi: 'नया विवाह प्रकार',
      typeCategory: 'arranged',
      summaryHindi: 'संक्षिप्त परिचय...',
      ritualsDescription: 'मुख्य रीतियां व विधि-विधान...',
      majhiRole: 'मांझी हाड़ाम व स्वशासन की भूमिका...',
      socialImportance: 'सामाजिक महत्व...',
      baplaSerenSantali: 'विवाह लोकगीत बोल...',
      baplaSerenHindi: 'गीत का हिन्दी भावार्थ...',
      accentColor: 'from-amber-600 to-rose-700'
    };
    const updated = [...baplaList, newBapla];
    setBaplaList(updated);
    setSelectedBaplaIdx(updated.length - 1);
    safeSaveToStorage('hor_katha_cms_bapla', updated);
    showNotification('नया विवाह संस्कार जुड़ गया!');
  };

  const handleDeleteBapla = (idx: number) => {
    if (confirm('क्या आप सचमुच इस विवाह संस्कार को हटाना चाहते हैं?')) {
      const updated = baplaList.filter((_, i) => i !== idx);
      setBaplaList(updated);
      setSelectedBaplaIdx(Math.max(0, idx - 1));
      safeSaveToStorage('hor_katha_cms_bapla', updated);
      showNotification('विवाह संस्कार हटा दिया गया!');
    }
  };

  // 10. Attire
  const handleAddAttire = () => {
    const nextId = `attire_${Date.now()}`;
    const newItem: AttireItem = {
      id: nextId,
      nameDevanagari: 'नया परिधान / आभूषण',
      nameRoman: 'Nawa Attire',
      nameHindi: 'हिन्दी नाम व विवरण',
      category: 'women_attire',
      categoryLabel: 'पारंपरिक परिधान/आभूषण',
      material: 'निर्माण सामग्री',
      wornBy: 'पुरुष / महिला / दोनों',
      occasions: 'पहनने के अवसर...',
      descriptionHindi: 'विस्तृत विवरण...',
      culturalSignificance: 'सांस्कृतिक महत्व...',
      santaliProverbOrSong: 'पारंपरिक लोकोक्ति या गीत...',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
    };
    const updated = [...attireItems, newItem];
    setAttireItems(updated);
    setSelectedAttireIdx(updated.length - 1);
    safeSaveToStorage('hor_katha_cms_attire', updated);
    showNotification('नया परिधान/आभूषण जुड़ गया!');
  };

  const handleDeleteAttire = (idx: number) => {
    if (confirm('क्या आप सचमुच इस धरोहर वस्तु को हटाना चाहते हैं?')) {
      const updated = attireItems.filter((_, i) => i !== idx);
      setAttireItems(updated);
      setSelectedAttireIdx(Math.max(0, idx - 1));
      safeSaveToStorage('hor_katha_cms_attire', updated);
      showNotification('परिधान/आभूषण हटा दिया गया!');
    }
  };

  // 11. Cuisine
  const handleAddCuisine = () => {
    const nextId = `cuisine_${Date.now()}`;
    const newRecipe: CuisineRecipe = {
      id: nextId,
      nameDevanagari: 'नया पारंपरिक व्यंजन',
      nameRoman: 'Nawa Santali Dish',
      nameHindi: 'हिन्दी नाम व प्रकार',
      category: 'pitha',
      categoryLabel: 'पारंपरिक भोजन',
      prepTime: 'पकाने का समय',
      festiveOccasion: 'मुख्य पर्व व अवसर',
      ingredients: ['चावल का आटा', 'जंगल की जड़ी-बूटियां'],
      cookingMethodHindi: 'पकाने की पारंपरिक विधि...',
      culturalSignificance: 'सांस्कृतिक व सामाजिक महत्व...',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
    };
    const updated = [...cuisineRecipes, newRecipe];
    setCuisineRecipes(updated);
    setSelectedCuisineIdx(updated.length - 1);
    safeSaveToStorage('hor_katha_cms_cuisine', updated);
    showNotification('नया पारंपरिक व्यंजन जुड़ गया!');
  };

  const handleDeleteCuisine = (idx: number) => {
    if (confirm('क्या आप सचमुच इस व्यंजन को हटाना चाहते हैं?')) {
      const updated = cuisineRecipes.filter((_, i) => i !== idx);
      setCuisineRecipes(updated);
      setSelectedCuisineIdx(Math.max(0, idx - 1));
      safeSaveToStorage('hor_katha_cms_cuisine', updated);
      showNotification('व्यंजन हटा दिया गया!');
    }
  };

  // 12. Sports
  const handleAddSport = () => {
    const nextId = `sport_${Date.now()}`;
    const newSport: SportItem = {
      id: nextId,
      nameDevanagari: 'नया पारंपरिक खेल / शिकार',
      nameRoman: 'Nawa Traditional Sport',
      nameHindi: 'हिन्दी नाम',
      type: 'outdoor_game',
      typeLabel: 'पारंपरिक खेल',
      playersCount: 'खिलाड़ियों की संख्या',
      equipment: 'खेल उपकरण',
      seasonOrOccasion: 'पर्व व ऋतु का अवसर',
      rulesHindi: 'खेल के नियम व परंपराएं...',
      culturalSignificance: 'सांस्कृतिक व सामाजिक दर्शन...',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
    };
    const updated = [...sportsItems, newSport];
    setSportsItems(updated);
    setSelectedSportIdx(updated.length - 1);
    safeSaveToStorage('hor_katha_cms_sports', updated);
    showNotification('नया पारंपरिक खेल जुड़ गया!');
  };

  const handleDeleteSport = (idx: number) => {
    if (confirm('क्या आप सचमुच इस खेल को हटाना चाहते हैं?')) {
      const updated = sportsItems.filter((_, i) => i !== idx);
      setSportsItems(updated);
      setSelectedSportIdx(Math.max(0, idx - 1));
      safeSaveToStorage('hor_katha_cms_sports', updated);
      showNotification('खेल हटा दिया गया!');
    }
  };

  // 13. Folk Songs
  const handleAddSong = () => {
    const nextId = `song_${Date.now()}`;
    const newSong: FolkSong = {
      id: nextId,
      nameDevanagari: 'नया लोकगीत (सेरेञ)',
      titleDevanagari: 'नया लोकगीत (सेरेञ)',
      titleRoman: 'Nawa Seren',
      titleHindi: 'नया पारंपरिक लोकगीत',
      genre: 'sohrai',
      genreLabel: 'सोहराय / बाहा / लांगड़े',
      seasonOrOccasion: 'पर्व व सामाजिक उत्सव',
      instrumentsUsed: 'तुमाक, तामाक, तिरयो',
      lyricsSantali: 'मूल संथाली बोल (देवनागरी)...',
      lyricsRoman: 'Roman lyrics...',
      meaningHindi: 'गीत का हिन्दी भावार्थ...',
      culturalBackground: 'गीत की पृष्ठभूमि व संदर्भ...',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
    };
    const updated = [...folkSongs, newSong];
    setFolkSongs(updated);
    setSelectedSongIdx(updated.length - 1);
    safeSaveToStorage('hor_katha_cms_folk_songs', updated);
    showNotification('नया लोकगीत जुड़ गया!');
  };

  const handleDeleteSong = (idx: number) => {
    if (confirm('क्या आप सचमुच इस लोकगीत को हटाना चाहते हैं?')) {
      const updated = folkSongs.filter((_, i) => i !== idx);
      setFolkSongs(updated);
      setSelectedSongIdx(Math.max(0, idx - 1));
      safeSaveToStorage('hor_katha_cms_folk_songs', updated);
      showNotification('लोकगीत हटा दिया गया!');
    }
  };

  // 14. Pilgrimage
  const handleAddPilgrimage = () => {
    const nextId = `pilgrim_${Date.now()}`;
    const newSite: PilgrimageSite = {
      id: nextId,
      nameDevanagari: 'नया ऐतिहासिक तीर्थ स्थल',
      nameRoman: 'Nawa Pilgrimage Site',
      titleHindi: 'पवित्र तीर्थ स्थल',
      districtPlace: 'स्थान व जिला',
      locationState: 'झारखंड / ओडिशा / प. बंगाल',
      annualFairOrMaha: 'वार्षिक महासम्मेलन व मेला',
      historyAndSignificance: 'ऐतिहासिक व आध्यात्मिक महत्व...',
      ritualsAndWorship: 'पारंपरिक पूजा-अर्चना व अनुष्ठान विधि...',
      howToReach: 'कैसे पहुंचें (How to reach)...',
      sacredRules: 'धार्मिक मर्यादाएं व नियम...',
      badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
    };
    const updated = [...pilgrimageSites, newSite];
    setPilgrimageSites(updated);
    setSelectedSiteIdx(updated.length - 1);
    safeSaveToStorage('hor_katha_cms_pilgrimage', updated);
    showNotification('नया तीर्थ स्थल जुड़ गया!');
  };

  const handleDeletePilgrimage = (idx: number) => {
    if (confirm('क्या आप सचमुच इस तीर्थ स्थल को हटाना चाहते हैं?')) {
      const updated = pilgrimageSites.filter((_, i) => i !== idx);
      setPilgrimageSites(updated);
      setSelectedSiteIdx(Math.max(0, idx - 1));
      safeSaveToStorage('hor_katha_cms_pilgrimage', updated);
      showNotification('तीर्थ स्थल हटा दिया गया!');
    }
  };

  // 15. Life Rites
  const handleAddLifeRite = () => {
    const nextId = `rite_${Date.now()}`;
    const newRite: LifeRite = {
      id: nextId,
      nameDevanagari: 'नया जीवन-संस्कार',
      nameRoman: 'Nawa Life Rite',
      titleHindi: 'हिन्दी शीर्षक',
      stageOfLife: 'birth',
      stageLabel: 'संस्कार चरण',
      presidingElders: 'मुख्य संचालक व बुजुर्ग',
      coreRitualDescription: 'मुख्य विधि-विधान व परंपराएं...',
      socialImportance: 'सामाजिक महत्व व पारिवारिक शुद्धि...',
      sacredBakherSantali: 'पवित्र बाखेर प्रार्थना (संथाली)...',
      sacredBakherHindi: 'बाखेर हिंदी भावार्थ...',
      badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
    };
    const updated = [...lifeRites, newRite];
    setLifeRites(updated);
    setSelectedRiteIdx(updated.length - 1);
    safeSaveToStorage('hor_katha_cms_life_rites', updated);
    showNotification('नया जीवन-संस्कार जुड़ गया!');
  };

  const handleDeleteLifeRite = (idx: number) => {
    if (confirm('क्या आप सचमुच इस जीवन-संस्कार को हटाना चाहते हैं?')) {
      const updated = lifeRites.filter((_, i) => i !== idx);
      setLifeRites(updated);
      setSelectedRiteIdx(Math.max(0, idx - 1));
      safeSaveToStorage('hor_katha_cms_life_rites', updated);
      showNotification('जीवन-संस्कार हटा दिया गया!');
    }
  };

  // 16. Phrases
  const handleSavePhrase = () => {
    if (!phraseForm.santaliRoman || !phraseForm.hindi) {
      alert('कम से कम संताली रोमन और हिन्दी अर्थ अवश्य भरें।');
      return;
    }
    if (editingPhraseId) {
      const updated = phrases.map((p) =>
        p.id === editingPhraseId ? { ...phraseForm, id: editingPhraseId } : p
      );
      setPhrases(updated);
      safeSaveToStorage('hor_katha_phrasebook_db', updated);
      showNotification('वाक्य सफलतापूर्वक अद्यतन हो गया!');
    } else {
      const newPhrase: PhraseItem = {
        ...phraseForm,
        id: `ph_${Date.now()}`
      };
      const updated = [newPhrase, ...phrases];
      setPhrases(updated);
      safeSaveToStorage('hor_katha_phrasebook_db', updated);
      showNotification('नया बोलचाल का वाक्य जुड़ गया!');
    }
    setEditingPhraseId(null);
    setPhraseForm({
      category: 'Greetings',
      santaliRoman: '',
      santaliDevanagari: '',
      hindi: '',
      english: '',
      context: ''
    });
  };

  const handleDeletePhrase = (id: string) => {
    if (confirm('क्या आप सचमुच इस वाक्य को हटाना चाहते हैं?')) {
      const updated = phrases.filter((p) => p.id !== id);
      setPhrases(updated);
      safeSaveToStorage('hor_katha_phrasebook_db', updated);
      showNotification('वाक्य हटा दिया गया!');
    }
  };

  // 17. Kudum
  const handleSaveKudum = () => {
    if (!kudumForm.riddleDevanagari || !kudumForm.answerHindi) {
      alert('कम से कम पहेली और उत्तर अवश्य भरें।');
      return;
    }
    if (editingKudumId) {
      const updated = kudums.map((k) =>
        k.id === editingKudumId ? { ...kudumForm, id: editingKudumId } : k
      );
      setKudums(updated);
      safeSaveToStorage('hor_katha_kudum_db', updated);
      showNotification('पहेली सफलतापूर्वक अद्यतन हो गई!');
    } else {
      const newKudum: KudumItem = {
        ...kudumForm,
        id: `k_${Date.now()}`
      };
      const updated = [newKudum, ...kudums];
      setKudums(updated);
      safeSaveToStorage('hor_katha_kudum_db', updated);
      showNotification('नई पहेली जुड़ गई!');
    }
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
  };

  const handleDeleteKudum = (id: string) => {
    if (confirm('क्या आप सचमुच इस पहेली को हटाना चाहते हैं?')) {
      const updated = kudums.filter((k) => k.id !== id);
      setKudums(updated);
      safeSaveToStorage('hor_katha_kudum_db', updated);
      showNotification('पहेली हटा दी गई!');
    }
  };

  // 18. Dictionary
  const handleSaveWord = () => {
    if (!wordForm.wordRoman || !wordForm.meaningHindi) {
      alert('कम से कम रोमन शब्द और हिन्दी अर्थ अवश्य भरें।');
      return;
    }
    if (editingWordId) {
      updateWord(editingWordId, wordForm as SantaliWord);
      showNotification(`शब्द "${wordForm.wordRoman}" अद्यतन हो गया!`);
    } else {
      addWord({
        ...wordForm,
        id: `word_${Date.now()}`
      } as any);
      showNotification(`नया शब्द "${wordForm.wordRoman}" शब्दकोश में जुड़ गया!`);
    }
    setEditingWordId(null);
    setWordForm({
      wordDevanagari: '',
      wordRoman: '',
      phonetic: '',
      partOfSpeech: 'noun',
      category: 'relation',
      meaningEnglish: '',
      meaningHindi: '',
      exampleSantali: '',
      exampleHindi: '',
      exampleEnglish: ''
    });
  };

  const handleDeleteWordPrompt = (id: string, roman: string) => {
    if (confirm(`क्या आप सचमुच शब्द "${roman}" को हटाना चाहते हैं?`)) {
      deleteWord(id);
      showNotification(`शब्द "${roman}" हटा दिया गया!`);
    }
  };

  // ==============================================================
  // MASTER EXPORT & IMPORT
  // ==============================================================
  const handleExportAllJSON = () => {
    const fullBackup = {
      version: '5.0.0',
      exportedAt: new Date().toISOString(),
      hero: heroForm,
      creationStages,
      dances,
      bongaBuru: deities,
      majhiRoles: roles,
      herbalPlants: herbal,
      festivals,
      clans,
      attireItems,
      baplaList,
      hulHeroes,
      cuisineRecipes,
      sportsItems,
      folkSongs,
      pilgrimageSites,
      lifeRites,
      phrases,
      kudums,
      customWords: words.slice(0, 100)
    };
    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HorKathaSantali_Universal_CMS_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('संपूर्ण ऐप का बैकअप JSON फाइल में डाउनलोड हो गया!');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.hero) {
          setHeroForm(data.hero);
          updateHeroConfig(data.hero);
        }
        if (data.creationStages) {
          setCreationStages(data.creationStages);
          safeSaveToStorage('hor_katha_cms_creation', data.creationStages);
        }
        if (data.dances) {
          setDances(data.dances);
          safeSaveToStorage('hor_katha_cms_dances', data.dances);
        }
        if (data.bongaBuru) {
          setDeities(data.bongaBuru);
          safeSaveToStorage('hor_katha_cms_bonga_buru', data.bongaBuru);
        }
        if (data.majhiRoles) {
          setRoles(data.majhiRoles);
          safeSaveToStorage('hor_katha_cms_majhi_roles', data.majhiRoles);
        }
        if (data.herbalPlants) {
          setHerbal(data.herbalPlants);
          safeSaveToStorage('hor_katha_cms_herbal', data.herbalPlants);
        }
        if (data.festivals) {
          setFestivals(data.festivals);
          safeSaveToStorage('hor_katha_custom_festivals_v2', data.festivals);
        }
        if (data.clans) {
          setClans(data.clans);
          safeSaveToStorage('hor_katha_custom_clans_v1', data.clans);
        }
        if (data.attireItems) {
          setAttireItems(data.attireItems);
          safeSaveToStorage('hor_katha_cms_attire', data.attireItems);
        }
        if (data.baplaList) {
          setBaplaList(data.baplaList);
          safeSaveToStorage('hor_katha_cms_bapla', data.baplaList);
        }
        if (data.hulHeroes) {
          setHulHeroes(data.hulHeroes);
          safeSaveToStorage('hor_katha_cms_hul_heroes', data.hulHeroes);
        }
        if (data.cuisineRecipes) {
          setCuisineRecipes(data.cuisineRecipes);
          safeSaveToStorage('hor_katha_cms_cuisine', data.cuisineRecipes);
        }
        if (data.sportsItems) {
          setSportsItems(data.sportsItems);
          safeSaveToStorage('hor_katha_cms_sports', data.sportsItems);
        }
        if (data.folkSongs) {
          setFolkSongs(data.folkSongs);
          safeSaveToStorage('hor_katha_cms_folk_songs', data.folkSongs);
        }
        if (data.pilgrimageSites) {
          setPilgrimageSites(data.pilgrimageSites);
          safeSaveToStorage('hor_katha_cms_pilgrimage', data.pilgrimageSites);
        }
        if (data.lifeRites) {
          setLifeRites(data.lifeRites);
          safeSaveToStorage('hor_katha_cms_life_rites', data.lifeRites);
        }
        if (data.phrases) {
          setPhrases(data.phrases);
          safeSaveToStorage('hor_katha_phrasebook_db', data.phrases);
        }
        if (data.kudums) {
          setKudums(data.kudums);
          safeSaveToStorage('hor_katha_kudum_db', data.kudums);
        }
        showNotification('बैकअप सफलतापूर्वक लोड व लागू हो गया!');
      } catch (err) {
        alert('अमान्य JSON फ़ाइल! कृपया सही बैकअप फ़ाइल चुनें।');
      }
    };
    reader.readAsText(file);
  };

  const handleResetAllToFactory = () => {
    if (confirm('क्या आप सचमुच सभी मॉड्यूल्स को डिफ़ॉल्ट डेटा पर रीसेट करना चाहते हैं?')) {
      localStorage.removeItem('hor_katha_cms_creation');
      localStorage.removeItem('hor_katha_cms_dances');
      localStorage.removeItem('hor_katha_cms_bonga_buru');
      localStorage.removeItem('hor_katha_cms_majhi_roles');
      localStorage.removeItem('hor_katha_cms_herbal');
      localStorage.removeItem('hor_katha_custom_festivals_v2');
      localStorage.removeItem('hor_katha_custom_clans_v1');
      localStorage.removeItem('hor_katha_cms_attire');
      localStorage.removeItem('hor_katha_cms_bapla');
      localStorage.removeItem('hor_katha_cms_hul_heroes');
      localStorage.removeItem('hor_katha_cms_cuisine');
      localStorage.removeItem('hor_katha_cms_sports');
      localStorage.removeItem('hor_katha_cms_folk_songs');
      localStorage.removeItem('hor_katha_cms_pilgrimage');
      localStorage.removeItem('hor_katha_cms_life_rites');
      localStorage.removeItem('hor_katha_phrasebook_db');
      localStorage.removeItem('hor_katha_kudum_db');
      localStorage.removeItem('hor_katha_hero_config');
      resetHeroConfig();
      setCreationStages(CREATION_STAGES);
      setDances(TOP_10_DANCES);
      setDeities(TOP_15_BONGA_BURU);
      setRoles(MAJHI_ROLES);
      setHerbal(HERBAL_PLANTS);
      setFestivals(DEFAULT_SANTALI_FESTIVALS);
      setClans(DEFAULT_CLANS_DATA);
      setAttireItems(DEFAULT_ATTIRE_ITEMS);
      setBaplaList(DEFAULT_BAPLA_TYPES);
      setHulHeroes(DEFAULT_HUL_HEROES);
      setCuisineRecipes(DEFAULT_CUISINE_RECIPES);
      setSportsItems(DEFAULT_SPORTS_ITEMS);
      setFolkSongs(DEFAULT_FOLK_SONGS);
      setPilgrimageSites(DEFAULT_PILGRIMAGE_SITES);
      setLifeRites(DEFAULT_LIFE_RITES);
      setPhrases(DEFAULT_PHRASES_DATA);
      setKudums(DEFAULT_KUDUM_LIST);
      showNotification('सभी मॉड्यूल्स फ़ैक्टरी डिफ़ॉल्ट पर रीसेट हो गए!');
    }
  };

  const filteredWords = words
    .filter(
      (w) =>
        w.wordRoman.toLowerCase().includes(dictSearch.toLowerCase()) ||
        w.meaningHindi.toLowerCase().includes(dictSearch.toLowerCase()) ||
        w.wordDevanagari.includes(dictSearch)
    )
    .slice(0, 40);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-700 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-stone-900 to-slate-950 text-white p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              Master CMS · सम्पूर्ण संपादन केंद्र
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-[11px] font-bold text-emerald-300">
              A-to-Z Full CRUD (Add / Edit / Update / Delete)
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-amber-100">
            यूनिवर्सल एडमिन कंटेंट स्टूडियो
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed font-medium">
            हर सेक्शन के प्रत्येक कंटेंट को जोड़ें (Add), सुधारें (Edit), सहेजें (Update) या हटाएं (Delete)। वर्तनी या ऐतिहासिक त्रुटियों को तुरंत लाइव ठीक करें।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportAllJSON}
            className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Download className="w-4 h-4 text-slate-950" />
            <span>बैकअप डाउनलोड (Export)</span>
          </button>

          <label className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 border border-white/20 transition-all cursor-pointer">
            <Upload className="w-4 h-4 text-amber-300" />
            <span>बैकअप अपलोड</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>
        </div>
      </div>

      {/* Tabs Navigation Grid */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'hero', label: '🏠 मुख्य बैनर', icon: Layout },
          { id: 'dictionary', label: '📖 शब्दकोश (10k)', icon: BookOpen },
          { id: 'creation', label: '🌍 धरती की सृष्टि', icon: Globe },
          { id: 'dances', label: '💃 शीर्ष १० नृत्य', icon: Music },
          { id: 'bonga_buru', label: '🪔 १५ बोंगा-बुरु', icon: Flame },
          { id: 'hul_heroes', label: '⚔️ संथाल हुल १८५५', icon: Swords },
          { id: 'bapla', label: '💍 विवाह संस्कार (८)', icon: Heart },
          { id: 'attire', label: '👘 पारंपरिक वस्त्र/आभूषण', icon: ShoppingBag },
          { id: 'cuisine', label: '🍲 खान-पान व व्यंजन', icon: UtensilsCrossed },
          { id: 'sports', label: '🏹 पारंपरिक खेल व शिकार', icon: Target },
          { id: 'songs', label: '🎵 लोकगीत व सेरेञ', icon: Radio },
          { id: 'pilgrimage', label: '🏕️ ऐतिहासिक तीर्थ', icon: Compass },
          { id: 'rites', label: '📜 जीवन-संस्कार दर्शन', icon: Baby },
          { id: 'governance', label: '🏛️ मांझी परगना', icon: Landmark },
          { id: 'herbal', label: '🌿 वन-औषधियां', icon: Leaf },
          { id: 'calendar', label: '🌾 महापर्व पंचांग', icon: Calendar },
          { id: 'clans', label: '🛡️ १२ गोत्र (पारिस)', icon: Shield },
          { id: 'phrases', label: '💬 दैनिक बोलचाल', icon: MessageSquare },
          { id: 'riddles', label: '🧩 कुदुम व पहेलियां', icon: HelpCircle },
          { id: 'backup', label: '💾 मास्टर बैकअप', icon: Download }
        ].map((tab) => {
          const isSel = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isSel
                  ? 'bg-amber-700 text-white shadow-2xs font-black ring-2 ring-amber-500/50'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* 1. HERO BANNER CMS */}
      {/* ============================================================== */}
      {activeTab === 'hero' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900">मुख्य बैनर व स्लोगन संपादक (Hero CMS)</h2>
              <p className="text-xs text-slate-500">होमपेज पर दिखने वाले मुख्य शीर्षक, उप-शीर्षक और दैनिक नोटिस बदलें।</p>
            </div>
            <button
              onClick={handleSaveHero}
              className="px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>सहेजें (Save Live)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">मुख्य शीर्षक (Welcome Title):</label>
              <input
                type="text"
                value={heroForm.welcomeTitle}
                onChange={(e) => setHeroForm({ ...heroForm, welcomeTitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">उप-शीर्षक (Sub Title):</label>
              <input
                type="text"
                value={heroForm.subTitle}
                onChange={(e) => setHeroForm({ ...heroForm, subTitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                संताली स्लोगन / मोटो (उदा. Abo Ror, Abo Uprum, Abo Gorob):
              </label>
              <input
                type="text"
                value={heroForm.quoteSantali}
                placeholder="Abo Ror, Abo Uprum, Abo Gorob"
                onChange={(e) => setHeroForm({ ...heroForm, quoteSantali: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none font-serif"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                अंग्रेज़ी स्लोगन / भावार्थ (उदा. Our Language, Our Identity, Our Pride):
              </label>
              <input
                type="text"
                value={heroForm.quoteEnglish}
                placeholder="Our Language, Our Identity, Our Pride"
                onChange={(e) => setHeroForm({ ...heroForm, quoteEnglish: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-700 block mb-1">दैनिक नोटिस / उद्घोषणा (Notice Bar):</label>
              <textarea
                rows={2}
                value={heroForm.notice}
                onChange={(e) => setHeroForm({ ...heroForm, notice: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Dedicated Hero Slider Management Section */}
          <div className="border-t border-slate-200 pt-6 mt-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <Layout className="w-4 h-4 text-amber-600" />
                  <span>मुख्य बैनर स्लाइडर प्रबंधन (Hero Slider Management)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  वर्तमान में {heroSlides.length} स्लाइडर तस्वीरें सक्रिय हैं। खाली रहने पर उपयोगकर्ता अपनी पसंद से अपलोड करते हैं।
                </p>
              </div>

              <div className="flex items-center gap-2">
                {heroSlides.length > 0 && (
                  <button
                    onClick={handleClearHeroSlides}
                    className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors cursor-pointer"
                  >
                    सभी खाली करें (Clear All)
                  </button>
                )}
                <button
                  onClick={handleLoadSampleHeroSlides}
                  className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  सैंपल तस्वीरें लोड करें
                </button>
              </div>
            </div>

            {heroSlides.length === 0 ? (
              <div className="p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center">
                <p className="text-xs font-bold text-slate-600">स्लाइडर अभी पूरी तरह खाली है (0 तस्वीरें)</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  उपयोगकर्ता होमपेज पर "नई तस्वीर व विवरण अपलोड करें" बटन से लाइव अपलोड कर सकते हैं।
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {heroSlides.map((slide, idx) => (
                  <div key={slide.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 relative group">
                    <div className="h-32 rounded-xl overflow-hidden bg-slate-950 relative">
                      <img src={slide.imageUrl} alt={slide.heading} className="w-full h-full object-cover" />
                      <div className="absolute top-1.5 left-1.5 bg-black/70 px-2 py-0.5 rounded text-[10px] text-amber-300 font-bold">
                        #{idx + 1} {slide.badge}
                      </div>
                      <button
                        onClick={() => handleDeleteHeroSlide(slide.id)}
                        className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-red-600/90 hover:bg-red-700 text-white transition-colors cursor-pointer"
                        title="यह स्लाइड हटाएं"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 truncate">{slide.heading}</h4>
                      <p className="text-[11px] text-amber-700 font-semibold truncate">{slide.subheading}</p>
                      <p className="text-[10px] text-slate-500 line-clamp-2 mt-1">{slide.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. CREATION MYTH CMS (धरती की सृष्टि) */}
      {/* ============================================================== */}
      {activeTab === 'creation' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900">धरती की सृष्टि (सिरजोन काहनी) संपादक</h2>
              <p className="text-xs text-slate-500">अध्याय जोड़ें (+ नया जोड़ें), वर्तनी या विवरण सुधारें (Edit), सहेजें (Update) या हटाएं (Delete)।</p>
            </div>
            <button
              onClick={handleSaveCreation}
              className="px-5 py-2.5 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>सहेजें (Save All)</span>
            </button>
          </div>

          {/* Chapter Selector & Add Button */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={handleAddCreation}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs transition-all hover:scale-105"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ नया अध्याय जोड़ें</span>
            </button>
            {creationStages.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setSelectedCreationIdx(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCreationIdx === idx
                    ? 'bg-blue-700 text-white shadow-xs font-black'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {s.symbol} {s.stageNameDevanagari}
              </button>
            ))}
          </div>

          {/* Edit Form */}
          {creationStages[selectedCreationIdx] ? (
            <div className="space-y-4 pt-2 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-black text-slate-700">
                  अध्याय संपादन #{selectedCreationIdx + 1}: {creationStages[selectedCreationIdx].stageNameDevanagari}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteCreation(selectedCreationIdx)}
                    className="px-3 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>यह अध्याय हटाएं (Delete)</span>
                  </button>
                  <button
                    onClick={handleSaveCreation}
                    className="px-4 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>सहेजें (Update)</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">अध्याय का नाम (संताली देवनागरी):</label>
                  <input
                    type="text"
                    value={creationStages[selectedCreationIdx].stageNameDevanagari}
                    onChange={(e) => {
                      const updated = [...creationStages];
                      updated[selectedCreationIdx].stageNameDevanagari = e.target.value;
                      setCreationStages(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">उप-शीर्षक (Subtitle):</label>
                  <input
                    type="text"
                    value={creationStages[selectedCreationIdx].subtitle}
                    onChange={(e) => {
                      const updated = [...creationStages];
                      updated[selectedCreationIdx].subtitle = e.target.value;
                      setCreationStages(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">संताली देवनागरी मूल गाथा (Santali Scripture):</label>
                <textarea
                  rows={3}
                  value={creationStages[selectedCreationIdx].narrativeSantali}
                  onChange={(e) => {
                    const updated = [...creationStages];
                    updated[selectedCreationIdx].narrativeSantali = e.target.value;
                    setCreationStages(updated);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-serif font-medium bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">हिन्दी विस्तृत विवेचन:</label>
                <textarea
                  rows={3}
                  value={creationStages[selectedCreationIdx].narrativeHindi}
                  onChange={(e) => {
                    const updated = [...creationStages];
                    updated[selectedCreationIdx].narrativeHindi = e.target.value;
                    setCreationStages(updated);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">दार्शनिक संदेश (Core Philosophy):</label>
                <input
                  type="text"
                  value={creationStages[selectedCreationIdx].philosophicalMeaning}
                  onChange={(e) => {
                    const updated = [...creationStages];
                    updated[selectedCreationIdx].philosophicalMeaning = e.target.value;
                    setCreationStages(updated);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                />
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 border border-dashed rounded-2xl">
              कोई अध्याय नहीं बचा है। नया अध्याय जोड़ने के लिए ऊपर '+ नया अध्याय जोड़ें' पर क्लिक करें।
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. TOP 10 DANCES CMS */}
      {/* ============================================================== */}
      {activeTab === 'dances' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900">पारंपरिक शीर्ष १० नृत्य (एनेच) संपादक</h2>
              <p className="text-xs text-slate-500">नया नृत्य जोड़ें, अवसर, वाद्ययंत्र, पदताल व गीत सुधारें या हटाएं।</p>
            </div>
            <button
              onClick={handleSaveDances}
              className="px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>सहेजें (Save All)</span>
            </button>
          </div>

          {/* Dance Selector & Add Button */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={handleAddDance}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs transition-all hover:scale-105"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ नया नृत्य जोड़ें</span>
            </button>
            {dances.map((d, idx) => (
              <button
                key={d.id}
                onClick={() => setSelectedDanceIdx(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedDanceIdx === idx
                    ? 'bg-amber-700 text-white shadow-xs font-black'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {d.nameDevanagari}
              </button>
            ))}
          </div>

          {dances[selectedDanceIdx] ? (
            <div className="space-y-4 pt-2 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-black text-slate-700">
                  नृत्य संपादन: {dances[selectedDanceIdx].nameDevanagari}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteDance(selectedDanceIdx)}
                    className="px-3 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>यह नृत्य हटाएं (Delete)</span>
                  </button>
                  <button
                    onClick={handleSaveDances}
                    className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>सहेजें (Update)</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">नृत्य का नाम (देवनागरी):</label>
                  <input
                    type="text"
                    value={dances[selectedDanceIdx].nameDevanagari}
                    onChange={(e) => {
                      const updated = [...dances];
                      updated[selectedDanceIdx].nameDevanagari = e.target.value;
                      setDances(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">हिन्दी नाम व प्रकार:</label>
                  <input
                    type="text"
                    value={dances[selectedDanceIdx].nameHindi}
                    onChange={(e) => {
                      const updated = [...dances];
                      updated[selectedDanceIdx].nameHindi = e.target.value;
                      setDances(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">अवसर व ऋतु (Occasion):</label>
                  <input
                    type="text"
                    value={dances[selectedDanceIdx].occasionSeason}
                    onChange={(e) => {
                      const updated = [...dances];
                      updated[selectedDanceIdx].occasionSeason = e.target.value;
                      setDances(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">शृंखला व घेरा शैली (Formation):</label>
                  <input
                    type="text"
                    value={dances[selectedDanceIdx].formationStyle}
                    onChange={(e) => {
                      const updated = [...dances];
                      updated[selectedDanceIdx].formationStyle = e.target.value;
                      setDances(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">पारंपरिक संताली लोकगीत (Authentic Song):</label>
                <textarea
                  rows={2}
                  value={dances[selectedDanceIdx].authenticSongDev}
                  onChange={(e) => {
                    const updated = [...dances];
                    updated[selectedDanceIdx].authenticSongDev = e.target.value;
                    setDances(updated);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-serif font-medium bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">गीत का हिन्दी अर्थ:</label>
                <textarea
                  rows={2}
                  value={dances[selectedDanceIdx].authenticSongHindi}
                  onChange={(e) => {
                    const updated = [...dances];
                    updated[selectedDanceIdx].authenticSongHindi = e.target.value;
                    setDances(updated);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                />
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 border border-dashed rounded-2xl">
              कोई नृत्य नहीं है। नया नृत्य जोड़ने के लिए '+ नया नृत्य जोड़ें' पर क्लिक करें।
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. TOP 15 BONGA BURU CMS */}
      {/* ============================================================== */}
      {activeTab === 'bonga_buru' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900">शीर्ष १५ पूजा-पाठ एवं बोंगा-बुरु संपादक</h2>
              <p className="text-xs text-slate-500">देव शक्तियां जोड़ें, थान, पुजारी, पारंपरिक भोग और बाखेर मंत्र संपादित करें या हटाएं।</p>
            </div>
            <button
              onClick={handleSaveBongaBuru}
              className="px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>सहेजें (Save All)</span>
            </button>
          </div>

          {/* Deity Selector & Add Button */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={handleAddBongaBuru}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs transition-all hover:scale-105"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ नया बोंगा जोड़ें</span>
            </button>
            {deities.map((d, idx) => (
              <button
                key={d.id}
                onClick={() => setSelectedDeityIdx(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedDeityIdx === idx
                    ? 'bg-amber-700 text-white shadow-xs font-black'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {d.nameDevanagari}
              </button>
            ))}
          </div>

          {deities[selectedDeityIdx] ? (
            <div className="space-y-4 pt-2 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-black text-slate-700">
                  बोंगा-बुरु संपादन: {deities[selectedDeityIdx].nameDevanagari}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteBongaBuru(selectedDeityIdx)}
                    className="px-3 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>हटाएं (Delete)</span>
                  </button>
                  <button
                    onClick={handleSaveBongaBuru}
                    className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>सहेजें (Update)</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">बोंगा-बुरु नाम (देवनागरी):</label>
                  <input
                    type="text"
                    value={deities[selectedDeityIdx].nameDevanagari}
                    onChange={(e) => {
                      const updated = [...deities];
                      updated[selectedDeityIdx].nameDevanagari = e.target.value;
                      setDeities(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">उपाधि व हिन्दी अर्थ:</label>
                  <input
                    type="text"
                    value={deities[selectedDeityIdx].titleHindi}
                    onChange={(e) => {
                      const updated = [...deities];
                      updated[selectedDeityIdx].titleHindi = e.target.value;
                      setDeities(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">पवित्र पूजा स्थल (Sacred Shrine):</label>
                  <input
                    type="text"
                    value={deities[selectedDeityIdx].sacredShrine}
                    onChange={(e) => {
                      const updated = [...deities];
                      updated[selectedDeityIdx].sacredShrine = e.target.value;
                      setDeities(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">मुख्य पुजारी (Priest):</label>
                  <input
                    type="text"
                    value={deities[selectedDeityIdx].primaryPriest}
                    onChange={(e) => {
                      const updated = [...deities];
                      updated[selectedDeityIdx].primaryPriest = e.target.value;
                      setDeities(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">पवित्र संताली बाखेर (Sacred Bakher Prayer):</label>
                <textarea
                  rows={2}
                  value={deities[selectedDeityIdx].bakherPrayerDev}
                  onChange={(e) => {
                    const updated = [...deities];
                    updated[selectedDeityIdx].bakherPrayerDev = e.target.value;
                    setDeities(updated);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-serif font-medium bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">बाखेर का हिन्दी भावार्थ:</label>
                <textarea
                  rows={2}
                  value={deities[selectedDeityIdx].bakherPrayerHindi}
                  onChange={(e) => {
                    const updated = [...deities];
                    updated[selectedDeityIdx].bakherPrayerHindi = e.target.value;
                    setDeities(updated);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                />
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 border border-dashed rounded-2xl">
              कोई बोंगा-बुरु नहीं है। नया जोड़ने के लिए '+ नया बोंगा जोड़ें' पर क्लिक करें।
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. MAJHI PARGANA CMS */}
      {/* ============================================================== */}
      {activeTab === 'governance' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900">मांझी परगना स्वशासन संपादक</h2>
              <p className="text-xs text-slate-500">पद जोड़ें, मांझी हाड़ाम, परानिक, नायके, गोड़ेत आदि के दायित्व बदलें या हटाएं।</p>
            </div>
            <button
              onClick={handleSaveRoles}
              className="px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>सहेजें (Save All)</span>
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={handleAddRole}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs transition-all hover:scale-105"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ नया पद जोड़ें</span>
            </button>
            {roles.map((r, idx) => (
              <button
                key={r.id}
                onClick={() => setSelectedRoleIdx(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedRoleIdx === idx
                    ? 'bg-amber-700 text-white shadow-xs font-black'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {r.titleDevanagari}
              </button>
            ))}
          </div>

          {roles[selectedRoleIdx] ? (
            <div className="space-y-4 pt-2 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-black text-slate-700">
                  पद संपादन: {roles[selectedRoleIdx].titleDevanagari}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteRole(selectedRoleIdx)}
                    className="px-3 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>हटाएं (Delete)</span>
                  </button>
                  <button
                    onClick={handleSaveRoles}
                    className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>सहेजें (Update)</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">पद का नाम (देवनागरी):</label>
                  <input
                    type="text"
                    value={roles[selectedRoleIdx].titleDevanagari}
                    onChange={(e) => {
                      const updated = [...roles];
                      updated[selectedRoleIdx].titleDevanagari = e.target.value;
                      setRoles(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">हिन्दी नाम व स्तर:</label>
                  <input
                    type="text"
                    value={roles[selectedRoleIdx].titleHindi}
                    onChange={(e) => {
                      const updated = [...roles];
                      updated[selectedRoleIdx].titleHindi = e.target.value;
                      setRoles(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">चयन प्रक्रिया (Selection Process):</label>
                <textarea
                  rows={2}
                  value={roles[selectedRoleIdx].selectionProcess}
                  onChange={(e) => {
                    const updated = [...roles];
                    updated[selectedRoleIdx].selectionProcess = e.target.value;
                    setRoles(updated);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">पारंपरिक संताली लोकोक्ति (Saying):</label>
                <input
                  type="text"
                  value={roles[selectedRoleIdx].culturalSaying}
                  onChange={(e) => {
                    const updated = [...roles];
                    updated[selectedRoleIdx].culturalSaying = e.target.value;
                    setRoles(updated);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-serif font-medium bg-white"
                />
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 border border-dashed rounded-2xl">
              कोई पद नहीं है। नया जोड़ने के लिए '+ नया पद जोड़ें' पर क्लिक करें।
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 6. HERBAL REMEDIES CMS (रान-रानाब) */}
      {/* ============================================================== */}
      {activeTab === 'herbal' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900">पारंपरिक वन-औषधियां (रान-रानाब) संपादक</h2>
              <p className="text-xs text-slate-500">औषधीय पौधे जोड़ें, उपयोग व तैयारी विधि सुधारें या हटाएं।</p>
            </div>
            <button
              onClick={handleSaveHerbal}
              className="px-5 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>सहेजें (Save All)</span>
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={handleAddHerbal}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs transition-all hover:scale-105"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ नई औषधि जोड़ें</span>
            </button>
            {herbal.map((h, idx) => (
              <button
                key={h.id}
                onClick={() => setSelectedHerbIdx(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedHerbIdx === idx
                    ? 'bg-emerald-700 text-white shadow-xs font-black'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {h.nameDevanagari}
              </button>
            ))}
          </div>

          {herbal[selectedHerbIdx] ? (
            <div className="space-y-4 pt-2 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-black text-slate-700">
                  वन-औषधि संपादन: {herbal[selectedHerbIdx].nameDevanagari}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteHerbal(selectedHerbIdx)}
                    className="px-3 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>हटाएं (Delete)</span>
                  </button>
                  <button
                    onClick={handleSaveHerbal}
                    className="px-4 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>सहेजें (Update)</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">वनस्पति का नाम (देवनागरी):</label>
                  <input
                    type="text"
                    value={herbal[selectedHerbIdx].nameDevanagari}
                    onChange={(e) => {
                      const updated = [...herbal];
                      updated[selectedHerbIdx].nameDevanagari = e.target.value;
                      setHerbal(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">वानस्पतिक वैज्ञानिक नाम (Botanical):</label>
                  <input
                    type="text"
                    value={herbal[selectedHerbIdx].botanicalName}
                    onChange={(e) => {
                      const updated = [...herbal];
                      updated[selectedHerbIdx].botanicalName = e.target.value;
                      setHerbal(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-medium bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">तैयारी व सेवन विधि (Preparation):</label>
                <textarea
                  rows={2}
                  value={herbal[selectedHerbIdx].preparationMethod}
                  onChange={(e) => {
                    const updated = [...herbal];
                    updated[selectedHerbIdx].preparationMethod = e.target.value;
                    setHerbal(updated);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">सांस्कृतिक व धार्मिक महत्व (Cultural Lore):</label>
                <textarea
                  rows={2}
                  value={herbal[selectedHerbIdx].culturalSignificance}
                  onChange={(e) => {
                    const updated = [...herbal];
                    updated[selectedHerbIdx].culturalSignificance = e.target.value;
                    setHerbal(updated);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                />
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 border border-dashed rounded-2xl">
              कोई औषधि नहीं है। नई जोड़ने के लिए '+ नई औषधि जोड़ें' पर क्लिक करें।
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 7. DICTIONARY CMS (10,000+ Words) */}
      {/* ============================================================== */}
      {activeTab === 'dictionary' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900">१०,०००+ शब्दकोश संपादक (Dictionary CMS)</h2>
              <p className="text-xs text-slate-500">नया शब्द जोड़ें (Add), पुराना शब्द खोजकर सुधारें (Edit/Update) या हटाएं (Delete)।</p>
            </div>
            <div className="flex items-center gap-2">
              {editingWordId && (
                <button
                  onClick={() => {
                    setEditingWordId(null);
                    setWordForm({
                      wordDevanagari: '',
                      wordRoman: '',
                      phonetic: '',
                      partOfSpeech: 'noun',
                      category: 'relation',
                      meaningEnglish: '',
                      meaningHindi: '',
                      exampleSantali: '',
                      exampleHindi: '',
                      exampleEnglish: ''
                    });
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  रद्द करें
                </button>
              )}
              <button
                onClick={handleSaveWord}
                className="px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{editingWordId ? 'शब्द अद्यतन करें (Update)' : '+ नया शब्द जोड़ें (Add)'}</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">संताली देवनागरी शब्द:</label>
              <input
                type="text"
                value={wordForm.wordDevanagari || ''}
                onChange={(e) => setWordForm({ ...wordForm, wordDevanagari: e.target.value })}
                placeholder="उदा. जोहार, ओड़ाक्"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-serif bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">रोमन संताली शब्द:</label>
              <input
                type="text"
                value={wordForm.wordRoman || ''}
                onChange={(e) => setWordForm({ ...wordForm, wordRoman: e.target.value })}
                placeholder="उदा. Johar, Odaq"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">हिन्दी अर्थ:</label>
              <input
                type="text"
                value={wordForm.meaningHindi || ''}
                onChange={(e) => setWordForm({ ...wordForm, meaningHindi: e.target.value })}
                placeholder="उदा. नमस्कार, प्रणाम"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">अंग्रेज़ी अर्थ (English):</label>
              <input
                type="text"
                value={wordForm.meaningEnglish || ''}
                onChange={(e) => setWordForm({ ...wordForm, meaningEnglish: e.target.value })}
                placeholder="e.g. Greetings, Hello"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">व्याकरणिक भेद (POS):</label>
              <select
                value={wordForm.partOfSpeech || 'noun'}
                onChange={(e) => setWordForm({ ...wordForm, partOfSpeech: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
              >
                <option value="noun">Noun (संज्ञा)</option>
                <option value="verb">Verb (क्रिया)</option>
                <option value="adjective">Adjective (विशेषण)</option>
                <option value="pronoun">Pronoun (सर्वनाम)</option>
                <option value="greeting">Greeting (अभिवादन)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">श्रेणी (Category):</label>
              <select
                value={wordForm.category || 'relation'}
                onChange={(e) => setWordForm({ ...wordForm, category: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
              >
                <option value="relation">पारिवारिक संबंध</option>
                <option value="nature">प्रकृति व जीव-जंतु</option>
                <option value="culture">संस्कृति व पर्व</option>
                <option value="food">खान-पान</option>
                <option value="action">दैनिक क्रियाएं</option>
                <option value="home">घर व दैनिक वस्तुएं</option>
              </select>
            </div>
          </div>

          {/* Search Table */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={dictSearch}
                onChange={(e) => setDictSearch(e.target.value)}
                placeholder="शब्द खोजें (उदा. Johar, घर, दाका)..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200"
              />
            </div>

            <div className="max-h-[350px] overflow-y-auto border border-slate-200 rounded-2xl divide-y divide-slate-100">
              {filteredWords.map((w) => (
                <div key={w.id} className="p-3 flex items-center justify-between text-xs hover:bg-slate-50">
                  <div>
                    <span className="font-serif font-black text-slate-900 mr-2">{w.wordDevanagari}</span>
                    <span className="font-mono text-amber-800 font-bold mr-2">({w.wordRoman})</span>
                    <span className="text-slate-600">— {w.meaningHindi}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setEditingWordId(w.id);
                        setWordForm(w);
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                      className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>सुधारें</span>
                    </button>
                    <button
                      onClick={() => handleDeleteWordPrompt(w.id, w.wordRoman)}
                      className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 8. SANTHAL HUL 1855 & HEROES CMS */}
      {/* ============================================================== */}
      {activeTab === 'hul_heroes' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Swords className="w-5 h-5 text-red-600" />
                संथाल हुल १८५५ एवं अमर महापुरुष संपादन
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                बाबा तिलका मांझी, सिदो-कान्हू, चांद-भैरव, फूलो-झानो आदि के विवरण जोड़ें, सुधारें या हटाएं।
              </p>
            </div>
            <button
              onClick={handleSaveHulHeroes}
              className="px-5 py-2.5 rounded-2xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>सहेजें (Save All)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 space-y-2 max-h-[500px] overflow-y-auto pr-2">
              <button
                onClick={handleAddHulHero}
                className="w-full mb-3 px-3 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>+ नया सेनानी जोड़ें (Add Hero)</span>
              </button>
              {hulHeroes.map((hero, idx) => (
                <div
                  key={hero.id}
                  onClick={() => setSelectedHulHeroIdx(idx)}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    selectedHulHeroIdx === idx
                      ? 'border-red-600 bg-red-50/50 shadow-xs ring-1 ring-red-500/30'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800">
                    {hero.periodOrYear}
                  </span>
                  <p className="font-black text-slate-900 text-xs mt-1.5">{hero.nameDevanagari}</p>
                  <p className="text-[11px] text-red-700 font-semibold">{hero.titleHindi}</p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-8 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              {hulHeroes[selectedHulHeroIdx] ? (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="text-xs font-black text-slate-700">
                      सेनानी: {hulHeroes[selectedHulHeroIdx].nameDevanagari}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteHulHero(selectedHulHeroIdx)}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                        <span>हटाएं (Delete)</span>
                      </button>
                      <button
                        onClick={handleSaveHulHeroes}
                        className="px-4 py-1.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>सहेजें (Update)</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">संथाली नाम (देवनागरी):</label>
                      <input
                        type="text"
                        value={hulHeroes[selectedHulHeroIdx].nameDevanagari}
                        onChange={(e) => {
                          const updated = [...hulHeroes];
                          updated[selectedHulHeroIdx].nameDevanagari = e.target.value;
                          setHulHeroes(updated);
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">उपाधि / पदवी (Title):</label>
                      <input
                        type="text"
                        value={hulHeroes[selectedHulHeroIdx].titleHindi}
                        onChange={(e) => {
                          const updated = [...hulHeroes];
                          updated[selectedHulHeroIdx].titleHindi = e.target.value;
                          setHulHeroes(updated);
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">गौरवशाली इतिहास व बलिदान (जीवनी):</label>
                    <textarea
                      rows={3}
                      value={hulHeroes[selectedHulHeroIdx].biographyHindi}
                      onChange={(e) => {
                        const updated = [...hulHeroes];
                        updated[selectedHulHeroIdx].biographyHindi = e.target.value;
                        setHulHeroes(updated);
                      }}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">अमर हुल उद्घोष (संथाली):</label>
                      <input
                        type="text"
                        value={hulHeroes[selectedHulHeroIdx].warCrySantali}
                        onChange={(e) => {
                          const updated = [...hulHeroes];
                          updated[selectedHulHeroIdx].warCrySantali = e.target.value;
                          setHulHeroes(updated);
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">उद्घोष भावार्थ (हिन्दी):</label>
                      <input
                        type="text"
                        value={hulHeroes[selectedHulHeroIdx].warCryHindi}
                        onChange={(e) => {
                          const updated = [...hulHeroes];
                          updated[selectedHulHeroIdx].warCryHindi = e.target.value;
                          setHulHeroes(updated);
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-slate-400">कोई सेनानी प्रविष्टि नहीं है।</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 9. SANTALI MARRIAGE BAPLA CMS */}
      {/* ============================================================== */}
      {activeTab === 'bapla' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-600" />
                संथाली विवाह संस्कार (बापला ८ पद्धतियां) संपादन
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                विवाह पद्धति जोड़ें, रीतियां, मांझी हाड़ाम की भूमिका व लोकगीत सुधारें या हटाएं।
              </p>
            </div>
            <button
              onClick={handleSaveBapla}
              className="px-5 py-2.5 rounded-2xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>सहेजें (Save All)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 space-y-2 max-h-[500px] overflow-y-auto pr-2">
              <button
                onClick={handleAddBapla}
                className="w-full mb-3 px-3 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>+ नया विवाह संस्कार जोड़ें</span>
              </button>
              {baplaList.map((bapla, idx) => (
                <div
                  key={bapla.id}
                  onClick={() => setSelectedBaplaIdx(idx)}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    selectedBaplaIdx === idx
                      ? 'border-rose-600 bg-rose-50/50 shadow-xs ring-1 ring-rose-500/30'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <p className="font-black text-slate-900 text-xs">{bapla.nameDevanagari}</p>
                  <p className="text-[11px] text-rose-700 font-semibold">{bapla.nameHindi}</p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-8 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              {baplaList[selectedBaplaIdx] ? (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="text-xs font-black text-slate-700">
                      संस्कार: {baplaList[selectedBaplaIdx].nameDevanagari}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteBapla(selectedBaplaIdx)}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                        <span>हटाएं (Delete)</span>
                      </button>
                      <button
                        onClick={handleSaveBapla}
                        className="px-4 py-1.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>सहेजें (Update)</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">संथाली नाम (देवनागरी):</label>
                      <input
                        type="text"
                        value={baplaList[selectedBaplaIdx].nameDevanagari}
                        onChange={(e) => {
                          const updated = [...baplaList];
                          updated[selectedBaplaIdx].nameDevanagari = e.target.value;
                          setBaplaList(updated);
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">हिन्दी नाम व विवरण:</label>
                      <input
                        type="text"
                        value={baplaList[selectedBaplaIdx].nameHindi}
                        onChange={(e) => {
                          const updated = [...baplaList];
                          updated[selectedBaplaIdx].nameHindi = e.target.value;
                          setBaplaList(updated);
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">मुख्य रीतियां व विधि-विधान:</label>
                    <textarea
                      rows={3}
                      value={baplaList[selectedBaplaIdx].ritualsDescription}
                      onChange={(e) => {
                        const updated = [...baplaList];
                        updated[selectedBaplaIdx].ritualsDescription = e.target.value;
                        setBaplaList(updated);
                      }}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-slate-400">कोई विवाह पद्धति नहीं है।</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 10. TRADITIONAL ATTIRE & ORNAMENTS CMS */}
      {/* ============================================================== */}
      {activeTab === 'attire' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-600" />
                संथाली पारंपरिक परिधान व आभूषण संपादन
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                पांची पारहांड, कांसा साकोम, हंसुली, सिकरी आदि वस्त्र व आभूषण जोड़ें, सुधारें या हटाएं।
              </p>
            </div>
            <button
              onClick={handleSaveAttire}
              className="px-5 py-2.5 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>सहेजें (Save All)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 space-y-2 max-h-[500px] overflow-y-auto pr-2">
              <button
                onClick={handleAddAttire}
                className="w-full mb-3 px-3 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>+ नया परिधान/आभूषण जोड़ें</span>
              </button>
              {attireItems.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedAttireIdx(idx)}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    selectedAttireIdx === idx
                      ? 'border-amber-600 bg-amber-50/50 shadow-xs ring-1 ring-amber-500/30'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                    {item.categoryLabel}
                  </span>
                  <p className="font-black text-slate-900 text-xs mt-1.5">{item.nameDevanagari}</p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-8 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              {attireItems[selectedAttireIdx] ? (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="text-xs font-black text-slate-700">
                      धरोहर: {attireItems[selectedAttireIdx].nameDevanagari}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteAttire(selectedAttireIdx)}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                        <span>हटाएं (Delete)</span>
                      </button>
                      <button
                        onClick={handleSaveAttire}
                        className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>सहेजें (Update)</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">संथाली नाम (देवनागरी):</label>
                      <input
                        type="text"
                        value={attireItems[selectedAttireIdx].nameDevanagari}
                        onChange={(e) => {
                          const updated = [...attireItems];
                          updated[selectedAttireIdx].nameDevanagari = e.target.value;
                          setAttireItems(updated);
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">हिन्दी नाम व विवरण:</label>
                      <input
                        type="text"
                        value={attireItems[selectedAttireIdx].nameHindi}
                        onChange={(e) => {
                          const updated = [...attireItems];
                          updated[selectedAttireIdx].nameHindi = e.target.value;
                          setAttireItems(updated);
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">विस्तृत विवरण (Description):</label>
                    <textarea
                      rows={3}
                      value={attireItems[selectedAttireIdx].descriptionHindi}
                      onChange={(e) => {
                        const updated = [...attireItems];
                        updated[selectedAttireIdx].descriptionHindi = e.target.value;
                        setAttireItems(updated);
                      }}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-slate-400">कोई परिधान या आभूषण नहीं है।</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 11. AUTHENTIC CUISINE & RECIPES CMS */}
      {/* ============================================================== */}
      {activeTab === 'cuisine' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 text-amber-700" />
                पारंपरिक संथाली खान-पान व व्यंजन संपादन
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                जिल पीठा, छिलका रोटी, लेतो आदि व्यंजन जोड़ें, सामग्री व विधि सुधारें या हटाएं।
              </p>
            </div>
            <button
              onClick={handleSaveCuisine}
              className="px-5 py-2.5 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>सहेजें (Save All)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 space-y-2 max-h-[500px] overflow-y-auto pr-2">
              <button
                onClick={handleAddCuisine}
                className="w-full mb-3 px-3 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>+ नया व्यंजन जोड़ें (Add Dish)</span>
              </button>
              {cuisineRecipes.map((r, idx) => (
                <div
                  key={r.id}
                  onClick={() => setSelectedCuisineIdx(idx)}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    selectedCuisineIdx === idx
                      ? 'border-amber-600 bg-amber-50/50 shadow-xs ring-1 ring-amber-500/30'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                    {r.categoryLabel}
                  </span>
                  <p className="font-black text-slate-900 text-xs mt-1.5">{r.nameDevanagari}</p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-8 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              {cuisineRecipes[selectedCuisineIdx] ? (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="text-xs font-black text-slate-700">
                      व्यंजन: {cuisineRecipes[selectedCuisineIdx].nameDevanagari}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteCuisine(selectedCuisineIdx)}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                        <span>हटाएं (Delete)</span>
                      </button>
                      <button
                        onClick={handleSaveCuisine}
                        className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>सहेजें (Update)</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">संथाली नाम (देवनागरी):</label>
                      <input
                        type="text"
                        value={cuisineRecipes[selectedCuisineIdx].nameDevanagari}
                        onChange={(e) => {
                          const updated = [...cuisineRecipes];
                          updated[selectedCuisineIdx].nameDevanagari = e.target.value;
                          setCuisineRecipes(updated);
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">हिन्दी नाम व विवरण:</label>
                      <input
                        type="text"
                        value={cuisineRecipes[selectedCuisineIdx].nameHindi}
                        onChange={(e) => {
                          const updated = [...cuisineRecipes];
                          updated[selectedCuisineIdx].nameHindi = e.target.value;
                          setCuisineRecipes(updated);
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">पकाने की पारंपरिक विधि (Cooking Method):</label>
                    <textarea
                      rows={3}
                      value={cuisineRecipes[selectedCuisineIdx].cookingMethodHindi}
                      onChange={(e) => {
                        const updated = [...cuisineRecipes];
                        updated[selectedCuisineIdx].cookingMethodHindi = e.target.value;
                        setCuisineRecipes(updated);
                      }}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-slate-400">कोई व्यंजन नहीं है।</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 12. TRADITIONAL SPORTS & SENDRA CMS */}
      {/* ============================================================== */}
      {activeTab === 'sports' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-700" />
                संथाली पारंपरिक खेल एवं शिकार परंपरा संपादन
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                दिशोम सेंन्दरा, काटी खेल, आः आर सार (तीरंदाजी) आदि खेल जोड़ें, नियम सुधारें या हटाएं।
              </p>
            </div>
            <button
              onClick={handleSaveSports}
              className="px-5 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>सहेजें (Save All)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 space-y-2 max-h-[500px] overflow-y-auto pr-2">
              <button
                onClick={handleAddSport}
                className="w-full mb-3 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>+ नया खेल जोड़ें (Add Sport)</span>
              </button>
              {sportsItems.map((s, idx) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedSportIdx(idx)}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    selectedSportIdx === idx
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-500/30'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <p className="font-black text-slate-900 text-xs">{s.nameDevanagari}</p>
                  <p className="text-[11px] text-emerald-700 font-semibold">{s.typeLabel}</p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-8 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              {sportsItems[selectedSportIdx] ? (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="text-xs font-black text-slate-700">
                      खेल: {sportsItems[selectedSportIdx].nameDevanagari}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteSport(selectedSportIdx)}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                        <span>हटाएं (Delete)</span>
                      </button>
                      <button
                        onClick={handleSaveSports}
                        className="px-4 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>सहेजें (Update)</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">खेल का नाम (देवनागरी):</label>
                      <input
                        type="text"
                        value={sportsItems[selectedSportIdx].nameDevanagari}
                        onChange={(e) => {
                          const updated = [...sportsItems];
                          updated[selectedSportIdx].nameDevanagari = e.target.value;
                          setSportsItems(updated);
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">खेल उपकरण (Equipment):</label>
                      <input
                        type="text"
                        value={sportsItems[selectedSportIdx].equipment}
                        onChange={(e) => {
                          const updated = [...sportsItems];
                          updated[selectedSportIdx].equipment = e.target.value;
                          setSportsItems(updated);
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">खेल के नियम व परंपराएं:</label>
                    <textarea
                      rows={3}
                      value={sportsItems[selectedSportIdx].rulesHindi}
                      onChange={(e) => {
                        const updated = [...sportsItems];
                        updated[selectedSportIdx].rulesHindi = e.target.value;
                        setSportsItems(updated);
                      }}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-slate-400">कोई खेल नहीं है।</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 13. FOLK SONGS ARCHIVE CMS */}
      {/* ============================================================== */}
      {activeTab === 'songs' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Radio className="w-5 h-5 text-purple-700" />
                संथाली लोकगीत एवं सेरेञ संग्रह संपादन
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                सोहराय, बाहा, काराम, दासांय के मूल बोल, देवनागरी लिपि व भावार्थ जोड़ें, सुधारें या हटाएं।
              </p>
            </div>
            <button
              onClick={handleSaveSongs}
              className="px-5 py-2.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>सहेजें (Save All)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 space-y-2 max-h-[500px] overflow-y-auto pr-2">
              <button
                onClick={handleAddSong}
                className="w-full mb-3 px-3 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>+ नया लोकगीत जोड़ें</span>
              </button>
              {folkSongs.map((song, idx) => (
                <div
                  key={song.id}
                  onClick={() => setSelectedSongIdx(idx)}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    selectedSongIdx === idx
                      ? 'border-purple-600 bg-purple-50/50 shadow-xs ring-1 ring-purple-500/30'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                    {song.genreLabel}
                  </span>
                  <p className="font-black text-slate-900 text-xs mt-1.5">{song.titleDevanagari}</p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-8 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              {folkSongs[selectedSongIdx] ? (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="text-xs font-black text-slate-700">
                      गीत: {folkSongs[selectedSongIdx].titleDevanagari}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteSong(selectedSongIdx)}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                        <span>हटाएं (Delete)</span>
                      </button>
                      <button
                        onClick={handleSaveSongs}
                        className="px-4 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>सहेजें (Update)</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">गीत शीर्षक (देवनागरी):</label>
                      <input
                        type="text"
                        value={folkSongs[selectedSongIdx].titleDevanagari}
                        onChange={(e) => {
                          const updated = [...folkSongs];
                          updated[selectedSongIdx].titleDevanagari = e.target.value;
                          setFolkSongs(updated);
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">संगत वाद्ययंत्र:</label>
                      <input
                        type="text"
                        value={folkSongs[selectedSongIdx].instrumentsUsed}
                        onChange={(e) => {
                          const updated = [...folkSongs];
                          updated[selectedSongIdx].instrumentsUsed = e.target.value;
                          setFolkSongs(updated);
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">मूल संथाली बोल (देवनागरी):</label>
                    <textarea
                      rows={3}
                      value={folkSongs[selectedSongIdx].lyricsSantali}
                      onChange={(e) => {
                        const updated = [...folkSongs];
                        updated[selectedSongIdx].lyricsSantali = e.target.value;
                        setFolkSongs(updated);
                      }}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-serif"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">हिंदी भावार्थ (Meaning):</label>
                    <textarea
                      rows={2}
                      value={folkSongs[selectedSongIdx].meaningHindi}
                      onChange={(e) => {
                        const updated = [...folkSongs];
                        updated[selectedSongIdx].meaningHindi = e.target.value;
                        setFolkSongs(updated);
                      }}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-slate-400">कोई लोकगीत नहीं है।</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 14. SACRED PILGRIMAGE SITES CMS */}
      {/* ============================================================== */}
      {activeTab === 'pilgrimage' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-teal-700" />
                संथाली ऐतिहासिक तीर्थ स्थल एवं दर्शनीय धरोहर संपादन
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                लुगुबुरु घंटाबाड़ी, भोगनाडीह, अयोध्या बुरु आदि तीर्थ जोड़ें, यात्रा मार्ग व नियम सुधारें या हटाएं।
              </p>
            </div>
            <button
              onClick={handleSavePilgrimage}
              className="px-5 py-2.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>सहेजें (Save All)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 space-y-2 max-h-[500px] overflow-y-auto pr-2">
              <button
                onClick={handleAddPilgrimage}
                className="w-full mb-3 px-3 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>+ नया तीर्थ जोड़ें (Add Site)</span>
              </button>
              {pilgrimageSites.map((site, idx) => (
                <div
                  key={site.id}
                  onClick={() => setSelectedSiteIdx(idx)}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    selectedSiteIdx === idx
                      ? 'border-teal-600 bg-teal-50/50 shadow-xs ring-1 ring-teal-500/30'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                    {site.locationState}
                  </span>
                  <p className="font-black text-slate-900 text-xs mt-1.5">{site.nameDevanagari}</p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-8 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              {pilgrimageSites[selectedSiteIdx] ? (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="text-xs font-black text-slate-700">
                      तीर्थ: {pilgrimageSites[selectedSiteIdx].nameDevanagari}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeletePilgrimage(selectedSiteIdx)}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                        <span>हटाएं (Delete)</span>
                      </button>
                      <button
                        onClick={handleSavePilgrimage}
                        className="px-4 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>सहेजें (Update)</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">तीर्थ का नाम (देवनागरी):</label>
                      <input
                        type="text"
                        value={pilgrimageSites[selectedSiteIdx].nameDevanagari}
                        onChange={(e) => {
                          const updated = [...pilgrimageSites];
                          updated[selectedSiteIdx].nameDevanagari = e.target.value;
                          setPilgrimageSites(updated);
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">स्थान व जिला:</label>
                      <input
                        type="text"
                        value={pilgrimageSites[selectedSiteIdx].districtPlace}
                        onChange={(e) => {
                          const updated = [...pilgrimageSites];
                          updated[selectedSiteIdx].districtPlace = e.target.value;
                          setPilgrimageSites(updated);
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ऐतिहासिक व आध्यात्मिक महत्व:</label>
                    <textarea
                      rows={3}
                      value={pilgrimageSites[selectedSiteIdx].historyAndSignificance}
                      onChange={(e) => {
                        const updated = [...pilgrimageSites];
                        updated[selectedSiteIdx].historyAndSignificance = e.target.value;
                        setPilgrimageSites(updated);
                      }}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-slate-400">कोई तीर्थ स्थल नहीं है।</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 15. SACRED LIFE RITES CMS */}
      {/* ============================================================== */}
      {activeTab === 'rites' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Baby className="w-5 h-5 text-rose-700" />
                संथाली जीवन-संस्कार दर्शन संपादन
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                जानाम छठियार, चाचो छठियार, भांडान आदि संस्कार जोड़ें, विधान व बाखेर सुधारें या हटाएं।
              </p>
            </div>
            <button
              onClick={handleSaveLifeRites}
              className="px-5 py-2.5 rounded-2xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>सहेजें (Save All)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 space-y-2 max-h-[500px] overflow-y-auto pr-2">
              <button
                onClick={handleAddLifeRite}
                className="w-full mb-3 px-3 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>+ नया जीवन-संस्कार जोड़ें</span>
              </button>
              {lifeRites.map((rite, idx) => (
                <div
                  key={rite.id}
                  onClick={() => setSelectedRiteIdx(idx)}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    selectedRiteIdx === idx
                      ? 'border-rose-600 bg-rose-50/50 shadow-xs ring-1 ring-rose-500/30'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                    {rite.stageLabel}
                  </span>
                  <p className="font-black text-slate-900 text-xs mt-1.5">{rite.nameDevanagari}</p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-8 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              {lifeRites[selectedRiteIdx] ? (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="text-xs font-black text-slate-700">
                      संस्कार: {lifeRites[selectedRiteIdx].nameDevanagari}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteLifeRite(selectedRiteIdx)}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                        <span>हटाएं (Delete)</span>
                      </button>
                      <button
                        onClick={handleSaveLifeRites}
                        className="px-4 py-1.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>सहेजें (Update)</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">संस्कार नाम (देवनागरी):</label>
                      <input
                        type="text"
                        value={lifeRites[selectedRiteIdx].nameDevanagari}
                        onChange={(e) => {
                          const updated = [...lifeRites];
                          updated[selectedRiteIdx].nameDevanagari = e.target.value;
                          setLifeRites(updated);
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">हिन्दी शीर्षक:</label>
                      <input
                        type="text"
                        value={lifeRites[selectedRiteIdx].titleHindi}
                        onChange={(e) => {
                          const updated = [...lifeRites];
                          updated[selectedRiteIdx].titleHindi = e.target.value;
                          setLifeRites(updated);
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">मुख्य विधि-विधान व परंपराएं:</label>
                    <textarea
                      rows={3}
                      value={lifeRites[selectedRiteIdx].coreRitualDescription}
                      onChange={(e) => {
                        const updated = [...lifeRites];
                        updated[selectedRiteIdx].coreRitualDescription = e.target.value;
                        setLifeRites(updated);
                      }}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-slate-400">कोई जीवन-संस्कार नहीं है।</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 16. CULTURAL CALENDAR & FESTIVALS CMS */}
      {/* ============================================================== */}
      {activeTab === 'calendar' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-700" />
                सांस्कृतिक महापर्व पंचांग संपादन (Festivals CMS)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                सोहराय, बाहा, काराम, माघे, एरोक आदि महापर्व जोड़ें, अवधि व अनुष्ठान विधि सुधारें या हटाएं।
              </p>
            </div>
            <button
              onClick={handleSaveFestivals}
              className="px-5 py-2.5 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>सहेजें (Save All)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 space-y-2 max-h-[500px] overflow-y-auto pr-2">
              <button
                onClick={handleAddFestival}
                className="w-full mb-3 px-3 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>+ नया पर्व जोड़ें (Add Festival)</span>
              </button>
              {festivals.map((fest, idx) => (
                <div
                  key={fest.id}
                  onClick={() => setSelectedFestIdx(idx)}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    selectedFestIdx === idx
                      ? 'border-amber-600 bg-amber-50/50 shadow-xs ring-1 ring-amber-500/30'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <p className="font-black text-slate-900 text-xs">{fest.nameDevanagari}</p>
                  <p className="text-[11px] text-amber-700 font-semibold">{fest.nameHindi}</p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-8 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              {festivals[selectedFestIdx] ? (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="text-xs font-black text-slate-700">
                      पर्व: {festivals[selectedFestIdx].nameDevanagari}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteFestival(selectedFestIdx)}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                        <span>हटाएं (Delete)</span>
                      </button>
                      <button
                        onClick={handleSaveFestivals}
                        className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>सहेजें (Update)</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">पर्व का नाम (देवनागरी):</label>
                      <input
                        type="text"
                        value={festivals[selectedFestIdx].nameDevanagari}
                        onChange={(e) => {
                          const updated = [...festivals];
                          updated[selectedFestIdx].nameDevanagari = e.target.value;
                          setFestivals(updated);
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">हिन्दी नाम व उपाधि:</label>
                      <input
                        type="text"
                        value={festivals[selectedFestIdx].nameHindi}
                        onChange={(e) => {
                          const updated = [...festivals];
                          updated[selectedFestIdx].nameHindi = e.target.value;
                          setFestivals(updated);
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">संताली मास / समय:</label>
                      <input
                        type="text"
                        value={festivals[selectedFestIdx].santaliMonth}
                        onChange={(e) => {
                          const updated = [...festivals];
                          updated[selectedFestIdx].santaliMonth = e.target.value;
                          setFestivals(updated);
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">अवधि (उदा. ५ दिवसीय):</label>
                      <input
                        type="text"
                        value={festivals[selectedFestIdx].duration}
                        onChange={(e) => {
                          const updated = [...festivals];
                          updated[selectedFestIdx].duration = e.target.value;
                          setFestivals(updated);
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">महत्व एवं दार्शनिक भावार्थ:</label>
                    <textarea
                      rows={3}
                      value={festivals[selectedFestIdx].significanceParagraph}
                      onChange={(e) => {
                        const updated = [...festivals];
                        updated[selectedFestIdx].significanceParagraph = e.target.value;
                        setFestivals(updated);
                      }}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-slate-400">कोई पर्व नहीं है।</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 17. 12 CLANS & TOTEMS CMS */}
      {/* ============================================================== */}
      {activeTab === 'clans' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-700" />
                १२ पवित्र गोत्र व पारिस संपादन (Clans CMS)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                हाँसदा, मुर्मु, किस्कू, हेम्ब्रम, मरांडी, सोरेन आदि गोत्रों के टोटेम, मर्यादाएं व भूमिका सुधारें या नया गोत्र जोड़ें।
              </p>
            </div>
            <button
              onClick={handleSaveClans}
              className="px-5 py-2.5 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>सहेजें (Save All)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 space-y-2 max-h-[500px] overflow-y-auto pr-2">
              <button
                onClick={handleAddClan}
                className="w-full mb-3 px-3 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>+ नया पारिस जोड़ें (Add Clan)</span>
              </button>
              {clans.map((clan, idx) => (
                <div
                  key={clan.id}
                  onClick={() => setSelectedClanIdx(idx)}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    selectedClanIdx === idx
                      ? 'border-amber-600 bg-amber-50/50 shadow-xs ring-1 ring-amber-500/30'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <p className="font-black text-slate-900 text-xs">{clan.nameDevanagari}</p>
                  <p className="text-[11px] text-amber-700 font-semibold">{clan.nameHindi}</p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-8 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              {clans[selectedClanIdx] ? (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="text-xs font-black text-slate-700">
                      पारिस: {clans[selectedClanIdx].nameDevanagari}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteClan(selectedClanIdx)}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                        <span>हटाएं (Delete)</span>
                      </button>
                      <button
                        onClick={handleSaveClans}
                        className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>सहेजें (Update)</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">गोत्र नाम (देवनागरी):</label>
                      <input
                        type="text"
                        value={clans[selectedClanIdx].nameDevanagari}
                        onChange={(e) => {
                          const updated = [...clans];
                          updated[selectedClanIdx].nameDevanagari = e.target.value;
                          setClans(updated);
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">हिन्दी नाम व उपाधि:</label>
                      <input
                        type="text"
                        value={clans[selectedClanIdx].nameHindi}
                        onChange={(e) => {
                          const updated = [...clans];
                          updated[selectedClanIdx].nameHindi = e.target.value;
                          setClans(updated);
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">टोटेम प्रतीक (Totem Symbol):</label>
                      <input
                        type="text"
                        value={clans[selectedClanIdx].totemSymbol}
                        onChange={(e) => {
                          const updated = [...clans];
                          updated[selectedClanIdx].totemSymbol = e.target.value;
                          setClans(updated);
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">पारंपरिक दायित्व (Role):</label>
                      <input
                        type="text"
                        value={clans[selectedClanIdx].traditionalRole}
                        onChange={(e) => {
                          const updated = [...clans];
                          updated[selectedClanIdx].traditionalRole = e.target.value;
                          setClans(updated);
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">पवित्र मर्यादाएं व निषेध (Sacred Taboo):</label>
                    <textarea
                      rows={2}
                      value={clans[selectedClanIdx].sacredTaboo}
                      onChange={(e) => {
                        const updated = [...clans];
                        updated[selectedClanIdx].sacredTaboo = e.target.value;
                        setClans(updated);
                      }}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-slate-400">कोई गोत्र नहीं है।</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 18. EVERYDAY PHRASES CMS */}
      {/* ============================================================== */}
      {activeTab === 'phrases' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-700" />
                दैनिक बोलचाल के वाक्य संपादन (Phrasebook CMS)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                नए वाक्य जोड़ें (Add), किसी भी वाक्य को सुधारें (Edit/Update) या हटाएं (Delete)।
              </p>
            </div>
            <div className="flex items-center gap-2">
              {editingPhraseId && (
                <button
                  onClick={() => {
                    setEditingPhraseId(null);
                    setPhraseForm({
                      category: 'Greetings',
                      santaliRoman: '',
                      santaliDevanagari: '',
                      hindi: '',
                      english: '',
                      context: ''
                    });
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  रद्द करें
                </button>
              )}
              <button
                onClick={handleSavePhrase}
                className="px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{editingPhraseId ? 'वाक्य अद्यतन करें (Update)' : '+ नया वाक्य जोड़ें (Add)'}</span>
              </button>
            </div>
          </div>

          {/* Phrase Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">संताली देवनागरी वाक्य:</label>
              <input
                type="text"
                value={phraseForm.santaliDevanagari}
                onChange={(e) => setPhraseForm({ ...phraseForm, santaliDevanagari: e.target.value })}
                placeholder="उदा. जोहार! चेलेका मेनामा?"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-serif"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">रोमन संताली वाक्य:</label>
              <input
                type="text"
                value={phraseForm.santaliRoman}
                onChange={(e) => setPhraseForm({ ...phraseForm, santaliRoman: e.target.value })}
                placeholder="e.g. Johar! Cheleka menama?"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">हिन्दी अनुवाद:</label>
              <input
                type="text"
                value={phraseForm.hindi}
                onChange={(e) => setPhraseForm({ ...phraseForm, hindi: e.target.value })}
                placeholder="उदा. नमस्ते! आप कैसे हैं?"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">अंग्रेज़ी अनुवाद (English):</label>
              <input
                type="text"
                value={phraseForm.english}
                onChange={(e) => setPhraseForm({ ...phraseForm, english: e.target.value })}
                placeholder="e.g. Greetings! How are you?"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
              />
            </div>
          </div>

          {/* Phrases List with inline Edit & Delete */}
          <div className="max-h-[400px] overflow-y-auto border border-slate-200 rounded-2xl divide-y divide-slate-100">
            {phrases.map((p) => (
              <div key={p.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50 text-xs">
                <div>
                  <span className="font-black text-slate-900 font-serif mr-2">{p.santaliDevanagari}</span>
                  <span className="text-amber-800 font-mono mr-2">({p.santaliRoman})</span>
                  <span className="text-slate-600">— {p.hindi}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      setEditingPhraseId(p.id);
                      setPhraseForm(p);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>सुधारें</span>
                  </button>
                  <button
                    onClick={() => handleDeletePhrase(p.id)}
                    className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 19. KUDUM RIDDLES & PROVERBS CMS */}
      {/* ============================================================== */}
      {activeTab === 'riddles' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-700" />
                कुदुम व पहेलियां संपादन (Riddles CMS)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                नई कुदुम पहेली जोड़ें (Add), उत्तर व व्याख्या सुधारें (Edit/Update) या हटाएं (Delete)।
              </p>
            </div>
            <div className="flex items-center gap-2">
              {editingKudumId && (
                <button
                  onClick={() => {
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
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  रद्द करें
                </button>
              )}
              <button
                onClick={handleSaveKudum}
                className="px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{editingKudumId ? 'पहेली अद्यतन करें (Update)' : '+ नई पहेली जोड़ें (Add)'}</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">पहेली (संताली देवनागरी):</label>
              <input
                type="text"
                value={kudumForm.riddleDevanagari}
                onChange={(e) => setKudumForm({ ...kudumForm, riddleDevanagari: e.target.value })}
                placeholder="संताली पहेली के बोल..."
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-serif"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">उत्तर (हिन्दी / संताली):</label>
              <input
                type="text"
                value={kudumForm.answerHindi}
                onChange={(e) => setKudumForm({ ...kudumForm, answerHindi: e.target.value })}
                placeholder="पहेली का सही उत्तर..."
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-700 block mb-1">दार्शनिक व्याख्या (Explanation):</label>
              <input
                type="text"
                value={kudumForm.explanation}
                onChange={(e) => setKudumForm({ ...kudumForm, explanation: e.target.value })}
                placeholder="पहेली का अर्थ और ज्ञान..."
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
              />
            </div>
          </div>

          {/* Kudums List */}
          <div className="max-h-[400px] overflow-y-auto border border-slate-200 rounded-2xl divide-y divide-slate-100">
            {kudums.map((k) => (
              <div key={k.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50 text-xs">
                <div>
                  <p className="font-black text-slate-900 font-serif">{k.riddleDevanagari}</p>
                  <p className="text-amber-800 font-semibold mt-1">उत्तर: {k.answerHindi || k.answerDevanagari}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      setEditingKudumId(k.id);
                      setKudumForm(k);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>सुधारें</span>
                  </button>
                  <button
                    onClick={() => handleDeleteKudum(k.id)}
                    className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 20. MASTER BACKUP & FACTORY RESET */}
      {/* ============================================================== */}
      {activeTab === 'backup' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-900">मास्टर बैकअप, एक्सपोर्ट व रिस्टोर</h2>
            <p className="text-xs text-slate-500 mt-1">
              अपने पूरे एप्लिकेशन के सभी डेटाबेस का १-क्लिक में बैकअप लें या किसी भी समय फ़ैक्टरी सेटिंग्स पर वापस लौटें।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
              <Download className="w-6 h-6 text-amber-700" />
              <h3 className="font-black text-slate-900 text-sm">पूर्ण बैकअप डाउनलोड करें</h3>
              <p className="text-xs text-slate-600">सभी शब्द, गाथाएं, नृत्य, बोंगा-बुरु, पर्व व सेटिंग्स सुरक्षित करें।</p>
              <button
                onClick={handleExportAllJSON}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer shadow-xs"
              >
                JSON फ़ाइल डाउनलोड करें
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-3">
              <Upload className="w-6 h-6 text-blue-700" />
              <h3 className="font-black text-slate-900 text-sm">बैकअप फ़ाइल रीस्टोर करें</h3>
              <p className="text-xs text-slate-600">पहले से सहेजी गई JSON फ़ाइल अपलोड करके डेटा तुरंत लाइव करें।</p>
              <label className="w-full py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs text-center block cursor-pointer shadow-xs">
                JSON फ़ाइल अपलोड करें
                <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
              </label>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
              <RotateCcw className="w-6 h-6 text-rose-700" />
              <h3 className="font-black text-slate-900 text-sm">फ़ैक्टरी सेटिंग्स पर रीसेट करें</h3>
              <p className="text-xs text-slate-600">सभी कस्टम बदलाव हटाकर मूल प्रामाणिक डेटा पुनः स्थापित करें।</p>
              <button
                onClick={handleResetAllToFactory}
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer shadow-xs"
              >
                डिफ़ॉल्ट पर रीसेट करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
