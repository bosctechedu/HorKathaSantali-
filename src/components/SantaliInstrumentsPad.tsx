import React, { useState, useRef, useEffect } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  Music,
  Play,
  Square,
  Volume2,
  Sparkles,
  Info,
  Radio,
  Sliders,
  RotateCcw
} from 'lucide-react';

import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import {
  Edit2,
  Trash2,
  Plus,
  Save,
  X
} from 'lucide-react';

export interface InstrumentInfo {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  nameHindi: string;
  type: string;
  craftMaterial: string;
  significance: string;
  soundType: 'tamak' | 'tumdak' | 'tiriyo' | 'banam';
  accentColor: string;
  gradient: string;
}

export const INSTRUMENTS: InstrumentInfo[] = [
  {
    id: 'tumdak',
    nameDevanagari: 'तुमदाक',
    nameRoman: 'Tumdak’',
    nameHindi: 'मांदर (तुमक/मांदर)',
    type: 'Bifacial Hand Drum (Membranophone)',
    craftMaterial: 'Burnt terracotta clay cylinder covered with ox & goat skin, tuned with black paste (Khir)',
    significance: 'The heart and soul of Santali community dance (Akhra). Slung horizontally around the neck, played with both hands producing high-slap and deep-bass.',
    soundType: 'tumdak',
    accentColor: '#D97706',
    gradient: 'from-amber-600 via-orange-600 to-amber-700'
  },
  {
    id: 'tamak',
    nameDevanagari: 'तामाक',
    nameRoman: 'Tamak’',
    nameHindi: 'नगाड़ा (तामाक)',
    type: 'Kettle Drum (Struck with two sticks)',
    craftMaterial: 'Hemispherical beaten copper/iron bowl covered with heavy cowhide, beaten with curved bamboo sticks (Chobol)',
    significance: 'Provides the commanding resonant bass rhythm that drives massive village assemblies, Sohrai marches, and historic Santhal Hul battle signals.',
    soundType: 'tamak',
    accentColor: '#DC2626',
    gradient: 'from-rose-600 via-red-600 to-orange-700'
  },
  {
    id: 'tiriyo',
    nameDevanagari: 'तिरियो',
    nameRoman: 'Tiriyo',
    nameHindi: 'बांसुरी (तिरियो)',
    type: 'Bamboo Side-blown Aerophone',
    craftMaterial: 'Single piece of seasoned forest bamboo with seven finger-holes and blowing embouchure',
    significance: 'Played by cowherds (Gupi kora) across hills and meadows. Its melodious, melancholic tones evoke nature, romance, and spiritual communion.',
    soundType: 'tiriyo',
    accentColor: '#059669',
    gradient: 'from-emerald-600 via-teal-600 to-green-700'
  },
  {
    id: 'banam',
    nameDevanagari: 'बानाम',
    nameRoman: 'Banam',
    nameHindi: 'बानम (प्राचीन संताली सारंगी)',
    type: 'Bowed Lute (Chordophone)',
    craftMaterial: 'Hollowed out single wood trunk (often Gulanj or Sal), soundbox covered with lizard/goat skin, strung with horsehair',
    significance: 'An anthropomorphic instrument sculpted in the shape of human beings. Used by traditional storytellers to recount ancestral sagas.',
    soundType: 'banam',
    accentColor: '#7C3AED',
    gradient: 'from-purple-600 via-indigo-600 to-blue-700'
  }
];

export const SantaliInstrumentsPad: React.FC = () => {
  const { isAdmin } = useAdmin();
  const [instrumentsList, setInstrumentsList] = useState<InstrumentInfo[]>(() =>
    safeLoadFromStorage('hor_katha_cms_instruments', INSTRUMENTS)
  );
  const [selectedInst, setSelectedInst] = useState<InstrumentInfo>(instrumentsList[0] || INSTRUMENTS[0]);
  const [isPlayingBeat, setIsPlayingBeat] = useState(false);
  const [activeBeat, setActiveBeat] = useState<'sohrai' | 'lagre' | 'baha'>('sohrai');
  const [bpm, setBpm] = useState(105);
  const [activePad, setActivePad] = useState<string | null>(null);

  // Admin Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<InstrumentInfo, 'id'>>({
    nameDevanagari: '',
    nameRoman: '',
    nameHindi: '',
    type: 'Membranophone',
    craftMaterial: '',
    significance: '',
    soundType: 'tumdak',
    accentColor: '#D97706',
    gradient: 'from-amber-600 via-orange-600 to-amber-700'
  });

  useEffect(() => {
    safeSaveToStorage('hor_katha_cms_instruments', instrumentsList);
  }, [instrumentsList]);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      nameDevanagari: '',
      nameRoman: '',
      nameHindi: '',
      type: 'Traditional Drum',
      craftMaterial: 'Seasoned wood and leather parchment',
      significance: 'Traditional festive rhythm instrument',
      soundType: 'tumdak',
      accentColor: '#D97706',
      gradient: 'from-amber-600 via-orange-600 to-amber-700'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (inst: InstrumentInfo, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingId(inst.id);
    setFormData({
      nameDevanagari: inst.nameDevanagari,
      nameRoman: inst.nameRoman,
      nameHindi: inst.nameHindi,
      type: inst.type,
      craftMaterial: inst.craftMaterial,
      significance: inst.significance,
      soundType: inst.soundType,
      accentColor: inst.accentColor,
      gradient: inst.gradient
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (window.confirm('क्या आप इस वाद्ययंत्र को हटाना चाहते हैं?')) {
      const updated = instrumentsList.filter((item) => item.id !== id);
      setInstrumentsList(updated);
      if (selectedInst.id === id && updated.length > 0) {
        setSelectedInst(updated[0]);
      }
    }
  };

  const handleReset = () => {
    if (window.confirm('क्या आप सभी वाद्ययंत्रों को मूल डिफ़ॉल्ट पर रीसेट करना चाहते हैं?')) {
      setInstrumentsList(INSTRUMENTS);
      setSelectedInst(INSTRUMENTS[0]);
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameDevanagari.trim() || !formData.nameRoman.trim()) {
      alert('कृपया संताली देवनागरी और रोमन नाम अवश्य भरें।');
      return;
    }

    if (editingId) {
      const updated = instrumentsList.map((item) =>
        item.id === editingId ? { ...item, ...formData } : item
      );
      setInstrumentsList(updated);
      if (selectedInst.id === editingId) {
        setSelectedInst({ id: editingId, ...formData });
      }
    } else {
      const newInst: InstrumentInfo = {
        id: `inst_${Date.now()}`,
        ...formData
      };
      setInstrumentsList([...instrumentsList, newInst]);
      setSelectedInst(newInst);
    }
    setIsModalOpen(false);
  };

  const loopTimerRef = useRef<any>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize Web Audio Context
  const getAudioContext = (): AudioContext => {
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioCtxClass();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Synthesize realistic traditional instrument hits
  const playInstrumentSound = (type: 'tamak' | 'tumdak' | 'tiriyo' | 'banam', pitchOffset = 0) => {
    const ctx = getAudioContext();
    const t = ctx.currentTime;

    if (type === 'tamak') {
      // Heavy kettle drum strike: low sine + punchy noise transient
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(80 + pitchOffset, t);
      osc.frequency.exponentialRampToValueAtTime(35, t + 0.35);

      gain.gain.setValueAtTime(0.7, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.45);
    } else if (type === 'tumdak') {
      // Two-sided log drum: slap (sharp crisp) or bass (warm round)
      const isBass = pitchOffset <= 0;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = isBass ? 'sine' : 'square';
      osc.frequency.setValueAtTime(isBass ? 130 : 280, t);
      osc.frequency.exponentialRampToValueAtTime(isBass ? 65 : 120, t + 0.25);

      gain.gain.setValueAtTime(isBass ? 0.6 : 0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.3);
    } else if (type === 'tiriyo') {
      // Bamboo flute: pure sine with soft tremolo
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const noteFreq = 440 + pitchOffset * 50;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(noteFreq, t);
      osc.frequency.linearRampToValueAtTime(noteFreq * 1.02, t + 0.3);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.4, t + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.6);
    } else if (type === 'banam') {
      // Bowed string: sawtooth filtered with harmonic richness
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      const noteFreq = 220 + pitchOffset * 30;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(noteFreq, t);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.35, t + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.7);
    }
  };

  const handlePadTap = (soundType: 'tamak' | 'tumdak' | 'tiriyo' | 'banam', pitch = 0, padKey: string) => {
    setActivePad(padKey);
    playInstrumentSound(soundType, pitch);
    setTimeout(() => setActivePad(null), 180);
  };

  // Traditional Rhythm Looper
  const toggleBeatLoop = () => {
    if (isPlayingBeat) {
      if (loopTimerRef.current) clearInterval(loopTimerRef.current);
      setIsPlayingBeat(false);
      return;
    }

    setIsPlayingBeat(true);
    let step = 0;
    const intervalMs = (60 / bpm) * 1000 * 0.5; // Eighth-note pulses

    loopTimerRef.current = setInterval(() => {
      // 8-step rhythm pattern
      if (activeBeat === 'sohrai') {
        // Sohrai: Tamak on 0, 4; Tumdak on 0, 2, 4, 6
        if (step % 4 === 0) playInstrumentSound('tamak');
        playInstrumentSound('tumdak', step % 2 === 0 ? 0 : 40);
        if (step === 3 || step === 7) playInstrumentSound('tiriyo', (step * 20) % 80);
      } else if (activeBeat === 'lagre') {
        // Lagre: Fast social dance pulse
        playInstrumentSound('tumdak', step % 2 === 0 ? -20 : 50);
        if (step === 0 || step === 4) playInstrumentSound('tamak');
      } else if (activeBeat === 'baha') {
        // Baha: Gentle spring grove rhythm
        playInstrumentSound('tumdak', 0);
        if (step % 4 === 0) playInstrumentSound('tiriyo', 60);
      }

      step = (step + 1) % 8;
    }, intervalMs);
  };

  useEffect(() => {
    return () => {
      if (loopTimerRef.current) clearInterval(loopTimerRef.current);
    };
  }, [isPlayingBeat, bpm, activeBeat]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-800 via-orange-800 to-rose-900 text-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider">
              Indigenous Acoustic Studio
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
              Web Audio Synthesizer
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mt-1.5 tracking-tight flex items-center gap-2.5">
            <Music className="w-7 h-7 text-amber-300" />
            <span>Santali Traditional Instruments &amp; Rhythm Pad</span>
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 font-medium mt-1">
            Tap the drumheads and flutes to play authentic acoustic sounds of Tumdak, Tamak, Tiriyo &amp; Banam.
          </p>
        </div>

        {/* Live Loop Trigger */}
        <button
          onClick={toggleBeatLoop}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black shadow-md transition-all cursor-pointer ${
            isPlayingBeat
              ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
              : 'bg-amber-400 hover:bg-amber-300 text-slate-950 hover:scale-105'
          }`}
        >
          {isPlayingBeat ? <Square className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-slate-950" />}
          <span>{isPlayingBeat ? 'Stop Rhythm Loop' : 'Play Festive Rhythm'}</span>
        </button>
      </div>

      {/* Rhythm Loop Controls Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">Rhythm Mode:</span>
          {(['sohrai', 'lagre', 'baha'] as const).map((beat) => (
            <button
              key={beat}
              onClick={() => {
                setActiveBeat(beat);
                if (isPlayingBeat) {
                  toggleBeatLoop();
                  setTimeout(toggleBeatLoop, 100);
                }
              }}
              className={`px-3 py-1.5 rounded-xl font-bold uppercase text-[11px] transition-all cursor-pointer ${
                activeBeat === beat
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {beat} Beat
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-700">Tempo: {bpm} BPM</span>
          <input
            type="range"
            min={75}
            max={140}
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-28 accent-amber-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Admin Action Strip */}
      {isAdmin && (
        <div className="bg-amber-500/10 border border-amber-300/80 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black text-amber-950">
              प्रशासक नियंत्रण (Admin Control): कुल {instrumentsList.length} वाद्ययंत्र
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenAdd}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ नया वाद्य जोड़ें</span>
            </button>
            <button
              onClick={handleReset}
              className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all"
            >
              <RotateCcw className="w-3 h-3 text-slate-500" />
              <span>रीसेट</span>
            </button>
          </div>
        </div>
      )}

      {/* 4 Interactive Instrument Touch Pads */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {instrumentsList.map((inst) => {
          const isSelected = inst.id === selectedInst.id;
          return (
            <div
              key={inst.id}
              onClick={() => setSelectedInst(inst)}
              className={`rounded-3xl border p-5 flex flex-col justify-between transition-all cursor-pointer select-none bg-white shadow-xs relative ${
                isSelected
                  ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-md'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    {inst.type.split(' ')[0]}
                  </span>
                  <div className="flex items-center gap-1">
                    {isAdmin && (
                      <>
                        <button
                          onClick={(e) => handleOpenEdit(inst, e)}
                          title="संपादित करें (Edit)"
                          className="p-1 rounded-lg text-slate-500 hover:text-amber-700 hover:bg-amber-50 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDelete(inst.id, e)}
                          title="हटाएं (Delete)"
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakWithFemaleVoice(`${inst.nameHindi}. ${inst.nameRoman}`, { lang: 'hi-IN' });
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-700 hover:bg-amber-50 transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-3xl font-black font-serif text-slate-900 mt-2">
                  {inst.nameDevanagari}
                </h3>
                <p className="text-sm font-bold text-amber-700">{inst.nameRoman}</p>
                <p className="text-xs text-slate-500">{inst.nameHindi}</p>
              </div>

              {/* Tappable Drumhead Pad */}
              <div className="mt-5 pt-3 border-t border-slate-100 space-y-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePadTap(inst.soundType, 0, `${inst.id}_low`);
                  }}
                  className={`w-full py-4 rounded-2xl font-black text-xs text-white shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 bg-gradient-to-r ${inst.gradient} ${
                    activePad === `${inst.id}_low` ? 'scale-95 brightness-125 ring-4 ring-amber-300' : 'hover:scale-102'
                  }`}
                >
                  <Radio className="w-4 h-4 animate-pulse" />
                  <span>Tap Primary Stroke</span>
                </button>

                <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePadTap(inst.soundType, -20, `${inst.id}_bass`);
                    }}
                    className="py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all cursor-pointer text-center"
                  >
                    Low Bass
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePadTap(inst.soundType, 40, `${inst.id}_sharp`);
                    }}
                    className="py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all cursor-pointer text-center"
                  >
                    High Slap
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Instrument Deep Dive Dossier */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-4 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Focused Instrument:
          </span>
          <h2 className="text-3xl font-black font-serif text-slate-900">
            {selectedInst.nameDevanagari}
          </h2>
          <p className="text-base font-bold text-amber-700">
            {selectedInst.nameRoman} ({selectedInst.nameHindi})
          </p>
          <p className="text-xs text-slate-500 font-mono">
            Classification: {selectedInst.type}
          </p>
        </div>

        <div className="md:col-span-8 space-y-3 text-xs text-slate-700">
          <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-1">
            <span className="font-bold text-amber-950 block">Traditional Materials &amp; Crafting:</span>
            <p className="text-slate-700 leading-relaxed">{selectedInst.craftMaterial}</p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
            <span className="font-bold text-slate-900 block">Festive &amp; Social Significance:</span>
            <p className="text-slate-600 leading-relaxed">{selectedInst.significance}</p>
          </div>
        </div>
      </div>

      {/* Admin Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Music className="w-5 h-5 text-amber-600" />
                <span>{editingId ? 'वाद्ययंत्र सुधारें (Edit Instrument)' : '+ नया वाद्य जोड़ें (Add Instrument)'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">संताली नाम (देवनागरी लिपि) *</label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. तुमदाक"
                    value={formData.nameDevanagari}
                    onChange={(e) => setFormData({ ...formData, nameDevanagari: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:outline-amber-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">संताली नाम (रोमन लिपि) *</label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. Tumdak’"
                    value={formData.nameRoman}
                    onChange={(e) => setFormData({ ...formData, nameRoman: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:outline-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">हिंदी नाम / अर्थ</label>
                  <input
                    type="text"
                    placeholder="उदा. मांदर (तुमक)"
                    value={formData.nameHindi}
                    onChange={(e) => setFormData({ ...formData, nameHindi: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:outline-amber-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">वाद्य प्रकार (Type)</label>
                  <input
                    type="text"
                    placeholder="उदा. Hand Drum (Membranophone)"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:outline-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">ध्वनि संश्लेषण प्रकार (Sound Synth Type)</label>
                <select
                  value={formData.soundType}
                  onChange={(e) => setFormData({ ...formData, soundType: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-800 focus:outline-amber-500 cursor-pointer"
                >
                  <option value="tumdak">तुमदाक (Tumdak' - Hand Log Drum)</option>
                  <option value="tamak">तामाक (Tamak' - Bass Kettle Drum)</option>
                  <option value="tiriyo">तिरियो (Tiriyo - Bamboo Flute)</option>
                  <option value="banam">बानाम (Banam - Bowed String Lute)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">निर्माण सामग्री (Craft Material)</label>
                <textarea
                  rows={2}
                  placeholder="उदा. मिट्टी या लकड़ी की नली, बकरे की चमड़ी, खिर लेप..."
                  value={formData.craftMaterial}
                  onChange={(e) => setFormData({ ...formData, craftMaterial: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-800 focus:outline-amber-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">सांस्कृतिक महत्व (Significance)</label>
                <textarea
                  rows={3}
                  placeholder="अखड़ा नृत्य, सोहराय और पारंपरिक पर्वों में उपयोग..."
                  value={formData.significance}
                  onChange={(e) => setFormData({ ...formData, significance: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-800 focus:outline-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>सहेजें (Save)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
