"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useWallet } from '@/context/WalletContext';
import { 
  TrendingDown, KeyRound, AlertTriangle, ChevronRight, Gift, 
  Clock, ShieldCheck, ArrowUpRight, BarChart3, Lock 
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell 
} from 'recharts';

export default function Dashboard() {
  const { isConnected, hphBalance, transactions, getSubscriptionStatus } = useWallet();
  const [showAlternativeAlert, setShowAlternativeAlert] = useState(true);

  // Spend chart seed data
  const chartData = [
    { category: 'Music', spend: 119, fill: '#00E5FF' },
    { category: 'Movies', spend: 149, fill: '#FF8042' },
    { category: 'Food Delivery', spend: 299, fill: '#F59E0B' },
    { category: 'Design Tools', spend: 0, fill: '#a855f7' },
    { category: 'Education', spend: 0, fill: '#10b981' }
  ];

  // Get unique subscriptions by latest transaction
  const uniqueSubscriptions = React.useMemo(() => {
    const map = new Map<string, typeof transactions[0]>();
    [...transactions].reverse().forEach(tx => {
      map.set(tx.planId, tx);
    });
    return Array.from(map.values());
  }, [transactions]);

  return (
    <div className="space-y-8">
      {/* 1. Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            User <span className="text-teal">Dashboard</span>
          </h1>
          <p className="text-gray-400 text-xs md:text-sm">Manage active subscriptions, view optimization alerts, and check blockchain rewards.</p>
        </div>

        <div className="bg-slate-900 border border-border p-3 rounded-xl flex items-center space-x-3">
          <Clock className="w-5 h-5 text-teal" />
          <div className="text-left">
            <span className="text-[9px] text-gray-500 uppercase block font-bold">NEXT MINT BONUS</span>
            <span className="text-xs font-bold text-white">Earn +10 HPH on next renew</span>
          </div>
        </div>
      </div>

      {/* 2. CHEAPER ALTERNATIVE ALERTS */}
      {showAlternativeAlert && (
        <div className="bg-amber-950/20 border border-gold/30 rounded-2xl p-5 relative overflow-hidden flex flex-col md:flex-row items-start justify-between gap-4 animate-pulse-glow">
          <div className="absolute right-0 top-0 w-48 h-48 bg-gold/5 blur-[60px] -z-10"></div>
          
          <div className="flex items-start space-x-3.5">
            <div className="bg-gold/10 p-2.5 rounded-xl border border-gold/20 mt-0.5">
              <AlertTriangle className="w-5 h-5 text-gold text-amber-500" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-white">Optimization Alert: Spotify Student Loophole</h3>
              <p className="text-xs text-gray-400 max-w-xl">
                We detected that you pay the standard ₹119/mo rate for Spotify Individual. However, you qualify for the <span className="text-gold font-bold">Spotify Student Hidden Deal (₹59/mo)</span> which is hidden 3 pages deep in settings.
              </p>
              <span className="text-[10px] text-teal font-extrabold block">Estimate savings: Save ₹60/mo (50% off)</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 self-end md:self-center">
            <button 
              onClick={() => setShowAlternativeAlert(false)}
              className="text-xs text-gray-400 font-bold hover:text-white"
            >
              Dismiss
            </button>
            <Link 
              href="/app/spotify"
              className="bg-gold text-slate-950 px-4 py-2 rounded-xl text-xs font-black hover:brightness-110 flex items-center gap-1 active:scale-95"
            >
              <span>Unlock ₹59 Deal</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* 3. Spend Chart and Token Balance Row */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Token Balance Indicator */}
        <div className="glass-card rounded-2xl p-6 border border-border flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest block">Wallet Asset Tracker</span>
            <div className="flex items-center space-x-2">
              <span className="text-4xl bg-slate-850 p-2 rounded-xl border border-border flex items-center justify-center">🎁</span>
              <div>
                <h3 className="text-2xl font-black text-white">{hphBalance} HPH</h3>
                <span className="text-[10px] text-teal font-bold tracking-widest uppercase">Verified Polygon Contract</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-border p-3.5 rounded-xl space-y-1.5 text-xs text-gray-400">
            <div className="flex justify-between font-bold">
              <span>Account Status:</span>
              <span className="text-teal">Level 2 Investor</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Smart registry proofs:</span>
              <span className="text-white">{transactions.length} recorded</span>
            </div>
          </div>

          <Link
            href="/wallet"
            className="w-full text-center py-2.5 bg-slate-850 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1 border border-border"
          >
            <span>View Blockchain History</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
          </Link>
        </div>

        {/* Spend Chart */}
        <div className="md:col-span-2 glass-card rounded-2xl p-6 border border-border space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest block">Category spend analytics</span>
              <h3 className="text-base font-bold text-white">Monthly Category Spend Breakdown</h3>
            </div>
            <span className="text-xs text-teal font-extrabold bg-teal/10 px-2 py-0.5 rounded border border-teal/10">₹567/mo total</span>
          </div>

          {/* Graph view using Recharts bar chart */}
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="category" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.03)' }} contentStyle={{ backgroundColor: '#111726', borderColor: '#1e293b' }} />
                <Bar dataKey="spend" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. Active Subscriptions & Loophole Tracker */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Active Optimized Subscriptions</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          {uniqueSubscriptions.map((sub) => {
            const status = getSubscriptionStatus(sub.planId);
            // Determine a matching logo based on planId or name
            let logo = "❤️";
            if (sub.planId.includes("spotify")) logo = "🟢";
            else if (sub.planId.includes("yt") || sub.planId.includes("youtube") || sub.planId.includes("ytm")) logo = "📺";
            else if (sub.planId.includes("prime") || sub.planId.includes("amazon")) logo = "📦";
            
            return (
              <div 
                key={sub.planId} 
                className={`glass-card rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                  status.isActive 
                    ? "border-sky-500/10 hover:border-sky-500/25" 
                    : "border-red-500/10 hover:border-red-500/25 bg-red-950/5"
                }`}
              >
                <div className="space-y-3.5">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl bg-slate-850 p-2 rounded-xl border border-border">{logo}</span>
                      <div>
                        <h4 className="font-extrabold text-white text-sm leading-tight">{sub.planName}</h4>
                        <span className="text-[10px] text-gray-500 font-bold uppercase">Optimized Tier</span>
                      </div>
                    </div>
                    {status.isActive ? (
                      <span className="bg-sky-500/10 text-sky-400 text-[8px] font-black px-1.5 py-0.5 rounded border border-sky-500/15 uppercase tracking-wider flex items-center gap-0.5 shadow-sky-glow">
                        <ShieldCheck className="w-2.5 h-2.5 text-sky-400" /> ACTIVE
                      </span>
                    ) : (
                      <span className="bg-red-500/10 text-red-400 text-[8px] font-black px-1.5 py-0.5 rounded border border-red-500/15 uppercase tracking-wider flex items-center gap-0.5 animate-pulse">
                        <AlertTriangle className="w-2.5 h-2.5 text-red-400" /> EXPIRED
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Monthly spend:</span>
                    <span className="text-white font-extrabold">₹{sub.amount}/mo</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-border flex items-center justify-between">
                  <span className="text-[10px] text-gray-500">
                    {status.isActive 
                      ? `Expires: ${status.expiryDate} (${status.daysRemaining}d left)`
                      : `Expired: ${status.expiryDate}`
                    }
                  </span>
                  {status.isActive ? (
                    <span className="text-[10px] text-sky-400 font-bold">Secured</span>
                  ) : (
                    <Link 
                      href={`/checkout?plan=${sub.planId}`} 
                      className="text-[10px] text-teal font-extrabold hover:underline flex items-center gap-0.5 animate-pulse-glow"
                    >
                      Reboot Payment <ChevronRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}

          {uniqueSubscriptions.length === 0 && (
            <div className="col-span-3 text-center py-12 bg-slate-900/40 rounded-2xl border border-dashed border-border">
              <p className="text-sm text-gray-400">No optimized subscriptions found yet. Use the Finder to unlock secret deals!</p>
              <Link href="/finder" className="mt-3 inline-flex items-center text-xs font-bold text-teal hover:underline">
                Go to Subscription Finder <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
