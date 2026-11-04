import React, { useState } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  CloudSun,
  Volume2,
  CloudRain,
  Sun,
  Wind,
  Snowflake,
  Flower2,
  Eye,
  Info,
  Sparkles,
  Compass,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface SantaliSeason {
  id: string;
  nameSantaliDev: string;
  nameRoman: string;
  nameHindi: string;
  gregorianMonths: string;
  santaliMonths: string;
  icon: any;
  colorGradient: string;
  temperatureFeel: string;
  natureDescription: string;
  farmingActivities: string;
  culturalFestivals: string;
  weatherSigns: string[];
}

const SANTALI_6_SEASONS: SantaliSeason[] = [
  {
    id: 's1',
    nameSantaliDev: 'सितांग रुतु',
    nameRoman: 'Sitang Rutu',
    nameHindi: 'ग्रीष्म ऋतु (Summer)',
    gregorianMonths: 'मार्च - मई',
    santaliMonths: 'चैत - बैसाख - जेठ',
    icon: Sun,
    colorGradient: 'from-amber-500 to-orange-600',
    temperatureFeel: 'प्रचंड धूप, गर्म लू (लोलो होय), धूल भरी आंधियां',
    natureDescription: 'पलाश और महुआ के वन खिल उठते हैं। नदियों का जल सिमट जाता है और महुआ के फूलों की भीनी-भीनी सुगंध से गांव महक उठता है।',
    farmingActivities: 'खेतों की जुताई (धूरहा सिउक्), खाद डालना और वर्षा पूर्व खेतों की मेढ़बंदी।',
    culturalFestivals: 'दिशोम सेंदरा (सामूहिक वन शिकार), महुआ संग्रह, पाट बोंगा।',
    weatherSigns: [
      'चील पक्षी का आकाश में बहुत ऊंचे चक्कर लगाना गर्म हवा की तीव्रता दर्शाता है।',
      'महुआ के फूलों का भारी मात्रा में गिरना आगामी अच्छी वर्षा का शुभ संकेत माना जाता है।'
    ]
  },
  {
    id: 's2',
    nameSantaliDev: 'जेठ-दाक् रुतु',
    nameRoman: 'Jeth-Dah Rutu',
    nameHindi: 'पूर्व-मानसून काल (Pre-Monsoon / Thunderstorm)',
    gregorianMonths: 'मई - जून',
    santaliMonths: 'जेठ - आषाढ़',
    icon: CloudSun,
    colorGradient: 'from-orange-500 to-amber-700',
    temperatureFeel: 'उमस, मेघ गर्जन (रिमिल साडे), आकाशीय बिजली',
    natureDescription: 'पहला आषाढ़ी मेघ धरती को सींचता है और मिट्टी की सौंधी खुशबू से पूरा संताल परगना महक उठता है।',
    farmingActivities: 'बीज बोने का समय (एरोक् सिम), धान की क्यारियों में बीज का छिड़काव।',
    culturalFestivals: 'एरोक् सिम बोंगा (धान बुआई की पूजा ताकि कीट-पतंगों से फसल बचे)।',
    weatherSigns: [
      'लाल चींटियों का अपने अंडों को नीचे से ऊंचे स्थानों पर ले जाना 24 घंटे में मूसलाधार बारिश का अकाट्य संकेत है।',
      'मेंढकों की सामूहिक तीव्र टर्र-टर्र पहले बादलों को बुलाने का पारंपरिक संदेश है।'
    ]
  },
  {
    id: 's3',
    nameSantaliDev: 'जापानी रुतु (दाक् दिन)',
    nameRoman: 'Japani Rutu',
    nameHindi: 'घोर वर्षा ऋतु (Monsoon)',
    gregorianMonths: 'जुलाई - अगस्त',
    santaliMonths: 'सावन - भादो',
    icon: CloudRain,
    colorGradient: 'from-teal-600 to-blue-700',
    temperatureFeel: 'झमाझम बारिश, ठंडी नम हवा, हरियाली',
    natureDescription: 'नदियां, आहर, बांधी और तालाब जल से लबालब भर जाते हैं। पहाड़ियों से झरने फूट पड़ते हैं।',
    farmingActivities: 'धान की रोपाई (रोहोय), मेढ़ों की निगरानी, मछली पकड़ना (हाकौ साबोक्)।',
    culturalFestivals: 'करम पर्व (भाई-बहन का अमर पर्व), करम डाल की स्थापना, करम लोकगीत।',
    weatherSigns: [
      'टिटिही पक्षी यदि खेत की मेढ़ पर काफी ऊंचाई पर अंडा दे, तो उस वर्ष अत्यधिक वर्षा और बाढ़ आती है।',
      'सांझ के समय पश्चिम दिशा में इन्द्रधनुष (रिमिल मिरु) दिखना वर्षा थमने और धूप निकलने का संकेत है।'
    ]
  },
  {
    id: 's4',
    nameSantaliDev: 'दासांय रुतु',
    nameRoman: 'Dasangy Rutu',
    nameHindi: 'शरद ऋतु (Autumn)',
    gregorianMonths: 'सितम्बर - अक्टूबर',
    santaliMonths: 'आश्विन - कार्तिक',
    icon: Wind,
    colorGradient: 'from-indigo-600 to-slate-800',
    temperatureFeel: 'हल्की सिहरन, नीला साफ आकाश, श्वेत काश के फूल',
    natureDescription: 'नदियों के किनारों पर सफेद काश फूल लहराते हैं। धान के खेत सुनहरे होने लगते हैं।',
    farmingActivities: 'धान में दाना भरना, खेतों की रखवाली, सिंचाई का अंतिम जल संचयन।',
    culturalFestivals: 'दासांय दांड़ा (भुवांग वाद्य के साथ गुरु-चेला नृत्य एवं ऐतिहासिक पूर्वजों की खोज)।',
    weatherSigns: [
      'हपड़ाम कोवाक् डाहार (आकाशगंगा) का उत्तर से दक्षिण स्पष्ट चमकना शांत मौसम का सूचक है।',
      'सुबह-सुबह खेतों में मकड़ी के जालों पर ओस की मोतियां दिखना शीत ऋतु के आगमन की सूचना देता है।'
    ]
  },
  {
    id: 's5',
    nameSantaliDev: 'राभांग रुतु',
    nameRoman: 'Rabhang Rutu',
    nameHindi: 'शीत ऋतु (Winter)',
    gregorianMonths: 'नवंबर - जनवरी',
    santaliMonths: 'अगहन - पौष - माघ',
    icon: Snowflake,
    colorGradient: 'from-cyan-600 to-slate-900',
    temperatureFeel: 'कड़ाके की ठंड (राभांग), कोहरा, सुबह की पाला',
    natureDescription: 'खलिहान सुनहरे धान से भर जाते हैं। आंगन में अलाव (सेंगेल) जलते हैं और मांदर की थाप गूंजती है।',
    farmingActivities: 'धान की कटाई (इर), खलिहान में दंवरी (एनाड़ाक्) और अनाज का भंडारण।',
    culturalFestivals: 'सोहराय महापर्व (गौ-वंदना व प्रकृति आभार), सकरात पर्व (पीठा व तीरंदाजी), माघ सिम।',
    weatherSigns: [
      'धुंध और पाला पड़ने से रबी फसलों (चना, सरसों) को लाभ मिलता है।',
      'जंगल में गिद्धों और जंगली बत्तखों का झुंड दिखना उत्तर से बर्फीली हवाओं की दस्तक है।'
    ]
  },
  {
    id: 's6',
    nameSantaliDev: 'बाहा रुतु',
    nameRoman: 'Baha Rutu',
    nameHindi: 'वसंत ऋतु (Spring)',
    gregorianMonths: 'फरवरी - मार्च',
    santaliMonths: 'माघ - फागुन',
    icon: Flower2,
    colorGradient: 'from-emerald-600 to-teal-800',
    temperatureFeel: 'मनभावन मंद समीर, बसंती खुशबू, सुहाना मौसम',
    natureDescription: 'सखुआ (साल) के पेड़ों पर नए पत्ते और सफेद मंजर लद जाते हैं। कोयल (मिरु) कूकने लगती है।',
    farmingActivities: 'सब्जियों की बुआई, नए पेड़ों का रोपण और वनोपज संग्रह।',
    culturalFestivals: 'बाहा पर्व (संतालियों का वसंतोत्सव), जाहेर थान में साल व महुआ फूलों की प्रथम पूजा।',
    weatherSigns: [
      'सखुआ के पेड़ों का एक साथ नए पत्तों से लद जाना नए वर्ष और उर्वरा शक्ति के पुनर्जन्म का प्रमाण है।'
    ]
  }
];

export const SantaliSeasonsWeatherLore: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState<SantaliSeason>(SANTALI_6_SEASONS[0]);

  const handleSpeak = (text: string) => {
    speakWithFemaleVoice(text, { lang: 'hi-IN', rate: 0.88 });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-sky-950 via-teal-950 to-slate-900 text-white p-6 md:p-8 shadow-xl relative overflow-hidden border border-teal-500/30">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/40 text-xs font-bold uppercase tracking-wider">
            <CloudSun className="w-3.5 h-3.5" />
            <span>दिशोम अबोहवा व ६ रुतु · Indigenous Seasons & Weather Lore</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-teal-100 tracking-tight">
            संताली 6 ऋतुएँ व प्राकृतिक मौसम पूर्वानुमान (Seasons & Weather Signs)
          </h1>

          <p className="text-xs md:text-sm text-teal-200/90 leading-relaxed font-sans">
            सितांग (ग्रीष्म), जापानी (वर्षा), दासांय (शरद), राभांग (शीत), और बाहा (वसंत)—संताली पूर्वजों का मौसम चक्र प्रकृति, पशु-पक्षियों और नक्षत्रों के संकेतों पर आधारित है।
          </p>

          <div className="flex items-center gap-3 pt-1 text-xs text-teal-300">
            <span className="flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>६ संपूर्ण ऋतुएं व कृषि चक्र</span>
            </span>
            <span>•</span>
            <span>देशी मौसम व वर्षा पूर्व-अनुमान</span>
          </div>
        </div>
      </div>

      {/* Season Cards Horizontal Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {SANTALI_6_SEASONS.map((season) => {
          const isSelected = selectedSeason.id === season.id;
          const IconComponent = season.icon;
          return (
            <button
              key={season.id}
              onClick={() => setSelectedSeason(season)}
              className={`p-3.5 rounded-2xl text-left transition-all border flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-white border-teal-500 shadow-md ring-2 ring-teal-400/40 scale-102'
                  : 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
              }`}
            >
              <div className="space-y-1.5">
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${season.colorGradient} text-white flex items-center justify-center shadow-xs`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-black text-slate-900 mt-2">
                  {season.nameSantaliDev}
                </h3>
                <p className="text-[10px] text-teal-700 font-mono font-semibold">
                  {season.nameRoman}
                </p>
              </div>

              <div className="pt-2 mt-2 border-t border-slate-100">
                <span className="text-[10px] text-slate-500 block">
                  {season.gregorianMonths}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Season Deep Breakdown */}
      <div className="bg-white rounded-3xl border border-teal-200/80 p-6 md:p-8 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800">
                {selectedSeason.santaliMonths}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                ({selectedSeason.gregorianMonths})
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              {selectedSeason.nameSantaliDev} — {selectedSeason.nameHindi}
            </h2>
          </div>

          <button
            onClick={() => handleSpeak(`${selectedSeason.nameSantaliDev}. ${selectedSeason.nameHindi}. प्रकृति रूप: ${selectedSeason.natureDescription}. कृषि कार्य: ${selectedSeason.farmingActivities}. पर्व: ${selectedSeason.culturalFestivals}`)}
            className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <Volume2 className="w-4 h-4" />
            <span>ऋतु विवरण सुनें</span>
          </button>
        </div>

        {/* 4 Cards Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1. Nature & Atmosphere */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
            <h4 className="text-xs font-black text-amber-950 flex items-center gap-1.5 uppercase tracking-wide">
              <Sun className="w-4 h-4 text-amber-600" />
              <span>प्रकृति, तापमान व वातावरण (Climate & Nature)</span>
            </h4>
            <p className="text-xs text-amber-900 leading-relaxed font-semibold">
              तापमान: {selectedSeason.temperatureFeel}
            </p>
            <p className="text-xs text-slate-700 leading-relaxed">
              {selectedSeason.natureDescription}
            </p>
          </div>

          {/* 2. Farming & Cultivation */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
            <h4 className="text-xs font-black text-emerald-950 flex items-center gap-1.5 uppercase tracking-wide">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>कृषि कार्य व जीवनचर्या (Agricultural Rhythm)</span>
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {selectedSeason.farmingActivities}
            </p>
          </div>

          {/* 3. Cultural Festivals */}
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-2">
            <h4 className="text-xs font-black text-purple-950 flex items-center gap-1.5 uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>सांस्कृतिक पर्व व अनुष्ठान (Festivals)</span>
            </h4>
            <p className="text-xs text-purple-950 leading-relaxed font-medium">
              {selectedSeason.culturalFestivals}
            </p>
          </div>

          {/* 4. Indigenous Weather Lore Signs */}
          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/80 space-y-2">
            <h4 className="text-xs font-black text-sky-950 flex items-center gap-1.5 uppercase tracking-wide">
              <Eye className="w-4 h-4 text-sky-600" />
              <span>पारंपरिक मौसम व वर्षा के अचूक संकेत (Weather Lore)</span>
            </h4>
            <div className="space-y-1.5">
              {selectedSeason.weatherSigns.map((sign, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                  <span className="text-sky-600 font-bold">•</span>
                  <span>{sign}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
