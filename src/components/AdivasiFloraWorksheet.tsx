import React, { useState, useEffect } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import {
  TreePine,
  Printer,
  Download,
  Volume2,
  Sparkles,
  FileText,
  Palette,
  CheckCircle2,
  Leaf,
  Edit2,
  Trash2,
  Plus,
  X,
  Save
} from 'lucide-react';

export interface PlantInfo {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  nameHindi: string;
  botanicalName: string;
  culturalSignificance: string;
  medicinalTraditionalUse: string;
  gradient: string;
}

const DEFAULT_SACRED_FLORA: PlantInfo[] = [
  {
    id: 'sarjom',
    nameDevanagari: 'सारजोम',
    nameRoman: 'Sarjom',
    nameHindi: 'सखुआ / साल (Sal Tree)',
    botanicalName: 'Shorea robusta',
    culturalSignificance: 'The supreme sacred tree of Santalis. The sacred grove (Jaher Than) is always a cluster of virgin Sal trees where spirits Jaher Era and Marang Buru reside. No new flower is worn before Baha Parab offerings.',
    medicinalTraditionalUse: 'Resin (Jhuna) used as aromatic incense; leaves sewn into leaf-plates (Patri) for ceremonies; bark extract used for digestive health.',
    gradient: 'from-emerald-700 to-green-800'
  },
  {
    id: 'matkom',
    nameDevanagari: 'मातकोम',
    nameRoman: 'Matkom',
    nameHindi: 'महुआ (Mahua Tree)',
    botanicalName: 'Madhuca longifolia',
    culturalSignificance: 'Revered as the Tree of Life in tribal India. Its sweet blossoms fall at dawn in spring, collected by women and children singing harvest carols.',
    medicinalTraditionalUse: 'Flowers dried as sweet nutritious food; seed oil (Kujri sunum) used as lamp fuel and pain-relieving balm; soothing for coughs.',
    gradient: 'from-amber-600 to-orange-700'
  },
  {
    id: 'karam',
    nameDevanagari: 'काराम',
    nameRoman: 'Karam',
    nameHindi: 'करम वृक्ष (Karam Tree)',
    botanicalName: 'Haldina cordifolia',
    culturalSignificance: 'Central to the Karam festival. Three branches are harvested with dancing processions and planted in the village Akhra courtyard to pray for family fertility.',
    medicinalTraditionalUse: 'Bark and leaves used in traditional antiseptic poultices for wound healing and fevers.',
    gradient: 'from-lime-600 to-emerald-700'
  },
  {
    id: 'murud',
    nameDevanagari: 'मुरुद',
    nameRoman: 'Murud (Palash)',
    nameHindi: 'पलाश / टेसू (Flame of the Forest)',
    botanicalName: 'Butea monosperma',
    culturalSignificance: 'Fiery crimson blossoms herald the arrival of spring (Baha Parab) and nature renewal. Used to formulate natural festive colors.',
    medicinalTraditionalUse: 'Seeds used in traditional antiparasitic decoctions; flowers boiled for natural eye drops and skin soothers.',
    gradient: 'from-rose-600 to-red-700'
  }
];

export const AdivasiFloraWorksheet: React.FC = () => {
  const { isAdmin } = useAdmin();
  const [activeTab, setActiveTab] = useState<'flora' | 'worksheets'>('flora');
  const [selectedWorksheet, setSelectedWorksheet] = useState<'alphabet' | 'numbers' | 'coloring'>('alphabet');

  // Persistent flora state
  const [floraList, setFloraList] = useState<PlantInfo[]>(() => {
    return safeLoadFromStorage('hor_katha_flora_db', DEFAULT_SACRED_FLORA);
  });

  useEffect(() => {
    safeSaveToStorage('hor_katha_flora_db', floraList);
  }, [floraList]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [plantForm, setPlantForm] = useState<Omit<PlantInfo, 'id' | 'gradient'>>({
    nameDevanagari: '',
    nameRoman: '',
    nameHindi: '',
    botanicalName: '',
    culturalSignificance: '',
    medicinalTraditionalUse: ''
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setPlantForm({
      nameDevanagari: '',
      nameRoman: '',
      nameHindi: '',
      botanicalName: '',
      culturalSignificance: '',
      medicinalTraditionalUse: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (plant: PlantInfo) => {
    setEditingId(plant.id);
    setPlantForm({
      nameDevanagari: plant.nameDevanagari,
      nameRoman: plant.nameRoman,
      nameHindi: plant.nameHindi,
      botanicalName: plant.botanicalName,
      culturalSignificance: plant.culturalSignificance,
      medicinalTraditionalUse: plant.medicinalTraditionalUse
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this sacred plant?')) {
      setFloraList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plantForm.nameRoman || !plantForm.nameHindi) {
      alert('Please fill at least the Plant Name in Roman and Hindi.');
      return;
    }

    if (editingId) {
      setFloraList((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? { ...p, ...plantForm, nameDevanagari: plantForm.nameDevanagari || plantForm.nameRoman }
            : p
        )
      );
    } else {
      const newPlant: PlantInfo = {
        ...plantForm,
        id: `flora_${Date.now()}`,
        nameDevanagari: plantForm.nameDevanagari || plantForm.nameRoman,
        gradient: 'from-emerald-700 to-green-800'
      };
      setFloraList((prev) => [newPlant, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-green-900 text-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider">
              Ecological Heritage &amp; Schooling
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
              Flora &amp; Printables
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mt-1.5 tracking-tight flex items-center gap-2.5">
            <TreePine className="w-7 h-7 text-amber-300" />
            <span>Adivasi Sacred Flora &amp; Printable Worksheets</span>
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 font-medium mt-1">
            Discover sacred forest ecology (Sal, Mahua, Karam) and generate 1-click printable handwriting sheets.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {isAdmin && activeTab === 'flora' && (
            <button
              onClick={handleOpenAdd}
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Add Sacred Plant (वृक्ष जोड़ें)</span>
            </button>
          )}

          {/* Tab Toggle */}
          <div className="flex items-center bg-black/25 p-1 rounded-2xl border border-white/20 shrink-0">
            <button
              onClick={() => setActiveTab('flora')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'flora' ? 'bg-amber-400 text-slate-950 shadow-xs' : 'text-white'
              }`}
            >
              Sacred Trees &amp; Flora ({floraList.length})
            </button>
            <button
              onClick={() => setActiveTab('worksheets')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'worksheets' ? 'bg-amber-400 text-slate-950 shadow-xs' : 'text-white'
              }`}
            >
              Printable Worksheets (PDF)
            </button>
          </div>
        </div>
      </div>

      {/* Mode 1: Flora */}
      {activeTab === 'flora' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {floraList.map((plant) => (
            <div
              key={plant.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 hover:border-emerald-500/50 transition-all flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold italic text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full font-mono">
                    {plant.botanicalName || 'Indigenous Flora'}
                  </span>

                  <div className="flex items-center gap-1">
                    {/* Admin Pen and Trash */}
                    {isAdmin && (
                      <div className="flex items-center gap-0.5 bg-amber-50 p-1 rounded-lg border border-amber-200">
                        <button
                          onClick={() => handleOpenEdit(plant)}
                          className="p-1 text-slate-500 hover:text-amber-700 rounded transition-colors cursor-pointer"
                          title="Edit Sacred Plant"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(plant.id)}
                          className="p-1 text-slate-500 hover:text-rose-600 rounded transition-colors cursor-pointer"
                          title="Delete Sacred Plant"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    <button
                      onClick={() => speakWithFemaleVoice(`${plant.nameHindi}. ${plant.culturalSignificance}`, { lang: 'hi-IN' })}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                      title="Pronounce Plant"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-3xl font-black font-serif text-slate-900 mt-2">
                  {plant.nameDevanagari}
                </h3>
                <p className="text-base font-bold text-emerald-800">{plant.nameRoman}</p>
                <p className="text-xs text-slate-500">{plant.nameHindi}</p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-1">
                  <span className="font-bold text-emerald-950 block">Cultural &amp; Sacred Rituals:</span>
                  <p className="text-slate-700 leading-relaxed">{plant.culturalSignificance}</p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                  <span className="font-bold text-slate-900 block">Traditional Herbal Uses:</span>
                  <p className="text-slate-600 leading-relaxed">{plant.medicinalTraditionalUse}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mode 2: Printable Worksheets */}
      {activeTab === 'worksheets' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Printable Classroom &amp; Study Worksheets
              </h2>
              <p className="text-xs text-slate-500">
                Optimized for standard A4 paper. Click print to save as PDF or print hard copies for students.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-105"
              >
                <Printer className="w-4 h-4" />
                <span>Print Worksheet (A4 PDF)</span>
              </button>
            </div>
          </div>

          {/* Worksheet Selector */}
          <div className="flex gap-2">
            {[
              { id: 'alphabet', label: 'Santali Devanagari Akhar Tracing' },
              { id: 'numbers', label: '० to ९ Numbers Writing' },
              { id: 'coloring', label: 'Sohrai Art Border Coloring' }
            ].map((ws) => (
              <button
                key={ws.id}
                onClick={() => setSelectedWorksheet(ws.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedWorksheet === ws.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {ws.label}
              </button>
            ))}
          </div>

          {/* A4 Printable Paper Canvas Container */}
          <div className="p-8 border-2 border-dashed border-slate-300 rounded-3xl bg-slate-50 flex justify-center">
            <div className="w-full max-w-[210mm] min-h-[297mm] bg-white p-8 shadow-lg border border-slate-200 rounded-sm font-serif print:shadow-none print:border-none print:m-0 print:p-0">
              {/* Sheet Header */}
              <div className="text-center pb-4 border-b-2 border-slate-900 space-y-1">
                <h1 className="text-2xl font-black tracking-tight text-slate-950 uppercase font-sans">
                  BOSC Santali Language Academy
                </h1>
                <p className="text-xs font-semibold text-slate-600 font-sans">
                  Student Name: _____________________ | Date: ____________ | Grade: ________
                </p>
                <p className="text-sm font-black text-amber-800">
                  {selectedWorksheet === 'alphabet' && 'Santali Devanagari Akhar Tracing Sheet'}
                  {selectedWorksheet === 'numbers' && 'Santali Devanagari Numerals ० to ९ Handwriting Exercise'}
                  {selectedWorksheet === 'coloring' && 'Sohrai Forest & Peacock Mural Coloring Canvas'}
                </p>
              </div>

              {/* Sheet Content */}
              {selectedWorksheet === 'alphabet' && (
                <div className="grid grid-cols-5 gap-3 pt-6">
                  {['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'स', 'ह', 'ड़', 'ढ़'].map((char, i) => (
                    <div key={i} className="border-2 border-slate-300 rounded-xl p-3 text-center space-y-1">
                      <div className="text-3xl font-black text-slate-900">{char}</div>
                      <div className="text-2xl font-normal text-slate-300 tracking-widest select-none">
                        {char} {char}
                      </div>
                      <div className="border-b border-dotted border-slate-400 mt-2"></div>
                    </div>
                  ))}
                </div>
              )}

              {selectedWorksheet === 'numbers' && (
                <div className="grid grid-cols-2 gap-4 pt-6">
                  {[
                    { num: '', roman: '0 - Soonya (Zero)' },
                    { num: '', roman: '1 - Mit (One)' },
                    { num: '', roman: '2 - Bar (Two)' },
                    { num: '', roman: '3 - Pe (Three)' },
                    { num: '', roman: '4 - Pun (Four)' },
                    { num: '', roman: '5 - More (Five)' },
                    { num: '', roman: '6 - Turuy (Six)' },
                    { num: '', roman: '7 - Eyae (Seven)' },
                    { num: '', roman: '8 - Iral (Eight)' },
                    { num: '', roman: '9 - Are (Nine)' }
                  ].map((item, idx) => (
                    <div key={idx} className="border border-slate-300 rounded-xl p-4 flex items-center justify-between">
                      <div className="text-4xl font-black text-slate-900">{item.num}</div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-700 block">{item.roman}</span>
                        <div className="text-xl text-slate-300 tracking-widest pt-1">
                          {item.num} {item.num} {item.num}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedWorksheet === 'coloring' && (
                <div className="pt-8 text-center space-y-6">
                  <div className="w-full h-80 border-4 border-dashed border-slate-400 rounded-3xl flex flex-col items-center justify-center p-6 bg-slate-50/50">
                    <span className="text-7xl">🦚 🌿 🐘</span>
                    <p className="text-base font-bold text-slate-700 mt-4">
                      Sohrai Folk Animal Motif Drawing
                    </p>
                    <p className="text-xs text-slate-500 max-w-md mt-1">
                      Color this sacred peacock, sal branch, and cattle symbol with natural red, ochre, and black earth pigments.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-xs font-bold text-slate-600">
                    <div className="border border-slate-300 p-2 rounded-xl">Hasur (Yellow Ochre)</div>
                    <div className="border border-slate-300 p-2 rounded-xl">Ghasia (Red Clay)</div>
                    <div className="border border-slate-300 p-2 rounded-xl">Kadam (Black Charcoal)</div>
                  </div>
                </div>
              )}

              {/* Sheet Footer */}
              <div className="pt-10 mt-8 border-t border-slate-200 text-center text-[10px] text-slate-400 font-sans">
                Printed from Hor Katha Suite (BOSC Tech &amp; Edu) · Free for Tribal Schools &amp; Adivasi Literacy Programs
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SACRED PLANT ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 overflow-y-auto max-h-[92vh] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <TreePine className="w-5 h-5 text-emerald-600" />
                <span>{editingId ? 'Edit Sacred Plant' : 'Add Sacred Plant (पवित्र वृक्ष जोड़ें)'}</span>
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
                <label className="font-bold text-slate-700 block mb-1">Plant Name in Roman Script *</label>
                <input
                  type="text"
                  required
                  value={plantForm.nameRoman}
                  onChange={(e) => setPlantForm({ ...plantForm, nameRoman: e.target.value })}
                  placeholder="e.g. Sarjom / Matkom / Karam..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Plant Name in Santali Devanagari (संताली देवनागरी)</label>
                <input
                  type="text"
                  value={plantForm.nameDevanagari}
                  onChange={(e) => setPlantForm({ ...plantForm, nameDevanagari: e.target.value })}
                  placeholder="e.g. सारजोम / मातकोम..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-serif text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Plant Name in Hindi *</label>
                <input
                  type="text"
                  required
                  value={plantForm.nameHindi}
                  onChange={(e) => setPlantForm({ ...plantForm, nameHindi: e.target.value })}
                  placeholder="e.g. सखुआ / साल (Sal Tree)..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Botanical Name (वानस्पतिक नाम)</label>
                <input
                  type="text"
                  value={plantForm.botanicalName}
                  onChange={(e) => setPlantForm({ ...plantForm, botanicalName: e.target.value })}
                  placeholder="e.g. Shorea robusta / Madhuca longifolia"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Cultural Significance &amp; Rituals</label>
                <textarea
                  rows={2}
                  value={plantForm.culturalSignificance}
                  onChange={(e) => setPlantForm({ ...plantForm, culturalSignificance: e.target.value })}
                  placeholder="e.g. The sacred grove Jaher Than is always a cluster of Sal trees..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Traditional Herbal &amp; Medicinal Uses</label>
                <textarea
                  rows={2}
                  value={plantForm.medicinalTraditionalUse}
                  onChange={(e) => setPlantForm({ ...plantForm, medicinalTraditionalUse: e.target.value })}
                  placeholder="e.g. Resin used as incense, leaves for plates, bark extract for health..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingId ? 'Update Plant' : 'Add to Sacred Flora'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
