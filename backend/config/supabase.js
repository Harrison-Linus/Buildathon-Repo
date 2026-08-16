import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

let supabase = null;

if (
  supabaseUrl &&
  supabaseUrl !== 'https://your-supabase-project-id.supabase.co' &&
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  supabaseAnonKey &&
  supabaseAnonKey !== 'your-supabase-anon-key' &&
  supabaseAnonKey !== 'your-actual-anon-key'
) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('⚡ Supabase Client Connected Successfully');
  } catch (err) {
    console.warn('⚠️ Could not initialize Supabase Client:', err.message);
  }
} else {
  console.log('ℹ️ Supabase environment variables not set. API will operate with Fallback Data mode.');
}

export default supabase;
