import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  Compass,
  Landmark,
  Shield,
  Volume2,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export interface GarhSite {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  titleHindi: string;
  clanAssociated: string;
  historicalPeriod: string;
  geographicalLocation: string;
  historicalSignificance: string;
  migrationOrder: number;
  rulingTitle: string;
  badge: string;
}

export const DEFAULT_GARHS_AND_MIGRATION: GarhSite[] = [
  {
    id: 'site_hihiri_pipiri',
    nameDevanagari: 'हियारी-पिपरी (Hihiri-Pipiri)',
    nameRoman: 'Hihiri-Pipiri',
    titleHindi: 'मानव उत्पत्ति व प्रथम शैशव भूमि',
    clanAssociated: 'समस्त संताली मानव जाति',
    historicalPeriod: 'सृष्टि काल (प्रागैतिहासिक आदि-काल)',
    geographicalLocation: 'अहिरी-पिपरिया (प्रशांत महासागरीय / पूर्वोत्तर आदिम उद्गम)',
    historicalSignificance: 'संताली सिरजोन काहनी के अनुसार यहीं हंस-हंसिली के अंडों से पिलचु हाड़ाम व पिलचु बुढ़ी का जन्म हुआ और प्रथम मानव पीढ़ी का विस्तार हुआ।',
    migrationOrder: 1,
    rulingTitle: 'आदि पूर्वज पिलचु हाड़ाम व पिलचु बुढ़ी',
    badge: 'उत्पत्ति स्थल'
  },
  {
    id: 'site_khoj_kaman',
    nameDevanagari: 'खोजकामन (Khoj Kaman)',
    nameRoman: 'Khoj Kaman',
    titleHindi: 'सेंगेल दाक् (अग्नि-वर्षा) व हरता पर्वत गुफा',
    clanAssociated: 'सुरक्षित बचे आदि दंपति',
    historicalPeriod: 'जल-प्रलय व अग्नि-प्रलय काल',
    geographicalLocation: 'हरता पहाड़ की पाषाण गुहा',
    historicalSignificance: 'जब संसार में पाप बढ़ा तो ठाकुर जिउ ने सात दिन-रात आग और खौलते पानी की बारिश की। पिलचु हाड़ाम व बुढ़ी ने हरता गुफा में शरण लेकर मानव वंश को बचाया।',
    migrationOrder: 2,
    rulingTitle: 'हरता पहाड़ रक्षक',
    badge: 'रक्षा स्थल'
  },
  {
    id: 'site_sasan_beda',
    nameDevanagari: 'सासन बेड़ा व जारपी (Sasan Beda)',
    nameRoman: 'Sasan Beda ar Jarpi',
    titleHindi: '१२ पारिस (गोत्रों) का प्रथम औपचारिक विभाजन',
    clanAssociated: '१२ आदि गोत्र (मुर्मू, किस्कू, हेम्ब्रम, मरांडी आदि)',
    historicalPeriod: 'गोत्र-निर्धारण काल',
    geographicalLocation: 'हल्दी (सासांग) की विस्तृत उपजाऊ घाटी',
    historicalSignificance: 'पिलचु हाड़ाम के सात बेटों और सात बेटियों के बीच अटूट रिश्ते तय हुए और भाई-बहन के विवाह पर प्रतिबंध लगाकर १२ बहिर्विवाही गोत्रों की स्थापना हुई।',
    migrationOrder: 3,
    rulingTitle: 'मोड़े होड़ व १२ पारिस नायक',
    badge: 'गोत्र विभाजन'
  },
  {
    id: 'site_chae_garha',
    nameDevanagari: 'चाय गढ़ (Chae Garh)',
    nameRoman: 'Chae Garh',
    titleHindi: 'किस्कू राजाओं का राजधानी गढ़ (शासन केंद्र)',
    clanAssociated: 'किस्कू (Kisku) गोत्र - संताली राजवंश',
    historicalPeriod: 'स्वर्ण युग (चाय-चंपा सभ्यता)',
    geographicalLocation: 'हजारीबाग / चतरा पठार का प्राचीन गढ़',
    historicalSignificance: 'संताली समाज में किस्कू गोत्र को राजा की पदवी प्राप्त थी। चाय गढ़ में न्याय, शासन और प्रजा-पालन का भव्य दरबार चलता था।',
    migrationOrder: 4,
    rulingTitle: 'किस्कू रापाज (राजा)',
    badge: 'राजधानी गढ़'
  },
  {
    id: 'site_champa_garh',
    nameDevanagari: 'चंपा गढ़ (Champa Garh)',
    nameRoman: 'Champa Garh',
    titleHindi: 'मुर्मू पुरोहितों व जाहेर थान का पवित्र आध्यात्मिक गढ़',
    clanAssociated: 'मुर्मू (Murmu) गोत्र - आध्यात्मिक व नायके वर्ग',
    historicalPeriod: 'चंपा साम्राज्य काल',
    geographicalLocation: 'चंपा नदी घाटी / हजारीबाग-दामोदर संगम',
    historicalSignificance: 'संताली इतिहास का सबसे गौरवशाली नगर। यहां पवित्र जाहेर थान, बोंगा-बुरु आराधना और शिक्षा का सबसे बड़ा केंद्र था।',
    migrationOrder: 5,
    rulingTitle: 'मुर्मू नायके व दार्शनिक',
    badge: 'आध्यात्मिक गढ़'
  },
  {
    id: 'site_koynda_garh',
    nameDevanagari: 'कोयंडा गढ़ (Koynda Garh)',
    nameRoman: 'Koynda Garh',
    titleHindi: 'हेम्ब्रम कुंवरों व मंत्रियों का शासन गढ़',
    clanAssociated: 'हेम्ब्रम (Hembram) गोत्र - कुंवर व मंत्री',
    historicalPeriod: 'स्वर्ण युग',
    geographicalLocation: 'बोकारो-गिरिडीह प्राचीन अंचल',
    historicalSignificance: 'हेम्ब्रम गोत्र संताली साम्राज्य में कुंवर, प्रधानमंत्री और कूटनीति के संचालक थे। कोयंडा गढ़ से राज्य की आंतरिक सुरक्षा नियंत्रित होती थी।',
    migrationOrder: 6,
    rulingTitle: 'हेम्ब्रम कुंवर',
    badge: 'कुंवर गढ़'
  },
  {
    id: 'site_badam_garh',
    nameDevanagari: 'बदम गढ़ (Badam Garh)',
    nameRoman: 'Badam Garh',
    titleHindi: 'मरांडी धनपतियों व व्यापार का समृद्ध गढ़',
    clanAssociated: 'मरांडी (Marndi) गोत्र - धनवान व अन्न भंडार',
    historicalPeriod: 'स्वर्ण युग',
    geographicalLocation: 'हजारीबाग के बड़कागांव स्थित बादम का प्राचीन क्षेत्र',
    historicalSignificance: 'मरांडी समाज के अन्नदाता और व्यापारी वर्ग थे। बदम गढ़ में विशाल अन्न कोठियां और हाट-बाजार का विनिमय केंद्र था।',
    migrationOrder: 7,
    rulingTitle: 'मरांडी महाजन व श्रेष्ठी',
    badge: 'व्यापारिक गढ़'
  },
  {
    id: 'site_siri_garh',
    nameDevanagari: 'सिरी गढ़ (Siri Garh)',
    nameRoman: 'Siri Garh',
    titleHindi: 'सोरेन वीर योद्धाओं व सेनापतियों का सैन्य गढ़',
    clanAssociated: 'सोरेन (Soren) गोत्र - सिपाही व धनुर्धर',
    historicalPeriod: 'स्वर्ण युग',
    geographicalLocation: 'दामोदर घाटी का दक्षिणी पहाड़ी अंचल',
    historicalSignificance: 'सोरेन गोत्र संताली सेना का प्रमुख अंग था। सिरी गढ़ से सीमाओं की रक्षा और सेंदरा (शिकार) का सैन्य प्रशिक्षण संचालित होता था।',
    migrationOrder: 8,
    rulingTitle: 'सोरेन सिपाही व सेनापति',
    badge: 'सैन्य गढ़'
  },
  {
    id: 'site_lugu_garh',
    nameDevanagari: 'लुगु गढ़ (Lugu Garh - Lugu Buru)',
    nameRoman: 'Lugu Garh',
    titleHindi: 'टुडू संगीतकारों, शिल्पियों व सांस्कृतिक चिंतन का गढ़',
    clanAssociated: 'टुडू (Tudu) गोत्र - मांदार शिल्पी व संगीतज्ञ',
    historicalPeriod: 'प्राचीन से मध्यकाल',
    geographicalLocation: 'गोमिया बोकारो स्थित लुगुबुरु घांटाबाड़ी',
    historicalSignificance: 'लुगु बाबा के सानिध्य में संताली धर्म, संस्कृति, विवाह नियम और स्वशासन की नियमावली यहीं रची गई थी।',
    migrationOrder: 9,
    rulingTitle: 'टुडू संगीतकार व महतो',
    badge: 'सांस्कृतिक गढ़'
  },
  {
    id: 'site_damin_i_koh',
    nameDevanagari: 'दामिन-इ-कोह व संताल परगना',
    nameRoman: 'Damin-i-Koh (Santhal Pargana)',
    titleHindi: 'संथाल हुल १८५५, भोगनाडीह व आधुनिक संताली मातृभूमि',
    clanAssociated: 'समस्त संताल समाज व हुल वीर',
    historicalPeriod: '१८वीं - १९वीं सदी (ऐतिहासिक हुल काल)',
    geographicalLocation: 'राजमहल की सुरम्य पहाड़ियां, साहिबगंज, दुमका, पाकुड़',
    historicalSignificance: 'हजारों किलोमीटर के प्रवास के बाद संतालों ने अपने पसीने और कुल्हाड़ी से घने जंगलों को उपजाऊ खेतों में बदला। यहीं सिदो-कान्हू ने ऐतिहासिक हुल क्रांति की बिगुल फूंकी।',
    migrationOrder: 10,
    rulingTitle: 'सिदो-कान्हू, चांद-भैरव, फूलो-झानो',
    badge: 'हुल तीर्थ भूमि'
  }
];

export const SantaliHistoricalGarhs: React.FC = () => {
  const { isAdmin } = useAdmin();
  const STORAGE_KEY = 'hor_katha_garhs_db';

  const [garhs, setGarhs] = useState<GarhSite[]>(() => {
    return safeLoadFromStorage(STORAGE_KEY, DEFAULT_GARHS_AND_MIGRATION);
  });

  const [selectedSite, setSelectedSite] = useState<GarhSite>(garhs[0]);
  const [activeTab, setActiveTab] = useState<'timeline' | 'garhs_12'>('timeline');

  // Admin Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSite, setEditingSite] = useState<GarhSite | null>(null);
  const [formData, setFormData] = useState<Partial<GarhSite>>({});

  const saveGarhs = (updated: GarhSite[]) => {
    setGarhs(updated);
    safeSaveToStorage(STORAGE_KEY, updated);
  };

  // Admin Actions
  const handleAddNew = () => {
    setEditingSite(null);
    setFormData({
      id: `garh_${Date.now()}`,
      nameDevanagari: '',
      nameRoman: '',
      titleHindi: '',
      clanAssociated: '',
      historicalPeriod: '',
      geographicalLocation: '',
      historicalSignificance: '',
      migrationOrder: garhs.length + 1,
      rulingTitle: '',
      badge: 'ऐतिहासिक गढ़'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (site: GarhSite) => {
    setEditingSite(site);
    setFormData(site);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('क्या आप सचमुच इस ऐतिहासिक गढ़/पड़ाव को हटाना चाहते हैं?')) {
      const updated = garhs.filter((g) => g.id !== id);
      saveGarhs(updated);
      if (selectedSite?.id === id) {
        setSelectedSite(updated[0] || null);
      }
    }
  };

  const handleResetToDefault = () => {
    if (confirm('डिफ़ॉल्ट १२ गढ़ एवं ऐतिहासिक प्रवास डेटा रीसेट करें?')) {
      saveGarhs(DEFAULT_GARHS_AND_MIGRATION);
      setSelectedSite(DEFAULT_GARHS_AND_MIGRATION[0]);
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameDevanagari || !formData.titleHindi) return;

    const readyItem: GarhSite = {
      id: editingSite ? editingSite.id : `garh_${Date.now()}`,
      nameDevanagari: formData.nameDevanagari || '',
      nameRoman: formData.nameRoman || '',
      titleHindi: formData.titleHindi || '',
      clanAssociated: formData.clanAssociated || '',
      historicalPeriod: formData.historicalPeriod || '',
      geographicalLocation: formData.geographicalLocation || '',
      historicalSignificance: formData.historicalSignificance || '',
      migrationOrder: Number(formData.migrationOrder) || 1,
      rulingTitle: formData.rulingTitle || '',
      badge: formData.badge || 'ऐतिहासिक गढ़'
    };

    if (editingSite) {
      const updated = garhs.map((g) => (g.id === editingSite.id ? readyItem : g));
      saveGarhs(updated);
      setSelectedSite(readyItem);
    } else {
      const updated = [...garhs, readyItem].sort((a, b) => a.migrationOrder - b.migrationOrder);
      saveGarhs(updated);
      setSelectedSite(readyItem);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-red-950 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-md border border-amber-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold backdrop-blur-xs border border-amber-400/30">
              <Compass className="w-3.5 h-3.5" />
              <span>संताली ऐतिहासिक प्रवास व प्राचीन राज्य (Historical Migration & 12 Garhs)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-amber-50">
              संताली ऐतिहासिक प्रवास, १२ प्राचीन गढ़ व राज्य
            </h1>
            <p className="text-sm text-amber-200/90 max-w-2xl leading-relaxed">
              हियारी-पिपरी की आदिम भोर से लेकर चाय-चंपा के १२ अजेय गढ़ों और दामिन-इ-कोह (संताल परगना) के हुल तक — संताली पूर्वजों की अमर ऐतिहासिक यात्रा व गौरव गाथा।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => speakWithFemaleVoice('संताली ऐतिहासिक प्रवास, १२ प्राचीन गढ़ व राज्य')}
              className="px-3.5 py-2 bg-stone-800/80 hover:bg-stone-700 border border-stone-600/40 text-amber-100 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Volume2 className="w-4 h-4 text-amber-300" />
              <span>ऑडियो इतिहास</span>
            </button>
            {isAdmin && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddNew}
                  className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>नया गढ़ जोड़ें</span>
                </button>
                <button
                  onClick={handleResetToDefault}
                  title="डिफ़ॉल्ट डेटा रीसेट करें"
                  className="p-2 bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 rounded-xl transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Timeline List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center justify-between text-xs font-bold">
            <span className="text-slate-700">
              ऐतिहासिक पड़ाव व गढ़ सूची: {garhs.length} स्थल
            </span>
            {isAdmin && (
              <span className="text-[10px] text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300">
                एडमिन मोड सक्रिय
              </span>
            )}
          </div>

          <div className="space-y-3 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-amber-200">
            {garhs.map((site, index) => {
              const isSelected = selectedSite?.id === site.id;
              return (
                <div
                  key={site.id}
                  onClick={() => setSelectedSite(site)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative pl-12 group flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-50/90 border-amber-600 shadow-sm ring-2 ring-amber-500/20'
                      : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-amber-300'
                  }`}
                >
                  {/* Timeline Node Badge */}
                  <div className={`absolute left-3 top-4 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-all ${
                    isSelected ? 'bg-amber-700 border-white text-white shadow-sm' : 'bg-white border-amber-600 text-amber-900'
                  }`}>
                    {index + 1}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                        {site.badge}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakWithFemaleVoice(site.nameDevanagari);
                        }}
                        className="p-1 rounded text-slate-400 hover:text-amber-800 hover:bg-amber-100 transition-colors"
                        title="उच्चारण"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <h4 className="text-base font-black text-slate-900 group-hover:text-amber-900 transition-colors">
                        {site.nameDevanagari}
                      </h4>
                      <p className="text-xs font-bold text-amber-800">{site.nameRoman}</p>
                      <p className="text-[11px] text-slate-500 font-semibold">{site.titleHindi}</p>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {site.historicalSignificance}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-amber-900 font-semibold flex items-center gap-1 truncate max-w-[170px]">
                      <MapPin className="w-3 h-3 text-amber-700" /> {site.geographicalLocation}
                    </span>

                    {isAdmin && (
                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleEdit(site)}
                          className="p-1 rounded text-slate-400 hover:text-amber-800 hover:bg-amber-100"
                          title="एडमिन संपादन"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(site.id)}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-100"
                          title="हटाएं"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Site Detail Showcase (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {selectedSite && (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-4 sticky top-24">
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                    क्रम #{selectedSite.migrationOrder} · {selectedSite.badge}
                  </span>
                  <h2 className="text-xl font-black text-slate-900 mt-1">
                    {selectedSite.nameDevanagari}
                  </h2>
                  <p className="text-xs font-bold text-amber-800">
                    {selectedSite.nameRoman} ({selectedSite.titleHindi})
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => speakWithFemaleVoice(`${selectedSite.nameDevanagari}. ${selectedSite.historicalSignificance}`)}
                    className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 transition-all cursor-pointer shadow-xs"
                    title="उच्चारण व इतिहास सुनें"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => handleEdit(selectedSite)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
                      title="एडमिन संपादन"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Clan & Ruling Class */}
              <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200 text-xs space-y-1">
                <span className="font-bold text-amber-950 uppercase text-[11px] flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-amber-800" /> संबद्ध गोत्र व पदवी (Clan & Role):
                </span>
                <p className="font-bold text-slate-900">{selectedSite.clanAssociated}</p>
                <p className="text-amber-800 text-[11px] font-semibold">{selectedSite.rulingTitle}</p>
              </div>

              {/* Historical Significance */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" /> ऐतिहासिक संदर्भ व लोक-स्मृति
                </span>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  {selectedSite.historicalSignificance}
                </p>
              </div>

              {/* Geographic Location & Period */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">भौगोलिक स्थान:</span>
                  <p className="font-bold text-stone-900">{selectedSite.geographicalLocation}</p>
                </div>
                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">कालखंड:</span>
                  <p className="font-bold text-stone-900">{selectedSite.historicalPeriod}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Admin Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-700" />
                <h3 className="text-base font-black text-slate-900">
                  {editingSite ? 'ऐतिहासिक स्थल संपादित करें' : 'नया ऐतिहासिक गढ़ जोड़ें'}
                </h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">नाम (संताली देवनागरी)</label>
                  <input
                    type="text"
                    required
                    value={formData.nameDevanagari || ''}
                    onChange={(e) => setFormData({ ...formData, nameDevanagari: e.target.value })}
                    placeholder="उदा. चाय गढ़ (Chae Garh)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">नाम (Roman Script)</label>
                  <input
                    type="text"
                    value={formData.nameRoman || ''}
                    onChange={(e) => setFormData({ ...formData, nameRoman: e.target.value })}
                    placeholder="e.g. Chae Garh"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">हिंदी शीर्षक</label>
                  <input
                    type="text"
                    required
                    value={formData.titleHindi || ''}
                    onChange={(e) => setFormData({ ...formData, titleHindi: e.target.value })}
                    placeholder="उदा. किस्कू राजाओं का राजधानी गढ़"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">संबद्ध गोत्र (Clan)</label>
                  <input
                    type="text"
                    value={formData.clanAssociated || ''}
                    onChange={(e) => setFormData({ ...formData, clanAssociated: e.target.value })}
                    placeholder="उदा. किस्कू गोत्र (राजा वर्ग)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">भौगोलिक स्थान</label>
                  <input
                    type="text"
                    value={formData.geographicalLocation || ''}
                    onChange={(e) => setFormData({ ...formData, geographicalLocation: e.target.value })}
                    placeholder="उदा. हजारीबाग / चतरा पठार"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">प्रवास क्रम (Order)</label>
                  <input
                    type="number"
                    value={formData.migrationOrder || 1}
                    onChange={(e) => setFormData({ ...formData, migrationOrder: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">विस्तृत ऐतिहासिक महत्व</label>
                <textarea
                  rows={3}
                  required
                  value={formData.historicalSignificance || ''}
                  onChange={(e) => setFormData({ ...formData, historicalSignificance: e.target.value })}
                  placeholder="संताली लोककथाओं और प्रवास में इस स्थल का क्या महत्व है..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">शासक / नायक पदवी</label>
                  <input
                    type="text"
                    value={formData.rulingTitle || ''}
                    onChange={(e) => setFormData({ ...formData, rulingTitle: e.target.value })}
                    placeholder="उदा. किस्कू रापाज"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">बैज लेबल</label>
                  <input
                    type="text"
                    value={formData.badge || ''}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="उदा. राजधानी गढ़"
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
