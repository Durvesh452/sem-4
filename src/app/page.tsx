"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Music, Film, Utensils, Cpu, Activity, HardDrive, Gamepad2,
  GraduationCap, CheckSquare, Palette, Newspaper, Terminal,
  Heart, ShoppingBag, Plane, TrendingUp, ChevronRight,
  Sparkles, Lock, Search, HelpCircle, ArrowRight, Zap, Shield, Eye
} from 'lucide-react';
import { CATEGORIES, APP_SERVICES, Plan } from '@/data/plans';
import BrandLogo from '@/components/BrandLogo';

const iconMap: Record<string, React.ComponentType<any>> = {
  Music, Film, Utensils, Cpu, Activity, HardDrive, Gamepad2,
  GraduationCap, CheckSquare, Palette, Newspaper, Terminal,
  Heart, ShoppingBag, Plane, TrendingUp
};

const categoryColors: Record<string, { bg: string; color: string; border: string }> = {
  music:    { bg: 'rgba(20,184,166,0.1)',   color: '#2DD4BF', border: 'rgba(20,184,166,0.2)' },
  movies:   { bg: 'rgba(239,68,68,0.1)',    color: '#F87171', border: 'rgba(239,68,68,0.2)' },
  food:     { bg: 'rgba(245,158,11,0.1)',   color: '#FCD34D', border: 'rgba(245,158,11,0.2)' },
  tech:     { bg: 'rgba(37,99,235,0.1)',    color: '#60A5FA', border: 'rgba(37,99,235,0.2)' },
  health:   { bg: 'rgba(34,197,94,0.1)',    color: '#4ADE80', border: 'rgba(34,197,94,0.2)' },
  storage:  { bg: 'rgba(168,85,247,0.1)',   color: '#C084FC', border: 'rgba(168,85,247,0.2)' },
  gaming:   { bg: 'rgba(234,179,8,0.1)',    color: '#FDE047', border: 'rgba(234,179,8,0.2)' },
  education:{ bg: 'rgba(14,165,233,0.1)',   color: '#38BDF8', border: 'rgba(14,165,233,0.2)' },
  design:   { bg: 'rgba(249,115,22,0.1)',   color: '#FB923C', border: 'rgba(249,115,22,0.2)' },
  news:     { bg: 'rgba(99,102,241,0.1)',   color: '#818CF8', border: 'rgba(99,102,241,0.2)' },
};

export default function Home() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState({ student: false, country: 'IN', budget: 500, category: 'music' });
  const [recommendedPlans, setRecommendedPlans] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>(APP_SERVICES);

  React.useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setServices(data); })
      .catch(() => {});
  }, []);

  const featuredHiddenPlans = React.useMemo(() => {
    return services.flatMap(app =>
      app.plans
        .filter((plan: any) => plan.isHidden)
        .map((plan: any) => ({ ...plan, appName: app.name, appLogo: app.logo, appSlug: app.id }))
    ).slice(0, 3);
  }, [services]);

  const startQuiz = () => { setQuizOpen(true); setQuizStep(1); };

  const handleQuizAnswer = (field: string, value: any) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
    setQuizStep(prev => prev + 1);
  };

  const finishQuiz = () => {
    const recommendations: any[] = [];
    services.forEach(app => {
      app.plans.forEach((plan: any) => {
        let score = 0;
        if (app.category === answers.category) score += 3;
        if (plan.priceMonthly <= answers.budget) score += 2;
        if (answers.student && plan.type === 'student') score += 5;
        if (plan.isHidden) score += 1;
        if (score >= 4) recommendations.push({ ...plan, appName: app.name, appLogo: app.logo, appSlug: app.id, score });
      });
    });
    recommendations.sort((a, b) => b.score - a.score || a.priceMonthly - b.priceMonthly);
    setRecommendedPlans(recommendations.slice(0, 4));
    setQuizStep(4);
  };

  return (
    <div className="space-y-16 animate-fade-in">

      {/* ──────────────────────────────────────
          1. HERO SECTION
      ────────────────────────────────────── */}
      <section className="relative text-center py-16 md:py-24 max-w-4xl mx-auto space-y-8">
        {/* Background glow orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-pulse-glow"
            style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)' }}
          />
          <div
            className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full animate-float"
            style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full animate-float"
            style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)', animationDelay: '3s' }}
          />
        </div>

        {/* Pill badge */}
        <div className="flex justify-center">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold"
            style={{
              background: 'rgba(37,99,235,0.1)',
              border: '1px solid rgba(37,99,235,0.25)',
              color: '#93C5FD',
            }}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Revealing unadvertised subscription loopholes since 2024</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]" style={{ letterSpacing: '-0.02em' }}>
          The plans they{' '}
          <br className="hidden md:block" />
          <span className="gradient-text-brand">don't advertise.</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed" style={{ color: '#94A3B8' }}>
          Hidden Plans Hub reveals unlisted subscription deals, ranks the cheapest options across
          every category, and pays you back in HPH blockchain tokens.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/finder"
            id="hero-finder-btn"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-white transition-all active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
              boxShadow: '0 4px 20px rgba(37,99,235,0.4)',
              border: '1px solid rgba(59,130,246,0.3)',
            }}
          >
            <Search className="w-5 h-5" />
            Start Cheapest Finder
          </Link>
          <button
            onClick={startQuiz}
            id="hero-quiz-btn"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base transition-all active:scale-95"
            style={{
              background: 'rgba(15,22,41,0.8)',
              border: '1px solid rgba(30,42,69,0.9)',
              color: '#CBD5E1',
            }}
          >
            <HelpCircle className="w-5 h-5" style={{ color: '#38BDF8' }} />
            Take Eligibility Quiz
          </button>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
          {[
            { icon: Eye, label: '200+ Hidden Deals' },
            { icon: Shield, label: 'Verified & Safe' },
            { icon: Zap, label: 'Instant Results' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5" style={{ color: '#475569' }}>
              <Icon className="w-4 h-4" style={{ color: '#2563EB' }} />
              <span className="text-sm font-semibold">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────
          2. ELIGIBILITY QUIZ MODAL
      ────────────────────────────────────── */}
      {quizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(5,8,20,0.85)', backdropFilter: 'blur(16px)' }}>
          <div
            className="w-full max-w-md rounded-3xl p-6 md:p-8 relative animate-scale-in"
            style={{
              background: 'linear-gradient(145deg, rgba(15,22,41,0.98) 0%, rgba(12,18,40,0.98) 100%)',
              border: '1px solid rgba(37,99,235,0.2)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(37,99,235,0.1)',
            }}
          >
            <button
              onClick={() => setQuizOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-xl text-slate-500 hover:text-white transition-colors"
              style={{ background: 'rgba(30,42,69,0.6)' }}
            >
              ✕
            </button>

            {/* Progress dots */}
            <div className="flex gap-2 mb-6">
              {[1,2,3].map(i => (
                <div
                  key={i}
                  className="h-1 flex-1 rounded-full transition-all duration-300"
                  style={{
                    background: quizStep >= i
                      ? 'linear-gradient(90deg, #2563EB, #0EA5E9)'
                      : 'rgba(30,42,69,0.6)',
                  }}
                />
              ))}
            </div>

            {quizStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" style={{ color: '#38BDF8' }} />
                    Are you a student or educator?
                  </h3>
                  <p className="text-sm mt-1.5" style={{ color: '#64748B' }}>
                    Student deals offer up to 100% off — but require verification.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: '🎓 Yes, I am', value: true },
                    { label: '💼 Not a student', value: false },
                  ].map(opt => (
                    <button
                      key={String(opt.value)}
                      onClick={() => handleQuizAnswer('student', opt.value)}
                      className="p-4 rounded-2xl text-center font-bold text-sm transition-all hover:scale-105 active:scale-95"
                      style={{
                        background: 'rgba(15,22,41,0.6)',
                        border: '1px solid rgba(30,42,69,0.8)',
                        color: '#CBD5E1',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {quizStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Monthly Budget</h3>
                  <p className="text-sm mt-1.5" style={{ color: '#64748B' }}>
                    We'll find the cheapest plan combos within this limit.
                  </p>
                </div>
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold" style={{ color: '#64748B' }}>₹50</span>
                    <div
                      className="px-4 py-2 rounded-xl text-lg font-extrabold text-white"
                      style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.25)' }}
                    >
                      ₹{answers.budget}/mo
                    </div>
                    <span className="text-sm font-semibold" style={{ color: '#64748B' }}>₹2000</span>
                  </div>
                  <input
                    type="range" min="50" max="2000" step="50"
                    value={answers.budget}
                    onChange={(e) => setAnswers(prev => ({ ...prev, budget: Number(e.target.value) }))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: '#2563EB', background: 'rgba(30,42,69,0.6)' }}
                  />
                  <button
                    onClick={() => setQuizStep(3)}
                    className="w-full py-3.5 rounded-2xl font-bold text-white transition-all active:scale-95"
                    style={{ background: 'linear-gradient(135deg, #2563EB, #0EA5E9)', boxShadow: '0 4px 15px rgba(37,99,235,0.3)' }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {quizStep === 3 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-white">Primary Interest</h3>
                  <p className="text-sm mt-1.5" style={{ color: '#64748B' }}>Which category matters most to you?</p>
                </div>
                <div className="grid grid-cols-2 gap-2.5 max-h-64 overflow-y-auto">
                  {CATEGORIES.slice(0, 8).map((cat) => {
                    const colors = categoryColors[cat.id] || { bg: 'rgba(30,42,69,0.4)', color: '#94A3B8', border: 'rgba(30,42,69,0.6)' };
                    return (
                      <button
                        key={cat.id}
                        onClick={() => { setAnswers(prev => ({ ...prev, category: cat.id })); setTimeout(finishQuiz, 200); }}
                        className="p-3.5 rounded-2xl text-left text-sm font-bold transition-all hover:scale-105 active:scale-95"
                        style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.color }}
                      >
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {quizStep === 4 && (
              <div className="space-y-5">
                <div className="text-center">
                  <div className="text-4xl mb-2">🎯</div>
                  <h3 className="text-xl font-bold text-white">Your Personalized Matches</h3>
                  <p className="text-xs mt-1" style={{ color: '#64748B' }}>
                    Top plans tailored to your profile and budget:
                  </p>
                </div>
                <div className="space-y-2.5">
                  {recommendedPlans.length > 0 ? (
                    recommendedPlans.map((plan) => (
                      <Link
                        href={`/app/${plan.appSlug}`}
                        key={plan.id}
                        className="flex items-center justify-between p-3.5 rounded-2xl transition-all hover:scale-[1.01]"
                        style={{
                          background: 'rgba(15,22,41,0.7)',
                          border: '1px solid rgba(30,42,69,0.8)',
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <BrandLogo id={plan.appLogo} className="!w-9 !h-9" />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-bold text-white">{plan.appName}</span>
                              {plan.isHidden && (
                                <span className="badge-sky text-[9px] flex items-center gap-0.5">
                                  <Lock className="w-2.5 h-2.5" /> SECRET
                                </span>
                              )}
                            </div>
                            <span className="text-xs" style={{ color: '#64748B' }}>{plan.name}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold" style={{ color: '#2DD4BF' }}>₹{plan.priceMonthly}/mo</span>
                          <div className="text-[10px] font-bold" style={{ color: '#64748B' }}>
                            Save {plan.originalPriceMonthly ? Math.round((1 - plan.priceMonthly / plan.originalPriceMonthly) * 100) : 40}%
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-center text-sm py-6" style={{ color: '#64748B' }}>
                      No exact match found. Try adjusting your preferences.
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setQuizOpen(false)}
                  className="w-full py-3.5 rounded-2xl font-bold text-white transition-all active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #0EA5E9)', boxShadow: '0 4px 15px rgba(37,99,235,0.3)' }}
                >
                  Explore Full Finder →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────
          3. CATEGORY GRID
      ────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Explore <span style={{ color: '#38BDF8' }}>By Category</span>
            </h2>
            <p className="text-sm mt-1" style={{ color: '#64748B' }}>Find hidden deals across every subscription category</p>
          </div>
          <Link
            href="/finder"
            className="flex items-center gap-1 text-sm font-bold transition-colors hover:opacity-80"
            style={{ color: '#60A5FA' }}
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.slice(0, 8).map((cat, idx) => {
            const Icon = iconMap[cat.icon] || Music;
            const colors = categoryColors[cat.id] || { bg: 'rgba(30,42,69,0.3)', color: '#94A3B8', border: 'rgba(30,42,69,0.5)' };
            return (
              <Link
                href={`/category/${cat.id}`}
                key={cat.id}
                id={`category-${cat.id}`}
                className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-3 cursor-pointer group transition-all hover:scale-105 active:scale-95"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                  style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
                >
                  <Icon className="w-5 h-5" style={{ color: colors.color }} />
                </div>
                <span className="text-xs font-bold" style={{ color: '#94A3B8' }}>
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ──────────────────────────────────────
          4. FEATURED HIDDEN PLANS
      ────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Featured <span style={{ color: '#38BDF8' }}>Secret Deals</span>
            </h2>
            <p className="text-sm mt-1" style={{ color: '#64748B' }}>Hidden plans with verified high success rates</p>
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold animate-pulse-glow"
            style={{
              background: 'rgba(14,165,233,0.1)',
              border: '1px solid rgba(14,165,233,0.2)',
              color: '#38BDF8',
            }}
          >
            <Lock className="w-3.5 h-3.5" /> High Success Rate
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {featuredHiddenPlans.map((plan, idx) => {
            const savings = plan.originalPriceMonthly
              ? Math.round((1 - plan.priceMonthly / plan.originalPriceMonthly) * 100)
              : 50;
            return (
              <div
                key={plan.id}
                className="glass-card-sky glass-card rounded-3xl p-6 flex flex-col justify-between group padlock-container"
                style={{
                  border: '1px solid rgba(14,165,233,0.15)',
                  animationDelay: `${idx * 100}ms`,
                }}
              >
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <BrandLogo id={plan.appLogo} />
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#475569' }}>
                          {plan.appName}
                        </span>
                        <h3 className="text-base font-bold text-white mt-0.5">{plan.name}</h3>
                      </div>
                    </div>
                    {/* Padlock icon */}
                    <div
                      className="p-2 rounded-xl padlock-container"
                      style={{ background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.2)' }}
                    >
                      <div className="relative">
                        <span className="absolute -top-1 left-0.5 padlock-shackle">
                          <span className="block w-2.5 h-3 border-2 rounded-t-full" style={{ borderColor: '#38BDF8', borderBottomColor: 'transparent' }} />
                        </span>
                        <Lock className="w-4 h-4 relative z-10" style={{ color: '#38BDF8' }} />
                      </div>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed line-clamp-2" style={{ color: '#64748B' }}>
                    {plan.whyHidden}
                  </p>

                  {/* Price comparison */}
                  <div
                    className="p-4 rounded-2xl flex items-center justify-between"
                    style={{ background: 'rgba(10,15,30,0.5)', border: '1px solid rgba(30,42,69,0.6)' }}
                  >
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#475569' }}>Secret Price</div>
                      <div className="text-xl font-extrabold" style={{ color: '#2DD4BF' }}>₹{plan.priceMonthly}/mo</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#475569' }}>Public Price</div>
                      <div className="text-sm font-bold line-through" style={{ color: '#475569' }}>₹{plan.originalPriceMonthly}/mo</div>
                    </div>
                    <div
                      className="px-2.5 py-1 rounded-xl text-xs font-extrabold"
                      style={{ background: 'rgba(14,165,233,0.15)', border: '1px solid rgba(14,165,233,0.2)', color: '#38BDF8' }}
                    >
                      SAVE {savings}%
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-5">
                  <Link
                    href={`/app/${plan.appSlug}`}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm text-white transition-all hover:brightness-110 active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)',
                      boxShadow: '0 4px 15px rgba(14,165,233,0.3)',
                      border: '1px solid rgba(14,165,233,0.3)',
                    }}
                  >
                    Reveal & Unlock
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ──────────────────────────────────────
          5. BROWSER EXTENSION PROMO
      ────────────────────────────────────── */}
      <section
        className="relative rounded-3xl p-8 md:p-12 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(15,22,41,0.9) 0%, rgba(10,18,40,0.9) 100%)',
          border: '1px solid rgba(37,99,235,0.2)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
        }}
      >
        {/* BG glow */}
        <div
          className="absolute right-0 top-0 w-[500px] h-[400px] -z-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(37,99,235,0.12) 0%, transparent 60%)' }}
        />
        <div
          className="absolute left-0 bottom-0 w-64 h-64 -z-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.07) 0%, transparent 70%)' }}
        />

        <div className="max-w-2xl space-y-6">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
            style={{ background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)', color: '#2DD4BF' }}
          >
            <Zap className="w-3.5 h-3.5" />
            Beta Extension Concept
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Stop overpaying.{' '}
            <span className="gradient-text-brand">Let AI scan pricing walls.</span>
          </h2>

          <p className="text-sm md:text-base leading-relaxed" style={{ color: '#64748B' }}>
            Our Chrome extension automatically detects subscription signup walls and checks for
            student loopholes, regional discounts, and corporate partnerships — finding you a
            cheaper alternative instantly.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-white transition-all hover:brightness-110 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #14B8A6 100%)',
                boxShadow: '0 4px 15px rgba(37,99,235,0.3)',
                border: '1px solid rgba(37,99,235,0.3)',
              }}
            >
              Install Chrome Extension
            </button>
            <Link
              href="/referral"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
              style={{
                background: 'rgba(15,22,41,0.6)',
                border: '1px solid rgba(30,42,69,0.8)',
                color: '#94A3B8',
              }}
            >
              Refer friends → earn 25 HPH
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
