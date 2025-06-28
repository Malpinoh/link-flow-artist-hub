
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lridcsbwttwnwzyqzzde.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyaWRjc2J3dHR3bnd6eXF6emRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1OTkwMTgsImV4cCI6MjA1OTE3NTAxOH0.5XFmDGoDA42zpYMPIJZpcj5MI02BiZ7clvT5leeSwXk';

console.log('Supabase client initialized with:', {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
