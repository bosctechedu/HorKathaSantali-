import React, { useState } from 'react';
import {
  Heart,
  Volume2,
  Sparkles,
  CheckCircle,
  Copy,
  Check,
  Send,
  Calendar,
  Layers,
  BookOpen,
  Info,
  Gift
} from 'lucide-react';
import { speakWithFemaleVoice } from '../utils/speech';

export interface BaplaRitual {
  id: string;
  titleDev: string;
  titleRoman: string;
  stageNameHindi: string;
  tag: string;
  sacredItems: string[];
  ritualSignificance: string;
  chants: {
    devanagari: string;
    roman: string;
    hindi: string;
  }[];
}

export const BAPLA_RITUALS: BaplaRitual[] = [
  {
    id: 'duar_sakam',
    titleDev: 'दुआर साकाम (मंडप तोरण बंधन)',
    titleRoman: 'Duar Sakam',
    stageNameHindi: 'विवाह मंडप की स्थापना व साल-पत्ता तोरण',
    tag: 'प्रथम चरण • मंडप प्रतिष्ठा',
    sacredItems: [
      'सारजोम साकाम (ताजे साल/सखुआ के पत्ते)',
      'मातकोम दार (महुआ वृक्ष की हरी टहनी)',
      'कांचा सुताम (कच्चा सूत धागा)',
      'सासांग दाक् (हल्दी का पवित्र जल)'
    ],
    ritualSignificance:
      'विवाह से पूर्व कन्या और वर के घरों के मुख्य द्वार पर साल के हरे पत्तों और महुआ की डाल से तोरण (चामड़ा) बनाया जाता है। यह प्रकृति और मारांग बुरु की छत्रछाया का प्रतीक है।',
    chants: [
      {
        devanagari: 'सारजोम साकाम् साजाव काते दुआर बोन तोल केदा,',
        roman: 'Sarjom sakam sajaw kate duar bon tol keda,',
        hindi: 'साल के पवित्र पत्तों को सजाकर हमने मुख्य द्वार पर तोरण बांधा है,'
      },
      {
        devanagari: 'मातकोम दार रेयाक उमुल रे सागुन बापला होयोगा,',
        roman: 'Matkom dar reyak umul re sagun bapla hoyoga,',
        hindi: 'महुआ वृक्ष की शीतल छाया में यह पावन वैवाहिक संस्कार संपन्न होगा,'
      },
      {
        devanagari: 'जाहेर एरा थुम एम आबेन मा गाते!',
        roman: 'Jaher Era thum em aben ma gate!',
        hindi: 'जाहेर एरा देवी माता आप दोनों नवदंपति को अखंड सौभाग्य का वरदान दें!'
      }
    ]
  },
  {
    id: 'dak_baper',
    titleDev: 'दाक् बापेर (पवित्र जल अनुष्ठान व स्नान)',
    titleRoman: 'Dak Baper',
    stageNameHindi: 'मंगल कलश यात्रा व वर-वधू का हल्दी स्नान',
    tag: 'द्वितीय चरण • शुद्धि संस्कार',
    sacredItems: [
      'नावा टुकुच (नया मिट्टी का कलश)',
      'घास आर चोउले (दूर्वा घास व अक्षत)',
      'कांसा थाली आर सासांग (हल्दी का लेप)',
      'आम्रपल्लव व पवित्र नदी जल'
    ],
    ritualSignificance:
      'गांव की महिलाएं और सखियां गाते-बजाते नदी या पवित्र कुएं से जल लाने जाती हैं (दाक् आगु)। उस जल से वर और वधू को हल्दी लगाकर पावन स्नान कराया जाता है।',
    chants: [
      {
        devanagari: 'गाडा दाक् आगु ते कुड़ी को चालावना रे,',
        roman: 'Gada dak agu te kuri ko chalawna re,',
        hindi: 'पवित्र नदी से जल लाने के लिए कन्याएं मंगल गीत गाते हुए प्रस्थान कर चुकी हैं,'
      },
      {
        devanagari: 'सासांग सुनुम ओजोक् काते दाक् बोन दुलाया,',
        roman: 'Sasang sunum ojok kate dak bon dulaya,',
        hindi: 'हल्दी और तेल का उबटन लगाकर हम पवित्र जल से स्नान कराएंगे,'
      },
      {
        devanagari: 'काया-मोने साफा काते नावा जियान साजाव मा।',
        roman: 'Kaya-mone sapha kate nawa jiyan sajaw ma.',
        hindi: 'तन और मन की शुद्धि के साथ नव-जीवन का शुभारंभ हो।'
      }
    ]
  },
  {
    id: 'daram_johar',
    titleDev: 'दाराम जोहार (समधी मिलन व बारात अगवानी)',
    titleRoman: 'Daram Johar',
    stageNameHindi: 'गांव की सीमा पर बारात का सत्कार व चरण प्रक्षालन',
    tag: 'तृतीय चरण • बारात अगवानी',
    sacredItems: [
      'कांसा थाली रे दाक् (कांसे की थाली में स्वच्छ जल)',
      'सुताम गमछा व सिंदूर',
      'हड़िया (तपान दाक् - सत्कार पेय)',
      'तुमाक-तामाक व तिरयो'
    ],
    ritualSignificance:
      'जब बारात (बरियात) गांव की कुलही में पहुंचती है, तो कन्या पक्ष के मांझी हाड़ाम और महिलाएं थाली में जल लेकर वर और समधियों के चरण धोती हैं और गोड जोहार करती हैं।',
    chants: [
      {
        devanagari: 'बरियात को सेटेरेना कुलही मुचात् रे,',
        roman: 'Bariyat ko seterena kulhi muchat re,',
        hindi: 'गांव की कुलही के छोर पर सम्मानीय बारात का शुभ आगमन हो चुका है,'
      },
      {
        devanagari: 'कांसा थाली दाक् ते काटा बोन आड़ुब कोवा,',
        roman: 'Kansa thali dak te kata bon arub kowa,',
        hindi: 'कांसे की थाली के पावन जल से हम अतिथियों के चरण प्रक्षालन करेंगे,'
      },
      {
        devanagari: 'गोड जोहार काते घारोज रेबो दाराम कोवा।',
        roman: 'God johar kate gharoj rebo daram kowa.',
        hindi: 'सादर गोड जोहार के साथ हम उन्हें अपने घर-आंगन में सादर प्रवेश कराएंगे।'
      }
    ]
  },
  {
    id: 'sindur_dan',
    titleDev: 'सुनी-सागुन सिंदूर दान (सर्वोच्च विवाह संकल्प)',
    titleRoman: 'Suni-Sagun Sindur Dan',
    stageNameHindi: 'दौरा में सिंदूर दान व आजीवन दांपत्य प्रतिज्ञा',
    tag: 'चतुर्थ चरण • सर्वोच्च संकल्प',
    sacredItems: [
      'बांस दौरा (बांस की नई टोकरी जिसमें वधू बैठती है)',
      'सिंदूर (पवित्र लाल सिंदूर)',
      'पीला पांची वस्त्र (कन्या परिधान)',
      'कांचा सुताम गांठ (वर-वधू गठबंधन)'
    ],
    ritualSignificance:
      'संताली विवाह का सबसे गरिमामय पल। वर को जीजा या भाई कंधे पर उठाते हैं और वधू बांस के दौरा में बैठी होती है। वर तीन बार वधू की मांग में सिंदूर अर्पित करता है। दोनों आजीवन साथी बनते हैं।',
    chants: [
      {
        devanagari: 'दौरा चेतान रे कुड़ी दो दुड़ुप आकाना,',
        roman: 'Daura chetan re kuri do durup akana,',
        hindi: 'बांस के सुंदर दौरा में सजी-धजी वधू विराजमान है,'
      },
      {
        devanagari: 'कोड़ा दो सिंदूर ते सींत बोन सिंदूराया,',
        roman: 'Korda do sindur te sint bon sinduraya,',
        hindi: 'वर पक्ष की ओर से तीन बार पावन सिंदूर से मांग भरी जा रही है,'
      },
      {
        devanagari: 'जियान भोर सुख-दुख रे अबेन मिद् सांवते ताहेन बेन! सागुन बापला!',
        roman: 'Jiyan bhor sukh-dukh re aben mid sanwte tahen ben! Sagun Bapla!',
        hindi: 'जीवन भर सुख और दुख में आप दोनों एक दूजे के संग रहें! विवाह की हार्दिक बधाई!'
      }
    ]
  },
  {
    id: 'basi_biyat',
    titleDev: 'बासी बियात व बिदाई (अश्रुपूर्ण कन्या विदाई)',
    titleRoman: 'Basi Biyat ar Bidai',
    stageNameHindi: 'माता-पिता का आशीर्वाद व नए घर को विदाई',
    tag: 'पंचम चरण • कन्या विदाई',
    sacredItems: [
      'होड़ो पोटली (आंचल में दिया जाने वाला आशीर्वाद धान)',
      'कांसा लोटा',
      'पालकी या पारंपरिक डोली'
    ],
    ritualSignificance:
      'विदाई का करुण पल। माता अपनी बेटी के आंचल में धान बांधकर ससुराल में कुल का मान बढ़ाने का आशीष देती है। सखियां करुण विदाई गीत गाती हैं।',
    chants: [
      {
        devanagari: 'आयो वाक कोराम् खोन बेटी दो ओड़ोकोक काना,',
        roman: 'Ayo wak koram khon beti do orokok kana,',
        hindi: 'माता के स्नेहमय हृदय से आज लाडली बेटी विदा हो रही है,'
      },
      {
        devanagari: 'मेत् दाक् जोर्रोक काना गाते कोवाक रे,',
        roman: 'Met dak jorrok kana gate kowak re,',
        hindi: 'सखियों और परिजनों की आंखों से अश्रुधारा बह रही है,'
      },
      {
        devanagari: 'नावा ओड़ाक रे बेटी सुख ते ताहेन मे! मारांग बुरु थुम एमामाय!',
        roman: 'Nawa orak re beti sukh te tahen me! Marang Buru thum emamay!',
        hindi: 'ससुराल के नए घर में हे बेटी! सदा सुखी और समृद्ध रहना, ईश्वर का आशीष सदा साथ रहे!'
      }
    ]
  }
];

export const SantaliBaplaChantsStudio: React.FC = () => {
  const [selectedRitual, setSelectedRitual] = useState<BaplaRitual>(BAPLA_RITUALS[0]);
  const [activeLineIdx, setActiveLineIdx] = useState<number>(0);

  // Blessing Generator State
  const [groomName, setGroomName] = useState<string>('सिदो मुर्मू');
  const [brideName, setBrideName] = useState<string>('चंपावती हेम्ब्रम');
  const [blessingCopied, setBlessingCopied] = useState<boolean>(false);

  const fullBlessingText = `🌺 *सागुन बापला मंगलकामना (Santali Wedding Blessing)* 🌺\n\nवर: *${groomName}*\nवधू: *${brideName}*\n\n"जियान भोर सुख-दुख रे अबेन मिद् सांवते ताहेन बेन!\nमारांग बुरु आर जाहेर एरा वाक थुम अबेन सांवते ताहेन् मा!"\n\n(ईश्वर नवदंपति को आजीवन सुख, शांति और समृद्धि प्रदान करें।)\n— सादर सप्रेम जोहार!`;

  const handleCopyBlessing = () => {
    navigator.clipboard?.writeText(fullBlessingText).catch(() => {});
    setBlessingCopied(true);
    setTimeout(() => setBlessingCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullBlessingText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-950 via-pink-950 to-stone-900 text-white p-6 sm:p-8 border border-rose-800/40 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/20 text-rose-300 rounded-lg text-xs font-bold border border-rose-500/30">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <span>सागुन बापला सेरेञ अखाड़ा — पारंपरिक संताली विवाह संस्कार</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              संताली विवाह (बापला) गीत व संपूर्ण नेग-दस्तूर अखाड़ा
            </h1>
            <p className="text-rose-200/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              मंडप तोरण (दुआर साकाम), मंगल स्नान (दाक् बापेर), बारात अगवानी, सिंदूर दान व बासी बियात बिदाई के पवित्र नेग-दस्तूर, आवश्यक सामग्री व अमर लोकगीत पद।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-900/90 border border-white/10 shrink-0 text-xs space-y-1 sm:w-60">
            <span className="font-bold text-rose-300 block">७ पारंपरिक विवाह रूप:</span>
            <span className="text-[11px] text-stone-300 leading-snug block">
              गोलाईत बापला, सांगा बापला, दुआर इटुत, राजा-राजी बापला व किरिंग बापला।
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid: Left Rituals List + Right Ritual Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Ritual Stages (4 Cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="text-xs font-bold text-slate-500 px-1 mb-1">
            विवाह संस्कार के प्रमुख चरण:
          </div>
          {BAPLA_RITUALS.map((ritual) => {
            const isSelected = selectedRitual.id === ritual.id;
            return (
              <button
                key={ritual.id}
                onClick={() => {
                  setSelectedRitual(ritual);
                  setActiveLineIdx(0);
                  speakWithFemaleVoice(ritual.titleDev);
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-rose-500/10 border-rose-500 ring-2 ring-rose-400/30 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                  {ritual.tag.split('•')[0]}
                </span>
                <h3 className="font-extrabold text-sm text-slate-900 mt-1.5">
                  {ritual.titleDev}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  {ritual.stageNameHindi}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right Column: Deep Ritual Chants & Protocol (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1">
              <span className="text-xs font-bold text-rose-800 bg-rose-50 px-3 py-1 rounded-xl border border-rose-200">
                {selectedRitual.tag}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                {selectedRitual.titleDev}
              </h2>
              <div className="text-xs font-mono text-slate-500">
                रोमन: {selectedRitual.titleRoman}
              </div>
            </div>

            <button
              onClick={() => speakWithFemaleVoice(selectedRitual.titleDev)}
              className="p-3 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 transition-colors shrink-0 cursor-pointer"
              title="रस्म का नाम सुनें"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* Ritual Significance */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <strong className="text-slate-900 block mb-1">नेग-दस्तूर का पारंपरिक महत्व:</strong>
            {selectedRitual.ritualSignificance}
          </div>

          {/* Sacred Items Checklist */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>इस रस्म की अनिवार्य पावन सामग्री (Sacred Items):</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedRitual.sacredItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs text-amber-950 flex items-center gap-2"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chants / Lyrics Line-by-Line Highlight */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>पारंपरिक वैवाहिक लोकगीत पद (Bapla Sereng Chants):</span>
              <span>पंक्ति पर क्लिक कर गायन सुनें</span>
            </div>

            {selectedRitual.chants.map((chant, idx) => {
              const isSelected = activeLineIdx === idx;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveLineIdx(idx);
                    speakWithFemaleVoice(chant.devanagari);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-rose-50/70 border-rose-400 ring-2 ring-rose-400/30 shadow-xs'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1">
                      <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                        {chant.devanagari}
                      </p>
                      <p className="text-xs sm:text-sm font-mono text-rose-900 font-semibold">
                        {chant.roman}
                      </p>
                      <p className="text-xs text-slate-600 italic">
                        भावार्थ: {chant.hindi}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakWithFemaleVoice(chant.devanagari);
                      }}
                      className="p-2.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 transition-colors shrink-0"
                      title="यह कड़ी सुनें"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Wedding Blessing Generator Footer Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-rose-600" />
          <h3 className="text-base font-extrabold text-slate-900">
            सागुन बापला वैवाहिक आशीर्वाद जनरेटर (Wedding Blessing Card)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">वर का नाम (Groom):</label>
            <input
              type="text"
              value={groomName}
              onChange={(e) => setGroomName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">वधू का नाम (Bride):</label>
            <input
              type="text"
              value={brideName}
              onChange={(e) => setBrideName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
            />
          </div>
        </div>

        {/* Blessing Card Preview */}
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-serif leading-relaxed text-rose-950 whitespace-pre-line">
          {fullBlessingText}
        </div>

        <div className="flex flex-wrap items-center gap-3 justify-end">
          <button
            onClick={handleCopyBlessing}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {blessingCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{blessingCopied ? 'कॉपी हुआ!' : 'आशीर्वाद कॉपी करें'}</span>
          </button>

          <button
            onClick={handleShareWhatsApp}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer hover:scale-105"
          >
            <Send className="w-4 h-4" />
            <span>WhatsApp पर नवदंपति को भेजें</span>
          </button>
        </div>
      </div>
    </div>
  );
};
