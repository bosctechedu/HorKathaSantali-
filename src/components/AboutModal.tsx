import React from 'react';
import { CulturalTree } from './CulturalTree';
import { X, Sparkles, Heart, Globe2, BookOpen, ShieldCheck } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const { heroConfig } = useAdmin();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center">
            <CulturalTree variant="emblem" className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Hor Katha Suite</h3>
            <p className="text-xs text-amber-800 font-semibold">
              v3.7.4 Pro Ultra · BOSC Tech &amp; Edu
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            <strong>Hor Katha Suite</strong> is an integrated digital platform dedicated to preserving, promoting, and democratizing the <strong>Santali language (संताली)</strong> and its rich <strong>Santali Devanagari script</strong> and oral traditions.
          </p>

          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/80 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>BOSC Tech &amp; Edu Mission</span>
            </div>
            <p className="text-amber-950">
              Empowering indigenous and tribal linguistic communities with modern, open-access digital tools: smart on-screen typing keyboards, cultural festival chronicles, multi-language dictionaries, and interactive educational sandboxes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800 block">100% Free &amp; Open</span>
              <span className="text-slate-500">Accessible to learners, researchers &amp; communities worldwide.</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800 block">Multi-Platform</span>
              <span className="text-slate-500">Built for Desktop, Tablet, and Mobile Android devices.</span>
            </div>
          </div>

          <p className="italic text-center font-serif text-slate-700 pt-2 border-t border-slate-100 text-xs">
            "{heroConfig.quoteEnglish || 'Our Language, Our Identity, Our Pride'}" · {heroConfig.quoteSantali || 'संताली भाषा आबोवाक उपरुम'}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Close &amp; Continue
          </button>
        </div>
      </div>
    </div>
  );
};
