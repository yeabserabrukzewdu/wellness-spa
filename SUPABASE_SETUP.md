# Supabase Implementation Guide

## 1. Create a Project
Go to [Supabase](https://supabase.com/) and create a new project.

## 2. SQL Schema
Run the following SQL in your Supabase SQL Editor to create the necessary tables:

```sql
-- Create Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  role TEXT DEFAULT 'customer',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Services Table
CREATE TABLE services (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  duration TEXT,
  category TEXT,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Appointments Table
CREATE TABLE appointments (
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

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Policies for Users
CREATE POLICY "Users can view their own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON users FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Policies for Services
CREATE POLICY "Anyone can view services" ON services FOR SELECT USING (true);
CREATE POLICY "Admins can manage services" ON services FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Policies for Appointments
CREATE POLICY "Users can manage their own appointments" ON appointments FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all appointments" ON appointments FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
```

## 3. Storage
1. Go to **Storage** in Supabase.
2. Create a new public bucket named `images`.
3. Set the privacy to **Public**.

## 4. Environment Variables
Add your Supabase URL and Anon Key to your `.env` file (or Vercel environment variables):
- `VITE_SUPABASE_URL`: Found in **Settings > API > Project URL**
  - **IMPORTANT**: It should look like `https://xyz.supabase.co`. Do **NOT** include `/rest/v1` or a trailing slash.
- `VITE_SUPABASE_ANON_KEY`: Found in **Settings > API > Project API keys > anon (public)**

## 5. Authentication
1. Go to **Authentication > Providers** in Supabase.
2. Enable **Google** and follow the instructions to set up the client ID and secret from the Google Cloud Console.
3. Add `YOUR_APP_URL/auth/v1/callback` to the redirect URLs in Google Cloud.
