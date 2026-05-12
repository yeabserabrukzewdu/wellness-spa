export const CONTACT_INFO = {
  phone: "+251 939 595 988",
  location: "Bole Abyssinia Building, 3rd Floor",
  fullLocation: "Bole around yod Abyssinia Kkcare Building 3'rd floor",
  email: "contact@weglow.com",
};

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/we_glow_wellness_spa/",
  tiktok: "https://www.tiktok.com/@weglow01",
  facebook: "https://facebook.com/weglow_spa",
  telegram: "https://web.telegram.org/k/#8254092344",
};

export interface Service {
  name: string;
  price: number;
  duration: string;
  category: string;
  desc: string;
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
    desc: "Relieves muscle tension and pain, supports the immune system, reduces stress and promotes relaxation.",
    imageUrl: "./6.png"  // Update this path to match your file location
  },
  { 
    name: "Swedish Massage (1:30)", 
    price: 2400, 
    duration: "90 min", 
    category: "Massages", 
    desc: "Extended session to relieve muscle tension, support the immune system, and provide deep relaxation.",
    imageUrl: "./17.png"  // Update this path to match your file location
  },
  { 
    name: "Deep Tissue Massage (1hr)", 
    price: 1800, 
    duration: "60 min", 
    category: "Massages", 
    desc: "Relieves chronic muscle tension, improves mobility and flexibility, speeds up recovery from injuries, supports emotional well-being, and enhances circulation.",
    imageUrl: "./12.png"  // Update this path to match your file location
  },
  { 
    name: "Deep Tissue Massage (1:30)", 
    price: 2400, 
    duration: "90 min", 
    category: "Massages", 
    desc: "Full rhythmic relief for chronic tension, improved mobility, injury recovery support, and enhanced emotional well-being.",
    imageUrl: "./13.png"  // Update this path to match your file location
  },
  { 
    name: "Therapeutic Massage (1hr)", 
    price: 2000, 
    duration: "60 min", 
    category: "Massages", 
    desc: "Reduces muscle tension and spasms, relieves chronic pain (e.g., back, neck, shoulders), enhances mobility, and aids in stress reduction.",
    imageUrl: "./16.png"  // Update this path to match your file location
  },
  { 
    name: "Therapeutic Massage (1:30)", 
    price: 2600, 
    duration: "90 min", 
    category: "Massages", 
    desc: "Comprehensive therapeutic session for injury rehabilitation, flexibility enhancement, and total stress relief.",
    imageUrl: "./20.png"  // Update this path to match your file location
  },
  { 
    name: "Hot Stone Therapy (1hr)", 
    price: 2500, 
    duration: "60 min", 
    category: "Massages", 
    desc: "Deep relaxation that reduces stress and anxiety, improves joint flexibility, and enhances overall circulation.",
    imageUrl: "./9.png"  // Update this path to match your file location
  },
  { 
    name: "Wood /Madero/ Therapy (1hr)", 
    price: 2000, 
    duration: "60 min", 
    category: "Massages", 
    desc: "Enhances blood circulation, relieves muscle tension, aids in the breakdown of fat, and helps achieve a balanced energy.",
    imageUrl: "./2.png"  // Update this path to match your file location
  },
  { 
    name: "Scrub Massage (1:30)", 
    price: 4000, 
    duration: "90 min", 
    category: "Massages", 
    desc: "Hair treatment and 20 min steam, followed by a gentle full-body massage scrub to remove dead cells, unclog pores, and improve absorption, finished with a light oil massage.",
    imageUrl: "./22.png"  // Update this path to match your file location
  },
  { 
    name: "Scalp Massage (45 min)", 
    price: 1200, 
    duration: "45 min", 
    category: "Massages", 
    desc: "Reduces stress and anxiety, eases headaches and migraines, boosts mental clarity, stimulates energy flow, and reduces muscle tension.",
    imageUrl: "./4.png"  // Update this path to match your file location
  },
  { 
    name: "Reflexology Massage (45 min)", 
    price: 1000, 
    duration: "45 min", 
    category: "Massages", 
    desc: "Improves circulation, balances energy levels, supports digestive health, boosts the immune system, and promotes total relaxation.",
    imageUrl: "8.png"  // Update this path to match your file location
  },
  { 
    name: "Aroma Therapy (1hr)", 
    price: 1800, 
    duration: "60 min", 
    category: "Massages", 
    desc: "Enhances mood and emotional balance, boosts energy and focus, and promotes overall skin health.",
    imageUrl: "https://picsum.photos/seed/aroma-therapy/800/1000"
  },
  { 
    name: "Thai Massage (1hr)", 
    price: 1800, 
    duration: "60 min", 
    category: "Massages", 
    desc: "Improves flexibility and range of motion, alleviates chronic pain, enhances circulation, and supports digestive health.",
    imageUrl: "./23.png"  // Update this path to match your file location
  },

  // Moroccan Bath
  { 
    name: "Organic Moroccan Bath (2hr)", 
    price: 5000, 
    duration: "120 min", 
    category: "Moroccan Baths", 
    desc: "18+ natural homemade ingredients with honey, milk, and oil. Includes 30 min scrub massage, deep cleansing with Moroccan soap, steam, and treatments for lips, eyes, and hair.",
    imageUrl: "./10.png"  // Update this path to match your file location
  },
  { 
    name: "Brown Sugar Moroccan Bath (2hr)", 
    price: 5000, 
    duration: "120 min", 
    category: "Moroccan Baths", 
    desc: "Brown sugar with natural homemade ingredients, honey, milk, and oil. Includes 30 min scrub massage, deep cleansing, steam, and specialized treatments for hair, eyes, and lips.",
    imageUrl: "./24.png"  // Update this path to match your file location
  },
  { 
    name: "Coffee Moroccan Bath (1:30)", 
    price: 4000, 
    duration: "90 min", 
    category: "Moroccan Baths", 
    desc: "Coffee base with natural ingredients, honey, and milk. Features deep cleansing with Moroccan black soap, steam treatment, and dedicated care for lips, eyes, and hair.",
    imageUrl: "./22.png"  // Update this path to match your file location
  },
  { 
    name: "Black Seed Moroccan Bath (1:30)", 
    price: 4000, 
    duration: "90 min", 
    category: "Moroccan Baths", 
    desc: "Black seed and herbal mix with honey and milk. Provides full body deep cleansing, steam treatment, and restorative care for eyes, hair, and lips.",
    imageUrl: "./26.png"  // Update this path to match your file location
  },
  { 
    name: "Normal Moroccan Bath (1:30)", 
    price: 3200, 
    duration: "90 min", 
    category: "Moroccan Baths", 
    desc: "Traditional homemade ingredients for deep cleansing with Moroccan black soap and glove, finished with a purifying steam treatment.",
    imageUrl: "./25.png"  // Update this path to match your file location
  },
  { 
    name: "Steam Service (1hr)", 
    price: 1200, 
    duration: "60 min", 
    category: "Moroccan Baths", 
    desc: "Purifying one-hour steam service to detoxify the body and relax the mind.",
    imageUrl: "./30.png"  // Update this path to match your file location
  },

  // Pedicure & Manicure
  { 
    name: "Special Pedicure (1hr)", 
    price: 1800, 
    duration: "60 min", 
    category: "Nails & Care", 
    desc: "Soaking, exfoliation, cuticle care, shaping, and callus removal. Includes steam treatment with specialized scrubs and a relaxing hot stone massage.",
    imageUrl: "./19.png"  // Update this path to match your file location
  },
  { 
    name: "Normal Pedicure (1hr)", 
    price: 1500, 
    duration: "60 min", 
    category: "Nails & Care", 
    desc: "Comprehensive foot care involving soaking, exfoliation, cuticle care, nail trimming, shaping, callus removal, and scrub application.",
    imageUrl: "./28.png"  // Update this path to match your file location
  },
  { 
    name: "Special Pedicure + Massage (1:30)", 
    price: 2600, 
    duration: "90 min", 
    category: "Nails & Care", 
    desc: "Full special pedicure featuring steam treatment and scrubs, enhanced with a dedicated 30-minute deep foot massage for total restoration.",
    imageUrl: "./27.png"  // Update this path to match your file location
  },
  { 
    name: "Manicure (1hr)", 
    price: 800, 
    duration: "60 min", 
    category: "Nails & Care", 
    desc: "Hand soaking, exfoliation, cuticle care, shaping, and callus removal. Includes steam treatment with scrubs and a relaxing light massage.",
    imageUrl: "./29.png"  // Update this path to match your file location
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
    imageUrl: "/a.webp",  // Update this path to match your file location
    videoUrl:"https://res.cloudinary.com/dlfdjcuat/video/upload/v1777711413/Download_3_r5bfol.mp4"
  },
   { 
    id: 2, 
    type: "reel", 
    imageUrl: "/b.webp",  // Update this path to match your file location
    videoUrl: "https://res.cloudinary.com/dlfdjcuat/video/upload/v1777711410/Download_ldq3k5.mp4"
  },
   { 
    id: 3, 
    type: "reel", 
    imageUrl: "/c.webp",  // Update this path to match your file location  
    videoUrl: "https://res.cloudinary.com/dlfdjcuat/video/upload/v1777711411/Download_7_vbts86.mp4"
  },
   { 
    id: 4, 
    type: "reel", 
    imageUrl: "/d.webp",  // Update this path to match your file location
    videoUrl: "https://res.cloudinary.com/dlfdjcuat/video/upload/v1777712185/Download_6_dkflb6.mp4"
  },
   { 
    id: 5, 
    type: "reel", 
    imageUrl: "/e.webp",  // Update this path to match your file location
    videoUrl: "https://res.cloudinary.com/dlfdjcuat/video/upload/v1777716060/Download_8_e4qcwq.mp4"
  },
   { 
    id: 6, 
    type: "reel", 
    imageUrl: "/f.webp",  // Update this path to match your file location
    videoUrl: "https://res.cloudinary.com/dlfdjcuat/video/upload/v1777711398/Download_2_ayviku.mp4"
  },
   { 
    id: 7, 
    type: "reel", 
    imageUrl: "/g.webp",  // Update this path to match your file location
    videoUrl: "https://res.cloudinary.com/dlfdjcuat/video/upload/v1777711380/Download_1_zsyef0.mp4"
  },
   { 
    id: 8, 
    type: "reel", 
    imageUrl: "/h.webp",  // Update this path to match your file location
    videoUrl: "https://res.cloudinary.com/dlfdjcuat/video/upload/v1777712207/Download_5_arjj8t.mp4"
  }
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