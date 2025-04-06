
import { supabase } from "@/integrations/supabase/client";

/**
 * Set up real-time subscriptions for fan links
 * @param userId - The current user's ID
 * @param onLinkChange - Callback function that runs when links change
 * @returns A function to unsubscribe from real-time updates
 */
export const subscribeToFanLinks = (
  userId: string,
  onLinkChange: (eventType: 'INSERT' | 'UPDATE' | 'DELETE', payload: any) => void
) => {
  console.log('Setting up real-time subscription for user:', userId);
  
  try {
    // Enable realtime for tables using rpc
    const enableRealtime = async () => {
      try {
        await supabase.rpc('enable_realtime_tables');
      } catch (err) {
        console.error("Error enabling realtime:", err);
        // Continue anyway as tables might already be configured
      }
    };
    
    // Call the function but don't wait for it
    enableRealtime();
    
    const channel = supabase
      .channel('fan-links-realtime')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'fan_links',
          filter: `user_id=eq.${userId}`, // Only listen to changes for this user
        },
        (payload) => {
          console.log('Realtime fan_links update received:', payload);
          onLinkChange(payload.eventType as any, payload);
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'streaming_links',
        },
        (payload) => {
          console.log('Realtime streaming_links update received:', payload);
          // For any streaming_links changes, we'll just trigger a general update
          onLinkChange('UPDATE', payload);
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
      });

    console.log('Real-time subscription setup complete');
    
    // Return unsubscribe function
    return () => {
      console.log('Unsubscribing from real-time updates');
      supabase.removeChannel(channel);
    };
  } catch (error) {
    console.error("Error setting up real-time subscription:", error);
    return () => {};
  }
};

/**
 * Enable real-time functionality for the tables
 * This is a one-time setup function to be called on app initialization if needed
 */
export const enableRealtimeForTables = async () => {
  try {
    // Since direct RPC might not be available, let's use a SQL function call
    const { error } = await supabase.rpc('enable_realtime_tables');
    if (error) {
      console.error('Error enabling realtime:', error);
      // Continue anyway as tables might already be configured
    } else {
      console.log('Successfully enabled realtime for tables');
    }
    return true;
  } catch (error) {
    console.error('Error checking real-time for tables:', error);
    // Continue anyway as tables might already be configured
    return true;
  }
};
