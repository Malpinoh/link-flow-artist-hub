
export type Tables = {
  fan_links: {
    id: string;
    user_id: string;
    title: string;
    artist: string;
    slug: string;
    cover_image: string;
    background_color?: string;
    text_color?: string;
    button_color?: string;
    button_text_color?: string;
    background_image?: string;
    created_at: string;
    updated_at: string;
  };
  streaming_links: {
    id: string;
    fan_link_id: string;
    platform: string;
    url: string;
    position?: number;
    icon?: string;
    created_at: string;
  };
  profiles: {
    id: string;
    username?: string;
    full_name?: string;
    avatar_url?: string;
    website?: string;
    created_at: string;
    updated_at: string;
  };
};
