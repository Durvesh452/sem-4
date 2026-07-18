"use client";

import React, { useState } from 'react';
import {
  Share2, Copy, Check, Users, Gift, Crown,
  ArrowUpRight, Trophy, Zap
} from 'lucide-react';

const leaderboard = [
  { rank: 1, name: "durvesh_web3",    referrals: 142, reward: 3550 },
  { rank: 2, name: "satoshi_hph",     referrals: 89,  reward: 2225 },
  { rank: 3, name: "0xcryptodev",     referrals: 54,  reward: 1350 },
  { rank: 4, name: "stellar_expert",  referrals: 31,  reward: 775 },
  { rank: 5, name: "discount_hunter", referrals: 18,  reward: 450 },
];

const rankStyle = (rank: number) => {
  if (rank === 1) return { background: 'linear-gradient(135deg, #F59E0B, #D97706)', color: '#1A0A00' };
  if (rank === 2) return { background: 'linear-gradient(135deg, #CBD5E1, #94A3B8)', color: '#0F172A' };
  if (rank === 3) return { background: 'linear-gradient(135deg, #D97706, #B45309)', color: '#ffffff' };
  return { background: 'rgba(30,42,69,0.6)', color: '#64748B', border: '1px solid rgba(30,42,69,0.8)' };
};

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://hiddenplanshub.io/join?ref=user_01satoshi";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          Partner <span style={{ color: '#38BDF8' }}>Referrals</span>
        </h1>
        <p className="text-sm md:text-base" style={{ color: '#64748B' }}>
          Invite friends and claim HPH tokens automatically via Stellar Soroban smart contracts.
        </p>
      </div>

      {/* Referral Cards */}
      <div className="grid md:grid-cols-3 gap-5">
        {/* Bonus Rate Card */}
        <div
          className="glass-card rounded-3xl p-6 flex flex-col justify-between space-y-5"
          style={{ border: '1px solid rgba(20,184,166,0.15)' }}
        >
          <div className="space-y-3">
            <span className="text-[10px] font-black uppercase tracking-widest block" style={{ color: '#475569' }}>Bonus Rate</span>
            <div className="flex items-center gap-3">
              <div
                className="p-2.5 rounded-2xl"
                style={{ background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)' }}
              >
                <Gift className="w-7 h-7" style={{ color: '#2DD4BF' }} />
              </div>
              <div>
                <span className="text-3xl font-black text-white">25 HPH</span>
                <span className="block text-xs font-bold mt-0.5" style={{ color: '#64748B' }}>Per Referral</span>
              </div>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>
              When someone registers via your link and connects their Freighter wallet, our Stellar
              Soroban contract automatically transfers 25 HPH to your account.
            </p>
          </div>
          <div
            className="p-3 rounded-2xl text-xs font-extrabold text-center"
            style={{ background: 'rgba(20,184,166,0.08)', border: '1px solid rgba(20,184,166,0.2)', color: '#2DD4BF' }}
          >
            🏆 Stellar Soroban Smart Contract Secured
          </div>
        </div>

        {/* Link Generator */}
        <div
          className="md:col-span-2 glass-card rounded-3xl p-6 flex flex-col justify-between space-y-5"
          style={{ border: '1px solid rgba(30,42,69,0.7)' }}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#475569' }}>Your Partner Gateway Link</span>
              <span
                className="text-[9px] font-bold px-2.5 py-1 rounded-xl uppercase"
                style={{ background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)', color: '#2DD4BF' }}
              >
                Active
              </span>
            </div>

            {/* Referral Link Input */}
            <div
              className="flex items-center gap-2 p-3 rounded-2xl"
              style={{ background: 'rgba(10,15,30,0.5)', border: '1px solid rgba(30,42,69,0.6)' }}
            >
              <input
                type="text"
                readOnly
                value={referralLink}
                id="referral-link-input"
                className="bg-transparent border-none text-xs font-mono focus:outline-none flex-grow min-w-0"
                style={{ color: '#94A3B8' }}
              />
              <button
                onClick={handleCopyLink}
                id="copy-referral-btn"
                className="p-2.5 rounded-xl flex items-center justify-center flex-shrink-0 transition-all active:scale-95"
                style={{
                  background: copied ? 'rgba(20,184,166,0.2)' : 'rgba(37,99,235,0.15)',
                  border: copied ? '1px solid rgba(20,184,166,0.4)' : '1px solid rgba(37,99,235,0.3)',
                  color: copied ? '#2DD4BF' : '#60A5FA',
                }}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copied && (
              <p className="text-xs font-semibold" style={{ color: '#2DD4BF' }}>✓ Copied to clipboard!</p>
            )}
            <p className="text-xs italic" style={{ color: '#475569' }}>
              Share on Twitter, Discord, WhatsApp, or Telegram to grow your network.
            </p>
          </div>

          <div
            className="flex items-center justify-between text-xs pt-4"
            style={{ borderTop: '1px solid rgba(30,42,69,0.5)' }}
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" style={{ color: '#2DD4BF' }} />
              <span style={{ color: '#64748B' }}>Total referrals: <strong className="text-white">12 members</strong></span>
            </div>
            <span className="font-bold" style={{ color: '#2DD4BF' }}>Earned 300 HPH</span>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div
        className="glass-card rounded-3xl overflow-hidden"
        style={{ border: '1px solid rgba(30,42,69,0.7)' }}
      >
        <div
          className="p-5 flex items-center justify-between"
          style={{ borderBottom: '1px solid rgba(30,42,69,0.6)', background: 'rgba(10,15,30,0.3)' }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="p-2 rounded-xl"
              style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}
            >
              <Trophy className="w-4 h-4" style={{ color: '#FCD34D' }} />
            </div>
            <h3 className="text-base font-bold text-white">Top Referrer Leaderboard</h3>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold" style={{ color: '#475569' }}>
            <Zap className="w-3.5 h-3.5" style={{ color: '#2DD4BF' }} />
            Updates Live
          </div>
        </div>

        <div className="divide-y" style={{ borderColor: 'rgba(30,42,69,0.4)' }}>
          {leaderboard.map((user) => (
            <div
              key={user.rank}
              className="flex justify-between items-center p-4 transition-colors hover:bg-opacity-50"
              style={{
                background: user.rank === 1 ? 'rgba(245,158,11,0.03)' : 'transparent',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(37,99,235,0.04)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = user.rank === 1 ? 'rgba(245,158,11,0.03)' : 'transparent'; }}
            >
              <div className="flex items-center gap-4">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold flex-shrink-0"
                  style={rankStyle(user.rank)}
                >
                  {user.rank}
                </span>
                <div>
                  <span className="text-sm font-bold text-white block">{user.name}</span>
                  <span className="text-xs" style={{ color: '#475569' }}>{user.referrals} successful signups</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-extrabold block" style={{ color: '#2DD4BF' }}>+{user.reward} HPH</span>
                <span className="text-[9px] font-bold uppercase" style={{ color: '#475569' }}>Claimed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
