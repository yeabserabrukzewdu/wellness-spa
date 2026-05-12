import React from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, Calendar, Clock } from 'lucide-react';
import { BOOKING_TIMES } from '../../constants';
import { Service } from '../../types';

interface BookingProps {
  services: Service[];
  bookingRef: React.RefObject<HTMLDivElement | null>;
  bookingData: {
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    service: string;
  };
  setBookingData: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export const Booking: React.FC<BookingProps> = ({ bookingRef, bookingData, setBookingData, onSubmit, loading, services }) => {
  return (
    <section ref={bookingRef} id="booking" className="py-32 px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-black/30 font-bold mb-4">Reservation</h3>
          <h2 className="text-5xl font-serif italic mb-8">Secure Your <br /> Moment of Peace</h2>
          <p className="text-black/50 leading-relaxed mb-12 font-light">
            Each appointment is a commitment to your well-being. Please select your preferred treatment and time, and our concierge will confirm your session shortly.
          </p>
          <div className="space-y-6">
            <div className="flex gap-6 items-center">
              <div className="w-12 h-12 rounded-full bg-[#F5F5F0] flex items-center justify-center text-[#5A5A40]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-black/30">Hours</p>
                <p className="text-sm font-semibold">Tues – Sun: 9:00 AM – 8:00 PM</p>
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="w-12 h-12 rounded-full bg-[#F5F5F0] flex items-center justify-center text-[#5A5A40]">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-black/30">Notice</p>
                <p className="text-sm font-semibold">24-hour rescheduling preferred</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#F5F5F0] p-10 md:p-12 rounded-[40px] shadow-2xl shadow-black/5"
        >
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                <input 
                  type="text" 
                  placeholder="Full Name"
                  required
                  className="w-full bg-white border border-black/5 px-12 py-4 rounded-2xl text-sm focus:outline-none focus:border-[#5A5A40] transition-colors"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                <input 
                  type="email" 
                  placeholder="Email Address"
                  required
                  className="w-full bg-white border border-black/5 px-12 py-4 rounded-2xl text-sm focus:outline-none focus:border-[#5A5A40] transition-colors"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                <input 
                  type="tel" 
                  placeholder="Phone Number"
                  required
                  className="w-full bg-white border border-black/5 px-12 py-4 rounded-2xl text-sm focus:outline-none focus:border-[#5A5A40] transition-colors"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input 
                type="date" 
                required
                className="bg-white border border-black/5 px-6 py-4 rounded-2xl text-sm focus:outline-none focus:border-[#5A5A40] transition-colors shrink-all-unset"
                value={bookingData.date}
                onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
              />
              <select 
                required
                className="bg-white border border-black/5 px-6 py-4 rounded-2xl text-sm focus:outline-none focus:border-[#5A5A40] transition-colors"
                value={bookingData.time}
                onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
              >
                <option value="">Select Time</option>
                {BOOKING_TIMES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <select 
              required
              className="w-full bg-white border border-black/5 px-6 py-4 rounded-2xl text-sm focus:outline-none focus:border-[#5A5A40] transition-colors"
              value={bookingData.service}
              onChange={(e) => setBookingData({...bookingData, service: e.target.value})}
            >
              <option value="">Choose Treatment</option>
              {services.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
            </select>

            <button 
              disabled={loading}
              className="w-full bg-[#141414] text-white py-5 rounded-3xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#5A5A40] transition-all disabled:opacity-50"
            >
              {loading ? "Processing..." : "Complete Reservation"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
