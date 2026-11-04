import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  Scale,
  Coins,
  Calculator,
  RotateCcw,
  Volume2,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Info,
  ShoppingBag,
  Sparkles,
  ArrowRightLeft,
  Store
} from 'lucide-react';

export interface MeasureUnit {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  category: 'grain_volume' | 'land_area' | 'counting_base20' | 'haat_barter';
  categoryLabel: string;
  metricEquivalent: string;
  conversionInPai: number; // e.g. 1 Pai = 1, Katha = 4, Gauni = 20, Khandi = 80
  approxKg: number; // e.g. 1 Pai ~ 0.55 kg rice
  description: string;
  culturalUsage: string;
  materialMadeOf?: string;
}

export const DEFAULT_MEASURE_UNITS: MeasureUnit[] = [
  {
    id: 'measure_pai',
    nameDevanagari: 'पाय (Pai)',
    nameRoman: 'Pai',
    category: 'grain_volume',
    categoryLabel: 'अन्न व द्रव माप',
    metricEquivalent: 'लगभग 500 ग्राम से 600 ग्राम सूखा धान / अनाज',
    conversionInPai: 1,
    approxKg: 0.55,
    description: 'संताली समाज की सबसे मौलिक और प्रामाणिक नाप इकाई। यह साल या शीशम की लकड़ी को भीतर से खोखला कर या पीतल/कांसे से सुंदर नक्काशीदार पात्र के रूप में बनाया जाता है।',
    culturalUsage: 'दैनिक भोजन पकाने हेतु चावल नापने, हाट-बाजार में दाल-अनाज की बिक्री और पाहन को दान देने का आधारभूत पैमाना।',
    materialMadeOf: 'साल की लकड़ी अथवा ढलवां पीतल (कांसा)'
  },
  {
    id: 'measure_katha',
    nameDevanagari: 'कथा / पाइला (Katha)',
    nameRoman: 'Katha / Paila',
    category: 'grain_volume',
    categoryLabel: 'अन्न व द्रव माप',
    metricEquivalent: '4 पाय = 1 कथा (लगभग 2.2 से 2.5 किलोग्राम)',
    conversionInPai: 4,
    approxKg: 2.3,
    description: 'चार पाय के बराबर का काष्ठ पात्र। गांव में लेन-देन और खेत में मजदूरों के दैनिक दाका-मांडी (पारिश्रमिक) के भुगतान के लिए प्रयुक्त होता है।',
    culturalUsage: 'बापला (विवाह) में नेग-जोग के समय वर-वधू पक्ष के बीच धान आदान-प्रदान में मानक पैमाना।',
    materialMadeOf: 'नक्काशीदार काष्ठ अथवा बांस की टोकरी'
  },
  {
    id: 'measure_gauni',
    nameDevanagari: 'गौनी (Gauni)',
    nameRoman: 'Gauni',
    category: 'grain_volume',
    categoryLabel: 'अन्न व द्रव माप',
    metricEquivalent: '5 कथा या 20 पाय (लगभग 11 से 12 किलोग्राम)',
    conversionInPai: 20,
    approxKg: 11.5,
    description: 'बड़ा पारंपरिक बांस का या पीतल का गोलाकार पात्र। खलिहान (खराय) में धान की मड़ाई के बाद जब अनाज कोठी में भरा जाता है, तब गौनी से गिना जाता है।',
    culturalUsage: 'वर्षभर के अनाज उत्पादन का वार्षिक आकलन इसी से निकाला जाता है।',
    materialMadeOf: 'बांस की मजबूत बुनावट व काष्ठ'
  },
  {
    id: 'measure_khandi',
    nameDevanagari: 'खांडी (Khandi)',
    nameRoman: 'Khandi',
    category: 'grain_volume',
    categoryLabel: 'अन्न व द्रव माप',
    metricEquivalent: '4 गौनी या 20 कथा या 80 पाय (लगभग 45 से 50 किग्रा धान)',
    conversionInPai: 80,
    approxKg: 46.0,
    description: 'संताली थोक अनाज भंडारण की सबसे बड़ी मानक पारंपरिक इकाई (एक पूरी बोरी / झोले के समतुल्य)।',
    culturalUsage: 'बड़े अकाल में सहायता देने, हापड़ाव को श्रद्धांजलि और सामूहिक भोज (भंडान व सोहराय) में खांडी के हिसाब से धान निकाला जाता है।',
    materialMadeOf: 'पुआल की रस्सी (पोड़ा) से बुना बड़ा भंडार थैला'
  },
  {
    id: 'measure_hali',
    nameDevanagari: 'हाल / एक हल जमीन (Hali)',
    nameRoman: 'Hali (Hal)',
    category: 'land_area',
    categoryLabel: 'भूमि व कृषि माप',
    metricEquivalent: 'लगभग 1 बीघा (33 डिसमिल या 1/3 एकड़)',
    conversionInPai: 0,
    approxKg: 0,
    description: 'दो स्वस्थ बैलों की जोड़ी द्वारा सूर्योदय से दोपहर तक जितने भूभाग को जोता जा सके, उसे "मित् हाल हासा" (एक हल जमीन) कहा जाता है।',
    culturalUsage: 'संताली समाज में जमीन का बंटवारा या पैतृक संपत्ति का हिसाब कागजों की जगह "कितने हल की जमीन" से आंका जाता है।',
    materialMadeOf: 'पारंपरिक श्रम-आधारित भू-माप'
  },
  {
    id: 'measure_bisa',
    nameDevanagari: 'बीसा व कोड़ी (Bisa - Base 20)',
    nameRoman: 'Bisa ar Kori',
    category: 'counting_base20',
    categoryLabel: 'पारंपरिक संख्या गणना',
    metricEquivalent: 'मित् बीसी = 20 वस्तुएं / सिर',
    conversionInPai: 0,
    approxKg: 0,
    description: 'संताली भाषा की प्राचीन विगेसिमल (20 आधारित) गणना प्रणाली। 1 बीसी = 20, 2 बीसी = 40 (बार बीसी)।',
    culturalUsage: 'मवेशियों, बकरियों और हाट में महुआ व आम नापने के लिए उंगलियों और पोरों पर 20-20 का समूह बनाकर गिना जाता है।',
    materialMadeOf: 'दैनिक मौखिक गणित'
  },
  {
    id: 'measure_poda_barter',
    nameDevanagari: 'पोड़ा व हाट-बदल (Hat-Badal Barter)',
    nameRoman: 'Pora ar Hat-Badal',
    category: 'haat_barter',
    categoryLabel: 'हाट व विनिमय प्रणाली',
    metricEquivalent: 'अनाज के बदले नमक, तेल, मिट्टी के बर्तन व वस्त्र विनिमय',
    conversionInPai: 0,
    approxKg: 0,
    description: 'मुद्रा के बिना धान को सार्वभौमिक विनिमय माध्यम बनाकर साप्ताहिक हाट (हटिया) में सामान बदलना। 1 पाय धान देकर 1 पाय नमक या सब्जी प्राप्त की जाती थी।',
    culturalUsage: 'सामुदायिक सद्भाव और बिना शोषण के जरूरतमंदों के बीच समतामूलक व्यापार।',
    materialMadeOf: 'पारस्परिक विश्वास व सादगी'
  }
];

export const SantaliTraditionalMeasures: React.FC = () => {
  const { isAdmin } = useAdmin();
  const STORAGE_KEY = 'hor_katha_measures_db';

  const [units, setUnits] = useState<MeasureUnit[]>(() => {
    return safeLoadFromStorage(STORAGE_KEY, DEFAULT_MEASURE_UNITS);
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedUnit, setSelectedUnit] = useState<MeasureUnit>(units[0]);

  // Converter State
  const [calcAmount, setCalcAmount] = useState<number>(4);
  const [calcUnitId, setCalcUnitId] = useState<string>('measure_katha');

  // Admin Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<MeasureUnit | null>(null);
  const [formData, setFormData] = useState<Partial<MeasureUnit>>({});

  const saveUnits = (updated: MeasureUnit[]) => {
    setUnits(updated);
    safeSaveToStorage(STORAGE_KEY, updated);
  };

  // Calculator computations
  const currentCalcUnit = units.find((u) => u.id === calcUnitId) || units[0];
  const calculatedTotalPai = calcAmount * (currentCalcUnit.conversionInPai || 1);
  const calculatedTotalKg = (calcAmount * (currentCalcUnit.approxKg || 0.55)).toFixed(1);
  const calculatedFamilyDays = Math.max(1, Math.round(Number(calculatedTotalKg) / 1.5)); // avg 1.5kg grain per day family

  // Admin Actions
  const handleAddNew = () => {
    setEditingUnit(null);
    setFormData({
      id: `measure_${Date.now()}`,
      nameDevanagari: '',
      nameRoman: '',
      category: 'grain_volume',
      categoryLabel: 'अन्न व द्रव माप',
      metricEquivalent: '',
      conversionInPai: 1,
      approxKg: 0.55,
      description: '',
      culturalUsage: '',
      materialMadeOf: ''
    });
    setIsModalOpen(true);
  };

  const handleEdit = (unit: MeasureUnit) => {
    setEditingUnit(unit);
    setFormData(unit);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('क्या आप सचमुच इस नाप-तौल इकाई को हटाना चाहते हैं?')) {
      const updated = units.filter((u) => u.id !== id);
      saveUnits(updated);
      if (selectedUnit?.id === id) {
        setSelectedUnit(updated[0] || null);
      }
    }
  };

  const handleResetToDefault = () => {
    if (confirm('डिफ़ॉल्ट नाप-तौल डेटा रीसेट करें?')) {
      saveUnits(DEFAULT_MEASURE_UNITS);
      setSelectedUnit(DEFAULT_MEASURE_UNITS[0]);
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameDevanagari || !formData.metricEquivalent) return;

    const categoryLabels: Record<string, string> = {
      grain_volume: 'अन्न व द्रव माप',
      land_area: 'भूमि व कृषि माप',
      counting_base20: 'पारंपरिक संख्या गणना',
      haat_barter: 'हाट व विनिमय प्रणाली'
    };

    const readyItem: MeasureUnit = {
      id: editingUnit ? editingUnit.id : `measure_${Date.now()}`,
      nameDevanagari: formData.nameDevanagari || '',
      nameRoman: formData.nameRoman || '',
      category: (formData.category || 'grain_volume') as any,
      categoryLabel: categoryLabels[formData.category || 'grain_volume'] || 'माप',
      metricEquivalent: formData.metricEquivalent || '',
      conversionInPai: Number(formData.conversionInPai) || 1,
      approxKg: Number(formData.approxKg) || 0.5,
      description: formData.description || '',
      culturalUsage: formData.culturalUsage || '',
      materialMadeOf: formData.materialMadeOf || ''
    };

    if (editingUnit) {
      const updated = units.map((u) => (u.id === editingUnit.id ? readyItem : u));
      saveUnits(updated);
      setSelectedUnit(readyItem);
    } else {
      saveUnits([readyItem, ...units]);
      setSelectedUnit(readyItem);
    }
    setIsModalOpen(false);
  };

  const filteredUnits = units.filter((u) => {
    if (activeCategory === 'all') return true;
    return u.category === activeCategory;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-yellow-950 to-orange-950 text-white p-6 sm:p-8 rounded-3xl shadow-md border border-amber-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold backdrop-blur-xs border border-amber-400/30">
              <Scale className="w-3.5 h-3.5" />
              <span>पारंपरिक आदिवासी आर्थिक व विनिमय प्रणाली (Traditional Economy)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-amber-50">
              संताली पारंपरिक नाप-तौल, सिक्का व हाट-बाजार प्रणाली
            </h1>
            <p className="text-sm text-amber-200/90 max-w-2xl leading-relaxed">
              पाय, कथा, गौनी, खांडी से लेकर हाल (एक हल जमीन) और बीसा प्रणाली तक - पूर्वजों की पारदर्शी, प्रकृति-आधारित नाप-तौल, काष्ठ पात्र एवं साप्ताहिक हटिया का विनिमय दर्शन।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => speakWithFemaleVoice('संताली पारंपरिक नाप-तौल, सिक्का व हाट-बाजार प्रणाली')}
              className="px-3.5 py-2 bg-amber-800/60 hover:bg-amber-700/70 border border-amber-600/40 text-amber-100 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Volume2 className="w-4 h-4 text-amber-300" />
              <span>ऑडियो गाइड</span>
            </button>
            {isAdmin && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddNew}
                  className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>नयी इकाई जोड़ें</span>
                </button>
                <button
                  onClick={handleResetToDefault}
                  title="डिफ़ॉल्ट नाप-तौल डेटा रीसेट करें"
                  className="p-2 bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 rounded-xl transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Traditional Converter Calculator */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 border-2 border-amber-300/80 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-700 text-white rounded-xl shadow-xs">
              <Calculator className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-black text-slate-900">
                पारंपरिक नाप-तौल परिवर्तक गणक (Traditional Measure Calculator)
              </h3>
              <p className="text-[11px] text-amber-900 font-semibold">
                पाय, कथा, गौनी अथवा खांडी दर्ज करें और तुरंत आधुनिक किलोग्राम व परिवार उपभोग दिवस देखें
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300 hidden sm:inline-block">
            पारस्परिक अनुपात: 1 खांडी = 4 गौनी = 20 कथा = 80 पाय
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          {/* Input Amount */}
          <div className="sm:col-span-3 space-y-1">
            <label className="text-xs font-bold text-slate-700 block">संख्या / मात्रा (Amount)</label>
            <input
              type="number"
              min="1"
              max="500"
              value={calcAmount}
              onChange={(e) => setCalcAmount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-3 py-2 bg-white border border-amber-300 rounded-xl text-base font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
            />
          </div>

          {/* Unit Selector */}
          <div className="sm:col-span-4 space-y-1">
            <label className="text-xs font-bold text-slate-700 block">पारंपरिक संताली इकाई (Unit)</label>
            <select
              value={calcUnitId}
              onChange={(e) => setCalcUnitId(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-amber-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
            >
              {units
                .filter((u) => u.category === 'grain_volume')
                .map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nameDevanagari} ({u.metricEquivalent})
                  </option>
                ))}
            </select>
          </div>

          {/* Real-time Metric Conversion Outputs */}
          <div className="sm:col-span-5 grid grid-cols-3 gap-2">
            <div className="bg-white p-3 rounded-2xl border border-amber-200 text-center shadow-2xs">
              <span className="text-[10px] font-bold text-slate-500 block uppercase">कुल पाय</span>
              <p className="text-lg font-black text-amber-900">{calculatedTotalPai}</p>
              <span className="text-[10px] text-amber-700 font-semibold">पाय (Pai)</span>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-amber-200 text-center shadow-2xs">
              <span className="text-[10px] font-bold text-slate-500 block uppercase">वजन (किग्रा)</span>
              <p className="text-lg font-black text-emerald-800">~{calculatedTotalKg}</p>
              <span className="text-[10px] text-emerald-700 font-semibold">किलोग्राम</span>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-amber-200 text-center shadow-2xs">
              <span className="text-[10px] font-bold text-slate-500 block uppercase">परिवार राशन</span>
              <p className="text-lg font-black text-rose-800">~{calculatedFamilyDays}</p>
              <span className="text-[10px] text-rose-700 font-semibold">दिन का भात</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'सभी इकाइयां' },
            { id: 'grain_volume', label: 'अन्न व द्रव माप (पाय/कथा)' },
            { id: 'land_area', label: 'भूमि व कृषि माप (हाल)' },
            { id: 'counting_base20', label: 'संख्या गणना (बीसा)' },
            { id: 'haat_barter', label: 'हाट व विनिमय प्रणाली' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {isAdmin && (
          <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300">
            एडमिन संपादन अधिकार सक्रिय
          </span>
        )}
      </div>

      {/* Grid of Measure Units */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUnits.map((unit) => {
          const isSelected = selectedUnit?.id === unit.id;
          return (
            <div
              key={unit.id}
              onClick={() => setSelectedUnit(unit)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 group ${
                isSelected
                  ? 'bg-amber-50/80 border-amber-500 shadow-md ring-2 ring-amber-500/20'
                  : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-amber-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                    {unit.categoryLabel}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakWithFemaleVoice(unit.nameDevanagari);
                      }}
                      className="p-1 rounded text-slate-400 hover:text-amber-800 hover:bg-amber-100 transition-colors"
                      title="उच्चारण"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    {isAdmin && (
                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleEdit(unit)}
                          className="p-1 rounded text-slate-400 hover:text-amber-800 hover:bg-amber-100"
                          title="एडमिन संपादन"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(unit.id)}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-100"
                          title="हटाएं"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-black text-slate-900 group-hover:text-amber-900 transition-colors">
                    {unit.nameDevanagari}
                  </h4>
                  <p className="text-xs font-bold text-amber-800">{unit.nameRoman}</p>
                </div>

                {/* Metric Equivalent Highlight */}
                <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/80 text-xs">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">आधुनिक पैमाना:</span>
                  <p className="font-bold text-amber-950">{unit.metricEquivalent}</p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {unit.description}
                </p>
              </div>

              {/* Cultural Context */}
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                <p><strong>उपयोग:</strong> {unit.culturalUsage}</p>
                {unit.materialMadeOf && (
                  <p className="text-amber-800"><strong>पात्र सामग्री:</strong> {unit.materialMadeOf}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Admin Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-700" />
                <h3 className="text-base font-black text-slate-900">
                  {editingUnit ? 'नाप-तौल इकाई संपादित करें' : 'नयी नाप-तौल इकाई जोड़ें'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">नाम (संताली देवनागरी)</label>
                  <input
                    type="text"
                    required
                    value={formData.nameDevanagari || ''}
                    onChange={(e) => setFormData({ ...formData, nameDevanagari: e.target.value })}
                    placeholder="उदा. पाय (Pai)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">नाम (Roman Script)</label>
                  <input
                    type="text"
                    value={formData.nameRoman || ''}
                    onChange={(e) => setFormData({ ...formData, nameRoman: e.target.value })}
                    placeholder="e.g. Pai"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">श्रेणी (Category)</label>
                  <select
                    value={formData.category || 'grain_volume'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                  >
                    <option value="grain_volume">अन्न व द्रव माप (grain_volume)</option>
                    <option value="land_area">भूमि व कृषि माप (land_area)</option>
                    <option value="counting_base20">संख्या गणना बीसा (counting_base20)</option>
                    <option value="haat_barter">हाट व विनिमय (haat_barter)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">आधुनिक पैमाना / समतुल्यता</label>
                  <input
                    type="text"
                    required
                    value={formData.metricEquivalent || ''}
                    onChange={(e) => setFormData({ ...formData, metricEquivalent: e.target.value })}
                    placeholder="उदा. 4 पाय = 1 कथा (2.3 किग्रा)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">पाय में मान (Conversion in Pai)</label>
                  <input
                    type="number"
                    value={formData.conversionInPai || 1}
                    onChange={(e) => setFormData({ ...formData, conversionInPai: parseFloat(e.target.value) || 1 })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">अनुमानित वजन (किलोग्राम में)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.approxKg || 0.55}
                    onChange={(e) => setFormData({ ...formData, approxKg: parseFloat(e.target.value) || 0.55 })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">विस्तृत विवरण (Description)</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="पारंपरिक पात्र और नाप का तरीका..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">सामाजिक व सांस्कृतिक उपयोग</label>
                  <input
                    type="text"
                    value={formData.culturalUsage || ''}
                    onChange={(e) => setFormData({ ...formData, culturalUsage: e.target.value })}
                    placeholder="उदा. शादी-विवाह व हाट में बिक्री"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">पात्र निर्माण सामग्री (Material)</label>
                  <input
                    type="text"
                    value={formData.materialMadeOf || ''}
                    onChange={(e) => setFormData({ ...formData, materialMadeOf: e.target.value })}
                    placeholder="उदा. साल की लकड़ी या पीतल"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-800 hover:bg-amber-700 text-white rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>सहेजें (Save)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
