import React, { useState, useEffect, lazy, Suspense } from 'react';
import { recordVisit } from './lib/streak';
import { ROUTE_IDS } from './data/routes';

// हर हिस्से का अपना link: /m/<id>
const tabFromPath = (): ActiveDesktopTab => { const m = window.location.pathname.match(/^\/m\/([a-z0-9_]+)\/?$/); return (m && ROUTE_IDS.has(m[1]) ? m[1] : 'home') as ActiveDesktopTab; };
const BASE_TITLE = document.title;

// अक्षर बड़ा/छोटा (बुज़ुर्गों और छोटे फ़ोन के लिए) — पूरी साइट rem पर चलती है
const FONT_STEPS = [100, 112, 125, 140];
const applyFont = (v: number) => { const el = document.documentElement; el.style.fontSize = ''; if (v !== 100) el.style.fontSize = `${(parseFloat(getComputedStyle(el).fontSize) * v) / 100}px`; };
try { applyFont(Number(localStorage.getItem('hk_font')) || 100); } catch { /* ignore */ }
const FontSizeControl: React.FC = () => {
  const [v, setV] = useState<number>(() => { try { return Number(localStorage.getItem('hk_font')) || 100; } catch { return 100; } });
  const set = (n: number) => { setV(n); applyFont(n); try { localStorage.setItem('hk_font', String(n)); } catch { /* ignore */ } };
  const i = FONT_STEPS.indexOf(v) < 0 ? 0 : FONT_STEPS.indexOf(v);
  return (
    <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden text-xs font-black text-slate-700" title="अक्षर का आकार">
      <button aria-label="अक्षर छोटा करें" disabled={i === 0} onClick={() => set(FONT_STEPS[i - 1])} className="px-2.5 py-1.5 hover:bg-slate-100 disabled:opacity-30">अ−</button>
      <button aria-label="अक्षर बड़ा करें" disabled={i === FONT_STEPS.length - 1} onClick={() => set(FONT_STEPS[i + 1])} className="px-2.5 py-1.5 hover:bg-slate-100 border-l border-slate-200 disabled:opacity-30">अ+</button>
    </div>
  );
};
import { openHorKathaAI, OPEN_AI_EVENT } from './components/horKathaAI/shared';
import { OPEN_SUITE_PROMO_EVENT, promoUrlParam } from './components/suitePromo/events';
import { ActiveDesktopTab, GlobalViewMode, ScriptType } from './types';
import { Header } from './components/Header';
// Sidebar सिर्फ़ desktop (md+) पर दिखता है — अलग chunk में, ताकि mobile का main bundle छोटा रहे
const Sidebar = lazy(() => import('./components/Sidebar').then((m) => ({ default: m.Sidebar })));
import { Dashboard } from './components/Dashboard';
import { openExternalKeyboard } from './utils/externalKeyboard';
import type { AdminTab } from './components/AdminMasterStudio';
// Modals are code-split: they load on first open and then stay mounted (state kept like before)
const AboutModal = lazy(() => import('./components/AboutModal').then((m) => ({ default: m.AboutModal })));
const AdminLoginModal = lazy(() => import('./components/AdminLoginModal').then((m) => ({ default: m.AdminLoginModal })));
const FeedbackModal = lazy(() => import('./components/FeedbackModal').then((m) => ({ default: m.FeedbackModal })));
// New AI Studio modules (Nov 2026 export), code-split
const SantaliSerengKaraoke = lazy(() => import('./components/SantaliSerengKaraoke').then((m) => ({ default: m.SantaliSerengKaraoke })));
const SantaliVillageTour = lazy(() => import('./components/SantaliVillageTour').then((m) => ({ default: m.SantaliVillageTour })));
const SantaliWildFoodsNutrition = lazy(() => import('./components/SantaliWildFoodsNutrition').then((m) => ({ default: m.SantaliWildFoodsNutrition })));
const SantaliFolkRadio = lazy(() => import('./components/SantaliFolkRadio').then((m) => ({ default: m.SantaliFolkRadio })));
const SantaliEthnoMedicine = lazy(() => import('./components/SantaliEthnoMedicine').then((m) => ({ default: m.SantaliEthnoMedicine })));
const SantaliMultiScriptConverter = lazy(() => import('./components/SantaliMultiScriptConverter').then((m) => ({ default: m.SantaliMultiScriptConverter })));
const SantaliKidsSoundboard = lazy(() => import('./components/SantaliKidsSoundboard').then((m) => ({ default: m.SantaliKidsSoundboard })));
const SantaliWallpaperStudio = lazy(() => import('./components/SantaliWallpaperStudio').then((m) => ({ default: m.SantaliWallpaperStudio })));
const SantaliClanGenealogy = lazy(() => import('./components/SantaliClanGenealogy').then((m) => ({ default: m.SantaliClanGenealogy })));
const SantaliHaatBarterSimulator = lazy(() => import('./components/SantaliHaatBarterSimulator').then((m) => ({ default: m.SantaliHaatBarterSimulator })));
const SantaliBaplaChantsStudio = lazy(() => import('./components/SantaliBaplaChantsStudio').then((m) => ({ default: m.SantaliBaplaChantsStudio })));
const SantaliBirdLoreEthnoOrnithology = lazy(() => import('./components/SantaliBirdLoreEthnoOrnithology').then((m) => ({ default: m.SantaliBirdLoreEthnoOrnithology })));
const SantaliGodnaBodyArt = lazy(() => import('./components/SantaliGodnaBodyArt').then((m) => ({ default: m.SantaliGodnaBodyArt })));
const SantaliIndigenousSeedsHeirloom = lazy(() => import('./components/SantaliIndigenousSeedsHeirloom').then((m) => ({ default: m.SantaliIndigenousSeedsHeirloom })));
const SantaliGreetingsEtiquetteSimulator = lazy(() => import('./components/SantaliGreetingsEtiquetteSimulator').then((m) => ({ default: m.SantaliGreetingsEtiquetteSimulator })));
const SantaliInstrumentsOrchestra = lazy(() => import('./components/SantaliInstrumentsOrchestra').then((m) => ({ default: m.SantaliInstrumentsOrchestra })));
const SantaliBoneSettingHealing = lazy(() => import('./components/SantaliBoneSettingHealing').then((m) => ({ default: m.SantaliBoneSettingHealing })));
const SantaliLoBirCourtSimulator = lazy(() => import('./components/SantaliLoBirCourtSimulator').then((m) => ({ default: m.SantaliLoBirCourtSimulator })));
const SantaliOlChikiPenmanshipWorkbook = lazy(() => import('./components/SantaliOlChikiPenmanshipWorkbook').then((m) => ({ default: m.SantaliOlChikiPenmanshipWorkbook })));
const SantaliHandiFermentationLore = lazy(() => import('./components/SantaliHandiFermentationLore').then((m) => ({ default: m.SantaliHandiFermentationLore })));
const SantaliIpilConstellationsAstronomy = lazy(() => import('./components/SantaliIpilConstellationsAstronomy').then((m) => ({ default: m.SantaliIpilConstellationsAstronomy })));
const SantaliNahelDhenkiCraft = lazy(() => import('./components/SantaliNahelDhenkiCraft').then((m) => ({ default: m.SantaliNahelDhenkiCraft })));
const SantaliIndigenousSportsKati = lazy(() => import('./components/SantaliIndigenousSportsKati').then((m) => ({ default: m.SantaliIndigenousSportsKati })));
const SantaliTraditionalFishingCraft = lazy(() => import('./components/SantaliTraditionalFishingCraft').then((m) => ({ default: m.SantaliTraditionalFishingCraft })));
const SantaliNaturalPigmentsCraft = lazy(() => import('./components/SantaliNaturalPigmentsCraft').then((m) => ({ default: m.SantaliNaturalPigmentsCraft })));
const SantaliBanamTamakLuthier = lazy(() => import('./components/SantaliBanamTamakLuthier').then((m) => ({ default: m.SantaliBanamTamakLuthier })));
const SantaliJaherGroveEcology = lazy(() => import('./components/SantaliJaherGroveEcology').then((m) => ({ default: m.SantaliJaherGroveEcology })));
const SantaliCustomaryOathsJustice = lazy(() => import('./components/SantaliCustomaryOathsJustice').then((m) => ({ default: m.SantaliCustomaryOathsJustice })));
const SantaliSasandiriMegalithicLore = lazy(() => import('./components/SantaliSasandiriMegalithicLore').then((m) => ({ default: m.SantaliSasandiriMegalithicLore })));
const SantaliIndigenousMathGeometry = lazy(() => import('./components/SantaliIndigenousMathGeometry').then((m) => ({ default: m.SantaliIndigenousMathGeometry })));
const SantaliWildHoneyHarvesting = lazy(() => import('./components/SantaliWildHoneyHarvesting').then((m) => ({ default: m.SantaliWildHoneyHarvesting })));
const SantaliAnimalBehaviorOmens = lazy(() => import('./components/SantaliAnimalBehaviorOmens').then((m) => ({ default: m.SantaliAnimalBehaviorOmens })));
const SantaliTextileDyesBlockPrint = lazy(() => import('./components/SantaliTextileDyesBlockPrint').then((m) => ({ default: m.SantaliTextileDyesBlockPrint })));
const ExamPrepSantali = lazy(() => import('./components/knowledge/ExamPrepSantali'));
const TribalSchemes = lazy(() => import('./components/knowledge/TribalSchemes'));
const SantaliLiterature = lazy(() => import('./components/knowledge/SantaliLiterature'));
const SantaliNewsEvents = lazy(() => import('./components/knowledge/SantaliNewsEvents'));
const SantalHulHistory = lazy(() => import('./components/knowledge/SantalHulHistory'));
const SantaliPersonalities = lazy(() => import('./components/knowledge/SantaliPersonalities'));
const SantaliInNumbers = lazy(() => import('./components/knowledge/SantaliInNumbers'));
const TribalRightsLaws = lazy(() => import('./components/knowledge/TribalRightsLaws'));
const SantaliStudyCareer = lazy(() => import('./components/knowledge/SantaliStudyCareer'));
const SantaliBooksMedia = lazy(() => import('./components/knowledge/SantaliBooksMedia'));
const ReaderSubmissions = lazy(() => import('./components/knowledge/ReaderSubmissions'));
const TeacherCorner = lazy(() => import('./components/knowledge/TeacherCorner'));
const MyProgress = lazy(() => import('./components/knowledge/MyProgress'));
const WordGame = lazy(() => import('./components/knowledge/WordGame'));
const HealthInfo = lazy(() => import('./components/knowledge/HealthInfo'));
const CommunityBoard = lazy(() => import('./components/knowledge/CommunityBoard'));
const ShareCards = lazy(() => import('./components/knowledge/ShareCards'));
const Newsletter = lazy(() => import('./components/knowledge/Newsletter'));
const QandA = lazy(() => import('./components/knowledge/QandA'));
const JobBoard = lazy(() => import('./components/knowledge/JobBoard'));
const SantaliMidwiferyCareLore = lazy(() => import('./components/SantaliMidwiferyCareLore').then((m) => ({ default: m.SantaliMidwiferyCareLore })));
const PwaInstallPrompt = lazy(() => import('./components/PwaInstallPrompt').then((m) => ({ default: m.PwaInstallPrompt })));
import { Footer } from './components/Footer';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { Settings, ArrowLeft, Home, ShieldCheck, KeyRound, CheckCircle2, Lock, Sparkles, Edit3 } from 'lucide-react';

const DictionaryModule = lazy(() => import('./components/DictionaryModule').then((m) => ({ default: m.DictionaryModule })));
const LearnModule = lazy(() => import('./components/LearnModule').then((m) => ({ default: m.LearnModule })));
const SantaliSocialCardStudio = lazy(() => import('./components/SantaliSocialCardStudio').then((m) => ({ default: m.SantaliSocialCardStudio })));
const SantaliLunarCalendarClock = lazy(() => import('./components/SantaliLunarCalendarClock').then((m) => ({ default: m.SantaliLunarCalendarClock })));
const EducationalLDPPage = lazy(() => import('./components/EducationalLDP'));
const QuizIQTest = lazy(() => import('./components/QuizIQTest').then((m) => ({ default: m.QuizIQTest })));
// Floating "Hor Katha AI सहायक" (EDISAM floating assistant port) — the site's only AI button
const HorKathaAIWidget = lazy(() => import('./components/horKathaAI/HorKathaAIWidget'));
const LiveContentEditor = lazy(() => import('./components/cms/LiveContentEditor').then((m) => ({ default: m.LiveContentEditor })));
const SuitePromoController = lazy(() => import('./components/suitePromo/SuitePromoController'));
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

/** true from the first time `flag` is true (lazy-mount a modal on first open, then keep it mounted) */
function useOpenedOnce(flag: boolean) {
  const [opened, setOpened] = useState(flag);
  if (flag && !opened) setOpened(true);
  return opened || flag;
}

// After first load, when the browser is idle, warm the most-used tabs (Dictionary, LDP, Quiz) so they open
// instantly. Skipped on Save-Data / 2G connections so it never competes with first load on slow networks.
function prefetchCommonTabsOnIdle() {
  const nav = navigator as any;
  const conn = nav.connection;
  if (conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ''))) return () => {};
  const w = window as any;
  const ric = (cb: () => void) => (w.requestIdleCallback ? w.requestIdleCallback(cb, { timeout: 8000 }) : setTimeout(cb, 3000));
  const loaders = [
    () => import('./components/DictionaryModule'),
    () => import('./components/EducationalLDP'),
    () => import('./components/QuizIQTest'),
  ];
  let cancelled = false;
  // low-end phones (html.lite): wait longer so warming never overlaps the first interactions
  const lite = document.documentElement.classList.contains('lite');
  const timer = setTimeout(() => {
    const next = () => {
      const load = loaders.shift();
      if (!load || cancelled) return;
      ric(() => { if (!cancelled) load().catch(() => {}).finally(next); });
    };
    next();
  }, lite ? 9000 : 4000);
  return () => { cancelled = true; clearTimeout(timer); };
}

const ModuleLoader = () => (
  <div className="flex items-center justify-center py-20 text-sm text-slate-500">Loading…</div>
);

/** true while the viewport is at least Tailwind's `md` width (the desktop sidebar is display:none below it) */
function useIsMdUp() {
  const query = '(min-width: 768px)';
  const [md, setMd] = useState(() => typeof window === 'undefined' || !window.matchMedia || window.matchMedia(query).matches);
  useEffect(() => { recordVisit(); }, []);
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia(query);
    const on = () => setMd(mq.matches);
    on();
    mq.addEventListener ? mq.addEventListener('change', on) : mq.addListener(on);
    return () => { mq.removeEventListener ? mq.removeEventListener('change', on) : mq.removeListener(on); };
  }, []);
  return md;
}

function AppContent() {
  // phones never show the desktop sidebar: skip building its ~100 links there
  const isMdUp = useIsMdUp();
  const [viewMode, setViewMode] = useState<GlobalViewMode>('desktop');
  const [activeTab, setActiveTabRaw] = useState<ActiveDesktopTab>(tabFromPath);
  useEffect(() => {
    const onPop = () => setActiveTabRaw(tabFromPath());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  useEffect(() => {
    const routed = ROUTE_IDS.has(activeTab as string);
    const want = routed ? `/m/${activeTab}` : '/';
    if (window.location.pathname !== want && (routed || activeTab === 'home')) window.history.pushState(null, '', want + window.location.hash);
    if (!routed) { document.title = BASE_TITLE; return; }
    let live = true;
    import('./data/routeTitles').then(({ ROUTE_TITLES }) => { if (live) document.title = `${ROUTE_TITLES[activeTab as string]} — HorKathaSantali`; }).catch(() => {});
    return () => { live = false; };
  }, [activeTab]);
  // "Keyboard" opens Hor Katha Suite (horkathasuite.pages.dev) instead of an in-app keyboard
  const setActiveTab = (tab: ActiveDesktopTab | ((prev: ActiveDesktopTab) => ActiveDesktopTab)) => {
    if (tab === 'keyboard') { openExternalKeyboard(); return; }
    // The AI assistant is the floating widget now: open it instead of switching tabs
    if (tab === 'ai_assistant') { openHorKathaAI(); return; }
    setActiveTabRaw(tab as any);
  };
  const [activeScript, setActiveScript] = useState<ScriptType>('roman');
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [translatorInitialText, setTranslatorInitialText] = useState('');
  const [adminInitialTab, setAdminInitialTab] = useState<AdminTab>('hero');

  const { isAdmin } = useAdmin();
  const aboutMounted = useOpenedOnce(aboutModalOpen);
  const adminMounted = useOpenedOnce(adminModalOpen);
  const feedbackMounted = useOpenedOnce(feedbackModalOpen);

  useEffect(() => prefetchCommonTabsOnIdle(), []);

  // Floating AI bubble (and its animation library) mounts once the browser is idle after first paint,
  // or immediately when something asks to open the assistant.
  const [aiWidgetMounted, setAiWidgetMounted] = useState(false);
  useEffect(() => {
    if (aiWidgetMounted) return;
    const mount = () => setAiWidgetMounted(true);
    window.addEventListener(OPEN_AI_EVENT, mount);
    const w = window as any;
    const handle = w.requestIdleCallback ? w.requestIdleCallback(mount, { timeout: 2500 }) : setTimeout(mount, 1200);
    return () => {
      window.removeEventListener(OPEN_AI_EVENT, mount);
      if (w.cancelIdleCallback) w.cancelIdleCallback(handle); else clearTimeout(handle);
    };
  }, [aiWidgetMounted]);

  // Hor Katha Suite showcase (corner card + full popup): own lazy chunk, mounted well after idle,
  // or right away when something asks to open it (Dashboard card, ?promo=1 / ?promo=card).
  const [suitePromoMounted, setSuitePromoMounted] = useState(() => !!promoUrlParam());
  useEffect(() => {
    if (suitePromoMounted) return;
    const mount = () => setSuitePromoMounted(true);
    window.addEventListener(OPEN_SUITE_PROMO_EVENT, mount);
    const w = window as any;
    let handle: any;
    const timer = setTimeout(() => {
      handle = w.requestIdleCallback ? w.requestIdleCallback(mount, { timeout: 10000 }) : setTimeout(mount, 1000);
    }, 15000);
    return () => {
      window.removeEventListener(OPEN_SUITE_PROMO_EVENT, mount);
      clearTimeout(timer);
      if (handle !== undefined) { if (w.cancelIdleCallback) w.cancelIdleCallback(handle); else clearTimeout(handle); }
    };
  }, [suitePromoMounted]);
  const suitePromoBlocked =
    aboutModalOpen || adminModalOpen || feedbackModalOpen || searchModalOpen ||
    viewMode !== 'desktop' || /quiz|test|exam|educational|certificate|wordle/i.test(String(activeTab));

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
      case 'sereng_karaoke': return 'songs';
      case 'village_tour': return 'governance';
      case 'wild_foods': return 'cuisine';
      case 'festival_cards':
      case 'greetings': return 'calendar';
      case 'folk_radio': return 'songs';
      case 'ethno_medicine': return 'herbal';
      case 'script_converter': return 'hero';
      case 'kids_soundboard': return 'hero';
      case 'wallpaper_studio': return 'sohrai_art';
      case 'clan_genealogy': return 'clans';
      case 'haat_barter': return 'traditional_measures';
      case 'bapla_chants': return 'bapla';
      case 'bird_lore': return 'herbal';
      case 'godna_body_art': return 'attire';
      case 'heirloom_seeds': return 'agri_seasons';
      case 'kinship_etiquette': return 'governance';
      case 'instruments_orchestra': return 'songs';
      case 'bone_setting_healing': return 'herbal';
      case 'lo_bir_court': return 'governance';
      case 'calligraphy_workbook': return 'hero';
      case 'handi_fermentation_lore': return 'herbal';
      case 'ipil_astronomy': return 'astronomy_lore';
      case 'nahel_dhenki_craft': return 'woodcraft_carpentry';
      case 'indigenous_sports_kati': return 'sports';
      case 'traditional_fishing_craft': return 'herbal';
      case 'natural_pigments_craft': return 'attire';
      case 'banam_tamak_luthier': return 'songs';
      case 'jaher_sacred_grove_ecology': return 'bonga_buru';
      case 'customary_oaths_justice': return 'governance';
      case 'sasandiri_megalithic_lore': return 'pilgrimage';
      case 'indigenous_math_geometry': return 'woodcraft_carpentry';
      case 'wild_honey_harvesting': return 'herbal';
      case 'animal_behavior_omens': return 'astronomy_lore';
      case 'indigenous_textile_dyes': return 'attire';
      case 'indigenous_midwifery_care': return 'herbal';
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

      {/* PWA Offline & Install Promotion Manager */}
      <Suspense fallback={null}>
        <PwaInstallPrompt />
      </Suspense>

      {/* Main Viewport Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* MODE 1: Desktop Suite */}
        {viewMode === 'desktop' && (
          <div className="flex-1 flex w-full">
            {/* Desktop Left Sidebar (Hideable / Toggleable) */}
            {sidebarOpen && isMdUp && (
              <div className="hidden md:block">
                <Suspense fallback={<aside className="w-64 bg-white border-r border-slate-200/90 shrink-0 h-[calc(100vh-53px)] sticky top-[53px]" aria-hidden="true" />}>
                <Sidebar
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  onOpenAbout={() => setAboutModalOpen(true)}
                  onOpenHelp={() => setAboutModalOpen(true)}
                  onOpenFeedback={() => setFeedbackModalOpen(true)}
                  onToggleSidebar={() => setSidebarOpen(false)}
                />
                </Suspense>
              </div>
            )}

            {/* Desktop Main Content Workspace */}
            <main data-hk-scope={activeTab} className={`flex-1 p-3 sm:p-5 lg:p-6 overflow-y-auto max-w-full transition-all duration-200 ${
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
                  <div className="flex items-center gap-2">
                    <FontSizeControl />
                    {ROUTE_IDS.has(activeTab as string) && (
                      <button onClick={() => { const u = `${window.location.origin}/m/${activeTab}`; if ((navigator as any).share) (navigator as any).share({ title: document.title, url: u }).catch(() => {}); else navigator.clipboard?.writeText(u).then(() => alert('Link copy हो गया')); }} title="इस पेज का link शेयर करें" className="text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 hover:bg-sky-50">🔗 Link</button>
                    )}
                    <div className="hidden sm:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      <span className="w-2 h-2 rounded-full bg-sky-500" />
                      <span>{activeTab} module</span>
                    </div>
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

              {/* Tab: LDP — Live Practice Centre (ported from EDISAM) */}
              {activeTab === 'educational' && (
                <EducationalLDPPage />
              )}

              {/* Tab: Quiz / IQ Test (ported from EDISAM) */}
              {activeTab === 'quiz' && (
                <QuizIQTest />
              )}

              {/* Tab: Majhi Pargana Self-Governance */}
              {activeTab === 'governance' && (
                <MajhiParganaSystem />
              )}

              {/* Tab: Santali Grammar & Sentence Builder */}
              {activeTab === 'grammar' && (
                <SantaliGrammarBuilder />
              )}

              {/* Tab: Festive E-Cards & WhatsApp Greetings */}
              {(activeTab === 'greetings' || activeTab === 'festival_cards') && (
                <SantaliGreetingMaker />
              )}

              {/* Tab: Santali Folk Song Karaoke & Rhythm Studio */}
              {activeTab === 'sereng_karaoke' && (
                <SantaliSerengKaraoke />
              )}

              {/* Tab: Virtual Village Tour & Sacred Geography */}
              {activeTab === 'village_tour' && (
                <SantaliVillageTour />
              )}

              {/* Tab: Wild Foods, Leafy Greens & Indigenous Nutrition */}
              {activeTab === 'wild_foods' && (
                <SantaliWildFoodsNutrition />
              )}

              {/* Tab: Santali Folk Radio & Ambient Story Studio */}
              {activeTab === 'folk_radio' && (
                <SantaliFolkRadio />
              )}

              {/* Tab: Santali Ethno-Medicine & Emergency First Aid */}
              {activeTab === 'ethno_medicine' && (
                <SantaliEthnoMedicine />
              )}

              {/* Tab: Multi-Script Converter (Ol Chiki, Devanagari, Roman) */}
              {activeTab === 'script_converter' && (
                <SantaliMultiScriptConverter />
              )}

              {/* Tab: Kids Interactive Soundboard & Sound Quiz */}
              {activeTab === 'kids_soundboard' && (
                <SantaliKidsSoundboard />
              )}

              {/* Tab: 9:16 Mobile Wallpaper & Status Studio */}
              {activeTab === 'wallpaper_studio' && (
                <SantaliWallpaperStudio />
              )}

              {/* Tab: Clan & Family Heritage Archive */}
              {activeTab === 'clan_genealogy' && (
                <SantaliClanGenealogy />
              )}

              {/* Tab: Village Haat & Barter Simulator */}
              {activeTab === 'haat_barter' && (
                <SantaliHaatBarterSimulator />
              )}

              {/* Tab: Wedding Chants & Bapla Rituals Studio */}
              {activeTab === 'bapla_chants' && (
                <SantaliBaplaChantsStudio />
              )}

              {/* Tab: Bird Lore & Ethno-Ornithology */}
              {activeTab === 'bird_lore' && (
                <SantaliBirdLoreEthnoOrnithology />
              )}

              {/* Tab: Traditional Body Art, Sika & Godna */}
              {activeTab === 'godna_body_art' && (
                <SantaliGodnaBodyArt />
              )}

              {/* Tab: Indigenous Heirloom Seeds & Bandhi */}
              {activeTab === 'heirloom_seeds' && (
                <SantaliIndigenousSeedsHeirloom />
              )}

              {/* Tab: Kinship Greetings & Sacred Etiquette */}
              {activeTab === 'kinship_etiquette' && (
                <SantaliGreetingsEtiquetteSimulator />
              )}

              {/* Tab: Instruments Orchestra Sequencer */}
              {activeTab === 'instruments_orchestra' && (
                <SantaliInstrumentsOrchestra />
              )}

              {/* Tab: Indigenous Bone Setting & Herbal Trauma */}
              {activeTab === 'bone_setting_healing' && (
                <SantaliBoneSettingHealing />
              )}

              {/* Tab: Lo Bir Baisi Supreme Court */}
              {activeTab === 'lo_bir_court' && (
                <SantaliLoBirCourtSimulator />
              )}

              {/* Tab: Ol Chiki Penmanship & Calligraphy Workbook */}
              {activeTab === 'calligraphy_workbook' && (
                <SantaliOlChikiPenmanshipWorkbook />
              )}

              {/* Tab: Handi Fermentation Science & Sacred Lore */}
              {activeTab === 'handi_fermentation_lore' && (
                <SantaliHandiFermentationLore />
              )}

              {/* Tab: Ipil Constellations & Sky Lore */}
              {activeTab === 'ipil_astronomy' && (
                <SantaliIpilConstellationsAstronomy />
              )}

              {/* Tab: Nahel, Dhenki & Woodcraft Architecture */}
              {activeTab === 'nahel_dhenki_craft' && (
                <SantaliNahelDhenkiCraft />
              )}

              {/* Tab: Indigenous Sports & Kati Enech */}
              {activeTab === 'indigenous_sports_kati' && (
                <SantaliIndigenousSportsKati />
              )}

              {/* Tab: Traditional Fishing Traps & Craft */}
              {activeTab === 'traditional_fishing_craft' && (
                <SantaliTraditionalFishingCraft />
              )}

              {/* Tab: Natural Pigments & Earth Alchemy */}
              {activeTab === 'natural_pigments_craft' && (
                <SantaliNaturalPigmentsCraft />
              )}

              {/* Tab: Banam & Tamak Luthier Craft */}
              {activeTab === 'banam_tamak_luthier' && (
                <SantaliBanamTamakLuthier />
              )}

              {/* Tab: Jaher Sacred Grove Ecology */}
              {activeTab === 'jaher_sacred_grove_ecology' && (
                <SantaliJaherGroveEcology />
              )}

              {/* Tab: Customary Oaths & Restorative Justice */}
              {activeTab === 'customary_oaths_justice' && (
                <SantaliCustomaryOathsJustice />
              )}

              {/* Tab: Sasandiri & Megalithic Memorials */}
              {activeTab === 'sasandiri_megalithic_lore' && (
                <SantaliSasandiriMegalithicLore />
              )}

              {/* Tab: Indigenous Mathematics & Chala Geometry */}
              {activeTab === 'indigenous_math_geometry' && (
                <SantaliIndigenousMathGeometry />
              )}

              {/* Tab: Wild Honey Harvesting Lore */}
              {activeTab === 'wild_honey_harvesting' && (
                <SantaliWildHoneyHarvesting />
              )}

              {/* Tab: Animal Behavior & Bioacoustics */}
              {activeTab === 'animal_behavior_omens' && (
                <SantaliAnimalBehaviorOmens />
              )}

              {/* Tab: Textile Dyes & Block Print Studio */}
              {activeTab === 'indigenous_textile_dyes' && (
                <SantaliTextileDyesBlockPrint />
              )}

              {/* Tab: Indigenous Midwifery & Infant Care */}
              {activeTab === 'indigenous_midwifery_care' && (
                <SantaliMidwiferyCareLore />
              )}
              {activeTab === 'santali_exam_prep' && <ExamPrepSantali />}
              {activeTab === 'tribal_schemes' && <TribalSchemes />}
              {activeTab === 'santali_literature' && <SantaliLiterature />}
              {activeTab === 'santali_news_events' && <SantaliNewsEvents />}
              {activeTab === 'santal_hul_history' && <SantalHulHistory />}
              {activeTab === 'santali_personalities' && <SantaliPersonalities />}
              {activeTab === 'santali_in_numbers' && <SantaliInNumbers />}
              {activeTab === 'tribal_rights_laws' && <TribalRightsLaws />}
              {activeTab === 'santali_study_career' && <SantaliStudyCareer />}
              {activeTab === 'santali_books_media' && <SantaliBooksMedia />}
              {activeTab === 'reader_submissions' && <ReaderSubmissions />}
              {activeTab === 'teacher_corner' && <TeacherCorner />}
              {activeTab === 'my_progress' && <MyProgress />}
              {activeTab === 'word_game' && <WordGame />}
              {activeTab === 'health_info' && <HealthInfo />}
              {activeTab === 'community_board' && <CommunityBoard />}
              {activeTab === 'share_cards' && <ShareCards />}
              {activeTab === 'newsletter' && <Newsletter />}
              {activeTab === 'qa_board' && <QandA />}
              {activeTab === 'job_board' && <JobBoard />}

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
                if (screen === 'keyboard') { openExternalKeyboard(); return; }
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

      <Suspense fallback={null}>
        {/* About BOSC Tech & Edu Modal */}
        {aboutMounted && (
          <AboutModal
            isOpen={aboutModalOpen}
            onClose={() => setAboutModalOpen(false)}
          />
        )}

        {/* Admin Login & Control Modal */}
        {adminMounted && (
          <AdminLoginModal
            isOpen={adminModalOpen}
            onClose={() => setAdminModalOpen(false)}
            onOpenCMS={() => {
              setActiveTab('admin_cms');
              if (viewMode !== 'desktop') setViewMode('desktop');
            }}
          />
        )}

        {/* Community Feedback Modal with Warm Welcome Message */}
        {feedbackMounted && (
          <FeedbackModal
            isOpen={feedbackModalOpen}
            onClose={() => setFeedbackModalOpen(false)}
          />
        )}
      </Suspense>

      {/* Live Content Editor: server के बदलाव सब पर लागू; Admin/Operator के लिए Edit Mode */}
      {aiWidgetMounted && (
        <Suspense fallback={null}>
          <LiveContentEditor />
        </Suspense>
      )}

      {/* Floating Hor Katha AI सहायक (chat via /api/ai-chat + local site search) */}
      {aiWidgetMounted && (
      <Suspense fallback={null}>
        <HorKathaAIWidget
          onNavigateTab={(tab) => {
            setActiveTab(tab);
            if (viewMode !== 'desktop') setViewMode('desktop');
          }}
        />
      </Suspense>
      )}

      {/* Hor Katha Suite showcase: golden corner card (bottom-left) + full popup */}
      {suitePromoMounted && (
      <Suspense fallback={null}>
        <SuitePromoController blocked={suitePromoBlocked} />
      </Suspense>
      )}

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
