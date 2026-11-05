import React, { useState, useEffect, useRef } from 'react';
import {
  Music,
  Play,
  Square,
  Volume2,
  VolumeX,
  Mic,
  RotateCcw,
  Sparkles,
  BookOpen,
  Sliders,
  Radio,
  Flame,
  Award,
  Share2,
  Info
} from 'lucide-react';
import { speakWithFemaleVoice } from '../utils/speech';

export interface RhythmPattern {
  id: string;
  nameDev: string;
  nameRoman: string;
  timeSignature: string;
  defaultBpm: number;
  description: string;
  tag: string;
  // Steps of 16th notes or 8th notes (1: Tumdak bass, 2: Tumdak rim, 3: Tamak strike, 4: Ghanta, 0: Rest)
  steps: number[];
}

export interface FolkSong {
  id: string;
  titleDev: string;
  titleRoman: string;
  genre: string;
  associatedRhythm: string;
  meaningHindi: string;
  lines: {
    devanagari: string;
    roman: string;
    hindi: string;
  }[];
}

export const RHYTHM_PATTERNS: RhythmPattern[] = [
  {
    id: 'lagne',
    nameDev: 'लांगड़े ताल (Lagne Enak)',
    nameRoman: 'Lagne Sereng',
    timeSignature: '4/4',
    defaultBpm: 104,
    description: 'गांव के अखड़ा में हर शाम बजने वाला आनंदमय और सामूहिक संताली लोकनृत्य ताल।',
    tag: 'अखड़ा सामूहिक नृत्य',
    steps: [1, 3, 2, 0, 1, 3, 3, 2] // 8 eighth-note steps
  },
  {
    id: 'donger',
    nameDev: 'दोंगेड़ ताल (Donger)',
    nameRoman: 'Donger Sereng',
    timeSignature: '6/8',
    defaultBpm: 116,
    description: 'घने जंगलों, शिकार यात्राओं और विवाह में गाए जाने वाले गीतों का तीव्र व ओजस्वी ताल।',
    tag: 'वन व शिकार ताल',
    steps: [1, 0, 3, 2, 0, 3] // 6 steps
  },
  {
    id: 'sohrai',
    nameDev: 'सोहराय ताल (Sohrai)',
    nameRoman: 'Sohrai Sereng',
    timeSignature: '3/4',
    defaultBpm: 96,
    description: 'फसल कटाई और पशुधन सम्मान के महापर्व सोहराय में बजने वाला उल्लासपूर्ण ताल।',
    tag: 'गौ-वंदना व फसल',
    steps: [1, 2, 3, 1, 3, 2]
  },
  {
    id: 'karam',
    nameDev: 'करम ताल (Karam Binti)',
    nameRoman: 'Karam Sereng',
    timeSignature: '4/4',
    defaultBpm: 108,
    description: 'करम डाल की पूजा, भाई-बहन के अटूट स्नेह और प्रकृति वंदना का पावन भक्तिमय ताल।',
    tag: 'प्रकृति व भाई-बहन',
    steps: [1, 0, 2, 3, 1, 2, 3, 0]
  },
  {
    id: 'dahar',
    nameDev: 'डाहर ताल (Dahar)',
    nameRoman: 'Dahar Sereng',
    timeSignature: '2/4',
    defaultBpm: 82,
    description: 'रास्ते पर चलते समय, बारात आगमन और शांत भाव से गाए जाने वाले आध्यात्मिक पद।',
    tag: 'मार्ग व गंभीर पद',
    steps: [1, 0, 3, 2]
  }
];

export const FOLK_SONGS: FolkSong[] = [
  {
    id: 'song-1',
    titleDev: 'सारजोम बाहा फुटावेना (साल फूल खिल उठे)',
    titleRoman: 'Sarjom Baha Phutawena',
    genre: 'बाहा सेरेंग (वसंत लोकगीत)',
    associatedRhythm: 'lagne',
    meaningHindi: 'वसंत ऋतु में सखुआ (साल) के फूल खिल उठे हैं, जाहेर थान में बोंगा-बुरु की पूजा होगी और पूरा गांव उमंग में नाचेगा।',
    lines: [
      {
        devanagari: 'सारजोम बाहा फुटावेना रे दिशोम दो,',
        roman: 'Sarjom baha phutawena re disom do,',
        hindi: 'देश और जंगलों में साल के फूल खिल उठे हैं,'
      },
      {
        devanagari: 'जाहेर थान रे मारांग बुरु थुम एमाले,',
        roman: 'Jaher than re Marang Buru thum emale,',
        hindi: 'जाहेर थान में मारांग बुरु हमें पावन आशीर्वाद प्रदान कर रहे हैं,'
      },
      {
        devanagari: 'तुमाक तामाक साड़े काना कुल्ही-कुल्ही,',
        roman: 'Tumdak tamak sare kana kulhi-kulhi,',
        hindi: 'गांव की हर कुलही (सड़क) में मांदर और नगाड़ा गूंज रहा है,'
      },
      {
        devanagari: 'आबो दो लांगड़े एनाक् बोन एनेजा।',
        roman: 'Abo do Lagne enak bon eneja.',
        hindi: 'हम सब मिलकर आनंद से लांगड़े नृत्य करेंगे।'
      }
    ]
  },
  {
    id: 'song-2',
    titleDev: 'सोहराय दिन दो हिजुक् काना (सोहराय का आगमन)',
    titleRoman: 'Sohrai Din Do Hijuk Kana',
    genre: 'सोहराय सेरेंग (पशु वंदना)',
    associatedRhythm: 'sohrai',
    meaningHindi: 'धान की नई फसल आ गई है, गाय-बैलों को सजाने और मांदर की थाप पर घर-घर नाचने का समय आ गया है।',
    lines: [
      {
        devanagari: 'सोहराय दिन दो हिजुक् काना गाते रे,',
        roman: 'Sohrai din do hijuk kana gate re,',
        hindi: 'हे सखी! सोहराय का महापर्व आ रहा है,'
      },
      {
        devanagari: 'गाय काड़ा गोड़ा रेबो सिंदूर दाया,',
        roman: 'Gay karda gora rebo sindur daya,',
        hindi: 'गौशाला में गाय और बैलों के सींगों पर हम सिंदूर लगाएंगे,'
      },
      {
        devanagari: 'ओड़ाक-ओड़ाक पिठा-लेतो इसिनोगा,',
        roman: 'Orak-orak pitha-leto isinoga,',
        hindi: 'घर-घर में स्वादिष्ट पीठा और लेटो पकेंगे,'
      },
      {
        devanagari: 'आतो-दिशोम रासका ते पेरेजोगा।',
        roman: 'Ato-disom raska te perejoga.',
        hindi: 'समस्त गांव और देश आनंद से भर उठेगा।'
      }
    ]
  },
  {
    id: 'song-3',
    titleDev: 'चेतान टोला बाबाजी (अखड़ा लांगड़े)',
    titleRoman: 'Chetan Tola Babaji',
    genre: 'लांगड़े सेरेंग (युवा लोकगीत)',
    associatedRhythm: 'lagne',
    meaningHindi: 'ऊपरी टोले के मांझी और युवक अखड़ा में आ गए हैं, तुमाक की मधुर थाप पर कदम से कदम मिलाकर सब झूम रहे हैं।',
    lines: [
      {
        devanagari: 'चेतान टोला बाबाजी अखड़ा ते हेयना,',
        roman: 'Chetan tola babaji akhra te heyena,',
        hindi: 'ऊपरी टोले के आदरणीय जन अखड़ा में पधारे हैं,'
      },
      {
        devanagari: 'तिरयो साड़े काना झार-झार गे,',
        roman: 'Tiryo sare kana jhar-jhar ge,',
        hindi: 'बांसुरी की धुन हवा में मधुरता घोल रही है,'
      },
      {
        devanagari: 'ति रे ति साब् काते लांगड़े बोन एनेजा,',
        roman: 'Ti re ti sab kate Lagne bon eneja,',
        hindi: 'हाथ में हाथ थामकर हम सब लांगड़े नाचेंगे,'
      },
      {
        devanagari: 'निदा दो पारोमोक रासका तेगे।',
        roman: 'Nida do paromok raska tege.',
        hindi: 'यह चांदनी रात उमंग और खुशियों में बीत जाएगी।'
      }
    ]
  },
  {
    id: 'song-4',
    titleDev: 'करम दार दो सागुन दार (करम वंदना)',
    titleRoman: 'Karam Dar Do Sagun Dar',
    genre: 'करम सेरेंग (भक्ति वंदना)',
    associatedRhythm: 'karam',
    meaningHindi: 'करम की डाली शुभ और कल्याणकारी है, बहनें अपने भाइयों की लंबी उम्र और सुख-शांति के लिए जावा डाली की पूजा करती हैं।',
    lines: [
      {
        devanagari: 'करम दार दो सागुन दार रे,',
        roman: 'Karam dar do sagun dar re,',
        hindi: 'करम वृक्ष की यह शाखा अति मंगलकारी है,'
      },
      {
        devanagari: 'जावा डाली साजाव काते बोन सेवाया,',
        roman: 'Jawa dali sazaw kate bon sewaya,',
        hindi: 'जावा डाली को सजाकर हम करम देवता की उपासना करते हैं,'
      },
      {
        devanagari: 'बोयेहा मिसी थुम दो चालाय मा,',
        roman: 'Boyeha misi thum do chalay ma,',
        hindi: 'भाई और बहन के स्नेह पर ईश्वर का आशीष बरसे,'
      },
      {
        devanagari: 'अबोवाक दिसोम रे सुख ताहेन् मा।',
        roman: 'Abowak disom re sukh tahen ma.',
        hindi: 'हमारे समाज और राष्ट्र में सदा शांति रहे।'
      }
    ]
  },
  {
    id: 'song-5',
    titleDev: 'बीर दिशोम रे सेंदरा (शिकार व वीर गाथा)',
    titleRoman: 'Bir Disom Re Sendra',
    genre: 'दोंगेड़ व सेंदरा सेरेंग',
    associatedRhythm: 'donger',
    meaningHindi: 'अयोध्या पहाड़ और घने जंगलों में वीरों का सेंदरा (पारंपरिक शिकार) शुरू हो गया है, तीर-धनुष की टंकार से वन गूंज रहा है।',
    lines: [
      {
        devanagari: 'बीर दिशोम रे सेंदरा दो होयोवेना,',
        roman: 'Bir disom re sendra do hoyowena,',
        hindi: 'घने वनों में पारंपरिक सेंदरा की घोषणा हो चुकी है,'
      },
      {
        devanagari: 'आ-सार साब् काते कोड़ा को ओड़ोकना,',
        roman: 'Aa-sar sab kate korda ko orokna,',
        hindi: 'तीर-कमान थामे वीर युवक प्रस्थान कर चुके हैं,'
      },
      {
        devanagari: 'लोबीर बैसी रे विचार दो होयोगा,',
        roman: 'Lobir baisi re vichar do hoyoga,',
        hindi: 'रात्रि में सर्वोच्च लोबीर अदालत में न्याय होगा,'
      },
      {
        devanagari: 'अबोवाक नियम-धोरम साबो बोन।',
        roman: 'Abowak niyam-dhorom sabo bon.',
        hindi: 'हम अपने पूर्वजों के धर्म और नियमों की रक्षा करेंगे।'
      }
    ]
  }
];

export const SantaliSerengKaraoke: React.FC = () => {
  const [selectedRhythmId, setSelectedRhythmId] = useState<string>('lagne');
  const [selectedSongId, setSelectedSongId] = useState<string>('song-1');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [bpm, setBpm] = useState<number>(104);
  const [volume, setVolume] = useState<number>(0.8);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [activeLineIndex, setActiveLineIndex] = useState<number>(0);

  // Audio Context & Mic
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const [isMicActive, setIsMicActive] = useState<boolean>(false);
  const [micLevel, setMicLevel] = useState<number>(0);
  const micStreamRef = useRef<MediaStream | null>(null);
  const micAnalyserRef = useRef<AnalyserNode | null>(null);
  const micAnimRef = useRef<number | null>(null);

  const selectedRhythm = RHYTHM_PATTERNS.find((r) => r.id === selectedRhythmId) || RHYTHM_PATTERNS[0];
  const selectedSong = FOLK_SONGS.find((s) => s.id === selectedSongId) || FOLK_SONGS[0];

  // Initialize or get AudioContext
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Sound Synthesizer: Tumdak (Resonant mud drum)
  const triggerTumdak = (accent: boolean) => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // Bass punch oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      const startFreq = accent ? 140 : 110;
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + (accent ? 0.28 : 0.22));

      gain.gain.setValueAtTime(volume * (accent ? 0.9 : 0.65), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (accent ? 0.32 : 0.24));

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);

      // Acoustic leather slap transient
      const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.008));
      }
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = accent ? 800 : 650;
      noiseFilter.Q.value = 2.5;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(volume * 0.4, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noiseSource.start(now);
    } catch {
      // Audio fallback
    }
  };

  // Sound Synthesizer: Tamak (Sharp brass kettle drum with sticks)
  const triggerTamak = () => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // Sharp resonant ring
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.12);

      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 400;

      gain.gain.setValueAtTime(volume * 0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Audio fallback
    }
  };

  // Drum sound trigger based on step value
  const playStepSound = (soundCode: number) => {
    if (soundCode === 1) {
      triggerTumdak(true); // Tumdak bass accent
    } else if (soundCode === 2) {
      triggerTumdak(false); // Tumdak soft tap
    } else if (soundCode === 3) {
      triggerTamak(); // Tamak strike
    }
  };

  // Handle Play / Stop Rhythm Loop
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      setCurrentStep(0);
      return;
    }

    const stepIntervalMs = (60 / bpm / 2) * 1000; // 8th note subdivisions
    let step = 0;

    timerRef.current = window.setInterval(() => {
      const stepValue = selectedRhythm.steps[step % selectedRhythm.steps.length];
      playStepSound(stepValue);
      setCurrentStep(step % selectedRhythm.steps.length);
      step++;
    }, stepIntervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, bpm, selectedRhythm, volume]);

  // Update default BPM when rhythm changes
  const handleRhythmChange = (rhythmId: string) => {
    setSelectedRhythmId(rhythmId);
    const found = RHYTHM_PATTERNS.find((r) => r.id === rhythmId);
    if (found) setBpm(found.defaultBpm);
  };

  // Microphone toggle for sing-along
  const toggleMicrophone = async () => {
    if (isMicActive) {
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (micAnimRef.current) cancelAnimationFrame(micAnimRef.current);
      setIsMicActive(false);
      setMicLevel(0);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        micStreamRef.current = stream;
        const ctx = getAudioContext();
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        micAnalyserRef.current = analyser;
        setIsMicActive(true);

        const checkVolume = () => {
          if (!micAnalyserRef.current) return;
          const dataArray = new Uint8Array(micAnalyserRef.current.frequencyBinCount);
          micAnalyserRef.current.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const avg = sum / dataArray.length;
          setMicLevel(Math.min(100, Math.round((avg / 128) * 100)));
          micAnimRef.current = requestAnimationFrame(checkVolume);
        };
        checkVolume();
      } catch {
        alert('माइक्रोफ़ोन अनुमति नहीं मिल पाई। आप बिना माइक के भी ताल बजाकर साथ गा सकते हैं!');
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (micAnimRef.current) cancelAnimationFrame(micAnimRef.current);
      audioCtxRef.current?.close().catch(() => {});
      audioCtxRef.current = null;
    };
  }, []);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-900 via-rose-950 to-stone-900 text-white p-6 sm:p-8 border border-amber-800/40 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-lg text-xs font-bold border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>पारंपरिक तुमाक-तामाक ताल व कराओके स्टूडियो</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              संताली सेरेंग कराओके व ताल अखाड़ा
            </h1>
            <p className="text-amber-200/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              तुमाक (मांदर) व तामाक (नगाड़ा) की वास्तविक थाप के साथ पारंपरिक संताली लोकगीत गाएं। गीत के बोल, उच्चारण और हिंदी अर्थ के साथ वास्तविक ताल लूप पर अभ्यास करें।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg cursor-pointer text-base ${
                isPlaying
                  ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                  : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
              }`}
            >
              {isPlaying ? (
                <>
                  <Square className="w-5 h-5 fill-current" />
                  <span>ताल रोकें (Stop Loop)</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  <span>ताल बजाएं (Play Rhythm)</span>
                </>
              )}
            </button>

            <button
              onClick={toggleMicrophone}
              className={`px-4 py-3 rounded-2xl font-bold flex items-center gap-2 border transition-all cursor-pointer text-sm ${
                isMicActive
                  ? 'bg-emerald-600 border-emerald-400 text-white'
                  : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>{isMicActive ? 'माइक सक्रिय (Active)' : 'माइक कनेक्ट करें'}</span>
            </button>
          </div>
        </div>

        {/* Live Mic Level Bar */}
        {isMicActive && (
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-3 text-xs">
            <span className="text-emerald-300 font-bold">आपकी आवाज़ (Mic Input):</span>
            <div className="flex-1 bg-stone-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 transition-all duration-75"
                style={{ width: `${micLevel}%` }}
              />
            </div>
            <span className="font-mono text-emerald-300">{micLevel}%</span>
          </div>
        )}
      </div>

      {/* Main Two-Column Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Rhythm Controller (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Rhythm Selector Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Radio className="w-5 h-5 text-amber-600" />
                <span>पारंपरिक संताली ताल चुनें (Select Rhythm)</span>
              </h2>
              <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full">
                {selectedRhythm.timeSignature}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {RHYTHM_PATTERNS.map((rhythm) => (
                <button
                  key={rhythm.id}
                  onClick={() => handleRhythmChange(rhythm.id)}
                  className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedRhythmId === rhythm.id
                      ? 'bg-amber-500/10 border-amber-500 text-amber-950 font-bold ring-2 ring-amber-400/20'
                      : 'border-slate-200 hover:border-amber-300 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-slate-900">{rhythm.nameDev}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{rhythm.tag}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-lg">
                      {rhythm.defaultBpm} BPM
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Rhythm Description Box */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-900 block mb-1">सांस्कृतिक महत्व:</strong>
              {selectedRhythm.description}
            </div>

            {/* Beat Visualizer Steps */}
            <div>
              <div className="text-xs font-bold text-slate-500 mb-2 flex items-center justify-between">
                <span>सक्रिय ताल बीट (Beat Tracker)</span>
                <span className="font-mono">{currentStep + 1} / {selectedRhythm.steps.length}</span>
              </div>
              <div className="grid grid-cols-8 gap-1.5">
                {selectedRhythm.steps.map((stepVal, idx) => {
                  const isActive = isPlaying && currentStep === idx;
                  const isBass = stepVal === 1;
                  const isTamak = stepVal === 3;
                  return (
                    <div
                      key={idx}
                      className={`h-10 rounded-xl flex flex-col items-center justify-center font-bold text-[10px] transition-all duration-75 ${
                        isActive
                          ? 'bg-amber-500 text-stone-950 scale-105 shadow-md ring-2 ring-amber-300'
                          : isBass
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : isTamak
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      <span>{idx + 1}</span>
                      <span className="text-[8px] font-normal">
                        {stepVal === 1 ? 'तुमाक' : stepVal === 3 ? 'तामाक' : stepVal === 2 ? 'थाप' : '-'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Controls: Tempo (BPM) & Volume */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-amber-600" />
                    गति (Tempo / BPM):
                  </span>
                  <span className="font-mono text-amber-700 text-sm">{bpm} BPM</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="160"
                  value={bpm}
                  onChange={(e) => setBpm(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                    मांदर ध्वनि वॉल्यूम:
                  </span>
                  <span className="font-mono text-slate-600">{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Song Lyrics & Karaoke Display (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-6">
            {/* Song Selector Header */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl">
                  {selectedSong.genre}
                </span>
                <span className="text-xs text-slate-500">
                  गीत बोल व उच्चारण गाइड
                </span>
              </div>

              {/* Song Select Dropdown */}
              <select
                value={selectedSongId}
                onChange={(e) => {
                  setSelectedSongId(e.target.value);
                  const song = FOLK_SONGS.find((s) => s.id === e.target.value);
                  if (song) {
                    handleRhythmChange(song.associatedRhythm);
                  }
                }}
                className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 font-bold text-base focus:ring-2 focus:ring-amber-500 focus:outline-none cursor-pointer"
              >
                {FOLK_SONGS.map((song) => (
                  <option key={song.id} value={song.id}>
                    {song.titleDev} — {song.genre}
                  </option>
                ))}
              </select>
            </div>

            {/* Song Meaning & Background */}
            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs sm:text-sm text-amber-950 leading-relaxed">
              <strong className="block text-amber-900 font-bold mb-1">गीत का भावार्थ (Song Essence):</strong>
              {selectedSong.meaningHindi}
            </div>

            {/* Karaoke Line by Line Highlighted Cards */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>गीत की पंक्तियां (Sing-Along Lyrics)</span>
                <span>पंक्ति पर क्लिक करके उच्चारित सुनें</span>
              </div>

              {selectedSong.lines.map((line, idx) => {
                const isSelected = activeLineIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setActiveLineIndex(idx);
                      speakWithFemaleVoice(line.devanagari);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative group ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/5 border-amber-400 ring-2 ring-amber-300/40 shadow-sm'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1.5 flex-1">
                        {/* Devanagari Lyrics */}
                        <div className="text-base sm:text-lg font-bold text-slate-900">
                          {line.devanagari}
                        </div>
                        {/* Roman Phonetics */}
                        <div className="text-xs sm:text-sm font-mono text-amber-800">
                          {line.roman}
                        </div>
                        {/* Hindi Meaning */}
                        <div className="text-xs text-slate-600 italic">
                          अर्थ: {line.hindi}
                        </div>
                      </div>

                      <button
                        title="उच्चारण सुनें"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakWithFemaleVoice(line.devanagari);
                        }}
                        className="p-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors shrink-0 cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sing Along Tips */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-3 text-xs text-slate-600">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>गाने का संताली नियम:</strong> संताली लोकगीतों में समूह में एक-दूसरे के हाथ पकड़कर अर्द्धचंद्राकार कतार बनाई जाती है। आगे की पंक्ति पहली कड़ी गाती है, और पीछे की पंक्ति उसे दुहराती है (दोहो)।
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
