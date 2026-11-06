import React, { useState, useRef, useEffect } from 'react';
import { Moon, Sparkles, Compass, Eye, Volume2, Info, Star, Sun, Shield } from 'lucide-react';

interface ConstellationItem {
  id: string;
  santaliDev: string;
  santaliRom: string;
  hindiName: string;
  modernAstronomy: string;
  folkloreMyth: string;
  agriculturalSign: string;
  nightTimingRole: string;
  starPositions: { x: number; y: number; label?: string }[];
  connections: [number, number][]; // indices of connected stars
}

const CONSTELLATIONS_DATA: ConstellationItem[] = [
  {
    id: 'har_kata',
    santaliDev: 'हर-काटा इपिल (हल जोतता किसान)',
    santaliRom: 'Har-Kata Ipil',
    hindiName: 'मृगशिरा व ओरियन बेल्ट (Orion the Celestial Plowman)',
    modernAstronomy: 'Orion Constellation (Betelgeuse, Rigel & 3 Belt Stars)',
    folkloreMyth: 'आकाश में हल जोतता हुआ आदिम संथाल किसान। तीन समांतर तारे जुआठ (Yoke) और हल के फल हैं, तथा पीछे दो तारे जुते हुए बैलों के जोड़े हैं।',
    agriculturalSign: 'आषाढ़ माह में जब भोर के समय हर-काटा पूर्व दिशा में सीधा खड़ा दिखता है, तो यह प्रथम मूसलाधार वर्षा और खेत जोतने का अंतिम आदेश होता है।',
    nightTimingRole: 'शीतकाल में मध्यरात्रि का समय ज्ञात करने के लिए इसकी ऊंचाई देखी जाती है।',
    starPositions: [
      { x: 140, y: 110, label: 'बैल १' },
      { x: 190, y: 130, label: 'बैल २' },
      { x: 250, y: 180, label: 'नाहेल (हल)' },
      { x: 275, y: 200, label: 'जुआठ' },
      { x: 300, y: 220, label: 'हलवाहा' },
      { x: 330, y: 280, label: 'किसान का पैर' },
      { x: 220, y: 270, label: 'कूद' }
    ],
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [2, 6]
    ]
  },
  {
    id: 'budhu_budhu',
    santaliDev: 'बुधु-बुधु इपिल (चूजों संग मुर्गी)',
    santaliRom: 'Budhu-Budhu Ipil',
    hindiName: 'कृत्तिका नक्षत्र (The Pleiades / Seven Sisters)',
    modernAstronomy: 'Pleiades Open Cluster in Taurus (M45)',
    folkloreMyth: 'एक ममतामयी वन-मुर्गी जो अपने नन्हें चूजों को पंखों के नीचे समेटे हुए है। संथाल बच्चे इसे देखकर एकता और परिवार की सुरक्षा सीखते हैं।',
    agriculturalSign: 'कार्तिक माह में शाम ढलते ही पूर्व में बुधु-बुधु का उदय धान पकने और सोहराय पर्व की तैयारी का संकेत देता है।',
    nightTimingRole: 'करम पर्व की रात जब यह सिर के ठीक ऊपर (Zenith) आता है, तब करम विनती समाप्त कर अखड़ा नृत्य शुरू होता है।',
    starPositions: [
      { x: 180, y: 140, label: 'आयो सिम' },
      { x: 205, y: 130 },
      { x: 230, y: 145 },
      { x: 245, y: 165 },
      { x: 220, y: 180 },
      { x: 195, y: 170 },
      { x: 215, y: 155, label: 'चूजा' }
    ],
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 0],
      [0, 6],
      [2, 6]
    ]
  },
  {
    id: 'hati_dahar',
    santaliDev: 'हती डाहार (स्वर्ग का ऐरावत मार्ग)',
    santaliRom: 'Hati Dahar',
    hindiName: 'आकाशगंगा (Milky Way / The Celestial Elephant Way)',
    modernAstronomy: 'Milky Way Galactic Plane',
    folkloreMyth: 'सृष्टि के आदि जल-हाथी (हती) का पावन मार्ग, जो अपनी सूंड से स्वर्ग के जल को बादलों के रूप में धरती पर छिड़कता है। मृत्यु के बाद पूर्वजों की आत्माएं इसी प्रकाश पथ से हाना पुरी जाती हैं।',
    agriculturalSign: 'शरद पूर्णिमा के बाद हती डाहार की चमक शीत ऋतु और रबी फसल की बुआई की सूचना देती है।',
    nightTimingRole: 'रात्रि में उत्तर-दक्षिण दिशा का सटीक निर्धारण करने वाला सनातन कम्पास।',
    starPositions: [
      { x: 80, y: 320, label: 'दक्षिण सिरा' },
      { x: 130, y: 260 },
      { x: 180, y: 210 },
      { x: 250, y: 170, label: 'मध्य आकाश' },
      { x: 320, y: 130 },
      { x: 390, y: 90, label: 'उत्तर सिरा' }
    ],
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5]
    ]
  },
  {
    id: 'sukru_ipil',
    santaliDev: 'सुक्रु / अंगार इपिल (भोर का तारा)',
    santaliRom: 'Sukru / Angar Ipil',
    hindiName: 'शुक्र तारा (Morning / Evening Star Venus)',
    modernAstronomy: 'Planet Venus',
    folkloreMyth: 'संथाल शिकारियों (सेंदरा वीरों) का पथ-प्रदर्शक। वन में भटके शिकारी सुक्रु इपिल को देखकर गांव का रास्ता पहचानते हैं।',
    agriculturalSign: 'प्रातः ३:३० बजे इसका प्रखर श्वेत प्रकाश महिलाओं को ढेंकी में धान कूटने और महुआ चुनने के लिए जगाता है।',
    nightTimingRole: 'रात्रि का चतुर्थ प्रहर (अंतिम पहर) समाप्त होने और उषाकाल का सूचक।',
    starPositions: [
      { x: 250, y: 150, label: 'सुक्रु इपिल (अत्यंत प्रखर)' },
      { x: 220, y: 220 },
      { x: 280, y: 220 }
    ],
    connections: [
      [0, 1],
      [0, 2],
      [1, 2]
    ]
  }
];

export const SantaliIpilConstellationsAstronomy: React.FC = () => {
  const [selectedConstellation, setSelectedConstellation] = useState<ConstellationItem>(CONSTELLATIONS_DATA[0]);
  const [showOverlays, setShowOverlays] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'starmap' | 'halo_weather'>('starmap');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Draw Night Sky Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Deep cosmic night background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGrad.addColorStop(0, '#030712'); // black-gray
    bgGrad.addColorStop(0.6, '#0f172a'); // slate-900
    bgGrad.addColorStop(1, '#064e3b'); // forest horizon green tint
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Random background ambient stars
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 90; i++) {
      const rx = (i * 47) % canvas.width;
      const ry = (i * 73) % (canvas.height - 40);
      const r = (i % 3 === 0 ? 1.5 : 0.8);
      ctx.beginPath();
      ctx.arc(rx, ry, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Connect constellation lines
    if (showOverlays) {
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)'; // cyan glow
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);

      selectedConstellation.connections.forEach(([i1, i2]) => {
        const p1 = selectedConstellation.starPositions[i1];
        const p2 = selectedConstellation.starPositions[i2];
        if (p1 && p2) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });
      ctx.setLineDash([]);
    }

    // Draw main constellation stars with glow
    selectedConstellation.starPositions.forEach((star, idx) => {
      // Glow outer halo
      const radGrad = ctx.createRadialGradient(star.x, star.y, 1, star.x, star.y, 14);
      radGrad.addColorStop(0, 'rgba(251, 191, 36, 1)');
      radGrad.addColorStop(0.4, 'rgba(245, 158, 11, 0.5)');
      radGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(star.x, star.y, 14, 0, Math.PI * 2);
      ctx.fill();

      // Core star
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(star.x, star.y, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Label if present
      if (star.label) {
        ctx.fillStyle = '#fef08a'; // yellow-200
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(star.label, star.x + 8, star.y - 6);
      }
    });

    // Silhouette of Sal trees on bottom horizon
    ctx.fillStyle = '#022c22';
    for (let x = 0; x < canvas.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, canvas.height);
      ctx.lineTo(x + 15, canvas.height - 35 - ((x * 13) % 20));
      ctx.lineTo(x + 30, canvas.height);
      ctx.fill();
    }
  }, [selectedConstellation, showOverlays]);

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
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-50 via-slate-50 to-emerald-50 border border-indigo-200/40 rounded-2xl p-6 text-slate-900 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100/60 border border-indigo-300/40 rounded-full text-xs font-semibold text-indigo-800 mb-3">
            <Star className="w-3.5 h-3.5" />
            <span>इपिल व खगोल दर्शन (Santali Indigenous Sky Lore)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-indigo-800">
            इपिल: संथाल पारंपरिक खगोल, नक्षत्र व रात्रि नेविगेशन
          </h1>
          <p className="text-stone-700 text-sm mt-2 leading-relaxed">
            संथाल समाज की अपनी समृद्ध खगोलीय मानचित्रावली है। आकाश में हल जोतता हुआ किसान (हर-काटा इपिल), बच्चों को समेटे मुर्गी (बुधु-बुधु इपिल) और ऐरावत हाथी का मार्ग (हती डाहार)। जानिए कैसे पूर्वज तारों से रात का पहर और बुआई का सटीक समय नापते थे।
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            <button
              onClick={() => setActiveTab('starmap')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'starmap'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-stone-50/60 hover:bg-stone-100/60 text-stone-800 border border-stone-200/50'
              }`}
            >
              इंटरैक्टिव रात्रि तारा-मानचित्र (Sky Map)
            </button>
            <button
              onClick={() => setActiveTab('halo_weather')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'halo_weather'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-stone-50/60 hover:bg-stone-100/60 text-stone-800 border border-stone-200/50'
              }`}
            >
              बेर-बेड़े व चांदो-बेड़े (सूर्य-चंद्र प्रभामंडल मौसम संकेत)
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab 1: Starmap Canvas */}
      {activeTab === 'starmap' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Constellations Selector */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-xs font-bold text-stone-600 uppercase tracking-wider px-1 mb-2">
              संथाली नक्षत्र मंडल चुनें:
            </div>
            {CONSTELLATIONS_DATA.map(item => {
              const isSelected = selectedConstellation.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedConstellation(item)}
                  className={`p-3.5 rounded-xl cursor-pointer border transition-all ${
                    isSelected
                      ? 'bg-indigo-50/70 border-indigo-500 shadow-md'
                      : 'bg-stone-50/70 hover:bg-stone-100/60 border-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-amber-800">{item.santaliDev}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-mono">
                      {item.santaliRom}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1">{item.hindiName}</p>
                </div>
              );
            })}
          </div>

          {/* Interactive Canvas & Lore */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 shadow-xl text-center">
              <div className="flex items-center justify-between mb-3 text-xs text-stone-600">
                <span className="font-semibold text-amber-700">
                  {selectedConstellation.santaliDev}
                </span>
                <button
                  onClick={() => setShowOverlays(!showOverlays)}
                  className={`px-3 py-1 rounded-lg border text-xs transition-colors ${
                    showOverlays
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-800'
                      : 'bg-stone-100 border-stone-200 text-stone-600'
                  }`}
                >
                  नक्षत्र रेखाएं {showOverlays ? 'दिखाएं' : 'छिपाएं'}
                </button>
              </div>

              {/* Sky Canvas */}
              <div className="flex justify-center">
                <canvas
                  ref={canvasRef}
                  width={480}
                  height={340}
                  className="rounded-xl border border-stone-200 max-w-full h-auto shadow-2xl"
                />
              </div>

              {/* Lore Description Box */}
              <div className="mt-4 p-4 bg-white/80 rounded-xl border border-stone-200 text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide">
                    {selectedConstellation.modernAstronomy}
                  </span>
                  <button
                    onClick={() => speakText(selectedConstellation.santaliDev + ': ' + selectedConstellation.folkloreMyth)}
                    className="p-1 bg-indigo-50/40 text-indigo-800 rounded hover:bg-indigo-100"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-stone-700 text-xs leading-relaxed">
                  <strong>पौराणिक कथा:</strong> {selectedConstellation.folkloreMyth}
                </p>
                <div className="pt-2 border-t border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div className="text-amber-800/90">
                    🌾 <strong>कृषि संकेत:</strong> {selectedConstellation.agriculturalSign}
                  </div>
                  <div className="text-emerald-800/90">
                    ⏱️ <strong>समय ज्ञान:</strong> {selectedConstellation.nightTimingRole}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab 2: Halo Weather Signs */}
      {activeTab === 'halo_weather' && (
        <div className="max-w-3xl mx-auto bg-stone-50 border border-stone-200 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="text-center">
            <h3 className="text-xl font-bold text-amber-800">बेर-बेड़े व चांदो-बेड़े: खगोलीय प्रभामंडल व वर्षा संकेत</h3>
            <p className="text-xs text-stone-600 mt-1">सूर्य व चंद्रमा के चारों ओर बनने वाले वलय (Halo) से मौसम की सटीक भविष्यवाणी</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
              <span className="text-sm font-bold text-amber-600 block flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-600" />
                <span>१. बेर-बेड़े (सूर्य के चारों ओर घेरा)</span>
              </span>
              <p className="text-xs text-stone-700 leading-relaxed">
                जब दोपहर में सूर्य के चारों ओर इंद्रधनुषी वलय बनता है, तो संथाल पूर्वजों के अनुसार वायुमंडल में अत्यधिक नमी है और २४ घंटे के भीतर भारी वर्षा या मेघ-गर्जन निश्चित है।
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
              <span className="text-sm font-bold text-sky-600 block flex items-center gap-1.5">
                <Moon className="w-4 h-4 text-sky-600" />
                <span>२. चांदो-बेड़े (चंद्रमा का घेरा)</span>
              </span>
              <p className="text-xs text-stone-700 leading-relaxed">
                यदि रात में चंद्रमा के चारों ओर बड़ा घेरा बने और तारे धुंधले दिखें, तो यह दूर देश में वर्षा होने तथा स्थानीय क्षेत्र में तेज हवा या सूखा रहने का संकेत माना जाता है।
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
