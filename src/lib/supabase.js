// src/lib/supabase.js
// Single Supabase client for the whole app.
// Reads keys from Vite env vars — set these in .env.local AND in Vercel.
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anon) {
  // Helpful console message if env vars are missing
  console.warn('[HerpMarket] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(url, anon);
