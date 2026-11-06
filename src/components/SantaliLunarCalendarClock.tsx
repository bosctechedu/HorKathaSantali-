import React, { useState, useEffect } from 'react';
import {
  Moon,
  Sun,
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  Volume2,
  Download,
  Share2,
  CheckCircle2,
  Flame,
  Flower2,
  Feather,
  Compass,
  Bell,
  ArrowRight
} from 'lucide-react';
import { speakWithFemaleVoice } from '../utils/speech';

export interface LunarMonth {
  id: string;
  nameSantaliDev: string;
  nameRoman: string;
  gregorianMonths: string;
  keyFestival: string;
  festivalDev: string;
  natureSigns: string;
  agriculturalStage: string;
  traditionalRole: string;
  accentColor: string;
}

export const SANTALI_LUNAR_MONTHS: LunarMonth[] = [
  {
    id: 'cait',
    nameSantaliDev: 'चैत चांदो (Cait)',
    nameRoman: 'Cait Chando',
    gregorianMonths: 'मार्च - अप्रैल',
    keyFestival: 'Baha Parab',
    festivalDev: '🌸 बाहा परोब (फूलों का महापर्व)',
    natureSigns: 'साल (सरजोम) और महुआ के नए फूलों से वन महक उठता है।',
    agriculturalStage: 'नव वर्ष का शुभारंभ, खेतों की प्रथम जुताई।',
    traditionalRole: 'नायके हाड़ाम द्वारा जाहेर थान में प्रथम साल फूल अर्पण।',
    accentColor: 'from-pink-600 to-rose-700'
  },
  {
    id: 'baisakh',
    nameSantaliDev: 'बैसाख चांदो (Baisakh)',
    nameRoman: 'Baisakh Chando',
    gregorianMonths: 'अप्रैल - मई',
    keyFestival: 'Disom Sendra',
    festivalDev: '🏹 दिसोम सेंन्द्रा (सामूहिक शिकार व संसद)',
    natureSigns: 'धूप तेज होती है, केंदु व जामुन के फल पकने लगते हैं।',
    agriculturalStage: 'गोबर खाद खेतों में डालना व जुताई।',
    traditionalRole: 'लोबीर बैसी (पारंपरिक उच्च न्यायालय) की बैठकें।',
    accentColor: 'from-amber-600 to-orange-700'
  },
  {
    id: 'jeth',
    nameSantaliDev: 'जेठ चांदो (Jeth)',
    nameRoman: 'Jeth Chando',
    gregorianMonths: 'मई - जून',
    keyFestival: 'Rohin / Jal Puja',
    festivalDev: '💧 रोहिन व जल स्रोत संरक्षण',
    natureSigns: 'ग्रीष्म की चरम सीमा, जलस्रोतों (दाड़ी/पुखरी) की सुरक्षा।',
    agriculturalStage: 'धान के बीजों (बीड़ा) का परीक्षण व तैयारी।',
    traditionalRole: 'कुदाम नायके द्वारा ग्राम रक्षा बोंगा पूजन।',
    accentColor: 'from-orange-600 to-red-700'
  },
  {
    id: 'asarh',
    nameSantaliDev: 'आषाढ़ चांदो (Asarh)',
    nameRoman: 'Asarh Chando',
    gregorianMonths: 'जून - जुलाई',
    keyFestival: 'Erok Sim',
    festivalDev: '🌱 एरोक\' सिम (बीज बोनी पर्व)',
    natureSigns: 'आकाश में काले मेघ, प्रथम मानसूनी फुहारें।',
    agriculturalStage: 'खेतों में धान के बीज बोना (एरोक\')।',
    traditionalRole: 'ग्राम प्रधान मांझी द्वारा प्रथम बीज वपन अनुष्ठान।',
    accentColor: 'from-emerald-600 to-teal-100'
  },
  {
    id: 'sawan',
    nameSantaliDev: 'सावन चांदो (Sawan)',
    nameRoman: 'Sawan Chando',
    gregorianMonths: 'जुलाई - अगस्त',
    keyFestival: 'Hariyar Sim',
    festivalDev: '🌿 हरियर सिम (हरियाली वंदना)',
    natureSigns: 'चारों ओर हरियाली, नदियां-नाले उफान पर।',
    agriculturalStage: 'धान की रोपाई (रोपा) और सामूहिक कदमताल।',
    traditionalRole: 'खेतों की हरियाली व कीट-पतंगों से रक्षा की प्रार्थना।',
    accentColor: 'from-green-600 to-emerald-100'
  },
  {
    id: 'bhadov',
    nameSantaliDev: 'भादव चांदो (Bhadov)',
    nameRoman: 'Bhadov Chando',
    gregorianMonths: 'अगस्त - सितंबर',
    keyFestival: 'Karam Parab',
    festivalDev: '🌾 करम परोब (प्रकृति व भाई-बहन का पर्व)',
    natureSigns: 'काशी के फूल खिलते हैं, आकाश स्वच्छ नीला होता है।',
    agriculturalStage: 'धान के पौधों में बालियां आनी शुरू होती हैं।',
    traditionalRole: 'करम डाल की स्थापना, जावो डालियों का नृत्य व जागरण।',
    accentColor: 'from-yellow-600 to-amber-700'
  },
  {
    id: 'asin',
    nameSantaliDev: 'आसीन चांदो (Asin)',
    nameRoman: 'Asin Chando',
    gregorianMonths: 'सितंबर - अक्टूबर',
    keyFestival: 'Dasae Parab',
    festivalDev: '🪶 दासाय परोब (गुरु-चेला भुवांग नृत्य)',
    natureSigns: 'हल्की गुलाबी ठंड, धान में दूध भरने लगता है।',
    agriculturalStage: 'फसलों की सुरक्षा व जंगली जीवों से रखवाली।',
    traditionalRole: 'भुवांग वाद्य के साथ दासाय सेरेञ व चेला दीक्षा।',
    accentColor: 'from-indigo-600 to-blue-100'
  },
  {
    id: 'sohrai_katik',
    nameSantaliDev: 'सोहराय / कातिक चांदो (Sohrai)',
    nameRoman: 'Sohrai / Katik Chando',
    gregorianMonths: 'अक्टूबर - नवंबर',
    keyFestival: 'Sohrai Parab',
    festivalDev: '🐂 सोहराय महापर्व (गोधन व कृषि वंदना)',
    natureSigns: 'सुनहरी धान की बालियां, मिट्टी की दीवारों पर सोहराय चित्र।',
    agriculturalStage: 'धान की पकी फसल, खलिहानों की तैयारी।',
    traditionalRole: 'गोधन को जगाना (खूंटाव), पांच दिवसीय महा उत्सव।',
    accentColor: 'from-amber-600 to-rose-700'
  },
  {
    id: 'aghan',
    nameSantaliDev: 'अगहन चांदो (Aghan)',
    nameRoman: 'Aghan Chando',
    gregorianMonths: 'नवंबर - दिसंबर',
    keyFestival: 'Janthar Parab',
    festivalDev: '🍲 जांथार परोब (नवान्न पर्व)',
    natureSigns: 'शीत ऋतु का आगमन, खलिहानों में धान के ढेर।',
    agriculturalStage: 'नई फसल की कटाई और प्रथम अन्न का भोग।',
    traditionalRole: 'नई फसल का अन्न पहले बोंगा को, फिर पारिवारिक सहभोज।',
    accentColor: 'from-teal-600 to-cyan-100'
  },
  {
    id: 'pus',
    nameSantaliDev: 'पूस चांदो (Pus)',
    nameRoman: 'Pus Chando',
    gregorianMonths: 'दिसंबर - जनवरी',
    keyFestival: 'Sakrat Parab',
    festivalDev: '🏹 साकरात परोब (मकर संक्रांति व तीरंदाजी)',
    natureSigns: 'कड़ाके की ठंड, पाला और कोहरा।',
    agriculturalStage: 'फसल की पूरी कुटाई-सफाई, आराम व खेल।',
    traditionalRole: 'भेंडा बेझा (तीरंदाजी निशाना), पीठा और अखड़ा मिलन।',
    accentColor: 'from-blue-600 to-indigo-50'
  },
  {
    id: 'magh',
    nameSantaliDev: 'माघ चांदो (Magh)',
    nameRoman: 'Magh Chando',
    gregorianMonths: 'जनवरी - फरवरी',
    keyFestival: 'Maghe Parab',
    festivalDev: '🏛️ माघे परोब (वार्षिक स्वशासन नवीनीकरण)',
    natureSigns: 'पतझड़ की शुरुआत, महुआ के पेड़ पत्ते गिराते हैं।',
    agriculturalStage: 'कृषि वर्ष की समाप्ति, नए समझौतों की तैयारी।',
    traditionalRole: 'मांझी परगना प्रशासनिक पदाधिकारियों का वार्षिक नवीनीकरण।',
    accentColor: 'from-purple-600 to-fuchsia-100'
  },
  {
    id: 'fagun',
    nameSantaliDev: 'फागुन चांदो (Fagun)',
    nameRoman: 'Fagun Chando',
    gregorianMonths: 'फरवरी - मार्च',
    keyFestival: 'Fagun Baha',
    festivalDev: '🔥 फागुन बाहा व पलाश उत्सव',
    natureSigns: 'पलाश के दहकते लाल फूल, वनों में नई कोपलें।',
    agriculturalStage: 'नव वर्ष की पूर्व-तैयारी, औजारों की मरम्मत।',
    traditionalRole: 'नायके द्वारा वसंत आगमन का स्वागत।',
    accentColor: 'from-rose-600 to-amber-700'
  }
];

export interface FestivalCountdownItem {
  id: string;
  nameDev: string;
  nameRoman: string;
  targetMonthDay: { month: number; day: number }; // 0-indexed month
  approxDateStr: string;
  sacredDeity: string;
  traditionalSeren: {
    dev: string;
    roman: string;
    hindi: string;
  };
  offerings: string[];
  ritualSummary: string;
}

export const MAJOR_FESTIVALS_COUNTDOWN: FestivalCountdownItem[] = [
  {
    id: 'baha',
    nameDev: 'बाहा परोब (Baha Parab)',
    nameRoman: 'Baha Parab',
    targetMonthDay: { month: 2, day: 25 }, // Late March
    approxDateStr: 'फागुन पूर्णिमा से चैत शुक्ल तृतीया काल',
    sacredDeity: 'जाहेर एरा, मरांग बुरु, मोड़ेको-तुरुयको',
    traditionalSeren: {
      dev: 'सरजोम बाहा, मांतोम बाहा... चेलेका सोदोरोक् काना, जोहार तोबे ठाकुर जिउ!',
      roman: 'Sarjom baha, matkom baha... cheleka sodorok kana, johar tobe thakur jiu!',
      hindi: 'साल और महुआ के पावन फूल खिले हैं... हे ईश्वर, हम आपको नमन करते हैं!'
    },
    offerings: ['सरजोम (साल) के नए फूल', 'तपान हांडी (पवित्र जल/मद्य)', 'सिंदूर', 'सफेद व चितकबरे मुर्गे'],
    ritualSummary: 'नायके हाड़ाम पवित्र जाहेर थान में साल के नए फूलों की पूजा करते हैं, फिर गांव की कुंवारी कन्याएं घर-घर जाकर सबको फूल भेंट करती हैं और पवित्र जल का छिड़काव होता है।'
  },
  {
    id: 'sohrai',
    nameDev: 'सोहराय महापर्व (Sohrai Parab)',
    nameRoman: 'Sohrai Parab',
    targetMonthDay: { month: 10, day: 15 }, // Mid November
    approxDateStr: 'कार्तिक अमावस्या के पश्चात ५ दिवसीय पर्व',
    sacredDeity: 'मरांग बुरु, गोठ बोंगा, गौ-वंश पूर्वज',
    traditionalSeren: {
      dev: 'हासा रेनाग् ओड़ाग् दो, सोहराय रे साजावा... गाय-काड़ा कोवाग् गोरोब गे आबोवाग्!',
      roman: 'Hasa renag orag do, sohrai re sajawa... Gay-kara kowag gorob ge abowag!',
      hindi: 'मिट्टी के घरों को सोहराय कला से सजाया है... मूक पशुधन ही हमारी असली शान है!'
    },
    offerings: ['उम-नाड़के (पवित्र स्नान)', 'गोठ पूजा पर तपान हांडी', 'धूप-दीप', 'घास व धान की नई मालाएं'],
    ritualSummary: 'उम (प्रथम दिन), दाका (द्वितीय दिन), खुंटाव (तृतीय दिन - बैलों को नचाना), जाले (चौथा दिन) और साकराट (पांचवा दिन)।'
  },
  {
    id: 'karam',
    nameDev: 'करम परोब (Karam Parab)',
    nameRoman: 'Karam Parab',
    targetMonthDay: { month: 8, day: 20 }, // Late September
    approxDateStr: 'भाद्रपद एकादशी (करम एकादशी)',
    sacredDeity: 'करम बोंगा, धरम बोंगा',
    traditionalSeren: {
      dev: 'जावो-जावो गो, करम डाल दो साजाव पे... भायवा कोवाग् आयुक् बाढ़ाव मा!',
      roman: 'Jawo-jawo go, karam dal do sajaw pe... Bhaywa kowag ayuk barhaw ma!',
      hindi: 'अंकुरित जावो से करम डाल सजाओ... हमारे भाइयों की दीर्घायु और समृद्धि हो!'
    },
    offerings: ['जावो (अंकुरित अन्न)', 'करम की दो पवित्र डालियां', 'कच्चा दूध', 'अरवा चावल व धूप'],
    ritualSummary: 'गांव के अखड़ा में करम की डाली स्थापित कर रात भर करम सेरेञ और नृत्य होता है, जहां बुजुर्ग कर्म और धर्म की कथा सुनाते हैं।'
  },
  {
    id: 'erok',
    nameDev: 'एरोक\' सिम (Erok\' Sim)',
    nameRoman: 'Erok Sim',
    targetMonthDay: { month: 5, day: 15 }, // Mid June
    approxDateStr: 'आषाढ़ मास की शुरुआत (प्रथम मानसूनी वर्षा)',
    sacredDeity: 'धरती माता, जाहेर एरा',
    traditionalSeren: {
      dev: 'दाग् गे जारि येना, एरोक\' बेड़ा सेतेर येना... हासा रे बीड़ा हेर मे!',
      roman: 'Dag ge jari yena, erok bera seter yena... Hasa re bira her me!',
      hindi: 'वर्षा की बूंदें बरस पड़ीं, बीज बोने की बेला आ गई... उपजाऊ मिट्टी में बीज डालो!'
    },
    offerings: ['एरोक\' सिम (पवित्र मुर्गा)', 'धान के बीज', 'तपान हांडी', 'सरजोम पत्ते'],
    ritualSummary: 'खेतों में धान बोने से पहले ग्राम देवता और धरती माता से उत्तम फसल और कीट-व्याधियों से मुक्ति की सामूहिक याचना की जाती है।'
  },
  {
    id: 'sakrat',
    nameDev: 'साकरात परोब (Sakrat Parab)',
    nameRoman: 'Sakrat Parab',
    targetMonthDay: { month: 0, day: 14 }, // Mid January
    approxDateStr: 'पूस संक्रांति (१३ - १५ जनवरी)',
    sacredDeity: 'मरांग बुरु, तीरंदाज पूर्वज',
    traditionalSeren: {
      dev: 'आ-सार साबोक् पे, भेंडा बेझा तुञ पे... साकरात रेनाग् पीठा जोम पे!',
      roman: 'Aa-sar sabok pe, bhenda bejha tun pe... Sakrat renag pitha jom pe!',
      hindi: 'धनुष-बाण थामो, केले के निशाने पर तीर चलाओ... और साकरात का स्वादिष्ट पीठा खाओ!'
    },
    offerings: ['जिल पीठा (मांस युक्त पीठा)', 'तपान हांडी', 'निशाना बेझा'],
    ritualSummary: 'तीरंदाजी प्रतियोगिता (भेंडा बेझा) का आयोजन होता है जहां विजेता को गांव में कंधे पर उठाकर सम्मानित किया जाता है।'
  }
];

export const SantaliLunarCalendarClock: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<LunarMonth>(SANTALI_LUNAR_MONTHS[0]);
  const [selectedFestival, setSelectedFestival] = useState<FestivalCountdownItem>(MAJOR_FESTIVALS_COUNTDOWN[0]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [moonData, setMoonData] = useState<{
    phaseNameDev: string;
    phaseNameRoman: string;
    phasePercent: number;
    description: string;
    isWaxing: boolean;
  }>({
    phaseNameDev: 'कुनामी (पूर्णिमा चंद्र)',
    phaseNameRoman: 'Kunami Chando (Full Moon)',
    phasePercent: 100,
    description: 'चांदो अपनी पूर्ण आभा में है। संताली अखड़ा में नृत्य और सेरेञ का सबसे पवित्र समय।',
    isWaxing: true
  });

  // Astronomical moon phase calculation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Calculate Moon Phase
    const now = new Date();
    // Known new moon reference: Jan 11, 2024
    const knownNewMoon = new Date('2024-01-11T11:57:00Z');
    const synodicMonth = 29.53058867; // days
    const diffDays = (now.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
    const cyclePos = (diffDays % synodicMonth) / synodicMonth; // 0 to 1

    let phaseNameDev = '';
    let phaseNameRoman = '';
    let description = '';
    let isWaxing = true;
    let phasePercent = 0;

    if (cyclePos < 0.03 || cyclePos > 0.97) {
      phaseNameDev = 'मूळ चांदो (अमावस्या)';
      phaseNameRoman = 'Mul Chando (New Moon)';
      description = 'अंधकार पर विजय और अंतर्मुखी साधना का समय। नायके हाड़ाम द्वारा गोपनीय बाखेर आराधना।';
      phasePercent = 0;
    } else if (cyclePos < 0.22) {
      phaseNameDev = 'चांदो मुलूग् (शुक्ल प्रतिपदा से पंचमी)';
      phaseNameRoman = 'Chando Mulug (Waxing Crescent)';
      description = 'चांद की पहली किरणें। नए शुभ कार्यों, कृषि तैयारी और बीज संग्रह का उत्तम काल।';
      phasePercent = Math.round(cyclePos * 200);
      isWaxing = true;
    } else if (cyclePos < 0.28) {
      phaseNameDev = 'प्रथम चतुर्थांश (First Quarter)';
      phaseNameRoman = 'Mit Hatiñ Chando';
      description = 'आधा चंद्र। गांव के चौपाल व मांझी परगना में सामाजिक निर्णयों की बेला।';
      phasePercent = 50;
      isWaxing = true;
    } else if (cyclePos < 0.47) {
      phaseNameDev = 'बढ़ता चंद्र (Waxing Gibbous)';
      phaseNameRoman = 'Laha-kater Chando';
      description = 'चांदो पूर्णता की ओर अग्रसर। खेतों में फसलों का तेजी से विकास।';
      phasePercent = Math.round(cyclePos * 180);
      isWaxing = true;
    } else if (cyclePos < 0.53) {
      phaseNameDev = 'कुनामी चांदो (पूर्णमासी / पूर्णिमा)';
      phaseNameRoman = 'Kunami Chando (Full Moon)';
      description = 'अमृतमयी पूर्ण चंद्र! संताल समाज में बाहा, करम और सोहराय अखड़ा नृत्य का सबसे उल्लासपूर्ण दिन।';
      phasePercent = 100;
      isWaxing = false;
    } else if (cyclePos < 0.72) {
      phaseNameDev = 'घटता चंद्र (Waning Gibbous)';
      phaseNameRoman = 'Tayom-kater Chando';
      description = 'कुनामी के बाद का शांति काल। रात में बुजुर्गों द्वारा बच्चों को लोककथाएं सुनाने का समय।';
      phasePercent = Math.round((1 - cyclePos) * 180);
      isWaxing = false;
    } else if (cyclePos < 0.78) {
      phaseNameDev = 'अंतिम चतुर्थांश (Third Quarter)';
      phaseNameRoman = 'Bar Hatiñ Chando';
      description = 'रात्रि के उत्तरार्ध में चंद्र दर्शन। वनों में शांति और प्राकृतिक संतुलन।';
      phasePercent = 50;
      isWaxing = false;
    } else {
      phaseNameDev = 'चांदो ओतोर (कृष्ण पक्ष विदाई)';
      phaseNameRoman = 'Chando Otor (Waning Crescent)';
      description = 'मूळ (अमावस्या) की तैयारी। आत्म-शुद्धि और पूर्वजों (हपड़ाम) को स्मरण करने का समय।';
      phasePercent = Math.round((1 - cyclePos) * 200);
      isWaxing = false;
    }

    setMoonData({
      phaseNameDev,
      phaseNameRoman,
      phasePercent: Math.min(100, Math.max(0, phasePercent)),
      description,
      isWaxing
    });

    return () => clearInterval(timer);
  }, []);

  // Compute countdown to selected festival
  const computeCountdown = (target: { month: number; day: number }) => {
    const now = currentTime;
    let targetYear = now.getFullYear();
    let targetDate = new Date(targetYear, target.month, target.day, 9, 0, 0);

    // If already passed this year, take next year
    if (now.getTime() > targetDate.getTime()) {
      targetDate = new Date(targetYear + 1, target.month, target.day, 9, 0, 0);
    }

    const diffMs = targetDate.getTime() - now.getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const seconds = Math.floor((diffMs / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  const countdown = computeCountdown(selectedFestival.targetMonthDay);

  const handleSpeakFestival = () => {
    speakWithFemaleVoice(
      `${selectedFestival.nameDev}। ${selectedFestival.traditionalSeren.dev}। ${selectedFestival.traditionalSeren.hindi}`,
      { lang: 'hi-IN', rate: 0.85 }
    );
  };

  // Add to Calendar iCal (.ics) download
  const handleDownloadCalendarEvent = () => {
    const now = new Date();
    const targetYear = now.getFullYear();
    const eventDate = new Date(targetYear, selectedFestival.targetMonthDay.month, selectedFestival.targetMonthDay.day, 9, 0, 0);
    const dtStart = eventDate.toISOString().replace(/-|:|\.\d\d\d/g, '').slice(0, 15) + 'Z';
    const dtEnd = new Date(eventDate.getTime() + 8 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, '').slice(0, 15) + 'Z';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//HorKatha//Santali Indigenous Calendar//EN',
      'BEGIN:VEVENT',
      `UID:${selectedFestival.id}_${Date.now()}@horkatha.org`,
      `DTSTAMP:${dtStart}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:🌿 ${selectedFestival.nameDev} - संताली महापर्व`,
      `DESCRIPTION:${selectedFestival.ritualSummary} | आराध्य: ${selectedFestival.sacredDeity}`,
      'LOCATION:जाहेर थान / कुलही अखड़ा (झारखंड, प.बंगाल, ओडिशा, असम)',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedFestival.id}_santali_festival.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-in fade-in duration-200">
      {/* Hero Header with Live Astronomical Chando Clock */}
      <div className="bg-gradient-to-r from-slate-50 via-indigo-50 to-stone-50 text-slate-900 p-6 sm:p-8 rounded-3xl shadow-xl border border-indigo-500/20 relative overflow-hidden">
        {/* Ambient Moon Glow Background */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-700 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border border-indigo-500/30">
                <Moon className="w-3.5 h-3.5 text-amber-700" />
                चांदो पंचांग · Indigenous Lunar Astronomy
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-[11px] font-bold text-emerald-700">
                लाइव चंद्र कला व महापर्व अलर्ट
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-amber-800">
              पारंपरिक संताली चंद्र पंचांग व महापर्व टाइमर
            </h1>
            <p className="text-xs sm:text-sm text-indigo-800/90 leading-relaxed font-medium">
              संताली जीवन चक्र चंद्रमा (चांदो) और प्रकृति के ऋतु-नक्षत्रों से संचालित होता है। जानिए वर्तमान चंद्र कला, आगामी महापर्वों का लाइव काउंटडाउन और पारंपरिक अनुष्ठान विधि।
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <div className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-700" />
                <span className="font-mono text-amber-800 font-bold">
                  {currentTime.toLocaleTimeString('hi-IN')}
                </span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-800">{currentTime.toLocaleDateString('hi-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </div>

          {/* Interactive Moon Visual Card */}
          <div className="lg:col-span-4 bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md flex flex-col items-center text-center space-y-3">
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Moon Visual with Dynamic SVG Shadow */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-100 via-amber-200 to-yellow-50 shadow-[0_0_40px_rgba(252,211,77,0.35)] relative overflow-hidden flex items-center justify-center border-2 border-amber-300/60">
                {/* Surface Craters */}
                <div className="absolute top-3 left-5 w-4 h-4 rounded-full bg-amber-300/30" />
                <div className="absolute bottom-5 right-4 w-6 h-6 rounded-full bg-amber-300/25" />
                <div className="absolute top-10 right-6 w-3 h-3 rounded-full bg-amber-300/20" />

                {/* Shadow overlay based on phase percent */}
                {moonData.phasePercent < 95 && (
                  <div
                    className="absolute inset-0 bg-white/85 transition-all duration-700"
                    style={{
                      clipPath: moonData.isWaxing
                        ? `inset(0 0 0 ${moonData.phasePercent}%)`
                        : `inset(0 ${moonData.phasePercent}% 0 0)`
                    }}
                  />
                )}
              </div>
            </div>

            <div>
              <p className="font-black text-amber-700 text-sm">{moonData.phaseNameDev}</p>
              <p className="text-[11px] font-mono text-indigo-800">{moonData.phaseNameRoman}</p>
              <div className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-800 text-[10px] font-bold">
                <span>दृश्यमान प्रदीप्ति: {moonData.phasePercent}%</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-700 leading-snug font-sans">
              {moonData.description}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 1: LIVE FESTIVAL COUNTDOWN HUB */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-600" />
              आगामी महापर्व लाइव काउंटडाउन (Festival Countdown Clock)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              पर्व चुनें और देखें कि उस पावन उत्सव के आगमन में कितने दिन, घंटे और मिनट शेष हैं।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeakFestival}
              className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-700" />
              <span>पर्व लोकगीत सुनें</span>
            </button>
            <button
              onClick={handleDownloadCalendarEvent}
              className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
            >
              <CalendarIcon className="w-3.5 h-3.5 text-amber-700" />
              <span>कैलेंडर में जोड़ें (.ics)</span>
            </button>
          </div>
        </div>

        {/* Festival Selection Carousel Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          {MAJOR_FESTIVALS_COUNTDOWN.map((fest) => {
            const isSel = fest.id === selectedFestival.id;
            return (
              <button
                key={fest.id}
                onClick={() => setSelectedFestival(fest)}
                className={`px-4 py-2.5 rounded-2xl font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                  isSel
                    ? 'bg-amber-700 text-white shadow-xs font-black ring-2 ring-amber-500/50'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{fest.nameDev}</span>
              </button>
            );
          })}
        </div>

        {/* Big Live Countdown Ticker Box */}
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-stone-50 text-slate-900 p-6 sm:p-8 rounded-3xl shadow-md border border-amber-500/20">
          <div className="text-center space-y-1 mb-6">
            <span className="px-3 py-1 rounded-full bg-white/10 text-amber-700 text-[11px] font-black uppercase tracking-wider">
              {selectedFestival.approxDateStr}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-amber-800 font-serif">
              {selectedFestival.nameDev}
            </h3>
            <p className="text-xs text-amber-800/80 font-mono">
              मुख्य आराध्य: {selectedFestival.sacredDeity}
            </p>
          </div>

          {/* 4 Ticker Clocks */}
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-xl mx-auto">
            <div className="bg-white/40 border border-white/10 p-3 sm:p-4 rounded-2xl text-center">
              <span className="block text-2xl sm:text-5xl font-black text-amber-700 font-mono">
                {countdown.days}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-700 uppercase tracking-wider font-bold">
                दिन (Days)
              </span>
            </div>
            <div className="bg-white/40 border border-white/10 p-3 sm:p-4 rounded-2xl text-center">
              <span className="block text-2xl sm:text-5xl font-black text-amber-700 font-mono">
                {String(countdown.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-700 uppercase tracking-wider font-bold">
                घंटे (Hours)
              </span>
            </div>
            <div className="bg-white/40 border border-white/10 p-3 sm:p-4 rounded-2xl text-center">
              <span className="block text-2xl sm:text-5xl font-black text-amber-700 font-mono">
                {String(countdown.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-700 uppercase tracking-wider font-bold">
                मिनट (Mins)
              </span>
            </div>
            <div className="bg-white/40 border border-white/10 p-3 sm:p-4 rounded-2xl text-center">
              <span className="block text-2xl sm:text-5xl font-black text-amber-600 font-mono animate-pulse">
                {String(countdown.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-700 uppercase tracking-wider font-bold">
                सेकंड (Secs)
              </span>
            </div>
          </div>
        </div>

        {/* Festival Details Card: Offerings & Traditional Song */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sacred Offerings & Rituals */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3 text-xs">
            <h4 className="font-black text-amber-950 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              पारंपरिक अनुष्ठान विधि व पवित्र सामग्रियां
            </h4>
            <p className="text-slate-700 leading-relaxed font-medium">
              {selectedFestival.ritualSummary}
            </p>
            <div>
              <p className="font-bold text-slate-800 mb-1.5">पवित्र चढ़ावा व सामग्रियां:</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedFestival.offerings.map((off, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-amber-900 font-semibold text-[11px]"
                  >
                    🌿 {off}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Authentic Song (Seren) Player */}
          <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-indigo-950 text-sm flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-indigo-700" />
                पर्व का पारंपरिक लोकगीत (सेरेञ)
              </h4>
              <button
                onClick={handleSpeakFestival}
                className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer"
              >
                <span>गीत बोलें ▶</span>
              </button>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-indigo-200 space-y-1.5 font-serif">
              <p className="text-sm font-black text-slate-900 leading-relaxed">
                "{selectedFestival.traditionalSeren.dev}"
              </p>
              <p className="text-indigo-800 font-mono text-[11px]">
                ({selectedFestival.traditionalSeren.roman})
              </p>
              <p className="text-slate-600 font-sans text-xs pt-1 border-t border-slate-100">
                भावार्थ: {selectedFestival.traditionalSeren.hindi}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: THE 12 SANTALI LUNAR MONTHS DIRECTORY */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-700" />
            संताली १२ चांदो (महीने) व प्रकृति चक्र
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            प्रत्येक चांदो (माह) का संबंध विशिष्ट वृक्षों, पक्षियों, कृषि कार्यों और अनुष्ठानों से जुड़ा है।
          </p>
        </div>

        {/* 12 Months Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SANTALI_LUNAR_MONTHS.map((mon, index) => {
            const isSel = mon.id === selectedMonth.id;
            return (
              <div
                key={mon.id}
                onClick={() => setSelectedMonth(mon)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-2.5 text-xs ${
                  isSel
                    ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-500/30 shadow-xs'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-200/80 text-slate-700 font-black text-[10px]">
                    माह {index + 1} · {mon.gregorianMonths}
                  </span>
                  <span className="font-mono text-amber-800 font-bold text-[11px]">
                    {mon.nameRoman}
                  </span>
                </div>

                <div>
                  <h3 className="font-black text-slate-900 text-sm font-serif">
                    {mon.nameSantaliDev}
                  </h3>
                  <p className="text-amber-800 font-bold text-xs mt-0.5">
                    {mon.festivalDev}
                  </p>
                </div>

                <div className="space-y-1 text-slate-600 text-[11px] leading-relaxed pt-1 border-t border-slate-200/60">
                  <p>
                    <strong className="text-slate-800">🌿 प्रकृति संकेत:</strong> {mon.natureSigns}
                  </p>
                  <p>
                    <strong className="text-slate-800">🌾 कृषि चरण:</strong> {mon.agriculturalStage}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
