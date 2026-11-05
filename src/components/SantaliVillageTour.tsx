import React, { useState } from 'react';
import {
  MapPin,
  Trees,
  Home,
  Flame,
  Volume2,
  Sparkles,
  Droplets,
  ShieldAlert,
  Users,
  Compass,
  CheckCircle,
  HelpCircle,
  Award,
  Layers,
  Info
} from 'lucide-react';
import { speakWithFemaleVoice } from '../utils/speech';

export interface VillageSite {
  id: string;
  nameDev: string;
  nameRoman: string;
  hindiTitle: string;
  category: 'sacred' | 'governance' | 'community' | 'living' | 'nature';
  xPos: number; // percentage on map
  yPos: number; // percentage on map
  icon: string;
  shortDesc: string;
  fullDesc: string;
  rituals: string[];
  taboos: string[];
  officialInCharge: string;
  sacredTreesOrObjects: string;
}

export const VILLAGE_SITES: VillageSite[] = [
  {
    id: 'jaher_than',
    nameDev: 'जाहेर थान (Jaher Than)',
    nameRoman: 'Jaher Than',
    hindiTitle: 'पवित्र साल कुंज (पवित्र सरना स्थल)',
    category: 'sacred',
    xPos: 20,
    yPos: 18,
    icon: '🌳',
    shortDesc: 'गांव की सीमा पर स्थित पवित्र साल व महुआ के पेड़ों का कुंज, जहां सर्वोच्च ईश्वर निवास करते हैं।',
    fullDesc: 'जाहेर थान संताली धर्म और दर्शन का सबसे पवित्र केंद्र है। यह गांव के बाहर स्थित प्राचीन साल (सारजोम) और महुआ (मातकोम) के पेड़ों का एक पवित्र झुरमुट होता है। यहां मारांग बुरु (सर्वोच्च देव), जाहेर एरा (पवित्र कुंज की देवी माता), मोड़ेको-तुरुयको (पांच-छह बंधु देव) और गोसांय एरा का वास माना जाता है। बाहा और सोहराय पर्व की पहली पूजा यहीं होती है।',
    rituals: [
      'बाहा पूजा (वसंत में साल के नए फूलों की पहली आहुति)',
      'एरोक सिम (वर्षा पूर्व धान बुआई की मंगलकामना पूजा)',
      'जानथाड़ पूजा (नई फसल कटाई से पूर्व आभार अनुष्ठान)',
      'माघ सिम (गांव के वर्ष समापन पर देवताओं का आशीर्वाद)'
    ],
    taboos: [
      'जाहेर थान में केवल नंगे पांव ही प्रवेश की अनुमति है।',
      'वहां के किसी भी पेड़ की सूखी लकड़ी या पत्ता भी घर जलाने के लिए नहीं लाया जा सकता।',
      'केवल गांव के पावन पुरोहित (नाईके) ही वेदी पर आहुति दे सकते हैं।'
    ],
    officialInCharge: 'नाईके (Naike - ग्राम मुख्य पुरोहित) व कुडम नाईके',
    sacredTreesOrObjects: 'सारजोम (साल वृक्ष), मातकोम (महुआ वृक्ष), सिंदूर वेदी व तीर-कमान'
  },
  {
    id: 'manjhi_than',
    nameDev: 'मांझी थान (Manjhi Than)',
    nameRoman: 'Manjhi Than',
    hindiTitle: 'पूर्वज संस्थापक व मांझी पीठ',
    category: 'governance',
    xPos: 50,
    yPos: 40,
    icon: '🏛️',
    shortDesc: 'गांव के प्रवेश और कुलही के मुहाने पर स्थित गांव के संस्थापक मांझी व पूर्वजों की वेदी।',
    fullDesc: 'मांझी थान गांव के पहले संस्थापक मांझी (मांझी हाड़ाम) की अमर आत्मा और पूर्वजों का स्मृति स्थल है। यह एक ऊंचा चबूतरा होता है जिसके केंद्र में एक पवित्र लकड़ी या पत्थर का खंभा होता है और ऊपर छप्पर होता है। गांव की हर सभा, कुलही बैसी, सामाजिक न्याय और किसी भी विवाह या उत्सव से पूर्व मांझी थान पर हड़िया (तपान हड़िया) और सिंदूर अर्पित कर पूर्वजों से आज्ञा ली जाती है।',
    rituals: [
      'कुलही बैसी (ग्राम सभा) की बैठक से पूर्व पूर्वज वंदना',
      'विवाह (बापला) के वर-वधू का स्वागत व आशीष',
      'सोहराय पर्व पर मांझी हाड़ाम को प्रथम जोहार',
      'गांव में किसी भी नए नियम के प्रवर्तन पर अनुमति'
    ],
    taboos: [
      'मांझी थान पर किसी भी प्रकार का अपशब्द, विवाद या अपमानजनक व्यवहार वर्जित है।',
      'अपवित्र स्थिति में चबूतरे पर चढ़ना मना है।'
    ],
    officialInCharge: 'मांझी हाड़ाम (ग्राम प्रधान) व गोडेट (संदेशवाहक)',
    sacredTreesOrObjects: 'खुंट (काष्ठ खंभा), सिंदूर शिला, मिट्टी का चबूतरा'
  },
  {
    id: 'kulhi',
    nameDev: 'कुलही (Kulhi)',
    nameRoman: 'Kulhi',
    hindiTitle: 'गांव की मुख्य सड़क व सामाजिक धमनी',
    category: 'community',
    xPos: 50,
    yPos: 60,
    icon: '🛣️',
    shortDesc: 'गांव के सभी घरों को जोड़ने वाली चौड़ी, स्वच्छ मुख्य सड़क जहां पर्व और सामाजिक बैठकें होती हैं।',
    fullDesc: 'कुलही केवल एक रास्ता नहीं बल्कि संताल समाज की जीवन-रेखा है। संताल गांव रैखिक (Linear) बसे होते हैं, जहां सड़क के दोनों ओर कतारबद्ध मिट्टी के घर होते हैं। कुलही अत्यंत साफ-सुथरी रखी जाती है। सोहराय के अवसर पर गाय-बैलों को कुलही में दौड़ाया और नचाया (खूंटाव) जाता है। शाम को पूरे गांव के लोग कुलही में बैठकर विचार-विमर्श करते हैं।',
    rituals: [
      'गाय-खूंटाव (सोहराय पर पशुधन का स्वागत और खेल)',
      'बारात का कुलही दाराम (भव्य अगवानी)',
      'कुलही बैसी (सड़क पर बैठकर पूरे गांव की खुली लोकतांत्रिक अदालत)'
    ],
    taboos: [
      'कुलही में कूड़ा या कांटे फेंकना सामाजिक अपराध माना जाता है।',
      'शाम के समय कुलही पर शोर मचाना वर्जित है।'
    ],
    officialInCharge: 'जोग मांझी (युवाओं के संरक्षक) व गोडेट',
    sacredTreesOrObjects: 'दोनों ओर कतारबद्ध नीम व करंज के छायादार वृक्ष'
  },
  {
    id: 'akhra',
    nameDev: 'अखड़ा (Akhra)',
    nameRoman: 'Akhra',
    hindiTitle: 'सांस्कृतिक नृत्य, संगीत व चौपाल',
    category: 'community',
    xPos: 75,
    yPos: 50,
    icon: '🥁',
    shortDesc: 'खुला गोलाकार प्रांगण जहां शाम को तुमाक-तामाक गूंजते हैं और युवा लांगड़े नाचते हैं।',
    fullDesc: 'अखड़ा संताली लोक-कला, संगीत और नृत्य का केंद्र है। गांव के मध्य एक विशाल बरगद या पीपल के पेड़ की छांव में समतल गोलाकार प्रांगण होता है। यहां शाम को गांव के युवक-युवतियां एकत्रित होते हैं। लड़के तुमाक और तामाक बजाते हैं और लड़कियां हाथ में हाथ जोड़कर लांगड़े और दोंगेड़ नृत्य करती हैं। यहीं लोक-संस्कृति एक पीढ़ी से दूसरी पीढ़ी में संचरित होती है।',
    rituals: [
      'दैनिक संध्या लांगड़े अभ्यास व मनोरंजन',
      'करम पर्व पर अखड़ा के केंद्र में करम डाल की स्थापना',
      'पर्वों पर अंतर-ग्राम नृत्य प्रतियोगिताएं'
    ],
    taboos: [
      'नशे की हालत में तुमाक या तामाक को लांघना वर्जित है।',
      'अखड़ा में किसी भी साथी के साथ अनुचित आचरण पर जोग मांझी दंड लगाते हैं।'
    ],
    officialInCharge: 'जोग मांझी (Jog Manjhi) व गांव के वरिष्ठ वादक',
    sacredTreesOrObjects: 'पवित्र वट वृक्ष, तुमाक, तामाक, तिरयो (बांसुरी)'
  },
  {
    id: 'hor_orak',
    nameDev: 'होड़ ओड़ाक (Hor Orak)',
    nameRoman: 'Hor Orak',
    hindiTitle: 'पारंपरिक संताली मिट्टी का घर',
    category: 'living',
    xPos: 35,
    yPos: 65,
    icon: '🏡',
    shortDesc: 'सोहराय भित्ति चित्रों से सजे मिट्टी के स्वच्छ घर, जिसके भीतर पवित्र भीतार (देव कोठा) होता है।',
    fullDesc: 'संताली घर प्रकृति के अनुकूल मिट्टी, बांस और छप्पर/खपड़े से बने होते हैं। घर की दीवारों पर महिलाएं प्राकृतिक रंगों (लाल, काली, सफेद मिट्टी) से सुंदर सोहराय व कोहबर पशु-पक्षी और फूल बनाती हैं। घर का सबसे पवित्र कोना भीतार (Bhitar) कहलाता है, जहां कुल देवता (ओड़ाक बोंगा) और पूर्वज आत्माओं (हापड़ाम को) का वास होता है।',
    rituals: [
      'दैनिक चूल्हा जलाने से पूर्व गृह देवता को स्मरण',
      'नवान्न पर्व पर घर के भीतर पूर्वजों को पहला भोजन अर्पण',
      'नवविवाहिता का भीतार में प्रवेश'
    ],
    taboos: [
      'बाहरी व्यक्ति का भीतार (Bhitar) के पवित्र कक्ष में प्रवेश पूर्णतः वर्जित है।',
      'घर की चौखट पर पैर रखकर बैठना अशुभ माना जाता है।'
    ],
    officialInCharge: 'गृहस्वामी (ओड़ाक होड़) व गृहस्वामिनी',
    sacredTreesOrObjects: 'भीतार वेदी, तुलसी कोट, काष्ठ उखल व ढेंकी'
  },
  {
    id: 'bandh_pukhri',
    nameDev: 'पुखुर आर बांध (Bandh & Pukhri)',
    nameRoman: 'Bandh ar Pukhri',
    hindiTitle: 'पारंपरिक जल संचयन सरोवर',
    category: 'nature',
    xPos: 80,
    yPos: 25,
    icon: '🌊',
    shortDesc: 'ढलानदार भूमि पर बना तालाब जहां कमल खिलते हैं और गांव की जल संपदा सुरक्षित रहती है।',
    fullDesc: 'संताल समाज जल संरक्षण का अनूठा ज्ञाता रहा है। गांव के ढलान पर मिट्टी का विशाल बांध बनाकर वर्षा जल को रोका जाता है। इस तालाब में गांव के लोग स्नान, पशुओं को पानी पिलाना और खेतों की सिंचाई करते हैं। तालाब में कमल और देसी मछलियां पाली जाती हैं। किसी भी पर्व पर स्नान और शुद्धिकरण यहीं किया जाता है।',
    rituals: [
      'बाहा और सोहराय पर्व से पूर्व सामूहिक स्नान ও शुद्धि',
      'दामोदर विसर्जन (नाईके द्वारा अस्थि विसर्जन जल अनुष्ठान)'
    ],
    taboos: [
      'तालाब के जल में साबुन या रासायनिक गंदगी फेंकना मना है।',
      'जिस हिस्से से पीने का पानी लिया जाता है वहां मवेशी नहीं जा सकते।'
    ],
    officialInCharge: 'गोडेट व समस्त ग्राम समुदाय',
    sacredTreesOrObjects: 'कमल पुष्प (उपल बाहा), महुआ, कदम्ब वृक्ष'
  },
  {
    id: 'gora_khuntau',
    nameDev: 'गोड़ा आर खूंटाव (Gora & Khuntau Thao)',
    nameRoman: 'Gora ar Khuntau Thao',
    hindiTitle: 'पशुधन गोशाला व वंदना स्थल',
    category: 'living',
    xPos: 25,
    yPos: 80,
    icon: '🐂',
    shortDesc: 'गाय-बैलों का आवास और लकड़ी का पवित्र खूंटा जहां सोहराय पर बैलों का सम्मान होता है।',
    fullDesc: 'संताल जीवन में कृषि और मवेशियों को परिवार का सदस्य माना जाता है। गोड़ा (गौशाला) को प्रतिदिन लीपा और साफ किया जाता है। सोहराय के दूसरे दिन (गोड़ा पूजा) पशुओं के पैरों को धोया जाता है, सींगों पर तेल व सिंदूर लगाया जाता है, और उनके गले में सोहराय धान की बालियों की माला पहनाई जाती है।',
    rituals: [
      'गोड़ा बोंगा (गौशाला के रक्षक देव की पूजा)',
      'गाइ दाउड़ाव (बैलों का खूंटाव खेल व सम्मान)'
    ],
    taboos: [
      'पशुओं को पैर से मारना महापाप माना जाता है।',
      'दूध दुहने से पूर्व बछड़े का पूरा हक सुरक्षित रखा जाता है।'
    ],
    officialInCharge: 'गृहस्वामी व पशुपालक',
    sacredTreesOrObjects: 'महुआ की खूंटी, धान की बालियों की माला, सिंदूर'
  },
  {
    id: 'sasan',
    nameDev: 'सासन आर हरगड़ी (Sasan & Hargari)',
    nameRoman: 'Sasan ar Hargari',
    hindiTitle: 'पूर्वज समाधि व स्मृति प्रस्तर (सासनदीरी)',
    category: 'sacred',
    xPos: 85,
    yPos: 80,
    icon: '🪨',
    shortDesc: 'नदी किनारे या वन सीमा पर स्थित पूर्वजों की शांति स्थली जहां शिलापट्ट (सासनदीरी) स्थापित हैं।',
    fullDesc: 'सासन संताली पूर्वजों की शांति स्थली है। जब किसी व्यक्ति का भण्डान (अंतिम संस्कार अनुष्ठान) संपन्न होता है, तब उनकी स्मृति में सासन में एक बड़ा सपाट प्रस्तर (सासनदीरी) स्थापित किया जाता है। यह स्थान अत्यंत शांत और आदरणीय होता है। यहां आकर संताल अपने पूर्वजों से सुख, शांति और वंश-वृद्धि का आशीर्वाद मांगते हैं।',
    rituals: [
      'सासनदीरी स्थापना (पूर्वज स्मृति प्रस्तर अर्पण)',
      'सोहराय पर पूर्वजों की कब्रों पर तेल और दीप प्रज्ज्वलन'
    ],
    taboos: [
      'सासन में जूते-चप्पल पहनकर जाना या शोर मचाना वर्जित है।',
      'वहां के पत्थरों को विस्थापित करना घोर वर्जित है।'
    ],
    officialInCharge: 'मांझी हाड़ाम व संबंधित वंश के प्रमुख',
    sacredTreesOrObjects: 'सासनदीरी (विशाल प्रस्तर पट्टिका), साल व महुआ वृक्ष'
  }
];

export const SantaliVillageTour: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState<VillageSite>(VILLAGE_SITES[0]);
  const [activeTab, setActiveTab] = useState<'map' | 'quiz' | 'officials'>('map');

  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const QUIZ_QUESTIONS = [
    {
      q: 'संताल गांव का सबसे पवित्र स्थल जहां मारांग बुरु और जाहेर एरा का वास होता है, क्या कहलाता है?',
      options: ['अखड़ा', 'जाहेर थान', 'मांझी थान', 'सासन'],
      correct: 1,
      exp: 'जाहेर थान साल व महुआ के पेड़ों का पवित्र कुंज है जहां गांव के सर्वोच्च देवी-देवता निवास करते हैं।'
    },
    {
      q: 'गांव के पहले संस्थापक और पूर्वज आत्माओं की स्मृति में गांव के मुहाने पर कौन सी पीठ होती है?',
      options: ['मांझी थान', 'कुलही', 'भीतार', 'गोड़ा'],
      correct: 0,
      exp: 'मांझी थान गांव के प्रथम मांझी हाड़ाम का स्मृति चबूतरा होता है जहां ग्राम सभा से पूर्व पूजा होती है।'
    },
    {
      q: 'संताली मिट्टी के घर में गृह देवता (ओड़ाक बोंगा) का सबसे पावन गुप्त कोठा क्या कहलाता है?',
      options: ['ओसाड़ा', 'कुलही', 'भीतार (Bhitar)', 'पिंडा'],
      correct: 2,
      exp: 'भीतार घर का अत्यंत पवित्र आंतरिक कक्ष होता है जहां केवल परिवार के सदस्य ही जा सकते हैं।'
    },
    {
      q: 'शाम के समय युवा-युवतियों के लांगड़े नृत्य और तुमाक-तामाक वादन का केंद्रीय स्थल क्या कहलाता है?',
      options: ['सासन', 'अखड़ा (Akhra)', 'जाहेर थान', 'पुखुर'],
      correct: 1,
      exp: 'अखड़ा गांव का सांस्कृतिक चौपाल है जहां प्रतिदिन संगीत व नृत्य होता है।'
    }
  ];

  const handleAnswer = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === QUIZ_QUESTIONS[quizIndex].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else {
      setQuizIndex(0);
      setScore(0);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-stone-900 to-amber-950 text-white p-6 sm:p-8 border border-emerald-800/40 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs font-bold border border-emerald-500/30">
              <Compass className="w-3.5 h-3.5" />
              <span>सांताली हातु दिसोम - पवित्र ग्राम संरचना</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              संताल गांव (हातु) का पवित्र इंटरएक्टिव मानचित्र
            </h1>
            <p className="text-emerald-200/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              एक पारंपरिक संताल गांव की पवित्र भौगोलिक संरचना को जानें। जाहेर थान, मांझी थान, कुलही, अखड़ा और सासन के धार्मिक नियम, रीति-रिवाज और पदाधिकारियों की भूमिका का अनुभव करें।
            </p>
          </div>

          <div className="flex items-center gap-2 bg-stone-900/80 p-1.5 rounded-2xl border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab('map')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'map'
                  ? 'bg-emerald-500 text-stone-950 shadow-md'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              🗺️ गांव का मानचित्र
            </button>
            <button
              onClick={() => setActiveTab('officials')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'officials'
                  ? 'bg-emerald-500 text-stone-950 shadow-md'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              👥 ग्राम पदाधिकारी
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-emerald-500 text-stone-950 shadow-md'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              🎯 स्थल क्विज़
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: MAP EXPLORER */}
      {activeTab === 'map' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Interactive Map Canvas (7 Cols) */}
          <div className="lg:col-span-7 bg-stone-900 rounded-3xl p-5 border border-stone-800 shadow-md flex flex-col">
            <div className="flex items-center justify-between mb-3 text-xs text-stone-400">
              <span className="font-bold flex items-center gap-1.5 text-emerald-400">
                <MapPin className="w-4 h-4" />
                मानचित्र पर किसी भी पवित्र स्थल पर क्लिक करें:
              </span>
              <span>८ प्रमुख स्थल</span>
            </div>

            {/* Stylized Santal Village Visual Map */}
            <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-emerald-950 via-stone-900 to-amber-950 rounded-2xl overflow-hidden border border-emerald-900/50 shadow-inner select-none">
              {/* Background Village Pathways & River Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                {/* Central Kulhi Road */}
                <path
                  d="M 200,450 Q 300,300 500,200"
                  stroke="#d97706"
                  strokeWidth="28"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray="4,6"
                />
                {/* Water Stream / Pond */}
                <circle cx="80%" cy="25%" r="45" fill="#0284c7" opacity="0.4" />
                {/* Sacred Grove Shading */}
                <circle cx="20%" cy="18%" r="60" fill="#059669" opacity="0.3" />
              </svg>

              {/* Village Hotspots */}
              {VILLAGE_SITES.map((site) => {
                const isSelected = selectedSite.id === site.id;
                return (
                  <button
                    key={site.id}
                    onClick={() => {
                      setSelectedSite(site);
                      speakWithFemaleVoice(site.nameDev);
                    }}
                    style={{
                      left: `${site.xPos}%`,
                      top: `${site.yPos}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    className={`absolute z-10 p-2 sm:p-2.5 rounded-2xl flex flex-col items-center gap-1 transition-all cursor-pointer group ${
                      isSelected
                        ? 'bg-amber-500 text-stone-950 scale-110 shadow-2xl ring-4 ring-amber-400/50 z-30'
                        : 'bg-stone-800/90 hover:bg-stone-700 text-white border border-white/20 shadow-lg hover:scale-105'
                    }`}
                  >
                    <span className="text-xl sm:text-2xl">{site.icon}</span>
                    <span
                      className={`text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded-md whitespace-nowrap ${
                        isSelected ? 'bg-stone-950 text-amber-400' : 'bg-stone-900/90 text-stone-200'
                      }`}
                    >
                      {site.nameDev.split(' ')[0]}
                    </span>
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full animate-ping" />
                    )}
                  </button>
                );
              })}

              {/* Map Compass Rose */}
              <div className="absolute bottom-3 right-3 bg-stone-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[10px] text-stone-400 flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                <span>उत्तर (North) • जाहेर थान</span>
              </div>
            </div>

            {/* Quick Selector Pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {VILLAGE_SITES.map((site) => (
                <button
                  key={site.id}
                  onClick={() => {
                    setSelectedSite(site);
                    speakWithFemaleVoice(site.nameDev);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedSite.id === site.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                  }`}
                >
                  <span>{site.icon}</span>
                  <span>{site.nameDev.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Site Detail Showcase (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
              {/* Title & Speech */}
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedSite.icon}</span>
                    <h2 className="text-xl font-black text-slate-900">{selectedSite.nameDev}</h2>
                  </div>
                  <div className="text-xs text-amber-800 font-semibold">{selectedSite.hindiTitle}</div>
                </div>

                <button
                  onClick={() => speakWithFemaleVoice(selectedSite.nameDev)}
                  title="स्थान का नाम सुनें"
                  className="p-2.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors cursor-pointer shrink-0"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Full Description */}
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {selectedSite.fullDesc}
              </div>

              {/* Rituals Celebrated */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>मुख्य अनुष्ठान व उत्सव:</span>
                </h3>
                <ul className="space-y-1 text-xs text-slate-600">
                  {selectedSite.rituals.map((ritual, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{ritual}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sacred Taboos / Rules */}
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl space-y-1.5">
                <h3 className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>कड़े नियम व वर्जनाएं (Sacred Taboos):</span>
                </h3>
                <ul className="space-y-1 text-xs text-rose-800">
                  {selectedSite.taboos.map((taboo, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span>⚠️</span>
                      <span>{taboo}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* In-Charge Official */}
              <div className="flex items-center justify-between text-xs p-3 bg-amber-50/80 border border-amber-200/80 rounded-2xl">
                <span className="font-bold text-amber-950 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-amber-700" />
                  संरक्षक अधिकारी:
                </span>
                <span className="font-semibold text-amber-800">{selectedSite.officialInCharge}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: TRADITIONAL VILLAGE OFFICIALS */}
      {activeTab === 'officials' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">
              संताली गांव के ५ प्रमुख पदाधिकारी (हातु मोड़े होड़)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              संताल गांव पूरी तरह लोकतांत्रिक और स्वशासित होता है। प्रत्येक पदाधिकारी का कार्य विभाजन पूर्वजों के समय से निर्धारित है।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/50 space-y-2">
              <div className="text-xl">👑</div>
              <h3 className="font-bold text-sm text-slate-900">१. मांझी हाड़ाम (Manjhi Hadam)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                गांव के प्रमुख मुखिया व प्रशासनिक अध्यक्ष। गांव के सभी विवादों का निपटारा, कुलही बैसी की अध्यक्षता और बाह्य संपर्क का दायित्व।
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-2">
              <div className="text-xl">🌿</div>
              <h3 className="font-bold text-sm text-slate-900">२. नाईके (Naike)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                गांव के मुख्य धर्मगुरु व आध्यात्मिक पुरोहित। जाहेर थान में सभी बोंगा-बुरु की पूजा, आराधना और लोक-कल्याण की प्रार्थना करते हैं।
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50/50 space-y-2">
              <div className="text-xl">⚖️</div>
              <h3 className="font-bold text-sm text-slate-900">३. पारानिक (Paranik)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                उप-मुखिया। मांझी हाड़ाम की अनुपस्थिति में न्यायिक और प्रशासनिक कार्य संभालते हैं तथा भूमि संबंधी मामलों की देखरेख करते हैं।
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-purple-200 bg-purple-50/50 space-y-2">
              <div className="text-xl">🏹</div>
              <h3 className="font-bold text-sm text-slate-900">४. जोग मांझी (Jog Manjhi)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                युवाओं के नैतिक व सांस्कृतिक मार्गदर्शक। विवाह (बापला), अखड़ा नृत्य व उत्सवों में युवाओं के आचरण व अनुशासन का संरक्षण।
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-rose-200 bg-rose-50/50 space-y-2">
              <div className="text-xl">📢</div>
              <h3 className="font-bold text-sm text-slate-900">५. गोडेट (Godet)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                गांव के संदेशवाहक व सूचना अधिकारी। गांव की बैठक, पर्व-त्योहार या किसी आवश्यक सूचना को हर घर-घर तक पहुंचाते हैं।
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: VILLAGE GEOGRAPHY QUIZ */}
      {activeTab === 'quiz' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                प्रश्न {quizIndex + 1} / {QUIZ_QUESTIONS.length}
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-2">
                {QUIZ_QUESTIONS[quizIndex].q}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 block">स्कोर</span>
              <span className="text-lg font-bold text-amber-600">{score} अंक</span>
            </div>
          </div>

          <div className="space-y-3">
            {QUIZ_QUESTIONS[quizIndex].options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === QUIZ_QUESTIONS[quizIndex].correct;
              let btnClass = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

              if (isAnswered) {
                if (isCorrect) {
                  btnClass = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                } else if (isSelected) {
                  btnClass = 'bg-rose-100 border-rose-400 text-rose-900';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-2xl border text-left text-sm transition-all cursor-pointer flex items-center justify-between ${btnClass}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrect && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-950 space-y-3">
              <p>
                <strong>स्पष्टीकरण:</strong> {QUIZ_QUESTIONS[quizIndex].exp}
              </p>
              <button
                onClick={nextQuestion}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs cursor-pointer"
              >
                {quizIndex < QUIZ_QUESTIONS.length - 1 ? 'अगला प्रश्न →' : 'क्विज़ पुनः प्रारंभ करें'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
