import React, { useState } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { safeLoadFromStorage } from '../utils/storage';
import {
  UtensilsCrossed,
  Sparkles,
  Volume2,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Flame,
  Leaf,
  Heart
} from 'lucide-react';

export interface CuisineRecipe {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  nameHindi: string;
  category: 'pitha' | 'curry_greens' | 'beverage' | 'snack';
  categoryLabel: string;
  prepTime: string;
  festiveOccasion: string;
  ingredients: string[];
  cookingMethodHindi: string;
  culturalSignificance: string;
  proverbSantali?: string;
  proverbHindi?: string;
  badgeColor: string;
}

export const DEFAULT_CUISINE_RECIPES: CuisineRecipe[] = [
  {
    id: 'jil_pitha',
    nameDevanagari: 'जिल पीठा',
    nameRoman: 'Jil Pitha',
    nameHindi: 'मांस-पूरित साल पत्ता पीठा (मांस पीठा)',
    category: 'pitha',
    categoryLabel: 'पारंपरिक पीठा',
    prepTime: '४५ - ५० मिनट',
    festiveOccasion: 'सोहराय पर्व, साकरात, शिकार (सेंन्दरा) एवं विशेष अतिथियों का स्वागत',
    ingredients: [
      'कुटा हुआ अरवा चावल का आटा (चावल गुंड़ा)',
      'मटन या देसी मुर्गा का कीमा (मसालेदार)',
      'प्याज, लहसुन, अदरक, हरी मिर्च',
      'ताजे हरे साल (सरजोम) के चौड़े पत्ते',
      'सूखी साल की सींक (पत्ते सीने के लिए)'
    ],
    cookingMethodHindi: 'चावल के आटे में गरम पानी मिलाकर लोई तैयार की जाती है। लोई के भीतर मसालेदार भुना हुआ मांस भरकर उसे गोल या चपटा आकार दिया जाता है। इसके बाद ताजे साल के पत्तों में लपेटकर लकड़ी की सींकों से बंद कर दिया जाता है। इसे चूल्हे के लाल अंगारों की धीमी आंच पर दोनों तरफ उलट-पुलट कर पकाया जाता है। पत्तों के जलने पर एक विशिष्ट सौंधी खुशबू आती है।',
    culturalSignificance: 'संथाली समाज का सर्वोच्च मांगलिक और स्वादिष्ट व्यंजन। यह दामाद (जवांय) और समधी के आगमन पर सम्मान के रूप में अवश्य परोसा जाता है।',
    proverbSantali: 'सरजोम साकाम रे जिल पीठा, सोहराय रेगे हेड़ेम आटका!',
    proverbHindi: 'साल के पत्तों में पका जिल पीठा, सोहराय पर्व में ही इसका स्वर्गीय स्वाद मिलता है!',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
  },
  {
    id: 'chhilka_roti',
    nameDevanagari: 'छिलका रोटी',
    nameRoman: 'Chhilka Roti',
    nameHindi: 'चावल व उड़द दाल की जालीदार पतली रोटी',
    category: 'pitha',
    categoryLabel: 'पारंपरिक रोटी',
    prepTime: '२० मिनट',
    festiveOccasion: 'बाहा पर्व, माघे, मेहमानों का नाश्ता',
    ingredients: [
      'भीगा हुआ अरवा चावल (पिसा हुआ घोल)',
      'थोड़ी सी उड़द या चना दाल (स्वादानुसार)',
      'पानी और चुटकी भर नमक',
      'मिट्टी या लोहे का तवा (तावा)'
    ],
    cookingMethodHindi: 'चावल और दाल का पतला घोल तैयार किया जाता है। तवे पर हल्का सा तेल लगाकर कटोरी या हाथ से घोल को घुमाते हुए फैलाया जाता है। यह कुछ ही सेकंड में जालीदार और मुलायम बन जाती है। इसे देसी मुर्गा के झोल या माटा साग के साथ खाया जाता है।',
    culturalSignificance: 'संथाली घरों में नाश्ते का सबसे प्रिय और हल्का भोजन। यह आसानी से पचने वाला और ऊर्जा प्रदान करने वाला पारंपरिक व्यंजन है।',
    proverbSantali: 'छिलका रोटी आर जिल रसा, आडी हेड़ेम सोड़ो!',
    proverbHindi: 'छिलका रोटी और मुर्गे का रसा, इसका स्वाद अत्यंत मीठा और मनभावन है!',
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-300'
  },
  {
    id: 'mata_arak',
    nameDevanagari: 'माटा आरअक (साग)',
    nameRoman: 'Mata Arak’',
    nameHindi: 'जंगली माटा साग (खट्टा-मीठा औषधीय साग)',
    category: 'curry_greens',
    categoryLabel: 'पारंपरिक साग व तरकारी',
    prepTime: '२५ मिनट',
    festiveOccasion: 'गर्मी एवं वर्षा ऋतु, दैनिक पौष्टिक भोजन',
    ingredients: [
      'जंगल या मेढ़ से तोड़ा हुआ ताजा माटा साग',
      'लहसुन की कलियां, सूखी लाल मिर्च',
      'सरसों का शुद्ध तेल व नमक',
      'उबले आलू या चना (ऐच्छिक)'
    ],
    cookingMethodHindi: 'साग को अच्छी तरह धोकर बारीक काटा जाता है। कड़ाही में सरसों का तेल गर्म कर लहसुन और सूखी मिर्च का तड़का लगाया जाता है। साग को डालकर धीमी आंच पर ढंककर पकाया जाता है ताकि उसके प्राकृतिक पोषक तत्व और हल्की खटास बनी रहे।',
    culturalSignificance: 'संथाली समुदाय प्रकृति और जंगलों से 40 से अधिक प्रकार के खाद्य साग एकत्र करता है। माटा साग पेट के लिए अमृत माना जाता है।',
    proverbSantali: 'बिर रे माटा आरअक, हाड़मो रे दाड़े बाढ़ाव!',
    proverbHindi: 'जंगल का माटा साग, शरीर में प्राकृतिक बल और स्वास्थ्य बढ़ाता है!',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
  },
  {
    id: 'dambu_pitha',
    nameDevanagari: 'दाम्बु पीठा (भाप पीठा)',
    nameRoman: 'Dambu Pitha',
    nameHindi: 'भाप में पकाया हुआ चावल का पीठा',
    category: 'pitha',
    categoryLabel: 'पारंपरिक पीठा',
    prepTime: '३५ मिनट',
    festiveOccasion: 'साकरात पर्व, जाहेर थान पूजा, जाड़े के मौसम',
    ingredients: [
      'चावल का दरदरा आटा',
      'गुड़ और कद्दूकस किया हुआ नारियल (मीठा) अथवा भुनी हुई उड़द दाल',
      'भाप पकाने का पारंपरिक बर्तन (हंडी)'
    ],
    cookingMethodHindi: 'चावल के आटे में पानी मिलाकर छोटे-छोटे पेड़े बनाए जाते हैं। अंदर गुड़-नारियल या दाल की भरावन डालकर भाप के बर्तन पर कपड़े के सहारे भाप में 15-20 मिनट तक उबाला जाता है। यह बिना किसी तेल के तैयार होने वाला पौष्टिक पीठा है।',
    culturalSignificance: 'साकरात पर्व पर प्रत्येक संथाली घर में दाम्बु पीठा बनाना अनिवार्य माना जाता है। यह पूर्वजों को नैवेद्य चढ़ाने के बाद खाया जाता है।',
    proverbSantali: 'साकरात रे दाम्बु पीठा, हापड़ाव को लांग जोहार कोवा!',
    proverbHindi: 'साकरात पर दाम्बु पीठा बनाकर, पूर्वजों को सादर नमन करते हैं!',
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
  },
  {
    id: 'leto_soup',
    nameDevanagari: 'लेतो (संथाली शोरबा/दलिया)',
    nameRoman: 'Leto',
    nameHindi: 'चावल व मटन का मसालेदार गाढ़ा शोरबा (लेतो)',
    category: 'curry_greens',
    categoryLabel: 'पारंपरिक सूप/शोरबा',
    prepTime: '४० मिनट',
    festiveOccasion: 'शिकार उत्सव, सामुदायिक भोज, शादी-विवाह',
    ingredients: [
      'दरदरा पीसा हुआ चावल का आटा',
      'मांस के छोटे टुकड़े व हड्डियां',
      'हल्दी, अदरक, धनिया, तेजपत्ता',
      'ताजा धनिया पत्ती'
    ],
    cookingMethodHindi: 'मांस को मसालों के साथ अच्छी तरह भूना जाता है। इसके बाद पर्याप्त पानी डालकर पकाया जाता है। अंत में चावल के आटे का पतला घोल डालकर लगातार चलाया जाता है जब तक कि यह गाढ़ा और मखमली न हो जाए।',
    culturalSignificance: 'सेंन्दरा (शिकार) से लौटने के बाद आखड़ा में एकत्र होकर सभी ग्रामवासी मिलकर लेतो का आनंद लेते हैं। यह भाईचारे का प्रतीक है।',
    proverbSantali: 'लेतो जोम काते, अतु होड़ मिद ताहेना!',
    proverbHindi: 'एक साथ लेतो खाकर, पूरा गांव एकता के सूत्र में बंधा रहता है!',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
  },
  {
    id: 'handi_paur',
    nameDevanagari: 'हांडी (पौचाई / इलनी)',
    nameRoman: 'Handi (Pauchai)',
    nameHindi: 'चावल का प्राकृतिक सांस्कृतिक पेय (तपान हांडी)',
    category: 'beverage',
    categoryLabel: 'पारंपरिक पेय व नैवेद्य',
    prepTime: '३ - ४ दिन (किण्वन/Fermentation)',
    festiveOccasion: 'बोंगा बुरु पूजा, जाहेर थान अनुष्ठान, करम, बाहा, सोहराय',
    ingredients: [
      'पका हुआ उसना या अरवा चावल',
      'रानू (Ranu) - २१ प्रकार की औषधीय जंगली जड़ी-बूटियों से बनी पारंपरिक टिकिया',
      'मिट्टी की नई हांडी (कलश)',
      'पुआल (घास) का आवरण'
    ],
    cookingMethodHindi: 'पके हुए चावल को ठंडा कर उसमें जंगली जड़ी-बूटियों से बनी "रानू" की टिकिया को पीसकर मिलाया जाता है। इसे मिट्टी की हांडी में रखकर अंधेरे और गर्म स्थान पर 3 से 4 दिनों तक किण्वित होने दिया जाता है। तैयार होने पर ऊपर का शुद्ध अर्क "तपान हांडी" कहलाता है जिसे पहले देवताओं को अर्पित किया जाता है।',
    culturalSignificance: 'संथाली समाज में इसे केवल पेय नहीं, बल्कि बोंगा बुरु का पवित्र प्रसाद माना जाता है। किसी भी पूजा में बाखेर मंत्र पढ़ते समय इसका तर्पण अनिवार्य होता है।',
    proverbSantali: 'बोंगा बुरु रे तपान हांडी, मारांग बुरुवाः आशीष ञामोक!',
    proverbHindi: 'देवताओं को तपान हांडी का अर्पण करने से, मारांग बुरु का शुभ आशीष मिलता है!',
    badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
  }
];

export const SantaliCuisineRecipes: React.FC = () => {
  const [recipes] = useState<CuisineRecipe[]>(() =>
    safeLoadFromStorage('hor_katha_cms_cuisine', DEFAULT_CUISINE_RECIPES)
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<CuisineRecipe>(recipes[0]);

  const filteredRecipes = recipes.filter((r) => {
    const matchesCat = selectedCategory === 'all' || r.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      r.nameDevanagari.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.nameRoman.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.nameHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.festiveOccasion.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-800 via-orange-900 to-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-200 border border-amber-400/30">
              <UtensilsCrossed className="w-4 h-4 text-amber-300" />
              <span>मांडी आर जिल पीठा • संथाली पारंपरिक खान-पान व पाककला दीर्घा</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              पारंपरिक संथाली खान-पान व व्यंजन (Cuisine & Recipes)
            </h1>
            <p className="text-amber-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              जिल पीठा, छिलका रोटी, माटा आरअक, दाम्बु पीठा एवं तपान हांडी—प्रकृति के सान्निध्य में साल के पत्तों और पारंपरिक आंच पर पकने वाले संथाली व्यंजनों का प्रामाणिक संग्रह।
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 self-start md:self-auto">
            <Flame className="w-6 h-6 text-amber-300" />
            <div>
              <p className="text-xs text-amber-200">पारंपरिक व्यंजन</p>
              <p className="text-lg font-black text-white">{recipes.length} प्रामाणिक रेसिपी</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mr-1">
            <Filter className="w-3.5 h-3.5" /> श्रेणी:
          </span>
          {[
            { id: 'all', label: 'सभी व्यंजन (All)' },
            { id: 'pitha', label: 'पारंपरिक पीठा' },
            { id: 'curry_greens', label: 'साग व शोरबा' },
            { id: 'beverage', label: 'पवित्र पेय' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="व्यंजन या सामग्री खोजें..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
          />
        </div>
      </div>

      {/* 2-Column: Recipe Cards & Active Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredRecipes.map((recipe) => {
            const isSelected = selectedRecipe.id === recipe.id;
            return (
              <div
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer bg-white text-left flex flex-col justify-between shadow-xs ${
                  isSelected
                    ? 'border-amber-700 ring-2 ring-amber-600/20 shadow-md scale-[1.01]'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${recipe.badgeColor}`}>
                      {recipe.categoryLabel}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakWithFemaleVoice(recipe.nameDevanagari);
                      }}
                      className="p-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 cursor-pointer"
                      title="व्यंजन नाम सुनें"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 tracking-tight">
                    {recipe.nameDevanagari}
                  </h3>
                  <p className="text-xs font-semibold text-amber-800 mb-1">
                    {recipe.nameRoman} • {recipe.nameHindi}
                  </p>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {recipe.cookingMethodHindi}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {recipe.prepTime}
                  </span>
                  <span className="text-amber-800 font-bold hover:underline">
                    रेसिपी देखें →
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
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${selectedRecipe.badgeColor}`}>
                {selectedRecipe.categoryLabel}
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                {selectedRecipe.nameDevanagari}
              </h2>
              <p className="text-sm font-bold text-amber-800">
                {selectedRecipe.nameRoman} ({selectedRecipe.nameHindi})
              </p>
            </div>
            <button
              onClick={() => speakWithFemaleVoice(selectedRecipe.nameDevanagari)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <Volume2 className="w-4 h-4" />
              <span>उच्चारण</span>
            </button>
          </div>

          {/* Quick Meta */}
          <div className="grid grid-cols-2 gap-3 bg-amber-50/50 p-3.5 rounded-2xl border border-amber-100 text-xs">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> पकाने का समय
              </p>
              <p className="font-bold text-slate-800 mt-0.5">{selectedRecipe.prepTime}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> मुख्य पर्व व अवसर
              </p>
              <p className="font-bold text-slate-800 mt-0.5 truncate">{selectedRecipe.festiveOccasion.split(',')[0]}</p>
            </div>
          </div>

          {/* Ingredients */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              आवश्यक पारंपरिक सामग्री (Ingredients)
            </h4>
            <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              {selectedRecipe.ingredients.map((ing, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                  <span>{ing}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cooking Method */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-700" /> बनाने की पारंपरिक विधि
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed bg-amber-50/30 p-3.5 rounded-2xl border border-amber-100">
              {selectedRecipe.cookingMethodHindi}
            </p>
          </div>

          {/* Cultural Lore */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              सांस्कृतिक व सामाजिक महत्व
            </h4>
            <p className="text-xs text-slate-600">
              {selectedRecipe.culturalSignificance}
            </p>
          </div>

          {/* Folklore Quote */}
          {selectedRecipe.proverbSantali && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3.5 rounded-2xl border border-amber-200 space-y-1">
              <p className="text-[11px] font-bold text-amber-900 uppercase">पारंपरिक लोक कहावत</p>
              <p className="text-xs font-bold text-slate-900 italic">
                "{selectedRecipe.proverbSantali}"
              </p>
              <p className="text-[11px] text-slate-600">
                भावार्थ: {selectedRecipe.proverbHindi}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
