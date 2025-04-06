
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FanLink } from "@/types/fanlink";
import { toast } from "sonner";
import { subscribeToFanLinks } from "@/utils/supabaseUtils";

export function useFanLinks(userId: string | null) {
  const [fanLinks, setFanLinks] = useState<FanLink[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Transform Supabase data to FanLink format
  const transformFanLinkData = useCallback((data: any[]): FanLink[] => {
    if (!data || data.length === 0) return [];
    
    console.log("Transforming fan link data:", data);
    
    return data.map((link: any) => {
      const fanLink: FanLink = {
        id: link.id,
        artist_id: link.user_id,
        track_name: link.title,
        cover_art_url: link.cover_image || "",
        streaming_links: {},
        cta_button_text: link.button_text || "Stream Now",
        background_color: link.background_color || undefined,
        background_image_url: link.background_color ? undefined : link.cover_image,
        created_at: link.created_at,
        slug: link.slug
      };
      
      // Transform streaming links
      if (link.streaming_links) {
        link.streaming_links.forEach((streamLink: any) => {
          fanLink.streaming_links[streamLink.platform as keyof typeof fanLink.streaming_links] = streamLink.url;
        });
      }
      
      return fanLink;
    });
  }, []);
  
  // Fetch user's fan links
  const fetchFanLinks = useCallback(async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('fan_links')
        .select(`
          *,
          streaming_links(*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching fan links:', error);
        toast.error("Error loading your links");
        setFanLinks([]);
        return;
      }
      
      console.log("Fetched links data:", data);
      setFanLinks(transformFanLinkData(data || []));
    } catch (err) {
      console.error("Failed to load links:", err);
      toast.error("Error loading your links");
      setFanLinks([]);
    } finally {
      setLoading(false);
    }
  }, [userId, transformFanLinkData]);
  
  // Initial data fetch
  useEffect(() => {
    if (userId) {
      fetchFanLinks();
    }
  }, [userId, fetchFanLinks]);
  
  // Set up real-time subscriptions for dashboard updates
  useEffect(() => {
    if (!userId) return;
    
    console.log('Setting up real-time subscription for user:', userId);
    
    const handleRealTimeUpdate = (eventType: 'INSERT' | 'UPDATE' | 'DELETE', payload: any) => {
      console.log(`Real-time event received: ${eventType}`, payload);
      
      // Refresh the entire links list
      fetchFanLinks();
      
      // Show toast based on event type
      if (eventType === 'INSERT') {
        toast.success('New link created!');
      } else if (eventType === 'UPDATE') {
        toast.success('Link updated!');
      } else if (eventType === 'DELETE') {
        toast.info('Link deleted');
      }
    };
    
    // Set up subscription
    const unsubscribe = subscribeToFanLinks(userId, handleRealTimeUpdate);
    
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [userId, fetchFanLinks]);
  
  return { fanLinks, loading, fetchFanLinks };
}
