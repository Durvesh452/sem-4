"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, Lock, Unlock, ShieldCheck, Flame, 
  HelpCircle, CheckCircle2, ChevronRight, Gift, Percent, Globe 
} from 'lucide-react';
import { APP_SERVICES, Plan, AppService } from '@/data/plans';

export default function AppDetail({ params }: { params: { slug: string } }) {
  const [services, setServices] = useState<AppService[]>(APP_SERVICES);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        }
      })
      .catch(err => console.error('MongoDB fetch error, using local fallback:', err));
  }, []);

  const app = services.find(a => a.id === params.slug);
  const [profile, setProfile] = useState<'student' | 'family' | 'solo'>('solo');
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<Plan | null>(null);

  if (!app) {
    notFound();
  }

  // Smart Recommendation Engine based on selected Profile
  const recommendedPlan = useMemo(() => {
    // Ranks plans: matching profile, cheapest first, then best value
    let candidatePlans = [...app.plans];

    if (profile === 'student') {
      const studentPlan = candidatePlans.find(p => p.type === 'student');
      if (studentPlan) return studentPlan;
    } else if (profile === 'family') {
      const familyPlan = candidatePlans.find(p => p.type === 'family');
      if (familyPlan) return familyPlan;
    }

    // Default: find standard individual, if not available, return cheapest public plan
    const indPlan = candidatePlans.find(p => p.type === 'individual' && !p.isHidden);
    if (indPlan) return indPlan;

    // Return cheapest overall
    candidatePlans.sort((a, b) => a.priceMonthly - b.priceMonthly);
    return candidatePlans[0];
  }, [app, profile]);

  const openUnlockModal = (plan: Plan) => {
    setSelectedPlanForModal(plan);
  };

  const closeUnlockModal = () => {
    setSelectedPlanForModal(null);
  };

  return (
    <div className="space-y-8">
      {/* 1. Header Navigation */}
      <div className="space-y-2">
        <Link href="/finder" className="inline-flex items-center text-xs font-bold text-gray-400 hover:text-white space-x-1">
          <ArrowLeft className="w-3 h-3" />
          <span>Back to Finder</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <span className="text-5xl bg-slate-900 border border-border p-3.5 rounded-2xl flex items-center justify-center">
            {app.logo}
          </span>
          <div>
            <span className="text-xs font-bold text-teal tracking-widest uppercase">App Subscription Portal</span>
            <h1 className="text-3xl md:text-5xl font-black text-white">{app.name}</h1>
          </div>
        </div>
        <p className="text-gray-400 text-sm md:text-base max-w-xl">
          {app.description}
        </p>
      </div>

      {/* 2. Recommend Profile Selector Panel */}
      <div className="glass-card rounded-2xl p-5 border border-border flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-gold text-amber-500 animate-pulse" />
            AI Subscription Recommender
          </h3>
          <p className="text-xs text-gray-400">Select your usage profile to see which unlisted or public tier saves you the most.</p>
        </div>

        <div className="flex items-center bg-slate-900 border border-border p-1.5 rounded-xl space-x-1">
          {(['solo', 'student', 'family'] as const).map(p => (
            <button
              key={p}
              onClick={() => setProfile(p)}
              className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                profile === p 
                  ? "bg-teal text-slate-950 font-black" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {p === 'solo' ? '👤 Solo' : p === 'student' ? '🎓 Student' : '👥 Family'}
            </button>
          ))}
        </div>
      </div>

      {/* Recommended Plan Highlight Banner */}
      <div className="relative bg-gradient-to-r from-teal-950/20 via-slate-900 to-slate-900 border border-teal/20 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-teal/5 blur-[80px] -z-10"></div>
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-1 bg-teal/10 text-teal text-[10px] font-black px-2.5 py-0.5 rounded-full border border-teal/10">
            🏆 BEST PLAN RECOMMENDATION FOR YOU
          </div>
          <h3 className="text-xl font-bold text-white flex items-center gap-1.5">
            <span>{recommendedPlan.name}</span>
            {recommendedPlan.isHidden && (
              <span className="bg-gold/10 text-gold text-[8px] font-extrabold px-1.5 rounded">SECRET</span>
            )}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
            {recommendedPlan.features.slice(0, 4).map((feat, idx) => (
              <li key={idx} className="text-xs text-gray-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal flex-shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-end justify-between bg-slate-850 p-4 rounded-xl border border-border min-w-[200px]">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Normalized Price</span>
          <span className="text-3xl font-black text-teal">₹{recommendedPlan.priceMonthly}/mo</span>
          
          <div className="pt-3 w-full">
            {recommendedPlan.isHidden ? (
              <button
                onClick={() => openUnlockModal(recommendedPlan)}
                className="w-full text-center py-2 bg-gradient-to-r from-gold to-amber-600 hover:brightness-110 text-slate-950 text-xs font-black rounded-lg transition-all active:scale-95"
              >
                🔓 How to Unlock
              </button>
            ) : (
              <Link
                href={`/checkout?plan=${recommendedPlan.id}`}
                className="w-full block text-center py-2 bg-teal hover:brightness-110 text-slate-950 text-xs font-black rounded-lg transition-all active:scale-95"
              >
                Subscribe Now
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 3. List of ALL available plans side-by-side */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">All Available Pricing Tiers</h3>

        <div className="grid md:grid-cols-3 gap-6">
          {app.plans.map((plan) => {
            const hasPromo = plan.originalPriceMonthly;
            const savingsPercent = hasPromo ? Math.round((1 - plan.priceMonthly / plan.originalPriceMonthly!) * 100) : null;
            return (
              <div 
                key={plan.id}
                className={`glass-card rounded-2xl p-5 border flex flex-col justify-between ${
                  plan.isHidden ? "border-gold/30 bg-gold/5" : "border-border"
                }`}
              >
                <div className="space-y-4">
                  {/* Plan head */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-extrabold text-white text-base flex items-center gap-1">
                        {plan.name}
                        {plan.isHidden && <Lock className="w-3.5 h-3.5 text-gold" />}
                      </h4>
                      <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider capitalize">
                        Type: {plan.type}
                      </span>
                    </div>

                    {plan.isHidden && (
                      <span className="bg-gold/15 text-gold text-[9px] font-black px-2 py-0.5 rounded border border-gold/10">
                        HIDDEN DEAL
                      </span>
                    )}
                  </div>

                  {/* Savings / Pricing card */}
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-border/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-500 font-extrabold uppercase">Monthly Cost</span>
                      <span className="text-xl font-black text-teal block">₹{plan.priceMonthly}/mo</span>
                    </div>
                    {savingsPercent && (
                      <div className="text-right">
                        <span className="text-[9px] text-gray-500 line-through block">₹{plan.originalPriceMonthly}/mo</span>
                        <span className="text-xs text-gold font-extrabold flex items-center gap-0.5">
                          <Percent className="w-3.5 h-3.5" /> Save {savingsPercent}%
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features list */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Features included:</span>
                    <ul className="space-y-1.5">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="text-xs text-gray-300 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal/80 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Token rewards notification */}
                <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-[10px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5 text-gold" />
                    +10 HPH Reward Tokens
                  </span>
                  <span className="text-gray-500">Polygon Network</span>
                </div>

                <div className="pt-4">
                  {plan.isHidden ? (
                    <button
                      onClick={() => openUnlockModal(plan)}
                      className="w-full text-center py-2.5 bg-gradient-to-r from-gold to-amber-600 hover:brightness-110 text-slate-950 font-extrabold text-xs rounded-xl transition-all shadow-gold-glow active:scale-95"
                    >
                      🔓 Unlock Instructions
                    </button>
                  ) : (
                    <Link
                      href={`/checkout?plan=${plan.id}`}
                      className="w-full block text-center py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs rounded-xl transition-all"
                    >
                      Subscribe Directly
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. "How to Unlock" Modal for Hidden Plans */}
      {selectedPlanForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-card w-full max-w-lg rounded-2xl p-6 md:p-8 relative border border-gold/20">
            <button 
              onClick={closeUnlockModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white font-bold"
            >
              ✕
            </button>

            <div className="space-y-6">
              {/* Modal Head */}
              <div className="flex items-center space-x-3.5 border-b border-border pb-4">
                <span className="text-4xl bg-slate-900 p-2 rounded-xl border border-gold/20">{app.logo}</span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xl font-bold text-white">{selectedPlanForModal.name}</h3>
                    <span className="bg-gold/15 text-gold text-[9px] font-black px-2 py-0.5 rounded border border-gold/10">🔒 SECRET</span>
                  </div>
                  <p className="text-xs text-gray-400">{app.name} Hidden Portal</p>
                </div>
              </div>

              {/* Status & Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-900 p-3 rounded-xl border border-border text-center">
                  <span className="text-[10px] text-gray-400 block font-bold uppercase">Success Rate</span>
                  <span className="text-base font-black text-teal">{selectedPlanForModal.successRate || 95}%</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-border text-center">
                  <span className="text-[10px] text-gray-400 block font-bold uppercase">Cashback</span>
                  <span className="text-base font-black text-gold">10 HPH</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-border text-center">
                  <span className="text-[10px] text-gray-400 block font-bold uppercase">Verification</span>
                  <span className="text-xs font-black text-white flex items-center justify-center gap-0.5">
                    <ShieldCheck className="w-3 h-3 text-teal" /> SheerID
                  </span>
                </div>
              </div>

              {/* Alert detailing why it is hidden */}
              <div className="bg-gold/5 border border-gold/20 rounded-xl p-4 text-xs text-gold/90 space-y-1">
                <span className="font-extrabold uppercase tracking-wide block">Why it's hidden:</span>
                <p className="leading-relaxed">{selectedPlanForModal.whyHidden}</p>
              </div>

              {/* Eligibility Checklist */}
              {selectedPlanForModal.eligibility && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-white uppercase tracking-widest block">Eligibility Checklist:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedPlanForModal.eligibility.map((el, index) => (
                      <span key={index} className="bg-slate-900/60 text-gray-300 text-xs px-3 py-1.5 rounded-lg border border-border flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal" />
                        <span>{el}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructions steps */}
              {selectedPlanForModal.unlockInstructions && (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-white uppercase tracking-widest block">Unlock Walkthrough Instructions:</span>
                  <ol className="space-y-2.5">
                    {selectedPlanForModal.unlockInstructions.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="bg-teal text-slate-950 font-black text-xs w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs text-gray-300 leading-normal">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Deep Link Actions */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row gap-3">
                <button
                  onClick={closeUnlockModal}
                  className="w-full sm:w-1/3 py-3 bg-slate-900 border border-border text-white text-xs font-bold rounded-xl"
                >
                  Cancel / Close
                </button>
                <Link
                  href={`/checkout?plan=${selectedPlanForModal.id}`}
                  className="w-full sm:w-2/3 py-3 text-center bg-gradient-to-r from-gold to-teal text-slate-950 text-xs font-black rounded-xl shadow-gold-glow flex items-center justify-center gap-1.5"
                >
                  <span>Go to Secured Checkout Flow</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
