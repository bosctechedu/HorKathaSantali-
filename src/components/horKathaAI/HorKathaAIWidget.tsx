// Floating "Hor Katha AI सहायक" — a port of EDISAM's floating AI assistant (bubble "Ask me anything!"
// with the AI Assistant Face). This file is only the bubble; the chat card is lazy-loaded on first open.
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import type { ActiveDesktopTab } from '../../types';
import { AI_AVATAR_KEY, AI_DEFAULT_AVATAR, AI_NAME, AI_ROTATING_TEXTS, OPEN_AI_EVENT } from './shared';

const HorKathaAIPanel = lazy(() => import('./HorKathaAIPanel'));

interface Props {
  onNavigateTab: (tab: ActiveDesktopTab) => void;
}

export const HorKathaAIWidget: React.FC<Props> = ({ onNavigateTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string>(() => {
    try { return localStorage.getItem(AI_AVATAR_KEY) || AI_DEFAULT_AVATAR; } catch { return AI_DEFAULT_AVATAR; }
  });

  const changeAvatar = (src: string) => {
    setAvatar(src);
    try { localStorage.setItem(AI_AVATAR_KEY, src); } catch { /* storage full */ }
  };

  // Rotate the speech bubble text every 3 s while closed (EDISAM behaviour)
  useEffect(() => {
    if (isOpen) return;
    const id = setInterval(() => setTextIndex((i) => (i + 1) % AI_ROTATING_TEXTS.length), 3000);
    return () => clearInterval(id);
  }, [isOpen]);

  // Other parts of the site (sidebar entry, Ctrl+K search result) open the assistant through this event
  useEffect(() => {
    const onOpen = (e: Event) => {
      const prompt = (e as CustomEvent<{ prompt?: string }>).detail?.prompt;
      if (prompt && prompt.trim()) setPendingPrompt(prompt.trim());
      setIsOpen(true);
    };
    window.addEventListener(OPEN_AI_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_AI_EVENT, onOpen);
  }, []);

  return (
    // Sits just above the site's floating Home button (bottom-6 right-6) so the two never overlap
    <div className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 z-[60]">
      <AnimatePresence>
        {!isOpen && (
          <div className="relative flex flex-col items-end">
            <div className="mb-2 relative cursor-pointer group select-none" onClick={() => setIsOpen(true)}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={textIndex}
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -10 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-2xl shadow-rose-950/40 font-extrabold text-xs sm:text-sm tracking-wide whitespace-nowrap flex items-center gap-2 border border-white/30 select-none hover:scale-105 transition duration-200"
                >
                  <Sparkles className="w-4 h-4 text-amber-200 animate-spin" />
                  <span>{AI_ROTATING_TEXTS[textIndex]}</span>
                </motion.div>
              </AnimatePresence>
              <div className="absolute -bottom-1.5 right-6 w-3.5 h-3.5 bg-pink-600 rotate-45 rounded-xs pointer-events-none border-r border-b border-white/20" />
            </div>
            <motion.button
              id="ai-assistant-bubble"
              onClick={() => setIsOpen(true)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="relative p-1 rounded-full cursor-pointer transition-all duration-200 group focus:outline-none select-none shadow-xl"
              title={AI_NAME}
              aria-label={AI_NAME}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-pink-600 animate-pulse opacity-85 blur-[3px] group-hover:opacity-100 transition-opacity" />
              <div className="relative w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-slate-900 p-[2.5px] bg-blue-600 border-[3.5px] border-red-600 shadow-2xl overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src={avatar}
                  alt="Hor Katha AI Assistant Face"
                  referrerPolicy="no-referrer"
                  onError={() => avatar !== AI_DEFAULT_AVATAR && changeAvatar(AI_DEFAULT_AVATAR)}
                  className="w-full h-full object-cover object-[center_20%] scale-125 group-hover:scale-130 transition duration-300 rounded-full"
                />
              </div>
              <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 shadow-md flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              </div>
            </motion.button>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <Suspense key="hk-ai-panel" fallback={null}>
            <HorKathaAIPanel
              onClose={() => setIsOpen(false)}
              avatar={avatar}
              onAvatarChange={changeAvatar}
              onNavigateTab={onNavigateTab}
              pendingPrompt={pendingPrompt}
              onPromptConsumed={() => setPendingPrompt(null)}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HorKathaAIWidget;
