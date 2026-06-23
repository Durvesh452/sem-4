"use client";

import React from 'react';
import Link from 'next/link';
import { useWallet } from '@/context/WalletContext';
import { 
  Wallet, ShieldCheck, Gift, History, ExternalLink, 
  RefreshCw, CheckCircle2, AlertCircle, Sparkles 
} from 'lucide-react';

export default function WalletPage() {
  const { isConnected, walletAddress, hphBalance, transactions, connectWallet, disconnectWallet } = useWallet();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 1. Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight">
          HPH Reward <span className="text-teal">Wallet</span>
        </h1>
        <p className="text-gray-400 text-xs md:text-sm">Manage standard Polygon Web3 MetaMask authorizations and view minted transaction registries.</p>
      </div>

      {/* 2. Main Wallet Panel */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Card 1: Balance Tracker */}
        <div className="glass-card rounded-2xl p-6 border border-border space-y-4 flex flex-col justify-between">
          <div className="space-y-1.5">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block">Token Balance</span>
            <div className="flex items-center space-x-2">
              <Gift className="w-8 h-8 text-gold text-amber-500" />
              <div>
                <span className="text-3xl font-black text-white">{hphBalance}</span>
                <span className="text-xs text-gray-400 ml-1 font-bold">HPH</span>
              </div>
            </div>
            <span className="text-[10px] text-teal font-extrabold block">≈ ${(hphBalance * 0.1).toFixed(2)} USD value</span>
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-between text-[10px] text-gray-400 font-bold">
            <span>Mint reward rate:</span>
            <span className="text-teal">10 HPH / Purchase</span>
          </div>
        </div>

        {/* Card 2: Metamask Integration Details */}
        <div className="md:col-span-2 glass-card rounded-2xl p-6 border border-border flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Web3 Authorization Gateway</span>
              <span className="flex items-center gap-1 text-[10px] text-teal font-bold bg-teal/10 px-2 py-0.5 rounded border border-teal/10">
                <ShieldCheck className="w-3.5 h-3.5" /> Polygon Amoy
              </span>
            </div>

            {isConnected ? (
              <div className="bg-slate-900 border border-border p-4 rounded-xl space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-500">Connected Wallet:</span>
                  <span className="text-white font-extrabold break-all">{walletAddress}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Network Speed:</span>
                  <span className="text-teal font-extrabold">Optimal (0.4s response)</span>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/60 border border-dashed border-border p-4 rounded-xl text-center space-y-1.5 py-6">
                <span className="text-2xl block">🦊</span>
                <h4 className="text-xs font-bold text-white">MetaMask Auth Required</h4>
                <p className="text-[10px] text-gray-400 max-w-xs mx-auto">Link your Web3 MetaMask client to automatically record platform purchases on-chain.</p>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-2">
            {isConnected ? (
              <button
                onClick={disconnectWallet}
                className="px-4 py-2 bg-slate-900 border border-border hover:border-red-500 text-xs font-bold text-gray-300 hover:text-red-400 rounded-xl"
              >
                Disconnect Session
              </button>
            ) : (
              <button
                onClick={connectWallet}
                className="px-6 py-2.5 bg-gradient-to-r from-gold to-teal text-slate-950 text-xs font-black rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-gold-glow flex items-center gap-1.5"
              >
                <Wallet className="w-4 h-4" />
                <span>Link MetaMask Wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. On-chain History Registry */}
      <div className="glass-card rounded-2xl border border-border overflow-hidden">
        <div className="border-b border-border bg-slate-900/40 p-5 flex justify-between items-center">
          <div className="flex items-center space-x-2.5">
            <History className="w-5 h-5 text-gray-500" />
            <h3 className="text-base font-bold text-white">On-Chain Transaction Log</h3>
          </div>
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Polygon Mainnet Ledger</span>
        </div>

        {transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-slate-900/60 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="p-4">Tx Hash</th>
                  <th className="p-4">Plan Description</th>
                  <th className="p-4 text-center">Reward Status</th>
                  <th className="p-4 text-right">HPH Minted</th>
                  <th className="p-4 text-center">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-xs">
                {transactions.map((tx, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/30 transition-colors">
                    <td className="p-4 font-mono font-bold text-teal flex items-center gap-1">
                      <span>{tx.hash}</span>
                      <ExternalLink className="w-3 h-3 text-teal/40 hover:text-teal cursor-pointer" />
                    </td>
                    <td className="p-4 text-white font-semibold">
                      {tx.planName}
                    </td>
                    <td className="p-4">
                      <span className="mx-auto bg-teal/10 text-teal text-[9px] font-bold px-2 py-0.5 rounded border border-teal/10 flex items-center justify-center gap-1 w-max">
                        <CheckCircle2 className="w-3 h-3 text-teal" /> Success
                      </span>
                    </td>
                    <td className="p-4 text-right font-black text-white">
                      +{tx.tokensMinted} HPH
                    </td>
                    <td className="p-4 text-center text-gray-500">
                      {tx.timestamp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400 space-y-2">
            <AlertCircle className="w-8 h-8 text-gray-600 mx-auto" />
            <h4 className="text-sm font-bold text-white">No Transactions Yet</h4>
            <p className="text-xs text-gray-500">Once you verify and complete an optimized purchase, smart contract registries will display here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
