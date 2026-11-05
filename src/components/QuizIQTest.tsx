// Ported from EDISAM (edisam.ai.studio) — same UI, texts, question banks and behaviour.
// Converted from the production bundle back to TSX; local variable names are the minified originals.
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ActivityIcon,
  AwardIcon,
  BookOpenIcon,
  BrainIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  CircleXIcon,
  LightbulbIcon,
  ListFilterIcon,
  PlayIcon,
  RotateCcwIcon,
  SparklesIcon,
  TimerIcon,
  TriangleAlertIcon,
  TrophyIcon,
} from "lucide-react";
import { useLanguage } from "./edisam/edisamI18n";
import { edisamGeminiFetch } from "./edisam/edisamAi";
import {
  QUIZ_EXAM_CATEGORIES,
  QUIZ_EXAMS,
  getExamQuestions,
} from "../data/edisamQuizData";
import { dedupeQuestions, mergeNewQuestions, pickUniqueQuestions } from "../utils/questionDedupe";

// Exam pools (bank + AI questions, deduped) are memoized: examSpec() is called many times per render
// (exam cards, setup summary, timer) and each merge re-normalizes ~350 questions.
const EMPTY_FRESH: any[] = [];
const examPoolCache = new Map<string, { fresh: any[]; pool: any[] }>();
const cachedExamPool = (cat: any, id: any, fresh: any[]) => {
  const key = String(id);
  const hit = examPoolCache.get(key);
  if (hit && hit.fresh === fresh) return hit.pool;
  const pool = mergeNewQuestions(getExamQuestions(cat, id), fresh);
  examPoolCache.set(key, { fresh, pool });
  return pool;
};

export function QuizIQTest() {
  var Pe: any,
    Ve: any,
    L: any,
    Y: any,
    ye: any,
    de: any,
    le: any,
    H: any,
    ue: any,
    we: any,
    me: any,
    _e: any,
    Ge: any,
    ze: any,
    st: any,
    bt: any,
    lt: any,
    ut: any,
    yt: any;
  const { language: a } = useLanguage(),
    [t, s] = React.useState<any>("upsc"),
    [n, o] = React.useState<any>("upsc_civil"),
    [l, A] = React.useState<any>("practice"),
    [d, u] = React.useState<any>("demo"),
    [h, p] = React.useState<any>(10),
    [g, b] = React.useState<any>("setup"),
    [m, B] = React.useState<any>([]),
    [C, j] = React.useState<any>(0),
    [y, E] = React.useState<any>({}),
    [U, T] = React.useState<any>(!1),
    [Q, Z] = React.useState<any>(null),
    [z, O] = React.useState<any>(30),
    D = React.useRef<any>(null),
    [R, M] = React.useState<any>(0),
    [F, G] = React.useState<any>(0),
    [S, te] = React.useState<any>(null),
    [J, X] = React.useState<any>(!1),
    [ie, $] = React.useState<any>({}),
    // Unique pool (bank + AI questions, deduped) → effective count / duration (never padded with repeats)
    examPool = (id: any) => cachedExamPool(t, id, ie[id] || EMPTY_FRESH),
    examSpec = (id: any, demo: boolean) => {
      const ex: any = QUIZ_EXAMS.find((x: any) => x.id === id) || QUIZ_EXAMS[0],
        planned = demo ? 30 : ex.questionsCount,
        plannedMins = demo ? 20 : ex.durationMins,
        unique = examPool(id).length,
        count = Math.min(planned, unique),
        mins = count < planned ? Math.max(1, Math.ceil((plannedMins * count) / planned)) : plannedMins;
      return { count, mins, planned, unique, short: count < planned };
    },
    ve = async () => {
      X(!0);
      try {
        const Le = QUIZ_EXAMS.find((Jt: any) => Jt.id === n) || QUIZ_EXAMS[0],
          At = `Generate 10 extremely high-quality, authentic multiple-choice questions matching the syllabus/pattern of the Indian competitive exam: "${Le.name}" (${Le.nameEn}). 
The questions should be in clean Hindi mixed with English terms (as typically found in Indian exams) or English.
Return ONLY a valid JSON array of objects (no markdown blocks, no formatting wrapper, just the raw JSON text) matching this TypeScript interface:
interface Question {
  id: string;
  text: string;
  options: string[]; // exactly 4 options
  correctAnswer: number; // 0-based index of the correct option
  explanation: string; // clear explanation in Hindi/English
}
Ensure the questions are challenging, realistic, and contain unique, non-repeating content. Do not output anything other than the JSON.`,
          dt = await edisamGeminiFetch("/api/gemini/generate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: At,
              systemInstruction:
                "You are an elite competitive exam board paper setter in India. You generate precise, authentic syllabus questions with zero typos. Your output is strictly raw JSON only.",
            }),
          });
        if (!dt.ok) throw new Error("Failed to generate questions");
        let ht = (await dt.json()).text.trim();
        ht.startsWith("```") &&
          (ht = ht.replace(/^```json\s*/, "").replace(/```$/, ""));
        const xt = JSON.parse(ht).map((Jt: any, Bt: any) => ({
          ...Jt,
          id: `ai_${n}_${Date.now()}_${Bt}`,
          category: Le.category,
          examType: n,
        }));
        // AI questions are deduped against the bank and earlier AI questions
        const added = dedupeQuestions(xt, [...(ie[n] || []), ...getExamQuestions(t, n)]);
        $((Jt: any) => ({
          ...Jt,
          [n]: [...(Jt[n] || []), ...dedupeQuestions(added, Jt[n] || [])],
        }));
        alert(
          added.length > 0
            ? `सफलता: AI ने ${added.length} नए (बिना दोहराव वाले) प्रश्न जोड़ दिए हैं! (Success: ${added.length} new unique questions loaded)`
            : "AI के सभी प्रश्न पहले से मौजूद थे — कोई दोहराव नहीं जोड़ा गया। (No new unique questions)",
        );
      } catch (Le) {
        (console.error(Le),
          alert("AI प्रश्न लोड करने में त्रुटि। कृपया पुनः प्रयास करें।"));
      } finally {
        X(!1);
      }
    };
  React.useEffect(() => {
    const Le = QUIZ_EXAMS.filter((At: any) => At.category === t);
    Le.length > 0 && o(Le[0].id);
  }, [t]);
  const K = QUIZ_EXAMS.filter((Le: any) => Le.category === t),
    [k, q] = React.useState<any>("");
  React.useEffect(() => {
    const Le = new Date();
    q(
      `${Le.getHours()}:${String(Le.getMinutes()).padStart(2, "0")} ${Le.getHours() >= 12 ? "PM" : "AM"}`,
    );
  }, [g]);
  const ee = () => {
      const Le = QUIZ_EXAMS.find((ea: any) => ea.id === n) || QUIZ_EXAMS[0];
      const At = examPool(n);
      let dt = h;
      l === "exam" && (dt = examSpec(n, d === "demo").count);
      const pt = `seen_questions_${n}`,
        ht = localStorage.getItem(pt);
      let mt: any[] = [];
      try { mt = ht ? JSON.parse(ht) : []; } catch { mt = []; }
      // Unseen questions first, seen ones only fill the rest; no question twice in one session.
      const { picked: Bt, resetSeen } = pickUniqueQuestions(At, dt, mt),
        Dt = resetSeen ? Bt.map((ea: any) => ea.id) : [...mt, ...Bt.map((ea: any) => ea.id)];
      if (
        (localStorage.setItem(pt, JSON.stringify(Dt)),
        B(Bt),
        j(0),
        E({}),
        T(!1),
        Z(null),
        G(0),
        M(0),
        te(null),
        b("playing"),
        l === "exam")
      ) {
        const ea = examSpec(n, d === "demo").mins * 60;
        ne(ea);
      }
    },
    ne = (Le: any) => {
      (D.current && clearInterval(D.current),
        O(Le),
        (D.current = setInterval(() => {
          (O((At: any) => (At <= 1 ? (je(), 0) : At - 1)),
            M((At: any) => At + 1));
        }, 1e3)));
    },
    pe = () => {
      D.current && (clearInterval(D.current), (D.current = null));
    };
  React.useEffect(() => () => pe(), []);
  // Pre-build the other exams' question banks in idle time (one bank per idle slice), so switching
  // category later doesn't block the main thread. Banks are cached in edisamQuizData.
  React.useEffect(() => {
    const ric: any = (window as any).requestIdleCallback || ((cb: any) => setTimeout(() => cb({ timeRemaining: () => 8 }), 200));
    const cic: any = (window as any).cancelIdleCallback || clearTimeout;
    const ids = QUIZ_EXAMS.map((x: any) => x.id);
    let i = 0, handle: any = null, cancelled = false;
    const step = (deadline: any) => {
      while (!cancelled && i < ids.length && deadline.timeRemaining() > 4) getExamQuestions("", ids[i++]);
      if (!cancelled && i < ids.length) handle = ric(step, { timeout: 4000 });
    };
    handle = ric(step, { timeout: 4000 });
    return () => { cancelled = true; handle != null && cic(handle); };
  }, []);
  const Ce = (Le: any) => {
      if (g === "playing")
        if (l === "practice") {
          if (U) return;
          (Z(Le),
            T(!0),
            E((At: any) => ({
              ...At,
              [C]: Le,
            })),
            Le === m[C].correctAnswer && G((At: any) => At + 1));
        } else
          E((At: any) => ({
            ...At,
            [C]: Le,
          }));
    },
    Ne = () => {
      const Le = C + 1;
      Le < m.length ? j(Le) : je();
    },
    je = () => {
      pe();
      const Le = QUIZ_EXAMS.find((Jt: any) => Jt.id === n) || QUIZ_EXAMS[0];
      let At = 0,
        dt = 0;
      m.forEach((Jt: any, Bt: any) => {
        const Dt = y[Bt];
        Dt !== void 0 && (Dt === Jt.correctAnswer ? At++ : dt++);
      });
      const pt = m.length - (At + dt);
      let ht = At,
        mt = m.length;
      l === "exam" &&
        ((ht = At * Le.correctMarks - dt * Le.negativeMarks),
        (mt = m.length * Le.correctMarks));
      const xt = Math.round(ht * 100) / 100;
      (G(xt),
        te({
          correct: At,
          incorrect: dt,
          unanswered: pt,
          netScore: xt,
          maxPossibleScore: mt,
          accuracy: Math.round((At / (At + dt || 1)) * 100),
          totalTimeSpent: R,
        }),
        b("completed"));
    },
    Me = () => {
      (b("setup"), B([]), j(0), E({}), T(!1), Z(null), G(0), pe());
    },
    Ke = () => {
      const Le = m.length || 1,
        At = S ? S.correct : F,
        dt = Math.round((At / Le) * 100) || 0;
      let pt = "प्रयासकर्ता (Learner)",
        ht = "from-blue-500 to-indigo-600",
        mt =
          "अच्छा प्रयास! थोड़ा और अभ्यास करें और आप निश्चित रूप से बेहतर अंक प्राप्त करेंगे।";
      return (
        dt >= 90
          ? ((pt = "सुपर माइंड (Super Brain Champion) 🏆"),
            (ht = "from-amber-500 via-orange-500 to-yellow-600 animate-pulse"),
            (mt =
              "असाधारण! आपकी बौद्धिक क्षमता अत्यंत तीव्र है। आपने परीक्षा में ऐतिहासिक प्रदर्शन किया है!"))
          : dt >= 75
            ? ((pt = "प्रतिभाशाली (Intellect Genius) ⭐"),
              (ht = "from-emerald-500 to-teal-600"),
              (mt =
                "बहुत बढ़िया! आपके पास विभिन्न विषयों का बेहतरीन ज्ञान है। लक्ष्य के बेहद करीब!"))
            : dt >= 50 &&
              ((pt = "विजेता (Super Achiever)"),
              (ht = "from-purple-500 to-pink-600"),
              (mt =
                "सराहनीय प्रदर्शन! आपने बेहतरीन कौशल का परिचय दिया है। थोड़ी और मेहनत आपको टॉपर बनाएगी।")),
        {
          percentage: dt,
          badge: pt,
          color: ht,
          feedback: mt,
        }
      );
    };
  return (
    <div
      id="quiz-iq-root-view"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 text-white rounded-3xl p-6 mb-8 shadow-xl border border-slate-850 relative overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_40%)]" />
        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center px-2 py-0.5 bg-emerald-500 text-slate-950 font-black text-[10px] rounded-md tracking-wider uppercase">
              Official CBT
            </span>
            <h1 className="text-xl md:text-2xl font-black tracking-tight font-display flex items-center gap-2 text-white">
              <BrainIcon className="w-6 h-6 text-emerald-400 animate-pulse" />
              <span>EDISAM लाइव परीक्षा केंद्र (Live Exam Board)</span>
            </h1>
          </div>
          <p className="text-xs text-slate-300 font-bold max-w-xl leading-relaxed">
            झारखंड राज्य और राष्ट्रीय स्तर की परीक्षाओं के वास्तविक पैटर्न पर
            आधारित लाइव टेस्ट सिमुलेटर। यहाँ हर विभाग के वास्तविक प्रश्नों की
            संख्या, समय सीमा और अंकन नीति के साथ अभ्यास करें।
          </p>
        </div>
        <div className="relative z-10 shrink-0 bg-white/5 border border-white/10 p-3.5 rounded-2xl flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <div className="text-left">
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              Active Test Engine
            </p>
            <p className="text-xs font-black text-white font-mono">
              {"Last Sync: Today, "}
              {k || "11:30 AM"}
            </p>
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {g === "setup" && (
          <motion.div
            key={"quiz-setup"}
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -15,
            }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-150 p-6 md:p-8 shadow-md space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <ListFilterIcon className="w-5 h-5 text-emerald-600" />
                  <span>
                    1. प्रमुख परीक्षा विभाग चुनें (Choose Major Department)
                  </span>
                </h2>
                <p className="text-xs text-gray-500 font-semibold mt-1">
                  सभी राष्ट्रीय एवं राज्य स्तरीय परीक्षा श्रेणियां उपलब्ध हैं।
                  हर श्रेणी में 350+ प्रामाणिक प्रश्न हैं।
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {QUIZ_EXAM_CATEGORIES.map((Le: any) => {
                  const At = t === Le.id;
                  return (
                    <button
                      key={Le.id}
                      onClick={() => s(Le.id)}
                      className={`text-left p-4 rounded-2xl border transition duration-150 flex flex-col justify-between cursor-pointer relative overflow-hidden group ${At ? "border-emerald-600 bg-emerald-50/20 ring-2 ring-emerald-600" : "border-gray-200 hover:border-emerald-500 hover:bg-slate-50"}`}
                    >
                      <div className="space-y-1 relative z-10">
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${At ? "bg-emerald-600 text-white" : "bg-slate-100 text-gray-600 group-hover:bg-emerald-50"}`}
                        >
                          {Le.nameEn}
                        </span>
                        <h3 className="text-xs sm:text-sm font-black text-slate-900 line-clamp-1 mt-1">
                          {Le.name}
                        </h3>
                      </div>
                      <p className="text-[11px] text-gray-500 font-medium leading-normal line-clamp-2 relative z-10 mt-1">
                        {Le.desc}
                      </p>
                      {At && (
                        <div className="absolute right-3 top-3 text-emerald-600 bg-white shadow-md rounded-full p-1 border border-emerald-100">
                          <CircleCheckIcon className="w-4 h-4" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="border-t border-gray-100 pt-6 space-y-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <SparklesIcon className="w-5 h-5 text-amber-500 animate-pulse" />
                    <span>
                      2. विशिष्ट परीक्षा का चयन करें (Select Specific Exam
                      Target)
                    </span>
                  </h2>
                  <p className="text-xs text-gray-500 font-semibold mt-1">
                    चयनित विभाग के अंतर्गत विशिष्ट परीक्षाओं की सूची। प्रत्येक
                    में नकारात्मक अंकन एवं समय सीमा लागू होती है।
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl select-none">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-amber-600 font-extrabold text-xs sm:text-sm">
                      <SparklesIcon className="w-4 h-4 animate-pulse" />
                      <span>AI लाइव प्रश्न अद्यतन (AI Live Question Sync)</span>
                    </div>
                    <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                      Gemini AI द्वारा इस परीक्षा के लिए 10 बिल्कुल नए, विशेष
                      प्रश्न तुरंत जनरेट करके जोड़ें।
                    </p>
                  </div>
                  <button
                    onClick={ve}
                    disabled={J}
                    className="w-full sm:w-auto shrink-0 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-slate-950 font-black text-[11px] px-4 py-2.5 rounded-xl transition duration-150 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {J ? (
                      <>
                        <ActivityIcon className="w-3.5 h-3.5 animate-spin" />
                        <span>लोड हो रहा है...</span>
                      </>
                    ) : (
                      <>
                        <RotateCcwIcon className="w-3.5 h-3.5" />
                        <span>ताज़ा AI प्रश्न जनरेट करें (Sync Live AI)</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {K.map((Le: any) => {
                    const At = n === Le.id;
                    return (
                      <button
                        key={Le.id}
                        onClick={() => o(Le.id)}
                        className={`text-left p-3.5 rounded-2xl border transition duration-150 flex flex-col justify-between gap-1.5 cursor-pointer relative overflow-hidden group ${At ? "border-amber-500 bg-amber-50/10 ring-2 ring-amber-500 shadow-xs" : "border-gray-200 hover:border-amber-400 hover:bg-slate-50"}`}
                      >
                        <div className="relative z-10 space-y-1">
                          <h4 className="text-xs font-black text-slate-900 leading-tight">
                            {Le.name}
                          </h4>
                          <div className="flex gap-1.5 flex-wrap pt-1">
                            <span className="text-[9px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded-sm">
                              {examSpec(Le.id, false).count}
                              {" Qs"}
                            </span>
                            <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded-sm">
                              {examSpec(Le.id, false).mins}
                              {" Mins"}
                            </span>
                          </div>
                        </div>
                        {At && (
                          <div className="absolute right-2 bottom-2 text-amber-600 bg-white shadow-xs rounded-full p-0.5 border border-amber-100">
                            <CircleCheckIcon className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="border-t border-gray-100 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-900 uppercase tracking-wider">
                    3. अभ्यास अथवा लाइव परीक्षा विकल्प (Test Options)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => A("practice")}
                      className={`py-3.5 px-4 rounded-xl border font-bold text-xs cursor-pointer transition flex items-center justify-center gap-1.5 ${l === "practice" ? "border-slate-800 bg-slate-900 text-white shadow-md font-black" : "border-gray-200 hover:bg-slate-50 text-gray-700"}`}
                    >
                      💡 प्रैक्टिस मोड (Practice)
                    </button>
                    <button
                      onClick={() => A("exam")}
                      className={`py-3.5 px-4 rounded-xl border font-bold text-xs cursor-pointer transition flex items-center justify-center gap-1.5 ${l === "exam" ? "border-emerald-600 bg-emerald-600 text-white shadow-md font-black" : "border-gray-200 hover:bg-slate-50 text-gray-700"}`}
                    >
                      ⏱️ लाइव एग्जाम (CBT Exam)
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-400 font-semibold italic">
                    {l === "practice"
                      ? "* बिना समय सीमा के अभ्यास करें। हर जवाब के साथ तत्काल स्पष्टीकरण देखें।"
                      : "* वास्तविक परीक्षा की तरह कंप्यूटर आधारित टेस्ट (CBT)। नकारात्मक अंकन लागू होगा।"}
                  </p>
                </div>
                {l === "practice" ? (
                  <div className="space-y-2">
                    <label className="block text-xs font-black text-slate-900 uppercase tracking-wider">
                      4. अभ्यास प्रश्नों की संख्या (Practice Question Limit)
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[10, 20, 30, 50].map((Le: any) => (
                        <button
                          key={Le}
                          onClick={() => p(Le)}
                          className={`py-3 rounded-lg border font-black text-xs cursor-pointer transition ${h === Le ? "border-slate-800 bg-slate-100 text-slate-950 font-extrabold ring-1 ring-slate-800" : "border-gray-200 hover:bg-slate-50 text-gray-600"}`}
                        >
                          {Le}
                          {" Q"}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-gray-400 font-semibold">
                      सीखने के लिए 10, 20, 30 या 50 प्रश्नों का त्वरित अभ्यास
                      सेट शुरू करें।
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="block text-xs font-black text-slate-900 uppercase tracking-wider">
                      4. परीक्षा प्रारूप का चयन (Exam Format)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => u("demo")}
                        className={`py-3 rounded-xl border font-black text-xs cursor-pointer transition flex flex-col items-center justify-center ${d === "demo" ? "border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-600" : "border-gray-200 hover:bg-slate-50 text-gray-600"}`}
                      >
                        <span className="font-extrabold">लाइव डेमो टेस्ट</span>
                        <span className="text-[9px] text-gray-400 font-medium">
                          ({examSpec(n, true).count} Q • {examSpec(n, true).mins} मिनट)
                        </span>
                      </button>
                      <button
                        onClick={() => u("full")}
                        className={`py-3 rounded-xl border font-black text-xs cursor-pointer transition flex flex-col items-center justify-center ${d === "full" ? "border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-600" : "border-gray-200 hover:bg-slate-50 text-gray-600"}`}
                      >
                        <span className="font-extrabold">
                          पूर्ण वास्तविक परीक्षा
                        </span>
                        <span className="text-[9px] text-gray-400 font-medium">
                          (
                          {(Pe = QUIZ_EXAMS.find((Le: any) => Le.id === n)) ==
                          null
                            ? void 0
                            : examSpec(Pe.id, false).count}
                          {" Q • "}
                          {(Ve = QUIZ_EXAMS.find((Le: any) => Le.id === n)) ==
                          null
                            ? void 0
                            : examSpec(Ve.id, false).mins}
                          {" मिनट)"}
                        </span>
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-400 font-semibold">
                      डेमो से तुरंत परखें, या वास्तविक समय सारणी के साथ 100%
                      असली परीक्षा सिमुलेशन दें।
                    </p>
                  </div>
                )}
              </div>
              <div className="pt-4">
                <button
                  onClick={ee}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base rounded-2xl cursor-pointer transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2.5 uppercase tracking-wider"
                >
                  <PlayIcon className="w-5 h-5 fill-current" />
                  <span>
                    {l === "exam"
                      ? d === "demo"
                        ? "लाइव डेमो टेस्ट प्रारंभ करें (Start Live Demo)"
                        : "पूर्ण सरकारी मॉक परीक्षा प्रारंभ करें (Start Full Mock)"
                      : "अभ्यास शुरू करें (Start Practice Session)"}
                  </span>
                </button>
              </div>
            </div>
            <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/5 rounded-full blur-2xl pointer-events-none" />
              <div className="space-y-5">
                <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/15 text-emerald-800 rounded-2xl w-12 h-12 flex items-center justify-center">
                  <TrophyIcon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] bg-amber-500 text-black font-black px-2 py-0.5 rounded-md uppercase tracking-wider block w-max">
                    CBT SPECS SHEET
                  </span>
                  <h3 className="text-base font-black text-slate-900 leading-tight pt-1">
                    {(L = QUIZ_EXAMS.find((Le: any) => Le.id === n)) == null
                      ? void 0
                      : L.name.split("(")[0]}
                    {" की परीक्षा नीति:"}
                  </h3>
                  <p className="text-[11px] text-gray-500 font-semibold">
                    सरकार के वर्तमान नियमों के तहत लाइव परीक्षा अनुक्रम।
                  </p>
                </div>
                <div className="space-y-3 bg-white p-4.5 rounded-2xl border border-slate-100 text-xs text-slate-800 font-bold">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-gray-500">
                      कुल प्रश्न (Questions):
                    </span>
                    <span className="font-mono text-slate-900 text-sm">
                      {l === "exam"
                        ? examSpec(n, d === "demo").count
                        : Math.min(h, examPool(n).length)}
                      {" प्रश्न"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-gray-500">
                      परीक्षा समय (Duration):
                    </span>
                    <span className="font-mono text-slate-900 text-sm">
                      {examSpec(n, l === "exam" && d === "demo").mins}
                      {" मिनट"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-gray-500">
                      सही उत्तर अंक (Correct Ans):
                    </span>
                    <span className="font-mono text-emerald-600 text-sm">
                      +
                      {(de = QUIZ_EXAMS.find((Le: any) => Le.id === n)) == null
                        ? void 0
                        : de.correctMarks}
                      {" अंक"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-gray-500">
                      गलत उत्तर नीति (Negative):
                    </span>
                    <span className="font-mono text-red-600 text-sm">
                      -
                      {(le = QUIZ_EXAMS.find((Le: any) => Le.id === n)) == null
                        ? void 0
                        : le.negativeMarks}
                      {" अंक"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">
                      अधिकतम अंक (Max Marks):
                    </span>
                    <span className="font-mono text-slate-950 text-sm font-black">
                      {examSpec(n, l === "exam" && d === "demo").count *
                        (((ue = QUIZ_EXAMS.find((Le: any) => Le.id === n)) ==
                        null
                          ? void 0
                          : ue.correctMarks) ?? 1)}
                      {" अंक"}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    शामिल पाठ्यक्रम (Syllabus Coverage)
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(we = QUIZ_EXAMS.find((Le: any) => Le.id === n)) == null
                      ? void 0
                      : we.sections.map((Le: any, At: any) => (
                          <span
                            key={At}
                            className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-1 rounded-lg border border-slate-150"
                          >
                            {"• "}
                            {Le}
                          </span>
                        ))}
                  </div>
                </div>
              </div>
              <div className="bg-emerald-600/5 rounded-2xl p-4 border border-emerald-600/10 text-center">
                <p className="text-[10px] text-emerald-950 font-black uppercase tracking-wider flex items-center justify-center gap-1">
                  <SparklesIcon className="w-3.5 h-3.5 text-amber-500" />
                  <span>300+ अद्यतन प्रश्न प्रति विषय</span>
                </p>
                <p className="text-[11px] text-gray-500 font-semibold mt-1 leading-relaxed">
                  हमारा सिमुलेटर पूरी तरह संवादात्मक है ताकि आप एक रीयल-टाइम
                  परीक्षा कक्ष जैसा तार्किक और तीव्र अभ्यास अनुभव पा सकें।
                </p>
              </div>
            </div>
          </motion.div>
        )}
        {g === "playing" && (
          <motion.div
            key={"quiz-playing"}
            initial={{
              opacity: 0,
              scale: 0.99,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.99,
            }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-150 shadow-md overflow-hidden flex flex-col justify-between">
              <div className="bg-slate-900 text-white p-4.5 flex items-center justify-between gap-4 select-none">
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 bg-emerald-500 text-slate-950 font-black text-xs rounded-lg uppercase tracking-wider">
                    {l === "exam" ? "CBT LIVE TEST" : "PRACTICE MODE"}
                  </div>
                  <div className="text-xs font-bold text-slate-300">
                    {(me = QUIZ_EXAMS.find((Le: any) => Le.id === n)) == null
                      ? void 0
                      : me.name}
                  </div>
                </div>
                <div className="text-xs font-black text-slate-200">
                  {"प्रश्न "}
                  {C + 1}
                  {" / "}
                  {m.length}
                </div>
              </div>
              <div className="h-1.5 w-full bg-slate-800">
                <div
                  className="h-full bg-emerald-400 transition-all duration-300"
                  style={{
                    width: `${((C + 1) / m.length) * 100}%`,
                  }}
                />
              </div>
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-slate-100 text-slate-600 font-black uppercase tracking-widest px-2.5 py-1 rounded-md border border-slate-200">
                    {"Syllabus Section: "}
                    {((_e = m[C]) == null ? void 0 : _e.category) ===
                    "competition"
                      ? "प्रतियोगिता सामान्य ज्ञान"
                      : ((Ge = m[C]) == null ? void 0 : Ge.category) ===
                          "reasoning"
                        ? "तर्कशक्ति (Reasoning)"
                        : ((ze = m[C]) == null ? void 0 : ze.category) === "gk"
                          ? "सामान्य ज्ञान (GK)"
                          : ((st = m[C]) == null ? void 0 : st.category) ===
                              "paheli"
                            ? "संताली एवं लोक पहेलियाँ"
                            : "सामान्य शैक्षणिक अध्ययन"}
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg md:text-xl font-black text-slate-900 leading-relaxed font-display">
                    {(bt = m[C]) == null ? void 0 : bt.text}
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-3.5 pt-2">
                  {(lt = m[C]) == null
                    ? void 0
                    : lt.options.map((Le: any, At: any) => {
                        const dt = y[C] === At,
                          pt = At === m[C].correctAnswer;
                        let ht =
                            "border-gray-200 hover:border-emerald-600 hover:bg-emerald-50/10",
                          mt = null;
                        return (
                          l === "practice"
                            ? U
                              ? pt
                                ? ((ht =
                                    "border-emerald-500 bg-emerald-50/30 text-emerald-950 font-bold ring-1 ring-emerald-500"),
                                  (mt = (
                                    <CircleCheckIcon className="w-5 h-5 text-emerald-600 shrink-0" />
                                  )))
                                : Q === At
                                  ? ((ht =
                                      "border-red-400 bg-red-50/20 text-red-950 ring-1 ring-red-400"),
                                    (mt = (
                                      <CircleXIcon className="w-5 h-5 text-red-600 shrink-0" />
                                    )))
                                  : (ht =
                                      "border-gray-100 opacity-60 bg-gray-50")
                              : Q === At &&
                                (ht = "border-emerald-600 bg-emerald-50")
                            : dt &&
                              ((ht =
                                "border-emerald-600 bg-emerald-50/45 font-bold ring-2 ring-emerald-600"),
                              (mt = (
                                <CircleCheckIcon className="w-5 h-5 text-emerald-600 shrink-0" />
                              ))),
                          (
                            <button
                              key={At}
                              disabled={l === "practice" && U}
                              onClick={() => Ce(At)}
                              className={`w-full text-left p-4 rounded-xl border transition flex items-center justify-between gap-4 cursor-pointer text-xs sm:text-sm font-medium ${ht}`}
                            >
                              <div className="flex items-center gap-3">
                                <span
                                  className={`w-6 h-6 rounded-lg font-extrabold text-[11px] sm:text-xs flex items-center justify-center uppercase shrink-0 ${dt ? "bg-emerald-600 text-white" : "bg-slate-100 text-gray-700"}`}
                                >
                                  {String.fromCharCode(65 + At)}
                                </span>
                                <span className="font-bold text-slate-800 leading-normal">
                                  {Le}
                                </span>
                              </div>
                              {mt}
                            </button>
                          )
                        );
                      })}
                </div>
                <AnimatePresence>
                  {l === "practice" && U && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl space-y-2 mt-4 select-none"
                    >
                      <div className="flex items-center gap-2 text-amber-800">
                        <LightbulbIcon className="w-4.5 h-4.5 fill-current" />
                        <h4 className="text-xs font-black uppercase tracking-wider">
                          विस्तृत स्पष्टीकरण (Detailed Academic Explanation)
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-emerald-950 font-semibold leading-relaxed">
                        {(ut = m[C]) == null ? void 0 : ut.explanation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="pt-5 border-t border-gray-150 flex flex-wrap items-center justify-between gap-3 select-none">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        C > 0 && j(C - 1);
                      }}
                      disabled={C === 0}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl cursor-pointer transition flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronLeftIcon className="w-4 h-4" />
                      <span>पिछला (Prev)</span>
                    </button>
                    <button
                      onClick={() => {
                        (E((Le: any) => {
                          const At = {
                            ...Le,
                          };
                          return (delete At[C], At);
                        }),
                          T(!1),
                          Z(null));
                      }}
                      className="px-4 py-2.5 bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-700 font-bold text-xs rounded-xl cursor-pointer transition border border-slate-200 hover:border-red-200"
                    >
                      उत्तर साफ़ करें (Clear Answer)
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={Me}
                      className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 font-extrabold text-xs rounded-xl cursor-pointer transition"
                    >
                      छोड़ें (Quit Test)
                    </button>
                    <button
                      onClick={Ne}
                      className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl cursor-pointer transition flex items-center gap-1.5 shadow-md"
                    >
                      <span>
                        {C === m.length - 1
                          ? "परीक्षा समाप्त करें (Submit Exam)"
                          : "सहेजें और अगला (Save & Next)"}
                      </span>
                      <ChevronRightIcon className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 space-y-6">
              {l === "exam" && (
                <div
                  className={`p-6 rounded-3xl border shadow-md relative overflow-hidden select-none transition-colors duration-200 bg-white ${z <= 120 ? "border-red-200" : "border-slate-200"}`}
                >
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                        CBT TIME REMAINING
                      </p>
                      <h4
                        className={`text-2xl sm:text-3xl font-mono font-black mt-1 ${z <= 120 ? "text-red-600 animate-pulse" : "text-slate-900"}`}
                      >
                        {Math.floor(z / 3600)
                          .toString()
                          .padStart(2, "0")}
                        :
                        {Math.floor((z % 3600) / 60)
                          .toString()
                          .padStart(2, "0")}
                        :{(z % 60).toString().padStart(2, "0")}
                      </h4>
                    </div>
                    <div
                      className={`p-3 rounded-2xl ${z <= 120 ? "bg-red-500/10 text-red-600" : "bg-emerald-500/10 text-emerald-600"}`}
                    >
                      <TimerIcon
                        className={`w-7 h-7 ${z <= 120 ? "animate-bounce" : ""}`}
                      />
                    </div>
                  </div>
                  {z <= 120 && (
                    <div className="mt-3 text-[11px] text-red-700 bg-red-50 p-2.5 rounded-lg border border-red-100 font-bold flex items-center gap-1.5">
                      <TriangleAlertIcon className="w-3.5 h-3.5 shrink-0" />
                      <span>
                        चेतावनी: समय समाप्त होने वाला है! शीघ्रता करें।
                      </span>
                    </div>
                  )}
                </div>
              )}
              <div className="bg-white rounded-3xl border border-gray-150 p-6 shadow-md space-y-4">
                <div className="pb-3 border-b border-gray-100 flex justify-between items-center text-xs">
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase">
                      STUDENT CONSOLE
                    </p>
                    <p className="font-extrabold text-slate-800">
                      Demo Candidate
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-black uppercase">
                      DEPARTMENT
                    </p>
                    <p className="font-extrabold text-emerald-700">
                      {(yt = QUIZ_EXAMS.find((Le: any) => Le.id === n)) == null
                        ? void 0
                        : yt.id.replace("_", " ").toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                  <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-100 rounded-lg">
                    <span className="w-3.5 h-3.5 rounded-md bg-emerald-500 text-white flex items-center justify-center font-mono font-black text-[8px]">
                      {Object.keys(y).length}
                    </span>
                    <span className="text-gray-600">Answered (उत्तर दिया)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-100 rounded-lg">
                    <span className="w-3.5 h-3.5 rounded-md bg-red-500 text-white flex items-center justify-center font-mono font-black text-[8px]">
                      {m.length - Object.keys(y).length}
                    </span>
                    <span className="text-gray-600">Not Answered</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    QUESTION PALETTE (सीधे प्रश्न पर जाने के लिए क्लिक करें)
                  </p>
                  <div className="grid grid-cols-5 gap-2 max-h-56 overflow-y-auto p-1 bg-slate-50 rounded-2xl border border-slate-100">
                    {m.map((Le: any, At: any) => {
                      const dt = C === At,
                        pt = y[At] !== void 0;
                      let ht =
                        "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200";
                      return (
                        pt
                          ? (ht =
                              "bg-emerald-500 text-white border-emerald-600")
                          : At < C &&
                            (ht = "bg-red-500 text-white border-red-600"),
                        (
                          <button
                            key={At}
                            onClick={() => j(At)}
                            className={`py-2 rounded-lg font-mono font-black text-xs cursor-pointer border text-center transition ${ht} ${dt ? "ring-2 ring-slate-900 ring-offset-1" : ""}`}
                          >
                            {(At + 1).toString().padStart(2, "0")}
                          </button>
                        )
                      );
                    })}
                  </div>
                </div>
                <div className="pt-2">
                  <button
                    onClick={je}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-950 text-white font-extrabold text-xs rounded-xl cursor-pointer transition shadow-sm hover:shadow text-center uppercase tracking-wider"
                  >
                    टेस्ट पूरा जमा करें (Final CBT Submit)
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {g === "completed" && (
          <motion.div
            key={"quiz-completed"}
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="bg-white rounded-3xl border border-gray-150 p-6 md:p-8 shadow-lg text-center relative overflow-hidden select-none">
              <div
                className={`absolute top-0 inset-x-0 h-3 bg-gradient-to-r ${Ke().color}`}
              />
              <div className="space-y-6 pt-4">
                <div className="inline-flex items-center justify-center p-4 bg-emerald-50 rounded-full text-emerald-600 shadow-inner">
                  <AwardIcon className="w-10 h-10 animate-bounce" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-emerald-950 font-display">
                    प्रश्नोत्तरी का अंतिम परिणाम (Quiz Results Summary)
                  </h2>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                    EDISAM Online Intelligence Report
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 max-w-xl mx-auto p-6 bg-slate-50 border border-gray-100 rounded-3xl">
                  <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="54"
                        strokeWidth="10"
                        stroke="#f1f5f9"
                        fill="transparent"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="54"
                        strokeWidth="10"
                        stroke="#059669"
                        fill="transparent"
                        strokeDasharray={339.29}
                        strokeDashoffset={
                          339.29 - (339.29 * Ke().percentage) / 100
                        }
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-emerald-950 font-mono">
                        {Ke().percentage}%
                      </span>
                      <span className="text-[10px] text-gray-400 font-black uppercase">
                        Accuracy
                      </span>
                    </div>
                  </div>
                  <div className="text-left space-y-2 flex-grow">
                    <span
                      className={`inline-block text-xs font-black uppercase tracking-wider text-white px-3 py-1 rounded-xl bg-gradient-to-r ${Ke().color}`}
                    >
                      {Ke().badge}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-emerald-950">
                      {"कुल अंक: "}
                      {F}
                      {" / "}
                      {m.length}
                      {" सही उत्तर"}
                    </h3>
                    <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                      {Ke().feedback}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={Me}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl cursor-pointer transition shadow-md flex items-center gap-2 uppercase tracking-wider"
                  >
                    <RotateCcwIcon className="w-4.5 h-4.5" />
                    <span>पुनः प्रयास करें (Restart Test)</span>
                  </button>
                  <button
                    onClick={Me}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs sm:text-sm rounded-xl cursor-pointer transition uppercase tracking-wider"
                  >
                    विषय बदलें (Change Category)
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl border border-gray-150 p-6 md:p-8 shadow-md space-y-6 select-none">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-base sm:text-lg font-black text-emerald-950 flex items-center gap-2">
                  <BookOpenIcon className="w-5 h-5 text-emerald-700" />
                  <span>
                    प्रश्न पत्र की गहन समीक्षा (Academic Answer Key Review)
                  </span>
                </h3>
                <p className="text-xs text-gray-500 font-semibold mt-1">
                  अपनी सभी गलतियों को सुधारें और सही तार्किक तथ्यों का अध्ययन
                  करें।
                </p>
              </div>
              <div className="space-y-5">
                {m.map((Le: any, At: any) => {
                  const dt = y[At],
                    pt = dt === Le.correctAnswer;
                  return (
                    <div
                      key={Le.id}
                      className={`p-5 rounded-2xl border flex flex-col gap-3.5 transition duration-150 ${pt ? "border-emerald-100 bg-emerald-50/10" : "border-red-100 bg-red-50/5"}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                            {"Question "}
                            {At + 1}
                            {" ("}
                            {Le.category.toUpperCase()})
                          </span>
                          <h4 className="text-xs sm:text-sm md:text-base font-black text-emerald-950 leading-relaxed">
                            {Le.text}
                          </h4>
                        </div>
                        <div className="shrink-0">
                          {pt ? (
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 font-black text-[10px] px-2 py-1 rounded-md border border-emerald-200">
                              <CircleCheckIcon className="w-3.5 h-3.5" />
                              <span>CORRECT</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 font-black text-[10px] px-2 py-1 rounded-md border border-red-200">
                              <CircleXIcon className="w-3.5 h-3.5" />
                              <span>INCORRECT</span>
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
                        {Le.options.map((ht: any, mt: any) => {
                          const xt = dt === mt,
                            Jt = Le.correctAnswer === mt;
                          let Bt = "bg-slate-50 border-gray-150 text-gray-700";
                          return (
                            Jt
                              ? (Bt =
                                  "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold")
                              : xt &&
                                (Bt =
                                  "bg-red-50 border-red-200 text-red-900 font-bold"),
                            (
                              <div
                                key={mt}
                                className={`p-2.5 rounded-lg border text-[11px] sm:text-xs flex items-center justify-between gap-2 ${Bt}`}
                              >
                                <span>
                                  {String.fromCharCode(65 + mt)}
                                  {". "}
                                  {ht}
                                </span>
                                {Jt && (
                                  <span className="text-[9px] font-black uppercase text-emerald-700">
                                    Correct Answer
                                  </span>
                                )}
                                {xt && !Jt && (
                                  <span className="text-[9px] font-black uppercase text-red-700">
                                    Your Choice
                                  </span>
                                )}
                              </div>
                            )
                          );
                        })}
                      </div>
                      <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/10 space-y-1">
                        <div className="flex items-center gap-1 text-amber-800 text-[11px] font-black uppercase tracking-wider">
                          <LightbulbIcon className="w-4 h-4 fill-current" />
                          <span>स्पष्टीकरण (Analytical Review)</span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-emerald-950 font-bold leading-relaxed">
                          {Le.explanation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="pt-4 border-t border-gray-100 text-center">
                <button
                  onClick={Me}
                  className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl cursor-pointer transition shadow-md uppercase tracking-wider"
                >
                  क्विज़ पैनल पर वापस जाएं (Back to Setup)
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
