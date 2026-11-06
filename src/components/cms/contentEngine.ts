// Live Content Engine: server पर सहेजे गए बदलाव (edit / delete / add) पेज की लिखावट पर लागू करता है।
// React के बनाए text nodes को बदले बिना पहचान: key = scope | hash(मूल लिखावट)।

export type PublicEdit = { t?: string; del?: boolean };
export type PublicAdd = { id: string; anchor: string; t: string };
export type ContentData = { edits: Record<string, PublicEdit>; adds: PublicAdd[] };

const CACHE = 'hk_cms_cache_v1';
let data: ContentData = { edits: {}, adds: [] };
const origOf = new WeakMap<Text, string>();
const appliedOf = new WeakMap<Text, string>();
const keyOf = new WeakMap<Text, string>();
const tracked = new Map<string, Set<Text>>(); // key → nodes जिन पर बदलाव लगा है
const anchorNodes = new Map<string, Set<Text>>(); // key → nodes (adds के लिए)
let observer: MutationObserver | null = null;
let pending = new Set<Node>();
let scheduled = false;
let enabled = false;

const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'INPUT', 'SELECT', 'OPTION', 'CODE', 'svg', 'SVG']);

export const hashText = (s: string) => {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return (h >>> 0).toString(36);
};

const norm = (s: string) => s.replace(/\s+/g, ' ').trim();

export const scopeOf = (el: Element | null): string => {
  const m = el?.closest('[data-hk-scope]') as HTMLElement | null;
  const v = (m?.dataset.hkScope || 'global').toLowerCase().replace(/[^a-z0-9_:-]/g, '').slice(0, 80);
  return v || 'global';
};

export const isSkippable = (el: Element | null) => {
  if (!el) return true;
  if (SKIP_TAGS.has(el.tagName)) return true;
  return !!el.closest('[data-hk-cms-ui],[data-hk-add],[contenteditable="true"],script,style,textarea,noscript');
};

export const getOriginal = (n: Text) => origOf.get(n) ?? n.nodeValue ?? '';
export const getKey = (n: Text) => keyOf.get(n) || `${scopeOf(n.parentElement)}|${hashText(norm(getOriginal(n)))}`;
export const getData = () => data;

function processText(n: Text) {
  const parent = n.parentElement;
  if (!parent || isSkippable(parent)) return;
  const raw = n.nodeValue ?? '';
  if (appliedOf.get(n) !== raw) { origOf.set(n, raw); appliedOf.delete(n); }
  const orig = origOf.get(n) ?? raw;
  const clean = norm(orig);
  if (!clean) return;
  const key = `${scopeOf(parent)}|${hashText(clean)}`;
  keyOf.set(n, key);
  const e = data.edits[key];
  if (e) {
    const lead = orig.match(/^\s*/)?.[0] ?? '';
    const trail = orig.match(/\s*$/)?.[0] ?? '';
    const val = e.del ? '' : lead + (e.t ?? '') + trail;
    if (n.nodeValue !== val) n.nodeValue = val;
    appliedOf.set(n, val);
    let set = tracked.get(key); if (!set) tracked.set(key, (set = new Set()));
    set.add(n);
  }
  if (data.adds.some((a) => a.anchor === key)) {
    let set = anchorNodes.get(key); if (!set) anchorNodes.set(key, (set = new Set()));
    set.add(n);
  }
}

function blockOf(n: Node): Element | null {
  let el = n.parentElement;
  while (el && el.parentElement && getComputedStyle(el).display.startsWith('inline')) el = el.parentElement;
  return el;
}

function renderAdds() {
  // पुराने (अब हटाए गए) जोड़े हुए हिस्से हटाएँ
  document.querySelectorAll<HTMLElement>('[data-hk-add]').forEach((el) => {
    const a = data.adds.find((x) => x.id === el.dataset.hkAdd);
    if (!a) el.remove(); else if (el.textContent !== a.t) el.textContent = a.t;
  });
  for (const a of data.adds) {
    if (document.querySelector(`[data-hk-add="${a.id}"]`)) continue;
    let after: Element | null = null;
    if (a.anchor.startsWith('add:')) {
      after = document.querySelector(`[data-hk-add="${a.anchor.slice(4)}"]`);
    } else {
      const nodes = anchorNodes.get(a.anchor);
      const n = nodes && [...nodes].find((x) => x.isConnected);
      if (n) after = blockOf(n);
    }
    if (!after || !after.parentNode) continue;
    // उसी anchor पर पहले से जुड़े हिस्सों के बाद रखें
    let ref: Element = after;
    while (ref.nextElementSibling && (ref.nextElementSibling as HTMLElement).dataset?.hkAddAnchor === a.anchor) ref = ref.nextElementSibling;
    const p = document.createElement('p');
    p.dataset.hkAdd = a.id;
    p.dataset.hkAddAnchor = a.anchor;
    p.className = 'hk-cms-added';
    p.style.whiteSpace = 'pre-line';
    p.style.margin = '0.5rem 0';
    p.textContent = a.t;
    ref.parentNode!.insertBefore(p, ref.nextSibling);
  }
}

function walk(root: Node) {
  if (root.nodeType === 3) { processText(root as Text); return; }
  if (root.nodeType !== 1 || isSkippable(root as Element)) return;
  const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let n: Node | null;
  while ((n = tw.nextNode())) processText(n as Text);
}

function flush() {
  scheduled = false;
  const nodes = pending; pending = new Set();
  observer?.disconnect();
  try {
    nodes.forEach((n) => n.isConnected && walk(n));
    if (data.adds.length) renderAdds();
  } finally {
    observer?.observe(document.body, { childList: true, subtree: true, characterData: true });
  }
}

const schedule = (n: Node) => { pending.add(n); if (!scheduled) { scheduled = true; requestAnimationFrame(flush); } };

export function setData(d: ContentData, save = true) {
  data = { edits: d.edits || {}, adds: d.adds || [] };
  if (save) { try { localStorage.setItem(CACHE, JSON.stringify(data)); } catch { /* ignore */ } }
}

export function loadCached(): ContentData | null {
  try { const s = localStorage.getItem(CACHE); return s ? JSON.parse(s) : null; } catch { return null; }
}

export const hasContent = () => Object.keys(data.edits).length > 0 || data.adds.length > 0;

/** पूरे पेज पर दोबारा लागू करें (save / restore के बाद) */
export function reapplyAll() {
  // जिन nodes का बदलाव हटाया गया, उन्हें मूल लिखावट पर लौटाएँ
  tracked.forEach((set, key) => {
    if (data.edits[key]) return;
    set.forEach((n) => {
      const o = origOf.get(n);
      if (n.isConnected && o != null) { observer?.disconnect(); n.nodeValue = o; appliedOf.delete(n); }
    });
    tracked.delete(key);
  });
  schedule(document.body);
}

export function startEngine() {
  if (enabled) { reapplyAll(); return; }
  enabled = true;
  observer = new MutationObserver((muts) => {
    for (const m of muts) {
      if (m.type === 'characterData') schedule(m.target);
      else m.addedNodes.forEach((n) => schedule(n));
    }
  });
  schedule(document.body);
}
