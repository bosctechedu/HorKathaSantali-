import React, { useState } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { safeLoadFromStorage } from '../utils/storage';
import {
  Heart,
  Sparkles,
  Volume2,
  Users,
  Compass,
  CheckCircle2,
  Info,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';

export interface BaplaType {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  nameHindi: string;
  typeCategory: 'arranged' | 'love' | 'customary' | 'remarriage';
  summaryHindi: string;
  ritualsDescription: string;
  majhiRole: string;
  socialImportance: string;
  baplaSerenSantali?: string;
  baplaSerenHindi?: string;
  accentColor: string;
}

export const DEFAULT_BAPLA_TYPES: BaplaType[] = [
  {
    id: 'duar_bapla',
    nameDevanagari: 'दुआर बापला',
    nameRoman: 'Duar Bapla',
    nameHindi: 'द्वार विवाह (पारंपरिक विधि-विधान युक्त विधिवत विवाह)',
    typeCategory: 'arranged',
    summaryHindi: 'संथाली समाज का सबसे प्रतिष्ठित, मांगलिक एवं संपूर्ण विधि-विधान वाला वैवाहिक संस्कार। इसमें दूल्हा बारातियों के साथ दुल्हन के घर (द्वार) जाता है।',
    ritualsDescription: 'दूल्हे का स्वागत "दुआर दाः दुला" (पैर धोकर स्वागत) से होता है। साल व महुआ की शाखाओं से छामड़ा (मड़वा) बनाया जाता है। नायके द्वारा जाहेर एरा और मारांग बुरु से आशीष मांगा जाता है। सिंदूरदान के समय दूल्हा दुल्हन की मांग में पारंपरिक वस्त्र की ओट में सिंदूर लगाता है।',
    majhiRole: 'दोनों गांवों के मांझी हाड़ाम, जोग मांझी और गोडेत की उपस्थिति में सारे सामाजिक नियम तय किए जाते हैं।',
    socialImportance: 'दोनों कुलों और गांवों के बीच दीर्घकालिक सामाजिक, सांस्कृतिक एवं पारिवारिक सौहार्द स्थापित करता है।',
    baplaSerenSantali: 'दुआर रेगे सेन्दरा, दुआर रेगे बापला, जवांय कोड़ा हिजुः कान छामड़ा लाताड़ ते!',
    baplaSerenHindi: 'द्वार पर ही शिकार, द्वार पर ही विवाह, दूल्हा राजा मड़वे की छांव में पधार रहे हैं!',
    accentColor: 'from-amber-600 to-rose-700'
  },
  {
    id: 'golaeti_bapla',
    nameDevanagari: 'गोलाएती बापला',
    nameRoman: 'Golaeti Bapla',
    nameHindi: 'विनिमय विवाह (दो परिवारों के बीच कन्याओं का परस्पर आदान-प्रदान)',
    typeCategory: 'arranged',
    summaryHindi: 'एक परिवार का बेटा दूसरे परिवार की बेटी से और उस परिवार का बेटा पहले परिवार की बेटी से विवाह करता है।',
    ritualsDescription: 'सारे वैवाहिक संस्कार दुआर बापला की तरह ही सम्मानपूर्वक किए जाते हैं। दोनों परिवारों में एक ही समय पर खुशियां मनाई जाती हैं और कोई भी परिवार आर्थिक दबाव महसूस नहीं करता।',
    majhiRole: 'मांझी हाड़ाम दोनों पक्षों में संतुलन और समान सम्मान का संकल्प कराते हैं।',
    socialImportance: 'अत्यधिक दहेज या खर्च से बचाव, और दोनों परिवारों के बीच गहरा परस्पर विश्वास स्थापित करना।',
    baplaSerenSantali: 'इञिञ एमामा मायंजी, आम एमञमे बहु, बाना होड़ ते लांग साजावा संथाली कुड़ी!',
    baplaSerenHindi: 'मैं तुम्हें बेटी दूंगा, तुम मुझे बहू देना, दोनों मिलकर संथाली परंपरा को सजाएंगे!',
    accentColor: 'from-orange-600 to-amber-700'
  },
  {
    id: 'tunki_dipil_bapla',
    nameDevanagari: 'तुनकी दीपिल बापला',
    nameRoman: 'Tunki Dipil Bapla',
    nameHindi: 'तुनकी दीपिल विवाह (अल्पव्ययी सादगीपूर्ण विवाह - टोकरी लेकर वधु का आगमन)',
    typeCategory: 'customary',
    summaryHindi: 'आर्थिक रूप से साधारण परिवारों के लिए बनाया गया पवित्र और सादगीपूर्ण विवाह। इसमें वधु सिर पर छोटी टोकरी (तुनकी) रखकर वर के घर आती है।',
    ritualsDescription: 'विशाल बारात निकालने की आवश्यकता नहीं होती। कन्या थोड़े परिजनों के साथ वर के घर पहुंचती है, जहां वर के गांव के मांझी और ग्रामवासी उसका सादर स्वागत करते हैं और मड़वा में सादगी से सिंदूरदान होता है।',
    majhiRole: 'गांव के जोग मांझी व नायके वर के घर पर ही सारे वैदिक संथाली बाखेर संपन्न कराते हैं।',
    socialImportance: 'संथाली समाज की समानता और समावेशिता का प्रतीक—पैसों की कमी कभी किसी के विवाह में बाधक नहीं बनती।',
    baplaSerenSantali: 'तुनकी दीपिल काते हिजुः में मायंजी, अबोवाः ओड़ाक रे लांग बोंगा बुरुवा!',
    baplaSerenHindi: 'टोकरी सिर पर रख पधारो बेटी, हमारे घर में मिलकर कुल देवताओं की पूजा करेंगे!',
    accentColor: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'apangir_bapla',
    nameDevanagari: 'अपंगिर / इपिर बापला',
    nameRoman: 'Apangir / Ipir Bapla',
    nameHindi: 'प्रणय विवाह (पारस्परिक प्रेम व सहमति से होने वाला विवाह)',
    typeCategory: 'love',
    summaryHindi: 'युवक और युवती जब मेले, पर्व (बाहा या सोहराय) में एक-दूसरे को पसंद कर लेते हैं और विवाह का निश्चय करते हैं।',
    ritualsDescription: 'युगल गांव से बाहर चले जाते हैं। बाद में जोग मांझी दोनों परिवारों को बुलाकर समझाइश करते हैं। ग्राम सभा द्वारा सहमति दिए जाने के बाद पारंपरिक रीति से सिंदूरदान और भोज का आयोजन होता है।',
    majhiRole: 'जोग मांझी दोनों पक्षों में मध्यस्थता कर ग्राम सभा में इसे सामाजिक मान्यता प्रदान कराते हैं।',
    socialImportance: 'संथाली संस्कृति में युवाओं की व्यक्तिगत स्वतंत्रता और आपसी पसंद का आदर किया जाता है।',
    baplaSerenSantali: 'बाहा दिशोम रे लांग ञापाम लेना, मोने ते लांग कुशीयेना, हापड़ाव ते लांग बापलावा!',
    baplaSerenHindi: 'बाहा के मेले में मिले थे, मन से एक-दूसरे को चाहा, अब समाज के साथ विवाह रचाएंगे!',
    accentColor: 'from-pink-600 to-rose-700'
  },
  {
    id: 'nir_bolok_bapla',
    nameDevanagari: 'निर बोलोोक बापला',
    nameRoman: 'Nir Bolok Bapla',
    nameHindi: 'निर्बलोक विवाह (धैर्य व अडिग संकल्प द्वारा सामाजिक स्वीकृति)',
    typeCategory: 'customary',
    summaryHindi: 'जब युवती किसी युवक से विवाह का पक्का इरादा करके वर के घर में जाकर बैठ जाती है और बाहर आने से मना कर देती है।',
    ritualsDescription: 'ससुराल वाले पहले विभिन्न तरीकों से उसकी परीक्षा लेते हैं या मना करते हैं। यदि कन्या अडिग रहती है, तो जोग मांझी और ग्राम सभा बैठक करके इसे वैध स्वीकार करते हैं और सिंदूरदान कराया जाता है।',
    majhiRole: 'मांझी परिषद कन्या की निष्ठा और सहमति की पुष्टि कर औपचारिक मान्यता दिलाती है।',
    socialImportance: 'स्त्री के दृढ़ निश्चय और निर्णय का संथाली लोक परंपरा में सम्मान।',
    baplaSerenSantali: 'मोने कुशी ओड़ाक बोलेना, मांझी हाड़ाम सांव साजावेना!',
    baplaSerenHindi: 'मनपसंद घर में प्रवेश किया, मांझी हाड़ाम के साथ रिश्ते को सजाया!',
    accentColor: 'from-purple-600 to-indigo-700'
  },
  {
    id: 'sanga_bapla',
    nameDevanagari: 'सांगा बापला',
    nameRoman: 'Sanga Bapla',
    nameHindi: 'सांगा विवाह (पुनर्विवाह - विधवा अथवा विधुर का सम्मानजनक वैवाहिक संस्कार)',
    typeCategory: 'remarriage',
    summaryHindi: 'संथाली समाज में विधवा या विधुर के सम्मानपूर्वक पुनर्विवाह की प्राचीन प्रगतिशील व्यवस्था।',
    ritualsDescription: 'इसमें दुआर बापला जैसा बड़ा तड़क-भड़क वाला सिंदूरदान नहीं होता, बल्कि एक विशेष वृक्ष (सरजोम/साल की डाल) के माध्यम से या बाएं हाथ से सिंदूर अर्पण कर मर्यादापूर्वक विवाह कराया जाता है।',
    majhiRole: 'ग्राम सभा संपत्ति और बच्चों के अधिकारों की रक्षा का वचन लिपिबद्ध या तय करती है।',
    socialImportance: 'संथाली समाज में कभी भी किसी विधवा स्त्री को अकेला या तिरस्कृत नहीं छोड़ा जाता; यह सामाजिक सुरक्षा का आधार है।',
    baplaSerenSantali: 'सांगा बापला ते ओड़ाक साजावेना, सुक-दुख रे लांग ताहेना!',
    baplaSerenHindi: 'सांगा विवाह से घर फिर बस गया, सुख-दुख में अब सदा साथ निभाएंगे!',
    accentColor: 'from-blue-600 to-cyan-700'
  },
  {
    id: 'ghardi_jawae_bapla',
    nameDevanagari: 'घारदी जवांय बापला',
    nameRoman: 'Ghardi Jawae Bapla',
    nameHindi: 'घरजवांई विवाह (वर का कन्या के घर आकर पारिवारिक सहयोग करना)',
    typeCategory: 'customary',
    summaryHindi: 'जिस परिवार में कोई बेटा नहीं होता या माता-पिता को वृद्धावस्था में सहारा चाहिए होता है, वहां दामाद ससम्मान कन्या के घर आकर रहता है।',
    ritualsDescription: 'वर को कन्या के गांव में पूरे सम्मान के साथ लाया जाता है। उसे कृषि भूमि व पारिवारिक कार्यों में भागीदार बनाया जाता है। समय पूरा होने पर उसे अलग संपत्ति या पैतृक अधिकार दिए जाते हैं।',
    majhiRole: 'मांझी हाड़ाम कानूनी और सामाजिक रूप से वर के अधिकारों और जिम्मेदारियों को संरक्षित करते हैं।',
    socialImportance: 'वृद्ध माता-पिता की देखभाल और परिवार के वंश-कार्य को बनाए रखने की न्यायपूर्ण व्यवस्था।',
    baplaSerenSantali: 'घारदी जवांय बाहा लेका रूप, ओड़ाक-दुआर रे सुक को दोहोया!',
    baplaSerenHindi: 'घरजवांई फूल जैसा पवित्र रूप है, जो घर-आंगन को सुखों से भर देता है!',
    accentColor: 'from-amber-600 to-yellow-600'
  },
  {
    id: 'keret_bapla',
    nameDevanagari: 'केरेत बापला',
    nameRoman: 'Keret Bapla',
    nameHindi: 'केरेत विवाह (गोत्र शुद्धि एवं सामाजिक समायोजन विवाह)',
    typeCategory: 'customary',
    summaryHindi: 'यदि किसी कारणवश सामाजिक नियमों में कोई विसंगति आ जाए, तो ग्राम व परगना परिषद द्वारा प्रायश्चित व शुद्धि के बाद विवाह को मान्यता दी जाती है।',
    ritualsDescription: 'नायके द्वारा पवित्र जल (उम-नाड़का) से शुद्धि संस्कार कराया जाता है और जाहेर थान में बोंगा बुरु से क्षमा-याचना कर आशीर्वाद प्राप्त किया जाता है।',
    majhiRole: 'परगना और मांझी परिषद मिलकर परंपरा की पवित्रता को पुनर्स्थापित करते हैं।',
    socialImportance: 'संथाली परंपरा में बहिष्कार के बजाय सुधार और समाज में पुनर्स्थापना को प्राथमिकता दी जाती है।',
    baplaSerenSantali: 'जाहेर थान रे उम काते, अबोवाः सांवता रे मिद लांग ताहेना!',
    baplaSerenHindi: 'जाहेर थान में शुद्ध होकर, हम अपने समाज के साथ एक होकर रहेंगे!',
    accentColor: 'from-teal-600 to-emerald-700'
  }
];

export const SantaliMarriageBapla: React.FC = () => {
  const [baplaList] = useState<BaplaType[]>(() =>
    safeLoadFromStorage('hor_katha_cms_bapla', DEFAULT_BAPLA_TYPES)
  );
  const [selectedBapla, setSelectedBapla] = useState<BaplaType>(baplaList[0]);
  const [activeStepTab, setActiveStepTab] = useState<'types' | 'rituals' | 'songs'>('types');

  const weddingSteps = [
    {
      step: '१',
      titleDevanagari: 'राबर बाखोल / वर-कन्या विचार',
      titleHindi: 'पारिवारिक विचार व जोग मांझी का संवाद',
      desc: 'दोनों परिवारों के जोग मांझी और मध्यस्थ (दूत) आपस में गोत्र (पारिस) और कुल मर्यादा की जांच करते हैं। संथाली नियम के अनुसार समान गोत्र में विवाह वर्जित है।'
    },
    {
      step: '२',
      titleDevanagari: 'छामड़ा रोपण (मड़वा)',
      titleHindi: 'पवित्र छामड़ा (मंडप) का निर्माण',
      desc: 'आंगन में साल (सरजोम), महुआ और जामुन की हरी टहनियों से मंडप बनाया जाता है। मध्य में मिट्टी का पवित्र वेदी स्थल स्थापित किया जाता है।'
    },
    {
      step: '३',
      titleDevanagari: 'दुआर दाः दुला',
      titleHindi: 'द्वार पर वर व बारातियों का पाद-प्रक्षालन',
      desc: 'कन्या पक्ष की माताएं और बहनें पीतल की थाली में लोटा पानी लेकर वर के पैर धोती हैं और तेल व हल्दी से स्वागत करती हैं।'
    },
    {
      step: '४',
      titleDevanagari: 'सिंदूरदान / सिंदूर अर्पण',
      titleHindi: 'पारंपरिक सिंदूरदान संस्कार',
      desc: 'वर को बांस की टोकरी में या परिजनों के कंधों पर उठाया जाता है। सफेद कपड़े की ओट में वर दुल्हन की मांग में पारंपरिक सिंदूर लगाता है। इस क्षण अखड़ा में "हरि बोल / हुल जोहार" की गूंज उठती है।'
    },
    {
      step: '५',
      titleDevanagari: 'जोहार भेंट आर बोंगा बाखेर',
      titleHindi: 'पंचों को जोहार और कुलदेवता का आशीर्वाद',
      desc: 'नवदंपति उपस्थित सभी मांझी, जोग मांझी और बुजुर्गों को झुककर "जोहार" करते हैं और जाहेर थान के पवित्र देवताओं का आशीर्वाद प्राप्त करते हैं।'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-rose-800 via-pink-900 to-amber-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-44 h-44 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-pink-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-pink-200 border border-pink-400/30">
              <Heart className="w-4 h-4 text-pink-300 fill-pink-300" />
              <span>संथाली बापला संस्कार • संथाली विवाह की ८ पवित्र पद्धतियां व रीतियां</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              संथाली विवाह संस्कार (Santali Sacred Bapla Traditions)
            </h1>
            <p className="text-pink-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              दुआर बापला से लेकर सांगा बापला तक—संथाली समाज में विवाह केवल दो व्यक्तियों का नहीं, बल्कि दो कुलों, प्रकृति एवं ग्राम स्वशासन (मांझी परगना) का पवित्र मंगल संगम है।
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 self-start md:self-auto">
            <Users className="w-6 h-6 text-pink-300" />
            <div>
              <p className="text-xs text-pink-200">पवित्र बापला रूप</p>
              <p className="text-lg font-black text-white">{baplaList.length} विधान</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs">
        {[
          { id: 'types', label: '८ पवित्र विवाह पद्धतियां (8 Bapla Types)', icon: Compass },
          { id: 'rituals', label: 'विवाह के ५ चरण (Step-by-Step Rites)', icon: Layers },
          { id: 'songs', label: 'विवाह लोकगीत (Bapla Seren)', icon: Heart }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeStepTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveStepTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: 8 Bapla Types */}
      {activeStepTab === 'types' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {baplaList.map((bapla) => {
              const isSelected = selectedBapla.id === bapla.id;
              return (
                <div
                  key={bapla.id}
                  onClick={() => setSelectedBapla(bapla)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer bg-white text-left flex flex-col justify-between shadow-xs ${
                    isSelected
                      ? 'border-rose-600 ring-2 ring-rose-500/20 shadow-md scale-[1.01]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200">
                        {bapla.nameRoman}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakWithFemaleVoice(bapla.nameDevanagari);
                        }}
                        className="p-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 cursor-pointer"
                        title="उच्चारण सुनें"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 tracking-tight">
                      {bapla.nameDevanagari}
                    </h3>
                    <p className="text-xs font-semibold text-rose-700 mb-2">
                      {bapla.nameHindi}
                    </p>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {bapla.summaryHindi}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">मांझी भूमिका उपलब्ध</span>
                    <span className="text-rose-700 font-bold hover:underline">
                      विस्तार देखें →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Spotlight */}
          <div className="lg:col-span-5 sticky top-20 bg-white rounded-3xl border border-slate-200 shadow-lg p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-rose-100 text-rose-900 border border-rose-300">
                  {selectedBapla.nameRoman}
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  {selectedBapla.nameDevanagari}
                </h2>
                <p className="text-sm font-bold text-rose-700">
                  {selectedBapla.nameHindi}
                </p>
              </div>
              <button
                onClick={() => speakWithFemaleVoice(selectedBapla.nameDevanagari)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                <Volume2 className="w-4 h-4" />
                <span>उच्चारण</span>
              </button>
            </div>

            {/* Overview */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                संक्षिप्त परिचय (Summary)
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                {selectedBapla.summaryHindi}
              </p>
            </div>

            {/* Rituals */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-600" /> मुख्य रीतियां व विधि-विधान
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed bg-rose-50/50 p-3 rounded-xl border border-rose-100">
                {selectedBapla.ritualsDescription}
              </p>
            </div>

            {/* Majhi Role */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                मांझी हाड़ाम व ग्राम स्वशासन की भूमिका
              </h4>
              <p className="text-xs text-slate-600">
                {selectedBapla.majhiRole}
              </p>
            </div>

            {/* Social Significance */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                सामाजिक महत्व (Social Value)
              </h4>
              <p className="text-xs text-slate-700 font-medium">
                {selectedBapla.socialImportance}
              </p>
            </div>

            {/* Bapla Seren */}
            {selectedBapla.baplaSerenSantali && (
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-2xl border border-rose-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-rose-900 uppercase">पारंपरिक बापला सेरेञ (विवाह गीत)</span>
                  <button
                    onClick={() => speakWithFemaleVoice(selectedBapla.baplaSerenSantali || '')}
                    className="p-1 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs font-bold text-slate-900 italic">
                  "{selectedBapla.baplaSerenSantali}"
                </p>
                <p className="text-[11px] text-slate-600">
                  हिंदी भावार्थ: {selectedBapla.baplaSerenHindi}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Rituals Step-by-Step */}
      {activeStepTab === 'rituals' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <h3 className="text-xl font-black text-slate-900">
              संथाली विवाह के ५ पवित्र मुख्य चरण (The 5 Sacred Steps)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              प्रकृति, पंचों और कुल-देवताओं की साक्षी में संपन्न होने वाले पारंपरिक वैवाहिक चरण।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {weddingSteps.map((s) => (
              <div key={s.step} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:bg-rose-50/30 transition-all">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-rose-600 text-white font-black flex items-center justify-center text-sm shadow-xs mb-3">
                    {s.step}
                  </div>
                  <h4 className="text-base font-black text-slate-900">
                    {s.titleDevanagari}
                  </h4>
                  <p className="text-xs font-bold text-rose-700 mb-2">
                    {s.titleHindi}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Marriage Songs Archive */}
      {activeStepTab === 'songs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {baplaList.filter((b) => b.baplaSerenSantali).map((b) => (
            <div key={b.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-rose-700">{b.nameDevanagari} ({b.nameRoman})</span>
                  <h4 className="text-sm font-black text-slate-900 mt-0.5">विवाह सेरेञ व आशीर्वाद</h4>
                </div>
                <button
                  onClick={() => speakWithFemaleVoice(b.baplaSerenSantali || '')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>गायन सुनें</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-bold text-slate-900 italic leading-relaxed">
                "{b.baplaSerenSantali}"
              </div>

              <p className="text-xs text-slate-600">
                <span className="font-bold text-slate-700">हिंदी भावार्थ: </span>
                {b.baplaSerenHindi}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
