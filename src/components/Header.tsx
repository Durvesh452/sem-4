"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useWallet } from '@/context/WalletContext';
import { Wallet, ShieldCheck, Coins, ChevronRight, Sparkles } from 'lucide-react';

const DID_YOU_KNOW = [
  "Spotify Student is 50% cheaper — hidden 3 pages deep in settings",
  "JioSaavn has a completely free tier — no credit card ever needed",
  "Zomato Gold is 60% cheaper when bundled with HDFC bank offers",
  "Apple TV+ is only ₹99/mo — less than a single movie ticket",
  "Adobe Creative Cloud is 60% off for students — most never find the page",
  "Figma Pro is 100% free for anyone with a .edu school email address",
];

/* ─────────────────────────────────────────────
   HPH LOGO  — Original magnifying-glass + radar
───────────────────────────────────────────── */
function HPHLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 group select-none" aria-label="Hidden Plans Hub - Home">
      {/* Icon mark */}
      <div className="relative flex-shrink-0">
        <svg
          width={compact ? 32 : 36}
          height={compact ? 32 : 36}
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="hph-bg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#0EA5E9" />
            </linearGradient>
            <linearGradient id="hph-accent" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#14B8A6" />
            </linearGradient>
          </defs>

          {/* Background pill */}
          <rect width="36" height="36" rx="10" fill="url(#hph-bg)" />
          <rect width="36" height="36" rx="10" fill="rgba(255,255,255,0.06)" />

          {/* Magnifying glass circle */}
          <circle cx="15" cy="15" r="7.5" stroke="white" strokeWidth="2" fill="none" strokeOpacity="0.9" />

          {/* Radar arcs inside the glass */}
          <path d="M15 10.5 A4.5 4.5 0 0 1 19.5 15" stroke="url(#hph-accent)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M15 12.5 A2.5 2.5 0 0 1 17.5 15" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeOpacity="0.7" />

          {/* Dot at center of glass */}
          <circle cx="15" cy="15" r="1.5" fill="white" fillOpacity="0.9" />

          {/* Magnifying glass handle */}
          <line x1="21" y1="21" x2="27" y2="27" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.9" />

          {/* Hidden gem dots – small spark accents */}
          <circle cx="27" cy="9" r="1.2" fill="#14B8A6" fillOpacity="0.8" />
          <circle cx="29" cy="13" r="0.8" fill="#38BDF8" fillOpacity="0.6" />
        </svg>
      </div>

      {/* Wordmark */}
      {!compact && (
        <div className="flex flex-col leading-none">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[17px] font-extrabold tracking-tight text-white">
              Hidden Plans
            </span>
            <span
              className="text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md"
              style={{
                background: 'rgba(37,99,235,0.18)',
                color: '#60A5FA',
                border: '1px solid rgba(37,99,235,0.3)',
                letterSpacing: '0.12em',
              }}
            >
              Hub
            </span>
          </div>
          <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: '#38BDF8', letterSpacing: '0.18em', marginTop: 1 }}>
            HPH
          </span>
        </div>
      )}
    </Link>
  );
}

export { HPHLogo };

/* ─────────────────────────────────────────────
   HEADER COMPONENT
───────────────────────────────────────────── */
export default function Header() {
  const { isConnected, walletAddress, hphBalance, connectWallet } = useWallet();
  const [dykIndex, setDykIndex] = useState(0);
  const [bannerVisible, setBannerVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setDykIndex((prev) => (prev + 1) % DID_YOU_KNOW.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Top announcement banner */}
      {bannerVisible && (
        <div
          className="relative overflow-hidden py-2.5 px-4"
          style={{
            background: 'linear-gradient(90deg, rgba(15,22,41,0.98) 0%, rgba(18,28,55,0.98) 50%, rgba(15,22,41,0.98) 100%)',
            borderBottom: '1px solid rgba(37,99,235,0.15)',
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2.5 text-xs">
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#F59E0B' }} />
            <span className="font-medium" style={{ color: '#64748B' }}>💡 Did You Know?</span>
            <span
              className="font-semibold transition-all duration-500"
              style={{ color: '#CBD5E1' }}
              key={dykIndex}
            >
              {DID_YOU_KNOW[dykIndex]}
            </span>
            <button
              onClick={() => setBannerVisible(false)}
              className="ml-3 text-slate-600 hover:text-slate-400 transition-colors flex-shrink-0"
              aria-label="Dismiss banner"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main header bar */}
      <div
        className="border-b"
        style={{
          background: 'rgba(10, 15, 30, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderColor: 'rgba(30, 42, 69, 0.7)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <HPHLogo />

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {isConnected ? (
              <div
                className="flex items-center gap-3 px-3.5 py-2 rounded-2xl"
                style={{
                  background: 'rgba(15, 22, 41, 0.8)',
                  border: '1px solid rgba(30, 42, 69, 0.8)',
                }}
              >
                {/* HPH token balance */}
                <div className="flex items-center gap-1.5 pr-3" style={{ borderRight: '1px solid rgba(30, 42, 69, 0.8)' }}>
                  <Coins className="w-4 h-4" style={{ color: '#F59E0B' }} />
                  <span className="text-sm font-bold text-white">{hphBalance}</span>
                  <span className="text-xs font-semibold" style={{ color: '#64748B' }}>HPH</span>
                </div>

                {/* Connected wallet */}
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" style={{ color: '#14B8A6' }} />
                  <span className="text-xs font-mono" style={{ color: '#94A3B8' }}>
                    {walletAddress ? `${walletAddress.slice(0, 6)}…${walletAddress.slice(-4)}` : ""}
                  </span>
                </div>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                id="connect-wallet-btn"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
                  color: '#ffffff',
                  border: '1px solid rgba(59,130,246,0.3)',
                  boxShadow: '0 4px 15px rgba(37,99,235,0.3)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(37,99,235,0.5)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 15px rgba(37,99,235,0.3)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                }}
              >
                <Wallet className="w-4 h-4" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
