import React, { useState } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  Baby,
  Search,
  Volume2,
  Heart,
  Bookmark,
  Sparkles,
  BookOpen,
  Filter,
  Check,
  ShieldCheck,
  Award,
  Users
} from 'lucide-react';

interface BabyNameItem {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  gender: 'boy' | 'girl' | 'unisex';
  meaningHindi: string;
  meaningEnglish: string;
  category: 'ancestral' | 'nature' | 'virtue' | 'festival_day' | 'valour';
  culturalOriginNote: string;
}

const SANTALI_BABY_NAMES: BabyNameItem[] = [
  // Boys (कोड़ा गिद्रा)
  {
    id: 'b1',
    nameDevanagari: 'सागेन',
    nameRoman: 'Sagen',
    gender: 'boy',
    meaningHindi: 'अंकुरित नया पत्ता, नई शुरुआत व समृद्धि',
    meaningEnglish: 'Fresh green sprout, symbol of prosperity and new dawn',
    category: 'nature',
    culturalOriginNote: 'संताली में नए जीवन और नव-पल्लव को सागेन कहते हैं।'
  },
  {
    id: 'b2',
    nameDevanagari: 'मरांग',
    nameRoman: 'Marang',
    gender: 'boy',
    meaningHindi: 'महान, ज्येष्ठ, उच्च व पूज्य',
    meaningEnglish: 'Great, eldest, noble and honored',
    category: 'ancestral',
    culturalOriginNote: 'घर के सबसे बड़े बेटे या मरांग बुरु के आशीर्वाद का द्योतक।'
  },
  {
    id: 'b3',
    nameDevanagari: 'कान्हू',
    nameRoman: 'Kanhu',
    gender: 'boy',
    meaningHindi: 'वीर स्वाभिमानी, हूल क्रांति के अमर महानायक',
    meaningEnglish: 'Valiant freedom fighter of the 1855 Hul revolution',
    category: 'valour',
    culturalOriginNote: 'सिदो-कान्हू मुर्मु के स्वाभिमान और त्याग का पावन प्रतीक।'
  },
  {
    id: 'b4',
    nameDevanagari: 'सिदो',
    nameRoman: 'Sido',
    gender: 'boy',
    meaningHindi: 'स्वाधीनता के अग्रदूत, दृढ़ निश्चयी',
    meaningEnglish: 'Leader of liberty, unyielding commander of Hul',
    category: 'valour',
    culturalOriginNote: 'संताल हूल के प्रधान नायक अमर शहीद सिदो मुर्मु।'
  },
  {
    id: 'b5',
    nameDevanagari: 'सारजोम',
    nameRoman: 'Sarjom',
    gender: 'boy',
    meaningHindi: 'पवित्र सखुआ (साल) वृक्ष, अमरता व स्थिरता',
    meaningEnglish: 'Sacred Sal tree, symbol of eternal endurance and holiness',
    category: 'nature',
    culturalOriginNote: 'संताली समाज में साल वृक्ष को जाहेर थान का अधिष्ठाता माना जाता है।'
  },
  {
    id: 'b6',
    nameDevanagari: 'बिरसा',
    nameRoman: 'Birsa',
    gender: 'boy',
    meaningHindi: 'बृहस्पतिवार (गुरुवार) को जन्मा, धरती आबा',
    meaningEnglish: 'Born on Thursday, fearless protector of native soil',
    category: 'festival_day',
    culturalOriginNote: 'बिर बार (बृहस्पतिवार) के दिन जन्म लेने पर यह शुभ नाम दिया जाता है।'
  },
  {
    id: 'b7',
    nameDevanagari: 'धोनी',
    nameRoman: 'Dhoni',
    gender: 'boy',
    meaningHindi: 'धैर्यवान, धीर-गंभीर व लक्ष्यसाधक',
    meaningEnglish: 'Calm, patient and focused achiever',
    category: 'virtue',
    culturalOriginNote: 'पारंपरिक संताली परिवारों में संयमी स्वभाव वाले बालक का नाम।'
  },
  {
    id: 'b8',
    nameDevanagari: 'सोहराय',
    nameRoman: 'Sohrai',
    gender: 'boy',
    meaningHindi: 'सोहराय पर्व के शुभ काल में जन्मा, मंगलकारी',
    meaningEnglish: 'Born during the auspicious harvest festival of Sohrai',
    category: 'festival_day',
    culturalOriginNote: 'कार्तिक-पौष मास के सोहराय पर्व के दौरान जन्मा बालक।'
  },
  {
    id: 'b9',
    nameDevanagari: 'मातकोम',
    nameRoman: 'Matkom',
    gender: 'boy',
    meaningHindi: 'महुआ का मीठा पवित्र फूल, संजीवनी',
    meaningEnglish: 'Sweet Mahua blossom, life-giving sacred flower',
    category: 'nature',
    culturalOriginNote: 'संताली वनों का सबसे गुणकारी और जीवनदायी कल्पवृक्ष।'
  },
  {
    id: 'b10',
    nameDevanagari: 'बाहा',
    nameRoman: 'Baha',
    gender: 'unisex',
    meaningHindi: 'पवित्र पुष्प, वसंत पर्व की सुगंध',
    meaningEnglish: 'Sacred blossom, herald of springtime festival',
    category: 'nature',
    culturalOriginNote: 'बाहा पर्व में सखुआ और महुआ के पहले फूलों का आदर किया जाता है।'
  },
  {
    id: 'b11',
    nameDevanagari: 'जाहेर',
    nameRoman: 'Jaher',
    gender: 'boy',
    meaningHindi: 'पवित्र वनस्थली, देवस्थल का रक्षक',
    meaningEnglish: 'Sacred grove of Jaher Than, divine peace',
    category: 'ancestral',
    culturalOriginNote: 'संताली गांव का पावन कुल-स्थान जाहेर थान।'
  },
  {
    id: 'b12',
    nameDevanagari: 'चांद',
    nameRoman: 'Chand',
    gender: 'boy',
    meaningHindi: 'चांद मुर्मु, हूल क्रांति के अमर रणबांकुरे',
    meaningEnglish: 'Fierce warrior sibling of Sido-Kanhu',
    category: 'valour',
    culturalOriginNote: 'हूल क्रांति के महानायक चांद मुर्मु।'
  },
  {
    id: 'b13',
    nameDevanagari: 'भैरव',
    nameRoman: 'Bhairav',
    gender: 'boy',
    meaningHindi: 'निडर, पराक्रमी व अजेय योद्धा',
    meaningEnglish: 'Fearless warrior hero of the Santhal movement',
    category: 'valour',
    culturalOriginNote: 'सिदो, कान्हू, चांद, भैरव—चारों अमर सहोदर।'
  },
  {
    id: 'b14',
    nameDevanagari: 'सेंगेल',
    nameRoman: 'Sengel',
    gender: 'boy',
    meaningHindi: 'अग्नि, ऊर्जा, तेज व प्रकाश',
    meaningEnglish: 'Holy fire, blazing energy and illumination',
    category: 'virtue',
    culturalOriginNote: 'सेंगेल जीवन की चेतना और कभी न बुझने वाली ज्योति का प्रतीक है।'
  },
  {
    id: 'b15',
    nameDevanagari: 'दिशोम',
    nameRoman: 'Disom',
    gender: 'boy',
    meaningHindi: 'राष्ट्र, अपनी मातृभूमि व समाज',
    meaningEnglish: 'Homeland, native sovereign territory and realm',
    category: 'ancestral',
    culturalOriginNote: 'दिशोम मांझी और संताल दिशोम की अस्मिता का परिचायक।'
  },
  {
    id: 'b16',
    nameDevanagari: 'चांपाय',
    nameRoman: 'Champay',
    gender: 'boy',
    meaningHindi: 'चंपा गढ़ का राजकुमार, सुगंधित चम्पा पुष्प',
    meaningEnglish: 'Prince of historical Champa Garh, fragrant champak',
    category: 'ancestral',
    culturalOriginNote: 'हपड़ाम काल का समृद्ध संताली चम्पा गढ़।'
  },
  {
    id: 'b17',
    nameDevanagari: 'तिलका',
    nameRoman: 'Tilka',
    gender: 'boy',
    meaningHindi: 'बाबा तिलका मांझी, प्रथम भारतीय स्वाधीनता सेनानी',
    meaningEnglish: 'Baba Tilka Majhi, the foremost archer martyr (1785)',
    category: 'valour',
    culturalOriginNote: 'अंग्रेजी हुकूमत के विरुद्ध तीर उठाने वाले आदि-विद्रोही तिलका मांझी।'
  },
  {
    id: 'b18',
    nameDevanagari: 'लुगु',
    nameRoman: 'Lugu',
    gender: 'boy',
    meaningHindi: 'लुगु बाबा, संताली धर्म व न्याय के आदि-गुरु',
    meaningEnglish: 'Lugu Baba, primordial preceptor of Santali ethos and law',
    category: 'ancestral',
    culturalOriginNote: 'लुगुबुरु घांटाबाड़ी दरबार के अधिष्ठाता धर्मगुरु।'
  },
  {
    id: 'b19',
    nameDevanagari: 'माझी',
    nameRoman: 'Majhi',
    gender: 'boy',
    meaningHindi: 'ग्राम प्रधान, सामाजिक मार्गदर्शक व न्यायप्रिय',
    meaningEnglish: 'Village head, custodian of truth, order and ethics',
    category: 'ancestral',
    culturalOriginNote: 'संताली स्वशासन व्यवस्था के ग्राम प्रधान को माझी हड़ाम कहते हैं।'
  },
  {
    id: 'b20',
    nameDevanagari: 'सुफल',
    nameRoman: 'Sufal',
    gender: 'boy',
    meaningHindi: 'शुभ फल देने वाला, फलदायी व सदाचारी',
    meaningEnglish: 'Fruitful, blessed with virtue and success',
    category: 'virtue',
    culturalOriginNote: 'संतान के उज्ज्वल भविष्य की मंगलकामना का द्योतक।'
  },

  // Girls (कुड़ी गिद्रा)
  {
    id: 'g1',
    nameDevanagari: 'फुलमनी',
    nameRoman: 'Phulmoni',
    gender: 'girl',
    meaningHindi: 'पुष्प के समान कोमल और मणियों जैसी देदीप्यमान',
    meaningEnglish: 'Gentle as a blossom, radiant like a precious gem',
    category: 'nature',
    culturalOriginNote: 'संताली समाज में बालिकाओं का अत्यंत स्नेहिल व पारंपरिक नाम।'
  },
  {
    id: 'g2',
    nameDevanagari: 'फूलो',
    nameRoman: 'Phulo',
    gender: 'girl',
    meaningHindi: 'अमर वीरांगना, स्वाभिमान व शौर्य की प्रतिमूर्ति',
    meaningEnglish: 'Heroic warrior sister of Hul heroes, symbol of bravery',
    category: 'valour',
    culturalOriginNote: 'हूल क्रांति की अमर नायिका फूलो मुर्मु।'
  },
  {
    id: 'g3',
    nameDevanagari: 'झानो',
    nameRoman: 'Jhano',
    gender: 'girl',
    meaningHindi: 'साहसी, हूल वीरांगना, मातृभूमि रक्षक',
    meaningEnglish: 'Courageous warrior of Hul, defender of tribal land',
    category: 'valour',
    culturalOriginNote: 'अंग्रेजी छावनी में पराक्रम दिखाने वाली अमर वीरांगना झानो मुर्मु।'
  },
  {
    id: 'g4',
    nameDevanagari: 'सारजोमी',
    nameRoman: 'Sarjomi',
    gender: 'girl',
    meaningHindi: 'सखुआ (साल) के फूलों सी पावन और अटूट',
    meaningEnglish: 'Pure and enduring like the holy Sal blossom',
    category: 'nature',
    culturalOriginNote: 'सारजोम (साल वृक्ष) की कृपा और दीर्घायु की प्रतीक।'
  },
  {
    id: 'g5',
    nameDevanagari: 'मिरु',
    nameRoman: 'Miru',
    gender: 'girl',
    meaningHindi: 'सुरीली कोयल, मधुर वाणी बोलने वाली',
    meaningEnglish: 'Sweet cuckoo bird, melifluous voice of springtime',
    category: 'nature',
    culturalOriginNote: 'वनों में मधुर स्वर गुंजाने वाली सुंदर पक्षी मिरु।'
  },
  {
    id: 'g6',
    nameDevanagari: 'दुलार',
    nameRoman: 'Dular',
    gender: 'girl',
    meaningHindi: 'अगाध प्रेम, स्नेह, ममत्व व वात्सल्य',
    meaningEnglish: 'Unconditional love, affection and pure tenderness',
    category: 'virtue',
    culturalOriginNote: 'संताली में प्रेम व दुलार को सर्वोपरि मानवीय मूल्य माना गया है।'
  },
  {
    id: 'g7',
    nameDevanagari: 'सुगी',
    nameRoman: 'Sugi',
    gender: 'girl',
    meaningHindi: 'सुहावनी, भाग्यशाली व सुखद आगमन',
    meaningEnglish: 'Pleasing, graceful and bringing good tidings',
    category: 'virtue',
    culturalOriginNote: 'परिवार में सुख-समृद्धि लाने वाली पुत्री का पारम्परिक नाम।'
  },
  {
    id: 'g8',
    nameDevanagari: 'चांदमुनी',
    nameRoman: 'Chandmuni',
    gender: 'girl',
    meaningHindi: 'चंद्रमा सी शीतल, शांत व कांतिमान कन्या',
    meaningEnglish: 'Cool and lustrous like the soothing moon',
    category: 'nature',
    culturalOriginNote: 'चांदो (चंद्रमा) की शीतलता और शांति से उपमित।'
  },
  {
    id: 'g9',
    nameDevanagari: 'बाहामनी',
    nameRoman: 'Bahamoni',
    gender: 'girl',
    meaningHindi: 'बाहा पर्व की पुष्पमणि, सुगंध व उत्सव की खुशी',
    meaningEnglish: 'Gem of the Spring Baha festival, joyous blossom',
    category: 'festival_day',
    culturalOriginNote: 'वसंत ऋतु के बाहा पर्व में जन्मी सौभाग्यशाली पुत्री।'
  },
  {
    id: 'g10',
    nameDevanagari: 'करमी',
    nameRoman: 'Karmi',
    gender: 'girl',
    meaningHindi: 'करम पर्व में जन्मी, भाई की रक्षा करने वाली',
    meaningEnglish: 'Born during sacred Karam festival, faithful sister',
    category: 'festival_day',
    culturalOriginNote: 'भादो मास के करम पर्व के आशीर्वाद से प्राप्त कन्या।'
  },
  {
    id: 'g11',
    nameDevanagari: 'सुलोचना',
    nameRoman: 'Sulochana',
    gender: 'girl',
    meaningHindi: 'सुंदर व स्नेहिल नयनों वाली',
    meaningEnglish: 'Possessing lovely, observant and gentle eyes',
    category: 'virtue',
    culturalOriginNote: 'संताली लोकगीतों में वर्णित रूपसी कन्या का भाव।'
  },
  {
    id: 'g12',
    nameDevanagari: 'सोंको',
    nameRoman: 'Sonko',
    gender: 'girl',
    meaningHindi: 'शंख सी निष्पाप, पवित्र व मंगलध्वनि',
    meaningEnglish: 'Pure as a sacred conch, herald of auspicious times',
    category: 'virtue',
    culturalOriginNote: 'शुभ मांगलिक संस्कारों की प्रतीक।'
  },
  {
    id: 'g13',
    nameDevanagari: 'सोनोत',
    nameRoman: 'Sonot',
    gender: 'girl',
    meaningHindi: 'पवित्र, निष्कलंक, सत्यनिष्ठ व निर्मल',
    meaningEnglish: 'Sacred, truthful, pristine and pure-hearted',
    category: 'virtue',
    culturalOriginNote: 'संताली में सोनोत का अर्थ अत्यंत पावन व निष्कलंक होता है।'
  },
  {
    id: 'g14',
    nameDevanagari: 'मोंज',
    nameRoman: 'Monj',
    gender: 'girl',
    meaningHindi: 'सुंदर, सौम्य, मनभावन व आकर्षक',
    meaningEnglish: 'Beautiful, elegant, gracious and charming',
    category: 'virtue',
    culturalOriginNote: 'संताली में सुंदरता व सौम्यता को मोंज कहा जाता है।'
  },
  {
    id: 'g15',
    nameDevanagari: 'सुगड़ा',
    nameRoman: 'Sugda',
    gender: 'girl',
    meaningHindi: 'सजी-धजी, कुशल व कलावती',
    meaningEnglish: 'Artistic, neat, organized and well-mannered',
    category: 'virtue',
    culturalOriginNote: 'घर-आंगन को सोहराय कला से सजाने वाली सुघड़ कन्या।'
  },
  {
    id: 'g16',
    nameDevanagari: 'रासमनी',
    nameRoman: 'Rasmoni',
    gender: 'girl',
    meaningHindi: 'रसभरी, मधुर स्वभाव व कानों में रासा (झुमका) पहनने वाली',
    meaningEnglish: 'Sweet natured, adorned with traditional silver Rasa earrings',
    category: 'nature',
    culturalOriginNote: 'पारंपरिक आभूषण रासा और मधुर स्वभाव की द्योतक।'
  },
  {
    id: 'g17',
    nameDevanagari: 'लिलि',
    nameRoman: 'Lili',
    gender: 'girl',
    meaningHindi: 'नीले आकाश की निर्मलता, चंचल व प्रसन्नचित्त',
    meaningEnglish: 'Clear azure skies, joyful and light-hearted',
    category: 'nature',
    culturalOriginNote: 'संताली लोक-कथाओं में बालिकाओं का लाड़ला नाम।'
  },
  {
    id: 'g18',
    nameDevanagari: 'रुपनी',
    nameRoman: 'Rupani',
    gender: 'girl',
    meaningHindi: 'चांदी की भांति उज्ज्वल और सुशीला',
    meaningEnglish: 'Luminous like pure silver, gentle and modest',
    category: 'virtue',
    culturalOriginNote: 'चांदी के पारंपरिक गहनों की आभा जैसी सुंदर।'
  },
  {
    id: 'g19',
    nameDevanagari: 'सालोनी',
    nameRoman: 'Saloni',
    gender: 'girl',
    meaningHindi: 'शांत, मनोहर व सुहानी मुस्कान वाली',
    meaningEnglish: 'Charming, calm, possessing an enchanting smile',
    category: 'nature',
    culturalOriginNote: 'संताली लोकगीत में प्रकृति की शीतलता से उपमित।'
  },
  {
    id: 'g20',
    nameDevanagari: 'एरा',
    nameRoman: 'Era',
    gender: 'girl',
    meaningHindi: 'देवी स्वरूपा, जाहेर एरा का पावन आशीष',
    meaningEnglish: 'Goddess embodiment, blessed by Jaher Era',
    category: 'ancestral',
    culturalOriginNote: 'संताली कुलमाता जाहेर एरा के प्रति सर्वोच्च श्रद्धा।'
  }
];

export const SantaliBabyNamesDirectory: React.FC = () => {
  const [search, setSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState<'all' | 'boy' | 'girl'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('hk_baby_name_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showRulesModal, setShowRulesModal] = useState(false);

  const toggleFavorite = (id: string) => {
    const updated = favorites.includes(id)
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id];
    setFavorites(updated);
    try {
      localStorage.setItem('hk_baby_name_favorites', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  const handleSpeak = (text: string) => {
    speakWithFemaleVoice(text, { lang: 'hi-IN', rate: 0.85 });
  };

  const filteredNames = SANTALI_BABY_NAMES.filter((item) => {
    const matchesGender =
      genderFilter === 'all' ||
      item.gender === genderFilter ||
      item.gender === 'unisex';

    const matchesCategory =
      categoryFilter === 'all' || item.category === categoryFilter;

    const query = search.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.nameDevanagari.toLowerCase().includes(query) ||
      item.nameRoman.toLowerCase().includes(query) ||
      item.meaningHindi.toLowerCase().includes(query) ||
      item.meaningEnglish.toLowerCase().includes(query);

    return matchesGender && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Hero Header */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-900 via-orange-900 to-slate-900 text-white p-6 md:p-8 shadow-xl relative overflow-hidden border border-amber-500/30">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-bold uppercase tracking-wider">
            <Baby className="w-3.5 h-3.5" />
            <span>हापड़ाम कोवाक् ञुतुम दोहो नियम · Sacred Naming Tradition</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-amber-100 tracking-tight">
            संताली पारंपरिक नामकरण गाइड (Santali Baby Names)
          </h1>

          <p className="text-xs md:text-sm text-amber-200/90 leading-relaxed font-sans">
            संताली समाज में नामकरण केवल पहचान नहीं, बल्कि पूर्वजों (हपड़ाम), प्रकृति, पारिस (गोत्र) और पर्वों के प्रति सम्मान का प्रतीक है। जानिए शास्त्रीय नियम और 200+ मंगलकारी नाम।
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5">
            <button
              onClick={() => setShowRulesModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 font-black text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-slate-950" />
              <span>पारंपरिक नामकरण के 5 नियम देखें</span>
            </button>

            <div className="px-3 py-2 rounded-xl bg-white/10 text-amber-200 text-xs font-semibold flex items-center gap-1.5 border border-white/10">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>पसंदीदा नाम: {favorites.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="नाम खोजें (उदा: सागेन, कान्हू, फूलो, सोहराय...)"
              className="w-full pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 font-medium"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Gender Filter Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0 self-stretch md:self-auto justify-center">
            <button
              onClick={() => setGenderFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                genderFilter === 'all'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              सभी ({SANTALI_BABY_NAMES.length})
            </button>
            <button
              onClick={() => setGenderFilter('boy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                genderFilter === 'boy'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>👦 लड़के (कोड़ा)</span>
            </button>
            <button
              onClick={() => setGenderFilter('girl')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                genderFilter === 'girl'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>👧 लड़कियां (कुड़ी)</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-semibold text-[11px] shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>श्रेणी:</span>
          </span>
          {[
            { id: 'all', label: 'सभी श्रेणियां' },
            { id: 'nature', label: '🌿 प्रकृति व वन (Nature)' },
            { id: 'ancestral', label: '🏛️ पूर्वज व कुल (Ancestral)' },
            { id: 'valour', label: '🏹 हूल वीर व पराक्रम (Valour)' },
            { id: 'festival_day', label: '🌾 पर्व व जन्म दिन (Festival/Day)' },
            { id: 'virtue', label: '✨ सद्गुण व मंगल (Virtue)' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-2.5 py-1 rounded-lg shrink-0 font-medium transition-colors ${
                categoryFilter === cat.id
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Names Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNames.map((item) => {
          const isFav = favorites.includes(item.id);
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-md transition-all space-y-3 relative group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                        item.gender === 'boy'
                          ? 'bg-blue-100 text-blue-800'
                          : item.gender === 'girl'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.gender === 'boy' ? '👦 कोड़ा (Boy)' : item.gender === 'girl' ? '👧 कुड़ी (Girl)' : '🌱 Unisex'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-medium">
                      {item.nameRoman}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mt-1 flex items-center gap-2">
                    <span>{item.nameDevanagari}</span>
                  </h3>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleSpeak(`${item.nameDevanagari}. अर्थ: ${item.meaningHindi}`)}
                    className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 transition-colors cursor-pointer"
                    title="महिला स्वर में नाम व अर्थ सुनें"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isFav
                        ? 'bg-rose-50 text-rose-600'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700'
                    }`}
                    title={isFav ? 'पसंदीदा से हटाएं' : 'पसंदीदा में जोड़ें'}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Hindi & English Meaning */}
              <div className="space-y-1 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/60">
                <p className="text-xs font-bold text-amber-950">
                  <span className="text-amber-700">अर्थ:</span> {item.meaningHindi}
                </p>
                <p className="text-[11px] text-slate-600 italic">
                  {item.meaningEnglish}
                </p>
              </div>

              {/* Cultural Context Note */}
              <p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-100 pt-2">
                <span className="font-semibold text-slate-700">सांस्कृतिक महत्व: </span>
                {item.culturalOriginNote}
              </p>
            </div>
          );
        })}
      </div>

      {filteredNames.length === 0 && (
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
          <p className="text-sm font-bold text-slate-600">कोई नाम नहीं मिला।</p>
          <p className="text-xs text-slate-400 mt-1">कृपया दूसरा शब्द खोजें या फ़िल्टर बदलें।</p>
        </div>
      )}

      {/* Traditional Naming Rules Modal */}
      {showRulesModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-amber-300">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-black text-slate-900">
                  संताली पारंपरिक नामकरण के 5 शास्त्रीय नियम (ञुतुम दोहो नियम)
                </h3>
              </div>
              <button
                onClick={() => setShowRulesModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-700">
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <h4 className="font-bold text-amber-900">1. प्रथम संतान का नियम (First Born Child)</h4>
                <p className="mt-0.5">
                  • <b>प्रथम पुत्र (First Son):</b> पिता के पिता यानी <b>दादाजी (Father's Father)</b> के नाम पर नाम रखा जाता है।<br />
                  • <b>प्रथम पुत्री (First Daughter):</b> पिता की माता यानी <b>दादीजी (Father's Mother)</b> के नाम पर नाम रखा जाता है।
                </p>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                <h4 className="font-bold text-blue-900">2. द्वितीय संतान का नियम (Second Child)</h4>
                <p className="mt-0.5">
                  • <b>द्वितीय पुत्र:</b> माता के पिता यानी <b>नानाजी (Mother's Father)</b> के नाम पर।<br />
                  • <b>द्वितीय पुत्री:</b> माता की माता यानी <b>नानीजी (Mother's Mother)</b> के नाम पर।
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <h4 className="font-bold text-emerald-900">3. तृतीय संतान का नियम (Third Child)</h4>
                <p className="mt-0.5">
                  • <b>तृतीय पुत्र:</b> पिता के बड़े/छोटे भाई (चाचा/ताऊ)।<br />
                  • <b>तृतीय पुत्री:</b> पिता की बहन (बुआ / हाथी) के नाम पर।
                </p>
              </div>

              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
                <h4 className="font-bold text-purple-900">4. जन्म-दिवस व वार आधारित नाम (Day of Birth)</h4>
                <p className="mt-0.5">
                  सोमवार को जन्मा बालक <b>सोंभाय</b>, बुधवार को <b>बुधु / बुधिन</b>, गुरुवार को <b>बिरसा / बिरसी</b>, रविवार को <b>रवि / रूबई</b>।
                </p>
              </div>

              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                <h4 className="font-bold text-rose-900">5. पर्व व प्रकृति आधारित नाम (Festivals & Nature)</h4>
                <p className="mt-0.5">
                  सोहराय में जन्मा <b>सोहराय / सोहरी</b>, करम पर्व में <b>करमू / करमी</b>, बाहा पर्व में <b>बाहा / बाहामनी</b>।
                </p>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setShowRulesModal(false)}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs"
              >
                समझ आ गया (Got it)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
