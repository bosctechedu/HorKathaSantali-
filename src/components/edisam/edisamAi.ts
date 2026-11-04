// EDISAM generated extra questions with Gemini through its own server routes
// (/api/gemini/generate and /api/generate-chapter-questions). Hor Katha Santali has neither,
// so the same buttons go through the existing Cloudflare function /api/ai-chat
// (the Gemini key stays on the server as GEMINI_API_KEY; nothing is in the client code).
// The return value looks like a fetch Response so the ported code keeps its original flow:
// on any failure it shows the same alert and falls back to the built-in question bank.

type ResponseLike = { ok: boolean; json: () => Promise<any> };

const fail: ResponseLike = { ok: false, json: async () => ({}) };

async function askAiChat(message: string): Promise<string | null> {
  const r = await fetch('/api/ai-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: message.slice(0, 2000), webSearch: false }),
  });
  if (!r.ok) return null;
  const data = await r.json().catch(() => null);
  if (!data || data.isFallback || typeof data.reply !== 'string') return null;
  return data.reply.trim();
}

const extractJsonArray = (text: string): any[] | null => {
  let t = text.trim();
  if (t.startsWith('```')) t = t.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '');
  const start = t.indexOf('[');
  const end = t.lastIndexOf(']');
  if (start === -1 || end <= start) return null;
  try {
    const arr = JSON.parse(t.slice(start, end + 1));
    return Array.isArray(arr) ? arr : null;
  } catch {
    return null;
  }
};

const cleanQuestion = (q: any) =>
  q &&
  typeof q.text === 'string' &&
  Array.isArray(q.options) &&
  q.options.length === 4 &&
  Number.isInteger(q.correctAnswer) &&
  q.correctAnswer >= 0 &&
  q.correctAnswer < 4;

/** Replacement for EDISAM's fetch('/api/gemini/generate', { body: { prompt, systemInstruction } }) */
export async function edisamGeminiFetch(_url: string, init: { body?: any; [key: string]: any }): Promise<ResponseLike> {
  try {
    const { prompt = '', systemInstruction = '' } = JSON.parse(init?.body || '{}');
    const reply = await askAiChat(
      `${systemInstruction}\n\n${prompt}\nKeep each explanation to one short sentence so the full JSON fits.`,
    );
    if (!reply) return fail;
    const arr = extractJsonArray(reply);
    if (!arr) return fail;
    const valid = arr.filter(cleanQuestion);
    if (!valid.length) return fail;
    return { ok: true, json: async () => ({ text: JSON.stringify(valid) }) };
  } catch {
    return fail;
  }
}

/** Replacement for EDISAM's fetch('/api/generate-chapter-questions', { body: { classNum, subjectName, chapterName, ... } }) */
export async function edisamChapterQuestionsFetch(_url: string, init: { body?: any; [key: string]: any }): Promise<ResponseLike> {
  try {
    const b = JSON.parse(init?.body || '{}');
    const level = b.classNum ? `Class ${b.classNum} (Jharkhand board / CBSE syllabus)` : 'Indian competitive / entrance exam';
    const prompt = `Generate 15 multiple-choice questions for ${level}, subject "${b.subjectName}", chapter/topic "${b.chapterName}".
Write in clear Hindi (English terms allowed). Return ONLY a raw JSON array (no markdown) of objects:
{"text": string, "options": [4 strings], "correctAnswer": 0-3, "explanation": one short sentence}.
Questions must be accurate, non-repeating and match the syllabus.`;
    const reply = await askAiChat(prompt);
    if (!reply) return fail;
    const arr = extractJsonArray(reply);
    if (!arr) return fail;
    const stamp = Date.now();
    const questions = arr.filter(cleanQuestion).map((q, i) => ({
      id: `ai_${b.classNum}_${b.subjectId}_${b.chapterId}_${stamp}_${i}`,
      text: q.text,
      options: q.options.map(String),
      correctAnswer: q.correctAnswer,
      explanation: String(q.explanation || ''),
      category: b.subjectId,
    }));
    if (!questions.length) return fail;
    return { ok: true, json: async () => ({ questions }) };
  } catch {
    return fail;
  }
}
