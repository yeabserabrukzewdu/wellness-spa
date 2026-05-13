import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';
import { SERVICES, Service } from '../../constants';

interface ServicesProps {
  onReserve: (serviceName: string) => void;
  services: Service[];
}

export const Services: React.FC<ServicesProps> = ({ onReserve, services }) => {
  const [activeCategory, setActiveCategory] = useState("Massages");
  const categories = ["Massages", "Moroccan Baths", "Nails & Care"];

  return (
    <section id="services" className="py-32 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] uppercase tracking-[0.5em] text-[#5A5A40] font-bold mb-4"
            >
              Curated Experiences
            </motion.h3>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif italic mb-6 leading-tight"
            >
              Our Signature <br /> Rituals
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-black/50 text-base md:text-lg font-light leading-relaxed"
            >
              Choose from our selection of organic treatments, each designed to harmonize your physical body with your spiritual essence.
            </motion.p>
          </div>
          
          <div className="flex flex-wrap gap-3 p-1.5 bg-[#F5F5F0] rounded-2xl w-fit">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-xl text-[11px] uppercase tracking-widest font-bold transition-all duration-500 ${
                  activeCategory === category 
                  ? "bg-white text-[#5A5A40] shadow-sm" 
                  : "text-black/40 hover:text-black hover:bg-white/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            >
              {services.filter(s => s.category === activeCategory).map((service, i) => (
                <ServiceCard key={service.name} service={service} index={i} onReserve={onReserve} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  service: Service;
  index: number;
  onReserve: (serviceName: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, onReserve }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="group relative"
    >
      <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 bg-[#F5F5F0] border border-black/[0.03] transition-all duration-500 group-hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] group-hover:-translate-y-2">
        {service.video_url ? (
           <video 
             src={service.video_url} 
             className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
             autoPlay muted loop playsInline
           />
        ) : (
          <img 
            src={service.image_url || `https://picsum.photos/seed/${service.name}/800/1000`} 
            alt={service.name}
            className="w-full h-full object-cover transition-transform duration-[1.5s] cubic-bezier(0.22, 1, 0.36, 1) group-hover:scale-110 opacity-90 group-hover:opacity-100"
            referrerPolicy="no-referrer"
          />
        )}
        
        {/* Floating Price Tag */}
        <div className="absolute top-6 right-6 z-10">
          <div className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-[#5A5A40] shadow-xl border border-white/20">
            {service.price} ETB
          </div>
        </div>

        {/* Hover Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-[1px] bg-white/40" />
              <span className="text-[9px] text-white/60 uppercase tracking-[0.3em] font-bold">{service.category}</span>
            </div>
            <p className="text-white/80 text-xs leading-relaxed italic line-clamp-4 font-light">
              {service.description}
            </p>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onReserve(service.name);
              }}
              className="w-full bg-white text-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] font-bold shadow-2xl hover:bg-[#5A5A40] hover:text-white transition-all transform hover:scale-[1.02]"
            >
              Reserve Session
            </button>
          </motion.div>
        </div>
      </div>

      <div className="px-2 transition-transform duration-500 group-hover:translate-x-2">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xl font-serif italic text-black/80">{service.name}</h4>
          <span className="text-[9px] font-bold text-black/20 uppercase tracking-widest">{service.duration}</span>
        </div>
        <button 
          onClick={() => onReserve(service.name)}
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 group-hover:text-[#5A5A40] flex items-center gap-3 transition-all"
        >
          View Details
          <div className="w-6 h-[1px] bg-black/10 group-hover:bg-[#5A5A40] group-hover:w-12 transition-all" />
        </button>
      </div>
    </motion.div>
  );
}
