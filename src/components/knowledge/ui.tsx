import React from 'react';
import { ExternalLink } from 'lucide-react';

export const KHeader: React.FC<{ icon: React.ReactNode; title: string; sub: string; grad: string }> = ({ icon, title, sub, grad }) => (
  <div className={`rounded-3xl p-6 sm:p-8 bg-gradient-to-br ${grad} text-white shadow-xl`}>
    <div className="flex items-center gap-3 mb-2">{icon}<h1 className="text-2xl sm:text-3xl font-black">{title}</h1></div>
    <p className="text-sm sm:text-base text-white/80">{sub}</p>
  </div>
);
export const KCard: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
  <section className={`bg-white rounded-2xl border border-slate-200 p-5 shadow-sm ${className}`}>
    {title && <h2 className="font-black text-slate-800 mb-3">{title}</h2>}
    {children}
  </section>
);
export const KLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-indigo-700 hover:underline">{children} <ExternalLink className="w-3 h-3" /></a>
);
export const KNote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-3 text-xs sm:text-sm">{children}</div>
);
