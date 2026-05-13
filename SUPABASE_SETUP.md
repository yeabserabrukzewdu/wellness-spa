# Supabase Implementation Guide

## 1. Create a Project
Go to [Supabase](https://supabase.com/) and create a new project.

## 2. SQL Schema (Run this in SQL Editor)
Run the following SQL to set up your database. **This script is designed to be safe to run multiple times.**

```sql
-- 1. Create Tables
CREATE TABLE IF NOT EXISTS services (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  duration TEXT,
  category TEXT,
  description TEXT,
  image_url TEXT,
  video_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS appointments (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id UUID DEFAULT NULL, -- Optional if not using auth
  user_name TEXT,
  user_email TEXT,
  user_phone TEXT,
  service TEXT,
  price NUMERIC,
  date DATE,
  time TEXT,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  role TEXT DEFAULT 'customer',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Robust Column Fixes (Ensures mapping matches code)
DO $$ 
BEGIN
  -- Rename 'desc' to 'description' if it exists in services
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='desc') THEN
    ALTER TABLE services RENAME COLUMN "desc" TO "description";
  END IF;

  -- Rename 'imageUrl' to 'image_url' if it exists in services
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='imageUrl') THEN
    ALTER TABLE services RENAME COLUMN "imageUrl" TO "image_url";
  END IF;

  -- Ensure all expected columns exist in services
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='image_url') THEN
    ALTER TABLE services ADD COLUMN image_url TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='video_url') THEN
    ALTER TABLE services ADD COLUMN video_url TEXT;
  END IF;

  -- Add appointment columns if missing
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='appointments' AND column_name='user_id') THEN
    ALTER TABLE appointments ADD COLUMN user_id UUID;
  END IF;
END $$;

-- 3. Security Override (Allows the website to work without auth)
-- Disable Row Level Security (RLS) for simple use-cases where auth is bypassed
-- Or explicitly allow all actions
ALTER TABLE services DISABLE ROW LEVEL SECURITY;
ALTER TABLE appointments DISABLE ROW LEVEL SECURITY;
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- If you prefer KEEPING RLS enabled but allowing everyone:
-- ALTER TABLE services ENABLE ROW LEVEL SECURITY;
-- DROP POLICY IF EXISTS "Public Access" ON services;
-- CREATE POLICY "Public Access" ON services FOR ALL USING (true);

-- 4. Storage Policies (Run this to allow image uploads)
-- First, ensure you have a bucket named 'images' in the Storage tab.
-- Then run these policies:

-- Allow Anyone to READ
DROP POLICY IF EXISTS "Public Read" ON storage.objects;
CREATE POLICY "Public Read" ON storage.objects FOR SELECT USING (bucket_id = 'images');

-- Allow Anyone to INSERT (Required for your admin dashboard)
DROP POLICY IF EXISTS "Public Insert" ON storage.objects;
CREATE POLICY "Public Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images');

-- Allow Anyone to UPDATE/DELETE
DROP POLICY IF EXISTS "Public Update" ON storage.objects;
CREATE POLICY "Public Update" ON storage.objects FOR UPDATE USING (bucket_id = 'images');
DROP POLICY IF EXISTS "Public Delete" ON storage.objects;
CREATE POLICY "Public Delete" ON storage.objects FOR DELETE USING (bucket_id = 'images');
```

## 3. Storage Setup
1. Go to **Storage** in your Supabase dashboard.
2. Click **New Bucket**.
3. Name it `images`.
4. **IMPORTANT**: Toggle **Public bucket** to ON.
5. Make sure the policies above are applied in the SQL editor.

## 4. Environment Variables
In your `.env` file add:
- `VITE_SUPABASE_URL`: Your project URL
- `VITE_SUPABASE_ANON_KEY`: Your anon (public) key
