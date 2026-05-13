export const CONTACT_INFO = {
  phone: "+251 939 595 988",
  location: "Bole Abyssinia Building, 3rd Floor",
  fullLocation: "Bole around yod Abyssinia Kkcare Building 3'rd floor",
  email: "contact@weglow.com",
};

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/weglow_spa",
  tiktok: "https://tiktok.com/@weglow_spa",
  facebook: "https://facebook.com/weglow_spa",
  telegram: "https://t.me/weglow_spa",
};

export interface Service {
  name: string;
  price: number;
  duration: string;
  category: string;
  description: string;
  image_url?: string;
  video_url?: string; // Optional field for video
}

export const SERVICES: Service[] = [
  // Massage
  { 
    name: "Swedish Massage (1hr)", 
    price: 1800, 
    duration: "60 min", 
    category: "Massages", 
    description: "Relieves muscle tension and pain, supports the immune system, reduces stress and promotes relaxation.",
    image_url: "https://images.unsplash.com/photo-1544161515-436cefs61f01?q=80&w=800"
  },
  { 
    name: "Swedish Massage (1:30)", 
    price: 2400, 
    duration: "90 min", 
    category: "Massages", 
    description: "Extended session to relieve muscle tension, support the immune system, and provide deep relaxation.",
    image_url: "https://images.unsplash.com/photo-1611232658409-cf50b7a4d6bc?q=80&w=800"
  },
  { 
    name: "Deep Tissue Massage (1hr)", 
    price: 1800, 
    duration: "60 min", 
    category: "Massages", 
    description: "Relieves chronic muscle tension, improves mobility and flexibility, speeds up recovery from injuries, supports emotional well-being, and enhances circulation.",
    image_url: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=800"
  },
  { 
    name: "Deep Tissue Massage (1:30)", 
    price: 2400, 
    duration: "90 min", 
    category: "Massages", 
    description: "Full rhythmic relief for chronic tension, improved mobility, injury recovery support, and enhanced emotional well-being.",
    image_url: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=800"
  },
  { 
    name: "Therapeutic Massage (1hr)", 
    price: 2000, 
    duration: "60 min", 
    category: "Massages", 
    description: "Reduces muscle tension and spasms, relieves chronic pain (e.g., back, neck, shoulders), enhances mobility, and aids in stress reduction.",
    image_url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800"
  },
  { 
    name: "Therapeutic Massage (1:30)", 
    price: 2600, 
    duration: "90 min", 
    category: "Massages", 
    description: "Comprehensive therapeutic session for injury rehabilitation, flexibility enhancement, and total stress relief.",
    image_url: "https://images.unsplash.com/photo-1540555700478-4be289aefcc9?q=80&w=800"
  },
  { 
    name: "Hot Stone Therapy (1hr)", 
    price: 2500, 
    duration: "60 min", 
    category: "Massages", 
    description: "Deep relaxation that reduces stress and anxiety, improves joint flexibility, and enhances overall circulation.",
    image_url: "https://images.unsplash.com/photo-1600334129128-685c4582f98d?q=80&w=800"
  },
  { 
    name: "Wood /Madero/ Therapy (1hr)", 
    price: 2000, 
    duration: "60 min", 
    category: "Massages", 
    description: "Enhances blood circulation, relieves muscle tension, aids in the breakdown of fat, and helps achieve a balanced energy.",
    image_url: "https://images.unsplash.com/photo-1591343395082-e120087004b4?q=80&w=800"
  },
  { 
    name: "Scrub Massage (1:30)", 
    price: 4000, 
    duration: "90 min", 
    category: "Massages", 
    description: "Hair treatment and 20 min steam, followed by a gentle full-body massage scrub to remove dead cells, unclog pores, and improve absorption, finished with a light oil massage.",
    image_url: "https://images.unsplash.com/photo-1615486288339-65715509761e?q=80&w=800"
  },
  { 
    name: "Scalp Massage (45 min)", 
    price: 1200, 
    duration: "45 min", 
    category: "Massages", 
    description: "Reduces stress and anxiety, eases headaches and migraines, boosts mental clarity, stimulates energy flow, and reduces muscle tension.",
    image_url: "https://images.unsplash.com/photo-1512290923902-8a9f81dc206e?q=80&w=800"
  },
  { 
    name: "Reflexology Massage (45 min)", 
    price: 1000, 
    duration: "45 min", 
    category: "Massages", 
    description: "Improves circulation, balances energy levels, supports digestive health, boosts the immune system, and promotes total relaxation.",
    image_url: "https://images.unsplash.com/photo-1519415510270-345330aed58a?q=80&w=800"
  },
  { 
    name: "Aroma Therapy (1hr)", 
    price: 1800, 
    duration: "60 min", 
    category: "Massages", 
    description: "Enhances mood and emotional balance, boosts energy and focus, and promotes overall skin health.",
    image_url: "https://images.unsplash.com/photo-1616190419596-e2839e9544d7?q=80&w=800"
  },
  { 
    name: "Thai Massage (1hr)", 
    price: 1800, 
    duration: "60 min", 
    category: "Massages", 
    description: "Improves flexibility and range of motion, alleviates chronic pain, enhances circulation, and supports digestive health.",
    image_url: "https://images.unsplash.com/photo-1544161515-436cefs61f01?q=80&w=800"
  },


  // Moroccan Bath
  { 
    name: "Organic Moroccan Bath (2hr)", 
    price: 5000, 
    duration: "120 min", 
    category: "Moroccan Baths", 
    description: "18+ natural homemade ingredients with honey, milk, and oil. Includes 30 min scrub massage, deep cleansing with Moroccan soap, steam, and treatments for lips, eyes, and hair.",
    image_url: "https://images.unsplash.com/photo-1540555700478-4be289aefcc9?q=80&w=800"
  },
  { 
    name: "Brown Sugar Moroccan Bath (2hr)", 
    price: 5000, 
    duration: "120 min", 
    category: "Moroccan Baths", 
    description: "Brown sugar with natural homemade ingredients, honey, milk, and oil. Includes 30 min scrub massage, deep cleansing, steam, and specialized treatments for hair, eyes, and lips.",
    image_url: "https://images.unsplash.com/photo-1553531384-397c80973a0b?q=80&w=800"
  },
  { 
    name: "Coffee Moroccan Bath (1:30)", 
    price: 4000, 
    duration: "90 min", 
    category: "Moroccan Baths", 
    description: "Coffee base with natural ingredients, honey, and milk. Features deep cleansing with Moroccan black soap, steam treatment, and dedicated care for lips, eyes, and hair.",
    image_url: "https://images.unsplash.com/photo-1540555700478-4be289aefcc9?q=80&w=800"
  },
  { 
    name: "Black Seed Moroccan Bath (1:30)", 
    price: 4000, 
    duration: "90 min", 
    category: "Moroccan Baths", 
    description: "Black seed and herbal mix with honey and milk. Provides full body deep cleansing, steam treatment, and restorative care for eyes, hair, and lips.",
    image_url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800"
  },
  { 
    name: "Normal Moroccan Bath (1:30)", 
    price: 3200, 
    duration: "90 min", 
    category: "Moroccan Baths", 
    description: "Traditional homemade ingredients for deep cleansing with Moroccan black soap and glove, finished with a purifying steam treatment.",
    image_url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800"
  },
  { 
    name: "Steam Service (1hr)", 
    price: 1200, 
    duration: "60 min", 
    category: "Moroccan Baths", 
    description: "Purifying one-hour steam service to detoxify the body and relax the mind.",
    image_url: "https://images.unsplash.com/photo-1583416750470-965b2707b355?q=80&w=800"
  },


  // Pedicure & Manicure
  { 
    name: "Special Pedicure (1hr)", 
    price: 1800, 
    duration: "60 min", 
    category: "Nails & Care", 
    description: "Soaking, exfoliation, cuticle care, shaping, and callus removal. Includes steam treatment with specialized scrubs and a relaxing hot stone massage.",
    image_url: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=800"
  },
  { 
    name: "Normal Pedicure (1hr)", 
    price: 1500, 
    duration: "60 min", 
    category: "Nails & Care", 
    description: "Comprehensive foot care involving soaking, exfoliation, cuticle care, nail trimming, shaping, callus removal, and scrub application.",
    image_url: "https://images.unsplash.com/photo-1610992015732-2449b0c266a0?q=80&w=800"
  },
  { 
    name: "Special Pedicure + Massage (1:30)", 
    price: 2600, 
    duration: "90 min", 
    category: "Nails & Care", 
    description: "Full special pedicure featuring steam treatment and scrubs, enhanced with a dedicated 30-minute deep foot massage for total restoration.",
    image_url: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=800"
  },
  { 
    name: "Manicure (1hr)", 
    price: 800, 
    duration: "60 min", 
    category: "Nails & Care", 
    description: "Hand soaking, exfoliation, cuticle care, shaping, and callus removal. Includes steam treatment with scrubs and a relaxing light massage.",
    image_url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800"
  }
];

export interface GalleryItem {
  id: number;
  type: string;
  image_url: string;
  video_url?: string; // If present, it will show as a video
}

export const GALLERY_ITEMS: GalleryItem[] = [
  { 
    id: 1, 
    type: "reel", 
    image_url: "https://images.unsplash.com/photo-1544161515-436cefs61f01?q=80&w=800",
    video_url: "https://res.cloudinary.com/demo/video/upload/v1634289454/samples/sea-turtle.mp4"
  },
  { 
    id: 2, 
    type: "treatment", 
    image_url: "https://images.unsplash.com/photo-1600334129128-685c4582f98d?q=80&w=800", 
    video_url: "https://res.cloudinary.com/demo/video/upload/v1634289454/samples/sea-turtle.mp4" 
  },
  { id: 3, type: "detail", image_url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800", video_url: "https://res.cloudinary.com/demo/video/upload/v1634289454/samples/sea-turtle.mp4" },
  { id: 4, type: "moroccan", image_url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800" },
  { id: 5, type: "pedicure", image_url: "https://images.unsplash.com/photo-1610992015732-2449b0c266a0?q=80&w=800" },
  { id: 6, type: "atmosphere", image_url: "https://images.unsplash.com/photo-1540555700478-4be289aefcc9?q=80&w=800" },
  { id: 7, type: "treatment", image_url: "https://images.unsplash.com/photo-1519415510270-345330aed58a?q=80&w=800" },
  { id: 8, type: "interior", image_url: "https://images.unsplash.com/photo-1583416750470-965b2707b355?q=80&w=800" }
];

export const TESTIMONIALS = [
  { name: "Sarah Jenkins", text: "The most peaceful experience I've had in years. The Aromatherapy session was transformative.", rating: 5 },
  { name: "Michael Chen", text: "Professional staff and a beautiful atmosphere. My chronic back pain is significantly better.", rating: 5 },
  { name: "Elena Rodriguez", text: "A true hidden gem. The attention to detail and the quality of treatments are unmatched.", rating: 5 }
];

export const BOOKING_TIMES = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
];

export const WHY_FEATURES = [
  "Comprehensive Treatment Options",
  "Exceptional Moroccan Bath Experience",
  "Warm and Professional Staff",
  "Affordable Luxury",
  "High Standard of Cleanliness",
  "Complementary Detox Drinks",
  "Safe and Secure Parking"
];

export const STATS = [
  { value: "3+", label: "Years Experience" },
  { value: "24/7", label: "Open" },
  { value: "20+", label: "Herbal Treatment" },
  { value: "2", label: "Branches" }
];
