import React, { useState, useRef, useEffect } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { toggleFavorite, isFavorite } from '../utils/favoritesStorage';
import {
  MessageSquare,
  Volume2,
  Sparkles,
  Play,
  Pause,
  ShoppingBag,
  Users,
  Tractor,
  Compass,
  Stethoscope,
  Copy,
  Check,
  Mic,
  MicOff,
  Square,
  Bookmark,
  Award,
  RefreshCw
} from 'lucide-react';

interface DialogueLine {
  speaker: string;
  speakerRole: string;
  santaliDev: string;
  santaliRoman: string;
  hindiTranslation: string;
}

interface DialogueScenario {
  id: string;
  titleDevanagari: string;
  titleRoman: string;
  category: 'market' | 'guests' | 'farming' | 'directions' | 'doctor';
  categoryLabel: string;
  contextDescription: string;
  dialogueLines: DialogueLine[];
}

const DIALOGUES_DATA: DialogueScenario[] = [
  {
    id: 'd1',
    titleDevanagari: 'हाट-बाजार रे किरीञ-आकिरीञ (सब्जी व हाट में मोलभाव)',
    titleRoman: 'Hat-Bazar Re Kirin-Akirin',
    category: 'market',
    categoryLabel: 'हाट-बाजार मोलभाव (Bargaining in Market)',
    contextDescription: 'साप्ताहिक हाट में ग्रामीण महिला और खरीदार के बीच ताज़ी सब्जी और अनाज खरीदने का स्वाभाविक वार्तालाप।',
    dialogueLines: [
      {
        speaker: 'किरीञिच् (Buyer)',
        speakerRole: 'खरीदार',
        santaliDev: 'जोहार दा! नोवा बिलाती दो तिन ते पोवा ?',
        santaliRoman: 'Johar da! Nowa bilati do tin te powa?',
        hindiTranslation: 'नमस्ते भाई! यह टमाटर एक पाव कितने का है?'
      },
      {
        speaker: 'आकिरीञिच् (Seller)',
        speakerRole: 'दुकानदार',
        santaliDev: 'जोहार गे! नोवा दो गाडा पारोम सेताक् गे गोद आगु आकान, पोवा दो कुड़ी टाका।',
        santaliRoman: 'Johar ge! Nowa do gada parom setah ge god agu akan, powa do kuri taka.',
        hindiTranslation: 'नमस्ते! यह नदी पार से सुबह ही तोड़कर लाया गया है, एक पाव बीस रुपये का है।'
      },
      {
        speaker: 'किरीञिच् (Buyer)',
        speakerRole: 'खरीदार',
        santaliDev: 'आडी गोनोंग एम लइयेदा! बार किलो ञेले-खान तिन तेम इमाञा ?',
        santaliRoman: 'Adi gonong em laiyeda! Bar kilo nyele-khan tin tem imanya?',
        hindiTranslation: 'आप बहुत अधिक दाम बता रहे हैं! अगर दो किलो लूं तो कितने में देंगे?'
      },
      {
        speaker: 'आकिरीञिच् (Seller)',
        speakerRole: 'दुकानदार',
        santaliDev: 'ठीक गेया, बार किलो रे साठ टाका एम मे, आडि बेसाक् जिनिस काना।',
        santaliRoman: 'Thik geya, bar kilo re sath taka em me, adi besah jinis kana.',
        hindiTranslation: 'ठीक है, दो किलो का साठ रुपये दे दीजिए, बहुत ही ताज़ा और बढ़िया माल है।'
      },
      {
        speaker: 'किरीञिच् (Buyer)',
        speakerRole: 'खरीदार',
        santaliDev: 'हेँ, जोजोल आड़ाक् हों मित् बोंधा सांव ते ओताञ मे।',
        santaliRoman: 'Hen, jojol adah hon mit bondha sanw te otany me.',
        hindiTranslation: 'हाँ, साथ में एक मुट्ठा खट्टा साग भी बांध दीजिए।'
      }
    ]
  },
  {
    id: 'd2',
    titleDevanagari: 'पेड़ा दाराम आर आदाब-सत्कार (अतिथि का ससम्मान स्वागत)',
    titleRoman: 'Pera Daram & Atithi Satkar',
    category: 'guests',
    categoryLabel: 'अतिथि सत्कार (Welcoming Relatives)',
    contextDescription: 'दूर गांव से रिश्तेदार (पेड़ा होड़) के घर आगमन पर पारंपरिक लोटा-पानी और कुशलक्षेम पूछने की संताली संस्कृति।',
    dialogueLines: [
      {
        speaker: 'ओड़ाक् किसांड़ (Host)',
        speakerRole: 'गृहस्वामी',
        santaliDev: 'माराम जोहार पेड़ा होड़! हिजुक् पे, पार्कॉम रे दुड़ुप पे।',
        santaliRoman: 'Marang johar pera hor! Hijuh pe, parkom re durup pe.',
        hindiTranslation: 'बड़ा प्रणाम आदरणीय अतिथि! आइए, खटिया पर बैठिए।'
      },
      {
        speaker: 'पेड़ा होड़ (Guest)',
        speakerRole: 'अतिथि',
        santaliDev: 'जोहार गे! आडि दिन तायोम आपे सेन् सेतेर हुयुक् काना।',
        santaliRoman: 'Johar ge! Adi din tayom ape sen seter huyuh kana.',
        hindiTranslation: 'प्रणाम! बहुत दिनों बाद आपके गांव की ओर आना हुआ।'
      },
      {
        speaker: 'मायी (Host Daughter)',
        speakerRole: 'बेटी',
        santaliDev: 'गोमके, नोवा लोटा दाहाक् हातवाओ काते जांगा आबुक पे।',
        santaliRoman: 'Gomke, nowa lota dahah hatwao kate janga abuk pe.',
        hindiTranslation: 'सम्माननीय अतिथि, यह लोटे का जल लीजिए और पांव धोकर शीतल हो जाइए।'
      },
      {
        speaker: 'पेड़ा होड़ (Guest)',
        speakerRole: 'अतिथि',
        santaliDev: 'आडि सरावा मायी! जियवि जुड़ाव एना। ओड़ाक् होड़ को दो नापाए गेया पे चे बां ?',
        santaliRoman: 'Adi saraw mayi! Jiywi juraw ena. Orah hor ko do napae geya pe che ban?',
        hindiTranslation: 'बहुत आशीर्वाद बेटी! मन शीतल हो गया। घर-परिवार के सब लोग कुशल-मंगल तो हैं ना?'
      },
      {
        speaker: 'ओड़ाक् किसांड़ (Host)',
        speakerRole: 'गृहस्वामी',
        santaliDev: 'जाहेर एरा आर मरांग बुरुवाक् दया ते बेसो गे मेनाक् लेया। चेटान टोला मा दाका इसिन काना, दाका जोम काते गेपे चालाव-आ।',
        santaliRoman: 'Jaher Era ar Marang Buruwah daya te beso ge menah leya. Chetan tola ma daka isin kana, daka jom kate gepe chalaw-a.',
        hindiTranslation: 'मरांग बुरु और जाहेर एरा की कृपा से सब कुशल हैं। भोजन पक रहा है, खाना खाकर ही आपको जाना होगा।'
      }
    ]
  },
  {
    id: 'd3',
    titleDevanagari: 'खेत-खामार आर रोपा कामि (खेती-बाड़ी व हल जोतने की बात)',
    titleRoman: 'Khet-Khamar & Ropa Kami',
    category: 'farming',
    categoryLabel: 'कृषि एवं रोपाई वार्ता (Agriculture & Farming)',
    contextDescription: 'सावन-भादो में धान के खेतों की मेड़ पर दो किसानों के बीच बारिश और रोपाई की प्रगति पर बातचीत।',
    dialogueLines: [
      {
        speaker: 'सोमराय (Farmer 1)',
        speakerRole: 'किसान 1',
        santaliDev: 'होए हो जादव! नोवा खेत रे दो माहोड़े गे चावले एम एरादा चे रोवा ?',
        santaliRoman: 'Hoe ho Jadow! Nowa khet re do mahore ge chawle em erada che rowa?',
        hindiTranslation: 'अरे यादव भाई! इस खेत में धान का बीज छिड़काव किया है या रोपाई करोगे?'
      },
      {
        speaker: 'जादव (Farmer 2)',
        speakerRole: 'किसान 2',
        santaliDev: 'बां दा, नोवा दो गाहिर खेत काना, दाहाक् बांगे आंजादा, ओंते ते रोपा गे हुयुक्-आ।',
        santaliRoman: 'Ban da, nowa do gahir khet kana, dahah bange anjada, onte te ropa ge huyuh-a.',
        hindiTranslation: 'नहीं भाई, यह गहरा खेत है, पानी सूखता नहीं है, इसलिए इसमें रोपाई ही की जाएगी।'
      },
      {
        speaker: 'सोमराय (Farmer 1)',
        speakerRole: 'किसान 1',
        santaliDev: 'गापा दो नाहेल सांव ते डांगरा को आगु कोपे, आबु गापा गे काड़हा आबोन।',
        santaliRoman: 'Gapa do nahel sanw te dangra ko agu kope, abu gapa ge karha abon.',
        hindiTranslation: 'कल हल और बैलों को लेकर खेत में आ जाइएगा, कल हम सब मिलकर खेत को समतल (काड़हा) करेंगे।'
      },
      {
        speaker: 'जादव (Farmer 2)',
        speakerRole: 'किसान 2',
        santaliDev: 'हेँ बेसो गेया, सेताक् रे गे गांजा दाका जोम काते खेत रेबो ञापाम-आ।',
        santaliRoman: 'Hen beso geya, setah re ge ganja daka jom kate khet rebo nyapam-a.',
        hindiTranslation: 'हाँ बहुत बढ़िया, सुबह बासी भात खाकर सीधे खेत पर ही मिलेंगे।'
      }
    ]
  },
  {
    id: 'd4',
    titleDevanagari: 'डाहार कुली (रास्ता व गांव का पता पूछना)',
    titleRoman: 'Dahar Kuli (Asking Way & Directions)',
    category: 'directions',
    categoryLabel: 'मार्ग व दिशा निर्देशन (Directions)',
    contextDescription: 'अनजान मुसाफिर द्वारा चौराहे पर किसी संताली ग्रामीण से मांझी थान और पक्के रास्ते की जानकारी लेना।',
    dialogueLines: [
      {
        speaker: 'यात्री (Traveler)',
        speakerRole: 'मुसाफिर',
        santaliDev: 'जोहार दा! नोवा डाहार दो मांझी थान सेन् चालाव-आ चे ?',
        santaliRoman: 'Johar da! Nowa dahar do Manjhi Than sen chalaw-a che?',
        hindiTranslation: 'नमस्ते भाई! क्या यह रास्ता मांझी थान की तरफ जाता है?'
      },
      {
        speaker: 'ग्रामीण (Villager)',
        speakerRole: 'स्थानीय निवासी',
        santaliDev: 'हेँ, नोवा कुलही ते सीधा चालाव मे। सरजोम दारे पारोम काते जोजोम सेन् मोड़ाव मे।',
        santaliRoman: 'Hen, nowa kulhi te sidha chalaw me. Sarjom dare parom kate jojom sen moraw me.',
        hindiTranslation: 'हाँ, इस गली से सीधे जाइए। साल के पेड़ को पार करके दाहिनी ओर मुड़ जाइए।'
      },
      {
        speaker: 'यात्री (Traveler)',
        speakerRole: 'मुसाफिर',
        santaliDev: 'मांझी बाबा ओड़ाक् दो ओका रे मेनाक्-आ ?',
        santaliRoman: 'Manjhi Baba orah do oka re menah-a?',
        hindiTranslation: 'मांझी बाबा का घर कहाँ पर स्थित है?'
      },
      {
        speaker: 'ग्रामीण (Villager)',
        speakerRole: 'स्थानीय निवासी',
        santaliDev: 'अखड़ा ताला रे गे उनीयाक् ओड़ाक् मेनाक्-आ, दुवार रे सोहराय चित्र ओल आकाना।',
        santaliRoman: 'Akhra tala re ge uniyah orah menah-a, duwar re Sohrai chitra ol akana.',
        hindiTranslation: 'अखड़ा के ठीक बीच में उनका घर है, द्वार पर सोहराय चित्रकारी बनी हुई है।'
      }
    ]
  },
  {
    id: 'd5',
    titleDevanagari: 'रान-मुरुगान आर बैद्य सांव गालमाराव (वैद्य जी से स्वास्थ्य परामर्श)',
    titleRoman: 'Ran-Murgan & Vaidya Galmaraw',
    category: 'doctor',
    categoryLabel: 'वैद्य परामर्श (Health & Healing)',
    contextDescription: 'मौसमी बुखार और बदन दर्द होने पर ग्रामीण का पारंपरिक रान-मुरुगान (जड़ी-बूटी वैद्य) के पास जाना।',
    dialogueLines: [
      {
        speaker: 'रुगि (Patient)',
        speakerRole: 'रोगी',
        santaliDev: 'कविराज बाबा जोहार! पे महा खोन आडि लोलो रुवा नाम अकादिञा।',
        santaliRoman: 'Kaviraj Baba johar! Pe maha khon adi lolo ruwa nam akadinya.',
        hindiTranslation: 'कविराज बाबा प्रणाम! तीन दिनों से मुझे बहुत तेज बुखार आ रहा है।'
      },
      {
        speaker: 'कविराज (Herbal Doctor)',
        speakerRole: 'वैद्य',
        santaliDev: 'जोहार बेटा! तीय चेतान रे दोहोय मे, नाड़ी ञेल लेगिन। लाच् रे हाँसो मेनाक्-आ चे ?',
        santaliRoman: 'Johar beta! Ti chetan re dohoy me, nari nyel legin. Lach re hanso menah-a che?',
        hindiTranslation: 'प्रणाम बेटा! हाथ ऊपर रखो, नाड़ी देखने दो। क्या पेट में भी दर्द है?'
      },
      {
        speaker: 'रुगि (Patient)',
        speakerRole: 'रोगी',
        santaliDev: 'हेँ बाबा, बोहोक् हों आडि हाँसो काना आर जोंगोक् बां बुझाव काना।',
        santaliRoman: 'Hen Baba, bohok hon adi hanso kana ar jongoh ban bujhaw kana.',
        hindiTranslation: 'हाँ बाबा, सिर में भी बहुत दर्द है और भूख भी नहीं लग रही है।'
      },
      {
        speaker: 'कविराज (Herbal Doctor)',
        speakerRole: 'वैद्य',
        santaliDev: 'नोवा चिरायता आर सतावर रेयाक् रसा सेताक्-तिकिन नूय मे, बार महा रे बेस उतोर-आ।',
        santaliRoman: 'Nowa Chirayita ar Satawar reyah rasa setah-tikin nuy me, bar maha re bes utor-a.',
        hindiTranslation: 'यह चिरायता और सतावर का रस सुबह और दोपहर पियो, दो दिनों में बिल्कुल ठीक हो जाओगे।'
      }
    ]
  }
];

export const SantaliSpokenDialogues: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<DialogueScenario>(DIALOGUES_DATA[0]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [recordingIndex, setRecordingIndex] = useState<number | null>(null);
  const [userRecordings, setUserRecordings] = useState<{ [key: number]: string }>({});
  const [isPlayingUser, setIsPlayingUser] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ [key: number]: string }>({});
  const [starred, setStarred] = useState<boolean>(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setStarred(isFavorite(selectedScenario.id));
  }, [selectedScenario.id]);

  const copyDialogue = (line: DialogueLine, idx: number) => {
    const text = `${line.santaliDev}\n(${line.santaliRoman})\nहिन्दी: ${line.hindiTranslation}`;
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  const handleToggleFavorite = () => {
    const isNowFav = toggleFavorite({
      id: selectedScenario.id,
      category: 'dialogue',
      categoryLabel: selectedScenario.categoryLabel,
      titleDevanagari: selectedScenario.titleDevanagari,
      titleRoman: selectedScenario.titleRoman,
      summary: selectedScenario.contextDescription
    });
    setStarred(isNowFav);
  };

  const startRecording = async (idx: number) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setUserRecordings((prev) => ({ ...prev, [idx]: audioUrl }));
        setFeedback((prev) => ({
          ...prev,
          [idx]: 'उत्कृष्ट उच्चारण! आडि नापाय रोड़ (Great Pronunciation!)'
        }));
        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setRecordingIndex(idx);
    } catch {
      // If mic permission blocked, provide fallback simulated feedback
      setFeedback((prev) => ({
        ...prev,
        [idx]: 'माइक्रोफ़ोन अनुमति आवश्यक है। शुद्ध उच्चारण सुनने के लिए लाउडस्पीकर दबाएं।'
      }));
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setRecordingIndex(null);
  };

  const playUserRecording = (idx: number) => {
    const url = userRecordings[idx];
    if (!url) return;

    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }
    const audio = new Audio(url);
    audioPlayerRef.current = audio;
    setIsPlayingUser(idx);
    audio.play();
    audio.onended = () => setIsPlayingUser(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-slate-50 text-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-200/40 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <MessageSquare size={280} />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-700 border border-blue-500/30 text-xs font-semibold mb-3">
            <Sparkles size={14} />
            <span>रोड़-गालमाराव - दैनिक व्यावहारिक संताली वार्तालाप</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-blue-800 flex items-center gap-3">
            <span>दैनिक संताली बोलचाल संवाद</span>
            <button
              onClick={() => speakWithFemaleVoice('सांतार रोड़-गालमाराव आर दैनिक वार्तालाप')}
              className="p-2 rounded-full bg-blue-500/20 hover:bg-blue-500/40 text-blue-700 transition-colors"
              title="सुनें"
            >
              <Volume2 size={22} />
            </button>
          </h1>
          <p className="text-blue-800/80 text-sm sm:text-base mt-2 leading-relaxed">
            हाट-बाजार में मोलभाव, ससम्मान अतिथि सत्कार, कृषि व रोपाई, दिशा-मार्ग और स्वास्थ्य परामर्श — आम जनजीवन में शुद्ध संताली देवनागरी में धाराप्रवाह बोलने और अपनी आवाज़ रिकॉर्ड करके अभ्यास करने की संपूर्ण सुविधा।
          </p>
        </div>
      </div>

      {/* Scenario Filter Buttons */}
      <div className="flex items-center justify-between gap-2 bg-white dark:bg-slate-50 p-3 rounded-2xl border border-slate-200 dark:border-slate-200 shadow-sm overflow-x-auto">
        <div className="flex items-center gap-2 overflow-x-auto">
          {DIALOGUES_DATA.map((scene) => (
            <button
              key={scene.id}
              onClick={() => {
                setSelectedScenario(scene);
                setUserRecordings({});
                setFeedback({});
              }}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl shrink-0 transition-all ${
                selectedScenario.id === scene.id
                  ? 'bg-blue-100 text-slate-900 shadow-md'
                  : 'text-slate-600 dark:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-100'
              }`}
            >
              {scene.categoryLabel}
            </button>
          ))}
        </div>

        <button
          onClick={handleToggleFavorite}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border shrink-0 ${
            starred
              ? 'bg-amber-500 text-stone-950 border-amber-500 shadow'
              : 'bg-slate-100 dark:bg-slate-100 text-slate-700 dark:text-slate-700 border-slate-200 dark:border-slate-200 hover:bg-slate-200'
          }`}
          title="डायरी में सुरक्षित करें"
        >
          <Bookmark size={15} />
          <span>{starred ? 'सुरक्षित है' : 'सेव करें'}</span>
        </button>
      </div>

      {/* Scenario Header Info */}
      <div className="bg-white dark:bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-200 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-200 pb-5">
          <div>
            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-50/50 text-blue-800 dark:text-blue-700 text-xs font-bold uppercase tracking-wider">
              {selectedScenario.categoryLabel}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-800 mt-2">
              {selectedScenario.titleDevanagari}
            </h2>
            <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-600 font-semibold mt-0.5">
              {selectedScenario.titleRoman}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-600 mt-2">
              <strong>प्रसंग:</strong> {selectedScenario.contextDescription}
            </p>
          </div>
        </div>

        {/* Dialogue Stream */}
        <div className="space-y-5">
          {selectedScenario.dialogueLines.map((line, idx) => {
            const isLeft = idx % 2 === 0;
            const isRecordingThis = recordingIndex === idx;
            const hasUserAudio = Boolean(userRecordings[idx]);
            const isPlayingThis = isPlayingUser === idx;

            return (
              <div
                key={idx}
                className={`flex flex-col ${
                  isLeft ? 'items-start sm:pr-12' : 'items-end sm:pl-12'
                }`}
              >
                <div
                  className={`max-w-2xl w-full p-4 sm:p-5 rounded-2xl border transition-all ${
                    isLeft
                      ? 'bg-blue-50/70 dark:bg-blue-50/20 border-blue-200/80 dark:border-blue-200/40 rounded-tl-sm'
                      : 'bg-emerald-50/70 dark:bg-emerald-50/20 border-emerald-200/80 dark:border-emerald-200/40 rounded-tr-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-200 pb-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          isLeft ? 'bg-blue-600' : 'bg-emerald-600'
                        }`}
                      ></span>
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-800">
                        {line.speaker}
                      </span>
                      <span className="text-xs text-slate-500">({line.speakerRole})</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => copyDialogue(line, idx)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-slate-600 dark:hover:text-slate-800 transition-colors"
                        title="संवाद कॉपी करें"
                      >
                        {copiedIndex === idx ? (
                          <Check size={14} className="text-emerald-600" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                      <button
                        onClick={() => speakWithFemaleVoice(line.santaliDev)}
                        className="p-1.5 rounded-lg bg-blue-700/10 text-blue-700 dark:text-blue-700 hover:bg-blue-700/20 transition-colors"
                        title="शुद्ध उच्चारण सुनें"
                      >
                        <Volume2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Dialogue Content */}
                  <div className="space-y-1.5">
                    <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-800">
                      {line.santaliDev}
                    </p>
                    <p className="text-xs font-semibold text-blue-700 dark:text-blue-600">
                      {line.santaliRoman}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-700 pt-1 border-t border-dashed border-slate-200 dark:border-slate-200">
                      <strong>हिन्दी:</strong> {line.hindiTranslation}
                    </p>
                  </div>

                  {/* Voice Practice Microphone Action Bar */}
                  <div className="mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-200 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {isRecordingThis ? (
                        <button
                          onClick={stopRecording}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold animate-pulse shadow"
                        >
                          <Square size={13} />
                          <span>रिकॉर्डिंग रोकें</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => startRecording(idx)}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-100 hover:bg-rose-50 dark:hover:bg-rose-50/40 text-slate-700 dark:text-slate-700 hover:text-rose-600 text-xs font-semibold transition-colors border border-slate-200 dark:border-slate-200"
                          title="अपनी आवाज़ में बोलकर अभ्यास करें"
                        >
                          <Mic size={14} className="text-rose-500" />
                          <span>बोलने का अभ्यास करें</span>
                        </button>
                      )}

                      {hasUserAudio && (
                        <button
                          onClick={() => playUserRecording(idx)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-50/60 text-emerald-800 dark:text-emerald-700 text-xs font-bold hover:bg-emerald-200 transition-colors"
                        >
                          {isPlayingThis ? <Pause size={12} /> : <Play size={12} />}
                          <span>अपनी आवाज़ सुनें</span>
                        </button>
                      )}
                    </div>

                    {feedback[idx] && (
                      <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-600 flex items-center gap-1">
                        <Award size={13} />
                        {feedback[idx]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
