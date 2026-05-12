import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Award, Clock, Leaf, MapPin } from 'lucide-react';
import { WHY_FEATURES, STATS } from '../../constants';

const ICONS = [
  <Award className="w-8 h-8" />,
  <Clock className="w-8 h-8" />,
  <Leaf className="w-8 h-8" />,
  <MapPin className="w-8 h-8" />
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="relative">
      {/* Upper Content with Background */}
      <div className="relative min-h-[600px] flex items-center py-20 px-8 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=2000" 
            alt="Spa Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] uppercase tracking-[0.5em] text-white/60 font-bold mb-4">What Else We Do</p>
            <h2 className="text-5xl md:text-7xl font-serif italic text-white mb-6">why choose us</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black/20 backdrop-blur-md p-8 md:p-12 rounded-[40px] border border-white/10"
          >
            <ul className="space-y-4">
              {WHY_FEATURES.map((feature, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 text-white/90"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#5A5A40] shrink-0" />
                  <span className="text-sm md:text-base font-medium tracking-wide">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 px-8 border-b border-black/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-[#5A5A40]/5 flex items-center justify-center text-[#5A5A40] mb-6 group-hover:scale-110 transition-transform duration-500">
                {ICONS[i]}
              </div>
              <h3 className="text-4xl md:text-6xl font-serif italic mb-2">{stat.value}</h3>
              <p className="text-[10px] uppercase tracking-widest font-bold text-black/30 whitespace-nowrap">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
