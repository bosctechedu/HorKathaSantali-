import React, { useState, useRef } from 'react';
import {
  Shield,
  Users,
  Award,
  Download,
  Share2,
  Sparkles,
  TreePine,
  Search,
  BookOpen,
  Info,
  Check,
  Volume2
} from 'lucide-react';
import { speakWithFemaleVoice } from '../utils/speech';

export interface ClanDetail {
  id: string;
  nameDev: string;
  nameRoman: string;
  totemAnimal: string;
  totemEmoji: string;
  socialRole: string;
  sacredTaboo: string;
  orakBonga: string;
  subClansKhunt: string[];
  historicalLore: string;
}

export const CLAN_DATABASE: ClanDetail[] = [
  {
    id: 'hansdak',
    nameDev: 'हांसदाक (Hansdak\')',
    nameRoman: 'Hansdak',
    totemAnimal: 'जंगली हंस (Wild Swan / Goose)',
    totemEmoji: '🦢',
    socialRole: 'ज्येष्ठ कुल व विचारक (Eldest Clan & Advisors)',
    sacredTaboo: 'हांस (हंस) पक्षी को मारना, खाना, पिंजरे में कैद करना या उसका अपमान करना पूर्णतः वर्जित है।',
    orakBonga: 'मारांग बुरु व ओड़ाक बोंगा',
    subClansKhunt: ['चिलबिंधा हांसदाक', 'साद हांसदाक', 'ओभा हांसदाक', 'निझोर हांसदाक', 'रोत हांसदाक', 'काढ़ा हांसदाक'],
    historicalLore: 'मानव सृष्टि की कथा में जब हांस-हांसिल पक्षियों के अंडों से पिलचु हाड़ाम व पिलचु बुढ़ी का जन्म हुआ, तो उनके सबसे बड़े पुत्र का कुल हांसदाक कहलाया।'
  },
  {
    id: 'murmu',
    nameDev: 'मुर्मू (Murmu)',
    nameRoman: 'Murmu',
    totemAnimal: 'नीलगाय (Nilgai / Blue Bull)',
    totemEmoji: '🦌',
    socialRole: 'पुजारी व आध्यात्मिक धर्मगुरु (Priests & Naike)',
    sacredTaboo: 'नीलगाय का शिकार करना, उसका मांस खाना या उसकी खाल का उपयोग करना महापाप माना जाता है।',
    orakBonga: 'जाहेर एरा व मारांग बुरु',
    subClansKhunt: ['नाईके खूंट मुर्मू', 'तिल मुर्मू', 'सादा मुर्मू', 'गड़ा मुर्मू', 'ओभा मुर्मू', 'मुरही मुर्मू', 'हांडिया मुर्मू'],
    historicalLore: 'संताल समाज में जाहेर थान के मुख्य पुरोहित (नाईके) पारंपरिक रूप से मुर्मू वंश से ही होते हैं, जो समस्त बोंगा-बुरु की पूजा संपन्न कराते हैं।'
  },
  {
    id: 'kisku',
    nameDev: 'किस्कू (Kisku)',
    nameRoman: 'Kisku',
    totemAnimal: 'शिखंडी पक्षी / राजा चील (Kingfisher / Eagle)',
    totemEmoji: '🦅',
    socialRole: 'शासक व राजा वंश (Kings & Chieftains)',
    sacredTaboo: 'शिखंडी पक्षी या चील को नुकसान पहुंचाना वर्जित है।',
    orakBonga: 'परगना बोंगा व ओड़ाक बोंगा',
    subClansKhunt: ['राज किस्कू', 'गाड़ा किस्कू', 'ओभा किस्कू', 'सादा किस्कू', 'सोला किस्कू', 'मनिहार किस्कू'],
    historicalLore: 'चाय चम्पा गढ़ के ऐतिहासिक काल में संताल राष्ट्र के अधिपति और राजा पारंपरिक रूप से किस्कू कुल के ही होते थे।'
  },
  {
    id: 'hembram',
    nameDev: 'हेम्ब्रम (Hembram)',
    nameRoman: 'Hembram',
    totemAnimal: 'सुपारी वृक्ष व गुआ (Areca Nut / Betel)',
    totemEmoji: '🌴',
    socialRole: 'न्यायाधीश व दीवान वंश (Judges & Ministers)',
    sacredTaboo: 'कच्ची सुपारी या सुपारी के पेड़ को नष्ट करना वर्जित है।',
    orakBonga: 'गोसांय एरा व हापड़ाम को',
    subClansKhunt: ['गुआ हेम्ब्रम', 'दंत हेम्ब्रम', 'सादा हेम्ब्रम', 'राजा हेम्ब्रम', 'गड़ा हेम्ब्रम', 'लातहे हेम्ब्रम'],
    historicalLore: 'प्राचीन संताल दरबारों में न्याय प्रणाली, कूटनीति और मंत्रि-परिषद का दायित्व हेम्ब्रम कुल के मनीषियों के पास रहता था।'
  },
  {
    id: 'marandi',
    nameDev: 'मरांडी (Marandi)',
    nameRoman: 'Marandi',
    totemAnimal: 'मड़ुआ घास व वनस्पति (Marndi Grass)',
    totemEmoji: '🌾',
    socialRole: 'व्यापारी, कोषाध्यक्ष व धनवान वंश (Treasurers & Merchants)',
    sacredTaboo: 'मड़ुआ घास को उखाड़ना या उसका अनादर करना वर्जित है।',
    orakBonga: 'लक्ष्मी स्वरूपा गृह देवी व मारांग बुरु',
    subClansKhunt: ['माड़ मरांडी', 'सादा मरांडी', 'गड़ा मरांडी', 'रोत मरांडी', 'कौवा मरांडी', 'भेंडा मरांडी'],
    historicalLore: 'मरांडी कुल के लोग कृषि, पशुधन संचय, व्यापार और समाज के आर्थिक संतुलन के संरक्षक रहे हैं।'
  },
  {
    id: 'soren',
    nameDev: 'सोरेन (Soren)',
    nameRoman: 'Soren',
    totemAnimal: 'सिपाही कुल / तारे (Constellation / Brave Warriors)',
    totemEmoji: '⚔️',
    socialRole: 'सेनापति व रक्षक वंश (Warriors & Commanders)',
    sacredTaboo: 'अपने शस्त्र का अनादर करना या निर्दोष पर प्रहार करना वर्जित है।',
    orakBonga: 'बीर बोंगा (वन व वीर देव)',
    subClansKhunt: ['सिपाही सोरेन', 'साद सोरेन', 'ओभा सोरेन', 'चांद सोरेन', 'मालो सोरेन', 'सादा सोरेन'],
    historicalLore: 'संथाल हुल और प्राचीन युद्धों में अग्रिम मोर्चे पर मातृभूमि की रक्षा करने वाले महान योद्धा सोरेन कुल के रहे हैं।'
  },
  {
    id: 'tudu',
    nameDev: 'टुडू (Tudu)',
    nameRoman: 'Tudu',
    totemAnimal: 'उल्लू पक्षी व संगीत (Owl & Musical Heritage)',
    totemEmoji: '🦉',
    socialRole: 'संगीतकार व मांदर वादक (Musicians & Art Masters)',
    sacredTaboo: 'उल्लू पक्षी का अनादर करना वर्जित है।',
    orakBonga: 'अखड़ा बोंगा व सारजोम बोंगा',
    subClansKhunt: ['मांदरिया टुडू', 'साद टुडू', 'ओभा टुडू', 'चिलबिंधा टुडू', 'सादा टुडू'],
    historicalLore: 'तुमाक और तामाक की पारंपरिक ताल रचना, लोक-संगीत और अखड़ा नृत्य का नेतृत्व टुडू कुल के साधक करते हैं।'
  },
  {
    id: 'baske',
    nameDev: 'बास्की (Baske)',
    nameRoman: 'Baske',
    totemAnimal: 'बासी चावल व पाक कला (Cooked Rice Lore)',
    totemEmoji: '🍚',
    socialRole: 'पाक कला व अन्न संरक्षक (Culinary & Food Stewards)',
    sacredTaboo: 'अन्न का अपमान करना या थाली में जूठन छोड़ना वर्जित है।',
    orakBonga: 'अन्नपूर्णा गृह देवी',
    subClansKhunt: ['सादा बास्की', 'मांडी बास्की', 'गड़ा बास्की'],
    historicalLore: 'बड़े सामाजिक आयोजनों और महापर्वों पर भोजन व्यवस्था व पाक मर्यादा का संपादन बास्की कुल द्वारा होता है।'
  }
];

export const SantaliClanGenealogy: React.FC = () => {
  const [selectedClan, setSelectedClan] = useState<ClanDetail>(CLAN_DATABASE[0]);
  const [activeTab, setActiveTab] = useState<'clans' | 'certificate'>('clans');

  // Certificate Form State
  const [familyHead, setFamilyHead] = useState<string>('पठान हेम्ब्रम');
  const [fatherName, setFatherName] = useState<string>('स्व. कान्हू हेम्ब्रम');
  const [grandfatherName, setGrandfatherName] = useState<string>('स्व. सिदो हेम्ब्रम');
  const [villageName, setVillageName] = useState<string>('भोगनाडीह, साहिबगंज');
  const [userKhunt, setUserKhunt] = useState<string>('गुआ हेम्ब्रम (Gua Hembram)');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate Family Heritage Certificate
  const generateCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1200;
    const height = 800;
    canvas.width = width;
    canvas.height = height;

    // Background Gradient (Parchment Paper tone)
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#fef3c7');
    grad.addColorStop(0.5, '#fde68a');
    grad.addColorStop(1, '#fef08a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative Borders
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 14;
    ctx.strokeRect(30, 30, width - 60, height - 60);

    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 3;
    ctx.strokeRect(48, 48, width - 96, height - 96);

    // Corner rosettes
    const corners = [
      [65, 65],
      [width - 65, 65],
      [65, height - 65],
      [width - 65, height - 65]
    ];
    ctx.fillStyle = '#b45309';
    corners.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, Math.PI * 2);
      ctx.fill();
    });

    // Header Emblem
    ctx.font = '54px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🏛️', width / 2, 110);

    // Title
    ctx.font = 'bold 36px system-ui, sans-serif';
    ctx.fillStyle = '#451a03';
    ctx.fillText('संताली पारिवारिक धरोहर व वंशावली प्रमाण-पत्र', width / 2, 170);

    ctx.font = 'bold 22px system-ui, sans-serif';
    ctx.fillStyle = '#92400e';
    ctx.fillText('• ᱥᱟᱱᱛᱟᱲᱤ ᱜᱷᱟᱨᱚᱸᱡᱽ ᱥᱟᱠᱟᱢ • SANTHAL KINSHIP RECORD •', width / 2, 210);

    // Divider Line
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(350, 230);
    ctx.lineTo(850, 230);
    ctx.stroke();

    // Body content box
    ctx.fillStyle = '#ffffff';
    ctx.roundRect(100, 260, width - 200, 420, 24);
    ctx.fill();
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Certificate Fields (Left & Right layout)
    ctx.textAlign = 'left';

    // Row 1
    ctx.font = 'bold 20px system-ui, sans-serif';
    ctx.fillStyle = '#78350f';
    ctx.fillText('१. कुल / गोत्र (पारिस - Clan):', 140, 320);
    ctx.font = 'bold 24px system-ui, sans-serif';
    ctx.fillStyle = '#1e293b';
    ctx.fillText(`${selectedClan.nameDev} ${selectedClan.totemEmoji}`, 480, 320);

    // Row 2
    ctx.font = 'bold 20px system-ui, sans-serif';
    ctx.fillStyle = '#78350f';
    ctx.fillText('२. उप-गोत्र (खूंट - Sub-Clan):', 140, 380);
    ctx.font = 'bold 22px system-ui, sans-serif';
    ctx.fillStyle = '#1e293b';
    ctx.fillText(userKhunt, 480, 380);

    // Row 3
    ctx.font = 'bold 20px system-ui, sans-serif';
    ctx.fillStyle = '#78350f';
    ctx.fillText('३. कुल-देवता (ओड़ाक बोंगा):', 140, 440);
    ctx.font = 'bold 22px system-ui, sans-serif';
    ctx.fillStyle = '#1e293b';
    ctx.fillText(selectedClan.orakBonga, 480, 440);

    // Row 4
    ctx.font = 'bold 20px system-ui, sans-serif';
    ctx.fillStyle = '#78350f';
    ctx.fillText('४. पूर्वज पीढ़ी (Ancestry Line):', 140, 500);
    ctx.font = '600 20px system-ui, sans-serif';
    ctx.fillStyle = '#334155';
    ctx.fillText(
      `${grandfatherName} ➔ ${fatherName} ➔ ${familyHead}`,
      480,
      500
    );

    // Row 5
    ctx.font = 'bold 20px system-ui, sans-serif';
    ctx.fillStyle = '#78350f';
    ctx.fillText('५. पैतृक गांव (हातु - Village):', 140, 560);
    ctx.font = '600 20px system-ui, sans-serif';
    ctx.fillStyle = '#334155';
    ctx.fillText(villageName, 480, 560);

    // Row 6: Sacred Taboo
    ctx.font = 'bold 20px system-ui, sans-serif';
    ctx.fillStyle = '#78350f';
    ctx.fillText('६. पवित्र गोत्र-निषेध (Taboo):', 140, 620);
    ctx.font = 'italic 18px system-ui, sans-serif';
    ctx.fillStyle = '#b91c1c';
    ctx.fillText(selectedClan.sacredTaboo.slice(0, 60) + '...', 480, 620);

    // Footer
    ctx.textAlign = 'center';
    ctx.font = 'bold 18px system-ui, sans-serif';
    ctx.fillStyle = '#78350f';
    ctx.fillText(
      'हासा आर भाषा बांचाव रेगे अबोवाक जियान • होड़ काथा डिजिटल सुइट (Hor Katha Suite)',
      width / 2,
      730
    );
  };

  const handleDownloadCertificate = () => {
    generateCertificate();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `santali-family-certificate-${selectedClan.id}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950 via-stone-900 to-amber-900 text-white p-6 sm:p-8 border border-amber-800/40 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-lg text-xs font-bold border border-amber-500/30">
              <Shield className="w-3.5 h-3.5" />
              <span>पारिस, खूंट व कुलदेवता अभिलेख</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              संताली वंशावली व कुलदेवता पारिवारिक डायरी
            </h1>
            <p className="text-amber-200/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              १२ पवित्र पारिस (गोत्रों), उनके टोटेम, उप-गोत्रों (खूंट) और कुल-देवताओं का इतिहास। अपने परिवार का रिकॉर्ड दर्ज करें और व्यक्तिगत पारिवारिक धरोहर प्रमाण-पत्र प्राप्त करें।
            </p>
          </div>

          <div className="flex items-center gap-2 bg-stone-900/80 p-1.5 rounded-2xl border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab('clans')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'clans'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              🏛️ १२ पारिस गोत्र
            </button>
            <button
              onClick={() => {
                setActiveTab('certificate');
                setTimeout(generateCertificate, 150);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'certificate'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              📜 पारिवारिक साकाम
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: CLAN REPOSITORY */}
      {activeTab === 'clans' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Clans List (Left 4 Cols) */}
          <div className="lg:col-span-4 space-y-2.5">
            <div className="text-xs font-bold text-slate-500 px-1 mb-1">
              १२ पवित्र पारिस (Clan List):
            </div>
            {CLAN_DATABASE.map((clan) => {
              const isSelected = selectedClan.id === clan.id;
              return (
                <button
                  key={clan.id}
                  onClick={() => {
                    setSelectedClan(clan);
                    setUserKhunt(clan.subClansKhunt[0] || clan.nameDev);
                    speakWithFemaleVoice(clan.nameDev);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 text-amber-950 font-bold ring-2 ring-amber-400/20'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{clan.totemEmoji}</span>
                    <div>
                      <div className="font-bold text-sm text-slate-900">{clan.nameDev}</div>
                      <div className="text-[11px] text-slate-500">{clan.totemAnimal}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Clan Detail (Right 8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedClan.totemEmoji}</span>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">{selectedClan.nameDev}</h2>
                  <div className="text-xs text-amber-800 font-bold">{selectedClan.socialRole}</div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">
                    पवित्र टोटेम: {selectedClan.totemAnimal}
                  </div>
                </div>
              </div>

              <button
                onClick={() => speakWithFemaleVoice(selectedClan.nameDev)}
                className="p-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors cursor-pointer shrink-0"
                title="गोत्र नाम सुनें"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Historical Lore */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong className="text-slate-900 block mb-1">ऐतिहासिक व सामाजिक भूमिका:</strong>
              {selectedClan.historicalLore}
            </div>

            {/* Sacred Taboo */}
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-950 space-y-1">
              <strong className="text-rose-900 font-bold block flex items-center gap-1.5">
                <span>⚠️</span>
                <span>पवित्र गोत्र-निषेध (Sacred Totem Taboo):</span>
              </strong>
              <p className="leading-relaxed">{selectedClan.sacredTaboo}</p>
            </div>

            {/* Sub-clans (Khunt) List */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-700" />
                <span>प्रमुख उप-गोत्र (खूंट - Sub-clans):</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {selectedClan.subClansKhunt.map((khunt, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs text-amber-950 font-medium"
                  >
                    • {khunt}
                  </div>
                ))}
              </div>
            </div>

            {/* Orak Bonga House Deity */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between text-xs">
              <span className="font-bold text-amber-950">कुल-देवता (ओड़ाक बोंगा):</span>
              <span className="font-semibold text-amber-800">{selectedClan.orakBonga}</span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: FAMILY CERTIFICATE GENERATOR */}
      {activeTab === 'certificate' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Inputs (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-black text-sm text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-600" />
              <span>पारिवारिक जानकारी दर्ज करें:</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">गोत्र (पारिस चुनें):</label>
                <select
                  value={selectedClan.id}
                  onChange={(e) => {
                    const found = CLAN_DATABASE.find((c) => c.id === e.target.value);
                    if (found) {
                      setSelectedClan(found);
                      setUserKhunt(found.subClansKhunt[0] || found.nameDev);
                    }
                  }}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900"
                >
                  {CLAN_DATABASE.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nameDev} ({c.totemAnimal})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">उप-गोत्र (खूंट):</label>
                <input
                  type="text"
                  value={userKhunt}
                  onChange={(e) => setUserKhunt(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">मुखिया का नाम:</label>
                <input
                  type="text"
                  value={familyHead}
                  onChange={(e) => setFamilyHead(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">पिता का नाम:</label>
                <input
                  type="text"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">दादाजी का नाम:</label>
                <input
                  type="text"
                  value={grandfatherName}
                  onChange={(e) => setGrandfatherName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">पैतृक गांव (हातु व जिला):</label>
                <input
                  type="text"
                  value={villageName}
                  onChange={(e) => setVillageName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
                />
              </div>

              <button
                onClick={generateCertificate}
                className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition-all cursor-pointer shadow-md mt-2"
              >
                प्रमाण-पत्र अपडेट करें (Refresh Preview)
              </button>
            </div>
          </div>

          {/* Right Live Certificate Preview (7 Cols) */}
          <div className="lg:col-span-7 space-y-4 flex flex-col items-center">
            <div className="w-full overflow-x-auto rounded-3xl border border-slate-300 shadow-xl bg-white p-2">
              <canvas ref={canvasRef} className="w-full rounded-2xl" />
            </div>

            <button
              onClick={handleDownloadCertificate}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4 text-stone-950" />
              <span>पारिवारिक प्रमाण-पत्र डाउनलोड (PNG)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
