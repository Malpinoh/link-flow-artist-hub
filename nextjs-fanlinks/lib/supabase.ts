
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lridcsbwttwnwzyqzzde.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyaWRjc2J3dHR3bnd6eXF6emRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1OTkwMTgsImV4cCI6MjA1OTE3NTAxOH0.5XFmDGoDA42zpYMPIJZpcj5MI02BiZ7clvT5leeSwXk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
