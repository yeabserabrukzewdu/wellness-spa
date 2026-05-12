import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Lock, User } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
  onClose: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Credentials provided to user: admin / glow2024
    if (username === 'admin' && password === 'glow2024') {
      onLogin(true);
    } else {
      setError('Invalid username or password');
      onLogin(false);
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
        className="relative w-full max-w-md bg-[#FAF9F6] rounded-[40px] p-10 shadow-2xl overflow-hidden"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-black/5 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-10 text-center">
          <h2 className="text-3xl font-serif italic mb-2">Management Access</h2>
          <p className="text-[10px] uppercase tracking-widest font-bold text-black/30">Secure Administration Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-4">Username</label>
            <div className="relative">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
              <input 
                autoFocus
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white border border-black/5 rounded-2xl px-14 py-4 text-sm focus:ring-2 focus:ring-[#5A5A40] transition-all outline-none"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-4">Password</label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-black/5 rounded-2xl px-14 py-4 text-sm focus:ring-2 focus:ring-[#5A5A40] transition-all outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-[10px] uppercase tracking-widest font-bold text-center"
            >
              {error}
            </motion.p>
          )}

          <button 
            type="submit"
            className="w-full bg-[#141414] text-white py-5 rounded-2xl text-[11px] uppercase tracking-widest font-bold hover:bg-[#2A2A2A] transition-all shadow-xl active:scale-[0.98]"
          >
            Authenticate
          </button>
        </form>

        <p className="mt-8 text-center text-[9px] uppercase tracking-widest font-bold text-black/20">
          WE GLOW Wellness Spa • Internal Use Only
        </p>
      </motion.div>
    </div>
  );
};
