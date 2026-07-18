"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, KeyRound, LayoutDashboard, Wallet, Share2, LogIn } from 'lucide-react';

const NAV_ITEMS = [
  { label: "Finder",     href: "/finder",    icon: Compass },
  { label: "Secret Hub", href: "/hub",       icon: KeyRound },
  { label: "Dashboard",  href: "/dashboard", icon: LayoutDashboard },
  { label: "Wallet",     href: "/wallet",    icon: Wallet },
  { label: "Referrals",  href: "/referral",  icon: Share2 },
  { label: "Login",      href: "/auth",      icon: LogIn },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* ─── Desktop Sub-Navigation ─── */}
      <nav
        className="hidden md:block"
        style={{
          background: 'rgba(10, 15, 30, 0.6)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(30, 42, 69, 0.6)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center gap-1 py-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                id={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
                className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  color: isActive ? '#60A5FA' : '#64748B',
                  background: isActive ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                  border: isActive ? '1px solid rgba(37, 99, 235, 0.2)' : '1px solid transparent',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#CBD5E1';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(30, 42, 69, 0.4)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#64748B';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                  }
                }}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{item.label}</span>
                {isActive && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #2563EB, #0EA5E9)' }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ─── Mobile Bottom Navigation ─── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-2 py-2"
        style={{
          background: 'rgba(10, 15, 30, 0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderTop: '1px solid rgba(30, 42, 69, 0.7)',
        }}
      >
        <div className="flex items-center justify-around">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                id={`mobile-nav-${item.label.toLowerCase().replace(' ', '-')}`}
                className="flex flex-col items-center justify-center py-2 px-3 rounded-2xl transition-all duration-200 relative"
                style={{
                  color: isActive ? '#60A5FA' : '#475569',
                  minWidth: 48,
                }}
              >
                {isActive && (
                  <span
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #2563EB, #0EA5E9)' }}
                  />
                )}
                <div
                  className="p-1.5 rounded-xl mb-0.5 transition-all duration-200"
                  style={{
                    background: isActive ? 'rgba(37, 99, 235, 0.15)' : 'transparent',
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-bold tracking-tight leading-none">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
