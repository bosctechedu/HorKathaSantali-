import React, { useEffect, useState } from 'react';
import { useAdmin, ADMIN_USERNAME } from '../context/AdminContext';
import {
  Lock, Unlock, X, LogOut, ShieldCheck, AlertTriangle, Eye, EyeOff, Mail, KeyRound,
  UserPlus, Users, Trash2, RotateCcw, CheckCircle2, Loader2, ArrowRight, UserCog,
} from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCMS?: () => void;
}

type View = 'login' | 'setup' | 'reset';
type Op = { username: string; name: string; createdAt?: string; active: boolean };

const MIN = 8;
const input =
  'w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200';
const btn =
  'w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white text-sm font-bold disabled:opacity-50 cursor-pointer';
const btnLight =
  'flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50 cursor-pointer';

const Note: React.FC<{ kind: 'error' | 'ok' | 'info'; children: React.ReactNode }> = ({ kind, children }) => (
  <div
    className={`p-3 rounded-xl text-xs flex gap-2 items-start border ${
      kind === 'error' ? 'bg-rose-50 border-rose-200 text-rose-800' : kind === 'ok' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-900'
    }`}
  >
    {kind === 'error' ? <AlertTriangle className="w-4 h-4 shrink-0" /> : kind === 'ok' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <ShieldCheck className="w-4 h-4 shrink-0" />}
    <div>{children}</div>
  </div>
);

const PassInput: React.FC<{ value: string; onChange: (v: string) => void; placeholder: string; autoComplete?: string }> = ({ value, onChange, placeholder, autoComplete }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input type={show ? 'text' : 'password'} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} autoComplete={autoComplete} className={input + ' pr-10'} />
      <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-700" title={show ? 'छिपाएँ' : 'दिखाएँ'}>
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );
};

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onOpenCMS }) => {
  const {
    isAdmin, isSuperAdmin, role, staffUsername, authStatus, refreshAuthStatus,
    login, logoutAdmin, sendAdminOtp, setupAdmin, resetAdminPassword, changePassword, staffFetch,
  } = useAdmin();

  const [view, setView] = useState<View>('login');
  const [loginRole, setLoginRole] = useState<'admin' | 'operator'>('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
  const [ops, setOps] = useState<Op[]>([]);
  const [opUser, setOpUser] = useState('');
  const [opName, setOpName] = useState('');
  const [opPw, setOpPw] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setError(''); setOk('');
    refreshAuthStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (authStatus && authStatus.ready && !authStatus.adminSet && !isAdmin) setView('setup');
  }, [authStatus, isAdmin]);

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

  const reset = () => { setError(''); setOk(''); };
  const go = (v: View) => { reset(); setOtp(''); setNewPw(''); setNewPw2(''); setOtpSentTo(''); setView(v); };

  const doLogin = async (e: React.FormEvent) => {
    e.preventDefault(); reset();
    const u = loginRole === 'admin' ? ADMIN_USERNAME : username.trim();
    if (!u || !password) return setError('Username और Password डालें।');
    setBusy(true);
    const r = await login(u, password);
    setBusy(false);
    if (r.success) { setPassword(''); setOk('Login सफल।'); }
    else { setError(r.error || 'Login नहीं हुआ।'); if (r.needSetup) go('setup'); }
  };

  const doSendOtp = async () => {
    reset(); setBusy(true);
    const r = await sendAdminOtp();
    setBusy(false);
    if (r.success) { setOtpSentTo(r.sentTo || 'Admin email'); setCooldown(60); setOk(`OTP भेजा गया: ${r.sentTo}. Inbox / Spam देखें।`); }
    else setError(r.error || 'OTP नहीं भेज पाए।');
  };

  const doOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); reset();
    if (!/^\d{6}$/.test(otp.trim())) return setError('6 अंकों का OTP डालें।');
    if (newPw.length < MIN) return setError(`पासवर्ड कम से कम ${MIN} अक्षर का हो।`);
    if (newPw !== newPw2) return setError('दोनों पासवर्ड एक जैसे नहीं हैं।');
    setBusy(true);
    const r = view === 'setup' ? await setupAdmin(otp, newPw) : await resetAdminPassword(otp, newPw);
    setBusy(false);
    if (!r.success) return setError(r.error || 'नहीं हो पाया।');
    if (view === 'setup') { setOk('Admin खाता बन गया और आप Login हैं।'); }
    else { go('login'); setLoginRole('admin'); setOk(r.message || 'पासवर्ड बदल गया। अब Login करें।'); }
    setNewPw(''); setNewPw2(''); setOtp('');
  };

  const doChangePw = async (e: React.FormEvent) => {
    e.preventDefault(); reset();
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
    e.preventDefault(); reset();
    if (opPw.length < MIN) return setError(`Operator पासवर्ड कम से कम ${MIN} अक्षर का हो।`);
    setBusy(true);
    const d = await opCall({ action: 'op-create', username: opUser.trim(), name: opName.trim(), password: opPw });
    setBusy(false);
    if (d.success) { setOk(`Operator "${opUser.trim().toLowerCase()}" बन गया। यही Username और Password उन्हें दें।`); setOpUser(''); setOpName(''); setOpPw(''); loadOps(); }
    else setError(d.error || 'Operator नहीं बना।');
  };

  const resetOp = async (u: string) => {
    const pw = prompt(`"${u}" का नया पासवर्ड (कम से कम ${MIN} अक्षर):`);
    if (!pw) return;
    reset();
    const d = await opCall({ action: 'op-reset', username: u, password: pw });
    d.success ? setOk(`"${u}" का पासवर्ड बदल गया।`) : setError(d.error || 'नहीं बदला।');
  };

  const deleteOp = async (u: string) => {
    if (!confirm(`Operator "${u}" को हटाएँ? वह तुरंत Logout हो जाएगा।`)) return;
    reset();
    const d = await opCall({ action: 'op-delete', username: u });
    if (d.success) { setOk(`"${u}" हटा दिया गया।`); loadOps(); } else setError(d.error || 'नहीं हटा।');
  };

  const notReady = authStatus && !authStatus.ready;
  const noEmail = authStatus && authStatus.ready && !authStatus.emailReady;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-slate-200/90 relative overflow-hidden flex flex-col max-h-[92vh]">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full cursor-pointer z-10" title="बंद करें">
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 shrink-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shrink-0">
            {isAdmin ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">Admin / Operator Login</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isAdmin ? (role === 'admin' ? 'Admin · पूरा नियंत्रण' : 'Assigned Operator · सामग्री व स्लाइडर') : 'सुरक्षित Login · Email OTP से पासवर्ड रीसेट'}
            </p>
          </div>
        </div>

        <div className="overflow-y-auto pt-4 space-y-4 pr-1">
          {error && <Note kind="error">{error}</Note>}
          {ok && <Note kind="ok">{ok}</Note>}

          {isAdmin ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50 text-xs text-emerald-900 flex items-center gap-3">
                <UserCog className="w-5 h-5 text-emerald-700" />
                <div>
                  <p className="font-bold text-sm">{role === 'admin' ? 'Admin' : 'Operator'} Login है</p>
                  <p className="font-mono">{staffUsername}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => { onOpenCMS?.(); onClose(); }} className={btn}>
                  CMS खोलें <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => { logoutAdmin(); onClose(); }} className={btnLight + ' py-2.5 text-sm'}>
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>

              {isSuperAdmin && (
                <div className="p-4 rounded-2xl border border-slate-200 space-y-3">
                  <p className="text-sm font-black text-slate-900 flex items-center gap-2"><Users className="w-4 h-4" /> Assigned Operators</p>
                  {ops.length === 0 ? (
                    <p className="text-xs text-slate-500">अभी कोई Operator नहीं है।</p>
                  ) : (
                    <div className="space-y-2">
                      {ops.map((o) => (
                        <div key={o.username} className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 font-mono truncate">{o.username}</p>
                            {o.name && <p className="text-[11px] text-slate-500 truncate">{o.name}</p>}
                          </div>
                          <div className="flex gap-1.5 shrink-0">
                            <button onClick={() => resetOp(o.username)} className={btnLight} title="पासवर्ड बदलें"><RotateCcw className="w-3.5 h-3.5" /></button>
                            <button onClick={() => deleteOp(o.username)} className={btnLight + ' text-rose-700'} title="हटाएँ"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <form onSubmit={createOp} className="space-y-2 pt-2 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5"><UserPlus className="w-3.5 h-3.5" /> नया Operator</p>
                    <input value={opUser} onChange={(e) => setOpUser(e.target.value)} placeholder="Username (जैसे ramesh.op)" className={input} autoComplete="off" />
                    <input value={opName} onChange={(e) => setOpName(e.target.value)} placeholder="नाम (वैकल्पिक)" className={input} autoComplete="off" />
                    <PassInput value={opPw} onChange={setOpPw} placeholder={`पासवर्ड (कम से कम ${MIN} अक्षर)`} autoComplete="new-password" />
                    <button type="submit" disabled={busy} className={btn}>{busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />} Operator बनाएँ</button>
                  </form>
                </div>
              )}

              <form onSubmit={doChangePw} className="p-4 rounded-2xl border border-slate-200 space-y-2">
                <p className="text-sm font-black text-slate-900 flex items-center gap-2"><KeyRound className="w-4 h-4" /> अपना पासवर्ड बदलें</p>
                <PassInput value={oldPw} onChange={setOldPw} placeholder="पुराना पासवर्ड" autoComplete="current-password" />
                <PassInput value={chPw} onChange={setChPw} placeholder={`नया पासवर्ड (कम से कम ${MIN} अक्षर)`} autoComplete="new-password" />
                <button type="submit" disabled={busy} className={btnLight + ' w-full py-2.5'}>पासवर्ड बदलें</button>
              </form>
            </div>
          ) : (
            <div className="space-y-4">
              {notReady && <Note kind="error">Login सर्वर अभी चालू नहीं है (Cloudflare में KV binding <b>HK_DB</b> जोड़ना बाकी है)।</Note>}
              {noEmail && <Note kind="info">Email OTP सेवा (BREVO_API_KEY) अभी सेट नहीं है। Setup / Reset के लिए ज़रूरी है।</Note>}

              <div className="flex gap-1 p-1 rounded-xl bg-slate-100">
                {([
                  ['login', 'Login'],
                  ...(authStatus && authStatus.ready && !authStatus.adminSet ? [['setup', 'पहली बार सेटअप']] : [['reset', 'पासवर्ड भूल गए']]),
                ] as [View, string][]).map(([v, label]) => (
                  <button key={v} onClick={() => go(v)} className={`flex-1 py-2 rounded-lg text-xs font-bold cursor-pointer ${view === v ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}>
                    {label}
                  </button>
                ))}
              </div>

              {view === 'login' && (
                <form onSubmit={doLogin} className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    {(['admin', 'operator'] as const).map((r) => (
                      <button key={r} type="button" onClick={() => { setLoginRole(r); reset(); }}
                        className={`py-2.5 rounded-xl border text-sm font-bold cursor-pointer ${loginRole === r ? 'border-amber-500 bg-amber-50 text-amber-900' : 'border-slate-200 text-slate-600'}`}>
                        {r === 'admin' ? 'Admin' : 'Assigned Operator'}
                      </button>
                    ))}
                  </div>
                  {loginRole === 'admin' ? (
                    <input value={ADMIN_USERNAME} readOnly className={input + ' bg-slate-50 font-mono'} aria-label="Admin username" />
                  ) : (
                    <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Admin द्वारा दिया गया Username" className={input} autoComplete="username" />
                  )}
                  <PassInput value={password} onChange={setPassword} placeholder="Password" autoComplete="current-password" />
                  <button type="submit" disabled={busy || !!notReady} className={btn}>{busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />} Login</button>
                  {loginRole === 'operator' && <p className="text-[11px] text-slate-500 text-center">पासवर्ड भूल गए? Admin से नया पासवर्ड लें।</p>}
                </form>
              )}

              {(view === 'setup' || view === 'reset') && (
                <form onSubmit={doOtpSubmit} className="space-y-3">
                  <Note kind="info">
                    {view === 'setup'
                      ? <>Admin Username <b className="font-mono">{ADMIN_USERNAME}</b> रहेगा। OTP Admin email पर आएगा, फिर अपना पासवर्ड बनाएँ।</>
                      : <>Admin पासवर्ड रीसेट: OTP Admin email ({authStatus?.resetEmail || 'bos•••@gmail.com'}) पर आएगा।</>}
                  </Note>
                  <button type="button" onClick={doSendOtp} disabled={busy || cooldown > 0 || !!notReady} className={btnLight + ' w-full py-2.5'}>
                    <Mail className="w-4 h-4" /> {cooldown > 0 ? `दोबारा भेजें (${cooldown}s)` : otpSentTo ? 'OTP दोबारा भेजें' : 'Email पर OTP भेजें'}
                  </button>
                  <input value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} inputMode="numeric" placeholder="6 अंकों का OTP" className={input + ' tracking-[0.4em] font-mono text-center'} />
                  <PassInput value={newPw} onChange={setNewPw} placeholder={`नया पासवर्ड (कम से कम ${MIN} अक्षर)`} autoComplete="new-password" />
                  <PassInput value={newPw2} onChange={setNewPw2} placeholder="पासवर्ड दोबारा" autoComplete="new-password" />
                  <button type="submit" disabled={busy || !!notReady} className={btn}>
                    {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />} {view === 'setup' ? 'Admin खाता बनाएँ' : 'पासवर्ड रीसेट करें'}
                  </button>
                </form>
              )}

              <p className="text-[11px] text-slate-500 text-center">मदद: WhatsApp +91 91109 77117 · bosctechedu@gmail.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
