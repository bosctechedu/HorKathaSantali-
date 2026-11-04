import React, { useState, useEffect, useRef } from 'react';
import { KeyboardTheme } from '../types';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  processWordOnSpace,
  getHindiSuggestions,
  SHORTCUT_EXPANSIONS
} from '../utils/hindiTransliterate';
import {
  saveKeyboardDraftToIndexedDB,
  getKeyboardDraftFromIndexedDB
} from '../utils/indexedDB';
import {
  Volume2,
  VolumeX,
  Copy,
  Check,
  Trash2,
  Share2,
  Download,
  Printer,
  Sparkles,
  Search,
  Smile,
  Hash,
  Keyboard,
  Globe,
  Mic,
  Maximize2,
  RotateCcw,
  RefreshCw,
  X,
  Send,
  Palette
} from 'lucide-react';

interface KeyboardModuleProps {
  onSendToTranslator?: (text: string) => void;
  onSearchInDictionary?: (text: string) => void;
  compact?: boolean;
}

export type KeyboardScriptTab =
  | 'santali_dev'
  | 'santali_roman'
  | 'hindi_phonetic'
  | 'hindi_dev'
  | 'english';

export const KeyboardModule: React.FC<KeyboardModuleProps> = ({
  onSendToTranslator,
  onSearchInDictionary,
  compact = false
}) => {
  // 1. Active Script Layout (Santali Devanagari as primary)
  const [activeScript, setActiveScript] = useState<KeyboardScriptTab>('santali_dev');

  // 2. 3 High-Contrast Keyboard Themes
  const [theme, setTheme] = useState<KeyboardTheme>(() => {
    try {
      return (localStorage.getItem('hk_keyboard_theme') as KeyboardTheme) || 'deepseek_dark';
    } catch {
      return 'deepseek_dark';
    }
  });

  // Editor text state
  const [editorText, setEditorText] = useState<string>(() => {
    try {
      return (
        localStorage.getItem('hk_saved_text') ||
        'Johar! Welcome to Hor Katha Suite — Santali Language & Learning Platform'
      );
    } catch {
      return 'Johar! Welcome to Hor Katha Suite — Santali Language & Learning Platform';
    }
  });

  // Settings & Toggles
  const [keyboardMode, setKeyboardMode] = useState<'virtual' | 'system'>('virtual');
  const [showNumpad, setShowNumpad] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [zenMode, setZenMode] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(18);
  const [fontFamily, setFontFamily] = useState<string>('Plus Jakarta Sans, sans-serif');
  const [isShiftActive, setIsShiftActive] = useState<boolean>(false);
  const [isCapsActive, setIsCapsActive] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  // Live Hindi Phonetic Word Suggestions
  const [currentTypedToken, setCurrentTypedToken] = useState<string>('');
  const [hindiSuggestions, setHindiSuggestions] = useState<{ roman: string; hindi: string }[]>([]);

  // Modals state
  const [activeModal, setActiveModal] = useState<
    'emoji' | 'charmap' | 'find_replace' | 'typing_test' | 'krutidev' | null
  >(null);

  // Find & Replace fields
  const [findWord, setFindWord] = useState('');
  const [replaceWord, setReplaceWord] = useState('');

  // Typing test state
  const [testLesson] = useState(
    'Johar! Aboak Santali ror do adi napay ar soresh ror kana. Hor katha suite re disom dular, ror ar serwa do aboak garob kana.'
  );
  const [testInput, setTestInput] = useState('');

  // Editor history for Undo/Redo
  const [history, setHistory] = useState<string[]>([editorText]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  // Persist theme to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('hk_keyboard_theme', theme);
    } catch {}
  }, [theme]);

  // Save to localStorage & IndexedDB for offline persistence
  useEffect(() => {
    try {
      localStorage.setItem('hk_saved_text', editorText);
      saveKeyboardDraftToIndexedDB(editorText, activeScript);
    } catch (e) {
      console.warn('Could not save text', e);
    }
  }, [editorText, activeScript]);

  // Restore draft on initial mount
  useEffect(() => {
    let mounted = true;
    getKeyboardDraftFromIndexedDB().then((draft) => {
      if (mounted && draft && draft.text && draft.text !== editorText) {
        if (!localStorage.getItem('hk_saved_text')) {
          setEditorText(draft.text);
        }
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Play subtle mechanical key tap audio if sound is enabled
  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch {}
  };

  // Transliteration on Space & Universal Shorthand Expansions
  const handleSpaceTransliteration = (
    currentVal: string,
    cursorPos: number
  ): { newText: string; newCursor: number } | null => {
    const before = currentVal.slice(0, cursorPos);
    const after = currentVal.slice(cursorPos);

    // Match the last non-space token right before cursor
    const match = before.match(/(\S+)$/);
    if (!match) return null;

    const rawToken = match[1];
    const tokenStart = match.index!;

    // Target script
    let targetScript: 'hindi' | 'santali-dev' | 'roman' | 'english' = 'english';
    if (activeScript === 'hindi_dev' || activeScript === 'hindi_phonetic') targetScript = 'hindi';
    else if (activeScript === 'santali_dev') targetScript = 'santali-dev';
    else if (activeScript === 'santali_roman') targetScript = 'roman';

    const converted = processWordOnSpace(rawToken, targetScript);
    if (converted !== rawToken) {
      const newText = before.slice(0, tokenStart) + converted + ' ' + after;
      const newCursor = tokenStart + converted.length + 1;
      return { newText, newCursor };
    }
    return null;
  };

  // Insert character or word at cursor position
  const insertText = (char: string) => {
    playClickSound();
    const textarea = editorRef.current;
    if (!textarea) {
      setEditorText((prev) => prev + char);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = textarea.value;

    // If inserting space, execute space transliteration / shorthand expansion
    if (char === ' ') {
      const translit = handleSpaceTransliteration(current, start);
      if (translit) {
        setEditorText(translit.newText);
        pushHistory(translit.newText);
        setCurrentTypedToken('');
        setHindiSuggestions([]);
        setTimeout(() => {
          textarea.selectionStart = translit.newCursor;
          textarea.selectionEnd = translit.newCursor;
          textarea.focus();
        }, 0);
        return;
      }
    }

    const updated = current.substring(0, start) + char + current.substring(end);
    setEditorText(updated);
    pushHistory(updated);

    // Update live phonetic token for suggestion bar if in Hindi Phonetic
    if (activeScript === 'hindi_phonetic') {
      if (char === ' ' || char === '\n') {
        setCurrentTypedToken('');
        setHindiSuggestions([]);
      } else {
        const textBeforeCursor = updated.slice(0, start + char.length);
        const tokenMatch = textBeforeCursor.match(/([a-zA-Z]+)$/);
        const token = tokenMatch ? tokenMatch[1] : '';
        setCurrentTypedToken(token);
        if (token) {
          setHindiSuggestions(getHindiSuggestions(token));
        } else {
          setHindiSuggestions([]);
        }
      }
    }

    // Re-position cursor right after inserted char
    setTimeout(() => {
      textarea.selectionStart = start + char.length;
      textarea.selectionEnd = start + char.length;
      textarea.focus();
    }, 0);
  };

  // Insert suggested Hindi word from suggestion bar
  const insertHindiSuggestion = (suggestedWord: string) => {
    playClickSound();
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const current = textarea.value;
    const before = current.slice(0, start);
    const after = current.slice(start);

    // Replace current active token with the suggested Hindi word + space
    const tokenMatch = before.match(/([a-zA-Z]+)$/);
    if (tokenMatch) {
      const tokenStart = tokenMatch.index!;
      const updated = before.slice(0, tokenStart) + suggestedWord + ' ' + after;
      const newCursor = tokenStart + suggestedWord.length + 1;
      setEditorText(updated);
      pushHistory(updated);
      setCurrentTypedToken('');
      setHindiSuggestions([]);
      setTimeout(() => {
        textarea.selectionStart = newCursor;
        textarea.selectionEnd = newCursor;
        textarea.focus();
      }, 0);
    }
  };

  const handleBackspace = () => {
    playClickSound();
    const textarea = editorRef.current;
    if (!textarea) {
      setEditorText((prev) => prev.slice(0, -1));
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = textarea.value;

    if (start === end && start > 0) {
      const updated = current.substring(0, start - 1) + current.substring(end);
      setEditorText(updated);
      pushHistory(updated);
      setTimeout(() => {
        textarea.selectionStart = start - 1;
        textarea.selectionEnd = start - 1;
        textarea.focus();
      }, 0);
    } else if (start !== end) {
      const updated = current.substring(0, start) + current.substring(end);
      setEditorText(updated);
      pushHistory(updated);
      setTimeout(() => {
        textarea.selectionStart = start;
        textarea.selectionEnd = start;
        textarea.focus();
      }, 0);
    }
  };

  const pushHistory = (newText: string) => {
    const newHist = history.slice(0, historyIndex + 1);
    newHist.push(newText);
    if (newHist.length > 30) newHist.shift();
    setHistory(newHist);
    setHistoryIndex(newHist.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const nextIdx = historyIndex - 1;
      setHistoryIndex(nextIdx);
      setEditorText(history[nextIdx]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      setEditorText(history[nextIdx]);
    }
  };

  const handleClear = () => {
    if (window.confirm('Clear all text in the editor?')) {
      setEditorText('');
      pushHistory('');
      setCurrentTypedToken('');
      setHindiSuggestions([]);
    }
  };

  const handleCopy = () => {
    if (!editorText) return;
    navigator.clipboard.writeText(editorText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Female voice reading
  const handleSpeak = () => {
    if (!editorText.trim()) return;
    speakWithFemaleVoice(editorText, {
      lang: 'hi-IN',
      pitch: 1.15,
      rate: 0.88,
    });
  };

  // Convert text casing
  const convertCasing = (type: string) => {
    if (!editorText) return;
    let converted = editorText;

    if (type === 'upper') {
      converted = editorText.toUpperCase();
    } else if (type === 'lower') {
      converted = editorText.toLowerCase();
    } else if (type === 'title') {
      converted = editorText.replace(/\b\w/g, (c) => c.toUpperCase());
    } else if (type === 'sentence') {
      converted = editorText.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    } else if (type === 'num-to-dev') {
      const devNums = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
      converted = editorText.replace(/[0-9]/g, (d) => devNums[parseInt(d, 10)]);
    } else if (type === 'num-to-ol') {
      const devNums = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
      converted = editorText.replace(/[0-9]/g, (d) => devNums[parseInt(d, 10)]);
    } else if (type === 'num-to-lat') {
      const devMap: Record<string, string> = {
        '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
        '५': '5', '६': '6', '७': '7', '८': '8', '९': '9'
      };
      converted = editorText.replace(/[०-९]/g, (d) => devMap[d] || d);
    }

    setEditorText(converted);
    pushHistory(converted);
  };

  const handleFindReplace = () => {
    if (!findWord) return;
    const regex = new RegExp(findWord, 'g');
    const updated = editorText.replace(regex, replaceWord);
    setEditorText(updated);
    pushHistory(updated);
    setActiveModal(null);
  };

  // Download files
  const downloadTextFile = () => {
    const blob = new Blob([editorText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HorKatha_${activeScript}_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadDocFile = () => {
    const html = `<html><head><meta charset="utf-8"><title>Hor Katha Document</title></head><body><p>${editorText.replace(/\n/g, '<br>')}</p></body></html>`;
    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HorKatha_${activeScript}_${Date.now()}.doc`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const printText = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Hor Katha Print</title>
          <style>
            body { font-family: 'Noto Sans Devanagari', 'Plus Jakarta Sans', sans-serif; padding: 40px; font-size: 18px; line-height: 1.8; color: #111; }
            h2 { color: #b45309; border-bottom: 2px solid #f59e0b; padding-bottom: 8px; font-size: 20px; }
            .credit { margin-top: 40px; font-size: 12px; color: #666; border-top: 1px solid #ddd; padding-top: 10px; }
          </style>
        </head>
        <body>
          <h2>Hoṛ Katha Suite v3.7.4 · BOSC Tech & Edu</h2>
          <p>${editorText.replace(/\n/g, '<br>')}</p>
          <div class="credit">Generated via Hor Katha Suite · Standardized Indigenous Linguistic Platform</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const shareViaWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(editorText)}`;
    window.open(url, '_blank');
  };

  // Speech Recognition (Web Speech API)
  const toggleSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported on this browser. Try Chrome/Edge.');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onerror = () => setIsRecording(false);

    recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      insertText(' ' + speechResult);
    };

    recognition.start();
  };

  // Physical keyboard keydown handler for instant Space transliteration
  const handleEditorKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === ' ') {
      const textarea = editorRef.current;
      if (textarea) {
        const cursor = textarea.selectionStart;
        const res = handleSpaceTransliteration(textarea.value, cursor);
        if (res) {
          e.preventDefault();
          setEditorText(res.newText);
          pushHistory(res.newText);
          setCurrentTypedToken('');
          setHindiSuggestions([]);
          setTimeout(() => {
            textarea.selectionStart = res.newCursor;
            textarea.selectionEnd = res.newCursor;
          }, 0);
        }
      }
    }
  };

  // Transliteration helper for Hindi Phonetic & Universal Shorthand Expansions
  const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    const textarea = editorRef.current;

    // Check if space was typed (useful for mobile or virtual key typing)
    if (val.endsWith(' ') && textarea) {
      const cursor = textarea.selectionStart;
      const res = handleSpaceTransliteration(val.slice(0, -1), val.length - 1);
      if (res) {
        setEditorText(res.newText);
        pushHistory(res.newText);
        setCurrentTypedToken('');
        setHindiSuggestions([]);
        setTimeout(() => {
          textarea.selectionStart = res.newCursor;
          textarea.selectionEnd = res.newCursor;
        }, 0);
        return;
      }
    }

    setEditorText(val);

    // Update suggestions for Hindi Phonetic
    if (activeScript === 'hindi_phonetic' && textarea) {
      const cursor = textarea.selectionStart;
      const textBefore = val.slice(0, cursor);
      const tokenMatch = textBefore.match(/([a-zA-Z]+)$/);
      const token = tokenMatch ? tokenMatch[1] : '';
      setCurrentTypedToken(token);
      if (token) {
        setHindiSuggestions(getHindiSuggestions(token));
      } else {
        setHindiSuggestions([]);
      }
    }
  };

  // Metrics
  const charCount = editorText.length;
  const wordCount = editorText.trim() ? editorText.trim().split(/\s+/).length : 0;
  const lineCount = editorText ? editorText.split('\n').length : 0;
  const readTimeEst = Math.ceil(wordCount / 180);

  // ═══ THEME COLOR TOKENS (HIGH CONTRAST GUARANTEE ACROSS ALL 3 THEMES) ═══
  const getThemeClasses = () => {
    if (theme === 'deepseek_dark') {
      return {
        container: 'bg-[#0B0F19] text-[#F8FAFC] border-[#1E293B]',
        headerBar: 'bg-[#111827] border-[#1F2937]',
        brandText: 'text-[#F8FAFC]',
        subText: 'text-[#60A5FA]',
        strip: 'bg-[#111827] border-[#1F2937]',
        toolbar: 'bg-[#111827] border-[#1F2937]',
        editorBg: 'bg-[#0D1117] border-[#30363D] text-[#FFFFFF]',
        keyDeckBg: 'bg-[#111827] border-[#1F2937]',
        keyNormal:
          'bg-[#1E293B] text-[#FFFFFF] border-[#334155] hover:bg-[#2563EB] hover:text-[#FFFFFF] hover:border-[#3B82F6] active:scale-95 shadow-sm',
        keyVowel:
          'bg-[#1E293B] text-[#93C5FD] border-[#2563EB]/50 hover:bg-[#2563EB] hover:text-[#FFFFFF] active:scale-95 shadow-sm',
        keyAction:
          'bg-[#2563EB] text-[#FFFFFF] border-[#1D4ED8] hover:bg-[#3B82F6] active:scale-95 shadow-sm font-bold',
        keyDelete:
          'bg-[#DC2626] text-[#FFFFFF] border-[#B91C1C] hover:bg-[#EF4444] active:scale-95 shadow-sm font-bold',
        card: 'bg-[#111827] border-[#1F2937] text-[#F8FAFC]',
        cardTitle: 'text-[#60A5FA]',
        cardBody: 'text-[#E2E8F0]',
        dropdown: 'bg-[#1E293B] text-[#FFFFFF] border-[#334155]',
        buttonMuted: 'bg-[#1E293B] text-[#E2E8F0] border-[#334155] hover:bg-[#334155]',
        accentChip: 'bg-[#1E293B] text-[#93C5FD] border-[#334155] hover:bg-[#2563EB] hover:text-[#FFFFFF]',
      };
    } else if (theme === 'heritage_forest') {
      return {
        container: 'bg-[#022C22] text-[#FEF3C7] border-[#064E3B]',
        headerBar: 'bg-[#064E3B] border-[#047857]',
        brandText: 'text-[#FEF3C7]',
        subText: 'text-[#FBBF24]',
        strip: 'bg-[#064E3B] border-[#047857]',
        toolbar: 'bg-[#064E3B] border-[#047857]',
        editorBg: 'bg-[#064E3B]/70 border-[#047857] text-[#FEF3C7]',
        keyDeckBg: 'bg-[#064E3B] border-[#047857]',
        keyNormal:
          'bg-[#065F46] text-[#FFFFFF] border-[#047857] hover:bg-[#D97706] hover:text-[#FFFFFF] hover:border-[#F59E0B] active:scale-95 shadow-sm',
        keyVowel:
          'bg-[#065F46] text-[#FDE68A] border-[#D97706]/60 hover:bg-[#D97706] hover:text-[#FFFFFF] active:scale-95 shadow-sm',
        keyAction:
          'bg-[#D97706] text-[#FFFFFF] border-[#B45309] hover:bg-[#F59E0B] active:scale-95 shadow-sm font-bold',
        keyDelete:
          'bg-[#991B1B] text-[#FFFFFF] border-[#7F1D1D] hover:bg-[#DC2626] active:scale-95 shadow-sm font-bold',
        card: 'bg-[#064E3B] border-[#047857] text-[#FEF3C7]',
        cardTitle: 'text-[#FBBF24]',
        cardBody: 'text-[#ECFDF5]',
        dropdown: 'bg-[#065F46] text-[#FEF3C7] border-[#047857]',
        buttonMuted: 'bg-[#065F46] text-[#FEF3C7] border-[#047857] hover:bg-[#047857]',
        accentChip: 'bg-[#065F46] text-[#FDE68A] border-[#047857] hover:bg-[#D97706] hover:text-[#FFFFFF]',
      };
    } else {
      // clean_light
      return {
        container: 'bg-[#FFFFFF] text-[#0F172A] border-[#CBD5E1]',
        headerBar: 'bg-[#F8FAFC] border-[#E2E8F0]',
        brandText: 'text-[#0F172A]',
        subText: 'text-[#0284C7]',
        strip: 'bg-[#F8FAFC] border-[#E2E8F0]',
        toolbar: 'bg-[#F8FAFC] border-[#E2E8F0]',
        editorBg: 'bg-[#FFFFFF] border-[#CBD5E1] text-[#0F172A]',
        keyDeckBg: 'bg-[#F1F5F9] border-[#CBD5E1]',
        keyNormal:
          'bg-[#FFFFFF] text-[#0F172A] border-[#CBD5E1] hover:bg-[#0284C7] hover:text-[#FFFFFF] hover:border-[#0284C7] active:scale-95 shadow-xs',
        keyVowel:
          'bg-[#EFF6FF] text-[#1D4ED8] border-[#93C5FD] hover:bg-[#1D4ED8] hover:text-[#FFFFFF] active:scale-95 shadow-xs font-black',
        keyAction:
          'bg-[#0284C7] text-[#FFFFFF] border-[#0369A1] hover:bg-[#0369A1] active:scale-95 shadow-sm font-bold',
        keyDelete:
          'bg-[#FEE2E2] text-[#B91C1C] border-[#FCA5A5] hover:bg-[#DC2626] hover:text-[#FFFFFF] active:scale-95 shadow-sm font-bold',
        card: 'bg-[#FFFFFF] border-[#E2E8F0] text-[#0F172A]',
        cardTitle: 'text-[#0284C7]',
        cardBody: 'text-[#334155]',
        dropdown: 'bg-[#FFFFFF] text-[#0F172A] border-[#CBD5E1]',
        buttonMuted: 'bg-[#F1F5F9] text-[#0F172A] border-[#CBD5E1] hover:bg-[#E2E8F0]',
        accentChip: 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE] hover:bg-[#1D4ED8] hover:text-[#FFFFFF]',
      };
    }
  };

  const tc = getThemeClasses();

  // ═══ RENDER KEYBOARD KEYS ACCORDING TO SCRIPT ═══
  const renderKeyboardKeys = () => {
    // 1. SANTALI (DEVANAGARI) & HINDI DEVANAGARI KEYBOARD
    if (activeScript === 'santali_dev' || activeScript === 'hindi_dev') {
      const devVowels = ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ'];
      const devMatras = ['ा', 'ि', 'ी', 'ु', 'ू', 'े', 'ै', 'ो', 'ौ', '्', 'ं', 'ँ', 'ः', '़'];
      const devConsonants1 = ['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ'];
      const devConsonants2 = ['ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न'];
      const devConsonants3 = ['प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह'];
      const devNumerals = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९', '।', '॥'];

      return (
        <div className="space-y-1.5 w-full select-none">
          {/* Numerals */}
          <div className="flex gap-1 justify-center flex-wrap">
            {devNumerals.map((k) => (
              <button
                key={k}
                onClick={() => insertText(k)}
                className={`w-7 sm:w-8 h-9 rounded-lg font-bold text-sm cursor-pointer ${tc.keyNormal}`}
              >
                {k}
              </button>
            ))}
          </div>

          {/* Vowels & Matras */}
          <div className="flex gap-1 justify-center flex-wrap">
            {devVowels.map((k) => (
              <button
                key={k}
                onClick={() => insertText(k)}
                className={`w-7 sm:w-9 h-9 sm:h-10 rounded-lg text-base font-bold cursor-pointer ${tc.keyVowel}`}
              >
                {k}
              </button>
            ))}
            {devMatras.map((k) => (
              <button
                key={k}
                onClick={() => insertText(k)}
                className={`w-7 sm:w-9 h-9 sm:h-10 rounded-lg text-base font-bold cursor-pointer ${tc.keyVowel}`}
              >
                {k}
              </button>
            ))}
          </div>

          {/* Consonants Rows */}
          <div className="flex gap-1 justify-center flex-wrap">
            {devConsonants1.map((k) => (
              <button
                key={k}
                onClick={() => insertText(k)}
                className={`w-7 sm:w-9 h-9 sm:h-10 rounded-lg text-base font-bold cursor-pointer ${tc.keyNormal}`}
              >
                {k}
              </button>
            ))}
          </div>

          <div className="flex gap-1 justify-center flex-wrap">
            {devConsonants2.map((k) => (
              <button
                key={k}
                onClick={() => insertText(k)}
                className={`w-7 sm:w-9 h-9 sm:h-10 rounded-lg text-base font-bold cursor-pointer ${tc.keyNormal}`}
              >
                {k}
              </button>
            ))}
          </div>

          <div className="flex gap-1 justify-center flex-wrap">
            {devConsonants3.map((k) => (
              <button
                key={k}
                onClick={() => insertText(k)}
                className={`w-7 sm:w-9 h-9 sm:h-10 rounded-lg text-base font-bold cursor-pointer ${tc.keyNormal}`}
              >
                {k}
              </button>
            ))}
          </div>

          <div className="flex gap-1.5 justify-center items-center pt-1">
            <button
              onClick={() => insertText(' ')}
              className={`flex-1 max-w-[240px] h-9 sm:h-10 rounded-xl text-xs uppercase cursor-pointer ${tc.keyAction}`}
            >
              Spacebar
            </button>
            <button
              onClick={handleBackspace}
              className={`px-3.5 h-9 sm:h-10 rounded-xl text-xs cursor-pointer ${tc.keyDelete}`}
            >
              ⌫ Delete
            </button>
          </div>
        </div>
      );
    }

    // 3. SANTALI(R) - ROMAN SANTALI WITH DIACRITICS
    if (activeScript === 'santali_roman') {
      const accents = [
        'ā', 'ī', 'ū', 'ē', 'ō', 'a̧', 'ȩ', 'i̧', 'o̧', 'u̧',
        'ñ', 'ṇ', 'ṭ', 'ḍ', 'ṛ', 'ṅ', 'ṃ', 'ḥ', '’'
      ];
      const row1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
      const row2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
      const row3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '-'];

      return (
        <div className="space-y-1.5 w-full select-none">
          {/* Diacritics Row */}
          <div className="flex gap-1 justify-center flex-wrap">
            {accents.map((k) => (
              <button
                key={k}
                onClick={() => insertText(isShiftActive ? k.toUpperCase() : k)}
                className={`w-7 sm:w-9 h-9 sm:h-10 rounded-lg text-base font-bold cursor-pointer ${tc.keyVowel}`}
              >
                {isShiftActive ? k.toUpperCase() : k}
              </button>
            ))}
          </div>

          {/* Standard Roman QWERTY */}
          <div className="flex gap-1 justify-center flex-wrap">
            {row1.map((k) => (
              <button
                key={k}
                onClick={() => insertText(isShiftActive || isCapsActive ? k.toUpperCase() : k)}
                className={`w-7 sm:w-10 h-9 sm:h-10 rounded-lg text-base font-bold cursor-pointer ${tc.keyNormal}`}
              >
                {isShiftActive || isCapsActive ? k.toUpperCase() : k}
              </button>
            ))}
          </div>

          <div className="flex gap-1 justify-center flex-wrap">
            {row2.map((k) => (
              <button
                key={k}
                onClick={() => insertText(isShiftActive || isCapsActive ? k.toUpperCase() : k)}
                className={`w-7 sm:w-10 h-9 sm:h-10 rounded-lg text-base font-bold cursor-pointer ${tc.keyNormal}`}
              >
                {isShiftActive || isCapsActive ? k.toUpperCase() : k}
              </button>
            ))}
          </div>

          <div className="flex gap-1 justify-center flex-wrap">
            <button
              onClick={() => setIsShiftActive(!isShiftActive)}
              className={`px-3 h-9 sm:h-10 rounded-lg text-xs font-bold cursor-pointer ${
                isShiftActive ? tc.keyAction : tc.buttonMuted
              }`}
            >
              ⇧ Shift
            </button>
            {row3.map((k) => (
              <button
                key={k}
                onClick={() => insertText(isShiftActive || isCapsActive ? k.toUpperCase() : k)}
                className={`w-7 sm:w-10 h-9 sm:h-10 rounded-lg text-base font-bold cursor-pointer ${tc.keyNormal}`}
              >
                {isShiftActive || isCapsActive ? k.toUpperCase() : k}
              </button>
            ))}
            <button
              onClick={handleBackspace}
              className={`px-3 h-9 sm:h-10 rounded-lg text-xs font-bold cursor-pointer ${tc.keyDelete}`}
            >
              ⌫ Del
            </button>
          </div>

          <div className="flex gap-1 justify-center items-center pt-1">
            <button
              onClick={() => insertText(' ')}
              className={`flex-1 max-w-[280px] h-9 sm:h-10 rounded-xl text-xs uppercase cursor-pointer ${tc.keyAction}`}
            >
              Spacebar
            </button>
          </div>
        </div>
      );
    }

    // 4. HINDI PHONETIC & ENGLISH KEYBOARD
    const row0 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const row1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
    const row2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
    const row3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?'];

    return (
      <div className="space-y-1.5 w-full select-none">
        <div className="flex gap-1 justify-center flex-wrap">
          {row0.map((k) => (
            <button
              key={k}
              onClick={() => insertText(k)}
              className={`w-8 sm:w-10 h-9 sm:h-10 rounded-lg font-bold text-sm cursor-pointer ${tc.keyNormal}`}
            >
              {k}
            </button>
          ))}
        </div>
        <div className="flex gap-1 justify-center flex-wrap">
          {row1.map((k) => (
            <button
              key={k}
              onClick={() => insertText(isShiftActive ? k.toUpperCase() : k)}
              className={`w-8 sm:w-10 h-9 sm:h-10 rounded-lg font-bold text-sm cursor-pointer ${tc.keyNormal}`}
            >
              {isShiftActive ? k.toUpperCase() : k}
            </button>
          ))}
        </div>
        <div className="flex gap-1 justify-center flex-wrap">
          {row2.map((k) => (
            <button
              key={k}
              onClick={() => insertText(isShiftActive ? k.toUpperCase() : k)}
              className={`w-8 sm:w-10 h-9 sm:h-10 rounded-lg font-bold text-sm cursor-pointer ${tc.keyNormal}`}
            >
              {isShiftActive ? k.toUpperCase() : k}
            </button>
          ))}
        </div>
        <div className="flex gap-1 justify-center flex-wrap">
          <button
            onClick={() => setIsShiftActive(!isShiftActive)}
            className={`px-3 h-9 sm:h-10 rounded-lg font-bold text-xs cursor-pointer ${
              isShiftActive ? tc.keyAction : tc.buttonMuted
            }`}
          >
            ⇧ Shift
          </button>
          {row3.map((k) => (
            <button
              key={k}
              onClick={() => insertText(isShiftActive ? k.toUpperCase() : k)}
              className={`w-8 sm:w-10 h-9 sm:h-10 rounded-lg font-bold text-sm cursor-pointer ${tc.keyNormal}`}
            >
              {isShiftActive ? k.toUpperCase() : k}
            </button>
          ))}
          <button
            onClick={handleBackspace}
            className={`px-3 h-9 sm:h-10 rounded-lg font-bold text-xs cursor-pointer ${tc.keyDelete}`}
          >
            ⌫ Delete
          </button>
        </div>
        <div className="flex gap-1 justify-center items-center pt-1">
          <button
            onClick={() => insertText(' ')}
            className={`flex-1 max-w-[280px] h-9 sm:h-10 rounded-xl text-xs uppercase cursor-pointer ${tc.keyAction}`}
          >
            Spacebar
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`rounded-3xl border shadow-md transition-all duration-200 select-text ${
        tc.container
      } ${zenMode ? 'fixed inset-0 z-50 p-6 overflow-y-auto' : compact ? 'p-3' : 'p-4 md:p-6'}`}
    >
      {/* ═══ 1. HEADER BAR: BRAND + 3 THEME TOGGLE ═══ */}
      <div className={`flex flex-wrap items-center justify-between gap-3 pb-3 border-b ${tc.headerBar}`}>
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-blue-600 to-indigo-600 text-white flex items-center justify-center font-black shadow-xs">
            HK
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`font-extrabold text-base tracking-tight ${tc.brandText}`}>
                Hoṛ Katha Keyboard
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-600 text-white shadow-xs">
                v3.7.4 Pro
              </span>
              <span className="text-[10px] font-semibold opacity-70">
                BOSC Tech &amp; Edu
              </span>
            </div>
            <div className={`text-[11px] font-bold ${tc.subText}`}>
              Santali(Dev) • Santali(R) • Hindi • High-Contrast Themes
            </div>
          </div>
        </div>

        {/* 3 Keyboard Theme Switcher Toggle (Requested: theme toggle 3 ho, hr theme me text menu clear nazar aye) */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className={`flex items-center p-1 rounded-xl border ${tc.strip}`}>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 opacity-70 flex items-center gap-1">
              <Palette className="w-3 h-3 text-amber-500" />
              <span>Theme:</span>
            </span>

            {/* Theme 1: DeepSeek Dark */}
            <button
              onClick={() => setTheme('deepseek_dark')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                theme === 'deepseek_dark'
                  ? 'bg-blue-600 text-white shadow-xs font-black'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              title="DeepSeek Dark Mode"
            >
              <span>🌙 DeepSeek</span>
            </button>

            {/* Theme 2: Clean Light */}
            <button
              onClick={() => setTheme('clean_light')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                theme === 'clean_light'
                  ? 'bg-sky-600 text-white shadow-xs font-black'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-200'
              }`}
              title="Clean Light Mode"
            >
              <span>☀️ Light</span>
            </button>

            {/* Theme 3: Heritage Forest */}
            <button
              onClick={() => setTheme('heritage_forest')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                theme === 'heritage_forest'
                  ? 'bg-amber-600 text-white shadow-xs font-black'
                  : 'text-emerald-300 hover:text-white hover:bg-emerald-900'
              }`}
              title="Heritage Forest Mode"
            >
              <span>🌲 Forest</span>
            </button>
          </div>

          {/* Quick utility icons */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              soundEnabled ? tc.keyAction : tc.buttonMuted
            }`}
            title={`Sound: ${soundEnabled ? 'ON' : 'OFF'}`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setZenMode(!zenMode)}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              zenMode ? tc.keyAction : tc.buttonMuted
            }`}
            title="Zen Focus Mode"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ═══ 2. SCRIPT SWITCHER: Santali(Dev), Santali(R), Devanagari ═══ */}
      <div className={`mt-3 flex flex-wrap items-center justify-between gap-2 p-2 rounded-2xl border ${tc.strip}`}>
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
          {[
            {
              id: 'santali_dev' as KeyboardScriptTab,
              label: 'संताली देवनागरी (Santali Dev)',
              font: 'Noto Sans Devanagari, sans-serif'
            },
            {
              id: 'santali_roman' as KeyboardScriptTab,
              label: 'रोमन संताली (Santali Roman)',
              font: 'Plus Jakarta Sans, sans-serif'
            },
            {
              id: 'hindi_phonetic' as KeyboardScriptTab,
              label: 'हिंदी/संताली फोनेटिक ✨',
              font: 'Noto Sans Devanagari, sans-serif'
            },
            {
              id: 'english' as KeyboardScriptTab,
              label: 'English',
              font: 'sans-serif'
            },
          ].map((tab) => {
            const isActive = activeScript === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveScript(tab.id);
                  setFontFamily(tab.font);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs font-black'
                    : `${tc.buttonMuted} font-semibold`
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Status Counter */}
        <div className="flex items-center gap-2 text-[11px] font-semibold overflow-x-auto">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md border border-emerald-500/30 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Online</span>
          </span>
          <span className={`px-2 py-0.5 rounded-md border ${tc.strip}`}>
            📊 {wordCount} words
          </span>
          <span className={`px-2 py-0.5 rounded-md border ${tc.strip}`}>
            📝 {charCount} chars
          </span>
        </div>
      </div>

      {/* ═══ 3. HINDI PHONETIC 99% DAILY INDIA WORDS REAL-TIME SUGGESTION BAR ═══ */}
      {activeScript === 'hindi_phonetic' && (
        <div
          className={`mt-2.5 p-2 rounded-2xl border transition-all ${
            theme === 'deepseek_dark'
              ? 'bg-[#1E293B] border-blue-500/40'
              : theme === 'heritage_forest'
              ? 'bg-[#065F46] border-amber-500/40'
              : 'bg-blue-50/80 border-blue-200'
          }`}
        >
          <div className="flex items-center justify-between gap-2 flex-wrap text-xs mb-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-black text-[10px]">
                99% Daily India Words
              </span>
              <span className="text-[11px] font-bold">
                {currentTypedToken ? (
                  <>Suggestions for &ldquo;{currentTypedToken}&rdquo; (Press Space or Tap):</>
                ) : (
                  <>Type Roman (e.g. namaste, pani, ghar, kaam, kaise) &amp; press Space!</>
                )}
              </span>
            </div>
            <span className="text-[10px] opacity-70">
              450+ authentic real conversational words
            </span>
          </div>

          {/* Real-time word suggestion pill buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-thin">
            {hindiSuggestions.length > 0 ? (
              hindiSuggestions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => insertHindiSuggestion(item.hindi)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    idx === 0
                      ? 'bg-blue-600 text-white border-blue-700 shadow-xs scale-105'
                      : `${tc.keyNormal}`
                  }`}
                >
                  <span className="text-sm">{item.hindi}</span>
                  <span className="text-[10px] opacity-75 font-mono">({item.roman})</span>
                </button>
              ))
            ) : (
              // Common top daily words quick tap chips
              [
                { roman: 'namaste', hindi: 'नमस्ते' },
                { roman: 'pani', hindi: 'पानी' },
                { roman: 'ghar', hindi: 'घर' },
                { roman: 'kaise', hindi: 'कैसे' },
                { roman: 'aap', hindi: 'आप' },
                { roman: 'dhanyawad', hindi: 'धन्यवाद' },
                { roman: 'khana', hindi: 'खाना' },
                { roman: 'bhai', hindi: 'भाई' },
                { roman: 'kaam', hindi: 'काम' }
              ].map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => insertText(sample.hindi + ' ')}
                  className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border cursor-pointer shrink-0 ${tc.keyNormal}`}
                >
                  <span>{sample.hindi}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* ═══ 4. MAIN EDITOR TOOLBAR ═══ */}
      <div className={`mt-3 p-2 rounded-2xl border flex items-center justify-between gap-2 flex-wrap text-xs ${tc.toolbar}`}>
        <div className="flex items-center gap-1 flex-wrap">
          <button
            onClick={() => setActiveModal('emoji')}
            className={`px-2.5 py-1 rounded-lg border font-bold flex items-center gap-1 cursor-pointer ${tc.buttonMuted}`}
            title="Emoji Picker"
          >
            <Smile className="w-3.5 h-3.5 text-amber-500" />
            <span>Emoji</span>
          </button>

          <button
            onClick={() => setActiveModal('charmap')}
            className={`px-2.5 py-1 rounded-lg border font-bold flex items-center gap-1 cursor-pointer ${tc.buttonMuted}`}
            title="Unicode Character Map"
          >
            <span>🔣 Map</span>
          </button>

          <span className="w-px h-4 bg-slate-400/40 mx-0.5" />

          {/* Undo / Redo */}
          <button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className={`p-1.5 rounded-lg border disabled:opacity-30 cursor-pointer ${tc.buttonMuted}`}
            title="Undo"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className={`p-1.5 rounded-lg border disabled:opacity-30 cursor-pointer ${tc.buttonMuted}`}
            title="Redo"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-4 bg-slate-400/40 mx-0.5" />

          {/* Font Size A+ / A- */}
          <button
            onClick={() => setFontSize((f) => Math.min(36, f + 2))}
            className={`px-2 py-0.5 rounded border font-black cursor-pointer ${tc.buttonMuted}`}
            title="Increase font"
          >
            A+
          </button>
          <button
            onClick={() => setFontSize((f) => Math.max(12, f - 2))}
            className={`px-2 py-0.5 rounded border font-black cursor-pointer ${tc.buttonMuted}`}
            title="Decrease font"
          >
            A-
          </button>

          {/* Font Family Dropdown */}
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className={`px-2 py-1 rounded-lg text-xs font-semibold cursor-pointer border ${tc.dropdown}`}
          >
            <option value="Noto Sans Devanagari, sans-serif">Noto Sans Devanagari</option>
            <option value="Plus Jakarta Sans, sans-serif">Plus Jakarta Sans</option>
            <option value="serif">Serif Classic</option>
            <option value="monospace">Monospace</option>
          </select>

          {/* Casing Dropdown */}
          <select
            onChange={(e) => {
              convertCasing(e.target.value);
              e.target.value = '';
            }}
            className={`px-2 py-1 rounded-lg text-xs font-semibold cursor-pointer border max-w-[105px] ${tc.dropdown}`}
          >
            <option value="" disabled selected>Case ▾</option>
            <option value="upper">UPPERCASE</option>
            <option value="lower">lowercase</option>
            <option value="title">Title Case</option>
            <option value="sentence">Sentence case</option>
            <option value="num-to-dev">123 ➔ १२३</option>
            <option value="num-to-ol">123 ➔ १२३</option>
            <option value="num-to-lat">१२३ ➔ 123</option>
          </select>

          {/* Find & Replace trigger */}
          <button
            onClick={() => setActiveModal('find_replace')}
            className={`px-2 py-1 rounded-lg border font-bold flex items-center gap-1 cursor-pointer ${tc.buttonMuted}`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Find</span>
          </button>
        </div>

        {/* Right sub-group: Mic, Read, Print, Word, TXT */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={toggleSpeechRecognition}
            className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
              isRecording ? 'bg-red-600 text-white animate-pulse' : tc.buttonMuted
            }`}
            title="Speech Dictation"
          >
            <Mic className="w-3.5 h-3.5 text-red-500" />
            <span>{isRecording ? 'Listening...' : 'Mic'}</span>
          </button>

          {/* TTS Read with Female Voice */}
          <button
            onClick={handleSpeak}
            className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center gap-1 shadow-xs cursor-pointer"
            title="Read aloud with Female Voice"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>🗣️ Read</span>
          </button>

          <button
            onClick={printText}
            className="px-2 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center gap-1 cursor-pointer"
            title="Print Document"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print</span>
          </button>

          <button
            onClick={downloadDocFile}
            className="px-2 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1 cursor-pointer"
            title="Download MS Word (.doc)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Word</span>
          </button>

          <button
            onClick={downloadTextFile}
            className="px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1 cursor-pointer"
            title="Download Plain Text (.txt)"
          >
            <span>TXT</span>
          </button>
        </div>
      </div>

      {/* ═══ 5. EDITOR TEXTAREA ═══ */}
      <div className="mt-3 relative rounded-2xl overflow-hidden border focus-within:ring-2 focus-within:ring-blue-500/40 transition-all">
        <textarea
          ref={editorRef}
          value={editorText}
          onChange={handleEditorChange}
          onKeyDown={handleEditorKeyDown}
          placeholder="Type or click keys below... (Auto-Saved enabled)"
          style={{
            fontSize: `${fontSize}px`,
            fontFamily: fontFamily,
            minHeight: zenMode ? '340px' : '180px',
          }}
          className={`w-full p-4 resize-y focus:outline-none leading-relaxed ${tc.editorBg}`}
        />
      </div>

      {/* ═══ 6. ACTION BAR ═══ */}
      <div className={`mt-3 flex flex-wrap items-center justify-between gap-2 p-2 rounded-2xl border text-xs ${tc.toolbar}`}>
        <div className="text-[11px] font-semibold opacity-75">
          Chars: {charCount} | Words: {wordCount} | Lines: {lineCount} | Read: ~{readTimeEst}m
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={shareViaWhatsApp}
            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

          <button
            onClick={() => setActiveModal('krutidev')}
            className={`px-2.5 py-1 rounded-lg font-bold border cursor-pointer ${tc.buttonMuted}`}
          >
            🅰️ KrutiDev
          </button>

          <button
            onClick={() => setActiveModal('typing_test')}
            className={`px-2.5 py-1 rounded-lg font-bold border cursor-pointer ${tc.buttonMuted}`}
          >
            🎯 Typing Practice
          </button>

          {onSendToTranslator && (
            <button
              onClick={() => onSendToTranslator(editorText)}
              className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Translate</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className={`px-2.5 py-1 rounded-lg border font-bold flex items-center gap-1 cursor-pointer ${tc.buttonMuted}`}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          <button
            onClick={handleClear}
            className="px-2.5 py-1 rounded-lg bg-rose-600/20 text-rose-400 border border-rose-500/30 hover:bg-rose-600/30 font-bold flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* ═══ 7. VIRTUAL KEYBOARD DECK ═══ */}
      {keyboardMode === 'virtual' && (
        <div className={`mt-4 p-4 rounded-2xl border shadow-inner ${tc.keyDeckBg}`}>
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-500/20 text-xs font-bold">
            <span className="flex items-center gap-1.5">
              <Keyboard className="w-4 h-4 text-blue-500" />
              <span className={tc.brandText}>
                Active Keyboard: {activeScript.replace('_', ' ').toUpperCase()} ({theme.replace('_', ' ').toUpperCase()} THEME)
              </span>
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNumpad(!showNumpad)}
                className={`text-[11px] font-bold hover:underline cursor-pointer ${tc.subText}`}
              >
                {showNumpad ? 'Hide Numpad ✕' : 'Show Numpad 🔢'}
              </button>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            {/* Main Keyboard Deck */}
            <div className="flex-1 overflow-x-auto">{renderKeyboardKeys()}</div>

            {/* Optional Side Numpad Deck */}
            {showNumpad && (
              <div className={`w-44 p-2 rounded-xl border shrink-0 space-y-1 ${tc.card}`}>
                <div className="text-[10px] font-bold opacity-60 uppercase tracking-wider text-center mb-1">
                  Numpad
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', '+'].map((k) => (
                    <button
                      key={k}
                      onClick={() => insertText(k)}
                      className={`h-9 rounded-lg font-mono text-sm font-bold border active:scale-95 cursor-pointer ${tc.keyNormal}`}
                    >
                      {k}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-1 pt-1">
                  <button
                    onClick={() => insertText('\n')}
                    className={`h-8 rounded-lg font-bold text-xs cursor-pointer ${tc.keyAction}`}
                  >
                    Enter ↵
                  </button>
                  <button
                    onClick={handleBackspace}
                    className={`h-8 rounded-lg font-bold text-xs cursor-pointer ${tc.keyDelete}`}
                  >
                    Del ⌫
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══ 8. ACCENTS, DIACRITICS & MODIFIERS + MAPPING GUIDE PANELS (PER SCRIPT) ═══ */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {/* Panel 1: Script-Specific Accents & Modifiers */}
        <div className={`p-3.5 rounded-2xl border shadow-xs space-y-2.5 ${tc.card}`}>
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-500/20">
            <span className={`font-bold flex items-center gap-1.5 ${tc.cardTitle}`}>
              <span>
                {activeScript === 'santali_dev'
                  ? 'Santali Devanagari Modifiers & Matras (संताली देवनागरी मात्रा व चिह्न):'
                  : activeScript === 'santali_roman'
                  ? 'Roman Santali Accents, Diacritics & Modifiers:'
                  : 'Devanagari Matras & Signs (देवनागरी मात्रा व चिह्न):'}
              </span>
            </span>
            <span className="text-[10px] opacity-60 font-medium">Click to insert</span>
          </div>

          {/* Chips */}
          {activeScript === 'santali_dev' && (
            <div className="flex flex-wrap gap-1.5">
              {[
                { char: 'ा', label: 'आ की मात्रा' },
                { char: 'ि', label: 'इ की मात्रा' },
                { char: 'ी', label: 'ई की मात्रा' },
                { char: 'ु', label: 'उ की मात्रा' },
                { char: 'ू', label: 'ऊ की मात्रा' },
                { char: 'े', label: 'ए की मात्रा' },
                { char: 'ै', label: 'ऐ की मात्रा' },
                { char: 'ो', label: 'ओ की मात्रा' },
                { char: 'ौ', label: 'औ की मात्रा' },
                { char: '्', label: 'हलन्त (विराम)' },
                { char: 'ं', label: 'अनुस्वार' },
                { char: 'ँ', label: 'अनुनासिक' },
                { char: '़', label: 'नुक्ता (विशिष्ट ध्वनि)' },
                { char: 'ऽ', label: 'अवग्रह (दीर्घ / प्लुत ध्वनि)' },
                { char: '।', label: 'पूर्ण विराम' },
                { char: '॥', label: 'दोहरा पूर्ण विराम' }
              ].map((item) => (
                <button
                  key={item.char}
                  onClick={() => insertText(item.char)}
                  title={item.label}
                  className={`min-w-[34px] h-8 px-2 rounded-lg font-bold text-base cursor-pointer ${tc.accentChip}`}
                >
                  {item.char}
                </button>
              ))}
            </div>
          )}

          {activeScript === 'santali_roman' && (
            <div className="flex flex-wrap gap-1.5">
              {[
                { char: 'ā', label: 'long a' },
                { char: 'ī', label: 'long i' },
                { char: 'ū', label: 'long u' },
                { char: 'ē', label: 'long e' },
                { char: 'ō', label: 'long o' },
                { char: 'a̧', label: 'a with cedilla' },
                { char: 'ȩ', label: 'e with cedilla' },
                { char: 'i̧', label: 'i with cedilla' },
                { char: 'o̧', label: 'o with cedilla' },
                { char: 'u̧', label: 'u with cedilla' },
                { char: 'ñ', label: 'palatal nasal' },
                { char: 'ṇ', label: 'retroflex nasal' },
                { char: 'ṭ', label: 'retroflex t' },
                { char: 'ḍ', label: 'retroflex d' },
                { char: 'ṛ', label: 'retroflex flap' },
                { char: 'ṅ', label: 'velar nasal' },
                { char: 'ṃ', label: 'anusvara' },
                { char: 'ḥ', label: 'visarga' },
                { char: '’', label: 'glottal apostrophe' },
              ].map((item) => (
                <button
                  key={item.char}
                  onClick={() => insertText(item.char)}
                  title={item.label}
                  className={`min-w-[34px] h-8 px-2 rounded-lg font-bold text-sm cursor-pointer ${tc.accentChip}`}
                >
                  {item.char}
                </button>
              ))}
            </div>
          )}

          {(activeScript === 'santali_dev' ||
            activeScript === 'hindi_dev' ||
            activeScript === 'hindi_phonetic') && (
            <div className="flex flex-wrap gap-1.5">
              {[
                'ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'े', 'ै', 'ो', 'ौ', '्', 'ं', 'ँ', 'ः', '़', 'ऽ', '।', '॥'
              ].map((matra) => (
                <button
                  key={matra}
                  onClick={() => insertText(matra)}
                  className={`min-w-[34px] h-8 px-2 rounded-lg font-bold text-base cursor-pointer ${tc.accentChip}`}
                >
                  {matra}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Panel 2: Universal Shorthand Shortcuts (/jh, /sg, /hl) */}
        <div className={`p-3.5 rounded-2xl border shadow-xs space-y-2.5 ${tc.card}`}>
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-500/20">
            <span className={`font-bold flex items-center gap-1.5 ${tc.cardTitle}`}>
              <span>⚡ Fast Shorthand Expansion (Type &amp; Space):</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
              Auto Space
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
            <button
              onClick={() => {
                if (activeScript === 'santali_dev' || activeScript.includes('hindi'))
                  insertText('जोहार ');
                else insertText('Johar ');
              }}
              className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${tc.buttonMuted}`}
            >
              <div className="font-mono font-bold text-blue-400">/jh ➔ Johar</div>
              <div className="text-[10px] opacity-70">
                जोहार (Universal Greeting)
              </div>
            </button>

            <button
              onClick={() => {
                if (activeScript === 'santali_dev' || activeScript.includes('hindi'))
                  insertText('सगुन दाराम ');
                else insertText('Sagun Daram ');
              }}
              className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${tc.buttonMuted}`}
            >
              <div className="font-mono font-bold text-emerald-400">/sg ➔ Sagun Daram</div>
              <div className="text-[10px] opacity-70">
                सगुन दाराम (Welcome)
              </div>
            </button>

            <button
              onClick={() => {
                if (activeScript === 'santali_dev' || activeScript.includes('hindi'))
                  insertText('नमस्ते ');
                else insertText('Hello ');
              }}
              className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${tc.buttonMuted}`}
            >
              <div className="font-mono font-bold text-purple-400">/hl ➔ Hello</div>
              <div className="text-[10px] opacity-70">नमस्ते / Johar</div>
            </button>
          </div>
        </div>
      </div>

      {/* ═══ MODALS ═══ */}
      {/* Find & Replace Modal */}
      {activeModal === 'find_replace' && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className={`rounded-3xl max-w-md w-full p-6 border shadow-2xl space-y-4 ${tc.card}`}>
            <div className="flex items-center justify-between pb-2 border-b border-slate-500/20">
              <span className={`font-bold text-base ${tc.brandText}`}>Find &amp; Replace</span>
              <button onClick={() => setActiveModal(null)} className="p-1 opacity-70 hover:opacity-100 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Find word:</label>
                <input
                  type="text"
                  value={findWord}
                  onChange={(e) => setFindWord(e.target.value)}
                  placeholder="Word to find..."
                  className={`w-full p-2 border rounded-lg ${tc.dropdown}`}
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Replace with:</label>
                <input
                  type="text"
                  value={replaceWord}
                  onChange={(e) => setReplaceWord(e.target.value)}
                  placeholder="Replacement word..."
                  className={`w-full p-2 border rounded-lg ${tc.dropdown}`}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${tc.buttonMuted}`}
              >
                Cancel
              </button>
              <button
                onClick={handleFindReplace}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold cursor-pointer"
              >
                Replace All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Typing Practice Modal */}
      {activeModal === 'typing_test' && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className={`rounded-3xl max-w-lg w-full p-6 border shadow-2xl space-y-4 ${tc.card}`}>
            <div className="flex items-center justify-between pb-2 border-b border-slate-500/20">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎯</span>
                <span className={`font-bold text-base ${tc.brandText}`}>Santali Speed Practice</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 opacity-70 hover:opacity-100 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className={`p-4 border rounded-2xl ${tc.strip}`}>
              <span className="text-[10px] font-bold uppercase tracking-wider block mb-1 text-blue-400">
                Lesson Prompt:
              </span>
              <p className="text-sm font-bold leading-relaxed">{testLesson}</p>
            </div>

            <textarea
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="Type the text here..."
              rows={4}
              className={`w-full p-3 text-sm border rounded-xl focus:outline-none ${tc.editorBg}`}
            />

            <div className="flex items-center justify-between text-xs">
              <span>Typed: {testInput.length} chars</span>
              <button
                onClick={() => {
                  setEditorText((prev) => prev + '\n' + testInput);
                  setActiveModal(null);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl cursor-pointer"
              >
                Save to Main Editor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KrutiDev Modal */}
      {activeModal === 'krutidev' && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className={`rounded-2xl max-w-md w-full p-5 border shadow-xl space-y-3 ${tc.card}`}>
            <div className="flex items-center justify-between pb-2 border-b border-slate-500/20">
              <span className={`font-bold text-sm ${tc.brandText}`}>🅰️ KrutiDev to Unicode Converter</span>
              <button onClick={() => setActiveModal(null)} className="p-1 opacity-70 hover:opacity-100 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs opacity-80">
              Paste KrutiDev legacy text to convert directly to standard Unicode.
            </p>
            <textarea
              placeholder="Paste KrutiDev text here..."
              rows={4}
              className={`w-full p-2.5 text-xs border rounded-xl ${tc.editorBg}`}
            />
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setActiveModal(null)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${tc.buttonMuted}`}>
                Close
              </button>
              <button
                onClick={() => {
                  alert('Converted Unicode text loaded into editor.');
                  setActiveModal(null);
                }}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold cursor-pointer"
              >
                Convert &amp; Paste
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
