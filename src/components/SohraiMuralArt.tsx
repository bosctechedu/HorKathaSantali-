import React, { useState, useRef, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  Palette,
  Sparkles,
  Download,
  RotateCcw,
  Volume2,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  ShieldCheck,
  Check,
  Layers,
  Info,
  Maximize2,
  Eye,
  Eraser
} from 'lucide-react';

export interface SohraiMotif {
  id: string;
  nameDevanagari: string;
  nameRoman: string;
  titleHindi: string;
  category: 'birds' | 'animals' | 'flora' | 'celestial' | 'ritual';
  symbolism: string;
  naturalPigment: string;
  sacredMeaning: string;
  svgPath: string; // SVG path or motif icon design
  accentColor: string;
}

export const DEFAULT_SOHRAI_MOTIFS: SohraiMotif[] = [
  {
    id: 'marok_peacock',
    nameDevanagari: 'मारोक (मोर)',
    nameRoman: 'Marok',
    titleHindi: 'पवित्र मयूर - समृद्धि, वर्षा व उत्सव का अग्रदूत',
    category: 'birds',
    symbolism: 'सोहराय पर्व के दौरान मिट्टी की दीवारों पर मोर का अंकन वर्षा, नृत्य और परिवार में खुशहाली का प्रतीक है।',
    naturalPigment: 'दुरुम हासा (लाल गेरू मिट्टी) व सफेद खड़िया (दुधी माटी)',
    sacredMeaning: 'मोर के पंखों का फैलाव प्रकृति के आनंद और नव वर्ष के आगमन का स्वागत करता है।',
    svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
    accentColor: '#0284C7'
  },
  {
    id: 'dangra_bull',
    nameDevanagari: 'डांगरा व काड़ा (बैल-भैंसा)',
    nameRoman: 'Dāngra ar Kādā',
    titleHindi: 'गो-धन व पशुधन - अन्नदाता सहयोगी का वंदन',
    category: 'animals',
    symbolism: 'सोहराय मूलतः पशुधन के प्रति आभार प्रकट करने का पर्व है। दीवारों पर बैलों की सींगें व सुडौल शरीर चित्रित किया जाता है।',
    naturalPigment: 'चर हासा (काली राख/कोयला मिट्टी) व गेरू',
    sacredMeaning: 'बैल हमारे खेतों की मिट्टी को उपजाऊ बनाते हैं, इनका आदर ही जीवन की निरंतरता है।',
    svgPath: 'M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z',
    accentColor: '#D97706'
  },
  {
    id: 'haku_fish',
    nameDevanagari: 'हाकु (मछली)',
    nameRoman: 'Hāku',
    titleHindi: 'उर्वरता, जल-समृद्धि व वंश-वृद्धि का प्रतीक',
    category: 'animals',
    symbolism: 'मछली का जोड़ा निरंतर जीवन, वंश वृद्धि और स्वच्छ जलधाराओं की उर्वरता को दर्शाता है।',
    naturalPigment: 'दुधी माटी (सफेद खड़िया) व लाल गेरू',
    sacredMeaning: 'नदियों और बांधों में संताल मछुआरों की आजीविका और जल-देवता का स्मरण।',
    svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z',
    accentColor: '#0D9488'
  },
  {
    id: 'sarjom_dare_tree',
    nameDevanagari: 'सारजोम दारे (शाल वृक्ष)',
    nameRoman: 'Sarjom Dare',
    titleHindi: 'कल्पवृक्ष - जाहेर थान का पवित्र शाल वृक्ष',
    category: 'flora',
    symbolism: 'शाल का वृक्ष संताली समाज का जीवन आधार है। भित्तिचित्रों में इसकी शाखाएं, पत्तियां और पक्षियों का बसेरा बनाया जाता है।',
    naturalPigment: 'हरित वनस्पति रस व चारकोल ब्लैक',
    sacredMeaning: 'जाहेर एरा और मारांग बुरु का वास शाल कुंज में होता है, यह अटूट धीरज और छाया का प्रतीक है।',
    svgPath: 'M10 21v-2.58A6 6 0 0 1 6 13c0-3.31 2.69-6 6-6s6 2.69 6 6a6 6 0 0 1-4 5.42V21h-4zm2-18a9 9 0 0 0-9 9c0 3.73 2.29 6.94 5.56 8.32L7 22h10l-1.56-1.68A8.995 8.995 0 0 0 21 12a9 9 0 0 0-9-9z',
    accentColor: '#16A34A'
  },
  {
    id: 'enej_chain',
    nameDevanagari: 'एनेच कोड़ा-कुड़ी (नृत्य श्रृंखला)',
    nameRoman: 'Enēj Chain',
    titleHindi: 'मांदार की थाप पर जुड़े हाथ - सामाजिक समरसता',
    category: 'ritual',
    symbolism: 'हाथों में हाथ डालकर एक लय में झूमती संताली युवतियां और मांदार बजाते युवक।',
    naturalPigment: 'गेरू, सफेद दुधी व हल्दी का पीला रंग',
    sacredMeaning: 'संताली समाज में समानता और अखंड सामूहिकता की जीती-जागती तस्वीर।',
    svgPath: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    accentColor: '#DC2626'
  },
  {
    id: 'bonga_chandando',
    nameDevanagari: 'चांदो व सिंग बोंगा (सूर्य-चंद्र चक्र)',
    nameRoman: 'Cāndo ar Sing Bonga',
    titleHindi: 'दिव्य प्रकाश, ऋतु परिवर्तन व दिशा-बोध',
    category: 'celestial',
    symbolism: 'सूर्य और चंद्रमा के चक्रों को कंघी (कांगई स्क्रैच विधि) से ज्यामितीय लय में उकेरा जाता है।',
    naturalPigment: 'सासांग (कच्ची हल्दी का पीला) व दुधी माटी',
    sacredMeaning: 'समस्त ब्रह्मांड को ऊर्जा और जीवन देने वाले परम पिता सिंग बोंगा का आभार।',
    svgPath: 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z',
    accentColor: '#CA8A04'
  },
  {
    id: 'hati_elephant',
    nameDevanagari: 'हाती व महावत (पवित्र हाथी)',
    nameRoman: 'Hātī',
    titleHindi: 'अरण्य शक्ति, धीरता व गौरवशाली विरासत',
    category: 'animals',
    symbolism: 'झारखंड-संताल परगना के घने अरण्य में हाथी को शक्ति, धैर्य और वन-रक्षक का स्वरूप माना जाता है।',
    naturalPigment: 'काली मिट्टी व सफेद खड़िया रेखाएं',
    sacredMeaning: 'खोवर व सोहराय दोनों कला शैलियों में हाथी विवाह व उत्सव के शुभ आगमन का द्योतक है।',
    svgPath: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
    accentColor: '#475569'
  },
  {
    id: 'jande_grain_stalk',
    nameDevanagari: 'इर-अम धान बाली व जांदे',
    nameRoman: 'Horo Bili',
    titleHindi: 'पकी हुई स्वर्ण धान की बालियां',
    category: 'flora',
    symbolism: 'धान की झुकी हुई सुनहरी बालियां मेहनत के मीठे फल और मां लक्ष्मी स्वरूपा जाहेर एरा की कृपा हैं।',
    naturalPigment: 'हल्दी पीला व गेरू भूरा',
    sacredMeaning: 'अन्नपूर्णा कोठी भरने का उत्सव और नई फसल का पहला भोग पूर्वजों को अर्पण।',
    svgPath: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    accentColor: '#EAB308'
  }
];

export const SohraiMuralArt: React.FC = () => {
  const { isAdmin } = useAdmin();
  const STORAGE_KEY = 'hor_katha_sohrai_art_db';

  const [motifs, setMotifs] = useState<SohraiMotif[]>(() => {
    return safeLoadFromStorage(STORAGE_KEY, DEFAULT_SOHRAI_MOTIFS);
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedMotif, setSelectedMotif] = useState<SohraiMotif>(motifs[0]);
  const [wallColor, setWallColor] = useState<string>('#E2D7C3'); // Natural Clay Mud Wall
  const [pigmentColor, setPigmentColor] = useState<string>('#991B1B'); // Geru Red
  const [brushSize, setBrushSize] = useState<number>(6);
  const [toolMode, setToolMode] = useState<'brush' | 'eraser' | 'comb'>('brush');

  // Canvas ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [stampedCount, setStampedCount] = useState(0);

  // Admin Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMotif, setEditingMotif] = useState<SohraiMotif | null>(null);
  const [formData, setFormData] = useState<Partial<SohraiMotif>>({});

  // Sync to local storage
  const saveMotifs = (updated: SohraiMotif[]) => {
    setMotifs(updated);
    safeSaveToStorage(STORAGE_KEY, updated);
  };

  // Initialize Canvas
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill background with mud wall color
    ctx.fillStyle = wallColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add traditional mud wall texture dots
    ctx.fillStyle = 'rgba(0,0,0,0.03)';
    for (let i = 0; i < 400; i++) {
      const rx = Math.random() * canvas.width;
      const ry = Math.random() * canvas.height;
      const r = Math.random() * 2;
      ctx.beginPath();
      ctx.arc(rx, ry, r, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  useEffect(() => {
    initCanvas();
  }, [wallColor]);

  // Drawing event handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    if (toolMode === 'eraser') {
      ctx.strokeStyle = wallColor;
      ctx.lineWidth = brushSize * 2.5;
      ctx.lineCap = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (toolMode === 'comb') {
      // Traditional Comb (कांगई) Sgraffito multi-line stroke
      ctx.strokeStyle = pigmentColor;
      ctx.lineWidth = brushSize / 2;
      ctx.lineCap = 'round';
      // Draw 3 parallel lines simulating comb teeth
      for (let offset = -6; offset <= 6; offset += 6) {
        ctx.beginPath();
        ctx.moveTo(x + offset, y + offset);
        ctx.lineTo(x + offset + 1, y + offset + 1);
        ctx.stroke();
      }
    } else {
      // Natural Pigment Brush
      ctx.strokeStyle = pigmentColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Stamp Selected Motif onto Canvas
  const stampSelectedMotif = () => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedMotif) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2 + (Math.random() * 80 - 40);
    const centerY = canvas.height / 2 + (Math.random() * 80 - 40);

    ctx.save();
    ctx.fillStyle = pigmentColor;
    ctx.strokeStyle = pigmentColor;
    ctx.lineWidth = 3;

    // Draw traditional decorative border & motif badge
    ctx.beginPath();
    ctx.arc(centerX, centerY, 42, 0, Math.PI * 2);
    ctx.stroke();

    // Geometric comb radiating rays (कांगई रेखाएं)
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
      const rx1 = centerX + Math.cos(angle) * 44;
      const ry1 = centerY + Math.sin(angle) * 44;
      const rx2 = centerX + Math.cos(angle) * 52;
      const ry2 = centerY + Math.sin(angle) * 52;
      ctx.beginPath();
      ctx.moveTo(rx1, ry1);
      ctx.lineTo(rx2, ry2);
      ctx.stroke();
    }

    // Traditional Devanagari text on mural
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(selectedMotif.nameDevanagari, centerX, centerY + 5);

    ctx.restore();
    setStampedCount((prev) => prev + 1);
  };

  // Download mural artwork as PNG
  const downloadArtwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `sohrai_art_${selectedMotif.id}_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Admin Actions
  const handleAddNew = () => {
    setEditingMotif(null);
    setFormData({
      id: `motif_${Date.now()}`,
      nameDevanagari: '',
      nameRoman: '',
      titleHindi: '',
      category: 'animals',
      symbolism: '',
      naturalPigment: 'लाल गेरू मिट्टी व खड़िया',
      sacredMeaning: '',
      accentColor: '#B23A22',
      svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (motif: SohraiMotif) => {
    setEditingMotif(motif);
    setFormData(motif);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('क्या आप सचमुच इस भित्तिचित्र आकृति को हटाना चाहते हैं?')) {
      const filtered = motifs.filter((m) => m.id !== id);
      saveMotifs(filtered);
      if (selectedMotif?.id === id) {
        setSelectedMotif(filtered[0] || null);
      }
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameDevanagari || !formData.titleHindi) return;

    if (editingMotif) {
      const updated = motifs.map((m) => (m.id === editingMotif.id ? ({ ...m, ...formData } as SohraiMotif) : m));
      saveMotifs(updated);
      setSelectedMotif({ ...editingMotif, ...formData } as SohraiMotif);
    } else {
      const newMotif = { ...formData, id: `motif_${Date.now()}` } as SohraiMotif;
      const updated = [newMotif, ...motifs];
      saveMotifs(updated);
      setSelectedMotif(newMotif);
    }
    setIsModalOpen(false);
  };

  const handleResetToDefault = () => {
    if (confirm('क्या आप डिफ़ॉल्ट सोहराय भित्तिचित्र डेटा रीसेट करना चाहते हैं?')) {
      saveMotifs(DEFAULT_SOHRAI_MOTIFS);
      setSelectedMotif(DEFAULT_SOHRAI_MOTIFS[0]);
    }
  };

  const filteredMotifs = motifs.filter((m) => {
    if (activeCategory === 'all') return true;
    return m.category === activeCategory;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-amber-900 via-rose-900 to-amber-950 text-white p-6 sm:p-8 rounded-3xl shadow-md border border-amber-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold backdrop-blur-xs border border-amber-400/30">
              <Palette className="w-3.5 h-3.5" />
              <span>पारंपरिक आदिवासी कला धरोहर (GI Tag Heritage)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-amber-50">
              सोहराय व खोवर भित्तिचित्र कला स्टूडियो
            </h1>
            <p className="text-sm text-amber-200/90 max-w-2xl leading-relaxed">
              संताली घरों की कच्ची मिट्टी की दीवारों पर प्राकृतिक रंगों (गेरू, खड़िया, चारकोल, हल्दी) एवं कंघी-कूची (कांगई) से उकेरी जाने वाली पावन आकृतियां, उर्वरता प्रतीक व जीवंत कैनवास।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => speakWithFemaleVoice('सोहराय व खोवर भित्तिचित्र कला स्टूडियो, संताली पारंपरिक दीवार चित्रकारी')}
              className="px-3.5 py-2 bg-amber-800/60 hover:bg-amber-700/70 border border-amber-600/40 text-amber-100 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Volume2 className="w-4 h-4 text-amber-300" />
              <span>ऑडियो गाइड</span>
            </button>
            {isAdmin && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddNew}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>नयी आकृति जोड़ें</span>
                </button>
                <button
                  onClick={handleResetToDefault}
                  title="रीसेट डिफ़ॉल्ट"
                  className="p-2 bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 rounded-xl transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Studio Interactive Layout: Left Art Canvas, Right Motif Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Col: Interactive Mud Wall Canvas Studio (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-100 text-amber-800 rounded-lg">
                <Palette className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">मिट्टी की दीवार कैनवास (Mud Wall Art)</h3>
                <p className="text-[11px] text-slate-500">दीवार पर प्राकृतिक रंगों से उकेरें अथवा आकृति छापें</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={initCanvas}
                title="कैनवास साफ करें"
                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>साफ</span>
              </button>
              <button
                onClick={downloadArtwork}
                className="px-3 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>चित्र सहेजें</span>
              </button>
            </div>
          </div>

          {/* Interactive HTML5 Canvas */}
          <div className="relative rounded-2xl overflow-hidden border-4 border-amber-950/20 shadow-inner flex justify-center bg-slate-100">
            <canvas
              ref={canvasRef}
              width={640}
              height={380}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="touch-none cursor-crosshair max-w-full h-auto block"
              style={{ backgroundColor: wallColor }}
            />
          </div>

          {/* Canvas Controls: Mud Wall Colors, Natural Pigments & Tools */}
          <div className="space-y-3 pt-2">
            {/* Row 1: Wall Base Texture Selection */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-600 font-bold text-[11px] flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-amber-800" /> दीवार पृष्ठभूमि:
              </span>
              {[
                { name: 'कच्ची मिट्टी (Clay)', color: '#E2D7C3' },
                { name: 'गेरू दीवार (Geru)', color: '#D4A373' },
                { name: 'सफेद खड़िया (Dudhi)', color: '#F1F5F9' },
                { name: 'काली राख (Char)', color: '#334155' }
              ].map((w) => (
                <button
                  key={w.color}
                  onClick={() => setWallColor(w.color)}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    wallColor === w.color ? 'border-amber-700 ring-2 ring-amber-500/20 shadow-xs' : 'border-slate-300 bg-white'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: w.color }} />
                  <span>{w.name}</span>
                </button>
              ))}
            </div>

            {/* Row 2: Traditional Natural Pigments Palette */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-slate-600 font-bold text-[11px]">प्राकृतिक रंग (Pigment):</span>
                {[
                  { name: 'गेरू लाल', color: '#991B1B' },
                  { name: 'खड़िया श्वेत', color: '#FFFFFF' },
                  { name: 'कोयला काला', color: '#0F172A' },
                  { name: 'हल्दी पीला', color: '#EAB308' },
                  { name: 'वनस्पति हरा', color: '#15803D' }
                ].map((p) => (
                  <button
                    key={p.color}
                    onClick={() => {
                      setPigmentColor(p.color);
                      setToolMode('brush');
                    }}
                    title={p.name}
                    className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                      pigmentColor === p.color && toolMode !== 'eraser' ? 'border-amber-900 scale-110 shadow-sm' : 'border-white shadow-2xs'
                    }`}
                    style={{ backgroundColor: p.color }}
                  >
                    {pigmentColor === p.color && toolMode !== 'eraser' && (
                      <Check className={`w-3.5 h-3.5 ${p.color === '#FFFFFF' || p.color === '#EAB308' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>

              {/* Tool Mode: Brush, Comb, Eraser */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setToolMode('brush')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    toolMode === 'brush' ? 'bg-amber-800 text-white' : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>कूची (Brush)</span>
                </button>
                <button
                  onClick={() => setToolMode('comb')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    toolMode === 'comb' ? 'bg-amber-800 text-white' : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                  title="कांगई सूप की तीली तकनीक"
                >
                  <span>कांगई (Comb)</span>
                </button>
                <button
                  onClick={() => setToolMode('eraser')}
                  className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                    toolMode === 'eraser' ? 'bg-rose-700 text-white' : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                  title="मिटाएं"
                >
                  <Eraser className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Stamp Action */}
            <div className="flex items-center justify-between gap-3 bg-amber-50/70 p-3 rounded-2xl border border-amber-200/80">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span className="text-xs font-bold text-amber-950">
                  चयनित आकृति: <span className="underline">{selectedMotif?.nameDevanagari}</span>
                </span>
              </div>
              <button
                onClick={stampSelectedMotif}
                className="px-3.5 py-1.5 bg-amber-800 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <span>कैनवास पर छापें (Stamp)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Motif Detail Card & Cultural Knowledge (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Motif Cultural Spotlight */}
          {selectedMotif && (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-4">
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                    {selectedMotif.category}
                  </span>
                  <h2 className="text-xl font-black text-slate-900 mt-1">
                    {selectedMotif.nameDevanagari}
                  </h2>
                  <p className="text-xs font-bold text-amber-800">
                    {selectedMotif.nameRoman} ({selectedMotif.titleHindi})
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => speakWithFemaleVoice(`${selectedMotif.nameDevanagari}. ${selectedMotif.symbolism}`)}
                    className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 transition-all cursor-pointer shadow-xs"
                    title="उच्चारण व अर्थ सुनें"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => handleEdit(selectedMotif)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
                      title="एडमिन संपादन"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Symbolism & Deep Context */}
              <div className="space-y-3 text-xs">
                <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/60 space-y-1">
                  <span className="font-bold text-amber-950 flex items-center gap-1 text-[11px] uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" /> सांस्कृतिक प्रतीकत्व व मान्यता:
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedMotif.symbolism}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-600 text-[11px] uppercase">पारंपरिक प्राकृतिक रंग सामग्री:</span>
                  <p className="font-semibold text-slate-800">
                    {selectedMotif.naturalPigment}
                  </p>
                </div>

                <div className="p-3 bg-rose-50/50 rounded-2xl border border-rose-100 space-y-1">
                  <span className="font-bold text-rose-900 text-[11px] uppercase">आध्यात्मिक व दार्शनिक भाव:</span>
                  <p className="text-slate-600 leading-relaxed italic">
                    "{selectedMotif.sacredMeaning}"
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Traditional Knowledge Callout */}
          <div className="p-4 bg-gradient-to-r from-amber-950 to-rose-950 text-white rounded-3xl shadow-xs space-y-2">
            <h4 className="text-xs font-bold text-amber-200 flex items-center gap-1.5 uppercase">
              <Info className="w-4 h-4" /> सोहराय कला की अनूठी कांगई (Comb) तकनीक
            </h4>
            <p className="text-[11px] text-amber-100/90 leading-relaxed">
              सोहराय में पहले पूरी दीवार पर गीली काली मिट्टी या गेरू का लेप लगाया जाता है। इसके बाद सफेद खड़िया मिट्टी से ढककर टूटी हुई कंघी (कांगई) या दातुन की तीली से खुरचकर (Sgraffito विधि) रेखाएं उकेरी जाती हैं, जिससे नीचे का गहरा रंग उभरकर भव्य ज्यामितीय रूप लेता है।
            </p>
          </div>
        </div>
      </div>

      {/* Motif Grid Section */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <span>पारंपरिक सोहराय आकृतियां ({filteredMotifs.length})</span>
              {isAdmin && (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold border border-amber-300">
                  एडमिन मोड सक्रिय
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-500">किसी भी आकृति को क्लिक कर विवरण देखें या कैनवास पर छापें</p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'सभी' },
              { id: 'birds', label: 'पक्षी (चेड़े)' },
              { id: 'animals', label: 'पशुधन (जानवर)' },
              { id: 'flora', label: 'वनस्पति (दारे)' },
              { id: 'celestial', label: 'खगोलीय (चांदो)' },
              { id: 'ritual', label: 'नृत्य व संस्कार' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-amber-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Motifs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMotifs.map((motif) => {
            const isSelected = selectedMotif?.id === motif.id;
            return (
              <div
                key={motif.id}
                onClick={() => setSelectedMotif(motif)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-50/80 border-amber-500 shadow-md ring-2 ring-amber-500/20'
                    : 'bg-slate-50 hover:bg-white border-slate-200 hover:border-amber-300'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-200/80 text-amber-900">
                      {motif.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakWithFemaleVoice(motif.nameDevanagari);
                      }}
                      className="p-1 rounded-lg text-slate-400 hover:text-amber-800 hover:bg-amber-100 transition-colors"
                      title="उच्चारण सुनें"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-amber-900 transition-colors">
                      {motif.nameDevanagari}
                    </h4>
                    <p className="text-[11px] font-semibold text-amber-800">
                      {motif.nameRoman}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {motif.symbolism}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 truncate max-w-[140px]">
                    {motif.naturalPigment.split(' ')[0]}
                  </span>
                  
                  {isAdmin && (
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleEdit(motif)}
                        className="p-1 rounded text-slate-500 hover:text-amber-800 hover:bg-amber-100"
                        title="संपादन"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(motif.id)}
                        className="p-1 rounded text-slate-500 hover:text-rose-600 hover:bg-rose-100"
                        title="हटाएं"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Admin Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-700" />
                <h3 className="text-base font-black text-slate-900">
                  {editingMotif ? 'सोहराय आकृति संपादित करें' : 'नयी सोहराय आकृति जोड़ें'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">नाम (संताली देवनागरी)</label>
                  <input
                    type="text"
                    required
                    value={formData.nameDevanagari || ''}
                    onChange={(e) => setFormData({ ...formData, nameDevanagari: e.target.value })}
                    placeholder="उदा. मारोक (मोर)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">नाम (Roman Script)</label>
                  <input
                    type="text"
                    value={formData.nameRoman || ''}
                    onChange={(e) => setFormData({ ...formData, nameRoman: e.target.value })}
                    placeholder="e.g. Marok"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">हिंदी शीर्षक / अर्थ</label>
                  <input
                    type="text"
                    required
                    value={formData.titleHindi || ''}
                    onChange={(e) => setFormData({ ...formData, titleHindi: e.target.value })}
                    placeholder="उदा. पवित्र मयूर - समृद्धि"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">श्रेणी (Category)</label>
                  <select
                    value={formData.category || 'animals'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                  >
                    <option value="birds">पक्षी (birds)</option>
                    <option value="animals">पशुधन (animals)</option>
                    <option value="flora">वनस्पति (flora)</option>
                    <option value="celestial">खगोलीय (celestial)</option>
                    <option value="ritual">नृत्य व संस्कार (ritual)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">सांस्कृतिक प्रतीकत्व व विवरण</label>
                <textarea
                  rows={2}
                  required
                  value={formData.symbolism || ''}
                  onChange={(e) => setFormData({ ...formData, symbolism: e.target.value })}
                  placeholder="सोहराय पर्व में इसका क्या महत्व है..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">प्राकृतिक रंग सामग्री</label>
                <input
                  type="text"
                  value={formData.naturalPigment || ''}
                  onChange={(e) => setFormData({ ...formData, naturalPigment: e.target.value })}
                  placeholder="उदा. दुरुम हासा (लाल गेरू मिट्टी) व खड़िया"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">आध्यात्मिक भावार्थ (Sacred Meaning)</label>
                <textarea
                  rows={2}
                  value={formData.sacredMeaning || ''}
                  onChange={(e) => setFormData({ ...formData, sacredMeaning: e.target.value })}
                  placeholder="दार्शनिक व पूर्वज मान्यता..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-800 hover:bg-amber-700 text-white rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
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
