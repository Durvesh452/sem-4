"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Crown, ArrowLeft, Check, Lock, Star, ChevronRight } from 'lucide-react';
import { APP_SERVICES, CATEGORIES, AppService } from '@/data/plans';

export default function CategoryResults({ params }: { params: { slug: string } }) {
  const categoryInfo = CATEGORIES.find(c => c.id === params.slug);
  const [compareList, setCompareList] = useState<AppService[]>([]);

  if (!categoryInfo) {
    notFound();
  }

  // Filter apps matching this category
  const apps = useMemo(() => {
    const matched = APP_SERVICES.filter(app => app.category === params.slug);
    
    // Sort so cheapest plans are first
    return matched.map(app => {
      const sortedPlans = [...app.plans].sort((a, b) => a.priceMonthly - b.priceMonthly);
      return {
        ...app,
        cheapestPlan: sortedPlans[0],
        sortedPlans
      };
    }).sort((a, b) => a.cheapestPlan.priceMonthly - b.cheapestPlan.priceMonthly);
  }, [params.slug]);

  const toggleCompare = (app: AppService) => {
    setCompareList(prev => {
      const isAlreadyIn = prev.some(item => item.id === app.id);
      if (isAlreadyIn) {
        return prev.filter(item => item.id !== app.id);
      } else {
        if (prev.length >= 3) return prev; // Max 3 items comparison limit
        return [...prev, app];
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* 1. Header with Back Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <Link href="/finder" className="inline-flex items-center text-xs font-bold text-gray-400 hover:text-white space-x-1">
            <ArrowLeft className="w-3 h-3" />
            <span>Back to Finder</span>
          </Link>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight flex items-center gap-2">
            <span>{categoryInfo.name}</span>
            <span className="text-teal">Deals</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Compare all {apps.length} major apps in {categoryInfo.name} ranked by price.
          </p>
        </div>

        {compareList.length > 0 && (
          <div className="bg-slate-900 border border-teal/40 rounded-xl p-3.5 flex items-center space-x-4">
            <div className="flex -space-x-2.5">
              {compareList.map(item => (
                <span key={item.id} className="text-2xl bg-slate-800 w-9 h-9 rounded-full border border-border flex items-center justify-center">
                  {item.logo}
                </span>
              ))}
            </div>
            <div>
              <div className="text-[10px] text-teal font-extrabold uppercase">Side-By-Side Compare</div>
              <div className="text-xs text-white font-bold">{compareList.length}/3 selected</div>
            </div>
            <Link 
              href={`/checkout?compare=${compareList.map(i => i.id).join(',')}`}
              className="bg-teal text-slate-950 px-3 py-1.5 rounded-lg text-xs font-black hover:brightness-110"
            >
              Compare
            </Link>
          </div>
        )}
      </div>

      {/* 2. Winner Banner Accent */}
      {apps.length > 0 && (
        <div className="relative bg-gradient-to-r from-gold/15 via-amber-950/20 to-slate-900 border border-gold/20 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-gold/5 blur-[80px] -z-10"></div>
          
          <div className="flex items-center space-x-4">
            <span className="text-5xl bg-slate-900 border border-gold/20 p-4 rounded-2xl flex items-center justify-center animate-bounce-slow">
              👑
            </span>
            <div className="space-y-1.5">
              <span className="bg-gold/10 text-gold text-[10px] font-black px-2.5 py-0.5 rounded-full border border-gold/10 inline-flex items-center gap-1">
                <Crown className="w-3.5 h-3.5" /> BEST VALUE CROWN WINNER
              </span>
              <h2 className="text-2xl font-black text-white">{apps[0].name}</h2>
              <p className="text-xs text-gray-400 max-w-md">{apps[0].description}</p>
            </div>
          </div>

          <div className="flex items-center md:items-end flex-col gap-1.5 bg-slate-850 p-4 rounded-xl border border-border">
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Starting Price</div>
            <div className="text-3xl font-black text-teal">₹{apps[0].cheapestPlan.priceMonthly}/mo</div>
            <Link
              href={`/app/${apps[0].id}`}
              className="px-4 py-2 bg-gold text-slate-950 text-xs font-extrabold rounded-lg hover:brightness-110 transition-all active:scale-95"
            >
              Get Winner Deal
            </Link>
          </div>
        </div>
      )}

      {/* 3. General Rankings */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Full Leaderboard Rankings</h3>

        <div className="grid md:grid-cols-2 gap-6">
          {apps.map((app, index) => {
            const isCheapest = index === 0;
            const hasHiddenDeals = app.plans.some(p => p.isHidden);
            const isComparing = compareList.some(item => item.id === app.id);
            return (
              <div 
                key={app.id}
                className={`glass-card rounded-2xl p-5 border flex flex-col justify-between ${
                  isCheapest ? "border-gold/30 bg-gold/5" : "border-border"
                }`}
              >
                <div className="space-y-4">
                  {/* Row 1: Header info */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3.5">
                      <span className="text-3xl bg-slate-850 p-2.5 rounded-xl border border-border">{app.logo}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-extrabold text-white text-base">{app.name}</h4>
                          {isCheapest && <Star className="w-3.5 h-3.5 text-gold fill-gold" />}
                        </div>
                        <p className="text-xs text-gray-400">Rank #{index + 1} cheapest</p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleCompare(app as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        isComparing 
                          ? "bg-teal/15 text-teal border-teal/40" 
                          : "bg-slate-900 text-gray-400 border-border hover:border-gray-600"
                      }`}
                    >
                      {isComparing ? "✓ Added" : "+ Compare"}
                    </button>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed">
                    {app.description}
                  </p>

                  {/* Summary of their best plan */}
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-border/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-500 font-extrabold uppercase">Best Rate</span>
                      <span className="text-base font-black text-teal block">₹{app.cheapestPlan.priceMonthly}/mo</span>
                    </div>
                    {hasHiddenDeals && (
                      <span className="bg-gold/10 text-gold text-[9px] font-black px-2 py-0.5 rounded border border-gold/15 flex items-center gap-0.5">
                        <Lock className="w-2.5 h-2.5" /> SECRET DEAL
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-5 flex items-center gap-3">
                  <Link
                    href={`/app/${app.id}`}
                    className="flex-grow text-center py-2.5 bg-slate-850 hover:bg-slate-800 text-white border border-border text-xs font-extrabold rounded-xl transition-all"
                  >
                    View All {app.plans.length} Plans
                  </Link>
                  <Link
                    href={`/checkout?plan=${app.cheapestPlan.id}`}
                    className="px-5 py-2.5 bg-teal text-slate-950 text-xs font-extrabold rounded-xl hover:brightness-110 transition-all active:scale-95"
                  >
                    Subscribe
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
