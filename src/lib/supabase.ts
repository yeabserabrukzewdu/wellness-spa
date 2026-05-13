import { createClient } from '@supabase/supabase-js';

const getEnvVar = (name: string): string => {
  return (import.meta as any).env[name] || '';
};

const rawUrl = getEnvVar('VITE_SUPABASE_URL');
const rawKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

// Ensure we have a valid URL format for initialization to prevent boot-time crashes
const isValidUrl = (url: string) => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const supabaseUrl = isValidUrl(rawUrl) ? rawUrl : 'https://placeholder-project.supabase.co';
const supabaseAnonKey = rawKey || 'placeholder-key';

if (!rawUrl || !isValidUrl(rawUrl)) {
  console.warn(
    'Supabase URL is missing or invalid. Please set VITE_SUPABASE_URL in your environment variables (e.g., https://xyz.supabase.co).'
  );
}
if (!rawKey) {
  console.warn('Supabase Anon Key is missing. Please set VITE_SUPABASE_ANON_KEY in your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type TableName = 'users' | 'services' | 'appointments';

export async function handleSupabaseError(error: any, operation: string) {
  console.error(`Supabase Error during ${operation}:`, error);
  throw error;
}
