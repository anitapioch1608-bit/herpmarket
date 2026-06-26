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

// Single Supabase client for the whole app, configured to KEEP the user logged
// in across visits. Without these explicit auth options, a session can fail to
// persist in some mobile/PWA contexts, forcing users to log in every time.
export const supabase = createClient(url, anon, {
  auth: {
    persistSession: true,        // save the session to storage so it survives reloads
    autoRefreshToken: true,      // refresh the access token before it expires
    detectSessionInUrl: true,    // handle magic-link / recovery redirects
    storageKey: 'herpmarket-auth',
    flowType: 'pkce',            // safer auth flow for browser/PWA apps
  },
});
