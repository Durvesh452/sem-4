"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Mail, Lock, Sparkles, Loader2, ArrowRight } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate backend JWT sign in
    await new Promise(resolve => setTimeout(resolve, 1500));

    setLoading(false);
    // Go to dashboard upon successful fake login
    router.push('/dashboard');
  };

  const triggerGoogleLogin = async () => {
    setLoading(true);
    // Simulate OAuth redirect & check
    await new Promise(resolve => setTimeout(resolve, 1200));
    setLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto space-y-8 py-8">
      {/* 1. Brand / Header */}
      <div className="space-y-2 text-center">
        <span className="bg-teal/15 text-teal text-[10px] font-black px-2.5 py-0.5 rounded-full border border-teal/20 inline-block uppercase tracking-wider">
          JWT + OAuth Secured
        </span>
        <h1 className="text-3xl font-black">
          {isLogin ? "Welcome" : "Create Account"} <span className="text-teal">Back</span>
        </h1>
        <p className="text-xs text-gray-400">Sign in to unlock optimized subscription alternatives and earn HPH tokens.</p>
      </div>

      {/* 2. Login/Signup Card */}
      <div className="glass-card rounded-2xl p-6 md:p-8 border border-border space-y-6">
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] text-gray-400 uppercase font-black tracking-widest block">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="satoshi@bitcoin.org"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-900 border border-border rounded-xl text-white font-medium text-xs focus:outline-none focus:border-teal"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-gray-400 uppercase font-black tracking-widest block">Account Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-900 border border-border rounded-xl text-white font-medium text-xs focus:outline-none focus:border-teal"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-teal hover:brightness-110 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>{isLogin ? "Authenticate Credentials" : "Register Account"}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-border"></div>
          <span className="flex-shrink mx-3 text-[10px] text-gray-500 font-extrabold uppercase">or check secure oauth</span>
          <div className="flex-grow border-t border-border"></div>
        </div>

        {/* Google OAuth Simulation Button */}
        <button
          onClick={triggerGoogleLogin}
          disabled={loading}
          className="w-full py-2.5 bg-slate-900 border border-border hover:border-gray-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
        >
          <span className="text-base">🌐</span>
          <span>Continue with Google Passport</span>
        </button>

        {/* Card Footer toggle */}
        <div className="text-center pt-2">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs text-gray-400 hover:text-teal font-semibold transition-colors"
          >
            {isLogin ? "Don't have an optimized account? Register now" : "Already have an account? Sign in here"}
          </button>
        </div>
      </div>
    </div>
  );
}
