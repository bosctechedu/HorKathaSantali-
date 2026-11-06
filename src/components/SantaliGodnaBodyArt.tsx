import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Download, RefreshCw, Info, Check, ShieldCheck, Heart, Volume2 } from 'lucide-react';

interface GodnaMotif {
  id: string;
  nameDev: string;
  nameRom: string;
  category: 'sika' | 'women_godna' | 'sacred_symbols';
  symbolPath: string; // SVG path data or draw command
  meaning: string;
  culturalLore: string;
}

const GODNA_MOTIFS: GodnaMotif[] = [
  {
    id: 'sika_3',
    nameDev: 'सिका ३ दागा (पुरुष बांह)',
    nameRom: 'Sika 3 Daga',
    category: 'sika',
    symbolPath: 'circle_3',
    meaning: 'तीन लोक व तीन देव (मारंग बुरु, जाहेर एरा, मोड़ेको-तुरूइको) का पावन रक्षक चिह्न।',
    culturalLore: 'संथाल किशोरों की बायीं कलाई पर जलते सूती धागे से 3 गोल निशान दागे जाते हैं। यह वयस्कता और कबीलाई पहचान की अनिवार्य कसौटी है।'
  },
  {
    id: 'sika_5',
    nameDev: 'सिका ५ दागा (पंच कुल)',
    nameRom: 'Sika 5 Daga',
    category: 'sika',
    symbolPath: 'circle_5',
    meaning: 'पांच तत्वों और "मोड़े होड़" (गांव के पांच प्रधानों) की सामाजिक एकता का प्रतीक।',
    culturalLore: 'संथाल मान्यता है कि मृत्यु के बाद जब आत्मा हाना पुरी (परलोक) जाती है, तब यमदूत सिका देखकर ही संथाल कुल के पूर्वज लोक में प्रवेश देते हैं।'
  },
  {
    id: 'sika_7',
    nameDev: 'सिका ७ दागा (सप्त वंशज)',
    nameRom: 'Sika 7 Daga',
    category: 'sika',
    symbolPath: 'circle_7',
    meaning: 'चांपागढ़ के सात भाइयों की वीरता और सात पीढ़ियों की अटूट पारिवारिक मर्यादा।',
    culturalLore: 'यह वीर शिकारियों और मांझी बाबा के वंशजों की पहचान के रूप में विशेष सम्मान पाता है।'
  },
  {
    id: 'jaher_tree',
    nameDev: 'जाहेर दारू (पवित्र साल वृक्ष)',
    nameRom: 'Jaher Daru',
    category: 'sacred_symbols',
    symbolPath: 'tree',
    meaning: 'जाहेर एरा (ग्राम देवी) का पावन निवास। सुख, समृद्धि और संतान रक्षा का वरदान।',
    culturalLore: 'संथाल महिलाएं इसे अपनी कलाई या सीने के पास गुदवाती हैं ताकि जाहेर थान का आशीर्वाद हर सांस के साथ रहे।'
  },
  {
    id: 'marak_il',
    nameDev: 'मारोक इल (मयूर पंख)',
    nameRom: 'Marak Il',
    category: 'women_godna',
    symbolPath: 'feather',
    meaning: 'नृत्य, सुंदरता और विषैले जीवों से प्राकृतिक सुरक्षा का प्रतीक।',
    culturalLore: 'दासांय और सोहराय नृत्य में महिलाएं और युवतियां इसे हाथों और पैरों के पंजों पर गुदवाती हैं।'
  },
  {
    id: 'hako_janum',
    nameDev: 'हाको जानुम (मत्स्य कंटक)',
    nameRom: 'Hako Janum',
    category: 'women_godna',
    symbolPath: 'fishbone',
    meaning: 'जीवन में कांटों और संकटों को चीरकर आगे बढ़ने की जीवटता।',
    culturalLore: 'नदी की मछली की रीढ़ जैसी सुंदर ज्यामितीय रेखाएं पैरों और बाहों पर अंकित की जाती हैं।'
  },
  {
    id: 'chando_ber',
    nameDev: 'चांदो-बेर (सूर्य व चंद्रमा)',
    nameRom: 'Chando-Ber',
    category: 'sacred_symbols',
    symbolPath: 'sunmoon',
    meaning: 'सृष्टि के आदि साक्षी और सनातन प्रकाश (ठाकुर जीउ)।',
    culturalLore: 'कहा जाता है कि सारे सांसारिक आभूषण शरीर से उतार लिए जाते हैं, केवल गोदना ही आत्मा के साथ परलोक जाता है।'
  },
  {
    id: 'pai_chhad',
    nameDev: 'पाई छड़ (अन्न माप व चौखट)',
    nameRom: 'Pai Chhad',
    category: 'women_godna',
    symbolPath: 'grid',
    meaning: 'घर में कभी अन्न की कमी न हो; लक्ष्मी व खुशहाली का स्थायी वास।',
    culturalLore: 'हथेली के पिछले भाग पर गुदवाया जाने वाला पारंपरिक धान-माप चौखट पैटर्न।'
  }
];

export const SantaliGodnaBodyArt: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'sika' | 'women_godna' | 'sacred_symbols'>('all');
  const [canvasBgColor, setCanvasBgColor] = useState<string>('#966a4f');
  const [inkColor, setInkColor] = useState<string>('#13271a'); // traditional greenish black kajal-indigo
  const [stampedMotifs, setStampedMotifs] = useState<{ id: string; motif: GodnaMotif; x: number; y: number }[]>([]);
  const [activeMotif, setActiveMotif] = useState<GodnaMotif>(GODNA_MOTIFS[0]);
  const [activeTab, setActiveTab] = useState<'studio' | 'cultural_lore' | 'songs'>('studio');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filter motifs
  const filteredMotifs = selectedCategory === 'all'
    ? GODNA_MOTIFS
    : GODNA_MOTIFS.filter(m => m.category === selectedCategory);

  // Redraw canvas whenever stamped motifs, bg color or ink color changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw forearm / background
    ctx.fillStyle = canvasBgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle skin texture/noise
    ctx.fillStyle = 'rgba(0,0,0,0.03)';
    for (let i = 0; i < 400; i++) {
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    }

    // Border guideline
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    // Draw stamped motifs
    stampedMotifs.forEach(item => {
      drawMotifOnCanvas(ctx, item.motif, item.x, item.y, inkColor);
    });
  }, [stampedMotifs, canvasBgColor, inkColor]);

  const drawMotifOnCanvas = (ctx: CanvasRenderingContext2D, motif: GodnaMotif, x: number, y: number, color: string) => {
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    switch (motif.symbolPath) {
      case 'circle_3':
        for (let i = -1; i <= 1; i++) {
          ctx.beginPath();
          ctx.arc(x, y + i * 36, 10, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x, y + i * 36, 16, 0, Math.PI * 2);
          ctx.stroke();
        }
        break;

      case 'circle_5':
        for (let i = -2; i <= 2; i++) {
          ctx.beginPath();
          ctx.arc(x, y + i * 26, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x, y + i * 26, 13, 0, Math.PI * 2);
          ctx.stroke();
        }
        break;

      case 'circle_7':
        for (let i = -3; i <= 3; i++) {
          ctx.beginPath();
          ctx.arc(x, y + i * 20, 6, 0, Math.PI * 2);
          ctx.fill();
        }
        break;

      case 'tree':
        // Jaher Than Sal Tree
        ctx.beginPath();
        ctx.moveTo(x, y + 40);
        ctx.lineTo(x, y - 40);
        ctx.stroke();
        // branches
        [-20, 0, 20].forEach((offsetY, idx) => {
          ctx.beginPath();
          ctx.moveTo(x, y + offsetY);
          ctx.lineTo(x - 25 - idx * 5, y + offsetY - 18);
          ctx.moveTo(x, y + offsetY);
          ctx.lineTo(x + 25 + idx * 5, y + offsetY - 18);
          ctx.stroke();
        });
        break;

      case 'feather':
        // Peacock Feather
        ctx.beginPath();
        ctx.moveTo(x, y + 45);
        ctx.quadraticCurveTo(x + 5, y, x, y - 45);
        ctx.stroke();
        // Eye of feather
        ctx.beginPath();
        ctx.ellipse(x, y - 25, 12, 18, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y - 25, 6, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'fishbone':
        // Hako Janum
        ctx.beginPath();
        ctx.moveTo(x, y - 40);
        ctx.lineTo(x, y + 40);
        ctx.stroke();
        for (let i = -30; i <= 30; i += 15) {
          ctx.beginPath();
          ctx.moveTo(x - 20, y + i - 8);
          ctx.lineTo(x, y + i);
          ctx.lineTo(x + 20, y + i - 8);
          ctx.stroke();
        }
        break;

      case 'sunmoon':
        // Sun & Moon
        ctx.beginPath();
        ctx.arc(x, y, 16, 0, Math.PI * 2);
        ctx.stroke();
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
          ctx.beginPath();
          ctx.moveTo(x + Math.cos(a) * 20, y + Math.sin(a) * 20);
          ctx.lineTo(x + Math.cos(a) * 28, y + Math.sin(a) * 28);
          ctx.stroke();
        }
        break;

      case 'grid':
        // Pai Chhad
        ctx.strokeRect(x - 25, y - 25, 50, 50);
        ctx.beginPath();
        ctx.moveTo(x - 25, y);
        ctx.lineTo(x + 25, y);
        ctx.moveTo(x, y - 25);
        ctx.lineTo(x, y + 25);
        ctx.moveTo(x - 25, y - 25);
        ctx.lineTo(x + 25, y + 25);
        ctx.moveTo(x + 25, y - 25);
        ctx.lineTo(x - 25, y + 25);
        ctx.stroke();
        break;

      default:
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setStampedMotifs(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        motif: activeMotif,
        x,
        y
      }
    ]);
  };

  const handleClearCanvas = () => {
    setStampedMotifs([]);
  };

  const handleDownloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `santali-godna-art-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
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
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-stone-50 to-emerald-50 border border-amber-200/40 rounded-2xl p-6 text-slate-900 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100/60 border border-amber-300/40 rounded-full text-xs font-semibold text-amber-800 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>अमर देह कला व कबीलाई पहचान (Immortal Ancestral Marks)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-amber-800">
            सिका दागा व गोदना: संथाल देह-कला व हाना पुरी दर्शन
          </h1>
          <p className="text-stone-700 text-sm mt-2 leading-relaxed">
            "दाना-पानी, गहना-जेवर सब धरती पर छूट जाएगा, केवल सिका और गोदना ही जीवात्मा के साथ परलोक (हाना पुरी) तक जाएगा।" जानिए संथाल पुरुषों के बांह के सिका (३, ५, ७ दागा) व महिलाओं के पवित्र गोदना प्रतीकों का रहस्य।
          </p>

          {/* Navigation Sub-Tabs */}
          <div className="flex flex-wrap gap-2 mt-5">
            <button
              onClick={() => setActiveTab('studio')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'studio'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-stone-50/60 hover:bg-stone-100/60 text-stone-800 border border-stone-200/50'
              }`}
            >
              डिजिटल सिका व गोदना स्टूडियो
            </button>
            <button
              onClick={() => setActiveTab('cultural_lore')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'cultural_lore'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-stone-50/60 hover:bg-stone-100/60 text-stone-800 border border-stone-200/50'
              }`}
            >
              सिका व गोदना का दर्शन व इतिहास
            </button>
            <button
              onClick={() => setActiveTab('songs')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'songs'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-stone-50/60 hover:bg-stone-100/60 text-stone-800 border border-stone-200/50'
              }`}
            >
              पारंपरिक गोदना लोकगीत व धुन
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab 1: Studio */}
      {activeTab === 'studio' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Motifs Selector Panel */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-200">
                <span className="text-sm font-bold text-amber-800">पारंपरिक प्रतीक चुनें</span>
                <div className="flex gap-1 text-xs">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-2.5 py-1 rounded-md ${selectedCategory === 'all' ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-700'}`}
                  >
                    सभी
                  </button>
                  <button
                    onClick={() => setSelectedCategory('sika')}
                    className={`px-2.5 py-1 rounded-md ${selectedCategory === 'sika' ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-700'}`}
                  >
                    सिका (पुरुष)
                  </button>
                  <button
                    onClick={() => setSelectedCategory('women_godna')}
                    className={`px-2.5 py-1 rounded-md ${selectedCategory === 'women_godna' ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-700'}`}
                  >
                    गोदना (महिला)
                  </button>
                </div>
              </div>

              <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                {filteredMotifs.map(motif => {
                  const isSelected = activeMotif.id === motif.id;
                  return (
                    <div
                      key={motif.id}
                      onClick={() => setActiveMotif(motif)}
                      className={`p-3 rounded-xl cursor-pointer border transition-all ${
                        isSelected
                          ? 'bg-amber-50/70 border-amber-500 shadow-md'
                          : 'bg-white/60 hover:bg-stone-100/60 border-stone-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-stone-800">{motif.nameDev}</span>
                        <span className="text-xs text-amber-600 font-mono">({motif.nameRom})</span>
                      </div>
                      <p className="text-xs text-stone-600 mt-1">{motif.meaning}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Customizer Controls */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-3">
              <div className="text-xs font-bold text-stone-700">त्वचा / कैनवास रंग</div>
              <div className="flex gap-2">
                {[
                  { label: 'सांवला (Dusky)', color: '#966a4f' },
                  { label: 'गहरा (Deep Earth)', color: '#5e3f2d' },
                  { label: 'गेहुआं (Wheatish)', color: '#ba8c6a' },
                  { label: 'भोजपत्र (Bark/Canvas)', color: '#d9cbb4' }
                ].map(item => (
                  <button
                    key={item.color}
                    onClick={() => setCanvasBgColor(item.color)}
                    style={{ backgroundColor: item.color }}
                    className={`flex-1 h-9 rounded-lg border-2 text-xs font-semibold shadow-sm transition-transform ${
                      canvasBgColor === item.color ? 'border-amber-300 scale-105' : 'border-transparent'
                    }`}
                    title={item.label}
                  />
                ))}
              </div>

              <div className="text-xs font-bold text-stone-700 mt-3">गोदना स्याही (पारंपरिक काजल व नील)</div>
              <div className="flex gap-2">
                {[
                  { label: 'नील-काजल (Indigo Black)', color: '#102319' },
                  { label: 'कोयला काला (Charcoal)', color: '#09090b' },
                  { label: 'हरा नील (Forest Tint)', color: '#163828' }
                ].map(item => (
                  <button
                    key={item.color}
                    onClick={() => setInkColor(item.color)}
                    style={{ backgroundColor: item.color }}
                    className={`flex-1 h-8 rounded-lg border-2 text-xs transition-transform ${
                      inkColor === item.color ? 'border-amber-400 scale-105' : 'border-stone-200'
                    }`}
                    title={item.label}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Canvas Center */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 shadow-xl text-center">
              <div className="flex items-center justify-between mb-3 text-xs text-stone-600">
                <span>कैनवास पर कहीं भी क्लिक करके "{activeMotif.nameDev}" अंकित करें</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleClearCanvas}
                    className="flex items-center gap-1 px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>खाली करें</span>
                  </button>
                  <button
                    onClick={handleDownloadCanvas}
                    className="flex items-center gap-1 px-3.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PNG डाउनलोड</span>
                  </button>
                </div>
              </div>

              {/* The Actual Canvas */}
              <div className="flex justify-center">
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={420}
                  onClick={handleCanvasClick}
                  className="rounded-xl shadow-2xl cursor-crosshair border-2 border-stone-200 max-w-full h-auto"
                />
              </div>

              {/* Active Motif Lore Box */}
              <div className="mt-4 p-4 bg-white/80 border border-stone-200 rounded-xl text-left">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-amber-700">{activeMotif.nameDev}</span>
                  <button
                    onClick={() => speakText(activeMotif.nameDev + ': ' + activeMotif.meaning)}
                    className="p-1 bg-amber-50/40 text-amber-800 rounded hover:bg-amber-100/60"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-stone-700 mt-1 leading-relaxed">{activeMotif.culturalLore}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Cultural Lore */}
      {activeTab === 'cultural_lore' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-amber-700 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span>सिका दागा (पुरुषों की कलाई का अमर निशान)</span>
            </h3>
            <p className="text-stone-700 text-sm leading-relaxed">
              संथाल समाज में हर बालक जब १०-१४ वर्ष का होता है, तो उसके मामा या गांव के वरिष्ठ बुजुर्ग उसकी बायीं कलाई के अग्रभाग पर जलते हुए सूती कपड़े के छोर (बोंगा लुगुम) से दाग लगाते हैं।
            </p>
            <div className="space-y-2 text-xs text-stone-700 bg-white p-4 rounded-xl border border-stone-200">
              <p>• <strong>विषम संख्या का नियम:</strong> सिका हमेशा ३, ५ या ७ की विषम संख्या में ही होता है। सम संख्या (२, ४) संथाल दर्शन में अपूर्ण या अशुभ मानी जाती है।</p>
              <p>• <strong>विवाह की पात्रता:</strong> बिना सिका के किसी भी संथाल युवक का पारंपरिक संथाली विवाह (बापला) संपन्न नहीं हो सकता।</p>
              <p>• <strong>परलोक (हाना पुरी) में पहचान:</strong> पूर्वजों की मान्यता है कि मरने के बाद आत्मा जब वैतरणी पार करती है, तो सिका देखकर ही पुरखे उसे गले लगाते हैं।</p>
            </div>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-emerald-700 flex items-center gap-2">
              <Heart className="w-5 h-5 text-emerald-600" />
              <span>गोदना (संथाल नारियों का अविनाशी आभूषण)</span>
            </h3>
            <p className="text-stone-700 text-sm leading-relaxed">
              पारंपरिक रूप से महुआ के फूल के रस, बबूल के कांटे या तीन सुइयों और सरसों तेल के काजल व नील से गोदना गोदा जाता था।
            </p>
            <div className="space-y-2 text-xs text-stone-700 bg-white p-4 rounded-xl border border-stone-200">
              <p>• <strong>अमर धन:</strong> "माटी का शरीर माटी में मिल जाएगा, सोना-चांदी छीना जा सकता है, पर गोदना कभी नहीं छिन सकता।"</p>
              <p>• <strong>प्रकृति से तादात्म्य:</strong> गोदना के सभी रूपांकन साल के वृक्ष, मोर पंख, नदी की मछलियों और धान की बालियों पर आधारित होते हैं।</p>
              <p>• <strong>स्वास्थ्य लाभ:</strong> एक्यूप्रेशर बिंदुओं पर गोदना गुदवाने से जोड़ों के दर्द और वात रोग से रक्षा का प्राचीन अनुभव जुड़ा है।</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Ancestral Godna Songs */}
      {activeTab === 'songs' && (
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-6 max-w-3xl mx-auto">
          <div className="text-center">
            <h3 className="text-xl font-bold text-amber-800">गोदना गोदाय के पारंपरिक सेरेंग</h3>
            <p className="text-xs text-stone-600 mt-1">संथाल युवतियों द्वारा गोदना गुदवाते समय गाए जाने वाले करुण व उल्लासमय लोकगीत</p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-emerald-700">हाना पुरी रे बोंगा को कुली-मेया</span>
              <button
                onClick={() => speakText("गोदना गोदाइ लेबय गे, हाना पुरी रे बोंगा को कुली-मेया")}
                className="p-1.5 bg-emerald-50/50 text-emerald-800 rounded-lg hover:bg-emerald-100"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-amber-800 font-serif leading-relaxed italic">
              "गोदना गोदाइ लेबय गे माई रे,<br />
              हाना पुरी रे बोंगा को कुली-मेया...<br />
              चेले काते सेतेर अकाना-म?<br />
              सिका चिन्हा सांव-ते, गोदना सांव-ते पारोम-ओक्-आ।"
            </p>
            <div className="text-xs text-stone-600 pt-2 border-t border-stone-200">
              <strong>भावार्थ:</strong> हे बिटिया! अपने हाथों में गोदना सजवा ले, क्योंकि परलोक में देवता तुमसे पूछेंगे कि तुम किस पहचान के साथ आई हो? तब तुम्हारे हाथों का सिका और गोदना ही तुम्हारी सच्ची पहचान बनकर पार उतारेगा।
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
