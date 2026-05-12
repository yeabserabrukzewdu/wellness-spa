import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../../constants';

export const Testimonials: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-32 px-8 bg-[#141414] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h3 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-bold mb-16"
        >
          Inner Voices
        </motion.h3>
        <div className="relative h-64 md:h-48 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#5A5A40] text-[#5A5A40]" />
                ))}
              </div>
              <p className="text-2xl md:text-3xl font-serif italic mb-8 leading-relaxed">
                "{TESTIMONIALS[activeTestimonial].text}"
              </p>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">
                — {TESTIMONIALS[activeTestimonial].name}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-4 mt-16">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveTestimonial(i)}
              className={`w-12 h-[1px] transition-all duration-500 ${activeTestimonial === i ? "bg-[#5A5A40] w-20" : "bg-white/10"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
