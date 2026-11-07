import { QuizItem, SantaliWord, SiteHeroConfig } from '../types';
import { OL_LETTERS, OL_DIGITS } from '../lib/olchiki';

export const DEFAULT_HERO_CONFIG: SiteHeroConfig = {
  welcomeTitle: 'जोहार! Hor Katha Suite में आपका स्वागत है',
  subTitle: 'संताली देवनागरी भाषा व संस्कृति मंच · BOSC Tech & Edu',
  motto: 'टाइप करें · सीखें · सुरक्षित करें · प्रचारित करें',
  quoteEnglish: 'Our Language, Our Identity, Our Pride',
  quoteSantali: 'आबो रोड़, आबो उपरुम, आबो गोरोब (Abo Ror, Abo Uprum, Abo Gorob)',
  notice: 'संताली देवनागरी डिजिटलीकरण मंच। 100% निःशुल्क और खुला सामुदायिक मंच।'
};

export const SANTALI_DEV_CHARS: any[] = [
  // Swar (Vowels)
  { char: 'अ', name: 'अ (Short a)', roman: 'a', sound: '/ə/', category: 'vowel', exampleWord: 'अतु', exampleWordRoman: 'Atu', exampleMeaning: 'गाँव (Village)' },
  { char: 'आ', name: 'आ (Long aa)', roman: 'aa', sound: '/ɑː/', category: 'vowel', exampleWord: 'आयो', exampleWordRoman: 'Ayo', exampleMeaning: 'माँ / माता (Mother)' },
  { char: 'इ', name: 'इ (Short i)', roman: 'i', sound: '/i/', category: 'vowel', exampleWord: 'इंज', exampleWordRoman: 'Iny', exampleMeaning: 'मैं (I / Myself)' },
  { char: 'ई', name: 'ई (Long ee)', roman: 'ee', sound: '/iː/', category: 'vowel', exampleWord: 'ईर', exampleWordRoman: 'Ir', exampleMeaning: 'फसल काटना (Harvest)' },
  { char: 'उ', name: 'उ (Short u)', roman: 'u', sound: '/u/', category: 'vowel', exampleWord: 'उप', exampleWordRoman: 'Up', exampleMeaning: 'केश / बाल (Hair)' },
  { char: 'ऊ', name: 'ऊ (Long oo)', roman: 'oo', sound: '/uː/', category: 'vowel', exampleWord: 'ऊत\'', exampleWordRoman: 'Ut’', exampleMeaning: 'निगलना / मशरूम (Swallow/Mushroom)' },
  { char: 'ए', name: 'ए (Vowel e)', roman: 'e', sound: '/e/', category: 'vowel', exampleWord: 'एनेच\'', exampleWordRoman: 'Enej’', exampleMeaning: 'नृत्य / खेल (Dance/Play)' },
  { char: 'ऐ', name: 'ऐ (Vowel ai)', roman: 'ai', sound: '/æ/', category: 'vowel', exampleWord: 'ऐरा', exampleWordRoman: 'Era', exampleMeaning: 'नारी / देवी (Woman/Goddess)' },
  { char: 'ओ', name: 'ओ (Vowel o)', roman: 'o', sound: '/o/', category: 'vowel', exampleWord: 'ओड़ाक', exampleWordRoman: 'Orak’', exampleMeaning: 'घर / भवन (House/Home)' },
  { char: 'औ', name: 'औ (Vowel au)', roman: 'au', sound: '/ɔː/', category: 'vowel', exampleWord: 'औत', exampleWordRoman: 'Ot', exampleMeaning: 'धरती / भूमि (Earth)' },

  // Vyanjan (Consonants)
  { char: 'क', name: 'क (Ka)', roman: 'k', sound: '/k/', category: 'consonant', exampleWord: 'कुल', exampleWordRoman: 'Kul', exampleMeaning: 'बाघ / शेर (Tiger)' },
  { char: 'ख', name: 'ख (Kha)', roman: 'kh', sound: '/kʰ/', category: 'consonant', exampleWord: 'खोबोर', exampleWordRoman: 'Khobor', exampleMeaning: 'समाचार (News)' },
  { char: 'ग', name: 'ग (Ga)', roman: 'g', sound: '/ɡ/', category: 'consonant', exampleWord: 'गाते', exampleWordRoman: 'Gate', exampleMeaning: 'सखा / मित्र (Friend)' },
  { char: 'घ', name: 'घ (Gha)', roman: 'gh', sound: '/ɡʱ/', category: 'consonant', exampleWord: 'घांस', exampleWordRoman: 'Ghas', exampleMeaning: 'घास / तृण (Grass)' },
  { char: 'ङ', name: 'ङ (Nga)', roman: 'ng', sound: '/ŋ/', category: 'consonant', exampleWord: 'आंग', exampleWordRoman: 'Ang', exampleMeaning: 'प्रभात / भोर (Dawn)' },
  { char: 'च', name: 'च (Cha)', roman: 'c / ch', sound: '/tʃ/', category: 'consonant', exampleWord: 'चांदो', exampleWordRoman: 'Chando', exampleMeaning: 'चंद्रमा / सूर्य (Moon/Sun)' },
  { char: 'छ', name: 'छ (Chha)', roman: 'chh', sound: '/tʃʰ/', category: 'consonant', exampleWord: 'छाता', exampleWordRoman: 'Chhata', exampleMeaning: 'छाता (Umbrella)' },
  { char: 'ज', name: 'ज (Ja)', roman: 'j', sound: '/dʒ/', category: 'consonant', exampleWord: 'जोहार', exampleWordRoman: 'Johar', exampleMeaning: 'नमस्कार / प्रणाम (Salute)' },
  { char: 'झ', name: 'झ (Jha)', roman: 'jh', sound: '/dʒʱ/', category: 'consonant', exampleWord: 'झारना', exampleWordRoman: 'Jharna', exampleMeaning: 'झरना (Stream)' },
  { char: 'ञ', name: 'ञ (Nya)', roman: 'ny', sound: '/ɲ/', category: 'consonant', exampleWord: 'ञेल', exampleWordRoman: 'Nyel', exampleMeaning: 'देखना (To see)' },
  { char: 'ट', name: 'ट (Tta)', roman: 'tt', sound: '/ʈ/', category: 'consonant', exampleWord: 'टामाक', exampleWordRoman: 'Tamak', exampleMeaning: 'नगाड़ा (Kettledrum)' },
  { char: 'ठ', name: 'ठ (Ttha)', roman: 'tth', sound: '/ʈʰ/', category: 'consonant', exampleWord: 'ठाकुर', exampleWordRoman: 'Thakur', exampleMeaning: 'सृष्टिकर्ता (Lord/Creator)' },
  { char: 'ड', name: 'ड (Dda)', roman: 'dd', sound: '/ɖ/', category: 'consonant', exampleWord: 'डाका', exampleWordRoman: 'Daka', exampleMeaning: 'भात / भोजन (Boiled Rice)' },
  { char: 'ढ', name: 'ढ (Ddha)', roman: 'ddh', sound: '/ɖʱ/', category: 'consonant', exampleWord: 'ढोल', exampleWordRoman: 'Dhol', exampleMeaning: 'ढोल वाद्य (Drum)' },
  { char: 'त', name: 'त (Ta)', roman: 't', sound: '/t/', category: 'consonant', exampleWord: 'तुमदाग', exampleWordRoman: 'Tumdak’', exampleMeaning: 'मांदर (Sacred Drum)' },
  { char: 'थ', name: 'थ (Tha)', roman: 'th', sound: '/tʰ/', category: 'consonant', exampleWord: 'थान', exampleWordRoman: 'Than', exampleMeaning: 'पवित्र स्थल (Sacred Grove)' },
  { char: 'द', name: 'द (Da)', roman: 'd', sound: '/d/', category: 'consonant', exampleWord: 'दाक', exampleWordRoman: 'Dak’', exampleMeaning: 'जल / पानी (Water/Rain)' },
  { char: 'ध', name: 'ध (Dha)', roman: 'dh', sound: '/dʱ/', category: 'consonant', exampleWord: 'धरती', exampleWordRoman: 'Dharti', exampleMeaning: 'पृथ्वी (Mother Earth)' },
  { char: 'न', name: 'न (Na)', roman: 'n', sound: '/n/', category: 'consonant', exampleWord: 'नायके', exampleWordRoman: 'Naike', exampleMeaning: 'गांव का पुजारी (Priest)' },
  { char: 'प', name: 'प (Pa)', roman: 'p', sound: '/p/', category: 'consonant', exampleWord: 'पारिस', exampleWordRoman: 'Paris', exampleMeaning: 'गोत्र / कुल (Totem Clan)' },
  { char: 'फ', name: 'फ (Pha)', roman: 'ph', sound: '/pʰ/', category: 'consonant', exampleWord: 'फुरग़ल', exampleWordRoman: 'Phurgal', exampleMeaning: 'स्वाधीनता / मुक्ति (Freedom)' },
  { char: 'ब', name: 'ब (Ba)', roman: 'b', sound: '/b/', category: 'consonant', exampleWord: 'बाबा', exampleWordRoman: 'Baba', exampleMeaning: 'पिताजी (Father)' },
  { char: 'भ', name: 'भ (Bha)', roman: 'bh', sound: '/bʱ/', category: 'consonant', exampleWord: 'भारत', exampleWordRoman: 'Bharat', exampleMeaning: 'हमारा देश (India)' },
  { char: 'म', name: 'म (Ma)', roman: 'm', sound: '/m/', category: 'consonant', exampleWord: 'मरांग बुरु', exampleWordRoman: 'Marang Buru', exampleMeaning: 'सर्वोच्च आराध्य देव (Supreme Deity)' },
  { char: 'य', name: 'य (Ya)', roman: 'y', sound: '/j/', category: 'consonant', exampleWord: 'युम', exampleWordRoman: 'Yum', exampleMeaning: 'पथ / रास्ता (Path)' },
  { char: 'र', name: 'र (Ra)', roman: 'r', sound: '/r/', category: 'consonant', exampleWord: 'रस्का', exampleWordRoman: 'Raska', exampleMeaning: 'आनंद / उल्लास (Joy/Festivity)' },
  { char: 'ल', name: 'ल (La)', roman: 'l', sound: '/l/', category: 'consonant', exampleWord: 'लहलहा', exampleWordRoman: 'Lahalaha', exampleMeaning: 'हरा-भरा (Lush green)' },
  { char: 'व', name: 'व (Wa/Va)', roman: 'w / v', sound: '/w/', category: 'consonant', exampleWord: 'वोंगा', exampleWordRoman: 'Bonga / Vonga', exampleMeaning: 'दैवीय शक्ति (Spirit/Deity)' },
  { char: 'स', name: 'स (Sa)', roman: 's', sound: '/s/', category: 'consonant', exampleWord: 'सोहराय', exampleWordRoman: 'Sohrai', exampleMeaning: 'महापर्व (Grand Harvest Festival)' },
  { char: 'ह', name: 'ह (Ha)', roman: 'h', sound: '/h/', category: 'consonant', exampleWord: 'होड़', exampleWordRoman: 'Hor', exampleMeaning: 'संताली मानव (Human / Santal)' },
  { char: 'ड़', name: 'ड़ (Rha)', roman: 'rh', sound: '/ɽ/', category: 'consonant', exampleWord: 'हुड़ु', exampleWordRoman: 'Huru', exampleMeaning: 'धान (Paddy Grain)' }
];

export const SANTALI_DICTIONARY: SantaliWord[] = [
  // 1. RELATIONS ( / नाते-रिश्ते)
  {
    id: 'rel_1',
    wordRoman: 'Aba / Baba',
    wordDevanagari: 'आपा / बाबा',
    phonetic: '/ɑːbɑː/',
    partOfSpeech: 'Noun (Kinship)',
    meaningHindi: 'पिताजी, पिता, जनक',
    meaningEnglish: 'Father, Dad (respected male parent)',
    exampleSantali: 'Inren baba do adi dularia hor.',
    exampleEnglish: 'My father is a very loving person.',
    exampleHindi: 'मेरे पिताजी बहुत स्नेहशील इंसान हैं।',
    category: 'relation'
  },
  {
    id: 'rel_2',
    wordRoman: 'Ayo / Enga',
    wordDevanagari: 'आयो / एंगा',
    phonetic: '/ɑːjɒ/',
    partOfSpeech: 'Noun (Kinship)',
    meaningHindi: 'माताजी, माँ, जननी',
    meaningEnglish: 'Mother, Mom (maternal parent)',
    exampleSantali: 'Ayo do orak re daka isin kanaye.',
    exampleEnglish: 'Mother is cooking rice in the house.',
    exampleHindi: 'माँ घर में खाना बना रही हैं।',
    category: 'relation'
  },
  {
    id: 'rel_3',
    wordRoman: 'Dada',
    wordDevanagari: 'दादा',
    phonetic: '/dɑːdɑː/',
    partOfSpeech: 'Noun (Kinship)',
    meaningHindi: 'बड़ा भाई, अग्रज',
    meaningEnglish: 'Elder Brother',
    exampleSantali: 'Dada do ranchi re ol-parhao kanai.',
    exampleEnglish: 'Elder brother is studying in Ranchi.',
    exampleHindi: 'बड़े भैया राँची में पढ़ाई कर रहे हैं।',
    category: 'relation'
  },
  {
    id: 'rel_4',
    wordRoman: 'Dai',
    wordDevanagari: 'दई',
    phonetic: '/dɑːiː/',
    partOfSpeech: 'Noun (Kinship)',
    meaningHindi: 'बड़ी बहन, दीदी',
    meaningEnglish: 'Elder Sister',
    exampleSantali: 'Dai do baha porob re enej enej kanai.',
    exampleEnglish: 'Elder sister is dancing in the Baha festival.',
    exampleHindi: 'बड़ी दीदी बाहा पर्व में नाच रही हैं।',
    category: 'relation'
  },
  {
    id: 'rel_5',
    wordRoman: 'Boko Kora',
    wordDevanagari: 'बोको कोड़ा',
    phonetic: '/bɒkɒ kɒɽɑː/',
    partOfSpeech: 'Noun (Kinship)',
    meaningHindi: 'छोटा भाई, अनुज',
    meaningEnglish: 'Younger Brother',
    exampleSantali: 'Inren boko kora do guti eneja.',
    exampleEnglish: 'My younger brother plays marbles.',
    exampleHindi: 'मेरा छोटा भाई कंचे खेलता है।',
    category: 'relation'
  },
  {
    id: 'rel_6',
    wordRoman: 'Marangba',
    wordDevanagari: 'मरांगबा',
    phonetic: '/mɑːrɑːŋbɑː/',
    partOfSpeech: 'Noun (Kinship)',
    meaningHindi: 'ताऊ, बड़े पिताजी (पिता के बड़े भाई)',
    meaningEnglish: 'Elder Uncle (father\'s elder brother)',
    exampleSantali: 'Marangba do marang dare latare durup kanai.',
    exampleEnglish: 'Elder uncle is sitting under the big tree.',
    exampleHindi: 'बड़े पिताजी बड़े पेड़ के नीचे बैठे हैं।',
    category: 'relation'
  },
  {
    id: 'rel_7',
    wordRoman: 'Hatom',
    wordDevanagari: 'हातोम',
    phonetic: '/hɑːtɒm/',
    partOfSpeech: 'Noun (Kinship)',
    meaningHindi: 'बुआ, फूफी (पिता की बहन)',
    meaningEnglish: 'Paternal Aunt (father\'s sister)',
    exampleSantali: 'Hatom do disom khon hijuk kanae.',
    exampleEnglish: 'Aunt is coming from the native village.',
    exampleHindi: 'बुआ गाँव से आ रही हैं।',
    category: 'relation'
  },
  {
    id: 'rel_8',
    wordRoman: 'Goya / Gate',
    wordDevanagari: 'गोया / गाते',
    phonetic: '/ɡɒjɑː/',
    partOfSpeech: 'Noun',
    meaningHindi: 'मित्र, सखा, साथी, दोस्त',
    meaningEnglish: 'Friend, Companion, Pal',
    exampleSantali: 'Am do inren adi juri gate.',
    exampleEnglish: 'You are my closest dear friend.',
    exampleHindi: 'तुम मेरे बहुत पक्के दोस्त हो।',
    category: 'relation'
  },
  {
    id: 'rel_9',
    wordRoman: 'Pera',
    wordDevanagari: 'पेड़ा',
    phonetic: '/peɪɽɑː/',
    partOfSpeech: 'Noun',
    meaningHindi: 'अतिथि, मेहमान, रिश्तेदार',
    meaningEnglish: 'Guest, Relative, Kinsman',
    exampleSantali: 'Orak te pera ko hej akana.',
    exampleEnglish: 'Guests and relatives have arrived at our home.',
    exampleHindi: 'घर पर मेहमान व रिश्तेदार आए हैं।',
    category: 'relation'
  },

  // 2. FRUITS ( / फल)
  {
    id: 'frt_1',
    wordRoman: 'Ul',
    wordDevanagari: 'उल',
    phonetic: '/uːl/',
    partOfSpeech: 'Noun (Fruit)',
    meaningHindi: 'आम (फलों का राजा)',
    meaningEnglish: 'Mango (sweet tropical fruit)',
    exampleSantali: 'Ul jo do adi hetem gea.',
    exampleEnglish: 'Mango fruit is remarkably sweet.',
    exampleHindi: 'आम का फल बहुत मीठा होता है।',
    category: 'fruit'
  },
  {
    id: 'frt_2',
    wordRoman: 'Kanthar',
    wordDevanagari: 'कांथाड़',
    phonetic: '/kɑːnthɑːɽ/',
    partOfSpeech: 'Noun (Fruit)',
    meaningHindi: 'कटहल',
    meaningEnglish: 'Jackfruit',
    exampleSantali: 'Kanthar utu do adi sibila.',
    exampleEnglish: 'Jackfruit curry tastes delicious.',
    exampleHindi: 'कटहल की सब्जी बहुत स्वादिष्ट होती है।',
    category: 'fruit'
  },
  {
    id: 'frt_3',
    wordRoman: 'Matkom jo',
    wordDevanagari: 'मातकोम जो',
    phonetic: '/mɑːtkɒm dʒɒ/',
    partOfSpeech: 'Noun (Fruit)',
    meaningHindi: 'महुआ का फल, कोचड़ा',
    meaningEnglish: 'Mahua fruit / seed berry',
    exampleSantali: 'Matkom jo re sunum oloka.',
    exampleEnglish: 'Oil is extracted from Mahua fruit seeds.',
    exampleHindi: 'महुआ के फल (कोचड़ा) से तेल निकलता है।',
    category: 'fruit'
  },
  {
    id: 'frt_4',
    wordRoman: 'Tarop',
    wordDevanagari: 'तारोप',
    phonetic: '/tɑːrɒp/',
    partOfSpeech: 'Noun (Fruit)',
    meaningHindi: 'चिरौंजी फल, पियाल',
    meaningEnglish: 'Buchanania lanzan fruit (Chironji)',
    exampleSantali: 'Bir re tarop bili jom kana ko.',
    exampleEnglish: 'People gather and eat ripe Chironji in forest.',
    exampleHindi: 'जंगल में लोग पकी हुई चिरौंजी खाते हैं।',
    category: 'fruit'
  },
  {
    id: 'frt_5',
    wordRoman: 'Jojo',
    wordDevanagari: 'जोजो',
    phonetic: '/dʒɒdʒɒ/',
    partOfSpeech: 'Noun (Fruit)',
    meaningHindi: 'इमली',
    meaningEnglish: 'Tamarind',
    exampleSantali: 'Jojo do jojo ge soa.',
    exampleEnglish: 'Tamarind tastes tangily sour.',
    exampleHindi: 'इमली खट्टी होती है।',
    category: 'fruit'
  },
  {
    id: 'frt_6',
    wordRoman: 'Bel',
    wordDevanagari: 'बेल',
    phonetic: '/beɪl/',
    partOfSpeech: 'Noun (Fruit)',
    meaningHindi: 'बेल फल, श्रीफल',
    meaningEnglish: 'Wood Apple / Bael fruit',
    exampleSantali: 'Bel sarbat do hotom riar dohoia.',
    exampleEnglish: 'Bael drink keeps the body cool in summer.',
    exampleHindi: 'बेल का शरबत शरीर को ठंडा रखता है।',
    category: 'fruit'
  },
  {
    id: 'frt_7',
    wordRoman: 'Kud',
    wordDevanagari: 'कुद',
    phonetic: '/kuːd/',
    partOfSpeech: 'Noun (Fruit)',
    meaningHindi: 'जामुन',
    meaningEnglish: 'Blackberry, Jamun fruit',
    exampleSantali: 'Kud bili do hende rong gea.',
    exampleEnglish: 'Ripe Jamun berries are deep purple-black.',
    exampleHindi: 'पका जामुन काले रंग का होता है।',
    category: 'fruit'
  },
  {
    id: 'frt_8',
    wordRoman: 'Kend',
    wordDevanagari: 'केंद',
    phonetic: '/keɪnd/',
    partOfSpeech: 'Noun (Fruit)',
    meaningHindi: 'केंदू फल, तेंदू',
    meaningEnglish: 'Ebony fruit, Tendu berry',
    exampleSantali: 'Kend jo do bir hor ko dular-a.',
    exampleEnglish: 'Forest dwellers adore the sweet Kendu fruit.',
    exampleHindi: 'वनवासी तेंदू फल को बड़े चाव से खाते हैं।',
    category: 'fruit'
  },

  // 3. ANIMALS & BIRDS (-   / पशु-पक्षी)
  {
    id: 'anm_1',
    wordRoman: 'Kul',
    wordDevanagari: 'कुल',
    phonetic: '/kuːl/',
    partOfSpeech: 'Noun (Fauna)',
    meaningHindi: 'बाघ, वनराज',
    meaningEnglish: 'Tiger (forest apex predator)',
    exampleSantali: 'Bir re kul do marang saopab.',
    exampleEnglish: 'The tiger reigns magnificent in the jungle.',
    exampleHindi: 'जंगल में बाघ का बड़ा रसूख होता है।',
    category: 'animal'
  },
  {
    id: 'anm_2',
    wordRoman: 'Hati',
    wordDevanagari: 'हाती',
    phonetic: '/hɑːtiː/',
    partOfSpeech: 'Noun (Fauna)',
    meaningHindi: 'हाथी, गजराज',
    meaningEnglish: 'Elephant',
    exampleSantali: 'Hati dal do bir parom calak kanae.',
    exampleEnglish: 'A herd of elephants is passing through the woods.',
    exampleHindi: 'हाथियों का झुंड जंगल पार कर रहा है।',
    category: 'animal'
  },
  {
    id: 'anm_3',
    wordRoman: 'Sadom',
    wordDevanagari: 'सादोम',
    phonetic: '/sɑːdɒm/',
    partOfSpeech: 'Noun (Fauna)',
    meaningHindi: 'घोड़ा, अश्व',
    meaningEnglish: 'Horse',
    exampleSantali: 'Sadom do calte nir darea.',
    exampleEnglish: 'A horse gallops swiftly across plains.',
    exampleHindi: 'घोड़ा तेजी से दौड़ सकता है।',
    category: 'animal'
  },
  {
    id: 'anm_4',
    wordRoman: 'Sim',
    wordDevanagari: 'सीम',
    phonetic: '/siːm/',
    partOfSpeech: 'Noun (Avian)',
    meaningHindi: 'मुर्गा, मुर्गी, कुक्कुट',
    meaningEnglish: 'Fowl, Rooster, Chicken',
    exampleSantali: 'Sandi sim do setah re raga.',
    exampleEnglish: 'The rooster crows early at dawn.',
    exampleHindi: 'मुर्गा सुबह बांग देता है।',
    category: 'animal'
  },
  {
    id: 'anm_5',
    wordRoman: 'Potam',
    wordDevanagari: 'पोताम',
    phonetic: '/pɒtɑːm/',
    partOfSpeech: 'Noun (Avian)',
    meaningHindi: 'कबूतर, पंडुक पक्षी',
    meaningEnglish: 'Dove, Pigeon',
    exampleSantali: 'Potam chenre do dare re tuka menaga.',
    exampleEnglish: 'The dove has a nest in the tree.',
    exampleHindi: 'कबूतर का घोंसला पेड़ पर है।',
    category: 'animal'
  },
  {
    id: 'anm_6',
    wordRoman: 'Miru',
    wordDevanagari: 'मीरु',
    phonetic: '/miːruː/',
    partOfSpeech: 'Noun (Avian)',
    meaningHindi: 'तोता, शुक',
    meaningEnglish: 'Parrot',
    exampleSantali: 'Miru chenre do ror e sena.',
    exampleEnglish: 'The parrot learns to imitate speech.',
    exampleHindi: 'तोता बोलना सीखता है।',
    category: 'animal'
  },

  // 4. FOOD & GRAINS (-   / खान-पान व अनाज)
  {
    id: 'food_1',
    wordRoman: 'Daka',
    wordDevanagari: 'दाका',
    phonetic: '/dɑːkɑː/',
    partOfSpeech: 'Noun (Food)',
    meaningHindi: 'भात, पकाया हुआ चावल, भोजन',
    meaningEnglish: 'Cooked rice, Staple meal',
    exampleSantali: 'Daka jom me, rengej kana.',
    exampleEnglish: 'Eat rice, you must be hungry.',
    exampleHindi: 'भात खा लो, भूख लगी होगी।',
    category: 'food'
  },
  {
    id: 'food_2',
    wordRoman: 'Utu',
    wordDevanagari: 'उतु',
    phonetic: '/uːtuː/',
    partOfSpeech: 'Noun (Food)',
    meaningHindi: 'सब्जी, तरकारी, सालन',
    meaningEnglish: 'Cooked vegetable curry',
    exampleSantali: 'Ara utu do adi pushtikor.',
    exampleEnglish: 'Leafy green vegetable curry is very nutritious.',
    exampleHindi: 'साग की सब्जी बहुत पौष्टिक होती है।',
    category: 'food'
  },
  {
    id: 'food_3',
    wordRoman: 'Chaole',
    wordDevanagari: 'चावले',
    phonetic: '/tʃɑːwleɪ/',
    partOfSpeech: 'Noun (Grain)',
    meaningHindi: 'चावल (कच्चा)',
    meaningEnglish: 'Uncooked rice grain',
    exampleSantali: 'Chaole khon daka hoeoa.',
    exampleEnglish: 'Rice grains are cooked into meals.',
    exampleHindi: 'चावल से भात पकता है।',
    category: 'food'
  },
  {
    id: 'food_4',
    wordRoman: 'Kode',
    wordDevanagari: 'कोडे',
    phonetic: '/kɒdeɪ/',
    partOfSpeech: 'Noun (Grain)',
    meaningHindi: 'मड़ुआ, रागी (पारंपरिक मोटा अनाज)',
    meaningEnglish: 'Finger millet / Ragi (nutritious tribal grain)',
    exampleSantali: 'Kode daka jom le khan shukti hoeoa.',
    exampleEnglish: 'Eating Ragi millet bestows endurance.',
    exampleHindi: 'मड़ुआ खाने से ताकत मिलती है।',
    category: 'food'
  },
  {
    id: 'food_5',
    wordRoman: 'Pitha',
    wordDevanagari: 'पीठा',
    phonetic: '/piːthɑː/',
    partOfSpeech: 'Noun (Food)',
    meaningHindi: 'पीठा, संताली पारंपरिक पकवान / रोटी',
    meaningEnglish: 'Pitha (traditional steamed or baked rice cake)',
    exampleSantali: 'Sohrai porob re pitha isina ko.',
    exampleEnglish: 'Pitha cakes are prepared during Sohrai festival.',
    exampleHindi: 'सोहराय पर्व में पीठा बनाया जाता है।',
    category: 'food'
  },
  {
    id: 'food_6',
    wordRoman: 'Toa',
    wordDevanagari: 'तोवा',
    phonetic: '/tɒwɑː/',
    partOfSpeech: 'Noun (Food)',
    meaningHindi: 'दूध, दुग्ध',
    meaningEnglish: 'Milk',
    exampleSantali: 'Gai toa do bes gea.',
    exampleEnglish: 'Cow milk is pure and good.',
    exampleHindi: 'गाय का दूध अच्छा होता है।',
    category: 'food'
  },

  // 5. BODY PARTS (  / शरीर के अंग)
  {
    id: 'bdy_1',
    wordRoman: 'Bohok',
    wordDevanagari: 'बोहोक',
    phonetic: '/bɒhɒk’/',
    partOfSpeech: 'Noun (Anatomy)',
    meaningHindi: 'सिर, मस्तक',
    meaningEnglish: 'Head, Skull',
    exampleSantali: 'Bohok re pagri bande me.',
    exampleEnglish: 'Tie the ceremonial turban on the head.',
    exampleHindi: 'सिर पर पगड़ी बाँधो।',
    category: 'body'
  },
  {
    id: 'bdy_2',
    wordRoman: 'Med',
    wordDevanagari: 'मेद',
    phonetic: '/meɪd/',
    partOfSpeech: 'Noun (Anatomy)',
    meaningHindi: 'आँख, नेत्र',
    meaningEnglish: 'Eye, Eyesight',
    exampleSantali: 'Med te disom nyel me.',
    exampleEnglish: 'See the magnificent world with eyes.',
    exampleHindi: 'आँखों से दुनिया देखो।',
    category: 'body'
  },
  {
    id: 'bdy_3',
    wordRoman: 'Lutur',
    wordDevanagari: 'लुत्तुर',
    phonetic: '/luːtuːr/',
    partOfSpeech: 'Noun (Anatomy)',
    meaningHindi: 'कान, कर्ण',
    meaningEnglish: 'Ear, Hearing organ',
    exampleSantali: 'Lutur te sereng anjom me.',
    exampleEnglish: 'Listen to the folk song with your ears.',
    exampleHindi: 'कानों से गीत सुनो।',
    category: 'body'
  },
  {
    id: 'bdy_4',
    wordRoman: 'Ti',
    wordDevanagari: 'ती',
    phonetic: '/tiː/',
    partOfSpeech: 'Noun (Anatomy)',
    meaningHindi: 'हाथ, कर, हथेली',
    meaningEnglish: 'Hand, Arm',
    exampleSantali: 'Ti te Santali Devanagari ol me.',
    exampleEnglish: 'Write Santali Devanagari letters with your hand.',
    exampleHindi: 'हाथ से संताली देवनागरी लिखो।',
    category: 'body'
  },
  {
    id: 'bdy_5',
    wordRoman: 'Janga',
    wordDevanagari: 'जांगा',
    phonetic: '/dʒɑːŋɡɑː/',
    partOfSpeech: 'Noun (Anatomy)',
    meaningHindi: 'पैर, पाँव, चरण',
    meaningEnglish: 'Leg, Foot',
    exampleSantali: 'Janga te enej tal re hej me.',
    exampleEnglish: 'Step into the dance rhythm with feet.',
    exampleHindi: 'पैरों से नृत्य की ताल मिलाओ।',
    category: 'body'
  },

  // 6. NATURE & ELEMENTS (   / प्रकृति व तत्व)
  {
    id: 'nat_1',
    wordRoman: 'Dare',
    wordDevanagari: 'दारे',
    phonetic: '/dɑːreɪ/',
    partOfSpeech: 'Noun',
    meaningHindi: 'पेड़, वृक्ष',
    meaningEnglish: 'Tree, Plant',
    exampleSantali: 'Dare sakam joto jioan.',
    exampleEnglish: 'Trees and foliage are alive with soul.',
    exampleHindi: 'पेड़-पौधे जीवन से परिपूर्ण हैं।',
    category: 'nature'
  },
  {
    id: 'nat_2',
    wordRoman: 'Sarjom',
    wordDevanagari: 'सारजोम',
    phonetic: '/sɑːrdʒɒm/',
    partOfSpeech: 'Noun',
    meaningHindi: 'साल वृक्ष (शाल), पवित्र संताल पेड़',
    meaningEnglish: 'Sal tree (Shorea robusta), sacred tree in Santhal heritage',
    exampleSantali: 'Baha porob re sarjom baha bonga-aye.',
    exampleEnglish: 'Sal blossoms are offered during Baha festival.',
    exampleHindi: 'बाहा पर्व में साल के फूल की पूजा की जाती है।',
    category: 'nature'
  },
  {
    id: 'nat_3',
    wordRoman: 'Dak',
    wordDevanagari: 'दाक',
    phonetic: '/dɑːkʼ/',
    partOfSpeech: 'Noun',
    meaningHindi: 'पानी, जल, वर्षा',
    meaningEnglish: 'Water, Rain',
    exampleSantali: 'Dak jorok kana.',
    exampleEnglish: 'Rain is falling / water is leaking.',
    exampleHindi: 'बारिश हो रही है।',
    category: 'nature'
  },
  {
    id: 'nat_4',
    wordRoman: 'Sengel',
    wordDevanagari: 'सेंगेल',
    phonetic: '/seɪŋɡeɪl/',
    partOfSpeech: 'Noun',
    meaningHindi: 'आग, अग्नि',
    meaningEnglish: 'Fire, Flame',
    exampleSantali: 'Sengel jol me.',
    exampleEnglish: 'Light the fire.',
    exampleHindi: 'आग जलाओ।',
    category: 'nature'
  },
  {
    id: 'nat_5',
    wordRoman: 'Hoy',
    wordDevanagari: 'होय',
    phonetic: '/hɔɪ/',
    partOfSpeech: 'Noun',
    meaningHindi: 'हवा, वायु, पवन',
    meaningEnglish: 'Air, Wind, Breeze',
    exampleSantali: 'Riar hoy hijuk kana.',
    exampleEnglish: 'Cool pleasant breeze is blowing.',
    exampleHindi: 'ठंडी हवा चल रही है।',
    category: 'nature'
  },

  // 7. HOUSEHOLD & TOOLS (  / घरेलू सामान व औजार)
  {
    id: 'hsh_1',
    wordRoman: 'Orak',
    wordDevanagari: 'ओड़ाक',
    phonetic: '/ɒɽɑːkʼ/',
    partOfSpeech: 'Noun',
    meaningHindi: 'घर, मकान, गृह',
    meaningEnglish: 'Home, House',
    exampleSantali: 'Abowak orak do bes menaga.',
    exampleEnglish: 'Our home is peaceful and good.',
    exampleHindi: 'हमारा घर अच्छा है।',
    category: 'household'
  },
  {
    id: 'hsh_2',
    wordRoman: 'Kapi',
    wordDevanagari: 'कापी',
    phonetic: '/kɑːpiː/',
    partOfSpeech: 'Noun (Tool)',
    meaningHindi: 'कुल्हाड़ी, कापी (पारंपरिक अस्त्र व औजार)',
    meaningEnglish: 'Axe / Battle-axe (traditional heritage implement)',
    exampleSantali: 'Kapi do hul khon dhorom sapab.',
    exampleEnglish: 'The axe is a symbol of defense and farming.',
    exampleHindi: 'कापी संतालों का पारंपरिक औजार है।',
    category: 'household'
  },
  {
    id: 'hsh_3',
    wordRoman: 'Aa-sar',
    wordDevanagari: 'आग-सार',
    phonetic: '/ɑːkʼ sɑːr/',
    partOfSpeech: 'Noun (Tool)',
    meaningHindi: 'धनुष-बाण',
    meaningEnglish: 'Bow and Arrow (indigenous heritage weapon)',
    exampleSantali: 'Aa-sar do bir jiwali seka lagid.',
    exampleEnglish: 'Bow and arrows represent indigenous bravery.',
    exampleHindi: 'धनुष-बाण वीरता का प्रतीक है।',
    category: 'household'
  },
  {
    id: 'hsh_4',
    wordRoman: 'Parkom',
    wordDevanagari: 'पारकोम',
    phonetic: '/pɑːrkɒm/',
    partOfSpeech: 'Noun (Furniture)',
    meaningHindi: 'खाट, चारपाई',
    meaningEnglish: 'Woven rope cot / Charpai',
    exampleSantali: 'Parkom re giti me.',
    exampleEnglish: 'Rest comfortably on the woven cot.',
    exampleHindi: 'खाट पर आराम से सो जाओ।',
    category: 'household'
  },

  // 8. CULTURE & FESTIVALS (   / संस्कृति व त्योहार)
  {
    id: 'clt_1',
    wordRoman: 'Baha Porob',
    wordDevanagari: 'बाहा परब',
    phonetic: '/bɑːhɑː pɒrɒb/',
    partOfSpeech: 'Proper Noun',
    meaningHindi: 'बाहा पर्व (संतालों का वसंत पुष्प उत्सव)',
    meaningEnglish: 'Baha festival (spring flower ceremony celebrating Sal blooms)',
    exampleSantali: 'Baha porob re nayke bonga sarjom baha arak-aye.',
    exampleEnglish: 'The priest distributes blessed Sal blossoms during Baha.',
    exampleHindi: 'बाहा पर्व में पुजारी साल के पवित्र फूल बाँटते हैं।',
    category: 'culture'
  },
  {
    id: 'clt_2',
    wordRoman: 'Sohrai',
    wordDevanagari: 'सोहराय',
    phonetic: '/sɒhrɑːj/',
    partOfSpeech: 'Proper Noun',
    meaningHindi: 'सोहराय (संतालों का सबसे बड़ा फसल एवं पशु-धन उत्सव)',
    meaningEnglish: 'Sohrai (harvest and livestock thanksgiving festival)',
    exampleSantali: 'Sohrai re danta enej hoeoa.',
    exampleEnglish: 'Danta martial dances are performed during Sohrai.',
    exampleHindi: 'सोहराय में दांता नृत्य होता है।',
    category: 'culture'
  },
  {
    id: 'clt_3',
    wordRoman: 'Tumdak & Tamak',
    wordDevanagari: 'तुमदाक और टामक',
    phonetic: '/tuːmdɑːkʼ/',
    partOfSpeech: 'Noun (Music)',
    meaningHindi: 'मांदर और नगाड़ा (संताली पारंपरिक ताल वाद्य)',
    meaningEnglish: 'Tumdak (clay drum) & Tamak (kettle drum)',
    exampleSantali: 'Tumdak Tamak ru raska ge soa.',
    exampleEnglish: 'The beats of Tumdak and Tamak sound exhilarating.',
    exampleHindi: 'मांदर और नगाड़े की थाप से उत्साह छा जाता है।',
    category: 'culture'
  },
  {
    id: 'clt_4',
    wordRoman: 'Jaher Than',
    wordDevanagari: 'जाहेर थान',
    phonetic: '/dʒɑːheɪr thɑːn/',
    partOfSpeech: 'Proper Noun',
    meaningHindi: 'पवित्र संताल पूज्य स्थल (साल वृक्षों का उपवन)',
    meaningEnglish: 'Sacred grove of Sal trees where village deities are worshiped',
    exampleSantali: 'Jaher Than re baha bonga hoeoa.',
    exampleEnglish: 'Baha puja is performed at Jaher Than sacred grove.',
    exampleHindi: 'जाहेर थान में बाहा पूजा होती है।',
    category: 'culture'
  },

  // 9. ACTIONS & VERBS (   / क्रिया व काम)
  {
    id: 'act_1',
    wordRoman: 'Ol',
    wordDevanagari: 'ओल',
    phonetic: '/ɒl/',
    partOfSpeech: 'Verb',
    meaningHindi: 'लिखना, आलेखन करना',
    meaningEnglish: 'To write, compose, script',
    exampleSantali: 'Santali Devanagari te puthi ol me.',
    exampleEnglish: 'Write the book in Santali Devanagari script.',
    exampleHindi: 'संताली देवनागरी में पुस्तक लिखो।',
    category: 'action'
  },
  {
    id: 'act_2',
    wordRoman: 'Parhao',
    wordDevanagari: 'पढ़ाव',
    phonetic: '/pɑːɽhɑːw/',
    partOfSpeech: 'Verb',
    meaningHindi: 'पढ़ना, अध्ययन करना',
    meaningEnglish: 'To read, study',
    exampleSantali: 'Gidra ko do iskul re parhao kanako.',
    exampleEnglish: 'Children are studying diligently in school.',
    exampleHindi: 'बच्चे स्कूल में पढ़ाई कर रहे हैं।',
    category: 'action'
  },
  {
    id: 'act_3',
    wordRoman: 'Enej',
    wordDevanagari: 'एनेज',
    phonetic: '/eɪneɪdʒ/',
    partOfSpeech: 'Verb / Noun',
    meaningHindi: 'नाचना, संताली पारंपरिक नृत्य',
    meaningEnglish: 'To dance, traditional Santal group dance',
    exampleSantali: 'Lagre enej re sabote enej me.',
    exampleEnglish: 'Join hands and dance in the Lagre circle.',
    exampleHindi: 'लागड़े नृत्य में हाथ पकड़कर नाचो।',
    category: 'action'
  },
  {
    id: 'act_4',
    wordRoman: 'Sereng',
    wordDevanagari: 'सेरेञ',
    phonetic: '/seɪreɪɲ/',
    partOfSpeech: 'Verb / Noun',
    meaningHindi: 'गाना, लोकगीत गाना',
    meaningEnglish: 'To sing, Santal folk song',
    exampleSantali: 'Baha sereng adi hetem.',
    exampleEnglish: 'The spring Baha songs are melodious.',
    exampleHindi: 'बाहा के गीत बहुत मधुर होते हैं।',
    category: 'action'
  },

  // 10. NUMBERS & TIME (   / संख्या व समय)
  {
    id: 'num_1',
    wordRoman: 'Mit',
    wordDevanagari: 'मिद',
    phonetic: '/miːtʼ/',
    partOfSpeech: 'Numeral (1)',
    meaningHindi: 'एक (संख्या १)',
    meaningEnglish: 'One (number 1, )',
    exampleSantali: 'Mit gota dharwa.',
    exampleEnglish: 'A single leafy branch.',
    exampleHindi: 'एक डाल।',
    category: 'number_time'
  },
  {
    id: 'num_2',
    wordRoman: 'Bar',
    wordDevanagari: 'बार',
    phonetic: '/bɑːr/',
    partOfSpeech: 'Numeral (2)',
    meaningHindi: 'दो (संख्या २)',
    meaningEnglish: 'Two (number 2, )',
    exampleSantali: 'Bar hor hej akana kin.',
    exampleEnglish: 'Two people have arrived.',
    exampleHindi: 'दो लोग आए हैं।',
    category: 'number_time'
  },
  {
    id: 'num_5',
    wordRoman: 'More',
    wordDevanagari: 'मोणे',
    phonetic: '/mɒ̃ɽeɪ/',
    partOfSpeech: 'Numeral (5)',
    meaningHindi: 'पाँच (संख्या ५)',
    meaningEnglish: 'Five (number 5, )',
    exampleSantali: 'More hor manjhi than re durup akana ko.',
    exampleEnglish: 'Five village elders are gathered at Manjhi Than.',
    exampleHindi: 'गाँव के पंच (मोणे होड़) मांझी थान में बैठे हैं।',
    category: 'number_time'
  },
  {
    id: 'num_time_1',
    wordRoman: 'Tikin',
    wordDevanagari: 'तिकिन',
    phonetic: '/tiːkiːn/',
    partOfSpeech: 'Noun (Time)',
    meaningHindi: 'दोपहर, मध्याह्न',
    meaningEnglish: 'Noon, Midday',
    exampleSantali: 'Tikin re situng jhaloka.',
    exampleEnglish: 'The sun shines brightly at noon.',
    exampleHindi: 'दोपहर में धूप तेज होती है।',
    category: 'number_time'
  },
  {
    id: 'num_time_2',
    wordRoman: 'Ayub',
    wordDevanagari: 'आयुब',
    phonetic: '/ɑːjuːb/',
    partOfSpeech: 'Noun (Time)',
    meaningHindi: 'शाम, संध्या',
    meaningEnglish: 'Evening, Twilight',
    exampleSantali: 'Ayub re orak te hej me.',
    exampleEnglish: 'Return home by evening.',
    exampleHindi: 'शाम को घर आ जाना।',
    category: 'number_time'
  },

  // 11. OTHERS ( / अन्य)
  {
    id: 'oth_1',
    wordRoman: 'Johar',
    wordDevanagari: 'जोहार',
    phonetic: '/dʒoʊhɑːr/',
    partOfSpeech: 'Interjection / Noun',
    meaningHindi: 'नमस्ते, प्रणाम, अभिवादन',
    meaningEnglish: 'Greeting, Salutation, Hello (traditional Santali respectful greeting)',
    exampleSantali: 'Johar, am celed menama?',
    exampleEnglish: 'Hello, how are you?',
    exampleHindi: 'नमस्ते, आप कैसे हैं?',
    category: 'others'
  },
  {
    id: 'oth_2',
    wordRoman: 'Sarhao',
    wordDevanagari: 'सारहाव',
    phonetic: '/sɑːrhɑːw/',
    partOfSpeech: 'Interjection / Noun',
    meaningHindi: 'धन्यवाद, आभार, साधुवाद',
    meaningEnglish: 'Thank you, Gratitude, Appreciation',
    exampleSantali: 'Amak gomke-en lagid sarhao.',
    exampleEnglish: 'Thank you for your generous help.',
    exampleHindi: 'आपकी सहायता के लिए धन्यवाद।',
    category: 'others'
  },
  {
    id: 'oth_3',
    wordRoman: 'Dular',
    wordDevanagari: 'दुलार',
    phonetic: '/duːlɑːr/',
    partOfSpeech: 'Noun / Verb',
    meaningHindi: 'प्रेम, स्नेह, प्यार',
    meaningEnglish: 'Love, Affection, Deep fondness',
    exampleSantali: 'Inge aming dularama.',
    exampleEnglish: 'I love and cherish you.',
    exampleHindi: 'मैं तुमसे प्यार करता हूँ।',
    category: 'others'
  },
  {
    id: 'oth_4',
    wordRoman: 'Sagun Daram',
    wordDevanagari: 'सागुनदाराम',
    phonetic: '/sɑːɡuːn dɑːrɑːm/',
    partOfSpeech: 'Interjection',
    meaningHindi: 'हार्दिक स्वागत, शुभागमन',
    meaningEnglish: 'Warm Welcome, Auspicious Reception',
    exampleSantali: 'Hor Katha Suite re sagun daram!',
    exampleEnglish: 'Warm welcome to Hor Katha Suite!',
    exampleHindi: 'होड़ कथा सुइट में आपका हार्दिक स्वागत है!',
    category: 'others'
  }
];


export const QUIZ_QUESTIONS: QuizItem[] = [
  {
    id: 'q1',
    question: 'संताली भाषा में पारंपरिक अभिवादन व सत्कार के लिए क्या कहा जाता है?',
    options: ['जोहार (Johar)', 'बाहा (Baha)', 'दुलार (Dular)', 'सारजोम (Sarjom)'],
    correctAnswer: 'जोहार (Johar)',
    explanation: '"जोहार" संताली संस्कृति का पवित्र व पारम्परिक अभिवादन शब्द है, जिसे दोनों हाथ जोड़कर सम्मान व्यक्त किया जाता है।'
  },
  {
    id: 'q2',
    question: 'संताली भाषा को देवनागरी में लिखते समय अवरोधित/हलंत ध्वनियों के लिए किस चिह्न का प्रयोग होता है?',
    options: ["अवरोधक चिह्न ( ' ) व हलंत (्)", "विसर्ग ( : )", "अनुस्वार ( ं )", "चंद्रबिंदु ( ँ )"],
    correctAnswer: "अवरोधक चिह्न ( ' ) व हलंत (्)",
    explanation: "संताली में क', च', त', प' जैसी अवरोधित (Glottalized) ध्वनियों को देवनागरी में स्पष्ट रूप से ऊर्ध्व अल्पविराम (') या हलंत से दर्शाया जाता है।"
  },
  {
    id: 'q3',
    question: 'संताल संस्कृति में किस पवित्र वृक्ष के फूलों से बाहा पर्व की पूजा-अर्चना की जाती है?',
    options: ['सारजोम / सखुआ (Sal tree)', 'नीम का वृक्ष', 'बरगद का वृक्ष', 'आम का वृक्ष'],
    correctAnswer: 'सारजोम / सखुआ (Sal tree)',
    explanation: 'सारजोम (साल/सखुआ) का वृक्ष संतालों के लिए अति पवित्र है, बाहा पर्व पर इसके ताजे फूलों से जाहेर थान में बोंगा की पूजा होती है।'
  },
  {
    id: 'q4',
    question: 'संताली शब्द "दुलार" (Dular) का हिंदी में क्या अर्थ है?',
    options: ['प्यार एवं स्नेह', 'पवित्र जल', 'हरा-भरा वृक्ष', 'अग्नि / आग'],
    correctAnswer: 'प्यार एवं स्नेह',
    explanation: '"दुलार" का अर्थ हृदय का असीम प्रेम, स्नेह और आत्मीयता होता है।'
  },
  {
    id: 'q5',
    question: 'संताली देवनागरी गिनती में संख्या ५ (पाँच) को क्या कहा जाता है?',
    options: ['मोड़े (Mõrẽ)', 'मिद (Mit)', 'पे (Pey)', 'आरे (Are)'],
    correctAnswer: 'मोड़े (Mõrẽ)',
    explanation: 'संताली देवनागरी में ५ को "मोड़े" (Mõrẽ) कहा जाता है।'
  }
];

// ---------------------------------------------------------------------------------------------
// Quiz-bank generators. They build extra practice questions ONLY from data that already lives in
// this repo (core dictionary above, Ol Chiki Unicode letters/digits in lib/olchiki, and the Santali
// numeral names used across the site) — no new Santali words are invented here. Option choice and
// answer position are deterministic so a generated question keeps the same id/text on every load.
// ---------------------------------------------------------------------------------------------
export interface GeneratedQuizQ {
  key: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

/** Santali numerals 1–10 (same names as the Learn module, soundboard and lexicon data). */
export const SANTALI_NUMERALS: { value: number; hindi: string; santali: string; roman: string }[] = [
  { value: 1, hindi: 'एक', santali: "मित'", roman: "Mit'" },
  { value: 2, hindi: 'दो', santali: 'बार', roman: 'Bar' },
  { value: 3, hindi: 'तीन', santali: 'पे', roman: 'Pe' },
  { value: 4, hindi: 'चार', santali: 'पुन', roman: 'Pun' },
  { value: 5, hindi: 'पाँच', santali: 'मोड़े', roman: 'More' },
  { value: 6, hindi: 'छह', santali: 'तुरुय', roman: 'Turui' },
  { value: 7, hindi: 'सात', santali: 'एयाय', roman: 'Eyay' },
  { value: 8, hindi: 'आठ', santali: 'इराल', roman: 'Iral' },
  { value: 9, hindi: 'नौ', santali: 'आरे', roman: 'Are' },
  { value: 10, hindi: 'दस', santali: 'गेल', roman: 'Gel' },
];

const DEV_DIGITS = '०१२३४५६७८९';
const toDevNum = (n: number) => String(n).split('').map((d) => DEV_DIGITS[+d] || d).join('');

/** 4 options: the answer at a deterministic slot plus 3 distinct distractors picked by stride. */
function mcq(all: string[], i: number): { options: string[]; answer: number } {
  const correct = all[i];
  const wrong: string[] = [];
  for (const step of [7, 13, 19, 3, 11, 5, 17, 1, 2, 23]) {
    const c = all[(i + step) % all.length];
    if (c && c !== correct && !wrong.includes(c)) wrong.push(c);
    if (wrong.length === 3) break;
  }
  let h = 0;
  for (const ch of correct) h = (h * 31 + ch.charCodeAt(0)) | 0;
  const slot = Math.abs(h + i) % 4;
  const options = [...wrong];
  options.splice(slot, 0, correct);
  return { options, answer: slot };
}

const cleanMeaning = (m: string) => m.split(/[,،]/)[0].trim();
const quizWords = () =>
  SANTALI_DICTIONARY.filter((w) => w.wordDevanagari && w.meaningHindi && w.category !== 'number_time');

export type GeneratedQuizKind =
  | 'numeral_name'   // संख्या → संताली नाम
  | 'ol_digit'       // ओल चिकी अंक → संख्या
  | 'ol_letter_name' // ओल चिकी अक्षर → नाम
  | 'ol_letter_char' // नाम → ओल चिकी अक्षर
  | 'dict_meaning'   // संताली शब्द → हिंदी अर्थ
  | 'dict_reverse';  // हिंदी अर्थ → संताली शब्द

export function buildGeneratedQuiz(kind: GeneratedQuizKind): GeneratedQuizQ[] {
  if (kind === 'numeral_name') {
    const all = SANTALI_NUMERALS.map((n) => `${n.santali} (${n.roman})`);
    return SANTALI_NUMERALS.map((n, i) => ({
      key: `num_${n.value}`,
      question: `संताली में संख्या ${toDevNum(n.value)} (${n.hindi}) को क्या कहते हैं?`,
      ...mcq(all, i),
      explanation: `संताली में ${toDevNum(n.value)} (${n.hindi}) को "${n.santali}" (${n.roman}) कहा जाता है।`,
    }));
  }
  if (kind === 'ol_digit') {
    const all = OL_DIGITS.map((d) => `${d.value}`);
    return OL_DIGITS.map((d, i) => ({
      key: `oldigit_${d.value}`,
      question: `ओल चिकी अंक "${d.char}" किस संख्या को दर्शाता है?`,
      ...mcq(all, i),
      explanation: `ओल चिकी का अंक "${d.char}" संख्या ${d.value} है। ओल चिकी में ० से ९ तक दस अंक-चिह्न होते हैं।`,
    }));
  }
  if (kind === 'ol_letter_name') {
    const all = OL_LETTERS.map((l) => `${l.roman} (${l.hindi})`);
    return OL_LETTERS.map((l, i) => ({
      key: `olname_${l.roman}`,
      question: `ओल चिकी अक्षर "${l.char}" का नाम क्या है?`,
      ...mcq(all, i),
      explanation: `ओल चिकी अक्षर "${l.char}" का नाम "${l.roman}" (${l.hindi}) है।`,
    }));
  }
  if (kind === 'ol_letter_char') {
    const all = OL_LETTERS.map((l) => l.char);
    return OL_LETTERS.map((l, i) => ({
      key: `olchar_${l.roman}`,
      question: `"${l.roman}" (${l.hindi}) नाम वाला ओल चिकी अक्षर कौन-सा है?`,
      ...mcq(all, i),
      explanation: `"${l.roman}" (${l.hindi}) अक्षर ओल चिकी में "${l.char}" लिखा जाता है।`,
    }));
  }
  const words = quizWords();
  if (kind === 'dict_meaning') {
    const all = words.map((w) => cleanMeaning(w.meaningHindi));
    return words.map((w, i) => ({
      key: `dictm_${w.id}`,
      question: `संताली शब्द "${w.wordDevanagari}" (${w.wordRoman}) का हिंदी अर्थ क्या है?`,
      ...mcq(all, i),
      explanation: `"${w.wordDevanagari}" (${w.wordRoman}) का अर्थ है: ${w.meaningHindi}।`,
    }));
  }
  const all = words.map((w) => `${w.wordDevanagari} (${w.wordRoman})`);
  return words.map((w, i) => ({
    key: `dictr_${w.id}`,
    question: `"${cleanMeaning(w.meaningHindi)}" के लिए संताली शब्द कौन-सा है?`,
    ...mcq(all, i),
    explanation: `"${cleanMeaning(w.meaningHindi)}" को संताली में "${w.wordDevanagari}" (${w.wordRoman}) कहते हैं।`,
  }));
}

/** Plain-object form used by QuizItem-shaped quizzes (correct answer stored as option text). */
export const toQuizItem = (q: GeneratedQuizQ, idPrefix: string): QuizItem => ({
  id: `${idPrefix}${q.key}`,
  question: q.question,
  options: q.options,
  correctAnswer: q.options[q.answer],
  explanation: q.explanation,
});

// Grow the default quiz bank to 30 questions with generated numeral / vocabulary questions
// (skipping topics the 5 hand-written questions above already ask: ५, जोहार, दुलार, सारजोम).
QUIZ_QUESTIONS.push(
  ...[
    ...buildGeneratedQuiz('numeral_name').filter((q) => q.key !== 'num_5'),
    ...buildGeneratedQuiz('dict_meaning').filter((q) => !['dictm_oth_1', 'dictm_oth_3', 'dictm_nat_2'].includes(q.key)).slice(0, 16),
  ].map((q) => toQuizItem(q, 'gen_')),
);

export interface TranslationMapping {
  santaliRoman: string;
  santaliDevanagari: string;
  hindi: string;
  english: string;
}

export const TRANSLATION_DATABASE: TranslationMapping[] = [
  {
    santaliRoman: 'johar',
    santaliDevanagari: 'जोहार',
    hindi: 'नमस्ते / प्रणाम / अभिवादन',
    english: 'Hello / Greetings / Welcome'
  },
  {
    santaliRoman: 'am celed menama',
    santaliDevanagari: 'आम चेलेद मेनामा',
    hindi: 'आप कैसे हैं?',
    english: 'How are you?'
  },
  {
    santaliRoman: 'in do bes ge menanya',
    santaliDevanagari: 'इञ दो बेस गे मेनांञा',
    hindi: 'मैं ठीक हूँ / मैं अच्छा हूँ।',
    english: 'I am doing well / I am fine.'
  },
  {
    santaliRoman: 'sarhao',
    santaliDevanagari: 'सारहाव',
    hindi: 'धन्यवाद / बहुत आभार',
    english: 'Thank you very much'
  },
  {
    santaliRoman: 'amak nyutum do ched',
    santaliDevanagari: 'आमाक ञुतुम दो चेद',
    hindi: 'आपका क्या नाम है?',
    english: 'What is your name?'
  },
  {
    santaliRoman: 'inyak nyutum do',
    santaliDevanagari: 'इञाक ञुतुम दो',
    hindi: 'मेरा नाम ... है',
    english: 'My name is...'
  },
  {
    santaliRoman: 'dak',
    santaliDevanagari: 'दाक',
    hindi: 'पानी / जल / वर्षा',
    english: 'Water / Rain'
  },
  {
    santaliRoman: 'dular',
    santaliDevanagari: 'दुलार',
    hindi: 'प्यार / स्नेह / प्रेम',
    english: 'Love / Affection'
  },
  {
    santaliRoman: 'orak',
    santaliDevanagari: 'ओड़ाक',
    hindi: 'घर / मकान',
    english: 'Home / House'
  },
  {
    santaliRoman: 'bonga',
    santaliDevanagari: 'बोंगा',
    hindi: 'भगवान / ईश्वर / देव आत्मा',
    english: 'God / Divine spirit'
  },
  {
    santaliRoman: 'dharti',
    santaliDevanagari: 'धर्ती',
    hindi: 'धरती / पृथ्वी / भूमंडल',
    english: 'Earth / World'
  },
  {
    santaliRoman: 'sagundaram',
    santaliDevanagari: 'सागुनदाराम',
    hindi: 'हार्дик स्वागत है',
    english: 'Warm Welcome'
  },
  {
    santaliRoman: 'sarjom',
    santaliDevanagari: 'सारजोम',
    hindi: 'साल का वृक्ष / सखुआ पेड़',
    english: 'Sal tree / Shorea robusta'
  },
  {
    santaliRoman: 'hor',
    santaliDevanagari: 'होड़',
    hindi: 'मनुष्य / व्यक्ति / संताल जन',
    english: 'Human being / Santal person'
  },
  {
    santaliRoman: 'disom',
    santaliDevanagari: 'दिसोम',
    hindi: 'देश / मातृभूमि',
    english: 'Country / Homeland'
  }
];
