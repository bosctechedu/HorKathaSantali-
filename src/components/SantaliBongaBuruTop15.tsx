import React, { useState } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { safeLoadFromStorage } from '../utils/storage';
import {
  Flame,
  Sparkles,
  Volume2,
  Search,
  TreePine,
  Shield,
  Heart,
  Landmark,
  Compass,
  ArrowRight,
  Sun,
  Users,
  Feather,
  Info,
  CheckCircle
} from 'lucide-react';

export interface BongaBuruDeity {
  id: number;
  nameDevanagari: string;
  nameRoman: string;
  titleHindi: string;
  category: 'jaher_than' | 'village_border' | 'household_ancestor' | 'seasonal_nature';
  categoryLabel: string;
  sacredShrine: string;
  primaryPriest: string;
  mainFestivals: string[];
  sacredOfferings: string[];
  bakherPrayerDev: string;
  bakherPrayerHindi: string;
  spiritualSignificance: string;
  iconBg: string;
  gradient: string;
}

export const TOP_15_BONGA_BURU: BongaBuruDeity[] = [
  {
    id: 1,
    nameDevanagari: '१. मारांग बुरु',
    nameRoman: '1. Marang Buru',
    titleHindi: 'सर्वोच्च प्रधान देवता (महान पर्वत देव / The Supreme Guardian Mountain Deity)',
    category: 'jaher_than',
    categoryLabel: 'जाहेर थान व सर्वोच्च देव',
    sacredShrine: 'जाहेर थान (पवित्र साल कुंज) एवं पारसनाथ पर्वत शृंखला',
    primaryPriest: 'नायके (ग्राम मुख्य पुजारी)',
    mainFestivals: ['बाहा (Baha)', 'सोहराय (Sohrai)', 'एरोक (Erok\')', 'माघे'],
    sacredOfferings: ['सफेद मुर्गा / श्वेत आहुति', 'अरवा चावल', 'सिंदूर', 'तपवन दाक् (पवित्र जल)'],
    bakherPrayerDev: 'जोहार मारांग बुरु! आतो-दिशोम रे सुख-शांति ताहेंन मा, रोग-बेमारी साहाक् मा, आबोवाक पारसी आर लाकचार जायजुग जियाव ताहेंन मा!',
    bakherPrayerHindi: 'हे मारांग बुरु! आपको सादर जोहार! हमारे समस्त गांव और देश में सुख-शांति बनी रहे, सभी रोग-कष्ट दूर हों, और हमारी संताली भाषा व संस्कृति युगों-युगों तक जीवित रहे!',
    spiritualSignificance: 'संताल धर्म (सारना धर्म) में मारांग बुरु को पिता तुल्य सर्वोच्च संरक्षक माना जाता है। पिलचु हाड़ाम और पिलचु बुढ़ी के प्रथम मार्गदर्शक भी मारांग बुरु ही थे।',
    iconBg: 'bg-amber-100 text-amber-900',
    gradient: 'from-amber-700 via-orange-800 to-stone-950'
  },
  {
    id: 2,
    nameDevanagari: '२. जाहेर एरा',
    nameRoman: '2. Jaher Era',
    titleHindi: 'जाहेर थान की पावन अधिष्ठात्री देवी (Lady of the Sacred Grove)',
    category: 'jaher_than',
    categoryLabel: 'जाहेर थान व सर्वोच्च देव',
    sacredShrine: 'जाहेर थान (पवित्र साल वृक्षों के नीचे स्थापित गोल प्रस्तर)',
    primaryPriest: 'नायके',
    mainFestivals: ['बाहा परोब (Baha)', 'सोहराय', 'एरोक सिमी'],
    sacredOfferings: ['सारजोम बाहा (साल के ताजे फूल)', 'दूध', 'सिंदूर', 'अरवा चावल'],
    bakherPrayerDev: 'जोहार जाहेर एरा आय़ो! सारजोम बाहा लेका गे आबोवाक जियान रासका पेरेज् कोक् मा, गछ-बिरु को सुहावेन मा!',
    bakherPrayerHindi: 'हे जाहेर एरा माता! आपको कोटि-कोटि जोहार! साल के ताजे खिले फूलों की तरह हमारे जीवन में सदा आनंद भरा रहे और प्रकृति हरी-भरी रहे!',
    spiritualSignificance: 'समस्त गांव की माता और प्रकृति वंदना की मुख्य देवी। बाहा पर्व पर साल के प्रथम खिले पुष्प सबसे पहले जाहेर एरा को ही अर्पित किए जाते हैं।',
    iconBg: 'bg-emerald-100 text-emerald-900',
    gradient: 'from-emerald-700 via-teal-800 to-stone-950'
  },
  {
    id: 3,
    nameDevanagari: '३. मोड़ेको-तुरुईको',
    nameRoman: '3. Moreko-Turuiko',
    titleHindi: 'पंच-षष्ठ देव समूह (अग्नि, वायु, वृष्टि व प्रकृति तत्व रक्षक)',
    category: 'jaher_than',
    categoryLabel: 'जाहेर थान व सर्वोच्च देव',
    sacredShrine: 'जाहेर थान में जाहेर एरा के समीप पवित्र प्रस्तर',
    primaryPriest: 'नायके',
    mainFestivals: ['बाहा', 'सोहराय', 'आसाढ़िया'],
    sacredOfferings: ['लाल मुर्गा / आहुति', 'सिंदूर', 'अरवा चावल', 'साल पत्र'],
    bakherPrayerDev: 'जोहार मोड़ेको-तुरुईको! दाक्-अंगार आलो सेटेरोक् मा, ठीक समोय रे दाक्-जाड़ी हिजुक मा, चास-बास नापाय् हुयुक् मा!',
    bakherPrayerHindi: 'हे मोड़ेको-तुरुईको! भीषण अग्निकांड और आपदाओं से गांव की रक्षा करें, समय पर वर्षा हो और हमारे खेत-खलिहान धन-धान्य से भर जाएं!',
    spiritualSignificance: 'ये पांच/छह भाइयों का दिव्य समूह है जो प्रकृति के तत्वों (अग्नि, जल, वायु, आकाश, पृथ्वी) का संतुलन बनाए रखते हैं।',
    iconBg: 'bg-rose-100 text-rose-900',
    gradient: 'from-rose-700 via-red-800 to-stone-950'
  },
  {
    id: 4,
    nameDevanagari: '४. गोसायं एरा',
    nameRoman: '4. Gosayn Era',
    titleHindi: 'पवित्र वनदेवी (जल स्रोत व वनस्पति शीतलता की रक्षक देवी)',
    category: 'jaher_than',
    categoryLabel: 'जाहेर थान व सर्वोच्च देव',
    sacredShrine: 'जाहेर थान में महुआ या साल के वृक्ष के नीचे',
    primaryPriest: 'नायके',
    mainFestivals: ['बाहा', 'सोहराय'],
    sacredOfferings: ['सफेद पुष्प', 'तपवन दाक्', 'अरवा चावल'],
    bakherPrayerDev: 'जोहार गोसायं एरा! आतो रेन गिदरा-पिदरा को रेयाड़-रुआ खोन बांचाव काकोम!',
    bakherPrayerHindi: 'हे दयामयी गोसायं एरा! गांव के बालक-बालिकाओं और पशुओं को मौसमी बीमारियों, चेचक और ज्वर से सुरक्षित रखें!',
    spiritualSignificance: 'गोसायं एरा को अत्यंत दयालु देवी माना जाता है जो बच्चों की स्वास्थ्य रक्षा और जल स्रोतों की पवित्रता का पोषण करती हैं।',
    iconBg: 'bg-cyan-100 text-cyan-900',
    gradient: 'from-cyan-700 via-blue-800 to-slate-950'
  },
  {
    id: 5,
    nameDevanagari: '५. परगना बोंगा',
    nameRoman: '5. Pargana Bonga',
    titleHindi: 'क्षेत्रीय अधिष्ठाता देव (12-20 गांवों की सीमा व न्याय के संरक्षक)',
    category: 'village_border',
    categoryLabel: 'सीमांत व ग्राम रक्षक',
    sacredShrine: 'परगना क्षेत्र के प्रमुख वन या सीमांत टीले पर',
    primaryPriest: 'दिशोम परगना व नायके समूह',
    mainFestivals: ['दिशोम सेंदरा', 'वार्षिक परगना बैसी'],
    sacredOfferings: ['बलिदान आहुति', 'सिंदूर', 'इचाक बाहा (धाय के फूल)'],
    bakherPrayerDev: 'जोहार परगना बोंगा! मोड़े हातु बार हातु रे एकथा ताहेंन मा, न्याय रेयाक दाड़े एम आबोम!',
    bakherPrayerHindi: 'हे परगना बोंगा! अनेक गांवों में अटूट एकता बनी रहे और हमारे सामाजिक न्याय में सत्य की विजय हो!',
    spiritualSignificance: 'अंतर-ग्राम सुरक्षा, बड़े विवादों में निष्पक्ष सत्य की प्रतिष्ठा और समाज की व्यापक एकता के प्रतीक।',
    iconBg: 'bg-indigo-100 text-indigo-900',
    gradient: 'from-indigo-700 via-blue-900 to-stone-950'
  },
  {
    id: 6,
    nameDevanagari: '६. मांझी बोंगा / मांझी थान',
    nameRoman: '6. Majhi Bonga',
    titleHindi: 'ग्राम संस्थापक देव (गांव के प्रथम प्रधान की अमर आत्मा)',
    category: 'village_border',
    categoryLabel: 'सीमांत व ग्राम रक्षक',
    sacredShrine: 'मांझी थान (गांव के चौराहे / कुलही के मध्य स्थित पारंपरिक चबूतरा)',
    primaryPriest: 'मांझी हाड़ाम एवं नायके',
    mainFestivals: ['सोहराय', 'बापला (विवाह)', 'कुलही दुरुप (ग्राम सभा)'],
    sacredOfferings: ['हंड़िया/तपवन दाक्', 'अरवा चावल', 'धूप-दीप'],
    bakherPrayerDev: 'जोहार मांझी हाड़ाम बोंगा! आतो रे आमाक थुम ताहेंन मा, कुलही दुरुप रे विचार सागुन कोक् मा!',
    bakherPrayerHindi: 'हे ग्राम संस्थापक मांझी बोंगा! गांव पर आपकी छत्रछाया बनी रहे और ग्राम सभा में लिया गया प्रत्येक निर्णय निष्पक्ष व मंगलमय हो!',
    spiritualSignificance: 'गांव के हर बड़े निर्णय, विवाह की बारात के आगमन और पर्वों के आरंभ से पूर्व मांझी थान पर मत्था टेकना अनिवार्य है।',
    iconBg: 'bg-amber-100 text-amber-900',
    gradient: 'from-amber-600 via-stone-800 to-stone-950'
  },
  {
    id: 7,
    nameDevanagari: '७. सिमा बोंगा',
    nameRoman: '7. Sima Bonga',
    titleHindi: 'ग्राम सीमांत रक्षक देव (बाहरी संकटों से रक्षा करने वाले देव)',
    category: 'village_border',
    categoryLabel: 'सीमांत व ग्राम रक्षक',
    sacredShrine: 'गांव की चारों सीमाओं (सिमाना) के पत्थर/वृक्ष पर',
    primaryPriest: 'कुड़ाम नायके (सीमांत पुजारी)',
    mainFestivals: ['सोहराय', 'बाहा', 'माघे'],
    sacredOfferings: ['कुड़ाम नायके के बाएं पैर/हाथ से रक्त अर्पण', 'चावल', 'सिंदूर'],
    bakherPrayerDev: 'जोहार सिमा बोंगा! बाहरे खोन चेद हों बाड़ीच् आलो बोलोक् मा, आतो सिमाना साफा ताहेंन मा!',
    bakherPrayerHindi: 'हे सीमा रक्षक बोंगा! गांव की सीमा के बाहर से कोई बुरी शक्ति या महामारी अंदर न आ सके, चारों दिशाओं से गांव सुरक्षित रहे!',
    spiritualSignificance: 'कुड़ाम नायके गांव की सीमा पर स्वयं की उंगली या आहुति से अर्पण करके गांव के चारों ओर अदृश्य रक्षा चक्र स्थापित करते हैं।',
    iconBg: 'bg-red-100 text-red-900',
    gradient: 'from-red-800 via-stone-900 to-black'
  },
  {
    id: 8,
    nameDevanagari: '८. हातु बोंगा',
    nameRoman: '8. Hatu Bonga',
    titleHindi: 'समग्र ग्राम अधिष्ठाता देव (गांव की सुख-समृद्धि व आरोग्य देव)',
    category: 'village_border',
    categoryLabel: 'सीमांत व ग्राम रक्षक',
    sacredShrine: 'ग्राम की सामूहिक कुलही अथवा अखड़ा के समीप',
    primaryPriest: 'नायके',
    mainFestivals: ['सोहराय', 'एरोक सिमी'],
    sacredOfferings: ['धान की नई बालियां', 'अरवा चावल', 'धूप'],
    bakherPrayerDev: 'जोहार हातु बोंगा! जोतो परिवार रे सुलूक ताहेंन मा, आबोवाक हातु मारांग कोक् मा!',
    bakherPrayerHindi: 'हे हातु बोंगा! गांव के प्रत्येक घर में परस्पर प्रेम और मेल-जोल बना रहे, हमारा गांव सदा उन्नत रहे!',
    spiritualSignificance: 'ग्रामवासियों के बीच आपसी सौहार्द और सामूहिक सुरक्षा के अधिष्ठाता।',
    iconBg: 'bg-yellow-100 text-yellow-900',
    gradient: 'from-yellow-700 via-amber-800 to-stone-950'
  },
  {
    id: 9,
    nameDevanagari: '९. ओड़ाक् बोंगा',
    nameRoman: '9. Odaq Bonga',
    titleHindi: 'गुप्त गृह कुलदेवता (परिवार के भीतरी कक्ष के रक्षक देव)',
    category: 'household_ancestor',
    categoryLabel: 'गृह व कुल देवता',
    sacredShrine: 'घर का भीतरी पवित्र कक्ष (भितार / Bhitar)',
    primaryPriest: 'परिवार का मुखिया (ओड़ाक् हाड़ाम)',
    mainFestivals: ['सोहराय', 'बाहा', 'नवान्न (जोम नावा)'],
    sacredOfferings: ['घर की बनी शुद्ध हंड़िया (तपवन)', 'अरवा चावल', 'विशेष गुप्त भोग'],
    bakherPrayerDev: 'जोहार ओड़ाक् बोंगा! आबोवाक घारोज रे दुख-कष्ट आलो हिजुक मा, धान-धुरिब पेरेज् कोक् मा!',
    bakherPrayerHindi: 'हे ओड़ाक् बोंगा! हमारे घर-आंगन में कोई दुख-तकलीफ न आए, परिवार धन-धान्य और खुशियों से परिपूर्ण रहे!',
    spiritualSignificance: 'ओड़ाक् बोंगा का नाम केवल घर के मुखिया को ज्ञात होता है। बाहरी व्यक्तियों को भितार (भीतरी कक्ष) में प्रवेश की अनुमति नहीं होती।',
    iconBg: 'bg-purple-100 text-purple-900',
    gradient: 'from-purple-700 via-violet-900 to-stone-950'
  },
  {
    id: 10,
    nameDevanagari: '१०. आबगे बोंगा',
    nameRoman: '10. Abge Bonga',
    titleHindi: 'विशिष्ट पारिस/गोत्र के गुप्त कुलदेवता (Clan Ancestral Spirit)',
    category: 'household_ancestor',
    categoryLabel: 'गृह व कुल देवता',
    sacredShrine: 'घर का भितार (Bhitar) अथवा कुल का गुप्त पूजा स्थल',
    primaryPriest: 'गोत्र का वरिष्ठ पुरुष सदस्य',
    mainFestivals: ['वार्षिक आबगे पूजा (५ वर्ष में एक बार अथवा विशेष अवसर)'],
    sacredOfferings: ['मेढ़ा/बकरा आहुति', 'शुद्ध अरवा चावल', 'गुप्त मंत्र'],
    bakherPrayerDev: 'जोहार आबगे बोंगा! आबोवाक पारिस आक मान-गोरोब ताहेंन मा, वंश-खानदान लाहाक् मा!',
    bakherPrayerHindi: 'हे हमारे गोत्र के आबगे बोंगा! हमारे कुल का मान-सम्मान बना रहे और हमारी आने वाली पीढ़ियां यशस्वी हों!',
    spiritualSignificance: '१२ पारिस (हाँसदा, मुर्मू, किस्कू आदि) के अलग-अलग आबगे बोंगा होते हैं। यह पूजा केवल वंशजों द्वारा अत्यंत गोपनीयता से संपन्न होती है।',
    iconBg: 'bg-stone-200 text-stone-900',
    gradient: 'from-stone-700 via-stone-800 to-black'
  },
  {
    id: 11,
    nameDevanagari: '११. हापड़ाम को',
    nameRoman: '11. Hapram Ko',
    titleHindi: 'दिवंगत पितृ-पूर्वज वंदना (The Honored Ancestral Spirits)',
    category: 'household_ancestor',
    categoryLabel: 'गृह व कुल देवता',
    sacredShrine: 'भितार (Bhitar) एवं घर की चौखट',
    primaryPriest: 'परिवार के समस्त सदस्य',
    mainFestivals: ['प्रतिदिन भोजन से पूर्व', 'सोहराय', 'बाहा', 'भांडान'],
    sacredOfferings: ['चोंड (भोजन का प्रथम ग्रास)', 'दाक् (प्रथम जल अर्पण)'],
    bakherPrayerDev: 'जोहार हापड़ाम को! आय़ो-बाबा, ताता-दादी! आबोवाक चोंड दाक् आतांग पे, आबोवाक चेतान रे थुम दोहोय पे!',
    bakherPrayerHindi: 'हे हमारे दिवंगत पूर्वजों, माता-पिता, दादा-दादियों! हमारे द्वारा अर्पित यह प्रथम अन्न और जल ग्रहण करें तथा परिवार पर सदैव आशीष बनाए रखें!',
    spiritualSignificance: 'संताल जीवन में पूर्वज कभी मरते नहीं, वे परिवार के साथ ही अदृश्य रूप से रहते हैं और हर सुख-दुख में सहभागिता करते हैं।',
    iconBg: 'bg-teal-100 text-teal-900',
    gradient: 'from-teal-700 via-emerald-800 to-stone-950'
  },
  {
    id: 12,
    nameDevanagari: '१२. बिर बोंगा / सेंदरा बोंगा',
    nameRoman: '12. Bir Bonga / Sendra Bonga',
    titleHindi: 'वन एवं शिकार अधिष्ठाता देव (Deity of the Wild Forests & Hunt)',
    category: 'seasonal_nature',
    categoryLabel: 'ऋतु, कृषि व वन देव',
    sacredShrine: 'गहन वनों की गुफाएं, विशाल चट्टानें व वन देवता थान',
    primaryPriest: 'दिशोम देहरी (शिकार अभियान प्रमुख)',
    mainFestivals: ['दिशोम सेंदra (अयोध्या / पारसनाथ सेंदरा)'],
    sacredOfferings: ['वन्य पुष्प', 'सिंदूर', 'शिकार का प्रथम अंश'],
    bakherPrayerDev: 'जोहार बिर बोंगा! वीर-जंगल रे कोड़ा को नापाय् ते को ताहेंन मा, बां हुयुक् मा चेद हों बिपत्ति!',
    bakherPrayerHindi: 'हे वन देवता बिर बोंगा! घने जंगलों में शिकार पर गए हमारे नवयुवकों की रक्षा करें, कोई हिंसक जीव या विपदा उन पर न आए!',
    spiritualSignificance: 'संताल शिकारी वन में प्रवेश करने से पूर्व बिर बोंगा से अनुमति मांगते हैं और कभी भी गर्भवती या छोटे वन्य जीवों का शिकार नहीं करते।',
    iconBg: 'bg-green-100 text-green-950',
    gradient: 'from-green-800 via-emerald-950 to-black'
  },
  {
    id: 13,
    nameDevanagari: '१३. करम बोंगा / करम गोसायं',
    nameRoman: '13. Karam Bonga',
    titleHindi: 'करम डाल अधिष्ठाता देव (भ्रातृ-रक्षा, यौवन व वनस्पति देवता)',
    category: 'seasonal_nature',
    categoryLabel: 'ऋतु, कृषि व वन देव',
    sacredShrine: 'आंगन के मध्य रोपी गई पवित्र करम वृक्ष की दो डालियां',
    primaryPriest: 'गांव के बुजुर्ग एवं उपवास रखने वाली बहनें',
    mainFestivals: ['करम परोब (भाद्रपद शुक्ल एकादशी)'],
    sacredOfferings: ['जावा बाहा (अंकुरित अन्न)', 'धूप-दीप', 'दूध-गुड़', 'सिंदूर'],
    bakherPrayerDev: 'जोहार करम गोसायं! बोएहा कोवाक आयु बाड़हाव मा, घारोज रे सुख-शांति पेरेज् मा!',
    bakherPrayerHindi: 'हे करम गोसायं! हमारे भाइयों की दीर्घायु हो, खेतों में फसलें लहलहाएं और परिवार में सदा खुशहाली बनी रहे!',
    spiritualSignificance: 'करम-धरम की पौराणिक कथा से जुड़ा यह पर्व प्रकृति के प्रति समर्पण और भाई-बहन के पवित्र प्रेम का सबसे बड़ा उत्सव है।',
    iconBg: 'bg-yellow-100 text-yellow-950',
    gradient: 'from-yellow-600 via-amber-800 to-stone-950'
  },
  {
    id: 14,
    nameDevanagari: '१४. एरोक बोंगा / आसाढ़िया पूजा',
    nameRoman: '14. Erok\' Bonga',
    titleHindi: 'प्रथम धान बुवाई व बीज उर्वरता देव (The Sowing Spirit of Fertility)',
    category: 'seasonal_nature',
    categoryLabel: 'ऋतु, कृषि व वन देव',
    sacredShrine: 'जाहेर थान एवं गांव के प्रथम जोते गए खेत',
    primaryPriest: 'नायके',
    mainFestivals: ['एरोक सिमी (आषाढ़ मास)'],
    sacredOfferings: ['प्रथम धान के बीज', 'मुर्गा आहुति', 'सिंदूर'],
    bakherPrayerDev: 'जोहार एरोक बोंगा! धात्री रे बीज रोहोय एना, जोतो इता सुहावेन मा, पोका-माकोड़ खोन बांचाव मा!',
    bakherPrayerHindi: 'हे एरोक बोंगा! धरती माता की गोद में बीज बो दिए गए हैं, प्रत्येक दाना अंकुरित हो और कीट-पतंगों से फसल सुरक्षित रहे!',
    spiritualSignificance: 'जब तक जाहेर थान में एरोक बोंगा की पूजा नहीं होती, तब तक कोई भी ग्रामीण अपने खेतों में धान की बुवाई शुरू नहीं करता।',
    iconBg: 'bg-lime-100 text-lime-950',
    gradient: 'from-lime-700 via-emerald-800 to-stone-950'
  },
  {
    id: 15,
    nameDevanagari: '१५. माघे बोंगा',
    nameRoman: '15. Maghe Bonga',
    titleHindi: 'कृषि अनुबंध मुक्ति व नववर्ष संकल्प देव (The Winter Solace Spirit)',
    category: 'seasonal_nature',
    categoryLabel: 'ऋतु, कृषि व वन देव',
    sacredShrine: 'जाहेर थान एवं कुलही',
    primaryPriest: 'नायके',
    mainFestivals: ['माघे परोब (माघ मास)'],
    sacredOfferings: ['माघे घास/तृण', 'नया चावल', 'तपवन दाक्'],
    bakherPrayerDev: 'जोहार माघे बोंगा! पूरा सेरमा रेयाक कामी मुचादेना, नावा सेरमा रे नावा शक्ति एम आबोम!',
    bakherPrayerHindi: 'हे माघे बोंगा! वर्ष भर के कठिन परिश्रम और अनुबंध पूरे हुए, नए वर्ष में हमें नई शक्ति और समृद्धि प्रदान करें!',
    spiritualSignificance: 'कृषि मजदूरों के पुराने अनुबंध समाप्त होते हैं, घर की छतों की मरम्मत होती है और प्रकृति के साथ नए साल का सामंजस्य बैठता है।',
    iconBg: 'bg-orange-100 text-orange-950',
    gradient: 'from-orange-700 via-amber-900 to-stone-950'
  }
];

export const SantaliBongaBuruTop15: React.FC = () => {
  const [deitiesList] = useState<BongaBuruDeity[]>(() => safeLoadFromStorage('hor_katha_cms_bonga_buru', TOP_15_BONGA_BURU));
  const [selectedDeity, setSelectedDeity] = useState<BongaBuruDeity>(() => deitiesList[0] || TOP_15_BONGA_BURU[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredDeities = deitiesList.filter((d) => {
    const matchesSearch =
      d.nameDevanagari.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.nameRoman.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.titleHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.sacredShrine.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeCategory === 'all') return matchesSearch;
    return matchesSearch && d.category === activeCategory;
  });

  const handleSpeak = (deity: BongaBuruDeity) => {
    const speech = `${deity.nameDevanagari}. ${deity.titleHindi}. पूजा स्थल: ${deity.sacredShrine}. मुख्य पुजारी: ${deity.primaryPriest}. पवित्र प्रार्थना बाखेर: ${deity.bakherPrayerHindi}. आध्यात्मिक महत्व: ${deity.spiritualSignificance}`;
    speakWithFemaleVoice(speech, { lang: 'hi-IN' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-stone-900 to-red-950 text-white p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              बोंगा-बुरु (Bonga Buru) · पवित्र आध्यात्मिक परंपरा
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/30 text-[11px] font-bold text-amber-200">
              Top 15 Sacred Deities &amp; Rituals
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-amber-100">
            शीर्ष १५ पूजा-पाठ एवं बोंगा-बुरु परंपरा
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed font-medium">
            मारांग बुरु, जाहेर एरा, मोड़ेको-तुरुईको, ओड़ाक् बोंगा और हापड़ाम को की प्रामाणिक पूजा-पद्धति, पवित्र थान, भोग-प्रसाद व पवित्र बाखेर (प्रार्थना वंदना)।
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleSpeak(selectedDeity)}
            className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Volume2 className="w-4 h-4 text-slate-950" />
            <span>बाखेर वंदना सुनें (Listen)</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'सभी १५ बोंगा-बुरु' },
            { id: 'jaher_than', label: 'जाहेर थान (Jaher Than)' },
            { id: 'village_border', label: 'ग्राम व सीमांत (Village & Border)' },
            { id: 'household_ancestor', label: 'गृह व कुल देवता (Ancestral)' },
            { id: 'seasonal_nature', label: 'ऋतु व प्रकृति (Nature & Seasons)' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-700 text-white shadow-2xs font-black'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="बोंगा या थान खोजें..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
        </div>
      </div>

      {/* Main Grid: Left List + Right Detail Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Deity Cards */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
          {filteredDeities.map((deity) => {
            const isSelected = deity.id === selectedDeity.id;
            return (
              <div
                key={deity.id}
                onClick={() => setSelectedDeity(deity)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-amber-50/90 border-amber-400 shadow-sm ring-1 ring-amber-400/50'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-2xl ${deity.iconBg} flex items-center justify-center font-bold text-base shadow-2xs shrink-0`}
                  >
                    <Flame className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-sm sm:text-base">
                      {deity.nameDevanagari}
                    </h3>
                    <p className="text-xs text-amber-800 font-bold">
                      {deity.nameRoman}
                    </p>
                    <span className="text-[10px] text-slate-500 font-medium line-clamp-1">
                      {deity.titleHindi}
                    </span>
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

        {/* Right Column: Detailed Sacred Dossier */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-5 flex items-start justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-black uppercase tracking-wider">
                {selectedDeity.categoryLabel}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                {selectedDeity.nameDevanagari}
              </h2>
              <p className="text-sm sm:text-base font-bold text-amber-800 mt-0.5">
                {selectedDeity.nameRoman} — {selectedDeity.titleHindi}
              </p>
            </div>

            <button
              onClick={() => handleSpeak(selectedDeity)}
              className="p-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-all hover:scale-105 cursor-pointer shadow-2xs shrink-0"
              title="बाखेर वंदना सुनें"
            >
              <Volume2 className="w-5 h-5 text-amber-700" />
            </button>
          </div>

          {/* Shrine & Priest Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5 text-amber-600" />
                <span>पवित्र पूजा स्थल (Sacred Shrine):</span>
              </span>
              <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                {selectedDeity.sacredShrine}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-sky-600" />
                <span>मुख्य पुजारी / अर्चक (Priest):</span>
              </span>
              <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                {selectedDeity.primaryPriest}
              </p>
            </div>
          </div>

          {/* Offerings & Festivals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>पारंपरिक पवित्र भोग व नैवेद्य (Offerings):</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedDeity.sacredOfferings.map((off, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-xl bg-white text-[11px] font-bold text-slate-800 border border-slate-200 shadow-2xs"
                  >
                    {off}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <TreePine className="w-3.5 h-3.5 text-emerald-600" />
                <span>प्रमुख पावन पर्व (Main Festivals):</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedDeity.mainFestivals.map((fest, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-xl bg-emerald-50 text-[11px] font-bold text-emerald-900 border border-emerald-200"
                  >
                    {fest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Authentic Bakher Prayer */}
          <div className="p-5 rounded-3xl bg-amber-50 border-2 border-amber-300 space-y-2 shadow-xs">
            <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
              <Flame className="w-4 h-4 text-amber-600" />
              <span>पवित्र संताली बाखेर (Sacred Bakher Prayer / मंत्र वंदना):</span>
            </div>
            <p className="text-base sm:text-lg font-serif font-black text-amber-950 leading-relaxed">
              “{selectedDeity.bakherPrayerDev}”
            </p>
            <p className="text-xs sm:text-sm text-slate-700 italic border-t border-amber-200 pt-2 mt-2 leading-relaxed">
              <strong>हिन्दी भावार्थ:</strong> {selectedDeity.bakherPrayerHindi}
            </p>
          </div>

          {/* Spiritual Significance */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-stone-500" />
              <span>आध्यात्मिक एवं दार्शनिक महत्व:</span>
            </span>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              {selectedDeity.spiritualSignificance}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
