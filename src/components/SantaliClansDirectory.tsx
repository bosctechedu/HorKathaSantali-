import React, { useState, useEffect } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import {
  Shield,
  Search,
  Volume2,
  Sparkles,
  Info,
  CheckCircle2,
  TreePine,
  Feather,
  Edit2,
  Trash2,
  Plus,
  X,
  Save
} from 'lucide-react';

export interface ClanData {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  nameHindi: string;
  totemSymbol: string;
  traditionalRole: string;
  totemMeaning: string;
  sacredTaboo: string;
  gradient: string;
}

export const DEFAULT_CLANS_DATA: ClanData[] = [
  {
    id: 'murmu',
    nameDevanagari: 'मुर्मु',
    nameRoman: 'Murmu',
    nameHindi: 'मुर्मु (मुरमु ठाकुर)',
    totemSymbol: '🦌 Blue Bull (Murum / Nilgai)',
    traditionalRole: 'Priestly custodians & Spiritual Teachers (Murmu Thakur)',
    totemMeaning: 'The Nilgai (Forest Antelope). Highly revered for grace, intuition, and sacred guardianship.',
    sacredTaboo: 'Clan members strictly never hunt, harm, or eat the meat of the Murum antelope.',
    gradient: 'from-amber-600 to-orange-700'
  },
  {
    id: 'kisku',
    nameDevanagari: 'किस्कू',
    nameRoman: 'Kisku',
    nameHindi: 'किस्कू (किस्कू रापाज)',
    totemSymbol: '🐦 Kingfisher (Kisku bird)',
    traditionalRole: 'Rulers, Administrators & Chieftains (Kisku Rapaj)',
    totemMeaning: 'The swift Kingfisher diving with surgical precision, representing royal leadership.',
    sacredTaboo: 'Kisku members never kill or cage the Kingfisher bird.',
    gradient: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'hembram',
    nameDevanagari: 'हेम्ब्रम',
    nameRoman: 'Hembram',
    nameHindi: 'हेम्ब्रम (हेम्ब्रम कुंअर)',
    totemSymbol: '🌴 Betel Palm / Areca Nut (Guwa)',
    traditionalRole: 'Nobles, Judicial Arbiters & Councilors (Hembram Kuar)',
    totemMeaning: 'The straight betel nut palm, symbolizing dignity, unwavering justice, and counsel.',
    sacredTaboo: 'Never cut young betel palms or disrespect areca nut offerings.',
    gradient: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'soren',
    nameDevanagari: 'सोरेन',
    nameRoman: 'Soren',
    nameHindi: 'सोरेन (सोरेन सिपाही)',
    totemSymbol: '⚔️ Pleiades / Battle Sentinel (Sipahi)',
    traditionalRole: 'Warriors, Defenders & Border Protectors (Soren Sipahi)',
    totemMeaning: 'The seven stars constellation and warrior blade protecting village boundaries.',
    sacredTaboo: 'Never turn back from community defense; protectors of women and elderly.',
    gradient: 'from-red-600 to-rose-700'
  },
  {
    id: 'marndi',
    nameDevanagari: 'मरांडी',
    nameRoman: 'Marndi',
    nameHindi: 'मारंडी (मारंडी किसार)',
    totemSymbol: '🌾 Miru Grass & Grass Carp',
    traditionalRole: 'Merchants, Agrarian Wealth Keepers (Marndi Kisar)',
    totemMeaning: 'Rich golden grain stalks and fertile wetland prosperity.',
    sacredTaboo: 'Clan members never burn wet grass stalks or mistreat granary provisions.',
    gradient: 'from-amber-500 to-yellow-600'
  },
  {
    id: 'tudu',
    nameDevanagari: 'टुडू',
    nameRoman: 'Tudu',
    nameHindi: 'टुडू (टुडू रुसिका)',
    totemSymbol: '🪘 Owl / Tamak Drum Maker (Tudu bird)',
    traditionalRole: 'Master Musicians, Bards & Artisans (Tudu Rusika)',
    totemMeaning: 'Keepers of the village dance floor (Akhra), poetry, and percussion rhythms.',
    sacredTaboo: 'Never disrespect musical instruments or sing without community harmony.',
    gradient: 'from-purple-600 to-pink-700'
  },
  {
    id: 'baskey',
    nameDevanagari: 'बास्के',
    nameRoman: 'Baskey',
    nameHindi: 'बास्के (बास्के व्यापारी)',
    totemSymbol: '🍚 Stale Rice / Puffed Harvest (Baskey)',
    traditionalRole: 'Stewards of Food Preservation & Trade (Baskey Byapari)',
    totemMeaning: 'The sacred sustaining nourishment of rice ferments (Daka).',
    sacredTaboo: 'Never waste agricultural harvest or turn away a hungry traveler.',
    gradient: 'from-teal-600 to-cyan-700'
  },
  {
    id: 'besra',
    nameDevanagari: 'बेस्रा',
    nameRoman: 'Besra',
    nameHindi: 'बेसरा (बेसरा शिकारी)',
    totemSymbol: '🦅 Falcon / Hawk (Besra bird)',
    traditionalRole: 'Hunters, Trackers & Forest Scouts (Besra Shikari)',
    totemMeaning: 'Sharp-eyed forest bird navigating dense jungle terrains.',
    sacredTaboo: 'Never kill a nesting hawk or hunt out of season.',
    gradient: 'from-orange-600 to-amber-700'
  },
  {
    id: 'hansdak',
    nameDevanagari: 'हांसदा',
    nameRoman: 'Hansdak’',
    nameHindi: 'हांसदा (हांसदा हंस)',
    totemSymbol: '🦢 Wild Swan (Has-Hasil bird)',
    traditionalRole: 'Keepers of Creation Lore & Water Wells',
    totemMeaning: 'The divine primordial swan from whose eggs humanity was born.',
    sacredTaboo: 'Under no circumstances will a Hansdak harm or consume swan flesh.',
    gradient: 'from-sky-600 to-blue-700'
  },
  {
    id: 'chore',
    nameDevanagari: 'चोरे',
    nameRoman: 'Chore',
    nameHindi: 'चोरे (वन्य जीव रक्षक)',
    totemSymbol: '🦎 Monitor Lizard / Burrower',
    traditionalRole: 'Sub-clan Specialists & Earth Sculptors',
    totemMeaning: 'Secret deep soil wisdom and root-crop gatherers.',
    sacredTaboo: 'Respect forest burrowing creatures and underground water paths.',
    gradient: 'from-stone-600 to-zinc-700'
  },
  {
    id: 'pauria',
    nameDevanagari: 'पौड़िया',
    nameRoman: 'Pauria',
    nameHindi: 'पौड़िया (संदेशवाहक)',
    totemSymbol: '🕊️ Forest Pigeon',
    traditionalRole: 'Village Messengers & Peace Emissaries',
    totemMeaning: 'Gentle messengers carrying news between allied villages.',
    sacredTaboo: 'Never deliver false words or harm nesting pigeons.',
    gradient: 'from-indigo-600 to-purple-700'
  },
  {
    id: 'bedea',
    nameDevanagari: 'बेदेया',
    nameRoman: 'Bedea',
    nameHindi: 'बेदेया (पशुपालक)',
    totemSymbol: '🐑 Sacred Herd / Sheep',
    traditionalRole: 'Pastoral Weavers & Fiber Crafters',
    totemMeaning: 'Keepers of sheep and spinning wool/grass mats for ceremonies.',
    sacredTaboo: 'Treat newborn livestock with gentle protective maternal care.',
    gradient: 'from-rose-600 to-pink-700'
  }
];

export const SantaliClansDirectory: React.FC = () => {
  const { isAdmin } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');

  // Persistent Clans List
  const [clansList, setClansList] = useState<ClanData[]>(() => {
    return safeLoadFromStorage('hor_katha_clans_db', DEFAULT_CLANS_DATA);
  });

  useEffect(() => {
    safeSaveToStorage('hor_katha_clans_db', clansList);
  }, [clansList]);

  const [selectedClan, setSelectedClan] = useState<ClanData>(() => clansList[0] || DEFAULT_CLANS_DATA[0]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [clanForm, setClanForm] = useState<Omit<ClanData, 'id' | 'gradient'>>({
    nameDevanagari: '',
    nameRoman: '',
    nameHindi: '',
    totemSymbol: '',
    traditionalRole: '',
    totemMeaning: '',
    sacredTaboo: ''
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setClanForm({
      nameDevanagari: '',
      nameRoman: '',
      nameHindi: '',
      totemSymbol: '🐾 Totem Animal/Symbol',
      traditionalRole: '',
      totemMeaning: '',
      sacredTaboo: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (clan: ClanData) => {
    setEditingId(clan.id);
    setClanForm({
      nameDevanagari: clan.nameDevanagari,
      nameRoman: clan.nameRoman,
      nameHindi: clan.nameHindi,
      totemSymbol: clan.totemSymbol,
      traditionalRole: clan.traditionalRole,
      totemMeaning: clan.totemMeaning,
      sacredTaboo: clan.sacredTaboo
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (window.confirm('Are you sure you want to delete this clan entry?')) {
      const updated = clansList.filter((c) => c.id !== id);
      setClansList(updated);
      if (selectedClan.id === id && updated.length > 0) {
        setSelectedClan(updated[0]);
      }
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clanForm.nameRoman || !clanForm.nameHindi) {
      alert('Please fill at least the Clan Name in Roman and Hindi.');
      return;
    }

    if (editingId) {
      const updated = clansList.map((c) => {
        if (c.id === editingId) {
          const mod = {
            ...c,
            ...clanForm,
            nameDevanagari: clanForm.nameDevanagari || clanForm.nameRoman
          };
          if (selectedClan.id === editingId) {
            setSelectedClan(mod);
          }
          return mod;
        }
        return c;
      });
      setClansList(updated);
    } else {
      const newClan: ClanData = {
        ...clanForm,
        id: `clan_${Date.now()}`,
        nameDevanagari: clanForm.nameDevanagari || clanForm.nameRoman,
        gradient: 'from-amber-700 to-orange-800'
      };
      setClansList((prev) => [newClan, ...prev]);
      setSelectedClan(newClan);
    }
    setIsModalOpen(false);
  };

  const filtered = clansList.filter((clan) => {
    const q = searchQuery.toLowerCase();
    return (
      clan.nameRoman.toLowerCase().includes(q) ||
      clan.nameHindi.toLowerCase().includes(q) ||
      clan.nameDevanagari.includes(searchQuery) ||
      clan.totemSymbol.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-800 via-stone-800 to-red-900 text-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider">
              Ancestral Lineages &amp; Totems
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                (12 Clans)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mt-1.5 tracking-tight flex items-center gap-2.5">
            <Shield className="w-7 h-7 text-amber-300" />
            <span>The 12 Sacred Santali Clans (Paris) Guide</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 font-medium mt-1">
            Discover each clan's sacred totem symbol, historical societal duties, and ancestral taboos.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isAdmin && (
            <button
              onClick={handleOpenAdd}
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Add Clan (पारिस जोड़ें)</span>
            </button>
          )}

          <div className="bg-white/15 px-4 py-2 rounded-2xl border border-white/20 text-center">
            <span className="text-[10px] uppercase font-bold text-amber-200 block">Exogamy Law</span>
            <span className="text-xs font-black text-white">Same-Clan Marriage Forbidden</span>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search clan name (Murmu, Kisku, Soren...), totem symbol, or role..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-2xs"
        />
      </div>

      {/* Clan Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((clan) => {
          const isSelected = clan.id === selectedClan.id;
          return (
            <div
              key={clan.id}
              onClick={() => setSelectedClan(clan)}
              className={`rounded-3xl border p-5 transition-all cursor-pointer bg-white shadow-xs flex flex-col justify-between relative group ${
                isSelected
                  ? 'border-amber-600 ring-2 ring-amber-600/20 shadow-md scale-102'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">{clan.totemSymbol}</span>

                  <div className="flex items-center gap-1">
                    {/* Admin Pen and Trash */}
                    {isAdmin && (
                      <div className="flex items-center gap-0.5 bg-amber-50 p-1 rounded-lg border border-amber-200">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEdit(clan);
                          }}
                          className="p-1 text-slate-500 hover:text-amber-700 rounded transition-colors cursor-pointer"
                          title="Edit Clan"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDelete(clan.id, e)}
                          className="p-1 text-slate-500 hover:text-rose-600 rounded transition-colors cursor-pointer"
                          title="Delete Clan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakWithFemaleVoice(`${clan.nameHindi}. ${clan.traditionalRole}`, { lang: 'hi-IN' });
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                      title="Pronounce Clan"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-3xl font-black font-serif text-slate-900 mt-2">
                  {clan.nameDevanagari}
                </h3>
                <p className="text-base font-bold text-amber-800 mt-0.5">{clan.nameRoman}</p>
                <p className="text-xs text-slate-500">{clan.nameHindi}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-xs space-y-1.5">
                <p className="font-bold text-slate-800 line-clamp-1">{clan.traditionalRole}</p>
                <p className="text-[11px] text-slate-500 line-clamp-2">{clan.sacredTaboo}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Clan Deep Dossier */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              Ancestral Heritage Dossier
            </span>
            <h2 className="text-3xl font-black font-serif text-slate-900 mt-2">
              {selectedClan.nameDevanagari} — {selectedClan.nameRoman} ({selectedClan.nameHindi})
            </h2>
            <p className="text-sm font-bold text-amber-700 mt-0.5">{selectedClan.traditionalRole}</p>
          </div>

          <button
            onClick={() =>
              speakWithFemaleVoice(
                `${selectedClan.nameHindi}. कुल प्रतीक है ${selectedClan.totemSymbol}. ${selectedClan.sacredTaboo}`,
                { lang: 'hi-IN' }
              )
            }
            className="p-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors shadow-2xs shrink-0 cursor-pointer"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-1">
            <span className="font-bold text-amber-950 block">Totem Symbol &amp; Natural Meaning:</span>
            <p className="text-slate-700 leading-relaxed">{selectedClan.totemMeaning}</p>
          </div>

          <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-1">
            <span className="font-bold text-rose-950 block">Sacred Clan Taboo ():</span>
            <p className="text-slate-700 leading-relaxed">{selectedClan.sacredTaboo}</p>
          </div>
        </div>
      </div>

      {/* CLAN ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 overflow-y-auto max-h-[92vh] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-600" />
                <span>{editingId ? 'Edit Clan Details' : 'Add New Clan / Paris (नया गोत्र जोड़ें)'}</span>
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
                <label className="font-bold text-slate-700 block mb-1">Clan Name in Roman Script *</label>
                <input
                  type="text"
                  required
                  value={clanForm.nameRoman}
                  onChange={(e) => setClanForm({ ...clanForm, nameRoman: e.target.value })}
                  placeholder="e.g. Murmu / Kisku / Soren..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Clan Name in Santali Devanagari (संताली देवनागरी)</label>
                <input
                  type="text"
                  value={clanForm.nameDevanagari}
                  onChange={(e) => setClanForm({ ...clanForm, nameDevanagari: e.target.value })}
                  placeholder="e.g.  / ..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none font-serif text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Clan Name in Hindi *</label>
                <input
                  type="text"
                  required
                  value={clanForm.nameHindi}
                  onChange={(e) => setClanForm({ ...clanForm, nameHindi: e.target.value })}
                  placeholder="e.g. मुर्मु (मुरमु ठाकुर)..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Totem Animal / Symbol</label>
                <input
                  type="text"
                  value={clanForm.totemSymbol}
                  onChange={(e) => setClanForm({ ...clanForm, totemSymbol: e.target.value })}
                  placeholder="e.g. 🦌 Blue Bull (Nilgai) / 🐦 Kingfisher"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Traditional Role &amp; Duty</label>
                <input
                  type="text"
                  value={clanForm.traditionalRole}
                  onChange={(e) => setClanForm({ ...clanForm, traditionalRole: e.target.value })}
                  placeholder="e.g. Priestly custodians, Spiritual teachers, Chieftains..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Totem Meaning &amp; Nature Significance</label>
                <textarea
                  rows={2}
                  value={clanForm.totemMeaning}
                  onChange={(e) => setClanForm({ ...clanForm, totemMeaning: e.target.value })}
                  placeholder="e.g. The Nilgai forest antelope, revered for grace and guardianship..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Sacred Taboo ( / नियम)</label>
                <textarea
                  rows={2}
                  value={clanForm.sacredTaboo}
                  onChange={(e) => setClanForm({ ...clanForm, sacredTaboo: e.target.value })}
                  placeholder="e.g. Clan members never hunt, harm or eat the totem..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
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
                  <span>{editingId ? 'Update Clan' : 'Add to Clans'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
