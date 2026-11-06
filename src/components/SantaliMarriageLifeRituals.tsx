import React, { useState } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  HeartHandshake,
  Volume2,
  Sparkles,
  Users,
  Compass,
  CheckCircle2,
  Calendar,
  Layers,
  Award,
  Sun,
  ShieldCheck
} from 'lucide-react';

interface RitualItem {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  type: 'marriage' | 'samskara';
  subTypeLabel: string;
  description: string;
  coreProcess: string[];
  socialSignificance: string;
  keyRequirements: string[];
  elderRole: string;
}

const RITUALS_DATA: RitualItem[] = [
  // 7 Traditional Marriages (बापला)
  {
    id: 'm1',
    nameDevanagari: 'दुवार बापला (सादर ससम्मान औपचारिक विवाह)',
    nameRoman: 'Duar Bapla',
    type: 'marriage',
    subTypeLabel: 'पारंपरिक सर्वश्रेष्ठ विवाह (Most Prestigious)',
    description: 'माता-पिता, रायबारिच् (मध्यस्थ/दूत) और दोनों गांवों के मांझी हाड़ाम तथा कुलही बैसी की सर्वसम्मति से वधू के द्वार पर सम्पन्न होने वाला सर्वाधिक आदरणीय व पूर्ण वैदिक संताली विवाह।',
    coreProcess: [
      'रायबारिच् द्वारा दोनों कुलों के बीच गोत्र (पारिस) मिलान व वार्तालाप।',
      'दाह-चावलेज (सगुन देखना) और वर-वधू पक्ष द्वारा एक-दूसरे के गांव में जाकर सम्मान भेंट (पेड़ा दाराम)।',
      'गोनोंग टाका (वधू-मूल्य जो वस्तुतः वधू के सम्मान में आदर राशि है) तय करना।',
      'बारात का वधू के द्वार पर पहुंचना, जहां वधू की माता द्वारा लोहार की सलाई और घड़े के जल से दामाद का पांव धोना (जांगा आबुक)।',
      'सिंदूर दान (सिंदूर दानांग) — जहां वर-वधू को बांस की डलिया (दउरा) में उठाकर सिंदूर लगाया जाता है।'
    ],
    socialSignificance: 'यह संताली समाज की अटूट सामाजिक समरसता, दो गांवों का गठबंधन और गोत्र की पवित्रता का प्रतीक है।',
    keyRequirements: ['रायबारिच् की उपस्थिति', 'दउरा (बांस डलिया)', 'सरजोम पत्ते की माला', 'सिंदूर', 'धोती-पांची साड़ी'],
    elderRole: 'मांझी हाड़ाम, जोंग मांझी और गोदेत द्वारा पूरी बारात का स्वागत और सामाजिक गवाही।'
  },
  {
    id: 'm2',
    nameDevanagari: 'टुंकी दिपिल बापला (गरीब परिवार हेतु सुगम विवाह)',
    nameRoman: 'Tunki Dipil Bapla',
    type: 'marriage',
    subTypeLabel: 'अल्पव्ययी सरल विवाह (Frugal & Compassionate)',
    description: 'जब वर पक्ष बहुत निर्धन होता है और बारात ले जाने में असमर्थ होता है, तब वधू अपने सिर पर एक छोटी डलिया (टुंकी) में अपने वस्त्र रखकर वर के घर आती है और वहीं सादगी से विवाह होता है।',
    coreProcess: [
      'दोनों परिवारों की सहमति से रायबारिच् विवाह पक्का करता है।',
      'वधू कुछ परिजनों के साथ वर के घर सिर पर टुंकी लेकर पहुंचती है।',
      'वर पक्ष के मांझी बाबा और गोदेत की मौजूदगी में सिंदूर दान व आशीर्वाद सम्पन्न होता है।',
      'किसी भी प्रकार का अनावश्यक आर्थिक बोझ या दहेज नहीं होता।'
    ],
    socialSignificance: 'संताली समाज में आर्थिक विषमता के कारण कोई अविवाहित न रहे, यह मानवीय सहृदयता और सामाजिक बराबरी का ज्वलंत उदाहरण है।',
    keyRequirements: ['टुंकी (बांस की छोटी टोकरी)', 'सिंदूर', 'साधारण गुड़-चूड़ा भोज'],
    elderRole: 'वर के गांव का मांझी हाड़ाम वधू को कुल में स्वीकारने की सामाजिक मान्यता देता है।'
  },
  {
    id: 'm3',
    nameDevanagari: 'गोलात बापला (पारस्परिक विनिमय विवाह)',
    nameRoman: 'Golat Bapla',
    type: 'marriage',
    subTypeLabel: 'अदला-बदली विवाह (Exchange Marriage)',
    description: 'दो परिवारों के बीच आपसी सहमति से पुत्र और पुत्री का परस्पर विवाह — एक परिवार का बेटा दूसरे की बेटी से और उस परिवार का बेटा पहले परिवार की बेटी से विवाह करता है।',
    coreProcess: [
      'दोनों परिवार एक ही दिन दोनों बच्चों के विवाह की रस्में तय करते हैं।',
      'गोनोंग टाका (वधू मूल्य) दोनों तरफ बराबर होने के कारण शून्य या प्रतीकात्मक हो जाता है।',
      'दोनों युगल एक साथ समाज से आशीर्वाद प्राप्त करते हैं।'
    ],
    socialSignificance: 'दोनों परिवारों में बेटी और बहू का समान दर्जा बना रहता है, जिससे पारिवारिक संतुलन और सौहार्द सुदृढ़ रहता है।',
    keyRequirements: ['दोनों परिवारों में योग्य वर-कन्या', 'ग्राम पंचायत की स्वीकृति'],
    elderRole: 'दोनों गांवों के मांझी जन यह सुनिश्चित करते हैं कि किसी भी बेटी के साथ भेदभाव न हो।'
  },
  {
    id: 'm4',
    nameDevanagari: 'घरदी जांवाए बापला (घरजमाई विवाह)',
    nameRoman: 'Ghardi Jawae Bapla',
    type: 'marriage',
    subTypeLabel: 'सेवा आधारित विवाह (Son-in-law Residency)',
    description: 'जब कन्या के माता-पिता के पास केवल पुत्रियां हों या वे वृद्ध हों, तो वर कन्या के घर आकर 5 वर्ष तक कृषि और गृहस्थी में पुत्र की भांति सेवा करता है और तत्पश्चात स्वतंत्र होता है।',
    coreProcess: [
      'वर पक्ष और वधू पक्ष मांझी हाड़ाम के समक्ष सेवा की अवधि (प्रायः 5 वर्ष) तय करते हैं।',
      'विवाह की सभी रस्में वधू पक्ष द्वारा संपन्न की जाती हैं।',
      'अवधि पूरी होने पर वर को कृषि भूमि, हल-बैल या संपत्ति देकर स्वतंत्र सम्मान दिया जाता है।'
    ],
    socialSignificance: 'पुत्रहीन माता-पिता को वृद्धावस्था में सहारा देने और बेटियों के अधिकारों की सुरक्षा की अनोखी आदिवासी व्यवस्था।',
    keyRequirements: ['मांझी बैसी का अनुबंध पत्र', 'हल, जुआठ और एक जोड़ी बैल का उपहार'],
    elderRole: 'पंचायत अवधि की समाप्ति पर वर को उसका वाजिब पारिश्रमिक व उपहार दिलाती है।'
  },
  {
    id: 'm5',
    nameDevanagari: 'इतुत बापला (साहस व सिंदूर लेप विवाह)',
    nameRoman: 'Itut Bapla',
    type: 'marriage',
    subTypeLabel: 'सिंदूर लेप विवाह (Claim by Sindoor)',
    description: 'जब युवक और युवती एक-दूसरे को चाहते हों परंतु कन्या के परिजन विवाह के लिए सहमत न हों, तो युवक हाट या मेले में युवती के माथे पर सिंदूर का लेप लगा देता है, जिसके बाद पंचायत बैठती है।',
    coreProcess: [
      'हाट या मेले में युवक द्वारा सिंदूर लगाना।',
      'युवती के परिजनों द्वारा विरोध दर्ज कराने पर मांझी बाबा द्वारा आपातकालीन कुलही बैसी आहूत करना।',
      'यदि युवती युवक को स्वीकार करती है, तो युवक पर हरजाना लगाकर दोनों को विधिवत पति-पत्नी घोषित किया जाता है।',
      'यदि युवती अस्वीकार करती है, तो युवक को कठोर दंड दिया जाता है।'
    ],
    socialSignificance: 'स्त्री की सहमति को सर्वोपरि रखने और समाज में मर्यादा की रेखा तय करने वाली व्यवस्था।',
    keyRequirements: ['सिंदूर', 'कुलही बैसी की आपात बैठक'],
    elderRole: 'मांझी हाड़ाम कन्या का निष्पक्ष बयान लेते हैं और निर्णय सुनाते हैं।'
  },
  {
    id: 'm6',
    nameDevanagari: 'राजा-राजी बापला (प्रेम व गंधर्व विवाह)',
    nameRoman: 'Raja-Raji Bapla',
    type: 'marriage',
    subTypeLabel: 'पारस्परिक प्रेम विवाह (Consensual Love Marriage)',
    description: 'जब युवक और युवती बाहा या सोहराय के नाच-गान के दौरान एक-दूसरे को जीवनसाथी चुन लेते हैं और परिजनों को अपनी इच्छा जताते हैं।',
    coreProcess: [
      'युवक और युवती अपने प्रेम का निवेदन जोग मांझी (युवाओं के संरक्षक) के समक्ष करते हैं।',
      'जोग मांझी दोनों परिवारों को बुलाकर समझाइश देते हैं।',
      'परिवारों की सहमति के बाद सामान्य भोज व सिंदूर दान कर विवाह संपन्न होता है।'
    ],
    socialSignificance: 'आदिवासी समाज में युवाओं की व्यक्तिगत स्वतंत्रता और प्रेम का गहरा सामाजिक आदर।',
    keyRequirements: ['जोग मांझी की मध्यस्थता', 'कुलही बैसी का आशीर्वाद'],
    elderRole: 'जोग मांझी युवाओं के संरक्षक बनकर परिवारों के बीच सेतु का कार्य करते हैं।'
  },
  {
    id: 'm7',
    nameDevanagari: 'सांगा बापला (विधवा व परित्यक्ता पुनर्विवाह)',
    nameRoman: 'Sanga Bapla',
    type: 'marriage',
    subTypeLabel: 'पुनर्विवाह (Widow / Divorced Remarriage)',
    description: 'पति की मृत्यु अथवा वैवाहिक विच्छेद (साकम ओड़ोच) के बाद स्त्री का पुनर्विवाह, जो अत्यंत सादगी और बिना सिंदूर के कुसुम तेल या आदरपूर्वक संपन्न होता है।',
    coreProcess: [
      'स्त्री की स्वेच्छा से वर का चुनाव।',
      'दोनों पक्षों के मांझी हाड़ाम की उपस्थिति में वधू के माथे पर कुसुम के तेल का लेप या प्रतीकात्मक टीका लगाना।',
      'स्त्री को परिवार और समाज में पहले विवाह जैसा ही पूर्ण सम्मान और अधिकार मिलता है।'
    ],
    socialSignificance: 'स्त्री को जीवन भर वैधव्य का दंश नहीं झेलना पड़ता; संताली समाज में स्त्री की स्वाधीनता और गरिमा सदैव अक्षुण्ण रहती है।',
    keyRequirements: ['कुसुम तेल (Kusum Sunum)', 'मांझी हाड़ाम की गवाही'],
    elderRole: 'मांझी हाड़ाम समाज में नई शुरुआत को पूर्ण सुरक्षा व वैधता प्रदान करते हैं।'
  },

  // 3 Life-cycle Samskaras (जन्म से मृत्यु तक के संस्कार)
  {
    id: 's1',
    nameDevanagari: 'निम दाहाक् (नामकरण व जन्म शुद्धि संस्कार)',
    nameRoman: 'Nim Dahak',
    type: 'samskara',
    subTypeLabel: 'जन्म एवं शुद्धि संस्कार (Birth & Naming Rite)',
    description: 'शिशु के जन्म के तीसरे या पांचवें दिन नीम की पत्तियां डालकर उबाले गए जल (निम दाहाक्) से पूरे परिवार व प्रसूता की शुद्धि और शिशु का गोत्र व नामकरण किया जाता है।',
    coreProcess: [
      'नाई द्वारा शिशु और परिवार के पुरुषों का मुंडन व नख काटना।',
      'निम के पत्तों के जल से माता और शिशु को स्नान कराना।',
      'दादा-दादी या नाना-नानी के नाम पर शिशु का नामकरण (पहला बेटा दादा के नाम पर, पहली बेटी दादी के नाम पर)।',
      'नीम पत्ता और चावल के मांड का कड़वा काढ़ा बनाकर कुल के सभी उपस्थित जनों द्वारा पिया जाना।'
    ],
    socialSignificance: 'नीम के औषधीय गुणों से संक्रमण से सुरक्षा और कुल-परंपरा को अगली पीढ़ी में निरंतर प्रवाहित करना।',
    keyRequirements: ['नीम की पत्तियां (Nim Sakam)', 'नया मिट्टी का घड़ा', 'अरवा चावल मांड'],
    elderRole: 'नाइके (पुजारी) और दाई बूढ़ी द्वारा जाहेर थान में शुद्धि की प्रार्थना।'
  },
  {
    id: 's2',
    nameDevanagari: 'चाचो छातियार (सामाजिक वयस्कता व नागरिकता संस्कार)',
    nameRoman: 'Chacho Chhatiyar',
    type: 'samskara',
    subTypeLabel: 'सामाजिक सदस्यता दीक्षा (Social Adulthood Rite)',
    description: 'संताली समाज का सबसे गौरवशाली संस्कार, जिसके बिना किसी भी व्यक्ति को समाज, पूजा, विवाह या मृत्यु संस्कार का पूर्ण नागरिक अधिकार नहीं मिलता। यह किशोरवय में आयोजित होता है।',
    coreProcess: [
      'गांव के मांझी हाड़ाम, पारानिक और बुजुर्गों की सभा बैठती है।',
      'कहानियों, गीतों और सृष्टि रचना (हिहिड़ी पिपिड़ी) के इतिहास का वाचन कर किशोर को पूर्वजों की मर्यादा सिखाई जाती है।',
      'किशोर की बाईं कलाई पर सिक्का दाग (सिक्का दाग चिन्ह) लगाया जाता है, जो संताल होने की अमिट पहचान है।',
      'युवक को समाज में विवाह करने और शव को कंधा देने का अधिकार प्राप्त होता है।'
    ],
    socialSignificance: 'व्यक्ति को प्रकृति, समाज और पूर्वजों के प्रति उत्तरदायी नागरिक बनाना।',
    keyRequirements: ['सिक्का दाग उपकरण', 'सृष्टि गाथा के गायक (बिंथी काड़हा)', 'हंडिया प्रसाद'],
    elderRole: 'बुजुर्ग "बिंथी" (सृष्टि गाथा) गाकर संताल इतिहास की स्मृति नई पीढ़ी को सौंपते हैं।'
  },
  {
    id: 's3',
    nameDevanagari: 'भांडान / तेलांग दाहाक् (परलोक गमन व पूर्वज मिलन संस्कार)',
    nameRoman: 'Bhandan / Telang Dahak',
    type: 'samskara',
    subTypeLabel: 'अंतिम मुक्ति व पूर्वज मिलन (Final Ancestral Rite)',
    description: 'मृत्यु के उपरांत अस्थियों को पावन नदी (दामोदर नदी / नाई गाडा) में विसर्जित करने के बाद कुल और आत्मा को पुरखों (हापड़ाम को) के साथ एकाकार करने का अंतिम महासंस्कार।',
    coreProcess: [
      'शव का ससम्मान दाह-संस्कार या समाधि।',
      'अस्थि कलश (जांग बाहा) को दामोदर (नाई गाडा) ले जाकर जल में प्रवाहित करना।',
      'गांव लौटकर शुद्धि स्नान और कुलही में मांझी हाड़ाम के साथ विचार-विमर्श।',
      'घर के भीतर भीतरी थान (अड़ाक् बोंगा) में मृत पूर्वज की आत्मा का आवाहन कर परिवार के रक्षक देव के रूप में स्थापित करना।',
      'पूरे गांव और संबंधियों के लिए सामूहिक भोज।'
    ],
    socialSignificance: 'संताली दर्शन में मृत्यु अंत नहीं, बल्कि पूज्य पूर्वज (बोंगा) बनने की यात्रा है जो परिवार की रक्षा करते हैं।',
    keyRequirements: ['जांग बाहा (अस्थि फूल)', 'दामोदर नदी जल', 'सफेद सूती वस्त्र', 'साल के पत्ते'],
    elderRole: 'नाइके और मांझी हाड़ाम आत्मा को हापड़ाम (पूर्वज) लोक में विदा करने के श्लोक पढ़ते हैं।'
  }
];

export const SantaliMarriageLifeRituals: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'marriage' | 'samskara'>('all');
  const [selectedItem, setSelectedItem] = useState<RitualItem>(RITUALS_DATA[0]);

  const filteredList = RITUALS_DATA.filter((item) => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-50 via-red-50 to-amber-50 text-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-200/40 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <HeartHandshake size={260} />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-700 border border-rose-500/30 text-xs font-semibold mb-3">
            <Sparkles size={14} />
            <span>एयात बापला आर जिवोन छातियार - जीवन चक्र व वैवाहिक विधान</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-rose-800 flex items-center gap-3">
            <span>संताली विवाह पद्धतियां व जीवन संस्कार</span>
            <button
              onClick={() => speakWithFemaleVoice('सांतार कोवाक् बापला आर छातियार विधान')}
              className="p-2 rounded-full bg-rose-500/20 hover:bg-rose-500/40 text-rose-700 transition-colors"
              title="सुनें"
            >
              <Volume2 size={22} />
            </button>
          </h1>
          <p className="text-rose-800/80 text-sm sm:text-base mt-2 leading-relaxed">
            संताल समाज में 7 प्रकार के पारंपरिक विवाह (दुवार बापla, टुंकी दिपिल, गोलात, घरदी जांवाए आदि) तथा जन्म से लेकर परलोक गमन तक के 3 पावन संस्कार (निम दाहाक्, चाचो छातियार, भांडान) का विस्तृत शास्त्र।
          </p>
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="flex items-center gap-3 bg-white dark:bg-slate-50 p-3 rounded-2xl border border-slate-200 dark:border-slate-200 shadow-sm">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
            activeTab === 'all'
              ? 'bg-rose-100 text-slate-900 shadow-md'
              : 'text-slate-600 dark:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-100'
          }`}
        >
          समग्र संस्कार ({RITUALS_DATA.length})
        </button>
        <button
          onClick={() => setActiveTab('marriage')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
            activeTab === 'marriage'
              ? 'bg-rose-100 text-slate-900 shadow-md'
              : 'text-slate-600 dark:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-100'
          }`}
        >
          7 विवाह प्रकार (7 Bapla Forms)
        </button>
        <button
          onClick={() => setActiveTab('samskara')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
            activeTab === 'samskara'
              ? 'bg-rose-100 text-slate-900 shadow-md'
              : 'text-slate-600 dark:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-100'
          }`}
        >
          3 जीवन संस्कार (Life Samskaras)
        </button>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            संस्कार व विवाह सूची ({filteredList.length})
          </h2>
          {filteredList.map((item) => {
            const isSelected = selectedItem.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-rose-50 dark:bg-rose-50/40 border-rose-500 shadow-md scale-[1.01]'
                    : 'bg-white dark:bg-slate-50 border-slate-200 dark:border-slate-200 hover:border-rose-300 hover:bg-slate-50 dark:hover:bg-slate-100/60'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-50/60 text-rose-800 dark:text-rose-700">
                      {item.subTypeLabel}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-800 mt-1">
                      {item.nameDevanagari}
                    </h3>
                    <p className="text-xs text-rose-700 dark:text-rose-600 font-medium">
                      {item.nameRoman}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakWithFemaleVoice(item.nameDevanagari);
                    }}
                    className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-100 text-slate-600 dark:text-slate-700 hover:text-rose-600"
                    title="उच्चारण सुनें"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-600 mt-2 line-clamp-2">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Detail Card */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-200 shadow-xl space-y-6 sticky top-6">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-200 pb-5">
              <div>
                <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-50/50 text-rose-800 dark:text-rose-700 text-xs font-bold uppercase tracking-wider">
                  {selectedItem.subTypeLabel}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-800 mt-2">
                  {selectedItem.nameDevanagari}
                </h2>
                <p className="text-sm text-rose-700 dark:text-rose-600 font-semibold">
                  {selectedItem.nameRoman}
                </p>
              </div>
              <button
                onClick={() => speakWithFemaleVoice(selectedItem.nameDevanagari)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-100 text-slate-900 font-medium hover:bg-rose-50 transition-colors shadow"
              >
                <Volume2 size={18} />
                <span>सुनें</span>
              </button>
            </div>

            {/* Description */}
            <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-50/20 border border-rose-200/60 dark:border-rose-200/30">
              <h4 className="text-xs font-bold text-rose-900 dark:text-rose-700 uppercase tracking-wide flex items-center gap-1.5 mb-1">
                <Compass size={14} />
                <span>विस्तृत परिचय व अर्थ</span>
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-700 leading-relaxed">
                {selectedItem.description}
              </p>
            </div>

            {/* Core Ritual Steps */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-800 mb-3 flex items-center gap-2">
                <Calendar size={16} className="text-rose-600" />
                <span>मूल रस्में व अनुष्ठान क्रम (Ritual Steps)</span>
              </h4>
              <div className="space-y-2.5">
                {selectedItem.coreProcess.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-100/60 border border-slate-200/80 dark:border-slate-200"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-rose-100 text-slate-900 text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-700 leading-relaxed">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements & Elder Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-50/20 border border-amber-200/60 dark:border-amber-200/40">
                <h4 className="text-xs font-bold text-amber-900 dark:text-amber-700 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                  <Layers size={14} />
                  <span>आवश्यक सामग्रियां</span>
                </h4>
                <ul className="space-y-1.5">
                  {selectedItem.keyRequirements.map((req, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-slate-700 dark:text-slate-700 flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={13} className="text-amber-600 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-50/20 border border-emerald-200/60 dark:border-emerald-200/40">
                <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-700 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                  <Users size={14} />
                  <span>मांझी व बुजुर्गों की भूमिका</span>
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-700 leading-relaxed">
                  {selectedItem.elderRole}
                </p>
              </div>
            </div>

            {/* Social Significance */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-50/20 border border-indigo-200/60 dark:border-indigo-200/30">
              <h4 className="text-xs font-bold text-indigo-900 dark:text-indigo-700 uppercase tracking-wide flex items-center gap-1.5 mb-1">
                <Award size={14} className="text-indigo-600" />
                <span>सामाजिक व मानवीय दर्शन (Social Wisdom)</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-700 leading-relaxed">
                {selectedItem.socialSignificance}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
