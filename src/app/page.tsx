"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Music, Film, Utensils, Cpu, Activity, HardDrive, Gamepad2, 
  GraduationCap, CheckSquare, Palette, Newspaper, Terminal, 
  Heart, ShoppingBag, Plane, TrendingUp, ChevronRight, 
  Sparkles, Lock, Unlock, Crown, Search, HelpCircle 
} from 'lucide-react';
import { CATEGORIES, APP_SERVICES, Plan } from '@/data/plans';

// Map icon name string to Lucide Icon component
const iconMap: Record<string, React.ComponentType<any>> = {
  Music, Film, Utensils, Cpu, Activity, HardDrive, Gamepad2, 
  GraduationCap, CheckSquare, Palette, Newspaper, Terminal, 
  Heart, ShoppingBag, Plane, TrendingUp
};

export default function Home() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState({
    student: false,
    country: 'IN',
    budget: 500,
    category: 'music'
  });
  const [recommendedPlans, setRecommendedPlans] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>(APP_SERVICES);

  React.useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        }
      })
      .catch(err => console.error('MongoDB fetch error, using local fallback:', err));
  }, []);

  // Find all hidden plans
  const featuredHiddenPlans = React.useMemo(() => {
    return services.flatMap(app => 
      app.plans
        .filter((plan: any) => plan.isHidden)
        .map((plan: any) => ({ ...plan, appName: app.name, appLogo: app.logo, appSlug: app.id }))
    ).slice(0, 3);
  }, [services]);

  const startQuiz = () => {
    setQuizOpen(true);
    setQuizStep(1);
  };

  const handleQuizAnswer = (field: string, value: any) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
    setQuizStep(prev => prev + 1);
  };

  const finishQuiz = () => {
    // Basic scoring/recommender logic based on answers
    const recommendations: any[] = [];
    
    services.forEach(app => {
      app.plans.forEach((plan: any) => {
        let score = 0;
        
        // Match category
        if (app.category === answers.category) score += 3;
        
        // Match budget
        if (plan.priceMonthly <= answers.budget) score += 2;
        
        // Match student profile
        if (answers.student && plan.type === 'student') score += 5;
        
        // Boost hidden plans (since they are exclusive deals)
        if (plan.isHidden) score += 1;

        if (score >= 4) {
          recommendations.push({
            ...plan,
            appName: app.name,
            appLogo: app.logo,
            appSlug: app.id,
            score
          });
        }
      });
    });

    // Rank recommendation by score and price
    recommendations.sort((a, b) => b.score - a.score || a.priceMonthly - b.priceMonthly);
    setRecommendedPlans(recommendations.slice(0, 4));
    setQuizStep(4);
  };

  return (
    <div className="space-y-12">
      {/* 1. Hero Section */}
      <section className="text-center py-12 md:py-20 max-w-4xl mx-auto space-y-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-72 h-72 rounded-full bg-purple-650/10 blur-[120px]"></div>
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 -z-10 w-48 h-48 rounded-full bg-sky-500/5 blur-[100px]"></div>

        <div className="inline-flex items-center space-x-2 bg-slate-850 px-4 py-1.5 rounded-full border border-border/80 text-xs md:text-sm font-semibold text-sky-400 shadow-sky-glow">
          <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
          <span>Revealing the unadvertised, standard loopholes.</span>
        </div>

        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-none">
          The plans they <br className="hidden md:block"/>
          <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-400 bg-clip-text text-transparent animate-pulse-glow">
            don't advertise.
          </span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
          Hidden Plans Hub reveals unlisted subscription deals, ranks the cheapest options, and pays you back in HPH blockchain tokens.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/finder"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-extrabold text-base rounded-xl transition-all shadow-sky-glow hover:shadow-teal-glow hover:brightness-110 active:scale-95 text-center border border-sky-400/20"
          >
            Start Cheapest Finder
          </Link>
          <button
            onClick={startQuiz}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-border hover:border-teal/50 text-white font-bold text-base rounded-xl transition-all active:scale-95"
          >
            Take Eligibility Quiz
          </button>
        </div>
      </section>

      {/* 2. Interactive Eligibility Quiz Modal */}
      {quizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-card w-full max-w-md rounded-2xl p-6 md:p-8 relative border border-border">
            <button 
              onClick={() => setQuizOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white font-bold"
            >
              ✕
            </button>

            {quizStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <HelpCircle className="text-teal w-5 h-5" />
                  Are you a student/educator?
                </h3>
                <p className="text-sm text-gray-400">Many of the deepest hidden discounts (up to 100% off) require a student verification.</p>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => handleQuizAnswer('student', true)}
                    className="p-4 bg-slate-850 hover:bg-slate-800 border border-border hover:border-teal rounded-xl text-center font-bold"
                  >
                    🎓 Yes, I am
                  </button>
                  <button 
                    onClick={() => handleQuizAnswer('student', false)}
                    className="p-4 bg-slate-850 hover:bg-slate-800 border border-border hover:border-sky-500 rounded-xl text-center font-bold"
                  >
                    💼 No, I'm not
                  </button>
                </div>
              </div>
            )}

            {quizStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Monthly Subscription Budget</h3>
                <p className="text-sm text-gray-400">We will find the absolute cheapest plan combinations within your monthly budget.</p>
                <div className="space-y-4">
                  <input 
                    type="range" 
                    min="50" 
                    max="2000" 
                    step="50"
                    value={answers.budget}
                    onChange={(e) => setAnswers(prev => ({ ...prev, budget: Number(e.target.value) }))}
                    className="w-full accent-teal bg-slate-800"
                  />
                  <div className="flex justify-between font-bold text-teal">
                    <span>Min: ₹50</span>
                    <span className="text-white text-lg bg-slate-850 px-3 py-1 rounded border border-border">₹{answers.budget}/mo</span>
                    <span>Max: ₹2000</span>
                  </div>
                  <button 
                    onClick={() => setQuizStep(3)}
                    className="w-full py-3 bg-teal text-slate-950 rounded-xl font-extrabold active:scale-95"
                  >
                    Next Question
                  </button>
                </div>
              </div>
            )}

            {quizStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Select Primary Category</h3>
                <p className="text-sm text-gray-400">Which service category are you looking for right now?</p>
                <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto p-1">
                  {CATEGORIES.slice(0, 8).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setAnswers(prev => ({ ...prev, category: cat.id }));
                        setTimeout(finishQuiz, 200);
                      }}
                      className="p-3 bg-slate-850 hover:bg-slate-800 border border-border rounded-xl text-left text-sm font-semibold flex items-center gap-2"
                    >
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {quizStep === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <span className="text-4xl">🎉</span>
                  <h3 className="text-xl font-bold text-white mt-2">Personalized Secret Matches</h3>
                  <p className="text-xs text-gray-400">Top subscription matches tailored to your eligibility and budget profile:</p>
                </div>

                <div className="space-y-3">
                  {recommendedPlans.length > 0 ? (
                    recommendedPlans.map((plan) => (
                      <Link 
                        href={`/app/${plan.appSlug}`}
                        key={plan.id}
                        className="flex items-center justify-between p-3.5 bg-slate-850 rounded-xl border border-border hover:border-teal/50 transition-all"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{plan.appLogo}</span>
                          <div>
                            <div className="flex items-center space-x-1">
                              <span className="text-sm font-bold text-white">{plan.appName}</span>
                              {plan.isHidden && (
                                <span className="bg-sky-500/10 text-sky-400 text-[8px] font-extrabold px-1 rounded flex items-center gap-0.5 border border-sky-400/10">
                                  <Lock className="w-2 h-2 text-sky-400" /> SECRET
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-gray-400">{plan.name}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-teal">₹{plan.priceMonthly}/mo</span>
                          <div className="text-[9px] text-gray-400">Save {plan.originalPriceMonthly ? Math.round((1 - plan.priceMonthly / plan.originalPriceMonthly) * 100) : 40}%</div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-center text-sm text-gray-400 py-6">No direct match. Try adjusting your preferences!</p>
                  )}
                </div>

                <button 
                  onClick={() => setQuizOpen(false)}
                  className="w-full py-3 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-slate-950 font-extrabold rounded-xl border border-sky-400/20 shadow-sky-glow transition-all"
                >
                  Go to Main Finder
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Category Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-3xl font-extrabold tracking-tight">
            Explore <span className="text-teal">By Category</span>
          </h2>
          <Link href="/finder" className="text-xs font-bold text-teal hover:underline flex items-center gap-1">
            View All Categories <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.slice(0, 8).map((cat) => {
            const Icon = iconMap[cat.icon] || Music;
            return (
              <Link 
                href={`/category/${cat.id}`} 
                key={cat.id}
                className="glass-card hover:scale-105 active:scale-95 p-5 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-850 flex items-center justify-center border border-border group-hover:border-teal/40 group-hover:bg-teal/5 transition-all">
                  <Icon className="w-6 h-6 text-gray-400 group-hover:text-teal group-hover:scale-110 transition-all" />
                </div>
                <span className="text-xs font-bold text-gray-300 group-hover:text-white">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Featured Hidden Plans */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-3xl font-extrabold tracking-tight">
            Featured <span className="text-sky-400">Secret & Hidden Deals</span>
          </h2>
          <span className="bg-sky-500/10 text-sky-450 text-xs font-bold px-3 py-1 rounded-full border border-sky-500/20 flex items-center gap-1.5 animate-pulse-glow">
            <Lock className="w-3.5 h-3.5 text-sky-400" /> High Success Rates
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredHiddenPlans.map((plan) => (
            <div 
              key={plan.id}
              className="glass-card glass-card-sky rounded-2xl p-6 relative border border-sky-500/10 overflow-hidden flex flex-col justify-between padlock-container"
            >
              {/* Sky Blue Padlock Accent */}
              <div className="absolute top-4 right-4 bg-slate-850 p-2.5 rounded-full border border-sky-500/20">
                <div className="relative">
                  <span className="absolute top-[-4px] left-[3px] padlock-shackle">
                    <span className="block w-2.5 h-3 border-2 border-sky-400 border-b-0 rounded-t-full"></span>
                  </span>
                  <Lock className="w-4 h-4 text-sky-400 relative z-10" />
                </div>
              </div>

              <div className="space-y-4">
                {/* Logo & Category */}
                <div className="flex items-center space-x-3">
                  <span className="text-3xl bg-slate-850 p-2 rounded-xl border border-border">{plan.appLogo}</span>
                  <div>
                    <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                      {plan.appName}
                    </span>
                    <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  </div>
                </div>

                <p className="text-xs text-gray-400 line-clamp-2">
                  {plan.whyHidden}
                </p>

                {/* Price difference */}
                <div className="bg-slate-900/60 p-3.5 rounded-xl border border-border flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase font-bold">Secret Price</div>
                    <div className="text-lg font-black text-teal">₹{plan.priceMonthly}/mo</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-gray-400 uppercase font-bold">Public Price</div>
                    <div className="text-sm font-bold text-gray-400 line-through">₹{plan.originalPriceMonthly}/mo</div>
                  </div>
                  <div className="bg-sky-500/10 text-sky-400 text-xs font-black px-2 py-1 rounded border border-sky-500/15">
                    SAVE {plan.originalPriceMonthly ? Math.round((1 - plan.priceMonthly / plan.originalPriceMonthly) * 100) : 50}%
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href={`/app/${plan.appSlug}`}
                  className="w-full block text-center py-3 bg-gradient-to-r from-sky-400 to-blue-500 hover:brightness-110 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-sky-glow active:scale-95 border border-sky-400/20"
                >
                  Reveal & Unlock
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Browser Extension Concept Promo */}
      <section className="glass-card rounded-3xl p-6 md:p-12 relative overflow-hidden border border-teal/20">
        <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-teal/5 blur-[120px] -z-10"></div>
        <div className="max-w-2xl space-y-6">
          <span className="bg-teal/15 text-teal text-xs font-bold px-3 py-1 rounded-full border border-teal/20 inline-block">
            Beta Extension Concept
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Stop Overpaying. <br/>
            Let AI Scan Pricing Hidden Walls.
          </h2>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed">
            Our Chrome extension automatically detects subscription signup walls and checks if there's a student loophole, regional discount, or corporate partnership. It finds a cheaper alternative instantly.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="px-6 py-3 bg-teal text-slate-950 font-extrabold text-sm rounded-xl hover:brightness-110 active:scale-95 transition-all">
              Install Chrome Extension
            </button>
            <Link href="/referral" className="px-6 py-3 bg-slate-900 border border-border text-white font-bold text-sm rounded-xl hover:bg-slate-800 transition-all flex items-center gap-1.5">
              <span>Refer Friends to earn 25 HPH</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
