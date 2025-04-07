
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

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

// Configure Realtime client to enable PostgreSQL changes
export const configureRealtimeClient = async () => {
  try {
    // Enable realtime for table fan_links
    const { error: fanLinksError } = await supabase.from('fan_links').on('*', () => {}).subscribe();
    
    if (fanLinksError) {
      console.error('Error configuring realtime for fan_links:', fanLinksError);
    }
    
    // Enable realtime for table streaming_links
    const { error: streamingLinksError } = await supabase.from('streaming_links').on('*', () => {}).subscribe();
    
    if (streamingLinksError) {
      console.error('Error configuring realtime for streaming_links:', streamingLinksError);
    }
    
    console.log('Realtime configured for tables');
  } catch (error) {
    console.error('Error configuring realtime client:', error);
  }
};
