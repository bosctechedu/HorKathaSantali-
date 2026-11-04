import React, { useState, useEffect } from 'react';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import { DEFAULT_SOHRAI_MOTIFS, SohraiMotif } from './SohraiMuralArt';
import { DEFAULT_BHENTA_KATHA, BhentaKathaItem } from './SantaliProverbsBhenta';
import { DEFAULT_AGRI_ITEMS, AgriItem } from './SantaliAgriSeasons';
import { DEFAULT_MEASURE_UNITS, MeasureUnit } from './SantaliTraditionalMeasures';
import { DEFAULT_ARCHITECTURE_SECTIONS, ArchitectureSection } from './SantaliArchitecture';
import { DEFAULT_GARHS_AND_MIGRATION, GarhSite } from './SantaliHistoricalGarhs';
import { DEFAULT_PUPPETRY_ITEMS, PuppetryItem } from './SantaliPuppetryTheater';
import { DEFAULT_CELESTIAL_ITEMS, CelestialItem } from './SantaliAstronomySkyLore';
import { DEFAULT_SENDRA_LAWS, SendraLawItem } from './SantaliSendraLobir';
import { DEFAULT_DHOKRA_ITEMS, DhokraItem } from './SantaliDhokraArt';
import { DEFAULT_WATER_ITEMS, WaterHarvestingItem } from './SantaliWaterHarvesting';
import { DEFAULT_HANDLOOM_ITEMS, HandloomItem } from './SantaliHandloomWeaving';
import { DEFAULT_LIVESTOCK_ITEMS, LivestockItem } from './SantaliLivestockKhuntau';
import { DEFAULT_WOODCRAFT_ITEMS, WoodcraftItem } from './SantaliWoodcraftCarpentry';
import { DEFAULT_BAMBOO_ITEMS, BambooCraftItem } from './SantaliBambooCraft';
import { DEFAULT_PHONETIC_ITEMS, PhoneticItem } from './SantaliPhoneticsLab';
import { DEFAULT_BABY_NAMES, BabyNameItem } from './SantaliBabyNamesDirectory';
import { DEFAULT_ORNAMENTS, OrnamentItem } from './SantaliOrnamentsJewellery';
import { DEFAULT_IRON_TOOLS, IronCraftTool } from './SantaliBlacksmithyIronCraft';
import { DEFAULT_SEASONS, SantaliSeason } from './SantaliSeasonsWeatherLore';
import { DEFAULT_MENKATHA_IDIOMS, IdiomItem } from './SantaliIdiomsMenkatha';
import { DEFAULT_HERBAL_DRINKS, HerbalDrinkItem } from './SantaliTraditionalHerbalDrinks';
import {
  Palette,
  MessageSquare,
  Sprout,
  Scale,
  Home,
  Compass,
  Sparkles,
  TreePine,
  Layers,
  Droplets,
  Shirt,
  Heart,
  Hammer,
  Search,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  CheckCircle2,
  Info,
  ShieldCheck,
  Baby,
  Coffee,
  CloudSun
} from 'lucide-react';

export interface CulturalModuleMeta {
  key: string;
  storageKey: string;
  titleDevanagari: string;
  titleHindi: string;
  category: 'culture_sacred' | 'crafts_arts' | 'nature_agri' | 'language_wisdom' | 'lifestyle_tools';
  icon: any;
  defaultData: any[];
}

export const CULTURAL_MODULES_REGISTRY: CulturalModuleMeta[] = [
  {
    key: 'sohrai_art',
    storageKey: 'hor_katha_sohrai_art_db',
    titleDevanagari: 'सोहराय भित्तिचित्र व कला',
    titleHindi: 'Sohrai Mural Art & Motifs',
    category: 'crafts_arts',
    icon: Palette,
    defaultData: DEFAULT_SOHRAI_MOTIFS
  },
  {
    key: 'proverbs_bhenta',
    storageKey: 'hor_katha_bhenta_katha_db',
    titleDevanagari: 'भेंता काथा व मुहावरे',
    titleHindi: 'Bhenta Proverbs & Wisdom',
    category: 'language_wisdom',
    icon: MessageSquare,
    defaultData: DEFAULT_BHENTA_KATHA
  },
  {
    key: 'agri_seasons',
    storageKey: 'hor_katha_agri_seasons_db',
    titleDevanagari: 'कृषि ऋतु चक्र व नक्षत्र',
    titleHindi: 'Agricultural Seasons & Lore',
    category: 'nature_agri',
    icon: Sprout,
    defaultData: DEFAULT_AGRI_ITEMS
  },
  {
    key: 'traditional_measures',
    storageKey: 'hor_katha_measures_db',
    titleDevanagari: 'पारंपरिक माप-तौल (पाय-कथा)',
    titleHindi: 'Indigenous Measuring Units',
    category: 'lifestyle_tools',
    icon: Scale,
    defaultData: DEFAULT_MEASURE_UNITS
  },
  {
    key: 'architecture',
    storageKey: 'hor_katha_architecture_db',
    titleDevanagari: 'संताली वास्तुशिल्प व घर',
    titleHindi: 'Santali Architecture & Kumbha',
    category: 'lifestyle_tools',
    icon: Home,
    defaultData: DEFAULT_ARCHITECTURE_SECTIONS
  },
  {
    key: 'historical_garhs',
    storageKey: 'hor_katha_garhs_db',
    titleDevanagari: '१२ ऐतिहासिक गढ़ व किले',
    titleHindi: 'Historical Garhs & Migration',
    category: 'culture_sacred',
    icon: Compass,
    defaultData: DEFAULT_GARHS_AND_MIGRATION
  },
  {
    key: 'puppetry_theater',
    storageKey: 'hor_katha_puppetry_db',
    titleDevanagari: 'चादर बादनी काष्ठ कठपुतली',
    titleHindi: 'Chadar Badani Puppetry Theater',
    category: 'crafts_arts',
    icon: Sparkles,
    defaultData: DEFAULT_PUPPETRY_ITEMS
  },
  {
    key: 'astronomy_lore',
    storageKey: 'hor_katha_astronomy_db',
    titleDevanagari: 'खगोल व नक्षत्र ज्ञान (इपिल)',
    titleHindi: 'Celestial Stars & Sky Lore',
    category: 'nature_agri',
    icon: Sparkles,
    defaultData: DEFAULT_CELESTIAL_ITEMS
  },
  {
    key: 'sendra_lobir',
    storageKey: 'hor_katha_sendra_db',
    titleDevanagari: 'दिशोम सेंदरा व लोबीर बैसी',
    titleHindi: 'Sendra Forest Court & Ecology',
    category: 'culture_sacred',
    icon: TreePine,
    defaultData: DEFAULT_SENDRA_LAWS
  },
  {
    key: 'dhokra_art',
    storageKey: 'hor_katha_dhokra_db',
    titleDevanagari: 'ढोकरा धातु शिल्पकला',
    titleHindi: 'Dhokra Bell-Metal Craft',
    category: 'crafts_arts',
    icon: Layers,
    defaultData: DEFAULT_DHOKRA_ITEMS
  },
  {
    key: 'water_harvesting',
    storageKey: 'hor_katha_water_harvesting_db',
    titleDevanagari: 'पारंपरिक जल संरक्षण (बांध-आहिर)',
    titleHindi: 'Indigenous Water Harvesting',
    category: 'nature_agri',
    icon: Droplets,
    defaultData: DEFAULT_WATER_ITEMS
  },
  {
    key: 'handloom_weaving',
    storageKey: 'hor_katha_handloom_db',
    titleDevanagari: 'पंछी पाड़हात हथकरघा',
    titleHindi: 'Panchi Parhat Handloom Weaving',
    category: 'crafts_arts',
    icon: Shirt,
    defaultData: DEFAULT_HANDLOOM_ITEMS
  },
  {
    key: 'livestock_khuntau',
    storageKey: 'hor_katha_livestock_db',
    titleDevanagari: 'खूंटाव व गो-वंदन अनुष्ठान',
    titleHindi: 'Cattle Worship & Khuntau Lore',
    category: 'culture_sacred',
    icon: Heart,
    defaultData: DEFAULT_LIVESTOCK_ITEMS
  },
  {
    key: 'woodcraft_carpentry',
    storageKey: 'hor_katha_woodcraft_db',
    titleDevanagari: 'काष्ठ व तीर-धनुष शिल्प',
    titleHindi: 'Woodcraft & Carpentry Lore',
    category: 'crafts_arts',
    icon: Hammer,
    defaultData: DEFAULT_WOODCRAFT_ITEMS
  },
  {
    key: 'bamboo_craft',
    storageKey: 'hor_katha_bamboo_db',
    titleDevanagari: 'बांस शिल्पकला (सूपा-टुकुच)',
    titleHindi: 'Bamboo Craft & Basketry',
    category: 'crafts_arts',
    icon: Layers,
    defaultData: DEFAULT_BAMBOO_ITEMS
  },
  {
    key: 'phonetics_lab',
    storageKey: 'hor_katha_phonetics_db',
    titleDevanagari: 'संताली ध्वनिविज्ञान (अचेत वर्ण)',
    titleHindi: 'Checked Phonetics & Sounds Lab',
    category: 'language_wisdom',
    icon: Info,
    defaultData: DEFAULT_PHONETIC_ITEMS
  },
  {
    key: 'baby_names',
    storageKey: 'hor_katha_baby_names_db',
    titleDevanagari: 'संताली पारंपरिक नामकरण',
    titleHindi: 'Santali Baby Names Directory',
    category: 'language_wisdom',
    icon: Baby,
    defaultData: DEFAULT_BABY_NAMES
  },
  {
    key: 'ornaments_jewellery',
    storageKey: 'hor_katha_jewellery_db',
    titleDevanagari: 'पारंपरिक आभूषण (हांसली-साकम)',
    titleHindi: 'Authentic Jewellery & Ornaments',
    category: 'lifestyle_tools',
    icon: Sparkles,
    defaultData: DEFAULT_ORNAMENTS
  },
  {
    key: 'blacksmithy_iron',
    storageKey: 'hor_katha_blacksmithy_db',
    titleDevanagari: 'कामार लौह शिल्प व हथियार',
    titleHindi: 'Blacksmithy Iron Craft & Forge',
    category: 'lifestyle_tools',
    icon: Hammer,
    defaultData: DEFAULT_IRON_TOOLS
  },
  {
    key: 'seasons_weather',
    storageKey: 'hor_katha_weather_lore_db',
    titleDevanagari: '६ ऋतुएँ व मौसम पूर्वानुमान',
    titleHindi: 'Seasons & Indigenous Weather Lore',
    category: 'nature_agri',
    icon: CloudSun,
    defaultData: DEFAULT_SEASONS
  },
  {
    key: 'idioms_menkatha',
    storageKey: 'hor_katha_menkatha_db',
    titleDevanagari: 'मेनकाथा व गूढ़ लोकोक्तियां',
    titleHindi: 'Santali Metaphors & Idioms',
    category: 'language_wisdom',
    icon: MessageSquare,
    defaultData: DEFAULT_MENKATHA_IDIOMS
  },
  {
    key: 'herbal_drinks',
    storageKey: 'hor_katha_herbal_drinks_db',
    titleDevanagari: 'पारंपरिक पेय व प्राकृतिक शरबत',
    titleHindi: 'Traditional Native Drinks & Brews',
    category: 'nature_agri',
    icon: Coffee,
    defaultData: DEFAULT_HERBAL_DRINKS
  }
];

export const AdminCulturalModulesStudio: React.FC<{
  initialModuleKey?: string;
  onNotification?: (msg: string) => void;
}> = ({ initialModuleKey, onNotification }) => {
  const [selectedModuleKey, setSelectedModuleKey] = useState<string>(
    initialModuleKey || CULTURAL_MODULES_REGISTRY[0].key
  );
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchModuleQuery, setSearchModuleQuery] = useState<string>('');

  useEffect(() => {
    if (initialModuleKey) {
      setSelectedModuleKey(initialModuleKey);
    }
  }, [initialModuleKey]);

  const activeModule =
    CULTURAL_MODULES_REGISTRY.find((m) => m.key === selectedModuleKey) ||
    CULTURAL_MODULES_REGISTRY[0];

  // Dynamic state for currently loaded module items
  const [items, setItems] = useState<any[]>(() =>
    safeLoadFromStorage(activeModule.storageKey, activeModule.defaultData)
  );

  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const [searchItemQuery, setSearchItemQuery] = useState<string>('');

  // Reload items whenever selectedModuleKey changes
  useEffect(() => {
    const loaded = safeLoadFromStorage(activeModule.storageKey, activeModule.defaultData);
    setItems(loaded);
    setSelectedItemIndex(0);
    setSearchItemQuery('');
  }, [activeModule.storageKey]);

  const notify = (msg: string) => {
    if (onNotification) onNotification(msg);
  };

  const handleSaveAll = (updated: any[]) => {
    setItems(updated);
    safeSaveToStorage(activeModule.storageKey, updated);
    notify(`"${activeModule.titleDevanagari}" के सभी परिवर्तन सहेजे गए!`);
  };

  const handleResetModuleToFactory = () => {
    if (
      confirm(
        `क्या आप सचमुच "${activeModule.titleDevanagari}" को फ़ैक्टरी डिफ़ॉल्ट पर रीसेट करना चाहते हैं?`
      )
    ) {
      handleSaveAll(activeModule.defaultData);
      setSelectedItemIndex(0);
      notify(`"${activeModule.titleDevanagari}" फ़ैक्टरी डिफ़ॉल्ट पर रीसेट हो गया!`);
    }
  };

  const handleAddNewItem = () => {
    const newItem = {
      id: `${activeModule.key}_${Date.now()}`,
      nameDevanagari: 'नया शीर्षक / पद',
      nameRoman: 'Nawa Item',
      titleHindi: 'हिन्दी शीर्षक / विवरण',
      description: 'विस्तृत सांस्कृतिक विवरण यहां लिखें...',
      category: 'general',
      badge: 'नवीन'
    };
    const updated = [newItem, ...items];
    handleSaveAll(updated);
    setSelectedItemIndex(0);
    notify('नया आइटम जुड़ गया!');
  };

  const handleDeleteItem = (index: number) => {
    if (confirm('क्या आप सचमुच इस आइटम को हटाना चाहते हैं?')) {
      const updated = items.filter((_, idx) => idx !== index);
      handleSaveAll(updated);
      setSelectedItemIndex(Math.max(0, index - 1));
      notify('आइटम हटा दिया गया!');
    }
  };

  const handleFieldChange = (fieldName: string, value: any) => {
    const updated = [...items];
    if (updated[selectedItemIndex]) {
      updated[selectedItemIndex] = {
        ...updated[selectedItemIndex],
        [fieldName]: value
      };
      setItems(updated);
      safeSaveToStorage(activeModule.storageKey, updated);
    }
  };

  // Filtered module list
  const filteredModules = CULTURAL_MODULES_REGISTRY.filter((m) => {
    const matchesCat = categoryFilter === 'all' || m.category === categoryFilter;
    const query = searchModuleQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      m.titleDevanagari.toLowerCase().includes(query) ||
      m.titleHindi.toLowerCase().includes(query) ||
      m.key.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  const selectedItem = items[selectedItemIndex] || items[0] || {};

  return (
    <div className="space-y-6">
      {/* Category Pills & Module Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs w-full md:w-auto">
            {[
              { id: 'all', label: '🌟 सभी २२ मॉड्यूल (All 22)' },
              { id: 'culture_sacred', label: '🏛️ संस्कृति व तीर्थ' },
              { id: 'crafts_arts', label: '🎨 कला व लोकशिल्प' },
              { id: 'nature_agri', label: '🌿 प्रकृति, जल व कृषि' },
              { id: 'language_wisdom', label: '📚 भाषा, व्याकरण व ज्ञान' },
              { id: 'lifestyle_tools', label: '🛡️ वास्तु, औजार व जीवनशैली' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-all ${
                  categoryFilter === cat.id
                    ? 'bg-amber-700 text-white shadow-2xs font-black'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchModuleQuery}
              onChange={(e) => setSearchModuleQuery(e.target.value)}
              placeholder="मॉड्यूल खोजें..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:outline-none focus:border-amber-600"
            />
          </div>
        </div>

        {/* Horizontal Module Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs no-scrollbar">
          {filteredModules.map((mod) => {
            const isSel = selectedModuleKey === mod.key;
            const ModIcon = mod.icon;
            return (
              <button
                key={mod.key}
                onClick={() => setSelectedModuleKey(mod.key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isSel
                    ? 'bg-slate-900 text-amber-300 ring-2 ring-amber-500 shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <ModIcon className="w-3.5 h-3.5" />
                <span>{mod.titleDevanagari}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Module Header */}
      <div className="bg-gradient-to-r from-amber-900 via-stone-900 to-slate-950 text-white p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold">
              कंटेंट एडिटर
            </span>
            <span className="text-xs text-amber-200/80 font-mono">
              कुल आइटम्स: {items.length}
            </span>
          </div>
          <h2 className="text-xl font-black text-amber-100 flex items-center gap-2">
            <activeModule.icon className="w-5 h-5 text-amber-400" />
            <span>{activeModule.titleDevanagari}</span>
            <span className="text-xs font-normal text-amber-300/80">({activeModule.titleHindi})</span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddNewItem}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>नया आइटम जोड़ें</span>
          </button>
          <button
            onClick={handleResetModuleToFactory}
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 font-bold text-xs flex items-center gap-1.5 border border-white/20 cursor-pointer"
            title="फ़ैक्टरी डिफ़ॉल्ट पर रीसेट करें"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>रीसेट</span>
          </button>
        </div>
      </div>

      {/* Dual Panel Editor: Left list, Right form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Item List */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-3 shadow-2xs space-y-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchItemQuery}
              onChange={(e) => setSearchItemQuery(e.target.value)}
              placeholder="आइटम खोजें..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:outline-none focus:border-amber-600"
            />
          </div>

          <div className="max-h-[600px] overflow-y-auto space-y-1.5 pr-1">
            {items
              .map((item, idx) => ({ item, idx }))
              .filter(({ item }) => {
                const q = searchItemQuery.toLowerCase().trim();
                if (!q) return true;
                const name = (item.nameDevanagari || item.titleHindi || item.idiomDevanagari || item.santaliDevanagari || '').toLowerCase();
                const roman = (item.nameRoman || item.idiomRoman || item.santaliRoman || '').toLowerCase();
                return name.includes(q) || roman.includes(q);
              })
              .map(({ item, idx }) => {
                const isSel = selectedItemIndex === idx;
                const displayName =
                  item.nameDevanagari ||
                  item.titleHindi ||
                  item.idiomDevanagari ||
                  item.santaliDevanagari ||
                  `आइटम #${idx + 1}`;
                const displayRoman =
                  item.nameRoman ||
                  item.idiomRoman ||
                  item.santaliRoman ||
                  item.periodOrSeason ||
                  '';
                return (
                  <div
                    key={item.id || idx}
                    onClick={() => setSelectedItemIndex(idx)}
                    className={`p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between border ${
                      isSel
                        ? 'bg-amber-50 border-amber-500 shadow-2xs ring-1 ring-amber-400'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <h4 className="text-xs font-black text-slate-900 truncate">
                        {displayName}
                      </h4>
                      {displayRoman && (
                        <p className="text-[10px] text-amber-700 font-mono truncate">
                          {displayRoman}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteItem(idx);
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                      title="हटाएं"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Right Column: Detailed Form */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                आइटम #{selectedItemIndex + 1} संपादन
              </span>
              <h3 className="text-base font-black text-slate-900">
                {selectedItem.nameDevanagari ||
                  selectedItem.titleHindi ||
                  selectedItem.idiomDevanagari ||
                  selectedItem.santaliDevanagari ||
                  'संपादक'}
              </h3>
            </div>
            <button
              onClick={() => {
                handleSaveAll(items);
              }}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>सहेजें (Save)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Primary Name Devanagari */}
            {(selectedItem.nameDevanagari !== undefined ||
              selectedItem.idiomDevanagari !== undefined ||
              selectedItem.santaliDevanagari !== undefined) && (
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  नाम / पद (देवनागरी लिपि) *
                </label>
                <input
                  type="text"
                  value={
                    selectedItem.nameDevanagari ||
                    selectedItem.idiomDevanagari ||
                    selectedItem.santaliDevanagari ||
                    ''
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    if (selectedItem.nameDevanagari !== undefined) handleFieldChange('nameDevanagari', val);
                    else if (selectedItem.idiomDevanagari !== undefined) handleFieldChange('idiomDevanagari', val);
                    else if (selectedItem.santaliDevanagari !== undefined) handleFieldChange('santaliDevanagari', val);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900"
                />
              </div>
            )}

            {/* Primary Name Roman */}
            {(selectedItem.nameRoman !== undefined ||
              selectedItem.idiomRoman !== undefined ||
              selectedItem.santaliRoman !== undefined) && (
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  नाम / पद (Roman Script)
                </label>
                <input
                  type="text"
                  value={
                    selectedItem.nameRoman ||
                    selectedItem.idiomRoman ||
                    selectedItem.santaliRoman ||
                    ''
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    if (selectedItem.nameRoman !== undefined) handleFieldChange('nameRoman', val);
                    else if (selectedItem.idiomRoman !== undefined) handleFieldChange('idiomRoman', val);
                    else if (selectedItem.santaliRoman !== undefined) handleFieldChange('santaliRoman', val);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                />
              </div>
            )}

            {/* Title Hindi */}
            {selectedItem.titleHindi !== undefined && (
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  हिन्दी शीर्षक / भावार्थ (Title Hindi)
                </label>
                <input
                  type="text"
                  value={selectedItem.titleHindi || ''}
                  onChange={(e) => handleFieldChange('titleHindi', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                />
              </div>
            )}

            {/* Category / Badge */}
            {selectedItem.categoryLabel !== undefined && (
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  श्रेणी लेबल (Category Label)
                </label>
                <input
                  type="text"
                  value={selectedItem.categoryLabel || ''}
                  onChange={(e) => handleFieldChange('categoryLabel', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                />
              </div>
            )}

            {selectedItem.badge !== undefined && (
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  बैज (Badge)
                </label>
                <input
                  type="text"
                  value={selectedItem.badge || ''}
                  onChange={(e) => handleFieldChange('badge', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                />
              </div>
            )}

            {/* Figurative meaning or Description */}
            {selectedItem.figurativeMeaningHindi !== undefined && (
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  लाक्षणिक भावार्थ (Figurative Meaning in Hindi)
                </label>
                <textarea
                  rows={2}
                  value={selectedItem.figurativeMeaningHindi || ''}
                  onChange={(e) => handleFieldChange('figurativeMeaningHindi', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                />
              </div>
            )}

            {selectedItem.deepMeaningHindi !== undefined && (
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  गहन सांस्कृतिक भावार्थ (Deep Meaning)
                </label>
                <textarea
                  rows={2}
                  value={selectedItem.deepMeaningHindi || ''}
                  onChange={(e) => handleFieldChange('deepMeaningHindi', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                />
              </div>
            )}

            {selectedItem.description !== undefined && (
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  विस्तृत विवरण (Description)
                </label>
                <textarea
                  rows={3}
                  value={selectedItem.description || ''}
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                />
              </div>
            )}

            {selectedItem.significance !== undefined && (
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  सांस्कृतिक महत्व (Significance)
                </label>
                <textarea
                  rows={2}
                  value={selectedItem.significance || ''}
                  onChange={(e) => handleFieldChange('significance', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                />
              </div>
            )}

            {selectedItem.culturalSignificance !== undefined && (
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  सांस्कृतिक महत्व व दर्शन (Cultural Significance)
                </label>
                <textarea
                  rows={2}
                  value={selectedItem.culturalSignificance || ''}
                  onChange={(e) => handleFieldChange('culturalSignificance', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                />
              </div>
            )}

            {/* Natural Pigment / Materials */}
            {selectedItem.naturalPigment !== undefined && (
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  प्राकृतिक रंग व सामग्री (Natural Pigment)
                </label>
                <input
                  type="text"
                  value={selectedItem.naturalPigment || ''}
                  onChange={(e) => handleFieldChange('naturalPigment', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                />
              </div>
            )}

            {selectedItem.symbolism !== undefined && (
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  प्रतीकात्मक अर्थ (Symbolism)
                </label>
                <textarea
                  rows={2}
                  value={selectedItem.symbolism || ''}
                  onChange={(e) => handleFieldChange('symbolism', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                />
              </div>
            )}

            {selectedItem.metricEquivalent !== undefined && (
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  मीट्रिक समतुल्य (Metric Equivalent)
                </label>
                <input
                  type="text"
                  value={selectedItem.metricEquivalent || ''}
                  onChange={(e) => handleFieldChange('metricEquivalent', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                />
              </div>
            )}

            {selectedItem.culturalUsage !== undefined && (
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  पारंपरिक उपयोग (Cultural Usage)
                </label>
                <textarea
                  rows={2}
                  value={selectedItem.culturalUsage || ''}
                  onChange={(e) => handleFieldChange('culturalUsage', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                />
              </div>
            )}

            {selectedItem.healthBenefits !== undefined && (
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  स्वास्थ्य लाभ (Health Benefits)
                </label>
                <textarea
                  rows={2}
                  value={selectedItem.healthBenefits || ''}
                  onChange={(e) => handleFieldChange('healthBenefits', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                />
              </div>
            )}

            {selectedItem.preparationMethod !== undefined && (
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  तैयारी विधि (Preparation Method)
                </label>
                <textarea
                  rows={2}
                  value={selectedItem.preparationMethod || ''}
                  onChange={(e) => handleFieldChange('preparationMethod', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                />
              </div>
            )}

            {selectedItem.imageUrl !== undefined && (
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  तस्वीर URL (Image URL)
                </label>
                <input
                  type="url"
                  value={selectedItem.imageUrl || ''}
                  onChange={(e) => handleFieldChange('imageUrl', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
