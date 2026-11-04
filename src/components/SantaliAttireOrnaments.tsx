import React, { useState } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { safeLoadFromStorage } from '../utils/storage';
import {
  Sparkles,
  Volume2,
  Search,
  Filter,
  Info,
  CheckCircle2,
  Layers,
  ShoppingBag,
  Palette,
  Heart
} from 'lucide-react';

export interface AttireItem {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  nameHindi: string;
  category: 'women_attire' | 'men_attire' | 'ornament' | 'headgear';
  categoryLabel: string;
  material: string;
  wornBy: string;
  occasions: string;
  descriptionHindi: string;
  culturalSignificance: string;
  santaliProverbOrSong?: string;
  badgeColor: string;
}

export const DEFAULT_ATTIRE_ITEMS: AttireItem[] = [
  {
    id: 'panchi_parhand',
    nameDevanagari: 'पांची पारहांड',
    nameRoman: 'Panchi Parhand',
    nameHindi: 'संथाली पारंपरिक दो-टुकड़ा साड़ी (पांची व पारहांड)',
    category: 'women_attire',
    categoryLabel: 'महिला पारंपरिक वस्त्र',
    material: 'शुद्ध हाथ से बुना सूती व टसर सिल्क धागा',
    wornBy: 'संथाली महिलाएं व युवतियां',
    occasions: 'सोहराय, बाहा, विवाह (बापला), और सार्वजनिक अखड़ा नृत्य',
    descriptionHindi: 'संथाली महिलाओं का सबसे पवित्र एवं गौरवमयी पारंपरिक वस्त्र। इसमें निचला हिस्सा "पारहांड" कहलाता है जो कमर से पैरों तक लपेटा जाता है, तथा ऊपरी हिस्सा "पांची" कंधे पर तिरछा डाला जाता है। इसके किनारों पर लाल, पीले व हरे रंगों की ज्यामितीय बुनाई होती है।',
    culturalSignificance: 'प्रकृति और सादगी का प्रतीक। यह नृत्य करते समय महिलाओं को सहज, शालीन और आकर्षक गतिशीलता प्रदान करता है।',
    santaliProverbOrSong: 'पांची पारहांड बान्दे काते, अखड़ा ते लांग चालाका! (पांची पारहांड पहनकर हम अखड़ा नृत्य में चलेंगे!)',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
  },
  {
    id: 'dhotra_panchna',
    nameDevanagari: 'धोतरा आर पांछना',
    nameRoman: 'Dhotra & Panchna',
    nameHindi: 'धोतरा (धोती) और पांछना (अंगवस्त्र/गमछा)',
    category: 'men_attire',
    categoryLabel: 'पुरुष पारंपरिक वस्त्र',
    material: 'मोटा शुद्ध खादी सूती हाथ से बुना कपड़ा',
    wornBy: 'संथाली पुरुष, मांझी हाड़ाम व युवा नर्तक',
    occasions: 'ग्राम सभा (मोड़े होड़), पर्व-त्योहार, खेत-खलिहान व अनुष्ठान',
    descriptionHindi: 'संथाली पुरुषों का मूल परिधान। कमर में घुटनों तक कसा जाने वाला धोती जैसा वस्त्र "धोतरा" कहलाता है, और कंधे पर रखा जाने वाला सूती गमछा "पांछना" कहलाता है। यह अक्सर सादे सफेद रंग में लाल या नीली किनारी (धाड़ी) के साथ होता है।',
    culturalSignificance: 'मेहनत, सादगी और गांव के स्वशासन में सम्मान का परिचायक है। मांझी हाड़ाम सभा में इसे अनिवार्य रूप से धारण करते हैं।',
    santaliProverbOrSong: 'धोतरा काते, पांछना काते, मोड़े होड़ सांव दुड़ुप मे! (धोतरा और पांछना पहनकर पंचों के साथ सम्मान से बैठो!)',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
  },
  {
    id: 'kasa_sakom',
    nameDevanagari: 'कांसा साकोम',
    nameRoman: 'Kasa Sakom',
    nameHindi: 'कांसा साकोम (कांसे का भारी पारंपरिक कड़ा/कंगन)',
    category: 'ornament',
    categoryLabel: 'पारंपरिक आभूषण',
    material: 'शुद्ध कांसा (Bell-metal / Bronze)',
    wornBy: 'विवाहित एवं अविवाहित संथाली युवतियां व महिलाएं',
    occasions: 'बापला (विवाह), सोहराय पर्व, अखड़ा लांगड़े नाच',
    descriptionHindi: 'दोनों कलाइयों में पहना जाने वाला भारी व नक्काशीदार कांसे का कंगन। इसकी बनावट में आदिवासी ज्यामितीय रेखाएं और सर्पिल आकृतियां उकेरी जाती हैं। नृत्य करते समय इसकी हल्की खनक अखड़ा के लय को बढ़ा देती है।',
    culturalSignificance: 'नारी शक्ति, सुरक्षा और संथाली सांस्कृतिक पहचान का अटूट प्रतीक। यह पीढ़ी-दर-पीढ़ी मां से बेटी को उपहार स्वरूप दिया जाता है।',
    santaliProverbOrSong: 'ती रे कांसा साकोम झलमाल, लांगड़े एनेच रे साड़े कान! (हाथों में कांसे का कंगन चमक रहा है, लांगड़े नाच में खनक रहा है!)',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
  },
  {
    id: 'hasuli',
    nameDevanagari: 'हांसुली',
    nameRoman: 'Hasuli',
    nameHindi: 'हंसुली (चांदी व पीतल का भारी हंसली कंठहार)',
    category: 'ornament',
    categoryLabel: 'पारंपरिक आभूषण',
    material: 'ठोस चांदी या पॉलिश किया पीतल',
    wornBy: 'संथाली महिलाएं',
    occasions: 'विवाह, बाहा बोंगा, जाहेर थान पूजा, विशेष उत्सव',
    descriptionHindi: 'गले के चारों ओर अर्धचंद्राकार आकार में पहना जाने वाला ठोस धातु का कंठहार। इसके दोनों छोर नुकीले या गोल घुमावदार होते हैं जिन पर सूक्ष्म नक्काशी होती है। यह गर्दन को सीधा और राजसी गरिमा प्रदान करता है।',
    culturalSignificance: 'पारंपरिक संपन्नता और स्त्री के आत्मसम्मान का प्रतीक है। इसे संथाली गीतों में नारी सौंदर्य की उपमा माना गया है।',
    santaliProverbOrSong: 'होतोक रे हांसुली झीकमिक, रूप तामाय मुल्हुच चांदो लेका! (गले में हंसुली चमक रही है, तेरा रूप दूज के चांद जैसा सुहाना है!)',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
  },
  {
    id: 'banka',
    nameDevanagari: 'बांका',
    nameRoman: 'Banka',
    nameHindi: 'बांका (पैरों का भारी घुंघरूदार पायजेब/कड़ा)',
    category: 'ornament',
    categoryLabel: 'पारंपरिक आभूषण',
    material: 'कांसा या पीतल की ठोस ढलाई',
    wornBy: 'नर्तकी महिलाएं व युवतियां',
    occasions: 'सोहराय नाच, लांगड़े अखड़ा, दासांय मेला',
    descriptionHindi: 'पैरों के टखने (Ankle) पर पहना जाने वाला गोल खोखला कड़ा, जिसके भीतर छोटे-छोटे कंकड़ या छर्रे भरे होते हैं। जब महिलाएं सामूहिक रूप से कदम ताल मिलाकर नाचती हैं, तो इससे सुरीली झंकार निकलती है।',
    culturalSignificance: 'मांदर (तुमदाक) और नगाड़े (तामाक) की थाप के साथ पैरों की लयबद्धता को पूर्ण करता है।',
    santaliProverbOrSong: 'जांगा रे बांका साड़े, तुमदाक सांव ताल मिलाव! (पैरों में बांका की झंकार, मांदर के साथ ताल मिला रही है!)',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  {
    id: 'pagh_pagri',
    nameDevanagari: 'पघ / पगड़ी',
    nameRoman: 'Pagh / Pagri',
    nameHindi: 'संथाली लाल-सफेद साफा / पगड़ी',
    category: 'headgear',
    categoryLabel: 'उत्सव परिधान व साफा',
    material: 'सूती कपड़ा, मयूर पंख (मारअक इल), जंगली फूल',
    wornBy: 'मांझी हाड़ाम, परगना, दुल्हा (जवांय), नर्तक दल',
    occasions: 'हूल दिवस (30 जून), विवाह, सोहराय, ग्राम विचार सभा',
    descriptionHindi: 'सिर पर करीने से लपेटा जाने वाला लंबा वस्त्र। इसके किनारे पर अक्सर मोरपंख (मारअक इल) या साल के ताजे फूल खोंसे जाते हैं। यह संथाली नेतृत्व और गरिमा की पहचान है।',
    culturalSignificance: 'स्वाभिमान, स्वतंत्रता और आदिम संप्रभुता का प्रतीक। हुल विद्रोह के समय सिदो-कान्हू ने भी पगड़ी धारण कर अंग्रेजों के विरुद्ध बिगुल फूंका था।',
    santaliProverbOrSong: 'बोहोक रे पघ आर मारअक इल, बिर बुरु रे अबोवाः दिल! (सिर पर पगड़ी और मोरपंख, जंगल-पहाड़ों में हमारा अदम्य साहस!)',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
  },
  {
    id: 'sikri_mala',
    nameDevanagari: 'सिकरी आर पोत माला',
    nameRoman: 'Sikri & Pot Mala',
    nameHindi: 'सिकरी (चांदी के पुराने सिक्कों की माला) और पोत (रंगीन मोतियों की माला)',
    category: 'ornament',
    categoryLabel: 'पारंपरिक आभूषण',
    material: 'प्राचीन चांदी के सिक्के, कांच के रंगीन मनके व धागा',
    wornBy: 'सभी आयु वर्ग की महिलाएं',
    occasions: 'दैनिक एवं पर्व-त्योहार',
    descriptionHindi: 'पुराने ब्रिटिश व रियासती चांदी के सिक्कों को पिरोकर बनाई जाने वाली लंबी माला सिकरी कहलाती है। इसके साथ लाल, काले और सफेद मोतियों से गूंथी हुई "पोत माला" भी गले में 3 से 5 लपेटों में पहनी जाती है।',
    culturalSignificance: 'पूर्वजों की धरोहर और संथाली लोक कला का सुंदर संगम। यह बुरी दृष्टि से रक्षा करने वाला रक्षा-कवच भी माना जाता है।',
    santaliProverbOrSong: 'कोड़ा रे सिकरी माला, रूप झलकाव कान! (छाती पर सिकरी माला सज रही है, अलौकिक सौंदर्य निखर रहा है!)',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
  },
  {
    id: 'tarpat',
    nameDevanagari: 'तरपात आर पानाय',
    nameRoman: 'Tarpat & Panay',
    nameHindi: 'तरपात (कानों का पारंपरिक गोलाकार कुंडल)',
    category: 'ornament',
    categoryLabel: 'पारंपरिक आभूषण',
    material: 'चांदी, पीतल या ताड़ के पत्तों का पारंपरिक चक्का',
    wornBy: 'संथाली युवतियां व वयोवृद्ध माताएं',
    occasions: 'बाहा पर्व, विवाह, सोहराय',
    descriptionHindi: 'कानों के निचले हिस्से के छिद्र में पहना जाने वाला चौड़ा गोलाकार कुंडल। प्राचीन समय में इसे ताड़पत्र या सोने-चांदी से बनाया जाता था। बाहा पर्व पर इसके साथ साल का महुआ फूल भी कानों में खोंसा जाता है।',
    culturalSignificance: 'प्रकृति के प्रति श्रद्धा और संथाली पारंपरिक श्रृंगार का मुख्य अंग।',
    santaliProverbOrSong: 'लुतुर रे तरपात, बुरु रे बाहा फुटाव! (कानों में तरपात सज रहा है, जैसे पहाड़ पर फूल खिले हों!)',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
  }
];

export const SantaliAttireOrnaments: React.FC = () => {
  const [items] = useState<AttireItem[]>(() =>
    safeLoadFromStorage('hor_katha_cms_attire', DEFAULT_ATTIRE_ITEMS)
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<AttireItem>(items[0]);

  const filteredItems = items.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      item.nameDevanagari.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameRoman.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.descriptionHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.material.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-orange-800 to-rose-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-200 border border-amber-400/30">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>होड़ बान्दो आर साजाम • संथाली पारंपरिक परिधान व आभूषण दीर्घा</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              संथाली पारंपरिक वस्त्र एवं आभूषण (Attire & Ornaments)
            </h1>
            <p className="text-amber-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              पांची पारहांड, धोतरा, कांसा साकोम, हंसुली, बांका एवं पघ जैसे संथाली समाज के ऐतिहासिक, सांस्कृतिक और कलात्मक परिधानों व आभूषणों का सचित्र एवं प्रमाणिक संग्रह।
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 self-start md:self-auto">
            <ShoppingBag className="w-6 h-6 text-amber-300" />
            <div>
              <p className="text-xs text-amber-200">कुल संकलित परिधान</p>
              <p className="text-lg font-black text-white">{items.length} धरोहर वस्तुएं</p>
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
            { id: 'all', label: 'सभी (All)' },
            { id: 'women_attire', label: 'महिला वस्त्र' },
            { id: 'men_attire', label: 'पुरुष वस्त्र' },
            { id: 'ornament', label: 'पारंपरिक आभूषण' },
            { id: 'headgear', label: 'साफा व पगड़ी' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-700 text-white shadow-xs'
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
            placeholder="नाम, धातु, या वस्त्र खोजें..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
        </div>
      </div>

      {/* 2-Column Main Section: Gallery List & Deep Dive Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Cards Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const isSelected = selectedItem.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer bg-white text-left flex flex-col justify-between shadow-xs ${
                  isSelected
                    ? 'border-amber-600 ring-2 ring-amber-500/20 shadow-md scale-[1.01]'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${item.badgeColor}`}>
                      {item.categoryLabel}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakWithFemaleVoice(item.nameDevanagari);
                      }}
                      title="संथाली उच्चारण सुनें"
                      className="p-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 tracking-tight">
                    {item.nameDevanagari}
                  </h3>
                  <p className="text-xs font-semibold text-amber-700 mb-1">
                    {item.nameRoman}
                  </p>
                  <p className="text-xs font-medium text-slate-600 line-clamp-1 mb-2">
                    {item.nameHindi}
                  </p>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {item.descriptionHindi}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700 truncate max-w-[140px]">
                    सामग्री: {item.material.split(' ')[0]}
                  </span>
                  <span className="text-amber-800 font-bold hover:underline">
                    विस्तार देखें →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Active Spotlight Card */}
        <div className="lg:col-span-5 sticky top-20 bg-white rounded-3xl border border-slate-200 shadow-lg p-6 space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${selectedItem.badgeColor}`}>
                {selectedItem.categoryLabel}
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                {selectedItem.nameDevanagari}
              </h2>
              <p className="text-sm font-bold text-amber-800">
                {selectedItem.nameRoman} • {selectedItem.nameHindi}
              </p>
            </div>
            <button
              onClick={() => speakWithFemaleVoice(selectedItem.nameDevanagari)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <Volume2 className="w-4 h-4 text-amber-800" />
              <span>उच्चारण</span>
            </button>
          </div>

          {/* Quick Fact Badges */}
          <div className="grid grid-cols-2 gap-3 bg-amber-50/60 p-3.5 rounded-2xl border border-amber-100 text-xs">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase">निर्माण सामग्री (Material)</p>
              <p className="font-bold text-slate-800 mt-0.5">{selectedItem.material}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase">धारक (Worn By)</p>
              <p className="font-bold text-slate-800 mt-0.5">{selectedItem.wornBy}</p>
            </div>
          </div>

          {/* Cultural Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-700" /> विस्तृत विवरण (Description)
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              {selectedItem.descriptionHindi}
            </p>
          </div>

          {/* Occasions */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              पहनने के विशेष अवसर (Occasions)
            </h4>
            <p className="text-xs font-medium text-slate-800 bg-amber-50/40 p-2.5 rounded-xl border border-amber-100">
              {selectedItem.occasions}
            </p>
          </div>

          {/* Cultural Significance */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-600" /> सांस्कृतिक महत्व (Cultural Lore)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedItem.culturalSignificance}
            </p>
          </div>

          {/* Folklore Quote / Song */}
          {selectedItem.santaliProverbOrSong && (
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-3.5 rounded-2xl border border-amber-200 space-y-1">
              <p className="text-[11px] font-bold text-amber-900 uppercase">पारंपरिक संथाली लोक कहावत / गीत</p>
              <p className="text-xs font-bold text-slate-900 italic">
                "{selectedItem.santaliProverbOrSong}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
