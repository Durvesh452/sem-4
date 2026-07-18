"use client";

import React from 'react';
import Link from 'next/link';
import { useWallet } from '@/context/WalletContext';
import {
  Wallet, ShieldCheck, Gift, History, ExternalLink,
  CheckCircle2, AlertCircle, Sparkles, Coins, Zap
} from 'lucide-react';

export default function WalletPage() {
  const { isConnected, walletAddress, hphBalance, transactions, connectWallet, disconnectWallet } = useWallet();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          HPH Reward <span style={{ color: '#38BDF8' }}>Wallet</span>
        </h1>
        <p className="text-sm md:text-base" style={{ color: '#64748B' }}>
          Manage your Stellar Soroban Freighter wallet and view on-chain transaction history.
        </p>
      </div>

      {/* Wallet Cards */}
      <div className="grid md:grid-cols-3 gap-5">
        {/* Token Balance Card */}
        <div
          className="glass-card rounded-3xl p-6 flex flex-col justify-between space-y-5"
          style={{ border: '1px solid rgba(30,42,69,0.7)' }}
        >
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest block" style={{ color: '#475569' }}>Token Balance</span>
            <div className="flex items-center gap-3 mt-3">
              <div
                className="p-2.5 rounded-2xl"
                style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}
              >
                <Coins className="w-7 h-7" style={{ color: '#FCD34D' }} />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">{hphBalance}</span>
                  <span className="text-sm font-bold" style={{ color: '#64748B' }}>HPH</span>
                </div>
                <span className="text-[10px] font-extrabold" style={{ color: '#2DD4BF' }}>
                  ≈ ${(hphBalance * 0.1).toFixed(2)} USD
                </span>
              </div>
            </div>
          </div>
          <div
            className="p-3 rounded-2xl flex items-center justify-between text-xs"
            style={{ background: 'rgba(10,15,30,0.5)', border: '1px solid rgba(30,42,69,0.5)' }}
          >
            <span style={{ color: '#475569' }}>Mint reward rate:</span>
            <span className="font-bold" style={{ color: '#2DD4BF' }}>10 HPH / purchase</span>
          </div>
        </div>

        {/* Freighter Integration */}
        <div
          className="md:col-span-2 glass-card rounded-3xl p-6 flex flex-col justify-between space-y-5"
          style={{ border: '1px solid rgba(30,42,69,0.7)' }}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#475569' }}>
                Web3 Authorization Gateway
              </span>
              <span
                className="flex items-center gap-1.5 text-[10px] font-bold px-3 py-1 rounded-xl"
                style={{ background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)', color: '#2DD4BF' }}
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Stellar Testnet
              </span>
            </div>

            {isConnected ? (
              <div
                className="p-4 rounded-2xl space-y-3"
                style={{ background: 'rgba(10,15,30,0.5)', border: '1px solid rgba(30,42,69,0.5)' }}
              >
                <div className="flex justify-between text-xs">
                  <span className="font-semibold" style={{ color: '#475569' }}>Connected Wallet:</span>
                  <span className="font-bold text-white font-mono break-all text-right max-w-[200px]">
                    {walletAddress}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="font-semibold" style={{ color: '#475569' }}>Network Speed:</span>
                  <span className="font-bold" style={{ color: '#2DD4BF' }}>Optimal (0.4s)</span>
                </div>
              </div>
            ) : (
              <div
                className="p-6 rounded-2xl text-center space-y-3"
                style={{ background: 'rgba(10,15,30,0.4)', border: '1px dashed rgba(30,42,69,0.6)' }}
              >
                <div className="text-3xl">🚀</div>
                <h4 className="text-sm font-bold text-white">Freighter Wallet Auth Required</h4>
                <p className="text-xs max-w-xs mx-auto" style={{ color: '#475569' }}>
                  Link your Freighter Wallet to automatically record platform purchases on-chain.
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            {isConnected ? (
              <button
                onClick={disconnectWallet}
                className="px-5 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-105"
                style={{
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.2)',
                  color: '#F87171',
                }}
              >
                Disconnect Session
              </button>
            ) : (
              <button
                onClick={connectWallet}
                id="wallet-connect-btn"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-white transition-all hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #2563EB, #14B8A6)',
                  boxShadow: '0 4px 15px rgba(37,99,235,0.3)',
                  border: '1px solid rgba(37,99,235,0.3)',
                }}
              >
                <Wallet className="w-4 h-4" />
                Link Freighter Wallet
              </button>
            )}
          </div>
        </div>
      </div>

      {/* On-chain Transaction Log */}
      <div
        className="glass-card rounded-3xl overflow-hidden"
        style={{ border: '1px solid rgba(30,42,69,0.7)' }}
      >
        <div
          className="p-5 flex justify-between items-center"
          style={{ borderBottom: '1px solid rgba(30,42,69,0.6)', background: 'rgba(10,15,30,0.3)' }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="p-2 rounded-xl"
              style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)' }}
            >
              <History className="w-4 h-4" style={{ color: '#60A5FA' }} />
            </div>
            <h3 className="text-base font-bold text-white">On-Chain Transaction Log</h3>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#475569' }}>
            Stellar Testnet Ledger
          </span>
        </div>

        {transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left premium-table">
              <thead>
                <tr>
                  <th>Tx Hash</th>
                  <th>Plan Description</th>
                  <th className="text-center">Status</th>
                  <th className="text-right">HPH Minted</th>
                  <th className="text-center">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, idx) => (
                  <tr key={idx}>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 font-mono text-xs font-bold" style={{ color: '#38BDF8' }}>
                        <span>{tx.hash}</span>
                        <ExternalLink className="w-3 h-3 opacity-40 hover:opacity-100 cursor-pointer" />
                      </div>
                    </td>
                    <td className="p-4 text-sm font-semibold text-white">{tx.planName}</td>
                    <td className="p-4">
                      <span
                        className="mx-auto flex items-center justify-center gap-1 text-[9px] font-bold px-2.5 py-1 rounded-xl w-max"
                        style={{ background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)', color: '#2DD4BF' }}
                      >
                        <CheckCircle2 className="w-3 h-3" /> Success
                      </span>
                    </td>
                    <td className="p-4 text-right font-extrabold text-white">+{tx.tokensMinted} HPH</td>
                    <td className="p-4 text-center text-xs" style={{ color: '#475569' }}>{tx.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 space-y-3">
            <AlertCircle className="w-10 h-10 mx-auto" style={{ color: '#334155' }} />
            <h4 className="text-sm font-bold text-white">No Transactions Yet</h4>
            <p className="text-xs max-w-sm mx-auto" style={{ color: '#475569' }}>
              Once you verify and complete an optimized purchase, smart contract records will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
