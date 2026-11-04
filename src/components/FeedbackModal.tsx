import React, { useState } from 'react';
import {
  MessageSquareHeart,
  X,
  Star,
  CheckCircle2,
  Sparkles,
  Send,
  MapPin,
  User,
  HeartHandshake
} from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [category, setCategory] = useState<'suggestion' | 'word_addition' | 'translation_fix' | 'appreciation'>('suggestion');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const existing = JSON.parse(localStorage.getItem('hor_katha_user_feedbacks') || '[]');
      const newFeedback = {
        id: Date.now(),
        name: name.trim() || 'Anonymous Native Speaker',
        region: region.trim() || 'Santhal Community',
        category,
        rating,
        message: message.trim(),
        date: new Date().toISOString()
      };
      localStorage.setItem('hor_katha_user_feedbacks', JSON.stringify([newFeedback, ...existing]));
    } catch {
      // storage handling
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setRegion('');
    setMessage('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header Strip */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-xs">
              <MessageSquareHeart className="w-6 h-6 text-amber-100" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-200">
                Community Voice &amp; Ideas
              </span>
              <h2 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                <span>Feedback &amp; Suggestions</span>
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Warm Welcome Banner Message */}
          <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/90 rounded-2xl relative overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-500 text-white rounded-xl shadow-xs shrink-0 mt-0.5">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-amber-950">
                    Johar! Welcome to Hor Katha Suite Feedback!
                  </h3>
                  <span className="text-[10px] font-serif font-bold px-2 py-0.5 bg-amber-200/70 text-amber-900 rounded-md">
                    सागुनदाराम
                  </span>
                </div>
                <p className="text-xs text-amber-900/90 leading-relaxed">
                  We warmly welcome your voice! Whether you wish to recommend new Santali words, correct a translation, refine Santali Devanagari characters, or share your appreciation, your feedback is deeply valued.
                </p>
                <p className="text-[11px] font-semibold text-amber-800 pt-0.5">
                  “Our Language, Our Identity, Our Pride · BOSC Tech &amp; Edu”
                </p>
              </div>
            </div>
          </div>

          {isSubmitted ? (
            /* Submission Success State */
            <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-slate-900 font-serif">
                  सारहाव! आमाक काथा ञामेना!
                </h4>
                <p className="text-base font-bold text-emerald-800">
                  Johar! Thank you for your valuable feedback!
                </p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Your suggestions have been recorded and will help our lexicographers and engineers enrich Hor Katha Suite.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                >
                  Close &amp; Continue Exploring
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Feedback Form */
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Category Picker */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 uppercase tracking-wider text-[11px]">
                  What would you like to share?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'suggestion', label: 'Feature Suggestion' },
                    { id: 'word_addition', label: 'Add New Word' },
                    { id: 'translation_fix', label: 'Translation Fix' },
                    { id: 'appreciation', label: 'Appreciation' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id as any)}
                      className={`p-2 rounded-xl text-center border font-semibold transition-all ${
                        category === cat.id
                          ? 'bg-amber-600 border-amber-600 text-white shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Star Rating */}
              <div>
                <label className="font-bold text-slate-700 block mb-1 uppercase tracking-wider text-[11px]">
                  Experience Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= (hoverRating || rating)
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-amber-700 ml-2">
                    {rating === 5 ? 'Exceptional (5/5)' : rating === 4 ? 'Very Good (4/5)' : 'Good'}
                  </span>
                </div>
              </div>

              {/* Name & Region Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Your Name / Contributor (Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Somen Murmu"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-amber-500 transition-all text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Location / Community (Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="e.g. Mayurbhanj / Dumka / Ranchi"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-amber-500 transition-all text-xs"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1 flex items-center justify-between">
                  <span>Your Message / Suggestion / Word</span>
                  <span className="text-[10px] text-slate-400">
                    Supports Santali Devanagari &amp; Roman
                  </span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your word meaning, translation correction, or thoughts here..."
                  rows={4}
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-amber-500 transition-all text-xs leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-all hover:gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Feedback</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
