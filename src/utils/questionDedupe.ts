// Question de-duplication helpers shared by LDP (EducationalLDP) and Quiz / IQ Test.
// Rule: inside one test / practice section / mock session no question may appear twice.
//  • Two questions are duplicates when their normalized text matches (trim, collapse whitespace,
//    lowercase, NFC; a leading "[Exam …]" tag is ignored), or when text + correct-answer text match
//    (so the same question with shuffled options is still a duplicate).
//  • Same template with different numbers is fine as long as the final text differs.

export type AnyQuestion = { id?: any; text?: any; options?: any; correctAnswer?: any; [k: string]: any };

export const normQText = (s: unknown) =>
  String(s ?? '')
    .normalize('NFC')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

/** Text key: normalized text without a leading "[...]" section/exam tag. */
export const questionKey = (q: AnyQuestion) => normQText(q?.text).replace(/^\[[^\]]*\]\s*/, '');

/** Text + correct answer key (option order independent). */
export const questionAnswerKey = (q: AnyQuestion) => {
  const opts = Array.isArray(q?.options) ? q.options : [];
  return `${questionKey(q)}||${normQText(opts[q?.correctAnswer])}`;
};

const isUsable = (q: AnyQuestion) =>
  !!q && questionKey(q).length > 0 && Array.isArray(q.options) && q.options.length >= 2;

/**
 * Returns `list` without duplicates (first occurrence wins) and without anything already in `existing`.
 * Empty / malformed questions are dropped.
 */
export function dedupeQuestions<T extends AnyQuestion>(list: T[], existing: AnyQuestion[] = []): T[] {
  const texts = new Set<string>();
  const textAns = new Set<string>();
  const ids = new Set<string>();
  for (const q of existing) {
    if (!q) continue;
    texts.add(questionKey(q));
    textAns.add(questionAnswerKey(q));
    if (q.id != null) ids.add(String(q.id));
  }
  const out: T[] = [];
  for (const q of list || []) {
    if (!isUsable(q)) continue;
    const k = questionKey(q), ka = questionAnswerKey(q);
    if (texts.has(k) || textAns.has(ka) || (q.id != null && ids.has(String(q.id)))) continue;
    texts.add(k);
    textAns.add(ka);
    if (q.id != null) ids.add(String(q.id));
    out.push(q);
  }
  return out;
}

/** Merge AI-generated questions in front of a bank, skipping any that duplicate the bank or each other. */
export function mergeNewQuestions<T extends AnyQuestion>(bank: T[], fresh: T[]): T[] {
  const base = dedupeQuestions(bank);
  return [...dedupeQuestions(fresh, base), ...base];
}

const shuffle = <T,>(a: T[]) => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};

/**
 * Pick up to `count` distinct questions from `pool` (deduped first). Unseen questions are preferred;
 * seen ones only fill the remainder. Never repeats, never pads: result length = min(count, unique pool).
 * `seen` may contain ids and/or normalized texts. `resetSeen` is true when everything had been seen.
 */
export function pickUniqueQuestions<T extends AnyQuestion>(pool: T[], count: number, seen: string[] = []) {
  const unique = dedupeQuestions(pool);
  const seenSet = new Set((seen || []).map((s) => String(s)));
  const isSeen = (q: T) =>
    (q.id != null && seenSet.has(String(q.id))) || seenSet.has(questionKey(q)) || seenSet.has(String(q.text ?? '').trim().toLowerCase());
  const unseen = unique.filter((q) => !isSeen(q));
  const seenQs = unique.filter((q) => isSeen(q));
  const n = Math.max(0, Math.min(count, unique.length));
  const picked = [...shuffle(unseen), ...shuffle(seenQs)].slice(0, n);
  return { picked: shuffle(picked), uniqueCount: unique.length, resetSeen: unseen.length < n };
}
