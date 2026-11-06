import React, { useState, useEffect } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { toggleFavorite, isFavorite } from '../utils/favoritesStorage';
import {
  UtensilsCrossed,
  Volume2,
  Sparkles,
  Flame,
  Leaf,
  Info,
  CheckCircle2,
  Search,
  BookOpen,
  Heart,
  Bookmark
} from 'lucide-react';

interface CuisineItem {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  category: 'pitha' | 'mandi' | 'mushroom' | 'leaf_curry' | 'soup_delicacy';
  categoryHindi: string;
  description: string;
  healthBenefits: string;
  ingredients: string[];
  cookingSteps: string[];
  culturalSignificance: string;
  imageUrl: string;
}

const SANTALI_CUISINES: CuisineItem[] = [
  {
    id: 'c1',
    nameDevanagari: 'साकाम पीठा (साखू पत्ता भाप पीठा)',
    nameRoman: 'Sakam Pitha',
    category: 'pitha',
    categoryHindi: 'पत्तों में पकाया गया पारंपरिक पीठा',
    description: 'चावल के आटे की लोई में गुड़, नारियल या मसालेदार चना दाल भरकर साल (सरजोम) के दो पत्तों के बीच रखकर अंगारों की भाप में सेका जाने वाला अनुपम व्यंजन।',
    healthBenefits: 'सरजोम (साल) पत्तों के जीवाणुरोधी और पाचक तत्व भाप के साथ भोजन में समा जाते हैं। यह बिना तेल का शून्य वसा (zero oil) पौष्टिक आहार है।',
    ingredients: [
      'ताज़ा चावल का आटा (Chaole Holon)',
      'गुड़ या चना दाल पूरण (Gud / Dal Khasa)',
      'हरी मिर्च, अदरक और जीरा',
      'ताज़े साल (सरजोम) के जोड़े पत्ते',
      'भाप अथवा लकड़ी के दहकते अंगारे'
    ],
    cookingSteps: [
      'चावल के आटे को गुनगुने पानी में सानकर नरम लोई तैयार करें।',
      'लोई के भीतर मीठा अथवा दाल का नमकीन पूरण भरें।',
      'सरजोम (साल) के दो हरे पत्तों को अच्छी तरह धोकर बीच में लोई रखें और पत्तों को धागे या सींक से मोड़कर बंद करें।',
      'तवे या गरम उपलों की राख/अंगारों पर धीमी आंच में उलट-पलट कर 15-20 मिनट तक भाप में पकाएं जब तक पत्ता भूरा न हो जाए।',
      'गरमा-गरम पत्ते खोलें और साल की सौंधी सुगंध के साथ परोसें।'
    ],
    culturalSignificance: 'सोहराय, साकरांत (सकरात) और बाहा पर्व में अतिथियों और कुलदेवताओं को पहला भोग साकाम पीठा का ही लगाया जाता है।',
    imageUrl: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'c2',
    nameDevanagari: 'लेते मंडी (गोंदली/चावल व दाल की गाढ़ी खिचड़ी)',
    nameRoman: 'Lete Mandi',
    category: 'mandi',
    categoryHindi: 'ऊर्जादायक पारंपरिक लेटे भात',
    description: 'चावल, दलहन और स्थानीय साग या मांस के मिश्रण से पकाई जाने वाली गाढ़ी और पौष्टिक खिचड़ी, जो कठिन शारीरिक श्रम के बाद संजीवनी का काम करती है।',
    healthBenefits: 'धीमी आंच पर पकने के कारण इसमें कार्बोहाइड्रेट और प्रोटीन का सुपाच्य संतुलन होता है, जो पेट को ठंडक और पेशियों को ताकत देता है।',
    ingredients: [
      'अरवा/उसना चावल (Chaole)',
      'उड़द या कुल्थी दाल (Udid / Horec Dal)',
      'हल्दी, लहसुन, साबुत सूखी मिर्च',
      'सरसों का शुद्ध तेल (Sunum)',
      'स्वादानुसार सेंधा नमक'
    ],
    cookingSteps: [
      'मिट्टी की हांडी (तुकुज) में पानी उबालें और दाल को आधा पकने तक उबालें।',
      'धुले हुए चावल डालकर धीमी आंच पर दोनों को एक साथ गलने तक पकाएं।',
      'लहसुन और सूखी मिर्च को सरसों तेल में कड़का कर छौंक (तड़का) लगाएं।',
      'लकड़ी की मथानी (कटुआ) से घोटकर गाढ़ा लेटे का रूप दें।'
    ],
    culturalSignificance: 'खेतों में रोपा (रोपाई) या ईर (कटाई) के समय पूरे टोले के मजदूर और परिवारजन साथ बैठकर दोना-पत्तल में लेटे मंडी खाते हैं।',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'c3',
    nameDevanagari: 'रुगड़ा / ओत् आड़ाक् (जंगली मशरूम व्यंजन)',
    nameRoman: 'Rugda / Ot Adah',
    category: 'mushroom',
    categoryHindi: 'प्राकृतिक साल वन मशरूम',
    description: 'मानसून के पहले पखवाड़े में साल वृक्षों की जड़ों के पास मिट्टी के नीचे उगने वाला प्राकृतिक गोल मशरूम (रुगड़ा) और जंगली छतरी मशरूम (ओत्)।',
    healthBenefits: 'अत्यधिक उच्च गुणवत्ता वाला शाकाहारी प्रोटीन, विटामिन डी, जिंक और एंटीऑक्सीडेंट्स से भरपूर; रोग प्रतिरोधक क्षमता को चमत्कारी रूप से बढ़ाता है।',
    ingredients: [
      'ताज़ा वनों से निकला रुगड़ा / ओत्',
      'कटा हुआ प्याज और हरी मिर्च',
      'अदरक-लहसुन का सिलबट्टा पेस्ट',
      'सरसों तेल, हल्दी और धनिया पाउडर',
      'गरम मसाला व हरा धनिया'
    ],
    cookingSteps: [
      'रुगड़ा को 4-5 बार साफ पानी से धोकर चिपकी हुई लाल मिट्टी हटाएं।',
      'प्रत्येक रुगड़ा को दो टुकड़ों में काटें (अंदर काले या सफेद रंग का रसीला गूदा होता है)।',
      'कड़ाही में सरसों तेल गरम कर प्याज व लहसुन को भूरा भूनें।',
      'मसाले और कटे रुगड़ा डालकर ढककर धीमी आंच पर 15 मिनट भूनें ताकि प्राकृतिक रस बाहर आए।',
      'रसीली या सूखी ग्रेवी बनाकर गरमा-गरम परोसें।'
    ],
    culturalSignificance: 'रुगड़ा संताल परगना और छोटानागपुर के वनों का सबसे कीमती उपहार माना जाता है, जिसे वनों की आत्मा का आशीर्वाद कहा जाता है।',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'c4',
    nameDevanagari: 'घोंघी - सुतली रसा (नदी सीप व घोंघा सूप)',
    nameRoman: 'Ghonghi-Sutli Rasa',
    category: 'soup_delicacy',
    categoryHindi: 'कैल्शियम समृद्ध नदी शंबूक सूप',
    description: 'स्वच्छ पहाड़ी नदियों और नालों के पत्थरों से चुने गए ताज़े घोंघे (Ghonghi) और सीप (Sutli) से तैयार किया जाने वाला पारंपरिक औषधीय सूप।',
    healthBenefits: 'हड्डियों, जोड़ों के दर्द और दृष्टि के लिए अति लाभकारी। इसमें उच्च प्राकृतिक कैल्शियम, ओमेगा फैटी एसिड और आयरन का भंडार होता है।',
    ingredients: [
      'स्वच्छ जल के घोंघे (Ghonghi / Sutli)',
      'चावल का हल्का मांड या सत्तू (घोल गाढ़ा करने हेतु)',
      'लहसुन, अदरक, हरी मिर्च और कच्ची हल्दी',
      'सरसों तेल और जीरा',
      'नींबू का रस व हरा धनिया'
    ],
    cookingSteps: [
      'घोंघे के पीछे का नुकीला सिरा हंसिया से काटकर अलग करें और गरम पानी में धोएं।',
      'उबलते पानी में 10 मिनट उबालकर अशुद्धियां निकाल लें।',
      'कड़ाही में तेल गरम कर लहसुन, अदरक और मिर्च का तीखा तड़का लगाएं।',
      'घोंघे डालकर भूनें, फिर 3 कप पानी और हल्का चावल का आटा डालकर 15 मिनट खौलाएं।',
      'सूप को गरमा-गरम प्याले में परोसें और सींक या मुंह से रसा चूसकर आनंद लें।'
    ],
    culturalSignificance: 'सर्दियों और वर्षाकाल में मौसमी फ्लू, सर्दी-खांसी और कमजोरी दूर करने के लिए संताल पूर्वज इसे घरेलू औषधि मानते आए हैं।',
    imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'c5',
    nameDevanagari: 'गेता / झिल पीठा (मांस पूरित भाप पीठा)',
    nameRoman: 'Jhil Pitha / Geta Pitha',
    category: 'pitha',
    categoryHindi: 'पारंपरिक मांसाहारी पीठा',
    description: 'चावल के आटे की दोहरी परत में देसी कुक्कुट या मटन का मसालेदार कीमा भरकर सरजोम पत्तों में लपेटकर लकड़ी के अंगारों पर भुना हुआ लज़ीज़ पकवान।',
    healthBenefits: 'प्रोटीन, कार्बोहाइड्रेट और वसा का संतुलित प्राकृतिक मेल, बिना किसी कृत्रिम रंग या प्रिजर्वेटिव के।',
    ingredients: [
      'चावल का महीन आटा (Chaole Holon)',
      'बारीक कटा हुआ देसी मांस (Jhil)',
      'प्याज, लहसुन, अदरक, काली मिर्च',
      'साल (सरजोम) के पत्ते और पतली बांस की सींक'
    ],
    cookingSteps: [
      'मांस को हल्के मसालों, प्याज और लहसुन के साथ आधा भूनकर भराव तैयार करें।',
      'चावल के आटे की मोटी रोटी बनाकर बीच में मांस भरें।',
      'चारों तरफ से सील कर साल के पत्तों में लपेटें।',
      'अंगारों की धीमी आंच पर 25 मिनट तक अच्छी तरह पकाएं।'
    ],
    culturalSignificance: 'शिकार (सेंदरा) के उपरांत या विवाह की बारात के स्वागत में विशिष्ट दामाद और अतिथियों के लिए तैयार किया जाता है।',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'c6',
    nameDevanagari: 'माथा आड़ाक् व सान आड़ाक् (वन्य पत्ते का साग)',
    nameRoman: 'Matha Adah & San Adah',
    category: 'leaf_curry',
    categoryHindi: 'अमचूर व वन-साग की पारंपरिक तरकारी',
    description: 'जंगलों और मेड़ों पर स्वतः उगने वाले औषधीय सागों को बिना अधिक मसालों के केवल लहसुन-मिर्च के छौंक के साथ पकाया जाने वाला दैनिक आहार।',
    healthBenefits: 'पाचन तंत्र को पूर्णतः विषमुक्त (detoxify) करता है, हीमोग्लोबिन बढ़ाता है और कब्ज से मुक्ति दिलाता है।',
    ingredients: [
      'ताज़ा माथा / सान साग',
      'लहसुन की 8-10 कलियां',
      'साबुत सूखी लाल मिर्च',
      'सरसों तेल व चुटकी भर नमक',
      'थोड़ा उबला हुआ चना (वैकल्पिक)'
    ],
    cookingSteps: [
      'साग को छांटकर अच्छी तरह धोएं और बारीक काटें।',
      'कड़ाही में जरा सा पानी डालकर साग को नमक के साथ 5 मिनट भांपें।',
      'पानी सूख जाने पर सरसों तेल, कुचला लहसुन और लाल मिर्च डालकर सुनहरा होने तक भूनें।'
    ],
    culturalSignificance: 'संताली जीवन में 50 से अधिक वन्य पत्तों (साग) की पहचान और उनका भोजन में सम्मान प्रकृति के प्रति कृतज्ञता दर्शाता है।',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80'
  }
];

export const SantaliTraditionalCuisine: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeItem, setActiveItem] = useState<CuisineItem>(SANTALI_CUISINES[0]);
  const [starred, setStarred] = useState<boolean>(false);

  useEffect(() => {
    setStarred(isFavorite(activeItem.id));
  }, [activeItem.id]);

  const handleToggleFavorite = () => {
    const isNowFav = toggleFavorite({
      id: activeItem.id,
      category: 'recipe',
      categoryLabel: activeItem.categoryHindi,
      titleDevanagari: activeItem.nameDevanagari,
      titleRoman: activeItem.nameRoman,
      subtitle: activeItem.healthBenefits.slice(0, 50) + '...',
      summary: activeItem.description
    });
    setStarred(isNowFav);
  };

  const filteredItems = SANTALI_CUISINES.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery =
      item.nameDevanagari.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameRoman.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryHindi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-emerald-50 text-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-200/40 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <UtensilsCrossed size={280} />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 border border-amber-500/30 text-xs font-semibold mb-3">
            <Sparkles size={14} />
            <span>हड़ोप जामि - संताली पारंपरिक खानपान व पाक कला</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-amber-800 flex items-center gap-3">
            <span>संताली पारंपरिक व्यंजन कोश</span>
            <button
              onClick={() => speakWithFemaleVoice('सांतार कोवाक् हाड़ोप जामि आर दाका-उत्')}
              className="p-2 rounded-full bg-amber-500/20 hover:bg-amber-500/40 text-amber-700 transition-colors"
              title="सुनें (Pronounce)"
            >
              <Volume2 size={22} />
            </button>
          </h1>
          <p className="text-amber-800/80 text-sm sm:text-base mt-2 leading-relaxed">
            साकाम पीठा, लेटे मंडी, रुगड़ा-ओत्, घोंघी-सुतली रसा और वन्य साग — बिना रसायन, मिट्टी के बर्तन और साल के पत्तों में पके पौष्टिक आदिवासी भोजन की सदियों पुरानी विधियां व स्वास्थ्य रहस्य।
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-50 p-4 rounded-2xl border border-slate-200 dark:border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {[
            { id: 'all', label: 'सभी व्यंजन (All)' },
            { id: 'pitha', label: 'पीठा (Sakam Pitha)' },
            { id: 'mandi', label: 'मंडी / भात (Mandi)' },
            { id: 'mushroom', label: 'रुगड़ा / ओत् (Mushroom)' },
            { id: 'soup_delicacy', label: 'घोंघी / रसा (Soup)' },
            { id: 'leaf_curry', label: 'वन्य साग (Wild Leaves)' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-xl transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-700 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-100 text-slate-700 dark:text-slate-700 hover:bg-slate-200 dark:hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 text-slate-600" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="व्यंजन खोजें (Search)..."
            className="w-full pl-9 pr-4 py-1.5 text-sm rounded-xl border border-slate-300 dark:border-slate-200 bg-slate-50 dark:bg-slate-100 text-slate-900 dark:text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Main Grid: List on Left, Detailed View on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider px-1">
            पारंपरिक व्यंजन सूची ({filteredItems.length})
          </h2>
          {filteredItems.map((item) => {
            const isSelected = activeItem.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-amber-50 dark:bg-amber-50/40 border-amber-500 shadow-md scale-[1.01]'
                    : 'bg-white dark:bg-slate-50 border-slate-200 dark:border-slate-200 hover:border-amber-300 hover:bg-slate-50 dark:hover:bg-slate-100/60'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-50/60 text-amber-800 dark:text-amber-700">
                      {item.categoryHindi}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-800 mt-1">
                      {item.nameDevanagari}
                    </h3>
                    <p className="text-xs text-amber-700 dark:text-amber-600 font-medium">
                      {item.nameRoman}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakWithFemaleVoice(item.nameDevanagari);
                    }}
                    className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-100 text-slate-600 dark:text-slate-700 hover:text-amber-600 dark:hover:text-amber-600"
                    title="सुनें"
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

        {/* Right Detail Pane */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-200 shadow-xl space-y-6 sticky top-6">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-200 pb-5">
              <div>
                <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-50/50 text-amber-800 dark:text-amber-700 text-xs font-bold uppercase tracking-wider">
                  {activeItem.categoryHindi}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-800 mt-2">
                  {activeItem.nameDevanagari}
                </h2>
                <p className="text-sm text-amber-700 dark:text-amber-600 font-semibold">
                  {activeItem.nameRoman}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleFavorite}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                    starred
                      ? 'bg-amber-500 text-stone-950 border-amber-500 shadow'
                      : 'bg-slate-100 dark:bg-slate-100 text-slate-700 dark:text-slate-700 border-slate-200 dark:border-slate-200 hover:bg-slate-200'
                  }`}
                  title="डायरी में सुरक्षित करें"
                >
                  <Bookmark size={16} />
                  <span>{starred ? 'सुरक्षित है' : 'सेव करें'}</span>
                </button>
                <button
                  onClick={() => speakWithFemaleVoice(activeItem.nameDevanagari)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-700 text-white font-medium hover:bg-amber-100 transition-colors shadow"
                >
                  <Volume2 size={18} />
                  <span>उच्चारण सुनें</span>
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-50/20 border border-amber-200/60 dark:border-amber-200/30">
              <h4 className="text-xs font-bold text-amber-900 dark:text-amber-700 uppercase tracking-wide flex items-center gap-1.5 mb-1">
                <BookOpen size={14} />
                <span>संक्षिप्त परिचय</span>
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-700 leading-relaxed">
                {activeItem.description}
              </p>
            </div>

            {/* Health Benefits */}
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-50/30 border border-emerald-200 dark:border-emerald-200/40">
              <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-700 uppercase tracking-wide flex items-center gap-1.5 mb-1">
                <Heart size={14} className="text-emerald-600" />
                <span>स्वास्थ्य लाभ व पोषण रहस्य (Health Benefits)</span>
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-700 leading-relaxed">
                {activeItem.healthBenefits}
              </p>
            </div>

            {/* Ingredients */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-800 mb-3 flex items-center gap-2">
                <Leaf size={16} className="text-amber-600" />
                <span>मुख्य सामग्रियां (Essential Ingredients)</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeItem.ingredients.map((ing, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-100/60 border border-slate-200/80 dark:border-slate-200 text-xs font-medium text-slate-800 dark:text-slate-800"
                  >
                    <CheckCircle2 size={14} className="text-amber-600 shrink-0" />
                    <span>{ing}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cooking Steps */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-800 mb-3 flex items-center gap-2">
                <Flame size={16} className="text-orange-600" />
                <span>पारंपरिक पकाने की विधि (Preparation Method)</span>
              </h4>
              <ol className="space-y-2.5">
                {activeItem.cookingSteps.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-700"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-700 text-white font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Cultural Significance */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
              <h4 className="text-xs font-bold text-amber-900 dark:text-amber-700 uppercase tracking-wide flex items-center gap-1.5 mb-1">
                <Info size={14} />
                <span>पर्व व सामाजिक महत्व (Cultural Significance)</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-700 leading-relaxed">
                {activeItem.culturalSignificance}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
