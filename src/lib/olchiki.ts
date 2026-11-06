// ओल चिकी के 30 अक्षर (Unicode U+1C5A–U+1C77) और अंक (U+1C50–U+1C59)
const NAMES: [string, string][] = [
  ['La', 'ला'], ['At', 'आत'], ['Ag', 'आग'], ['Ang', 'आंग'], ['Al', 'आल'], ['Laa', 'आ'], ['Aak', 'आक'], ['Aaj', 'आज'], ['Aam', 'आम'], ['Aaw', 'आव'],
  ['Li', 'ली'], ['Is', 'इस'], ['Ih', 'इह'], ['Iny', 'इञ'], ['Ir', 'इर'], ['Lu', 'लु'], ['Uch', 'उच'], ['Ud', 'उद'], ['Unn', 'उण'], ['Uy', 'उय'],
  ['Le', 'ले'], ['Ep', 'एप'], ['Edd', 'एड'], ['En', 'एन'], ['Err', 'एड़'], ['Lo', 'लो'], ['Ott', 'ओट'], ['Obb', 'ओब'], ['Ov', 'ओव'], ['Oh', 'ओह'],
];
export const OL_LETTERS = NAMES.map(([roman, hindi], i) => ({ char: String.fromCharCode(0x1c5a + i), roman, hindi }));
export const OL_DIGITS = Array.from({ length: 10 }, (_, i) => ({ char: String.fromCharCode(0x1c50 + i), value: i }));
export const shuffle = <T,>(a: T[]) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
