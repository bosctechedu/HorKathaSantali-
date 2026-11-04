import React from 'react';

interface CulturalTreeProps {
  className?: string;
  variant?: 'banner' | 'card' | 'emblem' | 'silhouette';
}

export const CulturalTree: React.FC<CulturalTreeProps> = ({ className = '', variant = 'banner' }) => {
  if (variant === 'emblem') {
    return (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <g stroke="#92400e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Central Stem */}
          <path d="M24 44V10" stroke="#b45309" strokeWidth="2.5" />
          {/* Leaves/Grains right side */}
          <path d="M24 16C28 14 34 16 34 20C34 24 28 24 24 22" fill="#fde68a" fillOpacity="0.7" />
          <path d="M24 26C29 24 35 26 35 30C35 34 29 34 24 32" fill="#fde68a" fillOpacity="0.7" />
          <path d="M24 36C28 34 33 36 33 39C33 42 28 42 24 40" fill="#fde68a" fillOpacity="0.7" />
          {/* Leaves/Grains left side */}
          <path d="M24 12C20 10 14 12 14 16C14 20 20 20 24 18" fill="#fde68a" fillOpacity="0.7" />
          <path d="M24 22C19 20 13 22 13 26C13 30 19 30 24 28" fill="#fde68a" fillOpacity="0.7" />
          <path d="M24 32C20 30 15 32 15 35C15 38 20 38 24 36" fill="#fde68a" fillOpacity="0.7" />
          {/* Crown top grain */}
          <path d="M24 10C26 6 24 4 24 4C24 4 22 6 24 10Z" fill="#d97706" />
        </g>
      </svg>
    );
  }

  if (variant === 'silhouette') {
    return (
      <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Soft ground line */}
        <path d="M0 65 Q 50 60, 100 66 T 200 64 L 200 80 L 0 80 Z" fill="#cbd5e1" opacity="0.3" />
        {/* Little traditional huts */}
        <path d="M40 64 L52 50 L64 64 Z" fill="#94a3b8" opacity="0.4" />
        <rect x="45" y="60" width="14" height="4" fill="#64748b" opacity="0.5" />
        {/* Tree 1 */}
        <path d="M90 65 C85 55, 75 45, 90 35 C105 45, 95 55, 90 65" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        <circle cx="85" cy="40" r="10" fill="#94a3b8" opacity="0.3" />
        <circle cx="95" cy="38" r="12" fill="#94a3b8" opacity="0.35" />
        <circle cx="90" cy="30" r="11" fill="#94a3b8" opacity="0.4" />
        {/* Tree 2 smaller */}
        <path d="M125 64 C122 56, 118 48, 125 42 C132 48, 128 56, 125 64" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="122" cy="45" r="7" fill="#94a3b8" opacity="0.3" />
        <circle cx="128" cy="42" r="8" fill="#94a3b8" opacity="0.35" />
      </svg>
    );
  }

  // Banner & Card detailed sacred Karam / Banyan tree with golden branches
  return (
    <div className={`relative overflow-hidden flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          {/* Warm dawn sun gradient */}
          <radialGradient id="sunDawnGlow" cx="50%" cy="55%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#fed7aa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          {/* Golden leaves gradient */}
          <linearGradient id="goldenCanopy" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#84cc16" />
            <stop offset="35%" stopColor="#a3e635" />
            <stop offset="70%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          {/* Earth slope gradient */}
          <linearGradient id="goldenDunes" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#fde68a" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fef3c7" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Dawn glow backdrop */}
        <circle cx="200" cy="155" r="130" fill="url(#sunDawnGlow)" />

        {/* Soft undulating sacred earth dunes */}
        <path d="M0 240 Q 100 215, 200 235 T 400 230 L 400 300 L 0 300 Z" fill="url(#goldenDunes)" />
        <path d="M0 255 Q 120 235, 220 250 T 400 245 L 400 300 L 0 300 Z" fill="#fef3c7" opacity="0.5" />

        {/* Radiant subtle rays */}
        <g stroke="#fef08a" strokeWidth="1" strokeDasharray="4 4" opacity="0.6">
          <line x1="200" y1="160" x2="60" y2="70" />
          <line x1="200" y1="160" x2="120" y2="40" />
          <line x1="200" y1="160" x2="200" y2="30" />
          <line x1="200" y1="160" x2="280" y2="40" />
          <line x1="200" y1="160" x2="340" y2="70" />
        </g>

        {/* Root structure */}
        <g stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" opacity="0.8">
          <path d="M200 235 Q 185 248, 160 255" />
          <path d="M200 235 Q 210 246, 235 252" />
          <path d="M196 235 Q 192 250, 182 260" />
          <path d="M204 235 Q 206 250, 218 258" />
        </g>

        {/* Main Trunk */}
        <path
          d="M192 235 C192 210, 190 195, 185 180 C180 165, 175 155, 165 145 M208 235 C208 210, 210 195, 215 180 C220 165, 225 155, 235 145"
          stroke="#78350f"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Central stem bark texture */}
        <path d="M200 235 L 200 165" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />

        {/* Primary Branches branching outwards */}
        <g stroke="#78350f" strokeWidth="3" strokeLinecap="round">
          {/* Left branches */}
          <path d="M185 180 C165 170, 140 165, 120 150" />
          <path d="M165 145 C150 135, 135 125, 115 110" />
          <path d="M175 160 C160 150, 145 145, 130 135" />
          <path d="M190 165 C180 145, 170 130, 155 105" />

          {/* Right branches */}
          <path d="M215 180 C235 170, 260 165, 280 150" />
          <path d="M235 145 C250 135, 265 125, 285 110" />
          <path d="M225 160 C240 150, 255 145, 270 135" />
          <path d="M210 165 C220 145, 230 130, 245 105" />

          {/* Crown top branches */}
          <path d="M195 150 C195 130, 190 115, 185 90" />
          <path d="M205 150 C205 130, 210 115, 215 90" />
        </g>

        {/* Golden & Green Dense Leaf Canopy Clusters */}
        <g fill="url(#goldenCanopy)" opacity="0.88">
          {/* Outer Left */}
          <circle cx="110" cy="140" r="22" />
          <circle cx="125" cy="120" r="26" />
          <circle cx="95" cy="155" r="18" />
          <circle cx="140" cy="100" r="25" />

          {/* Far Outer Left tips */}
          <circle cx="85" cy="145" r="14" fill="#a3e635" opacity="0.8" />
          <circle cx="105" cy="105" r="18" fill="#eab308" opacity="0.85" />

          {/* Top Center Canopy */}
          <circle cx="170" cy="85" r="28" />
          <circle cx="200" cy="75" r="32" />
          <circle cx="230" cy="85" r="28" />
          <circle cx="195" cy="55" r="24" fill="#84cc16" opacity="0.9" />

          {/* Right Canopy */}
          <circle cx="260" cy="100" r="25" />
          <circle cx="275" cy="120" r="26" />
          <circle cx="290" cy="140" r="22" />
          <circle cx="305" cy="155" r="18" />

          {/* Far Outer Right tips */}
          <circle cx="295" cy="105" r="18" fill="#eab308" opacity="0.85" />
          <circle cx="315" cy="145" r="14" fill="#a3e635" opacity="0.8" />

          {/* Center heart cluster */}
          <circle cx="175" cy="125" r="28" fill="#ca8a04" opacity="0.9" />
          <circle cx="200" cy="115" r="32" fill="#ca8a04" opacity="0.9" />
          <circle cx="225" cy="125" r="28" fill="#ca8a04" opacity="0.9" />
        </g>

        {/* Small floating golden stipples / seeds */}
        <g fill="#fef08a" opacity="0.8">
          <circle cx="80" cy="130" r="3" />
          <circle cx="120" cy="80" r="2.5" />
          <circle cx="160" cy="60" r="3" />
          <circle cx="240" cy="60" r="3" />
          <circle cx="280" cy="80" r="2.5" />
          <circle cx="320" cy="130" r="3" />
        </g>
      </svg>
    </div>
  );
};
