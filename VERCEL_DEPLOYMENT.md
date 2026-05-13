# Vercel Deployment Guide

To deploy this application on Vercel, follow these steps:

## 1. Prepare Your Repository
- Ensure your code is pushed to a GitHub repository.
- Make sure you have completed the [Supabase Setup](./SUPABASE_SETUP.md) (Tables, Storage, and Auth).

## 2. Connect to Vercel
1. Go to [Vercel](https://vercel.com/) and log in.
2. Click **Add New** > **Project**.
3. Import your GitHub repository.

## 3. Configure Environment Variables
Before clicking "Deploy", you must add the environment variables:
1. In the **Environment Variables** section, add the following keys:
   - **Key**: `VITE_SUPABASE_URL`
     - **Value**: Your Supabase project URL (e.g., `https://xyz.supabase.co`). 
     - **Note**: Ensure there is no `/rest/v1` at the end and no trailing slash.
   - **Key**: `VITE_SUPABASE_ANON_KEY`
     - **Value**: Your Supabase project Anon Key.
   - **Key**: `GEMINI_API_KEY` (Optional)
     - **Value**: Your Gemini API key if you are using AI features.

## 4. Build and Deploy
1. The **Framework Preset** should be automatically detected as **Vite**.
2. Click **Deploy**.
3. Once the deployment is complete, you will get a production URL (e.g., `https://my-spa-app.vercel.app`).

## 5. Update Supabase Authentication
Since you are using Google OAuth:
1. Go to your **Supabase Dashboard** > **Authentication** > **Redirect URLs**.
2. Add your Vercel deployment URL (e.g., `https://my-spa-app.vercel.app/auth/v1/callback`).
3. Also update the **Site URL** in Supabase Settings to your Vercel URL.

## 6. Update Google Cloud Console
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Navigate to **APIs & Services** > **Credentials**.
3. Edit your OAuth 2.0 Client ID.
4. Add your Vercel URL to **Authorized JavaScript origins**.
5. Add `https://xyz.supabase.co/auth/v1/callback` to **Authorized redirect URIs** (where `xyz` is your Supabase project ID).
