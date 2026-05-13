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
      className="group"
    >
      <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 bg-[#F5F5F0]">
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
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
            referrerPolicy="no-referrer"
          />
        )}
        
        {/* Play Icon if video exists */}
        {service.video_url && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-500">
             <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
               <Play className="w-5 h-5 text-white fill-white ml-0.5" />
             </div>
          </div>
        )}

        {/* Price Reveal & Info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8">
          <p className="text-white/80 text-xs leading-relaxed mb-4 italic line-clamp-4 font-light">
            {service.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-white font-serif italic text-2xl">{service.price} ETB</span>
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[9px] text-white uppercase tracking-widest font-bold">
              {service.duration}
            </span>
          </div>
        </div>

        <div className="absolute top-6 right-6 opacity-100 group-hover:opacity-0 transition-opacity duration-500">
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#5A5A40] shadow-sm">
            {service.price} ETB
          </div>
        </div>
      </div>

      <div className="px-1">
        <h4 className="text-xl font-serif italic mb-2 group-hover:text-[#5A5A40] transition-colors">{service.name}</h4>
        <button 
          onClick={() => onReserve(service.name)}
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 group-hover:text-[#5A5A40] flex items-center gap-2 transition-all"
        >
          Reserve Now
          <div className="w-4 h-[1px] bg-black/20 group-hover:bg-[#5A5A40] group-hover:w-8 transition-all" />
        </button>
      </div>
    </motion.div>
  );
}
