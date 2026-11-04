import React, { useState } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { safeLoadFromStorage } from '../utils/storage';
import {
  Landmark,
  Compass,
  MapPin,
  Calendar,
  Volume2,
  Sparkles,
  Search,
  CheckCircle2,
  Train,
  Shield,
  Heart
} from 'lucide-react';

export interface PilgrimageSite {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  titleHindi: string;
  locationState: string;
  districtPlace: string;
  annualFairOrMaha: string;
  historyAndSignificance: string;
  ritualsAndWorship: string;
  howToReach: string;
  sacredRules: string;
  badgeColor: string;
}

export const DEFAULT_PILGRIMAGE_SITES: PilgrimageSite[] = [
  {
    id: 'luguburu_ghantabari',
    nameDevanagari: 'लुगुबुरु घंटाबाड़ी धोरोमगाड़',
    nameRoman: 'Luguburu Ghantabari Dhoromgarh',
    titleHindi: 'संतालों का सर्वोच्च आध्यात्मिक एवं ऐतिहासिक महातीर्थ',
    locationState: 'झारखंड',
    districtPlace: 'ललपनिया, गोमिया (बोकारो जिला)',
    annualFairOrMaha: 'कार्तिक पूर्णिमा (वार्षिक अंतरराष्ट्रीय संथाल महासम्मेलन)',
    historyAndSignificance: 'संथाली धर्म और संस्कृति की सर्वोच्च पावन पीठ। मान्यता है कि यहीं लुगु बाबा (Lugu Baba) के संरक्षण में प्राचीन काल में संथाली पूर्वज ऋषियों ने बैठकर संथाली समाज के जन्म-मृत्यु संस्कार, सामाजिक नियम, गोत्र और प्रकृति-उपासना के सिद्धांतों को लिपिबद्ध व निर्धारित किया था। यहां की पवित्र गुफा में श्रद्धालु नंगे पांव चढ़कर शीश नवाते हैं।',
    ritualsAndWorship: 'कार्तिक पूर्णिमा की पूर्व संध्या से देश-विदेश (भारत, नेपाल, बांग्लादेश, असम, बंगाल, ओडिशा) से लाखों संताल सफेद धोती-चादर व पांची पारहांड पहनकर पवित्र पर्वत की चढ़ाई करते हैं। लुगु बाबा और मारांग बुरु की बाखेर प्रार्थना की जाती है।',
    howToReach: 'गोमिया या बोकारो रेलवे स्टेशन से सड़क मार्ग (लगभग 35 किमी)। रांची हवाई अड्डे से लगभग 110 किमी की दूरी पर स्थित।',
    sacredRules: 'पर्वत पर चढ़ते समय मदिरा व मांसाहार वर्जित है। पूर्ण पवित्रता और सफेद पारंपरिक वस्त्र धारण कर जाना अनिवार्य है।',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
  },
  {
    id: 'bhognadih_sahibganj',
    nameDevanagari: 'भोगनाडीह (हुल तीर्थ)',
    nameRoman: 'Bhognadih (Hul Tirtha)',
    titleHindi: 'संथाल हुल १८५५ की उद्गम भूमि व सिदो-कान्हू का जन्मस्थल',
    locationState: 'झारखंड',
    districtPlace: 'बरहेट, साहिबगंज जिला (संथाल परगना)',
    annualFairOrMaha: 'प्रतिवर्ष ३० जून (ऐतिहासिक हूल दिवस मेला)',
    historyAndSignificance: '30 जून 1855 को अमर शहीद सिदो मुर्मू, कान्हू मुर्मू, चांद-भैरव एवं फूलो-झानो ने इसी पावन भूमि पर 10,000 संतालों को एकत्र कर अंग्रेजों की ईस्ट इंडिया कंपनी के शोषण के विरुद्ध स्वाधीनता का पहला शंखनाद किया था। यहां सिदो-कान्हू का ऐतिहासिक आवास और शहीद स्मारक स्थित है।',
    ritualsAndWorship: 'हूल दिवस पर पूरे देश के आदिवासी नेता, युवा और गणमान्य व्यक्ति अमर वीरों की प्रतिमाओं पर माल्यार्पण करते हैं और "हूल जोहार" के नारों से धरती गूंज उठती है।',
    howToReach: 'साहिबगंज या बरहरवा रेलवे स्टेशन से सड़क मार्ग द्वारा बरहेट/भोगनाडीह पहुंचा जा सकता है।',
    sacredRules: 'स्वाधीनता संग्राम के अमर शहीदों के प्रति सम्मान और नमन की भावना के साथ दर्शन करें।',
    badgeColor: 'bg-red-100 text-red-900 border-red-300'
  },
  {
    id: 'ayodhya_buru',
    nameDevanagari: 'अयोध्या बुरु (अयोध्या पहाड़)',
    nameRoman: 'Ayodhya Buru (Ajodhya Hills)',
    titleHindi: 'दिशोम सेंन्दरा एवं लोहबीर महापरिषद का पवित्र पर्वत',
    locationState: 'पश्चिम बंगाल',
    districtPlace: 'बाघमुंडी, पुरुलिया जिला',
    annualFairOrMaha: 'वैशाख पूर्णिमा (दिशोम शिकार व लोहबीर अदालत)',
    historyAndSignificance: 'संथाली लोककथाओं और इतिहास का अत्यंत पवित्र पर्वत। संथाली मान्यता के अनुसार सीता-राम के वनवास काल में प्यास लगने पर लक्ष्मण ने धरती में बाण मारकर जलधारा निकाली थी, जिसे "सीता कुंड" कहा जाता है। प्रतिवर्ष वैशाख पूर्णिमा पर यहां लाखों संताल शिकार के लिए जुटते हैं और सर्वोच्च लोहबीर बैसी बैठती है।',
    ritualsAndWorship: 'पारंपरिक धनुष-बाण के साथ पर्वत की परिक्रमा की जाती है और रात में लोहबीर बैसी में सामाजिक व्यवस्था पर विचार-विमर्श होता है।',
    howToReach: 'पुरुलिया या बराभूम रेलवे स्टेशन से सुलभ। कोलकाता या जमशेदपुर से सड़क मार्ग द्वारा आसानी से पहुंचा जा सकता है।',
    sacredRules: 'जंगल की हरियाली और वन्यजीवों के प्राकृतिक संतुलन का सम्मान करें। वृक्षों को नुकसान न पहुंचाएं।',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
  },
  {
    id: 'tilka_majhi_bhagalpur',
    nameDevanagari: 'तिलका मांझी चौक व मुक्ति निकेतन',
    nameRoman: 'Baba Tilka Majhi Memorial',
    titleHindi: 'प्रथम स्वतंत्रता सेनानी बाबा तिलका मांझी का अमर बलिदानी स्थल',
    locationState: 'बिहार',
    districtPlace: 'भागलपुर (गंगा तट के निकट)',
    annualFairOrMaha: '११ फरवरी (तिलका मांझी शहादत दिवस) व सोहराय',
    historyAndSignificance: '1784 में ब्रिटिश हुकूमत के क्रूर कलेक्टर क्लीवलैंड को विषैले तीर से मार गिराने वाले बाबा तिलका मांझी को अंग्रेजों ने चार घोड़ों से बांधकर घसीटा था और अंततः 1785 में भागलपुर में एक विशाल बरगद के पेड़ पर फांसी दी थी। वह स्थान आज भी राष्ट्रीय स्वाभिमान का तीर्थ है।',
    ritualsAndWorship: 'आदिवासी समाज यहां पहुंचकर अपनी माटी और तीर-धनुष की शपथ लेता है और प्रथम शहीद को श्रद्धांजलि अर्पित करता है।',
    howToReach: 'भागलपुर जंक्शन रेलवे स्टेशन से मात्र 3 किमी दूरी पर स्थित।',
    sacredRules: 'शहीद स्थल पर मौन श्रद्धांजलि और देशभक्ति के संकल्प के साथ शीश झुकाएं।',
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-300'
  },
  {
    id: 'jaher_than_universal',
    nameDevanagari: 'जाहेर थान (पवित्र साल कुंज)',
    nameRoman: 'Jaher Than (Sacred Grove)',
    titleHindi: 'प्रत्येक संथाली ग्राम का सर्वोच्च अधिष्ठाता पवित्र देवस्थल',
    locationState: 'अखिल भारतीय (संथाली गांव)',
    districtPlace: 'प्रत्येक पारंपरिक संथाली गांव के बाहर का संरक्षित वन',
    annualFairOrMaha: 'बाहा पर्व, एरोअक, माघे एवं सोहराय',
    historyAndSignificance: 'जाहेर थान संथाली समाज का वह देवस्थल है जहां कोई मूर्ति या मंदिर की ईंट नहीं होती, बल्कि विशाल प्राचीन साल (सरजोम) और महुआ के जीवित वृक्ष ही देवताओं के प्रतीक हैं। यहां जाहेर एरा, मारांग बुरु, मोड़ेको-तुरुयको और गोसांय एरा का वास माना जाता है।',
    ritualsAndWorship: 'गांव के नायके (पुजारी) द्वारा श्वेत व लाल मुर्गों की बलि और दूध-जल का अर्पण कर पूरे गांव की खुशहाली, अच्छी वर्षा और निरोग जीवन की बाखेर (प्रार्थना) की जाती है।',
    howToReach: 'झारखंड, पश्चिम बंगाल, ओडिशा, बिहार व असम के किसी भी पारंपरिक संथाली गांव में जाहेर थान अवश्य विद्यमान होता है।',
    sacredRules: 'जाहेर थान के किसी भी पेड़ को काटना या पत्ता तोड़ना पूर्णतः वर्जित है। वहां जूता-चप्पल पहनकर जाना वर्जित है।',
    badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
  }
];

export const SantaliPilgrimageSites: React.FC = () => {
  const [sites] = useState<PilgrimageSite[]>(() =>
    safeLoadFromStorage('hor_katha_cms_pilgrimage', DEFAULT_PILGRIMAGE_SITES)
  );
  const [selectedSite, setSelectedSite] = useState<PilgrimageSite>(sites[0]);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-stone-900 to-amber-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-teal-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-teal-200 border border-teal-400/30">
              <Landmark className="w-4 h-4 text-teal-300" />
              <span>संथाली दिशोम दर्शन • ऐतिहासिक तीर्थ स्थल एवं दर्शनीय धरोहर</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              संथाली ऐतिहासिक तीर्थ स्थल एवं दर्शनीय धरोहर (Sacred Heritage Sites)
            </h1>
            <p className="text-teal-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              लुगुबुरु घंटाबाड़ी, भोगनाडीह हुल तीर्थ, अयोध्या बुरु, तिलका मांझी स्मारक एवं जाहेर थान—संथाली समाज के आध्यात्मिक महातीर्थों, ऐतिहासिक क्रांति स्थलों एवं यात्रा मार्गदर्शिका का प्रामाणिक परिचय।
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 self-start md:self-auto">
            <Compass className="w-6 h-6 text-teal-300" />
            <div>
              <p className="text-xs text-teal-200">पवित्र तीर्थ स्थल</p>
              <p className="text-lg font-black text-white">{sites.length} महातीर्थ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Cards & Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sites.map((site) => {
            const isSelected = selectedSite.id === site.id;
            return (
              <div
                key={site.id}
                onClick={() => setSelectedSite(site)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer bg-white text-left flex flex-col justify-between shadow-xs ${
                  isSelected
                    ? 'border-teal-700 ring-2 ring-teal-600/20 shadow-md scale-[1.01]'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${site.badgeColor}`}>
                      {site.locationState}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakWithFemaleVoice(site.nameDevanagari);
                      }}
                      className="p-1 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-800 cursor-pointer"
                      title="तीर्थ नाम सुनें"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 tracking-tight">
                    {site.nameDevanagari}
                  </h3>
                  <p className="text-xs font-semibold text-teal-800 mb-1">
                    {site.nameRoman}
                  </p>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {site.historyAndSignificance}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1 truncate max-w-[150px]">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    {site.districtPlace}
                  </span>
                  <span className="text-teal-800 font-bold hover:underline">
                    विवरण देखें →
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
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${selectedSite.badgeColor}`}>
                {selectedSite.locationState} • {selectedSite.districtPlace}
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                {selectedSite.nameDevanagari}
              </h2>
              <p className="text-sm font-bold text-teal-800">
                {selectedSite.nameRoman}
              </p>
            </div>
            <button
              onClick={() => speakWithFemaleVoice(selectedSite.nameDevanagari)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-100 hover:bg-teal-200 text-teal-900 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <Volume2 className="w-4 h-4" />
              <span>उच्चारण</span>
            </button>
          </div>

          {/* Quick Meta */}
          <div className="bg-teal-50/50 p-3.5 rounded-2xl border border-teal-100 text-xs space-y-1">
            <p className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> मुख्य मेला व दर्शन का समय
            </p>
            <p className="font-bold text-slate-800">{selectedSite.annualFairOrMaha}</p>
          </div>

          {/* History */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-teal-700" /> ऐतिहासिक व आध्यात्मिक महत्व
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              {selectedSite.historyAndSignificance}
            </p>
          </div>

          {/* Rituals */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              पूजा-अर्चना एवं पारंपरिक विधान
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedSite.ritualsAndWorship}
            </p>
          </div>

          {/* How to reach */}
          <div className="space-y-1 bg-amber-50/50 p-3 rounded-xl border border-amber-100 text-xs">
            <h4 className="font-bold text-amber-950 flex items-center gap-1">
              <Train className="w-3.5 h-3.5 text-amber-700" /> कैसे पहुंचें (Travel Guide)
            </h4>
            <p className="text-slate-700">{selectedSite.howToReach}</p>
          </div>

          {/* Rules */}
          <div className="space-y-1 bg-rose-50/50 p-3 rounded-xl border border-rose-100 text-xs">
            <h4 className="font-bold text-rose-950 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-rose-700" /> पावन मर्यादाएं व नियम
            </h4>
            <p className="text-slate-700">{selectedSite.sacredRules}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
