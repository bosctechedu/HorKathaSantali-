import React, { useState, useEffect } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import {
  Users,
  Search,
  Volume2,
  Copy,
  Check,
  Heart,
  Sparkles,
  TreePine,
  ChevronRight,
  Edit2,
  Trash2,
  Plus,
  X,
  Save
} from 'lucide-react';

export interface KinshipRelation {
  id: string;
  relationSantali: string;
  relationDevanagari: string;
  relationHindi: string;
  relationEnglish: string;
  category: 'paternal' | 'maternal' | 'inlaws' | 'generation';
  culturalNote?: string;
}

const DEFAULT_KINSHIP_DATA: KinshipRelation[] = [
  // Paternal & Elders
  {
    id: 'k_baba',
    relationSantali: 'Aapa / Baba',
    relationDevanagari: 'आपा / बाबा',
    relationHindi: 'पिताजी',
    relationEnglish: 'Father',
    category: 'paternal'
  },
  {
    id: 'k_aayo',
    relationSantali: 'Aayo / Gogo',
    relationDevanagari: 'आयॊ / गोगो',
    relationHindi: 'माताजी',
    relationEnglish: 'Mother',
    category: 'paternal'
  },
  {
    id: 'k_gorom_baba',
    relationSantali: 'Gorom Baba / Haram Baba',
    relationDevanagari: 'गोरोम बाबा / हाड़ाम बाबा',
    relationHindi: 'दादाजी (पिता के पिता)',
    relationEnglish: 'Paternal Grandfather',
    category: 'paternal'
  },
  {
    id: 'k_gorom_aayo',
    relationSantali: 'Gorom Aayo / Budhi Aayo',
    relationDevanagari: 'गोरोम आयॊ / बुढ़ी आयॊ',
    relationHindi: 'दादीजी (पिता की माता)',
    relationEnglish: 'Paternal Grandmother',
    category: 'paternal'
  },
  {
    id: 'k_marangba',
    relationSantali: 'Marangba',
    relationDevanagari: 'मारांगबा',
    relationHindi: 'ताऊजी / बड़े पिताजी',
    relationEnglish: "Father's Elder Brother",
    category: 'paternal'
  },
  {
    id: 'k_maranggo',
    relationSantali: 'Maranggo',
    relationDevanagari: 'मारांग्गो',
    relationHindi: 'ताईजी / बड़ी माताजी',
    relationEnglish: "Father's Elder Brother's Wife",
    category: 'paternal'
  },
  {
    id: 'k_kaka',
    relationSantali: 'Kaka',
    relationDevanagari: 'काका',
    relationHindi: 'चाचाजी',
    relationEnglish: "Father's Younger Brother",
    category: 'paternal'
  },
  {
    id: 'k_kaki',
    relationSantali: 'Kaki',
    relationDevanagari: 'काकी',
    relationHindi: 'चाचीजी',
    relationEnglish: "Father's Younger Brother's Wife",
    category: 'paternal'
  },
  {
    id: 'k_hatom',
    relationSantali: 'Hatom',
    relationDevanagari: 'हातोम',
    relationHindi: 'बुआजी (पिता की बहन)',
    relationEnglish: "Father's Sister (Paternal Aunt)",
    category: 'paternal'
  },
  {
    id: 'k_kuma',
    relationSantali: 'Kuma',
    relationDevanagari: 'कुमा',
    relationHindi: 'फूफाजी (बुआ के पति)',
    relationEnglish: "Paternal Aunt's Husband",
    category: 'paternal'
  },

  // Maternal
  {
    id: 'k_mamo',
    relationSantali: 'Mamo',
    relationDevanagari: 'मामो',
    relationHindi: 'मामाजी (माता का भाई)',
    relationEnglish: "Mother's Brother (Maternal Uncle)",
    category: 'maternal'
  },
  {
    id: 'k_mami',
    relationSantali: 'Mami',
    relationDevanagari: 'मामी',
    relationHindi: 'मामीजी (मामा की पत्नी)',
    relationEnglish: "Maternal Uncle's Wife",
    category: 'maternal'
  },
  {
    id: 'k_masi',
    relationSantali: 'Gogo-re (Tala-aayo / Kaki)',
    relationDevanagari: 'ताला आयॊ / हुडिंग आयॊ',
    relationHindi: 'मौसी (माता की बहन)',
    relationEnglish: "Mother's Sister",
    category: 'maternal'
  },

  // Siblings & Youth
  {
    id: 'k_dada',
    relationSantali: 'Dada',
    relationDevanagari: 'दादा',
    relationHindi: 'बड़ा भाई',
    relationEnglish: 'Elder Brother',
    category: 'generation'
  },
  {
    id: 'k_dai',
    relationSantali: 'Dai',
    relationDevanagari: 'दाइ',
    relationHindi: 'बड़ी बहन',
    relationEnglish: 'Elder Sister',
    category: 'generation'
  },
  {
    id: 'k_boko_kora',
    relationSantali: 'Boko Kora',
    relationDevanagari: 'बोको कोड़ा',
    relationHindi: 'छोटा भाई',
    relationEnglish: 'Younger Brother',
    category: 'generation'
  },
  {
    id: 'k_boko_kuri',
    relationSantali: 'Boko Kuri',
    relationDevanagari: 'बोको कुड़ी',
    relationHindi: 'छोटी बहन',
    relationEnglish: 'Younger Sister',
    category: 'generation'
  },
  {
    id: 'k_hopon_kora',
    relationSantali: 'Hopon Kora',
    relationDevanagari: 'होपोन कोड़ा',
    relationHindi: 'बेटा / पुत्र',
    relationEnglish: 'Son',
    category: 'generation'
  },
  {
    id: 'k_hopon_era',
    relationSantali: 'Hopon Era',
    relationDevanagari: 'होपोन एरा',
    relationHindi: 'बेटी / पुत्री',
    relationEnglish: 'Daughter',
    category: 'generation'
  },

  // In-laws
  {
    id: 'k_honyhar',
    relationSantali: 'Honyhar',
    relationDevanagari: 'होञहार',
    relationHindi: 'ससुरजी',
    relationEnglish: 'Father-in-law',
    category: 'inlaws',
    culturalNote: 'Highest respect relationship; strict avoidance and reverence norms.'
  },
  {
    id: 'k_hanhar',
    relationSantali: 'Hanhar',
    relationDevanagari: 'हानहार',
    relationHindi: 'सासजी',
    relationEnglish: 'Mother-in-law',
    category: 'inlaws'
  },
  {
    id: 'k_tejang',
    relationSantali: 'Tejang',
    relationDevanagari: 'तेजांग',
    relationHindi: 'साला (पत्नी का छोटा भाई)',
    relationEnglish: "Wife's Younger Brother",
    category: 'inlaws',
    culturalNote: 'Friendly, affectionate joking relationship (Raska sagai).'
  },
  {
    id: 'k_erwil',
    relationSantali: 'Erwil Era',
    relationDevanagari: 'एरविल एरा',
    relationHindi: 'साली (पत्नी की छोटी बहन)',
    relationEnglish: "Wife's Younger Sister",
    category: 'inlaws',
    culturalNote: 'Traditional joking relationship in social gatherings.'
  },
  {
    id: 'k_bahu',
    relationSantali: 'Bahu',
    relationDevanagari: 'बाहू',
    relationHindi: 'बहू / पत्नी',
    relationEnglish: 'Wife / Daughter-in-law',
    category: 'inlaws'
  },
  {
    id: 'k_jawae',
    relationSantali: 'Jawae',
    relationDevanagari: 'जावाय',
    relationHindi: 'दामाद / पति',
    relationEnglish: 'Husband / Son-in-law',
    category: 'inlaws'
  }
];

export const SantaliFamilyTree: React.FC = () => {
  const { isAdmin } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'paternal' | 'maternal' | 'generation' | 'inlaws'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Persistent Family Relations List
  const [relationsList, setRelationsList] = useState<KinshipRelation[]>(() => {
    return safeLoadFromStorage('hor_katha_kinship_db', DEFAULT_KINSHIP_DATA);
  });

  useEffect(() => {
    safeSaveToStorage('hor_katha_kinship_db', relationsList);
  }, [relationsList]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [relationForm, setRelationForm] = useState<Omit<KinshipRelation, 'id'>>({
    relationSantali: '',
    relationDevanagari: '',
    relationHindi: '',
    relationEnglish: '',
    category: 'paternal',
    culturalNote: ''
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setRelationForm({
      relationSantali: '',
      relationDevanagari: '',
      relationHindi: '',
      relationEnglish: '',
      category: 'paternal',
      culturalNote: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: KinshipRelation) => {
    setEditingId(item.id);
    setRelationForm({
      relationSantali: item.relationSantali,
      relationDevanagari: item.relationDevanagari,
      relationHindi: item.relationHindi,
      relationEnglish: item.relationEnglish,
      category: item.category,
      culturalNote: item.culturalNote || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this kinship relation?')) {
      setRelationsList((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!relationForm.relationSantali || !relationForm.relationHindi) {
      alert('Please fill at least the Santali relation name and Hindi relation meaning.');
      return;
    }

    if (editingId) {
      setRelationsList((prev) =>
        prev.map((r) => (r.id === editingId ? { ...relationForm, id: editingId } : r))
      );
    } else {
      const newRelation: KinshipRelation = {
        ...relationForm,
        id: `k_${Date.now()}`
      };
      setRelationsList((prev) => [newRelation, ...prev]);
    }
    setIsModalOpen(false);
  };

  const filtered = relationsList.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.relationHindi.toLowerCase().includes(q) ||
      item.relationEnglish.toLowerCase().includes(q) ||
      item.relationSantali.toLowerCase().includes(q) ||
      item.relationDevanagari.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-cyan-900 text-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider">
              Family &amp; Social Kinship
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
              संताली सागाय
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mt-1.5 tracking-tight flex items-center gap-2.5">
            <Users className="w-7 h-7 text-amber-300" />
            <span>Santali Kinship &amp; Family Relations Guide</span>
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 font-medium mt-1">
            Explore respectful and affectionate terms for parents, in-laws, maternal elders, and sibling bonds.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isAdmin && (
            <button
              onClick={handleOpenAdd}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Add Relation (रिश्ता जोड़ें)</span>
            </button>
          )}

          <div className="bg-white/15 px-4 py-2.5 rounded-2xl border border-white/20 text-center">
            <span className="text-[10px] uppercase font-bold text-teal-200 block">Total Relations</span>
            <span className="text-lg font-black text-amber-300">{relationsList.length} Terms</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search relation by Hindi (चाचा, मौसी), English (uncle), or Santali (kaka)..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none shadow-2xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 text-xs font-semibold">
          {(['all', 'paternal', 'maternal', 'generation', 'inlaws'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-2 rounded-xl capitalize transition-all cursor-pointer shrink-0 ${
                activeCategory === cat
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Relations' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Kinship Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:border-teal-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                  {item.category}
                </span>

                <div className="flex items-center gap-1">
                  {/* Admin Pen (Edit) and Delete Icons */}
                  {isAdmin && (
                    <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded-lg border border-amber-200">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1 text-slate-500 hover:text-amber-700 rounded-md transition-colors cursor-pointer"
                        title="Edit Kinship Relation"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 text-slate-500 hover:text-rose-600 rounded-md transition-colors cursor-pointer"
                        title="Delete Kinship Relation"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => speakWithFemaleVoice(`${item.relationHindi}. ${item.relationSantali}`, { lang: 'hi-IN' })}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-teal-700 hover:bg-teal-50 transition-colors cursor-pointer"
                    title="Pronounce relation"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleCopy(item.id, `${item.relationDevanagari} (${item.relationSantali}) - ${item.relationHindi}`)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-teal-700 hover:bg-teal-50 transition-colors cursor-pointer"
                    title="Copy relation"
                  >
                    {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Santali Devanagari & Roman Titles */}
              <h3 className="text-2xl font-black font-serif text-slate-900 mt-2">
                {item.relationDevanagari}
              </h3>
              <p className="text-sm font-bold text-teal-800 mt-0.5">{item.relationSantali}</p>
            </div>

            {/* Hindi and English Descriptions */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-semibold">हिंदी संबंध:</span>
                <span className="font-bold text-slate-900">{item.relationHindi}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-semibold">English:</span>
                <span className="font-medium text-slate-700">{item.relationEnglish}</span>
              </div>
              {item.culturalNote && (
                <p className="text-[10px] text-teal-700 pt-1 border-t border-slate-200 mt-1 italic">
                  💡 {item.culturalNote}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* KINSHIP RELATION ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 overflow-y-auto max-h-[92vh] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-teal-600" />
                <span>{editingId ? 'Edit Kinship Relation' : 'Add New Relation (नया रिश्ता जोड़ें)'}</span>
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
                <label className="font-bold text-slate-700 block mb-1">Relation in Santali (Roman) *</label>
                <input
                  type="text"
                  required
                  value={relationForm.relationSantali}
                  onChange={(e) => setRelationForm({ ...relationForm, relationSantali: e.target.value })}
                  placeholder="e.g. Kaka / Hatom / Marangba..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Relation in Santali Devanagari (संताली देवनागरी)</label>
                <input
                  type="text"
                  value={relationForm.relationDevanagari}
                  onChange={(e) => setRelationForm({ ...relationForm, relationDevanagari: e.target.value })}
                  placeholder="e.g. काका / हातोम..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none font-serif text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Hindi Meaning (हिंदी संबंध) *</label>
                <input
                  type="text"
                  required
                  value={relationForm.relationHindi}
                  onChange={(e) => setRelationForm({ ...relationForm, relationHindi: e.target.value })}
                  placeholder="e.g. चाचाजी (पिता के छोटे भाई)..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">English Meaning</label>
                <input
                  type="text"
                  value={relationForm.relationEnglish}
                  onChange={(e) => setRelationForm({ ...relationForm, relationEnglish: e.target.value })}
                  placeholder="e.g. Father's Younger Brother (Uncle)..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={relationForm.category}
                    onChange={(e) => setRelationForm({ ...relationForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    <option value="paternal">Paternal (पिता पक्ष)</option>
                    <option value="maternal">Maternal (माता पक्ष)</option>
                    <option value="generation">Siblings &amp; Youth (भाई-बहन)</option>
                    <option value="inlaws">In-laws (ससुराल पक्ष)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Cultural Custom / Note</label>
                  <input
                    type="text"
                    value={relationForm.culturalNote}
                    onChange={(e) => setRelationForm({ ...relationForm, culturalNote: e.target.value })}
                    placeholder="e.g. Traditional respect or joking customs"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
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
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingId ? 'Update Relation' : 'Add to Relations'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
