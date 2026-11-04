import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ActiveDesktopTab, GlobalViewMode, ScriptType } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import type { AdminTab } from './components/AdminMasterStudio';
import { AboutModal } from './components/AboutModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { FeedbackModal } from './components/FeedbackModal';
import { Footer } from './components/Footer';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { Settings, ArrowLeft, Home, ShieldCheck, KeyRound, CheckCircle2, Lock, Sparkles, Edit3 } from 'lucide-react';

const KeyboardModule = lazy(() => import('./components/KeyboardModule').then((m) => ({ default: m.KeyboardModule })));
const DictionaryModule = lazy(() => import('./components/DictionaryModule').then((m) => ({ default: m.DictionaryModule })));
const LearnModule = lazy(() => import('./components/LearnModule').then((m) => ({ default: m.LearnModule })));
const SantaliSocialCardStudio = lazy(() => import('./components/SantaliSocialCardStudio').then((m) => ({ default: m.SantaliSocialCardStudio })));
const SantaliLunarCalendarClock = lazy(() => import('./components/SantaliLunarCalendarClock').then((m) => ({ default: m.SantaliLunarCalendarClock })));
const AISearchAssistant = lazy(() => import('./components/AISearchAssistant').then((m) => ({ default: m.AISearchAssistant })));
const TranslatorModule = lazy(() => import('./components/TranslatorModule').then((m) => ({ default: m.TranslatorModule })));
const DailyVocabQuiz = lazy(() => import('./components/DailyVocabQuiz').then((m) => ({ default: m.DailyVocabQuiz })));
const SantaliPhrasebook = lazy(() => import('./components/SantaliPhrasebook').then((m) => ({ default: m.SantaliPhrasebook })));
const SantaliFlashcards = lazy(() => import('./components/SantaliFlashcards').then((m) => ({ default: m.SantaliFlashcards })));
const CalligraphyStudio = lazy(() => import('./components/CalligraphyStudio').then((m) => ({ default: m.CalligraphyStudio })));
const KudumProverbs = lazy(() => import('./components/KudumProverbs').then((m) => ({ default: m.KudumProverbs })));
const CulturalCalendar = lazy(() => import('./components/CulturalCalendar').then((m) => ({ default: m.CulturalCalendar })));
const SantaliWordleGame = lazy(() => import('./components/SantaliWordleGame').then((m) => ({ default: m.SantaliWordleGame })));
const FolkStoriesPlayer = lazy(() => import('./components/FolkStoriesPlayer').then((m) => ({ default: m.FolkStoriesPlayer })));
const PronunciationCoach = lazy(() => import('./components/PronunciationCoach').then((m) => ({ default: m.PronunciationCoach })));
const TextSpeakerReader = lazy(() => import('./components/TextSpeakerReader').then((m) => ({ default: m.TextSpeakerReader })));
const SantaliInstrumentsPad = lazy(() => import('./components/SantaliInstrumentsPad').then((m) => ({ default: m.SantaliInstrumentsPad })));
const SantaliFamilyTree = lazy(() => import('./components/SantaliFamilyTree').then((m) => ({ default: m.SantaliFamilyTree })));
const SantaliKidsJukebox = lazy(() => import('./components/SantaliKidsJukebox').then((m) => ({ default: m.SantaliKidsJukebox })));
const SantaliClockNumbers = lazy(() => import('./components/SantaliClockNumbers').then((m) => ({ default: m.SantaliClockNumbers })));
const SantaliClansDirectory = lazy(() => import('./components/SantaliClansDirectory').then((m) => ({ default: m.SantaliClansDirectory })));
const AdivasiFloraWorksheet = lazy(() => import('./components/AdivasiFloraWorksheet').then((m) => ({ default: m.AdivasiFloraWorksheet })));
const MajhiParganaSystem = lazy(() => import('./components/MajhiParganaSystem').then((m) => ({ default: m.MajhiParganaSystem })));
const SantaliGrammarBuilder = lazy(() => import('./components/SantaliGrammarBuilder').then((m) => ({ default: m.SantaliGrammarBuilder })));
const SantaliGreetingMaker = lazy(() => import('./components/SantaliGreetingMaker').then((m) => ({ default: m.SantaliGreetingMaker })));
const SantaliHerbalRemedies = lazy(() => import('./components/SantaliHerbalRemedies').then((m) => ({ default: m.SantaliHerbalRemedies })));
const SantaliCreationMyth = lazy(() => import('./components/SantaliCreationMyth').then((m) => ({ default: m.SantaliCreationMyth })));
const SantaliDancesTop10 = lazy(() => import('./components/SantaliDancesTop10').then((m) => ({ default: m.SantaliDancesTop10 })));
const SantaliBongaBuruTop15 = lazy(() => import('./components/SantaliBongaBuruTop15').then((m) => ({ default: m.SantaliBongaBuruTop15 })));
const SantaliAttireOrnaments = lazy(() => import('./components/SantaliAttireOrnaments').then((m) => ({ default: m.SantaliAttireOrnaments })));
const SantaliMarriageBapla = lazy(() => import('./components/SantaliMarriageBapla').then((m) => ({ default: m.SantaliMarriageBapla })));
const SanthalHulHeroes = lazy(() => import('./components/SanthalHulHeroes').then((m) => ({ default: m.SanthalHulHeroes })));
const SantaliCuisineRecipes = lazy(() => import('./components/SantaliCuisineRecipes').then((m) => ({ default: m.SantaliCuisineRecipes })));
const SantaliTraditionalSports = lazy(() => import('./components/SantaliTraditionalSports').then((m) => ({ default: m.SantaliTraditionalSports })));
const SantaliFolkSongsArchive = lazy(() => import('./components/SantaliFolkSongsArchive').then((m) => ({ default: m.SantaliFolkSongsArchive })));
const SantaliPilgrimageSites = lazy(() => import('./components/SantaliPilgrimageSites').then((m) => ({ default: m.SantaliPilgrimageSites })));
const SantaliLifeRites = lazy(() => import('./components/SantaliLifeRites').then((m) => ({ default: m.SantaliLifeRites })));
const SohraiMuralArt = lazy(() => import('./components/SohraiMuralArt').then((m) => ({ default: m.SohraiMuralArt })));
const SantaliProverbsBhenta = lazy(() => import('./components/SantaliProverbsBhenta').then((m) => ({ default: m.SantaliProverbsBhenta })));
const SantaliAgriSeasons = lazy(() => import('./components/SantaliAgriSeasons').then((m) => ({ default: m.SantaliAgriSeasons })));
const SantaliTraditionalMeasures = lazy(() => import('./components/SantaliTraditionalMeasures').then((m) => ({ default: m.SantaliTraditionalMeasures })));
const SantaliArchitecture = lazy(() => import('./components/SantaliArchitecture').then((m) => ({ default: m.SantaliArchitecture })));
const SantaliHistoricalGarhs = lazy(() => import('./components/SantaliHistoricalGarhs').then((m) => ({ default: m.SantaliHistoricalGarhs })));
const SantaliPuppetryTheater = lazy(() => import('./components/SantaliPuppetryTheater').then((m) => ({ default: m.SantaliPuppetryTheater })));
const SantaliAstronomySkyLore = lazy(() => import('./components/SantaliAstronomySkyLore').then((m) => ({ default: m.SantaliAstronomySkyLore })));
const SantaliSendraLobir = lazy(() => import('./components/SantaliSendraLobir').then((m) => ({ default: m.SantaliSendraLobir })));
const SantaliDhokraArt = lazy(() => import('./components/SantaliDhokraArt').then((m) => ({ default: m.SantaliDhokraArt })));
const SantaliWaterHarvesting = lazy(() => import('./components/SantaliWaterHarvesting').then((m) => ({ default: m.SantaliWaterHarvesting })));
const SantaliHandloomWeaving = lazy(() => import('./components/SantaliHandloomWeaving').then((m) => ({ default: m.SantaliHandloomWeaving })));
const SantaliLivestockKhuntau = lazy(() => import('./components/SantaliLivestockKhuntau').then((m) => ({ default: m.SantaliLivestockKhuntau })));
const SantaliWoodcraftCarpentry = lazy(() => import('./components/SantaliWoodcraftCarpentry').then((m) => ({ default: m.SantaliWoodcraftCarpentry })));
const SantaliBambooCraft = lazy(() => import('./components/SantaliBambooCraft').then((m) => ({ default: m.SantaliBambooCraft })));
const SantaliPhoneticsLab = lazy(() => import('./components/SantaliPhoneticsLab').then((m) => ({ default: m.SantaliPhoneticsLab })));
const SantaliBabyNamesDirectory = lazy(() => import('./components/SantaliBabyNamesDirectory').then((m) => ({ default: m.SantaliBabyNamesDirectory })));
const SantaliOrnamentsJewellery = lazy(() => import('./components/SantaliOrnamentsJewellery').then((m) => ({ default: m.SantaliOrnamentsJewellery })));
const SantaliBlacksmithyIronCraft = lazy(() => import('./components/SantaliBlacksmithyIronCraft').then((m) => ({ default: m.SantaliBlacksmithyIronCraft })));
const SantaliSeasonsWeatherLore = lazy(() => import('./components/SantaliSeasonsWeatherLore').then((m) => ({ default: m.SantaliSeasonsWeatherLore })));
const SantaliIdiomsMenkatha = lazy(() => import('./components/SantaliIdiomsMenkatha').then((m) => ({ default: m.SantaliIdiomsMenkatha })));
const SantaliTraditionalHerbalDrinks = lazy(() => import('./components/SantaliTraditionalHerbalDrinks').then((m) => ({ default: m.SantaliTraditionalHerbalDrinks })));
const SantaliArcheryGameSimulator = lazy(() => import('./components/SantaliArcheryGameSimulator').then((m) => ({ default: m.SantaliArcheryGameSimulator })));
const SantaliTraditionalCuisine = lazy(() => import('./components/SantaliTraditionalCuisine').then((m) => ({ default: m.SantaliTraditionalCuisine })));
const SantaliMarriageLifeRituals = lazy(() => import('./components/SantaliMarriageLifeRituals').then((m) => ({ default: m.SantaliMarriageLifeRituals })));
const SantaliRiddlesKudumGame = lazy(() => import('./components/SantaliRiddlesKudumGame').then((m) => ({ default: m.SantaliRiddlesKudumGame })));
const SantaliSacredPilgrimages = lazy(() => import('./components/SantaliSacredPilgrimages').then((m) => ({ default: m.SantaliSacredPilgrimages })));
const SantaliSpokenDialogues = lazy(() => import('./components/SantaliSpokenDialogues').then((m) => ({ default: m.SantaliSpokenDialogues })));
const SantaliFormalLetterTemplates = lazy(() => import('./components/SantaliFormalLetterTemplates').then((m) => ({ default: m.SantaliFormalLetterTemplates })));
const SantaliIllustratedFolkTales = lazy(() => import('./components/SantaliIllustratedFolkTales').then((m) => ({ default: m.SantaliIllustratedFolkTales })));
const SantaliFavoritesNotebook = lazy(() => import('./components/SantaliFavoritesNotebook').then((m) => ({ default: m.SantaliFavoritesNotebook })));
const SantaliProficiencyCertificate = lazy(() => import('./components/SantaliProficiencyCertificate').then((m) => ({ default: m.SantaliProficiencyCertificate })));
const AdminMasterStudio = lazy(() => import('./components/AdminMasterStudio').then((m) => ({ default: m.AdminMasterStudio })));
const MobileSimulator = lazy(() => import('./components/MobileSimulator').then((m) => ({ default: m.MobileSimulator })));
const PresentationView = lazy(() => import('./components/PresentationView').then((m) => ({ default: m.PresentationView })));
const GlobalSearchModal = lazy(() => import('./components/GlobalSearchModal').then((m) => ({ default: m.GlobalSearchModal })));

const ModuleLoader = () => (
  <div className="flex items-center justify-center py-20 text-sm text-slate-500">Loading…</div>
);

function AppContent() {
  const [viewMode, setViewMode] = useState<GlobalViewMode>('desktop');
  const [activeTab, setActiveTab] = useState<ActiveDesktopTab>('home');
  const [activeScript, setActiveScript] = useState<ScriptType>('roman');
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [translatorInitialText, setTranslatorInitialText] = useState('');
  const [adminInitialTab, setAdminInitialTab] = useState<AdminTab>('hero');

  const { isAdmin } = useAdmin();

  const getAdminTabForCurrentSection = (tab: ActiveDesktopTab): AdminTab | null => {
    switch (tab) {
      case 'home': return 'hero';
      case 'dashboard': return 'dictionary';
      case 'creation': return 'creation';
      case 'dances': return 'dances';
      case 'bonga_buru': return 'bonga_buru';
      case 'hul_heroes': return 'hul_heroes';
      case 'marriage_bapla':
      case 'marriage_rituals': return 'bapla';
      case 'attire_ornaments': return 'attire';
      case 'cuisine':
      case 'traditional_cuisine': return 'cuisine';
      case 'sports_sendra': return 'sports';
      case 'folk_songs': return 'songs';
      case 'pilgrimage':
      case 'sacred_pilgrimages': return 'pilgrimage';
      case 'life_rites': return 'rites';
      case 'governance': return 'governance';
      case 'herbal': return 'herbal';
      case 'calendar': return 'calendar';
      case 'clans': return 'clans';
      case 'phrasebook':
      case 'spoken_dialogues': return 'phrases';
      case 'kudum':
      case 'riddles_kudum': return 'riddles';
      // 22 Additional Cultural & Heritage Modules
      case 'sohrai_art': return 'sohrai_art';
      case 'proverbs_bhenta': return 'proverbs_bhenta';
      case 'agri_seasons': return 'agri_seasons';
      case 'traditional_measures': return 'traditional_measures';
      case 'architecture': return 'architecture';
      case 'historical_garhs': return 'historical_garhs';
      case 'puppetry_theater': return 'puppetry_theater';
      case 'astronomy_lore': return 'astronomy_lore';
      case 'sendra_lobir': return 'sendra_lobir';
      case 'dhokra_art': return 'dhokra_art';
      case 'water_harvesting': return 'water_harvesting';
      case 'handloom_weaving': return 'handloom_weaving';
      case 'livestock_khuntau': return 'livestock_khuntau';
      case 'woodcraft_carpentry': return 'woodcraft_carpentry';
      case 'bamboo_craft': return 'bamboo_craft';
      case 'phonetics_lab': return 'phonetics_lab';
      case 'baby_names': return 'baby_names';
      case 'ornaments_jewellery': return 'ornaments_jewellery';
      case 'blacksmithy_iron': return 'blacksmithy_iron';
      case 'seasons_weather': return 'seasons_weather';
      case 'idioms_menkatha': return 'idioms_menkatha';
      case 'herbal_drinks': return 'herbal_drinks';
      default: return null;
    }
  };

  const handleSendToTranslator = (text: string) => {
    setTranslatorInitialText(text);
    setActiveTab('translator');
    if (viewMode === 'mobile_simulator' || viewMode === 'presentation') {
      setViewMode('desktop');
    }
  };

  const handleSelectWordForKeyboard = (word: string) => {
    setActiveTab('keyboard');
  };

  // Global Ctrl+K / Cmd+K search shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 flex flex-col font-sans transition-colors duration-150">
      {/* Universal Top Header with Hideable Left Menu Toggle & Admin Login */}
      <Header
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        activeScript={activeScript}
        onScriptChange={setActiveScript}
        onOpenAbout={() => setAboutModalOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenFeedback={() => setFeedbackModalOpen(true)}
        onOpenDailyQuiz={() => setActiveTab('daily_quiz')}
        onOpenSearch={() => setSearchModalOpen(true)}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />

      {/* Main Viewport Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* MODE 1: Desktop Suite */}
        {viewMode === 'desktop' && (
          <div className="flex-1 flex w-full">
            {/* Desktop Left Sidebar (Hideable / Toggleable) */}
            {sidebarOpen && (
              <div className="hidden md:block">
                <Sidebar
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  onOpenAbout={() => setAboutModalOpen(true)}
                  onOpenHelp={() => setAboutModalOpen(true)}
                  onOpenFeedback={() => setFeedbackModalOpen(true)}
                  onToggleSidebar={() => setSidebarOpen(false)}
                />
              </div>
            )}

            {/* Desktop Main Content Workspace */}
            <main className={`flex-1 p-3 sm:p-5 lg:p-6 overflow-y-auto max-w-full transition-all duration-200 ${
              !sidebarOpen ? 'w-full' : ''
            }`}>
<Suspense fallback={<ModuleLoader />}>
              {/* Admin Active Notification Strip */}
              {isAdmin && (
                <div className="mb-4 px-4 py-2.5 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs text-amber-900 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      <strong>एडमिन लाइव मोड सक्रिय (Admin Mode Active):</strong> आप इस सेक्शन के हर कंटेंट को नया जोड़ (Add), सुधार (Edit/Update) या हटा (Delete) सकते हैं।
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {getAdminTabForCurrentSection(activeTab) && activeTab !== 'admin_cms' && (
                      <button
                        onClick={() => {
                          const mapped = getAdminTabForCurrentSection(activeTab);
                          if (mapped) setAdminInitialTab(mapped);
                          setActiveTab('admin_cms');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all hover:scale-105"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>इस सेक्शन को CMS में संपादित / नया जोड़ें →</span>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setAdminInitialTab('hero');
                        setActiveTab('admin_cms');
                      }}
                      className="font-bold underline text-amber-800 hover:text-amber-950 text-[11px]"
                    >
                      मास्टर एडमिन स्टूडियो →
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Back to Home with Real Home Icon */}
              {activeTab !== 'home' && (
                <div className="mb-4 flex items-center justify-between">
                  <button
                    onClick={() => setActiveTab('home')}
                    title="Return to Home Dashboard"
                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-800 hover:text-sky-700 bg-white hover:bg-sky-50/80 px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-2xs transition-all hover:scale-102 group cursor-pointer"
                  >
                    <Home className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform" />
                    <span>Home Dashboard</span>
                  </button>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                    <span>{activeTab} module</span>
                  </div>
                </div>
              )}

              {/* Tab: Home Dashboard */}
              {activeTab === 'home' && (
                <Dashboard
                  onNavigate={setActiveTab}
                  activeScript={activeScript}
                  onScriptChange={setActiveScript}
                  onOpenSearch={() => setSearchModalOpen(true)}
                />
              )}

              {/* Tab: Keyboard */}
              {activeTab === 'keyboard' && (
                <KeyboardModule
                  onSendToTranslator={handleSendToTranslator}
                />
              )}

              {/* Tab: Dictionary */}
              {activeTab === 'dashboard' && (
                <DictionaryModule
                  onSelectWordForKeyboard={handleSelectWordForKeyboard}
                />
              )}

              {/* Tab: Learn Santali */}
              {activeTab === 'learn' && (
                <LearnModule />
              )}

              {/* Tab: Spoken Everyday Phrasebook */}
              {activeTab === 'phrasebook' && (
                <SantaliPhrasebook />
              )}

              {/* Tab: Vocabulary Memory Flashcards */}
              {activeTab === 'flashcards' && (
                <SantaliFlashcards />
              )}

              {/* Tab: Santali Devanagari Calligraphy & Posters */}
              {activeTab === 'calligraphy' && (
                <CalligraphyStudio />
              )}

              {/* Tab: Kudum Riddles & Wise Proverbs */}
              {activeTab === 'kudum' && (
                <KudumProverbs />
              )}

              {/* Tab: Santali Cultural Calendar & Festivals */}
              {activeTab === 'calendar' && (
                <CulturalCalendar />
              )}

              {/* Tab: Dharti ki Sristi / Sirjon Kahni */}
              {activeTab === 'creation' && (
                <SantaliCreationMyth />
              )}

              {/* Tab: Top 10 Santali Traditional Dances */}
              {activeTab === 'dances' && (
                <SantaliDancesTop10 />
              )}

              {/* Tab: Top 15 Puja-Paat & Bonga Buru */}
              {activeTab === 'bonga_buru' && (
                <SantaliBongaBuruTop15 />
              )}

              {/* Tab: Santhal Hul 1855 & Freedom Fighters */}
              {activeTab === 'hul_heroes' && (
                <SanthalHulHeroes />
              )}

              {/* Tab: Santali Marriage Traditions & 8 Bapla */}
              {activeTab === 'marriage_bapla' && (
                <SantaliMarriageBapla />
              )}

              {/* Tab: Traditional Attire & Ornaments */}
              {activeTab === 'attire_ornaments' && (
                <SantaliAttireOrnaments />
              )}

              {/* Tab: Authentic Cuisine & Recipes */}
              {activeTab === 'cuisine' && (
                <SantaliCuisineRecipes />
              )}

              {/* Tab: Traditional Sports & Sendra */}
              {activeTab === 'sports_sendra' && (
                <SantaliTraditionalSports />
              )}

              {/* Tab: Folk Songs & Seren Archive */}
              {activeTab === 'folk_songs' && (
                <SantaliFolkSongsArchive />
              )}

              {/* Tab: Sacred Heritage & Pilgrimage Sites */}
              {activeTab === 'pilgrimage' && (
                <SantaliPilgrimageSites />
              )}

              {/* Tab: Sacred Life Rites */}
              {activeTab === 'life_rites' && (
                <SantaliLifeRites />
              )}

              {/* Tab: Sohrai & Khovar Mural Art Studio */}
              {activeTab === 'sohrai_art' && (
                <SohraiMuralArt />
              )}

              {/* Tab: Santali Proverbs & Metaphors (Bhenta Katha) */}
              {activeTab === 'proverbs_bhenta' && (
                <SantaliProverbsBhenta />
              )}

              {/* Tab: Traditional Indigenous Agriculture & Seasons */}
              {activeTab === 'agri_seasons' && (
                <SantaliAgriSeasons />
              )}

              {/* Tab: Traditional Barter & Measurement Units */}
              {activeTab === 'traditional_measures' && (
                <SantaliTraditionalMeasures />
              )}

              {/* Tab: Traditional Eco-Architecture & Orak Layout */}
              {activeTab === 'architecture' && (
                <SantaliArchitecture />
              )}

              {/* Tab: Historical Migrations & 12 Ancient Garhs */}
              {activeTab === 'historical_garhs' && (
                <SantaliHistoricalGarhs />
              )}

              {/* Tab: Chadar Badani Traditional Puppetry & Akhra Theater */}
              {activeTab === 'puppetry_theater' && (
                <SantaliPuppetryTheater />
              )}

              {/* Tab: Santali Astronomy & Sky Lore (Ipil ar Bonga Dahar) */}
              {activeTab === 'astronomy_lore' && (
                <SantaliAstronomySkyLore />
              )}

              {/* Tab: Sendra & Lobir Baisi Forest Ethics & High Court */}
              {activeTab === 'sendra_lobir' && (
                <SantaliSendraLobir />
              )}

              {/* Tab: Dhokra Bell-Metal Casting & Kamar Heritage */}
              {activeTab === 'dhokra_art' && (
                <SantaliDhokraArt />
              )}

              {/* Tab: Water Harvesting, Dadi & Slope Farming */}
              {activeTab === 'water_harvesting' && (
                <SantaliWaterHarvesting />
              )}

              {/* Tab: Handloom Weaving & Natural Vegetable Dyeing */}
              {activeTab === 'handloom_weaving' && (
                <SantaliHandloomWeaving />
              )}

              {/* Tab: Cattle Lore, Khuntau Tradition & Ethno-Veterinary */}
              {activeTab === 'livestock_khuntau' && (
                <SantaliLivestockKhuntau />
              )}

              {/* Tab: Woodcraft, Dhenki, Nahel & Sacred Carvings */}
              {activeTab === 'woodcraft_carpentry' && (
                <SantaliWoodcraftCarpentry />
              )}

              {/* Tab: Bamboo Craft, Winnowing Fan & River Traps */}
              {activeTab === 'bamboo_craft' && (
                <SantaliBambooCraft />
              )}

              {/* Tab: 4 Checked Glottal Consonants Studio & Phonetics Lab */}
              {activeTab === 'phonetics_lab' && (
                <SantaliPhoneticsLab />
              )}

              {/* Tab: Traditional Santali Baby Names Directory */}
              {activeTab === 'baby_names' && (
                <SantaliBabyNamesDirectory />
              )}

              {/* Tab: Traditional Silver & Bronze Ornaments */}
              {activeTab === 'ornaments_jewellery' && (
                <SantaliOrnamentsJewellery />
              )}

              {/* Tab: Traditional Blacksmithy & Indigenous Iron Craft */}
              {activeTab === 'blacksmithy_iron' && (
                <SantaliBlacksmithyIronCraft />
              )}

              {/* Tab: 6 Seasons & Weather Lore */}
              {activeTab === 'seasons_weather' && (
                <SantaliSeasonsWeatherLore />
              )}

              {/* Tab: Deep Idioms & Menkatha Sayings */}
              {activeTab === 'idioms_menkatha' && (
                <SantaliIdiomsMenkatha />
              )}

              {/* Tab: Native Herbal Drinks & Sacred Tonics */}
              {activeTab === 'herbal_drinks' && (
                <SantaliTraditionalHerbalDrinks />
              )}

              {/* Tab: Traditional Archery & Word Target Game Simulator */}
              {activeTab === 'archery_simulator' && (
                <SantaliArcheryGameSimulator />
              )}

              {/* Tab: Traditional Cuisine Recipes */}
              {activeTab === 'traditional_cuisine' && (
                <SantaliTraditionalCuisine />
              )}

              {/* Tab: 7 Marriages & 3 Life Samskaras */}
              {activeTab === 'marriage_rituals' && (
                <SantaliMarriageLifeRituals />
              )}

              {/* Tab: Kudum Riddles Game */}
              {activeTab === 'riddles_kudum' && (
                <SantaliRiddlesKudumGame />
              )}

              {/* Tab: Sacred Pilgrimages & Historical Garhs */}
              {activeTab === 'sacred_pilgrimages' && (
                <SantaliSacredPilgrimages />
              )}

              {/* Tab: Spoken Dialogues & Situational Conversations */}
              {activeTab === 'spoken_dialogues' && (
                <SantaliSpokenDialogues />
              )}

              {/* Tab: Formal Letter & Bapla Invitation Templates */}
              {activeTab === 'letter_templates' && (
                <SantaliFormalLetterTemplates />
              )}

              {/* Tab: Illustrated Folk Tales Reader */}
              {activeTab === 'illustrated_stories' && (
                <SantaliIllustratedFolkTales />
              )}

              {/* Tab: Favorites Notebook */}
              {activeTab === 'favorites_notebook' && (
                <SantaliFavoritesNotebook />
              )}

              {/* Tab: Proficiency Exam & Certificate */}
              {activeTab === 'certification' && (
                <SantaliProficiencyCertificate />
              )}

              {/* Tab: Social Card & Poster Studio */}
              {activeTab === 'social_cards' && (
                <SantaliSocialCardStudio />
              )}

              {/* Tab: Lunar Calendar Clock & Festival Countdown */}
              {activeTab === 'lunar_calendar' && (
                <SantaliLunarCalendarClock />
              )}

              {/* Tab: Majhi Pargana Self-Governance */}
              {activeTab === 'governance' && (
                <MajhiParganaSystem />
              )}

              {/* Tab: Santali Grammar & Sentence Builder */}
              {activeTab === 'grammar' && (
                <SantaliGrammarBuilder />
              )}

              {/* Tab: Festive E-Cards & Greetings */}
              {activeTab === 'greetings' && (
                <SantaliGreetingMaker />
              )}

              {/* Tab: Traditional Herbal Medicine & Ethnobotany */}
              {activeTab === 'herbal' && (
                <SantaliHerbalRemedies />
              )}

              {/* Tab: Santali Wordle Game */}
              {activeTab === 'wordle' && (
                <SantaliWordleGame />
              )}

              {/* Tab: Folk Stories & History Audio */}
              {activeTab === 'stories' && (
                <FolkStoriesPlayer />
              )}

              {/* Tab: Pronunciation Speech Coach */}
              {activeTab === 'speech_coach' && (
                <PronunciationCoach />
              )}

              {/* Tab: Universal Voice Speaker & Reader */}
              {activeTab === 'speaker' && (
                <TextSpeakerReader />
              )}

              {/* Tab: Traditional Instruments & Rhythm Pad */}
              {activeTab === 'instruments' && (
                <SantaliInstrumentsPad />
              )}

              {/* Tab: Kinship & Family Tree */}
              {activeTab === 'family_tree' && (
                <SantaliFamilyTree />
              )}

              {/* Tab: Kids Rhymes & Jukebox */}
              {activeTab === 'kids_rhymes' && (
                <SantaliKidsJukebox />
              )}

              {/* Tab: Speaking Clock & Numbers */}
              {activeTab === 'clock_numbers' && (
                <SantaliClockNumbers />
              )}

              {/* Tab: 12 Sacred Clans & Totems */}
              {activeTab === 'clans' && (
                <SantaliClansDirectory />
              )}

              {/* Tab: Sacred Flora & Printable Worksheets */}
              {activeTab === 'flora_worksheets' && (
                <AdivasiFloraWorksheet />
              )}

              {/* Tab: Admin Master CMS & Content Editor */}
              {activeTab === 'admin_cms' && (
                <AdminMasterStudio onClose={() => setActiveTab('home')} initialTab={adminInitialTab} />
              )}

              {/* Tab: Translator */}
              {activeTab === 'translator' && (
                <TranslatorModule
                  initialText={translatorInitialText}
                />
              )}

              {/* Tab: AI Search Assistant (Cloudflare Pages Function /api/ai-chat) */}
              {activeTab === 'ai_assistant' && <AISearchAssistant />}

              {/* Tab: Daily Santali Vocabulary Quiz */}
              {activeTab === 'daily_quiz' && (
                <DailyVocabQuiz
                  onNavigateHome={() => setActiveTab('home')}
                  onExploreInDictionary={() => setActiveTab('dashboard')}
                />
              )}

              {/* Tab: Settings */}
              {activeTab === 'settings' && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs max-w-2xl space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-sky-600" />
                      <span>Hor Katha Suite Preferences</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Configure default script rendering, audio phonetics engine, and admin credentials.
                    </p>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <label className="font-bold text-slate-800 block">Default Input Script</label>
                      <select
                        value={activeScript}
                        onChange={(e) => setActiveScript(e.target.value as ScriptType)}
                        className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 w-full max-w-xs"
                      >
                        <option value="santali">Santali (Roman Santal)</option>
                        <option value="devanagari">Hindi / Santali (देवनागरी)</option>
                        <option value="english">English (Latin)</option>
                      </select>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-800 block">Admin Control Panel</span>
                        <span className="text-slate-500 text-[11px]">
                          {isAdmin ? 'Currently authenticated as Administrator' : 'Access Add/Edit/Delete permissions'}
                        </span>
                      </div>
                      <button
                        onClick={() => setAdminModalOpen(true)}
                        className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg text-xs"
                      >
                        {isAdmin ? 'Manage Admin' : 'Admin Login'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Suspense>
</main>
          </div>
        )}

        {/* MODE 2: Mobile App Simulator */}
        {viewMode === 'mobile_simulator' && (
          <main className="flex-1 w-full py-6">
<Suspense fallback={<ModuleLoader />}>
            <MobileSimulator />
          </Suspense>
</main>
        )}

        {/* MODE 3: Full Presentation Sheet */}
        {viewMode === 'presentation' && (
          <main className="flex-1 w-full p-3 sm:p-5 lg:p-6 overflow-y-auto">
<Suspense fallback={<ModuleLoader />}>
            <PresentationView
              onSelectDesktopModule={(tab) => {
                setActiveTab(tab);
                setViewMode('desktop');
              }}
              onSelectMobileScreen={(screen) => {
                setViewMode('mobile_simulator');
              }}
            />
          </Suspense>
</main>
        )}
      </div>

      {/* Modern Best-in-Class Footer with Exact Extracted Text & Compliance */}
      <Footer
        onOpenAbout={() => setAboutModalOpen(true)}
        onOpenFeedback={() => setFeedbackModalOpen(true)}
        onNavigateTab={(tab) => {
          setActiveTab(tab as any);
          if (viewMode !== 'desktop') setViewMode('desktop');
        }}
        onViewModeChange={(mode) => {
          setViewMode(mode);
        }}
      />

      {/* About BOSC Tech & Edu Modal */}
      <AboutModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
      />

      {/* Admin Login & Control Modal */}
      <AdminLoginModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onOpenCMS={() => {
          setActiveTab('admin_cms');
          if (viewMode !== 'desktop') setViewMode('desktop');
        }}
      />

      {/* Community Feedback Modal with Warm Welcome Message */}
      <FeedbackModal
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
      />

      {/* Global Spotlight Search Modal with Ctrl+K shortcut & keyword highlighting */}
      {searchModalOpen && (
      <Suspense fallback={null}>
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          if (viewMode !== 'desktop') setViewMode('desktop');
        }}
        onSendToTranslator={handleSendToTranslator}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />
      </Suspense>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
}
