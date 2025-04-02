
import { FanLink } from "@/types/fanlink";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { dummyArtist } from "@/lib/dummy-data";

interface FanLinkPreviewProps {
  fanLink: FanLink;
  isPreview?: boolean;
}

export function FanLinkPreview({ fanLink, isPreview = true }: FanLinkPreviewProps) {
  const artist = dummyArtist;
  
  const bgStyle = fanLink.background_image_url
    ? { backgroundImage: `url(${fanLink.background_image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: fanLink.background_color || '#3a10e5' };

  const platforms = {
    spotify: {
      name: "Spotify",
      color: "#1DB954"
    },
    apple_music: {
      name: "Apple Music",
      color: "#FA2D48"
    },
    youtube: {
      name: "YouTube",
      color: "#FF0000"
    },
    soundcloud: {
      name: "SoundCloud",
      color: "#FF7700"
    },
    tidal: {
      name: "Tidal",
      color: "#000000"
    }
  };

  const renderStreamingButtons = () => {
    return Object.entries(fanLink.streaming_links).map(([platform, url]) => {
      if (!url && isPreview) {
        // In preview mode, show placeholder buttons
        return (
          <Button
            key={platform}
            className="fanlink-button"
            style={{ backgroundColor: platforms[platform as keyof typeof platforms]?.color }}
            disabled={isPreview}
          >
            {platforms[platform as keyof typeof platforms]?.name}
          </Button>
        );
      } else if (url) {
        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="fanlink-button"
            style={{ backgroundColor: platforms[platform as keyof typeof platforms]?.color }}
          >
            {platforms[platform as keyof typeof platforms]?.name}
          </a>
        );
      }
      return null;
    }).filter(Boolean);
  };

  const renderPreSaveButtons = () => {
    if (!fanLink.pre_save_links) return null;
    
    return Object.entries(fanLink.pre_save_links).map(([platform, url]) => {
      if (!url && isPreview) {
        // In preview mode, show placeholder buttons
        return (
          <Button
            key={`presave-${platform}`}
            variant="outline"
            className="fanlink-button bg-transparent border-white/30 hover:bg-white/10"
            disabled={isPreview}
          >
            Pre-Save on {platforms[platform as keyof typeof platforms]?.name}
          </Button>
        );
      } else if (url) {
        return (
          <a
            key={`presave-${platform}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="fanlink-button bg-transparent border border-white/30 hover:bg-white/10"
          >
            Pre-Save on {platforms[platform as keyof typeof platforms]?.name}
          </a>
        );
      }
      return null;
    }).filter(Boolean);
  };

  return (
    <div
      className="flex flex-col items-center min-h-[500px] py-10 px-6"
      style={bgStyle}
    >
      <div className="glass-card w-full max-w-md p-6 flex flex-col items-center">
        <div className="h-48 w-48 rounded-lg overflow-hidden mb-6 shadow-lg">
          {fanLink.cover_art_url ? (
            <img
              src={fanLink.cover_art_url}
              alt={fanLink.track_name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-muted flex items-center justify-center">
              <BookOpen size={48} className="text-muted-foreground" />
            </div>
          )}
        </div>
        
        <div className="text-center mb-6 w-full">
          <h1 className="text-2xl font-bold mb-1 line-clamp-2">
            {fanLink.track_name || "Track Name"}
          </h1>
          <p className="text-muted-foreground">
            {artist.name}
          </p>
        </div>
        
        <div className="w-full space-y-3 mb-4">
          {renderStreamingButtons()}
        </div>
        
        {fanLink.pre_save_links && Object.values(fanLink.pre_save_links).some(link => link) && (
          <div className="w-full space-y-3">
            {renderPreSaveButtons()}
          </div>
        )}
      </div>
    </div>
  );
}
