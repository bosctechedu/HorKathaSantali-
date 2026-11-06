import React, { useState, useRef, useEffect } from 'react';
import { Palette, Volume2, Info, Sparkles, RefreshCw, Eraser, Brush, Layers } from 'lucide-react';

interface EarthPigment {
  id: string;
  santaliName: string;
  hindiName: string;
  mineralSource: string;
  symbolism: string;
  extractionProcess: string;
  hexColor: string;
  cssBackground: string;
}

const EARTH_PIGMENTS: EarthPigment[] = [
  {
    id: 'dudhi',
    santaliName: 'Dudhi Hasba (दुधी हासबा)',
    hindiName: 'श्वेत केओलिन (दुधी माटी)',
    mineralSource: 'पवित्र नदी-घाटी की गहरी परतों में मिलने वाली शुद्ध सफेद चिकनी मिट्टी (Kaolin clay)',
    symbolism: 'शुद्धता, पूर्वजों का सत्कार, शांति व पवित्रता का प्रतीक। सोहराय भित्ति पर पृष्ठभूमि की पहली परत।',
    extractionProcess: 'घाटी से खुदाई के उपरांत धूप में सुखाया जाता है, फिर पानी में घोलकर महीन कपड़े से छाना जाता है ताकि कंकड़ अलग हो सकें।',
    hexColor: '#FAF8F0',
    cssBackground: 'bg-stone-100 border-stone-300'
  },
  {
    id: 'lal',
    santaliName: 'Lal Hasba / Geru (लाल हासबा / गेरू)',
    hindiName: 'रक्तवर्णी लौह-अयस्क माटी (हेमेटाइट)',
    mineralSource: 'पहाड़ी नालों व लेटराइट चट्टानों से प्राप्त लौह-ऑक्साइड युक्त लाल मिट्टी',
    symbolism: 'जीवन-ऊर्जा, मातृशक्ति, पृथ्वी की उर्वरता और पशुधन के प्रति कृतज्ञता।',
    extractionProcess: 'लाल पत्थरों को सिलबट्टे पर बारीक पीसा जाता है और महुआ के बीजों के तेल की कुछ बूंदें मिलाकर गाढ़ा लेप तैयार होता है।',
    hexColor: '#9C3424',
    cssBackground: 'bg-red-800 text-white'
  },
  {
    id: 'hende',
    santaliName: 'Hende Hasba (हेन्डे हासबा)',
    hindiName: 'श्याम मैंगनीज व काष्ठ चारकोल',
    mineralSource: 'खदानों के समीप मिलने वाली मैंगनीज युक्त काली मिट्टी अथवा सरजोम (साल) लकड़ी का कोयला',
    symbolism: 'पूर्वज बोंगा, गहन अंतरिक्ष और बुरी शक्तियों से घर की रक्षा करने वाली दिव्य ढाल।',
    extractionProcess: 'साल लकड़ी के कोयले को कूटकर पके हुए भात के मांड़ (दाका दाः) के साथ घोंटकर गहरा काला जलरोधक रंग तैयार किया जाता है।',
    hexColor: '#1F1F1F',
    cssBackground: 'bg-neutral-900 text-white'
  },
  {
    id: 'sasang',
    santaliName: 'Sasang Hasba (सासन्ग हासबा / पीली माटी)',
    hindiName: 'पीत गेरू (Yellow Ochre)',
    mineralSource: 'हल्दी रंग की प्राकृतिक गेरू मिट्टी जो पुराने टीलों की आंतरिक परतों में मिलती है',
    symbolism: 'सूर्य का तेज, पकी हुई धान की सुनहरी बालियां और गृहस्थी की समृद्धि।',
    extractionProcess: 'मिट्टी को पीसकर छानने के बाद थोड़ा सा महुआ रस मिलाया जाता है ताकि दीवारों पर चमक और स्थायित्व आए।',
    hexColor: '#D97706',
    cssBackground: 'bg-amber-600 text-white'
  }
];

const TRADITIONAL_TOOLS = [
  {
    nameSantali: 'Datan Kuchi (दातुन कूची)',
    nameHindi: 'कुचला हुआ बबूल/नीम दातुन ब्रश',
    useCase: 'सोहराय के ज्यामितीय बॉर्डर, पशु-पक्षियों की आंखें और महीन रेखाएं खींचने हेतु।',
    details: 'ताजी टहनी के एक सिरे को दांतों या पत्थर से कूटकर रेशेदार बारीक ब्रश बनाया जाता है।'
  },
  {
    nameSantali: 'Pual Phurkhi (पुआल फुरखी)',
    nameHindi: 'धान का पुआल व कपड़े का स्वाब',
    useCase: 'दीवारों पर दुधी माटी की मोटी पृष्ठभूमि परत पोतने के लिए।',
    details: 'धान के सूखे पुआल को मोड़कर गुच्छा बनाया जाता है, जिससे रंग की समान परत चढ़ती है।'
  },
  {
    nameSantali: 'Nakhi / Sgraffito Comb (नाखी कंधी)',
    nameHindi: 'टूटी हुई कंघी या खजूर की तीली',
    useCase: 'काली गीली परत के ऊपर सफेद रेखाओं को खुरचकर उभारने (Sgraffito) की प्राचीन तकनीक।',
    details: 'गीले रंग के ऊपर कंघी चलाकर मोर के पंख, लहरदार जलधारा और कमल की पंखुड़ियां बनाई जाती हैं।'
  }
];

export const SantaliNaturalPigmentsCraft: React.FC = () => {
  const [selectedPigment, setSelectedPigment] = useState<EarthPigment>(EARTH_PIGMENTS[0]);
  const [activeBrushColor, setActiveBrushColor] = useState<string>(EARTH_PIGMENTS[1].hexColor);
  const [brushSize, setBrushSize] = useState<number>(8);
  const [brushTool, setBrushTool] = useState<'kuchi' | 'comb' | 'eraser'>('kuchi');
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // Initialize canvas with earthen background
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clay plaster texture base
    ctx.fillStyle = '#E8E0D2';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle clay wall stippling
    ctx.fillStyle = '#DFD6C5';
    for (let i = 0; i < 400; i++) {
      const rx = Math.random() * canvas.width;
      const ry = Math.random() * canvas.height;
      const rSize = Math.random() * 3 + 1;
      ctx.fillRect(rx, ry, rSize, rSize);
    }

    // Default welcoming mural motif (Fish & Lotus outline)
    ctx.strokeStyle = '#9C3424';
    ctx.lineWidth = 4;
    ctx.beginPath();
    // Simple fish glyph
    ctx.ellipse(120, 100, 45, 22, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(165, 100);
    ctx.lineTo(195, 80);
    ctx.lineTo(195, 120);
    ctx.closePath();
    ctx.stroke();
  };

  useEffect(() => {
    initCanvas();
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.beginPath();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    if (brushTool === 'eraser') {
      ctx.fillStyle = '#E8E0D2';
      ctx.beginPath();
      ctx.arc(x, y, brushSize * 1.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (brushTool === 'comb') {
      // Sgraffito comb effect - 3 parallel lines
      ctx.strokeStyle = activeBrushColor;
      ctx.lineWidth = 2;
      for (let offset of [-6, 0, 6]) {
        ctx.beginPath();
        ctx.arc(x + offset, y + offset, brushSize / 2, 0, Math.PI * 2);
        ctx.stroke();
      }
    } else {
      // Datan Kuchi natural brush
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = activeBrushColor;

      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'hi-IN';
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-red-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-amber-800/40 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-amber-500/30">
              <Palette className="w-4 h-4" />
              सोहराय माटी रसायन • Indigenous Mineral Pigments
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-amber-50">
              प्राकृतिक भित्ति वर्ण द्रव्य व सोहराय माटी रसायन
            </h1>
            <p className="mt-2 text-amber-200/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              दुधी माटी, लाल हासबा (गेरू), हेन्डे हासबा (काला मैंगनीज) व पीली गेरू की भू-रसायन विद्या, दातुन कूची शिल्प और सजीव डिजिटल भित्ति कैनवास।
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Pigments & Interactive Wall Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Pigments List */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 px-1 flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-600" />
            पारंपरिक चार प्राकृतिक खनिज वर्ण:
          </h2>

          <div className="space-y-3">
            {EARTH_PIGMENTS.map((pigment) => {
              const isSelected = selectedPigment.id === pigment.id;
              return (
                <div
                  key={pigment.id}
                  onClick={() => {
                    setSelectedPigment(pigment);
                    setActiveBrushColor(pigment.hexColor);
                  }}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-600 shadow-md ring-2 ring-amber-500/20'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-xl shadow-inner border border-black/20 flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: pigment.hexColor }}
                      />
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-base">
                          {pigment.santaliName}
                        </div>
                        <div className="text-xs text-amber-700 dark:text-amber-400 font-semibold">
                          {pigment.hindiName}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                          {pigment.symbolism}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(`${pigment.santaliName}. ${pigment.hindiName}. ${pigment.symbolism}`);
                      }}
                      className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-100 dark:hover:bg-amber-900/50"
                      title="विवरण सुनें"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Traditional Tools Overview */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Brush className="w-4 h-4 text-amber-600" />
              पारंपरिक कूची व टूल्स:
            </h3>
            <div className="space-y-2.5">
              {TRADITIONAL_TOOLS.map((tool, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{tool.nameSantali}</span>
                  <span className="text-slate-500 dark:text-slate-400"> - {tool.nameHindi}</span>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5">{tool.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Clay Wall Canvas & Toolset */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  सोहराय भित्ति चित्रकारी कैनवास (Mural Sandbox)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  माटी की दीवार पर प्राकृतिक खनिज रंगों और दातुन कूची से चित्र बनाएं
                </p>
              </div>

              {/* Reset Canvas Button */}
              <button
                onClick={initCanvas}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                दीवार पुनः लेपें
              </button>
            </div>

            {/* Canvas Toolbar */}
            <div className="flex flex-wrap items-center gap-3 p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40">
              {/* Tool selection */}
              <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setBrushTool('kuchi')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                    brushTool === 'kuchi'
                      ? 'bg-amber-600 text-white'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                  title="दातुन कूची ब्रश"
                >
                  <Brush className="w-3.5 h-3.5" />
                  दातुन कूची
                </button>
                <button
                  onClick={() => setBrushTool('comb')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                    brushTool === 'comb'
                      ? 'bg-amber-600 text-white'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                  title="नाखी कंधी (कंगी खुरचन)"
                >
                  नाखी (कंधी)
                </button>
                <button
                  onClick={() => setBrushTool('eraser')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                    brushTool === 'eraser'
                      ? 'bg-amber-600 text-white'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                  title="मिटाएं"
                >
                  <Eraser className="w-3.5 h-3.5" />
                  मिटाएं
                </button>
              </div>

              {/* Color swatches */}
              <div className="flex items-center gap-1.5">
                {EARTH_PIGMENTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActiveBrushColor(p.hexColor);
                      if (brushTool === 'eraser') setBrushTool('kuchi');
                    }}
                    style={{ backgroundColor: p.hexColor }}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      activeBrushColor === p.hexColor && brushTool !== 'eraser'
                        ? 'border-amber-900 scale-110 shadow-md ring-2 ring-amber-400'
                        : 'border-white/80 opacity-90'
                    }`}
                    title={p.santaliName}
                  />
                ))}
              </div>

              {/* Brush size slider */}
              <div className="flex items-center gap-2 ml-auto text-xs text-slate-600 dark:text-slate-300">
                <span>मोटाई:</span>
                <input
                  type="range"
                  min="2"
                  max="24"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-20 accent-amber-600"
                />
                <span className="font-mono text-xs w-4">{brushSize}</span>
              </div>
            </div>

            {/* Drawing Canvas */}
            <div className="relative rounded-2xl overflow-hidden shadow-inner border-4 border-amber-900/20 bg-[#E8E0D2] touch-none">
              <canvas
                ref={canvasRef}
                width={640}
                height={380}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onMouseMove={draw}
                onTouchStart={startDrawing}
                onTouchEnd={stopDrawing}
                onTouchMove={draw}
                className="w-full h-80 sm:h-96 cursor-crosshair block"
              />
            </div>

            {/* Selected Pigment Detail Card */}
            <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/40 text-xs space-y-2">
              <div className="font-bold text-amber-900 dark:text-amber-200 text-sm flex items-center justify-between">
                <span>चुने गए रंग का भू-रासायनिक स्रोत: {selectedPigment.hindiName}</span>
                <span className="font-mono text-xs text-amber-700 dark:text-amber-400">{selectedPigment.hexColor}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                <strong>प्राप्ति व शोधन विधि:</strong> {selectedPigment.extractionProcess}
              </p>
              <p className="text-slate-600 dark:text-slate-300">
                <strong>पारंपरिक विश्वास:</strong> {selectedPigment.mineralSource}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
