import React, { useState, useRef, useMemo } from 'react';
import { Volume2, Award, Info, RefreshCw, Feather, Sparkles, CheckCircle, HelpCircle, Download } from 'lucide-react';

interface BirdItem {
  id: string;
  santaliDev: string;
  santaliRom: string;
  hindiName: string;
  englishName: string;
  scientificName: string;
  culturalRole: string;
  omenMeaning: string;
  habitat: string;
  proverb: string;
  proverbMeaning: string;
  synthConfig: {
    baseFreq: number;
    modFreq: number;
    depth: number;
    duration: number;
    chirpCount: number;
    type: OscillatorType;
  };
}

const BIRD_DATABASE: BirdItem[] = [
  {
    id: 'chitir',
    santaliDev: 'चितिर चेंदें',
    santaliRom: 'Chitir Cende',
    hindiName: 'बबलर / सतबहिया पक्षी',
    englishName: 'Jungle Babbler',
    scientificName: 'Argya striata',
    culturalRole: 'मौसम व वर्षा का सबसे बड़ा प्राकृतिक भविष्यवक्ता। जब चितिर झुंड में धूल में नहाते हैं या ऊंची डाली पर जोर से चहचहाते हैं तो 24 घंटे में बारिश निश्चित मानी जाती है।',
    omenMeaning: 'शुभ संकेत: यात्रा पर निकलते समय बायीं ओर चितिर दिखे तो कार्य सफल होता है।',
    habitat: 'साल वन व झाड़ीदार खेतों की मेड़',
    proverb: 'चितिर चेंदें राक् लेकान दाक् गे हियूक्-आ',
    proverbMeaning: 'चितिर पक्षी जब विशेष धुन में पुकारे, तो मेघ बरसे बिना नहीं रहता।',
    synthConfig: {
      baseFreq: 2200,
      modFreq: 18,
      depth: 400,
      duration: 0.18,
      chirpCount: 5,
      type: 'triangle'
    }
  },
  {
    id: 'koyel',
    santaliDev: 'कोएल चेंदें',
    santaliRom: 'Koyel Cende',
    hindiName: 'कोयल पक्षी',
    englishName: 'Asian Koel',
    scientificName: 'Eudynamys scolopaceus',
    culturalRole: 'बाहा पाबोर (सरहुल) और बसंत आगमन की प्रथम संदेशवाहिका। साल के पेड़ों पर जब नए पत्ते व फूल आते हैं तो कोयल की कूक युवाओं को आखड़ा नृत्य के लिए आमंत्रित करती है।',
    omenMeaning: 'प्रेम व उल्लास का प्रतीक। घर के सामने कूकना किसी प्रिय मेहमान या रिश्तेदार के आगमन का संकेत है।',
    habitat: 'महुआ, जामुन व साल वृक्षों के घने कुंज',
    proverb: 'कोएल राकेत्-ते बाहा बोन बोंगाया',
    proverbMeaning: 'कोयल की कूक सुनकर ही संथाल समुदाय जाहेर थान में बाहा बोंगा की पूजा आरंभ करता है।',
    synthConfig: {
      baseFreq: 680,
      modFreq: 4,
      depth: 320,
      duration: 0.65,
      chirpCount: 2,
      type: 'sine'
    }
  },
  {
    id: 'dahuk',
    santaliDev: 'डाहुक / कुदरा',
    santaliRom: 'Dahuk / Kudra',
    hindiName: 'जलमुर्गी / डाहुक',
    englishName: 'White-breasted Waterhen',
    scientificName: 'Amaurornis phoenicurus',
    culturalRole: 'गांव के पोखरों, बांधों और दलदली धान खेतों का रक्षक पक्षी। इसकी रात्रि गूंज आषाढ़ में पानी भरने का उत्सव उद्घोषित करती है।',
    omenMeaning: 'जल की प्रचुरता व भूमिगत जलस्रोत की पहचान। जहां डाहुक अंडा दे, वह बांध कभी नहीं सूखता।',
    habitat: 'गांव के जोभड़ा, बांध व सरकंडा झाड़ियां',
    proverb: 'डाहुक राक् जोभड़ा रे, हाको को उडुक-ओक्',
    proverbMeaning: 'जब डाहुक ताल-तलैया में गूंजता है, तब मछलियां खेतों की ओर तैरने लगती हैं।',
    synthConfig: {
      baseFreq: 450,
      modFreq: 8,
      depth: 180,
      duration: 0.35,
      chirpCount: 3,
      type: 'sawtooth'
    }
  },
  {
    id: 'marak',
    santaliDev: 'मारोक',
    santaliRom: 'Marak',
    hindiName: 'मोर (मयूर)',
    englishName: 'Indian Peafowl',
    scientificName: 'Pavo cristatus',
    culturalRole: 'संथाल समाज के मरांडी (Marndi) और टुडू कबीलों का पवित्र टोटेम। मोर पंख पाग (सिर की पगड़ी) और दासांय नृत्य में मुख्य आकर्षण होता है।',
    omenMeaning: 'पवित्रता व सुरक्षा। घर में मोर पंख रखने से सर्प भय दूर रहता है और बोंगा का आशीर्वाद बना रहता है।',
    habitat: 'पहाड़ी तराई, दालमा व सारंडा के घने वन',
    proverb: 'मारोक इल सांव-ते पाग बेनाव-मे',
    proverbMeaning: 'मोर के पंखों से ही संथाल नायक अपनी पगड़ी की शान सजाता है।',
    synthConfig: {
      baseFreq: 520,
      modFreq: 2.5,
      depth: 280,
      duration: 0.9,
      chirpCount: 2,
      type: 'triangle'
    }
  },
  {
    id: 'potam',
    santaliDev: 'पोताम',
    santaliRom: 'Potam',
    hindiName: 'पंडुक / जंगली फाख्ता',
    englishName: 'Spotted Dove',
    scientificName: 'Spilopelia chinensis',
    culturalRole: 'घरेलू शांति, वैवाहिक सौहार्द्र और धैर्य का प्रतीक। विवाह के गीतों में नवविवाहित जोड़े की तुलना दो पोताम पक्षियों से की जाती है।',
    omenMeaning: 'यदि नवदंपति के घर की छत पर पोताम जोड़ा घोंसला बनाए तो वंश वृद्धि और शांति का शुभ शकुन होता है।',
    habitat: 'गांव की खलिहान, बांस की कोठ व महुआ पेड़',
    proverb: 'पोताम लेका घारोज रे ताहेन-पे',
    proverbMeaning: 'पोताम पक्षी की तरह शांत और प्रेमपूर्वक अपने परिवार में मिलकर रहो।',
    synthConfig: {
      baseFreq: 380,
      modFreq: 6,
      depth: 80,
      duration: 0.45,
      chirpCount: 3,
      type: 'sine'
    }
  },
  {
    id: 'tudu',
    santaliDev: 'टुडू / हुटुटु',
    santaliRom: 'Tudu / Hututu',
    hindiName: 'कठफोड़वा पक्षी',
    englishName: 'Black-rumped Flameback',
    scientificName: 'Dinopium benghalense',
    culturalRole: 'टुडू गोत्र का आदि जनक टोटेम व वन की सेहत का परिचायक। यह पेड़ के सूखे या रोगग्रस्त तनों को पहचानकर कीटों को समाप्त करता है।',
    omenMeaning: 'लगन और परिश्रम का प्रतीक। टुडू की चोंच की लयबद्ध आवाज बढ़ईगीरी और काष्ठकला का आदि प्रेरक मानी जाती है।',
    habitat: 'साल, करम व कुसुम के पुराने पेड़',
    proverb: 'टुडू लेका दारू खुंटौ-मे',
    proverbMeaning: 'कठफोड़वा की तरह एकाग्र होकर अपने लक्ष्य पर निरंतर प्रहार करते रहो।',
    synthConfig: {
      baseFreq: 1800,
      modFreq: 40,
      depth: 600,
      duration: 0.08,
      chirpCount: 8,
      type: 'square'
    }
  },
  {
    id: 'gundri',
    santaliDev: 'गुंड्री',
    santaliRom: 'Gundri',
    hindiName: 'बटेर पक्षी',
    englishName: 'Jungle Bush Quail',
    scientificName: 'Perdicula asiatica',
    culturalRole: 'तीव्र गति, सतर्कता और छिपने की कला का प्रतीक। संथाल शिकारी (सेंन्द्रा) गुंड्री की आवाज से जंगल में हिंसक पशु की उपस्थिति भांप लेते हैं।',
    omenMeaning: 'सावधानी का संकेत। अचानक कदमों के आगे से गुंड्री का फड़फड़ाना आने वाले संकट से सावधान करता है।',
    habitat: 'घास के मैदान, अरहर व कुल्थी के खेत',
    proverb: 'गुंड्री लेका उकुक् आड़ोम बाडाय-मे',
    proverbMeaning: 'गुंड्री पक्षी की तरह विषम परिस्थिति में स्वयं की रक्षा करना सीखो।',
    synthConfig: {
      baseFreq: 1400,
      modFreq: 15,
      depth: 500,
      duration: 0.12,
      chirpCount: 4,
      type: 'triangle'
    }
  },
  {
    id: 'kau',
    santaliDev: 'काऊ चेंदें',
    santaliRom: 'Kau Cende',
    hindiName: 'कौआ / काग',
    englishName: 'House / Jungle Crow',
    scientificName: 'Corvus splendens',
    culturalRole: 'पूर्वजों (हापड़ाम को) का दूत। मृत्यु संस्कार (भंडान) में कौए को पहला पिंड व आहार दिया जाता है ताकि वह पितृलोक तक संदेश पहुंचाए।',
    omenMeaning: 'सुबह-सुबह छप्पर पर बैठकर कांव-कांव करना दूर देश से सगे-संबंधियों के संदेश का पूर्व संकेत है।',
    habitat: 'गांव का चौराहा, महुआ पेड़ व खलिहान',
    proverb: 'काऊ राक्-लेरे पेड़ा को सेतेरा',
    proverbMeaning: 'कौआ जब मुंडेर पर बोलता है, तब घर में आत्मीय अतिथि पधारते हैं।',
    synthConfig: {
      baseFreq: 320,
      modFreq: 12,
      depth: 140,
      duration: 0.5,
      chirpCount: 2,
      type: 'sawtooth'
    }
  },
  {
    id: 'suiya',
    santaliDev: 'सुइया चेंदें',
    santaliRom: 'Suiya Cende',
    hindiName: 'शकरखोरा / फुदकी',
    englishName: 'Purple Sunbird',
    scientificName: 'Cinnyris asiaticus',
    culturalRole: 'फूलों के परागकण व प्रकृति की सुंदरता का संदेशवाहक। महुआ व पलाश के फूलों के खिलने पर इसकी चंचलता लोकगीतों में गाई जाती है।',
    omenMeaning: 'उमंग व नवजीवन। आंगन के फूल पर सुइया का मंडराना घर में सुख-समृद्धि का प्रतीक माना जाता है।',
    habitat: 'घर के बाड़ी, मदार व पलाश के बगीचे',
    proverb: 'सुइया चेंदें रसा चुपुच लेका जीवोन रसियाव-मे',
    proverbMeaning: 'सुइया पक्षी की तरह फूलों से रस चुनकर जीवन को आनंदित बनाओ।',
    synthConfig: {
      baseFreq: 3100,
      modFreq: 22,
      depth: 700,
      duration: 0.15,
      chirpCount: 3,
      type: 'sine'
    }
  }
];

export const SantaliBirdLoreEthnoOrnithology: React.FC = () => {
  const [selectedBird, setSelectedBird] = useState<BirdItem>(BIRD_DATABASE[0]);
  const [isPlayingSynth, setIsPlayingSynth] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizQuestionIdx, setQuizQuestionIdx] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<'encyclopedia' | 'sound_quiz' | 'omens_guide'>('encyclopedia');
  const [filterSearch, setFilterSearch] = useState('');

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Synthesize bird call using Web Audio API oscillators
  const playBirdSound = (bird: BirdItem) => {
    try {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      setIsPlayingSynth(true);

      const cfg = bird.synthConfig;
      let startTime = ctx.currentTime;

      for (let i = 0; i < cfg.chirpCount; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = cfg.type;

        // Pitch envelope
        const chirpStart = startTime + i * (cfg.duration + 0.08);
        const chirpEnd = chirpStart + cfg.duration;

        osc.frequency.setValueAtTime(cfg.baseFreq, chirpStart);
        if (bird.id === 'koyel') {
          // Koel rising pitch "Koo-ooo"
          osc.frequency.exponentialRampToValueAtTime(cfg.baseFreq + cfg.depth, chirpEnd);
        } else if (bird.id === 'chitir' || bird.id === 'tudu') {
          // Rapid chirping trill
          osc.frequency.linearRampToValueAtTime(cfg.baseFreq + (i % 2 === 0 ? cfg.depth : -cfg.depth * 0.5), chirpStart + cfg.duration * 0.5);
          osc.frequency.linearRampToValueAtTime(cfg.baseFreq, chirpEnd);
        } else if (bird.id === 'marak') {
          // Peacock harsh wail
          osc.frequency.exponentialRampToValueAtTime(cfg.baseFreq - 150, chirpEnd);
        } else {
          osc.frequency.linearRampToValueAtTime(cfg.baseFreq + cfg.depth, chirpStart + cfg.duration * 0.4);
          osc.frequency.linearRampToValueAtTime(cfg.baseFreq * 0.8, chirpEnd);
        }

        // Volume envelope
        gain.gain.setValueAtTime(0.0001, chirpStart);
        gain.gain.exponentialRampToValueAtTime(0.35, chirpStart + cfg.duration * 0.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, chirpEnd);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(chirpStart);
        osc.stop(chirpEnd);
      }

      const totalTime = cfg.chirpCount * (cfg.duration + 0.08) * 1000;
      setTimeout(() => {
        setIsPlayingSynth(false);
      }, totalTime + 100);
    } catch {
      setIsPlayingSynth(false);
    }
  };

  // Text-to-speech for Santali pronunciation
  const speakSantali = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredBirds = BIRD_DATABASE.filter(b =>
    b.santaliDev.toLowerCase().includes(filterSearch.toLowerCase()) ||
    b.santaliRom.toLowerCase().includes(filterSearch.toLowerCase()) ||
    b.hindiName.toLowerCase().includes(filterSearch.toLowerCase()) ||
    b.culturalRole.toLowerCase().includes(filterSearch.toLowerCase())
  );

  // Bird Call Quiz Logic
  const currentQuizBird = BIRD_DATABASE[quizQuestionIdx % BIRD_DATABASE.length];
  // 3 options for the quiz
  // Shuffled once per question (was re-shuffled on every render, so options jumped after answering)
  const quizOptions = useMemo(() => [
    currentQuizBird,
    BIRD_DATABASE[(quizQuestionIdx + 2) % BIRD_DATABASE.length],
    BIRD_DATABASE[(quizQuestionIdx + 5) % BIRD_DATABASE.length]
  ].filter((b, i, arr) => arr.findIndex((x) => x.id === b.id) === i).sort(() => 0.5 - Math.random()), [quizQuestionIdx]); // eslint-disable-line react-hooks/exhaustive-deps
  const [quizPickedId, setQuizPickedId] = useState<string | null>(null);

  const handleQuizAnswer = (birdId: string) => {
    if (quizAnswered !== null) return;
    const isCorrect = birdId === currentQuizBird.id;
    setQuizPickedId(birdId);
    setQuizAnswered(isCorrect);
    if (isCorrect) {
      setQuizScore(prev => prev + 10);
    }
  };

  const nextQuizQuestion = () => {
    setQuizQuestionIdx(prev => prev + 1);
    setQuizAnswered(null);
    setQuizPickedId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-emerald-200/40 rounded-2xl p-6 text-slate-900 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-full opacity-10 pointer-events-none flex items-center justify-center">
          <Feather className="w-64 h-64 text-emerald-700" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100/60 border border-emerald-300/40 rounded-full text-xs font-semibold text-emerald-800 mb-3">
            <Feather className="w-3.5 h-3.5" />
            <span>संथाल नृ-पक्षीविज्ञान (Santali Ethno-Ornithology)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-emerald-900">
            चेँड़े चिन्हा: संथाल पक्षी दर्शन व बोलियों का अर्थ
          </h1>
          <p className="text-emerald-800/90 text-sm mt-2 leading-relaxed">
            संथाल संस्कृति में वन-पक्षी केवल प्राणी नहीं, अपितु ऋतु-परिवर्तन, वर्षा आगमन, पितृ-संदेश और कबीलाई टोटेम के जीवित मार्गदर्शक हैं। जानिए 9 पावन पक्षियों के रहस्य व उनकी बोलियों की ध्वनि।
          </p>

          {/* Navigation Sub-Tabs */}
          <div className="flex flex-wrap gap-2 mt-5">
            <button
              onClick={() => setActiveTab('encyclopedia')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'encyclopedia'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-emerald-50/60 hover:bg-emerald-100/60 text-emerald-800 border border-emerald-200/50'
              }`}
            >
              पक्षी ज्ञानकोश व बोली सिंथेसाइज़र
            </button>
            <button
              onClick={() => setActiveTab('sound_quiz')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'sound_quiz'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-emerald-50/60 hover:bg-emerald-100/60 text-emerald-800 border border-emerald-200/50'
              }`}
            >
              बोली पहचानो क्विज (Interactive Sound Quiz)
            </button>
            <button
              onClick={() => setActiveTab('omens_guide')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'omens_guide'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-emerald-50/60 hover:bg-emerald-100/60 text-emerald-800 border border-emerald-200/50'
              }`}
            >
              मौसम व शकुन निर्देशिका
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab: Encyclopedia & Audio Synthesizer */}
      {activeTab === 'encyclopedia' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Bird List Sidebar */}
          <div className="lg:col-span-5 space-y-3">
            <div className="bg-stone-50/90 border border-stone-200 rounded-xl p-4">
              <input
                type="text"
                placeholder="पक्षी का नाम या संकेत खोजें..."
                value={filterSearch}
                onChange={e => setFilterSearch(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {filteredBirds.map(bird => {
                const isSelected = selectedBird.id === bird.id;
                return (
                  <div
                    key={bird.id}
                    onClick={() => setSelectedBird(bird)}
                    className={`p-3.5 rounded-xl cursor-pointer transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-50/70 border-emerald-500/80 shadow-md'
                        : 'bg-stone-50/70 hover:bg-stone-100/70 border-stone-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-amber-800">{bird.santaliDev}</span>
                        <span className="text-xs text-stone-600 font-mono">({bird.santaliRom})</span>
                      </div>
                      <p className="text-xs text-stone-700 mt-0.5">{bird.hindiName} • {bird.englishName}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playBirdSound(bird);
                      }}
                      className="p-2 bg-emerald-100/50 hover:bg-emerald-200 text-emerald-800 rounded-lg transition-colors border border-emerald-300/40"
                      title="बोली सुनें"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Bird Profile & Synthesizer Card */}
          <div className="lg:col-span-7">
            <div className="bg-stone-50/95 border border-stone-200 rounded-2xl p-6 shadow-xl relative">
              {/* Top Details */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-stone-200">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-amber-700">{selectedBird.santaliDev}</h2>
                    <button
                      onClick={() => speakSantali(selectedBird.santaliDev)}
                      className="p-1.5 bg-amber-50/40 hover:bg-amber-100/60 text-amber-800 rounded-md border border-amber-200/50"
                      title="संथाली उच्चारण सुनें"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-stone-600 text-sm font-mono mt-0.5">{selectedBird.santaliRom} | {selectedBird.scientificName}</p>
                  <p className="text-emerald-600 font-medium text-sm mt-1">{selectedBird.hindiName} ({selectedBird.englishName})</p>
                </div>

                {/* Big Synthesizer Button */}
                <button
                  onClick={() => playBirdSound(selectedBird)}
                  disabled={isPlayingSynth}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm shadow-lg transition-all border ${
                    isPlayingSynth
                      ? 'bg-amber-600 text-white animate-pulse border-amber-400'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400'
                  }`}
                >
                  <Volume2 className="w-5 h-5" />
                  <span>{isPlayingSynth ? 'बोली बज रही है...' : 'पक्षी की प्राकृतिक बोली सुनें'}</span>
                </button>
              </div>

              {/* Cultural Role & Ancestral Significance */}
              <div className="mt-5 space-y-4">
                <div className="bg-white/80 rounded-xl p-4 border border-stone-200">
                  <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm mb-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>संथाल संस्कृति व लोकजीवन में स्थान</span>
                  </div>
                  <p className="text-stone-700 text-sm leading-relaxed">{selectedBird.culturalRole}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Omen / Weather Forecast */}
                  <div className="bg-amber-50/30 border border-amber-200/40 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm mb-1.5">
                      <Info className="w-4 h-4" />
                      <span>शकुन व मौसम संकेत</span>
                    </div>
                    <p className="text-amber-800/90 text-xs leading-relaxed">{selectedBird.omenMeaning}</p>
                  </div>

                  {/* Habitat */}
                  <div className="bg-white/80 border border-stone-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-stone-700 font-semibold text-sm mb-1.5">
                      <Feather className="w-4 h-4" />
                      <span>आवास व विचरण क्षेत्र</span>
                    </div>
                    <p className="text-stone-600 text-xs leading-relaxed">{selectedBird.habitat}</p>
                  </div>
                </div>

                {/* Traditional Proverb / Menkatha */}
                <div className="bg-gradient-to-r from-emerald-50/60 to-stone-50 border border-emerald-200/50 rounded-xl p-4">
                  <div className="text-xs uppercase tracking-wider text-emerald-600 font-semibold mb-1">
                    संथाल लोक कहावत (मेनकाथा)
                  </div>
                  <div className="text-base font-bold text-amber-800">
                    "{selectedBird.proverb}"
                  </div>
                  <div className="text-xs text-stone-700 mt-1 italic">
                    अर्थ: {selectedBird.proverbMeaning}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Interactive Sound Quiz */}
      {activeTab === 'sound_quiz' && (
        <div className="max-w-2xl mx-auto bg-stone-50 border border-stone-200 rounded-2xl p-6 shadow-xl text-center">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-stone-200">
            <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm">
              <Award className="w-4 h-4" />
              <span>प्रश्नोत्तरी संख्या #{quizQuestionIdx + 1}</span>
            </div>
            <div className="px-3 py-1 bg-emerald-50 border border-emerald-200/60 rounded-full text-emerald-700 text-xs font-bold">
              अंक: {quizScore}
            </div>
          </div>

          <h3 className="text-xl font-bold text-stone-800 mb-2">
            ध्वनि सुनकर पहचानें: यह किस पक्षी की आवाज है?
          </h3>
          <p className="text-stone-600 text-xs mb-6">
            नीचे दिए गए बटन को दबाकर पक्षी की बोली सुनें, फिर सही संथाली नाम चुनें।
          </p>

          {/* Big Play Sound Button */}
          <button
            onClick={() => playBirdSound(currentQuizBird)}
            className="w-24 h-24 mx-auto rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex flex-col items-center justify-center shadow-2xl transition-transform active:scale-95 mb-8 border-4 border-emerald-400/50"
          >
            <Volume2 className="w-10 h-10 mb-1" />
            <span className="text-xs font-bold">आवाज सुनें</span>
          </button>

          {/* Options */}
          <div className="grid grid-cols-1 gap-3 max-w-md mx-auto">
            {quizOptions.map(opt => {
              const isSelected = quizAnswered !== null;
              const isCorrect = opt.id === currentQuizBird.id;

              let btnStyle = 'bg-stone-100 hover:bg-stone-200 border-stone-200 text-stone-800';
              if (isSelected) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold';
                } else if (opt.id === quizPickedId) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-800 font-bold';
                } else {
                  btnStyle = 'bg-stone-50 border-stone-200 text-stone-500 opacity-60';
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={quizAnswered !== null}
                  onClick={() => handleQuizAnswer(opt.id)}
                  className={`p-4 rounded-xl border transition-all text-left flex items-center justify-between ${btnStyle}`}
                >
                  <div>
                    <span className="text-base font-bold block">{opt.santaliDev}</span>
                    <span className="text-xs opacity-75">{opt.hindiName} ({opt.englishName})</span>
                  </div>
                  {isSelected && isCorrect && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                </button>
              );
            })}
          </div>

          {/* Result Feedback */}
          {quizAnswered !== null && (
            <div className="mt-6 pt-4 border-t border-stone-200">
              <p className={`text-sm font-bold mb-3 ${quizAnswered ? 'text-emerald-600' : 'text-amber-600'}`}>
                {quizAnswered
                  ? 'शाबाश! सही पहचान! +10 अंक'
                  : `गलत उत्तर! यह "${currentQuizBird.santaliDev}" (${currentQuizBird.hindiName}) की आवाज थी।`}
              </p>
              <button
                onClick={nextQuizQuestion}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-sm shadow-md"
              >
                अगला पक्षी पहचानें →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Omens & Ecological Weather Lore */}
      {activeTab === 'omens_guide' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {BIRD_DATABASE.map(bird => (
            <div key={bird.id} className="bg-stone-50/90 border border-stone-200 rounded-xl p-5 hover:border-emerald-300/60 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-amber-700">{bird.santaliDev}</span>
                <span className="text-xs text-stone-600">{bird.hindiName}</span>
              </div>
              <div className="bg-white/80 rounded-lg p-3 border border-stone-200 mb-3 text-xs text-stone-700">
                <strong className="text-emerald-600 block mb-1">संकेत व लोक विश्वास:</strong>
                {bird.omenMeaning}
              </div>
              <div className="text-xs text-amber-800/90 italic">
                "{bird.proverb}"
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
