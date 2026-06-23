"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useWallet } from '@/context/WalletContext';
import { Wallet, ShieldCheck, Flame, Gift, Unlock } from 'lucide-react';

const DID_YOU_KNOW = [
  "JioSaavn has a completely free tier — no credit card needed",
  "Spotify charges students 50% less — but hides it 3 pages deep",
  "Zomato Gold is 60% cheaper with HDFC bank offers",
  "Apple TV+ is only ₹99/mo — cheaper than one movie ticket",
  "Adobe CC is 60% off for students — most never find the page",
  "Figma is 100% free for anyone with a school email!"
];

export default function Header() {
  const { isConnected, walletAddress, hphBalance, connectWallet } = useWallet();
  const [dykIndex, setDykIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDykIndex((prev) => (prev + 1) % DID_YOU_KNOW.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-border bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
      {/* Top Banner (rotating did you know) */}
      <div className="bg-gradient-to-r from-gold/20 via-teal-900/30 to-slate-900 border-b border-gold/10 py-2 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2 text-xs md:text-sm font-medium tracking-wide">
          <Flame className="w-4 h-4 text-gold animate-pulse text-amber-500" />
          <span className="text-gray-400">💡 Did You Know?</span>
          <span className="text-white transition-opacity duration-500 ease-in-out">
            "{DID_YOU_KNOW[dykIndex]}"
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand with Unlock Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="bg-purple-900/35 p-1.5 rounded-xl border border-purple-500/30 group-hover:border-purple-400/60 transition-all shadow-purple-glow flex items-center justify-center">
            <Unlock className="w-4 h-4 text-purple-300 group-hover:rotate-12 transition-transform" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5">
              <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-400 bg-clip-text text-transparent tracking-tight leading-none">
                HIDDEN PLANS
              </span>
              <span className="bg-purple-500/20 text-purple-300 border border-purple-500/35 font-bold px-1.5 py-0.5 rounded text-[9px] tracking-widest uppercase leading-none">
                Hub
              </span>
            </div>
          </div>
        </Link>

        {/* Web3 status & MetaMask info */}
        <div className="flex items-center space-x-3">
          {isConnected ? (
            <div className="flex items-center space-x-3 bg-slate-850 px-3 py-1.5 rounded-full border border-border">
              {/* Token Counter */}
              <div className="flex items-center space-x-1.5 pr-2.5 border-r border-border">
                <Gift className="w-4 h-4 text-sky-400 animate-pulse" />
                <span className="text-sm font-bold text-white">{hphBalance}</span>
                <span className="text-[10px] text-gray-400 font-medium">HPH</span>
              </div>
              {/* Address indicator */}
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-teal" />
                <span className="text-xs text-gray-300 font-mono">
                  {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : ""}
                </span>
              </div>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-slate-950 px-5 py-2 rounded-full font-bold text-xs md:text-sm shadow-sky-glow transition-all active:scale-95 border border-sky-400/25"
            >
              <Wallet className="w-4 h-4 text-slate-950" />
              <span>Connect Wallet</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
