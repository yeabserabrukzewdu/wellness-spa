import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Search, ChevronRight, User as UserIcon } from 'lucide-react';
import { Service, UserProfile } from '../../types';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  scrollToBooking: () => void;
  services: Service[];
  user: UserProfile | null;
  onProfileClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen, scrollToBooking, services, user, onProfileClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredServices = services.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  const handleServiceClick = (serviceName: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || isSearchOpen ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <div 
          className={`text-2xl font-serif italic tracking-tight cursor-pointer transition-colors duration-500 ${isScrolled || isSearchOpen ? 'text-black' : 'text-white'}`}
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          WE GLOW
        </div>
        
        {/* Center Navigation */}
        <div className={`hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors duration-500 ${isScrolled || isSearchOpen ? 'text-black/60' : 'text-white/80'}`}>
          <a href="#about" className="hover:text-[#5A5A40] transition-colors">Home</a>
          <a href="#services" className="hover:text-[#5A5A40] transition-colors">General Care</a>
          <a href="#gallery" className="hover:text-[#5A5A40] transition-colors">Gallery</a>
          <a href="#testimonials" className="hover:text-[#5A5A40] transition-colors">Reviews</a>
        </div>

        {/* Right Side Icons */}
        <div className={`flex items-center gap-6 transition-colors duration-500 ${isScrolled || isSearchOpen ? 'text-black' : 'text-white'}`}>
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hover:scale-110 transition-transform p-2"
              aria-label="Search services"
            >
              {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>
            
            <button 
              onClick={onProfileClick}
              className="flex items-center gap-3 hover:scale-105 transition-all p-2 bg-black/5 hover:bg-black/10 rounded-full border border-white/10"
            >
              <div className="w-6 h-6 rounded-full bg-[#5A5A40] flex items-center justify-center overflow-hidden border border-white/20">
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} className="w-full h-full object-cover" alt="" />
                ) : (
                  <UserIcon className="w-3 h-3 text-white" />
                )}
              </div>
              <span className="text-[9px] uppercase tracking-widest font-bold hidden lg:inline-block">
                {user ? user.name.split(' ')[0] : 'Profile'}
              </span>
            </button>
          </div>
          
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border-t border-black/5 overflow-hidden"
          >
            <div className="max-w-3xl mx-auto p-8">
              <div className="relative">
                <input 
                  autoFocus
                  type="text"
                  placeholder="Search for Services (e.g., Massage, Facial, Moroccan)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F5F5F0] border-none rounded-2xl px-6 py-4 text-black placeholder:text-black/30 focus:ring-2 focus:ring-[#5A5A40] transition-all outline-none"
                />
                <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20" />
              </div>

              {searchQuery && (
                <div className="mt-6 space-y-4">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-black/30 px-2">Matching Services</p>
                  {filteredServices.length > 0 ? (
                    filteredServices.map((service, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => handleServiceClick(service.name)}
                        className="group flex items-center justify-between p-4 rounded-2xl hover:bg-[#F5F5F0] cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-white overflow-hidden shadow-sm">
                            <img src={service.image_url} className="w-full h-full object-cover" alt="" />
                          </div>
                          <div>
                            <p className="text-sm font-bold">{service.name}</p>
                            <p className="text-[11px] text-black/40">{service.category} • {service.duration}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-black/20 group-hover:text-[#5A5A40] transition-colors" />
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-sm text-black/40 p-2">No services found matching your search.</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-black/5 overflow-hidden shadow-2xl p-8"
          >
            <div className="flex flex-col gap-6 text-[12px] uppercase tracking-widest font-bold text-black/60">
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
              <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>General Care</a>
              <a href="#gallery" onClick={() => setIsMobileMenuOpen(false)}>Gallery</a>
              <a href="#testimonials" onClick={() => setIsMobileMenuOpen(false)}>Reviews</a>
              <div className="pt-6 border-t border-black/5">
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#F5F5F0] border-none rounded-xl px-4 py-3 text-sm"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                </div>
                {searchQuery && (
                  <div className="mt-4 space-y-2">
                    {filteredServices.map((service, idx) => (
                      <div 
                        key={idx}
                        onClick={() => handleServiceClick(service.name)}
                        className="p-3 bg-[#F5F5F0] rounded-xl text-sm font-medium"
                      >
                        {service.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
