import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import {
  Lock,
  Unlock,
  KeyRound,
  CheckCircle2,
  X,
  LogOut,
  ShieldCheck,
  AlertTriangle,
  Info,
  UserCheck,
  Eye,
  EyeOff,
  UserX,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Fingerprint,
  Mail,
  Check,
  Edit3
} from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCMS?: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onOpenCMS }) => {
  const {
    isAdmin,
    adminId,
    loginAdmin,
    hasAdminPassword,
    logoutAdmin,
    resetAdminPassword,
    updateAdminId
  } = useAdmin();

  // Active view tab: 'login' | 'reset'
  const [activeTab, setActiveTab] = useState<'login' | 'reset'>('login');

  // Login form state
  const [loginId, setLoginId] = useState(adminId || '');
  const [passcode, setPasscode] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Reset form state
  const [resetIdOrKey, setResetIdOrKey] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPass, setShowNewPass] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetSuccessMessage, setResetSuccessMessage] = useState<string | null>(null);

  // Active session change password inline toggle
  const [showChangePassInline, setShowChangePassInline] = useState(false);
  const [inlineNewPass, setInlineNewPass] = useState('');
  const [inlineMsg, setInlineMsg] = useState<{ success: boolean; text: string } | null>(null);

  if (!isOpen) return null;

  // Handle standard Admin Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!loginId.trim()) {
      setLoginError('Please enter your Admin ID or Email.');
      return;
    }
    if (!passcode.trim()) {
      setLoginError('Please enter your Admin Password.');
      return;
    }

    const ok = loginAdmin(loginId.trim(), passcode.trim());
    if (ok) {
      setLoginSuccess(true);
      setTimeout(() => {
        setLoginSuccess(false);
        setPasscode('');
        onClose();
      }, 700);
    } else {
      setLoginError(hasAdminPassword ? 'Invalid Admin ID or Password.' : 'First-time setup: enter an Admin ID and a password of at least 8 characters.');
    }
  };

  // Quick autofill default credentials


  // Handle Password Reset
  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetError(null);
    setResetSuccessMessage(null);

    if (!resetIdOrKey.trim()) {
      setResetError('Please type RESET to confirm.');
      return;
    }
    if (!newPassword || newPassword.length < 8) {
      setResetError('New password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetError('New passwords do not match. Please re-enter carefully.');
      return;
    }

    const res = resetAdminPassword(resetIdOrKey.trim(), newPassword.trim());
    if (res.success) {
      setResetSuccessMessage(res.message);
      // Pre-fill login tab with new credentials
      setPasscode(newPassword);
      if (resetIdOrKey.includes('@') || resetIdOrKey.startsWith('BOSC')) {
        setLoginId(resetIdOrKey.trim());
      }
      setTimeout(() => {
        setActiveTab('login');
      }, 1500);
    } else {
      setResetError(res.message);
    }
  };

  // Handle inline password update while logged in
  const handleInlineChangePass = (e: React.FormEvent) => {
    e.preventDefault();
    setInlineMsg(null);
    if (!inlineNewPass || inlineNewPass.length < 8) {
      setInlineMsg({ success: false, text: 'Password must be at least 8 characters.' });
      return;
    }
    const res = resetAdminPassword(adminId, inlineNewPass.trim());
    if (res.success) {
      setInlineMsg({ success: true, text: 'Password updated successfully!' });
      setInlineNewPass('');
      setTimeout(() => setShowChangePassInline(false), 1500);
    } else {
      setInlineMsg({ success: false, text: res.message });
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-slate-200/90 relative overflow-hidden flex flex-col max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer z-10"
          title="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header with Golden Shield & Lock */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 shrink-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 flex items-center justify-center text-white shadow-md shadow-amber-500/25 shrink-0">
            {isAdmin ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Admin Authentication Portal
              </h3>
              <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
                BOSC Suite
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {isAdmin ? 'Active Editorial Session · Full Access' : 'Secure Login & Credential Recovery'}
            </p>
          </div>
        </div>

        {/* Main Body */}
        <div className="overflow-y-auto pt-3 space-y-4 pr-1">
          {/* Active Admin Session View */}
          {isAdmin ? (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 flex items-start gap-3 shadow-2xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm text-emerald-900">Super Admin Active</p>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900 font-mono text-[10px] font-bold">
                      {adminId}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    You have authenticated permissions to Add, Edit, and Delete Dictionary words, customize Hero Banner headers, manage cultural festivals, and modify Santali educational modules.
                  </p>
                </div>
              </div>

              {/* Master CMS Launch Button */}
              {onOpenCMS && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenCMS();
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-black text-xs flex items-center justify-center gap-2.5 shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Launch Master Content Studio (CMS)</span>
                </button>
              )}

              {/* Inline Password Reset / Security Update */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <KeyRound className="w-4 h-4 text-amber-600" />
                    <span>Security &amp; Password Settings</span>
                  </span>
                  <button
                    onClick={() => setShowChangePassInline(!showChangePassInline)}
                    className="text-xs text-amber-800 hover:text-amber-950 font-bold underline cursor-pointer"
                  >
                    {showChangePassInline ? 'Hide Form' : 'Change Password'}
                  </button>
                </div>

                {showChangePassInline && (
                  <form onSubmit={handleInlineChangePass} className="space-y-2.5 pt-1">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Set New Admin Password
                      </label>
                      <input
                        type="password"
                        value={inlineNewPass}
                        onChange={(e) => setInlineNewPass(e.target.value)}
                        placeholder="Enter new secure password (min 8 chars)..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-medium focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                      />
                    </div>

                    {inlineMsg && (
                      <p
                        className={`text-xs font-semibold ${
                          inlineMsg.success ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {inlineMsg.text}
                      </p>
                    )}

                    <div className="flex justify-end pt-1">
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                      >
                        Save New Password
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Return to Suite
                </button>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out Admin</span>
                </button>
              </div>
            </div>
          ) : (
            /* Logged Out: Tabbed Navigation (Sign In & Reset Password) */
            <div className="space-y-4">
              {/* Tabs Switcher: Sign In vs Reset Password */}
              <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setLoginError(null);
                  }}
                  className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'login'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Admin Sign In</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('reset');
                    setResetError(null);
                    setResetSuccessMessage(null);
                  }}
                  className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'reset'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5 text-orange-600" />
                  <span>Reset ID &amp; Password</span>
                </button>
              </div>

              {/* Strict Requirement Notice: Public Sign Up Disabled */}
              <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-xs text-amber-950 space-y-1">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <UserX className="w-4 h-4 text-amber-700 shrink-0" />
                  <span className="text-[11px] uppercase tracking-wider font-extrabold">
                    Sign Up Restricted · Super Admin Only:
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-900">
                  Public user self-registration is permanently disabled. In order to preserve linguistic veracity and intellectual integrity, <strong>accounts can ONLY be provisioned and authorized by the BOSC Tech &amp; Edu Super Administrator</strong>.
                </p>
              </div>

              {/* TAB 1: ADMIN SIGN IN */}
              {activeTab === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                  {/* Admin ID / Email Field */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Admin ID / Registered Email
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={loginId}
                        onChange={(e) => {
                          setLoginId(e.target.value);
                          setLoginError(null);
                        }}
                        placeholder="Your Admin ID"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-slate-50 font-medium"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700">
                        Admin Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setActiveTab('reset')}
                        className="text-[11px] text-amber-800 hover:text-amber-950 font-bold underline cursor-pointer"
                      >
                        Forgot / Reset Password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPass ? 'text' : 'password'}
                        value={passcode}
                        onChange={(e) => {
                          setPasscode(e.target.value);
                          setLoginError(null);
                        }}
                        placeholder="Enter administrator passcode..."
                        className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-slate-50 font-medium"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                      >
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {!hasAdminPassword && (
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-semibold">
                      First-time setup on this device: the Admin ID and password (min 8 characters) you enter now will become the admin login.
                    </div>
                  )}

                  {/* Error Message */}
                  {loginError && (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  {/* Success Message */}
                  {loginSuccess && (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Access Granted! Unlocking editorial control...</span>
                    </div>
                  )}

                  {/* Form Footer */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-gradient-to-r from-amber-600 via-amber-700 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer hover:scale-102 active:scale-98"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Sign In as Admin</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: RESET ID & PASSWORD */}
              {activeTab === 'reset' && (
                <form onSubmit={handleResetSubmit} className="space-y-3.5">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/90 text-xs text-slate-600">
                    <p className="font-bold text-slate-800 flex items-center gap-1.5 mb-0.5">
                      <Fingerprint className="w-3.5 h-3.5 text-orange-600" />
                      <span>Admin Credentials Recovery &amp; Reset</span>
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Forgot the password? Type <code>RESET</code> below to set a new admin password for this device. (Admin changes are saved only on this device.)
                    </p>
                  </div>

                  {/* Verification Key / Admin ID */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Type RESET to confirm
                    </label>
                    <input
                      type="text"
                      value={resetIdOrKey}
                      onChange={(e) => {
                        setResetIdOrKey(e.target.value);
                        setResetError(null);
                      }}
                      placeholder="RESET"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-amber-500/20 focus:outline-none bg-slate-50"
                      autoFocus
                    />
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      New Admin Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPass ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          setResetError(null);
                        }}
                        placeholder="Enter new password (min 8 characters)..."
                        className="w-full px-3.5 py-2 pr-10 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-amber-500/20 focus:outline-none bg-slate-50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                      >
                        {showNewPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setResetError(null);
                      }}
                      placeholder="Re-enter new password..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-amber-500/20 focus:outline-none bg-slate-50"
                    />
                  </div>

                  {/* Reset Error */}
                  {resetError && (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{resetError}</span>
                    </div>
                  )}

                  {/* Reset Success Message */}
                  {resetSuccessMessage && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-700">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="font-bold">Password Reset Successful!</span>
                      </div>
                      <p className="text-[11px] text-emerald-900 font-normal">
                        Your credentials have been updated and saved. Switching to login...
                      </p>
                    </div>
                  )}

                  {/* Reset Form Actions */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setActiveTab('login')}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Back to Sign In
                    </button>

                    <button
                      type="submit"
                      className="px-5 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer hover:scale-102"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset &amp; Save Password</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
