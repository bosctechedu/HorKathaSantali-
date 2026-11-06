import React, { useState } from 'react';
import { Music, Volume2, Info, Hammer, Sparkles, CheckCircle2, ChevronRight, Layers } from 'lucide-react';

interface InstrumentPart {
  partSantali: string;
  partHindi: string;
  humanAnatomySymbol: string;
  material: string;
  acousticRole: string;
}

interface LuthierInstrument {
  id: string;
  nameSantali: string;
  nameDevanagari: string;
  nameHindi: string;
  woodType: string;
  skinType: string;
  tuningPitch: string;
  spiritualMeaning: string;
  parts: InstrumentPart[];
  craftSteps: string[];
}

const LUTHIER_INSTRUMENTS: LuthierInstrument[] = [
  {
    id: 'banam',
    nameSantali: 'Dhodro Banam',
    nameDevanagari: 'धोदरो बानाम',
    nameHindi: 'एक-तंत्रीय मानव-काया वाद्य (सारंगी)',
    woodType: 'पोड़ो / गूलर की लकड़ी (Ficus racemosa)',
    skinType: 'गोह (Monitor Lizard) या बकरे की महीन झिल्लीदार खाल',
    tuningPitch: 'सा (Tonic Root Pitch ~ 220Hz)',
    spiritualMeaning: 'संताली मान्यतानुसार बानाम केवल वाद्य नहीं, बल्कि साक्षात सजीव मानव देह है। इसकी उत्पत्ति की लोककथा सात भाइयों द्वारा अपनी अकेली बहन के वियोग में गाए गए करुण विलाप से जुड़ी है।',
    parts: [
      {
        partSantali: 'Bohok (बोहोक)',
        partHindi: 'शीर्ष / खूंटी बॉक्स',
        humanAnatomySymbol: 'मानव सिर (Head)',
        material: 'लकड़ी पर नक्काशीदार मानवाकृति या मयूर मुख',
        acousticRole: 'तान खूंटी (Peg) को धारण करता है जिससे तार का तनाव कसा जाता है।'
      },
      {
        partSantali: 'Hotok (होतोक)',
        partHindi: 'ग्रीवा / गर्दन',
        humanAnatomySymbol: 'कंठ (Neck)',
        material: 'गोल चिकनी ठोस लकड़ी',
        acousticRole: 'उंगलियों से तार दबाकर विविध सुरों और मींड (Glissando) निकालने का स्थान।'
      },
      {
        partSantali: 'Korom (कोरोम)',
        partHindi: 'ऊपरी वक्ष / नाद कक्ष',
        humanAnatomySymbol: 'हृदय व छाती (Chest)',
        material: 'भीतर से खोखला किया गया प्रकोष्ठ',
        acousticRole: 'ध्वनि की प्राथमिक गूंज और अनुनाद उत्पन्न करता है।'
      },
      {
        partSantali: 'Lach (लाच)',
        partHindi: 'उदर / निचला नाद कक्ष',
        humanAnatomySymbol: 'पेट (Belly)',
        material: 'गोह या बकरे की खाल से मढ़ा हुआ',
        acousticRole: 'ध्वनि को विस्तार देकर भारी और मीठे कंपन में बदलता है।'
      },
      {
        partSantali: 'Ak (आक)',
        partHindi: 'धनुष / गज',
        humanAnatomySymbol: 'प्राण-स्पर्श (Bow)',
        material: 'मुड़ी हुई बांस की कमानी व घोड़े की पूंछ के बाल',
        acousticRole: 'तार पर घर्षण करके निरंतर मधुर सुरीली ध्वनि प्रवाहित करता है।'
      }
    ],
    craftSteps: [
      '१. गूलर (पोड़ो) के वृक्ष से अनुमति हेतु ३ बार कुल्हाड़ी स्पर्श कर बोंगा को नमन करना।',
      '२. एक ही ठोस लकड़ी के लट्ठे को छेनी-हथौड़े से मानव आकृति के अनुरूप तराशना।',
      '३. लाच (उदर) को भीतर से सावधानीपूर्वक खोखला करना ताकि दीवारें ३ मिमी पतली रहें।',
      '४. ताजी गोह की खाल को भिगोकर बांस के कांटों व धागों से तानकर चिपकाना।',
      '५. घोड़े के बाल या तसर रेशम की तांत चढ़ाकर महुआ तेल से पॉलिश करना।'
    ]
  },
  {
    id: 'tumdak',
    nameSantali: 'Tumdak',
    nameDevanagari: 'टुमदाक',
    nameHindi: 'पवित्र मृत्तिका मांदर (ढोलक)',
    woodType: 'दीमक की बांबी की मिट्टी (बुनुम हासबा) व कुम्हार चाक',
    skinType: 'दाहिनी ओर बकरा/बाएं ओर बैल का चमड़ा',
    tuningPitch: 'धिन-धिन गूंज (Base Resonator ~ 110Hz)',
    spiritualMeaning: 'टुमदाक संताली नृत्य का हृदय है। इसकी गूंज को सुनकर धरती माता और पूर्वज बोंगा जागृत होते हैं। बिना टुमदाक के कोई भी पर्व अधूरा है।',
    parts: [
      {
        partSantali: 'Ghar (घार)',
        partHindi: 'मिट्टी का खोल (Body)',
        humanAnatomySymbol: 'गर्भ व काया',
        material: 'विशेष काली मिट्टी व धान की भूसी का पकाया हुआ पात्र',
        acousticRole: 'गंभीर बास और प्राकृतिक खुला अनुनाद।'
      },
      {
        partSantali: 'Kara (कारा)',
        partHindi: 'चमड़े की तान पट्टियां',
        humanAnatomySymbol: 'नसें व शिराएं',
        material: 'कच्ची भैंस की खाल की कटी हुई लंबी डोरियां',
        acousticRole: 'दोनों मुंहों के चमड़े को कसकर मनचाहा सुर बैठाना।'
      },
      {
        partSantali: 'Khiran (खिरन)',
        partHindi: 'सुर लेप (Tuning Paste)',
        humanAnatomySymbol: 'नेत्र तारा (Pupil)',
        material: 'लोहे का बुरादा, पके भात का मांड़ व इमली के बीज का गोंद',
        acousticRole: 'दाहिने सिरे पर गोल काला चक्र जो धातु जैसी खनक पैदा करता है।'
      }
    ],
    craftSteps: [
      '१. दीमक की बांबी (बुनुम) से चिकनी मिट्टी खोदकर धान के भूसे के साथ गूंधना।',
      '२. कुम्हार के चाक पर दोनों ओर खुले बेलनाकार संकरे मुंह वाले खोल को ढालना।',
      '३. साल की पत्तियों और लकड़ी की धीमी आंच में भट्टी (आंवा) में पकाना।',
      '४. बकरे और गाय की खाल को चूने के पानी में साफ कर दोनों मुखों पर मढ़ना।',
      '५. खिरन का लेप चढ़ाकर धूप में सुखाना और कारा की पट्टियों से तानना।'
    ]
  },
  {
    id: 'tamak',
    nameSantali: 'Tamak',
    nameDevanagari: 'तामाक',
    nameHindi: 'युद्ध व उत्सव का महा-नगाड़ा',
    woodType: 'ठोककर बनाया गया अर्ध-गोलाकार तांबा/लोहे का कटोरा',
    skinType: 'मोटी परिपक्व भैंस (काड़ा) की खाल',
    tuningPitch: 'गंभीर गर्जना (Thunder Boom ~ 75Hz)',
    spiritualMeaning: 'हूल क्रांति, सेंदरा (सामूहिक आखेट) और दिशोम की बैठकों में पूरे परगना को एक ध्वनि से एकत्रित करने वाला संप्रभु वाद्य।',
    parts: [
      {
        partSantali: 'Kada Kandra (काड़ा कांद्रा)',
        partHindi: 'धातु का भारी कटोरा',
        humanAnatomySymbol: 'मस्तिष्क की खोपड़ी',
        material: 'तांबा या ढलवा लोहा',
        acousticRole: 'तीव्र ध्वनि तरंगों को दूर-दूर तक (५-१० किमी) प्रक्षेपित करना।'
      },
      {
        partSantali: 'Dangua (डांगुवा)',
        partHindi: 'दोहरी लकड़ी की छड़ी',
        humanAnatomySymbol: 'भुजाएं व शक्ति',
        material: 'धतूरा या मजबूत केंद की लकड़ी की मुड़ी हुई छड़ी',
        acousticRole: 'चमड़े पर तेजी से आघात कर गगनभेदी ताल उत्पन्न करना।'
      }
    ],
    craftSteps: [
      '१. कमार (लोहार) द्वारा तांबे की चादर को पीटकर गोल गहरा कटोरा बनाना।',
      '२. भैंस की ताजी खाल को लकड़ी के खूंटों पर तानकर धूप में सुखाना।',
      '३. गीली खाल को कटोरे के मुंह पर रखकर चमड़े की रस्सियों से खिंचाव देना।',
      '४. चारों ओर लकड़ी के गुटके (खोंटा) लगाकर तनाव को संतुलित करना।'
    ]
  }
];

export const SantaliBanamTamakLuthier: React.FC = () => {
  const [selectedInst, setSelectedInst] = useState<LuthierInstrument>(LUTHIER_INSTRUMENTS[0]);
  const [activeTab, setActiveTab] = useState<'anatomy' | 'craft_steps' | 'tuning'>('anatomy');
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  // Web Audio API tone synthesis for instrument tuning simulation
  const playAcousticNote = (freq: number, type: OscillatorType = 'sine', duration: number = 1.2) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);

      setIsAudioPlaying(true);
      setTimeout(() => setIsAudioPlaying(false), duration * 1000);
    } catch {
      // Audio fallback
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
      {/* Banner */}
      <div className="bg-gradient-to-r from-stone-50 via-amber-50 to-orange-50 rounded-3xl p-6 sm:p-8 text-slate-900 shadow-xl border border-amber-200/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-3 border border-amber-500/30">
              <Music className="w-4 h-4" />
              ल्युथियर शिल्प • Indigenous Instrument Craftsmanship
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-amber-900">
              लोक-वाद्य निर्माण विद्या व बानाम ल्युथियर शिल्प
            </h1>
            <p className="mt-2 text-amber-800/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              धोदरो बानाम की मानव-काया वास्तुकला, टुमदाक (मृत्तिका मांदर) व तामाक (महा-नगाड़ा) की छिलाई, खिरन सुर-लेप और काष्ठ-ध्वनि विज्ञान।
            </p>
          </div>

          {/* Quick tab switcher */}
          <div className="flex items-center gap-2 bg-white/80 p-1.5 rounded-2xl border border-amber-200/40">
            <button
              onClick={() => setActiveTab('anatomy')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'anatomy' ? 'bg-amber-600 text-white shadow-md' : 'text-amber-700 hover:text-slate-900'
              }`}
            >
              काया व अंग (Anatomy)
            </button>
            <button
              onClick={() => setActiveTab('craft_steps')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'craft_steps' ? 'bg-amber-600 text-white shadow-md' : 'text-amber-700 hover:text-slate-900'
              }`}
            >
              निर्माण चरण
            </button>
            <button
              onClick={() => setActiveTab('tuning')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'tuning' ? 'bg-amber-600 text-white shadow-md' : 'text-amber-700 hover:text-slate-900'
              }`}
            >
              सुर व अनुनाद
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Instruments List */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-amber-900 dark:text-amber-700 px-1 flex items-center gap-2">
            <Hammer className="w-4 h-4 text-amber-600" />
            पारंपरिक वाद्य चुनें:
          </h2>

          <div className="space-y-3">
            {LUTHIER_INSTRUMENTS.map((inst) => {
              const isSelected = selectedInst.id === inst.id;
              return (
                <div
                  key={inst.id}
                  onClick={() => setSelectedInst(inst)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-amber-50/80 dark:bg-amber-50/40 border-amber-300 shadow-md ring-2 ring-amber-500/20'
                      : 'bg-white dark:bg-slate-50 border-slate-200 dark:border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-900 text-base">
                        {inst.nameDevanagari}
                      </div>
                      <div className="text-xs text-amber-700 dark:text-amber-600 font-semibold font-mono">
                        ({inst.nameSantali})
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-600 mt-1">
                        {inst.nameHindi}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(`${inst.nameDevanagari}. ${inst.nameHindi}. ${inst.spiritualMeaning}`);
                      }}
                      className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-100 dark:hover:bg-amber-50/50"
                      title="विवरण सुनें"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Lore Callout */}
          <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-50/30 border border-orange-200 dark:border-orange-200/40 text-xs text-orange-900 dark:text-orange-800 space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-orange-800 dark:text-orange-700">
              <Sparkles className="w-4 h-4" />
              वृक्ष-चेतना व संताली आस्था:
            </div>
            <p className="leading-relaxed">
              संताली ल्युथियर बानाम बनाने के लिए जीवित फलते-फूलते वृक्ष को कभी नहीं काटते। वे केवल स्वतः गिरी हुई या सूखी डाल का उपयोग करते हैं, जिससे पेड़ की आत्मा वाद्य में संगीतमय स्वर बनकर अमर हो जाती है।
            </p>
          </div>
        </div>

        {/* Right Column: Instrument Deep-dive */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white dark:bg-slate-50 rounded-3xl p-6 border border-slate-200 dark:border-slate-200 shadow-sm space-y-5">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-200 pb-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-900 flex items-center gap-2">
                  {selectedInst.nameDevanagari} ({selectedInst.nameSantali})
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-600 font-medium">
                  {selectedInst.nameHindi}
                </p>
              </div>

              {/* Acoustic Test Button */}
              <button
                onClick={() => {
                  if (selectedInst.id === 'banam') playAcousticNote(220, 'triangle', 2.0);
                  else if (selectedInst.id === 'tumdak') playAcousticNote(110, 'sine', 1.2);
                  else playAcousticNote(75, 'sawtooth', 1.5);
                }}
                disabled={isAudioPlaying}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all"
              >
                <Music className="w-4 h-4" />
                {isAudioPlaying ? 'ध्वनि बज रही है...' : 'सुर अनुनाद सुनें (Test Acoustic Pitch)'}
              </button>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-100/50 border border-slate-200 dark:border-slate-200/60 text-xs">
                <span className="text-slate-500 dark:text-slate-600 block font-semibold">काष्ठ / आधार सामग्री</span>
                <span className="font-bold text-slate-800 dark:text-slate-800 mt-0.5 block">{selectedInst.woodType}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-100/50 border border-slate-200 dark:border-slate-200/60 text-xs">
                <span className="text-slate-500 dark:text-slate-600 block font-semibold">चमड़ा / झिल्ली</span>
                <span className="font-bold text-slate-800 dark:text-slate-800 mt-0.5 block">{selectedInst.skinType}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-100/50 border border-slate-200 dark:border-slate-200/60 text-xs">
                <span className="text-slate-500 dark:text-slate-600 block font-semibold">प्राकृतिक सुर मान</span>
                <span className="font-bold text-amber-600 dark:text-amber-600 mt-0.5 block">{selectedInst.tuningPitch}</span>
              </div>
            </div>

            {/* Tab: Anatomy */}
            {activeTab === 'anatomy' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-700 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-amber-600" />
                  वाद्य के अंग, मानव-देह समानता व ध्वनिक भूमिका:
                </h4>
                <div className="space-y-3">
                  {selectedInst.parts.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-amber-50/40 dark:bg-amber-50/20 border border-amber-200/50 dark:border-amber-200/40 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-slate-900 dark:text-slate-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                          <span>{p.partSantali} ({p.partHindi})</span>
                        </div>
                        <span className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-50/60 text-amber-800 dark:text-amber-800 text-xs font-semibold">
                          काया प्रतीक: {p.humanAnatomySymbol}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                        <div><strong>प्रयुक्त सामग्री:</strong> {p.material}</div>
                        <div><strong>ध्वनि योगदान:</strong> {p.acousticRole}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Craft Steps */}
            {activeTab === 'craft_steps' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-700 flex items-center gap-1.5">
                  <Hammer className="w-4 h-4 text-amber-600" />
                  निर्माण व तराशने के पारंपरिक ५ चरण:
                </h4>
                <div className="space-y-2.5">
                  {selectedInst.craftSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-100/50 border border-slate-200 dark:border-slate-200 flex items-start gap-3 text-sm text-slate-800 dark:text-slate-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Tuning & Acoustics */}
            {activeTab === 'tuning' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-100/60 border border-stone-200 dark:border-stone-200 space-y-3">
                  <h4 className="font-bold text-slate-900 dark:text-slate-900 text-sm">
                    खिरन (Khiran) - सुर स्थिर करने वाला चमत्कारी लेप
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-700 leading-relaxed">
                    टुमदाक के दाहिने मुख पर लोहे के महीन बुरादे, पके हुए करहानी चावल के मांड़ और इमली के बीज के पाउडर को पत्थर पर रगड़कर काला लेप बनाया जाता है। इसे सटीक वृत्ताकार रूप में लगाया जाता है। यह चमड़े के कंपन को संतुलित करके 'खण-खण' जैसी धातुई गूंज पैदा करता है।
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-50/30 border border-amber-200 dark:border-amber-200/40 space-y-2">
                  <h4 className="font-bold text-amber-900 dark:text-amber-800 text-sm">
                    आक (धनुष) पर घोड़े के बाल का चुनाव
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-700 leading-relaxed">
                    बानाम के धनुष के लिए केवल सफेद अरबी अथवा देशी स्वस्थ घोड़े की पूंछ के बालों को चुना जाता है। बालों पर साल के गोंद (सरजोम लहा) को रगड़ा जाता है ताकि तार पर सर्वोत्तम घर्षण व मिठास आ सके।
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
