import React, { useState } from 'react';
import {
  HeartPulse,
  Leaf,
  ShieldAlert,
  Search,
  Volume2,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Info,
  Clock,
  Layers,
  Thermometer,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import { speakWithFemaleVoice } from '../utils/speech';

export interface EthnoRemedy {
  id: string;
  conditionDev: string;
  conditionRoman: string;
  hindiTitle: string;
  category: 'emergency' | 'digestive' | 'fever' | 'skin' | 'respiratory' | 'bone';
  urgencyLevel: 'प्राथमिक उपचार' | 'गंभीर सावधानी';
  primaryHerbDev: string;
  primaryHerbRoman: string;
  botanicalName: string;
  preparationMethod: string;
  dosageInstructions: string;
  culturalLore: string;
  hospitalWarning: string;
}

export const ETHNO_REMEDIES: EthnoRemedy[] = [
  {
    id: 'bone_fracture',
    conditionDev: 'हाड़-रापूद् आर जोतो (हड्डी चोट व मोच)',
    conditionRoman: 'Har-Rapud ar Joto',
    hindiTitle: 'अस्थि संधान, मोच व गंभीर चोट का प्राथमिक उपचार',
    category: 'bone',
    urgencyLevel: 'प्राथमिक उपचार',
    primaryHerbDev: 'हाड़-जोड़ा लता आर सारजोम लेप',
    primaryHerbRoman: 'Har-Jora Lata ar Sarjom Lep',
    botanicalName: 'Cissus quadrangularis',
    preparationMethod: 'हाड़-जोड़ा लता के कोमल तनों को सिलबट्टे पर महीन पीसकर उसमें थोड़ा देसी हल्दी, चूना और सरसों तेल मिलाकर हल्का गुनगुना लेप तैयार किया जाता है।',
    dosageInstructions: 'मोच या बंद फ्रैक्चर वाले अंग पर बांस की पतली खपच्चियों (कापटी) का सहारा देकर लेप लगाएं और सूती कपड़े से स्थिर बांधें। ३ दिन बाद बदलें।',
    culturalLore: 'संताली बैद्य (कविराज) जंगल में शिकार के दौरान घायल साथियों की टूटी हड्डियों को इसी जड़ी और बांस की खपच्चियों से जोड़ते थे।',
    hospitalWarning: 'यदि हड्डी त्वचा फाड़कर बाहर आ गई हो (Open Compound Fracture), तो तुरंत नजदीकी अस्पताल के ट्रॉमा सेंटर जाएं।'
  },
  {
    id: 'cut_wound',
    conditionDev: 'माय्-ओड़ोक आर घाव (घाव व रक्तस्राव)',
    conditionRoman: 'May-Orok ar Ghao',
    hindiTitle: 'घाव, कटने व तात्कालिक रक्तस्राव को रोकना',
    category: 'emergency',
    urgencyLevel: 'प्राथमिक उपचार',
    primaryHerbDev: 'गेंदा साकाम आर केसूत रस',
    primaryHerbRoman: 'Genda Sakam ar Kesut Ras',
    botanicalName: 'Tagetes erecta / Eclipta alba',
    preparationMethod: 'ताजी गेंदा की पत्तियों या भृंगराज (केसूत) को हथेली पर मसलकर गाढ़ा हरा रस सीधे ताजे घाव पर निचोड़ा जाता है।',
    dosageInstructions: 'रस को घाव पर दबाकर २ मिनट रखें। खून का बहना तुरंत बंद हो जाता है। इसके बाद साफ कपड़े से ढकें।',
    culturalLore: 'खेतों में हसुआ या कुल्हाड़ी से कट जाने पर किसान तुरंत मेड़ पर उगे पौधे की पत्ती तोड़कर यह प्राथमिक उपचार करते हैं।',
    hospitalWarning: 'यदि घाव में जंग लगा लोहा घुसा हो, तो टिटनेस (Tetanus) का इंजेक्शन अवश्य लगवाएं।'
  },
  {
    id: 'fever_malaria',
    conditionDev: 'रुअ़ आर रावाङ (बुखार, जाड़ा व मलेरिया)',
    conditionRoman: 'Rua ar Rawan',
    hindiTitle: 'तीव्र ज्वर, कंपकंपी व मौसमी बुखार',
    category: 'fever',
    urgencyLevel: 'प्राथमिक उपचार',
    primaryHerbDev: 'कालमेघ आर तीता लता (गिलोय)',
    primaryHerbRoman: 'Kalmegh ar Tita Lata (Giloy)',
    botanicalName: 'Andrographis paniculata / Tinospora cordifolia',
    preparationMethod: 'कालमेघ की सूखी पत्तियों और गिलोय के तने को पानी में तब तक उबालें जब तक पानी आधा न रह जाए (काढ़ा)। इसमें ४ दाने कुटी काली मिर्च मिलाएं।',
    dosageInstructions: 'वयस्कों को ३० मिली और बच्चों को १० मिली काढ़ा सुबह-शाम भोजन के बाद गुनगुना दें।',
    culturalLore: 'वर्षा ऋतु में जब वनों में मलेरिया का प्रकोप होता था, तब संताल गांवों में सामूहिक रूप से कालमेघ का कड़वा काढ़ा पिया जाता था।',
    hospitalWarning: 'यदि बुखार १०३°F से ऊपर हो या ३ दिन तक न उतरे, तो तुरंत रक्त जांच (मलेरिया/डेंगू) करवाएं।'
  },
  {
    id: 'dysentery_stomach',
    conditionDev: 'लाज हासो आर ईच ओड़ोक (पेचिश व पेट मरोड़)',
    conditionRoman: 'Laj Haso ar Ich Orok',
    hindiTitle: 'खूनी पेचिश, दस्त व गंभीर पेट दर्द',
    category: 'digestive',
    urgencyLevel: 'प्राथमिक उपचार',
    primaryHerbDev: 'कुड़ची छाल आर मातकोम रासी',
    primaryHerbRoman: 'Kurchi Chhal ar Matkom Rasi',
    botanicalName: 'Holarrhena antidysenterica',
    preparationMethod: 'कुड़ची (इंद्रजौ) के पेड़ की ताजी छाल को धोकर पानी में उबालें या पत्थर पर घिसकर ताजा पेस्ट बनाएं।',
    dosageInstructions: 'छाछ (मट्ठा) में १ चम्मच छाल का रस और भुना जीरा मिलाकर दिन में तीन बार पिलाएं।',
    culturalLore: 'संताली भाषा में कुड़ची को पेट की सभी बीमारियों की अचूक संजीवनी माना जाता है।',
    hospitalWarning: 'यदि रोगी के शरीर में अत्यधिक पानी की कमी (Dehydration) हो रही हो, तो तुरंत ORS घोल दें और अस्पताल ले जाएं।'
  },
  {
    id: 'insect_scorpion',
    conditionDev: 'बिंञ आर सासांग तोरोत (बिच्छू व कीट दंश)',
    conditionRoman: 'Biny ar Sasang Torot',
    hindiTitle: 'बिच्छू, बर्रे व विषैले कीट का डंक',
    category: 'emergency',
    urgencyLevel: 'गंभीर सावधानी',
    primaryHerbDev: 'अपामार्ग (चिरचिटा) आर आक दूध',
    primaryHerbRoman: 'Apamarga Rehet ar Aak Dudh',
    botanicalName: 'Achyranthes aspera',
    preparationMethod: 'अपामार्ग की ताजी जड़ को पानी के साथ सिल पर घिसकर गाढ़ा लेप बनाएं।',
    dosageInstructions: 'दंश स्थल पर लेप लगाएं और डंक को सावधानीपूर्वक निकालें। आक की बूंद डंक पर लगाने से जलन शांत होती है।',
    culturalLore: 'जंगल में महुआ चुनते समय बिच्छू के काटने पर संताल जन तुरंत अपामार्ग की जड़ को पहचानकर उपयोग करते हैं।',
    hospitalWarning: '⚠️ सर्पदंश (Snakebite) की स्थिति में समय न गंवाएं—मरीज को तुरंत नजदीकी सरकारी अस्पताल (एंटी-वेनम) ले जाएं!'
  },
  {
    id: 'skin_rash',
    conditionDev: 'घाव आर बासो (दाद, खाज व चर्म रोग)',
    conditionRoman: 'Ghao ar Baso',
    hindiTitle: 'खुजली, दाद, एक्जिमा व त्वचा संक्रमण',
    category: 'skin',
    urgencyLevel: 'प्राथमिक उपचार',
    primaryHerbDev: 'करंज आर नीम सुनुम (तेल)',
    primaryHerbRoman: 'Karanj ar Nim Sunum',
    botanicalName: 'Pongamia pinnata / Azadirachta indica',
    preparationMethod: 'करंज के बीजों से निकला शुद्ध तेल और नीम के पत्तों के रस को बराबर मात्रा में मिलाकर कांच की शीशी में रखें।',
    dosageInstructions: 'संक्रमित त्वचा को नीम के उबले पानी से धोकर सुखाएं, फिर रात में सोते समय यह तेल हल्के हाथ से लगाएं।',
    culturalLore: 'संताल घरों में करंज का तेल हर समय सुरक्षित रखा जाता है, इसे त्वचा की प्राकृतिक ढाल माना जाता है।',
    hospitalWarning: 'यदि त्वचा पर छाले पड़ रहे हों या मवाद बह रहा हो, तो त्वचा रोग विशेषज्ञ से परामर्श लें।'
  },
  {
    id: 'cough_throat',
    conditionDev: 'खोंक आर होटोक् हासो (खांसी व गले का दर्द)',
    conditionRoman: 'Khonk ar Hotok Haso',
    hindiTitle: 'काली खांसी, कफ, ब्रोंकाइटिस व गला बैठना',
    category: 'respiratory',
    urgencyLevel: 'प्राथमिक उपचार',
    primaryHerbDev: 'वासा (अडूसा) आर बीर मोहुली शहद',
    primaryHerbRoman: 'Vasa (Adusa) ar Bir Mohuli',
    botanicalName: 'Adhatoda vasica',
    preparationMethod: 'वासा की ताजी पत्तियों को तवे पर हल्का सेंककर उसका रस निकालें। इसमें १ चम्मच शुद्ध वन-शहद और चुटकी भर सोंठ मिलाएं।',
    dosageInstructions: 'दिन में ३ बार एक-एक चम्मच धीरे-धीरे चाटें। इसके बाद आधा घंटा ठंडा पानी न पिएं।',
    culturalLore: 'शीतकाल में बच्चों और वृद्धों को कफ से बचाने के लिए संताल परिवारों की दादी-नानी का यह सबसे प्रिय नुस्खा है।',
    hospitalWarning: 'यदि खांसी में खून आ रहा हो या २ सप्ताह से अधिक रहे, तो क्षयरोग (TB) की जांच करवाएं।'
  },
  {
    id: 'insomnia_stress',
    conditionDev: 'जापिद् बांकान आर मोने चिंता (अनिद्रा व तनाव)',
    conditionRoman: 'Japid Bankan ar Mone Chinta',
    hindiTitle: 'अनिद्रा, घबराहट व मानसिक शांति',
    category: 'bone',
    urgencyLevel: 'प्राथमिक उपचार',
    primaryHerbDev: 'आड़के (सुषनी) आड़ा़ सूप',
    primaryHerbRoman: 'Aarke (Sushni) Ara Soup',
    botanicalName: 'Marsilea quadrifolia',
    preparationMethod: 'शाम को ताजे आड़के साग को धोकर लहसुन और चुटकी भर सेंधा नमक के साथ हल्का सूप तैयार करें।',
    dosageInstructions: 'रात के भोजन के साथ एक कटोरी गर्म सूप पिएं।',
    culturalLore: 'पूर्वजों का मानना है कि सुषनी साग में मस्तिष्क की नसों को शांत कर प्राकृतिक मीठी नींद लाने का अलौकिक गुण है।',
    hospitalWarning: 'लगातार सिरदर्द या चक्कर आने पर रक्तचाप (BP) की जांच आवश्यक है।'
  }
];

export const SantaliEthnoMedicine: React.FC = () => {
  const [selectedRemedy, setSelectedRemedy] = useState<EthnoRemedy>(ETHNO_REMEDIES[0]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredRemedies = ETHNO_REMEDIES.filter((item) => {
    const matchesCat = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesSearch =
      item.conditionDev.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.hindiTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.primaryHerbDev.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.botanicalName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-950 to-stone-900 text-white p-6 sm:p-8 border border-emerald-800/40 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs font-bold border border-emerald-500/30">
              <HeartPulse className="w-3.5 h-3.5" />
              <span>रान रेहेत — पारंपरिक संताली प्राथमिक उपचार ज्ञान</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              पारंपरिक वनौषधि व प्राथमिक उपचार संदर्शिका
            </h1>
            <p className="text-emerald-200/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              जंगलों और सुदूर गांवों में पीढ़ियों से संचित संताली वनौषधि ज्ञान। चोट-मोच, हड्डी संधान, ज्वर, पेचिश और घावों के लिए सुरक्षित प्राकृतिक प्राथमिक उपचार व सुरक्षा प्रोटोकॉल।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-900/90 border border-white/10 shrink-0 text-xs space-y-1 sm:w-60">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>सुरक्षित उपचार नीति:</span>
            </div>
            <p className="text-[11px] text-stone-300 leading-snug">
              गंभीर आपात स्थिति में प्राथमिक उपचार के बाद तुरंत निकटतम अस्पताल या डॉक्टर से संपर्क करें।
            </p>
          </div>
        </div>
      </div>

      {/* Critical Snakebite Safety Alert Banner */}
      <div className="p-4 bg-rose-50 border border-rose-300 rounded-3xl flex items-start gap-3.5 text-xs text-rose-950 shadow-sm">
        <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-rose-900 block text-sm font-bold mb-0.5">
            अति आवश्यक आपातकालीन चेतावनी (Emergency Protocol):
          </strong>
          सर्पदंश (सांप का काटना), भारी रक्तस्राव, बेहोशी या तीव्र छाती दर्द में किसी भी घरेलू नुस्खे पर समय न गंवाएं। मरीज को तुरंत एम्बुलेंस (१०८) द्वारा निकटतम प्राथमिक स्वास्थ्य केंद्र (PHC) ले जाएं।
        </div>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="लक्षण या जड़ी-बूटी खोजें (उदा: हड्डी, बुखार, घाव, कालमेघ)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {[
            { id: 'all', label: 'सभी उपचार' },
            { id: 'emergency', label: '🚨 आपातकाल' },
            { id: 'bone', label: '🦴 हड्डी व मोच' },
            { id: 'fever', label: '🌡️ बुखार व जाड़ा' },
            { id: 'digestive', label: '🍵 पेचिश व पेट' },
            { id: 'skin', label: '🌿 त्वचा रोग' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setCategoryFilter(btn.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                categoryFilter === btn.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Master-Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Remedies List (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          {filteredRemedies.map((remedy) => {
            const isSelected = selectedRemedy.id === remedy.id;
            return (
              <div
                key={remedy.id}
                onClick={() => {
                  setSelectedRemedy(remedy);
                  speakWithFemaleVoice(remedy.conditionDev);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-300/40 shadow-sm'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {remedy.urgencyLevel}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 mt-1">
                      {remedy.conditionDev}
                    </h3>
                    <p className="text-xs text-slate-600">{remedy.hindiTitle}</p>
                    <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                      🌿 मुख्य जड़ी: {remedy.primaryHerbDev}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Remedy Deep Detail (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                {selectedRemedy.urgencyLevel}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                {selectedRemedy.conditionDev}
              </h2>
              <div className="text-sm font-bold text-emerald-900">{selectedRemedy.hindiTitle}</div>
            </div>

            <button
              onClick={() => speakWithFemaleVoice(selectedRemedy.conditionDev)}
              className="p-3 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors shrink-0 cursor-pointer"
              title="नाम का संताली उच्चारण सुनें"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* Primary Herb Identification */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
              <Leaf className="w-4 h-4 text-emerald-600" />
              <span>पहचान व मुख्य वनौषधि (Herb Identification):</span>
            </div>
            <div className="text-base font-bold text-slate-900">
              {selectedRemedy.primaryHerbDev}
            </div>
            <div className="text-xs font-mono text-emerald-800">
              वानस्पतिक नाम: {selectedRemedy.botanicalName}
            </div>
          </div>

          {/* Preparation Method */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>पारंपरिक औषधि निर्माण विधि (Preparation):</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {selectedRemedy.preparationMethod}
            </p>
          </div>

          {/* Dosage & Application Instructions */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-600" />
              <span>प्रयोग व मात्रा निर्देश (Dosage & Instructions):</span>
            </h3>
            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/60 text-xs sm:text-sm text-teal-950 leading-relaxed">
              {selectedRemedy.dosageInstructions}
            </div>
          </div>

          {/* Cultural & Healer Lore */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 leading-relaxed flex items-start gap-3">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-amber-900 font-bold mb-0.5">
                पारंपरिक बैद्य व लोक संदर्भ:
              </strong>
              {selectedRemedy.culturalLore}
            </div>
          </div>

          {/* When to visit hospital warning */}
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">अस्पताल कब जाएं:</strong> {selectedRemedy.hospitalWarning}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
