"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Mail, Lock, Loader2, ArrowRight, Sparkles } from 'lucide-react';
import { HPHLogo } from '@/components/Header';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    router.push('/dashboard');
  };

  const triggerGoogleLogin = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-md space-y-8">

        {/* Brand header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <HPHLogo />
          </div>
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-3"
              style={{ background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)', color: '#2DD4BF' }}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              JWT + OAuth Secured
            </div>
            <h1 className="text-3xl font-extrabold text-white">
              {isLogin ? 'Welcome back' : 'Create account'}
            </h1>
            <p className="text-sm mt-1.5" style={{ color: '#64748B' }}>
              Sign in to unlock optimized subscription plans and earn HPH tokens.
            </p>
          </div>
        </div>

        {/* Auth Card */}
        <div
          className="rounded-3xl p-6 md:p-8 space-y-5"
          style={{
            background: 'linear-gradient(145deg, rgba(15,22,41,0.95) 0%, rgba(12,18,40,0.9) 100%)',
            border: '1px solid rgba(30,42,69,0.7)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
          }}
        >
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest block" style={{ color: '#475569' }}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
                <input
                  id="auth-email"
                  type="email"
                  required
                  placeholder="satoshi@bitcoin.org"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="input-base pl-11"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest block" style={{ color: '#475569' }}>
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
                <input
                  id="auth-password"
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="input-base pl-11"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              id="auth-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-95 disabled:opacity-70"
              style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
                boxShadow: '0 4px 15px rgba(37,99,235,0.3)',
              }}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-1">
            <div className="flex-grow" style={{ borderTop: '1px solid rgba(30,42,69,0.7)' }} />
            <span className="flex-shrink mx-4 text-[10px] font-bold uppercase" style={{ color: '#334155' }}>
              or continue with
            </span>
            <div className="flex-grow" style={{ borderTop: '1px solid rgba(30,42,69,0.7)' }} />
          </div>

          {/* Google OAuth */}
          <button
            id="google-oauth-btn"
            onClick={triggerGoogleLogin}
            disabled={loading}
            className="w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all hover:scale-105 active:scale-95"
            style={{
              background: 'rgba(15,22,41,0.6)',
              border: '1px solid rgba(30,42,69,0.7)',
              color: '#CBD5E1',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.48h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/>
              <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
            </svg>
            Continue with Google
          </button>

          {/* Toggle */}
          <div className="text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-semibold transition-colors hover:opacity-80"
              style={{ color: '#60A5FA' }}
            >
              {isLogin
                ? "Don't have an account? Register now →"
                : "Already have an account? Sign in →"}
            </button>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-6">
          {[
            { label: 'End-to-end encrypted' },
            { label: 'No card required' },
            { label: 'Free forever tier' },
          ].map(b => (
            <div key={b.label} className="flex items-center gap-1.5 text-xs" style={{ color: '#334155' }}>
              <span>✓</span>
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
