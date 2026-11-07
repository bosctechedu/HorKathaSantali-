import React, { useState, useEffect, useMemo } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import { buildGeneratedQuiz } from '../data/santaliData';
import { SantaliDailyThoughtWidget } from './SantaliDailyThoughtWidget';
import { ReportMistakeButton } from './ReportMistakeButton';
import {
  GraduationCap,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  BookOpen,
  Trophy,
  ArrowRight,
  Edit2,
  Trash2,
  Plus,
  Save,
  X,
  ShieldCheck
} from 'lucide-react';

export interface DevCharItem {
  char: string;
  name: string;
  roman: string;
  sound: string;
  category: 'vowel' | 'consonant' | 'checked_modifier' | 'digit';
  exampleWord: string;
  exampleWordRoman: string;
  exampleMeaning: string;
}

const SANTALI_DEV_CHARS: DevCharItem[] = [
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
  { char: 'ड़', name: 'ड़ (Rha)', roman: 'rh', sound: '/ɽ/', category: 'consonant', exampleWord: 'हुड़ु', exampleWordRoman: 'Huru', exampleMeaning: 'धान (Paddy Grain)' },

  // Santali Checked Consonant Modifiers (अवरोधित व्यंजन)
  { char: 'क\'', name: 'अवरोधित क (Checked k\')', roman: 'k’', sound: '/k’/ glottal stop', category: 'checked_modifier', exampleWord: 'डाक\'', exampleWordRoman: 'Dak’', exampleMeaning: 'जल / पानी (Water)' },
  { char: 'च\'', name: 'अवरोधित च (Checked c\')', roman: 'c’ / j’', sound: '/c’/ palatal stop', category: 'checked_modifier', exampleWord: 'एनेच\'', exampleWordRoman: 'Enej’', exampleMeaning: 'नाचना / खेल (Dance)' },
  { char: 'त\'', name: 'अवरोधित त (Checked t\')', roman: 't’', sound: '/t’/ dental stop', category: 'checked_modifier', exampleWord: 'मित\'', exampleWordRoman: 'Mit’', exampleMeaning: 'एक (One)' },
  { char: 'प\'', name: 'अवरोधित प (Checked p\')', roman: 'p’', sound: '/p’/ labial stop', category: 'checked_modifier', exampleWord: 'चाप\'', exampleWordRoman: 'Chap’', exampleMeaning: 'दबाना (To press)' },
  { char: 'ऽ', name: 'अवग्रह (Avagraha)', roman: ':', sound: 'Vowel elongation', category: 'checked_modifier', exampleWord: 'दाऽक', exampleWordRoman: 'Da:k', exampleMeaning: 'दीर्घ स्वर ध्वनि' },
  { char: '़', name: 'नुक्ता (Nukta)', roman: '.', sound: 'Adivasi regional tone', category: 'checked_modifier', exampleWord: 'जा़ड़ी', exampleWordRoman: 'Jari', exampleMeaning: 'झमझम बारिश (Rain shower)' },

  // Numerals (अंक)
  { char: '०', name: 'शून्य (Sunyo)', roman: '0', sound: 'Zero', category: 'digit', exampleWord: 'शून्य', exampleWordRoman: 'Sunyo', exampleMeaning: '0 (शून्य)' },
  { char: '१', name: 'मित\' (Mit\')', roman: '1', sound: 'One', category: 'digit', exampleWord: 'मित\'', exampleWordRoman: 'Mit’', exampleMeaning: '1 (एक)' },
  { char: '२', name: 'बार (Bar)', roman: '2', sound: 'Two', category: 'digit', exampleWord: 'बार', exampleWordRoman: 'Bar', exampleMeaning: '2 (दो)' },
  { char: '३', name: 'पे (Pe)', roman: '3', sound: 'Three', category: 'digit', exampleWord: 'पे', exampleWordRoman: 'Pe', exampleMeaning: '3 (तीन)' },
  { char: '४', name: 'पुन (Pun)', roman: '4', sound: 'Four', category: 'digit', exampleWord: 'पुन', exampleWordRoman: 'Pun', exampleMeaning: '4 (चार)' },
  { char: '५', name: 'मोड़े (More)', roman: '5', sound: 'Five', category: 'digit', exampleWord: 'मोड़े', exampleWordRoman: 'More', exampleMeaning: '5 (पांच)' },
  { char: '६', name: 'तुरुय (Turui)', roman: '6', sound: 'Six', category: 'digit', exampleWord: 'तुरुय', exampleWordRoman: 'Turui', exampleMeaning: '6 (छह)' },
  { char: '७', name: 'एयाय (Eya)', roman: '7', sound: 'Seven', category: 'digit', exampleWord: 'एयाय', exampleWordRoman: 'Eya', exampleMeaning: '7 (सात)' },
  { char: '८', name: 'इराल (Iral)', roman: '8', sound: 'Eight', category: 'digit', exampleWord: 'इराल', exampleWordRoman: 'Iral', exampleMeaning: '8 (आठ)' },
  { char: '९', name: 'आरे (Are)', roman: '9', sound: 'Nine', category: 'digit', exampleWord: 'आरे', exampleWordRoman: 'Are', exampleMeaning: '9 (नौ)' },
  { char: '१०', name: 'गेल (Gel)', roman: '10', sound: 'Ten', category: 'digit', exampleWord: 'गेल', exampleWordRoman: 'Gel', exampleMeaning: '10 (दस)' }
];

const DEV_QUIZ_QUESTIONS = [
  {
    id: 'q1',
    question: 'संताली भाषा में "नमस्कार / अभिवादन" को क्या कहा जाता है?',
    options: ['जोहार (Johar)', 'सगुन (Sagun)', 'आतु (Atu)', 'दाका (Daka)'],
    correctAnswer: 'जोहार (Johar)',
    explanation: '"जोहार" संताल समाज का सार्वभौमिक पवित्र अभिवादन है।'
  },
  {
    id: 'q2',
    question: 'संताली में संख्या "१" (एक) को देवनागरी में क्या कहते हैं?',
    options: ['बार', 'मित\' (Mit\')', 'पे', 'पुन'],
    correctAnswer: 'मित\' (Mit\')',
    explanation: 'संताली में संख्या १ को "मित\'" कहा जाता है।'
  },
  {
    id: 'q3',
    question: 'संताली में "माताजी / माँ" को क्या कहते हैं?',
    options: ['आयो (Ayo)', 'बाबा (Baba)', 'हातोम (Hatom)', 'काका (Kaka)'],
    correctAnswer: 'आयो (Ayo)',
    explanation: 'माँ को संताली में "आयो" या "एंगा" कहा जाता है।'
  },
  {
    id: 'q4',
    question: 'संताली में पानी या जल को क्या कहते हैं?',
    options: ['दाक\' (Dak\')', 'हुड़ु (Huru)', 'कुल (Kul)', 'ओड़ाक (Orak\')'],
    correctAnswer: 'दाक\' (Dak\')',
    explanation: 'संताली में पानी/जल को "दाक\'" कहते हैं।'
  },
  {
    id: 'q5',
    question: 'संताली में "घर" को क्या कहा जाता है?',
    options: ['ओड़ाक (Orak\')', 'थान (Than)', 'अतु (Atu)', 'अखड़ा (Akhra)'],
    correctAnswer: 'ओड़ाक (Orak\')',
    explanation: 'संताली में घर/मकान को "ओड़ाक" कहा जाता है।'
  }
];

// 30+ प्रश्न: साइट के अपने शब्दकोश/अंक डेटा से बने (कोई नया संताली शब्द नहीं)
const LEARN_EXTRA_QUESTIONS = [
  ...buildGeneratedQuiz('numeral_name'),
  ...buildGeneratedQuiz('dict_meaning').slice(0, 20),
].map((g) => ({
  id: `lx_${g.key}`,
  question: g.question,
  options: g.options,
  correctAnswer: g.options[g.answer],
  explanation: g.explanation,
}));
const DEV_QUIZ_ALL = [...DEV_QUIZ_QUESTIONS, ...LEARN_EXTRA_QUESTIONS];

export const LearnModule: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isAdmin } = useAdmin();

  // Persisted state for Characters
  const [chars, setChars] = useState<DevCharItem[]>(() =>
    safeLoadFromStorage('hor_katha_learn_chars_v1', SANTALI_DEV_CHARS)
  );

  // Persisted state for Quiz Questions
  const [quizQuestions, setQuizQuestions] = useState(() => {
    const saved = safeLoadFromStorage('hor_katha_learn_quiz_v1', DEV_QUIZ_QUESTIONS);
    // एक बार: नए (30+) प्रश्न जोड़ें; admin के बदलाव/हटाए गए प्रश्न वैसे ही रहें
    if (safeLoadFromStorage('hor_katha_learn_quiz_merge30', false)) return saved;
    const ids = new Set(saved.map((q: { id: string }) => q.id));
    const merged = [...saved, ...LEARN_EXTRA_QUESTIONS.filter((q) => !ids.has(q.id))];
    safeSaveToStorage('hor_katha_learn_quiz_merge30', true);
    return merged;
  });

  useEffect(() => {
    safeSaveToStorage('hor_katha_learn_chars_v1', chars);
  }, [chars]);

  useEffect(() => {
    safeSaveToStorage('hor_katha_learn_quiz_v1', quizQuestions);
  }, [quizQuestions]);

  const [activeTab, setActiveTab] = useState<'vowels' | 'consonants' | 'modifiers' | 'digits' | 'quiz'>('vowels');
  const [selectedChar, setSelectedChar] = useState<DevCharItem>(chars[0] || SANTALI_DEV_CHARS[0]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Admin Char Modal State
  const [isCharModalOpen, setIsCharModalOpen] = useState(false);
  const [editingCharKey, setEditingCharKey] = useState<string | null>(null);
  const [charFormChar, setCharFormChar] = useState('');
  const [charFormName, setCharFormName] = useState('');
  const [charFormRoman, setCharFormRoman] = useState('');
  const [charFormSound, setCharFormSound] = useState('');
  const [charFormCategory, setCharFormCategory] = useState<'vowel' | 'consonant' | 'checked_modifier' | 'digit'>('vowel');
  const [charFormWord, setCharFormWord] = useState('');
  const [charFormWordRoman, setCharFormWordRoman] = useState('');
  const [charFormMeaning, setCharFormMeaning] = useState('');

  // Admin Quiz Modal State
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [editingQuizId, setEditingQuizId] = useState<string | null>(null);
  const [quizFormQuestion, setQuizFormQuestion] = useState('');
  const [quizFormOptions, setQuizFormOptions] = useState<string[]>(['', '', '', '']);
  const [quizFormCorrectIdx, setQuizFormCorrectIdx] = useState(0);
  const [quizFormExplanation, setQuizFormExplanation] = useState('');

  const handleSpeak = (text: string) => {
    speakWithFemaleVoice(text, { lang: 'hi-IN', rate: 0.85 });
  };

  // Char CRUD
  const handleOpenAddChar = () => {
    setEditingCharKey(null);
    setCharFormChar('');
    setCharFormName('');
    setCharFormRoman('');
    setCharFormSound('');
    const defaultCat =
      activeTab === 'consonants'
        ? 'consonant'
        : activeTab === 'modifiers'
        ? 'checked_modifier'
        : activeTab === 'digits'
        ? 'digit'
        : 'vowel';
    setCharFormCategory(defaultCat);
    setCharFormWord('');
    setCharFormWordRoman('');
    setCharFormMeaning('');
    setIsCharModalOpen(true);
  };

  const handleOpenEditChar = (c: DevCharItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingCharKey(c.char);
    setCharFormChar(c.char);
    setCharFormName(c.name);
    setCharFormRoman(c.roman);
    setCharFormSound(c.sound);
    setCharFormCategory(c.category);
    setCharFormWord(c.exampleWord);
    setCharFormWordRoman(c.exampleWordRoman);
    setCharFormMeaning(c.exampleMeaning);
    setIsCharModalOpen(true);
  };

  const handleDeleteChar = (charKey: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (chars.length <= 1) {
      alert('कम से कम १ वर्ण होना आवश्यक है!');
      return;
    }
    if (window.confirm(`क्या आप वर्ण "${charKey}" को हटाना चाहते हैं?`)) {
      const updated = chars.filter((c) => c.char !== charKey);
      setChars(updated);
      if (selectedChar.char === charKey) {
        setSelectedChar(updated[0]);
      }
    }
  };

  const handleSaveCharModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!charFormChar.trim() || !charFormWord.trim()) {
      alert('कृपया वर्ण और उदाहरण शब्द अवश्य भरें।');
      return;
    }

    const newCharItem: DevCharItem = {
      char: charFormChar.trim(),
      name: charFormName.trim() || `${charFormChar.trim()} (${charFormRoman.trim()})`,
      roman: charFormRoman.trim() || charFormChar.trim(),
      sound: charFormSound.trim() || `/${charFormChar.trim()}/`,
      category: charFormCategory,
      exampleWord: charFormWord.trim(),
      exampleWordRoman: charFormWordRoman.trim() || charFormWord.trim(),
      exampleMeaning: charFormMeaning.trim() || 'संताली शब्द'
    };

    if (editingCharKey !== null) {
      setChars((prev) =>
        prev.map((item) => (item.char === editingCharKey ? newCharItem : item))
      );
      if (selectedChar.char === editingCharKey) {
        setSelectedChar(newCharItem);
      }
    } else {
      setChars((prev) => [...prev, newCharItem]);
      setSelectedChar(newCharItem);
    }
    setIsCharModalOpen(false);
  };

  // Quiz CRUD
  const handleOpenAddQuiz = () => {
    setEditingQuizId(null);
    setQuizFormQuestion('');
    setQuizFormOptions(['', '', '', '']);
    setQuizFormCorrectIdx(0);
    setQuizFormExplanation('');
    setIsQuizModalOpen(true);
  };

  const handleOpenEditQuiz = (q: typeof DEV_QUIZ_QUESTIONS[0], e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingQuizId(q.id);
    setQuizFormQuestion(q.question);
    setQuizFormOptions([...q.options]);
    const cIdx = q.options.indexOf(q.correctAnswer);
    setQuizFormCorrectIdx(cIdx >= 0 ? cIdx : 0);
    setQuizFormExplanation(q.explanation);
    setIsQuizModalOpen(true);
  };

  const handleDeleteQuiz = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (quizQuestions.length <= 1) {
      alert('कम से कम १ क्विज़ प्रश्न होना आवश्यक है!');
      return;
    }
    if (window.confirm('क्या आप इस प्रश्नोत्तरी प्रश्न को हटाना चाहते हैं?')) {
      const updated = quizQuestions.filter((q) => q.id !== id);
      setQuizQuestions(updated);
      if (currentQuizIndex >= updated.length) {
        setCurrentQuizIndex(0);
      }
    }
  };

  const handleSaveQuizModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizFormQuestion.trim()) {
      alert('कृपया प्रश्न अवश्य लिखें।');
      return;
    }
    if (quizFormOptions.some((o) => !o.trim())) {
      alert('कृपया सभी ४ विकल्प अवश्य भरें।');
      return;
    }

    const chosenCorrectAnswer = quizFormOptions[quizFormCorrectIdx].trim();
    if (editingQuizId !== null) {
      setQuizQuestions((prev) =>
        prev.map((q) =>
          q.id === editingQuizId
            ? {
                ...q,
                question: quizFormQuestion.trim(),
                options: quizFormOptions.map((o) => o.trim()),
                correctAnswer: chosenCorrectAnswer,
                explanation: quizFormExplanation.trim()
              }
            : q
        )
      );
    } else {
      const newQ = {
        id: `q_${Date.now()}`,
        question: quizFormQuestion.trim(),
        options: quizFormOptions.map((o) => o.trim()),
        correctAnswer: chosenCorrectAnswer,
        explanation: quizFormExplanation.trim()
      };
      setQuizQuestions((prev) => [...prev, newQ]);
    }
    setIsQuizModalOpen(false);
  };

  const handleResetDefaults = () => {
    if (window.confirm('क्या आप वर्णमाला और प्रश्नोत्तरी को मूल डिफ़ॉल्ट पर रीसेट करना चाहते हैं?')) {
      setChars(SANTALI_DEV_CHARS);
      setQuizQuestions(DEV_QUIZ_ALL);
      setSelectedChar(SANTALI_DEV_CHARS[0]);
    }
  };

  // Options are shown in a shuffled order per question (answers are compared by text, so the order is free)
  // — many stored questions keep the right answer at A.
  const currentQuizQ = quizQuestions[currentQuizIndex];
  const shownQuizOptions = useMemo(() => {
    const opts = [...(currentQuizQ?.options || [])];
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return opts;
  }, [currentQuizQ]);

  const handleSelectQuizOption = (option: string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(option);
    const currentQ = quizQuestions[currentQuizIndex];
    if (currentQ && option === currentQ.correctAnswer) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    if (currentQuizIndex + 1 < quizQuestions.length) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  const displayedChars = chars.filter((c) => {
    if (activeTab === 'vowels') return c.category === 'vowel';
    if (activeTab === 'consonants') return c.category === 'consonant';
    if (activeTab === 'modifiers') return c.category === 'checked_modifier';
    if (activeTab === 'digits') return c.category === 'digit';
    return true;
  });

  return (
    <div className={`space-y-6 max-w-7xl mx-auto`}>
      {/* Daily Thought / Proverb Widget */}
      <SantaliDailyThoughtWidget />

      <div className={`bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden ${compact ? 'p-3' : 'p-6 sm:p-8'} space-y-6`}>
        {/* Top Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-emerald-600" />
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              संताली देवनागरी वर्णमाला व भाषा शिक्षण
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Santali in Devanagari
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            स्वर, व्यंजन, संताली विशिष्ट अवरोधित ध्वनियाँ (Checked Consonants), संख्याएं एवं ऑडियो उच्चारण।
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('vowels')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'vowels' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            स्वर (10)
          </button>
          <button
            onClick={() => setActiveTab('consonants')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'consonants' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            व्यंजन (33)
          </button>
          <button
            onClick={() => setActiveTab('modifiers')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'modifiers' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            अवरोधित ध्वनियाँ (क', च', त', प')
          </button>
          <button
            onClick={() => setActiveTab('digits')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'digits' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            अंक (०-१०)
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'quiz' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            प्रश्नोत्तरी ({quizQuestions.length})
          </button>
        </div>
      </div>

      {/* Admin Action Bar */}
      {isAdmin && (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <span className="text-xs font-black text-emerald-950 uppercase tracking-wide">
              प्रशासक नियंत्रण (Admin CMS) • वर्णमाला व भाषा शिक्षण
            </span>
            <span className="text-xs bg-emerald-200 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              कुल {chars.length} वर्ण • {quizQuestions.length} क्विज़ प्रश्न
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleOpenAddChar}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ नया वर्ण / ध्वनि जोड़ें</span>
            </button>
            <button
              onClick={handleOpenAddQuiz}
              className="inline-flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ नया क्विज़ प्रश्न जोड़ें</span>
            </button>
            <button
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              title="मूल वर्ण व क्विज़ पुनर्स्थापित करें"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>रीसेट</span>
            </button>
          </div>
        </div>
      )}

      {activeTab !== 'quiz' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Grid: Character Cards */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-3">
              {displayedChars.map((item) => {
                const isSelected = selectedChar.char === item.char;
                return (
                  <div key={item.char} className="relative group">
                    <button
                      onClick={() => {
                        setSelectedChar(item);
                        handleSpeak(`${item.char}, ${item.exampleWord}`);
                      }}
                      className={`w-full p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/70 shadow-sm scale-102 ring-2 ring-emerald-500/20'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-3xl sm:text-4xl font-black text-slate-900 group-hover:text-emerald-700">
                        {item.char}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500 mt-1.5">{item.roman}</span>
                      <span className="text-[10px] text-emerald-800 font-semibold truncate w-full mt-0.5">
                        {item.exampleWord}
                      </span>
                    </button>

                    {/* Admin Edit/Delete icons */}
                    {isAdmin && (
                      <div className="absolute top-1 right-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 rounded-lg shadow-sm p-0.5 border border-slate-200 z-10">
                        <button
                          onClick={(e) => handleOpenEditChar(item, e)}
                          className="p-1 rounded text-emerald-800 hover:bg-emerald-100 transition-colors"
                          title="वर्ण संपादित करें"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteChar(item.char, e)}
                          className="p-1 rounded text-rose-700 hover:bg-rose-100 transition-colors"
                          title="वर्ण हटाएं"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Character Deep Dossier */}
          <div className="lg:col-span-4 bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/30 rounded-3xl border border-emerald-200 p-6 space-y-5 shadow-xs">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                  अक्षर विवरण
                </span>
                <div className="text-6xl font-black text-slate-900 mt-2">
                  {selectedChar.char}
                </div>
                <p className="text-sm font-bold text-emerald-800 mt-1">{selectedChar.name}</p>
                <p className="text-xs text-slate-400 font-mono mt-0.5">रोमन: {selectedChar.roman} · ध्वनि: {selectedChar.sound}</p>
              </div>

              <div className="flex items-center gap-1.5">
                {isAdmin && (
                  <button
                    onClick={(e) => handleOpenEditChar(selectedChar, e)}
                    className="p-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors cursor-pointer"
                    title="इस वर्ण को संपादित करें"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => handleSpeak(`${selectedChar.char}. ${selectedChar.exampleWord}. ${selectedChar.exampleMeaning}`)}
                  className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all cursor-pointer hover:scale-105"
                  title="उच्चारण सुनें"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-100 space-y-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1 shadow-2xs">
                <span className="font-bold text-slate-500 uppercase text-[10px]">संताली उदाहरण शब्द:</span>
                <p className="text-lg font-black text-slate-900">{selectedChar.exampleWord}</p>
                <p className="text-xs font-semibold text-emerald-800">रोमन: {selectedChar.exampleWordRoman}</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1 shadow-2xs">
                <span className="font-bold text-slate-500 uppercase text-[10px]">हिंदी अर्थ:</span>
                <p className="text-sm font-bold text-slate-800">{selectedChar.exampleMeaning}</p>
              </div>

              <button
                onClick={() => handleSpeak(selectedChar.exampleWord)}
                className="w-full py-2.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>उदाहरण शब्द का उच्चारण सुनें</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* QUIZ MODE */
        <div className="max-w-xl mx-auto py-6">
          {!quizFinished ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>प्रश्न {currentQuizIndex + 1} / {quizQuestions.length}</span>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700">स्कोर: {quizScore}</span>
                  {isAdmin && quizQuestions[currentQuizIndex] && (
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        onClick={(e) => handleOpenEditQuiz(quizQuestions[currentQuizIndex], e)}
                        className="px-2 py-0.5 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-[10px] flex items-center gap-0.5"
                        title="यह प्रश्न सुधारें"
                      >
                        <Edit2 className="w-3 h-3" /> सुधारें
                      </button>
                      <button
                        onClick={(e) => handleDeleteQuiz(quizQuestions[currentQuizIndex].id, e)}
                        className="px-2 py-0.5 rounded bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-[10px] flex items-center gap-0.5"
                        title="यह प्रश्न हटाएं"
                      >
                        <Trash2 className="w-3 h-3" /> हटाएं
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {quizQuestions[currentQuizIndex] && (
                <>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    {quizQuestions[currentQuizIndex].question}
                  </h2>
                  <div className="flex justify-end -mt-3">
                    <ReportMistakeButton
                      page="सीखें — प्रश्नोत्तरी (Learn quiz)"
                      question={quizQuestions[currentQuizIndex].question}
                      options={quizQuestions[currentQuizIndex].options}
                      correct={selectedAnswer !== null ? quizQuestions[currentQuizIndex].correctAnswer : undefined}
                    />
                  </div>

                  <div className="space-y-2.5">
                    {shownQuizOptions.map((opt, i) => {
                      const isSelected = selectedAnswer === opt;
                      const isCorrect = opt === quizQuestions[currentQuizIndex].correctAnswer;
                      let btnStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';

                      if (selectedAnswer !== null) {
                        if (isCorrect) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-bold';
                        }
                      }

                      return (
                        <button
                          key={i}
                          disabled={selectedAnswer !== null}
                          onClick={() => handleSelectQuizOption(opt)}
                          className={`w-full p-4 rounded-2xl border text-left text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {selectedAnswer !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                          {selectedAnswer !== null && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
                        </button>
                      );
                    })}
                  </div>

                  {selectedAnswer !== null && (
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-3">
                      <p className="font-medium">{quizQuestions[currentQuizIndex].explanation}</p>
                      <button
                        onClick={handleNextQuizQuestion}
                        className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <span>अगला प्रश्न (Next Question)</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center space-y-4">
              <Trophy className="w-16 h-16 text-amber-500 mx-auto" />
              <h2 className="text-2xl font-black text-slate-900">प्रश्नोत्तरी संपन्न!</h2>
              <p className="text-sm text-slate-600">
                आपका कुल स्कोर: <strong className="text-emerald-700 text-lg">{quizScore} / {quizQuestions.length}</strong>
              </p>
              <button
                onClick={handleRestartQuiz}
                className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-2 cursor-pointer shadow-md"
              >
                <RotateCcw className="w-4 h-4" />
                <span>पुनः क्विज़ प्रारंभ करें</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Admin Character Add/Edit Modal */}
      {isCharModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-emerald-100 text-emerald-900 rounded-xl">
                  {editingCharKey !== null ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
                <h3 className="font-black text-slate-900 text-base">
                  {editingCharKey !== null ? 'वर्ण संपादित करें (Edit Character)' : 'नया वर्ण / ध्वनि जोड़ें (Add Character)'}
                </h3>
              </div>
              <button
                onClick={() => setIsCharModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCharModal} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    देवनागरी वर्ण (Char):
                  </label>
                  <input
                    type="text"
                    value={charFormChar}
                    onChange={(e) => setCharFormChar(e.target.value)}
                    placeholder="उदा. अ, क', त'"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-lg font-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    श्रेणी (Category):
                  </label>
                  <select
                    value={charFormCategory}
                    onChange={(e) => setCharFormCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="vowel">स्वर (Vowel)</option>
                    <option value="consonant">व्यंजन (Consonant)</option>
                    <option value="checked_modifier">अवरोधित ध्वनि (Checked Consonant)</option>
                    <option value="digit">अंक (Digit)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    वर्ण नाम (Name):
                  </label>
                  <input
                    type="text"
                    value={charFormName}
                    onChange={(e) => setCharFormName(e.target.value)}
                    placeholder="उदा. अ (Short a)"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    रोमन लिपि (Roman):
                  </label>
                  <input
                    type="text"
                    value={charFormRoman}
                    onChange={(e) => setCharFormRoman(e.target.value)}
                    placeholder="उदा. a, k', t'"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  ध्वन्यात्मक विवरण (Sound / IPA):
                </label>
                <input
                  type="text"
                  value={charFormSound}
                  onChange={(e) => setCharFormSound(e.target.value)}
                  placeholder="उदा. /ə/, /k'/ glottal stop"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    उदाहरण शब्द (संताली):
                  </label>
                  <input
                    type="text"
                    value={charFormWord}
                    onChange={(e) => setCharFormWord(e.target.value)}
                    placeholder="उदा. अतु"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    उदाहरण रोमन (Roman):
                  </label>
                  <input
                    type="text"
                    value={charFormWordRoman}
                    onChange={(e) => setCharFormWordRoman(e.target.value)}
                    placeholder="उदा. Atu"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  हिंदी अर्थ (Hindi Meaning):
                </label>
                <input
                  type="text"
                  value={charFormMeaning}
                  onChange={(e) => setCharFormMeaning(e.target.value)}
                  placeholder="उदा. गाँव (Village)"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsCharModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>सुरक्षित करें (Save)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Quiz Question Add/Edit Modal */}
      {isQuizModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-emerald-100 text-emerald-900 rounded-xl">
                  {editingQuizId !== null ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
                <h3 className="font-black text-slate-900 text-base">
                  {editingQuizId !== null ? 'क्विज़ प्रश्न संपादित करें' : 'नया क्विज़ प्रश्न जोड़ें'}
                </h3>
              </div>
              <button
                onClick={() => setIsQuizModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuizModal} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  प्रश्न (Question in Devanagari):
                </label>
                <textarea
                  value={quizFormQuestion}
                  onChange={(e) => setQuizFormQuestion(e.target.value)}
                  placeholder="उदा. संताली भाषा में 'नमस्कार' को क्या कहा जाता है?"
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  ४ विकल्प (सही उत्तर के सामने रेडियो बटन चुनें):
                </label>
                <div className="space-y-2">
                  {quizFormOptions.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="quizCorrectRadio"
                        checked={quizFormCorrectIdx === idx}
                        onChange={() => setQuizFormCorrectIdx(idx)}
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer shrink-0"
                      />
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const updated = [...quizFormOptions];
                          updated[idx] = e.target.value;
                          setQuizFormOptions(updated);
                        }}
                        placeholder={`विकल्प ${idx + 1}`}
                        className={`flex-1 p-2 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          quizFormCorrectIdx === idx
                            ? 'border-emerald-500 bg-emerald-50/50 text-emerald-950 font-bold'
                            : 'border-slate-300 bg-white'
                        }`}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  स्पष्टीकरण (Explanation):
                </label>
                <textarea
                  value={quizFormExplanation}
                  onChange={(e) => setQuizFormExplanation(e.target.value)}
                  placeholder="उदा. 'जोहार' संताल समाज का सार्वभौमिक पवित्र अभिवादन है।"
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-normal focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsQuizModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>सुरक्षित करें (Save)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
