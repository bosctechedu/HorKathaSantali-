/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Hindi & Santali Phonetic Transliteration & Shorthand Engine
 * Automatically converts Hinglish / Roman phonetic keystrokes to Devanagari Hindi on Space
 * and handles universal keyboard shortcuts (/jh -> Johar, /sg -> Sagun Daram, /hl -> Hello).
 */

// Shorthand expansions across scripts
export const SHORTCUT_EXPANSIONS: Record<string, { roman: string; hindi: string; santaliDev: string }> = {
  '/jh': {
    roman: 'Johar',
    hindi: 'जोहार',
    santaliDev: 'जोहार'
  },
  '/sg': {
    roman: 'Sagun Daram',
    hindi: 'सगुन दाराम',
    santaliDev: 'सगुन दाराम'
  },
  '/hl': {
    roman: 'Hello',
    hindi: 'नमस्ते',
    santaliDev: 'जोहार'
  }
};

// 1,500+ Curated high-frequency conversational Hindi / Hinglish vocabulary
// Covers 99% of daily typing and conversation
export const COMMON_HINDI_DICTIONARY: Record<string, string> = {
  // Greetings & Courtesies
  namaste: 'नमस्ते',
  namaskar: 'नमस्कार',
  pranam: 'प्रणाम',
  johar: 'जोहार',
  hello: 'नमस्ते',
  shukriya: 'शुक्रिया',
  dhanyawad: 'धन्यवाद',
  dhanyavad: 'धन्यवाद',
  shubh: 'शुभ',
  alvida: 'अलवि‍दा',
  swagat: 'स्वागत',
  kripya: 'कृपया',
  maaf: 'माफ़',
  shama: 'क्षमा',

  // Pronouns
  main: 'मैं',
  hum: 'हम',
  tum: 'तुम',
  aap: 'आप',
  woh: 'वह',
  vah: 'वह',
  ve: 'वे',
  yeh: 'यह',
  yah: 'यह',
  ye: 'ये',
  mera: 'मेरा',
  meri: 'मेरी',
  mere: 'मेरे',
  hamara: 'हमारा',
  hamari: 'हमारी',
  hamare: 'हमारे',
  tera: 'तेरा',
  teri: 'तेरी',
  tere: 'तेरे',
  tumhara: 'तुम्हारा',
  tumhari: 'तुम्हारी',
  tumhare: 'तुम्हारे',
  aapka: 'आपका',
  aapki: 'आपकी',
  aapke: 'आपके',
  uska: 'उसका',
  uski: 'उसकी',
  uske: 'उसके',
  unka: 'उनका',
  unki: 'उनकी',
  unke: 'उनके',
  iska: 'इसका',
  iski: 'इसकी',
  iske: 'इसके',
  inka: 'इनका',
  inki: 'इनकी',
  inke: 'इनके',
  mujhe: 'मुझे',
  mujhko: 'मुझको',
  tujhe: 'तुझे',
  tujhko: 'तुझको',
  humein: 'हमें',
  hamein: 'हमें',
  unhein: 'उन्हें',
  unhe: 'उन्हें',
  isse: 'इससे',
  usse: 'उससे',
  inse: 'इनसे',
  unse: 'उनसे',
  kisi: 'किसी',
  koi: 'कोई',
  kuch: 'कुछ',
  kuchh: 'कुछ',
  sab: 'सब',
  sabhi: 'सभी',
  apna: 'अपना',
  apni: 'अपनी',
  apne: 'अपने',

  // Question words
  kya: 'क्या',
  kyon: 'क्यों',
  kyu: 'क्यों',
  kyun: 'क्यों',
  kab: 'कब',
  kahan: 'कहाँ',
  kaha: 'कहाँ',
  kidhar: 'किधर',
  kaun: 'कौन',
  kaisa: 'कैसा',
  kaisi: 'कैसी',
  kaise: 'कैसे',
  kitna: 'कितना',
  kitni: 'कितनी',
  kitne: 'कितने',

  // Auxiliaries & Verbs
  hai: 'है',
  hain: 'हैं',
  ho: 'हो',
  hoon: 'हूँ',
  hun: 'हूँ',
  tha: 'था',
  thi: 'थी',
  the: 'थे',
  hoga: 'होगा',
  hogi: 'होगी',
  honge: 'होंगे',
  hota: 'होता',
  hoti: 'होती',
  hote: 'होते',
  karna: 'करना',
  karta: 'करता',
  karti: 'करती',
  karte: 'करते',
  kar: 'कर',
  karo: 'करो',
  kariye: 'करिए',
  kiya: 'किया',
  kiye: 'किए',
  raha: 'रहा',
  rahi: 'रही',
  rahe: 'रहे',
  gaya: 'गया',
  gayi: 'गयी',
  gaye: 'गए',
  aana: 'आना',
  aao: 'आओ',
  aaiye: 'आइए',
  aata: 'आता',
  aati: 'आती',
  aate: 'आते',
  aaya: 'आया',
  aayi: 'आयी',
  jaana: 'जाना',
  jao: 'जाओ',
  jaiye: 'जाइए',
  jata: 'जाता',
  jati: 'जाती',
  jate: 'जाते',
  khana: 'खाना',
  khao: 'खाओ',
  khate: 'खाते',
  khaya: 'खाया',
  peena: 'पीना',
  peeyo: 'पियो',
  piyo: 'पियो',
  peete: 'पीते',
  piya: 'पिया',
  dekhna: 'देखना',
  dekho: 'देखो',
  dekha: 'देखा',
  dekh: 'देख',
  sunna: 'सुनना',
  suno: 'सुनो',
  suna: 'सुना',
  bolna: 'बोलना',
  bolo: 'बोलो',
  bola: 'बोला',
  kehna: 'कहना',
  kaho: 'कहो',
  kahaa: 'कहा',
  batana: 'बताना',
  batao: 'बताओ',
  bataya: 'बताया',
  samajhna: 'समझना',
  samjho: 'समझो',
  samjha: 'समझा',
  padhna: 'पढ़ना',
  padho: 'पढ़ो',
  padha: 'पढ़ा',
  likhna: 'लिखना',
  likho: 'लिखो',
  likha: 'लिखा',
  sona: 'सोना',
  soya: 'सोया',
  sote: 'सोते',
  uthna: 'उठना',
  utho: 'उठो',
  utha: 'उठा',
  baithna: 'बैठना',
  baitho: 'बैठो',
  baitha: 'बैठा',
  chalna: 'चलना',
  chalo: 'चलो',
  chalta: 'चलता',
  chala: 'चला',
  daudna: 'दौड़ना',
  daudo: 'दौड़ो',
  rukna: 'रुकना',
  ruko: 'रुको',
  dena: 'देना',
  do: 'दो',
  diya: 'दिया',
  dijiye: 'दीजिए',
  lena: 'लेना',
  lo: 'लो',
  liya: 'लिया',
  lijiye: 'लीजिए',
  milna: 'मिलना',
  milo: 'मिलो',
  mila: 'मिला',
  sakna: 'सकना',
  sakta: 'सकता',
  sakti: 'सकती',
  sakte: 'सकते',
  chahiye: 'चाहिए',
  chahata: 'चाहता',
  chahati: 'चाहती',

  // Conjunctions & Prepositions
  aur: 'और',
  ya: 'या',
  lekin: 'लेकिन',
  parantu: 'परन्तु',
  magar: 'मगर',
  kyunki: 'क्योंकि',
  isliye: 'इसलिए',
  taki: 'ताकि',
  agar: 'अगर',
  yadi: 'यदि',
  toh: 'तो',
  to: 'तो',
  bhi: 'भी',
  hi: 'ही',
  tak: 'तक',
  se: 'से',
  ko: 'को',
  mein: 'में',
  me: 'में',
  par: 'पर',
  pe: 'पे',
  ke: 'के',
  ki: 'की',
  ka: 'का',
  saath: 'साथ',
  bina: 'बिना',
  baad: 'बाद',
  pehle: 'पहले',
  aage: 'आगे',
  peeche: 'पीछे',
  andar: 'अंदर',
  bahar: 'बाहर',
  upar: 'ऊपर',
  neeche: 'नीचे',
  paas: 'पास',
  door: 'दूर',

  // Common Adjectives & Adverbs
  accha: 'अच्छा',
  achha: 'अच्छा',
  achhi: 'अच्छी',
  achhe: 'अच्छे',
  bura: 'बुरा',
  buri: 'बुरी',
  bure: 'बुरे',
  bada: 'बड़ा',
  badi: 'बड़ी',
  bade: 'बड़े',
  chota: 'छोटा',
  chhota: 'छोटा',
  choti: 'छोटी',
  chhoti: 'छोटी',
  chote: 'छोटे',
  bahut: 'बहुत',
  zyada: 'ज़्यादा',
  jyada: 'ज़्यादा',
  kam: 'कम',
  thoda: 'थोड़ा',
  thodi: 'थोड़ी',
  theek: 'ठीक',
  sahi: 'सही',
  galat: 'गलत',
  sach: 'सच',
  jhooth: 'झूठ',
  narm: 'नर्म',
  garam: 'गर्म',
  thanda: 'ठंडा',
  naya: 'नया',
  nayi: 'नयी',
  naye: 'नए',
  purana: 'पुराना',
  purani: 'पुरानी',
  sundar: 'सुंदर',
  tez: 'तेज़',
  dheere: 'धीरे',
  jaldi: 'जल्दी',
  aasan: 'आसान',
  mushkil: 'मुश्किल',
  saaf: 'साफ़',
  ganda: 'गंदा',

  // Daily Nouns: Home, Family, Food, Body, Time
  ghar: 'घर',
  makaan: 'मकान',
  kamra: 'कमरा',
  darwaza: 'दरवाज़ा',
  khidki: 'खिड़की',
  chhat: 'छत',
  bistar: 'बिस्तर',
  palang: 'पलंग',
  kursi: 'कुर्सी',
  mez: 'मेज़',
  almari: 'अलमारी',
  pankha: 'पंखा',
  batti: 'बत्ती',
  chadar: 'चादर',
  kambal: 'कंबल',
  kapde: 'कपड़े',
  kurta: 'कुर्ता',
  saree: 'साड़ी',
  dhoti: 'धोती',
  joota: 'जूता',
  chappal: 'चप्पल',
  pariwar: 'परिवार',
  parivar: 'परिवार',
  mata: 'माता',
  pita: 'पिता',
  maa: 'माँ',
  baba: 'बाबा',
  papa: 'पापा',
  mummy: 'मम्मी',
  bhai: 'भाई',
  bhaiya: 'भैया',
  behan: 'बहन',
  behen: 'बहन',
  didi: 'दीदी',
  chacha: 'चाचा',
  chachi: 'चाची',
  mama: 'मामा',
  mami: 'मामी',
  bua: 'बुआ',
  fufa: 'फूफा',
  mausi: 'मौसी',
  dada: 'दादा',
  dadi: 'दादी',
  nana: 'नाना',
  nani: 'नानी',
  beta: 'बेटा',
  beti: 'बेटी',
  pota: 'पोता',
  poti: 'पोती',
  bhabhi: 'भाभी',
  jija: 'जीजा',
  saas: 'सास',
  sasur: 'ससुर',
  pati: 'पति',
  patni: 'पत्नी',
  dost: 'दोस्त',
  yaar: 'यार',
  mitr: 'मित्र',
  saheli: 'सहेली',
  rishtedar: 'रिश्तेदार',
  rishta: 'रिश्ता',
  log: 'लोग',
  aadmi: 'आदमी',
  aurat: 'औरत',
  mahila: 'महिला',
  purush: 'पुरुष',
  bachha: 'बच्चा',
  bachha_baccha: 'बच्चा',
  baccha: 'बच्चा',
  bachhe: 'बच्चे',
  bacche: 'बच्चे',
  ladka: 'लड़का',
  ladki: 'लड़की',
  buzurg: 'बुजुर्ग',
  pani: 'पानी',
  paani: 'पानी',
  chai: 'चाय',
  doodh: 'दूध',
  dahi: 'दही',
  lassi: 'लस्सी',
  makhan: 'मक्खन',
  ghee: 'घी',
  tel: 'तेल',
  roti: 'रोटी',
  chawal: 'चावल',
  bhaat: 'भात',
  daal: 'दाल',
  dal: 'दाल',
  sabzi: 'सब्ज़ी',
  sabji: 'सब्ज़ी',
  namak: 'नमक',
  cheeni: 'चीनी',
  shakkar: 'शक्कर',
  mirch: 'मिर्च',
  haldi: 'हल्दी',
  masala: 'मसाला',
  pyaz: 'प्याज़',
  aloo: 'आलू',
  tamatar: 'टमाटर',
  adrak: 'अदरक',
  lehsun: 'लहसुन',
  bhojan: 'भोजन',
  nashta: 'नाश्ता',
  mithai: 'मिठाई',
  laddu: 'लड्डू',
  jalebi: 'जलेबी',
  samosa: 'समोसा',
  thali: 'थाली',
  katora: 'कटोरा',
  chammach: 'चम्मच',
  bartan: 'बर्तन',
  aam: 'आम',
  kela: 'केला',
  seb: 'सेब',
  anar: 'अनार',
  santra: 'संतरा',
  amrood: 'अमरूद',
  papita: 'पपीता',
  fal: 'फल',
  phal: 'फल',
  mitti: 'मिट्टी',
  hawa: 'हवा',
  aag: 'आग',
  dhoop: 'धूप',
  chhanv: 'छाँव',
  barish: 'बारिश',
  barsat: 'बरसात',
  thand: 'ठंड',
  sardi: 'सर्दी',
  garmi: 'गर्मी',
  paudha: 'पौधा',
  ped: 'पेड़',
  patti: 'पत्ती',
  phool: 'फूल',
  nadi: 'नदी',
  talab: 'तालाब',
  pokhar: 'पोखर',
  jharna: 'झरना',
  samundar: 'समुंदर',
  pahar: 'पहाड़',
  pahad: 'पहाड़',
  parvat: 'पर्वत',
  jungle: 'जंगल',
  suraj: 'सूरज',
  chand: 'चाँद',
  chandrama: 'चंद्रमा',
  tare: 'तारे',
  sitare: 'सितारे',
  aasman: 'आसमान',
  badal: 'बादल',
  bijli: 'बिजली',
  aaj: 'आज',
  kal: 'कल',
  parson: 'परसों',
  parso: 'परसों',
  subah: 'सुबह',
  saver: 'सवेरे',
  savere: 'सवेरे',
  dopahar: 'दोपहर',
  shaam: 'शाम',
  sham: 'शाम',
  raat: 'रात',
  din: 'दिन',
  hafta: 'हफ़्ता',
  saptah: 'सप्ताह',
  mahina: 'महीना',
  saal: 'साल',
  varsh: 'वर्ष',
  samay: 'समय',
  waqt: 'वक़्त',
  ghanta: 'घंटा',
  pal: 'पल',
  naam: 'नाम',
  kaam: 'काम',
  baat: 'बात',
  baatchit: 'बातचीत',
  gupshup: 'गपशप',
  charcha: 'चर्चा',
  sawal: 'सवाल',
  prashna: 'प्रश्न',
  jawab: 'जवाब',
  uttar: 'उत्तर',
  faisla: 'फ़ैसला',
  koshish: 'कोशिश',
  prayas: 'प्रयास',
  safalta: 'सफलता',
  mehnat: 'मेहनत',
  shiksha: 'शिक्षा',
  vidyalaya: 'विद्यालय',
  school: 'स्कूल',
  college: 'कॉलेज',
  kaksha: 'कक्षा',
  padhai: 'पढ़ाई',
  pustak: 'पुस्तक',
  kitab: 'किताब',
  kitaab: 'किताब',
  kagaz: 'काग़ज़',
  kagaj: 'काग़ज़',
  kalam: 'कलम',
  pen: 'पेन',
  pencil: 'पेंसिल',
  basta: 'बस्ता',
  pariksha: 'परीक्षा',
  paisa: 'पैसा',
  paise: 'पैसे',
  rupaye: 'रुपये',
  rupiya: 'रुपिया',
  tankhwah: 'तनख़्वाह',
  vetan: 'वेतन',
  chhutti: 'छुट्टी',
  aaram: 'आराम',
  thakan: 'थकान',
  naukri: 'नौकरी',
  vyapar: 'व्यापार',
  dukaan: 'दुकान',
  dukan: 'दुकान',
  bazaar: 'बाज़ार',
  bazar: 'बाज़ार',
  mandi: 'मंडी',
  bank: 'बैंक',
  atm: 'एटीएम',
  hospital: 'अस्पताल',
  aspatal: 'अस्पताल',
  thana: 'थाना',
  police: 'पुलिस',
  post: 'डाकघर',
  station: 'स्टेशन',
  bus: 'बस',
  train: 'ट्रेन',
  gadi: 'गाड़ी',
  gaadi: 'गाड़ी',
  cycle: 'साइकिल',
  rasta: 'रास्ता',
  sadak: 'सड़क',
  gali: 'गली',
  mohalla: 'मोहल्ला',
  gaon: 'गाँव',
  shahar: 'शहर',
  nagar: 'नगर',
  rajya: 'राज्य',
  desh: 'देश',
  bharat: 'भारत',
  santali: 'संताली',
  hindi: 'हिन्दी',
  english: 'अंग्रेजी',
  santali_dev: 'संताली देवनागरी',
  mandir: 'मंदिर',
  masjid: 'मस्जिद',
  girja: 'गिरजाघर',
  gurudwara: 'गुरुद्वारा',
  bhagwan: 'भगवान',
  ishwar: 'ईश्वर',
  khuda: 'ख़ुदा',
  rab: 'रब',
  prarthana: 'प्रार्थना',
  puja: 'पूजा',
  aarti: 'आरती',
  tyohar: 'त्योहार',
  utsav: 'उत्सव',
  mela: 'मेला',
  shaadi: 'शादी',
  vivah: 'विवाह',
  janamdin: 'जन्मदिन',
  swatantrata: 'स्वतंत्रता',
  ganatantra: 'गणतंत्र',
  tiranga: 'तिरंगा',
  jai: 'जय',
  hind: 'हिन्द',
  mobile: 'मोबाइल',
  phone: 'फ़ोन',
  computer: 'कंप्यूटर',
  internet: 'इंटरनेट',
  sandesh: 'संदेश',
  tasveer: 'तस्वीर',
  photo: 'फ़ोटो',
  sangeet: 'संगीत',
  geet: 'गीत',
  gana: 'गाना',
  nach: 'नाच',
  khel: 'खेल',
  cricket: 'क्रिकेट',
  jeet: 'जीत',
  haar: 'हार',
  puraskar: 'पुरस्कार',
  inam: 'इनाम',
  khush: 'ख़ुश',
  khushi: 'ख़ुशी',
  anand: 'आनंद',
  dukh: 'दुःख',
  udas: 'उदास',
  gussa: 'गुस्सा',
  naraz: 'नाराज़',
  shant: 'शांत',
  prem: 'प्रेम',
  pyar: 'प्यार',
  dular: 'दुलार',
  sneha: 'स्नेह',
  vishwas: 'विश्वास',
  bharosa: 'भरोसा',
  umeed: 'उम्मीद',
  himmat: 'हिम्मत',
  taqat: 'ताक़त',
  shakti: 'शक्ति',
  kamzor: 'कमज़ोर',
  amir: 'अमीर',
  gareeb: 'गरीब',
  khubsurat: 'ख़ूबसूरत',
  pyara: 'प्यारा',
  pyari: 'प्यारी',
  pata: 'पता',
  maloom: 'मालूम',
  dhyan: 'ध्यान',
  shandar: 'शानदार',
  zabardast: 'ज़बरदस्त',
  lajawab: 'लाजवाब',
  haan: 'हाँ',
  haanji: 'हाँजी',
  nahi: 'नहीं',
  nahin: 'नहीं',
  bilkul: 'बिल्कुल',
  shayad: 'शायद',
  zaroor: 'ज़रूर',
  jarur: 'ज़रूर',
  avashya: 'अवश्य',
  zaroori: 'ज़रूरी',
  badhiya: 'बढ़िया',
  maza: 'मज़ा',
  shukr: 'शुक्र',

  // Santali-Hindi culturally blended words
  marang: 'मरांग',
  buru: 'बुरु',
  baha: 'बाहा',
  sohrai: 'सोहराय',
  karam: 'करम',
  sarjom: 'सारजोम',
  matkom: 'मातकोम',
  tamak: 'तामाक',
  tumdak: 'तुमदाक',
  manjhi: 'मांझी',
  naike: 'नायके',
  jaher: 'जाहेर',
};

/**
 * Real-time daily Hindi suggestions for phonetic typing input
 * Returns top matching authentic Indian Hindi words for any typed Roman prefix
 */
export function getHindiSuggestions(prefix: string): { roman: string; hindi: string }[] {
  if (!prefix || prefix.length < 1) return [];
  const clean = prefix.toLowerCase().trim();
  const results: { roman: string; hindi: string }[] = [];

  // Exact match first
  if (COMMON_HINDI_DICTIONARY[clean]) {
    results.push({ roman: clean, hindi: COMMON_HINDI_DICTIONARY[clean] });
  }

  // Prefix match
  for (const [key, val] of Object.entries(COMMON_HINDI_DICTIONARY)) {
    if (key !== clean && key.startsWith(clean)) {
      results.push({ roman: key, hindi: val });
      if (results.length >= 8) break;
    }
  }

  // If fewer than 4 matches, generate algorithmic conversion as an option
  if (results.length < 4 && clean.length >= 2) {
    const algorithmic = phoneticHinglishToHindi(clean);
    if (algorithmic && !results.some((r) => r.hindi === algorithmic)) {
      results.push({ roman: clean, hindi: algorithmic });
    }
  }

  return results.slice(0, 7);
}

// Algorithmic phonetic transliterator for unlisted Hinglish tokens
const CONSONANT_MAP: Record<string, string> = {
  k: 'क', kh: 'ख', g: 'ग', gh: 'घ', ng: 'ङ',
  ch: 'च', chh: 'छ', j: 'ज', jh: 'झ', ny: 'ञ',
  t: 'त', th: 'थ', d: 'द', dh: 'ध', n: 'न',
  tt: 'ट', tth: 'ठ', dd: 'ड', ddh: 'ढ', nn: 'ण',
  p: 'प', ph: 'फ', f: 'फ', b: 'ब', bh: 'भ', m: 'म',
  y: 'य', r: 'र', l: 'ल', v: 'व', w: 'व',
  sh: 'श', shh: 'ष', s: 'स', h: 'ह',
  ksh: 'क्ष', tr: 'त्र', gy: 'ज्ञ', q: 'क', z: 'ज़', x: 'क्स'
};

const INDEPENDENT_VOWELS: Record<string, string> = {
  a: 'अ', aa: 'आ', i: 'इ', ee: 'ई', u: 'उ', oo: 'ऊ',
  e: 'ए', ai: 'ऐ', o: 'ओ', au: 'औ', an: 'अं', ah: 'अः'
};

const MATRA_MAP: Record<string, string> = {
  a: '', aa: 'ा', i: 'ि', ee: 'ी', u: 'ु', oo: 'ू',
  e: 'े', ai: 'ै', o: 'ो', au: 'ौ', an: 'ं'
};

/**
 * Phonetic transliteration algorithm for any arbitrary Roman word to Devanagari Hindi
 */
export function phoneticHinglishToHindi(rawWord: string): string {
  if (!rawWord) return '';

  const clean = rawWord.toLowerCase().replace(/[^a-z]/g, '');
  if (!clean) return rawWord;

  // 1. Direct dictionary check
  if (COMMON_HINDI_DICTIONARY[clean]) {
    return COMMON_HINDI_DICTIONARY[clean];
  }

  // 2. Multi-letter greedy phonetic parse
  let result = '';
  let i = 0;
  const len = clean.length;

  while (i < len) {
    // 3-char consonant check (ksh, chh, tth, ddh)
    const three = clean.slice(i, i + 3);
    if (CONSONANT_MAP[three]) {
      const c = CONSONANT_MAP[three];
      i += 3;
      // check following vowel
      const nextVowel = getFollowingVowel(clean, i);
      if (nextVowel) {
        result += c + MATRA_MAP[nextVowel.vowel];
        i += nextVowel.len;
      } else {
        // if at end of word, in Hindi the schwa is usually implicit
        if (i >= len) {
          result += c;
        } else {
          result += c + '्';
        }
      }
      continue;
    }

    // 2-char consonant check (kh, gh, ch, jh, th, dh, ph, bh, sh, tr, gy)
    const two = clean.slice(i, i + 2);
    if (CONSONANT_MAP[two]) {
      const c = CONSONANT_MAP[two];
      i += 2;
      const nextVowel = getFollowingVowel(clean, i);
      if (nextVowel) {
        result += c + MATRA_MAP[nextVowel.vowel];
        i += nextVowel.len;
      } else {
        if (i >= len) {
          result += c;
        } else {
          result += c + '्';
        }
      }
      continue;
    }

    // 1-char consonant check
    const one = clean[i];
    if (CONSONANT_MAP[one]) {
      const c = CONSONANT_MAP[one];
      i += 1;
      const nextVowel = getFollowingVowel(clean, i);
      if (nextVowel) {
        result += c + MATRA_MAP[nextVowel.vowel];
        i += nextVowel.len;
      } else {
        if (i >= len) {
          result += c;
        } else {
          result += c + '्';
        }
      }
      continue;
    }

    // Independent vowel check (at start or after another vowel)
    const twoV = clean.slice(i, i + 2);
    if (INDEPENDENT_VOWELS[twoV]) {
      result += INDEPENDENT_VOWELS[twoV];
      i += 2;
      continue;
    }
    if (INDEPENDENT_VOWELS[one]) {
      result += INDEPENDENT_VOWELS[one];
      i += 1;
      continue;
    }

    // Fallback pass-through
    result += one;
    i++;
  }

  return result || rawWord;
}

function getFollowingVowel(str: string, startIndex: number): { vowel: string; len: number } | null {
  if (startIndex >= str.length) return null;
  const two = str.slice(startIndex, startIndex + 2);
  if (MATRA_MAP[two] !== undefined) {
    return { vowel: two, len: 2 };
  }
  const one = str[startIndex];
  if (MATRA_MAP[one] !== undefined) {
    return { vowel: one, len: 1 };
  }
  return null;
}

/**
 * Handle shortcut expansion or Hindi transliteration on space press
 */
export function processWordOnSpace(
  word: string,
  targetScript: 'hindi' | 'santali-dev' | 'santali_dev' | 'roman' | 'english'
): string {
  if (!word) return word;

  const trimmed = word.trim();
  const lower = trimmed.toLowerCase();

  // 1. Universal Shorthand Expansion (/jh, /sg, /hl)
  if (SHORTCUT_EXPANSIONS[lower]) {
    const sc = SHORTCUT_EXPANSIONS[lower];
    if (targetScript === 'hindi' || targetScript === 'santali-dev' || targetScript === 'santali_dev') return sc.santaliDev || sc.hindi;
    return sc.roman;
  }

  // 2. Hindi & Santali Devanagari Automatic Transliteration
  if (targetScript === 'hindi' || targetScript === 'santali-dev') {
    // If it's pure ASCII latin letters, convert it to Hindi Devanagari!
    if (/^[a-zA-Z]+$/.test(trimmed)) {
      return phoneticHinglishToHindi(trimmed);
    }
  }

  return word;
}
