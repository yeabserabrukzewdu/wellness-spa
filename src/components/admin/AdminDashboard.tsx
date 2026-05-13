import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Calendar, Trash2, LogOut, LayoutDashboard, Settings, Edit3, Image as ImageIcon, Plus, Save, Search, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { UserProfile, Appointment, AdminData, Service } from '../../types';

interface AdminDashboardProps {
  adminData: AdminData | null;
  setView: (view: 'user' | 'admin') => void;
  onRefresh: () => void;
  onSignOut: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ adminData, setView, onRefresh, onSignOut }) => {
  const [activeTab, setActiveTab] = useState<'records' | 'services'>('records');
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  // HARDCODED ADMIN CREDENTIALS (As requested: "username and password which will be set in the admin dashboard component")
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "password123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === ADMIN_USERNAME && loginForm.password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials. Please contact developer.");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchServices();
    }
  }, [isAuthenticated]);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase.from('services').select('*');
      if (error) throw error;
      setServices(data as Service[]);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      setServices(services.filter(s => s.id !== id));
      alert("Service deleted successfully.");
    } catch (err) {
      console.error("Error deleting service:", err);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingService) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File is too large. Max 2MB allowed.");
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `services/${fileName}`;

      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (error) {
        console.error("Supabase Storage Error Raw:", error);
        throw error;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
      
      setEditingService({ ...editingService, image_url: publicUrl });
    } catch (err: any) {
      console.error("Upload failed details:", err);
      const errorMessage = err?.message || "Unknown error";
      alert(`Upload failed: ${errorMessage}\n\nMake sure:\n1. A bucket named 'images' exists.\n2. It's set to 'Public' in Supabase.\n3. You've added Storage Policies (RLS) to allow uploads.`);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    if (!editingService.name || !editingService.description || !editingService.price) {
      alert("Please fill in all required fields (Name, Price, Description)");
      return;
    }

    setIsSaving(true);
    try {
      const serviceData = {
        name: editingService.name,
        price: Number(editingService.price),
        duration: editingService.duration,
        category: editingService.category,
        description: editingService.description,
        image_url: editingService.image_url || ''
      };

      if (editingService.id) {
        const { error } = await supabase.from('services').update(serviceData).eq('id', editingService.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('services').insert([serviceData]);
        if (error) throw error;
      }

      await fetchServices();
      onRefresh();
      setEditingService(null);
      alert("Service saved successfully!");
    } catch (err) {
      console.error("Error saving service:", err);
      alert("Failed to save service.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center p-6 bg-[url('https://images.unsplash.com/photo-1540555700478-4be289aefcc9?q=80&w=2000')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-md bg-white rounded-[40px] p-12 shadow-2xl space-y-8"
        >
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-serif italic">Management Login</h2>
            <p className="text-[10px] uppercase tracking-widest font-bold text-black/30">Secure Terminal Access</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <Label>Username</Label>
              <input 
                type="text" 
                required
                className="w-full bg-black/5 border-none rounded-2xl p-4 text-sm" 
                value={loginForm.username}
                onChange={e => setLoginForm({...loginForm, username: e.target.value})}
                placeholder="Enter username"
              />
            </div>
            <div className="space-y-4">
              <Label>Password</Label>
              <input 
                type="password" 
                required
                className="w-full bg-black/5 border-none rounded-2xl p-4 text-sm" 
                value={loginForm.password}
                onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-[#141414] text-white py-5 rounded-[24px] text-[12px] uppercase tracking-widest font-bold hover:brightness-125 transition-all shadow-xl"
            >
              Enter Dashboard
            </button>
            <button 
              onClick={() => setView('user')}
              type="button"
              className="w-full text-black/40 py-2 text-[10px] uppercase tracking-widest font-bold hover:text-black transition-all"
            >
              Back to Website
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setLoginForm({ username: '', password: '' });
    onSignOut();
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
          onClick={handleSignOut}
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
              <div className="flex gap-4">
                <button 
                  onClick={async () => {
                    const initialServices = [
                      { name: "Swedish Massage (1hr)", price: 1800, duration: "60 min", category: "Massages", description: "Relieves muscle tension and pain, supports the immune system, reduces stress and promotes relaxation.", image_url: "https://images.unsplash.com/photo-1544161515-436cefs61f01?q=80&w=800" },
                      { name: "Deep Tissue Massage (1hr)", price: 1800, duration: "60 min", category: "Massages", description: "Relieves chronic muscle tension, improves mobility and flexibility, speeds up recovery from injuries, supports emotional well-being, and enhances circulation.", image_url: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=800" },
                      { name: "Therapeutic Massage (1hr)", price: 2000, duration: "60 min", category: "Massages", description: "Reduces muscle tension and spasms, relieves chronic pain (e.g., back, neck, shoulders), enhances mobility, and aids in stress reduction.", image_url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800" },
                      { name: "Organic Moroccan Bath (2hr)", price: 5000, duration: "120 min", category: "Moroccan Baths", description: "18+ natural homemade ingredients with honey, milk, and oil. Includes 30 min scrub massage, deep cleansing with Moroccan soap, steam, and treatments for lips, eyes, and hair.", image_url: "https://images.unsplash.com/photo-1540555700478-4be289aefcc9?q=80&w=800" },
                      { name: "Special Pedicure (1hr)", price: 1800, duration: "60 min", category: "Nails & Care", description: "Soaking, exfoliation, cuticle care, shaping, and callus removal. Includes steam treatment with specialized scrubs and a relaxing hot stone massage.", image_url: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=800" }
                    ];
                    if (confirm('Import initial spa services?')) {
                      const { error } = await supabase.from('services').insert(initialServices);
                      if (error) {
                        console.error("Seed error:", error);
                        alert("Failed to seed services.");
                      } else {
                        fetchServices();
                        alert("Services seeded successfully.");
                      }
                    }
                  }}
                  className="bg-white border border-black/10 px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-black/5 transition-all"
                >
                  Seed Services
                </button>
                <button 
                  onClick={() => setEditingService({ name: '', price: 0, duration: '', category: 'Massages', description: '', image_url: '' })}
                  className="bg-[#5A5A40] text-white px-8 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add New Service
                </button>
              </div>
            )}
          </div>

          {activeTab === 'records' ? (
            <RecordsSection adminData={adminData} onRefresh={onRefresh} />
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
                        value={editingService.description} 
                        onChange={e => setEditingService({...editingService, description: e.target.value})}
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
                            {editingService.image_url ? 'Change Image File' : 'Select From Local Storage'}
                          </div>
                        </div>
                        <div className="w-16 h-16 bg-black/5 rounded-2xl flex items-center justify-center overflow-hidden border border-black/5 shadow-inner">
                          {editingService.image_url ? (
                            <img src={editingService.image_url} className="w-full h-full object-cover" alt="Preview" />
                          ) : (
                            <ImageIcon className="w-6 h-6 text-black/10" />
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center px-2">
                        <p className="text-[9px] text-black/30 font-medium italic">Saved in: {editingService.image_url || '/public/uploads'}</p>
                        {editingService.image_url && (
                          <button 
                            type="button"
                            onClick={() => setEditingService({...editingService, image_url: ''})}
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

const RecordsSection = ({ adminData, onRefresh }: { adminData: AdminData | null, onRefresh: () => void }) => {
  const handleDeleteAppointment = async (id: string) => {
    if (!confirm('Cancel this appointment?')) return;
    try {
      const { error } = await supabase.from('appointments').delete().eq('id', id);
      if (error) throw error;
      onRefresh();
    } catch (err) {
      console.error("Error deleting appointment:", err);
      alert("Failed to delete appointment.");
    }
  };

  return (
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
                  <p className="text-xs font-bold uppercase tracking-widest text-black/60">{a.user_name || a.userName || 'Anonymous Client'}</p>
                  <p className="text-[10px] text-black/40 font-medium">{a.date} • {a.time}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleDeleteAppointment(a.id)}
                    className="p-3 text-red-500/40 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
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
};

const ServicesSection = ({ services, onEdit, onDelete }: { services: Service[], onEdit: (s: Service) => void, onDelete: (id: string) => void }) => {
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
              {s.image_url && (
                <img src={s.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
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
              <p className="text-[11px] text-black/50 leading-relaxed line-clamp-2">{s.description}</p>
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
