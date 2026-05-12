import React from 'react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-32 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="aspect-square bg-[#5A5A40] rounded-[60px] overflow-hidden rotate-3">
            <img 
              src="/about.webp" 
              alt="Spa Interior"
              className="w-full h-full object-cover opacity-60 -rotate-3 scale-110"
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[40px] shadow-xl hidden md:block"
          >
            <p className="text-4xl font-serif italic mb-2">12+</p>
            <p className="text-[10px] uppercase tracking-widest font-bold text-black/40">Years of Serenity</p>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-black/30 font-bold mb-4">The Philosophy</h3>
          <h2 className="text-5xl font-serif italic mb-8 leading-tight">Ethiopia's Premier <br /> Wellness Sanctuary</h2>
          <p className="text-lg text-black/60 leading-relaxed mb-10 font-light">
            WE GLOW WELLNESS SPA in Addis Ababa was founded on the principle that true wellness is a balance between the physical and the spiritual. As the best spa in Ethiopia, we combine ancient healing techniques with modern comfort to create a sanctuary where you can disconnect from the noise and reconnect with yourself.
          </p>
          <div className="grid grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="font-serif italic text-xl mb-2">Organic Oils</h4>
              <p className="text-sm text-black/40">Sourced from sustainable farms across the globe.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="font-serif italic text-xl mb-2">Expert Staff</h4>
              <p className="text-sm text-black/40">Certified therapists with a passion for healing.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
