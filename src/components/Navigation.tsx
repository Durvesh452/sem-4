"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, KeyRound, LayoutDashboard, Wallet, Share2, LogIn } from 'lucide-react';

const NAV_ITEMS = [
  { label: "Finder", href: "/finder", icon: Compass },
  { label: "Secret Hub", href: "/hub", icon: KeyRound },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Wallet", href: "/wallet", icon: Wallet },
  { label: "Referrals", href: "/referral", icon: Share2 },
  { label: "Login", href: "/auth", icon: LogIn }
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Navigation (Sub-header) */}
      <nav className="hidden md:block border-b border-border bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-8 flex items-center space-x-1 py-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-slate-800 text-teal border-l-2 border-teal"
                    : "text-gray-400 hover:text-white hover:bg-slate-850"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal' : 'text-gray-500'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Floating Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 border-t border-border/80 backdrop-blur-lg px-2 py-1">
        <div className="flex items-center justify-around">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
                  isActive
                    ? "text-teal"
                    : "text-gray-500"
                }`}
              >
                <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-teal' : ''}`} />
                <span className="text-[9px] font-bold tracking-tight">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
