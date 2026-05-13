export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  role?: string;
}

export interface Appointment {
  id: string;
  userId: string;
  date: string;
  time: string;
  service: string;
  status: string;
  price: number;
}

export interface Service {
  id?: string;
  name: string;
  price: number;
  duration: string;
  category: string;
  description: string;
  image_url?: string;
  video_url?: string;
}

export interface AdminData {
  users: UserProfile[];
  appointments: (Appointment & { userName?: string; userEmail?: string; user_name?: string; user_email?: string })[];
  stats: {
    total_revenue: number;
    total_bookings: number;
    total_customers: number;
  };
}
