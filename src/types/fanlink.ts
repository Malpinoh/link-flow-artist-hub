
export interface FanLink {
  id?: string;
  artist_id?: string;
  track_name: string;
  cover_art_url: string;
  streaming_links: {
    spotify?: string;
    apple_music?: string;
    youtube?: string;
    soundcloud?: string;
    tidal?: string;
    audiomack?: string;
    boomplay?: string;
    deezer?: string;
    youtube_music?: string;
    bandcamp?: string;
    amazon_music?: string;
    [key: string]: string | undefined;
  };
  pre_save_links?: {
    spotify?: string;
    apple_music?: string;
  };
  cta_button_text: string;
  background_color?: string;
  background_image_url?: string;
  created_at?: string;
  slug?: string;
  button_text?: string; // Added this field to match Supabase schema
}

export interface Artist {
  id?: string;
  name: string;
  email?: string;
  avatar_url?: string;
  bio?: string;
}

export interface StreamingPlatform {
  id: string;
  name: string;
  icon?: string;
}
