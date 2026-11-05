import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Leaf,
  Calendar,
  HeartPulse,
  Sparkles,
  Volume2,
  Search,
  Check,
  ChevronRight,
  Info,
  Users,
  Flame,
  Award
} from 'lucide-react';
import { speakWithFemaleVoice } from '../utils/speech';

export interface WildGreen {
  id: string;
  nameDev: string;
  nameRoman: string;
  hindiName: string;
  botanicalName: string;
  season: 'summer' | 'monsoon' | 'winter' | 'spring' | 'all';
  seasonNameHindi: string;
  benefits: string[];
  taste: string;
  cookingStyle: string;
  culturalNote: string;
  nutritionalHighlights: {
    iron: 'उच्च' | 'मध्यम';
    calcium: 'उच्च' | 'मध्यम';
    vitamins: string;
    fiber: 'प्रचुर' | 'मध्यम';
  };
}

export interface TraditionalRecipe {
  id: string;
  titleDev: string;
  titleRoman: string;
  hindiTitle: string;
  category: 'festive' | 'daily' | 'medicinal' | 'sweet';
  baseIngredients: { item: string; perPersonAmount: string }[];
  methodSteps: string[];
  culturalImportance: string;
  preparationTime: string;
}

export const WILD_GREENS_DATABASE: WildGreen[] = [
  {
    id: 'gendhari',
    nameDev: 'गेंधारी आड़ा़ (Gendhari Ara)',
    nameRoman: 'Gendhari Ara',
    hindiName: 'चौलाई का साग (कांटेदार/देसी चौलाई)',
    botanicalName: 'Amaranthus viridis',
    season: 'monsoon',
    seasonNameHindi: 'वर्षा व ग्रीष्म ऋतु',
    benefits: ['रक्त में हीमोग्लोबिन बढ़ाना', 'पाचन तंत्र को मजबूत करना', 'हड्डियों को कैल्शियम प्रदान करना'],
    taste: 'हल्का मीठा व मृदु',
    cookingStyle: 'हल्के सरसों तेल, लहसुन, सूखी लाल मिर्च और चने की दाल के साथ धीमी आंच पर भूना जाता है।',
    culturalNote: 'संताल घरों में वर्षा की शुरुआत में जब पहले नए पौधे फूटते हैं, तो गेंधारी आड़ा़ सबसे पहले पकाया जाता है।',
    nutritionalHighlights: {
      iron: 'उच्च',
      calcium: 'उच्च',
      vitamins: 'विटामिन A, C, फोलेट',
      fiber: 'प्रचुर'
    }
  },
  {
    id: 'munga',
    nameDev: 'मुंगा आड़ा़ (Munga Ara)',
    nameRoman: 'Munga Ara',
    hindiName: 'सहजन / मोरिंगा के कोमल पत्ते',
    botanicalName: 'Moringa oleifera',
    season: 'all',
    seasonNameHindi: 'वर्ष भर (विशेषकर ग्रीष्म व वसंत)',
    benefits: ['प्रतिरोधक क्षमता (इम्युनिटी) बूस्टर', 'रक्तचाप व शर्करा नियंत्रण', 'आंखों की रोशनी बढ़ाना'],
    taste: 'हल्का कसैला व शक्तिवर्धक',
    cookingStyle: 'कोमल पत्तियों को भाप देकर उबले आलू, बारीक कटी प्याज या मसूर दाल में मिलाकर पकाया जाता है।',
    culturalNote: 'मुंगा के पेड़ को जीवनदायिनी माना जाता है। संताल गांवों में लगभग हर घर के अहाते में मुंगा का पेड़ होता है।',
    nutritionalHighlights: {
      iron: 'उच्च',
      calcium: 'उच्च',
      vitamins: 'विटामिन A, C, B-कॉम्प्लेक्स',
      fiber: 'प्रचुर'
    }
  },
  {
    id: 'mattha',
    nameDev: 'मातथा आड़ा़ (Mattha Ara)',
    nameRoman: 'Mattha Ara',
    hindiName: 'खट्टा साग / अम्लोरा पत्तियां',
    botanicalName: 'Antidesma acidum',
    season: 'summer',
    seasonNameHindi: 'ग्रीष्म काल (चिलचिलाती धूप में)',
    benefits: ['शरीर को शीतलता प्रदान करना', 'लू (हीट स्ट्रोक) से बचाव', 'भूख बढ़ाना व पित्त शमन'],
    taste: 'प्राकृतिक स्वादिष्ट खट्टापन',
    cookingStyle: 'इसकी पत्तियों को दाल के साथ खट्टा सूप (साग-झोल) के रूप में या चावल के पानी में पकाया जाता है।',
    culturalNote: 'भीषण गर्मी में जब जंगलों में काम करने जाते हैं, तो दोपहर में मातथा आड़ा़ की खटास शरीर में ताजगी भर देती है।',
    nutritionalHighlights: {
      iron: 'मध्यम',
      calcium: 'मध्यम',
      vitamins: 'प्रचुर विटामिन C व कार्बनिक अम्ल',
      fiber: 'प्रचुर'
    }
  },
  {
    id: 'saru',
    nameDev: 'सारु आड़ा़ (Saru Ara)',
    nameRoman: 'Saru Ara',
    hindiName: 'जंगली अरबी के पत्ते व डंठल',
    botanicalName: 'Colocasia esculenta',
    season: 'monsoon',
    seasonNameHindi: 'वर्षा ऋतु',
    benefits: ['आंतों की सफाई', 'जोड़ों के दर्द में लाभकारी', 'प्राकृतिक एंटी-ऑक्सीडेंट'],
    taste: 'नरम व सुपाच्य',
    cookingStyle: 'बारीक काटकर खटाई (इमली या मातथा पत्ती) के साथ अच्छी तरह पकाया जाता है ताकि गले में खराश न हो।',
    culturalNote: 'तालाबों और गीली मेड़ों के किनारे प्राकृतिक रूप से उगने वाला यह साग वर्षा काल का मुख्य आहार है।',
    nutritionalHighlights: {
      iron: 'उच्च',
      calcium: 'मध्यम',
      vitamins: 'विटामिन A, B6 व C',
      fiber: 'प्रचुर'
    }
  },
  {
    id: 'kana',
    nameDev: 'काना आड़ा़ (Kana Ara)',
    nameRoman: 'Kana Ara',
    hindiName: 'केना का साग / कौआकौनी',
    botanicalName: 'Commelina benghalensis',
    season: 'monsoon',
    seasonNameHindi: 'वर्षा ऋतु व शरद',
    benefits: ['त्वचा रोगों में शांति', 'रक्त शोधन', 'मूत्र विकार में राहत'],
    taste: 'शीतल व रसदार',
    cookingStyle: 'हल्के तड़के के साथ भुजिया बनाई जाती है या चावल के मांडी के साथ खाई जाती है।',
    culturalNote: 'खेतों की मेड़ों पर उगने वाला यह पौधा अत्यंत पवित्र और औषधीय गुणों से भरपूर माना जाता है।',
    nutritionalHighlights: {
      iron: 'मध्यम',
      calcium: 'उच्च',
      vitamins: 'विटामिन C व खनिज लवण',
      fiber: 'प्रचुर'
    }
  },
  {
    id: 'aarke',
    nameDev: 'आड़के आड़ा़ (Aarke Ara)',
    nameRoman: 'Aarke Ara (Sushni)',
    hindiName: 'सुषनी साग / चौपत्तिया',
    botanicalName: 'Marsilea quadrifolia',
    season: 'winter',
    seasonNameHindi: 'शीत काल व शरद',
    benefits: ['गहरी व प्राकृतिक नींद लाना', 'मानसिक तनाव व चिंता दूर करना', 'स्मृति शक्ति बढ़ाना'],
    taste: 'मीठा व मृदु',
    cookingStyle: 'शाम के समय हल्का भूनकर खाने से अनिद्रा की समस्या समाप्त होती है।',
    culturalNote: 'संताली बुजुर्ग अनिद्रा और थकान के रोगियों को रात में आड़के आड़ा़ खाने की सलाह देते हैं।',
    nutritionalHighlights: {
      iron: 'उच्च',
      calcium: 'उच्च',
      vitamins: 'बी-कॉम्प्लेक्स व ट्रैस मिनरल्स',
      fiber: 'प्रचुर'
    }
  },
  {
    id: 'muchri',
    nameDev: 'मुचड़ी आड़ा़ (Muchri Ara)',
    nameRoman: 'Muchri Ara',
    hindiName: 'खुशबूदार जंगली जल साग',
    botanicalName: 'Limnophila aromatica',
    season: 'winter',
    seasonNameHindi: 'शीत काल',
    benefits: ['पाचन अग्नि प्रदीप्त करना', 'सर्दी-खांसी में राहत', 'गले की कफ का निवारण'],
    taste: 'तीखा-सुगंधित व ताजा',
    cookingStyle: 'देसी मछली या कड़ाके की ठंड में गर्म सूप में सुगंधित जड़ी के रूप में डाला जाता है।',
    culturalNote: 'नदियों और झरनों के किनारों पर उगने वाली इस वनस्पति की सुगंध अद्भुत होती है।',
    nutritionalHighlights: {
      iron: 'मध्यम',
      calcium: 'मध्यम',
      vitamins: 'विटामिन A व आवश्यक तेल',
      fiber: 'मध्यम'
    }
  },
  {
    id: 'bir_hesak',
    nameDev: 'बीर हेसाक आड़ा़ (Bir Hesak Ara)',
    nameRoman: 'Bir Hesak Ara',
    hindiName: 'पीपल व पाकर की नई कोमल कलियां',
    botanicalName: 'Ficus religiosa / virens buds',
    season: 'spring',
    seasonNameHindi: 'वसंत ऋतु (फाल्गुन-चैत्र)',
    benefits: ['पेट के अल्सर व जलन से राहत', 'रक्त विकार निवारण', 'शरीर को नवजीवन देना'],
    taste: 'हल्का कसैला व कुरकुरा',
    cookingStyle: 'नई लाल कोपलों को उबालकर धूप में सुखाया जाता है या ताजे साग के रूप में छौंका जाता है।',
    culturalNote: 'वसंत में पेड़ों पर नई लाल पत्तियां आते ही संताल स्त्रियां बांस की टोकरी लेकर जंगल से एकत्र करती हैं।',
    nutritionalHighlights: {
      iron: 'उच्च',
      calcium: 'उच्च',
      vitamins: 'फ्लेवोनॉइड्स व पॉलीफेनॉल्स',
      fiber: 'प्रचुर'
    }
  }
];

export const TRADITIONAL_RECIPES: TraditionalRecipe[] = [
  {
    id: 'jeked_mandi',
    titleDev: 'जेकेड़ मांडी (Jeked Mandi)',
    titleRoman: 'Jeked Mandi',
    hindiTitle: 'पारंपरिक औषधीय जल-चावल सूप',
    category: 'daily',
    preparationTime: '२५ मिनट',
    culturalImportance: 'कठिन परिश्रम के बाद किसानों और वनवासियों को तुरंत ऊर्जा और जलयोजन देने वाला पारंपरिक मुख्य भोजन।',
    baseIngredients: [
      { item: 'पारंपरिक संताली लाल/देसी चावल', perPersonAmount: '१०० ग्राम' },
      { item: 'स्वच्छ जल (माड़ सहित)', perPersonAmount: '३०० मिली' },
      { item: 'बारीक कटा मौसमी वन-साग (गेंधारी/मुंगा)', perPersonAmount: '५० ग्राम' },
      { item: 'देसी लहसुन व हरी मिर्च', perPersonAmount: '२ कली' },
      { item: 'सेंधा या देसी नमक', perPersonAmount: 'स्वादानुसार' }
    ],
    methodSteps: [
      'मिट्टी की हांडी में चावल को धोकर प्रचुर जल में मंद आंच पर पकाएं।',
      'चावल अधपका होने पर उसमें ताजे धुले वन-साग और कटी लहसुन-मिर्च डालें।',
      'चावल का मांड (पेज) गाढ़ा होने तक पकने दें, पानी न निकालें।',
      'हल्का गुनगुना होने पर कांसा या मिट्टी के पात्र में परोसें।'
    ]
  },
  {
    id: 'lathe',
    titleDev: 'लातहे (Lathe - मातकोम लातहे)',
    titleRoman: 'Matkom Lathe',
    hindiTitle: 'महुआ फूल व भुने चने का पारंपरिक हलवा/लड्डू',
    category: 'sweet',
    preparationTime: '२० मिनट',
    culturalImportance: 'संताली संस्कृति में महुआ को कल्पवृक्ष माना जाता है। लातहे ऊर्जा, शक्ति और मिठास का पारंपरिक भंडार है।',
    baseIngredients: [
      { item: 'धूप में सूखे स्वच्छ महुआ फूल (मातकोम)', perPersonAmount: '८० ग्राम' },
      { item: 'भुने चने का सत्तू या भुना मक्का आटा', perPersonAmount: '६० ग्राम' },
      { item: 'सफेद तिल (तुलड़ी)', perPersonAmount: '१० ग्राम' },
      { item: 'देसी घी या सरसों तेल (वैकल्पिक)', perPersonAmount: '१ चम्मच' }
    ],
    methodSteps: [
      'सूखे महुआ के फूलों को लोहे की कड़ाही में हल्की आंच पर भूनकर खुशबूदार बनाएं।',
      'ओखल (तुपुंग) या सिलबट्टे पर भुने महुआ को भुने चने के साथ दरदरा कूटें।',
      'महुआ की प्राकृतिक शर्करा से सारा मिश्रण आपस में चिपकने लगेगा।',
      'हाथों से गोल लड्डू (लातहे) बनाएं। यह हफ्तों तक खराब नहीं होता।'
    ]
  },
  {
    id: 'dumbu_pitha',
    titleDev: 'डम्बु पीठा व जिल पीठा (Dumbu & Jil Pitha)',
    titleRoman: 'Dumbu ar Jil Pitha',
    hindiTitle: 'साल पत्तों में भाप से पका पारंपरिक चावल पीठा',
    category: 'festive',
    preparationTime: '४५ मिनट',
    culturalImportance: 'सोहराय और साकरात पर्व पर बनने वाला सबसे प्रतिष्ठित पकवान, जिसे साल (सारजोम) के पत्तों में लपेटकर पकाया जाता है।',
    baseIngredients: [
      { item: 'भिगोकर पिसा अरवा चावल आटा', perPersonAmount: '१२० ग्राम' },
      { item: 'ताजे साल (सारजोम) के चौड़े पत्ते', perPersonAmount: '४ पत्ते' },
      { item: 'भरावन: भुनी उड़द दाल या देसी चिकन (जिल)', perPersonAmount: '६० ग्राम' },
      { item: 'अदरक, लहसुन, संताली जंगली धनिया', perPersonAmount: '१ चम्मच' }
    ],
    methodSteps: [
      'चावल के आटे को हल्के गर्म पानी से गूंधकर लोई बनाएं।',
      'लोई के भीतर मसालेदार भुनी दाल या मांस का भरावन भरकर बंद करें।',
      'साल के पत्तों को धोकर उसमें लोई लपेटें और सींक (काड़ी) से बांधें।',
      'मिट्टी के हांडी या स्टीमर में भाप में २५ मिनट तक पकाएं। साल के पत्तों की मनमोहक सुगंध पीठा में उतर आती है।'
    ]
  },
  {
    id: 'leto',
    titleDev: 'जिल लेटो (Jil Leto)',
    titleRoman: 'Jil Leto',
    hindiTitle: 'चावल आटे व देसी मसालों का पारंपरिक मांस-सूप',
    category: 'festive',
    preparationTime: '४० मिनट',
    culturalImportance: 'विवाह, शिकार (सेंदरा) और बड़े सामूहिक आयोजनों में बनने वाला पौष्टिक गाढ़ा सूप।',
    baseIngredients: [
      { item: 'देसी मांस या मशरूम (ओत)', perPersonAmount: '१०० ग्राम' },
      { item: 'चावल का आटा (घोल बनाने के लिए)', perPersonAmount: '३० ग्राम' },
      { item: 'देसी पिसा मसाला (धनिया, जीरा, लहसुन)', perPersonAmount: '२ चम्मच' },
      { item: 'कटा हुआ जंगली हरा साग', perPersonAmount: '३० ग्राम' }
    ],
    methodSteps: [
      'मांस को सरसों तेल और संताली मसालों के साथ अच्छी तरह भूनें।',
      'प्रचुर पानी डालकर मांस को पूरी तरह गलने तक उबालें।',
      'चावल के आटे का पतला घोल बनाकर उबलते सूप में लगातार चलाते हुए डालें ताकि गांठ न पड़े।',
      'गाढ़ा और मखमली होने पर गरमा-गरम परोसें।'
    ]
  }
];

export const SantaliWildFoodsNutrition: React.FC = () => {
  const [selectedGreen, setSelectedGreen] = useState<WildGreen>(WILD_GREENS_DATABASE[0]);
  const [activeTab, setActiveTab] = useState<'greens' | 'recipes' | 'nutrition_guide'>('greens');
  const [seasonFilter, setSeasonFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [servings, setServings] = useState<number>(4);
  const [selectedRecipe, setSelectedRecipe] = useState<TraditionalRecipe>(TRADITIONAL_RECIPES[0]);

  // Filter wild greens
  const filteredGreens = WILD_GREENS_DATABASE.filter((green) => {
    const matchesSeason = seasonFilter === 'all' || green.season === seasonFilter || green.season === 'all';
    const matchesSearch =
      green.nameDev.toLowerCase().includes(searchTerm.toLowerCase()) ||
      green.hindiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      green.nameRoman.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSeason && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-950 to-stone-900 text-white p-6 sm:p-8 border border-emerald-800/40 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs font-bold border border-emerald-500/30">
              <Leaf className="w-3.5 h-3.5" />
              <span>वीर आड़ा़ आर जोम-ञू — पारंपरिक वनस्पति ज्ञान</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              संताली वन-साग, पारंपरिक भोजन व पोषण गाइड
            </h1>
            <p className="text-emerald-200/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              जंगलों और खेतों से मिलने वाले दुर्लभ संताली वन-साग, उनके औषधीय गुण, मौसमी चक्र और पूर्वजों की पारंपरिक पाक-विधियों (पीठा, जेकेड़ मांडी, लेटो) का विस्तृत संग्रह।
            </p>
          </div>

          <div className="flex items-center gap-2 bg-stone-900/80 p-1.5 rounded-2xl border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab('greens')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'greens'
                  ? 'bg-emerald-500 text-stone-950 shadow-md'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              🌿 वन-साग सूची ({WILD_GREENS_DATABASE.length})
            </button>
            <button
              onClick={() => setActiveTab('recipes')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'recipes'
                  ? 'bg-emerald-500 text-stone-950 shadow-md'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              🍲 पारंपरिक व्यंजन
            </button>
            <button
              onClick={() => setActiveTab('nutrition_guide')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'nutrition_guide'
                  ? 'bg-emerald-500 text-stone-950 shadow-md'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              📊 पोषण तुलना
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: WILD GREENS CATALOGUE */}
      {activeTab === 'greens' && (
        <div className="space-y-6">
          {/* Search & Season Filters */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="साग का नाम खोजें (उदा: गेंधारी, मुंगा, मातथा)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {[
                { id: 'all', label: 'सभी ऋतुएं' },
                { id: 'summer', label: '☀️ ग्रीष्म' },
                { id: 'monsoon', label: '🌧️ वर्षा' },
                { id: 'winter', label: '❄️ शीत' },
                { id: 'spring', label: '🌸 वसंत' }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSeasonFilter(filter.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    seasonFilter === filter.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Master Detail Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Greens List (5 Cols) */}
            <div className="lg:col-span-5 space-y-3">
              {filteredGreens.map((green) => {
                const isSelected = selectedGreen.id === green.id;
                return (
                  <div
                    key={green.id}
                    onClick={() => {
                      setSelectedGreen(green);
                      speakWithFemaleVoice(green.nameDev);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-300/40 shadow-sm'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-sm text-slate-900">{green.nameDev}</div>
                        <div className="text-xs text-emerald-800 font-semibold">{green.hindiName}</div>
                        <div className="text-[11px] font-mono text-slate-500 italic mt-0.5">
                          {green.botanicalName}
                        </div>
                      </div>
                      <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-lg shrink-0">
                        {green.seasonNameHindi.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Greens Deep Profile (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🌿</span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                      {selectedGreen.nameDev}
                    </h2>
                  </div>
                  <div className="text-sm font-bold text-emerald-800">{selectedGreen.hindiName}</div>
                  <div className="text-xs font-mono text-slate-500">
                    वानस्पतिक नाम: {selectedGreen.botanicalName}
                  </div>
                </div>

                <button
                  onClick={() => speakWithFemaleVoice(selectedGreen.nameDev)}
                  title="साग का संताली नाम सुनें"
                  className="p-3 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors cursor-pointer shrink-0"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Nutrition Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 font-bold block">आयरन (Iron)</span>
                  <span className="text-xs font-bold text-emerald-700">
                    {selectedGreen.nutritionalHighlights.iron}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 font-bold block">कैल्शियम</span>
                  <span className="text-xs font-bold text-emerald-700">
                    {selectedGreen.nutritionalHighlights.calcium}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 font-bold block">फाइबर</span>
                  <span className="text-xs font-bold text-emerald-700">
                    {selectedGreen.nutritionalHighlights.fiber}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 font-bold block">उपलब्धता ऋतु</span>
                  <span className="text-xs font-bold text-amber-700">
                    {selectedGreen.seasonNameHindi.split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* Health Benefits */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <HeartPulse className="w-4 h-4 text-rose-600" />
                  <span>पारंपरिक स्वास्थ्य व औषधीय लाभ:</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedGreen.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200/60 text-xs text-emerald-950 flex items-center gap-2"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cooking Style */}
              <div className="space-y-1.5 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70">
                <h3 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <UtensilsCrossed className="w-4 h-4 text-amber-700" />
                  <span>पारंपरिक पकाने की संताली विधि:</span>
                </h3>
                <p className="text-xs text-amber-950 leading-relaxed">{selectedGreen.cookingStyle}</p>
              </div>

              {/* Cultural Note */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed flex items-start gap-3">
                <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">सांस्कृतिक व लोक संदर्भ:</strong>
                  {selectedGreen.culturalNote}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ANCESTRAL RECIPES */}
      {activeTab === 'recipes' && (
        <div className="space-y-6">
          {/* Servings Scaler */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-600" />
                <span>व्यक्ति संख्या अनुसार सामग्री कैलकुलेटर (Serving Scaler)</span>
              </h3>
              <p className="text-xs text-slate-500">
                व्यक्तियों की संख्या चुनें, सामग्री की मात्रा स्वतः बदल जाएगी।
              </p>
            </div>

            <div className="flex items-center gap-2">
              {[2, 4, 6, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => setServings(num)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    servings === num
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {num} व्यक्ति
                </button>
              ))}
            </div>
          </div>

          {/* Recipes Display Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Recipe Tabs Left (4 Cols) */}
            <div className="lg:col-span-4 space-y-3">
              {TRADITIONAL_RECIPES.map((recipe) => {
                const isSelected = selectedRecipe.id === recipe.id;
                return (
                  <button
                    key={recipe.id}
                    onClick={() => {
                      setSelectedRecipe(recipe);
                      speakWithFemaleVoice(recipe.titleDev);
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-300/40 shadow-sm'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="font-bold text-sm text-slate-900">{recipe.titleDev}</div>
                    <div className="text-xs text-amber-800 mt-0.5">{recipe.hindiTitle}</div>
                    <div className="text-[10px] text-slate-500 mt-2 flex items-center gap-2">
                      <span>⏱️ {recipe.preparationTime}</span>
                      <span>•</span>
                      <span>{recipe.category === 'festive' ? 'महापर्व पकवान' : 'दैनिक आहार'}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Recipe Details Right (8 Cols) */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    {selectedRecipe.titleDev}
                  </h2>
                  <div className="text-sm text-amber-800 font-bold">{selectedRecipe.hindiTitle}</div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {selectedRecipe.culturalImportance}
                  </p>
                </div>
                <button
                  onClick={() => speakWithFemaleVoice(selectedRecipe.titleDev)}
                  title="व्यंजन का नाम सुनें"
                  className="p-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors cursor-pointer shrink-0"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Scaled Ingredients */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 flex items-center justify-between">
                  <span>आवश्यक सामग्री ({servings} व्यक्तियों के लिए):</span>
                  <span className="text-amber-700 font-normal">अनुपातिक गणना</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedRecipe.baseIngredients.map((ing, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <span className="text-slate-800 font-medium">{ing.item}</span>
                      <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        {ing.perPersonAmount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step by Step Cooking Method */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>पारंपरिक तैयारी व पकाने की विधि (Step-by-Step):</span>
                </h3>
                <div className="space-y-2">
                  {selectedRecipe.methodSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/60 flex items-start gap-3 text-xs sm:text-sm text-slate-800"
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NUTRITIONAL COMPARISON */}
      {activeTab === 'nutrition_guide' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">
              संताली पारंपरिक वन-खाद्य बनाम आधुनिक बाजार खाद्य
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              पारंपरिक संताली वन-साग और अनाजों में कीटनाशक नहीं होते और ये प्राकृतिक रूप से समृद्ध सूक्ष्म पोषक तत्वों (Micro-nutrients) से भरपूर हैं।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="text-2xl">🌱</div>
              <h3 className="font-bold text-sm text-emerald-950">प्राकृतिक रसायन-मुक्त आहार</h3>
              <p className="text-xs text-emerald-800 leading-relaxed">
                जंगली साग (मातथा, आड़के, काना) वनों और मेड़ों में प्राकृतिक वर्षा जल से उगते हैं। इनमें शून्य उर्वरक या केमिकल होते हैं।
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
              <div className="text-2xl">🩸</div>
              <h3 className="font-bold text-sm text-amber-950">रक्त व हीमोग्लोबिन संवर्धन</h3>
              <p className="text-xs text-amber-800 leading-relaxed">
                गेंधारी, मुंगा और बीर हेसाक में साधारण हरी सब्जियों की तुलना में ३ से ४ गुना अधिक लौह तत्व (Iron) पाया जाता है, जो एनीमिया से रक्षा करता है।
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
              <div className="text-2xl">🫀</div>
              <h3 className="font-bold text-sm text-blue-950">मौसम के अनुकूल संतुलन</h3>
              <p className="text-xs text-blue-800 leading-relaxed">
                गर्मी में मातथा साग शीतलता देता है, वर्षा में गेंधारी पेट साफ रखता है और शीतकाल में आड़के अनिद्रा और तनाव दूर कर गहरी नींद देता है।
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
