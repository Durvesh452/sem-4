// src/app/checkout/page.tsx
"use client";

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useWallet } from '@/context/WalletContext';
import { APP_SERVICES, Plan } from '@/data/plans';
import {
  CreditCard,
  ShieldCheck,
  Wallet,
  ArrowLeft,
  Gift,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Loader2,
  Link2,
  AlertTriangle,
  KeyRound,
} from 'lucide-react';

function CheckoutFlow() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isConnected, walletAddress, connectWallet, recordPurchase, getSubscriptionStatus } = useWallet();

  const planId = searchParams.get('plan');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'razorpay' | 'crypto'>('stripe');
  const [txHash, setTxHash] = useState<string | null>(null);
  const [services, setServices] = useState<any[]>(APP_SERVICES);

  // UPI specific states (used only when paymentMethod === 'razorpay')
  const [vpa, setVpa] = useState('');
  const [vpaError, setVpaError] = useState('');

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        }
      })
      .catch((err) => console.error('MongoDB fetch error, using local fallback:', err));
  }, []);

  // Check subscription status to avoid duplicate payments
  const subStatus = useMemo(() => {
    if (!planId) return { isActive: false, expiryDate: null, daysRemaining: 0 };
    return getSubscriptionStatus(planId);
  }, [planId, getSubscriptionStatus]);

  // Find the chosen plan from services
  const planInfo = useMemo(() => {
    if (!planId) return null;
    for (const app of services) {
      const plan = app.plans.find((p: any) => p.id === planId);
      if (plan) {
        return { ...plan, appName: app.name, appLogo: app.logo, category: app.category };
      }
    }
    return null;
  }, [planId, services]);

  // Fallback static plan
  const activePlan = planInfo || {
    id: 'spotify-student',
    name: 'Spotify Student Premium',
    priceMonthly: 59,
    originalPriceMonthly: 119,
    appName: 'Spotify',
    appLogo: '🟢',
    isHidden: true,
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // If user selected Razorpay/UPI, open the UPI app with a deep link
    if (paymentMethod === 'razorpay') {
      if (!vpa) {
        setVpaError('Enter a valid UPI ID (e.g., abc@upi)');
        return;
      }
      // Construct UPI payment URL
      const upiUrl = `upi://pay?pa=${encodeURIComponent(vpa)}&pn=HiddenPlansHub&tn=${encodeURIComponent(
        `${activePlan.appName} - ${activePlan.name}`
      )}&am=${activePlan.priceMonthly}&cu=INR`;
      // Redirect to the UPI intent URL – the user's device will open the UPI app
      window.location.href = upiUrl;
      return;
    }

    // For Stripe (credit/debit) or Crypto, simulate processing then record on-chain
    setLoading(true);
    // Simulated processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      const hash = await recordPurchase(activePlan.id, activePlan.name, activePlan.priceMonthly);
      setTxHash(hash);
      setSuccess(true);
    } catch (err) {
      console.error('Smart contract integration failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2 text-center">
        <Link href="/finder" className="inline-flex items-center text-xs font-bold text-gray-400 hover:text-white space-x-1 mb-2">
          <ArrowLeft className="w-3 h-3" />
          <span>Back to Finder</span>
        </Link>
        <h1 className="text-3xl font-black">
          Secured <span className="text-teal">Subscription Portal</span>
        </h1>
        <p className="text-xs text-gray-400">Standard SSL Encrypted checkout. Auto-rewards on the blockchain network.</p>
      </div>

      {success ? (
        // Success screen (after on‑chain recording)
        <div className="glass-card rounded-2xl p-6 md:p-8 border border-teal/30 text-center space-y-6 animate-pulse-glow">
          <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center border border-teal/40 mx-auto text-3xl">🎉</div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white">Payment Successful!</h2>
            <p className="text-xs text-teal font-extrabold tracking-widest uppercase">
              10 HPH TOKENS MINTED SUCCESSFULLY
            </p>
          </div>
          {/* Transaction receipt */}
          <div className="bg-slate-900 border border-border p-4 rounded-xl text-left space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Subscription:</span>
              <span className="text-white font-extrabold">{activePlan.appName} - {activePlan.name}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Total Paid:</span>
              <span className="text-teal font-black text-sm">₹{activePlan.priceMonthly}</span>
            </div>
            {txHash && (
              <div className="pt-2 border-t border-border space-y-1">
                <span className="text-[10px] text-gray-500 font-bold uppercase block">Solidity Polygon Tx Hash:</span>
                <span className="text-[10px] text-teal font-mono block break-all bg-slate-950 p-2 rounded border border-teal/10 flex items-center justify-between gap-2">
                  <span>{txHash}</span>
                  <Link2 className="w-3 h-3 text-teal/60 cursor-pointer hover:text-teal" />
                </span>
              </div>
            )}
          </div>
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Link href="/dashboard" className="w-full sm:w-1/2 py-3 bg-teal hover:brightness-110 text-slate-950 font-black text-xs rounded-xl text-center">
              Go to Spend Dashboard
            </Link>
            <Link href="/wallet" className="w-full sm:w-1/2 py-3 bg-slate-850 hover:bg-slate-800 text-white text-xs font-bold border border-border rounded-xl text-center">
              View MetaMask Balance
            </Link>
          </div>
        </div>
      ) : (
        // Main checkout form
        <div className="grid md:grid-cols-3 gap-6">
          {/* Plan info card */}
          <div className="md:col-span-1 glass-card rounded-2xl p-5 border border-border space-y-4 self-start">
            <div className="flex items-center space-x-3 pb-3 border-b border-border">
              <span className="text-3xl bg-slate-850 p-2 rounded-xl border border-border">{activePlan.appLogo}</span>
              <div>
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">{activePlan.appName}</span>
                <span className="text-sm font-extrabold text-white block leading-tight">{activePlan.name}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400">
                <span>Plan rate:</span>
                <span>₹{activePlan.priceMonthly}/mo</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Duration:</span>
                <span>Monthly Cycle</span>
              </div>
              <div className="pt-2 border-t border-border flex justify-between text-sm">
                <span className="text-white font-extrabold">Total:</span>
                <span className="text-teal font-black">₹{activePlan.priceMonthly}</span>
              </div>
            </div>
            <div className="bg-teal/5 border border-teal/20 p-3 rounded-xl text-[10px] text-teal space-y-1">
              <span className="font-extrabold uppercase flex items-center gap-1">
                <Gift className="w-3 h-3 text-gold" /> Blockchain Bonus
              </span>
              <p>You earn 10 HPH ERC-20 Tokens on completion, auto-transferred to your wallet.</p>
            </div>
          </div>

          {/* Payment details panel */}
          <div className="md:col-span-2 glass-card rounded-2xl p-6 border border-border space-y-6">
            <h3 className="text-lg font-bold text-white">Choose Payment Method</h3>
            <div className="grid grid-cols-3 gap-3">
              {[{ id: 'stripe', label: '💳 Credit/Debit' }, { id: 'razorpay', label: '⚡ UPI / Net' }, { id: 'crypto', label: '🪙 MetaMask' }].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPaymentMethod(opt.id as any)}
                  className={`p-3 rounded-xl border text-[10px] font-extrabold text-center transition-all ${
                    paymentMethod === opt.id ? 'bg-teal/15 text-teal border-teal/40' : 'bg-slate-900 text-gray-400 border-border hover:border-gray-600'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              {/* Stripe / Card details */}
              {paymentMethod === 'stripe' && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-gray-400 uppercase font-black tracking-widest block">Card Holder Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Satoshi Nakamoto"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-border rounded-xl text-white font-medium text-xs focus:outline-none focus:border-teal"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-gray-400 uppercase font-black tracking-widest block">Card details</label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="4242 4242 4242 4242"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-900 border border-border rounded-xl text-white font-medium text-xs focus:outline-none focus:border-teal"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-gray-400 uppercase font-black tracking-widest block">Expiry Date</label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-border rounded-xl text-white font-medium text-xs focus:outline-none focus:border-teal text-center"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-gray-400 uppercase font-black tracking-widest block">CVC</label>
                      <input
                        type="password"
                        maxLength={3}
                        required
                        placeholder="123"
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-border rounded-xl text-white font-medium text-xs focus:outline-none focus:border-teal text-center"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Razorpay / UPI input – we will launch the UPI app on submit */}
              {paymentMethod === 'razorpay' && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-gray-400 uppercase font-black tracking-widest block">Virtual Payment Address (VPA)</label>
                    <input
                      type="text"
                      value={vpa}
                      onChange={(e) => {
                        setVpa(e.target.value);
                        setVpaError('');
                      }}
                      required
                      placeholder="example@upi"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-border rounded-xl text-white font-medium text-xs focus:outline-none focus:border-teal"
                    />
                    {vpaError && <p className="text-[10px] text-red-400 font-bold">{vpaError}</p>}
                  </div>
                  <p className="text-[10px] text-gray-400 italic">Enter your UPI ID to trigger a checkout notification in your preferred payment app.</p>
                </div>
              )}

              {/* Crypto / MetaMask */}
              {paymentMethod === 'crypto' && (
                <div className="space-y-4 text-center py-4 bg-slate-900 rounded-xl border border-border">
                  <span className="text-3xl block">🦊</span>
                  <h4 className="text-sm font-bold text-white mt-1.5">Metamask Crypto Payment</h4>
                  <p className="text-xs text-gray-400 max-w-xs mx-auto mt-1">
                    Connect your wallet to purchase this subscription using Polygon gas tokens.
                  </p>
                  {!isConnected ? (
                    <button
                      type="button"
                      onClick={connectWallet}
                      className="mt-3 inline-flex items-center space-x-1.5 bg-teal text-slate-950 font-black text-xs px-4 py-2 rounded-lg"
                    >
                      <Wallet className="w-3.5 h-3.5" />
                      <span>Authorize Wallet Connection</span>
                    </button>
                  ) : (
                    <span className="mt-3 inline-flex items-center space-x-1.5 text-teal text-xs font-bold bg-teal/10 px-3 py-1.5 rounded-full border border-teal/15">
                      <ShieldCheck className="w-4 h-4 text-teal" /> Wallet Linked: {walletAddress?.substring(0, 12)}...
                    </span>
                  )}
                </div>
              )}

              {/* Double‑spending / renewal warnings */}
              {subStatus.isActive && (
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-start space-x-3 text-left">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-xs font-black text-red-400 block uppercase tracking-wider">Double Spending Blocked</span>
                    <p className="text-[11px] text-gray-400 leading-normal">
                      You already have an active subscription for this plan. It will expire on <strong className="text-white font-extrabold">{subStatus.expiryDate}</strong> ({subStatus.daysRemaining} days remaining).
                    </p>
                    <span className="text-[10px] text-teal font-extrabold block">Accidental double payments are blocked automatically to safeguard your funds.</span>
                  </div>
                </div>
              )}

              {!subStatus.isActive && subStatus.expiryDate && (
                <div className="bg-emerald-950/20 border border-emerald-500/30 p-4 rounded-xl flex items-start space-x-3 text-left animate-pulse-glow">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-xs font-black text-emerald-400 block uppercase tracking-wider">Subscription Renewal Ready</span>
                    <p className="text-[11px] text-gray-400 leading-normal">
                      Your previous subscription expired on <strong className="text-white font-extrabold">{subStatus.expiryDate}</strong>.
                    </p>
                    <span className="text-[10px] text-teal font-extrabold block">Rebooting payment now will restore active status and award another +10 HPH!</span>
                  </div>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading || subStatus.isActive}
                className={`w-full mt-4 py-3 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  subStatus.isActive ? 'bg-slate-800 text-gray-500 border border-border cursor-not-allowed' : 'bg-gradient-to-r from-sky-400 to-blue-500 hover:brightness-110 text-slate-950 shadow-sky-glow border border-sky-400/20'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{paymentMethod === 'razorpay' ? 'Launching UPI app...' : 'Processing payment...'}</span>
                  </>
                ) : subStatus.isActive ? (
                  <span>Disabled (Active Subscription Exists)</span>
                ) : (
                  <>
                    <span>{paymentMethod === 'razorpay' ? 'Proceed to UPI' : subStatus.expiryDate ? 'Reboot & Renew Plan' : 'Confirm & Pay'} ₹{activePlan.priceMonthly}</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="text-center text-teal p-10 animate-pulse">Loading secure checkout...</div>}>
      <CheckoutFlow />
    </Suspense>
  );
}

// End of file
