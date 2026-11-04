import React, { useState } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { safeLoadFromStorage } from '../utils/storage';
import {
  Shield,
  Users,
  Award,
  BookOpen,
  Volume2,
  Search,
  Scale,
  Sparkles,
  TreePine,
  HelpCircle,
  CheckCircle,
  Landmark,
  Compass,
  ArrowRight
} from 'lucide-react';

export interface MajhiRole {
  id: string;
  titleDevanagari: string;
  titleRoman: string;
  titleHindi: string;
  rankLevel: 'village_core' | 'village_support' | 'spiritual' | 'regional' | 'supreme';
  traditionalResponsibilities: string[];
  selectionProcess: string;
  disputeRole: string;
  culturalSaying: string;
  culturalSayingHindi: string;
  iconBg: string;
}

export const MAJHI_ROLES: MajhiRole[] = [
  {
    id: 'majhi_haram',
    titleDevanagari: 'मांझी हाड़ाम',
    titleRoman: 'Majhi Haram',
    titleHindi: 'ग्राम प्रधान / मुखिया (Village Chief & Elder)',
    rankLevel: 'village_core',
    traditionalResponsibilities: [
      'ग्राम सभा (कुलही दुरुप / Kulhi Durup) की अध्यक्षता करना एवं अंतिम सर्वसम्मति निर्णय लेना।',
      'समस्त सामाजिक, वैवाहिक (बापला), और पर्व-त्योहारों (सोहराय, बाहा) का नेतृत्व करना।',
      'गांव में कानून व्यवस्था, सामाजिक शांति एवं एकता का संरक्षण करना।',
      'बाहरी अधिकारियों व अन्य गांवों के साथ गांव का प्रतिनिधित्व करना।'
    ],
    selectionProcess: 'पारंपरिक रूप से गांव के संस्थापक परिवार (हातु बेनवाव) से वंशानुगत अथवा सर्वसम्मति से ग्रामसभा द्वारा चयनित।',
    disputeRole: 'गांव के सभी पारिवारिक, भूमि, और सामाजिक विवादों की निष्पक्ष सुनवाई और न्याय करना।',
    culturalSaying: 'हातु रेन दो मांझी गे मारांग, उनीयाक काथा गे आतो लेका।',
    culturalSayingHindi: 'गांव में मांझी ही सबसे आदरणीय हैं, उनका वचन ही गांव की सामूहिक आवाज है।',
    iconBg: 'from-amber-500 to-orange-600'
  },
  {
    id: 'paranik',
    titleDevanagari: 'परानिक',
    titleRoman: 'Paranik',
    titleHindi: 'उप-प्रधान (Deputy Chief / Executive Assistant)',
    rankLevel: 'village_core',
    traditionalResponsibilities: [
      'मांझी हाड़ाम की अनुपस्थिति में गांव के सभी कर्तव्यों का निर्वहन करना।',
      'विवाद समाधान में मांझी के मुख्य कानूनी सलाहकार के रूप में कार्य करना।',
      'गांव के विकास कार्यों और सामूहिक कार्यक्रमों का समन्वय करना।'
    ],
    selectionProcess: 'मांझी के बाद गांव का दूसरा सबसे वरिष्ठ और अनुभवी सम्मानित व्यक्ति।',
    disputeRole: 'तथ्यों की जांच करना और मांझी को निष्पक्ष निर्णय के लिए परामर्श देना।',
    culturalSaying: 'मांझी तायाोम परानिक, कामी रे दो सोमान।',
    culturalSayingHindi: 'मांझी के बाद परानिक का स्थान है, दोनों गांव की सेवा में बराबर तत्पर रहते हैं।',
    iconBg: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'jog_majhi',
    titleDevanagari: 'जोग मांझी',
    titleRoman: 'Jog Majhi',
    titleHindi: 'युवा संरक्षक व नैतिक शिक्षक (Youth & Moral Guardian)',
    rankLevel: 'village_core',
    traditionalResponsibilities: [
      'गांव के युवक-युवतियों (कोड़ा-कुड़ी) के आचरण, अनुशासन व नैतिक चरित्र की देखरेख करना।',
      'विवाह (बापला) के समस्त सामाजिक विधि-विधानों को सुचारू रूप से संचालित कराना।',
      'सोहराय व बाहा पर्व के दौरान नृत्य-संगीत और अखड़ा (Akhra) की मर्यादा बनाए रखना।'
    ],
    selectionProcess: 'युवाओं द्वारा सम्मानित, चरित्रवान और सांस्कृतिक रीति-रिवाजों का मर्मज्ञ वरिष्ठ व्यक्ति।',
    disputeRole: 'युवाओं और पारिवारिक आचरण से संबंधित विवादों को सुलझाना।',
    culturalSaying: 'जोग मांझी दो गिदरा कोवेन आय़ो-बाबा लेका।',
    culturalSayingHindi: 'जोग मांझी गांव के युवक-युवतियों के लिए माता-पिता के समान मार्गदर्शक हैं।',
    iconBg: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'godet',
    titleDevanagari: 'गोड़ेत',
    titleRoman: 'Godet',
    titleHindi: 'ग्राम संदेशवाहक व व्यवस्थापक (Village Messenger & Herald)',
    rankLevel: 'village_support',
    traditionalResponsibilities: [
      'मांझी के आदेश पर घर-घर जाकर ग्राम सभा (कुलही दुरुप) की सूचना देना।',
      'गांव में पर्व-त्योहारों और आपातकालीन सूचनाओं का ढोल बजाकर तुरंत प्रसारण करना।',
      'अतिथियों और आगंतुकों के आतिथ्य सत्कार की व्यवस्था करना।'
    ],
    selectionProcess: 'सक्रिय, निष्ठावान और पूरे गांव के भूगोल से भली-भांति परिचित नागरिक।',
    disputeRole: 'विवादित पक्षों और गवाहों को बैठक में उपस्थित कराना।',
    culturalSaying: 'गोड़ेताक साड़े आंजोम ते कुलही दुरुप सेटेर।',
    culturalSayingHindi: 'गोड़ेत की पुकार सुनकर ही सभी ग्रामीण न्याय सभा में एकत्रित होते हैं।',
    iconBg: 'from-purple-500 to-violet-600'
  },
  {
    id: 'naike',
    titleDevanagari: 'नायके',
    titleRoman: 'Naike',
    titleHindi: 'मुख्य ग्राम पुजारी (Head Priest & Spiritual Custodian)',
    rankLevel: 'spiritual',
    traditionalResponsibilities: [
      'पवित्र साल कुंज (जाहेर थान / Jaher Than) में बोंगा-बुरु की सामूहिक आराधना करना।',
      'बाहा, सोहराय, और एरोक पर्वों पर गांव की खुशहाली हेतु प्रथम पवित्र आहुति देना।',
      'गांव को प्राकृतिक आपदाओं, बीमारियों और महामारियों से बचाने हेतु प्रार्थना करना।'
    ],
    selectionProcess: 'पवित्र आध्यात्मिक परंपरा के अनुसार पूर्वजों द्वारा चयनित निष्कलंक पुजारी कुल।',
    disputeRole: 'धार्मिक व पवित्र वंदना संबंधी नियमों का मार्गदर्शन करना।',
    culturalSaying: 'नायकेयाक थुम ते जाहेर थान रे बोंगा जोहार।',
    culturalSayingHindi: 'नायके के पावन आशीर्वाद से जाहेर थान में ईश्वर का साक्षात वास होता है।',
    iconBg: 'from-amber-600 to-yellow-600'
  },
  {
    id: 'kudam_naike',
    titleDevanagari: 'कुड़ाम नायके',
    titleRoman: 'Kudam Naike',
    titleHindi: 'सीमांत पुजारी व वन रक्षक (Border & Forest Priest)',
    rankLevel: 'spiritual',
    traditionalResponsibilities: [
      'गांव की बाह्य सीमाओं (सिमाना) और जंगलों के अदृश्य आत्माओं/बोंगा की पूजा करना।',
      'शिकार अभियान (सेंदरा / Sendra) के समय वन्य जीवों और शिकारियों की सुरक्षा हेतु अनुष्ठान करना।',
      'गांव के बाहरी संकटों और बुरी ताकतों से रक्षा हेतु विशेष बोंगा पूजा।'
    ],
    selectionProcess: 'नायके परिवार से अथवा पारंपरिक आध्यात्मिक वंशानुगत प्रक्रिया।',
    disputeRole: 'सीमावर्ती क्षेत्रों और वन संसाधनों से जुड़े मामलों में परामर्श।',
    culturalSaying: 'सिमाना रे कुड़ाम नायके बोंगा कोवे मानावा कोवा।',
    culturalSayingHindi: 'सीमाओं पर कुड़ाम नायके वन-देवियों और प्रकृति शक्तियों को शांत रखते हैं।',
    iconBg: 'from-rose-500 to-pink-600'
  },
  {
    id: 'dishom_pargana',
    titleDevanagari: 'दिशोम परगना',
    titleRoman: 'Dishom Pargana',
    titleHindi: 'परगना प्रमुख / क्षेत्रीय परिषद अध्यक्ष (Regional Council Head)',
    rankLevel: 'regional',
    traditionalResponsibilities: [
      '12 से 20 गांवों (पीढ़ / Pargana) के मांझी हाड़ामों की क्षेत्रीय परिषद का नेतृत्व करना।',
      'अंतर-ग्राम विवादों (Inter-village conflicts) की निष्पक्ष सुनवाई और अपील कोर्ट के रूप में कार्य करना।',
      'संताली समाज की बृहद एकता, सामाजिक नियमों और पारंपरिक संहिताओं का संरक्षण।'
    ],
    selectionProcess: 'क्षेत्र के समस्त गांवों के मांझी हाड़ामों द्वारा लोकतांत्रिक सर्वसम्मति से चुना गया वरिष्ठ नेता।',
    disputeRole: 'जब कोई विवाद ग्राम स्तर पर नहीं सुलझता, तब परगना बैसी में अंतिम निर्णय होता है।',
    culturalSaying: 'मोड़े हातु रेन मांझी दो दिशोम परगना रे।',
    culturalSayingHindi: 'अनेक गांवों के मांझी परगना की छत्रछाया में मिलकर सामाजिक न्याय करते हैं।',
    iconBg: 'from-cyan-600 to-blue-700'
  },
  {
    id: 'lobir_baisi',
    titleDevanagari: 'लोबीर बैसी',
    titleRoman: 'Lobir Baisi',
    titleHindi: 'सर्वोच्च वन परिषद / संताली सुप्रीम कोर्ट (Supreme Forest Council)',
    rankLevel: 'supreme',
    traditionalResponsibilities: [
      'संताल समाज की सर्वोच्च लोकतांत्रिक सभा (Supreme High Court) जो वार्षिक अयोध्या/पारसनाथ सेंदरा (शिकार) के दौरान रात में वन में बैठती है।',
      'कोई भी पद—चाहे दिशोम परगना हो या मांझी—इस सभा में सब बराबर होते हैं।',
      'समाज के सबसे गंभीर नियमों और जटिल मामलों का अंतिम और अपरिवर्तनीय निर्णय।'
    ],
    selectionProcess: 'समस्त संताली समाज के स्वतंत्र नागरिकों की खुली लोकतांत्रिक सहभागिता।',
    disputeRole: 'अंतिम अपील न्यायालय; यहां दिए गए निर्णय के विरुद्ध कोई अपील नहीं होती।',
    culturalSaying: 'लोबीर बैसी रे दो जोतो होड़ सोमान, ओकोय हों बांको बाड़ती।',
    culturalSayingHindi: 'लोबीर बैसी में सब इंसान बराबर हैं, कोई भी राजा या प्रजा नहीं होता।',
    iconBg: 'from-emerald-700 to-stone-900'
  }
];

export const MajhiParganaSystem: React.FC = () => {
  const [rolesList] = useState<MajhiRole[]>(() => safeLoadFromStorage('hor_katha_cms_majhi_roles', MAJHI_ROLES));
  const [selectedRole, setSelectedRole] = useState<MajhiRole>(() => rolesList[0] || MAJHI_ROLES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'village' | 'spiritual' | 'regional'>('all');

  const filteredRoles = rolesList.filter((role) => {
    const matchesSearch =
      role.titleDevanagari.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.titleRoman.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.titleHindi.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === 'village') {
      return matchesSearch && (role.rankLevel === 'village_core' || role.rankLevel === 'village_support');
    }
    if (activeFilter === 'spiritual') {
      return matchesSearch && role.rankLevel === 'spiritual';
    }
    if (activeFilter === 'regional') {
      return matchesSearch && (role.rankLevel === 'regional' || role.rankLevel === 'supreme');
    }
    return matchesSearch;
  });

  const handleSpeakRole = (role: MajhiRole) => {
    const speech = `${role.titleDevanagari}, ${role.titleHindi}. मुख्य कार्य: ${role.traditionalResponsibilities.join('. ')}. पारंपरिक लोकोक्ति: ${role.culturalSayingHindi}`;
    speakWithFemaleVoice(speech, { lang: 'hi-IN' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-800 via-orange-800 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-amber-300" />
              आदिवासी पारंपरिक स्वशासन प्रणाली
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/30 text-[11px] font-bold text-amber-200">
              Traditional Democracy
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-amber-100">
            मांझी परगना शासन व्यवस्था
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed font-medium">
            सदियों पुरानी संताली लोकतांत्रिक व्यवस्था जहां निर्णय सर्वसम्मति, सामाजिक समरसता और प्रकृति प्रेम के आधार पर लिए जाते हैं।
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <button
            onClick={() => handleSpeakRole(selectedRole)}
            className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Volume2 className="w-4 h-4 text-slate-950" />
            <span>ऑडियो सुनें (Listen)</span>
          </button>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2 text-center">
            <span className="text-[10px] uppercase font-bold text-amber-200 block">कुल पद</span>
            <span className="text-base font-black text-white">{MAJHI_ROLES.length} प्रशासनिक पद</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'सभी पद (All Roles)' },
            { id: 'village', label: 'ग्राम प्रशासन (Village Core)' },
            { id: 'spiritual', label: 'धार्मिक/पुजारी (Spiritual)' },
            { id: 'regional', label: 'क्षेत्रीय व सर्वोच्च (Regional & Supreme)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-amber-700 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="पद खोजें..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
        </div>
      </div>

      {/* Main Grid: Left List + Right Detail Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Roles Cards */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[680px] overflow-y-auto pr-1">
          {filteredRoles.map((role) => {
            const isSelected = role.id === selectedRole.id;
            return (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-amber-50/90 border-amber-400 shadow-sm ring-1 ring-amber-400/50'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${role.iconBg} text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0`}
                  >
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-sm sm:text-base">
                      {role.titleDevanagari}
                    </h3>
                    <p className="text-xs text-amber-800 font-bold">
                      {role.titleRoman} · {role.titleHindi}
                    </p>
                  </div>
                </div>
                <ArrowRight
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'text-amber-700 translate-x-1' : 'text-slate-300'
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
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-black uppercase tracking-wider">
                प्रशासनिक स्तर: {selectedRole.rankLevel.toUpperCase()}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                {selectedRole.titleDevanagari}
              </h2>
              <p className="text-sm sm:text-base font-bold text-amber-800 mt-0.5">
                {selectedRole.titleRoman} — {selectedRole.titleHindi}
              </p>
            </div>

            <button
              onClick={() => handleSpeakRole(selectedRole)}
              className="p-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-all hover:scale-105 cursor-pointer shadow-2xs shrink-0"
              title="उच्चारण सुनें"
            >
              <Volume2 className="w-5 h-5 text-amber-700" />
            </button>
          </div>

          {/* Key Responsibilities */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>मुख्य पारंपरिक दायित्व एवं अधिकार (Responsibilities):</span>
            </h4>
            <div className="space-y-2 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
              {selectedRole.traditionalResponsibilities.map((resp, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selection & Dispute Role Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-sky-600" />
                <span>चयन प्रक्रिया (Selection):</span>
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {selectedRole.selectionProcess}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-purple-600" />
                <span>न्याय प्रक्रिया में भूमिका (Disputes):</span>
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {selectedRole.disputeRole}
              </p>
            </div>
          </div>

          {/* Traditional Proverb Quote */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>पारंपरिक संताली लोकोक्ति (Folk Maxim):</span>
            </div>
            <p className="text-sm font-serif font-black text-amber-950">
              “{selectedRole.culturalSaying}”
            </p>
            <p className="text-xs text-slate-600 italic">
              अर्थ: {selectedRole.culturalSayingHindi}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
