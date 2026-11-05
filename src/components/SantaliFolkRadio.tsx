import React, { useState, useEffect, useRef } from 'react';
import {
  Radio,
  Play,
  Square,
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen,
  Wind,
  Trees,
  Flame,
  Award,
  ChevronRight,
  Info,
  Clock,
  Heart
} from 'lucide-react';
import { speakWithFemaleVoice } from '../utils/speech';

export interface FolkRadioStory {
  id: string;
  titleDev: string;
  titleRoman: string;
  genre: string;
  durationMinutes: number;
  synopsisHindi: string;
  moralLesson: string;
  paragraphs: {
    devanagari: string;
    roman: string;
    hindi: string;
  }[];
}

export const FOLK_RADIO_STORIES: FolkRadioStory[] = [
  {
    id: 'creation_myth',
    titleDev: 'हांस-हांसिल आर मानवा सिरजोन (सृष्टि गाथा)',
    titleRoman: 'Hans-Hasil ar Manwa Sirjon',
    genre: 'प्राचीन सृष्टि गाथा (सिरजोन काथा)',
    durationMinutes: 8,
    synopsisHindi: 'जब चारों ओर केवल जल ही जल था, तब ठाकुर जियू ने दो हंस-हंसिनी की रचना की। उनके अंडों से प्रथम मानव पिलचु हाड़ाम व पिलचु बुढ़ी का जन्म हुआ।',
    moralLesson: 'प्रकृति, जल और समस्त जीवों का सम्मान करना क्योंकि मानव स्वयं इस जल-सृष्टि की संतान है।',
    paragraphs: [
      {
        devanagari: 'सेदाय रे जोतो दिशोम रे दाक् गे ताहेकाना। चेतान रे ठाकुर जियू दो हंसा-हंसील चेणे किने सिरजोन् केत् किना।',
        roman: 'Seday re joto disom re dak ge tahekana. Chetan re Thakur Jiyu do Hansa-Hasil chene kine sirjon ket kina.',
        hindi: 'प्राचीन काल में इस संपूर्ण संसार में केवल अथाह जल ही जल था। परमेश्वर ठाकुर जियू ने जल के ऊपर दो पवित्र पक्षी हांस और हांसिल की रचना की।'
      },
      {
        devanagari: 'उनीकिन् चेणे दो दाक् चेतान रे तुकुन् काते बेड़ा-बेड़ा किन् उड़ौ बरायेद् ताहेकाना। ओते-हासा बांकान ते उनीकिन् गाड़ा-गाडा बिलि दो ओका रे किन् दोहोया?',
        roman: 'Unikin chene do dak chetan re tukun kate beda-beda kin udau barayed tahekana. Ote-hasa bankan te unikin gada-gada bili do oka re kin dohhoya?',
        hindi: 'वे दोनों पक्षी जल के ऊपर उड़ते-उड़ते थक जाते थे। धरती और मिट्टी न होने के कारण वे अपने पवित्र अंडों को कहां रखते?'
      },
      {
        devanagari: 'ठाकुर जियू वाक हुकुम ते होड़ो (कछुआ) आर लेंडेत् (केंचुआ) दो दाक् लातार खोन हासा ओड़ोक काते सिरजोन केदाकिन्।',
        roman: 'Thakur Jiyu wak hukum te Horo (kachhua) ar Lendet (kenchua) do dak latar khon hasa orok kate sirjon kedakin.',
        hindi: 'तब ठाकुर जियू के आदेश पर कछुए और केंचुए ने पाताल से उपजाऊ मिट्टी लाकर जल के ऊपर धरती का विस्तार किया।'
      },
      {
        devanagari: 'हांसा-हंसील चेणे किन् बिलि खोन बाड़या गिद्रा किन् ओड़ोकना—पिलचु हाड़ाम आर पिलचु बुढ़ी। उनीकिन् खोन गे अबो मानवा कोबो सिरजोनेना।',
        roman: 'Hansa-Hasil chene kin bili khon barya gidra kin orokna—Pilchu Hadam ar Pilchu Budhi. Unikin khon ge abo manwa kobo sirjonena.',
        hindi: 'हांस-हांसिल के दो अंडों से दो सुंदर संतानों का जन्म हुआ—पिलचु हाड़ाम और पिलचु बुढ़ी। उन्हीं से संपूर्ण मानव समाज का विस्तार हुआ।'
      }
    ]
  },
  {
    id: 'karma_dharma',
    titleDev: 'करमा आर धरमा रीन का़हनी (प्रकृति व धर्म)',
    titleRoman: 'Karma ar Dharma reyak Kahni',
    genre: 'नीति व लोक-शिक्षा कथा',
    durationMinutes: 7,
    synopsisHindi: 'दो भाइयों की लोककथा। करम वृक्ष और पूर्वजों की उपेक्षा करने पर विपत्ति आती है, और सच्चे मन से करम देवता की उपासना करने पर खुशहाली लौटती है।',
    moralLesson: 'अहंकार और धन से बड़ा धर्म और भाईचारा है। करम वृक्ष प्रकृति व सुख-समृद्धि का प्रतीक है।',
    paragraphs: [
      {
        devanagari: 'मिद् आतो रे बार बोयेहा किन् ताहेकाना—मारांगिज दो करमा आर हुड़िञिज दो धरमा। करमा दो दाड़े-धोन ते मोने बाड़िजेना।',
        roman: 'Mid ato re bar boyeha kin tahekana—Marangij do Karma ar Huringij do Dharma. Karma do dare-dhon te mone barijena.',
        hindi: 'एक संताल गांव में दो सगे भाई रहते थे—बड़ा भाई करमा और छोटा भाई धरमा। बड़ा भाई धन के घमंड में चूर हो गया।'
      },
      {
        devanagari: 'करम परोब दिन धरमा दो जाहेर खोन करम दार साजाव काते आगे केदा, मेनखान करमा दो करम दार गाडा रे साडी गीडिकादा।',
        roman: 'Karam parab din Dharma do jaher khon karam dar sajaw kate age keda, menkhan Karma do karam dar gada re sadi gidikada.',
        hindi: 'करम पर्व के दिन धरमा ने भक्ति से करम की डाल लाकर स्थापित की, किंतु अहंकारी करमा ने उसे नदी में बहा दिया।'
      },
      {
        devanagari: 'ओना तायोम करमा वाक जोतो धोन-संपति नष्टेना। उनजोखोय उनी दो धरमा वाक कथा आंजोम काते गाडा खोन करम दार सेन्द्रा केदाय।',
        roman: 'Ona tayom Karma wak joto dhon-sampati nashtena. Unjokhoy uni do Dharma wak katha anjom kate gada khon karam dar sendra keday.',
        hindi: 'इसके बाद करमा की सारी धन-दौलत नष्ट हो गई। तब उसने पश्चाताप किया और नदी में दूर तक जाकर करम डाल को खोज निकाला।'
      },
      {
        devanagari: 'करमा दो सागुन मोने ते करम गोसांय सेवा केदाय आर आतो-दिशोम रे रासका हिजेना। ओना ते तेहेंजो अबो करम परोब बोन मानावा।',
        roman: 'Karma do sagun mone te Karam Gosai sewa keday ar ato-disom re raska hijena. Ona te tehenjo abo Karam Parab bon manawa.',
        hindi: 'करमा ने पवित्र मन से करम देव की पूजा की और पुनः सुख-समृद्धि लौट आई। इसीलिए आज भी हम सब करम पर्व श्रद्धा से मनाते हैं।'
      }
    ]
  },
  {
    id: 'seven_brothers',
    titleDev: 'एया बोयेहा आर चंपावती (सात भाई व बहन)',
    titleRoman: 'Eya Boyeha ar Champawati',
    genre: 'पारंपरिक संताली करुण-अमर लोकगाथा',
    durationMinutes: 9,
    synopsisHindi: 'सात भाइयों की एक इकलौती लाडली बहन की करुण गाथा। उसकी समाधि से निकला बांस का पेड़ और जब उससे तिरयो (बांसुरी) बनी, तो वह पुनः जीवित हो उठी।',
    moralLesson: 'सच्चा स्नेह और पवित्र आत्मा कभी नहीं मरती, वह संगीत और प्रकृति के रूप में अमर रहती है।',
    paragraphs: [
      {
        devanagari: 'एया बोयेहा रीन मिद् ताहेकाना दुलड़िञ मिसी। उनी दो जोतो खोन सुन्दरी आर दयालु कुड़ी ताहेकाना।',
        roman: 'Eya boyeha rin mid tahekana dulrin misi. Uni do joto khon sundari ar dayalu kuri tahekana.',
        hindi: 'सात भाइयों की एक अत्यंत लाडली बहन थी। वह बहुत रूपवती, दयालु और मीठी वाणी वाली कन्या थी।'
      },
      {
        devanagari: 'भावजी कोवाक इर्ष्या ते उनी दो बीर रे आद्-बाड़िजेना। मेनखान उनीयाक समाधि ठांव रे मिद् माद् (बांस) जोमोएना।',
        roman: 'Bhawji kowak irshya te uni do bir re ad-barijena. Menkhan uniyak samadhi thawn re mid mad (bans) jomoena.',
        hindi: 'ईर्ष्यालु भाभियों के छल से वह घने जंगल में खो गई। किंतु जिस स्थान पर वह समाई, वहां एक अत्यंत सुंदर बांस का पौधा उग आया।'
      },
      {
        devanagari: 'मिद् तिरयो ओरोङिज (बांसुरी वादक) उनी माद् खोन तिरयो बेनाव केदाय। तिरयो ओरोङ जोखोय उनी मिसी वाक सेरेञ साड़ेया।',
        roman: 'Mid tiryo orongij (bansuri vadak) uni mad khon tiryo benaw keday. Tiryo orong jokhoy uni misi wak sereng sareya.',
        hindi: 'एक संताली बांसुरी वादक ने उस बांस से एक तिरयो (बांसुरी) बनाई। जब भी बांसुरी बजती, उसमें से उस बहन का मधुर गायन सुनाई देता।'
      },
      {
        devanagari: 'मुचात् रे उनी दो तिरयो खोन ओड़ोक काते नावा जियान ञाम केदाय आर बोयेहा को सांवते सुख ते ताहेना।',
        roman: 'Muchat re uni do tiryo khon orok kate nawa jiyan nyam keday ar boyeha ko sanwte sukh te tahena.',
        hindi: 'अंततः उस बांसुरी के भीतर से वह कन्या पुनः प्रकट हुई और भाइयों के साथ सुखपूर्वक रहने लगी।'
      }
    ]
  },
  {
    id: 'sido_kanhu_hul',
    titleDev: 'सिदो-कान्हू आर हुल रेयाक बिगुल (अमर हुल गाथा)',
    titleRoman: 'Sido-Kanhu ar Hul reyak Bigul',
    genre: 'ऐतिहासिक अमर क्रांति गाथा',
    durationMinutes: 8,
    synopsisHindi: '१८५५ में भोगनाडीह में सिदो-कान्हू, चांद-भैरव और फूलो-झानो ने अंग्रेजों और महाजनों के अत्याचार के विरुद्ध दस हजार संतालों को एकत्र कर आजादी का शंखनाद किया।',
    moralLesson: 'अपनी मातृभूमि, अस्मिता और स्वशासन के लिए अन्याय के आगे कभी न झुकना।',
    paragraphs: [
      {
        devanagari: 'भोगनाडीह आतो रे चुनू मुर्मू रीन पुन कोड़ा—सिदो, कान्हू, चांद आर भैरव। अंग्रेज आर महाजन कोवाक जुल्म अडी बाड़िजेना।',
        roman: 'Bhognadih ato re Chunu Murmu rin pun korda—Sido, Kanhu, Chand ar Bhairav. Angrej ar Mahajan kowak julm adi barijena.',
        hindi: 'भोगनाडीह गांव में चुनू मुर्मू के चार वीर पुत्र थे—सिदो, कान्हू, चांद और भैरव। उस समय अंग्रेजों और महाजनों का अत्याचार चरम पर था।'
      },
      {
        devanagari: '३० जून १८५५ रे सिदो-कान्हू दो दस हजार होड़ को भोगनाडीह रे जावरा केत् कोवा आर साल दार (सारजोम) साकाम् कुल काते हुल डाकाव केदाकिन्।',
        roman: '30 June 1855 re Sido-Kanhu do das hazar hor ko Bhognadih re jawra ket kowa ar sal dar sakam kul kate Hul dakaw kedakin.',
        hindi: '३० जून १८५५ को सिदो-कान्हू ने दस हजार संतालों को भोगनाडीह में एकत्रित किया और साल के पत्तों की डाली भेजकर हुल (क्रांति) का आह्वान किया।'
      },
      {
        devanagari: 'आ-सार आर तरवाड़ी साब् काते अबोवाक दिसोम अबोवाक राज घोषणा केदाकिन्। फूलो-झानो मिसिकिन् हों बीर लेका किन् लड़ौएना।',
        roman: 'Aa-sar ar tarwari sab kate Abowak Disom Abowak Raj ghoshna kedakin. Phulo-Jhano misikin hon bir leka kin lardawena.',
        hindi: 'तीर-धनुष और तलवारें थामकर उन्होंने नारा दिया—"अपना देश, अपना राज!" उनकी वीरांगना बहनें फूलो और झानो ने भी शत्रु सेना के दांत खट्टे किए।'
      },
      {
        devanagari: 'सिदो-कान्हू वाक बलिदान दो अबोवाक मोने रे सांवता आर पारसी बांचाव रेयाक दाड़े एम आबो काना।',
        roman: 'Sido-Kanhu wak balidan do abowak mone re sawnta ar parsi banchaw reyak dare em abo kana.',
        hindi: 'सिदो-कान्हू का अमर बलिदान आज भी हमारी भाषा, संस्कृति और स्वशासन के संरक्षण की सबसे बड़ी प्रेरणा है।'
      }
    ]
  }
];

export const SantaliFolkRadio: React.FC = () => {
  const [selectedStoryId, setSelectedStoryId] = useState<string>('creation_myth');
  const [isPlayingStory, setIsPlayingStory] = useState<boolean>(false);
  const [isAmbientOn, setIsAmbientOn] = useState<boolean>(true);
  const [ambientVolume, setAmbientVolume] = useState<number>(0.35);
  const [activeParaIndex, setActiveParaIndex] = useState<number>(0);

  // Audio Context Ref for Ambient Forest Soundscape
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const ambientOscsRef = useRef<OscillatorNode[]>([]);
  const ambientIntervalRef = useRef<number | null>(null);
  const ambientNoiseRef = useRef<AudioBufferSourceNode | null>(null);

  const selectedStory =
    FOLK_RADIO_STORIES.find((s) => s.id === selectedStoryId) || FOLK_RADIO_STORIES[0];

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtxClass();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Start / Stop Synthesized Ambient Forest Sounds (Wind, Stream & Forest Crickets)
  useEffect(() => {
    if (!isAmbientOn) {
      if (ambientGainRef.current) {
        ambientGainRef.current.gain.value = 0;
      }
      if (ambientIntervalRef.current) clearInterval(ambientIntervalRef.current);
      return;
    }

    try {
      const ctx = getAudioContext();
      const masterAmbientGain = ctx.createGain();
      masterAmbientGain.gain.setValueAtTime(ambientVolume, ctx.currentTime);
      masterAmbientGain.connect(ctx.destination);
      ambientGainRef.current = masterAmbientGain;

      // 1. Soft Forest Breeze / River Noise
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.value = 450;
      bandpass.Q.value = 1.2;

      const windGain = ctx.createGain();
      windGain.gain.value = 0.18;

      whiteNoise.connect(bandpass);
      bandpass.connect(windGain);
      windGain.connect(masterAmbientGain);
      whiteNoise.start();
      ambientNoiseRef.current = whiteNoise;

      // 2. Periodic Crickets (Forest Night Chirping)
      ambientIntervalRef.current = window.setInterval(() => {
        if (!isAmbientOn || !audioCtxRef.current) return;
        try {
          const chirpTime = audioCtxRef.current.currentTime;
          const osc = audioCtxRef.current.createOscillator();
          const chirpGain = audioCtxRef.current.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(4200, chirpTime);
          osc.frequency.exponentialRampToValueAtTime(4800, chirpTime + 0.08);

          chirpGain.gain.setValueAtTime(0.06, chirpTime);
          chirpGain.gain.exponentialRampToValueAtTime(0.001, chirpTime + 0.1);

          osc.connect(chirpGain);
          chirpGain.connect(masterAmbientGain);
          osc.start(chirpTime);
          osc.stop(chirpTime + 0.12);
        } catch {
          // ignore audio transient
        }
      }, 1200);
    } catch {
      // Audio fallback
    }

    return () => {
      if (ambientIntervalRef.current) clearInterval(ambientIntervalRef.current);
      // Stop the looping noise source so toggling / leaving the tab doesn't leave sound running
      try { ambientNoiseRef.current?.stop(); } catch { /* already stopped */ }
      ambientNoiseRef.current = null;
      try { ambientGainRef.current?.disconnect(); } catch { /* ignore */ }
    };
  }, [isAmbientOn]);

  // Release the AudioContext and any speech when the module unmounts
  useEffect(() => {
    return () => {
      if (ambientIntervalRef.current) clearInterval(ambientIntervalRef.current);
      try { window.speechSynthesis?.cancel(); } catch { /* ignore */ }
      audioCtxRef.current?.close().catch(() => {});
      audioCtxRef.current = null;
    };
  }, []);

  // Handle ambient volume change
  useEffect(() => {
    if (ambientGainRef.current && audioCtxRef.current) {
      ambientGainRef.current.gain.setValueAtTime(
        isAmbientOn ? ambientVolume : 0,
        audioCtxRef.current.currentTime
      );
    }
  }, [ambientVolume, isAmbientOn]);

  const handleReadParagraph = (paraIndex: number) => {
    setActiveParaIndex(paraIndex);
    const para = selectedStory.paragraphs[paraIndex];
    if (para) {
      speakWithFemaleVoice(para.devanagari);
    }
  };

  const handleReadFullStory = () => {
    setIsPlayingStory(true);
    setActiveParaIndex(0);
    const fullStoryDev = selectedStory.paragraphs.map((p) => p.devanagari).join(' ');
    speakWithFemaleVoice(
      `${selectedStory.titleDev}। ${fullStoryDev}। शिक्षा: ${selectedStory.moralLesson}`
    );
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Radio Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-stone-900 to-amber-950 text-white p-6 sm:p-8 border border-emerald-800/40 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs font-bold border border-emerald-500/30">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>होर का़हनी अखाड़ा — पारंपरिक लोककथा रेडियो</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              संताली लोककथा रेडियो व एम्बिएंट स्टोरीटेलिंग
            </h1>
            <p className="text-emerald-200/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              जंगल की रात, बहती नदी व तिरयो (बांसुरी) के शांत वातावरण के साथ संताली लोककथाएं सुनें। अमर ऐतिहासिक गाथाओं व लोकनीति का सचित्र त्रिभाषीय पाठ।
            </p>
          </div>

          {/* Ambient Controls */}
          <div className="bg-stone-900/90 p-4 rounded-2xl border border-white/10 space-y-3 shrink-0 sm:w-64">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5" />
                जंगल एम्बिएंट साउंड:
              </span>
              <button
                onClick={() => setIsAmbientOn(!isAmbientOn)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                  isAmbientOn
                    ? 'bg-emerald-500 text-stone-950'
                    : 'bg-stone-800 text-stone-400'
                }`}
              >
                {isAmbientOn ? 'चालू (ON)' : 'बंद (OFF)'}
              </button>
            </div>

            {isAmbientOn && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-stone-400">
                  <span>ध्वनि वॉल्यूम</span>
                  <span>{Math.round(ambientVolume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.8"
                  step="0.05"
                  value={ambientVolume}
                  onChange={(e) => setAmbientVolume(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Studio 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Story Selector List (Left 4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 px-1">
            <span>लोककथाएं चुनें ({FOLK_RADIO_STORIES.length})</span>
            <span className="text-amber-700">ऑडियो वाचन</span>
          </div>

          {FOLK_RADIO_STORIES.map((story) => {
            const isSelected = selectedStory.id === story.id;
            return (
              <button
                key={story.id}
                onClick={() => {
                  setSelectedStoryId(story.id);
                  setActiveParaIndex(0);
                  setIsPlayingStory(false);
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-300/40 shadow-sm'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      {story.genre.split(' ')[0]}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 mt-1.5">
                      {story.titleDev}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {story.synopsisHindi}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Story Display & Reader (Right 8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {/* Story Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                {selectedStory.genre}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                {selectedStory.titleDev}
              </h2>
              <div className="text-xs font-mono text-slate-500">
                रोमन: {selectedStory.titleRoman}
              </div>
            </div>

            <button
              onClick={handleReadFullStory}
              className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center gap-2 shadow-md cursor-pointer transition-all hover:scale-105 shrink-0"
            >
              <Volume2 className="w-4 h-4 text-stone-950" />
              <span>पूरी कथा सुनें (Play Story)</span>
            </button>
          </div>

          {/* Story Synopsis */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <strong className="text-slate-900 block mb-1">कथा परिचय:</strong>
            {selectedStory.synopsisHindi}
          </div>

          {/* Paragraphs Reader */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-slate-500 flex items-center justify-between">
              <span>कथा प्रसंग (अनुच्छेद पर क्लिक करके ऑडियो सुनें):</span>
              <span>{selectedStory.paragraphs.length} प्रसंग</span>
            </div>

            {selectedStory.paragraphs.map((para, idx) => {
              const isSelected = activeParaIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => handleReadParagraph(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-300/40 shadow-xs'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2 flex-1">
                      {/* Devanagari */}
                      <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                        {para.devanagari}
                      </p>
                      {/* Roman Phonetics */}
                      <p className="text-xs sm:text-sm font-mono text-amber-900">
                        {para.roman}
                      </p>
                      {/* Hindi Translation */}
                      <p className="text-xs sm:text-sm text-slate-600 italic">
                        हिंदी: {para.hindi}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReadParagraph(idx);
                      }}
                      className="p-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors shrink-0 cursor-pointer"
                      title="यह प्रसंग सुनें"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Moral Lesson Footer */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 flex items-start gap-3">
            <Heart className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-emerald-900 font-bold mb-0.5">
                पारंपरिक लोक-शिक्षा व जीवन-संदेश:
              </strong>
              {selectedStory.moralLesson}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
