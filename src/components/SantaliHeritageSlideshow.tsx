import React, { useState, useEffect, useRef } from 'react';
import { HERITAGE_30_SLIDES, HeritageSlide } from '../data/heritageGalleryData';
import { speakWithFemaleVoice } from '../utils/speech';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Sparkles,
  Maximize2,
  X,
  Volume2,
  Camera,
  RotateCcw,
  Check,
  Plus,
  Trash2,
  Edit3,
  Upload,
  Image as ImageIcon,
  FileText,
  Tag,
  MapPin,
  Layers,
  AlertCircle
} from 'lucide-react';

export interface CustomHeroSlide {
  id: string;
  imageUrl: string;
  heading: string; // मुख्य शीर्षक
  subheading: string; // उप-शीर्षक
  category: string; // श्रेणी / टैग
  badge: string; // बैज
  description: string; // अनूठी जानकारी / विस्तृत विवरण
  locationOrDate?: string; // स्थान / तिथि / श्रेय
  accentColor?: string; // ग्रेडिएंट प्रीसेट
  createdAt: number;
}

const STORAGE_KEY = 'hor_katha_custom_hero_slides';

// Compress image to ensure localStorage capacity is never exceeded
function compressImage(file: File, maxWidth = 1600, quality = 0.85): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}

const CATEGORY_PRESETS = [
  '🌾 पर्व व उत्सव (Festivals)',
  '🎶 लोकगीत व नृत्य (Music & Dance)',
  '🏛️ इतिहास व धरोहर (History & Heritage)',
  '🎨 चित्रकला व सोहराय (Art & Murals)',
  '🏹 संताल हूल व नायक (Hul Heroes)',
  '🌿 पवित्र प्रकृति व जाहेर थान (Sacred Groves)',
  '👗 पारंपरिक पोशाक व आभूषण (Attire & Ornaments)',
  '🏺 पारंपरिक शिल्प व निर्माण (Craft & Architecture)'
];

const TEMPLATE_DESCRIPTIONS = [
  {
    name: '📝 सामान्य अनूठा विवरण (Standard Story)',
    text: `• संताली नाम व परिचय: ...\n• सांस्कृतिक महत्व: ...\n• विशेष मान्यता व संदेश: ...`
  },
  {
    name: '🌾 पर्व व अनुष्ठान विधि (Festival & Rituals)',
    text: `• आयोजन का समय व दिन: ...\n• मुख्य अनुष्ठान व पूजा: ...\n• परंपरागत पकवान व उल्लास: ...\n• समाज को प्रकृति का संदेश: ...`
  },
  {
    name: '📜 इतिहास व गौरव गाथा (History & Lore)',
    text: `• ऐतिहासिक पृष्ठभूमि: ...\n• प्रमुख नायक व पूर्वज: ...\n• वर्तमान पीढ़ी के लिए प्रेरणा: ...`
  },
  {
    name: '🪕 लोकगीत व कहावत (Song & Bhenta)',
    text: `• संताली लोक पंक्ति: "..."\n• भावार्थ व संदेश: "..."\n• पारंपरिक वाद्य यंत्र: तुमदाक, तामाक, बानम`
  }
];

const ACCENT_COLORS = [
  { label: 'Amber Gold', value: 'from-amber-600 to-orange-700', bg: 'bg-amber-600' },
  { label: 'Emerald Forest', value: 'from-emerald-600 to-teal-800', bg: 'bg-emerald-600' },
  { label: 'Deep Crimson', value: 'from-rose-600 to-red-800', bg: 'bg-rose-600' },
  { label: 'Indigo Night', value: 'from-indigo-600 to-slate-900', bg: 'bg-indigo-600' },
  { label: 'Earthy Bronze', value: 'from-yellow-700 to-amber-900', bg: 'bg-yellow-700' }
];

interface SlideshowProps {
  className?: string;
}

export const SantaliHeritageSlideshow: React.FC<SlideshowProps> = ({ className = '' }) => {
  // Load user slides from localStorage; starts completely empty [] if not uploaded
  const [slides, setSlides] = useState<CustomHeroSlide[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading slides from localStorage', e);
    }
    // Clean empty default as requested: "slider image khali kr do"
    return [];
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fullscreenSlide, setFullscreenSlide] = useState<CustomHeroSlide | null>(null);

  // Modal State for Upload / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null);

  // Form State
  const [formImage, setFormImage] = useState<string>('');
  const [formHeading, setFormHeading] = useState<string>('');
  const [formSubheading, setFormSubheading] = useState<string>('');
  const [formCategory, setFormCategory] = useState<string>(CATEGORY_PRESETS[0]);
  const [formBadge, setFormBadge] = useState<string>('संताली धरोहर');
  const [formDescription, setFormDescription] = useState<string>('');
  const [formLocation, setFormLocation] = useState<string>('');
  const [formAccent, setFormAccent] = useState<string>(ACCENT_COLORS[0].value);
  const [imageInputMode, setImageInputMode] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [isProcessingImage, setIsProcessingImage] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 6 second interval timer when slides exist
  const INTERVAL_TIME = 6000;
  const UPDATE_STEP = 100;

  // Auto rotation
  useEffect(() => {
    if (slides.length <= 1 || isPaused || fullscreenSlide || isModalOpen) {
      return;
    }

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((idx) => (idx + 1) % slides.length);
          return 0;
        }
        return prev + (UPDATE_STEP / INTERVAL_TIME) * 100;
      });
    }, UPDATE_STEP);

    return () => clearInterval(timer);
  }, [slides.length, isPaused, fullscreenSlide, isModalOpen]);

  // Sync index if slides length changes
  useEffect(() => {
    if (currentIndex >= slides.length) {
      setCurrentIndex(Math.max(0, slides.length - 1));
      setProgress(0);
    }
  }, [slides.length, currentIndex]);

  // Save slides to localStorage
  const saveSlides = (newSlides: CustomHeroSlide[]) => {
    setSlides(newSlides);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSlides));
    } catch (err) {
      console.warn('Could not save slides to localStorage', err);
    }
  };

  const handleNext = () => {
    if (slides.length <= 1) return;
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    if (slides.length <= 1) return;
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleSpeak = (text: string) => {
    speakWithFemaleVoice(text, { lang: 'hi-IN', rate: 0.88 });
  };

  // Open modal for new slide
  const openAddModal = () => {
    setEditingSlideId(null);
    setFormImage('');
    setUrlInput('');
    setFormHeading('');
    setFormSubheading('');
    setFormCategory(CATEGORY_PRESETS[0]);
    setFormBadge('नई तस्वीर');
    setFormDescription(TEMPLATE_DESCRIPTIONS[0].text);
    setFormLocation('संताल परगना, झारखंड');
    setFormAccent(ACCENT_COLORS[0].value);
    setFormError('');
    setImageInputMode('upload');
    setIsModalOpen(true);
  };

  // Open modal for editing existing slide
  const openEditModal = (slide: CustomHeroSlide) => {
    setEditingSlideId(slide.id);
    setFormImage(slide.imageUrl);
    setUrlInput(slide.imageUrl.startsWith('http') ? slide.imageUrl : '');
    setFormHeading(slide.heading);
    setFormSubheading(slide.subheading);
    setFormCategory(slide.category);
    setFormBadge(slide.badge);
    setFormDescription(slide.description);
    setFormLocation(slide.locationOrDate || '');
    setFormAccent(slide.accentColor || ACCENT_COLORS[0].value);
    setFormError('');
    setImageInputMode(slide.imageUrl.startsWith('data:') ? 'upload' : 'url');
    setIsModalOpen(true);
  };

  // Delete current slide
  const handleDeleteSlide = (idToDelete: string) => {
    const updated = slides.filter((s) => s.id !== idToDelete);
    saveSlides(updated);
    if (fullscreenSlide?.id === idToDelete) {
      setFullscreenSlide(null);
    }
  };

  // Clear all slides back to empty state
  const handleClearAll = () => {
    if (confirm('क्या आप सचमुच स्लाइडर की सभी तस्वीरें खाली करना चाहते हैं?')) {
      saveSlides([]);
      setCurrentIndex(0);
      setProgress(0);
      setFullscreenSlide(null);
    }
  };

  // Restore sample slides if user wants
  const handleLoadSampleSlides = () => {
    const sampleSlides: CustomHeroSlide[] = HERITAGE_30_SLIDES.slice(0, 5).map((s) => ({
      id: `sample_${s.id}`,
      imageUrl: s.imageUrl,
      heading: s.titleDevanagari || s.titleEnglish,
      subheading: s.titleEnglish,
      category: s.category,
      badge: s.badge,
      description: s.description,
      locationOrDate: 'झारखंड / पश्चिम बंगाल / ओडिशा',
      accentColor: s.accentColor,
      createdAt: Date.now()
    }));
    saveSlides(sampleSlides);
    setCurrentIndex(0);
    setProgress(0);
  };

  // Handle file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormError('कृपया केवल मान्य इमेज फाइल (JPG, PNG, WebP) चुनें।');
      return;
    }

    setIsProcessingImage(true);
    setFormError('');
    try {
      const compressedDataUrl = await compressImage(file, 1600, 0.85);
      setFormImage(compressedDataUrl);
    } catch {
      setFormError('तस्वीर प्रोसेस करने में त्रुटि हुई। कृपया दूसरी फाइल चुनें।');
    } finally {
      setIsProcessingImage(false);
    }
  };

  // Submit form
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalImage = imageInputMode === 'url' ? urlInput.trim() : formImage;

    if (!finalImage) {
      setFormError('कृपया एक तस्वीर अपलोड करें या इमेज का वैध वेब लिंक दर्ज करें।');
      return;
    }

    if (!formHeading.trim()) {
      setFormError('कृपया मुख्य शीर्षक (Heading) दर्ज करें।');
      return;
    }

    if (!formSubheading.trim()) {
      setFormError('कृपया उप-शीर्षक (Subheading) दर्ज करें।');
      return;
    }

    if (!formDescription.trim()) {
      setFormError('कृपया इस तस्वीर के बारे में अनूठी जानकारी या विवरण लिखें।');
      return;
    }

    if (editingSlideId) {
      // Edit existing
      const updated = slides.map((s) =>
        s.id === editingSlideId
          ? {
              ...s,
              imageUrl: finalImage,
              heading: formHeading.trim(),
              subheading: formSubheading.trim(),
              category: formCategory,
              badge: formBadge.trim() || 'संताली धरोहर',
              description: formDescription.trim(),
              locationOrDate: formLocation.trim(),
              accentColor: formAccent
            }
          : s
      );
      saveSlides(updated);
    } else {
      // Add new
      const newSlide: CustomHeroSlide = {
        id: `slide_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        imageUrl: finalImage,
        heading: formHeading.trim(),
        subheading: formSubheading.trim(),
        category: formCategory,
        badge: formBadge.trim() || 'संताली धरोहर',
        description: formDescription.trim(),
        locationOrDate: formLocation.trim(),
        accentColor: formAccent,
        createdAt: Date.now()
      };
      const updated = [...slides, newSlide];
      saveSlides(updated);
      setCurrentIndex(updated.length - 1);
    }

    setIsModalOpen(false);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className={`relative rounded-2xl overflow-hidden bg-slate-950 border border-amber-300/40 shadow-xl group ${className}`}>
      {/* Hidden file input for fast re-trigger if needed */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* ═══ CASE 1: EMPTY STATE (स्लाइडर खाली है) ═══ */}
      {slides.length === 0 ? (
        <div className="relative w-full h-72 sm:h-80 md:h-96 lg:h-[410px] bg-gradient-to-br from-slate-950 via-amber-950/40 to-slate-900 border-2 border-dashed border-amber-400/40 rounded-2xl flex flex-col items-center justify-center p-6 text-center select-none">
          {/* Subtle Ambient Decorative Circles */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/30 border border-amber-400/40 flex items-center justify-center shadow-lg shadow-amber-900/20">
              <Camera className="w-8 h-8 text-amber-400 animate-pulse" />
            </div>

            <div>
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 mb-2">
                स्लाइडर रिक्त है · Empty Slider
              </span>
              <h3 className="text-lg sm:text-xl font-black text-amber-100 tracking-tight">
                अपनी मनपसंद तस्वीर व अनूठा विवरण अपलोड करें
              </h3>
              <p className="text-xs sm:text-sm text-slate-300/90 mt-1.5 leading-relaxed">
                मुख्य शीर्षक, उप-शीर्षक और विस्तृत अनूठे विवरण के साथ अपनी पसंदीदा तस्वीर जोड़ें। यह 6 सेकंड के अंतराल में मुख्य बैनर पर प्रदर्शित होगी।
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
              <button
                onClick={openAddModal}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 border border-amber-200 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>नई तस्वीर व विवरण अपलोड करें</span>
              </button>

              <button
                onClick={handleLoadSampleSlides}
                className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white border border-white/15 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="यदि देखना चाहें कि स्लाइडर कैसा दिखता है"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>सैंपल लोड करें</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ═══ CASE 2: USER SLIDES ACTIVE ═══ */
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative w-full h-72 sm:h-80 md:h-96 lg:h-[420px] overflow-hidden bg-slate-950"
        >
          {/* 6-Second Auto-Rotation Progress Bar */}
          {slides.length > 1 && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-black/50 z-30">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 transition-[width] ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* Current Slide Image with High Contrast and Zero Blur */}
          <img
            key={currentSlide.id}
            src={currentSlide.imageUrl}
            alt={currentSlide.heading}
            className="w-full h-full object-cover filter contrast-[1.05] brightness-95 transition-opacity duration-300"
            style={{ imageRendering: '-webkit-optimize-contrast' }}
            loading="eager"
          />

          {/* Atmospheric Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 pointer-events-none" />

          {/* Top Control Bar */}
          <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between gap-2">
            {/* Badges */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-sans shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-slate-950" />
                <span>{currentSlide.badge}</span>
              </span>
              <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-black/60 text-amber-200 backdrop-blur-xs border border-white/10">
                {currentIndex + 1} / {slides.length}
              </span>
              {currentSlide.locationOrDate && (
                <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-black/50 text-slate-200 border border-white/10">
                  <MapPin className="w-2.5 h-2.5 text-amber-400" />
                  <span>{currentSlide.locationOrDate}</span>
                </span>
              )}
            </div>

            {/* Actions: Add Slide, Edit, Delete, Pause/Play, Fullscreen */}
            <div className="flex items-center gap-1.5">
              {/* + Add Another Slide */}
              <button
                onClick={openAddModal}
                title="एक और तस्वीर व विवरण जोड़ें"
                className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-black text-[11px] shadow-md border border-amber-200 flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span className="hidden sm:inline">तस्वीर जोड़ें</span>
              </button>

              {/* Edit Current Slide */}
              <button
                onClick={() => openEditModal(currentSlide)}
                title="इस तस्वीर का शीर्षक, उप-शीर्षक या विवरण बदलें"
                className="p-1.5 sm:px-2 sm:py-1 rounded-xl bg-black/60 hover:bg-black/90 text-amber-200 border border-white/15 text-[11px] font-bold flex items-center gap-1 backdrop-blur-xs transition-all cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden sm:inline">संपादित करें</span>
              </button>

              {/* Delete Slide */}
              <button
                onClick={() => handleDeleteSlide(currentSlide.id)}
                title="इस स्लाइड को हटाएं"
                className="p-1.5 rounded-xl bg-black/60 hover:bg-red-950/80 text-rose-300 border border-white/15 hover:border-rose-400 text-[11px] transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              {/* Pause / Play (if multiple slides) */}
              {slides.length > 1 && (
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  title={isPaused ? 'स्लाइड शो पुनः चालू करें' : 'रोकें'}
                  className="p-1.5 rounded-xl bg-black/60 hover:bg-black/90 text-white border border-white/15 text-[11px] backdrop-blur-xs transition-colors cursor-pointer"
                >
                  {isPaused ? <Play className="w-3.5 h-3.5 text-amber-300" /> : <Pause className="w-3.5 h-3.5" />}
                </button>
              )}

              {/* Fullscreen Theater */}
              <button
                onClick={() => setFullscreenSlide(currentSlide)}
                title="पूरा विवरण व बड़ी तस्वीर देखें (Full Page Theater)"
                className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-black/60 hover:bg-black/90 text-white font-bold text-[11px] backdrop-blur-xs border border-white/20 hover:border-white/50 flex items-center gap-1 cursor-pointer transition-all active:scale-95"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden sm:inline">फुल पेज</span>
              </button>
            </div>
          </div>

          {/* Bottom Caption Overlay */}
          <div className="absolute bottom-3 left-3 right-3 z-20 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap min-w-0">
                <span className="text-[10px] font-bold text-amber-400 tracking-wide uppercase px-2 py-0.5 rounded-md bg-amber-950/70 border border-amber-600/30">
                  {currentSlide.category}
                </span>
                <h3 className="text-white text-base sm:text-lg md:text-xl font-black tracking-tight drop-shadow-md truncate">
                  {currentSlide.heading}
                </h3>
              </div>

              {/* Female Voice Pronunciation */}
              <button
                onClick={() => handleSpeak(`${currentSlide.heading}. ${currentSlide.subheading}. ${currentSlide.description}`)}
                title="महिला स्वर में सुनें (Pronounce with Female Voice)"
                className="p-1.5 text-amber-200 hover:text-white rounded-lg shrink-0 bg-black/60 hover:bg-amber-950/80 border border-white/10 flex items-center gap-1 text-[11px] font-semibold cursor-pointer transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden sm:inline">सुनें</span>
              </button>
            </div>

            {/* Subheading */}
            <p className="text-amber-200 text-xs sm:text-sm font-semibold drop-shadow-xs line-clamp-1">
              {currentSlide.subheading}
            </p>

            {/* Unique Description Preview */}
            <div
              onClick={() => setFullscreenSlide(currentSlide)}
              className="group/desc cursor-pointer pt-0.5"
              title="पूरा अनूठा विवरण पढ़ने के लिए क्लिक करें"
            >
              <p className="text-[11px] text-slate-200/95 line-clamp-2 leading-relaxed bg-black/40 hover:bg-black/60 p-2 rounded-lg border border-white/10 transition-colors">
                {currentSlide.description}
              </p>
            </div>
          </div>

          {/* Prev / Next Chevrons (if multiple slides) */}
          {slides.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                title="पिछली तस्वीर"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 hover:bg-black/90 text-white/90 backdrop-blur-xs opacity-70 group-hover:opacity-100 transition-all border border-white/15 hover:scale-110 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                title="अगली तस्वीर"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 hover:bg-black/90 text-white/90 backdrop-blur-xs opacity-70 group-hover:opacity-100 transition-all border border-white/15 hover:scale-110 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Micro Footer Bar with Quick Actions */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 opacity-70" />
        </div>
      )}

      {/* Slide Status Strip Under Box */}
      <div className="px-3.5 py-1.5 bg-gradient-to-r from-amber-950 via-slate-950 to-amber-950 border-t border-amber-900/40 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-2">
          <span className="text-amber-300 font-semibold">
            {slides.length === 0
              ? 'स्लाइडर खाली है (0 तस्वीरें)'
              : `कुल ${slides.length} तस्वीरें लोड हैं · 6s ऑटो स्लाइड`}
          </span>
          {slides.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-[10px] text-rose-400 hover:text-rose-300 underline font-medium cursor-pointer ml-1"
            >
              सभी खाली करें (Clear)
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openAddModal}
            className="text-[11px] font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            <span>अपलोड करें</span>
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          MODAL: BEST FORMAT UPLOAD & UNIQUE STORY CREATOR
         ═══════════════════════════════════════════════════════════════════ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-amber-400/50 rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl text-slate-100 flex flex-col">
            {/* Modal Header */}
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md px-5 py-4 border-b border-amber-500/20 flex items-center justify-between z-20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-amber-200">
                    {editingSlideId ? 'स्लाइड संपादित करें (Edit Slide)' : 'स्लाइडर में तस्वीर व अनूठी जानकारी अपलोड करें'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    तस्वीर, मुख्य शीर्षक, उप-शीर्षक व अनूठा प्रारूप दर्ज करें
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleFormSubmit} className="p-5 space-y-4 text-xs">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-400/50 text-rose-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* 1. IMAGE UPLOAD / URL SELECTOR */}
              <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-amber-300 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-amber-400" />
                    <span>1. तस्वीर चुनें (Image Upload / URL)</span>
                  </label>

                  {/* Mode switch */}
                  <div className="flex bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                    <button
                      type="button"
                      onClick={() => setImageInputMode('upload')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                        imageInputMode === 'upload'
                          ? 'bg-amber-500 text-slate-950 shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      📁 फाइल अपलोड
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageInputMode('url')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                        imageInputMode === 'url'
                          ? 'bg-amber-500 text-slate-950 shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      🔗 वेब URL
                    </button>
                  </div>
                </div>

                {imageInputMode === 'upload' ? (
                  <div className="space-y-2">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-amber-400/40 hover:border-amber-400 rounded-xl p-4 text-center cursor-pointer bg-slate-900/50 hover:bg-slate-900 transition-all flex flex-col items-center justify-center gap-1.5 group"
                    >
                      <Upload className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
                      <p className="font-bold text-slate-200">
                        {isProcessingImage ? 'तस्वीर प्रोसेस हो रही है...' : 'डिवाइस से तस्वीर चुनें या यहाँ ड्रैग करें'}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        JPG, PNG, WebP (ऑटो-कंप्रेस कर हाई-क्वालिटी में सहेजा जाएगा)
                      </p>
                    </div>

                    {formImage && (
                      <div className="relative rounded-xl overflow-hidden border border-amber-400/30 max-h-48 bg-black flex items-center justify-center">
                        <img
                          src={formImage}
                          alt="Preview"
                          className="max-h-48 w-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-black/70 px-2 py-0.5 rounded text-[10px] text-emerald-400 font-bold border border-emerald-400/40 flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>तस्वीर लोड हो गई</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs"
                    />
                    {urlInput && (
                      <div className="relative rounded-xl overflow-hidden border border-slate-700 max-h-48 bg-black flex items-center justify-center">
                        <img
                          src={urlInput}
                          alt="Preview"
                          className="max-h-48 w-full object-cover"
                          onError={() => setFormError('इमेज URL लोड नहीं हो सका। कृपया लिंक जांचें।')}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 2. HEADING & SUBHEADING */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-amber-300 block">
                    2. मुख्य शीर्षक (Main Heading) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formHeading}
                    onChange={(e) => setFormHeading(e.target.value)}
                    placeholder="उदा: सोहराय महापर्व · Sohrai Festival"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs font-semibold"
                  />
                  <span className="text-[10px] text-slate-400">
                    बैनर पर बड़े अक्षरों में चमकेगा
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-amber-300 block">
                    3. उप-शीर्षक (Subheading) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formSubheading}
                    onChange={(e) => setFormSubheading(e.target.value)}
                    placeholder="उदा: प्रकृति, गौ-वंदना व पूर्वजों के प्रति आभार"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs font-medium"
                  />
                  <span className="text-[10px] text-slate-400">
                    मुख्य विषय का संक्षिप्त सार
                  </span>
                </div>
              </div>

              {/* 3. CATEGORY & BADGE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-amber-300 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-amber-400" />
                    <span>4. श्रेणी / वर्ग (Category)</span>
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400 text-xs"
                  >
                    {CATEGORY_PRESETS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>5. बैज टैग (Badge)</span>
                  </label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    placeholder="उदा: 2026 विशेष, संताली धरोहर, सोहराय"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>
              </div>

              {/* 4. UNIQUE DESCRIPTION WITH FORMAT TEMPLATES */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <label className="font-bold text-amber-300 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>6. अनूठी जानकारी व विस्तृत विवरण (Unique Story Format) *</span>
                  </label>

                  {/* Format template buttons */}
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-[10px] text-slate-400 font-medium">प्रारूप:</span>
                    {TEMPLATE_DESCRIPTIONS.map((tpl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormDescription(tpl.text)}
                        className="px-2 py-0.5 rounded-md bg-amber-500/10 hover:bg-amber-500/25 border border-amber-400/30 text-amber-300 text-[10px] font-semibold transition-colors cursor-pointer"
                        title="यह फॉर्मेट टेक्स्टबॉक्स में डालें"
                      >
                        {tpl.name.split(' ')[0]} {tpl.name.split(' ')[1]}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  required
                  rows={4}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="इस तस्वीर और संताली संस्कृति से जुड़ी अनोखी बातें यहाँ लिखें..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs font-mono leading-relaxed resize-y"
                />
                <span className="text-[10px] text-slate-400">
                  💡 टिप: आप बुलेट पॉइंट्स (•), संताली लोक पंक्ति, हिंदी अर्थ या विशिष्ट परंपराओं का अनूठा प्रारूप लिख सकते हैं।
                </span>
              </div>

              {/* 5. LOCATION / DATE & COLOR THEME */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="font-bold text-amber-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>7. स्थान, तिथि या श्रेय (वैकल्पिक)</span>
                  </label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="उदा: दुमका, झारखंड · कार्तिक 2026"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-amber-300 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span>8. रंग थीम (Accent Color)</span>
                  </label>
                  <div className="flex items-center gap-2 pt-1">
                    {ACCENT_COLORS.map((col) => (
                      <button
                        key={col.value}
                        type="button"
                        onClick={() => setFormAccent(col.value)}
                        className={`w-7 h-7 rounded-full ${col.bg} border-2 transition-all cursor-pointer flex items-center justify-center ${
                          formAccent === col.value
                            ? 'border-white scale-110 shadow-md ring-2 ring-amber-400/50'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                        title={col.label}
                      >
                        {formAccent === col.value && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  रद्द करें (Cancel)
                </button>
                <button
                  type="submit"
                  disabled={isProcessingImage}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{editingSlideId ? 'परिवर्तन सहेजें' : 'स्लाइडर में जोड़ें'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          FULL-PAGE THEATER VIEW (विस्तृत फुल पेज थिएटर)
         ═══════════════════════════════════════════════════════════════════ */}
      {fullscreenSlide && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 text-white animate-in fade-in duration-200">
          {/* Top Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 z-20">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-sans shadow-md">
                {fullscreenSlide.badge}
              </span>
              <span className="text-xs text-amber-300 font-semibold px-2 py-0.5 rounded-md bg-white/10">
                {fullscreenSlide.category}
              </span>
              {fullscreenSlide.locationOrDate && (
                <span className="text-xs text-slate-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{fullscreenSlide.locationOrDate}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSpeak(`${fullscreenSlide.heading}. ${fullscreenSlide.subheading}. ${fullscreenSlide.description}`)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-amber-300 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                title="महिला स्वर में विवरण सुनें"
              >
                <Volume2 className="w-4 h-4" />
                <span>महिला स्वर में सुनें</span>
              </button>

              <button
                onClick={() => setFullscreenSlide(null)}
                className="px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors border border-white/20 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>बंद करें (Close)</span>
              </button>
            </div>
          </div>

          {/* Center Image with navigation */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden my-3">
            <img
              src={fullscreenSlide.imageUrl}
              alt={fullscreenSlide.heading}
              className="max-w-full max-h-[65vh] object-contain rounded-2xl shadow-2xl filter contrast-[1.05]"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
            />

            {slides.length > 1 && (
              <>
                <button
                  onClick={() => {
                    handlePrev();
                    const prevIdx = (currentIndex - 1 + slides.length) % slides.length;
                    setFullscreenSlide(slides[prevIdx]);
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 hover:scale-110 transition-all cursor-pointer"
                  title="पिछली तस्वीर"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => {
                    handleNext();
                    const nextIdx = (currentIndex + 1) % slides.length;
                    setFullscreenSlide(slides[nextIdx]);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 hover:scale-110 transition-all cursor-pointer"
                  title="अगली तस्वीर"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Rich Unique Description Container */}
          <div className="p-4 sm:p-5 bg-slate-900/90 rounded-2xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 z-20 max-h-48 overflow-y-auto">
            <div className="space-y-1 max-w-4xl">
              <h3 className="text-base sm:text-xl font-black text-amber-300">
                {fullscreenSlide.heading}
              </h3>
              <p className="text-xs sm:text-sm text-amber-100 font-semibold">
                {fullscreenSlide.subheading}
              </p>
              <div className="text-xs sm:text-sm text-slate-200 mt-1 whitespace-pre-line leading-relaxed font-sans bg-black/40 p-2.5 rounded-xl border border-white/5">
                {fullscreenSlide.description}
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5 shrink-0 self-end md:self-center">
              <button
                onClick={() => {
                  setFullscreenSlide(null);
                  openEditModal(fullscreenSlide);
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>संपादित करें</span>
              </button>
              <span className="text-[10px] text-amber-400 font-mono">
                {currentIndex + 1} / {slides.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
