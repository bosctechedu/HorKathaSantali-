/**
 * Voice Search & Speech Recognition Engine for Hor Katha Suite.
 * Supports Web Speech API (SpeechRecognition / webkitSpeechRecognition)
 * with multi-language recognition (Hindi/Devanagari 'hi-IN' & English 'en-IN'/'en-US'),
 * real-time transcript streaming, gentle audio cues, and error handling.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { playAcousticChime } from './speech';

// Type definitions for Web Speech API
interface SpeechRecognitionEventLike extends Event {
  results: {
    length: number;
    item(index: number): {
      isFinal: boolean;
      length: number;
      item(index: number): {
        transcript: string;
        confidence: number;
      };
      [index: number]: {
        transcript: string;
        confidence: number;
      };
    };
    [index: number]: {
      isFinal: boolean;
      length: number;
      item(index: number): {
        transcript: string;
        confidence: number;
      };
      [index: number]: {
        transcript: string;
        confidence: number;
      };
    };
  };
  resultIndex: number;
}

interface SpeechRecognitionErrorEventLike extends Event {
  error: string;
  message?: string;
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition
  );
}

export interface UseVoiceSearchOptions {
  defaultLang?: string; // 'hi-IN' (default for Santali Devanagari phonetics) or 'en-IN' / 'en-US'
  onResult?: (transcript: string) => void;
  onError?: (errorMessage: string) => void;
}

export function useVoiceSearch(options: UseVoiceSearchOptions = {}) {
  const { defaultLang = 'hi-IN', onResult, onError } = options;
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [lang, setLang] = useState<string>(defaultLang);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isSupported = isSpeechRecognitionSupported();

  const recognitionRef = useRef<any>(null);
  const onResultRef = useRef(onResult);
  onResultRef.current = onResult;

  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore already stopped
      }
    }
    setIsListening(false);
    playAcousticChime(440, 0.1);
  }, []);

  const startListening = useCallback(() => {
    if (!isSpeechRecognitionSupported()) {
      const msg = 'आपके ब्राउज़र में वॉइस सर्च (Speech Recognition) समर्थित नहीं है। कृपया Chrome, Edge, या Safari का उपयोग करें।';
      setErrorMessage(msg);
      if (onErrorRef.current) onErrorRef.current(msg);
      return;
    }

    setErrorMessage(null);
    setTranscript('');
    setInterimTranscript('');

    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }

      const recognition = new SpeechRecognitionClass();
      recognitionRef.current = recognition;

      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = lang;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        // Pleasant start chime
        playAcousticChime(650, 0.15);
      };

      recognition.onresult = (event: SpeechRecognitionEventLike) => {
        let currentInterim = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          const text = item[0].transcript;
          if (item.isFinal) {
            finalTranscript += text;
          } else {
            currentInterim += text;
          }
        }

        if (currentInterim) {
          setInterimTranscript(currentInterim);
        }

        if (finalTranscript) {
          const cleaned = finalTranscript.trim();
          setTranscript(cleaned);
          setInterimTranscript('');
          if (onResultRef.current) {
            onResultRef.current(cleaned);
          }
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEventLike) => {
        let errDesc = 'वॉइस सर्च में त्रुटि हुई। कृपया पुनः प्रयास करें।';
        if (event.error === 'not-allowed') {
          errDesc = 'माइक्रोफ़ोन की अनुमति अस्वीकृत है। कृपया ब्राउज़र सेटिंग्स में माइक्रोफ़ोन की अनुमति दें।';
        } else if (event.error === 'no-speech') {
          errDesc = 'कोई आवाज़ सुनाई नहीं दी। कृपया माइक्रोफ़ोन के करीब बोलें।';
        } else if (event.error === 'network') {
          errDesc = 'नेटवर्क कनेक्शन की समस्या है।';
        }
        setErrorMessage(errDesc);
        setIsListening(false);
        if (onErrorRef.current) onErrorRef.current(errDesc);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err: any) {
      console.warn('SpeechRecognition failed to start:', err);
      const msg = 'माइक्रोफ़ोन शुरू करने में समस्या आई।';
      setErrorMessage(msg);
      setIsListening(false);
      if (onErrorRef.current) onErrorRef.current(msg);
    }
  }, [lang]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    lang,
    setLang,
    errorMessage,
    clearError: () => setErrorMessage(null),
    startListening,
    stopListening,
    toggleListening
  };
}
