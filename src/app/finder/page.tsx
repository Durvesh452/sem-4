"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, Lock, Crown, Sparkles, Filter,
  Music, Film, Utensils, Cpu, Activity,
  HardDrive, Gamepad2, GraduationCap, CheckSquare, Palette,
  Newspaper, Terminal, Heart, ShoppingBag, Plane, TrendingUp,
  SlidersHorizontal, ArrowUpDown, ChevronRight
} from 'lucide-react';
import { APP_SERVICES, CATEGORIES, AppService, Plan } from '@/data/plans';
import BrandLogo from '@/components/BrandLogo';

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
      .then(data => { if (Array.isArray(data) && data.length > 0) setServices(data); })
      .catch(() => {});
  }, []);

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(prev => prev === catId ? null : catId);
  };

  const results = useMemo(() => {
    let filteredApps = [...services];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filteredApps = filteredApps.filter(app =>
        app.name.toLowerCase().includes(q) ||
        app.category.toLowerCase().includes(q) ||
        app.plans.some(plan => plan.name.toLowerCase().includes(q) || (plan.whyHidden && plan.whyHidden.toLowerCase().includes(q)))
      );
    }
    if (selectedCategory) filteredApps = filteredApps.filter(app => app.category === selectedCategory);

    const matchedItems = filteredApps.flatMap(app => {
      let applicablePlans = app.plans;
      if (showHiddenOnly) applicablePlans = applicablePlans.filter(p => p.isHidden);
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
      applicablePlans.sort((a, b) => a.priceMonthly - b.priceMonthly);
      return [{ appId: app.id, appName: app.name, appLogo: app.logo, category: app.category, description: app.description, cheapestPlan: applicablePlans[0], allPlans: app.plans }];
    });
    return matchedItems.sort((a, b) => a.cheapestPlan.priceMonthly - b.cheapestPlan.priceMonthly);
  }, [searchQuery, selectedCategory, showHiddenOnly, profileFilter, maxPrice, services]);

  return (
    <div className="space-y-8 animate-fade-in">

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          Cheapest <span style={{ color: '#38BDF8' }}>Plan Finder</span>
        </h1>
        <p className="text-sm md:text-base" style={{ color: '#64748B' }}>
          Search any subscription, filter by category and profile — ranked cheapest first.
        </p>
      </div>

      {/* Search & Filter Panel */}
      <div
        className="rounded-3xl p-5 md:p-6 space-y-5"
        style={{
          background: 'linear-gradient(145deg, rgba(15,22,41,0.9) 0%, rgba(12,18,40,0.85) 100%)',
          border: '1px solid rgba(30,42,69,0.7)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        }}
      >
        {/* Search + Profile row */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
            <input
              type="text"
              id="plan-search"
              placeholder="Search app or category (e.g. Spotify, Zomato, Education)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-base pl-12"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: '#475569' }}>Profile:</span>
            <select
              value={profileFilter}
              onChange={(e: any) => setProfileFilter(e.target.value)}
              id="profile-filter"
              className="input-base text-sm cursor-pointer"
              style={{ paddingLeft: 12, paddingRight: 12, width: 'auto' }}
            >
              <option value="all">All Users</option>
              <option value="student">Student / Edu 🎓</option>
              <option value="solo">Individual 👤</option>
              <option value="family">Family 👥</option>
            </select>
          </div>
        </div>

        {/* Category pills */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#475569' }}>Quick Categories:</span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {CATEGORIES.map(cat => {
              const Icon = iconMap[cat.icon] || Music;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 flex-shrink-0"
                  style={{
                    background: isSelected ? 'rgba(37,99,235,0.2)' : 'rgba(15,22,41,0.6)',
                    border: isSelected ? '1px solid rgba(37,99,235,0.4)' : '1px solid rgba(30,42,69,0.7)',
                    color: isSelected ? '#60A5FA' : '#64748B',
                    boxShadow: isSelected ? '0 0 12px rgba(37,99,235,0.2)' : 'none',
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Price slider + hidden toggle */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 pt-4"
          style={{ borderTop: '1px solid rgba(30,42,69,0.6)' }}
        >
          <button
            onClick={() => setShowHiddenOnly(!showHiddenOnly)}
            id="toggle-hidden-only"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
            style={{
              background: showHiddenOnly ? 'rgba(14,165,233,0.15)' : 'rgba(15,22,41,0.6)',
              border: showHiddenOnly ? '1px solid rgba(14,165,233,0.35)' : '1px solid rgba(30,42,69,0.7)',
              color: showHiddenOnly ? '#38BDF8' : '#64748B',
              boxShadow: showHiddenOnly ? '0 0 12px rgba(14,165,233,0.15)' : 'none',
            }}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Hidden Deals Only</span>
          </button>

          <div className="flex items-center gap-3 flex-grow md:max-w-xs">
            <span className="text-xs font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: '#475569' }}>Max:</span>
            <input
              type="range" min="20" max="2000" step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="flex-grow h-1.5 rounded-full appearance-none cursor-pointer"
              style={{ accentColor: '#2563EB' }}
            />
            <span
              className="text-xs font-bold whitespace-nowrap px-2.5 py-1 rounded-xl"
              style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)', color: '#60A5FA', minWidth: 72, textAlign: 'center' }}
            >
              ₹{maxPrice}/mo
            </span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold" style={{ color: '#64748B' }}>
            <span className="text-white">{results.length}</span> smart app matches
          </span>
          <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#475569' }}>
            <ArrowUpDown className="w-3.5 h-3.5" />
            Cheapest first
          </div>
        </div>

        {results.length > 0 ? (
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(15,22,41,0.9) 0%, rgba(12,18,40,0.85) 100%)',
              border: '1px solid rgba(30,42,69,0.7)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
            }}
          >
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left premium-table">
                <thead>
                  <tr>
                    <th>App & Details</th>
                    <th>Cheapest Tier</th>
                    <th>Features</th>
                    <th className="text-right">Monthly Price</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((item, index) => {
                    const isWinner = index === 0;
                    const hasHidden = item.allPlans.some((p: Plan) => p.isHidden);
                    return (
                      <tr
                        key={item.appId}
                        style={{
                          background: isWinner ? 'rgba(37,99,235,0.04)' : 'transparent',
                        }}
                      >
                        {/* App */}
                        <td className="p-5">
                          <div className="flex items-center gap-3.5">
                            <BrandLogo id={item.appLogo} />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white">{item.appName}</span>
                                {isWinner && (
                                  <span
                                    className="flex items-center gap-1 text-[9px] font-extrabold px-2 py-0.5 rounded-lg uppercase"
                                    style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.25)', color: '#FCD34D' }}
                                  >
                                    <Crown className="w-2.5 h-2.5" /> BEST
                                  </span>
                                )}
                              </div>
                              <span className="text-xs capitalize" style={{ color: '#475569' }}>{item.category}</span>
                            </div>
                          </div>
                        </td>

                        {/* Plan name */}
                        <td className="p-5">
                          <span className="text-sm font-semibold text-white block">{item.cheapestPlan.name}</span>
                          <span className="text-xs capitalize" style={{ color: '#475569' }}>Type: {item.cheapestPlan.type}</span>
                        </td>

                        {/* Features */}
                        <td className="p-5">
                          <div className="flex flex-wrap gap-1.5 max-w-[220px]">
                            {item.cheapestPlan.features.slice(0, 2).map((feat: string, idx: number) => (
                              <span
                                key={idx}
                                className="text-[10px] px-2 py-0.5 rounded-lg"
                                style={{ background: 'rgba(30,42,69,0.6)', border: '1px solid rgba(30,42,69,0.8)', color: '#94A3B8' }}
                              >
                                {feat}
                              </span>
                            ))}
                            {item.cheapestPlan.features.length > 2 && (
                              <span className="text-[10px] font-bold" style={{ color: '#475569' }}>
                                +{item.cheapestPlan.features.length - 2}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Price */}
                        <td className="p-5 text-right">
                          <span className="text-lg font-extrabold" style={{ color: '#2DD4BF' }}>
                            ₹{item.cheapestPlan.priceMonthly}/mo
                          </span>
                          {item.cheapestPlan.billingCycle === 'yearly' && (
                            <span className="text-[9px] block uppercase font-bold" style={{ color: '#475569' }}>Billed Yearly</span>
                          )}
                        </td>

                        {/* Action */}
                        <td className="p-5">
                          <div className="flex flex-col items-center gap-1.5">
                            <Link
                              href={`/app/${item.appId}`}
                              className="px-4 py-2 text-xs font-bold rounded-xl text-center transition-all hover:scale-105 active:scale-95"
                              style={item.cheapestPlan.isHidden ? {
                                background: 'linear-gradient(135deg, #0EA5E9, #2563EB)',
                                color: 'white',
                                boxShadow: '0 4px 12px rgba(14,165,233,0.3)',
                              } : {
                                background: 'rgba(30,42,69,0.6)',
                                border: '1px solid rgba(30,42,69,0.8)',
                                color: '#94A3B8',
                              }}
                            >
                              {item.cheapestPlan.isHidden ? "🔓 Unlock Deal" : "View Plans"}
                            </Link>
                            {hasHidden && !item.cheapestPlan.isHidden && (
                              <span className="text-[9px] font-bold flex items-center gap-0.5 animate-pulse" style={{ color: '#38BDF8' }}>
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

            {/* Mobile Cards */}
            <div className="md:hidden divide-y" style={{ borderColor: 'rgba(30,42,69,0.5)' }}>
              {results.map((item, index) => {
                const isWinner = index === 0;
                return (
                  <div
                    key={item.appId}
                    className="p-4 space-y-4"
                    style={{ background: isWinner ? 'rgba(37,99,235,0.03)' : 'transparent' }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <BrandLogo id={item.appLogo} />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-white text-sm">{item.appName}</span>
                            {isWinner && <Crown className="w-3.5 h-3.5 text-amber-400" />}
                          </div>
                          <span className="text-xs capitalize" style={{ color: '#475569' }}>{item.category}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-extrabold block" style={{ color: '#2DD4BF' }}>₹{item.cheapestPlan.priceMonthly}/mo</span>
                        <span className="text-[9px] uppercase font-bold" style={{ color: '#475569' }}>{item.cheapestPlan.billingCycle}</span>
                      </div>
                    </div>

                    <div
                      className="p-3 rounded-2xl space-y-2"
                      style={{ background: 'rgba(10,15,30,0.5)', border: '1px solid rgba(30,42,69,0.5)' }}
                    >
                      <div className="flex justify-between text-xs">
                        <span className="font-bold" style={{ color: '#475569' }}>Cheapest tier:</span>
                        <span className="font-bold text-white">{item.cheapestPlan.name}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.cheapestPlan.features.slice(0, 2).map((feat: string, idx: number) => (
                          <span key={idx} className="text-[9px] px-2 py-0.5 rounded-lg" style={{ background: 'rgba(30,42,69,0.6)', color: '#94A3B8' }}>
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/app/${item.appId}`}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-2xl text-xs font-bold transition-all active:scale-95"
                      style={{
                        background: 'rgba(37,99,235,0.1)',
                        border: '1px solid rgba(37,99,235,0.2)',
                        color: '#60A5FA',
                      }}
                    >
                      {item.cheapestPlan.isHidden ? "🔒 Unlock Hidden Deal" : "View Plans"}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div
            className="text-center py-20 rounded-3xl space-y-4"
            style={{
              background: 'rgba(15,22,41,0.5)',
              border: '1px solid rgba(30,42,69,0.6)',
              borderStyle: 'dashed',
            }}
          >
            <div className="text-5xl">🔍</div>
            <h3 className="text-lg font-bold text-white">No plans match your filters</h3>
            <p className="text-sm max-w-sm mx-auto" style={{ color: '#475569' }}>
              Try clearing filters, increasing the budget slider, or changing your search terms.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory(null); setShowHiddenOnly(false); setProfileFilter('all'); setMaxPrice(2000); }}
              className="mt-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #2563EB, #0EA5E9)', color: 'white', boxShadow: '0 4px 15px rgba(37,99,235,0.3)' }}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
