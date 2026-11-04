import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Hor Katha Suite caught an error in ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      this.setState({ hasError: false, error: null });
      window.location.reload();
    } catch {
      window.location.href = '/';
    }
  };

  private handleClearStorageAndReload = () => {
    try {
      // Clear app state keys without losing admin password
      const adminHash = localStorage.getItem('hor_katha_admin_pw_hash');
      const adminId = localStorage.getItem('hor_katha_admin_id');
      localStorage.clear();
      if (adminHash) localStorage.setItem('hor_katha_admin_pw_hash', adminHash);
      if (adminId) localStorage.setItem('hor_katha_admin_id', adminId);
      window.location.reload();
    } catch {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4 font-sans">
          <div className="max-w-md w-full bg-slate-800 border border-slate-700/80 rounded-3xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shadow-md">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-xl font-black text-white tracking-tight">
                Hor Katha Suite Recovery
              </h2>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                A temporary display issue occurred. Your saved dictionary words and data are safe.
              </p>
              {this.state.error?.message && (
                <p className="mt-2 text-[11px] font-mono bg-slate-950/60 p-2 rounded-xl text-rose-300 border border-rose-900/30 truncate">
                  {this.state.error.message}
                </p>
              )}
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={this.handleReset}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reload Application</span>
              </button>

              <button
                onClick={this.handleClearStorageAndReload}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Reset Cache &amp; Return Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
