
export type Tables = {
  fan_links: {
    id: string;
    user_id: string;
    title: string;
    artist: string;
    slug: string;
    cover_image: string | null;
    background_color?: string | null;
    text_color?: string | null;
    button_color?: string | null;
    button_text_color?: string | null;
    background_image_url?: string | null;  // Changed field name to match what we use in code
    created_at: string;
    updated_at: string;
  };
  streaming_links: {
    id: string;
    fan_link_id: string;
    platform: string;
    url: string;
    position?: number | null;
    icon?: string | null;
    created_at: string;
  };
  profiles: {
    id: string;
    username?: string | null;
    full_name?: string | null;
    avatar_url?: string | null;
    website?: string | null;
    created_at: string;
    updated_at: string;
  };
};

export type TablesInsert = {
  fan_links: Omit<Tables['fan_links'], 'id' | 'created_at' | 'updated_at'> & {
    id?: string;
    created_at?: string;
    updated_at?: string;
  };
  streaming_links: Omit<Tables['streaming_links'], 'id' | 'created_at'> & {
    id?: string;
    created_at?: string;
  };
  profiles: Omit<Tables['profiles'], 'created_at' | 'updated_at'> & {
    created_at?: string;
    updated_at?: string;
  };
};
