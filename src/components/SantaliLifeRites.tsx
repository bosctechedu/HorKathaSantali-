import React, { useState } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { safeLoadFromStorage } from '../utils/storage';
import {
  Heart,
  Baby,
  Sparkles,
  Users,
  Compass,
  Volume2,
  Calendar,
  CheckCircle2,
  Shield,
  Layers,
  Info
} from 'lucide-react';

export interface LifeRite {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  titleHindi: string;
  stageOfLife: 'birth' | 'naming' | 'adulthood' | 'marriage' | 'death_rites';
  stageLabel: string;
  presidingElders: string;
  coreRitualDescription: string;
  socialImportance: string;
  sacredBakherSantali?: string;
  sacredBakherHindi?: string;
  badgeColor: string;
}

export const DEFAULT_LIFE_RITES: LifeRite[] = [
  {
    id: 'janam_chhatiyar',
    nameDevanagari: 'जानाम छठियार',
    nameRoman: 'Janam Chhatiyar',
    titleHindi: 'जन्म शुद्धिकरण एवं कुल में शिशु का औपचारिक प्रवेश',
    stageOfLife: 'birth',
    stageLabel: 'जन्म संस्कार',
    presidingElders: 'दांयी बुढ़ी (धात्री), मांझी हाड़ाम, गोडेत एवं कुल की माताएं',
    coreRitualDescription: 'शिशु के जन्म के बाद परिवार अशुद्ध (छुत) माना जाता है। लड़के के जन्म पर 5वें दिन और लड़की के जन्म पर 3रे या 5वें दिन यह संस्कार होता है। दांयी बुढ़ी शिशु और मां का मुंडन करती है। गांव के नाई या गोडेत द्वारा पुरुष सदस्यों की हजामत बनाई जाती है। सभी सदस्य तालाब में स्नान कर शुद्ध होते हैं।',
    socialImportance: 'इस संस्कार के बाद ही परिवार का चूल्हा और जल सामाजिक रूप से शुद्ध माना जाता है और गांव के लोग उनके घर आना-जाना शुरू करते हैं।',
    sacredBakherSantali: 'हे मारांग बुरु, हे जाहेर एरा! नवा गिदरा अबोवाः सांवता रे बोलेना, सुक-शांति ते हराय मे!',
    sacredBakherHindi: 'हे मारांग बुरु! हे जाहेर एरा! यह नवजात शिशु हमारे समाज में प्रविष्ट हुआ है, इसे सुख-शांति और दीर्घायु प्रदान करें!',
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
  },
  {
    id: 'nim_dah_mandi',
    nameDevanagari: 'निम-दाः मांडी (नामकरण)',
    nameRoman: 'Nim-Dah Mandi',
    titleHindi: 'नीम-जल भात व पूर्वजों के नाम पर नामकरण संस्कार',
    stageOfLife: 'naming',
    stageLabel: 'नामकरण संस्कार',
    presidingElders: 'परिवार के बुजुर्ग, जोग मांझी, गोडेत',
    coreRitualDescription: 'छठियार के दिन ही नीम के पत्तों से उबाला हुआ कड़वा पानी (निम-दाः) तैयार किया जाता है। प्रथम पुत्र का नाम उसके दादा के नाम पर और प्रथम पुत्री का नाम दादी के नाम पर रखा जाता है। कांसे की थाली में जल भरकर उसमें अरवा चावल और दूब घास डालकर नाम की पुष्टि की जाती है। सभी उपस्थित लोगों को नीम-दाः भात खिलाया जाता है।',
    socialImportance: 'संथाली समाज में कोई नया या काल्पनिक नाम नहीं रखा जाता, बल्कि पूर्वजों के नाम को अगली पीढ़ी में जीवित रखा जाता है। यह वंश-श्रृंखला का सम्मान है।',
    sacredBakherSantali: 'हापड़ाव कोवाः ञुतूम ते नवा गिदरा साजावेना, कुल मर्यादा दोहोय मे!',
    sacredBakherHindi: 'पूर्वजों के पावन नाम से इस नवजात को विभूषित किया गया है, यह कुल की मर्यादा को सदा ऊंचा रखे!',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
  },
  {
    id: 'chacho_chhatiyar',
    nameDevanagari: 'चाचो छठियार (नागरिकता संस्कार)',
    nameRoman: 'Chacho Chhatiyar',
    titleHindi: 'वयस्कता, सामाजिक सदस्यता व अंतिम संस्कार का अधिकार',
    stageOfLife: 'adulthood',
    stageLabel: 'सामाजिक वयस्कता',
    presidingElders: 'मांझी हाड़ाम, परगना, नायके, मोड़े होड़ (समस्त ग्राम पंच)',
    coreRitualDescription: 'संथाली समाज का सबसे अनूठा और अनिवार्य संस्कार। इसके बिना किसी भी व्यक्ति को समाज का पूर्ण सदस्य नहीं माना जाता। युवावस्था में प्रवेश पर पूरे गांव की उपस्थिति में मांझी हाड़ाम और बुजुर्गों द्वारा सृष्टि की कथा (सिरजोन काहनी) और संतालों के ऐतिहासिक प्रवास (चाय-चंपा से संताल परगना तक) का वाचन किया जाता है।',
    socialImportance: 'चाचो छठियार होने के बाद ही युवक को विवाह करने, जाहेर थान में पूजा करने, और मृत्यु के बाद संथाली रीति से दाह-संस्कार का अधिकार प्राप्त होता है।',
    sacredBakherSantali: 'नित् दो आम सांवता रेन पूर्ण होड़ बेनावएना, अबोवाः नियम-कनून मानवा मे!',
    sacredBakherHindi: 'अब तुम संथाली समाज के पूर्ण नागरिक बन गए हो, हमारे पारंपरिक नियमों व संस्कृति का पालन करो!',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
  },
  {
    id: 'tel_nahan_shuddhi',
    nameDevanagari: 'तेल नहान (मृत्यु शुद्धि संस्कार)',
    nameRoman: 'Tel Nahan',
    titleHindi: 'शवदाह उपरांत पाद-प्रक्षालन, अस्थि संचय व शुद्धि',
    stageOfLife: 'death_rites',
    stageLabel: 'अंतिम संस्कार',
    presidingElders: 'गोडेत, शवयात्री एवं गांव के पंच',
    coreRitualDescription: 'मृत्यु के बाद शव को वन के श्मशान (मसान थान) में ले जाकर या तो दाह-संस्कार किया जाता है या समाधि दी जाती है। दाह संस्कार के बाद सिर की अस्थि (कपाल की हड्डी) के तीन छोटे टुकड़े पवित्र मिट्टी के बर्तन में संचित किए जाते हैं। श्मशान से लौटकर सभी सदस्य तेल और नीम के पत्तों से स्नान कर शुद्ध होते हैं।',
    socialImportance: 'प्रकृति से लिया गया शरीर पुनः पंचतत्व और मिट्टी में विलीन हो जाता है। मृत्यु के समय भी सादगी और स्वच्छता का कठोर पालन होता है।',
    sacredBakherSantali: 'धूरि हासारे हासा मिलावेना, जीवी दो ठाकुर जिउ ठीन रुआड़ेना!',
    sacredBakherHindi: 'मिट्टी का शरीर मिट्टी में मिल गया, और पवित्र आत्मा परमात्मा ठाकुर जिउ के पास लौट गई!',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
  },
  {
    id: 'bhandan_sanskar',
    nameDevanagari: 'भांडान संस्कार (पितृ मिलन)',
    nameRoman: 'Bhandan Sanskar',
    titleHindi: 'महाश्राद्ध एवं पूर्वज आत्माओं (हाड़ाम-बुढ़ी) के साथ महामिलन',
    stageOfLife: 'death_rites',
    stageLabel: 'पितृ मुक्ति संस्कार',
    presidingElders: 'नायके, मांझी हाड़ाम, देश परगना, समस्त रिश्तेदार',
    coreRitualDescription: 'मृत्यु के कुछ माह या वर्ष के भीतर आयोजित होने वाला अंतिम महाश्राद्ध। संचित अस्थियों को पवित्र दामोदर नदी (नायके दाः / तेतुलिया) में विसर्जित किया जाता है। गांव में बकरा या बैल का भोज होता है। नायके द्वारा घर के भीतर पवित्र स्थान "भितार" में मृत आत्मा का आह्वान कर उसे कुल के पूर्वजों (हाड़ाम-बुढ़ी) की श्रेणी में स्थापित किया जाता है।',
    socialImportance: 'भांडान के बाद मृत व्यक्ति भूत या भटका हुआ नहीं रहता, बल्कि वह घर का पूजनीय पितृदेव बन जाता है जो परिवार की रक्षा करता है।',
    sacredBakherSantali: 'हे हापड़ाव को! नवा मारांग होड़ पे सांव मिदेना, ओड़ाक-दुआर रे नजर दोहोय पे!',
    sacredBakherHindi: 'हे पूज्य पूर्वजों! यह नया सदस्य अब आपके साथ एक हो गया है, हमारे घर-आंगन पर सदा अपनी कृपा दृष्टि बनाए रखें!',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
  }
];

export const SantaliLifeRites: React.FC = () => {
  const [rites] = useState<LifeRite[]>(() =>
    safeLoadFromStorage('hor_katha_cms_life_rites', DEFAULT_LIFE_RITES)
  );
  const [selectedRite, setSelectedRite] = useState<LifeRite>(rites[0]);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-rose-950 to-amber-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-rose-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-200 border border-rose-400/30">
              <Heart className="w-4 h-4 text-rose-300" />
              <span>जानाम खोन गुजुः धबीज • संथाली जीवन-संस्कार एवं पितृ दर्शन</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              संथाली जीवन-संस्कार दर्शन (The Sacred Life Rites)
            </h1>
            <p className="text-rose-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              जानाम छठियार, निम-दाः मांडी, चाचो छठियार (नागरिकता), तेल नहान एवं भांडान—जन्म से लेकर मृत्यु और पूर्वज पितरों (हाड़ाम-बुढ़ी) के साथ महामिलन तक संथाली समाज की पवित्र संस्कार यात्रा।
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 self-start md:self-auto">
            <Users className="w-6 h-6 text-rose-300" />
            <div>
              <p className="text-xs text-rose-200">पवित्र संस्कार</p>
              <p className="text-lg font-black text-white">{rites.length} जीवन चरण</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Cards & Active Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rites.map((rite) => {
            const isSelected = selectedRite.id === rite.id;
            return (
              <div
                key={rite.id}
                onClick={() => setSelectedRite(rite)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer bg-white text-left flex flex-col justify-between shadow-xs ${
                  isSelected
                    ? 'border-rose-700 ring-2 ring-rose-600/20 shadow-md scale-[1.01]'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${rite.badgeColor}`}>
                      {rite.stageLabel}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakWithFemaleVoice(rite.nameDevanagari);
                      }}
                      className="p-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-800 cursor-pointer"
                      title="संस्कार नाम सुनें"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 tracking-tight">
                    {rite.nameDevanagari}
                  </h3>
                  <p className="text-xs font-semibold text-rose-800 mb-1">
                    {rite.nameRoman}
                  </p>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {rite.coreRitualDescription}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 truncate max-w-[150px]">{rite.presidingElders.split(',')[0]}</span>
                  <span className="text-rose-800 font-bold hover:underline">
                    विधान देखें →
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
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${selectedRite.badgeColor}`}>
                {selectedRite.stageLabel}
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                {selectedRite.nameDevanagari}
              </h2>
              <p className="text-sm font-bold text-rose-800">
                {selectedRite.nameRoman} ({selectedRite.titleHindi})
              </p>
            </div>
            <button
              onClick={() => speakWithFemaleVoice(selectedRite.nameDevanagari)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <Volume2 className="w-4 h-4" />
              <span>उच्चारण</span>
            </button>
          </div>

          {/* Presiding Elders */}
          <div className="bg-rose-50/50 p-3.5 rounded-2xl border border-rose-100 text-xs space-y-1">
            <p className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> मुख्य संचालक व बुजुर्ग (Presiding Elders)
            </p>
            <p className="font-bold text-slate-800">{selectedRite.presidingElders}</p>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-rose-700" /> मुख्य विधि-विधान व परंपरा
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              {selectedRite.coreRitualDescription}
            </p>
          </div>

          {/* Importance */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              सामाजिक व सांस्कृतिक महत्व
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedRite.socialImportance}
            </p>
          </div>

          {/* Sacred Bakher Prayer */}
          {selectedRite.sacredBakherSantali && (
            <div className="bg-gradient-to-r from-rose-50 to-amber-50 p-4 rounded-2xl border border-rose-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-rose-900 uppercase">पवित्र बाखेर (प्रार्थना मंत्र)</span>
                <button
                  onClick={() => speakWithFemaleVoice(selectedRite.sacredBakherSantali || '')}
                  className="p-1 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 cursor-pointer"
                  title="बाखेर मंत्र सुनें"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs font-bold text-slate-900 italic">
                "{selectedRite.sacredBakherSantali}"
              </p>
              <p className="text-[11px] text-slate-600">
                हिंदी भावार्थ: {selectedRite.sacredBakherHindi}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
