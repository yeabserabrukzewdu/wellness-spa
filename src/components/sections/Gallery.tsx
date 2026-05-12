import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Instagram, ArrowRight, Play, Pause } from 'lucide-react';
import { GALLERY_ITEMS, SOCIAL_LINKS } from '../../constants';

export const Gallery: React.FC = () => {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  const togglePlay = (id: number) => {
    const video = videoRefs.current[id];
    if (!video) return;

    if (playingId === id) {
      video.pause();
      setPlayingId(null);
    } else {
      // Pause currently playing video if any
      if (playingId !== null && videoRefs.current[playingId]) {
        videoRefs.current[playingId]?.pause();
      }
      
      video.play();
      setPlayingId(id);
    }
  };

  return (
    <section id="gallery" className="py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[10px] uppercase tracking-[0.4em] text-black/30 font-bold mb-4"
            >
              Visual Serenity
            </motion.h3>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl font-serif italic"
            >
              Our Sanctuary
            </motion.h2>
          </div>
          <motion.a 
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-[11px] uppercase tracking-widest font-bold border-b border-black/10 pb-2 hover:border-[#5A5A40] transition-all group"
          >
            Follow our Journey
            <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </motion.a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="aspect-[9/16] bg-[#F5F5F0] rounded-[2rem] overflow-hidden shadow-sm group relative cursor-pointer"
              onClick={() => item.videoUrl && togglePlay(item.id)}
            >
              {item.videoUrl ? (
                <div className="w-full h-full relative">
                  <video 
                    ref={(el) => (videoRefs.current[item.id] = el)}
                    src={item.videoUrl} 
                    className={`w-full h-full object-cover transition-all duration-1000 ${playingId === item.id ? 'opacity-100 scale-105' : 'opacity-0'}`}
                    loop 
                    muted={false} // User probably wants sound if they play it manually
                    playsInline
                    onPlay={() => setPlayingId(item.id)}
                    onPause={() => playingId === item.id && setPlayingId(null)}
                  />
                  
                  {/* Placeholder Image Overlay */}
                  <img 
                    src={item.imageUrl} 
                    alt={item.type}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${playingId === item.id ? 'opacity-0 pointer-events-none' : 'opacity-80 group-hover:opacity-100 group-hover:scale-105'}`}
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Play/Pause Overlay */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 z-10 ${playingId === item.id ? 'bg-transparent' : 'bg-black/20 group-hover:bg-black/10'}`}>
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 scale-90 group-hover:scale-100 transition-transform duration-500 shadow-xl">
                      {playingId === item.id ? (
                        <Pause className="w-6 h-6 text-white fill-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <img 
                  src={item.imageUrl} 
                  alt={item.type}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <motion.a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-4 bg-[#141414] text-white px-12 py-5 rounded-full text-sm font-semibold tracking-wider hover:bg-[#5A5A40] transition-all shadow-xl shadow-black/10"
          >
            Explore More on Instagram
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};
