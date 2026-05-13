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
  imageUrl?: string;
  videoUrl?: string; // Optional field for video
}

export const SERVICES: Service[] = [
  // Massage
  { 
    name: "Swedish Massage (1hr)", 
    price: 1800, 
    duration: "60 min", 
    category: "Massages", 
    description: "Relieves muscle tension and pain, supports the immune system, reduces stress and promotes relaxation.",
    imageUrl: "/services/swedish-massages.jpg"
  },
  { 
    name: "Swedish Massage (1:30)", 
    price: 2400, 
    duration: "90 min", 
    category: "Massages", 
    description: "Extended session to relieve muscle tension, support the immune system, and provide deep relaxation.",
    imageUrl: "/services/swedish-massages-long.jpg"
  },
  { 
    name: "Deep Tissue Massage (1hr)", 
    price: 1800, 
    duration: "60 min", 
    category: "Massages", 
    description: "Relieves chronic muscle tension, improves mobility and flexibility, speeds up recovery from injuries, supports emotional well-being, and enhances circulation.",
    imageUrl: "/services/deep-tissue.jpg"
  },
  { 
    name: "Deep Tissue Massage (1:30)", 
    price: 2400, 
    duration: "90 min", 
    category: "Massages", 
    description: "Full rhythmic relief for chronic tension, improved mobility, injury recovery support, and enhanced emotional well-being.",
    imageUrl: "/services/deep-tissue-long.jpg"
  },
  { 
    name: "Therapeutic Massage (1hr)", 
    price: 2000, 
    duration: "60 min", 
    category: "Massages", 
    description: "Reduces muscle tension and spasms, relieves chronic pain (e.g., back, neck, shoulders), enhances mobility, and aids in stress reduction.",
    imageUrl: "/services/therapeutic.jpg"
  },
  { 
    name: "Therapeutic Massage (1:30)", 
    price: 2600, 
    duration: "90 min", 
    category: "Massages", 
    description: "Comprehensive therapeutic session for injury rehabilitation, flexibility enhancement, and total stress relief.",
    imageUrl: "/services/therapeutic-long.jpg"
  },
  { 
    name: "Hot Stone Therapy (1hr)", 
    price: 2500, 
    duration: "60 min", 
    category: "Massages", 
    description: "Deep relaxation that reduces stress and anxiety, improves joint flexibility, and enhances overall circulation.",
    imageUrl: "/services/hot-stone.jpg"
  },
  { 
    name: "Wood /Madero/ Therapy (1hr)", 
    price: 2000, 
    duration: "60 min", 
    category: "Massages", 
    description: "Enhances blood circulation, relieves muscle tension, aids in the breakdown of fat, and helps achieve a balanced energy.",
    imageUrl: "/services/wood-therapy.jpg"
  },
  { 
    name: "Scrub Massage (1:30)", 
    price: 4000, 
    duration: "90 min", 
    category: "Massages", 
    description: "Hair treatment and 20 min steam, followed by a gentle full-body massage scrub to remove dead cells, unclog pores, and improve absorption, finished with a light oil massage.",
    imageUrl: "/services/scrub-massage.jpg"
  },
  { 
    name: "Scalp Massage (45 min)", 
    price: 1200, 
    duration: "45 min", 
    category: "Massages", 
    description: "Reduces stress and anxiety, eases headaches and migraines, boosts mental clarity, stimulates energy flow, and reduces muscle tension.",
    imageUrl: "/services/scalp-massage.jpg"
  },
  { 
    name: "Reflexology Massage (45 min)", 
    price: 1000, 
    duration: "45 min", 
    category: "Massages", 
    description: "Improves circulation, balances energy levels, supports digestive health, boosts the immune system, and promotes total relaxation.",
    imageUrl: "/services/reflexology.jpg"
  },
  { 
    name: "Aroma Therapy (1hr)", 
    price: 1800, 
    duration: "60 min", 
    category: "Massages", 
    description: "Enhances mood and emotional balance, boosts energy and focus, and promotes overall skin health.",
    imageUrl: "/services/aroma-therapy.jpg"
  },
  { 
    name: "Thai Massage (1hr)", 
    price: 1800, 
    duration: "60 min", 
    category: "Massages", 
    description: "Improves flexibility and range of motion, alleviates chronic pain, enhances circulation, and supports digestive health.",
    imageUrl: "/services/thai-massage.jpg"
  },


  // Moroccan Bath
  { 
    name: "Organic Moroccan Bath (2hr)", 
    price: 5000, 
    duration: "120 min", 
    category: "Moroccan Baths", 
    description: "18+ natural homemade ingredients with honey, milk, and oil. Includes 30 min scrub massage, deep cleansing with Moroccan soap, steam, and treatments for lips, eyes, and hair.",
    imageUrl: "/services/organic-moroccan-bath.jpg"
  },
  { 
    name: "Brown Sugar Moroccan Bath (2hr)", 
    price: 5000, 
    duration: "120 min", 
    category: "Moroccan Baths", 
    description: "Brown sugar with natural homemade ingredients, honey, milk, and oil. Includes 30 min scrub massage, deep cleansing, steam, and specialized treatments for hair, eyes, and lips.",
    imageUrl: "/services/brown-sugar-moroccan.jpg"
  },
  { 
    name: "Coffee Moroccan Bath (1:30)", 
    price: 4000, 
    duration: "90 min", 
    category: "Moroccan Baths", 
    description: "Coffee base with natural ingredients, honey, and milk. Features deep cleansing with Moroccan black soap, steam treatment, and dedicated care for lips, eyes, and hair.",
    imageUrl: "/services/coffee-moroccan.jpg"
  },
  { 
    name: "Black Seed Moroccan Bath (1:30)", 
    price: 4000, 
    duration: "90 min", 
    category: "Moroccan Baths", 
    description: "Black seed and herbal mix with honey and milk. Provides full body deep cleansing, steam treatment, and restorative care for eyes, hair, and lips.",
    imageUrl: "/services/black-seed-moroccan.jpg"
  },
  { 
    name: "Normal Moroccan Bath (1:30)", 
    price: 3200, 
    duration: "90 min", 
    category: "Moroccan Baths", 
    description: "Traditional homemade ingredients for deep cleansing with Moroccan black soap and glove, finished with a purifying steam treatment.",
    imageUrl: "/services/normal-moroccan.jpg"
  },
  { 
    name: "Steam Service (1hr)", 
    price: 1200, 
    duration: "60 min", 
    category: "Moroccan Baths", 
    description: "Purifying one-hour steam service to detoxify the body and relax the mind.",
    imageUrl: "/services/steam-service.jpg"
  },


  // Pedicure & Manicure
  { 
    name: "Special Pedicure (1hr)", 
    price: 1800, 
    duration: "60 min", 
    category: "Nails & Care", 
    description: "Soaking, exfoliation, cuticle care, shaping, and callus removal. Includes steam treatment with specialized scrubs and a relaxing hot stone massage.",
    imageUrl: "/services/special-pedicure.jpg"
  },
  { 
    name: "Normal Pedicure (1hr)", 
    price: 1500, 
    duration: "60 min", 
    category: "Nails & Care", 
    description: "Comprehensive foot care involving soaking, exfoliation, cuticle care, nail trimming, shaping, callus removal, and scrub application.",
    imageUrl: "/services/normal-pedicure.jpg"
  },
  { 
    name: "Special Pedicure + Massage (1:30)", 
    price: 2600, 
    duration: "90 min", 
    category: "Nails & Care", 
    description: "Full special pedicure featuring steam treatment and scrubs, enhanced with a dedicated 30-minute deep foot massage for total restoration.",
    imageUrl: "/services/pedicure-massage.jpg"
  },
  { 
    name: "Manicure (1hr)", 
    price: 800, 
    duration: "60 min", 
    category: "Nails & Care", 
    description: "Hand soaking, exfoliation, cuticle care, shaping, and callus removal. Includes steam treatment with scrubs and a relaxing light massage.",
    imageUrl: "/services/manicure.jpg"
  }
];

export interface GalleryItem {
  id: number;
  type: string;
  imageUrl: string;
  videoUrl?: string; // If present, it will show as a video
}

export const GALLERY_ITEMS: GalleryItem[] = [
  { 
    id: 1, 
    type: "reel", 
    imageUrl: "/gallery/img-1.jpg",
    videoUrl: "https://res.cloudinary.com/demo/video/upload/v1634289454/sample_video_1.mp4"
  },
  { 
    id: 2, 
    type: "treatment", 
    imageUrl: "/gallery/img-2.jpg", 
    videoUrl: "https://res.cloudinary.com/demo/video/upload/v1634289454/flower.mp4" 
  },
  { id: 3, type: "detail", imageUrl: "/gallery/img-3.jpg", videoUrl: "https://res.cloudinary.com/demo/video/upload/v1634289454/samples/sea-turtle.mp4" },
  { id: 4, type: "moroccan", imageUrl: "/gallery/img-4.jpg" },
  { id: 5, type: "pedicure", imageUrl: "/gallery/img-5.jpg" },
  { id: 6, type: "atmosphere", imageUrl: "/gallery/img-6.jpg" },
  { id: 7, type: "treatment", imageUrl: "/gallery/img-7.jpg" },
  { id: 8, type: "interior", imageUrl: "/gallery/img-8.jpg" }
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
