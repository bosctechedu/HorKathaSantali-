import React, { useState } from 'react';
import { Layers, Trees, Hammer, Wrench, Sparkles, Volume2, Info, CheckCircle2 } from 'lucide-react';

interface ToolAnatomy {
  id: string;
  nameDev: string;
  nameRom: string;
  hindiName: string;
  woodType: string;
  mechanicsPrinciple: string;
  components: {
    partNameDev: string;
    partNameRom: string;
    functionDesc: string;
  }[];
  maintenanceProverb: string;
}

const TOOLS_DATA: ToolAnatomy[] = [
  {
    id: 'nahel',
    nameDev: 'नाहेल (संताली काष्ठ हल)',
    nameRom: 'Nahel Plow',
    hindiName: 'पारंपरिक संताली लकड़ी का हल',
    woodType: 'साल (सरजोम) अथवा असन (तेंद) की प्राकृतिक मुड़ी हुई मजबूत लकड़ी',
    mechanicsPrinciple: 'एकल प्राकृतिक वक्रता (Single Natural Curve) आधारित संपीड़न जो लाल पथरीली मिट्टी को चीरते समय टूटता नहीं है।',
    components: [
      { partNameDev: 'ईस (Is)', partNameRom: 'Draft Beam', functionDesc: '८ फीट लंबी साल की सीधी बल्ली जो जुआठ (Yoke) को हल के शरीर से जोड़ती है।' },
      { partNameDev: 'कुरहा (Kurha)', partNameRom: 'Plow Body', functionDesc: 'प्राकृतिक रूप से झुकी हुई मुख्य काष्ठ धुरी जो मिट्टी में गहराई तय करती है।' },
      { partNameDev: 'फाड़ (Phad)', partNameRom: 'Iron Coulter', functionDesc: 'कामार (लोहार) द्वारा गढ़ा गया नुकीला लोहे का फाल जो जमीन में चीरा लगाता है।' },
      { partNameDev: 'पारहा / मूठा (Parha)', partNameRom: 'Handle Grip', functionDesc: 'किसान के हाथ की पकड़ (हैंडल) जिससे हल की दिशा व दबाव नियंत्रित होता है।' },
      { partNameDev: 'खोड़ा (Khoda)', partNameRom: 'Locking Wedge', functionDesc: 'फाड़ को लकड़ी में कसकर जकड़ने वाली काष्ठ खूंटी।' }
    ],
    maintenanceProverb: 'नाहेल रे खोड़ा सांबाव-लेरे, खेत रे आड़ोम बानुक-आ (हल में खोड़ा ठीक से लगा हो, तो खेत की जुताई में कोई बाधा नहीं आती)।'
  },
  {
    id: 'dhenki',
    nameDev: 'ढेंकी (काष्ठ उत्तोलक कूटक)',
    nameRom: 'Dhenki Pounder',
    hindiName: 'पैर से संचालित काष्ठ ढेंकी (Foot Grain Pounder)',
    woodType: 'भारी साल (सरजोम) का तना व शीशम का मूसल',
    mechanicsPrinciple: 'प्रथम श्रेणी का उत्तोलक (Class 1 Lever) जो गुरुत्वाकर्षण और पैर के हल्के दबाव से भारी आघात उत्पन्न करता है।',
    components: [
      { partNameDev: 'गाड़ (Gadh)', partNameRom: 'Mortar Basin', functionDesc: 'जमीन में धंसा हुआ कठोर पत्थर या साल की जड़ का गड्ढा जिसमें धान या मड़ुआ रखा जाता है।' },
      { partNameDev: 'सामठ (Samath)', partNameRom: 'Pestle Head', functionDesc: 'नीचे लटकता भारी काष्ठ मूसल जिसके सिरे पर लोहे की मजबूत गोल छड़ (बेड़) चढ़ाई होती है।' },
      { partNameDev: 'पायछान (Paychan)', partNameRom: 'Heel Pedal', functionDesc: 'पीछे का हिस्सा जिस पर संथाल महिलाएं एक पैर से लयबद्ध दबाव डालकर मूसल को ऊपर उठाती हैं।' },
      { partNameDev: 'गोड़ा खुंटा (Goda Khunta)', partNameRom: 'Fulcrum Posts', functionDesc: 'दो मजबूत काष्ठ खंभे जिनके बीच लोहे या काठ की धुरी (धुरी-छड़) पर ढेंकी झूलती है।' }
    ],
    maintenanceProverb: 'ढेंकी साड़ा सांव-ते आतु बेर-एना (ढेंकी की धमक के साथ ही पूरे संताल गांव में सुबह की शुरुआत होती है)।'
  },
  {
    id: 'jodod',
    nameDev: 'जुआठ / जोड़ोत (बैल का जुआ)',
    nameRom: 'Jodod / Ox Yoke',
    hindiName: 'दोहरे बैलों का काष्ठ जुआठ',
    woodType: 'हल्की व लचीली गम्हार (कासमार्) या शीशम की लकड़ी',
    mechanicsPrinciple: 'बैलों के कंधों के उभार (ककुद) के अनुरूप खोखली व चिकनी गोलाई, जिससे जुताई के दौरान बैलों की त्वचा नहीं छिलती।',
    components: [
      { partNameDev: 'सील (Sil / Pegs)', partNameRom: 'Neck Pegs', functionDesc: 'बैलों के गले के दोनों ओर डोरी फंसाने वाली चिकनी काष्ठ खूंटियां।' },
      { partNameDev: 'माझी गांडा (Center Notch)', partNameRom: 'Draft Center', functionDesc: 'हल के ईस को चमड़े की रस्सी (जोत) से बांधने का केंद्रीय खांचा।' }
    ],
    maintenanceProverb: 'डांगरा लेका जोदड़ रे आल्हाव-मे (बैलों की तरह जुआठ में पूरी लगन और निष्ठा से जुट जाओ)।'
  }
];

export const SantaliNahelDhenkiCraft: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<ToolAnatomy>(TOOLS_DATA[0]);
  const [activeTab, setActiveTab] = useState<'blueprint' | 'wood_selection'>('blueprint');

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
      <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-emerald-950 border border-amber-800/40 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-800/60 border border-amber-600/40 rounded-full text-xs font-semibold text-amber-200 mb-3">
            <Trees className="w-3.5 h-3.5" />
            <span>काष्ठ-शिल्प व कृषि वास्तुकला (Santali Indigenous Carpentry)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-amber-100">
            नाहेल (हल), ढेंकी व जुआठ: संताली काष्ठ-शिल्प वास्तुकला
          </h1>
          <p className="text-stone-300 text-sm mt-2 leading-relaxed">
            संथाल बढ़ई (बढ़ई होड़) बिना किसी लोहे के नट-बोल्ट के केवल साल की प्राकृतिक मुड़ी लकड़ियों और काष्ठ-खांचों (Tenon & Mortise) से सहस्राब्दियों तक चलने वाले कृषि यंत्र बनाते आए हैं। जानिए नाहेल और ढेंकी के भौतिकी सिद्धांत व अंग-संरचना।
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            <button
              onClick={() => setActiveTab('blueprint')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'blueprint'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-stone-900/60 hover:bg-stone-800/60 text-stone-200 border border-stone-700/50'
              }`}
            >
              यंत्र ब्लूप्रिंट व अंग-संरचना
            </button>
            <button
              onClick={() => setActiveTab('wood_selection')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'wood_selection'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-stone-900/60 hover:bg-stone-800/60 text-stone-200 border border-stone-700/50'
              }`}
            >
              पारंपरिक काष्ठ चयन विज्ञान (Wood Lore)
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab 1: Blueprint */}
      {activeTab === 'blueprint' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Tool Selector */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-xs font-bold text-stone-400 uppercase tracking-wider px-1 mb-2">
              पारंपरिक काष्ठ यंत्र चुनें:
            </div>
            {TOOLS_DATA.map(t => {
              const isSelected = selectedTool.id === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTool(t)}
                  className={`p-3.5 rounded-xl cursor-pointer border transition-all ${
                    isSelected
                      ? 'bg-amber-950/70 border-amber-500 shadow-md'
                      : 'bg-stone-900/70 hover:bg-stone-800/60 border-stone-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-amber-200">{t.nameDev}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-stone-800 text-stone-400 font-mono">
                      {t.nameRom}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-1">{t.hindiName}</p>
                </div>
              );
            })}
          </div>

          {/* Detailed Blueprint & Components Card */}
          <div className="lg:col-span-7">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="pb-4 border-b border-stone-800 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-amber-300">{selectedTool.nameDev}</h2>
                    <button
                      onClick={() => speakText(selectedTool.nameDev)}
                      className="p-1 bg-amber-900/40 text-amber-200 rounded hover:bg-amber-800"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-stone-400 font-mono mt-0.5">{selectedTool.nameRom}</p>
                  <p className="text-sm text-stone-200 mt-1 font-semibold">{selectedTool.hindiName}</p>
                </div>
              </div>

              {/* Wood & Mechanics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wide block mb-1">
                    उपयुक्त काष्ठ (Wood Type)
                  </span>
                  <p className="text-stone-300 text-xs leading-relaxed">{selectedTool.woodType}</p>
                </div>
                <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide block mb-1">
                    भौतिकी सिद्धांत (Mechanics)
                  </span>
                  <p className="text-stone-300 text-xs leading-relaxed">{selectedTool.mechanicsPrinciple}</p>
                </div>
              </div>

              {/* Components List */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-stone-300 uppercase tracking-wide block">
                  यंत्र के मुख्य अंग व संथाली नामकरण:
                </span>
                <div className="space-y-2">
                  {selectedTool.components.map((comp, i) => (
                    <div
                      key={i}
                      className="p-3 bg-stone-950/80 rounded-xl border border-stone-800 flex items-start justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-amber-300">{comp.partNameDev}</span>
                          <span className="text-xs text-stone-400 font-mono">({comp.partNameRom})</span>
                        </div>
                        <p className="text-xs text-stone-300 mt-0.5">{comp.functionDesc}</p>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Proverb */}
              <div className="p-4 bg-amber-950/20 border border-amber-800/40 rounded-xl text-xs text-amber-100">
                <strong className="text-amber-300 block mb-1">संथाली काष्ठ कहावत:</strong>
                "{selectedTool.maintenanceProverb}"
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab 2: Wood Selection Lore */}
      {activeTab === 'wood_selection' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              tree: 'साल / सरजोम (Shorea robusta)',
              quality: 'अत्यंत कठोर, दीमक-रोधी व भारी।',
              uses: 'हल का कुरहा (Body), ढेंकी का सामठ, और घर के मुख्य खंभे (खुंटा)।'
            },
            {
              tree: 'गम्हार / कासमार् (Gmelina arborea)',
              quality: 'हल्की, चिकनी, टिकाऊ और न झुकने वाली।',
              uses: 'जुआठ (Yoke), चारपाई (पारकोम) और संगीत वाद्ययंत्र (धमक)।'
            },
            {
              tree: 'असन / तेंद (Terminalia alata)',
              quality: 'लोहे जैसी मजबूत व लचीली।',
              uses: 'हल की ईस (Draft Beam) और धनुष (आक्) की कमानी।'
            }
          ].map((w, idx) => (
            <div key={idx} className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-2">
              <span className="text-base font-bold text-amber-300 block">{w.tree}</span>
              <p className="text-xs text-emerald-400 font-medium">गुण: {w.quality}</p>
              <p className="text-xs text-stone-300 leading-relaxed">उपयोग: {w.uses}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
