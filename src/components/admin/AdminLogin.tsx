import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, LogIn, User, Lock, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface AdminLoginProps {
  onLogin: (success: boolean, type?: 'google' | 'admin') => void;
  onClose: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [useAdminForm, setUseAdminForm] = useState(true);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Static check for demo/management access
    // In a real app, you'd verify this against your secure backend or Firebase Auth
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        onLogin(true, 'admin');
      } else {
        setError('Invalid administrator credentials');
        setLoading(false);
      }
    }, 800);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
      // Note: Oauth redirect will happen, App.tsx listener will catch session on return
    } catch (err: any) {
      console.error("Login failed", err);
      setError(err.message || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md bg-[#FAF9F6] rounded-[48px] p-12 shadow-2xl overflow-hidden"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2 hover:bg-black/5 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-10 text-center">
          <h2 className="text-3xl font-serif italic mb-2">Management Access</h2>
          <p className="text-[10px] uppercase tracking-widest font-bold text-black/30">Secure Sanctuary Portal</p>
        </div>

        {useAdminForm ? (
          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-4">Username</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                <input 
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-white border border-black/5 rounded-2xl pl-12 pr-6 py-4 text-sm shadow-sm focus:ring-2 focus:ring-black/5 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-4">Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-black/5 rounded-2xl pl-12 pr-6 py-4 text-sm shadow-sm focus:ring-2 focus:ring-black/5 transition-all outline-none"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-5 rounded-[24px] text-[11px] uppercase tracking-widest font-bold hover:brightness-125 transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 mt-4"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Access Management
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-black/5"></div></div>
              <div className="relative flex justify-center text-[9px] uppercase tracking-[0.2em] font-bold"><span className="bg-[#FAF9F6] px-4 text-black/20">or connect via</span></div>
            </div>

            <button 
              type="button"
              onClick={() => setUseAdminForm(false)}
              className="w-full py-4 text-[10px] uppercase tracking-widest font-bold text-black/40 hover:text-black transition-colors"
            >
              Sign in with Google
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <button 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white border border-black/10 text-black py-5 rounded-[24px] text-[11px] uppercase tracking-widest font-bold hover:bg-black/5 transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-3"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Continue with Google
                </>
              )}
            </button>
            <button 
              onClick={() => setUseAdminForm(true)}
              className="w-full py-4 text-[10px] uppercase tracking-widest font-bold text-black/40 hover:text-black transition-colors"
            >
              Use Admin Credentials
            </button>
          </div>
        )}

        {error && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-red-500 text-[9px] uppercase tracking-widest font-bold text-center bg-red-50 py-3 rounded-xl"
          >
            {error}
          </motion.p>
        )}

        <p className="mt-10 text-center text-[9px] uppercase tracking-widest font-bold text-black/10">
          WE GLOW Wellness Spa • Authentication Portal
        </p>
      </motion.div>
    </div>
  );
};
