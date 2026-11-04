import React, { useState, useEffect } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import {
  Calendar,
  Sparkles,
  Clock,
  Volume2,
  Sun,
  Flower2,
  CheckCircle2,
  BookOpen,
  Edit2,
  Trash2,
  Plus,
  X,
  Save,
  Feather,
  Utensils,
  Flame
} from 'lucide-react';

export interface FestivalData {
  id: string;
  nameDevanagari: string;     // संताली देवनागरी में नाम (उदा. सोहराय परोब)
  nameRoman: string;          // Sohrai Parab
  nameHindi: string;          // सोहराय महापर्व
  santaliMonth: string;       // सोहराय / अगहन (कार्तिक - मार्गशीर्ष)
  gregorianPeriod: string;    // कार्तिक अमावस्या / दीपावली काल
  duration: string;           // 5 दिवसीय महापर्व
  deityHonored: string;       // मरांग बुरु, जाहेर एरा, पशु-धन पूर्वज
  themeColor: string;
  subheading: string;         // उप-शीर्षक: कृषि, पशु-धन और प्रकृति के प्रति आभार का महापर्व
  significanceParagraph: string; // विस्तृत पैराग्राफ: पर्व का महत्व व दर्शन
  historicalBackgroundParagraph: string; // विस्तृत पैराग्राफ: ऐतिहासिक पृष्ठभूमि
  detailedRitualsParagraph: string;      // विस्तृत पैराग्राफ: संपूर्ण अनुष्ठान विधि
  festiveFoodsParagraph: string;         // विस्तृत पैराग्राफ: पारंपरिक खानपान
  traditionalSongSnippet: {
    santaliDev: string;       // संताली देवनागरी में गीत
    roman: string;
    hindi: string;
  };
}

export const DEFAULT_SANTALI_FESTIVALS: FestivalData[] = [
  {
    id: 'sohrai',
    nameDevanagari: 'सोहराय परोब',
    nameRoman: 'Sohrai Parab',
    nameHindi: 'सोहराय महापर्व (आदिवासी कृषि व पशु वंदना उत्सव)',
    santaliMonth: 'सोहराय / अगहन (अक्टूबर - नवंबर)',
    gregorianPeriod: 'कार्तिक अमावस्या एवं दीपावली काल',
    duration: '5 दिवसीय महापर्व',
    deityHonored: 'मरांग बुरु, जाहेर एरा, गोठ बोंगा एवं गौ-वंश पूर्वज',
    themeColor: 'from-amber-600 via-orange-600 to-rose-700',
    subheading: 'खेत-खलिहान, गौ-धन और प्रकृति की अटूट कृतज्ञता का सबसे बड़ा संताली महापर्व',
    significanceParagraph:
      'सोहराय संताल समाज का प्राण और सबसे उल्लासपूर्ण लोक महापर्व है। यह केवल एक उत्सव नहीं, बल्कि कृषि सभ्यता, धरती माता और मूक पशुओं के प्रति अगाध प्रेम और कृतज्ञता का प्रत्यक्ष प्रकटीकरण है। खेतों में जब सुनहरी धान की बालियां पककर झूमने लगती हैं, तब पूरे गांव में उल्लास की लहर दौड़ जाती है। महिलाएं अपने कच्चे मिट्टी के घरों की दीवारों को प्राकृतिक रंगों—काली मिट्टी, लाल गेरू और सफेद खड़िया से सोहराय भित्तिचित्रों (Murals) से सजाती हैं, जिनमें मोर, बैल, हिरण और लताएं जीवंत हो उठती हैं।',
    historicalBackgroundParagraph:
      'पौराणिक संताली लोककथाओं के अनुसार, मरांग बुरु ने जब मनुष्यों को कृषि का ज्ञान दिया, तब बैलों और गायों ने दिन-रात परिश्रम करके धरती को उपजाऊ बनाया। मनुष्यों ने ईश्वर से प्रार्थना की कि वर्ष में एक बार वे अपने पशु-धन को अपने परिवार का मुखिया मानकर उनकी पूजा करेंगे, उन्हें तेल-सिंदूर से सजाएंगे और उनके सामने नतमस्तक होंगे। इस प्रकार सदियों से सोहराय आपसी समरसता और प्रकृति प्रेम का पावन संदेश देता आ रहा है।',
    detailedRitualsParagraph:
      'यह महापर्व पूरे 5 दिनों तक अत्यंत विधि-विधान से मनाया जाता है:\n• प्रथम दिन (उम माहा): ग्रामीण नदी-तालाबों में पवित्र स्नान करते हैं। नायके (गांव के मुख्य पुजारी) द्वारा गांव के बाहर गोठ पूजा होती है और सुख-शांति हेतु बोंगा को अर्घ्य दिया जाता है।\n• द्वितीय दिन (डाका माहा): प्रत्येक घर में पूर्वजों (हाड़ाम-बुढ़ी) के लिए नए धान के चावल का भोजन व तपान दाक (पवित्र पेय) अर्पित किया जाता है।\n• तृतीय दिन (खूंटाव माहा): यह पशु-वंदना का मुख्य दिन है। बैलों और गायों के सींगों पर सरसों तेल और सिंदूर लगाया जाता है, धान की बालियों के मुकुट पहनाए जाते हैं और मांदर की गूंज पर उनका अभिनंदन होता है।\n• चतुर्थ दिन (जाले माहा): युवक-युवतियां मांदर और नगाड़े की थाप पर घर-घर जाकर पारंपरिक सोहराय लोकगीत गाते हैं और बुजुर्गों से आशीर्वाद लेते हैं।\n• पंचम दिन (हाकु-काटकोम माहा): ग्रामीण सामूहिक रूप से मछली और केकड़ा पकड़ते हैं तथा गांव में सामूहिक खिचड़ी (सुड़सुड़ी) बनाकर उत्सव का समापन करते हैं।',
    festiveFoodsParagraph:
      'सोहराय के पावन अवसर पर नए धान के चावल से बने स्वादिष्ट पीठा, ढेबड़ा, घोंघा-केकड़े का पारंपरिक व्यंजन, ताजी साग-सब्जियां और महुआ से सुवासित तपान दाक बड़े आदर के साथ अतिथियों और कुटुम्बों को परोसा जाता है।',
    traditionalSongSnippet: {
      santaliDev: 'सोहराय सेटेरेना गाते, तुमदाग टामाक साडे काना, हासा ओड़ाक सोहराय जोहार...',
      roman: 'Sohrai seterena gate, tumdag tamak sade kana, hasa orak sohrai johar...',
      hindi: 'हे सखी, खुशियों का सोहराय आ गया है! मांदर और नगाड़े की मधुर धुन हर घर से गूंज रही है। मिट्टी के लिपे-पुते घरों में नव-उजाला छा गया है।'
    }
  },
  {
    id: 'baha',
    nameDevanagari: 'बाहा परोब',
    nameRoman: 'Baha Parab',
    nameHindi: 'बाहा पर्व (फूलों और वसंत का पावन उत्सव)',
    santaliMonth: 'फागुन मास (फरवरी - मार्च)',
    gregorianPeriod: 'वसंत विषुव एवं साल वृक्ष का पुष्पण काल',
    duration: '3 दिवसीय वसंत उत्सव',
    deityHonored: 'जाहेर एरा, मरांग बुरु एवं मोड़े को-तुरूय को',
    themeColor: 'from-emerald-600 via-teal-600 to-green-700',
    subheading: 'साल और महुआ के नव-पुष्पों का स्वागत तथा प्रकृति के साथ अटूट एकात्मता का पर्व',
    significanceParagraph:
      'बाहा का अर्थ है "फूल"। बाहा पर्व संताल समाज का नववर्ष और वसंत का महान प्राकृतिक उत्सव है। जब पतझड़ के बाद जंगलों में साल (सरजोम) के वृक्षों पर दूधिया सफेद सुगंधित फूल खिलते हैं और महुआ के मीठे फल टपकने लगते हैं, तब बाहा पर्व मनाया जाता है। संताली परंपरा का कठोर और पवित्र नियम है कि जब तक जाहेर थान (पवित्र साल कुंज) में नायके द्वारा साल के फूलों की पहली पूजा नहीं हो जाती, तब तक कोई भी संताली न तो नए फूलों को बालों में लगाता है और न ही महुआ का सेवन करता है।',
    historicalBackgroundParagraph:
      'संताली दर्शन में प्रकृति को मां का दर्जा प्राप्त है। बाहा पर्व इस बात का प्रतीक है कि मनुष्य को प्रकृति के उपहारों का उपभोग करने से पहले सृष्टिकर्ता और वन-देवियों को धन्यवाद ज्ञापित करना चाहिए। इस पर्व में पानी की होली खेली जाती है, जो मन और आत्मा की निर्मलता का प्रतीक है।',
    detailedRitualsParagraph:
      'बाहा पर्व 3 चरणों में संपन्न होता है:\n• प्रथम दिन (उम): नायके और ग्रामीण उपवास रखकर पवित्र स्नान करते हैं और जाहेर थान की सफाई करके पूजा की वेदी तैयार करते हैं।\n• द्वितीय दिन (बाहा सारदी): यह पूजा का मुख्य दिन है। जाहेर थान में साल के फूलों का चढ़ावा अर्पित होता है। इसके बाद नायके घर-घर जाकर महिलाओं और पुरुषों को साल के फूल बांटते हैं। महिलाएं इन फूलों को आदरपूर्वक अपने जूड़े में खोंसती हैं और पुरुष कानों पर सजाते हैं।\n• तृतीय दिन (बाहा वास्के / जल क्रीड़ा): ग्रामीण एक-दूसरे पर शुद्ध शीतल जल छिड़कते हैं। यह जल-क्रीड़ा आपसी प्रेम, शीतलता और आदर का प्रतीक है। इस दिन किसी भी रासायनिक रंग का प्रयोग वर्जित होता है।',
    festiveFoodsParagraph:
      'साल के पत्तों के दोने-पत्तल (पात्री) में महुआ के मीठे पकवान, अरवा चावल का भात, महुआ की लाटा और महुआ के रस से तैयार पेय अत्यंत प्रेम से परोसा जाता है।',
    traditionalSongSnippet: {
      santaliDev: 'सारजोम बाहा फुटावेना, मातकोम गेलेयेना, बाहा परोब सेटेरेना...',
      roman: 'Sarjom baha phutawena, matkom geleyena, baha parab seterena...',
      hindi: 'सखुआ के वृक्ष पर फूल खिल उठे हैं, महुआ में मिठास भर गई है, प्रकृति नव-वधु बन सजी है और बाहा पर्व आ गया है।'
    }
  },
  {
    id: 'karam',
    nameDevanagari: 'करम परोब',
    nameRoman: 'Karam Parab',
    nameHindi: 'करम पर्व (भाई-बहन के प्रेम व उर्वरता का उत्सव)',
    santaliMonth: 'भादोर मास (अगस्त - सितंबर)',
    gregorianPeriod: 'भाद्रपद शुक्ल एकादशी',
    duration: '2 दिन और पूरी रात का उत्सव',
    deityHonored: 'करम गोसांय (समृद्धि, कर्म और संतान रक्षा)',
    themeColor: 'from-lime-600 via-emerald-600 to-teal-700',
    subheading: 'कर्म की शक्ति, भाई-बहन का अटूट विश्वास और खेतों में हरी-भरी समृद्धि की मंगलकामना',
    significanceParagraph:
      'करम पर्व संताली संस्कृति का अत्यंत भावुक और प्रेरणादायी लोकपर्व है। यह पर्व सिखाता है कि "कर्म ही पूजा है"। जो व्यक्ति निष्ठा से कर्म करता है, प्रकृति उसे धन, धान्य और खुशहाली का वरदान देती है। बहनें अपने भाइयों की दीर्घायु, शक्ति और संपन्नता के लिए उपवास रखती हैं। गांव के अखड़ा (नृत्य प्रांगण) में करम वृक्ष की डालियों की प्रतिष्ठा की जाती है और रातभर युवा युवतियां ढोल-मांदर की गूंज पर करम गीतों पर नृत्य करते हैं।',
    historicalBackgroundParagraph:
      'करम और धरम नामक दो भाइयों की प्रसिद्ध लोककथा इस पर्व का आधार है। करम भाई ने कठिन परिश्रम और भक्ति से अपने परिवार को विपत्ति से उबारा था। इस कथा को सुनकर संताली युवा स्वावलंबन और परिवार के प्रति समर्पण की प्रेरणा लेते हैं।',
    detailedRitualsParagraph:
      'करम पर्व की पावन अनुष्ठान विधि:\n• करम डाल का आदरपूर्वक चयन: गांव के कुंवारे युवक वन में जाकर पवित्र करम वृक्ष की तीन हरी-भरी डालियों को विधिवत प्रणाम करके काटते हैं। डालियों को जमीन पर गिरने नहीं दिया जाता।\n• अखड़ा में रोपण: ढोल-नगाड़ों और बालिकाओं के मंगल गायन के साथ डालियों को लाकर गांव के अखड़ा के बीचों-बीच गाड़ दिया जाता है।\n• करम कथा वाचन: गांव के बुजुर्ग या नायके अखड़ा में बैठकर सभी ग्रामीणों को करम-धरम की अमर गाथा सुनाते हैं।\n• रातभर करम नाच: जावा (अंकुरित अन्न) के पात्र हाथ में लेकर बहनें करम वृक्ष की परिक्रमा करते हुए नृत्य करती हैं।\n• प्रातः विसर्जन: अगली सुबह करम डालियों को आदरपूर्वक उठाकर बहती नदी या जलाशय में विसर्जित किया जाता है।',
    festiveFoodsParagraph:
      'अंकुरित अन्न (जावा) का प्रसाद, उड़द दाल के बड़े, धुसका, पुआ और महुआ के मिष्ठान्न का सामूहिक वितरण किया जाता है।',
    traditionalSongSnippet: {
      santaliDev: 'करम दारे साकाम चेतान, चांदो माला जुलुग कान, करम गोसांय दाया में...',
      roman: 'Karam dare sakam chetan, chando mala julug kan, karam gosane daya me...',
      hindi: 'करम वृक्ष की कोमल पत्तियों पर चंद्रमा की शीतल चांदनी जगमगा रही है। हे करम गोसांय, हमारे परिवार और खेतों पर अपनी कृपा बरसाइए।'
    }
  },
  {
    id: 'maghe',
    nameDevanagari: 'माघे सिम',
    nameRoman: 'Maghe Sim',
    nameHindi: 'माघे पर्व (कृषि वर्ष की विदाई व नए अनुबंध का पर्व)',
    santaliMonth: 'माघ मास (जनवरी - फरवरी)',
    gregorianPeriod: 'शीत ऋतु का समापन एवं फागुन का आगमन',
    duration: '1 से 2 दिन',
    deityHonored: 'सीमा रक्षक बोंगा एवं ग्राम देवता',
    themeColor: 'from-sky-600 via-blue-600 to-indigo-700',
    subheading: 'पुराने कृषि वर्ष का औपचारिक समापन, ऋण-मुक्ति और समाज में नए श्रम अनुबंधों की स्वतंत्रता',
    significanceParagraph:
      'माघे पर्व संताल समाज के आर्थिक और सामाजिक संतुलन का अनूठा प्रमाण है। इस दिन पुराने कृषि वर्ष के सभी समझौते, चरवाहों (गुपी कोड़ा) और कृषि मजदूरों के पारिश्रमिक का पूर्ण भुगतान करके उन्हें पूर्ण स्वतंत्रता दी जाती है। यदि कोई मजदूर अपने मालिक से संतुष्ट है तो वह पुनः नया अनुबंध कर सकता है, अथवा दूसरे किसान के साथ कार्य करने के लिए स्वतंत्र होता है। यह पर्व सामाजिक न्याय और बंधुआ मुक्ति का ऐतिहासिक आदिवासी प्रतीक है।',
    historicalBackgroundParagraph:
      'आदिवासी समाज में श्रम का सदैव सम्मान रहा है। माघे के दिन गांव के सभी पुराने वाद-विवाद, मनमुटाव और सीमा विवादों को गांव की मांझी सभा (पंचायत) में सुलझाया जाता है ताकि नए वर्ष में कोई भी व्यक्ति बैर-भाव लेकर प्रवेश न करे।',
    detailedRitualsParagraph:
      'माघे पर्व के मुख्य अनुष्ठान:\n• ग्राम सीमा पर पूजा: गांव के नायके गांव की सीमा पर जाकर वन-देवताओं को धन्यवाद देते हैं।\n• कृषि औजारों की सफाई: कुदाल, हल, हंसुआ और तीर-धनुष की सफाई करके उन्हें विश्राम दिया जाता है।\n• जंगल से कंद-मूल संचय: ग्रामीण वनों में जाकर औषधीय कंद-मूल (आरक-साकाम) एकत्र करते हैं।\n• मांझी थान में सामूहिक मिलन: सभी ग्रामीण मांझी थान पर एकत्र होकर सामाजिक एकता का संकल्प दोहराते हैं।',
    festiveFoodsParagraph:
      'जंगली कंद-मूल, तिलकुट, गुड़, नए चावल का चूड़ा और घर-घर बनी हड़िया का साझा भोज होता है।',
    traditionalSongSnippet: {
      santaliDev: 'माघ बोंगा पारोमेना, नावा सेरमा हिजुग कान, होड़ को दो रस्का गे...',
      roman: 'Magh bonga paromena, nawa serma hijug kan, hor ko do raska ge...',
      hindi: 'माघ मास बीत रहा है और नया संवत् आ रहा है। सभी संताली बंधु मुक्त हृदय से आनंदित हो रहे हैं।'
    }
  },
  {
    id: 'erok',
    nameDevanagari: 'एरोक सिम',
    nameRoman: 'Erok Sim',
    nameHindi: 'एरोक सिम (बीज बोवाई का पावन संकल्प पर्व)',
    santaliMonth: 'आषाढ़ मास (जून - जुलाई)',
    gregorianPeriod: 'मानसून का आगमन एवं पहली वर्षा',
    duration: '1 दिवस',
    deityHonored: 'जाहेर थान देवता एवं इंद्र देव (दाग बोंगा)',
    themeColor: 'from-emerald-700 via-teal-700 to-amber-800',
    subheading: 'धरती माता के गर्भ में प्रथम बीज रोपने से पूर्व समय पर वर्षा और कीड़े-मकोड़ों से रक्षा की प्रार्थना',
    significanceParagraph:
      'एरोक का संताली में अर्थ होता है "बीज बोना"। आषाढ़ मास में जब पहली मानसूनी बारिश से सूखी धरती तृप्त होती है और सोंधी खुशबू हवा में घुलती है, तब हल चलाने और धान के बीज बोने से पूर्व एरोक सिम पर्व मनाया जाता है। संताली किसान तब तक अपने खेतों में बीज नहीं बोते, जब तक पूरे गांव की ओर से जाहेर थान में धरती माता और वर्षा के देवता से प्रार्थना न कर ली जाए।',
    historicalBackgroundParagraph:
      'प्राचीन काल से यह मान्यता है कि धरती एक जीवंत मां है। जब हम हल से उसका सीना चीरते हैं और बीज डालते हैं, तो हमें उससे क्षमा और आशीष मांगना चाहिए। एरोक पर्व मनुष्य और प्रकृति के बीच इसी नैतिक मर्यादा की रक्षा करता है।',
    detailedRitualsParagraph:
      'एरोक सिम के अनुष्ठान नियम:\n• जाहेर थान में पूजा: गांव के नायके जाहेर थान में जाकर सफेद और लाल मुर्गों की बलि देकर अच्छी वर्षा की प्रार्थना करते हैं।\n• प्रतीकात्मक प्रथम बीज रोपण: नायके पवित्र वेदी पर अभिमंत्रित धान के बीज डालते हैं। इसके पश्चात ग्रामीण अपने खेतों में जाकर पहली मुट्ठी धान बोते हैं।\n• पूर्ण विश्राम का नियम: पूजा के दिन गांव में किसी भी प्रकार का भारी कृषि कार्य, वृक्षों की कटाई या मिट्टी की खुदाई पूर्णतः वर्जित होती है।',
    festiveFoodsParagraph:
      'खीर, चावल के स्वादिष्ट लड्डू, उड़द दाल के पकवान और वर्षा आगमन की खुशी में विशेष जलपान किया जाता है।',
    traditionalSongSnippet: {
      santaliDev: 'दाग जा़ड़ी हिजुग मा, हुड़ु चावले पेरेज मा, धरती पेरेज रस्का मा...',
      roman: 'Dag jari hijug ma, huru chawle perej ma, dharti perej raska ma...',
      hindi: 'हे मेघ देव, झमझम अमृत जल बरसाओ! हमारे खेत और खलिहान सुनहरे धानों से भर जाएं और संपूर्ण धरती उल्लासित हो जाए।'
    }
  }
];

export const CulturalCalendar: React.FC = () => {
  const { isAdmin } = useAdmin();

  // Persistent Festivals State
  const [festivalsList, setFestivalsList] = useState<FestivalData[]>(() => {
    return safeLoadFromStorage('hor_katha_festivals_dev_db', DEFAULT_SANTALI_FESTIVALS);
  });

  useEffect(() => {
    safeSaveToStorage('hor_katha_festivals_dev_db', festivalsList);
  }, [festivalsList]);

  const [selectedFestival, setSelectedFestival] = useState<FestivalData>(() => festivalsList[0] || DEFAULT_SANTALI_FESTIVALS[0]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formDevanagari, setFormDevanagari] = useState('');
  const [formRoman, setFormRoman] = useState('');
  const [formHindi, setFormHindi] = useState('');
  const [formMonth, setFormMonth] = useState('');
  const [formPeriod, setFormPeriod] = useState('');
  const [formDuration, setFormDuration] = useState('');
  const [formDeity, setFormDeity] = useState('');
  const [formSubheading, setFormSubheading] = useState('');
  const [formSignificance, setFormSignificance] = useState('');
  const [formHistory, setFormHistory] = useState('');
  const [formRituals, setFormRituals] = useState('');
  const [formFoods, setFormFoods] = useState('');
  const [formSongDev, setFormSongDev] = useState('');
  const [formSongRoman, setFormSongRoman] = useState('');
  const [formSongHindi, setFormSongHindi] = useState('');

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormDevanagari('');
    setFormRoman('');
    setFormHindi('');
    setFormMonth('सोहराय / अगहन');
    setFormPeriod('कार्तिक अमावस्या');
    setFormDuration('3 दिवसीय पर्व');
    setFormDeity('मरांग बुरु एवं ग्राम देवता');
    setFormSubheading('पर्व का संक्षिप्त उप-शीर्षक');
    setFormSignificance('');
    setFormHistory('');
    setFormRituals('');
    setFormFoods('');
    setFormSongDev('');
    setFormSongRoman('');
    setFormSongHindi('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (fest: FestivalData) => {
    setEditingId(fest.id);
    setFormDevanagari(fest.nameDevanagari);
    setFormRoman(fest.nameRoman);
    setFormHindi(fest.nameHindi);
    setFormMonth(fest.santaliMonth);
    setFormPeriod(fest.gregorianPeriod);
    setFormDuration(fest.duration);
    setFormDeity(fest.deityHonored);
    setFormSubheading(fest.subheading);
    setFormSignificance(fest.significanceParagraph);
    setFormHistory(fest.historicalBackgroundParagraph);
    setFormRituals(fest.detailedRitualsParagraph);
    setFormFoods(fest.festiveFoodsParagraph);
    setFormSongDev(fest.traditionalSongSnippet.santaliDev);
    setFormSongRoman(fest.traditionalSongSnippet.roman);
    setFormSongHindi(fest.traditionalSongSnippet.hindi);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('क्या आप इस पर्व को सचमुच हटाना चाहते हैं?')) {
      const updated = festivalsList.filter((f) => f.id !== id);
      setFestivalsList(updated);
      if (selectedFestival.id === id && updated.length > 0) {
        setSelectedFestival(updated[0]);
      }
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDevanagari || !formHindi) {
      alert('कृपया संताली देवनागरी नाम और हिंदी नाम अवश्य भरें।');
      return;
    }

    if (editingId) {
      const updated = festivalsList.map((f) => {
        if (f.id === editingId) {
          const mod: FestivalData = {
            ...f,
            nameDevanagari: formDevanagari,
            nameRoman: formRoman || formDevanagari,
            nameHindi: formHindi,
            santaliMonth: formMonth,
            gregorianPeriod: formPeriod,
            duration: formDuration,
            deityHonored: formDeity,
            subheading: formSubheading,
            significanceParagraph: formSignificance,
            historicalBackgroundParagraph: formHistory,
            detailedRitualsParagraph: formRituals,
            festiveFoodsParagraph: formFoods,
            traditionalSongSnippet: {
              santaliDev: formSongDev,
              roman: formSongRoman,
              hindi: formSongHindi
            }
          };
          if (selectedFestival.id === editingId) {
            setSelectedFestival(mod);
          }
          return mod;
        }
        return f;
      });
      setFestivalsList(updated);
    } else {
      const newFest: FestivalData = {
        id: `fest_${Date.now()}`,
        nameDevanagari: formDevanagari,
        nameRoman: formRoman || formDevanagari,
        nameHindi: formHindi,
        santaliMonth: formMonth,
        gregorianPeriod: formPeriod,
        duration: formDuration,
        deityHonored: formDeity,
        themeColor: 'from-amber-600 via-orange-600 to-rose-700',
        subheading: formSubheading,
        significanceParagraph: formSignificance,
        historicalBackgroundParagraph: formHistory,
        detailedRitualsParagraph: formRituals,
        festiveFoodsParagraph: formFoods,
        traditionalSongSnippet: {
          santaliDev: formSongDev,
          roman: formSongRoman,
          hindi: formSongHindi
        }
      };
      setFestivalsList((prev) => [newFest, ...prev]);
      setSelectedFestival(newFest);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-800 via-orange-800 to-rose-900 text-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider">
              संताली सांस्कृतिक पंचांग एवं पर्व
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
              संताली देवनागरी
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mt-1.5 tracking-tight flex items-center gap-2.5">
            <Calendar className="w-7 h-7 text-amber-300" />
            <span>संताली पावन पर्व एवं सांस्कृतिक चक्र (Santali Festivals)</span>
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 font-medium mt-1">
            शीर्षक, उप-शीर्षक एवं विस्तृत पैराग्राफ शैली में संताली पर्वों का पावन इतिहास, अनुष्ठान विधि एवं लोकगीत।
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isAdmin && (
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md cursor-pointer transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>नया पर्व जोड़ें (Add Parv)</span>
            </button>
          )}

          <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-4 py-2.5 flex items-center gap-2.5">
            <Sun className="w-5 h-5 text-amber-300" />
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-200 block">कुल पावन पर्व</span>
              <span className="text-sm font-black text-white">{festivalsList.length} पर्व संकलित</span>
            </div>
          </div>
        </div>
      </div>

      {/* Festival Selector Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {festivalsList.map((fest) => {
          const isSelected = fest.id === selectedFestival.id;
          return (
            <button
              key={fest.id}
              onClick={() => setSelectedFestival(fest)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 border ${
                isSelected
                  ? 'bg-amber-700 text-white border-amber-600 shadow-md scale-102'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200 shadow-2xs'
              }`}
            >
              <Flower2 className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-amber-600'}`} />
              <span className="font-bold text-sm">{fest.nameDevanagari}</span>
              <span className="opacity-75 text-[11px]">({fest.nameRoman})</span>
            </button>
          );
        })}
      </div>

      {/* MAIN ENCYCLOPEDIC DOSSIER: HEADING -> SUBHEADING -> PARAGRAPH STYLE */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-sm space-y-8">
        
        {/* 1. MAIN HEADING BLOCK */}
        <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
                {selectedFestival.santaliMonth}
              </span>
              <span className="text-slate-400 text-xs">·</span>
              <span className="text-xs font-bold text-slate-500">
                {selectedFestival.gregorianPeriod}
              </span>
              <span className="text-slate-400 text-xs">·</span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                {selectedFestival.duration}
              </span>
            </div>

            {/* Huge Main Heading */}
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {selectedFestival.nameDevanagari}
            </h1>
            <p className="text-base sm:text-lg font-bold text-amber-800 mt-1">
              {selectedFestival.nameRoman} — {selectedFestival.nameHindi}
            </p>

            {/* Prominent Subheading */}
            <div className="mt-3 inline-block px-3.5 py-1.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm font-semibold text-amber-950">
              {selectedFestival.subheading}
            </div>
          </div>

          {/* Action buttons (Listen & Admin Edit/Delete) */}
          <div className="flex items-center gap-2 shrink-0 self-start">
            {isAdmin && (
              <div className="flex items-center gap-1 bg-amber-50 p-1.5 rounded-2xl border border-amber-200">
                <button
                  onClick={() => handleOpenEdit(selectedFestival)}
                  className="p-1.5 text-slate-600 hover:text-amber-800 rounded-lg hover:bg-white transition-colors cursor-pointer"
                  title="इस पर्व को संपादित करें"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(selectedFestival.id)}
                  className="p-1.5 text-slate-600 hover:text-rose-600 rounded-lg hover:bg-white transition-colors cursor-pointer"
                  title="इस पर्व को हटाएं"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              onClick={() =>
                speakWithFemaleVoice(
                  `${selectedFestival.nameHindi}. ${selectedFestival.subheading}. ${selectedFestival.significanceParagraph}`,
                  { lang: 'hi-IN' }
                )
              }
              className="px-4 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-102"
              title="पर्व का संपूर्ण आख्यान सुनें"
            >
              <Volume2 className="w-4 h-4" />
              <span>आख्यान सुनें (Audio)</span>
            </button>
          </div>
        </div>

        {/* 2. SUBHEADING & PARAGRAPH: पर्व का सांस्कृतिक महत्व एवं दर्शन */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              1. पर्व का पावन महत्व एवं दार्शनिक भाव
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed bg-amber-50/40 p-5 rounded-2xl border border-amber-100 font-normal">
            {selectedFestival.significanceParagraph}
          </p>
        </section>

        {/* 3. SUBHEADING & PARAGRAPH: ऐतिहासिक एवं पौराणिक पृष्ठभूमि */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-600" />
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              2. ऐतिहासिक एवं पौराणिक पृष्ठभूमि
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-200/70 font-normal">
            {selectedFestival.historicalBackgroundParagraph}
          </p>
        </section>

        {/* 4. SUBHEADING & PARAGRAPH: विस्तृत पावन अनुष्ठान एवं विधियाँ */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              3. पावन अनुष्ठान, पूजन विधि एवं दैनिक रीतियाँ
            </h2>
          </div>
          <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed whitespace-pre-line font-normal">
              {selectedFestival.detailedRitualsParagraph}
            </p>
          </div>
        </section>

        {/* 5. SUBHEADING & PARAGRAPH: पारंपरिक लोकगीत व भावार्थ (with Audio) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                4. पारंपरिक पर्व लोकगीत (सेरेंज) एवं भावार्थ
              </h2>
            </div>
            <button
              onClick={() =>
                speakWithFemaleVoice(
                  `${selectedFestival.traditionalSongSnippet.santaliDev}. ${selectedFestival.traditionalSongSnippet.hindi}`,
                  { lang: 'hi-IN' }
                )
              }
              className="p-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              title="गीत की पंक्तियाँ सुनें"
            >
              <Volume2 className="w-4 h-4" />
              <span>गीत सुनें</span>
            </button>
          </div>

          <div className="bg-gradient-to-br from-rose-50/70 via-amber-50/60 to-orange-50/60 p-5 sm:p-6 rounded-2xl border border-rose-200 space-y-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-rose-800 tracking-wider block">
                संताली देवनागरी में पंक्ति:
              </span>
              <p className="text-lg sm:text-xl font-black text-slate-950 mt-1">
                "{selectedFestival.traditionalSongSnippet.santaliDev}"
              </p>
              <p className="text-xs sm:text-sm font-semibold text-rose-900 mt-1">
                ({selectedFestival.traditionalSongSnippet.roman})
              </p>
            </div>

            <div className="pt-3 border-t border-rose-200/60">
              <span className="text-[10px] uppercase font-bold text-slate-600 tracking-wider block">
                हिंदी भावार्थ:
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mt-0.5">
                "{selectedFestival.traditionalSongSnippet.hindi}"
              </p>
            </div>
          </div>
        </section>

        {/* 6. SUBHEADING & PARAGRAPH: पारंपरिक खान-पान एवं सामाजिक परंपरा */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              5. पारंपरिक खान-पान, अतिथि सत्कार एवं सामाजिक सौहार्द्र
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed bg-teal-50/40 p-5 rounded-2xl border border-teal-100 font-normal">
            {selectedFestival.festiveFoodsParagraph}
          </p>
        </section>

        {/* Quick Reference Summary Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-500 uppercase text-[10px]">आराध्य देव सत्ता:</span>
            <p className="font-bold text-slate-900 text-sm">{selectedFestival.deityHonored}</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-500 uppercase text-[10px]">पर्व की समयावधि:</span>
            <p className="font-bold text-slate-900 text-sm">{selectedFestival.duration}</p>
          </div>
        </div>
      </div>

      {/* FESTIVAL ADD / EDIT MODAL IN HEADING, SUBHEADING & PARAGRAPH FORMAT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 overflow-y-auto max-h-[92vh] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-600" />
                <span>{editingId ? 'पर्व विवरण संपादित करें' : 'नया पर्व जोड़ें (Add Festival)'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">संताली देवनागरी नाम *</label>
                  <input
                    type="text"
                    required
                    value={formDevanagari}
                    onChange={(e) => setFormDevanagari(e.target.value)}
                    placeholder="उदा. सोहराय परोब / बाहा परोब"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">रोमन संताली (Roman)</label>
                  <input
                    type="text"
                    value={formRoman}
                    onChange={(e) => setFormRoman(e.target.value)}
                    placeholder="उदा. Sohrai Parab / Baha"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">हिंदी नाम *</label>
                  <input
                    type="text"
                    required
                    value={formHindi}
                    onChange={(e) => setFormHindi(e.target.value)}
                    placeholder="उदा. सोहराय महापर्व"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">संताली मास</label>
                  <input
                    type="text"
                    value={formMonth}
                    onChange={(e) => setFormMonth(e.target.value)}
                    placeholder="उदा. सोहराय / अगहन मास"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">काल / ऋतु</label>
                  <input
                    type="text"
                    value={formPeriod}
                    onChange={(e) => setFormPeriod(e.target.value)}
                    placeholder="उदा. कार्तिक अमावस्या"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">अवधि</label>
                  <input
                    type="text"
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    placeholder="उदा. 5 दिवसीय महापर्व"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">आराध्य देवता / पूर्वज</label>
                <input
                  type="text"
                  value={formDeity}
                  onChange={(e) => setFormDeity(e.target.value)}
                  placeholder="उदा. मरांग बुरु, जाहेर एरा, गोठ बोंगा"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">उप-शीर्षक (Subheading)</label>
                <input
                  type="text"
                  value={formSubheading}
                  onChange={(e) => setFormSubheading(e.target.value)}
                  placeholder="उदा. कृषि, पशु-धन और प्रकृति की अटूट कृतज्ञता का सबसे बड़ा संताली महापर्व"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  1. पर्व का पावन महत्व एवं दार्शनिक भाव (पैराग्राफ शैली)
                </label>
                <textarea
                  rows={3}
                  value={formSignificance}
                  onChange={(e) => setFormSignificance(e.target.value)}
                  placeholder="पर्व का विस्तृत महत्व लिखें..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  2. ऐतिहासिक एवं पौराणिक पृष्ठभूमि (पैराग्राफ शैली)
                </label>
                <textarea
                  rows={3}
                  value={formHistory}
                  onChange={(e) => setFormHistory(e.target.value)}
                  placeholder="पर्व का इतिहास और लोककथा लिखें..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  3. पावन अनुष्ठान, पूजन विधि एवं दैनिक रीतियाँ (पैराग्राफ शैली)
                </label>
                <textarea
                  rows={4}
                  value={formRituals}
                  onChange={(e) => setFormRituals(e.target.value)}
                  placeholder="प्रतिदिन के अनुष्ठान विस्तार से लिखें..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-2">
                <span className="font-bold text-rose-900 block">4. पारंपरिक लोकगीत (सेरेंज) एवं भावार्थ</span>
                <input
                  type="text"
                  value={formSongDev}
                  onChange={(e) => setFormSongDev(e.target.value)}
                  placeholder="गीत संताली देवनागरी में (उदा. सोहराय सेटेरेना गाते...)"
                  className="w-full px-3 py-1.5 border border-rose-300 rounded-xl bg-white focus:outline-none"
                />
                <input
                  type="text"
                  value={formSongRoman}
                  onChange={(e) => setFormSongRoman(e.target.value)}
                  placeholder="गीत रोमन संताली में (उदा. Sohrai seterena gate...)"
                  className="w-full px-3 py-1.5 border border-rose-300 rounded-xl bg-white focus:outline-none"
                />
                <input
                  type="text"
                  value={formSongHindi}
                  onChange={(e) => setFormSongHindi(e.target.value)}
                  placeholder="गीत का हिंदी भावार्थ..."
                  className="w-full px-3 py-1.5 border border-rose-300 rounded-xl bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  5. पारंपरिक खान-पान एवं सामाजिक परंपरा (पैराग्राफ शैली)
                </label>
                <textarea
                  rows={2}
                  value={formFoods}
                  onChange={(e) => setFormFoods(e.target.value)}
                  placeholder="पारंपरिक व्यंजन, पीठा और सत्कार की विधि..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 font-bold"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingId ? 'पर्व विवरण अद्यतन करें' : 'पर्व सहेजें'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
