
import { supabase } from "@/integrations/supabase/client";

/**
 * Enable realtime for all relevant tables
 */
export async function enableRealtimeForTables() {
  try {
    console.log('Enabling realtime for tables...');
    
    // Subscribe to fan_links table
    const fanLinksChannel = supabase
      .channel('public:fan_links')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'fan_links' 
      }, (payload) => {
        console.log('Fan link change received:', payload);
      })
      .subscribe();
      
    // Subscribe to streaming_links table
    const streamingLinksChannel = supabase
      .channel('public:streaming_links')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'streaming_links' 
      }, (payload) => {
        console.log('Streaming link change received:', payload);
      })
      .subscribe();
      
    console.log('Realtime configured for tables');
    
    return () => {
      supabase.removeChannel(fanLinksChannel);
      supabase.removeChannel(streamingLinksChannel);
    };
  } catch (error) {
    console.error('Error configuring realtime for tables:', error);
    return () => {};
  }
}

/**
 * Subscribe to real-time changes on the fan_links table for a specific user
 */
export function subscribeToFanLinks(
  userId: string,
  callback: (eventType: 'INSERT' | 'UPDATE' | 'DELETE', payload: any) => void
) {
  // Subscribe to changes in fan_links table
  const fanLinksSubscription = supabase
    .channel('public:fan_links')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'fan_links',
      filter: `user_id=eq.${userId}`,
    }, (payload) => {
      console.log('Fan link changed:', payload);
      callback(payload.eventType, payload.new);
    })
    .subscribe();

  // Subscribe to changes in streaming_links table that might affect the user's fan links
  const streamingLinksSubscription = supabase
    .channel('public:streaming_links')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'streaming_links',
    }, async (payload) => {
      console.log('Streaming link changed:', payload);
      
      // Only forward events for streaming links that belong to this user's fan links
      if (payload.new && payload.new.fan_link_id) {
        try {
          // Check if this streaming link belongs to one of the user's fan links
          const { data } = await supabase
            .from('fan_links')
            .select('id')
            .eq('id', payload.new.fan_link_id)
            .eq('user_id', userId)
            .single();
            
          if (data) {
            // This streaming link belongs to the user's fan link
            callback(payload.eventType, payload.new);
          }
        } catch (error) {
          console.error('Error checking fan link ownership:', error);
        }
      }
    })
    .subscribe();

  // Return unsubscribe function
  return () => {
    supabase.removeChannel(fanLinksSubscription);
    supabase.removeChannel(streamingLinksSubscription);
  };
}

/**
 * Subscribe to changes on a specific fan link
 */
export function subscribeToFanLink(
  fanLinkId: string,
  callback: (eventType: 'UPDATE' | 'DELETE', payload: any) => void
) {
  // Subscribe to changes in the specific fan link
  const fanLinkSubscription = supabase
    .channel(`public:fan_links:id=eq.${fanLinkId}`)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'fan_links',
      filter: `id=eq.${fanLinkId}`,
    }, (payload) => {
      console.log('Fan link updated:', payload);
      callback(payload.eventType as 'UPDATE' | 'DELETE', payload.new);
    })
    .subscribe();

  // Subscribe to changes in streaming links for this fan link
  const streamingLinksSubscription = supabase
    .channel(`public:streaming_links:fan_link_id=eq.${fanLinkId}`)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'streaming_links',
      filter: `fan_link_id=eq.${fanLinkId}`,
    }, (payload) => {
      console.log('Streaming link updated:', payload);
      callback('UPDATE', { streaming_link_updated: true, ...payload.new });
    })
    .subscribe();

  // Return unsubscribe function
  return () => {
    supabase.removeChannel(fanLinkSubscription);
    supabase.removeChannel(streamingLinksSubscription);
  };
}
