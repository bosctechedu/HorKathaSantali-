import React, { useState } from 'react';
import {
  Scale,
  ShoppingBag,
  ArrowRightLeft,
  MessageSquare,
  Sparkles,
  Volume2,
  CheckCircle,
  HelpCircle,
  RotateCcw,
  Coins,
  Store,
  Info,
  Award
} from 'lucide-react';
import { speakWithFemaleVoice } from '../utils/speech';

export interface BarterItem {
  id: string;
  nameDev: string;
  nameRoman: string;
  hindiName: string;
  unit: string;
  category: 'produce' | 'pottery' | 'tools' | 'grocery';
  icon: string;
  exchangeBaseValue: number; // Value relative to 1 Pai paddy
}

export const BARTER_ITEMS: BarterItem[] = [
  // Produce (धान्य व वनोपज)
  {
    id: 'paddy',
    nameDev: 'होड़ो (Horo - धान)',
    nameRoman: 'Horo (Paddy)',
    hindiName: 'देसी धान',
    unit: 'पाय (Pai ~ 1.5 kg)',
    category: 'produce',
    icon: '🌾',
    exchangeBaseValue: 1.0
  },
  {
    id: 'rice',
    nameDev: 'चाउले (Chawle - चावल)',
    nameRoman: 'Chawle (Rice)',
    hindiName: 'कुटा हुआ लाल/सफेद चावल',
    unit: 'पाय (Pai)',
    category: 'produce',
    icon: '🍚',
    exchangeBaseValue: 1.6
  },
  {
    id: 'mahua',
    nameDev: 'मातकोम (Matkom - महुआ)',
    nameRoman: 'Matkom (Mahua)',
    hindiName: 'सूखा मीठा महुआ फूल',
    unit: 'पाय (Pai)',
    category: 'produce',
    icon: '🌼',
    exchangeBaseValue: 1.2
  },
  {
    id: 'mustard',
    nameDev: 'मणि (Mani - सरसों)',
    nameRoman: 'Mani (Mustard)',
    hindiName: 'पीली/काली सरसों',
    unit: 'पाय (Pai)',
    category: 'produce',
    icon: '🌱',
    exchangeBaseValue: 2.5
  },

  // Pottery & Household (मिट्टी व बर्तन)
  {
    id: 'handi',
    nameDev: 'टुकुच (Tukuch - मिट्टी हांडी)',
    nameRoman: 'Tukuch (Clay Pot)',
    hindiName: 'खाना पकाने की मिट्टी की हांडी',
    unit: '१ नग (Piece)',
    category: 'pottery',
    icon: '🏺',
    exchangeBaseValue: 2.0 // Equal to 2 Pai paddy
  },
  {
    id: 'winnowing_fan',
    nameDev: 'हाताक (Hatak\' - सूप)',
    nameRoman: 'Hatak (Winnowing Fan)',
    hindiName: 'बांस का बना सूप',
    unit: '१ नग (Piece)',
    category: 'pottery',
    icon: '🧺',
    exchangeBaseValue: 3.0 // 3 Pai paddy
  },
  {
    id: 'bronze_bowl',
    nameDev: 'कांसा बाटी (Kansa Bati)',
    nameRoman: 'Kansa Bati',
    hindiName: 'पारंपरिक कांसे का कटोरा',
    unit: '१ नग',
    category: 'pottery',
    icon: '🥣',
    exchangeBaseValue: 8.0 // 8 Pai paddy (or 2 Kath)
  },

  // Tools (कृषि व घरेलू औजार)
  {
    id: 'sickle',
    nameDev: 'दातरोम (Datrom - हसुआ)',
    nameRoman: 'Datrom (Sickle)',
    hindiName: 'फसल कटाई का लोहे का हसुआ',
    unit: '१ नग',
    category: 'tools',
    icon: '🪓',
    exchangeBaseValue: 4.0
  },
  {
    id: 'axe',
    nameDev: 'तांगा (Tanga - कुल्हाड़ी)',
    nameRoman: 'Tanga (Axe)',
    hindiName: 'काठ काटने की लोहे की कुल्हाड़ी',
    unit: '१ नग',
    category: 'tools',
    icon: '⛏️',
    exchangeBaseValue: 6.0
  },
  {
    id: 'flute',
    nameDev: 'तिरयो (Tiryo - बांसुरी)',
    nameRoman: 'Tiryo (Flute)',
    hindiName: 'पवित्र संताली बांस की बांसुरी',
    unit: '१ नग',
    category: 'tools',
    icon: '🪈',
    exchangeBaseValue: 2.5
  },

  // Groceries (नमक, तेल, गुड़)
  {
    id: 'salt',
    nameDev: 'बुलुङ (Bulung - नमक)',
    nameRoman: 'Bulung (Salt)',
    hindiName: 'देसी डला नमक',
    unit: 'सेर (Ser ~ 1 kg)',
    category: 'grocery',
    icon: '🧂',
    exchangeBaseValue: 1.0 // 1 Pai paddy = 1 Ser salt
  },
  {
    id: 'mustard_oil',
    nameDev: 'मणि सुनुम (सरसों तेल)',
    nameRoman: 'Mani Sunum (Mustard Oil)',
    hindiName: 'कोल्हू का शुद्ध सरसों तेल',
    unit: 'पोया (Poya ~ 250 ml)',
    category: 'grocery',
    icon: '🫗',
    exchangeBaseValue: 2.0
  },
  {
    id: 'jaggery',
    nameDev: 'गुड़ (Gur - देसी गुड़)',
    nameRoman: 'Gur (Jaggery)',
    hindiName: 'गन्ने या खजूर का गुड़',
    unit: 'सेर (Ser)',
    category: 'grocery',
    icon: '🍯',
    exchangeBaseValue: 2.0
  }
];

export const HAAT_DIALOGUES = [
  {
    id: 'dia-1',
    devanagari: 'गाते, नूवा टुकुच रेयाक गोन दो तिनोक?',
    roman: 'Gate, nuwa tukuch reyak gon do tinok?',
    hindi: 'मित्र! इस मिट्टी की हांडी का दाम (विनिमय) कितना है?',
    context: 'दाम पूछने का पारंपरिक शिष्टाचार'
  },
  {
    id: 'dia-2',
    devanagari: 'मिद् टुकुच ते बार पाय होड़ो एमाञ मे।',
    roman: 'Mid tukuch te bar pai horo emany me.',
    hindi: 'एक हांडी के बदले मुझे दो पाय धान दे दीजिए।',
    context: 'दुकानदार का विनिमय प्रस्ताव'
  },
  {
    id: 'dia-3',
    devanagari: 'थोरड़ा कोम मे से हो! इञ ठेन होड़ो कोम गेया।',
    roman: 'Thorda kom me se ho! Inj thehen horo kom geya.',
    hindi: 'भाई थोड़ा कम करो ना! मेरे पास धान थोड़ा कम है।',
    context: 'हाट में मीठा मोल-भाव (Bargaining)'
  },
  {
    id: 'dia-4',
    devanagari: 'नूवा दातरोम दो अडी बेस आर चालाक काना, जोतो दिन ताहेना।',
    roman: 'Nuwa datrom do adi bes ar chalak kana, joto din tahena.',
    hindi: 'यह हसुआ बहुत मजबूत और तेज धार वाला है, सालों-साल चलेगा।',
    context: 'कारीगर द्वारा वस्तु की प्रशंसा'
  },
  {
    id: 'dia-5',
    devanagari: 'हें, मा इदा साब् मे, सागुन जोहार!',
    roman: 'Hen, ma ida sab me, sagun johar!',
    hindi: 'हां, ठीक है! यह लीजिए अपना सामान, सादर जोहार!',
    context: 'सौदा पक्का होने पर विदाई'
  }
];

export const SantaliHaatBarterSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'dialogues' | 'game'>('calculator');

  // Barter Calculator State
  const [giveItemId, setGiveItemId] = useState<string>('paddy');
  const [giveQty, setGiveQty] = useState<number>(4); // e.g. 4 Pai
  const [getItemId, setGetItemId] = useState<string>('handi');

  const giveItem = BARTER_ITEMS.find((i) => i.id === giveItemId) || BARTER_ITEMS[0];
  const getItem = BARTER_ITEMS.find((i) => i.id === getItemId) || BARTER_ITEMS[4];

  // Calculate Exchange Quantity
  const totalGiveValue = giveQty * giveItem.exchangeBaseValue;
  const calculatedGetQty = Math.max(0.25, Math.round((totalGiveValue / getItem.exchangeBaseValue) * 10) / 10);

  // Shopping Game State
  const [gamePaddyPai, setGamePaddyPai] = useState<number>(12); // start with 12 Pai (3 Kath)
  const [inventory, setInventory] = useState<string[]>([]);
  const [gameMessage, setGameMessage] = useState<string>('हाट में आपका स्वागत है! आपके पास १२ पाय धान है। आवश्यक सामग्री खरीदें।');

  const TARGET_GOALS = ['handi', 'sickle', 'salt', 'winnowing_fan'];

  const handleBuyItem = (item: BarterItem) => {
    const costInPai = item.exchangeBaseValue;
    if (gamePaddyPai < costInPai) {
      setGameMessage(`धान कम पड़ गया! ${item.nameDev} के लिए ${costInPai} पाय धान चाहिए।`);
      return;
    }

    setGamePaddyPai((prev) => prev - costInPai);
    setInventory((prev) => [...prev, item.id]);
    setGameMessage(`सौदा पक्का! आपने ${item.nameDev} खरीद लिया।`);
  };

  const handleResetGame = () => {
    setGamePaddyPai(12);
    setInventory([]);
    setGameMessage('हाट नया शुरू हुआ! आपके पास १२ पाय धान है।');
  };

  const isGameWon = TARGET_GOALS.every((goal) => inventory.includes(goal));

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950 via-stone-900 to-amber-900 text-white p-6 sm:p-8 border border-amber-800/40 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-lg text-xs font-bold border border-amber-500/30">
              <Store className="w-3.5 h-3.5" />
              <span>हातु पातार — पारंपरिक संताली वस्तु-विनिमय बाज़ार</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              संताली पारंपरिक हाट व वस्तु-विनिमय बाज़ार
            </h1>
            <p className="text-amber-200/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              संताली गांवों के साप्ताहिक हाट (पातार) का सजीव अनुभव। धान, महुआ व सरसों देकर बर्तन, औजार व नमक का पारंपरिक विनिमय और संताली में मोल-भाव संवाद सीखें।
            </p>
          </div>

          <div className="flex items-center gap-2 bg-stone-900/80 p-1.5 rounded-2xl border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'calculator'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              ⚖️ विनिमय कैलकुलेटर
            </button>
            <button
              onClick={() => setActiveTab('dialogues')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'dialogues'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              💬 हाट में बोलचाल
            </button>
            <button
              onClick={() => setActiveTab('game')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'game'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              🎮 हाट खरीदारी गेम
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: BARTER CALCULATOR */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Left (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-amber-600" />
                <span>पारंपरिक विनिमय अनुपात गणक (Barter Exchange)</span>
              </h2>
              <span className="text-xs bg-amber-50 text-amber-800 font-bold px-3 py-1 rounded-full border border-amber-200">
                १ काठ = ४ पाय
              </span>
            </div>

            {/* Give Box */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
              <span className="text-xs font-bold text-amber-900 block">
                १. आपके पास देने के लिए क्या वस्तु है? (You Give):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {BARTER_ITEMS.filter((i) => i.category === 'produce').map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setGiveItemId(item.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      giveItemId === item.id
                        ? 'bg-amber-600 text-white font-bold shadow-xs border-amber-600'
                        : 'bg-white border-slate-200 hover:bg-amber-100 text-slate-800'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-xs font-bold">{item.nameDev.split('(')[0]}</span>
                  </button>
                ))}
              </div>

              {/* Quantity Slider */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>मात्रा (Quantity):</span>
                  <span className="font-mono text-amber-800 text-sm">
                    {giveQty} {giveItem.unit} {giveQty >= 4 ? `(${Math.floor(giveQty / 4)} काठ ${giveQty % 4} पाय)` : ''}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="16"
                  value={giveQty}
                  onChange={(e) => setGiveQty(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Receive Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-800 block">
                २. बदले में क्या लेना चाहते हैं? (You Receive):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {BARTER_ITEMS.filter((i) => i.category !== 'produce').map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setGetItemId(item.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      getItemId === item.id
                        ? 'bg-stone-900 text-amber-300 font-bold shadow-xs border-stone-900'
                        : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-xs font-bold line-clamp-1">{item.nameDev.split('(')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Card Right (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-amber-50 via-white to-amber-50/50 rounded-3xl p-6 sm:p-7 border border-amber-300 shadow-md space-y-5">
            <span className="text-xs font-black uppercase tracking-wider text-amber-900 block">
              पारंपरिक विनिमय परिणाम (Fair Trade Deal)
            </span>

            {/* Visual Exchange Display */}
            <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-4 text-center">
              <div className="flex items-center justify-around">
                <div>
                  <span className="text-4xl block mb-1">{giveItem.icon}</span>
                  <span className="font-extrabold text-sm text-slate-900 block">
                    {giveQty} {giveItem.unit}
                  </span>
                  <span className="text-[11px] text-slate-500">{giveItem.nameDev.split('(')[0]}</span>
                </div>

                <div className="text-xl font-bold text-amber-600">➔</div>

                <div>
                  <span className="text-4xl block mb-1">{getItem.icon}</span>
                  <span className="font-extrabold text-lg text-emerald-700 block">
                    {calculatedGetQty} {getItem.unit}
                  </span>
                  <span className="text-[11px] text-slate-500">{getItem.nameDev.split('(')[0]}</span>
                </div>
              </div>
            </div>

            {/* Cultural Context Description */}
            <div className="p-4 rounded-2xl bg-amber-100/70 border border-amber-200 text-xs text-amber-950 leading-relaxed">
              <strong className="block text-amber-900 font-bold mb-1">
                हाट का पारंपरिक विनिमय नियम:
              </strong>
              संताल परगना के हाटों में प्राचीन काल से मुद्रा के स्थान पर धान और महुआ को सर्वमान्य मुद्रा (Standard Currency) माना गया है। १ सेर डला नमक १ पाय धान में, और मिट्टी की बड़ी हांडी २ से ३ पाय धान में सुलभता से विनिमय होती थी।
            </div>

            {/* Units Info Table */}
            <div className="space-y-1.5 text-[11px] text-slate-600 pt-2 border-t border-amber-200">
              <div className="font-bold text-slate-800">पारंपरिक माप इकाइयां:</div>
              <div className="grid grid-cols-2 gap-2">
                <span className="bg-white p-2 rounded-lg border border-slate-200">• १ पाय = ~१.५ किग्रा धान</span>
                <span className="bg-white p-2 rounded-lg border border-slate-200">• १ काठ = ४ पाय (~६ किग्रा)</span>
                <span className="bg-white p-2 rounded-lg border border-slate-200">• १ पोया = ~२५० ग्राम</span>
                <span className="bg-white p-2 rounded-lg border border-slate-200">• १ सेर = ~१ किग्रा</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MARKET SPOKEN DIALOGUES */}
      {activeTab === 'dialogues' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">
              हाट में खरीद-बिक्री के पारंपरिक संताली संवाद
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              हाट में दुकानदार से मोल-भाव करने, दाम पूछने और सामान लेते समय प्रयुक्त प्रामाणिक संताली वाक्य।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HAAT_DIALOGUES.map((dia) => (
              <div
                key={dia.id}
                onClick={() => speakWithFemaleVoice(dia.devanagari)}
                className="p-5 rounded-2xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                      {dia.context}
                    </span>
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-amber-900 mt-1">
                      {dia.devanagari}
                    </h3>
                    <p className="text-xs font-mono text-amber-800 font-semibold">
                      {dia.roman}
                    </p>
                    <p className="text-xs text-slate-600 italic">
                      हिंदी: {dia.hindi}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakWithFemaleVoice(dia.devanagari);
                    }}
                    className="p-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors shrink-0"
                    title="संवाद का ऑडियो सुनें"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SHOPPING MINI GAME */}
      {activeTab === 'game' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {/* Game Status Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-amber-50 border border-amber-200">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                हाट खरीदारी चुनौती (Haat Shopper Challenge)
              </span>
              <p className="text-xs sm:text-sm text-slate-700">
                {gameMessage}
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block">आपके पास बचा धान</span>
                <span className="text-2xl font-black text-amber-700">
                  {gamePaddyPai} पाय धान
                </span>
              </div>
              <button
                onClick={handleResetGame}
                className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors cursor-pointer"
                title="खेल रीसेट करें"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Win Status Banner */}
          {isGameWon && (
            <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-400 text-emerald-950 font-bold text-sm flex items-center gap-2 animate-bounce">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>बधाई! आपने हाट से अपने घर की सभी ४ आवश्यक वस्तुएं सफलतापूर्वक खरीद लीं!</span>
            </div>
          )}

          {/* Stalls Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-800">
              हाट के स्टॉल से वस्तु चुनें व धान देकर विनिमय करें:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {BARTER_ITEMS.filter((i) => i.category !== 'produce').map((item) => {
                const isBought = inventory.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between h-44 ${
                      isBought
                        ? 'bg-emerald-50 border-emerald-300 opacity-90'
                        : 'bg-white border-slate-200 hover:shadow-md'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{item.icon}</span>
                        <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                          {item.exchangeBaseValue} पाय धान
                        </span>
                      </div>
                      <div className="font-bold text-sm text-slate-900 mt-2">
                        {item.nameDev.split('(')[0]}
                      </div>
                      <div className="text-[11px] text-slate-500">{item.hindiName}</div>
                    </div>

                    <button
                      onClick={() => handleBuyItem(item)}
                      disabled={isBought}
                      className={`w-full py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isBought
                          ? 'bg-emerald-600 text-white cursor-default'
                          : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-2xs'
                      }`}
                    >
                      {isBought ? '✓ खरीदा हुआ' : 'धान से खरीदें'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
