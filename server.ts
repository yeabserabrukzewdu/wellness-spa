import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Saving file to:", uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || ".jpg";
    cb(null, `${uniqueSuffix}${ext}`);
  },
});
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const db = new Database("appointments.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT
  );

  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    service TEXT NOT NULL,
    price INTEGER DEFAULT 0,
    status TEXT DEFAULT 'confirmed',
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    price INTEGER NOT NULL,
    duration TEXT NOT NULL,
    category TEXT NOT NULL,
    desc TEXT NOT NULL,
    imageUrl TEXT
  );
`);

// Seed services if empty
const servicesCount = db.prepare("SELECT COUNT(*) as count FROM services").get() as any;
if (servicesCount.count === 0) {
  const initialServices = [
    { name: "Swedish Massage (1hr)", price: 1800, duration: "60 min", category: "Massages", desc: "Relieves muscle tension and pain, supports the immune system, reduces stress and promotes relaxation.", imageUrl: "/services/swedish-massages.jpg" },
    { name: "Deep Tissue Massage (1hr)", price: 1800, duration: "60 min", category: "Massages", desc: "Relieves chronic muscle tension, improves mobility and flexibility, speeds up recovery from injuries, supports emotional well-being, and enhances circulation.", imageUrl: "/services/deep-tissue.jpg" },
    { name: "Therapeutic Massage (1hr)", price: 2000, duration: "60 min", category: "Massages", desc: "Reduces muscle tension and spasms, relieves chronic pain (e.g., back, neck, shoulders), enhances mobility, and aids in stress reduction.", imageUrl: "/services/therapeutic.jpg" },
    { name: "Organic Moroccan Bath (2hr)", price: 5000, duration: "120 min", category: "Moroccan Baths", desc: "18+ natural homemade ingredients with honey, milk, and oil. Includes 30 min scrub massage, deep cleansing with Moroccan soap, steam, and treatments for lips, eyes, and hair.", imageUrl: "/services/organic-moroccan-bath.jpg" },
    { name: "Special Pedicure (1hr)", price: 1800, duration: "60 min", category: "Nails & Care", desc: "Soaking, exfoliation, cuticle care, shaping, and callus removal. Includes steam treatment with specialized scrubs and a relaxing hot stone massage.", imageUrl: "/services/special-pedicure.jpg" }
  ];
  
  const insertService = db.prepare("INSERT INTO services (name, price, duration, category, desc, imageUrl) VALUES (?, ?, ?, ?, ?, ?)");
  for (const s of initialServices) {
    insertService.run(s.name, s.price, s.duration, s.category, s.desc, s.imageUrl);
  }
}

// Migration: Add price column if it doesn't exist (for existing databases)
try {
  db.prepare("SELECT price FROM appointments LIMIT 1").get();
} catch (e) {
  db.exec("ALTER TABLE appointments ADD COLUMN price INTEGER DEFAULT 0");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Serve uploaded files
  app.use("/uploads", express.static(uploadDir));

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // User Registration / Login (Simplified)
  app.post("/api/users", (req, res) => {
    const { name, email, phone } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO users (name, email, phone) VALUES (?, ?, ?)");
      const info = stmt.run(name, email, phone);
      res.status(201).json({ id: info.lastInsertRowid, name, email, phone });
    } catch (error: any) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        // User might already exist, try to fetch
        const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
        res.json(user);
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  });

  // Get User Appointments
  app.get("/api/appointments/:userId", (req, res) => {
    const { userId } = req.params;
    const appointments = db.prepare("SELECT * FROM appointments WHERE user_id = ? ORDER BY date, time").all(userId);
    res.json(appointments);
  });

  // Schedule Appointment
  app.post("/api/appointments", (req, res) => {
    const { name, email, phone, date, time, service, price } = req.body;
    try {
      // 1. Get or Create User
      let user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as any;
      
      if (!user) {
        const userStmt = db.prepare("INSERT INTO users (name, email, phone) VALUES (?, ?, ?)");
        const userResult = userStmt.run(name, email, phone);
        user = { id: userResult.lastInsertRowid, name, email, phone };
      } else {
        // Update phone if it's new
        db.prepare("UPDATE users SET phone = ?, name = ? WHERE id = ?").run(phone, name, user.id);
        user.phone = phone;
        user.name = name;
      }

      // 2. Create Appointment
      const stmt = db.prepare("INSERT INTO appointments (user_id, date, time, service, price) VALUES (?, ?, ?, ?, ?)");
      const info = stmt.run(user.id, date, time, service, price || 0);
      
      res.status(201).json({ 
        appointment: { id: info.lastInsertRowid, user_id: user.id, date, time, service, price },
        user
      });
    } catch (error: any) {
      console.error("Booking error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Admin: Get All Users
  app.get("/api/admin/users", (req, res) => {
    const users = db.prepare("SELECT * FROM users").all();
    res.json(users);
  });

  // Admin: Get All Appointments with User Details
  app.get("/api/admin/appointments", (req, res) => {
    const appointments = db.prepare(`
      SELECT a.*, u.name as user_name, u.email as user_email 
      FROM appointments a 
      JOIN users u ON a.user_id = u.id 
      ORDER BY a.date DESC, a.time DESC
    `).all();
    res.json(appointments);
  });

  // Admin: Get Revenue Stats
  app.get("/api/admin/stats", (req, res) => {
    const stats = db.prepare(`
      SELECT 
        SUM(price) as total_revenue,
        COUNT(*) as total_bookings,
        COUNT(DISTINCT user_id) as total_customers
      FROM appointments
    `).get();
    res.json(stats);
  });

  // Delete Appointment
  app.delete("/api/appointments/:id", (req, res) => {
    const { id } = req.params;
    db.prepare("DELETE FROM appointments WHERE id = ?").run(id);
    res.status(204).send();
  });

  // Services Management
  app.get("/api/services", (req, res) => {
    const services = db.prepare("SELECT * FROM services").all();
    res.json(services);
  });

  app.post("/api/services", (req, res) => {
    const { name, price, duration, category, desc, imageUrl } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO services (name, price, duration, category, desc, imageUrl) VALUES (?, ?, ?, ?, ?, ?)");
      const info = stmt.run(name, price, duration, category, desc, imageUrl);
      res.status(201).json({ id: info.lastInsertRowid, name, price, duration, category, desc, imageUrl });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/services/:id", (req, res) => {
    const { id } = req.params;
    const { name, price, duration, category, desc, imageUrl } = req.body;
    try {
      db.prepare("UPDATE services SET name = ?, price = ?, duration = ?, category = ?, desc = ?, imageUrl = ? WHERE id = ?")
        .run(name, price, duration, category, desc, imageUrl, id);
      res.json({ id, name, price, duration, category, desc, imageUrl });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/services/:id", (req, res) => {
    const { id } = req.params;
    try {
      db.prepare("DELETE FROM services WHERE id = ?").run(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // File Upload Endpoint
  app.post("/api/upload", (req, res) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        console.error("Upload error:", err);
        return res.status(500).json({ error: err.message || "Upload failed" });
      }
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const imageUrl = `/uploads/${req.file.filename}`;
      console.log("Successfully uploaded:", imageUrl);
      res.json({ imageUrl });
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
