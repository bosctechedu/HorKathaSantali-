import React, { useState } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  MessageSquare,
  Search,
  Volume2,
  Sparkles,
  Bookmark,
  CheckCircle2,
  Filter,
  Lightbulb,
  Heart,
  HelpCircle
} from 'lucide-react';

interface IdiomItem {
  id: string;
  idiomDevanagari: string;
  idiomRoman: string;
  literalMeaningHindi: string;
  figurativeMeaningHindi: string;
  meaningEnglish: string;
  usageContext: string;
  exampleSentenceDev: string;
  exampleSentenceHindi: string;
  category: 'wisdom' | 'relations' | 'character' | 'anger_emotion' | 'work_diligence';
  categoryHindi: string;
}

const SANTALI_IDIOMS: IdiomItem[] = [
  {
    id: 'm1',
    idiomDevanagari: 'ति रे दाक् बांय अतुक्',
    idiomRoman: 'Ti re dah bang atuh',
    literalMeaningHindi: 'हाथ पर पानी गिराने पर भी नीचे न टपकना',
    figurativeMeaningHindi: 'अत्यधिक कंजूस होना, चमड़ी जाए पर दमड़ी न जाए',
    meaningEnglish: 'Utterly stingy, someone from whose hands even water does not slip',
    usageContext: 'जब कोई धनवान व्यक्ति भी किसी जरूरतमंद को एक पाई न दे।',
    exampleSentenceDev: 'उनि हड़ाम दो ति रे दाक् बांय अतुक् लेकानिच् कानाय।',
    exampleSentenceHindi: 'वह बूढ़ा इतना कंजूस है कि हाथ से पानी तक नहीं टपकता।',
    category: 'character',
    categoryHindi: 'स्वभाव व चरित्र'
  },
  {
    id: 'm2',
    idiomDevanagari: 'मेद् रे धूड़ा उडौ',
    idiomRoman: 'Med re dhuda udau',
    literalMeaningHindi: 'आँखों में धूल उड़ाना',
    figurativeMeaningHindi: 'धोखा देना, ठगना या आंखों के सामने कपट करना',
    meaningEnglish: 'To throw dust in eyes, to deceive or hoodwink someone',
    usageContext: 'व्यापार या बात-व्यवहार में किसी को छलने पर।',
    exampleSentenceDev: 'आतो होड़ कोवाक् मेद् रे धूड़ा आलोम उडौया।',
    exampleSentenceHindi: 'गांव वालों की आंखों में धूल मत झोंको।',
    category: 'character',
    categoryHindi: 'स्वभाव व चरित्र'
  },
  {
    id: 'm3',
    idiomDevanagari: 'लुतुर रे हासा बोलोर',
    idiomRoman: 'Lutur re hasa bolor',
    literalMeaningHindi: 'कान में मिट्टी घुस जाना',
    figurativeMeaningHindi: 'जानबूझकर अनसुना कर देना, किसी की अच्छी बात पर ध्यान न देना',
    meaningEnglish: 'Soil entering the ear; turning a deaf ear deliberately',
    usageContext: 'जब बच्चे या कोई व्यक्ति बार-बार समझाने पर भी बात न सुने।',
    exampleSentenceDev: 'चेद् आमाक् लुतुर रे हासा बोलोरेना? इञाक् काथा अंजोम मे!',
    exampleSentenceHindi: 'क्या तुम्हारे कान में मिट्टी भर गई है? मेरी बात सुनो!',
    category: 'character',
    categoryHindi: 'स्वभाव व चरित्र'
  },
  {
    id: 'm4',
    idiomDevanagari: 'बोहोक् रे सेंगेल जोलोक्',
    idiomRoman: 'Bohok re sengel joloh',
    literalMeaningHindi: 'सिर पर आग जलना',
    figurativeMeaningHindi: 'अत्यधिक क्रोधित होना, गुस्से से आग-बबूला हो जाना',
    meaningEnglish: 'Fire blazing on the head; furious anger',
    usageContext: 'जब कोई व्यक्ति बहुत उग्र और गुस्से में आ जाए।',
    exampleSentenceDev: 'उनि दो एद्रे ते बोहोक् रे सेंगेल जोलोक् कान् ताया।',
    exampleSentenceHindi: 'गुस्से के कारण उसके सिर पर जैसे आग जल रही है।',
    category: 'anger_emotion',
    categoryHindi: 'क्रोध व भावनाएं'
  },
  {
    id: 'm5',
    idiomDevanagari: 'उमुल लेका पांजा',
    idiomRoman: 'Umul leka panja',
    literalMeaningHindi: 'परछाई की तरह पीछे-पीछे चलना',
    figurativeMeaningHindi: 'अटूट मित्रता निभाना, हर परिस्थिति में साथ खड़े रहना',
    meaningEnglish: 'Following like a shadow; faithful, loyal friendship through thick and thin',
    usageContext: 'सच्चे मित्रों और वफादार साथियों के लिए प्रयुक्त।',
    exampleSentenceDev: 'मित् गाते दो उमुल लेका सांव रे ताहेंनाय।',
    exampleSentenceHindi: 'एक सच्चा मित्र हमेशा परछाई की तरह साथ रहता है।',
    category: 'relations',
    categoryHindi: 'रिश्ते व मित्रता'
  },
  {
    id: 'm6',
    idiomDevanagari: 'दाका रे चेटे',
    idiomRoman: 'Daka re chete',
    literalMeaningHindi: 'परोसी हुई थाली के भात पर आकाशीय बिजली गिरना',
    figurativeMeaningHindi: 'अचानक और अप्रत्याशित विपत्ति या संकट आ पड़ना',
    meaningEnglish: 'Lightning striking on cooked rice; an unexpected catastrophic misfortune',
    usageContext: 'जब सब कुछ अच्छा चल रहा हो और अचानक कोई बड़ा संकट आ जाए।',
    exampleSentenceDev: 'रंगीन दिन रे दाका रे चेटे लेका दुख हेजेना।',
    exampleSentenceHindi: 'हंसते-खेलते दिनों में अचानक भात पर बिजली गिरने जैसा दुख आ गया।',
    category: 'wisdom',
    categoryHindi: 'दार्शनिक ज्ञान'
  },
  {
    id: 'm7',
    idiomDevanagari: 'डांगरा लेका खुरुप',
    idiomRoman: 'Dangra leka khurup',
    literalMeaningHindi: 'बैल की तरह अनवरत खटना',
    figurativeMeaningHindi: 'अथक परिश्रम करना, दिन-रात पसीना बहाना',
    meaningEnglish: 'Toiling like an ox; relentless industrious hard work',
    usageContext: 'परिश्रमी किसानों और मेहनती युवाओं की प्रशंसा में।',
    exampleSentenceDev: 'उनि कोड़ा दो खेत रे डांगरा लेका खुरुप एदाय।',
    exampleSentenceHindi: 'वह युवक खेत में बैल की तरह पसीना बहाकर मेहनत करता है।',
    category: 'work_diligence',
    categoryHindi: 'परिश्रम व कर्म'
  },
  {
    id: 'm8',
    idiomDevanagari: 'सारजोम लेका दारे',
    idiomRoman: 'Sarjom leka dare',
    literalMeaningHindi: 'साल (सखुआ) के विशाल वृक्ष की तरह अडिग रहना',
    figurativeMeaningHindi: 'संकट में भी स्थिर, दृढ़ और निष्कलंक बने रहना',
    meaningEnglish: 'Standing firm like a sacred Sal tree; unshakable resilience',
    usageContext: 'किसी साहसी और धैर्यवान व्यक्ति के सम्मान में।',
    exampleSentenceDev: 'विपत्ति रे हों सारजोम लेका दारे कते तिंगु मे।',
    exampleSentenceHindi: 'विपत्ति के समय भी साल वृक्ष की भांति अडिग खड़े रहो।',
    category: 'wisdom',
    categoryHindi: 'दार्शनिक ज्ञान'
  },
  {
    id: 'm9',
    idiomDevanagari: 'मिरु लेका रोर',
    idiomRoman: 'Miru leka ror',
    literalMeaningHindi: 'कोयल की तरह मधुर वाणी बोलना',
    figurativeMeaningHindi: 'मीठी और मनमोहक बोली बोलना, सबको प्रसन्न करना',
    meaningEnglish: 'Speaking sweet words like a cuckoo; courteous and pleasing speech',
    usageContext: 'शिष्ट और आदरपूर्वक बोलने वाले व्यक्ति के लिए।',
    exampleSentenceDev: 'उनि कुड़ी गिद्रा दो मिरु लेका रोड़ा।',
    exampleSentenceHindi: 'वह बालिका कोयल की भांति मीठी बोली बोलती है।',
    category: 'character',
    categoryHindi: 'स्वभाव व चरित्र'
  },
  {
    id: 'm10',
    idiomDevanagari: 'अखड़ा रे तुमदाक बांय रुय',
    idiomRoman: 'Akhra re tumdah bang ruy',
    literalMeaningHindi: 'अखड़े में मांदर न बजना',
    figurativeMeaningHindi: 'गांव में शोक या सन्नाटा छा जाना, उल्लास का समाप्त होना',
    meaningEnglish: 'The Tumdak drum falling silent in the Akhra; solemn grief or lull in village',
    usageContext: 'जब किसी अनहोनी या विपत्ति के कारण गांव में उदासी छा जाए।',
    exampleSentenceDev: 'आतो रे दुख हेचेना, अखड़ा रे तुमदाक बांय रुय कान।',
    exampleSentenceHindi: 'गांव में दुख आ गया है, अखड़े में मांदर का स्वर थम गया है।',
    category: 'relations',
    categoryHindi: 'रिश्ते व सामाजिक स्थिति'
  },
  {
    id: 'm11',
    idiomDevanagari: 'तांगा लेका चोका',
    idiomRoman: 'Tanga leka choka',
    literalMeaningHindi: 'कुल्हाड़ी की धार जैसा तीक्ष्ण होना',
    figurativeMeaningHindi: 'सत्य और खरी बात मुंह पर कहना, कोई लाग-लपेट न रखना',
    meaningEnglish: 'Sharp like an axe; candid, blunt and speaking straightforward truth',
    usageContext: 'स्पष्टवादी और न्यायप्रिय व्यक्ति के स्वभाव के लिए।',
    exampleSentenceDev: 'मांझी हड़ाम दो तांगा लेका चोका काथा रपड़ा।',
    exampleSentenceHindi: 'माझी हड़ाम कुल्हाड़ी की धार जैसी खरी और सच्ची बात कहते हैं।',
    category: 'wisdom',
    categoryHindi: 'दार्शनिक ज्ञान'
  },
  {
    id: 'm12',
    idiomDevanagari: 'जाहेर थान रे किरिया',
    idiomRoman: 'Jaher Than re kiriya',
    literalMeaningHindi: 'पवित्र जाहेर थान में सौगंध खाना',
    figurativeMeaningHindi: 'अकाट्य सत्य की शपथ लेना, जिसे कभी तोड़ा न जा सके',
    meaningEnglish: 'An inviolable oath taken at the sacred Jaher Than grove',
    usageContext: 'जब कोई निर्णय सर्वोच्च नैतिक स्तर पर पक्का किया जाए।',
    exampleSentenceDev: 'आले दो जाहेर थान रे किरिया ले हाताव आकादा।',
    exampleSentenceHindi: 'हमने जाहेर थान में सत्य और निष्ठा की सौगंध ली है।',
    category: 'wisdom',
    categoryHindi: 'दार्शनिक ज्ञान'
  }
];

export const SantaliIdiomsMenkatha: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('hk_menkatha_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (id: string) => {
    const updated = favorites.includes(id)
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id];
    setFavorites(updated);
    try {
      localStorage.setItem('hk_menkatha_favorites', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  const handleSpeak = (text: string) => {
    speakWithFemaleVoice(text, { lang: 'hi-IN', rate: 0.88 });
  };

  const filteredIdioms = SANTALI_IDIOMS.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const query = search.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.idiomDevanagari.toLowerCase().includes(query) ||
      item.idiomRoman.toLowerCase().includes(query) ||
      item.figurativeMeaningHindi.toLowerCase().includes(query) ||
      item.literalMeaningHindi.toLowerCase().includes(query);

    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-white p-6 md:p-8 shadow-xl relative overflow-hidden border border-amber-600/30">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>हपड़ाम कोवाक् मेनकाथा व भेंता काथा · Santali Idioms & Proverbs</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-amber-100 tracking-tight">
            संताली मुहावरे, लोकोक्तियां व भेंता काथा (Santali Idioms & Sayings)
          </h1>

          <p className="text-xs md:text-sm text-amber-200/90 leading-relaxed font-sans">
            संताली भाषा के लाक्षणिक मुहावरे (मेनकाथा)—जिनमें प्रकृति, पशु-पक्षी, कृषि और पूर्वजों के गहरे जीवन दर्शन का रस समाया है। शाब्दिक अर्थ, भावार्थ और दैनिक प्रयोग के साथ।
          </p>

          <div className="flex items-center gap-3 pt-1 text-xs text-amber-300">
            <span className="flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>12+ अमर संताली मुहावरे</span>
            </span>
            <span>•</span>
            <span>शाब्दिक अर्थ व सटीक उदाहरण वाक्य</span>
          </div>
        </div>
      </div>

      {/* Search & Categories Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="मुहावरा या अर्थ खोजें (उदा: कंजूस, ति रे दाक्, सेंगेल, धूड़ा...)"
              className="w-full pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 shrink-0">
            <Bookmark className="w-4 h-4 text-amber-600" />
            <span>सहेजे गए: {favorites.length}</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-semibold text-[11px] shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>विषय:</span>
          </span>
          {[
            { id: 'all', label: 'सभी मुहावरे' },
            { id: 'wisdom', label: '📜 दार्शनिक ज्ञान (Wisdom)' },
            { id: 'character', label: '👤 स्वभाव व चरित्र (Character)' },
            { id: 'relations', label: '🤝 रिश्ते व मित्रता (Relations)' },
            { id: 'work_diligence', label: '🌾 परिश्रम व कर्म (Work)' },
            { id: 'anger_emotion', label: '🔥 क्रोध व भावनाएं (Emotion)' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg shrink-0 font-medium transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Idioms List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredIdioms.map((item) => {
          const isFav = favorites.includes(item.id);
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all space-y-3.5 relative group"
            >
              {/* Header: Idiom & Actions */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                    {item.categoryHindi}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-1.5 flex items-center gap-2">
                    <span>{item.idiomDevanagari}</span>
                  </h3>
                  <p className="text-xs text-amber-700 font-mono font-semibold">
                    "{item.idiomRoman}"
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleSpeak(`${item.idiomDevanagari}. भावार्थ: ${item.figurativeMeaningHindi}. वाक्य: ${item.exampleSentenceDev}`)}
                    className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 transition-colors cursor-pointer"
                    title="महिला स्वर में सुनें"
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
                    title={isFav ? 'सहेजे से हटाएं' : 'सहेजें'}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Figurative Meaning (भावार्थ) */}
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                  लाक्षणिक भावार्थ (Idiomatic Meaning):
                </span>
                <p className="text-xs font-black text-amber-950">
                  {item.figurativeMeaningHindi}
                </p>
                <p className="text-[11px] text-slate-600 italic">
                  {item.meaningEnglish}
                </p>
              </div>

              {/* Literal Meaning */}
              <div className="text-xs text-slate-600 space-y-0.5">
                <span className="font-semibold text-slate-700">शाब्दिक अर्थ: </span>
                <span>{item.literalMeaningHindi}</span>
              </div>

              {/* Example Sentence */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  <span>दैनिक बोलचाल में प्रयोग:</span>
                </div>
                <p className="font-serif text-slate-900 font-medium">
                  "{item.exampleSentenceDev}"
                </p>
                <p className="text-[11px] text-slate-500">
                  ({item.exampleSentenceHindi})
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
