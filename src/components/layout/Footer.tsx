import React from 'react';
import { Instagram, Facebook, Send } from 'lucide-react';
import { TikTokIcon } from '../Icons';
import { CONTACT_INFO, SOCIAL_LINKS } from '../../constants';

interface FooterProps {
  onAdminClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="py-20 px-8 border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-serif italic mb-2 uppercase">WE GLOW</h2>
          <p className="text-[10px] text-black/40 uppercase tracking-widest font-bold">
            {CONTACT_INFO.fullLocation}
          </p>
          <p className="text-[10px] text-black/40 uppercase tracking-widest font-bold">
            {CONTACT_INFO.phone}
          </p>
          <p className="text-[10px] text-black/30 uppercase tracking-widest font-bold mt-4">
            © {new Date().getFullYear()} WE GLOW WELLNESS SPA. All rights reserved.
          </p>
          <p className="text-[9px] text-black/20 uppercase tracking-widest font-bold mt-1">
            Developed by <a href="https://semaysystems.com" target="_blank" rel="noopener noreferrer" className="hover:text-black/40 transition-colors cursor-pointer">Semay Systems</a>
          </p>
        </div>
        
        <div className="flex gap-8 items-center">
          <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer">
            <Instagram className="w-5 h-5 text-black/40 hover:text-[#5A5A40] cursor-pointer transition-colors" />
          </a>
          <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer">
            <TikTokIcon className="w-5 h-5 text-black/40 hover:text-[#5A5A40] cursor-pointer transition-colors" />
          </a>
          <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer">
            <Facebook className="w-5 h-5 text-black/40 hover:text-[#5A5A40] cursor-pointer transition-colors" />
          </a>
          <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noopener noreferrer">
            <Send className="w-5 h-5 text-black/40 hover:text-[#5A5A40] cursor-pointer transition-colors -rotate-45" />
          </a>
        </div>

        <div className="flex gap-10 text-[10px] uppercase tracking-widest font-bold text-black/40">
          <span className="hover:text-[#5A5A40] cursor-pointer transition-colors">Privacy</span>
          <span className="hover:text-[#5A5A40] cursor-pointer transition-colors">Terms</span>
          <span 
            onClick={onAdminClick}
            className="hover:text-[#5A5A40] cursor-pointer transition-colors"
          >
            Management
          </span>
        </div>
      </div>
    </footer>
  );
};
