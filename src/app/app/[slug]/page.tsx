"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft, Lock, Unlock, ShieldCheck, Zap,
  CheckCircle2, ChevronRight, Gift, Percent, X
} from 'lucide-react';
import { APP_SERVICES, Plan, AppService } from '@/data/plans';
import BrandLogo from '@/components/BrandLogo';

export default function AppDetail({ params }: { params: { slug: string } }) {
  const [services, setServices] = useState<AppService[]>(APP_SERVICES);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setServices(data); })
      .catch(() => {});
  }, []);

  const app = services.find(a => a.id === params.slug);
  const [profile, setProfile] = useState<'student' | 'family' | 'solo'>('solo');
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<Plan | null>(null);

  if (!app) notFound();

  const recommendedPlan = useMemo(() => {
    let candidates = [...app.plans];
    if (profile === 'student') {
      const sp = candidates.find(p => p.type === 'student');
      if (sp) return sp;
    } else if (profile === 'family') {
      const fp = candidates.find(p => p.type === 'family');
      if (fp) return fp;
    }
    const ind = candidates.find(p => p.type === 'individual' && !p.isHidden);
    if (ind) return ind;
    candidates.sort((a, b) => a.priceMonthly - b.priceMonthly);
    return candidates[0];
  }, [app, profile]);

  const profiles = [
    { key: 'solo', label: '👤 Solo' },
    { key: 'student', label: '🎓 Student' },
    { key: 'family', label: '👥 Family' },
  ] as const;

  return (
    <div className="space-y-8 animate-fade-in">

      {/* Back navigation */}
      <div className="space-y-4">
        <Link
          href="/finder"
          className="inline-flex items-center gap-1.5 text-sm font-bold transition-colors hover:opacity-80"
          style={{ color: '#60A5FA' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Finder
        </Link>

        <div className="flex items-center gap-4">
          <BrandLogo id={app.logo} className="!w-14 !h-14 !rounded-3xl" />
          <div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#38BDF8' }}>
              App Subscription Portal
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-0.5">{app.name}</h1>
          </div>
        </div>
        <p className="text-sm md:text-base max-w-xl" style={{ color: '#64748B' }}>
          {app.description}
        </p>
      </div>

      {/* Profile Selector */}
      <div
        className="glass-card rounded-3xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-5"
        style={{ border: '1px solid rgba(30,42,69,0.7)' }}
      >
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4" style={{ color: '#FCD34D' }} />
            Smart Plan Recommender
          </h3>
          <p className="text-xs mt-1" style={{ color: '#64748B' }}>
            Select your profile to see which plan saves you the most.
          </p>
        </div>
        <div
          className="flex items-center p-1.5 rounded-2xl gap-1"
          style={{ background: 'rgba(10,15,30,0.5)', border: '1px solid rgba(30,42,69,0.6)' }}
        >
          {profiles.map(p => (
            <button
              key={p.key}
              onClick={() => setProfile(p.key)}
              className="px-5 py-2 rounded-xl text-sm font-bold capitalize transition-all"
              style={{
                background: profile === p.key ? 'linear-gradient(135deg, #2563EB, #0EA5E9)' : 'transparent',
                color: profile === p.key ? '#ffffff' : '#64748B',
                boxShadow: profile === p.key ? '0 4px 12px rgba(37,99,235,0.3)' : 'none',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recommended Plan Banner */}
      <div
        className="relative rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(15,22,41,0.95) 0%, rgba(12,18,40,0.9) 100%)',
          border: '1px solid rgba(20,184,166,0.2)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        }}
      >
        <div
          className="absolute right-0 top-0 w-72 h-72 pointer-events-none -z-10"
          style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)' }}
        />

        <div className="space-y-4">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
            style={{ background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)', color: '#2DD4BF' }}
          >
            🏆 BEST PLAN FOR YOUR PROFILE
          </div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            {recommendedPlan.name}
            {recommendedPlan.isHidden && (
              <span
                className="text-[9px] font-extrabold px-2 py-0.5 rounded-xl"
                style={{ background: 'rgba(14,165,233,0.15)', border: '1px solid rgba(14,165,233,0.25)', color: '#38BDF8' }}
              >
                SECRET
              </span>
            )}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5">
            {recommendedPlan.features.slice(0, 4).map((feat, idx) => (
              <li key={idx} className="text-xs flex items-center gap-2" style={{ color: '#94A3B8' }}>
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#2DD4BF' }} />
                {feat}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="flex flex-col items-center md:items-end gap-4 p-5 rounded-2xl flex-shrink-0 min-w-[190px]"
          style={{ background: 'rgba(10,15,30,0.5)', border: '1px solid rgba(30,42,69,0.5)' }}
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: '#475569' }}>
              Normalized Price
            </span>
            <span className="text-3xl font-extrabold" style={{ color: '#2DD4BF' }}>
              ₹{recommendedPlan.priceMonthly}/mo
            </span>
          </div>
          {recommendedPlan.isHidden ? (
            <button
              onClick={() => setSelectedPlanForModal(recommendedPlan)}
              className="w-full py-2.5 rounded-2xl font-bold text-sm text-white transition-all hover:brightness-110 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #0EA5E9, #2563EB)',
                boxShadow: '0 4px 12px rgba(14,165,233,0.3)',
              }}
            >
              🔓 How to Unlock
            </button>
          ) : (
            <Link
              href={`/checkout?plan=${recommendedPlan.id}`}
              className="w-full block text-center py-2.5 rounded-2xl font-bold text-sm transition-all hover:brightness-110 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #2563EB, #0EA5E9)',
                color: 'white',
                boxShadow: '0 4px 12px rgba(37,99,235,0.3)',
              }}
            >
              Subscribe Now
            </Link>
          )}
        </div>
      </div>

      {/* All Pricing Tiers */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">All Available Pricing Tiers</h3>
        <div className="grid md:grid-cols-3 gap-5">
          {app.plans.map((plan) => {
            const savePct = plan.originalPriceMonthly
              ? Math.round((1 - plan.priceMonthly / plan.originalPriceMonthly) * 100)
              : null;
            return (
              <div
                key={plan.id}
                className="glass-card rounded-3xl p-5 flex flex-col justify-between"
                style={{
                  border: plan.isHidden
                    ? '1px solid rgba(14,165,233,0.2)'
                    : '1px solid rgba(30,42,69,0.6)',
                  background: plan.isHidden
                    ? 'linear-gradient(145deg, rgba(14,165,233,0.04) 0%, rgba(15,22,41,0.9) 100%)'
                    : undefined,
                }}
              >
                <div className="space-y-4">
                  {/* Plan header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-extrabold text-white text-base flex items-center gap-2">
                        {plan.name}
                        {plan.isHidden && <Lock className="w-3.5 h-3.5" style={{ color: '#38BDF8' }} />}
                      </h4>
                      <span className="text-[10px] font-semibold uppercase tracking-wider capitalize" style={{ color: '#475569' }}>
                        Type: {plan.type}
                      </span>
                    </div>
                    {plan.isHidden && (
                      <span
                        className="text-[9px] font-extrabold px-2 py-1 rounded-xl uppercase"
                        style={{ background: 'rgba(14,165,233,0.12)', border: '1px solid rgba(14,165,233,0.2)', color: '#38BDF8' }}
                      >
                        HIDDEN DEAL
                      </span>
                    )}
                  </div>

                  {/* Price block */}
                  <div
                    className="p-4 rounded-2xl flex items-center justify-between"
                    style={{ background: 'rgba(10,15,30,0.5)', border: '1px solid rgba(30,42,69,0.5)' }}
                  >
                    <div>
                      <span className="text-[10px] font-extrabold uppercase" style={{ color: '#475569' }}>Monthly Cost</span>
                      <span className="text-2xl font-extrabold block" style={{ color: '#2DD4BF' }}>₹{plan.priceMonthly}/mo</span>
                    </div>
                    {savePct && (
                      <div className="text-right">
                        <span className="text-xs line-through block" style={{ color: '#475569' }}>
                          ₹{plan.originalPriceMonthly}/mo
                        </span>
                        <span className="text-sm font-extrabold flex items-center justify-end gap-0.5" style={{ color: '#38BDF8' }}>
                          <Percent className="w-3.5 h-3.5" /> Save {savePct}%
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#475569' }}>Features included:</span>
                    <ul className="space-y-1.5">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="text-xs flex items-start gap-2" style={{ color: '#94A3B8' }}>
                          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#2DD4BF', opacity: 0.7 }} />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* HPH reward + CTA */}
                <div className="pt-4 mt-4" style={{ borderTop: '1px solid rgba(30,42,69,0.5)' }}>
                  <div className="flex items-center justify-between text-[10px] mb-4" style={{ color: '#475569' }}>
                    <span className="flex items-center gap-1">
                      <Gift className="w-3.5 h-3.5" style={{ color: '#FCD34D' }} />
                      +10 HPH Reward Tokens
                    </span>
                    <span>Stellar Network</span>
                  </div>

                  {plan.isHidden ? (
                    <button
                      onClick={() => setSelectedPlanForModal(plan)}
                      className="w-full py-3 rounded-2xl font-extrabold text-sm text-white transition-all hover:brightness-110 active:scale-95"
                      style={{
                        background: 'linear-gradient(135deg, #0EA5E9, #2563EB)',
                        boxShadow: '0 4px 12px rgba(14,165,233,0.25)',
                        border: '1px solid rgba(14,165,233,0.3)',
                      }}
                    >
                      🔓 Unlock Instructions
                    </button>
                  ) : (
                    <Link
                      href={`/checkout?plan=${plan.id}`}
                      className="w-full block text-center py-3 rounded-2xl font-extrabold text-sm transition-all hover:scale-105 active:scale-95"
                      style={{
                        background: 'rgba(30,42,69,0.5)',
                        border: '1px solid rgba(30,42,69,0.8)',
                        color: '#94A3B8',
                      }}
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

      {/* Unlock Modal */}
      {selectedPlanForModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(5,8,20,0.88)', backdropFilter: 'blur(16px)' }}
        >
          <div
            className="w-full max-w-lg rounded-3xl p-6 md:p-8 relative animate-scale-in"
            style={{
              background: 'linear-gradient(145deg, rgba(15,22,41,0.99) 0%, rgba(12,18,40,0.99) 100%)',
              border: '1px solid rgba(14,165,233,0.25)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <button
              onClick={() => setSelectedPlanForModal(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-xl transition-colors"
              style={{ background: 'rgba(30,42,69,0.6)', color: '#64748B' }}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-6">
              {/* Modal header */}
              <div className="flex items-center gap-4 pb-4" style={{ borderBottom: '1px solid rgba(30,42,69,0.6)' }}>
                <BrandLogo id={app.logo} className="!w-12 !h-12 !rounded-2xl" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white">{selectedPlanForModal.name}</h3>
                    <span
                      className="text-[9px] font-black px-2 py-0.5 rounded-xl"
                      style={{ background: 'rgba(14,165,233,0.15)', border: '1px solid rgba(14,165,233,0.25)', color: '#38BDF8' }}
                    >
                      🔒 SECRET
                    </span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>{app.name} Hidden Portal</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Success Rate', value: `${selectedPlanForModal.successRate || 95}%`, color: '#2DD4BF' },
                  { label: 'Cashback',     value: '10 HPH',                                     color: '#FCD34D' },
                  { label: 'Verification', value: 'SheerID',                                    color: '#60A5FA' },
                ].map(stat => (
                  <div
                    key={stat.label}
                    className="p-3 rounded-2xl text-center"
                    style={{ background: 'rgba(10,15,30,0.5)', border: '1px solid rgba(30,42,69,0.5)' }}
                  >
                    <span className="text-[10px] font-bold uppercase block" style={{ color: '#475569' }}>{stat.label}</span>
                    <span className="text-base font-extrabold" style={{ color: stat.color }}>{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* Why hidden */}
              <div
                className="p-4 rounded-2xl"
                style={{ background: 'rgba(14,165,233,0.05)', border: '1px solid rgba(14,165,233,0.15)' }}
              >
                <span className="text-[10px] font-extrabold uppercase tracking-wide block mb-1.5" style={{ color: '#38BDF8' }}>
                  Why it's hidden:
                </span>
                <p className="text-xs leading-relaxed" style={{ color: '#94A3B8' }}>
                  {selectedPlanForModal.whyHidden}
                </p>
              </div>

              {/* Eligibility */}
              {selectedPlanForModal.eligibility && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-white uppercase tracking-widest block">
                    Eligibility Checklist:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedPlanForModal.eligibility.map((el: string, idx: number) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-2 rounded-xl flex items-center gap-2"
                        style={{ background: 'rgba(15,22,41,0.6)', border: '1px solid rgba(30,42,69,0.6)', color: '#94A3B8' }}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#2DD4BF' }} />
                        {el}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Unlock steps */}
              {selectedPlanForModal.unlockInstructions && (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-white uppercase tracking-widest block">
                    Unlock Walkthrough:
                  </span>
                  <ol className="space-y-3">
                    {selectedPlanForModal.unlockInstructions.map((step: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold flex-shrink-0 mt-0.5"
                          style={{ background: 'linear-gradient(135deg, #2563EB, #0EA5E9)', color: 'white' }}
                        >
                          {idx + 1}
                        </span>
                        <p className="text-xs leading-relaxed" style={{ color: '#94A3B8' }}>{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2" style={{ borderTop: '1px solid rgba(30,42,69,0.5)' }}>
                <button
                  onClick={() => setSelectedPlanForModal(null)}
                  className="w-full sm:w-1/3 py-3 rounded-2xl text-sm font-bold transition-all hover:scale-105"
                  style={{ background: 'rgba(30,42,69,0.5)', border: '1px solid rgba(30,42,69,0.8)', color: '#64748B' }}
                >
                  Cancel
                </button>
                <Link
                  href={`/checkout?plan=${selectedPlanForModal.id}`}
                  className="w-full sm:w-2/3 py-3 text-center rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #0EA5E9, #2563EB)',
                    boxShadow: '0 4px 15px rgba(14,165,233,0.3)',
                    border: '1px solid rgba(14,165,233,0.3)',
                  }}
                >
                  Go to Secured Checkout
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
