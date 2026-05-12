import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Calendar, Star, CheckCircle2, Trash2, LogOut, LayoutDashboard, Settings, Edit3, Image as ImageIcon, Plus, Save, Search, X } from 'lucide-react';
import { UserProfile, Appointment, AdminData, Service } from '../../types';

interface AdminDashboardProps {
  adminData: AdminData | null;
  setView: (view: 'user' | 'admin') => void;
  onRefresh: () => void;
  setUser: (user: null) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ adminData, setView, onRefresh, setUser }) => {
  const [activeTab, setActiveTab] = useState<'records' | 'services'>('records');
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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
    }
  };

  const handleDeleteService = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setServices(services.filter(s => s.id !== id));
      }
    } catch (err) {
      console.error("Error deleting service", err);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingService) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.imageUrl) {
        setEditingService({ ...editingService, imageUrl: data.imageUrl });
      }
    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    setIsSaving(true);

    try {
      const method = editingService.id ? 'PUT' : 'POST';
      const url = editingService.id ? `/api/services/${editingService.id}` : '/api/services';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingService)
      });

      if (res.ok) {
        await fetchServices();
        setEditingService(null);
      }
    } catch (err) {
      console.error("Error saving service", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F5F5F0]">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-white border-r border-black/5 p-8 flex flex-col justify-between hidden md:flex">
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-serif italic mb-1 uppercase">WE GLOW</h2>
            <p className="text-[10px] uppercase tracking-widest font-bold text-black/30">Management Terminal</p>
          </div>

          <nav className="space-y-4">
            <NavItem 
              active={activeTab === 'records'} 
              onClick={() => setActiveTab('records')}
              icon={<LayoutDashboard className="w-5 h-5" />}
              label="Records & Bookings"
            />
            <NavItem 
              active={activeTab === 'services'} 
              onClick={() => setActiveTab('services')}
              icon={<Settings className="w-5 h-5" />}
              label="Service Editor"
            />
          </nav>
        </div>

        <button 
          onClick={() => {
            setView('user');
            setUser(null);
            localStorage.removeItem('zen_user');
          }}
          className="flex items-center gap-3 p-4 text-red-500 rounded-2xl hover:bg-red-50 transition-all font-bold text-[11px] uppercase tracking-widest"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header Mobile Support */}
          <div className="flex md:hidden justify-between items-center mb-8 bg-white p-6 rounded-3xl">
            <h2 className="text-xl font-serif italic">Management</h2>
            <div className="flex gap-2">
              <button onClick={() => setActiveTab('records')} className={`p-2 rounded-lg ${activeTab === 'records' ? 'bg-[#5A5A40] text-white' : 'bg-black/5'}`}><LayoutDashboard className="w-5 h-5" /></button>
              <button onClick={() => setActiveTab('services')} className={`p-2 rounded-lg ${activeTab === 'services' ? 'bg-[#5A5A40] text-white' : 'bg-black/5'}`}><Settings className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl font-serif italic mb-2">
                {activeTab === 'records' ? 'Business Overview' : 'Service Management'}
              </h1>
              <p className="text-[10px] uppercase tracking-widest font-bold text-black/30">
                {activeTab === 'records' ? 'Live data and statistics' : 'Customize your offerings'}
              </p>
            </div>
            {activeTab === 'records' && (
              <button 
                onClick={onRefresh}
                className="bg-white border border-black/5 px-8 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold shadow-sm hover:bg-black/5 transition-all"
              >
                Sync Records
              </button>
            )}
            {activeTab === 'services' && (
              <button 
                onClick={() => setEditingService({ name: '', price: 0, duration: '', category: 'Massages', desc: '', imageUrl: '' })}
                className="bg-[#5A5A40] text-white px-8 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add New Service
              </button>
            )}
          </div>

          {activeTab === 'records' ? (
            <RecordsSection adminData={adminData} />
          ) : (
            <ServicesSection 
              services={services} 
              onEdit={(s) => setEditingService(s)} 
              onDelete={handleDeleteService}
            />
          )}
        </div>
      </main>

      {/* Service Editor Modal */}
      <AnimatePresence>
        {editingService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => !isSaving && setEditingService(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
              <form onSubmit={handleSaveService}>
                <div className="p-10 space-y-8">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-serif italic">Edit Service Details</h3>
                    <button type="button" onClick={() => setEditingService(null)}><X className="w-6 h-6 text-black/20" /></button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Label>Service Name</Label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-black/5 border-none rounded-2xl p-4 text-sm" 
                        value={editingService.name} 
                        onChange={e => setEditingService({...editingService, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-4">
                      <Label>Category</Label>
                      <select 
                        className="w-full bg-black/5 border-none rounded-2xl p-4 text-sm appearance-none"
                        value={editingService.category}
                        onChange={e => setEditingService({...editingService, category: e.target.value})}
                      >
                        <option>Massages</option>
                        <option>Moroccan Baths</option>
                        <option>Nails & Care</option>
                      </select>
                    </div>
                    <div className="space-y-4">
                      <Label>Price (ETB)</Label>
                      <input 
                        type="number" 
                        required
                        className="w-full bg-black/5 border-none rounded-2xl p-4 text-sm" 
                        value={editingService.price} 
                        onChange={e => setEditingService({...editingService, price: Number(e.target.value)})}
                      />
                    </div>
                    <div className="space-y-4">
                      <Label>Duration</Label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. 60 min"
                        className="w-full bg-black/5 border-none rounded-2xl p-4 text-sm" 
                        value={editingService.duration} 
                        onChange={e => setEditingService({...editingService, duration: e.target.value})}
                      />
                    </div>
                    <div className="space-y-4 md:col-span-2">
                      <Label>Description</Label>
                      <textarea 
                        rows={3}
                        required
                        className="w-full bg-black/5 border-none rounded-2xl p-4 text-sm resize-none" 
                        value={editingService.desc} 
                        onChange={e => setEditingService({...editingService, desc: e.target.value})}
                      />
                    </div>
                    <div className="space-y-4 md:col-span-2">
                      <Label>Service Image</Label>
                      <div className="flex gap-4">
                        <div className="flex-1 relative">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleFileUpload}
                            disabled={isUploading}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          />
                          <div className={`w-full border-2 border-dashed rounded-2xl p-4 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${isUploading ? 'bg-black/5 border-black/5 text-black/20' : 'bg-black/5 border-black/10 text-black/40 hover:bg-black/10'}`}>
                            {isUploading ? (
                              <div className="w-4 h-4 border-2 border-[#5A5A40] border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <ImageIcon className="w-4 h-4" />
                            )}
                            {editingService.imageUrl ? 'Change Image File' : 'Select From Local Storage'}
                          </div>
                        </div>
                        <div className="w-16 h-16 bg-black/5 rounded-2xl flex items-center justify-center overflow-hidden border border-black/5 shadow-inner">
                          {editingService.imageUrl ? (
                            <img src={editingService.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                          ) : (
                            <ImageIcon className="w-6 h-6 text-black/10" />
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center px-2">
                        <p className="text-[9px] text-black/30 font-medium italic">Saved in: {editingService.imageUrl || '/public/uploads'}</p>
                        {editingService.imageUrl && (
                          <button 
                            type="button"
                            onClick={() => setEditingService({...editingService, imageUrl: ''})}
                            className="text-[9px] text-red-400 hover:text-red-600 font-bold uppercase tracking-widest"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <button 
                    disabled={isSaving || isUploading}
                    type="submit"
                    className="w-full bg-[#141414] text-white py-5 rounded-[24px] text-[12px] uppercase tracking-widest font-bold hover:brightness-125 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSaving ? 'Processing...' : <><Save className="w-4 h-4" /> Update Service</>}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NavItem = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-[11px] uppercase tracking-widest ${active ? 'bg-[#5A5A40] text-white shadow-lg' : 'text-black/40 hover:bg-black/5'}`}
  >
    {icon}
    {label}
  </button>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] uppercase tracking-widest font-bold text-black/30 ml-2">{children}</p>
);

const RecordsSection = ({ adminData }: { adminData: AdminData | null }) => (
  <div className="space-y-12">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* SECTION 1: RECORDS (STATS) */}
      <Section title="Financial & Growth Records" icon={<Save className="w-5 h-5" />}>
        <div className="space-y-6">
          {adminData && (
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-gray-50 p-8 rounded-3xl border border-black/5">
                <p className="text-[10px] uppercase tracking-widest font-bold text-black/30 mb-2">Total Accumulated Revenue</p>
                <h4 className="text-4xl font-serif italic">{adminData.stats.total_revenue} ETB</h4>
                <div className="h-1 w-full bg-black/5 mt-6 rounded-full overflow-hidden">
                  <div className="h-full bg-[#5A5A40] w-3/4" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-6 rounded-3xl border border-black/5">
                  <p className="text-[9px] uppercase tracking-widest font-bold text-black/30 mb-1">Total Bookings</p>
                  <p className="text-2xl font-serif italic">{adminData.stats.total_bookings}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-3xl border border-black/5">
                  <p className="text-[9px] uppercase tracking-widest font-bold text-black/30 mb-1">Total Customers</p>
                  <p className="text-2xl font-serif italic">{adminData.stats.total_customers}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-3xl border border-black/5">
                <p className="text-[9px] uppercase tracking-widest font-bold text-black/20 mb-4">Customer Loyalty Records</p>
                <div className="space-y-3">
                  {adminData.users.slice(0, 3).map(u => (
                    <div key={u.id} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#5A5A40]/10 flex items-center justify-center text-[8px] font-bold text-[#5A5A40] uppercase">
                        {u.name[0]}
                      </div>
                      <span className="text-[10px] font-bold text-black/60 truncate">{u.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* SECTION 2: LIST OF BOOKED SERVICES */}
      <Section title="List of Booked Services" icon={<Calendar className="w-5 h-5" />}>
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {adminData?.appointments.map(a => (
            <div key={a.id} className="p-6 bg-gray-50 rounded-3xl border border-transparent hover:border-[#5A5A40]/10 hover:bg-white transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#5A5A40]">Confirmed Appointment</span>
                  </div>
                  <h4 className="text-xl font-serif italic">{a.service}</h4>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold tracking-tight text-[#5A5A40]">{a.price} ETB</p>
                  <p className="text-[9px] uppercase tracking-widest font-bold text-black/20">Service Fee</p>
                </div>
              </div>
              <div className="flex justify-between items-end border-t border-black/5 pt-4">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-black/60">{a.user_name}</p>
                  <p className="text-[10px] text-black/40 font-medium">{a.date} • {a.time}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 text-red-500/40 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {(!adminData?.appointments || adminData.appointments.length === 0) && (
            <div className="py-20 text-center">
              <Calendar className="w-12 h-12 text-black/5 mx-auto mb-4" />
              <p className="text-sm font-medium text-black/30">No active records found</p>
            </div>
          )}
        </div>
      </Section>
    </div>
  </div>
);

const ServicesSection = ({ services, onEdit, onDelete }: { services: Service[], onEdit: (s: Service) => void, onDelete: (id: number) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filtered = services.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="relative max-w-md">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
        <input 
          type="text" 
          placeholder="Filter treatments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-black/5 rounded-2xl pl-12 pr-6 py-4 text-sm outline-none focus:ring-2 focus:ring-[#5A5A40] transition-all shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(s => (
          <motion.div 
            layout
            key={s.id}
            className="bg-white rounded-[32px] overflow-hidden group border border-transparent hover:border-[#5A5A40]/10 hover:shadow-2xl hover:shadow-black/5 transition-all"
          >
            <div className="aspect-[4/3] bg-black/5 relative overflow-hidden">
              {s.imageUrl && (
                <img src={s.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
              )}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-black/40 backdrop-blur-md text-white rounded-lg text-[8px] uppercase tracking-widest font-bold">
                  {s.category}
                </span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 gap-4">
                <button 
                  onClick={() => onEdit(s)}
                  className="bg-white text-black p-4 rounded-full shadow-xl hover:scale-110 transition-transform"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => s.id && onDelete(s.id)}
                  className="bg-red-500 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-8 space-y-4">
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-serif italic leading-tight">{s.name}</h4>
                <p className="font-bold text-[#5A5A40]">{s.price} ETB</p>
              </div>
              <p className="text-[11px] text-black/50 leading-relaxed line-clamp-2">{s.desc}</p>
              <div className="flex justify-between items-center pt-4 border-t border-black/5 text-[9px] uppercase tracking-widest font-bold text-black/30">
                <span>{s.duration}</span>
                <button onClick={() => onEdit(s)} className="text-[#5A5A40] opacity-0 group-hover:opacity-100 transition-opacity">Quick Edit</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const StatsCard = ({ label, value, icon }: { label: string, value: string | number, icon: React.ReactNode }) => (
  <div className="bg-white p-10 rounded-[40px] shadow-sm border border-black/5 relative overflow-hidden group">
    <div className="absolute -right-8 -top-8 w-32 h-32 bg-black/[0.02] rounded-full group-hover:scale-150 transition-transform duration-700" />
    <div className="relative z-10 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/30">{label}</p>
        {icon}
      </div>
      <h3 className="text-4xl font-serif italic tracking-tight">{value}</h3>
    </div>
  </div>
);

const Section = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
  <div className="bg-white p-10 rounded-[48px] shadow-sm border border-black/5">
    <div className="flex items-center gap-4 mb-10">
      <div className="p-3 bg-black/5 rounded-2xl">{icon}</div>
      <div className="h-px bg-black/5 flex-1 mx-4" />
      <h2 className="text-2xl font-serif italic">{title}</h2>
    </div>
    {children}
  </div>
);
