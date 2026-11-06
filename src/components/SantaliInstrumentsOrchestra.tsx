import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Download, Disc, Sparkles, Sliders, Info, Music2, Mic } from 'lucide-react';

interface InstrumentTrack {
  id: string;
  nameDev: string;
  nameRom: string;
  type: string;
  pattern: boolean[]; // 16-step sequencer pattern
  volume: number;
  muted: boolean;
  color: string;
  description: string;
}

const DEFAULT_RHYTHMS: Record<string, { name: string; bpm: number; tracks: Record<string, boolean[]> }> = {
  lagne: {
    name: 'लागणे ताल (Lagne Sereng)',
    bpm: 96,
    tracks: {
      tumdak: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, true, false],
      tamak: [false, false, true, false, false, false, true, false, false, false, true, false, false, true, false, true],
      banam: [true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false],
      tirio: [false, true, true, true, false, true, true, false, false, true, true, true, false, true, false, false],
      ghonghor: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false]
    }
  },
  sohrai: {
    name: 'सोहराय खूंटाव ताल (Sohrai Khuntau)',
    bpm: 124,
    tracks: {
      tumdak: [true, false, true, false, true, false, true, false, true, true, false, false, true, false, true, false],
      tamak: [true, true, false, true, true, true, false, true, true, true, false, true, true, true, true, true],
      banam: [false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true],
      tirio: [true, false, false, true, true, false, false, true, true, false, false, true, false, true, true, false],
      ghonghor: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
    }
  },
  karam: {
    name: 'करम विनती ताल (Karam Binti)',
    bpm: 88,
    tracks: {
      tumdak: [true, false, false, true, false, false, true, false, true, false, false, true, false, false, true, false],
      tamak: [false, false, true, false, false, true, false, false, false, false, true, false, false, true, false, false],
      banam: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
      tirio: [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true],
      ghonghor: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false]
    }
  }
};

export const SantaliInstrumentsOrchestra: React.FC = () => {
  const [selectedRhythm, setSelectedRhythm] = useState<'lagne' | 'sohrai' | 'karam'>('lagne');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [bpm, setBpm] = useState<number>(DEFAULT_RHYTHMS.lagne.bpm);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'orchestra' | 'instrument_lore'>('orchestra');
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const [tracks, setTracks] = useState<InstrumentTrack[]>([
    {
      id: 'tumdak',
      nameDev: 'तुम्दाक् (Tumdak\')',
      nameRom: 'Mridang Bass',
      type: 'माटी का द्विमूखी मांदर (Bass Drum)',
      pattern: DEFAULT_RHYTHMS.lagne.tracks.tumdak,
      volume: 0.85,
      muted: false,
      color: 'bg-amber-600',
      description: 'पक्की मिट्टी का खोल, चमड़े की छावनी व कांस्य के छल्ले। यह नृत्य की हृदय-धड़कन है।'
    },
    {
      id: 'tamak',
      nameDev: 'तामाक् (Tamak\')',
      nameRom: 'Iron Nagara',
      type: 'लोहे का अर्धगोलाकार नगाड़ा (Kettle Drum)',
      pattern: DEFAULT_RHYTHMS.lagne.tracks.tamak,
      volume: 0.75,
      muted: false,
      color: 'bg-rose-600',
      description: 'लोहे का कटोरा, भैंस की मोटी खाल और मुड़ी हुई छड़ियों से बजने वाली तीव्र झंकार।'
    },
    {
      id: 'banam',
      nameDev: 'बनाम (Banam)',
      nameRom: 'One-string Fiddle',
      type: 'काष्ठ का एकतारा सारंगी (Wooden Bowed Fiddle)',
      pattern: DEFAULT_RHYTHMS.lagne.tracks.banam,
      volume: 0.7,
      muted: false,
      color: 'bg-emerald-600',
      description: 'गुलहड़ या कुसुम की लकड़ी से बना मानव आकृति जैसा वाद्य, जो विरह व प्रेम की धुन निकालता है।'
    },
    {
      id: 'tirio',
      nameDev: 'तिरिओ (Tirio)',
      nameRom: 'Bamboo Flute',
      type: 'संताली बांसुरी (Bamboo Flute)',
      pattern: DEFAULT_RHYTHMS.lagne.tracks.tirio,
      volume: 0.8,
      muted: false,
      color: 'bg-cyan-600',
      description: 'सात छिद्रों वाली पतले वन-बांस की बंसी। वन के एकांत और गोचारण की मधुर धुन।'
    },
    {
      id: 'ghonghor',
      nameDev: 'घोंघोर (Ghonghor)',
      nameRom: 'Brass Bells',
      type: 'कांस्य के नर्तक घुंघरू (Brass Ankle Bells)',
      pattern: DEFAULT_RHYTHMS.lagne.tracks.ghonghor,
      volume: 0.65,
      muted: false,
      color: 'bg-yellow-500',
      description: 'पैरों में बंधे पीतल व कांसे के घुंघरू जो सामूहिक कदमताल में झंकार पैदा करते हैं।'
    }
  ]);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  // Initialize Audio Context on demand
  const getAudioContext = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Sound synthesis for each instrument type
  const triggerInstrumentSound = (instrumentId: string, vol: number) => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      if (instrumentId === 'tumdak') {
        // Deep clay drum boom
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.22);

        gain.gain.setValueAtTime(vol * 0.9, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (instrumentId === 'tamak') {
        // Sharp metallic slap / rim crack
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.08);

        gain.gain.setValueAtTime(vol * 0.8, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (instrumentId === 'banam') {
        // Bowed harmonic string tone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(260 + (currentStep % 4) * 35, now);

        gain.gain.setValueAtTime(vol * 0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.28);
      } else if (instrumentId === 'tirio') {
        // Sweet breathy flute melody
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const notes = [523.25, 587.33, 659.25, 783.99, 880];
        const pitch = notes[(currentStep * 2) % notes.length];
        osc.frequency.setValueAtTime(pitch, now);

        gain.gain.setValueAtTime(vol * 0.45, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (instrumentId === 'ghonghor') {
        // High shakers
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(4800, now);

        gain.gain.setValueAtTime(vol * 0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
      }
    } catch {
      // AudioContext fallback
    }
  };

  // Step Sequencer Loop
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const stepIntervalMs = (60 / bpm / 4) * 1000;

    timerRef.current = window.setInterval(() => {
      setCurrentStep(prev => {
        const nextStep = (prev + 1) % 16;

        // Play active tracks at this step
        tracks.forEach(track => {
          if (!track.muted && track.pattern[nextStep]) {
            triggerInstrumentSound(track.id, track.volume);
          }
        });

        return nextStep;
      });
    }, stepIntervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, bpm, tracks]);

  // Rhythm selection preset handler
  const handleSelectRhythm = (rhythmKey: 'lagne' | 'sohrai' | 'karam') => {
    setSelectedRhythm(rhythmKey);
    const cfg = DEFAULT_RHYTHMS[rhythmKey];
    setBpm(cfg.bpm);
    setTracks(prev =>
      prev.map(t => ({
        ...t,
        pattern: cfg.tracks[t.id] || t.pattern
      }))
    );
  };

  // Toggle step in pattern
  const togglePatternStep = (trackId: string, stepIdx: number) => {
    setTracks(prev =>
      prev.map(t => {
        if (t.id === trackId) {
          const newPat = [...t.pattern];
          newPat[stepIdx] = !newPat[stepIdx];
          return { ...t, pattern: newPat };
        }
        return t;
      })
    );
  };

  const toggleMute = (trackId: string) => {
    setTracks(prev =>
      prev.map(t => (t.id === trackId ? { ...t, muted: !t.muted } : t))
    );
  };

  const handleVolumeChange = (trackId: string, vol: number) => {
    setTracks(prev =>
      prev.map(t => (t.id === trackId ? { ...t, volume: vol } : t))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-rose-950 border border-amber-800/40 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-800/60 border border-amber-600/40 rounded-full text-xs font-semibold text-amber-200 mb-3">
            <Music2 className="w-3.5 h-3.5" />
            <span>संथाल वाद्ययंत्र ऑर्केस्ट्रा व लाइव लूपर (Santali Acoustic Sequencer)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-amber-100">
            रुया-गाबुर: ५ पारंपरिक संताली वाद्ययंत्र ऑर्केस्ट्रा
          </h1>
          <p className="text-stone-300 text-sm mt-2 leading-relaxed">
            तुम्दाक्, तामाक्, बानाम, तिरिओ और घोंघोर का वास्तविक ध्वनिक लूपर। पारंपरिक लागणे, सोहराय और करम तालों को लाइव मिलाएं, गति (BPM) नियंत्रित करें और अपना संताली लोक-संगीत तैयार करें।
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            <button
              onClick={() => setActiveTab('orchestra')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'orchestra'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-stone-900/60 hover:bg-stone-800/60 text-stone-200 border border-stone-700/50'
              }`}
            >
              लाइव १६-स्टेप ऑर्केस्ट्रा लूपर
            </button>
            <button
              onClick={() => setActiveTab('instrument_lore')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'instrument_lore'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-stone-900/60 hover:bg-stone-800/60 text-stone-200 border border-stone-700/50'
              }`}
            >
              वाद्ययंत्रों का इतिहास व वास्तुकला
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab 1: Orchestra Sequencer */}
      {activeTab === 'orchestra' && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-6">
          {/* Master Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-stone-950 rounded-xl border border-stone-800">
            {/* Play/Pause & Reset */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  getAudioContext();
                  setIsPlaying(!isPlaying);
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all ${
                  isPlaying
                    ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'ताल रोकें (Pause)' : 'ऑर्केस्ट्रा बजाएं (Play)'}</span>
              </button>

              <button
                onClick={() => setCurrentStep(0)}
                className="p-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl border border-stone-700"
                title="प्रारंभिक बीट पर लाएं"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Rhythm Preset Selector */}
            <div className="flex items-center gap-1.5 bg-stone-900 p-1.5 rounded-xl border border-stone-800 text-xs">
              {(['lagne', 'sohrai', 'karam'] as const).map(key => (
                <button
                  key={key}
                  onClick={() => handleSelectRhythm(key)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    selectedRhythm === key
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  {DEFAULT_RHYTHMS[key].name}
                </button>
              ))}
            </div>

            {/* BPM Slider */}
            <div className="flex items-center gap-3 bg-stone-900 px-4 py-2 rounded-xl border border-stone-800">
              <span className="text-xs font-bold text-stone-300">गति (BPM): {bpm}</span>
              <input
                type="range"
                min="60"
                max="160"
                value={bpm}
                onChange={e => setBpm(Number(e.target.value))}
                className="w-24 accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {/* 16-Step Sequencer Grid */}
          <div className="space-y-4">
            {tracks.map(track => (
              <div
                key={track.id}
                className="p-4 bg-stone-950/70 rounded-xl border border-stone-800/80 space-y-3"
              >
                {/* Track Info & Mixer */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleMute(track.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        track.muted
                          ? 'bg-red-950/60 border-red-700 text-red-400'
                          : 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700'
                      }`}
                      title={track.muted ? 'अनम्यूट करें' : 'म्यूट करें'}
                    >
                      {track.muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <div>
                      <span className="text-sm font-bold text-amber-200">{track.nameDev}</span>
                      <span className="text-xs text-stone-400 font-mono ml-2">({track.type})</span>
                    </div>
                  </div>

                  {/* Volume Slider */}
                  <div className="flex items-center gap-2">
                    <Sliders className="w-3.5 h-3.5 text-stone-400" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={track.volume}
                      onChange={e => handleVolumeChange(track.id, Number(e.target.value))}
                      className="w-20 accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* 16 Step Buttons */}
                <div className="grid grid-cols-16 gap-1.5">
                  {track.pattern.map((isActive, stepIdx) => {
                    const isCurrent = currentStep === stepIdx && isPlaying;
                    const isQuarter = stepIdx % 4 === 0;

                    let btnClass = 'h-10 rounded-lg border transition-all text-xs font-mono font-bold flex items-center justify-center ';
                    if (isActive) {
                      btnClass += `${track.color} text-white shadow-md border-amber-300/50 `;
                    } else {
                      btnClass += isQuarter
                        ? 'bg-stone-800/80 hover:bg-stone-700 text-stone-500 border-stone-700 '
                        : 'bg-stone-900 hover:bg-stone-800 text-stone-600 border-stone-800 ';
                    }

                    if (isCurrent) {
                      btnClass += 'ring-2 ring-white scale-105 z-10 shadow-lg ';
                    }

                    return (
                      <button
                        key={stepIdx}
                        onClick={() => togglePatternStep(track.id, stepIdx)}
                        className={btnClass}
                        title={`Step ${stepIdx + 1}`}
                      >
                        {isActive ? '●' : '·'}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Tab 2: Instrument Organology */}
      {activeTab === 'instrument_lore' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tracks.map(track => (
            <div
              key={track.id}
              className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-3 hover:border-amber-600/50 transition-colors"
            >
              <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                <span className="text-lg font-bold text-amber-300">{track.nameDev}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                  {track.nameRom}
                </span>
              </div>
              <p className="text-xs text-stone-400 font-semibold">{track.type}</p>
              <p className="text-stone-300 text-sm leading-relaxed">{track.description}</p>
              <button
                onClick={() => triggerInstrumentSound(track.id, 0.9)}
                className="w-full py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                <span>एकल ध्वनि सुनें (Test Tone)</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
