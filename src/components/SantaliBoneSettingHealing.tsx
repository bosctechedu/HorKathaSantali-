import React, { useState } from 'react';
import { Activity, ShieldAlert, Sparkles, HeartPulse, CheckCircle2, AlertTriangle, Volume2, Info, Droplets } from 'lucide-react';

interface HealingProcedure {
  id: string;
  conditionDev: string;
  conditionRom: string;
  hindiName: string;
  herbsUsed: string[];
  splintTechnique: string;
  preparationMethod: string;
  dietRules: string;
  healingDays: number;
  emergencyWarning: string;
}

const HEALING_DATABASE: HealingProcedure[] = [
  {
    id: 'forearm_fracture',
    conditionDev: 'ती जांग रापुत् (हाथ की हड्डी टूटना)',
    conditionRom: 'Ti Jang Raput',
    hindiName: 'अग्रबाहु (Forearm) की अस्थि भंग',
    herbsUsed: ['हाड़-जोड़ा लता (Cissus quadrangularis)', 'देसी मुर्गी का अंडा (सफेदी)', 'कुकुरचिता की जड़'],
    splintTechnique: 'हरे बांस की ७ पतली व चिकनी खपच्चियां (मात् पाती) काटकर सूती कपड़े के ऊपर चारों ओर बराबर दूरी पर रखी जाती हैं और जूट की डोरी से मध्यम कसाव के साथ बांधी जाती हैं।',
    preparationMethod: 'हाड़जोड़ा की ताजी हरी टहनी को सिलबट्टे पर महीन पीसकर अंडे की सफेदी में मिलाया जाता है। इस चिपचिपे लेप को टूटी हड्डी के स्थान पर लेपकर ऊपर भोजपत्र या अरंडी का पत्ता रखा जाता है।',
    dietRules: 'करहानी धान का गर्म मांड, देसी मुर्गे की पतली झोर (सूप)। खटाई (इमली/अमचूर) और बासी भोजन सख्त वर्जित।',
    healingDays: 21,
    emergencyWarning: 'यदि हड्डी त्वचा को फाड़कर बाहर निकल आई हो (ओपन फ्रैक्चर) या उंगलियां नीली पड़ रही हों, तो तुरंत सरकारी अस्पताल ले जाएं।'
  },
  {
    id: 'ankle_sprain',
    conditionDev: 'जंगा कोड़साव (पैर में मोच व खिंचाव)',
    conditionRom: 'Janga Kodsaw',
    hindiName: 'टखने या घुटने की मोच (Sprain & Tendon Strain)',
    herbsUsed: ['कच्ची हल्दी', 'चूना (चूनाम)', 'महुआ तेल', 'अकवन (मदार) के पत्ते'],
    splintTechnique: 'हड्डी टूटी नहीं होती, अतः खपच्ची नहीं लगाई जाती। मदार के पत्ते को गर्म महुआ तेल में सेंककर टखने पर लपेटा जाता है।',
    preparationMethod: 'पिसी हल्दी और थोड़ा सा खाने वाला चूना मिलाकर गर्म लेप बनाया जाता है। इसे गर्म-गर्म मोच वाले स्थान पर बांधकर रात भर रहने दिया जाता है।',
    dietRules: 'गर्म दूध में हल्दी, महुआ गुड़ का सेवन। ठंडे पानी में पैर डालना वर्जित।',
    healingDays: 7,
    emergencyWarning: 'यदि रोगी पैर पर बिल्कुल भी वजन न दे पा रहा हो और अत्यधिक सूजन व कालापन दिखे तो एक्स-रे कराएं।'
  },
  {
    id: 'collarbone_dislocation',
    conditionDev: 'तारोन जांग खिसकाव (हंसली/कंधे का उतरना)',
    conditionRom: 'Taron Jang Khiskaw',
    hindiName: 'कंधे या हंसली (Clavicle) का विस्थापन',
    herbsUsed: ['गूगल धूप', 'महुआ तेल', 'तिल का तेल', 'अरंडी तेल'],
    splintTechnique: 'हातु कविराज रोगी को बैठाकर कुशल हाथों से कंधे को सही कोण में खींचकर (traction) साकेट में बैठाता है। फिर कपड़े की झोली (स्लिंग) से हाथ को सीने से बांधा जाता है।',
    preparationMethod: 'महुआ तेल में लहसुन और अजवाइन को जलाकर सिद्ध किया गया तेल मालिश के लिए प्रयोग होता है।',
    dietRules: 'हल्का सुपाच्य भोजन; हाथ को झटके से उठाना या भारी वजन उठाना १ माह तक मना है।',
    healingDays: 28,
    emergencyWarning: 'नाड़ी न मिलने या हाथ सुन्न होने पर तत्काल आर्थोपेडिक सर्जन से संपर्क करें।'
  },
  {
    id: 'rib_contusion',
    conditionDev: 'कोराम जांग चोट (पसली की अंदरूनी मार)',
    conditionRom: 'Koram Jang Chot',
    hindiName: 'सीने की पसली की अंदरूनी चोट व मार',
    herbsUsed: ['काली मूसली', 'अश्वगंधा (असंगध)', 'महुआ बीज तेल', 'पिपली'],
    splintTechnique: 'पसली पर खपच्ची नहीं बांधी जा सकती; सूती चादर को सीने पर कसकर लपेटा जाता है ताकि गहरी सांस लेने पर दर्द न हो।',
    preparationMethod: 'अश्वगंधा और पिपली चूर्ण को गुनगुने दूध या महुआ के गर्म रस के साथ दिन में दो बार दिया जाता है।',
    dietRules: 'खांसी रोकने वाले काढ़े दिए जाते हैं ताकि खांसने पर पसली में खिंचाव न आए।',
    healingDays: 18,
    emergencyWarning: 'यदि सांस लेने में भारी कठिनाई हो या थूक के साथ खून आए, तो फेफड़े में चोट की आशंका है; तुरंत ICU ले जाएं।'
  }
];

export const SantaliBoneSettingHealing: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<HealingProcedure>(HEALING_DATABASE[0]);
  const [activeTab, setActiveTab] = useState<'procedures' | 'herbal_cabinet' | 'ethics_safety'>('procedures');

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
      <div className="bg-gradient-to-r from-emerald-50 via-stone-50 to-amber-50 border border-emerald-200/40 rounded-2xl p-6 text-slate-900 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100/60 border border-emerald-300/40 rounded-full text-xs font-semibold text-emerald-800 mb-3">
            <HeartPulse className="w-3.5 h-3.5" />
            <span>हातु कविराज व रूग-फाड़ो (Santali Indigenous Orthopedics)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-emerald-800">
            संथाल पारंपरिक हड्डी संधानशाला व वनौषधि लेप विद्या
          </h1>
          <p className="text-stone-700 text-sm mt-2 leading-relaxed">
            संथाल समाज के हातु कविराज (रूग-फाड़ो) सदियों से बिना शल्य-चिकित्सा (Surgery) के बांस की खपच्चियों (पाती), हाड़जोड़ा लता और देसी तेलों से जटिल फ्रैक्चर व मोच का सफल संधान करते आए हैं। जानिए उनकी प्राचीन विधियां और सुरक्षा नियम।
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            <button
              onClick={() => setActiveTab('procedures')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'procedures'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-stone-50/60 hover:bg-stone-100/60 text-stone-800 border border-stone-200/50'
              }`}
            >
              अस्थि संधान विधियां (Procedures)
            </button>
            <button
              onClick={() => setActiveTab('herbal_cabinet')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'herbal_cabinet'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-stone-50/60 hover:bg-stone-100/60 text-stone-800 border border-stone-200/50'
              }`}
            >
              हड्डी जोड़ने वाली वनौषधियां
            </button>
            <button
              onClick={() => setActiveTab('ethics_safety')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'ethics_safety'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-stone-50/60 hover:bg-stone-100/60 text-stone-800 border border-stone-200/50'
              }`}
            >
              कविराज आचार-संहिता व अस्पताल रेफरल
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab 1: Procedures */}
      {activeTab === 'procedures' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Procedures List */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-xs font-bold text-stone-600 uppercase tracking-wider px-1 mb-2">
              अस्थि चोट व विकार चुनें:
            </div>
            {HEALING_DATABASE.map(item => {
              const isSelected = selectedItem.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-3.5 rounded-xl cursor-pointer border transition-all ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-500 shadow-md'
                      : 'bg-stone-50/70 hover:bg-stone-100/60 border-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-emerald-800">{item.conditionDev}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-mono">
                      {item.healingDays} दिन
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1">{item.hindiName}</p>
                </div>
              );
            })}
          </div>

          {/* Procedure Detail View */}
          <div className="lg:col-span-7">
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="pb-4 border-b border-stone-200 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-amber-700">{selectedItem.conditionDev}</h2>
                    <button
                      onClick={() => speakText(selectedItem.conditionDev)}
                      className="p-1 bg-amber-50/40 text-amber-800 rounded hover:bg-amber-100"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-stone-600 font-mono mt-0.5">{selectedItem.conditionRom}</p>
                  <p className="text-sm text-stone-800 mt-1 font-semibold">{selectedItem.hindiName}</p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-stone-600 block">अनुमानित संधान अवधि</span>
                  <span className="text-lg font-bold text-emerald-600">{selectedItem.healingDays} दिन</span>
                </div>
              </div>

              {/* Splint Technique */}
              <div className="bg-white p-4 rounded-xl border border-stone-200">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide block mb-1">
                  बांस की पाती (खपच्ची) व संधान विधि
                </span>
                <p className="text-stone-700 text-sm leading-relaxed">{selectedItem.splintTechnique}</p>
              </div>

              {/* Herbs Used */}
              <div className="bg-white p-4 rounded-xl border border-stone-200">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wide block mb-2">
                  प्रयुक्त प्रमुख वनौषधियां व लेप
                </span>
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedItem.herbsUsed.map((herb, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-stone-50 border border-stone-200 text-xs text-amber-800 rounded-lg"
                    >
                      {herb}
                    </span>
                  ))}
                </div>
                <p className="text-stone-700 text-xs leading-relaxed">{selectedItem.preparationMethod}</p>
              </div>

              {/* Diet Rules */}
              <div className="bg-amber-50/20 border border-amber-200/40 p-4 rounded-xl">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wide block mb-1">
                  पथ्य व अपथ्य (भोजन नियम)
                </span>
                <p className="text-amber-800/90 text-xs leading-relaxed">{selectedItem.dietRules}</p>
              </div>

              {/* Emergency Red Flag Warning */}
              <div className="p-4 bg-red-50/40 border border-red-200/60 rounded-xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-red-700 block mb-0.5">आपातकालीन अस्पताल रेफरल संकेत:</span>
                  <p className="text-xs text-red-800/90 leading-relaxed font-medium">
                    {selectedItem.emergencyWarning}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab 2: Herbal Cabinet */}
      {activeTab === 'herbal_cabinet' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              name: 'हाड़-जोड़ा लता (Cissus quadrangularis)',
              santaliName: 'जांग जोड़ाव लाड़',
              role: 'हड्डी के ऊतकों (osteoblasts) को तेजी से जोड़ने वाला प्राकृतिक कैल्शियम व कोलेजन बूस्टर।'
            },
            {
              name: 'कुकुरचिता (Leea macrophylla)',
              santaliName: 'सेता काटा रेहेत',
              role: 'तीव्र सूजन और रक्त के थक्कों को २४ घंटे के भीतर पिघलाकर दर्द शांत करने वाली जड़।'
            },
            {
              name: 'महुआ बीज का तेल (Mahua Seed Oil)',
              santaliName: 'कुइंडी सुसुम',
              role: 'मांसपेशियों की ऐंठन मिटाने और जोड़ों में चिकनाई बनाए रखने वाला पारंपरिक मालिश तेल।'
            }
          ].map((herb, i) => (
            <div key={i} className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-3">
              <span className="text-base font-bold text-amber-700 block">{herb.name}</span>
              <span className="text-xs text-emerald-600 font-mono block">संताली: {herb.santaliName}</span>
              <p className="text-stone-700 text-xs leading-relaxed">{herb.role}</p>
            </div>
          ))}
        </div>
      )}

      {/* Main Tab 3: Ethics & Safety */}
      {activeTab === 'ethics_safety' && (
        <div className="max-w-3xl mx-auto bg-stone-50 border border-stone-200 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="text-center">
            <h3 className="text-xl font-bold text-amber-800">हातु कविराज की सेवा परंपरा व आधुनिक चिकित्सा समन्वय</h3>
            <p className="text-xs text-stone-600 mt-1">संथाल संस्कृति में चिकित्सा व्यवसाय नहीं, अपितु लोक-कल्याण का पवित्र धर्म है</p>
          </div>

          <div className="space-y-3 text-xs text-stone-700">
            <div className="bg-white p-4 rounded-xl border border-stone-200">
              <strong className="text-amber-600 block mb-1">१. नि:शुल्क लोक सेवा (No Fixed Fee)</strong>
              पारंपरिक कविराज कभी भी इलाज के लिए मोल-भाव नहीं करते। मरीज अपनी श्रद्धा से केवल एक पान का पत्ता, सुपारी या थोड़ा सा धान्य (चावल) भेंट करता है।
            </div>
            <div className="bg-white p-4 rounded-xl border border-stone-200">
              <strong className="text-amber-600 block mb-1">२. आधुनिक एक्स-रे का स्वागत</strong>
              आधुनिक युग में समझदार कविराज रोगी से पहले एक्स-रे कराने को कहते हैं ताकि फ्रैक्चर का सटीक कोण देखकर ही संधान किया जा सके।
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
