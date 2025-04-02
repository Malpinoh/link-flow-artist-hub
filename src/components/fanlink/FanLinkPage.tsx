
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FanLinkPreview } from "@/components/dashboard/FanLinkPreview";
import { dummyFanLinks } from "@/lib/dummy-data";
import { FanLink } from "@/types/fanlink";
import { Music } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function FanLinkPage() {
  const { slug } = useParams<{ slug: string }>();
  const [fanLink, setFanLink] = useState<FanLink | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFanLink() {
      try {
        setLoading(true);
        
        if (import.meta.env.DEV && !import.meta.env.VITE_USE_SUPABASE) {
          // Use dummy data in development if not using Supabase
          const found = dummyFanLinks.find(link => link.slug === slug);
          
          if (found) {
            setFanLink(found);
          } else {
            setError("Link not found");
          }
          return;
        }
        
        // Fetch from Supabase with correct typing
        const { data, error } = await supabase
          .from('fan_links')
          .select(`
            *,
            streaming_links(*)
          `)
          .eq('slug', slug as string)
          .single();
        
        if (error) {
          console.error('Error fetching fan link:', error);
          setError("Failed to load link");
          toast.error("Error loading link");
          return;
        }
        
        if (!data) {
          setError("Link not found");
          return;
        }
        
        // Transform the data to match our FanLink type
        const transformedData: FanLink = {
          id: data.id,
          artist_id: data.user_id,
          track_name: data.title,
          cover_art_url: data.cover_image || "",
          streaming_links: {},
          cta_button_text: "Stream Now",
          background_color: data.background_color || undefined,
          background_image_url: data.background_color ? undefined : data.cover_image, // Use cover_image as background if available
          created_at: data.created_at,
          slug: data.slug
        };
        
        // Transform streaming links
        if (data.streaming_links) {
          data.streaming_links.forEach((link: any) => {
            transformedData.streaming_links[link.platform as keyof typeof transformedData.streaming_links] = link.url;
          });
        }
        
        setFanLink(transformedData);
      } catch (err) {
        console.error("Failed to load link:", err);
        setError("Failed to load link");
        toast.error("Error loading link");
      } finally {
        setLoading(false);
      }
    }
    
    fetchFanLink();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full music-gradient flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Music size={24} className="text-white" />
          </div>
          <p className="text-muted-foreground">Loading music link...</p>
        </div>
      </div>
    );
  }

  if (error || !fanLink) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-6">
          <div className="h-12 w-12 rounded-full bg-destructive flex items-center justify-center mx-auto mb-4">
            <Music size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Link Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find the music link you're looking for. It may have been removed or the URL is incorrect.
          </p>
          <a href="/" className="text-primary underline">
            Return to homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <FanLinkPreview fanLink={fanLink} isPreview={false} />
      <div className="py-4 text-center text-xs text-muted-foreground">
        <p>Created with MALPINOHDISTRO LINK</p>
      </div>
    </div>
  );
}
