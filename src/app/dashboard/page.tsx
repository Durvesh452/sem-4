"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useWallet } from '@/context/WalletContext';
import {
  TrendingDown, KeyRound, AlertTriangle, ChevronRight, Gift,
  Clock, ShieldCheck, ArrowUpRight, BarChart3, Lock, Sparkles, Bell
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from 'recharts';
import BrandLogo from '@/components/BrandLogo';

const chartData = [
  { category: 'Music',     spend: 119, fill: '#2DD4BF' },
  { category: 'Streaming', spend: 149, fill: '#60A5FA' },
  { category: 'Food',      spend: 299, fill: '#FCD34D' },
  { category: 'Design',    spend: 0,   fill: '#C084FC' },
  { category: 'Education', spend: 0,   fill: '#4ADE80' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="px-4 py-2.5 rounded-xl text-sm"
        style={{
          background: 'rgba(12,18,40,0.97)',
          border: '1px solid rgba(37,99,235,0.25)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }}
      >
        <p className="font-bold text-white">{label}</p>
        <p style={{ color: '#2DD4BF' }}>₹{payload[0].value}/mo</p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const { isConnected, hphBalance, transactions, getSubscriptionStatus } = useWallet();
  const [showAlert, setShowAlert] = useState(true);

  const uniqueSubscriptions = React.useMemo(() => {
    const map = new Map<string, typeof transactions[0]>();
    [...transactions].reverse().forEach(tx => map.set(tx.planId, tx));
    return Array.from(map.values());
  }, [transactions]);

  return (
    <div className="space-y-8 animate-fade-in">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            My <span style={{ color: '#38BDF8' }}>Dashboard</span>
          </h1>
          <p className="text-sm md:text-base mt-1" style={{ color: '#64748B' }}>
            Manage subscriptions, view analytics, and track blockchain rewards.
          </p>
        </div>
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{ background: 'rgba(15,22,41,0.6)', border: '1px solid rgba(30,42,69,0.7)' }}
        >
          <div className="p-2 rounded-xl" style={{ background: 'rgba(20,184,166,0.1)' }}>
            <Clock className="w-4 h-4" style={{ color: '#14B8A6' }} />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest block" style={{ color: '#475569' }}>NEXT MINT BONUS</span>
            <span className="text-sm font-bold text-white">Earn +10 HPH on next renewal</span>
          </div>
        </div>
      </div>

      {/* Optimization Alert */}
      {showAlert && (
        <div
          className="relative rounded-3xl p-5 md:p-6 flex flex-col md:flex-row items-start justify-between gap-5 overflow-hidden animate-slide-up"
          style={{
            background: 'linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(15,22,41,0.9) 100%)',
            border: '1px solid rgba(245,158,11,0.2)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <div
            className="absolute right-0 top-0 w-48 h-48 pointer-events-none -z-10"
            style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)' }}
          />
          <div className="flex items-start gap-4">
            <div
              className="p-2.5 rounded-xl flex-shrink-0"
              style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.2)' }}
            >
              <AlertTriangle className="w-5 h-5" style={{ color: '#FCD34D' }} />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-extrabold text-white">Optimization Alert: Spotify Student Loophole</h3>
              <p className="text-xs leading-relaxed max-w-xl" style={{ color: '#64748B' }}>
                You're paying the standard ₹119/mo for Spotify Individual. You qualify for the{' '}
                <span className="font-bold" style={{ color: '#FCD34D' }}>Spotify Student Hidden Deal (₹59/mo)</span>{' '}
                — hidden 3 pages deep in settings.
              </p>
              <span className="text-[11px] font-extrabold block" style={{ color: '#2DD4BF' }}>
                💰 Estimated savings: ₹60/mo (50% off)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 self-end md:self-center flex-shrink-0">
            <button
              onClick={() => setShowAlert(false)}
              className="text-xs font-bold transition-colors hover:text-white"
              style={{ color: '#475569' }}
            >
              Dismiss
            </button>
            <Link
              href="/app/spotify"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold transition-all hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                color: '#1A0A00',
                boxShadow: '0 4px 12px rgba(245,158,11,0.3)',
              }}
            >
              Unlock ₹59 Deal
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Token Balance + Chart */}
      <div className="grid md:grid-cols-3 gap-5">
        {/* Token Balance */}
        <div
          className="glass-card rounded-3xl p-6 flex flex-col justify-between space-y-5"
          style={{ border: '1px solid rgba(30,42,69,0.7)' }}
        >
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest block" style={{ color: '#475569' }}>Wallet Asset Tracker</span>
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}
              >
                🎁
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">{hphBalance} HPH</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#2DD4BF' }}>
                  Stellar Soroban Contract
                </span>
              </div>
            </div>
          </div>

          <div
            className="p-4 rounded-2xl space-y-2"
            style={{ background: 'rgba(10,15,30,0.5)', border: '1px solid rgba(30,42,69,0.5)' }}
          >
            <div className="flex justify-between text-xs font-semibold">
              <span style={{ color: '#475569' }}>Account Status:</span>
              <span style={{ color: '#2DD4BF' }}>Level 2 Investor</span>
            </div>
            <div className="flex justify-between text-xs font-semibold">
              <span style={{ color: '#475569' }}>On-chain records:</span>
              <span className="text-white">{transactions.length} recorded</span>
            </div>
          </div>

          <Link
            href="/wallet"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold transition-all hover:scale-105"
            style={{
              background: 'rgba(37,99,235,0.1)',
              border: '1px solid rgba(37,99,235,0.2)',
              color: '#60A5FA',
            }}
          >
            View Blockchain History
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Spend Chart */}
        <div
          className="md:col-span-2 glass-card rounded-3xl p-6 flex flex-col space-y-4"
          style={{ border: '1px solid rgba(30,42,69,0.7)' }}
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest block" style={{ color: '#475569' }}>Category Spend Analytics</span>
              <h3 className="text-base font-bold text-white mt-0.5">Monthly Spend Breakdown</h3>
            </div>
            <span
              className="text-xs font-extrabold px-3 py-1.5 rounded-xl"
              style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)', color: '#60A5FA' }}
            >
              ₹567/mo total
            </span>
          </div>

          <div className="flex-grow h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <XAxis dataKey="category" stroke="#334155" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#334155" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(37,99,235,0.05)' }} />
                <Bar dataKey="spend" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} fillOpacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Active Subscriptions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Active Optimized Subscriptions</h3>
          {uniqueSubscriptions.length > 0 && (
            <span className="badge-sky">{uniqueSubscriptions.length} plans</span>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {uniqueSubscriptions.map((sub) => {
            const status = getSubscriptionStatus(sub.planId);
            let logoId = "music";
            if (sub.planId.includes("spotify")) logoId = "spotify";
            else if (sub.planId.includes("yt") || sub.planId.includes("youtube") || sub.planId.includes("ytm")) logoId = "youtube-music";
            else if (sub.planId.includes("prime") || sub.planId.includes("amazon")) logoId = "prime-video";
            else if (sub.planId.includes("netflix")) logoId = "netflix";
            else if (sub.planId.includes("apple-music") || sub.planId.includes("am-")) logoId = "apple-music";
            else if (sub.planId.includes("apple-tv") || sub.planId.includes("appletv")) logoId = "apple-tv";
            else if (sub.planId.includes("zee5")) logoId = "zee5";
            else if (sub.planId.includes("sonyliv")) logoId = "sonyliv";
            else if (sub.planId.includes("hotstar")) logoId = "disney-hotstar";
            else if (sub.planId.includes("swiggy")) logoId = "swiggy-one";
            else if (sub.planId.includes("zomato")) logoId = "zomato-gold";
            else if (sub.planId.includes("blinkit")) logoId = "blinkit-pass";
            else if (sub.planId.includes("adobe")) logoId = "adobe-cc";
            else if (sub.planId.includes("figma")) logoId = "figma";
            else if (sub.planId.includes("github")) logoId = "github";
            else if (sub.planId.includes("linkedin")) logoId = "linkedin-learning";

            return (
              <div
                key={sub.planId}
                className="glass-card rounded-3xl p-5 flex flex-col justify-between"
                style={{
                  border: status.isActive
                    ? '1px solid rgba(14,165,233,0.15)'
                    : '1px solid rgba(239,68,68,0.12)',
                  background: !status.isActive ? 'rgba(239,68,68,0.02)' : undefined,
                }}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <BrandLogo id={logoId} className="!w-9 !h-9" />
                      <div>
                        <h4 className="font-extrabold text-white text-sm leading-tight">{sub.planName}</h4>
                        <span className="text-[10px] font-bold uppercase" style={{ color: '#475569' }}>Optimized Tier</span>
                      </div>
                    </div>
                    {status.isActive ? (
                      <span
                        className="flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-xl uppercase"
                        style={{ background: 'rgba(14,165,233,0.12)', border: '1px solid rgba(14,165,233,0.2)', color: '#38BDF8' }}
                      >
                        <ShieldCheck className="w-2.5 h-2.5" /> ACTIVE
                      </span>
                    ) : (
                      <span
                        className="flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-xl uppercase animate-pulse"
                        style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.2)', color: '#F87171' }}
                      >
                        <AlertTriangle className="w-2.5 h-2.5" /> EXPIRED
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span style={{ color: '#475569' }}>Monthly spend:</span>
                    <span className="text-white font-extrabold">₹{sub.amount}/mo</span>
                  </div>
                </div>

                <div
                  className="pt-4 mt-4 flex items-center justify-between"
                  style={{ borderTop: '1px solid rgba(30,42,69,0.5)' }}
                >
                  <span className="text-[10px]" style={{ color: '#475569' }}>
                    {status.isActive
                      ? `Expires: ${status.expiryDate} (${status.daysRemaining}d)`
                      : `Expired: ${status.expiryDate}`}
                  </span>
                  {status.isActive ? (
                    <span className="text-[10px] font-bold" style={{ color: '#38BDF8' }}>Secured</span>
                  ) : (
                    <Link
                      href={`/checkout?plan=${sub.planId}`}
                      className="text-[10px] font-extrabold flex items-center gap-0.5 hover:underline"
                      style={{ color: '#2DD4BF' }}
                    >
                      Renew <ChevronRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}

          {uniqueSubscriptions.length === 0 && (
            <div
              className="col-span-3 text-center py-16 rounded-3xl space-y-3"
              style={{
                background: 'rgba(15,22,41,0.4)',
                border: '1px dashed rgba(30,42,69,0.6)',
              }}
            >
              <div className="text-4xl">📭</div>
              <p className="text-sm" style={{ color: '#475569' }}>
                No optimized subscriptions found yet. Use the Finder to unlock secret deals!
              </p>
              <Link
                href="/finder"
                className="inline-flex items-center gap-2 text-sm font-bold hover:underline"
                style={{ color: '#60A5FA' }}
              >
                Go to Subscription Finder <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
