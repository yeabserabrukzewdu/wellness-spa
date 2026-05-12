import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Service } from '../../types';

export const Services: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error("Failed to fetch services", err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...new Set(services.map(s => s.category))];
  const filteredServices = selectedCategory === 'All' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  return (
    <section id="services" className="py-32 px-4 md:px-8 bg-gradient-to-br from-[#F5F5F0] via-white to-[#F5F5F0]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h3 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.4em] text-black/30 font-bold mb-4"
          >
            Our Treatments
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif italic mb-8 leading-tight"
          >
            Curated Wellness <br /> Experiences
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-black/50 max-w-2xl mx-auto font-light"
          >
            Each service is thoughtfully designed to harmonize your body, mind, and spirit through ancient wisdom and modern wellness techniques.
          </motion.p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-[11px] uppercase tracking-widest font-bold transition-all ${
                selectedCategory === category
                  ? 'bg-[#5A5A40] text-white shadow-lg scale-105'
                  : 'bg-white text-black/60 border border-black/10 hover:border-black/20 hover:bg-black/5'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#5A5A40]"></div>
            <p className="mt-4 text-black/50">Loading services...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id || `${service.name}-${service.price}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
              {/* Service Image */}
              <div className="relative h-64 md:h-72 bg-gradient-to-br from-[#5A5A40]/10 to-[#5A5A40]/5 overflow-hidden">
                {service.imageUrl && (
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Service Content */}
              <div className="p-8 space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-xl font-serif italic leading-tight mb-2">
                      {service.name}
                    </h3>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-black/40 font-bold">
                      {service.category}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-black/60 leading-relaxed font-light">
                  {service.desc}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-black/10">
                  <div className="flex gap-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-black/30 font-bold mb-1">
                        Duration
                      </p>
                      <p className="text-sm font-semibold text-black">
                        {service.duration}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-black/30 font-bold mb-1">
                        Price
                      </p>
                      <p className="text-sm font-semibold text-[#5A5A40]">
                        ETB {service.price}
                      </p>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const bookingSection = document.getElementById('booking');
                    bookingSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full mt-4 bg-[#5A5A40] text-white py-3 rounded-xl text-[11px] uppercase tracking-widest font-bold hover:brightness-110 transition-all duration-300"
                >
                  Book Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
};
