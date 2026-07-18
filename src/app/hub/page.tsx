"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, Lock, ArrowRight, ShieldCheck,
  CheckCircle2, ChevronRight, Gift, Globe
} from 'lucide-react';
import { APP_SERVICES, Plan } from '@/data/plans';
import BrandLogo from '@/components/BrandLogo';

const TYPE_FILTERS = [
  { id: "all",     label: "🔒 All Secrets" },
  { id: "student", label: "🎓 Students & Edu" },
  { id: "bank",    label: "💳 Bank Exclusives" },
  { id: "design",  label: "🎨 Design Deals" },
  { id: "music",   label: "🎵 Music Loops" },
  { id: "movies",  label: "🎬 Movies & TV" },
];

export default function HiddenPlansHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [services, setServices] = useState<any[]>(APP_SERVICES);

  React.useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setServices(data); })
      .catch(() => {});
  }, []);

  const hiddenPlans = useMemo(() => {
    const plans: any[] = [];
    services.forEach(app => {
      app.plans.forEach((plan: any) => {
        if (plan.isHidden) {
          plans.push({ ...plan, appName: app.name, appLogo: app.logo, appSlug: app.id, category: app.category });
        }
      });
    });
    return plans;
  }, [services]);

  const filteredHiddenPlans = useMemo(() => {
    return hiddenPlans.filter(plan => {
      if (selectedType !== "all" && plan.type !== selectedType && plan.category !== selectedType) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return plan.appName.toLowerCase().includes(q) || plan.name.toLowerCase().includes(q) || (plan.whyHidden && plan.whyHidden.toLowerCase().includes(q));
      }
      return true;
    });
  }, [hiddenPlans, selectedType, searchQuery]);

  return (
    <div className="space-y-8 animate-fade-in">

      {/* Header */}
      <div className="space-y-3">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
          style={{ background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.2)', color: '#38BDF8' }}
        >
          <Lock className="w-3.5 h-3.5" />
          SECRET ARCHIVE SECURED
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          Hidden Plans <span style={{ color: '#38BDF8' }}>Archive Hub</span>
        </h1>
        <p className="text-sm md:text-base max-w-xl" style={{ color: '#64748B' }}>
          A curated catalog of unlisted student schemes, regional pricing loopholes,
          bank collaborations, and win-back offers — all verified.
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Hidden Deals', value: hiddenPlans.length },
          { label: 'Avg. Savings', value: '54%' },
          { label: 'Success Rate', value: '92%' },
        ].map(stat => (
          <div
            key={stat.label}
            className="p-4 rounded-2xl text-center"
            style={{
              background: 'rgba(15,22,41,0.6)',
              border: '1px solid rgba(30,42,69,0.6)',
            }}
          >
            <div className="text-xl font-extrabold text-white">{stat.value}</div>
            <div className="text-xs font-semibold mt-0.5" style={{ color: '#475569' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Search & Filter Panel */}
      <div
        className="rounded-3xl p-5 md:p-6 space-y-4"
        style={{
          background: 'linear-gradient(145deg, rgba(15,22,41,0.9) 0%, rgba(12,18,40,0.85) 100%)',
          border: '1px solid rgba(30,42,69,0.7)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        }}
      >
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
          <input
            type="text"
            id="hub-search"
            placeholder="Search the secret archive (e.g. Spotify, Student, Prime)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-base pl-12"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {TYPE_FILTERS.map(opt => (
            <button
              key={opt.id}
              onClick={() => setSelectedType(opt.id)}
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95"
              style={{
                background: selectedType === opt.id ? 'rgba(14,165,233,0.15)' : 'rgba(15,22,41,0.6)',
                border: selectedType === opt.id ? '1px solid rgba(14,165,233,0.35)' : '1px solid rgba(30,42,69,0.7)',
                color: selectedType === opt.id ? '#38BDF8' : '#64748B',
                boxShadow: selectedType === opt.id ? '0 0 12px rgba(14,165,233,0.15)' : 'none',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredHiddenPlans.length > 0 ? (
          filteredHiddenPlans.map((plan, idx) => {
            const savings = plan.originalPriceMonthly
              ? Math.round((1 - plan.priceMonthly / plan.originalPriceMonthly) * 100)
              : null;
            return (
              <div
                key={plan.id}
                className="glass-card rounded-3xl p-6 border flex flex-col justify-between group"
                style={{
                  border: '1px solid rgba(14,165,233,0.12)',
                  animationDelay: `${idx * 60}ms`,
                }}
              >
                <div className="space-y-4">
                  {/* Brand row */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <BrandLogo id={plan.appLogo} />
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest block" style={{ color: '#475569' }}>
                          {plan.appName}
                        </span>
                        <h3 className="text-base font-extrabold text-white">{plan.name}</h3>
                      </div>
                    </div>
                    <span
                      className="text-[9px] font-black px-2 py-1 rounded-xl uppercase tracking-wider flex-shrink-0"
                      style={{
                        background: 'rgba(14,165,233,0.12)',
                        border: '1px solid rgba(14,165,233,0.2)',
                        color: '#38BDF8',
                      }}
                    >
                      {plan.type}
                    </span>
                  </div>

                  {/* Pricing block */}
                  <div
                    className="p-4 rounded-2xl flex items-center justify-between"
                    style={{ background: 'rgba(10,15,30,0.5)', border: '1px solid rgba(30,42,69,0.5)' }}
                  >
                    <div>
                      <span className="text-[9px] font-bold uppercase block" style={{ color: '#475569' }}>Secret Price</span>
                      <span className="text-xl font-extrabold" style={{ color: '#2DD4BF' }}>₹{plan.priceMonthly}/mo</span>
                    </div>
                    {savings !== null && (
                      <div className="text-right">
                        <span
                          className="text-xs font-black line-through block"
                          style={{ color: '#475569' }}
                        >
                          ₹{plan.originalPriceMonthly}/mo
                        </span>
                        <span
                          className="text-sm font-extrabold"
                          style={{ color: '#38BDF8' }}
                        >
                          Save {savings}%
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Why hidden */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: '#475569' }}>
                      Why it's hidden:
                    </span>
                    <p className="text-xs leading-relaxed line-clamp-3" style={{ color: '#64748B' }}>
                      {plan.whyHidden}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-5 mt-1">
                  <Link
                    href={`/app/${plan.appSlug}`}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm text-white transition-all hover:brightness-110 active:scale-95 group-hover:shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)',
                      boxShadow: '0 4px 15px rgba(14,165,233,0.25)',
                      border: '1px solid rgba(14,165,233,0.3)',
                    }}
                  >
                    Reveal Secret Portal 🔓
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div
            className="col-span-full text-center py-20 rounded-3xl space-y-4"
            style={{
              background: 'rgba(15,22,41,0.5)',
              border: '1px dashed rgba(30,42,69,0.6)',
            }}
          >
            <div className="text-5xl">🔒</div>
            <h3 className="text-lg font-bold text-white">No hidden deals match</h3>
            <p className="text-sm" style={{ color: '#475569' }}>
              Try different search terms or browse all deals on the Finder.
            </p>
            <Link
              href="/finder"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all hover:scale-105"
              style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)', color: '#60A5FA' }}
            >
              Go to Finder <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
