
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const generateSlug = (title: string): string => {
  if (!title) return "";
  
  const baseSlug = title.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
  
  const randomString = Math.random().toString(36).substring(2, 6);
  return `${baseSlug}-${randomString}`;
};

export const saveLink = async (
  title: string,
  artist: string,
  slug: string,
  coverImage: string | null,
  backgroundColor: string,
  textColor: string,
  buttonColor: string,
  buttonTextColor: string,
  buttonText: string,
  streamingLinks: {platform: string, url: string}[]
) => {
  if (!title || !artist || !slug || !coverImage) {
    toast.error("Please fill out all required fields");
    return null;
  }
  
  if (streamingLinks.length === 0) {
    toast.error("Please add at least one streaming link");
    return null;
  }
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("You must be logged in to create a link");
      return null;
    }
    
    const { data: fanLink, error: fanLinkError } = await supabase.from('fan_links').insert({
      title,
      artist,
      slug,
      cover_image: coverImage,
      background_color: backgroundColor,
      text_color: textColor,
      button_color: buttonColor,
      button_text_color: buttonTextColor,
      button_text: buttonText, // Store button text separately for proper access
      user_id: user.id,
    }).select().single();
    
    if (fanLinkError) throw fanLinkError;
    
    const streamingLinksData = streamingLinks.map((link, index) => ({
      fan_link_id: fanLink.id,
      platform: link.platform,
      url: link.url,
      position: index
    }));
    
    const { error: streamingLinksError } = await supabase.from('streaming_links').insert(streamingLinksData);
    
    if (streamingLinksError) throw streamingLinksError;
    
    toast.success("Your link has been created!");
    return fanLink;
    
  } catch (error: any) {
    console.error("Error saving link:", error);
    toast.error(error.message || "An error occurred while saving your link");
    return null;
  }
};

/**
 * Update existing fan link
 */
export const updateLink = async (
  id: string,
  title: string,
  artist: string,
  slug: string,
  coverImage: string | null,
  backgroundColor: string,
  textColor: string,
  buttonColor: string,
  buttonTextColor: string,
  buttonText: string,
  streamingLinks: {id?: string, platform: string, url: string}[]
) => {
  if (!title || !artist || !slug) {
    toast.error("Please fill out all required fields");
    return null;
  }
  
  if (streamingLinks.length === 0) {
    toast.error("Please add at least one streaming link");
    return null;
  }
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("You must be logged in to update a link");
      return null;
    }
    
    // Update the fan link
    const { data: fanLink, error: fanLinkError } = await supabase
      .from('fan_links')
      .update({
        title,
        artist,
        slug,
        cover_image: coverImage,
        background_color: backgroundColor,
        text_color: textColor,
        button_color: buttonColor,
        button_text_color: buttonTextColor,
        button_text: buttonText,
      })
      .eq('id', id)
      .eq('user_id', user.id) // Security check
      .select()
      .single();
    
    if (fanLinkError) throw fanLinkError;
    
    // Delete existing streaming links for this fan link
    const { error: deleteError } = await supabase
      .from('streaming_links')
      .delete()
      .eq('fan_link_id', id);
    
    if (deleteError) throw deleteError;
    
    // Insert new streaming links
    const streamingLinksData = streamingLinks.map((link, index) => ({
      fan_link_id: id,
      platform: link.platform,
      url: link.url,
      position: index
    }));
    
    const { error: streamingLinksError } = await supabase
      .from('streaming_links')
      .insert(streamingLinksData);
    
    if (streamingLinksError) throw streamingLinksError;
    
    toast.success("Your link has been updated!");
    return fanLink;
    
  } catch (error: any) {
    console.error("Error updating link:", error);
    toast.error(error.message || "An error occurred while updating your link");
    return null;
  }
};
