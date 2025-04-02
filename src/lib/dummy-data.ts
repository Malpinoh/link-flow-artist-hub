
import { FanLink, Artist } from '@/types/fanlink';

export const dummyArtist: Artist = {
  id: "artist-1",
  name: "Midnight Groove",
  email: "artist@example.com",
  avatar_url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1740&auto=format&fit=crop",
  bio: "Electronic music producer and DJ based in Los Angeles"
};

export const dummyFanLinks: FanLink[] = [
  {
    id: "fanlink-1",
    artist_id: "artist-1",
    track_name: "Neon Dreams",
    cover_art_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1740&auto=format&fit=crop",
    streaming_links: {
      spotify: "https://open.spotify.com",
      apple_music: "https://music.apple.com",
      youtube: "https://youtube.com",
      soundcloud: "https://soundcloud.com",
      tidal: "https://tidal.com"
    },
    pre_save_links: {
      spotify: "https://pre-save.spotify.com",
      apple_music: "https://pre-add.applemusic.com"
    },
    cta_button_text: "Stream Now",
    background_color: "#3a10e5",
    created_at: "2023-09-15T10:30:00Z",
    slug: "midnight-groove-neon-dreams"
  },
  {
    id: "fanlink-2",
    artist_id: "artist-1",
    track_name: "Summer Nights",
    cover_art_url: "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?q=80&w=1626&auto=format&fit=crop",
    streaming_links: {
      spotify: "https://open.spotify.com",
      apple_music: "https://music.apple.com",
      youtube: "https://youtube.com",
    },
    cta_button_text: "Pre-Save",
    background_image_url: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=1743&auto=format&fit=crop",
    created_at: "2023-08-22T14:15:00Z",
    slug: "midnight-groove-summer-nights"
  }
];
