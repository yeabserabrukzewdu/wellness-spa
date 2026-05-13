# Supabase Implementation Guide

## 1. Create a Project
Go to [Supabase](https://supabase.com/) and create a new project.

## 2. SQL Schema
Run the following SQL in your Supabase SQL Editor to create the necessary tables:

```sql
-- Create Users Table (with IF NOT EXISTS)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  role TEXT DEFAULT 'customer',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Check if table exists, if not create it
CREATE TABLE IF NOT EXISTS services (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  duration TEXT,
  category TEXT,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ⚠️ TROUBLESHOOTING 500 ERRORS:
-- If your app shows a 500 error when fetching services, it's usually because the 
-- table has different column names than the code expects.
-- Run these commands to fix your 'services' table:

DO $$ 
BEGIN
  -- Rename 'desc' to 'description' if it exists
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='desc') THEN
    ALTER TABLE services RENAME COLUMN "desc" TO "description";
  END IF;

  -- Rename 'imageUrl' to 'image_url' if it exists
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='imageUrl') THEN
    ALTER TABLE services RENAME COLUMN "imageUrl" TO "image_url";
  END IF;

  -- Add 'image_url' if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='image_url') THEN
    ALTER TABLE services ADD COLUMN image_url TEXT;
  END IF;

  -- Add 'video_url' if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='video_url') THEN
    ALTER TABLE services ADD COLUMN video_url TEXT;
  END IF;
END $$;

-- Make sure the 'isAdmin' function or policy logic matches your 'users' table role column
CREATE OR REPLACE FUNCTION is_admin() 
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Anyone can view services" ON services;
CREATE POLICY "Anyone can view services" ON services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage services" ON services;
CREATE POLICY "Admins can manage services" ON services FOR ALL USING (is_admin());

-- Create Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
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

-- Enable RLS on other tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Policies for Users
DROP POLICY IF EXISTS "Users can view their own profile" ON users;
CREATE POLICY "Users can view their own profile" ON users FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON users;
CREATE POLICY "Users can update their own profile" ON users FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON users;
CREATE POLICY "Admins can view all profiles" ON users FOR SELECT USING (is_admin());

-- Policies for Appointments
DROP POLICY IF EXISTS "Users can manage their own appointments" ON appointments;
CREATE POLICY "Users can manage their own appointments" ON appointments FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can manage all appointments" ON appointments;
CREATE POLICY "Admins can manage all appointments" ON appointments FOR ALL USING (is_admin());
```

## 3. Storage
1. Go to **Storage** in Supabase.
2. Create a new bucket named `images`.
3. Set the privacy to **Public**.
4. **IMPORTANT**: You must add **Policies** to allow uploads. Click on "Policies" under Storage, and run these in the SQL Editor or use the UI:

```sql
-- Storage Policies for 'images' bucket

-- 1. Allow public read access
CREATE POLICY "Public Read" ON storage.objects FOR SELECT USING (bucket_id = 'images');

-- 2. Allow authenticated users to upload
CREATE POLICY "Auth Upload" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'images' AND 
  auth.role() = 'authenticated'
);

-- 3. Allow authenticated users to update/delete (optional but recommended)
CREATE POLICY "Auth Update" ON storage.objects FOR UPDATE USING (
  bucket_id = 'images' AND 
  auth.role() = 'authenticated'
);

CREATE POLICY "Auth Delete" ON storage.objects FOR DELETE USING (
  bucket_id = 'images' AND 
  auth.role() = 'authenticated'
);
```

## 4. Environment Variables
Add your Supabase URL and Anon Key to your `.env` file (or Vercel environment variables):
- `VITE_SUPABASE_URL`: Found in **Settings > API > Project URL**
  - **IMPORTANT**: It should look like `https://xyz.supabase.co`. Do **NOT** include `/rest/v1` or a trailing slash.
- `VITE_SUPABASE_ANON_KEY`: Found in **Settings > API > Project API keys > anon (public)**

## 5. Authentication
1. Go to **Authentication > Providers** in Supabase.
2. Enable **Google** and follow the instructions to set up the client ID and secret from the Google Cloud Console.
3. Add `YOUR_APP_URL/auth/v1/callback` to the redirect URLs in Google Cloud.
