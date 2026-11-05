// Generates every LDP practice section and every Quiz / IQ exam and asserts zero duplicates
// inside any single test. Run: npm run check:questions
import { LDP_SUBJECTS, generateChapterQuestions, COMPETITIVE_EXAM_GROUPS, SCHOOL_BOARD_GROUPS, COMPETITIVE_SUBJECTS } from '../src/data/edisamLdpData';
import { QUIZ_EXAMS, getExamQuestions, plannedExamCount } from '../src/data/edisamQuizData';
import { dedupeQuestions, pickUniqueQuestions, questionKey, questionAnswerKey, mergeNewQuestions } from '../src/utils/questionDedupe';

type Row = { kind: string; name: string; planned: number; raw: number; unique: number };
const rows: Row[] = [];
let failures = 0;
const dupCount = (qs: any[]) => {
  const t = new Set<string>(), ta = new Set<string>(); let d = 0;
  for (const q of qs) { const k = questionKey(q), ka = questionAnswerKey(q); if (t.has(k) || ta.has(ka)) d++; t.add(k); ta.add(ka); }
  return d;
};
const check = (kind: string, name: string, raw: any[], planned: number, seenRounds = 3) => {
  const unique = dedupeQuestions(raw);
  rows.push({ kind, name, planned, raw: raw.length, unique: unique.length });
  let seen: string[] = [];
  for (let r = 0; r < seenRounds; r++) {
    const { picked, resetSeen } = pickUniqueQuestions(raw, planned, seen);
    const d = dupCount(picked);
    if (d > 0) { failures++; console.error(`FAIL ${kind} ${name}: ${d} duplicate(s) in attempt ${r + 1}`); }
    if (picked.length !== Math.min(planned, unique.length)) { failures++; console.error(`FAIL ${kind} ${name}: picked ${picked.length}`); }
    seen = resetSeen ? picked.map((q) => String(q.id)) : [...seen, ...picked.map((q) => String(q.id))];
  }
};

// LDP: school classes 1–12 × subjects × chapters (15 per section)
for (let c = 1; c <= 12; c++)
  for (const sub of LDP_SUBJECTS as any[])
    for (const ch of sub.chapters) check('LDP school', `Class ${c} · ${sub.nameEn} · ${ch.id}`, generateChapterQuestions(c, sub.id, ch.id), 15);
// LDP: competitive exams × subjects
for (const g of COMPETITIVE_EXAM_GROUPS as any[])
  for (const ex of g.exams)
    for (const cs of COMPETITIVE_SUBJECTS as any[]) check('LDP competitive', `${ex} · ${cs.id}`, generateChapterQuestions(0, ex, cs.id), 15);
// LDP: school entrance × subjects
for (const g of SCHOOL_BOARD_GROUPS as any[])
  for (const sc of g.schools)
    for (const cs of COMPETITIVE_SUBJECTS as any[]) check('LDP entrance', `${sc} · ${cs.id}`, generateChapterQuestions(0, sc, cs.id), 15);
// Quiz / IQ: every exam — full mock, demo (30) and practice (50)
for (const ex of QUIZ_EXAMS as any[]) {
  const bank = getExamQuestions(ex.category, ex.id);
  check('Quiz exam', `${ex.nameEn} (mock)`, bank, ex.questionsCount);
  check('Quiz demo', `${ex.nameEn} (demo)`, bank, 30, 1);
  check('Quiz practice', `${ex.nameEn} (practice 50)`, bank, 50, 1);
  if (plannedExamCount(ex.id, ex.questionsCount) > bank.length) { failures++; console.error(`FAIL ${ex.id}: planned count exceeds unique`); }
  // AI merge: fresh questions that copy bank items must be dropped
  const fresh = [{ ...bank[0], id: 'ai_dup_1', options: [...bank[0].options].reverse(), correctAnswer: bank[0].options.length - 1 - bank[0].correctAnswer }, { id: 'ai_new_1', text: `Unique AI question for ${ex.id}?`, options: ['a', 'b', 'c', 'd'], correctAnswer: 0 }];
  const merged = mergeNewQuestions(bank, fresh as any);
  if (dupCount(merged) || merged.length !== dedupeQuestions(bank).length + 1) { failures++; console.error(`FAIL AI merge ${ex.id}`); }
}
// raw-bank duplicate check (after generator-level dedupe the banks themselves must be clean)
for (const ex of QUIZ_EXAMS as any[]) { const d = dupCount(getExamQuestions(ex.category, ex.id)); if (d) { failures++; console.error(`FAIL raw bank ${ex.id}: ${d} dupes`); } }

const byKind = new Map<string, Row[]>();
rows.forEach((r) => byKind.set(r.kind, [...(byKind.get(r.kind) || []), r]));
console.log('Kind'.padEnd(16), 'sections', 'short(<planned)', 'min unique');
for (const [k, rs] of byKind) console.log(k.padEnd(16), String(rs.length).padEnd(8), String(rs.filter((r) => r.unique < r.planned).length).padEnd(15), Math.min(...rs.map((r) => r.unique)));
console.log('\nSmallest (unique < planned), up to 25:');
rows.filter((r) => r.unique < r.planned).sort((a, b) => a.unique / a.planned - b.unique / b.planned).slice(0, 25)
  .forEach((r) => console.log(`  ${r.kind.padEnd(15)} ${r.name.slice(0, 70).padEnd(70)} unique ${r.unique} / planned ${r.planned} (generated ${r.raw})`));
console.log('\nQuiz exams (unique bank vs planned mock count):');
for (const r of rows.filter((r) => r.kind === 'Quiz exam')) console.log(`  ${r.name.slice(0, 60).padEnd(60)} unique ${r.unique}/${r.raw} generated, planned ${r.planned}`);
console.log(failures ? `\n❌ ${failures} failure(s)` : `\n✅ 0 duplicates across ${rows.length} sections/exams (3 repeat attempts each for LDP & mocks)`);
process.exit(failures ? 1 : 0);
