
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { FanLink } from '@/types/fanlink';

interface FanLinkPageProps {
  fanLink: FanLink;
}

export default function FanLinkPage({ fanLink }: FanLinkPageProps) {
  const pageTitle = `Stream "${fanLink.title}" by ${fanLink.artist}`;
  const pageDescription = `Listen to "${fanLink.title}" by ${fanLink.artist} on your favorite music platform.`;
  const currentUrl = `https://link.malpinohdistro.com.ng/link/${fanLink.slug}`;
  
  // Ensure cover image URL is absolute
  const getAbsoluteImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) return null;
    
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    if (imageUrl.startsWith('/')) {
      return `https://link.malpinohdistro.com.ng${imageUrl}`;
    }
    
    return `https://link.malpinohdistro.com.ng/${imageUrl}`;
  };
  
  const absoluteImageUrl = getAbsoluteImageUrl(fanLink.cover_image);
  
  const bgStyle = fanLink.background_color
    ? { backgroundColor: fanLink.background_color }
    : { backgroundColor: '#3a10e5' };
    
  const textStyle = { color: fanLink.text_color || '#ffffff' };

  return (
    <>
      <Head>
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
        
        {/* Additional meta tags */}
        <meta property="og:locale" content="en_US" />
        <meta name="theme-color" content={fanLink.background_color || '#3a10e5'} />
        <meta name="keywords" content={`${fanLink.title}, ${fanLink.artist}, music, stream music, ${fanLink.streaming_links.map(link => link.platform).join(', ')}`} />
        <meta name="author" content={fanLink.artist} />
        <meta name="robots" content="index, follow" />
        
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicRecording",
              "name": fanLink.title,
              "byArtist": {
                "@type": "Person",
                "name": fanLink.artist
              },
              "image": absoluteImageUrl,
              "url": currentUrl,
              "sameAs": fanLink.streaming_links.map(link => link.url)
            })
          }}
        />
      </Head>
      
      <div className="flex flex-col min-h-screen" style={bgStyle}>
        <main className="flex-grow flex items-center justify-center p-4 py-10">
          <div className="w-full max-w-md bg-black/30 backdrop-blur-md rounded-2xl p-8 shadow-lg" style={textStyle}>
            <div className="flex flex-col items-center">
              <div className="h-48 w-48 rounded-lg overflow-hidden mb-6 shadow-lg relative">
                {fanLink.cover_image && (
                  <Image
                    src={fanLink.cover_image}
                    alt={`${fanLink.title} by ${fanLink.artist}`}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>
              
              <div className="text-center mb-8 w-full">
                <h1 className="text-2xl font-bold mb-1">{fanLink.title}</h1>
                <p className="opacity-80">{fanLink.artist}</p>
              </div>
              
              <div className="w-full space-y-3">
                {fanLink.streaming_links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full p-3 rounded-md transition-all hover:opacity-90 hover:scale-105 text-white font-medium"
                    style={{ backgroundColor: getPlatformColor(link.platform) }}
                  >
                    {getPlatformName(link.platform)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </main>
        
        <footer className="py-4 text-center text-xs" style={textStyle}>
          <p className="opacity-60">
            <a href="https://malpinohdistro.com.ng" className="hover:underline">
              Create your own music link page
            </a>
          </p>
        </footer>
      </div>
    </>
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking', // Enable on-demand generation
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  
  if (!slug) {
    return {
      notFound: true,
    };
  }
  
  try {
    // Fetch fan link data
    const { data: fanLinkData, error: fanLinkError } = await supabase
      .from('fan_links')
      .select('*')
      .eq('slug', slug)
      .single();
      
    if (fanLinkError || !fanLinkData) {
      console.error('Fan link not found:', fanLinkError);
      return {
        notFound: true,
      };
    }
    
    // Fetch streaming links
    const { data: streamingLinksData, error: streamingLinksError } = await supabase
      .from('streaming_links')
      .select('*')
      .eq('fan_link_id', fanLinkData.id)
      .order('position', { ascending: true });
    
    if (streamingLinksError) {
      console.error('Error fetching streaming links:', streamingLinksError);
    }
    
    const fanLink: FanLink = {
      ...fanLinkData,
      streaming_links: streamingLinksData || [],
    };
    
    return {
      props: {
        fanLink,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true,
    };
  }
};
