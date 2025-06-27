
export interface FanLink {
  id: string;
  title: string;
  artist: string;
  slug: string;
  cover_image: string | null;
  background_color: string | null;
  text_color: string | null;
  button_color: string | null;
  button_text_color: string | null;
  button_text: string | null;
  created_at: string;
  streaming_links: StreamingLink[];
}

export interface StreamingLink {
  id: string;
  platform: string;
  url: string;
  position: number | null;
}
