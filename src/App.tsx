import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { supabase } from './lib/supabase';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { WhyChooseUs } from './components/sections/WhyChooseUs';
import { Gallery } from './components/sections/Gallery';
import { Testimonials } from './components/sections/Testimonials';
import { Booking } from './components/sections/Booking';
import { Footer } from './components/layout/Footer';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLogin } from './components/admin/AdminLogin';
import { FloatingContact } from './components/ui/FloatingContact';
import { UserProfile, Appointment, AdminData, Service } from './types';
import { ProfileModal } from './components/ui/ProfileModal';

export default function App() {
  // Authentication & View state
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'user'|'admin'>('user');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('admin_session');
      sessionStorage.removeItem('admin_authenticated');
      setUser(null);
      setIsAdminMode(false);
      setShowProfile(false);
      setView('user');
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const updateUserInfo = (updated: UserProfile) => {
    setUser(updated);
  };

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
    // 1. Auth Listener
    const hasAdminSession = localStorage.getItem('admin_session') === 'active';
    if (hasAdminSession) {
      setIsAdminMode(true);
      setUser({ id: 'admin', name: 'Master Admin', email: 'admin@weglow.com', phone: '', role: 'admin' });
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const sbUser = session?.user;
      
      if (sbUser) {
        try {
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', sbUser.id)
            .single();

          if (userData) {
            setUser(userData as UserProfile);
            if (userData.role === 'admin' || sbUser.email === 'yeabserabruk1234@gmail.com') {
              setIsAdminMode(true);
            }
          } else {
            // First time login - creating profile
            const newUserData = {
              id: sbUser.id,
              name: sbUser.user_metadata?.full_name || '',
              email: sbUser.email || '',
              phone: '',
              role: sbUser.email === 'yeabserabruk1234@gmail.com' ? 'admin' : 'customer'
            };
            await supabase.from('users').insert([newUserData]);
            setUser(newUserData as UserProfile);
            if (newUserData.role === 'admin') setIsAdminMode(true);
          }
        } catch (error) {
          console.error("User profile error:", error);
        }
      } else {
        if (localStorage.getItem('admin_session') !== 'active') {
          setUser(null);
          setIsAdminMode(false);
        }
      }
    });

    // 2. Services Real-time Listener
    const channel = supabase
      .channel('services_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, async () => {
        const { data } = await supabase.from('services').select('*');
        if (data) setServices(data as Service[]);
      })
      .subscribe();

    const fetchInitialServices = async () => {
      try {
        const { data, error } = await supabase.from('services').select('*');
        if (error) throw error;
        if (data) {
          setServices(data as Service[]);
          if (data.length > 0 && !bookingData.service) {
            setBookingData(prev => ({ ...prev, service: data[0].name }));
          }
        }
      } catch (error) {
        console.error("Critical error fetching services:", error);
      }
    };
    fetchInitialServices();

    return () => {
      subscription.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [usersRes, appointmentsRes] = await Promise.all([
        supabase.from('users').select('*'),
        supabase.from('appointments').select('*').order('date', { ascending: false })
      ]);

      const users = (usersRes.data || []) as UserProfile[];
      const appointments = (appointmentsRes.data || []) as any[];

      const total_revenue = appointments.reduce((acc, a) => acc + (a.price || 0), 0);
      const total_bookings = appointments.length;
      const total_customers = users.length;

      setAdminData({ 
        users, 
        appointments, 
        stats: { total_revenue, total_bookings, total_customers } 
      });
    } catch (error) {
      console.error("Admin data error:", error);
    } finally {
      setLoading(false);
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
      const appointmentData = {
        user_id: user?.id || null, // Allow null for guests
        user_name: bookingData.name,
        user_email: bookingData.email,
        user_phone: bookingData.phone,
        date: bookingData.date,
        time: bookingData.time,
        service: bookingData.service,
        price: selectedService?.price || 0,
        status: 'confirmed'
      };

      await supabase.from('appointments').insert([appointmentData]);
      
      // Update phone in user profile if changed and logged in
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user && user && user.phone !== bookingData.phone) {
        await supabase.from('users').update({ phone: bookingData.phone }).eq('id', session.user.id);
      }

      alert(`Serenity Reserved! Our concierge will contact you soon.`);
      setBookingData({ ...bookingData, name: '', email: '', phone: '', date: '', time: '' });
      setShowBookingModal(false);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = (success: boolean, type?: 'google' | 'admin') => {
    if (success) {
      if (type === 'admin') {
        setIsAdminMode(true);
        setUser({ id: 'admin', name: 'Master Admin', email: 'admin@weglow.com', phone: '', role: 'admin' });
        setView('admin');
        localStorage.setItem('admin_session', 'active');
      }
      setShowLoginModal(false);
    }
  };

  const handleRefreshAll = async () => {
    if (view === 'admin') await fetchAdminData();
  };

  const handleAdminClick = () => {
    setView('admin');
  };

  if (view === 'admin') {
    return (
      <AdminDashboard 
        adminData={adminData} 
        setView={setView} 
        onRefresh={handleRefreshAll} 
        onSignOut={handleSignOut} 
        onLoginSuccess={handleAdminLogin}
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
          user={user}
          onProfileClick={() => user ? setShowProfile(true) : setShowLoginModal(true)}
        />

        <Hero 
          heroOpacity={heroOpacity} 
          heroScale={heroScale} 
          scrollToBooking={scrollToBooking} 
        />

        <About />

        <Services 
          services={services}
          onReserve={(serviceName) => {
            setBookingData({ ...bookingData, service: serviceName });
            scrollToBooking();
          }} 
        />

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

        <Footer onAdminClick={handleAdminClick} />

        <AnimatePresence>
          {showLoginModal && (
            <AdminLogin 
              onLogin={handleAdminLogin} 
              onClose={() => setShowLoginModal(false)} 
            />
          )}
          {showProfile && (
            <ProfileModal 
              user={user}
              onClose={() => setShowProfile(false)}
              onUpdate={updateUserInfo}
              onSignOut={handleSignOut}
            />
          )}
        </AnimatePresence>

        <FloatingContact />
      </motion.div>
    </AnimatePresence>
  );
}
