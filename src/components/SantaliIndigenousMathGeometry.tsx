import React, { useState } from 'react';
import { Calculator, Volume2, Info, Sparkles, Home, Layers, CheckCircle2 } from 'lucide-react';

export const SantaliIndigenousMathGeometry: React.FC = () => {
  const [knotsCount, setKnotsCount] = useState<number>(5);
  const [decimalInput, setDecimalInput] = useState<number>(35);
  const [activeTab, setActiveTab] = useState<'knot_math' | 'vigesimal' | 'roof_geometry'>('knot_math');

  // Vigesimal conversion helper
  const getVigesimalSantali = (num: number): { santali: string; hindi: string; breakdown: string } => {
    if (num <= 0) return { santali: 'Ekhen / Sunno', hindi: 'शून्य', breakdown: '0' };
    if (num > 200) return { santali: 'सांगें लेखा', hindi: 'अपरिमित संख्या', breakdown: '> 200' };

    const digitNames = ['', 'मित् (1)', 'बार (2)', 'पे (3)', 'पोन (4)', 'मोड़े (5)', 'तुरुय (6)', 'एयाय (7)', 'इराल (8)', 'आरे (9)', 'गेल (10)'];
    const tensNames = ['', 'गेल-मित् (11)', 'गेल-बार (12)', 'गेल-पे (13)', 'गेल-पोन (14)', 'गेल-मोड़े (15)', 'गेल-तुरुय (16)', 'गेल-एयाय (17)', 'गेल-इराल (18)', 'गेल-आरे (19)'];

    if (num <= 10) {
      return { santali: digitNames[num], hindi: `${num}`, breakdown: `${num}` };
    }
    if (num < 20) {
      return { santali: tensNames[num - 10], hindi: `${num}`, breakdown: `10 + ${num - 10}` };
    }

    const isiCount = Math.floor(num / 20);
    const remainder = num % 20;

    const isiPrefix = isiCount === 1 ? 'मित् इसी' : isiCount === 2 ? 'बार इसी' : isiCount === 3 ? 'पे इसी' : isiCount === 4 ? 'पोन इसी' : isiCount === 5 ? 'मोड़े इसी (साय)' : `${isiCount} इसी`;

    if (remainder === 0) {
      return {
        santali: `${isiPrefix}`,
        hindi: `${num} (${isiCount} बीस)`,
        breakdown: `${isiCount} × 20`
      };
    } else if (remainder <= 10) {
      return {
        santali: `${isiPrefix} आर ${digitNames[remainder]}`,
        hindi: `${num} (${isiCount} बीस + ${remainder})`,
        breakdown: `(${isiCount} × 20) + ${remainder}`
      };
    } else {
      return {
        santali: `${isiPrefix} आर ${tensNames[remainder - 10]}`,
        hindi: `${num} (${isiCount} बीस + ${remainder})`,
        breakdown: `(${isiCount} × 20) + 10 + ${remainder - 10}`
      };
    }
  };

  const currentVigesimal = getVigesimalSantali(decimalInput);

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
      <div className="bg-gradient-to-r from-sky-950 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-sky-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-sky-500/30">
              <Calculator className="w-4 h-4" />
              गांठी लेखा आर इसी • Indigenous Math & Geometry
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-sky-50">
              संताली लोक-गणित, गांठी लेखा व वास्तु ज्यामिति
            </h1>
            <p className="mt-2 text-sky-200/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              गांठी लेखा (रस्सी की गांठों द्वारा दिनों व ऋण की गणना), २०-आधारित (इसी / Vigesimal) गणितीय प्रणाली और २-चाला व ४-चाला छप्पर ज्यामिति (Roof Truss Physics)।
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-sky-700/50">
            <button
              onClick={() => setActiveTab('knot_math')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'knot_math'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-sky-300 hover:text-white'
              }`}
            >
              गांठी लेखा (Knot Math)
            </button>
            <button
              onClick={() => setActiveTab('vigesimal')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'vigesimal'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-sky-300 hover:text-white'
              }`}
            >
              इसी गणना (Base-20)
            </button>
            <button
              onClick={() => setActiveTab('roof_geometry')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'roof_geometry'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-sky-300 hover:text-white'
              }`}
            >
              चाला छप्पर ज्यामिति
            </button>
          </div>
        </div>
      </div>

      {/* Tab: Knot Math */}
      {activeTab === 'knot_math' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sky-600" />
                इंटरएक्टिव गांठी लेखा डोरी (Interactive Knot Cord)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                विवाह निमंत्रण (नेवता साकाम) में जितनी गांठें होती हैं, प्रत्येक दिन एक गांठ खोली जाती है। जब सभी गांठें खुल जाती हैं, तो बारात निकलती है।
              </p>

              {/* Knot Visualizer Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-stone-900 to-slate-950 border border-slate-800 text-center space-y-4">
                <div className="text-xs font-mono text-sky-400 uppercase tracking-widest">
                  रस्सी में बंधी गांठें: {knotsCount} दिन शेष (Maha Banchao)
                </div>

                {/* Rope visualization */}
                <div className="flex items-center justify-center gap-2 py-4 overflow-x-auto">
                  <div className="w-8 h-1 bg-amber-700 rounded-l-full" />
                  {Array.from({ length: knotsCount }).map((_, i) => (
                    <div key={i} className="flex items-center">
                      <div
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-amber-900 border-2 border-amber-400 shadow-lg flex items-center justify-center text-xs font-bold text-white cursor-pointer hover:scale-110 transition-transform"
                        title={`गांठ संख्या ${i + 1}`}
                      >
                        🪢
                      </div>
                      <div className="w-6 h-1 bg-amber-700" />
                    </div>
                  ))}
                  <div className="w-8 h-1 bg-amber-700 rounded-r-full" />
                </div>

                {/* Knot control buttons */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      if (knotsCount > 0) {
                        const newCount = knotsCount - 1;
                        setKnotsCount(newCount);
                        speakText(`एक गांठ खोली गई। अब ${newCount} दिन शेष हैं।`);
                      }
                    }}
                    disabled={knotsCount <= 0}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-bold transition-all"
                  >
                    गांठ खोलें (Un-knot Day)
                  </button>
                  <button
                    onClick={() => {
                      if (knotsCount < 12) {
                        const newCount = knotsCount + 1;
                        setKnotsCount(newCount);
                        speakText(`एक गांठ बांधी गई। अब कुल ${newCount} गांठें हैं।`);
                      }
                    }}
                    disabled={knotsCount >= 12}
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white text-xs font-bold transition-all"
                  >
                    नई गांठ बांधें (Add Knot)
                  </button>
                </div>
              </div>

              {/* Knot explanation */}
              <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                <span className="font-bold text-sky-900 dark:text-sky-300 block">
                  गांठी लेखा का प्राचीन उपयोग:
                </span>
                <p>१. <strong>विवाह नेवता साकाम</strong>: हल्दी में रंगी सन की रस्सी में दिनों के बराबर गांठें बांधकर रिश्तेदारों को भेजी जाती थीं।</p>
                <p>२. <strong>फसल व धान्य लेखा</strong>: खलिहान में मड़ाई के बाद पुआल की रस्सी में धान की बोरियों की गिनती के लिए गांठ बांधी जाती थी।</p>
                <p>३. <strong>पंचायती तारीख</strong>: मांझी सभा की बैठक के नियत दिन याद रखने के लिए गोड़ेत (संदेशवाहक) गांठ वाली डोरी का प्रयोग करता था।</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-sky-600" />
                संताली लोक-अंकगणित की मौखिक स्मृति
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                संताली समाज में गणित अमूर्त प्रतीकों का खेल नहीं, बल्कि प्रकृति और दैनिक जीवन की ठोस वस्तुओं (उंगलियों, कंकड़, महुआ बीज, गांठों) से जुड़ा था।
              </p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs">
                  <div className="font-bold text-slate-900 dark:text-white">अंगुलियों की संधि (Finger Joint Tally)</div>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">
                    हाथ की चार उंगलियों के १२ पोरों (Phalanges) और अंगूठे की सहायता से १२ और २० के गुणनफल का हिसाब बिना पेन-कागज के सेकंडों में मौखिक किया जाता था।
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs">
                  <div className="font-bold text-slate-900 dark:text-white">कौड़ी व पाय-कथा लेखा</div>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">
                    ४ कौड़ी = १ गंडा; ५ गंडा = १ बीसी (२०)। इसी अनुपात में हाट-बाजार में महुआ, सरसों और धान का सटीक नाप-तौल होता था।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Vigesimal (Base-20) Calculator */}
      {activeTab === 'vigesimal' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-sky-600" />
              इसी लेखा (Base-20 Vigesimal System) संवादात्मक कनवर्टर
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              संताली भाषा में २० को 'मित् इसी' कहा जाता है। २०-आधारित इस वैदिक व आदिम पद्धति में संख्याओं का विश्लेषण देखें।
            </p>
          </div>

          {/* Calculator Input & Output Box */}
          <div className="p-6 rounded-2xl bg-sky-50/60 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 max-w-xl space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                दशमलव संख्या दर्ज करें (Enter 1 - 200):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max="200"
                  value={decimalInput}
                  onChange={(e) => setDecimalInput(Math.max(1, Math.min(200, Number(e.target.value))))}
                  className="w-32 px-4 py-2 rounded-xl border border-sky-300 dark:border-sky-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-lg"
                />
                <button
                  onClick={() => speakText(`${decimalInput} को संताली में ${currentVigesimal.santali} कहते हैं। गणितीय रूप: ${currentVigesimal.breakdown}`)}
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-2 transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  उच्चारण सुनें
                </button>
              </div>
            </div>

            {/* Conversion Result Display */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-sky-200 dark:border-sky-700 space-y-2">
              <div className="text-xs text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider">
                संताली २०-आधारित रूप (Vigesimal Form):
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white font-serif">
                {currentVigesimal.santali}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                गणितीय विभाजन: {currentVigesimal.breakdown} = {decimalInput}
              </div>
            </div>
          </div>

          {/* Reference Table of Base-20 Benchmarks */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <span className="font-bold block text-sm">२० (20)</span>
              <span className="text-sky-600 font-semibold">मित् इसी</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <span className="font-bold block text-sm">४० (40)</span>
              <span className="text-sky-600 font-semibold">बार इसी</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <span className="font-bold block text-sm">६० (60)</span>
              <span className="text-sky-600 font-semibold">पे इसी</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <span className="font-bold block text-sm">८० (80)</span>
              <span className="text-sky-600 font-semibold">पोन इसी</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <span className="font-bold block text-sm">१०० (100)</span>
              <span className="text-sky-600 font-semibold">मोड़े इसी (साय)</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Roof Truss Geometry */}
      {activeTab === 'roof_geometry' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Home className="w-5 h-5 text-sky-600" />
              चाला ओड़ाक्: संताली २-चाला व ४-चाला छप्पर ज्यामिति
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              मिट्टी के घरों में बिना लोहे के खंभों के केवल साल की लकड़ी और बांस की कैंची से त्रिकोणीय भार संतुलन (Triangular Truss) की अचूक ज्यामिति।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-sky-50/40 dark:bg-sky-950/20 border border-sky-200/60 dark:border-sky-800/40 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏠</span>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    बार-चाला (२-चाला छप्पर - Gable Roof)
                  </h3>
                  <span className="text-xs text-sky-700 dark:text-sky-400 font-semibold">द्वि-ढलान त्रिकोणीय संतुलन</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                छत के दोनों ओर ४५ डिग्री का ढलान दिया जाता है ताकि मूसलाधार बारिश का पानी एक सेकंड भी खपरैल पर न रुके। बीच में 'मुंडेर' (Ridge pole) को साल के मोटे शहतीर पर टिकाया जाता है।
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-sky-50/40 dark:bg-sky-950/20 border border-sky-200/60 dark:border-sky-800/40 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏛️</span>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    पोने-चाला (४-चाला छप्पर - Hip Roof)
                  </h3>
                  <span className="text-xs text-sky-700 dark:text-sky-400 font-semibold">चतुष्कोणीय वायु-अवरोधक पिरामिड</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                चारों दिशाओं से ढलानदार पिरामिड जैसी संरचना। काल-बैसाखी के प्रचंड आंधी-तूफानों में वायु का दबाव चारों ढलानों पर बराबर बंट जाता है, जिससे छत कभी नहीं उड़ती।
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
