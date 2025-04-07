
import { createClient } from '@supabase/supabase-js';

// Get environment variables or use fallback values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lridcsbwttwnwzyqzzde.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyaWRjc2J3dHR3bnd6eXF6emRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1OTkwMTgsImV4cCI6MjA1OTE3NTAxOH0.5XFmDGoDA42zpYMPIJZpcj5MI02BiZ7clvT5leeSwXk';

// For debugging
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key length:', supabaseAnonKey ? supabaseAnonKey.length : 0);

// Initialize Supabase client with our configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
