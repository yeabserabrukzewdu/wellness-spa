import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, X, MessageCircle } from 'lucide-react';
import { CONTACT_INFO, SOCIAL_LINKS } from '../../constants';

export const FloatingContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white p-6 rounded-[2rem] shadow-2xl border border-black/5 mb-2 w-72"
          >
            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-black/30 mb-2">Connect With Us</p>
                <a 
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#5A5A40]/10 flex items-center justify-center text-[#5A5A40] group-hover:bg-[#5A5A40] group-hover:text-white transition-all">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{CONTACT_INFO.phone}</p>
                    <p className="text-[10px] text-black/40">Call now for inquiries</p>
                  </div>
                </a>
              </div>

              <div className="pt-4 border-t border-black/5">
                <a 
                  href={SOCIAL_LINKS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#0088cc]/10 flex items-center justify-center text-[#0088cc] group-hover:bg-[#0088cc] group-hover:text-white transition-all">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Telegram</p>
                    <p className="text-[10px] text-black/40">Chat with our concierge</p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowNotification(false);
        }}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 relative ${
          isOpen ? 'bg-[#141414] text-white rotate-90' : 'bg-[#5A5A40] text-white hover:scale-110'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
        {showNotification && !isOpen && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white z-20"
          />
        )}
        
        {/* Soft Ambient Ripple Effect */}
        {showNotification && !isOpen && (
          <>
            <motion.div
              initial={{ scale: 1, opacity: 0.3 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-[#5A5A40] rounded-full -z-10"
            />
            <motion.div
              initial={{ scale: 1, opacity: 0.2 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
              className="absolute inset-0 bg-[#5A5A40] rounded-full -z-10"
            />
          </>
        )}
      </motion.button>
    </div>
  );
};
