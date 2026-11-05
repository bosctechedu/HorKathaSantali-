import React, { useEffect, useState } from 'react';
import { useAdmin, ADMIN_USERNAME } from '../context/AdminContext';
import {
  X, LogOut, ShieldCheck, AlertTriangle, Eye, EyeOff, Mail, KeyRound, UserPlus, Users, Trash2, RotateCcw,
  CheckCircle2, Loader2, ArrowRight, ArrowLeft, UserCog, ShieldUser, UserRound, LockKeyhole, ChevronDown,
  MessageCircle, MailCheck, Info,
} from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCMS?: () => void;
}

type Role = 'admin' | 'operator';
/** login → (Admin) forgot-send → forgot-otp → forgot-pass → back to login | (Operator) op-forgot */
type View = 'login' | 'forgot-send' | 'forgot-otp' | 'forgot-pass' | 'op-forgot';
type Op = { username: string; name: string; createdAt?: string; active: boolean };

const MIN = 8;
const ADMIN_EMAIL = 'bosctechedu@gmail.com';
const REMEMBER_KEY = 'hk_staff_remember'; // { role, username } only — never the password
const WHATSAPP = '+91 91109 77117';
const WHATSAPP_URL = 'https://wa.me/919110977117';

const isAdminId = (u: string) => {
  const v = u.trim();
  return v.toUpperCase() === ADMIN_USERNAME || v.toLowerCase() === ADMIN_EMAIL;
};

// ── Small UI pieces ──────────────────────────────────────────────────────────
const Note: React.FC<{ kind: 'error' | 'ok' | 'info' | 'warn'; children: React.ReactNode }> = ({ kind, children }) => (
  <div
    role={kind === 'error' ? 'alert' : 'status'}
    className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed flex gap-2 items-start border ${
      kind === 'error'
        ? 'bg-rose-50 border-rose-200 text-rose-800'
        : kind === 'ok'
          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
          : kind === 'warn'
            ? 'bg-amber-50 border-amber-300 text-amber-900'
            : 'bg-blue-50 border-blue-200 text-blue-900'
    }`}
  >
    {kind === 'error' || kind === 'warn' ? <AlertTriangle className="w-4 h-4 shrink-0 mt-px" /> : kind === 'ok' ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-px" /> : <Info className="w-4 h-4 shrink-0 mt-px" />}
    <div className="min-w-0">{children}</div>
  </div>
);

/** Rounded pill input with the blue gradient icon block on the left. */
const PillField: React.FC<{
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  password?: boolean;
  className?: string;
  ariaLabel?: string;
}> = ({ icon, value, onChange, placeholder, type = 'text', autoComplete, inputMode, password, className = '', ariaLabel }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex items-center gap-1 rounded-full bg-white border border-blue-100 shadow-[inset_0_1px_3px_rgba(15,23,42,0.06),0_4px_14px_-6px_rgba(37,99,235,0.25)] focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-blue-300 transition">
      <span className="m-1 w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
        {icon}
      </span>
      <input
        type={password ? (show ? 'text' : 'password') : type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel || placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className={`flex-1 min-w-0 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400 py-2.5 pl-1.5 ${password ? '' : 'pr-4'} ${className}`}
      />
      {password && (
        <button type="button" onClick={() => setShow((s) => !s)} className="mr-2 p-2 rounded-full text-slate-400 hover:text-blue-700 hover:bg-blue-50 cursor-pointer" title={show ? 'पासवर्ड छिपाएँ' : 'पासवर्ड दिखाएँ'} aria-label={show ? 'पासवर्ड छिपाएँ' : 'पासवर्ड दिखाएँ'}>
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
};

const bigBtn =
  'w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white text-sm sm:text-base font-black tracking-[0.12em] uppercase shadow-[0_12px_28px_-10px_rgba(79,70,229,0.75)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition active:scale-[0.99]';
const pillBtn =
  'inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm disabled:opacity-50 cursor-pointer transition';
const lightBtn =
  'inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full border border-blue-200 bg-white text-xs font-bold text-blue-800 hover:bg-blue-50 disabled:opacity-50 cursor-pointer transition';
const plainInput =
  'w-full px-4 py-2.5 rounded-full border border-blue-100 bg-white text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-slate-400';

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onOpenCMS }) => {
  const {
    isAdmin, isSuperAdmin, role, staffUsername, authStatus, refreshAuthStatus,
    login, logoutAdmin, sendAdminOtp, setupAdmin, resetAdminPassword, changePassword, staffFetch,
  } = useAdmin();

  const remembered = (() => {
    try { return JSON.parse(localStorage.getItem(REMEMBER_KEY) || 'null') as { role: Role; username: string } | null; } catch { return null; }
  })();

  const [view, setView] = useState<View>('login');
  const [loginRole, setLoginRole] = useState<Role>(remembered?.role || 'admin');
  const [username, setUsername] = useState(remembered?.username || '');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(!!remembered);
  const [otp, setOtp] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newPw2, setNewPw2] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const [otpSentTo, setOtpSentTo] = useState('');
  const [cooldown, setCooldown] = useState(0);

  // Signed-in tools
  const [oldPw, setOldPw] = useState('');
  const [chPw, setChPw] = useState('');
  const [showChPw, setShowChPw] = useState(false);
  const [ops, setOps] = useState<Op[]>([]);
  const [opUser, setOpUser] = useState('');
  const [opName, setOpName] = useState('');
  const [opPw, setOpPw] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setError(''); setOk(''); setView('login');
    refreshAuthStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  useEffect(() => {
    if (isOpen && isSuperAdmin) loadOps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isSuperAdmin]);

  if (!isOpen) return null;

  const setupMode = !!(authStatus && authStatus.ready && !authStatus.adminSet); // no admin yet → first-time setup
  const notReady = !!(authStatus && !authStatus.ready);
  const noEmail = !!(authStatus && authStatus.ready && !authStatus.emailReady);
  const serverIncomplete = notReady || noEmail;

  const clearMsgs = () => { setError(''); setOk(''); };
  const go = (v: View) => { clearMsgs(); setView(v); };
  const startForgot = () => {
    clearMsgs();
    if (loginRole === 'operator') return setView('op-forgot');
    setOtp(''); setNewPw(''); setNewPw2(''); setOtpSentTo('');
    setView('forgot-send');
  };
  const pickRole = (r: Role) => {
    setLoginRole(r); clearMsgs();
    if (r === 'operator' && isAdminId(username)) setUsername('');
    // Changing role inside a forgot flow jumps to that role's forgot screen
    if (view !== 'login') setView(r === 'operator' ? 'op-forgot' : 'forgot-send');
  };

  // ── Login ──
  const doLogin = async (e: React.FormEvent) => {
    e.preventDefault(); clearMsgs();
    const u = username.trim();
    if (!u || !password) return setError(loginRole === 'admin' ? 'Admin Email / Username और Password दोनों डालें।' : 'Operator Username और Password दोनों डालें।');
    if (loginRole === 'admin' && !isAdminId(u)) return setError(`Admin के लिए ${ADMIN_EMAIL} या ${ADMIN_USERNAME} डालें। Operator हैं तो ऊपर "Operator" चुनें।`);
    if (loginRole === 'operator' && isAdminId(u)) return setError('यह Admin खाता है — ऊपर "Admin" चुनें।');
    if (loginRole === 'admin' && setupMode) return setError('Admin अभी बना नहीं है। "First-time Setup" दबाकर Email OTP से पहली बार पासवर्ड बनाएँ।');
    setBusy(true);
    const r = await login(u, password);
    setBusy(false);
    if (r.success) {
      setPassword('');
      try {
        remember ? localStorage.setItem(REMEMBER_KEY, JSON.stringify({ role: loginRole, username: u })) : localStorage.removeItem(REMEMBER_KEY);
      } catch { /* storage full / private mode */ }
      setOk(loginRole === 'admin' ? 'Login सफल। नीचे से Operator बना सकते हैं।' : 'Login सफल।');
    } else {
      setError(r.error || 'Login नहीं हुआ।');
      if (r.needSetup) startForgot();
    }
  };

  // ── Admin email OTP (reset, or first-time setup) ──
  const doSendOtp = async () => {
    clearMsgs(); setBusy(true);
    const r = await sendAdminOtp();
    setBusy(false);
    if (r.success) {
      setOtpSentTo(r.sentTo || 'Admin email'); setCooldown(60);
      setView('forgot-otp');
      setOk(`OTP भेजा गया: ${r.sentTo || 'Admin email'} — Inbox / Spam देखें (10 मिनट वैध)।`);
    } else setError(r.error || 'OTP नहीं भेज पाए।');
  };

  const doOtpNext = (e: React.FormEvent) => {
    e.preventDefault(); clearMsgs();
    if (!/^\d{6}$/.test(otp.trim())) return setError('6 अंकों का OTP डालें।');
    setView('forgot-pass');
  };

  const doSetPassword = async (e: React.FormEvent) => {
    e.preventDefault(); clearMsgs();
    if (newPw.length < MIN) return setError(`पासवर्ड कम से कम ${MIN} अक्षर का हो।`);
    if (newPw !== newPw2) return setError('दोनों पासवर्ड एक जैसे नहीं हैं।');
    setBusy(true);
    const r = setupMode ? await setupAdmin(otp, newPw) : await resetAdminPassword(otp, newPw);
    setBusy(false);
    if (!r.success) {
      setError(r.error || 'नहीं हो पाया।');
      if (/OTP/.test(r.error || '')) { setOtp(''); setView(/समाप्त|नया OTP/.test(r.error || '') ? 'forgot-send' : 'forgot-otp'); }
      return;
    }
    setNewPw(''); setNewPw2(''); setOtp(''); setPassword('');
    if (setupMode) {
      setOk('Admin खाता बन गया और आप Login हैं। अब नीचे से Operator बना सकते हैं।');
    } else {
      setLoginRole('admin');
      setUsername((u) => (isAdminId(u) ? u : ADMIN_EMAIL));
      setView('login');
      setOk(r.message || 'पासवर्ड बदल गया। नए पासवर्ड से Login करें।');
    }
  };

  // ── Signed-in: own password + operators ──
  const doChangePw = async (e: React.FormEvent) => {
    e.preventDefault(); clearMsgs();
    if (chPw.length < MIN) return setError(`नया पासवर्ड कम से कम ${MIN} अक्षर का हो।`);
    setBusy(true);
    const r = await changePassword(oldPw, chPw);
    setBusy(false);
    if (r.success) { setOk(r.message || 'पासवर्ड बदल गया।'); setOldPw(''); setChPw(''); } else setError(r.error || 'नहीं बदला।');
  };

  const opCall = async (body: Record<string, unknown>) => {
    const r = await staffFetch('/api/auth', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    return r.json().catch(() => ({}));
  };

  async function loadOps() {
    const d = await opCall({ action: 'op-list' });
    if (d.success) setOps(d.operators || []);
  }

  const createOp = async (e: React.FormEvent) => {
    e.preventDefault(); clearMsgs();
    const u = opUser.trim().toLowerCase();
    if (!/^[a-z0-9._@-]{3,30}$/.test(u)) return setError('Username 3–30 अक्षर (a-z, 0-9, . _ @ -) का हो।');
    if (isAdminId(u)) return setError('Admin वाला नाम / email Operator को नहीं दे सकते।');
    if (opPw.length < MIN) return setError(`Operator पासवर्ड कम से कम ${MIN} अक्षर का हो।`);
    setBusy(true);
    const d = await opCall({ action: 'op-create', username: u, name: opName.trim(), password: opPw });
    setBusy(false);
    if (d.success) {
      setOk(`Operator "${u}" बन गया। यही Username और Password उन्हें दें — वे इसी Login कार्ड में "Operator" चुनकर Login करेंगे।`);
      setOpUser(''); setOpName(''); setOpPw(''); loadOps();
    } else setError(d.error || 'Operator नहीं बना।');
  };

  const resetOp = async (u: string) => {
    const pw = prompt(`"${u}" का नया पासवर्ड (कम से कम ${MIN} अक्षर):`);
    if (!pw) return;
    clearMsgs();
    if (pw.length < MIN) return setError(`पासवर्ड कम से कम ${MIN} अक्षर का हो।`);
    const d = await opCall({ action: 'op-reset', username: u, password: pw });
    d.success ? setOk(`"${u}" का पासवर्ड बदल गया। नया पासवर्ड उन्हें बताएँ।`) : setError(d.error || 'नहीं बदला।');
  };

  const deleteOp = async (u: string) => {
    if (!confirm(`Operator "${u}" को हटाएँ? वह तुरंत Logout हो जाएगा।`)) return;
    clearMsgs();
    const d = await opCall({ action: 'op-delete', username: u });
    if (d.success) { setOk(`"${u}" हटा दिया गया।`); loadOps(); } else setError(d.error || 'नहीं हटा।');
  };

  // ── Header pieces (avatar + role badge/dropdown) ──
  const shownRole: Role = isAdmin ? (role as Role) || 'admin' : loginRole;
  const AvatarIcon = shownRole === 'admin' ? ShieldUser : UserCog;
  const roleLabel = shownRole === 'admin' ? 'ADMIN' : 'OPERATOR';

  const serverNotice = serverIncomplete && (
    <Note kind="warn">
      <b>सर्वर सेटअप अधूरा: Cloudflare में HK_DB / BREVO_API_KEY जोड़ें।</b>
      <span className="block mt-0.5">
        {notReady
          ? 'KV binding HK_DB जुड़ा नहीं है — अभी कोई Login / OTP काम नहीं करेगा।'
          : 'BREVO_API_KEY नहीं है — Login चलेगा, पर Email OTP (Forgot Password / पहली बार सेटअप) नहीं जाएगा।'}
      </span>
    </Note>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm">
      <div className="min-h-full flex items-start sm:items-center justify-center px-3 pt-12 pb-6 sm:p-6">
        <div
          className="relative w-full max-w-[420px] mt-4 rounded-[2rem] border border-white/80 bg-gradient-to-b from-sky-50 via-slate-50 to-blue-100 shadow-[0_30px_70px_-20px_rgba(30,64,175,0.45),0_8px_24px_-12px_rgba(15,23,42,0.25)]"
          role="dialog"
          aria-modal="true"
          aria-label="Staff Login"
        >
          {/* Overlapping "Welcome Back" pill */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-7 sm:px-9 py-2 rounded-full bg-white border border-blue-100 shadow-[0_10px_25px_-10px_rgba(37,99,235,0.5)] text-center whitespace-nowrap">
            <p className="text-lg sm:text-xl font-black text-blue-700 leading-tight">{isAdmin ? 'Welcome' : 'Welcome Back'}</p>
            <p className="text-[9px] sm:text-[10px] font-bold text-blue-500 tracking-wide leading-tight">HorKathaSantali</p>
          </div>

          <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-white/80 cursor-pointer z-10" title="बंद करें" aria-label="बंद करें">
            <X className="w-4 h-4" />
          </button>

          <div className="px-5 sm:px-7 pt-12 pb-5 space-y-4">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-700 ring-[6px] ring-white shadow-[0_14px_30px_-10px_rgba(37,99,235,0.7)] flex items-center justify-center text-white">
                <AvatarIcon className="w-12 h-12 sm:w-14 sm:h-14" strokeWidth={1.75} />
              </div>

              {/* Role badge = dropdown (fixed badge once signed in) */}
              {isAdmin ? (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-blue-200 shadow-sm text-[11px] font-black tracking-[0.18em] text-blue-700">
                  <ShieldCheck className="w-4 h-4" /> {roleLabel}
                </span>
              ) : (
                <label className="relative inline-flex items-center rounded-full bg-white border border-blue-200 shadow-sm hover:border-blue-400 focus-within:ring-2 focus-within:ring-blue-300 cursor-pointer" title="Role चुनें / Select role">
                  <ShieldCheck className="w-4 h-4 text-blue-700 absolute left-3 pointer-events-none" />
                  <select
                    value={loginRole}
                    onChange={(e) => pickRole(e.target.value as Role)}
                    aria-label="Login role"
                    className="appearance-none bg-transparent pl-9 pr-8 py-1.5 text-[11px] font-black tracking-[0.18em] text-blue-700 outline-none cursor-pointer"
                  >
                    <option value="admin">ADMIN</option>
                    <option value="operator">OPERATOR</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-blue-700 absolute right-3 pointer-events-none" />
                </label>
              )}
              {isAdmin && <p className="text-xs font-mono font-bold text-slate-700 -mt-1">{staffUsername}</p>}
            </div>

            {error && <Note kind="error">{error}</Note>}
            {ok && <Note kind="ok">{ok}</Note>}

            {isAdmin ? (
              /* ── Signed-in state ── */
              <div className="space-y-4">
                <p className="text-center text-xs text-slate-600">
                  {role === 'admin' ? 'Admin · पूरा नियंत्रण (सामग्री, स्लाइडर, Operators)' : 'Assigned Operator · सामग्री व स्लाइडर'}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => { onOpenCMS?.(); onClose(); }} className={bigBtn + ' !py-3 !text-xs !tracking-wider'}>
                    CMS खोलें <ArrowRight className="w-4 h-4" />
                  </button>
                  <button onClick={() => { logoutAdmin(); clearMsgs(); setView('login'); }} className="w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-full border border-blue-200 bg-white text-xs font-black text-blue-800 hover:bg-blue-50 cursor-pointer">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>

                {isSuperAdmin && (
                  <div className="p-4 rounded-3xl bg-white/80 border border-blue-100 shadow-sm space-y-3">
                    <p className="text-sm font-black text-slate-900 flex items-center gap-2"><Users className="w-4 h-4 text-blue-700" /> Assigned Operators</p>
                    <form onSubmit={createOp} className="space-y-2">
                      <p className="text-xs font-bold text-blue-800 flex items-center gap-1.5"><UserPlus className="w-3.5 h-3.5" /> नया Operator बनाएँ</p>
                      <PillField icon={<UserCog className="w-4 h-4" />} value={opUser} onChange={setOpUser} placeholder="Operator Username (जैसे ramesh.op)" autoComplete="off" />
                      <PillField icon={<UserRound className="w-4 h-4" />} value={opName} onChange={setOpName} placeholder="नाम (वैकल्पिक)" autoComplete="off" />
                      <PillField icon={<LockKeyhole className="w-4 h-4" />} value={opPw} onChange={setOpPw} placeholder={`पासवर्ड (कम से कम ${MIN} अक्षर)`} autoComplete="new-password" password />
                      <button type="submit" disabled={busy} className={pillBtn + ' w-full py-2.5'}>
                        {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />} Operator बनाएँ
                      </button>
                      <p className="text-[11px] text-slate-500 text-center">Operator इसी कार्ड में Role "OPERATOR" चुनकर Login करेगा।</p>
                    </form>
                    <div className="pt-2 border-t border-blue-100 space-y-2">
                      {ops.length === 0 ? (
                        <p className="text-xs text-slate-500">अभी कोई Operator नहीं है।</p>
                      ) : (
                        ops.map((o) => (
                          <div key={o.username} className="flex items-center justify-between gap-2 pl-3 pr-1.5 py-1.5 rounded-full bg-blue-50/70 border border-blue-100">
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-900 font-mono truncate">{o.username}</p>
                              {o.name && <p className="text-[11px] text-slate-500 truncate">{o.name}</p>}
                            </div>
                            <div className="flex gap-1 shrink-0">
                              <button onClick={() => resetOp(o.username)} className={lightBtn + ' !px-2.5'} title="पासवर्ड रीसेट करें" aria-label={`${o.username} पासवर्ड रीसेट`}><RotateCcw className="w-3.5 h-3.5" /></button>
                              <button onClick={() => deleteOp(o.username)} className={lightBtn + ' !px-2.5 !text-rose-700 !border-rose-200'} title="हटाएँ" aria-label={`${o.username} हटाएँ`}><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                <div className="p-4 rounded-3xl bg-white/70 border border-blue-100 space-y-2">
                  <button type="button" onClick={() => setShowChPw((s) => !s)} className="w-full text-sm font-black text-slate-900 flex items-center justify-between gap-2 cursor-pointer">
                    <span className="flex items-center gap-2"><KeyRound className="w-4 h-4 text-blue-700" /> अपना पासवर्ड बदलें</span>
                    <ChevronDown className={`w-4 h-4 transition ${showChPw ? 'rotate-180' : ''}`} />
                  </button>
                  {showChPw && (
                    <form onSubmit={doChangePw} className="space-y-2 pt-1">
                      <PillField icon={<LockKeyhole className="w-4 h-4" />} value={oldPw} onChange={setOldPw} placeholder="पुराना पासवर्ड" autoComplete="current-password" password />
                      <PillField icon={<KeyRound className="w-4 h-4" />} value={chPw} onChange={setChPw} placeholder={`नया पासवर्ड (कम से कम ${MIN} अक्षर)`} autoComplete="new-password" password />
                      <button type="submit" disabled={busy} className={pillBtn + ' w-full py-2.5'}>पासवर्ड बदलें</button>
                    </form>
                  )}
                </div>
              </div>
            ) : view === 'login' ? (
              /* ── Login form ── */
              <form onSubmit={doLogin} className="space-y-3.5">
                {serverNotice}
                {setupMode && loginRole === 'admin' && (
                  <Note kind="info">Admin खाता अभी बना नहीं है। <b>First-time Setup</b> दबाएँ — Email OTP से पहली बार पासवर्ड बनाएँ।</Note>
                )}
                <PillField
                  icon={loginRole === 'admin' ? <ShieldUser className="w-5 h-5" /> : <UserCog className="w-5 h-5" />}
                  value={username}
                  onChange={setUsername}
                  placeholder={loginRole === 'admin' ? 'Enter Admin Email / Username' : 'Enter Operator Username'}
                  autoComplete="username"
                />
                <PillField icon={<LockKeyhole className="w-5 h-5" />} value={password} onChange={setPassword} placeholder="Enter Password" autoComplete="current-password" password />

                <div className="flex items-center justify-between gap-2 px-1">
                  <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
                    <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-4 h-4 rounded accent-blue-600 cursor-pointer" />
                    Remember me
                  </label>
                  <button type="button" onClick={startForgot} className={pillBtn}>{setupMode && loginRole === 'admin' ? 'First-time Setup' : 'Forgot Password?'}</button>
                </div>

                <button type="submit" disabled={busy || notReady} className={bigBtn}>
                  {busy ? <Loader2 className="w-5 h-5 animate-spin" /> : null} SECURE LOG IN 🔒
                </button>
                <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                  {loginRole === 'admin'
                    ? `Admin: ${ADMIN_EMAIL} या ${ADMIN_USERNAME} से Login करें।`
                    : 'Operator: Admin द्वारा दिया गया Username व Password डालें।'}
                  {' '}Remember me केवल Role व Username याद रखता है, पासवर्ड नहीं।
                </p>
              </form>
            ) : view === 'op-forgot' ? (
              /* ── Operator: no OTP, Admin resets ── */
              <div className="space-y-3.5">
                <Note kind="info">
                  <b>Operator का पासवर्ड Admin रीसेट करेगा — Admin से संपर्क करें / WhatsApp {WHATSAPP}</b>
                  <span className="block mt-0.5">Operator खातों में email नहीं होता, इसलिए OTP नहीं भेजा जाता।</span>
                </Note>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={bigBtn + ' !from-emerald-500 !via-emerald-600 !to-teal-600 !tracking-wider'}>
                  <MessageCircle className="w-5 h-5" /> WhatsApp Admin
                </a>
                <button type="button" onClick={() => go('login')} className={lightBtn + ' w-full py-2.5'}><ArrowLeft className="w-4 h-4" /> Login पर वापस</button>
              </div>
            ) : (
              /* ── Admin email OTP flow (reset or first-time setup) ── */
              <div className="space-y-3.5">
                {serverNotice}
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-black tracking-wider text-blue-700">
                  {(['forgot-send', 'forgot-otp', 'forgot-pass'] as View[]).map((v, i) => (
                    <React.Fragment key={v}>
                      {i > 0 && <span className="w-5 h-px bg-blue-300" />}
                      <span className={`px-2 py-0.5 rounded-full ${view === v ? 'bg-blue-600 text-white' : 'bg-white border border-blue-200'}`}>
                        {i + 1}. {v === 'forgot-send' ? 'OTP भेजें' : v === 'forgot-otp' ? 'OTP डालें' : 'नया पासवर्ड'}
                      </span>
                    </React.Fragment>
                  ))}
                </div>

                {view === 'forgot-send' && (
                  <>
                    <Note kind="info">
                      {setupMode
                        ? <>पहली बार सेटअप: Admin Username <b className="font-mono">{ADMIN_USERNAME}</b> रहेगा। OTP Admin email <b>{authStatus?.resetEmail || 'bos•••@gmail.com'}</b> पर जाएगा, फिर अपना पासवर्ड बनाएँ।</>
                        : <>Admin पासवर्ड रीसेट: OTP Admin email <b>{authStatus?.resetEmail || 'bos•••@gmail.com'}</b> पर जाएगा।</>}
                    </Note>
                    <button type="button" onClick={doSendOtp} disabled={busy || cooldown > 0 || notReady || noEmail} className={bigBtn}>
                      {busy ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mail className="w-5 h-5" />}
                      {cooldown > 0 ? `दोबारा भेजें (${cooldown}s)` : 'SEND OTP'}
                    </button>
                    {otpSentTo && (
                      <button type="button" onClick={() => go('forgot-otp')} className={lightBtn + ' w-full py-2.5'}>OTP आ गया है? आगे बढ़ें <ArrowRight className="w-4 h-4" /></button>
                    )}
                  </>
                )}

                {view === 'forgot-otp' && (
                  <form onSubmit={doOtpNext} className="space-y-3.5">
                    <PillField
                      icon={<MailCheck className="w-5 h-5" />}
                      value={otp}
                      onChange={(v) => setOtp(v.replace(/\D/g, '').slice(0, 6))}
                      placeholder="6 अंकों का OTP"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      className="tracking-[0.35em] font-mono font-bold"
                    />
                    <button type="submit" className={bigBtn}>VERIFY OTP <ArrowRight className="w-5 h-5" /></button>
                    <button type="button" onClick={doSendOtp} disabled={busy || cooldown > 0} className={lightBtn + ' w-full py-2.5'}>
                      <Mail className="w-4 h-4" /> {cooldown > 0 ? `OTP दोबारा भेजें (${cooldown}s)` : 'OTP दोबारा भेजें'}
                    </button>
                  </form>
                )}

                {view === 'forgot-pass' && (
                  <form onSubmit={doSetPassword} className="space-y-3.5">
                    <PillField icon={<KeyRound className="w-5 h-5" />} value={newPw} onChange={setNewPw} placeholder={`नया पासवर्ड (कम से कम ${MIN} अक्षर)`} autoComplete="new-password" password />
                    <PillField icon={<LockKeyhole className="w-5 h-5" />} value={newPw2} onChange={setNewPw2} placeholder="पासवर्ड दोबारा (Confirm)" autoComplete="new-password" password />
                    <button type="submit" disabled={busy || notReady} className={bigBtn}>
                      {busy ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
                      {setupMode ? 'CREATE ADMIN' : 'SET NEW PASSWORD'}
                    </button>
                    <button type="button" onClick={() => go('forgot-otp')} className={lightBtn + ' w-full py-2.5'}><ArrowLeft className="w-4 h-4" /> OTP बदलें</button>
                  </form>
                )}

                <button type="button" onClick={() => go('login')} className="w-full text-xs font-bold text-blue-700 hover:underline cursor-pointer flex items-center justify-center gap-1"><ArrowLeft className="w-3.5 h-3.5" /> Login पर वापस</button>
              </div>
            )}

            {/* Footer pill */}
            <div className="flex flex-col items-center gap-1.5 pt-1">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-blue-100 shadow-sm text-[11px] font-bold text-slate-600">
                <span className="font-mono font-black text-blue-700">&lt;/&gt;</span> Developed By <span className="text-blue-700 font-black">BOSC Tech &amp; Edu</span>
              </span>
              <p className="text-[10px] text-slate-500">मदद: WhatsApp {WHATSAPP} · {ADMIN_EMAIL}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
