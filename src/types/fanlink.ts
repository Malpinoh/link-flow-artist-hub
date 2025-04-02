
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
}

export interface Artist {
  id?: string;
  name: string;
  email?: string;
  avatar_url?: string;
  bio?: string;
}
