import React, { useState, useEffect } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import {
  Gamepad2,
  RotateCcw,
  Volume2,
  Award,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Edit2,
  Trash2,
  Plus,
  Save,
  X
} from 'lucide-react';

export interface WordPuzzle {
  word: string; // 5 uppercase letters
  devanagari: string;
  meaningHindi: string;
  meaningEnglish: string;
  hint: string;
}

export const DEFAULT_PUZZLE_WORDS: WordPuzzle[] = [
  {
    word: 'JOHAR',
    devanagari: 'जोहार',
    meaningHindi: 'अभिवादन / नमस्कार',
    meaningEnglish: 'Universal Santali respect greeting',
    hint: 'Universal greeting of the Adivasi Santali community'
  },
  {
    word: 'SARNA',
    devanagari: 'सारना',
    meaningHindi: 'सरना (पवित्र उपवन व धर्म)',
    meaningEnglish: 'Sacred grove & traditional nature faith',
    hint: 'Sacred faith and Jaher Than nature worship'
  },
  {
    word: 'MARAN',
    devanagari: 'मारांग',
    meaningHindi: 'महान / बड़ा (जैसे मारांग बुरु)',
    meaningEnglish: 'Great / Supreme / Elder',
    hint: 'Word for "Great" or Supreme entity in Santali'
  },
  {
    word: 'DHIRI',
    devanagari: 'धीरी',
    meaningHindi: 'पत्थर / चट्टान',
    meaningEnglish: 'Stone / Boulder',
    hint: 'Natural mountain rock or stone'
  },
  {
    word: 'SAKAM',
    devanagari: 'साकाम',
    meaningHindi: 'पत्ता (जैसे सखुआ का पत्ता)',
    meaningEnglish: 'Leaf / Tree foliage',
    hint: 'Green leaf used in ritual plates & blessings'
  },
  {
    word: 'KATHA',
    devanagari: 'काथा',
    meaningHindi: 'बात / वाणी / शब्द (होर कुरुम)',
    meaningEnglish: 'Words / Speech / Language',
    hint: 'Found in the title of this app "Hor Katha"'
  }
];

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
];

export const SantaliWordleGame: React.FC = () => {
  const { isAdmin } = useAdmin();
  const [puzzleList, setPuzzleList] = useState<WordPuzzle[]>(() =>
    safeLoadFromStorage('hor_katha_wordle_puzzles_db', DEFAULT_PUZZLE_WORDS)
  );

  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [streak, setStreak] = useState(1);
  const [showHint, setShowHint] = useState(false);

  // Admin modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<WordPuzzle>({
    word: '',
    devanagari: '',
    meaningHindi: '',
    meaningEnglish: '',
    hint: ''
  });

  useEffect(() => {
    safeSaveToStorage('hor_katha_wordle_puzzles_db', puzzleList);
  }, [puzzleList]);

  const handleOpenAdd = () => {
    setEditingIndex(null);
    setFormData({
      word: '',
      devanagari: '',
      meaningHindi: '',
      meaningEnglish: '',
      hint: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (idx: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingIndex(idx);
    setFormData({ ...puzzleList[idx] });
    setIsModalOpen(true);
  };

  const handleDelete = (idx: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (puzzleList.length <= 1) {
      alert('कम से कम १ वर्डले पहेली शब्द अवश्य होना चाहिए।');
      return;
    }
    if (window.confirm('क्या आप इस वर्डले शब्द को हटाना चाहते हैं?')) {
      const updated = puzzleList.filter((_, i) => i !== idx);
      setPuzzleList(updated);
      setPuzzleIndex(0);
      setGuesses([]);
      setCurrentGuess('');
      setGameStatus('playing');
    }
  };

  const handleReset = () => {
    if (window.confirm('क्या आप सभी वर्डले पहेलियों को मूल डिफ़ॉल्ट पर रीसेट करना चाहते हैं?')) {
      setPuzzleList(DEFAULT_PUZZLE_WORDS);
      setPuzzleIndex(0);
      setGuesses([]);
      setCurrentGuess('');
      setGameStatus('playing');
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanWord = formData.word.trim().toUpperCase();
    if (cleanWord.length !== 5) {
      alert('वर्डले शब्द ठीक ५ अक्षरों (5 letters) का होना चाहिए।');
      return;
    }
    if (!formData.devanagari.trim() || !formData.meaningHindi.trim()) {
      alert('कृपया संताली देवनागरी शब्द और हिंदी अर्थ अवश्य भरें।');
      return;
    }

    const itemToSave = {
      ...formData,
      word: cleanWord,
      devanagari: formData.devanagari.trim(),
      meaningHindi: formData.meaningHindi.trim()
    };

    if (editingIndex !== null) {
      const updated = puzzleList.map((p, i) => i === editingIndex ? itemToSave : p);
      setPuzzleList(updated);
    } else {
      setPuzzleList([...puzzleList, itemToSave]);
      setPuzzleIndex(puzzleList.length);
    }
    setGuesses([]);
    setCurrentGuess('');
    setGameStatus('playing');
    setIsModalOpen(false);
  };

  const currentPuzzle = puzzleList[puzzleIndex] || puzzleList[0] || DEFAULT_PUZZLE_WORDS[0];
  const maxAttempts = 6;

  const handleKeyPress = (key: string) => {
    if (gameStatus !== 'playing') return;

    if (key === '⌫' || key === 'BACKSPACE') {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    if (key === 'ENTER') {
      if (currentGuess.length !== 5) return;

      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);

      if (currentGuess === currentPuzzle.word) {
        setGameStatus('won');
        setStreak((prev) => prev + 1);
        speakWithFemaleVoice(`बहुत खूब! सही जवाब है ${currentPuzzle.meaningHindi}`, { lang: 'hi-IN' });
      } else if (newGuesses.length >= maxAttempts) {
        setGameStatus('lost');
        speakWithFemaleVoice(`सही शब्द था ${currentPuzzle.meaningHindi}`, { lang: 'hi-IN' });
      }

      setCurrentGuess('');
      return;
    }

    if (currentGuess.length < 5 && /^[A-Z]$/.test(key)) {
      setCurrentGuess((prev) => prev + key);
    }
  };

  const handleNextWord = () => {
    setPuzzleIndex((prev) => (prev + 1 < puzzleList.length ? prev + 1 : 0));
    setGuesses([]);
    setCurrentGuess('');
    setGameStatus('playing');
    setShowHint(false);
  };

  const getLetterStatus = (letter: string, index: number, word: string) => {
    if (currentPuzzle.word[index] === letter) {
      return 'bg-emerald-600 text-white border-emerald-600'; // exact
    }
    if (currentPuzzle.word.includes(letter)) {
      return 'bg-amber-500 text-white border-amber-500'; // exists
    }
    return 'bg-slate-700 text-white border-slate-700'; // wrong
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto font-sans">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-sky-700 text-white p-5 rounded-3xl shadow-sm flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider">
              Daily Vocabulary Game
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
              5 Letters
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black mt-1 tracking-tight flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-amber-300" />
            <span>Santali Wordle Challenge</span>
          </h1>
        </div>

        <div className="bg-white/15 px-3 py-1.5 rounded-xl border border-white/20 text-center shrink-0">
          <span className="text-[10px] uppercase font-bold text-purple-200 block">Streak</span>
          <span className="text-base font-black text-amber-300">🔥 {streak}</span>
        </div>
      </div>

      {/* Admin Action Bar */}
      {isAdmin && (
        <div className="bg-purple-500/10 border border-purple-300/80 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black text-purple-950">
              प्रशासक (Admin): शब्द {puzzleIndex + 1}/{puzzleList.length} ({currentPuzzle.word} · {currentPuzzle.devanagari})
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleOpenAdd}
              className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ नया शब्द</span>
            </button>
            <button
              onClick={(e) => handleOpenEdit(puzzleIndex, e)}
              className="px-2 py-1 bg-white hover:bg-purple-50 text-purple-900 border border-purple-300 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
            >
              <Edit2 className="w-3 h-3 text-purple-700" />
              <span>सुधारें</span>
            </button>
            <button
              onClick={(e) => handleDelete(puzzleIndex, e)}
              className="px-2 py-1 bg-white hover:bg-rose-50 text-rose-700 border border-rose-300 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
            >
              <Trash2 className="w-3 h-3" />
              <span>हटाएं</span>
            </button>
            <button
              onClick={handleReset}
              className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all"
            >
              <RotateCcw className="w-3 h-3 text-slate-500" />
            </button>
          </div>
        </div>
      )}

      {/* Game Board (6 Rows x 5 Columns) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2 max-w-sm mx-auto">
        {Array.from({ length: maxAttempts }).map((_, rowIndex) => {
          const isCurrentRow = rowIndex === guesses.length;
          const guessWord = guesses[rowIndex] || (isCurrentRow ? currentGuess.padEnd(5, ' ') : '     ');

          return (
            <div key={rowIndex} className="grid grid-cols-5 gap-2">
              {guessWord.split('').map((char, colIndex) => {
                const isGuessed = rowIndex < guesses.length;
                let cellClass = 'bg-slate-50 border-slate-200 text-slate-800';

                if (isGuessed) {
                  cellClass = getLetterStatus(char, colIndex, guesses[rowIndex]);
                } else if (isCurrentRow && char !== ' ') {
                  cellClass = 'border-purple-600 bg-purple-50 text-purple-900 scale-105';
                }

                return (
                  <div
                    key={colIndex}
                    className={`aspect-square rounded-xl border-2 font-black text-lg sm:text-xl flex items-center justify-center transition-all select-none ${cellClass}`}
                  >
                    {char.trim()}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Hint & Status Banner */}
      <div className="flex items-center justify-between text-xs px-2">
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-purple-700 hover:text-purple-900 font-bold flex items-center gap-1.5 cursor-pointer"
        >
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span>{showHint ? 'Hide Hint' : 'Show Santali Hint'}</span>
        </button>

        <span className="text-slate-500">
          Attempt {Math.min(guesses.length + 1, maxAttempts)} of {maxAttempts}
        </span>
      </div>

      {showHint && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 animate-fadeIn">
          <strong>Clue:</strong> {currentPuzzle.hint}
        </div>
      )}

      {/* Virtual Onscreen Keyboard */}
      <div className="bg-slate-100 p-2.5 rounded-3xl border border-slate-200 space-y-1.5 max-w-md mx-auto select-none">
        {KEYBOARD_ROWS.map((row, rowIdx) => (
          <div key={rowIdx} className="flex justify-center gap-1">
            {row.map((key) => {
              const isAction = key === 'ENTER' || key === '⌫';
              return (
                <button
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  className={`h-10 rounded-lg font-bold text-xs flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95 ${
                    isAction
                      ? 'px-3 bg-purple-600 text-white hover:bg-purple-700 text-[11px]'
                      : 'w-8 sm:w-9 bg-white text-slate-800 hover:bg-slate-200 border border-slate-300'
                  }`}
                >
                  {key}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Game Finished Modal / Card */}
      {gameStatus !== 'playing' && (
        <div
          className={`p-6 rounded-3xl border text-center space-y-3 animate-fadeIn ${
            gameStatus === 'won'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            {gameStatus === 'won' ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            ) : (
              <XCircle className="w-6 h-6 text-rose-600" />
            )}
            <h3 className="text-lg font-black">
              {gameStatus === 'won' ? 'Raska! You Guessed It!' : 'Good Effort! Try Another Word!'}
            </h3>
          </div>

          <div className="space-y-1 py-1">
            <p className="text-3xl font-serif font-black">{currentPuzzle.devanagari}</p>
            <p className="text-sm font-bold tracking-widest">{currentPuzzle.word}</p>
            <p className="text-xs text-slate-600">
              {currentPuzzle.meaningHindi} · {currentPuzzle.meaningEnglish}
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() =>
                speakWithFemaleVoice(`${currentPuzzle.word}. ${currentPuzzle.meaningHindi}`, {
                  lang: 'hi-IN'
                })
              }
              className="px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-slate-100"
            >
              <Volume2 className="w-4 h-4 text-purple-600" />
              <span>Listen Word</span>
            </button>

            <button
              onClick={handleNextWord}
              className="px-5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Next Word</span>
            </button>
          </div>
        </div>
      )}

      {/* Admin Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-purple-600" />
                <span>{editingIndex !== null ? 'वर्डले पहेली शब्द सुधारें' : '+ नया वर्डले शब्द जोड़ें'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">५-अक्षरी रोमन शब्द (5 Letters) *</label>
                  <input
                    type="text"
                    maxLength={5}
                    required
                    placeholder="उदा. JOHAR"
                    value={formData.word}
                    onChange={(e) => setFormData({ ...formData, word: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-black tracking-widest text-purple-900 uppercase focus:outline-purple-500"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">ठीक ५ अंग्रेजी अक्षर (A-Z)</p>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">संताली देवनागरी *</label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. जोहार"
                    value={formData.devanagari}
                    onChange={(e) => setFormData({ ...formData, devanagari: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:outline-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">हिंदी अर्थ *</label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. अभिवादन / नमस्कार"
                    value={formData.meaningHindi}
                    onChange={(e) => setFormData({ ...formData, meaningHindi: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:outline-purple-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">English Meaning</label>
                  <input
                    type="text"
                    placeholder="e.g. Greeting"
                    value={formData.meaningEnglish}
                    onChange={(e) => setFormData({ ...formData, meaningEnglish: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:outline-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">संकेत / संकेत पंक्ति (Clue / Hint)</label>
                <textarea
                  rows={2}
                  placeholder="उदा. Universal greeting of the Adivasi Santali community..."
                  value={formData.hint}
                  onChange={(e) => setFormData({ ...formData, hint: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-800 focus:outline-purple-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>सहेजें (Save)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
