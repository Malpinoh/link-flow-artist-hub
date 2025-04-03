
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FanLink } from "@/types/fanlink";

export function FanLinkPage() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fanLink, setFanLink] = useState<any | null>(null);
  
  useEffect(() => {
    const fetchFanLink = async () => {
      try {
        setLoading(true);
        
        // First, get the fan link by slug
        const { data: fanLinkData, error: fanLinkError } = await supabase
          .from('fan_links')
          .select('*')
          .eq('slug', slug)
          .single();
          
        if (fanLinkError) {
          throw new Error('Fan link not found');
        }
        
        // Then, get the streaming links for this fan link
        const { data: streamingLinksData, error: streamingLinksError } = await supabase
          .from('streaming_links')
          .select('*')
          .eq('fan_link_id', fanLinkData.id)
          .order('position', { ascending: true });
          
        if (streamingLinksError) {
          console.error('Error fetching streaming links:', streamingLinksError);
        }
        
        // Convert streaming links to the format expected by FanLink type
        const streamingLinks = streamingLinksData.reduce((acc: Record<string, string>, link: any) => {
          acc[link.platform] = link.url;
          return acc;
        }, {});
        
        // Combine data
        setFanLink({
          ...fanLinkData,
          streaming_links: streamingLinks,
          // Map cta_button_text for compatibility with FanLink type
          cta_button_text: fanLinkData.button_text || "Listen Now"
        });
      } catch (err: any) {
        console.error('Error fetching fan link:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) {
      fetchFanLink();
    }
  }, [slug]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error || !fanLink) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4 p-4 text-center">
        <h1 className="text-3xl font-bold">Link Not Found</h1>
        <p className="text-muted-foreground">The link you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return Home
          </Link>
        </Button>
      </div>
    );
  }
  
  const bgStyle = fanLink?.background_image_url
    ? { backgroundImage: `url(${fanLink.background_image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: fanLink?.background_color || '#3a10e5' };
    
  const textStyle = { color: fanLink?.text_color || '#ffffff' };
  
  const fanLinkFormatted: FanLink = {
    track_name: fanLink?.title,
    cover_art_url: fanLink?.cover_image,
    streaming_links: fanLink?.streaming_links || {},
    cta_button_text: fanLink?.cta_button_text || "Listen Now",
    background_color: fanLink?.background_color,
    background_image_url: fanLink?.background_image_url,
    slug: fanLink?.slug
  };
  
  return (
    <div className="flex flex-col min-h-screen" style={bgStyle}>
      <main className="flex-grow flex items-center justify-center p-4 py-10">
        <div className="w-full max-w-md bg-black/30 backdrop-blur-md rounded-2xl p-8 shadow-lg" style={textStyle}>
          <div className="flex flex-col items-center">
            <div className="h-48 w-48 rounded-lg overflow-hidden mb-6 shadow-lg">
              {fanLink.cover_image ? (
                <img
                  src={fanLink.cover_image}
                  alt={fanLink.title}
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>
            
            <div className="text-center mb-8 w-full">
              <h1 className="text-2xl font-bold mb-1">{fanLink.title}</h1>
              <p className="opacity-80">{fanLink.artist}</p>
            </div>
            
            <div className="w-full space-y-3">
              {/* Streaming buttons */}
              {Object.entries(fanLink.streaming_links || {}).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full p-3 rounded-md transition-all hover:opacity-90 text-white"
                  style={{ backgroundColor: getPlatformColor(platform) }}
                >
                  {getPlatformName(platform)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-4 text-center text-xs" style={textStyle}>
        <p className="opacity-60">
          <Link to="/" className="hover:underline">Create your own music link page</Link>
        </p>
      </footer>
    </div>
  );
}

// Helper functions to get platform colors and names
function getPlatformColor(platform: string): string {
  const colors: Record<string, string> = {
    spotify: "#1DB954",
    apple_music: "#FA2D48",
    youtube: "#FF0000",
    youtube_music: "#FF0000",
    soundcloud: "#FF7700",
    tidal: "#000000",
    audiomack: "#FFA500",
    boomplay: "#E72C30",
    deezer: "#00C7F2",
    bandcamp: "#1DA0C3",
    amazon_music: "#00A8E1"
  };
  
  return colors[platform] || "#333333";
}

function getPlatformName(platform: string): string {
  const names: Record<string, string> = {
    spotify: "Spotify",
    apple_music: "Apple Music",
    youtube: "YouTube",
    youtube_music: "YouTube Music",
    soundcloud: "SoundCloud",
    tidal: "TIDAL",
    audiomack: "Audiomack",
    boomplay: "Boomplay",
    deezer: "Deezer",
    bandcamp: "Bandcamp",
    amazon_music: "Amazon Music"
  };
  
  return names[platform] || platform.charAt(0).toUpperCase() + platform.slice(1);
}
