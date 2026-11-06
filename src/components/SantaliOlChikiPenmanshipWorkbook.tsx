import React, { useState, useRef, useEffect } from 'react';
import { PenTool, Download, RefreshCw, Volume2, Sparkles, CheckCircle2, BookOpen, Layers } from 'lucide-react';

interface OlChikiChar {
  char: string;
  name: string;
  devanagariEquiv: string;
  romanPhonetic: string;
  meaning: string;
  strokeHint: string;
}

const OL_CHIKI_CHARS: OlChikiChar[] = [
  { char: 'ᱚ', name: 'La', devanagariEquiv: 'अ (ह्रस्व)', romanPhonetic: 'O / Aw', meaning: 'जलती हुई अग्नि व मुड़े हुए होंठ', strokeHint: 'ऊपर से गोल घुमाकर नीचे लाएं' },
  { char: 'ᱛ', name: 'At', devanagariEquiv: 'त', romanPhonetic: 'T', meaning: 'पृथ्वी की गोल मेड़ व आधार', strokeHint: 'ऊपर से नीचे सीधा डंडा फिर बायां वक्र' },
  { char: 'ᱜ', name: 'Ag', devanagariEquiv: 'ग', romanPhonetic: 'G', meaning: 'उल्टी कुल्हाड़ी का सिरा', strokeHint: 'बायें से दायें अर्धवृत्त' },
  { char: 'ᱝ', name: 'Ang', devanagariEquiv: 'ङ (अनुस्वार)', romanPhonetic: 'Ng', meaning: 'पक्षी की चोंच', strokeHint: 'ऊपर की ओर तिरछा स्ट्रोक' },
  { char: 'ᱞ', name: 'Al', devanagariEquiv: 'ल', romanPhonetic: 'L', meaning: 'झरने का गिरता जल प्रवाह', strokeHint: 'ऊपर से नीचे लहराती रेखा' },

  { char: 'ᱟ', name: 'Aak', devanagariEquiv: 'आ (दीर्घ)', romanPhonetic: 'Aa', meaning: 'फावड़ा चलाते किसान का हाथ', strokeHint: 'गोल वृत्त बनाकर दायें लकीर' },
  { char: 'ᱠ', name: 'Aak', devanagariEquiv: 'क', romanPhonetic: 'K', meaning: 'पक्षी का पंख', strokeHint: 'ऊर्ध्वाधर रेखा पर दो वक्र' },
  { char: 'ᱡ', name: 'Aaj', devanagariEquiv: 'ज', romanPhonetic: 'J', meaning: 'बैठने का पीढ़ा', strokeHint: 'नीचे क्षैतिज रेखा और ऊपर चाप' },
  { char: 'ᱢ', name: 'Aam', devanagariEquiv: 'म', romanPhonetic: 'M', meaning: 'मुस्कुराता हुआ चेहरा', strokeHint: 'दो जुड़े हुए अर्धवृत्त' },
  { char: 'ᱣ', name: 'Aaw', devanagariEquiv: 'व', romanPhonetic: 'W', meaning: 'उड़ता हुआ बाण', strokeHint: 'तिरछी रेखा के साथ सिरा' },

  { char: 'ᱤ', name: 'Is', devanagariEquiv: 'इ', romanPhonetic: 'I', meaning: 'हंसी की लकीर', strokeHint: 'ऊपर से नीचे सीधी लकीर' },
  { char: 'ᱥ', name: 'Is', devanagariEquiv: 'स', romanPhonetic: 'S', meaning: 'हंसिया (दातरोम)', strokeHint: 'अर्धचंद्राकार वक्र' },
  { char: 'ᱦ', name: 'Ih', devanagariEquiv: 'ह', romanPhonetic: 'H', meaning: 'खुला मुंह', strokeHint: 'खुला वक्र स्ट्रोक' },
  { char: 'ᱧ', name: 'Iny', devanagariEquiv: 'ञ', romanPhonetic: 'Ny', meaning: 'बैल का सींग', strokeHint: 'उभयलिंगी घुमाव' },
  { char: 'ᱨ', name: 'Ir', devanagariEquiv: 'र', romanPhonetic: 'R', meaning: 'दौड़ता हुआ हिरण', strokeHint: 'ऊपर दायें से नीचे बायां मोड़' },

  { char: 'ᱩ', name: 'Uch', devanagariEquiv: 'उ', romanPhonetic: 'U', meaning: 'कुआं या गर्त', strokeHint: 'गहरा कटोरा आकार' },
  { char: 'ᱪ', name: 'Uch', devanagariEquiv: 'च', romanPhonetic: 'Ch', meaning: 'चिमटा', strokeHint: 'दो परस्पर जुड़े छोर' },
  { char: 'ᱫ', name: 'Ud', devanagariEquiv: 'द', romanPhonetic: 'D', meaning: 'मृदंग का सिरा', strokeHint: 'गोल सिरा' },
  { char: 'ᱬ', name: 'Unn', devanagariEquiv: 'ण', romanPhonetic: 'Nn', meaning: 'नाल की आकृति', strokeHint: 'नीचे की ओर गोल' },
  { char: 'ᱭ', name: 'Uy', devanagariEquiv: 'य', romanPhonetic: 'Y', meaning: 'उछलता मेंढक', strokeHint: 'ऊपर उठता हुआ वक्र' }
];

export const SantaliOlChikiPenmanshipWorkbook: React.FC = () => {
  const [selectedChar, setSelectedChar] = useState<OlChikiChar>(OL_CHIKI_CHARS[0]);
  const [brushColor, setBrushColor] = useState<string>('#10b981');
  const [brushSize, setBrushSize] = useState<number>(6);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [showWatermark, setShowWatermark] = useState<boolean>(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Clear canvas and draw watermark outline
  const resetCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background paper
    ctx.fillStyle = '#1c1917'; // stone-900 paper
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calligraphy grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;

    // Top, middle, baseline
    [100, 200, 300].forEach(y => {
      ctx.beginPath();
      ctx.moveTo(30, y);
      ctx.lineTo(canvas.width - 30, y);
      ctx.stroke();
    });

    // Vertical center line
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(canvas.width / 2, 40);
    ctx.lineTo(canvas.width / 2, canvas.height - 40);
    ctx.stroke();
    ctx.setLineDash([]);

    // Watermark letter in center
    if (showWatermark) {
      ctx.font = 'bold 180px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedChar.char, canvas.width / 2, 200);
    }
  };

  useEffect(() => {
    resetCanvas();
  }, [selectedChar, showWatermark]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = getPos(e, canvas);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const getPos = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const downloadWorksheet = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `ol-chiki-calligraphy-${selectedChar.name}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const speakPhonetic = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(selectedChar.devanagariEquiv);
      u.lang = 'hi-IN';
      u.rate = 0.8;
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-50 via-stone-50 to-emerald-50 border border-teal-200/40 rounded-2xl p-6 text-slate-900 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100/60 border border-teal-300/40 rounded-full text-xs font-semibold text-teal-800 mb-3">
            <PenTool className="w-3.5 h-3.5" />
            <span>ओल चेमेत व सुलेखन (Ol Chiki Interactive Penmanship)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-teal-800">
            ओल चिकी व संताली सुलेखन अभ्यास पुस्तिका
          </h1>
          <p className="text-stone-700 text-sm mt-2 leading-relaxed">
            गुरु गोमके पंडित रघुनाथ मुर्मू द्वारा १९२५ में रचित ओल चिकी (ᱚᱞ ᱪᱤᱠᱤ) लिपि के ३० मूल वर्णों को सही स्ट्रोक दिशा में लिखना सीखें। स्क्रीन पर डिजिटल कलम से अभ्यास करें अथवा A4 सुलेखन अभ्यास पत्रक डाउनलोड करें।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Character Selector Grid */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-200 text-xs font-bold text-stone-700">
              <span>वर्ण चुनें (Select Ol Chiki Letter)</span>
              <span className="text-teal-600 font-mono">{selectedChar.char} = {selectedChar.devanagariEquiv}</span>
            </div>

            <div className="grid grid-cols-5 gap-2 max-h-[460px] overflow-y-auto pr-1">
              {OL_CHIKI_CHARS.map(item => {
                const isSelected = selectedChar.char === item.char;
                return (
                  <button
                    key={item.char}
                    onClick={() => setSelectedChar(item)}
                    className={`h-16 rounded-xl border flex flex-col items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-teal-600 text-white border-teal-400 shadow-lg scale-105 z-10'
                        : 'bg-white hover:bg-stone-100 text-stone-800 border-stone-200'
                    }`}
                  >
                    <span className="text-2xl font-bold leading-none">{item.char}</span>
                    <span className="text-[10px] opacity-75 mt-1 font-mono">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Letter Info Card */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-3 shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-3xl font-bold text-amber-700">{selectedChar.char}</span>
                <span className="text-sm text-stone-700 font-bold ml-3">
                  {selectedChar.name} • {selectedChar.devanagariEquiv}
                </span>
                <p className="text-xs text-stone-600 font-mono mt-0.5">रोमन: {selectedChar.romanPhonetic}</p>
              </div>
              <button
                onClick={speakPhonetic}
                className="p-2 bg-teal-50/40 hover:bg-teal-100/60 text-teal-800 rounded-lg border border-teal-200/50"
                title="ध्वनि सुनें"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-white rounded-xl border border-stone-200 text-xs text-stone-700">
              <strong className="text-teal-600 block mb-1">आकृति व दार्शनिक आधार:</strong>
              {selectedChar.meaning}
            </div>
            <div className="text-xs text-amber-700/90 font-medium">
              ✍️ स्ट्रोक दिशा: {selectedChar.strokeHint}
            </div>
          </div>
        </div>

        {/* Interactive Tracing Canvas */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 shadow-xl text-center">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-200 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-stone-600 font-medium">स्याही:</span>
                {['#10b981', '#f59e0b', '#38bdf8', '#ffffff'].map(c => (
                  <button
                    key={c}
                    onClick={() => setBrushColor(c)}
                    style={{ backgroundColor: c }}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${
                      brushColor === c ? 'border-white scale-110' : 'border-transparent'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-stone-600 font-medium">मोटाई:</span>
                <input
                  type="range"
                  min="2"
                  max="14"
                  value={brushSize}
                  onChange={e => setBrushSize(Number(e.target.value))}
                  className="w-20 accent-teal-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowWatermark(!showWatermark)}
                  className={`px-3 py-1 rounded-lg border text-xs ${
                    showWatermark
                      ? 'bg-stone-100 border-teal-500 text-teal-700'
                      : 'bg-white border-stone-200 text-stone-600'
                  }`}
                >
                  ट्रेस गाइड {showWatermark ? 'चालू' : 'बंद'}
                </button>
                <button
                  onClick={resetCanvas}
                  className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg"
                  title="कैनवास साफ करें"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={downloadWorksheet}
                  className="flex items-center gap-1 px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>वर्कशीट PNG</span>
                </button>
              </div>
            </div>

            {/* Canvas Surface */}
            <div className="flex justify-center touch-none">
              <canvas
                ref={canvasRef}
                width={500}
                height={400}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="rounded-xl shadow-2xl cursor-crosshair border-2 border-stone-200 max-w-full h-auto bg-white"
              />
            </div>
            <p className="text-[11px] text-stone-600 mt-3">
              माउस या उंगली से हल्के हाथ से वर्ण को ऊपर से नीचे ट्रेस करें।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
