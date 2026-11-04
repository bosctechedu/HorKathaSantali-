import React, { useState } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { safeLoadFromStorage } from '../utils/storage';
import {
  TreePine,
  Sparkles,
  Volume2,
  Search,
  HeartPulse,
  Leaf,
  Shield,
  Sun,
  Flame,
  Info,
  CheckCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export interface HerbalPlant {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  nameHindi: string;
  botanicalName: string;
  category: 'digestive' | 'skin_wound' | 'seasonal' | 'vitality' | 'sacred';
  categoryLabel: string;
  traditionalUses: string[];
  preparationMethod: string;
  culturalSignificance: string;
  plantPartsUsed: string;
  gradient: string;
  iconBg: string;
}

export const HERBAL_PLANTS: HerbalPlant[] = [
  {
    id: 'sarjom',
    nameDevanagari: 'सारजोम दारे',
    nameRoman: 'Sarjom Dare',
    nameHindi: 'साल / सखुआ वृक्ष (Shorea robusta)',
    botanicalName: 'Shorea robusta',
    category: 'sacred',
    categoryLabel: 'पवित्र व उदर रोग शामक',
    traditionalUses: [
      'साल की धूप (धुआं) से घर में रोग फैलाने वाले कीटाणुओं का नाश होता है।',
      'साल की छाल का काढ़ा पेचिश और पेट दर्द में रामबाण औषधि माना जाता है।',
      'ताजी टहनियों का दातुन दांतों को मजबूत बनाता है और मसूड़ों के संक्रमण को दूर करता है।'
    ],
    preparationMethod: 'छाल को सुखाकर चूर्ण बनाएं या पानी में उबालकर काढ़ा तैयार करें। राल (धूप) को अंगारों पर जलाएं।',
    culturalSignificance: 'जाहेर थान का सबसे पवित्र वृक्ष, जहां जाहेर एरा का वास माना जाता है। बाहा पर्व पर इसके पुष्पों से ही प्रकृति पूजन आरंभ होता है।',
    plantPartsUsed: 'छाल, राल (धूप), ताजी टहनी, पत्ते व पुष्प',
    gradient: 'from-emerald-700 via-teal-800 to-stone-900',
    iconBg: 'bg-emerald-100 text-emerald-800'
  },
  {
    id: 'matkom',
    nameDevanagari: 'मातकोम दारे',
    nameRoman: 'Matkom Dare',
    nameHindi: 'महुआ वृक्ष (Madhuca longifolia)',
    botanicalName: 'Madhuca longifolia',
    category: 'vitality',
    categoryLabel: 'ऊर्जा, बल व वातनाशक',
    traditionalUses: [
      'महुआ के सूखे फूलों का हलवा/लाटा शारीरिक दुर्बलता और खून की कमी को दूर करता है।',
      'महुआ के बीजों (कुचिला) का तेल गठिया (जोड़ों के दर्द) में मालिश करने से तुरंत आराम देता है।',
      'इसके फूलों का काढ़ा सूखी खांसी और सर्दी-जुकाम में अत्यंत लाभकारी है।'
    ],
    preparationMethod: 'फूलों को धूप में सुखाकर भूनें या दूध/पानी में पकाकर सेवन करें। बीज से पारंपरिक कोल्हू में तेल निकालें।',
    culturalSignificance: 'संताल जीवन का "कल्पवृक्ष"। इसके फूल भोजन, औषधि और सांस्कृतिक पर्वों में अमृत तुल्य माने जाते हैं।',
    plantPartsUsed: 'फूल, बीज (तोड़ी), छाल व पत्तियां',
    gradient: 'from-amber-700 via-orange-800 to-stone-900',
    iconBg: 'bg-amber-100 text-amber-800'
  },
  {
    id: 'karanj',
    nameDevanagari: 'करंज दारे',
    nameRoman: 'Karanj Dare',
    nameHindi: 'करंज / डिंडोरी (Pongamia pinnata)',
    botanicalName: 'Pongamia pinnata',
    category: 'skin_wound',
    categoryLabel: 'त्वचा रोग व कीटाणुनाशक',
    traditionalUses: [
      'करंज तेल खाज, खुजली, दाद और फोड़े-फुंसियों पर लगाने से चमत्कारी लाभ देता है।',
      'गहरे घावों और छिलने पर इसका तेल कीटाणुनाशक एंटीसेप्टिक की तरह काम करता है।',
      'इसकी टहनी से दातुन करने पर पायरिया और दांतों का दर्द जड़ से समाप्त होता है।'
    ],
    preparationMethod: 'बीजों को पीसकर तेल निकालें और सीधे प्रभावित त्वचा पर लगाएं। पत्तों को पीसकर लेप तैयार करें।',
    culturalSignificance: 'आदिवासी घरों में मच्छरों और कीड़ों को दूर रखने के लिए करंज की पत्तियों का धुआं किया जाता है।',
    plantPartsUsed: 'बीज का तेल, पत्तियां, छाल व दातुन',
    gradient: 'from-teal-700 via-cyan-800 to-slate-900',
    iconBg: 'bg-teal-100 text-teal-800'
  },
  {
    id: 'tarop',
    nameDevanagari: 'तारोप दारे',
    nameRoman: 'Tarop Dare',
    nameHindi: 'चिरौंजी / पियार (Buchanania lanzan)',
    botanicalName: 'Buchanania lanzan',
    category: 'vitality',
    categoryLabel: 'शीतलता व पोषण',
    traditionalUses: [
      'चिरौंजी के बीजों की गिरी शरीर को तीव्र ऊर्जा और दिमाग को शक्ति प्रदान करती है।',
      'गर्मी के मौसम में लू और तेज बुखार से रक्षा हेतु इसके फलों का शर्बत पिया जाता है।',
      'इसकी छाल का लेप त्वचा की जलन को तुरंत शांत करता है।'
    ],
    preparationMethod: 'फलों को ताजा खाएं या गिरी को सुखाकर दूध के साथ सेवन करें।',
    culturalSignificance: 'जंगलों में शिकार (सेंदरा) के समय शिकारी ऊर्जा बनाए रखने के लिए तारोप की गिरी साथ रखते थे।',
    plantPartsUsed: 'फल, बीज की गिरी (चिरौंजी) व छाल',
    gradient: 'from-orange-700 via-amber-800 to-stone-900',
    iconBg: 'bg-orange-100 text-orange-800'
  },
  {
    id: 'rola_hesel',
    nameDevanagari: 'रोला-हेसेल',
    nameRoman: 'Rola & Hesel',
    nameHindi: 'हरड़ व बहेड़ा (Terminalia chebula & bellirica)',
    botanicalName: 'Terminalia chebula & Terminalia bellirica',
    category: 'digestive',
    categoryLabel: 'पाचन, गैस व त्रिदोष नाशक',
    traditionalUses: [
      'कब्ज, गैस और बदहजमी में हरड़ के फल का चूर्ण गरम पानी के साथ लेने से पेट तुरंत साफ होता है।',
      'आंवला, हरड़ और बहेड़ा का त्रिफला मिश्रण आंखों की रोशनी बढ़ाता है और शरीर का शोधन करता है।',
      'गले की खराश और खांसी में हरड़ के टुकड़े को मुंह में रखकर चूसने से राहत मिलती है।'
    ],
    preparationMethod: 'पके फलों को सुखाकर बारीक कूट लें और त्रिफला या अकेले चूर्ण बनाकर सेवन करें।',
    culturalSignificance: 'आदिवासी वैद्यों (ओझा/कविराज) का सबसे महत्वपूर्ण और प्राचीन औषधीय संयोजन।',
    plantPartsUsed: 'सूखे फल का छिलका व गूदा',
    gradient: 'from-yellow-700 via-amber-800 to-slate-900',
    iconBg: 'bg-yellow-100 text-yellow-800'
  },
  {
    id: 'nim',
    nameDevanagari: 'नीम दारे',
    nameRoman: 'Nim Dare',
    nameHindi: 'नीम (Azadirachta indica)',
    botanicalName: 'Azadirachta indica',
    category: 'skin_wound',
    categoryLabel: 'रक्त शोधक व ज्वरनाशक',
    traditionalUses: [
      'नीम की कोमल पत्तियों को पीसकर पीने से रक्त शुद्ध होता है और मौसमी बुखार नहीं आता।',
      'नीम के उबले पानी से स्नान करने से चेचक, खुजली और त्वचा के सभी विकार समाप्त होते हैं।',
      'नीम दाका (नीम चावल): जन्म संस्कार के समय परिवार की शुद्धि हेतु इसका विशेष आहार बनता है।'
    ],
    preparationMethod: 'कोमल पत्तियों को खाली पेट चबाएं अथवा पानी में उबालकर लेप या स्नान जल में मिलाएं।',
    culturalSignificance: 'संताली समाज में नवजात के जन्म के बाद "नीम दाका" संस्कार अत्यंत पवित्र और अनिवार्य माना जाता है।',
    plantPartsUsed: 'पत्तियां, छाल, फल (निंबोली) व टहनी',
    gradient: 'from-green-700 via-emerald-800 to-stone-900',
    iconBg: 'bg-green-100 text-green-800'
  },
  {
    id: 'murup',
    nameDevanagari: 'मुरुप दारे',
    nameRoman: 'Murup Dare',
    nameHindi: 'पलाश / ढाक (Butea monosperma)',
    botanicalName: 'Butea monosperma',
    category: 'seasonal',
    categoryLabel: 'शीतलता व कृमि नाशक',
    traditionalUses: [
      'पलाश के सुर्ख लाल फूलों का रस गर्मियों में शरीर को ठंडक देता है और लू से बचाता है।',
      'इसके बीजों का चूर्ण पेट के कीड़े (कृमि) को जड़ से समाप्त करता है।',
      'छाल का काढ़ा हड्डियों की मजबूती और सूजन कम करने में सहायक है।'
    ],
    preparationMethod: 'फूलों को रातभर पानी में भिगोकर मसलें और रंगीन शीतल पेय तैयार करें। बीजों को भूनकर चूर्ण बनाएं।',
    culturalSignificance: 'वसंत ऋतु में जब जंगल पलाश के फूलों से आग की तरह लाल हो उठते हैं, तब बाहा पर्व का उल्लास छा जाता है।',
    plantPartsUsed: 'पुष्प, बीज, गोंद (कमरकस) व छाल',
    gradient: 'from-rose-700 via-red-800 to-stone-900',
    iconBg: 'bg-rose-100 text-rose-800'
  }
];

export const SantaliHerbalRemedies: React.FC = () => {
  const [herbalList] = useState<HerbalPlant[]>(() => safeLoadFromStorage('hor_katha_cms_herbal', HERBAL_PLANTS));
  const [selectedPlant, setSelectedPlant] = useState<HerbalPlant>(() => herbalList[0] || HERBAL_PLANTS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredPlants = herbalList.filter((plant) => {
    const matchesSearch =
      plant.nameDevanagari.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.nameRoman.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.nameHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.botanicalName.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeCategory === 'all') return matchesSearch;
    return matchesSearch && plant.category === activeCategory;
  });

  const handleSpeakPlant = (plant: HerbalPlant) => {
    const text = `${plant.nameDevanagari}, ${plant.nameHindi}। वानस्पतिक नाम: ${plant.botanicalName}। उपयोग: ${plant.traditionalUses.join('. ')}। सांस्कृतिक महत्व: ${plant.culturalSignificance}`;
    speakWithFemaleVoice(text, { lang: 'hi-IN' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-emerald-300" />
              रान-रानाब (Ran-Ranab) · वन-औषधि ज्ञान
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/30 text-[11px] font-bold text-emerald-200">
              Indigenous Ethnobotany
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-emerald-100">
            पारंपरिक संताली वन-औषधियां व जड़ी-बूटी ज्ञान
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed font-medium">
            साल, महुआ, करंज, पलाश और चिरौंजी के सदियों पुराने पारंपरिक औषधीय उपयोग, तैयारी की विधि और सांस्कृतिक महत्व।
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleSpeakPlant(selectedPlant)}
            className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Volume2 className="w-4 h-4 text-slate-950" />
            <span>औषधि विवरण सुनें</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'सभी वनस्पतियां (All Plants)' },
            { id: 'sacred', label: 'पवित्र वृक्ष (Sacred)' },
            { id: 'vitality', label: 'ऊर्जा व पोषण (Vitality)' },
            { id: 'digestive', label: 'पाचन व पेट (Digestive)' },
            { id: 'skin_wound', label: 'त्वचा व घाव (Skin/Wounds)' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="वनस्पति या उपयोग खोजें..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
      </div>

      {/* Main Grid: Left List + Right Detail Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Plant Cards */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[680px] overflow-y-auto pr-1">
          {filteredPlants.map((plant) => {
            const isSelected = plant.id === selectedPlant.id;
            return (
              <div
                key={plant.id}
                onClick={() => setSelectedPlant(plant)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-emerald-50/90 border-emerald-400 shadow-sm ring-1 ring-emerald-400/50'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-2xl ${plant.iconBg} flex items-center justify-center font-bold text-base shadow-2xs shrink-0`}
                  >
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-sm sm:text-base">
                      {plant.nameDevanagari}
                    </h3>
                    <p className="text-xs text-emerald-800 font-bold">
                      {plant.nameRoman} · {plant.nameHindi}
                    </p>
                    <span className="text-[10px] text-slate-400 italic">
                      {plant.botanicalName}
                    </span>
                  </div>
                </div>
                <ArrowRight
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'text-emerald-700 translate-x-1' : 'text-slate-300'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Dossier */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-5 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-black uppercase tracking-wider">
                  {selectedPlant.categoryLabel}
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs font-mono text-slate-500 italic">
                  {selectedPlant.botanicalName}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {selectedPlant.nameDevanagari}
              </h2>
              <p className="text-sm sm:text-base font-bold text-emerald-800 mt-0.5">
                {selectedPlant.nameRoman} — {selectedPlant.nameHindi}
              </p>
            </div>

            <button
              onClick={() => handleSpeakPlant(selectedPlant)}
              className="p-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-all hover:scale-105 cursor-pointer shadow-2xs shrink-0"
              title="उच्चारण सुनें"
            >
              <Volume2 className="w-5 h-5 text-emerald-700" />
            </button>
          </div>

          {/* Traditional Medicinal Uses */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-rose-600" />
              <span>पारंपरिक औषधीय गुण व उपयोग (Traditional Medicinal Benefits):</span>
            </h4>
            <div className="space-y-2 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
              {selectedPlant.traditionalUses.map((use, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{use}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preparation & Parts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                <span>तैयारी व सेवन विधि (Preparation):</span>
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {selectedPlant.preparationMethod}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/80 space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-900 flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-teal-600" />
                <span>प्रयुक्त होने वाले अंग (Parts Used):</span>
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {selectedPlant.plantPartsUsed}
              </p>
            </div>
          </div>

          {/* Cultural & Spiritual Significance */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>सांस्कृतिक व धार्मिक महत्व (Cultural Lore):</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
              {selectedPlant.culturalSignificance}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
