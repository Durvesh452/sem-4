"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, Lock, Unlock, Crown, Sparkles, Filter, 
  HelpCircle, Music, Film, Utensils, Cpu, Activity, 
  HardDrive, Gamepad2, GraduationCap, CheckSquare, Palette, 
  Newspaper, Terminal, Heart, ShoppingBag, Plane, TrendingUp 
} from 'lucide-react';
import { APP_SERVICES, CATEGORIES, AppService, Plan } from '@/data/plans';

const iconMap: Record<string, React.ComponentType<any>> = {
  Music, Film, Utensils, Cpu, Activity, HardDrive, Gamepad2, 
  GraduationCap, CheckSquare, Palette, Newspaper, Terminal, 
  Heart, ShoppingBag, Plane, TrendingUp
};

export default function Finder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showHiddenOnly, setShowHiddenOnly] = useState(false);
  const [profileFilter, setProfileFilter] = useState<'all' | 'student' | 'family' | 'solo'>('all');
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [services, setServices] = useState<AppService[]>(APP_SERVICES);

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

  // Handle category tile select
  const handleCategoryClick = (catId: string) => {
    if (selectedCategory === catId) {
      setSelectedCategory(null); // Toggle off
    } else {
      setSelectedCategory(catId);
    }
  };

  // Perform filtering & ranking
  const results = useMemo(() => {
    let filteredApps = [...services];

    // Search filter (handles category matching or app name matching)
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      filteredApps = filteredApps.filter(app => 
        app.name.toLowerCase().includes(q) || 
        app.category.toLowerCase().includes(q) ||
        app.plans.some(plan => plan.name.toLowerCase().includes(q) || (plan.whyHidden && plan.whyHidden.toLowerCase().includes(q)))
      );
    }

    // Category filter
    if (selectedCategory) {
      filteredApps = filteredApps.filter(app => app.category === selectedCategory);
    }

    // Process and sort plan lists
    const matchedItems = filteredApps.flatMap(app => {
      // Find cheapest plan for this app based on filter
      let applicablePlans = app.plans;

      if (showHiddenOnly) {
        applicablePlans = applicablePlans.filter(p => p.isHidden);
      }

      if (profileFilter !== 'all') {
        applicablePlans = applicablePlans.filter(p => {
          if (profileFilter === 'student') return p.type === 'student' || p.type === 'free';
          if (profileFilter === 'family') return p.type === 'family' || p.type === 'free';
          if (profileFilter === 'solo') return p.type === 'individual' || p.type === 'free' || p.type === 'student';
          return true;
        });
      }

      applicablePlans = applicablePlans.filter(p => p.priceMonthly <= maxPrice);

      if (applicablePlans.length === 0) return [];

      // Sort plans for this specific app to get its cheapest option
      applicablePlans.sort((a, b) => a.priceMonthly - b.priceMonthly);

      return [{
        appId: app.id,
        appName: app.name,
        appLogo: app.logo,
        category: app.category,
        description: app.description,
        cheapestPlan: applicablePlans[0],
        allPlans: app.plans
      }];
    });

    // Rank across the category or search result: Cheapest to most expensive
    return matchedItems.sort((a, b) => a.cheapestPlan.priceMonthly - b.cheapestPlan.priceMonthly);
  }, [searchQuery, selectedCategory, showHiddenOnly, profileFilter, maxPrice]);

  return (
    <div className="space-y-8">
      {/* 1. Header & Tagline */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          Cheapest <span className="text-teal">Plan Finder</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          Search for your favorite subscription app or click a category to instantly see them ranked by price.
        </p>
      </div>

      {/* 2. Interactive Search & Control Console */}
      <div className="glass-card rounded-2xl p-5 border border-border space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Main search bar */}
          <div className="relative flex-grow">
            <Search className="w-5 h-5 text-gray-500 absolute left-4.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search app (e.g. Spotify, Zomato, Figma) or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-border focus:border-teal rounded-xl text-white font-medium focus:outline-none transition-all"
            />
          </div>

          {/* Quick profile select filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Profile:</span>
            <select
              value={profileFilter}
              onChange={(e: any) => setProfileFilter(e.target.value)}
              className="bg-slate-900 border border-border text-white text-sm font-semibold rounded-xl px-3.5 py-3 focus:outline-none focus:border-teal cursor-pointer"
            >
              <option value="all">Universal / All</option>
              <option value="student">Student / Edu 🎓</option>
              <option value="solo">Individual / Solo 👤</option>
              <option value="family">Family / Group 👥</option>
            </select>
          </div>
        </div>

        {/* Categories Shortcut Grid */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Quick Categories:</span>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {CATEGORIES.map(cat => {
              const Icon = iconMap[cat.icon] || Music;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-xl text-xs font-bold border whitespace-nowrap transition-all active:scale-95 ${
                    isSelected 
                      ? "bg-teal text-slate-950 border-teal shadow-teal-glow" 
                      : "bg-slate-900 text-gray-300 border-border hover:border-teal/30"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Filters panel */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-border/80">
          {/* Toggle button */}
          <button
            onClick={() => setShowHiddenOnly(!showHiddenOnly)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-black border transition-all ${
              showHiddenOnly 
                ? "bg-gold/15 text-gold border-gold/40 shadow-gold-glow animate-pulse-glow" 
                : "bg-slate-900 text-gray-400 border-border hover:border-gray-600"
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Show Hidden Deals Only</span>
          </button>

          {/* Price Range Filter Slider */}
          <div className="flex items-center space-x-3 flex-grow md:max-w-xs">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Max Cost:</span>
            <input 
              type="range" 
              min="20" 
              max="2000" 
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-teal bg-slate-800"
            />
            <span className="text-xs font-bold text-teal whitespace-nowrap bg-slate-850 px-2 py-1 rounded border border-border">₹{maxPrice}/mo</span>
          </div>
        </div>
      </div>

      {/* 3. Results Container */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400 font-bold">
            Showing {results.length} smart app matches
          </span>
          <span className="text-xs text-gray-400 font-medium">Ranked cheapest first 👑</span>
        </div>

        {results.length > 0 ? (
          <div className="glass-card rounded-2xl border border-border overflow-hidden">
            {/* Desktop Comparison Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-slate-900/60 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <th className="p-5">App Rank & Details</th>
                    <th className="p-5">Cheapest Tier</th>
                    <th className="p-5">Features Included</th>
                    <th className="p-5 text-right">Normalized Monthly</th>
                    <th className="p-5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {results.map((item, index) => {
                    const isWinner = index === 0;
                    const hasHidden = item.allPlans.some(p => p.isHidden);
                    return (
                      <tr 
                        key={item.appId} 
                        className={`hover:bg-slate-900/40 transition-colors ${
                          isWinner ? "bg-gold/5" : ""
                        }`}
                      >
                        {/* 1. App name & details */}
                        <td className="p-5">
                          <div className="flex items-center space-x-3.5">
                            <span className="text-3xl bg-slate-850 p-2.5 rounded-xl border border-border">{item.appLogo}</span>
                            <div>
                              <div className="flex items-center space-x-1.5">
                                <span className="font-bold text-white text-base">{item.appName}</span>
                                {isWinner && (
                                  <span className="bg-gold/15 text-gold text-[9px] font-black px-1.5 py-0.5 rounded border border-gold/20 flex items-center gap-0.5">
                                    <Crown className="w-2.5 h-2.5 text-gold" /> WINNER
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-gray-400 capitalize">{item.category} Category</span>
                            </div>
                          </div>
                        </td>

                        {/* 2. Cheapest Tier */}
                        <td className="p-5">
                          <div>
                            <span className="text-sm font-semibold text-white block">
                              {item.cheapestPlan.name}
                            </span>
                            <span className="text-[10px] text-gray-400 capitalize">
                              Type: {item.cheapestPlan.type}
                            </span>
                          </div>
                        </td>

                        {/* 3. Features */}
                        <td className="p-5">
                          <div className="flex flex-wrap gap-1 max-w-sm">
                            {item.cheapestPlan.features.slice(0, 2).map((feat, idx) => (
                              <span key={idx} className="bg-slate-850 text-gray-300 text-[10px] px-2 py-0.5 rounded border border-border">
                                {feat}
                              </span>
                            ))}
                            {item.cheapestPlan.features.length > 2 && (
                              <span className="text-[9px] text-gray-500 font-bold self-center">+{item.cheapestPlan.features.length - 2} more</span>
                            )}
                          </div>
                        </td>

                        {/* 4. Monthly Price */}
                        <td className="p-5 text-right">
                          <div className="font-black text-teal text-base">
                            ₹{item.cheapestPlan.priceMonthly}/mo
                          </div>
                          {item.cheapestPlan.billingCycle === 'yearly' && (
                            <span className="text-[9px] text-gray-500 block uppercase font-bold">Billed Yearly</span>
                          )}
                        </td>

                        {/* 5. One Click Unlock / Subscribe */}
                        <td className="p-5">
                          <div className="flex flex-col items-center justify-center space-y-1.5">
                            <Link
                              href={`/app/${item.appId}`}
                              className={`px-4.5 py-2 text-xs font-extrabold rounded-lg text-center transition-all ${
                                item.cheapestPlan.isHidden 
                                  ? "bg-gradient-to-r from-gold to-amber-600 text-slate-950 shadow-gold-glow" 
                                  : "bg-slate-800 text-white hover:bg-slate-700"
                              }`}
                            >
                              {item.cheapestPlan.isHidden ? "🔓 Unlock Deal" : "View Plans"}
                            </Link>
                            
                            {hasHidden && !item.cheapestPlan.isHidden && (
                              <span className="text-[9px] text-gold font-bold flex items-center gap-0.5 animate-pulse">
                                <Lock className="w-2 h-2" /> Hidden Available
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards Layout */}
            <div className="md:hidden divide-y divide-border/60">
              {results.map((item, index) => {
                const isWinner = index === 0;
                return (
                  <div key={item.appId} className={`p-4 space-y-4 ${isWinner ? "bg-gold/5" : ""}`}>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl bg-slate-850 p-2 rounded-xl border border-border">{item.appLogo}</span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-white text-sm">{item.appName}</span>
                            {isWinner && (
                              <Crown className="w-3.5 h-3.5 text-gold animate-bounce" />
                            )}
                          </div>
                          <span className="text-xs text-gray-400 capitalize">{item.category}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-black text-teal block">₹{item.cheapestPlan.priceMonthly}/mo</span>
                        <span className="text-[8px] text-gray-500 uppercase font-black">{item.cheapestPlan.billingCycle}</span>
                      </div>
                    </div>

                    <div className="bg-slate-900/60 p-3 rounded-xl border border-border space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400 font-bold">Cheapest available:</span>
                        <span className="text-white font-extrabold">{item.cheapestPlan.name}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {item.cheapestPlan.features.slice(0, 2).map((feat, idx) => (
                          <span key={idx} className="bg-slate-850 text-gray-300 text-[9px] px-1.5 py-0.5 rounded">
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/app/${item.appId}`}
                      className="w-full block text-center py-2.5 bg-slate-850 hover:bg-slate-800 text-teal border border-teal/20 text-xs font-extrabold rounded-xl"
                    >
                      {item.cheapestPlan.isHidden ? "🔒 Unlock Hidden Deal" : "View Plans"}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-border space-y-4">
            <span className="text-4xl block">🔍</span>
            <h3 className="text-lg font-bold text-white">No plans match your parameters</h3>
            <p className="text-sm text-gray-400 max-w-sm mx-auto">Try clearing selected filters, adjusting the budget limit, or changing your search terms.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
                setShowHiddenOnly(false);
                setProfileFilter('all');
                setMaxPrice(2000);
              }}
              className="px-5 py-2.5 bg-teal text-slate-950 font-bold text-sm rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
