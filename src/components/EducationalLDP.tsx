// Ported from EDISAM (edisam.ai.studio) — same UI, texts, question banks and behaviour.
// Converted from the production bundle back to TSX; local variable names are the minified originals.
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ActivityIcon,
  ArrowLeftIcon,
  AwardIcon,
  BookMarkedIcon,
  BookOpenIcon,
  BrainIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  CircleQuestionMarkIcon,
  CircleXIcon,
  CompassIcon,
  DownloadIcon,
  FileDownIcon,
  FileTextIcon,
  GraduationCapIcon,
  ListChecksIcon,
  LoaderCircleIcon,
  PenIcon,
  PlusIcon,
  RotateCcwIcon,
  SparklesIcon,
  XIcon,
} from "lucide-react";
import { useLanguage, EdisamLanguageSwitch } from "./edisam/edisamI18n";
import { edisamChapterQuestionsFetch } from "./edisam/edisamAi";
import { generateEdisamPdf } from "./edisam/edisamPdf";
// Quiz tab is its own chunk: LDP opens without downloading the quiz bank
const QuizIQTest = React.lazy(() => import("./QuizIQTest").then((m) => ({ default: m.QuizIQTest })));
import { mergeNewQuestions, pickUniqueQuestions, questionKey } from "../utils/questionDedupe";
import {
  LDP_SUBJECTS,
  generateChapterQuestions,
  COMPETITIVE_EXAM_GROUPS,
  SCHOOL_BOARD_GROUPS,
  COMPETITIVE_SUBJECTS,
  KNOWLEDGE_BOOKS,
} from "../data/edisamLdpData";

// Study-guide PDFs: EDISAM makes them in the browser (jsPDF) or downloads an admin-uploaded file.
// EDISAM's code has no payment step (₹99 appears only in its FAQ text), so the button works the same here.
// Set LDP_PDF_DOWNLOAD_ENABLED to false to show the "coming soon / contact" message instead.
export const LDP_PDF_DOWNLOAD_ENABLED = true;
export const LDP_PDF_FALLBACK_MESSAGE =
  "जल्द आ रहा है! PDF के लिए संपर्क करें: +91 91109 77117\nComing soon — contact +91 91109 77117";
export function LivePracticePanel() {
  var Me: any,
    Ke: any,
    Pe: any,
    Ve: any,
    L: any,
    Y: any,
    ye: any,
    de: any,
    le: any;
  const [a, t] = React.useState<any>("school"),
    [s, n] = React.useState<any>(1),
    [o, l] = React.useState<any>(null),
    [A, d] = React.useState<any>(null),
    [u, h] = React.useState<any>("upsc"),
    [p, g] = React.useState<any>(""),
    [b, m] = React.useState<any>(""),
    [B, C] = React.useState<any>("national"),
    [j, y] = React.useState<any>(""),
    [E, U] = React.useState<any>(""),
    [T, Q] = React.useState<any>("selection"),
    [Z, z] = React.useState<any>([]),
    [O, D] = React.useState<any>(0),
    [R, M] = React.useState<any>({}),
    [F, G] = React.useState<any>(!1),
    [S, te] = React.useState<any>(null),
    [J, X] = React.useState<any>(0),
    [ie, $] = React.useState<any>([]),
    [ve, K] = React.useState<any>(!1),
    [k, q] = React.useState<any>({});
  (React.useEffect(() => {
    (l(null), d(null), g(""), m(""), y(""), U(""), Q("selection"));
  }, [a]),
    React.useEffect(() => {
      (l(null), d(null), Q("selection"));
    }, [s]),
    React.useEffect(() => {
      (d(null), Q("selection"));
    }, [o]),
    React.useEffect(() => {
      (m(""), Q("selection"));
    }, [p]),
    React.useEffect(() => {
      (U(""), Q("selection"));
    }, [j]),
    React.useEffect(() => {
      let H = "";
      if (
        (a === "competitive"
          ? p && b && (H = `seen_questions_comp_${p}_${b}`)
          : a === "entrance"
            ? j && E && (H = `seen_questions_ent_${j}_${E}`)
            : A && o && (H = `seen_questions_c${s}_s${o.id}_ch${A.id}`),
        H)
      ) {
        const ue = localStorage.getItem(H);
        $(ue ? JSON.parse(ue) : []);
      }
    }, [A, o, s, p, b, j, E, a]));
  const ee = () => {
      let H: any = [],
        ue = "",
        we = "";
      if (a === "competitive") {
        if (!p || !b) return;
        ((H = generateChapterQuestions(0, p, b)),
          (ue = `comp_${p}_${b}`),
          (we = `seen_questions_comp_${p}_${b}`));
      } else if (a === "entrance") {
        if (!j || !E) return;
        ((H = generateChapterQuestions(0, j, E)),
          (ue = `ent_${j}_${E}`),
          (we = `seen_questions_ent_${j}_${E}`));
      } else {
        if (!o || !A) return;
        ((H = generateChapterQuestions(s, o.id, A.id)),
          (ue = `c${s}_s${o.id}_ch${A.id}`),
          (we = `seen_questions_c${s}_s${o.id}_ch${A.id}`));
      }
      // AI-fresh questions first, deduped against the bank; no question twice in one practice set.
      const _e = mergeNewQuestions(H, k[ue] || []);
      const { picked: st, resetSeen } = pickUniqueQuestions(_e, 15, ie);
      resetSeen && localStorage.removeItem(we);
      const bt = Array.from(
          new Set([
            ...(resetSeen ? [] : ie),
            ...st.map((lt: any) => lt.id),
            ...st.map((lt: any) => questionKey(lt)),
          ]),
        );
      ($(bt),
        localStorage.setItem(we, JSON.stringify(bt)),
        z(st),
        D(0),
        M({}),
        G(!1),
        te(null),
        X(0),
        Q("practicing"));
    },
    ne = (H: any) => {
      if (F) return;
      (te(H), G(!0));
      const ue = Z[O];
      (M((_e: any) => ({
        ..._e,
        [O]: H,
      })),
        H === ue.correctAnswer && X((_e: any) => _e + 1));
      const we =
          a === "competitive"
            ? `seen_questions_comp_${p}_${b}`
            : a === "entrance"
              ? `seen_questions_ent_${j}_${E}`
              : `seen_questions_c${s}_s${o.id}_ch${A.id}`,
        me = Array.from(new Set([...ie, ue.id, ue.text.trim().toLowerCase()]));
      ($(me), localStorage.setItem(we, JSON.stringify(me)));
    },
    pe = () => {
      O + 1 < Z.length ? (D(O + 1), G(!1), te(null)) : Q("completed");
    },
    Ce = () => {
      if (O > 0) {
        D(O - 1);
        const H = R[O - 1];
        (te(H !== void 0 ? H : null), G(!0));
      }
    },
    Ne = async () => {
      var ue: any, we: any;
      K(!0);
      const H =
        a === "competitive"
          ? {
              classNum: 0,
              subjectId: p,
              subjectName: p,
              chapterId: b,
              chapterName:
                ((ue = COMPETITIVE_SUBJECTS.find((me: any) => me.id === b)) ==
                null
                  ? void 0
                  : ue.name) || "General Syllabus",
            }
          : a === "entrance"
            ? {
                classNum: 0,
                subjectId: j,
                subjectName: j,
                chapterId: E,
                chapterName:
                  ((we = COMPETITIVE_SUBJECTS.find((me: any) => me.id === E)) ==
                  null
                    ? void 0
                    : we.name) || "General Syllabus",
              }
            : {
                classNum: s,
                subjectId: o.id,
                subjectName: o.name,
                chapterId: A.id,
                chapterName: A.name,
              };
      try {
        const me = await edisamChapterQuestionsFetch(
          "/api/generate-chapter-questions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(H),
          },
        );
        if (me.ok) {
          const _e = await me.json();
          if (_e && _e.questions && _e.questions.length > 0) {
            const Ge =
              a === "competitive"
                ? `comp_${p}_${b}`
                : a === "entrance"
                  ? `ent_${j}_${E}`
                  : `c${s}_s${o.id}_ch${A.id}`;
            (q((ze: any) => ({
              ...ze,
              [Ge]: _e.questions,
            })),
              alert(
                "सफलता: Gemini AI ने १५ बिल्कुल नए प्रश्न तैयार कर लिए हैं! / Success: 15 fresh questions synced!",
              ));
          } else
            alert(
              "नया प्रश्न बैंक तैयार करने में त्रुटि। स्थानीय प्रश्न बैंक से शुरू कर रहे हैं।",
            );
        } else
          alert(
            "सर्वर व्यस्त है। हम आपकी सुविधा के लिए ऑफलाइन प्रामाणिक प्रश्न बैंक लोड कर रहे हैं।",
          );
      } catch (me) {
        (console.error(me),
          alert(
            "ऑफ़लाइन मोड सक्रिय: उत्कृष्ट और प्रामाणिक पाठ्यपुस्तक प्रश्न बैंक लोड किया गया है।",
          ));
      } finally {
        (K(!1), ee());
      }
    },
    je = () => {
      const H = Z.length || 1,
        ue = Math.round((J / H) * 100);
      return ue >= 90
        ? {
            badge: "सर्वश्रेष्ठ शिक्षार्थी (Pratibhashali Champion) 🏆",
            color: "bg-amber-100 text-amber-900 border-amber-300",
            feedback:
              "असाधारण! आपने अध्याय की सूक्ष्म अवधारणाओं को गहराई से समझा है। आपके सभी उत्तर सटीक हैं।",
          }
        : ue >= 70
          ? {
              badge: "उत्कृष्ट प्रयास (Super Achiever) ⭐",
              color: "bg-emerald-100 text-emerald-900 border-emerald-300",
              feedback:
                "बहुत बढ़िया! आपका अभ्यास स्तर अत्यंत सराहनीय है। थोड़ी और एकाग्रता आपको शीर्ष पर पहुंचाएगी।",
            }
          : ue >= 40
            ? {
                badge: "उत्तीर्ण अभ्यासक (Success Seeker)",
                color: "bg-blue-100 text-blue-900 border-blue-300",
                feedback:
                  "अच्छा प्रयास है! गलतियों के स्पष्टीकरण को ध्यान से पढ़ें और एक बार पुनः प्रयास करें।",
              }
            : {
                badge: "ज्ञान आकांक्षी (Knowledge Seeker)",
                color: "bg-rose-100 text-rose-950 border-rose-200",
                feedback:
                  "घबराएं नहीं! सीखना निरंतर चलने वाली प्रक्रिया है। पाठ्यपुस्तकों को पुनः पढ़ें और फिर प्रयास करें।",
              };
    };
  return (
    <div className="bg-white rounded-3xl border border-gray-150 p-6 shadow-sm select-none text-left space-y-6">
      {T === "selection" && (
        <div className="space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <BrainIcon className="w-5.5 h-5.5 text-emerald-700" />
              <span>लाइव अभ्यास केंद्र (LDP Panel)</span>
            </h2>
            <p className="text-xs text-gray-500 font-semibold mt-1">
              स्कूल पाठ्यक्रम (कक्षा १ से १२) और सभी प्रतियोगी परीक्षाओं के
              प्रत्येक भाग से १५+ अनन्य बहुविकल्पीय प्रश्नों का हल और
              स्पष्टीकरण।
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => t("school")}
              className={`flex-1 py-3 text-center text-xs sm:text-sm font-black rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${a === "school" ? "bg-white text-emerald-900 shadow-sm border border-gray-150" : "text-gray-600 hover:text-emerald-800"}`}
            >
              <CompassIcon className="w-4 h-4" />
              <span>स्कूल पाठ्यक्रम (Class 1-12)</span>
            </button>
            <button
              onClick={() => t("competitive")}
              className={`flex-1 py-3 text-center text-xs sm:text-sm font-black rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${a === "competitive" ? "bg-white text-emerald-900 shadow-sm border border-gray-150" : "text-gray-600 hover:text-emerald-800"}`}
            >
              <AwardIcon className="w-4 h-4 text-amber-500" />
              <span>प्रतियोगी परीक्षाएँ (Govt Exams)</span>
            </button>
            <button
              onClick={() => t("entrance")}
              className={`flex-1 py-3 text-center text-xs sm:text-sm font-black rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${a === "entrance" ? "bg-white text-emerald-900 shadow-sm border border-gray-150" : "text-gray-600 hover:text-emerald-800"}`}
            >
              <GraduationCapIcon className="w-4 h-4 text-indigo-500" />
              <span>स्कूल प्रवेश परीक्षाएँ (School Admission)</span>
            </button>
          </div>
          {a === "school" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <CompassIcon className="w-4 h-4 text-emerald-600" />
                  <span>१. कक्षा का चयन करें (Select Class 1-12)</span>
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
                  {Array.from(
                    {
                      length: 12,
                    },
                    (H: any, ue: any) => ue + 1,
                  ).map((H: any) => {
                    const ue = s === H;
                    return (
                      <button
                        key={H}
                        onClick={() => n(H)}
                        className={`py-2.5 rounded-xl text-xs font-black transition cursor-pointer border text-center ${ue ? "bg-emerald-800 border-emerald-800 text-white shadow-sm" : "bg-slate-50 border-gray-200 text-gray-600 hover:bg-white hover:border-emerald-600"}`}
                      >
                        {"Class "}
                        {H}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpenIcon className="w-4 h-4 text-emerald-600" />
                  <span>२. विषय का चयन करें (Select Subject)</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {LDP_SUBJECTS.map((H: any) => {
                    const ue = (o == null ? void 0 : o.id) === H.id;
                    return (
                      <button
                        key={H.id}
                        onClick={() => l(H)}
                        className={`p-4 rounded-2xl border text-left transition cursor-pointer relative overflow-hidden group ${ue ? "bg-emerald-50/30 border-emerald-650 ring-2 ring-emerald-600/30" : "bg-slate-50/50 border-gray-200 hover:bg-slate-50 hover:border-emerald-500"}`}
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                            {"Class "}
                            {s}
                          </span>
                          <h4 className="text-sm font-black text-slate-900 pt-1 group-hover:text-emerald-900 transition">
                            {H.name}
                          </h4>
                          <p className="text-[11px] text-gray-500 font-semibold line-clamp-1">
                            ३ विस्तृत पाठ्यक्रम अध्याय शामिल हैं
                          </p>
                        </div>
                        {ue && (
                          <div className="absolute right-3 top-3 bg-emerald-600 text-white rounded-full p-0.5">
                            <CheckIcon className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              {o && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="space-y-2 pt-2"
                >
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <ListChecksIcon className="w-4 h-4 text-emerald-600" />
                    <span>
                      ३. अध्याय चुनें और अभ्यास प्रारंभ करें (Select Chapter)
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {o.chapters.map((H: any) => {
                      const ue = (A == null ? void 0 : A.id) === H.id;
                      return (
                        <button
                          key={H.id}
                          onClick={() => d(H)}
                          className={`p-4 rounded-2xl border text-left transition cursor-pointer relative flex flex-col justify-between min-h-[120px] ${ue ? "bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/20" : "bg-white border-gray-200 hover:bg-slate-50"}`}
                        >
                          <div className="space-y-1">
                            <h4 className="text-xs sm:text-sm font-black text-slate-900">
                              {H.name}
                            </h4>
                            <p className="text-[11px] text-gray-500 font-medium leading-relaxed line-clamp-2 pt-1">
                              {H.desc}
                            </p>
                          </div>
                          <div className="text-[10px] font-bold text-emerald-700 pt-3 flex items-center justify-between border-t border-gray-50 mt-2 w-full">
                            <span>15 प्रामाणिक अभ्यास प्रश्न</span>
                            <ChevronRightIcon className="w-3 h-3" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>
          )}
          {a === "competitive" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <CompassIcon className="w-4 h-4 text-emerald-600" />
                  <span>
                    १. परीक्षा श्रेणी का चयन करें (Select Exam Category)
                  </span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {COMPETITIVE_EXAM_GROUPS.map((H: any) => {
                    const ue = u === H.id;
                    return (
                      <button
                        key={H.id}
                        onClick={() => {
                          (h(H.id), g(""));
                        }}
                        className={`py-3 px-2 rounded-xl text-xs font-black transition cursor-pointer border text-center truncate ${ue ? "bg-emerald-850 border-emerald-850 text-white shadow-sm" : "bg-slate-50 border-gray-200 text-gray-600 hover:bg-white hover:border-emerald-600"}`}
                      >
                        {H.name}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <AwardIcon className="w-4 h-4 text-emerald-600" />
                  <span>२. लक्षित परीक्षा चुनें (Select Target Exam)</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {(
                    ((Me = COMPETITIVE_EXAM_GROUPS.find(
                      (H: any) => H.id === u,
                    )) == null
                      ? void 0
                      : Me.exams) || []
                  ).map((H: any) => {
                    const ue = p === H;
                    return (
                      <button
                        key={H}
                        onClick={() => g(H)}
                        className={`p-3 rounded-xl border text-left transition cursor-pointer relative pr-10 ${ue ? "bg-emerald-50/50 border-emerald-600 ring-2 ring-emerald-600/20" : "bg-white border-gray-200 hover:bg-slate-50"}`}
                      >
                        <p className="text-xs font-extrabold text-slate-800 leading-snug">
                          {H}
                        </p>
                        {ue && (
                          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-emerald-650 text-white rounded-full p-0.5">
                            <CheckIcon className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              {p && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="space-y-2 pt-2"
                >
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <ListChecksIcon className="w-4 h-4 text-emerald-600" />
                    <span>
                      ३. अभ्यास विषय चुनें (Select Practice Subject/Topic)
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {COMPETITIVE_SUBJECTS.map((H: any) => {
                      const ue = b === H.id;
                      return (
                        <button
                          key={H.id}
                          onClick={() => m(H.id)}
                          className={`p-4 rounded-2xl border text-left transition cursor-pointer relative flex flex-col justify-between min-h-[100px] ${ue ? "bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/20" : "bg-white border-gray-200 hover:bg-slate-50"}`}
                        >
                          <div>
                            <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                              {H.name}
                            </h4>
                            <p className="text-[11px] text-gray-500 font-medium leading-normal pt-1">
                              {H.desc}
                            </p>
                          </div>
                          <div className="text-[10px] font-bold text-emerald-700 pt-2 flex items-center justify-between mt-2 border-t border-gray-50">
                            <span>15+ अनूठे अभ्यास प्रश्न</span>
                            <ChevronRightIcon className="w-3 h-3" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>
          )}
          {a === "entrance" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <CompassIcon className="w-4 h-4 text-indigo-600" />
                  <span>
                    १. स्कूल प्रवेश परीक्षा श्रेणी का चयन करें (Select School
                    Category)
                  </span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {SCHOOL_BOARD_GROUPS.map((H: any) => {
                    const ue = B === H.id;
                    return (
                      <button
                        key={H.id}
                        onClick={() => {
                          (C(H.id), y(""));
                        }}
                        className={`py-3 px-2 rounded-xl text-xs font-black transition cursor-pointer border text-center truncate ${ue ? "bg-emerald-850 border-emerald-850 text-white shadow-sm" : "bg-slate-50 border-gray-200 text-gray-600 hover:bg-white hover:border-emerald-600"}`}
                      >
                        {H.name}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <AwardIcon className="w-4 h-4 text-indigo-600" />
                  <span>
                    २. लक्षित स्कूल/परीक्षा चुनें (Select Target School/Exam)
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {(
                    ((Ke = SCHOOL_BOARD_GROUPS.find((H: any) => H.id === B)) ==
                    null
                      ? void 0
                      : Ke.schools) || []
                  ).map((H: any) => {
                    const ue = j === H;
                    return (
                      <button
                        key={H}
                        onClick={() => y(H)}
                        className={`p-3 rounded-xl border text-left transition cursor-pointer relative pr-10 ${ue ? "bg-emerald-50/50 border-emerald-600 ring-2 ring-emerald-600/20" : "bg-white border-gray-200 hover:bg-slate-50"}`}
                      >
                        <p className="text-xs font-extrabold text-slate-800 leading-snug">
                          {H}
                        </p>
                        {ue && (
                          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-emerald-650 text-white rounded-full p-0.5">
                            <CheckIcon className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              {j && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="space-y-2 pt-2"
                >
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <ListChecksIcon className="w-4 h-4 text-indigo-600" />
                    <span>३. अभ्यास विषय चुनें (Select Practice Topic)</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {COMPETITIVE_SUBJECTS.map((H: any) => {
                      const ue = E === H.id;
                      return (
                        <button
                          key={H.id}
                          onClick={() => U(H.id)}
                          className={`p-4 rounded-2xl border text-left transition cursor-pointer relative flex flex-col justify-between min-h-[100px] ${ue ? "bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/20" : "bg-white border-gray-200 hover:bg-slate-50"}`}
                        >
                          <div>
                            <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                              {H.name}
                            </h4>
                            <p className="text-[11px] text-gray-500 font-medium leading-normal pt-1">
                              {H.desc}
                            </p>
                          </div>
                          <div className="text-[10px] font-bold text-emerald-700 pt-2 flex items-center justify-between mt-2 border-t border-gray-50">
                            <span>15+ अनूठे अभ्यास प्रश्न</span>
                            <ChevronRightIcon className="w-3 h-3" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>
          )}
          {((a === "school" && o && A) ||
            (a === "competitive" && p && b) ||
            (a === "entrance" && j && E)) && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="pt-4 flex flex-col sm:flex-row gap-3 border-t border-gray-100"
            >
              <button
                onClick={ee}
                className="flex-1 py-4 bg-emerald-850 hover:bg-emerald-950 text-white font-extrabold text-sm rounded-xl cursor-pointer transition shadow-md flex items-center justify-center gap-2 uppercase tracking-wide"
              >
                <BrainIcon className="w-4.5 h-4.5" />
                <span>स्थानीय अभ्यास प्रश्न लोड करें (Start Offline)</span>
              </button>
              <button
                onClick={Ne}
                disabled={ve}
                className="flex-1 py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-slate-950 font-black text-sm rounded-xl cursor-pointer transition shadow-md flex items-center justify-center gap-2 uppercase tracking-wide"
              >
                {ve ? (
                  <>
                    <ActivityIcon className="w-4.5 h-4.5 animate-spin" />
                    <span>AI प्रश्न बैंक तैयार हो रहा है...</span>
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-4.5 h-4.5 animate-pulse" />
                    <span>
                      AI से नये प्रश्न बैंक प्राप्त करें (Sync Live AI)
                    </span>
                  </>
                )}
              </button>
            </motion.div>
          )}
        </div>
      )}
      {T === "practicing" && Z.length > 0 && (
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="bg-amber-500 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded-sm uppercase">
                  {a === "competitive"
                    ? "Govt Exam"
                    : a === "entrance"
                      ? "School Entrance"
                      : `Class ${s}`}
                  {" Practice"}
                </span>
                <span className="text-xs text-slate-300 font-bold">
                  {a === "competitive"
                    ? p
                    : a === "entrance"
                      ? j
                      : o == null
                        ? void 0
                        : o.nameEn}
                </span>
              </div>
              <h3 className="text-sm font-black text-white">
                {a === "competitive"
                  ? (Pe = COMPETITIVE_SUBJECTS.find((H: any) => H.id === b)) ==
                    null
                    ? void 0
                    : Pe.name
                  : a === "entrance"
                    ? (Ve = COMPETITIVE_SUBJECTS.find(
                        (H: any) => H.id === E,
                      )) == null
                      ? void 0
                      : Ve.name
                    : A == null
                      ? void 0
                      : A.name}
              </h3>
            </div>
            <div className="text-xs font-mono font-black bg-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2 shrink-0">
              <span className="text-emerald-400">
                {"सही: "}
                {J}
              </span>
              <span className="text-gray-400">/</span>
              <span>
                {"प्रश्न: "}
                {O + 1}
                {" of "}
                {Z.length}
              </span>
            </div>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all duration-300"
              style={{
                width: `${((O + 1) / Z.length) * 100}%`,
              }}
            />
          </div>
          <div className="bg-slate-50/50 p-6 rounded-2xl border border-gray-150 space-y-4">
            <span className="text-[10px] bg-slate-200 text-slate-700 font-black px-2 py-0.5 rounded-sm uppercase font-mono tracking-widest">
              {"QUESTION "}
              {O + 1}
            </span>
            <h4 className="text-base sm:text-lg font-black text-slate-900 leading-relaxed">
              {(L = Z[O]) == null ? void 0 : L.text}
            </h4>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {(Y = Z[O]) == null
              ? void 0
              : Y.options.map((H: any, ue: any) => {
                  var ze: any;
                  const we = S === ue,
                    me =
                      ue === ((ze = Z[O]) == null ? void 0 : ze.correctAnswer);
                  let _e =
                      "bg-white border-gray-250 hover:bg-slate-50 hover:border-emerald-600 text-slate-800",
                    Ge = (
                      <CircleQuestionMarkIcon className="w-4 h-4 text-gray-400" />
                    );
                  return (
                    F
                      ? me
                        ? ((_e =
                            "bg-emerald-50 border-emerald-600 text-emerald-950 font-bold ring-1 ring-emerald-600"),
                          (Ge = (
                            <CircleCheckIcon className="w-4 h-4 text-emerald-600" />
                          )))
                        : we
                          ? ((_e =
                              "bg-rose-50 border-rose-500 text-rose-950 font-bold ring-1 ring-rose-500"),
                            (Ge = (
                              <CircleXIcon className="w-4 h-4 text-rose-600" />
                            )))
                          : ((_e =
                              "bg-white border-gray-150 text-gray-400 opacity-60"),
                            (Ge = (
                              <div className="w-4 h-4 rounded-full border border-gray-200" />
                            )))
                      : we &&
                        (_e =
                          "bg-emerald-50 border-emerald-600 text-emerald-950 font-bold ring-1 ring-emerald-600"),
                    (
                      <button
                        key={ue}
                        onClick={() => ne(ue)}
                        disabled={F}
                        className={`p-4 rounded-xl border text-left transition flex items-center justify-between gap-3 ${_e} ${F ? "cursor-default" : "cursor-pointer"}`}
                      >
                        <span className="text-xs sm:text-sm font-semibold">
                          {H}
                        </span>
                        {Ge}
                      </button>
                    )
                  );
                })}
          </div>
          <AnimatePresence>
            {F && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                }}
                className="p-5 bg-amber-500/5 border border-amber-500/15 rounded-2xl text-xs sm:text-sm text-slate-800 leading-relaxed font-medium space-y-1 text-left"
              >
                <div className="font-extrabold text-amber-700 flex items-center gap-1">
                  <span>
                    💡 उत्तर की विस्तृत व्याख्या (Detailed Explanation):
                  </span>
                </div>
                <p>{(ye = Z[O]) == null ? void 0 : ye.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex items-center justify-between pt-4 border-t border-gray-150 select-none">
            <button
              onClick={Ce}
              disabled={O === 0}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-lg text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-1"
            >
              <ChevronLeftIcon className="w-3.5 h-3.5" />
              <span>पिछला (Prev)</span>
            </button>
            <button
              onClick={() => {
                confirm(
                  "क्या आप वाकई इस अभ्यास सत्र को समाप्त करना चाहते हैं? / Are you sure you want to exit?",
                ) && Q("selection");
              }}
              className="px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-lg text-[10px] font-black uppercase tracking-wider transition cursor-pointer"
            >
              सत्र छोड़ें (Quit)
            </button>
            <button
              onClick={pe}
              disabled={!F}
              className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 disabled:bg-slate-200 disabled:text-gray-400 text-white rounded-lg text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-1 shadow-sm"
            >
              <span>
                {O + 1 === Z.length ? "समाप्त (Finish)" : "अगला (Next)"}
              </span>
              <ChevronRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
      {T === "completed" && (
        <div className="p-6 text-center space-y-6 max-w-xl mx-auto">
          <div className="w-16 h-16 bg-emerald-100 border border-emerald-200 text-emerald-850 rounded-full flex items-center justify-center text-3xl mx-auto animate-bounce">
            🎉
          </div>
          <div className="space-y-1">
            <span className="text-[10px] bg-emerald-600 text-white font-black px-2.5 py-1 rounded-full uppercase tracking-widest inline-block">
              EXAM COMPLETED
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-2 font-display">
              अभ्यास सत्र सफलतापूर्वक संपन्न!
            </h2>
            <p className="text-xs text-gray-400 font-semibold uppercase font-mono tracking-widest">
              {a === "competitive"
                ? `${p} • ${(de = COMPETITIVE_SUBJECTS.find((H: any) => H.id === b)) == null ? void 0 : de.name.split(" ")[0]}`
                : a === "entrance"
                  ? `${j} • ${(le = COMPETITIVE_SUBJECTS.find((H: any) => H.id === E)) == null ? void 0 : le.name.split(" ")[0]}`
                  : `${o == null ? void 0 : o.nameEn} • ${A == null ? void 0 : A.name.split(":")[0]}`}
            </p>
          </div>
          <div className="bg-slate-50 p-6 rounded-3xl border border-gray-150 space-y-4">
            <div className="flex justify-around items-center gap-4">
              <div className="text-center">
                <p className="text-[10px] text-gray-400 font-extrabold uppercase">
                  कुल प्रश्न
                </p>
                <p className="text-2xl font-black text-slate-800 font-mono">
                  {Z.length}
                </p>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="text-center">
                <p className="text-[10px] text-gray-400 font-extrabold uppercase text-emerald-650">
                  सही उत्तर
                </p>
                <p className="text-2xl font-black text-emerald-600 font-mono">
                  {J}
                </p>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="text-center">
                <p className="text-[10px] text-gray-400 font-extrabold uppercase">
                  सफलता दर
                </p>
                <p className="text-2xl font-black text-slate-800 font-mono">
                  {Math.round((J / Z.length) * 100)}%
                </p>
              </div>
            </div>
            <div
              className={`p-4 rounded-2xl border text-xs sm:text-sm text-left ${je().color}`}
            >
              <p className="font-extrabold flex items-center gap-1">
                <AwardIcon className="w-4 h-4" />
                <span>{je().badge}</span>
              </p>
              <p className="mt-1 text-gray-700 font-semibold leading-relaxed">
                {je().feedback}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 select-none">
            <button
              onClick={() => {
                Q("selection");
              }}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs sm:text-sm rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 border border-gray-200"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>दूसरा अध्याय चुनें (Back)</span>
            </button>
            <button
              onClick={ee}
              className="flex-1 py-3 bg-emerald-850 hover:bg-emerald-900 text-white font-extrabold text-xs sm:text-sm rounded-xl transition shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <RotateCcwIcon className="w-4 h-4" />
              <span>पुनः अभ्यास करें (Retake)</span>
            </button>
            <button
              onClick={() => {
                generateEdisamPdf({
                  category: `Practice Result • ${o == null ? void 0 : o.title}`,
                  title: `${A == null ? void 0 : A.title} - Practice Test Report`,
                  subtitle: `Score: ${J} / ${Z.length} (${Math.round((J / Z.length) * 100)}%)`,
                  content: [
                    `Subject: ${o == null ? void 0 : o.title}`,
                    `Chapter: ${A == null ? void 0 : A.title}`,
                    `Total Questions: ${Z.length} | Correct Answers: ${J}`,
                  ],
                  sections: Z.map((H: any, ue: any) => ({
                    heading: `Q${ue + 1}. ${H.question}`,
                    bulletPoints: [
                      `Options: ${H.options ? H.options.join(", ") : ""}`,
                      `Correct Answer: ${H.options && H.correctAnswer !== void 0 ? H.options[H.correctAnswer] : "Correct Option Listed"}`,
                      `Explanation: ${H.explanation || "Verified EDISAM Academic Explanation"}`,
                    ],
                  })),
                  fileName: `${A == null ? void 0 : A.id}_practice_report`,
                });
              }}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-amber-950 font-black text-xs sm:text-sm rounded-xl transition shadow cursor-pointer flex items-center justify-center gap-1.5"
            >
              <DownloadIcon className="w-4 h-4" />
              <span>High Quality PDF रिपोर्ट डाउनलोड करें</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export function EducationalLDP({
  onBookClick: a,
  onCreateContentClick: t,
}: any) {
  const { t: n, language: o } = useLanguage(),
    [l, A] = React.useState<any>("practice"),
    [d, u] = React.useState<any>(1),
    [h, p] = React.useState<any>({}),
    [g, b] = React.useState<any>(null),
    [m, B] = React.useState<any>(null),
    C = (H: any) => {
      if (!LDP_PDF_DOWNLOAD_ENABLED) {
        alert(LDP_PDF_FALLBACK_MESSAGE);
        return;
      }
      p((me: any) => ({
        ...me,
        [H.id]: 0,
      }));
      let ue = 0;
      const we = setInterval(() => {
        ((ue += 10),
          p((me: any) => {
            if (ue >= 100) {
              (clearInterval(we), j(H));
              const _e = {
                ...me,
              };
              return (delete _e[H.id], _e);
            }
            return {
              ...me,
              [H.id]: ue,
            };
          }));
      }, 150);
    },
    j = (H: any) => {
      if (H.pdfUrl) {
        const ue = document.createElement("a");
        ((ue.href = H.pdfUrl),
          ue.setAttribute("download", H.pdfFileName || "document.pdf"),
          document.body.appendChild(ue),
          ue.click(),
          document.body.removeChild(ue));
      } else Ke(H);
    },
    [y, E] = React.useState<any>([]),
    [U, T] = React.useState<any>(!0),
    [Q, Z] = React.useState<any>(!1),
    [z, O] = React.useState<any>(null),
    [D, R] = React.useState<any>("Class 1"),
    [M, F] = React.useState<any>(""),
    [G, S] = React.useState<any>(""),
    [te, J] = React.useState<any>(5),
    [X, ie] = React.useState<any>(""),
    [$, ve] = React.useState<any>(""),
    [K, k] = React.useState<any>(""),
    [q, ee] = React.useState<any>("1.5 MB"),
    [ne, pe] = React.useState<any>(""),
    [Ce, Ne] = React.useState<any>(!1),
    /* EDISAM loaded admin-uploaded PDFs from /api/educational-pdfs; that server route does not exist here, so the built-in class guides are shown */ je =
      async () => {
        T(!1);
      };
  React.useEffect(() => {
    je();
  }, []);
  const Me = (H: any) => {
      const ue = `कक्षा ${H}`,
        we = `Class ${H}`,
        me = y.filter(
          (_e: any) =>
            _e.className.includes(we) ||
            _e.className.includes(ue) ||
            _e.className === we ||
            _e.className === ue,
        );
      return me.length > 0
        ? me
        : [
            {
              id: `dyn_pdf_c${H}_1`,
              className: `Class ${H} (कक्षा ${H})`,
              subjectName:
                H <= 5
                  ? "संताली प्रवेश (Santali Devnagri Script)"
                  : H <= 8
                    ? "संताली भाषा व व्याकरण"
                    : "संताली साहित्य, समाज व दर्शन",
              pdfTitle: `कक्षा ${H} - संताली विशिष्ट पाठ्यपुस्तक`,
              pdfFileName: `Class_${H}_Santhali_Bhasha_Pustak.pdf`,
              fileSize: `${(2.1 + H * 0.35).toFixed(1)} MB`,
              chaptersCount: 6 + (H % 4),
              description: `कक्षा ${H} वीं के छात्रों के लिए विशेष रूप से संकलित संताली भाषा, व्याकरण, संताली देवनागरी लिपि और सांस्कृतिक इतिहास का व्यापक पाठ्यक्रम।`,
              contentSnippet: `कक्षा ${H} - संताली विशिष्ट पाठ्यपुस्तक

============================================
सच्ची शिक्षा और सांस्कृतिक धरोहर - EDISAM (EDISAM)
============================================

अध्याय १: संताली भाषा का उद्गम और विकास
संताली भाषा ऑस्ट्रो-एशियाटिक भाषा परिवार की एक अत्यंत समृद्ध और प्राचीन शाखा है। इसका अपना विशिष्ट व्याकरण और शब्दावली है।

अध्याय २: ओल चिकी लिपि का महत्व
महान आदिवासी विद्वान पंडित रघुनाथ मुर्मू (गुरु गोमके) ने वर्ष १९२५ में इस वैज्ञानिक लिपि का आविष्कार किया। इसके ३० मूल वर्ण सीधे प्रकृति के रूपों से प्रेरित हैं।

अध्याय ३: सांस्कृतिक धरोहर और पर्व
सोहराय (फसल उत्सव) और बाहा (पुष्प उत्सव) प्रकृति और मानव के गहरे संबंधों को दर्शाते हैं।

आपकी शैक्षणिक और उज्जवल भविष्य की शुभकामनाएँ!
- टीम EDISAM`,
            },
            {
              id: `dyn_pdf_c${H}_2`,
              className: `Class ${H} (कक्षा ${H})`,
              subjectName: "सामान्य ज्ञान व संस्कृति",
              pdfTitle: `कक्षा ${H} - सामान्य ज्ञान अभ्यास माला`,
              pdfFileName: `Class_${H}_Santhali_GK_Abhyas.pdf`,
              fileSize: `${(1.5 + H * 0.2).toFixed(1)} MB`,
              chaptersCount: 5 + (H % 3),
              description: `कक्षा ${H} वीं के विद्यार्थियों हेतु संकलित सामान्य ज्ञान, नैतिक शिक्षा, खेलकूद और आदिवासी महापुरुषों की प्रेरक जीवनियाँ।`,
              contentSnippet: `कक्षा ${H} - सामान्य ज्ञान अभ्यास माला

============================================
सच्ची शिक्षा और सांस्कृतिक धरोहर - EDISAM (EDISAM)
============================================

अध्याय १: हमारे मार्गदर्शक महापुरुष
- बाबा तिलका मांझी (१७५०-१७८५): अंग्रेजों के खिलाफ हथियार उठाने वाले प्रथम आदिवासी क्रांतिवीर।
- वीर सिद्धू-कान्हू: १८५५ के महान संताल हूल के अमर नायक जिन्होंने 'करो या मरो, अंग्रेजों हमारी माटी छोड़ो' का उद्घोष किया।

अध्याय २: जीवन मूल्य और नैतिक शिक्षा
समय का आदर करना, प्रकृति से प्रेम करना, बड़ों का सम्मान करना और समाज की सेवा करना ही सच्ची शिक्षा का मूल उद्देश्य है।

आपकी शैक्षणिक और उज्जवल भविष्य की शुभकामनाएँ!
- टीम EDISAM`,
            },
          ];
    },
    Ke = (H: any) => {
      if (h[H.id] !== void 0) return;
      let ue = 0;
      p((me: any) => ({
        ...me,
        [H.id]: 0,
      }));
      const we = setInterval(() => {
        if (
          ((ue += 20),
          p((me: any) => ({
            ...me,
            [H.id]: ue,
          })),
          ue >= 100)
        ) {
          if ((clearInterval(we), H.pdfUrl)) {
            const me = document.createElement("a");
            ((me.href = H.pdfUrl),
              (me.download =
                H.pdfFileName || `${H.subjectName}_study_notes.pdf`),
              (me.target = "_blank"),
              document.body.appendChild(me),
              me.click(),
              document.body.removeChild(me));
          } else {
            const _e = (
              H.contentSnippet ||
              `${H.subjectName} - ${H.pdfTitle}

Comprehensive study guide for ${H.className}.
Includes chapter breakdowns, key formulas, previous year question trends, and high-yield revision summaries.`
            )
              .split(
                `
`,
              )
              .filter((Ge: any) => Ge.trim().length > 0);
            generateEdisamPdf({
              category: `${H.className} • ${H.subjectName}`,
              title: H.pdfTitle,
              subtitle:
                H.description ||
                `EDISAM Verified Study Material (${H.chaptersCount} Chapters)`,
              content: _e,
              sections: [
                {
                  heading: "Study Tips & Exam Preparation Rules",
                  bulletPoints: [
                    "Revise key concepts daily using EDISAM chapter summaries.",
                    "Solve previous year questions and practice timed quizzes.",
                    "Focus on high-weightage topics highlighted in red in your syllabus.",
                  ],
                },
              ],
              fileName: H.pdfFileName
                ? H.pdfFileName.replace(/\.pdf$/i, "")
                : `${H.subjectName}_${H.className}`,
            });
          }
          setTimeout(() => {
            p((me: any) => {
              const _e = {
                ...me,
              };
              return (delete _e[H.id], _e);
            });
          }, 1500);
        }
      }, 100);
    },
    de = (H: any) =>
      H === "success_principles"
        ? n("success_principles")
        : H === "time_management"
          ? n("time_management")
          : H === "digital_education"
            ? n("digital_education")
            : H === "personality_development"
              ? n("personality_development")
              : H === "positive_thinking"
                ? n("positive_thinking")
                : "",
    le = Me(d);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left select-none space-y-8">
      <div className="bg-white rounded-3xl border border-gray-150 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5 text-center md:text-left flex-1">
          <span className="text-xs font-black text-emerald-850 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 inline-block font-mono">
            📚 LDP (लाइव अभ्यास मंच)
          </span>
          <h1 className="text-3xl font-black text-emerald-950 font-display">
            कक्षा, विषय व अध्यायवार लाइव अभ्यास (Chapter-wise Practice)
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
            झारखंड राज्य व सीबीएसई पाठ्यक्रम के अनुसार सभी कक्षाओं (1-12) और सभी
            विषयों का अध्यायवार लाइव अभ्यास, स्व-मूल्यांकन और अध्ययन सामग्री।
          </p>
          {t && (
            <div className="pt-2 flex justify-start">
              <button
                onClick={t}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-850 hover:bg-emerald-950 text-white text-xs font-black uppercase tracking-wider rounded-2xl transition cursor-pointer shadow-sm border border-emerald-900"
              >
                <SparklesIcon className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
                <span>अपनी रचना जोड़ें / Create Your Own Content</span>
              </button>
            </div>
          )}
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-gray-200 shrink-0 select-none flex-wrap gap-1">
          <button
            onClick={() => A("practice")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${l === "practice" ? "bg-white text-emerald-900 shadow-md border border-gray-100" : "text-gray-600 hover:text-emerald-800"}`}
          >
            <SparklesIcon className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
            <span>लाइव अभ्यास (LDP)</span>
          </button>
          <button
            onClick={() => A("study")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${l === "study" ? "bg-white text-emerald-900 shadow-md border border-gray-100" : "text-gray-600 hover:text-emerald-800"}`}
          >
            <BookMarkedIcon className="w-4.5 h-4.5 text-emerald-650" />
            <span>अध्ययन सामग्री (Class 1-12)</span>
          </button>
          <button
            onClick={() => A("quiz")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${l === "quiz" ? "bg-white text-emerald-900 shadow-md border border-gray-100" : "text-gray-600 hover:text-emerald-800"}`}
          >
            <AwardIcon className="w-4.5 h-4.5 text-blue-500" />
            <span>लाइव मॉक टेस्ट (50+ MCQs)</span>
          </button>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {l === "practice" && (
          <motion.div
            key={"practice-tab"}
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
            className="space-y-8"
          >
            <LivePracticePanel />
          </motion.div>
        )}
        {l === "study" && (
          <motion.div
            key={"study-tab"}
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
            className="space-y-8"
          >
            <div className="bg-white rounded-3xl border border-gray-150 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <h3 className="text-sm font-black text-gray-800 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span>अपनी कक्षा का चयन करें (Select Class 1 to 12)</span>
                </h3>
              </div>
              <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent">
                {Array.from(
                  {
                    length: 12,
                  },
                  (H: any, ue: any) => ue + 1,
                ).map((H: any) => {
                  const ue = d === H;
                  return (
                    <button
                      key={H}
                      onClick={() => u(H)}
                      className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-black tracking-tight transition cursor-pointer border shrink-0 ${ue ? "bg-emerald-800 border-emerald-800 text-white shadow-md shadow-emerald-850/10 scale-103" : "bg-slate-50 border-gray-200 text-gray-600 hover:bg-white hover:border-emerald-600"}`}
                    >
                      {"Class "}
                      {H}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {le.map((H: any) => {
                const ue = h[H.id] !== void 0,
                  we = h[H.id] || 0;
                return (
                  <div
                    key={H.id}
                    className="bg-white rounded-3xl border border-gray-150 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-850 px-2.5 py-1 rounded-full border border-emerald-100">
                            {H.subjectName}
                          </span>
                          {H.pdfUrl && (
                            <span className="text-[9px] font-black bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              PDF Live
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-gray-400 font-mono">
                            {H.fileSize}
                            {" • "}
                            {H.chaptersCount}
                            {" चैप्टर्स"}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2 text-left">
                        <h3 className="text-lg font-black text-emerald-950 leading-snug">
                          {H.pdfTitle}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
                          {H.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 pt-5 border-t border-gray-50 flex flex-col sm:flex-row items-center gap-3 select-none">
                      <button
                        onClick={() => b(H)}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-200 hover:border-emerald-700 hover:bg-emerald-50/10 text-emerald-900 font-extrabold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <FileTextIcon className="w-4 h-4 text-emerald-600" />
                        <span>ऑनलाइन पढ़ें (Read)</span>
                      </button>
                      <button
                        onClick={() => {
                          C(H);
                        }}
                        disabled={ue}
                        className={`w-full sm:flex-1 px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden ${ue ? "bg-slate-100 text-slate-500 border border-slate-200" : "bg-emerald-850 hover:bg-emerald-900 text-white shadow-md"}`}
                      >
                        {ue ? (
                          <>
                            <LoaderCircleIcon className="w-4 h-4 animate-spin text-emerald-650 z-10" />
                            <span className="z-10">
                              {"डाउनलोड हो रहा है... "}
                              {we}%
                            </span>
                            <div
                              className="absolute left-0 top-0 bottom-0 bg-emerald-500/10 transition-all duration-150"
                              style={{
                                width: `${we}%`,
                              }}
                            />
                          </>
                        ) : (
                          <>
                            <FileDownIcon className="w-4 h-4" />
                            <span>PDF डाउनलोड करें (Download)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <AnimatePresence>
              {g && (
                <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <motion.div
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
                    className="bg-white rounded-3xl border border-gray-150 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col justify-between overflow-hidden"
                  >
                    <div className="p-6 border-b border-gray-100 bg-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-2.5 text-left">
                        <span className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                          📖
                        </span>
                        <div>
                          <h3 className="font-black text-emerald-950 text-sm sm:text-base leading-tight">
                            {g.pdfTitle}
                          </h3>
                          <span className="text-[10px] font-bold text-gray-400 font-mono uppercase tracking-wider block mt-0.5">
                            {"EDISAM पाठक कक्ष • "}
                            {g.fileSize}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => b(null)}
                        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-gray-500 text-sm transition cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                    {g.pdfUrl ? (
                      <div className="flex-1 flex flex-col min-h-[50vh]">
                        <iframe
                          src={g.pdfUrl}
                          title={g.pdfTitle}
                          className="w-full flex-1 border-0 min-h-[50vh]"
                        />
                      </div>
                    ) : (
                      <div className="p-6 overflow-y-auto text-left leading-relaxed text-sm font-medium text-gray-700 bg-slate-50/20 whitespace-pre-line font-mono max-h-[50vh] border-b border-gray-50">
                        {g.contentSnippet}
                      </div>
                    )}
                    <div className="p-5 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 select-none">
                      <span className="text-[11px] font-bold text-gray-400">
                        * यह पाठ्य सामग्री पूर्णतः प्रमाणित है।
                      </span>
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                          onClick={() => b(null)}
                          className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-slate-50 font-bold text-xs sm:text-sm text-gray-600 transition cursor-pointer"
                        >
                          बंद करें (Close)
                        </button>
                        <button
                          onClick={() => {
                            const H = g;
                            (b(null), C(H));
                          }}
                          className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <FileDownIcon className="w-4 h-4" />
                          <span>PDF डाउनलोड करें</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            <div className="w-full p-6 md:p-8 rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-950 to-emerald-950 text-white border border-emerald-500/30 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_40%)] pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-500 opacity-90 pointer-events-none" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-emerald-500/20 select-none">
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl">📚</span>
                  <div className="flex flex-col text-left">
                    <h2 className="text-lg sm:text-xl font-black text-amber-300 uppercase tracking-wider font-display">
                      {n("books_title")}
                    </h2>
                    <span className="text-[10px] font-bold text-emerald-300/60 tracking-widest uppercase mt-0.5 font-mono">
                      Knowledge Shelf • ज्ञान मंजूषा
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 max-w-md font-medium leading-relaxed text-left md:text-right">
                  हमारे विशेष डिजिटल संस्करणों को पढ़ें और महत्वपूर्ण जीवन कौशल,
                  समय प्रबंधन और नैतिक सिद्धांतों को समझें।
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4.5 mt-8">
                {KNOWLEDGE_BOOKS.map((H: any, ue: any) => {
                  const we = de(H.id) || H.title;
                  return (
                    <motion.div
                      key={H.id}
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: ue * 0.08,
                        duration: 0.4,
                      }}
                      whileHover={{
                        scale: 1.04,
                        y: -2,
                      }}
                      onClick={() => a(we, H.content)}
                      className={`bg-gradient-to-r ${H.color} hover:brightness-110 p-5 rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer border-l-4 border-amber-500 text-left flex flex-col justify-between min-h-[140px] transition-all relative overflow-hidden group select-none`}
                    >
                      <div>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-3 group-hover:bg-amber-500/20 transition">
                          <BookOpenIcon className="w-4 h-4 text-amber-400" />
                        </div>
                        <span className="text-white group-hover:text-amber-200 transition text-sm font-extrabold leading-snug tracking-tight block">
                          {we}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-bold text-white/50 group-hover:text-amber-300/80 mt-4 pt-2 border-t border-white/5 uppercase font-mono">
                        <span>पढ़ें (Read)</span>
                        <span>→</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
        {l === "quiz" && (
          <React.Suspense fallback={<div className="flex items-center justify-center py-20 text-sm text-slate-500">Loading…</div>}>
            <QuizIQTest />
          </React.Suspense>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Page wrapper used by the app: EDISAM's LDP panel plus its article reader for the Knowledge Shelf books. */
export default function EducationalLDPPage() {
  const [book, setBook] = React.useState<{
    title: string;
    content: string;
  } | null>(null);
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <EdisamLanguageSwitch />
      </div>
      <EducationalLDP
        onBookClick={(title: string, content: string) =>
          setBook({
            title,
            content,
          })
        }
      />
      <AnimatePresence>
        {book && (
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setBook(null)}
          >
            <motion.div
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
              onClick={(e: any) => e.stopPropagation()}
              className="bg-white rounded-3xl border border-gray-150 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden"
            >
              <div className="p-5 border-b border-gray-100 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-left">
                  <span className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    📚
                  </span>
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 font-mono uppercase tracking-wider block">
                      ज्ञान संकलन
                    </span>
                    <h3 className="font-black text-emerald-950 text-sm sm:text-base leading-tight">
                      {book.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setBook(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-gray-500 text-sm transition cursor-pointer"
                >
                  ✕
                </button>
              </div>
              {/* Static article HTML from KNOWLEDGE_BOOKS (bundled data, not user input) */}
              <div
                className="p-6 overflow-y-auto text-left text-sm"
                dangerouslySetInnerHTML={{
                  __html: book.content,
                }}
              />
              <div className="p-4 border-t border-gray-100 bg-white flex justify-end">
                <button
                  onClick={() => setBook(null)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-slate-50 font-bold text-xs sm:text-sm text-gray-600 transition cursor-pointer"
                >
                  बंद करें (Close)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
