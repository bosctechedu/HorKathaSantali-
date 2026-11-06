import React, { useState } from 'react';
import { Radio, Volume2, Info, Compass, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AnimalCallOmen {
  id: string;
  animalSantali: string;
  animalHindi: string;
  scientificGroup: string;
  soundType: string;
  soundDescription: string;
  forestMeaning: string;
  audioFreq: number;
  waveType: OscillatorType;
  omenCategory: 'danger_alarm' | 'rain_forecast' | 'travel_omen';
  visualEmoji: string;
}

const ANIMAL_OMENS: AnimalCallOmen[] = [
  {
    id: 'silib',
    animalSantali: 'Silib (सिलिब - हिरण/चीतल)',
    animalHindi: 'चीतल हिरण की चेतावनी पुकार',
    scientificGroup: 'Axis axis (Cervidae)',
    soundType: `तीखी 'खुक-खुक' फूंकार (High-pitched Alarm Snort)`,
    soundDescription: 'जब चीतल अपनी पूंछ उठाकर जमीन पर खुर पटकते हुए तीखा स्वर निकालता है।',
    forestMeaning: 'घने जंगल में बाघ (तुरुप) या तेंदुए का साक्षात गुप्त संचलन। शिकारी तुरंत धनुष संभाल लेते हैं या सुरक्षित वृक्ष की शरण लेते हैं।',
    audioFreq: 580,
    waveType: 'square',
    omenCategory: 'danger_alarm',
    visualEmoji: '🦌'
  },
  {
    id: 'rote',
    animalSantali: 'Rote (रोटे - वन मेंढक)',
    animalHindi: 'झिल्लीदार वृक्ष-मेंढक का वर्षा गान',
    scientificGroup: 'Hylarana / Polypedates',
    soundType: `सतत 'टुर्र-टुर्र' नाद (Rapid Croak Symphony)`,
    soundDescription: 'जब सामान्य मौसम में भी शाम ढलते ही सैकड़ों मेंढक एक लय में बोलने लगें।',
    forestMeaning: '२४ से ४८ घंटों के भीतर घनघोर मूसलाधार वर्षा का अचूक प्राकृतिक संकेत। किसान तुरंत धान के खेतों की मेढ़ें बांधना शुरू कर देते हैं।',
    audioFreq: 320,
    waveType: 'sawtooth',
    omenCategory: 'rain_forecast',
    visualEmoji: '🐸'
  },
  {
    id: 'dahuk',
    animalSantali: 'Dahuk (डाहुक - जलमुर्गी)',
    animalHindi: 'डाहुक पक्षी की पुकार',
    scientificGroup: 'Amaurornis phoenicurus',
    soundType: `गंभीर 'क्वेक-क्वेक' गूंज`,
    soundDescription: 'दोपहर की चिलचिलाती धूप में शांत पोखर के जलकुंभी से आने वाला स्वर।',
    forestMeaning: 'निकटवर्ती जलस्रोत में ताजे स्वच्छ जल और मछलियों की उपस्थिति का संकेत।',
    audioFreq: 440,
    waveType: 'triangle',
    omenCategory: 'rain_forecast',
    visualEmoji: '🦆'
  },
  {
    id: 'tuiyu',
    animalSantali: 'Tuiyu (तुंईऊ - सियार)',
    animalHindi: 'सियार का सामूहिक रुदन व हुंकार',
    scientificGroup: 'Canis aureus',
    soundType: `गगनभेदी 'हौ-हौ' संवेद स्वर (Pack Howl)`,
    soundDescription: 'संध्या ढलते ही गांव के सीवाने से आने वाला ७ सुरों का क्रमिक विलाप।',
    forestMeaning: 'प्रहर परिवर्तन और रात के अंधेरे की शुरुआत। यात्रा पर निकलते समय यदि सियार दाहिने से बाएं जाए तो यात्रा शुभ मानी जाती है।',
    audioFreq: 490,
    waveType: 'sine',
    omenCategory: 'travel_omen',
    visualEmoji: '🦊'
  }
];

const SHUGUN_TRAVEL_RULES = [
  {
    type: 'good',
    title: 'भागी सुगुन (शुभ शकुन)',
    examples: [
      'घर से बाहर कदम रखते ही पानी से भरा कलश (दाः पेरेज बाटी) लिए महिला का सम्मुख आना।',
      'गोशाला में गाय का अपने बछड़े को दुलारते हुए रंभाना।',
      'आकाश में चील या शिकरे का दाहिनी दिशा में परिक्रमा करना।'
    ]
  },
  {
    type: 'bad',
    title: 'बाड़ीच् सुगुन (सावधानी संकेत)',
    examples: [
      'दहलीज पार करते ही किसी का अचानक छींक देना (व्यक्ति कुछ क्षण बैठकर पानी पीकर निकलता है)।',
      'रास्ते में सूखी डाल का ठीक सिर के सामने टूटकर गिरना।',
      'काली बिल्ली या सांप का बाएं से दाएं तेजी से रास्ता काटना।'
    ]
  }
];

export const SantaliAnimalBehaviorOmens: React.FC = () => {
  const [selectedOmen, setSelectedOmen] = useState<AnimalCallOmen>(ANIMAL_OMENS[0]);
  const [activeTab, setActiveTab] = useState<'bioacoustics' | 'travel_omens' | 'weather'>('bioacoustics');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const playSynthesizedAnimalCall = (freq: number, type: OscillatorType) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      // Animal chirp modulation
      osc.frequency.exponentialRampToValueAtTime(freq * 1.4, ctx.currentTime + 0.15);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.8, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.8);

      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 800);
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
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-stone-50 rounded-3xl p-6 sm:p-8 text-slate-900 shadow-xl border border-teal-200/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 text-teal-700 text-xs font-semibold uppercase tracking-wider mb-3 border border-teal-500/30">
              <Radio className="w-4 h-4" />
              जीव-जिन्तु साडे आर सुगुन • Animal Ethno-Bioacoustics
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-teal-900">
              संताली पशु-ध्वनि, जैव-संकेत व लोक-शकुन विद्या
            </h1>
            <p className="mt-2 text-teal-800/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              जंगली जीवों की चेतावनी पुकारें (Alarm Calls), मेंढक-चींटियों के वर्षा संकेत, यात्रा व सेंदरा के भागी-बाड़ीच् सुगुन (शकुन शास्त्र) और ऑडियो ध्वनि अनुकरण।
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/80 p-1.5 rounded-2xl border border-teal-200/50">
            <button
              onClick={() => setActiveTab('bioacoustics')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'bioacoustics'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'text-teal-700 hover:text-slate-900'
              }`}
            >
              पशु-ध्वनि विज्ञान
            </button>
            <button
              onClick={() => setActiveTab('travel_omens')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'travel_omens'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'text-teal-700 hover:text-slate-900'
              }`}
            >
              यात्रा शकुन (सुगुन)
            </button>
            <button
              onClick={() => setActiveTab('weather')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'weather'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'text-teal-700 hover:text-slate-900'
              }`}
            >
              वर्षा-पूर्वानुमान
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab: Bioacoustics */}
      {activeTab === 'bioacoustics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-teal-900 dark:text-teal-700 px-1 flex items-center gap-2">
              <Compass className="w-4 h-4 text-teal-600" />
              जीव-जंतुओं की विशिष्ट ध्वनियां:
            </h2>

            <div className="space-y-3">
              {ANIMAL_OMENS.map((omen) => {
                const isSelected = selectedOmen.id === omen.id;
                return (
                  <div
                    key={omen.id}
                    onClick={() => setSelectedOmen(omen)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-teal-50/80 dark:bg-teal-50/40 border-teal-300 shadow-md ring-2 ring-teal-500/20'
                        : 'bg-white dark:bg-slate-50 border-slate-200 dark:border-slate-200 hover:border-teal-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl p-2 bg-teal-100 dark:bg-teal-50/60 rounded-xl">
                          {omen.visualEmoji}
                        </span>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-slate-900 text-base">
                            {omen.animalSantali}
                          </div>
                          <div className="text-xs text-teal-700 dark:text-teal-600 font-semibold">
                            {omen.animalHindi}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playSynthesizedAnimalCall(omen.audioFreq, omen.waveType);
                          speakText(`${omen.animalSantali}. संकेत: ${omen.forestMeaning}`);
                        }}
                        className="p-1.5 rounded-lg text-teal-600 hover:bg-teal-100 dark:hover:bg-teal-50/50"
                        title="ध्वनि सुनें"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Omen Detail */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white dark:bg-slate-50 rounded-3xl p-6 border border-slate-200 dark:border-slate-200 shadow-sm space-y-5">
              <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-200 pb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-900 flex items-center gap-2">
                    {selectedOmen.visualEmoji} {selectedOmen.animalSantali}
                  </h3>
                  <p className="text-sm text-teal-700 dark:text-teal-600 font-medium">
                    {selectedOmen.animalHindi} ({selectedOmen.scientificGroup})
                  </p>
                </div>
                <button
                  onClick={() => playSynthesizedAnimalCall(selectedOmen.audioFreq, selectedOmen.waveType)}
                  disabled={isPlayingAudio}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-95 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  {isPlayingAudio ? 'ध्वनि गूंज रही है...' : 'ध्वनि अनुकरण सुनें'}
                </button>
              </div>

              {/* Data Specifications */}
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-800 flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    ध्वनि प्रकृति व अभिव्यक्ति (Acoustic Behavior):
                  </h4>
                  <p className="text-slate-600 dark:text-slate-700 leading-relaxed bg-slate-50 dark:bg-slate-100/30 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-200">
                    {selectedOmen.soundDescription}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-800 flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    जंगल में इसका गहरा अर्थ (Forest Translation):
                  </h4>
                  <p className="text-slate-600 dark:text-slate-700 leading-relaxed bg-amber-50/50 dark:bg-amber-50/20 p-3.5 rounded-2xl border border-amber-200/60 dark:border-amber-200/30">
                    {selectedOmen.forestMeaning}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab: Travel Omens */}
      {activeTab === 'travel_omens' && (
        <div className="bg-white dark:bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-200 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-teal-600" />
              संताली यात्रा व सेंदरा शकुन संहिता (Shugun Katha)
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-600 mt-1">
              पूर्वजों द्वारा सदियों के अवलोकन से विकसित प्राकृतिक व मानवीय संकेत जो यात्रा की सफलता का संकेत देते हैं।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SHUGUN_TRAVEL_RULES.map((rule, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border space-y-3 ${
                  rule.type === 'good'
                    ? 'bg-emerald-50/40 dark:bg-emerald-50/20 border-emerald-200/60 dark:border-emerald-200/40'
                    : 'bg-rose-50/40 dark:bg-rose-50/20 border-rose-200/60 dark:border-rose-200/40'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-base">
                  {rule.type === 'good' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                  )}
                  <span className={rule.type === 'good' ? 'text-emerald-950 dark:text-emerald-800' : 'text-rose-950 dark:text-rose-800'}>
                    {rule.title}
                  </span>
                </div>
                <div className="space-y-2 text-xs text-slate-700 dark:text-slate-700">
                  {rule.examples.map((ex, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-slate-600">•</span>
                      <span>{ex}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Tab: Weather Forecast */}
      {activeTab === 'weather' && (
        <div className="bg-white dark:bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-200 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-600" />
              जैविक मौसम पूर्वानुमान (Biometeorology Lore)
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-600 mt-1">
              मौसम रडार से सदियों पूर्व संताली किसान प्रकृति के इन मूक दूतों से वर्षा और तूफान का सटीक अनुमान लगाते थे।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-100/50 border border-slate-200 dark:border-slate-200 space-y-2">
              <div className="text-2xl">🐜</div>
              <h3 className="font-bold text-slate-900 dark:text-slate-900 text-sm">
                चींटियों का अंडे लेकर चढ़ना
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-600 leading-relaxed">
                जब काली चींटियां (मुइ) पंक्तिबद्ध होकर अपने सफेद अंडों को मुंह में दबाकर वृक्षों के ऊंचे तनों पर चढ़ने लगें, तो ३ दिनों में भारी वर्षा निश्चित है।
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-100/50 border border-slate-200 dark:border-slate-200 space-y-2">
              <div className="text-2xl">🪺</div>
              <h3 className="font-bold text-slate-900 dark:text-slate-900 text-sm">
                बाबुई पक्षी का घोंसला
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-600 leading-relaxed">
                यदि बाबुई चिड़िया पेड़ की सबसे ऊंची डाल पर लटकता घोंसला बनाए तो उस वर्ष प्रचंड बाढ़ आएगी; यदि निचली डाल पर बनाए तो सूखा पड़ेगा।
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-100/50 border border-slate-200 dark:border-slate-200 space-y-2">
              <div className="text-2xl">🦚</div>
              <h3 className="font-bold text-slate-900 dark:text-slate-900 text-sm">
                मोर का मेघ-नृत्य व केका-ध्वनि
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-600 leading-relaxed">
                आषाढ़ के पहले बादल देखते ही मयूर का पंख पसारकर झूमना और तीखी 'पिहो-पिहो' ध्वनि करना वर्षा-ऋतु के आगमन का पावन शंखनाद है।
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
