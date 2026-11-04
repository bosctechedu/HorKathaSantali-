import React, { useState } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { safeLoadFromStorage } from '../utils/storage';
import {
  Trophy,
  Target,
  Users,
  Compass,
  Volume2,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Shield,
  Activity
} from 'lucide-react';

export interface SportItem {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  nameHindi: string;
  type: 'outdoor_game' | 'hunting_assembly' | 'martial_art';
  typeLabel: string;
  playersCount: string;
  equipment: string;
  seasonOrOccasion: string;
  rulesHindi: string;
  culturalSignificance: string;
  proverbSantali?: string;
  proverbHindi?: string;
  badgeColor: string;
}

export const DEFAULT_SPORTS_ITEMS: SportItem[] = [
  {
    id: 'dishom_sendra',
    nameDevanagari: 'दिशोम सेंन्दरा (लोहबीर शिकार)',
    nameRoman: 'Dishom Sendra',
    nameHindi: 'दिशोम सेंन्दरा (वार्षिक संथाली महा-शिकार व लोहबीर सर्वोच्च न्यायालय)',
    type: 'hunting_assembly',
    typeLabel: 'महा-शिकार व सर्वोच्च सभा',
    playersCount: 'हजारों संथाली युवक व परगना प्रमुख',
    equipment: 'धनुष-बाण (आः आर सार), भाला (बरछा), नगाड़ा (तामाक), सींग का बिगुल (साकोर)',
    seasonOrOccasion: 'वैशाख पूर्णिमा (गर्मी में दलमा व अयोध्या पहाड़ियों पर)',
    rulesHindi: 'सभी गांवों के युवा और बुजुर्ग तीर-धनुष लेकर रात को जंगल में प्रवेश करते हैं। रात के समय जंगल की चोटी पर आग जलाकर संथाली समाज की सर्वोच्च अदालत "लोहबीर बैसी" (Lo Bir Baisi) बैठती है। यहां पूरे वर्ष के ऐसे जटिल सामाजिक व न्यायिक मामलों का फैसला किया जाता है जो सामान्य ग्राम सभाओं में नहीं सुलझ पाते। यहां देश परगना से लेकर आम संताल तक सभी बराबर होते हैं।',
    culturalSignificance: 'संथाली समाज का सर्वोच्च लोकतांत्रिक और प्रकृति-साहस पर्व। यह केवल शिकार नहीं, बल्कि वन संरक्षण, आत्मरक्षा प्रशिक्षण और लोकतंत्र का अनूठा संगम है।',
    proverbSantali: 'लोहबीर रे बानुकू को उसूल-धुरुब, सानाम होड़ मिद जोहार!',
    proverbHindi: 'लोहबीर अदालत में कोई छोटा-बड़ा नहीं, सभी एक समान और एक जोहार से बंधे हैं!',
    badgeColor: 'bg-red-100 text-red-900 border-red-300'
  },
  {
    id: 'kati_khel',
    nameDevanagari: 'काटी खेल (संथाली हॉकी)',
    nameRoman: 'Kati Khel',
    nameHindi: 'काटी खेल (पारंपरिक लकड़ी व बांस की छड़ी का खेल)',
    type: 'outdoor_game',
    typeLabel: 'सामूहिक मैदानी खेल',
    playersCount: '१० से २० खिलाड़ी (दो दल)',
    equipment: 'काटी (अर्धचंद्राकार भारी शीशम की लकड़ी), बांस की मजबूत छड़ी',
    seasonOrOccasion: 'फसल कटाई के बाद (दिसंबर - जनवरी, सोहराय के आसपास)',
    rulesHindi: 'मैदान के दोनों सिरों पर सीमा रेखाएं बनाई जाती हैं। खिलाड़ी अपने पैरों या छड़ी के सहारे अर्धचंद्राकार लकड़ी "काटी" को उछालकर विरोधी दल की लकड़ी को निशाना बनाते हैं। जो दल अधिक बार सटीक निशाना लगाता है, वह विजयी घोषित होता है। खेल के अंत में हारने वाला दल जीतने वाले दल के खिलाड़ियों को पीठ पर लादकर अखड़ा तक ले जाता है।',
    culturalSignificance: 'संथाली युवाओं में संतुलन, शारीरिक सौष्ठव, एकाग्रता और खेल भावना विकसित करने वाला सबसे लोकप्रिय पारंपरिक खेल है।',
    proverbSantali: 'काटी एनिक रे मेद सार लेका, जीवी रे आडी रासका!',
    proverbHindi: 'काटी खेल में आंखें बाण जैसी तीक्ष्ण और हृदय में असीम आनंद भर जाता है!',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
  },
  {
    id: 'aa_sar_archery',
    nameDevanagari: 'आः आर सार (संथाली धनुर्विद्या)',
    nameRoman: 'Aa: Ar Sar (Archery)',
    nameHindi: 'पारंपरिक संथाली तीरंदाजी व अचूक लक्ष्यभेदन',
    type: 'martial_art',
    typeLabel: 'पारंपरिक युद्ध व निशानेबाजी कला',
    playersCount: 'व्यक्तिगत एवं अंतर-ग्राम प्रतियोगिताएं',
    equipment: 'बांस का धनुष (आः), लोहे के नुकीले बाण (सार), तरकस (तुपु)',
    seasonOrOccasion: 'साकरात पर्व (भेजा बिंधा प्रतियोगिता), सोहराय, दिशोम शिकार',
    rulesHindi: 'साकरात पर्व के दूसरे दिन "भेजा बिंधा" (Bheja Bindha) का आयोजन होता है। केले के तने या लकड़ी के खंभे पर एक छोटा लक्ष्य (निशाना) बनाया जाता है। 50 से 100 मीटर की दूरी से संथाली वीर बारी-बारी से बाण चलाते हैं। जो तीरंदाज सटीक केंद्र में तीर मारता है, उसे गांव का मांझी हाड़ाम पगड़ी बांधकर सम्मानित करता है।',
    culturalSignificance: 'संथाली समाज का आत्मरक्षा और स्वाभिमान का प्रतीक। संथाल हुल के समय इसी अचूक तीरंदाजी ने ब्रिटिश बंदूकों और तोपों का सामना किया था।',
    proverbSantali: 'सार आलोम बागीया, सांवता आलोम हिड़ीञा!',
    proverbHindi: 'कभी अपने बाण को मत छोड़ना, कभी अपने संथाली समाज को मत भूलना!',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
  },
  {
    id: 'chhur_khel',
    nameDevanagari: 'छुर खेल (संथाली कबड्डी)',
    nameRoman: 'Chhur Khel',
    nameHindi: 'छुर खेल (चौकोर खानों वाला प्राचीन गति-कौशल खेल)',
    type: 'outdoor_game',
    typeLabel: 'पारंपरिक मैदानी खेल',
    playersCount: '१२ खिलाड़ी (दो दल)',
    equipment: 'मिट्टी पर खींची गई रेखाएं (कोई बाहरी उपकरण नहीं)',
    seasonOrOccasion: 'चांदनी रातें, वसंत ऋतु, युवा उत्सव',
    rulesHindi: 'मिट्टी पर 6 से 8 समानांतर पंक्तियां बनाई जाती हैं। रक्षक दल के खिलाड़ी रेखाओं पर दौड़ते हैं, जबकि आक्रामक दल का खिलाड़ी एक सांस में "छुर... छुर..." बोलते हुए सभी रेखाओं को पार कर अंतिम छोर तक पहुंचकर सुरक्षित वापस आने का प्रयास करता है।',
    culturalSignificance: 'फुर्ती, एकाग्रता, फेफड़ों की क्षमता और टीम वर्क सिखाने वाला प्राचीन संथाली खेल।',
    proverbSantali: 'छुर सांव जांगा दाड़े, मोने रे हापड़ाव दाड़े!',
    proverbHindi: 'छुर खेल से पैरों में गति और मन में संघर्ष की शक्ति पैदा होती है!',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
  },
  {
    id: 'gulli_danda',
    nameDevanagari: 'गुल्ली आर दंडा',
    nameRoman: 'Gulli & Danda',
    nameHindi: 'गुल्ली-डंडा (पारंपरिक ग्रामीण लकड़ी खेल)',
    type: 'outdoor_game',
    typeLabel: 'पारंपरिक खेल',
    playersCount: '४ से १० बच्चे व युवा',
    equipment: 'छोटे सिरों वाली लकड़ी (गुल्ली) और लंबा डंडा (दंडा)',
    seasonOrOccasion: 'ग्रीष्मावकाश, खेतों में मवेशी चराते समय',
    rulesHindi: 'जमीन पर एक छोटा गड्ढा (गच्ची) खोदा जाता है। डंडे से गुल्ली को हवा में उछालकर जोरदार प्रहार किया जाता है। विरोधी दल गुल्ली को लपकने की कोशिश करता है। दूरी को डंडे से नापकर अंक तय किए जाते हैं।',
    culturalSignificance: 'संथाली बालपन और देहाती जीवन की सादगी व उमंग का प्रतीक।',
    proverbSantali: 'गुल्ली दंडा एनिक ते, गिदरा कोवाः जीवी रासका!',
    proverbHindi: 'गुल्ली-डंडा खेलने से बच्चों का मन प्रसन्न और तन चुस्त रहता है!',
    badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
  }
];

export const SantaliTraditionalSports: React.FC = () => {
  const [sports] = useState<SportItem[]>(() =>
    safeLoadFromStorage('hor_katha_cms_sports', DEFAULT_SPORTS_ITEMS)
  );
  const [selectedSport, setSelectedSport] = useState<SportItem>(sports[0]);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-200 border border-emerald-400/30">
              <Trophy className="w-4 h-4 text-emerald-300" />
              <span>सेंन्दरा आर खेल • संथाली पारंपरिक खेल एवं लोहबीर शिकार परंपरा</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              संथाली पारंपरिक खेल एवं शिकार परंपरा (Traditional Sports & Sendra)
            </h1>
            <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              दिशोम सेंन्दरा, काटी खेल, आः आर सार (तीरंदाजी), छुर एवं भेजा बिंधा—संथाली समाज के शौर्य, शारीरिक सौष्ठव और लोहबीर अदालत का गौरवशाली खेल दर्शन।
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 self-start md:self-auto">
            <Target className="w-6 h-6 text-emerald-300" />
            <div>
              <p className="text-xs text-emerald-200">पारंपरिक खेल</p>
              <p className="text-lg font-black text-white">{sports.length} खेल व परंपराएं</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Cards & Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sports.map((sport) => {
            const isSelected = selectedSport.id === sport.id;
            return (
              <div
                key={sport.id}
                onClick={() => setSelectedSport(sport)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer bg-white text-left flex flex-col justify-between shadow-xs ${
                  isSelected
                    ? 'border-emerald-700 ring-2 ring-emerald-600/20 shadow-md scale-[1.01]'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${sport.badgeColor}`}>
                      {sport.typeLabel}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakWithFemaleVoice(sport.nameDevanagari);
                      }}
                      className="p-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 cursor-pointer"
                      title="खेल नाम सुनें"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 tracking-tight">
                    {sport.nameDevanagari}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-800 mb-1">
                    {sport.nameRoman}
                  </p>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {sport.rulesHindi}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 truncate max-w-[140px]">{sport.equipment.split(',')[0]}</span>
                  <span className="text-emerald-800 font-bold hover:underline">
                    नियम देखें →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Active Spotlight */}
        <div className="lg:col-span-5 sticky top-20 bg-white rounded-3xl border border-slate-200 shadow-lg p-6 space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${selectedSport.badgeColor}`}>
                {selectedSport.typeLabel}
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                {selectedSport.nameDevanagari}
              </h2>
              <p className="text-sm font-bold text-emerald-800">
                {selectedSport.nameRoman} ({selectedSport.nameHindi})
              </p>
            </div>
            <button
              onClick={() => speakWithFemaleVoice(selectedSport.nameDevanagari)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <Volume2 className="w-4 h-4" />
              <span>उच्चारण</span>
            </button>
          </div>

          {/* Quick Meta */}
          <div className="grid grid-cols-2 gap-3 bg-emerald-50/50 p-3.5 rounded-2xl border border-emerald-100 text-xs">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase">खिलाड़ियों की संख्या</p>
              <p className="font-bold text-slate-800 mt-0.5">{selectedSport.playersCount}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase">ऋतु / मुख्य अवसर</p>
              <p className="font-bold text-slate-800 mt-0.5 truncate">{selectedSport.seasonOrOccasion}</p>
            </div>
          </div>

          {/* Equipment */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              आवश्यक पारंपरिक खेल सामग्री (Equipment)
            </h4>
            <p className="text-xs font-bold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200">
              {selectedSport.equipment}
            </p>
          </div>

          {/* Rules */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-700" /> खेल के नियम व परंपरा (Rules & Customs)
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed bg-emerald-50/30 p-3.5 rounded-2xl border border-emerald-100">
              {selectedSport.rulesHindi}
            </p>
          </div>

          {/* Significance */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              सांस्कृतिक व सामाजिक दर्शन
            </h4>
            <p className="text-xs text-slate-600">
              {selectedSport.culturalSignificance}
            </p>
          </div>

          {/* Quote */}
          {selectedSport.proverbSantali && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-3.5 rounded-2xl border border-emerald-200 space-y-1">
              <p className="text-[11px] font-bold text-emerald-900 uppercase">पारंपरिक संथाली लोक कहावत</p>
              <p className="text-xs font-bold text-slate-900 italic">
                "{selectedSport.proverbSantali}"
              </p>
              <p className="text-[11px] text-slate-600">
                भावार्थ: {selectedSport.proverbHindi}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
