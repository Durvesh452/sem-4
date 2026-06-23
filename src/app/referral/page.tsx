"use client";

import React, { useState } from 'react';
import { 
  Share2, Copy, Check, Users, Gift, Crown, 
  ArrowUpRight, Globe, ShieldAlert 
} from 'lucide-react';

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://hiddenplanshub.io/join?ref=user_01satoshi";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Seed leaderboard data
  const leaderboard = [
    { rank: 1, name: "durvesh_web3", referrals: 142, reward: 3550 },
    { rank: 2, name: "satoshi_hph", referrals: 89, reward: 2225 },
    { rank: 3, name: "0xcryptodev", referrals: 54, reward: 1350 },
    { rank: 4, name: "amoy_expert", referrals: 31, reward: 775 },
    { rank: 5, name: "discount_hunter", referrals: 18, reward: 450 }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 1. Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight">
          Partner <span className="text-teal">Referrals</span>
        </h1>
        <p className="text-gray-400 text-xs md:text-sm">Invite colleagues, friends, or family members and claim direct Solidity smart contract HPH bonuses.</p>
      </div>

      {/* 2. Promo / Link Generator Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Referral Program Info */}
        <div className="glass-card rounded-2xl p-6 border border-border flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block">Bonus Rate</span>
            <div className="flex items-center space-x-2">
              <Gift className="w-8 h-8 text-teal" />
              <div>
                <span className="text-3xl font-black text-white">25 HPH</span>
                <span className="text-xs text-gray-400 block font-bold">Per Referral</span>
              </div>
            </div>
            <p className="text-[10.5px] text-gray-400 leading-normal pt-1.5">
              When someone registers using your exclusive partner link and connects their MetaMask wallet, our Polygon smart contract automatically triggers a direct transfer of 25 HPH to your account.
            </p>
          </div>

          <div className="bg-slate-900 border border-border p-3 rounded-xl text-[10px] text-teal font-extrabold text-center uppercase tracking-wide">
            🏆 Solid Smart Contract Secured
          </div>
        </div>

        {/* Link Generator */}
        <div className="md:col-span-2 glass-card rounded-2xl p-6 border border-border space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Your Partner Gateway Link</span>
              <span className="text-[9px] text-teal font-bold bg-teal/10 px-2 py-0.5 rounded border border-teal/10 uppercase">active</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-900 border border-border p-2.5 rounded-xl">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="bg-transparent border-none text-xs text-gray-300 font-mono focus:outline-none flex-grow"
              />
              <button
                onClick={handleCopyLink}
                className={`p-2 rounded-lg transition-all active:scale-95 flex items-center justify-center ${
                  copied 
                    ? "bg-teal text-slate-950" 
                    : "bg-slate-800 text-gray-400 hover:text-white"
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-gray-500 italic">Share this link directly on Twitter, Discord, WhatsApp or Telegram to scale your network payout.</p>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-border">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-teal" />
              <span>Total referrals: <strong className="text-white font-extrabold">12 members</strong></span>
            </div>
            <span className="text-teal font-bold">Earned 300 HPH total</span>
          </div>
        </div>
      </div>

      {/* 3. Leaderboard List */}
      <div className="glass-card rounded-2xl border border-border overflow-hidden">
        <div className="border-b border-border bg-slate-900/40 p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Crown className="w-5 h-5 text-gold" />
            <h3 className="text-base font-bold text-white">Top Referrer Leaderboard</h3>
          </div>
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Updates Live</span>
        </div>

        <div className="divide-y divide-border/60">
          {leaderboard.map((user) => (
            <div key={user.rank} className="flex justify-between items-center p-4 hover:bg-slate-900/30 transition-colors">
              <div className="flex items-center space-x-4">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                  user.rank === 1 ? "bg-gold text-slate-950" : 
                  user.rank === 2 ? "bg-slate-300 text-slate-900" :
                  user.rank === 3 ? "bg-amber-600 text-white" :
                  "bg-slate-850 text-gray-400 border border-border"
                }`}>
                  {user.rank}
                </span>
                <div>
                  <span className="text-xs font-bold text-white block">{user.name}</span>
                  <span className="text-[10px] text-gray-500">{user.referrals} successful signups</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-black text-teal block">+{user.reward} HPH</span>
                <span className="text-[9px] text-gray-500 uppercase font-black">CLAIMED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
