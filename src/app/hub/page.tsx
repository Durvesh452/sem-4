"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, Lock, Unlock, HelpCircle, ArrowRight, ShieldCheck, 
  Sparkles, CheckCircle2, ChevronRight, Gift, Percent, Globe 
} from 'lucide-react';
import { APP_SERVICES, Plan } from '@/data/plans';

export default function HiddenPlansHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
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

  // Get all hidden plans only
  const hiddenPlans = useMemo(() => {
    const plans: any[] = [];
    services.forEach(app => {
      app.plans.forEach((plan: any) => {
        if (plan.isHidden) {
          plans.push({
            ...plan,
            appName: app.name,
            appLogo: app.logo,
            appSlug: app.id,
            category: app.category
          });
        }
      });
    });
    return plans;
  }, [services]);

  const filteredHiddenPlans = useMemo(() => {
    return hiddenPlans.filter(plan => {
      // Type/category filter
      if (selectedType !== "all" && plan.type !== selectedType && plan.category !== selectedType) {
        return false;
      }
      
      // Search filter
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        return (
          plan.appName.toLowerCase().includes(q) ||
          plan.name.toLowerCase().includes(q) ||
          (plan.whyHidden && plan.whyHidden.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [hiddenPlans, selectedType, searchQuery]);

  return (
    <div className="space-y-8">
      {/* 1. Header with Badge */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-1 bg-gold/10 text-gold text-xs font-black px-3 py-1 rounded-full border border-gold/10">
          <Lock className="w-3.5 h-3.5" />
          <span>SECRET ARCHIVE SECURED</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight">
          Hidden Plans <span className="text-gold">Archive Hub</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-xl">
          A catalog of unlisted student schemes, regional pricing loopholes, bank collaborations, and win-back offers.
        </p>
      </div>

      {/* 2. Interactive Search & Quick Category Filters */}
      <div className="glass-card rounded-2xl p-5 border border-border space-y-5">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search the secret archive (e.g. Spotify, Student, Prime)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-border focus:border-gold rounded-xl text-white font-medium focus:outline-none transition-all"
          />
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-2 pt-1">
          {[
            { id: "all", label: "🔒 All Secrets" },
            { id: "student", label: "🎓 Students & Edu" },
            { id: "bank", label: "💳 Bank Exclusives" },
            { id: "design", label: "🎨 Design Deals" },
            { id: "music", label: "🎵 Music Loops" },
            { id: "movies", label: "🎬 Movies & TV" }
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => setSelectedType(opt.id)}
              className={`px-4 py-2 rounded-xl text-xs font-black border transition-all ${
                selectedType === opt.id 
                  ? "bg-gold text-slate-950 border-gold shadow-gold-glow" 
                  : "bg-slate-900 text-gray-400 border-border hover:border-gray-600"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Secret Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHiddenPlans.length > 0 ? (
          filteredHiddenPlans.map((plan) => (
            <div 
              key={plan.id}
              className="glass-card glass-card-gold rounded-2xl p-6 border border-gold/10 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Brand row */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl bg-slate-850 p-2 rounded-xl border border-border">{plan.appLogo}</span>
                    <div>
                      <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider block">{plan.appName}</span>
                      <h3 className="text-base font-extrabold text-white">{plan.name}</h3>
                    </div>
                  </div>

                  <span className="bg-gold/10 text-gold text-[8px] font-black px-1.5 py-0.5 rounded border border-gold/10 uppercase tracking-widest">
                    {plan.type}
                  </span>
                </div>

                {/* Savings / Pricing block */}
                <div className="bg-slate-900/60 p-3.5 rounded-xl border border-border flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-gray-500 font-bold uppercase block">Secret Price</span>
                    <span className="text-base font-black text-teal">₹{plan.priceMonthly}/mo</span>
                  </div>
                  {plan.originalPriceMonthly && (
                    <div className="text-right">
                      <span className="text-[9px] text-gray-500 line-through block">₹{plan.originalPriceMonthly}/mo</span>
                      <span className="text-[10px] text-gold font-extrabold block">
                        Save {Math.round((1 - plan.priceMonthly / plan.originalPriceMonthly) * 100)}%
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Why it's hidden:</span>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                    {plan.whyHidden}
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href={`/app/${plan.appSlug}`}
                  className="w-full block text-center py-2.5 bg-gradient-to-r from-gold to-amber-600 hover:brightness-110 text-slate-950 font-black text-xs rounded-xl shadow-gold-glow transition-all"
                >
                  Reveal Secret Portal 🔓
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16 bg-slate-900/40 rounded-2xl border border-border">
            <span className="text-4xl block">🔒</span>
            <h3 className="text-lg font-bold text-white mt-3">No hidden deals match</h3>
            <p className="text-xs text-gray-400 mt-1.5">Try searching for other criteria, or browse all deals on the main Finder.</p>
          </div>
        )}
      </div>
    </div>
  );
}
