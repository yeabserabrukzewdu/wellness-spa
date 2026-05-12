import React from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  heroOpacity: MotionValue<number>;
  heroScale: MotionValue<number>;
  scrollToBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ heroOpacity, heroScale, scrollToBooking }) => {
  const [videoLoaded, setVideoLoaded] = React.useState(false);

  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-[#141414]">
      {/* Background Media Container */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder Image */}
        <img 
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=2070" 
          alt="Spa Serenity"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-60'} scale-105`}
        />
        
        {/* Hero Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          onCanPlayThrough={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-40' : 'opacity-0'} scale-105`}
          src="https://res.cloudinary.com/dlfdjcuat/video/upload/v1778273044/weglowweb_i7m53i.mp4"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      <motion.div 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-12"
      >
        <div className="max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-white text-6xl md:text-8xl font-serif mb-8 leading-[1.1]"
          >
            Best Spa in <br />
            <span className="italic font-light">Ethiopia</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-white/60 text-lg md:text-xl max-w-lg mb-12 leading-relaxed"
          >
            Experience world-class wellness at WE GLOW WELLNESS SPA in Bole, Addis Ababa. 
            Rediscover your inner peace with our tailored luxury treatments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            <button 
              onClick={scrollToBooking}
              className="group bg-[#E8D9C5] text-[#141414] px-12 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white transition-all duration-500 shadow-2xl flex items-center gap-3"
            >
              Begin Your Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative Blur Element */}
      <motion.div 
        animate={{ 
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-[#E8D9C5]/10 rounded-full blur-[120px] pointer-events-none"
      />
    </section>
  );
};
