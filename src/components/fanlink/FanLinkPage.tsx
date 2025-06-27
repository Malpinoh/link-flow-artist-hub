
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Share2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FanLink } from "@/types/fanlink";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";

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
        
        // Combine data - using optional chaining to safely access properties that might not exist
        const processedFanLink = {
          ...fanLinkData,
          streaming_links: streamingLinks,
          // Set a default value for cta_button_text
          cta_button_text: fanLinkData.button_text || "Listen Now" // Using button_text from the database
        };
        
        setFanLink(processedFanLink);
        
        // Log view for analytics (optional)
        recordLinkView(fanLinkData.id).catch(console.error);
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
  
  // Record view for analytics
  const recordLinkView = async (linkId: string) => {
    try {
      await supabase.from('link_views').insert([
        { fan_link_id: linkId, viewed_at: new Date().toISOString() }
      ]);
    } catch (err) {
      // Just log error but don't interrupt user experience
      console.error('Error recording view:', err);
    }
  };

  // Share functionality
  const handleShare = async () => {
    const url = window.location.href;
    const title = `Stream "${fanLink.title}" by ${fanLink.artist}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check out this new music from ${fanLink.artist}!`,
          url
        });
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
      } catch (err) {
        toast.error('Failed to copy link');
      }
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading your music...</p>
        </div>
      </div>
    );
  }
  
  if (error || !fanLink) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4 p-4 text-center bg-gradient-to-br from-primary/20 to-secondary/20">
        <h1 className="text-3xl font-bold">Link Not Found</h1>
        <p className="text-muted-foreground max-w-md">The link you're looking for doesn't exist or has been removed.</p>
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
  
  const pageTitle = `Stream "${fanLink.title}" by ${fanLink.artist}`;
  const pageDescription = `Listen to "${fanLink.title}" by ${fanLink.artist} on your favorite music platform.`;
  
  // Determine the full URL for the current page
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://link.malpinohdistro.com.ng/link/${slug}`;
  
  // Ensure cover image URL is absolute and accessible
  const getAbsoluteImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) return null;
    
    // If it's already an absolute URL, return as is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // If it's a relative URL starting with /, make it absolute
    if (imageUrl.startsWith('/')) {
      return `https://link.malpinohdistro.com.ng${imageUrl}`;
    }
    
    // Otherwise, assume it's a relative path and prepend the base URL
    return `https://link.malpinohdistro.com.ng/${imageUrl}`;
  };
  
  const absoluteImageUrl = getAbsoluteImageUrl(fanLink.cover_image);
  
  return (
    <div className="flex flex-col min-h-screen" style={bgStyle}>
      <Helmet>
        <title>{pageTitle} | MALPINOHDISTRO FAN LINK</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={currentUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="music.song" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="MALPINOHDISTRO FAN LINK" />
        {absoluteImageUrl && (
          <>
            <meta property="og:image" content={absoluteImageUrl} />
            <meta property="og:image:secure_url" content={absoluteImageUrl} />
            <meta property="og:image:type" content="image/jpeg" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={`${fanLink.title} by ${fanLink.artist} - Cover Art`} />
          </>
        )}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        {absoluteImageUrl && (
          <>
            <meta name="twitter:image" content={absoluteImageUrl} />
            <meta name="twitter:image:alt" content={`${fanLink.title} by ${fanLink.artist} - Cover Art`} />
          </>
        )}
        
        {/* WhatsApp and other messaging apps */}
        <meta property="og:locale" content="en_US" />
        <meta name="theme-color" content={fanLink?.background_color || '#3a10e5'} />
        
        {/* Music specific meta tags */}
        <meta property="music:song" content={pageTitle} />
        <meta property="music:musician" content={fanLink.artist} />
        
        {/* Additional SEO and social tags */}
        <meta name="keywords" content={`${fanLink.title}, ${fanLink.artist}, music, stream music, ${Object.keys(fanLink.streaming_links || {}).join(', ')}`} />
        <meta name="author" content={fanLink.artist} />
        <meta name="robots" content="index, follow" />
        
        {/* Structured data for rich snippets */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MusicRecording",
            "name": fanLink.title,
            "byArtist": {
              "@type": "Person",
              "name": fanLink.artist
            },
            "image": absoluteImageUrl,
            "url": currentUrl,
            "sameAs": Object.values(fanLink.streaming_links || {})
          })}
        </script>
      </Helmet>
      
      {/* Share Button */}
      <div className="fixed top-4 right-4 z-10">
        <Button
          onClick={handleShare}
          size="sm"
          variant="secondary"
          className="backdrop-blur-sm bg-black/20 hover:bg-black/30 text-white border-white/20"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
      
      <main className="flex-grow flex items-center justify-center p-4 py-10">
        <div className="w-full max-w-md bg-black/30 backdrop-blur-md rounded-2xl p-8 shadow-lg animate-fade-in" style={textStyle}>
          <div className="flex flex-col items-center">
            <div className="h-48 w-48 rounded-lg overflow-hidden mb-6 shadow-lg hover-scale">
              {fanLink.cover_image ? (
                <img
                  src={fanLink.cover_image}
                  alt={`${fanLink.title} by ${fanLink.artist}`}
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
                  className="flex items-center justify-center w-full p-3 rounded-md transition-all hover:opacity-90 hover:scale-105 text-white font-medium"
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
