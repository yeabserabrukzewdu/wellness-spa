import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Phone, Loader2, LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { UserProfile } from '../../types';

interface ProfileModalProps {
  user: UserProfile | null;
  onClose: () => void;
  onUpdate: (updatedUser: UserProfile) => void;
  onSignOut: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ user, onClose, onUpdate, onSignOut }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [phone, setPhone] = useState(user?.phone || '');
  const [name, setName] = useState(user?.name || '');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('users')
        .update({ name, phone })
        .eq('id', user.id);
      
      if (error) throw error;
      
      onUpdate({ ...user, name, phone });
      onClose();
    } catch (err) {
      console.error("Profile update error:", err);
      alert("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-white rounded-[48px] shadow-2xl overflow-hidden"
      >
        <div className="p-10 space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-serif italic">Your Profile</h3>
            <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
              <X className="w-6 h-6 text-black/20" />
            </button>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-[40px] bg-[#F5F5F0] border-4 border-white shadow-xl overflow-hidden flex items-center justify-center">
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} className="w-full h-full object-cover" alt="" />
                ) : (
                  <User className="w-12 h-12 text-black/10" />
                )}
              </div>
            </div>
            
            <div className="text-center">
              <p className="font-bold text-sm tracking-tight">{user?.name || 'Concierge'}</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-black/30 mt-1">{user?.email}</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6 pt-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-4">Display Name</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F5F5F0] border-none rounded-2xl pl-12 pr-6 py-4 text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-4">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                <input 
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+251 ..."
                  className="w-full bg-[#F5F5F0] border-none rounded-2xl pl-12 pr-6 py-4 text-sm"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                type="submit"
                disabled={isSaving}
                className="flex-1 bg-[#141414] text-white py-5 rounded-[24px] text-[12px] uppercase tracking-widest font-bold hover:brightness-125 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
              </button>
            </div>
          </form>

          <div className="pt-8 border-t border-black/5 flex flex-col gap-3">
            <button 
              onClick={onSignOut}
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-red-50 text-red-500 font-bold text-[11px] uppercase tracking-widest hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out from Sanctuary
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
