
import { FanLink, Artist } from "@/types/fanlink";

export const dummyArtist: Artist = {
  id: "123",
  name: "Demo Artist",
  email: "demo@artist.com",
  avatar_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&auto=format",
  bio: "This is a demo artist for preview purposes"
};

export const dummyFanLinks: FanLink[] = [
  {
    id: "1",
    artist_id: "123",
    track_name: "Summer Vibes",
    cover_art_url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop",
    streaming_links: {
      spotify: "https://open.spotify.com/track/123",
      apple_music: "https://music.apple.com/us/album/123",
      youtube: "https://youtube.com/watch?v=123",
      soundcloud: "https://soundcloud.com/artist/123"
    },
    cta_button_text: "Listen Now",
    background_color: "#121212",
    created_at: "2023-09-01T12:00:00Z",
    slug: "summer-vibes"
  },
  {
    id: "2",
    artist_id: "123",
    track_name: "Midnight Dreams",
    cover_art_url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    streaming_links: {
      spotify: "https://open.spotify.com/track/456",
      apple_music: "https://music.apple.com/us/album/456",
      tidal: "https://tidal.com/browse/track/456"
    },
    cta_button_text: "Stream Now",
    background_image_url: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2070&auto=format&fit=crop",
    created_at: "2023-08-15T10:30:00Z",
    slug: "midnight-dreams"
  },
  {
    id: "3",
    artist_id: "123",
    track_name: "Electric Feelings",
    cover_art_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1740&auto=format&fit=crop",
    streaming_links: {
      spotify: "https://open.spotify.com/track/789",
      youtube: "https://youtube.com/watch?v=789",
      soundcloud: "https://soundcloud.com/artist/789"
    },
    cta_button_text: "Play Now",
    background_color: "#0a0a2a",
    created_at: "2023-07-20T09:15:00Z",
    slug: "electric-feelings"
  }
];
