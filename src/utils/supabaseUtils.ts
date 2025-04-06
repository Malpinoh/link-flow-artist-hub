
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
  
  // Enable realtime for tables if needed
  enableRealtimeForTables().catch(err => {
    console.error("Error enabling realtime:", err);
  });
  
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
        // since we need to refetch all links to get the complete data
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
};

/**
 * Enable real-time functionality for the tables
 * This is a one-time setup function to be called on app initialization if needed
 */
export const enableRealtimeForTables = async () => {
  try {
    // Since the get_publication_tables RPC is not available, we'll skip this check
    // and assume the tables are already properly configured for real-time
    console.log('Skipping publication check - assuming real-time is enabled');
    return true;
  } catch (error) {
    console.error('Error checking real-time for tables:', error);
    return false;
  }
};
