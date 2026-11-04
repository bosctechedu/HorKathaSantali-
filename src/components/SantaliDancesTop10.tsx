import React, { useState } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { safeLoadFromStorage } from '../utils/storage';
import {
  Music,
  Sparkles,
  Volume2,
  Users,
  Search,
  Calendar,
  Flame,
  Shirt,
  Info,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Disc
} from 'lucide-react';

export interface SantaliDance {
  id: number;
  nameDevanagari: string;
  nameRoman: string;
  nameHindi: string;
  category: 'social' | 'festival' | 'wedding' | 'martial' | 'seasonal';
  occasionSeason: string;
  formationStyle: string;
  instrumentsUsed: string[];
  attireMaleFemale: string;
  choreographyHighlights: string[];
  authenticSongDev: string;
  authenticSongHindi: string;
  culturalEssence: string;
  gradient: string;
  accentBg: string;
}

export const TOP_10_DANCES: SantaliDance[] = [
  {
    id: 1,
    nameDevanagari: '१. लागड़े एनेच',
    nameRoman: '1. Lagre Enec\'',
    nameHindi: 'लागड़े नृत्य (सर्वप्रिय सामाजिक अखड़ा नृत्य)',
    category: 'social',
    occasionSeason: 'वर्ष भर, विशेषकर प्रतिदिन शाम को गांव के अखड़ा (Akhra) में तथा सामाजिक मिलन पर',
    formationStyle: 'युवतियों की एक-दूसरे की कमर या हाथ जोड़कर बनाई गई अर्ध-गोलाकार व पूर्ण वृत्ताकार शृंखला',
    instrumentsUsed: ['तुमदाक् (मांदर)', 'तामाक (नगाड़ा)', 'तिरियो (बांसुरी)', 'करताल (झांझ)'],
    attireMaleFemale: 'महिलाएं: पारंपरिक लाल-सफेद पांची-दहणी, जूड़े (खोंपा) में ताजे फूल; पुरुष: धोती/गमछा व कानों में मुरकी',
    choreographyHighlights: [
      'नर्तकियों की पंक्तियां तुमदाक् की मंद-मंद थाप पर आगे-पीछे लयबद्ध कदम बढ़ाती हैं।',
      'दाएं पैर को आगे बढ़ाकर हल्का-सा झुकाव और फिर बाएं पैर को समेटना।',
      'समस्त गांव के लोग बिना किसी भेदभाव के इस सामूहिक आनंद में शामिल होते हैं।'
    ],
    authenticSongDev: 'लागड़े सेरेञ आंजोम ते, अखड़ा रे मोन लागवावेना। तुमदाक् तामाक साड़े काना, गोते-गोते हिजुक मे।',
    authenticSongHindi: 'लागड़े की मधुर धुन सुनकर मन अखड़ा की ओर खिंचा चला जाता है। मांदर और नगाड़े गूंज रहे हैं, हे सखी! तुम भी झूमती हुई चली आओ।',
    culturalEssence: 'संताली समाज में कहावत है: "रोड़ गे सेरेञ, ताड़ाम गे एनेच" (जो बोलना है वही गीत है, जो चलना है वही नृत्य है)। लागड़े सामुदायिक एकता का मुकुट है।',
    gradient: 'from-amber-600 via-orange-700 to-stone-900',
    accentBg: 'bg-amber-100 text-amber-900'
  },
  {
    id: 2,
    nameDevanagari: '२. सोहराय एनेच',
    nameRoman: '2. Sohrai Enec\'',
    nameHindi: 'सोहराय नृत्य (गौ-वंदना व फसल कटाई नृत्य)',
    category: 'festival',
    occasionSeason: 'कार्तिक/पौष अमावस्या पर ५ दिवसीय सोहराय महापर्व के दौरान दिन-रात',
    formationStyle: 'कुलही (गांव की मुख्य सड़क) पर घर-घर के सामने वृत्ताकार एवं गतिशील पंक्तियां',
    instrumentsUsed: ['तुमदाक् (मांदर)', 'विशाल तामाक (नगाड़ा)', 'तिरियो (बांसुरी)', 'घंटी'],
    attireMaleFemale: 'महिलाएं: नई सोहराय पांची, पीतल के कंगन व झुमके; पुरुष: मोरपंख लगी पगड़ी व चमकीले कुर्ते',
    choreographyHighlights: [
      'गो-माता और बैलों के प्रति असीम कृतज्ञता दर्शाने के लिए धरती की ओर गहरा झुकना।',
      'तीव्र गति से घूमना और "हा-हा-हा, हो-हो-हो" के सामूहिक उल्लासमय जयघोष।',
      'मांझी और घर के मुखिया द्वारा नर्तक दल को महुआ या चावल का पेय और गुड़ अर्पित करना।'
    ],
    authenticSongDev: 'सोहराय परोब सेटेरेना, आतो-दिशोम रासकायेना। गाय-काड़ा मान काते, आबो लांग एनेचा।',
    authenticSongHindi: 'सोहराय महापर्व आ गया है, सारा गांव-देश खुशियों से भर गया है। गाय-बैलों का सम्मान करके हम दोनों मिलकर नाचेंगे।',
    culturalEssence: 'पशुधन और धरती माता के प्रति कृतज्ञता व्यक्त करने वाला यह सबसे ऊर्जावान और उल्लासमय संताली लोकनृत्य है।',
    gradient: 'from-rose-600 via-red-700 to-amber-950',
    accentBg: 'bg-rose-100 text-rose-900'
  },
  {
    id: 3,
    nameDevanagari: '३. बाहा एनेच',
    nameRoman: '3. Baha Enec\'',
    nameHindi: 'बाहा नृत्य (वसंत ऋतु व साल पुष्प उत्सव नृत्य)',
    category: 'festival',
    occasionSeason: 'फाल्गुन पूर्णिमा के आसपास वसंत ऋतु में, जब जंगलों में साल (सरजोम) और पलाश खिलते हैं',
    formationStyle: 'जाहेर थान (पवित्र साल कुंज) से लौटते समय अत्यंत शालीन, पवित्र और धीमी गति की शृंखला',
    instrumentsUsed: ['तुमदाक् (मांदर)', 'तामाक (नगाड़ा)', 'तिरियो (बांसुरी)'],
    attireMaleFemale: 'महिलाएं: कान और खोंपा में साल के ताजे पीले-सफेद फूल; पुरुष: कानों में सरजोम बाहा खोंसे हुए',
    choreographyHighlights: [
      'अत्यंत शांत, मर्यादित और आध्यात्मिक पदताल।',
      'नायके (पुजारी) द्वारा साल के पवित्र फूल वितरित करने के बाद एक-दूसरे पर शुद्ध जल छिड़कना।',
      'प्रकृति और नव-जीवन के स्वागत में धरती को छूते हुए नमन करना।'
    ],
    authenticSongDev: 'सारजोम बाहा फुटावेना, मुरुप बाहा गादा-गादा। बाहा परोब रे सेटेर एनाबोन, सागुन थुम ञाम एना।',
    authenticSongHindi: 'साल के फूल खिल उठे हैं, पलाश के फूल घने जंगलों में महक रहे हैं। बाहा पर्व पर हम सब एकत्रित हुए हैं, हमें पावन आशीष प्राप्त हुआ है।',
    culturalEssence: 'यह नृत्य केवल मनोरंजन नहीं, बल्कि पवित्रता और प्रकृति पूजा का प्रतीक है। जब तक बाहा नृत्य नहीं होता, कोई संताल साल के नए फूल नहीं छूता।',
    gradient: 'from-emerald-600 via-teal-700 to-stone-900',
    accentBg: 'bg-emerald-100 text-emerald-900'
  },
  {
    id: 4,
    nameDevanagari: '४. दांता एनेच',
    nameRoman: '4. Danta Enec\'',
    nameHindi: 'दांता नृत्य (लाठी व वीर रस युक्त युद्ध नृत्य)',
    category: 'martial',
    occasionSeason: 'सोहराय महापर्व के तीसरे दिन (खूंटाव / जाले) के समय',
    formationStyle: 'केवल पुरुषों द्वारा अनुशासित दो समानांतर पंक्तियों में आमने-सामने घूमकर किया जाने वाला नृत्य',
    instrumentsUsed: ['तामाक (गंभीर गूंजने वाला नगाड़ा)', 'तुमदाक्', 'कांस्य झांझ'],
    attireMaleFemale: 'पुरुष: सिर पर रंग-बिरंगी पगड़ी, कमर में फेंटा, हाथों में चमकीली लाठियां (दांता)',
    choreographyHighlights: [
      'तामाक की तीव्र ताल पर दोनों हाथों से लाठियों को आपस में टकराकर लय उत्पन्न करना।',
      'अचानक उछलना, पैंतरा बदलना और संताल हूल (1855 क्रांति) के योद्धाओं की तरह वीर मुद्रा बनाना।',
      'तेज शारीरिक संतुलन और सटीक सामूहिक समन्वय।'
    ],
    authenticSongDev: 'दांता साड़े तामाक साड़े, वीर लेका कोड़ा को उडोक एना। आबोवाक दाड़े आबोवाक लाकचार, जायजुग ताहेंन मा।',
    authenticSongHindi: 'दांता की खटखट और नगाड़े की गूंज के साथ वीर युवक बाहर निकल आए हैं। हमारा बल, हमारी संस्कृति युगों-युगों तक अमर रहे।',
    culturalEssence: 'संताल समाज की ऐतिहासिक वीरता, आत्मरक्षा और पराक्रम को प्रदर्शित करने वाला विशिष्ट पुरुष नृत्य।',
    gradient: 'from-red-700 via-rose-800 to-stone-950',
    accentBg: 'bg-red-100 text-red-900'
  },
  {
    id: 5,
    nameDevanagari: '५. दोंग एनेच',
    nameRoman: '5. Dong Enec\'',
    nameHindi: 'दोंग नृत्य (विवाह संस्कार व हास्य-विनोद नृत्य)',
    category: 'wedding',
    occasionSeason: 'विवाह (बापला) के समस्त अनुष्ठानों में वर-वधू पक्ष के मिलन के समय',
    formationStyle: 'सखियों और महिलाओं की चंचल पंक्तियां, जो सम्मुख आकर हास्य-विनोद करती हैं',
    instrumentsUsed: ['तुमदाक्', 'तिरियो (मधुर बांसुरी)', 'रुतु (बांसुरी)'],
    attireMaleFemale: 'महिलाएं: विवाह की रेशमी पांची, चांदी के हंसुली व पायल; पुरुष: सजे-धजे कुर्ते व गमछा',
    choreographyHighlights: [
      'तीव्र कदमताल के साथ कमर को चंचलता से हिलाना।',
      'समधी और समधिन के बीच मधुर नोक-झोंक और चुहलबाजी।',
      'विदाई के समय भावुक और विरह की धीमी पदचाप।'
    ],
    authenticSongDev: 'दोंग एनेच रे रासका गेया, बापला ओड़ाक् रे पेरेज् एना। जांवाय कोड़ा सेटेरेना, दुआर सागुन जोहार।',
    authenticSongHindi: 'दोंग नृत्य में कितना आनंद है, विवाह का घर खुशियों से भर गया है। दामाद (वर) द्वार पर आ पहुंचे हैं, सगुन जोहार से उनका स्वागत है।',
    culturalEssence: 'विवाह की औपचारिकता को आत्मीयता, हंसी और पारिवारिक प्रेम में बदल देने वाला संताली समाज का प्रिय नृत्य।',
    gradient: 'from-purple-600 via-violet-700 to-stone-950',
    accentBg: 'bg-purple-100 text-purple-900'
  },
  {
    id: 6,
    nameDevanagari: '६. करम एनेच',
    nameRoman: '6. Karam Enec\'',
    nameHindi: 'करम नृत्य (करम डाल प्रतिष्ठा व भ्रातृ-समृद्धि नृत्य)',
    category: 'festival',
    occasionSeason: 'भाद्रपद (भादो) मास की शुक्ल एकादशी को करम पर्व पर',
    formationStyle: 'आंगन में स्थापित करम डाल के चारों ओर उपवास रखने वाली बहनों का वृत्ताकार घेरा',
    instrumentsUsed: ['तुमदाक् (मांदर)', 'तामाक (नगाड़ा)', 'करताल'],
    attireMaleFemale: 'महिलाएं: पीले-लाल पांची वस्त्र, कानों में जावा (अंकुरित अन्न) के पौधे खोंसे हुए',
    choreographyHighlights: [
      'हाथों में थाली और जावा लिए करम देवता की परिक्रमा।',
      'भाइयों की दीर्घायु और सुख-समृद्धि के लिए विनम्र प्रार्थना मुद्रा।',
      'करम-धरम की कथा सुनने के बाद रातभर अखड़ा में उल्लासमय नृत्य।'
    ],
    authenticSongDev: 'करम गोसाय सागुन थुम, जावा बाहा रासका। बोएहा कोवाक सुख लागीद, करम दाड़े जोहार।',
    authenticSongHindi: 'हे करम देव! पावन आशीष दीजिए, अंकुरित जावा पुष्प खिल उठे हैं। भाइयों के सुख-कल्याण के लिए हम करम डाल को नमन करते हैं।',
    culturalEssence: 'प्रकृति, वृक्ष और भाई-बहन के अटूट स्नेह का प्रतीक धार्मिक-सांस्कृतिक नृत्य।',
    gradient: 'from-yellow-600 via-amber-700 to-stone-900',
    accentBg: 'bg-yellow-100 text-yellow-900'
  },
  {
    id: 7,
    nameDevanagari: '७. दहर एनेच',
    nameRoman: '7. Dahar Enec\'',
    nameHindi: 'दहर नृत्य (सड़क/कुलही पर चलने वाला प्रभात नृत्य)',
    category: 'festival',
    occasionSeason: 'सोहराय पर्व के दौरान प्रातःकाल कुलही (गांव की पगडंडी/सड़क) पर',
    formationStyle: 'लंबी सीधी रेखा में एक-दूसरे के पीछे लयबद्ध कदम बढ़ाते हुए पूरे गांव का भ्रमण',
    instrumentsUsed: ['तुमदाक्', 'तामाक', 'झांझ'],
    attireMaleFemale: 'पारंपरिक स्वच्छ परिधान, सिर पर प्रभाती पगड़ी व पुष्प',
    choreographyHighlights: [
      'चलते-चलते एक लय में रुकना और दायें-बायें मुड़कर ताल मिलाना।',
      'गांव के हर घर के सामने रुककर मांझी और गृहस्वामियों को प्रभाती जोहार देना।',
      'नदी या तालाब से स्नान करके लौटते समय सामूहिक कदमताल।'
    ],
    authenticSongDev: 'दहर-दहर ते हिजुक मे, कुलही रे एनेच जमेना। सेताक् बेला जोहार काते, नावा सेरमा रासका।',
    authenticSongHindi: 'पगडंडी पर चलते हुए चले आओ, गांव की सड़क पर नृत्य जम गया है। सुबह की बेला में जोहार करके नववर्ष का उल्लास मनाओ।',
    culturalEssence: 'गांव के हर घर और हर परिवार को एक सूत्र में पिरोने वाला प्रभाती पदयात्रा नृत्य।',
    gradient: 'from-cyan-600 via-blue-700 to-slate-900',
    accentBg: 'bg-cyan-100 text-cyan-900'
  },
  {
    id: 8,
    nameDevanagari: '८. पांता / पलो एनेच',
    nameRoman: '8. Panta Enec\'',
    nameHindi: 'पांता नृत्य (कंधे से कंधा मिलाकर झूलने वाला पंक्तिबद्ध नृत्य)',
    category: 'social',
    occasionSeason: 'बड़े मेलों, जत्रा और सामाजिक उत्सवों पर',
    formationStyle: 'सैकड़ों युवतियों की एक अत्यंत लंबी अटूट पंक्ति, कंधे से कंधा मिलाकर सटा हुआ घेरा',
    instrumentsUsed: ['अनेक तुमदाक् एक साथ', 'तामाक का विशाल समूह'],
    attireMaleFemale: 'समान रंग की पांची-दहणी, जूड़े में एक जैसी कलगी व मोरपंख',
    choreographyHighlights: [
      'हवा के झोंके से झूलते धान के पौधों की तरह पूरी पंक्ति का एक साथ झुकना।',
      'बिना हाथ छोड़े अत्यंत तीव्र गति से आगे और पीछे तरंग की तरह डोलना।',
      'अद्भुत समरूपता और लयबद्धता जो देखने वालों को मंत्रमुग्ध कर देती है।'
    ],
    authenticSongDev: 'पांता काते एनेच मे, गाते कोवाक सागाय। हासा चेतान सिरजोन लेका, जोतो होड़ सोमान।',
    authenticSongHindi: 'कतारबद्ध होकर नाचो, सखियों का यह अमर बंधन है। धरती पर सृष्टि की रचना के समान हम सब इंसान बराबर हैं।',
    culturalEssence: 'संताली समाज में समानता और अखंड सामूहिकता की सबसे सुंदर दृश्य प्रस्तुति।',
    gradient: 'from-teal-600 via-emerald-700 to-slate-900',
    accentBg: 'bg-teal-100 text-teal-900'
  },
  {
    id: 9,
    nameDevanagari: '९. सेंदरा / शिकारी एनेच',
    nameRoman: '9. Sendra Enec\'',
    nameHindi: 'सेंदरा नृत्य (शिकार अभियान व विजय उल्लास नृत्य)',
    category: 'martial',
    occasionSeason: 'वार्षिक अयोध्या या पारसनाथ सेंदरा (सामूहिक शिकार) के समापन पर',
    formationStyle: 'तीर-धनुष और भालों के साथ पुरुषों का गोलाकार घेरा',
    instrumentsUsed: ['सेंदरा तामाक (विशाल रण नगाड़ा)', 'साखवा (सींग का बाजा)', 'तिरियो'],
    attireMaleFemale: 'शिकारी पोशाक, कमर में तीर-कमान, सिर पर जंगली पत्तों व पंखों की टोपी',
    choreographyHighlights: [
      'जंगल में पशुओं की पदचाप की नकल करना और छिपने के पैंतरे दिखाना।',
      'शिकार की खोज, निशाना साधना और विजय के बाद खुशी से हवा में तीर लहराना।',
      'साखवा की भीषण गूंज के साथ हुंकार भरना।'
    ],
    authenticSongDev: 'सेंदरा चलावेन कोड़ा को, वीर खोन को रुवड़ एना। साखवा साड़े तामाक साड़े, जीत रेयाक रासका।',
    authenticSongHindi: 'शिकार पर गए वीर युवक जंगल से सकुशल लौट आए हैं। सींग और नगाड़ों की गूंज के साथ विजय का उत्सव मन रहा है।',
    culturalEssence: 'प्रकृति के गहन वनों में जीवन रक्षा, साहस और सामूहिक शक्ति का गौरवशाली प्रदर्शन।',
    gradient: 'from-orange-700 via-stone-800 to-black',
    accentBg: 'bg-orange-100 text-orange-950'
  },
  {
    id: 10,
    nameDevanagari: '१०. गोलवारी / एरोक एनेच',
    nameRoman: '10. Golwari / Erok\' Enec\'',
    nameHindi: 'गोलवारी / एरोक नृत्य (धान बुवाई व वर्षा ऋतु का उत्सव नृत्य)',
    category: 'seasonal',
    occasionSeason: 'आषाढ़ मास में प्रथम मानसूनी फुहारों के बाद बीज बोने (एरोक) के पावन अवसर पर',
    formationStyle: 'खेतों के मेड़ों के किनारे किसानों और महिलाओं की गोलाकार सामूहिक टोली',
    instrumentsUsed: ['तुमदाक्', 'तिरियो', 'तामाक'],
    attireMaleFemale: 'वर्षा से रक्षा हेतु घुंघु (पत्तों की छतरी), सूती वस्त्र व ताजे तृण',
    choreographyHighlights: [
      'बीज बोने (रोपनी) और धान छिड़कने की मुद्राओं का अभिनय।',
      'मेघों से वर्षा की गुहार लगाने के लिए आकाश की ओर हाथ उठाना।',
      'मिट्टी की सौंधी खुशबू के साथ धरती को प्रणाम करना।'
    ],
    authenticSongDev: 'एरोक सिमी सेटेरेना, धात्री रे बीज उईहार। दाक् गे हिजुक मा, सेरमा खोन सुख पेरेज् मा।',
    authenticSongHindi: 'बीज बोने का मौसम आ गया है, धरती माता में नए अन्न का रोपण हुआ है। हे मेघ! जल बरसाओ और आकाश से धरती को समृद्ध करो।',
    culturalEssence: 'अन्नदाता किसान और जीवनदायिनी वर्षा के प्रति समर्पित संताली लोक-संस्कृति का प्राणवान नृत्य।',
    gradient: 'from-blue-700 via-indigo-800 to-stone-900',
    accentBg: 'bg-blue-100 text-blue-900'
  }
];

export const SantaliDancesTop10: React.FC = () => {
  const [dancesList] = useState<SantaliDance[]>(() => safeLoadFromStorage('hor_katha_cms_dances', TOP_10_DANCES));
  const [selectedDance, setSelectedDance] = useState<SantaliDance>(() => dancesList[0] || TOP_10_DANCES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredDances = dancesList.filter((d) => {
    const matchesSearch =
      d.nameDevanagari.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.nameRoman.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.nameHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.occasionSeason.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeCategory === 'all') return matchesSearch;
    return matchesSearch && d.category === activeCategory;
  });

  const handleSpeakDance = (dance: SantaliDance) => {
    const speech = `${dance.nameDevanagari}. ${dance.nameHindi}. अवसर: ${dance.occasionSeason}. वाद्ययंत्र: ${dance.instrumentsUsed.join(', ')}. पारंपरिक गीत: ${dance.authenticSongHindi}. सांस्कृतिक महत्व: ${dance.culturalEssence}`;
    speakWithFemaleVoice(speech, { lang: 'hi-IN' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-800 via-rose-800 to-purple-950 text-white p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-amber-300" />
              एनेच (Enec') · पारंपरिक नृत्य धरोहर
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/30 text-[11px] font-bold text-amber-200">
              Top 10 Traditional Dances
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-amber-100">
            संताली पारंपरिक शीर्ष १० नृत्य (एनेच)
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed font-medium">
            "रोड़ गे सेरेञ, ताड़ाम गे एनेच" — लागड़े, सोहराय, बाहा, दांता और दोंग नृत्यों की पदताल, वेशभूषा, वाद्य यंत्र और प्रामाणिक लोकगीत।
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleSpeakDance(selectedDance)}
            className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Volume2 className="w-4 h-4 text-slate-950" />
            <span>नृत्य विवरण सुनें</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'सभी १० नृत्य (All 10)' },
            { id: 'social', label: 'सामाजिक (Social)' },
            { id: 'festival', label: 'पर्व-त्योहार (Festival)' },
            { id: 'wedding', label: 'विवाह (Wedding)' },
            { id: 'martial', label: 'युद्ध व वीरता (Martial)' },
            { id: 'seasonal', label: 'ऋतु व कृषि (Seasonal)' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-700 text-white shadow-2xs'
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
            placeholder="नृत्य का नाम खोजें..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
        </div>
      </div>

      {/* Main Grid: Left List + Right Detail Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Dance Cards */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[680px] overflow-y-auto pr-1">
          {filteredDances.map((dance) => {
            const isSelected = dance.id === selectedDance.id;
            return (
              <div
                key={dance.id}
                onClick={() => setSelectedDance(dance)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-amber-50/90 border-amber-400 shadow-sm ring-1 ring-amber-400/50'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-2xl ${dance.accentBg} flex items-center justify-center font-bold text-base shadow-2xs shrink-0`}
                  >
                    <Music className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-sm sm:text-base">
                      {dance.nameDevanagari}
                    </h3>
                    <p className="text-xs text-amber-800 font-bold">
                      {dance.nameRoman} · {dance.nameHindi}
                    </p>
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

        {/* Right Column: Detailed Dossier */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-5 flex items-start justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-black uppercase tracking-wider">
                श्रेणी: {selectedDance.category.toUpperCase()}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                {selectedDance.nameDevanagari}
              </h2>
              <p className="text-sm sm:text-base font-bold text-amber-800 mt-0.5">
                {selectedDance.nameRoman} — {selectedDance.nameHindi}
              </p>
            </div>

            <button
              onClick={() => handleSpeakDance(selectedDance)}
              className="p-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-all hover:scale-105 cursor-pointer shadow-2xs shrink-0"
              title="उच्चारण सुनें"
            >
              <Volume2 className="w-5 h-5 text-amber-700" />
            </button>
          </div>

          {/* Occasion & Formations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-sky-600" />
                <span>अवसर व ऋतु (Occasion &amp; Season):</span>
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {selectedDance.occasionSeason}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-purple-600" />
                <span>शृंखला व घेरा शैली (Formation):</span>
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {selectedDance.formationStyle}
              </p>
            </div>
          </div>

          {/* Choreography Footwork */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>नृत्य मुद्रा व पदताल विशेषताएं (Choreography &amp; Steps):</span>
            </h4>
            <div className="space-y-2 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
              {selectedDance.choreographyHighlights.map((step, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instruments & Attire */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-amber-600" />
                <span>प्रयुक्त वाद्य यंत्र (Instruments):</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedDance.instrumentsUsed.map((inst, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-xl bg-amber-100/80 text-[11px] font-bold text-amber-900 border border-amber-200/60"
                  >
                    {inst}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
                <Shirt className="w-3.5 h-3.5 text-rose-600" />
                <span>पारंपरिक वेशभूषा (Attire):</span>
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {selectedDance.attireMaleFemale}
              </p>
            </div>
          </div>

          {/* Authentic Folk Song Lyrics */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>पारंपरिक संताली लोकगीत (Authentic Folk Lyrics):</span>
            </div>
            <p className="text-sm sm:text-base font-serif font-black text-amber-950 leading-relaxed">
              “{selectedDance.authenticSongDev}”
            </p>
            <p className="text-xs text-slate-600 italic">
              अर्थ: {selectedDance.authenticSongHindi}
            </p>
          </div>

          {/* Cultural Essence */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <strong>सांस्कृतिक महत्व:</strong> {selectedDance.culturalEssence}
          </div>
        </div>
      </div>
    </div>
  );
};
