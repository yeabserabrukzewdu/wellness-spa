import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services} from './components/sections/Services';
import { WhyChooseUs } from './components/sections/WhyChooseUs';
import { Gallery } from './components/sections/Gallery';
import { Testimonials } from './components/sections/Testimonials';
import { Booking } from './components/sections/Booking';
import { Footer } from './components/layout/Footer';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLogin } from './components/admin/AdminLogin';
import { FloatingContact } from './components/ui/FloatingContact';
import { UserProfile, Appointment, AdminData, Service } from './types';
import { SERVICES } from './constants';

export default function App() {
  // Authentication & View state
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'user'|'admin'>('user');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);

  // Booking Form State
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: ''
  });

  // Admin State
  const [adminData, setAdminData] = useState<AdminData | null>(null);

  // Scroll Animations
  const bookingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    fetchServices();
    const savedUser = localStorage.getItem('zen_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      if (parsedUser.email === 'admin@weglow.com') {
        setIsAdminMode(true);
      }
    }
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(data);
      if (data.length > 0 && !bookingData.service) {
        setBookingData(prev => ({ ...prev, service: data[0].name }));
      }
    } catch (err) {
      console.error("Failed to fetch services", err);
    }
  };

  const fetchAdminData = async () => {
    try {
      const [usersRes, appsRes, statsRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/appointments'),
        fetch('/api/admin/stats')
      ]);
      const users = await usersRes.json();
      const appointments = await appsRes.json();
      const stats = await statsRes.json();
      setAdminData({ users, appointments, stats });
    } catch (error) {
      console.error("Failed to fetch admin data", error);
    }
  };

  useEffect(() => {
    if (view === 'admin') fetchAdminData();
  }, [view]);

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const selectedService = services.find(s => s.name === bookingData.service);
      const payload = { ...bookingData, price: selectedService?.price || 0 };

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      if (data.user) {
        setUser(data.user);
        localStorage.setItem('zen_user', JSON.stringify(data.user));
      }
      
      alert(`Serenity Reserved! Our concierge will contact you soon.`);
      setBookingData({ ...bookingData, name: '', email: '', phone: '', date: '', time: '' });
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = (success: boolean) => {
    if (success) {
      setView('admin');
      setIsAdminMode(true);
      setShowAdminLogin(false);
    }
  };

  const handleRefreshAll = async () => {
    await Promise.all([fetchAdminData(), fetchServices()]);
  };

  if (view === 'admin') {
    return (
      <AdminDashboard 
        adminData={adminData} 
        setView={setView} 
        onRefresh={handleRefreshAll} 
        setUser={setUser} 
      />
    );
  }

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-[#141414] font-sans selection:bg-[#5A5A40] selection:text-white"
      >
        <Header 
          isMobileMenuOpen={isMobileMenuOpen} 
          setIsMobileMenuOpen={setIsMobileMenuOpen} 
          scrollToBooking={scrollToBooking} 
          services={services}
        />

        <Hero 
          heroOpacity={heroOpacity} 
          heroScale={heroScale} 
          scrollToBooking={scrollToBooking} 
        />

        <About />

        <Services />

        <WhyChooseUs />

        <Gallery />

        <Testimonials />

        <Booking 
          bookingRef={bookingRef}
          bookingData={bookingData}
          setBookingData={setBookingData}
          onSubmit={handleBooking}
          loading={loading}
          services={services}
        />

        <Footer onAdminClick={() => setShowAdminLogin(true)} />

        <AnimatePresence>
          {showAdminLogin && (
            <AdminLogin 
              onLogin={handleAdminLogin} 
              onClose={() => setShowAdminLogin(false)} 
            />
          )}
        </AnimatePresence>

        <FloatingContact />
      </motion.div>
    </AnimatePresence>
  );
}
