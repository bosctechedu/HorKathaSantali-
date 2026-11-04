import React, { useState } from 'react';
import { MobileScreen, ScriptType } from '../types';
import { CulturalTree } from './CulturalTree';
import { openExternalKeyboard } from '../utils/externalKeyboard';
import { DictionaryModule } from './DictionaryModule';
import { LearnModule } from './LearnModule';
import { TranslatorModule } from './TranslatorModule';
import { DailyVocabQuiz } from './DailyVocabQuiz';
import { SantaliPhrasebook } from './SantaliPhrasebook';
import { SantaliFlashcards } from './SantaliFlashcards';
import { CalligraphyStudio } from './CalligraphyStudio';
import { KudumProverbs } from './KudumProverbs';
import { CulturalCalendar } from './CulturalCalendar';
import { SantaliWordleGame } from './SantaliWordleGame';
import { FolkStoriesPlayer } from './FolkStoriesPlayer';
import { PronunciationCoach } from './PronunciationCoach';
import { TextSpeakerReader } from './TextSpeakerReader';
import { SantaliInstrumentsPad } from './SantaliInstrumentsPad';
import { SantaliFamilyTree } from './SantaliFamilyTree';
import { SantaliKidsJukebox } from './SantaliKidsJukebox';
import { SantaliClockNumbers } from './SantaliClockNumbers';
import { SantaliClansDirectory } from './SantaliClansDirectory';
import { AdivasiFloraWorksheet } from './AdivasiFloraWorksheet';
import { MajhiParganaSystem } from './MajhiParganaSystem';
import { SantaliGrammarBuilder } from './SantaliGrammarBuilder';
import { SantaliGreetingMaker } from './SantaliGreetingMaker';
import { SantaliHerbalRemedies } from './SantaliHerbalRemedies';
import { SantaliCreationMyth } from './SantaliCreationMyth';
import { SantaliDancesTop10 } from './SantaliDancesTop10';
import { SantaliBongaBuruTop15 } from './SantaliBongaBuruTop15';
import { SantaliAttireOrnaments } from './SantaliAttireOrnaments';
import { SantaliMarriageBapla } from './SantaliMarriageBapla';
import { SanthalHulHeroes } from './SanthalHulHeroes';
import { SantaliCuisineRecipes } from './SantaliCuisineRecipes';
import { SantaliTraditionalSports } from './SantaliTraditionalSports';
import { SantaliFolkSongsArchive } from './SantaliFolkSongsArchive';
import { SantaliPilgrimageSites } from './SantaliPilgrimageSites';
import { SantaliLifeRites } from './SantaliLifeRites';
import { SohraiMuralArt } from './SohraiMuralArt';
import { SantaliProverbsBhenta } from './SantaliProverbsBhenta';
import { SantaliAgriSeasons } from './SantaliAgriSeasons';
import { SantaliTraditionalMeasures } from './SantaliTraditionalMeasures';
import { SantaliArchitecture } from './SantaliArchitecture';
import { SantaliHistoricalGarhs } from './SantaliHistoricalGarhs';
import { SantaliPuppetryTheater } from './SantaliPuppetryTheater';
import { SantaliAstronomySkyLore } from './SantaliAstronomySkyLore';
import { SantaliSendraLobir } from './SantaliSendraLobir';
import { SantaliDhokraArt } from './SantaliDhokraArt';
import { SantaliWaterHarvesting } from './SantaliWaterHarvesting';
import { SantaliHandloomWeaving } from './SantaliHandloomWeaving';
import { SantaliLivestockKhuntau } from './SantaliLivestockKhuntau';
import { SantaliWoodcraftCarpentry } from './SantaliWoodcraftCarpentry';
import { SantaliBambooCraft } from './SantaliBambooCraft';
import { SantaliPhoneticsLab } from './SantaliPhoneticsLab';
import { SantaliBabyNamesDirectory } from './SantaliBabyNamesDirectory';
import { SantaliOrnamentsJewellery } from './SantaliOrnamentsJewellery';
import { SantaliBlacksmithyIronCraft } from './SantaliBlacksmithyIronCraft';
import { SantaliSeasonsWeatherLore } from './SantaliSeasonsWeatherLore';
import { SantaliIdiomsMenkatha } from './SantaliIdiomsMenkatha';
import { SantaliTraditionalHerbalDrinks } from './SantaliTraditionalHerbalDrinks';
import { SantaliArcheryGameSimulator } from './SantaliArcheryGameSimulator';
import { SantaliTraditionalCuisine } from './SantaliTraditionalCuisine';
import { SantaliMarriageLifeRituals } from './SantaliMarriageLifeRituals';
import { SantaliRiddlesKudumGame } from './SantaliRiddlesKudumGame';
import { SantaliSacredPilgrimages } from './SantaliSacredPilgrimages';
import { SantaliSpokenDialogues } from './SantaliSpokenDialogues';
import { SantaliFormalLetterTemplates } from './SantaliFormalLetterTemplates';
import { SantaliIllustratedFolkTales } from './SantaliIllustratedFolkTales';
import { SantaliFavoritesNotebook } from './SantaliFavoritesNotebook';
import { SantaliProficiencyCertificate } from './SantaliProficiencyCertificate';
import { SANTALI_DICTIONARY } from '../data/santaliData';
import { useAdmin } from '../context/AdminContext';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  GraduationCap,
  Flame,
  User,
  Check,
  Search,
  Volume2,
  Share2,
  Copy,
  Keyboard as KeyboardIcon,
  BookOpen,
  Camera,
  Languages,
  Smartphone,
  ArrowRight,
  Wifi,
  Battery,
  Signal,
  Globe,
  Calendar
} from 'lucide-react';

export const MobileSimulator: React.FC = () => {
  const { heroConfig } = useAdmin();
  const [currentScreen, setCurrentScreenRaw] = useState<MobileScreen>('home');
  // Keyboard opens Hor Katha Suite (horkathasuite.pages.dev)
  const setCurrentScreen = (screen: MobileScreen) => {
    if (screen === 'keyboard') { openExternalKeyboard(); return; }
    setCurrentScreenRaw(screen);
  };
  const [selectedScript, setSelectedScript] = useState<ScriptType>('roman');

  const screens: { id: MobileScreen; label: string }[] = [
    { id: 'splash', label: '1. Splash Screen' },
    { id: 'language', label: '2. Language Selection' },
    { id: 'home', label: '3. Home Dashboard' },
    { id: 'keyboard', label: '4. Santali Keyboard' },
    { id: 'dictionary', label: '5. Dictionary' },
    { id: 'calendar', label: '6. Cultural Festivals (पर्व)' },
    { id: 'learn', label: '7. Learn Santali Devanagari' },
    { id: 'phrasebook', label: '8. Spoken Phrasebook' },
    { id: 'flashcards', label: '9. Flashcards' },
    { id: 'calligraphy', label: '11. Calligraphy & Posters' },
    { id: 'kudum', label: '12. Kudum & Riddles' },
    { id: 'calendar', label: '13. Cultural Calendar' },
    { id: 'wordle', label: '14. Wordle Game' },
    { id: 'stories', label: '15. Folk Stories Audio' },
    { id: 'speech_coach', label: '16. Pronunciation Coach' },
    { id: 'speaker', label: '17. Voice Speaker & Reader' },
    { id: 'instruments', label: '18. Instruments Pad' },
    { id: 'family_tree', label: '19. Kinship & Family Tree' },
    { id: 'kids_rhymes', label: '20. Kids Rhymes Jukebox' },
    { id: 'clock_numbers', label: '21. Speaking Clock & Numbers' },
    { id: 'clans', label: '22. 12 Sacred Clans' },
    { id: 'sohrai_art', label: '24. Sohrai Mural Art' },
    { id: 'proverbs_bhenta', label: '25. Proverbs (भेंता काथा)' },
    { id: 'agri_seasons', label: '26. Traditional Agriculture' },
    { id: 'traditional_measures', label: '27. Traditional Measures' },
    { id: 'architecture', label: '28. Traditional Architecture' },
    { id: 'historical_garhs', label: '29. 12 Historical Garhs' },
    { id: 'puppetry_theater', label: '30. Chadar Badani Puppetry' },
    { id: 'astronomy_lore', label: '31. Astronomy & Sky Lore' },
    { id: 'baby_names', label: '32. Baby Names Directory' },
    { id: 'ornaments_jewellery', label: '33. Ornaments & Jewellery' },
    { id: 'blacksmithy_iron', label: '34. Iron Blacksmithy Craft' },
    { id: 'seasons_weather', label: '35. 6 Seasons & Weather Lore' },
    { id: 'idioms_menkatha', label: '36. Santali Idioms (Menkatha)' },
    { id: 'herbal_drinks', label: '37. Herbal Drinks & Tonics' },
    { id: 'archery_simulator', label: '38. Ak-Sar Archery Simulator' },
    { id: 'traditional_cuisine', label: '39. Traditional Cuisine & Recipes' },
    { id: 'marriage_rituals', label: '40. 7 Marriages & Life Rites' },
    { id: 'riddles_kudum', label: '41. Kudum Folk Riddles Game' },
    { id: 'sacred_pilgrimages', label: '42. Sacred Pilgrimages & Garhs' },
    { id: 'spoken_dialogues', label: '43. Spoken Dialogues (हाट-बाजार)' },
    { id: 'letter_templates', label: '44. Formal Letter Templates' },
    { id: 'illustrated_stories', label: '45. Illustrated Folk Tales' },
    { id: 'favorites_notebook', label: '46. इञाक् साकाम (Favorites Notebook)' },
    { id: 'translator', label: '47. Translator' },
    { id: 'daily_quiz', label: '48. Daily Vocab Quiz' },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4">
      {/* Screen selector pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-4 mb-2 text-xs">
        {screens.map((screen) => (
          <button
            key={screen.id}
            onClick={() => setCurrentScreen(screen.id)}
            className={`px-3 py-1.5 rounded-xl border whitespace-nowrap transition-all font-medium ${
              currentScreen === screen.id
                ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {screen.label}
          </button>
        ))}
      </div>

      {/* Realistic Android Phone Device Frame */}
      <div className="relative w-full max-w-[360px] bg-slate-900 rounded-[44px] p-3 shadow-2xl border-4 border-slate-700/60 ring-1 ring-slate-900/50">
        {/* Phone Speaker & Camera Notch */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-950 rounded-full flex items-center justify-center gap-2 z-30">
          <div className="w-10 h-1 bg-slate-800 rounded-full" />
          <div className="w-2.5 h-2.5 bg-slate-900 rounded-full border border-slate-700" />
        </div>

        {/* Screen Display Container */}
        <div className="relative w-full h-[650px] bg-[#F8FAFC] rounded-[36px] overflow-hidden flex flex-col justify-between border border-slate-200/50 text-slate-900 font-sans select-none">
          {/* Status Bar */}
          <div className="pt-2 px-6 pb-1 flex items-center justify-between text-[11px] font-semibold text-slate-700 z-20">
            <span>10:24</span>
            <div className="flex items-center gap-1.5 text-slate-600">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Dynamic Screen Contents */}
          <div className="flex-1 overflow-y-auto px-4 py-2">
            {/* Screen 1: Splash Screen */}
            {currentScreen === 'splash' && (
              <div className="h-full flex flex-col justify-between py-6 text-center">
                <div className="pt-8 space-y-3 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xs overflow-hidden">
                    <img
                      src="/assets/aistudio/bosc-main-logo_39d98de6.png"
                      alt="BOSC"
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  </div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                    Hor Katha Suite
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">
                    v3.7.4 Pro Ultra
                  </p>
                  <p className="text-xs font-semibold text-amber-800">
                    BOSC Tech &amp; Edu
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="w-full flex items-center justify-center">
                    <CulturalTree variant="banner" className="w-48 h-32" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-serif italic text-slate-700">
                      "{heroConfig.quoteEnglish || 'Our Language, Our Identity, Our Pride'}"
                    </p>
                    <p className="text-[11px] font-medium text-amber-800 italic mt-0.5">
                      "{heroConfig.quoteSantali || 'Abo Ror, Abo Uprum, Abo Gorob'}"
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentScreen('language')}
                    className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Screen 2: Language Selection */}
            {currentScreen === 'language' && (
              <div className="h-full flex flex-col justify-between py-4">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Choose Your Language &amp; Script
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Select your preferred language and script for a better experience.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      { id: 'santali' as ScriptType, title: 'Santali Devanagari & Roman', sub: '(संताली देवनागरी एवं रोमन)' },
                      { id: 'hindi' as ScriptType, title: 'Hindi (हिन्दी)', sub: '(Devanagari script)' },
                      { id: 'english' as ScriptType, title: 'English', sub: '(Latin alphabet)' },
                    ].map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedScript(item.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                          selectedScript === item.id
                            ? 'bg-sky-50 border-sky-500 shadow-2xs'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <div>
                          <p className="text-sm font-bold text-slate-900">{item.title}</p>
                          <p className="text-[11px] text-slate-500">{item.sub}</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            selectedScript === item.id
                              ? 'bg-sky-600 border-sky-600 text-white'
                              : 'border-slate-300'
                          }`}
                        >
                          {selectedScript === item.id && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setCurrentScreen('home')}
                  className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Screen 3: Home Dashboard (Mobile) */}
            {currentScreen === 'home' && (
              <div className="space-y-4 py-2">
                {/* Mobile Top Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/aistudio/bosc-main-logo_39d98de6.png"
                      alt="BOSC"
                      className="w-6 h-6 object-contain drop-shadow-xs"
                    />
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">Hor Katha Suite</h3>
                      <p className="text-[10px] text-slate-500">BOSC Tech &amp; Edu</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                    v3.7.4
                  </span>
                </div>

                {/* Johar Hero Card */}
                <div className="p-4 bg-gradient-to-r from-amber-50 to-amber-100/80 rounded-2xl border border-amber-200/80 space-y-2">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-amber-800">
                    Welcome
                  </span>
                  <h2 className="text-base font-bold text-amber-950 leading-tight">
                    Johar! Welcome to <br />Hor Katha Suite
                  </h2>
                  <p className="text-[11px] text-amber-900/80">
                    Santali Language &amp; Learning Platform
                  </p>
                  <button
                    onClick={() => setCurrentScreen('keyboard')}
                    className="mt-1 px-3 py-1.5 bg-amber-900 text-white text-xs font-semibold rounded-xl flex items-center gap-1"
                  >
                    <span>Explore Features</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* 4 Feature Buttons Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setCurrentScreen('keyboard')}
                    className="p-3.5 bg-sky-500 text-white rounded-2xl text-left shadow-xs hover:bg-sky-600 transition-colors flex flex-col justify-between h-28"
                  >
                    <KeyboardIcon className="w-6 h-6" />
                    <div>
                      <p className="text-xs font-bold leading-tight">Santali Keyboard</p>
                      <p className="text-[10px] text-sky-100 mt-0.5">Roman Santali &amp; Diacritics</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setCurrentScreen('dictionary')}
                    className="p-3.5 bg-amber-500 text-white rounded-2xl text-left shadow-xs hover:bg-amber-600 transition-colors flex flex-col justify-between h-28"
                  >
                    <BookOpen className="w-6 h-6" />
                    <div>
                      <p className="text-xs font-bold leading-tight">Dictionary</p>
                      <p className="text-[10px] text-amber-100 mt-0.5">10,000+ Words</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setCurrentScreen('calendar')}
                    className="p-3.5 bg-amber-600 text-white rounded-2xl text-left shadow-xs hover:bg-amber-700 transition-colors flex flex-col justify-between h-28"
                  >
                    <Calendar className="w-6 h-6" />
                    <div>
                      <p className="text-xs font-bold leading-tight">Festivals (पर्व)</p>
                      <p className="text-[10px] text-amber-100 mt-0.5">सोहराय, बाहा, करम पर्व</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setCurrentScreen('learn')}
                    className="p-3.5 bg-emerald-500 text-white rounded-2xl text-left shadow-xs hover:bg-emerald-600 transition-colors flex flex-col justify-between h-28"
                  >
                    <GraduationCap className="w-6 h-6" />
                    <div>
                      <p className="text-xs font-bold leading-tight">Learn Santali</p>
                      <p className="text-[10px] text-emerald-100 mt-0.5">Alphabet &amp; Quiz</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setCurrentScreen('daily_quiz')}
                    className="p-3.5 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 text-white rounded-2xl text-left shadow-xs hover:from-amber-600 hover:to-rose-700 transition-colors flex flex-col justify-between h-28 sm:col-span-2"
                  >
                    <Flame className="w-6 h-6" />
                    <div>
                      <p className="text-xs font-bold leading-tight">Daily Vocab Quiz</p>
                      <p className="text-[10px] text-amber-100 mt-0.5">5 Words Daily · Track Your Streak</p>
                    </div>
                  </button>
                </div>

                {/* Bottom Translator & Google Translator Row */}
                <div className="space-y-2">
                  <button
                    onClick={() => setCurrentScreen('translator')}
                    className="w-full p-3.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl flex items-center justify-between shadow-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <Languages className="w-5 h-5" />
                      <div className="text-left">
                        <p className="text-xs font-bold">Suite Translator</p>
                        <p className="text-[10px] text-rose-100">Santali · Hindi · English</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => window.open('https://translate.google.com/?sl=auto&tl=hi&op=translate', '_blank', 'noopener,noreferrer')}
                    className="w-full p-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-2xl flex items-center justify-center gap-2 font-bold text-xs transition-colors shadow-2xs"
                  >
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span>Launch Google Translator (Online)</span>
                  </button>
                </div>
              </div>
            )}

            {/* Screen 5: Dictionary (Mobile) */}
            {currentScreen === 'dictionary' && (
              <div className="h-full flex flex-col justify-between">
                <DictionaryModule compact />
              </div>
            )}

            {/* Screen 7: Learn Santali (Mobile) */}
            {currentScreen === 'learn' && (
              <div className="h-full flex flex-col justify-between">
                <LearnModule compact />
              </div>
            )}

            {/* Screen 9: Spoken Phrasebook (Mobile) */}
            {currentScreen === 'phrasebook' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliPhrasebook compact />
              </div>
            )}

            {/* Screen 10: Flashcards (Mobile) */}
            {currentScreen === 'flashcards' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliFlashcards compact />
              </div>
            )}

            {/* Screen 11: Calligraphy Studio */}
            {currentScreen === 'calligraphy' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <CalligraphyStudio />
              </div>
            )}

            {/* Screen 12: Kudum & Riddles */}
            {currentScreen === 'kudum' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <KudumProverbs />
              </div>
            )}

            {/* Screen 13: Cultural Calendar */}
            {currentScreen === 'calendar' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <CulturalCalendar />
              </div>
            )}

            {/* Screen 14: Santali Wordle Game */}
            {currentScreen === 'wordle' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliWordleGame />
              </div>
            )}

            {/* Screen 15: Folk Stories Audio */}
            {currentScreen === 'stories' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <FolkStoriesPlayer />
              </div>
            )}

            {/* Screen 16: Pronunciation Coach */}
            {currentScreen === 'speech_coach' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <PronunciationCoach />
              </div>
            )}

            {/* Screen 17: Universal Voice Speaker & Reader */}
            {currentScreen === 'speaker' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <TextSpeakerReader compact />
              </div>
            )}

            {/* Screen 18: Instruments Pad */}
            {currentScreen === 'instruments' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliInstrumentsPad />
              </div>
            )}

            {/* Screen 19: Kinship & Family Tree */}
            {currentScreen === 'family_tree' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliFamilyTree />
              </div>
            )}

            {/* Screen 20: Kids Rhymes Jukebox */}
            {currentScreen === 'kids_rhymes' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliKidsJukebox />
              </div>
            )}

            {/* Screen 21: Speaking Clock & Numbers */}
            {currentScreen === 'clock_numbers' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliClockNumbers />
              </div>
            )}

            {/* Screen 22: 12 Sacred Clans */}
            {currentScreen === 'clans' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliClansDirectory />
              </div>
            )}

            {/* Screen 23: Flora & Worksheets */}
            {currentScreen === 'flora_worksheets' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <AdivasiFloraWorksheet />
              </div>
            )}

            {/* Screen: Majhi Pargana System */}
            {currentScreen === 'governance' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <MajhiParganaSystem />
              </div>
            )}

            {/* Screen: Dharti ki Sristi / Sirjon Kahni */}
            {currentScreen === 'creation' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliCreationMyth />
              </div>
            )}

            {/* Screen: Top 10 Traditional Dances */}
            {currentScreen === 'dances' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliDancesTop10 />
              </div>
            )}

            {/* Screen: Top 15 Puja-Paat & Bonga Buru */}
            {currentScreen === 'bonga_buru' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliBongaBuruTop15 />
              </div>
            )}

            {/* Screen: Santhal Hul 1855 Freedom Heroes */}
            {currentScreen === 'hul_heroes' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SanthalHulHeroes />
              </div>
            )}

            {/* Screen: Santali Marriage Traditions */}
            {currentScreen === 'marriage_bapla' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliMarriageBapla />
              </div>
            )}

            {/* Screen: Traditional Attire & Ornaments */}
            {currentScreen === 'attire_ornaments' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliAttireOrnaments />
              </div>
            )}

            {/* Screen: Authentic Cuisine & Recipes */}
            {currentScreen === 'cuisine' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliCuisineRecipes />
              </div>
            )}

            {/* Screen: Traditional Sports & Sendra */}
            {currentScreen === 'sports_sendra' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliTraditionalSports />
              </div>
            )}

            {/* Screen: Folk Songs & Seren Archive */}
            {currentScreen === 'folk_songs' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliFolkSongsArchive />
              </div>
            )}

            {/* Screen: Sacred Pilgrimage Sites */}
            {currentScreen === 'pilgrimage' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliPilgrimageSites />
              </div>
            )}

            {/* Screen: Sacred Life Rites */}
            {currentScreen === 'life_rites' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliLifeRites />
              </div>
            )}

            {/* Screen: Proficiency Exam & Certificate */}
            {currentScreen === 'certification' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliProficiencyCertificate />
              </div>
            )}

            {/* Screen: Sohrai Mural Art Studio */}
            {currentScreen === 'sohrai_art' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SohraiMuralArt />
              </div>
            )}

            {/* Screen: Proverbs Bhenta Katha */}
            {currentScreen === 'proverbs_bhenta' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliProverbsBhenta />
              </div>
            )}

            {/* Screen: Traditional Agriculture & Seasons */}
            {currentScreen === 'agri_seasons' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliAgriSeasons />
              </div>
            )}

            {/* Screen: Traditional Measures */}
            {currentScreen === 'traditional_measures' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliTraditionalMeasures />
              </div>
            )}

            {/* Screen: Traditional Architecture */}
            {currentScreen === 'architecture' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliArchitecture />
              </div>
            )}

            {/* Screen: Historical Garhs & Migrations */}
            {currentScreen === 'historical_garhs' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliHistoricalGarhs />
              </div>
            )}

            {/* Screen: Chadar Badani Puppetry */}
            {currentScreen === 'puppetry_theater' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliPuppetryTheater />
              </div>
            )}

            {/* Screen: Astronomy & Sky Lore */}
            {currentScreen === 'astronomy_lore' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliAstronomySkyLore />
              </div>
            )}

            {/* Screen: Sendra & Lobir Baisi Forest Ethics & High Court */}
            {currentScreen === 'sendra_lobir' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliSendraLobir />
              </div>
            )}

            {/* Screen: Dhokra Bell-Metal Casting & Kamar Metallurgy */}
            {currentScreen === 'dhokra_art' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliDhokraArt />
              </div>
            )}

            {/* Screen: Water Harvesting, Dadi & Slope Farming */}
            {currentScreen === 'water_harvesting' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliWaterHarvesting />
              </div>
            )}

            {/* Screen: Handloom Weaving & Natural Vegetable Dyeing */}
            {currentScreen === 'handloom_weaving' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliHandloomWeaving />
              </div>
            )}

            {/* Screen: Livestock, Khuntau Ritual & Ethno-Veterinary */}
            {currentScreen === 'livestock_khuntau' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliLivestockKhuntau />
              </div>
            )}

            {/* Screen: Woodcraft, Dhenki, Nahel & Sacred Pillars */}
            {currentScreen === 'woodcraft_carpentry' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliWoodcraftCarpentry />
              </div>
            )}

            {/* Screen: Bamboo Craft, Winnowing Fan & Fish Traps */}
            {currentScreen === 'bamboo_craft' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliBambooCraft />
              </div>
            )}

            {/* Screen: 4 Checked Glottal Consonants Studio & Phonetics Lab */}
            {currentScreen === 'phonetics_lab' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliPhoneticsLab />
              </div>
            )}

            {/* Screen: Baby Names Directory */}
            {currentScreen === 'baby_names' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliBabyNamesDirectory />
              </div>
            )}

            {/* Screen: Ornaments & Jewellery */}
            {currentScreen === 'ornaments_jewellery' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliOrnamentsJewellery />
              </div>
            )}

            {/* Screen: Blacksmithy & Iron Craft */}
            {currentScreen === 'blacksmithy_iron' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliBlacksmithyIronCraft />
              </div>
            )}

            {/* Screen: 6 Seasons & Weather Lore */}
            {currentScreen === 'seasons_weather' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliSeasonsWeatherLore />
              </div>
            )}

            {/* Screen: Idioms & Menkatha */}
            {currentScreen === 'idioms_menkatha' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliIdiomsMenkatha />
              </div>
            )}

            {/* Screen: Traditional Herbal Drinks */}
            {currentScreen === 'herbal_drinks' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliTraditionalHerbalDrinks />
              </div>
            )}

            {/* Screen: Archery Simulator */}
            {currentScreen === 'archery_simulator' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliArcheryGameSimulator />
              </div>
            )}

            {/* Screen: Traditional Cuisine */}
            {currentScreen === 'traditional_cuisine' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliTraditionalCuisine />
              </div>
            )}

            {/* Screen: Marriage & Life Rituals */}
            {currentScreen === 'marriage_rituals' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliMarriageLifeRituals />
              </div>
            )}

            {/* Screen: Kudum Riddles Game */}
            {currentScreen === 'riddles_kudum' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliRiddlesKudumGame />
              </div>
            )}

            {/* Screen: Sacred Pilgrimages */}
            {currentScreen === 'sacred_pilgrimages' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliSacredPilgrimages />
              </div>
            )}

            {/* Screen: Spoken Dialogues */}
            {currentScreen === 'spoken_dialogues' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliSpokenDialogues />
              </div>
            )}

            {/* Screen: Letter & Invitation Templates */}
            {currentScreen === 'letter_templates' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliFormalLetterTemplates />
              </div>
            )}

            {/* Screen: Illustrated Folk Tales */}
            {currentScreen === 'illustrated_stories' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliIllustratedFolkTales />
              </div>
            )}

            {/* Screen: Favorites & Notebook */}
            {currentScreen === 'favorites_notebook' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliFavoritesNotebook />
              </div>
            )}

            {/* Screen: Santali Grammar Builder */}
            {currentScreen === 'grammar' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliGrammarBuilder />
              </div>
            )}

            {/* Screen: Festive Greetings & E-Card Maker */}
            {currentScreen === 'greetings' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliGreetingMaker />
              </div>
            )}

            {/* Screen: Traditional Herbal Remedies */}
            {currentScreen === 'herbal' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <SantaliHerbalRemedies />
              </div>
            )}

            {/* Screen 24: Translator (Mobile) */}
            {currentScreen === 'translator' && (
              <div className="h-full flex flex-col justify-between">
                <TranslatorModule compact />
              </div>
            )}

            {/* Screen 12: Daily Vocab Quiz (Mobile) */}
            {currentScreen === 'daily_quiz' && (
              <div className="h-full flex flex-col justify-between overflow-y-auto p-2">
                <DailyVocabQuiz compact onNavigateHome={() => setCurrentScreen('home')} />
              </div>
            )}
          </div>

          {/* Bottom Navigation Bar */}
          <div className="bg-white border-t border-slate-200 px-4 py-2 flex items-center justify-between text-[10px] font-semibold text-slate-500 shrink-0">
            <button
              onClick={() => setCurrentScreen('home')}
              className={`flex flex-col items-center gap-0.5 ${
                currentScreen === 'home' ? 'text-sky-600' : 'hover:text-slate-900'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => setCurrentScreen('daily_quiz')}
              className={`flex flex-col items-center gap-0.5 ${
                currentScreen === 'daily_quiz' ? 'text-amber-600 font-bold' : 'hover:text-slate-900'
              }`}
            >
              <Flame className="w-4 h-4 text-orange-500" />
              <span>Daily Quiz</span>
            </button>

            <button
              onClick={() => setCurrentScreen('learn')}
              className={`flex flex-col items-center gap-0.5 ${
                currentScreen === 'learn' ? 'text-sky-600' : 'hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Learn</span>
            </button>

            <button
              onClick={() => setCurrentScreen('keyboard')}
              className={`flex flex-col items-center gap-0.5 ${
                currentScreen === 'keyboard' ? 'text-sky-600' : 'hover:text-slate-900'
              }`}
            >
              <KeyboardIcon className="w-4 h-4" />
              <span>Keyboard</span>
            </button>

            <button
              onClick={() => setCurrentScreen('dictionary')}
              className={`flex flex-col items-center gap-0.5 ${
                currentScreen === 'dictionary' ? 'text-sky-600' : 'hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Dictionary</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
