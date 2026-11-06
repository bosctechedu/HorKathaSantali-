import React, { useState, useRef, useEffect } from 'react';
import { Scissors, Volume2, Info, Sparkles, RefreshCw, Palette, Layers } from 'lucide-react';

interface BotanicalDye {
  id: string;
  nameSantali: string;
  nameHindi: string;
  botanicalIngredients: string;
  colorHex: string;
  mordantProcess: string;
  textileApplication: string;
}

const BOTANICAL_DYES: BotanicalDye[] = [
  {
    id: 'gaba_black',
    nameSantali: 'Gaba Has (गाबा हास)',
    nameHindi: 'बबूल छाल व लौह-किण्वित कृष्ण वर्ण',
    botanicalIngredients: 'बबूल (Acacia) की परिपक्व छाल, जंग लगा पुराना लोहा व पके भात का मांड़ (दाका दाः)',
    colorHex: '#1C1917',
    mordantProcess: 'लोहे और बबूल छाल को मटके में ७ दिन तक सड़ाया जाता है। टैनिन और आयरन मिलकर गहरा स्थायी काला रंग बनाते हैं जो धूप में कभी नहीं उड़ता।',
    textileApplication: 'पांची-पारहाड़ वस्त्रों के किनारों पर काले बॉर्डर और पुरुषों के गमछा की धारियों में।'
  },
  {
    id: 'sasang_palash',
    nameSantali: 'Sasang Murup (सासन्ग मुरुप)',
    nameHindi: 'जंगली हल्दी व पलाश पुष्प पीत-केसरिया',
    botanicalIngredients: 'वन-हल्दी (Curcuma) की गांठें, पलाश (सरजोम/मुरुप) के सूखे फूल व लकड़ी की राख का पानी (तोरोय दाः)',
    colorHex: '#D97706',
    mordantProcess: 'राख के क्षारीय पानी (Alkaline wood-ash water) में उबालकर रंग को सूती धागे में पक्का किया जाता है।',
    textileApplication: 'विवाह के समय वर-वधू के पीले वस्त्र (सासन्ग लुगा) और उत्सव के दुपट्टों में।'
  },
  {
    id: 'harad_green',
    nameSantali: 'Haro Matkom (हारो मातकोम)',
    nameHindi: 'हरड़ व महुआ पत्ती हरित वर्ण',
    botanicalIngredients: 'हरड़ (Terminalia chebula) का फल व महुआ की कोमल हरी पत्तियां',
    colorHex: '#15803D',
    mordantProcess: 'फिटकरी (Phitkiri) और हरड़ के रस के दोहरे घोल में सूत को ३ बार डुबोकर धूप में सुखाया जाता है।',
    textileApplication: 'महिलाओं के पारंपरिक घाघरा व पांची की हरी पट्टियों में।'
  },
  {
    id: 'geru_red',
    nameSantali: 'Ara Hasba (आराः हासबा)',
    nameHindi: 'प्राकृतिक गेरू व मजीठ लाल वर्ण',
    botanicalIngredients: 'पहाड़ी गेरू मिट्टी, मजीठ की जड़ें व महुआ बीज का तेल',
    colorHex: '#B91C1C',
    mordantProcess: 'तेल की कुछ बूंदों के साथ मजीठ के काढ़े में सूत को रात भर भिगोया जाता है।',
    textileApplication: 'संताली संस्कृति की पहचान - पांची का लाल चौड़ा पाड़ (Border)।'
  }
];

const WOODEN_STAMPS = [
  { id: 'fish', name: 'हाकू (मछली)', symbol: '🐟', description: 'समृद्धि, जलीय शांति व जीवन-प्रवाह' },
  { id: 'peacock', name: 'मारा (मयूर)', symbol: '🦚', description: 'सौंदर्य, नृत्य व वर्षा का आह्वान' },
  { id: 'arrow', name: 'सार-आक (धनुष-बाण)', symbol: '🏹', description: 'वीरता, सुरक्षा व आदिम संप्रभुता' },
  { id: 'flower', name: 'बाहा (साल पुष्प)', symbol: '🌸', description: 'नववर्ष, पवित्रता व जाहेर एरा का आशीष' }
];

export const SantaliTextileDyesBlockPrint: React.FC = () => {
  const [selectedDye, setSelectedDye] = useState<BotanicalDye>(BOTANICAL_DYES[0]);
  const [selectedStamp, setSelectedStamp] = useState(WOODEN_STAMPS[0]);
  const [activeTab, setActiveTab] = useState<'dye_alchemy' | 'stamp_studio' | 'panchi_lore'>('stamp_studio');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize handloom fabric canvas
  const initFabricCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handwoven off-white cotton base
    ctx.fillStyle = '#FBF8F1';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle handloom weave threads
    ctx.strokeStyle = '#EFE9DA';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 6) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 6) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Traditional red border stripe on top and bottom
    ctx.fillStyle = '#B91C1C';
    ctx.fillRect(0, 10, canvas.width, 16);
    ctx.fillRect(0, canvas.height - 26, canvas.width, 16);
  };

  useEffect(() => {
    initFabricCanvas();
  }, []);

  const handleStampCanvas = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Stamp impression effect
    ctx.fillStyle = selectedDye.colorHex;
    ctx.font = '36px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(selectedStamp.symbol, x, y);

    // Decorative border ring around stamp
    ctx.strokeStyle = selectedDye.colorHex;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.stroke();
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
      {/* Banner */}
      <div className="bg-gradient-to-r from-red-50 via-stone-50 to-amber-50 rounded-3xl p-6 sm:p-8 text-slate-900 shadow-xl border border-red-200/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/20 text-red-700 text-xs font-semibold uppercase tracking-wider mb-3 border border-red-500/30">
              <Scissors className="w-4 h-4" />
              पांची-पारहाड़ रंगाई • Indigenous Textile Dyes & Block Print
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-red-900">
              पांची-पारहाड़ वनस्पति रंगाई व देशी ब्लॉक-प्रिंट शिल्प
            </h1>
            <p className="mt-2 text-red-800/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              बबूल छाल-लोहा किण्वन (गाबा), पलाश पुष्प पीत-केसरिया, लकड़ी के नक्काशीदार ठप्पे और संताली हैंडलूम फैब्रिक पर डिजिटल ब्लॉक-प्रिंटिंग।
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/80 p-1.5 rounded-2xl border border-red-200/50">
            <button
              onClick={() => setActiveTab('stamp_studio')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'stamp_studio'
                  ? 'bg-red-700 text-white shadow-md'
                  : 'text-red-700 hover:text-slate-900'
              }`}
            >
              ब्लॉक-प्रिंट स्टूडियो
            </button>
            <button
              onClick={() => setActiveTab('dye_alchemy')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'dye_alchemy'
                  ? 'bg-red-700 text-white shadow-md'
                  : 'text-red-700 hover:text-slate-900'
              }`}
            >
              वनस्पति रंग रसायन
            </button>
            <button
              onClick={() => setActiveTab('panchi_lore')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'panchi_lore'
                  ? 'bg-red-700 text-white shadow-md'
                  : 'text-red-700 hover:text-slate-900'
              }`}
            >
              पांची-पारहाड़ धरोहर
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab: Block Print Studio */}
      {activeTab === 'stamp_studio' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-slate-50 rounded-3xl p-5 border border-slate-200 dark:border-slate-200 shadow-sm space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-800 flex items-center gap-2">
                <Palette className="w-4 h-4 text-red-600" />
                १. प्राकृतिक वनस्पति रंग चुनें:
              </h2>
              <div className="grid grid-cols-2 gap-2.5">
                {BOTANICAL_DYES.map((dye) => {
                  const isSelected = selectedDye.id === dye.id;
                  return (
                    <button
                      key={dye.id}
                      onClick={() => setSelectedDye(dye)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-red-300 ring-2 ring-red-500/20 bg-red-50/50 dark:bg-red-50/30'
                          : 'border-slate-200 dark:border-slate-200 bg-white dark:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-4 h-4 rounded-full border border-black/20"
                          style={{ backgroundColor: dye.colorHex }}
                        />
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-800 truncate">
                          {dye.nameSantali}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1 truncate">
                        {dye.nameHindi}
                      </div>
                    </button>
                  );
                })}
              </div>

              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-800 flex items-center gap-2 pt-2">
                <Scissors className="w-4 h-4 text-red-600" />
                २. पारंपरिक लकड़ी का ठप्पा (Stamp):
              </h2>
              <div className="grid grid-cols-2 gap-2.5">
                {WOODEN_STAMPS.map((stamp) => {
                  const isSelected = selectedStamp.id === stamp.id;
                  return (
                    <button
                      key={stamp.id}
                      onClick={() => setSelectedStamp(stamp)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-red-300 ring-2 ring-red-500/20 bg-red-50/50 dark:bg-red-50/30'
                          : 'border-slate-200 dark:border-slate-200 bg-white dark:bg-slate-100'
                      }`}
                    >
                      <div className="text-2xl mb-1">{stamp.symbol}</div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-800">
                        {stamp.name}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                        {stamp.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Fabric Canvas */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white dark:bg-slate-50 rounded-3xl p-6 border border-slate-200 dark:border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-200 pb-3">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-red-500" />
                    हैंडलूम सूती वस्त्र कैनवास (Click to Stamp)
                  </h3>
                  <p className="text-xs text-slate-500">
                    कपड़े पर कहीं भी क्लिक करके पारम्परिक ठप्पा लगाएं
                  </p>
                </div>
                <button
                  onClick={initFabricCanvas}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-100 hover:bg-slate-200 text-slate-700 dark:text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  वस्त्र धोएं (Clear)
                </button>
              </div>

              {/* Canvas viewport */}
              <div className="rounded-2xl overflow-hidden shadow-inner border-4 border-amber-200/20 bg-[#FBF8F1]">
                <canvas
                  ref={canvasRef}
                  width={640}
                  height={360}
                  onClick={handleStampCanvas}
                  className="w-full h-72 sm:h-80 cursor-crosshair block"
                />
              </div>

              {/* Stamp Lore Callout */}
              <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-50/20 border border-amber-200/60 dark:border-amber-200/40 text-xs text-slate-700 dark:text-slate-700 space-y-1">
                <span className="font-bold text-amber-900 dark:text-amber-700 block">
                  ठप्पा नक्काशी की विशेषता:
                </span>
                संताली काष्ठकार शीशम या साल की कठोर लकड़ी पर छेनी से गहराई में मोटिफ्स तराशते हैं। कपड़े पर छपाई के बाद कपड़े को धूप में सुखाकर बहती नदी के ठंडे पानी में धोया जाता है ताकि रंग पक्का हो सके।
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab: Dye Alchemy */}
      {activeTab === 'dye_alchemy' && (
        <div className="bg-white dark:bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-200 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-900 flex items-center gap-2">
              <Palette className="w-5 h-5 text-red-600" />
              प्राकृतिक वानस्पतिक रंग रसायन व रंग-बंधक (Mordant Science)
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-600 mt-1">
              बिना किसी हानिकारक सिंथेटिक केमिकल के जंगल की जड़ों, छालों और फलों से स्थायी पक्के रंगों की पारंपरिक तकनीक।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {BOTANICAL_DYES.map((dye) => (
              <div
                key={dye.id}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-100/40 border border-slate-200 dark:border-slate-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-5 h-5 rounded-full border border-black/30 shadow-xs"
                      style={{ backgroundColor: dye.colorHex }}
                    />
                    <h3 className="font-bold text-slate-900 dark:text-slate-900 text-base">
                      {dye.nameSantali}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">{dye.nameHindi}</span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-700">
                  <strong>प्राकृतिक संघटक:</strong> {dye.botanicalIngredients}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-700">
                  <strong>रंग पक्का करने की विधि:</strong> {dye.mordantProcess}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Tab: Panchi Lore */}
      {activeTab === 'panchi_lore' && (
        <div className="bg-white dark:bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-200 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-red-600" />
              पांची-पारहाड़: संताली राष्ट्रीय वेशभूषा की गरिमा
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-600 mt-1">
              संताली समाज में वस्त्र केवल शरीर ढकने के लिए नहीं, बल्कि प्रकृति, स्वाभिमान और सांस्कृतिक पहचान का प्रतीक हैं।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-100/50 border border-slate-200 dark:border-slate-200 space-y-2">
              <div className="text-2xl">👗</div>
              <h3 className="font-bold text-slate-900 dark:text-slate-900 text-sm">
                पांची व पारहाड़ का संयोजन
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-600 leading-relaxed">
                'पांची' निचले भाग में लपेटा जाने वाला दोहरे सूत का वस्त्र है और 'पारहाड़' ऊपरी भाग को गरिमापूर्ण ढंग से ढकने वाला पारंपरिक उत्तरीय है।
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-100/50 border border-slate-200 dark:border-slate-200 space-y-2">
              <div className="text-2xl">🔴</div>
              <h3 className="font-bold text-slate-900 dark:text-slate-900 text-sm">
                लाल और सफेद का पावन सामंजस्य
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-600 leading-relaxed">
                सफेद पृष्ठभूमि मन की निर्मलता और सत्य का प्रतीक है, जबकि लाल किनारा (पारहाड़) जीवन-शक्ति और रक्त-संबंधी कुल एकता को दर्शाता है।
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-100/50 border border-slate-200 dark:border-slate-200 space-y-2">
              <div className="text-2xl">🧵</div>
              <h3 className="font-bold text-slate-900 dark:text-slate-900 text-sm">
                देशी तसर व करघा बुनकरी
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-600 leading-relaxed">
                जंगल के साल और अर्जुन के पेड़ों पर पले रेशम कीटों (तसर ककून) से धागा निकालकर पारंपरिक गड्ढा-करघे (Pit loom) पर बुना जाता है।
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
