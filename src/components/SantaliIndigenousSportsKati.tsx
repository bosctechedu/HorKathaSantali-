import React, { useState, useRef, useEffect } from 'react';
import { Target, Trophy, Flame, RotateCcw, Volume2, Sparkles, Award, Users, CheckCircle2 } from 'lucide-react';

interface SportInfo {
  id: string;
  nameDev: string;
  nameRom: string;
  hindiName: string;
  seasonFestival: string;
  teamSize: string;
  equipment: string;
  rulesSummary: string;
  culturalValue: string;
}

const INDIGENOUS_SPORTS: SportInfo[] = [
  {
    id: 'kati_enech',
    nameDev: 'काटी एनेच (संताली गोटी खेल)',
    nameRom: 'Kati Enech',
    hindiName: 'संताली पारंपरिक लकड़ी गोटी व छड़ी खेल (Tribal Disc Bowling)',
    seasonFestival: 'पौष-माघ (धान कटाई के बाद)',
    teamSize: '५ से १० खिलाड़ी प्रति टीम (गांव बनाम गांव)',
    equipment: 'अर्धचंद्राकार साल या शीशम की लकड़ी की भारी गोटी (काटी) व ५ फीट लंबी बांस की छड़ी (काटी डांग)',
    rulesSummary: 'खिलाड़ी ४०-५० फीट की दूरी से अपनी काटी गोटी को पैर के अंगूठे व छड़ी की नोक से सरकाते हुए विपक्षी की खड़ी काटी को गिराने का सटीक निशाना लगाते हैं।',
    culturalValue: 'एकाग्रता, शारीरिक संतुलन और गांवों के बीच आपसी भाईचारा व मित्रता स्थापित करने का सबसे लोकप्रिय खेल।'
  },
  {
    id: 'bejha_tun',
    nameDev: 'बेझा तुन (साकरात तीरंदाजी)',
    nameRom: 'Bejha Tun',
    hindiName: 'केले के तने पर पावन तीरंदाजी स्पर्धा',
    seasonFestival: 'साकरात (मकर संक्रांति)',
    teamSize: 'व्यक्तिगत (गांव के सभी युवा व शिकारी)',
    equipment: 'बांस का धनुष (आक्), नुकीला तीर (सार) व केले का तना (बेझा)',
    rulesSummary: '१०० कदम की दूरी पर खड़े केले के खंभे पर सभी तीरंदाज बारी-बारी से निशाना साधते हैं। जिसका तीर केंद्रीय मज्जा को भेदता है, वह विजयी होता है।',
    culturalValue: 'शिकार कौशल की परीक्षा; विजेता को मांझी बाबा पगड़ी पहनाते हैं और पूरा गांव उसे कंधे पर उठाकर अखड़ा में नाचता है।'
  },
  {
    id: 'gend_dhukri',
    nameDev: 'गेंद-धुकड़ी (कपड़े की गेंद का खेल)',
    nameRom: 'Gend Dhukri',
    hindiName: 'देसी कपड़े की गेंद व चपलता खेल (Indigenous Dodgeball)',
    seasonFestival: 'ग्रीष्मकाल व शाम के समय',
    teamSize: '६ से ८ खिलाड़ी प्रति दल',
    equipment: 'पुराने सूती कपड़ों व धागों से tightly सिली हुई भारी गोल गेंद',
    rulesSummary: 'एक दल पत्थर के ७ ठीकरों (पिट्ठू) की मीनार गिराता है, जबकि दूसरा दल गेंद से प्रहार कर उन्हें आउट करने का प्रयास करता है।',
    culturalValue: 'फुर्ती, दौड़ने की गति और सामूहिक सहयोग का विकास।'
  }
];

export const SantaliIndigenousSportsKati: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<SportInfo>(INDIGENOUS_SPORTS[0]);
  const [activeTab, setActiveTab] = useState<'simulator' | 'sports_directory'>('simulator');

  // Mini Kati Simulation state
  const [angle, setAngle] = useState<number>(0); // -20 to 20 deg
  const [power, setPower] = useState<number>(65); // 20 to 100
  const [discPos, setDiscPos] = useState<{ x: number; y: number } | null>(null);
  const [isShooting, setIsShooting] = useState<boolean>(false);
  const [hitResult, setHitResult] = useState<'hit' | 'miss' | null>(null);
  const [score, setScore] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Target Peg position on Canvas
  const targetPeg = { x: 240, y: 50, width: 22, height: 26 };

  // Render Kati Track Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Red clay dirt track background
    const trackGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    trackGrad.addColorStop(0, '#592918'); // deep clay
    trackGrad.addColorStop(1, '#8c4826'); // red mud
    ctx.fillStyle = trackGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Track boundary chalk lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 20);
    ctx.lineTo(80, canvas.height - 20);
    ctx.moveTo(canvas.width - 50, 20);
    ctx.lineTo(canvas.width - 80, canvas.height - 20);
    ctx.stroke();

    // Distance marks
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    [80, 150, 220, 280].forEach(y => {
      ctx.beginPath();
      ctx.moveTo(60, y);
      ctx.lineTo(canvas.width - 60, y);
      ctx.stroke();
    });

    // Draw Target Kati Peg at top
    ctx.fillStyle = hitResult === 'hit' ? '#10b981' : '#f59e0b';
    ctx.fillRect(targetPeg.x - targetPeg.width / 2, targetPeg.y, targetPeg.width, targetPeg.height);
    // Peg outline
    ctx.strokeStyle = '#78350f';
    ctx.strokeRect(targetPeg.x - targetPeg.width / 2, targetPeg.y, targetPeg.width, targetPeg.height);

    // Label for target
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('लक्ष्य काटी', targetPeg.x, targetPeg.y - 6);

    // Draw launched disc or starting disc
    const currentX = discPos ? discPos.x : canvas.width / 2;
    const currentY = discPos ? discPos.y : canvas.height - 45;

    // Disc (काटी गोटी) - crescent elliptical shape
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.ellipse(currentX, currentY, 14, 8, (angle * Math.PI) / 180, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Aim guide line when not shooting
    if (!isShooting) {
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.7)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(currentX, currentY);
      const rad = ((angle - 90) * Math.PI) / 180;
      ctx.lineTo(currentX + Math.cos(rad) * 90, currentY + Math.sin(rad) * 90);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [discPos, angle, isShooting, hitResult]);

  // Shoot Kati Disc
  const launchKati = () => {
    if (isShooting) return;
    setIsShooting(true);
    setHitResult(null);

    const canvas = canvasRef.current;
    if (!canvas) return;

    let posX = canvas.width / 2;
    let posY = canvas.height - 45;

    const rad = ((angle - 90) * Math.PI) / 180;
    const speed = (power / 100) * 8 + 3;
    const vx = Math.cos(rad) * speed;
    const vy = Math.sin(rad) * speed;

    const animInterval = setInterval(() => {
      posX += vx;
      posY += vy;
      setDiscPos({ x: posX, y: posY });

      // Check collision with target peg
      if (
        posY <= targetPeg.y + targetPeg.height &&
        posY >= targetPeg.y &&
        Math.abs(posX - targetPeg.x) <= targetPeg.width / 2 + 8
      ) {
        clearInterval(animInterval);
        setIsShooting(false);
        setHitResult('hit');
        setScore(prev => prev + 10);
        return;
      }

      // Check out of bounds or stopped
      if (posY <= 25 || posX <= 40 || posX >= canvas.width - 40) {
        clearInterval(animInterval);
        setIsShooting(false);
        setHitResult('miss');
      }
    }, 25);
  };

  const resetShooter = () => {
    setDiscPos(null);
    setHitResult(null);
    setIsShooting(false);
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
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-50 via-stone-50 to-amber-50 border border-orange-200/40 rounded-2xl p-6 text-slate-900 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100/60 border border-orange-300/40 rounded-full text-xs font-semibold text-orange-800 mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>काटी एनेच व पारंपरिक खेल (Santali Indigenous Sports)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-orange-800">
            काटी एनेच, बेझा तुन व संताली पारंपरिक लोक-खेल
          </h1>
          <p className="text-stone-700 text-sm mt-2 leading-relaxed">
            संथाल समाज में काटी एनेच केवल मनोरंजन नहीं, बल्कि गांव बनाम गांव के बीच भाईचारा, एकाग्रता और शारीरिक सौष्ठव की महापरीक्षा है। खेलिए इंटरैक्टिव काटी निशाना सिमुलेटर और जानिए साकरात बेझा तुन तीरंदाजी परंपरा।
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'simulator'
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-stone-50/60 hover:bg-stone-100/60 text-stone-800 border border-stone-200/50'
              }`}
            >
              इंटरैक्टिव काटी गोटी सिमुलेटर (Kati Game)
            </button>
            <button
              onClick={() => setActiveTab('sports_directory')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'sports_directory'
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-stone-50/60 hover:bg-stone-100/60 text-stone-800 border border-stone-200/50'
              }`}
            >
              संताली खेल ज्ञानकोश व नियम
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab 1: Simulator */}
      {activeTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Panel */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <span className="text-sm font-bold text-amber-800">काटी फेंक नियंत्रक (Controls)</span>
                <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-200">
                  स्कोर: {score} अंक
                </span>
              </div>

              {/* Angle Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-stone-700 font-medium">
                  <span>दिशा कोण (Angle): {angle}°</span>
                  <span className="text-stone-600">दाएं / बाएं</span>
                </div>
                <input
                  type="range"
                  min="-20"
                  max="20"
                  value={angle}
                  disabled={isShooting}
                  onChange={e => setAngle(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>

              {/* Power Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-stone-700 font-medium">
                  <span>छड़ी का जोर (Force/Power): {power}%</span>
                  <span className="text-stone-600">दूरी</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={power}
                  disabled={isShooting}
                  onChange={e => setPower(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>

              {/* Launch & Reset Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={launchKati}
                  disabled={isShooting}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm shadow-lg transition-all ${
                    isShooting
                      ? 'bg-stone-100 text-stone-500 cursor-not-allowed'
                      : 'bg-orange-600 hover:bg-orange-500 text-white'
                  }`}
                >
                  {isShooting ? 'काटी चल रही है...' : 'काटी फेंकें (Launch Kati)'}
                </button>
                <button
                  onClick={resetShooter}
                  className="p-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl"
                  title="पुनः स्थापित करें"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>

              {/* Result Badge */}
              {hitResult && (
                <div
                  className={`p-3 rounded-xl text-center text-xs font-bold ${
                    hitResult === 'hit'
                      ? 'bg-emerald-50 border border-emerald-300 text-emerald-700'
                      : 'bg-red-50 border border-red-200 text-red-700'
                  }`}
                >
                  {hitResult === 'hit'
                    ? '🎯 शानदार निशाना! विपक्षी की काटी गिर गई (+१० अंक)'
                    : 'चूक गए! थोड़ा कोण व ताकत समायोजित करें।'}
                </div>
              )}
            </div>

            {/* Quick Lore */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-xs text-stone-700 space-y-1.5">
              <span className="font-bold text-amber-700 block">काटी एनेच का नियम:</span>
              <p>खिलाड़ी अपने बाएं पैर के अंगूठे पर काटी गोटी को टिकाकर बांस की छड़ी के धक्के से जमीन पर तेजी से सरकाते हैं।</p>
            </div>
          </div>

          {/* Canvas Field */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 shadow-xl">
              <canvas
                ref={canvasRef}
                width={480}
                height={360}
                className="rounded-xl border border-stone-200 max-w-full h-auto shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Tab 2: Sports Directory */}
      {activeTab === 'sports_directory' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {INDIGENOUS_SPORTS.map(sp => (
            <div
              key={sp.id}
              className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-3 hover:border-orange-500/50 transition-colors"
            >
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <span className="text-lg font-bold text-amber-700">{sp.nameDev}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-orange-50 text-orange-700 border border-orange-200">
                  {sp.nameRom}
                </span>
              </div>
              <p className="text-xs text-stone-600 font-semibold">{sp.hindiName}</p>
              <div className="text-xs text-stone-700 space-y-1 bg-white p-3 rounded-xl border border-stone-200">
                <p><strong>ऋतु व पर्व:</strong> {sp.seasonFestival}</p>
                <p><strong>खिलाड़ी:</strong> {sp.teamSize}</p>
                <p><strong>उपकरण:</strong> {sp.equipment}</p>
              </div>
              <p className="text-stone-700 text-xs leading-relaxed">{sp.rulesSummary}</p>
              <div className="text-xs text-amber-800/90 italic pt-1">
                🏆 {sp.culturalValue}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
